---
sidebar_label: 'Old Method for Fetching Values from the DB2 or Data Areas'
---

# Old Method for Fetching Values from the DB2 or Data Areas

The following documentation is retained for the benefit of users who had already employed the old method. However, SMA strongly recommends using the newer Dynamic Variable \*DB2 Function Code method, as documented just before this section.

SMA had provided a utility program that makes it possible to fetch field values from any file and library in the DB2 database and return them as the value for a Dynamic Variable token. This utility program called DYNVARSQLR requires an interface program, such as the model CL program provided by SMA called DYNVARSQLC.

The model CL program is documented in an example box, below. Licensed users of the IBM i Agent software are permitted to copy and adapt this model program as necessary. The model program illustrates the program parameters required to use this program as the "User value calculator program" specified in a Dynamic Variable master record. (This strategy of engaging the user-defined program method was an interim solution for fetching DB2 values, until SMA implemented the newer *DB2 Function Code as part of the Dynamic Variable master file record.)

The model CL program contains two different examples for fetching data from the DB2 database. The first example shows how to configure the parameters required by the database file reading utility program, DYNVARSQLR. This model is used to get one field value from any file in any DB2 library, using an SQL "WHERE" clause to specify the record selection criteria. The second example shows how to use the CL program itself for the simpler operation of fetching data from a DB2 data area. Both examples also illustrate how to extract a sub-string (a limited portion) of the data that is retrieved from a file or a data area. 

When adapting the model CL program for each Dynamic Variable, it is only necessary to include the basic program parameters and only as much logic as may be needed for any given Dynamic Variable. For example, when fetching a data area value, it is not necessary for the CL program to include any of the database file logic, or to set up the parameters required for an SQL fetch of a database file field.

Users are also welcome to develop their own programs, of any style or type, to fetch or compute values for Dynamic Variables. The model CL program and the compiled SQL file fetch program are provided for the convenience of the Agent software administrators.

The source code of the model CL program includes helpful documentation that should make it easier to understand how the program works.

Whenever the model CL program and/or the called utility database fetch program encounter an error, the value parameter for the Dynamic Variable will not be changed; it will be returned in the same format as was provided when the user-defined program was called by the Dynamic Variable token replacement module. This suggests that, in some cases, it might be helpful to preset certain Dynamic Variables to a predetermined value that, if returned, would indicate there was a problem with fetching the desired value. This technique would be helpful when Dynamic Variables are being used with Captured Data Response Rules, if a separate Rule or Rules are allocated to exception processing that is engaged whenever the dynamic variable token has been returned with the initial value.

## Using Numeric Compression with Database Values

Note that both examples in the model CL program also illustrate how to, optionally, engage "numeric compression" whenever a numeric value is retrieved from a database file or a data area. Numeric compression removes all characters except the digits. The Dynamic Variable formatting rules for numeric data can then be applied to the fetched value, so that the final data replacing a Dynamic Variable token will have a predictable format. (Refer to more about numeric compression, below.)

Remember to define the Dynamic Variable as a numeric variable whenever the numeric formatting rules will be applied.

However, numeric compression can be used with values that will be handled as a character string, even though the data may actually be comprised of only numeric digits. If any other special formatting of a numeric value is required, one option is to call another user-defined program that will reformat a numeric value into the desired final format, and then that edited value will be returned to the Dynamic Variable (to replace the dynamic variable token) in the (max) 128-character value parameter field.

## Using the DYNVARSQLR Utility Program to Fetch Database File Fields

The goal of the SQL file fetch utility program DYNVARSQLR is to simplify the process of creating a user-defined program that can fetch almost any field value from any file in any DB2 library. (Special field types, such as BLOB fields, are probably not compatible with Dynamic Variables.)

Regardless of the data field size, the maximum length of data that can be stored (and returned) by a Dynamic Variable is 128  characters. When the value being retrieved from a database file field could be longer than 128 characters, the first 128 characters will be used by default unless the Start and Length parameters sent to program DYNVARSQLR are used to define the portion of the field value that should be returned.

The 256-byte SQL "WHERE" clause parameter is intended to deliver the file record selection logic to the utility program. However, this field may also contain any other SQL clauses that are allowed to be used with a standard SELECT operation (as illustrated below). Other clauses may be combined with the WHERE clause as long as they do not conflict with SQL SELECT statement rules.

In the following example of the SQL statement syntax, the WHERE clause is not automatically included, but must be typed by the author of the actual CL program that will prepare the WHERE clause.

:::info example
SQL statement format processed by DYNVARSQLR program:
```
SELECT CHAR(field) FROM library/file
WHERE ... + other optional SQL clauses...
```
:::

The utility program is capable of handling a multi-value data set, if that is the result of the SELECT statement and the WHERE clause. However, in any case, the utility program will return only one value. This means that if the WHERE clause (whether amplified by other clauses or not) defines a set of data, only the first value in the set will be returned. This logic could be used to good advantage. For example, if the WHERE clause cannot determine what is the lowest or highest value in the current data set, then an ORDER BY clause will assure that either the lowest or the highest value will be returned. (The current style of the utility program does not allow for specialty SQL keywords such as MAX( ) on the field name. In part, this fixed format of the SELECT statement helps prevent hacking with UPDATE statements.)

If the utility program fails, it will log messages in the LSALOGF30 LSAM log file (viewed from LSAM sub-menu 6, option 5, log viewer 4) and to the QSYSOPR message queue. It will also return an error code in the ERROR parameter. When an error occurs, the utility program will leave the Value field untouched; that is, the Value parameter will be returned without any change to its initial value.
### Example of Parameter Passing for User-Defined Value Calculator Program
:::info example
```
/*****************************************************************/
/*                                                               */
/* OBJECT: DYNVARSQLC                                            */
/* AUTHOR: GL                                                    */
/* DATE..: 07/28/2019                                            */
/* DESC..: Model CL program for user-defined Dynamic Variables   */
/*                                                               */ 
/*****************************************************************/
/* CHANGE LOG:                                                   */
/* BY CHG_ID DATE DESCRIPTION                                    */
/* ---------- -------- ---------- ------------------------------ */
/* GL US004149 07/29/2019 ORIGINAL PROGRAM                       */
/*                                                               */
/*****************************************************************/
/*                                                               */
/* COPYRIGHT (C) 2019 SMA Technologies. All rights reserved.     */
/*                                                               */
/* SMA Technologies grants a limited right to licensed users of  */
/* this software to copy and adapt this model program only for   */
/* the purpose of implementing automation by OpCon and its Agent */
/* software.                                                     */
/*                                                               */
/*****************************************************************/
/* INSTRUCTIONS for use:                                         */
/*                                                               */
/* Copy this model program to a new source member name.          */
/*                                                               */
/* LIBRARY/FILE : FIELD...                                       */
/* Change the hard-coded comparison of the Dynamic Variable      */
/* name and also the library, file and field values.             */
/*                                                               */
/* LIBRARY/DATA_AREA...                                          */
/* Change the hard-coded comparison of the Dynamic Variable      */
/* name and also the RTVDTAARA command parameters.               */
/*                                                               */
/* Adapt the error management code as desired.                   */
/*                                                               */
/* Delete parts of the model program that will not be used.      */
/*                                                               */
/* Compile the new version of the program to a user library.     */
/*                                                               */
/* Set the Dynamic Variable user-defined value calculator        */
/* program and library in the Dynamic Variable master record,    */
/* and/or specify the USRPGM(library/program) parameter in the   */
/* SETDYNVAR command.                                            */
/*                                                               */
/* In case of error, view error(s) logged to file LSALOGF30,     */
/* which can be viewed from LSAM sub-menu 6, option 5, log       */
/* viewer 4: Submitted job log. Look for entries of type DE: .   */
/*                                                               */
/*****************************************************************/
/* Program DYNVARSQLR parameters:                                */
/*                                                               */
/* &DVVALUEX (129) = The 128-character value followed by 'X'.    */
/* &DVNAME (12) = The Dynamic Variable name asking for a value.  */
/* (LIBRARY) (10) = The library where a DB2 file is located.     */
/* (FILE) (10) = The name of the file to query with SQL.         */
/* Also supports special value '*COMPRESS'                       */
/* that is used for numeric compression of                       */
/* a value retrieved from a data area.                           */
/* (FIELD) (10) = The name of the field to retrieve with SQL.    */
/* &DVWHEREX (257) = An SQL WHERE clause followed by 'X'. The    */
/* WHERE keyword must be included to specify                     */
/* record selection rules. Other/additional                      */
/* SQL syntax is allowed if it may follow the                    */
/* primary SELECT phrase but only the first                      */
/* value will be returned in any case.                           */
/*                                                               */
/* The primary SQL phrase is:                                    */
/* SELECT CHAR(field) FROM library/file                          */
/* &QQCMPNUM (1) = Instruction to compress numeric values.       */
/* VALUES: 'Y' = Yes, compress to digits only.                   */
/* blank / 'N' = No, perform no compression.                     */
/* CAUTION: If the field value is all char,                      */
/* compressing to include only digits will                       */
/* cause a blank value to be returned.                           */
/* &QQERROR (7) = Blanks are returned if there was no error.     */
/* If not blank, a meaningful error message                      */
/* should be sent to QSYSOPR or other user.                      */
/* The programmer may also add other logic                       */
/* in this program if there is an error, but                     */
/* it might be better to use the LSAM Message                    */
/* Management facility to detect the error                       */
/* message so that IBM i or OpCon Events can                     */
/* easily be generated. In this model program,                   */
/* the message ID to trap is CPF9898 and the                     */
/* Primary message text begins with:                             */
/* DYNVARSQLC                                                    */
/*                                                               */
/*****************************************************************/
PGM     PARM(&DVVALUEX  &DVNAME)

          DCL VAR(&DVVALUEX) TYPE(*CHAR) LEN(129)
          DCL VAR(&DVVALUE)  TYPE(*CHAR) LEN(128) STG(*DEFINED) DEFVAR(&DVVALUEX)

          DCL VAR(&DVNAME)   TYPE(*CHAR) LEN(12)
          DCL VAR(&DVWHERE)  TYPE(*CHAR) LEN(256)
          DCL VAR(&DVWHEREX) TYPE(*CHAR) LEN(257)
          DCL VAR(&QQCMPNUM) TYPE(*CHAR) LEN(1) VALUE('N')
          DCL VAR(&QQERROR)  TYPE(*CHAR) LEN(7)
          DCL VAR(&SVVALUE)  TYPE(*CHAR) LEN(128)

          DCL VAR(&MSGID)    TYPE(*CHAR) LEN(7)
          DCL VAR(&MSGF)     TYPE(*CHAR) LEN(10)
          DCL VAR(&MSGFLIB)  TYPE(*CHAR) LEN(10)
          DCL VAR(&MSGDTA)   TYPE(*CHAR) LEN(256)

/*--------------------------------------------------------------*/
/* Original value is returned in case of error. Programmer may  */
/* decide to return some other value, depending on where the    */
/* Dynamic Variable token is being used.                        */

            CHGVAR VAR(&SVVALUE) VALUE(&DVVALUE)

/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
            SELECT

/*--------------------------------------------------------------*/
/* Example of file-field retrieval with WHERE clause for keys   */
/*--------------------------------------------------------------*/

            WHEN COND(&DVNAME *EQ 'LSAMAXJOB') THEN(DO)

            CHGVAR VAR(&DVWHERE) VALUE('WHERE LSAPAR1 = +
                             ''LSAMAXJOB''')
            CHGVAR VAR(&DVWHEREX) VALUE(&DVWHERE *CAT 'X')

/* If returned value should compress numbers to only digits,   */
/* change the &QQCMPNUM variable to a value of 'Y' (= Yes).    */

            CHGVAR VAR(&QQCMPNUM) VALUE('Y')
/* If LIBRRARY will rely on *LIBL, pass blanks to RPG program...*/

            CALL DYNVARSQLR PARM(&DVVALUEX &DVNAME ' ' +
             'LSAPARF00' 'LSAPAR2' &DVWHEREX &QQCMPNUM &QQERROR)

            IF COND(&QQERROR *NE ' ') THEN(DO)
              CHGVAR VAR(&MSGDTA) VALUE('DYNVARSQLC received +
                       error code ' *CAT &QQERROR *CAT +
                       ' from DB retriever program DYNVARSLQR'
            SNDPGMMSG MSGID(CPF9898) MSGF(QSYS/QCPFMSG) +
                       MSGDTA(&MSGDTA) TOUSR(*SYSOPR) +
                       MSGTYPE(*INFO)
            CHGVAR VAR(&DVVALUE) VALUE(&SVVALUE)
            GOTO CMDLBL(ENDPGM)
          ENDDO
/* To return only part of a field value, use the %SST function, */
/* for example: VALUE(%SST(&DVVALUEX 10 45)) returns 45         */
/* characters starting at position 10 of the &DVVALUE variable.*/

        ENDDO
/*--------------------------------------------------------------*/
/* Example of data area value retrieval: Date last LSAM purge   */
/*--------------------------------------------------------------*/

               WHEN COND(&DVNAME *EQ 'LSAMNG') THEN(DO)
            
/* The RTVDTAARA command optionally supports a start position   */
/* and length of the data to retrieve from a data area.         */

             RTVDTAARA DTAARA(LSAMNG *ALL) RTNVAR(&DVVALUE)  
             MONMSG MSGID(CPF0000) EXEC(DO)
               RCVMSG MSGTYPE(*EXCP) RMV(*YES) +
                       MSGDTA(&MSGDTA) MSGID(&MSGID) +
                       MSGF(&MSGF) MSGFLIB(&MSGFLIB)
             SNDPGMMSG MSGID(&MSGID) MSGF(&MSGFLIB/&MSGF) +
                       MSGDTA(&MSGDTA) TOUSR(*SYSOPR) +
                       MSGTYPE(*INFO)
             CHGVAR VAR(&MSGDTA) VALUE('DYNVARSQLC received
                       error code ' *CAT &MSGID *CAT +
                       ' from RTVDTAARA command'
             SNDPGMMSG MSGID(CPF9898) MSGF(QSYS/QCPFMSG) +
                       MSGDTA(&MSGDTA) TOUSR(*SYSOPR) +
                       MSGTYPE(*INFO)
             CHGVAR VAR(&DVVALUE) VALUE(&SVVALUE)
             GOTO CMDLBL(BYPASSDTAR)
           ENDDO

/* If returned value should compress numbers to only digits,    */
/* load the value into &DVVALUEX, set the &QQFILE variable to   */
/* the special value of '*COMPRESS', then call DYNVARSQLR. After*/
/* the program returns, if &QQERROR is blank, reload the value  */
/* back to &DVVALUE.                                            */

/* If LIBRRARY will rely on *LIBL, pass blanks to RPG program...*/

              CALL DYNVARSQLR PARM(&DVVALUEX &DVNAME ' ' +
               '*COMPRESS' ' ' &DVWHEREX &QQCMPNUM &QQERROR)

              IF COND(&QQERROR *NE ' ') THEN(DO)
            CHGVAR VAR(&MSGDTA) VALUE('DYNVARSQLC received +
                     error code ' *CAT &QQERROR *CAT +
                     ' from DB retriever program DYNVARSLQR'
              SNDPGMMSG MSGID(CPF9898) MSGF(QSYS/QCPFMSG) +
                        MSGDTA(&MSGDTA) TOUSR(*SYSOPR) +
                        MSGTYPE(*INFO)
              CHGVAR VAR(&DVVALUE) VALUE(&SVVALUE)
              GOTO CMDLBL(ENDPGM)
ENDDO
...+...1...+...2...+...3...+...4...+...5...+...6...+...7
```
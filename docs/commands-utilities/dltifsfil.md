---
sidebar_label: 'DLTIFSFIL: Delete IFS File'
---

# DLTIFSFIL: Delete IFS FIle

The DLTIFSFIL command enables a solution for automating disk space maintenance by deleting files in a specified IFS file system directory (usually outside of the DB2 database).  This utility will typically be used in the IFS root(/) file system, but it also supports the /QOpenSys file system and possibly other non-DB2 file systems.  (It will not work for the /QDLS file system.) 

Some of the command parameters (as noted below) support using Dynamic Variable {TOKENS}, making it possible to use the command with variables outside of LSAM Response Rules or Multi-Step Job Scripts.
                                                                       
As the command executes, it will report each file that is deleted to the IBM i job log.  These messages are logged using severity code 40 to help get them recorded even when other job logging might be suppressed according to the job's LOG( ) parameters. In addition, as files are deleted records reporting each file deletion are added to the LSAM's general purpose Submitted Job log (file LSALOGF30), using the log code of DF:'.

## DLTIFSFIL command syntax

Here is an example of the command showing all available parameters, including default values for the options that provide them.

:::info Example
```
DLTIFSFIL PATHNAME('/directory/sub-directory/') FILE('file?name*') PURGECYMD('20180603')
USEFILDATE(1) FAILNOFILE(0) KEEPWRKLIB(N)
```
:::

### Command parameters

- **PATHNAME**: The pathname must start and end with /. 

This parameter supports replacement of a Dynamic Variable {TOKEN} instead, or as part of the pathname.  But the Dynamic Variable token must include the forward slash characters, otherwise those characters must surround one or more variable tokens that define the pathname.
                                                                       
Only one directory path name can be used at a time.  This command does not currently support searching of directories subordinate to the named directory.
                                                                       
Be sure to use quotes and include the trailing slash character:        
:::info Example
```
'/home/APPDIR/'
```
:::
- **FILE**: Complete file name, generic file name or Dynamic Variable {TOKENS}.

Generic file names can include single-character substitutions, where a question mark [?] is inserted for each unspecified character.  A trailing asterisk [*\*] can be used at the end of a partial name so that only the characters before the asterisk must match any/all files that are found.  It is possible to use an asterisk in place of a suffix, if the period [.] is typed into this FILE parameter before the asterisk.  An asterisk cannot be used as a leading character of a generic file name.
- **PURGECYMD**: Date in \*ISO0 format (CCYYMMDD = century, year, month, day).

Always include all 8 digits with no punctuation.  A Dynamic Variable {TOKEN} can be used to provide the date value.  (Dynamic Variables with a function code of \*DATE are useful for reformatting captured data into the \*ISO0 format required by this parameter.)

When a valid ISO date is provided, it will cause only files equal to, or earlier than the purge date to be deleted.  A separate parameter supports choosing either the file Create date or the file Modify date (where Modify = the last time the file content was upated).
                                                                     
The command accepts either a fully-formatted ISO-format date or zeros for this parameter in order to determine which files should be deleted.
                                                                     
A Dynamic Variable {TOKEN} can be used to provide the purge control date. This explains why a numeric date value must be included in a pair of single quotes.
                                                                     
The ISO format for the date may not include any punctuation, but it must include all 8 digits for the date.  To specify 01 July 2020...
:::info Examples
```
    - INCORRECT:  '2020-07-01'
    - CORRECT..:  '20200701'
    - ALLOWED..:  20200701
    - CORRECT..:  '{TOKEN}'
    - INCORRECT: {TOKEN}
```
:::
If this parameter is left set to zero, then all matching files found in the PATHNAME directory will be deleted.
- **USEFILDATE**: Choose either **1** = Create date, or **2** = Modified date.

When a valid purge date has been specified, each file that matches the FILE name field will have one of its dates compared, verifying that the date is equal to, or prior to the purge cut-off date.
                                                                     
This control parameter determines whether the file's original create date is used, or the date when file content was last modified.     

If an invalid date value is provided, the command might fail, or it might result in a value of zeros or some other number that could cause all files in the PATHNAME directory to be deleted.  Making this command flexible requires careful attention to the purge control date value.
- **FAILNOFILE**: **1** = Yes, fail if no files deleted, **0** = No, do not fail.

This option controls whether the DLTIFSFIL command will report a failure when no files were found to delete (1=yes).  Using this option helps to detect if the Pathname or File name were possibly incorrect.  After a job using this command has proven it works correctly, it might be convenient to change the FAILNOFILE parameter to (0=No) if the site does not care when no files are found to delete.

In support of this parameter the DLTIFSFIL command will return both a completion or *ESCAPE message, and optionally some message text that explains any error or reports the number of files deleted.

This improves its interface with the Multi-Step Job Scripting tool. These results can be tested and utilized by the $MSGID and $MSGTXT variables supported by the Multi-Step Job Scripting steps.

>**CKF0996**: Normal end of job. Usually reports number of files deleted. View the job log from the job that executed the DLTIFSFIL command for messages that list the actual file(s) deleted.
>
>**CKF0997**: Abnormal end of job.  The DLTIFSFIL command forces a failure and this message ID plus the message text are returned. Look at both the IBM i job log from the job that executed the DLTIFSFIL command, and the OpCon Agent for IBM i: LSAM Submit Job log file
(using LSAM sub-menu 6, option 5, log viewer 4) for more information that may be available to explain failures.

- **KEEPWRKLIB**: **Y** = yes, **N** = no - delete the work library.

The DTLIFSFIL command employs the same file search utility program as does the CHKIFSFIL command.  The QSHELL functions that are used to search for matching file names sends a file list to a file in a temporarly work library in the DB2 file system.
                                                                       
The default action of the command driver program is to delete the temporary work file just as the program is ending.  But for diagnostic puroses, it is sometimes helpful to retain the temporary library so that the QSHELL file list can be examined.
                                                                       
Whenever the user forces the temporary work library to be retained, it is the user's responsibility to delete any of these working libraries to avoid excessive use of disk space.


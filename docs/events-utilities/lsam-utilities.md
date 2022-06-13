---
sidebar_label: 'How LSAM Menu-based Utilities Work'
---
# How LSAM Menu-based Utilities Work

There are many different kinds of utility programs and commands offered with the IBM i LSAM software. Many of these are described in the topic about Commands and Utilities. This section is devoted to the utilities that are accessible from the LSAM sub-menu 3: Events and Utilities Menu. The focus is on the SCANSPLF and SCANOUTQ utilities and related features that can be used with them, including dynamic variables, data capture and captured data response rules.

## The SCANSPLF Utility

The SCANSPLF(Scan spool file) is an LSAM utility command that can find and read spool (report) files from an IBM i output queue. As the command executes, it stores found scan values into the LSAM's data capture log file. Captured data can optionally be associated with Captured Data Response Rules. As the command completes, it evaluates whether all the required scan values were found and it reports about any scan values that were not matched. A parameter of the SCANSPLF command controls how
the command reports its ending status. It can finish with a forced abnormal termination or a normal termination, based on the result of the scan values evaluation and on the option selected for the command's FAILOPT parameter.

The SCANSPLF command may be used as an interactive command from IBM i command entry (if the interactive job includes the LSAM environment library list) or as the Call command line text in an IBM i job on an OpCon/xps schedule. A command parameter "OPCONXPS" must be set to Y=yes or N=no, depending on the environment in which the command is executed. It is important that this parameter be set to Y=yes to enable cooperation with OpCon/xps, but the command will fail unless this option
is set to N=no when the command is executed outside of the control of an OpCon/xps job. 

This command submits a list of scan values in a parameter string included as a keyword value with the command syntax, and the list of scan values must match the predefined SPLF Scan Rules registered in the LSAM database. There must be a number of SPLF Scan Rules with a Scan Value set to \*PARM and with the required option set to Y=yes, that equals the number of input values listed in the PARAMETERS keyword of the SCANSPLF command. This set of Scan Rules must all be registered using the same Application value as specified for the APP keyword of the SCANSPLF command.

As the command completes, when it has been submitted from an OpCon/xps schedule, it reports back details about the scan values matched or mismatched. In addition, a completion message is sent to the OpCon/xps SAM describing a successful, complete match of all SPLF Scan Rules or any reason why the command has ended abnormally. This information is available from the OpCon/xps view of the job using a right mouse click context menu and selecting Job Configuration. From the Job Configuration 
window that appears, the list of values for Operations Related Information shows all of the messages that have been sent by SCANSPLF to the SAM.

The FAILOPT parameter of the SCANSPLF command controls when the command forces an abnormal termination. This option can be set to the default behavior of ending abnormally when any required Scan Rule is not matched, or it can be set to the reverse logic of forcing an abnormal termination when all Scan Rules are matched (such as when the scan is for an error code found in a job log report). Optionally, the command can also be set to end normally regardless of the outcome of Scan Rules
matching.

When the SCANSPLF command driver program determines that the command should end abnormally, the driver program ends with escape message code RNX9001 (the standard message from an RPG program \*PSSR subroutine that has ended at the \*CANCL exit point). This message is reported with the job termination message code CEE9901. The job detail messages shown under the OpCon/xps Job Information context menu tabs Configuration -\> Operations Related Information -\> Job Detail Messages, will indicate
when this error message condition is expected, or if an unexpected program error occurred.

One typical example of how the SCANSPLF utility can be used is with financial transaction batch balancing procedures. Control totals may be inserted as the SCANSPLF PARAMETERS scan values string and those values can be matched to totals appearing on a batch posting report. This application of the command enables automation of procedures that might otherwise require human intervention. The optional logging feature supports this process with entries that can be audited to prove that the
process worked correctly.

### Processing Multiple Spool Files With SCANSPLF

The SCANSPLF command was originally constructed for the purpose of locating a single spool file belonging to one job and scanning that report for the content specified in the Scan Rules. However, with careful manipulation of the command parameters it is possible to define a single scan task that can span multiple spool files across multiple jobs.

The capabilities and limitations of the SCANSPLF command for handling multiple spool files are different from the SCANOUTQ command, described below. Sometimes, the SCANOUTQ command might be more appropriate for certain tasks.

One of the limitations of the SCANSPLF command is that it must be told the job name(s) to use for identifying the spool file(s) to scan. The name of the job can be supplied by either the Scan Rules or by the JOBNBR parameter of the SCANSPLF command (where the JOBNBR parameter actually supports more than just the IBM i job number - refer to the table of fields for the prompted SCANSPLF command, below). If a Scan Rule specifies \*CMD for the job name, and the SCANSPLF command provides no value for the JOBNBR parameter, then the Scan Rule will be skipped and a warning message will be added to the Captured Data Log file. If all rules for the Application are skipped, then the SCANSPLF command will fail for the reason that no valid job name could be determined.

Scan Rules always require a Spool File (SPLF) name. It is possible to register more than one SPLF name within a single Application. This capability was included primarily to support the SCANOUTQ command, but it can also be used directly by the SCANSPLF command. No examples of this capability are illustrated in this document, but possible applications can be discovered by experimentation.

More importantly, it must be understood that if the SPLF parameter of the SCANSPLF command is not left at the default value of \*APP (meaning that the Scan Rules under the named APPlication will provide one or more spool file names to scan), then the SCANSPLF command is, in effect, limiting the current scan task to a subset of Scan Rules that match the SPLF name provided by the command. The designed intention of allowing SCANSPLF to use a subset of an Application's Scan Rules was to support
the way the SCANOUTQ command will execute the SCANSPLF command separately for each spool file name that is registered to the Application. In some cases, it may be useful to create a job that will use only the Scan Rules for one spool file, even though the Application had more SPLF names registered. Thus, the outcome of the SCANSPLF task will be limited by only the rules for the one SPLF name, instead of being subject to the rules for all the registered spool files.

When experimenting with the powerful flexibility of the SCANSPLF command parameters, it will be helpful to carefully examine the content of the  Display Data Capture Debug Log file (LSAM sub-menu 3, function 9). This log is only loaded with data when the LSAM Utility Configuration function (sub-menu 3, function 7) has set the "Capture data debug  logging" flag to a value of Y=yes. Therefore, it would be important  that this flag be set to Y=yes until new SCANSPLF applications have been
proven reliable. After that, the debug log flag could be turned off in order to improve system performance and reduce disk space utilization. But please remember that this debug log file may also be useful for auditing purposes. Some highly audited data centers may require that the  debug logging flag be left active at all times. In this case, the SMARGZ command and/or the LSAM default file management parameters must be configured to periodically backup and purge the log file so that it does 
not consume large amounts of disk space. There are many log entries made for each SCANSPLF task, especially when multiple spool files are being
scanned.

#### SCANSPLF Parameters and Rules Limitations

The SCANSPLF command supports up to 16 scan values in the PARAMETERS keyword string, and each parameter value can be up to 64 characters long. But the SPLF Scan Rules will support up to 32 rules overall, per spool file + job name combination. A single Application code will support up to 32 spool file + job name combinations, up to a limit of 999 rules per Application.

### Using SCANSPLF to Determine OpCon Job Completion Status

It is possible to control the final job completion status that the IBM i LSAM will report to OpCon SAM by adding the SCANSPLF command to the Call command line of the OpCon job master record.

When the SCANSPLF command is included in the job Call command line after a special character, the IBM i LSAM will withhold a report to OpCon/xps about the job  completion status until after it completes the evaluation of the job log. This post-job log evaluation is only performed when the original Call command of the job has completed normally; it will not be performed for jobs that ended abnormally. For jobs that did complete normally, the final completion status of the job that is reported to the OpCon schedule will depend on the Scan Rules defined for this job name and the spool file QPJOBLOG, under the Application ID specified with the SCANSPLF command. Many Scan Rule options are available to control whether a job will be reported as completed normally or failed.

When the SCANSPLF command is used along with additional SBMJOB job parameters, the SCANSPLF command and its own parameters must follow any job definition parameters. That is, the SCANSPLF command string must be the last string of non-blank characters in the Call information field, following the Job parameters separator character, as in the following example:

:::tip EXAMPLE
```
WRKJOB JOB(*) OUTPUT(*PRINT) 
OPTION(*ALL)|CCSID(297)  
SCANSPLF APP(ChkJobLog1)  
```
:::

Remember that the APP() keyword of the SCANSPLF command is case-sensitive.

For important additional information about the special character that is used to separate job parameters and the SCANSPLF command from the primary Call information line values, please review IBM i LSAM Configuration - \> Extended Discussion on Parameters -\> Job Parameters Separator-HEX.

### SCANSPLF Command Syntax

The SCANSPLF command entered in an IBM i command line, either from IBM i or from the Call information in an IBM i job on an OpCon/xps schedule, requires the syntax illustrated in the following example:
:::tip  EXAMPLE
```
SCANSPLF APP('App ID: lower case and spl chars') DATE(20010101)
OPCONJOB(Y) PARAMETERS('*empty*:12345:*empty*:67890')
JOBNBR(123456/username/jobname) FAILOPT(1) SPLF(*APP)
SPLNBR(*APP) USRDTA(*ALL) CMDMODE(*CMD) USRDFNDTA(*ALL)
JOBLOGMSG(Y)
```
:::

The individual keywords are explained in a table following the screen illustration below of this command prompted using function key <**F4**\> from IBM i command entry. Notice, above, that the APP and PARAMETERS keyword values are enclosed in single quotes. These are required in order to communicate space characters, numeric digits and special characters as part of a single character string to the command processor program.

There must be the same number of scan values, separated by colons, in the PARAMETERS keyword as there are SPLF Scan Rules using a Scan Value of \*PARM in the LSAM rules table. Also, each of the \*PARM Scan Rules must be set as required (that is, the Required Rule field must be set to Y = yes). However, the SCANSPLF command is allowed to also process additional scan rules that specify a different Scan Value, such as a directly-entered value or a Dynamic Variable (refer to the chapter about
[Dynamic Variables](../dynamic-variables/overview.md)). There is also an option to create scan rules that simply capture report data, using the value \*CAPT in the Scan Value field. The PARAMETERS keyword supports a maximum of 16 parameter values, but each spool file name + job name combination, within an Application, can include up to 32 Scan Rules (implying that any required rules over 16 cannot be associated with the command PARAMETERS).

Regardless of the type of Scan Value (registered in the Scan Rules), the SCANSPLF command completion status (normal or failed) depends on all required SPLF Scan Rules being matched. However, it is possible to also specify Scan Rules that are not required, so that they do not affect the outcome of the command but, perhaps, only enable the execution of a Captured Data Response Rule. After the list of required scan rules has been summarized and evaluated to determine if all matched or if any did
not match, the actual completion status of the SCANSPLF command is determined by the FAILOPT parameter, as described in the command parameters table, below.

The CMDMODE parameter keyword is provided for LSAM internal use only. This keyword must be left at the default value of \*CMD whenever the SCANSPLF command is used in a stand-alone mode, that is, from the IBM i command entry screen or from within any batch job. There is an alternate value supplied for this parameter by the LSAM job completion message server job to support the option of appending the SCANSPLF command to the OpCon/xps Call command line, so that the final job completion status
reported to the OpCon/xps SAM will be determined by the results of the scan command.

Prompted SCANSPLF Command - Page 1 of 2
```

                         Scan Spool File (SCANSPLF)
                                                                
Type choices, press Enter.
                                                                
Application (Capture ID) . . . . APP            ______________________________
Date, as CCYYMMDD  . . . . . . . DATE           _________
OpCon/xps job? Y=yes, N=no . . . OPCONJOB       Y     
*RULES, or parms (P1:P2:...Pn)   PARAMETERS     *RULES________________________
______________________________________________________________________________                         
______________________________________________________________________________                         
______________________________________________________________________________                         
______________________________________________________________________________                         
______________________________________________________________________________
______________________________________________________________________________
  ...    
 Job number (123456), optional  . JOBNBR         _____________________________
 Command fail behavior option . . FAILOPT        1               
 Spool file name or \*APP  . . . . SPLF          *APP
                                                                       More...
F3=Exit   F4=Prompt   F5=Refresh   F12=Cancel   F13=How to use this display
F24=More keys

```

Prompted SCANSPLF Command - Page 2 of 2.

```

                         Scan Spool File (SCANSPLF)
                                                               
Type choices, press Enter.

Spool file number,if Rule *ANY   SPLNBR         *APP
User data  . . . . . . . . . . . USRDTA         *ALL
Command mode (always *CMD) . . . CMDMODE        *CMD
User-Defined Data (*generic*)  . USRDFNDATA     *ALL
______________________________________________________________________________
______________________________________________________________________________
Msg to job lob? Y/1=yes, N/0=no   JOBLOGMSG     Y
                                  INT_ONLY_

                                                                        Bottom
F3=Exit   F4=Prompt   F5=Refresh   F12=Cancel   F13=How to use this display
F24=More keys
```
##### Fields

| Keyword    | Size    | Type   | Description                       |
| -------    | ----    | ----   | -----------                       |
| APP        | 30      | *CHAR  | Value must be enclosed in single quotes. Type up to 30 characters. Upper and lower case letters, numeric digits and special characters are allowed. Spaces are allowed but not recommended; use underline characters insted of spaces. This value must match an Application ID that has been registered using the LSAM Menu 3, function 3.                       |
| DATE       | 8.0     | *DEC   | -   Optionally, specify a date in CCYYMMDD format, to identify the processing date of the target spool file. This value limits the list of jobs that the SCANSPLF command will search for the spool file. It is also used to specify the Capture Date in the captured data log file (OPRLOGF40) where found values are stored. If this value is left at zeros or not specified, the current IBM i system date is assumed. |
|            |         |        | -   The command processor also supports using the name of an LSAM Dynamic Variable in this  field.                        |
| OPCONXPS   | 1       | *CHAR  | -   Y=yes (default), N=no. Set this parameter to Y when the SCANSPLF command will be used in an OpCon/xps scheduled job. Set this     parameter to N when the command will be used from IBM i command entry or called by a job originating outside of OpCon/xps.                    |
|            |         |        | -   This parameter tells the SCANSPLF command whether to send completion messages to OpCon/xps. These messages cannot be used outside of the LSAM-to-OpCon/xps interface.  |
| PARAMETERS | 1024    | *CHAR  | - The entire value string must be enclosed in a pair of single quotes. Each scan value is separated by the colon (:) character. The  number of value strings provided with this keyword must equal the number of SPLF Scan Rules registered using the LSAM menu 3, function 4, that have *PARM specified     for their Scan Value. There can be up to 16 parameters in this string. |
|            |          |       | - It is possible to include a colon character as part of a scan value if the scan value is enclosed in single quotes. (To include single quotes within the entire PARAMETERS value string type two single quotes together.)  |
|            |           |      | -   It is also possible to include a single quote within a scan value by enclosing the scan value within single quotes and by doubling (again) the enclosed single quote. However, this means that the single quotes would have to be twice doubled, since they would be nested at a third level, so this would be difficult to specify correctly. Experimentation may be required to achieve the desired result. |
|            |           |      | -   Special values that may be used to indicate a scan value should be bypassed during a given execution of the command may be registered in the LSAM SPLF Scan rules. In the command syntax shown above, the value '*empty*' is used as an  example of a possible scan value bypass value.   |
|            |           |      | -   The command processor also supports using the name of an LSAM Dynamic Variable in this field. |
|            |           |      | -   Refer to Utility Screens and  Windows, later in this topic, for more information about SPLF Scan Rules.         |
| JOBNBR     | 28 (30) | \*CHAR | -   To direct the SCANSPLF to  find a specific job, type the IBM i job number (6 digits) for this keyword value. If this optional parameter value is not specified, the SCANSPLF command will search for the latest (most recent) incidence of the Job Name specified in the LSAM SCANSPLF Application master record.                       |
|            |           |      | -   It is also possible to specify any or all of the three parts of an IBM i job  ID by including one or two forward slash characters. To do this, the value must be enclosed within single quotes in order to get the IBM i command processor to accect the slashes as part of the job ID character string.|
|            |           |      | -   To specify a whole IBM i job ID, it is only necessary to provide the 6-digit job number because this number implies the user name and the job name.                     |
|            |           |      | -   When specifying a user and/or job name without using a specific job number, type one or two slashes using one of the following models:         |
|            |           |      |    -   User only = '/username' |
|            |           |      |    -   Job name only = '//jobname'             |
|            |           |      |    -   User and job name =  '/username/jobname'     |
|            |           |      |    -   The command processor also supports using the name of an LSAM Dynamic Variable in this field.   |
| FAILOPT    | 1       | *CHAR | Controls the final completion status of the SCANSPLF command, affecting also the final status of a submitted job (such as jobs submitted by OpCon/xps) when the SCANSPLF command is the only step in the job. Possible values include:                          |
|            |           |      | -   1 = force abnormal end when ANY required scan rule was NOT matched (ANY FAIL)        |
|            |           |      | -   2 = force abnormal end when ANY required scan rules DO match (ANY PASS)              |
|            |           |      | -   3 = force normal end regardless of scan rule match outcome                       |
|            |           |      | -   4 = force abnormal termination when ALL required scan rules are NOT matched (ALL FAIL) |
|            |           |      | -   5 = force abnormal termination when ALL required scan rules DO match (ALL PASS)                         |
| SPLF       | 10        | *CHAR | Spool file name to scan:   |
|            |           |      | -   The *APP special value indicates that one or more spool files registered to the APPlication in the Scan Rules will be the spool file names to find and scan. |
|            |           |      | -   To limit the scan task to only one spool file name, such as when more than one SPLF was registered to the same APP, type the full name of the spool file in this field.                        |
|            |           |      | -   The command processor also supports using the name of an LSAM Dynamic Variable in this field.                        |
| SPLNBR     | 10      | *CHAR | Spool file number to scan:     |
|            |           |      | -   The *APP special value indicates that the APPlication Scan Rules will the limits on which spool file number (of a job) to find and scan. |
|            |           |      | -   If the Scan Rules specify *ANY for the spool file number, this parameter can be used to limit the current task to any of the following values that IBM i spool file commands will support:        |
|            |           |      | -   1 - 999999, *ONLY, *LAST, *ANY                         |
|            |           |      | -   The command processor also supports using the name of an LSAM Dynamic Variable in this field.                        |
| USRDTA     | 10      | *CHAR | -   This field can be used to limit the spool file selected for scanning by its user data value.                        |
|            |           |      | -   The special value of *ALL means to accept a spool file without checking the user data value assigned to it.    |
|            |           |      | -   The command processor also supports using the name of an LSAM Dynamic Variable in this field.                        |
| CMDMODE    | 10      | *CHAR | -   This parameter is intended for LSAM internal user only. 
|            |           |      | -   *CMD = The SCANSPLF command is being used alone, such as execution from IBM i interactive command entry or as a step in a batch job.|
|            |           |      | -   *JORS = The SCANSPLF command was specified as an extension to the OpCon/xps job master Call command line for the IBM i job. The job's job log spool file will be scanned to determine the final completion status of the job that is reported to OpCon/xps SAM.                          |
| USRDFNDTA  | 256     | *CHAR | Use single quotes to enclose a string of data that should match the User Defined Data attributed of spool files that qualify for the command to process.|
|            |          |  | '*GENERIC*'                   |
|            |          |  | Generic, or partial, values may be used. Type an asterisk at the beginning to indicate that any number of characters (or no characters) may precede the matching string. Type an asterisk at the end to indicate that any number of characters (or no characters) may follow the matching string. Either or both of the asterisks may be used.  |
|            |          |  | If no asterisks are typed, then the character string in this parameter must match exactly and completely the User Defined Data attribute of a spool file.        |
|            |          |  | NOTE: The single character wild card value of a question mark '?' is NOT supported by this command.                          |
| JOBLOGMSG  | 1       | *CHAR | Y = Yes: Add a message to the SCANSPLF job's IBM i Job Log, whenever a progress or error log entry is being added to the LSAM's Captured Data Debug Log file.                             |
|            |         |   | Blank or 'N' = No: Do NOT add messages to the IBM i Job Log. Progress and error messages will only be written to the LSAM log file.  |
| INT_ONLY_  | 0       | (NULL) | Ignore this displayed parameter keyword. This command keyword is used only by the SCANSPLF command processor program to receive IBM i internal address values that are sent from the SCANOUTQ command (and other LSAM programs) to improve the efficiency of the command.                          |

## The SCANOUTQ Utility

The purpose of the SCANOUTQ command is to search among spool files found in a single IBM i output queue and then to execute the SCANSPLF command for each spool file that qualifies, according to the SCANOUTQ command parameters and the Scan Rules of the named Application.

SCANOUTQ is not limited in the number of spool files it qualifies for scanning, except by the selection rules of the SCANOUTQ command and by the number of different spool file + job name combinations that have been registered under the Application. The documented limits of the SCANSPLF command above do not apply in terms of how many different spool files and job names may be included in the same Application, because when the SCANOUTQ command calls the SCANSPLF command, it has already
selected just one spool file and one job. Thus, out of all the Scan Rules registered to the Application, only the Scan Rules that match the selected spool file name will be loaded into the SCANSPLF command processor.

The PARAMETERS keyword of the SCANOUTQ command is supported so that its value can be passed along to each execution of the SCANSPLF command. That is, if a PARAMETERS string value is provided instead of using the default value of *RULES, then that set of PARAMETERS must be matched by each execution of the SCANSPLF according to the rules of the SCANSPLF command, documented above.

It may be important to note that there are four parameters of the SCANOUTQ command that can be used to temporarily store the IBM i job ID and the spool file number of each spool file selected for processing. The parameters support entry of the name of an LSAM dynamic variable ([without] the special characters that make a dynamic variable into a replaceable token). The SCANOUTQ command stores values into one or more of these dynamic variables so that they are available to any captured data response rules that are linked to the Scan Rules for a spool file. This makes it possible to perform extended processing of spool files found in an output queue, such as creating an application to re-route or delete spool files that meet certain selection criteria. Refer to the example application for the SCANOUTQ command, below, to
learn how these dynamic variable parameters can be used. 

Since the SCANOUTQ command is a driver to select spool files to be scanned by the SCANSPLF command, then the functions of this SCANOUTQ command can be understood by studying the syntax and the parameter fields table that follows.

:::tip
It is not possible to use the SCANOUTQ command in an OpCon IBM i job master record as an extension to the Call command line, as with SCANSPLF. However, the SCANOUTQ command can be executed by a separate IBM i batch job in an OpCon schedule.
:::

### SCANOUTQ Command Syntax

The SCANOUTQ command entered in an IBM i command line, either from IBM i or from the Call information in an IBM i job on an OpCon/xps schedule, requires the syntax illustrated in the following example:
:::tip EXAMPLE
```
SCANOUTQ OUTQ(MYLIB/MYOUTQ)
   APP('App ID: lower case and spl chars')
   DATE(20130301) DATECOMP(EQ)
   OPCONJOB(N) FAILOUTQ(3) FAILSPLF(3)
   PARAMETERS('*RULES') JOBNAME( ) USER(*ALL)
   SPLF(MYREPORT) USRDTA(*ALL) FORMTYPE(*ALL)
   DVSPLNBR(THISSPLNBR) DVJOBNBR(THISJOBNBR)
   DVJOBUSR(THISJOBUSR) DVJOBNAM(THISJOBNAM) NOSPLFOPT(1)
   USRDFNDTA(*ALL)
```
:::

The individual keywords are explained in a table following the screen illustration below of this command prompted using function key <**F4**> from IBM i command entry. Notice, above, that the APP and PARAMETERS keyword values are enclosed in single quotes. These are required in order to communicate space characters, numeric digits and
special characters as part of a single character string to the command processor program.

The SCANOUTQ parameter values that are the same as those supported by the SCANSPLF command are explained in more detail above, under the discussion and the table of fields for the SCANSPLF command.

##### Fields


| Keyword    | Size    | Type   | Description                       |
| -------    | ----    | ----   | -----------                       |
| OUTQ       | 10 + 10 | *CHAR | The output queue name, followed by the library location of the output queue. If the special value *LIBL is used for the location of the output queue, then the queue must be found in the library list of the job where the SCANOUTQ command is executing.                        |
| APP        | 30      | *CHAR | Value must be enclosed in single quotes. Type up to 30 characters. Upper and lower case letters, numeric digits and special characters are allowed. Spaces are allowed but not recommended; use underline characters instead of spaces. This value must match an Application ID that has been registered using the LSAM Menu 3, function 3. |
| DATE       | 8.0     | *DEC  | -   Optionally, specify a date in CCYYMMDD format, to identify the processing date of the target spool file. This value limits the list of jobs that the SCANOUTQ command will search for the spool file.    |
|            |         |       | -   The command processor also supports using the name of an LSAM Dynamic Variable in this field.                        |
| DATECOMP   | 2       | *CHAR | -   Include spool files with this relationship to the DATE value specified:              |
|            |         |       | -   LT = less than                   |
|            |         |       | -   LE = less than or equal to       |
|            |         |       | -   EQ = equal (the default value) |
|            |         |       | -   GE = greater than or equal to    |
|            |         |       | -   GT = greater than                |
|            |         |       | -   For purposes of date comparison, the time values of 00:00:00 and 23:59:59 are used for the first and last times of the day.|
| OPCONJOB   | 1       | *CHAR | -   Y=yes (default), N=no. Set this parameter to Y when the SCANOUTQ command will be used in an OpCon/xps scheduled job. Set this     parameter to N when the command will be used from IBM i command entry or called by a job originating outside of OpCon/xps.                    |
|            |         |       | -   This parameter tells the SCANOUTQ command whether to send completion messages to OpCon/xps. These messages cannot be used outside of the LSAM-to-OpCon/xps interface.  |
| FAILOUTQ   | 1       | *CHAR | Controls the final completion status of the SCANOUTQ command, based on a summary of all the SCANSPLF command completion statuses. Possible values include:                          |
|            |         |       | -   1 = force abnormal end when any spool file scan command ended abnormally (ANY FAIL)   |
|            |         |       | -   2 = force abnormal end when any spool file scan ends normally (ANY PASS)              |
|            |         |       | -   3 = force normal end regardless of scan task outcome                                  |
|            |         |       | -   4 = force abnormal end if all spool file scans end abnormally (ALL FAIL)              |
|            |         |       | -   5 = force abnormal end if all spool file scans ended normally (ALL PASS)              |
| FAILSPLF   | 1       | *CHAR | Controls the final completion status of each SCANSPLF command. All SCANSPLF scan rules must work the same way for this option to be effective, because there is no other source for the SCANSPLF FAILOPT parameter. Possible values include:                   |
|            |         |       | -   1 = force abnormal end when ANY required scan rule was NOT matched (ANY FAIL)|
|            |         |       | -   2 = force abnormal end when ANY required scan rules DO match (ANY PASS)               |
|            |         |       | -   3 = force normal end regardless of scan rule match outcome                            |
|            |         |       | -   4 = force abnormal end if ALL scan rules do NOT match (ALL FAIL)                      |
|            |         |       | -   5 = force abnormal end if ALL  scan rules DO match (ALL PASS)                         |
| PARAMETERS | 1024    | *CHAR | -   The entire value string must be enclosed in a pair of single quotes, unless the special value of *RULES (which is the default) is  used.  |
|            |         |       | -   The command processor also supports using the name of an LSAM Dynamic Variable in this field.                        |
|            |         |       | -   This value string is sent to each execution of the SCANSPLF command. Refer to the Fields table, above, for the SCANSPLF command for more information about this keyword.                      |
|            |         |       | -   Also refer to the [Add/Change/Copy SPLF Scan Rule](../events-utilities/utilities-screens.md#addchangecopy-splf-scan-rule) for more information about SPLF Scan Rules.        | 
| JOBNAME    | 10      | *CHAR | -   This field may optionally be used to limit the spool file selected from an output queue to only the files belonging to a job of this name.        |
|            |         |       | -   This field may be left blank. |
|            |         |       | -   The job name can be an exact IBM i job name, or a partial (also called generic) job name may be specified by entering the first one or more characters of the job name followed by an asterisk: -  JOBNA* (all job names beginning with JOBNA would match)           |
|            |         |       | -   The command processor also supports using the name of an LSAM Dynamic Variable in this field.   |
| USER       | 10      | *CHAR | -   The job user name may be used to limit the spool files selected form an output queue.           |
|            |         |       | -   This field should not be left blank. The default value is *ALL.                                 |
|            |         |       | -   The command processor also supports using the name of an LSAM Dynamic Variable in this field.   |
| SPLF       | 10      | *CHAR | Spool file name to scan:    |
|            |         |       | -   The \*APP special value indicates that one or more spool files registered to the APPlication in the Scan Rules will be the spool file names to find and scan.             |
|            |         |       | -   To limit the scan task to only one spool file name, such as when more than one SPLF was registered to the same APP, type the full name of the spool file in this field.                        |
|            |         |       | -   The command processor also supports using the name of an LSAM Dynamic Variable in this field.               |
| USRDTA     | 10      | *CHAR | -   This field can be used to limit the spool file selected for scanning by its user data     value.            |
|            |         |       | -   The default value of *ALL means to accept a spool file without checking the user data value assigned to it. |
|            |         |       | -   The command processor also supports using the name of an LSAM Dynamic Variable in this field.               |
| FORMTYPE   | 10      | *CHAR | -   This field may optionally be used to limit the spool files selected from an output queue to only the spool files assigned a particular form type value.       |
|            |         |       | -   The default value of *ALL means to accept any spool file without considering the form type.                  |
|            |         |       | -   The command processor also supports using the name of an LSAM Dynamic Variable in this field.                |
| DVSPLNBR   | 12      | *CHAR | The IBM i LSAM Dynamic Variable that will store the IBM i spool file number with a job. May range from 1 to 999999. If there is more than one spool file with the same name produced by one job, this number is critical for identifying the specific spool file to be processed.      |
| DVJOBNBR   | 12      | *CHAR | The IBM i LSAM Dynamic Variable that will store the IBM i unique job identifying number. Although this number always shows as six digits, it is handled as a character string. |
| DVJOBUSR   | 12      | *CHAR | The IBM i LSAM Dynamic Variable that will store the name of the IBM i User Profile for the job that produced the spool file.     |
| DVJOBNAME  | 12      | *CHAR | The IBM i LSAM Dynamic Variable that will store the name of the IBM i job that produced the spool file.                             |
| NOSPLFOPT  | 1       | *DEC  | -   If the outcome of the FAILOUTQ parameter does not force the SCANOUTQ job to fail, then this option governs whether the job will be forced to fail if no spool files are found that match the Scan Rules requested by this command.                 |
|            |         |       | -   1 = Fail if no SPLF found (the original default behavior).                 |
|            |         |       | -   0 = Do not fail if no SPLF found (useful for system clean up jobs).        |
|            |         |       | -   Refer to the next topic "SCANOUTQ Job Result Evaluation" for more information about the effect of this parameter.            |
| USRDFNDTA  | 256     | *CHAR | Use single quotes to enclose a string of data that should match the User Defined Data attributed of spool files that qualify for the command to process.           |
|            |         |       | '\*GENERIC\*'                   |
|            |         |       | Generic, or partial, values may be used. Type an asterisk at the beginning to indicate that any number of characters (or no characters) may precede the matching string. Type an asterisk at the end to indicate that any number of characters (or no characters) may follow the matching string. Either or both of the asterisks may be used.     |
|            |         |       | If no asterisks are typed, then the character string in this parameter must match exactly and completely the User Defined Data attribute of a spool file.        |
|            |         |       | NOTE: The single character wild card value of a question mark '?' is NOT supported by this command.                          |


### SCANOUTQ Job Result Evaluation

The SCANOUTQ command driver program is designed to force an abnormal termination or to allow a normal termination, depending on the setting of the two FAIL-option keywords, on the NOSPLFOPT keyword, and on the actual results of the spool file scans that are performed.

The SCANOUTQ command itself will generate its own failure conditions if there is an illogical setting of the command parameters, if system limits are exceeded by an excessively large spool file selection set, or if no spool files qualify for scanning. Otherwise, the intended function of the SCANOUTQ command is to evaluate the results of one or more SCANSPLF commands in order to determine if the command should end normally or abnormally.

When the SCANOUTQ command driver program determines that the command should end abnormally, the driver program ends with escape message code RNX9001 (the standard message from an RPG program *PSSR subroutine that has ended at the *CANCL exit point). This message is reported with the job termination message code CEE9901. The job detail messages shown under the OpCon Job Information context menu tabs Configuration -> Operations Related Information -> Job Detail Messages, will indicate
when this error message condition is expected, or if an unexpected program error occurred.

The FAILSPLF parameter of the SCANOUTQ command is passed along to become the value of the FAILOPT parameter for each execution of the SCANSPLF command. Since there is only this one way to set the SCANSPLF parameter FAILOPT this means that all the spool file scans belonging to one SCANOUTQ Application must be configured to work the same way. It is not possible at this time for one execution of SCANOUTQ to combine different FAILTOPT values within a single job. (Hint: When different FAILOPT
values are required, configure two different OpCon jobs that run separate SCANOUTQ Applications and then test the results of both jobs to create subsequent dependencies in OpCon schedules.)

The FAILOUTQ parameter of the SCANOUTQ command specifies how the SCANOUTQ job should respond based on the combination of results from one or more SCANSPLF commands. It is important to understand that the individual SCANSPLF command failures will not cause a SCANOUTQ job to fail, as they would when the SCANSPLF command is executed directly by a job. Instead, the SCANOUTQ command driver program collects the results from all the spool file scan tasks and then evaluates those results according to the FAILOUTQ option value. The possible values for the FAILOUTQ keyword are defined above in the Fields table for the command.

The NOSPLFOPT is used only when the FAILOUTQ option will not force the job to fail. If no spool files match the Scan Rules executed by a job, NOSPLFOPT(1) allows the job to fail (the former default behavior of this command). NOSPLFOPT(0) prevents a job failure when no spool files are found, and this option is useful for system clean up jobs, when it is expected that there may be no matching spool files.

### Flow Chart of SCANOUTQ Automation Strategy

The dynamic variable values that SCANOUTQ can store make it possible for the Response Rules engine to effectively manage each selected spool file. The following flow chart illustrates the flow of the SCANOUTQ process and the method used to make spool file definition values available to captured data response rules.

#### SCANOUTQ Flow Chart

![SCANOUTQ Flow Chart](../Resources/Images/IBM-i/SCANOUTQ-Flow-Chart.png "SCANOUTQ Flow Chart")

### SCANOUTQ Application Example

This example of using the SCANOUTQ command relies on the flow chart above and explains how each element of the flow chart is used. There are examples that would not need the Captured Data Response Rules, such as the report balancing example that is explained in the **IBM i LSAM** online help. But in most cases, the Response Rules define the actions that will be performed as each Scan Rule captures some data from a report.

#### Purpose

The goal of this example application is to find each spool file that matches a certain profile, and then copy that spool file to an IBM i DB2 database file. This example does not illustrate what happens to the database file after the SCANOUTQ command completes its processing. Assuming that an OpCon schedule has requested the execution of this SCANOUTQ command, dependent jobs might subsequently be executed to copy the report data to an external system for additional processing.

In this example, the Scan Rules are utilized only as a link between the action of SCANOUTQ discovering a qualified spool file, and the desired action of the Response Rules to copy the spool file to an IBM i DB2 database file. The Scan Rules will still perform their designed action of capturing some data from the report, but the logged report data is not important in this application, so it would only serve as historical evidence in the log of the spool file that was being processed.

The example starts with some one-time configuration steps to create components that can be reused as many different spool files are processed, or as the process is repeated at some frequency such as daily.

#### Preliminary Configuration

1. An empty DB2 database physical file is created with the appropriate record length that will match the output from the IBM i command CPYSPLF. IBM i reports typically have either 80-byte or 132-byte report lines, although custom statements and letters might employ a unique report line length. The record length of the physical file in this example assumes that report line print control characters will NOT be generated by the CPYSPLF command.
  ```
  CRTPF FILE(QGPL/REPORT80) RCDLEN(80) SIZE(*NOMAX)
  ```
2. LSAM Dynamic Variables will be registered in advance, even though the SETDYNVAR command in the Response Rules (below) could create them on-the-fly. This makes it easier to prompt for the Dynamic Variable names during the configuration of the Response Rules. The LSAM menu function for maintaining Dynamic Variables, for example,  option 6 on the LSAM sub-menu 3: Events and Utilities, could be used to perform this maintenance. But the SETDYNVAR command is shown here for illustration purposes. The parameters defining the Dynamic Variables are the same in either method.
  ```
  SETDYNVAR VARNAM(EXSPLNBR) VARTYP(V) DESC('Spool file Number from
  SCANOUTQ')

  SETDYNVAR VARNAM(EXJOBNBR) VARTYP(V) DESC('Spool file Job Number from
  SCANOUTQ')

  SETDYNVAR VARNAM(EXJOBUSR) VARTYP(V) DESC('Spool file Job User from
  SCANOUTQ')

  SETDYNVAR VARNAM(EXJOBNAM) VARTYP(V) DESC('Spool file Job Name from
  SCANOUTQ')
  ```
  :::tip
  The use of these Dynamic Variables implies that the spool file processing must handle only one spool file at a time, otherwise another job could overlay the Dynamic Variable values. The SCANOUTQ command is designed to perform serial processing of one spool file at a time. SMA Technologies has a design objective to implement multi-instance dynamic variable support, which would then make it possible to support multi-threaded processing of the same job definition, that is, it would be possible to have OpCon execute multiple copies of the same job or schedule (using the multi-instance flag?) at the same time. Please contact SMA Technologies Support if you have an immediate need for this enhancement.
  :::

#### LSAM Scan and Response Rule Configuration for the Example

1. Create one or more Scan Rules: LSAM sub-menu 3, option 4.

    The SCANOUTQ command has only its command parameters to define how it will search for and select spool files to be processed by the SCANSPLF command. The SCANSPLF command parameters are assembled by the SCANOUTQ command processor, but some of the SCANSPLF command parameters may be allowed to depend on Scan Rules. Therefore, the LSAM master file configuration must start with creating new Scan Rules.
    
    The LSAM Scan Rules maintenance display is illustrated in the SPLF Scan Rule Example figure. The effect of this Scan Rule, itself, is only to capture the first line on the first page, up to 80 characters. This captured data is not useful for this example, but some Scan Rule must be specified to provide a link between the
    SCANOUTQ command and the Response Rule(s) defined below. The practice of storing some identifying information about the report being processed may prove useful in the future, in case this automation is being audited, for example, for diagnostic purposes.

    :::tip
    The Required Rule flag is set to 'N' = no. This flag is not being used in this application. This example employs the options that both the SCANOUTQ command and the SCANSPLF command should always end normally. These ending options are useful only when the report content is being compared to some reference value, and the SCANOUTQ job must report a positive or negative scan outcome to OpCon as a job completion status.
    :::

    ```
    LSAJ40R5                   Display SPLF Scan Rule                   00/00/00 
    USERNAME
    
    Application . . . . . : Get BLDPTFP01 Job ID
    Rule sequence/descrip.: 10
    SPLF name . . . . . . : BLDPTFP01       Job name: *CMD name, *CMD
    SPLF number . . . . . : *ANY            number, *ONLY, *LAST, *ANY
    From/To page  . . . . : 1       1       *STR, *END, number, -n=before *END
    From/To line (record) : 1           1   0=n/a
    From/To position (col): 1      80       0=n/a
    Start scan label . . : _____________________________________________________
    ____________________________________________________________________________
    Scan label length . . : 0 0=StrLen      Incidence cnt: 0
    Position after label  : 0               0=any after, -1=any before, -n=before
    Value,*PARM,*CAPT,DVar: *CAPT
    ____________________________________________________________________________
    Scan value length . . : 0               0=value string length
    Bypass parm value . . : _____________________________________________________
    ____________________________________________________________________________
    Bypass value length . : 0               0=value string length
    Compress numerics . . : N               Y/N Required rule: N Y/N
    Last changed user/time: USERNAME        2013-02-26-16.42.17.736000
    F3=Exit F5=Refresh F12=Cancel
    ```
    The Application ID (or Capture identifier, as it is labeled in the Response Rule below) indicates that this example will be searching for a spool file named BPDPTFP01. The actual spool file name in this example is being registered in the Scan Rule. Remember when using the SCANOUTQ command that there can be multiple spool file names detected by that command and qualified for processing. But there must be at least one Scan Rule found in the Scan Rules file for each spool file discovered, otherwise the spool file that SCANOUTQ discovered will be ignored.

    One additional note about Scan Rules may be helpful. There is an LSAM menu option called Work with SCANSPLF Applications. However, application IDs are created by definition whenever a Scan Rule is registered using a new Application ID. It is not necessary to separately create the Application ID itself. The separate menu option now serves only as a convenience tool for certain operations not discussed in this document.
2. Create Captured Data Response Rule(s): LSAM sub-menu 3, option 5.

    When creating a Captured Data Response Rule, it is of course critical that the Application ID (labeled as the "Capture identifier" field) and the Capture sequence number match the Scan Rule exactly. To ensure this match, use the function key F4=Prompt and select the desired Scan Rule from the prompt window.
    
    In this example, the Comp reference value, Compare rule and Compare data lines are set to the values that mean "always execute this rule." (The default values that imply this meaning are "*CAPT EQ *ANY".)
    
    The illustration below shows that the IBM i command CPYSPLF will be executed. An easy way to format this command is to type the command name into the Response cmd field and then press F4=Prompt to get help from the IBM i command prompting program. However, do not attempt to include the Dynamic Variable token characters until after the command prompting returns the correctly formatted command syntax into this field.

    ```
    OPRR50R5                Create Capture Response Rule                  00/00/00
    USERNAME                                                              00:00:00

    Capture identifier . : Get BLDPTFP01 Job ID                C=Screen Capture
    Capture sequence . . : 010            Capture Type . : S   S=SPLF Scan
                                                               M=Message Capture
    Response sequence . . : 10
    Continue (AND/OR/CMD) : ___           Compress numeric: N  Y=yes, N=no
    Store CAPT to-> DynVar: ______________ -> Oper Rply Var: __________
    Response cmd (part 1) : CPYSPLF FILE(BLDPTFP01) TOFILE(QGPL/REPORT80)
    JOB({EXJOBNBR}/{EXJOBUSR}/{EXJOBNAM}) SPLNBR({EXSPLNBR}) MBROPT(*REPLACE)____
    _____________________________________________________________________________
    Comp reference value : *CAPT                               *CAPT,DynVar,char
    Comp reference length : 0             Compare rule: EQ  EQ,NE,GT,LT,GE,LE,**
    Compare data lines 1-5: *ANY, *PARM, DynVar, char       Capture length: 0000
    ...5...10....5...20....5...30....5...40....5...50....5...60....5...70....5...8
    ```
    In the Response cmd (command) field, the Dynamic Variables that were specified above are being used with the Dynamic Variable token characters. To get those Dynamic Variables formatted correctly, the easiest way is to position the cursor in the correct parameter location and then press F8=DyynVar. Select the desired Dynamic Variable name from the prompt list and then the program will format the name with the token characters and insert it into the command field. During the actual execution of the Response Command, the Response Rule Engine (illustrated in the flow chart above) will replace the Dynamic Variable tokens with their current value. The current values will have been set by the SCANOUTQ command as it selects each spool file for processing by the SCANSPLF command.
     
    The example screen above also names the IBM i DB2 physical file that was created during the preliminary configuration steps.

#### Example SCANOUTQ Command Parameters

The command syntax illustrated above is changed slightly to conform to this application example. Although the JOBNAME parameter is being shown with no value, it would be left out of the command if it is not required when this command is being entered as the command to execute in an OpCon job. The JOBNAME parameter could be used as a filter to distinguish between two common spool file names (such as QSYSPRT) when only spool files from one job should be selected for processing.

Note also that the library location of the command is specified here. This is not strictly necessary for the IBM i LSAM to process the OpCon job request in this case, since the LSAM job scheduler does include the SMAPGM library in its library list, but any commands from third-party software applications must be qualified by the library location of the command, otherwise the IBM i command editor that is processing the SBMJOB command prepared by the LSAM job scheduler will not be able to
locate the command in order to qualify its syntax. 
```
SMAPGM/SCANOUTQ OUTQ(MYLIB/MYOUTQ)
APP('Get BLDPTFP01 Job ID')
DATE(20130301) DATECOMP(EQ)
OPCONJOB(N) FAILOUTQ(3) FAILSPLF(3)
PARAMETERS('*RULES') JOBNAME( ) USER(*ALL)
SPLF(BLDPTFP01) USRDTA(*ALL) FORMTYPE(*ALL)
DVSPLNBR(EXSPLNBR) DVJOBNBR(EXJOBNBR)
DVJOBUSR(EXJOBUSR) DVJOBNAM(EXJOBNAM)
```
The Dynamic Variables that were configured in a previous step of this example are named in the appropriate new SCANOUTQ parameters. Note that the special token character is not included here because the purpose of the Dynamic Variable name is not to have a value put in its place, but to name the Dynamic Variable that should be used by the SCANOUTQ command processor program as it is storing identifying information about each spool file selected for processing.

## Captured Data Response Rules

Captured Data Response Rules provide a way to cause any number of IBM i commands or programs to be executed during the processing of the SCANSPLF command, an Operator Replay script or a Message Management Parameter. The actual Capture Rules are unique to each of these source applications, since the source material is different. But they all put their captured data into the same LSAM Captured Data Log (the multi-purpose log file OPRLOGF40), and this marks their common link to the Response Rules engine. 

The support for Dynamic Variables built into each of the data source features means that Captured Data Response Rules could be used to change the Dynamic Variable values as the process runs, allowing the process to change itself depending on data values that are captured and recognized. Captured Data Response Rules also provide an exit program capability, making it possible to tightly coordinate LSAM functions with third-party software.

### How Captured Data Responses are Triggered

The LSAM Captured Data Log file stores individual data values up to 1920 characters in length. This file is used to store data captured by the Operator Replay screen data capture function, scan values found by the SCANSPLF command, and message text values captured by Message Management. The data capture log file serves as an audit mechanism to prove the outcome of each of those capture functions. The data capture records also function as a connection point to optional Captured Data Response Rules. (Refer to [The Data Capture Logging Functions](#the-data-capture-logging-functions) for more information.)

Whenever the system writes a new record to the Captured Data Log file, it also checks for response rules that match the data capture identifying key fields. The identifying key fields include the Application ID associated with each data capture operation and the sequence number of the data capture rule. Captured data is further
identified by key values that are unique to each capturing application. A Type flag marks captured data as resulting from the SCANSPLF command, from an Operator Replay screen or from Message Data.

The Captured Data Response Rules appear the same for any data capture source. Only the key values assigned to the rule are different, depending on the data capture source. Details about how to define the Capture Rules are provided in the separate topic for each of the following features.

#### SCANSPLF Scan Rules

The data capture rules for the SCANSPLF command are actually the SPLF Scan Rules. Whenever the SCANSPLF command processor finds a match to one of the SPLF Scan Rules, it writes a new data capture record to the log file and records the found scan value. During the process of defining Captured Data Response Rules, the prompt function key <**F4**\> is an important tool for identifying the correct key field values that must be used to identify and link each Response to one of the SPLF Scan Rules.
That prompting function automatically associates the registered Application ID with each of the SPLF Scan Rules and shows a list of the scan rules in rule sequence number order.

#### Operator Replay Capture Rules

The data capture rules for Operator Replay are separate from the Script Step records, but they are always linked by permanent key values to an individual Script Step. Any of these hard-linked capture rules and response rules can be optionally copied whenever a Script Step, or an entire Script, is copied to a new Step sequence number, or to a new Script name.

#### Message Management Capture Rules

The data capture rules for Message Management are not linked to only one Message Management Parameter, but are shared because it is so common for a single Capture Application to be reused among many different message management rules. Instead, each Message Management Parameter record stores the Capture Application ID as part of the Parameter record.

### How Captured Data Response Rules Work

The method for adding new Captured Data Response Rules is outlined above. Details about the Captured Data Response Rules maintenance screen and fields are illustrated below under Utilities Screens and Windows. This discussion explains how certain Response Rule parameters interact to provide a flexible and powerful response matrix.

Three aspects of Captured Data Response Rules deserve a detailed explanation. There is a set of rules and comparison values that can be used to qualify whether a given response command (or group of commands) will be executed as captured data is stored. There is also a Continuation field in the response rule record that may be used to
create different sets of qualification rules and also different groups of commands controlled by each set of qualification rules. The response command and the comparison data fields are allowed to use LSAM Dynamic Variables, and a variable value may be set immediately before the command executes by the field labeled for this purposed on the Response Rules record.

#### Response Rule Qualification Rules

At the simplest level, each response command can be controlled by a single qualification rule. In this case, a single Captured Data Response Rule record can be used to define the entire response. But it is possible to use multiple rule records to build a complex set of qualification rules. Similarly, multiple records can be used to build a group of multiple response commands. Multiple qualification rules may overlap multiple response commands, and vice versa. Consider the following examples.

The first table shows that 3 comparison rules are used to qualify 5 different response commands. In this case, all three comparison rules must be satisfied before any commands are executed. If all the qualifications are met, then all 6 commands will be executed.

##### Captured Data Response Rules Model - More Commands

  Response qualification         | Response commands
  ------------------------------ | ---------------------
  Comparison rule A1             | Response command R1
  Comparison rule A2             | Response command R2
  Comparison rule A3             | Response command R3
  (command group continuation)   | Response command R4
  (command group continuation)   | Response command R5

  

In the second table there are 4 comparison rules but only 1 response command. This works the same as the first example, except that all 4 qualifications must be met before the single response command is allowed to execute.

#####  Captured Data Response Model - More Qualifications
  Response qualification   | Response commands
  ------------------------ | ---------------------
  Comparison rule B1       | Response command S1
  Comparison rule B2       | (no command text)
  Comparison rule C1       | (no command text)
  Comparison rule C2       | (no command text)

  

#### Response Rule Continuation Field

It is also possible to create multiple, separate groups of qualifications + commands that are each handled separately from each other, all as part of a single response to only one element of captured data.

Here are the values of the Continuation field of the Captured Data
Response Rules:

- **AND** = This record includes a comparison rule that must also be true, in addition to the rule in the previous record.
- **OR** = This record begins a new set of comparison rules that provide an alternate means of qualifying the associated group of response commands.
- **CMD** = This record includes an additional command that is part of a command group but it does not include any comparison rules; the command group is qualified by previous comparison rules that are part of this set.
- **blanks** = This record begins a completely new set of comparison rules and response commands. There is no connection to this set and any previous set, except that both sets are associated with the same original captured data log record.

The following examples show how the Continuation field of the Captured Data Response Rules can be used to merge the two tables above into a single, complex response.

##### Captured Data Response Rules - Continuation Fields
  Seq   | Continuation  |    Response qualification     |Response commands
  ----- |-------------- |------------------------------ |---------------------
  010   |               |      Comparison rule A1       |Response command R1
  020   |     AND       |      Comparison rule A2       |Response command R2
  030   |     AND       |      Comparison rule A3       |Response command R3
  040   |     CMD       | (command group continuation)  |Response command R4
  050   |     CMD       | (command group continuation)  |Response command R5
  060   |     CMD       | (command group continuation)  |Response command R6
  070   |               |      Comparison rule B1       |Response command S1
  080   |     AND       |      Comparison rule B2       |(no command text)
  090   |     AND       |      Comparison rule B3       |(no command text)
  100   |      OR       |      Comparison rule C1       |(no command text)
  110   |     AND       |      Comparison rule C2       |(no command text)
  120   |     AND       |      Comparison rule C3       |(no command text)

The table above shows two different qualification + command groups that are associated with one captured data element. The two groups are separated by the blank Continuation field at row 070; row 070 is the first record of the second group. Each of these groups works independently of each other. The only important relationship between the two groups is that the first group will be processed before the second group, so it is important to ensure that commands R1 through R6 do not depend on what command S1 will do, and conversely, to remember that command S1 may be affected by the outcome of commands R1 through R6. However, the comparison rules may enforce that only one of the two command sets will be executed.

The first group shows that there are three comparison rules that must all be satisfied due to the AND rule. If all three rules are satisfied, then all six commands, R1 through R6, will be executed. If any rule A1 through A3 is not satisfied, then none of the six commands will be executed.

The second group shows a complex set of comparison rules used to qualify just a single command. In this group, the comparison rules B1 through B3 must all be satisfied, or the comparison rules C1 through C3 must all be satisfied, in order for command S1 to be executed.

The OR is exclusive. This means it is not possible to include the OR continuation rule as part of an AND-group. The only way to accomplish this is to repeat some of the AND-rules in a second set of comparisons that begin with the OR continuation rule.

#### Qualifying Captured Data Response Rules with Comparison Data

The discussion above refers to Comparison rules. This term refers to the fields in a Captured Data Response Rule that define a comparison reference value, comparison data and the compare rule. Use these fields to determine whether a Captured Data Response Rule, or group of rules, is allowed to execute.

Some Response Rules may not need qualification, including CMD continuation records that are only used to register additional response commands. To disable the comparison data fields, set the Compare Data lines to the special value of "\*ANY. Otherwise, consider the following options when defining Response Rule qualification.

The basic logic of qualifying a Response Rule is based on using the Comp Reference Value as factor 1 and the Compare Data Lines (content) as factor 2. The final value of each of these fields is matched according to one of the Boolean Compare Rule options. For example, if the Compare Rule is set to GT (greater than), then the factor 1 value must be greater than the factor 2 value in order for the Response Rule functions to be executed:

*If Compare Reference is Greater Than Compare Data, then execute Command.*

*If (Compare Reference) \> (Compare Data), then execute Command.*

By combining various Response Rules and specifying comparison values using Dynamic Variables (or other of the allowed options), it becomes possible to create a complex set of response rules that can be adapted to many different circumstances. For example, a Dynamic Variable could be established as the holder of a threshold value, and another Dynamic Variable could be established as a counter that is compared to the threshold. One or more Response Data rules could be used to increase the
counter variable when certain circumstances occur, and another Response Data rule could be used to compare the counter to the threshold in order to trigger an emergency response only when the specified threshold is exceeded.

Consider the following options for defining each of the comparison datafields.

The Comp Reference Value was presumed, in earlier versions of this LSAM, to always be the Captured Data element itself. Now, however, the element of data that was stored in the Captured Data Log File is represented by the special value of \*CAPT that can be typed into the Comp Reference Value field. Another newer option for this field is to specify a Dynamic Variable token (including the Dynamic Variable special characters). Use the function key <**F8**\> to select from a list of existing Dynamic Variables, or to let the maintenance program demonstrate the correct syntax for inserting a Dynamic Variable token into this field. A third option for this field is to type a specific character string. A specific character string might be useful, for example, as a hard-coded threshold value that is assigned to one Captured Data Response Rule.

The Comp Reference Value may be further defined by the Comp Reference Length field. When this field is left set to zero, the LSAM routine will assume the length of the comparison reference value depending on how that field was set. If the special value \*CAPT is used, then the length of the reference value will be obtained from the Captured Data Log file record. Otherwise, the length of the reference value will be assumed to start at position 1 and continue through the last non-blank character in
the string. This computation of the length applies to either a typed character string or to the value obtained by replacing a Dynamic Variable token.

The Compare Data Lines field supports four different options for specifying values that will be compared to the Comp Reference Value:

- **\*ANY** = A special value that disables the compare data qualification, allowing the Response Rule to always be executed.
- **\*PARM** = A special value used only with the SCANSPLF command, referring to the current (one of many?) input Parameter value that was supplied for searching a spool file.
- **DynVar** = Use F8 to select a Dynamic Variable from a list, or manually type in a Dynamic Variable name, including the special characters required to denote a Dynamic Variable. (Hint: Use F8 and select any value to let the program demonstrate the correct syntax for a Dynamic Variable, then change the actual variable name to the desired value within the special characters.)
- **char** = Type in any character string. This option is typically used to test if captured data is equal to the string that is typed here, in order to decide if the Response Rule should be executed. This value could also be used as a threshold reference point, when the Comp Reference Value was set to a Dynamic Variable that contains a counter field, although this is the reverse of the logic that might be expected, so the Boolean Compare Rule must be chosen carefully.

The Compare Data Line field can support up to 1920 characters of data. This length matches the total amount of data that could appear on an IBM i green screen workstation display format (when the screen dimensions are 24 lines of 80 characters), which is the maximum size of data that can be stored in a single Captured Data Log file record. Lines 1 - 5 appear on the first screen of the Response Rule maintenance function, and PageDown can be used to move to lines 6-24 (of 80 characters each). All of the data entered in these lines is assumed to be a single, contiguous string. Blanks appearing at the end of individual lines are assumed to be part of the data except for the last line. However, the length specified or calculated for the Comparison Reference Value may determine that additional space characters will be appended to the end of the Compare Data Line data string, if that is necessary to make the two string sizes match.

#### Setting LSAM Variables with Response Rules

The Captured Data Response Rules record supports entry of an LSAM Dynamic Variable name and also of an LSAM Operator Replay token variable name. Dynamic Variables are described in detail below and also in the topic about Job Tracking. Operator Replay token variables are explained in detail in the topic about Operator Replay. This discussion here is focused only on the function of the fields used by a Captured Data Response Rule to store captured data into LSAM variables.

:::tip
Operator Replay token variables are an old form of variable that is no longer used, since the more powerful Dynamic Variable tokens can now be used in every place the old tokens were used. Always choose Dynamic Variables!
:::

When the response rule is actually executed, which happens whenever captured data (explained above) is being stored in the Captured Data Log file, the data that is captured is available to the Response Rule execution module. If the response rule has named either type of variable (Dynamic Variable or Operator Replay token variable), the associated variable loading command (SETDYNVAR or ADDRPYTOK) is executed to set the variable value in the appropriate LSAM table using the current captured data value. Each of these commands will create the variable master record if it does not already exist.

:::tip
If the Captured Data Response Rule has the flag set that specifies to compress numeric data, then the value stored in an LSAM Dynamic Variable will also be the compressed numeric data. This means that any punctuation such as used for monetary amounts will be eliminated in the variable, though it exists in the originally captured data. Also refer to the sub-section below about scrubbing single quotes or commas from text strings.
:::

This function of the Captured Data Response Rules is similar to using either of the LSAM commands SETCAPVAR or SETCAPTOK.

But these SET\* commands are executed outside of the job where data capturing is actually performed, so the commands are less able to be specific about the actual captured data value that can be retrieved for storage as a variable value. These commands are limited to the \*FIRST or \*LAST time stamp on whatever date is specified in the command parameters. Refer to more about the two SET commands in the next section.

The SET commands are executed at a different time, relative to the Captured Data Response Rules, so there is another advantage to using the built-in variable setting feature of the Captured Data Rules:

##### The Response Rule execution module always processes storage of the captured data to a variable first, before testing the qualification rules or executing the response command.

When the rule qualifies for execution, the response command is analyzed to see if any Dynamic Variable tokens must be replaced with the current variable value. This makes it possible to execute a response command that will include the data that was just captured.

By default, the Captured Data Response Rule field that names a Dynamic Variable will always create or update a variable of type V, which is a general use variable. (This restriction arises because of the complex definition required for the other variable type.) The other type of Dynamic Variable, explained in detail below, is type L, used to update the IBM i local data area image for captured or tracked/queued jobs. Since the Captured Data Response Rule "Store -\>" field cannot be used 
for a type L variable, the way to create or update that type of variable is to use the SETDYNVAR command in the response command line of the Response Rule record. Remember that the same captured data value currently processed by the response rule could be made available, indirectly, to the SETDYNVAR command by including a different Dynamic Variable token in the VALUE parameter of the SETDYNVAR command. The different Dynamic Variable might be the one that is named in the Dynamic
Variable field of the current Captured Data Response Rule record. 

If a Captured Data Response Rule response command includes more than one Dynamic Variable, it might be necessary to configure additional Captured Data Response Rules that will execute prior to this response rule, in order to assure that the required variable values have been set appropriately.

Although this section of the document is focused on the SCANSPLF utility, the Captured Data Response Rules are also able to store data captured by Operator Replay from a green screen workstation display, or by Message Management from the primary and/or secondary message text. These other two functions are discussed in more detail in the topics about those features.

#### Setting LSAM Variables from Captured Data Outside of Response Rules

The Captured Data Response Rules record supports entry of LSAM variable names so that the captured data value can be stored into either an LSAM Dynamic Variable or an LSAM Operator Replay token variable. This feature is discussed just above.

Similarly, there are two independent LSAM commands that can complete the same procedure, although with less flexibility:

- SETCAPVAR = set an LSAM Dynamic Variable to the value of the identified Captured Data element.
- SETCAPTOK = set an LSAM Operator Replay token variable to the value of the identified Captured Data element.
:::tip
Operator Replay token variables, though still supported for existing users, are replaced by Dynamic Variables, so always use Dynamic Variables in future applications.
:::
These two commands could be used anywhere that IBM i command execution is possible, as long as the executing job has reference to the LSAM environment library list. But these commands do not provide infinite control over the exact captured data value instance that will be retrieved, due to the fact that multiple captured data elements could exist for the same Capture ID and Capture Sequence key values, with only their date/time stamps (time of capture) being different. Therefore, as
the example command syntax below illustrates, it is only possible to find the \*FIRST or \*LAST instance of a given element of captured data for a given date. The only way to guarantee that specific captured data will always be used to set either type of variable value is to use the Captured Data Response Rule fields where variable names may be entered. Only while the Captured Data Response Rule execution module is managing the actual data that has been captured, can the system be sure that a
specific element of captured data will be stored as the variable value. 

However, in case it might be useful, these two commands can be used outside of the Captured Data Response Rule execution process. A prompted IBM i command screen is illustrated for each of these commands. The effect of each command is similar to using the LSAM commands SETDYNVAR and ADDRPYTOK, so the command fields that define the variables are not explained here. This discussion is limited to explaining how the Captured data identifying fields work.

SETCAPVAR = Set Captured Dynamic Variable
```

       Set Captured Dynamic Variable (SETCAPVAR)

Type choices, press Enter.

Capture Identifier . . . . . . . CAPID          _____________________________
Capture sequence number  . . . . CAPSE         0    
Capture date . . . . . . . . . . DATE          *CURRENT                 
First/Last time, or \*ANY date  . TIME         *LAST  
Name of new/existing variable  . VARNAM        _____________                      
Variable type  . . . . . . . . . VARTYP        V
Sequence for same LDA variable   VARSEQ        0                   
Start position in LDA  . . . . . LDASTR        0
Length of LDA change . . . . . . LDALEN        0   
```
SETCAPTOK = Set Operator Replay Token to Captured Data
```

       Set Opr Rpy Token to Capt Data (SETCAPTOK)

Type choices, press Enter.

Capture Identifier . . . . . . . CAPID          _____________________________                     
Capture sequence number  . . . . CAPSEQ        0    
Capture date . . . . . . . . . . DATE          *CURRENT
First/Last time, or \*ANY date  . TIME         *LAST  
Name of new/existing variable  . TOKNAM        ____________
```
##### Fields


| Keyword | Size | Type   | Description                             |
| ------- | ---- | ----   | -----------                             |
| CAPID   | 30   | \*CHAR | Value must be enclosed in single quotes. Type up to 30 characters. Upper and lower case letters, numeric digits and special characters are allowed. Spaces are allowed but not recommended; use underline characters instead of spaces. This value must match an Application ID that has been registered using the LSAM Menu 3, function 3. |
| CAPSEQ  | 3.0  | \*DEC  | The sequence number of the SPLF Scan Rule or the Operator Replay screen capture rule: Refer to the sequence number assigned to the captured data in the LSAM view of the Captured Data Log (LSAM menu 3, option 8) to obtain or verify this number.                    |
| DATE    | 8    | \*CHAR | -   \*CURRENT = (default) use the current system date. 
|         |      |        | -   \*ANY = use any available date, based on the setting of the TIME parameter, that is, the \*FIRST or \*LAST date available. |
|         |      |        | -   Optionally, specify a date in CCYYMMDD format, to limit the instance of the captured data to either the first or last that is available for this date. |
| TIME    | 6    | \*CHAR | -   \*LAST = (default) find the last instance of this captured data on the specified date. |
|         |      |        | -   \*FIRST = find the first instance of this captured data on the specified date.                     |
  

## Special $-Variables

The Response Rule Command field and the Message Management Parameter Event Command field support a list of reserved special variables that begin with the US dollar sign ($). These variables are replaced by IBM i or OpCon job characteristics, and for Message Management the $MSG variable is replaced by the actual Primary message text.
##### Command Line $-Variables
-  $FREQUENCY NAME:   The name of the OpCon/xps frequency table that was assigned to the job that issued the message.
-  $IBM JOB ID:       The IBM i current job ID, in this format: 123456/JOBUSER/JOBNAME.
-  $IBM JOB NAME:     The IBM i current Job Name.
-  $IBM JOB NBR:      The IBM i current Job Number (always 6 digits, but handled as characters).
-  $IBM JOB USER:     The IBM i current Job User Name (IBM i User Profile that started the job).
-  $JOBID:            The OpCon job identifier, a 10-digit number.
-  $JOBID CMP:        The OpCon job name and job identifier, joined into a single string with blanks compressed out.
-  $JOBID LONG:       The OpCon job name followed by the job identifier, with all blanks retained in the string.
-  $JOB NAME:         The OpCon job name.
-  $JOB LONG NAME:    The long format of the complete OpCon job name.
-  $MACHINE NAME:     The OpCon name for the LSAM job scheduler, normally the same as the LSAM Name specified in the LSAM Parameters (but the value supplied by OpCon with the job start request is used here).
-  $MSG:              **Note**: $MSG is not supported in the Response Rule command line, although it appears in the list for F10=$VAR when a Response Rule is attached to a Message Data Capture Application. It is only supported in the Event Command line of a Message Management Parameter. Use Primary text capture or SETDYNVAR command to share $MSG with Response Rules. Refer to Message Management.
-  $MSGID:            **Note:** $MSGID is not supported in the Response Rule command line, although it appears in the list for F10=$VAR when a Response Rule is attached to a Message Data Capture Application. It is only supported in the Event Command line of a Message Management Parameter. Use the SETDYNVAR command to share $MSGID with Response Rules. Refer to Message Management.
-  $SCHEDULE DATE:    The date of the OpCon schedule under which the current job was started, in the (\*ISO0) format of CCYYMMDD.
-  $SCHEDULE NAME:    The name of the OpCon schedule under which the current job was started.

Within the LSAM, the variable token does not require any special brackets or other characters. It is only necessary to start with the $ sign, use all capital letters, and include one space between the name parts, as shown in the table above. Refer to the follow Rules section for information about the values that will actually be provided to replace each of the $-Variable tokens.

##### Rules For Special $-variables

When using the $-variables, the following constraints apply, depending on the LSAM feature that is executing:

1. The $MSG variable is only available to the Message Management  Parameters master record itself, within the Event Command line. This variable is not supported for Response Rules.
2. The job that is referenced for providing OpCon and IBM job identifier values varies per LSAM feature, according to the following list.

    a.  **Message Management**
    - IBM Job ID = the job that issued the message. The OpCon information will not be available if that job was not started by, or Tracked by OpCon.
    - The IBM i Job ID that is stored with the Capture Log record for captured message data is the ID of the job that issued the message instead of the LSAM Message Management server job (as in older versions of this Agent software).

    b.  **Operator Replay**
    - IBM Job ID = the script driver job, which is the job that shows in the OpCon Schedule.
    - Unfortunately, the actual virtual workstation job itself cannot be referenced by the special $-variables. To obtain the IBM i job identifiers for the virtual workstation job it is (currently) necessary to execute extra steps that will display the job ID on the screen, and then use Capture Data rules and Response Rules to store those values into dynamic variables.

    c.  SCANSPLF (Scan Spool Files)
    - IBM Job ID = the job ID will vary depending on the type of task using this command. Sometimes it will be the ID of the Spool File job, other times it will be the job that is performing the SCANSPLF command. Depending on the Job ID that is selected, there may not be OpCon job or schedule information associated with that job.

## Managing Single Quotes and Commas in Captured Data

### Problem Definition

#### Single Quotes

Single quotes included in captured data, such as message text, green screen workstation displays or reports, can prevent storage of captured data into dynamic variables. The single quote interferes with delimiting character strings in IBM i command parameter values.

#### Commas

If a comma is included in the value of a dynamic variable it can interfere with the syntax of OpCon Event commands whenever that dynamic variable is included as one of the command parameter values. At this time, commas are reserved characters in OpCon Event commands that are used to separate the command parameters.

### Preventing Special Character Errors

#### Captured Data Response Rules

The Compress Numeric field in the Response Rules master record supports additional values (listed in the chart below) that can be specified for character data. This set of field values controls the process of storing captured data into a dynamic variable.

The most important purpose of this control is to prevent single quote characters from interrupting the string of characters that is inserted into the VALUE('value') parameter of the SETDYNVAR command, since that is the method used to store captured data into a dynamic variable. Single quotes may either be replaced by space characters or they can be escaped by doubling the single quote so that just one character will actually be stored as part of the dynamic variable value.

Commas can also be replaced by spaces, optionally, although this is not critical at the time a value is being stored, so it may be preferred to use the character string edit codes that are assigned to the dynamic variable master record.

#### Dynamic Variables

The COMMA parameter of the SETDYNVAR command, and the corresponding "Group Separator" field in the dynamic variable master record, support the same control values as shown in the chart below for non-numeric, that is, character string values. These edit codes control how the value returned for a dynamic variable token will be reformatted in order to prevent potential problems with the way each dynamic variable may be employed.

#### Special $-Variables

Extended information about $-Variables is provided above, in the previous segment of this topic.

The $MSG variable (supported only for Message Management) can be edited for single quotes and/or commas by setting Configuration options on the LSAM sub-menu 3: Utilities, option 7, in order to prevent errors when $MSG is used as a parameter of an OpCon Event command.

#### Table of Character String Edit Values

These character string edit control values may be used in the Response Rule field: Compress Numeric, or in the Dynamic Variable COMMA control field (which also controls the Grouping Separator value if a dynamic variable is numeric). Note that character string edit rules do not apply when a dynamic variable has been marked as a numeric value only.

The values shown in this table refer to EBCDIC values. Most Latin character sets use the same hexadecimal values for the comma and the single quote. If a client site's IBM i partition uses a CCSID character set with different hex values, please contact SMA Support for assistance.

- C = replace any comma (,) X'6B' with a space (X'40')
- Q = replace any single quote (') X'7D' with a space (X'40')
- D = replace both a comma and a single quote with a space
- E = escape a single quote by inserting an extra single quote
- F = replace comma with space AND escape a single quote by doubling

The concept of "escaping" the single quote is supported by IBM command editors. When a character string is enclosed with a pair of single quotes, such as the VALUE( ) parameter of the SETDYNVAR command, any single quote that is included within the string would interrupt the string unless there are two single quote characters. If there are two single quotes, IBM command processing will replace them with just one single quote as the character string is being processed, and the characters that follow the doubled single quote will still be part of the character string.

## Case Examples of SCANSPLF Applications

This discussion extends the How-To down to real applications of the SPLF Scan Rules fields and the Captured Data Response Rules fields. The field descriptions for the Scan Rules and the Capture Data Rules maintenance, listed below in the Screens and Windows section, combine to form different modes of operation for the SCANSPLF command. Various applications of the SCANSPLF command are explained in the context of the following example implementation cases.

### Using the SCANSPLF PARAMETERS Keyword

The original application of the SCANSPLF command was as a tool for automating the balancing functions of a financial institution. OpCon and the IBM i LSAM can be used to fully automate the process of posting transaction batches that originate from systems and networks outside of IBM i. After the transaction batches are posted, the control totals from the outside source are compared to the totals produced by the IBM i batch posting programs. Without OpCon, this balancing process requires
some hours of operator time and the process is frequently subject to human error. The SCANSPLF command reduces the process to just seconds and improves accuracy to 100%.

For the application of financial report balancing, the control totals from an outside source are assembled into a character string inside the PARAMETERS keyword of the SCANSPLF command. A typical balancing function includes four numeric totals: debit item count, debit total amount, credit item count, credit total amount. The control totals input parameter string looks like the example below, taking into account the following exception.

In many cases, the editing of numeric fields with commas, a currency sign and a decimal point is inconsistent between the outside source and the IBM i batch posting report. This is why the Scan Rules support an option to compress numeric values. The result of numeric compression is that only digits appear in the PARAMETERS character string. The number of decimal positions must be assumed for each individual parameter, typically no decimal positions for an item count and two decimal
positions for an amount total (in US dollars).

Example control totals:

- Debit item count = 385
- Debit total amount = $13,719.22 (<u>the space between the $ and the 1 is intentional</u>)
- Credit item count = 296
- Credit total amount = $13,719.22

Here is the command string generated by a MS Windows application program executing on the OpCon/xps server. The application program was responsible for obtaining the control totals that had been stored into OpCon/xps properties by an previous job in the OpCon/xps schedule:
```
SCANSPLF APP('ACH-A') PARAMETERS('385:1371922:296:1371922')
FAILOPT(1)
```
Notice how the numeric data has been compressed into only the digits. The entire PARAMETERS string must be enclosed in a pair of single quotes. The FAILOPT (fail option) has been set to (1), indicating that the SCANSPLF command should end abnormally if any of the input parameters are not found to match, or end normally if all the input parameters do match.

Before examining the LSAM SPLF Scan Rules required to support this form of the SCANSPLF command, consider that sometimes the item count might not be available from the source. In that case, a convention must be established for signaling that on any given day, one input parameter might not be available and so it should not be used to complete the balancing function. The MS Windows programmer comes to agreement with the IBM i LSAM Administrator that a special value of \*empty\* will be used as a place-holder whenever any of the four expected input parameter values is not available. If no credit item count is available, the command string looks like this:
```
SCANSPLF APP('ACH-A') PARAMETERS('385:1371922:\*empty\*:1371922')FAILOPT(1)
```
To process this SCANSPLF that will be executed in an IBM i job submitted from an OpCon/xps schedule, the LSAM master files must be configured as follows.

First, an Application ID must be defined. The Application ID can be up to 30 characters long. In the example of the financial institution, there were several batch posting jobs to be completed. Each job had its own Application ID, and the long text allowed the name of the application to be easily recognized by all personnel. In the example above, the application ID is short: ACH-A. In the LSAM Scan Rules maintenance function (LSAM menu 3, option 4), the Application ID is registered along with the name of the IBM i job that runs to post the transaction batch and the name of the batch balancing report spool file produced by this job, as one or more Scan Rules are created, grouped together by these key fields. For this example, the job name will be POSTACHA and the spool file name will be QSYSPRT.

After the application ID is registered, it is then possible to create the four SPLF Scan Rules required to match each of the SCANSPLF input PARAMETERS. This discussion cannot anticipate how the report totals will be recognized, so an assumption will be made that the last page of the QSYSPRT report will look like this:

##### Example Financial Report Final Page
```
DEBIT COUNT:     385
DEBIT TOTAL:  $     13,719.22
CREDIT COUNT:    296
CREDIT TOTAL: $     13,718.46     * OUT OF BALANCE *
```
Assuming that there may be General Ledger account sub-totals throughout the report, it is important that the Scan Rules be defined so that scanning for the totals fields labels starts from the end of the report. It is possible that the correct totals could be found by counting the number of incidences of each totals label starting from the beginning of the report. But if it is not possible to guarantee how many different sub-totals will appear in the report, then the only reliable option is to start scanning from the end of the report.

According to this definition of the report, these are the required values for each of the four SPLF Scan Rules in the LSAM database:

Application: ACH-A

Rule sequence: 10, 20, 30, 40 (one for each rule; the sequence numbers could be 1, 2, 3, 4, up to 999). Rule sequence numbers must be unique within an Application, even if different SPLF names are included within one Application.

SPLF name: QSYSPRT

Job name: POSTACHA

SPLF number: \*ANY (this could be a specific number, if job POSTACHA creates more than one report called QSYSPRT)

From/To page: \*END \*END (notice that the From-page is not \*STR or 1, but \*END, to cause the scan job to start reading from the end of the report for each rule)

Start scan label: DEBIT COUNT (for the first rule, and for the other 3, use the labels shown above)

Scan label length: (leave at zero, but each label could be measured, so the sizes would be 11, 11, 12, 12)

Position after label: (leave set to zeros so that the first non-blank character starts the value scan)

(Scan) Value: \*PARM (the special value \*PARM is required for this application, telling the scan job to use the input PARAMETERS values supplied by the SCANSPLF command)

Scan value length: (leave the zeros for the item counts, but use a length of 16 for each of the total amounts in order to get past the $ sign and include all the numbers of the amount)

Bypass parm value: \*empty\*

Bypass value length: 7 (optional)

Compress numeric: Y (This must be set to Y for the totals amounts fields in order to ignore the spaces and $ sign, which are inconsistent with the original format of the total amounts supplied by the transaction source. The item counts could ignore numeric compression, but to assure a valid numeric comparison, it is a good idea to use the compress option for all four parameters in this case.)

Required rule: Y (A value of Y= yes is required whenever the Scan value is \*PARM because this tells the scan program to consider each of the rules in the final pass/fail decision at the end of the program.)

When the SCANSPLF command is executed in this example it is expected to end abnormally. This is caused by the obvious out of balance condition appearing in the sample report page. The total credit amount in the report does not match the total amount submitted by the SCANSPLF command. The FAILOPT(1) parameter of the SCANSPLF command tells the scan program to force an abnormal end to the execution of the SCANSPLF command when any parameter is not matched. This causes the OpCon/xps schedule to show a failed balancing job.

When the OpCon/xps job definition includes response events upon detection of a failed job, an operator or supervisor can be immediately signaled by any number of means, including an eMail message or a text message that gets routed to their cell phones (by outside facilities).

The IBM i LSAM SCANSPLF command includes a feature of reporting its scan rule match results to the OpCon/xps Job Configuration window. Job Detail Messages list the exact values that were mismatched. The OpCon/xps operator can use a right mouse click on the OpCon/xps job line to access (as in Enterprise Manager): Job Information -\> Configuration tab -\> Operations Related Information -\> (+) Job Detail Messages, and instantly the problem of the credit total amount being out of balance
will become visible. This makes it possible for the financial institution's staff to learn nearly instantly about the out of balance condition and to jump directly to the cause of the problem without having to find and study the actual balancing report to look for report totals.

### Using the SCANSPLF Fail Option 2

The previous example explained how the SCANSPLF command can be used to cause a failed job to appear in an OpCon/xps schedule whenever the  supplied PARAMETERS values are not all matched in an IBM i spooled report file. It is also possible to make a failed job show in an OpCon/xps schedule when there is a match for a Scan Rule, but end normally when there is no match.

An example of this application is found at a site where there is a long IBM i Control Language program that executes multiple sub-program calls. No matter what happens to the sub-programs, the long CL program always ends normally. Due to the inaccessibility of the third-party software program source code, the site cannot easily use OpCon/xps and the IBM i LSAM to monitor each sub-program of the big job. But the OpCon/xps schedule must not be allowed to continue until it can be verified that
no steps in the big job have actually failed.

In this example situation, one solution is to use the SCANSPLF command to scan the job log report that is produced by the job running the big CL program. In the job log report, there will be an error message with a severity code of 40 any time one of the sub-programs has failed. Without the SCANSPLF tool, the IBM i system operator had to find the job log report and manually read through all the pages of the report, looking for any severity code of 40. Not only did this take a long time but it
was obviously subject to oversight on the part of the operator. Using the SCANSPLF command provided nearly instant results and also improved the accuracy of the search to 100%. As a result, on most days when there was no problem, the OpCon/xps schedule was allowed to continue with almost no delay.

To implement the SCANSPLF command for this application, the OpCon/xps Call command line within the IBM i job was modified to include the IBM i special separator character after the main Call command syntax, and then the SCANSPLF command with its parameters was added to the Call command line.

As documented in IBM i LSAM Configuration, under the Extended Discussion section, inserting the user-defined special character (typically a vertical pipe character: \| ) after the primary command signals the IBM i LSAM job scheduler that additional job parameters may follow, and that the LSAM should look for a SCANSPLF command at the end of the line. When the SCANSPLF command is found, the LSAM sets up special controls so that whenever it detects that the original IBM i job has completed normally,
it will not report the job completion status to OpCon/xps SAM until after the SCANSPLF command has been used to survey the job log report that was produced by the job. Then, the results of the SCANSPLF command will be used to report the final job completion status to OpCon/xps SAM. (The scan of the job log will not be conducted if the actual IBM i job failed.)

In this case, there is no input data that must be provided by the SCANSPLF command for comparison to the report content, although the SCANSPLF PARAMETERS keyword could have been used as one optional way to define this task. Instead of an input parameter string, the PARAMETERS keyword was specified with its special value of \*RULES, meaning that the Scan Rules in the LSAM database are all that is needed to define the scan task.

One of the key ingredients for this solution is to set the FAILOPT parameter of the SCANSPLF command to (2), so that the command will report a failure if the Scan Rule (finding an error message) is matched, but it will report normal termination if the Scan Rule is not matched. So the command syntax for the SCANSPLF job looks like this:
```
SCANSPLF APP('ERR2') PARAMETERS('\*RULES') FAILOPT(2)
```
Note that the \*RULES special value for PARAMETERS must still be enclosed in a pair of single quotes, and of course the FAILOPT is set to a value of (2).

This application is defined in the IBM i LSAM database with the name "ERR2" and for this example the job name will be BIGCLJOB. In all cases, the report spool file that contains the job log information will be called QPJOBLOG. So these are the three key parameter values required to define the SCANSPLF Scan Rules using the LSAM menu 3, option 4.

Here is an example of a segment of a fake job log report showing how it appears just after a heading line, where the target severity code will be found:

Example pf QPJOBLOG Report Spool File
```
\*...+....1....+....2....+....3....+....4....+....5....+....6....+....7
  5722SS1 V5R4M0 000000                           Job Log
   Job name . . . . . . . . . . :   BIGCLJOB        User  . . . . . . :
   Job description  . . . . . . :   QBATCH          Library . . . . . :
 MSGID      TYPE                    SEV  DATE      TIME             FRO
                                        members added, 0 members replac
                                        damaged.
 CPF1234    Escape                  40   00/00/00  14:49:20.238792  QDB
                                      Message . . . . :   Program faile
                                      Cause . . . . . :   Program SUBPG
                                        reporting error code RNX1999, s
                                        and retry.
 CPI3203    Information             00   00/00/00  14:49:20.238872  QDB
```
Only one SPLF Scan Rule is required for this application. A rule must be defined that will discover the message severity code of 40 on any line of the job log report. The IBM i QPJOBLOG report always lists message severity codes in columns 36 - 37 of the report, and since there is very little other data (only heading data) that will appear in these columns of the report, it is easy to define the scan rule. The following SPFL Scan Rule field values include some extras that will be added in this
case in order to make the results of the SCANSPLF job more useful to the operators whenever a sub-program error is found. The extra data is explained below, along with an example of how to use Captured Data Response rules.

Application: ERR2

Rule sequence: 10

SPLF name: QPJOBLOG

Job name: BIGCLJOB

SPLF number: \*ANY (there is only one job log report per job)

From/To page: \*STR \*END (the whole report will be searched from top to bottom)

From/To position: 36 37 (the report QPJOBLOG is known to always put the message severity code into columns 36-37 on a report line, and the string of '40' will never appear on any other line of a QPJOBLOG report in these positions)

Start scan label: 40 (the Scan Label is used to find the first incidence of a severity code 40; the scan value field will be used for a different purpose in this example)

Scan label length: 2 (could be left as zero, or specify 2)

Position after label: -1 (Use this value to find the actual error message that will appear in column 1 of the report line, BEFORE the scan label. A specific Positive column count could also be used in this case, but it's just easier to enter -1 and not have to count the columns.)

(Scan) Value: \*CAPT (the special value \*CAPT is being illustrated in this example, even though it is not required for the simple purpose of reacting to the discovery of a severity code 40)

Scan value length: 7 (this example shows how 7 characters will be captured from the beginning of the report line where severity code 40 is found, so that the actual error message ID can be used by a Captured Data Response rule)

Compress numeric: N (It is important that the default value of N = no be used in this example.)

Required rule: Y (A value of Y= yes is required in this case in order to trigger the SCANSPLF logic that will report a pass or fail based on a required match or no-match to this Scan Rule.)

There is more than one way this scan could have been effectively defined, producing the same pass/fail result. For example, instead of using the scan label, the scan value could have been specified, but this option was ignored in order to allow for the Captured Data Response rule option that is defined below. Similarly, if the capture option were not desired, the \*PARM scan value could have been used and the string of '40' could have been specified in the SCANSPLF PARAMETERS keyword.

Another aspect of this example to consider is how the From/To position (col) values are used. If a scan label is not specified, then the From/To position values are used to control which columns of the report line are searched for the scan value. But when a scan label is specified, then the From/To position fields are dedicated to isolating the scan label only. The scan value is not constrained by the From/To position fields when a scan label is used because the field "Position after label" and the Scan value length are used instead to locate the scan (or capture) value itself.

The captured data definitions provided above have nothing to do with the original intention of this example task. If the only goal is to cause a job on an OpCon/xps schedule to fail whenever a severity code of 40 is found in a job log report, then it would be sufficient to use any of the three methods described above to scan for this string. The fact that the "Require rule" flag is set to Y = yes triggers the SCANSPLF overall result, and that result is interpreted according to the setting of the FAILOPT parameter in the SCANSPLF command.

This task example without the captured data element illustrates how it is possible to safely allow the remaining OpCon/xps schedule to continue whenever no severity codes of 40 are found in the BIGCLJOB job log. When no error is found, the OpCon/xps schedule completes quickly without having to wait for an operator to manually examine the job log report. However, when a severity of 40 is found, then maybe an operator's intervention will be required to evaluate the point of failure and
decide how to recover.

Even if an error is intercepted, the SCANSPLF Scan Rules, the Captured Data Response Rules and some utilities associated with this command can be used to simply the operator's analysis and speed up the process of discovering the point of failure. Often, a self-repairing procedure can be created in OpCon/xps. In response to the error condition it is possible to initiate a new schedule and add jobs to it so that the error condition, if recognized, can be corrected and then normal processing
can be automatically resumed.

#### Finding Scan Values in a Report

For the SCANSPLF command, all matched Scan Rules have their scan values stored in the LSAM's Captured Data Log file. The contents of this file may be viewed using the LSAM menu 3, option 8. This file also contains data that may be captured from Operator Replay scripts, whenever a screen data capture rule is defined. But by default, when the log viewer program is started from the LSAM menu 3, the list is limited by a subset rule to only data captured by the SCANSPLF command. (Use F15=Subset to
change the subset rule in effect for the list display.)

Each Scan value in the Captured Data Log file is labeled with the report page, line and column where the data was found. This means that in the example application above for scanning the QPJOBLOG report, the location of the failing sub-program could be found very quickly if the operator would use the Captured Data Log file viewer to find this SCANSPLF Application (labeled as the Capture ID on the list display), and then find the record(s) associated with the correct date and time.

The primary purpose of the example QPJOBLOG application described above was to report a failed job on an OpCon/xps schedule if any severity code of 40 is found. The single Scan Rule described above finds only the first instance of a severity 40 code. But it could be equally important to find ALL of the severity 40 codes that appear in the job log report. To make sure all errors are found and reported, more than one Scan Rule could be specified for this Application. Only the first Scan Rule needs to be marked as required (Required rule = Y). To find more similar codes, an estimated number of additional Scan Rules could be created based on the greatest number of severity 40 codes that might ever be expected. Each of the additional Scan Rules would be marked as not required. Each of the additional Scan Rules would use the Start Scan Label to find the string '40' in From/To positions 36-37, but each succeeding Scan Rule would have a higher Incidence count. The additional
Scan Rules would be numbered 2 and higher. If only 2 severity codes were found, then the remaining Scan Rules would be ignored and they would not affect the outcome of the SCANSPLF job.

Using the LSAM menu function to view the Captured Data Log file, each severity 40 code that was found could be quickly located by the report page and line. This would make the process of analyzing all the points of failure more efficient. As well, each found severity 40 code could trigger another Captured Data Response Rule in order to initiate automated reporting and recovery procedures.

Additional assistance could be provided to the application operator for every severity 40 code was found if each of the Scan Rules would specify the same \*CAPT option in the Scan value field. Using the Position after label value of (-1) and a Scan value length of 7, the CPF message ID for each severity 40 error would become the actual captured data that appears in the Captured Data Log file. This ability to capture and report data associated with a severity 40 error code could be extended
even farther, as described next.

#### Using Captured Data Response Rules

In the Scan Rule defined above for the example BIGCLJOB the special value of \*CAPT was specified in the Scan Value field. As mentioned just above, every matched Scan Value is logged into the LSAM's Captured Data Log file. Instead of just logging the severity 40 error code, the Scan Rule was constructed so that the severity 40 code was found as a Scan label, leaving the Scan Value field free for capturing any helpful data related to the severity 40 code. In the example above, it is proposed
that it might be helpful to capture and share the CPF message ID that describes each severity 40 error code. (Additional Scan Rules, set as not required, could be created for the purpose of capturing other data elements from the same report line.)

In addition to the Captured Data Log file viewer, the LSAM offers more tools that can be used to respond to any matched Scan Rule, based on the Captured Data Log record. On LSAM menu 3, option 5 supports entry of one or more Captured Data Response Rules (described in the Screens and Windows section below) that can be linked to each Scan Rule.

A Response Rule will not be executed unless the Scan Rule qualifies as matched. In the example application described here, Response Rules could be used to communicate the captured CPF message ID for each severity 40 error code that is found to OpCon where the CPF message ID can be stored as a Job Detail Message associated with the OpCon job.

This section explains how to make that happen. It describes how to combine these LSAM features:

- Captured Data Response Rule
- Storing captured data in an LSAM Dynamic Variable
- Using the LSAM's SAMJOBMSG command to communicate with OpCon, using the value in the Dynamic Variable

The reason for sending Job Detail Messages to OpCon is that it is very easy for an OpCon operator to find the Job Detail Messages. This is done, for example, by using a right mouse click on the job, such as it may appear in a list of jobs for an OpCon schedule. The right mouse context menu that appears in Enterprise Manager offers access to Job Information. When that is selected, a window opens with tabs that can be navigated as follows: Configuration tab -\> Operations Related
Information -\> (+) Job Detail Messages. Job Detail Messages that can be sent by the IBM i LSAM will appear here. It would probably be very helpful to an operator to get an immediate list of any/all CPF message IDs that are associated with the severity 40 error codes found by the SCANSPLF job. The operator would be automatically signaled that the SCANSPLF job has failed, and then the CPF message IDs - or any other information captured and sent by the LSAM - would be just a mouse click
away. 

To deliver Job Detail Messages to OpCon, there is an LSAM command called SMAJOBMSG. This command is only valid for use within a job that was started by OpCon, such as the job executing the SCANSPLF command. The SMAJOBMSG command can be used to send the CPF message IDs to the OpCon Job Detail Messages. A Captured Data Response Rule that executes when a severity 40 error code is found can name the SMAJOBMSG command in its response command line. The Captured Data Response Rule command line
supports LSAM Dynamic Variables, so if the CPF message ID was stored as a Dynamic Variable, it could be inserted into the SMAJOBMSG text parameter. Fortunately, the Captured Data Response Rule also has the option of naming a Dynamic Variable in which to store the captured data, and the module that executes the Captured Data Response Rule always performs the storage of captured data to variables before it attempts to execute the response command. Following is more detail about how to set
up this link between the LSAM and OpCon. 

The link between the scanning process and OpCon is defined in the Captured Data Response Rule master record. Here is a list of the fields in that file showing the settings required to complete the example task. The field values listed here are based on the example SPLF Scan Rule described above.

Capture identifier: ERR2

Capture sequence: 10 (if there are additional scan rules, use the correct sequence number for each in separate Response Rules)

Response sequence: 10 (multiple Response Rules can be assigned to the same capture identifier and sequence; this number governs the order in which response rules are executed)

Compare rule: EQ (this example does not qualify the response rule, so it is set up as "equal \*ANY compare data")

Continuation: (blank) (not used in this example)

Compress numeric: N (= no; no comparison is being done, so this field does not apply)

Dynamic variable: CPFERR1 (this will be the name of the Dynamic Variable into which the response rule program will store the CPF message ID)

Operator Repay variable: (blanks) (not used in this example)

Response command:
```
SMAJOBMSG TEXT('Found error ID is: {CPFERR1} ') MSGSEQ(0)
```
--> Notice that the Dynamic Variable name is inserted into the TEXT parameter surrounded by the pair of curly brackets { }, which are the default separators for Dynamic Variables. (The separator characters could be changed from the LSAM's Job Tracking menu \# 1, using the Job Tracking Configuration function \# 7.) The MSGSEQ must be unique within any one job, so if other Captured Data Rules also use the SAMJOBMSG command, make sure each rule gets a unique number for the MSGSEQ, preferably in order of their execution. (HINT: Always leave the MSGSEQ parameter set to zero, its defaut value, so that OpCon can automatically assign a unique number to each separate Job Detail message and avoid overlaying any previous message that was sent.)

Compare data: \*ANY (this rule is not qualified by any comparison to thecaptured value)

#### FAILOPT(2) Example Summary

The Captured Data Response Rule defined above will only execute if the example SPLF Scan Rule in the defined previous paragraphs finds a match. For the overall example of the BIGCLJOB defined in this section, here is a summary of the actions that take place, in order of execution:

- In this example, the matching process is based on finding the scan label, which is any severity 40 error code in a job log report. The scan label in the scan rule record is used instead of the PARAMETERS keyword of the SCANSPLF command.
- If the scan program finds no code 40 in the job log report the whole process ends and the FAILOPT parameter of the SCANSPLF command causes the job to end normally. The remaining jobs that depended on the BIGCLJOB are immediately allowed to execute.
- When the scan program finds a code 40, the scan rule then finds and stores the CPF message ID on that line of the report.
- Next, the scan program calls the response rule module, and that module finds the Captured Data Response Rule defined above.
- The response rule stores the captured data into an LSAM Dynamic Variable.
- The response rule replaces the Dynamic Variable token in the response command with the latest value for that variable, which in this case is the CPF message ID.
- The response rule program executes the revised response command, causing a Job Detail Message to be sent through the LSAM communications channel to the OpCon SAM, and the message is logged to the current job.
- Since there is only one scan rule and one response rule, after they are processed the SCANSPLF command program is finished. According to the FAILOPT parameter of the SCANSPLF command, finding a match on the scan rule means that the job should be forced to end abnormally.
- The OpCon operator sees that the LSAM has signaled a failure for the OpCon job. The operator views the Job Configuration information
    about that job and finds the Job Detail Message sent by the LSAM.
- Perhaps the OpCon operator contacts the IBM i operator and reports that it will be necessary to examine the BIGCLJOB job log to analyze why there was a failure.
- The IBM i operator uses the LSAM menu system's viewer of the Captured Data Log to locate the captured data for the last execution of the BIGCLJOB job and finds the exact page and line of the job log where the error was reported.
- The IBM i operator is able to use an IBM i tool to open and view the BIGCLJOB job log report and position the viewer to the correct page and line, from which point the preceding messages are studied to learn the cause of the failure.
- Optionally, the OpCon operator could have used the View Output function, available on the right mouse click context menu associated with the BIGCLJOB, to request a view of the job log. This view of the job log is not as easy to position as when an IBM i spool file viewer is used, but it is possible to scan for the CPF message ID and quickly locate the correct place in the job log where the error may be studied.

The last few summary steps above assume that the error condition is unique and requires human operator intervention. However, in cases where error conditions might be somewhat common, it could make sense to construct IBM i LSAM and OpCon/xps configurations that would insert a self-healing and recovery procedure into the daily processing so that after the error has been documented, normal processing would be resumed automatically.

# The Data Capture Logging Functions

There are two different log files in the LSAM database that store information about captured data. The first log file (OPRLOGF40) is where the actual captured data elements are stored. The second log file (CAPLOGF10) is a debug log file that stores detailed information about both the process of capturing data and the process of executing response rules.

These files are logically joined together by four key fields. The first two key fields are common to all types of data: The Application ID and the capture rule Sequence number. Both files are used by the SCANSPLF command and by the Operator Replay script execution driver program. There is a data type field in each file that labels the data as type C = Operator Replay screen capture and S = SCANSPLF matched scan values.

The values of the secondary key fields, that is, the third and fourth key fields, depend on which type of data is stored. For type C, the secondary key fields are the Operator Replay script Name and the script step Sequence number. For type S, the secondary key fields are the Spool File Name and the Spool File Number (an attribute of the spool file relative to other spool files produced by the same job).

### The Log of Captured Data

File OPRLOGF40 is where captured data is stored by either the SCANSPLF command or by an Operator Replay script that uses screen capture rules. This file is categorized as an LSAM daily log file. As such, it is purged of older records according to the record date under the control of the LSAM Parameter: Days (to) keep LSAM logs.

An Operator Replay script screen data capture rule always stores data in the data capture log file. But the SCANSPLF command can only store data in this log file when it finds a match to a SPLF Scan Rule. The reason that the SCANSPLF command does not store captured data for mismatched rules is that there is no guarantee that the desired scan rule data would ever be found in the report, and it is not possible to compute the actual page, line and row where the scan data was located.

:::tip TECHNICAL NOTE
The execution of optional Captured Data Response Rules could have been implemented as the result of a trigger added to the Data Capture log file. Instead, the search and execution of Response Rules has been implemented in a single, centralized program module that is shared (compiled by copy) by all programs that write to this log file. This choice was made due to its relative efficiency, its ease of maintenance and to keep database maintenance simpler.
:::

The data capture log file may be viewed from either LSAM menu 3: Events and Utilities, or from LSAM menu 4: Operator Replay, using function 8 on either menu. Each menu call to the inquiry function sets a parameter that causes the initial list display to be filtered by data type, so that only SCANSPLF records appear from menu 3 and only Operator Replay records appear from menu 4. However, function key <**F15**\> may be used from either starting point to change the subset rule in effect for 
the display.

### Debug Logging of Captured Data Response Rules

The LSAM programs that process data capture and also Captured Data Response Rules are all enabled to optionally write log entries to a Captured Data debug log file, CAPLOGF10. This form of debug logging is controlled by an LSAM Utilities configuration option, accessed as function 7 on LSAM menu 3.

When captured data debug logging is turned on, multiple entries are written to this debug log file in order to provide a trace of all activity related to data capture. Both the capture actions and any associated response rule actions are logged in the same file. Mnemonic labels of each entry help to portray a profile of what happens with each data capture. The high level outline of this profile is visible in the initial list display of this file, using the LSAM menu functions. A list of the mnemonic record labels is presented under the Utilities Screens and Windows section, below.

The captured data debug log file may be viewed from either LSAM menu 3: Events and Utilities, or from LSAM menu 4: Operator Replay, using function 9 on either menu. Each menu call to the inquiry function sets a parameter that causes the initial list display to be filtered by data type, so that only SCANSPLF records appear from menu 3 and only Operator Replay records appear from menu 4. However, function key <**F15**> may be used from either starting point to change the subset rule in effect
for the display.

### Recommended Strategy for Use of Captured Data Log Files

The default setting of the LSAM log files for captured data is to purge the data capture log file according to LSAM Parameters without regard to a database backup schedule. The debug feature for captured data operations may be set off (depending on when the LSAM was originally installed).

At some sites it may be preferred to leave the captured data debug function turned off except during the early stages when new rules are being implemented and require diagnosis to stabilize their operation. After the diagnostic stage is over, the debug feature can be turned off in the LSAM Utilities configuration (LSAM menu 3, function 7) and the debug log file will be purged by the LSAM daily maintenance server job (at the hour specified by the user in the LSAM Parameters, Main menu option 7).

However, some sites that use data capture and captured data response rules may be subject to strict auditing of their automation procedures. For example, a financial institution that chooses to use these LSAM tools to automate balancing functions might be required to provide proof of the reliability of their balancing operations. In this case it would be very important to leave the captured data debug function turned on at all times, and equally important to adopt a careful plan for making and
preserving backup copies of these captured data log files, before they are purged or cleared. This way, the LSAM log file viewer functions could be used at any time to present the proof required by an audit.

The LSAM includes the command SMARGZ that can be used on a schedule coordinated with the LSAM Parameter settings, so that the LSAM database library (default name SMADTA) is backed up to a save file periodically and before the LSAM would purge the daily log files or clear the debug log files. In fact, the SMARGZ command calls the command SMASUP in "LIB" mode, making a backup of the entire LSAM database library first before it then clears all the LSAM debug log files and reorganizes
master files. When the SMARGZ command is used this way, a collection of save files is accumulated in the library called SMALOG (which is shared by all LSAM environments, if more than one is installed). The site can create a procedure to run periodically from an OpCon schedule that will backup the contents of the SMALOG library before the SMARGZ procedure is launched in a dependent job. This will create an archival history of the captured data log files that could be retrieved on demand, by date, in order to satisfy audit requirements.

More information about the SMARGZ and SMASUP commands is provided in [Log File and Database Management](/logs-database/overview) and [Commands and Utilities](/commands-utilities/commands).

:::tip TECHNICAL NOTE
In order to use the LSAM menu functions to view historical log data, it would be necessary to restore the backed up log files from a save file produced by the SMASUP command to a temporary staging library. The LSAM menu functions can be used to view the log file contents if the staging library is added above SMADTA in the job's library list.
:::

## Strategy for Audits of Data Capture and Response

Sites that are subject to audits of automated procedures may need to understand exactly how the LSAM software manages the content of the two types of log files that support Data Capture and Captured Data Response Rules. (This is explained in LSAM Logs and Database Management.) For example, the captured data debug log file may be useful as a proof to show an auditor. In such a case, certain LSAM configuration options and procedures need to be carefully controlled in order to preserve an
accurate record of captured data and any response commands that are executed.

There are two different log files associated specifically with captured data. First is the Data Capture Log file (OPRLOGF40) which is of the type classified as an LSAM daily operational log. In other words, this file is always used and its use is not controlled by an LSAM option. The other file (CAPLOGF10) is a general purpose debug log file that is not used unless a debug option is turned on. There is a different purge control for these two file types, although the LSAM does create backup
save files in library SMALOG for both log file types.

The Data Capture Log file holds the actual captured data, along with profile information that identifies how and when the data was captured. The SCANSPLF command stores recognized scan values in this file, although it is not able to store a record of scan values that were not discovered in a target spool (report) file. The Operator Replay script driver program also stores data in this file whenever there are screen data capture rules registered against the sequence steps of a replay
script. The Data Capture log file records are used as the reference point for selection and execution of Captured Data Response Rules. The common module, shared by both LSAM functions, that writes Data Capture Log file entries is the module that checks for any Captured Data Response Rules at the same time.

Both of these LSAM functions check the LSAM data capture debug control flag stored in the LSAM Parameters control file. This control flag is  set by using the LSAM Utilities configuration function: LSAM menu 3, function 7. The one flag controls debug logging for both features. When the debug flag is set to Y=yes, each LSAM feature writes multiple records to the debug log file to provide detailed information about the data capture process and especially about the handling of any Captured
Data Response Rules. The debug log file is the only place where a record may be found of actions performed by the Captured Data Response Rules.

For the purpose of supporting automation audits, this discussion assumes that both log files should be used and that a complete and accurate history of content must be preserved in archival backup tapes. Both the LSAM Events and Utilities sub-menu and the Operator Replay sub-menu provide two log file viewers at functions 8 and 9 that can be used to view the captured data daily log file and the debug log file, respectively. These viewer programs normally display the current content of each log file, but they can also be used to provide a formatted view of log file copies that are restored from archive, either by use of file overrides or by manipulation of the interactive job's library list.

Here is a high-level summary of the steps SMA would recommend to establish a reliable audit trail for LSAM automation. This strategy actually applies to all of the LSAM features, not just to the data capture procedures. These steps are discussed in more detail following the outline:

1. Start debug logging, e.g., for data capture using LSAM menu 3, function 7.
2. Set LSAM Parameters "Days to keep daily logs" and "Days to keep debug logs" to a number of days at least as long as the frequency of the SMARGZ job defined in the following steps.
3. Set LSAM Parameters for the "Days to keep daily BkUp" and for "Days to keep debug BkUp" which specifies how long to keep the backup save files that hold data which was purged from the active log files.
4. Create a user-defined procedure for backing up library SMALOG to tape. This user-defined step is critical if it is important to preserve an archive of all automation activity that was recorded in LSAM log files, because the SMARGZ procedure, below, deletes older save files based on the "Days to keep...BkUp" control values.
5. Create an OpCon schedule for LSAM database maintenance with jobs that will not start until other LSAM activity is completed.
6. The first job of the LSAM database maintenance schedule completes the user-defined procedure to backup library SMALOG to tape.
7. The next job in the schedule executes the SMARGZ command. (Note: Use the LSAM's own server job description, SMALSAJ00 in SMADTA (or equivalent library) to execute the SMARGZ command in any subsystem so that the job will be using an LSAM environment library list.)
8. Set subsequent IBM i jobs to not start until the SMARGZ job has completed normally.

The second and third steps in configuring the LSAM to preserve the captured data log files is to set the purge controls that affect each type of file. The Data Capture Log file is purged of records according to the date of each record. This purge function happens at the Maintenance Hour specified in the LSAM Parameters (LSAM main menu, function 7). Records are retained according to the number of days to keep LSAM logs, as specified on the LSAM Parameters. This number of days field affects all of the LSAM daily operational log files, and/or the debug/audit logs, in general. The LSAM daily database maintenance procedures always create backup save files in the library SMALOG, using type "O" save files (first letter of the save file name is an "O", followed by a date/time stamp) for the daily Operational log save file, and using type "D" save files for the Debug/audit log save file.

It will be important to coordinate the LSAM library SMALOG backup schedule with the two number of days to keep log file backup save files in library SMALOG, in order to assure that no records are lost when the SMARGZ procedure automatically deletes old save files from SMALOG.

The SMARGZ command starts by executing the SMASUP command in its "LIB" mode, that is, it creates a save file backup of the entire LSAM database library SMADTA. The SMARGZ command next reorganizes all of the LSAM database files that are not set to "re-use deleted records," during which time the LSAM server jobs are suspended. Finally, SMARGZ deletes old save files from the SMALOG library according to the number of days to keep save files, set in the LSAM Parameters (LSAM main menu, function
7). But, the SMARGZ command does not provide any means to automatically backup the SMALOG library before old save files are deleted, which is why it is critical to configure a user-defined archiving strategy for the SMALOG library.

The LSAM Parameters (LSAM main menu, function 7) provide some rudimentary schedule control fields that could be used to control when the LSAM's internal database maintenance server program would cause the SMARGZ program to be executed. These fields are illustrated and explained in the Configuration topic. This simple strategy may be sufficient for sites that are not subject to automation audits, but it is not recommended for sites that will be audited because it does not provide any coordination with a user-defined procedure for backing up the SMALOG library to tape. In place of the LSAM controls, SMA recommends that an OpCon schedule be created with an IBM i job that will execute the SMARGZ command.

Utilizing an OpCon schedule for execution of the SMARGZ command offers two important advantages. First, the SMARGZ job can be made dependent upon successful completion of the user-defined backup procedure that saves library SMALOG to tape. Second, it is much easier to assure that no IBM i LSAM jobs are running during the brief period when the LSAM services are suspended by the SMARGZ command. This second point is especially important because it can help prevent any Operator Replay or SCANSPLF jobs from running during the LSAM database maintenance procedures, helping to assure that there will be no gaps in the captured data debug log file history of any job.

### Restoring and Viewing Archived Log Data

The discussion of strategy for audits is completed by this brief review of techniques that can be used to restore log files from archive for viewing during an audit. This is the same procedure used by SMA when the SMASUP save files are sent to Support to analyze a problem. Each save file produced by the SMASUP command is named according to the date and time the file was created, using this pattern: xCYYMMDDhhmm, where "x" is a fixed letter (L for LIB and LOG saves completed by SMASUP, O for
daily operational log file saves and D for debug/audit log file saves), while the other letters refer to century, year, month, day hours and minutes. Thus, it is easy to identify a save file that probably contains log (and master) file data for a particular date. The audit review process would start with restoring the desired save file from the archival tape to a target, temporary library.

Next, the contents of the restored save file can themselves be restored to the same temporary library (except for full library saves completed by the SMASUP command in LIB mode - as when SMARGZ executes SMASUP) using the RSTOBJ command. (Full library saves must be restored to a separate, temporary library using the RSTLIB command.) After the files are restored, start the LSAM menu system (command STRSMA, or LSAMENU). To use the LSAM log file viewer programs for examining the restored log
files, add the temporary library to the top of the library list (using the IBM i command ADDLIBLE). While the library list is altered, the LSAM menu-driven log file viewers will show the contents of the restored log files instead of the current versions of those files. After the investigation is complete, remember to remove the temporary library from the interactive job's library list, or just exit out of the LSAM menu system.

:::tip TECHNICAL NOTE
Some of the restored log and master files may require that a logical view be duplicated from the live SMADTA library to the temporary library, in order to support the LSAM log viewer programs. Please contact SMA Support for advice if this becomes necessary.
:::

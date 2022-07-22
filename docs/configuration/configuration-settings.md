# Configuration Settings

## IBM i Name Rules

Certain parameters must conform to the following rules for IBM i names.

- Names must be 10 characters or less.
- Names must begin with an alphabetic character (A through Z, @, $, and #). 1, 3
- All subsequent characters can be alphanumeric (A through Z, 0
    through 9, @, $, #, and _ (underscore)).
    3
-   There can be no embedded blanks.
- The following special characters are not allowed to be used in names:
  - / Forward slash
  - \ Backslash
  - \* Asterisk
  - , Comma
  - : Colon
  - ; Semi-colon
  - \- Dash
  - = Equal sign
  - \+ Plus sign
  - ? Question mark
  - | Vertical bar
  - < Left angle bracket
  - \> Right angle bracket
  - & Ampersand
  - % Percent sign
  - ' Single quotation mark
  - " Double quotation mark
  - . period2


[1] For some command parameters, IBM i permits special values to begin with an asterisk (\*).

[2] The period is not valid as the first character of the name string, but it is valid as a subsequent character.

[3] SMA does not recommend using special characters due to difficulties that can arise with character translation tables. Please use only alphabetic characters and numeric digits in IBM i names.

## IBM i Password Rules

Certain parameters must conform to the following rules for IBM i passwords. Additional rules may be assigned with IBM i system security control values (refer to IBM reference SC41-5302, Security Reference).

- A password may contain any character string that passes the target system security requirements.
- A password may contain up to 128 characters.  
   - Please contact SMA Support to report any LSAM limitations on passwords that interfere with applications that could otherwise be automated by OpCon.

## Update Configuration Variables

1. <**Tab**> to the relevant field.
2. Type a new value for the parameter. Refer to the table below for more information about each parameter.
3. Repeat steps 1-2.
4. Press <**Enter**> to update the LSAM's configuration.

:::tip
The update is stored immediately in the LSAM Parameters control file, however, any change in control values does not take effect in the LSAM server jobs until they are stopped and restarted.
:::

### Information Fields
- Environment:
  -   This display field contains the name of the LSAM environment.  An "environment" is defined as a unique set of IBM i library names that are required for each instance of the LSAM software product.
  -   For new installations, the default value is SMADEFAULT.  A different Environment name must be assigned if more than one copy of the LSAM software will be installed within the same IBM i partition.
  -   SMA recommends using the LSAM Environment name for the LSAM Name when there are multiple LSAM environments within the same IBM i partition.

- Version 
  -   This display field identifies the LSAM's version, stored in the data area LSAVERSION.
  -   When contacting SMA Customer Support about the LSAM, please report the version. 
  
### Heading Information

| Field | Description |
| ----- | ----------- |
| Environment | - This display field contains the name of the LSAM environment. |
|             | - For new installations, the default value is SMADEFAULT and the LSAM Name is IBMILSAM, or the IBM i system/partition name may be used. Use all capital letters! |
|             | - SMA Technologies recommends using the LSAM Environment name for the Host Name when there are multiple LSAM environments within the same IBM i partition. (Refer to below.) |
| Version     | - This display field identifies the LSAM's version, stored in the data area LSAVERSION. |
|             | - When contacting SMA Technologies Customer Support about the LSAM, please report the version. |

### LSAM Control Parameters

#### Control Parameters
| Field       | Default     | Valid Values    | Required (Y/N)   | Description |
| -----       | -------     | ------------    | --------------   | ----------- |
| LSAM Name   | IBMILSAM    | IBM i Name (Refer to [IBM i Name Rules](#IBM2) | Y           | - This field identifies each LSAM environment to OpCon. |
|             |             |                 |                  | - The default LSAM environment may use the system name. |
| Max Concurrent Jobs | 100   | Verify that the number of jobs does not exceed the maximum number of active jobs allowed by the IBM i subsystem definitions. | Y           | This field contains the maximum number of jobs the LSAM is allowed to process concurrently. |
| SMA Subsystem Name | SMASBS      | IBM i Name [IBM i Name Rules (Refer to Rules)](#IBM2)| Y           | - This field contains the name of the IBM i subsystem where the LSAM agent jobs run. |
|             |             |                 |                  | - The IBM i subsystem should be a dedicated subsystem unshared with other applications, because normal LSAM management functions start and stop the subsystem. |
|             |             |                 |                  | Note: Although the installation of the LSAM creates a default subsystem description (SMASBS), the IBM i administrator is responsible for configuring the subsystem and for tuning system performance. |
| Internet  Address  | <IP address of the server\>        | 255.255.255.255 (IPv4 required address pattern shown. If the IPv6 switch is set to Y = yes, this field MUST be updated to the correct format. Use F4 for assistance.)        | Y         | - This field identifies the IP address of the server where the LSAM programs may be contacted. |
|             |             |                 |                   | - Use the <**F4**> function key to view a list of valid IP addresses for the system. |
|             |             |                 |                   | Caution: Do not use the local host address of 127.0.0.1 |
| Int IP Addr (or *EXT) | *EXT       | *EXT or IP Address | Y           | -  Most IBM i partitions will directly support an Interface to the External (or Public) IP Address that is used by OpCon to connect to the LSAM Job Scheduler and JORS Server. When this is the case, just leave the Internal IP Address field set to *EXT. The External IP  address is available for the Bind IP? Option. |
|             |             |                 |                   | - However, when port-forwarding is being used by Client IBM i (virtual) partitions, as they are supported by a (physical) Host partition, then it is necessary to  specify an IP Address that can be directly accessed “internally” by the virtual, client partition, in order to support the Bind IP? option. |
| Bind IP?    | N           | Y or N      | Y           | - The original behavior of the LSAM communications programs was to request any available IP Interface where they can bind their designated Ports and then use that connection point to accept a socket connection request from the OpCon server. |
|             |             |                 |                   | - It is often preferred, and possibly more secure, to bind the Port to a specific IP address. This ability is required if an Internal IP address (such as a Virtual LAN address) will be used to support the OpCon server’s connection to the designated External IP Address. |
| Use IPv6 protocol? | N           | Y or N      | Y           | The LSAM communications programs (for both job scheduling and JORS) are capable of managing both the IPv4 and IPv6 protocols, concurrently. This support cannot be used until at least one IPv6 communications line has been configured under IBM i. |
| Start JORS server? (Y/N) | Y=yes       | Y or N      | Y           | -  This field determines if the LSAM server startup routines will automatically start the JORS communications server program.  |
|                          |             |             |             | - This option should normally be set to Y=yes. The option is provided only in case any functional problem might make it convenient to disable the lower priority JORS services while still allowing the critical job scheduling servers to continue processing. |
| EBCDIC -> A: translation table (EBCDIC to ASCII) or CCSID number  | QASCII      | IBM i Name Rules. Table must exist before starting LSAM. A CCSID number may be specified instead. *  | Y           | -  This field identifies the translation table used to translate IBM i native EBCDIC characters to the ASCII character set required by OpCon. |
|                          |              |             |           | - To use a CCSID number, set the Library field to the special value of "*CCSID". |
| EBCDIC -> A: translation table library or '*CCSID' | QSYS | IBM i Name Rules. User-defined tables would exist in libraries other than QSYS. | Y | - The name of the DB2 UDB (DB2/400) library where the translation table may be found. |
|                          |              |             |           | -  Use the special value of "*CCSID" instead of a library name if a CCSID number will be specified in the table name field. |
| ASCII -> E: translation table (ASCII to EBCDIC) or CCSID number   | QEBCDIC     | IBM i Name Rules. Table must exist before starting LSAM. A CCSID number may be specified instead. *  | Y           | - This field identifies the translation table used to translate the ASCII character set incoming from OpCon to the IBM i native EBCDIC character set used by the LSAM server programs. |
|  |                 |               |                  | - To use a CCSID number, set the Library field to the special value of "*CCSID". |
| ASCII -> E: translation table library or "*CCSID"   | QSYS        | IBM i Name Rules. User-defined tables would exist in libraries other than QSYS.  | Y           | - The name of the DB2 UDB (DB2/400) library where the translation table may be found. |
|             |             |              |            | - Use the special value of "*CCSID" instead of a library name if a CCSID number will be specified in the table name field. |
| Communication Port JORS Port | 3100        | Valid port numbers range from 0 to 65535  | Y           | - These fields contain the TCP/IP port numbers used for communication between the LSAM and SMANetCom. |
|             |             |              |            | - Communications Port is for Job Scheduling. |
|             |             |              |            | - JORS Port is for OpCon retrieval of job logs. |
|             |             |              |            | **Note**: The JORS Port needs to be set in both the LSAM Parameters and the advanced settings of the OpCon machine record. The JORS port is different from the SMA File Transfer port for this LSAM. |
|             |             |              |            | - For more information on modifying the JORS port number, refer to Communication Settings in the Concepts documentation. |
|             |             |              |            | - For multiple environments, each LSAM must have a unique port number. |
|             |             |              |            | **Caution**: Avoid port numbers ranging from 0 to 1023 due to common conventions. |

* If one table field specifies a CCSID number, then both table fields
must specify a CCSID number. Refer to the topic of Character Translation
under the Extended Discussion of Parameters, below.

### Job Default Parameters

#### Job Parameters
| Field        | Default   | Valid Values | Required (Y/N) | Description  |
| -----        | -------   | ------------ | -------------- | -----------  |
| User Name    | QSYSOPR   | IBM i Name Rules (Refer to [IBM i Rules](#IBM2)| N        | - This field contains the name of the user whose authority governs the privileges granted to the LSAM jobs. This is useful whenever a user name is not being provided from OpCon. |
|              |           |              |          | - Certain LSAM utilities may require that the user name specified have special privileges normally granted to the system operator (as for QSYSOPR). |
|              |           |              |          | - The IBM i administrator is responsible for creating and configuring IBM i user profiles that will be used for OpCon job start requests. |
|              |           |              |          | - Also ensure that the SMANET user profile has been granted authority to use this user profile. |
| Jobd Name    | QBATCH    | IBM i Name Rules (Refer to [IBM i Rules](#IBM2) | N        | - A Job Description name referring to the system object that determines how a job  is processed. |
|              |           |              |          | - This job description controls all remaining job attributes unspecified by this screen. |
|              |           |              |          | - The IBM i administrator is responsible for creating and configuring the job description. |
| Jobd Lib     | QGPL      | IBM i Name Rules (Refer to [IBM i Rules](#IBM2) | N        | The library within the DB2 database where the job description resides. |
| Jobq Name    | QBATCH    | IBM i Name Rules (Refer to [IBM i Rules](#IBM2) | N        | - A Job Queue name referring to the system object that stores waiting or on hold  job requests. |
|              |           |              |          | - This determines which subsystem runs jobs when an OpCon job request does not specify a job queue. |
| Jobq Lib     | QGPL      | IBM i Name Rules (Refer to [IBM i Rules](#IBM2) | N        | The library within DB2/400 where the job queue resides. |
| Outq Name    | QPRINT    | IBM i Name Rules (Refer to [IBM i Rules](#IBM2) | N        | An Output Queue name referring to the system object that stores waiting or on hold printer spool files. |
| Outq Lib     | QGPL      | IBM i Name Rules (Refer to [IBM i Rules](#IBM2) | N        | The library within the DB2 database where the output queue resides. |
| Current Library Name | *CURRENT  | IBM i Name Rules (Refer to [IBM i Rules](#IBM2) | N        | - This field specifies the Current library within the library list of an IBM i job. |
|              |           |              |          | - The system always searches the Current library first when looking for a requested program object or a file. |
|              |           |              |          | - The Current library definition is not required, but is useful for quickly changing the library name that is  initially searched. |
|              |           |              |          | - Instead of *CURRENT, any existing library name may be specified. SMA Technologies recommends using *CURRENT when there is no requirement for naming this library. |
| Initial Library List | *JOBD    | *CURRENT *JOBD *NONE *SYSVAL   | N        | - When unspecified by an OpCon job request, the library list of the requested job defaults to this value. |
|              |           |              |          | - For jobs depending on the LSAM environment, use the value *CURRENT.  |
|              |           |              |          | - Specifying this value is an effective way to control a job's library list when using multiple environments. |
| Printer Device | *JOBD    | *JOBD *CURRENT *SYSVAL *USRPRF  | Y        | - Establishes the value that will be used for all jobs that the LSAM submits, for the PRTDEV parameter of the SBMJOB. |
|              |           |              |          | - This job parameter is currently not supported by a job master field in the OpCon Enterprise Manager. |
|              |           |              |          | - The default value of *JOBD is recommended because it is the most flexible – the printer device, including a value of *USRPRF, can be specified in each job description that is used. |
| Job Priority | 5         | 1 - 9        | N        | - This field determines the priority of OpCon jobs in the specified job queue. |
|              |           |              |          | - This value determines the run order of jobs waiting in the job queue. |
|              |           |              |          | - SMA Technologies recommends using the moderate value 5 to keep from interfering with priorities defined in OpCon. |
| Logging Level | 4         | 0 -- 4       | N        | - This field specifies the level of IBM i job logging. |
|              |           |              |          | - Levels range from 0 (no logging) to 4 (detailed logging). |
|              |           |              |          | - SMA Technologies recommends level 1 for effective troubleshooting. |
|              |           |              |          | - Refer to the IBM i Help text regarding the LOG parameter for the commands CHGJOB and SBMJOB. |
| Severity     | 00        | 00 - 99      | N        | - This field sets the filter for IBM i messages sent to the job log. |
|              |           |              |          | - The job log records only messages with a severity equal to or higher than this value. |
| Text         | *SECLVL   | *MSG *SECLVL *NOLIST | N        | This field specifies the maximum character length of each message added to the job log.|
|              |           |                          |          | - *MSG logs a single line. |
|              |           |                          |          | - *SECLVL logs the full message help text plus incident-specific parameter values. This logging type uses more system resources. |
|              |           |                          |          | - *NOLIST does not log any message text. |
| Log CL       | *YES      |  *YES *NO       | N        | - This field determines if the job log includes entries for executed lines of a control  language program. |
|              |           |              |          | - Since this type of logging uses more system resources, SMA Technologies recommends only using this for debugging or for critical procedures requiring full documentation. |
| Inq Msg Reply | *RQD     | *JOBD / *RQD / *DFT / *SYSRPYL | N        | - This field determines how un-handled information or error messages should be handled by the LSAM jobs. |
|              |           |              |          | - To properly engage its exception handlers, OpCon expects the value *RQD. |
|              |           |              |          | - For more information, use the prompted command SBMJOB to see the IBM Help text regarding the INQRPYMSG parameter. |
| File Arrival Job Description | SMALSAJ00 | IBM i Name Rules (Refer to [IBM i Rules](#IBM2) | Y        | File Arrival jobs require that the IBM i LSAM library list be included in the job description. The LSAM server job description is a good default value that can be used, unless the user needs to override some job attributes for the whole File Arrival job. Note that the Enterprise Manager job master record supports selection of a unique Job Queue,  so it is not necessary to define a separate job description just to change the job queue where File Arrival jobs will be submitted. |
| File Arrival Job Description | SMADTA    | IBM i Name Rules (Refer to [IBM i Rules](#IBM2)   | Y        | Name the DB2 library where the File Arrival Job Description is stored. If the default job description of SMALSAJ00 is used, it would be necessary to change this library name from the default of SMADTA within a separate instance of the LSAM software, such as when two copies of the LSAM software (one for testing) are installed within the same IBM i partition. |
| IFS LOG      |           |              |          | Please contact SMA Technologies Support for assistance before making changes to these three special override fields. They apply only to the QSHELL commands executed by (1) File Arrival jobs, or (2) the LSAM CHKIFSFIL command. The default values prevent excessive QPJOBLOG reports from being produced by QSHELL service jobs. |
| IFS LOG -- job priority | 1         | 0 -- 4, *SAME | Y        | This field specifies the level of IBM i job logging. Levels range from 0 (no logging) to 4 (detailed logging). SMA Technologies recommends level 1 for this special-purpose override. Refer to the IBM i Help text regarding the LOG parameter for the commands CHGJOB and SBMJOB. |
| IFS LOG -- logging level | 30        | 00 -- 99, *SAME | Y        | This field sets the filter for IBM i messages sent to the job log. The job log  records only messages with a severity equal to or higher than this value. SMA Technologies recommends a value of 30 for this special-purpose override. |
| IFS LOG -- text | *NOLIST  | \*SAME \*MSG \*SECLVL \*NOLIST| Y        | This field specifies the maximum character length of each message added to the job log. |
|       |           |              |          | - *MSG logs a single line. |
|       |           |              |          | - *SECLVL logs the full message help text plus incident-specific parameter values. This logging type uses more system resources. |
|       |           |              |          | - *NOLIST does not log any message text. SMA Technologies recommends this value for this special-purpose override. |

## LSAM Database Maintenance

For more information, refer to [Log File and Database Management](../logs-database/overview.md)
 and [JORS and Spool File Server](../reference/jors.md). 

### LSAM Database Maintenance Values

| Field        | Default | Valid Values | Required (Y/N) | Description  |
| -----        | ------- | ------------ | -------------- | -----------  |
| Automatic delete-global | Y       | Y = yes / N = no  | Y            | - This field determines if the LSAM automatically purges LSAM daily log files. |
|                         |         |                   |              | - If enabled, purges occur according to the number of days specified to keep LSAM logs. |
|                         |         |                   |              | - This flag does not control job log and spool file purging, or the Backup and Reorganize process. |
|                         |         |                   |              | - The LSAM server job LSAMNG manages log and file purging. |
| Maintenance hour | 0400    | 0000 – 2359 (24- hour clock values) | Y            | - This is a 24-hour clock time after which the LSAM will attempt to perform periodic file maintenance once every day. |
|                         |         |                   |              | - SMA Technologies recommends specifying the time of least activity on the system. |
|                         |         |                   |              | - There may be brief delays in starting jobs just following this hour, especially on the days specified for the backup and reorganize process. |
| Days to keep daily LSAM logs | 5       | 1 - 99       | Y            | - This field specifies the number of days of data to retain in the daily  operations log files. |
|                         |         |                   |              | - There is a separate control for the category of debug/audit log files (refer to [Operator Replay Scripts](../operator-replay/overview.md) about types of log files).  |
| Days to keep daily BkUp | 30      | 1 - 999      | Y            | - The number of days to retain the type "O" save files in library SMALOG that contain a backup of the LSAM daily logs before they are purged. |
|              |         |              |              | - A value of 999 means do not delete. In this case the user is responsible for archiving and deleting the save files. |
| Days to keep debug logs | 5       | 1 - 99       | Y            | - This field specifies the number of days of data to retain in the Debug/Audit log  files. |
|              |         |              |              | - There is a separate control for the category of daily log files (refer to [Operator Replay Scripts](../operator-replay/overview.md) about types of log files). |
| Days to keep debug BkUp | 30      | 1 - 999      | Y            | - The number of days to retain the type "D" save files in library SMALOG that contain a backup of the LSAM debug/audit logs before they are purged. |
|              |         |              |              | - A value of 999 means do not delete. In this case the user is responsible for archiving and
deleting the save files. |
| Days (to) keep PTF RLBK SAVF | 30      | 1 - 999      | Y            | - The number of days to retain the PTF rollback save files in library SMAPTF. Only rollback save files for very recently installed PTFs would be useful. Older rollback save files are not required. (Users may request old rollback save files from SMA Technologies if they are needed.) |
|              |         |              |              | - Set this value to a short number of days in order to lower disk space utilized by the LSAM. |
|              |         |              |              | - This control value does not support the special value of 999 to mean "do not delete." Instead, to prevent deletion of the rollback save files, set the LSAM automatic delete-global flag to 'N' = no. However, 999 days is a long time to keep unnecessary old PTF rollback save files. |
| Days to keep SPLFs (spool files) | 5       | 1 -- 99      | Y            | - This field determines when the LSAM will automatically remove spool files that it has been asked to track. |
|              |         |              |              | - Spool files to track are specified in the Enterprise Manager as part of the OpCon job master. |
|              |         |              |              | - Spool files produced by OpCon-scheduled jobs that are not specified in the Enterprise Manager job master will not be deleted by the LSAM. Job log reports are handled separately. |
| Days to keep job logs | 5       | 1 -- 99      | Y            | - This field is the default value that determines when the LSAM will automatically remove the job logs of jobs that were scheduled by OpCon. The LSAM will delete the actual IBM i job log report spool file as well as any (optional) LSAM copy of the job log (refer to next field). |
|              |         |              |              | - Retention of job logs may be controlled for each job master that is defined in the OpCon  Enterprise Manager. The Enterprise Manager job master number of days and number of occurrences (per SAM job name) overrides this LSAM default value. |
| LSAM copy of job logs? | N       | Y=yes, N=no | Y            | - The LSAM can use a database file to store copies of the IBM i job log reports for jobs started by OpCon. This supports the OpCon option to View Output, and may be helpful if the system normally removes IBM i job log reports very quickly. |
|              |         |              |              | - However, copying job logs requires much disk space, so SMA Technologies recommends leaving this option set to N = no. |
|              |         |              |              | **Note**: The LSAM normally supports the OpCon View Output function by reading the actual IBM i job log spool file. It is also able to read the job logs of active jobs, and the reading of active job logs is not affected by this control flag. |
| Backup/reorganize files - FREQ | M       | N=Never D=Daily W=Weekly M=Monthly  | Y            | - This field controls when the LSAM will automatically suspend LSAM server operations to execute a separate job that runs the SMARGZ command. When automatic scheduling is used, this process is initiated shortly after the specified Maintenance Hour. |
|              |         |              |              | - The SMARGZ command (described in Commands and Utilities) uses the SMASUP command in (LIB) mode to create a backup of the entire SMADTA database library. It then suspends the LSAM server jobs while it reorganizes the LSAM's control and master files. |
|              |         |              |              | - Refer to the description of the Days/Wk, Mo field for information about how to control the schedule of this process. |
|              |         |              |              | - It is possible to schedule an OpCon job that will execute the SMARGZ command instead of using the LSAM's own rudimentary schedule controls. Using the OpCon schedule method provides better control over the process and an ability to coordinate the brief LSAM down time with other jobs. When using the OpCon schedule instead, set this field to the value of N = never. |
| Days/Wk(1-7), Mo(1-31) | 26      | 1 - 31       | N            | - The LSAM backup and reorganize process uses this Days field to further define the automatic processing schedule. |
|              |         |              |              | - All daily and weekly scheduled processing is based on the IBM i system day of the week (system value QDAYOFWEEK) as follows: *SUN = day 1 of the week / *MON = day 2 / *TUE = day 3 / *WED = day 4 / *THU = day 5 / *FRI = day 6 / *SAT = day 7 |
|              |         |              |              | When this field is blank, the following default schedule is used: D (Daily) = every day / W (Weekly) = day 1 of the week (*SUN) / M (Monthly) = day 1 of the month |
|              |         |              |              | - When the field is not blank, one or more digits may be typed into the field to indicate which days the process should be executed: M(Monthly) = specify one day of the month using a one- or two-digit number, 1 - 31. **Note** that the simple LSAM  schedule rules do not accommodate the different number of days in each month, so specifying a day greater than 28 will result in the backup and reorganize procedure not being executed on months that have less than 29, 30 or 31 days. To specify the end of the month, use an OpCon schedule instead of LSAM scheduling.  D(Daily) or W(Weekly) = specify the day or days of the week when the process should execute. For example: 136 = Sunday, Tuesday, Friday |
| Days keep LSAM backup (Days to keep the LSAM SMADTA library backup and/or log file extract save files)  | 90      | 1 - 999      | Y            | - The number of days to keep LSAM backup save files of type "L" in the library SMALOG. Type "L" save files are produced by the SMASUP command, and they may contain a complete backup of the SMADTA library (option LIB), a copy of all log files (option LOG), or only selected log and/or master files (option SEL). |
|              |         |              |              | - A value of 999 means do not delete. The save files will remain stored until removed by a manual process or by a job scheduled in OpCon. |
|              |         |              |              | - The LSAM command SMARGZ can be used to drive the save file delete process. (Refer to [Commands and Utilities](../commands-utilities/commands.md) for more information about the SMARGZ command.) |

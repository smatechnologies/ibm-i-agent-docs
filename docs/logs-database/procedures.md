---
sidebar_label: 'Procedure to Manage LSAM Debug/Audit Logging'
---

# Procedure to Manage LSAM Debug/Audit Logging

This section presents a simplified method for starting, stopping, and retrieving LSAM debug log information. Please ask advice from SMA Support in order to decide which logging features to use and what log file content is needed to help solve a problem. More information about debug/audit logging may be found in the section titled Manage LSAM Logging, below.

:::tip
It is not necessary to stop and restart the LSAM server programs when starting or stopping the debug logging features for the main job scheduling server programs.
:::

The term "debug/audit" implies that a certain group of LSAM log files are not required for daily operation of the LSAM features. However, these optional logging functions should be considered a requirement during the early weeks and months when the LSAM is first used because they provide information that is necessary to diagnose problems with the configuration of LSAM automation features, and with job scheduling by the LSAM for OpCon. This is the "debug" purpose of these files. 

At the same time, these logging options may be permanently useful to sites for the "audit" purpose, since they provide evidence of the LSAM automation that might be required by auditors of data center operations. Therefore, SMA recommends that most sites should plan on leaving the debug/audit logging options turned on (except do NOT turn on the "trace logging" options, as explained below). The current set of LSAM automatic database management programs can be tuned by LSAM Parameters so that disk space utilization can be kept at acceptably low levels.

:::warning
Watch carefully for LSAM logging options that are labelled "trace logging."  The tracing option can produce an enormous amount of data in a very short time.  These logging options should only be activated upon instructions from an experienced LSAM software analyst or programmer, typically a staff member of SMA.  Also, after the trace logging function has captured data about a target problem, the trace logging option should be disabled as soon as possible.  Finally, remember that the trace logging files are not automatically purged, so whenever the problem analyst indicates that the trace logs have been received, these files should be manually cleared to recover disk storage.  Contact SMA Support if assistance is needed for clearing the trace logging files.
:::

## Turn On Debug Logging

1. Log into the IBM i wit a user profile that has LSAM administration privileges.
:::tip
The LSAM does not need to be started or stopped at this point.
:::
2. In the command line, enter **SMAGPL/STRSMA**. For more information on STRSMA command parameters, refer to the [STRSMA Command](../operations/lsam#the-strsma-command).
3. Enter **6** to choose the LSAM management menu in the SMA Main Menu.
4. Enter **4** to choose Manage LSAM logging in the Operator Replay Menu.
5. Type a "**1**" (= Start) next to one or more logging features.

    a.  It is possible to type "**1**" next to logging functions one at a time, then press <**Enter**> to update the Pending status, until the correct logging profile is shown. Pressing <**Enter**> does not initiate any Start or End actions.
:::warning
Do not enter "1" next to any line that is titled "trace logging" unless instructed to do so by SMA Technologies Support. This function is only for programmer diagnosis. Using this feature may have an impact on LSAM communications performance and it will utilize much extra disk space. 
:::

6. Press <**F7**> (= STRSMALOG) to immediately start the selected logging.

    a.  Use <**F14**> to store the logging option in the LSAM Parameters, so that it will not take effect until the next time that the LSAM server jobs (or other feature) are restarted. 

7. Start the LSAM, if it is not already active in the SMA Main Menu.

## Turn Off Debug Logging

1. Log into the IBM i with a user profile that has LSAM administration privileges.
2. In the command line, enter **SMAGPL/STRSMA**. For more information on STRSMA command parameters, refer to the [STRSMA Command](../operations/lsam#the-strsma-command).
3. Enter **6** to choose the LSAM management menu in the SMA Main Menu.
4. Enter **4** to choose Manage LSAM logging in the Operator Replay Menu.
5. Type a "**4**" (= End) next to one or more logging features.

    a.  It is possible to type "**4**" next to logging functions one at a time, then press <**Enter**> to update the Pending status, until the correct logging profile is shown. Pressing <**Enter**> does not initiate any Start or End action.

6. Press <**F8**> (= ENDSMALOG) to immediately end the selected logging.

    a.  Use <**F14**> to store the logging option in the LSAM Parameters, so that it will not take effect until the next time that the LSAM server jobs (or other feature) are restarted.

    :::tip
    The LSAM does not need to be started or stopped to turn off debug logging.
    :::

## View and Retrieve the Debug Log Files

1. Log into the IBM i with a user profile that has LSAM administration privileges.
    :::tip
    The LSAM does not need to be started or stopped at this point, but the interactive job must be set to use the LSAM environment library list.
    :::
2. All log files may be viewed from one of the functions on the View LSAM logs sub-menu, explained below. The log viewer sub-menu is accessed by selection option 6 from the LSAM main menu, then option 5 from the LSAM Management sub-menu.
3. To retrieve log files, refer to Delivering Logs to SMA Support, below. This is done using the command SMASUP (with the LSAM library list in effect), or by pressing <**F15**> from log viewer screens that support this function key, as documented below.
4. To view any of the physical log files in the table below: 

    a.  To view the physical log file's raw file data:
        i.  In the command line, enter **DSPPFM** <physical file name\>*.

    b.  The formatted viewers available from the LSAM menu system (described in the next section) make the log data much easier to understand. These viewers can also be executed from a command line using the commands listed in the following table.

#### Basic LSAM Log Viewer Commands and Physical File Names
  | Type of Log |                                                                                         LSAM viewer command     |  Physical file name |
  | --------------------------------------------------------------------------------------------------- | --------------------- | ----------------------------- |
  | Job scheduling communications trace log                                                             |      LSACMNLOG                 CMNLOGF00  |
  | Job Sched comm transaction log (today's data)                                                       |  LSATXNLOG TODAY     |         CMNLOGF10  |
  | Job Sched comm transaction log (yesterday's)                                                        |    LSATXNLOG YESTERDAY  |         CMNLOGF10B |
  | LSAM transaction log                                                                                |      LSAINPLOG      |           LSALOGF40 |
  | LSAM submit job log (contains readable text)                                                        |  DSPPFM LSALOGF30   |           LSALOGF30 |
  | LSAM job status management file                                                                     |      DSPJOBSTS      |           LSAJOBF00 |
  | Job status trace log                                                                                |      DSPIDXTRC      |           JOBIDXF00 |
  | Spool file management control file                                                                  |      LSAJORCTL      |           LSAJORF20 |
  | Spool file server log                                                                               |      LSAJORLOG      |           LSAJORF30 |
  | Job log trace/storage file                                                                          |      LSADSPLOG      |           LSAJORF00 |
  | Job log index file                                                                                  |      LSADSPLOG      |           LSAJORF10 |
  | JORS communications trace log                                                                       |      JORCMNLOG      |           JORLOGF00 |
  | JORS comm. transaction log file<sub>1</sub>                                                         |      JORTXNLOG      |           JORLOGF10 | 
  | Job Tracking failed SBMJOB command log                                                              |  DSPPFM TRKLOGF00   |           TRKLOGF00 |
  | Display FTP transfer job output logs                                                                |      LSADSPFTP      |  LSAFTPLOG(multiple members) |


[1] The communications transaction log files are always used and not controlled by user options.

#### LSAM SMA File Transfer Log Viewer Commands and Physical File Names

|  Type of Log                                    |  LSAM viewer command |  Physical file name|
|  -----------------------------------------------| ---------------------| --------------------|
|  Display SMAFT Agent communications trace log   |       DSPSFALOG      |      SFTLOGF00|
|  Display SMAFT Server communications trace log  |       DSPSFSLOG      |      SFTLOGF10|
|  View SMAFT job index master file               |   DSPPFM SFTJOBF00   |      SFTJOBF00|
|  View SMAFT job details master                  |   DSPPFM SFTJOBF10   |      SFTJOBF10|

#### Other LSAM Function Log Viewer Commands and Physical File Names
|  Menu# : Function # : Type of Log                                                        |                LSAM viewer command                    |                    Physical file name |
|  ----------------------------------------------------------------------------------------| ------------------------------------------------------| ------------------------------------------------------------- |
|  1 : 2 : Job Track Logs                                                                  |                       WRKTRKJOB                       |  LSALOGF00 (activity log)TRKJOBF00 (tracked job definitions)|
|  2 : 2 : 1 : Display message management activity log                                     |                    (call trpmsgr03)                   |                           LSALOGF10|
|  2 : 2 : 2 : Display OpCon (IBM i) job-level message management log                  |                    (call trpmsgr03)                   |                           TRPMSGF20|
|  3 : 8 : Display captured data log (SCANSPLF)                                            |               CALL OPRLOGR40 PARM('S')                |                         OPRLOGF40|
|  3 : 9 : Display data capture debug log (SCANSPLF)                                       |               CALL CAPLOGR10 PARM('S')                |                         CAPLOGF10|
|  4 : 2 : Operator Replay logs (session log)                                              |                    (call oprlogr00)                   |                           OPRLOGF00|
|  4 : 2 : Operator Replay logs (trace screen formats and response strings/function keys)  |  (call oprlogr10, requires parameters from oprlogr00) |                           OPRLOGF10|
|  4 : 8 : Display captured data log (Screens: Operator Replay)                            |               CALL OPRLOGR40 PARM('C')                |                         OPRLOGF40|
|  4 : 9 : Display data capture debug log (Screens: Operator Replay)                       |               CALL CAPLOGR10 PARM('C')                |                         CAPLOGF10|
|  5 : 3 : Restricted mode - history of last use                                           |                       SAVRSTR05                       |                           SAVLOGF00|

---
sidebar_label: 'LSAM Commands, APIs'
---

# LSAM Commands, APIs

The IBM i LSAM supports many of its functions and actions with IBM i commands that may be used interactively or included in user programs. These commands become an application program interface (API) to OpCon and to the LSAM itself, enabling very tight integration between clients' applications and the OpCon strategy for synchronizing all enterprise operations. In most cases, the commands can be run either interactively or in batch mode.

:::caution
Many of the LSAM Commands may require that the IBM i job's library list be set to reference either the default or any one of multiple LSAM environments. Sometimes the requirements of a command can be set by careful configuration of the library attributes associated with a user-written command. In cases where more complex programming is implemented, consider using the SMASETLIBL command that is documented below. Note that this command has a parameter that can cause it to run in silent mode, so that no unexpected messages are generated within the user-written program.
:::

Most of the IBM i LSAM commands are listed in the table below. Many of these commands are fully explained and illustrated in the referenced sections of this document. Certain stand-alone utility commands that require a careful explanation are documented below the following table.

The term API means application program interface. This term refers to points in a software application where an interface has been prepared that allows external applications to perform or control the execution of the home applications functions. Many of the LSAM software functions have been represented by IBM i commands. These commands could be programmed into other software applications so that those other applications can be more tightly integrated with LSAM and OpCon operations. An excellent example of how that might be accomplished is explained below the Commands table, in the section about the CPYTOMSGIN command.

## IBM i LSAM Commands

### LSAM communication to OpCon
(Refer to topic below.) Most commands work only from within a job started or tracked by OpCon.

- **LFEEDBACK**: (Enhanced for use outside of OpCon jobs) Send LSAM Feedback character string to OpCon
  - Sends character string to OpCon as LSAM Feedback trigger
- **SMAJOBMSG**: Send job detail message to OpCon
  - Sends character string to OpCon adding to Detailed Job Messages in OpCon User Interface.
- **SMASTATUS**: Send job OpCon
  - Sends job status for display in OpCon User Interface UI views.
- **SMAFAILJOB**: SMA signal OpCon to Fail Job
  - This command may be used, for example, in a Multi-Step Job Script, to force an IBM i job to fail. If OpCon started the job, the Agent will then send a "Failed" signal to OpCon as the final job status, and possibly the message ID of SMA0992.

### External Event Commands
- **CPYTOMSGIN**: Copy Event to SAM-SS message input
  - Passes Event instructions to the LSAM communications program for forwarding to SAM-SS.
- **Direct Event Commands**: (…for example… JOBRLS, NTYLOG, TOKSET) Refer to the tables of Event commands under the topic of Event Management at [Event Management: XML Event Management Commands](../events-utilities/external-events.md/#xml-event-management-commands) or [Event Management: CSV Event Management Commands](../events-utilities/external-events.md/#csv-event-management-commands).
  - Each OpCon Event has been implemented by the IBM i LSAM as an IBM i command using the same name as the Event. The command processor program passes the Event instruction to the LSAM communications program for forwarding to SAM-SS.

### Debug mode, logging, log viewers
- **STRSMALOG**: Start IBM i LSAM Logging
  - Refer to Turn On Debug Logging for more information.
- **ENDSMALOG**: End IBM i LSAM Logging
  - Refer to Turn Off Debug Logging for more information.
- **DSPJOBSTS**: Display LSAM job status master file
  - A formatted viewer for examining the current status of every job that has been managed by the LSAM. (Replaces former user index object.)
- **DSPIDXTRC**: Display the user index utilization trace log file
  - A data viewer that displays and interprets trace log entries for every action used to  maintain the LSAM job status user indexes. The user indexes (viewed by SMADSPUSI) are  transitory, but this trace log file, when turned on, retains a permanent history of how the user indexes were being used.
- **JORCMNLOG**: Display JORS communications trace log
  - A data viewer that lists the entries in the JORS communications trace log file (JORLOGF00) and provides various tools for interpreting the log file contents. A detailed display is supported to format each log entry according to its LSAM transaction codes.
- **JORTXNLOG**: Display JORS communications transaction log
  - A data viewer that displays and interprets the JORS communications program transaction log file. This file is used to track transactions until they are acknowledged and turned over to LSAM transaction processing. The log file is always in use by the LSAM. The viewer also supports inspection of the Yesterday version of this log file.
- **LSACMNLOG**: Display Job Scheduler communications trace log
  - A data viewer that lists the entries in the Job Scheduler communications trace log file, CMNLOGF00, and provides various tools for interpreting the log file contents. A detailed display is supported to format each log entry according to its LSAM transaction codes.
- **LSADSPLOG**: Displ ay LSAM job log tracking
  - A data viewer that lists all the members in the LSAM job log storage file, LSAJORF00. File LSAJORF10 contains the index entries that are actually shown on the list. The utility supports an option to display the contents of each job log.
- **LSAINPLOG**: Display Job Scheduler input transaction log
  - A data viewer that displays and interprets all the formatted transactions passed from the Job Scheduler communications program to the LSAM transaction manager.
- **LSAJORCTL**: Display spool file management control file
  - A data viewer that displays the spool file control values sent from OpCon.
- **LSAJORLOG**: Display job output retrieval activity log
  - A data viewer that displays a trace of the actions taken by the LSAM spool file server program. When turned on this log file can be helpful to prove how the LSAM managed job logs and job reports (spool files), according to the OpCon User Interface job master records for IBM i jobs.
- **LSATXNLOG**: Display Job Scheduler communications transaction log
  - A data viewer that displays and interprets the Job Scheduler communications program transaction log file. This file is used to track transactions until they are acknowledged and turned over to LSAM transaction processing. The log file is always in use by the LSAM. The viewer also supports inspection of the Yesterday version of this log file.
- **SMADSPUSP**: Display SMA User Space
  - A support utility command to view the content of the LSACONU01 user space where the User Name and Password for OpCon external event commands is stored. This encrypted content may be viewed only with security officer authority.
- **SMASUP**: Extract debug log files to IBM i save file for delivery to SMA Technologies Support.
  - This command performs the same function as F15=Extract log files. Refer to Viewing the LSAM Log Files. Also refer to SMARGZ, below.
- **DSPSUPDTA**: Display Agent Support Data
  - This command displays the profile of the Agent that is shared with the OpCon server and included in SMASUP log file extracts. The SMASUP command must be run once before the data is available to display, and SMASUP is used to refresh the data to current levels.

### LSAM Operations
- **LSAMENU**: Enter LSAM menu system
  - Direct entry to the IBM i LSAM menus, bypassing the splash display and hiddenenvironment configuration steps.
- **STRSMA**: Logs on to the IBM i LSAM menus. 
  - Logs on to the IBM i LSAM menus. Required for first entry to menus.
- **LSAMENU**: Enter LSAM menu system
  - Direct entry to the IBM i LSAM menus, bypassing the splash display and hidden environment configuration steps.
- **STRCAPJOB**: Start Capture Job mode
  - Registers a workstation or a batch job name so that any SBMJOB command is intercepted, not run, but all job details are captured and stored in the LSAM database. The Job Tracking facility must be started for this to work. The LSAM menu function that supports this command provides a view of currently registered job names.
- **ENDCAPJOB**: End Capture Job mode
  - Un-registers a workstation or a batch job so that the SBMJOB is no longer intercepted to capture jobs.
- **STRSMA**: "Start SMA" = Enter LSAM menu system
  - Logs on to the IBM i LSAM menus.
- **WRKCAPJOB**: Work with Captured jobs
  - Requires the LSAM library list. Shows a list of all captured job IDs and supports changes to job definitions.
- **WRKSMASVR**: Work with SMA (LSAM) Server Jobs
  - This command may be used from outside of the LSAM menu system. It displays a list of LSAM server jobs and supports starting and stopping individual jobs from the display. The job "Groups" in the list display match the PTF server job categories for stopping/restarting jobs.
- **WRKTRKJOB**: Work with tracked jobs
  - This command may be used from outside of the LSAM menu system. It automatically detects the LSAM environment that is in control of Job Tracking. The display produced by this command is the same as from LSAM Menu 1, function 2. Refer to Job Tracking and Queuing.

### Multiple Environment Management
- **LSAINIT**: Initialize LSAM environment. (Replaces LSASETENV command used in LSAM versions 3.xx.)
  - This command is used to configure the IBM i objects, like the LSAM subsystem description, that must be changed as an alternate LSAM environment is made ready for operations.
  - It can also be used to repair the configuration of an upgraded LSAM environment, in case version upgrade programs should create a problem with the LSAM subsystem description.
  -  Also refer to the topic of Managing Multiple Environments in Installing Multiple EnvironmentsInstalling Multiple Environments.
- **SMASETUP**: Install the LSAM software and create an environment.
  - Refer to the IBM i LSAM installation instructions. Also refer to the topic of Managing Multiple Environments in Installing Multiple Environments and LSAM Environment Management. This command is not available and is not used outside of an installation from media.
- **SMASETLIBL**: Set SMA Library List
  - Replaces the interactive job's library list.
- **SMAADDLIBL**: Add LSAM library list to existing job library list.
  - Adds the library names from the specified LSAM environment to the library list of the current job. The position of the new libraries in the list may be controlled by the command's POSITION keyword.
- **SMARMVLIBL**: Remove LSAM library list from existing job library list.
  - Removes the library names of the specified LSAM environment from the current job's library list.
- **SMALIBMGT**: SMA Library Management
  - Establishes new environments and creates library lists that are used by each environment.
- **SMALIBINQ**: SMA Library Inquiry
  - Queries LSAM environments and their library lists, but does not permit any changes.
  - This command also represents the environment selection function that can be used as a first step for either the STRSMA or SMASETLIBL command.

### OpCon Schedule Support
- **CHKDTAARA**: Check Data Area
  - May be used by OpCon as a prerun check that a data area must exist before a job is started.
- **CHKIFSFIL**: Check for the file in the IFS (non-DB2) file systems
  - A simple form of this command could be used as a pre-run job for an IBM i job master record in OpCon. However, the preferred use is in the Call command line, utilizing additional command parameters to define a File Arrival or File Watcher job. This command now supports the OpCon User Interface "File Arrival" job sub-type for IBM i jobs, when the file name begins with a forward slash '/' denoting an IFS disk location outside of DB2.
- **CHKFILE**: Check for file in the DB2 database
  - A simple form of this command could be used as a pre-run job for an IBM i job master record in OpCon. However, the preferred use is in the Call command line, utilizing additional command parameters to define a File Arrival or File Watcher job. This command now supports the OpCon User Interface "File Arrival" job sub-type for IBM i jobs, when the file name begins with a DB2 Library name (which must begin with an alpha character, and the forward slash '/' is not used, denoting a disk location inside of DB2).
:::tip 
The IBM i command CHKOBJ may also be used, especially for object types other than files.
:::
- **SBMDBFCMD**: Submit command from database file 
  - May be used by OpCon as the Call command in order to tell the IBM i LSAM that the actual, very long call command string may be obtained from a database file in the DB2/400 database.  
- **RUNCAPJOB**: Run Captured Job
  - Submit the job defined by the named Captured Job ID. Refer to the topic on Job Tracking and Queuing for more information about captured jobs.
- **STROPRRPY**: Start Operator Replay
  - The command to use with an OpCon job description, specifying the Operator Replay Script by name as the parameter for this command.

### LSAM Utility
- **CHKIBMLSAM ENV(environment) STATUS (*ACTIVE/*INACTIVE)**: Check IBM i LSAM server job status
  - This command is designed to be used primarily from an OpCon job to report the current status of the LSAM server jobs. It will force a program failure when the server jobs do not match the STATUS keyword value.
- **CMDEXE, CMDEXE2**: SMA wrapper to manage IBM i command errors
  - These commands are used to execute IBM i native commands inside a "wrapper" CL program that intercepts any command failure message and makes it possible for the Agent and/or OpCon to control the OpCon job status and to respond appropriately to different error messages.
- **DLTIFSFIL**: Delete IFS File
  - Enables a solution for automating disk space maintenance by deleting files in a specified IFS file system directory (usually outside of the DB2 database).  This utility will typically be used in the IFS root(/) file system, but it also supports the /QOpenSys file system and possibly other non-DB2 file systems.  (It will not work for the /QDLS file system.)                                         
- **DSPDTAQ**: Display Data Queue
  - A data queue viewer not supplied by IBM with IBM i. Used by support technicians to verify LSAM system conditions.
- **DSPDYNVAR**: Display Dynamic Variable
  - Returns a completion message that shows the current value of the Dynamic Variable, or reports an error if not found.
- **LOGDYNVAR**: Log Dynamic Variable History
  - Use this command to store Dynamic Variable values, and/or other userdefined values, into a history log where values are marked with a time stamp and identified by multiple category codes and a description. Later, queries can be used to study trends of the values over time.
- **DSPOBJWU**: Display object where used
  - This command requires that the LSAM environment library list be in effect. It can be executed from within the LSAM menu system, or from command entry after the command SMASETLIBL has been used to set the interactive job's library list. Refer to LSAM Security and Object Authority for instructions how to use this command.
- **LSAMCMD**: Execute LSAM software commands from outside the LSAM environment
  - Refer to the discussion below explaining how to use this command.
- **REFFLOW**: Program reference flow chart
  - This command requires that the LSAM environment library list be in effect. It can be executed from within the LSAM menu system, or from command entry after the command SMASETLIBL has been used to set the interactive job's library list. Refer to LSAM Security and Object Authority for instructions how to use this command.
- **SETHEXDV**: Set hexadecimal value in a Dynamic Variable
  - This command makes it possible to store a non-display value into a Dynamic Variable, so that special values such as Carriage Return and Line Feed formatting characters can be represented by a {token} within text parameters of OpCon External Event commands, such as $NOTIFY:EMAIL.
- **SMAMMPSTS**: SMA Update Message Management Parameter Record Status
  - This command may be used, for example in a Captured Data Response Rule, to change the Status of a Parameter master record, either to Active or to Inactive.
  - This technique is often used when a Message Management Parameter cannot distinguish between a first and second instance of a message that appears twice, so that the first instance of the message is handled by the Parameter record, but then the Parameter record is set inactive before Message Management attempts to process the second instance of an apparently identical message.
  - Use of this utility command requires an understanding of the software application that issues the messages.
  - Remember to include Response Rule logic (or other OpCon/Agent automation logic) that will reset the Parameter record back to an Active state, after it is safe to do so.
- **STAT**: Show file status
  - A convenience utility that shows many attributes, including the character set (CCSID) of files in either the UDB DB2 database or the IFS (integrated file system). The syntax of the file path specified indicates which data storage type will be searched. LIBRARY/FILE is the format for UDB DB2 files.
- **UNINSTQGPL**: Uninstall SMA utilities from QGPL
  - Used to remove all IBM i LSAM program and file objects from the QGPL library if the LSAM software will be uninstalled. Utilities in QGPL are used for LSAM environment management.
- **WAITDYNVAR**: Wait for Dynamic Variable values (1 or 2) (Refer to instructions and example application in the Dynamic Variables section of this Agent User Help.)
  - Used by Captured Data Response Rules to pause or synchronize commands with Message Management, or other processes.

### LSAM Menu Function APIs (Application Program Interfaces)
- **EDTSMAPRM**: Edit LSAM Control Parameters
  - Same as Main Menu function # 7.
- **ENDJOBTRK**: End Job Tracking
  - Same as Job Tracking Menu function # 4.
- **ENDLOGCMD**: End LSAM server logging, end debug mode
  - Executed in prompted mode from the LSAM Management Menu, function #4, <**F8**> (ENDSMALOG).
- **ENDMSGMNG**: End Message Management (end message trapping)
  - Same as Message Management Menu function # 4.
- **ENDSMALOG**: End LSAM logging, debug mode
  - Executed by the LSAM Management Menu, function # 4, <**F8**> (ENDSMALOG).
- **ENDSMASYS**: End LSAM server programs
  - Same as LSAM Management Menu function # 2, but supports an optional KEEPSBS parameter used by the SMARGZ command.
- **JOBTRKSTS**: Show Job Tracking Status
  - Shows the Job Tracking status window, as in Job Tracking Menu function #5.
- **SBMJOB, SBMJOB2, SMASBMJOB**: LSAM copies of the IBM i SBMJOB command, with alternate uses.  Warning: Do not use these commands. It is difficult to control what happens to submitted jobs when Job Tracking is turned on.
  - Used for Job Tracking, in conjunction with the Exit Program numbers shown in the LSAM Environment Management function <**F9**> (Exit Pgm#). These specially prepared versions of the SBMJOB command create special system entries that help control job tracking.
- **STRJOBTRK**: Start Job Tracking
  - Same as Job Tracking Menu function #3.
- **STRLOGCMD**: Start LSAM server logging, start debug mode
  - Executed in prompted mode from the LSAM Management Menu, function # 4, <**F7**> (STRSMALOG).
- **STRMSGMNG**: Start Message Management (start message trapping)
  - Same as Message Management Menu function # 3.
- **STRSMALOG**: Start LSAM logging, debug mode
  - Executed by the LSAM Management Menu, function # 4, <**F7**> (STRSMALOG).
- **STRSMAMNU**: **NO LONGER USED.** This command shows an informational display, only.
  - This command was used to start entry into the LSAM master menu. It has been replaced by command STRSMA.
- **TRPMSGSTS**: Show Message Manager job status
  - Shows the status of the Message Manager function in a window, as in Message Management Menu  function # 5.

### Restricted Mode Operational Control
- **STRSAVRST Parameter(s)**: SCRIPT(<script_name>): Start Save/Restore (Start Restricted Mode Operation)
  - Used by OpCon to run a program that signals the operator console Restricted Mode program to begin processing the Script named in a parameter of this command.
- **ENDSAVRST**: End Save/Restore (End Restricted Mode Process)
  - Available for use with OpCon, might be submitted as a command to IBM i in case exceptional conditions require that the operator console end its mode of waiting for the STRSAVRST command to arrive.

### Multi-Step Job scripting
- **STRMLTJOB**: Start Multi-Step Job Script 
  - Used in an OpCon IBM i batch job, or can be executed from any IBM i commandline or program. Refer to Restricted Mode and Multi-Step Jobs.

### Translation Table Testing
- **LSATBLTEST**: LSAM Translation Table Testing utility
  - From within the LSAM environment, starts a utility display that may be used to test the results of using any translation table. Refer to the section on LSAM Utilities for more information about translation tables.
- **TESTLSATBL**: Test LSAM Translation Table (OpCon job command)
  - An LSAM software command that routes test ASCII data from an OpCon job directly to the LSATBLTEST utility display. Refer to the section on LSAM Utilities for more information about translation tables.

### Manage LSAM Variables/Tokens
- **ADDMSGTHR**: Add to count of message threshold
  - Add the specified number to an existing Message Management threshold count.
- **ADDRPYTOK**: Add/set Operator Replay variable.
  - Adds or sets one or more of the LSAM Operator Replay variables.
- **SETCAPTOK**: Set Operator Replay variable from Captured Data
  - Use the identified captured data value to set or create the new value of an Operator Replay variable.
- **SETCAPVAR**: Set Dynamic Variable from Captured Data
  - Use the identified captured data value to set or create the new value of a Dynamic Variable.
- **SETDYNVAR**: Add/Set Dynamic Variable
  - Adds or changes a Dynamic Variable definition. (Refer to the description below.)
- **SETMSGTHR**: Set (reset) Message Management Threshold
  - Changes the value of a Dynamic Variable used as a Message threshold counter.

### LSAM database management
- **SMARGZ**: Reorganize LSAM database
  - Utilizes SMASUP command and additional instructions to backup and completely manage the size of the LSAM database library. Refer to the discussion below; also refer to SMASUP command in this topic and the topics on (a) Debug Mode and (b) Events and Utilities Menu.

### Automated database maintenance
A Series of stand-alone commands can be used to automate maintenance of certain IBM i LSAM master files. For detailed information about the parameters of each command, refer to the "Screens and Windows" sections of each of the Agent features.
                                                                    
These commands could be executed by OpCon jobs configured as IBM i Batch command jobs, as long as the User assigned to the job has authority to use the LSAM programs and to update the LSAM master files in the SMADTA library.                                        
                                                                    
The commands could also be executed by Step records of an IBM i LSAM Multi-Step Script job or by Response Rules connected to Data Capture Rules that are linked to the SCANSPLF command, to Operator Replay script jobs or to LSAM Message Management Parameters.

- **MLTJOBSTS**: Change the Active/Inactive status of a Multi-Step Job Script Step record.
                                                                      
- **ADDMLTJOBS, CHGMLTJOBS, DLTMLTJOBS**: Add, change or delete Script master records (and all associated Script Steps) from the Multi-Step Job master files.
                                                                      
- **ADDMLTJOBT, CHGMLTJOBT, DLTMTJOBT**: Add, change or delete Script Step master records from the Multi-Step Job Script Step master file.
                                                                      
- **ADDTRKPAR, CHGTRKPAR, DLTTRKPAR**: Add, change or delete the LSAM Job Tracking Parameter records.  Please remember that changes to the LSAM Job Tracking Parameter records may also require changes to pre-registered Job Master records in the OpCon server's database, depending on which fields are updated by the CHGTRKPAR command.                    

### Manage LSAM PTFs (software patches) 
(Refer to PTF and Security Menu for additional information.)
- **SMAPTFINS**: Master PTF installation
  - Starts an all-in-one procedure to obtain the latest PTF information, load it to the LSAM environment and then apply the cumulative collection of any PTFs not already installed.
- **SMAPTFREQ**: Request PTF information
  - Contact an SMA Technologies source point to obtain the latest LSAM PTF information.
- **SMAPTFLOD**: Load PTF information to LSAM control files
  - Reads the PTF control information obtained by SMAPTFREQ and loads the information into the LSAM control files.
- **SMAPTFAPY**: Apply a single PTF
  - After PTF control information is loaded, an individual PTF may be selected for application by this command.
- **SMAPTFCUM**: Apply cumulative PTFs
  - After PTF control information is loaded, this procedure will apply all missing PTFs to the LSAM environment.
- **SMAPTFRBK**: Rollback a PTF
  - Unapplies a PTF and restores the previous level of software.
- **SMAPTFRAP**: Re-apply a PTF
  - Used when a PTF was previously rolled back, to re-apply the PTF. This approach avoids  replacing the original backup of back-level software.
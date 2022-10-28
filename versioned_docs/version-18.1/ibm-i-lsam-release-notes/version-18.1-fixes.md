---
sidebar_label: 'Version 18.1 Fixes'
---

# Version 18.1 Fixes

This topic shows a combined list of the LSAM fixes and enhancements that have been added to the OpCon Agent for IBM i since LSAM version 18.1 was released.  The enhancements listed here are the ones that were added to the LSAM version after it was published.  They are included with the fixes to help evaluate the status of an installed LSAM.

## IBM i LSAM 18.1 PTFs

The PTF Level is the value that clients and SMA Support will use to confirm the software level of each LSAM installation.  View the PTF List display from LSAM menu 9, option 1, to identify the PTF Level of each PTF.  It may or may not be the same as the last three digits of the PTF Names shown in the following list.

### LSAM DB LVL # 001

- **Enhanced**: (# 181001 - 181022) These PTFs are included in the LSAM 18.1 installation save file named LI181022.  They were used during the LSAM development cycle to support internal testing and external beta sites.

- Fixed: (# 181023) The IBM i LSAM menu function “Display Data Capture Debug Log’ which appears on three LSAM sub-menus was sometimes showing an incorrect Capture Rule Sequence Number for the Details display of log entries applying to one of the master records that define an Application ID.

- Fixed: (# 181024) The IBM i LSAM daily database maintenance job LSAMNG was failing to perform a log files save operation due to the failure of program DLTLOGR06 to commit its database updates.  That program is replaced, now using compile option COMMIT(*NONE).

### LSAM DB LVL # 002

:::note
A change in the database level implies that two different LSAM environments must be patched to the same DB LVL in order to exchange data.  The specific PTF Level is not checked, only the DB LVL.
::: 

- Fixed: (# 181025) The IBM i LSAM Captured Data Response Rules were not being managed separately according to the type of captured data (message data, Operator Replay screen data, SCANSPLF report data).  Whenever the same Capture Application ID name was used for two different captured data types, the Response Rules from both Capture Application IDs were being processed for both applications.  This PTF updates several LSAM programs, including master file maintenance, run-time Response Rule execution and log displays, to always separate Response Rule data according to its Capture Data Type code.

- Fixed: (# 181026) After PTF # 181025, the IBM i LSAM Captured Data Response Rules were not being discovered and exported for the SCANSPLF applications.  Without any Response Rules, the Dynamic Variables referenced in those Response Rules were also not exporting.

- **Enhanced**: (# 181027) The IBM i LSAM environment audit/fix utility program, LSASETENVC, is enhanced with an extra step that checks for the job queue named SMALSAQ00 which is used to start the LSAM server jobs.  Although this job queue is normally saved and restored by IBM commands, so that the original object distribution from SMA is preserved, in case this object is lost accidentally, the Agent install/upgrade command SMASETUP, or the LSAM Environment audit command LSAINIT, will each restore the job queue if it is missing.

- Fixed: (#181028) The IBM i LSAM SMA File Transfer programs are fixed to prevent adding extra null characters intermittently within a stream file that is being sent from the IFS root and similar non-DB2 file systems.

- **Enhanced**: (# 181029, 181030) The IBM i LSAM SCANSPLF and SCANOUTQ utilities are updated with a new search/filter field that refers to values of the User-Defined Data field (255 characters long) among the spool file attributes. At the same time, the LSAM menu system program for maintaining Scan Rules has been revised with an optional 2-page display format that should make it easier to view and understand the array of Scan Rule options. The default view (1-page or 2-page) can be set using the LSAM sub-menu 3: Utilities, option 7:  Configuration.  

- Fixed: (# 181031) The IBM i LSAM SCANSPLF utility was producing a large formatted program dump report whenever the LSAM utility command SMAFAILJOB was intentionally executed by a Response Rule.  The unnecessary dump report was so big that most client sites had to respond to an error message in QSYSOPR about the QPPGMDMP spool file exceeding its maximum allowed size. The main SCANSPLFR program is now updated to properly set the internal controls that will prevent a program dump report from being produced when an intentional, programmed forced failure is being executed. (The SCANSPLF command uses a forced RPG program failure as the way to signal the OpCon server, or signal a non-OpCon job, that the predefined Application description has detected conditions that qualify for an intentional failure.)

- Fixed: (# 181032) The IBM i LSAM SMA File Transfer programs fix # 181028 is extended to prevent rare errors when reading a disk file for transmission from the IFS root and similar (non-DB2) file systems.

- Fixed/**Enhanced**: (# 181033) 
	- FIXES:  
		- Message Management Capture rules would cause a failure if the “Length of data string” size combined with the Start Position was greater than the maximum program work field size of 1920; 
		- The Operator Replay screen image log viewer was not maintaining its subfile display position after using function keys F19/F20 to shift the displayed image Left/Right; 
		- the Dynamic Variable {TOKEN} replacement module would get stuck in a loop if an unregistered variable name was inserted in a nested {TOKEN}.
	- **ENHANCEMENTS**:  The IBM i LSAM Dynamic Variables will now allow nested Dynamic Variable {TOKENS} in the VALUE field of a numeric variable. The Work with Dynamic Variables function now supports function key F8=DynVar in the Add/Change/Copy maintenance display, making it easier to select and insert a correctly spelled variable token name.

- Fixed/**Enhanced**: (# 181034, 181035) 
	- FIXES:  The IBM i LSAM SCANSPLF command is fixed to properly locate the *LAST spool file produced by a job.  Previously, if a job created multiple spool files of different names, using *LAST would be confused with the very last spool file produced by the job, even if the spool  file name did not match.  Now only the last spool file with a matching name will be selected for processing. 
	- **ENHANCMENTS**:  The SCANSPLF command can now send both progress information messages and error messages to the IBM i job log, in addition to sending them to the optional LSAM application log file.  This option is active by default, but it can be controlled by the new JOBLOGMSG parameter that has been added to the SCANSPLF command. 

	The LSAM server job LSAJOR executes the SCANSPLF command when it is requested by an extended Call command line in an OpCon IBM i batch job.  To prevent excessive jog logging of the never-ending LSAM server job LSAJOR, there is now a control option added to LSAM sub-menu 3, option 7, where the job log messages from the SCANSPLF can be turned off.  Even so, if a Call command line extension SCANSPLF command includes the JOBLOGMSG(Y) or JOBLOGMSG(1) parameter, this will override the LSAM general control option, but just for this one execution of the command.

- Fixed/**Enhanced**: (# 181036)
	- FIXES:  The IBM i LSAM Dynamic Variables were not always preserving leading or trailing spaces when replacing a {TOKEN}.  Now, leading or trailing spaces are more strictly enforced, according to the rules in F1=Help (for Work with Dynamic Variables) and the Administration guide.   
	- **ENHANCMENTS**:  As a result of the FIX, it is now possible to insert 1 or more spaces into a string wherever a {TOKEN} is replaced, using a Dynamic Variable that has a blank value, or one that results in all blanks after nested {TOKENS} are replaced.  For example, a token named {BLANK4} could use the Character Trim Start (1) and Length (4) to enforce insertion of four space characters.

	Thus, it is also now possible to compare a captured value or another Dynamic Variable to a Reference Dynamic Variable that contains all blanks. Numeric Dynamic Variables will now return a zero (subjected to any numeric editing rules) whenever the current value of a numeric Dynamic Variable is all blanks.

- Fixed: (# 181037) The IBM i LSAM Job Track Log Detail display format function keys were failing because they were using the wrong User ID.  For Queued Jobs, the actual job user can be overridden by OpCon, so the original SBMJOB user might be replaced.  The correction now shows both User values on the display, but it uses only the final User ID for the WRKJOB and RLSJOB function keys.

- Fixed: (# 181038) The IBM i LSAM job scheduling management would leave an OpCon job stuck in “still waiting” status in high volume IBM i partitions.  This symptom appears in partitions that process more than 1,000,000 jobs in fewer than the number of days set in the LSAM daily log purge controls (in the LSAM Parameters).  The underlying cause was that the IBM i Job Number would repeat after every 999,999 jobs.  The Agent was previously finding an older OpCon job ID instead of the most current OpCon job ID.  This LSAM PTF is a temporary fix for most of the problems related to duplicate IBM job IDs.  A permanent, pervasive enhancement is already in production at SMA, but it is not immediately available.  Meanwhile, this temporary PTF # 181038 should prevent the reported problem of jobs getting stuck in “still waiting” status.  Clients who believe they have experienced other, related problems with duplicate job IDs are requested to report these symptoms to SMA Support.

- Fixed/**Enhanced**: (# 181039) 
	- FIXES:  The IBM i LSAM Operator Replay function is improved with a few very small and uncommon fixes, such as adding field data that was missing from a display or a report.   
	- **ENHANCMENTS**:  A new $-special system-defined variable is supported by the IBM i LSAM in Response Rules associated with green screen Capture Data rules (that are connected to Operator Replay Script Steps).  The variable $SCRIPT USER returns the IBM i User Profile name that was used to login to the green screen workstation, and so it is also the virtual workstation interactive job User name.  The PTF Post-Install instructions provide some additional background information and hints about User names associated with Operator Replay jobs.

- Fixed: (# 181040) The IBM i LSAM server job name JORCMN could fail during the daily maintenance hour if the daily backup file has no unprocessed control records to carry forward to the next day. A CPYF command could fail on error CPF2817. This non-critical error is now prevented with a simple MONMSG command added to the sub-program JORLOGMNTC.

- Fixed: (# 181041) The IBM i LSAM Dynamic Variables get three bugs fixed:  
	- \*DATE formatting options not displayed after update to \*ISO options; 
	- Option 5=Display might report error messages as if in Change mode; 
	- reformatting of some *DATE pairs was not working for 1-digit month.

- Fixed: (# 181042) The IBM i LSAM Dynamic Variables were producing an incorrect conversion from \*MDY to \*ISO if the MDY data value had a leading space instead of a zero for the month value. IBM date manipulation APIs always require two digits for any two-digit part of a date or time, so the LSAM Dynamic Variables *DATE functions are now updated to edit and fill those date or time component fields, eliminating errors on human-readable date or time values.

- Fixed: (# 181043) The IBM i LSAM Dynamic Variables and Message Management get three fixes: 
	- Correct Message data capture with negative offset; 
	- Correct cursor position in list of Message Management Parameters; 
	- Prevent a false error when copying a Dynamic Variable and the copy includes the original variable token.

- Fixed: (# 181044) The IBM i LSAM Captured Data Response Rules engine was providing an incorrect value for the $IBM JOB ID variables (including the whole ID and the individual parts:  NAME, USER and NUMBER).

- **Enhanced**: (# 181045) The IBM i LSAM Operator Replay feature is enhanced with an option to support TLS Security when accessing the IBM i Telnet Server, implementing a secure connection between the Operator Replay Script driver and the virtual workstation.  

- Fixed: (# 181046) The IBM i LSAM SMA File Transfer server program SMAFTSR01 would sometimes fail with error code RNQ0103 due to incorrect management of the buffers of data being prepared for transmission.

- **Enhanced**: (# 181047) The IBM i LSAM File Arrival job commands (CHKFILE and CHKIFSFIL) have been enhanced with improved library list management.  Use the ENV( ) and GPL( ) parameters to specify the LSAM environment whenever these commands are used from outside of the LSAM environment; the commands themselves must be qualified with their library location: SMAPGM/.  The CHKIFSFIL command programs will now use a permanent DB2 work library instead of QTEMP to receive the file list and error report from the IFS file search sub-program.  The work library will be deleted at the successful end of the command or if a command parameter says to end normally in spite of errors.  When the command may otherwise report a failure (file not found, etc.), the work library will be retained.  Work libraries will be purged periodically by the LSAM daily file maintenance server job.

- Fixed: (# 181048) The IBM i LSAM SMA Job Scheduler server program was corrected to properly support an optional USRNAME( ) parameter that may be added to the Script command line in an OpCon IBM i Operator Replay job master record.  The Multi-Step Job Script Step maintenance screen was corrected to show an underline at the Step Status input field, matching the rest of the display and making this important flag more visible.

- Fixed: (# 181049) The IBM i LSAM File Arrival job command for IFS file searches has its search sub-program changed to force output to STDOUT when a QSHELL environment would otherwise default to NONE (no output).

- Fixed: (# 181050) The IBM i LSAM SCANOUTQ command was sometimes failing to send correct parameters to the SCANSPLF command, causing qualified spool files to be skipped.  Also, the Captured Data Log File display for SCANSPLF activity is updated to prevent incorrect spool file profile data from being reported.

- **Enhanced**: (#181051) The IBM i LSAM File Arrival job command for IFS file searches has its search sub-program changed to remove the LEVEL(\*JOB) environment variables that it uses during a file search, in order to avoid leaving behind a conflict with any similar LEVEL(\*SYS) environment variable.

- Fixed: (# 181052) Cosmetic changes are made to correctly display field prompts in the IBM i LSAM Date Export/Import process prompting screen formats.  The Operator Replay Script ADD function now inserts a default value of “\*JOB” in the User name field, which is the recommended new standard for improved flexibility when sub-scripts are used.

- **Enhanced**: (# 181053) The IBM i LSAM TLS Security configuration functions for Job Scheduling (and JORS) and the SMA File Transfer functions is changed so that the LSAM no longer stores or forces certification validation option settings into the IBM Digital Certificate Manager database.  The screen formats now show summary advice that the IBM DCM must be used to manage those options.  This improves system security strategies.

- **Enhanced**: (# 181054, 181055) The IBM i LSAM Dynamic Variables that use the \*SYSVAL Function Code must now store a valid IBM i System Value Name in the Function Code Field 2 (which is alternately used for a user-defined Value Calculator program library name).  The LSAM still supports the former standard that forced the Token Name to be a System Value name, but any Change action will enforce the new rule.  This change makes system value retrieval more flexible, allowing for different formatting rules for the same system value. 

- **Enhanced**: (# 181056) The IBM i LSAM communication log file now masks the password of the External Event command user profile. Also, the LSAM pending transactions log (file CMNLOGF10) will mask the External Event command user password immediately after the transaction is confirmed sent, as the transaction is being updated with its “sent” code.  This file should be kept secure, as when it is originally installed, to prevent unauthorized users from possibly viewing a clear text password in the rare case that a transaction transmission is interrupted by a failure of the LSAM communications program.

- Fixed: (# 181057) The IBM i LSAM data translation testing command LSATBLTEST would cause the LSAM Job Scheduler communications program (CMNSKTR00) to fail with error CPF2498 whenever the test data translated to all blanks.  SMA recommends enclosing test data between simple characters such as the digits 0 – 9.  The fixed LSAM Job Scheduler will now send Detail Job Messages whenever the test data might have caused a failure, along with a failed job status.

- Fixed: (# 181058) The IBM i LSAM data translation testing command LSATBLTEST was not supported for certain single character translation tests, in case the ASCII source character might translate to an EBCDIC space character.  This fix changes the calculation of the length of the test data to rely entirely on the size between the two test data enclosure characters.

- Fixed: (# 181059) This PTF includes fixes for the SMASETUP command used to install or upgrade the IBM i LSAM agent at/to version 18.1.  Some of the utility commands can also be used after the agent is installed, so these changes are now added to the LSAM programs library. Most of the fixes pertain to clients who are still using the IBM i QGPL library to hold some LSAM convenience commands and the LSAM environment definition files.

- Fixed: (# 181060) This PTF makes changes to LSAM program objects located in the SMAGPL library.  The LSAM menu entry splash display has been updated to show the LSAM Environment Description text.  There is also a redistribution of program SMADTAARAC that is part of the LSAINIT command used to initialize most settings in a non-default LSAM Environment.  Some limited sites did not receive this program update during the beta site testing cycle of LSAM version 18.1.

- Fixed: (# 181061) This PTF corrects logic in the LSAM PTF installation program for updating the LSAM PTF Level data area when the QGPL library is being used to hold some of the LSAM convenience utilities.

- **Enhanced**: (# 181062) The IBM i LSAM Multi-Step Job Script log display from option 6 on LSAM sub-menu 5 now uses a standard LSAM list and filter display program, replacing the simple IBM i DSPPFM command.  See the Post-Install instructions for a summary of the new list options and function keys that help navigate the log entries.  This log display shows only the Script Step execution entries which are also included in the IBM i job log of each Script execution, but the LSAM’s own log of the Script execution steps may survive longer than individual IBM i job log reports. 

- **Enhanced**: (# 181063) The IBM i LSAM Management sub-menu 6, option 5=Log viewers, Log viewer 4 has been updated with a new log file display program that is much easier to read and navigate.  Please read the Post-install Instructions for hints about ways to use the new features.

- Fixed: (# 181064) The IBM i LSAM Message Management Parameters maintenance program would issue error MCH1202 (decimal data error) while in F6=Add mode when F13 was pressed.

- Fixed: (# 181065) The IBM i LSAM Message Management maintenance program was failing to show error or status messages from the initial list display.

- **Enhanced**: (# 181066, 181067) The IBM i LSAM SCANSPLF command is enhanced with a new parameter SCANCOND (Scan Condition) that is used to control the way the LSAM Job Completion Status server program uses the SCANSPLF command to override the final job status reported to OpCon.  This new parameter adds the option to override Failed jobs, whereas previously the SCANSPLF command appended to the Call command line of an OpCon IBM i Batch Job could only be used if the primary Call command completed normally.  This enhancement will sometimes be more effective or flexible than using the CMDEXE2 wrapper command to bypass low-level errors and allow a job to be reported as completed normally.

- Fixed: (# 181068) The IBM i LSAM Submitted Job Log viewer program added by PTF # 181063 was failing when F18=Bottom was pressed from the initial list display.  The PageUp key was also sometimes not working.

- **Enhanced**: (# 181069) The IBM i LSAM Multi-Step Job Script driver feature has been enhanced.  The Script driver program has been improved to behave more exactly like the existing documentation with regard to the use of the ON-ERROR and ON-RESTART special labels.  It also now accepts either an underscore character (ON_ERROR) or a dash (ON-ERROR) for both the ERROR and RESTART special labels, as documented.  It is now possible to execute the SMAGOTO pseudo command directly from either an ON-ERROR or an ON-RESTART labelled command line (whereas before, it was necessary to use a sub-script via STRMLTJOB or SMASUBR to utilize the SMAGOTO command).  The Script driver now performs more pervasive loop prevention logic. The loop prevention helps to avoid step looping that could occur when the SMAGOTO command is used in an ON-ERROR step that points back to the original failing step. To support this logic, the maximum allowed loops can be updated using a new menu option in LSAM sub-menu 5, where menu option 7 now supports Script Utility Configuration, and the former option 7 now becomes option 9: Maintain Dynamic Variables.

- Fixed: (# 181070, 181071) The IBM i LSAM installation libraries had two errors in controlling the location of certain LSAM internal utility programs.  These PTFs update the LSAM Object Authority (and Location) control file, and they correct the location of the programs.

- Fixed: (# 181072) The IBM i LSAM PTF install programs could fail if an LSAM PTF was rolled back, and then later, as that PTF was re-applied, any other new LSAM PTFs are also ready for application.  The PTF install program tried to use the Re-Apply program logic for the new PTFs, and that would fail.  The failure occurs before any new PTF is applied, so the recovery is simply to restart the LSAM PTF install process.  However, this will not normally occur at any live client site, except for an SMA partner participating in an LSAM Beta site test.  Otherwise, this error occurs only within the SMA Development and Testing departments when PTFs are often rolled back and reapplied.

>> **RECOVERY NOTE**:  For any LSAM environments where this error has occurred, SMA recommends downloading the latest LSAM PTFs, including the most current version of the LSCTLDTA save file, and also the special LSAM Partial PTF save file named LSCUMPT.072.  When starting the LSAM PTF process, be sure to press the Enter key a second time and update the name of the partial PTF save file to “LSCUMPTF.072”.  This will apply only the one PTF.  It may be applied out of sequence.  After that, the LSAM will behave normally during a multi-PTF installation process, including Re-Applying followed by any new LSAM PTFs.  Thus, after the single PTF has been applied, a normal cumulative PTF install process may be used to catch up to the latest PTF levels.

- Fixed: (# 181073) The IBM i LSAM utility for auditing and rectifying a cloned LSAM environment, command LSAINIT, has its command driver program and display format updated to correctly manage the SMA File Transfer port number.  Also, the values prompting screen now supports a separate field for the SMA File Transfer IP address.

- Fixed: (# 181074) The IBM i LSAM communication programs for SMA File Transfer have their log entries revised to more accurately report the IP address being used whenever there are internal VLAN IP addresses engaged within a virtual IBM i partition.  This fix does not affect logging for most clients who are using IP addresses that are accessible from outside of physical IBM i partitions.

- Fixed: (# 181075) The IBM i LSAM new log viewer program for the LSAM Submitted Job Log (sub-menu 6, option 5, log viewer 4) needed fixes for the Content Search function to find all matches and to avoid a potential program failure.

- Fixed: (# 181076) The IBM i LSAM data import display of a batch control record was showing an incorrect value for the Target Partition.  The controls were correct in the file.  Only the display was incorrect.

- Fixed: (# 181077) The IBM i LSAM uses a value of ‘N’ in the LSAM Job Status Master log file as it is building a new job start request.  If an OpCon job status request arrives during this state, the value of ‘N’ was being sent back to OpCon, but this is not a valid numeric job status, so the OpCon SAM.log was showing error messages.  This fix translates any ‘N’ value to a zero value being sent back to the OpCon server, which is a valid way to indicate that the job has not started yet, and so it is not yet found.

- Fixed: (# 181078) The IBM i LSAM Agent for SMA File Transfer jobs was sometimes reporting that a normally completed file transfer had ended in error.  There was a mistake in program logic that caused the Agent to believe it had not yet received a valid end-of-job transaction (with a transaction ID of 029).

- Fixed: (# 181079) The IBM i LSAM logging management function, which is option 4 in the LSAM sub-menu 6, did not provide a separate End Logging control for the Job Scheduler “trace logging” option.  Therefore, when an operator requested to stop the verbose trace logging, that was causing all Job Scheduler logging to stop.  This fix implements a separate parameter on the LSAM ENDLOGCMD command, which executes the requests entered by an operator on the log management display.  Now the ENDLOGCMD has the same separate log function management options as were already showing in the STRLOGCMD utility command, and the trace logging can be ended separately without disabling all Job Scheduler logging.

- Fixed: (# 181080) The LSAM data Import command (LSAIMPDTA) was incorrectly reporting error OPR0046 when the value for the Import save file was left set to *DEAULT.  This fix accepts the Import control record value for the save file name, as expected for *DEFAULT.

- Enhanced: (# 181081) Two IBM i LSAM log file viewers are enahanced or fixed.  The Submitted Job Log now supports function key F5=Subset to Select or Omit entries from the list according to the TYP column value.  The LSAM Job Master log display has the Search function fixed to continue into subsequent pages of the list, and also to allow the PageDown key after using F11 to change the sort order.

- Enhanced: (# 181082) The LSAM Job Scheduler communications program is enhanced to improve automatic recovery after an abnormal disconnect and to better manage no ACK response.  Both the communications program and the job submitting program have improved trace debug logging.

- Fixed: (# 181083) File arrival jobs will delete temporary libraries when KEEPWRKLIB is set to 'N' even when the job reports a failure code.

- Fixed: (# 181084) When adding data export control using F4 to prompt for the group code, option 8 was not returning the value of MLTJOB.

- Enhanced: (# 181085, 181086) A new utility command is added to the IBM i LSAM software suite.  Command SMAPGM/DLTIFSFIL provides a flexible utility for deleting aged files from IFS file systems outside of DB2, including the ‘/’ root file system and /QOpenSys.  Please review the Post-Install instructions for a summary of the capabilities of this command and an explanation of the command parameters.  

>> NOTE: This first version of this command requires that the LSAM library list be set – it does not change the library list itself.  The LSAM Wrapper command “LSAMCMD” can be used to select and manage a job’s library list for only as long as this DLTIFSFIL command is executing, and then remove the LSAM libraries from the job library list.

- Enhanced: (# 181087, 181090) A new set of LSAM file maintenance commands are added to enable automatic maintenance of the Agent’s Job Tracking parameters master file, and also of the Multi-Step Job Scripts and Steps master files.

- Enhanced: (# 181088) The IBM i LSAM software analysis utility command DSPOBJWU now supports a generic file NAME*, useful only for file names.  This allows a single list of programs to show all references to a physical file and all of its logical files.  For example, try this: DSPOBJWU  LSAJOBF1* *FILE.

- Fixed: (# 181089) The IBM i LSAM Job Scheduler server program is fixed to properly manage the Library name for a Job Description and a Job Queue.  Previously, this program failed to substitute the LSAM Parameters default library name whenever the Library fields were left set to the default value of asterisk (\*).

- **Enhanced**: (# 181091, 181092) Enables the IBM i LSAM to support the new External Token encrypted security code that is generated by the OpCon User Interface for Users who are authorized to submit External Event commands to the OpCon server.  The IBM i LSAM External Event Password storage function has been merged into a special format of the general LSAM User Maintenance, although the External Event Token maintenance access remains located in LSAM sub-menu 3, option 2.  The LSAM now stores the External Event Token (or older Password) in a more secure IBM i Validation List.

- **Enhanced**: (# 181093) The IBM i LSAM File Arrival jobs now always use the IBM i LSAM Parameters designated special-purpose job description for both DB2 and non-DB2 IFS file searches.  This support for a dedicated, optionally unique job description, makes it possible for users to designate their own IBM i user profile at sites where the previous default job user of SMANET was not appropriate, as well as offering an option to override other job attributes except for the Job Queue that is specified in the OpCon job master record.

- **Enhanced**: (# 181094) The IBM i LSAM PTF List display now shows the PTF Level and the DB Level in the left-most columns of the list display.  This change helps to call attention to the change in this LSAM from an older release, where the “PTF Name field” (such as “PTF181094”) is no longer the controlling number for the current patch level of the LSAM software.  Since LSAM version 18.1 was introduced, the new PTF Level field is the official patch level.  For example, this enhancement represents LSAM PTF Level 18.1.094.

- **Enhanced**: (# 181095)  The LSAM Job Scheduler data communication program that is connected to the OpCon application server is improved with detection and automatic recovery (when possible) in case the data queue that connects this LSAM server job with the actual LSAM Job Scheduler service should get full.  This problem normally only occurs at some sites with a very old, original install of the LSAM software.  In some cases, depending on patch levels and the upgrade path to LSAM version 18.1, the data queue CMNINPT00 does not get upgraded from its older 16MB size to the newer standard of 2GB in size.  But sites with extremely high volumes of activity could still experience a recoverable queue-full error if the IBM i system is already extremely busy, so now the LSAM has an ability to pause and then recover from an overflow of incoming data.

- Enhanced (# 181096)  The IBM i File Arrival jobs that search the non-DB2 IFS file systems were generating a large number of false error messages each time a repeating file check tried to use the CLRPFM command for a file that did not already exist.  The Agent’s File Arrival job programming has been changed to avoid generating this type of message in job logs.  [NO POST-INSTALL INSTRUCTIONS.]

- Enhanced (# 181097)  The IBM i Agent DLTIFSFIL (Delete files from IFS file systems) command is enhanced to improve failure or completion message reporting, in support of the $ERRMSGID and $ERRMSGTXT special variables.  The command has another parameter added:  FAILNOFILE that enables user control of the command outcome when no files were found to delete.  The default value for this parameter is 0=No, do not fail, and the other option is 1=Yes, do fail if zero files were deleted. .  [SEE POST-INSTALL INSTRUCTIONS.]

- Fixed: (# 181098) The IBM i LSAM Job Scheduler server program is fixed to prevent a rejection of a job start request whenever the OpCon job master record has an object name typed into the Job Queue Name field, but the Job Queue Library field was left set to the default value of (\*) asterisk.  After this fix, the server resumes its previous behavior of inserting (\*LIBL) into the library name.

### Point release 18.1.098

- Fixed: (# 181099) Prevent lost SCANSPLF commands for OpCon Job. In rare circumstances, the LSAM daily file purging program could delete LSAM Job Master Auxiliary records for jobs that were still active, causing the control data for a job-related SCANSPLF command to be lost.  This prevented job completion in OpCon.                                                  

- Fixed: (# 181100) The IBM i LSAM Multi-Step Job Script driver program fails if a Step Sequence Number is greater than 999.  This bug was introduced by the loop prevention enhancement added with PTF # 181069.                               

- Fixed: (# 181101) SMARGZ does not reorganize LSAJOBF00: The LSAM database reorganize command and programs were preventing reorganization of the LSAM Job Master log file because Save-While-Active save of library SMADTA left persistent file object locks.  The SAVLIB operation is moved to after the RGZPFM commands.  The LSAM program LSAENDR00 that is supposed to end all LSAM server jobs was failing to seton *INLR, that is, the program was never closed and so file LSAJOBF00 was left open, preventing an exclusive lock and the RGZPFM command from executing.

- Fixed (# 181102) The tracking of total bytes transferred during a SMA File Transfer job was causing a failure of either SMAFTSR01 and/or SMAFTAR01, whenever a very large file (any size over 8 GB) was being transferred.  This was due to a math error that is fixed.                                                       

- **Enhanced**: (# 181103)  Add QPPGMDMP and QPDSPJOB SPLFs to JORS retrieval.  A new control file option also allows users to display any report produced by a job that OpCon started, but responsibility for protecting private data falls to the user of this option. [SEE POST-INSTALL INSTRUCTIONS.]

- Fixed: (# 181104) Restore \*DIR (directory) check not found error code. The CHKIFSFIL command may be used directly, but it also supports the IBM i File Arrival job sub-type in the OpCon user interface.  When it was adapted to for use with File Arrival jobs, the response code for a \*DIR not found was changed incorrectly.

- Fixed: (# 181105) JORS reports duplicate QPJOBLOG reports. This LSAM's JORS service was reporting a duplicate report listing for the final QPJOBLOG report, after the enhancement that optionally also supports IBM i generated diagnostic report files (QPPGMDMP and QPDSPJOB) via PTF # 181103.

- **Enhanced**: (# 181106) File Arrival jobs for non-DB2 IFS disk space (command CHKIFSFIL) are enhanced to return additional error codes for a file-not-found result. Client sites who have installed certain utilities, such as node.js, into their IBM i partitions might end up with a different PATH environment variable that affects which version of the "ls" (list) command is used, changing the file not found error code.

### LSAM DB LVL # 003

**Enhanced**: (# 181107) Expand LSAM transaction buffers. The LSAM communications program that connects to the OpCon server has its internal transaction buffer expanded from 1280 bytes to 3840 bytes. This allows for longer XML-formatted External Event commands and possible future expansions.

- Fixed: (# 181108) The LSAM server job LSAJOR failed due to a record lock held by the sub-job JORCMNSUB. A record lock held by JORSMNSUB jobs (while they are still active) can cause the LSAM server job LSAJOR to fail.  This PTF removes the cause of an unresolved file lock in the JORCMNSUB jobs (program JORCMNR01).  Bug occurred in very busy systems.

- **Enhanced**: (# 181109) The LSAM User Management functions (including the Utilities menu: External Event Token maintenance = same program) have their function key legends improved.                                                                 
 
### LSAM DB LVL # 004

- Enhanced (# 181110, 181111): The LSAM is enhanced with a whole new set of IBM i styled commands that implement an XML tagging protocol for the OpCon External Event commands.  These commands eliminate the constraints on event command content imposed by the older comma-separated-values syntax.  (See also PTF # 181112 for subsequent changes to the Client eMail feature that depended on this enhancement.)

### LSAM DB LVL # 005

- **Enhanced** (#181112) The Client eMail feature is updated to support simplification and improved flexibility by supporting XML External Event Commands.  Most of the complexity of the original solution for working around the limitations of the older comma-separated-values syntax for External Event commands has been removed.
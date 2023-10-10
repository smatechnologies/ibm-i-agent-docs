---
sidebar_label: 'Version 21.1 Fixes'
---

# Version 21.1 Fixes

This topic shows a combined list of the LSAM fixes and enhancements that have been added to the OpCon Agent for IBM i since LSAM version 21.1 was released.  The enhancements listed here are the ones that were added to the LSAM version after it was published.  They are included with the fixes to help evaluate the status of an installed LSAM.

## IBM i LSAM 21.1 PTFs

The PTF Level is the value that clients and SMA Support will use to confirm the software level of each LSAM installation.  View the PTF List display from LSAM menu 9, option 1, to identify the PTF Level of each PTF.  It may or may not be the same as the last three digits of the PTF Names shown in the following list.

### LSAM DB LVL # 21.1.003

- **Enhanced**: (# 211043) This PTF marks the end of software patches developed during beta site testing, and the initial version code of the first public release of the IBM i Agent version 21.1 at PTF level 043.

- Fixed: (# 211044)  The LSAM utility command LSAINIT was failing as sub-program LSARESETR issued error message ID CPF4131.  This program had not been recompiled over the new file layout for log file CMNLOGF10.

### LSAM DB LVL # 21.1.004

- Fixed: (# 211045)  The (revised) Client eMail log display was showing some fields with no labels.

- Fixed: (# 211046)  The Alternate Job Notify Configuration function was failing due to incorrect parameter management of the DTALIB value as program JOBNFYR30 was calling program JOBNFYC01.

- **Enhanced**: (# 211047) The (revised) Client eMail feature is upgraded with user prompting and better support for using either EDTIF or WRKMBRPDM to manage the optional email message text source members.

- **Enhanced**: (# 211048)  The model for a Dynamic Variable user-defined value calculator program has been updated to support a longer parameter that exchanges a variable’s value to/from the program. As of LSAM version 21.1 the variable value length has been increased from 128 bytes to 1024 bytes. For more details, view the LSAM PTF Post-Install Instructions.  User Help documentation has also been upgraded within the Client eMail feature.

- Fixed: (# 211049) The Dynamic Variable function code *DTAARA was not able to retrieve content from a job’s Local Data Area (LDA).  A special format for the *DTAARA function code definition is required in order to access the *LDA value.  Instructions about the correct format have been added to the secondary display where *DTAARA access is defined during LSAM menu-driven maintenance to Dynamic Variables.

- **Enhanced**: (# 211050) Type-L Dynamic Variables are updated to support an indirect interface with multi-instance variables.  The User Help for the IBM i Agent has a new subsection that outlines new capabilities for managing the Local Data Area, under the chapter about Dynamic Variables.  This PTF also improves the LSAM utility command DSPDYNVAR so that it can now display and test Type-L variables.  Type-L variables will always show a complete 1024 characters of LDA content that would be updated, including all variable master records that have the same variable name (usually a Job name) so that all sequence numbered records with that name will be included in the test display.

- **Enhanced**: (# 211051) LSAM messages in message file SMAMSGF are updated to support the PTF # 211050 enhancements to Type-L Dynamic Variables.

- Fixed: (# 211052) The LSAM log file LSALOGF40 that stores a history of job management transactions received from the OpCon server can reach its maximum number of log records that are supported by the LIDUNIQ key field that is limited to a size of 8 digits, in high volume environments.  The periodic database reorganization command (SMARGZ) is enhanced to backup this file (by renaming it) and then create a new, empty version of the file that can start over with a record ID value of 1.  No historical data that is normally retained by daily log purging will be lost, using this technique.

- **Enhanced**: (# 211053) Supporting the improvement implemented by PTF # 211052, the SMASUP command will now include the new backup file copy LSALOGF40B whenever Job Scheduler logs are requested for extract by this utility command.

- Fixed: (# 211054) Dynamic Variable maintenance of *DB2 and *DTAARA function codes showed an unsupported function key in the F-Key legend on line 23 of F4=Prompt.  F4 is now removed from line 23.

- Fixed: (# 211053) The special convention of using this External Event command: "$CONSOLE:DISPLAY,QCMD:" was not being executed when LSAM Message Management was configured to run Event commands in-line with all message management activity (instead of spawning a cmd job).

- Fixed: (# 211054) The LSAM menu 6, option 6, uses the WRKSMASVR command and program to support a user interface to the Agent tools for starting/stopping parts of the LSAM server jobs.  Option 6=STRGRP for JORS was not working to start that Group's server jobs.

- Fixed (# 211055) The special convention of using this External Event command: “$CONSOLE:DISPLAY,QCMD:" was not being executed when LSAM Message Management was configured to run Event commands in-line with all message management activity (instead of spawning a cmd job).

- Fixed (# 211056) The LSAM menu 6, option 6, uses the WRKSMASVR command and program to support a user interface to the Agent tools for starting/stopping parts of the LSAM server jobs.  Option 6=STRGRP for JORS was not working to start that Group's server jobs.

- **Enhanced** (# 211057, 211058) Add User Env Matrix utility control: A control data area (USRMTXCTL) will be present if the User Environment Matrix maintenance function is installed in an LSAM environment.  This function may be customized and the driver program name changed, depending on SMA client site requirements.                                                    

    Fix Operator Replay menu opt # 12: A control data area (USRMTXCTL) will contain the custom maintenance program name for a User Environment Matrix feature that may be installed and customized for an SMA client site.  PTF211058 adds the proposed DB files and fixes LSAM menu 4, option 12 name.

- Fixed (# 211059) Remove function key F7 from the Operator Replay master file maintenance display format OPRRPYR10-4B, since it is not supported from this display. 

- Fixed (# 211060) Operator Replay Screen Capture definitions display format OPRRPYR40R2 has the function keys F10 and F11 revised to perform as planned, in a standard fashion resembling other Agent functions that perform Data Capture.

- Fixed (# 211061) The Agent workstation prompting window for External Events was not producing correct results when requesting the XML raw format of commands via the CPYTOMSGIN wrapper command.

- Fixed (# 211062) The Message Management – message data capture rule maintenance needed to suppress the display of F10=Capture Application.

- Fixed (# 211063) The Message Management activity log program LSALOGR10 showed incorrect log entry content when F13 was pressed to view more data from the “Log Entry Text” field.

- Fixed (# 211064) The Operator Replay master file maintenance display format OPRRPYR10-R4 was not correctly supporting F8-DynVar to product a prompting list of registered variable names.

- Fixed (# 211065) The multi-purpose Captured Data display program got a spelling correction and an improvement in the flow when it was accessed using function key F10 to branch here from other programs.

- Fixed (# 211066) The Dynamic Variable maintenance function accessed from various locations among the LSAM workstation menus could cause a failure when returning from the Dynamic Variable selection window, usually if F3=Exit was pressed during some phases of he variable selection and formatting process.  (LSAVARR00:MCH1202 error @ F8=DynVar).

- **Enhanced** (# 211067) The GETCLTEML command, part of the Agent’s Client eMail generation feature, was expanded to support up to 435 characters when a command parameter could refer to a fully-qualified Dynamic Variable name.

### LSAM DB LVL # 21.1.005

- **Enhanced** (# 211068, 211069, 211070, 211071, 211072, 211074) a new Job Status monitor server program is added to the Agent software, replacing a function that IBM removed from its Navigator Monitors when the newer Navigator version was introduced.  The Agent’s new ability to monitor any IBM i subsystem for jobs that are stuck in a MSGW (message waiting) status provides a better implementation of this service, and it can still be combined with other Agent features to support alerts and, optionally, automated recovery functions.  Several Agent menu options and programs were enhanced to support this new, optional but standard, Agent server job named “JOBSTS.”

- **Enhanced** (# 211075) The Agent’s feature interconnection utility command, WAITDYNVAR, is enhanced to support value parameters up to the longer length of 1024 that matches the new extended capability of Dynamic Variable values introduced at Agent version 21.1.

- Fixed (# 211076) The Agent’s Job Scheduler communications program no longer sends a warning about a duplicate connection attempt if an OpCon server connection request comes from the same IP address as the Agent believes it was already connected to.  There are only local IBM i Agent communications log file entries that record the reconnection activity, and no longer any messages sent to the IBM i QSYSOPR message queue nor to the OpCon SAM Log.

- **Enhanced** (# 211077, 211078) The old, not-recommended Agent utility command SETCAPVAR is nevertheless upgraded to manage a fully-qualified Dynamic Variable name.  However, this command was not changed to support the improved Agent database normalization of Capture Application IDs, which are now keyed by the 9-digit APPKEY.  The SETCAPVAR command only supports the original method of using a 30-character App ID description field to link captured data from an Agent log file to store the captured value to a Dynamic Variable.  This action is better supported by the newest versions of the Agent’s Capture Data and Response Rules features.
PTF 211078 enhances this same SETCAPVAR command to support up to 435 characters for the Dynamic Variable name, in case a fully-qualified variable name is required for parallel processing.

- Fixed (# 211079) The Multi-Step Script driver program was failing with a false error code of “NoLVar” and error message text indicated that a Dynamic Variable for updating a job’s Local Data Area was not found.  This happened during the Multi-Step Job’s startup procedures, before Step processing started.  The fix ignores this return code, since it simply means that there are no Dynamic Variables available to update the Script job’s IBM i Local Data Area.

- Fixed (# 211080) Corrects the format of the IBM i Job ID character string reported via a variable in the message ID SMA5802.

### LSAM PTF release 21.1.123 (DB LVL # 21.1.005)

#### ENHANCEMENTS

**IBMI-495:** PTF211121  Add SMAFT log entry when job denied @ exceed MAX

Add messages that log when a connect request is rejected by the LSAM Job Scheduler as SMAFT Agents jobs would exceed the max allowed jobs.

**IBMI-892:** PTF211088  Add Operator Replay error report for MLTJOB script

An Operator Replay script can be executed from the Agent's Multi-Step Job Scripts, but previously the failure of the Operator Replay Script was not being reported to the OpCon server's job that started the Multi-Step Job Script execution. For more information, see the [Operator Replay user help](/operator-replay/additional-info#managing-operator-replay-exit-codes-via-multi-step-job-scripts).

**IBMI-893:** PTF211097  Add 5 field codes to SM File Arrival job

The Solution Manager user interface for the IBM i File Arrival job sub-type is enhanced with 5 new fields that make it easy to specify frequently used job attributes.  These replace the difficult $@variables registration, though those are still supported.  This enhancement of the Solution Manager web application is available with OpCon version 22.3.1, and later versions.  
Please refer to the IBM i Agent User Help for information about the new SM data entry fields, and also an update to options for keeping or replacing the optional $@Variable names that previously provided support for these same five parameters.

**IBMI-890:** PTF211090   Display ID of Job Track control LSAM 

The pop-up window that reports the status of Job Tracking (active or inactive) showed a warning message when a different LSAM within the partition already had control of Job Tracking.  This window now shows the LSAM name and its SMAGPL library.

**IBMI-900:** PTF211107  Add "Display Data Capt App where used"

As of LSAM 21.1, Data Capture applications can be reused among multiple Operator Replay Script Steps and also among more than one Message Management Parameters records.  Changes to any Data Capture Rules or Response Rules will now warn about affecting any other OR Script or Msg Mgmt Parm record that share a Capture Application.  Inquiry lists of the Capture Applications now support an option to see every Step or Parameter that shares that same application.

**IBMI-936:** PTF211098  Update SMALOOKUP for File Arrival fields

An extract from the OpCon transaction field codes table SMALOOKUP is refreshed with new data that labels the File Arrival job fields added to the Solution Manager user interface, supporting LSAM detail displays of log file entries showing these fields.

**IBMI-952:**  PTF211117  Suppress false SMA0019 2nd connection attempt messages.

The LSAM communications program connected to the OpCon server will no longer send this message to the OpCon server's SAM log. This prevents a potential LSAM communication program loop that can block recovery of the connection to the OpCon server.

**IBMI-977:**  PTF211111  Removed an attempt to report SMA0019 (rejected 2nd connection attempt)

There is little or no use for attempting to add an error message to the SAM log of an OpCon server
That is not communicating with the IBM i Agent at the time when error SMA0019 is being handled.

**IBMI-978:**  PTF211114  Add LSAM utility command SMACMDDTL to report the PRDLIB value of a command

Some of the LSAM utility commands in the SMAGPL library are Control Language programs that need 
to know the SMAGPL library name.  They can now simply call this utility command to quickly fetch the library name.

**IBMI-978S:**  PTF211117  Add new data area SMAGPL/ENVIRONG to the LSAM object authority master file

The new data area SMAGPL/ENVIRONG holds the LSAM environment name, using the same value that has always been stored in SMADTA/ENVIRON.  This copy of that data supports LSAM utility commands to establish the LSAM library list when they have been called from outside of an LSAM environment.

**IBMI-979:**  PTF211112  Add the Response Rules Sequence number to lists of Response Rules.

The description of a Response Rule is not always helpful to identify the specific Rule that might
need maintenance.


#### FIXES

- Fixed (# 211087) IBMI-857:  Update LSAAUTF01 attribute (LSAM Object Authority master file) on type *MENU records with DSPF (display file).

- Fixed (# 211081) IBMI-868: The LSAM object reference utility command REFFLOW is improved with better optional (default) suppression of references to commonly used IBM i modules that have names beginning with the letter Q.  The new command option can be changed to 0 to show them.

- Fixed (# 211082)  IBMI-868: The SMAADDLIBL utility command was adding libraries to the correct position of an existing job's library list, but the order of the libraries added was the reverse of the library priorities registered in the LSAM environment management master file.

- Fixed (# 211083)  IBMI-868: The LSAM object reference tools supporting table PGMREF is updated with corrected and expanded data content.  This replacement fixes some omissions from the original Agent 21.1 release and it adds information from the latest LSAM PTFs as of 211083.

- Fixed (# 211084) IBMI-880: Operator Replay job start requests were being rejected in many cases with a false error SMA0108.  The Script Name was not being properly extracted by the LSAM Job Scheduler program.  Also, a diagnostic dump report from the script driver job is removed.

- Fixed (# 211085) IBMI-882: The Dynamic Variable master record inquiry routines show the wrong variable name in the function code details display (LSAVARR7) when the function code is *DTAARA. This happens only in Inquiry mode, but not Change or Copy modes.

- Fixed (# 211086) IBMI-883: The Multi-Step Script Step maintenance function was reporting a false "duplicate label not allowed" error when using option 2=Change to change a Step record but without changing the Label value.

- Fixed (# 211091) IBMI-895: The new JOBSTS Server Job reported a divide by zero error and another error reporting a receiver field too small. Improved LSAM control data for this new server job and also added a non-zero default value for the server to use at job initiation.

- Fixed (# 211089) IBMI-898: The Operator Replay Steps maintenance sometimes fails to link a selected Data Capture Rule to the Step record.  Also, after leaving the Select Capture Rule program with F3 or F12, the Operator Replay Step record Capt App ID text is blanked out.

- Fixed (# 211092) IBMI-913: The Multi-Step Job Script driver program was failing with error RNQ0121 (array index error) when a Script had more than 99 steps.  This error had been patched in LSAM version 18.1 with PTF# 181100, but 3 lines of the patch were missing in LSAM 21.1.

- Fixed (# 211093) IBMI-915: When adding the |SCANSPLF extension to an OpCon IBM i job Call command line, the IBM i Agent was incorrectly returning job failure code SMA0249 to OpCon. This was caused by a failure of the Capture Data Response module, unmatched to the LSAM 21.1 database.

- Fixed (# 211094) IBMI-920: The LSAM Server job LSAJOR would fail if the SCANSPLF command was appended to an OpCon IBM i job Call command, and the Scan Rules were executing an OpCon External Event command via the CPYTOMSGIN utility. A RCLACTGRP command is removed from CPYTOMSGIC.

- Fixed (# 211095) IBMI-924: Check,rebuild PFF211035 ctrl data area in SMADTA.  This PTF must execute before PTF211086 to avoid a false error about a missing PTF. The PTF was incorrectly named PFF211035, and the control data area for this PTF got removed before PTF distribution.

- Fixed (# 211096) IBMI-927: The LSAM install/update/audit utility progra SMADTAARAC had a weakness in the logic for managing the Job Tracking control data area named SMAXNBR.  The result of running this logic should leave SMAXNBR in library QGPL, moved out of the local LSAM SMAGPL.    

- Fixed (# 211099) IBMI-930: The LSAM Job Scheduler communications program was incorrectly handling warning messages whenever the Agent was not yet updated with an OpCon User ID and Password (or Token) for External Event commands. Comm log entries were all being overridden to type L.

- Fixed (# 211123) IBMI-993:  F4=Prompt on Copy Operator Replay Capture Application fails/not supported.

    Error occurs after staring the operation to copy an Operator Replay Script to a new Script name. If there is one or more linked Capture Data Applications, a prompt show asking if they should also be copied (to a new name). The same capture application could be re-used by the new OR Script, in which case answer Yes to copy the link, but do not change the To-Application on the next window (OPRR10W8):

    When answering Yes to copy the Capture App, a second window shows Old/New Capt App ID, and it allows a new name be assigned to the New copy. It’s possible to link an existing, other Capture Data App, in which case the F4=Prompt function key can be used to access a list of existing Capture Apps, from which one would be selected. However:

    “Function key not allowed” error when attempting to prompt for new APP with F4, within window that requests a new name for an associated Capture Data Application.

- Fixed (# 211110) IBMI-941: SMASETUP fails at SETLIBAUT when no objects in the library. The LSAM install/upgrade program SMASETUPC is fixed by adding additional error message monitoring for the expected condition that a library getting its object authority managed might not have any content.  Adding CPF2123 for the RVKOBJAUT command helps.

- Fixed (# 211100) IBMI-945: The LSAM Work with Import Batches list display showed an incorrect Group subset value because it was missing new Capture Data Rules groups added at LSAM 21.1.  Display SMA0038 when Exp/Imp Config was not updated. Add fetch of DESC for new imp save files.

- Fixed (# 211101) IBMI-948: Fix APPIDN5 error @ SCANSPLF utility. The SCANSPLF and SCANOUTQ utilities failed when old Scan Application IDs converted from LSAM 18.1 contain duplicate ID text as is used for other LSAM applications, including Message Management or Operator Replay. The App Type is added to search for APPKEY.

- Fixed (# 211120) IBMI-950:  Refine authority for SMAMSGQ job completion message queue, to improve the security of LSAM operational details.

- Fixed (# 211119) IBMI-951:  Fix 999999 for Job Start Time on job end log entry and job end status message sent to OpCon.  This initial "no value" string was overlaying the actual job start time during the management of the job end data.

- Fixed (# 211102) IBMI-958:  Bypass “NoLVar” false failure in the LSAM job scheduler program (LSASCHR00).

- Fixed (# 211103) IBMI-959:  Prevent error CPD0078 when restoring the LSAM Job Scheduler server program’s library list.  Each job is supported by the Job Scheduler temporarily setting its own library list to manage all the possible job definition parameters requested by the OpCon job master.

- Fixed (# 211104) IBMI-967:  Prevent possible errors during LSAM upgrades by monitoring for no objects in a library.  Added monitor for this error on DSPOBJD, RVKOBJAUT and DLTOVR commands in program SETLIBAUTC.

- Fixed (# 211106) IBMI-968:  Revise the File Arrival job command CHKFILE to prevent a false file name error CKF0002. When a DB2 library and file are listed in the File Arrival job using the IFS file system format (which directs the LSAM to use the CHKIFSFIL command), the parameters that pass the DB2 library name and the file name to the CHKFILE command were sometimes being passed as parameters in an incorrect format.

- Fixed (# 211105) IBMI-969:  The LSAM data Export tool was incorrectly storing duplicates of a single Dynamic Variable. Exporting duplicate Dynamic Variable names created a “duplicate key” error during the Import process.

- Fixed (# 211109) IBMI-972: Prevent error message MCH1210 (receiver too small to hold value) in the Message Management server job.

- Fixed (# 211108)  IBMI-975:  Prevent failures of the Job Tracking process by correcting the  SMASBMJOB and SBMJOB clone command attributes to use the specific SMAGPL librar of the LSAM environment that is controlling Job Tracking in the partition.  (Leaving the command processor program location set to *LIBL sometimes does not work.)

- Fixed (# 211118) IBMI-976:  Fix the "Capture Data Where Used" maintenance warning to prevent a false return reporting multiple uses for a Capture Data Application that is used in only one place.

- Fixed (# 211122) IBMI-980: Fix the Operator Replay Configuration maintenance of the QGPL/OPRDEVLOG debug data area. This data area is a critical component for managing the LSAM Telnet Exit Program, used primarily to Manage virtual workstation device selection for Operator Replay workstation automation.




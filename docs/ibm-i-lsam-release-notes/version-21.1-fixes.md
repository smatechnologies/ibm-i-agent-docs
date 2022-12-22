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

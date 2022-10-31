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




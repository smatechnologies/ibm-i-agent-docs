---
sidebar_label: 'Version 21.1 New Features'
---

# Version 21.1 New Features

This list shows the enhancements that were added to the OpCon Agent for IBM i as LSAM version 21.1 was released, available only after upgrading to version 21.1, plus enhancements that have been added to this Agent version since it was originally released.

| Project | Description |
| :------- | :----------- |
| IBMI-516 |"Multi-Instance Dynamic Variables." Dynamic Variables now support multiple instances to enable parallel processing.  Multi-instance Dynamic Variables resemble OpCon multi-instance properties, but Dynamic Variable values are stored within the Agent's database.  Agent maintains a temporary history of variable instances, automatically purged according to the Agent's standard operational log purge criteria.  Enhancement includes an extensive array of diagnostic displays to help understand how the instance variables are being managed.|
| IBMI-610 |Dynamic Variable maximum value size extended from 128 to 1024. The DSPDYNVAR variable value testing utility now supports a preferred full-screen display to show the longer value, although the original line-24 error message subfile display method is still supported \- even though it will only show a short part of a long variable value.|
| IBMI-616, IBMI-643 |Agent's "Submit Job Log" becomes a General Purpose log.  Log viewer utility expanded with improved list and subset feature, plus self-documenting display of each log entry. Many Agent programs enhanced to supply more detail about programs and jobs associated with each log entry, supporting improved subsetting of the log list, for example, to isolate all messages originating from a single job.|
| IBMI-623 |Job Tracking LSAM job ID expanded from 6-alpha to 9-numeric.|
| IBMI-625 |Added support for XML syntax of External Event commands. (CSV syntax support is still supported.)|
| IBMI-634 |New Operator Replay program routines and procedures make it possible to capture the virtual workstation's IBM i Job ID.  New $-System variables using $VWS category added to support access to the virtual workstation IBM i Job ID.  This can be important for certain use cases of Multi-Instance Dynamice Variables when the variable value should be isolated to the virtual workstation job and not to the Operator Replay Script driver program.|
| IBMI-637 |Change Operator Replay link to Capture Data rules so that Capture Data rules can be re-used with other Scripts and/or Steps.  The Operator Replay Script and Step IDs are removed from the screen capture rules master file, and instead the Capture Data Rule master record key is stored in the Operator Replay Script Step master record.|
| IBMI-641 |Add a Description text field to all Capture and Response Rules.  (SCANSPLF Scan Rules, acting as report data capture rules, already had a Description.)|
| IBMI-714R |The LSAM Job Scheduler communications program has expanded its internal transaction buffer size from 1280 to 3840 bytes to accommodate the potentially very long size of a $NOTIFY:EMAIL OpCon External Event command, now that the XML format of this command is required by the Agent's Client eMail feature.|
| IBMI-735 |The Agent's data export feature, initiated by option 8 in LSAM master file list displays, now includes option 8=Export for the new Capture Application ID master file.  This new master file makes it possible to change the description of a Capture Application ID without requiring any changes to the other Agent master files that now use the "APPKEY" key field to link to Capture Applications, instead of forcing the user to copy/paste a 30-character description into other master files to establishe this link.|
| IBMI-743 |The OpCon Long Job Name is now stored and displayed by the Agent's Job Master Log viewer (LSAM menu 6, option 5, log viewer 5), along with the previously supported Job Short Name.  The Job Long Name could be required whenever it is necessary to provide this parameter as part of a fully-qualified multi-instance Dynamice Variable.|
| IBMI-750 |New $-System variables added with category $SPLF to provide access to the IBM i Job ID of the job that produced the spool file.|
| IBMI-768 |The Client eMail feature (command GENEMLREQ) has been dramatically simplified and a dependency on an usupported, old OpCon eMail server access utility removed, as this feature can now use the XML-formatted version of the $NOTIFY:EMAIL OpCon External Event command.  Client's existing data is converted as this enhancement is installed.  Please review the updated documentation about the Client eMail feature for advice and certain Warnings about limited changes imposed by the upgrade.
| IBMI-778 |The IBM i Agent supports various sets of Agent-defined variable names, similar to the OpCon $System variables.  Previously, these variables were referred to as "$-Special" variables, but this name is now replaced by the term "$-System variables" since many of the variables produce the same value result as do the OpCon $System variables.|
 | | |
|**IBMI-780** |This project used LSAM PTF sequence # 043 as a marker to separate fixes and enhancements that were included with the first public distribution in the LSAM install file LI211043A.  The LSAM cumulative PTF save files (LSCTLDTA and LSCUMPTF) start with PTF sequence number 044.  PTFs with previous numbers are included in the install/upgrade save file.|




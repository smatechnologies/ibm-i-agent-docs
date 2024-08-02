---
sidebar_label: 'Version 23.1 New Features'
---

# Version 23.1 New Features
## What's New with LSAM Version 23.1
This topic summarizes enhancements to the OpCon Agent for IBM i. The summaries explain design changes that affect more than one of the Agent's automation toolkit features.

Some of these enhancements were introduced as part of the new Agent version, so they do not appear in the Version 23.1 Fixes list that shows all LSAM PTFs. On the other hand, some of the enhancements listed here will also appear in the Fixes list as part of the serial list that is sorted by the LSAM PTF Number.

### Enhancements to Manage Duplicate IBM i Job IDs

In high volume IBM i partitions, the 6 digits of the IBM i Job ID Number can roll over to 000001 in a short time.  In cases where OpCon Schedules might launch certain system monitoring jobs (for example) that are repeated many times with the same Job Name and Job User, dupicate IBM i Job IDs might be registered in the LSAM Job Master Log, remaining active until aged data is purged.  In the past, that has caused incorrect alignment with the different OpCon Jobs, that is, a newer job could have become associated with an older OpCon Job Daily record.  The temporary work-around of trying to always include the OpCon unique Job Number as part of the key to the LSAM Job Master records was effective in managing duplicate IBM i Job IDs for most purposes, but this did not prevent possible incorrect selection of the OpCon Job Number for certain types of jobs.

However, with LSAM version 23.1, the addition of the Job Start Date (8 digits: CCYYMMDD) and Start Time (6 digits: HHmmSS) to the LSAM Job Master log now prevents confusion among duplicate IBM i Job IDs for all functions of the LSAM.

### SMA File Transfer Improved Management of File Object Authority

SMA File Transfer supports a control option that enables new routines to manage ownership assigned to newly arrived files.  The new option specifies that the SMA File Transfer job's user profile named for authority to the file being transfered will be assigned as the owner of a file that did not previously exist in the destination location.  While the new option flag is not activated, the file transfer programs will continue to operate as before.  Previously, the authority assigned to newly transferred files relied on the operating system defaults for new objects and a second job in an OpCon Schedule was required to change object ownership and access rights.  After the new option is enabled, there can still be some cases where specialized object authorities and/or ownership rights must be managed by a separate OpCon batch job for IBM i.  For more information see [SMAFT Parameters](../file-transfer/screens#smaft-parameters).

### Expansion of Schedule Name and OpCon Long Job Name fields

The LSAM has always been limited to 128 characters for these two fields.  However, in cases where OpCon Jobs are part of a sub-schedule, either field could be automatically expanded to more that 128 characters.  To prevent loss of the full Name strings assigned by the OpCon SAM (Schedule Activity Monitor) both of these fields in the LSAM database tables that store them have been expanded to 255 characters.

This change has required slight modification to several LSAM log or master file record displays, where values longer than 128 characters on a first, primary display format can be viewed using function key F13=More(+).  The plus sign (+) appears at the end of the shorter fields to indicate there is more data to see, usually by pressing F13 while the mouse cursor is located within noe of these fields.

### Field Codes added to the IBM i File Arrival jobs in the OpCon user interface

The IBM i File Arrival job definition has included job control parameters that were not implemented when File Arrival jobs were first instated in the Enterprise Manager as a new job sub-type for IBM i jobs. Until OpCon core Development could catch up with the IBM i capabilities (that are different from what Windows does with File Arrival jobs), the IBM i Agent implemented the necessary File Arrival command options by supporting a convention for entries in the OpCon Job Master "Variables" tab.  Any IBM i LSAM variable name starting with $@ would be recognized as a parameter name and value to be added to this Agent's command that drives the job.

These $@VARIABLES are now replaced by the following new Field Codes that will appear in the IBM i job master record as current verions of the Solution Manager user interface are engaged:

 - Job End Time 5060
 - Re-Check Frequency 5061
 - Failure Code to LSAM Dynamic Variable 5062
 - File Size to OpCon Property 5063
 - Failure Code To OpCon Property 5064

For more information see [File Arrival Jobs - $@ Agent Variable Names - IMPORTANT fields table.](../commands-utilities/file-arrival#-agent-variable-names-support-command-keywords).

### Technical changes to IBM i Agent programs

In rare cases, the performance attributes associated with the IBM i concept of Activation Groups could sometimes cause an invalid pointer error to interrupt some LSAM menu functions.  A comprehensive review of all IBM i LSAM programs has resulted in re-assignment of the Activation Group used by each program.  Careful attention was paid to which programs would instatiate a New Activation Group and which sub-programs would share the *CALLER's Activation Group.  In addition to preventing possible program errors, this realignment of Activation Groups improves the efficiency of partition memory allocation to interactive and batch programs.



## Agent Enhancements by Project ID

This list shows the enhancements that were added to the OpCon Agent for IBM i as LSAM version 23.1 was released, available only after upgrading to version 23.1, plus enhancements that have been added to this Agent version since it was originally released.

| Project | Description |
| :------- | :----------- |
| IBMI-271 IBMI-873 | Prevent duplicate IBM i Job IDs from being matched to the wrong OpCon Job Number.  The LSAM Job Master file (and other files) are expanded to include the Date and Time of each job start.|
| IBMI-275 | New SMA File Transfer control option controls ownership assigned to newly arrived files.  [See SMAFT Parameters](../file-transfer/screens#smaft-parameters) |
| IBMI-475 | LSAM storage of the OpCon Schedule Name and the OpCon Long Job Name is expanded from 128 to 255 characters.  **NOTE:**  The  JI. instance of Dynamic Variables can only support a total of 435 characters in the instance ID fields, so currently it cannot hold 255 characters for both of these fields within the same variable instance key string. |
| IBMI-710 | The IBM i File Arrival job now supports new job definition fields in the Job Master record, eliminating the need for the previously defined $@variables to be registered in the Variables tab of IBM i Job Master records in the OpCon database. [See File Arrival Jobs - $@ Agent Variable Names - IMPORTANT fields table.](../commands-utilities/file-arrival#-agent-variable-names-support-command-keywords)|
| IBMI-851 | Improved performance of the routines that manage the IBM i internal Job ID (long numeric value) which gets replaced after each IBM i IPL (initial program load = system reboot). |




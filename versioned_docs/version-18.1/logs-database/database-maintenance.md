---
sidebar_label: 'General LSAM Database Maintenance (SMARGZ)'
---

# General LSAM Database Maintenance (SMARGZ)

The LSAM utility command SMARGZ is used to perform the following maintenance functions:

- Complete a full backup of the library SMADTA (uses the SMASUP command in LIB mode)
- Reorganize all the physical data files in library SMADTA to recover disk space from deleted records
- Delete aged save files from the library SMALOG

:::caution
It is very important to schedule the periodic execution of the SMARGZ command in order to recover disk space from records that are deleted from LSAM files by the daily automatic purge procedures. The default setting of the LSAM allows the LSAM database maintenance server jobs to perform this task, or it is possible to turn off the LSAM function and create an OpCon job that will execute the SMARGZ command at a time when the LSAM server jobs can be temporarily stopped.
:::

The command SMARGZ can be executed automatically by the LSAM database maintenance server job using simple scheduling parameters, or, instead, it can be scheduled to run as an IBM i batch job by an OpCon schedule. 

The IBM i LSAM is installed with the following LSAM Parameters set to a pattern that provides basic protection of disk utilization, until the site's LSAM Administrator can make a decision about any preferred strategy for managing the SMARGZ command:

Backup/reorganize freq.: [M] Days/Wk(1-7), Mo(1-31) : [5]
Days keep LSAM backup: [999]

The field "Days keep LSAM backup" controls all save files that are stored in the SMALOG library, such as the full save of the SMADTA library, except NOT the save files that begin with letters "D" or "O" (described above) which hold backups of the Debug/Audit log files and of the daily Operational log files. A value of 999 means that the backup save files will not be purged automatically, in which case the LSAM Administrator is responsible for managing these save files in the SMALOG library. The value of 999 may be useful for test and development environments, or in a case where a site uses their own procedures to control the content of the SMALOG library.

The default settings that allow the LSAM to automatically reorganize database files and delete old save files help to assure that the LSAM will not utilize too much disk space. However, as described above, it  may be preferred to set the LSAM Backup/reorganize frequency code to "N" (= never) so that the LSAM does not execute the SMARGZ command, and instead define an IBM i job in an OpCon schedule that will execute the SMARGZ command. Another reason for this  trategy is that the OpCon schedule and job dependencies can determine when is the best time, of least activity, when this type of database maintenance should be performed.

Remember that the SMARGZ command will temporarily suspend the LSAM server jobs so that files can be reorganized. However, the SMARGZ command will also restart the LSAM server jobs when it has completed its tasks.

For more information about using the SMARGZ command, refer to [Commands and Utilities](../commands-utilities/commands.md). Also refer to [IBM i LSAM Configuration](../configuration/configuration.md) for more information about letting LSAM automatic procedures execute the SMARGZ command.

---
sidebar_label: "What's New with Log File Management"
---

# What's New with Log File Management

Recent improvements to the LSAM are highlighted in this document because of their importance to the existing product users. These changes introduced major improvements in the ease of file management as well as important reductions in disk space utilization.

:::caution
Although there are default settings implemented for all the log file management features in the LSAM, SMA strongly recommends that each site carefully review the LSAM Parameters, as described in Configuration. Many sites may wish to change the number of days that log file content is preserved, as well as the number of days that the (new) save files that hold pre-purging backups of the files are retained in the SMALOG library. Please also note that it remains important to adopt a strategy for the execution of the SMARGZ command in order to fully recover disk space after log file records are deleted.
:::

## No Copies of IBM i Job Log Reports

One of the most important improvements was the option to prevent the LSAM from making copies of every IBM i job log report (that is, for jobs started by OpCon). The new default is to NOT copy the job logs. Instead, the LSAM will find and convert job log reports directly from output queues whenever they are requested by OpCon job output retrieval (JORS).

At the same time, the LSAM now supports retrieval of incomplete job log reports from active jobs. Use the OpCon user interface function "View Output" to see any job log report that still exists in the IBM i system, including viewing the logs of active jobs.

## Learn About Different Types of LSAM Log Files

To properly manage the LSAM logging function, it is important to understand the different types of log files:

- **Daily operational logs**: are logging operations that cannot be turned off by the user. They are required for correct operation of the LSAM features, or to store a critical history of operations.
- **Debug/Audit logging**: is a capability that can be turned on or off by LSAM administrators. This type of logging supports diagnosis of new or failing automation procedures and it also provides a detailed audit trail of automation.
- **Trace logging**: is an exceptional kind of logging that generates a very large amount of data in a very short time. This type of logging should only be used when specially requested.

## LSAM Periodic Database Maintenance Improvements

It is important to understand the improvements in the way files are purged and reorganized by LSAM tools. Often LSAM users were experiencing excessive disk space utilization. The changes to LSAM Parameters (refer to Configuration) and some LSAM utility commands and programs now make it easy to avoid this problem. Strategies for managing disk utilization are enabled by the various tools and parameters explained throughout this topic.

## SMASUP Improved with Limited Log File Extracts

Part of the process of supporting the LSAM software is the action of extracting LSAM log files and/or master files to an IBM i save file so that they can be transferred to SMA Support for analysis. This technique has made it possible for SMA to diagnose user difficulties and any software errors without needing to directly connect to client systems. Previously, the SMASUP command tried to extract all the LSAM log files at once, but these files can sometimes get very big, so the SMASUP command was not useful. Now, the SMASUP command supports a display format that makes it easy to select logs and/or master files for one or more LSAM features, as may be requested by SMA Support.  Instructions for using the SMASUP command are provided below under [Extracting Log and Master Files](./extracting.md#smasup-command-prompting).

## LSAM Parameters Controlling Log Purging

IBM i LSAM Configuration illustrates and explains the individual LSAM Parameters that govern how files are purged and reorganized. As noted in the Caution box above, please carefully review these parameters in order to get the best benefit from the LSAM improvements. SMA clients are invited, as always, to contact SMA Support with any questions about how these LSAM features work.
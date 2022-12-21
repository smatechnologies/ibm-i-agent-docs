---
sidebar_label: 'Components'
---
 
# Components

## Core Programs and Files

A summary of the programs and files installed for the IBM i LSAM is available in [LSAM Programs and Files](../reference/copying-files.md).

## Primary Server Jobs

When the LSAM is running, one subsystem and multiple primary server jobs are active. There may also be transient sub-processes spawned in the subsystem, but these are not listed in the following table.

### IBM i LSAM Primary Server Jobs
**SMASBS**
-  This is the subsystem where the LSAM agent server jobs are running. 

**MSGMNG**
-  This job monitors for IBM i job completion or failure messages, for jobs that were submitted by OpCon.

**SKTCMN**
-  This job performs sockets communication with SMANetCom, sending and receiving all information exchanged with OpCon via the TCP/IP connection. 

**TXMMNG**
-  This job performs the actual tasks requested by OpCon ansactions. For example, it submits jobs to IBM i.

**LSAJOR**
-  This job handles internal requests for job output retrieval as each OpCon-started job reaches completion. This server task manages the tracking (and optional storing) of job logs reports (i.e., spool files).

**JORCMN**
-  This is the communications server job that responds to requests from OpCon to view the job output. This server job lists the job logs that the LSAM has tracked and then it retrieves the job log content and sends it back through the TCP/IP communications link with OpCon.

**LSAMNG**:
-   This job purges LSAM log files and job report output, including job log reports (spool files).
-   The LSAM log files are purged only when the LSAM Parameter value of Automatic delete has been set to Y. 
-   Job log report spool files are always managed according to the separate LSAM Parameters that control how long job output should be retained.
-   LSAM debug log files are managed by this process when the Backup and Reorganize options allow the LSAM to automatically schedule the SMARGZ command. (Optionally, the SMARGZ command can be configured to run as a job in an OpCon schedule.)

## Optional Server Jobs
Some LSAM server jobs are separately controlled by their own option
flags, set in various LSAM menu functions.

### IBM i LSAM Optional Server Jobs
#### TRPMSG
- This job monitors IBM i messages, both for the LSAM global message management and for job-specific messages defined in the OpCon job master.
- The LSAM can submit this job automatically if the Message Management Performance Parameter value to Auto-start message management has been set to Y. 
- Message management also starts automatically when Job Tracking is started because it is required to support Job Tracking.
- Message management can also be started manually from the Message Management sub-menu, but as soon as any Message Management Parameters are defined and set to Active, the normal practice is to set the flag that allows this server job to always be started whenever the other LSAM server jobs are started.

#### SMAFTS
- When specified in the LSAM's SMA File Transfer control options, this server job is automatically started to listen for file transfer requests. SMA File Transfer jobs start when OpCon submits a job to any LSAM (within IBM i or in another operating system) that will act as the requesting File Transfer Agent. The requesting agent contacts the SMA File Transfer server job with a request for the file.
- This job is the SMA File Transfer server job for the IBM i partition. When it receives a file transfer request from another LSAM agent, this job finds the file in the IBM i database (or IFS slash / file system) and then sends the file to the requesting agent LSAM. Optionally, the file transfer can also be run in the opposite direction.

#### SMARGZ
- This optional job may appear for a brief period in the LSAM subsystem shortly after the LSAM Maintenance Hour on scheduled days. This is the job that performs an automatic backup of the SMADTA database library and then reorganizes the LSAM master files. It also purges the LSAM debug log files after the save step is completed.
- During the file reorganization step, this may be the only job active in the LSAM subsystem. This task suspends all other LSAM server jobs in order to free the master files for reorganization. When the file reorganization is completed, this job restarts the other LSAM server jobs.

#### ALTNFY, ALTNFY4
- This pair of optional jobs may appear if the LSAM Alternate Job Notify server feature has been configured and activated.  Access to the LSAM controls for managing this feature is from the LSAM menu 6, option 8: Alternate Job Notify menu.  Information about when and how to use this feature is found in [Alternate Job Nofify Service](/operations/lsam.md#alternate-job-notify-service)
- Uses for this service include:
    - Supporting "true-passive Job Tracking."
    - Supplementing Agent management of job completion reporting in some IBM i partitions where the Agent's normal detection of job completion messages in the SMADTAQ data queue is not working correctly.

#### JOBSTS
- The optional IBM i LSAM Job Status Monitor runs constanly to detect any jobs in selected IBM i subsystems that are stuck in MSGW status. 
- See the topic of [Monitoring for IBM i Jobs in MSGW Satus](/operations/tips#monitoring-for-ibm-i-jobs-in-msgw-status) under Operation Tips and Techniques for instructions about configuring and using the Job Status Monitor feature.  This Agent server job will generate a message that can be intercepted by the IBM i LSAM Message Management facility, from which many forms of notification and response can be generated, including OpCon Event commands. 
:::NOTE
The JOBSTS Agent server job replaces a former IBM Navigator Monitor capability that was dropped from the Navigator when IBM published the newer "Navigator for i."  Previous advice included in this Agent documentation about integrating with IBM Navigator Monitors is replaced by the instructions for using the Agent's JOBSTS server job.
:::
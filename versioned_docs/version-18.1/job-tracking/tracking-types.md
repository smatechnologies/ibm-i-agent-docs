---
sidebar_label: 'Introduction to Tracking Types'
---

# Introduction to Tracking Types

The general LSAM Job Tracking set up and maintenance tools described in this topic are configured in different ways depending on the purpose for using tracking, and on the third-party application software that may have its jobs intercepted for tracking.

The LSAM may employ two different techniques for tracking jobs. The most commonly used technique is supported by the IBM i exit program register (which can be viewed and maintained manually by the IBM i command WRKREGINF). This technique registers an LSAM program as the exit program that is called any time the IBM i SBMJOB (Submit Job) command from library QSYS is used, anywhere in the system. The other technique is supported by registering a data queue that will receive trigger or "job notify" transactions from the IBM i system any time a job enters a designated IBM i job queue, and/or whenever a job from the designated job queue ends its processing.

Following is a list of the different types of tracking tasks managed by this LSAM feature. The list identifies which tracking technique is used for each task. It is often important to understand the difference among these tracking types when using the LSAM job tracking maintenance functions according to the step-by-step instructions that follow later in this document. Notice the listed attributes of each type in order to understand what purposes may be served by each type.

There is more information about actually configuring for and operating with each tracking type in the remainder of this topic. Additional background information and technical details are offered in [How LSAM Job Tracking Works](../job-tracking/details.md).

## Job Tracking

- Uses SBMJOB exit program technique.
- Requires pre-configured LSAM job profiles.
- Requires pre-configured OpCon job master record, else could prevent job start.
- Interrupts IBM i SBMJOB process; restarted by LSAM using stored job parameters.
- IBM i job parameters cannot be overridden by OpCon.
- Cannot control with job dependencies, but subsequent jobs can be dependent.
- Supports OpCon job master message management and spool file management.

Using the SBMJOB exit program technique, the LSAM uses user-supplied values that are registered in an LSAM database file to filter out the desired jobs from every job that would be started by the SBMJOB command. Jobs that are marked for this specific "Tracking" method are sent to OpCon by means of the $JOB:TRACK external event command. The command uses the LSAM database file parameters to specify which OpCon Schedule will show the job.

Jobs of type "Tracked" (that are not marked for "Automatic" processing - refer to below) require that an OpCon job master record must exist on the Schedule named by the LSAM parameters. This tracking type cannot have its job parameters overridden by the OpCon job master record. The job must be accepted as defined by the original submitting user or other job.

Differing from some other OpCon Agents, the IBM i LSAM Job Tracking type does interrupt the IBM i job submission process. The exit program stores all the job parameters until a job start request is received from the SAM process in OpCon. If SAM does not detect the required Schedule and job master record, the start request will be rejected. In this case, the LSAM job tracking log registers the rejection. When a job tracking job start request has been rejected, the job tracking master record can be used by an LSAM menu function to manually start the job, or the LSAM Configuration function (main menu, option 7) can be used to automatically override the error code SMA0014 so that the tracked job will be allowed to restart, even though the OpCon SAM error is registered in the LSAM job tracking log file.

## Job Queuing

- Uses SBMJOB exit program technique.
- Requires pre-configured LSAM job profiles.
- Requires pre-configured OpCon job master record, else could prevent job start.
- Interrupts IBM i SBMJOB process; restarted by LSAM using stored job parameters.
- IBM i job parameters can be overridden by OpCon.
- Can control with job dependencies, and subsequent jobs can be dependent.
- Supports OpCon job master message management and spool file management.

The detailed description for Job Tracking, above, also applies to Job Queuing, except that the OpCon external event command used for this type is $JOB:QUEUE. The one important difference of the Queuing type is noted in attribute 6: The OpCon job master details can be used to override the original submitter's job definition. Similarly, OpCon job dependencies can control when the IBM i job will be released by the LSAM for processing.

## True Passive Job Tracking

- Uses the IBM i subsystem notification by data queue technique.
- Requires pre-configured LSAM job profiles.
- Requires pre-configured OpCon job master record, but this will not prevent the job start.
- Does not interrupt the IBM i SBMJOB process. LSAM stores job parameters after the fact.
- IBM i job parameters cannot be overridden by OpCon.
- Cannot control with job dependencies, but subsequent jobs can be dependent.
- Does not support OpCon job master message management and spool file management.
 
True Passive means that the IBM i LSAM learns about new jobs starting (and about jobs ending) indirectly. Job start (and end) transactions are generated by IBM i and placed into data queues that the LSAM monitors, so information about jobs is delivered to the LSAM after the job has already been generated by IBM i and placed in a job queue. By the time the LSAM is able to send the $JOB:TRACK event command to OpCon, the job is typically already active, and short jobs could already be completed before OpCon shows them.

The True Passive type is a different form of Job Tracking, so Job Queuing is not supported by the True Passive methods. By definition, a passively tracked job cannot be prevented from starting by OpCon. 

This type of job tracking is critical for software applications that expect to receive a message directly from IBM i reporting the ID of the job that was just submitted. (The SBMJOB exit program technique prevents this message from being received by the job submitter.)

The LSAM programs that enable True Passive Job Tracking are described in Components and Operation -\> Operating the LSAM -\> Alternate Job Notify Service. It is required to configure and activate this service in order to use the True Passive method of job tracking. Alternate Job Notify services are configured separately for each IBM i subsystem + job queue where jobs must be tracked.

The True Passive tracking type should be used only when required by IBM i software applications. It requires more work and complex configuration of a separate LSAM service job. In addition, this tracking type is inflexible, as compared to Job Queuing. But its advantage is that OpCon can still report on jobs and manage dependencies based on the completion status of these jobs, while not interrupting the IBM i job submission process.

## Automatic Job Tracking

- Can use either the SBMJOB exit program technique or notification by data queue.
- Requires only generalized LSAM job profile configurations instead of one record per job.
- Does not require pre-configured OpCon job master records. 
- May or may not interrupt the IBM i SBMJOB process. LSAM stores job parameters.
- IBM i job parameters cannot be overridden by OpCon.
- Cannot control with job dependencies, and subsequent jobs cannot be dependent.
- Does not support OpCon job master message management, spool file management, or the variables tab.
- Can use OpCon Notification Manager Machine or Schedule Groups with Job Triggers to notify about failed jobs.
 
The Automatic Job Tracking type is a hybrid, since it is a tracking method that can be based on either the Job Tracking type or the True Passive Job Tracking type (but not the Job Queuing type). The term "automatic" refers to the absence of an OpCon job master record. When the SAM in OpCon receives a $JOB:TRACK event command and there is no matching job master record on the OpCon schedule named by the command, a new daily (only) job record will be added to the OpCon database. This causes the job to appear on the named OpCon schedule.

Automatic job tracking is an easy way to have OpCon develop a full picture of all jobs that are executed in IBM i related to a particular schedule. It requires no pre-configuration in OpCon and only a couple of limited and generalized option settings in the IBM i LSAM database. The only constraint about Automatic job tracking is that jobs in the IBM i system to be tracked must have been submitted by a job that OpCon started or is tracking, or they must match an LSAM Job Tracking
automatic tracking profile. This is necessary so that the IBM i LSAM will know which OpCon schedule should have jobs added to it.

The benefits of Automatic tracking include an ability to monitor the progress and completion status of jobs without having to configure for each job in advance. At the same time, the resulting list of daily jobs on an OpCon schedule could be used as a guide for later configuration of OpCon, if the goal is to apply the full set of OpCon automation techniques to the new list of jobs. It could otherwise require a great deal of IBM i job flow analysis to discover the complete list of job names.

The disadvantage of Automatic tracking is that most of the OpCon job control features cannot be used because there is no job master record, which is required to configure job attributes and dependencies. As well, OpCon cannot keep a history of Automatically tracked jobs without a job master record as the anchor point for the history. However, the OpCon Notification Manager can trigger response events for any job completion status by means of the Notification Manager Machine Groups or  Schedule Groups.

## Job Capture

- Uses SBMJOB exit program technique.
- Requires pre-configured LSAM job profiles, plus a temporary activation of Capture Mode.
- Interrupts the IBM i SBMJOB process and (intentionally) prevents the job from starting.
- IBM i LSAM stores all job parameters, including the command line and LDA data.
- There is no communication with OpCon about captured jobs.

Job Capture is a specialized application of the Job Tracking type, defined above. There is no communication with OpCon because this feature is designed only to capture IBM i job definitions and store them for later use. When the job capturing mode is activated in the LSAM the submitted job is not allowed to start. Instead, the SBMJOB start request is discarded after all the job parameters are captured and stored in the IBM i LSAM database.

The purpose of capturing job details is to create a comprehensive job profile that can be reused many times. An LSAM command is executed by an IBM i batch job defined in OpCon, and the command names the identifier that was assigned to the job definition during the capture process. Job capture is useful when software applications may involve a complex job initiation process. In some cases it is much more efficient and easier to maintain job automation if the complex initiation process results can be captured. Later, it is very simple to reuse the captured definition, instead of having to define OpCon and LSAM automation of the entire setup process.

In support of captured job definitions, the IBM i LSAM Dynamic Variables can be used in multiple ways, as defined later in this topic. Dynamic Variables make it possible to adjust date-sensitive job parameters to match the current processing day  and any special requirements such as variations at end-of-month. Even the LDA (IBM i local data area) contents can be adjusted using type-L Dynamic Variables, just as a captured job definition is being used to start a new instance of the job.

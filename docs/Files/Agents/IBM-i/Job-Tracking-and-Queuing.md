---
lang: en-us
title: Job Tracking and Queuing
viewport: width=device-width, initial-scale=1.0
---

# Job Tracking and Queuing

The Job Tracking and Queuing feature allows external (user-submitted)
jobs to be tracked, queued or captured for processing by OpCon. This
feature is used for three general purposes.

-   First, it enables OpCon to become aware of jobs that are started by
    IBM i users or by other jobs, but not by an OpCon schedule or event.
-   Second, it provides support for managing IBM i job features, such as
    the local data area (LDA) associated with a job, that cannot easily
    be managed directly by OpCon from outside of the IBM i operating
    system.
-   Third, the same underlying tools support capturing complete IBM i
    job definitions so that they can be adapted and reused later,
    possibly many times, by direct OpCon job start requests.

[]{#aanchor0} For all jobs started in the IBM i system, one of two techniques may be used to check if jobs should be intercepted by the
LSAM and reported to OpCon. Jobs are qualified for different types of
job tracking, as defined next in this topic. As jobs are intercepted,
the LSAM preserves the job\'s attributes, including the command line and
the local data area (LDA) contents, in LSAM master files. IBM i LSAM
Dynamic Variables may be used to modify the content of any job\'s LDA or
to modify any other job parameter. Dynamic Variables are especially
useful for captured job definitions.

-   Prepare OpCon to track external jobs by addressing the following
    topics, as discussed in this topic:
    -   Configuring the LSAM\'s job tracking control information.
    -   Configuring predefined jobs in the IBM i LSAM for External Job
        Tracking (if required).
    -   Identifying the External Job(s) in the OpCon Enterprise Manager
        by adding them to the special AdHoc schedule, or to any other
        named schedule (if required).
-   Prepare OpCon to capture jobs that are predefined by third party
    software by addressing the following topics, as discussed in this
    topic:
    -   Temporarily registering a job or a workstation to utilize the
        LSAM\'s Capture Job tool.
    -   Optionally defining dynamic variables, and/or working with
        captured job information.
    -   Building job master records in the OpCon Enterprise Manager that
        can execute jobs previously captured by the LSAM tool.

+----------------------------------+----------------------------------+
| ![White \"X\" icon on red        | **WARNING:** [When using         | | circular                         | multiple LSAM environments, it   |
| background](../../../Reso        | is only possible to start job    |
| urces/Images/warning-icon(48x48) | tracking from one environment at |
| .png "Warning icon") | a time.]             |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | The reason for this restriction  |
|                                  | is that job tracking is a        |
|                                  | system-wide function that is     |
|                                  | managed by manipulating the exit |
|                                  | points for the system command to |
|                                  | submit jobs (SMBJOB). The exit   |
|                                  | program for LSAM job tracking    |
|                                  | can only be registered for one   |
|                                  | LSAM environment at a time. Job  |
|                                  | tracking must be stopped in one  |
|                                  | environment before starting it   |
|                                  | from another environment. As     |
|                                  | with all tasks involving         |
|                                  | multiple environments, this      |
|                                  | requires careful coordination    |
|                                  | with SAM-SS of OpCon/xps.        |
+----------------------------------+----------------------------------+

## Introduction to Tracking Types

The general LSAM Job Tracking set up and maintenance tools described in
this topic are configured in different ways depending on the purpose for
using tracking, and on the third-party application software that may
have its jobs intercepted for tracking.

 

The LSAM may employ two different techniques for tracking jobs. The most
commonly used technique is supported by the IBM i exit program register
(which can be viewed and maintained manually by the IBM i command
WRKREGINF). This technique registers an LSAM program as the exit program
that is called any time the IBM i SBMJOB (Submit Job) command from
library QSYS is used, anywhere in the system. The other technique is
supported by registering a data queue that will receive trigger or \"job
notify\" transactions from the IBM i system any time a job enters a
designated IBM i job queue, and/or whenever a job from the designated
job queue ends its processing.

 

Following is a list of the different types of tracking tasks managed by
this LSAM feature. The list identifies which tracking technique is used
for each task. It is often important to understand the difference among
these tracking types when using the LSAM job tracking maintenance
functions according to the step-by-step instructions that follow later
in this document. Notice the listed attributes of each type in order to
understand what purposes may be served by each type.

 

There is more information about actually configuring for and operating
with each tracking type in the remainder of this topic. Additional
background information and technical details are offered in [How LSAM Job Tracking Works](#How).

### Job Tracking

-   Uses SBMJOB exit program technique.
-   Requires pre-configured LSAM job profiles.
-   Requires pre-configured OpCon job master record, else could prevent
    job start.
-   Interrupts IBM i SBMJOB process; restarted by LSAM using stored job
    parameters.
-   IBM i job parameters cannot be overridden by OpCon.
-   Cannot control with job dependencies, but subsequent jobs can be
    dependent.
-   Supports OpCon job master message management and spool file
    management.

Using the SBMJOB exit program technique, the LSAM uses user-supplied
values that are registered in an LSAM database file to filter out the
desired jobs from every job that would be started by the SBMJOB command.
Jobs that are marked for this specific \"Tracking\" method are sent to
OpCon by means of the \$JOB:TRACK external event command. The command
uses the LSAM database file parameters to specify which OpCon Schedule
will show the job.

 

Jobs of type \"Tracked\" (that are not marked for \"Automatic\"
processing - refer to below) require that an OpCon job master record
must exist on the Schedule named by the LSAM parameters. This tracking
type cannot have its job parameters overridden by the OpCon job master
record. The job must be accepted as defined by the original submitting
user or other job.

 

Differing from some other OpCon Agents, the IBM i LSAM Job Tracking type
does interrupt the IBM i job submission process. The exit program stores
all the job parameters until a job start request is received from the
SAM process in OpCon. If SAM does not detect the required Schedule and
job master record, the start request will be rejected. In this case, the
LSAM job tracking log registers the rejection. When a job tracking job
start request has been rejected, the job tracking master record can be
used by an LSAM menu function to manually start the job, or the LSAM
Configuration function (main menu, option 7) can be used to
automatically override the error code SMA0014 so that the tracked job
will be allowed to restart, even though the OpCon SAM error is
registered in the LSAM job tracking log file.

### Job Queuing

-   Uses SBMJOB exit program technique.
-   Requires pre-configured LSAM job profiles.
-   Requires pre-configured OpCon job master record, else could prevent
    job start.
-   Interrupts IBM i SBMJOB process; restarted by LSAM using stored job
    parameters.
-   IBM i job parameters can be overridden by OpCon.
-   Can control with job dependencies, and subsequent jobs can be
    dependent.
-   Supports OpCon job master message management and spool file
    management.

The detailed description for Job Tracking, above, also applies to Job
Queuing, except that the OpCon external event command used for this type
is \$JOB:QUEUE. The one important difference of the Queuing type is
noted in attribute 6: The OpCon job master details can be used to
override the original submitter\'s job definition. Similarly, OpCon job
dependencies can control when the IBM i job will be released by the LSAM
for processing.

### True Passive Job Tracking

-   Uses the IBM i subsystem notification by data queue technique.
-   Requires pre-configured LSAM job profiles.
-   Requires pre-configured OpCon job master record, but this will not
    prevent the job start.
-   Does not interrupt the IBM i SBMJOB process. LSAM stores job
    parameters after the fact.
-   IBM i job parameters cannot be overridden by OpCon.
-   Cannot control with job dependencies, but subsequent jobs can be
    dependent.
-   Does not support OpCon job master message management and spool file
    management.

True Passive means that the IBM i LSAM learns about new jobs starting
(and about jobs ending) indirectly. Job start (and end) transactions are
generated by IBM i and placed into data queues that the LSAM monitors,
so information about jobs is delivered to the LSAM after the job has
already been generated by IBM i and placed in a job queue. By the time
the LSAM is able to send the \$JOB:TRACK event command to OpCon, the job
is typically already active, and short jobs could already be completed
before OpCon shows them.

 

The True Passive type is a different form of Job Tracking, so Job
Queuing is not supported by the True Passive methods. By definition, a
passively tracked job cannot be prevented from starting by OpCon.

 

This type of job tracking is critical for software applications that
expect to receive a message directly from IBM i reporting the ID of the
job that was just submitted. (The SBMJOB exit program technique prevents
this message from being received by the job submitter.)

 

The LSAM programs that enable True Passive Job Tracking are described in
Components and Operation -\> Operating the LSAM -\> Alternate Job Notify
Service. It is required to configure and activate this service in order
to use the True Passive method of job tracking. Alternate Job Notify
services are configured separately for each IBM i subsystem + job queue
where jobs must be tracked.

 

The True Passive tracking type should be used only when required by IBM
i software applications. It requires more work and complex configuration
of a separate LSAM service job. In addition, this tracking type is
inflexible, as compared to Job Queuing. But its advantage is that OpCon
can still report on jobs and manage dependencies based on the completion
status of these jobs, while not interrupting the IBM i job submission
process.

### Automatic Job Tracking

-   Can use either the SBMJOB exit program technique or notification by
    data queue.
-   Requires only generalized LSAM job profile configurations instead of
    one record per job.
-   Does not require pre-configured OpCon job master records.
-   May or may not interrupt the IBM i SBMJOB process. LSAM stores job
    parameters.
-   IBM i job parameters cannot be overridden by OpCon.
-   Cannot control with job dependencies, and subsequent jobs cannot be
    dependent.
-   Does not support OpCon job master message management, spool file
    management, or the variables tab.
-   Can use OpCon Notification Manager Machine or Schedule Groups with
    Job Triggers to notify about failed jobs.

The Automatic Job Tracking type is a hybrid, since it is a tracking
method that can be based on either the Job Tracking type or the True
Passive Job Tracking type (but not the Job Queuing type). The term
\"automatic\" refers to the absence of an OpCon job master record. When
the SAM in OpCon receives a \$JOB:TRACK event command and there is no
matching job master record on the OpCon schedule named by the command, a
new daily (only) job record will be added to the OpCon database. This
causes the job to appear on the named OpCon schedule.

 

Automatic job tracking is an easy way to have OpCon develop a full
picture of all jobs that are executed in IBM i related to a particular
schedule. It requires no pre-configuration in OpCon and only a couple of
limited and generalized option settings in the IBM i LSAM database. The
only constraint about Automatic job tracking is that jobs in the IBM i
system to be tracked must have been submitted by a job that OpCon
started or is tracking, or they must match an LSAM Job Tracking
automatic tracking profile. This is necessary so that the IBM i LSAM
will know which OpCon schedule should have jobs added to it.

 

The benefits of Automatic tracking include an ability to monitor the
progress and completion status of jobs without having to configure for
each job in advance. At the same time, the resulting list of daily jobs
on an OpCon schedule could be used as a guide for later configuration of
OpCon, if the goal is to apply the full set of OpCon automation
techniques to the new list of jobs. It could otherwise require a great
deal of IBM i job flow analysis to discover the complete list of job
names.

 

The disadvantage of Automatic tracking is that most of the OpCon job
control features cannot be used because there is no job master record,
which is required to configure job attributes and dependencies. As well,
OpCon cannot keep a history of Automatically tracked jobs without a job
master record as the anchor point for the history. However, the OpCon
Notification Manager can trigger response events for any job completion
status by means of the Notification Manager Machine Groups or Schedule
Groups.

### Job Capture

-   Uses SBMJOB exit program technique.
-   Requires pre-configured LSAM job profiles, plus a temporary
    activation of Capture Mode.
-   Interrupts the IBM i SBMJOB process and (intentionally) prevents the
    job from starting.
-   IBM i LSAM stores all job parameters, including the command line and
    LDA data.
-   There is no communication with OpCon about captured jobs.

Job Capture is a specialized application of the Job Tracking type,
defined above. There is no communication with OpCon because this feature
is designed only to capture IBM i job definitions and store them for
later use. When the job capturing mode is activated in the LSAM the
submitted job is not allowed to start. Instead, the SBMJOB start request
is discarded after all the job parameters are captured and stored in the
IBM i LSAM database.

 

The purpose of capturing job details is to create a comprehensive job
profile that can be reused many times. An LSAM command is executed by an
IBM i batch job defined in OpCon, and the command names the identifier
that was assigned to the job definition during the capture process. Job
capture is useful when software applications may involve a complex job
initiation process. In some cases it is much more efficient and easier
to maintain job automation if the complex initiation process results can
be captured. Later, it is very simple to reuse the captured definition,
instead of having to define OpCon and LSAM automation of the entire
setup process.

 

In support of captured job definitions, the IBM i LSAM Dynamic Variables
can be used in multiple ways, as defined later in this topic. Dynamic
Variables make it possible to adjust date-sensitive job parameters to
match the current processing day and any special requirements such as
variations at end-of-month. Even the LDA (IBM i local data area)
contents can be adjusted using type-L Dynamic Variables, just as a
captured job definition is being used to start a new instance of the
job.

## Using LSAM Job Tracking Functions

This section provides a simple outline of the steps required to utilize
the various functions of the LSAM\'s job tracking feature. There are
important explanations of how these functions work in the following
section of this topic. It is important to understand that discussion
because the LSAM job tracking feature alters the way IBM i job
management behaves. These changes could impact other software that is
running under IBM i.

 

Certain of the following procedure outlines make reference to LSAM
maintenance functions that are described in detail in a following
section: [Job Tracking and Queuing Screens and Windows](#Job6){.MCXref
.xref}. References to OpCon procedures, such as adding a job to an OpCon
schedule, are described in detail in the [Using Job Master](https://help.smatechnologies.com/opcon/core/latest/Files/UI/Enterprise-Manager/Using-Job-Master.md#top){.MCXref
.xref} section of the **Enterprise Manager** online help.

### Operating Job Tracking

The general capabilities of the LSAM to perform job tracking, queuing or
capture are all supported by the LSAM programs that either (1) add or
remove registered exit programs in IBM i, or (2) perform the alternate
job notify service (used for True Passive job tracking). Starting Job
Tracking completes the exit point registration for processing the IBM i
SBMJOB command, and then the LSAM Job Tracking status function reports
that the Job Tracking status is STARTED. Starting the Alternate Job
Notify service is a separate process that is also required only if True
Passive tracking will be used. For more information, refer to [Alternate Job Notify Service](Components-and-Operation.md#Alternat2){.MCXref
.xref}.

 

Master and control file maintenance functions found in the LSAM Job
Tracking menu do not require that Job Tracking be started.

 

The purpose of the LSAM\'s Tracking and Queuing functions, separate from
Capturing a job, is to intercept a job that has been submitted by an IBM
i user or another batch job, rather than directly by the OpCon SAM, so
that the job can be monitored by OpCon. Both tracking and queuing are
manage in the same way. Refer to the introduction to Tracking Types at
the start of this topic, and also to [How LSAM Job Tracking Works](#How).

#### Starting Job Tracking

Enable the LSAM Job Tracking functions by using the two following
procedure.

 

[Option One: Start Job Tracking through LSAM Menus]{.ul} 
1.  Log on to an IBM i workstation with a user profile that has LSAM
    Administrator privileges.
2.  Enter the LSAM menu system by entering the command
    **SMAGPL/STRSMA**.
3.  Enter **1** to choose the **Job Tracking menu**.
4.  Enter **3** to **Start job track (STRJOBTRK)**.
5.  Enter **5** to **Check job track status (JOBTRKSTS)**.
    a.  A window will display either STARTED or STOPPED. The status must
        show STARTED in order for Job Tracking to work.

[Option Two: Start Job Tracking Using a Manual C7ommand]{.ul} 
1.  Log on to IBM i from a workstation or start a job with command entry
    access with a user profile that has LSAM Administrator privileges.
    a.  It is possible for a user-written CL program to perform this
        manual procedure.
2.  Ensure that the LSAM environment library list is in effect for the
    command entry session.
3.  To start Job Tracking manually, enter **STRJOBTRK** in the command
    line.
4.  The ability to use this command from iSeries Navigator will depend
    on environmental controls. It is required that the LSAM library list
    be in effect as the STRJOBTRK command is used.

For instructions about starting the Alternate Job Notify service of the
LSAM, required only when True Passive tracking will be used, refer to
the instructions under [Alternate Job Notify Service](Components-and-Operation.md#Alternat2).

#### Stopping Job Tracking

Disable the LSAM Job Tracking functions by using one of the two
following procedures.

 

[Option One: Stopping Job Tracking Through LSAM Menus]{.ul} 
1.  Log on to an IBM i workstation with a user profile that has LSAM
    Administrator privileges.
2.  Enter the LSAM menu system by entering the command
    **SMAGPL/STRSMA**.
3.  Enter **1** to choose the **Job Tracking menu**.
4.  Enter **4** to **End job track (ENDJOBTRK)**.
5.  Enter **5** to **Check job track status (JOBTRKSTS)**.
    a.  A window will display either STARTED or STOPPED. The status will
        show STOPPED if the Job Tracking function has been successfully
        disabled.

[Option Two: Start Job Tracking Using a Manual Command]{.ul} 
1.  Log on to IBM i from a workstation or start a job with command entry
    access with a user profile that has LSAM Administrator privileges.
    a.  It is possible for a user-written CL program to perform this
        manual procedure.
2.  Ensure that the LSAM environment library list is in effect for the
    command entry session.
3.  To start Job Tracking manually, enter **STRJOBTRK** in the command
    line.
4.  The ability to use this command from iSeries Navigator will depend
    on environmental controls. It is required that the LSAM library list
    be in effect as the STRJOBTRK command is used.

For instructions about stopping the Alternate Job Notify service of the
LSAM, required only when True Passive tracking will be used, refer to
the instructions in [IBM i Components and Operation](Components-and-Operation.md#top).

#### Tracking or Queuing an External Job

Use these procedures to cause any job started within IBM i by the SBMJOB
command from the QSYS system library to be monitored by OpCon. Tracking
allows OpCon monitoring without subjecting the job to any OpCon schedule
constraints. Queuing does the same thing, but also allows OpCon schedule
dependencies to restrict when the job will be allowed to execute.

##### The AdHoc Schedule

SMA recommends adding jobs to be tracked or queued to the AdHoc schedule
for the following reasons:

-   The schedule is dynamically added to the Daily Tables when SAM-SS is
    informed of a job on the schedule that is to be tracked.
-   Once active, the schedule remains open until midnight when it is
    allowed to go to a completed state. All jobs on the schedule must
    finish before the schedule closes.

If jobs to be tracked are on user-defined (named) schedules, those
schedules must be built and must be active in the Daily Tables for the
SAM-SS to track or queue the job(s). Refer to the special instructions
for Using a Named Schedule in the following section after instructions
about the AdHoc schedule.

 

[Set Up Job Tracking for AdHoc Schedule]{.ul} 
1.  Log on to an IBM i workstation with a user profile that has LSAM
    Administrator privileges.
2.  Enter the LSAM menu system by entering the command **STRSMA**.
3.  Enter **1** to choose the **Job Tracking menu**.
4.  Enter **1** to maintain **Job track parameters**.
5.  Press \<**F6**\> to open the Add Job tracking parameters window.
6.  Type the values that define when a job will qualify for Tracking.
    a.  Specify and take note of the Job Name, for use in the OpCon
        Enterprise Manager.
        i.  The job name may be predefined by third-party software where
            the SBMJOB action will take place.
    b.  The values for the Job Description, Job Description Library, Job
        Queue and Job Queue Library may be set to the special value of
        \*ALL to accept any value, or a specific name may be entered
        into any of theses fields. Specific names are compared to the
        actual job intercepted for Tracking, to qualify whether the job
        is accepted for Tracking or simply bypassed and allowed to
        execute.
    c.  Specify \"AdHoc\" for the Schedule name.
    d.  Set the Track Type to \"T\".
7.  In OpCon Enterprise Manager, add a new job master record to the
    AdHoc schedule, specifying the job type of IBM i.
    a.  Be sure that the selected machine name matches the LSAM
        environment where the Tracked job was registered.
8.  Select \"Tracked job\" in the job sub-type pull-down list.
9.  Enter the exact name of the job that was registered in the LSAM Job
    tracking parameters Add screen.
10. Leave job parameters set to the default value of asterisk (\*);
    Tracked jobs will not accept job definition overrides from OpCon.
    a.  It is possible to create and use a User Profile of \* or
        \*CURRENT in OpCon. These values allow the original IBM i job
        user to be preserved. Refer to additional discussion of this
        topic below.
11. Update the job master definition fields.
12. *(Optional)* Use the job master record tabs to
    specify any desired Spool File or Message Management parameters;
    these functions may be used for Tracked jobs.
13. *(Optional)* Job dependencies and events may be
    added that depend on the completion status of this job.
14. In any IBM i job, the tracked job may be started at will by any IBM
    i user or other job.
15. The tracked job must be submitted using the SBMJOB command from the
    QSYS library.
    a.  Do NOT qualify the SBMJOB command with the library (Not:
        QSYS/SBMJOB).
16. The SBMJOB command may be used from an interactive workstation job
    or from a batch job.
17. The SBMJOB command may be typed by an interactive user, or it may be
    embedded within a program.
18. Note the LSAM Job Tracking Number that is reported when the job is
    intercepted.
    a.  For batch jobs, this information may be viewed in the job\'s log
        or in the system operator (QSYSOPR) message queue.
    b.  The LSAM Job Tracking Number, not the same as the IBM i job
        number, may be used with the LSAM command WRKTRKJOB to discover
        the stored job definition and its status within the LSAM job
        tracking system.
19. View the AdHoc schedule to monitor the job status in the OpCon
    Enterprise Manager.

[Set Up Job Queuing for AdHoc Schedule]{.ul} 
1.  Log on to an IBM i workstation with a user profile that has LSAM
    Administrator privileges.
2.  Enter the LSAM menu system by entering the command
    **SMAGPL/STRSMA**.
3.  Enter **1** to choose the **Job Tracking menu** in the SMA Main
    Menu.
4.  Enter **1** to maintain **Job track parameters**.
5.  Press \<**F6**\> to open the Add Job tracking parameters window.
6.  Type the values that define when a job will qualify for Tracking.
    a.  Specify and take note of the Job Name, for use in the OpCon
        Enterprise Manager.
        i.  The job name may be predefined by third-party software where
            the SBMJOB action will take place.
    b.  The values for the Job Description, Job Description Library, Job
        Queue and Job Queue Library may be set to the special value of
        \*ALL to accept any value, or a specific name may be entered
        into any of theses fields. Specific names are compared to the
        actual job intercepted for Tracking, to qualify whether the job
        is accepted for Tracking or simply bypassed and allowed to
        execute.
    c.  Specify \"AdHoc\" for the Schedule name.
    d.  Set the Track Type to \"Q\".
7.  In OpCon/xps Enterprise Manager, add a new job master record to the
    AdHoc schedule, specifying the job type of IBM i.
    a.  Be sure that the selected machine name matches the LSAM
        environment where the Tracked job was registered.
8.  Select \"Batch job\" in the job sub-type pull-down list.
9.  Enter the exact name of the job that was registered in the LSAM Job
    tracking parameters Add screen.
10. Leave job parameters set to the default value of asterisk (\*) in
    order to allow the originally captured (or modified) IBM i job
    parameters to remain in effect, or specify override values in any of
    the job master definition fields.
    a.  Use the predefined value \*SYSVAL for the Job Date field in
        order to specify that the original value of the DATE parameter
        in the IBM i SBMJOB command should be honored.
    b.  It is possible to create and use a User Profile of \* or
        \*CURRENT in OpCon. These values allow the original IBM i job
        user to be preserved. Refer to additional discussion of this
        topic below.
11. *(Optional)* Use the job master record tabs to
    specify any desired Spool File or Message Management parameters.
12. Update the job master definition.
13. Change the Enterprise Manager view to the schedule view.
14. Complete the required schedule entries that specify when this queued
    job will be submitted for execution by OpCon.
15. Update the job master schedule information.
16. *(Optional)* Job dependencies may be added that will
    govern when this job is allowed to execute.
17. *(Optional)* Job dependencies and events may be
    added that depend on the completion status of this job.
18. In any IBM i job, the queued job may be started at will by any IBM i
    user or other job.
19. The queued job must be submitted using the SBMJOB command from the
    QSYS library.
    a.  Do NOT qualify the SBMJOB command with the library (Not:
        QSYS/SBMJOB).
20. The SBMJOB command may be used from an interactive workstation job
    or from a batch job.
21. The SBMJOB command may be typed by an interactive user, or it may be
    embedded within a program.
22. Note the LSAM Job Tracking Number that is reported when the job is
    intercepted.
    a.  For batch jobs, this information may be viewed in the job\'s log
        or in the system operator (QSYSOPR) message queue.
    b.  The LSAM Job Tracking Number, not the same as the IBM i job
        number, may be used with the LSAM command WRKTRKJOB to discover
        the stored job definition and its status within the LSAM job
        tracking system.
23. View the AdHoc schedule to monitor the job status in the OpCon
    Enterprise Manager.

##### Using a Named Schedule

In place of using the AdHoc schedule for Tracked or Queued jobs, it may
sometimes be more obvious, convenient or strategically important to use
any other named OpCon schedule. In this case, the advantages of the
AdHoc schedule are lost and the user becomes responsible for careful and
unique definition of these jobs on user-defined schedules. Those
schedules must be built and must be active in the Daily Tables for the
SAM-SS to track or queue the job(s).

 

The job (or jobs) to be tracked or queued must be added to the OpCon
Master copy of the named schedule, but these jobs must be defined with
Frequency rules that will prevent the job from being automatically
scheduled by OpCon. In other words, when OpCon performs its periodic
automatic build of the Daily schedules that will actually execute, any
Tracked or Queued Job must not appear in the originally built schedule.
Instead, these jobs will be automatically added to the named schedule
whenever the IBM i LSAM detects and qualifies a job for tracking or
queuing, and then sends a \$JOB:TRACK or \$JOB:QUEUE Event command to
OpCon to trigger the addition of that job to the named schedule.

 

  ------------------------------------------------------------------------------------------------------------------------------ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White \"X\" icon on red circular background](../../../Resources/Images/warning-icon(48x48).png "Warning icon")   **WARNING:** [When using named schedules for job tracking or queuing, by definition those jobs should not be automatically added to the daily OpCon schedules. Therefore, any audit of other jobs that may have dependencies on the tracked or queued jobs will report an error, stating that the depended-on job is not found. This is normal and not a critical error. However, OpCon administrators must always verify that this error is due to the job being defined as a tracked or queued job and not to a definition error in the OpCon database.]
  ------------------------------------------------------------------------------------------------------------------------------ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

The instructions for configuring Tracked or Queued jobs are generally
the same as listed above under The AdHoc Schedule. However, observe the
following revised instructions for step 7 that apply when a named
schedule is used instead of the AdHoc schedule. These instructions are
the same for both **Tracked** and **Queued** jobs.

 

[Set Up Job Tracking or Queuing for a Named Schedule]{.ul} 
1.  In the OpCon User Interface, add a new job master record to the
    Named Schedule, specifying the job type of IBM i.
    a.  Be sure that the selected machine name matches the LSAM
        environment where the Tracked job was registered.
    b.  Assign a special Frequency to each Tracked or Queued job
        (different from other types of jobs in the same schedule), so
        that the effect of the Frequency will be to prevent OpCon from
        building this job into the Daily schedule each time the Schedule
        is rebuilt from the Master definitions. One example of a
        technique that may be used to accomplish this is to choose a
        Frequency of \"On Request\" and then select a calendar date that
        is in the past.
    c.  Take note of the name of the Frequency used for each Tracked and
        Queued job, as this value may optionally be used within the IBM
        i LSAM Tracked Job Parameters to identify the correct schedule
        in OpCon that should track or queue the job.
    d.  The Schedule Date is also very important when defining a Tracked
        or Queued job in the LSAM Job Tracking Parameters. Be sure to
        examine the master plan for OpCon schedules to determine if it
        is possible for more than one instance of the same Schedule Name
        to be active in OpCon processing at the same time. Also examine
        the history of the Named Schedule (if available) and the planned
        start time to determine if a Tracked or Queued Job might not be
        intercepted by the LSAM until after midnight of the schedule
        build date.

#### Managing Tracked or Queued Job Failures

Circumstances may arise that will prevent the automated steps of job
tracking or queuing from completing normally. Sometimes, if the LSAM
should become disconnected from OpCon, it will be impossible for OpCon
to cause a tracked or queued job to be released from the LSAM job
tracking master files where it was held.

 

An IBM i operator or administrator may decide that a tracked or queued
job must be manually released from the LSAM job tracking system, rather
than waiting until the problem with OpCon/xps, or with the job
tracking/queuing configuration, has been solved. If this decision is
made, the LSAM will attempt to report to OpCon/xps that the tracked or
queued job was manually released so that OpCon/xps can update the job
status in the OpCon/xps schedule.

 

[Manually Releasing a Tracked or Queued Job]{.ul} 
1.  Log on to an IBM i workstation with a user profile that has LSAM
    Administrator privileges.
2.  It is possible to work with tracked jobs from command entry or from
    the LSAM menu system.
3.  From command entry, enter the command **SMAGPL/WRKTRKJOB**.
    a.  It is not necessary Ensure that the LSAM environment library
        list is in effect for the command entry session. The LSAM sets a
        system-wide control value that tells the WRKTRKJOB command which
        LSAM environment is active for Job Tracking.
4.  From the LSAM menu system, enter the LSAM menu system by entering
    the command **SMAGPL/STRSMA**.
5.  Enter **1** to choose the **Job Tracking menu**.
6.  Enter **2** to work with **Job track logs (WRKTRKJOB)**.
7.  Work with Tracked Jobs, use the Job Track Logs list display function
    keys and operational fields to locate the record(s) pertaining to
    the desired Job Tracking Number.
    a.  Remember, the Job Tracking Number is not the same as the IBM i
        job number. In fact, the IBM i job number is not determined
        until after a tracked or queued job has been released for
        execution.
8.  Examine the job status to be sure the job has not already been
    released.
    a.  The [Sts]{.ul} column in the list display shows the status value         in effect for each job log entry that applies to a job number.
    b.  Option 5=Display detail may be used to view the interpretation
        of the job status field.
9.  A tracked or queued job may be manually released from either the
    list display or the details display.
    a.  From the list display, type option 6=Release job next to any log
        entry for the desired job number and press \<**Enter**\> to
        initiate the release process.
    b.  From the log entry details display, the function key F22=RLSJOB
        (release job) may be used to initiate the release process.
10. A window appears requesting whether the job should be released into
    Hold status in an IBM i job queue.
    a.  If \"N\" (no) is specified for the HOLD option, the job will
        begin execution immediately after pressing \<**Enter**\> from
        the HOLD window display.
    b.  A message normally appears at the bottom of the display
        reporting the IBM i submitted job ID.
11. The LSAM programs will attempt to report the manual job release to
    OpCon. This automatic activity is not visible from IBM i command
    entry, but the results may appear in the OpCon AdHoc schedule entry,
    if this job name appears on that schedule.

#### Enabling True Passive Tracking

In many ways, the True Passive type of job tracking is the same as the
Job Tracking type. It requires similar preparation and it is also
constrained in the same ways as Tracking (versus Queuing). Passive job
tracking cannot take advantage of the Queuing features because the IBM i
job is already started before OpCon is notified about the job. Passive
job tracking uses the Alternate Job Notify technique instead of the
SBMJOB exit program technique to detect job starts.

 

[Set Up True Passive Job Tracking]{.ul} 
1.  Log on to an IBM i workstation with a user profile that has LSAM
    Administrator privileges.
2.  Enter the LSAM menu system by entering the command **STRSMA**.
3.  Enter **6** to choose the **LSAM Management menu** in the SMA Main
    Menu.
4.  Enter **8** to choose the **Alternate Job Notify** sub-menu.
5.  If not already completed, perform the [Instructions for Configuring     the Alternate Job Notify
    Service](Components-and-Operation.md#Instruct)
    for the IBM i subsystem where the job will execute.
6.  Use function key \<**F12**\> as necessary to return to the **LSAM
    Main Menu**.
7.  Enter **1** to choose the **Job Tracking menu**.
8.  Enter **1** to maintain **Job track parameters**.
9.  Press \<**F6**\> to open the Add Job tracking parameters window.
10. Type the values that define when a job will qualify for Passive
    tracking, then press \<**Enter**\> to record the data.
    a.  Specify and take note of the Job Name, for use in the OpCon
        Enterprise Manager.
        i.  The job name may be predefined by third-party software where
            the SBMJOB action will take place.
    b.  The values for the Job Description, Job Description Library, Job
        Queue and Job Queue Library may be set to the special value of
        \*ALL to accept any value, or a specific name may be entered
        into any of theses fields. Specific names are compared to the
        actual job intercepted for Tracking, to qualify whether the job
        is accepted for Tracking or simply bypassed and allowed to
        execute.
    c.  Specify \"AdHoc\" or a user-defined value for the Schedule name.
    d.  Set the Track Type to \"P\".
11. In OpCon Enterprise Manager, add a new job master record to the
    AdHoc or other named schedule, specifying the job type of IBM i.
12. Be sure that the selected machine name matches the LSAM environment
    where the Tracked job was registered.
13. Select \"Tracked job\" in the job sub-type pull-down list. (This
    value must be used for Passive tracking.)
14. Enter the exact name of the job that was registered in the LSAM Job
    tracking parameters Add screen.
15. Leave job parameters set to the default value of asterisk (\*);
    passively tracked jobs will not accept job definition overrides from
    OpCon.
    a.  It is possible to create and use a User Profile of \* or
        \*CURRENT in OpCon. These values avoid confusion about the IBM i
        job user name, though it cannot be changed in the IBM i job that
        is already executing. Refer to additional discussion of this
        topic below.
16. Update the job master definition fields.
17. Note that Spool File and Message Management parameters cannot be
    used with True Passive job tracking, since the IBM i job is already
    active or may already be finished before tracking starts. However,
    these tabs are not disabled for the OpCon job sub-type of Job
    Tracking.
18. *(Optional)* Job dependencies and events may be
    added that depend on the completion status of this job.
19. In any IBM i job, the tracked job may be started at will by any IBM
    i user or other job.
20. Unlike the basic Job Tracking type, True Passive tracking does not
    depend on the SBMJOB command. Therefore, passive job tracking can be
    used regardless of the IBM i or application software commands that
    have initiated the job. Passive tracking depends instead on the IBM
    i subsystem where the job will execute.
21. Investigating the results of True Passive job tracking:
    a.  To discover the outcome of an attempt to passively track an IBM
        i job, use the Job Tracking Menu option **2** or the LSAM
        command **WRKTRKJOB** to start the Job Track Logs function, and
        search for the job by its job name. Option **5=Display** can
        then be used to view the job details where there may be
        additional information that explains any error code which may
        appear when tracking was not successful. If the cause is not
        obvious, contact SMA Support for assistance.
    b.  If True Passive job tracking should fail to assign a Job
        Tracking Number, there will typically be an error code
        identifying this error, assigned to the tracked job name in the
        Job Track Logs function. If it is not apparent what caused this
        failure, please contact SMA Support for assistance. One typical
        cause of this error can be system timing issues, and these can
        be adjusted using \"Delay job end notify proc\" value in the
        **Alternate Job Notify Configuration** function, which is option
        **7** on the Alternate Job Notify sub-menu. For more
        information, refer to [Alternate Job Notify         Configuration](Components-and-Operation.md#Alternat4){.MCXref
        .xref}.
22. View the AdHoc or other named schedule to monitor the job status in
    the OpCon Enterprise Manager.

#### Configuring Automatic Tracking

Automatic job tracking uses less specific rules, since it is not
necessary to configure either the IBM i LSAM nor any OpCon job master
records for each job to enable this feature. Automatic job tracking uses
a form of the basic Job Tracking type, and it cannot use the Queuing
type. However, Automatic job tracking can be performed for Passively
tracked jobs, or for actively tracked jobs (using the SBMJOB exit
program technique), depending on the constraints of the software
application that starts the jobs to be tracked.

 

Remember that Automatic job tracking only works for jobs that are
started by another job which is already known to OpCon and the IBM i
LSAM, or for jobs that match the LSAM Job Tracking Parameter automatic
tracking rules. This is because the IBM i LSAM programs must discover
the associated OpCon Schedule name of the submitting job in order to
automatically assign the submitted job to that same Schedule. But once a
job is tracked automatically, this new job becomes known to OpCon and
the LSAM, therefore any additional jobs that it submits could also be
qualified for (or prevented from) automatic tracking.

 

The following instructions are vague about the Job Tracking Parameter
Type and Auto-Track Sub-Programs control fields because there are
multiple valid combinations used for varying purposes. More information
about these controls may be found in [How LSAM Job Tracking Works](#How).

 

[Set Up Automatic Job Tracking]{.ul} 
1.  Log on to an IBM i workstation with a user profile that has LSAM
    Administrator privileges.
2.  Enter the LSAM menu system by entering the command **STRSMA**.
3.  Enter **1** to choose the **Job Tracking menu** in the SMA Main
    Menu.
4.  Enter **7** to choose **Job Tracking Configuration**.
5.  For the control field **Allow automatic tracking** enter a value of
    **1** or **2** to specify the automatic job selection method. (Refer
    to [How LSAM Job Tracking Works](#How) for more
    information about choosing the positive or negative selection
    method.)
6.  Press \<**Enter**\> to update the Job Tracking Configuration values,
    and return to the menu.
7.  Enter **1** to maintain **Job track parameters**.
8.  Press \<**F6**\> to open the Add Job tracking parameters window.
9.  Type the values that define when a job will qualify for Automatic
    tracking, then press \<**Enter**\> to record the data.
    a.  *(Optional)* Specify and take note of the Job
        Name, or type the special value **\*ALL**.
        i.  The job name may be predefined by third-party software where
            the SBMJOB action will take place.
        ii. Regardless of the value specified for the \"Tracked type\"
            field, this job name will be the name of a primary, or root
            job that will generate one or more additional jobs
            (typically by executing the IBM i SBMJOB command). This job
            and the additional jobs it submits will be either selected
            or prevented from Automatic job tracking.
    b.  The values for the Job Description, Job Description Library, Job
        Queue and Job Queue Library may be set to the special value of
        **\*ALL** to accept any value, or a specific name may be entered
        into any of theses fields. Specific names are compared to the
        actual job intercepted for tracking, to qualify whether the job
        is accepted for, or prevented from Automatic tracking.
    c.  Specify \"AdHoc\" or a user-defined value for the Schedule name.
    d.  Set the Track Type to any supported value, except not \"Q\".
        i.  The Track type of **T** indicates that a job qualified by
            this Parameter set will be actively Tracked.
        ii. The Track type of **A** indicates that both this job and any
            jobs it submits will be Automatically tracked and assigned
            to the named OpCon schedule.
    e.  Set the Aut-track sub-jobs field value to either **A** or **B**
        depending on whether submitted jobs that match this primary job
        profile will be selected for, or prevented from Automatic
        tracking.
10. In OpCon Enterprise Manager, automatic job tracking does not require
    any special configuration in OpCon, since jobs will only qualify for
    automatic tracking if the submitting job is already known to OpCon
    or to the IBM i LSAM.
11. Use the name of the Schedule assigned to the original submitting job
    in order to view the status of automatically tracked jobs that will
    be added to the OpCon Schedule as they start in the IBM i system.
12. *(Optional)* The completion status of an
    automatically tracked job can generate events in OpCon by using the
    Notification Manager. Since there is no job master record for
    automatically tracked jobs, create either a Notification Manager
    Machine Group or a Notification Manager Schedule Group and add a Job
    Trigger.
13. In any IBM i job, the automatically tracked job must either match
    one of the Job Tracking Parameter records in the LSAM database, or
    it must be started by some other job that is already known to OpCon
    and the IBM i LSAM.
14. Unlike the basic Job Tracking type, True Passive tracking does not
    depend on the SBMJOB command. Therefore, passive job tracking can be
    used regardless of the IBM i or application software commands that
    have initiated the job. Passive tracking depends instead on the IBM
    i subsystem where the job will execute.
15. Investigating the results of Automatic Job Tracking:
    a.  To discover the outcome of an attempt to passively track an IBM
        i job, use the Job Tracking Menu option **2** or the LSAM
        command **WRKTRKJOB** to start the Job Track Logs function, and
        search for the job by its job name. Option **5=Display** can
        then be used to view the job details where there may be
        additional information that explains any error code which may
        appear when tracking was not successful. If the cause is not
        obvious, contact SMA Support for assistance.
    b.  If True Passive job tracking should fail to assign a Job
        Tracking Number, there will typically be an error code
        identifying this error, assigned to the tracked job name in the
        Job Track Logs function. If it is not apparent what caused this
        failure, please contact SMA Support for assistance. One typical
        cause of this error can be system timing issues, and these can
        be adjusted using \"Delay job end notify proc\" value in the
        **Alternate Job Notify Configuration** function, which is option
        **7** on the Alternate Job Notify sub-menu. More information
        about passively tracked jobs may also be available in the
        Alternate Job Notify Log display (LSAM menu 6, sub-menu 8,
        option 2). For more information, refer to [Alternate Job Notify         Configuration](Components-and-Operation.md#Alternat4){.MCXref
        .xref}.
16. View the AdHoc or other named schedule to monitor the job status in
    the OpCon Enterprise Manager.

### Operating Job Capture

The general capabilities of the LSAM to perform job tracking, queuing or
capture are all supported by the LSAM programs that add or remove a
registered exit program in IBM i. It is required to Start Job Tracking
before the Capture Job feature can be used, although the LSAM menu
master and control file maintenance functions can be used while Job
Tracking is stopped.

#### Capturing a Job

Use these procedures to prepare for job capture, capture a job
definition and then prepare the job definition for later execution by
OpCon.

 

[Set Up Job Capture]{.ul} 
1.  Log on to an IBM i workstation with a user profile that has LSAM
    Administrator privileges.
2.  Enter the LSAM menu system by entering the command
    **SMAGPL/STRSMA**.
3.  Enter **1** to choose the **Job Tracking menu** in the SMA Main
    Menu.
4.  Enter **5** to **Check job track status (JOBTRKSTS)**.
    a.  The displayed status value must be STARTED in order for job
        capturing to work.
    b.  If the status is STOPPED, use the procedure above to Start Job
        Tracking.
5.  Enter **8** to **Start job capture (STRCAPJOB)**.
    a.  Use the Start Capture Job work display to add the name of the
        job or workstation where the job capture action will be
        performed.

[Capture a Job]{.ul} 
1.  Complete the steps above to set up for job capturing.
2.  Log on to the workstation registered for capturing jobs **- or -**
3.  Start the job named in the Start job capture list.
4.  The job to be captured must be submitted using the **SBMJOB**
    command from the **QSYS** library.
    a.  Do NOT qualify the SBMJOB command with the library (Not:
        QSYS/SBMJOB)
5.  The SBMJOB command may be used from an interactive workstation job
    or from a batch job.
6.  The SBMJOB command may be typed by an interactive user, or it may be
    embedded within a program.
7.  When the SBMJOB command is used from an interactive job, a prompt
    window will appear requesting verification of the Captured Job Id.
    a.  Note the Captured Job ID, for later use with the RUNCAPJOB
        command.
    b.  For batch jobs, the LSAM assumes that the name of the job in the
        SBMJOB command will be used for the Captured Job ID. (This value
        may be changed later, using the WRKCAPJOB function, to produce
        multiple variations from the same original job.)
8.  As soon as the capture job process has completed, go immediately to
    the Stop job capture procedure that follows.
    a.  Multiple job captures may be performed before the job capture
        process is stopped. Each capture will be individually registered
        in the LSAM master files.

[Stop Job Capture]{.ul} 
1.  Log on to an IBM i workstation with a user profile that has LSAM
    Administrator privileges.
2.  Enter the LSAM menu system by entering the command
    **SMAGPL/STRSMA**.
3.  Enter **1** to choose the **Job Tracking menu** in the SMA Main
    Menu.
4.  Enter **9** to **End job capture (ENDCAPJOB)**.
    a.  Use the End Capture Job work display to remove the name of the
        job or workstation where the job capture action was performed.
5.  It is not necessary to stop the general LSAM Job Tracking feature
    after completing a job capture, unless this is desired for some
    other reason.
    a.  Consider the [How LSAM Job Tracking Works](#How)
        section if there is other software in IBM i that may conflict
        with the LSAM Job Tracking exit programs. Especially during the
        conversion process that follows a first installation of the
        LSAM, it may be necessary to stop Job Tracking in order to
        resume normal operations of third-party software after a job
        capture has been completed.

[Modifying a captured job definition]{.ul} 
1.  Log on to an IBM i workstation with a user profile that has LSAM
    Administrator privileges.
2.  Enter the LSAM menu system by entering the command
    **SMAGPL/STRSMA**.
3.  Enter **1** to choose the **Job Tracking menu** in the SMA Main
    Menu.
4.  Enter **11** to **Work with Captured Jobs (WRKCAPJOB)**.
5.  Use the various screens and function keys of the WRKCAPJOB function
    to:
    a.  Change job definition parameters.
    b.  Revise the job command line.
    c.  Edit the job\'s library list.
    d.  Update any local data area (LDA) content associated with the
        job.
6.  *(Optional)* Define Dynamic Variables that may be
    used to update the LDA content or replace values in the job\'s
    parameters or its command line.
7.  *(Optional)* Insert Dynamic Variable tokens into any
    job definition parameter field or into the job command line.
    a.  A dynamic variable token is the name of a dynamic variable
        enclosed in the assigned special characters that denote a token;
        the default characters used to create a token from a dynamic
        variable are the curly brackets, e.g., **{VARNAME}**.

#### Executing a Captured Job

Use these procedures to execute a captured job definition as many times
as may be desired. Captured job definitions are ideally suited for
periodic execution from an OpCon schedule, as compared to Tracking or
Queuing a job which is designed for tracking a single, user-initiated
execution of jobs in IBM i.

 

Captured jobs cannot be started from within IBM i. (Contrast this with
the WRKTRKJOB function, explained above, where an operator may manually
release a tracked or queued job.) Captured jobs are designed
specifically for use by OpCon. The LSAM job scheduler server program
performs many functions required for the normal execution of captured
jobs, and these functions are triggered by a job start transaction
initiated exclusively by OpCon.

 

The only option available for starting captured jobs from within IBM i
is to use some of the LSAM commands that represent OpCon Events. The
OpCon event notification server can respond to event commands sent from
IBM i, for example, by adding a job to a schedule and then releasing the
job.

 

[Define a Captured Job in OpCon]{.ul} 
In the OpCon/xps Enterprise Manager, add a new job master record to any
OpCon schedule, specifying the job type of IBM i.

a.  Be sure that the selected machine name matches the LSAM environment
    where the captured job was registered.

Select \"Batch job\" in the job sub-type pull-down list.

Under the Call Information tab, enter this command format into the Call
field:

RUNCAPJOB CAPJOBID(captured_job_ID)

a.  Specify the exact name of the captured job ID that was registered
    while the job capture process was in effect.

Leave job parameters set to the default value of asterisk (\*) to allow
the originally captured, or maintained job parameters to be in effect.

a.  Set the Job Date field to the predefined value of \*SYSVAL to
    specify that the DATE parameter of the original IBM i SBMJOB command
    should control the job date.
b.  It is possible to create and use a User Profile of \* or \*CURRENT
    in OpCon/xps. These values allow the original IBM i job user to be
    preserved. Refer to additional discussion of this topic below.

Specify any job parameters in the OpCon/xps job master record that
should be overridden, replacing the parameter values stored with the
captured job definition.

Update the job master definition fields.

Complete any other batch job definition maintenance the same as for
other IBM i batch jobs, including setting the frequency for this job.

Use any form of OpCon/xps schedule building to cause the job to be
executed according to OpCon/xps rules.

## How LSAM Job Tracking Works

This section of documentation provides important background information
and it identifies the processes and tools that may be used in a variety
of ways to help adapt OpCon/xps scheduling and event response to various
types of jobs that may run under IBM i. It is important to understand
this discussion because the LSAM job tracking feature alters the way IBM
i job management behaves. These changes could impact other software that
is running under IBM i.

 

Important fundamental definitions of Job Tracking types are provided in
the introduction to this topic. This information is necessary for
understanding the application of Job Tracking functions. In addition,
the LSAM\'s Alternate Job Notify service is an LSAM service required for
the True Passive type of job tracking. Details about how the Alternate
Job Notify service works are provided in IBM i Components and Operation
-\> Operating the LSAM -\> Alternate Job Notify Service.

### Using Dynamic Variables with Job Tracking

Some examples of where dynamic variables may be used are offered in the
procedural outlines above. There is more information about dynamic
variables in [How Numeric Compression Is Managed for \*DB2](Dynamic-Variables.md#How).

 

The type-L Dynamic Variable is especially useful with Tracked and Queued
Jobs. It L is used exclusively to update the local data area (LDA)
contents associated with any IBM i job. This variable type can be used
with any batch job submitted by OpCon to IBM i, and also with tracked,
queued or captured jobs. Dynamic variables of type L replace data in the
LDA based on the starting position and length fields specified in the
dynamic variable master record. These two numeric fields apply only to
type-L variables and they cannot be used for type-V variables. For
dynamic variables of type L, the Variable Name must be either the
Captured Job ID of a captured job, or the IBM i Job Name of an OpCon
batch job, a tracked job or a queued job.

### IBM i Registered Exit Programs

Job Tracking is supported by using two different IBM i interface
techniques:

1.  An exit program registered against the SBMJOB command. This
    technique interrupts the SBMJOB process and the LSAM later performs
    the actual SBMJOB process, preserving a link to the original
    submitter. This technique is used for most of the job tracking
    types. This technique is discussed here.
2.  A system-defined exit process linked to one or more subsystems which
    generates a notification transaction in a user-identified data
    queue. This technique does not interrupt a job start process, but it
    also does not provide information about a job until after the job is
    generated in an IBM i job queue, and the job may already have run
    and completed by the time OpCon is notified. This technique is
    required only for the True Passive tracking type. Details about the
    function and management of the data queue notification technique are
    provided in Components and Operation under the topic of the
    Alternate Job Notify server.

The LSAM exerts its control over the IBM i SBMJOB command by registering
an exit program with IBM i. Registered exit programs and the available
exit points may be viewed using the IBM i command WRKREGINF. There is a
set of LSAM programs used by a single registered exit program that
support the various LSAM job tracking functions of: Tracking, Queuing
and Capture. The LSAM\'s exit program is registered using the STRJOBTRK
command, or the corresponding LSAM menu function on the Job Tracking
sub-menu.

 

  ------------------------------------------------------------------------------------------------------------------------------ ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White \"X\" icon on red circular background](../../../Resources/Images/warning-icon(48x48).png "Warning icon")   **WARNING:** [If any other software has registered an exit program for the SBMJOB command at exit point QIBM_QCA_CHG_COMMAND, this registration must be removed before using the LSAM command STRJOBTRK. Use IBM i command WRKREGINF to check for conflicting exit point entries. Contact SMA Support for answers to questions.]
  ------------------------------------------------------------------------------------------------------------------------------ ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

There are some IBM rules restricting the way registered exit programs
work. Details about these rules may be found in IBM documentation. One
of the most important rules is that there can be only one program
registered for use with the SBMJOB command (that is, at the critical
exit point required by the LSAM). This means that any of the IBM i LSAM
job tracking features can only be used when the IBM i LSAM\'s exit
program is the one that is registered for the SBMJOB command. Certain
job scheduling tools and programs from other software vendors are known
to also use this same exit point in the IBM i registry. The tools from
these other software vendors must first be used to remove their exit
point registration before the LSAM\'s STRJOBTRK command may be used. Due
to the potential complexity of exit program registration, the IBM i LSAM
does not offer a tool that can be used to remove and reapply registered
exit programs from other software vendors.

 

If it is necessary to restore the exit program registration for other
software in the system, for example, after completing the LSAM\'s
Capture Job function, then the LSAM command ENDJOBTRK or the
corresponding LSAM sub-menu function on the Job Tracking menu must first
be used to remove the LSAM\'s exit program registration. Once the
ENDJOBTRK function has completed, third-party software tools may be used
to reinstate the exit programs from their software.

 

If there is a requirement to continue using registered exit programs
from other software vendors while the LSAM is operational, it will not
be possible to rely on Tracked or Queued jobs. However, the LSAM\'s
Capture Job function may provide a useful alternative to actively
intercepting jobs that would normally be initiated by IBM i system users
(rather than the OpCon/xps schedule). Once a job has been captured, it
becomes possible to create routines or procedures that will allow that
job to be requested by users and tracked or controlled by OpCon/xps
without having to use either the SBMJOB command or some third-party
software.

### Job Tracking and Queuing Versus Capture Job

The LSAM offers a set of tools that are designed to intercept jobs
started by the IBM i SBMJOB (submit job) command. After the LSAM
configuration for Job Tracking is completed, this service is enabled by
the LSAM command STRJOBTRK (start job tracking). The STRJOBTRK command
registers an exit program in the IBM i exit program registry, and IBM i
gives control to this program whenever the SBMJOB command is used.

 

Once the LSAM exit program receives control, it checks the LSAM master
files to see if the conditions present when a job is submitted qualify
the job to be Tracked, Queued or Captured. In all cases, the process of
the SBMJOB command is temporarily interrupted and if the LSAM exit
programs discover that a job qualifies for one of the job tracking
services, they store the complete definition of the job into the LSAM
Job Tracking master files. Then, one of the three following actions is
launched:

-   Tracking = a request that OpCon should simply monitor the job for
    its completion status. This makes it possible for other OpCon jobs
    and events to be dependent upon the tracked job, even though the
    tracked job is not allowed to depend on any conditions within OpCon.
    The submitted job is held by the LSAM only long enough to contact
    OpCon so that the job identifier can be registered in the OpCon Ad
    Hoc (or other named) schedule, and then the job is almost
    immediately allowed to execute. OpCon does not impose any changes on
    the job definition, however, the Tracking feature does allow the
    OpCon job master record rules for spool file management and
    job-level message management to be engaged.

-   Queuing = a request that OpCon should both control when the job is
    allowed to execute and also monitor the job for its completion
    status. A queued job is predefined in the OpCon Ad Hoc (or other
    named) schedule and it may be dependent upon other jobs, thresholds
    or properties in order to qualify it for execution. In addition,
    queuing allows the OpCon job master record rules for spool file
    management and job-level message management to be engaged. Similarly
    to tracked jobs, the LSAM holds the job in its job definition master
    file until it receives a signal from OpCon to release the job, but
    unlike tracked jobs, this signal could be intentionally delayed by
    OpCon. Also, the attributes of a queued job may be overridden by the
    OpCon job master attributes. The LSAM permits a queued job to be
    manually released by an IBM i operator, in which case the job will
    not benefit from the OpCon job parameter changes. In this case, the
    LSAM sends a signal to OpCon that the job controls have been
    overridden by the operator and the job completion status is still
    tracked by OpCon.

-   Capturing = a request that the LSAM completely intercept a submitted
    job, not allowing it to execute and not notifying OpCon. Instead,
    the same LSAM tools used for tracking and queuing are used to store
    all of the captured job parameters and data in the LSAM master
    files. When a job is captured, the capturing user is able to specify
    a unique identifier for the captured job. A captured job is not
    executed until the RUNCAPJOB command is specified in an OpCon job,
    where the captured job ID is listed as a parameter of the RUNCAPJOB
    command.

A captured job is managed differently in the LSAM than tracked or queued
jobs in that there are tools that enable a system operator or
administrator to change any attributes of the captured job definition,
including updating the captured LDA contents. A captured job definition
may be executed many times, whereas a tracked or queued job may only be
executed once.

 

Another difference between tracked/queued jobs and captured jobs is
their identifier. A tracked or queued job is assigned a unique Tracking
Number by the LSAM, and the LSAM uses this number internally to identify
the stored job definition. Captured jobs use a unique Captured Job ID
value of up to 12 characters that is specified by the capturing user.
(When a job is captured in a batch process, the default ID of the
captured job is its IBM i Job Name.) The Captured Job ID is specified in
the RUNCAPJOB command when the time comes to request execution of a
captured job.

 

The Capture Job technique is a useful way to quickly assemble a complex
set of job parameters without having to type them all manually into an
OpCon job master record. Capturing is especially appropriate for jobs
that rely on local data area content prepared by third-party software,
when the intention is that the job should be executed periodically under
control of an OpCon schedule.

 

OpCon does not have a way to directly store and deliver the LDA content
of an IBM i job (although the LDA content is passed along by tracked and
queued jobs); this is done by the LSAM on behalf of OpCon. Even so, once
a captured job definition exists, there are then many ways that OpCon
can indirectly control the content of the LDA by means of the LSAM\'s
dynamic variables and its SETDYNVAR command. This is discussed in more
detail under the section about dynamic variables.

 

It is also possible to use the LSAM dynamic variables to modify the
attributes of tracked and queued jobs.

### Specifying a User ID for Queued or Captured Jobs

The LSAM\'s job scheduling server program allows for and supports
special values in the Job User field as a job start request is received
from OpCon. The general rule for jobs submitted by OpCon is that the
user specified in the OpCon job master record (appearing in the User
field of an IBM i job master record in the OpCon EM) is that the IBM i
job will be submitted to run under the ID and authority of that
specified user profile.

 

However, in the case of queued or captured jobs, it may be preferred
that the original IBM i user profile included in the SBMJOB command be
preserved. In this case, either all possible queued or captured user IDs
must be registered as valid OpCon user IDs for IBM i jobs, or else it
will be necessary to register in OpCon a false user ID just for this
purpose.

 

OpCon would permit the registration of a user ID named \"\*\" (a single
asterisk) or named \"\*CURRENT.\" Either of these values appearing in an
IBM i job start request will allow the IBM i LSAM job scheduler to honor
the original user ID that was captured from the SBMJOB command. To set
up these fake user IDs, open the OpCon EM and route to: Administration
-\> Security -\> Batch User Privileges. But it is important to remember
that once one of these fake user IDs is registered, it\'s not possible
to delete it. It could only be disabled to the extent that privileges
for the user ID are revoked.

 

If the fake user IDs are registered in OpCon, then they can be used with
a Queued or Captured job, making it simpler to honor various user IDs
from IBM i that might be authorized to submit one of the AdHoc (or other
named schedule) jobs that will be tracked or queued, as well as any
given job definition that has been captured by the LSAM for later
execution.

### Execution of Tracked and Queued Jobs

This topic discusses the base functions of Tracking and Queuing, without
consideration of the variations implemented by the True Passive and
Automatic tracking types. But both of those types rely on much of the
same logic presented in this section. Passive and Automatic tracking are
explained in more detail below.

 

The LSAM\'s registered exit program for the SBMJOB command intercepts
jobs for tracking or queuing when a job is predefined in the LSAM Job
Tracking Parameters master file. When a job qualifies for tracking the
LSAM forwards a request to SAM and supporting services (SAM-SS) to track
the defined job. The LSAM uses OpCon event commands \$JOB:TRACK and
\$JOB:QUEUED to request that SAM-SS add the jobs to the indicated
schedule and then monitor them. Job names that will be monitored must
have been pre-configured within the special OpCon schedule called AdHoc,
or within a user-defined, Named Schedule using the special rules for
tracked or queued jobs (as defined in the instructions above, unless the
Automatic type is used).

 

It is possible that the job tracking or queuing request will be rejected
if SAM_SS does not recognize the job name, the schedule name, the
schedule date and/or the optional frequency registered in the LSAM Job
Tracking Parameters master record. But if the request is accepted,
SAM-SS returns a job initiation message (TX1) to the LSAM enabling the
job\'s completion status to be sent to SAM-SS when the job completes.
From this point forward, the job can be viewed in Schedule Operations in
the User Interface of OpCon. If the request is rejected by SAM-SS, the
LSAM records an error code of SMA0014 which can be viewed in the LSAM\'s
Job Tracking Log display.

 

When the LSAM determines that a job has qualified for job tracking or
queuing, it prevents the IBM i SBMJOB command from completing (except
for tracking in the True Passive mode) and instead stores all the job
parameters in the LSAM job tracking master file until SAM-SS sends a job
start transaction (TX1). There is more discussion about what happens to
the SBMJOB command under the SBMJOB topic, below. This topic also
explains the tools that can be used to monitor and manage jobs using
LSAM programs and displays, should it become necessary to manually
manage job tracking exceptions.

 

Jobs of type Tracked are released by an OpCon job start transaction
(TX1) transaction without regard for any OpCon job dependencies. The
purpose of Tracking is to allow a job to run immediately, while also
engaging OpCon job status monitoring. But the reason the IBM i LSAM
temporarily holds jobs of type Tracked is to allow the OpCon message
management and spool file management tools (unique to IBM i jobs) to be
configured for the job before it runs. Although the Tracked job itself
is not allowed to depend on other OpCon jobs, it is possible for other
jobs to depend on a Tracked job in an OpCon Schedule.

 

For jobs of type Queued, all the OpCon job dependency rules apply. The
LSAM will continue to hold Queued jobs in its own job tracking master
file until SAM-SS determines that the job may be released. All of the
other job support features in OpCon, such as message management and
spool file management, are supported for jobs of type Queued.

 

+----------------------------------+----------------------------------+
| ![White pencil/paper icon on     | **NOTE:** [There is an LSAM job  | | gray circular                    | performance parameter that       |
| background](../../.              | supports an option to have the   |
| ./Resources/Images/note-icon(48x | LSAM release a tracked or queued |
| 48).png "Note icon") | job in case OpCon returns a      |
|                                  | Tracked Job Error response (TE1  |
|                                  | transaction). This can occur if  |
|                                  | OpCon has not been configured    |
|                                  | with sufficient information to   |
|                                  | recognize the external job. For  |
|                                  | error code SMA0014, choose to    |
|                                  | leave the job in the LSAM job    |
|                                  | tracking master file, or choose  |
|                                  | to have the LSAM automatically   |
|                                  | release the job without OpCon    |
|                                  | tracking. Instead of using the   |
|                                  | error override to have jobs      |
|                                  | automatically released, use the  |
|                                  | WRKTRKJOB command (or LSAM Menu  |
|                                  | 1, function 2) to manually       |
|                                  | release them from the LSAM job   |
|                                  | tracking master                  |
|                                  | file.]               |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | **UPDATE**: When Automatic       |
|                                  | tracking was added in OpCon, SAM |
|                                  | became able to add tracked jobs  |
|                                  | to a schedule even when no job   |
|                                  | master was configured in         |
|                                  | advance. This results in fewer   |
|                                  | TE1 rejections of a \$JOB:TRACK  |
|                                  | event command.                   |
+----------------------------------+----------------------------------+

 

When a tracked or queued job is finally submitted for execution by the
LSAM, any associated LDA content is prepared by the LSAM so that it
becomes part of the submitted job, just as if the job were being
submitted by the originating software or user. The LSAM also preserves
the job ID information of the original submitting job and user and
applies this information to the SBMFOR parameter of the submitted job.
The SBMFOR parameter allows the job to remain associated with the
original submitting user and job, as if the job had been submitted
directly by that user and job. These are the techniques that allow the
LSAM and OpCon to apply the customized job response controls over spool
files and messages, while still retaining most of the original
attributes and behaviors of jobs that are being tracked or queued.

#### Matching LSAM Job Tracking Filters with OpCon Schedule Parameters

There is a critical relationship between two groups of the Parameters
assigned to Tracked or Queued jobs within the IBM i LSAM master file
maintenance function (LSAM menu 1, option 1). The two groups are (1)
certain IBM i job definition parameters and (2) OpCon schedule
parameters. The IBM i LSAM is able to match different combinations of
these two parameter groups so that the same job name could be handled
differently at different times.

 

The Job Name itself is the anchor parameter. Each time IBM i starts a
new instance of a job it will use the same job name but it assigns a
unique job number to that instance. Each instance of a job may use a
different User ID, a different Job Description and/or a different Job
Queue, depending on circumstances such as running a test version of a
job versus a live production version of that job.

 

The LSAM\'s Job Tracking exit program selects the actual instance of a
job that will be tracked by using the User ID and the four fields that
identify the Job Description and the Job Queue and the libraries where
these objects are located in the IBM i DB2 database. For each of these
five fields, a specific name may be entered or the field can be set to
the special value of \*ALL that means any value will be accepted. Jobs
whose IBM i definition fields do not match any registered combination of
values will be ignored by the LSAM and allowed to start normally. Jobs
that do match one of the combinations of values registered in the
LSAM\'s Job Tracking Parameters master file will be selected for
processing as a tracked or queued job in whichever OpCon Schedule was
registered along with the IBM i job definition parameters.

 

The second group of Job Tracking Parameters includes these OpCon
definition fields: Schedule Name, Schedule Date and Frequency, along
with the job name. Whenever the LSAM submits a request for OpCon to
Track or Queue a job, OpCon can only accept the request if the Job Name
is found on the Schedule that matches all of the schedule definition
parameters. Among these, Schedule Name and Job Name must be exact. The
Schedule Date field is also critical, but there are certain values for
this field that make it adaptable to time-sensitive circumstances. The
Frequency field may be left blank so that it is ignored, except that
there is a default value that OpCon uses for Frequency in case the
combination of Job Name, Schedule Name and Schedule Date result in
matching more than one active schedule.

 

In summary, for a job to be successfully tracked or queued, it must
match both the IBM i job definition field values and the OpCon Schedule
field values. If a job is selected by the LSAM according to the IBM i
job definition values, it will be submitted to OpCon for tracking and
queuing. But if the OpCon Schedule values do not result in a match to an
active OpCon schedule, then OpCon sends a rejection transaction (TE1) to
the LSAM and the LSAM logs an error code of SMA0014 in its Job Tracking
Log.

 

If a job was rejected with error code SMA0014, there are two options for
overcoming the rejection by OpCon, but while both options allow the IBM
i job to execute, OpCon will not know about the job and will not receive
notification about how the job ends. One option is to set the LSAM
global error override parameter (LSAM main menu, function 7) to allow an
automatic override to error SMA0014, so that the LSAM job scheduling
server job releases the job even without OpCon tracking. The other
option is for an operator to use the LSAM command WRKTRKJOB (Work with
Tracked Jobs), which is the same as LSAM Menu 1, function 2. Job track
logs, to find and manually release the job. The LSAM Job Tracking Log
will reflect these types of override so that it is obvious that OpCon
did not track the job.

 

When matching the IBM i job definition fields to OpCon Schedule
definition fields, it is important to understand that the LSAM will use
only the first combination of IBM i job definition fields that match the
actual job instance. This means that if OpCon rejects the job tracking
or queuing request because the OpCon Schedule definition fields find no
match, the LSAM will not return to the Job Tracking Parameters table and
try to find another match. Therefore, it is important to understand the
following table of LSAM Job Tracking job definition field values. This
table shows the combinations of IBM i job definition field values that
are possible, in the order that they will be evaluated by the LSAM. The
first combination that matches the actual job instance will determine
the OpCon Schedule field values to be used.

 

The last entry in this table shows that the catch-all combination of
\*ALL for all four IBM i job definition fields is the last one in the
list. If there will be only one instance of a Job Name that would ever
be tracked or queued, then using \*ALL for all the field values is an
easy way to set up Job Tracking. But if it is critical to distinguish
among different instances of an IBM i job, then do not create a
catch-all Job Tracking Parameters record that uses \*ALL for all four
IBM i job definition fields.

 

  -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [In older versions of the IBM i LSAM, the \*ALL catch-all record for Job Tracking, if found, was the first form of job tracking qualifier to be selected, if it existed. Now, however, all other combinations of specifically qualified job tracking parameters will be considered first before allowing the catch-all record to be used. Thus, in the past it was not possible to have a catch-all record if it was critical to qualify IBM i jobs by their IBM i definition fields -- the catch-all record had to be deleted if it existed. Now, however, it may be useful to have a catch-all record in case certain specific qualifiers are not matched.]
  -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

In the following table, the word \"name\" is used to denote a specific
value for an IBM i object name. Notice how the order of evaluation
begins with all specific names having the highest priority. The rule
that places the \*ALL special value lower in the list than specific
names is an alternate collating sequence table that was created for this
type of file in the LSAM database. The alternate collating sequence
table LSACOLTBL1 specifies that the asterisk (\*) will sort higher than
letters of the alphabet.

 

The column names in the following table have these meanings:

-   JOBNAME = the Job Name assigned to the job.

-   JOBUSER = the User Profile of the IBM i job.

-   JOBDES = the IBM i Job Description (an IBM i object that defines job
    environments).

-   JOBDLI = the IBM i DB2 database library where the Job Description is
    stored.

-   JOBQUE = the IBM i Job Queue, where the job start request is first
    stored before execution begins.

-   JOBQLI = the IBM i DB2 database library where the Job Queue is
    stored.

  JOBNAME    JOBUSER   JOBDES   JOBDLI   JOBQUE  JOBQLI
  --------- --------- -------- -------- -------- --------
  name        name      name     name     name   name
  name        name      name     name     name   \*ALL
                                                  
  name        name      name     name    \*ALL   name
  name        name      name     name    \*ALL   \*ALL
                                                  
  name        name      name    \*ALL     name   name
  name        name      name    \*ALL     name   \*ALL
  name        name      name    \*ALL    \*ALL   name
  name        name      name    \*ALL    \*ALL   \*ALL
                                                  
  name        name     \*ALL     name     name   name
  name        name     \*ALL     name     name   \*ALL
                                                  
  name        name     \*ALL     name    \*ALL   name
  name        name     \*ALL     name    \*ALL   \*ALL
                                                  
  name        name     \*ALL    \*ALL     name   name
  name        name     \*ALL    \*ALL     name   \*ALL
  name        name     \*ALL    \*ALL    \*ALL   name
  name        name     \*ALL    \*ALL    \*ALL   \*ALL
  name        \*ALL     name     name     name   name
  name        \*ALL     name     name     name   \*ALL
  name        \*ALL     name     name    \*ALL   name
  name        \*ALL     name     name    \*ALL   \*ALL
                                                  
  name        \*ALL     name    \*ALL     name   name
  name        \*ALL     name    \*ALL     name   \*ALL
  name        \*ALL     name    \*ALL    \*ALL   name
  name        \*ALL     name    \*ALL    \*ALL   \*ALL
                                                  
  name        \*ALL    \*ALL     name     name   name
  name        \*ALL    \*ALL     name     name   \*ALL
                                                  
  name        \*ALL    \*ALL     name    \*ALL   name
  name        \*ALL    \*ALL     name    \*ALL   \*ALL
                                                  
  name        \*ALL    \*ALL    \*ALL     name   name
  name        \*ALL    \*ALL    \*ALL     name   \*ALL
  name        \*ALL    \*ALL    \*ALL    \*ALL   name
  name        \*ALL    \*ALL    \*ALL    \*ALL   \*ALL
                                                  
  \*ALL       name      name     name     name   name
  \*ALL       name      name     name     name   \*ALL
  \*ALL       name      name     name    \*ALL   name
  \*ALL       name      name     name    \*ALL   \*ALL
                                                  
  \*ALL       name      name    \*ALL     name   name
  \*ALL       name      name    \*ALL     name   \*ALL
  \*ALL       name      name    \*ALL    \*ALL   name
  \*ALL       name      name    \*ALL    \*ALL   \*ALL
                                                  
  \*ALL       name     \*ALL     name     name   name
  \*ALL       name     \*ALL     name     name   \*ALL
                                                  
  \*ALL       name     \*ALL     name    \*ALL   name
  \*ALL       name     \*ALL     name    \*ALL   \*ALL
                                                  
  \*ALL       name     \*ALL    \*ALL     name   name
  \*ALL       name     \*ALL    \*ALL     name   \*ALL
  \*ALL       name     \*ALL    \*ALL    \*ALL   name
  \*ALL       name     \*ALL    \*ALL    \*ALL   \*ALL
                                                  
  \*ALL       \*ALL     name     name     name   name
  \*ALL       \*ALL     name     name     name   \*ALL
  \*ALL       \*ALL     name     name    \*ALL   name
  \*ALL       \*ALL     name     name    \*ALL   \*ALL
                                                  
  \*ALL       \*ALL     name    \*ALL     name   name
  \*ALL       \*ALL     name    \*ALL     name   \*ALL
  \*ALL       \*ALL     name    \*ALL    \*ALL   name
  \*ALL       \*ALL     name    \*ALL    \*ALL   \*ALL
                                                  
  \*ALL       \*ALL    \*ALL     name     name   name
  \*ALL       \*ALL    \*ALL     name     name   \*ALL
  \*ALL       \*ALL    \*ALL     name    \*ALL   name
  \*ALL       \*ALL    \*ALL     name    \*ALL   \*ALL
                                                  
  \*ALL       \*ALL    \*ALL    \*ALL     name   name
  \*ALL       \*ALL    \*ALL    \*ALL     name   \*ALL
  \*ALL       \*ALL    \*ALL    \*ALL    \*ALL   name
  \*ALL       \*ALL    \*ALL    \*ALL    \*ALL   \*ALL

  : Order of Evaluation for Name Versus \*ALL Field Values

### Execution of True Passive Job Tracking

True Passive is a form of Job Tracking that does not interrupt the IBM i
SBMJOB command in any way. This allows the original submitted job
message from IBM i to be returned directly to the user or batch job that
executed the SBMJOB command. Since the IBM i job is already being at
least queued, if not started or even completed, by the time the LSAM
sends the \$JOB:TRACK event command to OpCon, this means that the Queued
form of job tracking cannot support passive job tracking. However, a
passively tracked job can still be automatically added to an OpCon
schedule if other requirements for automatic job tracking are met.

 

The IBM i LSAM requires that the Alternate Job Notify service be active
to support the True Passive type of job tracking. The Alternate Job
Notify service method allows the IBM i SBMJOB command process to
complete normally instead of intercepting the job start request and
regenerating it later. This technique allows the IBM i job submitted
message to be returned directly to the submitting job, and that is the
critical reason why the True Passive tracking type must be used with
some software applications.

 

To use the True Passive tracking type, the \"Alternate Job Notify\"
server must be configured either for full operation, or for the limited
option \"T\" = Tracked jobs only. In the T mode, the Job Notify server
jobs will generate OpCon job start and completion signals only for jobs
that are marked for Passive job tracking.

 

The Job Notify service is actually comprised of two different IBM i LSAM
server jobs. The LSAM server job named JOBNFY4 handles a message type
that IBM i generates whenever a job enters a job queue attached to a
subsystem which has been configured for job notify services. The other
JOBNFY server job handles the Job End messages. Both of the server jobs
receive transaction records from user-specified data queues that are
configured using the tools and procedures described in Components and
Operation under the \"Alternate Job Notify Service\" section. The
transaction records are generated by the IBM i system after the LSAM
configuration programs have registered the user-named data queue(s) with
one or more IBM i subsystems. Following the registration process, the
designated IBM i subsystems must be stopped and restarted before the new
IBM i-controlled subsystem process exit routines will become active. The
same is true if it is necessary to deactivate the registration of a
subsystem - it must be stopped and restarted after the LSAM Alternate
Job Notify configuration steps to remove a subsystem are performed.

 

When an IBM i job is placed into a job queue attached to an activated
IBM i subsystem, the JOBNFY4 job reads the user-named data queue(s) to
receive the job queue entry transactions. These transactions provide the
job start data that the LSAM needs to create new LSAM Job Tracking
master log file entries. The job tracking master log file is typically
created, initially, by the LSAM exit program for the SBMJOB command. But
when the LSAM job tracking parameters master file indicates that passive
tracking should be used, the actual IBM i full job ID is not known and
recorded until after that job has entered the job queue of an IBM i
subsystem that is registered for generating job queue entry
transactions. Just after the job enters a job queue, the system
notification message is able to provide this critical detail about the
job being tracked, and that enables the Job Notify LSAM server job to
send the \$JOB:TRACK event to OpCon. OpCon responds to the event command
by sending back its TX1 job start transaction. Then the IBM i job ID
from the LSAM Job Tracking master log can be combined with the OpCon job
ID information to compose a complete LSAM job master record. This
combination of information from both systems enables the full operation
of OpCon automation.

 

As a passively tracked IBM i job ends, the Job End message processing of
the JOBNFY server is critical for Passive Job Tracking. This is because
the LSAM job start services were not used to initiate the IBM i job, and
therefore IBM i will not usually send the job completion message to the
message queue that the LSAM is monitoring. Instead, the Job Notify
service generates an IBM i Job End message and sends it to the LSAM
message queue. This enables the LSAM to send the final job completion
status to OpCon.

 

In summary, passively tracked jobs cannot take advantage of any of the
OpCon job master options that control when a job may start, and they
also cannot benefit from the OpCon job master message management or
spool file processing. But the LSAM Message Management feature can still
be used for any messages from a passively tracked job, and spool file
management can be handled by the LSAM\'s SCANOUTQ command. Also, job
completion processing by OpCon is fully supported. This means that
subsequent jobs can be made dependent upon passively tracked jobs (as
long as those jobs were not also using automatic job tracking), and
OpCon features such as LSAM feedback and job status triggers can still
be used.

### Execution of Automatic Job Tracking

Automatic job tracking is defined as adding jobs to an OpCon daily
schedule without requiring that a job master record be configured in the
OpCon server database. Even though having no OpCon job master greatly
limits the ways OpCon can manage this type of job, it is still possible
for the job completion status to be displayed by the Enterprise Manager
or by Web access to OpCon.

 

Within the IBM i LSAM, automatic job tracking can also greatly reduce
the amount of work required for the LSAM to recognize which jobs should
be sent to OpCon for tracking. There is a control field value in the
LSAM Job Tracking configuration (LSAM sub-menu 1, option 7) used to turn
this capability on or off for the whole LSAM environment. There are also
values on the Job Tracking Parameters records that can be used to either
request or prevent automatic job tracking of any jobs that are submitted
by a registered primary job.

 

The goal of automatic job tracking is to make it possible for OpCon to
monitor one or more sub-jobs submitted by a primary job, without
requiring that either OpCon or the IBM i LSAM databases be configured to
track each sub-job that may occur. Only the primary job has to be
recognized, at least by the IBM i LSAM, in order to get it registered on
an OpCon schedule. (The primary job can itself be automatically tracked
by OpCon, but the LSAM must have been told to intercept that job and
send a \$JOB:TRACK event to OpCon in order to get that job registered
under some OpCon schedule.)

 

Automatic job tracking determines which OpCon schedule will show the job
using various methods. All sub-jobs that were submitted by a primary job
(or by its sub-jobs) will be assigned to the same OpCon schedule as the
primary job. Primary jobs could be any job that OpCon started, and when
OpCon starts the job, then the OpCon schedule name is recorded in the
LSAM as part of that job\'s profile. But when the LSAM uses Job Tracking
to notify OpCon about a primary job, the it is the LSAM Job Tracking
Parameters record that determines which OpCon schedule shows both that
job and any sub-jobs it submits. The primary job\'s schedule can be
named in the LSAM Job Tracking Parameters record, or if that field is
not updated specifically by the user, then the default OpCon schedule
will be the automatically created (as necessary) \"AdHoc\" schedule.

 

  -------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [This LSAM feature requires a corresponding enhancement to the OpCon SAM central server program that was generally released with OpCon 15.1 and newer versions. An on-demand enhancement is available as a program replacement for OpCon version 5.20 SP1 and for OpCon 15. Although the IBM i LSAM software may show this option, the LSAM can still be used with older versions of OpCon, but in that case the Automatic Job Tracking feature will not be supported. Attempting to track a job that is not pre-configured in older versions of OpCon will result in the job tracking request being rejected with the IBM i LSAM error code SMA0014. Refer to the IBM i LSAM Configuration topic, \"Extended Discussion of Parameter\" section, for instructions about an override that is available for error code SMA0014.]
  -------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

#### Positive Versus Negative Automatic Job Tracking

Two different methods are available for controlling which jobs in the
IBM i system will be automatically tracked by OpCon. These methods
define the decision performed by the LSAM Job Tracking programs (either
the registered exit program for the SBMJOB command, or the Alternate Job
Notify job queue transaction processing program).

 

More detail about the interaction of the LSAM Job Tracking Configuration
control, and the values on individual Job Tracking Parameters is
provided next, but here is a summary of the basic rule:

-   **Positive** control says that only jobs submitted by
    LSAM-registered jobs will be submitted for automatic tracking. An
    LSAM Job Tracking Parameter record must be registered for the
    primary job in order to automatically track any of its sub-jobs that
    it may submit. This method may be considered the most restrictive
    rule for Automatic Job Tracking: There must be a positive request to
    perform automatic sub-job tracking.
-   **Negative** control says that sub-jobs from any primary job that
    OpCon started, or that OpCon is tracking, are eligible for automatic
    tracking, unless the primary job is specifically prevented by the
    LSAM. This method may be considered the most open or permissive rule
    for Automatic Job Tracking.

##### Positive Automatic Job Tracking

The Positive method of Automatic Job Tracking is established for the
whole LSAM environment (considered to control the whole of a single IBM
i partition or machine) by the value of \"1\" = Positive for the field
\"Allow automatic tracking\" in the LSAM Job Tracking Configuration
(option 7 on LSAM sub-menu 1).

 

The positive method requires that the primary job be registered in the
LSAM Job Tracking Parameters master file. However, pre-configuration
work is still saved because the sub-jobs started by each primary job do
not have to be registered.

 

Regardless of the job tracking Type code in the LSAM Job Tracking
Parameter record, the field \"Aut-track sub-jobs\" for the registered
primary job must be set to a value of \"A\" = Allow in order for the
sub-jobs to be automatically tracked.

 

If any of the sub-jobs are registered in the LSAM Job Tracking
Parameters master file, it is possible to suppress automatic tracking on
a job-by-job basis by setting the \"Aut-track sub-jobs\" field to a
value of \"P\" = Prevent. In this case, the sub-job itself will not be
tracked, and also any sub-sub-jobs that it may submit will not be
automatically tracked. This method of using prevention when the LSAM is
configured for the Positive mode could be used to suppress automatic
tracking of a \"branch\" in the overall \"tree\" of the primary job\'s
complete work flow chart.

 

Also, when a sub-job is registered in the LSAM Job Tracking Parameters
master file, the Type code assigned to the Parameters record must be
considered according to the rules summarized below. Use a Type code of
\"A\" = Automatic Tracking, in order to register a sub-job that should
simply be prevented from automatic tracking.

##### Negative Automatic Job Tracking

The Negative method of Automatic Job Tracking is established for the
whole LSAM environment (considered to control the whole of a single IBM
i partition or machine) by the value of \"2\" = Negative for the field
\"Allow automatic tracking\" in the LSAM Job Tracking Configuration
(option 7 on LSAM sub-menu 1).

 

The negative method requires only that the primary job must have been
started by OpCon, or that OpCon is already tracking the submitting job
that started a given sub-job. In those cases, no other configuration of
the LSAM or of OpCon is required. So the term \"negative\" means that
registration in the LSAM Job Tracking Parameters master files is only
needed for the purpose of preventing sub-jobs of the registered primary
job from being automatically tracked.

 

Set the Job Tracking Parameters master file field \"Aut-track sub-jobs\"
to a value of \"P\" = Prevent, to prevent automatic tracking of sub-jobs
from the registered job name.

 

This prevention control also works to stop automatic tracking of an
individual sub-job, if the sub-job name is registered in the LSAM Job
Tracking Parameters master file. In that case, any sub-sub-jobs that are
started by the registered sub-job name will also be prevented from
automatic tracking.

 

Any job names that are registered in the LSAM Job Tracking Parameters
master file will be handled according to the Type code of the Parameters
record. More information about the Type codes is offered below.
Regardless of the Type code, a value of \"P\" in the \"Aut-track
sub-jobs\" field will prevent sub-jobs submitted by this registered job
from being automatically tracked.

 

To register a primary job name (or a sub-job name) that should not be
governed by its Type code, specify a Type value of \"A\" = Control
Auto-track only. This type code does not cause the LSAM to initiate any
job tracking activity, so it is appropriate for registering Parameter
records that exist only for the purpose of suppressing automatic job
tracking of sub-jobs when OpCon started the primary job.

##### LSAM Job Tracking Parameters Type Code

The Type code for a job that is registered in the LSAM Job Tracking
Parameters master file will govern how job tracking is initiated by the
LSAM, as follows. Note that Type Q is incompatible with un-configured
automatic tracking strategies.

-   **Type T** = Job Tracking: May be used when OpCon has a
    pre-configured job master record. But the OpCon response to the
    \$JOB:TRACK external event command will depend on whether the job
    was pre-configured in the OpCon job master file. Having an OpCon job
    master record enables more OpCon automation support, but OpCon will
    perform automatic tracking for the \$JOB:TRACK event if there is no
    OpCon job master.

-   **Type Q** = Job Queuing: May only be used if the job was
    pre-configured in the OpCon job master file. This type code causes
    the LSAM to generate a \$JOB:QUEUE event command, and that command
    will be rejected by OpCon if a job master record does not exist.
    Therefore, type Q must be used with care when the job is part of an
    automatic job tracking strategy.

-   **Type P** = True Passive Job Tracking: May be used with automatic
    job tracking in order to prevent the LSAM from interrupting the
    SBMJOB command process. In this case, the LSAM will use its
    Alternate Job Notify method to retrieve the IBM i job information
    and job status. Passive job tracking is otherwise handle the same as
    the Tracked Job Type (T), including that the LSAM will support OpCon
    automatic tracking if there was no pre-configured OpCon job master
    record.

-   **Type A** = Automatic Tracking: Is used to register a primary job
    or sub-job for the purpose of providing the \"Aut-track sub-jobs\"
    code to the LSAM Job Tracking routines. The \"automatic track sub
    jobs\" flag can be used to select (value \"A\") or prevent (value
    \"P\") automatic tracking of individual jobs or sub-groups of jobs.
    A job that is not otherwise selected for automatic tracking will be
    sent to OpCon for automatic tracking if the Type code is \"A\" and
    the Aut-track sub-jobs code is also \"A\". An A-A Job Tracking
    Parameters record works the same in the LSAM as a Type T record, in
    that the LSAM will intercept an independently submitted job, no
    matter who started this job. The LSAM will send a \$JOB:TRACK event
    to OpCon, and OpCon will add it to the named schedule. The OpCon
    response to that external event command will depend on whether the
    job was pre-configured in an OpCon job master record, or not. When
    there is no matching job master record for the job in the named
    OpCon schedule, that is when \"automatic\" tracking occurs, because
    OpCon will add a daily (only) job record to the OpCon database.

##### Rapid Implementation of OpCon Tracking

Automatic job tracking is especially useful when there are, for example,
dozens or hundreds of sub-jobs, and the task of configuring for each job
would be too big to manage. However, SMA recommends that for small
volumes of sub-jobs, it is better to pre-configure job master records in
OpCon (and set up corresponding job tracking records in the LSAM)
because there are many useful OpCon features that cannot be used with
simple automatic tracking, since these jobs are registered only in the
OpCon daily schedule and job files and not in the OpCon master schedule
and job files.

##### Automated Analysis of Complex Job Trees

Another useful application of this limited feature is to use OpCon to
automatically analyze and document all the sub-jobs that are submitted
in the IBM i system by a primary job that was started directly (or
tracked) by OpCon. When the OpCon daily job status display shows all the
sub-jobs that were automatically detected, this information could be
used to guide permanent configuration of job master records in OpCon, so
that all of the OpCon automation features could be applied to the
sub-jobs in the future. If required, the IBM i LSAM Job Tracking log
inquiry function, and/or the IBM i LSAM job status master record log
file viewer (LSAM sub-menu 6, option 5, log viewer 5) could be used to
discover the submitting job for each sub-job, since there could be a
complex tree of many jobs submitting other jobs, below the primary job
in the work flow.

### Execution of Captured Jobs

In order to use the Capture Job tool, the LSAM Job Tracking feature must
be started. Any form of job interception requires that the LSAM\'s exit
programs be registered with IBM i for the SBMJOB command. But job
capturing differs from tracking and queuing in that the capture action
will only be performed for a job or workstation that is temporarily
registered to use the capture function, using the STRCAPJOB function
(also found in the LSAM menus).

 

Use the LSAM\'s STRCAPJOB command or the corresponding menu function in
the LSAM\'s Job Tracking sub-menu to add or remove job or workstation
names from a temporary list of jobs that will be enabled to perform the
capture function. A job or workstation that has been registered to
capture jobs will have every SBMJOB command intercepted and every job
that is intercepted will be stored by the LSAM as a captured job
profile. If the intention is to capture only one job, then the capturing
job or workstation must be immediately unregistered using the ENDCAPJOB
function (also found in the LSAM menus).

 

When a job is captured, it is not allowed to run. Captured jobs can also
not become tracked or queued jobs. All that happens to a captured job is
that its full definition is stored in the LSAM master files, including
any local data area (LDA) content. During the capture process, an
identifier is assigned to the captured job. If an interactive user is
capturing a job, that user is allowed to update the proposed captured
job ID using up to 12 characters. (Using 12 characters allows more than
one variation of a single job name to be captured with different
attributes.) If a job is captured by a registered batch job, the default
ID for the captured job will be its job name (up to 10 characters).
After the capture action is completed, it is possible to make changes to
any attribute of the job or to the LDA content using LSAM manual
maintenance tools. This form of change to capture jobs would be
performed before the job is scheduled to be executed one or more times
from an OpCon/xps schedule using the RUNCAPJOB command.

 

Different from tracking and queuing, the LSAM capture routines do not
communicate at all with OpCon/xps during the capture process. This means
it is possible to capture jobs even while the LSAM is off line from
OpCon.

 

Captured jobs can only be executed from an OpCon schedule. In the OpCon
Enterprise Manager, an IBM i job master record is created setting the
job sub-type to batch job. The Call command line must specify the
command RUNCAPJOB, and the command parameter CAPJOBID(job_id) is used to
specify the captured job ID.

 

The attributes of a captured job can be defined and modified in various
ways. It is possible to modify the actual SBMJOB command parameter
values, the job\'s command line or even the LDA content associated with
the job. The priority of attributes definitions is:

1.  The original job attributes are captured by the LSAM.
2.  An authorized LSAM operator or administrator can use the WRKCAPJOB
    command to permanently modify any job attribute.
3.  The somewhat limited set of OpCon/xps IBM i job master record
    parameters can be used to override the stored values of the captured
    job.
4.  LSAM Dynamic Variables can be predefined so that a job\'s attributes
    can be automatically modified just before the LSAM actually submits
    the job, usually depending on circumstances that are present at the
    moment the job will execute.
    a.  The LSAM\'s SETDYNVAR command can be used in a predecessor job
        in the OpCon/xps schedule, or as a pre-run command on the
        RUNCAPJOB job. In this case, it becomes possible to apply
        OpCon/xps variables to the SETDYNVAR command line, so that
        OpCon/xps properties can be communicated to the LSAM for use in
        redefining a job\'s parameters.
    b.  Other types of Dynamic Variables defined in the LSAM master file
        can be used to retrieve and apply IBM i environmental values to
        almost any aspect of the captured job.

As a captured job is submitted for execution, any associated LDA content
is prepared by the LSAM so that it becomes part of the submitted job,
just as if the job were being submitted by the originating software or
user. The LSAM also preserves the job ID information of the original
submitting job and user and applies this information to the SBMFOR
parameter of the submitted job. The SBMFOR parameter allows the job to
remain associated with the original submitting user and job, as if the
job had been submitted directly by that user and job.

### SBMJOB Messages from Tracked Jobs

When starting job tracking from the LSAM menu, the LSAM software
registers exit programs with IBM i. These exit programs are called every
time the IBM i SBMJOB command is used. They use the LSAM job tracking
parameters file to check if each job qualifies for job tracking or job
queuing.

 

When a job qualifies for job tracking or queuing, a message is sent by
the LSAM to OpCon, but the job is not allowed to run. Instead, all the
job information is extracted and stored in the LSAM job tracking master
file TRKJOBF00. The LSAM holds the job until either OpCon sends it a
signal to release the job, or an operator uses the WRKTRKJOB display (or
LSAM Menu 1, function 2) to manually release or cancel the job. It is
possible to release or cancel tracked jobs before OpCon has
automatically released them (in which case the job will not benefit from
OpCon services) or when OpCon has rejected the request to track a job
(as when the LSAM has been configured to track a job, but the OpCon
AdHoc (or other named) schedule does not have the same job name
configured).

 

Whenever a job has been recognized by the LSAM as qualifying for job
tracking or queuing, after entering the SBMJOB command there will be
messages like the ones in the following example, shown after the example
of a typed \"sbmjob\" command. These messages appear instead of the IBM
i standard job submitted message (CPF1221).

 

+----------------------------------+----------------------------------+
| ![White pencil icon on green     | **EXAMPLE:**                     | | circular                         |                                  |
| background](../../../Reso        | \> sbmjob cmd(dsplibl \*print)   |
| urces/Images/example-icon(48x48) | job(QUETEST01)                   |
| .png "Example icon") |                                  |
|                                  | SMAPGM/SMASBMJOB CMD(DSPLIBL     |
|                                  | OUTPUT(\*PRINT)) JOB(QUETEST01)  |
|                                  |                                  |
|                                  | OpCon/xps tracking job           |
|                                  | name(QUETEST01), number(000147): |
|                                  | see WRKTRKJOB                    |
+----------------------------------+----------------------------------+

 

The job number listed in the example message above (SMA0806) is the LSAM
Job Tracking number, not the IBM i job number. An IBM i job number will
not be assigned to the job until it is actually released from LSAM
tracking. The message suggests using the command WRKTRKJOB to view and
manage LSAM tracked jobs, since the IBM i WRKJOB command will not show
the job until it is released from the LSAM job tracking master file. The
qualified command name SMAGPL/WRKTRKJOB can be used from outside of the
LSAM menu system, since this command relies on its PRDLIB attribute to
automatically access the LSAM environment.

 

Note that the WRKTRKJOB command does not apply to captured jobs.
Captured jobs are managed by other LSAM commands identified in another
section of this topic.

 

However, when a job is submitted by another job or a workstation that
has been temporarily registered to perform the Capture Job function,
every submitted job will be intercepted and not allowed to run. Instead,
a special LSAM prompt window appears requesting verification or update
of the suggested captured job ID, and after that step a completion
message appears on the IBM i command line to explain that the job was
captured and not allowed to run. This behavior is obviously different
from tracked or queued jobs.

Captured Job ID Window

  ----------------------------------------------------------------------------------------------------------------------
                                                         TRKJOBW0
                                                             
                              The named job has been captured by the SMA LSAM and will not be
                             submitted. Type any changes to the captured job ID used to label  
                                this job information and press Enter to complete the capture.
                                                             
   [      Captured job ID:]{style="color: #008000;"} [TESTCAPJOB  ]{style="color: #ffcc00;text-decoration: underline;"}                                                              
                              ENTER=Continue   F3/F12=Abort   F14=Skip capture: run or track
  ----------------------------------------------------------------------------------------------------------------------

 

After the Captured Job ID window is accepted by pressing the
\<**Enter**\> key, the command entry line may appear as in the following
example, with a message (ID: SMA0214) indicating the capture action was
completed. The completion message confirms that the Captured Job ID was
accepted and can now be found in the LSAM Captured Jobs list. Depending
on the type of command entry line used, the job capture completion
message may appear at the bottom of the display screen. Jobs that are
captured during a batch job may show the completion message in the job
log report.

 

+----------------------------------+----------------------------------+
| ![White pencil icon on green     | **EXAMPLE:**                     | | circular                         |                                  |
| background](../../../Reso        | \> sbmjob cmd(dsplibl \*print)   |
| urces/Images/example-icon(48x48) | job(TESTCAPJOB)                  |
| .png "Example icon") |                                  |
|                                  | SMAPGM/SMASBMJOB CMD(DSPLIBL     |
|                                  | OUTPUT(\*PRINT)) JOB(TESTCAPJOB) |
|                                  |                                  |
|                                  | Job TESTCAPJOB definition        |
|                                  | captured by SMA IBM i LSAM with  |
|                                  | ID: TESTCAPJOB                   |
+----------------------------------+----------------------------------+

 

If \<**F3**\> or \<**F12**\> is pressed from the capture job window, no
action will follow: the job will not be submitted or captured. The
command entry line will show the following cancellation message (ID:
SMA0213):

Capture aborted, job not captured and not executed.

 

If **F14=Skip capture** is pressed, the job will not be captured but
instead allowed to be submitted normally. In this case, the usual IBM i
submitted job message will be displayed, as in the following example:

Job 021543/USERNAME/TESTCAPJOB submitted to job queue QBATCH in library
QGPL.

### SBMJOB Parameter Constraints

The LSAM job tracking and capture job programs and files support all of
the job definition parameters available in the IBM i SBMJOB command,
except for the parameters listed in the following table.

 

  -------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [There is an undocumented method for including any of these constrained job parameters in the Call command line of an OpCon batch job for IBM i. Contact SMA Support for assistance if any of these parameters is required in a job definition.]
  -------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [The job date applied under IBM i for Tracked, Queued or Captured job has special rules. Tracked jobs will always use the DATE parameter of the original IBM i SBMJOB command. Queued or Captured jobs will be controlled by the OpCon EM Job Date field, but the special value of \*SYSVAL will tell the LSAM to use the original DATE field.]
  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

+-----------+---------------------------+---------------------------+
| Parameter | Description               | Constraint definition     |
+===========+:=========================:+===========================+
| RQSDTA    | Request data              | Not supported. Always use |
|           |                           | the CMD parameter         |
|           |                           | instead.                  |
+-----------+---------------------------+---------------------------+
| SCDDATE   | Schedule date             | Not supported -- job      |
|           |                           | scheduling is controlled  |
|           |                           | by OpCon.                 |
+-----------+---------------------------+---------------------------+
| SCDTIME   | Schedule time             | Not supported -- job      |
|           |                           | scheduling is controlled  |
|           |                           | by OpCon.                 |
+-----------+---------------------------+---------------------------+
| SYSLIBL   | System library list       | Not supported. Relies on  |
|           | override                  | the system value for the  |
|           |                           | system library list.      |
+-----------+---------------------------+---------------------------+
| CPYENVVAR | Copy environment          | -   Not currently         |
|           | variables                 |     supported.            |
|           |                           | -   (Please contact the   |
|           |                           |     SMA Technical Product |
|           |                           |     Manager for the IBM i |
|           |                           |     LSAM if there are     |
|           |                           |     jobs that require     |
|           |                           |     passing of            |
|           |                           |     environment           |
|           |                           |     variables.)           |
+-----------+---------------------------+---------------------------+
| JOBMSGQMX | Maximum size of the job   | Not supported -- relies   |
|           | message queue             | on the setting of the     |
|           |                           | system value.             |
+-----------+---------------------------+---------------------------+
| JOBMSGQFL | Job message queue full    | Not supported -- relies   |
|           | action                    | on the setting of the     |
|           |                           | system value.             |
+-----------+---------------------------+---------------------------+
| INLASPGRP | Initial auxiliary storage | Only the value \*CURRENT  |
|           | group                     | is not supported. If      |
|           |                           | specified, it will be     |
|           |                           | replaced by the value     |
|           |                           | \*JOBD, meaning that the  |
|           |                           | value of this parameter   |
|           |                           | will be obtained from the |
|           |                           | job description used for  |
|           |                           | the job.                  |
+-----------+---------------------------+---------------------------+
| LOGOUTPUT | Job log output            | For OpCon scheduled jobs, |
|           |                           | this parameter is always  |
|           |                           | forced to \*JOBEND in     |
|           |                           | order to conform with the |
|           |                           | LSAM server support for   |
|           |                           | the OpCon/xps JORS (job   |
|           |                           | output retrieval) feature |
|           |                           | -- where a job log may be |
|           |                           | retrieved and viewed from |
|           |                           | the OpCon/xps Schedule    |
|           |                           | display.                  |
+-----------+---------------------------+---------------------------+

: SBMJOB Command Parameter Constraints

### Local Data Area (LDA) Support

Every IBM i job is supported by a system-defined local data area (LDA)
of 1024 bytes that resides in the job\'s temporary library (QTEMP). This
LDA is deleted from the system when a job ends, as the QTEMP library is
deleted. A job\'s LDA is not accessible from another job, except when
the IBM i SBMJOB command passes the content of the submitting job\'s LDA
to the submitted job.

 

As described above, most of the LSAM job tracking, queuing and capture
functions are supported by an exit program that is called whenever the
SBMJOB command from the operating system\'s QSYS library is used, as
long as the LSAM\'s general job tracking function is active. When the
exit program executes it is part of the job that is submitting another
job. Therefore, the exit program has access to the submitting job\'s
LDA. The LSAM exit programs store the LDA content in an LSAM database
file, keyed by the LSAM\'s job tracking number or by the captured job\'s
unique Capture ID. The stored LDA content becomes available for
maintenance until the intercepted job is executed. The LSAM job
scheduling server program, or the LSAM utilities that allow a queued job
to be released manually, both retrieve the LDA content from the database
file and set the LDA of the submitting job just before the LSAM\'s own
SBMJOB (or SBMJOB2) command is executed.

 

There are two ways to maintain the captured LDA content. LSAM Dynamic
Variables may be used for all forms of intercepted jobs: tracked, queued
or captured. For more information about Dynamic Variables, refer to
[Dynamic Variables](Dynamic-Variables.md). The LSAM
menu system also provides access to a function for manually maintaining
stored LDA content, but this function is available only for captured
jobs.

### Job Scheduling Messages for Tracked Jobs

The OpCon Schedule display may show message codes next to a job that
provide more information about the job status that OpCon is reporting.
For example, jobs that complete normally under IBM i show message code
SMA0036. (The LSAM Messages are documented in both the **IBM i LSAM**
online help and the **Concepts** online help.) The following messages
may be reported by IBM i machines to identify exceptions that are unique
to tracked jobs.

#### SMA0045

This message is highly unlikely to occur. It would normally only be
displayed in developer testing environments under unusual circumstances.

Message . . . . : IBM i LSAM cannot find the Job Tracking record for a

Tracked or Queued job.

 

When OpCon/xps sends a TX1 (start job) transaction identified as job
type

Tracked or Queued, the LSAM must have a job definition record stored in
the

Job Tracking job definition master file (TRKJOBF00). This message is
sent

when a record cannot be found for the Job Tracking Number that was
returned

in field code 0004 (private data) of the TX1 transaction. This error
should

not occur under normal circumstances. It could be caused by corrupted
data

communications or a programming error.

#### SMA0052

This message could appear if the LSAM started tracking a job, but the
job was manually released from LSAM Job Tracking while OpCon was not
communicating with the LSAM. After OpCon communications is restored, the
Tracked or Queued job information would be sent to OpCon for processing
and then OpCon would attempt to release the job. This error response
helps prevent duplicate jobs from running.

Message . . . . : Tracked Job status does not permit release of job.

Jobs in the LSAM Job Tracking file, TRKJOBF00, can only be released if
they do

not have a status suggesting they have already been processed by the
LSAM or

by OpCon/xps. For the LSAM WRKTRKJOB command display, the only job
status

codes that permit manually releasing a job are E = error from OpCon/xps,
and

T = LSAM Tracking (but OpCon/xps has not responded). If OpCon/xps shows

this message ID for a failed job, it is because the job was already

released, usually manually while OpCon/xps was down.

 

When failed job status code SMA0052 appears, it is a signal that manual
job control actions will be required from the operator to properly
resolve the job\'s status under OpCon and to assure that any required
jobs have completed normally under IBM i. An illustration of this job
status follows.

Example of SMA0052 Error Message for AdHoc Job

![Example of SMA0052 Error Message for AdHoc Job](../../../Resources/Images/IBM-i/Example-of-SMA0052-Error-Message-for-AdHoc-Job.png "Example of SMA0052 Error Message for AdHoc Job"){.flat}

 

The reason the LSAM reports back to OpCon that there is an error, rather
than reporting that the job has completed normally, is because the LSAM
does not continue to track a job once it has been manually released.
Therefore, the operator must manually inspect the job results to assure
normal completion. Similarly, the operator will have to manually adjust
the OpCon job status (for example, forcing the job status to normal
completion) after inspecting the job\'s results. In summary, once an
operator chooses a manual process for releasing jobs, the automated
processes will no longer attempt to control a job but will only attempt
to prevent job duplication. Thus, if circumstances trigger this message
SMA0052, it is a signal that further manual control will be required to
fully recover from the situation that forced a manual job release in the
first place.

### Preventing Duplicate Queued Jobs

When the IBM i system may start more than one job of the same name that
would qualify for Job Queuing on an OpCon schedule, it is possible to
use the \"Allow Multi-Instance\" box on the OpCon Job Master record to
either prevent or allow duplicate jobs to run at the same time. If
multiple jobs are expected, then it is probably desirable to track them
all on the OpCon schedule. However, if, for example, a human operator
accidentally starts a second instance of a job, then it may be preferred
to prevent duplicate jobs from running.

 

  -------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [Depending on the version of the OpCon that is being used, it may be necessary to request a patch to the SAM module for older versions of OpCon, in order to implement the logic that applies the \"Allow Multi-Instance\" box to the control of Queued Jobs.]
  -------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

When duplicate jobs are allowed to run at the same time, the OpCon
schedule will show the jobs with the first job having only the original
job name, while any duplicate jobs will be assigned a name that includes
the original job name text plus a \$ sign and a sequence number. For
example:

-   QJOBNAME
-   QJOBNAME\$0001
-   QJOBNAME\$0002

Remember, though, that if the same job is started after all the previous
duplicate jobs have ended, then the new job will simply replace the
original job name in the same schedule. The numbered secondary jobs
would only be reactivated (replaced in the daily schedule, showing
active) if more duplicate job requests would follow the isolated new
instance of the same job name.

#### Rules for Preventing Duplicate Queued Jobs

The following constraints and configuration requirements define how
OpCon and supporting LSAMs can control duplicate Queued Jobs.

1.  The \$JOB:TRACK event is not supported. The concept of Tracking
    implies that a job on the host system is already running (or, it
    will always be allowed to run by the IBM i LSAM with no
    constraints). The only purpose of the \$JOB:TRACK event is to enable
    OpCon to become aware of, and optionally respond to the completion
    of a job that was started outside of the control of OpCon. Tracked
    jobs cannot be conditioned by any OpCon dependencies or other
    constraints, therefore the flag to Allow Multi-Instance will also
    have no effect on Tracked jobs.
2.  The \$JOB:QUEUE event is supported by the job master record flag to
    Allow Multi-Instance. If this flag is checked, then duplicate,
    concurrent jobs will be allowed. If the flag is not checked (which
    is the default setting for a new job), then the \$JOB:QUEUE event
    will be rejected if:
    a.  The job has the same name as a currently active job.
    b.  The job is designated for the same schedule as a currently
        active job.
    c.  The original job is still active. (*Refer to the discussion
        below for more details about the term \"active.\"*) Once the
        original job finishes, with either status of successful or
        failed, the job is allowed to be replaced by a new \$JOB:QUEUE
        event.
    d.  The new job start request designates the same run day as the
        currently active job. This constraint implies that if the same
        schedule has already been built for the next day, it will be
        possible to run the Queued Job for the next day\'s schedule. But
        if a \$JOB:QUEUE event specifies the date of the currently
        active job, then the request will be considered a duplicate and
        be rejected. It becomes critical to control the Date parameter
        of the \$JOB:QUEUE event if a schedule from yesterday is still
        active after OpCon processing moves into the new day.
3.  Queued Jobs that fail the requirements for duplicate Queued Job
    prevention will be rejected and show in the IBM i LSAM an error code
    of SMA0014. (Technical support personnel may need to know that the
    rejection of the job is communicated from OpCon using the existing
    TE1 transaction type that includes a short description of
    \"Duplicate Job\". This transaction type and short description are
    translated by the LSAM to report the SMA0014 error in the LSAM Job
    Tracking logs.)
4.  The flag to \"Allow Multi-Instance\" is implemented only on the
    OpCon job master record, and not in the Daily job table. The flag is
    designed to control the schedule and job build process, therefore,
    it has no meaning for jobs that are already built.
5.  Remember that the IBM i LSAM makes it possible for jobs that have
    the same name to either allow duplicates or prevent duplicates, as
    long as those jobs have some other unique attribute that is
    supported by the IBM i LSAM Job Tracking Parameters records. That
    is, if the job was started by a different User, or by using a
    different Job Description or Job Description Library, or if the job
    was designated to run in a different Job Queue or Job Queue Library,
    then each distinct job could be associated with a different OpCon
    Schedule. This implies that a job of the same name could be built in
    two different OpCon schedules, where one job master record allows
    duplicate Queued Jobs, whereas the other OpCon schedule\'s job
    master record would prevent duplicate jobs. This makes it possible
    to have different controls for test and production environments.

#### Definition of an \"Active\" Job

This information is intended for Technical Support personnel. It refers
to information that is only visible to IBM i system operators who have
authority to use the IBM i LSAM log viewer that shows the OpCon
communications trace log records. It is not usually required to
understand this topic in order to configure OpCon and the LSAM to manage
Queued Jobs. But if a behavior of a Queued Job does not appear as
expected, then it might be necessary to understand this background
information.

 

Tracked and Queued jobs are supported in a unique way by a block of data
that is provided by the LSAM once a job has been defined in the host
system where it will run (or is already running). This block of data is
labeled \"PDATA\", referring to \"Process identification DATA.\" For IBM
i jobs, the PDATA includes the IBM i Job ID information, along with the
LSAM\'s additional Job Tracking Sequence Number. The PDATA is provided
to OpCon after the LSAM intercepts a job and sends one of the \$JOB
event commands to OpCon.

 

The presence or absence of PDATA figures into the formula for
multi-instance control of Queued jobs. For the purpose of this document,
a reference to an \"active\" job is a reference to a job that has PDATA
assigned to it already, and/or a reference to a job that has actually
started running. When the job has not actually started running on the
host system, it will not yet show as a truly active job in the OpCon
schedule at first.

 

The time when a job is considered active also depends on how the job
master record was configured. There are various schemes for defining job
master records in OpCon that can be used as Tracked or Queued jobs. Job
master records can be marked \"do not build\" in which case they will
not appear on a schedule until a \$JOB:QUEUE (or \$JOB:TRACK and some
others) event command is received. But if a job master record is allowed
to be built on the schedule by OpCon using methods that cause the job
qualification process to effectively wait for a \$JOB:QUEUE event from
the host, then the job would at first not have any PDATA associated with
it.

 

The control over duplicate Queued jobs considers both the PDATA and the
actual running status of a job as follows:

-   **Not Active**: If a job is built on a daily schedule, and the job
    is not yet running, and the job does not have PDATA, then it is like
    having a finished job on the schedule, in that a \$JOB:QUEUE event
    will be accepted and have the effect of rebuilding the Daily job
    from the job master.
-   **Active**: If a job is on the daily schedule with PDATA, whether it
    is running yet or not, and the job has not reached a finished
    status, then the Allow Multi-Instance flag will control whether a
    \$JOB:QUEUE event is either rejected or causes a new instance of the
    job to be added to the schedule.
-   **Active**: If a job on the daily schedule was started by OpCon
    before receiving PDATA, then it is considered active from the time
    that OpCon generated the job start transaction. In this case, if a
    \$JOB:QUEUE event arrives, it will either be rejected if
    multi-instance is not allowed, or it will cause a second instance of
    the job to be added to the schedule (with PDATA) if multi-instance
    is allowed. In this case, the IBM i host will have received the job
    start request for the original job and that will result in PDATA
    being sent back to OpCon as the job is submitted to run. This action
    becomes separate from the activity in the host that generated the
    \$JOB:QUEUE event.

If questions arise related to the management of Queued Jobs, please
contact SMA Support for assistance.

#### Configuration to Prevent Duplicate Queued Jobs

The IBM i LSAM cooperates with OpCon to track jobs started outside of
OpCon control, using either the Tracked Job or Queued Job method.
Prevention of duplicate jobs applies only to the Queued Job method. The
Queued Job method always requires some pre-configuration in both the IBM
i LSAM master files and in the OpCon job master record of some schedule.

##### IBM i LSAM Job Tracking Parameters

According to the rules and constraints above, a IBM i Job Tracking
Parameters master record must be configured for a Tracked Type of \"Q\"
= queued. The Tracked Type of \"T\" = tracked cannot be controlled and
duplicate Tracked jobs will always be allowed.

 

If users wish to implement duplicate job restrictions on an existing
OpCon job that was originally configured with the IBM i sub-type of
\"Tracked Job,\" it\'s possible to change the job master to \"Queued
Job.\" However, this would also require changing the corresponding IBM i
LSAM Job Tracking Parameters record to a value of \"Q\" instead of
\"T\". At the same time, the OpCon job master record must be carefully
examined when any job is changed from Tracked to Queued, since the
Queued Job sub-type does allow OpCon to override the IBM i job
parameters, whereas the previous Tracked Job type did not.

##### OpCon Job Master Record Configuration

As explained in the previous paragraph, if any IBM i Job Tracking
Parameters record is changed from Track Type T to Track Type Q, then the
corresponding OpCon job master record must also be changed. In order to
imitate the processing of a Tracked job, some of the newly opened job
master record fields may need changing from a character value to just
use the default field value of asterisk (\*). This tells the IBM i LSAM
Queued Job management routines to accept the original job definition
that was supplied when the job was requested by a user or other job,
outside the control of OpCon.

 

The following illustration of an OpCon job master record for an IBM i
Queue Job uses red arrows to mark the most important fields that
participate in the control of duplicate Queued Jobs.

OpCon Job Master Record for IBM i Queued Job

![OpCon Job Master Record for IBM i Queued Job](../../../Resources/Images/IBM-i/OpCon-Job-Master-Record-for-IBM-i-Queued-Job.png "OpCon Job Master Record for IBM i Queued Job"){.flat}

If the Job Type for an existing job is changed to \"Queued Job\" from
\"Tracked Job,\" then it will be important to carefully review the job
description fields that appear at the bottom of the illustration above.
After the job type change, some of those fields may show values that
would be used by the IBM i LSAM queued job routines to override the
original values supplied by the user or program that submitted the job.
It may be necessary to manually change some default character values to
use instead an asterisk (\*). The asterisk tells the IBM i LSAM to use
the original job description values that were specified within IBM i
when the job started.

#### Results of Duplicate Queued Job Prevention

The IBM i LSAM agent software documents when a Queued Job request (that
is, the \$JOB:QUEUE event command) has been rejected. The status of
tracked and queued jobs may be viewed using the WRKTRKJOB command or by
selecting option 2: Job track logs, from the LSAM sub-menu 2: Job Track
Menu.

 

Type option 5 next to any line showing error code SMA0014 and press
\<**Enter**\> to display the log entry details. The Details display
shows the **TE1** OpCon transaction code at the top, right. Just below,
on the left next to the error code SMA0014 it shows the reason text for
the rejection that was provided by OpCon. The reason text \"Duplicate
Job\" will appear for this type of duplicate Queued Job rejection.

## Job Tracking and Queuing Screens and Windows

### Job Track Menu

Job Track Menu

  ---------------------------------------------------------------------------------------------------------------------------------------------------------- --
  [SYSTEMNAME]{style="color: #008000;"}                     JOB TRACK MENU                     [  00/00/00]{style="color: #008000;"}                            [USERNAME]{style="color: #008000;"}                                                            [22:55:39]{style="color: #008000;"}                         
                                                                                                                                                             
   Select one of the following:                                                                                                                              
                                                                                                                                                             
   1. [ Job track parameters]{style="color: #008000;"}                                                                                                           2. [ Job track logs (WRKTRKJOB)]{style="color: #008000;"}                                                                                                 
   3. [ Start job track (STRJOBTRK)]{style="color: #008000;"}                                                                                                    4. [ End job track (ENDJOBTRK)]{style="color: #008000;"}                                                                                                  
   5. [ Check job track status (JOBTRKSTS)]{style="color: #008000;"}                                                                                             6. [ Maintain dynamic variables]{style="color: #008000;"}                                                                                                 
   7. [ Job tracking configuration]{style="color: #008000;"}                                                                                                     8. [ Start job capture (STRCAPJOB)]{style="color: #008000;"}                                                                                              
   9. [ End job capture (ENDCAPJOB)]{style="color: #008000;"}                                                                                                   10. [ Display captured jobs (DSPCAPJOB)]{style="color: #008000;"}                                                                                          
  11. [ Work with captured jobs (WRKCAPJOB)]{style="color: #008000;"}                                                                                                                                                                                                                                                      
   Selection or command                                                                                                                                      
   ===\>\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_       
  \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_   
   F3=Exit   F4=Prompt   F9=Retrieve   F12=Cancel                                                                                                            
   F13=Information Assistant   F16=System main menu                                                                                                          
  ---------------------------------------------------------------------------------------------------------------------------------------------------------- --

###### Menu Pathways

Main Menu \> Job track menu (\#1)

###### Fields

Select or command: Type the number of the option to be executed, and
press Enter to continue.

###### Options

-   1 = Job track parameters
-   2 = Job track logs (WRKTRKJOB)
-   3 = Start job track (STRJOBTRK)
-   4 = End job track (ENDJOBTRK)
-   5 = Check job track status (JOBTRKSTS)
-   6 = Maintain dynamic variables
-   7 = Job tracking configuration
-   8 = Start job capture (STRCAPJOB)
-   9 = End job capture (ENDCAPJOB)
-   10 = Display captured jobs (DSPCAPJOB)
-   11 = Work with captured jobs (WRKCAPJOB)

The options displayed on this menu are explained in the following
sections of this document. Type an option number in the Selection or
command line and press \<**Enter**\> to begin using any of the options.

###### Functions

-   **F3=Exit**: Returns to the master menu.
-   **F4=Prompt**: Prompts for keywords for any command entered in the
    Select or command line.
-   **F9=Retrieve**: Retrieves the previous command that was entered on
    the Select or the command line. If it is pressed multiple times, the
    system goes further and further back to previous commands.
-   **F12=Cancel**: Returns to the master menu.
-   **F13=Information Assistant**: Branches to the IBM i general help
    screen.
-   **F16=System main menu**: This is always shown on any
    system-generated menu screen.It branches to the general command
    entry menu for IBM i. Return to the previous menu by pressing
    \<**F3**\> or \<**F12**\>. This function is not commonly used and
    can be restricted for certain user profiles.

### Job Track Parameters

Use function key \<**F11**\> to alternate between two useful views of
the list of Job Track Parameters.

 

When option 4=Delete is used, the list of records selected for deletion
will appear in whichever format was in effect when the option code was
entered. Accordingly, pressing \<**F11**\> to alter the view will erase
the program\'s record of any previous option codes that were entered,
including any records selected for deletion (that were not yet confirmed
for deletion). Thus, function key \<**F11**\> has the same effect as
function key \<**F5**\> = Refresh, in addition to changing the displayed
list format.

-   **Screen Title**: Job Tracking Parameters (2 Views)
-   **Screen ID**: TRKPARR1

###### Menu Pathways

Main Menu \> Job track menu (\#1) \> Job track parameters (\#1)

###### Fields

+----------------+----------------------------------------------------+
| Field          | Description                                        |
+================+====================================================+
| Search content | Type any content that is part of a Job Track       |
|                | Parameter record and press \<Enter\>. Can be used  |
|                | to search for jobs, schedules, or any other field  |
|                | value.                                             |
+----------------+----------------------------------------------------+
| Opt            | \<**Tab**\> to a row in the table, type an option  |
|                | number and press \<**Enter**\> to perform that     |
|                | function for the selected line.                    |
+----------------+----------------------------------------------------+
| Job Name       | The name portion of an IBM i job. The IBM i full   |
|                | job names (per instance of a job) include the      |
|                | name, the submitting user name, and a unique job   |
|                | number. The name portion is common to as many      |
|                | instances of the same job definition as may be     |
|                | executed. The IBM i permits more than one instance |
|                | of the same job name to be executed concurrently.  |
+----------------+----------------------------------------------------+
| TYP            | Tracking types:                                    |
|                |                                                    |
|                | -   **T** = Tracking: OpCon support, no parameter  |
|                |     overrides or dependencies                      |
|                | -   **Q** = Queuing: OpCon support, with parameter |
|                |     overrides, dependencies                        |
|                | -   **P** = Passive: OpCon status display only; no |
|                |     interrupt of SBMJOB process                    |
|                | -   **A** = Auto-Tracking: used only for Allow or  |
|                |     Prevent auto-tracking at LSAM                  |
+----------------+----------------------------------------------------+
| AUT            | Automatic Tracking control:                        |
|                |                                                    |
|                | -   **A** = Allow auto-tracking                    |
|                | -   **P** = Prevent auto-tracking                  |
|                | -   **blank** = does not specifically allow or     |
|                |     prevent auto-tracking                          |
+----------------+----------------------------------------------------+
|                | **Fields used to filter/select IBM i jobs for      |
|                | Tracking or Queuing**                              |
+----------------+----------------------------------------------------+
| Job User       | The IBM i User Profile name that owns/executes the |
|                | job.                                               |
+----------------+----------------------------------------------------+
| Jobd Name      | Job Description - a system object that defines how |
|                | a job is to be processed.                          |
+----------------+----------------------------------------------------+
| Jobq Name      | Job queue - a system object that stores job        |
|                | requests while they are waiting to be executed, or |
|                | as long as they are in hold status.                |
+----------------+----------------------------------------------------+
|                | **Fields used to select an OpCon Schedule for      |
|                | Tracking or Queuing**                              |
+----------------+----------------------------------------------------+
| Sched Name     | OpCon Schedule Name (may be 128 characters, as     |
|                | seen in the record detail, but only the first few  |
|                | characters appear in this list).                   |
+----------------+----------------------------------------------------+
| Sched Date     | The Date of the OpCon Schedule.                    |
+----------------+----------------------------------------------------+
| Frequency      | The Frequency assigned to this job on the OpCon    |
|                | Schedule.                                          |
+----------------+----------------------------------------------------+
| Job Name       | The name portion of the IBM i job which is also    |
|                | the job name on the OpCon schedule.                |
+----------------+----------------------------------------------------+

:  

###### Options

-   **2=Change**: To proceed to the Job Tracking Parameters window, type
    2 next to the job tracking definition and press \<**Enter**\>.
-   **3=Copy**: To copy the job tracking definition, type 3 next to the
    job tracking definition and press \<**Enter**\>.
-   **4=Delete**: To copy the job tracking definition(s), type 4 next to
    the job tracking definition(s) and press \<**Enter**\> to proceed to
    the Job Tracking Parameters Confirm Delete of Records screen.
-   **5=Display**: To display the full details of a list entry, type 5
    next to the job tracking definition(s) and press \<**Enter**\>.

###### Functions

-   **F3=Exit**: Quits the list of job tracking names and returns to the
    menu.
-   **F5=Refresh**: Re-reads the database and rebuilds the list display.
-   **F6=Add**: Proceeds to the Job Tracking Parameters window.
-   **F11=Sort Sched/Sort JobNam**: Press to alter between Views 1 and 2
    of the job tracking parameters list.
-   **F12=Cancel**: Quits the list of job tacking names and returns to
    the menu.
-   **F17=Top**: Press this function key to jump to the first entry in
    the list.
-   **F18=Bottom**: Press this function key to jump to the last entry in
    the list.
-   **F24=More keys**: Press this function key to see the other valid
    function keys available from the display. All supported functions
    keys remain active, regardless of the function key legend currently
    on display.

#### Maintain/Display Job Tracking Parameters

The description for the Add, Copy, Change and Display screens are the
same for all, using a similar display except that the Display format
does not allow data input. The screen example appears on the next page.

###### Menu Pathways

-   Main Menu \> Job track menu (\#1) \> Job track parameters (\#1) \>
    F6=Add
-   Main Menu \> Job track menu (\#1) \> Job track parameters (\#1) \>
    option 2=Change
-   Main Menu \> Job track menu (\#1) \> Job track parameters (\#1) \>
    option 3=Copy
-   Main Menu \> Job track menu (\#1) \> Job track parameters (\#1) \>
    option 5=Display

 

-   **Screen Title**: Maintain Job Tracking Parameters
-   **Screen ID**: TRKPARR1

###### Fields

+--------------------+-----------------------+-----------------------+
| Parameter          | Default               | Description           |
+====================+:=====================:+=======================+
| Job Name           | IBM i Name Rules      | The name portion of   |
|                    | (Refer to [IBM i Name | an IBM i job. The IBM | |                    | Rules](Configurat     | i full job names (per |
|                    | ion.md#IBM2){.MCXref | instance of a job)    |
|                    | .xref}.)              | include the name, the |
|                    |                       | submitting user name, |
|                    |                       | and a unique job      |
|                    |                       | number. The name      |
|                    |                       | portion is common to  |
|                    |                       | as many instances of  |
|                    |                       | the same job          |
|                    |                       | definition as may be  |
|                    |                       | executed. The IBM i   |
|                    |                       | permits more than one |
|                    |                       | instance of the same  |
|                    |                       | job name to be        |
|                    |                       | executed              |
|                    |                       | concurrently.         |
+--------------------+-----------------------+-----------------------+
| Job user ID        | \*ALL                 | The IBM i User        |
|                    |                       | Profile that          |
|                    |                       | owns/executes the     |
|                    |                       | job.                  |
+--------------------+-----------------------+-----------------------+
| Jobd Name          | \*ALL                 | Job Description - a   |
|                    |                       | system object that    |
|                    |                       | defines how a job is  |
|                    |                       | to be processed. When |
|                    |                       | a specific name is    |
|                    |                       | used in this field it |
|                    |                       | qualifies an IBM i    |
|                    |                       | job for selection for |
|                    |                       | tracking or queuing.  |
+--------------------+-----------------------+-----------------------+
| Jobd Library       | \*ALL                 | The library within    |
|                    |                       | DB2 where the job     |
|                    |                       | description is        |
|                    |                       | located. When a       |
|                    |                       | specific name is used |
|                    |                       | in this field it      |
|                    |                       | qualifies an IBM i    |
|                    |                       | job for selection for |
|                    |                       | tracking or queuing.  |
+--------------------+-----------------------+-----------------------+
| Jobq Name          | \*ALL                 | Job queue - a system  |
|                    |                       | object that stores    |
|                    |                       | job requests while    |
|                    |                       | they are waiting to   |
|                    |                       | be executed, or as    |
|                    |                       | long as they are in   |
|                    |                       | hold status. When a   |
|                    |                       | specific name is used |
|                    |                       | in this field it      |
|                    |                       | qualifies an IBM i    |
|                    |                       | job for selection for |
|                    |                       | tracking or queuing.  |
+--------------------+-----------------------+-----------------------+
| Jobq Library       | \*ALL                 | The library within    |
|                    |                       | DB2 where the job     |
|                    |                       | queue is located.     |
|                    |                       | When a specific name  |
|                    |                       | is used in this field |
|                    |                       | it qualifies an IBM i |
|                    |                       | job for selection for |
|                    |                       | tracking or queuing.  |
+--------------------+-----------------------+-----------------------+
| Schedule Name      | AdHoc                 | The OpCon schedule    |
|                    |                       | that the job is part  |
|                    |                       | of. It must match a   |
|                    |                       | schedule in the OpCon |
|                    |                       | database.             |
+--------------------+-----------------------+-----------------------+
| Schedule Date      | CURRENT               | Required, used to     |
|                    |                       | select from among     |
|                    |                       | multiple instances of |
|                    |                       | an OpCon schedule,    |
|                    | **Note:** If this     | such as when a        |
|                    | field is left blank,  | yesterday schedule    |
|                    | OpCon assumes         | remains incomplete    |
|                    | CURRENT.              | after today\'s        |
|                    |                       | schedule is already   |
|                    |                       | active. Various       |
|                    |                       | values may be used in |
|                    |                       | this field:           |
|                    |                       |                       |
|                    |                       | -   Actual schedule   |
|                    |                       |     date, for         |
|                    |                       |     example,          |
|                    |                       |     2011-02-07 which  |
|                    |                       |     is a date in ISO  |
|                    |                       |     format. Any date  |
|                    |                       |     format accepted   |
|                    |                       |     by OpCon may be   |
|                    |                       |     used, but ISO is  |
|                    |                       |     recommended.      |
|                    |                       | -   Any OpCon date    |
|                    |                       |     special value,    |
|                    |                       |     such as CURRENT,  |
|                    |                       |     LATEST, EARLIEST. |
|                    |                       |     Other values may  |
|                    |                       |     be used, although |
|                    |                       |     most would not    |
|                    |                       |     apply when a      |
|                    |                       |     tracked job is    |
|                    |                       |     being added to a  |
|                    |                       |     schedule. To      |
|                    |                       |     insert special    |
|                    |                       |     values that are   |
|                    |                       |     longer than this  |
|                    |                       |     field allows, use |
|                    |                       |     a Dynamic         |
|                    |                       |     Variable.         |
|                    |                       | -   Dynamic Variable: |
|                    |                       |     Use F8 to obtain  |
|                    |                       |     a list of         |
|                    |                       |     available Dynamic |
|                    |                       |     Variables. The    |
|                    |                       |     Dynamic Variable  |
|                    |                       |     must appear in    |
|                    |                       |     token form (use   |
|                    |                       |     the F8 selection  |
|                    |                       |     method to view    |
|                    |                       |     the value format  |
|                    |                       |     for this          |
|                    |                       |     environment),     |
|                    |                       |     e.g., {DYNVAR}.   |
|                    |                       |     Dynamic variables |
|                    |                       |     may be a good way |
|                    |                       |     to assure that    |
|                    |                       |     the actual OpCon  |
|                    |                       |     Schedule Build    |
|                    |                       |     Date is always    |
|                    |                       |     used, which is    |
|                    |                       |     important if it   |
|                    |                       |     is past midnight  |
|                    |                       |     of the day when   |
|                    |                       |     the schedule was  |
|                    |                       |     built at the time |
|                    |                       |     when a tracked or |
|                    |                       |     queued job will   |
|                    |                       |     be added.         |
+--------------------+-----------------------+-----------------------+
| Frequency          | Blank                 | The OpCon frequency   |
|                    |                       | designation. May be   |
|                    |                       | left blank. If blank, |
|                    |                       | OpCon would assume    |
|                    |                       | the LATEST active     |
|                    |                       | schedule if there is  |
|                    |                       | more than one         |
|                    |                       | schedule that matches |
|                    |                       | the Schedule Name and |
|                    |                       | Schedule Date.        |
+--------------------+-----------------------+-----------------------+
| Track Type         | Q                     | -   **T** = Tracking: |
|                    |                       |     OpCon support, no |
|                    |                       |     parameter         |
|                    |                       |     overrides or      |
|                    |                       |     dependencies      |
|                    |                       | -   **Q** = Queuing:  |
|                    |                       |     OpCon support,    |
|                    |                       |     with parameter    |
|                    |                       |     overrides,        |
|                    |                       |     dependencies      |
|                    |                       | -   **P** = Passive:  |
|                    |                       |     OpCon status      |
|                    |                       |     display only; no  |
|                    |                       |     interrupt of      |
|                    |                       |     SBMJOB process    |
|                    |                       | -   **A** =           |
|                    |                       |     Auto-Tracking:    |
|                    |                       |     used only for     |
|                    |                       |     Allow or Prevent  |
|                    |                       |     auto-tracking at  |
|                    |                       |     LSAM              |
+--------------------+-----------------------+-----------------------+
| Aut-track sub-jobs | Blank                 | Automatic Tracking    |
|                    |                       | control:              |
|                    |                       |                       |
|                    |                       | -   **A** = Allow     |
|                    |                       |     auto-tracking     |
|                    |                       | -   **P** = Prevent   |
|                    |                       |     auto-tracking     |
|                    |                       | -   **blank** = does  |
|                    |                       |     not specifically  |
|                    |                       |     allow or prevent  |
|                    |                       |     auto-tracking     |
+--------------------+-----------------------+-----------------------+

:  

##### Delete Job Tracking Parameters

  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [Format of Confirm Delete list will vary to match current \<**F11**\> sort sequence of List display.]
  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------

-   **Screen Title**: Job Tracking Parameters
-   **Screen ID**: TRKPARR1

###### Menu Pathways

Main Menu \> Job track menu (\#1) \> Job track parameters (\#1) \>
option 4=Delete

###### Fields

Refer to field descriptions for Job Tracking Parameters list display,
above.

###### Functions

-   **F3=Exit**: Quits the list of job tracking names and returns to the
    menu.
-   **F12=Cancel**: Quits the list of job tacking names and returns to
    the menu.
-   **F14=Confirm**: Press this function key to confirm that all the
    records appearing in the list should be deleted. If any are
    incorrect, press **F12=Cancel** instead and change which records are
    marked for deletion with option 4.

### Job Track Logs (WRKTRKJOB)

-   **Screen Title**: Job Track Logs
-   **Screen ID**: LSALOGR1

###### Menu Pathways

-   Main Menu \> Job track menu (\#1) \> Job track logs (\#2)
-   **From Command Entry, enter the command WRKTRKJOB.** This command
    may be entered from any command entry line, as long as the library
    QGPL is in the interactive job\'s library list. It is not necessary
    to set the library list to an LSAM environment, or to enter the LSAM
    menu system, because this command is able to detect which LSAM
    environment has control over job tracking. (When there are multiple
    LSAM environments, only one environment at a time can control job
    tracking.)

###### Fields

+---------------------+----------------------+----------------------+
| Parameter           | Default              | Description          |
+=====================+:====================:+======================+
| Search content      |                      | To quickly search    |
|                     |                      | for a particular     |
|                     |                      | job, enter the first |
|                     |                      | characters of the    |
|                     |                      | job name, or any     |
|                     |                      | other tracked job    |
|                     |                      | log content value,   |
|                     |                      | and press            |
|                     |                      | \<**Enter**\>. Any   |
|                     |                      | value that appears   |
|                     |                      | on the log detail    |
|                     |                      | display may be       |
|                     |                      | searched for, even   |
|                     |                      | though not all       |
|                     |                      | values appear in the |
|                     |                      | list display.        |
+---------------------+----------------------+----------------------+
| Opt                 | None                 | \<**Tab**\> to a row |
|                     |                      | in the table and     |
|                     |                      | enter an option.     |
+---------------------+----------------------+----------------------+
| Job Name            | IBM i Name Rules     | -   The name portion |
|                     | (Refer to [IBM i     |     of an IBM i job. | |                     | Name                 |     The IBM i full   |
|                     | Rules](Configurati   |     job names (per   |
|                     | on.md#IBM2){.MCXref |     instance of a    |
|                     | .xref}.)             |     job) include the |
|                     |                      |     name, the        |
|                     |                      |     submitting user  |
|                     |                      |     name, and a      |
|                     |                      |     unique job       |
|                     |                      |     number.          |
|                     |                      | -   The name portion |
|                     |                      |     is common to as  |
|                     |                      |     many instances   |
|                     |                      |     of the same job  |
|                     |                      |     definition as    |
|                     |                      |     may be executed. |
|                     |                      | -   The IBM i        |
|                     |                      |     permits more     |
|                     |                      |     than one         |
|                     |                      |     instance of the  |
|                     |                      |     same job name to |
|                     |                      |     be executed      |
|                     |                      |     concurrently.    |
|                     |                      | -   [Sort            | |                     |                      |     name]{.ul}: When |
|                     |                      |     F11 is used to   |
|                     |                      |     change the sort  |
|                     |                      |     order of the     |
|                     |                      |     display to Job   |
|                     |                      |     Name (the        |
|                     |                      |     default), the    |
|                     |                      |     list shows all   |
|                     |                      |     entries for a    |
|                     |                      |     job together     |
|                     |                      |     regardless of    |
|                     |                      |     date. The        |
|                     |                      |     entries within   |
|                     |                      |     one job will be  |
|                     |                      |     sorted in        |
|                     |                      |     descending order |
|                     |                      |     according to the |
|                     |                      |     date (last entry |
|                     |                      |     first). The      |
|                     |                      |     column heading   |
|                     |                      |     for Job Name     |
|                     |                      |     will be pink     |
|                     |                      |     when the list is |
|                     |                      |     sorted by name.  |
+---------------------+----------------------+----------------------+
| Number              |                      | The IBM i job        |
|                     |                      | number. The job      |
|                     |                      | number helps keep    |
|                     |                      | entries from the     |
|                     |                      | same job together on |
|                     |                      | the list display     |
|                     |                      | when the list is     |
|                     |                      | sorted by name,      |
|                     |                      | regardless of the    |
|                     |                      | time of the entry.   |
+---------------------+----------------------+----------------------+
| Date                |                      | -   The date when    |
|                     |                      |     the job          |
|                     |                      |     executed, or     |
|                     |                      |     will execute.    |
|                     |                      | -   [Sort            | |                     |                      |     date]{.ul}: When |
|                     |                      |     F11 is used to   |
|                     |                      |     change the sort  |
|                     |                      |     order of the     |
|                     |                      |     display to Date, |
|                     |                      |     the list shows   |
|                     |                      |     all entries in   |
|                     |                      |     descending date  |
|                     |                      |     order (last      |
|                     |                      |     entry first),    |
|                     |                      |     regardless of    |
|                     |                      |     job name. The    |
|                     |                      |     column heading   |
|                     |                      |     for Date will be |
|                     |                      |     pink with the    |
|                     |                      |     list is sorted   |
|                     |                      |     by date.         |
+---------------------+----------------------+----------------------+
| Time                |                      | The time when the    |
|                     |                      | job executed, or     |
|                     |                      | will execute.        |
+---------------------+----------------------+----------------------+
| Svty (Severity)     | 00 -- 99             | The completion code  |
|                     |                      | reported by the job, |
|                     |                      | (i.e., the severity  |
|                     |                      | of the completion    |
|                     |                      | message).            |
+---------------------+----------------------+----------------------+
| Sts (Status)        |                      | An SMA-defined       |
|                     |                      | status code that     |
|                     |                      | indicates the state  |
|                     |                      | of the pending or    |
|                     |                      | completed job. Refer |
|                     |                      | to the table below,  |
|                     |                      | under option         |
|                     |                      | 5=Display, for a     |
|                     |                      | list of all possible |
|                     |                      | status code values.  |
+---------------------+----------------------+----------------------+
| Msg ID (Message ID) | \*NONE               | -   An IBM i message |
|                     |                      |     identifier       |
|                     |                      |     (comprised of 3  |
|                     |                      |     letters followed |
|                     |                      |     by 4 digits).    |
|                     |                      | -   Definitions for  |
|                     |                      |     message IDs may  |
|                     |                      |     normally be      |
|                     |                      |     found in message |
|                     |                      |     files stored in  |
|                     |                      |     the DB2/400      |
|                     |                      |     database. SMA\*  |
|                     |                      |     messages may be  |
|                     |                      |     found in message |
|                     |                      |     file SMAMSGF.    |
|                     |                      | -   Using option     |
|                     |                      |     5=Display        |
|                     |                      |     details will     |
|                     |                      |     usually reveal   |
|                     |                      |     some text that   |
|                     |                      |     explains the     |
|                     |                      |     error message    |
|                     |                      |     ID.              |
+---------------------+----------------------+----------------------+

:  

###### Options

-   **4=Cancel job**: Set job tracking to cancelled status and prevent
    job from being released. Option 4 causes the program to branch to
    the same job detail display as option 5, but showing a red function
    key instruction at line 22, requiring that F23=CNLJOB be pressed to
    confirm the cancel job action.
-   **5=Display detail**: Shows job definition details and any error or
    status message information.
-   **6=Release job**: Manually release job from LSAM tracking (using
    IBM i SBMJOB) either before OpCon/xps releases the job or when
    OpCon/xps has rejected the job tracking request (message ID
    SMA0014).

###### Functions

-   **F3=Exit**: Quits the tracked jobs list and returns to the menu.
-   **F5=Refresh**: Retrieves the latest tracked job information and
    updates the display.
-   **F11=Sort date/Sort name**: Changes the sorted order of the list
    display. The column heading of the current sort order is displayed
    in pink color, and the function key name changes each time
    \<**F11**\> is pressed.
-   **F12=Cancel**: Quits the tracked jobs list and returns to the menu.
-   **F16=Search next**: When a value is entered in the Search content
    field, or a value shows in pink below this field from the last
    search request, pressing \<**F16**\> finds the next (or first)
    occurrence of the value specified. F16 is useful for finding each
    desired log entry when there is more than one log entry that
    satisfies the search request. When a value is first typed into the
    Search content field, \<**F16**\> works the same as the
    \<**Enter**\> key for starting a new search. However, only
    \<**F16**\> may be used to continue a search past the first entry
    that satisfies the search criteria.
-   **F17=Top**: Causes the display to jump to the top of the list. This
    is the equivalent of the first record in the file, but the sort
    order controls which records are listed first.
-   **F18=Bottom**: Causes the display to jump to the last entry in the
    list. This is the equivalent of the last record in the log file, but
    the sort order controls which records are listed last. This function
    key is very helpful when the file is big.
-   **F24=More keys**: Toggles the function key legend between the two
    different lists of function keys that are available for this
    display.

#### Option 5 = Display (Job Track Log Detail)

-   **Screen Title**: Job Track Log Detail
-   **Screen ID**: LSALOGR2

###### Menu Pathways

Main Menu \> Job track menu (\#1) \> Job track logs (\#2) \> 5=Display
detail

###### Fields

+------------------------+-----------------+------------------------+
| Field Type             | Field           | Description            |
+========================+=================+========================+
| Log keys               | Log date        | The date on which this |
|                        |                 | log entry was made.    |
+------------------------+-----------------+------------------------+
|                        | Log time        | The time at which this |
|                        |                 | log entry was made.    |
+------------------------+-----------------+------------------------+
|                        | Log status      | The status of this job |
|                        |                 | tracking record when   |
|                        |                 | the log entry was made |
|                        |                 | (may be different from |
|                        |                 | the job current        |
|                        |                 | status, shown below).  |
|                        |                 | Status code is         |
|                        |                 | followed by text       |
|                        |                 | representing the       |
|                        |                 | meaning of the code.   |
+------------------------+-----------------+------------------------+
|                        | Message ID      | An IBM i Message ID    |
|                        |                 | that may have been     |
|                        |                 | reported during the    |
|                        |                 | processing of a job.   |
|                        |                 | This could be a reason |
|                        |                 | for the status value   |
|                        |                 | of E = error (ID       |
|                        |                 | SMA0014). It could     |
|                        |                 | also represent that    |
|                        |                 | the job has been       |
|                        |                 | released and job ID    |
|                        |                 | information is         |
|                        |                 | available (ID          |
|                        |                 | CPC1221).              |
+------------------------+-----------------+------------------------+
|                        | Message text    | Text of the error      |
|                        |                 | message ID. Sometimes  |
|                        |                 | text can be present in |
|                        |                 | a log entry without a  |
|                        |                 | Message ID. In this    |
|                        |                 | case, the reported     |
|                        |                 | Message ID will be     |
|                        |                 | \"(text)\".            |
+------------------------+-----------------+------------------------+
| IBM i                  | Job name        | The name portion of an |
|                        |                 | IBM i job. The IBM i   |
| Parameters             |                 | full job names (per    |
|                        |                 | instance of a job)     |
|                        |                 | include the name, the  |
|                        |                 | submitting user name,  |
|                        |                 | and a unique job       |
|                        |                 | number.                |
|                        |                 |                        |
|                        |                 | The name portion is    |
|                        |                 | common to as many      |
|                        |                 | instances of the same  |
|                        |                 | job definition as may  |
|                        |                 | be executed.           |
|                        |                 |                        |
|                        |                 | The IBM i permits more |
|                        |                 | than one instance of   |
|                        |                 | the same job name to   |
|                        |                 | be executed            |
|                        |                 | concurrently.          |
+------------------------+-----------------+------------------------+
|                        | Job user        | The User Profile       |
|                        |                 | portion of the IBM i   |
|                        |                 | job identifier.        |
+------------------------+-----------------+------------------------+
|                        | Job number      | The unique identifying |
|                        |                 | number portion of the  |
|                        |                 | IBM i job identifier.  |
+------------------------+-----------------+------------------------+
|                        | Job queue       | Job queue - a system   |
|                        |                 | object that stores job |
|                        |                 | requests while they    |
|                        |                 | are waiting to be      |
|                        |                 | executed, as long as   |
|                        |                 | they are in hold       |
|                        |                 | status, or until       |
|                        |                 | system resources       |
|                        |                 | permit the job to be   |
|                        |                 | released for           |
|                        |                 | execution.             |
|                        |                 |                        |
|                        |                 | -   Jobs that match    |
|                        |                 |     the tracking       |
|                        |                 |     requirements for   |
|                        |                 |     queuing, and are   |
|                        |                 |     recognized by      |
|                        |                 |     OpCon/xps for      |
|                        |                 |     tracking, are held |
|                        |                 |     in the job queue   |
|                        |                 |     until SAM          |
|                        |                 |     scheduling         |
|                        |                 |     requirements and   |
|                        |                 |     dependencies       |
|                        |                 |     permit the job to  |
|                        |                 |     execute.           |
|                        |                 | -   Jobs that are not  |
|                        |                 |     defined for        |
|                        |                 |     queuing are not    |
|                        |                 |     held in a job      |
|                        |                 |     queue by the LSAM  |
|                        |                 |     or OpCon/xps, and  |
|                        |                 |     would only remain  |
|                        |                 |     in the job queue   |
|                        |                 |     until system       |
|                        |                 |     resources permit   |
|                        |                 |     the job to be      |
|                        |                 |     released for       |
|                        |                 |     execution.         |
|                        |                 |                        |
|                        |                 | In most cases, tracked |
|                        |                 | jobs that are not      |
|                        |                 | defined for queuing    |
|                        |                 | are allowed to execute |
|                        |                 | immediately, and       |
|                        |                 | tracking is just a     |
|                        |                 | parallel operation.    |
+------------------------+-----------------+------------------------+
|                        | JOBQ Library    | The library within     |
|                        |                 | DB2/400 where the job  |
|                        |                 | queue is located.      |
+------------------------+-----------------+------------------------+
|                        | For job name    | The ID of the          |
|                        |                 | submitting job, or an  |
|                        |                 | override value         |
|                        |                 | specifying which job   |
|                        |                 | can refer to this job  |
|                        |                 | using the WRKSBMJOB    |
|                        |                 | command.               |
+------------------------+-----------------+------------------------+
|                        | For job number  | The ID of the          |
|                        |                 | submitting job, or an  |
|                        |                 | override value         |
|                        |                 | specifying which job   |
|                        |                 | can refer to this job  |
|                        |                 | using the WRKSBMJOB    |
|                        |                 | command.               |
+------------------------+-----------------+------------------------+
|                        | For job user    | The ID of the          |
|                        |                 | submitting job, or an  |
|                        |                 | override value         |
|                        |                 | specifying which job   |
|                        |                 | can refer to this job  |
|                        |                 | using the WRKSBMJOB    |
|                        |                 | command.               |
+------------------------+-----------------+------------------------+
|                        | Job description | Job Description - a    |
|                        |                 | system object that     |
|                        |                 | defines how a job is   |
|                        |                 | to be processed.       |
+------------------------+-----------------+------------------------+
|                        | JOBD Library    | The library within     |
|                        |                 | DB2/400 where the job  |
|                        |                 | description is         |
|                        |                 | located.               |
+------------------------+-----------------+------------------------+
|                        | Library List    | The list of DB2/400    |
|                        |                 | libraries that are     |
|                        |                 | searched for any type  |
|                        |                 | of object that is      |
|                        |                 | required by a job.     |
|                        |                 |                        |
|                        |                 | -   The system portion |
|                        |                 |     of the library     |
|                        |                 |     list controls      |
|                        |                 |     which operating    |
|                        |                 |     system services    |
|                        |                 |     will be available  |
|                        |                 |     to the job.        |
|                        |                 | -   The user portion   |
|                        |                 |     of the library     |
|                        |                 |     list controls      |
|                        |                 |     where files, data  |
|                        |                 |     areas, and user    |
|                        |                 |     program objects    |
|                        |                 |     (programs, display |
|                        |                 |     files, etc.) can   |
|                        |                 |     be found.          |
+------------------------+-----------------+------------------------+
| IBM i Parameters       | Call command    | The IBM i control      |
| (continued)            |                 | language that names an |
|                        |                 | IBM i or user-defined  |
|                        |                 | Command to be          |
|                        |                 | executed. The name of  |
|                        |                 | the command is also    |
|                        |                 | usually accompanied by |
|                        |                 | command-specific       |
|                        |                 | syntax to provide      |
|                        |                 | additional parameter   |
|                        |                 | values that define     |
|                        |                 | what the command does, |
|                        |                 | and/or what objects    |
|                        |                 | the command operates   |
|                        |                 | on. If the command     |
|                        |                 | text appears to be cut |
|                        |                 | off at the end of the  |
|                        |                 | second line, use       |
|                        |                 | F13=More CMD to see a  |
|                        |                 | much larger display    |
|                        |                 | area showing all (or   |
|                        |                 | more of) the command   |
|                        |                 | text.                  |
+------------------------+-----------------+------------------------+
| SAM                    | Schedule Name   | The OpCon/xps name     |
|                        |                 | assigned to the        |
| Parameters             |                 | controlling Schedule.  |
+------------------------+-----------------+------------------------+
|                        | Sched date      | The OpCon Schedule     |
|                        |                 | Date, which may be an  |
|                        |                 | OpCon special date     |
|                        |                 | keyword or a date,     |
|                        |                 | typically in ISO       |
|                        |                 | format (CCYY-MM-DD).   |
+------------------------+-----------------+------------------------+
|                        | Frequency       | The OpCon/xps          |
|                        |                 | frequency code         |
|                        |                 | assigned to control    |
|                        |                 | when a job executes.   |
+------------------------+-----------------+------------------------+
|                        | Track Type      | -   T = Track          |
|                        |                 | -   Q = Queue          |
+------------------------+-----------------+------------------------+
|                        | Status          | The last reported job  |
|                        |                 | status (from the LSAM  |
|                        |                 | job tracking master    |
|                        |                 | file). May not be the  |
|                        |                 | same as the Log        |
|                        |                 | status, above. Refer   |
|                        |                 | to the table, below,   |
|                        |                 | of possible job status |
|                        |                 | values. The status     |
|                        |                 | code is followed by    |
|                        |                 | text that represents   |
|                        |                 | the meaning of the     |
|                        |                 | code.                  |
+------------------------+-----------------+------------------------+
|                        | SAM job name    | The name assigned by   |
|                        |                 | OpCon/xps to this job  |
|                        |                 | as it appears on a SAM |
|                        |                 | Schedule. For          |
|                        |                 | tracked/queued jobs,   |
|                        |                 | this name is usually   |
|                        |                 | the same as the IBM i  |
|                        |                 | job name.              |
+------------------------+-----------------+------------------------+
|                        | SAM job number  | A unique number        |
|                        |                 | assigned by OpCon/xps  |
|                        |                 | to track each job it   |
|                        |                 | monitors.              |
+------------------------+-----------------+------------------------+

 

  Code         Text                                                                                                                                                                                                                    Meaning                                                                                                                                                                                                               Permitted actions
  ------ ---------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -------------------------
  E         ERROR_TE1                                                                                                                                                                      OpCon/xps has rejected job tracking request and has notified the LSAM with a (TE1) transaction.                                                                                                                                                                   Release job, Cancel job
  F         TX1-FAILED                                                                                                                               Indicates the LSAM was unable to process the OpCon job start request. Refer to the LSAM diagnostic tools for jobs that fail to start, described in Components and Operation.                                                                                                                             
  I       SAM_QUEUED_TI1                                                                                                                                                     OpCon/xps has received a job queuing request, and has responded with SAM job information. (Does not apply to type Tracked.)                                                                                                                                                     Release job, Cancel job
  K       USER_CANCELLED                                                                                                                          Option 4=Cancel job was used to permanently prevent this tracked job from being released. (Cancelled jobs cannot be recovered. The requested task must be submitted as a new job.)                                                                                                                         None
  M         MANUAL_RLS     Option 6=Release job was used to manually submit the job to IBM i for processing. Manually released jobs may not be able to take advantage of any OpCon/xps job master options, such as job-specific message management or spool file management, if a job was released while it was in status \"I\". Jobs that were at status \"E\" would not receive any support from OpCon/xps because they were not recognized by OpCon/xps.  None
  P       PASSIVE_TRACK                                                                                                                                                                                Indicates this job was processed using the True Passive tracking method.                                                                                                                                                                               
  R        LSAM_RLS_TX1                                                                                                                                                                  The LSAM has released the job to IBM i upon receiving a start job transaction (TX1) from OpCon/xps.                                                                                                                                                                 None
  T       LSAM_TRACKING                                                                                                                                                          The LSAM has recognized the job and stored it for tracking, but a response has not yet been received from OpCon/xps.                                                                                                                                                        Release job, Cancel job
  X        SAM_RLS_TX1                                                                                                           OpCon/xps has sent a start job transaction (TX1) but the LSAM has not actually released the job to IBM i. This is normally a transient job status, so the log entry just records the time when this action happened.                                                                                                        None

  : Job Tracking Status Codes

###### Functions

-   **F3=Exit**: Quits the job details display and returns to the menu.
-   **F12=Cancel**: Quits the job details display and returns to the
    list of tracked jobs.
-   **F13=More CMD**: Proceeds to a display of some Job Track Log Detail
    with an extended area reserved to show all (or much more of) the
    Call command text.
-   **F14=More LIBL**: Press \<F14\>, when it is available, to view an
    extended display of the Library List.
-   **F15=View LDA**: Press \<F15\>, when it is available, to view the
    content of the job\'s captured local data area (LDA).
-   **F21=WRKJOB**: Press \<F21\>, when it is available, to go to the
    IBM i Work with Job menu display. After exiting the Work with Job
    menu or any of its functions, the system will return to this log
    detail display.
-   **F22=RLSJOB**: Press \<F22\>, when it is available, to request the
    manual release of a queued job from the LSAM Job Tracking master
    file. After the HOLD window response is given, this program will use
    the LSAM Job Tracking master file data to construct an IBM i SBMJOB
    command, and then execute the command. As a result, the actual IBM i
    job will either be on hold in an IBM i job queue (as specified by
    the job details), or if not held, the job will immediately begin
    execution in the specified IBM i subsystem.
-   **F23=CNLJOB**: Press \<F23\> to confirm and complete the action of
    option 4=Cancel job. When F23 is pressed, the LSAM job tracking
    master record status is set to K=killed, preventing any future
    release of this job, either by OpCon/xps or manually. (A canceled
    job cannot be recovered. Its task must be submitted as a new job.)
-   **PageDown=More details**: Press \<PageDown\> to see additional
    internal and IBM i data that define the tracked job.

#### Option 5 - Page Down = More Details

-   **Screen Title**: Job Track Log Detail - More Detail
-   **Screen ID**: LSALOGR7

###### Menu Pathways

Main Menu \> Job track menu (\#1) \> Job track logs (\#2) \> 5=Display
details \> PageDown

###### Fields

+---------------+------------------+---------------------------------+
| Field Type    | Field            | Description                     |
+===============+==================+=================================+
| Internal data | LDA file key     | The LSAM internal value that    |
|               |                  | identifies the record in the    |
|               |                  | JOBLDAF00 file where the LDA    |
|               |                  | content is stored.              |
+---------------+------------------+---------------------------------+
|               | CMD src member   | The name of the source member   |
|               |                  | in the file DBFCMDSRC where the |
|               |                  | CMD call line is stored.        |
+---------------+------------------+---------------------------------+
|               | Job sbm date     | The date when the job           |
|               |                  | information was intercepted.    |
|               |                  | This date field is used to      |
|               |                  | determine when the Job Tracking |
|               |                  | or Queuing control record, and  |
|               |                  | related information in other    |
|               |                  | files, will be purged from the  |
|               |                  | LSAM database.                  |
+---------------+------------------+---------------------------------+
|               | SMADTA lib name  | SMADTA lib name The name of the |
|               |                  | LSAM environment library that   |
|               |                  | functions as the SMADTA         |
|               |                  | library, in which the JOBLDAF00 |
|               |                  | and DBFCMDSRC related files may |
|               |                  | be found.                       |
+---------------+------------------+---------------------------------+
|               | Trk time stamp   | The full time stamp of the      |
|               |                  | moment when the job information |
|               |                  | was intercepted for storage in  |
|               |                  | the LSAM database files.        |
+---------------+------------------+---------------------------------+
|               | SBMTYP (AutoTrk) | An LSAM control field value     |
|               |                  | that specifies whether          |
|               |                  | automatic job tracking was used |
|               |                  | for this job.                   |
+---------------+------------------+---------------------------------+
| IBM i         | OpCon user ID    | The name or IBM i parameter     |
|               |                  | keyword that controls which     |
| Parameters    |                  | User ID will be applied to the  |
|               |                  | submitted job. When specified   |
|               |                  | by the OpCon/xps job master     |
|               |                  | record, that value will be      |
|               |                  | placed in this field once the   |
|               |                  | information is received from    |
|               |                  | OpCon/xps.                      |
+---------------+------------------+---------------------------------+
|               | Job priority     | The priority of the job in the  |
|               |                  | job queue.                      |
+---------------+------------------+---------------------------------+
|               | Log Lv/Sv/Txt    | The job\'s logging control      |
|               |                  | values: Level, Severity and     |
|               |                  | message text.                   |
+---------------+------------------+---------------------------------+
|               | INQMSGRPY        | The Inquiry Message Reply       |
|               |                  | parameter value.                |
+---------------+------------------+---------------------------------+
|               | CCSID            | The coded character set ID      |
|               |                  | parameter value.                |
+---------------+------------------+---------------------------------+
|               | Language ID      | The LANGID parameter value.     |
+---------------+------------------+---------------------------------+
|               | Country ID       | The CNTRYID parameter value.    |
+---------------+------------------+---------------------------------+
|               | User switches    | The setting that will be        |
|               |                  | applied to the eight            |
|               |                  | user-defined switch indicators, |
|               |                  | U1 - U8.                        |
+---------------+------------------+---------------------------------+
|               | Log output       | The LOGOUTPUT parameter value.  |
+---------------+------------------+---------------------------------+
|               | Print device     | The PRTDEV parameter value.     |
+---------------+------------------+---------------------------------+
|               | Output queue     | Output queue - a system object  |
|               |                  | that stores printer spool files |
|               |                  | (reports for printing) while    |
|               |                  | they are waiting to be printed, |
|               |                  | or as long as they are in hold  |
|               |                  | status.                         |
+---------------+------------------+---------------------------------+
|               | OUTQ Library     | The library within DB2 UDB      |
|               |                  | where the output queue is       |
|               |                  | located.                        |
+---------------+------------------+---------------------------------+
|               | OUTQ Priority    | The priority of spool files in  |
|               |                  | their output queues, for all    |
|               |                  | spool files produced by this    |
|               |                  | job.                            |
+---------------+------------------+---------------------------------+
|               | Job DATE parm    | The DATE parameter value. This  |
|               |                  | value may be overridden by      |
|               |                  | OpCon/xps, for example, so that |
|               |                  | it contains the OpCon/xps       |
|               |                  | Schedule date value.            |
+---------------+------------------+---------------------------------+
|               | Sys Date Fmt     | The system value, Date Format,  |
|               |                  | captured at the time the job    |
|               |                  | was intercepted, which applies  |
|               |                  | to the value in the DATE        |
|               |                  | parameter.                      |
+---------------+------------------+---------------------------------+
|               | Current library  | The CURLIB parameter value,     |
|               |                  | specifying the library name     |
|               |                  | that occupies this high         |
|               |                  | position below the system       |
|               |                  | library list and above the user |
|               |                  | library list in the overall     |
|               |                  | library list for the job.       |
+---------------+------------------+---------------------------------+
|               | Sort sequence    | The SRTSEQ parameter value.     |
+---------------+------------------+---------------------------------+
|               | Alw multi-thread | The ALWMLTTHD parameter value.  |
+---------------+------------------+---------------------------------+
|               | Init ASP group   | The INLASPGRP parameter value.  |
+---------------+------------------+---------------------------------+
|               | Spool file actn  | The SPLFACN (spool file action) |
|               |                  | parameter value.                |
+---------------+------------------+---------------------------------+
|               | Print text       | The PRTTXT parameter value,     |
|               |                  | specifying the line of          |
|               |                  | characters that will appear on  |
|               |                  | all generated spool file        |
|               |                  | reports to label them.          |
+---------------+------------------+---------------------------------+
|               | Routing data     | The RTGDTA parameter, matched   |
|               |                  | to a routing entry in the       |
|               |                  | subsystem where the job will    |
|               |                  | execute in order to determine   |
|               |                  | the values and resources        |
|               |                  | available as the job starts     |
|               |                  | execution.                      |
+---------------+------------------+---------------------------------+

###### Functions

-   **F3=Exit**: Quits the job details display and returns to the menu.
-   **F12=Cancel**: Quits the job details display and returns to the
    list of tracked jobs.
-   **F13=View CMD**: Proceeds to a display of some Job Track Log Detail
    with an extended area reserved to show all (or much more of) the
    Call command text.
-   **F14=View LIBL**: Press \<F14\>, when it is available, to view an
    extended display of the Library List.
-   **F15=View LDA**: Press \<F15\>, when it is available, to view the
    content of the job\'s captured local data area (LDA).
-   **F21=WRKJOB**: Press \<F21\>, when it is available, to go to the
    IBM i Work with Job menu display. After exiting the Work with Job
    menu or any of its functions, the system will return to this log
    detail display.
-   **F22=RLSJOB**: Press \<F22\>, when it is available, to request the
    manual release of a queued job from the LSAM Job Tracking master
    file. After the HOLD window response is given, this program will use
    the LSAM Job Tracking master file data to construct an IBM i SBMJOB
    command, and then execute the command. As a result, the actual IBM i
    job will either be on hold in an IBM i job queue (as specified by
    the job details), or if not held, the job will immediately begin
    execution in the specified IBM i subsystem.
-   **F23=CNLJOB**: Press \<F23\> to confirm and complete the action of
    option 4=Cancel job. When F23 is pressed, the LSAM job tracking
    master record status is set to K=killed, preventing any future
    release of this job, either by OpCon/xps or manually. (A cancelled
    job cannot be recovered. Its task must be submitted as a new job.)
-   **PageUp=Prev detail**: Press \<PageUp\> to return to the previous
    panel of Job Track Log Detail information.

#### Option 6 = Release Job (F22)

##### HOLD Option Window

When option 6=Release job is entered from the Job Track Log list, or
\<F22\> is pressed from the Job Track Detail display to manually release
a job, the HOLD option window is displayed:

Release Job - HOLD Option Window

  ---------------------------------------------------------------------------------------------------------
    RLSJOB Attributes
   
    [HOLD (Y/N)?\...:]{style="color: #008000;"} [N]{style="color: #ffcc00;text-decoration: underline;"}      
    F12=Cancel
  ---------------------------------------------------------------------------------------------------------

###### Fields

**HOLD (Y/N)?**: Type a \'Y\' = yes and press \<Enter\> to cause the job
to be submitted in a released state under IBM i, so that it will run
immediately. When \'N\' = no is typed and \<Enter\> is pressed, the job
will be submitted, but it will be held by IBM i in the specified job
queue, and the job must be manually released from the IBM i job queue.
Choose the option to HOLD the job in order to modify any parameter of
the job\'s definition under IBM i before it is released to run.

###### Functions

**F12=Cancel**: Quits the HOLD option window, cancels the job release
action, and returns to the display where the release job action was
initiated.

##### Job Track Log Detail -- View CMD

Pressing \<**F13**\> from the Job Track Log Detail display provides a
greatly extended viewing area for longer Call commands that could not
fit in the two lines of the detail summary display.

-   **Screen Title**: Job Track Log Detail - View CMD
-   **Screen ID**: LSALOGR3

###### Fields

-   The fields appearing on this display are the same as explained above
    for the summary display of Job Track Log Detail.
-   Call command: If the call command is very long, the PageDown
    function key appears on the first page of this extended display at
    the same time as a plus sign (+) appears at the lower right corner.
    If PageDown has been used, this same screen shows a continuation of
    the Call command text, the PageUp function key appears in the
    command key legend, and a minus sign (-) appears at the beginning of
    the continued command text field.

###### Functions

-   **F3=Exit**: Quits the display of the Job Track Log and returns to
    the menu.
-   **F12=Cancel**: Quits the display of the extended Call command text
    and returns to the Job Track Log Detail summary display.
-   **PageUp**: Appears after PageDown has been used, to move back to
    previous text in the Call command string.
-   **PageDown**: Appears when there is more Call command text than can
    be shown on a single display panel.

##### Job Track Log Detail -- View LIBL

Pressing \<**F14**\> from the Job Track Log Detail display provides a
greatly extended viewing area for longer library lists that could not
fit in the primary detail summary display.

-   **Screen Title**: Job Track Log Detail - View LIBL
-   **Screen ID**: LSALOGR3

###### Fields

-   The fields appearing on this display are the same as explained above
    for the summary display of Job Track Log Detail.
-   **Initial LIBL**: If the job\'s initial library list is very long,
    the PageDown function key appears on the first page of this extended
    display at the same time as a plus sign (+) appears at the lower
    right corner. If PageDown has been used, this same screen shows a
    continuation of the library list, the PageUp function key appears in
    the command key legend, and a minus sign (-) appears at the
    beginning of the continued library list text field.

###### Functions

-   **F3=Exit**: Quits the display of the Job Track Log and returns to
    the menu.
-   **F12=Cancel**: Quits the display of the extended initial LIBL and
    returns to the Job Track Log Detail summary display.
-   **PageUp**: Appears after PageDown has been used, to move back to
    previous entries in the library list.
-   **PageDown**: Appears when there are more library list entries than
    can be shown on a single display panel.

##### Job Track Log Detail -- View LDA

Pressing \<**F15**\> from the Job Track Log Detail display provides
access to a display of the captured job\'s local data area (LDA)
content. This screen is a list of the 15 lines (1024 character) of the
LDA content, but the screen may show a \"no records\" message if the LDA
was either not captured or is completely blank. Function key \<F10\> may
be used to toggle the display between a character-only mode that shows
the whole LDA on one screen (but non-display characters in the LDA will
appear as blanks), and a hex mode that shows the hexadecimal equivalents
for each LDA byte position in over/under mode.

-   **Screen Title**: Job Track Log Detail - LDA Content (2 Views)
-   **Screen ID**: LSALOGR3

###### Fields

  Field                     Description
  ------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Ruler/Character number    A ruler appears across the top of the list display to help identify the ordinal position of each character in the LDA. The numbers on the left of the display name the first character position of content appearing on each line.
  Displayable character     Displayable character content of the LDA content is shown in normal green, next to each character number that appears on the left side.
  Hexadecimal equivalents   Hexadecimal equivalents of each character in the LDA content appear in over/under mode at each character position. This representative view of the hexadecimal characters helps to identify content such as packed numeric data, or other binary data or control characters that cannot be represented on a 5250 (green screen) workstation display as single, displayable characters.

  :  

###### Functions

-   **F3=Exit**: Quits the display of the Job Track Log and returns to
    the menu.
-   **F12=Cancel**: Quits the display of the LDA content view and
    returns to the Job Track Log Detail summary display.
-   **PageUp**: (not shown) May be used if PageDown was previously used
    to show more lines while in Hex display mode.
-   **Page Down**: (Not shown) May be used if \"More\...\" appears at
    the bottom of the display while in Hex display mode.

### Start Job Track (STRJOBTRK)

The Start Job Track option tells the LSAM to monitor Tracked and Queued
Jobs. Job tracking must also be started to use the Capture Job function.
Starting job tracking causes the LSAM to register its exit program with
IBM i. The exit program is run whenever anyone uses the SBMJOB (submit
job) command from the IBM i system library QSYS.

 

+----------------------------------+----------------------------------+
| ![White \"X\" icon on red        | **WARNING:** [When using         | | circular                         | multiple LSAM environments, it   |
| background](../../../Reso        | is only possible to start job    |
| urces/Images/warning-icon(48x48) | tracking from one environment at |
| .png "Warning icon") | a time.]             |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | The reason for this restriction  |
|                                  | is that job tracking is a        |
|                                  | system-wide function that is     |
|                                  | managed by manipulating the exit |
|                                  | points for the system command to |
|                                  | submit jobs (SBMJOB). The exit   |
|                                  | program for LSAM job tracking    |
|                                  | can only be registered for one   |
|                                  | LSAM environment at a time. Job  |
|                                  | Tracking must be stopped in one  |
|                                  | environment before starting it   |
|                                  | from another environment. As     |
|                                  | with all tasks involving         |
|                                  | multiple environments, this      |
|                                  | requires careful coordination    |
|                                  | with the SAM-SS of OpCon.        |
+----------------------------------+----------------------------------+

###### Menu Pathways

-   Main Menu \> Job track menu (\#1) \> Start job track (\#3)
-   From Command Entry, set the current library list for the LSAM
    environment (SMASETLIBL), or use the command entry line from within
    the LSAM menu system, then enter the command STRJOBTRK.

#### Start Job Tracking Messages

There is no display associated with the function to start job tracking.
However, when the start operation has completed normally, the following
message is displayed on the bottom of the LSAM menu screen:

 

**Job tracking started - exit program entries added**

 

If there is any failure to start job tracking, the following message
appears instead:

 

**Job tracking not started**

 

When this error occurs, contact SMA Support for assistance. Additional
information about what error has occurred may be available from your
interactive job log. The job log can be viewed using the following
procedure.

 

[View Interactive Job Log]{.ul} 
1.  Enter the command **WRKJOB** in the command entry line.
2.  Select option 10=Display job log.
3.  Press \<**F10**\> (Display detailed messages).
4.  Press \<**F18**\> (Bottom).
5.  Press \<**PageUp**\> to scroll back to the messages that might
    report any errors that have occurred.

### End Job Track (ENDJOBTRK)

The End Job Track option tells the LSAM to discontinue monitoring
Tracked and Queued Jobs. Stopping job tracking also disables the Capture
Job function. When job tracking is stopped, the LSAM removes its entries
from the IBM i exit program registry.

###### Menu Pathways

-   Main Menu \> Job track menu (\#1) \> End job track (\#4)
-   From Command Entry, set the current library list for the LSAM
    environment (SMASETLIBL), or use the command entry line from within
    the LSAM menu system. Then enter the command ENDJOBTRK.

#### End Job Tracking Messages

There is no display associated with the function to start job tracking.
However, when the start operation has completed normally, the following
message is displayed on the bottom of the LSAM menu screen:

 

**Job tracking ended - exit program entries removed**

 

If there is any failure to start job tracking, the following message
appears instead:

 

**Job tracking not ended**

 

When this error occurs, contact SMA Support for assistance. Additional
information about what error has occurred may be available from the
interactive job log. View the job log using the following procedure.

 

[View Interactive Job Log]{.ul} 
1.  Enter the command **WRKJOB** in the command entry line.
2.  Select option 10=Display job log.
3.  Press \<**F10**\> (Display detailed messages).
4.  Press \<**F18**\> (Bottom).
5.  Press \<**PageUp**\> to scroll back to the messages that might
    report any errors that have occurred.

### Check Job Track Status (JOBTRKSTS)

The pop-up Job Tack Status window displays the job track status. Options
include STARTED and STOPPED.

Check Job Track Status Window

  ------------------------------------------------------------------------------------
   
  [Job track status :]{style="color: #008000;"}   [STOPPED]{style="color: #ff0000;"}    
                          Press Enter to continue                     
  ------------------------------------------------------------------------------------

###### Menu Pathways

-   Main Menu \> Job track menu (\#1) \> Check Job Track Status (\#5)
-   From Command Entry, set the current library list for the LSAM
    environment (SMASETLIBL), or use the command entry line from within
    the LSAM menu system, then enter the command JOBTRKSTS.

### Job Tracking with Multiple LSAM Environments

Only one LSAM environment within an instance of the IBM i operating
system is allowed to control Job Tracking. This constraint is imposed by
the IBM i exit program technique used to enable LSAM Job Tracking.

 

The LSAM programs help to recognize whenever there is a conflict of job
tracking control with another LSAM environment. When the job track
status is checked, it is apparent that job tracking is being managed by
a different environment if there is an error message at the bottom of
the status window. The following figure illustrates this warning.

Check Job Tack Status Window - With Error

  ------------------------------------------------------------------------------------
   
  [Job track status :]{style="color: #008000;"}   [STOPPED]{style="color: #ff0000;"}    
  WARNING: Job Tracking appears active in another environment
                          Press Enter to continue                     
  ------------------------------------------------------------------------------------

### Job Tracking Configuration

-   **Screen Title**: Job Tracking Configuration
-   **Screen ID**: TRKJOBD301

###### Menu Pathway

Main Menu \> Job track menu (\#1) \> Job tracking configuration (\#7)

###### Fields

  ------------------------------------------------------------------------------------------------------------------------------ ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White \"X\" icon on red circular background](../../../Resources/Images/warning-icon(48x48).png "Warning icon")   **WARNING:** [The required procedure for changing the exit program number is to first stop job tracking, then change the number, then restart job tracking. The new number will not take effect until the next time that job tracking is started, and the old number (if not the default value) cannot be found for stopping job tracking if the number has been changed while job tracking is still active.]
  ------------------------------------------------------------------------------------------------------------------------------ ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

+-----------------+-----------------+------------+-----------------+
| Field           | Values          | Default    | Description     |
+=================+:===============:+:==========:+=================+
| Environment     |                 |            | The name of the |
|                 |                 |            | current LSAM    |
|                 |                 |            | environment in  |
|                 |                 |            | which the menu  |
|                 |                 |            | system is       |
|                 |                 |            | running (could  |
|                 |                 |            | be different    |
|                 |                 |            | from the        |
|                 |                 |            | specified Job   |
|                 |                 |            | Track control   |
|                 |                 |            | environment     |
|                 |                 |            | name).          |
+-----------------+-----------------+------------+-----------------+
| Version         |                 |            | The version of  |
|                 |                 |            | LSAM software   |
|                 |                 |            | in this         |
|                 |                 |            | environment,    |
|                 |                 |            | from the        |
|                 |                 |            | LSAVERSION data |
|                 |                 |            | area in library |
|                 |                 |            | SMADTA (or its  |
|                 |                 |            | equivalent).    |
+-----------------+-----------------+------------+-----------------+
| Control         |                 |            | The name of the |
| environment     |                 |            | LSAM            |
|                 |                 |            | environment     |
|                 |                 |            | that is         |
|                 |                 |            | currently, or   |
|                 |                 |            | was last        |
|                 |                 |            | specified as    |
|                 |                 |            | the environment |
|                 |                 |            | in control of   |
|                 |                 |            | job tracking    |
|                 |                 |            | (could be       |
|                 |                 |            | different from  |
|                 |                 |            | the current     |
|                 |                 |            | Environment).   |
+-----------------+-----------------+------------+-----------------+
| Job tracking    | STARTED         |            | The status of   |
| status          |                 |            | LSAM job        |
|                 | STOPPED         |            | tracking,       |
|                 |                 |            | determined by   |
|                 |                 |            | checking for    |
|                 |                 |            | the exit        |
|                 |                 |            | program entries |
|                 |                 |            | in the IBM i    |
|                 |                 |            | registry.       |
+-----------------+-----------------+------------+-----------------+
| QSYS/SBMJOB cmd | 1 -- 2147483647 | 2147483647 | The exit point  |
| exit nbr.       |                 |            | number assigned |
|                 |                 |            | by the LSAM to  |
|                 |                 |            | the job         |
|                 |                 |            | tracking exit   |
|                 |                 |            | program in the  |
|                 |                 |            | IBM i registry. |
+-----------------+-----------------+------------+-----------------+
| Tracked Job     | 00-FF           | 6A         | A pair of       |
| parameter       |                 |            | characters      |
| separator       |                 |            | representing    |
| character - HEX |                 |            | the hexadecimal |
|                 |                 |            | value of the    |
|                 |                 |            | EBCDIC keyboard |
|                 |                 |            | character that  |
|                 |                 |            | marks the       |
|                 |                 |            | division of     |
|                 |                 |            | this LSAM\'s    |
|                 |                 |            | Job Tracking ID |
|                 |                 |            | information     |
|                 |                 |            | fields that are |
|                 |                 |            | sent to OpCon.  |
|                 |                 |            | The same values |
|                 |                 |            | and separator   |
|                 |                 |            | are returned to |
|                 |                 |            | the LSAM when   |
|                 |                 |            | OpCon sends job |
|                 |                 |            | control         |
|                 |                 |            | transactions    |
|                 |                 |            | after a \$JOB   |
|                 |                 |            | event command   |
|                 |                 |            | initiates       |
|                 |                 |            | cooperative job |
|                 |                 |            | tracking. The   |
|                 |                 |            | default value   |
|                 |                 |            | of a vertical   |
|                 |                 |            | bar, or         |
|                 |                 |            | \"pipe\"        |
|                 |                 |            | character is    |
|                 |                 |            | strongly        |
|                 |                 |            | recommended     |
|                 |                 |            | (e.g., \|).     |
|                 |                 |            |                 |
|                 |                 |            |                 |
|                 |                 |            |                 |
|                 |                 |            | **Note**:       |
|                 |                 |            | Attention to    |
|                 |                 |            | this character  |
|                 |                 |            | is usually on   |
|                 |                 |            | required in     |
|                 |                 |            | non-U.S.        |
|                 |                 |            | environments.   |
|                 |                 |            | Please contact  |
|                 |                 |            | SMA Support for |
|                 |                 |            | assistance if   |
|                 |                 |            | Job Tracking is |
|                 |                 |            | not working     |
|                 |                 |            | correctly.      |
+-----------------+-----------------+------------+-----------------+
| Auto-start job  | Y=Yes,          | Y          | This option     |
| tracking        |                 |            | tells the LSAM  |
|                 | N=No            |            | server start    |
|                 |                 |            | and stop        |
|                 |                 |            | programs        |
|                 |                 |            | whether to also |
|                 |                 |            | start or stop   |
|                 |                 |            | Job Tracking at |
|                 |                 |            | the same time   |
|                 |                 |            | as all other    |
|                 |                 |            | LSAM server     |
|                 |                 |            | jobs are        |
|                 |                 |            | managed.        |
+-----------------+-----------------+------------+-----------------+
| Allow \*RQS msg | 0=No,           | 0          | This option     |
| for SBMJOB      |                 |            | controls the    |
|                 | 1=Yes           |            | behavior of the |
|                 |                 |            | Job Tracking    |
|                 |                 |            | command         |
|                 |                 |            | processor exit  |
|                 |                 |            | program when    |
|                 |                 |            | processing the  |
|                 |                 |            | SBMJOB command. |
|                 |                 |            | The default     |
|                 |                 |            | behavior of the |
|                 |                 |            | LSAM will be to |
|                 |                 |            | directly call   |
|                 |                 |            | QCMD when       |
|                 |                 |            | submitting jobs |
|                 |                 |            | that do not     |
|                 |                 |            | qualify for job |
|                 |                 |            | tracking. When  |
|                 |                 |            | the option is   |
|                 |                 |            | set to \'1\' =  |
|                 |                 |            | Yes, the LSAM   |
|                 |                 |            | will provide    |
|                 |                 |            | improved        |
|                 |                 |            | support for the |
|                 |                 |            | IBM i Command   |
|                 |                 |            | Entry screen    |
|                 |                 |            | function keys   |
|                 |                 |            | F9=Retrieve and |
|                 |                 |            | F4=Prompt,      |
|                 |                 |            | while Job       |
|                 |                 |            | Tracking is     |
|                 |                 |            | started.        |
|                 |                 |            | However, this   |
|                 |                 |            | new option      |
|                 |                 |            | should be       |
|                 |                 |            | turned off (set |
|                 |                 |            | to \'0\'=No) in |
|                 |                 |            | environments    |
|                 |                 |            | where request   |
|                 |                 |            | message         |
|                 |                 |            | processing      |
|                 |                 |            | cannot be used  |
|                 |                 |            | to perform the  |
|                 |                 |            | SBMJOB command. |
|                 |                 |            | This condition  |
|                 |                 |            | would typically |
|                 |                 |            | only be         |
|                 |                 |            | discovered by   |
|                 |                 |            | e               |
|                 |                 |            | xperimentation. |
+-----------------+-----------------+------------+-----------------+
| Expand          | 0=No,           | 1          | Many times the  |
| JOBD/JOBQ obj   |                 |            | SBMJOB command  |
| refs            | 1=Yes           |            | parameters use  |
|                 |                 |            | c               |
|                 |                 |            | ross-references |
|                 |                 |            | to other IBM i  |
|                 |                 |            | objects in      |
|                 |                 |            | order to        |
|                 |                 |            | identify which  |
|                 |                 |            | job description |
|                 |                 |            | and/or job      |
|                 |                 |            | queue should be |
|                 |                 |            | used for a job. |
|                 |                 |            | In most cases,  |
|                 |                 |            | these           |
|                 |                 |            | c               |
|                 |                 |            | ross-references |
|                 |                 |            | should be       |
|                 |                 |            | resolved by the |
|                 |                 |            | Job Tracking    |
|                 |                 |            | programs as the |
|                 |                 |            | tracking        |
|                 |                 |            | process starts, |
|                 |                 |            | especially      |
|                 |                 |            | because the job |
|                 |                 |            | start process   |
|                 |                 |            | is typically    |
|                 |                 |            | suspended from  |
|                 |                 |            | its original    |
|                 |                 |            | job, and then   |
|                 |                 |            | resumed from an |
|                 |                 |            | LSAM server     |
|                 |                 |            | job.            |
+-----------------+-----------------+------------+-----------------+
| Allow automatic | 0=None,         | 0          | This control    |
| tracking        |                 |            | field governs   |
|                 | 1=Positive,     |            | how Automatic   |
|                 |                 |            | Job Tracking    |
|                 | 2=Negative      |            | will decide     |
|                 |                 |            | which jobs in   |
|                 |                 |            | the IBM i       |
|                 |                 |            | partition will  |
|                 |                 |            | be selected for |
|                 |                 |            | automatic       |
|                 |                 |            | tracking. The   |
|                 |                 |            | impact of this  |
|                 |                 |            | control field   |
|                 |                 |            | is described    |
|                 |                 |            | above in this   |
|                 |                 |            | topic, under    |
|                 |                 |            | \"How Job       |
|                 |                 |            | Tracking Works  |
|                 |                 |            | -\> Automatic   |
|                 |                 |            | Job Tracking.\" |
+-----------------+-----------------+------------+-----------------+
| Expand          | 0=No,           | 0          | -   This option |
| JOBD/JOBQ obj   |                 |            |     tells the   |
| refs            | 1=Yes           |            |     Job         |
|                 |                 |            |     Tracking    |
|                 |                 |            |     exit        |
|                 |                 |            |     program     |
|                 |                 |            |     whether to  |
|                 |                 |            |     replace     |
|                 |                 |            |     \*LIBL in   |
|                 |                 |            |     the Job     |
|                 |                 |            |     Description |
|                 |                 |            |     Library     |
|                 |                 |            |     name and    |
|                 |                 |            |     the Job     |
|                 |                 |            |     Queue       |
|                 |                 |            |     Library     |
|                 |                 |            |     name of the |
|                 |                 |            |     intercepted |
|                 |                 |            |     SBMJOB      |
|                 |                 |            |     command. It |
|                 |                 |            |     also        |
|                 |                 |            |     controls    |
|                 |                 |            |     replacing a |
|                 |                 |            |     value of    |
|                 |                 |            |     \*JOBD in   |
|                 |                 |            |     the Job     |
|                 |                 |            |     Queue Name  |
|                 |                 |            |     parameter   |
|                 |                 |            |     of the      |
|                 |                 |            |     SBMJOB      |
|                 |                 |            |     command.    |
|                 |                 |            |     Replacing   |
|                 |                 |            |     these       |
|                 |                 |            |     indirect    |
|                 |                 |            |     object      |
|                 |                 |            |     references  |
|                 |                 |            |     may provide |
|                 |                 |            |     more exact  |
|                 |                 |            |     control     |
|                 |                 |            |     over which  |
|                 |                 |            |     jobs are    |
|                 |                 |            |     qualified   |
|                 |                 |            |     for Job     |
|                 |                 |            |     Tracking,   |
|                 |                 |            |     and over    |
|                 |                 |            |     selection   |
|                 |                 |            |     of the      |
|                 |                 |            |     OpCon       |
|                 |                 |            |     Schedule    |
|                 |                 |            |     and         |
|                 |                 |            |     Schedule    |
|                 |                 |            |     Date that   |
|                 |                 |            |     is matched  |
|                 |                 |            |     when there  |
|                 |                 |            |     is more     |
|                 |                 |            |     than one    |
|                 |                 |            |     instance of |
|                 |                 |            |     the same    |
|                 |                 |            |     IBM i Job   |
|                 |                 |            |     Name that   |
|                 |                 |            |     could be    |
|                 |                 |            |     tracked,    |
|                 |                 |            |     such as     |
|                 |                 |            |     when a Test |
|                 |                 |            |     environment |
|                 |                 |            |     is present  |
|                 |                 |            |     in the same |
|                 |                 |            |     IBM i       |
|                 |                 |            |     partition   |
|                 |                 |            |     as a        |
|                 |                 |            |     Production  |
|                 |                 |            |                 |
|                 |                 |            |    environment. |
|                 |                 |            | -   When this   |
|                 |                 |            |     option is   |
|                 |                 |            |     set to      |
|                 |                 |            |     0=No, the   |
|                 |                 |            |     indirect    |
|                 |                 |            |     object      |
|                 |                 |            |     reference   |
|                 |                 |            |     values of   |
|                 |                 |            |     \*LIBL and  |
|                 |                 |            |     \*JOBD      |
|                 |                 |            |     could only  |
|                 |                 |            |     be matched  |
|                 |                 |            |     by the LSAM |
|                 |                 |            |     Job         |
|                 |                 |            |     Tracking    |
|                 |                 |            |     Parameter   |
|                 |                 |            |     field       |
|                 |                 |            |     special     |
|                 |                 |            |     value of    |
|                 |                 |            |     \*ALL.      |
|                 |                 |            | -   (The SBMJOB |
|                 |                 |            |     parameter   |
|                 |                 |            |     values that |
|                 |                 |            |     are managed |
|                 |                 |            |     by the LSAM |
|                 |                 |            |     Job         |
|                 |                 |            |     Tracking    |
|                 |                 |            |     exit        |
|                 |                 |            |     program are |
|                 |                 |            |     the values  |
|                 |                 |            |     present in  |
|                 |                 |            |     the         |
|                 |                 |            |     original    |
|                 |                 |            |     SBMJOB      |
|                 |                 |            |     command,    |
|                 |                 |            |     not the     |
|                 |                 |            |     finally     |
|                 |                 |            |     resolved    |
|                 |                 |            |     job         |
|                 |                 |            |     definition  |
|                 |                 |            |     parameters  |
|                 |                 |            |     that are    |
|                 |                 |            |     replaced by |
|                 |                 |            |     IBM i only  |
|                 |                 |            |     when the    |
|                 |                 |            |     job is      |
|                 |                 |            |     actually    |
|                 |                 |            |     processed   |
|                 |                 |            |     for         |
|                 |                 |            |     placement   |
|                 |                 |            |     on a job    |
|                 |                 |            |     queue -     |
|                 |                 |            |     which       |
|                 |                 |            |     happens     |
|                 |                 |            |     after the   |
|                 |                 |            |     LSAM Job    |
|                 |                 |            |     Tracking    |
|                 |                 |            |     exit        |
|                 |                 |            |     program.)   |
+-----------------+-----------------+------------+-----------------+

:  

###### Functions

-   **F3=Exit**: Quit the display without update and return to the menu.
-   **F5=Refresh**: Restore the current control file values to the
    screen, overlaying any typed input.
-   **F7=STRJOBTRK**: Start job tracking, the same as menu option 3.
-   **F8=ENDJOBTRK**: End job tracking, the same as menu option 4.
-   **F12=Cancel**: Quits the display without update and return to the
    previous screen.

### Start Job Capture (STRCAPJOB)

The screen includes detailed instructions about how to use this
function. More information about using the Capture Job feature can be
found above under Operating Job Tracking and How LSAM job tracking
works.

-   **Screen Title**: Start Capture Job
-   **Screen ID**: STRCAPJOB1

###### Menu Pathway

Main Menu \> Job track menu (\#1) \> Start job capture (STRCAPJOB) (\#8)

###### Fields

+---------------------+------------+---------+---------------------+
| Field               | Values     | Default | Description         |
+=====================+:==========:+:=======:+=====================+
| Environment         |            |         | The name of the     |
|                     |            |         | current LSAM        |
|                     |            |         | environment in      |
|                     |            |         | which the menu      |
|                     |            |         | system is running   |
|                     |            |         | (could be different |
|                     |            |         | from the specified  |
|                     |            |         | Job Track control   |
|                     |            |         | environment name).  |
+---------------------+------------+---------+---------------------+
| Version             |            |         | The version of LSAM |
|                     |            |         | software in this    |
|                     |            |         | environment, from   |
|                     |            |         | the LSAVERSION data |
|                     |            |         | area in library     |
|                     |            |         | SMADTA (or its      |
|                     |            |         | equivalent).        |
+---------------------+------------+---------+---------------------+
| Control environment |            |         | The name of the     |
|                     |            |         | LSAM environment    |
|                     |            |         | that is currently,  |
|                     |            |         | or was last         |
|                     |            |         | specified as the    |
|                     |            |         | environment in      |
|                     |            |         | control of job      |
|                     |            |         | tracking (could be  |
|                     |            |         | different from the  |
|                     |            |         | current             |
|                     |            |         | Environment).       |
+---------------------+------------+---------+---------------------+
| Job tracking status | STARTED    |         | The status of LSAM  |
|                     |            |         | job tracking,       |
|                     | STOPPED    |         | determined by       |
|                     |            |         | checking for the    |
|                     |            |         | exit program        |
|                     |            |         | entries in the IBM  |
|                     |            |         | i registry.         |
+---------------------+------------+---------+---------------------+
| Add job or          | IBM i name |         | Type the name of an |
| workstation         |            |         | IBM i workstation   |
|                     |            |         | (device or          |
|                     |            |         | emulation           |
|                     |            |         | session/job name)   |
|                     |            |         | or the name of any  |
|                     |            |         | IBM i job that will |
|                     |            |         | be executing the    |
|                     |            |         | SBMJOB command that |
|                     |            |         | needs to be         |
|                     |            |         | captured.           |
+---------------------+------------+---------+---------------------+
| Active job capture  | IBM i name |         | A list of up to 21  |
| list                |            |         | names of            |
|                     |            |         | workstations or     |
|                     |            |         | jobs that can be    |
|                     |            |         | concurrently active |
|                     |            |         | for capturing jobs. |
|                     |            |         | This list is only   |
|                     |            |         | effective while     |
|                     |            |         | LSAM Job Tracking   |
|                     |            |         | is STARTED.         |
+---------------------+------------+---------+---------------------+

:  

###### Functions

-   **F3=Exit**: Quit the display without update and return to the menu.
-   **F5=Refresh**: Restore the current control file values to the
    screen, overlaying any typed input.
-   **F7=STRJOBTRK**: Start job tracking, the same as menu option 3.
-   **F8=ENDJOBTRK**: End job tracking, the same as menu option 4.
-   **F12=Cancel**: Quits the display without update and return to the
    previous screen.

### End Job Capture (ENDCAPJOB)

The screen includes detailed instructions about how to use this
function. More information about using the Capture Job feature can be
found above under Operating Job Tracking and How LSAM job tracking
works.

-   **Screen Title**: End Capture Job
-   **Screen ID**: STRCAPJOB1

###### Menu Pathway

Main Menu \> Job track menu (\#1) \> End job capture (ENDCAPJOB) (\#9)

###### Fields

+---------------------+------------+---------+---------------------+
| Field               | Values     | Default | Description         |
+=====================+:==========:+:=======:+=====================+
| Environment         |            |         | The name of the     |
|                     |            |         | current LSAM        |
|                     |            |         | environment in      |
|                     |            |         | which the menu      |
|                     |            |         | system is running   |
|                     |            |         | (could be different |
|                     |            |         | from the specified  |
|                     |            |         | Job Track control   |
|                     |            |         | environment name).  |
+---------------------+------------+---------+---------------------+
| Version             |            |         | The version of LSAM |
|                     |            |         | software in this    |
|                     |            |         | environment, from   |
|                     |            |         | the LSAVERSION data |
|                     |            |         | area in library     |
|                     |            |         | SMADTA (or its      |
|                     |            |         | equivalent).        |
+---------------------+------------+---------+---------------------+
| Control environment |            |         | The name of the     |
|                     |            |         | LSAM environment    |
|                     |            |         | that is currently,  |
|                     |            |         | or was last         |
|                     |            |         | specified as the    |
|                     |            |         | environment in      |
|                     |            |         | control of job      |
|                     |            |         | tracking (could be  |
|                     |            |         | different from the  |
|                     |            |         | current             |
|                     |            |         | Environment).       |
+---------------------+------------+---------+---------------------+
| Job tracking status | STARTED    |         | The status of LSAM  |
|                     |            |         | job tracking,       |
|                     | STOPPED    |         | determined by       |
|                     |            |         | checking for the    |
|                     |            |         | exit program        |
|                     |            |         | entries in the IBM  |
|                     |            |         | i registry.         |
+---------------------+------------+---------+---------------------+
| End job or          | IBM i name |         | Type the name of an |
| workstation         |            |         | IBM i workstation   |
|                     |            |         | or job that appears |
|                     |            |         | in the Active job   |
|                     |            |         | capture list in     |
|                     |            |         | order to remove     |
|                     |            |         | that device or job  |
|                     |            |         | from the list. LSAM |
|                     |            |         | job tracking does   |
|                     |            |         | not have to be      |
|                     |            |         | stopped in order to |
|                     |            |         | complete this       |
|                     |            |         | maintenance. Ending |
|                     |            |         | job capture for a   |
|                     |            |         | workstation or job  |
|                     |            |         | takes effect        |
|                     |            |         | immediately.        |
+---------------------+------------+---------+---------------------+
| Active job capture  | IBM i name |         | A list of up to 21  |
| list                |            |         | names of            |
|                     |            |         | workstations or     |
|                     |            |         | jobs that can be    |
|                     |            |         | concurrently active |
|                     |            |         | for capturing jobs. |
|                     |            |         | This list is only   |
|                     |            |         | effective while     |
|                     |            |         | LSAM Job Tracking   |
|                     |            |         | is STARTED.         |
+---------------------+------------+---------+---------------------+

:  

###### Functions

-   **F3=Exit**: Quit the display without update and return to the menu.
-   **F5=Refresh**: Restore the current control file values to the
    screen, overlaying any typed input.
-   **F7=STRJOBTRK**: Start job tracking, the same as menu option 3.
-   **F8=ENDJOBTRK**: End job tracking, the same as menu option 4.
-   **F12=Cancel**: Quits the display without update and return to the
    previous screen.

### Display Captured Jobs (DSPCAPJOB)

The Display function allows a view of captured job information without
allowing changes to the jobs. This function may be appropriate for a
wider group of user profiles than the WRKCAPJOB command/function that
does allow changes.

-   **Screen Title**: Display Captured Jobs
-   **Screen ID**: DSPCAPR1

###### Menu Pathways

Main Menu \> Job track menu (\#1) \> Display captured jobs (DSPCAPJOB)
(\#10)

###### Options

**5=Detail**: View the details of a captured job.

###### Fields

  Field            Description
  ---------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Opt              Input field where an available option may be typed to act upon a record in the list.
  Search content   Type in a value that can be found anywhere in the record represented by each line on the list. The entire record will be searched, not just the fields displayed in the list. Use option 5=Display to see the matching detail that satisfied the search when the cursor appears in the Opt field next to a line on the display. The \<**Enter**\> key or \<**F16**\> may be used to start a search, and \<**F16**\> is used to continue the search from the last record found.
  Capture ID       The key identifier of each record. For records of type L, this name must be the Captured Job ID or the Job Name of a tracked or queued job. For records of type V, this may be any meaningful name that will be used to create a token ID. Job names are limited to 10 characters, but a Captured Job ID or token ID can use up to the 12 characters allowed for this field.
  Job name         The name the job will use (by default) when it is submitted, same as the job name that was specified when the job was originally captured. (This value may be overridden by various means, including by the job name specified in the OpCon/xps schedule that executes the captured job.)
  CMD line...      The first several characters of the job\'s command line are displayed to help identify each job. (The full command line content is available in the detailed displays for each record.)

  :  

###### Functions

-   **F3=Exit**: Quits the display and returns to the menu.
-   **F5=Refresh**: Reload the list display with data from the master
    file.
-   **F12=Cancel**: Quits the display and returns to the previous
    screen.
-   **F16=Search next**: Press to start a new search based on the value
    entered in the Search input field, or to continue a search from the
    last record found.
-   **F17=Top**: Causes the list to display from the first record. The
    list is sorted in order of the Capture ID.
-   **F18=Bottom**: Causes the list to display the last record in the
    file.

#### Option 5 = Display Captured Job Detail

-   **Screen Title**: Capture Job Detail
-   **Screen ID**: DSPCAPR2

###### Menu Pathways

Main Menu \> Job track menu (\#1) \> Display captured jobs (DSPCAPJOB)
(\#10) \> Option 5 = Display

###### Fields

Most of the job definition parameters are taken verbatim from the IBM i
SBMJOB command. Detailed explanations of these fields may be found in
IBM documentation and in the Help text for the SBMJOB command. The
following table explains fields that are unique to the LSAM software and
it provides additional notes about some fields.

 

  -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [Captured jobs always convert a SBMJOB parameter value of \*CURRENT to whatever value was in effect at the time the job was captured. This allows the values that would have been in effect for the job to be preserved until the job is actually executed by OpCon/xps.]
  -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

  Field           Description
  --------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                  **Internal Data**
  Capture ID      The key identifier of the record, specified when the job was captured. A Captured Job ID can use up to the 12 characters. Two additional characters more than a job name are allowed so that duplicate copies of the same job name can be stored with different job parameters.
  Cap date        The system date when this job was captured.
                  **IBM i Parameters**
  Cap time        The system time when this job was captured.
  CMD SrcMbr      The name assigned by LSAM internal routines to the source member in the LSAM command source physical file DBFCMDSRC where the command line text is stored.
  FMT             The system date format in effect when the job was captured. This is the format of the Job DATE field.
  CapJob fields   The IBM i job ID of the workstation or batch job that performed the capture action.
  INLLIBL +       The first several characters of the initial library list are shown. If there is more data in the list than can be shown on this display, the plus sign (+) appears at the end of the line and function key F14=More LIBL appears at the bottom of the display.
  CMD line +      The first several characters of the command line are shown. If there is more data in the command line than can be shown on this display, the plus sign (+) appears at the end of the line and function key F13=More CMD appears at the bottom of the display.

  :  

###### Functions

-   **F3=Exit**: (Not displayed, but available.) Quits the display and
    returns to the menu.
-   **F12=Cancel**: Quits the display and returns to the previous
    screen.
-   **F13=More CMD**: Appears if there is more command line text than
    will fit on this display. Press \<**F13**\> to go to a dedicated
    screen where the entire command line text may be viewed, using
    PageDown as necessary.
-   **F14=More LIBL**: Appears if there are more entries in the initial
    library list than can be shown on this display. Press \<**F14**\> to
    go to a dedicated screen where the entire initial library list may
    be viewed.
-   **F15=View LDA**: All captured jobs have the 1024-character local
    data area captured and preserved, even if the LDA is not loaded or
    used for the job. For jobs that need the LDA, the captured LDA
    contents may be viewed using this function key. An examination of
    the LDA contents may be important if Dynamic Variables (type L) will
    be used to update the LDA contents when the captured job is executed
    by OpCon/xps.

##### F13 = More CMD (View CMD)

-   **Screen Title**: Capture Job Detail - View CMD
-   **Screen ID**: DSPCAPR3

###### Menu Pathways

Main Menu \> Job track menu (\#1) \> Display captured jobs (DSPCAPJOB)
(\#10) \> Option 5 = Display \> F13=More CMD

###### Fields

  Field        Description
  ------------ --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Capture ID   The key identifier of the record, specified when the job was captured. A Captured Job ID can use up to the 12 characters. Two additional characters more than a job name are allowed so that duplicate copies of the same job name can be stored with different job parameters.
  Job name     The IBM i name assigned to the job when it was originally submitted.
  1 -- 20000   The range of the command line characters (out of a possible total 20,000 characters) that appear on this screen at once.
  \- / +       The minus sign (-) and the plus sign (+) will appear at the beginning or end of the command line text to indicate that there is more data in either direction. When the minus sign appears, the PageUp function key is active; when the plus sign (+) appears, the PageDown key is active.

  :  

###### Functions

-   **F3=Exit**: Quits the display and returns to the menu.
-   **F12=Cancel**: Quits the display and returns to the previous
    screen.
-   **PageUp**: View lower numbered character positions of the command
    line text.
-   **PageDown**: View higher numbered character positions of the
    command line text.

##### F14 = More LIBL (View LIBL)

-   **Screen Title**: Capture Job Detail - View LIBL
-   **Screen ID**: DSPCAPR4

###### Menu Pathways

Main Menu \> Job track menu (\#1) \> Display captured jobs (DSPCAPJOB)
(\#10) \> Option 5 = Display \> F13=More CMD

###### Fields

  Field        Description
  ------------ ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Capture ID   The key identifier of the record, specified when the job was captured. A Captured Job ID can use up to the 12 characters. Two additional characters more than a job name are allowed so that duplicate copies of the same job name can be stored with different job parameters.
  Job name     The IBM i name assigned to the job when it was originally submitted.
  \- / +       The minus sign (-) and the plus sign (+) will appear at the beginning or end of the library list to indicate that there is more data in either direction. When the minus sign appears, the PageUp function key is active; when the plus sign (+) appears, the PageDown key is active.

  :  

###### Functions

-   **F3=Exit**: Quits the display and returns to the menu.
-   **F12=Cancel**: Quits the display and returns to the previous
    screen.
-   **PageUp**: View library names towards the beginning of the library
    list.
-   **PageDown**: View library names towards the end of the library
    list.

##### F15 = View LDA

Pressing \<**F15**\> from the Display Captured Job Detail display
provides access to a display of the captured job\'s local data area
(LDA) content. This screen is a list of the 15 lines (1024 characters)
of the LDA content, but the screen may show completely blank content.
Function key \<F10\> may be used to toggle the display between a
character-only mode that shows the whole LDA on one screen (but
non-display characters in the LDA will appear as blanks), and a hex mode
that shows the hexadecimal equivalents for each LDA byte position in
over/under mode.

-   **Screen Title**: Capture Job Detail - LDA Content (2 Views)
-   **Screen ID**: DSPCAPR6

###### Fields

  Field                     Description
  ------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Ruler/Character number    A ruler appears across the top of the list display to help identify the ordinal position of each character in the LDA. The numbers on the left of the display name the first character position of content appearing on each line.
  Displayable character     Displayable character content of the LDA content is shown in normal green, next to each character number that appears on the left side.
  Hexadecimal equivalents   The hexadecimal equivalents of each character in the LDA content appear in over/under mode at each character position. This representative view of the hexadecimal characters helps to identify content such as packed numeric data, or other binary data or control characters that cannot be represented on a 5250 (green screen) workstation display as single, displayable characters.

  :  

###### Functions

-   **F3=Exit**: Quits the display and returns to the menu.
-   **F12=Cancel**: Quits the display and returns to the previous
    screen.
-   **F10=Hex/Char**: Toggles the display between the two modes,
    character and hexadecimal.
-   **PageUp**: (not shown) May be used if PageDown was previously used
    to show more lines while in Hex display mode.
-   **PageDown**: (not shown) May be used if \"More...\" appears at the
    bottom of the display while in Hex display mode.

### Work with Captured Jobs (WRKCAPJOB)

The \"Work with\" function allows data of captured job information to be
accessed for update. This function, driven by the WRKCAPJOB command,
should probably be restricted to a limited number of user profiles. It
may not be appropriate for as wide group of user profiles as the
display-only DSPCAPJOB command/function that does not allow changes.

-   **Screen Title**: Work with Captured Jobs
-   **Screen ID**: WRKCAPR1

###### Menu Pathways

Main Menu \> Job track menu (\#1) \> Work with captured jobs (WRKCAPJOB)
(\#11)

###### Options

-   **2=Change**: Update the job parameters; also provides access to
    special update functions for the initial library list, the command
    line and the LDA content.
-   **3=Copy**: Select a record as the source data for creating a new
    captured job definition without having to run the Capture Job
    process again.
-   **4=Delete**: Select one or more records to be deleted, along with
    all of their associated job definition data (stored in multiple LSAM
    master files). A subsequent prompt screen will present a list of all
    records selected for deletion before the delete action is confirmed
    and completed.
-   **5=Detail**: View the details of a captured job (without being
    concerned about updating them).

###### Fields

  Field            Description
  ---------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Opt              Input field where an available option may be typed to act upon a record in the list.
  Search content   Type in a value that can be found anywhere in the record represented by each line on the list. The entire record will be searched, not just the fields displayed in the list. Use option 5=Display to see the matching detail that satisfied the search when the cursor appears in the Opt field next to a line on the display. The \<**Enter**\> key or \<**F16**\> may be used to start a search, and \<**F16**\> is used to continue the search from the last record found.
  Capture ID       The key identifier of each record. For records of type L, this name must be the Captured Job ID or the Job Name of a tracked or queued job. For records of type V, this may be any meaningful name that will be used to create a token ID. Job names are limited to 10 characters, but a Captured Job ID or token ID can use up to the 12 characters allowed for this field.
  Job name         The name the job will use (by default) when it is submitted, same as the job name that was specified when the job was originally captured. (This value may be overridden by various means, including by the job name specified in the OpCon/xps schedule that executes the captured job.)
  CMD line...      The first several characters of the job\'s command line are displayed to help identify each job. (The full command line content is available in the detailed displays for each record.)

  :  

###### Functions

-   **F3=Exit**: Quits the display and returns to the menu.
-   **F5=Refresh**: Reload the list display with data from the master
    file.
-   **F12=Cancel**: Quits the display and returns to the previous
    screen.
-   **F16=Search next**: Press to start a new search based on the value
    entered in the Search input field, or to continue a search from the
    last record found.
-   **F17=Top**: Causes the list to display from the first record. The
    list is sorted in order of the Capture ID.
-   **F18=Bottom**: Causes the list to display the last record in the
    file.

#### Option 2 = Change (Maintain) Captured Job

-   **Screen Title**: Maintain Job Detail
-   **Screen ID**: WRKCAPR8

###### Menu Pathways

Main Menu \> Job track menu (\#1) \> Work with captured jobs (WRKCAPJOB)
(\#11) \> Option 2 = Change

###### Fields

Most of the job definition parameters are taken verbatim from the IBM i
SBMJOB command. Detailed explanations of these fields may be found in
IBM documentation and in the Help text for the SBMJOB command. The
following table explains fields that are unique to the LSAM software and
it provides additional notes about some fields.

 

  -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [Captured jobs always convert a SBMJOB parameter value of \*CURRENT to whatever value was in effect at the time the job was captured. This allows the values that would have been in effect for the job to be preserved until the job is actually executed by OpCon/xps.]
  -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

+---------------+-----------------------------------------------------+
| Field         | Description                                         |
+===============+=====================================================+
|               | **Internal Data**                                   |
+---------------+-----------------------------------------------------+
| Capture ID    | The key identifier of the record, specified when    |
|               | the job was captured. A Captured Job ID can use up  |
|               | to the 12 characters. Two additional characters     |
|               | more than a job name are allowed so that duplicate  |
|               | copies of the same job name can be stored with      |
|               | different job parameters.                           |
+---------------+-----------------------------------------------------+
| Cap date      | The system date when this job was captured.         |
+---------------+-----------------------------------------------------+
| Cap time      | The system time when this job was captured.         |
+---------------+-----------------------------------------------------+
| CMD SrcMbr    | The name assigned by LSAM internal routines to the  |
|               | source member in the LSAM command source physical   |
|               | file DBFCMDSRC where the command line text is       |
|               | stored.                                             |
+---------------+-----------------------------------------------------+
|               | **IBM i Parameters**                                |
+---------------+-----------------------------------------------------+
| FMT           | The system date format in effect when the job was   |
|               | captured. This is the format of the Job DATE field. |
+---------------+-----------------------------------------------------+
| CapJob fields | The IBM i job ID of the workstation or batch job    |
|               | that performed the capture action.                  |
+---------------+-----------------------------------------------------+
| INLLIBL +     | The first several characters of the initial library |
|               | list are shown. If there is more data in the list   |
|               | than can be shown on this display, the plus sign    |
|               | (+) appears at the end of the line.                 |
|               |                                                     |
|               |                                                     |
|               |                                                     |
|               | **Note**: The Initial library list cannot be        |
|               | maintained from this display-only field. Use        |
|               | F14=Edit LIBL to perform any changes.               |
+---------------+-----------------------------------------------------+
| CMD line +    | The first several characters of the command line    |
|               | are shown. If there is more data in the command     |
|               | line than can be shown on this display, the plus    |
|               | sign (+) appears at the end of the line.            |
|               |                                                     |
|               |                                                     |
|               |                                                     |
|               | **Note**: The command line text cannot be           |
|               | maintained from this display-only field. Use        |
|               | F13=Change CMD to perform any changes.              |
+---------------+-----------------------------------------------------+

:  

###### Functions

-   **F3=Exit**: (Not displayed, but available.) Quits the display and
    returns to the menu.

-   **F12=Cancel**: Quits the display and returns to the previous
    screen.

-   **F13=Change CMD**: Press \<**F13**\> to start a Source Edit Utility
    (SEU) session that can be used to update the source file member
    where the full command line is stored.

-   **F14=Edit LIBL**: Press \<**F14**\> to go to a dedicated screen
    where the entire initial library list may be conveniently edited and
    updated.

-   **F15=Change LDA**: All captured jobs have the 1024-character local
    data area captured and preserved, even if the LDA is not loaded or
    used for the job. For jobs that need the LDA, the captured LDA
    contents may be viewed and updated using this function key.

-   **F21=CHKJOB**: Press \<**F21**\> to request an edit from IBM i of
    the job\'s parameters. Any error messages returned by IBM i will
    display at the bottom of the screen. Data entry made on this screen
    is NOT edited when \<**Enter**\> is pressed to update the record.
    \<**F21**\> must be used before the \<**Enter**\> key is pressed in
    order to help assure that a captured job definition will be updated
    with valid data.

##### F13 = Change CMD

###### Menu Pathways

-   Main Menu \> Job track menu (\#1) \> Work with captured jobs
    (WRKCAPJOB) (\#11) \> Option 2 = Change \> F13=Change CMD
-   Pressing \<**F13**\> starts a Source Edit Utility (SEU) session that
    can be used to update the source file member where the full command
    line is stored.

  -------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [The SEU edit screen is not documented in this online help. Refer to IBM documentation for information about how to perform source member editing with SEU. The LSAM permits any other form of IBM i source physical file member editing to be used, including WebSphere from a PC workstation. The field value for CMD SrcMbr names the member in file SMADTA/DBFCMDSRC that can be edited in order to update the captured job\'s command line. (The SMADTA library may have a different name if an alternate LSAM environment is being used.)]
  -------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

##### F14 = Edit LIBL

In the Edit LIBL display, after new values have been typed and the
\<**Enter**\> key has been pressed once, the sorted and updated library
list is presented a second time for confirmation before an update is
completed. The \<**Enter**\> key must be pressed a second time with no
changes made to the screen in order for the data update to be completed.
(This works like the IBM i EDTLIBL command in this respect.)

-   **Screen Title**: Capture Job Detail - Edit LIBL
-   **Screen ID**: WRKCAPR5

###### Menu Pathways

Main Menu \> Job track menu (\#1) \> Work with captured jobs (WRKCAPJOB)
(\#11) \> Option 2 = Change \> F14=Edit LIBL

###### Fields

  Field             Description
  ----------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Capture ID        The key identifier of the record, specified when the job was captured. A Captured Job ID can use up to the 12 characters. Two additional characters more than a job name are allowed so duplicate copies of the same job name can be stored with different job parameters.
  Sequence number   10 -- 2500, similar to the IBM i EDTLIBL display. Different values can be typed into this field to cause the order of libraries in the list to change. The sequence number field is renumbered by tens every time the \<**Enter**\> key is pressed, after the library names have been sorted into the requested order.
  Library           The name of any library that should be in the job\'s initial library list. For the Capture Job application (unlike the IBM i EDTLIBL command), a single value of \*JOBD, or any other value permitted by the INLLIBL parameter of the SBMJOB command, may be used instead of actual library names.

  :  

###### Functions

-   **F3=Exit**: Quits the display and returns to the menu.
-   **F12=Cancel**: Quits the display and returns to the previous
    screen.
-   **PageUp**: View library names towards the beginning of the library
    list.
-   **PageDown**: View library names towards the end of the library
    list.

##### F15 = Change LDA

Pressing \<**F15**\> from the Change Captured Job Detail display
provides access to a display of the captured job\'s local data area
(LDA) content. This screen is a list of the 15 lines (1024 characters)
of the LDA content. Function key \<F10\> may be used to toggle the
display between a character-only mode that shows the whole LDA on one
screen (but non-display characters in the LDA will appear as blanks),
and a hex mode that shows the hexadecimal equivalents for each LDA byte
position in over/under mode.

Change LDA Content (Hex)

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ -- --
  [WRLCAPR7]{style="color: #008000;"}                 Capture Job Detail -- Change LDA            [DD/DD/DD]{style="color: #008000;"}                                                              [USERNAME]{style="color: #008000;"}                    [Capture ID: ]{style="color: #008000;"}[OOOOOOOOOOOO]{style="color: #ff00ff;"}                [TT:TT:TT]{style="color: #008000;"}      
        1\...5\...10\....5\...20\....5\...30\....5\...40\....5\...50\....5\...60\....5\...70                                                                                                    
     1[  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO]{style="color: #008000;"}                                                                                                OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO                                                                                                                  
        OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO                                                                                                                  
    71[  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO]{style="color: #008000;"}                                                                                                OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO                                                                                                                  
        OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO                                                                                                                  
   141[  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO]{style="color: #008000;"}                                                                                                OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO                                                                                                                  
        OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO                                                                                                                  
   211[  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO]{style="color: #008000;"}                                                                                                OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO                                                                                                                  
        OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO                                                                                                                  
   281[  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO]{style="color: #008000;"}                                                                                                OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO                                                                                                                  
        OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO                                                                                                                  
   351[  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO]{style="color: #008000;"}                                                                                                OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO                                                                                                                  
        OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO                                                                                                                  
  More\...                                                                                                                                                                                      
  F3=Exit  F5=Refresh  F10=Char Updt  F11=Hex/Char View  F12=Cancel  F19=Rollback                                                                                                               
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ -- --

 

Change LDA Content (Char)

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ -- --
  [DSPCAPR6]{style="color: #008000;"}               Capture Job Detail -- LDA Content             [DD/DD/DD]{style="color: #008000;"}                                                              [USERNAME]{style="color: #008000;"}                   [Capture ID: ]{style="color: #008000;"}[OOOOOOOOOOOO]{style="color: #ff00ff;"}                 [TT:TT:TT]{style="color: #008000;"}      
        1\...5\...10\....5\...20\....5\...30\....5\...40\....5\...50\....5\...60\....5\...70                                                                                                    
     1[  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO]{style="color: #008000;"}                                                                                            71[  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO]{style="color: #008000;"}                                                                                       
   141[  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO]{style="color: #008000;"}                                                                                           211[  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO]{style="color: #008000;"}                                                                                       
   281[  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO]{style="color: #008000;"}                                                                                           351[  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO]{style="color: #008000;"}                                                                                       
   421[  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO]{style="color: #008000;"}                                                                                           491[  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO]{style="color: #008000;"}                                                                                       
   561[  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO]{style="color: #008000;"}                                                                                           631[  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO]{style="color: #008000;"}                                                                                       
   701[  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO]{style="color: #008000;"}                                                                                           771[  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO]{style="color: #008000;"}                                                                                       
   841[  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO]{style="color: #008000;"}                                                                                           911[  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO]{style="color: #008000;"}                                                                                       
   981[  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO]{style="color: #008000;"}                                                                                                                                                                                                                                                                                                                  
  Bottom                                                                                                                                                                                        
  F3=Exit   F10=Hex/Char   F12=Cancel                                                                                                                                                           
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ -- --

###### Menu Pathways

Main Menu \> Job track menu (\#1) \> Work with captured jobs (WRKCAPJOB)
(\#11) \> Option 2 = Change \> F15=Change LDA

###### Fields

  Field                     Description
  ------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Ruler/Character number    A ruler appears across the top of the list display to help identify the ordinal position of each character in the LDA. The numbers on the left of the display name the first character position of content appearing on each line.
  Displayable character     Displayable character content of the LDA content is shown in normal green, next to each character number that appears on the left side.
  Hexadecimal equivalents   Hexadecimal equivalents of each character in the LDA content appear in over/under mode at each character position. This representative view of the hexadecimal characters helps to identify content such as packed numeric data, or other binary data or control characters that cannot be represented on a 5250 (green screen) workstation display as single, displayable characters.

  :  

###### Functions

-   **F3=Exit**: Quits the display and returns to the menu.
-   **F12=Cancel**: Quits the display and returns to the previous
    screen.
-   **F10=Hex/Char Updt**: Toggles the display between the two modes,
    character and hexadecimal. F10 changes the mode in which data entry
    is allowed. When F10 is pressed, any updates entered in the first
    mode are preserved before the entry mode is switched. Use F11 to
    temporarily change the view between hex and character without
    leaving the current data entry mode.
-   **F11=Hex/Char View**: Toggles the display between hex and character
    viewing modes, but does not change the data entry mode or cause any
    typed changes to be preserved.
-   **F19=Rollback**: This function key will cause a window to display
    that lists all the prior versions of this LDA content. A prior
    version may be selected for viewing and/or accepted as an update to
    the LDA in order to put it back to a prior, or the original version.
    (Refer to example, below.)
-   **PageUp**: (not shown) May be used if PageDown was previously used
    to show more lines while in Hex display mode.
-   **PageDown**: (not shown) May be used if \"More...\" appears at the
    bottom of the display while in Hex display mode.

##### F19 = Rollback

Pressing \<**F19**\> from the Change LDA display presents a window that
lists all the prior versions of this LDA that were previously saved to
disk. A prior version may be selected to view it in the Change LDA
display, and if it is acceptable, pressing \<Enter\> will cause the LDA
content to be updated to that content version. (This new update will
also be preserved in the update history of the LDA.)

Select Previous LDA Image

  -------------------------------------------------------------------------------------------------------------
                                            Select previous LDA image
                                    Type sequence number of image to select.  
                                           Press Enter to update screen.
       [SEQ \#]{style="text-decoration: underline;"}  [RECORD TIME STAMP]{style="text-decoration: underline;"}                               0    [2000-10-13-14.17.27.672000 ]{style="color: #ff00ff;"}
                              1    [2000-10-13-09.02.56.534000]{style="color: #ff00ff;"}                                                          
                                                         
                                                         
                                                         
                                                    Bottom  
                           Sequence number: [    0]{style="text-decoration: underline;"}                                                     F12=Cancel
  -------------------------------------------------------------------------------------------------------------

###### Menu Pathways

Main Menu \> Job track menu (\#1) \> Work with captured jobs (WRKCAPJOB)
(\#11) \> Option 2 = Change \> F15=Change LDA \> F19=Rollback

###### Fields

  Field               Description
  ------------------- ------------------------------------------------------------------------------------------------------
  SEQ \#              A program-generated number used for selecting the desired previous LDA image.
  RECORD TIME STAMP   The date and time the LDA image was last updated.
  Sequence number     Use this field to type the SEQ \# of the LDA image to be selected for return to the calling display.

  :  

###### Functions

**F12=Cancel**: Quits the display and returns to the previous screen.

#### Option 3 = Copy Captured Job

-   **Screen Title**: Copy Job Detail
-   **Screen ID**: WRKCAPR8

###### Menu Pathways

Main Menu \> Job track menu (\#1) \> Work with captured jobs (WRKCAPJOB)
(\#11) \> Option 3 = Copy

###### Fields

Most of the job definition parameters are taken verbatim from the IBM i
SBMJOB command. Detailed explanations of these fields may be found in
IBM documentation and in the Help text for the SBMJOB command. The
following table explains fields that are unique to the LSAM software and
it provides additional notes about some fields.

+-------------------+-------------------------------------------------+
| Field             | Description                                     |
+===================+=================================================+
|                   | **Internal Data**                               |
+-------------------+-------------------------------------------------+
| Capture ID (from) | The key identifier of the record, specified     |
|                   | when the job was captured. A Captured Job ID    |
|                   | can use up to the 12 characters. Two additional |
|                   | characters more than a job name are allowed so  |
|                   | that duplicate copies of the same job name can  |
|                   | be stored with different job parameters.        |
+-------------------+-------------------------------------------------+
| To: Capture ID    | A new capture ID must be provided. The program  |
|                   | suggests a new ID based on the source ID. When  |
|                   | the trailing characters of the source ID are    |
|                   | blank, the program inserts zeros to fill the    |
|                   | field and increments a counter in the last      |
|                   | character position(s) that will make the new ID |
|                   | unique. The proposed ID may be changed, but the |
|                   | new record being created by the Copy function   |
|                   | must have a unique ID.                          |
+-------------------+-------------------------------------------------+
| Cap date          | The system date when this job was captured.     |
+-------------------+-------------------------------------------------+
| Cap time          | The system time when this job was captured.     |
+-------------------+-------------------------------------------------+
|                   | **IBM i Parameters**                            |
+-------------------+-------------------------------------------------+
| CMD SrcMbr        | The name assigned by LSAM internal routines to  |
|                   | the source member in the LSAM command source    |
|                   | physical file DBFCMDSRC where the command line  |
|                   | text is stored. A new member will be created    |
|                   | for the copied command line.                    |
+-------------------+-------------------------------------------------+
| FMT               | The system date format in effect when the job   |
|                   | was captured. This is the format of the Job     |
|                   | DATE field.                                     |
+-------------------+-------------------------------------------------+
| CapJob fields     | The IBM i job ID of the workstation or batch    |
|                   | job that performed the capture action.          |
+-------------------+-------------------------------------------------+
| INLLIBL +         | The first several characters of the initial     |
|                   | library list are shown. If there is more data   |
|                   | in the list than can be shown on this display,  |
|                   | the plus sign (+) appears at the end of the     |
|                   | line.                                           |
|                   |                                                 |
|                   |                                                 |
|                   |                                                 |
|                   | **Note:** The Initial library list cannot be    |
|                   | maintained from this display-only field. Use    |
|                   | F14=Edit LIBL to perform any changes.           |
+-------------------+-------------------------------------------------+
| CMD line +        | The first several characters of the command     |
|                   | line are shown. If there is more data in the    |
|                   | command line than can be shown on this display, |
|                   | the plus sign (+) appears at the end of the     |
|                   | line.                                           |
|                   |                                                 |
|                   |                                                 |
|                   |                                                 |
|                   | **Note:** The command line text cannot be       |
|                   | maintained from this display-only field. Use    |
|                   | F13=Change CMD to perform any changes.          |
+-------------------+-------------------------------------------------+

:  

###### Functions

-   **F3=Exit**: (Not displayed, but available.) Quits the display and
    returns to the menu.

-   **F12=Cancel**: Quits the display and returns to the previous
    screen.

-   **F13=Change CMD**: (F13 is not supported from the Copy screen.)

-   **F14=Edit LIBL**: Press \<**F14**\> to go to a dedicated screen
    where the entire initial library list may be conveniently edited and
    updated.

-   **F15=Change LDA**: All captured jobs have the 1024-character local
    data area captured and preserved, even if the LDA is not loaded or
    used for the job. For jobs that need the LDA, the captured LDA
    contents may be viewed and updated using this function key.

-   **F21=CHKJOB**: Press \<**F21**\> to request an edit from IBM i of
    the job\'s parameters. Any error messages returned by IBM i will
    display at the bottom of the screen. Data entry made on this screen
    is NOT edited when \<**Enter**\> is pressed to update the record.
    \<**F21**\> must be used before the \<**Enter**\> key is pressed in
    order to help assure that a captured job definition will be updated
    with valid data.

#### Option 4 = Delete Captured Job

The job parameter fields are displayed in turquoise instead of yellow in
this Work With menu function to indicate that the fields are protected
from input. They display in yellow on the Change Job Details screen.

-   **Screen Title**: Delete Capture Job
-   **Screen ID**: WRKCAPR2

###### Menu Pathways

Main Menu \> Job track menu (\#1) \> Work with captured jobs (WRKCAPJOB)
(\#11) \> Option 4 = Delete

###### Fields

Most of the job definition parameters are taken verbatim from the IBM i
SBMJOB command. Detailed explanations of these fields may be found in
IBM documentation and in the Help text for the SBMJOB command. The
following table explains fields that are unique to the LSAM software and
it provides additional notes about some fields. Data fields on this
screen appear in turquoise to indicate that they cannot be changed.

  Field           Description
  --------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                  **Internal Data**
  Capture ID      The key identifier of the record, specified when the job was captured. A Captured Job ID can use up to the 12 characters. Two additional characters more than a job name are allowed so that duplicate copies of the same job name can be stored with different job parameters.
  Cap date        The system date when this job was captured.
  Cap time        The system time when this job was captured.
  CMD SrcMbr      The name assigned by LSAM internal routines to the source member in the LSAM command source physical file DBFCMDSRC where the command line text is stored. (The command line source member will be removed as the delete action is completed.)
                  **IBM i Parameters**
  FMT             The system date format in effect when the job was captured. This is the format of the Job DATE field.
  CapJob fields   The IBM i job ID of the workstation or batch job that performed the capture action.
  INLLIBL +       The first several characters of the initial library list are shown. If there is more data in the list than can be shown on this display, the plus sign (+) appears at the end of the line.
  CMD line +      The first several characters of the command line are shown. If there is more data in the command line than can be shown on this display, the plus sign (+) appears at the end of the line.

  :  

###### Functions

-   **F3=Exit**: (Not displayed, but available.) Quits the display and
    returns to the menu.
-   **F12=Cancel**: Quits the display and returns to the previous
    screen. The record will not be deleted.
-   **F23=DLTJOB**: Confirm the delete request for this individual
    captured job definition and all data pertaining to it in other LSAM
    master files. Pressing F23 from this screen begins the actual delete
    action.

#### Option 5 = Display Captured Job Detail

The job parameter fields are displayed in turquoise instead of yellow in
this Work With menu function to indicate that the fields are protected
from input. They display in yellow on the Change Job Details screen.

-   **Screen Title**: Capture Job Detail
-   **Screen ID**: WRKCAPR2

###### Menu Pathways

Main Menu \> Job track menu (\#1) \> Work with captured jobs (WRKCAPJOB)
(\#11) \> Option 5 = Display

###### Fields

Most of the job definition parameters are taken verbatim from the IBM i
SBMJOB command. Detailed explanations of these fields may be found in
IBM documentation and in the Help text for the SBMJOB command. The
following table explains fields that are unique to the LSAM software and
it provides additional notes about some fields.

 

  -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [Captured jobs always convert a SBMJOB parameter value of \*CURRENT to whatever value was in effect at the time the job was captured. This allows the values that would have been in effect for the job to be preserved until the job is actually executed by OpCon/xps.]
  -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

  Field           Description
  --------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                  **Internal Data**
  Capture ID      The key identifier of the record, specified when the job was captured. A Captured Job ID can use up to the 12 characters. Two additional characters more than a job name are allowed so that duplicate copies of the same job name can be stored with different job parameters.
  Cap date        The system date when this job was captured.
  Cap time        The system time when this job was captured.
  CMD SrcMbr      The name assigned by LSAM internal routines to the source member in the LSAM command source physical file DBFCMDSRC where the command line text is stored.
                  **IBM i Parameters**
  FMT             The system date format in effect when the job was captured. This is the format of the Job DATE field.
  CapJob fields   The IBM i job ID of the workstation or batch job that performed the capture action.
  INLLIBL +       The first several characters of the initial library list are shown. If there is more data in the list than can be shown on this display, the plus sign (+) appears at the end of the line and function key F14=More LIBL appears at the bottom of the display.
  CMD line +      The first several characters of the command line are shown. If there is more data in the command line than can be shown on this display, the plus sign (+) appears at the end of the line and function key F13=More CMD appears at the bottom of the display.

  :  

###### Functions

-   **F3=Exit**: (Not displayed, but available.) Quits the display and
    returns to the menu.
-   **F12=Cancel**: Quits the display and returns to the previous
    screen.
-   **F13=More CMD**: Appears if there is more command line text than
    will fit on this display. Press \<**F13**\> to go to a dedicated
    screen where the entire command line text may be viewed, using
    PageDown as necessary. (Refer to the F13=More CMD screen for the
    DSPCAPJOB function, above, for details.)
-   **F14=More LIBL**: Appears if there are more entries in the initial
    library list than can be shown on this display. Press \<**F14**\> to
    go to a dedicated screen where the entire initial library list may
    be viewed. (Refer to the F14=More LIBL screen for the DSPCAPJOB
    function, above, for details.)
-   **F15=View LDA**: All captured jobs have the 1024-character local
    data area captured and preserved, even if the LDA is not loaded or
    used for the job. For jobs that need the LDA, the captured LDA
    contents may be viewed using this function key. An examination of
    the LDA contents may be important if Dynamic Variables (type L) will
    be used to update the LDA contents when the captured job is executed
    by OpCon/xps. (Refer to the F15=View LDA screen for the DSPCAPJOB
    function, above, for details.)
-   **F22=CHGJOB**: Branch to the screen f4ormat where job details may
    be changed. (The job parameter fields change from turquoise to
    yellow in this menu function when the fields are input capable.)
-   **F23=DLTJOB**: Request to delete this individual captured job
    definition and all data pertaining to it in other LSAM master files.
:::

 


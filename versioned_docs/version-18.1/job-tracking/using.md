---
sidebar_label: 'Using LSAM Job Tracking Functions'
---
# Using LSAM Job Tracking Functions

This section provides a simple outline of the steps required to utilize the various functions of the LSAM's job tracking feature. There are important explanations of how these functions work in the following section of this topic. It is important to understand that discussion because the LSAM job tracking feature alters the way IBM i job management behaves. These changes could impact other software that is running under IBM i.

Certain of the following procedure outlines make reference to LSAM maintenance functions that are described in detail in a following section: [Job Tracking and Queuing Screens and Windows](../job-tracking/screens.md). References to OpCon procedures and tools related to Job Tracking techniques can be found in the following locations within OpCon core product user help:

- [Job Tracking automation concepts](https://help.smatechnologies.com/opcon/core/automation-concepts/job-tracking)
- [$JOB:TRACK event command](https://help.smatechnologies.com/opcon/core/events/types#jobtrack)
- [$JOB:QUEUED event command](https://help.smatechnologies.com/opcon/core/events/types#jobqueued)

## Operating Job Tracking

The general capabilities of the LSAM to perform job tracking, queuing or capture are all supported by the LSAM programs that either (1) add or remove registered exit programs in IBM i, or (2) perform the alternate job notify service (used for True Passive job tracking). Starting Job Tracking completes the exit point registration for processing the IBM i SBMJOB command, and then the LSAM Job Tracking status function reports that the Job Tracking status is STARTED. Starting the Alternate Job Notify service is a separate process that is also required only if True Passive tracking will be used. For more information, refer to [Alternate Job Notify Service](../operations/lsam.md#alternate-job-notify-service).

Master and control file maintenance functions found in the LSAM Job Tracking menu do not require that Job Tracking be started.

The purpose of the LSAM's Tracking and Queuing functions, separate from Capturing a job, is to intercept a job that has been submitted by an IBM i user or another batch job, rather than directly by the OpCon SAM, so that the job can be monitored by OpCon. Both tracking and queuing are manage in the same way. Refer to the introduction to Tracking Types at the start of this topic, and also to [How LSAM Job Tracking Works](../job-tracking/details.md).

### Starting Job Tracking

Enable the LSAM Job Tracking functions by using the two following procedure.

#### Option One: Start Job Tracking through LSAM Menus
1. Log on to an IBM i workstation with a user profile that has LSAM Administrator privileges.
2. Enter the LSAM menu system by entering the command **SMAGPL/STRSMA**.
3. Enter **1** to choose the **Job Tracking menu**.
4. Enter **3** to **Start job track (STRJOBTRK)**.
5. Enter **5** to **Check job track status (JOBTRKSTS)**.  
    - A window will display either STARTED or STOPPED. The status must show STARTED in order for Job Tracking to work.

#### Option Two: Start Job Tracking Using a Manual Command
1. Log on to IBM i from a workstation or start a job with command entry access with a user profile that has LSAM Administrator privileges.  
    - It is possible for a user-written CL program to perform this manual procedure.
2. Ensure that the LSAM environment library list is in effect for the command entry session.
3. To start Job Tracking manually, enter **STRJOBTRK** in the command line.
4. To use this command from the IBM Navigator for i, wrap the STRJOBTRK command in the CMD() parameter of the Agent command SMAGPL/LSAMCMD.  Changing the name of the library SMAGPL to match an alternate LSAM environment is all that is necessary to direct the command action to that LSAM.  (Only one LSAM can control Job Tracking at a time.)

For instructions about starting the Alternate Job Notify service of the LSAM, required only when True Passive tracking will be used, refer to the instructions under [Alternate Job Notify Service](../operations/lsam.md#alternate-job-notify-service).

### Stopping Job Tracking

Disable the LSAM Job Tracking functions by using one of the two following procedures.

#### Option One: Stopping Job Tracking Through LSAM Menus
1. Log on to an IBM i workstation with a user profile that has LSAM Administrator privileges.
2. Enter the LSAM menu system by entering the command **SMAGPL/STRSMA**.
3. Enter **1** to choose the **Job Tracking menu**.
4. Enter **4** to **End job track (ENDJOBTRK)**.
5. Enter **5** to **Check job track status (JOBTRKSTS)**.  
    - A window will display either STARTED or STOPPED. The status will show STOPPED if the Job Tracking function has been successfully disabled.

#### Option Two: End Job Tracking Using a Manual Command
1. Log on to IBM i from a workstation or start a job with command entry access with a user profile that has LSAM Administrator privileges.  
    - It is possible for a user-written CL program to perform this manual procedure.
2. Ensure that the LSAM environment library list is in effect for the command entry session.
3. To end Job Tracking manually, enter **ENDJOBTRK** in the command line.
4. To use this command from the IBM Navigator for i, wrap the ENDJOBTRK command in the CMD() parameter of the Agent command SMAGPL/LSAMCMD.  Changing the name of the library SMAGPL to match an alternate LSAM environment is all that is necessary to direct the command action to that LSAM.  (Only one LSAM can control Job Tracking at a time.)

For instructions about stopping the Alternate Job Notify service of the LSAM, required only when True Passive tracking will be used, refer to the instructions in [IBM i Components and Operation](../operations/components.md).

### Tracking or Queuing an External Job

Use these procedures to cause any job started within IBM i by the SBMJOB command from the QSYS system library to be monitored by OpCon. Tracking allows OpCon monitoring without subjecting the job to any OpCon schedule constraints. Queuing does the same thing, but also allows OpCon schedule dependencies to restrict when the job will be allowed to execute.

### The AdHoc Schedule

SMA recommends adding jobs to be tracked or queued to the AdHoc schedule for the following reasons:

- The schedule is dynamically added to the Daily Tables when SAM-SS is informed of a job on the schedule that is to be tracked.
- Once active, the schedule remains open until midnight when it is allowed to go to a completed state. All jobs on the schedule must finish before the schedule closes.

If jobs to be tracked are on user-defined (named) schedules, those schedules must be built and must be active in the Daily Tables for the SAM-SS to track or queue the job(s). Refer to the special instructions for Using a Named Schedule in the following section after instructions about the AdHoc schedule.

#### Set Up Job Tracking for AdHoc Schedule
1. Log on to an IBM i workstation with a user profile that has LSAM Administrator privileges.
2. Enter the LSAM menu system by entering the command **STRSMA**.
3. Enter **1** to choose the **Job Tracking menu**.
4. Enter **1** to maintain **Job track parameters**.
5. Press <**F6**> to open the Add Job tracking parameters window.
6. Type the values that define when a job will qualify for Tracking.
    - Specify and take note of the Job Name, for use in the OpCon User Interface.
       - The job name may be predefined by third-party software where the SBMJOB action will take place.
    - The values for the Job Description, Job Description Library, Job Queue and Job Queue Library may be set to the special value of  *ALL to accept any value, or a specific name may be entered  into any of theses fields. Specific names are compared to the actual job intercepted for Tracking, to qualify whether the job is accepted for Tracking or simply bypassed and allowed to execute.
       - Specify "AdHoc" for the Schedule name.
    - Set the Track Type to "T".
7. In OpCon User Interface, add a new job master record to the AdHoc schedule, specifying the job type of IBM i.
    - Be sure that the selected machine name matches the LSAM  environment where the Tracked job was registered.
8. Select "Tracked job" in the job sub-type pull-down list.
9. Enter the exact name of the job that was registered in the LSAM Job tracking parameters Add screen.
10. Leave job parameters set to the default value of asterisk (\*). Tracked jobs will not accept job definition overrides from OpCon.
    - It is possible to create and use a User Profile of \* or \*CURRENT in OpCon. These values allow the original IBM i job  user to be preserved. Refer to additional discussion of this topic below.
11. Update the job master definition fields.
12. *(Optional)* Use the job master record tabs to specify any desired Spool File or Message Management parameters; these functions may be used for Tracked jobs.
13. *(Optional)* Job dependencies and events may be added that depend on the completion status of this job.
14. In any IBM i job, the tracked job may be started at will by any IBM i user or other job.
15. The tracked job must be submitted using the SBMJOB command from the QSYS library.
    - Do NOT qualify the SBMJOB command with the library (Not: QSYS/SBMJOB).
16. The SBMJOB command may be used from an interactive workstation job or from a batch job.
17. The SBMJOB command may be typed by an interactive user, or it may be embedded within a program.
18. Note the LSAM Job Tracking Number that is reported when the job is intercepted.
    - For batch jobs, this information may be viewed in the job's log or in the system operator (QSYSOPR) message queue.
    - The LSAM Job Tracking Number, not the same as the IBM i job number, may be used with the LSAM command WRKTRKJOB to discover the stored job definition and its status within the LSAM job tracking system.
19. View the AdHoc schedule to monitor the job status in the OpCon User Interface.

#### Set Up Job Queuing for AdHoc Schedule
1. Log on to an IBM i workstation with a user profile that has LSAM Administrator privileges.
2. Enter the LSAM menu system by entering the command **SMAGPL/STRSMA**.
3. Enter **1** to choose the **Job Tracking menu** in the SMA Main Menu.
4. Enter **1** to maintain **Job track parameters**.
5. Press <**F6**> to open the Add Job tracking parameters window.
6. Type the values that define when a job will qualify for Tracking.
    - Specify and take note of the Job Name, for use in the OpCon User Interface.
       - The job name may be predefined by third-party software where the SBMJOB action will take place.
    - The values for the Job Description, Job Description Library, Job Queue and Job Queue Library may be set to the special value of \*ALL to accept any value, or a specific name may be entered into any of theses fields. Specific names are compared to the actual job intercepted for Tracking, to qualify whether the job is accepted for Tracking or simply bypassed and allowed to execute.
    - Specify "AdHoc" for the Schedule name.
    - Set the Track Type to "Q".
7. In OpCon User Interface, add a new job master record to the AdHoc schedule, specifying the job type of IBM i.
    - Be sure that the selected machine name matches the LSAM environment where the Tracked job was registered.
8. Select "Batch job" in the job sub-type pull-down list.
9. Enter the exact name of the job that was registered in the LSAM Job tracking parameters Add screen.
10. Leave job parameters set to the default value of asterisk (\*) in order to allow the originally captured (or modified) IBM i job parameters to remain in effect, or specify override values in any of the job master definition fields.
    - Use the predefined value \*SYSVAL for the Job Date field in order to specify that the original value of the DATE parameter in the IBM i SBMJOB command should be honored.
    - It is possible to create and use a User Profile of \* or \*CURRENT in OpCon. These values allow the original IBM i job user to be preserved. Refer to additional discussion of this topic below.
11. *(Optional)* Use the job master record tabs to specify any desired Spool File or Message Management parameters.
12. Update the job master definition.
13. Change the User Interface view to the schedule view.
14. Complete the required schedule entries that specify when this queued job will be submitted for execution by OpCon.
15. Update the job master schedule information.
16. *(Optional)* Job dependencies may be added that will govern when this job is allowed to execute.
17. *(Optional)* Job dependencies and events may be added that depend on the completion status of this job.
18. In any IBM i job, the queued job may be started at will by any IBM i user or other job.
19. The queued job must be submitted using the SBMJOB command from the QSYS library.
    - Do NOT qualify the SBMJOB command with the library (Not: QSYS/SBMJOB).
20. The SBMJOB command may be used from an interactive workstation job or from a batch job.
21. The SBMJOB command may be typed by an interactive user, or it may be embedded within a program.
22. Note the LSAM Job Tracking Number that is reported when the job is intercepted.
    - For batch jobs, this information may be viewed in the job's log or in the system operator (QSYSOPR) message queue.
    - The LSAM Job Tracking Number, not the same as the IBM i job number, may be used with the LSAM command WRKTRKJOB to discover the stored job definition and its status within the LSAM job tracking system.
23. View the AdHoc schedule to monitor the job status in the OpCon User Interface.

### Using a Named Schedule

In place of using the AdHoc schedule for Tracked or Queued jobs, it may sometimes be more obvious, convenient or strategically important to use any other named OpCon schedule. In this case, the advantages of the AdHoc schedule are lost and the user becomes responsible for careful and unique definition of these jobs on user-defined schedules. Those schedules must be built and must be active in the Daily Tables for the SAM-SS to track or queue the job(s).

The job (or jobs) to be tracked or queued must be added to the OpCon Master copy of the named schedule, but these jobs must be defined with Frequency rules that will prevent the job from being automatically scheduled by OpCon. In other words, when OpCon performs its periodic automatic build of the Daily schedules that will actually execute, any Tracked or Queued Job must not appear in the originally built schedule. Instead, these jobs will be automatically added to the named schedule whenever the IBM i LSAM detects and qualifies a job for tracking or queuing, and then sends a $JOB:TRACK or $JOB:QUEUE Event command to OpCon to trigger the addition of that job to the named schedule.

:::warning
When using named schedules for job tracking or queuing, by definition those jobs should not be automatically added to the daily OpCon schedules. Therefore, any audit of other jobs that may have dependencies on the tracked or queued jobs will report an error, stating that the depended-on job is not found. This is normal and not a critical error. However, OpCon administrators must always verify that this error is due to the job being defined as a tracked or queued job and not to a definition error in the OpCon database.
:::

The instructions for configuring Tracked or Queued jobs are generally the same as listed above under The AdHoc Schedule. However, observe the following revised instructions for step 7 that apply when a named schedule is used instead of the AdHoc schedule. These instructions are the same for both **Tracked** and **Queued** jobs.

#### Set Up Job Tracking or Queuing for a Named Schedule
In the OpCon User Interface, add a new job master record to the Named Schedule, specifying the job type of IBM i.
1. Be sure that the selected machine name matches the LSAM environment where the Tracked job was registered.
2. The OpCon Job Master record must be prevented from being added as the Named Schedule is being built.  This is accomplished by marking a Tracked or Queued Job to “Do Not Schedule” in the OpCon Job Master record.
    - OpCon Enterprise Manager method: Within the Job Properties block, under the “Frequency” tab, and then within the sub-block labelled “Job Build Status", select the "Do Not Build" box.
    - Solution Manager method:  Select the Job Master view, then click the unlock icon in the top right to enable file maintenance.  Slide down to the "Frequency" portion of the Job Master definition display.  Select, or create at least one Frequency Code.  This will enable maintenance of the "Job Build Status" under the sub-title of Job Information.  Click on the drop-down values box next to the Job Build Status label, then select the "Do Not Schedule" option.  Be sure to click the Save button at the bottom left of the display to store the changes.
3. Assign one or more Frequencies to the job.  The settings of the Frequency definition(s) can allow or prevent a Tracked or Queued Job from being added to the Named Schedule, just as it does during the original Schedule Build process.  Do not mark the "Do Not Build" option under the Frequency definition, unless that is required by one of the Frequency detailed controls assigned to the job. Take note of the name of the Frequency used for each Tracked or Queued job, as this value may optionally be used within the IBM i LSAM Tracked Job Parameters to identify the correct schedule in OpCon that should track or queue the job.
4. The Schedule Date is also very important when defining a Tracked or Queued job in the LSAM Job Tracking Parameters. Be sure to examine the master plan for OpCon schedules to determine if it is possible for more than one instance of the same Schedule Name to be active in OpCon processing at the same time. Also examine the history of the Named Schedule (if available) and the planned start time to determine if a Tracked or Queued Job might not be intercepted by the LSAM until after midnight of the schedule build date.

## Managing Tracked or Queued Job Failures

Circumstances may arise that will prevent the automated steps of job tracking or queuing from completing normally. Sometimes, if the LSAM should become disconnected from OpCon, it will be impossible for OpCon to cause a tracked or queued job to be released from the LSAM job tracking master files where it was held.

An IBM i operator or administrator may decide that a tracked or queued job must be manually released from the LSAM job tracking system, rather than waiting until the problem with OpCon, or with the job tracking/queuing configuration, has been solved. If this decision is made, the LSAM will attempt to report to OpCon that the tracked or queued job was manually released so that OpCon can update the job status in the OpCon schedule.

### Manually Releasing a Tracked or Queued Job
1. Log on to an IBM i workstation with a user profile that has LSAM Administrator privileges.
2. It is possible to work with tracked jobs from command entry or from the LSAM menu system.
3. From command entry, enter the command **SMAGPL/WRKTRKJOB**.
    - It is not necessary Ensure that the LSAM environment library list is in effect for the command entry session. The LSAM sets a system-wide control value that tells the WRKTRKJOB command which LSAM environment is active for Job Tracking.
4. From the LSAM menu system, enter the LSAM menu system by entering the command **SMAGPL/STRSMA**.
5. Enter **1** to choose the **Job Tracking menu**.
6. Enter **2** to work with **Job track logs (WRKTRKJOB)**.
7. Work with Tracked Jobs, use the Job Track Logs list display function keys and operational fields to locate the record(s) pertaining to the desired Job Tracking Number.
    - Remember, the Job Tracking Number is not the same as the IBM i job number. In fact, the IBM i job number is not determined until after a tracked or queued job has been released for execution.
8. Examine the job status to be sure the job has not already been released.
    - The [Sts] column in the list display shows the status value in effect for each job log entry that applies to a job number.
    - Option 5=Display detail may be used to view the interpretation of the job status field.
9. A tracked or queued job may be manually released from either the list display or the details display.
    - From the list display, type option 6=Release job next to any log entry for the desired job number and press \<**Enter**\> to initiate the release process.
    - From the log entry details display, the function key F22=RLSJOB (release job) may be used to initiate the release process.
10. A window appears requesting whether the job should be released into Hold status in an IBM i job queue.
    - If "N" (no) is specified for the HOLD option, the job will begin execution immediately after pressing \<**Enter**\> from the HOLD window display.
    - A message normally appears at the bottom of the display reporting the IBM i submitted job ID.
11. The LSAM programs will attempt to report the manual job release to OpCon. This automatic activity is not visible from IBM i command entry, but the results may appear in the OpCon AdHoc schedule entry, if this job name appears on that schedule.

## Enabling True Passive Tracking

In many ways, the True Passive type of job tracking is the same as the Job Tracking type. It requires similar preparation and it is also constrained in the same ways as Tracking (versus Queuing). Passive job tracking cannot take advantage of the  Queuing features because the IBM i job is already started before OpCon is notified about the job. Passive job tracking uses the Alternate Job Notify technique instead of the SBMJOB exit program technique to detect job starts.

### Set Up True Passive Job Tracking
1. Log on to an IBM i workstation with a user profile that has LSAM Administrator privileges.
2. Enter the LSAM menu system by entering the command **STRSMA**.
3. Enter **6** to choose the **LSAM Management menu** in the SMA Main Menu.
4. Enter **8** to choose the **Alternate Job Notify** sub-menu.
5. If not already completed, perform the [Instructions for Configuring the Alternate Job Notify Service](../operations/lsam.md#instructions-for-configuring-the-alternate-job-notify-service) for the IBM i subsystem where the job will execute.
6. Use function key \<**F12**\> as necessary to return to the **LSAM Main Menu**.
7. Enter **1** to choose the **Job Tracking menu**.
8. Enter **1** to maintain **Job track parameters**.
9. Press \<**F6**\> to open the Add Job tracking parameters window.
10. Type the values that define when a job will qualify for Passive tracking, then press \<**Enter**\> to record the data.
    - Specify and take note of the Job Name, for use in the OpCon User Interface.
        - The job name may be predefined by third-party software where the SBMJOB action will take place.
    - The values for the Job Description, Job Description Library, Job Queue and Job Queue Library may be set to the special value of \*ALL to accept any value, or a specific name may be entered into any of theses fields. Specific names are compared to the actual job intercepted for Tracking, to qualify whether the job is accepted for Tracking or simply bypassed and allowed to execute.
    - Specify "AdHoc" or a user-defined value for the Schedule name. 
    - Set the Track Type to "P".
11. In OpCon User Interface, add a new job master record to the AdHoc or other named schedule, specifying the job type of IBM i.
12. Be sure that the selected machine name matches the LSAM environment where the Tracked job was registered.
13. Select "Tracked job" in the job sub-type pull-down list. (This value must be used for Passive tracking.)
14. Enter the exact name of the job that was registered in the LSAM Job tracking parameters Add screen.
15. Leave job parameters set to the default value of asterisk (\*); passively tracked jobs will not accept job definition overrides from OpCon.
    - It is possible to create and use a User Profile of \* or \*CURRENT in OpCon. These values avoid confusion about the IBM i job user name, though it cannot be changed in the IBM i job that is already executing. Refer to additional discussion of this topic below.
16. Update the job master definition fields.
17. Note that Spool File and Message Management parameters cannot be used with True Passive job tracking, since the IBM i job is already active or may already be finished before tracking starts. However, these tabs are not disabled for the OpCon job sub-type of Job Tracking.
18. *(Optional)* Job dependencies and events may be added that depend on the completion status of this job.
19. In any IBM i job, the tracked job may be started at will by any IBM i user or other job.
20. Unlike the basic Job Tracking type, True Passive tracking does not depend on the SBMJOB command. Therefore, passive job tracking can be used regardless of the IBM i or application software commands that have initiated the job. Passive tracking depends instead on the IBM i subsystem where the job will execute.
21. Investigating the results of True Passive job tracking:
    - To discover the outcome of an attempt to passively track an IBM i job, use the Job Tracking Menu option **2** or the LSAM command **WRKTRKJOB** to start the Job Track Logs function, and search for the job by its job name. Option **5=Display** can then be used to view the job details where there may be additional information that explains any error code which may appear when tracking was not successful. If the cause is not obvious, contact SMA Support for assistance.
    - If True Passive job tracking should fail to assign a Job Tracking Number, there will typically be an error code identifying this error, assigned to the tracked job name in the Job Track Logs function. If it is not apparent what caused this failure, please contact SMA Support for assistance. One typical cause of this error can be system timing issues, and these can be adjusted using "Delay job end notify proc" value in the **Alternate Job Notify Configuration** function, which is option **7** on the Alternate Job Notify sub-menu. For more information, refer to [Alternate Job Notify Configuration](../operations/lsam.md#alternate-job-notify-configuration).
22. View the AdHoc or other named schedule to monitor the job status in the OpCon User Interface.

## Configuring Automatic Tracking

Automatic job tracking uses less specific rules, since it is not necessary to configure either the IBM i LSAM nor any OpCon job master records for each job to enable this feature. Automatic job tracking uses a form of the basic Job Tracking type, and it cannot use the Queuing type. However, Automatic job tracking can be performed for Passively tracked jobs, or for actively tracked jobs (using the SBMJOB exit program technique), depending on the constraints of the software application that starts the jobs to be tracked. 

Remember that Automatic job tracking only works for jobs that are started by another job which is already known to OpCon and the IBM i LSAM, or for jobs that match the LSAM Job Tracking Parameter automatic tracking rules. This is because the IBM i LSAM programs must discover the associated OpCon Schedule name of the submitting job in order to automatically assign the submitted job to that same Schedule. But once a job is tracked automatically, this new job becomes known to OpCon and
the LSAM, therefore any additional jobs that it submits could also be qualified for (or prevented from) automatic tracking.

The following instructions are vague about the Job Tracking Parameter Type and Auto-Track Sub-Programs control fields because there are multiple valid combinations used for varying purposes. More information about these controls may be found in [How LSAM Job Tracking Works](#How).

### Set Up Automatic Job Tracking
1. Log on to an IBM i workstation with a user profile that has LSAM  Administrator privileges.
2. Enter the LSAM menu system by entering the command **STRSMA**.
3. Enter **1** to choose the **Job Tracking menu** in the SMA Main Menu.
4. Enter **7** to choose **Job Tracking Configuration**.
5. For the control field **Allow automatic tracking** enter a value of **1** or **2** to specify the automatic job selection method. (Referto [How LSAM Job Tracking Works](#How) for more information about choosing the positive or negative selection method.)
6. Press \<**Enter**\> to update the Job Tracking Configuration values, and return to the menu.
7. Enter **1** to maintain **Job track parameters**.
8. Press \<**F6**\> to open the Add Job tracking parameters window.
9. Type the values that define when a job will qualify for Automatic tracking, then press \<**Enter**\> to record the data.
    - *(Optional)* Specify and take note of the Job Name, or type the special value **\*ALL**.
        - The job name may be predefined by third-party software where the SBMJOB action will take place.
        - Regardless of the value specified for the "Tracked type" field, this job name will be the name of a primary, or root job that will generate one or more additional jobs (typically by executing the IBM i SBMJOB command). This job and the additional jobs it submits will be either selected or prevented from Automatic job tracking.
    - The values for the Job Description, Job Description Library, Job Queue and Job Queue Library may be set to the special value of **\*ALL** to accept any value, or a specific name may be entered into any of theses fields. Specific names are compared to the actual job intercepted for tracking, to qualify whether the job is accepted for, or prevented from Automatic tracking.
    - Specify "AdHoc" or a user-defined value for the Schedule name.
    - Set the Track Type to any supported value, except not "Q".
        - The Track type of **T** indicates that a job qualified by this Parameter set will be actively Tracked.
        - The Track type of **A** indicates that both this job and any jobs it submits will be Automatically tracked and assigned to the named OpCon schedule.
    - Set the Aut-track sub-jobs field value to either **A** or **B** depending on whether submitted jobs that match this primary job profile will be selected for, or prevented from Automatic tracking.
10. In OpCon User Interface, automatic job tracking does not require any special configuration in OpCon, since jobs will only qualify for automatic tracking if the submitting job is already known to OpCon or to the IBM i LSAM.
11. Use the name of the Schedule assigned to the original submitting job in order to view the status of automatically tracked jobs that will be added to the OpCon Schedule as they start in the IBM i system.
12. *(Optional)* The completion status of an automatically tracked job can generate events in OpCon by using the Notification Manager. Since there is no job master record for automatically tracked jobs, create either a Notification Manager Machine Group or a Notification Manager Schedule Group and add a Job Trigger.
13. In any IBM i job, the automatically tracked job must either match one of the Job Tracking Parameter records in the LSAM database, or it must be started by some other job that is already known to OpCon and the IBM i LSAM.
14. Unlike the basic Job Tracking type, True Passive tracking does not depend on the SBMJOB command. Therefore, passive job tracking can be used regardless of the IBM i or application software commands that have initiated the job. Passive tracking depends instead on the IBM i subsystem where the job will execute.
15. Investigating the results of Automatic Job Tracking:
    - To discover the outcome of an attempt to passively track an IBM i job, use the Job Tracking Menu option **2** or the LSAM command **WRKTRKJOB** to start the Job Track Logs function, and search for the job by its job name. Option **5=Display** can then be used to view the job details where there may be additional information that explains any error code which may appear when tracking was not successful. If the cause is not obvious, contact SMA Support for assistance.   
    - If True Passive job tracking should fail to assign a Job Tracking Number, there will typically be an error code identifying this error, assigned to the tracked job name in the Job Track Logs function. If it is not apparent what caused this failure, please contact SMA Support for assistance. One typical    cause of this error can be system timing issues, and these can be adjusted using "Delay job end notify proc" value in the **Alternate Job Notify Configuration** function, which is option **7** on the Alternate Job Notify sub-menu. More information about passively tracked jobs may also be available in the Alternate Job Notify Log display (LSAM menu 6, sub-menu 8, option 2). For more information, refer to [Alternate Job Notify Configuration](../operations/lsam.md#alternate-job-notify-configuration).
16. View the AdHoc or other named schedule to monitor the job status in the OpCon User Interface.

## Operating Job Capture

The general capabilities of the LSAM to perform job tracking, queuing or capture are all supported by the LSAM programs that add or remove a registered exit program in IBM i. It is required to Start Job Tracking before the Capture Job feature can be used, although the LSAM menu master and control file maintenance functions can be used while Job Tracking is stopped.

### Capturing a Job

Use these procedures to prepare for job capture, capture a job definition and then prepare the job definition for later execution by OpCon.

#### Set Up Job Capture
1. Log on to an IBM i workstation with a user profile that has LSAM Administrator privileges.
2. Enter the LSAM menu system by entering the command **SMAGPL/STRSMA**.
3. Enter **1** to choose the **Job Tracking menu** in the SMA Main Menu.
4. Enter **5** to **Check job track status (JOBTRKSTS)**.
    a.  The displayed status value must be STARTED in order for job capturing to work.
    b.  If the status is STOPPED, use the procedure above to Start Job Tracking.
5. Enter **8** to **Start job capture (STRCAPJOB)**.
    a.  Use the Start Capture Job work display to add the name of the job or workstation where the job capture action will be performed.

#### Capture a Job
1. Complete the steps above to set up for job capturing.
2. Log on to the workstation registered for capturing jobs **- or -**
3. Start the job named in the Start job capture list.
4. The job to be captured must be submitted using the **SBMJOB** command from the **QSYS** library.
    a.  Do NOT qualify the SBMJOB command with the library (Not: QSYS/SBMJOB)
5. The SBMJOB command may be used from an interactive workstation job or from a batch job.
6. The SBMJOB command may be typed by an interactive user, or it may be embedded within a program.
7. When the SBMJOB command is used from an interactive job, a prompt window will appear requesting verification of the Captured Job Id.
    a.  Note the Captured Job ID, for later use with the RUNCAPJOB command.
    b.  For batch jobs, the LSAM assumes that the name of the job in the SBMJOB command will be used for the Captured Job ID. (This value may be changed later, using the WRKCAPJOB function, to produce multiple variations from the same original job.)
8. As soon as the capture job process has completed, go immediately to the Stop job capture procedure that follows.
    a.  Multiple job captures may be performed before the job capture process is stopped. Each capture will be individually registered in the LSAM master files.

#### Stop Job Capture
1. Log on to an IBM i workstation with a user profile that has LSAM  Administrator privileges.
2. Enter the LSAM menu system by entering the command **SMAGPL/STRSMA**.
3. Enter **1** to choose the **Job Tracking menu** in the SMA Main Menu.
4. Enter **9** to **End job capture (ENDCAPJOB)**.
    a.  Use the End Capture Job work display to remove the name of the job or workstation where the job capture action was performed.
5. It is not necessary to stop the general LSAM Job Tracking feature after completing a job capture, unless this is desired for some other reason.
    a.  Consider the [How LSAM Job Tracking Works](#How) section if there is other software in IBM i that may conflict with the LSAM Job Tracking exit programs. Especially during the conversion process that follows a first installation of the
        LSAM, it may be necessary to stop Job Tracking in order to resume normal operations of third-party software after a job capture has been completed.

#### Modifying a captured job definition
1. Log on to an IBM i workstation with a user profile that has LSAM Administrator privileges.
2. Enter the LSAM menu system by entering the command **SMAGPL/STRSMA**.
3. Enter **1** to choose the **Job Tracking menu** in the SMA Main Menu.
4. Enter **11** to **Work with Captured Jobs (WRKCAPJOB)**.
5. Use the various screens and function keys of the WRKCAPJOB function to:
    a.  Change job definition parameters.
    b.  Revise the job command line.
    c.  Edit the job's library list.
    d.  Update any local data area (LDA) content associated with the job.
6. *(Optional)* Define Dynamic Variables that may be used to update the LDA content or replace values in the job's parameters or its command line.
7. *(Optional)* Insert Dynamic Variable tokens into any job definition parameter field or into the job command line.
    a.  A dynamic variable token is the name of a dynamic variable enclosed in the assigned special characters that denote a token; the default characters used to create a token from a dynamic variable are the curly brackets, e.g., **{VARNAME}**.

### Executing a Captured Job

Use these procedures to execute a captured job definition as many times as may be desired. Captured job definitions are ideally suited for periodic execution from an OpCon schedule, as compared to Tracking or Queuing a job which is designed for tracking a single, user-initiated execution of jobs in IBM i. 

Captured jobs cannot be started from within IBM i. (Contrast this with the WRKTRKJOB function, explained above, where an operator may manually release a tracked or queued job.) Captured jobs are designed specifically for use by OpCon. The LSAM job scheduler server program performs many functions required for the normal execution of captured jobs, and these functions are triggered by a job start transaction initiated exclusively by OpCon.

The only option available for starting captured jobs from within IBM i is to use some of the LSAM commands that represent OpCon Events. The OpCon event notification server can respond to event commands sent from IBM i, for example, by adding a job to a schedule and then releasing the job.

#### Define a Captured Job in OpCon
In the OpCon User Interface, add a new job master record to any OpCon schedule, specifying the job type of IBM i.

1.  Be sure that the selected machine name matches the LSAM environment
    where the captured job was registered.

2.  Select "Batch job" in the job sub-type pull-down list.

3.  Under the Call Information tab, enter this command format into the Call field:
    ```
    RUNCAPJOB CAPJOBID(captured_job_ID)
    ```

    - Specify the exact name of the captured job ID that was registered while the job capture process was in effect.

4.  Leave job parameters set to the default value of asterisk (\*) to allow the originally captured, or maintained job parameters to be in effect.

5.  Set the Job Date field to the predefined value of \*SYSVAL to specify that the DATE parameter of the original IBM i SBMJOB command should control the job date.

6.  It is possible to create and use a User Profile of \* or \*CURRENT in OpCon. These values allow the original IBM i job user to be preserved. Refer to additional discussion of this topic below.

7.  Specify any job parameters in the OpCon job master record that should be overridden, replacing the parameter values stored with the captured job definition.

8.  Update the job master definition fields.

9.  Complete any other batch job definition maintenance the same as for other IBM i batch jobs, including setting the frequency for this job.
 
10.  Use any form of OpCon schedule building to cause the job to be executed according to OpCon rules.

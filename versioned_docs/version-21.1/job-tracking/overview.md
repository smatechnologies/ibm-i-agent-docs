---
sidebar_label: 'Job Tracking and Queuing'
---
# Job Tracking and Queuing

## Overview of Job Tracking

The Job Tracking and Queuing feature allows external (user-submitted) jobs to be tracked, queued or captured for processing by OpCon. This feature is used for three general purposes.

- First, it enables OpCon to become aware of jobs that are started by IBM i users or by other jobs, but not by an OpCon schedule or event.
- Second, it provides support for managing IBM i job features, such as the local data area (LDA) associated with a job, that cannot easily be managed directly by OpCon from outside of the IBM i operating system.
- Third, the same underlying tools support capturing complete IBM i job definitions so that they can be adapted and reused later, possibly many times, by direct OpCon job start requests.

For all jobs started in the IBM i system, one of two techniques may be used to check if jobs should be intercepted by the LSAM and reported to OpCon. Jobs are qualified for different types of job tracking, as defined next in this topic. As jobs are intercepted, the LSAM preserves the job's attributes, including the command line and the local data area (LDA) contents, in LSAM master files. IBM i LSAM Dynamic Variables may be used to modify the content of any job's LDA or to modify any other job parameter. Dynamic Variables are especially useful for captured job definitions.

- Prepare OpCon to track external jobs by addressing the following topics, as discussed in this topic:
  - Configuring the LSAM's job tracking control information.
  - Configuring predefined jobs in the IBM i LSAM for External Job Tracking (if required).
  - Identifying the External Job(s) in the OpCon User Interface by adding them to the special AdHoc schedule, or to any other named schedule (if required).
- Prepare OpCon to capture jobs that are predefined by third party software by addressing the following topics, as discussed in this topic:
  - Temporarily registering a job or a workstation to utilize the LSAM's Capture Job tool.
  - Optionally defining dynamic variables, and/or working with captured job information.
  - Building job master records in the OpCon User Interface that can execute jobs previously captured by the LSAM tool.

:::warning
When using multiple LSAM environments, it is only possible to start job tracking from one environment at a time.

The reason for this restriction is that job tracking is a system-wide function that is managed by manipulating the exit points for the system command to submit jobs (SMBJOB). The exit program for LSAM job tracking can only be registered for one LSAM environment at a time. Job tracking must be stopped in one environment before starting it from another environment. As with all tasks involving multiple environments, this requires careful coordination with SAM-SS of OpCon.
:::

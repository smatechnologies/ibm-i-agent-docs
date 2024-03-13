---
sidebar_label: 'Tuning LSAM Performance'
---

# Tuning LSAM Performance

This topic provides hints and guidance about procedures and configuration settings that can be used to tune the performance of SMA's IBM i LSAM servers. This topic may be updated from time to time with additional information. It is not presented as a comprehensive guide to every possibility.

:::caution
The procedures described in this topic should only be performed by experienced technical analysts who completely understand the LSAM configuration parameters and also the process of configuring IBM i work management. Incorrect settings can seriously impact the performance of the entire IBM i system and they can also cause the LSAM to report incorrect information about job status.
:::

## LSAM Parameters that Affect Performance

There are certain IBM i LSAM Parameters that are made accessible for user maintenance in order make it possible to tune the LSAM server program performance. Among the LSAM functions that are subject to tuning are TCP/IP sockets communications and also LSAM monitoring of job completion status. There is not a single formula for tuning LSAM performance. The best settings for the LSAM Parameters will vary depending on the profile of the overall IBM i system work load, the level of IBM i system activity, the level of OpCon job scheduling activity and the types of jobs being submitted by OpCon, and finally also by the capacity of the IBM System i partition resources assigned to any one IBM i partition.

This documentation includes detailed discussion about each LSAM Parameter, mostly in [IBM i LSAM Configuration](../configuration/configuration.md). This topic summarizes groups of parameters to help with the evaluation of how those parameters could be set.

There are presently three groups of LSAM performance parameters, all appearing on page 2 of the LSAM Parameters maintenance function (option 7 on the LSAM main menu).

### Job Scheduling Communications Performance Parameters

Parameters in this group not discussed here are covered in detail in [IBM i LSAM Configuration](../configuration/configuration.md).

It is very important to note that the first parameter, Keep socket open, should always be set to Y = yes. This parameter is carried over from past versions of the LSAM. In the past, there were certain limitations of both software and hardware that sometimes required the sockets communications link between the LSAM and OpCon to start a new socket conversation for each transaction. This was highly inefficient, although it did solve a problem where job scheduling transactions could be lost. SMA believes that these problems of the past have been solved by enhancements both from SMA and from the operating system vendors and hardware vendors. The interface is much more efficient if the socket communications link starts one conversation and uses that single conversation for a continuing, bi-directional flow of transactions. This parameter should never be changed without first consulting with SMA Support.

There are three parameters that directly affect the second-by-second performance of the LSAM job scheduling communications server job (job SKTCMN, program CMNSKTR00):

- Control DTAQ wait
- Control DTAQ frequency
- Input wait timeout

This server job and program are responsible for communications between the IBM i LSAM and the SAM (schedule activity monitor) of OpCon, that is, via the SMANetCom process (network communications). The LSAM communications program uses its performance parameters to balance its ability to aggressively handle job scheduling transactions against the potential for adversely impacting IBM i system performance. 

In general, all the LSAM server programs can be tuned for better responsiveness AND less impact on system performance by careful attention to the IBM i work management configuration, discussed below. But if the communication's program cycle is well understood, it may sometimes be desirable to change one or more of these three performance
parameters.

All of the LSAM communications programs are designed so that they do not wait eternally for new transactions to arrive over the TCP/IP socket connection. Instead, these programs rotate among three tasks. Besides checking for new incoming communications transactions from OpCon, they also check for messages prepared by other LSAM server programs that need to be sent to OpCon and they check for any operator control instructions that may arrive in each program's control data queue.

The input wait timeout parameter tells the program how long to stop and wait for a response from the system when checking for new socket communications input. The IBM i system has been instructed by the program to receive and store any incoming transactions until the program returns and asks for new input. During periods of high activity, there will be transactions ready for the program to receive every time it requests them, and this input wait timeout parameter will not delay this process. However, when an idle period occurs, the program will wait  quietly, consuming almost no system resources, for as many seconds as are specified by this input wait timeout parameter. But this quiet wait time must be balanced against the two other tasks this program performs.

It is just as important for the LSAM job scheduler communications program to send out job status information and other transactions such as OpCon Events that the LSAM can generate as it is for the program to receive transactions from OpCon. So the program must not wait too long for socket communications input before it moves to the next step of checking the LSAM's outgoing transaction data queue (CMNOUTT00) for any new messages to send to OpCon.

In between managing incoming and outgoing transactions, the LSAM job scheduler communications program should also periodically check for operator control instructions.

Operator control instructions may include a request to start or stop logging, or to completely shutdown the program. Obviously, the communications program's primary responsibility is to handle data communications, so it is not necessary for it to check for operator commands very frequently or wait very long to see if there are any new
operator instructions. On the other hand, in case there is an unusual circumstance, it is very beneficial for the communications program to be able to respond quickly, in the midst of heavy communications flow, to an operator's request to start logging. The two parameters called Control DTAQ (control data queue) tell the program the frequency at which to check the control data queue, and then how long to pause while it waits for new operator instructions.

Traditionally, socket communications programs have used the wait time on a control data queue as a way to prevent the program from consuming too many computer CPU cycles with active data communications activity. However, the method the LSAM uses to let the operating system handle data communications asynchronously on behalf of the program allows the program to use its input wait timeout parameter for this purpose. Therefore, the control data queue wait should normally be set as low as
possible, that is, to a value of 1 second. This parameter cannot be set to zero seconds because the program will then insist on a default value of 5 seconds. Therefore, 1 second is the most aggressive setting and it is the recommended setting for best LSAM performance.

The control data queue frequency parameter tells the communications program how to behave during periods of active data communications. As long as there are transactions being sent and received, the program should normally dedicate itself to data communications and not take time to check for less important operator control commands. However, as mentioned above, the control data queue should be checked often enough to allow an operator to start logging in the midst of unusual activity.

The frequency setting is the number of data communications transactions the program should handle before it interrupts that process to check for operator control commands. For example, if the frequency parameter is set to 20, the default value, then the program may pause for as long as the control data queue wait seconds (usually 1 second) in between every 20 transactions. Considering that the communications program can actually handle many more than 20 transactions per second under ideal conditions, it might make sense to increase this frequency count to a higher value in order to increase the volume of transactions per second that the LSAM job scheduling server can handle.

The default values supplied with the IBM i LSAM software suggest that a good starting point is to set both wait times to 1 second and the frequency count to 20. If the LSAM performance needs to be improved to handle more transactions per second, then the control data queue frequency count should be increased. On the other hand, if the LSAM job 
scheduling communications program seems to be utilizing too many CPU seconds, the input wait timeout value could be increased, one second at a time.

:::tip
Changes made to LSAM performance parameters will only take effect if the LSAM server program(s) are stopped and restarted. It is possible to manually stop just one of the LSAM server programs and then cause it to be restarted by using the LSAM management menu (menu 6), option 1 to Start LSAM. The start-up process knows how to identify which server job needs to be restarted. However, in most cases it is preferred to use option 2 from this menu to stop all the LSAM server programs and then restart them. This method is preferred because it helps to assure that no transaction would be interrupted abnormally.
:::

### JORS Communications Performance Parameters

Parameters in this group not discussed here are covered in detail in [IBM i LSAM Configuration](../configuration/configuration.md).

JORS means job output retrieval system (or service). For the IBM i LSAM, JORS is the function that stores and later retrieves IBM i job log reports when the OpCon Schedule functions are used to "view output" of the job. JORS does not presently support retrieval of any other type of job output.

The JORS communications performance parameters work exactly the same as the job scheduling communications performance parameters. For details, please review the previous section of this document. However, the  LSAM's JORS communications server program has a complete different workprofile from the job scheduling server program.

Job scheduling involves a constant flow of transactions that govern the operation of many IBM i jobs all at once. Transactions from different jobs will overlap each other in the data communications flow. There is only the one communications server job handling the entire job scheduling activity flow.

In contrast, the JORS communications server program actually spawns a worker job to handle each JORS request. A single JORS request arriving from OpCon will be handed over to a worker job, and then the worker job will complete the conversation during the process of retrieving information from the LSAM database files and transferring that
information to OpCon. Obviously, the process of listing the report files available for a job is a very short process because there is only one job log report supported for each IBM i job at this time. On the other hand, the OpCon transaction that requests the content of the job log report could require that a worker job send a very long stream of data from IBM i to the OpCon server. Fortunately, the LSAM JORS server sub-program uses data blocking to pump report data at a very
rapid pace.

In general, the JORS server programs are not required to be as aggressive as the job scheduling server. Also, the JORS worker jobs tend to disappear very quickly from the IBM i system. Therefore, the JORS communications performance parameters are not as critical as the job scheduling parameters.

There are two sets of control data queue performance parameters for JORS. One set is for the main server job and the other set is used by each sub-job (the spawned worker job). However, at this time there is only one input wait timeout value that is shared by both jobs. 

The default values supplied for the JORS server jobs are set to lazy values, the idea being that JORS is a low priority activity. That is, the computer does not have to work as hard to keep up with the pace of human user activity (manually initiated JORS requests, one at a time) as it does when it is trying to aggressively manage a large load of
concurrent job starts and status reports being managed by the computerized OpCon SAM service. If there is a need to improve JORS responsiveness, these performance parameters could be adjusted according to the principles described in the section above about job scheduling performance.

## Job Scheduling Performance Parameters

Parameters in this group are different from the Job Scheduling Communications Performance Parameters. There is one actual performance parameter that governs how the LSAM job completion message monitor server program behaves.

The Job message idle timer parameter helps to maintain a balance between aggressive system activity monitoring and avoiding an adverse impact on system performance. Its value must be set low enough that the LSAM job completion message monitor program will always stay ahead of any OpCon request for a job status report. This parameter is also discussed in two places in [IBM i LSAM Configuration](../configuration/configuration.md).

It is possible for the IBM i LSAM servers issue a false error message SMA0097. This can happen if the LSAM job completion message monitor job (TXMMNG, program LSARCMR00) has been set with too long of a Job message idle time in the LSAM Parameters. If the LSAM ever does report that a job has failed with error code SMA0097, but it is clear that the job did finish normally, this can be prevented by lowering the Job message idle timer parameter value (refer to [Job message idle timer](../configuration/configuration.md)). In some cases, it might also be necessary to increase the performance of the LSAM server job TXMMNG by changing the active job itself while it is
active (which could be done with an OpCon job during periods of peak activity) or by revising the LSAM subsystem configuration [Tuning LSAM Performance](#top).

## IBM i Configuration for the LSAM Servers

This topic does not include instructions about how to create or modify the various IBM i objects used to tune system performance. Please consult IBM documentation about the topics of subsystems and subsystem descriptions, memory pools, class objects (that define the job run priority, the job time slice and the memory page purge option), routing
entries and job descriptions. In general, the topic of IBM i work management must be well understood in order to take best advantage of the information offered in this section of the document.

The possible profiles of IBM i configuration and system work loads vary so widely that no attempt has been made by SMA to suggest what the best configuration is for optimal performance of the set of LSAM server jobs. Instead, the default installation of the LSAM software is designed to passively share the usual set of IBM i default work management objects in order to make it easy to install and demonstrate the LSAM software. The default installation is also designed to make it very simple to
remove the LSAM software from the IBM i environment without impacting the site's work management configuration.

However, the default LSAM work management configuration may not perform well in a busy system or partition running IBM i. This is because the default SMASBS subsystem description and the SMALSAJ00 job description are configured to share the *BASE memory pool. Therefore, the first change that any site should consider is creating a private memory pool with an associated activity level that will support the required performance level of the LSAM server programs without robbing the system of resources needed to complete its primary missions. Of course, this means that the subsystem description used by the LSAM would have to be changed.

### The LSAM Subsystem Description

The LSAM software is provided with a default subsystem description named SMASBS. The default installation assumes that a unique subsystem description would be a good solution for tuning LSAM performance. In fact, it is possible to use any existing or new subsystem description for the LSAM server jobs. However, be aware that the LSAM menu functions for starting and stopping the server programs will attempt to evaluate who started the subsystem where the servers are running, and it when the request is made to stop the LSAM server programs, a dedicated subsystem will also be stopped at the same time. The LSAM logic in this case is fairly sophisticated. For example, if there are two different LSAM environments sharing the same subsystem description, only the environment where the subsystem description resides will actually be
able to start or stop the subsystem. The other environment will only be able to start or stop its own server jobs.

To assign a new subsystem description for use by an LSAM environment, enter the name of the subsystem description into that field on page 1 of the LSAM Parameters (LSAM main menu, option 7). Each LSAM environment may have its own name for the library that takes the role of SMADTA, the database library. It is possible for a different job queue to be used by each LSAM environment. Refer to the discussion below about the LSAM job description for more information.

Be sure that subsystem assigned to an LSAM environment has a job queue entry for the SMALSAQ00 job queue that resides in the LSAM's SMADTA library and that the job queue entry allows a sufficient maximum number of active jobs. This number of active jobs will vary, depending on how the LSAM services are used. There may be 6 -- 8 basic server jobs, but some of the LSAM servers spawn additional sub-jobs. (When the SMA File Transfer capability is added to the IBM i LSAM, it may be necessary to review where those file transfer tasks are running and how many concurrently active jobs are anticipated.)

Regardless of what subsystem description is used, it is important to match the routing entries added to that subsystem description with the routing data used by the job description assigned to LSAM server jobs. The subsystem routing entries are used by IBM i to assign a class object to the job, and this is how a job obtains its initial settings of job priority, time slice and the (memory page) purge option. Careful configuration of these entries and objects enables the LSAM servers to be set to an optimal priority where they can stay ahead of all the other jobs under IBM i that the LSAM is expected to manage.

### The LSAM Server Job Description

The LSAM software is hard-coded to use a job description named SMALSAJ00 as it starts each of the LSAM server jobs. At this time, there is no provision to assign different job descriptions to each of the different LSAM server jobs. Please contact SMA Support if it appears that system performance would benefit from an ability to set distinct LSAM server jobs to different run-time attributes.

The SMALSAJ00 job description must reside in the LSAM environment library that corresponds to the SMADTA (database library) role. The default LSAM installation uses the actual name of SMADTA for this database library. Alternate LSAM environments may be configured to use different library names, but the LSAM tools for managing multiple
environments require that one library in the LSAM's library list be assigned to the SMADTA role.

For the purposes of tuning system performance, it is the routing data parameter (RTGDTA) that is most important for associating the LSAM server jobs with the correct routing entry in the subsystem description used by the LSAM servers. The job description routing data must match the subsystem description routing entry that specifies the class object desired for optimal performance of the LSAM server jobs.

The LSAM software makes no assumptions about, and imposes no requirements on the SMALSAJ00 job description, other than the name of the job queue that it will use: SMALSAQ00. Both of these names are hard-coded into the LSAM software. Also, both the job description and the job queue must reside in the SMADTA library of the LSAM environment.
The SMADTA library name may vary, depending on how the LSAM environment was configured.

It is possible to share the LSAM server job description for other types of jobs, but keep in mind that this job description may be configured with a routing entry that gives a job unique attributes reserved for LSAM server performance.

### Automating the Tuning of LSAM Performance

The ability of OpCon to execute most types of command under IBM i makes it possible to use an OpCon schedule and jobs to change the performance of the LSAM server programs while they are active. Such a schedule might be executed at different times when the profile of work in the managed IBM i system is changing during a day.

A variety of strategies is possible. One simple example that seems apparent is the ability to execute a CHGJOB (change job) command that would alter the run priority or time slice allocated to one or more of the LSAM server jobs. There is information in this documentation about the names of the LSAM server jobs and the purpose of each, starting with [IBM i Components and Operation](../operations/components.md). There are also IBM i commands that can be used to vary the allocation of system resources among IBM i subsystems.

Another option for automation of performance parameter tuning when there is no specific Agent command for the purpose is to configure an Operator Replay Script that navigates to the LSAM Parameter to be changed.

Contact SMA support if further assistance is needed with this topic.
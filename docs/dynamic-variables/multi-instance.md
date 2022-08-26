---
sidebar_label: 'Multi-Instance Dynamic Variables'
---

# Multi-Instance Dynamic Variables
## Overview
Similar to the multi-instance Property support provided by the OpCon central server application, the Agent for IBM i can now support true parallel processing as variable values are isolated to any of the following optional instances.

- **SI.** = OpCon Schedule Instance.  This scope matches the same scope used by the OpCon Job Scheduler, applied to any IBM i jobs started by OpCon.

- **JI.** = OpCon Job Instance.  Each IBM i job started (directly) by OpCon gets its own value for a Dynamic Variable, using the OpCon Job Name as the key to that value.

- **IJ.** = IBM i Job Instance.  Any IBM i job can use Dynamic Variable values isolated to just that job, without any reference to OpCon Schedules or Jobs.

- **IU.** = IBM i “Unit of Work”.  IBM jobs that are associated with each other by the use of the IBM i SBMJOB command can share a unique Dynamic Variable value.

Multi-instance Dynamic Variable capabilities are engaged simply by adding one of the prefixes above to the Dynamic Variable name, for example:  **{IJ.MYVARNAME}**

#### Using Simple Instance Qualification in Most Cases

It is normally very simple to engage variable instance isolation by simply adding a 3-character prefix to a Dynamic Variable token anywhere among the Agent’s automation features.

The Agent supports up to 435 characters for a Dynamic Variable {TOKEN} to allow for circumstances when a Dynamic Variable instance must be fully qualified by, for example, the complex string of parameters that identify an OpCon Job.  However, fully qualified variables are usually only used internally by the Agent software.  Special use cases where the LSAM Administrator might expect to need instance qualifying keys are explained in this documentation.

## Summary of Multi-Instance Dynamic Variable Characteristics

Multi-instance Dynamic Variable capabilities are engaged simply by adding one of the prefixes below to the Dynamic Variable name, for example:  {IJ.MYVARNAME}.  Instance-qualified variable names can usually have their required key fields deduced by the Agent’s software, based on the context of the job where a Dynamic Variable {TOKEN} will be replaced by its value.  But for special purpose use cases, the Agent provides data selection and data prompting aids to help the user compose a correct set of instance qualifying parameters.  The key fields used by each of the following instances are demonstrated by their associated templates.

### SI. = OpCon Schedule Instance
This scope matches the same scope used by the OpCon Job Scheduler.  Any IBM i jobs that are started by the same OpCon Schedule can share a Dynamic Variable value.  Other Daily instances of the same master Schedule in the OpCon server have a different Name, even though they may be executing all the same steps.  But the OpCon Schedule Instance Name is used to isolate the Agent’s Dynamic Variable value so that two different instances of the same Schedule can be running at the same time without interfering with each other.

Template:
```
SI.<VARNAME>.<SkdDate>."<SkdName>"
```

### JI. = OpCon Job Instance
Any IBM i job started by the OpCon server can use the unique OpCon Job identifier parameters to isolate a Dynamic Variable value to just that one IBM i job.  (See also the next description of the IBM i Job Instance.)

Template:
```
JI.<VARNAME>.<SkdDate>."<SkdName>"."<SamLongJobName>".<SamJobNbr>
```
 
### IJ. = IBM i Job Instance
Although this instance of a Dynamic Variable value is also isolated to just one IBM i job, this instance type does not require any connection to a job on an OpCon Schedule.

- Job instances of Dynamic Variables (whether JI or IJ) are especially useful when used with the IBM i Agent’s Multi-Step Job Scripting tool. The individual Steps of a Script may each execute different programs or commands within the IBM i partition, and all those Steps can share Dynamic Variable values without interfering when the same Script is being executed by a different IBM i job.
    - In this example, instance-variables function in the same way as DCL (declared) variables in a CL (Control Language) program.  But the Agent's Scripts do not require compiling as CL programs do.  Thus, the Agent's Scripting tool is more flexible and also safer than compiled programs because they cannot be made to run with adopted authority as can compiled CL programs.
- Job instance Dynamic Variables gain the same advantage when Captured Data Response Rules are being executed, so that the same set of Rules can be executing within different IBM i jobs but isolated from each other.  Response Rules are used by Operator Replay scripts, by the SCANSPLF command and by the Agent’s Message Management system. 
- The Message Management serve job uses the Job ID of the Job that issued the message for qualification of variables, and not the IBM i Job ID of the Agent’s Message Management server program.
- Operator Replay uses the Job ID of the script driver program, by default.  But since the virtual workstation job that is connected to the script driver program is actually a different IBM i job, the virtual workstation job has a different IBM i Job ID than does the script driver program.
    - The Agent provides a tool and procedures that can be used to share instance-variable values between the script driver and the virtual workstation job.
    - In most cases, the instance-variable values will be managed by the script driver program, and those values will be sent to a virtual workstation job as part of the "String to send" data - that is, data generated by the emulated keyboard input to the workstation.

Template:
```
IJ.<VARNAME>."<iJobName>".<iUserName>.<iJobNbr>.<iJobDate>.<iJobTime>
```

### IU. = IBM i “Unit of Work”
IBM documentation sometimes refers to multiple different types of “units of work,” but this feature of the OpCon Agent has its own, unique definition.  For the Agent, a unit of work is defined by the connection among jobs that submit each other (usually using the IBM i SBMJOB command).  This instance does not require any connection to an OpCon Schedule or Job.  But it overcomes the problem of isolating a Dynamic Variable value that must be shared by a whole tree of submitted jobs, when that same tree of submitted jobs might also be executed starting with a different “anchor job.”  

#### The Unit of Work instance is keyed by the IBM i Job ID of an “Anchor Job"
The first job in the tree, perhaps understood as the trunk of the tree, uses its IBM i Job ID to identify the “anchor” for the unit of work it will submit.  (This IBM i Job ID gets stored by the Agent as if it were a Schedule Name for the Dynamic Variables.) Thus, the OpCon Scheduler can initiate multiple threads of processing within the IBM i partition for the same theoretical unit of work, but where each different job that OpCon submits using a different Dynamic Variable Unit of Work ID.

Template:
```
IU.<VARNAME>."<SkdName=JobName10+JobUser10+JobNbr6+JobDate8+JobTime6>"
```

The following diagram may make this Unit of Work concept easier to understand and utilize.  The IBM i operating system stores the “Submitted For” (= submitted by) Job ID for jobs B and C in this diagram.  Job A, having no submitter, is usually the Anchor job for this unit of work, so its IBM i Job ID is the key value that qualifies any IU.VARIABLES referenced by any of the jobs that are part of this unit of work.

![Unit of Work Job Chain](../Resources/Images/IBM-i/Dynvar-Unit-Of-Work-Chain.png "Unit of Work Job Chain")

In the diagram above, notice that the Job C box refers to a “SKDNAME” (Schedule Name) field.  There is never an actual OpCon Schedule Name associated with the IU.instance, so that field is re-used to designate the full IBM i Job ID of the anchor Job ID.  The IBM i Job ID fields for Job A comprise the full key value for the variable, and those fields are organized as shown above in the template for this instance.

#### Boundaries (Anchors) for IU. Units of Work

When a new multi-instance variable is first encountered by the Agent in any job, that is, when there is no instance yet stored in the Dynamic Variables master file for THIS variable related to THIS job, then the Agent will decide what IBM i Job ID to use for the IU.instance based on the following rules about what kinds of jobs can be the anchor job.  The Agent will search backwards through a chain of submitted jobs, as necessary, until one of the pre-defined boundary jobs is discovered.

1.	An interactive job is a boundary for an IU.anchor because it has no “submitted by” attribute.
- EXAMPLE:  Menu-driven SBMJOB action.
2.	The IBM i LSAM Job Scheduler job (TXMMNG) should NOT be an anchor, because it submits many different unrelated jobs.
- However, any job that TXMMNG submits CAN be set as the anchor for an IU.instance.
3.	User-defined anchors can be designated by the SETDYNVAR command using the “IUKEY” parameter values…
- \*DEFAULT:
    - As defined above
    - The current job (can be an interactive job or the current batch job in a series, ignoring any predecessor batch job in same series).
- \*THISJOB: Use the job that runs the SETDYNVAR as the anchor for the IU.instance.
- \*PREVJOB: Use the “Submitted by” (SBMFOR) job to anchor IU.instances for this job and any additional job it may submit.
- To force a given batch job to become an anchor for an IU.instance, from any other job, use IU.variable.<QUALIFIERS\> in the Variable Name field of the SETDYNVAR command (or the Store to-> Variable in a Capture Data Rule).
    - The <QUALIFIERS\> can be partially completed, such as specifying only the JobName10 (see Template reference, above), but be sure to leave spaces for the preceding JobNbr6 value. 
    - When specifying only the JobNbr6, if this number exists more than once in the IBM i  tables, the most recent occurrence of the job will be chosen.  It is not necessary to leave quoted spaces for the qualifier values that follow the JobNbr6.

### Alternate Job Notify Service Required for IU. Instance

The Agent’s Alternate Job Notify service must be configured and activated before the IU.instance can be used.  A new pair of Agent server jobs (named JOBNFY*) will appear in the LSAM server job subsystem once this service is activated.  This requirement is based on the possibility that very short IBM i jobs will not always have their status registered in time for use by the Agent’s multi-instance variables logic when the Agent is only depending on the arrival of job completion messages.

The Alternate Job Notify service can be configured to process any one or more of its three supported modes of service:
```
 JOBNFYD301           Alternate Job Notify Configuration               2/09/22  
 USERNAME          Environment: SMAGPL9     Version: 21.1             10:05:00  
                                                                                
 Use Alt Job Notify Server.: N           Y=yes, N=no, T=Tracked only            
                                                                                
 Notify Actions                                                                 
   OpCon job completion  . : Y           Y=yes, N=no                            
   Passive job tracking  . : N           Y=yes, N=no                            
   IU.Dynamic variable jobs: N           Y=yes, N=no                            
                                                                                
 Default notify data queue.: QSYSDTAQ                                           
   Default DTAQ library....:                                                    
 Delay job end notify proc :   3         seconds                                

```
1.	The procedures for activating Alternate Job Notify are written in detail in the IBM i LSAM Administration Guide (= HTML User Help:  Agents – IBM i).
    - (PDF Chapter 5) -> IBM i Components and Operation -> Operating the LSAM -> Alternate Job Notify Service.
2.	From LSAM sub-menu 6, select option 8 to enter the Alternate Job Notify sub-sub-menu.
    - Select option 7 from this sub-menu to configure the LSAM Alternate Job Notify global control options.
    - Under the (new) “Notify Actions” section, type “Y” (= Yes) next to the line labeled “IU.Dynamic variable jobs”.
        - This option may be used with or without the other Notify Action options, but it is required to store this “Y” setting for the IU.Dynamic variables to work.
        - This setting must be completed before the next step of registering one or more data queues.
3.	It is necessary to separately register each job queue where batch jobs might be submitted that need to use IU.DynVars.  The LSAM simplifies this process, eliminate multiple low-level IBM i commands, such as managing access to the IBM i Exit Point register.
    - Using the LSAM tools for this process eliminates any need to directly authorize any IBM i user profile (except for the LSAM service profile) to have direct authority to the Exit Point Register.
        - Instead, the LSAM Object Authority function under LSAM sub-menu 9 should be used to grant authority for an LSAM administrator to use the program that runs the Work with Alternate Job Notify function (option 1 in the Alternate Job Notify sub-sub-menu .
    - Part of the registration process requires that the subsystem connected to a job queue must be stopped and restarted.
    - The LSAM list of registered job queues supports an action code that launches a test of the exit point registration.  Use option 5=Display to see the results of the test.  The test must be passed before the LSAM Alternate Job Notify can be used.

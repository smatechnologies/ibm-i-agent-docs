---
sidebar_label: 'Managing the Local Data Area'
---

# Managing the Local Data Area

## LDA Behaviors

Every job in the IBM i operating system has a private local data area, usually referred to as the LDA, which can contain up to 1024 characters.  The LDA cannot be shared with other jobs, except when one job submits another job using the SBMJOB command or the spawn() program operation.  

The LDA is often considered a legacy method for sharing data between steps within a job.  A legacy multi-step job is usually managed by a Control Language program that will call more than one program, such as an RPG program.  

### Adapting LDA Management to OpCon Automation

When converting legacy multi-step jobs to OpCon control, a common strategy is to separate the program calls into separate Jobs within an OpCon Schedule. But this strategy will disable the operating system's ability to automatically share LDA content among the programs, since each OpCon job will have its own LDA created as the job is submitted within the IBM i operating system.

But the OpCon Agent for IBM i uses the SBMJOB command to start jobs when the OpCon server sends a job start request.  This implies that the content of the IBM i Agent server program's LDA will be passed to the submitted job.  Therefore, the Agent has the means to pass pre-determined LDA content to the submitted job. The IBM i Agent was constructed years ago to manage this technique by using Type-L Dynamic Variables.

Type-L Dynamic Variables use an IBM i batch Job Name (or a Captured Job ID - see [Job Tracking - Job Capture](/job-tracking/tracking-types.md#job-capture)) as the name of one, or a group of Type-L Dynamice Variables.  Type-L Dynamic Variables always require a non-zero Variable Sequence number (also referred to as the Token Sequence number in some cases).  The purpose of the sequence number is to collect multiple Dynamic Variable values under a single Variable Name, so that each variable can each be assigned to a different segment of a Local Data Area.  The advent of the 1024-character Dynamic Variable Value permitted a single Dynamic Variable to contain the entire content of an LDA.  But past limitations of Dynamic Variable values to only 128 characters required that at least eight Dynamic Variables be configured to contain a whole LDA.  Regardless of the Dynamic Variable Value size, some automation solutions may require updating only short segments of an LDA, so there remains an important purpose for the Variable Sequence Number.  Even if only one Dynamic Variable of Type-L will be used to update an LDA, the Variable Sequence Number must not be zero - in this case it would be (001).

:::note
Type-L Dynamic Variables can also use the Character Trimming Start and Length fields to manage a stored or calculated variable value before the final resulting value string will be assigned to the segment of the Local Data Area defined by the LDA Start and Length fields.  This coordination of the two pairs of Start/Length fields was introduced with Agent version 21.1, replacing the previous dual purpose of the LDA Start and Length fields.

Type-V Dynamic Variables will ignore the LDA Start and Length fields, as they now depend exclusively on the separate Character Trimming Start and Length fields.
:::

The following sections of this documentation chapter provide details about a use case for Type-L Dynamic Variables that can support parallel processing by leveraging Multi-Instance Dynamic variables.  Referring to the concept of adapting a legacy Control Language program to an OpCon Schedule of individual Jobs, this document chapter provides detailed instructions about how to share LDA content among all jobs in an OpCon Schedule based on a multi-instance Dynamic Variable that is assigned to a SI. instance (Schedule Instance), where SI.TOKENS are qualified by the OpCon Schedule Name (and Schedule Date).

## Use Cases for LDA Content Management

Background for the following use cases can be found in these previous topics within this document chapter:
- [Multi-Instance Dynamic Variables](./multi-instance.md#overview)
- [Nested Dynamic Variable Tokens](./nesting.md#overview-of-nested-dynamic-variable-tokens)

### The Functions of Type-L Variables

Type-L Dynamic Variables are used to store or retrieve values from any data source that Dynamic Variables can tap, and then to return a complete 1024-character image that can be used to set the content of a job's local data area (LDA).  Type-L variables can be limited to update only certain parts of the LDA by using the Dynamic Variable LDA Start and Length attributes.  Multiple Type-L variables can be assigned to the same IBM i Job ID (or to an Agent Captured Job ID) by using the Dynamic Variable Sequence number, which must not be zero for Type-L variables (but the sequence number is ignored by Type-V variables).

:::note
The basic function of Type-L Dynamic Variables does not require, and does not support multi-instance qualification of the variable {TOKENS}, since by definition the LDA is specific to a given IBM i job, or to two or more jobs connected by the SBMJOB command.
:::

Here is a summary of ways that Type-L Dynamic Variable content can be assigned to an IBM i Job's LDA:

#### Setting the LDA of simple batch jobs by the OpCon Job Scheduler:

OpCon job master records for the IBM i Agent can assign LDA values to any general IBM i batch job.  Details about ways to configure the OpCon job master records by using adding one or more LDA( ) keywords to the job's Call command box are provided under [Setting an IBM i Job's LDA Value](/configuration/extended-call-cmd.md#setting-an-ibm-i-jobs-lda-value).

When using the LDA( ) Call command extension parameter, there is a format that does not require a Type-L Dynamic Variable.  But other formats for building the LDA content can use Type-L variables, as documented in the topic linked just above.

#### IBM i Agent's Job Tracking feature support for LDA content:

The IBM i Agent's Job Tracking feature has a built-in capability for pre-loading the LDA before the pre-defined IBM i Job is release to the operating system.  Data for the LDA is provided either by Type-L Dynamic Variables (keyed by the IBM i Job Name) or by storing and retrieving the LDA content of a Captured Job, where the LDA content gets stored in an Agent database file that supports manual maintenance of the LDA conten.  Details about these methods are described in Job Tracking and Queuing -> How LSAM Job Tracking Works -> [Local Data Area (LDA) Support](/job-tracking/details.md#local-data-area-lda-support).

#### IBM i Agent's Operator Replay updating the LDA content of virtual workstation interactive jobs:

Specific procedures described just below enable the Agent's Operator Replay green screen automation (RPA) feature to set or update the LDA of the virtual workstation interactive job. The Opertor Replay Script Steps can also manipulate (set or retrieve) LDA content for use among any linked Captured Data Response Rules.

#### Isolating LDA content management within parallel processing

Although Type-L Dynamic Variables themselves cannot be qualified by appending a multi-instance prefix to the variable name, these variables are already isolated, by definition, to just one IBM i job, or to two or more IBM i jobs that are linked by the SBMJOB command.

To integrate LDA content processing to isolated parallel processing, a Type-L Dynamic Variable value field can contain a nested, qualified Dynamic Variable token, like this: {SI.TOKEN}.  Detailed instructions for this use case are provided just below at [Using SI.TOKENS to Supply LDA Content](#using-sitokens-to-supply-lda-content).

#### The Agent's Multi-Step Job Scripting can easily manage its own LDA content

Multi-Step Job Scripts execute multiple program calls and/or Control Language commands, all within a single job.  Although there are more features and flexible management of job results built into an OpCon Schedule of Jobs, the choice of using just one IBM i job master record within an OpCon Schedule to execute a Multi-Step Job Script makes LDA content management much simpler and more direct.

Ideas about steps for managing the LDA of a Multi-Step Job Script job can be derived from the following use case about [Using SI.TOKENS to Supply LDA Content](#using-sitokens-to-supply-lda-content).  

### Procedures for managing Operator Replay LDA Content

The Operator Replay Script driver job is a batch job that can have its LDA content updated by OpCon automation or by Captured Data Response Rules that can retrieve data from anywhere in the IBM i partition. The Script driver job does not include any built-in uses for the LDA.  But it is common among IBM i legacy software applications for the interactive jobs that are being automated to require attention to the LDA content.

#### How to set the LDA content of a Script driver job

If there is a use for the LDA, either among Script Steps or any linked Captured Data Response Rules, there are two methods for loading data into the Script driver job's LDA:

1. Script Step Captured Data Response Rules can execute commands within the Script driver job to retrieve data and load it into the driver job's LDA.
- Captured data values can first be stored into a Dynamic Variable.  For parallel processing, choose an appropriate instance qualifier to append to the Dynamic Variable name.
- Dynamic Variables referenced as {TOKENS} from a Response Rule command line can used their Function Codes to retrieve data from a DB2 database table or from a DB2 data area.
- Use one of these Dynamic Variable {TOKENS} (optionally qualified by a Dynamic Variable instance prefix) as the VALUE() parameter when another Response Rule command line executes a command such as this example to update the driver job's LDA:
```
CHGDTAARA DTAARA(*LDA *ALL) VALUE('{RSPRULTOKEN}')
```
In this example, the DTAARA() parameter can specify just portions of the LDA data area that should be updated.  For example, it's common among IBM i legacy software applications to store a Company ID or a Division ID in the LDA in order to isolate application processing to just one business unit that is registered in the application's database.

2. An OpCon job master record can load OpCon Properties or constant values into the LDA of a Script Driver job as it is submitted by the IBM i Agent, using the procedure documented under IBM i LSAM Configuration -> Extending the IBM i Call Command with Special Parameters -> [Setting an IBM i Job's LDA Value](/configuration/extended-call-cmd.md#setting-an-ibm-i-jobs-lda-value).
    - New with Agent version 21.1, this support for extending a Call command line may now also be used with Operator Replay jobs, where the Call command box is relabelled as the Script Name box.
    - Use this link to instructions for inserting the [Job Parameters Separator Character](/configuration/extended-call-cmd.MD#job-parameters-separator-character).


If the Script driver job's LDA has been updated, a Script Step or any connected Captured Data Response Rules will be able to read data from the Script driver job's LDA using a Dynamic Variable token that is configured with a Fuction Code of \*DTAARA.  The special rules for fetching LDA content are explained on the display of Dynamic Variable \*DTAARA function code maintenance.

However, instead of relying on the Script driver's LDA, it might be more obvious and easier to manage data sharing between the OpCon server and the IBM i Agent's Operator Replay script driver job by just using Type-V Dynamic Variables.  The Variables tab of the OpCon job master record can be used to pre-load one or more Dynamic Variables that will be set before the Script driver job is started.  Then the Script driver job can refer to the {TOKEN} form of the Dynamic Variable name in any Script Step master record fields that support token translation, or from within the processing of Captured Data Response Rules that are linked to Script Steps.  These variables can be directly isolated for parallel processing by appending an instance prefix to the Dynamic Variable name wherever it is used.

#### How to set LDA content for the virtual workstation job

In this discussion, references to Dynamic Variables of Type-V could be qualifed with multi-instance Dynamic Variable keys.  Techniques for building an interface between multi-instance qualified variables and the LDA are explored in the next topic.  This topic focuses on how the Operator Replay Script driver program can set the LDA content in the interactive workstation job that it manages.

##### Overview of Steps for Updating the LDA of an Interactive Job

Here is an outline of a portion of an Operator Replay Script showing a direct way it can interface with the interactive job:

```
Step   String to send                                    F-Key    Description

  10                                                              Include step(s) to navigate to IBM i 
                                                                  command entry

  20   CALL QCMD                                         ENTER    To reach a larger command entry 
                                                                  display, it may be necessary to  
                                                                  navigate to a plain IBM i Command 
                                                                  Entry display that will support the
                                                                  F11 function key.

  30                                                     F11      Change command entry to full screen, 
                                                                  supports 1024 characters

  40   CHGDTAARA DTAARA(*LDA *ALL) VALUE('{ANYTOKEN}')   ENTER    See comments below about the token
                                                                  {ANYTOKEN}

  50   DSPDTAARA DTAARA(*LDA) OUTPUT(*PRINT)~FE`         ENTER    This step is used just to prove the 
                                                                  interactive job LDA content

  60                                                     F3       ...or other action to exit Command
                                                                  Entry and resume application process.

```

The {ANYTOKEN} could have been loaded from any other software application in the IBM i partition or from OpCon [[Properties]] that could contain data from anywhere within the OpCon server network of machines and application connectors.  

The CHGDTAARA command can be configured to update only one portion of the LDA.  Multiple Script Steps could be used to update other portions of the LDA.  It's also possible that a single Dynamic Variable could use its entire 1024-character value string to assemble values in previously executed automation tools.  Third party software applications within the same IBM i partition can use the Agent's command SETDYNVAR to update Dynamic Variable content by wrapping this command within the Agent's utility command SMAGPL/LSAMCMD.

:::info Important
The only way to set or update the LDA assigned to a virtual workstation job that has been started by the Agent's Operator Replay script driver is to use Script Steps to navigate to an IBM i command entry line.  There is no path supported by IBM i by which a batch job such as the Operator Replay Script driver job can directly update the LDA content of another active job.  When applying OpCon automation techniques to existing software applications, the Operator Replay Script steps must be allowed to navigate to any display where IBM i commands can be directly entered.

In addition, the IBM i command entry display must provide sufficient data entry line space to accommodate the size of the value that will be returned when replacing the Dynamic Variable {TOKEN}.  In the case where the whole LDA is being updated at once, the command entry line must accommodate more than 1024 characters to fit the command illustrated in the example script step # 40.  Example script steps 20 and 30 show one way to do this.
:::

### Using SI.TOKENS to Supply LDA Content

First, remember that a local data area is always assigned to just one IBM i job, although it can be shared with other IBM i jobs - but only when one job uses the SBMJOB command.  Then the submitted job inherits the LDA content of the submitting job.  This is how the native IBM i LDA services function.

The IBM i Agent can take advantage of these rules because it uses the IBM i command SBMJOB to initiate jobs when it has received a Job Start request from the OpCon server.  The IBM i Agent has been using Type-L Dynamic Variables for several years to support various forms of Job Trakcing, including the relates ability to re-submit Captured Jobs.  This and other techniques for feeding LDA content to IBM i jobs that OpCon starts are summarized above under [The Functions of Type-L Variables](#the-functions-of-type-l-variables).

#### The technique for sharing multi-instance Dynamic Variables with the LDA during job starting

Type-L Dynamic Variables are not allowed to use variable instance qualifying prefixes.  But they can use Dynamic Variable token nesting.  This means that a Type-L Dynamic variable can have an instance qualified Type-V variable {TOKEN} as its value.  In this case, the parallel processing of instance-qualified variables is preserved right up to the point where the value of the instance-qualified variable replaces the nested token.  Then the Type-L Dynamic Variable token manages the value that replaced the nested token, and the final value character string is inserted into the LDA either directly or indirectly by the CHGDTAARA command.

When attempting to share multi-instance Dynamic Variables with a job's LDA via the Agent Job Scheduler, only variable instances SI. (OpCon Schedule Instance) and JI. (OpCon Job Instance) are supported.  This constraint exists because the IBM i Agent's Job Scheduler must be able to store these variable values into its own LDA <ul>before</ul> it executes the IBM i SBMJOB command.  There is no IBM i Job ID available until after the SBMJOB command is executed.  Even though the Agent submits a job on hold, the job has received its IBM i Job ID when the job is sent to a job queue, and after that there is no way to change the job's LDA content except from within that job.

It is possible for an IBM i job, such as a job executing the Agent's Multi-Step Job Scripts, to use IJ. and IU. prefixed Dynamic Variables as values to be added to the Script job's LDA.  This is possible because all of the Script Steps are being executed within a single IBM i job.  But this use case illustration is describing only the more complex path of events that enable the Agent's Job Scheduler server program to link multi-instance Dynamic Variable values to an LDA image that will be inherited by jobs that the Agent's Job Scheduler will submit.

Here is a summary of the steps required to enable this technique.

1. Pre-configure the Dynamic Variables using the maintenance function that appears on many of the LSAM menus, including sub-menu 3, option 6.

  - Example variable LDATESTSRC will be used in a JI. multi-instance form.  (An SI. instance could also be used, if the SI.variable will be shared by other jobs in the same OpCon schedule.)  The instances of variables cannot be established unless the unqualified Type-V variable master record exists.
```                      
 Variable name . . . . : LDATESTSRC     Sequence: 000                           
                                                                                        
 Variable type . . . . : V              L=LDA, V=general variable               
 Description . . . . . : Test data for nested var in Type-L                     
 LDA start pos, length : 0000  0000     LDA position, length for Type-L only    
 Char trim start,length: 0002  0012                /PGM+LIB, *HEX *DB2 *DTAARA  
 Value calc pgm/Fn Code:                          /*DATE *TIME *SYSVAL:FLD2=Name
 Value type (Char/Num) : C              C/blank=Char, N=Numeric ->(next page)   
 Current/default value : ABCDEFGHIJKLMNOPQRSTUVWXYUZ                         
```

  - Example variable LDATEST01 will be the Type-L Dynamic Variable used to build the LDA content.
    - The Value of the LDATEST01 variable will be a nested token:  {JI.LDATESTSRC} 
    - The OpCon Job Name component [[$JOB NAME]] of the variable instance keys could have been used, within quotes, instead of the spelled-out job name; this could be useful for OpCon multi-instance jobs.
```              
 Variable name . . . . : LDATEST01      Sequence: 001                           
                                                                                
 Variable type . . . . : L              L=LDA, V=general variable               
 Description . . . . . : Test LDA update trimming combos                        
 LDA start pos, length : 0003  0008     LDA position, length for Type-L only    
 Char trim start,length: 0000  0000                /PGM+LIB, *HEX *DB2 *DTAARA  
 Value calc pgm/Fn Code:                          /*DATE *TIME *SYSVAL:FLD2=Name
 Value type (Char/Num) : C              C/blank=Char, N=Numeric ->(next page)   
 Current/default value : {JI.LDATESTSRC.."Test DynVars at TXMMNG"."LDATEST01"}
```

2. Configure an IBM i batch job (for example) in the OpCon user interface.

  - The Pre-run command line can be used to establish the JI. instance of variable LDATESTSRC.  The OpCon job master Variables tab cannot be used for this type of maintenance because the instances that are optionally supported by the Variables tab must have access to the IBM i Job name - which cannot yet be determined at the time when the Agent Job Scheduler must pre-load its own LDA content.
    - If the value will be obtained during previous jobs of the same OpCon Schedule, then that value can be made available to the job needing the LDA content by supplying an OpCon Property \[[SI.Token]] as the Value of the SETDYNVAR command.

  Pre-run for OpCon IBM i Agent job master, as configured in OpCon Job Master for IBM i batch job.  The "$SCHEDULE DATE-FD" is configured to produced a data in YYYYMMDD format.  Notice that the Schedule Name must be enclosed in double quotes, even though it starts as an OpCon Property token.

  ```
  SETDYNVAR VARNAM('JI.LDATESTSRC.[[$SCHEDULE DATE-FD]]."[[$SCHEDULE NAME]]"."LDATEST01"') 
  VALUE('5678cdefghijklmnop')
  ```

  Pre-run for OpCon IBM i Agent job master, as received by LSAM Job Scheduler:

  ```
  SETDYNVAR VARNAM('JI.LDATESTSRC.20220927."Test DynVars at TXMMNG"."LDATEST01"') 
  VALUE('5678cdefghijklmnop')
  ```

3. The job that needs its LDA content set must use one of the three formats of the LDA( ) command line extension parameter, as documented under IBM i LSAM Configuration -> Extending the IBM i Call Command with Special Parameters -> [Setting an IBM i Job's LDA Value](/configuration/extended-call-cmd.md#setting-an-ibm-i-jobs-lda-value).
  - To prove this use case, a test job could execute the IBM i command DSPDTAARA and direct its output to a printed report.  The job's printed report will prove if the LDA content was successfully passed to the job.
  - For this use case example, format 2 of the LDA( ) Call command extension parameter could be used, as illustrated here:
  ```
  DSPDTAARA *LDA OUTPUT(*PRINT)|LDA(SI.LDATEST01)
  ```
  Notice that the name of the Dynamic Variable is not enclosed by the Agent's curly brackets {{ }} because the LDA( ) keyword is managing the retrieval of the variable value.


#### Agent documentation of the multi-instance Dynamic Variable for this use case

Research about the behavior of Dynamic Variable value setting and {{TOKEN}} replacement results is stored in the Agent's multi-purpose "Submit job log," access from LSAM menu 6, option 5, log viewer 4.  This log will normally contain many different types of log entries and also entries from many different jobs.  Log entries can be isolated by using F15=Subset, so that only Dynamic Variable entry codes will be included. In many cases it could be useful to use F2=Subset by JobID, so that entries belonging to just one job will appear in the list.

For the purpose of documenting this use case, the other very important resource for Dynamic Variable research is the alternate list views of the "Maintain dynamic variables" menu function can be used.  This menu function appears on many differe LSAM menus because Dynamic Variables are used by most of the LSAM automation toolkit features.  An example location is LSAM menu 3, option 6.

From the list of Dynamic Variable master records, press either F7=Sched Inst (Schedule Instances:  SI. or UI.) or F8=Job Inst (Job Instances:  JI. or IJ.).  These list variations can also be subset by F2=choose instance subset, where a list of OpCon and/or IBM i LSAM Job Names can be searched to find and then select a single Job ID that will be used to isolate the Dynamic Variable instance history records.

For this use case, here is an example of a JI.instance variable, showing what its value was at run time.  On the line for "Record type", notice on the far right the blue (in a color display) prompting text that says "(F15=I-keys)."

```
 LSAVARR2                 Display Dynamic Variable                    10/14/22  
 USERNAME                                                             16:49:12  
                                                                                
 Variable name . . . . : LDATESTSRC     Sequence: 000                           
 Record type . . . . . : I              blank=master, I=instance (F15=I-keys)   
 Multi-instance type . : JI             JI/SI=Job/Skd Inst, IJ/IU=IBM Job/Unit  
 Variable type . . . . : V              L=LDA, V=general variable               
 Description . . . . . : 029570/SMANET/TXMMNG                                   
 LDA start pos, length : 0000  0000     LDA position, length for Type-L only    
 Char trim start,length: 0003  0010                /PGM+LIB, *HEX *DB2 *DTAARA  
 Value calc pgm/Fn Code:               *LIBL      /*DATE *TIME *SYSVAL:FLD2=Name
 Value type (Char/Num) : C              C/blank=Char, N=Numeric ->(next page)   
 Current/default value : 5678cdefghijklmnop                                     
                                                                                
```
Using (F15=I-Keys) from the display above produces this detail that proves the qualification of the multi-instance Dynamic Variable.
```
 LSAVARR5W                   Multi-Instance Keys                      10/14/22  
 USERNAME                      JI. LDATESTSRC                         16:53:36  
                                                                                
 IBM i Job ID :       //                      Date: 0000-00-00  Time: 00.00.00  
 Schedule Date: 20220927                                                        
 Schedule Name: Test DynVars at TXMMNG                                  
                                                                                
                                                                                
                                                                                
 SAM Long Name: LDATEST01                                                       
                                                                                
 SAM Job Nbr  :                                                                 
 Inst template:                                                                 
 JI.<VARNAME>.<SkdDate>."<SkdName>"."<SamLongJobName>".<SamJobNbr>              
  (optional +) ."<iJobName>".<iUserName>.<iJobNbr>.<iJobDate>.<iJobTime>        
 Instance keys:                                                                 
 JI.LDATESTSRC.20220927."IBMiGAL Test DynVars at TXMMNG"."LDATEST01"            
                                                                                                                                                                                                                     
```
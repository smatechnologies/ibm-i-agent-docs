---
sidebar_label: 'Multi-Step Job Scripting'
---
# Multi-Step Job Scripting
## Multi-Step Job Scripting

This feature of the IBM i Agent for OpCon provides a command named STRMLTJOB (Start Multi-step Job) that makes it possible for a single IBM i batch job on an OpCon schedule to execute multiple IBM i Control Language (CL) commands and/or program calls, without requiring that Control Language programs be constructed and compiled. This feature also supports execution of CL commands from source members, in addition to its primary function of executing collections of Script Steps that are defined using the LSAM's data entry functions. IBM i source file members can be used for individual script step commands or to contain the entire script that will be executed.

This feature is important to OpCon users for reasons that include:
- Not every user site has the IBM licensed program development tools, or their use is restricted while non-compiled scripts are allowed.
- Individual program calls that are configured as separate jobs on an OpCon schedule cannot easily share common resources, including especially the unique IBM i temporary job library called QTEMP, where critical application values may be stored and shared among separate steps within a single job.
- This feature provides a convenient means for converting multi-step procedures from other automation environments.
- The STRMLTJOB script driver program supports a restart-at-label capability which can be applied to the LSAM scripts master file, or to CL source members that contain the commands the STRMLTJOB job will execute. For IBM i CL source members, restart is supported at either existing TAGS:, or at the actual source member sequence number of any line.
- Jobs controlled by the STRMLTJOB command have their progress displayed in the OpCon list of jobs, wherever the current job status shows. The script driver sends the latest step LABEL or CL script TAG: value as part of the displayed job status information. Job label messages are stored as OpCon job detail messages under the Job Information tab, and the time stamp logged with each message can be used to calculate how much time has passed between each script step label (or CL source member TAG).
- LSAM Dynamic Variable tokens can be used in any script step or any CL source member. (The tokens can take the place of Control Language Declare (DCL) variables, which are not available unless the CL source is compiled into a program.)
- Very long CL statements are supported by LSAM script steps by using an IBM i source file member to store the long command line.
- Jobs controlled by the STRMLTJOB command have implied convenient access to any of the LSAM software commands included with the OpCon IBM i Agent product. This means that LSAM commands can be used in a multi-step job without extra steps to manage the job's library list.

## Instructions for Configuring Multi-Step Jobs

The STRMLTJOB command may be used immediately after this feature is installed with the IBM i LSAM software. There are no special LSAM configuration requirements, but there are some critical IBM i authority considerations.

### Requirements Before Using the STRMLTJOB Command

#### IBM i Authority Requirements

It is important, as always, to remember that LSAM scripting tools such as the STRMLTJOB command and the script steps master file are very powerful, so their IBM i object authority must be carefully managed. The command, its programs and the master files and log file are all installed with \*PUBLIC authority revoked. These objects are owned by the SMANET user profile. SMA recommends using the LSAM object authority management tool (LSAM sub-menu 9, option 8) to grant individual authorities to user profiles that do not already have authority to use objects owned by SMANET.

Similar considerations apply to any IBM i source files that will be used to store Control Language command lines that will be executed by the STRMLTJOB script driver program.

Unlike some other LSAM features, the STRMLTJOB command processor program does not run under the adopted authority of the SMANET user profile. LSAM administrators could choose to modify the authority attributes of the command driver program, STRMLTJOBC, using the LSAM object authority management tool, so that this command driver program does run with the adopted authority of the SMANET user profile. However, the LSAM software is not distributed with this attribute because this feature and its script steps file are very powerful and they have no built-in authority constraints.

:::danger
It is solely the user's responsibility to properly manage the IBM i object authorities for this feature, and anyone using this feature accepts all risks and liability for its use.
:::

### Script Application Authority Requirements

Unlike some other LSAM features, the STRMLTJOB script driver program does not run under the adopted authority of the SMANET user profile. Therefore, the script driver program does not have the \*ALLOBJ authority that is typically associated with the SMANET user profile. Instead, when OpCon submits a job that runs the STRMLTJOB command, it is the user profile specified in the OpCon batch job for IBM i that establishes the authority of the script driver program. This is the same as when an OpCon batch job for IBM i will perform a single program call.

The user specified for the OpCon job where the STRMLTJOB command executes must, as described above, have sufficient authority to use the LSAM components required by the STRMLTJOB command. These components can be listed using the LSAM REFFLOW command, and this software analysis tool should be used to assure that no new features have been added to the command since this document was published. As a guideline, here are the object authorities required just to use the original STRMLTJOB
command:

- SMAGPL/STRMLTJOB (*CMD): \*USE authority

- SMAGPL/STRMLTJOBC (*PGM): \*USE authority

- SMAPGM/MLTJOBR00 (*PGM): \*USE authority

- SMADTA/MLTJOBF00 (*FILE): Object \*USE authority and READ data
authority

  -  Logical files depending on this physical file must also be set similarly

- SMADTA/MLTJOBF10 (*FILE): Object \*USE authority and READ datathority

  - Logical files depending on this physical file must also be set similarly

- SMADTA/MLTLOGF00 (*FILE): Object \*USE authority and ADD data authority

- SMAGPL/SMAMSGF (*MSGF): \*USE authority

- Any QCLSRC (or other named) source file: Object \*USE authority and READ data authority.

In addition to the STRMLTJOB command tool set, the job's user must have the usual authorities to the IBM i job description, job queue and output queue (if required) that are used to start and manage the job's execution.

The job's user must have authority to use any of the IBM i commands that are included in script steps and/or source file members that contain commands to be executed by the STRMLTJOB script driver. 

Finally, the job's user must have authority to use any third-party software applications whose commands, programs, files and other objects will be used by the tasks initiated by script steps or by CL source member commands. This concept is usually assumed for any job that OpCon starts, but this reminder is necessary because certain other LSAM automation tools may run under the authority of the SMANET user profile, which typically has \*ALLOBJ authority. The STRMLTJOB command does not automatically grant authority to use third-party software. In many cases a good solution is to use the same user profiles that were already configured for use with the third-party software application, however, these user profiles will usually require that special authority is granted for them to use the STRMLTJOB command objects (listed above).

### Configuring Scripts for the STRMLTJOB Command

Setting up a multi-step IBM i job for the STRMLTJOB command only involves the following simple steps:

1. Navigate to the IBM i LSAM sub-menu 5: Restricted Mode and Multi-Step Job menu, and then select option 5: Maintain multi-step job scripts.
2. Define a Script master record in the LSAM database.

**- then -**

3. Set (leave) the Script master record Type value to "STEPS".
4. Add Script Steps to the LSAM Steps master file. 
  - Type option 1 next to a Script master record to work with its Step records.

**- or -**

3. Set the Script master record Type value to "SRCMBR".
4. Add a new source member to an IBM i source file.
5. Edit the source member to add one or more Control Language commands.

**- Next: -**

1. *(Optional)* Add a predefined LDA (IBM i job Local Data Area) image that will be used to set the script job's LDA content as the job starts. The whole 1024 characters of the initial LDA image can be configured using a function key from the Multi-Step Script maintenance program (refer to [Multi-Step Job Screens and Windows](../restricted-mode/multi-step-screens.md) below).
    a.  LSAM Dynamic Variables of Type-L can also be configured to set or change the content of the LDA, after the initial LDA image is loaded, in order to adapt the LDA content to special requirements for each execution of a script. Use the Script Name as the name of the Type-L Dynamic Variable, and assign sequence numbers as necessary if more than one LDA update must be stored in Dynamic Variables.
2. Add an IBM i batch job to an OpCon schedule, specifying the command SMAGPL/STRMLTJOB in the Call information box and naming the Script master record. Detailed information about the STRMLTJOB command parameters is offered under [Multi-Step Job Screens and Windows](../restricted-mode/multi-step-screens.md).
3. After a script is executed, LSAM log entries documenting the results may be viewed using a menu option, or if the command option was set, script log messages will also be added to the IBM i job log. Log entries also report when script step labels are encountered.

## More Information about Preparing Multi-Step Jobs

There are some additional preparations that affect how the script steps will execute and how they can be monitored by OpCon and diagnosed in case of a script failure.

### IBM i Job Description

The OpCon job master must specify the job description that is required for any third-party application programs that will be executed by the script steps, in part to control the library list that will be in effect for the job.

The STRMLTJOB command performs its own built-in management of adding the LSAM libraries to the end of the job's library list, at run time, so these libraries do not need special consideration in the job description.

### JOBTYPE Command Parameter

When using the STRMLTJOB command in test mode, that is, when manually executing this command outside of the control of OpCon, be sure to change the JOBTYPE parameter of the STRMLTJOB command to a value of "T" which means "Test." The default value is "O" which means that OpCon is starting the command. This option prevents useless messages from being sent to the OpCon server. 

### OpCon Job Status

The script driver program that is started by the STRMLTJOB command, when it is notified by the JOBTYPE parameter that OpCon is in control of the job, will send signals to OpCon each time it encounters a new LABEL (on a Script Step) or a new TAG: (in a Control Language source member).

- LABEL or TAG name will appear in the OpCon job status field along with the current job status code.
- An OpCon Detailed Job Message will be added to the messages list each time a new LABEL or TAG: is encountered.
  - Using a right mouse click on the OpCon job, select Job Information, then click on the Configuration tab to reveal the Operations Related Information tabe.  Within the window under this tab there may appear a line for Detailed Job Messages that can be expanded to see the Script job status messages.
  - Each Detailed Job Message will include a time stamp, indicating when processing for the LABEL or TAG value started. The time stamps could be used (manually) to compute the amount of time required to complete each job interval between the LABELs or TAGs.
  - Putting a LABEL on each Script Step, or a CL TAG: on each source member command line, will provide the finest level of detail about the progress of the OpCon job.

### Restart Capability and ON_RESTART (or ON-RESTART) Label

Another function of a LABEL or a TAG is to enable the restart capability of the STRMLTJOB command (using the RSTLABEL parameter).

- When the RSTLABEL parameter is not left at its default value of \*FIRST, the script driver program will scan the script or source member for the matching LABEL or TAG. It will skip all steps or source lines before the restart point and then start execution fromthe named LABEL or TAG.
  - If no match is found for the specified restart value, then the job will end abnormally with a message that declares this error.
- When a source member is specified on the Script master record, the RSTLABEL value can be a numeric value that matches the source member sequence number assigned to any record in the member.
  - To support this capability, the TAG values for source members must not start with a digit; they must start with a non-numeric character (an alphabetic letter is preferred over special characters).
- **IMPORTANT**: The user is responsible for understanding which LABELs or TAGs can be used effectively as restart points for a multi-step job. OpCon does not know anything about the application logic. There could be steps in a job requiring that a previous step must always be executed just before that step. In this case, the correct restart point would not be at the failing step, but at the previous step -- so it must have its own LABEL...or the use of labels could be managed in a way to indicate only valid restart points.
  - SMA recommends that the OpCon job Documentation should contain instructions about what are valid restart points in a script.
- Restarting a script at any point other than the \*FIRST step requires manual maintenance to the OpCon Daily job master record. The RSTLABEL parameter value would have to be changed manually.
  - There is no automatic restart logic in the STRMLTJOB driver program, such as using the last logged LABEL or TAG value, since that program does not have any information about which LABEL or TAG values are valid restart points.

### ON_RESTART Special Label

A reserved name of "ON_RESTART" may be put into the LABEL field of one step master record. When this special label value is used, it is good practice to place it as the first Step in a Script, before other labels, however, the Script driver program is able to locate this reserved label value regardless of its position among the Script Steps.

An older form of this label used a hyphen instead of an underscore character: "ON-RESTART". This older format is still supported for Script Steps (only); however, the new standard is to use the underscored "ON_RESTART" format. (This underscore format is the preferred format for CL source to pass source edits, although the ON_RESTART label is currently not supported for CL source members -- yet, SMA may introduce support for ON_RESTART logic in CL source members in a future release of the software.)

The purpose of the ON_RESTART label value is to support job setup logic that must be performed when a Script is being restarted. This is an optional convenience tool that is provided, since the restart logic would normally direct the Script driver program to start immediately at the named RSTLABEL value. The Script driver program will look for the Step that has this label whenever a Script is started with the RSTLABEL parameter set to a value other than \*FIRST.

The ON_RESTART label may be used only once in a Script. If there is more than one Step record that uses this label value, the Step record with the lowest sequence number will be used, and any other Steps with higher sequence numbers will be ignored.

The ON_RESTART step will not be performed when a Script is started at the \*FIRST Step.

When a restart is being requested, the Script driver will find and perform the ON_RESTART Step command as its first operation, then it will locate the RSTLABEL Step and resume Script processing, step-by-step, from that label.

Care must be taken when including an ON_RESTART label in a Script, especially if the Script would ever be called from another Script, using a sub-call to the STRMLTJOB command. If the RSTLABEL parameter on that command specifies a Step label value other than \*FIRST, the Script driver will perform the ON_RESTART Step of the sub-script before branching to the requested label. Therefore, any Scripts that will be used in the sub-script mode, as if they were subroutines for the main Script, should probably not include an ON_RESTART Step label. 

An ON_RESTART Step can take advantage of any of the Step record capabilities. If restart logic requires complex logic, or if multiple commands must be executed, then a separate utility Script could be designed that would be called from the single ON_RESTART Step of the primary script using the STRMLTJOB command as the command to execute from the ON_RESTART Step record. (Refer to the discussion of Script Branching capabilities.) If the ON_RESTART Step (and/or any sub-script it calls) should fail, the Fail option flag for this Step record will decide if the Script should fail or should ignore the error and continue. It is not possible to register an ON_ERROR Step in the Script driver program before the ON_RESTART Step is executed, therefore, if an ON_ERROR process is desired, it should be included as part of the proposed utility sub-script that will actually perform the restart setup steps.

:::tip
An ON_RESTART Step record is allowed to use the SMAGOTO or SMAFAILJOB commands.  When using the SMAGOTO command, it can become more likely that a looping condition might be accidentally configured within a Script, or if two Scripts might call each other.  To help protect against creating an eternal looping condition, use the Script list option 9=Flow chart, which can detect some (but not all) kinds of loops.  The other protection against looping is managed bythe Script Utility Configuration function (LSAM sub-menu 5, option 7).  Set the "MLGJOB step loop limit" value to prevent looping from occuring more than this number of times before the Script driver program will force the job to end because it detected a never-ending looping condition. See the [Multi-Step Job Screens and Windows: Script Utility Configuration](./multi-step-screens.md#script-utility-configuration) for more information.
:::

### Job Status Logging

The STRMLTJOB script driver program always writes status and error information to the Multi-step Job Log file (MLTLOGF00), which can be viewed from the LSAM sub-menu 5, option 6.

The STRMLTJOB command parameter JOBLOG( ) is used to enable (Y) or disable (N) the function of writing status and error messages to the IBM i job log. When set to "Y" = Yes, this option makes script job details visible in the OpCon Job Output Retrieval function (a view of the IBM i job log report).

### LSAM Dynamic Variables

The script driver program supports translating Dynamic Variable tokens to their run-time values, regardless of the step command source. This means that Dynamic Variable tokens can be used in the script step command field (as well as in the qualifier fields of Compare Reference and Compare Data), and they can be used in any source file member records -- both in a single source member that contains the entire, multiple script steps, as well as in a source member that contains a long command for a single script step master record.

### Step Qualifiers

Individual script steps may optionally include a comparison rule that is used to decide whether a step should be executed or skipped.

- A Compare Reference field is the first part of a qualifying rule. This field may contain a character string and/or a Dynamic Variable token.
 
- A Compare Data field is the second part of a qualifying rule. It is compared to the reference field to decide if a step will be executed or skipped. A character string and/or a Dynamic Variable token may be used in this field.

- The Comparison Rule uses a Boolean operator or the English letters that represent Boolean operations to govern how the Data is compared to the Reference.
:::info Example
  In this formula: A > B (if A is greater than B)

  ...the letter A represents the Compare Reference, and

  ...the letter B represents the Compare Data.
:::

  - The terms "Reference" and "Data" could be confusing, but the program works using a comparison model that matches the appearance of the script step maintenance screen, where the Reference field appears before the Boolean rule, and the Data field appears after the Boolean rule. This model also matches the appearance and function of the Response Rules feature that supports many LSAM functions.

- If both the Reference and the Data fields are (or tokens translate to) both numeric, then the script driver program will use numeric comparison logic, utilizing giant numeric fields that hold up to 63 digits, where up to 5 of these digits can be decimal places.

- This method means that numeric values do not have to exactly match in length or number of characters, as is the case when non-numeric values are compared.

- When using an IBM i source file member for the script steps, there is no support for qualifying logic. The script driver program does not currently support interpretation of the IF COND() Control Language programming command.

### Script Branching

The script driver program provides various methods to redirect the logical flow of activity within a single multi-step job. One script can request to run another script or it can transfer control to the other  script, and the script driver can be directed to any LABEL or TAG within the same script or within another script.  

:::tip
 When using Script Branching it can become more likely that a looping condition might be accidentally configured within a Script, or if two Scripts might call each other.  To help protect against creating an eternal looping condition, use the Script list option 9=Flow chart, which can detect some (but not all) kinds of loops.  The other protection against looping is managed bythe Script Utility Configuration function (LSAM sub-menu 5, option 7).  Set the "MLGJOB step loop limit" value to prevent looping from occuring more than this number of times before the Script driver program will force the job to end because it detected a never-ending looping condition. See the [Multi-Step Job Screens and Windows: Script Utility Configuration](./multi-step-screens.md#script-utility-configuration) for more information.
:::

These are the methods used to support Script brancing.  Each method is described in detail in the next document sub-topics.
- **Subroutines**: One Script can call another Script, and then allow the job to return control to the previous Script after the sub-Script completes.
- **Branch-To a Label within a Script**: The Script driver can redirect by Steps to skip to a Step Label that is assigned to a previous or later Step within the same Script.
- **Branch-To another Script**: One Script can turn control over to another Script, and the other Script will not return control back to the calling Script.
  - When one Script calls another Script, a Label can be specified as the target within the called Script, possibly skipping some steps in the called Script.

These are the Agent IBM-i-style commands that control the type of branching:
- **STRMLTJOB**:  An active Script is allowed to use the STRMLTJOB command to redirect processing to another Script.  When this command is used by another Script, the Script driver program will return conrtrol to the calling Script, the same as if the SMASUBR command was used.  The only difference between these two commands is that the STRMLBJOB command supports the option of specifying a different LSAM Environment and/or SMAGPL libraray name.
:::warning
Do NOT use the ENV( ) and GPL( ) parameters of the STRMLTJOB command when executing this command from another Script, since LSAM job control would be disabled if an attempt is made to switch to another LSAM environment within a job.
:::
- **SMASUBR**: The SMASUBR command tells the Script driver job to begin executing Steps from a different Script.  If the RSTLABEL( ) parameter is specified, then the called Script will skip to that Label within the called Script.  After the called Script completes execution, control is returned to the next Step in the calling Script.
- **SMAGOTO**: The SMAGOTO command works like the SMASUBR command, except that when the called Script completes execution, control is not returned to the calling Script and the Script driver job will end.
- **CL GOTO**:  The Control Language GOTO command will be recognized and processed by the Script driver job that is reading a CL source member and executing each CL command as a separate step.  Use of the CL GOTO command is discussed in more detail in the following sub-topics.

#### Subroutines

One script can request execution of another script, and then control will be returned to the next step within the original script. To perform this type of branching, specify either the STRMLTJOB command or the SMASUBR pseudo-command as the command to execute from a scrip step (or from a source member command line). Using this technique, there is no limit the level of nested scripts.

- The STRMLTJOB command will always reset the job's LDA (IBM i Local Data Area) content if there is an LDA image registered with the SCRIPT name specified in the STRMLTJOB command. It also finds and applies any Type-L Dynamic Variable changes to the LDA after that initial image is loaded. To prevent changes to the original LDA assigned to a script job, always use the SMASUBR pseudo-command instead for implementing subroutine logic.

- The SMASUBR pseudo-command works like the STRMLTJOB command when used within the currently executing script. That is, it causes another script to execute, and then control is returned to the primary script steps. But the SMASUBR command does NOT affect the content of the job's LDA. The SMASUBR pseudo-command is preferred for implementing subroutine logic, unless it is specifically desired to change the job's LDA, in which case the STRMLTJOB command can be used, as described above.

#### Branching within a Script

The Script logical flow can jump ahead to a named LABEL or TAG, or it can loop back to a previous LABEL or TAG.

- When the script driver program detects that a script has looped back to a previous LABEL or TAG more than once, a warning message is added to the script log file (and, optionally, to the job log). It is possible to create a script that could loop infinitely -- that is, until the IBM i job log gets too full and causes the program to pause on an error message.
- SMAGOTO: This pseudo-command is used in the command line of a script step to tell the script driver program that it should branch to the specified script step LABEL. A value of "*CURRENT" is used for the SCRIPT parameter of the SMAGOTO command to limit the LABEL search to anywhere in the current script.
- CL GOTO: In a Control Language source member, the IBM i GOTO command is used to specify a TAG: as the branching destination. The script driver program recognizes the IBM i GOTO command and it performs the branching logic in a manner similar to a compiled CL program.

#### Branching to Another Script

The SMAGOTO pseudo-command supports a SCRIPT name parameter. When this parameter is not left at its default value of \*CURRENT, the script driver program will start executing the named script, and it will abandon the current script.

- The SMAGOTO pseudo-command can turn control over to another script that uses a source member for its CL commands, however, there is no command that can be used in a source member to turn control over to another script.
  - SMA may decide in the future to also support the LSAM pseudo-command SMAGOTO from CL source members, but it is not supported at this time.
- CL source members CAN also use the STRMLTJOB command to start execution of another script, but when that script completes, the script driver will return to the original source member, looking for the next source line to execute.

### Script Step Fail-Option Flag

A flag field on the Step master record tells the script driver program how to react if the step's command execution fails.

A value of "F" indicates that the script job should be forced to fail, so that it will also show as a failed job on the OpCon schedule. An error code of **MLT0101** indicates this type of forced failure. When a script job fails, if the JOBLOG parameter was set to "Y", then detailed information messages from the script driver program can be viewed in the job log report using the OpCon Job Output Retrieval function.

A value of "I" indicates that the script driver should ignore the error and continue processing the next script step. The ON_ERROR registered command (if any) is still executed when a step command error is ignored, since this makes it possible to trigger some external action, even if the script is allowed to continue.

### Step Active/Inactive Flag

A flag field on the step master record can be used to temporarily disable any step record. When this flag is set to a value of "I", the script step record will be ignored by the script driver program. The flag must be left blank or set to a value of "A" to mark the step master record as active.

An inactive step master record will not be used for any purpose, except for its LABEL value. The LABEL on an inactive step record can still be used to support branching and script restart logic. To disable the LABEL of an inactive step record, update the step record with a blank value in the LABEL field.

### ON_ERROR Special Label

A reserved name of "ON_ERROR" may be put into the LABEL field of a step master record. When the script driver encounters this LABEL value, it stores the command, any qualifying rules, and the Fail-option flag for this command into a program register. As indicated above, whenever a step command fails and the failure is not ignored, the script driver will then execute whatever is the current ON_ERROR registered command.

An older form of this label used a hyphen instead of an underscore character: "ON-ERROR". This older format is still supported for Script Steps (only); however, the new standard is to use the "ON_ERROR" format. This underscore format will also be recognized when it appears as a TAG: in a CL source member.

The ON_ERROR reserved LABEL value can be used many times. Each time a step contains this LABEL value, the script driver ON_ERROR register values are changed. This makes it possible to change the response of the script driver to be different for errors in any one or any group of Steps, depending on the phase or progress of the job.

When the last registered (previous) ON_ERROR command value should be disabled, the special value of "*NONE" can be placed in the Command field of a new Step record that has the ON_ERROR step label. This technique prevents a customized recovery procedure from being executed for a different step. However, it may be better practice to replace that custom recovery procedure with a generic error processing command, so that there is always some kind of ON_ERROR catch-all routine standing by in case of any error during script step processing.

It is actually possible to use the ON_ERROR reserved LABEL value in the SMAGOTO pseudo-command, in which case the script would jump ahead to the next ON_ERROR LABEL found in the Script (or, if none are found looking ahead, the Script driver will start over from the beginning of the script and find the first occurrence of an ON_ERROR LABEL). However, this would not be good practice because the ON_ERROR value can be used many times, and there is no control over future changes to the number and location of steps that use this reserved LABEL value.

If the qualifying rule of the currently registered ON_ERROR Step is not met, then the ON_ERROR registered command will not be executed. The failure to qualify is marked by a message in the script activity log (and, optionally, the job log).  But Script processing will continue because it assumes that the ON_ERROR Step must have been useful only upon certain special conditions.

If the ON_ERROR registered command fails during its execution, the ON_ERROR registered Fail Option flag will be used to decide if the script job should fail, or whether the script driver should ignore the ON_ERROR command failure and continue any other processing that remains.

The ON_ERROR registered command can request that a complex set of instructions be executed if the command is a STRMLTJOB command that calls another Script. (This is the sub-routine technique described above, where the Script driver program control will return to the original Script after the secondary script has completed execution.) Results of a sub-routine Script can be returned to the primary Script using an LSAM Dynamic Variable, which could then be used by the primary Script to govern its subsequent behavior. For some error conditions, the SMAGOTO pseudo-command could be used instead, in order to redirect the Script driver to continue processing with a completely different Script.

Another useful technique for the ON_ERROR registered command might be to specify \*CURRENT as the Script name and some Step label in the SMAGOTO pseudo-command, which would redirect the script logic to a segment of the same Script where multiple steps could be dedicated to managing error conditions. The other Steps in the Script can be configured to flow past the reserved LABEL location in the Script by executing a SMAGOTO command that branches to a LABEL farther ahead in the script.  (Many programming experts recommend that this kind of leap-frog program logic is poor practice, which suggests that using another Script in subroutine mode would be the preferred method for ON_ERROR response logic.)

Note that the Step Active/Inactive Flag (described above) would cause the script driver program to ignore a Step record that contains the reserved ON_ERROR LABEL value. That is, the ignored Step record that has an ON_ERROR label would never have its command registered by the Script driver program.

:::tip
 An ON_ERROR Step record is allowed to use the SMAGOTO or SMAFAILJOB commands. When using the SMAGOTO command within an ON_ERROR Step label it can become more likely that a looping condition might be accidentally configured within a Script, or if two Scripts might call each other.  To help protect against creating an eternal looping condition, use the Script list option 9=Flow chart, which can detect some (but not all) kinds of loops.  The other protection against looping is managed bythe Script Utility Configuration function (LSAM sub-menu 5, option 7).  Set the "MLGJOB step loop limit" value to prevent looping from occuring more than this number of times before the Script driver program will force the job to end because it detected a never-ending looping condition. See the [Multi-Step Job Screens and Windows: Script Utility Configuration](./multi-step-screens.md#script-utility-configuration) for more information.
:::

### Labeled Steps with No Command

It is possible to create a Step record that has no command to execute. This allows Step records to be created that exist only for the purpose of establishing a LABEL location in the Script. This technique would be useful if a unique LABEL record is located just before a new ON_ERROR Step.  When a Script  branches directly to the new LABEL location, a new ON_ERROR command could be registered before mainline Script logic resumes at the new segment of Script logic.

Of course, if there is no command on a Step record, then the qualifier fields have no use, and there is no effect of the Fail Option or Active/Inactive flags. For more information about the management of LABELs on an Inactive record, refer to [Step Active/Inactive Flag](../restricted-mode/multi-step-scripting.md#step-activeinactive-flag). However, the Description field would be useful for describing why the Step record exists with a LABEL and no command.

### Constraints when Using Source Members

IBM i source file members can be used either as an entire script of commands to be performed, instead of using the LSAM Script Step master records, or they can be used to contain a single, long command instead of the built-in command line of a Script Step record.

When using source file members with the STRMLTJOB Scripts or Steps, there are some limitations. The source records can contain only Control Language (CL) commands, comments, and TAGS:. Most forms of CL commands that are used for managing the logic of CL programs are not supported, except that the Script driver program will recognize the GOTO command, and it will attempt to relocate the Script driver program to the source line that contains the TAG value specified in the CMDLBL parameter of the GOTO command.

Following are some specific capabilities and limitations when using source file members for Script steps:

- CL commands can be continued into multiple source member records, using the IBM i convention of ending a line with either a plus sign (+) or a hyphen (-).
  - The script driver program always truncates trailing spaces of source member lines, but it does not trim off leading space characters. Therefore, authors of CL source members can use the leading spaces of a source record, or leave no spaces, depending on how the multi-record command should be reconstructed into the full command string.
  - When the line ends in a plus sign, the script driver program will insert one space character in place of the plus sign, then it will append the contents of the next source record to the command line that is being assembled.
  - When the line ends in a hyphen, the script driver program will append the next source record at the exact location where the hyphen was located.
- Comments in CL source records begin with /\* and end with \*/. Comments may span more than one source record, although the incomplete comment record must end with a plus sign (+) or a hyphen (-). The script driver will ignore comments and will continue to search the source member records until the end of a comment is found. Any non-blank characters that occur before or after a comment in a source record will be considered as part of a CL command, except that TAGS: will always be handled as TAGS: (as long as they occur outside of the comment control characters).
- CL program logic commands, such as PGM, IF, ELSE, ENDDO, CALLSUBR (and SUBR, ENDSUBR), MONMSG and ENDPGM commands, are not recognized by the script driver program. If they exist in the source member records, they will create a failed command execution error and the script job will fail.
- CL programs that are being converted to scripts that require conditions be tested should be manually converted to LSAM Multi-step Script Step records, where the qualifier fields of the Step record can be used to test conditions and control the execution and flow of the script steps.
- The CL programming variable field management is not supported by the LSAM script driver. The DCL (Declare) statement cannot be used, and no CL variables (which begin with &) can be used.
- DCL statements can be replaced in Script Steps or in CL source records by initial step records that execute the LSAM SETDYNVAR command. This command can be used to create and define character strings up to 128 characters long, or numeric values that include up to 63 digits (any of which can be to the right of the decimal point).
- CL program variables can be replaced by LSAM Dynamic Variable tokens (such as {DVTOKENNAME}). Dynamic Variables are supported anywhere in CL source records, and they are also supported in Script Steps, in the command field as well as the Compare Reference field and the Compare Data field.
- Remember that since there is no support for IF COND( ) statements in the CL source records, there is no method by which Dynamic Variable tokens can be tested or compared within CL source members. To perform Dynamic Variable token value testing, use the qualifier rules of Script Step records.
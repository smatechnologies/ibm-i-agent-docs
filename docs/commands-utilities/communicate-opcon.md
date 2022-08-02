---
sidebar_label: 'LSAM Commands to Communicate with OpCon'
---

# LSAM Commands to Communicate with OpCon

There are IBM i commands installed with the SMA Agent for IBM i that can be used to send critical job information to OpCon. Some of the purposes for this kind of communication include:

- Update the IBM i job status that is displayed on OpCon views of scheduled jobs, to show job step progress or an error status.
- Add Detailed Job Messages to the history of any single IBM i job started or tracked by OpCon, typically to provide an explanation of unusual job behavior.
- Trigger LSAM Feedback events that may have been configured on a per-job basis in OpCon.

This section of the topic provides a detailed explanation and instructions for using the LSAM Commands that communicate with OpCon, listed at the start of the Commands Table, above.

:::tip
Most commands that communicate with OpCon must originate from within an IBM i job that was started by OpCon, or is being tracked by OpCon. The LFEEDBACK command is enhanced with a JOB() parameter that supports naming a job that is monitored by OpCon.
:::

## LFEEDBACK - Send LSAM Feedback

LSAM Feedback is a feature of OpCon jobs that defines Event commands to be triggered when certain text string values are received. OpCon uses Field Codes that are reserved in its database for each different type of Agent or Connector that is allowed to use LSAM Feedback triggers. The Agent that is executing a job can generate a job status report at any time and append one or more LSAM Feedback Field Codes to that job status message.

The IBM i LSAM can execute the LFEEDBACK command from Response Rules linked to SCANSPLF Scan Rules, to Operator Replay Script steps or to Message Management Parameters. This command can also be executed from any other access to an IBM i command processor, as long as the job fits one of the following profiles. It is important to properly manage the JOB() parameter according to the job's environment.

- The job was started by OpCon or is tracked by OpCon: can use JOB(*) for the current job, or use JOB(123456/USERID/JOBNAME) to reference other jobs.
- The job was not started by OpCon, but the job uses the LSAM environment library list: must provide a specific Job ID as JOB(123456/USERID/JOBNAME).
- The job was not started by OpCon, and the job does not use the LSAM environment library list: use the LSAM command-hosting command SMAGPL/LSAMCMD and put the LFEEDBACK command into the hosting command's CMD() parameter, and must provide a specific JOB ID, using the following representative syntax:
```
SMAGPL/LSAMCMD CMD('LFEEDBACK TEXT(''Feedback text'') 
JOB(123456/USERID/JOBNAME)')
```

When a job using this command was started or tracked by OpCon, then the command's JOB( ) parameter can be left set to its default value of (\*) which indicates "use the current job." The command can also be used from outside of a job started or tracked by OpCon as long as the JOB( ) parameter names a job that OpCon did start, or is tracking. Execution of this command from jobs outside of OpCon control will allow the LFEEDBACK command to execute, but OpCon will discard the LSAM feedback text string because it will not recognize the job. For unrecognized jobs, there will be no Event triggered by OpCon.

Message Management Parameters can also use this command from the main Event command line if the command's JOB( ) parameter names an OpCon job. The JOB() parameter can identify the job that issued the message by inserting the Message Management $-System variable for the Job ID, like this: JOB($IBM JOB ID). Similarly, Operator Replay Steps could execute the LFEEDBACK command from within the virtual workstation session, even though that secondary job is not the script driver job that OpCon directly started, but only if the JOB( ) parameter identifies a job that OpCon started.

The LFEEDBACK command could also be executed directly as the main command of an OpCon job. But the purpose of this type of job would be specifically to trigger an Event rule assigned to LSAM Feedback Trigger in the OpCon job master record. This kind of job would most likely be used only for test purposes.

The syntax of the LFEEDBACK command is illustrated below, followed by an explanation of its keyword parameters:
```
SMAPGM/LFEEDBACK TEXT('My feedback text') 
MSGSEQ(0) STSMSGID(SMA0035)
JOB(123456/USERID/JOBNAME)
```
#### Command Parameters

- **TEXT**: Must be enclosed by a pair of single quotes (unless only one word with no spaces is used that starts with an alphabetic character), and any enclosed single quotes must be escaped by doubling the single quote character. This text must include the key word or words that were used to configure the LSAM Feedback Trigger in the OpCon job master record, otherwise no Event will be triggered.
- **MSGSEQ**: This parameter should always be left set to a value of zero. Its purpose is only for internal use by SMA programs, as it controls how the OpCon database will store LSAM Feedback Field Codes.
- **STSMSGID**: A message code that is used to determine the type of job status message that will be sent to OpCon. Use the table of LSAM job status message codes, listed in Machine Messages, to select a valid message ID. The example of SMA0035 indicates that the IBM i job is still normally active, and that would be the typical job status returned to OpCon as the LFEEDBACK message is being generated, usually by the job whose status is being reported. However, LSAM Feedback can be sent as part of the protocol indicating a job failure.
- **JOB**: The default value for this parameter is an asterisk (\*) which indicates that the feedback refers to the current job that is executing the LFEEDBACK command. As described above, this keyword can be used to name an OpCon-monitored job when the LFEEDBACK command is being used from outside of an OpCon job. A typical example of this is when the LSAM Message Management server wants to send LSAM Feedback about the job that issued the message it is currently processing. The LSAM Message Management server would use the special $-Variable named $IBM JOB ID within this JOB( ) keyword to tell the Message Management server it must replace that variable with the message's IBM i Job ID.

### Other Command Constraints
In order for this command to work from a user-defined program, the job must include the LSAM environment library list. Those library names could be added to a user-defined job using the LSAM command SMAGPL/SMAADDLIBL (and later removed using command SMAGPL/SMARMVLIBL). Another way to get the LSAM libraries added for the command is to enclose the LFEEDBACK command inside the LSAM command-hosting command SMAGPL/LSAMCMD, as illustrated above. The LSAM library list would already be included by default in the LSAM Message Management server and in any job that executes an Operator Replay script, and the LSAM library list is also a prerequisite for running the SCANSPLF and SCANOUTQ commands.

In the example command syntax above, the MSGSEQ parameter should be left assigned to its default value of zero, so it is not necessary to include this parameter. (This parameter has limited purpose in special applications.) The STSMSGID parameter causes a new job status to appear on the OpCon job status display; the value of SMA0035 means that a job is still running in normal status. Users can specify other job status message IDs if that is appropriate; please review the contents of the SMAMSGF message file in library SMADTA and/or the list of job status messages in Machine Messages of the **IBM i LSAM** documentation to determine which job status IDs would be appropriate.

### OpCon Field Codes Supported by the IBM i LSAM

The LSAM Feedback capability within OpCon is assigned to each supported LSAM using specific OpCon database Field Codes. These field codes are used to generate the LSAM Feedback Trigger prompting within the maintenance program for OpCon job masters. There are two field codes assigned (as of this publication date) to the IBM i LSAM:

- **5801**: IBM i job stuck in MSGW status (fixed purpose)
- **5802**: User-defined LSAM Feedback text (variable purpose)

For client sites using a version of OpCon that has not been updated to at least the maintenance release of early 2015 (OpCon version 15.1 or newer), the new LSAM Feedback option for user-defined text will not appear. It will be necessary to update the SMALOOKUP table in the OpCon database using some predefined SQL statements. These SQL statements are available to licensed users of the IBM i LSAM from the LSAM PTF resources at SMA's FTP server location. The SQL statements and installation instructions are also contained with the LSAM's PTF post-install instructions, under PTFs 403177 and 403184. Please contact SMA Support if any assistance with this update is required.

The separate purpose and implementation of these two forms of LSAM Feedback are described next.

### SMA5801 Notification of Job MSGW Status and LSAM Feedback

The field code 5801 is fully described in the Configuration topic of this documentation, under the topic with the title above, located under the heading of "Extended Discussion of Parameters."

In summary, when the LSAM Parameters (main menu, option 7) have designated a valid message queue for the SMA5801 option, then the LSAM will send predefined LSAM Feedback information whenever it detects that a job started or tracked by OpCon is stuck in the MSGW (message waiting for response) status. The OpCon job master record shows a special entry in the LSAM Feedback options just for this 5801 MSGW trigger: "Active job in MSGW status". The user can register any form of Event command to be triggered when this category of feedback is received. The Event triggered may vary, depending on the nature of the job.

### 5802 User-defined LSAM Feedback

When the LFEEDBACK command is used, it sends any text string that the user defines to OpCon for processing according to LSAM Feedback Triggers that were added to the OpCon job master record. For the command to work, the type of LSAM Feedback selected in OpCon must be: "User-defined text from LFEEDBACK command". In addition, the compare text assigned to each Event definition must match all or a designated part of the TEXT value specified for the LFEEDBACK command. For more information about LSAM Feedback, please refer to the **Concepts** documentation (scan for LSAM Feedback).

## SMAJOBMSG - Send Detailed Job Messages to OpCon

The Agent can send Detailed Job Messages to OpCon that will be attached to the Job Information of the designated job. Within OpCon User Interface, these Detailed Job Messages can be viewed by following this navigation path: start by using either (1) a double-left mouse click on the job name, or (2) a right mouse click on the job name and then a left mouse click in the context menu on the title "Job Information." Next, click on the following tabs and titles: (Job Information... -> Configuration -> Operations Related... -> Detailed Job Messages). 

When the number of messages is greater than zero, click on the green plus sign circle to reveal a list of the Detailed Job Messages.

When this SMAJOBMSG command is used, for example, by Captured Data Response Rules, important information about circumstances detected within the IBM i job can be registered in the OpCon database. This makes it very easy for an OpCon operator to discover the cause of a job failure, or of any other unusual job status that may be observed in the OpCon User Interface view of jobs. (Refer to the SMASTATUS command, below, for more information about posting exceptional job status information.)

Here is an example of the command syntax, followed by a list explaining the command keywords:
```
SMAJOBMSG TEXT('Transaction batch total: {AMTDYNVAR} ') MSGSEQ(0)
STSMSGID(SMA0035) JOB(\*) FLDCOD(61)
```
From Message Management, the trapped message could be forwarded to OpCon Detailed Job Messages using the following command syntax model, where the primary message text is automatically made available via the $-System variable $MSG:
```
SMAJOBMSG TEXT('Found error $MSGID : $MSG') MSGSEQ(0)
STSMSGID(SMA0035) JOB($IBM JOB ID) FLDCOD(61)
```
Depending on another context, where the SMAJOBMSG command can be used, such as Multi-Step Job Scripts, the special variables $ERRMSGID and $ERRMSGTXT for a Step error could be sent to OpCon Detailed Job Messages from an ON_ERROR command using the following command syntax model:
```
SMAJOBMSG TEXT('Found error $ERRMSGID : $ERRMSGTXT') MSGSEQ(0)
STSMSGID(SMA0035) JOB(\*) FLDCOD(61)
```
#### Command Parameters

- **TEXT**: Must be enclosed by a pair of single quotes (unless only one word with no spaces is used that starts with an alphabetic character), and any enclosed single quotes must be escaped by doubling the single quote character. This text can include any helpful information about a job. It is typical that a Dynamic Variable token would be used by a Captured Data Response Rule, often to send the captured data to OpCon so it can be displayed in the history of Detailed Job Messages. (The Dynamic Variable token is replaced by the actual variable data value as the SMAJOBMSG command is submitted for processing by the LSAM Response Rules engine.)
- **MSGSEQ**: This parameter should always be left set to a value of zero. Its purpose is only for internal use by SMA programs, as it controls how the OpCon database will store LSAM Feedback Field Codes. The zero value allows OpCon to record multiple Job Detail messages without overlaying any previous message.
- **STSMSGID**: A message code that is used to determine the type of job status message that will be sent to OpCon. Use the table of LSAM job status message codes, listed in Machine Messages, to select a valid message ID. The example of SMA0035 indicates that the IBM i job is still normally active, and that would be the typical job status returned to OpCon as general job profile information is being reported. However, a different job status message ID would be appropriate when the Detailed Job Message is explaining the reason for a job failure.
- **JOB**: Within any IBM i job that was started by OpCon, the default value of JOB(*) refers to the current IBM i Job ID. The Agent uses this Job ID to find and send the OpCon Job identifiers to the OpCon server as the key for the Detailed Job Messages. Otherwise, Agent automation features such as Message Management can use this command parameter to identify the IBM i job that issued a message that is currently being handled. For Message Management, the value required in this keyword is easily represented by the special variable: JOB($IBM JOB ID). For other automation tools that can know a job was started by OpCon, the format of the Job ID is the same string as used by native IBM i commands: JOB(123456/USER/JOBNAME).
- **FLDCOD**: Unless otherwise instructed, OpCon users should not change the default value of 61 for this parameter. The OpCon field code 61 is used by the OpCon database and programs to identify Detailed Job Messages. The command prompt shows another field code 64 that is used internally by Agent File Arrival programs to send a path and file name to the OpCon system property called $ARRIVED FILE NAME. OpCon users should not attempt to use field code 64 or any other field code (unless this Agent documentation contains specific instructions about using a different code) because this can cause OpCon database corruption and the cost of a recovery would be the user's responsibility. This FLDCOD parameter is documented for the benefit of SMA Developers as they continue to produce automation enhancements.

### SMAJOBMSG JOB Parameter Syntax and Application

In the command syntax examples above, notice that the default value for the JOB(*) parameter is an asterisk, which represents that the current job's IBM i Job ID should be used. This imitates the behavior of older versions of the SMAJOBMSG command as it worked before the JOB keyword was added.

Any of the IBM i LSAM automation tools that can be executed within batch jobs started by OpCon can rely on the default value of the JOB(\*) parameter to represent the current IBM i Job ID. Whenever the asterisk is used within the JOB() parameter, it will be replaced with the actual IBM i Job ID, resulting in a command syntax that resembles the following simplified example:
```
SMAJOBMSG TEXT('Detail msg') STSMSGID(SMA0035)
JOB(123456/USER/JOBNAME)
```
This format for the JOB() parameter can be used anywhere that the IBM i Job ID is known. As always, if the command must be executed outside of the LSAM environment, without the LSAM library list in effect, it is necessary to embed this command within the LSAM command-hosting command, like this:
```
SMAGPL/LSAMCMD CMD('SMAJOBMSG \...
```
However, in some cases, such as within the LSAM Message Management server, the IBM i Job ID information would not be the same as the current job that is executing the SMAJOBMSG command. This is because the LSAM Message Management server job is not under the direct control of the OpCon server. The IBM i Job ID of the LSAM Message Management server job is not related to the actual IBM i Job IDs that generated the messages themselves.

To make the IBM i Job ID associated with each individual message available, the IBM i LSAM defines some of its $-System variables, representing the ability of the LSAM Message Management server to find and use the correct IBM i Job ID. The predefined LSAM variable named $IBM JOB ID could be inserted into the JOB keyword value, and this particular predefined variable is already formatted as required by the JOB keyword. So, within a Message Management Event command field, or from a Captured Data Response Rule linked to a Message Management Parameter record, the command syntax would look like this:
```
SMAJOBMSG TEXT('Detail msg') STSMSGID(SMA0035) JOB($IBM JOB ID)
```
Notice that the spaces within the predefined variable name are required and anticipated - it must be spelled exactly like this. There are also other LSAM $-System variable names that can be used to represent each part of an IBM i Job ID. Additional information about $-System variables can be found within the LSAM documentation under the following headings:

- Message Management
- Commands and Utilities
- Events and Utilities Menu

## SMASTATUS - Send Job Status Message to OpCon

OpCon and the IBM i LSAM employ a job scheduling protocol which includes a standard format for job status messages. This command causes the LSAM to generate current job status information and send it to OpCon. The purpose of this command is to override the job status value that is displayed on most views of jobs in the OpCon User Interface user interface. The MESSAGE parameter of this command supplies the text to be displayed on variousUser Interfaceviews.

Since this command does not (currently) support an ability to designate an IBM i Job ID, it can only be used from within a job that was started by, or is tracked by OpCon. An example of where this command might be useful is among the Steps of an LSAM Multi-Step Job Script, if OpCon started the job that is executing the script.

Here is an example of the command syntax, followed by a table explaining the command keywords:
```
SMASTATUS MESSAGE('Step=JOBSTEP01')
```
#### Command Parameters

**MESSAGE**: Must be enclosed by a pair of single quotes (unless only one word with no spaces is used that starts with an alphabetic character), and any enclosed single quotes must be escaped by doubling the single quote character. This text can include any helpful information about the  current job status.
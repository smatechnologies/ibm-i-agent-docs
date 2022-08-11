---
sidebar_label: 'SMAFAILJOB -- Agent Logged Forced Job End'
---

# SMAFAILJOB - Agent Logged Forced Job End

This Agent utility command can be used in any context to cause the current job to end with an \*ESCAPE message using message ID SMA0992. For jobs started by OpCon, the Agent will report a Failed status.

## Using SMAFAILJOB

Here is the command syntax:
```
SMAFAILJOB JOBNAM(JOBNAME) SMAGPL(*DEFAULT)
```
### Command Parameters

This command is typically used without specifying its parameters.

- **JOBNAM**: Specify the IBM i job name to be used in the message text of the SMA0992 message ID. If this parameter is not specified, then the actual job name of the current job will be reported as the failing job.
- **SMAGPL**: This command parameter is used (by this command, not by other commands) only to locate the SMAMSGF message file, so that the SMA0992 message ID can be retrieved to format the escape message. When the SMAFAILJOB is used within the Agent (LSAM) environment, that is, when the job's library list includes the LSAM libraries, then it is not necessary to specify this parameter. However, this parameter makes it possible to use the command from outside of the  LSAM environment, as long as the command name is qualified, as in this example:

The SMAFAILJOB command is especially useful for the Agent's Multi-Step Script jobs, and it can be used in the Captured Data Response Rules for these Agent automation features: Message Management, Operator Replay, and the SCANSPLF command. In SCANSPLF applications, the SMAFAILJOB can have the effect of overriding the Scan Rules and SCANSPLF command normal controls over when a job should fail (based on the number of matched or unmatched scan rules).

### Example of SMAFAILJOB in a Multi-Step Job Script

The following example shows two steps that are part of a Multi-Step Job Script, illustrating how the SMAFAILJOB command can force the Script job to end in case the next command step should fail.

:::info Example 
Forcing a Multi-Step Script Job to fail if a critical Step fails: 
```
STEP#  LABEL      COMMAND 
-----  ---------  -----------------------------------------
0040   ON_ERROR   SMAFAILJOB 
0050              CALL MYPROGRAM PARM('If this step fails') 
```
:::

Actually, a simpler way to force the Script to fail would be to mark Step # 50 with the flag that indicates "force script failure if this step fails."  But other Agent automation features, such as the SCANSPLF report scanning utility and the Operator Replay workstation automation, do not support a simple failure flag and they benefit from the incident logging capabilities of the SMAFAILJOB command, including that a Detailed Job Message will be sent to jobs that OpCon started.

Despite the simplicity of the example above, in many cases, the ON_ERROR Step would prove useful because it might also included a step qualification rule where, for example, the special variable $ERRMSGID could be compared to a known possible message ID value that is recognized by the Script author as a fatal error. Similarly, the ON_ERROR step could use the SMAGOTO command to turn job control over to a separate error handling Script, where mutiple different conditions could be tested, and only certain conditions would then actually execute the SMAFAILJOB command.


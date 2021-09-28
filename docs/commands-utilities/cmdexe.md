# CMDEXE, CMDEXE2: IBM i Native Command Wrapper

These commands are used to execute IBM i native commands inside a "wrapper" CL program that intercepts any command failure message and makes it possible for the Agent and/or OpCon to control the OpCon job status and to respond appropriately to different error messages.

These utility commands are especially helpful for some IBM i commands, such as CPYF or RSTOBJ and RSTLIB, that can issue failure messages when the command did not actually fail, but IBM felt they should notify the user of some important irregularity. Using one of the Agent's wrapper commands can prevent an unnecessary failure of an OpCon job while still making it possible to generate an OpCon Event command that might notify an operator of the irregularity.

## Set the Command and Program Object Authority

Both the CMDEXE command and its program CMDEXEC, and the CMDEXE2 command with its program CMDEXE2C, are distributed with \*PUBLIC authority revoked. The objects are owned by user SMANET, as usual for LSAM software. This object authority profile is designed to help prevent abuse or hacks into the system. If either of these commands will be executed by a user profile that does not have authority to use objects owned by the SMANET user profile, then it will be necessary to grant authority to that user profile for the command and its command execution program.

Be sure that the batch user in the OpCon job has authority to \*USE both the command and the program. For all LSAM objects, use the LSAM object authority management function, found in LSAM sub-menu 9, option 8. Add authority records for both objects (a \*CMD and a \*PGM), and be sure to use option 1 to apply the new authorities after they are registered.

Another strategy to consider when modifying the program authority is to use adopted authority so that the job user can perform functions without having to be directly authorized to those functions. The Agent's object authority management function can also be used to define and apply adopted authority.

## Using CMDEXE

The CMDEXE command is a very simple wrapper that depends on the Agent's Message Management facility to intercept job failure messages while they are still pending, and then decide to either ignore the message (so that the job ends normally) or to reply with 'C' or 'D' to the error message (so that the job fails).

The Agent's Message Management Parameters can be linked to Message Data Capture Rules, and by that means, to Response Rules, where detailed decisions can be made about each job and appropriate Events generated in response to those conditions.

Here is the command syntax:

```shell
CMDEXE CMD('IBMCMD KEWORD1(''value 1'') KEYWORD2(1234)')
```

### Command Parameters: There is Only the One "CMD" Parameter

Notice that the CMD() keyword of the CMDEXE command must enclose the native IBM i command inside a pair of single quotes. This means that any of the native command parameters requiring single quotes must double the single quotes, as shown above for the KEYWORD1() command parameter. By comparison, the KEYWORD2() command parameter is apparently a numeric value that does not require any single quotes.

### Command Usage Notes

The typical use for this command is when an OpCon job for IBM i batch execution is executing just one simple IBM i command. If the command reports an error, it causes the job submitted by the LSAM to fail, and there is no means by which OpCon or the LSAM can intervene to evaluate the error and then ignore it (allowing the job to complete normally), or respond by telling the job to fail.

Whenever there is a command error, it is always reported in QSYSOPR using message ID CPA0702. This message ID was designed by IBM to report the actual exception message ID that was sent by the command to the error management boundary of the job. This means that the primary text of the CPA0702 will contain the real message ID that represents the error that has occurred.

This makes it possible for the IBM i batch job in OpCon to define job-level message management rules, or the LSAM's more powerful global Message Management Parameters can be defined to respond to various error conditions for specific job + user names. The message management rule should filter message ID CPA0702 and then also test the primary message text for whatever error code is expected in case of anticipated failures.

## Using CMDEXE2

The CMDEXE2 command works differently from the CMDEXE command, because it does not allow messages to be sent to an external message queue while the command waits for a response. Instead, it uses its own parameter options to decide how to respond to any expected native command error, without depending on the Agent's Message Management service.

When the command is executed in a job started by OpCon, it will return LSAM Feedback to report any error message issued by the native IBM i command. This makes it possible to configure a response to the error message ID using the OpCon job's Events tab, even if the command was configured to force the job to end normally. When configuring Events for LSAM Feedback, choose the user-defined LSAM Feedback type and in the comparison text type %CPF1234% (where 'CPF1234' represents the actual error code that is issued by the native command and sent as the feedback).

Used in local mode, such as from a step of a Multi-Step Job Script, this command can implement a more elaborate response to potential error messages without requiring a complex set of additional steps within the Script. And yet, the Script can rely on the FAILCODEDV parameter to force any error message ID into a Dynamic Variable that ON_ERROR Script steps can test, in order to develop varying error management strategies.

Here is the command syntax:

```shell
CMDEXE2 CMD('IBMCMD KEWORD1(''value 1'') KEYWORD2(1234)')
FAILCODEDV(FAILDYNVAR) FAILONERR(Y) IGNOREMSG(CPF1234) OPCONJOB(Y)
```

### Command Parameters

- **CMD** = Type or paste the entire native IBM i command inside a
    pair of single quotes.
- **FAILCODEDV** = Optionally, specify the name of an Agent Dynamic
    Variable that will receive the 7-character IBM i message ID in case
    there is any failure of the native command. The {TOKEN} for this
    Dynamic Variable can be used in Multi-Step Job Scripts or Response
    Rules to test for various error message ID values and then generate
    an appropriate response.
- **FAILONERR** = Control the success or failure of the CMDEXE2 command. Values:
  - **'Y' or '1'** = Yes, allow the CMDEXE2 command to fail if the native command fails.
  - **'N' or '0'** = No, force the CMDEXE2 command to end normally, despite any failure of the native command.
- **IGNOREMSG** = Enter the message ID of a possible error message that should be ignored. This parameter can be used with the FAILONERR(Y) option, so that the CMDEXE2 command will fail if there is any other error except for the message ID specified in this parameter.
- **OPCONJOB** = Control the attempt to communicate command results to OpCon. Prevent attempts to communicate with OpCon when the CMDEXE2 command is being used in a local mode, such as within a Multi-Step Job Script.

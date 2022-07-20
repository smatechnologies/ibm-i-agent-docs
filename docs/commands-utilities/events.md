---
sidebar_label: 'Events: OpCon Event Notification'
---

# Events: OpCon Event Notification

## SMAFAILJOB

This Agent utility command can be used in any context to cause the current job to end with an \*ESCAPE message using message ID SMA0992. For jobs started by OpCon, the Agent will report a Failed status.

### Using SMAFAILJOB

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

:::tip EXAMPLE 
Forcing a Multi-Step Script Job to fail if a critical Step fails: 
```
STEP#      LABEL      COMMAND 
0040       ON_ERROR   SMAFAILJOB 
0050                  CALL MYPROGRAM PARM('If this step fails') 
```
:::

Actually, a simpler way to force the Script to fail would be to mark Step # 50 with the flag that indicates "force script failure if this step fails."

Despite the simplicity of the example above, in many cases, the ON_ERROR Step would prove useful because it might also included a step qualification rule where, for example, the special variable $ERRMSGID could be compared to a known possible message ID value that is recognized by the Script author as a fatal error. Similarly, the ON_ERROR step could use the SMAGOTO command to turn job control over to a separate error handling Script, where mutiple different conditions could be tested, and only certain conditions would then actually execute the SMAFAILJOB command.

## CPYTOMSGIN
This External Event Interface command allows a user program to directly pass OpCon/xps events to the SAM and supporting services (SAM-SS).

### Using CPYTOMSGIN
Copy to message input: This is an IBM i LSAM imitation of the similar function available on the OpCon server. CPYTOMSGIN may be used to generate any OpCon Event command, especially those that are not supported by individual LSAM commands.

The CPYTOMSGIN utility forwards external events to SAM and supporting services (SAM-SS). This utility can be executed within an IBM i batch job that is scheduled by OpCon, or it can be executed from virtually anywhere within the IBM i environment, wherever IBM i command execution is supported. The CPYTOMSGIN command is supported by a driver program that automatically allocates the IBM i LSAM libraries and other resources needed to complete its task. When it is executed from outside of the LSAM library list, qualify the command with its library location, as in the example below.

Another important capability of the CPYTOMSGIN command is that it will support translation of IBM i LSAM Dynamic Variable tokens that may be included anywhere within the CPYMSGIN parameter, that is, within the actual Event command line.

The syntax for Event commands that are not represented by individual IBM i LSAM commands may be viewed when the CPYTOMSGIN command is selected from the LSAM's menu-driven Event Management function (LSAM menu 3, option 1). The automatic prompting of Event command syntax that occurs when CPYTOMSGIN is selected and a sub-menu of available commands appears results in a final command prompting screen that will contain the model syntax for each OpCon/xps Event command. This model syntax could be copied from the prompt screen and then pasted into the MESSAGE parameter of the CPYTOMSGIN command whenever it is being coded in a user-defined program.

### Example Program Using CPYTOMSGIN

:::tip EXAMPLE 
A sample Control Language program follows:
```
00010 PGM
00020 SMAGPL/CPYTOMSGIN CPYMSGIN($NOTIFY:LOG,<Severity>,<EventID>,<Message>)
00030 ENDPGM
```
:::

In the example above, the < > characters are used only to mark the locations where field names are identified. Both the field name and the < > characters must be replaced by the required parameter value. If the specified Event command allows that a field is optional and the value will be left out of the command, the commas that delimit the field position must still be retained. Two consecutive commas with no value between them tells OpCon/xps that the null value should be assigned to the field in that position.

## Application Example: Sending IBM i values to OpCon Properties

IBM i values can be sent to OpCon Properties using the $PROPERTY:SET Event command from anywhere that the IBM i LSAM supports OpCon Events. OpCon Property tokens can then be used to reference these IBM i values as part of OpCon automation, wherever Property tokens are supported. 

The CPYTOMSGIN command provides excellent flexibility for the purpose of sending any value retrieved from the IBM i system to be stored in an OpCon Property. When the CPYTOMSGIN command is used, the command driver program will scan the entire external event command string looking for any IBM i LSAM Dynamic Variable tokens that might be replaced. It is very common to put an LSAM Dynamic Variable token into the value parameter of the OpCon $PROPERTY:SET command, so that any value retrieved by, or stored in a Dynamic Variable can be sent up to the OpCon server and stored into an OpCon Property.

Remember that OpCon Property names could be global properties, or they could be instance-qualified properties, possibly qualified to a specific schedule name or an OpCon job name within a schedule. It's possible to use Dynamic Variables to represent the OpCon schedule or job names. As well, within the LSAM Message Management Parameters, or their attached Response Rules, it is also possible to use one of the available $-property values identified in the first table under Message Management Screens and Windows, within the Message Management topic of the **IBM i LSAM** documentation.

Here is an example of pushing the value from an IBM i LSAM Dynamic Variable up to an OpCon global property:

:::tip EXAMPLE 
Sending an IBM i value to an OpCon Property
```
CPYTOMSGIN CPYMSGIN('$PROPERTY:SET,my_opcon_property,{DISKPERCNT}')
```
:::

The example above assumes that the Dynamic Variable DISKPERCNT would previously have been loaded with the current IBM i disk utilization percentage, as would be possible from an Operator Replay script using a screen data Capture Application, linked to a Response Rule that stored the captured data into the Dynamic Variable.

Dynamic Variables are called "dynamic" because they can do more than just store static values. It's possible to assign a user-defined program to a Dynamic Variable master record that can perform any kind of calculation at run-time and return the value that will be used to replace the Dynamic Variable token.

The LSAM software includes both a pre-compiled SQL utility program and a model Control Language program that can be adapted as one of these Dynamic Variable user-defined programs, so that any Field value from an IBM i DB2 database file can be fetched as the Dynamic Variable at run time. The field value can also be trimmed down to use any part of the field value as the replacement for the Dynamic Variable token. The same model CL program also illustrates how to fetch a partial or complete value from an IBM i DB2 data area.

## Setting Up an Event User ID and Password

In order to allow the LSAM to send valid events to the SAM-SS, a valid User ID and password must be defined to the LSAM.

### Define a Valid Event User ID and Password

1. In the command line, enter **SMAGPL/STRSMA**. For more information on STRSMA command parameters, refer to the [STRSMA Command](../operations/lsam.md#the-strsma-command).
2. Enter **3** to choose the **Event management** menu in the SMA Main Menu.
3. Enter **2** to choose the **External Event Pass Word** option in the Event Management Menu.
4. On the External Event Pass Word screen, <**Tab**> to the following fields and enter the following data:

    a.  **User Name**: type a valid OpCon/xps user name.     
    
    b.  **Password**: type a valid external event password for the User Name above.
    
    c.  **Password**: type a valid external event password again to verify the password.

## Direct Event Commands

An alternative to using the CPYTOMSGIN command is to use each Event command directly. The command processor program for an Event command performs the same function as CPYTOMSGIN, by delivering the command and its parameters to the LSAM communications programs.

Direct Event commands may be simpler than CPYTOMSGIN for a programmer to use because each Event command can be prompted pressing <**F4**> during program edit operations. When the command prompting is completed by pressing <**Enter**>, the correct syntax for the command and its parameters is returned to the program source line. A complete list and explanation of the available event commands may be found in [$Variables Supported in Event Commands](/message-management/screens#variables-supported-in-event-commands). More information about Events may be found in the OpCon documentation.

However, SMA generally recommends using the CPYTOMSGIN command because it is universally compatible in case there are any changes to OpCon Event command syntax. As well, there is special support for prompting OpCon Event command syntax when CPYTOMSGIN is used from the LSAM sub-menu function dedicated to Event Commands, from with LSAM Message
Management Parameters or in any form of Captured Data Response Rule (in the response command line). In addition, the IBM i LSAM supports translation of LSAM Dynamic Variable tokens from anywhere within the actual Event command line, whereas the Direct Event Commands do not offer this support.
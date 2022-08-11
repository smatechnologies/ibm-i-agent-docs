---
sidebar_label: 'External Events'
---
# External Events

"External Events" is the OpCon term that identifies the specifically formatted command strings that OpCon Agents and other authorized users are permitted to transmit to the OpCon central application server.  External Event commands address many categories of actions, for example, adding or changing a job in a schedule, or initiating an email message that the OpCon server will transmit to inside or outside of the OpCon network.

## Setting Up an Event User ID and Password

To enable the IBM i Agent to successfully submit External Event commands it is necessary to first assign an OpCon user, within the OpCon server administration, that has authority to execute External Event commands.  The user must be allowed to work with IBM i machines.  There is a separate password or (more recently) an authority token that must be generated for the OpCon user's permission for External Events.  The password or token is different from the OpCon user's primary password or token used to access an OpCon user interface.  The password or token must be captured (copied) immediately so that it can be pasted into the IBM i Agent's "External Event Token" storage, using the LSAM sub-menu 3, option 2.

### Registering an Event User ID and Password

After using OpCon User administration to generate a password or token for an IBM i User, the password or token must have been copied immediately as it was generated so that the value can be registered within the IBM i Agent's database.  The following procedure stores the password or token in an encrypted format, for internal use by the Agent's automation routines.

1. In the command line, enter **SMAGPL/STRSMA**. For more information on STRSMA command parameters, refer to the [STRSMA Command](../operations/lsam.md#the-strsma-command).
2. Enter **3** to choose the **Event management** menu in the SMA Main Menu.
3. Enter **2** to choose the **External Event Token** option in the Event Menu.
4. A dedicated form of the Agent's User Management registration program allows only one External Event User ID to be registered.  
  - If an External Event User has not yet been registered, it can be added.
  - If an External Event User is already registered, it can have its description and token (or password) udpated.
4. For new registrations, enter the registered OpCon External Event User name.
5. <**Tab**\> to the **Token** field and paste in the token (or password) value copied from the OpCon User Administration process.
6. <**Tab**\> to second **Token** field and paste in the same token value to confirms it to the program edit process.
7. Press <**Enter**> to complete the addition or change.

## External Event Command Syntax: CSV vs. XML

The IBM i Agent now supports both the original CSV (Comma-separated values) syntax, and also the newer XML formats. The XML format is preferred because it does not constrain the content of Event command parameters.  By comparison, the CSV format prevents the use of a comma within any Event command parameter, causing issues expecially with the $NOTIFY:EMAIL command's message text parameter.  The Agent's master file data entry screens give the user the ability to convert existing CSV External Event Commands to XML External Event Commands with the press of a function key.

### XML Event Management Commands

#### Calendar
XCALADD - Calendar Add
*	To add calendar dates, enter an existing OpCon Calendar Name.
*	Enter 1 to 10 dates to be added to the calendar XCALDEL - Calendar Delete
*	To delete calendar dates, enter an existing OpCon Calendar Name.
*	Enter 1 to 10 dates to be added to the calendar. XJOBPRTY - Job Priority
*	To modify the job priority, enter an existing OpCon schedule name, job name, schedule date and job priority.
*	The default Schedule date is CURRENT.

#### Job
XJOBADD - Job Add        
*	To add a job to the Daily Schedule, enter an existing OpCon schedule name, job name, and schedule date, and frequency.
*	The default Schedule date is CURRENT.

XJOBADDHLD - Job Add Hold
*	To add a job on hold to the Daily Schedule, enter an existing OpCon schedule name, job name, and schedule date, and frequency.
*	The default Schedule date is CURRENT.

XJOBBAD - Job Bad        
*	To mark a job bad, enter an existing  OpCon schedule name, job  name, and schedule date.
*	The default Schedule date is CURRENT.

XJOBCNL - Job Cancel     
*	To cancel a job, enter an existing OpCon schedule name, job name, and schedule date.
*	The default Schedule date is CURRENT.

XJOBDEL - Job Delete     
*	To delete a job from the Daily Schedule, enter an existing OpCon schedule name, job name, and schedule date.
* The default Schedule date is CURRENT.

XJOBGOD - Job Good       
*	To mark a job as good, enter an existing OpCon schedule name, job name, and schedule date.
*	The default Schedule date is CURRENT.

XJOBHLD - Job Hold
*	To put a job on hold, enter an existing OpCon schedule name, job name, and schedule date.
*	The default Schedule date is CURRENT.

XJOBKIL - Job Kill
*	To kill a job, enter an existing OpCon schedule name, job name, and schedule date.  
*	The default Schedule date is CURRENT.

XJOBMBLDST - Job Master Build State
*	To change the job master build status, enter an existing OpCon schedule name, job name, frequency name and build status.
*	The default build status is blank.  Values are Released (R), Disabled (D), Skipped (S), Do Not Schedule (N), or Held (H).

XJOBMCHGRP - Job Machine Group
*	To assign a machine group, enter an existing OpCon schedule name, job name, schedule date and machine group name.
*	The default Schedule date is CURRENT.

XJOBMTAGAD - Job Master Tag Add
*	To add a job master tag, enter an existing OpCon schedule name, job name, frequency name and 1 to 5  tags.
*	If Frequency name is populated, tags are populated as a frequency tag.  If Frequency name is not populated, tags will be populated as a job tag. 

XJOBMTAGDL – Job Master Tag Delete
*	To delete a job master tag, enter an existing OpCon schedule name, job name, frequency name and 1 to 5  tags.
*	If Frequency name is populated, tags are populated as a frequency tag.  If Frequency name is not populated, tags will be populated as a job tag.

XJOBPRTY - Job Priority
*	To modify the job priority, enter an existing OpCon schedule name, job name, schedule date and job priority.
*	The default Schedule date is CURRENT.

XJOBRLS - Job Release    
*	To release a job, enter an existing OpCon schedule name, job name, and schedule date.  
*	The default Schedule date is CURRENT.

XJOBRSC - Job Reschedule
To reschedule a job in the Daily Schedule, enter:
*	Enter an existing OpCon schedule name.
*	Enter an existing OpCon job name.
*	Enter a new start time offset code:
    * T: The new start time will be calculated based on the time the job terminated.
    * S: The new start time will be calculated based on the time the job started.
    * N: The new start time will be calculated based on the current time the event is processed. If the job had not run and the reschedule event is used, the T/S/N is disregarded and the offset will be the current time on the SAM machine plus the number of minutes specified in the event (similar to the use of the N value).
*	Enter the number of minutes to reschedule the job.
*	Enter the schedule date.
    * The default Schedule date is CURRENT.

XJOBRSCHLD - Job Reschedule Hold
To reschedule a job on hold in the Daily Schedule, enter:
*	Enter an existing OpCon schedule name.
*	Enter an existing OpCon job name.
    * Enter a new start time offset code:
    * T: The new start time will be calculated based on the time the job terminated.
    * S: The new start time will be calculated based on the time the job started.
    * N: The new start time will be calculated based on the current time the event is processed. If the job had not run and the reschedule event is used, the T/S/N is disregarded and the offset will be the current time on the SAM machine plus the number of minutes specified in the event (similar to the use of the N value).
*	Enter the number of minutes to reschedule the job.
*	Enter the schedule date.
*	The default Schedule date is CURRENT.

XJOBRST - Job Restart    
*	To restart a job, enter an OpCon schedule name, job name, and schedule date.
*	The default Schedule date is CURRENT.

XJOBRSTHLD - Job Restart Hold
*	To restart a job on hold, enter an OpCon schedule name, job name, and schedule date.
*	The default Schedule date is CURRENT.

XJOBSKP - Job Skip       
*	To skip a job, enter an existing OpCon schedule name, job name, and schedule date.
*	The default Schedule date is CURRENT.

XJOBSTR - Job Start   
*	To start a job, enter an existing OpCon schedule name, job name, and schedule date.
*	The default Schedule date is CURRENT.

XJOBTAGADD - Job Tag Add
*	To add a job tag, enter an existing OpCon schedule name, job name, schedule date and 1 to 5 job tags.
*	The default Schedule date is CURRENT.

XJOBTAGDEL - Job Tad Delete
*	To delete a job tag, enter an existing OpCon schedule name, job name, schedule date and 1 to 5 job tags.
*	The default Schedule date is CURRENT.

XJOBUSER - Job User
*	To change the job user, enter an existing OpCon schedule name, job name, schedule date and user name.
*	The default Schedule date is CURRENT.

XMAXRUNTIM - Max Runtime
*	To modify the maximum runtime, enter an existing OpCon schedule name, job name, schedule date and maximum runtime.
*	The default Schedule date is CURRENT.

#### Log
XCONDSP - Console Display
*	To send a message to the SAM log file, enter a text message.
*	Refer to External Events in the OpCon Events documentation.

#### Machine
XMACMAXJBS - Machine Max Jobs

XMACSTS - Machine Status

#### Notify
XNTYEMAIL - Notify Email
*	To send a notification email, enter the To Email address, (optional:  email carbon copy and blind cardon copy), subject, body and attachments.

XNTYLOG - Notify Log           
*	To send a notification, enter Severity (I, W or E), Notification ID (up to 7 characters), and text message. Refer to Notification Events in the OpCon Events documentation.

XNTYNETSND - Notify Net Send
*	To send a network message, enter the Network Machine name and the Network Message.

XNTYSNMP - Notify SNMP
*	To send SNMP message, enter the SNMP Trap, SNMP ID and the SNMP Message.

XNTYSPOAL - Notify Spoal
*	To send a SPOAL message, enter the 

XNTYSPOCO - Notify SPOCO
*	To send a SPOCO Command, enter the SPOCO Instance and SPOCO command.

XNTYTASKS - Notify Tasks
*	To send a Notify Task, enter the To Email, optional Carbon Copy and Blind Carbon Copy, Email Subject and the Desired Date.

XNTYTXTMSG - Notify Text Message
*	To send a Notify Text Message, enter the Text To and the Text Message.

#### Property
XPROPADD - Property Add
*	To add a property, enter the property name and value.

XPROPDEL - Property Delete
*	To delete a property, enter the property name.

XPROPSET - Property Set
*	To set a property value, enter and existing property name and new property value.

#### Schedule
XSCHBLD - Schedule Build        
*	To process a schedule build, enter an existing OpCon schedule name, schedule date, override existing schedule (Y/N), log file name path and up to 5 properties.
*	The default Schedule date is CURRENT.

XSCHBLDHLD - Schedule Build on Hold
*	To process a schedule build, enter an existing OpCon schedule name, schedule date, override existing schedule (Y/N), log file name path and up to 5 properties.
*	The default Schedule date is CURRENT.

XSCHCHK - Schedule Check (one
*	To check a schedule, enter an existing OpCon Schedule's name, date and include circular dependencies.
*	The default Schedule date is CURRENT.
*	The default Include circular dependencies is ‘N’.  
       *	Y: Check for circular dependencies
       *	N: Do not check for circular dependencies (N is the default)
       *	S: Perform a simple check which skips after, conflict, and circular dependencies.

XSCHCHKALL - Schedule Check All
*	To check all, enter date and include circular dependencies.
*	The default Schedule date is CURRENT.
*	The default Include circular dependencies is ‘N’.  
       *	Y: Check for circular dependencies
       *	N: Do not check for circular dependencies (N is the default)
       *	S: Perform a simple check which skips after, conflict, and circular dependencies.

XSCHCNL - Schedule Cancel       
*	To cancel a schedule, enter an existing OpCon Schedule's name and date.
*	The default Schedule date is CURRENT.

XSCHDLT - Schedule Delete       
*	To delete a schedule, enter an existing OpCon Schedule’s name and date.
o	The default Schedule date is CURRENT.

XSCHHLD - Schedule Hold         
*	To place a schedule On Hold, enter an existing OpCon Schedule's name and date.
*	The default Schedule date is CURRENT.

XSCHRLS - Schedule Release      
*	To release a schedule, enter an existing OpCon Schedule's name and date.
*	The default Schedule date is CURRENT.

XSCHSTR - Schedule Start
*	To start a schedule, enter an existing OpCon Schedule's name and date.
*	The default Schedule date is CURRENT.

#### Threshold-Resources
XRESDEL - Resource Delete
*	To delete a resource, enter an existing Resource Name.

XRESREN - Resource Rename
*	To rename a resource, enter an existing Resource Name and the new Resource Name.

XRESSET - Resources Set
*	To set a resource, enter a valid resource name and value. Refer to Resources in the Concepts documentation.

XTHRDEL - Threshold Delete
*	To delete a threshold, enter an existing Threshold Name.

XTHRREN - Threshold Rename
*	To rename a threshold, enter an existing Threshold Name and the new Threshold Name.

XTHRSET - Threshold Set
*	To set a threshold, enter a valid threshold name and value. Refer to Thresholds in the Concepts documentation.

#### Token
XTOKADD - Add Token     
*	To add a token, enter a valid token name. Refer to Properties in the Concepts documentation.

XTOKDEL - Token Delete
*	To delete a token, enter a valid token name. Refer to Properties in the Concepts documentation. to Properties in the Concepts documentation.

XTOKSET - Token Set
*	To set a token, enter a valid token name and value. Refer to Properties in the Concepts documentation.

### CSV Event Management Commands

#### Job
JOBBAD - Job Bad
*	To mark a job bad, enter an existing OpCon schedule name, job name, and schedule date.
*	The default Schedule date is CURRENT.

JOBCNL - Job Cancel
*	To cancel a job, enter an existing OpCon schedule name, job name, and schedule date.
*	The default Schedule date is CURRENT.

JOBDEL - Job Delete
*	To delete a job from the Daily Schedule, enter an existing OpCon schedule name, job name, and schedule date.
*	The default Schedule date is CURRENT.

JOBHLD - Job Hold
*	To put a job on hold, enter an existing OpCon schedule name, job name, and schedule date.
*	The default Schedule date is CURRENT.

JOBRLS – Job Release
*	To release a job, enter an existing OpCon schedule name, job name, and schedule date.
*	The default Schedule date is CURRENT.

JOBHLD - Job Hold
*	To put a job on hold, enter an existing OpCon schedule name, job name, and schedule date.
*	The default Schedule date is CURRENT.

JOBRSC - Job Reschedule
To reschedule a job in the Daily Schedule, enter:
*	Enter an existing OpCon schedule name.
*	Enter an existing OpCon job name.
*	Enter a new start time offset codes:
   *	T: The new start time will be calculated based on the time the job terminated.
   *	S: The new start time will be calculated based on the time the job started.
   *	N: The new start time will be calculated based on the current time the event is processed.
If the job had not run and the reschedule
event is used, the T/S/N is
disregarded and the offset will be the current
time on the SAM machine plus the number
of minutes specified in the event (similar
to the use of the N value).
l Enter the number of minutes to reschedule the job.
l Enter the schedule date.
l The default Schedule date is CURRENT.

#### Log
CONDSP – Console Display
*	To send a message to the SAM log file, enter a text message. Refer to External Events in the OpCon Events documentation.

#### Notification
EVTLOG - Event Log
*	No longer supported. Existing uses of this command are now supported by NTYLOG, using a severity of I =info. The default Notification ID will be SMA0202.

NTYACT – Notify Action
*	No longer supported. Existing uses of this command are routed to processing of the NTYLOG command.

NTYLOG - Notify Log
*	To send a notification, enter Severity (I, W or E), Notification ID (up to 7 characters), and text message. Refer to Notification Events in the OpCon Events documentation.

#### Schedule
SCHCNL – Schedule Cancel
*	To cancel a schedule, enter an existing OpCon Schedule's name and date.
*	The default Schedule date is CURRENT.

SCHHLD – Schedule Hold
*	To place a schedule On Hold, enter an existing OpCon Schedule's name and date.
*	The default Schedule date is CURRENT.

SCHRLS – Schedule Release
*	To release a schedule, enter an existing OpCon Schedule's name and date.
*	The default Schedule date is CURRENT.

SCHSTR – Schedule Start
*	To start a schedule, enter an existing OpCon Schedule's name and date.
*	The default Schedule date is CURRENT.

#### Threshold-Resources
THRSET – Threshold Set
*	To set a threshold, enter a valid threshold name and value. Refer to Thresholds in the Concepts documentation.

RESSET – Resource Set
*	To set a resource, enter a valid resource name and value. Refer to Resources in the Concepts documentation.

#### Token
TOKADD - Token Add
*	To add a token, enter a valid token name and value. Refer to Properties in the Concepts documentation. 

TOKDEL – Token Delete
*	To delete a token, enter a valid token name. Refer to Properties in the Concepts documentation.

TOKSET - Token Set
*	To set a token, enter a valid token name and value. Refer to Properties in the Concepts documentation.

## CPYTOMSGIN
This External Event Interface command allows a user program to directly pass OpCon events to the SAM and supporting services (SAM-SS).  While the IBM i Agent supports an array of IBM i styled commands (listed above) for each of the OpCon External Events, the CPYTOMSGIN command offers convenient support for configuring External Event commands within the Agent's various automation tools.  One of the advantages of this Event command wrapper utility is that it can recognize and replace Dynamic Variable {TOKENS} within any part of the submitted External Event command before the actual Event command is sent to the OpCon server.

### Using CPYTOMSGIN
Copy to message input: This is an IBM i LSAM imitation of the similar function available on the OpCon server. CPYTOMSGIN may be used to generate any OpCon Event command, especially those that are not supported by individual LSAM commands.

The CPYTOMSGIN utility forwards external events to SAM and supporting services (SAM-SS). This utility can be executed within an IBM i batch job that is scheduled by OpCon, or it can be executed from virtually anywhere within the IBM i environment, wherever IBM i command execution is supported. The CPYTOMSGIN command is supported by a driver program that automatically allocates the IBM i LSAM libraries and other resources needed to complete its task. When it is executed from outside of the LSAM library list, qualify the command with its library location, as in the example below.

Another important capability of the CPYTOMSGIN command is that it will support translation of IBM i LSAM Dynamic Variable tokens that may be included anywhere within the CPYMSGIN parameter, that is, within the actual Event command line.

The syntax for Event commands that are not represented by individual IBM i LSAM commands may be viewed when the CPYTOMSGIN command is selected from the LSAM's menu-driven Event Management function (LSAM menu 3, option 1). The automatic prompting of Event command syntax that occurs when CPYTOMSGIN is selected and a sub-menu of available commands appears results in a final command prompting screen that will contain the model syntax for each OpCon Event command. This model syntax could be copied from the prompt screen and then pasted into the MESSAGE parameter of the CPYTOMSGIN command whenever it is being coded in a user-defined program.

#### Specialized Support for XML-formatted External Event Commands

From the same LSAM sub-menu 3, option 1, an intial display supports user selection of working with the newer and more flexible XML-formatted External Event commands.  The XML-formatted commands are best supported, in most cases, by prompting for and selecting one of the series of Agent commands whose names begin with "X", such as XNTYEMAIL which offers and improved way to generate email messages, as compared to the CSV-formatted command $NOTIFY:EMAIL.

For XML-formatted Event commands, the CPYTOMSGIN command is usually not needed or recommended.  But there are some exceptional circumstances where detailed control over the parameters of XML-formatted commands (such as using Dynamic Variable {TOKENS} to supply command parameter values) are best supported by working with the raw, XML <TAGS\>.  For this purpose, the Agent automation tools that support prompting lists of XML Event commands also show the CPYTOMSGIN command.  Select this command to next view a list of available XML Event command names.  After choosing one of the commands, the Agent will present the CPYTOMSGIN command wrapper, surrounding the raw formatted XML commands.  When this format of Event command request is inserted into an Agent automation tool (such as Multi-Step Script job Step records, or the Captured Data Response Rule command lines) it becomes possible to prompt for and insert Dynamic Variable {TOKENS} that will supply one or more Event command parameter values between pairs of XML <TAGS\> at run time.

### Example Program Using CPYTOMSGIN with CSV-format Event commands

:::info Example 
A sample Control Language program follows:
```
00010 PGM
00020 SMAGPL/CPYTOMSGIN CPYMSGIN($NOTIFY:LOG,<Severity>,<EventID>,<Message>)
00030 ENDPGM
```
:::

In the example above, the < > characters are used only to mark the locations where field names are identified. Both the field name and the < > characters must be replaced by the required parameter value. If the specified Event command allows that a field is optional and the value will be left out of the command, the commas that delimit the field position must still be retained. Two consecutive commas with no value between them tells OpCon that the null value should be assigned to the field in that position.

### Example of Using CPYTOMSGIN with XML-format Event commands

:::info Example 
A sample of the CPYTOMSGIN command supporting Dynamic Variable tokens for an XML Event:
```
 Command  . . . . : CPYTOMSGIN CPYMSGIN('<EVENT><TYPE>CONSOLE</TYPE><ACTION>
 DISPLAY</ACTION><MSG>'My message is {DVMSGTEXT}'</MSG></EVENT>')                                 
```
There is another example, just below, of using an Agent Dynamic Variable token to send a value to an OpCon Property.
:::

In the example above, Agent prompting for Event commands was used to select the CPYTOMSGIN command from the initial prompting list of XML commands.  Then the Agent offered a second prompting list of just the XML Event commands so that the XCONDSP command could be selected.  But as the results of this layered prompting were returned to the Agent function data entry, the CPYTOMSGIN command was formatted to include the raw XML <TAGS\>, which allows the user to then prompt for, or type, a Dynamic Variable {TOKEN} into any of the Event command parameters.  The Agent processing of the CPYTOMSGIN command scans the whole command for any Dynamic Variable tokens, and these are replaced by the token's current value at run time before the whole XML-formatted Event command string is transmitted to the OpCon server.

## Application Example: Sending IBM i values to OpCon Properties

IBM i values can be sent to OpCon Properties using the $PROPERTY:SET CSV-format Event command, or the XML-format command XPROPSET, from anywhere that the IBM i LSAM supports OpCon Events. OpCon Property tokens can then be used to reference these IBM i values as part of OpCon automation, wherever Property tokens are supported. 

The CPYTOMSGIN command provides excellent flexibility for the purpose of sending any value retrieved from the IBM i system to be stored in an OpCon Property. When the CPYTOMSGIN command is used, the command driver program will scan the entire external event command string looking for any IBM i LSAM Dynamic Variable tokens that might be replaced. It is very common to put an LSAM Dynamic Variable token into the value parameter of the OpCon $PROPERTY:SET command, so that any value retrieved by, or stored in a Dynamic Variable can be sent up to the OpCon server and stored into an OpCon Property.
:::tip
Remember that the XML-formatted External Event commands can be specified in their raw format and sent to the OpCon server by enclosing them in the Agent's CPYTOMSGIN command, as illustrated above in this document.
:::

Remember that OpCon Property names could be global properties, or they could be instance-qualified properties, possibly qualified to a specific schedule name or an OpCon job name within a schedule. It's possible to use Dynamic Variables to represent the OpCon schedule or job names. As well, within the LSAM automation tools, such as Message Management Parameters or their attached Response Rules, it is also possible to use one of the available $-System variable values identified a table in [Message Management Screens and Windows](../message-management/screens.md#-system-variables-supported-in-event-commands).

Here is an example of pushing the value from an IBM i LSAM Dynamic Variable up to an OpCon global property:

:::info Example 
Sending an IBM i value to an OpCon Property using CSV-formatted Event
```
CPYTOMSGIN CPYMSGIN('$PROPERTY:SET,my_opcon_property,{DISKPERCNT}')
```
Sending an IBM i value to an OpCon Property using XML-formatted Event
```
XPROPSET PROPNAME('OPCON_PROPERTY_NAME') PROPVALUE('{DISKPERCENT}')
```
:::

The example above assumes that the Dynamic Variable DISKPERCNT would previously have been loaded with the current IBM i disk utilization percentage, as would be possible from an Operator Replay script using a screen data Capture Application, linked to a Response Rule that stored the captured data into the Dynamic Variable.

Dynamic Variables are called "dynamic" because they can do more than just store static values. It's possible to assign a user-defined program to a Dynamic Variable master record that can perform any kind of calculation at run-time and return the value that will be used to replace the Dynamic Variable token.

The LSAM software includes both a pre-compiled SQL utility program and a model Control Language program that can be adapted as one of these Dynamic Variable user-defined programs, so that any Field value from an IBM i DB2 database file can be fetched as the Dynamic Variable at run time. The field value can also be trimmed down to use any part of the field value as the replacement for the Dynamic Variable token. The same model CL program also illustrates how to fetch a partial or complete value from an IBM i DB2 data area.


## Events Screens and Windows

### LSAEVTR02-0 - Event Management: Select format

LSAM sub-menu 3, option 1, supports testing and exploring the configuration of all available External Event commands.  When the menu option is selected, an initial screen allows the user to select between 1. XML External Event Commands or 2. CSV External Event Commands.

#### Fields
- **Selection entry**: Type a number from the list of options and press <**Enter**> to view Event commnands in the chosen format.

#### Functions
- **F3=Exit**: Quits the list and returns to the menu.
- **F12=Cancel**: Quits the list and returns to the menu.

#### Menu Pathways
- Main Menu > Events and Utilities (#3) > External Management (#1) 

### LSAEVTR02 - Event Management: List display

A list of Event commands is offered for manual testing of the commands. An External Event command can be selected from the list to (1) explore and optionally copy the format of a command, an (2) to intiate a live test of a command.  Following the prompted command data entry, pressing <**Enter**> will cause that command to be sent by the Agent to the OpCon server.  

One common use of this function is to verify that the External Event User and Token are properly registered. The XCONDSP (or CSV: CONDSP) command is recommended for simple connection test since it sends an obvious message to the SAM log that can be viewed from the OpCon user interface.

#### Menu Pathways

Main Menu > Events and Utilities (#3) > External Management (#1) > (#1) XML - Event Commands, or (#2) CSV - Event Commands.

#### Fields

**Selection**: Enter an Option number or the Command name to select an event.

:::tip
The option numbers are not assigned to Command names on a permanent basis. SMA may update the available list of Event Commands, which makes the Option number subject to change. This number is a sequential number that is assigned to each line at the time the information is assembled for display. If planning to use Operator Replay to select a command from this list, always specify the Command name instead of the Option number, otherwise it is necessary to go back and update the Operator Replay Scripts whenever the Event Command list is updated by SMA.
:::

#### Functions

- **F3=Exit**: Quits the Events list and returns to the menu.
- **F12=Cancel**: Quits the Events list and returns to the menu.
- **F17=Subset**: Requests the Subset window to either establish or remove a subset rule that limits the commands on display according to their Command Type.

### Event Management: Windows

#### Subset by Command Type

Pressing <**F17**> from the list of Event commands branches to a window display where a subset rule may be selected to limit the commands on the main list display.

#### Events Subset Window
```
          Subset by Command Type
Type a number, or blank to clear subset.
Press Enter to apply change or F12=Cancel.

   1 Generic               
   2 Job
   3 Log             
   4 Machine
   5 Notification            
   6 Schedule
   7 Threshold-Resources              
   8 Token
                         Bottom
Select type number: __
F12=Cancel
```
#### Fields

  | Field             | Default | Description
  | ----------------  | ------- | ---------------------------------------------- |
  Select type number  |   None   | Type one of the numbers appearing in the list of command types to set the subset value, or clear this input field and press <**Enter**> to remove subset rule.
  

#### Functions

- **F12=Cancel**: Quits the subset window and returns to the Event Management list.
- When sub-setting is in effect, the appearance of the Event Management screen changes slightly. The figure below shows a subsetted list of just the events for Command Type Job, and the <**F17**> function key legend has changed to show its new capability.
- While in the subset mode, <**F17**> can be used to change the Command Type being used for the subset. In order to clear the subset mode and return the Even Management list to a full display, just clear the Type Number value from the input field in the subset window and press <**Enter**>. This updates the subset window and returns to the main list display.

### LSAEVTR02 - CPYTOMSGIN Events prompt

#### CPYTOMSGIN Command Prompting Window

The general-purpose Event command CPYTOMSGIN is supported by an additional prompting window (when selected from within the context of the Event Management LSAM menu function) that lists all available OpCon Event commands.

For extended information about using the CPYTOMSGIN command, please refer to [Using CPYTOMSGIN](#using-cpytomsgin).

CPYTOMSGIN Event Selection Window
```
            CPYTOMSGIN Events
Position to desired Event, press Enter.
Press F12 to return without a selection.
OpCon Event Command

$CONSOLE:DISPLAY
$JOB:ADD
$JOB:ADDHLD
$JOB:BAD
$JOB:CANCEL
$JOB:DELETE
$JOB:GOOD
$JOB:HOLD
$JOB:KILL
$JOB:RELEASE
                                  More...
F12=Cancel
```

When the cursor is positioned over one the available commands, the
OpCon Event Command syntax model will be inserted into the Message
parameter on a prompt screen for the CPYTOMSGIN command, as illustrated
below.

##### Event Command Syntax Model
```
                               Copy to MSGIN (CPYTOMSGIN)
                               
Type choices, press Enter.

Message . . . . . . . . . . . . > '$JOB:CANCEL,<schedule date>,<schedule name>
,<job name>'__________________________________________________________________
______________________________________________________________________________
______________________________________________________________________________
______________________________________________________________________________
_______________________________________________________________________...
                                                                        Bottom

F3=Exit F4=Prompt F5=Refresh F12=Cancel F13=How to use this display
F24=More keys
```

In the syntax model illustrated above, the < > characters are used only to mark the description of each field. When the actual data is typed in place of the field description, the < > characters must be removed, just as the field description must also be removed. However, the commas are a critical part of the command syntax. If a field value is allowed to be left out of any particular command, the comma that marked that field location must still be retained. In this case, two consecutive commas would indicate to OpCon that the null value  should be applied to that field.

Press <**Enter**> after the command has been fully formatted to cause the final command format to be submitted to the LSAM for sending to OpCon.

:::note
When the CPYTOMSGIN prompting, as illustrated above, is accessed from within the Agent's automation tools master file maintenance functions, pressing <**Enter**> returns the formatted External Event command to the field where the cursor was located when the function key for prompting Events was pressed.
:::

Dynamic Variable tokens can be included anywhere within the CPYMSGIN keyword parameter:

:::info Example

```shell
CPYTOMSGIN CPYMSGIN('$JOB:CANCEL,,MySchedule,{JOBNAMEVAR}')
```

:::
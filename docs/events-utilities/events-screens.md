# Events Screens and Windows

## External Events Password

```jsx title="Events Password Window"

Type choices, press Enter

  User Name ....:  ___________

  Password  ....:

  Password  ....:

  (User and Pwd: 10 long max)
  F12 = Cancel
```

### Menu Pathways

Main Menu \> Events and Utilities (\#3) \> External Event Password (\#2)

### Fields

| Field       | Default     | Description |
| ----------- | ----------- | -------|
| User Name   | None        | A valid OpCon/xps user name |
| Password    | None        | The password that corresponds to the user name, as registered in the OpCon/xps system. |
| Password (repeat) | None | This value must match exactly the value entered in the first password field. |
 
### Functions

**F12=Cancel**: Quits the user/password window and returns to the Event
Management menu.

## Event Management

- **Screen Title**: Event Management (3 Pages)
- **Screen ID**: LSAEVTR02

### Menu Pathways

Main Menu \> Events and Utilities (\#3) \> External Management (\#1)

### Fields

**Slection**: Enter an Option number or the Command name to select an
event.

:::note
The option numbers are not assigned to Command names on a permanent basis. SMA may update the available list of Event Commands, which makes the Option number subject to change. This number is a sequential number that is assigned to each line at the time the information is assembled for display. When planning to use Operator Replay to select a command from this list, always specify the Command name instead of the Option number, otherwise it is necessary to go back and update the Operator Replay Scripts whenever the Event Command list is updated by SMA.
:::

### XML Events Management Options

#### Calendar
XCALADD - Calendar Add
*	To add calendar dates, enter an existing OpCon/xps Calendar Name.
*	Enter 1 to 10 dates to be added to the calendar
XCALDEL - Calendar Delete
*	To delete calendar dates, enter an existing OpCon/xps Calendar Name.
*	Enter 1 to 10 dates to be added to the calendar.
XJOBPRTY - Job Priority
*	To modify the job priority, enter an existing OpCon/xps schedule name, job name, schedule date and job priority.
*	The default Schedule date is CURRENT.

#### Job
XJOBADD - Job Add        
*	To add a job to the Daily Schedule, enter an existing OpCon/xps schedule name, job name, and schedule date, and frequency.
*	The default Schedule date is CURRENT.

XJOBADDHLD - Job Add Hold
*	To add a job on hold to the Daily Schedule, enter an existing OpCon/xps schedule name, job name, and schedule date, and frequency.
*	The default Schedule date is CURRENT.

XJOBBAD - Job Bad        
*	To mark a job bad, enter an existing  OpCon/xps schedule name, job  name, and schedule date.
*	The default Schedule date is CURRENT.

XJOBCNL - Job Cancel     
*	To cancel a job, enter an existing OpCon/xps schedule name, job name, and schedule date.
*	The default Schedule date is CURRENT.

XJOBDEL - Job Delete     
*	To delete a job from the Daily Schedule, enter an existing OpCon/xps schedule name, job name, and schedule date.
* The default Schedule date is CURRENT.

XJOBGOD - Job Good       
*	To mark a job as good, enter an existing OpCon/xps schedule name, job name, and schedule date.
*	The default Schedule date is CURRENT.

XJOBHLD - Job Hold
*	To put a job on hold, enter an existing OpCon/xps schedule name, job name, and schedule date.
*	The default Schedule date is CURRENT.

XJOBKIL - Job Kill
*	To kill a job, enter an existing OpCon/xps schedule name, job name, and schedule date.  
*	The default Schedule date is CURRENT.

XJOBMBLDST - Job Master Build State
*	To change the job master build status, enter an existing OpCon/xps schedule name, job name, frequency name and build status.
*	The default build status is blank.  Values are Released (R), Disabled (D), Skipped (S), Do Not Schedule (N), or Held (H).

XJOBMCHGRP - Job Machine Group
*	To assign a machine group, enter an existing OpCon/xps schedule name, job name, schedule date and machine group name.
*	The default Schedule date is CURRENT.

XJOBMTAGAD - Job Master Tag Add
*	To add a job master tag, enter an existing OpCon/xps schedule name, job name, frequency name and 1 to 5  tags.
*	If Frequency name is populated, tags are populated as a frequency tag.  If Frequency name is not populated, tags will be populated as a job tag. 

XJOBMTAGDL – Job Master Tag Delete
*	To delete a job master tag, enter an existing OpCon/xps schedule name, job name, frequency name and 1 to 5  tags.
*	If Frequency name is populated, tags are populated as a frequency tag.  If Frequency name is not populated, tags will be populated as a job tag.

XJOBPRTY - Job Priority
*	To modify the job priority, enter an existing OpCon/xps schedule name, job name, schedule date and job priority.
*	The default Schedule date is CURRENT.

XJOBRLS - Job Release    
*	To release a job, enter an existing OpCon/xps schedule name, job name, and schedule date.  
*	The default Schedule date is CURRENT.

XJOBRSC - Job Reschedule
To reschedule a job in the Daily Schedule, enter:
*	Enter an existing OpCon/xps schedule name.
*	Enter an existing OpCon/xps job name.
*	Enter a new start time offset code:
    * T: The new start time will be calculated based on the time the job terminated.
    * S: The new start time will be calculated based on the time the job started.
    * N: The new start time will be calculated based on the current time the event is processed. If the job had not run and the reschedule event is used, the T/S/N is disregarded and the offset will be the current time on the SAM machine plus the number of minutes specified in the event (similar to the use of the N value).
*	Enter the number of minutes to reschedule the job.
*	Enter the schedule date.
    * The default Schedule date is CURRENT.

XJOBRSCHLD - Job Reschedule Hold
To reschedule a job on hold in the Daily Schedule, enter:
*	Enter an existing OpCon/xps schedule name.
*	Enter an existing OpCon/xps job name.
    * Enter a new start time offset code:
    * T: The new start time will be calculated based on the time the job terminated.
    * S: The new start time will be calculated based on the time the job started.
    * N: The new start time will be calculated based on the current time the event is processed. If the job had not run and the reschedule event is used, the T/S/N is disregarded and the offset will be the current time on the SAM machine plus the number of minutes specified in the event (similar to the use of the N value).
*	Enter the number of minutes to reschedule the job.
*	Enter the schedule date.
*	The default Schedule date is CURRENT.

XJOBRST - Job Restart    
*	To restart a job, enter an OpCon/xps schedule name, job name, and schedule date.
*	The default Schedule date is CURRENT.

XJOBRSTHLD - Job Restart Hold
*	To restart a job on hold, enter an OpCon/xps schedule name, job name, and schedule date.
*	The default Schedule date is CURRENT.

XJOBSKP - Job Skip       
*	To skip a job, enter an existing OpCon/xps schedule name, job name, and schedule date.
*	The default Schedule date is CURRENT.

XJOBSTR - Job Start   
*	To start a job, enter an existing OpCon/xps schedule name, job name, and schedule date.
*	The default Schedule date is CURRENT.

XJOBTAGADD - Job Tag Add
*	To add a job tag, enter an existing OpCon/xps schedule name, job name, schedule date and 1 to 5 job tags.
*	The default Schedule date is CURRENT.

XJOBTAGDEL - Job Tad Delete
*	To delete a job tag, enter an existing OpCon/xps schedule name, job name, schedule date and 1 to 5 job tags.
*	The default Schedule date is CURRENT.

XJOBUSER - Job User
*	To change the job user, enter an existing OpCon/xps schedule name, job name, schedule date and user name.
*	The default Schedule date is CURRENT.

XMAXRUNTIM - Max Runtime
*	To modify the maximum runtime, enter an existing OpCon/xps schedule name, job name, schedule date and maximum runtime.
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
*	To process a schedule build, enter an existing OpCon/xps schedule name, schedule date, override existing schedule (Y/N), log file name path and up to 5 properties.
*	The default Schedule date is CURRENT.

XSCHBLDHLD - Schedule Build on Hold
*	To process a schedule build, enter an existing OpCon/xps schedule name, schedule date, override existing schedule (Y/N), log file name path and up to 5 properties.
*	The default Schedule date is CURRENT.

XSCHCHK - Schedule Check (one
*	To check a schedule, enter an existing OpCon/xps Schedule's name, date and include circular dependencies.
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
*	To cancel a schedule, enter an existing OpCon/xps Schedule's name and date.
*	The default Schedule date is CURRENT.

XSCHDLT - Schedule Delete       
*	To delete a schedule, enter an existing OpCon/xps Schedule’s name and date.
o	The default Schedule date is CURRENT.

XSCHHLD - Schedule Hold         
*	To place a schedule On Hold, enter an existing OpCon/xps Schedule's name and date.
*	The default Schedule date is CURRENT.

XSCHRLS - Schedule Release      
*	To release a schedule, enter an existing OpCon/xps Schedule's name and date.
*	The default Schedule date is CURRENT.

XSCHSTR - Schedule Start
*	To start a schedule, enter an existing OpCon/xps Schedule's name and date.
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


### CSV Events Management Options

#### Job
JOBBAD - Job Bad
*	To mark a job bad, enter an existing OpCon/xps schedule name, job name, and schedule date.
*	The default Schedule date is CURRENT.

JOBCNL - Job Cancel
*	To cancel a job, enter an existing OpCon/xps schedule name, job name, and schedule date.
*	The default Schedule date is CURRENT.

JOBDEL - Job Delete
*	To delete a job from the Daily Schedule, enter an existing OpCon/xps schedule name, job name, and schedule date.
*	The default Schedule date is CURRENT.

JOBHLD - Job Hold
*	To put a job on hold, enter an existing OpCon/xps schedule name, job name, and schedule date.
*	The default Schedule date is CURRENT.

JOBRLS – Job Release
*	To release a job, enter an existing OpCon/xps schedule name, job name, and schedule date.
*	The default Schedule date is CURRENT.

JOBHLD - Job Hold
*	To put a job on hold, enter an existing OpCon/xps schedule name, job name, and schedule date.
*	The default Schedule date is CURRENT.

JOBRSC - Job Reschedule
To reschedule a job in the Daily Schedule, enter:
*	Enter an existing OpCon/xps schedule name.
*	Enter an existing OpCon/xps job name.
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
*	To cancel a schedule, enter an existing OpCon/xps Schedule's name and date.
*	The default Schedule date is CURRENT.

SCHHLD – Schedule Hold
*	To place a schedule On Hold, enter an existing OpCon/xps Schedule's name and date.
*	The default Schedule date is CURRENT.

SCHRLS – Schedule Release
*	To release a schedule, enter an existing OpCon/xps Schedule's name and date.
*	The default Schedule date is CURRENT.

SCHSTR – Schedule Start
*	To start a schedule, enter an existing OpCon/xps Schedule's name and date.
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


##### Functions

- **F3=Exit**: Quits the Events list and returns to the menu.
- **F12=Cancel**: Quits the Events list and returns to the menu.
- **F17=Subset**: Requests the Subset window to either establish or
    remove a subset rule that limits the commands on display according
    to their Command Type.

### Windows

#### Subset by Command Type

Pressing \<**F17**\> from the list of Event commands branches to a
window display where a subset rule may be selected to limit the commands
on the main list display.

Events Subset Window

  -----------------------------------------------------
                 Subset by Command Type
        Type a number, or blank to clear subset.
       Press Enter to apply change or F12=Cancel.
                             
            1 [Generic]{style="color: #ff00ff;"}               2 [Job]{style="color: #ff00ff;"}
              3 [Log]{style="color: #ff00ff;"}             4 [Machine]{style="color: #ff00ff;"}
         5 [Notification]{style="color: #ff00ff;"}            6 [Schedule]{style="color: #ff00ff;"}

7 [Threshold-Resources]{style="color: #ff00ff;"}              8 [Token]{style="color: #ff00ff;"}
                         Bottom
                 Select type number: \_\_
                        F12=Cancel
  -----------------------------------------------------

##### Fields

  Field                 Default  Description
  -------------------- --------- --------------------------------------------------------------------------------------------------------------------------------------------------------------
  Select type number     None    Type one of the numbers appearing in the list of command types to set the subset value, or clear this input field and press \<Enter\> to remove subset rule.

  :  

##### Functions

- **F12=Cancel**: Quits the subset window and returns to the Event
    Management list.
- When sub-setting is in effect, the appearance of the Event
    Management screen changes slightly. The figure below shows a
    subsetted list of just the events for Command Type Job, and the
    \<**F17**\> function key legend has changed to show its new
    capability.
- While in the subset mode, \<**F17**\> can be used to change the
    Command Type being used for the subset. In order to clear the subset
    mode and return the Even Management list to a full display, just
    clear the Type Number value from the input field in the subset
    window and press \<**Enter**\>. This updates the subset window and
    returns to the main list display.

- **Screen Title**: Event Management
- **Screen ID**: LSAEVTR02

#### CPYTOMSGIN Command Prompting Window

The general-purpose Event command CPYTOMSGIN is supported by an
additional prompting window (when selected from within the context of
the Event Management LSAM menu function) that lists all available
OpCon/xps Event commands.

CPYTOMSGIN Event Selection Window
```
          CPYTOMSGIN Events
Position to desired Event, press Enter.
Press F12 to return without a selection.
OpCon/xps Event Command

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
OpCon/xps Event Command syntax model will be inserted into the Message
parameter on a prompt screen for the CPYTOMSGIN command, as illustrated
below.

Event Command Syntax Model
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

In the syntax model illustrated above, the \< \> characters are used
only to mark the description of each field. When the actual data is
typed in place of the field description, the \< \> characters must be
removed, just as the field description must also be removed. However,
the commas are a critical part of the command syntax. If a field value
is allowed to be left out of any particular command, the comma that
marked that field location must still be retained. In this case, two
consecutive commas would indicate to OpCon/xps that the null value
should be applied to that field.

Press \<**Enter**\> after the command has been fully formatted to cause
the final command format to be submitted to the LSAM for sending to
OpCon/xps.

Dynamic Variable tokens can be included anywhere within the CPYMSGIN
keyword parameter:

:::info Example

```shell
CPYTOMSGIN CPYMSGIN('$JOB:CANCEL,,MySchedule,{JOBNAMEVAR}')
```

:::

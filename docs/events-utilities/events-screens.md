# Events Screens and Windows

## External Events Password

Events Password Window

  -----------------------------------------

Type choices, press Enter

  User Name \....:  \_\_\_\_\_\_\_\_\_\_

  Password  \....:

  Password  \....:

  (User and Pwd: 10 long max)
  F12 = Cancel
  -----------------------------------------

##### Menu Pathways

Main Menu \> Events and Utilities (\#3) \> External Event Password (\#2)

##### Fields

  Field                Default  Description
  ------------------- --------- ----------------------------------------------------------------------------------------
  User Name             None    A valid OpCon/xps user name
  Password              None    The password that corresponds to the user name, as registered in the OpCon/xps system.
  Password (repeat)     None    This value must match exactly the value entered in the first password field.

  :  

##### Functions

**F12=Cancel**: Quits the user/password window and returns to the Event
Management menu.

## Event Management

- **Screen Title**: Event Management (3 Pages)
- **Screen ID**: LSAEVTR02

##### Menu Pathways

Main Menu \> Events and Utilities (\#3) \> External Management (\#1)

##### Fields

**Slection**: Enter an Option number or the Command name to select an
event.

:::note
The option numbers are not assigned to Command names on a permanent basis. SMA may update the available list of Event Commands, which makes the Option number subject to change. This number is a sequential number that is assigned to each line at the time the information is assembled for display. When planning to use Operator Replay to select a command from this list, always specify the Command name instead of the Option number, otherwise it is necessary to go back and update the Operator Replay Scripts whenever the Event Command list is updated by SMA.
:::

Event Management Options

+-----------------+-----------------+------------+-----------------+
| Events          |                 |            |                 |
| Management      |                 |            |                 |
| Options         |                 |            |                 |
+=================+=================+============+=================+
| Command Type    | Name            | Command    | Description     |
+-----------------+-----------------+------------+-----------------+
| Schedule        | Schedule Cancel | SCHCNL     | -   To cancel a |
|                 |                 |            |     schedule,   |
|                 |                 |            |     enter an    |
|                 |                 |            |     existing    |
|                 |                 |            |     OpCon/xps   |
|                 |                 |            |     Schedule\'s |
|                 |                 |            |     name and    |
|                 |                 |            |     date.       |
|                 |                 |            | -   The default |
|                 |                 |            |     Schedule    |
|                 |                 |            |     date is     |
|                 |                 |            |     CURRENT.    |
+-----------------+-----------------+------------+-----------------+
|                 | Schedule Hold   | SCHHLD     | -   To place a  |
|                 |                 |            |     schedule On |
|                 |                 |            |     Hold, enter |
|                 |                 |            |     an existing |
|                 |                 |            |     OpCon/xps   |
|                 |                 |            |     Schedule\'s |
|                 |                 |            |     name and    |
|                 |                 |            |     date.       |
|                 |                 |            | -   The default |
|                 |                 |            |     Schedule    |
|                 |                 |            |     date is     |
|                 |                 |            |     CURRENT.    |
+-----------------+-----------------+------------+-----------------+
|                 | Schedule        | SCHRLS     | -   To release  |
|                 | Release         |            |     a schedule, |
|                 |                 |            |     enter an    |
|                 |                 |            |     existing    |
|                 |                 |            |     OpCon/xps   |
|                 |                 |            |     Schedule\'s |
|                 |                 |            |     name and    |
|                 |                 |            |     date.       |
|                 |                 |            | -   The default |
|                 |                 |            |     Schedule    |
|                 |                 |            |     date is     |
|                 |                 |            |     CURRENT.    |
+-----------------+-----------------+------------+-----------------+
|                 | Schedule Start  | SCHSTR     | -   To start a  |
|                 |                 |            |     schedule,   |
|                 |                 |            |     enter an    |
|                 |                 |            |     existing    |
|                 |                 |            |     OpCon/xps   |
|                 |                 |            |     Schedule\'s |
|                 |                 |            |     name and    |
|                 |                 |            |     date.       |
|                 |                 |            | -   The default |
|                 |                 |            |     Schedule    |
|                 |                 |            |     date is     |
|                 |                 |            |     CURRENT.    |
+-----------------+-----------------+------------+-----------------+
| Thre            | Threshold Set   | THRSET     | To set a        |
| shold-Resources |                 |            | threshold,      |
|                 |                 |            | enter a valid   |
|                 |                 |            | threshold name  |
|                 |                 |            | and value.      |
|                 |                 |            | Refer to        |
|                 |                 |            | [               | |                 |                 |            | Thresholds](htt |
|                 |                 |            | ps://help.smate |
|                 |                 |            | chnologies.com/ |
|                 |                 |            | opcon/core/late |
|                 |                 |            | st/Files/Concep |
|                 |                 |            | ts/Thresholds.h |
|                 |                 |            | tm#top){.MCXref |
|                 |                 |            | .xref} in the   |
|                 |                 |            | **Concepts**    |
|                 |                 |            | online help.    |
+-----------------+-----------------+------------+-----------------+
|                 | Resource Set    | RESSET     | To set a        |
|                 |                 |            | resource, enter |
|                 |                 |            | a valid         |
|                 |                 |            | resource name   |
|                 |                 |            | and value.      |
|                 |                 |            | Refer to        |
|                 |                 |            | [Resources](ht  |
|                 |                 |            | tps://help.smat |
|                 |                 |            | echnologies.com |
|                 |                 |            | /opcon/core/lat |
|                 |                 |            | est/Files/Conce |
|                 |                 |            | pts/Resources.h |
|                 |                 |            | tm#top){.MCXref |
|                 |                 |            | .xref} in the   |
|                 |                 |            | **Concepts**    |
|                 |                 |            | online help.    |
+-----------------+-----------------+------------+-----------------+
| Token           | Token Add       | TOKADD     | To add a token, |
|                 |                 |            | enter a valid   |
|                 |                 |            | token name and  |
|                 |                 |            | value. Refer to |
|                 |                 |            | [Properties]    | |                 |                 |            | (<https://help.s> |
|                 |                 |            | matechnologies. |
|                 |                 |            | com/opcon/core/ |
|                 |                 |            | latest/Files/Co |
|                 |                 |            | ncepts/Properti |
|                 |                 |            | es.md){.MCXref |
|                 |                 |            | .xref} in the   |
|                 |                 |            | **Concepts**    |
|                 |                 |            | online help.    |
+-----------------+-----------------+------------+-----------------+
|                 | Token Delete    | TOKDEL     | To delete a     |
|                 |                 |            | token, enter a  |
|                 |                 |            | valid token     |
|                 |                 |            | name. Refer to  |
|                 |                 |            | [Properties]    | |                 |                 |            | (<https://help.s> |
|                 |                 |            | matechnologies. |
|                 |                 |            | com/opcon/core/ |
|                 |                 |            | latest/Files/Co |
|                 |                 |            | ncepts/Properti |
|                 |                 |            | es.md){.MCXref |
|                 |                 |            | .xref} in the   |
|                 |                 |            | **Concepts**    |
|                 |                 |            | online help.    |
+-----------------+-----------------+------------+-----------------+
|                 | Token Set       | TOKSET     | To set a token, |
|                 |                 |            | enter a valid   |
|                 |                 |            | token name and  |
|                 |                 |            | value. Refer to |
|                 |                 |            | [Properties]    | |                 |                 |            | (<https://help.s> |
|                 |                 |            | matechnologies. |
|                 |                 |            | com/opcon/core/ |
|                 |                 |            | latest/Files/Co |
|                 |                 |            | ncepts/Properti |
|                 |                 |            | es.md){.MCXref |
|                 |                 |            | .xref} in the   |
|                 |                 |            | **Concepts**    |
|                 |                 |            | online help.    |
+-----------------+-----------------+------------+-----------------+
| Log             | Console Display | CONDSP     | To send a       |
|                 |                 |            | message to the  |
|                 |                 |            | SAM log file,   |
|                 |                 |            | enter a text    |
|                 |                 |            | message. Refer  |
|                 |                 |            | to [External    | |                 |                 |            | Events](https:  |
|                 |                 |            | //help.smatechn |
|                 |                 |            | ologies.com/opc |
|                 |                 |            | on/core/latest/ |
|                 |                 |            | Files/OpCon-E |
|                 |                 |            | vents/Defining% |
|                 |                 |            | 20Events.md#Ex |
|                 |                 |            | ternal){.MCXref |
|                 |                 |            | .xref} in the   |
|                 |                 |            | **OpCon         |
|                 |                 |            | Events** online |
|                 |                 |            | help.           |
+-----------------+-----------------+------------+-----------------+
| Notification    | Event Log       | EVTLOG     | **No longer     |
|                 |                 |            | supported.**    |
|                 |                 |            | Existing uses   |
|                 |                 |            | of this command |
|                 |                 |            | are now         |
|                 |                 |            | supported by    |
|                 |                 |            | NTYLOG, using a |
|                 |                 |            | severity of I = |
|                 |                 |            | info. The       |
|                 |                 |            | default         |
|                 |                 |            | Notification ID |
|                 |                 |            | will be         |
|                 |                 |            | SMA0202.        |
+-----------------+-----------------+------------+-----------------+
|                 | Notify Action   | NTYACT     | **No longer     |
|                 |                 |            | supported.**    |
|                 |                 |            | Existing uses   |
|                 |                 |            | of this command |
|                 |                 |            | are routed to   |
|                 |                 |            | processing of   |
|                 |                 |            | the NTYLOG      |
|                 |                 |            | command.        |
+-----------------+-----------------+------------+-----------------+
|                 | Notify Log      | NTYLOG     | To send a       |
|                 |                 |            | notification,   |
|                 |                 |            | enter Severity  |
|                 |                 |            | (I, W or E),    |
|                 |                 |            | Notification ID |
|                 |                 |            | (up to 7        |
|                 |                 |            | characters),    |
|                 |                 |            | and text        |
|                 |                 |            | message. Refer  |
|                 |                 |            | to              |
|                 |                 |            | [Notification   | |                 |                 |            | Events](ht      |
|                 |                 |            | tps://help.smat |
|                 |                 |            | echnologies.com |
|                 |                 |            | /opcon/core/lat |
|                 |                 |            | est/Files/OpCon |
|                 |                 |            | -Events/Event |
|                 |                 |            | -Types.md#No |
|                 |                 |            | tifica){.MCXref |
|                 |                 |            | .xref} in the   |
|                 |                 |            | **OpCon         |
|                 |                 |            | Events** online |
|                 |                 |            | help.           |
+-----------------+-----------------+------------+-----------------+
| Job             | Job Bad         | JOBBAD     | -   To mark a   |
|                 |                 |            |     job bad,    |
|                 |                 |            |     enter an    |
|                 |                 |            |     existing    |
|                 |                 |            |     OpCon/xps   |
|                 |                 |            |     schedule    |
|                 |                 |            |     name, job   |
|                 |                 |            |     name, and   |
|                 |                 |            |     schedule    |
|                 |                 |            |     date.       |
|                 |                 |            | -   The default |
|                 |                 |            |     Schedule    |
|                 |                 |            |     date is     |
|                 |                 |            |     CURRENT.    |
+-----------------+-----------------+------------+-----------------+
|                 | Job Cancel      | JOBCNL     | -   To cancel a |
|                 |                 |            |     job, enter  |
|                 |                 |            |     an existing |
|                 |                 |            |     OpCon/xps   |
|                 |                 |            |     schedule    |
|                 |                 |            |     name, job   |
|                 |                 |            |     name, and   |
|                 |                 |            |     schedule    |
|                 |                 |            |     date.       |
|                 |                 |            | -   The default |
|                 |                 |            |     Schedule    |
|                 |                 |            |     date is     |
|                 |                 |            |     CURRENT.    |
+-----------------+-----------------+------------+-----------------+
|                 | Job Delete      | JOBDEL     | -   To delete a |
|                 |                 |            |     job from    |
|                 |                 |            |     the Daily   |
|                 |                 |            |     Schedule,   |
|                 |                 |            |     enter an    |
|                 |                 |            |     existing    |
|                 |                 |            |     OpCon/xps   |
|                 |                 |            |     schedule    |
|                 |                 |            |     name, job   |
|                 |                 |            |     name, and   |
|                 |                 |            |     schedule    |
|                 |                 |            |     date.       |
|                 |                 |            | -   The default |
|                 |                 |            |     Schedule    |
|                 |                 |            |     date is     |
|                 |                 |            |     CURRENT.    |
+-----------------+-----------------+------------+-----------------+
|                 | Job Hold        | JOBHLD     | -   To put a    |
|                 |                 |            |     job on      |
|                 |                 |            |     hold, enter |
|                 |                 |            |     an existing |
|                 |                 |            |     OpCon/xps   |
|                 |                 |            |     schedule    |
|                 |                 |            |     name, job   |
|                 |                 |            |     name, and   |
|                 |                 |            |     schedule    |
|                 |                 |            |     date.       |
|                 |                 |            | -   The default |
|                 |                 |            |     Schedule    |
|                 |                 |            |     date is     |
|                 |                 |            |     CURRENT.    |
+-----------------+-----------------+------------+-----------------+
|                 | Job Release     | JOBRLS     | -   To release  |
|                 |                 |            |     a job,      |
|                 |                 |            |     enter an    |
|                 |                 |            |     existing    |
|                 |                 |            |     OpCon/xps   |
|                 |                 |            |     schedule    |
|                 |                 |            |     name, job   |
|                 |                 |            |     name, and   |
|                 |                 |            |     schedule    |
|                 |                 |            |     date.       |
|                 |                 |            | -   The default |
|                 |                 |            |     Schedule    |
|                 |                 |            |     date is     |
|                 |                 |            |     CURRENT.    |
+-----------------+-----------------+------------+-----------------+
|                 | Job Hold        | JOBHLD     | -   To put a    |
|                 |                 |            |     job on      |
|                 |                 |            |     hold, enter |
|                 |                 |            |     an existing |
|                 |                 |            |     OpCon/xps   |
|                 |                 |            |     schedule    |
|                 |                 |            |     name, job   |
|                 |                 |            |     name, and   |
|                 |                 |            |     schedule    |
|                 |                 |            |     date.       |
|                 |                 |            | -   The default |
|                 |                 |            |     Schedule    |
|                 |                 |            |     date is     |
|                 |                 |            |     CURRENT.    |
+-----------------+-----------------+------------+-----------------+
| Job             | Job Reschedule  | JOBRSC     | To reschedule a |
|                 |                 |            | job in the      |
|                 |                 |            | Daily Schedule, |
|                 |                 |            | enter:          |
|                 |                 |            |                 |
|                 |                 |            | -   Enter an    |
|                 |                 |            |     existing    |
|                 |                 |            |     OpCon/xps   |
|                 |                 |            |     schedule    |
|                 |                 |            |     name.       |
|                 |                 |            | -   Enter an    |
|                 |                 |            |     existing    |
|                 |                 |            |     OpCon/xps   |
|                 |                 |            |     job name.   |
|                 |                 |            | -   Enter a new |
|                 |                 |            |     start time  |
|                 |                 |            |     offset      |
|                 |                 |            |     code:       |
|                 |                 |            |     -   T: The  |
|                 |                 |            |         new     |
|                 |                 |            |         start   |
|                 |                 |            |         time    |
|                 |                 |            |         will be |
|                 |                 |            |                 |
|                 |                 |            |      calculated |
|                 |                 |            |         based   |
|                 |                 |            |         on the  |
|                 |                 |            |         time    |
|                 |                 |            |         the job |
|                 |                 |            |                 |
|                 |                 |            |     terminated. |
|                 |                 |            |     -   S: The  |
|                 |                 |            |         new     |
|                 |                 |            |         start   |
|                 |                 |            |         time    |
|                 |                 |            |         will be |
|                 |                 |            |                 |
|                 |                 |            |      calculated |
|                 |                 |            |         based   |
|                 |                 |            |         on the  |
|                 |                 |            |         time    |
|                 |                 |            |         the job |
|                 |                 |            |                 |
|                 |                 |            |        started. |
|                 |                 |            |     -   N: The  |
|                 |                 |            |         new     |
|                 |                 |            |         start   |
|                 |                 |            |         time    |
|                 |                 |            |         will be |
|                 |                 |            |                 |
|                 |                 |            |      calculated |
|                 |                 |            |         based   |
|                 |                 |            |         on the  |
|                 |                 |            |         current |
|                 |                 |            |         time    |
|                 |                 |            |         the     |
|                 |                 |            |         event   |
|                 |                 |            |         is      |
|                 |                 |            |                 |
|                 |                 |            |      processed. |
|                 |                 |            |         If the  |
|                 |                 |            |         job had |
|                 |                 |            |         not run |
|                 |                 |            |         and the |
|                 |                 |            |                 |
|                 |                 |            |      reschedule |
|                 |                 |            |         event   |
|                 |                 |            |         is      |
|                 |                 |            |         used,   |
|                 |                 |            |         the     |
|                 |                 |            |         T/S/N   |
|                 |                 |            |         is      |
|                 |                 |            |                 |
|                 |                 |            |     disregarded |
|                 |                 |            |         and the |
|                 |                 |            |         offset  |
|                 |                 |            |         will be |
|                 |                 |            |         the     |
|                 |                 |            |         current |
|                 |                 |            |         time on |
|                 |                 |            |         the SAM |
|                 |                 |            |         machine |
|                 |                 |            |         plus    |
|                 |                 |            |         the     |
|                 |                 |            |         number  |
|                 |                 |            |         of      |
|                 |                 |            |         minutes |
|                 |                 |            |                 |
|                 |                 |            |       specified |
|                 |                 |            |         in the  |
|                 |                 |            |         event   |
|                 |                 |            |                 |
|                 |                 |            |        (similar |
|                 |                 |            |         to the  |
|                 |                 |            |         use of  |
|                 |                 |            |         the N   |
|                 |                 |            |         value). |
|                 |                 |            | -   Enter the   |
|                 |                 |            |     number of   |
|                 |                 |            |     minutes to  |
|                 |                 |            |     reschedule  |
|                 |                 |            |     the job.    |
|                 |                 |            | -   Enter the   |
|                 |                 |            |     schedule    |
|                 |                 |            |     date.       |
|                 |                 |            | -   The default |
|                 |                 |            |     Schedule    |
|                 |                 |            |     date is     |
|                 |                 |            |     CURRENT.    |
+-----------------+-----------------+------------+-----------------+
|                 | Job Restart     | JOBRST     | -   To restart  |
|                 |                 |            |     a job,      |
|                 |                 |            |     enter an    |
|                 |                 |            |     OpCon/xps   |
|                 |                 |            |     schedule    |
|                 |                 |            |     name, job   |
|                 |                 |            |     name, and   |
|                 |                 |            |     schedule    |
|                 |                 |            |     date.       |
|                 |                 |            | -   The default |
|                 |                 |            |     Schedule    |
|                 |                 |            |     date is     |
|                 |                 |            |     CURRENT.    |
+-----------------+-----------------+------------+-----------------+
|                 | Job Skip        | JOBSKP     | -   To skip a   |
|                 |                 |            |     job, enter  |
|                 |                 |            |     an existing |
|                 |                 |            |     OpCon/xps   |
|                 |                 |            |     schedule    |
|                 |                 |            |     name, job   |
|                 |                 |            |     name, and   |
|                 |                 |            |     schedule    |
|                 |                 |            |     date.       |
|                 |                 |            | -   The default |
|                 |                 |            |     Schedule    |
|                 |                 |            |     date is     |
|                 |                 |            |     CURRENT.    |
+-----------------+-----------------+------------+-----------------+
|                 | Job Start       | JOBSTR     | -   To start a  |
|                 |                 |            |     job, enter  |
|                 |                 |            |     an existing |
|                 |                 |            |     OpCon/xps   |
|                 |                 |            |     schedule    |
|                 |                 |            |     name, job   |
|                 |                 |            |     name, and   |
|                 |                 |            |     schedule    |
|                 |                 |            |     date.       |
|                 |                 |            | -   The default |
|                 |                 |            |     Schedule    |
|                 |                 |            |     date is     |
|                 |                 |            |     CURRENT.    |
+-----------------+-----------------+------------+-----------------+
|                 | Job Add         | ADD        | -   To add a    |
|                 |                 |            |     job to the  |
|                 |                 |            |     Daily       |
|                 |                 |            |     Schedule,   |
|                 |                 |            |     enter an    |
|                 |                 |            |     existing    |
|                 |                 |            |     OpCon/xps   |
|                 |                 |            |     schedule    |
|                 |                 |            |     name, job   |
|                 |                 |            |     name, and   |
|                 |                 |            |     schedule    |
|                 |                 |            |     date, and   |
|                 |                 |            |     frequency.  |
|                 |                 |            | -   The default |
|                 |                 |            |     Schedule    |
|                 |                 |            |     date is     |
|                 |                 |            |     CURRENT.    |
+-----------------+-----------------+------------+-----------------+
| Machine         | Machine Status  | MACSTS     | -   To change a |
|                 |                 |            |     machine\'s  |
|                 |                 |            |     status,     |
|                 |                 |            |     enter an    |
|                 |                 |            |     existing    |
|                 |                 |            |     OpCon/xps   |
|                 |                 |            |     machine     |
|                 |                 |            |     name and    |
|                 |                 |            |     its new     |
|                 |                 |            |     state.      |
|                 |                 |            | -   Valid       |
|                 |                 |            |     values for  |
|                 |                 |            |     the Machine |
|                 |                 |            |     State are U |
|                 |                 |            |     (Up) and D  |
|                 |                 |            |     (Down).     |
+-----------------+-----------------+------------+-----------------+
| Generic Command | Copy to message | CPYTOMSGIN | -               |
|                 | In              |            |    Communicates |
|                 |                 |            |     any of the  |
|                 |                 |            |     OpCon/xps   |
|                 |                 |            |     Event       |
|                 |                 |            |     commands    |
|                 |                 |            |     from the    |
|                 |                 |            |     LSAM to     |
|                 |                 |            |     SAM.        |
|                 |                 |            |     Available   |
|                 |                 |            |     command     |
|                 |                 |            |     templates   |
|                 |                 |            |     will be     |
|                 |                 |            |     shown in a  |
|                 |                 |            |     prompting   |
|                 |                 |            |     window when |
|                 |                 |            |     this        |
|                 |                 |            |     command is  |
|                 |                 |            |     selected    |
|                 |                 |            |     from the    |
|                 |                 |            |     LSAM Event  |
|                 |                 |            |     Management  |
|                 |                 |            |     list of     |
|                 |                 |            |     Event       |
|                 |                 |            |     commands.   |
|                 |                 |            | -   CPYTOMSGIN  |
|                 |                 |            |     supports    |
|                 |                 |            |     Dynamic     |
|                 |                 |            |     Variable    |
|                 |                 |            |     tokens      |
|                 |                 |            |     anywhere    |
|                 |                 |            |     within the  |
|                 |                 |            |     CPYMSGIN    |
|                 |                 |            |     command     |
|                 |                 |            |     parameter.  |
+-----------------+-----------------+------------+-----------------+
|                 | LSAM Command    | SMACMD     | Processing of   |
|                 |                 |            | this old form   |
|                 |                 |            | of generic      |
|                 |                 |            | Event command   |
|                 |                 |            | entry is now    |
|                 |                 |            | routed to       |
|                 |                 |            | CPYTOMSGIN.     |
+-----------------+-----------------+------------+-----------------+

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

  ---------------------------------------------------------
                      CPYTOMSGIN Events
           Position to desired Event, press Enter.
          Press F12 to return without a selection.
                               
                   OpCon/xps Event Command

[\$CONSOLE:DISPLAY]{style="background-color: #00ff00;"}                       \$JOB:ADD
                        \$JOB:ADDHLD
                          \$JOB:BAD
                        \$JOB:CANCEL
                        \$JOB:DELETE
                         \$JOB:GOOD
                         \$JOB:HOLD
                         \$JOB:KILL
                        \$JOB:RELEASE
                          More\...
                         F12=Cancel
  ---------------------------------------------------------

When the cursor is positioned over one the available commands, the
OpCon/xps Event Command syntax model will be inserted into the Message
parameter on a prompt screen for the CPYTOMSGIN command, as illustrated
below.

Event Command Syntax Model

  ----------------------------------------------------------------------------------------------------------------------------------------------------------
                                                                  Copy to MSGIN (CPYTOMSGIN)
                                                                               
                                                                  Type choices, press Enter.

[ Message . . . . . . . . . . . . \>]{style="color: #008000;"} [\'\$JOB:CANCEL,\<schedule date\>,\<schedule name\>]{style="text-decoration: underline;"}                                       ,\<job name\>\'

         [                                                                     ]{style="text-decoration: underline;"} [\...]{style="color: #0000ff;"}

                                                                            Bottom
                                         F3=Exit   F4=Prompt   F5=Refresh   F12=Cancel   F13=How to use this display
                                                                        F24=More keys
  ----------------------------------------------------------------------------------------------------------------------------------------------------------

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

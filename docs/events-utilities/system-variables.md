---
sidebar_label: '$-System Variables'
---
# $-System Variables
$-System variables are pre-defined variable name strings that the Agent will replace with values that the Agent stores while processing various of its automation tools.  Each Agent feature that supports $-System variables has its own list of system values that are logically available for that feature.


*(EDITOR'S NOTE:  Update this section with lists that apply to LSAM version 18.1)*

The Response Rule Command field and the Message Management Parameter Event Command field support a list of reserved special variables that begin with the US dollar sign ($). These variables are replaced by IBM i or OpCon job characteristics, and for Message Management the $MSG variable is replaced by the actual Primary message text.

### Command Line $-System variables
-  $FREQUENCY NAME:   The name of the OpCon/xps frequency table that was assigned to the job that issued the message.
-  $IBM JOB ID:       The IBM i current job ID, in this format: 123456/JOBUSER/JOBNAME.
-  $IBM JOB NAME:     The IBM i current Job Name.
-  $IBM JOB NBR:      The IBM i current Job Number (always 6 digits, but handled as characters).
-  $IBM JOB USER:     The IBM i current Job User Name (IBM i User Profile that started the job).
-  $JOBID:            The OpCon job identifier, a 10-digit number.
-  $JOBID CMP:        The OpCon job name and job identifier, joined into a single string with blanks compressed out.
-  $JOBID LONG:       The OpCon job name followed by the job identifier, with all blanks retained in the string.
-  $JOB NAME:         The OpCon job name.
-  $JOB LONG NAME:    The long format of the complete OpCon job name.
-  $MACHINE NAME:     The OpCon name for the LSAM job scheduler, normally the same as the LSAM Name specified in the LSAM Parameters (but the value supplied by OpCon with the job start request is used here).
-  $MSG:              **Note**: $MSG is not supported in the Response Rule command line, although it appears in the list for F10=$VAR when a Response Rule is attached to a Message Data Capture Application. It is only supported in the Event Command line of a Message Management Parameter. Use Primary text capture or SETDYNVAR command to share $MSG with Response Rules. Refer to Message Management.
-  $MSGID:            **Note:** $MSGID is not supported in the Response Rule command line, although it appears in the list for F10=$VAR when a Response Rule is attached to a Message Data Capture Application. It is only supported in the Event Command line of a Message Management Parameter. Use the SETDYNVAR command to share $MSGID with Response Rules. Refer to Message Management.
-  $SCHEDULE DATE:    The date of the OpCon schedule under which the current job was started, in the (\*ISO0) format of CCYYMMDD.
-  $SCHEDULE NAME:    The name of the OpCon schedule under which the current job was started.

Within the LSAM, the variable token does not require any special brackets or other characters. It is only necessary to start with the $ sign, use all capital letters, and include one space between the name parts, as shown in the table above. Refer to the follow Rules section for information about the values that will actually be provided to replace each of the $-Variable tokens.

## Rules For $-System variables

When using the $-System variables, the following constraints apply, depending on the LSAM feature that is executing:

1. The $MSG variable is only available to the Message Management Parameters master record itself, within the Event Command line. This variable is not supported for Response Rules.

*(EDITOR'S NOTE:  Is this still true back at 18.1 ?)*

2. The job that is referenced for providing OpCon and IBM job identifier values varies per LSAM feature, according to the following list.

    a.  **Message Management**
    - IBM Job ID = the job that issued the message. The OpCon information will not be available if that job was not started by, or Tracked by OpCon.
    - The IBM i Job ID that is stored with the Capture Log record for captured message data is the ID of the job that issued the message instead of the LSAM Message Management server job (as in older versions of this Agent software).

    b.  **Operator Replay**
    - IBM Job ID = the script driver job, which is the job that shows in the OpCon Schedule.
    - Unfortunately, the actual virtual workstation job itself cannot be referenced by the $-System variables. To obtain the IBM i job identifiers for the virtual workstation job it is (currently) necessary to execute extra steps that will display the job ID on the screen, and then use Capture Data rules and Response Rules to store those values into dynamic variables.

    c.  **SCANSPLF (Scan Spool Files)**
    - IBM Job ID = the job ID will vary depending on the type of task using this command. Sometimes it will be the ID of the Spool File job, other times it will be the job that is performing the SCANSPLF command. Depending on the Job ID that is selected, there may not be OpCon job or schedule information associated with that job.

### $-System Variable Control Options

The $MSG variable (supported only for Message Management) can be edited for single quotes and/or commas by setting Configuration options on the LSAM sub-menu 3: Utilities, option 7, in order to prevent errors when $MSG is used as a parameter of an OpCon Event command.






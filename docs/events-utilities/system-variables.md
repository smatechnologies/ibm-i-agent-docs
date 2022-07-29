---
sidebar_label: '$-System Variables'
---
# $-System Variables

$-System variables are pre-defined variable name strings that the Agent will replace with values that the Agent stores while processing various of its automation tools.  Each Agent feature that supports $-System variables has its own list of system values that are logically available for that feature. These character-string variables are replaced by IBM i or OpCon job characteristics, and each supporting Agent feature also supports some unique variable character strings that apply only to that specific feature.

Within the Agent file maintenance displays, the variable token does not require any special brackets or other characters. It is only necessary to start with the '$' sign, use all capital letters, and include one space between the name parts, as shown in the table of examples, below. Refer to the follow Rules section for information about the values that will actually be provided to replace each of the $-Variable tokens.

## Rules For $-System variables

To use the $-System variables, look for a function key such as 'F10=$VAR' in data entry displays.  This function key will work whenever the display cursor is located within a data entry field that supports translation of $-System variables during run time.  Variable name character strings can be typed manually, but selecting their names from the prompting list assures that the data is entered correctly.

1. The prompting list of supported $-System variables varies depending on which Agent master file is being edited.  

The list of supported variables will match the currently edited Agent feature in both the primary master records and also, where supported, in any associated Captured Data Response Rules.

Some $-System variables will appear on all displays, but many will be limited to just certain Agent features.  For example, the $MSG variable is only available to the Message Management Parameters master records, and in any attached Response Rule.  The universal Response Rule maintenance program controls the prompted list of $-System variables so that they will always match the Agent feature that a Response Rule is attached to.

2. The job that is referenced for providing OpCon and IBM job identifier values varies per LSAM feature, according to the following list.

    a.  **Message Management**
    - IBM Job ID = the job that issued the message. 
    - The OpCon information will not be available if that job was not started by, or Tracked by OpCon.
    - The IBM i Job ID that is stored with the Capture Log record for captured message data is the ID of the job that issued the message instead of the LSAM Message Management server job.

    b.  **Operator Replay**
    - IBM Job ID = the script driver job, which is the job that shows in the OpCon Schedule.
    - Unfortunately, the actual virtual workstation job itself cannot be referenced by the $-System variables. To obtain the IBM i job identifiers for the virtual workstation job it is (currently) necessary to execute extra steps that will display the job ID on the screen, and then use Capture Data rules and Response Rules to store those values into dynamic variables.

    c.  **SCANSPLF (Scan Spool Files)**
    - IBM Job ID = the job ID will vary depending on the type of task using this command. Sometimes it will be the ID of the Spool File job, other times it will be the job that is performing the SCANSPLF command. 
    - Depending on the Job ID that is selected, there may not be OpCon job or schedule information associated with that job.

    d.  **Multi-Step Job Scripts**
    - IBM Job ID = the job ID will be the job that has executed a Script. 
    - Depending on how the Script was executed, there may not be OpCon job or schedule information associated with that job.

## $-System Variable Control Options

The $MSG variable (supported only for Message Management) can be edited for single quotes and/or commas by setting Configuration options on the LSAM sub-menu 3: Utilities, option 7, in order to prevent errors when $MSG is used as a parameter of an OpCon Event command in the CSV format.  (XML formatted External Event commands are not sensitive to commas, so these controls could be set to "blank=keep".)

## Example $-System Variable Names

The following list shows examples of $-System variables that are commonly supported among most Agent features.

-  **$FREQUENCY NAME**:   The name of the OpCon frequency table that was assigned to the job that issued the message.
-  **$IBM JOB ID**:       The IBM i current job ID, in this format: 123456/JOBUSER/JOBNAME.
-  **$IBM JOB NAME**:     The IBM i current Job Name.
-  **$IBM JOB NBR**:      The IBM i current Job Number (always 6 digits, but handled as characters).
-  **$IBM JOB USER**:     The IBM i current Job User Name (IBM i User Profile that started the job).
-  **$JOBID**:            The OpCon job identifier, a 10-digit number.
-  **$JOBID CMP**:        The OpCon job name and job identifier, joined into a single string with blanks compressed out.
-  **$JOBID LONG**:       The OpCon job name followed by the job identifier, with all blanks retained in the string.
-  **$JOB NAME**:         The OpCon job name.
-  **$JOB LONG NAME**:    The long format of the complete OpCon job name.
-  **$MACHINE NAME**:     The OpCon name for the LSAM job scheduler, which should be the same as the LSAM Name specified in the LSAM Parameters.
-  **$SCHEDULE DATE**:    The date of the OpCon schedule under which the current job was started, in the (\*ISO0) format of CCYYMMDD.
-  **$SCHEDULE NAME**:    The name of the OpCon schedule under which the current job was started.

Variable names that are unique to supporting Agent features are listed under the feature name documentation.








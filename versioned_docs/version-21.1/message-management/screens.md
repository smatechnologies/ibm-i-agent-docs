---
sidebar_label: 'Message Management Screens and Windows'
---

# Message Management Screens and Windows

## Message Management Performance Parameters

This function is used to set global options that control the actions of
LSAM Message Management.

### TRPMSGD40-R1 - Message Management Performance Parameters

#### Menu Pathways

Main Menu > Message management menu (#2) > Message management performance parameters (#7)

#### Fields

| Parameter            | Default (VALUES)     | Description          |
| -------------------- | -------------------- | -------------------- |
| Activity poll interval| 15 (seconds)        | This value helps to balance how aggressively Message Management will be checking for messages that OpCon job details have specified should be managed, versus the impact of this facility on overall system performance.     |
|                     |                      | A smaller number of seconds will improve the LSAM's ability to manage messages from individual jobs or message queues, whereas a larger number of seconds will allow more system resources for other important jobs such as LSAM Job Scheduling activity.  |
| Auto-start message management  | N (Y or N)            | **Y** = yes, tells the LSAM subsystem startup procedure to automatically start message management at the same time as the LSAM server programs are started. When this value is set to Y, stopping the LSAM also stops message management. |
|                      |                      | **N** = no, means that message management will only be started when the manual start command or menu function (described above) are used. Set this flag to N (the default) when message management will never be used.  |
| Server start mode    | 0 = warm start (default) 1 = cold start     | **0** = keep the content of the Message Management message key control file. This allows the server to perform a warm start, attempting to resume message queue reading from after the last message that was previously processed.  |
|                      |                      | **1** = clear the content of the Message Management message key control file. This tells the server to first clear the control file before starting the server processing, and it instructs the server to start at the beginning of each message queue.  |
|                      |                      | Refer to additional discussion below about Starting Message Management. |
| Trace message management log  (Replaces former external TRPMSGDBUG data area.)   | 0 (0 1)               | **0** = no trace, **1** = debug logging  |
|      |                      |     This option flag can turn on a highly detailed form of activity trace logging that is separate from the standard Message Management outcome logging file. This is a support diagnostic tool that can generate a large amount of data in the LSAM general purpose log file LSALOGF30. Debug logging should only be used when requested by SMA Technologies Support to diagnose problems with the LSAM Message Management server job.  |
|                      |                      | To view the results of debug logging, either use the IBM i command DSPPFM to view the content of file LSALOGF30, or select LSAM log viewer # 4 (from LSAM menu 6, option 5). This is the same log file where LSAM SBMJOB commands are logged. The log entries are text entries, but the flags and codes at the beginning of each entry can only be interpreted by analysts who have access to the LSAM program source code.    |
| First day of week (1)   | \*SUN (IBM i day of week values)  | This field is used to specify which calendar day will be considered the first day of the week by the LSAM Message Management Parameters, Effective DOW (day of week) filter field. (Refer to the table of field values, below, for Message Management Parameters.)  |
| Msg Mgmt Parms init list opt  | 1 (0, 1)             | Controls the appearance of the Message Management Parameters list display when it is first presented. This option is important at sites where the message text is more important than the message ID for recognizing messages to process.    |
|                      |                      | **0** = Show the Message Queue Library   |
|                      |                      | **1** = Show the Compare Text (instead of the MSGQ LIB)  |
| Event cmds in-line or submit?  | 0          | **0** = in-line, protect event sequence:     |
|                      |                      | Option 0 enables better cooperation among multiple Message Management Parameters that are qualified to respond to a single message. |
|                      |                      | The original Agent Message Management server logic was the same as option 1 for this field. But sometimes the delay caused by submitting message responses to a separate job would prevent subsequent Message Management Parameters (with a higher sequence number) from being able to benefit from the results of a Parameters record with a lower sequence number. So the new default is option 0: Process each Message Management Parameter right from the Message Management server job so that the order of events is strictly preserved.         |
|                      |                      | **1** = submit, handle other messages faster:  |
|                      |                      | Option 1 was the original mode of processing for the Message Management Server. This option improves the response time of the Server for handling multiple messages.   |
|                      |                      | However, when each message response is submitted to its own, separate job, it is likely that this would prevent the actions of Parameter Sequence 10 from being made available to Parameter Sequence 20 that wants to process the same message - and needs to know the result of the Sequence 10 response action. |
|                      |                      | The choice between these two options might depend on whether a site uses complex message responses, or virtually always uses only one Message Management Parameter per message.           |
| $MSG handle single quotes | E (blank, B, E)       | An optional edit that should be performed whenever the $MSG special variable is used in the Message Management Command line:                |
|                      |                      | **blank** = no changes          |
|                      |                      | **B** = replace a single quote with a space character        |
|                      |                      | **E** = escape the single quote by doubling it ('')           |
| $MSG handle comma    | B (blank, B)          | An optional edit that should be performed whenever the $MSG special variable is used in the Message Management Command line:     |
|                      |                      | **blank** = no changes          |
|                      |                      | **B** = replace a comma with a space character  |

#### Functions

-   **F3=Exit**: Quits the maintenance display and returns to the menu without completing any changes.
-   **F12=Cancel**: Quits the maintenance display and returns to the menu without completing any changes.

## Message Management Operations Screens

### Start Message Management -- Start Mode Window

#### Start Message Management - Start Mode Prompt
```
                      Start Message Management

Server start mode (warm/cold): 0    0 = warm start, 1 = cold start


Press Enter to continue, or F3 or F12 to cancel.
```

#### Menu Pathways

Main Menu > Message management menu (#2) > Start message management (#3)

#### Fields

| Field                | Values               | Description          |
| -----                | ------               | -----------          |
| Server start mode (warm/cold) | 0 = warm start| **0** = keep the content of the Message Management message key control file. This allows the server to perform a warm start, attempting to resume message queue reading from after the last message that was previously processed. |
|                      | 1 = cold start       | **1** = clear the content of the Message Management message key control file. This tells the server to first clear the control file before starting the server processing, and it instructs the server to start at the beginning of each message queue. |
|                      | The default value is retrieved from the Message Management performanceparameters. | Refer to additional discussion above about Starting Message Management. |

### Check Message Management Status - Window

#### Check Message Management Status Window
```
  
  Message management status: STOPPED

  -- or --                   STARTED

       Press Enter to continue

```
#### Menu Pathways

Main Menu > Message management menu (#2) > Check message management status (#5)

### View Job Completion Message Table

This function displays the contents of a table file distributed by SMA that is not normally updated by LSAM users. The message IDs displayed in this table are recognized by the LSAM job completion message management server (job MSGMNG) as representing the completion status of jobs. Since these unique messages server only this special purpose, the message IDs in this table are not allowed for management by the LSAM Message Management facility. This means that when the LSAM Parameters (LSAM main menu, option 7) are set to use Message Management rules for messages arriving in the LSAM's dedicated job completion message file, SMAMSGF, the message IDs in this table cannot be specified for general message management. The responses to these messages must be managed from OpCon, according to the job status that each message may generate.

#### Job Completion Messages Control Table View
```

                                        Display Physical File Member

File . . . . . . :   LSAMSGF00           Library  . . . . :   SMADTA            

Member . . . . . :   LSAMSGF00           Record . . . . . :   1

Control  . . . . .   ____________        Column . . . . . :   1    

Find . . . . . . .   _________________________________________
*...+....1....+..
CPC1217JOBNOK
CPC1218JOBNOK
CPC1219JOBNOK
CPC1220JOBNOK
CPC1224JOBNOK
CPC1225JOBNOK
CPC1226JOBNOK
CPC1232JOBNOK
CPC1234JOBNOK
CPC1235JOBNOK
CPF1240JOBNOK
CPF1241JOBOK
CPI2404MSGW
                           ****** END OF DATA ******

                                                                 Bottom
F3=Exit   F12=Cancel   F19=Left   F20=Right   F24=More keys
```
In the table illustration above, notice that many message IDs, such as CPC1217, are followed by the characters JOBNOK. This symbol means "job not OK" and it indicates a message ID that signals an IBM i job failure. In contrast, the message ID CPF1241 shows JOBOK and indicates a normally complete IBM i job.

The message ID CPI2404 is a special case: If a job is in Message Waiting status (MSGW), this will be detected by the LSAM transaction manager server job, where a sub-procedure calls an IBM i API (application program interface) to fetch the actual status of a job, which would be MSGW in this case. But this message ID appears in this table to indicate that it also is a reserved message ID that is not eligible for LSAM Message Management handling.

## Message Management Parameters

#### Message Management Parameters - View 1 of 2
```
TRPMSGR1                 Message Management Parameters                MM/DD/YY 
USERNAME                                                              HH:MM:SS 
                                                                               
Type options, press Enter.  6=DspCptUse             Search content:            
  2=Change  3=Copy  4=Delete  5=Display                                        
  7=Capt chart  8=Export  9=Chg Sts                                            
 Opt  Msg Queue   MsgQ Lib    Msg ID   Job Name    Job User    SQ#   Sts       
      QSYSOPR     QSYS        CPI1E94  *ALL        *ALL         10    I        
      QSYSOPR     QSYS        SMA0009  *ALL        *ALL         10    I        
      QSYSOPR     QSYS        SMA0145  *ALL        *ALL         10    I        

                        -- or: F11=Alt view --                                                                               
 Opt  Msg Queue   MsgQ Lib    Msg ID   Job Name    Job User    MmRecKey#  Sts                        
      QSYSOPR     QSYS        CPI1E94  *ALL        *ALL              3     I   
      QSYSOPR     QSYS        SMA0009  *ALL        *ALL              5     I   
      QSYSOPR     QSYS        SMA0145  *ALL        *ALL              4     I   
                                                                               
                                                                        Bottom 
F6=Add  F10=CompText  F11=Alt view  F16=SearchNxt  F17=Subset  F24=More keys   
Copyright (C) SMA Technologies 1995, 2018  ARR                                 
```

#### Message Management Parameters - View 2 of 2
```
 TRPMSGR1A         Message Management Parameters - Compare Text         3/23/22 
 CLEWIS                                                                10:16:52 
                                                                                
 Type options, press Enter.  6=DspCptUse             Search content:            
   2=Change  3=Copy  4=Delete  5=Display                                        
   7=Capt chart  8=Export  9=Chg Sts                                            
Opt Msg Queue  Msg ID  Job Name   Job User   SEQ Compare Text                 S 
_   QSYSOPR    LNR0706 *ALL       *ALL        10 Processing date is           A
_   QSYSOPR    LNR0706 *ALL       *ALL        20 Is data valid?               A
_   QSYSOPR    CPF0927 *ALL       USER*       10                              I
_   QSYSOPR    CPF9897 *ALL       *ALL        10 My user message text         I
_   USERQNAME  ******* ********** **********
                                                                                

                                                                         Bottom 
 F6=Add  F10=MSGQ+LIB view  F16=Search next  F17=Subset  F24=More keys          
```

The example lists above show both views of the list of Message Management Parameters. F10 is used to alternate between Views 1 and 2, and a Performance Parameter (sub-menu option 7) sets which view is the initial default view when the list is first presented. View 2 showing the Compare Text is more useful in environments where the Message ID may not be helpful, and message management depends more heavily on the Compare Text to distinguish among various Parameter records that might otherwise appear to have the same filter rules.

The sub-title will change to indicate when the F17=Subset function is in effect. As the sub-title indicates, the list may be filtered to show only one entry for each message queue that the LSAM will monitor. Pressing F17 a second time will remove the filter and show all the Parameter records in the file.

The illustration above also shows a type-Q standard entry that has asterisks (\*) in place of a Message ID and other fields. Records with these values are LSAM system control records. They do not identify any specific message that should be monitored. Rather, they provide a means of signaling the LSAM about message queues that need to be checked in case any messages may arrive that should be handled by the job-level message responses supplied with OpCon-initiated jobs.

LSAM Message Management will always check the message queues specified in the LSAM Message Management Parameters master file. However, if a message queue is not named in this master file, the LSAM will not look  for messages there. Therefore, whenever a job-level message management parameter has been added to a job master record defined in the OpCon User Interface, the LSAM administrator must make sure that any or every message queue where this message might be sent has been added to the list of message queues that will be monitored by the LSAM Message Management server. To check the list of all message queues being monitored, press F17=Subset on the LSAM display. It is easy to add a message queue to that list, as explained below under the Add Queue window documentation.

#### Menu Pathways

Main Menu > Message management menu (#2) > Message management parameters (#1)

#### Fields

-  **Status**: The "Status" sub-title appears when F15 is used to subset the display to only Inactive, or only Active records. There is no sub-title when all records are on display.
-  **Search content**: To quickly search for a particular message management definition, enter the known characters of any portion of the entry detail and press <**Enter**>. Any value that appears on the detail display may be searched for, even though not all values appear in the list display.
-  **Opt**: <**Tab**> to a row in the table and enter an option.
-  **Msg Queue**: The message queue to be examined for messages.
-  **MsgQ Lib (F10 Alt view 1)**: The library in the DB2/400 database where the message queue is located.
-  **Msg ID**: The identifier of the message to be trapped.********** = no message is specified in this entry; this entry only names a message queue to monitor.
-  **Job Name**: The IBM i job name that issued the message. A value of *ALL allows the message manager to respond to a particular message ID regardless of the job name. Partial job names (JOB*) are also supported. Specifying a particular job's name prevents the message manager from responding when other named jobs may issue the same message ID.
-  **Job User**: The IBM i user name from the job that issued the message. A value of *ALL allows the message manager to respond to a particular message ID regardless of the user name. Partial user names (USER*) are also supported. Specifying a particular user's name prevents the message manager from responding when other users of the same job name may issue the same message ID.
-  **Compare Text (F10 Alt view 2)**: When F10 is pressed, or the Message Management Performance Parameters indicate View 2 should be the initial view, the headings change and the list shows the Compare Text field instead of the Message Queue Library. This view may be more useful when many message IDs are the same, or there are no message IDs and the Compare Text is critical to recognize different rules.
-  **SQ# (F11 Alt view 1)**: A sequence number is assigned to every Parameters record, but it is only important when two records share the same values for all the other profile fields appearing on this list display, in which case the sequence number supports unique association with log records and also controls the order in which Parameters records are processed.
-  **MmRecKey# (F11 Alt view 2)**: Press F11=Alt view to replace the SQ\# field with this Message Management Record Key Number. The MmRecKey\# field is important for matching Message Management Log entries with the Parameters record that caused the log activity. It can also be used with the command SETMSGTHR (set message threshold) as an easy way to identify the correct Parameters record.
-  **Sts**: When new records are first added to the file, they are assigned an inactive status. After any related Capture Data Rules are completed, and any Captured Data Response Rules are also ready, then the Parameters master record status should be changed to A=active to allow the LSAM Message Management server job to use the new record. To change the status, either enter option 9=Chg sts from this list display, or while using option 2=Change, manually type an A or an I in the status field of the master record.

#### Options

-   **2=Change**: To change a Msg ID, type 2 next to the Msg ID line and press <**Enter**> to proceed to the Update Message Management Parameters screen.
-   **3=Copy**: To copy a Msg ID to a similar record (perhaps using a different sequence number and other response rules), type a 3 next to the Msg ID line and press <**Enter**> to proceed to the Copy Message Management Parameters screen.
-   **4=Delete**: To delete a Msg ID, type 4 next to the Msg ID line(s) and press <**Enter**> to proceed to the Confirm Delete of Records screen for message trapping.
-   **5=Display**: To view a Msg ID, type 5 next to the Msg ID line and press <**Enter**> to proceed to the Display Message Management Parameters screen.
-   **6=DspCptUse**: "Display Capture application Uses."  This option shows a list of Message Management Parameters master records that use the same Message Data Capture Application, if the selected record has been linked to a Message Data Capture Appliation.  This option is especially useful when a single Capture Application has been linked to more than one Parameters record, so that any changes planned for the Data Capture Application can be evaluated for possible adverse affects on the sharing Parameter record(s).
-   **7=Capt chart**: To view a flow chart of associated Message Data Capture Rules and Captured Data Response Rules, type a 7 next to the MSD ID line and press <**Enter**> to proceed to the Capture Message Data Chart list display. A detailed explanation of the displays for the Capture Chart may be found in Operator Replay Scripts, within the Screens and Windows section, under the title [Operator Replay Capture Chart (opt 7)](/operator-replay/screens.md#oprr10r7---capture-screen-data-chart-5-views).
-   **8=Export**: Select one or more Message Management Parameters that will be copied to a save file collection for exporting to a different LSAM environment. The Export option includes all related records such as Capture Rules and Response Rules, as well as any Dynamic Variable definitions. Detailed instructions for Export and Import of data are found in Copy Files from Test to Production.
-   **9=Chg Sts**: Type option 9 next to any master record line and press <**Enter**> to change the record status from A to I, or from I to A, where A = active and I = inactive.

#### Functions

-   **F3=Exit**: Quits the list of trapped messages and returns to the menu.
-   **F5=Refresh**: Reads the message management file again and reloads the list display.
-   **F6=Add**: Proceeds to the Add Message Trapping Parameters window.
-   **F7=Add Queue**: Proceeds to the Add Message Trapping Parameters window, but in the special mode that supports easy entry of a message queue name that has no message IDs.
-   **F10=CompText, F10=MSGQ+LIB view**: Changes the list to show either the Parameter record Compare Text or the Message Queue Library field. The Message Management Performance Parameters control file maintenance function (sub-menu option 7) changes which view is the initial list view when the program is first entered. (Function key F10 does not change the initial default for the list view.)
-   **F11=Alt view**: Changes the list display between showing SQ# + Sts, and the alternate view showing MmRecKey# + Sts. (This function key is not available from the F10 view 2 list format.)
-   **F12=Cancel**: Quits the list of trapped messages and returns to the menu.
-   **F15=Act/Inact**: This function key presents a window that enables toggling the list among three modes: only Inactive records, only Active records or all records. A list of Inactive records is an important way to make sure that every completed Parameters record has been set active before depending on it. It is a common error to forget to activate new Parameters records, since they are Inactive by default when the are first added. (Parameters are kept inactive until any associated Capture Applications, with optional Response Rules, have been completed. This allows a complex message rule set to be fully defined before it is made active.)
-   **F16=Search next**: When a value is entered in the Search content field, or a value shows in pink below this field from the last search request, pressing <**F16**> finds the next (or first) occurrence of the value specified. F16 is useful for finding each desired list entry when there is more than one list entry that satisfies the search request. When a value is first typed into the Search content field, <**F16**> works the same as the <**Enter**> key for starting a new search. However, only <**F16**> may be used to continue a search past the first entry that satisfies the search criteria.
-   **F17=Subset**: Toggles the list display between a list of all message management parameters and a filtered list showing only one line for each unique message queue (and message queue library) that will be monitored by the LSAM message management server.
-   **F24=More keys**: Shows other function keys that may be used.

### Maintain Message Management Parameters

The Add, Change, Copy and Display screens are similar. The following examples give a description of their contents.

#### Menu Pathways

- Main Menu > Message management menu (#2) > Message management parameters (#1) > F6=Add
- Main Menu > Message management menu (#2) > Message management parameters (#1) > 2=Change
- Main Menu > Message management menu (#2) > Message management parameters (#1) > 3=Copy
- Main Menu > Message management menu (#2) > Message management parameters (#1) > 5=Display

#### Four display formats:
- TRPMSGR2A (Format A): Message filtering parameters and primary response actions.
- TRPMSGR2B (Format B): A full screen display accommdates the optional Event (or Command) string.
- TRPMSGR2C (Format C): Optional display for Effective Date/Time message filtering rules.
- TRPMSGR2D (Format D): Optional display for Threshold management rules.

#### F6 = Add

There are four display pages used to define Message Management parameters.  Use the **Enter** key to advance to the next page, or use function key **F12** to go back to the previous page. Pressing **Enter** on the last page completes updates for Add, Change and Copy, or continues to the next option processing for Display. Pressing **F12** at the first page returns to the list display (retaining the last option that was being processed).

#### Option 2 = Change, 3 = Copy

The same screens as for F6=Add, TRPMSGR2A - C, appear for options 2=Change and 3=Copy, except the Rec key # does not show for F6=Add or for option 3=Copy because no record has yet been written to the database file.

#### Option 5 = Display

The screens for option 5 = Display are labeled TRPMSGR5A - C, but they appear the same as the screens for F6=Add. The exception is that there are no prompting function keys such as F4=Prompt appearing in the R5 formats.

#### Fields

##### <u>Format A</u>
**SELECT -**
- **Message Queue**: The message queue to be examined for messages. 
- **Message Queue Library**: The library in the DB2 UDB (DB2/400) database where the message queue is located.
- **Status**: A = active, I = inactive. Records marked with a status of I = inactive will not be processed by Message Management.

   The LSAM utility command SMAMMPSTS can be used to change the Status of a Parameters record to either Active or Inactive, as part of an automation strategy. Refer to the discussion of this parameter in the Commands and Utilities section of this Agent documentation.                   

:::tip
   -   New records are initially set to a status of I =inactive to allow time for configuration of message data capture and captured data response rules, if any are desired. It may also be necessary to create multiple  different responses to a single message. After all file maintenance is complete, set the status of all new Parameters records to A = active, using option 2=Change.                   
   -   Refer to [Commands and Utilities](../commands-utilities/commands.md) for a description of the Agent utility command SMAMMPSTS. This command may be used to automate changing a Parameter record status between Active and Inactive. 
:::    
- **Message ID**: The identifier of the message to be trapped. 
- **Message File**: The message file that holds the definition of the Message ID.
- **Rec key #**: The record key number is a unique number assigned to each Message Management Parameters record. This is not the same as the Sequence Number (which is used to keep otherwise matched key fields unique). The record key number is useful for associating Message Management Log entries with the Parameters record that generated the log activity. It may also be used with the SETMSGTHR (set message threshold) command as an easy way to identify the exact Parameters record that should have its threshold counter set to a new value (or reset to zero).
- **Job Name**: The name of the IBM i job that must have issued the message before the LSAM will respond to the message. A partial job name may be used, such as JOB*, where any job name that begins with the letters before the asterisk (*) will be accepted. The other special value of *ALL means that the job name will not be checked to qualify a message for processing. 
- **Job User**: The name of the IBM i user profile from the job that issued the message, which must match before the LSAM will respond to the message. A partial user name may be used, such as USER*, where any user name that begins with the letters before the asterisk (*) will be accepted. The other special value of *ALL means that the user name will not be checked to qualify a message for processing.
- **Sequence**: This field is the lowest order (7th) record key value that combines with the other key fields to assure that each Parameters record can be uniquely identified. The sequence number also controls the order of execution when more than one Parameters record uses the same other 6 key fields. The other key field values are: Message Queue, MSGQ Library, Message ID, Message File, Job Name and User Name.              
:::tip
This field must not be confused with the Rec Key #, which is a number that is unique within the entire Parameters master file. The Rec Key # is an easy way to uniquely identify a Parameters record, such as in  the SETMSGTHR (set message threshold) command, instead of having to type all seven of the character key fields.            
:::

**FILTER -**
- **Compare Text** (variable in message): 
  -   Use this field to specify a text string that will be compared to the trapped message primary text (or secondary text, or both texts in a combined buffer) in order to qualify the message for handling by the LSAM Message Management server. Using Dynamic Variables, up to 999 characters can be specified as the Compare Text, or up to 30 characters can be typed directly into this field. Typed text can also be combined with Dynamic Variables. 
  -   Normally this field is set to blanks, meaning that no checking of message content is performed. Dynamic Variable tokens can be used in this field, so that the tokens will be replaced at run time with a value to search for in the message text.                        
  -   To use trailing blanks as part of the Compare Text, specify a non-zero value in the Length field. (To use all blanks as the Compare Text, specify a Dynamic Variable that will produce a blank result, and then the length field, described below, can be used to designate how many blanks form the Compare Text field.)                                                       
:::tip
In earlier LSAM versions, a special value of *NOVAR was used to mean that no checking of message content is performed. This old value is still supported, but the new standard is to leave the field blank.                           
:::

- **Message text to scan**: 
  - P = primary, S = secondary (Help), B = both.
    - This flag indicates which of the message text fields should be searched for the Compare Text. If B = both is indicated, the LSAM message management program creates a message text buffer by removing trailing blanks from the primary text, adding one space character, then appending the secondary text. This formatting of both text fields into one buffer could be important depending on the content and Length of the Compare Text character string.            
    - To perform research on the actual content and format of the message text buffer, view the Message Management log entries. For messages that are not being processed, the message text buffer can be logged and examined by temporarily turning on the Message Management debug trace log option, using function 7 from the Message Management menu.                         
- **Comparison type**: 
    - The Comparison Type field indicates the type of Boolean comparison to be performed between the Compare Text and the message text buffer, where the Compare Text is the first factor and the Message Text is the second factor. 
    - EQ = equal, NE = not equal, GT = greater than, GE = greater than or equal to, LT = less than, LE = less than or equal to. (The boolean comparison symbols may also be used in this field: =, \<\>, \>, \>=, \<, \<= .) Blanks are assumed to mean EQ.
    - The Start position is required when using a Boolean comparison rule other than EQ or = (equal). However, if the Comparison Type is EQ or =, then the Start position may be left at zeros and this tells the LSAM message management program to search for the Compare Text anywhere in the message text buffer.
- **Start Position in buffer**: 
    - Compare Text may be further qualified according to its ordinal position within the message text buffer. (Ordinal means that the first character in the message text is position 1.) 
    - When a non-zero start  position is specified, the Length field (or the assumed length) is combined with this start position to isolate a character string from the message text buffer. After the message text string is isolated, the Boolean rule of the Comparison Type field is used to compare or contrast it with the Compare Text. 
    - Leaving this field zeros tells the LSAM Message Management server that the Compare text may occur anywhere within the primary message text. The Boolean Comp type field must be set to EQ or = when the Start Position field is left at zeros.          
    - If the Compare Text rules, including Start Position, do not produce a positive result, then the Parameters record will be skipped for processing.        

- **Length of Compare Text**:
  - This field specifies the length of the character strings that are used to evaluate the Compare Text versus the message text buffer.
  - When this field is left at zeros, the length is assumed to be through the last non-blank character of the Compare Text field.
  - This same rule applies to the value that replaces one or more Dynamic Variable token(s). This Length value (or the assumed length) will determine the size of the character string extracted from the message text buffer, starting from the Start Position.

**REACT -**
- **Answer Type** (R, E, B, N): 
  -   R = Reply to message 
  -   E = Event: IBM i command, or OpCon Event sent to SAM 
  -   B = Both R and E            
  -   N = None: This record used  only for Capture Data and Response Rules, if other Parameter record qualifiers are met. 
- **Message Reply**: 
  -   When messages require a reply, the valid values for the reply are often specified within the text of the message. IBM program errors typically require one of the following example values:
      - I = ignore and continue  
      - C = cancel the job       
      - D = produce a formatted program dump and cancel the job 
      - R = Retry: DO NOT USE THIS OPTION! It does not work with modern IBM i programs, except for Control Language programs - but only if the source code is available and the effect of the retry response is well understood. Any other use will likely corrupt application data. 
  -   User-defined programs may issue messages requiring a custom response, such as the name of a tape drive that should be used for a backup operation.
  -   One way to plan for automatic responses to messages is to set the value of a Dynamic Variable. The value may be changed as part of automated processing prior to the event that generates the message. Insert a Dynamic Variable token into this field in order to have the token replaced with its value at run time. Function key <**F6=DynVar**> may be used to select from a list of Dynamic Variables, and/or to see the correct format for a Dynamic Variable token.
  -   Special values may be entered into this field to support user-defined response management. When either of these values are specified, the object name and object library field values are required (refer to the next fields in this table).                      
      - **\*MSGQ** = re-route the message to a different message queue and retrieve the user-supplied response from that copy of the message in order to answer the currently pending inquiry message. 
      - **\*PGM** = call a user-defined program to provide a message response string that will be used to answer the currently pending inquiry message.         
- **Obj+Lib if \*MSGQ or \*PGM**:
  -   When the Message Reply field is set to one of these special values, type into the first field the name of an alternate message queue, or the name of a user-defined program that may be used to retrieve or calculate the message reply string.                     
  -   Type into the second field the library location of either type of object.       
  -   Refer to the discussion of How Message Management Works for more information about these two fields.
- **Capture App ID / Key**:
  - The descriptive text for the Application ID is followed by the numeric APP KEY value that links this parameters record to Message Data Capture Definitions. Function key **F10** can be used to show a list of existing Capture Rules, from  which one may be selected with option **1** and returned to this field. During the branch to the Capture Rules function, a new Application ID may be defined and then selected for use with this Parameters record.
- **Before/After Evt, Reply**:
  - This option controls whether the Application's Capture Data Rules and any associated Response Rules will be executed before the Event Command and/or Reply action of this Parameters record will be completed. Older versions of the Agent did not provide this option, so the default behavior was that Capture Applications would always execute After the Parameters actions were completed. This would sometimes require that two Parameters records be created in order to set and utilize Dynamic Variable values required by either the Event Command or by the Reply field. Now, however, the Before option allows the Dynamic Variable values to be computed and set first, so that only one Parameters record is usually required to manage a message and it can rely on settings for the Event command or Reply code that could vary based on the content of the message.

**OPTIONS -**  
These two options control which additional display formats might appear as **Enter** is pressed during the view or maintenance of a Message Management Parameters master record.

- **Effective Times or Dates**: 1=Yes, 0 (zero) or blank = No.
- **Threshold**: 1=Yes, 0 (zero) or blank = No.

##### <u>Format B</u>

**COMMAND -**
- **Event Command**: This field contains the entire command to be executed when the message Paramters **Answer Type** field value is E=Event or B=Both. The command can be an OpCon event command name and its parameters, or it can be any IBM i command and parameters. Use various function keys **F4**, **F8**, **F9**, and **F23** as desired for assistance in formatting the commands and Dynamic Variable or $VAR tokens that may be entered in this field.
  :::tip
  Also refer to the discussions just below about predefined OpCon Event Commands and $-System Variables (F23=$VAR) that are supported by the LSAM in this field. 
  :::

##### <u>Format C</u>

**EFFECTIVE DATE/TIME -**
- **Effective start date**: 
This is an ISO-standard date field. The default value for this field which means "not used" is 0001-01-01, where te digits are CCYY-MM-DD (century, year, month, day). When the date is set to an actual value, a message will not be processed unless the message issue date occurs on or after this date.
- **Effective end date**:
This is an ISO-standard date field. The default value for this field which means "not used" is 0001-01-01, where the digits are CCYY-MM-DD (century, year, month, day). When the date is set to an actual value, a message will not be processed if the message issue date occurs after this date.
- **Effective start time**: 
   - The format of this time field is HH:MM:SS (hours, minutes, seconds), and the default value that means "not used" includes the colons, as "00:00:00". To indicate midnight, use the value of 24:00:00.
   :::tip
   The function of this field varies depending on the setting of the Link option (listed below), as follows:
   - When the time field is NOT linked to the date field.
   - When the time is set to a valid value (00:00:01 - 24:00:00), a message will not be processed unless its issue time is equal to, or greater than this time on a given day. However, if the start time is greater than the end time (and the end     time is not zeros), this indicates that the time frame crosses the midnight boundary into the next day, so the comparison logic is opposite, and the message time must be less than or equal to this start time.    
   - When the start time field IS linked to the start date field.
   - The time becomes an extension of the start date field, creating a complete time stamp that marks the beginning of the effective period. Messages must have been issued at or after this start time in order to qualify for processing by this Parameter.
- **Effective end time**: 
   - The format of this time field is HH:MM:SS (hours, minutes, seconds), and the default value that means "not used" includes the colons, as "00:00:00". To indicate midnight, use the value of 24:00:00.

    :::tip
    The function of this field varies depending on the setting of the Link option (listed below), as follows...
    :::
   - When the time field is NOT linked to the date field.
   - When the time is set to a valid value (00:00:01 - 24:00:00), a message will not be processed unless its issue time is less than, or equal to this time on a given day. However, if the start time is greater than the end time (and the end time is not zeros), this  indicates that the time frame crosses the midnight boundary into the next day, so the comparison logic is opposite, and the message time must be greater than or equal to this start time.    
   - When the end time field IS linked to the end date field.
   - The time becomes an extension of the end date field, creating a complete time stamp that marks the end of the effective period. Messages must have been issued before or at this end |
    time in order to qualify for processing by this Parameter.
- **Link times to each date**
   - This option field specifies how the Start and End Time values should be used. The times may be linked to their corresponding Date values, or the time fields may be processed independently of the date fields, as described in the two time field entries, above.
   - **0** = use time values separately from the date values
   - **1**= link the time values to the date values
- **Effective DOW** (day of week):
   - The days of the week are indicated by the digits 1 - 7. The calendar day corresponding to day 1 is set in the Message Management Performance Parameters function (LSAM menu 2, option 7). For example, typical US domestic calendars may indicate that Sunday (*SUN) is the first day of the week, corresponding to day 1.
   - Any or all of the digits 1 - 7 may be entered in this field. For example, if the field value is set to 147, this means that the message must have been issued on the first, fourth or seventh day of the week in order to be processed by this Parametes record. If day 1 is *SUN, then day 4 is *WED and day 7 is *SAT. (The mnemonic values used for days of the week match the settings used by the IBM i operating system.)
- **Start Effective DOM** (day of month): 
   - This field indicates which day of the month begins the window of time within the month that a message may be processed by this Parameters rule. If the End Effective DOM is zeros, then a message will be processed until the end of the month. The special value of 32 is used to indicate the last day of any month, regardless of the number of days in that month.
   - If the End DOM is less than the Start DOM, this indicates that the effective processing time crosses the boundary between months, so the comparison logic is opposite and the message issue date must be less than or equal to this day of the month.
- **End Effective DOM** (day of month):
   - This field indicates which day of the month ends the window of time within the month that a message may be processed by this Parameters rule. If the Start Effective DOM is zeros, then a message will be processed from the first day of the month until (through) this day. The special value of 32 is used to indicate the last day of any month, regardless of the number of days in that month. 
   - If the End DOM is less than the Start DOM, this indicates that the effective processing time crosses the boundary between months, so the comparison logic is opposite and the message issue date must be greater than or equal to this day of the month.

##### <u>Format D</u>

**TRHESHOLD -**
- **Threshold DynVar, Count**: 
   - The first field holds the name of an LSAM Dynamic Variable where the activity count for this Parameters record is maintained. When this display format is presented for an existing Parameters record, the current count found in the Dynamic Variable is shown in the cyan blue field to the right of the Dynamic Variable name. 
   - When this field is blank, there will be no threshold controls. But when a threshold is specified, the count of message activity for a Parameters record is always stored in a Dynamic Variable that has been defined as numeric, with 7 digits and no decimal places. 
   :::tip
   The message threshold count can be changed manually by the utility commands SETMSGTHR (reset count) and ADDMSGTHR (add to count).
   :::
- **Threshold limit**:
   - When greater than zeros, this field is used as the reference point for comparison with a counter (stored in an LSAM Dynamic Variable). The Threshold count must be equal to or greater than this limit in order to allow the Parameters record to process the message.
   - Whenever the threshold limit is reached (or exceeded, if the count was increased from outside of the Message Management server job), the threshold count will be reset to zero following the execution of the Parameter's message responses. This means that a repeat of the same message will be skipped in the future until the threshold limit is reached a second time.
   - If no limit is specified (that is, the limit value is zero), any threshold count will be ignored.
- **Threshold duration**:
   - The amount of time, expressed as DDDHHMM (days, hours and minutes), allowed before a threshold counter expires. The issue date of a message is compared to the last activity date, and if a new message ID matching this Parameter record is processed after the duration period has expired, then the new message will reset the threshold count to 1 (representing the current message in process).
   - This field is optional. If no values are entered for the duration, then the Threshold count will continue indefinitely until the limit is reached.
- **Threshold date control**:
   - **M** = use the Parameters record date of last message activity.
   - **V** = use the LSAM Dynamic Variable date of last update activity.

    This option controls which date is compared to the message issue date to determine if the Duration period for the counter has expired. Using the Message Management Parameters date of  the last time this message was processed allows for the Dynamic Variable counter value to be  changed from outside of Message Management without affecting the date. However, if changes to the Dynamic Variable counter should be considered as valid activity within the duration period, then use the value V. Both current date values appear on the Change and Display formats, regardless of the setting of this control value.

#### Functions

- **F3=Exit**: Quits the window and returns to the list of trapped  messages without completing any updates.
- **F5=Refresh**: Resets the current display page, replacing any new data that was typed, or re-fetching the view-only display of master file data.
- **F9=Prompt Evt**: When the cursor is positioned in the Event command field, <**F4**> causes a window of OpCon Event commands to appear from which a value may be selected and returned to this field.
    :::tip
    Using <**F4**> for this field is especially helpful, because after an Event is selected from the event list, the program uses the IBM i command prompting to show the parameters that are appropriate for each Event. When <**Enter**> is pressed from the command prompting window, the Event command string is then inserted into the Event command field with all the correct formatting and punctuation. When CPYTOMSGIN is selected from the list of Event commands, a second prompt window will appear from which may be selected the raw OpCon Event command syntax.
    :::
- **F8=DynVar**: This function key, when pressed while the cursor is positioned in a supported field, causes a window listing available Dynamic Variables to appear. PageDown as necessary, then position the cursor over the desired variable name and press <**Enter**> to select that variable so that it will be inserted as a token into the supported field. The token will be inserted at the position where the cursor was when <**F6**> was pressed. Supported fields include: Compare Text, Threshold Counter and Event Command.
- **F4=Prompt (IBM i) CMD**: When the cursor is positioned in the Event command field, **F4** causes the job to branch into IBM i command prompting. If an IBM i command name was typed before **F4** was pressed, then that specific command will be prompt. Otherwise, a general command search window will appear to help find the desired command. (Note that this IBM command prompting will not allow a command to be executed.)
- **F10=AppID**: This function key causes a branch to the Select Capture Application list display. From the list, option **1=Select** may be used to return an Application Key into the field on the Message Management Parameters record (and to display the descriptive text for the Application ID). While using **F10** it is possible to registere a new Application and then build Message Data Capture Rules and any associated Response Rules.  After new data has been entered, the new Application ID can be selected to link it to the Message Management Parameters master record.
- **F23=$VAR**: When the cursor is positioned within a field that supports the Agent's $-System Variables, F10 causes a window of supported $VARs to pop up. Position the cursor over the desired $VAR name and press Enter to insert that variable $TEXT STRING into the location where the cursor was located on the display.

- **F12=Prev page, Cancel**: From display formats TRPMSGR2B and 2C, this function key returns the display to the previous display format (2A or 2B). Use the Enter key and F12 to move among the three display formats. However, F12 pressed from display format 2A will cause an exit from the maintenance function (without updating any data) and the display returns to the "Work with" list display. F3=Exit can be used to cancel all updates and return to the list display from any of the display formats.
    :::tip
    Using the Enter key from display format 2D will commit all changes from all four display formats to the database.
    :::
-   **F20=Reset Thr**: Similar to the SETMSGTHR command, this function key can be used to force the threshold count (stored in an LSAM Dynamic Variable) to be reset to zeros. Resetting the threshold count to zeros makes the dates of last activity have no meaning; the dates are only used when the threshold count is 1 or greater.

### $-System Variables Supported for Message Management

Event commands that are processed by Message Management may include many of the same token variables as are supported by OpCon. However, there is a difference in the syntax. OpCon requires that variables begin with a dollar sign ($) and that the whole variable name be enclosed in double square brackets, for example, \[\[$JOB NAME\]\]. The IBM i green screen workstation does not support the square brackets, so they are not required when inserting variables into the Event command, for example, $JOB NAME. The following table lists the variables that the LSAM Message Management facility can detect and replace when responding to a
message.

#### $-System Variables

| Variable Name        | Description          |
| ---------------------| -----------          |
| **$FREQUENCY NAME**  | The name of the OpCon frequency table that was assigned to the job that issued the message. |
| **$IBM JOB ID**      | The IBM i current job ID, in this format: 123456/JOBUSER/JOBNAME. |
| **$IBM JOB NAME**    | The IBM i current Job Name. |
| **$IBM JOB NBR**     | The IBM i current Job Number (always 6 digits, but handled as characters). |
| **$JOBID**           | The OpCon job identifier, a 10-digit number. |
| **$JOBID CMP**       | The OpCon job name and job identifier, joined into a single string with blanks compressed out. |
| **$JOBID LONG**      | The OpCon job name followed by the job identifier, with all blanks retained in the string. |
| **$JOB NAME**        | The OpCon job name. |
| **$JOB LONG NAME**   | The long format of the complete OpCon job name. |
| **$MACHINE NAME**    | The OpCon name for the LSAM job scheduler, normally the same as the LSAM Name specified in the LSAM Parameters (but the value supplied by OpCon with job start requests is used here). |
| **$MSG**             | The actual primary text from the message that was trapped. (Refer to note below about editing the content of the captured message text.) |
| **$MSGID**           | The IBM i message ID currently being processed, in a format like CPF1234. |
| **$MSGQ**            | The name of the message queue where the current message was found. |
| **$MSGQ LIB**        | The library location of the message queue. |
| **$SCHEDULE DATE**   | The date of the OpCon schedule under which the job that issued the message was started, in the (*ISO0) format of CCYYMMDD. |
| **$SCHEDULE NAME**   | The name of the OpCon schedule under which the job that issued a message was started. |

:::tip 
The content of the $MSG variable may be edited to eliminate or escape any single quote or comma characters. This prevents possible errors when the value of $MSG is used in LSAM and IBM i commands. Use the Message Management <u>Performance</u> Parameters (described above) to control the edit of the $MSG content. Additional discussion of the edit codes for single quotes and commas may be found in Events and Utilities Menu, under the subject of Captured Data Response Rules.

To use OpCon token variables, other than the variables listed above, include them in the Event Command text by surrounding them with braces (curly brackets) {{ }}. OpCon will recognize the braces (curly brackets) in the same way as it recognizes square brackets \[\[ \]\]. This rule was established to support operating systems such as IBM i where the native EBCDIC character set does not support typing of square brackets. Do not use any brackets when using one of the variable names in the table above, because the LSAM Message Manager will replace the
variable with its value and leave the brackets in the text. This could cause a problem with the OpCon token substitution logic.

However, to have OpCon replace any of the other token variables that it can manage use the doubled braces (curly brackets) to surround the token name.
:::

:::info Example
Syntax for OpCon Token variables in an LSAM Message Management: External Event command.
```
$CONSOLE:DISPLAY,'Ready to process jobs for this Schedule Date: {{$SCHEDULE DATE}}'
```
:::

### Windows: 

### External Event command prompt

Complete details about prompting for External Event command processing, including recommended uses for the CPYTOMSGIN Event command wrapper utility can be found under [Events and Utilities: Event Command Syntax](/events-utilities/external-events.md#external-event-command-syntax-csv-vs-xml) and the following topic about [Events and Utilities: CPYTOMSGIN](/events-utilities/external-events.md#cpytomsgin).

### Delete Message Management Parameters

#### Menu Pathways

Main Menu > Message management menu (#2) > Message management parameters (#1) > 4=Delete

##### TRPMSGR4 - Message Management Parameters

#### Fields

-  **MsgQueue**:    The message queue to be examined for messages.
-  **MsgQ Lib**:    The library in the DB2/400 database where the message queue is located.
-  **Msg ID**:      The message file that holds the definition of the message ID.
-  **Msg File**:    The message file where the Msg ID is defined.
-  **Job Name**:    A specific IBM i job name, a partial job name such as JOB*, or *ALL
-  **User Name**:   A specific IBM i job user name, a partial user name such as USER*, or *ALL
-  **SQ#**:        A sequence number assuring uniqueness and regulating order of processing when all other key fields above are the same.

#### Functions

-   **F3=Exit**: Quits the delete confirmation screen without deleting records and returns to the menu.
-   **F12=Cancel**: Quits the delete confirmation window without deleting records and returns to the Trapped Messages Parameters list.
-   **F14=Confirm**: Press the <**F14**> key to complete the delete action.

### F7 = Add Queue

#### Menu Pathways

Main Menu > Message management menu (#2) > Message management parameters (#1) > F7

#### Add Message Management Parameters
```
TRPMSGR03-R1             Message management parameters                 00/00/00   
USERNAME                  Add new record Type -- Queue                 09:46:38
   
  Message Queue, Library  : USERQNAME    QUSRSYS      

  Message ID, Message File: *******      **********

  Job Name, User Name . . : **********   **********        Sequence # 000
  
   
  Answer Type . . . . . . : Q            R=Reply,E=Event,B=Both,Q=Monitor Queue
   
   
   
  F3=Exit   F5=Refresh   F12=Cancel
```

When F7=Add Queue has been pressed, the Add new record screen appears with variations that are shown in the example above. This form of LSAM Message Management Parameter is used to signal the LSAM message management server that it should monitor the named message queue. However, this type of record does not specify which message or which job should be checked; instead, that information would be provided by job-level message management parameters that are optionally supplied with jobs initiated by OpCon.

The Monitor Queue type of record shows the following characteristics that are different from LSAM generic message management parameter records:

-   The Message ID, Message File, Job Name and Job User fields are filled by the system with asterisks, and the Sequence number is zeros.
-   The Answer Type is forced to "Q" to indicate that this record will cause no event or message response by itself.
-   Other fields that further define LSAM generic message management are not displayed because they are not used with Answer Type Q.
    :::tip
    It is possible for the F6=Add function and the option 2=Change function to be used to create or change an LSAM message management parameter record into a Monitor Queue type of record by typing a letter "Q" into the Answer Type field. In other words, it is not necessary to use F7=Add Queue to create this special type of record. However, once an LSAM Message Management Parameter record has been changed into this special type, it cannot be changed back to another Answer Type. It can only be deleted.
    :::

    :::warning
    It is possible to use option 4=Delete to remove all records that name a message queue, leaving the LSAM message management server program with no reference to that message queue. If all the LSAM global message management records for a specific message queue are removed, use the F7=Add Queue function to replace them with at least one record for the message queue in order to enable job-level message management to look for messages in that queue. It is recommended that the F17=Subset function be used to verify the filtered list of all message queues that the LSAM may monitor.
    :::

## Work with Message Data Capture Definitions

Rules for capturing message data elements are assembled into logical groups identified by an Application ID (similar to screen data captures by Operator Replay scripts and report data captures by the SCANSPLF utility). One or more message data capture rules may be associated with each Application ID, where multiple rules are identified by a sequence number. The Application ID is linked to a Message Management Parameters record by the APP KEY numeric value. The APP KEY is entered into the record by using the F10=Capture function key from the Message Management Parameters Create, Copy or Change screens. An Application ID may be shared by more than one Message Management Parameters record.

### LSAJ50R1 - Select Capture Application

The title of this display shows to **Work with Capture Applications** when it is accessed directly from an LSAM Menu.  The sub-title of "Application type:" shows the Agent automation tool that has its own data capture definitions, such as "**MESSAGE MANAGEMENT**".

Details about working with Application IDs are provided at [Work with Data Capture Application IDs](/events-utilities/captured-data-response-rules.md#work-with-data-capture-application-ids).  

After optionally creating or maintaining an appropriate Application ID, use the Application ID list display option 6 to Work with Capture Definitions for the currently selected Agent automation tool, as described next for the Message Management feature.

Type **1** next to the desired Application ID and press **Entery** to return the APP KEY and Application ID to the Message Management Parameters display.

:::note
Option **5=DspAppWU**: "Display capture Application Where Used"  shows a list of Message Management Parameters master records that use the same Message Data Capture Application, if the selected record has been linked to a Message Data Capture Appliation.  This option is especially useful when a single Capture Application has been linked to more than one Parameters record, so that any changes planned for the Data Capture Application can be evaluated for possible adverse affects on the sharing Parameter record(s).
:::

### TRPM30R1 - Work with Message Data Capture Definitions

#### Menu Pathways

-   Main Menu > Message management menu (#2) > Work with Message Data Capture Definitions (# 10)
-   Main Menu > Message management menu (#2) > Message management parameters (#1) > F10=Capt Defn. > Select Capture Application > 6=Work with Rules

#### Fields

- **Search Content**: 
  -   Type a value in this field and press **Enter** or **F16** to find a record in the list that contains the characters typed. The content may exist anywhere within the master record, so the list may not show the value when a record is identified. Type 5=Display to view the record details and verify the matched content.
  -   A search may be continued beyond the first ecord, using the same search value that now appears in pink below this field, by pressing **F16** to continue the search to the next matching record.
- **Application ID**: The character string that labels the message data capture definition.
- **Seq**: A sequence number that is used to support multiple capture definitions within the same Application ID.
- **P/S**:  This flag field indicates which message text field is used by the capture definition. Values include: P = primary text, S = secondary (Help) text, or B = both. When both are used, they are assembled into a single message text buffer for the purpose of applying the From/To capture positions.
- **From/To**: These two fields show the starting and ending locations of the message text buffer that will be captured by this definition.
- **Len**: This field shows the length of data that will be captured from the message text buffer, starting at the From position. 
- **Capt Seq Desc...**: The description assigned at the Sequence number level for each Data Capture Rule.

#### Functions

- **F3=Exit**: Quits the list and returns to the menu.
- **F5=Refresh**: Reads the message capture definitions file again and reloads the list display.
- **F6=Add**: Proceeds to the Create Message Data Capture Definition screen.
- **F12=Cancel**: Quits the list and returns to the menu.
- **F16=Search next:** When a value is entered in the Search content field, or a value shows in pink below this field from the last search request, pressing <**F16**> finds the next (or first)    occurrence of the value specified. F16 is useful for finding each desired list entry when there is more than one list entry that
    satisfies the search request. When a value is first typed into the Search content field, <**F16**> works the same as the <**Enter**> key for starting a new search. However, only <**F16**> may be used to continue a search past the first entry that satisfies the search criteria.
- **F17=Top**: Repositions the list display to the first record.
- **F18=Bottom**: Repositions the list display to the last record.

#### Options

- **2=Change**: To change a Capture Rule, type 2 next to the ID line with the desired Sequence number and press **Enter** to proceed to the Change record screen.
- **3=Copy**: Type **3** next to the desired Sequnce number and press **Enter** to copy a Capture Rule. During the copy process, the program will display a pop-up window offering an option to also copy all related Response Rules.
- **4=Delete**: To delete a Capture Rule, type 4 next to the Msg ID line(s) and press **Enter** to proceed to the Confirm Delete of Records screen. During the delete process, the program will display a pop-up window offering an option to also delete all related Response Rules.
- **5=Display**: To view details of a Capture Rule, type 5 next to the ID line and press **Enter** to proceed to the Display Details screen.
- **6=Response**: To view any associated Captured Data Response Rules, type 6 next to the ID line and press **Enter** to proceed to a list display of Response Rules.
- **7=Capt chart**: Type option 7 next to any Capture Definition to view a chart of related Response Rules and Dynamic Variables for the whole Application ID.

### Add/Change/Copy Message Data Capture Definition

#### TRPM30R2 - Add/Change/Copy Message Data Capture Definition

Refer to the discussion of [Message Management Parameters](./details.md#message-management-parameters-qualification-fields) for more information about the meaning and purpose of the fields on this display, as well as recommendations and examples for using Message Data Capture. Refer to details about the rules and effect of each field in the fields table, below.

#### Menu Pathways

Main Menu > Message Management menu (#2) > Work with Message Data Capture Definitions (# 10) > F6=Add *- or -* option 2=Change **- or -** option 3=Copy.

#### Fields

- **From fields**:    
  - Application ID, App Key       
  - Capt Seq

  When this screen appears in Copy mode, the key fields of the source record being copied are shown in this heading area. A new value must be assigned to the Sequence of the Capture Definition record being created in Copy mode, using the Capture Sequence input field, below. The App Key (with its Application ID description) field may remain the same in the new, copied record, since more than one scan rule is allowed per Application ID.

- **Application Key / ID**: This field is used to group one or more Capture Definitions into a single task that will be executed whenever an associated Message Management Parameters record is selected for processing a message.  In the Add or Copy mode the function key **F10** can be used to set or change the assignment of the new Capture Rule to a different App Key (Application ID).
- **Capture Seq# / Desc**: The order in which the Capture Definition will be processed, relative to other records under the same Application. The value must be unique within the App Key.  Type a Description that identifies the data element being captured.
- **Primary/Secondary text**: Data may be captured from a text buffer created from any of these sources:
  - **P** = primary message text only
  - **S** = secondary message (Help) text only
  - **B** = both: primary and secondary text are assembled into a single buffer, with one space character between the last non-blank character of the primary text and the start of the     secondary text
- **Message data from pos.**: The start position in the message text buffer where data capture will begin. (The first position is 1, not 0.)
:::tip
If the Scan Label is used, then this From-position marks the location where the search will  start for the Scan Label.
:::
- **Message data to pos.**: The end position of the data capture; may be used instead of Length.
:::tip 
If the Scan Label is used, then this To-position marks the position within the text buffer where the search for the Scan Label will end.
:::
- **Length of data string**: The length of data, starting with the From-position, that will be captured from the text buffer.
:::tip
This field is required when the Scan Label is used, in order to determine how much data to capture, starting with the "Data position from LBL."
:::
- **Scan label string**:
  - A character string that will be used as a Label to identify where data capture should start. If this label is found, then the data capture will begin from the "Data position from LBL" and continue until the specified "Length" is reached.
  - If the Scan Label is not found, no data will be captured.
  - An LSAM Dynamic Variable token may be  used in this field (refer to **F6**).
- **Scan label length**: Specifies the length of the character string entered in the "Scanlabel string" field. If this value is left at zero, the length of the label is assumed to be the last non-blank character in the Scan label string field. Specify a non-zero value in this field in order to include any trailing blanks as part of the Scan label string.
- **Scan label incidence**: This is the number of times that the Scan Label String must be found before starting the data capture. If the Scan Label is not found this number of times, no data capture will be performed. The "Data position from LBL" is computed from this incidence of the Scan Label. If this field is left at zeros, a value of 1 is assumed.
- **Data position from LBL**:
  - This field specifies the position of the data to be captured, relative to the start of the Scan Label String.
  - **+n** (a positive number) = start the data capture at this position relative to the start of the Scan Label, where 1 is the first byte of the Scan Label itself. In other words, it is possible to include the Scan Label as part or all of the captured data.
  - **-n** (a negative number) = start the data capture this number of characters before the Scan Label, where (-1) is the character position immediately preceding the Scan Label. The data capture may overlap the Scan Label itself.
  - **0** = Capture data beginning with the "Message data from pos." specified above. Using this value, it is possible to let the Scan Label be used only as means of qualifying whether or not any data should be captured from the message text buffer. If the scan label is not found, then no data will be captured.
- **Compress numeric data**:
  - **0** = not numeric
  - **1** = yes, compress numeric data
  - This flag indicates whether the captured data should be a simple character string, exactly as it appears in the message text buffer, or whether the data should be scrubbed to remove all except the digits. This flag is useful when a numeric value may be found in the message data, but the number included some formatting characters as it appeared in the message text. Setting this flag to 1 allows the real numeric value to be saved and later used in numeric computations.
  :::tip
  When numeric data is compressed, the number is saved as a whole number. There is no record of any decimal positions, so those are only implied. To preserve the number of decimal positions in captured data, use a Captured Data Response Rule to store the captured numeric data into an LSAM Dynamic Variable, having created the Dynamic Variable as a numeric field with a number of decimal places specified. (Refer to the SETDYNVAR command or the "Maintain dynamic variables" function from LSAM menus (on many LSAM menus) in Events and Utilities.)

#### Functions

- **F3=Exit**: Return to the LSAM menu.
- **F5=Refresh**: Reload the maintenance display with the original default values for Add, Copy or Change, discarding any new typed input.
- **F6=DynVar**: When the cursor is positioned in the Scan Label String field, use this function key to view a window of registered Dynamic Variable values and select a value to be inserted into the field.
- **F10=Capture App**: 
- **F11=Response rules**: Use this function key to branch directly to the Work with Capture Response Rules list display. This function key helps by carrying forward the Application ID and Sequence Number that are required to label any related Response Rules. After returning from that function, remember to press the <**Enter**> key to complete any pending updates of the Message Data Capture Definition record.
- **F12=Cancel**: Return to the Work with Message Data Capture Definition list.

### Copy/Delete Message Data Capture Rule (options 3 and 4)

Whenever the options 3=Copy or 4=Delete are being processed, the program will present a window that offers an opportunity to also copy or delete any Response Rules associated with the Capture Rule that is being maintained.

#### Manage Response Rules Window (Copy)
```
              Manage Response Rules

    Copy response rules also?   1  0=No, 1=Yes        

     (Recommended: 1=Yes)

Enter=Select   F12=Cancel
```

#### Manage Response Rules Window (Delete)
```
                    Manage Response Rules

    Delete response rules also?   1  0=No, 1=Yes      
    
     (Recommended: 1=Yes)

Enter=Select   F12=Cancel
```
#### Fields
- **Copy** *- or -* **Delete**?   
  - 0=No, 1=Yes 
  - When either option 3=Copy or option 4=Delete is selected, the program offers the option to perform either a copy or a delete of all Response Rules tht are related to each Capture Rule.
  - For option 0=No, the copy or delete action is completed, but any associated Response rules are ignored.

#### Functions

**F12=Cancel**: Quits the option window and returns to the list control display. (The copy or delete option remains incomplete and must be restarted, if desired.)

### Display Capture Rules/Response Rules Chart (option 7)

The Capture and Response Rules chart displays are explained in detail under Operator Replay Scripts, within the Screens and Windows section, under the title "Operator Replay Capture Chart (opt 7)."

Use this option to collect all related Capture Applications and Response Rules, plus show referenced Dynamic Variables, in a single list display. From this list, option 5=Display may be used to view the details of any record associated with a Message Management Parameters record. This option also shows when more than one Parameters record has the same selection criteria, but uses a unique Sequence Number.

### Work with Capture Response Rules

The Work with Capture Response Rules function is identical to the description provided in Events and Utilities, except that these Response Rules are related only to Message Data Capture Definitions instead of to SCANSPLF data capture. Please refer to [Captured Data Response Rules - Work with Response Rules](../events-utilities/captured-data-response-rules.md\#work-with-capture-response-rules) to see the screens and windows used to create Capture Response Rules.

#### Menu Pathways

-   Main Menu > Message Management menu (#2) > Work with Capture Data Response Rules (# 11)
-   Main Menu > Message Management menu (#2) > Work with Message Data Capture Definitions (# 10) > F11=Response rules.

Capture Response Rules for message data must be assigned an existing Application ID and Sequence Number from the list that can be viewed in the Work with Message Data Capture Definition, documented above in this topic. It is possible to use menu option **11** from the Message Management Menu to directly update Response Rules. However, it may be more convenient to use the function key **F11** from within the Work with Message Data Capture Definitions function, available from the Create, Change or Copy screen formats. Using function key **F11** limits the list display of Captured Data Response rules to only those rules related to the current Message Data Capture Definition application ID and sequence number.


---
sidebar_label: 'Message Management Logs'
---
# Message Management Logs

## Message Management Activity Log

### Log Choice Menu

When the Message Management Logs function is selected from the menu, an initial screen offers a choice between two different types of log file. The activity log appears in the following examples, but the OpCon job-level message management log uses the same list and detail display formats.

The OpCon job-level message management log shows the information that was sent by SAM-SS and saved by the LSAM when the job start request was received. This information is used to format job-specific responses that also appear in the activity log (as entry type OpConJob) if the message is actually encountered.

### LSALOGR10-0 - Message Management Logs

#### Menu Pathways

Main Menu > Message management menu (#2) > Message management logs (#2)

#### Fields

| Field            |  Default | Description |
| -----------------| ---------| ---------------------------------------------------------------------------------- |
| Selection entry  |          | Type a number from the list of options and press <**Enter**> to view that log.|

#### Functions

-   **F3=Exit**: Quits the managed messages list and returns to the menu.
-   **F12=Cancel**: Quits the tracked jobs list and returns to the menu.

#### Options

-   1 = Display message management activity log (LSALOGF10)
-   2 = Display OpCon job-level message management log (TRPMSGF20)

## Message Management Activity Log List

### LSALOGR10-1 - Message Management Activity Log

#### Menu Pathways

-   Main Menu > Message management menu (#2) > Message management logs (#2) > 1 (or 2)
-   The list and the details display the same for either of the Message Management log options, with the exception of the Reply Type column on the list that will show the actual Reply... when the OpCon job-level message management log is listed.

#### Fields

| Field            | Default                | Description            |
| -----            | -------                | -----------            | 
| Search content   |                        | To quickly search for a particular log entry, enter up to 10 characters of any log content value and press <**Enter**>. Any value that appears on the log detail display may be searched for, even though not all values appear in the list display.               |
| Opt              | None                   | <**Tab**> to a row in the table and enter an option.             |
| IBM i Job Name   | IBM i Name Rules (Refer to [IBM i Name Rules](../configuration/configuration.md#ibm-i-name-rules)) |  The name portion of an IBM i job. The IBM i full job names (per instance of a job) include the name, the submitting user name, and a unique job number. The name portion is common to as many instances of the same job definition as may be executed. The IBM i permits more than one instance of the same job name to be executed concurrently. |
| IBM i Job Number |                        | The IBM i job number. The job number identifies unique jobs using the same name on the list display.      |
| SAM Job Name     |                        | The name portion of the full job identifier assigned by OpCon. (Alternates with IBM i Job name)   |
| SAM Job Number   |                        | The numeric ID portion of the full job identifier assigned by OpCon. (Alternates with IBM i) |
| Date/Time        |                        | The time stamp when the message was logged |
| Msg ID           |                        | An IBM i message identifier (comprised of 3 letters followed by 4 digits). Definitions for message IDs may normally be found in message files stored in the DB2/400 database. |
| Resp             |                        | Response Type:  |
|                  |                        | **R** = Reply to message            |
|                  |                        | **E** = Event, sent to OpCon          |
|                  |                        | **B** = Both a reply and an event       |
| Reply Type       | Appears only for the Activity Log.  | The type of log entry:  |
|                  |                        | **LSAMtrap** = a message trap defined by the LSAM's on message management table.  |
|                  |                        | **OpConJob** = a job-specific message trap defined for the one job under the OpCon User Interface job master record. |
|                  |                        | **Error** = shown in Red, the Message Management facility attempts to log errors in Reply or Event execution. Use option 5=display to see details about the error entry. |
|                  |                        | **InfoText** = show in Blue, the Message Management facility adds log entries for actions that may be subject to audit, such as the replacement of any Dynamic Variable that was included in a message Event command. |
| Reply...         | Appears only for the OpCon job-level management log | Shows either the 6-character reply value, or the first portion of the Event command string, depending on the response type (Rsp). |

#### Functions

-   **F3=Exit**: Quits the managed messages list and returns to the     menu.
-   **F5=Refresh**: Retrieves the latest managed message log information and updates the display.
-   **F9=SAM job/IBM i job**: Changes the headings and the content of the job name and job number columns. This feature can be useful when searching for a job. When the current sort order is Sort name, that sort will apply to whichever type of job name is currently displayed on the list.
-   **F11=Sort date/Sort name**: Changes the sorted order of the list display. The column heading of the current sort order is displayed in pink color and the function key name changes each time <**F11**> is pressed.
-   **F12=Cancel**: Quits the tracked jobs list and returns to the menu.
-   **F16=Search next**: When a value is entered in the Search content field, or a value shows in pink below this field from the last search request, pressing <**F16**> finds the next (or first) occurrence of the value specified. F16 is useful for finding each desired log entry when there is more than one log entry that satisfies the search request. When a value is first typed into the Search content field, <**F16**> works the same as the <**Enter**> key for starting a new search. However, only <**F16**> may be used to continue a search past the first entry that satisfies the search criteria.
-   **F17=Top**: Causes the display to jump to the top of the list. This is the equivalent of the first record in the file. The sort order controls which records are listed first.
-   **F18=Bottom**: Causes the display to jump to the last entry in the list. This is the equivalent of the last record in the log file. The sort order controls which records are listed last. This function key is very helpful when the file is big.
-   **F24=More keys**: Toggles the function key legend between the two different lists of function keys that are available for this display.

#### Options

- **5** = Display detail

## Message Management Activity Log Detail

This detail display appears the same for the OpCon job-level management log, although the content of the fields will vary.

### LSALOGR10-2 - Message Management Activity Log Detail

#### Fields

- **Log timestamp**: The time stamp when the message was logged, that is, when the LSAM responded to the message.
- **Log key**: An internal record ID number assigned by the IBM i DB2 database manager.
- **IBM i job ID**: The full name of the IBM i job that issued the message.
- **SAM job number**: The numeric ID portion of the job identifier assigned by OpCon.
- **SAM job name**: The name portion of the job identifier assigned by OpCon.
- **Msg Mgmt Rec key #**:The internal record ID of the original |
Message Management Parameter record that was being processed when this log entry was generated. This number can be found in the list of the Message Management Parameter records in order to perform research into the master records that defined processing of the message.                               
- **Message ID**: An IBM i message identifier (comprised of 3 letters followed by 4 digits). Definitions for message IDs may normally be found in message files stored in the dB2/400 database.
- **Message File**: The IBM i object that stores message definitions and text. A message ID may be qualified by the message file from which its definition was taken.        
- **Message Severity**: A message must report this severity or higher in order for the LSAM to decide to respond to the message. A value of zeros means that message severity is not considered.  
- **Message queue**: A system object that stores messages (text included) that have been delivered by various jobs. The message queue where this job's message ID was found.                                 |
- **Message queue library**: The DB2/400 library where the message queue was located.     
- **Key group Sequence #**: A user-supplied sequence number that separates Message Management Parameter records that all use the same filter key field values. Multiple records in a single group will define a more complex response to a message than may be possible with a single Parameters record. For example, Sequence 10 might be linked to Capture Data Response Rules that prepare one or more Dynamic Variables, which can then be used in a Sequence 20 Parameter record to define the Reply to a message or the Event that will be executed.             
- **Compare Text**: A text string that was compared to the selected portion of the message text. This text is used to qualify which messages will be handed by the message 
manager, using the comparison method shown in the Type field.
- **Compare Type**: The Boolean operator used to match the Compare Text with the selected portion of the message text. EQ (equal) can match any portion of the selected message text, unless the Start Position is not zero. 
- **Compare Position**: The compare text value specified above must appear at the specific location within the primary message text in order for the LSAM to decide to 
respond to the message. A value of zeros for an EQ comparison means that the variable string may appear anywhere in the message text.
- **Compare Len**: The length of the strings from the Compare Text and the message text that will be compared. When this value is zero, the last non-blank character in the Compare Text determines the length of the comparison. When the length is longer than the Compare Text, the Compare Text will be padded with trailing blanks that must also match the selected portion of the message text.
- **Pri/Sec/Both Text**: Specifies which portion of the message text will be evaluated:  
  -   **Pri** = primary message text (the part that first appears in a message queue list).
  -   **Sec** = secondary message text, also referred to as the help text for a message.              
  -   **Both** = the primary text is followed by one blank, and then the secondary text is appended to it in a message text buffer used by the LSAM Message Management server program for comparison to the Compare Text. (The actual message text buffer is recorded in the next field of this log record display.)
- **Message text buffer**:
  -   The actual message text that was evaluated by the Compare rules. This buffer is an important record of exactly how the message text appears within the Message Management program when the primary and secondary text are appended together by the Both option (according to the Pri/Sec/Both Text field).
  -   If the plus sign (+) shows, the text buffer content is longer than will fit on this display. In that case, use the <**F8**> function key to see more message text.
- **Capture ID**: Shows the Capture Application ID, if this Parameter record was linked to a shared Capture Data application (and, via that link, also to any Response Rules). 
- **Answer type**: 
  - **R** = Reply to message               
  - **E** = Event, sent to OpCon       
  - **N** = None                           
  - **blank** = There will be no log entry for Both
- **End?**:
  - **The End Job option**: Specified only by job-level message responses defined in the OpCon User Interface job master, this option can force a job to end even if the response to the error message would normally allow the job to continue. (This option is not supported by the LSAM general message management table.)
  - **Y** = yes, end the job when this message qualifies for a response.
  - **N** = no, allow the job to continue (unless the message was an error that prevents the job from completing).
- **Message reply**: The value supplied by the LSAM message manager to answer a message requiring a reply, if the Answer Type was R or B. 
- **Threshold Limit**: The number of times this message must be processed, within the duration time, before this Parameter record is qualified for action. 
- **Threshold Duration**: The time in Days, Hours and Minutes since the most recent incidence count change, during which the count of activity is still valid. If a new incident is encountered after a longer time than this duration, the count of activity is started over at 1.
- **Threshold DynVar**: The name of the numeric LSAM Dynamic Variable that holds the count of activity for this Message Management Parameter record. The count in this variable will be reset to 1 if the duration is exceeded, or when it matches the Limit value.
- **Threshold DynVar Count**: The current count value that is being stored in the Dynamic Variable. 
- **Threshold duration Control**: 
  - **M** = use the Message Management timestamp compared to the current processing time to determine if the Threshold count is stale. 
  - **V** = use the Dynamic Variable timestamp of last update compared to the current processing time to determine if the Threshold count is stale.
- **M: (timestamp)**: The Message Management server timestamp as of the last previous incidence of this message. This value is used to determine whether the count is stale, according to the Duration, when the Threshold Control value is set to "M".
- **V: (timestamp)**: The Dynamic Variable module's timestamp as of the last previous activity that changed the Variable being used to hold this message's incidence count. This value is used to determine whether the count is stale, according to the Duration, when the Threshold Control value is set to "V".
- **Event command text, other log entry**:
  - **Event command text** = The actual text of the IBM i command or OpCon Event that was generated by the LSAM Message Manager, if the Answer Type was E or B.
  - **Error information** = label shown in red, when the text field is a record of an error message that was intercepted by the LSAM Message Manager.
  - **Log entry text** = label shown in blue, when the text field contains any general log entry, such as a record of how a Dynamic Variable token was replaced and what real value was used. 
  - If the plus sign (+) shows, the command is longer than will fit on this display. In that case, use the <**PageDown**> key to see the full command line.
 
#### Functions

-   **F3=Exit**: Quits the message management log details display and returns to the menu.
-   **F8=More msg**: When a plus sign(+) shows there is more text in the message buffer, this key causes a branch to a different display where the whole message text buffer may be viewed.
-   **F10=Captured Data**: If a Capture Application ID was associated with the original Message Management Parameter record, then this function key branches to the Captured Data Log list viewer program. From there it is also possible to link to the Response Rules debug log file list view, related to this same message.
-   **F12=Cancel**: Quits the message management log details display and returns to the list of managed messages.
-   **PageDown**: If a plus sign(+) shows at the end of the Event CMD line, use this key to branch to a view of the entire command string.

## Display Captured Message Data Log

### OPRL40R1 - Display Captured Data Log

#### Menu Pathways

-   Main Menu > Message management menu (#2) > Display Captured Message Data Log (# 8)
-   The list and the details display the same here as documented for this function in Events and Utilities. The only difference between SCANSPLF captured data and Message captured data (here) is found on the Details viewed when using option **5=Display**. This difference is documented next.

#### Display Captured Data Log Detail

This detail display appears identical to the same display documented in Events and Utilities, except that some fields in the top rows of the display have different labels because they apply to Message Data. The screen example below is followed by a partial Fields table that identifies the unique labels. Other information about this details display may be found in Events and Utilities Menu.

#### Menu Pathways

Main Menu > Message management menu (#2) > Display Captured Message Data Log (# 8) > 5=Display
 
#### Display Captured Data Log Detail
```
  OPRL40R5               Display Captured Data Log Detail              00/00/00   
  USERNAME           Log record RRN:       5   Type: M                 00:00:00 
                                                             MmRecKey:       1    
  Capture ID: MSGCAP01                        Seq: 010     Msg Queue: QUSER     
  Start:     1  TrpMsg #:  10            Length: 0012     Message ID: CPA2401    
  Capture Job ID: 123456/USERNAME/DEVICE                    MSGQ Lib: QUSRSYS   
  Date: 20100224  Time stamp: 2010-02-24-15.23.57.816000        MSGF: *ALL          
  Rows 1-12:                                                 Numeric: N
  2..5...10....5...20....5...30....5...40....5...50....5...60....5...70....5...80
 Message data____________________________________________________________________    
 ________________________________________________________________________________
 ________________________________________________________________________________
 ________________________________________________________________________________
 ________________________________________________________________________________
 ________________________________________________________________________________
 ________________________________________________________________________________
 ________________________________________________________________________________
 ________________________________________________________________________________
 ________________________________________________________________________________
 ________________________________________________________________________________   
  PAGEDOWN/UP   F3=Exit   F5=Refresh   F9=WRKJOB   F12=Cancel
```
#### Fields
- **Log record RRN**: This is the relative record number from physical file OPRLOGF40.
- Type:
  - **C** = Operator Replay screen data capture. 
  - **S** = SCANSPLF report spool file scanning.    
  - **M** = Message data capture.
- **MmRecKey**: This is the unique identifier number for the Message Management Parameters record that was linked to the capture Application ID. This number makes it easier to identify the Parameters record, rather than having to gather the 7 data fields that comprise the logical key of the record.  
- **Capture ID**: The identifier assigned to a group of data capture rules. For Captured Message Data, this is the Application ID.
- **(Capture) Seq**: The sequence number assigned to the data capture definition, representing the order of capture within the Capture ID.
- **Start**: This documents the starting position in the message text buffer where the captured data was found.
- **TrpMsg#**: "Trapped Message number" = this is the sequence number assigned to the Message Management Parameters record which pointed to the capture Application ID. This number combines with the Message ID, Job Name and other fields to complete a logical key identifying the Parameters record.
- **Length**: The length of data that was captured, starting at the Row and Col specified. For Operator Repla screen data, up to 1920 characters of displayable data may be captured by a single capture rule. (For display formats larger than 24 X 80, more than one screen capture rule would be required to capture more than 1920 characters of data. For the SCANSPLF command, the capture length is normally limited to 132 characters, or one print line of data.)
- **Msg Queue**: The message queue where the trapped message was found by the LSAM Message Management server job.
- **Message ID**: This is the IBM i ID of the message that was trapped by the Message Management Parameters record linked to the Application ID that performed this message data capture.
- **MSGQ Lib**:The library location of the Message Queue named above.
- **MSGF**: The name of the IBM i Message File that contains the definition of the Message ID that was trapped. 

  :::tip
  The remaining fields on this display are the same as documented for the SCANSPLF utility in [Events and Utilities Menu](../events-utilities/captured-data-response-rules.md/#display-captured-data-log-detail).
  :::


### Display Data Capture Debug Log (Response Rules Log)

The Display Data Capture Debug Log function is identical to the description provided in Events and Utilities, except that these log entries are related only to Message Data Capture Definitions instead of to SCANSPLF data capture. Please refer to Events and Utilities Menu to see the screen documentation for the Data Capture Debug log  and an explanation of the log entries. The Data Capture Debug Log display is also documented in Operator Replay Scripts, but again, those log entries would be only for captured screen data.

#### Menu Pathways

Main Menu > Message Management menu (#2) > Display Capture Debug Log (# 9)
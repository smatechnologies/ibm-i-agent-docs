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
| Selection entry  |          | Type a number from the list of options and press **Enter** to view that log.|

#### Functions

- **F3=Exit**: Quits the managed messages list and returns to the menu.
- **F12=Cancel**: Quits the tracked jobs list and returns to the menu.

#### Options

- **1** = Display message management activity log (LSALOGF10)
- **2** = Display OpCon job-level message management log (TRPMSGF20)

## Message Management Activity Log List

### LSALOGR10-1 - Message Management Activity Log

#### Menu Pathways

- Main Menu > Message management menu (#2) > Message management logs (#2) > 1 (or 2)
- The list and the details display the same for either of the Message Management log options, with the exception of the Reply Type column on the list that will show the actual Reply... when the OpCon job-level message management log is listed.

#### Fields

| Field            | Default                | Description            |
| -----            | -------                | -----------            | 
| Search content   |                        | To quickly search for a particular log entry, enter up to 10 characters of any log content value and press **Enter**. Any value that appears on the log detail display may be searched for, even though not all values appear in the list display.               |
| Opt              | None                   | **Tab** to a row in the table and enter an option.             |
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

- **F3=Exit**: Quits the managed messages list and returns to the     menu.
- **F5=Refresh**: Retrieves the latest managed message log information and updates the display.
- **F9=SAM job/IBM i job**: Changes the headings and the content of the job name and job number columns. This feature can be useful when searching for a job. When the current sort order is Sort name, that sort will apply to whichever type of job name is currently displayed on the list.
- **F11=Sort date/Sort name**: Changes the sorted order of the list display. The column heading of the current sort order is displayed in pink color and the function key name changes each time **F11** is pressed.
- **F12=Cancel**: Quits the tracked jobs list and returns to the menu.
- **F16=Search next**: When a value is entered in the Search content field, or a value shows in pink below this field from the last search request, pressing <**F16**> finds the next (or first) occurrence of the value specified. F16 is useful for finding each desired log entry when there is more than one log entry that satisfies the search request. When a value is first typed into the Search content field, **F16** works the same as the <**Enter**> key for starting a new search. However, only **F16** may be used to continue a search past the first entry that satisfies the search criteria.
- **F17=Top**: Causes the display to jump to the top of the list. This is the equivalent of the first record in the file. The sort order controls which records are listed first.
- **F18=Bottom**: Causes the display to jump to the last entry in the list. This is the equivalent of the last record in the log file. The sort order controls which records are listed last. This function key is very helpful when the file is big.
- **F24=More keys**: Toggles the function key legend between the two different lists of function keys that are available for this display.

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
- **Capture App Key / ID**: Shows the Capture Application Key and text ID, if this Parameter record was linked to a Capture Message Data application (and, via that link, also to any Response Rules). 
- **Before/After**: If a Capture Application was linked, were the Captures and Resonse Rules executed before (**B**) or after (**A**, or blank) the primary Event Command and/or Reply to a message were processed.
- **Answer type**: 
  - **R** = Reply to message               
  - **E** = Event, sent to OpCon       
  - **N** = None: The Parameters record exists only to link to Captured Data and Response Rules.
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

- **F3=Exit**: Quits the message management log details display and returns to the menu.
- **F8=More msg**: When a plus sign(+) shows there is more text in the message buffer, this key causes a branch to a different display where the whole message text buffer may be viewed.
- **F10=Captured Data**: If a Capture Application ID was associated with the original Message Management Parameter record, then this function key branches to the Captured Data Log list viewer program. From there it is also possible to link to the Response Rules debug log file list view, related to this same message.
- **F12=Cancel**: Quits the message management log details display and returns to the list of managed messages.
- **PageDown**: If a plus sign(+) shows at the end of the Event CMD line, use this key to branch to a view of the entire command string.

## Display Captured Data Log

### OPRL40R1 - Display Captured Data Log

The function for displaying the captured data log is important as an auditing tool. This inquiry provides evidence of the data that was actually captured from either a display screen during an Operator Replay script execution, or from a report line during the use of the SCANSPLF command.

A detailed explanation of this inquiry feature is presented in [Display Captured Data Log](/events-utilities/captured-data-response-rules.md#display-captured-data-log).


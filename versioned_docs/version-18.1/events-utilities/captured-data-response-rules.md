---
sidebar_label: 'Captured Data Response Rules'
---
# Captured Data Response Rules

## Captured Data and Response Rules Overview

The "Captured Data" feature of the IBM i LSAM Agent refers to the capability of various Agent automation tools to detect and store data from the following sources:

- SCANSPLF:  Capture data from report spool files.
- Operator Replay:  Capture data displayed on workstation screens.
- Message Management:  Capture primary and/or secondary message text from messages appearing in message queues.

Detailed instructions about capturing these types of data are provided in separate sections of this Agent documentation, under the titles assigned to each of the Agent automation tools listed above.

The Agent is actually able to capture data from other sources in the IBM i partition.  One example is the ability of Dynamic Variables to fetch data from DB2 database tables and data areas.  Dynamic Variables can also fetch IBM i system values directly.  But these alternate data access methods are not supported by the Response Rules scheme explained in this section.

The LSAM Captured Data Log file stores individual data values up to 1920 characters in length. Although there are separate master files that store the Capture Data Rules for each of the three Agent functions listed above, there is only a single Agent log file (OPRRPYF40) used to store data captured by the three data capture functions:  workstation display data captured by Operator Replay script steps, report values found by the SCANSPLF command, and message text values captured by Message Management.  Each Captured Data Log file record has a code assigned that indicates the source of the data.  The data capture log file serves as an audit mechanism to prove the outcome of each of those capture functions. The data capture records also function as a connection point to optional Captured Data Response Rules. (Refer to [The Data Capture Logging Functions](#the-data-capture-logging-functions) for more information.)

### Managing Data Capture Applications

A prototype design for Data Capture Applications survived through Agent version 18.1.  (This design is enhanced for Agent version 21.1 and newer.  SMA recommends migrating to a newer Agent version from 18.1 for this reason.)

The original design used the Capture Application descriptive text as the anchor key that collects one or more Capture Rules, and it is also used to link one or more Captured Data Response Rules to any of the Data Capture Rules.

Since the "Application ID" text is a key value for the master file, it cannot be changed once the first Data Capture Rule is registered.  If it is necessary to make a change, a new set of Data Capture Rules must be created.  This process can be simplified by using option 3=Copy to build a new Data Capture Rule data set using different Application ID text.  During an Data Capture Rule copy process, an option is offered to also copy any attached Response Rules, so this method saves work and helps reduce any errors during the process of setting up a different Application.  However, depending on the Agent feature, when a new Application ID is created it may be necessary to update the reference to this Application if the new Application ID should be used instead of the original ID.

An overall summary of Data Capture and Response Rules functions can be found at the end of this topic, starting with [How Data Capture Works](#how-data-capture-works).

Details about the unique Data Capture rules are provided in the chapters about that Agent automation feature:  Operator Replay, Message Management, or Events and Utilities (this chapter) - Scan Rules.

### The Function of Response Rules

Captured Data Response Rules provide a way to cause any number of IBM i commands or programs to be executed during the processing of the SCANSPLF command, an Operator Replay script or a Message Management Parameter. The actual Capture Rules are unique to each of these source applications, since the source material is different. But they all put their captured data into the same LSAM Captured Data Log (the multi-purpose log file OPRLOGF40), and this represents their common link to the Response Rules engine. 

The support for Dynamic Variables built into each of the data source features means that Captured Data Response Rules could be used to change Dynamic Variable values as the Agent's automation process runs, enabling the Agent's automation process to vary depending on data values that are captured and recognized. 

A common application of capturing data and triggering response rules is to build customized system and application monitors that can be used to trigger, via the response rules, notifications when thresholds are exceeded, or to collect performance data for later evaluation.  Financial applications typically balance batches of transaction data by capturing batch totals and then comparing them to control data that could have been established by any machine or network connection accessible to the OpCon application server.

Captured Data Response Rules also provide an exit program capability, supporting one of several means for tightly coordinating LSAM automation functions with third-party software - in either direction.

### How Captured Data Responses are Triggered

Whenever the system writes a new record to the Captured Data Log file, it also checks for response rules that match the data capture identifying key fields. The identifying key fields include the Application ID associated with each data capture operation and the sequence number of the data capture rule. Captured data is further identified by key values that are unique to each capturing application. A Type flag marks captured data as resulting from the SCANSPLF command, from an Operator Replay screen or from Message Data.

The Captured Data Response Rules appear the same for any data capture source. Only the key values assigned to the rule are different, depending on the data capture source.

### Adding Data Capture Response Rules from the LSAM Menu System

This is a generalized outline that can be applied to any of the three Agent automation features that support data capture.  Details about defining each type of data capture can be found in the documentation topic assigned to any of the Agent features.

1. In the command line, enter **STRSMA** or **LSAMENU**. For more information on command parameters, refer to the [STRSMA Command](../operations/lsam.md#the-strsma-command) and the [LSAMENU Command](../operations/lsam.md#the-lsamenu-command).
2. Choose the sub-menu from the SMA Main Menu applying to the appropriate Agent automation tool.
3. Enter the menu number for the Work with _____ Capture Definitions.
4. Use **F6=Add** to define at least one Data Capture Rule (or, for the SCANSPLF utility, one Scan Rule).
    - At least one Data Capture Rule must be defined befor the convenient LSAM menu option Work with SCANSPLF Applications will show any entries.  (This changes starting with Agent version 21.1, which supports creating a simple Application ID as an anchor for Data Capture and linked Response Rules.)
    - Maintenance of existing Data Capture Applications can be selected from a menu option to Work with Application IDs, after at least one Data Capture Rule is created.
5. Choose the menu number for the **Work with Captured Data Response Rules**.
    - The system always forces the Work with Captured Data Response Rules function to support only data capture definitions that are matched to the current Agent sub-menu:  SCANSPLF (from the Events and Utilities menu), Operator Replay screen data, or Message Management message data.
    - Each Data Capture Definition screen also supports function key **F11** for direct access to Response Rule maintenance.
6. Press **F6** to Add a new Capture Response Rule record in the Work with Capture Response Rules screen.
7. As necessary, use function key **F4** to choose an Application ID and a Capture Data Rule.
8. On the Create Capture Response Rule screen, type the Capture Sequence number and its descriptive text.
    - Assign a unique Response Sequence number to each response rule. The order of the sequence number determines which response rule will be executed first.
9. Type a value for the Compare rule (refer to more information under [Add/Change/Copy Capture Response Rules](../events-utilities/captured-data-response-rules.md#addchangecopy-capture-response-rules)). A simple value set that allows a response rule to always execute is "EQ" (equal) to the compare data special value of *ANY.
10. Type a Continuation field value if more than one comparison rule must apply. Otherwise, leave this field blank to specify one, simple response rule. (Refer to more information in [Add/Change/Copy Capture Response Rules](#Add/Chan2).)
11. *(Optional)* Specify the names of a Dynamic Variable  and/or an Operator Replay Token variable that will be used to store the captured data value.  
    - Function key **F8** can be used to present window showing a select list of existing Dynamic Variables.
12. Type a value for the Compress numeric field. Specify Y = yes if the captured and compare data values are numeric, otherwise specify N = no. 
    - For the SCANSPLF Scan Rules this flag must correspond to the similar flag found on the associated Scan Rule master record.
13. Type the Response cmd (command) to execute if the compare data rule is matched. Use function key <**F13**> if the command string is longer than will fit in the initial screen input field.
14. Type a value for the Compare data lines 1-5. Use function key **F13** if the compare data is longer than will fit into lines 1 to 3. The special values of \*ANY, \*PARM, or "DynVar" may be used. (Refer to [Add/Change/Copy Capture Response Rules](../events-utilities/captured-data-response-rules.md#addchangecopy-capture-response-rules).)
15. The value for the Capture length field is supplied once a Capture Identifier and Capture Sequence number have been specified. This field will be loaded with a value if the F4=Prompt function key was used to select an existing Data Capture rule.
16. Press **Enter** to record the new Capture Response Rule record.
17. The system returns to an updated list of existing Capture Response Rule records.

## Work with Capture Response Rules

- **Screen Title**: Work with Capture Response Rules
- **Screen ID**: OPRR50R1

The same data capture response functions support both Screen data capture for Operator Replay and report data capture for the SCANSPLF utility command. Some of the following description includes information that is useful in distinguishing between the two different types of data capture. Each actual data capture definition and the captured data record are labeled by their Type field, where "C" = screen capture and "S" = spool file capture. The list column headings will change depending on the subset rule that is currently in effect. 

Refer to the How To discussion earlier in this topic for more information about ways to use data capture and captured data response rules.

##### Menu Pathways

- Main Menu \> Events and Utilities menu (#3) \> Work with Captured Data Response Rules (#5).
- Main Menu \> Operator Replay menu (#4) \> Work with Captured Data Response Rules (#6).
- Main Menu \> Message Managment (#2) \> Work with Captured Data Response Rules (#11).

- From any of the three Capture Data definitions (SCANSPLF, Operator Replay or Message Management) \> **F11** = Response Rules.  This direct connection automatically links any newly created Response Rules with the Capture Definition on the screen when function key F11 was pressed.

##### Fields
- **Subset to Type**: When this Work With list has been called directly from the menu, the LSAM menu passes a parameter to signal the program whether the call came from the Operator Replay menu (Type = Screen), or from the Events and Utilities Menu (Type = SCANSPLF). Function key F15 can be used to force a change to the Subtype, or to remove subsetting and show all Response rules of both types.
- **Search content**: Type a value in this field and press **Enter** or **F16** to initiate a search for a record that has matching data anywhere in the record, including data that might not appear on the list display (but the matching data would appear in the display of the detail of the record). When **F16** is pressed a second time, the search continues from after the last matching record, using the same Search content data. Press **Enter** a second time or press **F5=Refresh** to start a new search.
- **Opt**: Type option from list displayed near the top of this screen. Refer to options definitions, below.
- **Capture ID (APP)**: A label that groups together all of the data capture rules that apply to a single SCANSPLF Scan Rule (or to an Operator Replay script Sequence number). In the SCANSPLF command, the Capture ID is known as the Application.
- **SEQ**: The sequence of the source Application Scan Rule (or Operator Replay data capture rule). This number determines the order in which spool file scan rules (or  Operator Replay data capture rules) are executed. The effect of this sequence number is that it imposes a higher level of control over the sequence of response rules, and the Response Sequence number (below) operates within this higher level.
- **T**: Type: C = Operator Replay screen data capture, S = SCANSPLF Scan Rule data capture, M = Message Management message data capture.
- **RS#**: Response Sequence Number: The order in which each response rule will be executed (that is, within the higher order data capture SEQuence order).
- **SplFName**: Spool File Name: When the Response Rule Type is S, this column shows the Spool File Name assigned to the SCANSPLF Scan Rule to which this response is attached.
- **SplF #**: 
  - Spool File Number: When the Response Rule Type is S, this column shows the Spool File Number assigned to the SCANSPLF Scan Rule to which this response is attached.
  - The Spool File Number is actually an attribute of a spool file after it is produced by the Job Name (next field in table), but this column becomes the Operator Replay Script Step Number when the Type is C.
- **SplFJobName**:
  - Spool file Job Name: When the Response Rule Type is S, this column shows the Job Name value assigned to the SCANSPLF Scan Rule.
  - (This column is not used for Operator Replay Script Steps, Type C.)
- **Command**: The command text (first few characters shown) that will be executed in response to captured data, if the comparison data rule qualifies. (Use option 5=Display to view the comparison data rule.)

##### Functions

- **F3=Exit**: Return to the LSAM menu.
- **F5=Refresh**: Reload the list display with the latest data from the master file.
- **F6=Add**: Branch to the screen for creating a new Capture Response Rule record.
- **F11=Alt view**: Change the list view to show different titles and data columns.
- **F12=Cancel**: Return to the LSAM menu, or to the calling program (such as the Data Capture definition screen).
- **F15=Subset type**: When this program was called directly from the LSAM menu, this function key appears, permitting a change to the type of Response rule appearing in the list. The Subset window offers a choice of Type C = screen capture response rules, S = SCANSPLF data capture response rules, or M = Message Management response rules.
- **F16=Search next**: When a search argument has been entered in the Search content field, pressing F16 can either start a new search (if the content value was changed) or it can continue a search to look for the next list entry that matches the search argument, starting with the first record after the last match found.
- **F17=Top**: Reposition the list display to show the first record in the list.
- **F18=Bottom**: Reposition the list display to show the last record in the list.
- **F24=More keys**: Change the function key line to show additional supported keys.

##### Options

- **2=Change**: To change a record, type 2 in the Opt field next to the record(s). Press <**Enter**> to proceed to the Change detail screen.
- **3=Copy**: To copy a record, type 3 in the Opt field next to the record. Press <**Enter**> to proceed to the Copy detail screen.
- **4=Delete**: To delete one or more records, type 4 next to each record. Press <**Enter**> to proceed to the Delete confirmation
    window.
- **5=Display**: To display record details, type 5 next to each record. Press <**Enter**> to proceed to the display details screen. Typing option 5 next to many or all records at once before pressing <**Enter**> is a convenient way to review all the definition details at once. Press <**Enter**> to advance as each detail screen is presented.

### Add/Change/Copy Capture Response Rules

- **Screen Title**: Add/Change/Copy Capture Response Rule
- **Screen ID**: OPRR50R2

Refer to [How Captured Data Response Rules Work](#how-captured-data-response-rules-work) for more information about the meaning and purpose of the fields on this display, especially how the Continuation field works.

##### Menu Pathways

Main Menu \> (sub-menu per Agent automation feature) \> Work with Captured Data Response Rules \> F6=Add **- or -** option 2=Change **- or -** option 3=Copy.

##### Fields

- **From fields (Resp Seq)**: When this screen appears in Copy mode, the key fields of the source record being copied are shown in this heading area. When this program is called from the Operator Replay Sequence maintenance, only the Response Sequence appears in the From field list. A new value must be assigned to the new Response Rule record being created in Copy mode, using the Response Sequence input field (below).
- **Capture Identifier**: A label that groups together all of the data capture rules that apply to a single Operator Replay script Sequence number. For Copy and Change operations, this key field is protected from update. This field and the Capture Seq field (next) identify the rule to which this response record will react.
- **Seq**: The sequence of the data capture rule to which this response will react. For Copy and Change operations, this key field is protected from update. This number determines the order in which data capture rules are executed.
- **Type**: Type: C = screen capture, S = SCANSPLF report data capture, M = Message Management message text capture. This must be the type of the data capture definition. For Copy and Change operations, this field is protected from update.
- **Response sequence**: Response Sequence Number: The order in which each response rule will be executed. When changing an existing rule's sequence number, pay close attention to the Continuation field value, because the order of records is critical when the Continuation field is used to group multiple response qualifications (using Compare data) and commands.
- **Continuation**: 
  - Continuation field values are: blanks, CMD, AND, OR. 
  - A value that supports multiple groups of commands and/or rules that may be qualified for execution in response to a single record of captured data. In summary, the values work like this:
  - blank = Starts a new group of comparison rules and commands, separate and unrelated from other rules groups. 
  - OR = an exclusive OR, meaning that the next comparison rule or group of rules may qualify a response command group if the previous rule group did not qualify.
  - AND = connects more than one qualification rule into a single group.
  - CMD = an additional rules record is providing an additional response command to execute, associated with the qualification rules of the comparison record or     group of records immediately preceding this record. This continuation record will be ignored for comparison rules, it exists only to support multiple commands that are part of a single response group.
  - (For more information on this field and examples, refer to the How To discussion above.) 
- **Compress numeric**: This flag field tells the LSAM data comparison rule engine how to handle the comparison data and the captured data. If numeric data was edited using a currency sign and decimal point, it may be preferable to match the whole character string exactly, without compression. But if the absolute numeric value is important and the numeric field editing cannot be predicted, then it may work better to compress out all non-numeric characters and compare only the numeric digits. Compressed numeric values do not keep track of how many digits fall to the right of the decimal point, so it is important that the number of decimal places be the same in both the captured data and the comparison data when the option for compressing numeric data will be used.
:::tip
The setting of this flag also controls how captured data will be stored into a DynamicVariable, if one is named in the field below.
:::
- **Store CAPT to-> DynVar**: 
  - Typing a name into this field causes the captured data response rule module to create or update an LSAM Dynamic Variable in the LSAM table using the value of the captured data. This field is limited to only type-V (general use) Dynamic Variables. The LSAM command SETDYNVAR is executed by the response rules module to support this field.
  -  This variable value is set before the response command is processed, meaning that the response command can use the same dynamic variable name in order to have access to the currently captured value.
  :::tip
  The format of the captured data that is stored in the Dynamic Variable is affected by the Compress numeric option, above.
  :::
  - To create or update a type-L Dynamic Variable, insert a SETDYNVAR command into the response command line. This could be done on a separate response rule record that is associated with the same SPLF Scan Rule or Operator Replay screen capture rule.
- **Store CAPT to> Oper Rply Var** (Operator Replay Variable): 
  - Typing a name into this field causes the captured data response rule module to create or update an LSAM Operator Replay token variable in the LSAM table.
  - When Captured Data Response Rules are associated with an Operator Replay script's Screen Capture Rule, the setting of the Operator Replay token variable value is completed before the script step responds to the current screen on display. This means that the content of the screen can be used to set the variable and the same variable name can then be used in the command line of the script step's response to the screen format.
- **Response cmd** (part 1); F13=Full CMD: 
  - The first 214 characters of the response command string may be entered in this field. If the command is longer than 214 characters, press <**F13=Full CMD**> to branch to a screen where a much longer command string may be entered. Function key <**F4=Prompt**> may be used to get IBM i help with command prompting. Unlike the Compare data lines, the entire command string will appear in the F13=Full CMD screen. Be careful if a partial command shows in this field in Change mode; in this case it is recommended that F13=Full CMD be used to be sure that the final command syntax is correct after any changes.
  - Dynamic Variables may be used in place of all or part of the command line syntax. (For more information about Dynamic Variables, refer to Job Tracking and Queuing.)
  - Also refer to the discussion below about how LSAM Event commands can be used in this field, and how OpCon property (variable) tokens can also be supported when an Event command is used. (Any other IBM i command may also be used in this field, but only Event commands are supported for replacing OpCon property tokens.
- **Comp reference value**: 
  - The compare reference value is a field containing a character string or a reference to a value store in another file, for use in qualifying this Rule for execution. If the referenced value does not match the Compare data according to the Compare rule, then the Capture Response Rule Response command will not be executed.
  - \*CAPT = Use the captured data as the reference data (this is the original default for comparing data, in prior versions).
  - DynVar = The LSAM Dynamic Variable named in this field will be compared to the Compare data. (Do not type 'DynVar' but instead type the name of a Dynamic Variable. Use function key F8 to select from a list of existing dynamic variables.) 
  - char = a specific string typed in this field will be compared to the Compare data.
- **Comp reference length**: Specifies the length of data to be used from the Comp reference value, starting at position 1 of the reference value. If this field is zero, then the trimmed length of the reference value will be used. (Trimming means that any trailing blanks will not be considered, only data from position 1 through the last non-blank character will determine the length of the Comp reference value.)
- **Compare rule**: 
  - Specifies the type of compare to use between the Comp reference value (which will be factor 1) and the Compare data (which will be factor 2). For example, if GT is specified, then the Comp reference value must be greater than the Compare data in order for this Capture Response Rule to be executed.                 |
  - EQ = equal, NE = not equal, GT = greater than, LT = less than, GE = greater than or equal, LE = less than or equal, ** = contains (as in, the Comp reference value contains the Compare data anywhere within the Comp reference value string).
- **Capture length**: This is a protected field that shows the length specified for the captured data. The value will appear in Copy and Change mode. In Add (Create) mode, a value will be supplied if the F4=Prompt key is used to select a valid Capture ID and Sequence. Use this field as a reference when defining the Compare data.
- **Compare data lines 1- 5; PagDown=6-24**:
  - The compare data is used to match with the original capture data according to the compare rule. The compare data may be typed directly into this field. Use PageDown to show and update lines 6-24; lines 1-5 only appear on the main maintenance screen. Up to 1920 characters may be specified.
  - If it should be desired to compare an entire 24 X 80 screen, that is, all 1920 characters, it would be possible to copy and paste the reference screen image (lines 1-5 separately from lines 6-24) into this field. However, keep in mind that only the displayable characters are compared. That is, field attributes such as color (and any EBCID character value less than X'40') will not be considered; a space character is used in place of non-display values.
  - Special values may be typed into this field, instead of actual compare data:
  - \*ANY = No comparison will be performed. A command or group of commands associated with compare data value of *ANY will always be executed.
  - \*PARM = Reserved for the SCANSPLF command. This means that the compare data to be used is the same as the parameter value supplied with the SCANSPLF command, except that the Compare rules supplied with this response record will apply. If this value is used with an Operator Replay screen data capture, it has the same effect as \*ANY. 
  - DynVar = This prompting value indicates that one or more Dynamic Variable tokens may be typed into the Compare data lines. DO NOT TYPE "DynVar" into the Compare  data. Instead, type the Dynamic Variable token syntax, which by default looks like this: {dyn_var_name}
  - One or more dynamic variables may be typed along with other actual compare data. When the response rule is qualified for execution, the dynamic variable value will be retrieved just before the comparison operation is performed. Keep in mind that the result of replacing a dynamic variable may be longer or shorter than the dynamic variable token. It is important to anticipate the exact length and content of the compare data line(s) as they will look after dynamic variable tokens are replaced. (For more information about Dynamic Variables, refer to the chapter about [Dynamic Variables](../dynamic-variables/overview.md/#introduction-to-dynamic-variables).)

##### Functions

- **F3=Exit**: Return to the LSAM menu.
- **F4=Prompt**: When the cursor is positioned in the Capture identifier or Capture sequence fields, a window appears for selecting from a list of available capture identifiers. The contents of the list depends on whether this display is being used for Operator Replay screen data capture, or for SCANSPLF report data capture.
- **F5=Refresh**: Reload the maintenance display with the original default values for Add, Copy or Change, discarding any new typed input.
- **F8=DynVar**: Display a list of Dynamic Variable names from which a name can be selected and inserted into the field where the cursor was located when F8 was pressed.  Fields that support {TOKEN} translation will have the curly brackets added to the variable name, but the Store to -> field will insert only the variable name.
- **F9=Event cmds**: Open a window to select from a list of available LSAM Event commands, to be inserted into the Response Command field after the Event command fields are filled in. (Refer to discussion below about using OpCon property (variable) tokens with Event
    commands.)
- **F10=$Var**: Display a list of Agent System variables from which a variable name can be selected and then inserted into the field where the cursor was located when F10 was pressed. For more information see [$-System Variables](./system-variables.md).
- **F12=Cancel**: Return to the Work with Capture Response Rules list display.
- **F13=Full CMD**: Branch to a sub-display that uses the whole screen to show the entire available space for entering long command text strings. Any data entered on the short (part 1) command entry line will be carried forward for display on the full command entry screen. After returning from the full entry screen, the first 214
    characters of the longer command will appear in the short (part 1) Response cmd field.
- **F24=More keys**: Change function key line to show additional supported keys.

#### LSAM Event Commands and OpCon Property Tokens

The response command line supports execution of LSAM Event commands, just like any other IBM i command. But Event commands have additional support. The function key **F9** can be used to select from a list of available Event commands and then to have their keyword fields automatically prompted. When an Event command is placed into the response command line, and only for Event commands, the LSAM programs will support embedded OpCon property (variable) tokens.

The feature of including OpCon property tokens in an LSAM Event command is described in complete detail in the topic about Message Management. Look for references to the Event command line of the Message Management Parameter screen. In that topic there is a complete table of the specific OpCon property (variable) token values that can be supported directly by the LSAM itself, if a certain syntax is used. In general, any OpCon property token could be used because the LSAM passes along the Event command string with the OpCon property tokens in tact, signaling the OpCon server programs to translate the tokens into the values that are stored in the OpCon database.

## Display Captured Data Log

The function for displaying the captured data log is important as an auditing tool. This inquiry provides evidence of the data that was actually captured from either a display screen during an Operator Replay script execution, or from a report line during the use of the SCANSPLF command.

- **Screen Title**: Display Captured Data Log
- **Screen ID**: OPRL40R1

The same data capture response functions support both Screen data capture for Operator Replay and report data capture for the SCANSPLF utility command. Some of the following description includes information that is useful in distinguishing between the two different types of data capture. Each actual data capture definition and the captured data record are labeled by their Type field, where "C" = screen capture, "S" = spool file capture and 'M' = Message data.

Refer to the How To discussions above in this topic for more information about ways to use data capture and captured data response rules.

##### Menu Pathways

Main Menu \> Operator replay menu (#4) \> Display Captured Data log (#8).

##### Fields

-  **Subset to Type**: When this list display has been called directly from the menu, the LSAM menu passes a parameter to signal the program whether the call came from the Operator Replay menu (Type = Screen), or from the Events and Utilities Menu (Type = SCANSPLF). Function key F15 can be used to force a change to the Subtype, or to remove subsetting and show all Response rules of both types.
-  **Search content**: Type a value in this field and press **Enter** or **F16** to initiate a search for a record that has matching data anywhere in the record, including data that might not appear on the list display (but the matching data would appear in the display of the detail of the record). When <**F16** is pressed a second time, the search continues from after the last matching record, using the same Search content data. Press **Enter** a second time (with no options typed), or press **F5=Refresh** to start a new search.
-  **Opt**: Type option from list displayed near the top of this screen. Refer to options definitions, below.
-  **Capture ID**: A label that groups together all of the data capture rules that apply to a single Operator Replay script Sequence number. (This field is more important when data capture is used with the SCANSPLF command, and only serves Operator Replay screen capture as a useful means of labeling captured data when it appears in the captured data debug log file list, or when prompting for a Capture ID from Response Rules.)
-  **Seq**: The sequence of the data capture rule. This number determines the order in which data capture rules are executed. The effect of this sequence number is more noticeable when there are captured data response rules associated with each data capture definition, in that it imposes a high level of control over the sequence of response rules that might apply to a given screen format (or to a SCANSPLF spool file).
-  **MM-DD-HH.MM**: A portion of the time stamp of the log entry, showing the month, day, hours and minutes.
-  **T**: Type: C = screen capture, S = SCANSPLF data capture, M - Message Management
-  **Script/SPLF**: The name of the Operator Replay Script, or the name of the spool file that was processed by the SCANSPLF command. The value shown here is defined by the value in the T (Type) field.
-  **Number**: For an Operator Replay Script, the Sequence number of the step when the screen data was captured. For a spool file, the spool file number within the job where the spool file was found.
-  **JobNbr**: The IBM i Job Number of the job that executed the Operator Replay script or the SCANSPLF command. This number helps to distinguish among list entries that belong to the same, or to different jobs.

##### Functions

- **F3=Exit**: Return to the LSAM menu.
- **F5=Refresh**: Reload the list display with the latest data from the master file.
- **F12=Cancel**: Return to the LSAM menu.
- **F15=Subset**: Supports a change to the type of captured data entries appearing in the list. The Subset window offers a choice of Type C = screen capture response rules, or S = SCANSPLF data capture response rules.
- **F16=Search next**: When a search argument has been entered in the Search content field, pressing F16 can either start a new search (if the content value was changed) or it can continue a search to look for the next list entry that matches the search argument, starting with the first record after the last match found.
- **F17=Top**: Reposition the list display to show the first record in the list.
- **F18=Bottom**: Reposition the list display to show the last record in the list.
- **F24=More keys**: Change the function key line to show additional supported keys.

##### Options

- **5=Display**: To display record details, type 5 next to each record. Press <**Enter**> to proceed to the display details screen. Typing option 5 next to many or all records at once before pressing <**Enter**> is a convenient way to review all the definition details at once. Press <**Enter**> to advance as each detail screen is presented.
- **9=WRKJOB**: Calls the IBM i Work with Job function for the job number that appears in the list. This function can help find output produced by a captured data response rule, or it can help find the spool file that was scanned by the SCANSPLF command.

### Display Captured Data Log Detail

- **Screen Title**: Display Captured Data Log Detail
- **Screen ID**: OPRL40R5

##### Menu Pathways

Main Menu \> Events and Utilities menu (#3) \> Display Captured Data log (#8) \> option 5=Display.

##### Fields

- **Log record RRN**: This is the relative record number from physical file OPRLOGF40 
- **Type**:
  - C = Operator Replay screen data capture
  - S = SCANSPLF report spool file scanning 
  - M = Message data capture 
- **Capture ID**: The identifier assigned to a group of data capture rules. For Captured Message Data, this is the Application ID.
- **(Capture) Seq**: The sequence number assigned to the data capture definition, representing the order of capture within the Capture ID.
- **Page**: This field is not used by Operator Replay screen data capture. For the SCANSPLF command, this documents the page of the report where the captured data was found.
- **Rpt Line**: For the SCANSPLF command, this is the report line, within a page, where data was found and captured.
- **Col(-umn)**: The column within the Row where the data capture started.
- **Length**: The length of data that was captured, starting at the Row and Col specified. For Operator Replay screen data, up to 1920 characters of displayable data may be captured by a single capture rule. (For display formats larger than 24 X 80, more than one screen capture rule would be required to capture more than 1920 characters of data. For the SCANSPLF command, the capture length is normally limited to 132 characters, or one print line of data.)
- **Capture Job ID**: The IBM i full job name that made the Captured Data log entry. This is the job that will be shown if the function key F9=WRKJOB is pressed.
- **Date**: The log file entry date, in CCYYMMDD format. Used to purge the log file, based on the LSAM log file retention days (refer to LSAM Parameters).
- **Time stamp**: The IBM i system time when the log entry was written.
- **SPLF Name**: The spool file name scanned by the SCANSPLF command.
- **SPLF number**: The Spool File Number of the spool file named within the job that qualified for the SCANSPLF command.
- **SPLF SrcJob**: The name of the job specified for the SCANSPLF command. When the SCANSPLF command was executed by the LSAM for the special purpose of evaluating an OpConrequested job completion status, this field will show a value of '\*JORS.'
- **Numeric**: Y = yes, N = No: Indicates whether numeric data compression was specified for the captured data.
- **Rows 1-12**: Rows 13-24: 2..5...10....5...20: The row and columns of the capture data are labeled. Press PageDown or PageUp to toggle between the display of rows 1-12 and 13-24. Either eye vision, or manipulation of the cursor may be used to help identify the exact column for each character of captured data, based on the numbered ruler line just above the first line of captured data. The ruler starts with number 2 and ends with number 78 (due to 5250 workstation display constraints), however, the actual captured data occupies columns 1 to 80 on the lines below the ruler. Thus, workstations that display the column location of the cursor should match the character location in the ruler line.

##### Functions

- **PageDown/Up**: Use the PageDown and PageUp function keys to toggle the display of captured data between lines 1-12 and 13-24.
- **F3=Exit**: Return to the LSAM menu.
- **F9=WRKJOB**: Branch to the IBM i Work with job menu, to display detailed information about the IBM i Job ID named in the display panel.
- **F12=Cancel**: Return to the list of log entries.

## Display Data Capture Debug Log

The function is not documented in detail because it is meant for use by trained analysts or programmers already familiar with the operation of the Capture Data and Capture Response Rules programs. The log entries that may be observed in this display may seem apparent to users familiar with data capture and response.

LSAM menu 3. Events and Utilities Menu, contains option 7. LSAM Utility configuration, where a flag may be set to turn on debug logging for allof the LSAM data capture and captured data response actions. This debug logging supports both Operator Replay screen data capture as well as the SCANSPLF command. The debug log entries would prove exactly when the system captured data, when it processed Dynamic Variables and which response rules were executed.

The debugging feature could be turned off for better performance in systems that do not require extensive audit logging or debugging of any problems. On the other hand, debug logging should be turned on when extensive system audit support is required, because the debug log provides detailed evidence of all automated operations.

If technical support is needed for apparent problems with either capturing data or executing response rules, turn on the debug function in LSAM menu 3. After attempting execution of the Operator Replay script, or the SCANSPLF command that is causing trouble, use the SMASUP log file extract command to retrieve the debug log information and send the resulting save file from library SMALOG to SMA Support for assistance. (Refer to [Operation of Extracting LSAM Log and Master Files](../logs-database/extracting.md) for more information about how to use the SMASUP command.)

Following is a table of Entry_Code values that may be observed in the list of debug log entries. These entry labels help to identify the action that was performed and/or the result of data capture and captured data response rules. Some of the codes reflect a failure in which case the log entry will appear red in color.

### Entry_Code Value Appearing in Captured Data Debug Log Viewer

**SCANSPLF command log entries**                
- **SCANSPLFST**: The SCANSPLF command has started its function.
- **SCAN_PARMS**: The PARAMETERS keyword value string sent to the program by the SCANSPLF command.                 
- **PARM_COUNT**: A log entry indicating the number of scan values  found in the input parameter after parsing the PARAMETERS keyword value of the SCANSPLF command. This entry may show that no input scan values were submitted, but that the program will continue to use any registered scan values found in the SPLF Scan Rules table.
- **PARSE_PARM**: A log entry showing how the results after scanning the PARAMETERS keyword value of input scan values. The details entry shows the contents of the array where the input scan values are divided into even-spaced locations.
- **SCANSPLFOC**: A separate "occurrence" or group of Scan Rules is set up for each unique SPLF + Job Name + SPLF Number found among the rules under a single Application code. This log entry documents each unique set of Scan Rule keys that is found in the rules file for a job.
- **NoRulR**: SCANSPLF command has found no required rules among the Scan Rules for this Application (possibly also limited to a specific Spool File and/or Job Name, SPLNBR).
- **SCANSPLF_J**: A log entry showing information about the actual job selected while searching for the target spool file.
- **SCANSPLF_F**: A log entry showing information about the actual spool file (report) found for scanning.  
- **SCAN_MATCH**: A log entry showing one of the require scan values that was matched in the scanned report.
- **SCAN_NOMCH**: A log entry showing one of the required scan values that was not matched in the scanned report.
- **SCAN_BYPAS**: A scan value bypass rule registered in the SPLF Scan Rules table was found and recognized. This scan value will be marked as matched, even though bypassed. 
- **SCANSPLF_E**: A fatal error was encountered and the SCANSPLF command has not completed its function. Refer to the log entry detail for a status code and more information about the reason for the failure. 
- **SCAN_PASS**: A successful match of all required scan values; the SCANSPLF command ends normally. 
- **SCAN_FAIL**: Not all required scan values were matched; the SCANSPLF ends abnormally and, if started by OpCon, a list of mismatched values is sent to the OpCon job information. 
- **SCANSPLFEN**: Marks the normal end of the SCANSPLF command. A final completion status code may be found in the details of this log entry. 
- **SCAN_ABEND**: 
  - The SCANSPLF command processor has reported a failure.
  - If this failure was unexpected, the abnormal termination code is found in the log entry details.
  - This entry may also reflect the program's intentional forced abnormal termination due to the combination of the FAILOPT command parameter and the set of required Scan Rules that were executed. 
- **SCAN_LOG**: A program debug entry providing non-critical, general information about conditions detected by the SCANSPLFR program. Refer to the entry details for more information. 
- **SCAN_MATCH**: A log entry registering a matched scan value.
- **SCAN_LBLNO**: An indicated scan label was found, but the associated value after the label did not match the supplied scan reference value. 
- **FAIL_1, FAIL_2, FAIL_4, FAIL_5**:
  -   Logs a record of the fact that the final result of a SCANSPLF execution was controlled by the FAILOPT parameter set to a value of 1 - 5, indicating that required rules were either matched or not matched and that this condition was interpreted as requiring a forced task failure.
  -   These same log entry values are also used by the SCANOUTQ command, reflecting the evaluation of all executed SCANSPLF commands.
- **PASS_1, PASS_2, PASS_3, PASS_4, PASS_5**:
  -   Logs a record of the fact that the final result of a SCANSPLF execution was controlled by the FAILOPT parameter set to a value of 1 - 5, indicating that required rules were matched, not matched or ignored, and that this condition was interpreted as requiring the task to end normally. 
  -   These same log entry values are also used by the SCANOUTQ command, reflecting the evaluation of all executed SCANSPLF commands.
- **SCANOUTQST**: The SCANOUTQ command has started a new task, using the command parameters reported in this log entry. 
- **SCANOUTQPA**: A log entry listing the contents of the command PARAMETERS keyword. This value set is simply passed along to each execution of the SCANSPLF 
command.
- **SCANOUTQ_E**: The command has detected an illogical condition or program error that prevents the task from being completed. Refer to the log entry for an explanation.
- **SCANOUTQ_S**: A log entry recording the syntax of each SCANSPLF command to be executed. 
- **SCANOUTQ_F**: This entry records the final failed (abnormal) completion status of a SCANSPLF command. 
- **SCANOUTQ_P**: This entry records the final passed (normal) completion status of a SCANSPLF command. 
- **SCANOUTQ_L**: A general log entry made by the SCANOUTQ command, including information such as the replacement of a Dynamic Variable.
- **SCANOUTQEN**: This entry marks the normal end of the SCANOUTQ command. The log entry may also provide a completion status code.
- **SCANOUTQAB**: 
  -   This entry marks the final abnormal completion of the SCANOUTQ command.
  -   The command may have forced the abnormal end according to the FAILOUTQ parameter flag setting, based on the results of all SCANSPLF commands executed.
  -   Refer to previous entries for indication of a program failure, meaning that the command could not complete its entire task.

**Operator Replay script entries for data capture operations**
- **CAPTDATA**: A log entry recording the data captured from a screen image.
- **CAPTERR**: A log entry reporting a program error code encountered while attempting to capture screen data. Refer to the log entry details for the exact error message that was trapped.

**Message Data entries for data capture operations**    
- **M_MSG_BUF**: The log entry shows the message data buffer used for data capture. The buffer may contain only the primary message text, only the secondary (Help) message text, or both text types concatenated with one space character between them.   
- **M_CAPTURE**: The log entry shows the portion of data that was captured from the message text buffer. This data would be referred to, for example, when the 
special value of \*CAPT is used in a Captured Data Response Rule.
- **M_CAPTRSPE**: An error occurred during the attempt to process Captured Data Response Rules after some Message Data was captured.
- **M_DYNV_ERR**: A Dynamic Variable token could not be replaced during the processing of Message Data capture. 
- **M_DYNV_PRE**: During Message Data capture, the string that contains a Dynamic Variable token before the token is replaced. This is the string that contains an optional Scan Label that will be used to identify the message data desired for capture.
- **M_DYNV_RPL**: During Message Data capture, the string value after a Dynamic Variable token was replaced. 

**Common entries for Captured Data Response Rule processing**
- **RESPCMD0**: Documents the original response command string from the rules record, before processing any embedded variables. 
- **RESPCMD1**: Documents the response command string after any Dynamic Variables were replaced.      
- **RESPDATA**: The log entry details show the profile of the Captured Data Response Rule that was processed successfully. The details also include the final form of the response command, including resolution of any variable values. 
- **RESPERR**: The captured data response rule processor module  is reporting an error encountered during processing. The response rule was probably not completed. Refer to the log entry for details about the error. The details also include a  profile of the Captured Data Response Rule that was being  processed. 
- **ADDRPYTOK**: Log of the command that sets an Operator Replay Token variable value, based on that field in the Response Rule record.
- **OVARERR**: Documents an error that occurred when the ADDRPYTOK command was executed. 
- **SETDYNVAR**: Log of the command that sets a Dynamic Variable value, based on that field in the Response Rule record.
- **DVARERR**: Documents an error that occurred when the SETDYNVAR command was executed. 

## How to Use the Data Capture Logging Functions

There are two different log files in the LSAM database that store information about captured data. The first log file (OPRLOGF40) is where the actual captured data elements are stored. The second log file (CAPLOGF10) is a debug log file that stores detailed information about both the process of capturing data and the process of executing response rules.

These files are logically joined together by four key fields. The first two key fields are common to all types of data: The Application ID and the capture rule Sequence number. Both files are used by the SCANSPLF command and by the Operator Replay script execution driver program. There is a data type field in each file that labels the data as type C = Operator Replay screen capture and S = SCANSPLF matched scan values.

The values of the secondary key fields, that is, the third and fourth key fields, depend on which type of data is stored. For type C, the secondary key fields are the Operator Replay script Name and the script step Sequence number. For type S, the secondary key fields are the Spool File Name and the Spool File Number (an attribute of the spool file relative to other spool files produced by the same job).

### The Log of Captured Data

File OPRLOGF40 is where captured data is stored by either the SCANSPLF command or by an Operator Replay script that uses screen capture rules. This file is categorized as an LSAM daily log file. As such, it is purged of older records according to the record date under the control of the LSAM Parameter: Days (to) keep LSAM logs.

An Operator Replay script screen data capture rule always stores data in the data capture log file. But the SCANSPLF command can only store data in this log file when it finds a match to a SPLF Scan Rule. The reason that the SCANSPLF command does not store captured data for mismatched rules is that there is no guarantee that the desired scan rule data would ever be found in the report, and it is not possible to compute the actual page, line and row where the scan data was located.

:::tip TECHNICAL NOTE
The execution of optional Captured Data Response Rules could have been implemented as the result of a trigger added to the Data Capture log file. Instead, the search and execution of Response Rules has been implemented in a single, centralized program module that is shared (compiled by copy) by all programs that write to this log file. This choice was made due to its relative efficiency, its ease of maintenance and to keep database maintenance simpler.
:::

The data capture log file may be viewed from either LSAM menu 3: Events and Utilities, or from LSAM menu 4: Operator Replay, using function 8 on either menu. Each menu call to the inquiry function sets a parameter that causes the initial list display to be filtered by data type, so that only SCANSPLF records appear from menu 3 and only Operator Replay records appear from menu 4. However, function key **F15** may be used from either starting point to change the subset rule in effect for 
the display.

### Debug Logging of Captured Data Response Rules

The LSAM programs that process data capture and also Captured Data Response Rules are all enabled to optionally write log entries to a Captured Data debug log file, CAPLOGF10. This form of debug logging is controlled by an LSAM Utilities configuration option, accessed as function 7 on LSAM menu 3.

When captured data debug logging is turned on, multiple entries are written to this debug log file in order to provide a trace of all activity related to data capture. Both the capture actions and any associated response rule actions are logged in the same file. Mnemonic labels of each entry help to portray a profile of what happens with each data capture. The high level outline of this profile is visible in the initial list display of this file, using the LSAM menu functions. A list of the mnemonic record labels is presented under the Utilities Screens and Windows section, below.

The captured data debug log file may be viewed from either LSAM menu 3: Events and Utilities, or from LSAM menu 4: Operator Replay, using function 9 on either menu. Each menu call to the inquiry function sets a parameter that causes the initial list display to be filtered by data type, so that only SCANSPLF records appear from menu 3 and only Operator Replay records appear from menu 4. However, function key **F15** may be used from either starting point to change the subset rule in effect
for the display.

### Recommended Strategy for Use of Captured Data Log Files

The default setting of the LSAM log files for captured data is to purge the data capture log file according to LSAM Parameters without regard to a database backup schedule. The debug feature for captured data operations may be set off (depending on when the LSAM was originally installed).

At some sites it may be preferred to leave the captured data debug function turned off except during the early stages when new rules are being implemented and require diagnosis to stabilize their operation. After the diagnostic stage is over, the debug feature can be turned off in the LSAM Utilities configuration (LSAM menu 3, function 7) and the debug log file will be purged by the LSAM daily maintenance server job (at the hour specified by the user in the LSAM Parameters, Main menu option 7).

However, some sites that use data capture and captured data response rules may be subject to strict auditing of their automation procedures. For example, a financial institution that chooses to use these LSAM tools to automate balancing functions might be required to provide proof of the reliability of their balancing operations. In this case it would be very important to leave the captured data debug function turned on at all times, and equally important to adopt a careful plan for making and
preserving backup copies of these captured data log files, before they are purged or cleared. This way, the LSAM log file viewer functions could be used at any time to present the proof required by an audit.

The LSAM includes the command SMARGZ that can be used on a schedule coordinated with the LSAM Parameter settings, so that the LSAM database library (default name SMADTA) is backed up to a save file periodically and before the LSAM would purge the daily log files or clear the debug log files. In fact, the SMARGZ command calls the command SMASUP in "LIB" mode, making a backup of the entire LSAM database library first before it then clears all the LSAM debug log files and reorganizes
master files. When the SMARGZ command is used this way, a collection of save files is accumulated in the library called SMALOG (which is shared by all LSAM environments, if more than one is installed). The site can create a procedure to run periodically from an OpCon schedule that will backup the contents of the SMALOG library before the SMARGZ procedure is launched in a dependent job. This will create an archival history of the captured data log files that could be retrieved on demand, by date, in order to satisfy audit requirements.

More information about the SMARGZ and SMASUP commands is provided in [Log File and Database Management](../logs-database/overview) and [Commands and Utilities](../commands-utilities/commands).

:::tip TECHNICAL NOTE
In order to use the LSAM menu functions to view historical log data, it would be necessary to restore the backed up log files from a save file produced by the SMASUP command to a temporary staging library. The LSAM menu functions can be used to view the log file contents if the staging library is added above SMADTA in the job's library list.
:::

## Strategy for Audits of Data Capture and Response

Sites that are subject to audits of automated procedures may need to understand exactly how the LSAM software manages the content of the two types of log files that support Data Capture and Captured Data Response Rules. (This is explained in LSAM Logs and Database Management.) For example, the captured data debug log file may be useful as a proof to show an auditor. In such a case, certain LSAM configuration options and procedures need to be carefully controlled in order to preserve an
accurate record of captured data and any response commands that are executed.

There are two different log files associated specifically with captured data. First is the Data Capture Log file (OPRLOGF40) which is of the type classified as an LSAM daily operational log. In other words, this file is always used and its use is not controlled by an LSAM option. The other file (CAPLOGF10) is a general purpose debug log file that is not used unless a debug option is turned on. There is a different purge control for these two file types, although the LSAM does create backup
save files in library SMALOG for both log file types.

The Data Capture Log file holds the actual captured data, along with profile information that identifies how and when the data was captured. The SCANSPLF command stores recognized scan values in this file, although it is not able to store a record of scan values that were not discovered in a target spool (report) file. The Operator Replay script driver program also stores data in this file whenever there are screen data capture rules registered against the sequence steps of a replay
script. The Data Capture log file records are used as the reference point for selection and execution of Captured Data Response Rules. The common module, shared by both LSAM functions, that writes Data Capture Log file entries is the module that checks for any Captured Data Response Rules at the same time.

Both of these LSAM functions check the LSAM data capture debug control flag stored in the LSAM Parameters control file. This control flag is  set by using the LSAM Utilities configuration function: LSAM menu 3, function 7. The one flag controls debug logging for both features. When the debug flag is set to Y=yes, each LSAM feature writes multiple records to the debug log file to provide detailed information about the data capture process and especially about the handling of any Captured
Data Response Rules. The debug log file is the only place where a record may be found of actions performed by the Captured Data Response Rules.

For the purpose of supporting automation audits, this discussion assumes that both log files should be used and that a complete and accurate history of content must be preserved in archival backup tapes. Both the LSAM Events and Utilities sub-menu and the Operator Replay sub-menu provide two log file viewers at functions 8 and 9 that can be used to view the captured data daily log file and the debug log file, respectively. These viewer programs normally display the current content of each log file, but they can also be used to provide a formatted view of log file copies that are restored from archive, either by use of file overrides or by manipulation of the interactive job's library list.

Here is a high-level summary of the steps SMA would recommend to establish a reliable audit trail for LSAM automation. This strategy actually applies to all of the LSAM features, not just to the data capture procedures. These steps are discussed in more detail following the outline:

1. Start debug logging, e.g., for data capture using LSAM menu 3, function 7.
2. Set LSAM Parameters "Days to keep daily logs" and "Days to keep debug logs" to a number of days at least as long as the frequency of the SMARGZ job defined in the following steps.
3. Set LSAM Parameters for the "Days to keep daily BkUp" and for "Days to keep debug BkUp" which specifies how long to keep the backup save files that hold data which was purged from the active log files.
4. Create a user-defined procedure for backing up library SMALOG to tape. This user-defined step is critical if it is important to preserve an archive of all automation activity that was recorded in LSAM log files, because the SMARGZ procedure, below, deletes older save files based on the "Days to keep...BkUp" control values.
5. Create an OpCon schedule for LSAM database maintenance with jobs that will not start until other LSAM activity is completed.
6. The first job of the LSAM database maintenance schedule completes the user-defined procedure to backup library SMALOG to tape.
7. The next job in the schedule executes the SMARGZ command. (Note: Use the LSAM's own server job description, SMALSAJ00 in SMADTA (or equivalent library) to execute the SMARGZ command in any subsystem so that the job will be using an LSAM environment library list.)
8. Set subsequent IBM i jobs to not start until the SMARGZ job has completed normally.

The second and third steps in configuring the LSAM to preserve the captured data log files is to set the purge controls that affect each type of file. The Data Capture Log file is purged of records according to the date of each record. This purge function happens at the Maintenance Hour specified in the LSAM Parameters (LSAM main menu, function 7). Records are retained according to the number of days to keep LSAM logs, as specified on the LSAM Parameters. This number of days field affects all of the LSAM daily operational log files, and/or the debug/audit logs, in general. The LSAM daily database maintenance procedures always create backup save files in the library SMALOG, using type "O" save files (first letter of the save file name is an "O", followed by a date/time stamp) for the daily Operational log save file, and using type "D" save files for the Debug/audit log save file.

It will be important to coordinate the LSAM library SMALOG backup schedule with the two number of days to keep log file backup save files in library SMALOG, in order to assure that no records are lost when the SMARGZ procedure automatically deletes old save files from SMALOG.

The SMARGZ command starts by executing the SMASUP command in its "LIB" mode, that is, it creates a save file backup of the entire LSAM database library SMADTA. The SMARGZ command next reorganizes all of the LSAM database files that are not set to "re-use deleted records," during which time the LSAM server jobs are suspended. Finally, SMARGZ deletes old save files from the SMALOG library according to the number of days to keep save files, set in the LSAM Parameters (LSAM main menu, function
7). But, the SMARGZ command does not provide any means to automatically backup the SMALOG library before old save files are deleted, which is why it is critical to configure a user-defined archiving strategy for the SMALOG library.

The LSAM Parameters (LSAM main menu, function 7) provide some rudimentary schedule control fields that could be used to control when the LSAM's internal database maintenance server program would cause the SMARGZ program to be executed. These fields are illustrated and explained in the Configuration topic. This simple strategy may be sufficient for sites that are not subject to automation audits, but it is not recommended for sites that will be audited because it does not provide any coordination with a user-defined procedure for backing up the SMALOG library to tape. In place of the LSAM controls, SMA recommends that an OpCon schedule be created with an IBM i job that will execute the SMARGZ command.

Utilizing an OpCon schedule for execution of the SMARGZ command offers two important advantages. First, the SMARGZ job can be made dependent upon successful completion of the user-defined backup procedure that saves library SMALOG to tape. Second, it is much easier to assure that no IBM i LSAM jobs are running during the brief period when the LSAM services are suspended by the SMARGZ command. This second point is especially important because it can help prevent any Operator Replay or SCANSPLF jobs from running during the LSAM database maintenance procedures, helping to assure that there will be no gaps in the captured data debug log file history of any job.

### Restoring and Viewing Archived Log Data

The discussion of strategy for audits is completed by this brief review of techniques that can be used to restore log files from archive for viewing during an audit. This is the same procedure used by SMA when the SMASUP save files are sent to Support to analyze a problem. Each save file produced by the SMASUP command is named according to the date and time the file was created, using this pattern: xCYYMMDDhhmm, where "x" is a fixed letter (L for LIB and LOG saves completed by SMASUP, O for
daily operational log file saves and D for debug/audit log file saves), while the other letters refer to century, year, month, day hours and minutes. Thus, it is easy to identify a save file that probably contains log (and master) file data for a particular date. The audit review process would start with restoring the desired save file from the archival tape to a target, temporary library.

Next, the contents of the restored save file can themselves be restored to the same temporary library (except for full library saves completed by the SMASUP command in LIB mode - as when SMARGZ executes SMASUP) using the RSTOBJ command. (Full library saves must be restored to a separate, temporary library using the RSTLIB command.) After the files are restored, start the LSAM menu system (command STRSMA, or LSAMENU). To use the LSAM log file viewer programs for examining the restored log
files, add the temporary library to the top of the library list (using the IBM i command ADDLIBLE). While the library list is altered, the LSAM menu-driven log file viewers will show the contents of the restored log files instead of the current versions of those files. After the investigation is complete, remember to remove the temporary library from the interactive job's library list, or just exit out of the LSAM menu system.

:::tip TECHNICAL NOTE
Some of the restored log and master files may require that a logical view be duplicated from the live SMADTA library to the temporary library, in order to support the LSAM log viewer programs. Please contact SMA Support for advice if this becomes necessary.
:::


## How Data Capture Works

### Forms of Data Capture

#### SCANSPLF Scan Rules

The data capture rules for the SCANSPLF command are actually the SPLF Scan Rules. Whenever the SCANSPLF command processor finds a match to one of the SPLF Scan Rules, it writes a new data capture record to the log file and records the found scan value. During the process of defining Captured Data Response Rules, the prompt function key **F4** is an important tool for identifying the correct key field values that must be used to identify and link each Response to one of the SPLF Scan Rules.
That prompting function automatically associates the registered Application ID with each of the SPLF Scan Rules and shows a list of the scan rules in rule sequence number order.

#### Operator Replay Capture Rules

The data capture rules for Operator Replay are separate from the Script Step records, but they are always linked by permanent key values to an individual Script Step. Any of these hard-linked capture rules and response rules can be optionally copied whenever a Script Step, or an entire Script, is copied to a new Step sequence number, or to a new Script name.

#### Message Management Capture Rules

The data capture rules for Message Management are not linked to only one Message Management Parameter, but are shared because it is so common for a single Capture Application to be reused among many different message management rules. Instead, each Message Management Parameter record stores the Capture Application ID as part of the Parameter record.

## How Captured Data Response Rules Work

The method for adding new Captured Data Response Rules is outlined above. Details about the Captured Data Response Rules maintenance screen and fields are illustrated below under Utilities Screens and Windows. This discussion explains how certain Response Rule parameters interact to provide a flexible and powerful response matrix.

Three aspects of Captured Data Response Rules deserve a detailed explanation. There is a set of rules and comparison values that can be used to qualify whether a given response command (or group of commands) will be executed as captured data is stored. There is also a Continuation field in the response rule record that may be used to create different sets of qualification rules and also different groups of commands controlled by each set of qualification rules. The response command and the comparison data fields are allowed to use LSAM Dynamic Variables, and a variable value may be set immediately before the command executes by the field labeled for this purposed on the Response Rules record.

### Response Rule Qualification Rules

At the simplest level, each response command can be controlled by a single qualification rule. In this case, a single Captured Data Response Rule record can be used to define the entire response. But it is possible to use multiple rule records to build a complex set of qualification rules. Similarly, multiple records can be used to build a group of multiple response commands. Multiple qualification rules may overlap multiple response commands, and vice versa. Consider the following examples.

The first table shows that 3 comparison rules are used to qualify 5 different response commands. In this case, all three comparison rules must be satisfied before any commands are executed. If all the qualifications are met, then all 6 commands will be executed.

##### Captured Data Response Rules Model - More Commands

  Response qualification         | Response commands
  ------------------------------ | ---------------------
  Comparison rule A1             | Response command R1
  Comparison rule A2             | Response command R2
  Comparison rule A3             | Response command R3
  (command group continuation)   | Response command R4
  (command group continuation)   | Response command R5

In the second table there are 4 comparison rules but only 1 response command. This works the same as the first example, except that all 4 qualifications must be met before the single response command is allowed to execute.

#####  Captured Data Response Model - More Qualifications
  Response qualification   | Response commands
  ------------------------ | ---------------------
  Comparison rule B1       | Response command S1
  Comparison rule B2       | (no command text)
  Comparison rule C1       | (no command text)
  Comparison rule C2       | (no command text) 

#### Response Rule Continuation Field

It is also possible to create multiple, separate groups of qualifications + commands that are each handled separately from each other, all as part of a single response to only one element of captured data.

Here are the values of the Continuation field of the Captured Data
Response Rules:

- **AND** = This record includes a comparison rule that must also be true, in addition to the rule in the previous record.
- **OR** = This record begins a new set of comparison rules that provide an alternate means of qualifying the associated group of response commands.
- **CMD** = This record includes an additional command that is part of a command group but it does not include any comparison rules; the command group is qualified by previous comparison rules that are part of this set.
- **blanks** = This record begins a completely new set of comparison rules and response commands. There is no connection to this set and any previous set, except that both sets are associated with the same original captured data log record.

The following examples show how the Continuation field of the Captured Data Response Rules can be used to merge the two tables above into a single, complex response.

##### Captured Data Response Rules - Continuation Fields
  Seq   | Continuation  |    Response qualification     |Response commands
  ----- |-------------- |------------------------------ |---------------------
  010   |               |      Comparison rule A1       |Response command R1
  020   |     AND       |      Comparison rule A2       |Response command R2
  030   |     AND       |      Comparison rule A3       |Response command R3
  040   |     CMD       | (command group continuation)  |Response command R4
  050   |     CMD       | (command group continuation)  |Response command R5
  060   |     CMD       | (command group continuation)  |Response command R6
  070   |               |      Comparison rule B1       |Response command S1
  080   |     AND       |      Comparison rule B2       |(no command text)
  090   |     AND       |      Comparison rule B3       |(no command text)
  100   |      OR       |      Comparison rule C1       |(no command text)
  110   |     AND       |      Comparison rule C2       |(no command text)
  120   |     AND       |      Comparison rule C3       |(no command text)

The table above shows two different qualification + command groups that are associated with one captured data element. The two groups are separated by the blank Continuation field at row 070; row 070 is the first record of the second group. Each of these groups works independently of each other. The only important relationship between the two groups is that the first group will be processed before the second group, so it is important to ensure that commands R1 through R6 do not depend on what command S1 will do, and conversely, to remember that command S1 may be affected by the outcome of commands R1 through R6. However, the comparison rules may enforce that only one of the two command sets will be executed.

The first group shows that there are three comparison rules that must all be satisfied due to the AND rule. If all three rules are satisfied, then all six commands, R1 through R6, will be executed. If any rule A1 through A3 is not satisfied, then none of the six commands will be executed.

The second group shows a complex set of comparison rules used to qualify just a single command. In this group, the comparison rules B1 through B3 must all be satisfied, or the comparison rules C1 through C3 must all be satisfied, in order for command S1 to be executed.

The OR is exclusive. This means it is not possible to include the OR continuation rule as part of an AND-group. The only way to accomplish this is to repeat some of the AND-rules in a second set of comparisons that begin with the OR continuation rule.

### Qualifying Captured Data Response Rules with Comparison Data

The discussion above refers to Comparison rules. This term refers to the fields in a Captured Data Response Rule that define a comparison reference value, comparison data and the compare rule. Use these fields to determine whether a Captured Data Response Rule, or group of rules, is allowed to execute.

Some Response Rules may not need qualification, including CMD continuation records that are only used to register additional response commands. To disable the comparison data fields, set the Compare Data lines to the special value of "\*ANY. Otherwise, consider the following options when defining Response Rule qualification.

The basic logic of qualifying a Response Rule is based on using the Comp Reference Value as factor 1 and the Compare Data Lines (content) as factor 2. The final value of each of these fields is matched according to one of the Boolean Compare Rule options. For example, if the Compare Rule is set to GT (greater than), then the factor 1 value must be greater than the factor 2 value in order for the Response Rule functions to be executed:

>
>*If Compare Reference is Greater Than Compare Data, then execute Command.*
>
>*If (Compare Reference) \> (Compare Data), then execute Command.*
>

By combining various Response Rules and specifying comparison values using Dynamic Variables (or other of the allowed options), it becomes possible to create a complex set of response rules that can be adapted to many different circumstances. For example, a Dynamic Variable could be established as the holder of a threshold value, and another Dynamic Variable could be established as a counter that is compared to the threshold. One or more Response Data rules could be used to increase the
counter variable when certain circumstances occur, and another Response Data rule could be used to compare the counter to the threshold in order to trigger an emergency response only when the specified threshold is exceeded.

Consider the following options for defining each of the comparison datafields.

The Comp Reference Value was presumed, in earlier versions of this LSAM, to always be the Captured Data element itself. Now, however, the element of data that was stored in the Captured Data Log File is represented by the special value of \*CAPT that can be typed into the Comp Reference Value field. Another newer option for this field is to specify a Dynamic Variable token (including the Dynamic Variable special characters). Use the function key **F8** to select from a list of existing Dynamic Variables, or to let the maintenance program demonstrate the correct syntax for inserting a Dynamic Variable token into this field. A third option for this field is to type a specific character string. A specific character string might be useful, for example, as a hard-coded threshold value that is assigned to one Captured Data Response Rule.

The Comp Reference Value may be further defined by the Comp Reference Length field. When this field is left set to zero, the LSAM routine will assume the length of the comparison reference value depending on how that field was set. If the special value \*CAPT is used, then the length of the reference value will be obtained from the Captured Data Log file record. Otherwise, the length of the reference value will be assumed to start at position 1 and continue through the last non-blank character in
the string. This computation of the length applies to either a typed character string or to the value obtained by replacing a Dynamic Variable token.

The Compare Data Lines field supports four different options for specifying values that will be compared to the Comp Reference Value:

- **\*ANY** = A special value that disables the compare data qualification, allowing the Response Rule to always be executed.
- **\*PARM** = A special value used only with the SCANSPLF command, referring to the current (one of many?) input Parameter value that was supplied for searching a spool file.
- **DynVar** = Use F8 to select a Dynamic Variable from a list, or manually type in a Dynamic Variable name, including the special characters required to denote a Dynamic Variable. (Hint: Use F8 and select any value to let the program demonstrate the correct syntax for a Dynamic Variable, then change the actual variable name to the desired value within the special characters.)
- **char** = Type in any character string. This option is typically used to test if captured data is equal to the string that is typed here, in order to decide if the Response Rule should be executed. This value could also be used as a threshold reference point, when the Comp Reference Value was set to a Dynamic Variable that contains a counter field, although this is the reverse of the logic that might be expected, so the Boolean Compare Rule must be chosen carefully.

The Compare Data Line field can support up to 1920 characters of data. This length matches the total amount of data that could appear on an IBM i green screen workstation display format (when the screen dimensions are 24 lines of 80 characters), which is the maximum size of data that can be stored in a single Captured Data Log file record. Lines 1 - 5 appear on the first screen of the Response Rule maintenance function, and PageDown can be used to move to lines 6-24 (of 80 characters each). All of the data entered in these lines is assumed to be a single, contiguous string. Blanks appearing at the end of individual lines are assumed to be part of the data except for the last line. However, the length specified or calculated for the Comparison Reference Value may determine that additional space characters will be appended to the end of the Compare Data Line data string, if that is necessary to make the two string sizes match.

### Setting LSAM Variables with Response Rules

The Captured Data Response Rules record supports entry of an LSAM Dynamic Variable name and also of an LSAM Operator Replay token variable name. Dynamic Variables are described in detail below and also in the topic about Job Tracking. Operator Replay token variables are explained in detail in the topic about Operator Replay. This discussion here is focused only on the function of the fields used by a Captured Data Response Rule to store captured data into LSAM variables.

:::tip
Operator Replay token variables are an old form of variable that is no longer used, since the more powerful Dynamic Variable tokens can now be used in every place the old tokens were used. Always choose Dynamic Variables!
:::

When the response rule is actually executed, which happens whenever captured data (explained above) is being stored in the Captured Data Log file, the data that is captured is available to the Response Rule execution module. If the response rule has named either type of variable (Dynamic Variable or Operator Replay token variable), the associated variable loading command (SETDYNVAR or ADDRPYTOK) is executed to set the variable value in the appropriate LSAM table using the current captured data value. Each of these commands will create the variable master record if it does not already exist.

:::tip
If the Captured Data Response Rule has the flag set that specifies to compress numeric data, then the value stored in an LSAM Dynamic Variable will also be the compressed numeric data. This means that any punctuation such as used for monetary amounts will be eliminated in the variable, though it exists in the originally captured data. Also refer to the sub-section below about scrubbing single quotes or commas from text strings.
:::

This function of the Captured Data Response Rules is similar to using either of the LSAM commands SETCAPVAR or SETCAPTOK.

But these SET\* commands are executed outside of the job where data capturing is actually performed, so the commands are less able to be specific about the actual captured data value that can be retrieved for storage as a variable value. These commands are limited to the \*FIRST or \*LAST time stamp on whatever date is specified in the command parameters. Refer to more about the two SET commands in the next section.

The SET commands are executed at a different time, relative to the Captured Data Response Rules, so there is another advantage to using the built-in variable setting feature of the Captured Data Rules:

:::tip
**The Response Rule execution module always processes storage of the captured data to a variable first, before testing the qualification rules or executing the response command.**
:::

When the rule qualifies for execution, the response command is analyzed to see if any Dynamic Variable tokens must be replaced with the current variable value. This makes it possible to execute a response command that will include the data that was just captured.

By default, the Captured Data Response Rule field that names a Dynamic Variable will always create or update a variable of type V, which is a general use variable. (This restriction arises because of the complex definition required for the other variable type.) The other type of Dynamic Variable, explained in detail below, is type L, used to update the IBM i local data area image for captured or tracked/queued jobs. Since the Captured Data Response Rule "Store -\>" field cannot be used 
for a type L variable, the way to create or update that type of variable is to use the SETDYNVAR command in the response command line of the Response Rule record. Remember that the same captured data value currently processed by the response rule could be made available, indirectly, to the SETDYNVAR command by including a different Dynamic Variable token in the VALUE parameter of the SETDYNVAR command. The different Dynamic Variable might be the one that is named in the Dynamic
Variable field of the current Captured Data Response Rule record. 

If a Captured Data Response Rule response command includes more than one Dynamic Variable, it might be necessary to configure additional Captured Data Response Rules that will execute prior to this response rule, in order to assure that the required variable values have been set appropriately.

Although this section of the document is focused on the SCANSPLF utility, the Captured Data Response Rules are also able to store data captured by Operator Replay from a green screen workstation display, or by Message Management from the primary and/or secondary message text. These other two functions are discussed in more detail in the topics about those features.

### Setting LSAM Variables from Captured Data Outside of Response Rules

The Captured Data Response Rules record supports entry of LSAM variable names so that the captured data value can be stored into either an LSAM Dynamic Variable or an LSAM Operator Replay token variable. This feature is discussed just above.

Similarly, there are two independent LSAM commands that can complete the same procedure, although with less flexibility:

- SETCAPVAR = set an LSAM Dynamic Variable to the value of the identified Captured Data element.
- SETCAPTOK = set an LSAM Operator Replay token variable to the value of the identified Captured Data element.

:::tip
Operator Replay token variables, though still supported for existing users, are replaced by Dynamic Variables, so always use Dynamic Variables in future applications.
:::

These two commands could be used anywhere that IBM i command execution is possible, as long as the executing job has reference to the LSAM environment library list. But these commands do not provide infinite control over the exact captured data value instance that will be retrieved, due to the fact that multiple captured data elements could exist for the same Capture ID and Capture Sequence key values, with only their date/time stamps (time of capture) being different. Therefore, as the example command syntax below illustrates, it is only possible to find the \*FIRST or \*LAST instance of a given element of captured data for a given date. The only way to guarantee that specific captured data will always be used to set either type of variable value is to use the Captured Data Response Rule fields where variable names may be entered. Only while the Captured Data Response Rule execution module is managing the actual data that has been captured, can the system be sure that a specific element of captured data will be stored as the variable value. 

However, in case it might be useful, these two commands can be used outside of the Captured Data Response Rule execution process. A prompted IBM i command screen is illustrated for each of these commands. The effect of each command is similar to using the LSAM commands SETDYNVAR and ADDRPYTOK, so the command fields that define the variables are not explained here. This discussion is limited to explaining how the Captured data identifying fields work.

**SETCAPVAR = Set Captured Dynamic Variable**
```

       Set Captured Dynamic Variable (SETCAPVAR)

Type choices, press Enter.

Capture Identifier . . . . . . . CAPID          _____________________________
Capture sequence number  . . . . CAPSE         0    
Capture date . . . . . . . . . . DATE          *CURRENT                 
First/Last time, or \*ANY date  . TIME         *LAST  
Name of new/existing variable  . VARNAM        _____________                      
Variable type  . . . . . . . . . VARTYP        V
Sequence for same LDA variable   VARSEQ        0                   
Start position in LDA  . . . . . LDASTR        0
Length of LDA change . . . . . . LDALEN        0   
```
**SETCAPTOK = Set Operator Replay Token to Captured Data**
```

       Set Opr Rpy Token to Capt Data (SETCAPTOK)

Type choices, press Enter.

Capture Identifier . . . . . . . CAPID          _____________________________                     
Capture sequence number  . . . . CAPSEQ        0    
Capture date . . . . . . . . . . DATE          *CURRENT
First/Last time, or \*ANY date  . TIME         *LAST  
Name of new/existing variable  . TOKNAM        ____________
```

##### Fields

| Keyword | Size | Type   | Description                             |
| ------- | ---- | ----   | -----------                             |
| CAPID   | 30   | \*CHAR | Value must be enclosed in single quotes. Type up to 30 characters. Upper and lower case letters, numeric digits and special characters are allowed. Spaces are allowed but not recommended; use underline characters instead of spaces. This value must match an Application ID that has been registered using the LSAM Menu 3, function 3. |
| CAPSEQ  | 3.0  | \*DEC  | The sequence number of the SPLF Scan Rule or the Operator Replay screen capture rule: Refer to the sequence number assigned to the captured data in the LSAM view of the Captured Data Log (LSAM menu 3, option 8) to obtain or verify this number.                    |
| DATE    | 8    | \*CHAR | \*CURRENT = (default) use the current system date. 
|         |      |        | \*ANY = use any available date, based on the setting of the TIME parameter, that is, the \*FIRST or \*LAST date available. |
|         |      |        | Optionally, specify a date in CCYYMMDD format, to limit the instance of the captured data to either the first or last that is available for this date. |
| TIME    | 6    | \*CHAR | \*LAST = (default) find the last instance of this captured data on the specified date. |
|         |      |        | \*FIRST = find the first instance of this captured data on the specified date.                     |
  
## Exceptional Control Options for Captured Data and Response Rules

### Managing Single Quotes and Commas in Captured Data

#### Problem Definition

##### Single Quotes

Single quotes included in captured data, such as message text, green screen workstation displays or reports, can prevent storage of captured data into dynamic variables. The single quote interferes with delimiting character strings in IBM i command parameter values.

##### Commas

If a comma is included in the value of a dynamic variable it can interfere with the syntax of OpCon Event commands whenever that dynamic variable is included as one of the command parameter values. At this time, commas are reserved characters in OpCon Event commands that are used to separate the command parameters.

### Preventing Special Character Errors

#### Captured Data Response Rules

The Compress Numeric field in the Response Rules master record supports additional values (listed in the chart below) that can be specified for character data. This set of field values controls the process of storing captured data into a dynamic variable.

The most important purpose of this control is to prevent single quote characters from interrupting the string of characters that is inserted into the VALUE('value') parameter of the SETDYNVAR command, since that is the method used to store captured data into a dynamic variable. Single quotes may either be replaced by space characters or they can be escaped by doubling the single quote so that just one character will actually be stored as part of the dynamic variable value.

Commas can also be replaced by spaces, optionally, although this is not critical at the time a value is being stored, so it may be preferred to use the character string edit codes that are assigned to the dynamic variable master record.

#### Dynamic Variables

The COMMA parameter of the SETDYNVAR command, and the corresponding "Group Separator" field in the dynamic variable master record, support the same control values as shown in the chart below for non-numeric, that is, character string values. These edit codes control how the value returned for a dynamic variable token will be reformatted in order to prevent potential problems with the way each dynamic variable may be employed.

### Table of Character String Edit Values

These character string edit control values may be used in the Response Rule field: Compress Numeric, or in the Dynamic Variable COMMA control field (which also controls the Grouping Separator value if a dynamic variable is numeric). Note that character string edit rules do not apply when a dynamic variable has been marked as a numeric value only.

The values shown in this table refer to EBCDIC values. Most Latin character sets use the same hexadecimal values for the comma and the single quote. If a client site's IBM i partition uses a CCSID character set with different hex values, please contact SMA Support for assistance.

- C = replace any comma (,) X'6B' with a space (X'40')
- Q = replace any single quote (') X'7D' with a space (X'40')
- D = replace both a comma and a single quote with a space
- E = escape a single quote by inserting an extra single quote
- F = replace comma with space AND escape a single quote by doubling

The concept of "escaping" the single quote is supported by IBM command editors. When a character string is enclosed with a pair of single quotes, such as the VALUE( ) parameter of the SETDYNVAR command, any single quote that is included within the string would interrupt the string unless there are two single quote characters. If there are two single quotes, IBM command processing will replace them with just one single quote as the character string is being processed, and the characters that follow the doubled single quote will still be part of the character string.
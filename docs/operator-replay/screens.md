---
sidebar_label: 'OR Script Screens and Windows'
---

# OR Script Screens and Windows

## Operator Replay Configuration

### OPRRPYD301 - Operator Replay Configuration

#### Menu Pathways

Main Menu > Operator replay menu (#4) > Operator Replay configuration (#5)

#### Fields

**TCP/IP and Device Configuration**
- **Telnet device modes**:  
  - The list of optional Telnet device modes is introduced by the F1=Help text, and it is fully explained in the [Managing Virtual Devices](../operator-replay/virtual-devices.md) section near the end of the Operator Replay Scripts chapter.
  - NOTE**: MODEs 2-4: Use F1=Help to view an introduction to the Telnet Exit Program use and configuration. See [Managing Virtual Devices](../operator-replay/virtual-devices.md) near the end of the Operator Replay Scripts chapter for complete instructions.
- **IP Address**: 
  - This address is used to start an emulated interactive user session, using IP Telnet protocol. The default value for this field is the typical *LOOPBACK interface address of 127.0.0.1. Use F4=Prompt to see a list of valid values that IBM i supplies from existing configured IP lines. SMA Technologies recommends using loopback interfaces instead of physical line descriptions for Operator Replay Script jobs to ease the configuration and improve system efficiency.
  - An IP Address is always required by the Operator Replay Script driver program. However, the IP Address might be provided from either User Management, from the OpCon job start request (as an extension to the Script name) or from the STROPRRPY command when it is used for testing. When an alternate source for the IP Address has been configured, this field value in the Configuration screen is usually ignored, unless it may be used by reference to a *DEFAULT value in the IPADDR( ) parameter of the STROPRPRY command.
- **Telnet port**: 
  - The default telnet port of 23 should be specified, unless IBM i has been configured to support Telnet services at a different port. This is the port where the emulated interactive user session will be started by the Operator Replay control program.
- **Telnet device name**: 
  - Enter a virtual display device name or one of the functional values:
  - Mode 1: Leave this field blank. The system will select or create an available virtual display device.
  - Mode 2: This mode requires an actual virtual display device name.
  - Mode 3: Type "*USER" into the device name field.
  - Mode 4: Type "*CMD" into the device name field.
  :::tip
  To allow command line parameter overrides when in User mode, type both values into this field: "*USER *CMD"
  :::
- ** Telnet device exit program number:
  - This is a protected display field, showing the default exit program number that will be used by the Agent when adding or removing the exit program entry in the IBM i registry. 
  - In case of the unlikely event that this unique number is already in use by some other software application, use function key F13 to unlock this field and type in a different, valid exit program number. (Valid values are mostly below the default value, since this was intentionally set to very near the upper limit.)

**General Configuration Options**
- **Script job logging:
  - Controls whether the interactive user emulation session will be recorded in the LSAM's Operator Replay log file. Use this feature whenever a new script is added, or to diagnose suspected problems with a script. There will always be a log index entry made for every script that is executed, but only:
    - Y = yes, record each Script execution in its own log file data member, corresponding to the log index entry.
- **Script job debug logging:
For use by technical support personnel only. This option causes additional log entries to be added to a special trace file, OPRLOGF20. Refer to more information about this function under the F17 and F18 function key descriptions.
- **Telnet exit pgm trace log:
  - For use by technical support personnel only. This option causes additional log entries to be added to a special trace file, OPRLOGF20. Refer to more information about this function under the F19 and F20 function key descriptions.
- **Post-send delay:
  - The number of microseconds to wait after sending a reply to a screen format, before attempting to read the system response to the sent data. A tuning option for the script execution program, this value should only be changed by trained technical support personnel.
- **Inter-read delay:
  - The number of microseconds to wait in between reading segments of the screen buffer that the system is writing. A tuning option for the script execution program, this value should only be changed by trained technical support personnel. SMA Technologies recommends using 0.1 seconds for this field (instead of a whole 1 second, previously offered as the default value).
- **Receiving data timeout:
  - The number of microseconds to wait before deciding that the system is no longer replying to the script execution. A tuning option for the script execution program, this value should only be changed by trained technical support personnel.
  :::tip
  This value can be overridden at the script step level.
  :::
- **Script loop detect limit:
  - Number of repeats by Script Branching Logic to same or lower Step sequence number allowed within same Script name before script execution is aborted with an error message reporting too many loops.
  - The Script Step master records support an override value to this limit, in case a script must intentionally loop back to the same step more times than this global loop limit would allow.
- **Separator data columns:
  - Each of the three separator hex character values shows a maintainable value field in yellow. To the right is the current value in the control file, shown in turquoise. The displayable character equivalent of each hex character sequence is displayed as a single pink character. Use the LSAM command LSATBLTEST to test results for hex character sequences, especially when US English (CCSID 37) is NOT the IBM i default character set.

**Hexadecimal control characters**
- **Token/variable separator:
  - The special character that is inserted by the script maintenance program to designate a character string that is actually a token or variable field that will have its value substituted from the user-defined list of tokens.
  - If this value is changed, it could affect all the existing scripts. A warning and utility function screen will follow.
  - This value should only be changed by trained technical support personnel, and then only if required to work around a conflict in the character sequences being
managed by the script execution program. 
- **Cursor control separator 1:
  - The special character that is inserted by the script maintenance program to designate the start of a character string that will be used to move the cursor on the emulated green screen image during script execution.
  - If this value is changed, it could affect all the existing scripts. A warning and utility function screen will follow.
  - This value should only be changed by trained technical support personnel, and then only if required to work around a conflict in the character sequences being managed by the script execution program.
  - This value is a pair of displayable characters used to represent the hexadecimal value of the actual single character used as the separator.
- **Cursor control separator 2:
  - The special character that is inserted by the script maintenance program to designate the end of a character string that will be used to move the cursor on the emulated green screen image during script execution.
  - If this value is changed, it could affect all the existing scripts. A warning and utility function screen will follow.
  - This value should only be changed by trained technical support personnel, and then only if required to work around a conflict in the character sequences being managed by the script execution program.
  - This value is a pair of displayable characters used to represent the hexadecimal value of the actual single character used as the separator.

**Displayed Data Translation**
- **Displayed data translation:
  - Refer to the discussion below about the purpose for these table names. Note the option to use CCSID character set numbers instead of translations; this option may produce better results in countries outside of the United States of America. SMA Technologies Support can help with the analysis of any translation problems.

**"Attempt to Recover Interactive Job" Display -- Local Language**
- **Instructions**: 
  - If an Operator Replay Script job ended abnormally, depending on the system value QDEVRCYACN, the next attempt to access the same display device might be intercepted by a job recovery message. The Operator Replay script driver will attempt to recognize and bypass this message if the display matches these configuration values. This will prevent another script job failure and it will also reduce the requirement for manual operator intervention to restore the status of the display device.
  - It might be necessary to view the Operator Replay log display and examine the detailed log of screen output to determine the exact values required in these Configuration fields. But after the first incident, if the Row, Column and Text are configured correctly, then the script driver program will be able to successfully bypass future incidents of this type. 
  - The default title text shown in the display is intended to match the screen title that appears in a default US EBCDIC partition. Update this text to match what is found in the Operator Replay log details display.
- **Row of title:
  - 1 (the row location of the screen title in a default US EBCDIC partition)
- **Column of title:
  - 24 (the column where text begins in a default US EBCDIC partition
- **Local title text:
  - Attempt to recover interactive job

#### Functions

- **F3=Exit**: Do not update the data, return to the LSAM menu.
- **F4=Prompt IP Addr**: Shows a list of IP addresses configured under IBM i, from which a valid value may be selected to insert into the IP Address field.
- **F12=Cancel**: Do not update the data, return to the LSAM menu.
- **F17=View debug log**: For technical support only, view the contents of the Operator Replay debug log file (available if Script job debug logging was set to Y=yes during any script execution). This screen is not documented in this online help.
- **F20=Clear debug log**: For technical support only, use this function to clear the Operator Replay debug log file (OPRLOGF20) after a previous test and before the next test, in order to help isolate test data.

:::tip
The LSAM automatic log file clear routines do not clear the Operator Replay debug log file. This is the responsibility of the technical support personnel who may have set the debug log flag to Y. The Operator Replay debug logging function must be set back to N=no after diagnostic work has been completed, in order to avoid the consumption of large amounts of the client's disk space. The debug log file should be cleared using F20 from this display after a copy of the file has been extracted. Refer to [Delivering the LSAM File Extract to SMA Technical Support](/logs-database/extracting#delivering-the-lsam-file-extract-to-sma-technical-support).
:::

### Displayed Data Translation

The Operator Replay configuration function supports specification of the translation tables (or CCSID character sets) used for managing displayable text. The screen formatting characters sent by the IBM i host to a Telnet workstation are processed in their native ASCII character format. However, the character text that would normally appear on the workstation display must first be translated to EBCDIC before the Operator Replay Script driver program can interpret what is on the
display. This EBCDIC character interpretation is critical for enabling the various scripting tools that must test the content of the display.

These tables should not be changed from their default values unless international language support requires it. Please contact SMA Support for assistance if it is believed that these table names might need to be changed. An SMA technical analyst should evaluate a special "trace log" of an Operator Replay session in order to help determine whether a change to the displayable text translation tables will be required.

To specify a numeric CCSID character set in the Table field, type the special value of "\CCSID" into the Library field. If one table uses a CCSID number, then both tables must use a CCSID number. It is not allowed to mix a translation table name with a CCSID character set number.

When specifying CCSID character set numbers, specify the character set that pertains to the set name that is on the right side of the -> arrow character. For example, in the United States, a value of 37 (US EBCDIC) would be specified next to ->EBCDIC, and a value of 819 (US ASCII) would be specified next to ->ASCII.

The CCSID pair of 37 <-> 819 typically produces the same result on a US EBCDIC machine as using the default translation table names of QEBCDIC and QASCII. But in other countries it is more difficult to identify useful translation tables, and in those sites better results can be obtained by identifying the CCSID character sets that are used by the IBM i operating system for DB2 EBCDIC data and IFS ASCII stream files.

## Hex Character Conversion

This screen appears whenever any of the three "separator" hex values are changed. The instructions at the top of the display explain the warning and the available function key options. SMA recommends consulting SMA Support before attempting to change any of the separator values, to make sure that all of the implications of this very technical change are clearly understood.

However, LSAM i nstallations that were upgraded to version 04.00.03 from prior versions are advised to use this function to change the Cursor control separator characters to X'A1' and X'79' in order to avoid potential conflicts with LSAM Dynamic Variable tokens. These hexadecimal values are the new defaults for the LSAM as of version 04.00.03 and newer.

### OPRRPYRD302 - Hex Character Conversion

#### Fields

- ** New/Old**:  The New values will be inserted into the Script Steps if conversion is confirmed, replacing the Old values (when they are different). For more  information, refer to the field descriptions for [Operator Replay Configuration](../operator-replay/screens.md).

#### Functions

- **F3=Exit**: Quits the maintenance function and returns to the menu without changing any control field values.
- **F12=Cancel**: Quits the warning/utility display and returns to the control file maintenance main screen without committing any changes.
- **F14=Confirm conversion**: This function key first commits all control file changes to the LSAM control file, then it starts a process to check every Step of every Operator Replay Script for hex character sequences to convert. (Note: The Script Steps store these same representative hex character sequences in the same alphanumeric
    format as they are shown on the screen. Actual conversion of the representative characters into a single value, as it appears in pink on this display, does not occur until during Script execution.)
- **F16=Bypass conversion**: This function key allows all control file changes to be committed but it does not perform the automatic scan and replace function for the Script Steps. This option is not recommended in most cases because the actual Script Step content must always match the control file values in order for Script execution to be successful.

:::caution
Do NOT change the settings for the Token/variable separator or the Cursor control separators without first learning all about them. Please consult with SMA Technologies Support before attempting this change to be sure that Scripts will continue to execute as expected. However: LSAM installations upgraded to version 04.00.03 from prior versions are advised to change the Cursor control separator characters to the new LSAM default values of X'A1' and X'79'. Please contact SMA Technologies Support for more information.

***However***: LSAM installations upgraded to version 04.00.03 from prior versions are advised to
change the Cursor control separator characters to the new LSAM default values of X'A1' and
X'79'. Please contact SMA Technologies Support for more information.
:::

## Operator Replay Script List

### OPRRPYR10-1 - Operator Replay Scripts

#### Menu Pathways

Main Menu > Operator replay menu (#4) > Operator Replay scripts (#2)

#### Fields

- **Position to Script Name**:   This is used to quickly search for a particular script. Type the first characters of the script name and press <**Enter**>.
- **Opt**:                       <**Tab**> to a row in the table and enter an option. The options are listed below.
- **Name**:                      Shows the name of the scripts. Select the name of the script to change, copy, or delete.
- **User**:                      Shows the creator of each individual script.
- **Description**:              Shows the existing description of the script. Add a description or modify the existing description.

#### Options

- **1=Script step**: To work with script steps, type 1 in the Opt field next to the Name of the script. Press <**Enter**> to proceed to the Operator Replay Script Step screen
- **2=Change**: To change the user or title of an existing script, type 2 in the Opt field next to the Name of the script. Press <**Enter**> to proceed to the Operator Replay Script (CHANGE) screen.
- **3=Copy**: To copy a script and its steps, type 3 in the Opt field next to the Name of the script. Press <**Enter**> to proceed to the Copy Script screen. A pop-up window will offer the option to also copy any associated Capture Data Rules and Response Rules associated with each script step *(example below)*.
- **4=Delete**: To delete a script, type 4 in the Opt field next to the Name of the script. Press <**Enter**> to proceed to the Delete Script confirmation window. A pop-up window will offer the option to also delete any associated Capture Data Rules and Response Rules associated with each script step *(example below)*.
- **5=Display**: To view the script master record, type 5 in the Opt field next to the name of the script and press <**Enter**> to proceed to the Display Script screen.
- **7=Capt chart**: To view a list that reveals all the Capture Data and Response Rules connected to each step of a script, type 7 in the Opt field next to the name of the script and press <**Enter**>.
- **8=Export**: Type 8 in the Opt field next to the name of the script and press <**Enter**> to start the data export process for a script. This process is used, for example, to transfer a complete script and all associated rules and variables from a Test LSAM environment to a Production LSAM environment.
- **9=Flow chart**: To view and optionally print a flow chart of script steps, including any other scripts that are linked by branching operations, type 9 in the Opt field next to the name of the script and press <**Enter**> to proceed to the script flow chart display. The flow chart display is described above, in the How-To section of this document. The flow chart display screen supports a function key **F9=Print** that will generate a printable report (spool file) of the flow chart on display, but the report includes up to 132 characters of information per line, while the display is limited to less than 80 characters per line.

#### Functions

- **F6=Add**: Proceeds to the Add Script screen.
- **F16=Search next**: When the list of scripts is long, the Search content field may be used to find a script in the list, either by matching the name or by matching any characters in the description, or even matching on the user name. Function key <**F16**> can be used to continue an existing search (represented by a pink search value below the Search content input field) to additional script records that may also match the search content value.

## Windows and Sub-Screens

### Add (Copy) Script Screen

This screen appears the same for both the Add and Copy functions. The mode is indicated by the pink subtitle on line 2 of the screen. The Copy function also copies all Steps associated with the from-script.

#### Add (Copy) Operator Replay Script Screen 
```

OPRRPYR10-3               Operator Replay Script                 00/00/00   
USERNAME                           ADD                           04:43:59

   Name  . . . . :  __________    User  . . . . :  __________
   Description . :  ________________________________________

  F3=Exit   F4=Prompt   F9=Flow chart   F12=Cancel
```
## Change Script Screen

This screen is similar to the Add/Copy screen, but with an informational
field added and the Name field cannot be changed.

### OPRRPYR10-3 - Operator Replay Script

#### Fields

| Field         | Default Value | Required | Description            |
| -----         | ------------- | -------- | -----------            |
| Name          | None          | Y        | -   This name is used as a parameter in the STROPRRPY command when registering a script as a scheduled job in OpCon/xps.  |
|               |               |          | -   Any Alphabetic characters may be used to identify a script.            |
|               |               |          | -   This field cannot be updated in Change mode.       |
| User          | None          | Y        | The name of an IBM i user profile that is registered in the Operator Replay user table.                 |
|               |               |          | Press <**F4**> (Prompt) from this field to view and select from a list of names.                 |
| Description   | None          | N        | Enter text describing what this script does. |
| Int record ID | output only   |          | In Change mode, this field is displayed for technical support purposes only. The hidden, internal record number has no meaning at the level of Script maintenance or flow analysis.      |

#### Functions

- **F3=Exit**: Quits the OR Script's maintenance function and returns to the menu without completing the maintenance function (add, change, copy).
- **F4=Prompt**: Prompts for User Names when the cursor is in the User field.
- **F9=Flow chart**: Produces a display of the logic flow of this script and any scripts that it may branch to. This function key produces no results during Add mode because no script record exists to analyze. (Refer to option 9=Flow chart on the list of Scripts display, above, for more information.)
- **F12=Cancel**: Quits the Script maintenance function and returns to the list of scripts without adding or updating a record.

#### Delete Script Window
```
                     Delete Script

   Name          Description
   ACCOUNTING    Test Operator Replay
   CHGMAXJOBS    Change the Max Jobs to 175

                                            Bottom
  Enter=Confirm   F12=Cancel
```
#### Fields
- **Name**:          The name of the script(s) that is deleted.
- **Description**:   A description of the script(s) that is deleted.

#### Functions

**F12=Cancel**: Quits the Delete Script confirmation window and returns to the list of scripts without deleting any records.

### Copy/Delete Script Window (Options 3 and 4)

####Manage Capture Rules Window (Copy)
```
                   Manage Capture Rules

   Copy capture rules also?   1  0=No, 1=Yes            (Recommended: 1=Yes)

  Enter=Select   F12=Cancel
```

#### Manage Capture Rules Window (Delete)
```

                     Manage Capture Rules

   Delete capture rules also?   1  0=No, 1=Yes            (Recommended: 1=Yes)

  Enter=Select   F12=Cancel
```

#### Fields
Copy? **- or -** Delete?
  -   0=No, 1=Yes                                       
  -   When either option 3=Copy or option 4=Delete is selected, the program offers the option to perform either a copy or a delete of all Capture Data and Response Rules that are related to each step in the script.                                        
  -   For option 0=No, the copy or delete action is completed, but any associated Capture Data and Response rules are ignored. 
  -   When this window is presented from the Step list, it applies only to the step(s) being copied and not to the whole script.

#### Functions

**F12=Cancel**: Quits the option window and returns to the list control display. (The copy or delete option remains incomplete and must be restarted, if desired.)

## Operator Replay Capture Chart (opt 7)

Option 7 from the list of Scripts will present the following read-only list that documents all Capture Data Rules, Response Rules and variables (Dynamic Variables or the older Operator Replay token variables). Use function key <**F11**> to rotate the list details among 5 different views. The explanation of each data field in this list may be found in the Screens and Windows documentation for each record type. Use option 5=Display from this list to view the entire detail of any record, for additional help understanding what appears in this summary list.
 
### OPRR10R7 - Capture Screen Data Chart (5 Views)

In View 4, for each Step there is a profile of the Top Control String. (View 5 shows the Bottom Control String.) The control string rules use these labels:

- **CtlOpt** = control option: F=Fail if "not", S=Skip if "not"
- **TR** = top row
- **TC** = top column
- **TL** = top length
- **not** = shows the Boolean comparison rule, such as EQ (equal) or NE (not equal). "not" means that if the comparison is not true, then the CtlOpt action will be taken
- **Str** = the reference character string that is compared to the screen content (may be blanks if the Length value is supplied)

A list of the symbolic field labels used for each Step record is documented under View 4. In this view 5 the letter "B" refers to the Bottom Control String, instead of the "T" which is the Top Control String that shows in view 4. 

#### Menu Pathways

Main Menu > Operator replay menu (#4) > Operator Replay scripts (#2) > Option 7 (Capt chart)

#### Fields

- **Script**:           Under the screen title is the name of the Operator Replay Script that is being analyzed by this list display.
- **Search content**:   Type a value to be used as a search argument. Press <**Enter**> or <**F16**> to start a new search. All fields in a step record will be searched, not only the data displayed on the list. Use option 5=Display to discover the matching field that may not appear in the list.
- **Opt**:              <**Tab**> to the line of a step record and type an option number. Press <**Enter**> to perform the option function.
- **Step**:             The Script Step number is shown for lines colored yellow (left-most indent).
- **Capt ID**:          The Capture ID is shown for lines in blue (indented 1 space under a Step).
- **RspSeq#**:         The Response Rule sequence number is shown for lines in pink (indented 2 spaces under a step).
- **Var-Tok**:          The Dynamic Variable name (or an Operator Replay Token name) is shown for lines in cyan (indented 3 spaces under a step).
- **View**:             Press function key <**F11**> to rotate the list display among 5 different views. Each view shows a summary of a different part of each record type. Rotate the views to quickly analyze what is configured for each record type.

#### Option

**5=Display**: Type 5 next to any record type and press <**Enter**> to quickly access a read-only view of the complete record detail.

#### Functions

- **F3=Exit**: Quits the Script maintenance function and returns to the menu. Note that changes already made to script records are retained.
- **F5=Refresh**: Reloads the list from the database file.
- **F9=Print**: Creates report OPRRPYP10 that transfers the entire Capture Chart analysis list to a printable report spool file. The report will show only the current View. Use F11 to change the view in order to print other details about each record on display the next time that F9=Print is pressed.
- **F11=Next view**: Rotates the list view among 5 different summaries of details about each record type. The current view in effect is displayed in the View field, to the right of the column headings.
- **F12=Cancel**: Returns to the list of Scripts.
- **F16=Search**: When a value is entered into the Search content field, pressing <**Enter**> or <**F16**> starts a new search for step records that contain the search content string anywhere in the step master record (the search includes all step record fields, including comments, string to send, branch operations, control strings, etc.). After a search is started, when there is a previous search content value shown in pink under the search input field, <**F16**> is used to continue the search on to the next step record that matches the search content value.

## Operator Replay Script Step List

### OPRRPYR10-2 - Operator Replay Script Steps

#### Menu Pathways

Main Menu > Operator replay menu (#4) > Operator Replay scripts (#2) > Option 1 (Script steps)

#### Fields

- **Search content**:                    Type a value to be used as a search argument. Press <**Enter**> or <**F16**> to start a new search. All fields in a step record will be searched, not only the data displayed on the list. Use option 5=Display to discover the matching field that may not appear in the list.
- **Opt**:                               <**Tab**> to the line of a step record and type an option number. Press <**Enter**> to perform the option function.
- **Seq**:                               Sequence number controls the order in which steps are performed as part of a script.
- **Label**:                             An optional label assigned to a step that becomes the target of a branching operation.
- **Comments/String to send + F-Key**:   A description of what each step in a script accomplishes. When <**F11**> is pressed, the list shows the String to send data and the Function key.

#### Options

- **2=Change**: To change the Step record, type 2 in the Opt field next to the Step record(s). Press <**Enter**> to proceed to the Change Step detail screen.
- **3=Copy**: To copy the Step record, type 3 in the Opt field next to the Step record. Press <**Enter**> to proceed to the Copy Step detail screen. A pop-up window will offer the option to also copy any associated Capture Data Rules and Response Rules associated with each script step. (Refer to the Manage Capture Rules pop-up window above, following the Scripts List display.)
- **4=Delete**: To delete the Step record, type 4 next to each Step record. Press <**Enter**> to proceed to the Delete Step confirmation window. A pop-up window will offer the option to also delete any associated Capture Data Rules and Response Rules associated with each script step. (Refer to the Manage Capture Rules pop-up window above, following the Scripts List display.)
- **5=Display**: To display the Step record, type 5 next to each Step record. Press <**Enter**> to proceed to the Display Step Details screen. Typing option 5 next to many or all step records at once before pressing Enter is a convenient way to review all the steps in a script. Press <**Enter**> to advance as each detail screen is presented.
- **6=DSPLBLWU**: Display Label Where Used. If a step is assigned a Label, this script analysis tool will produce a list of all scripts that have a branching operation assigned to this label value.
- **7=Capt chart**: Type 7 next to a Step and press <**Enter**> to see a list of all Capture Data Rules, Response Rules, and variable tokens used by the step. The list of the Capture Chart appears the same for the whole Script, except this option will show data for only one Step.

#### Functions

- **F3=Exit**: Quits the Script maintenance function and returns to the menu. Note that changes already made to step records are retained.
- **F5=Refresh**: Reloads the list of steps from the database file.
- **F6=Add**: Proceeds to the Add Step Detail screen.
- **F9=Flow**: Shows the analysis flow chart for the whole script, the same as using option 9 from the list of script master records.
- **F11=View 2/1**: Toggles the list display between showing step Comments or showing the String to send and function key, for each step.
- **F12=Cncl**: (Cancel) Returns to the list of Scripts. Changes already made to step records are retained.
- **F16=Search**: When a value is entered into the Search content field, pressing <**Enter**> or <**F16**> starts a new search for step records that contain the search content string anywhere in the step master record (the search includes all step record fields, including comments, string to send, branch operations, control
strings, etc.). After a search is started, when there is a previous search content value shown in pink under the search input field, <**F16**> is used to continue the search on to the next step record that matches the search content value.

## Windows

### Delete Step Window

### Delete Step Window
```
               Delete Step

Seq       Comment
10       Bypass logon messages 1

                                    Bottom
Enter=Confirm   F12=Cancel
```

#### Fields

- **Seq**:        The sequence number of the step record to be deleted.
- **Comments**:   A description the step record

#### Functions

**F12=Cancel**: Returns to the list of step records without completing the delete action.

## Operator Replay Step Detail Screen

### OPRRPYR10-4 - Change Operator Replay Step Detail

:::tip
The screen denotes the functions Add, Change, Copy or Display in the title line. The field values are all the same, except the internal "Rec ID" does not appear in the Add or Copy modes.
:::

#### Menu Pathways

- Main Menu > Operator replay menu (#4) > Operator Replay scripts (#2) > Option 1 (Script steps) > Operator Replay Step List > Option 2 (Change)
- Main Menu > Operator replay menu (#4) > Operator Replay scripts (#2) > Option 1 (Script steps) > Operator Replay Step List > Option 3 (Copy)
- Main Menu > Operator replay menu (#4) > Operator Replay scripts (#2) > Option 1 (Script steps) > Operator Replay Step List > F6 (Add)
- Main Menu > Operator replay menu (#4) > Operator Replay scripts (#2) > Option 1 (Script steps) > Operator Replay Step List > Option 5 (Display)

#### Fields

(Look for **DynVar** notation in Default Value to find fields that support Dynamic Variables)


| Field            | Default Value  | Required        | Description    |
| -----            | -------------  | --------        | -----------    |
| Step description | None           | N (recommended) | Type a Text Description for the script (up to 40characters)    |
| Rec ID           | System assigned |               | Not shown for Add or Copy mode, this internal number is for technical support use only.          |
| Step sequence number | Auto-assigned, | Y             | -   The next available sequence number is autoassigned when the Add or Copy function is being used. This number can be changed to reposition a step to a different relative position among all the sequence steps. |
|                  |                |                  |-   Use F7=ReSeq (re-sequence) from the list of steps to renumber all steps in increments of 10, if there are no more numbers available for inserting steps between existing steps. |
| Step label     | None           | N             | Optional value used as the target of a branching operation from another step and/or script.|
| Receive timer override (in seconds)  | Zero           | N             | A response wait timeout value that overrides the global wait timeout value set for all Operator Replay Scripts, optionally allowing this step of the Script to take as long as the specified number of seconds before the session control program logs a timeout failure of the Script. (Refer to discussion above about using this override field with branching logic.) |
| Loopback OVR   | Zero           | N             | This field allows a script to loop back to this same step more times than are allowed by the Operator Replay Configuration global setting for the Script Loop Detect Limit. A value of blank or zero means that there is no override to the global loop limit.
|                |                |               | A value of all 9s (99999) will mean *NOMAX, that is, there is no limit.
|                |                |               | CAUTION: Using the *NOMAX value of all 9's might allow a script driver program to run endlessly, possibly consuming system resources until the system reaches a critical resources limit (depending on the script actions that are repeated). |
| String to send | None supports Dyn- Var  | N             | -   In this field, type all the characters and spaces that an operator would type. Stop right before the next press of a Function key or <**Enter**>. |
|                |                |               | - Dynamic Variable tokens may be used in this field (use F9 to select from list and format tokens), but care must be taken that after all Tokens are replaced, the String to send will not exceed 250 characters in total length. |
|                |                |               | - If it is necessary to type more than 250 characters into a single display format, extra steps may be added to type the additional data. (Do not use the Function to send until the last step record.) |
|                |                |               | - Press <**F4**> to use a prompt window to select any required cursor movement keys. When a cursor movement key is selected from the pop-up window, the correct control sequence of characters will be inserted into the String to send field (at the current cursor location). |
|                |                |               | - This field may be left blank, such as when the step record only executes a function key (refer to next field). |
| Function to send (function key mnemonic)  | None supports **DynVar** | N             | -  A Function to send is required to execute the String to send. However, a given Step record does not have to include this field value, depending on the purpose of the step record.  |
|                |                |               | -   An Dynamic Variable token (with a short name length) may be used in this field, similar to the way a token may be inserted into the String To Send field. |
|                |                |               | -   However, before this Step is executed, the Token must be set to one of the valid mnemonic values for a function key, as appear on the prompt Window when F4=Prompt is pressed from this field. |
|                |                |               | -   A Step record may have only a function key (and no String To Send). There are also uses for Step records that have no Function to send. |
|                |                |               | **Example:**  No String to send is require when pressing <**Enter**> is required to bypass a display that does not require any data input.    |
| Top/Bottom Control strings   |                |               | Either or both of the control string rules may be specified. Both control rules, when specified, must be met in order to perform any operation on a Step record. String to send, Function to send and branching operations are controlled by these control string rules.  |
| If no match: Skip/Fail  | F              | Y             | - F = fail the Script job if a rule is not matched. |
|                         |                |               | - S = skip this Step only if a rule is not matched. When the Skip option is specified there must be another Step record following this one that will process the current display format in the Script execution program's buffer, otherwise the Script Steps will be out of synchronization with the sequence of display formats. The Skip option does not include any means of responding to a display format by itself. |
| Comp numeric   | N              | N             | Compress numeric = forces processing of both the Top and Bottom control strings to use numeric comparison rules. Both the control value and the found  string at the specified location are first processed to remove all but the digits 0 - 9, then each string of digits is  right-adjusted and zero filled into a numeric work field before the comparison is performed. All compared values may include other characters, but they will be ignored and the rule will pass as long as the compressed numeric digits pass the Rule. If Comp numeric is specified, then character string comparisons cannot be used; include another Step record if a character string comparison must be provided as an option. |
| Rule           | EQ             | N             | - If the Rule field for either the Top or Bottom control string is blank, that control string has no effect. |
|                 |               |               | - Possible Rule values are: |
|                 |               |               | -- EQ = Equal |
|                 |               |               | -- NE = Not Equal |
|                 |               |               | -- GT = Greater Than | 
|                 |               |               | -- LT = Less Than |
|                 |               |               | -- GE = Greater or Equal |
|                 |               |               | -- LE = Less or Equal  |
| Val: (value) character | blank supports **DynVar** | N             | -   Type a character string that will be compared to the location specified on the current  display format. |
|                 |               |               | -   This field can be left blank so that blanks will be used for the comparison if the Length is specified. The Length field determines how many blank characters will be compared. |
|                 |               |               | -   This field supports a Dynamic Variable token. |
 | R: (row)       |                | N             | Type a value from 1 to 24 to designate the vertical row of the display that should be searched for the Control string. |
|                 |               |               | Note: There may be row numbers higher than 24 when alternate display formats are being used, however, screen formats other that *DS3 (24 rows by 80 columns) are not supported at this time. Contact SMA Technologies Support if support for 27 X 132 formats is required. |
| C: (column)    |                | N             | Type a value from 1 to 80 to designate the horizontal column position where the Top string must begin. |
|                 |               |               | **Note:** Refer to the note on R: (row) about value limits. |
| L: (length)    |                | N             | -   Type a length up to 30 characters that indicates how long a control string value should be used. |
|                 |               |               | -   When the control string is not blank, this value is optional and the system assumes the length is equal to the last non-blank character. |
|                 |               |               | -   However, if trailing blanks must be included, or if the whole control string must be a certain number of blanks, then the length specifies exactly how long the control string is and how many characters in the display format location specified must match.  |

#### Functions

- **F3=Exit**: (Not shown, but supported.) Quits maintenance function without completing any data changes and return to the menu.
- **F4=Prompt**: View the list of values for certain fields and allow one value from the list to be selected and inserted into the prompted field.
    1. String to send: <**F4**> shows a list of cursor control commands that may be inserted.
    2. Function to send: <**F4**> shows a list of valid function keys that may be specified.
    3. Rule: <**F4**> shows a list of valid Rules.
- **F6=Variable**: Shows the list of the Token/Variable data fields that are registered for use with Operator Replay (refer to [Tokens/Variables Management](../operator-replay/screens.md#tokensvariables-management)). When variables are inserted into supported fields, the Operator Replay function substitutes the currently registered value in place of the token at the time the script is executed.
- **F7=DSPLBLWU**: Display Label Where Used. If a Step label value has been assigned to this step, a script analysis utility will search for all Scripts that reference this label value in a branch operation and then show a list of the Scripts that use this label value.
- **F8=Cmd prompt**: When the cursor is positioned in the String to send field, press <**F8**> to branch into IBM i command prompting. The selected command and any parameter values prepared during this branch will be returned to the string to send field (unless the prompting is exited using <**F3**> or <**F12**>.) Hint: It helps to type in a command name first before pressing <**F8**>, since the access to command entry using this function key is intentionally restricted.
- **F9=DynVar**: Shows a list of Dynamic Variables, when the cursor is in a supported field (refer to table of fields, above). When a Dynamic Variable is selected from the pop-up window, a formatted token is inserted at the current cursor location. The Dynamic Variable token will be replaced with its value at run time. Captured Data Response Rules (linked to the same step, or to prior steps) can be used to set Dynamic Variable values just before they are used.
- **F10=Capt Defn**: After the Step Sequence (number) field has been specified, it is possible to press <**F10**> to branch into the Work with Screen Capture Definitions screen. (Refer to [OR Script Operations](../operator-replay/operations.md) for an outline of how to use this function key. Also refer to the [OR Script Screens and Windows](../operator-replay/screens.md) below for more information about Screen Capture definitions.) Remember to press <**Enter**> after returning from this branch in order to complete the creation or change of the Operator Replay Step detail record.
- **F12=Cancel**: (Not shown, but supported.) Quits the maintenance function without completing any data changes and returns to the list of step records.

## Discussion of Receive Timer Override

Thescreen above shows the Receive timer override field, just under the Sequence number field. This field will display blank when zero. A zero or blank value means that there is no override, and the control file default Receiving Data Timeout value applies to this step.

The Receive timer override value is specified in seconds (not microseconds, as in the Operator Replay Configuration screen) because it is assumed that an override value will be a generally larger value and not require timing as small as microseconds. For example, specifying a value of 360 in this field means that the LSAM  Operator Replay Script driver program will wait up to 6 minutes for this step to execute, rather than timing out after only the 30 seconds specified in the control record.

A value specified for the step Receive timer override value will have no effect on any other step of a Script. The system allows a step with a timer override to complete more promptly, and the script will continue processing as soon as the step is complete (that is, after the Inter-read delay value and/or the Post send delay value specified in the Operator Replay control record). There is no penalty for specifying a longer Receive timer override value.

If a branch operation is being used in a Script there are special rules for making sure that the expected timer override value will apply. Refer to the discussion about this timer override field above, in the section about how to use Script branching.

### Windows

#### Function to Send
```
Fctn Selection
     ACK
     ATTN
     ENTER
     F1
     F10
     F11
     F12
     F13
     F14
     F15
     F16
     F17
     F18
     F19
     F2
     F20
           More...
F12=Cancel
```
:::tip
The special function key value ACK does not generate any data sent to the Host system. It is used to clear the script driver program's screen image buffer, typically after a *STATUS message was received from the host. (Status messages do not require any response by a human operator, but the driver program may need to clear them in order to manage step timeouts.)
:::

#### Functions

- **Cursor up/down**: Moves the cursor down or back up to select the function that is inserted into the Function to send field.
- **Pageup/Pagedown**: When the window shows "More..." at the bottom, right-hand corner, use the Paging keys to show other valid values from the entire list.
- **Enter**: Returns the currently highlighted function and inserts it into the Function to send field.
- **F12=Cancel**: Quits the window and returns to the step details screen without selecting a function.

##### Cursor Control Selection

Cursor Control Selection Window
```
Cur Ctl Sel

  Backspace
  Cursor Down
  Cursor Left
  Cursor Right
  Cursor Up
  Field Advance
  Field Backspace
  Field Exit
  New Line

               Bottom
F12=Cancel
```
#### Functions

- **Cursor up/down**: Moves the cursor down or back up to select the cursor control operation that is inserted into the String to send field.
- **Page Up/Page Down**: When the window shows "More..." at the bottom, right-hand corner, use the Paging keys to show other valid values from the entire list.
- **Enter**: Return the currently highlighted cursor control operation and inserts it into the String to send field.
- **F12=Cancel**: Quits the window and returns to the step details screen without selecting a cursor control operation.

### Variable/Token Select

Refer to Token/Variables Management below. Operator Replay Token variables are supported in the following Step record fields: String to send, Function to send, Branch-to Script, Branch-to Label and the Control string Val(ue) fields. SMA recommends using Dynamic Variables instead of this older type.

#### Variable/Token Selection Window
```
            Var Selection

DATE1      Application date                   
MAXJOBS    Max Concurrent Jobs Token  

                                 Bottom
F12=Cancel
```

#### Functions

- **Cursor up/down**: Moves the cursor down or back up to select the variable that should be inserted into the supported Step field.
- **Page Up/Page Down**: When the window shows "More..." at the bottom, right-hand corner, use the Paging keys to show other valid values from the entire list.
- **Enter**: Returns the currently highlighted variable as a token and inserts it into the supported field where the cursor was last positioned.
- **F12=Cancel**: Quits the window and returns to the step details screen without selecting a variable.
:::tip
The special characters that are reserved to designate token/variable fields and cursor control characters are specified in control records within the LSAM Parameters table LSAPARF00.
The Token/Variable Separator and the Cursor Control Separator characters can be maintained by the Operator Replay Configuration function, however, SMA Technologies recommends against changing these characters (except for the one-time conversion recommended after upgrading to LSAM version 04.00.03 from a prior version). If these special characters must be changed, it is required to observe the following caution. Also, please contact SMA Technologies Support for advice. 
If these special characters are changed in the control file, then every existing Operator Replay script that uses them must also be updated. The Operator Replay script execution program relies on the contents of the control file to recognize which characters designate token/variable fields and cursor control characters. A special warning/utility screen appears after pressing <**Enter**> on the Operator Replay configuration maintenance screen, if any of the three Separator hex character sequences has changed. Use the function key <**F14**> to confirm the change and allow a conversion program to scan all Script Step records, replacing the old separator characters with the new characters. This keeps the control file synchronized with the Step record content, which is required for successful execution of an Operator Replay Script.
:::

## Select Dynamic Variable

SMA recommends using these Dynamic Variables instead of the older Operator Replay Token variables in Operator Replay Script Steps. The fields that support Dynamic Variables are marked in the table of screen format fields, above. When the DynVar function key is pressed, the following window overlays the display. Position the cursor to the desired variable name, then press <**Enter**> to insert the variable name surrounded by the token special characters into the field at the
current cursor location.

#### Dynamic Variable Selection Window
```
Select Dynamic Var

Dynamic Var.   Seq

ANYMSGTXT       00                                               
MAXJOBS         00
TESTSTSVAR      00

                 Bottom

Enter=Select   F12=Cancel
```

#### Functions

- **Cursor up/down**: Moves the cursor down or back up to select the variable that should be inserted into the supported Step field.
- **Page Up/Page Down**: When the window shows "More..." at the bottom, right-hand corner, use the Paging keys to show other valid values from the entire list.
- **Enter**: Returns the currently highlighted variable as a token and inserts it into the supported field where the cursor was last positioned.
- **F12=Cancel**: Quits the window.

### Operator Replay Log Selection

#### Operator Replay Log Selection Screen
```
OPRLOGR00-1             Operator Replay Log Selection               00/00/00
QSECOFR                                                             00:00:00

  Position to Script Name...   _________
  Type options, press Enter.
     5=Display   8=RpyUsrJob   9=WRKJOB
  - IBM i Replay Control Job -
  Opt Script      Rpy User       Date      Time    Name       User       Number       
   _  TSTOPRPY02  TSTOPR      03/12/0000 10:06:06  TSTJOBNM   QSECOFR    109972
   _  TSTOPRPY02  TSTOPR      03/09/0000 16:35:05  TSTJOBNM   USER01     109787                                                                       _  TSTOPRPY02  TSTOPR      03/09/0000 16:34:12  TSTJOBNM   USER01     109787
   _  TSTOPRPY02  TSTOPR      03/09/0000 15:45:43  TSTJOBNM   USER01     109776

                                                                         More...

F3=Exit   F5=Refresh   F11=Sort date   F12=Cancel
```

The example above illustrates that the list of log index entries uses red to highlight any jobs that completed with a non-zero completion code. The color blue indicates that the Script job is still active; green indicates a normally completed job; white indicates that the job is no longer found in the system (rare).

Use option 5=Display to view more information about any job, including the error code and text that describes the job completion status. From the detail display of each Operator Replay job, function key <**F10**> may be used to view the Operator Replay Script Log entries, as illustrated above and below. F10 is also supported for incomplete/active jobs.

#### Menu Pathways

Main Menu > Operator replay menu (#4) > Operator Replay logs (#3)

#### Fields

- **Opt**:          <**Tab**> to the line of a step record and type an option number. Press <**Enter**> to perform the option function. Type 5 to view the log information for the execution of the script.
- **Script**:       The name of the Script that was executed at each date and time.
- **Rpy User**:     The name of the IBM i User ID that was specified to run the script.
- **Date**:         The date when this Script was executed.
- **Time**:         The time when this Script was executed.
- **Job Name**:     The name of the IBM i job that controlled the script execution.
- **Job User**:     The name of the IBM i user that controlled the script execution.
- **Job Number**:   The number of the IBM i job that controlled the script execution (NOT the number of the script's emulated job).

#### Options

- **5=Display**: To view the log entry details and access the log entry content, type 5 next to the selected script name and date/time. Press <**Enter**> to proceed to the log content viewer. 
- **8=RpyUsrJob**: (View Replay User Jobs) To view all the jobs that have been run by the specified replay script user, type 8 next to the selected script name and date/time. Press <**Enter**> to proceed to a list of jobs that were run with this user name. This option is useful for locating the printed output of the actual emulated interactive job that was executed by the script. Since it is not easily possible to identify the actual emulated job number while a script is running, the log entry does not contain this information. The user name used for the job is known, so a list of all jobs associated with this user provides a limited list of jobs that may be reviewed.
- **9=WRKJOB**: (Work with Job) To view any information remaining in the system about the job that controlled execution of the replay script, type 9 next to the selected script name and date/time. Press <**Enter**> to proceed to the IBM i Work with Job menu. Just in case any problems require research, this option can be used to find a job log from the job that controlled script execution. This is NOT the actual script emulation job. It is the job that launched the operator emulation script.

#### Functions

- **F3=Exit**: Quits the list of log files and return to the menu.
- **F5=Refresh**: Shows an updated list of script log files, in case more have been added since the list was first displayed.
- **F11=Sort date/Sort script**: Changes the order in which log entries are shown on the display. The column heading of the current sort order is shown in pink. When F11 is selected, the F11 function key legend text changes as well as the prompt text in front of the Position to... input field. This function key makes it easier to locate script log index entries, depending on whether the script name or the date/time of execution is known.
- **F12=Cancel**: Quits the list of log files and returns to the menu.

### Operator Replay Display Log Detail

#### Example Operator Replay Display Log Entry
```
OPRLOGR00-2               Operator Replay Log Entry                  00/00/00   
USERNAME                                                             00:00:00

  Press F10=Log detail to see captured dialog.

  Script name................: TSTOPRPY02
  Replay job user name.......: TSTOPR
  Replay job return code.....: 0  Normal end of job
  OPRLOGF10 data member name.: O234567890
  Job date...................: 03/12/0000
  Job time...................: 10:06:06
  IBM i control job name.....: JOBNAME
  IBM i control job user.....: QSECOFR
  IBM i control job number...: 109972

  F3=Exit   F8=RpyUsrJob   F9=WRKJOB   F10=Log detail   F12=Cancel
```

#### Menu Pathways

Main Menu > Operator replay menu (#4) > Operator Replay logs (#3) > Option (#5)

#### Fields

- **Script name**:                  The name of the Script that was executed at each date and time.
- **Replay job user name**:         The name of the IBM i User ID that was specified to run the script.
- **Replay job return code**:       The code returned by the script control job. The interpretation of the code appears to the right of the code in pink text.
- **OPRLOGF10 data member name**:   For technical support use, this is the name of the data member that was added to the script log file OPRLOGF10, in which the actual script logging data was stored. The member name is comprised of an initial letter "O" followed by digits 2 through 10 of the SAM job name (if OpCon/xps executed the job in normal mode "O") or all 6 digits of the IBM i controlling job (if the job was executed in the debug mode "A").
- **Job date**:                     The date when this Script was executed.
- **Job time**:                     The time when this Script was executed.
- **IBM i control job name**:       The name of the IBM i job that controlled the script execution.
- **IBM i control job user**:       The name of the IBM i user that controlled the script execution.
- **IBM i control job number**:     The number of the IBM i job that controlled the script execution (NOT the number of the script's emulated job).

#### Functions

- **F3=Exit**: Quits the list of log files and returns to the menu.
- **F8=RpyUsrJob**: (view Replay User Jobs) To view all the jobs that have been run by the specified replay script user, type 8 next to the selected script name and date/time. Press <**Enter**> to proceed to a list of jobs that were run with this user name. This option is useful for locating the printed output of the actual emulated interactive job that was executed by the script. Since it is not easily possible to identify the actual emulated job number while a script is running, the log entry does not contain this information. The user name used for the job is known, so a list of all jobs associated with this user provides a limited list of jobs that may be reviewed.
- **F9=WRKJOB**: (Work with Job) To view any information remaining in the system about the job that controlled execution of the replay script, type 9 next to the selected script name and date/time. Press <**Enter**> to proceed to the IBM i Work with Job menu. This option can be used to find a job log from the job that controlled script execution, in case any problems require research. This is NOT the actual script emulation job, but the job that launched the operator emulation script.
- **F10=Log detail**: View the actual log content to see the recorded system output and the automated script input.
- **F12=Cancel**: Quits the list of log files and return to the menu.

### Replay Log Detail (F10)

The Operator Replay Display Log function is explained in detail above under OR Script Operation > [Viewing Operator Replay Logs](../operator-replay/operations.md#view-operator-replay-log-files).

### Tokens/Variables Management
:::tip
SMA Technologies recommends using Dynamic Variables instead of the older, simple Operator Replay token/variables. Documentation of this older variable type is retained to support existing users. Dynamic Variables are explained in detail in Events and Utilities menu.

The terms Token and Variable may be used interchangeably, but the actual meaning assigned to these terms is: A Variable is an entry in the LSAM table of Operator Replay Variables, and it includes its name, a description and its current value setting. A Token represents the Variable in the one of the Operator Replay Step detail record fields. The format of a Token is |variable_name|, where the vertical bars (pipes) are the special character used to separate the Token from other text in the string to send field. The special character assigned to denote Operator Replay Tokens is specified in the Operator Replay configuration function, LSAM menu 4, option 7.
:::
### Tokens/Variables Management Operations

An Operator Replay variable can be added, or have its value reset, using the IBM i LSAM command ADDRPYTOK (Add Replay Token). Operator Replay variables can also be added and set by a special field that appears in the Captured Data Response Rules record. These methods may be helpful to capture values that exist only while a job is active. But Operator Replay variables may also be configured in advance, so they are readily available during maintenance of Script Steps, using the following procedure.

#### Add a Token/Variable
1. In the command line, enter **STRSMA**. For more information on STRSMA command parameters, refer to the [STRSMA Command](/operations/lsam#the-strsma-command).
2. Enter **4** to choose the **Operator Replay menu** in the SMA Main Menu.
3. Enter **4** to choose **Operator Token/Variable Management** in the Operator Replay Menu.
4. Press <**F6**>.
5. Enter the Token Name, Token Value, and a Description.

## Tokens/Variables Management Screen

### OPRVARR00-1 - Operator Tokens/Variables Management

#### Menu Pathways

Main Menu > Operator replay menu (#4) > Operator Token/Variable management (#4)

#### Fields

- **Position to Token Name**:   To quickly search for a particular token or variable, enter the first characters of the name and press <**Enter**>.
- **Opt**:                      Type a valid option value and press <**Enter**> to execute the function for one or more entries in the list.
- **Token Name**:               The identifier of the token or variable.
- **Token Description**:        A description of the token or variable.

#### Options

- **2=Change**: To change the token/variable, type 2 next to a token/variable. Press <**Enter**> to proceed to the Change Tokens/Variables window.
- **4=Delete**: To delete the token/variable, type 4 next to the token/variable. Press <**Enter**> to proceed to the Delete Tokens/Variables confirmation window.
- **5=Display**: Used to view the details of a single record, although all details may also be viewed by toggling function key F11.

#### Functions

- **F3=Exit**: Quits the list function and return to the menu.
- **F6=Add**: Proceeds to the Add Tokens/Variables window.
- **F11=View value/View description**: Change the third column in the list between showing either the token description or the token value. This function key may be used instead of option 5=Display.
- **F12=Cancel**: Quits the list function and return to the menu.

## Add (Change) Token Window

### OPRVARR00-2 - Add Tokens/Variables

The Add and Change Token windows appear the same, except for the title.

#### Fields

- **Token Name**:    Y
- **Token Value**:   Y
- **Description**:   N

#### Functions

**F12=Cancel**: Quits the Add or Change window and returns to the list of variables without adding or changing any data.

## Delete Token Window

#### Delete Token Window
```
            Delete Tokens/Variables

 Token Name        Token 
                Description
 $TEST        Valeur de Test
 MAXJOBS      Max Concurrent Jobs Token

                               More...
Enter=Confirm   F12=Cancel
```

#### Fields

- **Token Name**:          The name of the deleted token or variable.
- **Token Description**:   A description of the deleted token or variable.

#### Functions

**F12=Cancel**: Quits the Delete confirmation window and returns to the list of variables without deleting any records.

## ADDRPYTOK Command for Setting Operator Replay Variables

The LSAM utility command ADDRPYTOK can be used from IBM i command entry or from within a job submitted by OpCon/xps to complete the same Create or Change maintenance of the Operator Replay Tokens as the LSAM screens above. This command is able to add new variables to the LSAM table when the do not already exist, or to update the value of an existing token.

Also refer to the discussion below, under Captured Data Response Rules, about how the response rules can also be used to create or set the value of Operator Replay Token Variables.

## Work with Screen Capture Definitions

### OPRR40R1 - Work with Screen Capture Definitions

The same data capture functions support both Screen data capture for Operator Replay and report data capture for the SCANSPLF utility command. Some of the following description includes information that is useful in distinguishing between the two different types of data capture. Each actual data capture definition and the captured data record are labeled by their Type field, where "C" = screen capture and "S" = spool file capture.

Refer to the topic on Events and Utilities menu, for more information about ways to use data capture and captured data response rules.

#### Menu Pathways

- Main Menu > Operator replay menu (#4) > Operator Replay Scripts (#2) > Script step list (Opt 1) > F6=Add **- or -** option 2=Change **- or -** option 3=Copy > F10=Capt Defn.
- Main Menu > Operator replay menu (#4) > Work with Screen Capture Definitions (#5)

#### Fields

- **Script**:          When this Work With list has been called using function key F10 from the Operator Replay Step record screen, the name of the Operator Replay script is fixed and it appears in the heading of this list display.
- **(Script) Seq**:    When this Work With list has been called using function key F10 from the Operator Replay Step record screen, the sequence number of the Operator Replay Step is fixed and it appears in the heading of this list display.
- ** Search content**:   Type a value in this field and press <**Enter**> or <**F16**> to initiate a search for a record that has matching data anywhere in the record, including data that might not appear on the list display (but the matching data would appear in the display of the detail of the record). When <**F16**> is pressed a second time, the search continues from after the last matching record, using the same Search content data. Press <**Enter**> a second time (with no options typed), or press <**F5=Refresh**> to start a new search.
- **Opt**:              Type option from list displayed near the top of this screen. Refer to options definitions, below.
- **Rpy Script**:       Replay Script name: Each screen capture definition is associated with a specific Operator Replay script name.
- **Seq**:             Replay Script Step Sequence number: Each screen capture definition is associated with a specific Operator Replay script step Sequence number. The screen capture operation is performed after the screen format is received, but before the string to send or the function key is executed.
- **Application ID**:   A label that groups together all of the data capture rules that apply to a single Operator Replay script step Sequence number. (This field is more important when data capture is used with the SCANSPLF command, and only serves Operator Replay screen capture as a useful means of labeling captured data when it appears in the captured data debug log file list, or when prompting for a Capture ID from Response Rules.)
- **Seq**:              The sequence of the data capture rule. This number determines the order in which data capture rules are executed. The effect of this sequence number is more noticeable when there are captured data response rules associated with each data capture definition, in that it imposes a high level of control over the sequence of response rules that might apply to a given screen format (or to a SCANSPLF spool file).
- **Row**:              For screen data capture, this is the row where the data capture operation starts. (For the SCANSPLF command, this is the report line, within a page, where data is found and captured.)
- **Col**:              The column within the Row (above) where the data capture starts.
- **Len**:              The length of data that should be captured, starting at the Row and Col specified. For Operator Replay screen data, up to 1920 characters of displayable data may be captured by a single capture rule. (For display formats larger than 24 X 80, more than one screen capture rule would be required to capture more than 1920 characters of data. For the SCANSPLF command, the capture length is normally limited to 132 characters, or one print line of data.)

#### Functions

- **F3=Exit**: Return to the LSAM menu or to the Operator Replay Step maintenance screen.
- **F5=Refresh**: Reload the list display with the latest data from the master file.
- **F6=Add**: Branch to the screen for creating a new Screen Capture Definition record.
- **F12=Cancel**: Return to the LSAM menu, or to the Operator Replay Step maintenance screen.
- **F16=Search next**: Starts a new search, or continues searching after the last found record.
- **F17=Top**: Reposition the list display to show the first record in the list.
- **F18=Bottom**: Reposition the list display to show the last record in the list.

#### Options

- **2=Change**: To change a record, type 2 in the Opt field next to the record(s). Press <**Enter**> to proceed to the Change detail screen.
- **3=Copy**: To copy a record, type 3 in the Opt field next to the record. Press <**Enter**> to proceed to the Copy detail screen.
- **4=Delete**: To delete one or more records, type 4 next to each record. Press <**Enter**> to proceed to the Delete confirmation window.
  :::tip
  The Screen Capture definition records do not have to be deleted to change their position; use option 2=Change to update the sequence number to a different position in the list.
  :::
- **5=Display**: To display record details, type 5 next to each record. Press <**Enter**> to proceed to the display details screen. Typing option 5 next to many or all records at once before pressing <**Enter**> is a convenient way to review all the definition details at once. Press <**Enter**> to advance as each detail screen is presented.
- **6=Response**: To display a list of all captured data response rules that pertain to each data capture definition, type 6 next to each record. Press <**Enter**> to branch to the Work with Capture Response Rule list display. After exiting the Response list for each Capture Rule, another list will display for each Capture Rule record selected with option 6.

## Add/Change/Copy Screen Capture Definitions

### OPRR40R2 - Copy Screen Capture Definition

#### Menu Pathways

- Main Menu > Operator replay menu (#4) > Operator Replay Scripts (#2) > Script Steps (Opt 1) > F6=Add **- or -** option 2=Change *- or -* option 3=Copy > F10=Capt Defn > F6=Add *- or -* option 2=Change *- or -* option 3=Copy.
- Main Menu > Operator replay menu (#4) > Work with Screen Capture definitions (#5) > F6=Add *- or -* option 2=Change *- or -* option 3=Copy > F10=Capt Defn > F6=Add *- or -* option 2=Change *- or -* option 3=Copy.

###### Fields

- **Application ID**:                      When Copying from one definition to another, the labels of the source record appear near the top of the screen as heading information. This field does not appear for Add or Change.
- **Capt Seq**:                            When Copying from one definition to another, the labels of the source record appear near the top of the screen as heading information. This field does not appear for Add or Change.
- **Script name**:                          Operator Replay Script name: Each screen capture definition is associated with a specific Operator Replay script name. When this screen is accessed using F10 from the Operator Script Step, the value for this field is supplied and protected. When this screen is accessed directly from the LSAM menu, a valid Script Name must be manually entered.
- **Script Sequence**:                     Replay Script Step Sequence number: Each screen capture definition is associated with a specific Operator Replay script step Sequence number. When this screen is accessed using F10 from the Operator Step, the value for this field is supplied and protected. When this screen is accessed directly from the LSAM menu, a valid Script Sequence number must be manually entered.
- **Application ID**:                       A label that groups together all of the data capture rules that apply to a single Operator Replay script step Sequence number. (This field is more important when data capture is used with the SCANSPLF command, and only serves Operator Replay screen capture as a useful means of labeling captured data when it appears in the captured data debug log file list, or when prompting for a Capture ID from Response Rules.)
- **Capture sequence**:                     The sequence of the data capture rule. This number determines the order in which data capture rules are executed. The effect of this sequence number is more noticeable when there are captured data response rules associated with each data capture definition, in that it imposes a high level of control over the sequence of response rules that might apply to a given screen format (or to a SCANSPLF spool file).
- **Screen row start pos(-ition)**:        For screen data capture, this is the row where the data capture operation starts. (For the SCANSPLF command, this is the report line, within a page, where data is found and captured.)
- **Screen col(-umn) start pos(-ition)**:   The column within the Row (above) where the data capture starts.
- **Length of data string**:                The length of data that should be captured, starting at the Row and Col specified. For Operator Replay screen data, up to 1920 characters of displayable data may be captured by a single capture rule. (For display formats larger than 24 X 80, more than one screen capture rule would be required to capture more than 1920 characters of data. For the SCANSPLF command, the capture length is normally limited to 132 characters, or one print line of data.)

#### Functions

- **F3=Exit**: Do not update the data, return to the list display.
- **F5=Refresh**: Reload the list display with the latest data from the master file.
- **F11=Response rules**: Branch to the screens for maintaining Captured Data Response Rules that will be associated with this Data Capture definition. This function should not be used until key information has been entered to define the Screen Capture definition. Remember to press <**Enter**> to complete entry or update of the Screen Capture definition after returning from the F11 branch.
- **F12=Cancel**: Return to the LSAM menu.

## Work with Capture Response Rules

### OPRR40R1 - Work with Capture Response Rules

The same data capture response functions support both Screen data capture for Operator Replay and report data capture for the SCANSPLF utility command. Some of the following description includes information that is useful in distinguishing between the two different types of data capture. Each actual data capture definition and the captured data record are labeled by their Type field, where "C" = screen capture and "S" = spool file capture.

Refer to the topic on Events and Utilities menu, for more information about ways to use data capture and captured data response rules, especially about the Continuation (A/O) field.

#### Menu Pathways

- Main Menu > Operator replay menu (#4) > Operator Replay Scripts (#2) > Script steps (Opt 1) > F6=Add *- or -* option 2=Change *- or -* option 3=Copy > F10=Capt Defn > F6=Add *- or -* option 2=Change *- or -* option 3=Copy > F11=Response rules.
- Main Menu > Operator replay menu (#4) > Work with Captured Data Response Rules (#6).

#### Fields

- **Script**:            When this Work With list has been called using function key F10 from the Operator Replay Step record screen, the name of the Operator Replay script is fixed and it appears in the heading of this list display. (Function key F15=Subset is not shown and the subset type cannot be changed.)
- **(Script) Seq**:      When this Work With list has been called using function key F10 from the Operator Replay Step record screen, the number of the Operator Replay Step Sequence is fixed and it appears in the heading of this list display. (Function key F15=Subset is not shown and the subset type cannot be changed.)
- **Subset to Type**:    When this Work With list has been called directly from the menu, the LSAM menu passes a parameter to signal the program whether the call came from the Operator Replay menu (Type = Screen), or from the Events and Utilities Menu (Type = SCANSPLF). Function key F15 can be used to force a change to the Subtype, or to remove subsetting and show all Response rules of both types.
- **Search content**:     Type a value in this field and press <**Enter**> or <**F16**> to initiate a search for a record that has matching data anywhere in the record, including data that might not appear on the list display (but the matching data would appear in the display of the detail of the record). When <**F16**> is pressed a second time, the search continues from after the last matching record, using the same Search content data. Press <**Enter**> a second time (with no options typed), or press <**F5=Refresh**> to start a new search.
- **Opt**:                Type option from list displayed near the top of this screen. Refer to options definitions, below.
- **Capture ID (APP)**:   A label that groups together all of the data capture rules that apply to a single Operator Replay script step Sequence number. (This field serves Operator Replay screen capture as the means of labeling captured data when it appears in the captured data debug log file list, or when prompting for a Capture ID from Response Rules.)
- **Seq**:               The sequence of the data capture rule. This number determines the order in which data capture rules are executed. The effect of this sequence number is noticeable when there are captured data response rules associated with each data capture definition, in that it imposes a high level of control over the sequence of response rules that might apply to a given screen format (or to a SCANSPLF spool file).
- **T**:                  Type: C = screen capture, S = SCANSPLF data capture.
- **RS#**:               Rule Sequence Number: The order in which each response rule will be executed.
- **Script**:             When the Type field is C, this shows the ID of the Operator Replay script with which the response rules are associated. (This column becomes the Spool file name for records of Type S.)
- **Step #**:            When the Type field is C, this shows the Script Step sequence number associated with each response rule. (This column becomes the Spool file number for records of Type S.)
- **(Job Name)**:         When the Type field is S, this column will appear to show the Job Name for the Scan Rule associated with each response rule. (This column is not ued for Operator Replay screen data capture and response.)
- **Command**:            The command text (first few characters shown) that will be executed in response to captured data, if the comparison data rule qualifies.

#### Functions

- **F3=Exit**: Return to the LSAM menu, or to the Screen Capture definition maintenance display.
- **F5=Refresh**: Reload the list display with the latest data from the master file.
- **F6=Add**: Branch to the screen for creating a new Capture Response Rule record.
- **F12=Cancel**: Return to the LSAM menu, or to the Screen Capture definition maintenance display.
- **F15=Subse**t: When this program was called directly from the LSAM menu, this function key appears, permitting a change to the type of Response rule appearing in the list. The Subset window offers a choice of Type C = screen capture response rules, or S = SCANSPLF data capture response rules.
- **F16=Search next**: When a search argument has been entered in the Search content field, pressing F16 can either start a new search (if the content value was changed) or it can continue a search to look for the next list entry that matches the search argument, starting with the first record after the last match found.
- **F17=Top**: Reposition the list display to show the first record in the list.
- **F18=Bottom**: Reposition the list display to show the last record in the list.
- **F24=More keys**: Change the function key line to show additional supported keys.

#### Options

- **2=Change**: To change a record, type 2 in the Opt field next to the record(s). Press <**Enter**> to proceed to the Change detail screen.
- **3=Copy**: To copy a record, type 3 in the Opt field next to the record. Press <**Enter**> to proceed to the Copy detail screen.
- **4=Delete**: To delete one or more records, type 4 next to each record. Press <**Enter**> to proceed to the Delete confirmation window.
  :::tip
  The Capture Response Rule records do not have to be deleted to change their position; use option 2=Change to update the sequence number to a different position in the list.
  :::
- **5=Display**: To display record details, type 5 next to each record. Press <**Enter**> to proceed to the display details screen. Typing option 5 next to many or all records at once before pressing <**Enter**> is a convenient way to review all the definition details at once. Press <**Enter**> to advance as each detail screen is presented.

## Add/Change/Copy Capture Response Rules

### OPRR51R2 - Copy Capture Response Rule

Refer to the topic on Events and Utilities menu, for more information about the meaning and purpose of the fields on this display, especially how the Continuation field works. Also refer to comments below about the variable fields.

#### Menu Pathways

- Main Menu > Operator replay menu (#4) > Operator Replay Scripts (#2) > Script steps (Opt 1) > F6=Add *- or -* option 2=Change *- or -* option 3=Copy > F10=Capt Defn > F6=Add *- or -* option 2=Change *- or -* option 3=Copy > F11=Response rules > F6=Add *- or -* option 2=Change *- or -* option 3=Copy.
- Main Menu > Operator replay menu (#4) > Work with Captured Data Response Rules (#6) > F6=Add *- or -* option 2=Change *- or -* option 3=Copy.

#### Fields

- **Script**: When this maintenance screen has been called using function key F10 from the Operator Replay Step record screen, the name of the Operator Replay script is fixed and it appears in the heading of this list display.
- **(Script) Seq**: When this maintenance screen has been called using function key F10 from the Operator Replay Step record screen, the number of the Operator Replay Step 
Sequence is fixed and it appears in the heading of this list display.
- **From fields (Resp Seq)**: When this screen appears in Copy mode, the key fields of the source record being copied are shown in this heading area. When this program is called from the Operator Replay Step maintenance, only the Response Sequence appears in the From field list. A new value must be assigned to the new Response Rule record being created in Copy mode, using the Response Sequence input field (below).
- **Capture Identifier**: A label that groups together all of the data capture rules that apply to a single Operator Replay script step Sequence number. For Copy and Change operations, this key field is protected from update. This field and the Capture Seq field (next) identify the rule to which this response record will react.
- **Capture sequence**: The sequence of the data capture rule to which this response will react. For Copy and Change operations, this key field is protected from update. This number determines the order in which data capture rules are executed.
- **Capture Type**: The type of the data capture: C = screen capture, S = SCANSPLF data capture, M = Message data capture. Type C is required for Screen Captures from Operator Replay scripts. For Copy and Change operations, this field is protected from update.
- **Response sequence**: Response Sequence Number: The order in which each response rule will be executed. When changing an existing rule's sequence number, pay close 
attention to the Continuation field value, because the order of records is critical when the Continuation field is used to group multiple response qualifications (using Compare data) and commands.
- **Continuation**: 
  -   Continuation field values are: blanks, CMD, AND, OR.
  -   A value that supports multiple groups of commands and/or rules that may be qualified for execution in response to a single record of captured data. In summary, the values work like this:
  -   blank = Starts a new group of  comparison rules and commands, separate and unrelated from other rules groups.
  -   OR = an exclusive OR, meaning that the next comparison rule or group of rules may qualify a response command group if the previous rule group did not qualify.
  -   AND = connects more than one qualification rule into a single group.
  -   CMD = an additional rules record is providing an additional response command to execute, associated with the qualification rules of the comparison record or group of records immediately preceding this record. This continuation record will be ignored for comparison rules, it exists only to support multiple commands that are part of a single response group.
  -   For more information on this field and examples, refer to [Events and Utilities Menu](../events-utilities/menu.md).
- Compress numeric**: This flag field tells the LSAM data comparison rule engine how to handle the comparison data and the captured data. If numeric data was edited using a currency sign and decimal point, it may be preferable to match the whole character string exactly, without compression. But if the absolute numeric value is important and the numeric field editing cannot be predicted, then it may work better to compress out all non-numeric characters and compare only the numeric digits. Compressed numeric values do not keep track of how many digits fall to the right of the decimal point, so it is important that the number of decimal places be the same in both the captured data and the comparison data when the option for compressing numeric data will be used.
  :::tip
  This flag also affects how data will be stored for a Dynamic Variable token name, if specified.
  :::
- **Store to-> DynVar (Dynamic Variable)**: Type a name into this field to cause the current captured data value to be stored in an LSAM Dynamic Variable of this name. This function can only store dynamic variables of type-V (general use). To create or update dynamic variables of type-L (for updating an IBM i job local data area image for LSAM captured or tracked/queued jobs, use the SETDYNVAR command in the Response command field and include a different Dynamic Variable name (that may be entered into this field) as the value for the type-L variable.
- **Store to-> Oper Rply Var (Operator Replay token/variable)**: Type a name into this field to cause the current captured data value to be stored in an LSAM Operator Replay Token variable of this name. The captured data response function linked to Operator Replay script execution completes the task of storing the captured data into this variable field before the script step is executed. Therefore, it is possible to use this variable in fields that define the script step execution, responding to
 the screen that is on display as the data was captured.
- **Response cmd (part 1); F13=Full CMD 
  -   The first 214 characters of the response command string may be  entered in this field. If the command is longer than 214 characters, press <**F13=Full CMD**> to branch to a screen where a much longer command string may be entered. Function key <**F4=Prompt**> may be used to get IBM i help with command prompting. Unlike the Compare data lines, the entire command string will appear in the F13=Full CMD screen. Be careful if a partial command shows in this field in Change mode; in this case it is recommended that F13=Full CMD be used to be sure that the final command syntax is correct after any changes. 
  -   Dynamic Variables may be used in place of all or part of the command line syntax. For more informatin about Dynamic Variables, refer to [Dynamic Variables](../dynamic-variables/overview.md).

- **Comp reference value**: 
   - The compare reference value is a field containing a character string or a reference to a value store in another file, for use in qualifying     this Rule for execution. If the referenced value does not match the Compare data according to the Compare rule, then the Capture Response Rule Response command will not be executed.
   -   *CAPT = Use the captured data as the reference data (this is the original default for comparing data, in prior versions).
   -   DynVar = The LSAM Dynamic Variable named in this field will be compared to the Compare data. (Do not type 'DynVar' but instead type the name of a Dynamic Variable. Use function key F8 to select from a list of existing dynamic variables.)
   -   char = a specific string typed in this field will be compared to the Compare data.

- **Comp reference length**: Specifies the length of data to be used from the Comp reference value, starting at position 1 of the reference value. If this field is zero, then the trimmed length of the reference value will be used. (Trimming means that any trailing blanks will not be considered, only data from position 1 through the last non-blank character will determine the length of the Comp reference value.) 

- **Compare rule:
   -   Specifies the type of compare to use between the Comp reference value (which will be factor 1) and the Compare data (which will be factor 2). For example, if GT is specified, then the Comp reference value must be greater than the Compare data in order for this Capture Response Rule to be executed.
   -   EQ = equal, NE = not equal, GT = greater than, LT = less than, GE = greater than or equal, LE = less than or equal.

- **Capture length**: This is a protected field that shos the length specified for the captured data. The value will appear in Copy and Change mode. In Add (Create) mode, a value will be supplied if the F4=Prompt key is used to select a valid Capture ID and Sequence. Use this field as a reference when defining the Compare data.
- **Compare data lines 1-5; PagDown=6-24
  -   The compare data is used to match with the original capture data according to the compare rule. The compare data may be typed directly into this field. Use PageDown to show and update lines 6-24; lines 1-5 only appear on the main maintenance screen. Up to 1920 characters may be specified.
  -   If it should be desired to compare an entire 24 X 80 screen, that is, all 1920 characters, it would be possible to copy and paste the reference screen image (lines 1-5 separately from lines 6-24) into this field. However, keep in mind that only the displayable characters are compared. That is, field attributes such as color (and any EBCID character value less than X'40' ) will not be considered; a space character is used in place of non-display values.
  -   Special values may be typed into this field, instead of actual compare data:
  -   *ANY = No comparison will be performed. A command or group of commands associated with compare data value of *ANY will always be executed.
  -   *PARM = Reserved for the SCANSPLF command. This means that the compare data to be used is the same as the parameter value supplied with the SCANSPLF command, except that the Compare rules supplied with this response record will apply. If this value is used with an Operator Replay screen data capture, it has the same effect as *ANY.
  -   DynVar = This prompting value indicates that one or more Dynamic Variable tokens may be typed into the Compare data lines. DO NOT TYPE "DynVar" into the Compare data. Instead, type the Dynamic Variable token syntax, which by default looks like this: {dyn_var_name}
  -   One or more dynamic variables may be typed along with other actual compare data. When the response rule is qualified for execution, the dynamic variable value will be retrieved just before the comparison operation is performed. Keep in mind that the result of replacing a dynamic variable may be longer or shorter than the dynamic variable token. It is important to anticipate the exact length and content of the compare data line(s) as they will look after dynamic variable tokens are replaced. For more information about Dynamic  Variables, refer to [Job Dynamic Variables](../dynamic-variables/overview.md).

#### Functions

- **F3=Exit**: Return to the LSAM menu, or to the Screen Capture definition maintenance display.
- **F4=Prompt**: When the cursor is positioned in the Capture identifier or Capture sequence fields, a window appears for selecting from a list of available capture identifiers. The contents of the list depends on whether this display is being used for Operator Replay screen data capture, or for SCANSPLF report data capture.
- **F5=Refresh**: Reload the maintenance display with the original default values for Add, Copy or Change, discarding any new typed input.
- **F8=DynVar**: Open a window to select an available Dynamic Variable, for use with the Response Command, the Comp Reference Value or the Compare Data fields.
- **F9=Event cmds**: Presents a window from which OpCon event commands may be selected. After a command is selected, that command is prompted so that the final command format with parameter values may be automatically entered in the Response cmd field. The CPYTOMSGIN command also triggers a sub-menu window from which the appropriate OpCon command format syntax can be selected, and the syntax model can be updated after it is inserted into the Response cmd field.
- **F10=$Var**: When used in supported data entry fields, brings up a list of $-Special variables that are supported by the Operator Replay -- Screen data capture function.
- **F12=Cancel**: Return to the LSAM menu, or to the Screen Capture definition maintenance display.
- **F13=Full CMD**: Branch to a sub-display that uses the whole screen to show the entire available space for entering long command text strings. Any data entered on the short (part 1) command entry line will be carried forward for display on the full command entry screen. After returning from the full entry screen, the first 214 characters of the longer command will appear in the short (part 1) Response cmd field.
- **F24=More keys**: Change function key line to show additional supported keys.

## Using Dynamic Variables to Set an Operator Replay Token Variable

There may be times when the value of an LSAM Dynamic Variable should be used in fields of an Operator Replay Script step definition, where only Operator Replay token variables are supported. In that case, the Captured Data Response rules for Operator Replay screen capture definitions can be used to transfer the value of a Dynamic Variable to the Operator Replay token variable. The response command of the captured data response rule is one of the places where IBM i commands can be executed by the LSAM and have the LSAM interpret the value of a Dynamic Variable token.

The example screen format above for the Capture Response Rule shows an example of how the ADDRPYTOK command could be constructed with an embedded Dynamic Variable. This screen example also shows that the dynamic variable named DYNVAR1 would be updated by this same response rule. So the net effect of the example above is the same as if the Operator Replay token variable name (ORTOKEN) were entered in the capture response rule's Operator Replay variable name field. But the command syntax illustrated is what is important to this discussion. This command syntax would be useful if a different Dynamic Variable were actually being used in the command, such as a Dynamic Variable that might have been updated by a different job that executed before the Operator Replay script job.

### F10=$VAR Pop-up Window Values

Display format OPRR50R2 supports function key F10 for selecting $Variable tokens that can be inserted into various supported fields of the Captured Data Response Rules. These tokens do not require any special characters around them. Instead, they should be left inserted with the US dollar sign ($) at the beginning, all capital letters and spaces just where they are shown.

The Operator Replay Script driver program will recognize exactly spelled tokens and then replace them with the values shown in the following table; however, the values for OpCon properties, such as $SCHEDULE values, can only be replaced if the Script job was started by OpCon. They are not valid when Scripts are executed independently of OpCon, for example, if a Script is being executed in a test mode directly from a job started by the IBM i SBMJOB command, or if the STROPRRY command is executed from a user's interactive job command line.

- **$FREQUENCY NAME**:   The name of the OpCon Frequency assigned to the OpCon job that started the Script driver job (twhich is executing the Script (not the Job ID of the interactive workstation job),.
- **$IBM JOB ID**:       The full IBM i job ID for the job which is executing the Script (not the Job ID of the interactive workstation job), in the format of 123456/USER/NAME.
- **$IBM JOB NAME**:     The IBM i Job Name of the job which is executing the Script (not the Job ID of the interactive workstation job).
- **$IBM JOB NBR**:      The IBM i Job Number of the job which is executing the Script (not the Job ID of the interactive workstation job).
- **$IBM JOB USER**:     The IBM i User Profile that is part of the Job ID which is executing the Script (not the Job ID of the interactive workstation job).
- **$JOBID**:            The OpCon job identified, a 10-digit number, of the OpCon job that started the Script job.
- **$JOBID CMP**:        The OpCon job name and job identifier, joined into a single string with blanks compressed out, for the OpCon job that started the Script job.
- **$JOBID LONG**:       The OpCon job name, followed by the job identifier, with all blanks retained in the string, for the OpCon job that started the Script job.
- **$JOB NAME**:         The short format of the OpCon job name, for the job that started the Script job.
- **$JOB LONG NAME**:    The long format of the complete OpCon job name, for the job that started the Script job.
- **$MACHINE NAME**:     The OpCon name for the Agent (LSAM) machine in which the Script job is executing.
- **$SCHEDULE DATE**:    The date of the OpCon schedule under which the current job was started, in the (\*ISO0) format of CCYYMMDD.
- **$SCHEDULE NAME**:    The name of the OpCon schedule under which the current job was started.
- **$SCRIPT ID**:        The name of the Operator Replay Script. This combines with the $STEP SEQ\# to uniquely identify a Step record in the Agent's database table.
- **$SCRIPT USER**:      The name of the IBM i User Profile that was used to log into the green screen workstation session. Since this User name can be assigned from various sources, this variable is helpful for documenting this detail about the Script execution, and for finding jobs that were initiated by this User name.
- **$STEP SEQ\#**:       The unique number assigned to a Step master record from the Operator Replay Script. This combines with the $SCRIPT ID to uniquely identify a Step record in the Agent's database table.

## Display Captured Data Log

The function for displaying the captured data log is important as an auditing tool. This inquiry provides evidence of the data that was actually captured from either a display screen during an Operator Replay script execution, or from a report line during the use of the SCANSPLF command.

### OPRL40R1 - Display Captured Data Log

The same data capture response functions support both Screen data capture for Operator Replay and report data capture for the SCANSPLF utility command. Some of the following description includes information that is useful in distinguishing between the two different types of data capture. Each actual data capture definition and the captured data record are labeled by their Type field, where "C" = screen capture and "S" = spool file capture.

Refer to the topic on Events and Utilities menu, for more information about ways to use data capture and captured data response rules.

#### Menu Pathways

Main Menu > Operator replay menu (#4) > Display Captured Data log (#8).

#### Fields

- **Subset to Type**:   When this list display has been called directly from the menu, the LSAM menu passes a parameter to signal the program whether the call came from the Operator Replay menu (Type = Screen), or from the Events and Utilities Menu (Type = SCANSPLF). Function key F15 can be used to force a change to the Subtype, or to remove subsetting and show all Response rules of both types.
- **Search content**:    Type a value in this field and press <**Enter**> or <**F16**> to initiate a search for a record that has matching data anywhere in the record, including data that might not appear on the list display (but the matching data would appear in the display of the detail of the record). When <**F16**> is pressed a second time, the search continues from after the last matching record, using the same Search content data. Press <**Enter**> a second time (with no options typed), or press <**F5=Refresh**> to start a new search.
- **Opt**:               Type option from list displayed near the top of this screen. Refer to options definitions, below.
- **Capture ID**:        A label that groups together all of the data capture rules that apply to a single Operator Replay script step Sequence number. (This field is more important when data capture is used with the SCANSPLF command, and only serves Operator Replay screen capture as a useful means of labeling captured data when it appears in the captured data debug log file list, or when prompting for a Capture ID from Response Rules.)
- **Seq**:               The sequence of the data capture rule. This number determines the order in which data capture rules are executed. The effect of this sequence number is more noticeable when there are captured data response rules associated with each data capture definition, in that it imposes a high level of control over the sequence of response rules that might apply to a given screen format (or to a SCANSPLF spool file).
- **MM-DD-HH.MM**:       A portion of the time stamp of the log entry, showing the month, day, hours and minutes.
- **T**:                 Type: C = screen capture, S = SCANSPLF data capture.
- **Script/SPLF**:       The name of the Operator Replay Script, or the name of the spool file that was processed by the SCANSPLF command. The value shown here is defined by the value in the T (Type) field.
- **Number**:            For an Operator Replay Script, the Sequence number of the Step when the screen data was captured. For a spool file, the spool file number within the job where the spool file was found.
- **JobNbr**:            The IBM i Job Number of the job that executed the Operator Replay script or the SCANSPLF command. This number helps to distinguish among list entries that belong to the same, or to different jobs.

#### Functions

- **F3=Exit**: Return to the LSAM menu.
- **F5=Refresh**: Reload the list display with the latest data from the master file.
- **F12=Cancel**: Return to the LSAM menu.
- **F15=Subset**: Supports a change to the type of captured data entries appearing in the list. The Subset window offers a choice of Type C = screen capture response rules, or S = SCANSPLF data capture response rules.
- **F16=Search next**: When a search argument has been entered in the Search content field, pressing F16 can either start a new search (if the content value was changed) or it can continue a search to look for the next list entry that matches the search argument, starting with the first record after the last match found.
- **F17=Top**: Reposition the list display to show the first record in the list.
- **F18=Bottom**: Reposition the list display to show the last record in the list.
- **F24=More keys**: Change the function key line to show additional supported keys.

#### Options

- **5=Display**: To display record details, type 5 next to each record. Press <**Enter**> to proceed to the display details screen. Typing option 5 next to many or all records at once before pressing <**Enter**> is a convenient way to review all the definition details at once. Press <**Enter**> to advance as each detail screen is presented.
- **9=WRKJOB**: Calls the IBM i Work with Job function for the job number that appears in the list. This function can help find output produced by a captured data response rule, or it can help find the spool file that was scanned by the SCANSPLF command.

## Display Captured Data Log Detail

### OPRL40R5 - Display Captured Data Log Detail

#### Menu Pathways

Main Menu > Operator replay menu (#4) > Display Captured Data log (#8) > option 5=Display.

#### Fields
- **Log record RRN**: The relative record number of this record in physical file OPRLOGF40
- **Type**:  
   -   C = Operator Replay screen data capture
   -   S = SCANSPLF report spool file scanning
   -   M = Message data capture
- **Capture ID**: The identifier assigned to a group of data capture rules. For Operator Replay screen data capture, this label is in addition to the Script Name and Sequence number.
- **(Capture) Seq**: The sequence number assigned to the data capture definition, representing the order of capture within the Capture ID.
- **Scrn Row**: For screen data capture, this is the row where the data capture operation started.
- **Col(-umn)**: The column within the Row (above) where the data capture started.
- **Length**: The length of data that was captured, starting at the Row and Col specified. For Operator Replay screen data, up to 1920 characters of displayable data may be captured by a single capture rule. (For display formats larger than 24 X 80, more than one screen capture rule would be required to capture more than 1920 characters of data.)
- **Capture Job ID**: The IBM i full job name that made the Captured Data log entry. This is the job that will be shown if the function key F9=WRKJOB is pressed.
- **Date**: The log file entry date, in CCYYMMDD format. Used to purge the log file, based on the LSAM log file retention days (refer to LSAM Parameters).
- **Time stamp**: The IBM i system time when the log entry was written. 
- **Script Name**: The Operator Replay Script name that triggered this data capture.
- **Step number**: The Sequence number of the Operator Replay script step being executed when the data  was captured.
- **Numeric**: Y = yes, N = No: Indicates whether numeric data compression was specified for the captured data.
- **Rows 1-12 Rows 13-24 2..5...10....5...20**: The row and columns of the capture data are labeled. Press PageDown or PageUp to toggle between the display of rows 1-12 and 13-24. Either eye vision, or manipulation of the cursor may be used to help identify the exact column for each character of captured data, based on the numbered ruler line just above the first line of captured data. The ruler starts with number 2 and ends with number 78 (due to 5250 workstation display constraints), however, the actual captured data occupies columns 1 to 80 on the lines below the ruler. Thus, workstations that display the column location of the cursor should match the character location in the ruler line.

#### Functions

- **PageDown/Up**: Use the PageDown and PageUp function keys to toggle the display of captured data between lines 1-12 and 13-24.
- **F3=Exit**: Return to the LSAM menu.
- **F9=WRKJOB**: Branch to the IBM i Work with job menu, to display detailed information about the IBM i Job ID named in the display panel.
- **F12=Cancel**: Return to the list of log entries.

## Display Data Capture Debug Log

The function is not documented in detail because it is meant for use by trained analysts or programmers already familiar with the operation of the Capture Data and Capture Response Rules programs. The log entries that may be observed in this display may seem apparent to users familiar with data capture and response.

LSAM menu 3. Events and Utilities Menu, contains option 7. LSAM Utility configuration, where a flag may be set to turn on debug logging for all of the LSAM data capture and captured data response actions. This debug logging supports both Operator Replay screen data capture as well as the SCANSPLF command. The debug log entries would prove exactly when the system captured data, when it processed Dynamic Variables and which response rules were executed.

The debugging feature could be turned off for better performance in systems that do not require extensive audit logging or debugging of any  problems. On the other hand, debug logging should be turned on when extensive system audit support is required, because the debug log provides detailed evidence of all automated operations.

If technical support is needed for apparent problems with either capturing data or executing response rules, turn on the debug function in LSAM menu 3, function 7. After attempting execution of the Operator Replay script, or the SCANSPLF command that is causing trouble, use the SMASUP log file extract command to retrieve the debug log information and send the resulting save file from library SMALOG to SMA Support for assistance. For more information about how to use the SMASUP command,
refer to [Extracting Log and Master Files](../logs-database/extracting.md).

Following is a table of Entry_Code values that may be observed in the list of debug log entries. These entry labels help to identify the action that was performed and/or the result of data capture and captured data response rules. Some of the codes reflect a failure in which case the log entry will appear red in color.

### Entry_Code Values Appearing in Captured Data Debug Log Viewer

#### Entry_Code
  **SCANSPLF command log entries**
- **SCANSPLFST**: The SCANSPLF command has started its function.
- **SCAN_PARMS**: The PARAMETERS keyword value string sent to the program by the SCANSPLF command.
- **SCANSPLF_E**: A fatal error was encountered and the SCANSPLF command has not completed its function. Refer to the log entry detail for a status code and more information about the reason for the failure.
- **SCAN_PASS**:  A successful match of all required scan values; the SCANSPLF command ends normally.
- **SCAN_FAIL**:  Not all required scan values were matched; the SCANSPLF ends abnormally and, if started by OpCon/xps, a list of mismatched values is sent to the OpCon/xps job information.
- **SCAN_NOMCH**: A log entry showing one of the required scan values that was not matched in the report.
- **SCANSPLFEN**: Marks the end of the SCANSPLF command. A final completion status code may be found in the details of this log entry.
- **SCAN_ABEND**: The SCANSPLF command processor failed before completing all scans. The abnormal termination code is found in the log entry details.
- **PARM_COUNT**: A log entry indicating the number of scan values found in the input parameter after parsing the PARAMETERS keyword value of the SCANSPLF command. This entry may show that no input scan values were submitted, but that the program will continue to use any registered scan values found in the SPLF Scan Rules table.
- **PARSE_PARM**: A log entry showing how the results after scanning the PARAMETERS keyword value of input scan values. The details entry shows the contents of the array where the input scan values are divided into even-spaced locations.
- **SCAN_BYPAS**: A scan value bypass rule registered in the SPLF Scan Rules table was found and recognized. This scan value will be marked as matched, even though bypassed.
- **SCANSPLF_J**: A log entry showing information about the actual job selected while searching for the target spool file.
- **SCANSPLF_F**: A log entry showing information about the actual spool file (report) found for scanning.
- **SCAN_LOG**: A program debug entry providing non-critical, general information about conditions detected by the SCANSPLFR program. Refer to the entry details for more information.
- **SCAN_MATCH**: A log entry registering a matched scan value.
- **SCAN_LBLNO**: An indicated scan label was found, but the associated value after the label did not match the supplied scan reference value.

  **Operator Replay script entries for data capture operations**
- **CAPTDATA**: A log entry recording the data captured from a screen image.
- **CAPTERR**: A log entry reporting a program error code encountered while attempting to capture screen data. Refer to the log entry details for the exact error message that was trapped.

  **Message Data entries for data capture operations**
- **M_MSG_BUF**:  The log entry shows the message data buffer used for data capture. The buffer may contain only the primary message text, only the secondary (Help) message text, or both text types concatenated with one space character between them.
- **M_CAPTURE**:  The log entry shows the portion of data that was captured from the message text buffer. This data would be referred to, for example, when the special value of *CAPT is used in a Captured Data Response Rule.
- **M_CAPTRSPE**: An error occurred during the attempt to process Captured Data Response Rules after some Message Data was captured.
- **M_DYNV_ERR**: A Dynamic Variable token could not be replaced during the processing of Message Data capture.
- **M_DYNV_PRE**: During Message Data capture, the string that contains a Dynamic Variable token before the token is replaced. This is the string that contains an optional Scan Label that will be used to identify the message data desired for capture.
- **M_DYNV_RPL**: During Message Data capture, the string value after a Dynamic Variable token was replaced.

  **Common entries for Captured Data Response Rule processing**
- **RESPCMD0**: Documents the original response command string from the rules record, before processing any embedded variables.
- **RESPCMD1**: Documents the response command string after any Dynamic Variables were replaced.
- **RESPDATA**: The log entry details show the profile of the Captured Data Response Rule that was processed successfully. The details also include the final form of the response command, including resolution of any variable values.
- **RESPERR**: The captured data response rule processor module is reporting an error encountered during processing. The response rule was probably not completed. Refer to the log entry for details about the error. The details also include a profile of the Captured Data Response Rule that was being processed.
- **ADDRPYTOK**:  Log of the command that sets an Operator Replay Token variable value, based on that field in the Response Rule record.
- **OVARERR**: Documents an error that occurred when the ADDRPYTOK command was executed.
- **SETDYNVAR**:  Log of the command that sets a Dynamic Variable value, based on that field in the Response Rule record.
- **DVARERR**: Documents an error that occurred when the SETDYNVAR command was executed.
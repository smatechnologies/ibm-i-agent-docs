---
sidebar_label: 'Maintain Dynamic Variables'
---

# Maintain Dynamic Variables

Explanations of how Dynamic Variables may be used are offered above. There are also references to using Dynamic Variables within the description of many of the LSAM functions documented in other topics.

The fields available in the menu function are mostly the same as the fields available for use in the SETDYNVAR command (documented above, in this topic).

### LSAVARR1 - Work with Dynamic Variables

#### Menu Pathways

Main Menu > Events and Utilities (#3) > Maintain dynamic variables (#6)

Many of the LSAM menus support access to this function, since it is used everywhere among the Agent automation tools.

This list display supports three variations:
- (F9) = Master records: The initial display format
- (F7) = Schedule instance history records
- (F8) = Job instance history records

#### Options

- **2=Change**: Select a record for update. Press <**Enter**> to continue to the individual record maintenance screen.
- **3=Copy**: Select a record to copy into a new dynamic variable. Press <**Enter**> to continue to the Copy record screen where all the record fields, including the key values, may be updated, starting with the values from the original record.
- **4=Delete**: Select a dynamic variable to be added to a pending list of records to be deleted. When <**Enter**> is pressed, all records select with option 4 will appear on a confirmation list before records are actually deleted.
- **5=Display**: View the details of a dynamic variable.
- **6-DSPDYNVAR(V)**: Option 6 executes the LSAM testing command called DSPDYNVAR (display dynamic variable value). This option only works on Dynamic Variables of type V; it cannot be used on variables of type L. The current value of the Dynamic Variable appears in a completion message at the bottom of the screen, along with the date of last update; or it might be displayed using a full-screen format, depending on the setting within the LSAM Utility Configuration (LSAM menu 3, option 7). The value is formatted according to the current rules, making this a useful way to prove that the master record formatting options are producing the desired result.
- **8=Export**: Available only from the main, master records list, this option initiates adding one or more Dynamic Variable master definitions (and any accompanying auxiliary records) to a batch of data that can be exported to another instance of the LSAM software that is at the same database level (DBLVL).

#### Fields
- **Subset**: When function key F2 has been used to create a subset list (per IBM i Job ID, or per the Schedule Name field), this field appears on line 3 of the display to show the subset keys that currently control the list content.
- **Search content**: Type in a value that can be found anywhere in the record represented by each line on the list. The entire record will be searched, not just the fields displayed in the list. Use option 5=Display to see the matching detail that satisfied the search when the cursor appears in the Opt field next to a line on the display. The <**Enter**> key or <**F16**> may be used to start a search, and <**F16**> is used to continue the search from the last record found.
- **Variable Name**:  The key identifier of each record. For records of type L, this name must be the Captured Job ID or the Job Name of a tracked or queued job. For records of type V, this may be any meaningful name that will be used to create a token ID. Job names are limited to 10 characters (which limits the Captured Job ID used as a variable name), but a variable names can use up to the 12 characters allowed for this field.
- **Seq**: This record sequence number should be zeros for records of type V because it has no meaning for this record type. For records of type L, this sequence number is used to create unique records keys when there is more than one dynamic variable assigned to the same Variable Name (there may be multiple updates specified for the LDA content of a single job).
- **T (Type)**: The record type is L for a dynamic variable that will be used to update the LDA content of a job. Type V records are dynamic variable tokens that can be inserted into job parameters or the job's call command line.
- **MI**: This column shows a value only for the Instance History views, while the master records leave this value blank.  The MI column shows the two letters that identify the instance type of history records appearing in the alternate list views.
- **Nu**: Numeric indicator.  Value "C" indicates the variable value is Character, meaning it can support any character string.  Value "N" indicates the variable value is Numeric, meaning it can only store actual digits (0 - 9), except that it is valid to have one or more Dynamic Variable {TOKENS} in the Value field since variable nesting is supported.
- **ValCalPgm**: The Value Calculator (first of two fields) shows either a user-defined value calculator program name, or it shows one of the built-in Function Codes that the Agent can use to fetch or format a variable value at run time.

##### Master Record List fields
- **Description**: Any text used to describe the dynamic variable. This text is useful mostly for this list of variables, so that each can be easily identified. When the command SETDYNVAR is used to add a new dynamic variable automatically during some automated process, the Description will be the IBM i job ID (number/user/name) of the job that executed the SETDYNVAR command...unless the DESC( ) parameter is included within the command string.

##### Schedule Instance List fields
- **Schedule Date**: For the SI. instances, this column shows the OpCon Schedule Date value.
- **Schedule Name**: For the SI. instances, this column shows part of the OpCon Schedule name.  For IU. instances, the Schedule Name field is used to store the IBM i Job ID of the instance anchor job, in which case this column shows the Job Name, User Name and part of the IBM i Job Number value.

##### Job Instance List fields
- **JobNbr**: The IBM i Job Number
- **Job User**: The IBM i Job User
- **Job Name**: The IBM i Job Name


#### Functions

- **F2=Subset**: Shows a list (LSAVARR5) that enables selecting a variable profile by Job or Schedule category, resulting in a list of instance variables pertaining to only one Job or only one Schedule.
- **F3=Exit**: Quits list the display and returns to the menu.
- **F5=Refresh**: Reload the list display with data from the master file.
- **F6=Add**: Branches to the display where a new dynamic variable master record is defined.
- **F7=Sched Inst**: Switch the list to show instance history records at the Schedule level.  This list will include instance types of SI. (OpCon Schedule Instance) or IU. (IBM i Unit of Work, which instance uses the Schedule field to store the IBM i Job ID of the Unit's anchor job as the primary key for all jobs connected with the same Unit of Work).
- **F8=Job Inst**: Switch the list to show instance history records at the Job level.  This list will include instance types of JI. (OpCon Job) and IJ. (IBM i Job).
- **F9=Master recs**: Switches the list back to show only master records, returning from either instance history list.
- **F11=Alt view**: Available only from the instance history lists, this key changes the columns of data displayed for the list entries, showing different sort orders.  The column headings turn to pink with an underline to indicate which data is being used to control the sorted order of the list.
- **F12=Cancel**: Quits the current list display.  From instance history lists, the display returns to the master records list.  From the master records list the display exits to the LSAM menu that launched this program.
- **F16=Search next**: Press to start a new search based on the value entered in the Search input field, or to continue a search from the last record found.
- **F17=Top**: Causes the list to display from the first record. The list is sorted in order of the Variable Name and Sequence within name.
- **F18=Bottom**: Causes the list to display the last record in the file.
- **F24=More keys**: Rotates the function key legend at line 23 to show more function keys supported by the current list on display.

## F6 = Add (Create) Dynamic Variable

### LSAVARR2 - Create Dynamic Variable

#### Menu Pathways

Main Menu > Events and Utilities menu (#3) > Maintain dynamic variables (#6) > F6=Add

#### Fields

The variable name cannot be changed when the screen format is shown in Change mode, but the sequence number may be changed. The original sequence number shows at the top of the Change screen, and a new value may be specified in the Sequence number input field on the first line of record details.

| Field          | Values         | Default        | Description    |
| -----          | ------         | -------        | -----------    |
| Variable name  | Any characters |                | The key identifier of each record. For records of type L, this name must be the Captured Job ID or the Job Name of a tracked or queued job. For records of type V, this may be any meaningful name that will be used to create a token ID. Job names are limited to 10 characters, but a Captured Job ID or token ID can use up to the 12 characters allowed for this field.|
| Sequence number | 000 -- 999     | 000            | This record sequence number should be zeros for records of type V because it has no meaning for this record type. For records of type L, this sequence number is used to created unique records keys when there is more than one dynamic variable assigned to the same Variable Name (there may be multiple updates specified for the LDA content of a single job).  |
| Variable type  | L, V           | V              | The record type is L for a dynamic variable that will be used to update the LDA content of a job. Type V records are dynamic variable tokens that can be inserted into job parameters or the job's call command line.|
| Description    | Any printable character text | IBM i job ID, when the SETDYNVAR command was used and the DESC keyword is not specified. | IBM i job ID, when the SETDYNVAR command was used and the DESC keyword is not specified.  | 
| LDA pos start (start position in LDA)  | 0 -- 1024      | 0000           | Required for record type L, not valid for type V. This number specifies the cardinal position (1-1024) where substitution of the dynamic variable's value will begin in the image of the local data area (LDA) content for a job.   |
| LDA pos length (Length of LDA update) | 0 -- 1024      | 0000           | Required for record type L, not valid for type V. This number specifies how many characters in the LDA content image will be updated by the value of the dynamic variable. If the supplied variable value is longer than this length, the value will be truncated to this length. If the value is shorter than this length, the remaining length will be padded with space characters (blanks).   |
| Char trim start (start position in LDA)  | 0 -- 1024      | 0000           | This number specifies the cardinal position (1-1024) where substitution of the dynamic variable's value will begin in the value returned to replace the token. If this value is zero, then the start position will be the first non-blank character in the stored or calculated value string.  A non-zero start value would include any leading space characters that are part of the stored or calculated value string, so that the leading spaces would be inserted where the token is replaced.|
| Char trim length (Length of LDA update) | 0 -- 1024      | 0000           | This number specifies how many characters from the stored or calculated value will be returned to replace the token. If this value is zero, then the length of the returned value will be through the last non-blank of the stored or calculated value character string.  If the non-zero length is greater than the actual value character string, the remaining positions of the returned value will be space characters that will be included in the target position where the token is replaced.  |
|                    |                |                | **Note**: Use F1=Help from a display of a Dynamic Variable master record (or a variable maintenance display) to see detailed examples of combinations of Character Trim Start/Length values and how they can be used to include or eliminate space characters from before or after non-blank characters of the value string. |
| Value calc program/Fn Code | A valid IBM i program name, or ... | Blanks         |    The name of an optional IBM i program supplied by the user that will calculate the dynamic variable's value at the moment just before the actual substitution will take place. The LSAM supports any length character string up to 1024 characters in length. The content of this character string is not limited, since a local data area may contain any hexadecimal value in any position. |
| |One of the supported Function Codes | | Instead of a user-defined program, one of the displayed Function Codes can be typed into this field.  Details about each Function Code, including identification of when the "LIB" input field would be used to send parameters to the function codes, can be found in [Dynamic Variable Function Codes](./function-codes.md#what-is-a-function-code-for-lsam-dynamic-variables). |
|                    |                |                | **Note**: The LSAM passes the current value of the variable to the program, but uses whatever value is returned by the program to replace a variable token at run time. There is also a second parameter of 12 characters passed to the program that contains the Variable Name. |
| Value calc Lib | A valid IBM i library name  | Blanks         | The DB2/400 (DB2 UDB) library name where the userdefined value calculate program is found. |
|                    | OR: Function Code secondary parameter value |               | For **Function Codes** this field may require a parameter value to support the Agent's value fetch or formatting function.  Currently, only the Function Code of **\*SYSVAL** uses this field to specify the name of the IBM i System Value that should be retrieved and returned as the variable value at run time. |
| Value type  | C, N           | C              | This field controls whether the variable is constrained to digits-only for type 'N' = Numeric, or whether any general character string may be stored for type 'C' = Character.|
| Current/default value | Any keyboard character | Blanks         | To specify a fixed value for a dynamic variable, when a value calculate program is not being used, type in the value. If the required value cannot be typed on a workstation keyboard, then a value calculate program must be used to supply the value at run time. If a value calculate program is specified, but the program cannot be found at run time, then any value specified in this field will be used as the default. However, if a value calculate program is found, and the program returns blanks, then blanks will be used for the variable value. For type V tokens, a blank value will cause the token to be removed from the string where it was found and the string will be compressed to remove as many spaces as were occupied by the token. For type L variables, a final result of blanks for the variable will cause the LDA to be updated with space characters in the specified location/length. |
| Time of last update | IBM i time stamp | Program defined | Either the time when the add/change/copy function was completed for this record, or the last time the record was updated by the SETDYNVAR command. |

#### Functions

- **F1=Help**: The Help text display provides documentation (similar to this document) that explains how to use the data entry/display fields that define the Dynamic Variable master (or instance history) record.
- **F3=Exit**: Quits the display and returns to the menu.
- **F4=Prompt**: F4 causes a window of possible values for the Variable Name to be displayed. The list of values is derived from the master file of LDA Content, and each unique LDA Key value is included in the window list. The LDA Key values are the Captured Job IDs. This list is offered as a convenience to make it easy to match type L dynamic variables to any existing captured job's LDA content.
- **F5=Refresh**: Reload the with data from the master file.
- **F12=Cancel**: Quits the display without update (unless an update was already completed by a prior <**Enter**> key) and returns to the previous screen.
- **F13=More data**: The prompt for "**+ (F13)**" indicates that the data entry field can support up to 1024 characters of information, which will not all fit on the initial data entry screen.  When there is more data stored than will fit in the display format LSAVARR2, the Current Value field will be protected from data entry and the F13 function key must be used to work with the entire 1024 bytes of Value.

### F4=Prompt (Select LDA image key)

#### Select LDA Image Key
```
       Select LDA image key
Type line number of LDA image key.
Press Enter to select value.

 LINE#  LDA KEY
     1  CAPTEST06
     2  QUETEST01
     3  TESTCAP05

                        Bottom
Line number:         0
F12=Cancel
```
#### Menu Pathways

Main Menu > Job track menu (#1) > Maintain dynamic variables (#6) > F6=Add > F4=Prompt

#### Fields

| Field         | Values        | Description |
| -----         | ------        | ----------- |
| Line#         | 1 - 9999      | An artificially generated line number that is entered into the line number input field at the bottom of the window in order to specify which LDA Key value should be returned to the calling screen. |
| LDA KEY       |               | A list of all the unique Captured Job ID values found in the LDA Content master file that has been loaded by one or more job captured processes. This is the key value that must match between a type L dynamic variable and the LDA content master record in order for type L dynamic variables to be useful. |
| Line number   | 1 - maximum list value | Type the Line# of the desired LDA KEY value to be returned to the calling screen. |

#### Functions

- **F12=Cancel**: Quits the display without selecting a value and returns to the previous screen.

### LSAVARR3 - Create/Change/Copy/Display Numeric Field Edits

#### Menu Pathways

Main Menu > Events and Utilities menu (#3) > Maintain dynamic variables (#6) > F6=Add, or options 2, 3, 5 > Set primary display Value Type to 'N' = Numeric and press Enter to view display format LSAVARR3.  (The R3 format is not shown for Character Value Types.)

#### Fields

| Field          | Values         | Default        | Description    |
| -----          | ------         | -------        | -----------    |
| Numeric field size | 0 - 63         | 0              | A non-zero value in this field designates that the dynamic variable will always be handled as a numeric field, capable of numeric operations and also optionally subject to numeric edit codes to prepare the value for output when it is requested. |
| Numeric field dec | 0 - 63         | 0              | A non-zero value in this field specifies the number of digits (included in the total size value, above) that are handled as right of the decimal point, that is, part of the numeric value that is less than 1, such as tenths, hundredths, etc. This field only applies if the size field is also not zero. The number of decimals cannot exceed the total
numeric field size.  |
| Decimal point symbol | any            | . (period)     | When a numeric value is defined with 1 or more decimal places, this symbol will be inserted into the string of numbers from the current value of the dynamic variable. In some countries a comma (,) might be expected to indicate the start of decimal positions.  |
| Grouping separator; Character edit | any            | , (comma)      | FOR NUMERIC VARIABLES: The symbol used to separate whole  numbers into groups of 3 digits each. A value of 'B' means there will be no grouping of the whole number digits. |
|                                    |                |                | FOR CHARACTER VARIABLES: The following values can be used to escape or replace single quotes or commas contained in the variable value: **C** = replace any comma (,) X'6B' with a space (X'40'), **Q** =  replace any single quote (') X'7D' with a space (X'40'), **D** = replace both a comma and a single quote with a space, **E** = escape a single quote by inserting an extra single quote or **F** = replace comma with space AND escape a single quote by doubling |
|Suppress leading zeros | 0, 1           | 0              | - 0=no (default value) |
|                       |                |                | - 1=yes                |
|                       |                |                | - When this field is set to zero or is left blank, all the size positions of the full numeric size will be filled with zeros at positions higher than the greatest significant digit, such as: 00345.67                |
|                       |                |                | - When the value is 1, this same example value would be returned left-adjusted and without leading zeros, as: 345.67                |
| Negative value symbol | any            | B (= none)     | If this field is not blank or set to the special value of 'B', then the characters typed into this field will be inserted into the value that is returned whenever the dynamic variable value is requested, and the numeric value is negative. The location of these characters is controlled by the next two fields. |
| Negative symbol position (location) | B = before,    | B              | When characters are specified for the negative value symbol,  this field indicates whether the negative symbol should appear before or after the string of numbers. |
| Negative symbol position (relative distance) | 1 - 9          | 1              | When characters are specified for the negative value symbol, this field indicates how far the negative symbol should be from the first (before) or last (after) digit in the number. A value of 1 means that the symbol will appear immediately next to the number.  |
| Positive value symbol | any            | B (= none)     | If this field is not blank or set to the special value of 'B', then the characters typed into this field will be inserted into the value that is returned whenever the dynamic variable value is requested, and the numeric value is positive. The location of these characters is controlled by the next two fields. |
| Positive symbol position (location) | B = before,    | B              | When characters are specified for the positive value symbol,  this field indicates whether the positive symbol should appear before or after the string of numbers. |
| Positive symbol position (relative distance) | 1 - 9          | 1              | When characters are specified for the positive value symbol, this field indicates how far the positive symbol should be from the first (before) or last (after) digit in the number. A value of 1 means that the symbol will appear immediately next to the number.  |
| Currency symbol | any            | $             | For numeric variables, a non-blank value in this field will be inserted before the edited number in a position specified by the next two fields. This currency symbol would appear before any negative or positive symbol, if that other symbol were specified to appear before the number itself. |
| Currency symbol position (reference point) | F, (.)    | F     | When a currency symbol is specified for a numeric variable, this field indicates how the relative distance (in the next field) will be computed:  |
|                                    |                |    | - F = float: The currency symbol will be positioned relative to the highest significant digit (or relative to the highest zero-fill character, if leading zeros are not suppressed). |
|                                    |                |    | - (.) = fixed: A period character indicates that the currency symbol should appear a fixed number of positions to the left of the decimal point. If the number of digits returned for a value is greater than this distance, the currency symbol will appear immediately next to the left-most digit of the number. The fixed position is useful when comparing a dynamic variable numeric value to a string that was extracted from a printed report where the currency symbol always appears in a fixed column of the report line. |
| Currency symbol position (relative distance) | 1 - 99         | 1              | Combined with the reference point specified above, this value determines the number of positions to the left of the number string where the currency symbol will appear. A value of 1 means that the currency symbol will appear immediately to the left of the left-most digit (or other character,  if a positive/negative sign is used) in the numeric string.  |

#### Functions

- **F1=Help**: The Help text display provides documentation (similar to this document) that explains how to use the data entry/display fields that define the Dynamic Variable master (or instance history) record.
- **F3=Exit**: Quits the display and returns to the menu.
- **F5=Refresh**: Reload the with data from the master file.
- **F12=PageUp**: Returns (without update) to the master record display.
- **Enter=Update**: Pressing the Enter key on the R3 display format will complete the data entry for Add, Copy and Change functions, unless a value calculator Function Code was registered on the R2 master record display format - in which case the Enter key advances the display to the R6, R7 or R8 display format, according to the Function Code selected.

## Option 2 = Change Dynamic Variable

### LSAVARR2 - Change Dynamic Variable

#### Menu Pathways

- Main Menu > Job track menu (#1) > Maintain dynamic variables (#6) > 2=Change
- Main Menu > Events and Utilities menu (#3) > Maintain dynamic variables (#6) > 2=Change

#### Fields

- Refer to field description table for option F6=Add, above.
- The variable name cannot be changed, but the sequence number may be changed. The original sequence number shows at the top of the Change screen, and a new value may be specified in the Sequence number input field on the first line of record details. (Note: Sequence numbers are only useful for variables of type L, where there may be more than one variable assigned to the same job name that is stored in the Variable Name field.)

#### Functions

- **F3=Exit**: Quits the display and returns to the menu.
- **F5=Refresh**: Reload the with data from the master file.
- **F12=Cancel**: Quits the display without update (unless an update was already completed by a prior <**Enter**> key) and returns to the previous screen.

## Option 3 = Copy Dynamic Variable

### LSAVARR2 - Copy Dynamic Variable

#### Menu Pathways

- Main Menu > Job track menu (#1) > Maintain dynamic variables (#6) > 3=Copy
- Main Menu > Events and Utilities menu (#3) > Maintain dynamic variables (#6) > 3=Copy

#### Fields

- Refer to field description table for option F6=Add, above.
- When copying a record, the source record Variable Name and Sequence Number are displayed under the screen heading. New values must be specified for both fields in the "To:" input fields under the headings, except that type L dynamic variables may use the same Variable Name as long as a new sequence number is assigned.

#### Functions

- **F3=Exit**: Quits the display and returns to the menu.
- **F4=Prompt**: F4 causes a window of possible values for the Variable Name to be displayed. The list of values is derived from the master file of LDA Content, and each unique LDA Key value is included in the window list. The LDA Key values are the Captured Job IDs. This list is offered as a convenience to make it easy to match type L dynamic variables to any existing captured job's LDA content. (Refer to example of prompt window above, under F6=Add.)
- **F5=Refresh**: Reload the with data from the master file.
- **F12=Cancel**: Quits the display without update (unless an update was already completed by a prior <**Enter**> key) and returns to the previous screen.

## Option 5 = Display Dynamic Variable Detail

### LSAVARR2 - Display Dynamic Variable

#### Menu Pathways

- Main Menu > Job track menu (#1) > Maintain dynamic variables (#6) > 5=Display
- Main Menu > Events and Utilities menu (#3) > Maintain dynamic variables (#6) > 5=Display

#### Fields

- Refer to field description table for option F6=Add, above.

#### Functions

- **F3=Exit**: Quits the display and returns to the menu.
- **F5=Refresh**: Reload the with data from the master file.
- **F12=Cancel**: Quits the display without update (unless an update was already completed by a prior <**Enter**> key) and returns to the previous screen.
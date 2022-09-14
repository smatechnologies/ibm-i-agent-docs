---
sidebar_label: 'Maintain Dynamic Variables'
---

# Maintain Dynamic Variables

Explanations of how Dynamic Variables may be used are offered above. There are also references to using Dynamic Variables within the description of many of the LSAM functions documented in other topics.

The fields available in the menu function are mostly the same as the fields available for use in the SETDYNVAR command (documented above, in this topic).

### LSAVARR1 - Work with Dynamic Variables

#### Menu Pathways

Main Menu > Events and Utilities (#3) > Maintain dynamic variables (#6)

> Many of the LSAM menus support access to this function, since it is used everywhere among the Agent automation tools.

This list display supports three variations:  
> (F9) = Master records: The initial display format  
> (F7) = Schedule instance history records  
> (F8) = Job instance history records  

#### Options

- **2=Change**: Select a record for update. Press <**Enter**> to continue to the individual record maintenance screen.
- **3=Copy**: Select a record to copy into a new dynamic variable. Press <**Enter**> to continue to the Copy record screen where all the record fields, including the key values, may be updated, starting with the values from the original record.
- **4=Delete**: Select a dynamic variable to be added to a pending list of records to be deleted. When <**Enter**> is pressed, all records select with option 4 will appear on a confirmation list before records are actually deleted.
- **5=Display**: View the details of a dynamic variable.
- **6-DSPDYNVAR(V)**: Option 6 executes the LSAM testing command called DSPDYNVAR (display dynamic variable value). This option only works on Dynamic Variables of type V; it cannot be used on variables of type L. The current value of the Dynamic Variable appears in a completion message at the bottom of the screen, along with the date of last update; or it might be displayed using a full-screen format, depending on the setting within the LSAM Utility Configuration (LSAM menu 3, option 7). The value is formatted according to the current rules, making this a useful way to prove that the master record formatting options are producing the desired result.
- **8=Export**: Available only from the main, master records list, this option initiates adding one or more Dynamic Variable master definitions (and any accompanying auxiliary records) to a batch of data that can be exported to another instance of the LSAM software that is at the same database level (DBLVL).

#### Fields - common to all list formats
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

> Many of the LSAM menus support access to this function, since it is used everywhere among the Agent automation tools.

#### Fields

The variable name cannot be changed when the screen format is shown in Change mode, but the sequence number may be changed. The original sequence number shows at the top of the Change screen, and a new value may be specified in the Sequence number input field on the first line of record details.

| Field          | Values         | Default        | Description    |
| -----          | ------         | -------        | -----------    |
| Variable name  | Any characters |                | The key identifier of each record. For records of type L, this name must be the Captured Job ID or the Job Name of a tracked or queued job. For records of type V, this may be any meaningful name that will be used to create a token ID. Job names are limited to 10 characters, but a Captured Job ID or token ID can use up to the 12 characters allowed for this field.|
| Sequence number | 000 -- 999     | 000            | This record sequence number should be zeros for records of type V because it has no meaning for this record type. For records of type L, this sequence number is used to created unique records keys when there is more than one dynamic variable assigned to the same Variable Name (there may be multiple updates specified for the LDA content of a single job). A sequence number can be altered while the display is in option 2=Change mode, as long as no other Type L variable of the same Name is using the new sequence number.  (Changing the sequence of Type L variable records for a given Name might require careful strategy in adjusting more than one Sequence record of that same Variable Name.)  |
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

Main Menu > Events and Utilities (#3) > Maintain dynamic variables (#6) > F6=Add > F4=Prompt

> Many of the LSAM menus support access to this function, since it is used everywhere among the Agent automation tools.

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

Main Menu > Events and Utilities menu (#3) > Maintain dynamic variables (#6) > F6=Add, or options 2, 3, 5:

- Set primary display Value Type to 'N' = Numeric and press Enter to view display format LSAVARR3.  (The R3 format is not shown for Character Value Types.)

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

- Main Menu > Events and Utilities menu (#3) > Maintain dynamic variables (#6) > 2=Change

> Many of the LSAM menus support access to this function, since it is used everywhere among the Agent automation tools.

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

- Main Menu > Events and Utilities menu (#3) > Maintain dynamic variables (#6) > 3=Copy

> Many of the LSAM menus support access to this function, since it is used everywhere among the Agent automation tools.

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

- Main Menu > Events and Utilities menu (#3) > Maintain dynamic variables (#6) > 5=Display

> Many of the LSAM menus support access to this function, since it is used everywhere among the Agent automation tools.

#### Fields

- Refer to field description table for option F6=Add, above.

#### Functions

- **F3=Exit**: Quits the display and returns to the menu.
- **F5=Refresh**: Reload the with data from the master file.
- **F12=Cancel**: Quits the display without update (unless an update was already completed by a prior <**Enter**> key) and returns to the previous screen.
- **F15**: From the Display format (R5) of Instance History records (only), F15 shows a profile of the multi-instance variable key structure.  (See details about display format LSAVARR5W, next.) 

## F15 = Multi-Instance History Record Keys

### LSAVARR5W - Multi-Instance Keys

#### Menu Pathways

- Main Menu > Events and Utilities menu (#3) > Maintain dynamic variables (#6) > 5=Display

> Many of the LSAM menus support access to this function, since it is used everywhere among the Agent automation tools.

#### Fields

- **IBM i Job ID**: Shows the NAME/USER/NUMBER IBM i Job ID for the variable instance IJ.
- **Date, Time**:  These are additional IBM i Job ID key fields that the LSAM uses to distinguish between duplicate IBM i Job IDs.  (Full support for the Job Entry Date and Time is scheduled to be introduced in the next LSAM version.)
- **Schedule Date**: The OpCon server's Schedule Date, displayed for SI. and JI. instances.
- **Schedule Name/Anchor Job ID**:  For instances SI. and JI., this shows the OpCon Schedule Name.  For instance IU., the Schedule Name field has been reallocated to store the full IBM i Job ID (plus Job Entry Data and Time when available) to serve as the anchor of the LSAM-contrived Unit of Work (jobs that are associated because one job submits another, possibly as part of a series of job submissions).
- **SAM Long Name**: The OpCon Long Job Name, used by the JI. instance.
- **SAM Job Number**:  The OpCon 10-digit internal job number, used by the JI. instance.
- **Inst template**:  The complete multi-instance Dynamic Variable qualifying key assembly is shown in a model, so that the actual Instance keys data can be interpretted.
- **Instance keys**:  The actual data used for the variable instance on display, assembled as a string in the format that was used by the LSAM to store and then fetch the Dynamic Variable value that belongs to this key.

#### Functions

- **F12=Cancel**: Returns to the Display Dynamic Variable format LSAVARR2.

## Function Code \*DB2 = DB2 Database Access

For more details about how to use this maintenance function, please refer to [\*DB2 Function Code](./function-codes.md#db2-function-code).

### LSAVARR6 - Create/Change/Copy/Display: Dynamic Variable DB2 Access

#### Menu Pathways

- Main Menu > Events and Utilities menu (#3) > Maintain dynamic variables (#6) > F6=Add or options 2 or 3 > Enter = proceed to Function Code maintenance.

> Many of the LSAM menus support access to this function, since it is used everywhere among the Agent automation tools.

#### Fields
##### Header fields for Copy function

- **From Variable**: The name of the Variable that is being copied
- **To Variable**: The name of the new Variable being created by the copy action
- **From Sequence**: The sequence number of the Variable that is being copied (used only by Type "L" variables)
- **To Sequence**: The sequence numbe of the Variable being created by the copy action (only used for Type "L" variables)

##### Variable Profile Fields

- **Variable name**:  The key identifier of each variable.
- **Sequence number**: This record sequence number should be zeros for records of type V because it has no meaning for this record type. For records of type L, this sequence number is used to created unique records keys when there is more than one dynamic variable assigned to the same Variable Name (there may be multiple updates specified for the LDA content of a single job).  
- **Type**:  The record type is L for a dynamic variable that will be used to update the LDA content of a job. Type V records are dynamic variable tokens that can be inserted into job parameters or the job's call command line.
- **LDA Pos start/length**: Start position and length to be updated in a local data area (LDA), required for record type L, not valid for type V.
- **CharTrim start/length**: Start position and length of the Value to be returned for a Variable, trimmed from the character string that is fetched by the \
*DB2 SQL query.
- **Description**: Any printable character text identifying the purpose of the current Dynamic Variable. 

##### \*DB2 SQL Select Data Entry Fields
The use of these fields is explained in detail at the linked document location identified above.

- **SELECT**: Identifies the table column(s) to be retrieved from a DB2 database table.  The special value of "**\*WHERE**" can be entered when it is desired to type a free-form SQL query into the "WHERE" field.  
> In the Add mode, this field displays a reminder that any data fetched from a database table must be returned as a character string:  **CHAR(numeric/date/time)**
- **FROM library**: The name of the DB2 database library where the table is located.
- **FROM file/table**: The name of the DB2 table (file) that is being queried.
- **WHERE**: Starts with the SQL operation "WHERE" to define the WHERE clause, unless the SELECT field specifies "\*WHERE", in which case this field will contain the entire SELECT query definition. 
- **Trim Start/Length**: This trimming function can be used to return only a portion of the table column's contents back to the Agent's Dynamic Variable Value management module.  The results of this optional trim can also be subjected to the Variable master record's Character String Trimming (see "CharTrim" fields, above).  This redundancy of trimming operations derives from the evolution of the LSAM software during past years.

#### Functions

- **F3=Exit**: Returns to the LSAM menu without updating any data.
- **F5=Refresh**: Restores a maintenance display to previous state from before any new data entry, or for the Display function, retrieves a new copy of the record from the table.
- **F8=DynVar**: Displays a list of registered Dynamic Variables that can be selected for insertion into the data entry field where the cursor is located.  Variable names are enclosed within the token delimiters before the final {TOKEN} is inserted.
- **F12=Cancel**: Returns to the Dynamic Variable format LSAVARR2 (for the current Create/Change/Copy/Display function).

## Function Code \*DTAARA = DB2 Data Area Access

For more details about how to use this maintenance function, please refer to [\*DTAARA Function Code](./function-codes.md#dtaara-function-code).

### LSAVARR7 - Create/Change/Copy/Display: Data Area Access

#### Menu Pathways

- Main Menu > Events and Utilities menu (#3) > Maintain dynamic variables (#6) > F6=Add or options 2 or 3 > Enter = proceed to Function Code maintenance.

> Many of the LSAM menus support access to this function, since it is used everywhere among the Agent automation tools.

#### Fields
##### Header fields for Copy function

- **From Variable**: The name of the Variable that is being copied
- **To Variable**: The name of the new Variable being created by the copy action
- **From Sequence**: The sequence number of the Variable that is being copied (used only by Type "L" variables)
- **To Sequence**: The sequence numbe of the Variable being created by the copy action (only used for Type "L" variables)

##### Variable Profile Fields

- **Variable name**:  The key identifier of each variable.
- **Sequence number**: This record sequence number should be zeros for records of type V because it has no meaning for this record type. For records of type L, this sequence number is used to created unique records keys when there is more than one dynamic variable assigned to the same Variable Name (there may be multiple updates specified for the LDA content of a single job).  
- **Type**:  The record type is L for a dynamic variable that will be used to update the LDA content of a job. Type V records are dynamic variable tokens that can be inserted into job parameters or the job's call command line.
- **LDA Pos start/length**: Start position and length to be updated in a local data area (LDA), required for record type L, not valid for type V.
- **CharTrim start/length**: Start position and length of the Value to be returned for a Variable, trimmed from the character string that is fetched by the \
*DB2 SQL query.
- **Description**: Any printable character text identifying the purpose of the current Dynamic Variable. 

##### \*DTAARA Fetch - Data Entry Fields

- **Data area name**: A valid IBM i object name identifying the data area, or the special value of \*LDA to access a job's Local Data Area.  
> The alternate instructions for defining LDA access are included in this display.  
- **Library location**: The name of the DB2 database library where the data area is located.
- **Trim Start/Length**: This trimming function can be used to return only a portion of the data area's contents back to the Agent's Dynamic Variable Value management module.  The results of this optional trim can also be subjected to the Variable master record's Character String Trimming (see "CharTrim" fields, above).  
> This redundancy of trimming operations may be a requirement when attempting to retrieve data from a data area that is larger than 1024 bytes, since the Agent can only manage a maximum size of 1024 bytes for the value it will return to the Value replacement module.
> If a larger data area is being retrieved, but no Trim values are specified, then the selected data will be retrieved from positions 1 through 1024 of the data area.

#### Functions

- **F3=Exit**: Returns to the LSAM menu without updating any data.
- **F5=Refresh**: Restores a maintenance display to previous state from before any new data entry, or for the Display function, retrieves a new copy of the record from the table.
- **F8=DynVar**: Displays a list of registered Dynamic Variables that can be selected for insertion into the data entry field where the cursor is located.  Variable names are enclosed within the token delimiters before the final {TOKEN} is inserted.
- **F12=Cancel**: Returns to the Dynamic Variable format LSAVARR2 (for the current Create/Change/Copy/Display function).


## Function Code \*DATE = Date Format Conversion

For more details about how to use this maintenance function, please refer to [\*DATE Function Code with Reformatting](./function-codes.md#date-function-code-with-reformatting).

### LSAVARR8 - Create/Change/Copy/Display: Dynamic Variable Date Conversion

#### Menu Pathways

- Main Menu > Events and Utilities menu (#3) > Maintain dynamic variables (#6) > F6=Add or options 2 or 3 > Enter = proceed to Function Code maintenance.

> Many of the LSAM menus support access to this function, since it is used everywhere among the Agent automation tools.

#### Fields
##### Header fields for Copy function

- **From Variable**: The name of the Variable that is being copied
- **To Variable**: The name of the new Variable being created by the copy action
- **From Sequence**: The sequence number of the Variable that is being copied (used only by Type "L" variables)
- **To Sequence**: The sequence numbe of the Variable being created by the copy action (only used for Type "L" variables)

##### Variable Profile Fields

- **Variable name**:  The key identifier of each variable.
- **Sequence number**: This record sequence number should be zeros for records of type V because it has no meaning for this record type. For records of type L, this sequence number is used to created unique records keys when there is more than one dynamic variable assigned to the same Variable Name (there may be multiple updates specified for the LDA content of a single job).  
- **Type**:  The record type is L for a dynamic variable that will be used to update the LDA content of a job. Type V records are dynamic variable tokens that can be inserted into job parameters or the job's call command line.
- **LDA Pos start/length**: Start position and length to be updated in a local data area (LDA), required for record type L, not valid for type V.
- **CharTrim start/length**: Start position and length of the Value to be returned for a Variable, trimmed from the character string that is fetched by the \
*DB2 SQL query.
- **Description**: Any printable character text identifying the purpose of the current Dynamic Variable. 

##### \*DATE Reformatting Data Entry Fields
This very useful date reformatting formula may require some study to master the various combinations of the data entry fields.  This is all explained in the cross-reference to the [\*DATE Function Code with Reformatting](./function-codes.md#date-function-code-with-reformatting).  The following list simply identifies the list column headings on this display format.

- **1/2**: Each code may be used only once to designate the 1=FROM-format and the 2=TO-format. There is an optional mode where only the 1=FROM-format would be used. 
- **FMT0**: Type a zero (0) next to either or both of the FROM and TO formats if the data is, or should be, formatted using only digits and no punctuation.
- **Format....**: This column illustrates the supported punctuated date formats.
- **FMT0....**: This column illustrates the format of each date when no punctuation is present.
- **Notes**: The Agent displays explanations of options or exceptions that might apply to one or more of the date formats.

#### Functions

- **F3=Exit**: Returns to the LSAM menu without updating any data.
- **F5=Refresh**: Restores a maintenance display to previous state from before any new data entry, or for the Display function, retrieves a new copy of the record from the table.
- **F12=Cancel**: Returns to the Dynamic Variable format LSAVARR2 (for the current Create/Change/Copy/Display function).

## F8=DynVar: Prompt Dynamic Variable list
This prompting function supports selecting a Dynamic Variable from a list of registered Variable master records.  **F4=Instance Templates** can be used after selecting a Variable Name instead of pressing the **Enter** key from the initial window list display in order to obtain assistance with the correct formatting of a qualified multi-instance Dynamic Variable token.  Additional displays will appear to support the multi-instance functions.  It is possible to use F3=Exit to abandon the prompting function at any step.

### Window - Select Dynamic Variable

#### Menu Pathways

- Main Menu > Events and Utilities menu (#3) > Maintain dynamic variables (#6) > F6=Add or options 2 or 3 > Enter = proceed to Function Code maintenance > F8=DynVar.

> Many of the LSAM menus support access to this function, since it is used everywhere among the Agent automation tools.

#### Fields
- **Dynamic Var.**: Registered Variable Names, using up to the 12 characters supported by the Dynamic Variable master records table.
- **Seq**: The Sequence number is only used by Type L variables that will be used to update a job's Local Data Area (LDA).  When the Sequence number is greater than zero, it is possible for the Variable name to appear more than once in the list, in order to show all available Variable values.

#### Functions
- **Enter=Select**: Position the list display using PageUp and/or PageDown, then move the cursor to highlight the desired Variable name.  Press **Enter** to return the simple master record variable name.  Remember that <**F4**> can be used instead of the Enter key in order to advance to the next steps that assist with formatting multi-instance Variable qualifying keys.
- **F3=Exit, F12=Cancel**: These function keys abandon the prompting function and the display returns to the maintenance format where F8 was pressed without returning any data.

### LSAVARR15 - Multi-Instance Dynamic Variable Templates
To understand the templates and the "optional +" key fields that identify a specific IBM i Job, please refer to the [Multi-Instance Dynamic Variables: Overview](./multi-instance.md#overview).

#### Menu Pathways

- Main Menu > Events and Utilities menu (#3) > Maintain dynamic variables (#6) > F6=Add or options 2 or 3 > Enter = proceed to Function Code maintenance > F8=DynVar > Enter = Select variable name > F4=Instance templates.

> Many of the LSAM menus support access to this function, since it is used everywhere among the Agent automation tools.

#### Fields
- **Sel**: Type "**1**" next to at least one of the four white templates.  
> Only type a "**1**" next to the associated "**(optional +)**" line if the multi-instance variable qualifying strategy requires this data (very rarely used).

#### Functions
- **Enter=Select formats**: Press **Enter** to return the selected raw template format to the data entry display where F8=DynVar was pressed.  When using this instance key formatting assistance, it is recommended to press **F4** for additional prompting, but experienced users might be configuring special-purpose instances that they consider easier to format by manually rebuilding the raw template.
- **F3=Exit**: Works the same as F12=Cancel.
- **F4=Prompt parameters**: Use **F4** to advance to the data entry display that will prompt for the variable instance key fields needed for the selected instance.
- **F5=Refresh**: Clears any selection data and resets the display for a new selection.
- **F12=Cancel/return**: Returns the display to the original DynVar prompting list. 
> NOTE: When using F12, the Variable Name window re-appears in overlay format, but it may still be used to change which variable should be selected.
> Using **F3=Exit** (not displayed, but always available) has the same effect as F12=Cancel for this display.

### LSAVARP1 - Prompt Dynamic Variable Formatting
To understand the multi-instance key values for each of the instance types, please refer to the [Multi-Instance Dynamic Variables: Overview](./multi-instance.md#overview).

When using this display format, first verify (or change) the "Instance type" value.  Then press **Enter** to reveal the correct prompting fields for the selected instance.

#### Menu Pathways

- Main Menu > Events and Utilities menu (#3) > Maintain dynamic variables (#6) > F6=Add or options 2 or 3 > Enter = proceed to Function Code maintenance > F8=DynVar > Enter = Select variable name > F4=Instance templates > type "1" to select a format > press F4=Prompt parameters.

> Many of the LSAM menus support access to this function, since it is used everywhere among the Agent automation tools.

#### Fields
- **Instance type**: Shows the instance type that was selected on the previous display.  Allows the user to change the type code.  Press **Enter** to reveal the correct prompting fields for the selected instance.
- **Variable name**: The original variable name from the F8=DynVar prompting list is reported.

##### Data Entry Prompting Fields
The number and names of the prompting fields will vary depending on which instance format was selected.  Each field is carefully labeled. For further information about how these variable instance key fields are used, please refer to the topic link at the start of this LSAVARP1 format documentation.

Some data entry fields will appear with a reminder of the data to be entered, surrounded by a pair of Greater-than and Less-than brackets.  When typing in new data, remove or replace the brackets since they are not used in the actual instance key values.

This display does not support a nested F8=DynVar prompting function.  However, by pressing **Enter** from this display, after continuing through the P2 secondary formatting prompt, the finaly instance-qualified variable name will be inserted into the original maintenance display where F8=DynVar was pressed.  From most of these maintenance displays it will be possible to insert other Dynamic Variable {TOKENS}, or in some cases, a $-System Agent-define variable such as "**$IBM JOB NAME**" which would, of course, be very useful to make the instance-qualified variable key be flexible according to the Agent automation tool that is currently being configured.

#### Functions
- **Enter**: Press **Enter** to return the final format of the instance-qualified variable to the original maintenance display where F8=DynVar was pressed.
- **F3=Exit**: Abandon the current instance variable prompting sequence.
- **F5=Refresh**: Clears any entered data and resets the display.
- **F12=Reset MI type**: Returns the display to previous steps in the instance-key prompting sequence.

### LSAVARP2 - Display Formatted Dynamic Variable
To understand the multi-instance key values for each of the instance types, please refer to the [Multi-Instance Dynamic Variables: Overview](./multi-instance.md#overview).

Instructions are provided in the top lines of this display format.

Use **F1=Help** to review summary documenation about multi-instance Dynamic Variable qualifying keys.

#### Menu Pathways

- Main Menu > Events and Utilities menu (#3) > Maintain dynamic variables (#6) > F6=Add or options 2 or 3 > Enter = proceed to Function Code maintenance > F8=DynVar > Enter = Select variable name > F4=Instance templates > type "1" to select a format > press F4=Prompt parameters > press Enter to advance from the P1 prompt display to this P2 prompt display.

> Many of the LSAM menus support access to this function, since it is used everywhere among the Agent automation tools.

#### Fields
- **Qualified variable name**: Shows the instance-qualified variable name (that cannot be changed from this display format), followed by a data entry field with all of the required instance key values that were assembled in the P1 prompting display. If necessary, type any changes to the data of the instance-qualified variable name.  

>> Although there is no prompting for adding variables into the instance qualifying key values, it is possible to manually type Dynamic Variable **{TOKENS}** or $-System variables such as "**$IBM JOB NAME**".  These could be used as place-holders to remind the user to prompt for replacement Dynamic Variable tokens or other $-System variable strings.

- **Do not use positions...**: The maximum size of an instance-qualified variable name is 435 bytes.  Since the root name of the Variable could be less than 12 characters, this display shows a variable template under the data entry field where one or more "**X**" characters will appear under data entry spaces that would exceed the maximum supported value length.
- **Qualified variable format template**: The standard skeleton format of the instance keys sequence for the current variable instance type is demonstrated in white (or highlighted) characters.  

>> Underneath the white skeleton, this program inserts symbolic data values so that the pink image of the current instance key sequence can be viewed using the exact punctuation of each key field. 

>> Carefully observe where the periods (.) are located that separate the key values.  

>> Double quotes are required by some instance formats around key values that could contain spaces or other unique data requiring protection.  These double quotes are not required if any given instance key value will be null (not provided), but for null values the periods that separate key values must still all be specified.

#### Functions
- **Enter**: Press **Enter** to submit the formatted, qualified variable name back to the original maintenance display where F8=DynVar was originally pressed.
- **F1=Help**: Offers summary documentation about the fields on this display.
- **F3=Exit**: Returns to the original F4=Instance Templates display format LSAVAR15.
- **F5=Refresh**: Clears any entered data and resets the display.
- **F12=Return to format prompt**: Returns the display to the LSAVARP1 prompting format.


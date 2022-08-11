---
sidebar_label: 'Object Authority Screens and Windows'
---

# Object Authority Screens and Windows

The LSAM menu 9: PTF and Security menu, is documented in [LSAM Software Maintenance (PTFs)](../maintenance/ptf.md). This section documents menu 9, option 8: Work with object authority.

## Work with Object Authority

#### LSAAUTR1 - Work with LSAM DB2 Special Object Authorities

The Work with object authority function lists objects that require authority beyond the basic, restricted LSAM object authority profile. The list also includes objects that are located in the LSAM utility library, SMAGPL, even if they do not require special authority. Objects marked in the GPL column are always located in the SMAGPL library if the GPL option is 2, but they may be located in the IBM i QGPL library (or another utility library - not commonly used) if the option is 1.

#### Menu Pathways

Main Menu > PTF and Security menu (#9) > Work with object authority (#8)

#### Fields

- **Subset**: Shows the current subset rule in effect. Use function key <**F15**> to change the subset rule that controls the list content on display.
- **Search content**: Type in a value that will be used to search the entire content of every record on the display (limited only by the current subset rule). Even data that does not appear in the list display is searched. Use option 5=Display to see all the details for a record discovered by the search. Function key <**F16**> can be used to continue a search after the first record is found.
- **Opt**: Type one of the options listed at the top of the display to act on an individual record in the list. More than one option may be typed at once before the <**Enter**> key is pressed to initiate the option actions.
- **Object**: The name of the object. Use function key <**F11**> to change the list between sorting on Object name or sorting on Object type (as the primary sort key for the list).
- **Type**: The abbreviation for the IBM i operating system object type.
- **Attribute**: The abbreviation for the IBM i operating system object sub-type, such as the type of source code used to compile a program (for example, RPGLE = ILE RPG program).
- **GPL**: An indicator that marks an object for location outside of the LSAM environment libraries, SMADTA or SMAPGM. An object marked with a 1 or a 2 is installed, by default, in the LSAM utility library SMAGPL, but objects of type 1 may optionally be relocated to the IBM i library QGPL.
- **CMD**: An indicator ('1') that enables an object to be linked to additional, specialized object authority commands. An object must have this indicator set to '1' before external object authority commands may be entered to extend the definition of the object's authority.
- **Owner**: The name of the user profile that is the owner of the object. Most LSAM objects are owned by the LSAM server user profile, SMANET, but some objects may be owned by QSECOFR in order that the USRPRF field can be set to *OWNER, enabling a program to execute with security officer authority.
- **USRPRF**: The User Profile attribute assigned to objects of type *PGM (program). When this field is set to the value of *OWNER, a program will execute using the object owner's authority, rather than the calling user's authority. This technique is required in order for the LSAM to perform certain system control functions without requiring that the authorized user have extended authority.
- **Public Aut**: The authority assigned to the *PUBLIC user profile category.

#### Options

- **1=Apply**: Selects an object to which all the assigned authorities will be applied when the <**Enter**> key is pressed.
- **2=Change**: Change the object authority rules for an object.
- **3=Copy**: Select an object whose authority profile will be copied to a new object that is being added to the list.
- **4=Delete**: Remove an object (and any associated external commands) from the LSAM master file.
:::caution
Do not remove objects that SMA Technologies has designated in the distributed version of this file, in order to avoid disabling certain LSAM functions. This option should only be used for objects that the Security Officer at the site had added to the file.
:::

- **5=Display**: Display all the details of the object authority profile (except not the external commands - refer to option 7).
- **7=Commands**: Allowed only for objects that have the CMD flag set to '1', this option branches to the Work with external object authority commands function, where additional commands may be registered to customize the authority of a given object.
- **8/9=Copy cmds fr/to**: These two options are used as a pair to select one object as 8=from and another object as 9=to, in order to copy all the external commands from one object to another. These options may only be used when both objects have the CMD option flag set to '1'. Be sure to use option 2=Change to set on the CMD option for the To-object before attempting to copy commands to it from another object that already has a set of external commands.

#### Functions

- **F3=Exit**: Quits the list display and returns to the menu. Any options already completed will still apply.
- **F5=Refresh**: Reload the display from the database file, clearing any pending options that were previously entered but not executed. This function key also resets any search rule that is in effect, but it does not reset the current subset rule.
- **F6=Add**: Branch to a blank screen where a new object may be registered.
- **F9=Print**: Print a report that shows all the objects currently selected by the subset rule that is in effect. A print options window will appear, permitting a selection to include any external commands on the printed report, or to print only the primary object authority profile. The printed report shows more data from each object authority record than appears on the displayed list, providing a convenient record and audit report of the current LSAM special object authority base line.
- **F11=Sort Type**: Use this function key to toggle between sorting the list by object name, or by object type. The heading line on the list uses a pink color to show which sort option is currently in effect.
- **F12=Cancel**: Quit the list display return to the menu without executing any remaining options that may have been entered. Options previously executed will still apply.
- **F15=Subset**: Change the current list subset rule, or clear subsetting to show all records. The current subset rule that is in effect is shown in the Subset field at the top, left of the list display. Refer to window description, below.
- **F16=Search next**: This function key or the <**Enter**> key may be used to start a search when a value has been entered in the Search content field, but only <**F16**> may be used to continue the search on to the next matching record after the first match has been found.
- **F17=Top**: Move the list display to the first record in the list.
- **F18=Bottom**: Move the list display to the last record in the list.
- **F21=Backup/Restore menu**: Branch to a utility menu that supports manage of backing up and restoring the object authority master files, for use when users will make changes to the defaults.

### F15=Subset Object List Window

#### LSAAUTW1 - Subset Object List

Use the function F15=Subset to limit the records appearing in the list of LSAM Object Authorities.

#### Menu Pathways

Main Menu > PTF and Security menu (#9) > Work with object authority (#8) > F15=Subset

#### Fields

- **Select subset**:  current subset rule - Type a number from the list of options in the window to select the subset rule. Option 7  (show all) is used to  clear subset rules and show a list of the entire LSAM object authority master file. 
- **2. SMAGPL Loc**: blank - When subset option 1 has been selected, optionally type a 1 or a 2 in this field to subset the objects to one specific location. Blank in this field shows all objects that are located in any LSAM utility library. Values are:
    - 1 Object located in the SMAGPL (or QGPL) library, including LSAM environment management utilities. 
    - 2 Object located in the "SMAUTL" (SMAGPL) library, such as PTF utilities. 

- **6. User**: blank - Type a user profile name that has been assigned to any of the three available User ID n fields. This field also accepts a value of *PUBLIC in order to subset the list based on Pubic Aut not equal  *EXCLUDE. 

:::tip
 The User ID 1 field is used by the LSAM to define the set of authorities for the system operator, QSYSOPR. Type  QSYSOPR in this field to see which objects have this assignment. |
:::

#### Functions

**F12=Cancel**: Quits the subset window and return to the list display without changing the subset rule.

### Add/Change/Copy Object Authority Details

#### LSAAUTR3 - Maintain LSAM DB2 Object Authority Details: COPY

The Maintain Object Authority Details screen is show in Add, Change or Copy mode. Add and Copy mode will add a new record to the file, but in Copy mode, care must be taken to change the key fields (Object name, object type and object attribute) to avoid attempting to add a duplicate record. In change mode, the key fields may not be changed.

#### Menu Pathways

Main Menu > PTF and Security menu (#9) > Work with object authority (#8) > F6=Add **- or -** option 2=Change **- or -** option 3=Copy.

#### Fields


| Field | Default | Description   
| ----  | ---- | ----|
| Maintenance function | Based on option or function key | ADD, COPY, or CHANGE. The screen format title reflects the mode of this screen, based on the option (2=Change, 3=Copy) or function key (F6=Add) executed from the list display. In Add  mode, the screen fields are blank or zeros, except for initialized default values.|
| @ library | SMADTA | The name of the LSAM database library where the object authority management files are stored.|
| Object name  | n/a | The name of the IBM i object, such as a program or file.|
| Object type  | n/a | The IBM i object type mnemonic, for example, *PGM = program, *FILE = file (could be a database file or other file sub-type), *CMD = command. |
| Object attribute | n/a | The IBM i object sub-type mnemonic, for example, under the object type of *FILE, there can be: PF = physical file, LF = logical file (data view), DSPF = display file, PRTF = printer file, etc. |
| Located in GPL | None (1 -- 999) | - This flag is controlled by SMA and may not be set by software users. It defines the set of objects that are installed in the central, common LSAM utilities library (default name SMAGPL). LSAM objects that are located in SMAGPL are registered in the LSAM Object Authority management master file, even if their authority profile is simply the LSAM defaults. - The GPL flag specifies object locations, as follows: - 0 = no: located in either the  LSAM database library (SMADTA) or the LSAM program objects library (SMAPGM), depending on the object type and attribute. - 1 = GPL: located in the SMAGPL library, but this object qualifies for user-selected optional relocation to the IBM i library QGPL (or other library, as identified by the data area SMADTA/SMAGPL). - 2 = UTL: always located in the SMAGPL library (or  other library name, as identified by the data area SMADTA/SMAUTL), and not qualified for relocation to the IBM i library QGPL. |
| Use ext command  | 0 = No | This flag field must be manually set to '1' = Yes to allow entry of external authority commands as an extension to the basic definition of LSAM object authority. |
| Object owner  | SMANET | Most LSAM objects are owned by the LSAM server user profile, SMANET. Certain program objects are designated as owned by QSECOFR so that the owner's authority can be used to complete restricted system operations tasks without requiring that any user profile (that has a password) needs to be authorized to secured system commands. |
| Run-time USRPRF | \*USER | Most LSAM programs require that the user, such as a system operator or LSAM administrator, be authorized to use the program and any objects such as files that the program will use. Some LSAM programs are compiled to adopt the program *OWNER authority so that otherwise restricted commands and functions may be used in a predefined way without having to grant general use authority to an operator or administrator. The object owner authority can be either SMANET or QSECOFR. |
| PUBLIC authority |\*EXCLUDE | Most LSAM programs are installed with the \*PUBLIC user authority revoked. Some very basic LSAM operations control programs are authorized for the public to *USE. To see a list of objects authorized for public use, use the function F15=Subset and enter \*PUBLIC in the User subset option: 6. User: \*PUBLIC .|
| SMANET Authority  | \*ALL | All LSAM objects are owned by user SMANET. This field defines one of the default LSAM object authority parameters. A different value in this field would normally only appear for user-defined objects added to the LSAM  object authority master file. |
| SMASAV authority  | blank | The SMASAV user profile is provided specifically for use with LSAM Restricted Mode operations. The LSAM objects that must be used by SMASAV are granted the authority entered in this field. Use the function F15=Subset, option 4. SMASAVE user, to see a list of objects with this authority. |
| User ID n (user profile name) | blank | Up to 3 user-defined user profile names may be added to the basic LSAM object authority profile master record. This field and its associated type of authority help to reduce the requirement for many external commands in order to define, for example, a user-defined LSAM Operator and an LSAM Administrator (refer to discussions earlier in thistopic for adefinition of  these potential user profiles). - User ID 1 is typically used by the LSAM to define the authorities for QSYSOPR. Use the function F15=Subset and type QSYSOPR   into option 6. User:, to see  the list of objects that QSYSOPR is authorized to  use. - User ID 2 and 3: Available for any user-defined user profile name. A group profile name could be entered in one of thesefields. To define more than these two user profile authority sets, use external   commands. |
| User ID n/Auth | blank | One general authority, typically \*USE, that isassigned to the user profile named in User ID fields 1 -3. Refer to discussion aboveabout the User ID n field. External commands can be used to further refinethe authority assigned to this, or any other userprofile.  |
| | | **Managing authority by Authorization List instead of User Name:** This second field, the /AUTH value, can be set to the special value of \*AUTH. When \*AUTH is entered as the authority value,this tells the Agent that the User IDfield contains thename of an Authorization List, rather than a single user. When this Agent authority profile is appliedto the object, the IBM i system assigns that object to an existing Authorization List, where the system administrator has already configured a profile of objects and their authority that will be allowed. | 
| | | **NOTE 1.** The other multi-object authority management strategy of using a Group User Profile can be supported bysimply typing in the name of theGroup User Profile into one of the three User ID fields. In this case, the AUTH field would be used for its normal purpose of naming the specific authority to begranted.| 
| | | **NOTE 2.** Remember that  since it may not be possible to configure everytype of complexauthority matrix using only this single object authority record, the Agent supports virtually any kind of object authority strategy that may be desired by allowing anynumber of IBM i Commands to be attached to the object authority master record. This is explained further within this chapter of documentation.|
| Date last maint | system time stamp | The date and time that the object authority record was last updated.|

#### Functions

- **F3=Exit**: Quits the maintenance function without update and returns to the menu.
- **F5=Refresh**: Restores the field content to the last updated values of the master record. This function key will not roll back a record to values before the last completed update, but it can clear data that was entered before the <**Enter**> key was pressed.
- **F12=Cancel**: Quits the maintenance function without update and returns to the list display.

## Option 7=Work with Object Authority Commands

#### LSAAUTCR1 - Work with LSAM DB2 Object Authority Commands

The option to work with object authority (external) commands is only available for objects that have the EXT flag field set to a value of '1'. This screen is used to add, change, copy or delete any number of commands that will be executed every time an LSAM utility is request to set the authority of the named object. A separate LSAM database file keyed by the object name, type and attribute is used to store all the external commands for an object. When F6=Add or options 2=Change or 3=Copy are used, the detail screen for command entry supports the function key F4=Prompt that engages the IBM i command prompting routines so that command keywords and parameter values can be easily formatted. The IBM i help text for commands is also available during this prompting mode.

#### Menu Pathways

Main Menu > PTF and Security menu (#9) > Work with object authority (#8) > option 7=commands

#### Fields

- **@ library**: The name of the LSAM database library where the object authority management files are stored.
- **Search content**:   Type in a value that will be used to search the entire content of every record on the display (limited only by the current subset rule). Even data that does not appear in the list display is searched. Use option 5=Display to see all the details for a record discovered by the search. Function key <**F16**> can be used to continue a search after the first record is found.
- **Object name**:      The name of the object selected from the list of object authorities by option 7.
- **Type**:             The IBM i mnemonic for the type of the object name.
- **Attribute**:        The IBM i mnemonic for the sub-type of the object name and type.
- **Opt**:              Type one of the options listed at the top of the display to act on an individual record in the list. More than one option may be typed at once before the <**Enter**> key is pressed to initiate the option actions.
- **Command text**:     The first several characters of the external command. Use option 5=Display to view the entire command.

#### Options

- **2=Change**: Change the command, starting with the existing command on file.
- **3=Copy**: Copy the selected command to a new external command record linked to the same object name. This makes it easy to build another, similar command by only changing one or more parameters of the copied command. To copy commands from one object name to another, use options 8 and 9 on the list of LSAM special object authorities (described above).
- **4=Delete**: Remove the external command from the LSAM master file.
- **5=Display**: Display entire command syntax.

#### Functions

- **F3=Exit**: Quits the list display and returns to the menu. Any options already completed will still apply.
- **F5=Refresh**: Reload the display from the database file, clearing any pending options that were previously entered but not executed. This function key also resets any search rule that is in effect, but it does not reset the current subset rule.
- **F6=Add**: Branch to a blank screen where a new command may be registered.
- **F12=Cancel**: Quit the external command list display return to the special object authorities list display without executing any remaining options that may have been entered. Options previously executed will still apply.
- **F16=Search next**: This function key or the <**Enter**> key may be used to start a search when a value has been entered in the Search content field, but only <**F16**> may be used to continue the search on to the next matching record after the first match has been found.
- **F17=Top**: Move the list display to the first record in the list.
- **F18=Bottom**: Move the list display to the last record in the list.

### Add/Change/Copy Object Authority Commands

#### LSAAUTCR3 - Maintain LSAM DB2 Object Authority Command: CHANGE

The detail screen for command entry supports the function key F4=Prompt that engages the IBM i command prompting routines so that command keywords and parameter values can be easily formatted. The IBM i help text for commands is also available during this prompting mode.

#### Menu Pathways

Main Menu > PTF and Security menu (#9) > Work with object authority (#8) > option 7=commands > option 2=Change **- or -** option 3=Copy *- or -* F6=Add

#### Fields

- **Mode**:          Add, Change or Copy, based on the option or function key executed from the list of external commands.
- **@ library**:     The name of the LSAM database library where the object authority management files are stored.
- **Object name**:   The name of the object selected from the list of object authorities by option 7.
- **Type**:          The IBM i mnemonic for the type of the object name.
- **Attribute**:     The IBM i mnemonic for the sub-type of the object name and type.
- **Key**:           For technical support use only, the record sequence key value, within the file object name-type-attribute, of the external commands database file record.
- **Command**:       The entire external command is shown on this screen. The final command format cannot be longer than what will fit in this one, large data entry field.
- **Maint**:         The system time stamp when this command record was last updated.

#### Functions

- **F3=Exit**: Quits the detail display and returns to the menu. Any updates already completed will still apply.
- **F4=Prompt**: Branches to the IBM i command prompting mode. The prompt screen is entirely controlled by IBM i command processing and is not documented here. When <**Enter**> is pressed from the prompting screen, the completed command parameter fields will be returned to the command detail screen in the proper command format. The command record is not updated until <**Enter**> is pressed from the detail screen after prompting has been completed.
- **F5=Refresh**: Reload the display from the database file, clearing any pending changes that were previously typed but not committed.
- **F12=Cancel**: Quit the external command detail display and return to the list display without completing any add or update of the command. Updates previously executed will still apply.

## F21=Backup/Restore Menu

#### Object Authority Backup/Restore Menu

```
LSAAUTRB        Backup/Restore Object Authority Files        00/00/00 00:00:00
                          @ library: SMADTA                                     
                                                                              
Select one of the following options and press Enter to continue.              
                                                                              
     1. Display SMA defaults (BASE)                                           
                                                                              
     2. Restore SMA defaults                                                  
         Replace live master file content with original default definitions   
         of object authority.  Current file content will be backed up to      
         files named 'AyMMddhhmm' and 'ByMMddhhmm' where 'yMMddhhmm' is a     
         time stamp of year, month, day, hours and minutes.                   
                                                                              
     3. Backup current definitions                                            
         Copy the contents of the current live LSAM object authority master   
         files to the user backup files LSAAUTF00U and LSAAUTF10U.            
                                                                              
     4. Restore last backup                                                   
         Replace the content of the current live LSAM object authority        
         master files from the user backup files LSAAUTF00U and LSAAUTF10U.   
                                                                              
Selection: __                                                                   
F3=Exit  F12=Cancel                                                           
```
This sub-menu provides convenient support for clients who need to add site-specific object authorities, or to change the SMA defaults for the IBM i LSAM. SMA does not recommend changing the default object authorities of LSAM software, but it recognizes that high security sites may have important reasons to do so. The menu options in the example above offer an explanation of the available procedures. Please contact SMA Support for more information, if required.

#### Menu Pathways

Main Menu > PTF and Security menu (#9) > Work with object authority (#8) > F21=Backup/Restore menu

#### Fields

 |  Field      | Description
 | ----------- | --------------------------------------------------------------------------------
 | Selection   | Type one of the four options and press <**Enter**> to execute that function.

#### Functions

- **F3=Exit**: Quits the sub-menu display and returns to the previous menu. Any functions already completed will still apply.
- **F12=Cancel**: Quit the sub-menu display and return to the Work with ...Object Authorities list display.
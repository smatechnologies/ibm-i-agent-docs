---
sidebar_label: 'Environment Management Commands'
---

# Environment Management Commands

This topic explains various LSAM commands that can be used to manage the IBM i library list that defines the OpCon Agent (LSAM) environment.

## SMASETLIBL

The command SMASETLIBL or its command processor program SMASETLIBC can be used interactively to conveniently change the interactive job's library list. They can also be used by programmers as a tool for programming solutions that complies with the IBM i LSAM environment management rules. This command (and its subprogram) performs the function of finding a library list in the LSAM environment master files (SMALIBF00 and SMALIBF10) and then replacing the job's library list.

From IBM i command entry, type the command **SMAGPL/SMASETLIBL** and press <**F4**> (prompt) to reveal the parameters required by this command:

##### Prompting the SMASETLIBL Command
```
                     Set Library List for SMA (SMASETLIBL)                
                                                                          
Type choices, press Enter.                                                
                                                                          
Environment name . . . . . . . .   *SELECT       *SELECT, *DEFAULT or name
Display completion message?  . .   *VERBOSE      *SILENT, *VERBOSE        
LSAM General Purpose Library . .   *DEFAULT      *DEFAULT or name         
```
The environment name parameter (ENV) supports three possible values, the same as are supported by the STRSMA command (except that the default in this case is different). Refer to the [STRSMA Command](../operations/lsam.md#the-strsma-command) for more information about the environment parameter and its values.

The default ENV parameter value for the SMASETLIBL command is (\*SELECT). This value was chosen as the default because in many cases where this command is being used, there is a choice to be made, and it is much easier to specify a correct environment name by selecting it from a list. (In contrast, the STRSMA command was set to use (\*DEFAULT) as the default, so that users of the IBM i LSAM would not need any special training about LSAM environment management in order to successfully enter the LSAM menu system.)

Since the SMASETLIBL command was created for use behind the scenes (or in batch mode operations) to set a correct library list, an additional parameter is provided to control whether or not a completion message is displayed that shows how the library list is set. In batch mode, it would normally be unnecessary for a command to provide a completion message about its results, although this is allowed and it would include the completion message in the IBM i job log report. 

### SMASETLIBL Command Parameters
| Parameter               | Default Value | Description/Valid Values |
| ---------               | :-----------: | ------------------------ |
| COMPMSG (Display completion message?) | *VERBOSE     | Suppresses the completion message that would normally report the library list that has been utilized:      |
|                         |               | **\*VERBOSE**: This is the default value. It tells the command processor subprogram to format and display a message that appears in the job log and on an interactive screen after the command has completed successfully. It lists the libraries that were used to change the job's library list. +
|                         |               | **\*SILENT**: This value suppresses the function of displaying a message that shows the libraries used to change the job's library list. However, the command and its subprogram otherwise operate in the same manner, and the job's library list is still changed.|

## SMALIBMGT

The SMALIBMGT command provides access to authorized users to a tool that may be used to establish new LSAM environments and build or modify their library lists.

:::caution
The successful operation of the LSAM environment depends on correct specifications in the control files that are being maintained. Read this discussion carefully before attempting to use this maintenance function.
:::

### Characteristics

1. The command has no parameters.
2. This display shows a list format that supports data entry right into the list. In order to change existing records, type over the information and press <**Enter**> to complete the update. The user can add a new environment by typing the environment name and its associated values on a blank line, and then press <**Enter**> to complete adding it to the master file. When executed, the command starts by presenting the user with a list of existing environment names. It is possible to define up to 250 new environments, and the PageDown key (available as long as the indicator "More..." appears at the lower, right corner of the screen) continues to display subsequent pages of input-capable rows until the 250[th] row is on display (at which point the "More..." indicator changes to display "Bottom").
3. This maintenance function builds and maintains two physical files that are stored in the LSAM utility library SMAGPL:
    - SMALIBF00 = Environment master file (maintained from screen SMALBD00-1)
    - SMALIBF10 = Library master file (maintained from screen SMALIBD00-2)

### SMALIBD00-1 - SMA Environment Management

#### Fields

| Field Opt   | Required                 | Description              |
| ---------   | :------:                 | -----------              |
|             | N                        | <**Tab**> to line in table and enter option number.                  |
| Environment | Y                        | Enter a string of any characters that is used to represent a unique library list. This environment name is the only data that is stored and displayed by the IBM i LSAM software. It does not need to conform to IBM i rules for object names. However, starting a name with an alphabetic character and avoiding the use of special characters are both good practices that should be observed. Numbers may appear in the environment name.    |
| Dft         | Y (One line must be selected) | A default environment must be designated.          |
|             |                               | Make sure that only one environment is designated as the default environment. |
|             |                               | This flag is used by the STRSMA and SMASETLIBL commands to identify the environment that should be used when a value of *DEFAULT has been specified for the ENV parameter of either command.   |
|             |                               | SMA distributes a default set of entries for both of the control files that define the environment with its software product. |
|             |                               | The supplied default environment is called SMADEFAULT. If this environment is deleted (not recommended), then a different LSAM environment must be selected as the default.             |
| Description | N                             | A string of up to 30 characters that describe the purpose of each environment in a way that is meaningful to any authorized users. Verify that the description is helpful to users who will see the Inquiry mode display when it is being used to select an environment during the process of signing on to the IBM i LSAM menus (STRSMA) or during the process of changing a job's library list to match the environment (SMASETLIBL). |
  
#### Options

- **4=Remove**: This option temporarily selects and environment to be purged from the control files. As described in Confirm Remove Environments below, the list of one or more environments selected for deletion are presented for final confirmation on a different list display before the system is actually purged. When an environment control record is deleted, all the library records associated with that environment are also deleted. This option is provided in case an incorrect environment definition was entered in error, or when a test environment is being completely purged from the system. Otherwise, this option must not be used for an existing or planned environment. By using this option, the LSAM software is disabled from supporting that environment.
- **5=Disp Libs**: This option provides access to a separate display where the list of libraries for one environment is shown. When used from the SMALIBMGT command, it is possible to add, change or remove libraries from the environment definition. When used from the SMALIBINQ command, the list of libraries are presented in display-only mode.

#### Functions

- **F3=Exit**: Press <**F3**> to completely leave this function. If <**Enter**> was not pressed to commit any data entry changes, all changes typed on the screen are lost. Press <**F3**> to intentionally escape from the program without making changes, or after changes have been made, press <**F3**> to end the  maintenance function. If pressing <**Enter**> causes an error message to be returned, the changed is not made. If an error message is returned and <**F3**> is pressed without making the necessary changes and pressing <**Enter**> again, the program will end without making changes.
- **F5=Refresh**: This function key can be used to restore the original library list, as long as <**F14**> has not been pressed from the Remove option, or <**Enter**> (Confirm) has not been used to commit any changes to the database. If <**F14**> or <**Enter**> (Confirm) were previously pressed, then <**F5**> can only refresh the data back to the state it was in when the last set of updates was confirmed. This function key is provided to restore the original library list and start the data entry over again. Any changes typed before pressing <**F5**> (Refresh) are lost (as long as they were not previously confirmed).
- **F12=Cancel**: From this screen, <**F12**> works exactly like <**F3**>.
- **Enter**: Whenever <**Enter**> is pressed, any changes made to the data on the environment list display are first edited, and then committed to the control file (as long as there are no errors). If the program returns one or more error messages (displayed on line 24 of the screen as fields in error are highlighted), then no data updates take place. The errors need to be corrected and <**Enter**> needs to be pressed again for the data to be committed.
- More... **PageDown/PageUp**: Not shown on the display (but implied by the presence of the "More..." and "Bottom" indicators at the bottom-hand right corner of the screen) are the subfile paging function keys. The subfile paging function keys do not return control to the program. They can be pressed whenever the system makes them available in order to display and update as many records (up to the limit of 250) as require updating. It is allowed to press <**Page Down**> or <**Page Up**> as many times as necessary before using <**Enter**> or another function key. No data changes are either made or lost by pressing the <**Page Down**> <**Page Up**> key. <**Page Down**> and <**Page Up**> work in a similar fashion on the Remove Environments list display.

### Remove Environments

#### Confirm Remove Environments
```
SMALIBD00-4                SMA Environment Management                   MM/DD/YY   
USERNAME                       Remove Environments                      HH:MM:SS

  Press F14=Confirm to remove environments.

  Opt  Environment Dft  Description
   4   SMADEVBASE       Distrib libs plus DVP utility   
   4   SMATEST          Test User working lib list

                                                                          Bottom
  F3=Exit   F12=Cancel   F14=Confirm
  
```
#### Functions

**F14 = Confirm**: This function key must be pressed in order to complete the action of actually removing environment records. When <**F14**> is pressed, both the environment master record and its associated library records are removed from the control files. Once <**F14**> has been pressed, only new data entry can be used to restore the deleted environment information. There is no programmed un-delete function.

### Option 5=Disp Libs

Option 5=Disp Libs from Work with Environments provides access to a list of the libraries that define the selected environment. This is the only method of access to the function that can be used to maintain environment library lists. When the list of libraries displays, it shows the name of the selected environment on the second title line.

### SMALIBD00-2 - LSAM Library List Maintenance
From the Work with Library List function, type in new library names or change library names, specify the order in which the libraries appear in a library list, identify the libraries that perform each of the three IBM i LSAM roles, and optionally provide a description of each library.

This maintenance function builds and maintains a physical file that is stored in the LSAM utility library SMAGPL: SMALIBF10 = Library master file.

The library list display panel allows any new data to be keyed directly into empty fields or over new fields. There is no function key like <**F6**> (Add) to create new records. Instead, new records are created whenever a new library name is typed in and they are confirmed by pressing <**Enter**>.

Up to 250 libraries can be defined for a single list, corresponding to the maximum number of libraries supported by IBM i. It is recommended to limit the number of libraries in the list to 25 or less. This helps the functions that were programmed for older versions of IBM i, which supported a library list of only 25 names, remain compatible.

<**Page Down**> continues to display subsequent pages of input-capable rows until the 250[th]{style="font-size: 80%;vertical-align: super;"} row is on display.

:::tip
The PageDown key is available as long as the indicator "More..." appears at the lower right-hand corner of the screen. On the 250th row the "More..." indicator changes to display "Bottom"
:::

As new library names are typed in, the maintenance program attempts to honor the order in which the names were typed. The sequence number next to a library can be changed in order to force the library into a new position in the list.

No updates to the file take place until <**Enter**> is pressed to edit the data and press <**Enter**> again in Confirm mode when the final list is displayed for review. When <**Enter**> is pressed the first time after making any changes, the maintenance program edits the Type values (refer to discussion on the Type field, below). 

Once it is finished, it sorts the library names according to (1) the sequence number assigned to them or (2) the order in which the library names were entered (if the sequence numbers were not entered or erased).

If the updated library list passes all edits, the sorted library list is presented for review. This provides a chance to make any corrections to the order of the libraries.

:::tip
Library names entered at the top line, numbered zero, become the entry on line 10 after <**Enter**> is pressed.
:::

In order to remove a library from the list, clear the name of the library. The maintenance program ignores any other data entered in a row if the library name is blank. It assumes that if the library name filed is left blank, the rest of the row is to be ignored. Any blanked library names do not appear in the final sorted list of libraries. If a library was incorrectly removed from the list, press <**F5**> (Refresh) to restore the original list and not confirm an update. It is also possible to press <**F12**> (Cancel) from the confirmation display to return to the environment maintenance screen without updating the library list.

The information about the Type field, in the Fields table above, is very important for the proper operation of the IBM i LSAM software. It is critical that all three Type values be entered for any library list that is used to operate an LSAM environment. When the Type values are specified, they MUST be specified in the following order (meaning that the libraries being assigned these Type values must be in this order), and only one library may be assigned to each value: SMADTA, SMAPTF and SMAPGM.

:::tip
Library lists that are being created for use during Restricted Mode operations do not need to have the Type values assigned.
:::

#### Fields

| Field       | Description              | Valid Values             |
| -----       | -----------              | ------------             |
| Seq         | This numeric field is used to show or change the order of the libraries in a list. | -   The list display supports up to 250 numbered lines, plus there is a zero line at the top of the display that can be used to type in library names that should be added to the top of the list. |
|             |                          | This means that the list display could allow as many as 251 libraries to be typed in. The maintenance program only honors the first 250 names entered.             |
|             |                          | The IBM i operating system supports a maximum of 250 library names in a job's library list as well (This is true for any release between the V5R1 release and the current release). |
|             |                          | Despite this upper limit, it is recommended that to limit library lists to no more than 25 entries. |
|             |                          | This helps to assure that the library list remains compatible with older software that was written before IBM i release V5R1, when only 25 libraries were supported by the operating system. |
|             |                          | Also, consult with the system administrator about whether IBM i has been set with the special option that limits library lists to only 25 (for backward compatibility).      |
| Library     | The name of an IBM i Library. | IBM i Name Rules (Refer to [IBM i Name Rules](../configuration/configuration.md#IBM2)). Libraries named here do not have to exist when they are added to the list; however, they must exist before this library list can be used to support an LSAM environment. |
| Type        | The instructions for the Type values appear at the top of the library list display. | **SMADTA** = the database library, for files, data areas, and data queues. |
|             |                           | **SMAPTF** = the patches library, where SMA temporary program changes can be installed for rapid implementation. |
|             |                           | **SMAPGM** = the base SMA program objects library. This is where the functional components of the software are installed. Objects in this library should never be changed except by SMA releases or updates. |
|             |                           | **Note:** The three Typed libraries MUST be entered in the following sequence, in order for the IBM i LSAM software to work correctly: |
|             |                           | 1.  SMADTA               |
|             |                           | 2.  SMAPTF               |
|             |                           | 3.  SMAPGM               |
| Description | The description provided is only used by the inquiry version of this program (described under the SMALIBINQ command). The inquiry version of this program is used for environment selection. It is helpful if the libraries in the list had meaningful descriptions. | A string of up to 30 characters that describe the purpose of each library. |
|             |                           | This field is optional (it is helpful to give meaningful descriptions).       |

#### Functions

- **F3 = Exit**: Press <**F3**> to completely leave this function. If <**Enter**> was not pressed to commit any data entry changes, all changes typed on the screen are lost. Press <**F3**> to intentionally escape from the entire maintenance function without making changes, or after changes have been made, press <**F3**> to end the maintenance function. If pressing <**Enter**> causes an error message to be returned, the changed is not made. If an error message is returned and <**F3**> is pressed without making the necessary changes and pressing <**Enter**> again, the program will end without making changes. The same holds true for the update confirmation display. When <**F14**> (Confirm) is offered, press <**F3**> to exit the maintenance function and none of the changes presented for confirmation is made.
- **F5=Refresh**: This function key can be used to restore the original library list as long as <**Enter**> (Confirm) has not been pressed to commit any changes to the database. If <**Enter**> (Confirm) was previously pressed, then <**F5**> can only refresh the data back to the state it was in when the last set of updates was confirmed. This function key is provided to restore the original library list and start data entry over again. Any changes typed before pressing <**F5**> (=Refresh) are lost (as long as they were not previously confirmed).
- **F12 = Return**: This function key returns the display to the list of environments. If <**F14**> (Confirm) was not pressed to commit any data changes, then all changes are lost. If the confirmation process was completed, the normal procedure is to press <**F12**> (Return) to go back to the list of environments for more work on another environment. <**F12**> shows as a Cancel function instead of Return while the data entry confirmation display (illustrated in diagram 5) is on the screen.
- **PageDown/PageUp**: Not shown on the display (but implied by the presence of the "More..." and "Bottom" indicators at the bottom-hand right corner of the screen) are the subfile paging function keys. The subfile paging function keys do not return control to the program. It is allowed to press them whenever the system makes them available in order to display and update as many records (up to the limit of 250) as desired. It is allowed to press <**Page Down**> or <**Page Up**> as many times as necessary before pressing <**Enter**> or another function key. No data changes are either made or lost by pressing <**Page Down**>/<**Page Up**>. <**Page Down**> and <**Page Up**> work in a similar fashion on the Remove Environments list display.
- **Enter**: Whenever <**Enter**> is pressed, any changes made to the data on library list display are edited. If there are no errors the entered data is sorted for re-display. Once the data edit is passed, press <**Enter**> again in Confirm mode to commit the changes.

### Confirm mode

An example of the confirmation screen for changes to a library list isshown below. Note the change to the instruction line two near the top of the display.

#### Confirm Changes to Environment Library List
```
SMALIBD00-2               SMA Environment Management                  MM/DD/YY   
USERNAME                   Environment: SMADEFAULT                    HH:MM:SS

  Type new data or changes, press Enter to continue. Clear library to delete.
    Values for Type are:  SMADTA, SMAPGM, SMAPTF (one each) or blank.
   Seq  Library     Type    Description
     0  __________  ______  ______________________________   
    10  QTEMP       ______  ______________________________
    20  SMAGPL      ______  ______________________________   
    30  SMADTA      SMADTA  Database files                
    40  SMAPTF      SMAPTF  Program patches                  
    50  SMAPGM      SMAPGM  Program objects               
    60  QGPL        ______  ______________________________   
    70  SMAUTILITY  ______  ______________________________
    80  __________  ______  ______________________________   
    90  __________  ______  ______________________________
   100  __________  ______  ______________________________   
   110  __________  ______  ______________________________
   120  __________  ______  ______________________________   
   130  __________  ______  ______________________________
   140  __________  ______  ______________________________   More...
  F3=Exit   F5=Refresh   F12=Cancel
``` 

The example above illustrates that a user has added a library named SMAUTILITY to the bottom of the library list for the environment named SMADEFAULT. (This would not normally be valid in a client installation, since there is no library named SMAUTILITY being distributed by SMA with the IBM i LSAM.)

## SMALIBINQ

SMA supplies an inquiry-only function that supports read-only access to both the Environment control file (SMAGPL/SMALIBF00) and the Library control file (SMAGPL/SMALIBF10). This inquiry capability was designed to be used in two different ways:

- The command SMALIBINQ supports direct access to the inquiry functions for use by specially authorized users, such as support personnel, system administrators, programmers and the like.
- The inquiry function supports an option 1=Select that returns the name of the selected environment. This select option is used by the     STRSMA command and the SMASETLIBL command when the environment  parameter is set to *SELECT.

### Environment Inquiry

For either purpose mentioned above, the environment list display looks the same.

#### SMALIBD00-1 - SMA Environment Management

#### Fields

For a detailed explanation of the fields appearing in these inquiry screens, please refer to the documentation of the command SMALIBMGT.

#### Options

- **1=Select**: When the inquiry function is called directly from the command SMALIBINQ, the select option serves no purpose. If an environment is selected with option 1, it is ignored when the program exits and the command ends. The select option does not set any persistent environment variable; it just returns the selected value in a program CALL parameter field that can be used when another program does the calling.
- **5=Disp Libs**: This option causes the program to show the library list that was created for the selected environment. If libraries have not already been assigned to the environment, an empty list screen is displayed for the library inquiry.

#### Functions

- **F3=Exit**: This function key terminates the inquiry program. If the inquiry program was called to perform the Select process, the <**F3**> signal to the calling program causes that program to exit. If the calling program was the IBM i LSAM sign on process (as initiated by the STRSMA command), then the user is not logged into the LSAM menu system but is either logged off their workstation or returned to the command entry line where the STRSMA command was typed.
- **F5=Refresh**: This function key causes the list display to be reloaded as if the program was starting from the beginning. The only time Refresh would show new data is if someone else has performed environment maintenance while the original list inquiry program was already on display.
- **F12=Cancel**: This function key has the same effect as <**F3**> (Exit).

### Library Inquiry

This inquiry is provided for information purposes only. It might be helpful for users who are trying to select an environment to know about the library list that defines the environment. **Option 5=Disp Libs** from the environment inquiry screen brings up a list of libraries like the one shown in the following figure.

#### SMALIBD00-2 - SMA Environment Management

#### Fields

For a detailed explanation of the fields appearing in these inquiry screens, please refer to the documentation of the command SMALIBMGT.

#### Function Keys

- **F3=Exit**: This function key completely terminates the inquiry program. When the inquiry program is called to perform the Select process, the <**F3**> signal to the calling program causes the program to exit. If the calling program was the IBM i LSAM sign on process (as initiated by the STRSMA command), then the user is not logged into the LSAM menu system but is either logged off their workstation or returned to the command entry line where the STRSMA command was typed. <**F3**> from the library inquiry screen bypasses the environment inquiry screen as the whole inquiry process is ended.
- **F5=Refresh**: This function key causes the list display to be reloaded as if the program was starting from the beginning. The only time Refresh would show new data is if someone else has performed environment maintenance while the original list inquiry program was already on display.
- **F12=Cancel**: This function key ends the library list display andreturns the user to the list of environments.
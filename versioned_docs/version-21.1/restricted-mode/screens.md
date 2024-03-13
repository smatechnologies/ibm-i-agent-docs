---
sidebar_label: 'Restricted Mode Screens and Windows'
---
# Restricted Mode Screens and Windows

## Maintain Restricted Mode Scripts

### SAVRSTD20-3 - Restricted Mode Scripts

#### Menu Pathways

Main Menu > Restricted mode menu (#5) > Setup options (#1)

#### Fields

  | Field        | Default | Description                                               |
  | -----        | ------- | -----------                                               |
  | Op           |   None  | <**Tab**> to a row in the table and enter an option.      |
  | Script Name  |   n/a   | The name of the Script to be changed, copied, or deleted. |

#### Options

- **1=Select**: Type 1 next to the Script name and press <**Enter**> to work with Options (script steps).
- **3=Copy**: Type 3 next to the Script name to be copied and press <**Enter**> to proceed to the new script name window.
- **4=Delete**: Type 4 next to the Script to be removed from the system and press <**Enter**> to proceed to the Confirm Delete screen.
- **8=Export**: Initiate dialog to export this script and all its steps.

#### Functions

- **F3=Exit**: Quits the list display and returns to the menu.
- **F6=Add**: Proceeds to the window for adding a new Script name.
- **F12=Cancel**: Quits the list display and returns to the menu.

### Windows

#### Confirm Delete

#### Confirm Delete Scripts
```
  ----------------------------------------------------------------
                           Delete Script
   Script Name
   TESTSAVE

                               Bottom
                    Enter=Confirm   F12=Cancel  
  ----------------------------------------------------------------
```
#### Fields

  | Field   |       Description |
  | ------------- |  -------------------------| 
  | Script Name |  The name of a collection of Action codes that can be executed as a group.|

#### Functions

**F12=Cancel**: Quits the delete confirmation window without deleting any records and returns to the list of Scripts.

### Add New Script

A window is displayed for typing in a new Script name when function <**F6**> (Add) is pressed. This occurs before the program displays the Restricted mode options detail screen where the new Script Actions will be defined.

The same format of the New Script Name window is displayed for both function <**F6**> (Add) and function <**F3**> (Copy). The only difference will be the title line of the window, where the title line for <**F3**> (Copy) will show the name of the Script that is being copied.

Add New Script Window
```

SAVRSTD20W3
    Add new script
    Type name, press Enter.

    New script name: ________________________

    F3=Exit   F12=Cancel 
```
Copy Script Window

```  
SAVRSTD20W3

    Copy from *DEFAULT
    Type name, press Enter.

  New script name: ________________________

    F3=Exit   F12=Cancel
 ```

#### Menu Pathways

- Main Menu > Restricted mode menu (#5) > Setup options (#1) > F6=Add
- Main Menu > Restricted mode menu (#5) > Setup options (#1) > Copy Script option (#3)

#### Fields

| Field           | Default   | Required | Description         |
| -------         | -------   | -------- | -----------         |
| New script name | *DEFAULT | Y        | A user-defined name for each group of Action codes. It is recommended that the most commonly used Restricted Mode script be named "*DEFAULT" in order to support the default action of the STRSAVRST command.            |
|                 |           |          | **Note:** Users of a prior release of the LSAM who already had a single Restricted Mode script defined will have that script automatically converted to a script name of *DEFAULT. This will ensure that their system uses the STRSAVRST command the same way it did in the prior release (the STRSAVRST is submitted by OpCon scheduling without any script name parameter).         |

##### Functions

- **F3=Exit**: Quits the Add New/Copy Script window without updating and returns to the menu.
- **F12=Cancel**: Quits the Add New/Copy Script windows without updating and returns to the list of Scripts.

## Select Options (Script Steps)

### SAVRSTD20-1 - Restricted Mode Options

#### Menu Pathways

Main Menu > Restricted mode menu (#5) > Setup options (#1) > Select Script, options (#1)

#### Fields

| Field       | Default | Description                                |
| -------     | -----   | -----------                                |
| Script name |         | The name of the Script selected from the list display to which all these Action codes belong.|
| Op          | None    | <**Tab**> to a row in the table and enter an option.  |
| Seq         |         | The order in which steps in RDY status will be performed. Note that Actions in    HLD status will be sorted to the end of the list, separate from the steps in RDY   status that are listed in order of their sequence number. |
|             |         | **Note:** A former restriction on the use of sequence numbers has been removed from the system and replaced with reserved names for certain Action codes. |
| Action      |         | A user-assigned or a system-reserved name for each sequenced step. |
|             |         | **Note:** Action codes ENDSYS and STRSYS are reserved and required. ENDSYS must be the operation that puts the system into restricted mode, while STRSYS must be the operation that  restores normal mode operations. Other steps may be placed before, between, or after these  required steps. Also refer to the discussion about the optional ON_ERROR Script Action Code. |
| Stop        |         | **Y** = the Restricted Mode Script stops execution if there is an error on this step, and goes into AutoRecovr mode to restore normal system operations and report the error. |
|             |         | **N** = Restricted Mode Script does not go into AutoRecovr and continues execution whether there is an error or not. |
| Status      | RDY     | **RDY** = ready, will be executed during restricted mode. |
|             |         | **HLD** = held, will not be executed when restricted mode operations are run. |
| Description |         | User description of each sequenced step |

#### Options

- **2=Change**: Type 2 next to the Action to be changed and press <**Enter**> to proceed to the options details screen.
- **3=Hold**: Change the status of an Action to HLD, so that it will not be used during restricted mode operations. This provides for retaining Actions for use on alternate days.
:::tip
Reclaims of storage might only be performed once a quarter, while a full system save is performed every month.
:::
- **4=Delete**: Type 4 next to the Action to be removed from the system and press <**Enter**> to proceed to the Confirm Delete screen.
- **6=Release**: Change the status of a step to RDY (ready), so that it will be executed during restricted mode operations.

#### Functions

- **F3=Exit**: Quits the list display and returns to the menu.
- **F6=Add**: Proceeds to the options detail screen for adding a new Action.
- **F11=Alt View**: Toggles between Descriptions and Commands displayed for each step.
- **F12=Cancel**: Quits the list display and returns to the menu.

## Windows

### Confirm Delete

#### Confirm Delete Actions
```
                    Delete Action
Action   Description
SAVDLO   Alternate save document libraries

                                     Bottom
Enter=Confirm F12=Cancel
```

#### Fields

  | Field       | Description                            |
  |------       | -------------------------------------- |
  |Action       | User-defined name for the Action.      |
  |Description  | Explanation of what the action does.   |

#### Functions

**F12=Cancel**: Quits the delete confirmation window without deleting any records and returns to the list of Actions.

### Restricted Mode Options Detail

The same format of Options Detail screen is displayed for both option 2=Change and function <**F6**> (Add).

#### SAVRSTD20-2 - Restricted Mode Options Detail

#### Menu Pathways

- Main Menu > Restricted mode menu (#5) > Setup options (#1) > F6=Add
- Main Menu > Restricted mode menu (#5) > Setup options (#1) > option 2=Change

#### Fields
| Field | Default  | Required | Description      |
| ----  | -----    | -----    | ------ |
| Script name Action   |                  | n/a      | The name of the Script in which this Action code is being added or changed.  |
| Action           | None             | Y        | A user-defined or a system-reserved name for each sequenced step that is part of restricted mode operations.    |                 
|          |                  |          |  **Note:** Action codes ENDSYS and STRSYS are reserved and required. ENDSYS must be the operation that puts the system into restricted mode, while STRSYS must be the operation that restores normal mode operations. Other steps may be placed before, between  or after these required steps. Also refer to the discussion [Optional ON_ERROR Script Action Code](#Optional)  about the special ON_ERROR Action code.*   |
| Sequence         | Next available number  | Y        | The order in which the steps in RDY status will be performed. Note that Actions in HLD status will be sorted to the end of the list, separate from the steps in RDY status which are listed in order of their sequence number.    |
|          |                  |          | The default sequence number supplied may not be the next highest number among all sequences if there are Actions in HLD status at the end of the list. Instead, the last Action in HLD status becomes the reference for the system-supplied default sequence number. The person performing this maintenance is responsible for updating the sequence number so that the list of Actions to be performed will occur in the correct order.       |
|          |                  |          |  **Note:** A former restriction on the use of sequence numbers has been removed from the system  and replaced with reserved names for certain Action codes.      |     
| Status           | System defined   |          | When the options detail screen is presented in Change mode, the existing status of an Action will appear in this field. This value cannot be changed on this display; it is updated by using options 3 and 6 from the list of Actions display. |
| Description      | None             | N        | A user-supplied description of what function the Action will perform. |
| Stop Execution on Error  | None             | Y        | Y=Yes      |
|          |                  |          | N=No         |
|          |                  |          | This instruction flag causes theRestricted Mode operations to be suspended if an Action that is flagged as Y=Yes, encounters an error condition. In that case, the Restricted Mode operations program will go into AutoRecovr mode, restore normal system operations, and report the error.   |
| Command line     | None             | Y        | Type the IBM i command to be executed. The <**F4**> (Prompt) key supports access to IBM i command prompting. When <*Enter**> is pressed from the prompt display, the resulting command text will be inserted into this field. |

:::caution *Special Action circular code: ON_ERROR
There is a special Action code name ON_ERROR that is reserved as an optional step that may be added anywhere in the sequence of Script steps. Each time ON_ERROR is specified, the Restricted Mode operations program registers the command that has been assigned to this Action code as the current operation to be performed in case any subsequent step in the Script might fail. The ON_ERROR command is executed after the Restricted Mode operations program has performed most of the AutoRecovr steps (after normal system operations have been restored an the LSAM service programs have been restarted). 

The usual type of command that would be assigned to an ON_ERROR Action is an OpCon Event. Refer to [Events and Utilities Menu](../events-utilities/menu.md) and [Commands and Utilities](../commands-utilities/commands.md) for more information about the available OpCon Event commands that may be specified. As with all Restricted Mode Action commands, the OpCon Event commands may also be prompted using <**F4**> from the Restricted Mode Options Detail screen (below). ON_ERROR Action codes are ignored if the entire Restricted Mode Script executes normally.
:::

#### Functions

- **F3=Exit**: Quits the options details display without updating and returns to the menu.
- **F4=Prompt**: In the Command line field, go to IBM i command prompting. When <**Enter**> is pressed from the command prompt screen, the resulting command text will be inserted into this field.
- **F12=Cancel**: Quits the options details display without updating and returns to the list of Actions.

## Setup Restricted Mode Environment

In Setup Environment, define the environment for executing Restricted Mode operations by specifying an environment library list and an option for managing any exceptional messages that may arise.

### SAVRSTD21 - Restricted Mode Evnironment

#### Menu Pathways

Main Menu > Restricted mode menu (#5) > Setup environment (#2)

#### Fields

| Field              | Default      | Required | Description        |
| ------             | -----        | -----    | -----              |
| Environment name   | SMADEFAULT   | Y        | Enter the name of the LSAM environment that  will control Restricted Mode operations. For most installations with a single, live LSAM environment, this environment will be the default name of SMADEFAULT. |
|                    |              |          | **Note:** Only one LSAM can be used at a time to control Restricted Mode operations, since these operations affect the state of the entire IBM i operation system.  |
| Restart delay seconds      | 180          | Y        | The number of seconds required by IBM i to fully restart the TCP/IP server programs. If this value is specified incorrectly, the Restricted Mode operations program may not be able to automatically restart LSAM communications whenever there has been a failure of a Restricted Mode  script.            |
|                    |              |          | **Note:** This value may be determined by examining the time stamps on messages in the System Operator message queue from a point just after an IPL or other system restart.           |
| Console job start wait | 030          | Y        | The number of seconds that the OpCon-started process initiation job should wait for the Console job (or submitted  batch job) to become active and  be able to respond to the control job.               |
| Console device/\*BATCH | \*BATCH      | Y        | **\*CONS** = The IBM i DSP01 device must be used by user SMASAV to run script steps.  |
|                    |              |          | **\*USER** = A user-designated display device may be used by user SMASAV to run script steps. However, be sure that this device will be managed by the IBM i controlling subsystem, if  the script will actually  put the system into restricted mode (which may not happen when testing with the NOENDSYS Action code).  |
|                    |              |          | **\*BATCH** = No display device is used. The OpCon-initiated control job will submit the batch job that will execute script teps.         |
| Control subsystem JOBQ & library | QBATCHQGPL   | N        | These values are required only when the \*BATCH mode will be used. For batch mode, this tells the OpCon-initiated control job where to submit the script execution batch job.   |
| QCONSOLE           | system value | n/a      | This display-only field shows which device has been designated as the IBM i operating system console device. This value identifies the display device that must be used for \*CONS mode.   |
| QCTLSBSD           | system value | n/a      | Two fields show the name and library location of the Subsystem Description that describes which IBM i subsystem is the controlling subsystem, used exclusively when the system is put into its restricted mode.   |
| Seq                |              |          | The sequence number that is automatically assigned to each library in the library list. This number is only for clarification of the order of the library list. |

#### Functions

- **F3=Exit**: Quits the environment details display without updating and returns to the menu.
- **F4=Prompt**: From the Environment field, the prompting function presents a new screen that lists all available environments. It is possible to view the library list that defines each environment. Select the environment and library list that has been created for use with Restricted Mode operations. If no environment and library list has been set up for Restricted Mode operations, use <**F6**> (Add/maint env) to perform environment maintenance now. Then repeat the <**F4**> (Prompt) to select the new environment for insertion into the Environment field.
- **F5=Refresh**: Retrieves the latest information from the LSAM environment master files and updates the display.
- **F6=Add/maint env**: This function key supports access to the LSAM Environment maintenance functions, where new environment records may be created and library lists may be constructed or updated. Refer to [LSAM Environment Management](../environment/index.md) for more information about managing LSAM environments.
- **F12=Cancel**: Quits the environment details display without updating and returns to the list of Actions.
- **F15=Update SMASAV**: Access to a function required to prepare the user profile SMASAV and a control data area QGPL/RSTENVIRON for use with Restricted Mode operations.
- **PageDown**: Use the Page control keys to view more libraries if the complete list is not displayed on the first page.

### F15=Update SMASAV

The instructions for preparing the LSAM to use Restricted Mode operations indicate that the following screen represents a step that is required to configure the LSAM software. The effect of using this screen to perform the update is that the system will know which LSAM environment should be used as a reference point to initiate Restricted Mode operations when the special user SMASAV signs on to the IBM i system for this purpose. This function will also update the SMASAV user profile with correct information about where to find the required Initial Program.

It is recommended to always perform this function before using the Restricted Mode for the first time, or at any time after updating or changing the LSAM environment or programs. It is also required to complete this function by pressing <**Enter**> when this display shows that the Restricted Mode controlling environment is either blank or is not the same as the Current environment. However, it is not necessary to press <**Enter**> when viewing this display from a test environment and that environment should not be in control of Restricted Mode operations.

As a general rule, the default LSAM environment should be the one that is set to control Restricted Mode. Note that this environment name will not be the same as the Restricted Mode environment itself, shown on the previous display format (above). This is because the environment name is only a label for the special library list which will be in effect during Restricted Mode operations. For more information, refer to [SMALIBMGT](../environment/commands.md#SMALIBMG). Regarding the discussion about Multiple Environment Management, refer to [LSAM Environment Management](../environment/index.md) and [Installing Multiple Environments](../reference/multiple-environments.md).

### SAVRSTD21-2 - Restricted Mode Update SMASAV

#### Menu Pathways

Main Menu > Restricted mode menu (#5) > Setup environment (#2) > F15=Update SMASAV

#### Fields

 | Field  | Description |
 | -----  |------------ |
 | Current environment  |  The name of the LSAM environment in which this display is being executed. (The value is stored in the ENVIRON data area in the SMADTA library, or the equivalent of this library for the current environment.) |
| Restricted Mode controlling environment |  The name of the LSAM environment that will be in charge of initiating Restricted Mode operations. (The value is stored in the data area RSTENVIRON in library QGPL.) |

#### Functions

- **F3=Exit**: Quits the environment details display without updating and returns to the menu.
- **F10=View SMASAV**: View the settings of the SMASAV user profile in order to confirm that the initial program and the job description are referring to correct library names. If it appears they are incorrect, press <**Enter**> to complete the update process.
- **F12=Cancel**: Quits the environment details display without updating and returns to the list of Actions.
- **Enter**: Press <**Enter**> to initiate the system changes described on this screen. To avoid any updates press <**F12**> or <**F3**> instead. After pressing <**Enter**>, the display will return to the list of libraries for the Restricted Mode environment and a message will appear at the bottom line confirming that the updates have been successfully completed.

## Restricted Mode History

Shows the Actions and other steps that were performed during the last Restricted Mode of operations with the associated dates, times, and messages.

### Restricted Mode Job History

Shows a list of each Script name and job for which a history has been recorded.

#### SAVRSTD05-1 - Restricted Mode Job History

#### Menu Pathways

Main Menu > Restricted mode menu (#5) > History of last use (#3)

#### Fields

- **Search content**: Type a value in this field and press <**Enter**> to find the first job history (control record) that contains this value. Use <**F16**> to continue the search to the next record(s). 
- **Opt**: <**Tab**> to a row in the table and enter an option. 
- **Script**: The name of the Script for which a history exists.
- **JobNbr**: The IBM i job serial number.
- **Job User**: The IBM i user profile (should always be SMASAV).
- **Job Name**: The IBM i job name (should always be DSP01).
- **Date**: The day when this Script was last executed (as of the last step in the script).

#### Options

- **1=Select**: Type 1 next to a Script/Job and press <**Enter**> key to view its history detail.
- **9=WRKJOB**: Type 9 next to a Script/Job and press <**Enter**> to view the IBM i WRKJOB menu.

#### Functions

- **F3=Exit**: Quits the list of Scripts and returns to the menu.
- **F5=Refresh**: Reloads the list of jobs from the log file.
- **F12=Cancel**: Quits the list of Scripts and returns to the menu.
- **F16=Search next**: Continue the content search to the next     matching record.
- **F17=Top**: Jump to the first record in the list of job histories.
- **F18=Bottom**: Jump to the last record in the list of job histories.

### Restricted Mode Activity History

Shows a list of script options and/or program-defined steps that were performed, throughout the history of the job.

#### SAVRSTD05-2 - Restricted Mode Activity History

#### Menu Pathways

Main Menu > Restricted mode menu (#5) > History of the last use (#3) > option (#1)

#### Options

**5=Display**: Type **5** next to a history line and press <**Enter**> key to view its details.

#### Functions

- **F3=Exit**: Quits the list of Scripts and returns to the menu.
- **F9=WRKJOB**: Branch to the IBM i Work with job menu for this job.
- **F12=Cancel**: Quits the list of Scripts and returns to the menu.
- **F16=Search next**: Continue the content search to the next matching record.
- **F17=Top**: Jump to the first record in the list of job histories.
- **F18=Bottom**: Jump to the last record in the list of job histories.

#### Fields

- **Script**: The name of the Script that was executed by this job.
- **Job ID**: The full IBM i job identifier for this job.
- **Opt**: Type option 5 next to one or more lines to view the full history detail.
- **Entry timestamp**: The system date and time when this step was executed.
- **Action**: The mnemonic name, or the Action Code of the script step (option) that was executed at this time.
- **Sts**: Each history entry is marked as to its type. Values: B = begin step, E=end step, F=failure.
- **Message**: If any exception occurred during execution of this step, an IBM i error message ID will appear here. Otherwise the entry shows *NONE.
- **Description/Command**: For steps that executed a command, shows the first several characters of the command. Use option 5 to view the full command text. For other entry types, this field may show the description of an error, or other descriptive comment.

### Restricted Mode Activity History Detail

Shows extended detail about the activity selected from the list of steps in a job's history.

#### SAVRSTD05-5 - Restricted Mode Activity History Detail

#### Menu Pathways

Main Menu > Restricted mode menu (#5) > History of the last use (#3) > option (#1) > option (#5)

#### Fields

- **Script**: The name of the Script that was executed by this job.
- **Job ID**: The full IBM i job identifier for this job.
- **Log entry date, time**: The date and time when the log entry was written.
- **Action code**: The mnemonic name, or the Action Code of the script step (option) that was executed at this time.
- **Log status code**: Each history entry is marked as to its type. B = begin step, E=end step, F=failure.
- **Log message code**: If any exception occurred during execution of this step, an IBM i error message ID will appear here. Otherwise the entry shows *NONE.
- **Log entry text**: For steps that executed a command, shows the full command text. For other entry types, this field shows the description of an error, or other comment.

#### Options

**5=Display**: Type **5** next to a history line and press <**Enter**> key to view its details.

#### Functions

- **F3=Exit**: Quits the list of Scripts and returns to the menu.
- **F12=Cancel**: Quits the list of Scripts and returns to the menu.
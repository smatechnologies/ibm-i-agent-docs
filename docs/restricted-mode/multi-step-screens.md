---
sidebar_label: 'Multi-Step Job Screens and Windows'
---
# Multi-Step Job Screens and Windows

The Restricted Mode and Multi-Step Job Menu is documented above.

## Multi-Step Job Script Command STRMLTJOB

The STRMLTJOB command, located in the SMAGPL library, is used to execute multi-step job scripts. It can be executed from OpCon using a simple IBM i batch job, and it can also be executed in test mode (not connected to OpCon) from an IBM i command line or from a submitted batch job by setting the JOBTYPE parameter to "T" for test mode.

#### STRMLTJOB Command Prompt with Keywords
```
                       Start Multi-step Job (STRMLTJOB)                        
                                                                               
Type choices, press Enter.                                                     
                                                                               
Script name  . . . . . . . . . .   __________    Character value               
Restart label  . . . . . . . . .   *FIRST        *FIRST/Blank = not restart    
Job type: T=test, O=OpCon  . . .   O             T=Test, O=OpCon job           
Write to job log: Y/N  . . . . .   Y             Y=write to job log, N=no write
Environment name . . . . . . . .   *DEFAULT      *CURRENT,*DEFAULT,*SELECT,name
LSAM General Purpose Library . .   *DEFAULT      Character value               
```

Additional important information about the use and impact of the command parameters may be found in the "More Information..." topic in [Multi-Step Job Scripting](./multi-step-scripting.md#more-information-about-preparing-multi-step-jobs).

#### Command Parameters

- **SCRIPT: Script name**: The name of the script whose steps will be executed.
- **RSTLABL: Restart label**: The name of a label assigned to the script step where the job execution should start.
  - When an IBM i Control Language source member is used to define the script steps, then a CL TAG: label can be specified in this parameter (but do not include the colon character).
  - When this parameter is blank, the script will start with the lowest numbered step. Numeric values can be used in this parameter to specify a step by its sequence number, and numeric values can also be used to control the restart point with a Control Language source member. More information about restart logic is provided above in the "More Information..." topic in [Multi-Step Job Scripting](./multi-step-scripting.md#more-information-about-preparing-multi-step-jobs).
  - Be aware that a script may contain a specially labeled ON_RESTART step which will always be executed before the script execution then branches to the step indicated in this parameter.
- **JOBTYPE: Job type: T=test, O=OpCon**: The default value of "O" indicates to the command driver program that it was started by OpCon and that it should communication step label progress messages and the overall job results back to OpCon.
  - When the command is started directly from an IBM i command line, or from an IBM i batch job not started by OpCon, set this parameter to a value of "T" to indicate test mode, which really means that the command driver will not attempt to communicate job results to OpCon.
  - In OpCon mode, the script driver program sends important job status messages to OpCon that cause the last Step Label (or CL TAG:) name to be displayed as part of the OpCon job status description. This aids in visually monitoring the progress of a multi-step job. A step label message is also added to the OpCon Job Detail Messages list, so that a history of the step execution and its time can be viewed from the OpCon Job Information function, under the Configuration tab.
- **JOBLOG: Write to job log: Y/N**: The script driver program always writes script execution messages to the LSAM Multi-Step Job log file. The entries in this file may be viewed using the LSAM sub-menu 5, option 6. Set this parameter to "Y" = yes to tell the script driver program to also write the log entries as messages added to the IBM i job log report.
  - It is often easiest to diagnose script failures when the job log contains the script execution entries before and after other IBM i system messages. However, IBM i job attributes, job description settings and system values also govern which messages are retained in the job log report.
  - Use a verbose IBM i job logging setting such as LOG(4 00 *SECLVL) to be sure that all script messages will remain part of the job log report.
    - The LOG( ) settings can be controlled by the Additional Job Information tab of an OpCon job master record, or by the SBMJOB command LOG( ) when submitting a test job, or by executing a CHGJOB command using the LOG( ) parameter before directly executing the STRMLTJOB command.
  - The script driver includes in the log entries and messages a marker as any new Step Label is encountered.
- **ENV: Environment name**: This command parameter supports special-purpose internal operations. Normally the value of this parameter should be left set to *DEFAULT, indicating that the LSAM environment supporting the script execution is defined by LSAM command actions that depend on the PRDLIB attribute of the STRMLTJOB command.
- **GPL: LSAM General Purpose Library**: This command parameter supports special-purpose internal operations. Normally the value of this parameter should be left set to *DEFAULT, indicating that the SMAGPL library where the LSAM environment is defined will be managed by the PRDLIB attribute of the STRMLTJOB command.
  - Many LSAM utility commands located in the SMAGPL library, like STRMLTJOB, have their PRDLIB command attribute set to match the name of the SMAGPL library where the command is located. The PRDLIB value then controls a temporary change to the job's library list, if that is necessary, so that all objects and files required for script execution will be available to the job. This command parameter supports special-purpose internal operations. Normally the value of this parameter should be left set to \*DEFAULT, indicating that the LSAM environment supporting the script execution is defined by the script job's library list.

## Maintain Multi-Step Job Scripts

### MLTJOBR10-1 - Multi-Step Job Scripts

#### Menu Pathways

Main Menu > Restricted Mode and Multi-Step Job menu (#5) > Option (#5)

#### Options

- **1=Script steps**: Use this option to work with the Step master records that define a Script.
- **2=Change, 3=Copy** : Use these options to maintain or create just the Script master records. Option 3 works like function key F6=Add. (Use option 1 to work with the list of Steps, in order to change or copy the Step master records.)
- **4=Delete**: Type this option and press <**Enter**> to add one or more records to a list of pending delete requests. After the Enter key is pressed, a confirmation list will appear requesting confirmation of all delete requests before Script master records are actually removed. Note that the Delete action used on a Script master record will also delete all the Step master records associated with a Script.
- **5=Display**: Branches to a display of all the fields defining one Script master record.
- **8=Export**: Initiate dialog to export this script, its steps, and all associated data.
- **9=Flow chart**: Branches to an analytic display of the script flow, including any sub-scripts that are called by the primary script. The flow chart view offers additional options for studying a script, including a Fold option that will display an entire command line within the list. The flow chart can be also be printed.

#### Functions

- **F3=Exit**: Returns to the sub-menu.
- **F5=Refresh**: Reloads the list from the current values in the master file.
- **F6=Add**: Branches to the Script master new record input screen.
- **F12=Cancel**: Returns to the sub-menu.
- **F16=Search next**: Starts or repeats a search looking for match to the value entered in the Search field. Each whole master record is searched, not just the values appearing on the list display.

#### Fields

- **Search content**: Type a value in this field and press <**Enter**> or <**F16**> to search all the master records for the first record that contains the value. The entire master record is searched, not just the fields appearing on the list display. After a new search is started, use the <**F16**> function key to continue the search to the next record.
- **Opt**: Type one of the options listed near the top of the display next to one or more of the listed lines, then press <**Enter**> to start executing each option, one by one.

## Multi-Step Job Script Master Record Display

### MLTJOBR10-3 - Multi-step Job Script

The screen is used to illustrate the Display, Change, Copy and Add functions.

#### Menu Pathways

- Main Menu > Restricted Mode and Multi-Step Job menu (#5) > Multi-step Job Scripts > F6= Add
- Main Menu > Restricted Mode and Multi-Step Job menu (#5) > Multi-step Job Scripts > Option 2 = Change
- Main Menu > Restricted Mode and Multi-Step Job menu (#5) > Multi-step Job Scripts > Option 3 = Copy
- Main Menu > Restricted Mode and Multi-Step Job menu (#5) > Multi-step Job Scripts > Option 5 = Display

#### Functions

- **F3=Exit**: Returns to the LSAM sub-menu. Any changes typed on the screen are not updated on the master record.
- **F5=Refresh**: Appears only for Change, Copy or Add. Restores the field values to their original settings as they first appeared when this display format was accessed.
- **F12=Cancel**: Returns to the Script Steps master records list without updating the current master record.
- **F15=View/Maintain LDA**: Branch to the LDA displays. For Add, Copy or Change, the program branches to the Maintain screen, but while in Display mode it branches to Display LDA.

#### Fields

- **Script name**: The name of the Script. This is the value that will be used by the STRMLTJOB command or the SMAGOTO pseudo-command to reference any Script. An existing Script Name may be changed, using option 2=Change.
- **Script Type**: The Script Type indicates whether the script steps are contained in associated STEPS master records, or in a SCRMBR where the Source file, library and member fields point to an IBM i source file member that contains the CL commands that will be executed instead of using Script Step master records.
- **Description**: This text helps to identify the purpose of a Script on the Scripts master record list.
- **Source file, library and member**: Use these fields when the Script record type field is set to SRCMBR, to identify the IBM i DB2 library, file and source member where the Script Steps may be found. When the type is SCRMBR, the list of Script Steps will show the actual records found in this source file member. The screen prompts recommend using the LSAM's source file DBFCMDSRC to contain script source CL members, since this file is well controlled and supported by the LSAM, but any IBM i source file can be used instead.
- **Last maintenance user, timestamp**: Shows the IBM i user profile that last used the LSAM maintenance program to change the master record, and the timestamp when this maintenance was performed.
- **Internal primary key**: An SQL auto-assigned record number field. This data may be used by technical support personnel. This Primary key of this Script master record is used by the associated Step master records to logically associate them with the Script master. This allows the Script name to be changed without affecting the relationship with its Step records.

### Delete Multi-Step Job Scripts

- **Screen Title**: Multi-step Job Scripts
- **Screen ID**: MLTJOBR10-4

#### Menu Pathways

Main Menu > Restricted Mode and Multi-Step Job menu (#5) > Option 4=Delete

#### Functions

- **F3=Exit**: Returns to the sub-menu.
- **F12=Cancel**: Returns to the list of Scripts. All previous requests to delete Scripts are discarded.
- **F14=Confirm**: Confirming the delete action causes the Script master record(s) and all associated Step records to be erased from the master files. Erased records cannot be recovered (except by restoring master files from a backup copy).

### Script Steps Flow Chart (option 9)

#### Script Steps Flow Chart
```
MLTR11R1                Multi-Step Job Script Flow Chart              00/00/00   
USERNAME                    Starting Script: TEST1                    00:00:00
                                                      Search content:__________    
 Script/Label  BR/STEP Command
  TEST1                 Export testing
  |..              0010   DLYJOB DLY(1)
  |..              0020   SMASUBR SCRIPT(TEST3) RSTLABEL(LBL3A) JOBTYPE(T) /* Co
  |..           SMASUBR    Script: TEST3  Label: LBL3A
  |..                         WARNING: Branch Label not found
  |..RESTART030    0030   SMADTA/DBFCMDSRC(MJSTEP1) = MJLBL01:   SNDMSG MSG('Tes
  |..              0040   SMAGOTO SCRIPT(TEST2) STEP(RESTART020)
  |..           SMAGOTO    Script: TEST2  Label: RESTART020
  |..           --->          (See analysis of GOTO target above/below)
  END

  TEST2                 Second test as sub-script from TEST1
  |..RESTART020    0020   DLYJOB DLY(1)
  |..              0030   SMAGOTO SCRIPT(TEST1) STEP(RESTART030)
  |..           SMAGOTO    Script: TEST1  Label: RESTART030
  |..           --->          (See analysis of GOTO target above/below)
  END
                                                                           Bottom
  F3=Exit F5=Refresh F9=Print F10=Fold/Unfold F11=View F12=Cancel F16=Search Nxt
```

#### Menu Pathways

Main Menu > Restricted Mode and Multi-Step Job menu (#5) > Option 9=Flow chart

#### Functions

- **F3=Exit**: Returns to the sub-menu.
- **F5=Refresh**: Reloads the data and repeats this display.
- **F9=Print**: Creates a spool file within the current job that can be printed. The report shows the entire flow chart, even if multiple display pages are required. The report reflects the current viewing mode, of Folded (show entire command line) or Unfolded, as well as the current V11 View option.
- **F10=Fold/Unfold**: Fold uses addition lines to display the entire content of the right side of the list, such as the complete Command line, a long Description or the entire Compare Rule. Unfold returns the list to one line per step (except that additional information lines about branching are always displayed).
- **F11=View**: Alters the right side of the display, rotating through: Command, Description and Compare Rule.
- **F12=Cancel**: Returns to the list of Scripts.
- **F16=Search Nxt**: After a Search content value is typed and Enter is pressed, F16 is used to search for the next list record that contains matching content. Use F16 to continue a search through to the end of the list.

### F15=Display/Maintain LDA

Both the Display and the Maintain functions for the LDA (IBM i job Local Data Area) are described in [F15 = Change LDA](../job-tracking/screens.md#f15--change-lda).

That function and this Multi-Step Job Scripting feature both share the same LSAM file (JOBLDAF00) to store LDA images. The key to each LDA image record is either the Tracked Job Name or the Multi-Step Script name, therefore, do not use the same name in both features - be sure that Multi-Step Script names are unique.

## Work with Script Steps and Source Members

### Work with Multi-Step Job Script Steps

Also refer to the alternate list format for Scripts of type SRCMBR described on the screen.

### MLTJOBR10-2 - Multi-step Job Script Steps

#### Menu Pathways

Main Menu > Restricted Mode and Multi-Step Job menu (#5) > Multi-step Job Scripts > Option 1 = Script Steps

#### Options

- **2=Change, 3=Copy**: Use these options to maintain or create individual step records. Option 3 works like function key F6=Add.
- **4=Delete**: Type this option and press <**Enter**> to add one or more records to a list of pending delete requests. After the Enter key is pressed, a confirmation list will appear requesting confirmation of all delete requests before Step master records are actually removed.
- **5=Display**: Branches to a display of all the fields defining one Step master record.
- **6=DspSrc**: This option works only with Step records that refer to an external source library/file(member) instead of using the Command field on the step record itself. The contents of the external source member will be displayed, using one of the IBM i source file member display tools that are available on a user's system. Use function key <**F11**> to vary the View of this list until the Command line and/or Library/File(Member) value is shown for each Step, in order to determine which Step lines can use option 6.

#### Functions

- **F3=Exit**: Returns to the sub-menu.
- **F5=Refresh**: The display program updates all the information about every listed record by re-reading the entire Steps master file.
- **F6=Add**: Press this function key to start adding a new Step master record to the current Script.
- **F7=ReSeq**: Press this function key to re-assign sequence numbers to the Step master records in even intervals. The default increment for a short list of steps is to count by tens. This function key is useful after many records have been inserted between two existing Step records, in case there are no more available intermediate sequence numbers.
- **F9=Print**: Press this function key to generate a complete list of all the lines that could appear on this list display, including lines that require PageDown (or PageUp) to view on the display. The printed report will reflect the current View selected by function key F11. (HINT: Use option 9=Flow chart, from the list of Script names, to view and/or print a list of script steps that can show all of the command text for each step, if F10=Fold was first used on the script names list.)

- **F11=View**: This function key changes the content of the right side of the list display to show different parts of each Step record. The current View is indicated by the "View" field that is on the right side of the column headers. Views include:

    1. Command Text or Source LIBRARY/FILE(MEMBER)
    2. Step Description
    3. Qualifier Comparison Rule (summarized/truncated, in case values are too long)

- **F12=Cancel**: Returns to the sub-menu.

- **F16=Search (next)**: When a value was typed in the Search Content key, after the Enter key is used to find the first match, this function key F16 will continue the search to find the next matching record.

#### Fields

- **Script Name**: The name of the Script whose Steps appear in the list.
- **Type**: The Script type code of STEPS or SRCMBR. When the Script type is SRCMBR, the list shows the (partial) contents of each record found in the referenced source file member.
- **Description** The description from the Script master record.
- **Search content**: Type a value in this field and press <**Enter**> or <**F16**> to search all the master records for the first record that contains the value. The entire master record is searched, not just the fields appearing on the list display. After a new search is started, use the <**F16**> function key to continue the search to the next record.
- **Opt**: Type one of the options listed near the top of the display next to one or more of the listed lines, then press <**Enter**> to start executing each option, one by one.
- **Seq #**: The sequence number assigned to each Script. Function key F7 can be used, when necessary, to automatically re-sequence all of the Steps in the current Script.
- **S (Status)**: The status of a Step master record can be "I" = Inactive (will not be considered during Script execution, except for a LABEL if it is not blank). Otherwise, if the status is blank or "A", the Script Step is active.
- **F (Fail/Ignore)**: The list uses this column to show the Step record's "Error Fail/Ignore" field value. This flag tells the script driver what to do when the step command fails: either force the script job to Fail, or Ignore the error and allow the script to continue.
- **Label**: The LABEL that is optionally assigned to a Script Step. Labels are used for Script restart logic, for branching controls, and for reporting Script job progress to OpCon.
- **CNT**: This is a "Continuation" code field, reserved for future use when Script Step qualifier rules may be combined into a complex qualification formula. ***(This field is not currently supported.)***
- **Step Description/Command text/Qualifier/**: Depending on the current View selected by function key F11, this field will display the Step Description, the first part of the Command field text, the LIBRARY/FILE(MEMBER) of a Step that does not use its own Command text, or a shortened summary of the Qualifier rule.
- **View**: This Header-only field identifies the current list view that was selected using the F11 function key. (Refer to F11, above, for more information.)

## Display Multi-Step Job Script Source Member Records

Also refer to the alternate list format for Scripts of type STEPS, described above.

### MLTJOBR10-2 - Multi-step Job Script Steps

#### Menu Pathways

Main Menu > Restricted Mode and Multi-Step Job menu (#5) > Multi-step Job Scripts > Option 1 = Script Steps

#### Options

**5=Display**: Branches to a display of all the fields defining one Step master record, where the complete source line content is displayed.

#### Functions

- **F3=Exit**: Returns to the sub-menu.
- **F5=Refresh**: The display program updates all the information about every listed record by re-reading the entire Steps master file.
- **F12=Cancel**: Returns to the sub-menu.
- **F16=Search (next)**: When a value was typed in the Search Content key, after the Enter key is used to find the first match, this function key F16 will continue the search to find the next matching record.

#### Fields

- **Script Name**: The name of the Script for which Steps appear in the list.
- **Type**: The Script type code of STEPS or SRCMBR. When the Script type is SRCMBR, the list shows the (partial) contents of each record found in the referenced source file member.
- **Description**: The description from the Script master record.
- **Search content**: Type a value in this field and press <**Enter**> or <**F16**> to search all the master records for the first record that contains the value. The entire master record is searched, not just the fields appearing on the list display. After a new search is started, use the <**F16**> function key to continue the search to the next record.
- **Opt**: Type one of the options listed near the top of the display next to one or more of the listed lines, then press <**Enter**> to start executing each option, one by one.
- **Seq #**: The sequence number assigned to each record in the source file member. Decimal places are not marked in this display, but the last two digits occur to the right of the decimal point.
- **Label**: The display program searches each source member record for any TAG:, and if one is found, it is displayed in this column. This display logic can be used to confirm that TAGS: will also be found during actual script execution. If there is an unusual appearance of a tag, or if a tag is not found by this list display, then the source member record must be edited until the TAG: will be found by this LSAM tool.
- **Source member command**: The first part of the source member record is show in this list display. Use option 5=Display to view the entire source member line, which may occupy up to 80 or 100 bytes, depending on the record size of the source file. (The Command line field on the Step Details display is used for display purposes only, to show the content of source member records.)

## Multi-Step Job Script Step Maintenance and Display

### MLTJOBR10-5 - Display Multi-step Job Script Step Detail

The screen is used to illustrate the Display, Change, Copy and Add functions. For SRCMBR records, only option 5=Display is available.

#### Menu Pathways

- Main Menu > Restricted Mode and Multi-Step Job menu (#5) > Multi-step Job Scripts > Option 1 = Script steps > F6= Add
- Main Menu > Restricted Mode and Multi-Step Job menu (#5) > Multi-step Job Scripts > Option 1 = Script steps >Option 2 = Change
- Main Menu > Restricted Mode and Multi-Step Job menu (#5) > Multi-step Job Scripts > Option 1 = Script steps > Option 3 = Copy
- Main Menu > Restricted Mode and Multi-Step Job menu (#5) > Multi-step Job Scripts > Option 1 = Script steps >Option 5 = Display

#### Functions

- **F3=Exit**: Returns to the sub-menu.
- **F4=Prompt**: From the Compare Rule field, F4 requests a list window from which a valid Compare operator value may be selected. From the Command field, this function key calls the IBM i command prompter so that a properly formatted command can be returned. The IBM i command name should be typed before pressing F4 for best results.
- **F5=Refresh**: In Add, Change or Copy mode, this function key restores the display to its original values upon first display.
- **F7=DspSrc**: This function key works only for Step records that refer to an external source library/file(member) instead of using the Command field on the step record itself. The contents of the external source member will be displayed, using one of the IBM i source file member display tools that are available on a user's system.
- **F8=DynVar**: Requests a list of available Dynamic Variable token names, when used from the fields Compare Reference, Compare Data or Command.
- **F9=Evt Cmds**: From the Command field, this function key requests a list of valid OpCon external event commands. SMA recommends selecting the CPYTOMSGIN general command, since that selection will be followed by another window that offers a useful list of external event command templates that may be selected to help properly format the OpCon Event command.
- **F10=$VAR**: From the fields Compare Reference, Compare Data, and Command, this function key presents a pop-up list showing the supported $-System Variable tokens that can be selected for insertion into the field. Refer to the list of supported $VAR values, below.
- **F12=Cancel**: Returns to the list display without updating the master file.
- **F13=Full CMD**: This function key causes a program branch to a separate display that is dedicated to managing the entire Command line, supporting up to the maximum of 1024 characters. (For commands requiring a longer character string, use an external Source File, Library and Member.) In Change and Copy modes, if the Command string is already longer than the partial field shown on the primary Step record display, then the primary display field is protected and function key F13 must be used to maintain the longer, full Command string.

#### Fields

- **Script Name**: The name of the Script for which Step appears on this display.
- **Script Key #**: This field is for used by technical support personnel. It shows the internal primary key that links the Step record to its Script master record. (This technique allows the Script name to be changed.)
- **Step sequence number**: The sequence number assigned to each step record. For source member records, this is the sequence number assigned to the record in the source file member. Decimal places are not marked in this display, but the last two digits occur to the right of the decimal point.
- **Label**: For Step records, the LABEL value that is optionally applied to this step. Special values supported in the LABEL field (explained above) include:
  - ON_ERROR: Registers a command (with optional qualifier) that may be executed when any script fails. This special label value may be used multiple times, at any location in the Script, whenever the error response command should be changed.
  - ON_RESTART: This value marks an optional Step record that is only executed if a Script is restarted by the STRMLTJOB command  using a value other than "*FIRST" in the RSTLABEL parameter, before the Script resumes processing. This special label value  can be used only once in a Script.
- **Error Fail/Ignore**: Use a value of "F" = Fail to tell the script driver program that if the command in this step fails, the whole script job should stop and be marked failed. Otherwise, a value of blank or "I" (Ignore) tells the script driver to ignore errors and continue processing the next script step. If there is an ON_ERROR command registered, it will be executed even when the failed step is marked "I" for Ignore. To avoid this behavior, insert another ON_ERROR step that will change the currently registered ON_ERROR command to perform a command that has no important effect. The value of this field on a specially labeled ON_ERROR Step record will be used to decide if the Script should fail when the ON_ERROR command fails, as it is being performed when a Step record that was marked Ignore had a command failure. (Step records that were marked F=Fail when their command has failed will already cause the Script job to fail, whether or not the ON_ERROR registered command was successful.)
- **Status**: A value of "I" means inactive, and the Script Step will be bypassed by the script driver program. However, LABELs on Inactive records will still be useful. To disable a LABEL on an Inactive record, remove the LABEL and update that field to blanks. A value of blank or "A" means the Step record is active.
- **Description**: The description of the purpose of this Step record. (There is no description when a source member record is being displayed.)
- **Continue**: This field is not implemented in the original version of this LSAM feature. Similar to LSAM Response Rules, this field is intended to support composing a complex set of qualifier relationships into a single rule. Without this field, complex comparisons can only be performed by combining qualifier rules with SMAGOTO commands and LABELS that will bypass commands until two or more qualifiers are satisfied.
- **Compare reference**: This is the left-hand factor of a Boolean comparison that determines whether a Step command will execute or be bypassed.
- **Comparison rule**: The Boolean symbol or an English abbreviation for the operator that determines how the Compare Reference (to the left of the operator) is compared to the Compare Data (to the right of the operator).
- **Compare data**: This is the right-hand factor of a Boolean comparison that determines whether a Step command will execute or be bypassed.
- **Command**: For a Step command, this is the entire command that will be executed if the Step is active and qualified.
- **Soure file, Libr, Member**: Instead of using the Command field, a Step record can refer to an IBM i DB2 source file member where a longer command line may be stored using multiple source member records. When a source file member is referred to by a Step, function key F7=DspSrc may be used to call an IBM i command that will display the complete contents of the referenced source file member.
- **Last maintenance user, timestamp**: Shows the IBM i user profile that last used the LSAM maintenance program to change the master record, and the timestamp when this maintenance was performed.
- **Internal primary key**: An SQL auto-assigned record number field. This data may be used by technical support personnel.

### F10=$VAR Pop-up Window Values

Display formats MLTJOBR10-5 and MLTJOBR10-5A support function key F10 for selecting $-System Variable tokens that can be inserted into supported fields. These tokens do not require any special characters around them. Instead, they should be left inserted with the US dollar sign ($) at the beginning, all capital letters and spaces just where they are shown.

The Multi-Step Job Script driver program will recognize exactly spelled tokens and then replace them with the values shown in the following table; however, the values for OpCon properties, such as $SCHEDULE values, can only be replaced if the Script job was started by OpCon. They are not valid when Scripts are executed independently of OpCon, for example, if a Script is executed by a Message Management Parameters command or a Response Rule linked to Message Management.

#### Variable 
- **$ERRMSGID**:        The 7-character message ID reported by IBM i when any Script Step fails. This value can also be referenced from the currently active ON_ERROR management command.
- **$ERRMSGTXT**:       The primary message text of the 7-character message ID reported by IBM i when any Script Step fails. This value can also be referenced from the currently active ON_ERROR management command.
- **$FREQUENCY NAME**:  The name of the OpCon Frequency assigned to the OpCon job that started the Script job.
- **$IBM JOB ID**:      The full IBM i job ID for the job in which the Script is executing, in the format of 123456/USER/NAME.
- **$IBM JOB NAME**:    The IBM i Job Name of the job in which the Script is executing.
- **$IBM JOB NBR**:     The IBM i Job Number of the job in which the Script is executing.
- **$IBM JOB USER**:    The IBM i User Profile that is part of the Job ID in which the Script is executing.
- **$JOBID**:           The OpCon job identified, a 10-digit number, of the OpCon job that started the Script job.
- **$JOBID CMP**:       The OpCon job name and job identifier, joined into a single string with blanks compressed out, for the OpCon job that started the Script job.
- **$JOBID LONG**:      The OpCon job name, followed by the job identifier, with all blanks retained in the string, for the OpCon job that started the Script job.
- **$JOB NAME**:        The short format of the OpCon job name, for the job that started the Script job.
- **$JOB LONG NAME**:   The long format of the complete OpCon job name, for the job that started the Script job.
- **$MACHINE NAME**:    The OpCon name for the Agent (LSAM) machine in which the Script job is executing.
- **$SCHEDULE DATE**:   The date of the OpCon schedule under which the current job was started, in the (\*ISO0) format of CCYYMMDD.
- **$SCHEDULE NAME**:   The name of the OpCon schedule under which the current job was started.

## Multi-Step Job Script Step Full Command Maintenance and Display

### MLTJOBR10-5A - Multi-Step Job Step Command

#### Menu Pathways

Main Menu > Restricted Mode and Multi-Step Job menu (#5) > Multi-step Job Scripts > Option 1 = Script steps > Add/Change/Copy/Display \>
F13=Full CMD

#### Functions

- **F3=Exit**: Returns to the sub-menu, any pending updates are lost.
- **F4=Prompt**: This function key calls the IBM i command prompter so that a properly formatted command can be returned. The IBM i command name should be typed before pressing F4 for best results.
- **F5=Refresh**: In Add, Change or Copy mode, this function key restores the display to its original values upon first display.
- **F8=DynVar**: Requests a list of available Dynamic Variable token names.
- **F9=Evt Cmds**: From the Command field, this function key requests a list of valid OpCon external event commands. SMA recommends selecting the CPYTOMSGIN general command, since that selection will be followed by another window that offers a useful list of external event command templates that may be selected to help properly format the OpCon Event command.
- **F10=$VAR**: This function key presents a pop-up list showing the supported $-System Variable tokens that can be selected for insertion into the Command field. Refer to the list of supported $VAR values, above.
- **F12=Cancel**: Returns to the primary Step record display without updating the Command field.
- **Enter=update/return**: Press Enter to return to the primary Step master record display. In Add, Change or Copy modes, any changes made to the Command text will be stored to the master record when the Enter key is pressed.

#### Fields

- **Script Name**: The name of the Script whose Step appears on this display.
- **Step sequence number**: The sequence number assigned to each step record. For source member records, this is the sequence number assigned to the record in the source file member. Decimal places are not marked in this display, but the last two digits occur to the right of the decimal point.

## Delete Multi-Step Job Script Steps

### MLTJOBR10-6 - Multi-step Job Script Steps

#### Menu Pathways

Main Menu > Restricted Mode and Multi-Step Job menu (#5) > Option 1=Script steps > Option 4=Delete

#### Functions

- **F3=Exit**: Returns to the sub-menu.
- **F12=Cancel**: Returns to the list of Script Steps. All previous requests to delete Steps are discarded.
- **F14=Confirm**: Confirming the delete action causes the Step records to be erased from the master file. Erased records cannot be recovered (except by restoring master files from a backup copy).


## View Multi-Step Job Log

### MLTLOGR1 - Display Multi-Step Job Log

This screen compresses the Multi-Step Job log file produced by the Agent's script execution program, showing a list of all the jobs that executed one or more scripts.  The option 5=Display shows a list of all the detailed messages logged by the Agent for the selected job.

:::note  
List option 8=WRKJOB is very useful for this Multi-Step Job Scripting tool because the Agent script execution program optionally sends all of its log entries also to the IBM i job log.  The view of the IBM i job log is helpful for problem diagnosis, since it also includes IBM i OS messages interspersed with the Agent's log messages.  Option 7 from the sub-menu can be used to turn on or turn off this function of sending the Agent's script execution messages to the job log.
:::

#### Menu Pathways

Main Menu > Restricted Mode and Multi-Step Job menu (#5) > Option (#6)

#### Options

- **5=Display**: Branches to a display of all the fields defining one Script master record.
- **9=WRKJOB**: Initiate dialog to export this script, its steps, and all associated data.

#### Functions

- **F3=Exit**: Returns to the sub-menu.
- **F5=Refresh**: Reloads the list of jobs from the current values in the log file.
- **F11=Sort order**: This key can be pressed multiple times to change the sort order of the log's job entries.  The column headings on a color display will change color to indicate when the sort order is governed by one of these primary keys (while the other two are used as secondary sort order values): Job start time, iJobName or JobNbr.
- **F12=Cancel**: Returns to the sub-menu.
- **F16=Search next**: Starts or repeats a search looking for match to the value entered in the Search field. Each whole master record is searched, not just the values appearing on the list display.
- **F17=Top**: Jump to the first entry in the list, according to the current sort order.
- **F18=Bottom**: Jump to the last entry in the list, according to the current sort order.
- **F24=MoreKeys**: Rotates among multiple function key legends on display line 23.

#### Fields

- **Search content**: Type a value in this field and press <**Enter**> or <**F16**> to search all the log records for the first record that contains the value. After a new search is started, use the <**F16**> function key to continue the search to the next record.
- **Opt**: Type one of the options listed near the top of the display next to one or more of the listed lines, then press <**Enter**> to start executing each option, one by one.
- **Job start time**: A complete IBM i timestamp for the job start time.
- **iJobName**: The IBM Job Name value (up to 10 characters, max).
- **iJob User**: The IBM job's User Name, according to how the job was originally submitted.
- **JobNbr**: The 6-digit IBM i job number.
- **InitScript**: The name of the Multi-Step Job Script that was executed as the job started using this Agent feature.

### MLTJOBR2 - Display Multi-step Job Log Entries

The screen is used to illustrate the Display, Change, Copy and Add functions.

#### Menu Pathways

Main Menu > Restricted Mode and Multi-Step Job menu (#5) > Option (#6) > option (#5)

#### Functions

- **F3=Exit**: Returns to the LSAM sub-menu. 
- **F5=Refresh**: Reloads the log entries list display from the Agent database, and clears any pending list options.
- **F10=Fold/Unfold**: This key changes the list view so that one or more lines are used to display the full log text content for each record included in the current "page" of the file list.  In the Unfolded mode, the list display may require multiple PageDown key entries to view all the records available from the current "page" of log records that were selected when the display was in its record profile list format.  Using PageDown in this mode will show all the Unfolded records first, possibly including what appears to be a partial list at the end of the current on-display "page", but then PageDown will return control to the Agent's display program to show the next logical "page" of records.
- **F11=View**: Alters the list display between the log entry profile fields, and a display of the first few characters of the log entry text.
- **F12=Cancel**: Returns to the Script jobs list.
- **F16=Search next**: Starts or repeats a search looking for match to the value entered in the Search field. Each whole master record is searched, not just the values appearing on the list display.
- **F17=Top**: Jump to the first entry in the list.
- **F18=Bottom**: Jump to the last entry in the list.
- **F24=MoreKeys**: Rotates among multiple function key legends on display line 23.

#### Fields

- **Search content**: Type a value in this field and press <**Enter**> or <**F16**> to search all the log records for the first record that contains the value. After a new search is started, use the <**F16**> function key to continue the search to the next record. This search function can match any content found in the entire log record - it is not limited to only the values on the list display.
- **Opt**: Type one of the options listed near the top of the display next to one or more of the listed lines, then press <**Enter**> to start executing each option, one by one.
- **Script name**: The name of the Script. This is the value that will be used by the STRMLTJOB command or the SMAGOTO pseudo-command to reference any Script.
- **StpSeq**: The Script Step Sequence number associated with the log entry.
- **Step Label**: An optional value assigned to the Step Master record that is used for (1) sending the script job progress report to the OpCon user interface job status display, and (2) a target for the SMAGOTO command to support routing of the Script processing so that this was the next step to process, typically out of sequence with the Step Sequence number.
- **DD_HH_:MM:SS**: The Day, Hour, Minute and Seconds when the log entry was sent to the Agent's Script log file.
- **Msg IDr**: Message identifier.  This can be either an IBM i message file ID, possibly representing an error condition detected by the operating system, or it can be a special value assigned by the Agent's Script execution program to categorize the log entry.
- **Log text...**: A character string that is the first part of the log entry text content, when the list view is in the record profile View; or this can be all or part of the log entry text after pressing F11=View and/or presssing F10=Fold/Unfold to control a display of the full log entry text.

## Script Utility Configuration

### MLTJOBD301 - Scipt Utility Configuration

The screen supports registration of Agent options for the Multi-Step Job Script utility.

#### Menu Pathways

Main Menu > Restricted Mode and Multi-Step Job menu (#5) > Option (#7)

#### Functions

- **Enter**: Pressing <**Enter**> records any changes made to the Configuration options.
- **F3=Exit**: Returns to the LSAM sub-menu without updating the Agent control file.
- **F12=Cancel**: Returns to the LSAM sub-menu without updating the Agent control file.

#### Fields

- **Environment**: The user-defined name for the Agent environment (database) being maintained.
- **Version**: The Agent's current base release number.
- **MLTJOB step loop limit**: A value that the Agent's Script execution program uses to detect a possible Script Step loop that could have been accidentally created by the builder of the script.  This is the number of times any one Script+Step is allowed to be executed before the Agent's Script execution program decides that there is a loop and the execution of the script should be halted as an error message is logged.  A value of 999 tells the Script execution program that all Script Steps may be executed any number of times, with no limit, meaning that the loop detection function is disabled.  Scripts that perform branching operations must be carefully tested by the user to be sure that eternal looping of Script execution is not possible, whenever the loop detection value has been set to 999.

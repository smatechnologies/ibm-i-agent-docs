---
sidebar_label: 'PTF Menu Screens and Windows'
---

# PTF Menu Screens and Windows

The LSAM menu 9: PTF and Security menu, option 8. Work with object authority is described in LSAM Security and Object Authority.

## PTF and Security Menu

PTF and Security Menu

```
 S218CBBW                    PTF AND SECURITY MENU                     01/01/01 
 USERNAME                                                              01:01:01 
                                                                                
  Select one of the following:                                                  
                                                                                
                                                                                
      1. Work with LSAM PTFs                                                    
      2. Master PTF request, load and apply (SMAPTFINS)                         
      3. Request PTF information or save files (SMAPTFREQ)                      
      4. Load PTF information or save files (SMAPTFLOD)                         
      5. Apply cumulative PTF (SMAPTFCUM)                                       
      6. Apply single PTF (SMAPTFAPY)                                           
      7. PTF options configuration                                              
      8. Work with object authority                                             
                                                                                
                                                                                
                                                                                
                                                                                
 Selection or command                                                           
 ===>                                                                           
                                                                                
 F3=Exit   F4=Prompt   F9=Retrieve   F12=Cancel                                 
 F13=Information Assistant  F16=System main menu                                
```

#### Menu Pathways

Main Menu > PTF and Security menu (#9)

#### Options

- As listed on menu example, above.
- The option 8. Work with object authority is described in LSAM Security and Object Authority.

#### Functions

- **F3=Exit**: Returns to the master menu.
- **F4=Prompt**: Prompts for keywords for any command entered in the Select or command line.
- **F9=Retrieve**: Retrieves the previous command that was entered on the Select or the command line. If it is pressed multiple times, the system goes further and further back to previous commands.
- **F12=Cancel**: Returns to the master menu.
- **F13=Information Assistant**: Branches to the IBM i general help screen.
- **F16=System main menu**: This is always shown on any system-generated menu screen. It branches to the general command entry menu for IBM i. Return to the previous menu by pressing <**F3**> or <**F12**>. This function is not commonly used and
    can be restricted for certain user profiles.

## PTF Options Configuration

### LSAPTFD301 - PTF Process Defaults Configuration

The PTF Options Configuration function must be reviewed and possibly updated before attempting to use any of the other PTF functions in LSAM Menu # 9. The impact of the control values maintained by this function is discussed above, among the operational guidance topics.

Special attention is called to the first data entry field on this display: PTF Source. Although there are four different methods supported for distributing and installing LSAM PTFs, most clients of SMA Technologies are using the "IFS" method because it does not require penetration of firewalls protecting the IBM i
partition, and because this well-documented installation method is fast and easy to use. However, sites that operate a large number of IBM i partitions inside of a secured local network could take advantage of the fully automated distribution and installation method that is supported by the PTF source of "FTP."

#### Menu Pathways

Main Menu > PTF and Security menu (#9) > PTF options configuration (#7)

#### Fields
- **PTF Source**: LSAM PTF installation files can be distributed and made available to the IBM i partition in four different ways. SMA Technologies recommends using the IFS method. Refer to "Options for PTF Distribution" in this section for an explanation of the requirements for using any of these options.
  -   FTP = LSAM PTF installation save files can be downloaded directly from an ftp server operated by SMA Technologies, as a first step in a fully automated solution for obtaining and then installing the LSAM PTFs. 
  -   OPT = On demand, SMA Technologies can prepare an optical disk that contains the LSAM PTF save files. The LSAM administrator would insert the optical disk into a drive that is attached to the IBM i partition, before starting the LSAM PTF installation process.
  -   IFS = LSAM PTF installation save files are manually transferred by the LSAM administrator to a directory of the /root file system in the IBM i partition's Integrated File System (IFS), before starting the LSAM PTF installation process.
  -   NTC = It is possible to utilize the IBM i NetServer service which enables a connection between the IBM i partition and directories located on a Microsoft Windows ™ server or personal computer. For this method, the LSAM PTF save files would first be transferred to a designated MS Windows location, and that location would be entered into the Source directory or path field, before starting the LSAM PTF installation process. 
- **SMA ftp user**: For the PTF source "FTP" enter the user ID required for the client to log into the SMA Technologies secure ftp server.
- **ftp password**: For the PTF source "FTP" enter the password associated with the ftp user into this hidden data value field.
- **Confirm pwrd**: Type the same password value as in the field ftp password. This field confirms that the masked value typed into the ftp password field is  what the user believes was typed into the other field.
- **FTP URL or IP address**: For the PTF source "FTP" enter the URL or IP address of the [SMA Technologies]{.GeneralCompanyName} secured ftp server, or of a local network ftp server. The LSAM software is distributed with the actual correct value for the [SMA Technologies]{.GeneralCompanyName} secured ftp server location; however, if the connection address does not work, please contact SMA Support to confirm if the server address may have changed.
- **Source directory or path**: Refer to the "Options for PTF Distribution" topic in this section for detailed instructions about the form of the directory 
or path value that is required, depending on the method chosen for the PTF Source.
- **PTF -- LSAM server stop option**: Each PTF control record is marked if it requires the LSAM server jobs to be suspended while programs and/or files are being replaced. Note that the LSAM stop action will not be repeated for each PTF when a collection of cumulative PTFs is being installed at once, but the PTF installation program will leave the LSAM server job(s) stopped until the installation of all PTFs in the cumulative collection is completed. If necessary, the PTF installation process will perform one of the following actions:  
  -   A = Stop all LSAM server jobs if any one server job is required to be stopped.
  -   I = Stop only the server job that is affected by each individual PTF.
  -   F = Do not perform any automatic stopping of the LSAM server jobs, but stop the PTF installation process with a failure error message if a PTF needs any LSAM server job to be stopped.
- **PTF -- Restart servers option**: Whenever an individually installed PTF, or a cumulative collection of PTFS, has been successfully installed, the LSAM PTF installation program may automatically restart the LSAM server jobs. The automatic option is useful for completing a fully automated LSAM PTF installation schedule; however, LSAM software developers might typically prefer to prevent automatic restarting of the LSAM server jobs.
  -   A = Automatically restart all LSAM server jobs. 
  -   M = LSAM server jobs will only be restarted when manually requested, using either an LSAM menu option or the LSAM command: SMAGPL/STRSMASYS
ENV(lsam-environment-name).

#### PTF Process Default Values:
- **Submit job?**: The LSAM PTF installation process can be submitted as a batch job, which is usually more efficient and helps to prevent a performance impact on interactive workstation system users. This control file option can be changed each time the LSAM PTF install process is started.
  -   Y = Yes, do submit the PTF install process to a batch job.
  -   N = No, use the current interactive job of the LSAM administrator who has requested the PTF installation and execute the task immediately within the interactive workstation job. (This interactive method is sometimes preferred during the first execution of PTF installation just after an LSAM has been installed, in order to more quickly discover the cause for any error in the task, such as incorrect job configuration options.)
- **Auto-load after request?**: The LSAM PTF installation process can be executed step by step, using different LSAM menu options. In order to isolate PTF installation steps (usually only done as part of a problem diagnostic process), this option makes it possible to stop the PTF install process immediately after 
obtaining the LSAM PTF save files; however, in most cases this option should be left set to Y = Yes.  
  -   Y = Yes, continue with restoring and loading the LSAM PTF control files after the LSAM PTF save files have been transferred to the local IBM i partition.
  -   N = No, stop the PTF Install process after obtaining the LSAM PTF save files, so that problem diagnosis can be performed before continuing to restore and load the save file content into the LSAM database.
- **Job description, Library**: When the LSAM PTF installation process will be submitted to a batch job, these control values make it easy to set up the batch job definition; however, these values can be changed each time the PTF Install process is started.
:::tip
The job description must include the correct initial library list that matches the current LSAM environment (usually named SMADEFAULT). Be sure to change the library location of the job description if a non-default LSAM environment is being used.
:::

- **Job queue, Library**: When the LSAM PTF installation process will be submitted to a batch job, these control values make it easy to set up the batch job definition; however, these values can be changed each time the PTF Install process is started.
  :::tip Important Note
  Do not use the special value of *JOBD for the job queue name, whenever the LSAM server job description (SMALSAJ00) is being used, because the LSAM server subsystem will likely be suspended if any PTF requires that, and this would cause the PTF installation job to be ended abnormally. This is why the default values for the job queue are QGPL/QBATCH, although any IBM i subsystem that is appropriate for batch jobs can be used (that is, a job queue that is connected to that subsystem can be used).
  :::

#### Functions

- **F3=Exit**: Quits the list display and returns to the menu. Changes made to the values on display will not be applied to the control file.
- **F12=Cancel**: Quits the list display and returns to the menu. Changes made to the values on display will not be applied to the control file.

## Work with LSAM PTFs

### LSAPTFR1 - Work with LSAM PTFs

The Work with LSAM PTFs function lists all the PTF information that has been requested and loaded from the LSAM PTF source. In addition to the available (unapplied) PTF control information, this list shows the status of applied PTFs for the current LSAM environment. The PTF control data is stored in the SMAGPL library.

#### Menu Pathways

Main Menu > PTF and Security menu (#9) > Work with LSAM PTFs (#1)

#### Fields
- **LSAM, SMAGPL, UTIL**: At the top, left of the display appear three fields that report the content of control data areas defining the LSAM environment:
  -   LSAM = the LSAM Name, known in OpCon as the Machine Name
  -   SMAGPL = the name of the DB2 library that contains the Agent's convenience utilities; usually SMAGPL (or its equivalent), some older sites had used QGPL to hold these LSAM tools
  -   UTIL = the name of the SMAGPL library where the LSAM PTF tools are stored. 
- **PTF LVL**: There are three different patch levels listed at the top, middle of the display, just under the screen title:
  -   LSAM PTF LVL: This is the critical PTF Level that must be reported by users to SMA Support, when requested. This is the master patch level of the overall Agent software.
  -   DB PTF LVL: This is the database level. This level controls when two LSAM environments match for the purpose of exchanging data using the LSAM Data Export/Import tools. Multiple PTFs will be assigned at the same DB LVL. 
  -   UTIL PTF LVL: This less-critical value is useful for SMA Technical Support. It shows which Agent software patches were applied affecting the content of the SMAGPL and UTIL libraries (explained in the Field row just above). 
- **SMAGPL**: The name of the actual library used to store the LSAM environment management utilities. This may be the same as the utility library (SMAGPL), or it may be the IBM i QGPL library.
- **Subset**: Shows the current subset rule in effect. Us function key <**F15**> to change the subset rule that controls the list content on display.
- **Search content**: Type in a value that will be used to search the entire content of every record on the display (limited only by the current subset rule). Even data that does not appear in the list display is searched. Use option 5=Display to see all the details for a record discovered by the search. Function key <**F16**> can be used to continue a search after the first record is found.
- **Opt**: Type one of the options listed at the top of the display to act on an individual record in the list. More than one option may be typed at once before the <**Enter**> key is pressed to initiate the option actions.
- **PTF Name**: The name of the PTF. This name is a key value used for identification purposes only. It is the name that will appear in the PTF Level field for the LSAM Environment (and/or the SMAGPL utility library).
- **Seq Nbr**: The application order sequence number assigned to the PTF. This number controls the critical order of application for PTFs and it helps determine PTF dependencies.
- **PTF-lvl-DB**: Two list columns show the LSAM PTF Level and the Database Level that is assigned to each PTF in the list. The PTF Level is the critical level for indicating the overall patch level of the software, but it is separate from the PTF Name and the Sequence Number, where the Sequence Number is used to control the order in which patches are automatically applied.
- **Sts**: The current status of the PTF is shown: 
  -   blank = not applied
  -   A = applied (or re-applied - refer to PTF details)
  -   R = rolled back
- **Dwn**: Down: This column shows a value of '1' if the PTF is marked as requiring that any of the LSAM server jobs must be stopped while the PTF is applied. Be sure to plan carefully for LSAM down time before attempting to apply a PTF that requires down time.
- **PIn**: Post-Install instructions are included with this PTF. Use option 8 to display the text of the post-install instructions. Be sure to carefully evaluate all PTFs marked with post-install instructions before planning their installation. It is possible that certain PTFs require special attention and cannot simply be applied as part of a cumulative PTF application to a live LSAM environment.
- **Doc**: Documentation changes have been published in coordination with this PTF. Consult the PTF instructions for information about how to obtain the documentation updates. Usually, documentation updates are made available in documentation; sometimes the **IBM i LSAM** documentation is republished at a newer point version to include a substantial documentation enhancement.
- **Description**: A short description of the PTF is provided for this list display. The short description information may or may not include a special warning about the PTF. Use option 5=Display to see the long description of the PTF, in order to learn more about the changes that the PTF will make to the LSAM software, such as the key problem that a PTF may solve.

#### Options

- **4=Rollback**: Selects a PTF for rollback. When <**Enter**> is pressed, the LSAM PTF rollback command (SMAPTFRBK) prompt screen will appear, requesting additional information or verification of the rollback parameters. This option is the same as using the LSAM menu PTF rollback function.
- **5=Display**: Select a PTF record to view the full detailed profile of the PTF, including the long description. (Use option 7=Details to see a list of objects included in the PTF.)
- **6=Apply**: Selects a PTF for application. When <**Enter**> is pressed, the LSAM single PTF application command (SMAPTFAPY) prompt screen will appear, requesting additional information or verification of the application parameters. This option is the same as using the LSAM menu single PTF application function.
- **7=Details**: Select a PTF to view a list of the LSAM software objects affected by this PTF.
- **8=Instr**: If a PTF shows a '1' in the PIn column, option 8 may be used to view the PTF source file member that contains the post-install instructions text.

#### Functions

- **F3=Exit**: Quits the list display and returns to the menu. Any options already completed will still apply.
- **F5=Refresh**: Reload the display from the database file, clearing any pending options that were previously entered but not executed. This function key also resets any search rule that is in effect, but it does not reset the current subset rule.
- **F9=Print**: Print a report that shows all the PTFs currently selected by the subset rule that is in effect.
- **F11=Sort Seq#/Name**: Use this function key to toggle between sorting the list by PTF Name, or by PTF Sequence Number. The heading line on the list uses a pink color to show which sort option is currently in effect.
- **F12=Cancel**: Quit the list display return to the menu without executing any remaining options that may have been entered. Options previously executed will still apply.
- **F15=Subset**: Change the current list subset rule, or clear subsetting to show all records. The current subset rule that is in effect is shown in the Subset field at the top, left of the list display. Refer to window description, below.
- **F16=Search next**: This function key or the <**Enter**> key may be used to start a search when a value has been entered in the Search content field, but only <**F16**> may be used to continue the search on to the next matching record after the first match has been found.
- **F17=Top**: Move the list display to the first record in the list.
- **F18=Bottom**: Move the list display to the last record in the list.
- **F21=Post inst**: Show a list of all available post-install instruction source members. NOTE: The IBM i SEU function is used to show the list of data members in the LSAM source physical file where post-install instructions are store, one member for each affected PTF Name. This SEU function appears to allow option 2=Edit to change the source members, and while clients may wish to use this access to add their own critical notes, SMA does not recommend changing the distributed instructions. SMA cannot be responsible for damage to the software or LSAM database that may result from altering the instructions.
- **F24=More keys**: Press this function key to toggle between lists of available function keys. All available function keys may be used, even when not shown.

## F15=Subset PTF List Window

### LSAPTFW1 - Subset PTF List

Use the function F15=Subset to limit the records appearing in the list of LSAM PTFs.

#### Menu Pathways

Main Menu > PTF and Security menu (#9) > Work with LSAM PTFs (#1) > F15=Subset

#### Fields
| Field          | Default      |  Description
| -----          | -------      |  -----------
| Select subset  |  current subset rule | Type a number from the list of options in the window to select the subset rule. Option 9 (show all) is used to clear subset rules and show a list of all the LSAM PTFs.

#### Functions

***F12=Cancel***: Quits the subset window and return to the list display without changing the subset rule.

## Display LSAM PTF Control

### LSAPTFR2 - LSAM PTF Control

#### Menu Pathways

Main Menu > PTF and Security menu (#9) > Work with object authority (#8)

#### Fields
- **LSAM environment**: The name of the current LSAM environment; governs the content of the list display. 
- **LSAM PTF LVL**: This is the master PTF Level control number assigned to this PTF. Each PTF has a unique PTF Level assigned to it. This information is global for the LSAM and not specific to the one PTF on display.
- **DB LVL**: This is the database level that is assigned to this PTF. Many PTFs may be applied at the same database level. The DB LVL governs the LSAM Data Export/Import tools, controlling when two LSAM environments are matched and may exchange data. This information is global for the LSAM and not specific to the one PTF on display. 
- **SMAGPL/UTIL libs**: The third line of headings on this display format starts with the names of the two libraries that are used for the SMAGPL and UTIL purposes (as described in the Work with PTF list display). These two logical locations are usually assigned to the same library name. This information is global for the LSAM and not specific to the one PTF on display.
- **SMAGPL/UTIL LVL**: This is the highest PTF Level that was last applied to the SMAGPL and UTIL library location(s). The SMAGPL/UTIL PTF level may be helpful to SMA Technical Support personnel. This information is global for the LSAM and not specific to the one PTF on display.
- **PTF Name / Seq #**: The identifying name of the PTF, followed by the PTF sequence number that controls the critical order of PTF application.
- **Issue date, time**: The date and time assigned to the PTF as it was issued. This information could be critical if it ever becomes necessary for SMA to replace a faulty PTF.
- **LSAM PTF level**: The LSAM version to which the PTF applies, e.g., 04.00.03. A PTF must match the current LSAM version in order to be eligible for application. The PTF list program filters and includes only PTFs that match the current version of the LSAM.
- **PTF apply pgm**: The name of a custom program provided by SMA to apply the PTF. If not blank, this program will be used in place of the standard PTF application routines that would normally apply at PTF.
- **PTF priority**: NOT USED. SMA may use this field in the future to help control the priority of critical versus non-critical PTFs.
- **Keywords 1, 2, 3**: NOT USED. SMA may add information to these fields to enhance the search capability available on the list display. Keywords are useful for identifying PTFs that apply to a particular LSAM feature or to an easily recognized error message ID.
- **PTF save file**: The name of the save file used by SMA to deliver the PTF replacement objects. The save file names are normally limited to 8 characters so that they can be easily viewed, recognized and automatically retrieved from optical media (CD or DVD). 
- **Rollback SAVF**: The name of the rollback save file that was automatically generated by the LSAM PTF application tool, used to store the old versions of objects that were replaced by the PTF. The rollback process uses this save file, stored in the SMAPTF (or equivalent) library, during the rollback process. (If a PTF is re-applied, a secondary rollback save file is generated, to preserve an accurate record of system history. However, the original rollback save file will always be used for a subsequent repeated rollback procedure. SMA Support personnel must assist if there is every a reason to force the secondary rollback file to be used instead of the original rollback file.)
- **Updt GPL/UTL/LSA**: 
  -   These three indicators are each set to a value of '1' to indicate when a PTF will affect:
      -   GPL = The SMAGPL library objects for LSAM environment control, may be the IBM i QGPL library. 
      -   UTL = The LSAM utility library, always  SMAGPL unless an override name was specified at installation.
      -   LSA = The PTF affects the LSAM database or program objects libraries.
  -   PTF procedures automatically adapt in cases where a PTF affects only the GPL and/or UTL libraries, and not the LSAM libraries.
- **Post-Inst/DocRev**: These indicators are set to a value of '1' if:
  -   The PTF includes post-install procedures that must be viewed.
  -   The PTF is associated with an update to the LSAM documentation.
- **Applied status**: The applied status fields indicate the following: 
  -   Current status: blank=not applied, A=applied, R=rolled back. 
  -   Ever applied: If '1', the last applied date shows below this flag. 
  -   RBK eligible: If not set to '1', a PTF may not be rolled back. This may imply that any previous PTFs with dependencies on this PTF may also not be rolled back. In an emergency, SMA Support assistance would be required to repair LSAM software if it appears that a not-eligible PTF has caused and problem. However, since the PTF is not eligible for rollback, the fix for any problem would normally be another PTF to fix the bad PTF.
  -   Ever rollback: If this field is set to '1', a last rollback date will appear below the flag. If a re-applied PTF must be rolled back a second time, the setting of this flag at '1' would signal that a secondary rollback save file will be created.
- **Down indicators**: 
  -   These indicators help control the LSAM PTF tool automatic functions that stop and restart the various sub-groups of LSAM server jobs. The server jobs are arranged by groups so that, for example, it may not be necessary to stop job scheduling if only the SMAFT server is affected. 
  -   The "Any function" flag is an overall indicator that also shows on the list of PTFs. This flag will be set to '1' if any of the other LSAM server sub-group flags are set to '1'. If any PTF down time is required, an analysis of these detailed flags will help the site determine the impact and planning of the required down time.
- **Record date/time**: An SMA internal field that shows when the PTF control record was last maintained.
- **Prim key**: The primary key field of the PTF control record. This information is only for use by technical support personnel.
- **LSAM application**: NOT USED. SMA may assign an LSAM feature name to a PTF in order to help identify which aspect of the LSAM software is affected by the PTF. This information could be useful because it would be found using the Search content function on the PTF list display.
- **Environ**: The name of the LSAM environment that this PTF control record is assigned to. Unapplied PTFs will always show a value of "SMAGPL" in this field; applied PTFs will show the name of the current LSAM in this field.
- **PTF short desc**: The short description of a PTF that appears on the PTF List display. SMA uses this field to highlight critical information about a PTF.
- **PTF long desc**: A longer description of the PTF that helps understand what problem is fixed or what enhancement is offered by a PTF.

#### Functions

- **F3=Exit**: Quits the PTF control record display and returns to the menu.
- **F6=(Re-)Apply**: If a PTF is at an eligible status, this function key is the same as option 6=Apply on the list display. After a dependency check, a prompt screen will appear for the command SMAAPYPTF.
- **F7=Details**: Branches to a display of all the objects affected by this PTF.
- **F11=Rollback PTF**: If a PTF is at an eligible status, this function key is the same as option 4=rollback on the PTF list display. After a dependency check, a prompt screen will appear for the command SMAPTFRBK.
- **F12=Cancel**: Return to the PTF list display.
- **F21=Post inst**: If the PTF is marked as having post-install instructions, this function key appears and supports a branch to the IBM i SEU utility display of the text of the post-install instructions source member.
- **F22=Find conflicts**: This function key may be used to discover any PTFs that would conflict with the current PTF's next possible operation. If a PTF is unapplied or rolled back, the conflicts would be for any prior PTFs that are required. If a PTF is applied, then the conflicts would be for any future PTF already applied that would prevent a rollback.
- **F24=More keys**: Toggle the function key legend to show other supported function keys.

## Option 7/Function Key7=Details

### LSAPTFR3 - Details List for PTF ptfname

The list of all objects affected by a PTF supports an important option that will list all PTFs affecting the object selected with option 9. The list shown for option 9 is the same as the primary list of PTFs, except that the title line indicates it is a list of PTFs for just one object.

#### Menu Pathways

- Main Menu > PTF and Security menu (#9) > Work with LSAM PTFs (#1) > option 7=Details
- Main Menu > PTF and Security menu (#9) > Work with LSAM PTFs (#1) > option 5=Display > F7=Details

#### Fields
- **LSAM,Ver,PTF LVL**: The LSAM environment name is shown, followed by the LSAM version installed in this environment and the current PTF level (which is either the latest PTF name applied, or the latest PTF that was rolled back).
- **UTIL,Ver,PTF LVL**: The actual name of the SMAGPL library or its replacement is shown, followed by the LSAM version installed in this utility library (should be the same as the LSAM version) and the current PTF level (which is either the latest PTF name applied, or the latest PTF that was rolled back) that was applied to the SMAGPL library.
- **SMAGPL**: The name of the actual library used to store the LSAM environment management utilities. This may be the same as the utility library (SMAGPL), or  |
it may be the IBM i QGPL library.
- **Subset**: Shows the current subset rule in effect. Us function key <**F15**> to change the subset rule that controls the list content on display.
- **Search content**: Type in a value that will be used to search the entire content of every record on the display (limited only by the current subset rule). Even data that does not appear in the list display is searched. Use option 5=Display to see all the details for a record discovered by the search. Function key <**F16**> can be used to continue a search after the first record is found.
- **Last search**: Shows the search argument that is current in effect. F16=Search next can be used to find the next record matching this search argument, after the first match is found, as long as a value is show for this field.
- **Opt**: Type an available option number and press <**Enter**> to execute the option.
- **Object**: The name of the LSAM program, file or other object.
- **Library/Path**: The base product library name where this object is located after installation. Base names such as SMADTA for the LSAM database library will be replaced by the actual database library name in alternate LSAM environments.
- **Loc**: 
  -   DB2 = integrated IBM i DB2 UDB database 
  -   IFS = Integrated File System             
- **Type**: The IBM i mnemonic for the object type, such as *PGM or *FILE.
- **Attribute**: The IBM i mnemonic for the object sub-type, such as CLLE or RPGLE for type *PGM.
- **Case ID**: The SMA support incident tracking number or enhancement project ID. 

#### Options

- **5=Display**: Show a detailed definition of the PTF control information for the selected object.
- **9=All PTFs**: Displays a list of all objects affected by a PTF. The list shown for option 9 is the same as the primary list of PTFs, documented above, except that the titl line indicates it is a list of PTFs for just one object.

#### Functions

- **F3=Exit**: Quits the list display and returns to the menu. Any options already completed will still apply.
- **F5=Refresh**: Reload the display from the database file, clearing any pending options that were previously entered but not executed. This function key also resets any search rule that is in effect, but it does not reset the current subset rule.
- **F9=Print**: Print the list of all objects affected by the selected PTF.
- **F12=Cancel**: Quit the objects list display return to the LSAM PTFs list display without executing any remaining options that may have been entered. Options previously executed will still apply.
- **F16=Search next**: This function key or the <**Enter**> key may be used to start a search when a value has been entered in the Search content field, but only <**F16**> may be used to continue the search on to the next matching record after the first match has been found.
- **F17=Top**: Move the list display to the first record in the list.
- **F18=Bottom**: Move the list display to the last record in the list.

## Display PTF Object Details

### LSAPTFR4 - Detail Record for PTF OOOOOOOOOO

The detail screen for a PTF object supports convenient branching function keys. F20-Show all PTFs for Obj is the same as option 9=All PTFs from the object list display.

#### Menu Pathways

Main Menu > PTF and Security menu (#9) > Work with object authority (#8) > option 7=commands > option 2=Change **- or -** option 3=Copy **- or -** F6=Add

#### Fields
- **Detail Record for PTF**: The name of the PTF controlling the object in this details display.
- **LSAM environment**: The name of the current LSAM environment.
- **Version, PTF LVL**: Under the LSAM environment name, shows the LSAM software version of the current environment, followed by the name of the latest PTF applied.
- **SMAUTL, PTF LVL**: Shows the name of the LSAM utility environment that supports this LSAM environment, normally library SMAGPL, and the latest PTF level applied to that library.
- **SMAGPL**: The name of the actual library used to store the LSAM environment management utilities. This may be assigned to the IBM i QGPL library.
- **SMACTL or LSAM Environment**: The target library location of the object.
- **PTF sequence number**: The sequence number that governs the critical order of application for PTFs.
- **Support ticket/case ID**: The SMA ID of the issue or project tracking system controlling the changes to this object. It is possible for more than one support issue or enhancement project to be included in a single PTF, although most commonly a PTF will be linked to just one of these.
- **Chg mgmt project name**: The SAM IBM i change management system project identifier that controlled the changes to this object.
- **Disk storage location**: 
  -   DB2 = integrated IBM i DB2 UDB database (refer to DBw object name and library fields)
  -   IFS = Integrated File System (refer to IFS object name and directory path fields, lower on the display)
- **DB2 object name**: When the disk location is DB2, the name of this object.
- **DB2 library name**: When the disk location is DB2, the library where this object is located. The LSAM base name, such as SMADTA, will be replaced by the actual library name for alternate LSAM environments. 
- **Object type**: The IBM i mnemonic for the object type, such as *PGM or *FILE.
- **Object attribute**: The IBM i mnemonic for the object type, such as CLLE or RPGLE for type *PGM.
- **CCSID of data objects**: If applicable, the character set ID assigned to a database file or data area.
- **Duplicate data**: For database files, indicates that the file sent from SMA contains control data that is normally distributed to client installations.
- **Data convert program**: When not blank, names a specialty program that must be called at the time an object is replaced by the PTF. For database files, this program would be used instead of the default CPYF operation typically used to retain and convert existing client data.
- **Original apply time**: The system time stamp when the PTF was first applied to this LSAM environment (or to the SMAGPL utility library).
- **Apply seq**: The critical application sequence number assigned to each object affected by a PTF. Application sequence is especially critical, for example, to properly convert physical files and the logical files that depend on them. Out of sequence, file management could cause the PTF 
application process to fail.
- **Rollback/Reapply times**: Two time stamp fields that record when the Rollback and/or the Re-apply actions were last executed.
- **Record write/update**: SMA internal use, identifies when the PTF object control record was last updated. This information could be important if it becomes necessary to replace a faulty PTF.
- **Prim key**: For use by technical support personnel only, this is the primary key of the object record in the PTF details  master file.
- **IFS object name**: When the disk location is IFS, this is the name of the object. 
- **IFS directory path**: When the disk location is IFS, this is the directory where the object will be replaced. (The PTF applications tools will handle any path replacement required when an alternate LSAM environment is being used.) 

#### Functions

- **F3=Exit**: Quits the detail display and returns to the menu.
- **F11=View PTF ID**: Branches to a display of the PTF control information for the PTF controlling this object.
- **F12=Cancel**: Quit the detail display and return to the list display and return the list of PTF objects.
- **F20=Show all PTFs for Obj**: The same as option 9=All PTFs from the object list display, this function key branches to a list of all PTFs that affect this object. The PTF list display is the same as the Work with LSAM PTFs list, documented above, except that the title line will show the name of the reference Object whose PTFs are being listed.

#### PTF Request and Application Menu Functions

The following menu functions result in a display of a prompted IBM i command parameters screen for each of the LSAM commands listed on the menu:

2. Master PTF request, load and apply (SMAPTFINS)
3. Request PTF information or save files (SMAPTFREQ)
4. Load PTF information or save files (SMAPTFLOD)
5. Apply cumulative PTF (SMAPTFCUM)
6. Apply single PTF (SMAPTFAPY)

Typically, these command prompting functions are followed by a program-formatted display of the process control information. This second display appears to contain most of the same information as the command prompt, but the display shows how any command parameter default values (such as when asterisk (*) is specified) were resolved by referring to the LSAM PTF options configuration control data. Final changes may be made on these secondary displays, if necessary, before the operation is committed to execution.

The contents of the PTF process control fields are explained in detail above, under the topic of How to obtain and apply PTFs. Also refer to the Screens and Windows description of the PTF options configuration, LSAM menu 9, option 7. In other cases, the information requested by commands, such as the SMAPTFAPY command to apply just one PTF at a time, must be obtained from the detail record displays accessed from Work with LSAM PTFs (LSAM menu 9, option 1).
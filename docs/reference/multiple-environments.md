# Installing Multiple Environments

## Introduction

The term environment is being used to designate a group of IBM i libraries that comprise a library list. Each IBM i LSAM environment has its own library list.

Normal operations of the IBM i LSAM require only one environment. As the Agent software is installed, the default library list (environment SMADEFAULT) is assumed unless it is specifically overridden in the SMASETUP command and during the installation configuration prompts. The only time it is necessary to add an extra environment with a different library list is when a developer or administrator needs to test LSAM operations off line from the live (production) environment. Whenever possible, SMA recommends using a separate IBM i partition for installing a test LSAM environment, since there are two functions (Job Tracking and Restricted Mode) that experience conflicts if two LSAM environments exist within the same IBM i partition.

Creating and using extra IBM i LSAM environments requires an understanding of OpCon and LSAM operations and knowledge about the IBM i operating system, including an understanding of library lists and work management. Also study the detailed explanation of the multiple environment commands in LSAM Environment Management: STRSMA, LSAMENU, SMASETLIBL, SMALIBMGT and SMALIBINQ, before attempting to use the following procedures for creating and starting an extra LSAM environment.

There are two approaches that SMA supports for installing an alternate LSAM environment:

- Install a new environment from the installation save file using the SMASETUP command (refer to [IBM i Agent 18.1 Installation/Upgrade Instructions](../installation/installation)).
- Use the IBM i CPYLIB command (or a similar method for duplicating libraries, such as Save/Restore) to clone an existing LSAM environment and adapt it to an alternate environment with a different library list.

Installing a new copy of the LSAM (especially using the LI040005 installation save file) has the advantage of using the least amount of disk space for the alternate environment. However, the CPYLIB method offers the advantage of preserving existing automation strategies that may have already been configured in the source environment.

:::note
When using the CPYLIB method, it is necessary to perform two operations in the source environment before beginning the copy process:

1. Be sure to install all the latest available PTFs from SMA. One or more of these are required for the CPYLIB procedure to work correctly.
2. The new environment library list must be predefined using the SMALIBMGT command in the source environment before the CPYLIB process is begun. It is difficult to manage the cloning process correctly without the new library list being defined in advance.
 
:::

## How to Add an LSAM Environment

### Method 1: Use the SMASETUP Command

All the instructions for installing a new LSAM environment using the SMASETUP command are provided in [IBM i Agent 18.1 Installation/Upgrade Instructions](../installation/installation). Here are the key steps to remember when the SMASETUP process will not use the SMADEFAULT environment.

1. Prompt the SMASETUP command using function key <**F4**\> and/or specify the keyword parameter ALTENV(\*YES). This parameter controls the actions of the SMASETUP processing program.
2. When the Install/Upgrade initial prompt screen is displayed, confirm that the "Use alternate environment name" field shows "\*YES". Also, be sure to change the default name of the "SMAGPL alternate library name" and of the "LSAM environment tools library." These two names should normally refer to the same library, unless the alternate environment will make exclusive use of the IBM library QGPL for the environment tools library. Do NOT share any existing SMAGPL library that is being used by another LSAM environment. Examples of library naming strategies might include either a prefix or a suffix for each LSAM library name that will match the other LSAM libraries, such as TSTSMAGPL or SMAGPL1.
3. The next screen format that will appear on the display is "SMA Environment Management - Work with Environments." This is the display for the command SMALIBMGT (documented in LSAM Environment Management). Use this function to register the new environment name and after pressing <**Enter**\> to record the environment name, execute option **5** to establish the new environment library list. Follow the naming convention used for the SMAGPL library when naming the other libraries, for example: TSTSMADTA or SMADTA1. After pressing <**Enter**\> to commit the new library list, the display will return to the list of environments. Press <**F3**\> to exit this function.
4. Following the environment maintenance function, the install program will immediately use the SMALIBINQ command in inquiry mode, permitting selection of the new environment that was just created. Type option **1** to select the new environment and press <**Enter**\> to continue the installation process.
5. After a few more steps, the install program will present another prompt screen requesting the critical parameter values that define the LSAM environment's operation. It is important to specify a unique name for the "LSAM Name", and this exact same name must also be registered in the OpCon machines table. Use all capital letters for the LSAM Name value. SMA recommends also specifying a unique SMA Subsystem name, however, it is technically possible to share the same IBM subsystem as has been assigned to another LSAM environment. Just remember, though, that it will be more difficult to isolate problems if two LSAMs are sharing the same IBM subsystem. Finally, be sure to assign unique numbers to the TCP/IP Port values; these must not be the same as the values assigned to any other LSAM within the same IP address in this IBM i partition.

### Method 2: Clone an Existing Environment

The following check list of steps can be used as a guide for planning and as a check list during the process of creating and initiating an extra LSAM environment by copying an existing LSAM environment.

This procedure assumes that all steps required to install and configure the original, source LSAM environment have been completed, as outlined in the Installation and Configuration topics.

Do not forget the importance of applying all the latest SMA PTFs to the source LSAM environment before starting this procedure!

This procedure requires that the user is logged on to the IBM i partition as either QSECOFR or as a user profile that has sufficient authority to manage all objects owned by the SMANET user profile. If not QSECOFR, then a user profile that has \*ALLOBJ authority is recommended.

1. Start from within the LSAM menu system of the source environment, or use the SMASETLIBL command to set the interactive job's library list to the list of the source LSAM environment.
2. From command entry, type the command **SMALIBMGT**, then press <**Enter**\>.
3. **Type the name** and description of the new environment on a blank line.
4. Default flag: The original SMADEFAULT environment has been designated by a flag as the default environment. This flag setting of value "Y" can be assigned to only one environment. It should be assigned to the primary live LSAM environment. Since a test environment should not share the SMAGPL library with another LSAM environment, it is recommended that the new environment should be assigned as the default environment (using its own LSAM master files) after this procedure is completed, but do not change the default flag from the SMADEFAULT environment at this point in the process.
5. Press <**Enter**\> key to store the name of the new environment into the control table.
6. Type option code **5** in the Opt column to the left of the new environment name.
7. Press <**Enter**\> to continue with data entry of the new library list.
8. **Type** the library names and optional descriptions that describe the library list for the new environment.
9. Type field: Type one of the three values listed at the top of the screen to designate which library represents each of these three library roles: SMADTA, SMAPTF and SMAPGM. Each Type value may be used only once, and all three values must be assigned. The values must be listed in order (1=SMADTA, 2=SMAPTF, 3=SMAPGM) somewhere in the library list. There may be more than three libraries in the list. If there are more than three, all the other library names should have blanks under the Type column.
:::note
Libraries do not have to exist at the time they are added to this list, but they must
exist when the LSAM environment is entered or started. Do not forget to include the designated
SMAGPL library (or libraries, if UTL not equal GPL) at or near the top of the library list.

10. Press <**Enter**\> to submit the new library list **for editing**.
11. If all data entry edits were passed, press <**Enter**\> to store the new library list in the control tables.
12. Press <**F3**\> (Exit) to leave the SMALIBMGT function.
13. From command entry, create duplicates of the original LSAM libraries that were installed by using the following four commands, substituting the correct names for the TOLIB parameter according to the Type values assigned in step 8, above. (A sample value of SMAGPL1 is used in the following steps to represent the new SMAGPL library, but use the name provided in the CPYLIB command in place of the mnemonic "my_gpl".)
```
CPYLIB FROMLIB(SMAGPL) TOLIB(my_gpl) CRTLIB(*YES)
CPYLIB FROMLIB(SMADTA) TOLIB(my_dta) CRTLIB(*YES)
CPYLIB FROMLIB(SMAPTF) TOLIB(my_ptf) CRTLIB(*YES)
CPYLIB FROMLIB(SMAPGM) TOLIB(my_pgm) CRTLIB(*YES)
```
14. In order to support the following steps, change the library list of the current interactive job to the new LSAM environment library list, using the following command:
```
SMAGPL1/SMASETLIBL ENV(alt_environment_name)
```
15. It is required to execute the following command to initialize, configure and audit the new, alternate LSAM environment:
```
LSAINIT ENV(alt_environment_name) GPL(SMAGPLn)
```
Instructions for the prompt screen that will appear are provided below, under the Screens and Windows
section of this topic. More information about these required configuration field values can be found in
the Configuration topic of this documentation.

16. Delete the subsystem description that was duplicated from SMADTA (but do not delete the subsystem description that would have been created during a new installation of this alternate environment):
```
DLTSBSD SBSD(my_dta/SMASBS
```
17. Enter the menu system for the new environment just created using one of the following commands:
```
STRSMA ENV(alt_environment_name)
```
or
```
LSAMENU
```

18. Press <**Enter**\> to continue past the OpCon welcome screen, if the STRSMA command was used.
19. Select function 7: LSAM Parameters by typing a **7** on the Selection line and pressing <**Enter**\> to continue. Review and revise the LSAM general control parameters, as necessary. For example, LSAM log file purging controls might be different for a test environment.
20. For each LSAM sub-menu, where option 7 is used to configure the feature, review the configuration options to make sure they are appropriate for the new LSAM environment. However, do not configure test LSAM environments to use Job Tracking or Restricted Mode functions, unless during special test circumstances it is well understood how to avoid conflicts with a production LSAM environment.

The next step requires an understanding of how to configure OpCon options at the SAM console. 

21.  **Add a new machine definition** to the machine table at the OpCon Enterprise Manager (EM), using the new LSAM Name.
    
    a. Specify that the machine type is IBM i.
22. Enter the new LSAM environment in the IBM i partition using the **STRSMA** command or the **LSAMENU** command. For more information, refer to the [STRSMA Command](../operations/lsam.md#the-strsma-command). Be sure to specify the new environment name for the ENV parameter of this command:
```
STRSMA ENV(alt_environment_name)
```
or
```
Use the ENV(*SELECT) keyword value to select the environment from a list.
```

23. Select **sub-menu 6**. LSAM Management Menu in the LSAM Main Menu.
24. Select **function 1**. Start LSAM (STRSMASYS) in the LSAM Management Menu.
25. When the start process has completed, select function 3. Check LSAM subsystem status, to confirm that the new LSAM environment server jobs are running without error (no job has a status of **MSGW**) under the unique subsystem name was created.
26. It is now possible to use the OpCon Enterprise Manager console to start communications with the new LSAM environment. Please consider the warning below.

:::danger

It is possible to have more than one LSAM environment on a single IBM i partition active at the same time. However, great care must be taken to avoid conflicts between the two environments. OpCon and the LSAM environments can possibly affect the status of the entire IBM i partition and any or all of its jobs. Make sure that there are no conflicts when activating more than one LSAM environment at the same time. One potential conflict lies in the constraint that only one LSAM environment can control Job Tracking at a time. Another type of conflict could arise from the duplication of LSAM database information if a live environment were copied to make the test environment. For example, Operator Replay scripts might possibly try to use the same resources as the live environment. Finally, the Restricted Mode feature can only be actively assigned to one LSAM environment at a time.

:::

## LSAM Environment Screens and Windows

This section of the topic documents IBM i LSAM screen formats that are not documented in other sections of this online help.

### LSAINIT LSAM Parameters Prompt Screen

When the LSAINIT command is executed to configure and align all controls for a cloned LSAM environment, new values must be provided that are unique to the new environment and not the same as used by any other LSAM environment within the same IBM i partition.

More detail about the configuration fields described below may be found in the Configuration topic of this online help. There may be additional LSAM environment settings that should be changed, but these can be managed after the new LSAM environment has been properly initialized, using LSAM menu functions such as option 7 on the main LSAM menu: LSAM Parameters.

- **Screen Title**: Initialize IBM i LSAM
- **Screen ID**: LSAINITR1

###### Fields

For a detailed explanation of the fields appearing in these inquiry screens, please refer to the fields tables and following discussions in [IBM i LSAM Configuration](../configuration/configuration.md) of this online help.

- **LSAM environment Name**: This is the name that was assigned to the new LSAM environment, also specified when the LSAINIT command was started. Normally, this field value should not be changed. It represents the LSAM environment library list that was defined for the new LSAM environment.
- **SMAGPL alternate library name**: This library name was already chosen when the alternate LSAM environment library list was defined in the setup steps of the previous section. Confirm that the name of the new SMAGPL library appears here, but if not, type in the correct name. Do not share the same SMAGPL library that is already used by a different LSAM environment.
- **LSAM environment tools library**: Normally, this will be the same name as the SMAGPL library, unless an alternate LSAM environment will have exclusive control over the LSAM utility commands that could be installed into the QGPL library.
- **Internet Address**: This can be the same IP address as used by another LSAM environment, since the port numbers below should be unique. However, a different IP address can also be specified for this LSAM environment.
- **LSAM subsystem name**: The subsystem assigned to the source LSAM can be shared, but SMA recommends assigning a new, unique subsystem name that is dedicated to this LSAM environment. This approach makes controlling, testing and diagnosing errors much easier.
- **LSAM (machine) Name**: Type a name that represents this LSAM environment within this IBM i partition. The system serial number may already be assigned to the default LSAM environment. Pick a new name that can easily be recognized from the OpCon console. Take note of this name for adding a new machine definition to OpCon at the Enterprise Manager user interface.
- **Job Sched Comm Port**: Pick a unique number that is greater than the port number assigned to the default LSAM environment, which is usually port number 3100. If the test environment uses library SMAGPL1, perhaps the job scheduler communications port number could be 3101. Take note of this number for use when adding a machine definition to OpCon using the Enterprise Manager user interface.
- **JORS Port**: Specify a unique port number that is not already used by other LSAM functions or environments. The usual default value assigned to the SMADEFAULT environment is 3110, so test environment 1 (SMAGPL1) might assign 3111 to the JORS communication program. Record this number so that it can also be assigned to the OpCon machine record.
- **SMAFT Server Port**: If the SMA File Transfer protocol will be used, assign a unique port number that will represent a connection to this LSAM environment. The default value of 3301 is typically assigned to the SMADEFAULT environment, so for a test environment using library SMAGPL1 perhaps a value of 3311 could be assigned to the SMAFT port.
- **Auto-start SMAFT?**: If the SMA File Transfer protocol will be used, set this flag to a value of "**Y**" so that the SMAFT server job will be started automatically whenever the other LSAM server jobs are started in the LSAM subsystem.

###### Functions

- **F3/F12=Quit**: Either of these function keys terminates the program, so that the LSAM initiation work will not be completed.
- **F4=Prompt**: This prompt function key may be used with either the LSAM Environment name field or with the Internet Address field to display a list of values from which one may be selected and returned to either field.
- **F5=Refresh**: This function key causes the display to be reloaded with the default values.
- **F9=View LIBL**: Use this convenience function key to view the library list that is currently in effect. This could be used to confirm that the correct LSAM environment is being initialized, and/or to remind the user about the naming conventions chosen for a test LSAM environment, so that the subsystem name and the LSAM machine name might be spelled in a way that matches the naming convention.
- **F21=SMALIBMGT**: Normally, the LSAM environment name and library list should already be defined before starting the LSAINIT command. However, this function key provides direct access to the SMALIBMGT command using the LSAM control files that are present in the job's current library list. This command could be used to revise the LSAM environment before completing the initialization process.

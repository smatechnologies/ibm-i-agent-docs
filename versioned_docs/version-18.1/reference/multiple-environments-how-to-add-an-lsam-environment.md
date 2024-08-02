---
sidebar_label: 'How to Add an LSAM Environment'
---
# How to Add an LSAM Environment

## Method 1: Use the SMASETUP Command

All the instructions for installing a new LSAM environment using the SMASETUP command are provided in [IBM i Agent 18.1 Installation/Upgrade Instructions](../installation/installation.md). Here are the key steps to remember when the SMASETUP process will not use the SMADEFAULT environment.

1. Prompt the SMASETUP command using function key <**F4**> and/or specify the keyword parameter ALTENV(\*YES). This parameter controls the actions of the SMASETUP processing program.
2. When the Install/Upgrade initial prompt screen is displayed, confirm that the "Use alternate environment name" field shows "\*YES". Also, be sure to change the default name of the "SMAGPL alternate library name" and of the "LSAM environment tools library." These two names should normally refer to the same library, unless the alternate environment will make exclusive use of the IBM library QGPL for the environment tools library. Do NOT share any existing SMAGPL library that is being used by another LSAM environment. Examples of library naming strategies might include either a prefix or a suffix for each LSAM library name that will match the other LSAM libraries, such as TSTSMAGPL or SMAGPL1.
3. The next screen format that will appear on the display is "SMA Environment Management - Work with Environments." This is the display for the command SMALIBMGT (documented in LSAM Environment Management). Use this function to register the new environment name and after pressing <**Enter**> to record the environment name, execute option **5** to establish the new environment library list. Follow the naming convention used for the SMAGPL library when naming the other libraries, for example: TSTSMADTA or SMADTA1. After pressing <**Enter**> to commit the new library list, the display will return to the list of environments. Press <**F3**> to exit this function.
4. Following the environment maintenance function, the install program will immediately use the SMALIBINQ command in inquiry mode, permitting selection of the new environment that was just created. Type option **1** to select the new environment and press <**Enter**> to continue the installation process.
5. After a few more steps, the install program will present another prompt screen requesting the critical parameter values that define the LSAM environment's operation. It is important to specify a unique name for the "LSAM Name", and this exact same name must also be registered in the OpCon machines table. Use all capital letters for the LSAM Name value. SMA recommends also specifying a unique SMA Subsystem name, however, it is technically possible to share the same IBM subsystem as has been assigned to another LSAM environment. Just remember, though, that it will be more difficult to isolate problems if two LSAMs are sharing the same IBM subsystem. Finally, be sure to assign unique numbers to the TCP/IP Port values; these must not be the same as the values assigned to any other LSAM within the same IP address in this IBM i partition.

## Method 2: Clone an Existing Environment

The following check list of steps can be used as a guide for planning and as a check list during the process of creating and initiating an extra LSAM environment by copying an existing LSAM environment.

This procedure assumes that all steps required to install and configure the original, source LSAM environment have been completed, as outlined in the Installation and Configuration topics.

**Do not forget the importance of applying all the latest SMA PTFs to the source LSAM environment before starting this procedure!**

This procedure requires that the user is logged on to the IBM i partition as either QSECOFR or as a user profile that has sufficient authority to manage all objects owned by the SMANET user profile. If not QSECOFR, then a user profile that has \*ALLOBJ authority is recommended.

1. Start from within the LSAM menu system of the source environment, or use the SMASETLIBL command to set the interactive job's library list to the list of the source LSAM environment.
2. From command entry, type the command **SMALIBMGT**, then press <**Enter**>.
3. **Type the name** and description of the new environment on a blank line.
4. Default flag: The original SMADEFAULT environment has been designated by a flag as the default environment. This flag setting of value "Y" can be assigned to only one environment. It should be assigned to the primary live LSAM environment. Since a test environment should not share the SMAGPL library with another LSAM environment, it is recommended that the new environment should be assigned as the default environment (using its own LSAM master files) after this procedure is completed, but do not change the default flag from the SMADEFAULT environment at this point in the process.
5. Press <**Enter**> key to store the name of the new environment into the control table.
6. Type option code **5** in the Opt column to the left of the new environment name.
7. Press <**Enter**> to continue with data entry of the new library list.
8. Type the library names and optional descriptions that describe the library list for the new environment.
9. **Type field**: Type one of the three values listed at the top of the screen to designate which library represents each of these three library roles: SMADTA, SMAPTF and SMAPGM. Each Type value may be used only once, and all three values must be assigned. The values must be listed in order (1=SMADTA, 2=SMAPTF, 3=SMAPGM) somewhere in the library list. There may be more than three libraries in the list. If there are more than three, all the other library names should have blanks under the Type column.
:::tip
Libraries do not have to exist at the time they are added to this list, but they must
exist when the LSAM environment is entered or started. Do not forget to include the designated
SMAGPL library (or libraries, if UTL not equal GPL) at or near the top of the library list.
:::

10. Press <**Enter**> to submit the new library list **for editing**.
11. If all data entry edits were passed, press <**Enter**> to store the new library list in the control tables.
12. Press <**F3**> (Exit) to leave the SMALIBMGT function.
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

- Instructions for the prompt screen that will appear are provided below, under the Screens and Windows section of this topic. More information about these required configuration field values can be found in the Configuration topic of this documentation.

16. Delete the subsystem description that was duplicated from SMADTA (but do not delete the subsystem description that would have been created during a new installation of this alternate environment):
```
DLTSBSD SBSD(my_dta/SMASBS)
```
17. Enter the menu system for the new environment just created using one of the following commands:
```
SMAGPLn/STRSMA ENV(alt_environment_name)
```
or
```
SMAGPn/LSAMENU
```
...where "SMAGPLn" represents the alternate name for the SMAGPL library that belongs to the new LSAM environment.

18. Press <**Enter**> to continue past the OpCon welcome screen, if the STRSMA command was used.
19. Select function 7: LSAM Parameters by typing a **7** on the Selection line and pressing <**Enter**> to continue. Review and revise the LSAM general control parameters, as necessary. For example, LSAM log file purging controls might be different for a test environment.
20. For each LSAM sub-menu, where option 7 is used to configure the feature, review the configuration options to make sure they are appropriate for the new LSAM environment. However, do not configure test LSAM environments to use Job Tracking or Restricted Mode functions, unless during special test circumstances it is well understood how to avoid conflicts with a production LSAM environment.

#### The next step requires an understanding of how to configure OpCon options at the SAM console. 

21.  **Add a new machine definition** to the machine table at the OpCon User Interface (EM, SM), using the new LSAM Name.
    
       - Specify that the machine type is IBM i.

22. Enter the new LSAM environment in the IBM i partition using the **STRSMA** command or the **LSAMENU** command. For more information, refer to the [STRSMA Command](../operations/lsam.md#the-strsma-command). Be sure to specify the new environment name for the ENV parameter of this command:
```
STRSMA ENV(alt_environment_name)warning
```
or
```
Use the ENV(*SELECT) keyword value to select the environment from a list.
```

23. Select **sub-menu 6**. LSAM Management Menu in the LSAM Main Menu.
24. Select **function 1**. Start LSAM (STRSMASYS) in the LSAM Management Menu.
25. When the start process has completed, select function 3. Check LSAM subsystem status, to confirm that the new LSAM environment server jobs are running without error (no job has a status of **MSGW**) under the unique subsystem name was created.
26. It is now possible to use the OpCon User Interface console to start communications with the new LSAM environment. Please consider the warning below.

:::danger warning

It is possible to have more than one LSAM environment on a single IBM i partition active at the same time. However, great care must be taken to avoid conflicts between the two environments. OpCon and the LSAM environments can possibly affect the status of the entire IBM i partition and any or all of its jobs. Make sure that there are no conflicts when activating more than one LSAM environment at the same time. One potential conflict lies in the constraint that only one LSAM environment can control Job Tracking at a time. Another type of conflict could arise from the duplication of LSAM database information if a live environment were copied to make the test environment. For example, Operator Replay scripts might possibly try to use the same resources as the live environment. Finally, the Restricted Mode feature can only be actively assigned to one LSAM environment at a time.

:::
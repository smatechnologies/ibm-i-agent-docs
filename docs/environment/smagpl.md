---
sidebar_label: 'LSAM Environment and Library SMAGPL'
---

# LSAM Environment and Library SMAGPL

This section explains the standards for the IBM i LSAM environment library named SMAGPL, as of version 04.00.03 and newer.  The last topic of this document section also describes the current use of the SMAPTF library.

The discussion assumes the reader is familiar with the topic of IBM i library lists.

:::tip
SMA recommends that the SMAGPL library should not be shared among multiple LSAM environments. Rooted in long-past history, the SMAGPL library was introduced as a replacement for using the IBM i library QGPL, as a convenient location for LSAM environment management commands, programs and files.  Experience proved that trying to share the SMAGPL library among more than one LSAM environment created difficulties when managing the LSAM PTFs (software fixes and enhancements).

The best practice for creating a second LSAM environment for test purposes is to install the second copy of the LSAM software into a different IBM i partition.  But for sites with limited resources, it is possible to install a second copy of the LSAM using different library names, as long as the potential conflicts between the environments are observed.  For more information, see [Installing Multiple Environments](docs/reference/multiple-environments.md#installing-multiple-environments) and information in the following section [How to Add an LSAM Environment](docs/reference/multiple-environments-how-to-add-an-lsam-environment.md#-how-to-add-an-lsam-environment).
:::

## LSAM Standard Library List

The IBM i LSAM depends on the following default library list:

- SMAGPL = LSAM environment management objects and convenient utility commands
- SMADTA = LSAM database
- SMAPTF = LSAM patched programs
- SMAPGM = LSAM base programs

Optionally, the temporary job library QTEMP could be added at the beginning of the library list, and other IBM i libraries such as QGPL could be added after the 4 LSAM libraries if they improve operational control at some client sites.

## The SMAGPL library

The original purpose of the SMAGPL library was to eliminate the use of the IBM library QGPL. In some ways, this may not be as convenient as using library QGPL, but there are many solutions for configuring the IBM i operating system components that would make using SMAGPL convenient for authorized users.

The role of the SMAGPL library included these purposes:

- Manage LSAM the environment and other library list definitions (such as the RESTRICTED library list used by the Agent's Restricted Mode utilities).
- Provide a control point for LSAM software patching (PTFs from SMA) commands and programs.

Upon installation, the default LSAM environment named "SMADEFAULT" uses the following library list:

- QTEMP = temporary library for each unique job
- SMAGPL = SMA LSAM utility library
- SMADTA = LSAM database
- SMAPTF = PTF management objects for this LSAM (no run-time programs)
- SMAPGM = LSAM base and/or patched programs
- QGPL = IBM General Purpose Library (system management utility objects)

There is an LSAM installation option that allows existing or new LSAM clients to choose QGPL as the location for LSAM environment controls (refer to [IBM i Agent 18.1 Installation/Upgrade Instructions](../installation/installation.md)) for installation instructions), though this is not recommended. Even when the LSAM environment controls are installed to library QGPL, the library SMAGPL must still be used because it contains the PTF control structures, and these may not be moved to the QGPL library. If the QGPL location option is selected, then the SMADEFAULT environment library list would be changed to put library QGPL in a leading position, as follows:

- QTEMP = temporary library for each unique job
- QGPL = IBM General Purpose Library (system management utility objects)
- SMAGPL = SMA LSAM utility library
- SMADTA = LSAM database
- SMAPTF = PTF management objects for this LSAM (no run-time programs)
- SMAPGM = LSAM base and/or patched programs

The changed position of library QGPL is not required for correct operation of the LSAM, since new LSAM standards dictate that no objects will be duplicated among LSAM libraries. The location of the QGPL library in the library list is merely a recommendation, due to its importance in this case.

### Warning: Qualifying LSAM Commands

According to current LSAM standards, the library SMAGPL is the recommended location of LSAM environment management commands. When the IBM library QGPL was being used for this purpose, most IBM i system users had QGPL in their library list, so entering the LSAM menu system only required that the simple command STRSMA (or command LSAMENU) be typed to enter the LSAM menu system.

Normally, when library QGPL is not being used for LSAM utilities and SMAGPL is accepted as the standard location for LSAM environment commands, the LSAM commands may have to be qualified with a library name in order that they be found, for example: **SMAGPL/STRSMA**.  (Some sites may choose to add SMAGPL to their system library list or the QUSRLIBL system value.  But use caution in order to avoid possible complications with database mirroring tools.)

The LSAM utility commands and programs in the SMAGPL library all include specialized logic that leverages the IBM concept of a Product Library. This means that whenever these commands are used, the Product Library (SMAGPL) will automatically be included in the job library list. This technique helps to support proper operation of the LSAM software without requiring that system, user or job description library lists be updated to include the SMAGPL library.

Specifying a Product Library for the LSAM environment commands also helps enable the use of LSAM commands from the IBM Navigator for i - a web application for managing the IBM i operating system, in which case the library-qualified name of a command is all that is required to execute LSAM management commands. For example, the default LSAM server subsystems and jobs could be started with this command executed from a Navigator function: **SMAGPL/SMASTRSYS**.

For convenience, some sites may choose to update User Profile initial library lists of LSAM-authorized users so that library SMAGPL is included by default. If library SMAGPL is already in the user's library list, then the LSAM commands do not have to be qualified with the SMAGPL library name.

:::caution
Using LSAM commands from the SMAGPL library will update the PRODUCT library of the users library list. This will normally not cause any problem. However, system administrators and programmers should be aware that the PRODUCT libraries are always higher on the users library list than the USER portion of the library list, that is, they are just below the SYSTEM portion of the library list.
:::

### An Alternate Strategy for LSAM Management Commands

One or more commands from the SMAGPL library that are assigned a Product Library could be copied to library QGPL in order to make it easier for system users to gain quick access to the LSAM environment or its menu system.  But this strategy assumes that library QGPL has not been designated as the LSAM environment utilities library.

Using this strategy, the client assumes all responsibility for maintaining any objects that are copied to libraries outside of the defined LSAM environment. This means that if SMA should change any of the commands that a user has copied to another library, the user is responsible for replacing the command objects that exist outside of the LSAM environment. Also, be aware that if the IBM i operating system is upgraded, the contents of the QGPL library are subject to replacement, so the LSAM commands that previously existed in that library would have to be copied again after the upgrade.

:::warning
The user is responsible for managing the authority of any objects copied to libraries outside of the LSAM Environment. Be sure to exclude the \*PUBLIC user authority to copied commands, and to carefully assign authority only to authorized user profiles. Remember, also, that IBM i commands that duplicate objects will change the object ownership to the name of the user who performs the duplication command (such as CRTDUPOBJ), so the owner of LSAM objects should be reset, if necessary, to user SMANET.
:::

It is not necessary to also copy any command processor programs or LSAM database files used by the LSAM utility commands that are (by default) originally installed with library SMAGPL, since the IBM i support for Product Libraries assigned to command objects handles the users library list in a way that makes the content of the Product Library available to the command.

Some of the commands that might be convenient to copy to library QGPL include:

- **STRSMA** = enter the LSAM menu system, relying on the \*DEFAULT LSAM environment library list and showing the splash display.
- **LSAMENU** = enter the LSAM menu system directly, requiring that the LSAM environment be specified by name, and optionally indicating direct access to an LSAM sub-menu (bypassing the main menu).
- **STRSMASYS** = start the LSAM subsystem and server jobs.
- **ENDSMASYS** = end the LSAM server jobs and optionally also the LSAM subsystem.
- **SMASETLIBL** = change the current jobs User portion of the library list to the named LSAM environment library list.
- **SMAADDLIBL** = add the libraries that define an LSAM environment to the specified location within the existing users library list (also refer to SMARMVLIBL).
- **SMARVMLIBL** = remove the libraries that define an LSAM environment from the users library list, leaving all other libraries in the library list.
- **CPYTOMSGIN** = supports sending OpCon External Events commands from anywhere within the IBM i partition, such as from third-party software that is configured or programmed to use this command.

When copying these LSAM commands to the QGPL library, keep in mind that the Product Library assigned to each command will dictate which LSAM environment is being accessed or managed. This can only be changed by changing the commands PRDLIB (Product Library) attribute using the IBM i command CHGCMD.

It will not work correctly to try to use the menu access commands or the LSAM server management commands access or manage a different LSAM environment, since the command processing will enforce the Product Library in the current library list while the command is executing, and this library would be in conflict with a different LSAM environment.

However, the three commands that manage the user's library list (SMASETLIBL, SMAADDLIBL, SMARMVLIBL) do not create this problem, so they can be effectively used as long as the library list requested exists in the LSAM Environment master file that is located in the command's Product Library.

More information about LSAM commands may be found in the next major section of this topic and in [Commands and Utilities](../commands-utilities/commands).

## SMAPTF Library Purpose Change

Notice in the default LSAM library list, above, the description of the SMAPTF library. In original versions of the LSAM, patched programs were being installed by PTFs (program patch routines from SMA) into the SMAPTF library. This old standard made it difficult to manage LSAM object authority because the same program could exist in two libraries at once.

In addition, some of the LSAM utility programs and commands also existed in both the SMAPGM library and the QGPL library. If there were a patch, the same program could exist in three places at once.  

The current standards of the IBM i LSAM dictate that an LSAM object will only exist in one library at a time. This means that when a software patch is applied, programs will be replaced in either library SMAPGM or SMAGPL (or QGPL, if it was registered as the LSAM's environment tools library during execution of the SMASETUP command). 

The purpose of library SMAPTF has evolved so that it is now a container only for LSAM PTF "rollback save files." This means that library SMAPTF will no longer be used to store programs for active execution.  It is retained in the active LSAM environment library list because some of the long-standing LSAM programs still expect to reference this library.  The LSAM PTF installation management tools also still reference this library during normal operations.
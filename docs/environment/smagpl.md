---
sidebar_label: 'LSAM Environment Rules and Library SMAGPL'
---

# LSAM Environment Rules and Library SMAGPL

This section explains the standards for the IBM i LSAM environment, as of version 04.00.03. Clients upgrading from prior releases are provided with an explanation of the older LSAM standards for comparison.

The discussion assumes the reader is familiar with the topics of IBM i library lists.

:::note
SMA Statement of Direction:
 
Without making any commitment to deliver any specific software capability, SMA nevertheless states its intention to revise the definition of its IBM i Agent software environment. This statement is made to assist clients with decisions about how they will configure their IBM i partitions when installing one or more copies of the IBM i Agent.
 
SMA no longer recommends that the SMAGPL library should be shared among multiple LSAM environments. It is expected that the SMAGPL library will be eliminated and that the LSAM environment may be more simply defined by the two libraries SMADTA (database objects) and SMAPGM (programming objects). Accordingly, the SMAPTF library may still exist for its purpose of supporting software patching, but it would also not be required as part of the IBM i library list required for the operation of primary LSAM programs.
:::

## Old LSAM Standards

Previously, the i5/OS LSAM from SMA was based on an environment defined by the following default library list:

- QTEMP = temporary library for each unique job
- QGPL = IBM General Purpose Library (system management utility objects)
- SMADTA = LSAM database
- SMAPTF = LSAM patched programs
- SMAPGM = LSAM base programs

In this original library list scheme, certain LSAM environment management utilities, such as the STRSMA command that is used to enter the LSAM menu system, were installed in IBMs QGPL library. This is common practice among many software vendors. The QGPL library typically appears in every users library list, so having some startup utilities in this library makes it easy for every authorized user to gain access to the LSAM application environment.

## The SMAGPL library

As of IBM i LSAM version 04.00.00, a new standard library named SMAGPL was introduced. The purpose of this library was to eliminate the use of the IBM library QGPL. In some ways, this may not be as convenient as using library QGPL, but there are many solutions for configuring the IBM i operating system components that would make using SMAGPL convenient for authorized users.

The role of the SMAGPL library included these purposes:

- Manage LSAM environments (NO LONGER USER FOR THIS PURPOSE!)
- Provide a control point for LSAM software patching (PTFs from SMA)

Following an upgrade to the IBM i LSAM version 04.00.03, the default LSAM environment is now defined by the following library list:

- QTEMP = temporary library for each unique job
- SMAGPL = SMA LSAM utility library
- SMADTA = LSAM database
- SMAPTF = PTF management objects for this LSAM (no run-time programs)
- SMAPGM = LSAM base and/or patched programs
- QGPL = IBM General Purpose Library (system management utility objects)

There is an LSAM installation option that allows existing or new LSAM clients to choose QGPL as the location for LSAM environment controls (refer to [IBM i Agent 18.1 Installation/Upgrade Instructions](../installation/installation.md)) for installation instructions). The procedure for setting up this option is explained below. But even when the LSAM environment controls are installed to library QGPL, the new library SMAGPL must still be used because it contains the PTF control structures, and these may not be moved to the QGPL library. If the QGPL location option is selected, then the SMADEFAULT environment library list would be changed to put library QGPL in a leading position, as follows:

- QTEMP = temporary library for each unique job
- QGPL = IBM General Purpose Library (system management utility objects)
- SMAGPL = SMA LSAM utility library
- SMADTA = LSAM database
- SMAPTF = PTF management objects for this LSAM (no run-time programs)
- SMAPGM = LSAM base and/or patched programs

The changed position of library QGPL is not required for correct operation of the LSAM, since new LSAM standards dictate that no objects will be duplicated among LSAM libraries. The location of the QGPL library in the library list is merely a recommendation, due to its importance in this case.

### Warning: Qualifying LSAM Commands

According to the new LSAM standards, the library SMAGPL is the location of LSAM environment management commands. When the IBM library QGPL was being used for this purpose, most IBM i system users had QGPL in their library list, so entering the LSAM menu system only required that the simple command STRSMA (or command LSAMENU) be typed to enter the LSAM menu system.

If QGPL is not being used for LSAM utilities and SMAGPL is accepted as the new standard location for LSAM environment commands, then the LSAM commands may have to be qualified with a library name in order that they be found, for example: **SMAGPL/STRSMA**.

The LSAM utility commands and programs in the SMAGPL library all include new logic that leverages the IBM concept of a Product Library. This means that whenever these commands are used, the Product Library (SMAGPL) will automatically be included in the job library list. This technique helps to support proper operation of the LSAM software without requiring that system, user or job description library lists be updated to include the SMAGPL library.

Specifying a Product Library for the LSAM environment commands also helps enable the use of LSAM commands from the IBM System i Navigator GUI interface - a PC application for managing the IBM i operating system, in which case the library-qualified name of a command is all that is required to execute LSAM management commands. It will not be necessary to create or update the library list controls that System i Navigator must depend on when executing remote commands under IBM i. For example, the default LSAM server subsystems and jobs could be started with this command executed from a System i Navigator remote command entry window: **SMAGPL/SMASTRSYS**.

For convenience, some sites may choose to update User Profile initial library lists of LSAM-authorized users so that library SMAGPL is included by default. If library SMAGPL is already in the users library list, then the LSAM commands do not have to be qualified with the SMAGPL library name.

:::caution
Using LSAM commands from the SMAGPL library will update the PRODUCT library of the users library list. This will normally not cause any problem. However, system administrators and programmers should be aware that the PRODUCT libraries are always higher on the users library list than the USER portion of the library list, that is, they are just below the SYSTEM portion of the library list.
:::

#### An Alternate Strategy for LSAM Management Commands

One or more commands from the SMAGPL library that are assigned a Product Library could be copied to library QGPL in order to make it easier for system users to gain quick access to the LSAM environment or its menu system.

Using this strategy, the client assumes all responsibility for maintaining any objects that are copied to libraries outside of the defined LSAM environment. This means that if SMA should change any of the commands that a user has copied to another library, the user is responsible for replacing the command objects that exist outside of the LSAM environment. Also, be aware that if the IBM i operating system is upgraded, the contents of the QGPL library are subject to replacement, so the LSAM commands that previously existed in that library would have to be copied again after the upgrade.

:::warning
The user is responsible for making the authority of any objects copied to libraries outside of the LSAM Environment. Be sure to exclude the \*PUBLIC user authority to copied commands, and to carefully assign authority only to authorized user profiles. Remember, also, that IBM i commands that duplicate objects will change the object ownership to the name of the user who performs the duplication command (such as CRTDUPOBJ).
:::

It is not necessary to also copy any command processor programs or LSAM database files, since the IBM i support for Product Libraries assigned to command objects handles the users library list in a way that makes the content of the Product Library available to the command.

Some of the commands that might be convenient to copy to library QGPL include:

- **STRSMA** = enter the LSAM menu system, relying on the \*DEFAULT LSAM environment library list and showing the splash display.
- **LSAMENU** = enter the LSAM menu system directly, requiring that the LSAM environment be specified by name, and optionally indicating direct access to an LSAM sub-menu (bypassing the main menu).
- **STRSMASYS** = start the LSAM subsystem and server jobs.
- **ENDSMASYS** = end the LSAM server jobs and optionally also the LSAM subsystem.
- **SMASETLIBL** = change the current jobs User portion of the library list to the named LSAM environment library list.
- **SMAADDLIBL** = add the libraries that define an LSAM environment to the specified location within the existing users library list (also refer to SMARMVLIBL).
- **SMARVMLIBL** = remove the libraries that define an LSAM environment from the users library list, leaving all other libraries in the library list.

When copying these LSAM commands to the QGPL library, keep in mind that the Product Library assigned to each command will dictate which LSAM environment is being accessed or managed. This can only be changed by changing the commands PRDLIB (Product Library) attribute.

It will not work correctly to try to use the menu access commands or the LSAM server management commands access or manage a different LSAM environment, since the command processing will enforce the Product Library in the current library list while the command is executing, and this library would be in conflict with a different LSAM environment.

However, the three commands that manage the users library list do not create this problem, so they can be effectively used as long as the library list requested exists in the LSAM Environment master file that is located in the commands Product Library.

More information about LSAM commands may be found in the next major section of this topic and in [Commands and Utilities](/commands-utilities/commands).

## SMAPTF Library Purpose Change

Notice in the new default LSAM library list, above, the change in the description of the SMAPTF library (and the SMAPGM library). Previously, patched programs were being installed by PTFs (program patch routines from SMA) into the SMAPTF library. The old standard made it difficult to manage LSAM object authority because the same program could exist in two libraries at once.

In addition, some of the LSAM utility programs and commands also existed in both the SMAPGM library and the QGPL library. If there were a patch, the same program could exist in three places at once.

The new standards as of IBM i LSAM version 04.00.00 dictate that an LSAM object will only exist in one library at a time. This means that when a software patch is applied, programs will be replaced in either library SMAPGM or SMAGPL (or QGPL). The purpose of library SMAPTF is changed so that it is now a container for PTF control objects that apply to each LSAM environment. This means that library SMAPTF will no longer be used to store programs for active execution.

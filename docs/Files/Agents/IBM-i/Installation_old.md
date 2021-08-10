---
lang: en-us
title: IBM i LSAM Installation
viewport: width=device-width, initial-scale=1.0
---

#  []{#top}IBM i LSAM Installation 
## Introduction

This document contains instructions for installing or upgrading to the
IBM i LSAM release 04.00.06. Please note the document version code in
the Overview: Document Version 04.00.03.316 refers to the LSAM version
04.00.03 updated through PTF \# 403316, for example.

 

One copy of the LSAM is required for each separate i5/OS or IBM i
partition. The installation file for the IBM i LSAM resides on the OpCon
Installation media, and in an SMA ftp server location. This file must be
transferred via File Transfer Protocol (FTP), or by direct transfer from
an optical medium while it is inserted in the IBM hardware, to the IBM i
partition. As the installation steps describe, an empty IBM i save file
must be created to receive the binary stream file that contains the LSAM
software.

 

The estimated time required for the whole installation process is 1 -- 2
hours. However, due to the requirement to rebuild the LSAM database in
each machine (so that the tables match the default system CCSID), busy
production machines may require significantly more time to complete the
execution of the installation command SMASETUP. Experience suggests that
the actual SMASETUP command would not normally require more than 30
minutes to complete. The remaining time is required for the pre- and
post-install checklist steps to be completed.

 

  -------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [Custom modifications are not recommended by SMA and are not addressed by this installation procedure. If any custom modifications to an existing installation of the IBM i LSAM exist, this procedure must be carefully reviewed before executing any of the steps and then a strategy mapped for accommodating the modifications before attempting the upgrade.]
  -------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

+----------------------------------+----------------------------------+
| ![White triangle icon on yellow  | **CAUTION:** [As of IBM i LSAM   | | circlular                        | version 04.00.00 and newer, SMA  |
| background](../../../Reso        | introduced a new LSAM library    |
| urces/Images/caution-icon(48x48) | named SMAGPL. This library, by   |
| .png "Caution icon") | default, but optionally,         |
|                                  | replaces the former use of the   |
|                                  | IBM i system library             |
|                                  | QGPL.]               |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | SMA no longer recommends sharing |
|                                  | either QGPL or SMAGPL with more  |
|                                  | than one IBM i LSAM environment. |
|                                  | SMA also recommends against      |
|                                  | installing the LSAM utilities    |
|                                  | into the IBM library QGPL.       |
|                                  | Please refer to [Installing      | |                                  | Multiple                         |
|                                  | Environments](Installing-Mult  |
|                                  | iple-Environments.md){.MCXref |
|                                  | .xref} about installing          |
|                                  | alternate LSAM environments,     |
|                                  | such as a test environment, for  |
|                                  | more information. However, users |
|                                  | may still choose to copy certain |
|                                  | simple LSAM commands to QGPL     |
|                                  | from the SMAGPL library, for     |
|                                  | convenience. Please contact      |
|                                  | Support at SMA if you wish to    |
|                                  | change your existing LSAM        |
|                                  | library configuration. There is  |
|                                  | a procedure for separating       |
|                                  | shared \*GPL libraries.          |
+----------------------------------+----------------------------------+

 

  -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [There is a batch mode installation command available called SMASETUPB. This command was intended for use by SMA installation staff, in conjunction with certain site-specific installation strategies, or by sites with a large number of IBM i partitions. SMA recommends using the standard interactive install command SMASETUP. Documentation about using the batch mode command is provided in a separate section of this topic below the standard interactive method documentation.]
  -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Pre-Installation Checklist

Whether installing a new LSAM or upgrading an existing LSAM, it may be
necessary to consider the following comments and the Pre-Installation
Checklist that follows. Any of the points in this list of requirements
and conditions could prevent a successful installation.

Good news! IBM i LSAM versions 04.00.xx are compatible with all versions
of OpCon/xps 3.31.xx and higher including through OpCon 17.1. It is not
necessary to upgrade OpCon in order to take advantage of the latest LSAM
enhancements, although older versions of OpCon/xps may not support some
features recently added to the LSAM. Most of the unsupported features
are ways that the LSAM can support newer versions of OpCon, including
LSAM Feedback (which was not supported by old versions of OpCon).
However, automation tools added to the LSAM for local use within IBM i
can be used. For example, the Multi-Step Job Scripting can compose
scripts that can be executed by a standard IBM i Batch Job in OpCon.

The IBM i operating system must be at version V5R4 or higher. Versions
of i5/OS or OS/400 older than V5R4 are not supported at all, either by
IBM or by SMA. Version 04.00.03.316 of the IBM i LSAM will execute under
all versions of IBM i from V5R4 through i7.3 (V7R3). However, SMA
intends to freeze its support for V5R4 and V6R1 with this version of the
LSAM. The statement of direction from SMA is that the next LSAM version
(proposed as LSAM version 18.1) will be compiled under IBM i7.1, and it
will execute only under this and newer versions of IBM i. SMA will
provide only emergency support for the 04.00.03.xxx version of this
Agent (LSAM) as a courtesy to clients running unsupported versions of
IBM i, as long as it is physically possible for SMA to produce software
patches for those unsupported versions of IBM i.

For new installations, the instructions explain that the user profiles
SMANET and SMASAV must be created manually, before starting execution of
the SMASETUP or SMASETUPB installation commands. This is required to
preserve the correct object ownership of LSAM software components.
Please note that the default authority assigned to the LSAM server user
profile SMANET is very powerful. This is considered safe because this
user profile must not be assigned a password, and public use of this
profile is revoked. However, high security sites may need to consider
the discussions in this topic and the LSAM Security and Object Authority
topic about LSAM authorities in order to determine an appropriate
alternative strategy for managing the authority of this user profile.

It may be necessary to change one of the system values for the IBM i
operating system in order to permit the installation program to restore
program objects that use adopted authority. This is a common strategy,
and IBM provides the following guidelines for managing the installation
of new software:

 

The Allow restore of security sensitive objects (QALWOBJRST) system
value specifies whether or not objects with security-sensitive
attributes can be restored. It is important to set the value to \*ALL
before performing the following system activities:

-   Installing a new release of the operating system.
-   Installing new licensed programs.
-   Applying program temporary fixes (PTFs).

```{=html}
<!-- -->
```
-   Recovering your system.

These activities can fail if the value of QALWOBJRST is not set to
\*ALL. Use this procedure:

-   Use the command DSPSYSVAL to view and record the current setting for
    the value QALWOBJRST.
-   If you have previously locked this system value, go to SST (system
    service tools) and unlock it.
-   Use the command CHGSYSVAL to set QALWOBJRST to a value of \*ALL.
-   Complete the software installation or upgrade.

```{=html}
<!-- -->
```
-   To ensure system security, return the QALWOBJRST value to your
    normal setting (recorded above) after completing the software
    installation.

IBM i LSAM administrators must remember to manage this system value also
during application of LSAM software patches (PTFs).

System resource requirements:

The initial system resource requirements of this LSAM software can be
specified, however, the LSAM requirements are dynamic, based on the
average profile of the work load assigned to the LSAM via OpCon
scheduled jobs.

 

[Main memory]{.ul} 
The program objects of the basic LSAM server programs require about 9 MB
of main memory. However, more memory is typically required because some
of these 8 LSAM server jobs call sub-programs or spawn additional,
temporary tasks.

 

[Disk utilization]{.ul} 
-   For sites using database mirroring:
    1.  If database replication (mirroring) is being used, disable the
        replication for the LSAM libraries during the PTF installation
        process. There is a potential conflict between an aggressive
        "mirror all" strategy and the repeated process of creating and
        updating PTF control data areas.

        a.  After the PTF installation is complete, ensure that the
            updated libraries (SMADTA, SMAGPL, and SMAPGM) are fully
            replicated to the mirror site.

        b.  Instead of disabling all database mirroring, the PTF
            conflict can be avoided by establishing mirror filter rules
            to NOT replicate data areas (object type \*DTAARA) that have
            names starting with LS\* from libraries SMAGPL and SMADTA.

    2.  Add a filter rule to the database mirroring software
        configuration, to NOT attempt to replicate the two LSAM clones
        of the IBM i SBMJOB command, since they cannot be successfully
        restored on the target system.
        a.  SMAPGM/SBMJOB

        b.  SMAPGM/SMASBMJOB

        c.  The solution for preparing the mirror target LSAM for
            operation is to enter that LSAM's menu system
            (SMAGPL/STRSMA) and then execute the command LSAINIT.

            i.  This command will reproduce the SBMJOB clone commands.

            ii. The LSAINIT operation needs to be done only once in the
                target LSAM

                1.  It may be necessary to suspend mirroring during the
                    execution of the LSAINIT command within the mirror
                    target LSAM environment.

        d.  SMA intends to eliminate these clones of IBM i commands in a
            future version of the LSAM.
-   An initial installation of the IBM i LSAM requires about 185 MB of
    disk space. However, disk utilization will expand from there. The
    LSAM configuration master files will require a small amount of
    additional space. LSAM daily log files will consume more space,
    depending on the retention period specified in the LSAM Parameters.
    Also, when LSAM logging functions are turned on (as SMA recommends,
    both for initial installation stabilization and continuing if the
    site needs audit logging), disk space can quickly exceed an
    additional 1GB or more, depending on the volume of daily activity
    and the retention period specified for Backup/reorganize files.

```{=html}
<!-- -->
```
-   After the installation or upgrade of the LSAM software is completed,
    SMA requires an immediate application of any currently available
    LSAM PTFs (program temporary fixes, or software patches) before the
    LSAM features are used. However, for new installations, the LSAM PTF
    Configuration procedure (LSAM sub-menu 9, option 7) must be
    completed before attempting the PTF installation. Please download or
    request the PDF document that provides a simple guide to applying
    the LSAM PTFs after a new installation.

-   LIBRARY NAME SIZE RESTRICTION: There was a known weakness in the
    original version 04.00.03 of this LSAM software, where the PTF
    (software patch) loading procedures would fail if any library name
    that is part of the LSAM library list is longer than 8 characters.
    This limitation is not a concern when installing the default
    production LSAM. Also, installation files (for new installation)
    newer than the original file LI040003 (such as LI040006) already
    contain this fix, so the library names of an alternate LSAM
    environment may be up to the IBM i limit of 10 characters.

-   UPGRADING FROM AN LSAM VERSION OLDER THAN 04.00.03? Upgrades from
    LSAM versions older than 04.00.03 require the use of the LI040003
    install file. Please ask the Support team at SMA for assistance
    installing a manual fix to the 04.00.03 product before you attempt
    to install cumulative PTFs for the first time. (The fix was
    contained in PTF \# 403033 and the solution is to replace the
    program UPRCASR. This program can be replaced manually.)

## Upgrade Procedures

If an IBM i LSAM has been previously installed, follow the upgrade
installation instructions below, beginning with Supported Versions of
the IBM i LSAM. Otherwise, skip to Installing the IBM i LSAM.

 

  -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [Sites that are upgrading the LSAM from versions prior to 04.00.03 are advised to use the Operator Replay configuration function (LSAM menu 4, option 7) to convert the Cursor control separator characters to the new default values after the upgrade has been completed. This conversion is recommended in order to avoid potential conflicts with the LSAM Dynamic Variable separator characters. Instructions for using the built-in hexadecimal conversion utility are provided in Operator Replay Scripts, under the [OR Script Screens and Windows](Operator-Replay-Scripts.md#OR2). The first topic in that section describes how to use the Operator Replay configuration function. Please contact SMA Support for advice on this subject.]
  -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

  ------------------------------------------------------------------------------------------------------------------------------ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White \"X\" icon on red circular background](../../../Resources/Images/warning-icon(48x48).png "Warning icon")   **WARNING:** [The [LSAM]{.GeneralLSAM} installation program can only upgrade from the I5/OS [LSAM]{.GeneralLSAM} version 03.31.03 or newer. SMA believes no clients are using older versions. If an older version of the [LSAM]{.GeneralLSAM} is found for upgrade, it must first be upgraded to 03.31.03 using an older release of the [LSAM]{.GeneralLSAM} installation program. Please contact the SMA Support team for assistance in this case.]
  ------------------------------------------------------------------------------------------------------------------------------ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### Supported Versions of the IBM i LSAM

The current version of the IBM i LSAM installation commands (SMASETUP
and SMASETUPB) are capable of upgrading in place of all installed
versions of the LSAM as far back as version 03.31.03. The table below
lists the LSAM versions that are supported for upgrade to version
04.00.03. If an older version is found, please contact the Support team
at SMA for assistance.

 

The IBM i LSAM version is controlled by a data area called LSAVERSION
that resides in the SMADTA (database) library. The version control
number is visible on the LSAM Menu system splash screen at log on, and
also on the LSAM Parameters maintenance screen (LSAM main menu, function
7). Prior to LSAM version 03.31.01, a data area named VERSION was used
to store the version ID, however, this general name conflicted with the
version control of third-party software, so the version control data
area was changed to LSAVERSION.

+----------+----------------------------------------------------------+
| 03.31.03 | Earliest supported version of the i5/OS LSAM. First      |
|          | stable version utilizing XML contemporary protocol.      |
+----------+----------------------------------------------------------+
| 03.31.04 | Not distributed; SMA USA internal version that holds     |
|          | patches for 03.31.03. PTFs at this level are also        |
|          | retro-fitted forward to the later version patch levels:  |
|          | 03.31.21, 04.00.03                                       |
+----------+----------------------------------------------------------+
| 03.31.10 | Beta version of LSAM with support for SMA File Transfer. |
|          | Included on the OpCon/xps 4.0 beta distribution          |
|          | installation media. Replaced by version 03.31.11.        |
+----------+----------------------------------------------------------+
| 03.31.11 | Final distributed version of LSAM with initial support   |
|          | for SMA File Transfer. Included on the OpCon/xps         |
|          | 04.00.03 distribution CD. Superseded by version          |
|          | 03.21.20. Patches for this level discontinued after      |
|          | PTF\# 17658. Clients must upgrade to version 03.31.20 to |
|          | receive future updates to the LSAM that was installed at |
|          | 03.31.11                                                 |
+----------+----------------------------------------------------------+
| 03.31.12 | Not distributed; SMA USA internal version that holds     |
|          | patches for 03.31.11. Did receive retro-fitted patches   |
|          | from 03.22.05 and 03.31.04, but cumulative PTF           |
|          | collection is replaced by an upgrade to version          |
|          | 03.31.20.                                                |
|          |                                                          |
|          |                                                          |
|          |                                                          |
|          | **Note**: Patching at this level stops after PTF\#       |
|          | 17658. Clients must perform compatible upgrade to LSAM   |
|          | version 03.31.20 to receive future updates to the LSAM   |
|          | that was installed at 3.31.11.                           |
+----------+----------------------------------------------------------+
| 03.31.20 | Includes cumulative LSAM PTFs and major enhancement \#   |
|          | 17658: Support for Captured Jobs, Local Data Area and    |
|          | Dynamic Variables.                                       |
+----------+----------------------------------------------------------+
| 03.31.21 | Not distributed. SMA USA internal version that holds     |
|          | patches for 03.31.20. May receive retro-fitted patches   |
|          | from 03.31.04. Documentation designated with this        |
|          | version number contains updates for recent major LSAM    |
|          | enhancements, including improved Message Management,     |
|          | SCANSPLF, Data Capture and captured data Response, and   |
|          | the SMARGZ database maintenance tool set.                |
+----------+----------------------------------------------------------+
| 04.00.00 | LSAM beta version first labeled for IBM i. Accompanies   |
|          | OpCon/xps version 4.20.01 on distribution CD (but not    |
|          | installed at live client sites). Includes new LSAM job   |
|          | status tracking methods, new PTF management tools, new   |
|          | Object Authority management tools and several other      |
|          | useful enhancements. Now compatible with OpCon/xps       |
|          | back-level versions 03.31.xx, and newer versions.        |
|          | VERSION WITHDRAWN FROM DISTRIBUTION.                     |
+----------+----------------------------------------------------------+
| 04.00.01 | Improved version for IBM i. Accompanies OpCon/xps        |
|          | version 4.20.02 on distribution CD. Must be used in      |
|          | place of version 04.00.00.                               |
+----------+----------------------------------------------------------+
| 04.00.02 | Not distributed; SMA USA internal version that holds     |
|          | patches for 04.00.00 and 04.00.01.                       |
+----------+----------------------------------------------------------+
| 04.00.03 | LSAM now compiled for IBM i V5R4. Consolidates all       |
|          | patches from 04.00.02. Accompanies OpCon version 4.25    |
|          | (or newer) on the product CD. Clients upgrading to this  |
|          | level from an older version must use the LI040003        |
|          | install file. The newer install files that already       |
|          | contain many applied PTFs cannot be used for upgrades.   |
+----------+----------------------------------------------------------+

: IBM i LSAM Version History

### Evaluate the Current LSAM Installation

Before proceeding with the Backup and Installation steps, observe the
following cautions and notes. Do not continue with the upgrade or
installation procedure until each of these concerns have been dismissed
or addressed.

 

  ------------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White triangle icon on yellow circlular background](../../../Resources/Images/caution-icon(48x48).png "Caution icon")   **CAUTION:** [Applying to upgrades from prior versions: as of IBM i LSAM version 03.31.20, PTF level 18449, there is a recommendation to change the Cursor Control Separator characters 1 and 2 for Operator Replay Scripts. Refer to [Operator Replay Scripts](Operator-Replay-Scripts.md#top) for more information about the Script conversion utility that is available for this purpose. New installations of the IBM i LSAM will use the new standards for Operator Replay script steps.]
  ------------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### Backing Up the LSAM Environment

Every existing user of the IBM i LSAM is advised to use the following
steps, or a similar procedure, to create a backup of the existing LSAM
installation. Although SMA has invested great effort to ensure that the
install procedure will perform a proper upgrade of existing
installations, it is wise to protect the existing LSAM database in case
some unexpected circumstance may arise.

 

[Back Up LSAM Libraries and Delete Obsolete Objects]{.ul} 
Choose 1) or 2):

[EITHER]{.ul}: Terminate the LSAM by issuing the **ENDSMASYS** command. Newer versions of this command may support an optional ENV parameter
that can be used to designate the name of the LSAM environment to be
stopped. Use F4=Prompt to determine if the ENV parameter is supported.
Otherwise, it is necessary to set the job\'s library list to the LSAM
environment library list. This can be done using the SMASETLIBL command.
Refer to
[SMASETLIBL](LSAM-Environment-Management.md#SMASETLI){.MCXref
.xref} for more information about LSAM environments and the SMASETLIBL
command.

[OR]{.ul}: From LSAM menus, terminate the LSAM with the following steps: 
a.  From the **LSAM Master Menu**, enter **6**.
b.  From the **LSAM Management Menu**, enter **2** to execute the **End
    LSAM** function.

When the LSAM is inactive:

a.  Save the LSAM data library using the SAVLIB command for library
    SMADTA.\
    **SAVLIB LIB(SMADTA) DEV(\<***backup device***\>) PRECHK(\*YES)
    ACCPTH(\*YES)**
b.  Save the LSAM program objects library using the SAVLIB command for
    library SMAPGM.
c.  Save the LSAM program patches library using the SAVLIB command for
    library SMAPTF.
d.  Save the LSAM utility objects library using the SAVLIB command for
    library SMAGPL.

The SMABAK library does not require a backup if it exists as a result of
installing and using recent versions of the LSAM. This library is not
updated by the LSAM upgrade procedure. It exists solely for the purpose
of storing backups requested by SMA File Transfer jobs. Similarly, the
SMALOG library is used only for temporary storage of save files produced
by the SMASUP command and the LSAM log file purge and backup routines.
It is not updated during the LSAM upgrade installation.

Using the following commands, delete the program objects library from
the previous LSAM installation.

  -------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [If custom modifications have been installed in the SMAPGM library (not recommended), then rename and save the library for future reference. Custom modifications are not addressed by this installation procedure.]
  -------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Choose a) or b):

a.  **RMVLIBLE SMAPGM**\
    **DLTLIB SMAPGM**
b.  **RNMOBJ OBJ(SMAPGM) OBJTYPE(\*LIB) NEWOBJ(SMAPGMBKP)**

Using the following commands, delete the program patches library (if it
exists) from the previous LSAM installation.

  -------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [If custom modifications have been installed in the SMAPTF library, rename and save the library for future reference. Custom modifications are not addressed by this installation procedure.]
  -------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Choose a) or b):

a.  **RMVLIBLE SMAPTF**\
    **DLTLIB SMAPTF**
b.  **RNMOBJ OBJ(SMAPTF) OBJTYPE(\*LIB) NEWOBJ(SMAPTFBKP)**

It is not necessary to delete LSAM utility objects that were previously
installed in QGPL. These utilities will be updated as necessary by the
SMASETUP installation procedure.

Review the discussion below (following the step-by-step instructions) to
evaluate the available options for installing the upgraded LSAM
utilities in either the current location of library QGPL, or in the LSAM
standard (non-IBM) library called SMAGPL.

Continue with Installing the LSAM.

## Installing the IBM i LSAM

  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [If an IBM i LSAM has previously been installed, do not perform the [Install the LSAM]{.ul} procedure until the Upgrade Procedures above have been completed, starting with a review of Supported LSAM Versions.]
  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

[Install the LSAM]{.ul} 
Log in to IBM i

From an IBM i green screen workstation (such as an iSeries Access
display emulation session) or from an IBM i console, sign on to the
system as **QSECOFR**. A user profile with all object (\*ALLOBJ)
authority and security administration (\*SECADM) authority may also be
used.

Enter **CALL QCMD** to go to the full **Command Entry** screen. This
makes installation messages and steps easier to monitor.

Change the interactive job attributes using the following two commands.

 

Messages sent to the user message queue (of QSECOFR or the user name
used to sign on) can be displayed immediately on the green screen
console, workstation, or emulation session by entering the command:

**CHGMSGQ \<user_name\> \*BREAK**

 

Request fully detailed job logging with the following command. This
level of logging makes diagnosis much easier in case there is an error
during the installation:

**CHGJOB LOG(4 00 \*SECLVL) LOGCLPGM(\*YES) JOBMSGQFL(\*WRAP)**

Create a working save file for use during the installation to the IBM i
partition by entering the command:

Choose a) or b):

a.  **CRTSAVF QGPL/LI040003**
b.  **CRTSAVF QGPL/LI040006**

FTP the LSAM Save File

From a Microsoft Windows system (or other operating system that can read
standard installation media files and act as an FTP client), use FTP to
transfer the LSAM\'s save file from the OpCon Installation media to
library QGPL on the target machine. The save file is transferred to the
LSAM machine by a binary FTP file transfer. From a Windows machine, use
the following steps:

Use menu path: **Start \> Run**.

The method used to access a Windows Command panel will vary according to
the version of Windows used.

Type **cmd**.

Click **OK**.

Change the drive reference to the \"OpCon/xps Installation Media\" by
entering the Drive Letter followed by a colon (:). When using an
installation save file that was transferred electronically instead of on
an installation media, change the drive reference to the hard disk (or
network) location of the installation save file.

+-----------------------------------+---------------------------------+
| ![White pencil icon on green      | **EXAMPLE:**                    | | circular                          |                                 |
| background](../../../Re           | C:\\your_default_directory\> D: |
| sources/Images/example-icon(48x48 |                                 |
| ).png "Example icon") | D:\\\>                          |
+-----------------------------------+---------------------------------+

Change the directory to the \"IBM i LSAM installation directory\". When
using an installation save file that was transferred electronically or a
custom installation media, the directories shown in the following
example will probably have different names.

+----------------------------------+----------------------------------+
| ![White pencil icon on green     | **EXAMPLE:**                     | | circular                         |                                  |
| background](../../../Reso        | D:\\\>cd Install\\LSAM\\IBM i    |
| urces/Images/example-icon(48x48) | LSAM                             |
| .png "Example icon") |                                  |
|                                  | D:\\Install\\LSAM\\IBM i LSAM\>  |
+----------------------------------+----------------------------------+

At the prompt, enter **ftp** *\<LSAM Machine Name or TCP/IP address\>*.
In order to use the LSAM Machine Name, this name must be registered
either in the MS Windows \"hosts\" file or it must be found in the
connecting networks domain name services table.

Log in as **QSECOFR** with the appropriate *\<QSECOFR password\>*. The
alternate LSAM installation user profile that was used to create the
save file in QGPL may also be used.

Enter **bin** to select a binary transfer type.

Enter one of the following FTP PUT commands to send the file.

Choose either a) or b):

a.  **PUT LI040003 QGPL/LI040003**
b.  **PUT LI040006 QGPL/LI040006**

Enter **quit** to exit the FTP utility.

Enter **exit** to close the command entry window.

+----------------------------------+----------------------------------+
| ![White pencil icon on green     | **EXAMPLE:** [The following      | | circular                         | shows a typical FTP procedure in |
| background](../../../Reso        | a DOS command window for a new   |
| urces/Images/example-icon(48x48) | install.]{.statement2}           |
| .png "Example icon") |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | D:\\Install\\LSAM\\IBM i         |
|                                  | LSAM\>**ftp \<LSAM Machine Name  |
|                                  | or TCP/IP address\>**\           |
|                                  | Connected to \<IBM i Name or IP  |
|                                  | Address\>.\                      |
|                                  | 220-QTCP at \<IBM i Name or IP   |
|                                  | address\>\                       |
|                                  | 220 Connection will close if     |
|                                  | idle more than 5 minutes.\       |
|                                  | User (\<IP address\>:(none)):    |
|                                  | **QSECOFR**\                     |
|                                  | 331 Enter Password.\             |
|                                  | Password: **\<QSECOFR            |
|                                  | password\>**\                    |
|                                  | 230 User QSECOFR logged in.\     |
|                                  | ftp\> **bin**\                   |
|                                  | 200 Representation type is       |
|                                  | binary IMAGE.\                   |
|                                  | ftp\> **PUT LI040006             |
|                                  | QGPL/LI040006**\                 |
|                                  | 200 PORT subcommand successful.\ |
|                                  | 150 Sending file to member       |
|                                  | LI040006 in file LI040006 in     |
|                                  | library QGPL.\                   |
|                                  | \_\_\_\_\_\_\_\_ bytes sent in   |
|                                  | \_\_\_\_\_\_ seconds \_\_\_\_\_  |
|                                  | Kbytes/sec\                      |
|                                  | ftp\> **quit**\                  |
|                                  | 221 QUIT subcommand received\    |
|                                  | D:\\Install\\LSAM\\IBM i         |
|                                  | LSAM\>**exit**                   |
+----------------------------------+----------------------------------+

Create SMA User Profiles

When installing the IBM i LSAM for the first time, create two user
profiles manually in order to preserve the object authority of the
software that will be restored to your system in the next step. Enter
the following two commands.

  -------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [It is normally possible to copy the following text and paste it into the IBM i workstation command entry line, then modify the parameter values as required.]
  -------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   **CRTUSRPRF USRPRF(SMANET) PASSWORD(\*NONE) INLPGM(\*NONE)
    INLMNU(\*SIGNOFF) TEXT(\'SMA IBM i LSAM server user profile\')
    SPCAUT(\*JOBCTL \*SPLCTL \*ALLOBJ)**

```{=html}
<!-- -->
```
-   **CRTUSRPRF USRPRF(SMASAV) PASSWORD(smasav_password) INLPGM(\*NONE)
    INLMNU(\*SIGNOFF) TEXT(\'SMA restricted mode user profile\')
    SPCAUT(\*JOBCTL \*SPLCTL \*SAVSYS)**

  -------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [The \*ALLOBJ special authority granted to user SMANET is discussed below under the topic of: Modify the LSAM User Profiles, steps 25 and 26.]
  -------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------

Prepare the Installation Library

1.  Restore the distribution library, which includes the setup command
    and its processor program, from the save file QGPL/LI040003 or
    QGPL/LI040006 by entering the command:
    -   **RSTLIB SAVLIB(LI040003) DEV(\*SAVF) SAVF(QGPL/LI040003)**
    -   **RSTLIB SAVLIB(LI040006) DEV(\*SAVF) SAVF(QGPL/LI040006)**
2.  Add the installation library to the interactive job library list by
    entering the command:
    -   **ADDLIBLE LIB(LI040003) POSITION(\*FIRST)**
    -   **ADDLIBLE LIB(LI040006) POSITION(\*FIRST)**

Run the Installation Procedure

+----------------------------------+----------------------------------+
| ![White pencil/paper icon on     | **NOTE:** [**Before starting the | | gray circular                    | SMASETUP command**, please       |
| background](../../.              | review the information about the |
| ./Resources/Images/note-icon(48x | standard LSAM utilities library, |
| 48).png "Note icon") | SMAGPL, presented below the      |
|                                  | step-by-step instructions.       |
|                                  | During the interactive           |
|                                  | installation process, the        |
|                                  | program will present an initial  |
|                                  | prompting screen that requires   |
|                                  | careful decisions about whether  |
|                                  | to use SMAGPL or use (or retain) |
|                                  | the IBM library QGPL. More       |
|                                  | information on this subject is   |
|                                  | offered in [LSAM Environment     | |                                  | Management](LSAM-Environme     |
|                                  | nt-Management.md#top){.MCXref |
|                                  | .xref}.]             |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | The SMASETUP command presents    |
|                                  | two parameter prompting screens. |
|                                  | Information about the fields on  |
|                                  | these screens may be found below |
|                                  | the step-by-step instructions.   |
+----------------------------------+----------------------------------+

 

Choose *19* or *20*:

1.  [EITHER]{.ul}: Start the default installation procedure by entering     the command:\
    **SMASETUP**
2.  [OR]{.ul}: To modify the installation for installing to an     environment other than the default environment, set the ALTENV
    parameter of the SMASETUP command to (\*YES).
3.  As objects are restored from the installation save file, there are
    status messages displayed at the bottom of the screen to indicate
    the progress of the installation. [No action is required]{.ul}. 4.  When the installation procedure has finished normally, the following
    completion message is displayed:

When upgrading (not a new install)

When using this procedure to upgrade an existing LSAM environment, skip
now to step *27*. Steps *23* through *26* may be skipped because for
upgrades it is usually not necessary to review the discussion of the
LSAM User Profiles or object authorities.

Modify the LSAM User Profiles

The **IBM i LSAM** online help includes a topic that discusses IBM i
LSAM Security and Object Authority. If this installation is not for a
simple demonstration, or if the installing site has any concerns about
system security, object authority and/or the broad default authorities
granted to the LSAM server user profile SMANET, the LSAM Security and
Object Authority topic should be studied before completing the following
installation configuration steps.

Default IBM i work management objects used by the LSAM:

The user profile(s) for which IBM i jobs are submitted must have
authority to use the IBM i work management objects (Job Description, Job
Queue, Output Queue) to process a job. Normally, this is not a problem
unless the customer has modified the authority of these objects. The
LSAM Parameters control file supports default object names for
submitting jobs using the following values:

a.  User profile: **QSYSOPR**
b.  Job description (JOBD): **QBATCH**
c.  Job queue (JOBQ): **QBATCH**
d.  Output queue (OUTQ): **QPRINT**

If these default values are changed using LSAM Parameter maintenance
(described in the **IBM i LSAM** online help), be sure to modify the
next step so that the authority maintenance commands address the
appropriate objects.

Granting authority to IBM i work management objects:

 

Both the submitted job user profile and the IBM i LSAM server user
profile SMANET must have authority to use the queues and the job
description required to run jobs scheduled in OpCon/xps. If user SMANET
is allowed to keep the suggested \*ALLOBJ authority, it is not necessary
to perform this step. However, if revoking the \*ALLOBJ special
authority, it may necessary to grant authority to the objects that
SMANET will use when submitting jobs. A more detailed explanation of
this step, including references to additional object authorities that
may be required, can be found in the **IBM i LSAM** online help topic on
LSAM Security and Object Authority.

 

As an example, to verify that the QSYSOPR profile has authority to use
the default job definition objects named above, use the following
commands:

a.  **GRTOBJAUT OBJ(QGPL/QBATCH) OBJTYPE(\*JOBD) USER(QSYSOPR)
    AUT(\*USE)**
b.  **GRTOBJAUT OBJ(QGPL/QBATCH) OBJTYPE(\*JOBQ) USER(QSYSOPR)
    AUT(\*USE)**
c.  **GRTOBJAUT OBJ(QGPL/QPRINT) OBJTYPE(\*OUTQ) USER(QSYSOPR)
    AUT(\*USE)**

Repeat these same three commands for user SMANET if SMANET will not have
\*ALLOBJ authority. The SMANET user profile is used by the IBM i LSAM
server programs when submitting jobs to run, so it must have authority
to place jobs into each job queue that will be specified for OpCon/xps
jobs and it must have authority to reference the job descriptions used
to define the jobs. The OpCon/xps spool file management feature for IBM
i jobs requires that SMANET have authority to the spool files and output
queues of jobs that are submitted by the IBM i LSAM. Even if spool file
management features are not used, SMANET must have authority to use the
job log spool file QPJOBLOG and the output queue where job log reports
are spooled. (Job logs may be spooled in output queue QUSRSYS/QEZJOBLOG
instead of QSYS/QPRINT.)

  -------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [To accept the default configuration of the LSAM user profile authorities, skip steps *25* and *26* and go on to the next section, [Configure and Operate the LSAM](#Configure_and_Operate_the_LSAM).]
  -------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Why does user profile SMANET have \*ALLOBJ special authority? How should
system security be managed when the IBM i LSAM is installed?

 

The IBM i LSAM software designates the user profile SMANET as the user
profile for all of the LSAM server jobs. This user profile must have
extensive authority to IBM i system objects, commands and programs, and
it must have authority to use the user profiles of jobs the LSAM will
submit.

 

In this current version of the LSAM installation, user profile SMANET is
installed (when new) with \*ALLOBJ special authority. However, if the
system\'s security officer is willing to undertake security maintenance
tasks, it is not required that SMANET have \*ALLOBJ special authority to
run the LSAM server programs.

 

In general, the LSAM software has been managed so that SMANET does not
require security officer authority or \*ALLOBJ authority, that is, once
SMANET has been granted authority to use the user profiles and other
work management objects it must access when submitting jobs. The
software is distributed in a form that allows it to be operated by user
QSYSOPR, and certain programs that require special authority have been
created to run with the necessary authority. However, the initial
distribution of this software grants \*ALLOBJ special authority to user
SMANET because this simplifies demonstration installations and this also
makes it easier for new clients to train on the software.

 

Many sites may wish to revoke the \*ALLOBJ special authority, once they
have developed an authority matrix that allows user SMANET to submit
jobs to run under other user profiles. For detailed instructions about
how to manage your system configuration if SMANET will not have \*ALLOBJ
special authority refer to [LSAM Security and Object Authority](LSAM-Security-and-Object-Authority.md){.MCXref
.xref}.

  ------------------------------------------------------------------------------------------------------------------------------ --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White \"X\" icon on red circular background](../../../Resources/Images/warning-icon(48x48).png "Warning icon")   **WARNING:** [Even if the SMANET user profile is restricted, care must still be used when granting access to the [LSAM]{.GeneralLSAM} maintenance functions for Operator Replay, Multi-Step Job script maintenance, and Restricted Mode script maintenance, so that security loopholes may not be created through these points of access.]
  ------------------------------------------------------------------------------------------------------------------------------ --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Except for Operator Replay, Multi-Step Job scripts, and Restricted Mode
scripts, the LSAM programs will not normally allow unauthorized users
any access to system objects or functions that they are not already
permitted to use. To take advantage of this strategy, the LSAM server
user profile SMANET must not be allowed to submit jobs from OpCon.

 

To have users other than QSYSOPR or QSECOFR perform IBM i LSAM menu
functions, the system\'s security officer is responsible for creating
the user profiles and for granting appropriate authority to the program
objects in the SMAPGM library and the database files in the SMADTA
library (or the libraries you create to fulfill these roles in an
alternate LSAM environment). Detailed instructions for enabling user
profiles to use the IBM i LSAM menu functions can be found in the LSAM
Security and Object Authority topic.

Building a user profile matrix for SMANET without \*ALLOBJ special
authority:

 

The user profile that the IBM i LSAM uses to submit jobs is SMANET.
Since SMA is not able to predict which user profiles will be selected
for the jobs that are controlled by OpCon/xps, it is necessary to grant
to user profile SMANET authority of type \*USE to each user profile that
will be specified as the user of jobs being submitted by OpCon/xps. The
GRTOBJAUT command can be used, as in the following example. Repeat this
example for each job user profile, substituting the actual name of the
user profile for \"job_user_name\":

-   GRTOBJAUT OBJ(QSYS/job_user_name) OBJTYPE(\*USRPRF) USER(SMANET)
    AUT(\*USE)

Remember, an alternative to granting specific authority to SMANET for
each user profile is to allow the SMANET user profile to keep the
\*ALLOBJ special authority. The special authority \*ALLOBJ enables
SMANET to use any other user profile when submitting jobs.

  ------------------------------------------------------------------------------------------------------------------------------ -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White \"X\" icon on red circular background](../../../Resources/Images/warning-icon(48x48).png "Warning icon")   **WARNING:** [Regardless of the security strategy adopted, access to the user profile SMANET must be carefully restricted because it will always have extensive authority to multiple user profiles. User SMANET should not have its own password or be allowed to log on to the system.]
  ------------------------------------------------------------------------------------------------------------------------------ -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Post-Installation Checklist

1.  Restore the original value to the system value QALWOBJRST, if it was
    changed during the pre-installation checklist.

2.  OpCon User for IBM i LSAM to submit External Event commands.

    a.  Create and register an OpCon External Event command user profile
        that the LSAM can use when generating and transmitting External
        Event commands to the OpCon server.

        i.  Note that OpCon stores a separate Password on its user
            profiles just for External Events.

        ii. Currently, the User ID must be all capital letters and not
            longer than 10 characters.

        iii. Currently, the Password can be any characters, but it is
             limited to only 10 characters. (SMA intends to support
             128-character passwords in the near future, as it already
             does for the Operator Replay Scripting tool.)

    b.  Use the LSAM sub-menu 3, option 2, to register the User ID and
        Password.

        i.  The LSAM stores the Password in an encrypted form.

3.  The LSAM standard message queue that receives IBM i job completion
    messages must permit \*PUBLIC to have \*USE authority. (To be fixed
    in future versions of the LSAM.)

    a.  Always use the LSAM sub-menu 9, option 8: Work with Object
        Authority to add or change the authority of any LSAM objects
        (programs, files, queues, etc.).

    b.  Add a new record to the LSAM Object Authority master file, using
        the following field values:

4.  Modify the IBM i system startup program.

    a.  In order to fully automate the recovery of the LSAM servers
        after a system IPL, the LSAM command that restarts the LSAM
        servers must be included in the system startup program.

    b.  Use the IBM i command DSPSYSVAL to find the name of the system
        startup program in the system value QSTRUPPGM. This program, or
        a user replacement for it, must include the LSAM command
        SMAGPL/STRSMASYS ENV(environment_name), where the default value
        for the environment name can be (\*DEFAULT). The ENV parameter
        of the STRSMASYS command must specify the name of the LSAM
        environment where the Restricted Mode job was executed, if this
        was not the default LSAM environment.

    c.  The existing source for the Control Language program used for
        system startup, unless it has been modified, can usually be
        retrieved using the IBM i command RTVCLSRC.

        i.  SMA suggests storing the retrieved source into the source
            file QGPL/QCLSRC. Use the original program name for the
            retrieved source member.

        ii. Copy the original source code to another source file member,
            using a new name for the copy that will be modified.

    d.  The LSAM startup command must be preceded by a DLYJOB command,
        allowing time for the system to start TCP/IP services before
        attempting to start the LSAM Server jobs. Failing to allow
        sufficient time for TCP/IP to start will usually result in a
        failure of two LSAM communication programs that connect it to
        the OpCon server. In modern IBM Power Processors, it typically
        takes less than 30 seconds to complete TCP/IP startup, but this
        may vary depending upon how many TCP/IP servers are being
        started within a given partition.

        i.  Following are the two lines which must be added to the
            system startup program. Be sure to inspect the current
            source of this program to ascertain whether there is already
            a DLYJOB command following the startup of TCP/IP services.

    e.  To accomplish the program changes, SMA recommends the WRKMBRPDM
        command for modifying source and compiling programs, however
        many production partitions do not include this programmer
        convenience tool.

        i.  Alternative commands that can be used in most environments
            include:

            -   CPYSRCF

            -   ADDPFM (to add a new source file member, if this was not
                already done by the CPYSRCF command)

            -   EDTF (a simple text editor; see the IBM i Knowledge
                Center or the IBM developerWorks web site for
                instructions and hints about using EDTF to edit source
                members).

            -   CRTCLPGM

        ii. SMA recommends not overlaying the original system startup
            program, but instead creating the new program with a
            different name (if stored into the QSYS system root library,
            as IBM did), or storing the new program into the QGPL
            library.

    f.  Upon completion of the program preparation, use the CHGSYSVAL
        command to register the new, replacement startup program. The
        value of this system value must be 20 characters long, and it
        must list the program name in columns 1 -- 10, followed by the
        library name in columns 11 -- 20. For example:

5.  Apply the latest LSAM PTFs (software patches).

    a.  Currently, most LSAM installations include the majority of
        available patches already applied to the current version of the
        LSAM. However, there will always be at least a few recently
        released fixes, and perhaps some important and useful
        enhancements.

    b.  Verify the current LSAM PTF level. An easy way to do this is to
        execute the command SMAGPL/STRSMA, and then examine the bottom,
        right corner of the "LSAM splash display" that first appears.

    c.  Compare the LSAM current PTF level with the latest PTF level
        published by SMA. The latest PTF level available can be
        determined by examining the "IBM i LSAM (version) Patch
        Readme.PDF" document.

    d.  Two stand-alone PDF documents may prove helpful when undertaking
        the first round of LSAM PTF installation:

        i.  IBM i LSAM 04.00.03 simplified PTF instructions.

        ii. IBM i Agent (LSAM) instructions for partial PTF save files

    e.  All the latest IBM i LSAM support resources, including the two
        PTF save files and the documents mentioned here, may be found at
        SMA's current ftp server that is accessed via the Support Portal
        from the [SMA Technologies]{.GeneralCompanyName} web site. 
        i.  Currently, the ftp server may also be accessed directly from
            a browser or from a file transfer tool (such as FileZilla)
            at this URL: files.smasolutions.it.

        ii. [SMA Technologies]{.GeneralCompanyName} intends to make             changes to its client support ftp server. If this document's
            instructions appear incorrect, please contact SMA Support
            for assistance.

[]{#Configure_and_Operate_the_LSAM}Configure and Operate the LSAM 
1.  To begin using the LSAM, refer to [IBM i LSAM     Configuration](Configuration.md#top) to configure
    and operate the LSAM. In summary, the following basic steps are
    required to initiate LSAM operations for the first time.
    a.  Log on to an IBM i workstation session as QSECOFR or as the user
        profile designated as the LSAM Administrator. Refer to [LSAM         Security and Object
        Authority](LSAM-Security-and-Object-Authority.md#top){.MCXref
        .xref} for more information about creating an LSAM Administrator
        user profile.
    b.  From IBM i command entry, enter the command SMAGPL/STRSMA to
        access the LSAM Main Menu. (Qualifying the command with library
        SMAGPL may not be necessary, if QGPL is used.)

    ```{=html}
    <!-- -->
    ```
    a.  From the LSAM Main Menu, use function 7. LSAM parameters to
        review and update the configuration values. Be sure to verify
        and take note of the LSAM Name, the IP Address and the
        communications port numbers that will be used by OpCon to
        communicate with this LSAM.
    b.  On the OpCon server, configure the OpCon machine table to add a
        record for the LSAM Name. Please refer to [Extended Discussion         of Parameters](Configuration.md#Extended) for
        some important notes about setting some of the Advanced values
        in the OpCon/xps machine table.
    c.  Read through the remainder of this topic and observe any late
        documentation changes that may apply to the configuration of
        LSAM operations.
    d.  From the LSAM Main Menu, select function 6. LSAM management
        menu.
    e.  From the LSAM management menu, select function 1. Start LSAM to
        start the LSAM server programs. You can confirm that the LSAM
        server programs are running by selecting function 3. Check LSAM
        subsystem status.
    f.  From the OpCon server, start the IBM i LSAM machine and verify
        that the machine status window turns blue (or, from the machine
        table window, that the connection arrow has completed -- refresh
        the machine table window using function key F5 to verify this
        final status), indicating that the connection has been
        completed.
    g.  Use OpCon to define schedules and job master records, and then
        build and release the schedules. To prove that the IBM i LSAM is
        running, define a job that executes the following test \"general
        program\": **CALL SMAPGM/GP PARM(\'0001\')**

+----------------------------------+----------------------------------+
| ![White pencil icon on green     | **EXAMPLE:** [Another good       | | circular                         | command for testing OpCon jobs   |
| background](../../../Reso        | will actually print a report of  |
| urces/Images/example-icon(48x48) | the IBM i job\'s library list.   |
| .png "Example icon") | Using this command and viewing   |
|                                  | the report it produces could     |
|                                  | help to debug or confirm that    |
|                                  | the IBM i library list           |
|                                  | management is working as         |
|                                  | expected when jobs are started   |
|                                  | from OpCon:]{.statement2}        |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | **DSPLIBL OUTPUT(\*PRINT)**      |
+----------------------------------+----------------------------------+

Clean up after the Installation

After the IBM i LSAM installation procedure has been completed for as
many different LSAM environments as may be required, the installation
save file and the installation work library may be deleted from the
system.

1.  Delete the installation save file:
2.  Delete the installation objects library:

  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [Additional information about various steps in the installation procedure is offered in separate sections, as follows.]
  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------

 

  -------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [SMA recommends turning on the Debug Mode of logging operations for all LSAM functions, especially for job scheduling, after a new installation. This logging function provides important information that will help diagnose the first uses of the LSAM. Refer to [Log File and Database Management](Log-File-and-Database-Management.md#top) for more information.]
  -------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## LSAM Installation Options - SMAGPL Library

This section of the topic provides guidance for configuring the LSAM
installation or upgrade to support various optional configurations of
the LSAM utilities. Information about how the LSAM standard utilities
library SMAGPL is used is provided in the LSAM Environment Management
topic.

 

The site may either choose to install the LSAM utilities in the IBM
library QGPL, or to allow the utilities to remain installed in the (new,
as of version 04.00.00) default LSAM library SMAGPL. Sites who are
upgrading an existing LSAM installation from a version prior to LSAM
version 04.00.00 will already have the LSAM utilities installed in the
IBM library QGPL. During this installation process, existing
installations have an option to remove the utilities from QGPL and
convert any existing LSAM environment information to the SMAGPL library.
Either library is acceptable for normal LSAM operation, according to old
LSAM standards. However, please observe the CAUTION box information,
below.

 

Using library QGPL may be more convenient for some sites because it
typically supports easy access to the LSAM menu system and the LSAM
environment management commands. On the other hand, many sites prefer
not to use IBM libraries and instead keep the LSAM software isolated
within its own product libraries. These options are more fully explained
in LSAM Environment Management, but the installation control fields are
explained in the next section.

 

+----------------------------------+----------------------------------+
| ![White triangle icon on yellow  | **CAUTION:** [SMA no longer      | | circlular                        | recommends installing the LSAM   |
| background](../../../Reso        | utilities to the IBM i library   |
| urces/Images/caution-icon(48x48) | QGPL. Instead, only certain      |
| .png "Caution icon") | simple LSAM management commands  |
|                                  | could be copied to the QGPL      |
|                                  | library, if sites prefer the     |
|                                  | convenience of not having to     |
|                                  | specify the library name when    |
|                                  | using commands such as STRSMA    |
|                                  | (to enter the LSAM menu system)  |
|                                  | or the STRSMASYS and ENDSMASYS   |
|                                  | commands (to start or stop the   |
|                                  | LSAM server jobs).]  |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | SMA also strongly recommends     |
|                                  | that the SMAGPL (or QGPL)        |
|                                  | library should not be shared     |
|                                  | between two LSAM environments.   |
|                                  | Experience proves that it        |
|                                  | becomes difficult to apply       |
|                                  | cumulative PTFs when the \*GPL   |
|                                  | library is shared. Existing      |
|                                  | clients may contact the Support  |
|                                  | team at SMA to obtain the        |
|                                  | recommended procedure for        |
|                                  | separating two LSAM environments |
|                                  | that are sharing a single \*GPL  |
|                                  | environment.                     |
+----------------------------------+----------------------------------+

### First Interactive Installation Prompt Screen

The following installation prompt screen example shows the default
values that appear on the first prompt screen displayed as the SMASETUP
command is executed to install a new LSAM. The display content varies
slightly when source library LI040003 is used to upgrade an existing
LSAM environment:

 

  -------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [This screen will show LI040006 using the latest install file.]
  -------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------

SMASETUP Initial Prompt Screen

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  [SMASETR1]{style="color: #008000;"}              Install/Upgrade IBM i Agent (LSAM)              [00/00/00]{style="color: #008000;"}   [QSECOFR]{style="color: #008000;"}                  [Installing version:]{style="color: #008000;"} [04.00.06]{style="color: #ff00ff;"}                 [00:00:01]{style="color: #008000;"}
   Type options and press Enter to continue.
   SMA now recommends to NOT share the SMAGPL or QGPL library.
  [Installation source library . :]{style="color: #008000;"} [LI040006 ]{style="color: #00ffff;text-decoration: underline;"}    [LI040006 = new installs only]{style="color: #0000ff;"}   [Use alternate environment name:]{style="color: #008000;"} [\*NO]{style="color: #ffcc00;text-decoration: underline;"}          [\*YES, \*NO=use default]{style="color: #008000;"}
  [SMAGPL alternate library name :]{style="color: #008000;"} [SMAGPL   ]{style="color: #ffcc00;text-decoration: underline;"}    [For PTF tools (do NOT use QGPL)]{style="color: #008000;"}   [LSAM environment tools library:]{style="color: #008000;"} [SMAGPL   ]{style="color: #ffcc00;text-decoration: underline;"}    [SMAGPL, QGPL, test library]{style="color: #008000;"}
  [Convert any QGPL content? . . :]{style="color: #008000;"} [N]{style="color: #00ffff;text-decoration: underline;"}            [QGPL conversion not supported \*]{style="color: #0000ff;"}    
  If the alternate environment name option is \*YES, another screen will appear
  offering the option to define or maintain the alternate LSAM environment.
  [Be sure to add the SMAGPL library (-ies) to the list!]{style="color: #ff0000;"} [Press F3=Exit when]{style="color: #008000;"}   maintenance is completed. Next, a list of LSAM environments will be
  presented. Type 1=Select to choose the alternate LSAM environment.
       SMAGPL is the standard location for LSAM utilities. The PTF utilities
  should always remain in SMAGPL, unless a test environment requires an
  alternate name for the SMAGPL library. The LSAM environment utilities may be
  relocated to QGPL (the original default location) or they may be kept in
  SMAGPL.
       \* NOTE: Library LI040006 is for new installs only. No QGPL conversion.
   
  F3/F12=Quit install   F5=Refresh
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Please read the contents of the first prompt screen example, above. The
fields and instructions displayed in the first prompt screen are
explained in the following topical sub-sections. It is especially
important to remember to include the SMAGPL library in the library list
of alternate LSAM environments. However, the SMASETUP program
automatically handles adding the SMAGPL library to the default LSAM
environment when the default environment is being upgraded from a prior
installation.

#### LSAM Library List Setup

When installing or upgrading SMA\'s default IBM i LSAM environment
(named SMADEFAULT), it is not necessary to be concerned about the LSAM
environment library list because the installation program automatically
handles all required additions or changes to the LSAM environment
control files. If this is the case, skip this topic and go to the next
heading.

 

When the LSAM is being installed to an alternate LSAM environment, or an
alternate environment such as a test environment is being upgraded in
place, then the installer (which may be the client) is responsible for
manually building or maintaining the LSAM environment library list.
There is a topic and reference information in this LSAM online help that
explain how to install and manage alternate LSAM environments. This
discussion amplifies on the text displayed in the lower half of the
first SMASETUP prompt screen, illustrated above.

 

Depending on the choice of environment configurations explained below,
the alternate LSAM environment library list must be built or updated to
include the new SMAGPL library, and optionally, another library used for
LSAM environment management (which would typically be library QGPL, if
SMAGPL is not used for this purpose).

 

Examine the LSAM environment library lists illustrated earlier in this
document. There is an example of an alternate LSAM environment called
TSTLSAM. Notice where library SMAGPL is placed in the library list.

 

IT IS A REQUIREMENT to include library SMAGPL (and, optionally, any
different LSAM environment management library) in each LSAM environment
library list. This means that when an existing LSAM environment is being
upgraded, the installation step that offers an opportunity to maintain
the LSAM library list must be used to manually add the SMAGPL library to
the environment definition of the alternate LSAM environment that is
being upgraded.

 

The SMA Installer should advise the client about selecting from the
following three options for installing the IBM i LSAM version 04.00.03.
This choice must be thought through for both initial installations and
for upgrades, although whenever the SMA-supplied defaults have always
been used, no special procedures are required. Just remember that the
SMA defaults for the IBM i LSAM version 04.00.03 are different from the
previous releases (as explained in the first section of this document).

#### LSAM Utility Library Options

In the example of the first prompt screen from the SMASETUP command,
shown above, there are three field values that must be carefully
considered before continuing with the installation or upgrade. Each
field is listed here with a symbolic name that will be used to refer to
these fields in the remaining portions of this document:

-   **SMAUTL** = [SMAGPL alternate library name : [SMAGPL]{.ul} For PTF     tools (do NOT use QGPL)]{style="font-family: 'Courier New';"}
-   **SMAGPL** = [LSAM environment tools library: [SMAGPL]{.ul} SMAGPL,     QGPL, test library]{style="font-family: 'Courier New';"}
-   **CONVERT** = [Convert any QGPL content? . . : [Y]{.ul} Y=Convert,     N=Ignore QGPL]{style="font-family: 'Courier New';"}

 

The library label SMAUTL refers to the SMAGPL contents that are
dedicated to PTF tools (PTFs are program temporary fixes from SMA - the
same acronym as IBM uses, but these are only for the LSAM software).

 

The library label SMAGPL refers to the LSAM environment management
tools. These reside in the SMAGPL library, along with the PTF tools, by
default. However, clients may select to install (or retain) these tools
in IBM\'s QGPL library. (SMA recommends against using the QGPL library.)

 

The IBM i LSAM actually contains two data areas called SMAUTL and SMAGPL
(in the SMADTA library) that store the real value used for each of these
two symbolic library locations.

 

The CONVERT flag is used during the SMASETUP installation process, only
for upgrades. It tells the installation program when a client wants to
remove an existing set of LSAM utilities (from a previous release) to
the new standard location of the SMAGPL library. As explained below
under each install option, this flag is not always used.

 

Consider the following installation options and specify the three field
values very carefully according to the selected scenario.

##### 1. Default Installation

-   SMAUTL = SMAGPL
-   SMAGPL = SMAGPL
-   CONVERT = Y

Both the PTF control objects and the LSAM environment utilities will be
installed in the single library SMAGPL. For new LSAM installations, the
CONVERT option does not apply, but when upgrading from a previous
version of the LSAM, the CONVERT option must be set to Y = yes in order
to preserve any existing LSAM environment management data.

 

Remember, using this default installation of the LSAM may require that
LSAM environment management commands be qualified with the utility
library name, such as: SMAGPL/STRSMA.

##### 2. Use (or retain) QGPL for LSAM Environment Management

-   SMAUTL = SMAGPL
-   SMAGPL = QGPL
-   CONVERT = n/a

The PTF control objects will be installed, as always, in the SMAGPL
library. The LSAM environment utilities will be installed (or upgraded)
in the IBM library QGPL. For this option, the CONVERT flag will be
ignored because there is no need to remove objects or convert data out
of the QGPL library.

 

This installation option offers the convenience of easy access to LSAM
environment management commands, since the QGPL library is typically
included in every system, user and job description library list.
However, SMA recommends against installing the LSAM utilities to the
QGPL library. Instead, the client may choose to copy only certain
convenience commands, such as STRSMA, from SMAGPL to QGPL.

##### 3. For Testing and Development: Alternate Location for SMAGPL

-   SMAUTL = SMAGPL1
-   SMAGPL = SMAGPL1
-   CONVERT = N

Both the PTF control objects and the LSAM environment utilities will be
installed in the single library SMAGPL1.

This style of naming convention and library assignment should be used by
clients (or SMA internal staff) who do not have a separate IBM i
partition for testing, where it is necessary to install a second copy of
the LSAM within the same partition as the production LSAM.

 

SMA now recommends against the old concept of sharing a SMAGPL library
between two environments. LSAM environments should always use a
completely different library list (in order to avoid potential conflicts
with LSAM PTF management).

 

The CONVERT flag should be set to N = no for this installation option.
An isolated test environment should normally not remove the LSAM
environment management objects from library QGPL because they might
still be require for a production LSAM (or within SMA internal
operations, for the purpose of supporting previous versions of the
LSAM).

 

Although the example above shows only one library for both SMAUTL and
SMAGPL, it is also possible to divide the PTF objects from the LSAM
environment objects by specifying a different library for each purpose.
This option would normally only be selected by SMA internal staff for
the purpose of testing LSAM software to prove that different control
values for each symbolic library location are working correctly. SMA
does not recommend this option to clients.

### Second Interactive Installation Prompt Screen

When a new LSAM environment is being installed, a second prompt screen
will appear as the SMASETUP command executes. This screen collects the
parameter values that are required to configure the LSAM environment for
basic operation, so that it can be used immediately after the
installation completes.

 

If the current installation process is actually an upgrade of an
existing LSAM environment, this screen will not appear. In this case,
the following information may be ignored.

 

Following is an example of the second prompt screen showing the default
LSAM configuration values as defined by SMA:

SMASETUP Second Prompt Screen

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  [SMASETR2]{style="color: #008000;"}                  Initialize IBM i Agent (LSAM)                 [DD/DD/DD]{style="color: #008000;"}   [USERNAME]{style="color: #008000;"}                 [Installing version:]{style="color: #008000;"} [04.00.03]{style="color: #ff00ff;"}                   [TT:TT:TT]{style="color: #008000;"}
   Type values and press Enter to continue.
   
  [LSAM environment name . . . . :]{style="color: #008000;"} [SMADEFAULT]{style="color: #00ffff;text-decoration: underline;"}   [SMAGPL alternate library name :]{style="color: #008000;"} [SMAGPL   ]{style="color: #00ffff;text-decoration: underline;"}
  [LSAM environment tools library:]{style="color: #008000;"} [SMAGPL   ]{style="color: #00ffff;text-decoration: underline;"}    
  [Internet Address . . . :]{style="color: #008000;"} [111.222.333.444                               ]{style="color: #ffcc00;text-decoration: underline;"}    [(F4)]{style="color: #0000ff;"}   [LSAM subsystem name  . :]{style="color: #008000;"} [SMASBS    ]{style="color: #ffcc00;text-decoration: underline;"}
  [LSAM (machine) name  . :]{style="color: #008000;"} [IBMILSAM  ]{style="color: #ffcc00;text-decoration: underline;"}   [Job Sched Comm Port  . :]{style="color: #008000;"} [ 3100]{style="color: #ffcc00;text-decoration: underline;"}
  [JORS Port  . . . . . . :]{style="color: #008000;"} [ 3110]{style="color: #ffcc00;text-decoration: underline;"}   [Auto-start SMAFT server:]{style="color: #008000;"} [Y]{style="color: #ffcc00;text-decoration: underline;"}                    [Y=yes, N=no]{style="color: #0000ff;"}
  [SMAFT Server Port  . . :]{style="color: #008000;"} [ 3300]{style="color: #ffcc00;text-decoration: underline;"}    
  [F4=Prompt   F5=Refresh]{style="color: #0000ff;"}   ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

#### LSAM Installation Configuration Values

Detailed information about the individual fields showing on the second
installation prompt screen (format SMASETR2) are provided in IBM i LSAM
Configuration.

 

Use F4=Prompt while the cursor is positioned in the Internet Address
field to see a list of available IP addresses that are already
configured in this IBM i partition. Select the IP address that will be
used for communication with OpCon and press \<Enter\> from the prompt
window to automatically put the selected IP address into the
configuration parameter field.

 

If the IP address for communicating with OpCon has not yet been
configured, the LSAM can still be installed. However, the LSAM cannot be
used until the IP address configuration is completed. In this case,
remember to use the LSAM main menu function 7 to update the LSAM
Parameters with the correct IP address before attempting to start the
LSAM server jobs.

 

The three port numbers on this parameters screen must be unique per LSAM
environment. If the current installation is for an alternate LSAM
environment, change the port numbers to values that are different from
any other LSAM environment, such as 3101, 3111 and 3301. These port
values will also be entered into the OpCon machine record that defines
communication with this LSAM.

 

The LSAM (machine) name value must be all capital letters for IBM i, and
it must match exactly the machine name registered in OpCon. Some clients
like to use their IBM i partition serial number in this field. SMA
recommends using a name that is easily recognized by operations staff.

## Batch Installation Command (SMASETUPB)

It is possible to complete the installation of a new LSAM environment,
or to upgrade an existing LSAM environment, in a batch job that does not
require interactive prompting. This installation procedure is not
recommended for most sites or for clients, it was developed for use by
experienced SMA installation specialists in conjunction with other
installation tool sets. For this reason, the batch installation process
is not documented here in full detail.

 

Anyone installing or upgrading an LSAM using the batch installation
command, SMASETUPB, must already understand the LSAM software and also
the IBM i operating system.

 

When installing or upgrading an LSAM using the batch command, SMA
recommends that the job description selected to define the installation
job include the following settings that will produce the greatest
possible detail in the job log (also allowing for a possible job message
queue overflow):

**LOG(4 00 \*SECLVL) LOGCLPGM(\*YES) JOBMSGQFL(\*WRAP)**

 

Following is an example of the command prompt screens that appear if the
SMASETUPB command were prompted from an IBM i workstation command entry
line:

 

  -------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [This screen will show LI040006 using the latest install file.]
  -------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------

Batch Install Command Prompt - Screen 1 of 2

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------
                                                             Install SMA IBM i LSAM - Batch (SMASETUPB)
                                                                                  
                                                                     Type choices, press Enter.
                                                                                  
             [Installation source library  . . SRCLIB]{style="color: #008000;"}         [LI040006]{style="color: #008000;text-decoration: underline;"}              [SMAGPL alt lib (not QGPL)  . . . SMAUTL]{style="color: #008000;"}         [SMAGPL   ]{style="color: #008000;text-decoration: underline;"}
             [LSAM env tools library (QGPL?)   SMAGPL]{style="color: #008000;"}         [SMAGPL   ]{style="color: #008000;text-decoration: underline;"}                  [Convert QGPL content (Y/N)?  . . CVTOPT ]{style="color: #008000;"}        [N]{style="color: #008000;text-decoration: underline;"}
   [LSAM comm internet address . . . INTADR]{style="color: #008000;"}         [\'111.222.333.444\'          ]{style="color: #008000;text-decoration: underline;"}                                               [                  ]{style="color: #008000;text-decoration: underline;"}
             [LSAM subsystem name  . . . . . . SBSNAM]{style="color: #008000;"}         [SMASBS   ]{style="color: #008000;text-decoration: underline;"}              [LSAM machine name  . . . . . . . SYSNAM]{style="color: #008000;"}         [IBMILSAM ]{style="color: #008000;text-decoration: underline;"}
             [Job Sched Comm Port  . . . . . . JOBPORT]{style="color: #008000;"}        [3100     ]{style="color: #008000;text-decoration: underline;"}              [JORS Comm Port . . . . . . . . . JORSPORT]{style="color: #008000;"}       [3110     ]{style="color: #008000;text-decoration: underline;"}
             [SMA File Transfer Comm Port  . . SMAFTPORT   ]{style="color: #008000;"}   [3300     ]{style="color: #008000;text-decoration: underline;"}                  [Auto-start SMAFT server (Y/N)?   AUTOSFT        ]{style="color: #008000;"}[Y]{style="color: #008000;text-decoration: underline;"}
               [Use alternate environment name   ALTENV]{style="color: #008000;"}         [\*NO ]{style="color: #008000;text-decoration: underline;"}              [If ALTENV: Environment name  . . ENV            ]{style="color: #008000;"}[         ]{style="color: #008000;text-decoration: underline;"}
             [If ALTENV: Database library  . . SMADTA]{style="color: #008000;"}         [SMADTA   ]{style="color: #008000;text-decoration: underline;"}              [If ALTENV: PTF control library   SMAPTF]{style="color: #008000;"}         [SMAPTF   ]{style="color: #008000;text-decoration: underline;"}
                                                                               More\...
                                            F3=Exit   F4=Prompt   F5=Refresh   F12=Cancel   F13=How to use this display
                                                                           F24=More keys
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------

Batch Install Command Prompt - Screen 2 of 2

  -----------------------------------------------------------------------------------------------------
                               Install SMA IBM i LSAM - Batch (SMASETUPB)
                                                     
                                       Type choices, press Enter.
                                                     
   If ALTENV: Programs library  . . SMAPGM         [SMAPGM      ]{style="text-decoration: underline;"}                                                      
                                                     
                                                     
                                                 Bottom
              F3=Exit   F4=Prompt   F5=Refresh   F12=Cancel   F13=How to use this display  
                                              F24=More keys
  -----------------------------------------------------------------------------------------------------

The first few parameters of the SMASETUPB command will be recognized as
the same values as are shown in the interactive installation (SMASETUP)
first prompt screen. All of the discussions about the LSAM environment
and these installation parameters provided elsewhere in this topic must
be well understood before attempting to provide the values and execute
the SMASETUPB command.

 

Detailed information about the LSAM Parameter definition fields shown in
the SMASETUPB command prompt screens is provided in IBM i LSAM
Configuration.

 

To use the SMASETUPB command in a batch job, each of the parameter
keywords shown in the preceding examples should be specified, although
wherever the default command value for a keyword (as shown in the
example prompt displays) is acceptable, the keyword need not be
specified. The complete command line representing the example screens
above would appear as follows.

 

Here is the command syntax for installing the SMADEFAULT LSAM
environment, where the load source is library LI040006 (used for new
installs only). Note, however, that a valid IP address must be provided,
either as a parameter of this command, or after the installation has
been completed (using the LSAM main menu function 7: LSAM Parameters).
To use SMASETUPB for an upgrade, use library LI040003, which will cause
the default value (required) for SRCLIB to be \'LI040003\'.

**LI040006/SMASETUPB SRCLIB(LI040006) SMAUTL(SMAGPL) SMAGPL(SMAGPL)
CVTOPT(N) INTADR(\'111.222.333.444\') SBSNAM(SMASBS) SYSNAM(IBMILSAM)
JOBPORT(3100) JORSPORT(3110) SMAFTPORT(3300) AUTOSFT(Y) ALTENV(\*NO)
ENV(\*DEFAULT) SMADTA(SMADTA) SMAPTF(SMAPTF) SMAPGM(SMAPGM)**

 

To install an alternate LSAM environment, for example an environment
named IBMILSAM1, set the ALTENV parameter to (\*YES) and include the
ENV() keyword with the name of the alternate LSAM environment, as
follows:

**LI040006/SMASETUPB SRCLIB(LI040006) SMAUTL(SMAGPL1) SMAGPL(SMAGPL1)
CVTOPT(N) INTADR(\'111.222.333.444\') SBSNAM(SMASBS) SYSNAM(IBMILSAM)
JOBPORT(3100) JORSPORT(3110) SMAFTPORT(3300) AUTOSFT(Y) ALTENV(\*YES)
ENV(IBMILSAM1) SMADTA(SMADTA1) SMAPTF(SMAPTF1) SMAPGM(SMAPGM1)**

 

  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [To use the batch installation command for installing an alternate LSAM environment, the environment\'s library list must be defined in the keywords SMADTA, SMAPTF and SMAPGM. In the example above, the suffix \"1\" is used to designate the LSAM environment library names for the proposed IBMILSAM1 environment.]
  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Uninstalling the IBM i LSAM at Release 04.00.03

If it becomes necessary to remove the IBM i LSAM, use this procedure as
a guide to remove all of the objects that were installed in the IBM i
partition.

 

[Stop the LSAM]{.ul} 
```{=html}
<!-- -->
```
1.  Log in to each IBM i LSAM environment that has been installed under
    IBM i.
2.  From the **LSAM Master Menu**, enter **6**.
3.  From the **LSAM Management Menu**, enter **2** to end all LSAM
    operations. (Additionally, this option should terminate the IBM i
    subsystem that was assigned for use by the LSAM.)
4.  As of version 03.31.11 and newer of the IBM i LSAM, it is also
    possible to stop the LSAM using a command line from outside of the
    LSAM menu environment, for example, from the iSeries Navigator.
    Enter the Stop LSAM System command and include the name of the LSAM
    environment (default name SMADEFAULT, or \*DEFAULT) as show in this
    example:

[Back Up the LSAM libraries]{.ul} 
1.  *(Optional)* Back up IBM i LSAM libraries in order
    to be able to restore the existing configuration in the future. Use
    the SAVLIB command to perform a backup to the medium of your choice
    for each of these libraries:
    a.  Save the LSAM data library using the SAVLIB command for library
        SMADTA.
    b.  Save the LSAM program objects library using the SAVLIB command
        for library SMAPGM.
    c.  Save the LSAM program patches library using the SAVLIB command
        for library SMAPTF.
    d.  Save the LSAM program patches library using the SAVLIB command
        for library SMAGPL.

[Uninstall the LSAM]{.ul} 
 

Before attempting to uninstall the LSAM, make sure that the LSAM server
jobs and subsystem have been stopped. It is also critical that the LSAM
procedure for ending Job Tracking be performed, if Job Tracking had been
started, so that the LSAM tools can correctly remove exit program
entries from the IBM i exit program registration table.

1.  Sign on to the IBM i operating system as QSECOFR, or as a user with
    security officer authority to complete these steps. Using the
    following command, delete the installation\'s save file and the LSAM
    installation library, if not already done during the last steps of
    the installation process:

2.  [EITHER]{.ul}: Execute the SMA QGPL utilities removal command:\     **SMAPGM/UNINSTQGPL**

3.  [OR]{.ul}: If the SMAPGM library was already deleted, or the     UNINSTQGPL command fails for any reason, use the following manual
    instructions to remove every SMA utility object from the QGPL
    library. Do not be concerned if not every object is found in QGPL.
    a.  Delete the following commands from library QGPL: **DLTCMD**
        *\<Command Name\>*

    ```{=html}
    <!-- -->
    ```
    a.  Delete the following CL and RPG programs from library QGPL:

    ```{=html}
    <!-- -->
    ```
    a.  Delete the following files from library QGPL: **DLTF** *\<File
        Name\>*\

    b.  Delete the following data areas from library QGPL: **DLTDTAARA**
        *\<Data Area Name\>*
        -   **PTF**\*
        -   **RSTENVIRON**
        -   **SMAXNBR**

4.  Using the following commands, delete each of the LSAM libraries.
    Different library names may have been used if an alternate LSAM
    environment was created instead of using the default LSAM
    environment.
    a.  **DLTLIB SMAGPL**
    b.  **DLTLIB SMAPTF**
    c.  **DLTLIB SMAPGM**
    d.  **DLTLIB SMADTA**
    e.  **DLTLIB SMABAK** (This work library will only be present if SMA
        File Transfer was used with an instruction to back up an
        existing data file before replacing it with a file transfer.)
    f.  **DLTLIB SMALOG** (This common library used for LSAM debug log
        file extracts is shared by all LSAM environments. There is only
        one copy of the SMALOG library.)

5.  Repeat step 4) to remove the libraries that define any other,
    alternate LSAM environment that may have been created.

6.  Using the following commands, delete the LSAM software user profiles
    after all LSAM environments have been removed from the system:

7.  Be sure to remove any configuration and other data entry from the
    OpCon/xps Enterprise Manager that pertain to the IBM i installation
    being disabled.
:::

 


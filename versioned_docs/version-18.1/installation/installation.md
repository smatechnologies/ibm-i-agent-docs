---
sidebar_label: 'IBM i Agent 18.1 Installation/Upgrade Instructions'
---
# IBM i Agent 18.1 Installation/Upgrade Instructions 

## Summary of Installation Steps

The actual process of installing a new copy of the IBM i Agent (also referred to as the LSAM = Local Schedule Activity Monitor for OpCon) can take as little as 15 minutes or less, not counting the recommended study time. An upgrade, including all considerations, could occupy 2 to 4 hours, where the actual processing will vary depending on the size of the LSAM database tables.

SMA Support and the SMA Technologies Consultants are standing by to assist. Please notify SMA Support in advance of plans to upgrade a live production installation to the new version so that appropriate human resources will be available to respond quickly, if necessary.

SMA recommends studying this installation documentation before attempting an install or an upgrade to avoid mistakes and to be prepared for making sound decisions in case of an unexpected circumstance.

These are the phases of the installation/upgrade process:

- Determine the installation strategy that is appropriate for the site's circumstances.
- Perform appropriate Pre-Installation Checklist actions.
- If upgrading, prepare the existing environment with file purging and backups.
  - Optionally, clone an LSAM environment to safely perform a test upgrade.
- Transfer the LSAM install file to the IBM i partition and restore the install library.
- Launch the install command SMASETUP and respond to initial control value prompts.
  - Pay attention to the ALTENV parameter of the SMASETUP command.
- Perform Post-Install actions to make the Agent software ready for execution.
- Review the additional topics to identify if the site has any special circumstances needing attention.

## Introduction to Installation Strategies

New clients of SMA can skip ahead to the Pre-Installation Checklist and then perform the New Install Instructions.

Clients of SMA who are installing the OpCon Agent for IBM i (also referred to as the LSAM in this document) for the first time in an IBM i partition (LPAR) can skip ahead to the section describing how to perform a new installation, bypassing the instructions for cloning an existing environment and bypassing the upgrade instructions.

Clients who will be upgrading an existing IBM i LSAM should consider the following optional strategies that can be used to test the new version of the LSAM and experiment with the new features before deciding to upgrade the previous LSAM version in place.

- Best practice: Clone the existing 04.00.03 SMADEFAULT production LSAM environment to an Alternate LSAM Environment, then upgrade the Alternate Environment as a first test.
- Optional second choice: Install a new copy of the 18.1 version of the LSAM as a New Install, but if installing in the same LPAR as an existing 04.00.03 version, be sure to use a different Environment name and unique names for the four LSAM libraries.
- Not recommended: Perform an upgrade in place of the existing LSAM environment without first testing by one of the two previous methods. SMA will always support the upgrade of the LSAM software itself, but SMA cannot guarantee that all of the client's automation strategies will still work exactly as before the upgrade -- although most of the LSAM automation toolkit features have not changed enough to cause much concern.

:::caution
Regardless of the strategy chosen, remember to make a complete backup copy of the four LSAM libraries before performing any upgrade. The database upgrade process cannot be reversed in place. The only recovery method available in case an upgrade fails and cannot be repaired is to restore from backups.
:::

The choice of upgrade strategies may depend on the configuration of one or more IBM i LPARs.

When the client operates only one IBM i LPAR, the only option for testing automation before putting it into production is to install a second copy of the LSAM into the same partition but using a unique Environment name and unique names for the four LSAM libraries.

For single LPAR environments, SMA recommends cloning the production copy of the LSAM (the SMADEFAULT environment). After following the cloning instructions below, complete the configuration steps to make sure the cloned environment is working at the original 04.00.03 level. Then use the version 18.1 Upgrade procedure to advance the test LSAM environment to the new version and perform a review of the LSAM functions to make sure the test environment is working as expected.

:::tip
The licensing of the Agents (LSAMs) installed under any operating system is managed according to how many instances of that operating system Agent are actively connected to the OpCon application server at once. This means that if the client had only one IBM i LSAM license, it will not be possible to connect both the production copy of the LSAM and a test copy of the LSAM to the OpCon server at the same time. In this case, the client should contact their SMA sales or account representative to request an additional IBM i LSAM license.
:::

Single LPAR clients may already be operating a Production and a separate Test copy of the LSAM. In this case, it might be acceptable to upgrade the Test copy directly, as long as a complete backup of the Test environment is completed first. However, if the Test environment will still be needed to pre-stage new automation that must be exported to the Production environment, then it would be necessary to clone the Test environment into a separate Test181 environment and use the Test181 environment for a first run of the LSAM 18.1 upgrade procedure.

:::caution
Whenever executing the LSAM 18.1 upgrade within an LPAR that is also executing the Production copy of an LSAM, be sure to make a complete backup copy of the Production LSAM environment before attempting to upgrade a separate Test environment. This warning recognizes that it is possible for an operator to make a mistake during the execution of the SMASETUP command, causing that procedure to affect the Production environment by accident.
:::

The ideal circumstance is to have a separate IBM i LPAR that is dedicated to Production, keeping all test procedures isolated in a different IBM i LPAR. In this case, the test copy of the IBM i LSAM will often use the same LSAM environment and library names as the production copy of the LSAM, given only that the Test LSAM must use a unique machine name (= the LSAM name in the LSAM Parameters on the green screen maintenance display).

When test operations are isolated in a separate IBM i LPAR, best practice suggests that a complete backup should be made of the test LSAM environment before starting any cloning or upgrade testing. It is possible to proceed with a direct upgrade of the existing test LSAM environment. But if time and resources permit, the safest practice would probably be to clone the TEST LSAM to a TEST181 LSAM environment with unique library names and then perform the first test run the upgrade against the TEST181 environment. This strategy would become a requirement as long as the TEST LSAM is needed to feed updates to the Production LSAM in the other LPAR. It is not possible to use the LSAM Export/Import tools to exchange data between the versions 04.00.03 and 18.1.

## Pre-Installation Checklist

Whether installing a new LSAM or upgrading an existing LSAM, it may be necessary to consider the following comments and the Pre-Installation Checklist that follows. Any of the points in this list of requirements and conditions could prevent a successful installation.

### OpCon Versions Supported by LSAM 18.1

Good news! IBM i LSAM version 18.1 is compatible with all currently supported versions of OpCon. It is not necessary to upgrade OpCon to take advantage of many of the latest LSAM enhancements, but some of the newest features added to the LSAM may only work (or work best) with OpCon version 17.1.3 or newer. Some of the newer LSAM features might require a manual update to the SQL Server database supporting an older version of OpCon. SMA recommends that clients using versions of OpCon older than 17.1.3 should discuss the circumstances with their SMA Technologies Consultant or contact SMA Support for advice.

:::tip
In particular, the configurations for supporting TLS Secured communication links are sensitive to the version of OpCon, and the OpCon database will likely require execution of an SQL update procedure to activate support for TLS security of the SMA File Transfer jobs.

There is a Post-Install Instruction below that explains how to complete this update.
:::

### IBM i Operating System Versions Supported by 18.1

The IBM i operating system must be at version V7R1 (i7.1) or higher to use the IBM i LSAM version 18.1. Correct operation of the LSAM version 18.1 is also certified for IBM i7.2 and i7.3.

As of the date of this publication, only in rare circumstances will IBM still be supporting IBM i versions V6R1 (i6.1) or V5R4. Clients who are unable to upgrade to i7.1 or newer can still use OpCon to automate their operations within IBM i, but those clients can only use the last edition of the IBM i LSAM version 04.00.03 with all the latest LSAM software patches (LSAM PTFs) applied.

IBM i LSAM version 04.00.03 is frozen in its range of features as version 18.1 is released, and SMA will only provide emergency fixes for production failures to clients using the version 04.00.03 of the IBM i LSAM. SMA's ability to provide emergency fixes may be terminated at any time, based on whenever the IBM equipment at SMA is no longer able to support software compiled back to IBM i version V5R4. In that case, clients would use LSAM version 04.00.03 at their own risk. Be aware that IBM will soon end its support for i7.1, which is the last level that can still compile back to V5R4.

All clients who want new features and future available software fixes must upgrade to LSAM version 18.1.

Versions of i5/OS or OS/400 older than V5R4 are not supported at all, either by IBM or by SMA.

:::warning
Whenever the IBM i operating system has been upgraded to a new release version (e.g., from i7.3 to i7.4) it is necessary to execute the IBM i LSAM utility command LSAINIT.  This requirement exists as long as the LSAM is still using clones of the IBM i command "SBMJOB."  SMA will notify users if and when the LSAM stops using these cloned commands.  Meanwhile, here are the steps for using LSAINIT.
:::

  1.  Log into the LSAM menu system.
  2.  Stop the LSAM server jobs.  

      - A convenient way to do this is from the LSAM sub-menu 6, option 2.  
      - Automating this step can be accomplished using a batch job that runs in a subsystem other than SMASBS, such as QBATCH, to execute the command SMAGPL/ENDSMASYS SMADEFAULT.  For alternate LSAM environments, replace the name "SMADEFAULT" with the actual LSAM name for that environment.

  3.  From the IBM i command line in the LSAM menu system (or from any IBM i QCMD entry in a job that is set to use the LSAM library list) execute the LSAINIT command as follows, paying close attention to the required two parameter values:

       **LSAINIT ENV(SMADEFAULT) GPL(SMAGPL)**
      
      Change the environment name and the SMAGPL library name when updating an alternate LSAM environment.

### IBM i User Profiles for the LSAM

For new installations, the instructions explain that the IBM i user profiles SMANET and SMASAV can be created manually, before starting execution of the SMASETUP or SMASETUPB installation commands. This would be required to preserve the correct object ownership of LSAM software installation components. This is also good practice because it allows the user to review and approve the authorities granted to these user profiles.

However, for all practical purposes, it is acceptable to allow the SMASETUP command(s) to create those user profiles automatically. The LSAM installation tools will be removed from the system after all installs or upgrades are completed.

Please note that the default authority assigned to the LSAM server user profile SMANET is very powerful. This is considered safe because this user profile must not be assigned a password, and public use of this profile is revoked. However, high security sites may need to consider the discussions in the Post-Install Instructions and the LSAM Security and Object Authority topic about LSAM authorities in order to determine an appropriate alternative strategy for managing the authority of this user profile.

### IBM i System Value Management

#### QALWOBJRST - Allow Restore of Objects Using Adopted Authority

It may be necessary to change this system value for the IBM i operating system to permit the installation program to restore program objects that use adopted authority. This is a common strategy, and IBM provides the following guidelines for managing the installation of new software.

The Allow Restore of security sensitive Objects (QALWOBJRST) system value specifies whether objects with security-sensitive attributes can be restored. It is important to set the value to *ALL before performing the following system activities:

- Installing a new release of the operating system.
- Installing new licensed programs.
- Applying program temporary fixes (PTFs).
- Recovering your system.

These activities can fail if the value of QALWOBJRST is not set to \*ALL. 

**Use this procedure:**

- Use the command DSPSYSVAL to view and record the current setting for the value QALWOBJRST. Current value: ___________________. If the value is already \*ALL, skip this procedure.
- If you have previously locked this system value, go to SST (system service tools) and unlock it.
- Use the command CHGSYSVAL to set QALWOBJRST to a value of \*ALL.
- Complete the software installation or upgrade.
- To ensure system security, return the QALWOBJRST value to your normal setting (recorded above) after completing the software installation.

:::tip
IBM i LSAM administrators must remember to manage this system value also during application of LSAM software patches (PTFs).
:::

#### QALWUSRDMN - Allow User Domain Objects

Rarely, some IBM i partitions with high security requirements engage the strategy of managing the User Domain of objects.  Information from IBM about this system value is copied below, for convenience.

As it may affect the OpCon Agent for IBM i, this system value must be set to one of the following two configurations:

- The IBM default for this system value is "\*ALL". meaning that there are no domain restrictions that would inhibit the operation of the OpCon Agent for IBM i.
- IBM i partitions that use this system value to list user libraries where object types that are normally restricted to the System Domain might be stored must be sure to include the QTEMP library in the list.
  - The IBM i Agent, in this version 18.1 had been storing a User Space (LSACONU00) in the SMADTA library.  That configuration was removed from the LSAM version 18.1 by LSAM PTFs # 181091 and 181092.  Consequently, LSAM version 18.1 (and later) no longer stores *USRSPC objects in the SMADTA library.  If this library had previously been registered in this system value, it can now be removed.
  - The IBM i Agent includes many programs that retrieve system data via APIs (application program interfaces) that all require a user space for storing retrieved data.  But the Agent always only specifies library QTEMP (a job's temporary library) for storing \*USRSPC objects.  As specified in IBM i documentation (copied below), if this system value is not set to *ALL, then library QTEMP **must** be registered in the library list for system value QALWUSRDMN.

##### IBM i7.1 References about QALWUSRDMN

The URL for IBM i documentation about this system value is:

https://www.ibm.com/docs/en/i/7.1?topic=values-allow-user-domain-objects-qalwusrdmn

IBM i7.1 references are included for Agent version 18.1 because it was compiled to i7.1.

Copied from this URL is the following information from IBM.

:::info
Allow User Domain Objects (QALWUSRDMN)

Last Updated: 2021-03-08

All objects are assigned a domain attribute when they are created. A domain is a characteristic of an object that controls how programs can access the object. The Allow User Domain Objects (QALWUSRDMN) system value specifies which libraries are allowed to contain user domain objects of type \*USRSPC, \*USRIDX, and \*USRQ.

Systems with high security requirements require the restriction of user \*USRSPC, \*USRIDX, \*USRQ objects. The system cannot audit the movement of information to and from user domain objects. The restriction does not apply to user domain objects of type program (\*PGM), server program (\*SRVPGM), and SQL packages (\*SQLPKG).

Note: This system value is a restricted value. See Security system values for details on how to restrict changes to security system values and a complete list of the restricted system values.

  Table 1. Possible values for the QALWUSRDMN system value:
  - **\*ALL**	User domain objects are allowed in all libraries and directories on the system. This is the shipped value.
  - **\*DIR**	User domain objects are allowed in all directories on the system.
  - **library-name**	The names of up to 50 libraries that can contain user domain objects of type *USRSPC, *USRIDX, and *USRQ. If individual libraries are listed, the library QTEMP must be included in the list.

**Recommended value**: For most systems, the recommended value is *ALL. If your system has a high security requirement, you should allow user domain objects only in the QTEMP library.

Some systems have application software that relies on object types \*USRSPC, \*USRIDX, or \*USRQ. For those systems, the list of libraries for the QALWUSRDMN system value should include the libraries that are used by the application software. The public authority of any library placed in QALWUSRDMN, except QTEMP, should be set to \*EXCLUDE. This limits the number of users that can use MI interface to read or change the data in user domain objects in these libraries without being audited.

**Note:** If you run the Reclaim Storage (RCLSTG) command, user domain objects might need to be moved in and out of the QRCL (reclaim storage) library. To run the RCLSTG command successfully, you might need to add the QRCL library to the QALWUSRDMN system value. To protect system security, set the public authority to the QRCL library to \*EXCLUDE. Remove the QRCL library from the QALWUSRDMN system value when you have finished running the RCLSTG command.
:::

### System Resource Requirements

The initial system resource requirements of this LSAM software can be specified, however, the LSAM requirements are dynamic, based on the average profile of the work load assigned to the LSAM via OpCon scheduled jobs.

### Main Memory

The program objects of the basic LSAM server programs require about 9 MB of main memory. However, more memory is typically required because some of these 8 LSAM server jobs call sub-programs or spawn additional, temporary tasks.

### Disk Utilization

The installation file occupies about 63 MB of disk space. This space will be returned to the system after the installation is completed and the install file (LI181001, or newer name such as LI181013) is deleted.

The total initial disk space temporarily occupied by the installation library (LI181001) is 71.5 MB.

The installed LSAM libraries occupy the following amounts of disk space before the LSAM software begins operation:

- SMAGPL (LSAM utilities and supporting data): 16.7 MB
- SMADTA (LSAM database tables, will increase significantly, depending on LSAM purge criteria; poor management can eventually result in files as big as 10 GB): 26.7 MB
- SMAPTF (will hold LSAM PTF rollback save files): 2.3 MB
- SMAPGM (non-volatile LSAM program objects, change only when LSAM PTFs add or replace programs): 176.9 MB

### Database Mirroring Considerations

If database replication (mirroring) is not being used, then skip to the next checklist item.

Please refer to the unified discussion of [Managing Database Mirroring](/reference/database-mirroring#managing-database-mirroring-1).

### Upgrading from an LSAM Version Older than 04.00.03

Upgrades from LSAM versions older than 04.00.03 require the use of the LI040003 install file to convert existing LSAM database tables up to the 04.00.03 level. The upgrade to LSAM version 18.1 does not support a direct upgrade from any version older than 04.00.03.

After upgrading to version 04.00.03, it is not necessary to apply all cumulative PTFs to that version of the LSAM, unless the Cloning process outlined below will be used. The upgrade to version 18.1 will work from any patch level of version 04.00.03.

Please ask the Support team at SMA for assistance installing a manual fix to the 04.00.03 product before you attempt to install cumulative PTFs for the first time. The fix was contained in PTF # 403033 and the solution is to replace the program UPRCASR. This program can be replaced manually before starting the LSAM version 04.00.03 PTF application process.

## Instructions for Upgrading from 04.00.03 to 18.1

These are topics and actions that must be considered when planning to upgrade an existing LSAM environment. If an existing LSAM environment is not being upgraded, skip to the [New Install Instructions](../installation/installation.md#new-install-instructions) that follow this section.

The foundation for upgrade preparation is determined by the Installation Strategies for version 18.1, discussed above. Part of the strategy is to determine which existing LSAM libraries should be backed up, and when they should be backed up (**HINT: Always**).

During the upgrade process, the LSAM install command SMASETUP will rename the existing versions of the SMAGPL, SMAPTF and SMAPGM libraries to a backup name based on the time of day at execution, prefixed by one of these strings:

SMAG\*, SMAT\* and SMAP\*

However, the SMADTA library will be upgraded in place. Therefore, it is critical to perform a complete backup of the SMADTA library after operations are suspended for the LSAM Environment, and just before beginning the upgrade procedures.

### Libraries Affected by the Upgrade

The only libraries affected by an upgrade to version 18.1 are those libraries that define an isolated LSAM Environment:

- **SMAGPL**: Contains the LSAM PTF control files and programs.
- An optional, alternate library containing LSAM environment management commands, if that library is different from SMAGPL. Use the IBM i command DSPDTAARA to view the value stored in the data area: SMADTA/SMAGPL. If it is not the same as the actual SMAGPL library, then this other library will also be affected.
- **SMADTA**: The LSAM database library, with all master files and log files for daily LSAM operation.
- **SMAPTF**: Now used only to store backup save files of LSAM objects replaced by recently installed LSAM PTFs.
- **SMAPGM**: Most of the LSAM program objects (except the PTF tools stored in library SMAGPL).

Libraries that are utility libraries, currently shared by any/all LSAM environments (though that sharing will be eliminated in a future version of the LSAM), will NOT be affected by the upgrade:

- **SMALOG**: Stores IBM i save files created by the LSAM daily maintenance and the SMARGZ command, as well as LSAM Export/Import save files (unless the user specifies a different library to hold these save files).
- **SMABKP**: Stores backup copies of files replaced by the SMA File Transfer utility, whenever an OpCon job is configured to request a backup before an existing file will be replaced by a file transfer.

### Using Library Cloning to Create a Test Upgrade Environment

As the Installation Strategy suggests, SMA recommends performing an isolated upgrade test. This safety measure will prove if there are any exceptional circumstances in a client's environment that were not anticipated by SMA during the development, internal QA testing or external beta site testing of the newest LSAM version.

For details about Cloning an LSAM environment see [Clone an Existing Environment](/reference/multiple-environments-how-to-add-an-lsam-environment#method-2-clone-an-existing-environment) which includes details about how to use the LSAINIT command that is required to complete alignment and configuration of a cloned LSAM environment.

### Preparing an LSAM Environment for Upgrade

#### Purging the LSAM database log files and deleted records

Both the backup steps and the upgrade steps can be completed much more quickly if the LSAM database in the SMADTA library has been effectively purged using the LSAM Parameters database maintenance values (LSAM main menu, option 7).

Use the IBM i command DSPOBJD to display a list of all objects of type \*FILE in the SMADTA library (or its equivalent in an alternate environment). Search the list for any files that are extremely large.

If changes are required to make the LSAM log file purging more effective, it will be necessary to:

- Stop and restart the LSAM server jobs so that the new purge control values will be in effect.
- Allow the LSAM server jobs to operate during at least one cycle that passes the Maintenance Hour specified in the LSAM Parameters. (**HINT:** It is possible to change the maintenance hour to some time in the near future, but again, the LSAM server jobs must be stopped and restarted for this change to take effect. Do not forget to reset the Maintenance Hour back to its usual time after the out-of-cycle purge process has completed.)

The other LSAM maintenance process that is critical is to reorganize the LSAM database using the SMARGZ command. This command and its operation are explained in detail in the [Log File and Database Management](../logs-database/overview.md) section.

The SMARGZ command will either be executed automatically during the next Maintenance Hour, if the LSAM Parameters controlling this option are set accordingly, or else the SMARGZ command can be executed either from the IBM i command entry line (within the LSAM menu system so that the LSAM library list is in effect), or by configuring an OpCon IBM i Batch Job with the SMARGZ command in the "CALL" box. Details about how to use these strategies are documented in the [Log File and Database Management](../logs-database/overview.md) section of the **IBM i LSAM** documentation.

#### Suspending LSAM Server Operations Before Starting an Upgrade

The LSAM databsae purging procedures mentioned above may require that the LSAM server jobs remain active at least until the last daily log file purges are completed.  However, before starting the actual execution of the SMASETUP command for upgrading an existing LSAM, it is required to suspend the following LSAM services:

- Stop the LSAM server jobs.
  - If used, this process will also stop the Alternate Job Notify service.
  - If used, this process will also stop the LSAM Message Management service.
- Use LSAM menu 2 to deactivate (stop) the LSAM Job Tracking service.
  - Job Tracking operations can be interrupted by the upgrade process.
  - Restarting the Job Tracking service after an upgrade performs a critical check of certain Job Tracking configuration parameters.

### Backing Up the LSAM Environment

Existing users of the IBM i LSAM are advised to use the following steps, or a similar procedure, to create a backup of the existing LSAM installation. Although SMA has invested great effort to ensure that the install procedure will perform a proper upgrade of existing installations, it is wise to protect the existing LSAM database in case some unexpected circumstance may arise that is unique to a client site.

:::tip
It is required to manually stop the LSAM server jobs before starting the upgrade installation. For many backup strategies it is also necessary to remove object locks by ending the LSAM server jobs. This can be done using the LSAM sub-menu 6, option 2. There is also the LSAM utility command SMAGPL/ENDSMASYS that can be executed, specifying the LSAM environment name after the command name, such as:
```
SMAGPL/ENDSMASYS SMADEFAULT
```
For alternate LSAM environments, change the name of the SMAGPL library and specify the actual LSAM environment name instead of the default value shown above.
:::

### Back Up LSAM Libraries and Delete Obsolete Objects

Choose 1) or 2):

1. *EITHER*: Terminate the LSAM by issuing the **ENDSMASYS** command. Newer versions of this command may support an optional ENV parameter that can be used to designate the name of the LSAM environment to be stopped. Use F4=Prompt to determine if the ENV parameter is supported. Otherwise, it is necessary to set the job's library list to the LSAM environment library list. This can be done using the SMASETLIBL command. Refer to [SMASETLIBL](../environment/commands.md#smasetlibl) for more information about LSAM environments and the SMASETLIBL command.
2. *OR*: From LSAM menus, terminate the LSAM with the following steps:

1. From the **LSAM Master Menu**, enter **6**.
2. From the **LSAM Management Menu**, enter **2** to execute the **End LSAM** function.

3. When the LSAM is inactive:

a.  Save the LSAM data library using the SAVLIB command for library
    SMADTA.

    **SAVLIB LIB(SMADTA) DEV(<***backup device***>) PRECHK(*YES)
    ACCPTH(*YES)**

b.  Save the LSAM program objects library using the SAVLIB command for
    library SMAPGM.

    **SAVLIB LIB(SMAPGM) DEV(<***backup device***>) PRECHK(*YES)
    ACCPTH(*YES)**

c.  Save the LSAM program patches library using the SAVLIB command for
    library SMAPTF.

    **SAVLIB LIB(SMAPTF) DEV(<***backup device***>) PRECHK(*YES)
    ACCPTH(*YES)**

d.  Save the LSAM utility objects library using the SAVLIB command for
    library SMAGPL.

    **SAVLIB LIB(SMAGPL) DEV(<***backup device***>) PRECHK(*YES)
    ACCPTH(*YES)**

The SMABAK library does not require a backup if it exists as a result of installing and using recent versions of the LSAM. This library is not updated by the LSAM upgrade procedure. It exists solely for the purpose of storing backups requested by SMA File Transfer jobs. Similarly, the SMALOG library is used only for temporary storage of save files produced by the SMASUP command and the LSAM log file purge and backup routines. It is not updated during the LSAM upgrade installation.

It is not necessary to delete any LSAM utility objects that were previously (optionally) installed in QGPL. These utilities will be updated as necessary by the SMASETUP installation procedure.

If LSAM objects were previously installed in the IBM library QGPL, review the discussion below (following the step-by-step instructions) to evaluate the available options for installing the upgraded LSAM utilities in either the current location of library QGPL, or in the LSAM standard (non-IBM) library called SMAGPL. SMA recommends utilizing the upgrade option that can automatically migrate LSAM objects and environment control data out of the QGPL library, that is, whenever upgrading the Production copy of the LSAM.

Proceed to the New Install Instructions. These instructions include any exceptional steps that might be required when upgrading an existing LSAM environment.

## New Install Instructions

### The LSAM Installation Save File

From time to time, SMA may produce updated versions of the LSAM installation save file, to include previously released software patches (LSAM PTFs). This technique reduces the time required for an installation by eliminating a separate step to apply several older software patches.

A unique name is assigned to each new version of the LSAM installation save file, matching the software patch level (also referred to as the LSAM PTF Level). For example, if the installation save file includes PTF # 181013 (that is, patch level 013 for version 181 of the LSAM), then the installation save file will be named LI181013.

However, the content of the installation save file will always be contained in the original version build library named LI181001.

To distinguish between the installation save file and the install library that it contains, this document will refer to the two different objects using this naming convention:

- LI181ppp = the installation save file, which is a binary stream file that will be transferred to an empty IBM i save file, where "ppp" refers to the latest LSAM PTF level.
- LI181001 = the installation library that contains all the programs, files and LSAM library save files will always be called "LI181001".

Installers should always be sure to obtain the latest IBM i LSAM (Agent) installation save file. The save file that has the highest number will be the latest version, and only one version will be posted at a time in the IBM i Agent software support download directories. For example, an install file named LI181065 is a later version than LI181013, since it will contain all patches through PTF * 181065.

After the LSAM installation or upgrade is complete, using the Agent command SMAGPL/STRSMA will produce a splash display that shows the "load source" information. The display will show, for example, "LI181001 PTF181013" to represent that the base Agent version was 18.1 and the latest LSAM PTF contained in the install file was PTF * 181013. This is the profile that would be expected when using an IBM i LSAM Installation Save File named LI181013.

## Install the LSAM

### Log in to IBM i

1. From an IBM i green screen workstation (such as an Access for IBM i display emulation session) or from an IBM i console, sign on to the system as **QSECOFR**. A user profile with all object (\*ALLOBJ) authority and security administration (\*SECADM) authority may also be used.
2. Enter **CALL QCMD** to go to the full **Command Entry** screen. This makes installation messages and steps easier to monitor.
3. Change the interactive job attributes using the following two commands:

    - Messages sent to the user message queue (of QSECOFR or the user name used to sign on) can be displayed immediately on the green screen console, workstation, or emulation session by entering the command:
  ```
    CHGMSGQ <user_name> *BREAK
  ```

    - Request fully detailed job logging with the following command. This level of logging makes diagnosis much easier in case there is an error during the installation:
  ```
    CHGJOB LOG(4 00 *SECLVL) LOGCLPGM(*YES) JOBMSGQFL(*WRAP)
  ```
  
4. Create a working save file for use during the installation to the IBM i partition by entering the command:
  ```
    CRTSAVF QGPL/LI181ppp
  ```
  This empty save file should be named to match the latest version of the IBM i LSAM (Agent) Installation save file, such as LI181013, where 013 replaces the symbolic letters "ppp.".  This will be important for distinguishing newer versions of the install file versus older versions.

### FTP the LSAM Save File

From a Microsoft Windows system (or other operating system that can read binary installation media files and act as an FTP client), use FTP or another file transfer application to transfer the LSAM's save file from the OpCon Installation media to library QGPL on the target machine. The save file transfer to the LSAM machine MUST use a binary transfer mode to avoid corrupting the IBM i save file content.

From a Windows machine, use the following steps:

5. Use menu path: **Start > Run**. That is, click on **Run** in the right mouse menu of the Windows Start options.
6. Type **cmd**.
7. Click **OK**.
8. Change the drive reference to the "OpCon Installation Media" by entering the Drive Letter followed by a colon (:). When using an installation save file that was transferred electronically instead of on an installation media, change the drive reference to the hard disk (or network) location of the installation save file.

:::info example
```
C:\your_default_directory> D:
D:\>
```
:::

9. Change the directory to the "IBM i LSAM installation directory". When using an installation save file that was transferred electronically or a custom installation media, the directories shown in the following example will probably have different names.

:::info example
```
D:\>cd Install\LSAM\IBM i LSAM
D:\Install\LSAM\IBM i LSAM>
```
:::

10. At the prompt, enter **ftp** <LSAM Machine Name or TCP/IP address>. In order to use the LSAM Machine Name, this name must be registered either in the MS Windows "hosts" file or it must be found in the connecting networks domain name services table.
11. Log in as **QSECOFR** with the appropriate QSECOFR password. An alternate LSAM installation user profile that was used to create the save file in QGPL may also be used.
12. Enter **bin** to select a binary transfer type.
13. Enter the following FTP PUT commands to send the file:
```
  PUT LI181ppp QGPL/LI181ppp
```
14. Enter **quit** to exit the FTP utility.
15. Enter **exit** to close the command entry window.

:::info example

The following shows a typical FTP procedure in a DOS command window for
a new install.
```
D:\Install\LSAM\IBM i LSAM>ftp <LSAM Machine Name or TCP/IP
address>
Connected to <IBM i Name or IP Address>.
220-QTCP at <IBM i Name or IP address>
220 Connection will close if idle more than 5 minutes.
User (<IP address>:(none)): QSECOFR
331 Enter Password.
Password: <QSECOFR password>
230 User QSECOFR logged in.
ftp> bin
200 Representation type is binary IMAGE.
ftp> PUT LI181013 QGPL/LI181013
200 PORT subcommand successful.
150 Sending file to member LI181001 in file LI181001 in library
QGPL.
________ bytes sent in ______ seconds _____ Kbytes/sec
ftp> quit
221 QUIT subcommand received
D:\Install\LSAM\IBM i LSAM>exit
```
:::

### Create SMA User Profiles

16. When installing the IBM i LSAM for the first time, SMA recommends creating the required two user profiles manually to preserve the object authority of the installation tool software that will be restored to your system in the next step. Enter the following two commands.

  Optionally, this step may be skipped because the SMASETUP command below will create the user profiles if they do not exist, and the LSAM installation tools will still operate correctly. Creating the user profiles in advance presents an opportunity to customize the user profiles according to local standards.

:::tip
It is normally possible to copy the following text and paste it into the IBM i workstation command entry line, then modify the parameter values as required.
:::
```
CRTUSRPRF USRPRF(SMANET) PASSWORD(*NONE) INLPGM(*NONE)
  INLMNU(*SIGNOFF) TEXT('SMA IBM i LSAM server user profile')
  SPCAUT(*JOBCTL *SPLCTL *ALLOBJ)
```    
```
CRTUSRPRF USRPRF(SMASAV) PASSWORD(smasav_password) INLPGM(*NONE)
  INLMNU(*SIGNOFF) TEXT('SMA restricted mode user profile')
  SPCAUT(*JOBCTL *SPLCTL *SAVSYS)
```
:::tip
The *ALLOBJ special authority granted to user SMANET is discussed below under the topic of [Introduction to Installation Strategies](#Introduc) as well as in the [LSAM Security and Object Authority](../security/strategy.md) section of the **IBM i LSAM** documentation.
:::

### Prepare the Installation Library
17. Restore the distribution library, which includes the setup command and its processor program, from the save file QGPL/LI181ppp by entering the command:

  ```
    RSTLIB SAVLIB(LI181001) DEV(*SAVF) SAVF(QGPL/LI181ppp)
  ```
  ... where "ppp" is the LSAM PTF level of the newest Installation Save file.

  :::tip
  Messages are displayed indicating the results of the restoration. Disregard messages about security or data format changes. If messages appear at the bottom of the command entry display, a white plus sign (+) is displayed in the lower right-hand corner indicating if there are additional messages about the current command. Place the cursor on the message line and press the ***PageDown*** button to view any additional messages. Please report any  unexpected messages to the SMA Technologies Support team for assistance.
    
    ***Do not continue with this install procedure if there are unexpected messages.***
  :::

18. When upgrading an existing LSAM environment, it is required to stop the LSAM server jobs before starting the SMASETUP command. Failure to stop the LSAM server jobs will result in an error during the upgrade procedures when the SMAGPL library is being replaced. 

    The LSAM menu system, sub-menu 6, option 2, can be used to stop the LSAM server jobs. There is also the LSAM utility command SMAGPL/ENDSMASYS that can be executed, specifying the LSAM environment name after the command name, such as:
    ```
    SMAGPL/ENDSMASYS SMADEFAULT
    ```
    For alternate LSAM environments, change the name of the SMAGPL library and specify the actual LSAM environment name instead of the default value shown above.

19. Add the installation library to the interactive job library list by entering the command:

    ```
    ADDLIBLE LIB(LI181001) POSITION(*FIRST)
    ```

### Run the Installation Procedure
:::tip
Before starting the SMASETUP command, it may be necessary to review the information about the standard LSAM utilities library, presented below the step-by-step instructions.

This note is especially important for two types of users:
  - Clients who might have chosen to install some LSAM utility commands and files into the IBM i library QGPL.
  - Clients who had previously configured the LSAM to share the SMAGPL library among multiple LSAM Environments.
  - Clients who do not have or intend to configure either of these conditions can skip the remainder of this notice.

SMA no longer supports sharing an SMAGPL library between LSAM Environments. Some functions may not behave as expected, and it is especially difficult to properly synchronize LSAM PTF application when the SMAGPL is being shared. Contact SMA Support for assistance with separating LSAM Environments.

During the interactive installation process, the program will present an initial prompting screen that requires careful decisions about whether to use SMAGPL or use (or retain) the IBM library QGPL.

SMA strongly recommends against installing LSAM software into the IBM i library QGPL. SMA recommends taking advantage of this opportunity to automatically migrate LSAM functions out of QGPL and into the SMAGPL library dedicated to the LSAM Environment that will be upgraded. For assistance with managing multiple LSAM Environments that may share the QGPL contents, please contact SMA Support.

More information on this subject is offered in the LSAM Environment Management section of the IBM i LSAM documentation.
:::

<u>Choose 20 or 21</u>, depending on whether the normal SMADEFAULT Environment or an Alternate LSAM Environment will be used*:

20. <u>EITHER</u>: Start the default installation procedure by entering the command: 
    **SMASETUP**

21. <u>OR</u>: To modify the installation for installing or upgrading an environment other than the SMADEFAULT environment, set the ALTENV parameter of the SMASETUP command to (*YES).

    Type the **SMASETUP** command and then press function key **F4** to view and enter the ALTENV parameter value correctly. Then press **Enter** to continue.

  :::warning
  Please contact SMA Technologies Support before attempting to use the ALTENV(\*YES) option for the first time. There are additional installation and  configuration steps required when multiple environments are set up. These steps are documented in the LSAM Environment Management section of the IBM i LSAM documentation. However, SMA Technologies wants to consult with clients who plan to use multiple environments before they attempt to install them.
  :::

22. As objects are restored from the installation save file, there are status messages displayed at the bottom of the screen to indicate the progress of the installation. The display screen may also appear blank for some time. <u>No action is required</u>. 
23. Use the reference information published below for assistance with entering data on either of the two (or four, when ALTENV = *YES) control data displays that will be presented during the installation.

24. When the installation procedure has finished normally, the following completion message is displayed:

    **\*\*\* IBM i LSAM installation completed normally \*\*\***

  :::warning
  If the message indicating that the installation completed normally does not appear, or if the process ends with some other message, please contact SMA Technologies Support for assistance. Do not attempt to use the LSAM installation until the errors have been resolved. During the installation, or following an abnormal end of the command, it is very important not to reply to any error messages, should one appear, until the meaning and effect of the reply can be understood. Please contact SMA Technologies Support for advice, and leave the error message on display so that the circumstances of the error can be evaluated. Failure to follow this instruction will produce unpredictable results.
  :::
25. Perform the Post-Install Instructions and review the information topics that follow the Post-Install Instructions, as they may apply.

## LSAM Installation Options

### Managing the SMAGPL Library

This topic provides guidance for configuring the LSAM installation or upgrade to support various optional configurations of some LSAM utilities. Information about how the LSAM standard utilities library SMAGPL is used is provided in the [LSAM Environment Management](../environment/index.md) topic.

Existing LSAM installations might have chosen in the past to install the LSAM utilities in the IBM library QGPL, or to allow the utilities to remain installed in the default LSAM utility library SMAGPL. Sites who are upgrading an existing LSAM installation from a version prior to LSAM version 04.00.00 would already have the LSAM utilities installed in the IBM library QGPL, if they were not already migrated to the SMAGPL library.

During an upgrade installation of the current LSAM version, existing installations have an option to remove the utilities from QGPL and convert any existing LSAM environment information to the SMAGPL library. The QGPL library is no longer acceptable for normal LSAM operation. Please observe the CAUTION box information below.

Using library QGPL once seemed a more convenient strategy for some sites because it typically supports easy access to the LSAM menu system and the LSAM environment management commands. However, since version 04.00.03 of the LSAM, the software now assigns a PRDLIB (Product Library) to the commonly used utility commands, pointing to the actual SMAGPL library associated with each LSAM Environment. This offers similar convenience as the previous strategy of putting the commands in
library QPGL as long as each command is preceded by its library location, for example: SMAGPL/STRSMA.

These options that can be used to migrate LSAM utilities from QGPL to SMAGPL are more fully explained in LSAM Environment Management, but the installation control fields are explained in the next section.

:::caution
SMA no longer recommends installing the LSAM utilities to the IBM i library QGPL. Instead, only certain simple LSAM management commands could be copied to the QGPL library, if sites prefer the convenience of not having to specify the library name when using commands such as STRSMA (to enter the LSAM menu system) or the STRSMASYS and ENDSMASYS commands (to start or stop the LSAM server jobs).

SMA also strongly recommends that the SMAGPL (or QGPL) library should not be shared between two LSAM environments. Experience proves that it becomes difficult to apply cumulative PTFs when the *GPL library is shared. Existing clients may contact the Support team at SMA to obtain the recommended procedure for separating two LSAM environments that are sharing a single *GPL environment.
:::

### First Interactive Installation Prompt Screen

The following installation prompt screen example shows the default values that appear on the first prompt screen displayed as the SMASETUP command is executed to install a new LSAM.

#### SMASETUP Initial Prompt Screen
```
SMASETR1              Install/Upgrade IBM i Agent (LSAM)              00/00/00
USERNAME               Installing version: 18.1                       00:00:00
 Type options and press Enter to continue.                                    
 SMA now recommends to NOT share the SMAGPL or QGPL library.                  
Installation source library . : LI181001                                      
Use alternate environment name: *NO           *YES, *NO=use default           
SMAGPL alternate library name : SMAGPL        For PTF tools (do NOT use QGPL) 
LSAM environment tools library: SMAGPL        SMAGPL, QGPL, test library      
Convert any QGPL content? . . : N             Y=Convert, N=Ignore QGPL        
                                                                              
 If the alternate environment name option is *YES, another screen will appear 
 offering the option to define or maintain the alternate LSAM environment.    
 Be sure to add the SMAGPL library (-ies) to the list! Press F3=Exit when     
 maintenance is completed.  Next, a list of LSAM environments will be         
 presented.  Type 1=Select to choose the alternate LSAM environment.          
      SMAGPL is the standard location for LSAM utilities.  The PTF utilities  
 should always remain in SMAGPL, unless a test environment requires an        
 alternate name for the SMAGPL library.  The LSAM environment utilities may be
 relocated to QGPL (the original default location) or they may be kept in     
 SMAGPL.  For upgrades, choose Convert=Y to remove utilities from QGPL, but   
 this option is ignored if QGPL is specified (retained) as the tools library. 
                                                                              
F3/F12=Quit install   F5=Refresh                                              
```
Please read the contents of the first prompt screen example above. The fields and instructions displayed in the first prompt screen are explained in the following topical sub-sections.

### LSAM Library List Setup

When installing or upgrading SMA's default IBM i LSAM environment (named SMADEFAULT), it is not necessary to be concerned about the LSAM environment library list because the installation program automatically handles all required additions or changes to the LSAM environment control files. If this is the case, skip this topic and go to the next heading.

When the LSAM is being installed to an alternate LSAM environment, or an alternate environment such as a test environment is being upgraded in place, then the installer (which may be the client) is responsible for manually building or maintaining the LSAM environment library list. There is a topic and reference information in the User Help for this IBM i Agent that explains how to install and manage alternate LSAM environments. This discussion amplifies on the text displayed in the lower half of the first SMASETUP prompt screen, illustrated above.

Depending on the choice of environment configurations explained below, the alternate LSAM environment library list must be built or updated to include the named SMAGPL library, and optionally, another library used for LSAM environment management (which previously might have been the library QGPL, if SMAGPL is not used for this purpose).

The SMA Installer should advise the client about selecting from the following three options for installing the IBM i LSAM version 18.1. This choice must be thought through for both initial installations and for upgrades, although whenever the SMA-supplied defaults will be used, no special procedures are required.

### LSAM Utility Library Options

In the example of the first prompt screen from the SMASETUP command, shown above, there are three field values that must be carefully considered before continuing with the installation or upgrade. Each field is listed here with a symbolic name that will be used to refer to these fields in the remaining portions of this document:

- **SMAUTL** = SMAGPL alternate library name: SMAGPL - for PTF tools (do NOT use QGPL)
- **SMAGPL** = LSAM environment tools library: SMAGPL, QGPL, test library
- **CONVERT** = Convert any QGPL content?: Y=Convert, N=Ignore QGPL

The library label SMAUTL refers to the SMAGPL contents that are dedicated to PTF tools (PTFs are program temporary fixes from SMA - the same acronym as IBM uses, but these are only for the LSAM software).

The library label SMAGPL refers to the LSAM environment management tools. These reside in the SMAGPL library, along with the PTF tools, by default. However, clients may select to install (or retain) these tools in IBM's QGPL library. (SMA recommends against using the QGPL library.) 

The IBM i LSAM database library (SMADTA) contains two data areas called SMAUTL and SMAGPL that store the real value used for each of these two symbolic library locations.

The CONVERT flag is used during the SMASETUP installation process, only for upgrades. It tells the installation program when a client wants to remove an existing set of LSAM utilities (from a previous release) to the preferred standard location of the SMAGPL library. As explained below, this flag is not always used.

Consider the following installation options and specify the three field values very carefully according to the selected scenario.

#### 1. Default Installation

- SMAUTL = SMAGPL
- SMAGPL = SMAGPL
- CONVERT = Y

Both the PTF control objects and the LSAM environment utilities will be installed in the single library SMAGPL. For new LSAM installations, the CONVERT option does not apply, but when upgrading from a previous version of the LSAM, the CONVERT option must be set to Y = yes to preserve any existing LSAM environment management data.

Remember, using this default installation of the LSAM may require that LSAM environment management commands be qualified with the utility library name, such as: SMAGPL/STRSMA.

#### 2. Use (or retain) QGPL for LSAM Environment Management

- SMAUTL = SMAGPL
- SMAGPL = QGPL
- CONVERT = n/a

The PTF control objects will be installed, as always, in the SMAGPL library. The LSAM environment utilities will be installed (or upgraded) in the IBM library QGPL. For this option, the CONVERT flag will be ignored because there is no need to remove objects or convert data out of the QGPL library.

This installation option offers the convenience of easy access to LSAM environment management commands, since the QGPL library is typically included in every system, user and job description library list. However, SMA recommends against installing the LSAM utilities to the QGPL library. Instead, the client may choose to copy only certain convenience commands, such as STRSMA, from SMAGPL to QGPL.

#### 3. For Testing and Development: Alternate Location for SMAGPL {#for-testing-and-development-alternate-location-for-smagpl style="font-weight: bold;"}

- SMAUTL = SMAGPL1
- SAMGPL = SMAGPL1
- CONVERT = N

Both the PTF control objects and the LSAM environment utilities will be installed in the single library SMAGPL1.

This style of naming convention and library assignment should be used by clients (or SMA internal staff) who do not have a separate IBM i partition for testing, where it is necessary to install a second copy of the LSAM within the same partition as the production LSAM.

SMA now recommends against the old concept of sharing a SMAGPL library between two environments. LSAM environments should always use a completely different library list (to avoid potential difficulties with LSAM PTF management). 

The CONVERT flag should be set to N = no for this installation option. An isolated test environment should normally not remove the LSAM environment management objects from library QGPL because they might still be required for a production LSAM (or within SMA internal operations for the purpose of supporting previous versions of the LSAM).

Although the example above shows only one library for both SMAUTL and SMAGPL, it is also possible to divide the PTF objects from the LSAM environment objects by specifying a different library for each purpose. This option would normally only be selected by SMA internal staff for the purpose of testing LSAM software to prove that different control values for each symbolic library location are working correctly. SMA does not recommend this option to clients.

### Second Interactive Installation Prompt Screen - if ALTENV(*YES)

When an Alternate LSAM Environment is being installed or upgraded, the second prompt screen to appear will be the LSAM's environment management master record display. Use this maintenance function to define the name and library list for the Alternate Environment.

When upgrading an existing Alternate Environment it is not usually necessary to make any changes to the environment definition. But during a new install, it is required to use this function to assemble the alternate environment definition.

More information about how to define the alternate environment may be found in the User Help for the IBM i Agent, under the topic of LSAM Environment Management.

Whenever the environment definition has been completed, or no changes are required, press **F3** to exit the environment maintenance function.

### Third Interactive Installation Prompt Screen -- if ALTENV(*YES)

When an Alternate LSAM Environment is being installed, the third prompt screen that will be presented, immediately after exiting the environment maintenance function, will be the LSAM environment inquiry list display.

Type option 1=Select to choose the alternate environment that is being installed or upgraded, then press **Enter** to continue the installation.

### Second/Fourth Interactive Installation Prompt Screen

The last interactive prompt screen that appears during the SMASETUP command execution is the LSAM Parameters maintenance screen. Use this display to enter or verify the LSAM environment control values that are required to configure the LSAM environment for basic operation, so that it can be used immediately after the installation completes.

Following is an example of the second prompt screen showing the default LSAM configuration values as defined by SMA:

SMASETUP Second Prompt Screen

```
  SMASETR2                  Initialize IBM i Agent (LSAM)                 DD/DD/DD   
  USERNAME                 Installing version: 18.1                       TT:TT:TT

   Type values and press Enter to continue.

  LSAM environment name . . . . : SMADEFAULT   
  SMAGPL alternate library name : SMAGPL   
  LSAM environment tools library: SMAGPL   
  Internet Address . . . : 111.222.333.444                                   (F4)   
  LSAM subsystem name  . : SMASBS    
  LSAM (machine) name  . : IBMILSAM     
  Job Sched Comm Port  . :  3100
  JORS Port  . . . . . . :  3110   
  Auto-start SMAFT server: Y                    Y=yes, N=no
  SMAFT Server Port  . . :  3300
  
  F4=Prompt   F5=Refresh
```

### LSAM Installation Configuration Values

Detailed information about the individual fields showing on the second installation prompt screen (format SMASETR2) are provided in the [IBM i LSAM Configuration](../configuration/configuration.md) section of the **IBM i LSAM** documentation.

Use F4=Prompt while the cursor is positioned in the Internet Address field to see a list of available IP addresses that are already configured in this IBM i partition. Select the IP address that will be used for communication with OpCon and press **Enter** from the value prompt window to automatically put the selected IP address into the configuration parameter field.

If the IP address for communicating with OpCon has not yet been configured, the LSAM can still be installed. However, the LSAM cannot be used until the IP address configuration is completed. In this case, remember to use the LSAM main menu function 7 to update the LSAM Parameters with the correct IP address(es) before attempting to start the LSAM server jobs.

The three port numbers on this parameters screen must be unique per LSAM environment. If the current installation is for an alternate LSAM environment, change the port numbers to values that are different from any other LSAM environment, such as 3101, 3111, and 3301. These port values will also be entered into the OpCon machine record that defines communication with this LSAM.

The LSAM (machine) name value must be all capital letters for IBM i, and it must match exactly the machine name registered in OpCon. Some clients like to use their IBM i partition serial number in this field. SMA recommends using a name that is easily recognized by operations staff.

## Batch Installation Command (SMASETUPB)

It is possible to complete the installation of a new LSAM environment, or to upgrade an existing LSAM environment, in a batch job that does not require interactive prompting. This installation procedure is not recommended for most sites or for clients, it was developed for use by experienced SMA installation specialists in conjunction with other installation tool sets. For this reason, the batch installation process is not documented here in full detail.

Anyone installing or upgrading an LSAM using the batch installation command, SMASETUPB, must already understand the LSAM software and the IBM i operating system.

When installing or upgrading an LSAM using the batch command, SMA recommends that the job description selected to define the installation job include the following settings that will produce the greatest possible detail in the job log (also allowing for a possible job message queue overflow):

```
LOG(4 00 *SECLVL) LOGCLPGM(*YES) JOBMSGQFL(*WRAP)
```

Following is an example of the command prompt screens that appear if the SMASETUPB command were prompted from an IBM i workstation command entry line:

#### Batch Install Command Prompt - Screen 1 of 2
```
                 Install SMA IBM i LSAM - Batch (SMASETUPB)

Type choices, press Enter.

Installation source library  . . SRCLIB         LI181001              
SMAGPL alt lib (not QGPL)  . . . SMAUTL         SMAGPL   
LSAM env tools library (QGPL?)   SMAGPL         SMAGPL                     
Convert QGPL content (Y/N)?  . . CVTOPT         N
LSAM comm internet address . . . INTADR         '111.222.333.444'

LSAM comm VLAN IP address  . . . VLNADR         '*EXT'
                                                      
Bind IP Addr: Y=yes, N=no' . . . LBINDIP        'Y'
SMAFT External IP Address  . . . SFTIPADR       '*LSAM'
                                                  
SMAFT VLAN IP address  . . . . . SFTVADR        '*EXT'
                                                  
Bind SMAFT IP Addr: Y=yes,N=no   SFTBINDIP      'Y'
LSAM subsystem name  . . . . . . SBSNAM         SMASBS                 
LSAM machine name  . . . . . . . SYSNAM         IBMILSAM 
                                                                    More...
F3=Exit   F4=Prompt   F5=Refresh   F12=Cancel   F13=How to use this display
F24=More keys
```

#### Batch Install Command Prompt - Screen 2 of 2
```
                  Install SMA IBM i LSAM - Batch (SMASETUPB)

Type choices, press Enter.

Job Sched Comm Port  . . . . . . JOBPORT        3100                   
JORS Comm Port . . . . . . . . . JORSPORT       3110     
SMA File Transfer Comm Port  . . SMAFTPORT      3300                       
Auto-start SMAFT server (Y/N)?   AUTOSFT        Y
Use alternate environment name   ALTENV         *NO               
If ALTENV: Environment name  . . ENV                     
If ALTENV: Database library  . . SMADTA         SMADTA                 
If ALTENV: PTF control library   SMAPTF         SMAPTF 
If ALTENV: Programs library  . . SMAPGM         SMAPGM      

                                                                      Bottom
F3=Exit   F4=Prompt   F5=Refresh   F12=Cancel   F13=How to use this display  
F24=More keys
```

The first few parameters of the SMASETUPB command will be recognized as the same values as are shown in the interactive installation (SMASETUP) first prompt screen. All of the discussions about the LSAM environment and these installation parameters provided elsewhere in this topic must be well understood before attempting to provide the values and execute the SMASETUPB command.

Detailed information about the LSAM Parameter definition fields shown in the SMASETUPB command prompt screens is provided in IBM i LSAM Configuration.

To use the SMASETUPB command in a batch job, each of the parameter keywords shown in the preceding examples should be specified, although wherever the default command value for a keyword (as shown in the example prompt displays) is acceptable, the keyword need not be specified. The complete command line representing the example screens above would appear as follows.

Here is the command syntax for installing the SMADEFAULT LSAM environment, where the load source is library LI181001. Note, however, that a valid IP address must be provided, either as a parameter of this command, or after the installation has been completed (using the LSAM main menu function 7: LSAM Parameters). To use SMASETUPB for an upgrade, use library LI181001, which will cause the default value (required) for SRCLIB to be 'LI181001':

```
LI181001/SMASETUPB SRCLIB(LI181001) SMAUTL(SMAGPL) 
SMAGPL(SMAGPL) CVTOPT(N) 
INTADR('111.222.333.444') VLNADR('*EXT') LBINDIP('Y')
SFTIPADR('*LSAM') SFTVADR('*EXT') SFTBINDIP('Y')
SBSNAM(SMASBS) SYSNAM(IBMILSAM)
JOBPORT(3100) JORSPORT(3110) SMAFTPORT(3300) 
AUTOSFT(Y) ALTENV(*NO)
ENV(*DEFAULT) SMADTA(SMADTA) SMAPTF(SMAPTF)
SMAPGM(SMAPGM)
```

To install an alternate LSAM environment, for example an environment named IBMILSAM1, set the ALTENV parameter to (\*YES) and include the ENV() keyword with the name of the alternate LSAM environment, as follows:

```
LI181001/SMASETUPB SRCLIB(LI181001) SMAUTL(SMAGPL1) 
SMAGPL(SMAGPL1) CVTOPT(N) 
INTADR('111.222.333.444') VLNADR('*EXT') LBINDIP('Y')
SFTIPADR('*LSAM') SFTVADR('*EXT') SFTBINDIP('Y')
SBSNAM(SMASBS) SYSNAM(IBMILSAM)
JOBPORT(3100) JORSPORT(3110) SMAFTPORT(3300) AUTOSFT(Y) ALTENV(*YES)
ENV(IBMILSAM1) SMADTA(SMADTA1) SMAPTF(SMAPTF1)
SMAPGM(SMAPGM1)
```

:::tip
To use the batch installation command for installing an alternate LSAM environment, the environment's library list must be defined in the keywords SMADTA, SMAPTF and SMAPGM. In the example above, the suffix "1" is used to designate the LSAM environment library names for the proposed IBMILSAM1 environment.
:::

## Post-Install Instructions

Provided here are the steps to follow after installation.

### Perform the Post-Install Procedure
1. Clean up after the Installation.
   After the IBM i LSAM installation or upgrade procedure has been completed for as many different LSAM environments as may be required, the installation save file and the installation work library may be deleted from the system.

   Optionally, these resources can be left in the partition if an additional upgrade will be performed after an initial test cycle is completed. However, be sure to verify that there is not a newer version of the install file available from SMA before repeating the install or upgrade process at a later date. Important software fixes might have been added to the install file.

   Delete the installation save file:

   ```
   DLTF FILE(QGPL/LI181ppp)
   ```

   ... where "ppp" is the LSAM PTF level of the newest Installation Save file.

   Delete the installation objects library:
   ```
   DLTLIB LIB(LI181001)
   ```

2. Restore the original value to the system value QALWOBJRST, if it was changed during the pre-installation checklist.

3. Register an OpCon User for IBM i Agent to submit External Event commands.

   - Create and register, using the OpCon user interface Security functions, an OpCon External Event command user profile that the LSAM can use when generating and transmitting External Event commands to the OpCon server.

     - Note that OpCon stores a separate Password on its user profiles just for External Events.

     - Currently, the User ID must be all capital letters and not longer than 10 characters.

     - The Password can be any characters, up to 128-characters for a password or a token.

   - Use the LSAM sub-menu 3, option 2, to register the User ID and Password.

     - The LSAM stores the Password in an encrypted form.

4. The LSAM standard message queue that receives IBM i job completion messages must permit *PUBLIC to have *USE authority. This will be done already for new installs of version 18.1 of the LSAM, but Upgrades may still need attention.

   - Always use the LSAM sub-menu 9, option 8: Work with Object Authority to add or change the authority of any LSAM objects (programs, files, queues, etc.). 

   - If necessary, add a new record to the LSAM Object Authority master file, using the following field values:
   ```
   Object name . . : SMAMSGQ
   Object type . . : *MSGF
   Located in GPL : 0 (0=No, 1=GPL, 2=UTL)
   Object owner . : SMANET
   Run-time USRPRF : *USER
   PUBLIC authority: *USE
   ```

5. Modify the IBM i system startup program.

   - To fully automate the recovery of the LSAM servers after a system IPL, the LSAM command that restarts the LSAM servers must be included in the system startup program.

   - Use the IBM i command DSPSYSVAL to find the name of the system startup program in the system value QSTRUPPGM. This program, or a user replacement for it, must include the LSAM command SMAGPL/STRSMASYS ENV(\<environment name\>), where the default value for the environment name can be (*DEFAULT).
   The ENV parameter of the STRSMASYS command must specify the name of the LSAM environment where the Restricted Mode job was (or could be) executed, if this is not the default LSAM environment.

   - The existing source for the Control Language program used for system startup, unless it has been modified, can usually be retrieved using the IBM i command RTVCLSRC.

     - SMA suggests storing the retrieved source into the source file QGPL/QCLSRC, or a user-designated library can be used instead of QGPL, since the QGPL library gets replaced when the IBM i operating system is upgraded. Use the original program name for the retrieved source member.

     - Copy the original source code to another source file member, using a new name for the copy that will be modified.

   - The LSAM startup command must be preceded by a DLYJOB command, allowing time for the system to start TCP/IP services before attempting to start the LSAM Server jobs. Failing to allow sufficient time for TCP/IP to start will usually result in a failure of two LSAM communication programs that connect it to the OpCon server. With modern IBM Power Processors, it typically takes less than 30 seconds to complete TCP/IP startup, but this may vary depending upon how many TCP/IP servers are being started within a given partition.

     - Following are the two lines which must be added to the system startup program. Be sure to inspect the current source of this program to ascertain whether there is already a DLYJOB command following the startup of TCP/IP services.
     ```
     DLYJOB DLY(30)
     SMAGPL/STRSMASYS ENV(SMADEFAULT)
     ```

   - To accomplish the program changes, SMA recommends the WRKMBRPDM command for modifying source and compiling programs, however many production partitions do not include this programmer convenience tool.

     - Alternative commands that can be used in most environments include:
        - CPYSRCF
        - ADDPFM (to add a new source file member, if this was not already done by the CPYSRCF command)
        - EDTF (a simple text editor; see the IBM i Knowledge Center or the IBM developerWorks web site for instructions and hints about using EDTF to edit source members).
     - CRTCLPGM

     - SMA recommends not overlaying the original system startup program, but instead creating the new program with a different name (if stored into the QSYS system root library, as IBM did), or storing the new program into the QGPL library (but QGPL contents may be lost during the next IBM i operating system upgrade, so another user library can be used, such as the SMAGPL library).

   - Upon completion of the program preparation, use the CHGSYSVAL command to register the new, replacement startup program. The value of this system value must be 20 characters long, and it must list the program name in columns 1 -- 10, followed by the library name in columns 11 -- 20. For example:

   ```
   CHGSYSVAL SYSVAL(QSTRUPPGM) VALUE('QSTRUPMOD QSYS')
   ```

6. Apply the latest LSAM PTFs (software patches).

   - Currently, most LSAM installations include the majority of available patches already applied to the current version of the LSAM. However, there will likely be at least a few recently released fixes, and perhaps some important and useful enhancements, that should be added to each install or upgrade using the LSAM PTF tools in sub-menu 9.

   - Verify the current LSAM PTF level. An easy way to do this is to  execute the command SMAGPL/STRSMA, and then examine the bottom, right corner of the "LSAM splash display" that first appears. 
    
   - Compare the LSAM current PTF level with the latest PTF level published by SMA. The latest PTF level available can be determined by examining the "IBM i LSAM (version) Patch Readme.PDF" document.

   - Two stand-alone PDF documents may prove helpful when undertaking the first round of LSAM PTF installation:
    - IBM i LSAM (version) simplified PTF instructions.
    - IBM i Agent (LSAM) instructions for partial PTF save files

   - All the latest IBM i LSAM support resources, including the two PTF save files and the documents mentioned here, may be found at SMA's current ftp server that is accessed via the Support Portal from the SMA Technologies web site.
      - Currently, the ftp server may also be accessed directly from a browser or from a file transfer tool (such as FileZilla) at this URL: files.smatechnologies.com.
      - Here is the path to the IBM i Agent resources:  /OpCon Releases/Agents/IBM i/18.1/ ...
        - The next Agent release resources are in sub-folder /21.1/.
        - Within the release number folder, explore the sub-folder /IBMiLSAMptf/ for LSAM PTF resources.

   :::tip
   If the URL for SMA's secure ftp server changes, view the Support page of SMA's latest web site or contact the SMA Support team for assistance with accessing the current secure ftp server.
   :::

7. Review and update the LSAM Parameters and feature Configurations.
   Each sub-menu of the LSAM menu system typically includes a global options configuration function as menu option 7. After a new installation or an upgrade, it is important to select each option 7 that shows a Configuration or Parameter function and press Enter for each page until an update is completed.

   Look especially for the following settings that may require attention:

   - The main menu LSAM Parameters:
     - There is an option to "Bind? Y/N" for the IP Address. SMA recommends using this option instead of the default method of allowing the communications programs to choose any available IP address.
     - If the IBM i partition is a client partition that relies on a host partition to connect it to an external IP address, put the external IP address in the first IP Address field and then enter the local virtual LAN IP address of this Client partition in the Internal IP address field.
     - Verify the daily maintenance hour on page 2 of the LSAM Parameters. If there is more than one LSAM Environment within the same partition, it is critical that the two environments start their daily log purging at a different time (separated by at least 1 or 2 minutes), to assure that their daily backup save files are named differently, since they use the system clock time as part of the name.
     - Older LSAM installations that were upgraded may need to have their daily log purging values reviewed. Very old LSAM installations did not get useful values set automatically, although brand new installations of version 18.1 come with reasonable purge criteria already set.
   - Check each LSAM sub-menu configuration to make sure that the normal daily, or "debug" logging is activated. This is very helpful for diagnosing configuration errors, and it is also useful for supporting security and other audits of the automation. However, do NOT activate any log option that is called a "trace" log, since those options produce a large amount of data very quickly. Only use trace log options when requested by SMA Support.
     - The LSAM Management sub-menu 6 has an option 4 that can be used to review the settings for multiple logging options. All of the  logging should normally be set to "\*YES" on the main page, except that all the "Trace" logging options should be set to "\*NO". Observer the on-screen instructions for activating the settings.
       - Use function key **F2** from the logging management screen to see a summary of several LSAM daily logging options. All except for any "Trace" options should be set to "1" or "y", whatever is the active state.
    - The SMA File Transfer Configuration should be checked for the following settings.
      - Verify the external IP Address.
      - Set the "BIND? Y/N" option to "Y".
      - Replace the "*EXT" default value for an Internal IP Address ONLY if operating within a client IBM i partition that uses its Virtual LAN IP address to reach the external IP address that is configured in the Host partition.
      - On secondary pages of the configuration, find both communication options (SMAFT Server and SMAFT Agent) and change the "Linger" value to 0 (zero). This very important setting will prevent a commonly occurring error of 03420 "Address already in use."
    - In LSAM Sub-menu 5, set the options for Multi-Step Job Scripting to enable writing of log entries to the job log report. This important option, in addition to the local LSAM logging, makes it easy to view full detail about Script execution when the job log report is requested by the OpCon user interface option to "view output."

8. Review the default IBM i work management objects used by the LSAM:

   When using this procedure to upgrade an existing LSAM environment, it is usually not necessary to revise the LSAM default object authorities. In that case, skip to the next instruction.

   The **IBM i Agent** User Help includes a topic that discusses IBM i LSAM Security and Object Authority. If this installation is not for a simple demonstration, or if the installing site has any concerns about system security, object authority and/or the broad default authorities granted to the LSAM server user profile SMANET, the LSAM Security and Object Authority topic should be studied before completing the following installation configuration steps.

   The user profile(s) for which IBM i jobs are submitted must have authority to use the IBM i work management objects (Job Description, Job Queue, Output Queue) to process a job. Normally, this is not a problem unless the customer has modified the authority of these objects. The LSAM Parameters control file is installed with the following default object names for submitting jobs. These values are used to replace the asterisk (\*) value that OpCon may insert in some job start request fields to represent a request to "use the LSAM default value."

  - User profile: **QSYSOPR**

  - Job description (JOBD): **QBATCH**

  - Job queue (JOBQ): **QBATCH**

  - Output queue (OUTQ): **QPRINT**

   If these default values are changed using LSAM Parameter maintenance (described in the IBM i Agent User Help), be sure to modify the next step so that the authority maintenance commands address the appropriate objects.

### Granting Authority to IBM i Work Management Objects

Both the submitted job user profile and the IBM i LSAM server user profile SMANET must have authority to use the queues and the job description required to run jobs scheduled in OpCon.

If user SMANET is allowed to keep the suggested \*ALLOBJ authority, it is not necessary to perform this step to enable the LSAM server user profile to complete its tasks. However, if revoking the \*ALLOBJ special authority, it may necessary to grant authority to the objects that SMANET will use when submitting jobs. A more detailed explanation of this step, including references to additional object authorities that may be required, can be found in [LSAM Security and Object Authority](../security/strategy.md).

The batch job user profile specified in the OpCon job master record, for Batch Jobs and some other job sub-types, must also be granted authority to use the basic IBM i work management objects, otherwise the LSAM will report a failure to start the job. (NOTE: When jobs cannot be started by the LSAM, there will be no job log report to view using the OpCon JORS function "view output." Instead, diagnostic information is available from the active job log of the LSAM server job TXMMNG.

:::tip
For additional information about diagnosing job start failures, see [Guide to Job Failure Diagnosis](../operations/automation.md#guide-to-job-failure-diagnosis).
:::

As an example, to assure that the QSYSOPR profile has authority to use the default job definition objects named above, use the following commands:

  - **GRTOBJAUT OBJ(QGPL/QBATCH) OBJTYPE(\*JOBD) USER(QSYSOPR) AUT(\*USE)**

  - **GRTOBJAUT OBJ(QGPL/QBATCH) OBJTYPE(\*JOBQ) USER(QSYSOPR) AUT(\*USE)**

  - **GRTOBJAUT OBJ(QGPL/QPRINT) OBJTYPE(\*OUTQ) USER(QSYSOPR) AUT(\*USE)**

Repeat these same three commands for user SMANET if SMANET will not have \*ALLOBJ authority. The SMANET user profile is used by the IBM i LSAM server programs when submitting jobs to run, so it must have authority to place jobs into each job queue that will be specified for OpCon jobs and it must have authority to reference the job descriptions used to define the jobs.

The OpCon spool file management feature for IBM i jobs requires that SMANET have authority to the spool files and output queues of jobs that are submitted by the IBM i LSAM. Even if spool file management features are not used, SMANET must have authority to use the job log spool file QPJOBLOG and the output queue where job log reports are spooled. (Job logs may be spooled in output queue QUSRSYS/QEZJOBLOG instead of QSYS/QPRINT.)

## Configure and Operate the LSAM

To begin using the LSAM, refer to [IBM i LSAM Configuration](../configuration/configuration.md) to configure and operate the LSAM. In summary, the following basic steps are required to initiate LSAM operations for the first time:

### Initiate LSAM Operations

1. Log on to an IBM i workstation session as QSECOFR or as the user profile designated as the LSAM Administrator. Refer to [LSAM Security and Object Authority](../security/strategy.md) for more information about creating an LSAM Administrator user profile.

2. From IBM i command entry, enter the command SMAGPL/STRSMA to access the LSAM Main Menu. (Qualifying the command with library SMAGPL may not be necessary, if QGPL is used.)

   :::tip
   To enter an alternate LSAM environment instead of the default environment, press <**F4**> = Prompt instead of <**Enter**> with the STRSMA command, and specify either the name of the LSAM environment, or the value *SELECT to pick an environment from the list.
   :::

3. From the LSAM Main Menu, use function 7. LSAM parameters to review and update the configuration values. Be sure to verify and take note of the LSAM Name, the IP Address and the communications port numbersthat will be used by OpCon to  communicate with this LSAM.

4. On the OpCon server, configure the OpCon machine table to add a record for the LSAM Name. Please refer to [Extended Discussion of Parameters](../configuration/configuration.md) for some important notes about setting some of the Advanced values in the OpCon machine table.

5. Read through the remainder of this topic and observe any late  documentation changes that may apply to the configuration of LSAM operations.

6. From the LSAM Main Menu, select function 6. LSAM management menu.

7. From the LSAM management menu, select function 1. Start LSAM to start the LSAM server programs. You can confirm that the LSAM server programs are running by selecting function 3. Check LSAM subsystem status.

8. From the OpCon server, start the IBM i LSAM machine and verify that the machine status window turns blue (or, from the machine table window, that the connection arrow has completed -- refresh the machine table window using function key F5 to verify this final status), indicating that the connection has been completed.

9. Use OpCon to define schedules and job master records, and then build and release the schedules. To prove that the IBM i LSAM is running, define a job that executes the following test "general program":
```
CALL SMAPGM/GP PARM('0001')
```
   The GP program executes a simple DLYJOB (delay job) function for as many seconds (up to 9999) as are specified in the parameter. Do not specify a large number of seconds, because the job could take a very long time to end.

:::tip
Another good command for testing OpCon jobs will actually print a report of the IBM i job's library list. Using this command and viewing the report it produces could help to debug or confirm that the IBM i library list management is working as expected when jobs are started from OpCon: 
```
DSPLIBL OUTPUT(*PRINT)
```
:::

## Introduction to LSAM Server User Profile SMANET

### Why does user profile SMANET have *ALLOBJ special authority?

How should system security be managed when the IBM i LSAM is installed?

The IBM i LSAM software designates the user profile SMANET as the job user for all of the LSAM server jobs. This user profile must have extensive authority to IBM i system objects, commands and programs, and it must have authority to use the user profiles of jobs the LSAM will submit.

In this current version of the LSAM installation, user profile SMANET is installed (when new) with *ALLOBJ special authority. However, if the system's security officer is willing to undertake security maintenance tasks, it is not required that  SMANET have \*ALLOBJ special authority to run the LSAM server programs.

In general, the LSAM software has been managed so that SMANET does not require security officer authority or \*ALLOBJ authority, that is, once SMANET has been granted authority to use the user profiles and other work management objects it must access when submitting jobs. The software is distributed in a form that allows it to be operated by user QSYSOPR, and certain programs that require special authority have been created to run with the necessary authority. However, the initial distribution of this software grants \*ALLOBJ special authority to user SMANET because this simplifies demonstration installations and this also makes it easier for new clients to train on the software. 

Some high security sites may wish to revoke the *ALLOBJ special authority, once they have developed an authority matrix that allows user SMANET to submit jobs to run under other user profiles. For detailed instructions about how to manage the IBM i Agent software and the system configuration if SMANET will not have \*ALLOBJ special authority refer to [LSAM Security and Object Authority](../security/strategy.md).

:::warning
Even if the SMANET user profile is restricted, care must still be used when granting access to the LSAM maintenance functions for Operator Replay, Multi-Step Job script maintenance, and Restricted Mode script maintenance, so that security loopholes may not be created through these points of access.
:::

Except for Operator Replay, Multi-Step Job scripts, and Restricted Mode scripts, the LSAM programs will not normally allow unauthorized users any access to system objects or functions that they are not already permitted to use. To take advantage of this strategy, the LSAM server user profile SMANET must not be allowed to submit jobs from OpCon.

To have users other than QSYSOPR or QSECOFR perform IBM i LSAM menu functions, the system's security officer is responsible for creating the user profiles and for granting appropriate authority to the program objects in the SMAGPL and SMAPGM libraries and the database files in the SMADTA library (or the libraries created to fulfill these roles in an alternate LSAM environment). Detailed instructions for enabling user profiles to use the IBM i LSAM menu functions can be found in the LSAM Security and Object Authority topic.

A helpful LSAM tool that can be used for modifying the object authority of any object in the IBM i operating system is the Agent's Object Authority Management tool, found in LSAM sub-menu 9, option 8. Any changes to the authority of objects that are contained in the LSAM libraries MUST be registered using this tool to preserve the special authorities whenever LSAM PTFs (software maintenance) will be applied. Objects outside of the LSAM libraries may optionally be registered using this tool just because it is a convenient way to maintain an exact record of all special authorities, to view them in subset lists and to easily apply new or changed authorities (using option 1=Apply). Note that each registered object may also be modified in any possible way by attaching one or more IBM i commands to a registered object. These commands will be executed just after the basic object authority is imposed when option 1=Apply is initiated. 

### Building a user profile matrix for SMANET without *ALLOBJ special authority

Since SMA is not able to predict which user profiles will be selected for the jobs that are controlled by OpCon, it is necessary to grant to user profile SMANET authority of type \*USE to each user profile that will be specified as the user of jobs being submitted by OpCon. The GRTOBJAUT command can be used, as in the following example. Repeat this example for each job user profile, substituting the actual name of the user profile for "job_user_name":

```
GRTOBJAUT OBJ(QSYS/job_user_name) OBJTYPE(*USRPRF) USER(SMANET) AUT(*USE)
```

Remember, an alternative to granting specific authority to SMANET for each user profile is to allow the SMANET user profile to keep the \*ALLOBJ special authority. The special authority \*ALLOBJ enables SMANET to use any other user profile when submitting jobs.

:::danger
Regardless of the security strategy adopted, access to the user profile SMANET must be carefully restricted because it will always have extensive authority to multiple user profiles. User SMANET should not have its own password or be allowed to log on to the system.
:::
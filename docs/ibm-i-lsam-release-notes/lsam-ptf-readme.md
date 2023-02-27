---
sidebar_label: 'Managing LSAM Software Enhancements'
---

# Managing LSAM Software Enhancements

## Introduction to IBM i Agent Software Patches

This sub-chapter explains how to manage the installation of all available PTFs (Program Temporary Fixes = software patches) to the IBM i LSAM version 21.1 after a new install or upgrade (using the install file LI211043B or newer).  The same guidelines may be followed later to add additional LSAM PTFs that SMA may later distribute.

This sub-chapter replaces the former stand-alone "PTF README" PDF document that was previously stored with the LSAM PTF cumulative save files in the SMA FILES ftp server under /OpCon Releases/Agents/IBM i/.

In the chapter [LSAM Software Maintenance](/maintenance/ptf.md#lsam-program-temporary-fixes) there are instructions for clients about the different options available for obtaining LSAM PTFs from SMA.  The options include both direct access from the IBM i partition to the SMA ftp server and a variety of indirect access methods.  This document assumes that a client may not be configured for direct access to an SMA ftp server, and that an indirect method will likely be the most convenient and efficient method for applying all the PTFs available just after a new installation of the LSAM has been completed. 

SMA recommends the “IFS” method for indirect installs, as explained next in the procedure summary that follows. 

The user can jump right into the procedure just below, but there is important information that could be updated as new PTFs are added to the list, so SMA advises reading through this document before attempting to install the PTFs, certainly before the first time.

## Installing IBM i LSAM Patches

### PTF Installation Prerequisites

Please be careful to distinguish between SMA Technologies software patches for different versions of the IBM i LSAM. At SMA Technologies' secure ftp server there are different sub-directories for all resources pertaining to each version. Although the LSAM PTF save file names are similar (LSCTLDTA and LSCUMPTF), they are NOT interchangeable.

Using the wrong LSAM PTF files for a version will corrupt the LSAM software and require a restoration from the most recent backup of the LSAM libraries. SMA Technologies advises clients to always backup the LSAM libraries before attempting any patching or upgrading of the software.

## PTF Pre-Installation Requirements

### Temporary Change to System Values

It may be necessary to change one of the system values for the IBM i operating system in order to permit the PTF installation program to restore program objects that use adopted authority.  The IBM i LSAM software includes some programs that use adopted authority in order to enable required, specific system management functions to be completed by designated administrators without requiring that those system users have any special authorities.

This is a common strategy, and IBM provides the following guidelines for managing the installation of new software:
The Allow restore of security sensitive objects (QALWOBJRST) system value specifies whether or not objects with security-sensitive attributes can be restored. It is important to set the value to *ALL before performing the following system activities:

- Installing a new release of the operating system.
- Installing new licensed programs.
- Applying program temporary fixes (PTFs).
- Recovering your system.

These activities can fail if the value of QALWOBJRST is not set to *ALL. Use this procedure:
- Use the command DSPSYSVAL to view and record the current setting for the value
   QALWOBJRST. 

	Current value: ___________________ . 

If the value is already *ALL, skip this procedure and continue with LSAM PTF procedures.
- If you have previously locked this system value, go to SST (system service tools) and unlock it.
- Use the command CHGSYSVAL to set QALWOBJRST to a value of *ALL.
- Complete the software installation or upgrade.
- To ensure system security, return the QALWOBJRST value to your normal setting (recorded above) after completing the software installation.

### Managing Database Mirroring During PTF Installation

If database replication (mirroring) is not being used, skip to the next topic.

Please refer to the unified discussion of [Managing Database Mirroring](/reference/database-mirroring#managing-database-mirroring-1).

### Important Notes and Warnings

SMA recommends to always make a backup of the LSAM libraries before starting PTF installation.

:::warning
Be very careful not to confuse the LSAM PTF save files that belong to different versions of the LSAM.  It is possible to corrupt either an old or new version of the LSAM when the wrong PTF save files are used.
:::

:::warning
Some database mirroring tools create a conflict with the IBM i LSAM PTF installation process. This causes the PTF install process to fail, typically due to object locks on PTF control data areas.

If there has been a failure caused by this conflict, DO NOT PROCEED!  Please contact SMA Support for assistance.  The failure leaves an incomplete PTF installation that usually requires special technical assistance in order to avoid extensive corruption of the LSAM software.
Please study the advice below under Additional Cautions and Instructions, describing methods that can be used to prevent this conflict.
:::

:::info IMPORTANT NOTES

Version 04.00.03 development cut-off vs. Versions 18.1 and 21.1 of the IBM i LSAM:

PTF # 403320 marked the patch level for the last installation file of the IBM i LSAM version 04.00.03.  All patches through this level are contained in the LSAM installation file LI040006.

LSAM version 04.00.03 remains available (on demand only, as-is) for IBM i versions V5R4 and V6R1 (i6.1), and it can also be used through IBM i version i7.3.  SMA has frozen version 04.00.03 as of the PTF level 403374. Due to IBM ending all support for the IBM i operating system version V5R4, where this LSAM version was constructed, it is no longer possible for SMA to produce any software fixes for the LSAM version 04.00.03.  Therefore, any clients of SMA that decide to continue running this LSAM version will do so at their own risk.  To obtain product support for the IBM i Agent, clients must be using a currently supported version of the Agent software.

The oldest supported version of the IBM i LSAM is version 18.1, which requires IBM i OS veresion i7.1 or newer.  SMA encourages clients to upgrade to the latest available version of the IBM i LSAM software, which is 21.1 as of this document edition  Version 21.1 requires IBM i OS version i7.2 or newer.

If any clients remain at LSAM version 04.00.03, be advised that upgrading to version 21.1 requires that their LSAM first get the final LSAM PTFs for that version installed, then upgrade to version 18.1.  There is no direct upgrade path from 04.00.03 to version 21.1 - an intermediate upgrade to version 18.1 is required first. 
:::

## Summary Procedure for Installing IBM i LSAM PTFs

SMA recommends that clients who are planning to perform LSAM PTF Installation for the first time during off hours should contact SMA Support in advance so that SMA can alert the appropriate personnel to be on stand-by in case any error should occur.  The LSAM PTF process is carefully tested and there is seldom any error with the programmed procedures.  Some of the PTF Installation steps can and should be performed in advance during normal business hours.

The following steps represent a summary of the procedure SMA recommands for normal installation of the LSAM PTFs.  The separate chapter about [LSAM Software Maintenance](/maintenance/ptf.md#lsam-program-temporary-fixes) provides extensive detail about LSAM PTF menu options that could prove useful in exceptional circumstances.  But SMA recommends the following summary procedure because it skips all the unnecessary detail and focuses on the minimum required steps for normal LSAM PTF installation.

### Essential procedure for applying PTFs to the LSAM just after a new installation or upgrade

1.	It is required to perform the PTF options configuration function once before using any LSAM PTF tools in order to create the PTF control data area.  Default values may be accepted, since a manual procedure will be used.  From the LSAM main menu, select 9. PTF and Security Menu.  From sub-menu 9, select option 7 to perform the PTF options configuration.

- This procedure recommends setting the following values:
	```
	PTF Source:   IFS
	Source directory or path:  /SMA/IBMiLSAMptf/21.1/
	```
	:::note
	Include the trailing forward slash in the path name.

	The Source directory path must be created in the ‘/’ root file system of the IFS, as explained below in Step 2.
	:::

	:::note
	Be sure to create a new sub-directory for the LSAM Version 21.1 PTFs, separate from the /18.1 directory (if it had been created).
	::: 

- The following values may also be important when allowing the PTF application job to be submitted as a batch job.  
	- Confirm the settings recommended for the Job Queue and Library.

	- SMA recommends setting “Submit job?” to “N” (= no) during the first PTF application after a new install or upgrade.  After that, the PTF install process could be changed to submit a batch job.  (LSAM PTF application can also be managed by OpCon using LSAM commands in a batch job.)

		```
		Submit job? N  Auto-load after request? Y        
		Job description, library: SMALSAJ00   SMADTA     
		Job queue (*JOBD), libr.: QBATCH      QGPL   
		```

### Continuation of the Normal, Repeating LSAM PTF Installation Procedure

2.	In the IBM i ‘/’ root file system of the IFS disk space, create the directories listed above.  A client may choose their own path instead.  The IBM i commands that can be used to create the default directory path are:
	```
	CD  ‘/’
	MKDIR ‘/SMA’
	MKDIR ‘/SMA/IBMiLSAMptf’
	MKDIR ‘/SMA/IBMiLSAMptf/21.1’
	```

3.	Manually transfer the save files LSCTLDTA and LSCUMPTF (or a partial PTF version) to the IFS ‘/’ root file system path created in step 2 above and registered in step 1.  
	:::warning  
	When using ftp to transfer these binary stream files, be sure to put the ftp session into binary (bin) mode.

	The FileZilla file transfer application requires a change to its default transfer mode: “Auto” cannot be used.  It must be set to Binary.
	:::

4.	Before continuing this procedure, if database mirroring is being used, please study the recommendations below in order to avoid possible conflicts between the LSAM PTF install process and the database mirroring service.  Active database mirroring of the four LSAM environment libraries can cause a failure of the PTF Install process that might require assistance from SMA Support to recover.

5.	Log on to the IBM i partition as QSECOFR.  The complexities of the LSAM software require many different authorities to manage, therefore using QSECOFR (or a user profile with the same full authorities, as IBM recommends) is the best strategy.

6.	SMA recommends making a backup of the four IBM i LSAM libraries before starting PTF installation.  This is the best way to ensure a complete recovery in case a disastrous PTF failure might corrupt the LSAM data.  The libraries that should be backed up include (using the default names of each):  SMAGPL, SMADTA, SMAPTF and SMAPGM.

	A fast and easy way to backup the libraries:
	- Create an IBM i library with a name such as SMABACKUP.  
	- Use the CRTSAVF command to create empty save files for each of the four libraries.  
	- Execute the SAVLIB command for each library, choosing DEV(*SAVF).

	:::note
	NOTE:  The current job’s library list should not include the LSAM libraries while performing the save operation, and the LSAM server jobs should be stopped before starting the SAVLIB operations.  However, using the Save-While-Active method usually permits LSAM operations to continue during the save operations.  The LSAM PTF Install process will (unless the LSAM PTF Configuration option was changed) automatically suspend the LSAM server jobs whenever any PTF was flagged by SMA as requiring the LSAM server jobs to be stopped.
	:::

7.	Set interactive or batch process job logging to verbose mode.

	:::important 
	When executing the LSAM PTF install process for the first time after a new install or upgrade, SMA strongly recommends using a verbose LSAM job logging option.  This will make diagnosing any failure much easier.  Before executing the PTF install menu option interactively, first execute the following command from an IBM i command line. 
	```
	CHGJOB  LOG(4 00 *SECLVL) LOGCLPGM(*YES) JOBMSGQFL(*PRTWRAP)
	```  
	:::  

	It is not a bad idea to always perform this change in job logging every time that PTFs are installed. For batch processing of the PTF installation, register a job description in the LSAM PTF Configuration (LSAM menu 9, option 7) that uses these same job logging attributes. 

8.	Use the LSAM PTF menu (menu 9) option 2 to perform all the procedures necessary to copy, load and install the PTFs.  
	- When the prompt screen appears after selecting option 2, press Enter a second time to show the additional parameter that supports a partial PTF save file name (such as ‘LSCUMPTF.044-056’), if a partial PTF save file is being used.
	- On the command prompt screen, verify that the desired “Submit job?” option is set.  Although a batch job would be more efficient and have less impact on system response time, SMA recommends executing the PTF install process interactively the first time after a new install or upgrade.
	
9.	The list of PTFs below document which PTFs may require post-install procedures.  However, as of this publication date, post-install procedures are only important when PTFs are being applied to an existing, live LSAM environment.  These special instructions usually explain how to start using a new feature, but they may also document some steps that are required to make a software fix effective.

	:::tip
	After installing the latest PTFs, use the LSAM menu list of PTFs and then press F15=Subset to select a list that includes only the PTFs with Post-install instructions.  More details are included in this on-line display than will appear in the PTF Readme document.
	::: 

10.	**NOTICE – IN CASE OF FAILURE:**
	
	In case a PTF fails to install successfully, the LSAM version 18.1 (or newer) will show a PTF status code of “I” = Incomplete. In this case it is usually not possible to simply try restarting the PTF install process.  Rather, the client is advised to contact SMA Support for assistance in analyzing the cause of the failure, so that the recover/restart process will be fast, easy and correct.

	However, clients who have experienced IBM i programmers on staff might find that a PTF error condition is easy to remedy, once the IBM i job log messages are examined.  

	In case the PTF install process issues an error message requiring a response, it is usually important to **LEAVE THE PTF ERROR MESSAGE UNANSWERED** until either a local programmer/analyst or SMA Support can assist the client with recovery recommendations.  When reporting this type of error to SMA Support, SMA recommends using telephone support and telling the Support personnel that an error message is waiting for a reply.  Guessing about how to respond to an error will usually make recovery more difficult.  This type of support from SMA typically qualifies as an issue that will not be charged for off-hours support (depending on the type of Support contract that the client may have).

#### Follow up procedures for LSAM PTF application

Repeat the application process for each LSAM environment.  If there are two copies of the LSAM software within the same IBM i partition, where one might be a test environment, each may reference the same IFS directory that contains the source PTF save files.  The LSAM Menus from within each LSAM environment must be used to properly apply the PTFs to each environment.



### Obtaining IBM i LSAM PTF resources

The resources used for software patches (PTFs, program temporary fixes) for SMA’s IBM i LSAM include two IBM i save files and this document.
SMA Installers should always check before going to a client site that they have access to the latest IBM i LSAM PTF resources.  The SMA ftp server location for IBM i LSAM PTFs is the only place to look for the latest versions.  The ftp server can be accessed either directly using a URL (changes sometimes occur – please contact SMA Support or your Solutions Consultant for instructions) or by using the SMA Support Portal from the SMA Technologies web site at www.smatechnologies.com .

The SMA "FILES" ftp server supports a primary and a secondary directory structure for the maintenance and support of the OpCon Agent for IBM i.

#### Standard FILES product directories

The software resources supporting the IBM i Agent are found at this directory path within the FILES server URL:

	**/OpCon Releases/Agents/IBMi/**

Within this path there will be one or more sub-directories that contain release-specific content.  For the LSAM version 21.1, here is a typical tree organization for the Agent software.  
``` 
/IBMi/21.1
	/docs  [this directory is now replaced by the content of this Agent User Help document]
	/IBM i LSAM Tips and Techniques
	/IBMiLSAMptf
	/New Install or Upgrade Resources

Resources for the LSAM PTFs are found here:
	/IBMiLSAMptf
		/Partial PTF (smaller) save files and instructions
		LSCTLDTA
		LSCUMPTF
		PTF README.pdf
			The former "PTF README" pdf document content 
			is replaced by this content of the Agent User Help.
			A skeleton PTF README document redirects clients
			to this Agent User Help.

Typical content for the Partial PTF sub-directory (once created) appears like this:
		/Partial PTF (smaller) save files and instructions
			IBM i LSAM instructions for partial PTF save files (document version ...).pdf
			LSCUMPTF.044-056

	There would not exist a partial PTF save file starting with PTF # 001, 
	since the original install/upgrade file already included PTFs through 043.
	Parial PTF save files are not created until the original LSCUMPTF grows too
	large for a convenient download in areas with limited communication speed.

``` 

#### Beta site and emergency software support

An old directory at the FILES server named “/IBMiLSAMptf” had its content relocated under the OpCon Releases directory structure outlined above.  Now the old directory has been reserved for temporary use to deliver software patches for the OpCon Agent for IBM i that need priority attention.  Purposes for this directory have included the following resources:

- Emergency software patches, such as repairs to program failures in a production environment (which are extremely rare).
- Active support for clients serving as a beta site to test new IBM i LSAM releases.
	- Beta site work typically uncovers hidden software bugs
	- Beta site clients often contribute observations about important software improvements
- Training resources, such as timely Power Point presentations
- Re-posting the final cumulative LSAM PTFs from deprecated version 04.00.03
	- This supports clients who were unable to upgrade to newer, supported versions of the LSAM software.
	- Upgrading from this retired version requires that all of the LSAM PTFs published for version 04.00.03 be applied first.

### Summary of Agent software support changes introduced with version 18.1 (continuing through 21.1)

#### PTF Level indicator

The prior LSAM version 18.1 introduced a new and separate official “PTF Level” number.  This 3-digit number usually matches the last 3 digits of the PTF Number (name) field.  But the PTF Level will not always match the PTF Name value.  For example, PTF Level 056 might match the PTF Name of “PTF211056”, but do not rely on the PTF Name to desinate the current LSAM patch level.  A correct level identification for PTF Level 056 would be 21.1.056.  The LSAM displays and the Support data extracted by the LSAM command SMASUP will report the actual PTF Level using the PTF Level control number.

:::tip
Be sure to look for the official PTF Level number when reporting the LSAM PTF Level to a Support analyst.  The PTF Name value that was used in the past is no longer the correct indicator of the PTF Level.
:::

#### LSAM Database Level

Another new key value assigned to LSAM PTF control records is the database level (“DB Level”) that is used to govern when two LSAM environments are matched for the purpose of using the LSAM Data Export/Import tools.

### Description of Partial PTF Save Files

All new LSAM installs and upgrades are performed using an installation save file with a name such as LI181022.  The save file name refers to the LSAM Version where 211 = version 21.1, and the last three digits refer to the most recent LSAM PTF Level that is included with the installation or upgrade.  So install file LI211043 includes LSAM PTFs through Level 043. (Please do not confuse the actual PTF Level number with the character name assigned to each PTF.  For example, PTF Level 043 might have been assigned to a name of PTF211042.)

As illustrated above and explained in other sections of this chapter, there are two IBM i save files that are used after an installation or upgrade to apply new Agent software enhancements and fixes:  LSCTLDTA and LSCUMPTF.

The IBM i save file named LSCTLDTA contains the latest PTF control information.  There is only one version of this save file, and it is updated each time a new set of LSAM PTFs is published.  So a new copy of this file must always be downloaded and used with any cumulative PTF save file.

The save file named LSCUMPTF contains the latest, accumulate (cumulative) collection of all LSAM PTFs published since the current LSAM version install file was created.  This save file contains multiple save files within it, one for each LSAM PTF.  The PTF save files contain the program and (sometimes) database file objects that support fixes and new Agent features.

There will always be more LSAM enhancements, and some occasional fixes, made available by PTFs.  Due to the regular cycle of publishing LSAM PTFs, a mature version of the LSAM software can sometimes gather a large number of PTF save files, some of which can be large.  SMA tries to limit the size of the LSAM PTF cumulative save file, but there will always be the one master cumulative PTF save file named LSCUMPTF.  This save file can always be used to install the latest available LSAM PTFs (along with the LSCTLDTA control data save file).

But for client sites in world regions that may have limits on the speed of internet connections, SMA produces "paritial PTF save files" that will always be limited in size.  Practical considerations can cause a number of different cut-off points in the sequence of partial PTF save files.  (See the example above of an assortment of partial PTF save files.)

When it is beneficial for a client site to use the smaller partial PTF save files, the client must find a save file with a suffix showing the range of PTF Levels included, where the lowest LSAM PTF Level number is less than, or up to only 1 number greater than the currently installed LSAM PTF Level.

The goal is to use one or more LSAM partial PTF save files that will catch the client site up to the latest LSAM PTF Level. Look for the smallest partial PTF save file that can upgrade the LSAM from its current PTF level to the latest level.  There might be one partial PTF save file that fits the client site's current status, or the site might need to use two smaller partial PTF save files and run the LSAM PTF installation procedure for each file, until the site is caught up to the currently available LSAM PTF Level.  

:::example
If a site installs or upgrades the LSAM using the install file named LI211043B, the installation will include PTFs through Level 043.  Therefore, a partial PTF save file LSCUMPTF.044-056 would be an example of a partial PTF save file that might be made available to update the LSAM software from its original patch level to the later PTF Level 056.  To reach a higher PTF Level of 122, the site might find and use another partial PTF save file named LSCUMPTF.057-122.  But if the site can accommodate the larger complete cumulative PTF save file, then the base file named LSCUMPTF can always be used to update an LSAM installation from any previous PTF Level to the last, currently available PTF.
:::

##### Finding the current LSAM PTF Level

The current LSAM PTF level is displayed when using command SMAGPL/STRSMA to enter the LSAM menu system.  

The other source of LSAM software level information is found at LSAM menu 9, option 1, where the top lines of the PTF list display show three values:
- The overall LSAM PTF Level
- The LSAM PTF Level that was last applied to the SMAGPL library (which contains different program objects than the library SMAPGM).
- The LSAM DB (database) Level 

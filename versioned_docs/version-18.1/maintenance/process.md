---
sidebar_label: 'How the PTF Application Process Works'
---

# How the PTF Application Process Works

The IBM i LSAM PTF tools were designed to consolidate the entire process of requesting and applying PTFs into a single procedure started by one LSAM command from the LSAM menu system. 

However, as explained above under How to obtain and apply PTFs, it is possible to conduct an alternate procedure where that is divided into separate steps, accommodating the occasional post-install process. In other words, if desired by the client, it is possible to request the PTF information first and then evaluate the PTF control information before committing to apply the PTFs to the LSAM environment.

SMA does not recommend to clients that they use the LSAM PTF menu steps 3 - 6 unless they are requested to use those steps as part of an exceptional SMA Support process.  The reason for this recommendation is that the individual menu options 3 - 6 require more attention to the technical details of the LSAM PTF installation process, and there is a greater chance for error.

## Information for LSAM Installers

When the IBM i LSAM is installed for the first time from distribution media, there is normally no obstacle to installing all available PTFs in a single cumulative PTF application process. As soon as the basic LSAM installation is complete and the LSAM Parameters have been maintained, it would then be acceptable to use one of the alternate PTF source access methods (usually the IFS method) to install all the currently available PTFs in a single cumulative PTF application process without concern for post-install instructions. Almost without exception, post-install instructions apply to the process of upgrading live clients.

The PTF application process for installers begins with the selection of the most appropriate method for installing the LSAM PTF installation files (LSCTLDTA and LSCUMPTF) into an IBM i IFS root(/) file system directory.

:::caution
Always be sure to use a binary file transfer method when transmitting the LSAM PTF installation files, since these are binary stream files that can be corrupted, for example, if an ftp transfer is allowed to run assuming the file contains ASCII data...it does not.  FileZilla, for example, installs with a default of "automatic" for the file transfer method, and it happens that IBM i save files are incorrectly identified as ASCII text files by this FileZilla automatic detection algorithm.  Use the FileZilla drop-down menus to find and change the default method to binary.  

If using Windows CMD entry to run an ftp file transfer from Windows disk to the IBM i IFS disk storage, be sure to enter the "binary" ftp sub-command before starting the file PUT operation.
:::

:::info
Previous documentation about using an optical disk for the OPT method of sourcing the LSAM PTF installation files has been removed from this documentation, since physical optical media is now very uncommon and world-wide digital communication networks are normally available and appropriate.  

As an alternative to using optical media, if on-line digital communication is not available, a convenient method for delivering the latest LSAM PTF installation files would be to carry them with the installer using a USB data storage device.  Despite that many clients refuse to allow direct connection of USB storage to in-house computing devices, an indirect file transfer method can usually be discovered for placing the LSAM PTF installation files into a location where anti-virus scanning can be performed before the files are then transfered to an IFS root(/) file system directory.
:::

Once the LSAM PTF file installation process has been completed, SMA recommends logging into a green screen workstation session as QSECOFR, entering the LSAM menu system, and then selecting option 7 from LSAM menu 9 to verify the LSAM PTF configuration options.  Finally, use menu option 2 to initiate the one-step installation process.  SMA recommends using the interactive workstation job during the first time installation of PTFs after a new LSAM install, rather than the default batch process, only because it is more obvious and possibly easier to manage in case there is any error during the first-time PTF installation.

## Overview of PTF Management

The process of applying software improvements to SMA's IBM i LSAM application is an automatically coordinated, cooperative effort conducted by SMA technical personnel and authorized LSAM administrators at client sites.

The process begins as SMA receives feedback from clients about its software product. Both enhancement requests and problem reports for the OpCon Agent for IBM i have the potential of being addressed by an agile, on-demand PTF process, rather than being delayed by the software release development cycle.

SMA supports client interaction by means of its client portal at the company web site. Software maintenance resources for the IBM i Agent (LSAM) are available for download to licensed clients at the SMA secured ftp server. SMA also maintains a registration of clients preferring to be notified by email whenever LSAM software fixes and/or useful LSAM feature enhancements become available.

 Whether notified or not, clients may use the LSAM menu functions at any convenient time to obtain the latest IBM i LSAM PTF information directly from SMA ftp servers. Urgency for applying available PTFs may arise either from a problem that is obstructing normal operation of the software can also be managed by prompt posting of emergency software patches, possibly accompanied by specialised quick patch instructions.  In this case, proven emergency patches will be quickly integrated into the standard maintenance resources and procedures pertaining to this Agent.

Once SMA has made new PTF's available for the LSAM, the steps involved in the automatic process for PTF application include:

1. Initiate a request to download the PTF resources from SMA or an alternate source site, into staging files stored in the client's IBM i partition - most frequently into an IFS root(/) file system directory.
    - As documented in this chapter, it is possible to fully automate the process of obtaining and installing LSAM PTFs, utilizing an OpCon Schedule to manage appropriate triggers and dependencies, possibly started whenever the OpCon email scanning service recognizes an announcement email generated by SMA for clients who registered to receive email notification as new batches of IBM i LSAM PTFs are posted.
2. SMA recommends that clients also download the LSAM PTF README PDF document that can be downloaded from the same SMA ftp server where the LSAM PTF installation files are found.  This document provides simplified instructions and then also a list of available LSAM PTFs with a description of each.  Sometimes there could be important advice that clients should consider before starting the LSAM PTF installation, although the SMA standard is to avoid any special pre-application steps (other than the standard, documented system pre-requisites).
3. Perform the PTF installation process, initiated by a single LSAM menu option which extracts PTF resources from the downloaded PTF files and interprets them into control information that can be viewed and utilized by the LSAM menu functions or equivalent commands.
4. Use the LSAM menu 9, option 1, to review the list of installed LSAM PTFs.
    - Look for any PTFs that show a status (list column **St**) of "I" or blank; all PTFs should show a status of "A" = Applied.
        - In case any PTFs do not show the "A" status, contact SMA Support for assistance with diagnosing possible failures of the PTF installation process.  (PTF installation failure is exceptionally rare.)
    - Use the list function key <**F15=Subset**> to isolate only the PTFs with post-install instructions, as indicated by a value of "1" under the list **PI** column.
        - Clients should use the PTF list option **8=Instr** to view the instructions for each of the newly installed PTF.  Most of the time, post-install instructions provide a brief explanation of any changes and also quick steps for implementing new features.

## PTF Dependencies and Rollbacks

SMA carefully analyzes and controls the order in which software patches are issued. The LSAM PTF automation tools enforce critical dependencies among PTFs. For example, if PTF # 5 replaces the same program that was previously replaced by PTF # 3, then PTF # 5 depends on PTF # 3. The dependency is assumed because most PTFs replace multiple programs at once. Usually, the changes made in a batch of programs are synchronized with each other. If a patched version of a program is removed or replaced, and other programs from the same PTF are not also updated in a coordinated fashion, an LSAM function is likely to fail.

The LSAM PTF tools manage PTF dependencies by scanning the current PTF control files to discover these dependencies whenever a request is made to apply or to rollback a PTF. PTFs are applied in ascending order of the PTF Sequence Number. If they are rolled back, this must usually be done in reverse order of the PTF Sequence Number. The PTF Name field may or may not appear to have a number embedded in it, and it is possible that the name field will appear to be out of numeric order. The PTF Sequence Number is used to control the critical order of application. This allows ticket numbers from a support incident tracking system, usually referenced by the name of a PTF, to be managed out of the apparent sequence of the Name field.

If PTFs are applied individually, the LSAM PTF tools will scan the control database to make sure that all required previous PTFs have already been applied. It is only possible to apply PTFs out of sequence if they have no missing dependencies. If a prior PTF is required and not applied, the tools will reject the application request with an error message that lists up to 5 prior PTFs that are required.

Similarly, if a PTF must be rolled back (that is, removed, and the prior version of programs restored), the PTF tools check for any higher numbered PTFs that are still applied. If a PTF with a higher sequence number is dependent upon the PTF to be rolled back, the rollback operation will not be allowed and an error message will be displayed listing up to 5 PTFs that would have to first be rolled back before the target PTF can be rolled back.

:::info
Despite this discussion about the rollback operation, it is extremely rare that clients would ever need to rollback a PTF.  This function was designed primarily for use by developers and by clients who are performing pre-release beta site testing.
:::

The LSAM PTF tools permit an unlimited number of PTF rollbacks. However, PTFs should not normally be rolled back except at the instruction of SMA Support personnel. Although an error in LSAM processing may appear to have first occurred after a PTF was just applied, there is no guarantee that the PTF was the cause of the error. Therefore, the error should first be analyzed before a decision is made to rollback a PTF. Usually, if a PTF has been rolled back, it will be necessary for SMA to re-issue a corrected version of the PTF before it can be reapplied. This will rarely, if ever, occur. Should there be an exceptional circumstance where a PTF must be replaced, SMA will provide instructions to document the correct procedures for recovering the LSAM software to a reliable state and for restoring normal operations of the LSAM.

## Multiple LSAM Environments and SMAGPL Libraries

The role of the SMAGPL library has been changed since early in the evolution of the IBM i LSAM software. Originally, the SMAGPL library was created to replace the use of the IBM i library QGPL, as a location for LSAM high-level control commands and also as the storage location for LSAM PTF control files.

IBM i LSAM standards dictated that the SMAGPL library would always be used to store and manage the LSAM PTF control files and PTF-related objects (except for the rollback save files that are stored in the SMAPTF library). Only the high-level LSAM management commands (and some of their related programs and files) could be relocated to QGPL, according to the preferences of long-established clients who originally configured their IBM i system utilization standards to rely on the IBM QGPL library for this purpose.

As a replacement for the use of QGPL, the SMAGPL library was originally intended to be shared by multiple LSAM environments (although most clients do not need multiple LSAM environments within an IBM i partition).  However, after some (long past) experience it was proven impractical to share a single SMAGPL library with multiple LSAM environments. Now, the standard is that each LSAM environment will be defined by its own, completely unique library list, including a unique name for a dedicated copy of the SMAGPL library that supports each LSAM environment.

:::warning 
Existing, long-established clients who chose to continue using the QGPL library of the IBM i operating system are still supported by the LSAM software, but only in a limited way. That is, the LSAM PTF installation programs will still recognize this registered location of certain LSAM software objects, but the LSAM PTF programs cannot attempt to synchronize separate LSAM environments that now each have their own, dedicated copy of the SMAGPL library.

Clients who install only one copy of the LSAM software per IBM i partition are generally not at risk. But clients who choose to continue locating LSAM utility commands in the QGPL library do so at their own risk. Such clients are advised to contact their SMA Technologies Consultant or SMA Support to arrange for advice about converting their IBM i library utilization strategies. The most convenient strategy for exiting from use of the QGPL library is to choose this special option at the start of the next LSAM software version upgrade.  The SMASETUP command offers the QGPL conversion option in the first control options display that appears during the (most common) interactive execution.  (The optional batch upgrade process includes a command parameter that can request to perform the exit from QGPL.)

Existing, long-established clients who chose to continue using the QGPL library of the IBM i operating system are still supported by the LSAM software, but only in a limited way. That is, the LSAM PTF installation programs will still recognize this registered location of certain LSAM software objects, but the LSAM PTF programs cannot attempt to synchronize separate LSAM environments that now each have their own, dedicated copy of the SMAGPL library.

Clients who install only one copy of the LSAM software per IBM i partition are generally not at risk. But clients who choose to continue locating LSAM utility commands in the QGPL library do so at their own risk. Such clients are advised to contact their SMA Technologies Consultant or SMA Support to arrange for advice about converting their IBM i library utilization strategies.
:::

### Advice about Future Use of the QGPL Library

This advice applies to clients who need to install more than one copy of the LSAM software into a single IBM i partition. This strategy can be helpful for sites with limited IBM i resources that wish to configure a test LSAM environment separate from a production copy of the LSAM software.

Newer versions of the LSAM software do not accommodate the possibility that any LSAM software objects may reside in QGPL and be shared by multiple LSAM environments, when it comes to applying LSAM PTFs. Therefore, any secondary LSAM environments that rely on LSAM command objects located in the QGPL library instead of SMAGPL, are now subject to the possibility of being out of synchronization with the LSAM PTF levels of the separate LSAM environments. If library QGPL will be used, then it becomes important to keep any secondary LSAM environments synchronized. This defeats the purpose of having a test LSAM environment for proving new LSAM PTFs, while the production LSAM environment remains at a back level of PTFs. Thus, trying to use the QGPL library for LSAM utilities can now become a source of software execution errors.

Clients using library QGPL to store LSAM software components are encouraged to contact their SMA Technologies Consultant or SMA Support for advice about converting their library utilization strategies. SMA Technologies can help the client to eliminate dependence upon the QGPL library. Separate SMAGPL libraries should be used for each LSAM environment to fully isolate different copies of the LSAM software that are patched to different LSAM PTF levels.

## Options for PTF Distribution

The LSAM PTF acquisition process provides support for a variety of different processing methods and sources. Regardless of the acquisition process, the processes to load PTF control information and to apply PTFs to an LSAM environment remain the same. So the only difference is in the source location where raw PTF resources may be obtained and in the access method that is appropriate for each source.

The different source access methods supported automatically by LSAM menu-driven tools could also be supplemented by manual procedures. However, manual procedures would require a thorough understanding of the format and content of the PTF raw resources. This information can be made available to IBM i LSAM clients who believe that none of the automated acquisition procedures are appropriate for their site.

:::tip
The LSAM PTF tools provide an "easy way" to manage LSAM PTFs.  Even complex service organizations with multiple IBM i partitions on multiple Power Processors can perform a one-time configuration task that would enable fully automatic distribution and installation of LSAM PTFs among all their IBM i partitions.  OpCon automation makes this possible, combined with the LSAM PTF tools that were designed to support full procedural automation.
:::

The optimal goal is to take advantage of the automated tools provided by SMA with the IBM i LSAM software. The PTF load and application procedures are based on a predefined set of file resources (LSAM database control file content and IBM i save files). Supporting this strategy, the format of PTF raw resources used to distribute PTFs to client sites is also standard. This means that the LSAM tools will always know what to look for at a PTF source location, so the only variations in procedure are:

- Select one of the available source access methods.
    - If required, obtain and register a user profile and password for automated access to the LSAM PTF installation files source.
- Define the directory path that is appropriate for each access method.

Each of the PTF access methods supported by LSAM tools are described below. A brief definition of the access method is provided, along with guidance about how directory path names may be specified. Some of these access methods require a user name and password, while others do not. The LSAM PTF tools programs already include access logic that matches the requirements of each source type.

The **PTF Source** is a 3-character code that may be entered in the LSAM's PTF options configuration (LSAM menu 9, option 7) for consistent use. The PTF Source may also be overridden by the LSAM menu options or corresponding commands (SMAPTFREQ or SMAPTFINS) that drive the PTF request process.

### FTP: Downloading From an FTP Server

The "FTP" method used to obtain LSAM PTF raw resources from an ftp server are described in detail above, under How to obtain and apply PTFs.

For client sites who do not allow the IBM i partition to connect directly to an ftp server outside of the site's local area network, the site may provide its own ftp server as the resource for LSAM PTFs. In this case, the site administrators must use a manual procedure to obtain the LSAM PTF raw resources from the SMA source ftp server and then transfer those resources to a designated directory in the site's internal ftp server.

When SMA announces PTFs for the IBM i LSAM it will also publish reference information that can be used to identify the PTF raw resources, so that the complete and correct set of PTF resources can be installed into the internal ftp server directory. Currently, this type of information is documented in a single LSAM PTF "README" PDF document that can be downloaded from the same SMA ftp server location where the LSAM release-specific PTF install files are stored.

### OPT: Transferring From a System-attached Optical Drive (CD or DVD)

The optical drive (CD or DVD reader) connected to an IBM i partition may be used as a source location for LSAM PTF raw resources. To use the optical drive directly from the LSAM software, it is necessary to become familiar with the procedures for putting a CD or DVD disk on-line to the IBM i partition. Refer to the IBM IBM i Information Center for more information about this topic. SMA uses save file names limited to 8 characters so that the full expected save file names will not be distorted by the limitations of the optical drive access methods that IBM i supports.

When SMA distributes LSAM PTF support on an optical disk it will also furnish written information that describes the optical disk contents. The directory structure used to support LSAM PTF raw resources may be verified by different viewer tools available from IBM i. One method is to use the WRKLNK command and specify the OBJ parameter value as '/QOPT'. Type a '5' next to the QOPT directory name and press <**Enter**> to navigate into the directory structure of the optical disk. The directory names visible from the WRKLNK command should be the same as the names assembled in the directory path string provided for the LSAM PTF tools.

Once the optical directory path has been verified, the LSAM options configuration, or the LSAM command parameter overrides, can be configured to use the following options:

- PTF Source: OPT
- (The FTP URL or IP address is not used.)
- Source directory or path: /<*OPT_directory_path*>/

For the directory path, the LSAM PTF request program inserts the string '/QOPT' in front of the path name, so the entered path string must start with a forward slash (/). The path must then include the name of the optical drive directory path where the IBM i LSAM PTF raw resources have been discovered, replacing the string '<*OPT_directory_path*>' (do not keep the < > characters).

Notice that it is required to end the Source directory path string with a forward slash (/).

### IFS: Transferring From the IBM i Integrated File System

This "IFS" method is the most commonly used method for storing the LSAM PTF installation files.

The Integrated File System (IFS) is the disk space controlled by an IBM i partition that exists outside of the integrated DB2 database. Data is stored in the IFS using a hierarchy of directories that resembles MS Windows or UNIX or Linux disk organization, rather than in a single tier of libraries such as used by the LSAM software.  The most commonly used flat file system outside of the DB2 database is the root(/) file system that the IFS supports, and this is the best place to locally store the LSAM PTF installation files.

This option for distributing IBM i LSAM PTFs would be appropriate within a secured client network where the IBM i partitions are not allowed direct access to ftp servers outside the network, and the site does not have or use any other type of system to administer software support and maintenance within the IBM i partition. The LSAM PTF installation files could be downloaded from the SMA ftp server using simple ftp file transfer (always in binary mode) to a computer that is outside the client network. After the client is satisfied that the downloaded files are safe, they could be manually transferred (using a binary file transfer mode) to the designated PTF source directory inside the IFS root(/) disk space of the IBM i partition.

The IBM i administrator must create a designated directory within the root (/) file system of the IFS where LSAM PTF raw resources will be stored during the manual import process. Other IFS file systems could be used, if that is the most appropriate configuration for the site, but if that is the case, then the IFS special designator for the alternate file system must be included in the PTF source path.  For example, if it is desired to use the case-sensitive, UNIX-like /QOpenSys file system, then the characters "/QOpenSys" must precede the directory path that was created for the LSAM PTF installation files:

:::note Example
```
/QOpenSys/SMA/IBMiLSAMptf/18.1/
```
:::

Once the IFS directory source has been created, the LSAM options configuration, or the LSAM command parameter overrides, can be configured to use the following options:

- PTF Source: IFS
- (The FTP URL or IP address is not used.)
- Source directory or path: /<*IFS_directory_path*>/

For the directory path, the LSAM PTF request program does not insert any information in front of the path name, so the path must start with a forward slash (/). The path must then include the name of the designated IFS directory path where the IBM i LSAM PTF raw resources have been stored, replacing the string '<IFS_directory_path\>' (do not keep the < > characters).

Notice that it is required to end the Source directory path string with a forward slash (/).

### NTC: Downloading From a Network-attached Computer (PC)

NTC is the abbreviation used by the LSAM to represent IBM's iSeries™ NetServer™. With iSeries Netserver personal computers that run Windows[®]{style="font-size: 80%;vertical-align: super;"} or Linux[®]{style="font-size: 80%;vertical-align: super;"} software can seamlessly access data and printers that are managed by the IBM i operating system. It is also possible for users and programs within IBM i to access data stored on the personal computers.

:::tip
Sites that are not already using iSeries NetServer may not want to configure and use this class of IBM i services only for the purpose of the occasional LSAM PTF download. The NetServer services can impact overall system performance. If the decision is made to user NetServer only for this purpose, then consider ending the NetServer services once the PTF download process has been completed. This can be done, for example, from the IBM Navigator for i.
:::

This option for distributing IBM i LSAM PTFs might be appropriate within a secured client network where the IBM i partitions are not allowed direct access to ftp servers outside the network, and the site typically uses a MS Windows or Linux PC to administer software support and maintenance. The LSAM PTF installation files could be downloaded from the SMA ftp server using simple ftp file transfer to a computer that is outside the client network. After the client is satisfied that the downloaded files are safe, they could be manually copied to a designated PTF source directory on the central maintenance source system that is inside the network. 

The client network administrator would provide the source workstation (or server) name as it appears in the internal network, along with the directory path within that workstation where the LSAM PTFs raw resources are stored.

The IBM i administrator must configure the IBM i NetServer services within the IBM i partition. Information about this process can be obtained from IBM i on-line documentation (for example, at URL: <https://www.ibm.com/docs/en/i/7.3?topic=started-configuring-i-netserver ). Before the LSAM PTF tools can be used, the PTF resource workstation name must appear in the QNTC directory of the IBM i Integrated File System (IFS). This can be verified using the IBM Navigator for i by expanding the File Systems view. Within the File Systems, expand Integrated File System, then click on the directory QNTC to see a list of the registered computer names. 

The QNTC workstation connection can also be verified from an IBM i green screen workstation using the command WRKLNK. In the OBJ parameter specify '/QNTC'. From the display of the QNTC directory, type '5' next to the directory name and press <**Enter**> to see a list of registered workstation names.

Once the NetServer workstation configuration has been verified, the LSAM options configuration, or the LSAM command parameter overrides, can be configured to use the following options:

- PTF Source: NTC
- (The FTP URL or IP address is not used.)
- Source directory or path:
    /<*workstation_name*>/<*directory_path*>/

For the directory path, the LSAM PTF request program inserts '/QNTC' in front of the path name. The path must then include the name of the NetServer workstation (replacing the string '<workstation_name>' - do not keep the < > characters), preceded and followed by a forward slash (/) and then the designated directory path at that workstation where the IBM i LSAM PTF raw resources have been stored.

Notice that it is required to end the Source directory path string with a forward slash (/).
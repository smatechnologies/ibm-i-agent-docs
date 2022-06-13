---
sidebar_label: 'How the PTF Application Process Works'
---

# How the PTF Application Process Works

The IBM i LSAM PTF tools were designed to consolidate the entire process of requesting and applying PTFs into a single procedure started by one LSAM command from the LSAM menu system. However, as explained above under How to obtain and apply PTFs, the best practice is to divide this procedure into separate steps, accommodating the occasional post-install process. In other words, it is usually best to request the PTF information first and then evaluate the PTF control information before committing to apply the PTFs to the LSAM environment.

## Information for LSAM Installers

When the IBM i LSAM is installed for the first time from distribution media, there is normally no obstacle to installing all available PTFs in a single cumulative PTF application process. As soon as the basic LSAM installation is complete and the LSAM Parameters have been maintained, it would then be acceptable to use one of the alternate PTF source access methods to install all the currently available PTFs in a single cumulative PTF application process without concern for post-install instructions. Almost without exception, post-install instructions apply to the process of upgrading live clients.

The PTF application process for installers begins with the selection of the most appropriate method for installing the PTF raw resources into the SMAGPL library. This method may vary, depending on the circumstances. SMA may have available an LSAM patch CD that can be inserted into an IBM Power Processor-based optical drive, and the PTF installation process can be automated simply by setting the LSAM PTF configuration options first, and then by executing the Master PTF request, load and apply procedure from the LSAM menu.

It is often the case that a CD containing LSAM patch resources will be inserted into the optical drive of a PC attached to the IBM i partition, usually by means of IBM's System i Access software for Windows. In this case, the procedure for copying LSAM PTF resources to the IBM i library system might still be automated from the LSAM menu, or a manual procedure could be used to copy the resources via an ftp connection to the SMAGPL library.

Once the LSAM PTF resources are copied to the SMAGPL library, all that remains are the two simple steps of loading the PTF information, and then applying the cumulative PTFs all at once.

:::tip
SMA Installers should consult with the SMA TPM before conducting a product installation to review the latest available procedures that will be most appropriate for the circumstances of the installation.
:::

## Overview of PTF Management

The process of applying software improvements to SMA's IBM i LSAM application is an automatically coordinated, cooperative effort conducted by SMA technical personnel and authorized LSAM administrators at client sites.

The process begins as SMA receives feedback from clients about its software product. Both enhancement requests and problem reports have the potential of being addressed by the agile, on-demand PTF process, rather than being delayed by the software release development cycle.

SMA maintains client interaction forums at its internet sites and SMA intends to advance the use of these forums as a medium for making LSAM patch information available to clients using the IBM i LSAM. SMA also maintains address lists of clients preferring to be notified by email about the introduction of high priority LSAM fixes and/or useful LSAM feature enhancements. Whether notified or not, clients may use the LSAM menu functions at any convenient time to obtain the latest IBM i LSAM PTF information directly from SMA ftp servers. Urgency for applying available PTFs may arise either from a problem that is obstructing normal operation of the software, or from the appropriateness of new tools from SMA that can be used effectively by clients to improve the automation and reliability of their computer operations.

Once SMA has made new PTF's available for the LSAM, the steps involved in the automatic process for PTF application include:

1. Initiate a request to download the PTF resources from SMA or an alternate source site, into staging files stored in the LSAM's SMAGPL utility library.
2. Perform the PTF information load process, which extracts PTF resources from the downloaded format and interprets them into control information that can be viewed and utilized by the LSAM menu functions or equivalent commands.
3. SMA recommends at this point in the process that the client evaluate all unapplied PTFs to determine if (a) any PTF requires LSAM down time during installation, or (b) any PTF includes post-install instructions that might prevent a fully automated cumulative PTF application process. If down time is required, prepare an operational plan to accommodate the down time when no LSAM job will be executing. The PTF application down time has always been very short, but in rare cases when a very large log file must be converted and its content preserved, the PTF application process could take much longer than usual, depending on the power available to the IBM i partition.
4. Perform the PTF application process. Either single PTF application or a cumulative PTF application may be performed. Normally, the cumulative application process is recommended, but a case may arise where PTF post-install instructions could require a pause in the application sequence in order to complete some critical manual process for one PTF in the middle of the sequence. (This would be unusual. Most post-install processes, though still required, would not impede the process of apply later PTFs all at once.)

## PTF Dependencies and Rollbacks

SMA carefully analyzes and controls the order in which software patches are issued. The LSAM PTF automation tools help to enforce critical dependencies among PTFs. For example, if PTF # 5 replaces the same program that was previously replaced by PTF # 3, then PTF # 5 depends on PTF # 3. The dependency is assumed  because most PTFs replace multiple programs at once. Usually, the changes made in a batch of programs are synchronized with each other. If a patched version of a program is removed or replaced by the other programs from the same PTF are not also updated in a coordinated fashion, an LSAM function is likely to fail.

The LSAM PTF tools manage PTF dependencies by scanning the current PTF control files to discover these dependencies whenever a request is made to apply or to rollback a PTF. PTFs are usually applied in ascending  order of the PTF Sequence Number. If they are rolled back, this must usually be done in reverse order of the PTF Sequence Number. The PTF Name field may or may not appear to have a number embedded in it, and it is possible that the name field will appear to be out of numeric order. The PTF Sequence Number is used to control the critical order of application. This allows ticket numbers from a support incident tracking  system, possibly used to name the PTF, to be managed out of sequence.

If PTFs are applied individually, the LSAM PTF tools will scan the control database to make sure that all required PTFs have already been applied. It is only possible to apply PTFs out of sequence if they have no missing dependencies. If a prior PTF is required and not applied, the tools will reject the application request with an error message that lists up to 5 prior PTFs that are required.

Similarly, if a PTF must be rolled back (that is, unapplied, and the prior version of programs restored), the PTF tools check for any higher numbered PTFs that are still applied. If a PTF with a higher sequence number is dependent upon the PTF to be rolled back, the rollback operation will not be allowed and an error message will be displayed listing up to 5 PTFs that would have to first be rolled back before the target PTF can be rolled back.

The LSAM PTF tools permit an unlimited number of PTF rollbacks. However, PTFs should not normally be rolled back except at the instruction of SMA Support personnel. Although an error in LSAM processing may appear to have first occurred after a PTF was just applied, there is no guarantee that the PTF was the cause of the error. Therefore, the error should first be analyzed before a decision is made to rollback a PTF. Usually, if a PTF has been rolled back, it will be necessary for SMA to re-issue a corrected version of the PTF before it can be reapplied. This will rarely, if ever, occur. Should there be an exceptional circumstance where a PTF must be replaced, SMA will provide instructions to document the correct procedures for recovering the LSAM software to a reliable state and for restoring normal operations of the LSAM.

## Multiple LSAM Environments and SMAGPL Libraries

The role of the SMAGPL library has been changed since early in the evolution of the IBM i LSAM version 04.00.03. Originally, the SMAGPL library was created to replace the use of the IBM i library QGPL, as a location for LSAM high-level control commands and also as the storage location for LSAM PTF control files.

IBM i LSAM standards dictated that the SMAGPL library would always be used to store and manage the LSAM PTF control files and PTF-related objects (except for the rollback save files that are stored in the SMAPTF library). Only the high-level LSAM management commands (and some of their related programs and files) could be relocated to QGPL, according to the preferences of long-established clients who originally configured their IBM i system utilization standards to rely on the IBM QGPL library for this purpose.

As a replacement for the use of QGPL, the SMAGPL library was intended to be shared by multiple LSAM environments (although most clients do not need multiple LSAM environments within an IBM i partition); however, in recent years it has been proven impractical to share a single SMAGPL library with multiple LSAM environments. Now, the standard is that each LSAM environment will be defined by its own, unique library list, including a unique name for a dedicated copy of the SMAGPL library that supports each LSAM environment.

:::warning 
Existing, long-established clients who chose to continue using the QGPL library of the IBM i operating system are still supported by the LSAM software, but only in a limited way. That is, the LSAM PTF installation programs will still recognize this registered location of certain LSAM software objects, but the LSAM PTF programs cannot attempt to synchronize separate LSAM environments that now each have their own, dedicated copy of the SMAGPL library.

Clients who install only one copy of the LSAM software per IBM i partition are generally not at risk. But clients who choose to continue locating LSAM utility commands in the QGPL library do so at their own risk. Such clients are advised to contact their SMA Technologies Consultant or SMA Support to arrange for advice about converting their IBM i library utilization strategies. Existing, long-established clients who chose to continue using the QGPL library of the IBM i operating system are still supported by the LSAM software, but only in a limited way. That is, the LSAM PTF installation programs will still recognize this registered location of certain LSAM software objects, but the LSAM PTF programs cannot attempt to synchronize separate LSAM environments that now each have their own, dedicated copy of the SMAGPL library.

Clients who install only one copy of the LSAM software per IBM i partition are generally not at risk. But clients who choose to continue locating LSAM utility commands in the QGPL library do so at their own risk. Such clients are advised to contact their SMA Technologies Consultant or SMA Support to arrange for advice about converting their IBM i library utilization strategies.
:::

### Advice about Future Use of the QGPL Library

This advice applies to clients who need to install more than one copy of the LSAM software into a single IBM i partition. This strategy can be helpful for sites with limited IBM i resources that wish to configure a test LSAM environment separate from a production copy of the LSAM software.

Newer versions of the LSAM software do not accommodate the possibility that any LSAM software objects may reside in QGPL and be shared by multiple LSAM environments, when it comes to applying LSAM PTFs. Therefore, any secondary LSAM environments that rely on LSAM command objects located in the QGPL library instead of SMAGPL, are now subject to the possibility of being out of synchronization with the LSAM PTF  levels of the separate LSAM environments. If library QGPL will be used, then it becomes important to keep any secondary LSAM environments synchronized. This defeats the purpose of having a test LSAM environment for proving new LSAM PTFs, while the production LSAM environment remains at a back level of PTFs. Thus, trying to use the QGPL library for LSAM utilities can now become a source of software execution errors.

Clients using library QGPL to store LSAM software components are encouraged to contact their SMA Technologies Consultant or SMA Support for advice about converting their library utilization strategies. SMA Technologies can help the client to eliminate dependence upon the QGPL library. Separate SMAGPL libraries should be used for each LSAM environment to fully isolate different copies of the LSAM software that are patched to different LSAM PTF levels.

## Options for PTF Distribution

The LSAM PTF acquisition process provides support for a variety of different processing methods and sources. Regardless of the acquisition process, the processes to load PTF control information and to apply PTFs to an LSAM environment remain the same. So the only difference is in the source location where raw PTF resources may be obtained and in the access method that is appropriate for each source.

The different source access methods supported automatically by LSAM menu-driven tools could also be supplemented by manual procedures. However, manual procedures would require a thorough understanding of the format and content of the PTF raw resources. This information can be made available to IBM i LSAM clients who believe that none of the automated acquisition procedures are appropriate for their site. SMA may also equip its own installers with unique resources and special procedures that would make their job easier.

However, the optimal goal is to take advantage of the automated tools provided by SMA with the IBM i LSAM software. The PTF load and application procedures are based on a predefined set of file resources (LSAM database control file content and IBM i save files). Supporting this strategy, the format of PTF raw resources used to distribute PTFs to client sites is also standard. This means that the LSAM tools will always know what to look for at a PTF source location, so the only variations in procedure are:

- Select one of the available source access methods.
- Define the directory path that is appropriate for each access method.

Each of the PTF access methods supported by LSAM tools are described below. A brief definition of the access method is provided, along with guidance about how directory path names may be specified. Some of these access methods require a user name and password, while others do not. The LSAM PTF tools programs already include access logic that matches the requirements of each source type.

The **PTF Source** is a 3-character code that may be entered in the LSAM's PTF options configuration (LSAM menu 9, option 7) for consistent use. The PTF Source may also be overridden by the LSAM menu options or corresponding commands (SMAPTFREQ or SMAPTFINS) that drive the PTF request process.

### FTP: Downloading From an FTP Server

The methods used to obtain LSAM PTF raw resources from an ftp server are described in detail above, under How to obtain and apply PTFs.

For client sites who do not allow the IBM i partition to connect directly to an ftp server outside of the site's local area network, the site may provide its own ftp server as the resource for LSAM PTFs. In this case, the site administrators must use a manual procedure to obtain the LSAM PTF raw resources from the SMA source ftp server and then transfer those resources to a designated directory in the site's internal ftp server.

When SMA announces PTFs for the IBM i LSAM version 04.00.03 and newer, it will also publish reference information that can be used to identify the PTF raw resources, so that the complete and correct set of PTF resources can be installed into the internal ftp server directory. 

### OPT: Transferring From a System-attached Optical Drive (CD or DVD)

The optical drive (CD or DVD reader) connected to an IBM i partition may be used as a source location for LSAM PTF raw resources. To use the optical drive directly from the LSAM software, it is necessary to become familiar with the procedures for putting a CD or DVD disk on-line to the IBM i partition. Refer to the IBM IBM i Information Center for more information about this topic. SMA uses save file names limited to 8 characters so that the full expected save file names will not be distorted by the limitations of the optical drive access methods that IBM i supports.

When SMA distributes LSAM PTF support on an optical disk it will also furnish written information that describes the optical disk contents. The directory structure used to support LSAM PTF raw resources may be verified by different viewer tools available from IBM i. One method is to use the WRKLNK command and specify the OBJ parameter value as '/QOPT'. Type a '5' next to the QOPT directory name and press <**Enter**> to navigate into the directory structure of the optical disk. The directory names visible from the WRKLNK command should be the same as the names assembled in the directory path string provided for the LSAM PTF tools.

Once the optical directory path has been verified, the LSAM options configuration, or the LSAM command parameter overrides, can be configured to use the following options:

- PTF Source: OPT
- (The FTP URL or IP address is not used.)
- Source directory or path: /<*OPT_directory_path*>/

For the directory path, the LSAM PTF request program inserts the string '/QOPT' in front of the path name, so the entered path string must start with a forward slash (/). The path must then include the name of the optical drive directory path where the IBM i LSAM PTF raw resources have been discovered, replacing the string '\<*OPT_directory_path*>' (do not keep the \< > characters).

Notice that it is required to end the Source directory path string with a forward slash (/).

### IFS: Transferring From the IBM i Integrated File System

The Integrated FileSystem (IFS) is the disk space controlled by an IBM i partition that exists outside of the integrated DB2 UDB database. Data is stored in the IFS using a hierarchy of directories that resembles MS Windows or UNIX or Linux disk organization, rather than in a single tier of libraries such as used by the LSAM software.

This option for distributing IBM i LSAM PTFs might be appropriate within a secured client network where the IBM i partitions are not allowed direct access to ftp servers outside the network, and the site does not have or use any other type of system to administer software support and maintenance within the IBM i partition. The LSAM PTF raw resources could be downloaded from the SMA ftp server using simple ftp file transfer to a computer that is outside the client network. After the client is satisfied that the downloaded files are safe, they could be manually copied to a designated PTF source directory inside the IFS disk space of the IBM i partition.

The IBM i administrator must create a designated directory within the root (/) file system of the IFS where LSAM PTF raw resources will be stored during the manual import process. Other IFS file systems could be used, if that is the most appropriate configuration for the site, but if that is the case, then the IFS special designator for the alternate file system must be included in the PTF source path.

Once the IFS directory source has been created, the LSAM options configuration, or the LSAM command parameter overrides, can be configured to use the following options:

- PTF Source: IFS
- (The FTP URL or IP address is not used.)
- Source directory or path: /<*IFS_directory_path*>/

For the directory path, the LSAM PTF request program does not insert any information in front of the path name, so the path must start with a forward slash (/). The path must then include the name of the designated IFS directory path where the IBM i LSAM PTF raw resources have been stored, replacing the string '\<IFS_directory_path\>' (do not keep the \< > characters).

Notice that it is required to end the Source directory path string with a forward slash (/).

### NTC: Downloading From a Network-attached Computer (PC)

NTC is the abbreviation used by the LSAM to represent IBM's iSeries™ NetServer™. With iSeries Netserver personal computers that run Windows[®]{style="font-size: 80%;vertical-align: super;"} or Linux[®]{style="font-size: 80%;vertical-align: super;"} software can seamlessly access data and printers that are managed by the IBM i operating system. It is also possible for users and programs within IBM i to access data stored on the personal computers.

:::tip
Sites that are not already using iSeries NetServer may not want to configure and use this class of IBM i services only for the purpose of the occasional LSAM PTF download. The NetServer services can impact overall system performance. If the decision is made to user NetServer only for this purpose, then consider ending the NetServer services once the PTF download process has been completed. This can be done, for example, from the System i Navigator.
:::

This option for distributing IBM i LSAM PTFs might be appropriate within a secured client network where the IBM i partitions are not allowed direct access to ftp servers outside the network, and the site typically uses a MS Windows or Linux PC to administer software support and maintenance. The LSAM PTF raw resources could be downloaded from the SMA ftp server using simple ftp file transfer to a computer that is outside  the client network. After the client is satisfied that the downloaded files are safe, they could be manually copied to a designated PTF source directory on the central maintenance source system that is inside the network. 

The client network administrator would provide the source workstation (or server) name as it appears in the internal network, along with the directory path within that workstation where the LSAM PTFs raw resources are stored.

The IBM i administrator must configure the iSeries NetServer services within the IBM i partition. Information about this process can be obtained from IBM IBM i Information Center (for example, at URL: <http://publib.boulder.ibm.com/infocenter/iseries/v5r4/index.jsp> ). Before the LSAM PTF tools can be used, the PTF resource workstation name must appear in the QNTC directory of the IBM i Integrated File System (IFS). This can be verified using the System i Navigator by expanding the File Systems line under the server ID (IP Address or name). Within the File Systems, expand Integrated File System, then click on the directory QNTC to see a list of the registered computer names. 

The QNTC workstation connection can also be verified from an IBM i green screen workstation using the command WRKLNK. In the OBJ parameter specify '/QNTC'. From the display of the QNTC directory, type '5' next to the directory name and press <**Enter**> to see a list of registered workstation names.

Once the NetServer workstation configuration has been verified, the LSAM options configuration, or the LSAM command parameter overrides, can be configured to use the following options:

- PTF Source: NTC
- (The FTP URL or IP address is not used.)
- Source directory or path:
    /<*workstation_name*>/<*directory_path*>/

For the directory path, the LSAM PTF request program inserts '/QNTC' in front of the path name. The path must then include the name of the NetServer workstation (replacing the string '\<workstation_name\>' - do not keep the < > characters), followed by a forward slash (/) and then the designated directory path at that workstation where the IBM i LSAM PTF raw resources have been stored.

Notice that it is required to end the Source directory path string with a forward slash (/).
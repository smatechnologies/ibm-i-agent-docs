---
sidebar_label: 'LSAM Software Maintenance (PTFs)'
---

# LSAM Software Maintenance (PTFs)

This topic explains how to use the LSAM menu-driven tools that should be used to update the IBM i LSAM software product whenever SMA issues program corrections or enhancements in between distributed versions of the product.

Since LSAM version 18.1, it is important to note the two key fields of information that represent the software patch level of this Agent software:

- **PTF Level**: This is the value that is used at the highest level to represent the actual patch level of the LSAM software. Although the "PTF Name" (also known as the "PTF Number" field, such as PTF181006) is still a unique key that may be used to refer to a patch, SMA will request the "PTF Level" value from a client to determine that client's patch level for this Agent software.
- **DB Level**: The database level of the LSAM software indicates a cut-off point among the PTF Levels where database changes were made using the LSAM software patching tools. These enhancements to the Agent are small enough that a simple patch can install them, rather than requiring a full LSAM Upgrade to a new Version. The DB Level is the control level that is used to match LSAM environments when the LSAM Data Export/Import tool is being used. It is no longer required that two LSAM environments must match exactly at the PTF Level (although that is always recommended, to assure expected results). Only the database level MUST match. A change in the DB Level also marks a point among all the PTFs where a Rollback operation is usually not permitted. That is, the PTF Rollback capability will usually prevent rolling the software patches backwards past a DB Level boundary, although this may sometimes be permitted. But a single PTF rollback will not move the DB Level backward.

## LSAM Program Temporary Fixes

The programs that comprise the LSAM software may sometimes be updated by SMA to correct software problems or to enhance an LSAM function. SMA has used the IBM term to designate periodic changes to its IBM i Agent software: PTF (program temporary fixes). SMA may offer PTFs that can be applied to the LSAM software, either in response to a problem report or in a proactive manner by announcing to all clients that one or more PTFs are available. 

This OpCon Agent for IBM i supports functions that can be managed from within the LSAM menu system. There is also a method for engaging the Agent commands behind the menu options so that the whole process of obtaining and installing LSAM PTFs could be automated, starting with the OpCon server recognizing an email message broadcast by SMA to Agent users who choose to be subscribed to the broadcast Agent update emails.

### LSAM PTF Strategy

The LSAM PTFs are accompanied by a stand-alone Adobe Acrobat Reader™ file (type .PDF). This PTF "README" document includes a list of all the LSAM PTFs published for a given LSAM version, including the latest additions to the list (at the end of the list). There are standard pre-requisite instructions that explain how to prepare for LSAM PTF installation.  Then, the list of PTFs identifies the changes being made to the software by each PTF, including any (rare) required special instructions that may vary from the standard procedures identified in this topic. 

In contrast with IBM i PTF procedures, there is not a separate PTF document for each PTF.  Instead, all information about the latest batch of PTFs is contained in one updated copy of the PTF README document.  There is a separate README document for each major version of the Agent.

:::tip
SMA strives to avoid imposing any requirements on users of the IBM i Agent to make any special preparations (other than the usual standard to backup the LSAM libraries) before installing the LSAM PTFs.  However clients are recommended to study the LSAM PTF README PDF document before starting a PTF application, to verify there are no highlighted, rare exceptions to this rule.

Instead, the LSAM PTF list shows a "1" flag under the list column **PI** that indicates if any newly installed LSAM PTFs have post-install instructions.  Sometimes these post-install instructions explain how to activate a newly added feature.
:::

The instruction documentation may also include a reference to LSAM documentation updates, along with instructions about how to obtain the updates. Sometimes a PTF requires that the LSAM software be temporarily stopped and restarted, but some PTFs may be applied while the LSAM remains active. The standard PTF application tools on the LSAM menu will automatically handle the LSAM server job stops and restarts, based on the profile record that controls each PTF.

The strategy for updating the IBM i LSAM software includes a method for updating program objects, and sometimes also a method for updating database files. As a rule, PTFs will not often be used for database updates. Instead, database updates are better handled as part of an LSAM software version upgrade. However, the Agent documents its Database Level (DBLVL), since the LSAM data Export/Import feature requires that any two LSAM environments must have a matching database level in order to complete LSAM configuration data transfers.  When there are database file changes, they will be made in place in the SMADTA library (or the equivalent library in an alternate LSAM environment). The PTF method for introducing limited database changes is much simpler than the Agent version upgrade process.  In terms of modern "DevOps" standards, this Agent's LSAM PTF methods that can support database updates implements support for an agressive program of CD/CI (Continuous Development/Continuous Integration), to the advantage of SMA clients.

Program changes are made to the LSAM base programs library, SMAPGM (or its equivalent). During the PTF application process a save file of replaced objects is automatically created in order to support the PTF rollback option. Some PTFs may not be eligible for rollback, in which case the PTF control record will show this special status and prevent the use of the rollback function.

:::tip
For versions of the IBM i (IBM i) LSAM prior to version 04.00.03, the library SMAPTF was used to install the replacement program objects delivered by PTFs. The new standard for LSAM software maintenance now only stores one copy of each program object, either in the SMAPGM library or in the SMAGPL utilities library (and/or the IBM i QGPL library, if that option was selected for LSAM environment management tools). The LSAM PTF capability to rollback PTFs makes it safe to replace the base version of objects that comprise the LSAM software. In support of the rollback feature, the SMAPTF library is used (only) to store the PTF rollback save files.

SMA has never had to use the LSAM PTF rollback function for a released version of the LSAM.  This tool was primarly intended for use within SMA Development, and also to support beta sites who have accepted a pre-relase new version of the LSAM for testing in cooperation with the SMA Development department.
:::

The control list for LSAM PTF application is maintained in LSAM database files. The PTF level, DB level and individual PTF status of the LSAM environment may be viewed from LSAM menu 9, option 1: Work with LSAM PTFs. The PTF request, load, application and rollback functions can be controlled from any of three locations:

- List options or function keys from within the Work with LSAM PTFs function.
- Individual options on LSAM menu 9.
- Using LSAM commands from any command entry line or batch job where the LSAM environment library list has been established.

:::caution
The LSAM PTF menu shows several menu options 3 - 6 that represent incremental steps in the overall process of obtaining and installing LSAM PTFs.  However, these options should not be used by clients without specific instructions from SMA Support, because they are difficult to control and they were intended for use only in exceptional circumstances that would typically require assistance from SMA Support.  Rather, the whole LSAM load and install process should normally be managed by the LSAM menu 9, option 2, or by the equivalent LSAM command SMAPTFINS, which can handle the whole process quickly and automatically.
:::

#### Auditing LSAM PTF Application

If it becomes necessary to audit the IBM i LSAM PTFs that are applied to the system, in case of suspected corruption of the LSAM PTF control database, each PTF is still represented by an application control data area in the LSAM database. Use the following command to view a list of the PTF control data areas in the SMADTA library (or its equivalent in an alternate LSAM environment):
```
WRKOBJ OBJ(SMADTA/PTF*) OBJTYPE(*DTAARA)
```

Some PTF data areas will only be found in the SMAGPL library:
```
WRKOBJ OBJ(SMAGPL/PTF*) OBJTYPE(*DTAARA)
```
The LSAM PTF routines may create additional PTF control data areas in the LSAM central utilities library, SMAGPL. These are used to avoid unnecessary duplication of effort when there might be more than one LSAM environment on a single system. They can also be used to help protect the LSAM environment management data that resides in library SMAGPL.

From time to time, usually as major LSAM release upgrades are applied, the PTF control data areas will be purged from the SMADTA and SMAGPL libraries. But not all PTF control data areas that remain in the SMADTA library necessarily apply to the current version of the LSAM. There could be PTF data areas from prior releases. If this information is important, SMA Support will explain the details during any problem
determination.

### How to Obtain and Apply PTFs

Based on many years of experience, SMA Technologies and its clients have adopted an effective and simple "fast path" procedure for obtaining and installing the IBM i Agent (LSAM) PTFs.

Clients of SMA Technologies are strongly recommended to refer to the latest available information about the LSAM PTFs, which is available for download in one or more PDF documents, stored alongside of the LSAM PTF save files in the SMA Technologies secure ftp server. New clients may contact SMA Support for instructions and to obtain a user ID and password for accessing the SMA Technologies secure ftp server.

#### How to Obtain the LSAM PTF Save Files

As of the date of this publication, the directory location in the SMA Technologies secure ftp server for this Agent's software patches and enhancements is called "/IBMiLSAMptf". 
```
/OpCon Releases/Agents/IBMi/18.1/IBMiLSAMptf
```
Please carefully note the directory path to this folder. It is important to select the hosting  sub-directory that matches the Version of the IBM i LSAM in use at the client site.  

Do not use the old "/IBMiLSAMptf" directory that is found at the root of the files.smatechnologies.com web location, since this directory is now restricted for use by SMA Support and Development during direct interaction with OpCon Support clients and beta test sites.  LSAM PTF resources that were previously located in this root-level directory have been moved, and a simple text document in the old directory reminds clients of where the current LSAM PTF support files can be found.

Inside the /IBMiLSAMptf sub-directory, there is a "README" PDF document that lists all the available software fixes and enhancements for that LSAM Version. This document may include important, sometimes CRITICAL instructions that must be followed to effectively install the latest PTFs.

This same README document starts with instructions about the steps to perform for the standard "fast path" PTF installation method. Included are some standard pre-requisite considerations.

SMA Technologies reminds its clients that this entire process, including obtaining and applying PTFs, can be automated using OpCon. This may be especially important for clients who are operating many IBM i partitions. Please contact SMA Support, the client's SMA Technologies Consultant, or the client's SMA Sales representative to request assistance with configuring a fully-automated LSAM PTF distribution and installation process.

#### How to Apply IBM i LSAM PTFs

SMA Technologies reminds its clients that the "PTFs" for the IBM i Agent of OpCon are not the same as the "PTFs" issued by IBM for the IBM i operating system. Except by coincidence, there is no direct relationship between the IBM i operating system PTFs and the OpCon Agent (LSAM) PTFs. If an IBM i OS PTF might be critical for correct operation of the LSAM, the LSAM PTF Readme document will explain this requirement.

For orientation purposes, here is a summary of the "fast path" steps to apply the LSAM PTFs.

1. Use the LSAM sub-menu 9, option 7, to confirm or update the LSAM PTF Configuration. Refer to [PTF Options Configuration](../maintenance/screens.md#ptf-options-configuration) in the Screens and Windows segment of this documentation section for details about the LSAM PTF Configuration values.

2. Download the two LSAM PTF save files from the SMA Technologies secure ftp server.

    - The base file names are LSCTLDTA (PTF control data) and LSCUMPTF (a collection of all the available PTF save files for each numbered PTF). 

    - When an LSAM version matures, the LSCUMPTF save file will be divided into management segments, called "partial PTF save files." There is a separate sub-sub-directory "Partial PTF (smaller) save files and instructions" under the /IBMiLSAMptf folder at the SMA Technologies secure ftp server where these partial PTF save files are stored, along with a PDF document of instructions that explains how to use these smaller collections.

3. Choose option 2 from the LSAM sub-menu 9 to start the PTF installation process.

    - Option 2 from sub-menu 9 is the all-in-one PTF install option. There is usually no need to utilize any other LSAM PTF sub-menu option (except for option 7 that was completed in step 1, above).

    - The PTF Configuration options may be overridden using the first prompt screen that appears after option 2 is selected.

4. If any errors occur during the execution of the LSAM PTF Install process, SMA Technologies strongly recommends that clients immediately contact SMA Support for assistance, leaving the error condition unanswered, rather than trying to guess about how to recover from the error.

    - An incorrect response to a failure of the PTF Install process can create a big mess that is difficult to repair.

    - SMA Technologies will not charge off-hours Support fees in case support is required for the failure of the LSAM PTF install process.

    - The incidence of any LSAM PTF installation failure is extremely rare.  The cause of rare incidences has typically been a conflict with some database mirroring application.  Users of database mirroring can consult the "Tips and Techniques" folder under the IBM i Agent version-specific directory, if the LSAM PTF README document does not provide enough information about this subject.

5. Once the sub-menu option 2 is completed, SMA Technologies recommends using LSAM sub-menu option 1 to review the updated LSAM PTF list.

    - Look first under the list column **ST** where the Status of each PTF should show "A" indicating "Applied."  
        - If any PTF shows a status of "I" = Incomplete, please contact SMA Suport for assistance with diagnosing why the PTF could not be installed.
        - In case of a failed PTF, it is possible that one or more subsequent PTFs will show a blank Status value.  This condition should also be reported to SMA Support for assistance in identifying why the PTFs did not get applied as expected.

    - Note the current PTF level and (if available) the LSAM Database level (which is critical for the LSAM data export/import tools).

### Complete Details about Obtaining and Applying PTFs

:::info
Most LSAM Administrators do not need all of the detail included in this section of documentation.  Clients who are successfully using LSAM menu 9, option 2, to apply LSAM PTFs can skip a thorough study of this section.  It is published to help with detailed technical support.
:::

There is a single LSAM command (and menu function), SMAPTFINS, that can be used to execute the entire PTF acquisition and application process from a single request. This option becomes available as soon as the PTF options and configuration have been completed from LSAM menu 9, option 7. 

SMA recommends using this command (and/or menu option 2 on the LSAM sub-menu 9) as the best way to install, load and apply PTFs all in one step. This comprehensive command includes each of the individual procedures outlined below, so its command parameters may be understood by studying the individual steps of PTF application that follow.

:::tip
When using the SMAPTFINS command, only user profile QSECOFR may perform this function because the PTF application steps may periodically require QSECOFR authority. In some cases, it might be acceptable for an LSAM Administrator with \*ALLOBJ authority to apply PTFs.
:::
:::caution
Do not use the LSMA PTF menu options 3 - 6 unless instructed by SMA Support personnel.  These individual PTF management steps are intended only for exceptional recovery procedures, and it is easy to use them incorrectly, possibly corrupting the LSAM PTF database and the LSAM software.
:::

The control list for LSAM PTF application is maintained in LSAM database files. The PTF level and individual PTF status of the LSAM environment may be viewed from **LSAM menu 9, option 1: Work with LSAM PTFs**. The PTF request, load, application and rollback functions can be controlled from any of three locations:

- List options or function keys from within the Work with LSAM PTFs function.
- Individual options on LSAM menu 9.
- Using LSAM commands from any command entry line or batch job where the LSAM environment library list has been established, including in OpCon-scheduled jobs for IBM i.

The instructions below for obtaining and applying PTFs refer to the individual menu options on LSAM menu 9. The corresponding options and function keys that may be used to perform the same operations from within the Work with LSAM PTFs function are clearly labeled. The stand-alone commands that represent each menu option are show in the menu option description line.

#### Configure LSAM PTF options

The following outline is focused on configuring for a fully automatic process of retrieving and installing LSAM PTFs.  Notes are included where applicable to reference differences between this "FTP" method and other three file access methods.  This section also provides a context and method for using the LSAM PTF menu options 3 - 6 (or the equivalent LSAM commands), in case exceptional circumstances prevent the preferred use of the single-step process described above.

1. To use the automatic on-line PTF request feature (FTP mode), obtain from SMA the following information:
    - An SMA ftp server user profile name and password
    - The IP address or URL currently used by SMA for its client ftp server
    - The path name provided by SMA at its ftp server for IBM i LSAM PTFs:
    
:::info PATH Examples
For the FTP method, the path name at the SMA ftp server is:
```
    /OpCon Releases/Agents/IBMi/18.1/IBMiLSAMptf
```
For the IFS method, the path name recommended within the IBM i root(/) file system is:
```
    /SMA/IBMiLSAMptf/18.1/
```
::: 

2. Log on to an IBM i interactive workstation session as either QSECOFR or an LSAM Administrator with privileges to update LSAM PTF control file data.
3. From a command line, enter **SMAGPL/STRSMA**. For more information on **STRSMA** command parameters, refer to the [STRSMA Command](../operations/lsam.md#the-strsma-command).
4. Enter **9** to choose the **PTF and Security menu** in the LSAM Main Menu.
5. Enter **7** to choose **PTF options configuration** in the PTF and Security Menu.
6. <**Tab**> to the following fields and type data for each.

    - **PTF source**:
        - Type **IFS** into this field to use the method that is recommended for most clients.  See [Configuration for the "IFS" method of obtaining PTFs](./ptf#configuration-for-the-ifs-method-of-obtaining-ptfs) just below.
        - To select the automatic PTF service provided by SMA, type "**FTP**" into the PTF Source field. 
            - This FTP option is only useful at sites where firewall rules allow the IBM i partition to access an outside connection to the internet. Or, it may be used when sites will import the PTF save files to a Windows or UNIX ftp server within the firewall of the site LAN. 
        - Other options for this field are discussed in the next section of this document. 
        
    - **SMA ftp user**: When using the FTP method, type the user profile name provided by SMA (or an alternate source) for its ftp server.

    - **Password** and **Confirm Pwrd**: When using the FTP method, type the FTP server user profile's password that was provided by SMA (or an alternate ftp server provider).

    - **FTP URL or IP address**: When using the FTP method, type the URL path or the IP address provided for communication with the ftp server.

    - **Source directory or path**: When using the FTP method, type the path name provided by the FTP server source administrator for the location of IBM i LSAM PTF resources. This field may also be used for a directory name when sources other than FTP have been selected. The path name (Windows, Unix or IBM i IFS root directory format) must end with a forward slash (/), and most root directory servers also require that the path name begin with a forward slash (/).

    - **PTF - LSAM server stop opt**: Select one of the available options. Refer to [PTF Options Configuration](../maintenance/screens.md#ptf-options-configuration) in the Screens and Windows segment of this documentation section for more information.

    - **PTF - Restart servers opt**: Select one of the available options. Refer to [PTF Options Configuration](../maintenance/screens.md#ptf-options-configuration) in the Screens and Windows segment of this documentation section for more information.

    -  **PTF process default values**, **Submit job?** and **Auto-load after request?**: Select 'Y' = yes or 'N' = no.

       - Specifying 'Y' = yes for the Submit job option is usually best for system performance. Use 'N' = no for interactive processing only to perform process problem diagnostics.

       - The option for Auto-load after request should normally be set to 'Y' = yes. The PTF data requested from the ftp server (or other source) is not useful until it has been loaded into the LSAM database. The only reason for handling this separately is if the requested information will be redistributed to an intermediate staging site after it is downloaded. This might be necessary in a high security environment in order to move the PTF resources past a secured firewall.

        -  When the Submit job? option is set to 'Y' = yes, also supply values to define the submitted job attributes:

      -  **Job description** and **Job description library**: Use SMALSAJ00 in SMADTA (or similar library name in an alternate LSAM environment).

      - **Job queue** and **Job queue libr** (library): The job queue should be set to a queue connected to an IBM i subsystem that will continue to operate even if the PTF application process needs to stop the LSAM subsystem, such as QBATCH.

7. Press <**Enter**> to update the PTF configuration options.

#### Request a List of Available PTFs

1. Log on to an IBM i interactive workstation session as either QSECOFR or an LSAM Administrator with privileges to update LSAM PTF control file data.
2. In the command line, enter **SMAGPL/STRSMA**. For more information on **STRSMA** command parameters, refer to the [STRSMA Command](../operations/lsam.md#the-strsma-command).
3. Enter **9** to choose the **PTF and Security menu** in the LSAM Main Menu.
4. Enter **3** to choose **Request PTF information or save files**. The command SMAPTFREQ will be prompted in the PTF and Security Menu.
5. On the SMAPTFREQ command prompt screen, <**Tab**> to the following fields and enter the following data:

    - **PTF request type**: Type ALLOBJ to request all list information and the cumulative collection of PTF save files.  Refer to [PTF Options Configuration](../maintenance/screens.md#ptf-options-configuration) in the Screens and Windows segment of this documentation section for more information about the following fields.
        - For the ALLOBJ option, skip the **ONEPTF PTF name** field.

    - **LSAM environment name**: Usually it is appropriate to leave this field set to \*CURRENT when the LSAM menu has been used to start the request function.

    - **LSAM SMAGPL Utility Library**: Leave this field set to the value of \*DEFAULT. Other values are supplied for SMA internal development tasks, or other special applications of this tool.

    - **Submit job**: This field would usually be left at the default value of asterisk (\*), meaning to use the PTF control file options (that were set in the previous procedure, above). The PTF process would typically complete faster and with less impact on system performance when performed as a batch job, rather than executed interactively.

    - **Automatic load after request**: Leave the option set to asterisk (\*) to use the PTF control file option. Typically this should be set to 'Y' = yes because the requested data is not useful from the LSAM menu system until it has been loaded.

    - **PTF source access method**: This field is left at the default value of asterisk (\*) which refers to the PTF control file option, set above to 'FTP' or other method. (Other request options are explained in the next section of this document.)

    - **FTP IP Address** and **path name**: Both fields should have been set in the PTF options configuration, above.

    - **Override SAVF name of OPT**: Ignored when the access method is FTP.

6. Press <**Enter**> to complete the command prompting phase of the request process.
7. The **PTF Request Parameters** confirmation screen appears. This screen is used to confirm that the correct options were selected from the PTF configuration file, whenever the SMAPTFREQ command has been used in an interactive job. (If this command is executed in a batch job, the confirmation screen is skipped and the existing PTF configuration values are assumed correct.) Type any changes if necessary, then press <**Enter**> to complete the process of submitting the PTF request procedure to a batch job. An LSAM normal completion message appears at the bottom of the LSAM menu display.
8. Monitor for completion of the job SMAPTFREQ. One command that may be used to work with the submitted job (if authorized) is: **WRKSBMJOB *JOB**
9. After the request and load process has been completed, use the LSAM menu 9, option 1: Work with LSAM PTFs to view the new PTF information that has been loaded into the LSAM database for this LSAM environment.

#### Review PTF Status and Instructions
Whenever one or more PTFs has been requested and loaded to the LSAM PTF control database, the next step should be to examine the updated list of unapplied PTFs for the following exceptional conditions. Optionally, use <**F15=Subset**> to filter the list to show only PTFs with one of the following flags:

- PTFs that require LSAM down time for application (list column **Dn** = "1")

- PTFs that include post-install instructions (list column **PI** = "1")

1. In the command line, enter **SMAGPL/STRSMA**. For more information on **STRSMA** command parameters, refer to the [STRSMA Command](../operations/lsam.md#the-strsma-command).
2. Enter **9** to choose the PTF and Security menu in the LSAM Main Menu.
3. Enter **1** to choose **Work with LSAM PTFs** in the PTF and Security Menu.
4. Press <**F15**> to display the Subset PTF List window in the Work with LSAM PTFs list display.
5. Type **1** in the **Select subset** field to limit the list to the un-applied PTFs only.
6. Press <**Enter**> to continue.
7. The **Work with LSAM PTFs** list reappears with a limited number of entries. If no entries appear, there are no new PTFs to be applied, and the process ends with this step.
8. Review the list for any lines that show a '1' under the column **Dn**. If there are any entries in this column, then the operations schedule must be planned to accommodate LSAM server down time before proceeding with the step to apply the PTFs.
9. Review the list for any lines that show a '1' under the column **PI**. If there are any entries in this column this means there are Post-Install Instructions that must be reviewed before the PTF application should be executed. Sometimes the "post-install" instructions could actually include some pre-install requirements. It might also be necessary to complete the post-install instruction of one PTF before attempting to apply any other PTFs. In this case, the cumulative PTF application procedure cannot be used and  individual PTF application must be performed instead, at least until the restricted PTF is applied. (After that, all remaining PTFs could be applied by the cumulative PTF application procedure outlined below.)
10. When planning down time for LSAM PTF application, as experience is gained with the PTF application tools, it is feasible to create jobs in an OpCon schedule that will assure all other work is completed or suspended until LSAM PTF application that requires down time is completed. The LSAM PTF application can be executed by an OpCon job that calls the command SMAPTFCUM (or SMAPTFAPY) with appropriate parameters. By setting the PTF options so that the LSAM server operations are automatically restarted, the OpCon schedule will be notified as soon as the LSAM link is restored that the PTF application job has completed normally. At that point, normal OpCon schedule operations for the LSAM may resume.

#### Apply Cumulative PTF (SMAPTFCUM)
Whenever one or more PTFs has been requested and loaded to the LSAM PTF control database, and the review of unapplied PTFs has been completed, the normal procedure would be to apply all unapplied PTFs in a single step (as long as the PTF Post-install instructions present no obstacles). The individual PTF application process and the cumulative PTF application process are essentially similar.

1. Log on to an IBM i interactive workstation session as either QSECOFR or an LSAM Administrator with \*ALLOBJ authority. Normally, PTF application is considered to require QSECOFR authority because any aspect of the LSAM software may require updating, and some LSAM features involve the management of authority assigned to QSECOFR.
2. In the command line, enter **SMAGPL/STRSMA**. For more information on **STRSMA** command parameters, refer to the [STRSMA Command](../operations/lsam.md#the-strsma-command).
3. Enter **9** to choose the PTF and Security menu in the LSAM Main Menu.
4. Enter **5** to choose **Apply cumulative PTF (SMAPTFCUM)** in the PTF and Security Menu.
5. The IBM command prompt for the SMAPTFCUM command appears.
6. In the SMAPTFCUM command prompt screen, if the current LSAM environment is not the default LSAM environment, change the **Environment name** to either *CURRENT or to the actual LSAM environment name. (The value *CURRENT cannot be used when the command SMAPTFCUM is executed in a batch job, unless the job's initial library list was set equal to the target LSAM environment library list.)
7. Leave the parameter **LSAM General Purpose Library** set to the value *DEFAULT. (This option is available mostly for SMA internal development and testing purposes.)
8. Press <**Enter**> to continue.
9. The PTF application process is performed automatically in the interactive job.
10. If requested, and the LSAM servers had to be suspended during the PTF application process, the LSAM servers are automatically restarted as soon as the PTF application process.
11. The cumulative PTF procedure completes by displaying a message on the workstation screen, "Cumulative PTF application to LSAM: <*LSAM_name*> completed normally."

#### Configuration for the "IFS" method of obtaining PTFs
When site firewall rules prohibit the direct connection of the IBM i partition to any outside server (by automatic means), change the PTF Configuration options to use the IFS method. This method supports manually storing the PTF save files (called LSCTLDTA and LSCUMPTF) into any IFS root(/) file system directory, as binary stream files (with no suffix on the file name). Use a manual procedure, for example, to transfer the PTF save files to this IFS directory (always using a binary file transfer method), after they have been manually downloaded from SMA's client ftp server. Follow these steps to configure the LSAM PTF application tools for the IFS method:

1. From LSAM sub-menu **9**, enter **7** to choose **PTF options configuration**.
2. <**Tab**> to the following fields and type data for each:

    - In the **PTF source** field, type "IFS".
     
    - The **SMA ftp user** field, the **Password** and the **Confirm Pwrd** fields, and the **FTP URL or IP address** field, are not used by this method. They may be ignored. 

    - In the **Source directory or path** field, type the path name of the IFS directory that was created for this specific purpose. For example, if the IFS root directory is used/allowed, the path name might be '\SMA\IBMiLSAMptf\'. Note that the trailing slash character must be typed.

    - Press <**Enter**> to commit the changes to the LSAM Parameters control file.

3. Using this method, there will not be any data communications or ftp messages displayed during the first steps of loading the PTF save files into the SMAGPL library.
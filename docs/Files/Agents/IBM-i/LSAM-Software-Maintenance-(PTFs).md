---
lang: en-us
title: LSAM Software Maintenance (PTFs)
viewport: width=device-width, initial-scale=1.0
---

# LSAM Software Maintenance (PTFs)

[]{#aanchor20} This topic explains how to use the LSAM menu-driven tools that should be used to update the IBM i LSAM software product whenever
SMA issues program corrections or enhancements in between distributed
versions of the product.

 

Since LSAM version 18.1, it is important to note the two key fields of
information that represent the software patch level of this Agent
software:

-   PTF Level: This is the value that is used at the highest level to
    represent the actual patch level of the LSAM software. Although the
    \"PTF Name\" (also known as the \"PTF Number\" field, such as
    PTF181006) is still a unique key that may be used to refer to a
    patch, SMA will request the \"PTF Level\" value from a client to
    determine that client\'s patch level for this Agent software.
-   DB Level: The database level of the LSAM software indicates a
    cut-off point among the PTF Levels where database changes were made
    using the LSAM software patching tools. These enhancements to the
    Agent are small enough that a simple patch can install them, rather
    than requiring a full LSAM Upgrade to a new Version. The DB Level is
    the control level that is used to match LSAM environments when the
    LSAM Data Export/Import tool is being used. It is no longer required
    that two LSAM environments must match exactly at the PTF Level
    (although that is always recommended, to assure expected results).
    Only the database level MUST match. A change in the DB Level also
    marks a point among all the PTFs where a Rollback operation is
    usually not permitted. That is, the PTF Rollback capability will
    usually prevent rolling the software patches backwards past a DB
    Level boundary, although this may sometimes be permitted. But a
    single PTF rollback will not move the DB Level backward.

## LSAM Program Temporary Fixes

The programs that comprise the LSAM software may sometimes be updated by
SMA to correct software problems or to enhance an LSAM function. SMA has
used the IBM term to designate periodic changes to its software: PTF
(program temporary fixes). SMA may offer PTFs that can be applied to the
LSAM software, either in response to a problem report or in a proactive
manner by announcing to all clients that one or more PTFs are available.
If a general announcement is made, it will include instructions about
how to obtain the PTFs.

 

Beginning with IBM i LSAM version 04.00.03, the PTF information and
resources are made available, by contractual relationship with SMA, via
automatic functions that can be managed from within the LSAM menu
system. This topic explains how to use those menu-based tools.

### LSAM PTF Strategy

Each PTF is accompanied by its own instruction documentation that may be
available in text format, stored in the LSAM database, and/or as a
stand-alone Adobe Acrobat Reader™ file (type .PDF). The PTF instructions
identify the changes being made to the software, including any required
special instructions that may vary from the standard procedures
identified in this topic. The instruction documentation may also include
a reference to LSAM online help updates, along with instructions about
how to obtain the updates. Sometimes a PTF requires that the LSAM
software be temporarily stopped and restarted, but some PTFs may be
applied while the LSAM remains active. The standard PTF application
tools on the LSAM menu will automatically handle the LSAM server job
stops and restarts, based on the profile record that controls each PTF.
The installation instructions may also include post-install instructions
that must be completed manually after applying a PTF, in which case the
list of PTFs will show a special indicator to call attention to this
requirement.

 

The strategy for updating the IBM i LSAM software includes a method for
updating program objects, and sometimes also a method for updating
database files. As a rule, PTFs will not be used for database updates.
Instead, database updates are better handled as part of an LSAM software
version upgrade. If there are database file changes, they will be made
in place in the SMADTA library (or the equivalent library in an
alternate LSAM environment). Program changes are made to the LSAM base
programs library, SMAPGM (or its equivalent). During the PTF application
process a save file of replaced objects is automatically created in
order to support the PTF rollback option. Some PTFs may not be eligible
for rollback, in which case the PTF control record will show this
special status and prevent the use of the rollback function.

 

  -------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [For versions of the IBM i (IBM i) LSAM prior to version 04.00.03, the library SMAPTF was used to install the replacement program objects delivered by PTFs. The new standard for LSAM software maintenance now only stores one copy of each program object, either in the SMAPGM library or in the SMAGPL utilities library (and/or the IBM i QGPL library, if that option was selected foo LSAM environment management tools). The PTF rollback feature makes it safe to replace the base version of the LSAM software. Now the SMAPTF library is used only to store the PTF rollback save files.]
  -------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

The control list for LSAM PTF application is maintained in LSAM database
files. The PTF level and individual PTF status of the LSAM environment
may be viewed from LSAM menu 9, option 1: Work with LSAM PTFs. The PTF
request, load, application and rollback functions can be controlled from
any of three locations:

-   List options or function keys from within the Work with LSAM PTFs
    function.
-   Individual options on LSAM menu 9.
-   Using LSAM commands from any command entry line or batch job where
    the LSAM environment library list has been established.

#### Auditing LSAM PTF Application

If it becomes necessary to audit the IBM i LSAM PTFs that are applied to
the system, in case of suspected corruption of the LSAM PTF control
database, each PTF is still represented by an application control data
area in the LSAM database. Use the following command to view a list of
the PTF control data areas in the SMADTA library (or its equivalent in
an alternate LSAM environment):

 

WRKOBJ OBJ(SMADTA/PTF\*) OBJTYPE(\*DTAARA)

 

Some PTF data areas will only be found in the SMAGPL library:

 

WRKOBJ OBJ(SMAGPL/PTF\*) OBJTYPE(\*DTAARA)

 

The LSAM PTF routines may create additional PTF control data areas in
the LSAM central utilities library, SMAGPL. These are used to avoid
unnecessary duplication of effort when there might be more than one LSAM
environment on a single system. They can also be used to help protect
the LSAM environment management data that resides in library SMAGPL.

 

From time to time, usually as major LSAM release upgrades are applied,
the PTF control data areas will be purged from the SMADTA and SMAGPL
libraries. But not all PTF control data areas that remain in the SMADTA
library necessarily apply to the current version of the LSAM. There
could be PTF data areas from prior releases. If this information is
important, SMA Support will explain the details during any problem
determination.

### How to Obtain and Apply PTFs

Based on many years of experience, SMA Technologies and its clients have adopted an
effective and simple \"fast path\" procedure for obtaining and
installing the IBM i Agent (LSAM) PTFs.

 

Clients of SMA Technologies are strongly recommended to refer to the latest available information about the LSAM
PTFs, which is available for download in one or more PDF documents,
stored alongside of the LSAM PTF save files in the SMA Technologies secure ftp server. New clients may
contact SMA Support for instructions and to obtain a user ID and
password for accessing the SMA Technologies secure ftp server.

#### How to Obtain the LSAM PTF Save Files

As of the date of this publication, the starting directory in the SMA Technologies secure ftp server for this Agent\'s
software patches and enhancements is called \"/IBMiLSAMptf\". Please
carefully note the sub-directories under this root location. It is
important to select the sub-directory that matches the Version of the
IBM i LSAM in use at the client site.

 

Right under the Version sub-directory, there is a \"Readme\" document
that lists all the available software fixes and enhancements for that
LSAM Version. This document may include important, sometimes CRITICAL
instructions that must be followed to effectively install the latest
PTFs.

 

There is also a PDF document that outlines the exact steps to perform
for this \"fast path\" PTF installation method. Please examine that PDF
document and do not rely solely on this documentation here, since that
PDF document may contain more recently published instructions. Those
instructions are more helpful than the following summary, which is
presented only for orientation purposes.

 

SMA Technologies reminds its clients that this entire process, including obtaining and applying PTFs, can be automated
using OpCon. This may be especially important for clients who are
operating many IBM i partitions. Please contact SMA Support, the
client\'s SMA Technologies Consultant, or the client\'s SMA Sales representative to request assistance with
configuring a fully-automated LSAM PTF distribution and installation
process.

#### How to Apply IBM i LSAM PTFs

SMA Technologies reminds its clients that the \"PTFs\" for the IBM i Agent of OpCon are not the same as the \"PTFs\"
issued by IBM for the IBM i operating system. Except by coincidence,
there is no direct relationship between the IBM i operating system PTFs
and the OpCon Agent (LSAM) PTFs. If an IBM i OS PTF might be critical
for correct operation of the LSAM, the LSAM PTF Readme document will
explain this requirement.

 

For orientation purposes, here is a summary of the \"fast path\" steps
to apply the LSAM PTFs.

1.  Use the LSAM sub-menu 9, option 7, to confirm or update the LSAM PTF
    Configuration. (Refer to the Screens and Windows segment of this
    documentation section for details about the LSAM PTF Configuration
    values.)

2.  Download the two LSAM PTF save files from the [SMA     Technologies]{.GeneralCompanyName} secure ftp server.
    a.  The base file names are LSCTLDTA (PTF control data) and LSCUMPTF
        (a collection of all the available PTF save files for each
        numbered PTF).
    b.  When an LSAM version matures, the LSCUMPTF save file will be
        divided into management segments, called \"partial PTF save
        files.\" There is a separate sub-sub-directory at the [SMA         Technologies]{.GeneralCompanyName} secure ftp server for these
        partial PTF save file, along with a PDF document of instructions
        that explains how to use these smaller collections.

3.  Choose option 2 from the LSAM sub-menu 9 to start the PTF
    installation process.
    a.  Option 2 from sub-menu 9 is the all-in-one PTF install option.
        There is usually no need to utilize any other LSAM PTF sub-menu
        option (except for option 7 that was completed in step 1,
        above).

    b.  The PTF Configuration options may be overridden using the first
        prompt screen that appears after option 2 is selected.

4.  If any errors occur during the execution of the LSAM PTF Install
    process, SMA Technologies strongly recommends     that clients immediately contact SMA Support for assistance, rather
    than trying to guess about how to recover from the error.

    a.  An incorrect response to a failure of the PTF Install process
        can create a big mess that is difficult to repair.
    b.  SMA Technologies will not charge         off-hours Support fees in case support is required for the
        failure of the LSAM PTF install process.

5.  Once the sub-menu option 2 is completed, [SMA     Technologies]{.GeneralCompanyName} recommends using LSAM sub-menu
    option 1 to review the updated LSAM PTF list.
    a.  Note the current, new PTF level and (if available) the LSAM
        Database level (which is critical for the LSAM data
        export/import tools).
    b.  It may be important to carefully examine the last few PTF
        records in the list, to make sure that all PTFs show an Applied
        status. If there appear to be any exceptions, please contact SMA
        Support for advice.

### Complete Details about Obtaining and Applying PTFs

The control list for LSAM PTF application is maintained in LSAM database
files. The PTF level and individual PTF status of the LSAM environment
may be viewed from **LSAM menu 9, option 1: Work with LSAM PTFs**. The
PTF request, load, application and rollback functions can be controlled
from any of three locations:

-   List options or function keys from within the Work with LSAM PTFs
    function.
-   Individual options on LSAM menu 9.
-   Using LSAM commands from any command entry line or batch job where
    the LSAM environment library list has been established, including in
    OpCon-scheduled jobs for IBM i.

The instructions below for obtaining and applying PTFs refer to the
individual menu options on LSAM menu 9. The corresponding options and
function keys that may be used to perform the same operations from
within the Work with LSAM PTFs function are clearly labeled. The
stand-alone commands that represent each menu option are show in the
menu option description line.

 

There is a single LSAM command (and menu function), SMAPTFINS, that can
be used to execute the entire PTF acquisition and application process
from a single request. This option becomes available as soon as the PTF
options and configuration have been completed from LSAM menu 9, option
7. SMA recommends using this command (and/or menu option 2 on the LSAM
sub-menu 9) as the best way to install, load and apply PTFs all in one
step. This comprehensive command includes each of the individual
procedures outlined below, so its command parameters may be understood
by studying the individual steps of PTF application that follow.

 

  -------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [When using the SMAPTFINS command, only user profile QSECOFR may perform this function because the PTF application steps may periodically require QSECOFR authority. In some cases, it might be acceptable for an LSAM Administrator with \*ALLOBJ authority to apply PTFs.]
  -------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

[Configure LSAM PTF options]{.ul} 
1.  To use the automatic on-line PTF request feature (FTP mode), obtain
    from SMA the following information:
    -   An SMA ftp server user profile name and password

    -   The IP address or URL currently used by SMA for its client ftp
        server

    -   The path name provided by SMA at its ftp server for IBM i LSAM
        PTFs, e.g,. \\IBMiLSAMptf
2.  Log on to an IBM i interactive workstation session as either QSECOFR
    or an LSAM Administrator with privileges to update LSAM PTF control
    file data.
3.  From a command line, enter **SMAGPL/STRSMA**. For more information
    on **STRSMA** command parameters, refer to [The STRSMA     Command](Components-and-Operation.md#The).
4.  Enter **9** to choose the **PTF and Security menu** in the LSAM Main
    Menu.
5.  Enter **7** to choose **PTF options configuration** in the PTF and
    Security Menu.
6.  \<**Tab**\> to the following fields and type data for each
    a.  In the **PTF source** field, type \"FTP\" to select the
        automatic PTF service provided by SMA. (This FTP option is only
        useful at sites where firewall rules allow the IBM i partition
        to access an outside connection to the internet. Or, it may be
        used when sites will import the PTF save files to a Windows or
        UNIX ftp server within the firewall of the site LAN.) Other
        options for this field are discussed in the next section of this
        document; [the IFS method is recommended for clients]{.ul}.     b.  In the **SMA ftp user** field, type the user profile name
        provided by SMA (or an alternate source) for its ftp server.
    c.  In the **Password** and the **Confirm Pwrd** fields, type the
        FTP server user profile\'s password that was provided by SMA (or
        an alternate ftp server provider).
    d.  In the **FTP URL or IP address** field, type the URL path or the
        IP address provided for communication with the ftp server.
    e.  In the **Source directory or path** field, type the path name
        provided by the ftp server source administrator for the location
        of IBM i LSAM PTF resources. (This field may also be used for a
        directory name when sources other than FTP have been selected.)
        The path name (Windows, Unix or IBM i IFS root directory format)
        must end with a forward slash (/), and most root directory
        servers also require that the path name begin with a forward
        slash (/).
    f.  Select one of the available options for the **PTF - LSAM server
        stop opt**. (Refer to the table of fields for the PTF
        configuration screen in the Screens and Windows section, below,
        for more information.)
    g.  Select one of the available options for the **PTF - Restart
        servers opt**.
    h.  Select \'Y\' = yes or \'N\' = no for the **PTF process default
        values** options: **Submit job?** and **Auto-load after
        request?**
        i.  Specifying \'Y\' = yes for the Submit job option is usually
            best for system performance. Use \'N\' = no for interactive
            processing only to perform process problem diagnostics.
        ii. The option for Auto-load after request should normally be
            set to \'Y\' = yes. The PTF data requested from the ftp
            server is not useful until it has been loaded into the LSAM
            database. The only reason for handling this separately is if
            the requested information will be redistributed to an
            intermediate staging site after it is downloaded. This might
            be necessary in a high security environment in order to move
            the PTF resources past a secured firewall.
    i.  When the Submit job? option is set to \'Y\' = yes, also supply
        values to define the submitted job attributes:
        i.  **Job description** and **Job description library** use
            SMALSAJ00 in SMADTA.
        ii. **Job queue** and **Job queue libr** (library); the job
            queue should be set to a queue and subsystem that will
            continue to operate even if the PTF application process
            needs to stop the LSAM subsystem, such as QBATCH.
7.  Press \<**Enter**\> to update the PTF configuration options.

[Request a List of Available PTFs]{.ul} 
1.  Log on to an IBM i interactive workstation session as either QSECOFR
    or an LSAM Administrator with privileges to update LSAM PTF control
    file data.
2.  In the command line, enter **SMAGPL/STRSMA**. For more information
    on **STRSMA** command parameters, refer to [The STRSMA     Command](Components-and-Operation.md#The).
3.  Enter **9** to choose the **PTF and Security menu** in the LSAM Main
    Menu.
4.  Enter **3** to choose **Request PTF information or save files**. The
    command SMAPTFREQ will be prompted in the PTF and Security Menu.
5.  On the SMAPTFREQ command prompt screen, \<**Tab**\> to the following
    fields and enter the following data:
    a.  In the **PTF request type** field, type ALLOBJ to request all
        list information and the cumulative collection of PTF save
        files. (Refer to the Screens and Windows section below for more
        information about other options).

    b.  For the ALLOBJ option, skip the **ONEPTF PTF name** field.

    c.  Usually it is appropriate to leave the field **LSAM environment
        name** set to \*CURRENT when the LSAM menu has been used to
        start the request function.

    d.  Leave the field **LSAM SMAGPL Utility Library** set to the value
        of \*DEFAULT. (Other values are supplied for SMA internal
        development tasks, or other special applications of this tool.)

    e.  The field **Submit job** would usually be left at the default
        value of asterisk (\*), meaning to use the PTF control file
        options (that were set in the previous procedure, above). The
        PTF process would typically complete faster and with less impact
        on system performance when performed as a batch job, rather than
        executed interactively.

    f.  Leave the **Automatic load after request** option set to
        asterisk (\*) to use the PTF control file option. Typically this
        should be set to \'Y\' = yes because the requested data is not
        useful from the LSAM menu system until it has been loaded.

    g.  The **PTF source access method** is left at the default value of
        asterisk (\*) which refers to the PTF control file option, set
        above to \'FTP\'. (Other request options are explained in the
        next section of this document.)

    h.  Both the **FTP IP Address** and the **path name** should have
        been set in the PTF options configuration, above.

    i.  Ignore the field **Override SAVF name of OPT**, since the access
        method will be FTP.
6.  Press \<**Enter**\> to complete the command prompting phase of the
    request process.
7.  The **PTF Request Parameters** confirmation screen appears. This
    screen is used to confirm that the correct options were selected
    from the PTF configuration file, whenever the SMAPTFREQ command has
    been used in an interactive job. (If this command is executed in a
    batch job, the confirmation screen is skipped and the existing PTF
    configuration values are assumed correct.) Type any changes if
    necessary, then press \<**Enter**\> to complete the process of
    submitting the PTF request procedure to a batch job.
8.  An LSAM normal completion message appears at the bottom of the LSAM
    menu display.
9.  Monitor for completion of the job SMAPTFREQ. One command that may be
    used to work with the submitted job (if authorized) is: **WRKSBMJOB
    \*JOB**
10. After the request and load process has been completed, use the LSAM
    menu 9, option 1: Work with LSAM PTFs to view the new PTF
    information that has been loaded into the LSAM database for this
    LSAM environment.

[Review PTF Status and Instructions]{.ul} 
Whenever one or more PTFs has been requested and loaded to the LSAM PTF
control database, the next step should be to examine the updated list of
unapplied PTFs for the following exceptional conditions:

-   PTFs that require LSAM down time for application

-   PTFs that include post-install instructions

1.  In the command line, enter **SMAGPL/STRSMA**. For more information
    on **STRSMA** command parameters, refer to [The STRSMA     Command](Components-and-Operation.md#The).
2.  Enter **9** to choose the PTF and Security menu in the LSAM Main
    Menu.
3.  Enter **1** to choose **Work with LSAM PTFs** in the PTF and
    Security Menu.
4.  Press \<**F15**\> to display the Subset PTF List window in the Work
    with LSAM PTFs list display.
5.  Type **1** in the **Select subset** field to limit the list to the
    un-applied PTFs only.
6.  Press \<**Enter**\> to continue.
7.  The **Work with LSAM PTFs** list reappears with a limited number of
    entries. If no entries appear, there are no new PTFs to be applied,
    and the process ends with this step.
8.  Review the list for any lines that show a \'1\' under the column
    **Dwn**. If there are any entries in this column, then the
    operations schedule must be planned to accommodate LSAM server down
    time before proceeding with the step to apply the PTFs.
9.  Review the list for any lines that show a \'1\' under the column
    **PIn**. If there are any entries in this column this means there
    are Post-Install Instructions that must be reviewed before the PTF
    application should be executed. Sometimes the \"post-install\"
    instructions could actually include some pre-install requirements.
    It might also be necessary to complete the post-install instruction
    of one PTF before attempting to apply any other PTFs. In this case,
    the cumulative PTF application procedure cannot be used and
    individual PTF application must be performed instead, at least until
    the restricted PTF is applied. (After that, all remaining PTFs could
    be applied by the cumulative PTF application procedure outlined
    below.)
10. When planning down time for LSAM PTF application, as experience is
    gained with the PTF application tools, it is feasible to create jobs
    in an OpCon/xps schedule that will assure all other work is
    completed or suspended until LSAM PTF application that requires down
    time is completed. The LSAM PTF application can be executed by an
    OpCon/xps job that calls the command SMAPTFCUM (or SMAPTFAPY) with
    appropriate parameters. By setting the PTF options so that the LSAM
    server operations are automatically restarted, the OpCon/xps
    schedule will be notified as soon as the LSAM link is restored that
    the PTF application job has completed normally. At that point,
    normal OpCon/xps schedule operations for the LSAM may resume.

[Apply Cumulative PTF (SMAPTFCUM)]{.ul} 
Whenever one or more PTFs has been requested and loaded to the LSAM PTF
control database, and the review of unapplied PTFs has been completed,
the normal procedure would be to apply all unapplied PTFs in a single
step (as long as the PTF Post-install instructions present no
obstacles). The individual PTF application process and the cumulative
PTF application process are essentially similar.

1.  Log on to an IBM i interactive workstation session as either QSECOFR
    or an LSAM Administrator with \*ALLOBJ authority. Normally, PTF
    application is considered to require QSECOFR authority because any
    aspect of the LSAM software may require updating, and some LSAM
    features involve the management of authority assigned to QSECOFR.
2.  In the command line, enter **SMAGPL/STRSMA**. For more information
    on **STRSMA** command parameters, refer to [The STRSMA     Command](Components-and-Operation.md#The).
3.  Enter **9** to choose the PTF and Security menu in the LSAM Main
    Menu.
4.  Enter **5** to choose **Apply cumulative PTF (SMAPTFCUM)** in the
    PTF and Security Menu.
5.  The IBM command prompt for the SMAPTFCUM command appears.
6.  In the SMAPTFCUM command prompt screen, if the current LSAM
    environment is not the default LSAM environment, change the
    **Environment name** to either \*CURRENT or to the actual LSAM
    environment name. (The value \*CURRENT cannot be used when the
    command SMAPTFCUM is executed in a batch job, unless the job\'s
    initial library list was set equal to the target LSAM environment
    library list.)
7.  Leave the parameter **LSAM General Purpose Library** set to the
    value \*DEFAULT. (This option is available mostly for SMA internal
    development and testing purposes.)
8.  Press \<**Enter**\> to continue.
9.  The PTF application process is performed automatically in the
    interactive job.
10. If requested, and the LSAM servers had to be suspended during the
    PTF application process, the LSAM servers are automatically
    restarted as soon as the PTF application process.
11. The cumulative PTF procedure completes by displaying a message on
    the workstation screen, \"Cumulative PTF application to LSAM:
    \<*LSAM_name*\> completed normally.\"

[Configuration for the \"IFS\" method of obtaining PTFs]{.ul} 
When site firewall rules prohibit the direct connection of the IBM i
partition to any outside server (by automatic means), change the PTF
Configuration options to use the IFS method. This method supports
manually storing the PTF save files (called LSCTLDTA and LSCUMPTF) into
any IFS root directory, as binary stream files (with no suffix on the
file name). Use a manual procedure, for example, to transfer the PTF
save files to this IFS directory, after they have been manually
downloaded from SMA\'s client ftp server. Follow these steps to
configure the LSAM PTF application tools for the IFS method:

1.  From LSAM sub-menu **9**, enter **7** to choose **PTF options
    configuration**.
2.  \<**Tab**\> to the following fields and type data for each:
    a.  In the **PTF source** field, type \"IFS\".
    b.  The **SMA ftp user** field, the **Password** and the **Confirm
        Pwrd** fields, and the **FTP URL or IP address** field, are not
        used by this method. They may be ignored.
    c.  In the **Source directory or path** field, type the path name of
        the IFS directory that was created for this specific purpose.
        For example, if the IFS root directory is used/allowed, the path
        name might be \'\\SMA\\IBMiLSAMptf\\\'. Note that the trailing
        slash character must be typed.
    d.  Press \<**Enter**\> to commit the changes to the LSAM Parameters
        control file.
3.  Using this method, there will not be any data communications or ftp
    messages displayed during the first steps of loading the PTF save
    files into the SMAGPL library.

## How the PTF Application Process Works

The IBM i LSAM PTF tools were designed to consolidate the entire process
of requesting and applying PTFs into a single procedure started by one
LSAM command from the LSAM menu system. However, as explained above
under How to obtain and apply PTFs, the best practice is to divide this
procedure into separate steps, accommodating the occasional post-install
process. In other words, it is usually best to request the PTF
information first and then evaluate the PTF control information before
committing to apply the PTFs to the LSAM environment.

### Information for LSAM Installers

When the IBM i LSAM is installed for the first time from distribution
media, there is normally no obstacle to installing all available PTFs in
a single cumulative PTF application process. As soon as the basic LSAM
installation is complete and the LSAM Parameters have been maintained,
it would then be acceptable to use one of the alternate PTF source
access methods to install all the currently available PTFs in a single
cumulative PTF application process without concern for post-install
instructions. Almost without exception, post-install instructions apply
to the process of upgrading live clients.

 

The PTF application process for installers begins with the selection of
the most appropriate method for installing the PTF raw resources into
the SMAGPL library. This method may vary, depending on the
circumstances. SMA may have available an LSAM patch CD that can be
inserted into an IBM Power Processor-based optical drive, and the PTF
installation process can be automated simply by setting the LSAM PTF
configuration options first, and then by executing the Master PTF
request, load and apply procedure from the LSAM menu.

 

It is often the case that a CD containing LSAM patch resources will be
inserted into the optical drive of a PC attached to the IBM i partition,
usually by means of IBM\'s System i Access software for Windows. In this
case, the procedure for copying LSAM PTF resources to the IBM i library
system might still be automated from the LSAM menu, or a manual
procedure could be used to copy the resources via an ftp connection to
the SMAGPL library.

 

Once the LSAM PTF resources are copied to the SMAGPL library, all that
remains are the two simple steps of loading the PTF information, and
then applying the cumulative PTFs all at once.

 

  -------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [SMA Installers should consult with the SMA TPM before conducting a product installation to review the latest available procedures that will be most appropriate for the circumstances of the installation.]
  -------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### Overview of PTF Management

The process of applying software improvements to SMA\'s IBM i LSAM
application is an automatically coordinated, cooperative effort
conducted by SMA technical personnel and authorized LSAM administrators
at client sites.

 

The process begins as SMA receives feedback from clients about its
software product. Both enhancement requests and problem reports have the
potential of being addressed by the agile, on-demand PTF process, rather
than being delayed by the software release development cycle.

 

SMA maintains client interaction forums at its internet sites and SMA
intends to advance the use of these forums as a medium for making LSAM
patch information available to clients using the IBM i LSAM. SMA also
maintains address lists of clients preferring to be notified by email
about the introduction of high priority LSAM fixes and/or useful LSAM
feature enhancements. Whether notified or not, clients may use the LSAM
menu functions at any convenient time to obtain the latest IBM i LSAM
PTF information directly from SMA ftp servers. Urgency for applying
available PTFs may arise either from a problem that is obstructing
normal operation of the software, or from the appropriateness of new
tools from SMA that can be used effectively by clients to improve the
automation and reliability of their computer operations.

 

Once SMA has made new PTF\'s available for the LSAM, the steps involved
in the automatic process for PTF application include:

1.  Initiate a request to download the PTF resources from SMA or an
    alternate source site, into staging files stored in the LSAM\'s
    SMAGPL utility library.
2.  Perform the PTF information load process, which extracts PTF
    resources from the downloaded format and interprets them into
    control information that can be viewed and utilized by the LSAM menu
    functions or equivalent commands.
3.  SMA recommends at this point in the process that the client evaluate
    all unapplied PTFs to determine if (a) any PTF requires LSAM down
    time during installation, or (b) any PTF includes post-install
    instructions that might prevent a fully automated cumulative PTF
    application process. If down time is required, prepare an
    operational plan to accommodate the down time when no LSAM job will
    be executing. The PTF application down time has always been very
    short, but in rare cases when a very large log file must be
    converted and its content preserved, the PTF application process
    could take much longer than usual, depending on the power available
    to the IBM i partition.
4.  Perform the PTF application process. Either single PTF application
    or a cumulative PTF application may be performed. Normally, the
    cumulative application process is recommended, but a case may arise
    where PTF post-install instructions could require a pause in the
    application sequence in order to complete some critical manual
    process for one PTF in the middle of the sequence. (This would be
    unusual. Most post-install processes, though still required, would
    not impede the process of apply later PTFs all at once.)

### PTF Dependencies and Rollbacks

SMA carefully analyzes and controls the order in which software patches
are issued. The LSAM PTF automation tools help to enforce critical
dependencies among PTFs. For example, if PTF \# 5 replaces the same
program that was previously replaced by PTF \# 3, then PTF \# 5 depends
on PTF \# 3. The dependency is assumed because most PTFs replace
multiple programs at once. Usually, the changes made in a batch of
programs are synchronized with each other. If a patched version of a
program is removed or replaced by the other programs from the same PTF
are not also updated in a coordinated fashion, an LSAM function is
likely to fail.

 

The LSAM PTF tools manage PTF dependencies by scanning the current PTF
control files to discover these dependencies whenever a request is made
to apply or to rollback a PTF. PTFs are usually applied in ascending
order of the PTF Sequence Number. If they are rolled back, this must
usually be done in reverse order of the PTF Sequence Number. The PTF
Name field may or may not appear to have a number embedded in it, and it
is possible that the name field will appear to be out of numeric order.
The PTF Sequence Number is used to control the critical order of
application. This allows ticket numbers from a support incident tracking
system, possibly used to name the PTF, to be managed out of sequence.

 

If PTFs are applied individually, the LSAM PTF tools will scan the
control database to make sure that all required PTFs have already been
applied. It is only possible to apply PTFs out of sequence if they have
no missing dependencies. If a prior PTF is required and not applied, the
tools will reject the application request with an error message that
lists up to 5 prior PTFs that are required.

 

Similarly, if a PTF must be rolled back (that is, unapplied, and the
prior version of programs restored), the PTF tools check for any higher
numbered PTFs that are still applied. If a PTF with a higher sequence
number is dependent upon the PTF to be rolled back, the rollback
operation will not be allowed and an error message will be displayed
listing up to 5 PTFs that would have to first be rolled back before the
target PTF can be rolled back.

 

The LSAM PTF tools permit an unlimited number of PTF rollbacks. However,
PTFs should not normally be rolled back except at the instruction of SMA
Support personnel. Although an error in LSAM processing may appear to
have first occurred after a PTF was just applied, there is no guarantee
that the PTF was the cause of the error. Therefore, the error should
first be analyzed before a decision is made to rollback a PTF. Usually,
if a PTF has been rolled back, it will be necessary for SMA to re-issue
a corrected version of the PTF before it can be reapplied. This will
rarely, if ever, occur. Should there be an exceptional circumstance
where a PTF must be replaced, SMA will provide instructions to document
the correct procedures for recovering the LSAM software to a reliable
state and for restoring normal operations of the LSAM.

### Multiple LSAM Environments and SMAGPL Libraries

The role of the SMAGPL library has been changed since early in the
evolution of the IBM i LSAM version 04.00.03. Originally, the SMAGPL
library was created to replace the use of the IBM i library QGPL, as a
location for LSAM high-level control commands and also as the storage
location for LSAM PTF control files.

 

IBM i LSAM standards dictated that the SMAGPL library would always be
used to store and manage the LSAM PTF control files and PTF-related
objects (except for the rollback save files that are stored in the
SMAPTF library). Only the high-level LSAM management commands (and some
of their related programs and files) could be relocated to QGPL,
according to the preferences of long-established clients who originally
configured their IBM i system utilization standards to rely on the IBM
QGPL library for this purpose.

 

As a replacement for the use of QGPL, the SMAGPL library was intended to
be shared by multiple LSAM environments (although most clients do not
need multiple LSAM environments within an IBM i partition); however, in
recent years it has been proven impractical to share a single SMAGPL
library with multiple LSAM environments. Now, the standard is that each
LSAM environment will be defined by its own, unique library list,
including a unique name for a dedicated copy of the SMAGPL library that
supports each LSAM environment.

 

+----------------------------------+----------------------------------+
| ![White \"X\" icon on red        | **WARNING:** Existing,           | | circular                         | long-established clients who     |
| background](../../../Reso        | chose to continue using the QGPL |
| urces/Images/warning-icon(48x48) | library of the IBM i operating   |
| .png "Warning icon") | system are still supported by    |
|                                  | the LSAM software, but only in a |
|                                  | limited way. That is, the LSAM   |
|                                  | PTF installation programs will   |
|                                  | still recognize this registered  |
|                                  | location of certain LSAM         |
|                                  | software objects, but the LSAM   |
|                                  | PTF programs cannot attempt to   |
|                                  | synchronize separate LSAM        |
|                                  | environments that now each have  |
|                                  | their own, dedicated copy of the |
|                                  | SMAGPL library.                  |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | Clients who install only one     |
|                                  | copy of the LSAM software per    |
|                                  | IBM i partition are generally    |
|                                  | not at risk. But clients who     |
|                                  | choose to continue locating LSAM |
|                                  | utility commands in the QGPL     |
|                                  | library do so at their own risk. |
|                                  | Such clients are advised to      |
|                                  | contact their [SMA               | |                                  | Te                               |
|                                  | chnologies]{.GeneralCompanyName} |
|                                  | Consultant or SMA Support to     |
|                                  | arrange for advice about         |
|                                  | converting their IBM i library   |
|                                  | utilization strategies.[         | |                                  | Existing, long-established       |
|                                  | clients who chose to continue    |
|                                  | using the QGPL library of the    |
|                                  | IBM i operating system are still |
|                                  | supported by the LSAM software,  |
|                                  | but only in a limited way. That  |
|                                  | is, the LSAM PTF installation    |
|                                  | programs will still recognize    |
|                                  | this registered location of      |
|                                  | certain LSAM software objects,   |
|                                  | but the LSAM PTF programs cannot |
|                                  | attempt to synchronize separate  |
|                                  | LSAM environments that now each  |
|                                  | have their own, dedicated copy   |
|                                  | of the SMAGPL                    |
|                                  | library.]            |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | [Clients who install only one    | |                                  | copy of the LSAM software per    |
|                                  | IBM i partition are generally    |
|                                  | not at risk. But clients who     |
|                                  | choose to continue locating LSAM |
|                                  | utility commands in the QGPL     |
|                                  | library do so at their own risk. |
|                                  | Such clients are advised to      |
|                                  | contact their [SMA               | |                                  | Te                               |
|                                  | chnologies]{.GeneralCompanyName} |
|                                  | Consultant or SMA Support to     |
|                                  | arrange for advice about         |
|                                  | converting their IBM i library   |
|                                  | utilization                      |
|                                  | strategies.]         |
+----------------------------------+----------------------------------+

#### Advice about Future Use of the QGPL Library

This advice applies to clients who need to install more than one copy of
the LSAM software into a single IBM i partition. This strategy can be
helpful for sites with limited IBM i resources that wish to configure a
test LSAM environment separate from a production copy of the LSAM
software.

 

Newer versions of the LSAM software do not accommodate the possibility
that any LSAM software objects may reside in QGPL and be shared by
multiple LSAM environments, when it comes to applying LSAM PTFs.
Therefore, any secondary LSAM environments that rely on LSAM command
objects located in the QGPL library instead of SMAGPL, are now subject
to the possibility of being out of synchronization with the LSAM PTF
levels of the separate LSAM environments. If library QGPL will be used,
then it becomes important to keep any secondary LSAM environments
synchronized. This defeats the purpose of having a test LSAM environment
for proving new LSAM PTFs, while the production LSAM environment remains
at a back level of PTFs. Thus, trying to use the QGPL library for LSAM
utilities can now become a source of software execution errors.

 

Clients using library QGPL to store LSAM software components are
encouraged to contact their SMA Technologies Consultant or SMA Support for advice about converting their library
utilization strategies. SMA Technologies can help the client to eliminate dependence upon the QGPL library. Separate
SMAGPL libraries should be used for each LSAM environment to fully
isolate different copies of the LSAM software that are patched to
different LSAM PTF levels.

### Options for PTF Distribution

The LSAM PTF acquisition process provides support for a variety of
different processing methods and sources. Regardless of the acquisition
process, the processes to load PTF control information and to apply PTFs
to an LSAM environment remain the same. So the only difference is in the
source location where raw PTF resources may be obtained and in the
access method that is appropriate for each source.

 

The different source access methods supported automatically by LSAM
menu-driven tools could also be supplemented by manual procedures.
However, manual procedures would require a thorough understanding of the
format and content of the PTF raw resources. This information can be
made available to IBM i LSAM clients who believe that none of the
automated acquisition procedures are appropriate for their site. SMA may
also equip its own installers with unique resources and special
procedures that would make their job easier.

 

However, the optimal goal is to take advantage of the automated tools
provided by SMA with the IBM i LSAM software. The PTF load and
application procedures are based on a predefined set of file resources
(LSAM database control file content and IBM i save files). Supporting
this strategy, the format of PTF raw resources used to distribute PTFs
to client sites is also standard. This means that the LSAM tools will
always know what to look for at a PTF source location, so the only
variations in procedure are:

-   Select one of the available source access methods.
-   Define the directory path that is appropriate for each access
    method.

Each of the PTF access methods supported by LSAM tools are described
below. A brief definition of the access method is provided, along with
guidance about how directory path names may be specified. Some of these
access methods require a user name and password, while others do not.
The LSAM PTF tools programs already include access logic that matches
the requirements of each source type.

 

The **PTF Source** is a 3-character code that may be entered in the
LSAM\'s PTF options configuration (LSAM menu 9, option 7) for consistent
use. The PTF Source may also be overridden by the LSAM menu options or
corresponding commands (SMAPTFREQ or SMAPTFINS) that drive the PTF
request process.

#### FTP: Downloading From an FTP Server

The methods used to obtain LSAM PTF raw resources from an ftp server are
described in detail above, under How to obtain and apply PTFs.

 

For client sites who do not allow the IBM i partition to connect
directly to an ftp server outside of the site\'s local area network, the
site may provide its own ftp server as the resource for LSAM PTFs. In
this case, the site administrators must use a manual procedure to obtain
the LSAM PTF raw resources from the SMA source ftp server and then
transfer those resources to a designated directory in the site\'s
internal ftp server.

 

When SMA announces PTFs for the IBM i LSAM version 04.00.03 and newer,
it will also publish reference information that can be used to identify
the PTF raw resources, so that the complete and correct set of PTF
resources can be installed into the internal ftp server directory.

#### OPT: Transferring From a System-attached Optical Drive (CD or DVD)

The optical drive (CD or DVD reader) connected to an IBM i partition may
be used as a source location for LSAM PTF raw resources. To use the
optical drive directly from the LSAM software, it is necessary to become
familiar with the procedures for putting a CD or DVD disk on-line to the
IBM i partition. Refer to the IBM IBM i Information Center for more
information about this topic. SMA uses save file names limited to 8
characters so that the full expected save file names will not be
distorted by the limitations of the optical drive access methods that
IBM i supports.

 

When SMA distributes LSAM PTF support on an optical disk it will also
furnish written information that describes the optical disk contents.
The directory structure used to support LSAM PTF raw resources may be
verified by different viewer tools available from IBM i. One method is
to use the WRKLNK command and specify the OBJ parameter value as
\'/QOPT\'. Type a \'5\' next to the QOPT directory name and press
\<**Enter**\> to navigate into the directory structure of the optical
disk. The directory names visible from the WRKLNK command should be the
same as the names assembled in the directory path string provided for
the LSAM PTF tools.

 

Once the optical directory path has been verified, the LSAM options
configuration, or the LSAM command parameter overrides, can be
configured to use the following options:

-   PTF Source: OPT
-   (The FTP URL or IP address is not used.)
-   Source directory or path: /\<*OPT_directory_path*\>/

For the directory path, the LSAM PTF request program inserts the string
\'/QOPT\' in front of the path name, so the entered path string must
start with a forward slash (/). The path must then include the name of
the optical drive directory path where the IBM i LSAM PTF raw resources
have been discovered, replacing the string \'\<*OPT_directory_path*\>\'
(do not keep the \< \> characters).

 

Notice that it is required to end the Source directory path string with
a forward slash (/).

#### IFS: Transferring From the IBM i Integrated File System

The Integrated FileSystem (IFS) is the disk space controlled by an IBM i
partition that exists outside of the integrated DB2 UDB database. Data
is stored in the IFS using a hierarchy of directories that resembles MS
Windows or UNIX or Linux disk organization, rather than in a single tier
of libraries such as used by the LSAM software.

 

This option for distributing IBM i LSAM PTFs might be appropriate within
a secured client network where the IBM i partitions are not allowed
direct access to ftp servers outside the network, and the site does not
have or use any other type of system to administer software support and
maintenance within the IBM i partition. The LSAM PTF raw resources could
be downloaded from the SMA ftp server using simple ftp file transfer to
a computer that is outside the client network. After the client is
satisfied that the downloaded files are safe, they could be manually
copied to a designated PTF source directory inside the IFS disk space of
the IBM i partition.

 

The IBM i administrator must create a designated directory within the
root (/) file system of the IFS where LSAM PTF raw resources will be
stored during the manual import process. Other IFS file systems could be
used, if that is the most appropriate configuration for the site, but if
that is the case, then the IFS special designator for the alternate file
system must be included in the PTF source path.

 

Once the IFS directory source has been created, the LSAM options
configuration, or the LSAM command parameter overrides, can be
configured to use the following options:

-   PTF Source: IFS
-   (The FTP URL or IP address is not used.)
-   Source directory or path: /\<*IFS_directory_path*\>/

For the directory path, the LSAM PTF request program does not insert any
information in front of the path name, so the path must start with a
forward slash (/). The path must then include the name of the designated
IFS directory path where the IBM i LSAM PTF raw resources have been
stored, replacing the string \'\<IFS_directory_path\>\' (do not keep the
\< \> characters).

 

Notice that it is required to end the Source directory path string with
a forward slash (/).

#### NTC: Downloading From a Network-attached Computer (PC)

NTC is the abbreviation used by the LSAM to represent IBM\'s iSeries™
NetServer™. With iSeries Netserver personal computers that run
Windows[®]{style="font-size: 80%;vertical-align: super;"} or Linux[®]{style="font-size: 80%;vertical-align: super;"} software can
seamlessly access data and printers that are managed by the IBM i
operating system. It is also possible for users and programs within IBM
i to access data stored on the personal computers.

 

  -------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [Sites that are not already using iSeries NetServer may not want to configure and use this class of IBM i services only for the purpose of the occasional LSAM PTF download. The NetServer services can impact overall system performance. If the decision is made to user NetServer only for this purpose, then consider ending the NetServer services once the PTF download process has been completed. This can be done, for example, from the System i Navigator.]
  -------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

This option for distributing IBM i LSAM PTFs might be appropriate within
a secured client network where the IBM i partitions are not allowed
direct access to ftp servers outside the network, and the site typically
uses a MS Windows or Linux PC to administer software support and
maintenance. The LSAM PTF raw resources could be downloaded from the SMA
ftp server using simple ftp file transfer to a computer that is outside
the client network. After the client is satisfied that the downloaded
files are safe, they could be manually copied to a designated PTF source
directory on the central maintenance source system that is inside the
network.

 

The client network administrator would provide the source workstation
(or server) name as it appears in the internal network, along with the
directory path within that workstation where the LSAM PTFs raw resources
are stored.

 

The IBM i administrator must configure the iSeries NetServer services
within the IBM i partition. Information about this process can be
obtained from IBM IBM i Information Center (for example, at URL:
http://publib.boulder.ibm.com/infocenter/iseries/v5r4/index.jsp ).
Before the LSAM PTF tools can be used, the PTF resource workstation name
must appear in the QNTC directory of the IBM i Integrated File System
(IFS). This can be verified using the System i Navigator by expanding
the File Systems line under the server ID (IP Address or name). Within
the File Systems, expand Integrated File System, then click on the
directory QNTC to see a list of the registered computer names.

 

The QNTC workstation connection can also be verified from an IBM i green
screen workstation using the command WRKLNK. In the OBJ parameter
specify \'/QNTC\'. From the display of the QNTC directory, type \'5\'
next to the directory name and press \<**Enter**\> to see a list of
registered workstation names.

 

Once the NetServer workstation configuration has been verified, the LSAM
options configuration, or the LSAM command parameter overrides, can be
configured to use the following options:

-   PTF Source: NTC
-   (The FTP URL or IP address is not used.)
-   Source directory or path:
    /\<*workstation_name*\>/\<*directory_path*\>/

For the directory path, the LSAM PTF request program inserts \'/QNTC\'
in front of the path name. The path must then include the name of the
NetServer workstation (replacing the string \'\<workstation_name\>\' -
do not keep the \< \> characters), followed by a forward slash (/) and
then the designated directory path at that workstation where the IBM i
LSAM PTF raw resources have been stored.

 

Notice that it is required to end the Source directory path string with
a forward slash (/).

## PTF Menu Screens and Windows

The LSAM menu 9: PTF and Security menu, option 8. Work with object
authority is described in LSAM Security and Object Authority.

### PTF and Security Menu

PTF and Security Menu

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------
   [SYSTEMNAME]{style="color: #008000;"}                  PTF AND SECURITY MENU                      [00/00/00]{style="color: #008000;"}    USERNAME                                                               00:00:00
   
    Select one of the following:
   
   
       1. [Work with LSAM PTFs]{style="color: #008000;"}        2. [Master PTF request, load and apply (SMAPTFINS)]{style="color: #008000;"}
       3. [Request PTF information or save files (SMAPTFREQ)]{style="color: #008000;"}        4. [Load PTF information or save files (SMAPTFLOD)]{style="color: #008000;"}
       5. [Apply cumulative PTF (SMAPTFCUM)]{style="color: #008000;"}        6. [Apply single PTF (SMAPTFAPY)]{style="color: #008000;"}
       7. [PTF options configuration]{style="color: #008000;"}        8. [Work with object authority]{style="color: #008000;"}
   
   
  Selection or command
   ===\> \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
  \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
   F3=Exit   F4=Prompt   F9=Retrieve   F12=Cancel
   F13=Information Assistant   F16=System main menu
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------

###### Menu Pathways

Main Menu \> PTF and Security menu (\#9)

###### Options

-   As listed on menu example, above.
-   The option 8. Work with object authority is described in LSAM
    Security and Object Authority.

###### Functions

-   **F3=Exit**: Returns to the master menu.
-   **F4=Prompt**: Prompts for keywords for any command entered in the
    Select or command line.
-   **F9=Retrieve**: Retrieves the previous command that was entered on
    the Select or the command line. If it is pressed multiple times, the
    system goes further and further back to previous commands.
-   **F12=Cancel**: Returns to the master menu.
-   **F13=Information Assistant**: Branches to the IBM i general help
    screen.
-   **F16=System main menu**: This is always shown on any
    system-generated menu screen. It branches to the general command
    entry menu for IBM i. Return to the previous menu by pressing
    \<**F3**\> or \<**F12**\>. This function is not commonly used and
    can be restricted for certain user profiles.

### PTF Options Configuration

-   **Screen Title**: PTF Process Defaults Configuration
-   **Screen ID**: LSAPTFD301

The PTF Options Configuration function must be reviewed and possibly
updated before attempting to use any of the other PTF functions in LSAM
Menu \# 9. The impact of the control values maintained by this function
is discussed above, among the operational guidance topics.

 

Special attention is called to the first data entry field on this
display: PTF Source. Although there are four different methods supported
for distributing and installing LSAM PTFs, most clients of SMA Technologies are using the \"IFS\" method because
it does not require penetration of firewalls protecting the IBM i
partition, and because this well-documented installation method is fast
and easy to use. However, sites that operate a large number of IBM i
partitions inside of a secured local network could take advantage of the
fully automated distribution and installation method that is supported
by the PTF source of \"FTP.\"

###### Menu Pathways

Main Menu \> PTF and Security menu (\#9) \> PTF options configuration
(\#7)

###### Fields

+---------------------------------+-----------------------------------+
| Field                           | Description                       |
+=================================+===================================+
| PTF Source                      | LSAM PTF installation files can   |
|                                 | be distributed and made available |
|                                 | to the IBM i partition in four    |
|                                 | different ways. SMA Technologies  |
|                                 | recommends using the IFS method.  |
|                                 | Refer to \"Options for PTF        |
|                                 | Distribution\" in this section    |
|                                 | for an explanation of the         |
|                                 | requirements for using any of     |
|                                 | these options.                    |
|                                 |                                   |
|                                 | -   FTP = LSAM PTF installation   |
|                                 |     save files can be downloaded  |
|                                 |     directly from an ftp server   |
|                                 |     operated by SMA Technologies, |
|                                 |     as a first step in a fully    |
|                                 |     automated solution for        |
|                                 |     obtaining and then installing |
|                                 |     the LSAM PTFs.                |
|                                 | -   OPT = On demand, SMA          |
|                                 |     Technologies can prepare an   |
|                                 |     optical disk that contains    |
|                                 |     the LSAM PTF save files. The  |
|                                 |     LSAM administrator would      |
|                                 |     insert the optical disk into  |
|                                 |     a drive that is attached to   |
|                                 |     the IBM i partition, before   |
|                                 |     starting the LSAM PTF         |
|                                 |     installation process.         |
|                                 | -   IFS = LSAM PTF installation   |
|                                 |     save files are manually       |
|                                 |     transferred by the LSAM       |
|                                 |     administrator to a directory  |
|                                 |     of the /root file system in   |
|                                 |     the IBM i partition\'s        |
|                                 |     Integrated File System (IFS), |
|                                 |     before starting the LSAM PTF  |
|                                 |     installation process.         |
|                                 | -   NTC = It is possible to       |
|                                 |     utilize the IBM i NetServer   |
|                                 |     service which enables a       |
|                                 |     connection between the IBM i  |
|                                 |     partition and directories     |
|                                 |     located on a Microsoft        |
|                                 |     Windows ™ server or personal  |
|                                 |     computer. For this method,    |
|                                 |     the LSAM PTF save files would |
|                                 |     first be transferred to a     |
|                                 |     designated MS Windows         |
|                                 |     location, and that location   |
|                                 |     would be entered into the     |
|                                 |     Source directory or path      |
|                                 |     field, before starting the    |
|                                 |     LSAM PTF installation         |
|                                 |     process.                      |
+---------------------------------+-----------------------------------+
| SMA ftp user                    | For the PTF source \"FTP\" enter  |
|                                 | the user ID required for the      |
|                                 | client to log into the SMA        |
|                                 | Technologies secure ftp server.   |
+---------------------------------+-----------------------------------+
| ftp password                    | For the PTF source \"FTP\" enter  |
|                                 | the password associated with the  |
|                                 | ftp user into this hidden data    |
|                                 | value field.                      |
+---------------------------------+-----------------------------------+
| Confirm pwrd                    | Type the same password value as   |
|                                 | in the field ftp password. This   |
|                                 | field confirms that the masked    |
|                                 | value typed into the ftp password |
|                                 | field is what the user believes   |
|                                 | was typed into the other field.   |
+---------------------------------+-----------------------------------+
| FTP URL or IP address           | For the PTF source \"FTP\" enter  |
|                                 | the URL or IP address of the [SMA | |                                 | T                                 |
|                                 | echnologies]{.GeneralCompanyName} |
|                                 | secured ftp server, or of a local |
|                                 | network ftp server. The LSAM      |
|                                 | software is distributed with the  |
|                                 | actual correct value for the [SMA | |                                 | T                                 |
|                                 | echnologies]{.GeneralCompanyName} |
|                                 | secured ftp server location;      |
|                                 | however, if the connection        |
|                                 | address does not work, please     |
|                                 | contact SMA Support to confirm if |
|                                 | the server address may have       |
|                                 | changed.                          |
+---------------------------------+-----------------------------------+
| Source directory or path        | Refer to the \"Options for PTF    |
|                                 | Distribution\" topic in this      |
|                                 | section for detailed instructions |
|                                 | about the form of the directory   |
|                                 | or path value that is required,   |
|                                 | depending on the method chosen    |
|                                 | for the PTF Source.               |
+---------------------------------+-----------------------------------+
| PTF -- LSAM server stop option  | Each PTF control record is marked |
|                                 | if it requires the LSAM server    |
|                                 | jobs to be suspended while        |
|                                 | programs and/or files are being   |
|                                 | replaced. Note that the LSAM stop |
|                                 | action will not be repeated for   |
|                                 | each PTF when a collection of     |
|                                 | cumulative PTFs is being          |
|                                 | installed at once, but the PTF    |
|                                 | installation program will leave   |
|                                 | the LSAM server job(s) stopped    |
|                                 | until the installation of all     |
|                                 | PTFs in the cumulative collection |
|                                 | is completed. If necessary, the   |
|                                 | PTF installation process will     |
|                                 | perform one of the following      |
|                                 | actions:                          |
|                                 |                                   |
|                                 | -   A = Stop all LSAM server jobs |
|                                 |     if any one server job is      |
|                                 |     required to be stopped.       |
|                                 | -   I = Stop only the server job  |
|                                 |     that is affected by each      |
|                                 |     individual PTF.               |
|                                 | -   F = Do not perform any        |
|                                 |     automatic stopping of the     |
|                                 |     LSAM server jobs, but stop    |
|                                 |     the PTF installation process  |
|                                 |     with a failure error message  |
|                                 |     if a PTF needs any LSAM       |
|                                 |     server job to be stopped.     |
+---------------------------------+-----------------------------------+
| PTF -- Restart servers option   | Whenever an individually          |
|                                 | installed PTF, or a cumulative    |
|                                 | collection of PTFS, has been      |
|                                 | successfully installed, the LSAM  |
|                                 | PTF installation program may      |
|                                 | automatically restart the LSAM    |
|                                 | server jobs. The automatic option |
|                                 | is useful for completing a fully  |
|                                 | automated LSAM PTF installation   |
|                                 | schedule; however, LSAM software  |
|                                 | developers might typically prefer |
|                                 | to prevent automatic restarting   |
|                                 | of the LSAM server jobs.          |
|                                 |                                   |
|                                 | -   A = Automatically restart all |
|                                 |     LSAM server jobs.             |
|                                 | -   M = LSAM server jobs will     |
|                                 |     only be restarted when        |
|                                 |     manually requested, using     |
|                                 |     either an LSAM menu option or |
|                                 |     the LSAM command:             |
|                                 |     SMAGPL/STRSMASYS              |
|                                 |     ENV(lsam-environment-name).   |
+---------------------------------+-----------------------------------+
| **PTF Process Default Values:** |                                   |
+---------------------------------+-----------------------------------+
| Submit job?                     | The LSAM PTF installation process |
|                                 | can be submitted as a batch job,  |
|                                 | which is usually more efficient   |
|                                 | and helps to prevent a            |
|                                 | performance impact on interactive |
|                                 | workstation system users. This    |
|                                 | control file option can be        |
|                                 | changed each time the LSAM PTF    |
|                                 | install process is started.       |
|                                 |                                   |
|                                 | -   Y = Yes, do submit the PTF    |
|                                 |     install process to a batch    |
|                                 |     job.                          |
|                                 | -   N = No, use the current       |
|                                 |     interactive job of the LSAM   |
|                                 |     administrator who has         |
|                                 |     requested the PTF             |
|                                 |     installation and execute the  |
|                                 |     task immediately within the   |
|                                 |     interactive workstation job.  |
|                                 |     (This interactive method is   |
|                                 |     sometimes preferred during    |
|                                 |     the first execution of PTF    |
|                                 |     installation just after an    |
|                                 |     LSAM has been installed, in   |
|                                 |     order to more quickly         |
|                                 |     discover the cause for any    |
|                                 |     error in the task, such as    |
|                                 |     incorrect job configuration   |
|                                 |     options.)                     |
+---------------------------------+-----------------------------------+
| Auto-load after request?        | The LSAM PTF installation process |
|                                 | can be executed step by step,     |
|                                 | using different LSAM menu         |
|                                 | options. In order to isolate PTF  |
|                                 | installation steps (usually only  |
|                                 | done as part of a problem         |
|                                 | diagnostic process), this option  |
|                                 | makes it possible to stop the PTF |
|                                 | install process immediately after |
|                                 | obtaining the LSAM PTF save       |
|                                 | files; however, in most cases     |
|                                 | this option should be left set to |
|                                 | Y = Yes.                          |
|                                 |                                   |
|                                 | -   Y = Yes, continue with        |
|                                 |     restoring and loading the     |
|                                 |     LSAM PTF control files after  |
|                                 |     the LSAM PTF save files have  |
|                                 |     been transferred to the local |
|                                 |     IBM i partition.              |
|                                 | -   N = No, stop the PTF Install  |
|                                 |     process after obtaining the   |
|                                 |     LSAM PTF save files, so that  |
|                                 |     problem diagnosis can be      |
|                                 |     performed before continuing   |
|                                 |     to restore and load the save  |
|                                 |     file content into the LSAM    |
|                                 |     database.                     |
+---------------------------------+-----------------------------------+
| Job description, Library        | When the LSAM PTF installation    |
|                                 | process will be submitted to a    |
|                                 | batch job, these control values   |
|                                 | make it easy to set up the batch  |
|                                 | job definition; however, these    |
|                                 | values can be changed each time   |
|                                 | the PTF Install process is        |
|                                 | started.                          |
|                                 |                                   |
|                                 |                                   |
|                                 |                                   |
|                                 | **Note**: The job description     |
|                                 | must include the correct initial  |
|                                 | library list that matches the     |
|                                 | current LSAM environment (usually |
|                                 | named SMADEFAULT). Be sure to     |
|                                 | change the library location of    |
|                                 | the job description if a          |
|                                 | non-default LSAM environment is   |
|                                 | being used.                       |
+---------------------------------+-----------------------------------+
| Job queue, Library              | When the LSAM PTF installation    |
|                                 | process will be submitted to a    |
|                                 | batch job, these control values   |
|                                 | make it easy to set up the batch  |
|                                 | job definition; however, these    |
|                                 | values can be changed each time   |
|                                 | the PTF Install process is        |
|                                 | started.                          |
|                                 |                                   |
|                                 |                                   |
|                                 |                                   |
|                                 | **Important Note**: Do not use    |
|                                 | the special value of \*JOBD for   |
|                                 | the job queue name, whenever the  |
|                                 | LSAM server job description       |
|                                 | (SMALSAJ00) is being used,        |
|                                 | because the LSAM server subsystem |
|                                 | will likely be suspended if any   |
|                                 | PTF requires that, and this would |
|                                 | cause the PTF installation job to |
|                                 | be ended abnormally. This is why  |
|                                 | the default values for the job    |
|                                 | queue are QGPL/QBATCH, although   |
|                                 | any IBM i subsystem that is       |
|                                 | appropriate for batch jobs can be |
|                                 | used (that is, a job queue that   |
|                                 | is connected to that subsystem    |
|                                 | can be used).                     |
+---------------------------------+-----------------------------------+

##### Functions

-   **F3=Exit**: Quits the list display and returns to the menu. Changes
    made to the values on display will not be applied to the control
    file.
-   **F12=Cancel**: Quits the list display and returns to the menu.
    Changes made to the values on display will not be applied to the
    control file.

### Work with LSAM PTFs

-   **Screen Title**: Work with LSAM PTFs
-   **Screen ID**: LSAPTFR1

The Work with LSAM PTFs function lists all the PTF information that has
been requested and loaded from the LSAM PTF source. In addition to the
available (unapplied) PTF control information, this list shows the
status of applied PTFs for the current LSAM environment. The PTF control
data is stored in the SMAGPL library.

###### Menu Pathways

Main Menu \> PTF and Security menu (\#9) \> Work with LSAM PTFs (\#1)

###### Fields

+--------------------+------------------------------------------------+
| Field              | Description                                    |
+====================+================================================+
| LSAM, SMAGPL, UTIL | At the top, left of the display appear three   |
|                    | fields that report the content of control data |
|                    | areas defining the LSAM environment:           |
|                    |                                                |
|                    | -   LSAM = the LSAM Name, known in OpCon as    |
|                    |     the Machine Name                           |
|                    | -   SMAGPL = the name of the DB2 library that  |
|                    |     contains the Agent\'s convenience          |
|                    |     utilities; usually SMAGPL (or its          |
|                    |     equivalent), some older sites had used     |
|                    |     QGPL to hold these LSAM tools              |
|                    | -   UTIL = the name of the SMAGPL library      |
|                    |     where the LSAM PTF tools are stored.       |
+--------------------+------------------------------------------------+
| PTF LVL            | There are three different patch levels listed  |
|                    | at the top, middle of the display, just under  |
|                    | the screen title:                              |
|                    |                                                |
|                    | -   LSAM PTF LVL: This is the critical PTF     |
|                    |     Level that must be reported by users to    |
|                    |     SMA Support, when requested. This is the   |
|                    |     master patch level of the overall Agent    |
|                    |     software.                                  |
|                    | -   DB PTF LVL: This is the database level.    |
|                    |     This level controls when two LSAM          |
|                    |     environments match for the purpose of      |
|                    |     exchanging data using the LSAM Data        |
|                    |     Export/Import tools. Multiple PTFs will be |
|                    |     assigned at the same DB LVL.               |
|                    | -   UTIL PTF LVL: This less-critical value is  |
|                    |     useful for SMA Technical Support. It shows |
|                    |     which Agent software patches were applied  |
|                    |     affecting the content of the SMAGPL and    |
|                    |     UTIL libraries (explained in the Field row |
|                    |     just above).                               |
+--------------------+------------------------------------------------+
| SMAGPL             | The name of the actual library used to store   |
|                    | the LSAM environment management utilities.     |
|                    | This may be the same as the utility library    |
|                    | (SMAGPL), or it may be the IBM i QGPL library. |
+--------------------+------------------------------------------------+
| Subset             | Shows the current subset rule in effect. Us    |
|                    | function key \<**F15**\> to change the subset  |
|                    | rule that controls the list content on         |
|                    | display.                                       |
+--------------------+------------------------------------------------+
| Search content     | Type in a value that will be used to search    |
|                    | the entire content of every record on the      |
|                    | display (limited only by the current subset    |
|                    | rule). Even data that does not appear in the   |
|                    | list display is searched. Use option 5=Display |
|                    | to see all the details for a record discovered |
|                    | by the search. Function key \<**F16**\> can be |
|                    | used to continue a search after the first      |
|                    | record is found.                               |
+--------------------+------------------------------------------------+
| Opt                | Type one of the options listed at the top of   |
|                    | the display to act on an individual record in  |
|                    | the list. More than one option may be typed at |
|                    | once before the \<**Enter**\> key is pressed   |
|                    | to initiate the option actions.                |
+--------------------+------------------------------------------------+
| PTF Name           | The name of the PTF. This name is a key value  |
|                    | used for identification purposes only. It is   |
|                    | the name that will appear in the PTF Level     |
|                    | field for the LSAM Environment (and/or the     |
|                    | SMAGPL utility library).                       |
+--------------------+------------------------------------------------+
| Seq Nbr            | The application order sequence number assigned |
|                    | to the PTF. This number controls the critical  |
|                    | order of application for PTFs and it helps     |
|                    | determine PTF dependencies.                    |
+--------------------+------------------------------------------------+
| PTF-lvl-DB         | Two list columns show the LSAM PTF Level and   |
|                    | the Database Level that is assigned to each    |
|                    | PTF in the list. The PTF Level is the critical |
|                    | level for indicating the overall patch level   |
|                    | of the software, but it is separate from the   |
|                    | PTF Name and the Sequence Number, where the    |
|                    | Sequence Number is used to control the order   |
|                    | in which patches are automatically applied.    |
+--------------------+------------------------------------------------+
| Sts                | The current status of the PTF is shown:        |
|                    |                                                |
|                    | -   blank = not applied                        |
|                    | -   A = applied (or re-applied - refer to PTF  |
|                    |     details)                                   |
|                    | -   R = rolled back                            |
+--------------------+------------------------------------------------+
| Dwn                | Down: This column shows a value of \'1\' if    |
|                    | the PTF is marked as requiring that any of the |
|                    | LSAM server jobs must be stopped while the PTF |
|                    | is applied. Be sure to plan carefully for LSAM |
|                    | down time before attempting to apply a PTF     |
|                    | that requires down time.                       |
+--------------------+------------------------------------------------+
| PIn                | Post-Install instructions are included with    |
|                    | this PTF. Use option 8 to display the text of  |
|                    | the post-install instructions. Be sure to      |
|                    | carefully evaluate all PTFs marked with        |
|                    | post-install instructions before planning      |
|                    | their installation. It is possible that        |
|                    | certain PTFs require special attention and     |
|                    | cannot simply be applied as part of a          |
|                    | cumulative PTF application to a live LSAM      |
|                    | environment.                                   |
+--------------------+------------------------------------------------+
| Doc                | Documentation changes have been published in   |
|                    | coordination with this PTF. Consult the PTF    |
|                    | instructions for information about how to      |
|                    | obtain the documentation updates. Usually,     |
|                    | documentation updates are made available in    |
|                    | online help; sometimes the **IBM i LSAM**      |
|                    | online help is republished at a newer point    |
|                    | version to include a substantial online help   |
|                    | enhancement.                                   |
+--------------------+------------------------------------------------+
| Description        | A short description of the PTF is provided for |
|                    | this list display. The short description       |
|                    | information may or may not include a special   |
|                    | warning about the PTF. Use option 5=Display to |
|                    | see the long description of the PTF, in order  |
|                    | to learn more about the changes that the PTF   |
|                    | will make to the LSAM software, such as the    |
|                    | key problem that a PTF may solve.              |
+--------------------+------------------------------------------------+

:  

###### Options

-   **4=Rollback**: Selects a PTF for rollback. When \<**Enter**\> is
    pressed, the LSAM PTF rollback command (SMAPTFRBK) prompt screen
    will appear, requesting additional information or verification of
    the rollback parameters. This option is the same as using the LSAM
    menu PTF rollback function.
-   **5=Display**: Select a PTF record to view the full detailed profile
    of the PTF, including the long description. (Use option 7=Details to
    see a list of objects included in the PTF.)
-   **6=Apply**: Selects a PTF for application. When \<**Enter**\> is
    pressed, the LSAM single PTF application command (SMAPTFAPY) prompt
    screen will appear, requesting additional information or
    verification of the application parameters. This option is the same
    as using the LSAM menu single PTF application function.
-   **7=Details**: Select a PTF to view a list of the LSAM software
    objects affected by this PTF.
-   **8=Instr**: If a PTF shows a \'1\' in the PIn column, option 8 may
    be used to view the PTF source file member that contains the
    post-install instructions text.

###### Functions

-   **F3=Exit**: Quits the list display and returns to the menu. Any
    options already completed will still apply.
-   **F5=Refresh**: Reload the display from the database file, clearing
    any pending options that were previously entered but not executed.
    This function key also resets any search rule that is in effect, but
    it does not reset the current subset rule.
-   **F9=Print**: Print a report that shows all the PTFs currently
    selected by the subset rule that is in effect.
-   **F11=Sort Seq\#/Name**: Use this function key to toggle between
    sorting the list by PTF Name, or by PTF Sequence Number. The heading
    line on the list uses a pink color to show which sort option is
    currently in effect.
-   **F12=Cancel**: Quit the list display return to the menu without
    executing any remaining options that may have been entered. Options
    previously executed will still apply.
-   **F15=Subset**: Change the current list subset rule, or clear
    subsetting to show all records. The current subset rule that is in
    effect is shown in the Subset field at the top, left of the list
    display. Refer to window description, below.
-   **F16=Search next**: This function key or the \<**Enter**\> key may
    be used to start a search when a value has been entered in the
    Search content field, but only \<**F16**\> may be used to continue
    the search on to the next matching record after the first match has
    been found.
-   **F17=Top**: Move the list display to the first record in the list.
-   **F18=Bottom**: Move the list display to the last record in the
    list.
-   **F21=Post inst**: Show a list of all available post-install
    instruction source members. NOTE: The IBM i SEU function is used to
    show the list of data members in the LSAM source physical file where
    post-install instructions are store, one member for each affected
    PTF Name. This SEU function appears to allow option 2=Edit to change
    the source members, and while clients may wish to use this access to
    add their own critical notes, SMA does not recommend changing the
    distributed instructions. SMA cannot be responsible for damage to
    the software or LSAM database that may result from altering the
    instructions.
-   **F24=More keys**: Press this function key to toggle between lists
    of available function keys. All available function keys may be used,
    even when not shown.

#### F15=Subset PTF List Window

-   **Screen Title**: Subset PTF List
-   **Screen ID**: LSAPTFW1

Use the function F15=Subset to limit the records appearing in the list
of LSAM PTFs.

###### Menu Pathways

Main Menu \> PTF and Security menu (\#9) \> Work with LSAM PTFs (\#1) \>
F15=Subset

###### Fields

  Field                  Default        Description
  --------------- --------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Select subset    current subset rule  Type a number from the list of options in the window to select the subset rule. Option 9 (show all) is used to clear subset rules and show a list of all the LSAM PTFs.

  :  

###### Functions

[F12=Cancel]{style="font-weight: bold;"}: Quits the subset window and return to the list display without changing the subset rule.

### Display LSAM PTF Control

-   **Screen Title**: LSAM PTF Control
-   **Screen ID**: LSAPTFR2

###### Menu Pathways

Main Menu \> PTF and Security menu (\#9) \> Work with object authority
(\#8)

###### Fields

+-------------------+-------------------------------------------------+
| Field             | Description                                     |
+===================+=================================================+
| LSAM environment  | The name of the current LSAM environment;       |
|                   | governs the content of the list display.        |
+-------------------+-------------------------------------------------+
| LSAM PTF LVL      | This is the master PTF Level control number     |
|                   | assigned to this PTF. Each PTF has a unique PTF |
|                   | Level assigned to it. This information is       |
|                   | global for the LSAM and not specific to the one |
|                   | PTF on display.                                 |
+-------------------+-------------------------------------------------+
| DB LVL            | This is the database level that is assigned to  |
|                   | this PTF. Many PTFs may be applied at the same  |
|                   | database level. The DB LVL governs the LSAM     |
|                   | Data Export/Import tools, controlling when two  |
|                   | LSAM environments are matched and may exchange  |
|                   | data. This information is global for the LSAM   |
|                   | and not specific to the one PTF on display.     |
+-------------------+-------------------------------------------------+
| SMAGPL/UTIL libs  | The third line of headings on this display      |
|                   | format starts with the names of the two         |
|                   | libraries that are used for the SMAGPL and UTIL |
|                   | purposes (as described in the Work with PTF     |
|                   | list display). These two logical locations are  |
|                   | usually assigned to the same library name. This |
|                   | information is global for the LSAM and not      |
|                   | specific to the one PTF on display.             |
+-------------------+-------------------------------------------------+
| SMAGPL/UTIL LVL   | This is the highest PTF Level that was last     |
|                   | applied to the SMAGPL and UTIL library          |
|                   | location(s). The SMAGPL/UTIL PTF level may be   |
|                   | helpful to SMA Technical Support personnel.     |
|                   | This information is global for the LSAM and not |
|                   | specific to the one PTF on display.             |
+-------------------+-------------------------------------------------+
| PTF Name / Seq \# | The identifying name of the PTF, followed by    |
|                   | the PTF sequence number that controls the       |
|                   | critical order of PTF application.              |
+-------------------+-------------------------------------------------+
| Issue date, time  | The date and time assigned to the PTF as it was |
|                   | issued. This information could be critical if   |
|                   | it ever becomes necessary for SMA to replace a  |
|                   | faulty PTF.                                     |
+-------------------+-------------------------------------------------+
| LSAM PTF level    | The LSAM version to which the PTF applies,      |
|                   | e.g., 04.00.03. A PTF must match the current    |
|                   | LSAM version in order to be eligible for        |
|                   | application. The PTF list program filters and   |
|                   | includes only PTFs that match the current       |
|                   | version of the LSAM.                            |
+-------------------+-------------------------------------------------+
| PTF apply pgm     | The name of a custom program provided by SMA to |
|                   | apply the PTF. If not blank, this program will  |
|                   | be used in place of the standard PTF            |
|                   | application routines that would normally apply  |
|                   | at PTF.                                         |
+-------------------+-------------------------------------------------+
| PTF priority      | NOT USED. SMA may use this field in the future  |
|                   | to help control the priority of critical versus |
|                   | non-critical PTFs.                              |
+-------------------+-------------------------------------------------+
| Keywords 1, 2, 3  | NOT USED. SMA may add information to these      |
|                   | fields to enhance the search capability         |
|                   | available on the list display. Keywords are     |
|                   | useful for identifying PTFs that apply to a     |
|                   | particular LSAM feature or to an easily         |
|                   | recognized error message ID.                    |
+-------------------+-------------------------------------------------+
| PTF save file     | The name of the save file used by SMA to        |
|                   | deliver the PTF replacement objects. The save   |
|                   | file names are normally limited to 8 characters |
|                   | so that they can be easily viewed, recognized   |
|                   | and automatically retrieved from optical media  |
|                   | (CD or DVD).                                    |
+-------------------+-------------------------------------------------+
| Rollback SAVF     | The name of the rollback save file that was     |
|                   | automatically generated by the LSAM PTF         |
|                   | application tool, used to store the old         |
|                   | versions of objects that were replaced by the   |
|                   | PTF. The rollback process uses this save file,  |
|                   | stored in the SMAPTF (or equivalent) library,   |
|                   | during the rollback process. (If a PTF is       |
|                   | re-applied, a secondary rollback save file is   |
|                   | generated, to preserve an accurate record of    |
|                   | system history. However, the original rollback  |
|                   | save file will always be used for a subsequent  |
|                   | repeated rollback procedure. SMA Support        |
|                   | personnel must assist if there is every a       |
|                   | reason to force the secondary rollback file to  |
|                   | be used instead of the original rollback file.) |
+-------------------+-------------------------------------------------+
| Updt GPL/UTL/LSA  | -   These three indicators are each set to a    |
|                   |     value of \'1\' to indicate when a PTF will  |
|                   |     affect:                                     |
|                   |     -   GPL = The SMAGPL library objects for    |
|                   |         LSAM environment control, may be the    |
|                   |         IBM i QGPL library.                     |
|                   |     -   UTL = The LSAM utility library, always  |
|                   |         SMAGPL unless an override name was      |
|                   |         specified at installation.              |
|                   |     -   LSA = The PTF affects the LSAM database |
|                   |         or program objects libraries.           |
|                   | -   PTF procedures automatically adapt in cases |
|                   |     where a PTF affects only the GPL and/or UTL |
|                   |     libraries, and not the LSAM libraries.      |
+-------------------+-------------------------------------------------+
| Post-Inst/DocRev  | These indicators are set to a value of \'1\'    |
|                   | if:                                             |
|                   |                                                 |
|                   | -   The PTF includes post-install procedures    |
|                   |     that must be viewed.                        |
|                   | -   The PTF is associated with an update to the |
|                   |     LSAM online help.                           |
+-------------------+-------------------------------------------------+
| Applied status    | The applied status fields indicate the          |
|                   | following:                                      |
|                   |                                                 |
|                   | -   Current status: blank=not applied,          |
|                   |     A=applied, R=rolled back.                   |
|                   | -   Ever applied: If \'1\', the last applied    |
|                   |     date shows below this flag.                 |
|                   | -   RBK eligible: If not set to \'1\', a PTF    |
|                   |     may not be rolled back. This may imply that |
|                   |     any previous PTFs with dependencies on this |
|                   |     PTF may also not be rolled back. In an      |
|                   |     emergency, SMA Support assistance would be  |
|                   |     required to repair LSAM software if it      |
|                   |     appears that a not-eligible PTF has caused  |
|                   |     and problem. However, since the PTF is not  |
|                   |     eligible for rollback, the fix for any      |
|                   |     problem would normally be another PTF to    |
|                   |     fix the bad PTF.                            |
|                   | -   Ever rollback: If this field is set to      |
|                   |     \'1\', a last rollback date will appear     |
|                   |     below the flag. If a re-applied PTF must be |
|                   |     rolled back a second time, the setting of   |
|                   |     this flag at \'1\' would signal that a      |
|                   |     secondary rollback save file will be        |
|                   |     created.                                    |
+-------------------+-------------------------------------------------+
| Down indicators   | -   These indicators help control the LSAM PTF  |
|                   |     tool automatic functions that stop and      |
|                   |     restart the various sub-groups of LSAM      |
|                   |     server jobs. The server jobs are arranged   |
|                   |     by groups so that, for example, it may not  |
|                   |     be necessary to stop job scheduling if only |
|                   |     the SMAFT server is affected.               |
|                   | -   The \"Any function\" flag is an overall     |
|                   |     indicator that also shows on the list of    |
|                   |     PTFs. This flag will be set to \'1\' if any |
|                   |     of the other LSAM server sub-group flags    |
|                   |     are set to \'1\'. If any PTF down time is   |
|                   |     required, an analysis of these detailed     |
|                   |     flags will help the site determine the      |
|                   |     impact and planning of the required down    |
|                   |     time.                                       |
+-------------------+-------------------------------------------------+
| Record date/time  | An SMA internal field that shows when the PTF   |
|                   | control record was last maintained.             |
+-------------------+-------------------------------------------------+
| Prim key          | The primary key field of the PTF control        |
|                   | record. This information is only for use by     |
|                   | technical support personnel.                    |
+-------------------+-------------------------------------------------+
| LSAM application  | NOT USED. SMA may assign an LSAM feature name   |
|                   | to a PTF in order to help identify which aspect |
|                   | of the LSAM software is affected by the PTF.    |
|                   | This information could be useful because it     |
|                   | would be found using the Search content         |
|                   | function on the PTF list display.               |
+-------------------+-------------------------------------------------+
| Environ           | The name of the LSAM environment that this PTF  |
|                   | control record is assigned to. Unapplied PTFs   |
|                   | will always show a value of \"SMAGPL\" in this  |
|                   | field; applied PTFs will show the name of the   |
|                   | current LSAM in this field.                     |
+-------------------+-------------------------------------------------+
| PTF short desc    | The short description of a PTF that appears on  |
|                   | the PTF List display. SMA uses this field to    |
|                   | highlight critical information about a PTF.     |
+-------------------+-------------------------------------------------+
| PTF long desc     | A longer description of the PTF that helps      |
|                   | understand what problem is fixed or what        |
|                   | enhancement is offered by a PTF.                |
+-------------------+-------------------------------------------------+

:  

###### Functions

-   **F3=Exit**: Quits the PTF control record display and returns to the
    menu.
-   **F6=(Re-)Apply**: If a PTF is at an eligible status, this function
    key is the same as option 6=Apply on the list display. After a
    dependency check, a prompt screen will appear for the command
    SMAAPYPTF.
-   **F7=Details**: Branches to a display of all the objects affected by
    this PTF.
-   **F11=Rollback PTF**: If a PTF is at an eligible status, this
    function key is the same as option 4=rollback on the PTF list
    display. After a dependency check, a prompt screen will appear for
    the command SMAPTFRBK.
-   **F12=Cancel**: Return to the PTF list display.
-   **F21=Post inst**: If the PTF is marked as having post-install
    instructions, this function key appears and supports a branch to the
    IBM i SEU utility display of the text of the post-install
    instructions source member.
-   **F22=Find conflicts**: This function key may be used to discover
    any PTFs that would conflict with the current PTF\'s next possible
    operation. If a PTF is unapplied or rolled back, the conflicts would
    be for any prior PTFs that are required. If a PTF is applied, then
    the conflicts would be for any future PTF already applied that would
    prevent a rollback.
-   **F24=More keys**: Toggle the function key legend to show other
    supported function keys.

### Option 7/Function Key7=Details

-   **Screen Title**: Details List for PTF ptfname
-   **Screen ID**: LSAPTFR3

The list of all objects affected by a PTF supports an important option
that will list all PTFs affecting the object selected with option 9. The
list shown for option 9 is the same as the primary list of PTFs, except
that the title line indicates it is a list of PTFs for just one object.

###### Menu Pathways

-   Main Menu \> PTF and Security menu (\#9) \> Work with LSAM PTFs
    (\#1) \> option 7=Details
-   Main Menu \> PTF and Security menu (\#9) \> Work with LSAM PTFs
    (\#1) \> option 5=Display \> F7=Details

###### Fields

+------------------+--------------------------------------------------+
| Field            | Description                                      |
+==================+==================================================+
| LSAM,Ver,PTF LVL | The LSAM environment name is shown, followed by  |
|                  | the LSAM version installed in this environment   |
|                  | and the current PTF level (which is either the   |
|                  | latest PTF name applied, or the latest PTF that  |
|                  | was rolled back).                                |
+------------------+--------------------------------------------------+
| UTIL,Ver,PTF LVL | The actual name of the SMAGPL library or its     |
|                  | replacement is shown, followed by the LSAM       |
|                  | version installed in this utility library        |
|                  | (should be the same as the LSAM version) and the |
|                  | current PTF level (which is either the latest    |
|                  | PTF name applied, or the latest PTF that was     |
|                  | rolled back) that was applied to the SMAGPL      |
|                  | library.                                         |
+------------------+--------------------------------------------------+
| SMAGPL           | The name of the actual library used to store the |
|                  | LSAM environment management utilities. This may  |
|                  | be the same as the utility library (SMAGPL), or  |
|                  | it may be the IBM i QGPL library.                |
+------------------+--------------------------------------------------+
| Subset           | Shows the current subset rule in effect. Us      |
|                  | function key \<**F15**\> to change the subset    |
|                  | rule that controls the list content on display.  |
+------------------+--------------------------------------------------+
| Search content   | Type in a value that will be used to search the  |
|                  | entire content of every record on the display    |
|                  | (limited only by the current subset rule). Even  |
|                  | data that does not appear in the list display is |
|                  | searched. Use option 5=Display to see all the    |
|                  | details for a record discovered by the search.   |
|                  | Function key \<**F16**\> can be used to continue |
|                  | a search after the first record is found.        |
+------------------+--------------------------------------------------+
| Last search      | Shows the search argument that is current in     |
|                  | effect. F16=Search next can be used to find the  |
|                  | next record matching this search argument, after |
|                  | the first match is found, as long as a value is  |
|                  | show for this field.                             |
+------------------+--------------------------------------------------+
| Opt              | Type an available option number and press        |
|                  | \<**Enter**\> to execute the option.             |
+------------------+--------------------------------------------------+
| Object           | The name of the LSAM program, file or other      |
|                  | object.                                          |
+------------------+--------------------------------------------------+
| Library/Path     | The base product library name where this object  |
|                  | is located after installation. Base names such   |
|                  | as SMADTA for the LSAM database library will be  |
|                  | replaced by the actual database library name in  |
|                  | alternate LSAM environments.                     |
+------------------+--------------------------------------------------+
| Loc              | -   DB2 = integrated IBM i DB2 UDB database      |
|                  | -   IFS = Integrated File System                 |
+------------------+--------------------------------------------------+
| Type             | The IBM i mnemonic for the object type, such as  |
|                  | \*PGM or \*FILE.                                 |
+------------------+--------------------------------------------------+
| Attribute        | The IBM i mnemonic for the object sub-type, such |
|                  | as CLLE or RPGLE for type \*PGM.                 |
+------------------+--------------------------------------------------+
| Case ID          | The SMA support incident tracking number or      |
|                  | enhancement project ID.                          |
+------------------+--------------------------------------------------+

:  

###### Options

-   **5=Display**: Show a detailed definition of the PTF control
    information for the selected object.
-   **9=All PTFs**: Displays a list of all objects affected by a PTF.
    The list shown for option 9 is the same as the primary list of PTFs,
    documented above, except that the title line indicates it is a list
    of PTFs for just one object.

###### Functions

-   **F3=Exit**: Quits the list display and returns to the menu. Any
    options already completed will still apply.
-   **F5=Refresh**: Reload the display from the database file, clearing
    any pending options that were previously entered but not executed.
    This function key also resets any search rule that is in effect, but
    it does not reset the current subset rule.
-   **F9=Print**: Print the list of all objects affected by the selected
    PTF.
-   **F12=Cancel**: Quit the objects list display return to the LSAM
    PTFs list display without executing any remaining options that may
    have been entered. Options previously executed will still apply.
-   **F16=Search next**: This function key or the \<**Enter**\> key may
    be used to start a search when a value has been entered in the
    Search content field, but only \<**F16**\> may be used to continue
    the search on to the next matching record after the first match has
    been found.
-   **F17=Top**: Move the list display to the first record in the list.
-   **F18=Bottom**: Move the list display to the last record in the
    list.

#### Display PTF Object Details

-   **Screen Title**: Detail Record for PTF OOOOOOOOOO
-   **Screen ID**: LSAPTFR4

The detail screen for a PTF object supports convenient branching
function keys. F20-Show all PTFs for Obj is the same as option 9=All
PTFs from the object list display.

###### Menu Pathways

Main Menu \> PTF and Security menu (\#9) \> Work with object authority
(\#8) \> option 7=commands \> option 2=Change **- or -** option 3=Copy
**- or -** F6=Add

###### Fields

+----------------------------+----------------------------------------+
| Field                      | Description                            |
+============================+========================================+
| Detail Record for PTF      | The name of the PTF controlling the    |
|                            | object in this details display.        |
+----------------------------+----------------------------------------+
| LSAM environment           | The name of the current LSAM           |
|                            | environment.                           |
+----------------------------+----------------------------------------+
| Version, PTF LVL           | Under the LSAM environment name, shows |
|                            | the LSAM software version of the       |
|                            | current environment, followed by the   |
|                            | name of the latest PTF applied.        |
+----------------------------+----------------------------------------+
| SMAUTL, PTF LVL            | Shows the name of the LSAM utility     |
|                            | environment that supports this LSAM    |
|                            | environment, normally library SMAGPL,  |
|                            | and the latest PTF level applied to    |
|                            | that library.                          |
+----------------------------+----------------------------------------+
| SMAGPL                     | The name of the actual library used to |
|                            | store the LSAM environment management  |
|                            | utilities. This may be assigned to the |
|                            | IBM i QGPL library.                    |
+----------------------------+----------------------------------------+
| SMACTL or LSAM Environment | The target library location of the     |
|                            | object.                                |
+----------------------------+----------------------------------------+
| PTF sequence number        | The sequence number that governs the   |
|                            | critical order of application for      |
|                            | PTFs.                                  |
+----------------------------+----------------------------------------+
| Support ticket/case ID     | The SMA ID of the issue or project     |
|                            | tracking system controlling the        |
|                            | changes to this object. It is possible |
|                            | for more than one support issue or     |
|                            | enhancement project to be included in  |
|                            | a single PTF, although most commonly a |
|                            | PTF will be linked to just one of      |
|                            | these.                                 |
+----------------------------+----------------------------------------+
| Chg mgmt project name      | The SAM IBM i change management system |
|                            | project identifier that controlled the |
|                            | changes to this object.                |
+----------------------------+----------------------------------------+
| Disk storage location      | -   DB2 = integrated IBM i DB2 UDB     |
|                            |     database (refer to DBw object name |
|                            |     and library fields)                |
|                            | -   IFS = Integrated File System       |
|                            |     (refer to IFS object name and      |
|                            |     directory path fields, lower on    |
|                            |     the display)                       |
+----------------------------+----------------------------------------+
| DB2 object name            | When the disk location is DB2, the     |
|                            | name of this object.                   |
+----------------------------+----------------------------------------+
| DB2 library name           | When the disk location is DB2, the     |
|                            | library where this object is located.  |
|                            | The LSAM base name, such as SMADTA,    |
|                            | will be replaced by the actual library |
|                            | name for alternate LSAM environments.  |
+----------------------------+----------------------------------------+
| Object type                | The IBM i mnemonic for the object      |
|                            | type, such as \*PGM or \*FILE.         |
+----------------------------+----------------------------------------+
| Object attribute           | The IBM i mnemonic for the object      |
|                            | type, such as CLLE or RPGLE for type   |
|                            | \*PGM.                                 |
+----------------------------+----------------------------------------+
| CCSID of data objects      | If applicable, the character set ID    |
|                            | assigned to a database file or data    |
|                            | area.                                  |
+----------------------------+----------------------------------------+
| Duplicate data             | For database files, indicates that the |
|                            | file sent from SMA contains control    |
|                            | data that is normally distributed to   |
|                            | client installations.                  |
+----------------------------+----------------------------------------+
| Data convert program       | When not blank, names a specialty      |
|                            | program that must be called at the     |
|                            | time an object is replaced by the PTF. |
|                            | For database files, this program would |
|                            | be used instead of the default CPYF    |
|                            | operation typically used to retain and |
|                            | convert existing client data.          |
+----------------------------+----------------------------------------+
| Original apply time        | The system time stamp when the PTF was |
|                            | first applied to this LSAM environment |
|                            | (or to the SMAGPL utility library).    |
+----------------------------+----------------------------------------+
| Apply seq                  | The critical application sequence      |
|                            | number assigned to each object         |
|                            | affected by a PTF. Application         |
|                            | sequence is especially critical, for   |
|                            | example, to properly convert physical  |
|                            | files and the logical files that       |
|                            | depend on them. Out of sequence, file  |
|                            | management could cause the PTF         |
|                            | application process to fail.           |
+----------------------------+----------------------------------------+
| Rollback/Reapply times     | Two time stamp fields that record when |
|                            | the Rollback and/or the Re-apply       |
|                            | actions were last executed.            |
+----------------------------+----------------------------------------+
| Record write/update        | SMA internal use, identifies when the  |
|                            | PTF object control record was last     |
|                            | updated. This information could be     |
|                            | important if it becomes necessary to   |
|                            | replace a faulty PTF.                  |
+----------------------------+----------------------------------------+
| Prim key                   | For use by technical support personnel |
|                            | only, this is the primary key of the   |
|                            | object record in the PTF details       |
|                            | master file.                           |
+----------------------------+----------------------------------------+
| IFS object name            | When the disk location is IFS, this is |
|                            | the name of the object.                |
+----------------------------+----------------------------------------+
| IFS directory path         | When the disk location is IFS, this is |
|                            | the directory where the object will be |
|                            | replaced. (The PTF applications tools  |
|                            | will handle any path replacement       |
|                            | required when an alternate LSAM        |
|                            | environment is being used.)            |
+----------------------------+----------------------------------------+

:  

###### Functions

-   **F3=Exit**: Quits the detail display and returns to the menu.
-   **F11=View PTF ID**: Branches to a display of the PTF control
    information for the PTF controlling this object.
-   **F12=Cancel**: Quit the detail display and return to the list
    display and return the list of PTF objects.
-   **F20=Show all PTFs for Obj**: The same as option 9=All PTFs from
    the object list display, this function key branches to a list of all
    PTFs that affect this object. The PTF list display is the same as
    the Work with LSAM PTFs list, documented above, except that the
    title line will show the name of the reference Object whose PTFs are
    being listed.

##### PTF Request and Application Menu Functions

The following menu functions result in a display of a prompted IBM i
command parameters screen for each of the LSAM commands listed on the
menu:

 

2.[ Master PTF request, load and apply (SMAPTFINS)]{style="color: #008000;"}

3.[ Request PTF information or save files (SMAPTFREQ)]{style="color: #008000;"}

4.[ Load PTF information or save files (SMAPTFLOD)]{style="color: #008000;"}

5.[ Apply cumulative PTF (SMAPTFCUM)]{style="color: #008000;"} 
6.[ Apply single PTF (SMAPTFAPY)]{style="color: #008000;"} 
 

Typically, these command prompting functions are followed by a
program-formatted display of the process control information. This
second display appears to contain most of the same information as the
command prompt, but the display shows how any command parameter default
values (such as when asterisk (\*) is specified) were resolved by
referring to the LSAM PTF options configuration control data. Final
changes may be made on these secondary displays, if necessary, before
the operation is committed to execution.

 

The contents of the PTF process control fields are explained in detail
above, under the topic of How to obtain and apply PTFs. Also refer to
the Screens and Windows description of the PTF options configuration,
LSAM menu 9, option 7. In other cases, the information requested by
commands, such as the SMAPTFAPY command to apply just one PTF at a time,
must be obtained from the detail record displays accessed from Work with
LSAM PTFs (LSAM menu 9, option 1).
:::

 


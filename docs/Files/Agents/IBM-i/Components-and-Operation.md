---
lang: en-us
title: IBM i Components and Operation
viewport: width=device-width, initial-scale=1.0
---

# IBM i Components and Operation

## Components

### Core Programs and Files

[]{#aanchor6} A summary of the programs and files installed for the IBM i LSAM is available in [IBM i LSAM Programs and
Files](Programs-and-Files.md#top).

### Primary Server Jobs

When the LSAM is running, one subsystem and multiple primary server jobs
are active. There may also be transient sub-processes spawned in the
subsystem, but these are not listed in the following table.

+----------+----------------------------------------------------------+
| Job Name | Description                                              |
+==========+==========================================================+
| SMASBS   | This is the subsystem where the LSAM agent server jobs   |
|          | are running.                                             |
+----------+----------------------------------------------------------+
| MSGMNG   | This job monitors for IBM i job completion or failure    |
|          | messages, for jobs that were submitted by OpCon.         |
+----------+----------------------------------------------------------+
| SKTCMN   | This job performs sockets communication with SMANetCom,  |
|          | sending and receiving all information exchanged with     |
|          | OpCon via the TCP/IP connection.                         |
|          |                                                          |
|          |                                                          |
+----------+----------------------------------------------------------+
| TXMMNG   | This job performs the actual tasks requested by OpCon    |
|          | transactions. For example, it submits jobs to IBM i.     |
+----------+----------------------------------------------------------+
| LSAJOR   | This job handles internal requests for job output        |
|          | retrieval as each OpCon-started job reaches completion.  |
|          | This server task manages the tracking (and optional      |
|          | storing) of job logs reports (i.e., spool files).        |
+----------+----------------------------------------------------------+
| JORCMN   | This is the communications server job that responds to   |
|          | requests from OpCon to view the job output. This server  |
|          | job lists the job logs that the LSAM has tracked and     |
|          | then it retrieves the job log content and sends it back  |
|          | through the TCP/IP communications link with OpCon.       |
+----------+----------------------------------------------------------+
| LSAMNG   | -   This job purges LSAM log files and job report        |
|          |     output, including job log reports (spool files).     |
|          | -   The LSAM log files are purged only when the LSAM     |
|          |     Parameter value of Automatic delete has been set     |
|          |     to Y.                                                |
|          | -   Job log report spool files are always managed        |
|          |     according to the separate LSAM Parameters that       |
|          |     control how long job output should be retained.      |
|          | -   LSAM debug log files are managed by this process     |
|          |     when the Backup and Reorganize options allow the     |
|          |     LSAM to automatically schedule the SMARGZ command.   |
|          |     (Optionally, the SMARGZ command can be configured to |
|          |     run as a job in an OpCon/xps schedule.)              |
+----------+----------------------------------------------------------+

: IBM i LSAM Primary Server Jobs

### Optional Server Jobs

Some LSAM server jobs are separately controlled by their own option
flags, set in various LSAM menu functions.

+---------+-----------------------------------------------------------+
| Process | Description                                               |
+=========+===========================================================+
| TRPMSG  | -   This job monitors IBM i messages, both for the LSAM   |
|         |     global message management and for job-specific        |
|         |     messages defined in the OpCon job master.             |
|         | -   The LSAM can submit this job automatically if the     |
|         |     Message Management Performance Parameter value to     |
|         |     Auto-start message management has been set to Y.      |
|         | -   Message management also starts automatically when Job |
|         |     Tracking is started because it is required to support |
|         |     Job Tracking.                                         |
|         | -   Message management can also be started manually from  |
|         |     the Message Management sub-menu, but as soon as any   |
|         |     Message Management Parameters are defined and set to  |
|         |     Active, the normal practice is to set the flag that   |
|         |     allows this server job to always be started whenever  |
|         |     the other LSAM server jobs are started.               |
+---------+-----------------------------------------------------------+
| SMAFTS  | -   When specified in the LSAM\'s SMA File Transfer       |
|         |     control options, this server job is automatically     |
|         |     started to listen for file transfer requests. SMA     |
|         |     File Transfer jobs start when OpCon submits a job to  |
|         |     any LSAM (within IBM i or in another operating        |
|         |     system) that will act as the requesting File Transfer |
|         |     Agent. The requesting agent contacts the SMA File     |
|         |     Transfer server job with a request for the file.      |
|         | -   This job is the SMA File Transfer server job for the  |
|         |     IBM i partition. When it receives a file transfer     |
|         |     request from another LSAM agent, this job finds the   |
|         |     file in the IBM i database (or IFS slash / file       |
|         |     system) and then sends the file to the requesting     |
|         |     agent LSAM. Optionally, the file transfer can also be |
|         |     run in the opposite direction.                        |
+---------+-----------------------------------------------------------+
| SMARGZ  | -   This optional job may appear for a brief period in    |
|         |     the LSAM subsystem shortly after the LSAM Maintenance |
|         |     Hour on scheduled days. This is the job that performs |
|         |     an automatic backup of the SMADTA database library    |
|         |     and then reorganizes the LSAM master files. It also   |
|         |     purges the LSAM debug log files after the save step   |
|         |     is completed.                                         |
|         | -   During the file reorganization step, this may be the  |
|         |     only job active in the LSAM subsystem. This task      |
|         |     suspends all other LSAM server jobs in order to free  |
|         |     the master files for reorganization. When the file    |
|         |     reorganization is completed, this job restarts the    |
|         |     other LSAM server jobs.                               |
+---------+-----------------------------------------------------------+

: IBM i LSAM Optional Server Jobs

## Operating the LSAM

### Entering the LSAM Environment

There are two commands that can be used to enter the LSAM green screen
workstation menus: STRSMA and LSAMENU.

The STRSMA command may be used when the LSAM environment library list is
not in effect because it will set the interactive job\'s library list
before the LSAM menu is displayed. Depending on how the SMAGPL utility
library support has been configured, it may be necessary to qualify the
STRSMA command with the library name: SMAGPL/STRSMA. This requirement
can be eliminated either by choosing to copy some LSAM commands into the
QGPL library, or by adding SMAGPL to the IBM i default user library
list.

 

The command LSAMENU is more direct because it skips the splash display,
and it may also be a convenient tool for programming or scripting since
it supports an optional parameter that allows an LSAM sub-menu to be
specified for direct access. From outside of the LSAM library list, the
LSAMENU command requires that the LSAM Environment name be specified
using its ENV() keyword parameter.

 

Throughout the **IBM i LSAM** online help, wherever the STRSMA command
is specified, in most cases it will be acceptable to replace that with
the command LSAMENU, as long as the differences in the command
parameters are observed and the LSAM environment library list is
available when the LSAMENU command is used.

#### The STRSMA Command

There are two optional parameters associated with the STRSMA command. In
order to view the parameters and change their values, press \<**F4**\>
(Prompt) after typing the command (and before pressing \<**Enter**\>).
The parameters may also be typed as in the example below.

##### Syntax

SMAGPL/STRSMA ENV(my_environment_name) ANIMATE(\*YES\|\*NO)

 

-   **ENV**: This parameter is the LSAM Environment name. This parameter
    specifies the library list that will be used by the LSAM.
    -   The default value is SMADEFAULT, or another environment that has
        been created and selected as the default. The default library
        list distributed by SMA contains the SMADTA, SMAPTF and SMAPGM
        installation libraries.
    -   Do not change this parameter unless the IBM i LSAM has been
        installed to a different set of libraries or an additional
        environment has been created that uses a different library list.
-   **ANIMATE**: This parameter is no longer used. It is retained in
    order to remain compatible with existing product installations that
    might have used it.

+----------------------------------+----------------------------------+
| ![White pencil icon on green     | **EXAMPLE:** [The ENV parameter  | | circular                         | can be specified by position     |
| background](../../../Reso        | without the                      |
| urces/Images/example-icon(48x48) | keyword:]{.statement2}           |
| .png "Example icon") |                                  |
|                                  | SMAGPL/STRSMA SMADEFAULT         |
|                                  |                                  |
|                                  | **- or -**                       |
|                                  |                                  |
|                                  | SMAGPL/STRSMA                    |
|                                  | \<alternate_environment\>        |
+----------------------------------+----------------------------------+

#### The LSAMENU Command

There are two optional parameters associated with the LSAMENU command.
In order to view the parameters and change their values, press
\<**F4**\> (Prompt) after typing the command (and before pressing
\<**Enter**\>). The parameters may also be typed as in the example
below.

##### Syntax

SMAGPL/LSAMENU ENV(my_environment_name) MENUNBR([0]{.ul}) 
 

-   **ENV**: This parameter is the LSAM Environment name. This parameter
    specifies the library list that will be used by the LSAM.
    -   The default value is \*CURRENT. This special value means that if
        the current job already has its library list set to the LSAM
        environment, the command driver program will assume that the
        request for an LSAM menu applies to the environment indicated by
        the job\'s library list. If this default value is used with the
        LSAMENU command in a batch job, it will be replaced by the
        special value \*DEFAULT, therefore, it may be better to specify
        an LSAM environment name when using the LSAMENU command in a
        batch job.
    -   Other values that can be used for this parameter include:
        -   \*DEFAULT = the LSAM environment that was indicated as the
            default environment by the SMALIBMGT command function.
        -   \*SELECT = a list of LSAM environments will be presented as
            the command is executed so that the user may select the
            desired LSAM environment.
        -   IBM i LSAM patch instructions
        -   Name = a specific LSAM environment may be indicated by its
            name, such as SMADEFAULT.
-   **MENUNBR**: Specifies the LSAM main menu when the default value of
    zero (0) is used, otherwise, values 1 -- 6 and 8 may be used to
    enter directly to one of the LSAM sub-menus.
    -   When a sub-menu is specified, pressing F3=Exit from the sub-menu
        does NOT return to the LSAM main menu, but instead returns the
        user or program to the calling program where the LSAMENU command
        was issued; this may be the Command entry screen.

+----------------------------------+----------------------------------+
| ![White pencil icon on green     | **EXAMPLE:** [The following      | | circular                         | command enters an alternate LSAM |
| background](../../../Reso        | environment going directly to    |
| urces/Images/example-icon(48x48) | the Events and Utilities         |
| .png "Example icon") | sub-menu:]{.statement2}          |
|                                  |                                  |
|                                  | SMAGPL/LSAMENU                   |
|                                  | ENV(alternate_environment)       |
|                                  | MENUNBR(3)                       |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | Additionally, the parameters can |
|                                  | be specified by position without |
|                                  | the keywords, but with the       |
|                                  | environment value:               |
|                                  |                                  |
|                                  | SMAGPL/LSAMENU \*DEFAULT 3       |
|                                  |                                  |
|                                  | **- or -**                       |
|                                  |                                  |
|                                  | SMAGPL/LSAMENU                   |
|                                  | \<alternate_environment\> 3      |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | If the environment value is not  |
|                                  | specified, the current library   |
|                                  | list will be used to determine   |
|                                  | the LSAM environment, or in a    |
|                                  | batch job the \*DEFAULT          |
|                                  | environment will be used. If the |
|                                  | current library list of an       |
|                                  | interactive job does not support |
|                                  | an LSAM environment, the command |
|                                  | will assume \*SELECT for the     |
|                                  | environment and will present a   |
|                                  | list of available LSAM           |
|                                  | environments.                    |
|                                  |                                  |
|                                  | SMAGPL/LSAMENU                   |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | When no menu number is           |
|                                  | specified, the LSAM Main Menu    |
|                                  | will be shown. It is not         |
|                                  | necessary to use the SMAGPL/     |
|                                  | library qualifier if the current |
|                                  | library list includes the LSAM   |
|                                  | libraries.                       |
+----------------------------------+----------------------------------+

 

[Start the LSAM Interactive Menu System]{.ul} 
1.  In the command line, enter **SMAGPL/STRSMA**. The LSAM Menu system
    welcome screen appears.

LSAM Welcome Screen

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  [SYSTEMNAME]{style="color: #008000;"}     W E L C O M E  T O  T H E  I B M  i  A G E N T     [MM/DD/YY]{style="color: #008000;"}   [USERNAME]{style="color: #008000;"}                  [Environment:]{style="color: #008000;"} [SMADEFAULT]{style="color: #ff00ff;"}                 [HH:MM:SS]{style="color: #008000;"}
   
  Press Enter to continue to the main menu.
   
   
                   OOO           CCC
                  O   O         C   C                    [x 0   x]{style="color: #ff0000;"}                  O     O       C                          [x  x]{style="color: #ff0000;"}
                 O     O pppp  C       ooo  n nn           [x]{style="color: #ff0000;"}                  O     O p   p C      o   o n   n        [x  x]{style="color: #ff0000;"}
                 O     O p   p C      o   o n   n       [xx  xx]{style="color: #ff0000;"}                   O   O  p   p  C   C o   o n   n      [xx   xx]{style="color: #ff0000;"}
                   OOO   pppp    CCC   ooo  n   n     [xx    xx]{style="color: #ff0000;"}                          p                           [x      x]{style="color: #ff0000;"}
                         p
                              [by]{style="color: #008000;"} [SMA]{style="color: #0000ff;"}    
   
   
  [Load source:]{style="color: #008000;"}  [LI040004  PTF403170]{style="color: #00ffff;"}                        [Version:]{style="color: #008000;"} [04.00.03]{style="color: #00ffff;"}                                                            [PTF LVL:]{style="color: #008000;"} [PTF403170]{style="color: #00ffff;"}
  F3=Exit   F12=Cancel
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Press the \<**Enter**\> key to continue to the IBM i LSAM Main Menu.

LSAM Interactive Menu

  ------------------------------------------------------------------------------------------------------------------------------------------------------------
   [SYSTEMNAME]{style="color: #008000;"}            I B M  i  L S A M  M A I N  M E N U            [00/00/00]{style="color: #008000;"}    USERNAME                                                             02:49:04
   
    Select one of the following:
   
   
        1. [Job Track menu]{style="color: #008000;"}         2. [Message Management menu]{style="color: #008000;"}
        3. [Events and Utilities menu]{style="color: #008000;"}         4. [Operator Replay menu]{style="color: #008000;"}
        5. [Restricted Mode and Multi-Step Job menu]{style="color: #008000;"}         6. [LSAM management menu]{style="color: #008000;"}
        7. [LSAM parameters]{style="color: #008000;"}         8. [SMA File Transfer menu]{style="color: #008000;"}
        9. [PTF and Security menu]{style="color: #008000;"}    
   
   
   Selection or command
   ===\>\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
  \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
   F3=Exit   F4=Prompt   F9=Retrieve   F12=Cancel
   F13=Information Assistant   F16=System main menu
  ------------------------------------------------------------------------------------------------------------------------------------------------------------

### LSAM Management Operations

#### Starting the LSAM Server Jobs

Begin processing OpCon/xps jobs by starting the LSAM using either of the
two following methods:

 

[Option One: Start the LSAM through SMA Menus]{.ul} 
1.  Log in to the IBM i as **QSYSOPR** or a user profile with privileges
    to access the LSAM menu and to use the LSAM startup program.
2.  Start the LSAM through the menu system with the following steps.
    a.  At the command line, enter **SMAGPL/STRSMA**.

    ```{=html}
    <!-- -->
    ```
    a.  Enter **6** to choose the **LSAM management menu**.
    b.  Enter **1** to choose the **Start LSAM (STRSMASYS)** option.

[Option Two: Start the LSAM Manually]{.ul} 
1.  To start the LSAM manually, enter **SMAGPL/STRSMASYS** in the
    command line. Optionally, specify the name of the LSAM environment
    in the ENV parameter. If ENV is specified, the job\'s library list
    does not matter.
2.  The optional ENV parameter enables the copy of the command in
    library SMAGPL to be used from the IBM iSeries Navigator to start
    the LSAM without having to log on to a green screen workstation.

#### Stopping the LSAM Server Jobs

Stop the LSAM using either of the methods below.

 

  -------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [For either option, please verify the Subsystem SMASBS has ended. Do this by using the IBM i command WRKSBSJOB, using the correct name for the LSAM subsystem (the default name is SMASBS), or by using the LSAM menu function. Refer to [Check LSAM Subsystem Status](#Check) described below.]
  -------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

[Option One: Stop the LSAM through SMA Menus]{.ul} 
1.  Log in to the IBM i as **QSYSOPR** or a user profile with equal
    privileges.
2.  Stop the LSAM through SMA menus with the following steps.
    a.  In the command line, enter **SMAGPL/STRSMA**.

    ```{=html}
    <!-- -->
    ```
    a.  Enter **6** to choose the **LSAM management** menu.
    b.  Enter **2** to choose the **End LSAM (ENDSMASYS)** option.

[Option Two: Stop the LSAM Manually]{.ul} 
1.  To end the LSAM manually, enter **SMAGPL/ENDSMASYS** in the command
    line. Optionally, specify the name of the LSAM environment in the
    ENV parameter. If ENV is specified, the job\'s library list does not
    matter.
2.  The ENDSMASYS command supports an optional parameter that may be
    used to specify the LSAM environment name. This parameter enables
    the copy of the command in library SMAGPL to be used from the IBM
    iSeries Navigator to stop the LSAM without having to log on to a
    green screen workstation.

#### LSAM Communication Idle Timeout

The IBM i LSAM sockets communications program actively monitors TCP/IP
communications. When the LSAM does not receive communication from OpCon
for a specified amount of time (according to the communications timing
parameters described above), the LSAM sends a warning message to the IBM
i Operator Message queue.

 

+----------------------------------+----------------------------------+
| ![White pencil icon on green     | **EXAMPLE:** [The following is a | | circular                         | warning message to the IBM i     |
| background](../../../Reso        | Operator Message queue when      |
| urces/Images/example-icon(48x48) | communication between the LSAM   |
| .png "Example icon") | and OpCon/xps is                 |
|                                  | idle:]{.statement2}              |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | Message ID: SMA0009              |
|                                  |                                  |
|                                  | Message file: SMAMSGF            |
|                                  |                                  |
|                                  | Severity: 40                     |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | Message . . . . : OpCon/xps LSAM |
|                                  | communications idle time         |
|                                  | exceeded on port &1. Lost        |
|                                  | connection? The OpCon/xps IBM i  |
|                                  | LSA sockets communications       |
|                                  | program has not received any     |
|                                  | data or any request to connect   |
|                                  | for longer than the idle time    |
|                                  | specified in the LSAM Parameters |
|                                  | control file. This warning       |
|                                  | usually occurs when the TCP/IP   |
|                                  | connection has been interrupted. |
|                                  | The communication program will   |
|                                  | continue to monitor for a        |
|                                  | connection on the specified      |
|                                  | port, however, under some        |
|                                  | circumstances it might be        |
|                                  | necessary to stop and restart    |
|                                  | the LSAM *communications         |
|                                  | program*.                        |
+----------------------------------+----------------------------------+

 

Upon receiving this warning message, contact the OpCon system
administrator to check data communications between OpCon/xps and the IBM
i LSAM.

 

This message repeats at the end of every idle interval until data
communications has been restored.

 

The IBM i LSAM sockets communications program will remain in a state
that is ready for communications with OpCon/xps. When OpCon/xps is able
to resume communications, the connection will be automatically restored
without needing to stop and restart the IBM i LSAM server programs.

### LSAM Management Screens and Windows

LSAM Management Menu

  --------------------------------------------------------------------------------------------------------------------------------------------------------------
   [SYSTEMNAME]{style="color: #008000;"}                   LSAM MANAGEMENT MENU                     [00/00/00]{style="color: #008000;"}    USERNAME                                                              00:00:00
   
  Select one of the following:
   
   
        1. [Start LSAM (STRSMASYS)]{style="color: #008000;"}         2. [End LSAM (ENDSMASYS)]{style="color: #008000;"}
        3. [Check LSAM subsystem status]{style="color: #008000;"}         4. [Manage LSAM logging ]{style="color: #008000;"}
        5. [View LSAM Logs]{style="color: #008000;"}         6. [Work with LSAM Servers (WRKSMASVR)]{style="color: #008000;"}
        7. [LSAM Parameters configuration]{style="color: #008000;"}         8. [Alternate Job Notify menu]{style="color: #008000;"}
   
   
   
   Selection or command
   ===\> \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
  \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
   F3=Exit   F4=Prompt   F9=Retrieve   F12=Cancel
   F13=Information Assistant   F16=System main menu
  --------------------------------------------------------------------------------------------------------------------------------------------------------------

###### Menu Pathways

Main Menu \> LSAM management menu (\#6)

###### Fields

Selection or command: Type the menu item number and press \<**Enter**\>
to start the function.

###### Options

-   1=Start LSAM (STRSMASYS)
-   2=End LSAM (ENDSMASYS)
-   3=Check subsystem SMASBS status (the actual subsystem displayed
    depends on the settings of the LSAM Parameters).
-   4=Manage LSAM logging
-   5=View LSAM Logs
-   6=Work with LSAM Servers (WRKSMASVR)
-   7=LSAM Parameters configuration *(same as on LSAM Main Menu,
    option 7)*
-   8=Alternate Job Notify menu *(not documented here, not for general
    use; contact SMA Support)*

The options displayed on this menu are explained in the following
sections of this document. Type an option number in the Selection or
command line and press \<**Enter**\> to begin using any of the options.

###### Functions

-   **F3=Exit**: Returns to the master menu
-   **F4=Prompt**: Prompts for keywords for any command entered in the
    Select or command line.
-   **F9=Retrieve**: Retrieves the previous command that was entered on
    the Select or the command line. If it is pressed multiple times, the
    system goes further and further back to previous commands.
-   **F12=Cancel**: Returns to the master menu.
-   **F13=Information Assistant**: Displays the IBM i general help
    screen.
-   **F16=System main menu**: This is always shown on any
    system-generated menu screen. It branches to the general command
    entry menu for IBM i. Return to the previous menu by pressing
    \<**F3**\> or \<**F12**\>. This function is not commonly used, and
    can be restricted for certain user profiles.

#### Start LSAM (STRSMASYS)

The Start LSAM option starts the IBM i LSAM subsystem (default name
SMASBS) and the LSAM server programs. Use the LSAM management function
\"Check LSAM subsystem status\" to verify the results.

#### End LSAM (ENDSMASYS)

The End LSAM option stops the IBM i LSAM server programs and the LSAM
subsystem. Use the LSAM management function \"Check LSAM susbsystem
status\" to verify the results.

#### Check LSAM Subsystem Status

The Check LSAM Subsystem Status option executes the IBM i command
WRKACTJOB (i.e., Work with Active Jobs). The command displays the jobs
active in the LSAM subsystem defined in the LSAM configuration
parameters. From the WRKACTJOB display, press the Help key to view a
complete description of all the data displayed.

 

  ------------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White triangle icon on yellow circlular background](../../../Resources/Images/caution-icon(48x48).png "Caution icon")   **CAUTION:** [Unless directed by SMA Support, do not execute any of the options on this screen that affect the job status. Options 5 and 8 are allowed. If option 7 is required, please contact the Support team at SMA for help with determining the cause of the MSGW status.]
  ------------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Work with Active Jobs Screen

  ----------------------------------------------------------------------------------------------------------------------------------------------------------
                               Work with Active Jobs                   [SYSTEMNAME]{style="color: #008000;"}                                                                00/00/00  03:45:13
  CPU %:      .0     Elapsed time:   00:00:00      Active jobs:   143
   
  Type options, press Enter.
    2=Change   3=Hold   4=End   5=Work with   6=Release   7=Display message
    8=Work with spooled files   13=Disconnect \...
   
  Opt  Subsystem/Job   User        Type  CPU %   Function        Status
  \_\_     JORCMN        SMANET      BCH     2.6    PGM-JORCMNR00    DEQW
  \_\_     LSAJOR        SMANET      BCH     2.2    PGM-LSAJORR00    DEQW
  \_\_     LSAMNG        SMANET      BCH     2.4    PGM-DLTLOGR00    DEQW
  \_\_     MSGMNG        SMANET      BCH     2.2    PGM-LSARCMR00    DEQA
  \_\_     SKTCMN        SMANET      BCH     2.6    PGM-CMNSKTR00    SELW
  \_\_     SMAFTS        SMANET      BCH     2.6    PGM-SMAFTSR00    DEQW
  \_\_     TRPMSG        SMANET      BCH     2.5    PGM-TRPMSGR00    DEQW
  \_\_     TXMMNG        SMANET      BCH     2.7    PGM-LSASCHR00    DEQW
   
    Bottom
  Parameters or command
  ===\> \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
  F3=Exit   F5=Refresh   F7=Find   F10=Restart statistics
  F11=Display elapsed data   F12=Cancel   F23=More options   F24=More keys
  ----------------------------------------------------------------------------------------------------------------------------------------------------------

##### Menu Pathways

Main Menu \> LSAM management menu (\#6) \> Check LSAM subsystem status
(\#3)

#### Manage LSAM Logging

The IBM i LSAM supports active control over its logging capabilities.
Logging is a local function useful to system administrators, IT
auditors, programmers and support technicians. For a complete
description of how to use the logging features, refer to [Log File and Database
Management](Log-File-and-Database-Management.md#top){.MCXref
.xref}.

#### View LSAM Logs

This menu option provides direct access to the list of available LSAM
log viewers. For more information about how to use the log views, refer
to [Log File and Database Management](Log-File-and-Database-Management.md#top){.MCXref
.xref}. This menu function supports viewing the general debug log files
associated with most types of jobs that the LSAM controls. However,
there are certain specialized debug log file viewers that do not appear
on this menu, but are supported from other LSAM sub-menus because they
are specifically associated with the LSAM features on those menus.

#### Work with LSAM Servers (WRKSMASVR)

This menu option presents a convenient display that shows the actual
running status of each LSAM server job. Options at the top may be used
to start or end individual server jobs or groups of jobs. This is not
the normal method recommended for managing the LSAM server jobs.
Therefore, this Work With function is not documented here.

 

However, the groups of server jobs correspond to the categories of LSAM
server jobs that are managed by the LSAM PTF application process. Use
option 5 to view the details of a PTF control record (LSAM sub-menu 9,
option 1) to see the LSAM processes that must be stopped in order to
apply a given PTF. In most cases, PTFs are applied cumulatively and the
management of the LSAM server jobs is automatic.

 

It may be helpful to view this display in case there is any question
about whether the LSAM server jobs are performing normally. However,
better detail, such as an indication of a job being stuck in a MSGW
(message wait) error status, is available from this same menu using
option 3.

#### LSAM Parameters Configuration

This is the same function that is documented in detail in the
Configuration topic. It appears on this sub-menu for convenience.

#### Alternate Job Notify Menu

This option provides access to a sub-sub-menu of functions that support
a different method for the LSAM to detect when any jobs in the IBM i
system have started or ended. The Alternate Job Notify feature is
provided for special purposes only, including supporting the True
Passive mode of Job Tracking and for use by SMA Support to perform
exceptional diagnostic procedures. User instructions are provided in the
following section of this document.

### Alternate Job Notify Service

This optional feature of the IBM i Agent for OpCon (also called the IBM
i LSAM) is not required for normal operation of the Agent, unless the
Job Tracking feature will be configured with any records using the
Passive mode.

 

The Job Notify service was originally designed for some SMA clients who
have third-party applications running in their IBM i system that
interferes with the normal operation of the LSAM's job completion
message processing. In those cases, the Alternate Job Notify server may
be useful for restoring the LSAM's communication with OpCon to 100%
accuracy about completed jobs.

 

The symptom of the problem that the full operational mode of the
Alternate Job Notify service will solve is an IBM i job still showing as
active on an OpCon schedule after it has been confirmed (for example, by
a human operator) that the job has already completed. This same symptom
can occur in rare situations when some of the LSAM server jobs might
encounter an error condition and are stuck in the MSGW (message waiting)
status. If an operator confirms that the LSAM servers are operating
normally, and other IBM i jobs are being reported as complete, then this
might be a situation that would benefit from using the Alternate Job
Notify server. The final confirmation of this symptom is when it is
always the same job (or only certain jobs) that are not being reported
to OpCon as completed.

 

SMA suggests the client should consult with SMA Support before
considering implementing the Alternate Job Notify service. There is no
need to impose this additional overhead on system capacity unless the
specific problem it fixes has been confirmed, or unless the client needs
to use the Passive mode of job tracking. It is important to understand
the multi-step procedure for activating Job Notification, which is done
separately for each IBM i subsystem where jobs must be monitored.

 

Following the [Alternate Job Notify - Job End Process](#Alternate_Job_Notify-Job_End_Process)
illustration, there is an outline of the steps required to implement the
Alternate Job Notify service. There are multiple steps that must be
carefully complete in the correct sequence in order for the Job Notify
server to operate correctly. Also, many of the configuration steps
require a high level of security permission. The implementation steps
should be completely reviewed first before attempting to execute any of
the steps. The [Alternate Job Notify - Job End Process](#Alternate_Job_Notify-Job_End_Process) flow
chart may help with understanding each of the configuration steps.

 

The Job Notify service is actually comprised of two different IBM i LSAM
server jobs. The JOBNFY server job handles the Job End messages, as
illustrated in the [Alternate Job Notify - Job End Process](#Alternate_Job_Notify-Job_End_Process) figure.
The other JOBNFY4 server job is not illustrated in that figure. It
handles a separate message type generated by IBM i that is generated
whenever a job enters a job queue that is attached to a subsystem which
has been configured for job notify services.

#### Job Notify Service for Passive Job Tracking

The JOBNFY4 job uses the job queue entry messages to update the LSAM Job
Tracking master log file with the actual IBM i full job ID, after that
job has already passed through the Job Tracking exit program in
"passive" mode. Just after the job enters a job queue, the system
notification message is able to provide critical detail about the job
being tracked. This IBM i system information is combined with OpCon
schedule and Job Master information that enables the full operation of
OpCon automation, but without interrupting the native IBM i job
submission process (as would be the case with this LSAM's standard Job
Tracking and Job Queuing methods).

 

The Job End message processing of the JOBNFY server is also critical for
Passive Job Tracking. This is because the LSAM job start services were
not used to initiate the IBM i job, and therefore the standard IBM i job
completion message will not be sent to the job completion message queue
that the LSAM is monitoring. Instead, the Job Notify service forwards
the IBM i Job End message to the LSAM job completion message queue.

 

More information about Passive Job Tracking may be found in [Job Tracking and Queuing](Job-Tracking-and-Queuing.md#top){.MCXref
.xref}.

#### Flow Chart of Alternate Job Notify Processing

The Alternate Job Notify server job processes transactions put into the
data queue specified in the Exit Program Register. The Job Start message
management works similar to the following Job End process.

 

[]{#Alternate_Job_Notify-Job_End_Process}Alternate Job Notify - Job End Process

![Alternate Job Notify - Job End Process](../../../Resources/Images/IBM-i/Alternate-JobNotify---Job-End-Process.png "Alternate Job Notify - Job End Process"){.flat}

#### Instructions for Configuring the Alternate Job Notify Service

SMA recommends that all of these steps be studied and fully understood
before beginning the procedure. This procedure assumes the PTF has been
successfully applied. Some steps require a high level of security
permission.

 

[Procedure to Add Job Notify Subsystem Records]{.ul} 
1.  Navigate to the IBM i LSAM sub-menu 6: LSAM Management menu, then
    select option 8: Alternate Job Notify menu.
2.  Execute option 7: Job notify configuration, to set the control
    values for this new feature. Do NOT set the first flag, "Use Alt Job
    Notify Server" on at this time, leave it set to 'N' = No. Refer to
    Screens and Windows, below, for more information.
3.  Execute option 1 from the Alternate Job Notify Menu and then use
    F6=Add to create one or more Job Notify Subsystem control records.\
    \
    Add one record for each IBM i subsystem where a job may start that
    has demonstrated a problem with notifying OpCon about the job end.
    Do not add more subsystems than are needed to solve the job end
    notification problem. Refer to Screens and Windows, below, for more
    information about using this function.\
    \
    **Authority:** *This function requires data authority to add records
    to the file JOBNFYF00 in the SMADTA library. Prompting with function
    key F4 in the subsystem name field also requires read authority to
    all the subsystem descriptions in the IBM i partition. However, F4
    is not required, as long as the user knows the exact subsystem name
    and the library location of each subsystem description.*
4.  From the same Work with function, type option 1 next to each
    subsystem control record in order to add its Exit Program number to
    the IBM i exit point registry.
5.  To use the new exit points, each IBM i subsystem must be stopped and
    then restarted. This operation can be performed from outside of the
    LSAM menu system, using the commands ENDSBS and STRSBS. However, the
    Work with Alternate Job Notify function provides options 6 and 7 as
    a convenient way to perform these functions.
6.  Now it is time to set the Alt Job Notify Configuration flag that
    says to use the new feature. From the sub-sub-menu 8: Alternate Job
    Notify Menu, select option 7: Job notify configuration. Type a "Y"
    or a "T" in the first field, called "Use Alt Job Notify Server,"
    then press \<**Enter**\> to complete this update.
7.  If the other LSAM server jobs are already started, execute
    sub-sub-menu 8 option 3: Start job notify server. (This new LSAM
    server jobs, called "JOBNFY" and "JOBNFY4" will be stopped and
    started automatically the next time all the LSAM server jobs are
    stopped or started, after the control flag is set in step 6, above.)
8.  Now it is possible to confirm that the exit point is properly
    registered and the Job Notify server is working correctly. There is
    no convenient way to view a subsystem's status in order to confirm
    if it is ready to use the IBM i exit point. Instead, SMA has
    provided option 8=TestNtfy to perform a test of each subsystem that
    is listed in the Work with Job Notify Subsystem list display. Type
    option 8 next to each subsystem and press \<**Enter**\> to start the
    test process.\
    \
    As option 8 is executed, a message will appear at the bottom of the
    display naming the ID of the submitted test job (the job name will
    always be SMANTFYTST). The list display will show a test status of
    "Pending," and after the test job completes it will be possible to
    press F5=Refresh to see the final confirmation status of "Verified."
    There should be log information available about this test job in the
    log viewer, option 2 on this sub-sub-menu 8.
9.  If the test notify job does not quickly result in a Verified status,
    first check to be sure the named subsystem is active and then view
    the job queue (WRKJOBQ) that is named in the Job Notify subsystem
    control record to see if the job is still waiting for execution. If
    the job has already completed execution, then it may be necessary to
    review these procedures and confirm that each step was completed
    correctly.\
    \
    Finally, please contact SMA Support for assistance if the test
    notify job cannot be completed successfully. This Alternate Job
    Notify procedure cannot be relied on unless the test notify job has
    completed successfully.
10. After the Job Notify subsystems are each verified, the Alternate Job
    Notify feature does not require any special attention. It will be
    stopped and restarted along with the other LSAM server jobs. The Job
    Notify message log will be automatically purged at the same time as
    the LSAM job status master records.

[Procedure to Change Job Notify Subsystem Records]{.ul} 
All the general rules for the Add procedure, above, still apply. But to
change the control values for any subsystem, this is the order in which
steps must be executed. References to \"options\" are from the Work with
Job Notify Subsystems list display.

1.  Remove the exit program entry (option 9).
2.  Change the LSAM control record for the subsystem (option 2).
3.  Add the revised exit program entry (option 1).
4.  After making sure no jobs are currently executing in the subsystem,
    End the subsystem (option 6).
5.  After a brief pause, Start the subsystem (option 7).
6.  Re-test the subsystem to make sure that the exit program
    registration is active (option 8).

The procedure for removing subsystems from participating in the LSAM Job
Notify process is to remove the exit program entry (option 9) and then
end and restart the subsystem (options 6 and 7). Optionally, the LSAM
control record for this subsystem can be deleted from the list, unless
the details should be saved for resuming processing in the future.

#### Alternate Job Notify Screens and Windows

##### Alternate Job Notify Menu

Alternate Job Notify Menu

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
   [SERNUMBER]{style="color: #008000;"}                 ALTERNATE JOB NOTIFY MENU                  [00/00/00]{style="color: #008000;"}    USERNAME                                                             00:00:00
   
    Select one of the following:
   
        1. [Work with job notify subsystems]{style="color: #008000;"}         2. [View job notify message log]{style="color: #008000;"}
        3. [Start job notify server]{style="color: #008000;"}         4. [End job notify server]{style="color: #008000;"}
        5. [Check LSAM subsystem status]{style="color: #008000;"}    
        7. [Job notify configuration]{style="color: #008000;"}    
   
   
   
   
   
   [Selection or command]{style="color: #008000;"}                                        [(C) SMA 2017]{style="color: #ff0000;"}    [===\> \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_]{style="color: #008000;"}
  [\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_]{style="color: #008000;"}    F3=Exit   F4=Prompt   F9=Retrieve   F12=Cancel
   F13=Information Assistant   F16=System main menu
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

###### Menu Pathways

Main Menu \> LSAM management menu (\#6) \> option 8

###### Options

-   1=Work with Job Notify subsystems.
-   2=View job notify message log.
-   3=Start job notify server. Use this option to separately start just
    the JOBNFY server. The LSAM subsystem must already be active to use
    this option.
-   4=End job notify server. Use this option to separately stop the
    JOBNFY server job, without affecting other LSAM server jobs.
-   5=Check LSAM subsystem status. This view of the LSAM subsystem uses
    the IBM i command WRKACTJOB to view all jobs that are active in the
    LSAM's subsystem. This view can be used to verify when the JOBNFY
    server job is active.
-   (Option 6 is reserved for future use.)
-   7=Job notify configuration.

Options 1, 2 and 7 are described in the following sections of this
document.

 

Type an option number in the Selection or command line and press
\<**Enter**\> to begin using any of the options.

###### Functions

-   **F3=Exit**: Returns to the LSAM Management menu.
-   **F4=Prompt**: Prompts for keywords for any command entered in the
    Select or command line.
-   **F9=Retrieve**: Retrieves the previous command that was entered on
    the Select or the command line. If it is pressed multiple times, you
    go further and further back to previous commands.
-   **F12=Cancel**: Returns to the master menu.
-   **F13=Information Assistant**: Takes you to the IBM i general help
    screen.
-   **F16=System main menu**: This is always shown on any
    system-generated menu screen. It takes you to the general command
    entry menu for IBM i. Return to the previous menu by pressing
    \<**F3**\> or \<**F12**\>. This function is not commonly used, and
    can be restricted for certain user profiles.

###### Fields

[Selection or command]{.ul} 
 

Type the menu item number and press \<**Enter**\> to start the function.

##### Alternate Job Notify Configuration

-   **Screen Title**: Alternate Job Notify Configuration
-   **Screen ID**: JOBNFYD301

###### Menu Pathways

Main Menu \> LSAM management menu (\#6) \> Alternate Job Notify menu
(\#8) \> option 7

###### Functions

-   **F3=Exit**: Returns to the Alternate Job Notify menu without
    updating the control file.
-   **F12=Cancel**: Returns to the Alternate Job Notify menu without
    updating the control file.

###### Fields

-   **Use Alt Job Notify Server**: This control flag turns on or off all
    of the LSAM Alternate Job Notify functions, including automatically
    start or stop the JOBNFY server with the other LSAM server jobs.
    -   VALUES: Y = yes, N = no, T=Tracked only
    -   This control flag does not affect the IBM i exit point register
        and it does not affect the operation of IBM i subsystems.
    -   Option \"T\" will limit the operation of these server jobs to
        only those jobs classified as Passive Tracked Jobs in the LSAM
        Job Tracking master file. Option \"Y\" will generate signals via
        the LSAM to OpCon for all jobs that are registered in the
        LSAM\'s OpCon Job Master log file, including support for Passive
        Job Tracking.
-   **Default notify data queue/library**: The name of the data queue
    and the library location of that data queue which will be registered
    in the IBM i exit point registry for all registered subsystems to
    use when generating job ending transactions.
    -   The data queue name is not important; SMA has recommended using
        the same name as an optional system default data queue that
        would be used for jobs ended from a job queue before they start
        (a function that is ignored by the LSAM in this application).
        This may help to make the purpose of this data queue more
        obvious.
    -   The library location may be any library, but the LSAM database
        library is recommended since this object is created for use by
        the LSAM server jobs. The library must be located in a system
        ASP and not in an auxiliary ASP (a rule that applies to all LSAM
        objects).
-   **Signal OpCon when job ends**: This control flag enables the
    optional function of the LSAM using the exit point signal about a
    job end to notify OpCon that the job has ended.
    -   VALUES: Y=yes, N=no.
    -   This operation will only be performed if the LSAM has not
        already received and processed the normal job completion
        message. Also refer to the Delay value in the next field, and
        please review the flow chart above to compare this method with
        the normal path of a job completion message.
    -   This flag should normally be set to Y=yes, since the Alternate
        Job Notify server is only recommended for use when there is a
        problem with the normal LSAM job completion message function, or
        when Passive Job Tracking will be used.
    -   When this flag is set to N=no, the JOBNFY server will only
        convert job completion messages from the data queue and store
        then in the LSAM Job Notify message log, for historical
        purposes. Using the JOBNFY server for this limited function
        might be helpful when trying to diagnose problems with the
        normal LSAM job completion message path.
-   **Delay job end notify proc**: Set this value to the number of
    seconds that the JOBNFY server should wait after receiving a Job End
    notify message from the exit point processing, but before checking
    the LSAM job status master file.
    -   This delay allows time for the LSAM to receive and process the
        Job Queue message received by the JOBNFY4 server job. When very
        short jobs are controlled by Passive Job Tracking, it is typical
        for the Job End message to arrive before the Job Queue message
        processing can complete the task of registering the complete IBM
        i job ID information in the LSAM Job Master log file. When the
        Job End message process fails to find the completed Job ID
        information, an error will be logged in the LSAM submitted job
        log file (LSALOGF30), which may be viewed using the LSAM
        sub-menu 6, option 5, log viewer 4. Also, the Passive Job
        Tracking function will not complete normally, so the tracked job
        will not appear on the OpCon schedule.
    -   Choose the shortest value that does not cause short Passive Job
        Tracking to fail when looking for the LSAM job master log
        record. It appears that 1 second is not enough, but 2 seconds
        may be long enough. Try a longer wait value if there are still
        failures in Passive Job Tracking. If a longer wait time still
        does not work, please contact SMA Support for assistance.

##### Work with Job Notify Subsystems

-   **Screen Title**: Work with Job Notify Subsystems
-   **Screen ID**: JOBNFYR1

###### Menu Pathways

Main Menu \> LSAM management menu (\#6) \> Alternate Job Notify menu
(\#8) \> option 1

###### Options

-   **1=ADDEXITPGM**: Add an entry to the IBM i exit point registry. The
    type of registry used for this feature actually registers a data
    queue name and an associated IBM i subsystem description. A built-in
    IBM i function performs the operation of generating entries in the
    data queue for each job that uses the registered subsystem. The IBM
    i command WRKREGINF can be used instead of this menu option. The
    list display will be accurate after external maintenance is
    completed and the list display is refreshed. However, this option 1
    offers the advantage of correctly formatting the exit point
    registration, which is critical for correct operation of the LSAM
    Job Notify feature.
-   **2=Change, 3=Copy**: Use these options to maintain or create
    individual subsystems that can be supported by the LSAM job notify
    feature. Option 3 works like function key F6=Add.
-   **4=Delete**: Type this option and press \<**Enter**\> to add one or
    more records to a list of pending delete requests. After the Enter
    key is pressed, a confirmation list will appear requesting
    confirmation of all delete requests before subsystem control records
    are actually removed. Note that the Delete action is also
    accompanied by a forced RMVEXITPGM command, although the named
    subsystem will not be stopped and restarted, which is required to
    completely stop the exit point's function.
-   **5=Display**: Branches to a display of all the fields defining one
    subsystem control record.
-   **6=ENDSBS**: This option is the same as using the ENDSBS command
    from IBM i command entry. A subsystem must be stopped and restarted
    (using option 7 or STRSBS) before the exit point registration will
    take effect.
-   **7=STRSBS**: Refer to option 6, above. This is the same as using
    the IBM i command STRSBS.
-   **8=TestNtfy**: Use this option to submit a predefined job that will
    test the LSAM Job Notify feature for each subsystem. This option is
    offered because there is no convenient way to confirm that a
    subsystem has been stopped and restarted with its exit point
    properly registered, and the Job Notify feature will not work unless
    proper registration procedures were followed (as outlined in an
    earlier section of this document).
-   **9=RMVEXITPGM**: Refer to option 1, above. Use this option to
    disable the LSAM Job Notify feature for a subsystem. Deleting the
    LSAM control record for the subsystem will also perform this option.
    However, using this option does not stop and restart the subsystem,
    which is required in order to completely disable the effect of this
    exit point's function.

###### Functions

-   **F3=Exit**: Returns to the Alternate Job Notify menu without
    updating the control file.
-   **F5=Refresh**: The display program updates all the information
    about every control record. This refresh option is important when
    trying to verify the results of the option 8 Test Notify job.
-   **F6=Add**: Press this function key to add a new subsystem control
    record.
-   **F12=Cancel**: Returns to the Alternate Job Notify menu without
    updating the control file.
-   **F16=Search next**: When a value was typed in the Search Content
    key, after the Enter key is used to find the first match, this
    function key F16 will continue the search to find the next matching
    record.
-   **F17=Top**: Move directly to the top of the list display.
-   **F18=Bottom**: Move directly to the bottom (last record) of the
    list display.
-   **F21=WRKREGINF**: Authorized users can use this function key to get
    direct access to the IBM i exit point registry. Maintenance
    performed by the WRKREGINF command has the same effect as options 1
    and 9 from this list display. Either method may be used to complete
    exit point registration, however, the options 1 and 9 offer the
    advantage of correctly formatting the exit point registration, which
    is critical for the correct operation of the LSAM Job Notify
    feature.
-   **F24=More keys**: Toggles the function key legend on line 23 of the
    display to show more of the supported function keys.

###### Fields

-   **SBS Name**: The name of the subsystem description that is
    registered for monitoring by the LSAM Job Notify server, in
    cooperation with an IBM i exit point registry entry.
-   **SBSD Lib**: The name of the library where the subsystem
    description is stored. A subsystem may be described in more than one
    library location, however, only one subsystem of that name may be
    active in the system.
-   **STS**: The active or inactive status of each subsystem. Use
    F5=Refresh to see the immediate status of a subsystem. This list is
    not automatically refreshed unless a maintenance function has been
    performed.
-   **ExitPgmNbr**: The number of the exit point assigned to each
    subsystem. Exit points are automatically calculated during Copy and
    Add operations, but the user may override the exit program number in
    case there is a conflict in an IBM i partition.
-   **ExitSts**: The list display program checks the IBM exit point
    registry to show whether each exit point is currently registered or
    unregistered.
-   **Test Status**: The status of the last Test Notify job is
    displayed. If the exit point is ever removed, this field is set back
    to an untested status (blank). The status is shown as of the date
    listed in the next column.
-   **MMDDhhmm**: The Month, Day, hour and minute of the last Notify
    Test job. Use option 5=Display to see the complete date stamp from
    the last update of the Test Status field. This field is set back to
    a default null date value (01010000) when no test has been
    performed, or when removing an exit point registration makes the
    last test status irrelevant.

##### Job Notify Subsystem Details Display

Display Job Notify SBS Record

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------
  [JOBNFYR5]{style="color: #008000;"}               Display Job Notify SBS Record                [00/00/00]{style="color: #008000;"}   USERNAME                                                            00:00:00
   
  [Subsystem name  . . . :]{style="color: #008000;"} [SMASBS    ]{style="color: #ffcc00;text-decoration: underline;"}   [SBSD library  . . . . :]{style="color: #008000;"} [SMADTA    ]{style="color: #ffcc00;text-decoration: underline;"}
  [Notify level  . . . . :]{style="color: #008000;"} [0006]{style="color: #ffcc00;text-decoration: underline;"}          [0002 = Job end]{style="color: #0000ff;"}   [                                      0006 = JOBQ+Job end (passive tracking)]{style="color: #0000ff;"}
  [                                       (Other values not supported)]{style="color: #0000ff;"}   [Exit program number . :]{style="color: #008000;"} [2147483646]{style="color: #ffcc00;text-decoration: underline;"}    [1-2147483647]{style="color: #0000ff;"}
   
  [Test job queue  . . . :]{style="color: #008000;"} [SMALSAQ00 ]{style="color: #ffcc00;text-decoration: underline;"}   [  Job queue library . :]{style="color: #008000;"}   [SMADTA    ]{style="color: #ffcc00;text-decoration: underline;"}
  [Last test job number  :]{style="color: #008000;"} [123456]{style="color: #00ffff;text-decoration: underline;"}   [Notify test status  . :]{style="color: #008000;"} [Verified]{style="color: #00ffff;text-decoration: underline;"}
  [Last test status time :]{style="color: #008000;"} [2013-03-01-12.30.01.123450]{style="color: #00ffff;text-decoration: underline;"}    
   
  F3=Exit   (F4=Prompt   F5=Refresh)   F12=Cancel   F22=WRKACTJOB
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

The display example above is used to illustrate the Display, Change,
Copy and Add functions.

###### Menu Displays

-   Main Menu \> LSAM management menu (\#6) \> Alternate Job Notify menu
    (\#8) \> option 1 \> option 2=Change
-   Main Menu \> LSAM management menu (\#6) \> Alternate Job Notify menu
    (\#8) \> option 1 \> option 3=Copy
-   Main Menu \> LSAM management menu (\#6) \> Alternate Job Notify menu
    (\#8) \> option 1 \> option 5=Display
-   Main Menu \> LSAM management menu (\#6) \> Alternate Job Notify menu
    (\#8) \> option 1 \> function key F6=Add

###### Functions

-   **F3=Exit**: Returns to the Alternate Job Notify menu without
    updating the control file.
-   **F4=Prompt**: Appears only for the Copy and Add functions. Press
    this function key to view a list of all available subsystem
    descriptions throughout the entire IBM i partition, from which one
    may be selected to fill the Subsystem Name and Library fields.
-   **F5=Refresh**: Appears only for Change, Copy or Add. Restores the
    field values to their original settings as they first appeared when
    this display format was accessed.
-   **F12=Cancel**: Returns to the list display without updating the
    control file.
-   **F22=WRKACTJOB**: Authorized users can use this function key to get
    direct access to the IBM i display of all jobs active in the
    subsystem named by this control record.

###### Fields

-   **Subsystem name**: The name of the subsystem description that is
    registered for monitoring by the LSAM Job Notify server, in
    cooperation with an IBM i exit point registry entry.
-   **SBSD library**: The name of the library where the subsystem
    description is stored. A subsystem may be described in more than one
    library location, however, only one subsystem of that name may be
    active in the system.
-   **Notify level**: The LSAM currently supports only values 0002
    and 0006. The choice of the value depends on the purpose.
    -   Option **0002** causes only Job End messages to be generated by
        a subsystem. This type of message is the only type needed for
        the basic Alternate Job Notify feature of the LSAM, when the
        purpose is to catch the end of jobs that are not being detected
        by the LSAM's normal job completion message processor.
    -   Option **0006** (actually a combination of 0002 and 0004) causes
        both Job End messages and Job Queue Entry messages to be
        generated by the subsystem. The LSAM depends on both message
        types to support the Passive Job Tracking feature.
-   **Exit program number**: The number of the exit point assigned to
    each subsystem. Exit points are automatically calculated during Copy
    and Add operations, but the user may override the exit program
    number in case there is a conflict in an IBM i partition.
-   **Test job queue**: The name of a job queue that is linked to this
    subsystem, which should be used whenever option 8=TestNtfy is
    selected from the list display. This field recognizes that more than
    one job queue can be connected to the same subsystem, and that one
    particular job queue may be the most appropriate one to use for the
    specialized test job. The maintenance program does NOT verify that
    this job queue is defined for use with the named subsystem
    description.
-   **Job queue library**: The name of the library where the Test job
    queue is located. The program will verify that the test job queue
    exists before permitting the subsystem control record to be updated.
-   **Last test job number**: Display only. Used by the notify test job
    only, this value is recorded by the list program as a test job is
    submitted, and then the value is used by the Notify Job server
    program to store the Verified status when the job end has been
    detected by the IBM exit point registry function.
-   **Notify test status**: Display only. The status of the last Test
    Notify job is displayed. If the exit point is ever removed, this
    field is set back to an untested status (blank). The status is shown
    as of the date listed in the next column.
-   **Last test status time**: Display only. The time stamp from the
    last update of the Test Status field. This field is set back to a
    default null date value (01010000) when no test has been performed,
    or when removing an exit point registration makes the last test
    status irrelevant.

##### F4=Prompt: List Subsystem Descriptions

Prompting List of Subsystem Description

  -------------------------------------------------------------------------------------------------------------------------------------- --
  [JOBNFYR3]{style="color: #008000;"}                 Select Subsystem Description                 [00/00/00]{style="color: #008000;"}      USERNAME                                                              00:00:00                                                         
                                                                                                                                         
  Type 1 next to selected subsystem and press Enter to return.                                                                           
                                                                                                                                         
  Opt  SBS Name    SBSD Lib                                                                                                              
   \_   QSNADS      QSYS                                                                                                                 
   \_   QSPL        QINMEDIA                                                                                                             
   \_   QSPL        QSYS                                                                                                                 
   \_   QSYSSBSD    QINMEDIA                                                                                                             
   \_   QSYSSBSD    QSYS                                                                                                                 
   \_   QSYSWRK     QINMEDIA                                                                                                             
   \_   QSYSWRK     QSYS                                                                                                                 
   \_   QUSRWRK     QINMEDIA                                                                                                             
   \_   QUSRWRK     QSYS                                                                                                                 
   \_   QZSNDPR     QDP4                                                                                                                 
   \_   Q1ABRMNET   QBRM                                                                                                                 
   \_   SFTSMASBS   SUP033120D                                                                                                           
   \_   SMASBS      ISMADTA                                                                                                              
   \_   SMASBS      ISMADTAB                                                                                                             
   \_   SMASBS      LD040003                                                                                                             
  More\...                                                                                                                               
  F3=Exit   F12=Cancel                                                                                                                   
  -------------------------------------------------------------------------------------------------------------------------------------- --

 

The display example above is used to illustrate the Display, Change,
Copy and Add functions.

###### Menu Pathways

-   Main Menu \> LSAM management menu (\#6) \> Alternate Job Notify menu
    (\#8) \> option 1 \> option 3=Copy \> F4
-   Main Menu \> LSAM management menu (\#6) \> Alternate Job Notify menu
    (\#8) \> option 1 \> function key F6=Add \> F4

###### Functions

-   **F3=Exit**: Returns to the Alternate Job Notify menu without
    updating the control file.
-   **F12=Cancel**: Returns to the master record display without
    updating the subsystem name or library.

###### Fields

**SBS Name**: The name of the subsystem description.

**SBSD Lib**: The name of the library where the subsystem description is
stored. A subsystem may be described in more than one library location,
however, only one subsystem of that name may be active in the system.

##### View Job Notify Message Log

Three different examples are presented to illustrate the effect of using
function key F11 to change the sort order of the display. Notice the
changes in the column headings. There will be some special log entries
when the JOBNFY servers start and stop.

Alternate Job Notify Log - View 1 of 3 (F11=Sort)

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  [JOBNFY20R1]{style="color: #008000;"}               Display Alternate Job Notify Log       [00/00/00  00:00:00]{style="color: #008000;"}   USERNAME
  Type option, press Enter to continue.
    [Opts:   5=Display   9=WRKJOB]{style="color: #0000ff;"}                  [Search content:]{style="color: #008000;"} [          ]{style="color: #ffcc00;text-decoration: underline;"}          [Log entry time]{style="color: #ff00ff;"}
  Opt  [CCYY-MM-DD-HH.MM.SS]{style="color: #ff00ff;"}  Job Name   Job User   JobNbr  Job Queue  JOBQ Lib       \_   2013-03-26-09.57.42  SMANTFYTST JSMITH     079864
   \_   2013-03-26-09.58.31  ANYJOBNAME JSMITH     079865
   \_   2013-03-26-09.59.53  ZJOBLAST   JSMITH     079866
   
   
   
  Bottom
  F3=Exit   F5=Refresh   F11=Sort   F12=Cancel   F17=Top   F18=Bottom
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Alternate Job Notify Log - View 2 of 3 (F11=Sort)

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  [JOBNFY20R1]{style="color: #008000;"}               Display Alternate Job Notify Log       [00/00/00  00:00:00]{style="color: #008000;"}   USERNAME
  Type option, press Enter to continue.
  [  Opts:   5=Display   9=WRKJOB]{style="color: #0000ff;"}                 [Search content:]{style="color: #008000;"} [          ]{style="color: #ffcc00;text-decoration: underline;"}          Log entry time
  Opt  CCYY-MM-DD-HH.MM.SS  [Job Name]{style="color: #ff00ff;"}   Job User   [JobNbr]{style="color: #ff00ff;"}  Job Queue  JOBQ Lib       \_   2013-03-26-09.58.31  ANYJOBNAME JSMITH     079865
   \_   2013-03-26-09.57.42  SMANTFYTST JSMITH     079864
   \_   2013-03-26-09.59.53  ZJOBLAST   JSMITH     079866
   
   
   
  Bottom
  F3=Exit   F5=Refresh   F11=Sort   F12=Cancel   F17=Top   F18=Bottom
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Alternate Job Notify Log - View 3 of 3

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  [JOBNFY20R1]{style="color: #008000;"}               Display Alternate Job Notify Log       [00/00/00  00:00:00]{style="color: #008000;"}   USERNAME
  Type option, press Enter to continue.
  [  Opts:   5=Display   9=WRKJOB]{style="color: #0000ff;"}                  [Search content:]{style="color: #008000;"} [          ]{style="color: #ffcc00;text-decoration: underline;"}   [     Job end time (DESC)]{style="color: #ff00ff;"}
  Opt  [CCYY-MM-DD-HH.MM.SS]{style="color: #ff00ff;"}  Job Name   Job User   JobNbr  Job Queue  JOBQ Lib       \_   2013-03-26-09.59.53  ZJOBLAST   JSMITH     079866
   \_   2013-03-26-09.58.31  ANYJOBNAME JSMITH     079865
   \_   2013-03-26-09.57.42  SMANTFYTST JSMITH     079864
   
   
   
  Bottom
  F3=Exit   F5=Refresh   F11=Sort   F12=Cancel   F17=Top   F18=Bottom
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

###### Menu Pathways

Main Menu \> LSAM management menu (\#6) \> Alternate Job Notify menu
(\#8) \> option 2

###### Options

-   **5=Display**: Shows all the information for a single log entry.
-   **9=WRKJOB**: If the user has authority to the IBM i command WRKJOB,
    this option provides access to details about the job named in the
    log entry.

###### Functions

-   **F3=Exit**: Returns to the Alternate Job Notify menu.
-   **F5=Refresh**: Rebuild the list after reading the log file again,
    may find new records.
-   **F11=Sort**: Rotates the sort order of the list display among three
    different sort sequences (refer to examples above).
-   **F12=Cancel**: Returns to the Alternate Job Notify menu.
-   **F17=Top**: Move directly to the top of the list display.
-   **F18=Bottom**: Move directly to the bottom of the list display.

###### Fields

-   **Opt**: An input field where one of the supported option numbers
    may be typed.
-   **Log Entry Time (CCYY-MM-DD-HH.MM.SS) -- view 1 of 3**: The time
    stamp when the log entry was written to the file. The list is
    presented with the Log time stamp in ascending order, with the
    oldest entry showing first; use F18 to see the most recent log entry
    at the end of the file. Use option 5=Display to see the microseconds
    of the time stamp.
-   **Job end time (DESC) (CCYY-MM-DD-HH.MM.SS) -- view 3 of 3**: The
    time stamp when the job actually ended. (DESC) indicates that the
    date/time values are listed in descending order, with the most
    recent date first. Use option 5=Display to see the microseconds of
    the time stamp.
-   **Job Name**: The IBM i job name. When the list is sorted in Job
    Name order, the Job Number is used as a secondary sort field.
-   **Job User**: The user profile name from the IBM i job ID.
-   **Job Name**: The IBM i job name.
-   **JobNbr**: The IBM i job ID serial number. When the list is sorted
    Job Name order, the Job Number is used as a secondary sort field.
-   **Job Queue**: The name of the IBM i job queue does not normally
    appear. This field is included by the IBM i exit point operation,
    and it becomes important for log entries of jobs that were ended
    while being held in a job queue, before the job actually started.
    The IBM i LSAM Job Notify function does not use this type of exit
    point transaction, it only uses type 0002 for jobs that end after
    being active.
-   **JOBQ Lib**: The IBM i library name where the Job Queue is located.
    (Not used by the LSAM Job Notify function at this time.)

##### Job Notify Message Log Details

-   **Screen Title**: Display Alternate Job Notify Log Entry
-   **Screen ID**: JOBNFY20R5

###### Menu Pathways

Main Menu \> LSAM management menu (\#6) \> Alternate Job Notify menu
(\#8) \> option 2 \> option 5

###### Functions

-   **F3=Exit**: Returns to the Alternate Job Notify menu.
-   **F12=Cancel**: Returns to the log list display.
-   **F21=WRKJOB**: If the user has authority to the IBM i command
    WRKJOB, this function key provides access to details about the job
    named in the log entry.

###### Fields

-   **Log time stamp**: The time stamp when the log entry was written to
    the file, as the data was converted from the original data queue
    message that the IBM i exit point processing had generated.
-   **Primary key number**: An internal database number that uniquely
    identifies each log entry. This value could be useful for technical
    support purposes.
-   **Job identifier**: The IBM i job ID, including the serial number,
    user name and job name.
-   **Job queue name / library**: The name of the IBM i job queue does
    not normally appear. This field is included by the IBM i exit point
    operation, and it becomes important for log entries of jobs that
    were ended while being held in a job queue, before the job actually
    started. The IBM i LSAM Job Notify function does not use this type
    of exit point transaction, it only uses type 0002 for jobs that end
    after being active.
-   **Message identifier / format**: These are internal use only fields
    generated by the IBM i exit point processing. The information could
    be useful for technical support purposes. Format 01 indicates a Job
    End message, whereas format 02 indicates a Job Queue Entry message.
-   **Job type**: The job type value is generated by the IBM i exit
    point processing. The meaning of each type value is displayed to the
    right.
-   **Job sub-type**: The job sub-type value is generated by the IBM i
    exit point processing. The meaning of each sub-type value is
    displayed to the right.
-   **Time job entered system**: The time stamp when the IBM i operating
    system first recognized the job. For most jobs, this is the time
    when the job was first added to a job queue.
-   **Time job started**: The time stamp when the job became active,
    such as, when it was released from a job queue and the subsystem
    allowed job processing to begin.
-   **Time job ended**: The time stamp when the job completed
    processing. This would be the same time as reported by the normal
    job completion message. This is also approximately the time when the
    exit point processing generated the data queue entry which was later
    converted by the IBM i JOBNFY server into this log entry.
-   **Processing time used**: The number of milliseconds of actual CPU
    time required to process the job.
-   **Job end severity code**: The IBM i message ID CPF1164 in the
    QCPFMSG message file lists the possible values for this field. A
    zero value is recognized by the LSAM Job Notify server as a normal
    job completion, in case JOBNFY discovers it must report the job
    completion status to OpCon. Non-zero values are reported as job
    failures to OpCon.

## Operation of IBM i Automation

This document section provides a high level survey of concepts and of
the steps required for OpCon to manage work in the IBM i operating
system. It summarizes how to prepare jobs to run in the IBM i system and
it also provides a guide for diagnosing job failures.

 

The OpCon server application controls work using schedules that are
guided by calendars and other date and time parameters, as well as by
job and resource dependencies. It also includes many capabilities for
responding to events that are generated within the operating systems
that it controls. However, this section of documentation is focused on
the job start process as it applies to IBM i. The OpCon **Concepts**
online help provides in-depth information about all of the other OpCon
capabilities that surround the task of starting jobs.

### The OpCon Job Start Process

Beyond the basic functions of an OpCon Schedule and all the control
mechanisms in OpCon that govern when a job may be started, this document
focuses on the elements that are unique to the IBM i operating system.
It provides a check list of activities that must be completed in order
to successfully execute IBM i jobs.

#### Overview of Managing IBM i Jobs

The OpCon **Concepts** online help provides illustrations and
instructions for creating the job master records that can start jobs in
the IBM i system. This summary of steps does not repeat OpCon
documentation about how to build and execute schedules of jobs. Here are
the critical steps that are required in order for an IBM i job to run:

1.  The IBM i LSAM environment (defined by an IBM i library list, within
    a given IBM i partition) must be registered in an OpCon machine
    master record, using a machine name that matches the name entered in
    the IBM i LSAM Parameters (LSAM main menu, option 7). Only one copy
    of the Agent is required to automate an IBM i partition, however, it
    is allowed to have more than one copy of the Agent installed (in
    case there is only one IBM i partition and a test LSAM environment
    is desired).
2.  The IBM i LSAM server jobs must be active when it is time for OpCon
    to connect and monitor jobs. This can be accomplished by using the
    LSAM sub-menu 6, option 1, and it can also be accomplished by any
    means that supports executing IBM i commands, using the LSAM command
    STRSMASYS (refer to [Commands and     Utilities](Commands-and-Utilities.md)).
3.  It is necessary to register all the IBM i user profiles who will be
    assigned to IBM i job master records. Follow the OpCon Concepts
    instructions for completing this task. These user profiles require
    permission to run jobs in the IBM i machine (they are granted
    authority to use the OpCon machine master record).
    -   If the IBM i LSAM server job user profile SMANET does not retain
        its default \*ALLOBJ authority, then it would also be necessary
        to grant SMANET the authority to \*USE each of these same user
        profiles that will run IBM i jobs.
4.  Create a job master record in an OpCon schedule. In addition to the
    standard OpCon schedule and job definition requirements, the
    following job parameters that are unique to IBM i jobs require
    special attention:
    a.  Select the job type of IBM i. The lower portion of the job
        master record will change to match IBM i job requirements.

    b.  Select the IBM i machine name where the job will execute.

    c.  When typing the Job Name, consider how the IBM i Agent uses the
        OpCon job name as it creates an IBM i job name. Older versions
        of the Agent required that the OpCon job name begin with an
        alphabetic character. However, since Agent version 04.00.03, PTF
        level 403299, the Agent will now accept any format from the
        OpCon job name, including starting the name with numeric digits
        (as some users like to add an expected start time at the start
        of a job name to control the sort order of the OpCon List
        display, such as: \'12:34 Noon \# 2 posting job\'). The Agent
        removes any leading characters from the job name until an
        alphabetic character is found, it removes spaces and other
        invalid job name characters, it translates all alphabetic
        characters to upper case and then it truncates the name length
        to the maximum allowed by IBM i of ten characters. As a result,
        the example OpCon job name would become this IBM i job name:
        NOON2POSTI. SMA suggests a possible standard for IBM i job names
        that would include a full ten characters of the expected IBM i
        job name at the start of the OpCon job name, and then the
        remaining OpCon job name characters can include any form of
        description. For example: \'12:34 GLNOONPOST Noon \# 2 posting
        job\' would result in the IBM i job name of: GLNOONPOST.

    d.  Use the IBM i drop-down list to select the IBM i Job Type value.
        For example, Batch Job is selected when the job will perform a
        simple program call.

    e.  Select a job user from the drop-down list of users authorized to
        this IBM i machine.

    f.  Specify the Job Description Name and Library.

    g.  Many of the other fields that can be used to refine the IBM i
        job definition will start with a default value of \*JOBD. This
        means they will tell the IBM i LSAM to use whatever value is
        specified in the named Job Description. Therefore, the easiest
        way to prepare for automating IBM i jobs is to be familiar with,
        or to create, IBM i job descriptions that are appropriate for
        each application. Execution of IBM i LSAM utility commands can
        use the LSAM job description SMADTA/SMALSAJ00, but the job queue
        (previously labeled \"batch queue\" on the OpCon job master
        record) could be changed if the batch job should not run in the
        same subsystem as the IBM i LSAM server jobs.

    h.  Under the Job Information tab of the job master record, complete
        the Call Information box requirements. This box format will vary
        depending on the IBM i Job Type selected. For the simple Batch
        Job, type into the Call field either a library-qualified command
        or the CALL command and a program name that will be called.
        Include command or program parameters as necessary. The
        Configuration topic of this online help provides information
        about additional, specialized command line parameters that are
        supported only by OpCon and the IBM i LSAM, in order to enable
        advanced automation features for a job.

    i.  Consider using the Variables tab to send data values from OpCon
        to the Agent, if they are needed by the command or program
        executed by this job. The name of an IBM i LSAM Dynamic Variable
        is typed into the Variable Name field, and in the Value field it
        is possible to type an absolute value or to insert an OpCon
        Property \[\[token\]\]. The key combination of CTRL + T opens a         window that shows registered and system-defined OpCon Properties
        which can be selected and inserted as the Value. Click the "Add"
        button on the right to add entries to the list of Variables. The
        Variables stored in this table are updated by the Agent before
        the job is actually submitted, which means that an LSAM Dynamic
        Variable {token} could be included in the Call command line, as
        well as making the Dynamic Variable value available anywhere
        else within the IBM i partition. Refer to the OpCon Concepts
        about Job Details of IBM i jobs for additional information about
        the special \$\@KEYWORD variables that can be used to enhance
        the performance of File Arrival jobs. These \$\@VARIABLES can be
        entered as the Variable name and the Value column is then used
        to set the command keyword value. \$\@KEYWORD variables are
        supported for both the File Arrival Job Type, as well as for the
        LSAM's CHKFILE and CHKIFSFIL commands that can be used for a
        similar purpose from the Batch Job Job Type.

    j.  Save the OpCon job master record.

    k.  Assign an OpCon Frequency to the job. For test jobs, consider
        assigning a unique, new frequency to the job that uses the On
        Request option, and then select the current date as the On
        Request date. This is one way to enable a manual build of the
        test job without affecting any other job or schedule.

    l.  This completes basic job master definition.
5.  Jobs that will be repeated on a regular schedule are typically built
    in advance by the OpCon job builder function, as daily schedules are
    created. For test purposes when the IBM i LSAM is first set up, it
    is possible to manually request an immediate build of a job, so that
    the job can be executed on demand.
6.  After a job completes or fails, the IBM i LSAM will report a job
    status back to the OpCon server, and the status may be observed in a
    display of jobs within an OpCon schedule. In cases of failure, there
    is a difference between jobs that failed to start, versus jobs that
    failed during execution. The procedure for diagnosing job failures
    is discussed below, in a following section.
7.  After a test job completes or fails, it is possible to restart the
    job from the OpCon display of the job status, using a right mouse
    click and selecting the Restart option from the context menu that
    appears. When necessary, to correct the cause of a failure, it is
    possible to make corrections to \"daily\" jobs that are on the
    active schedule and/or to the permanent job master record.

#### Configuring the IBM i LSAM Automation Features

The IBM i Agent for OpCon includes many automation tools that are unique
to the IBM i operating system. Some of these tools can be executed
directly within IBM i batch jobs by OpCon, while other of the tools
require pre-configuration using the LSAM menu system.

 

Tools that require pre-configuration include, for example, Operator
Replay scripts. In this case, after script steps have been defined, the
OpCon job master record is configured especially for the \"Operator
Replay\" IBM i job type, and the script name is entered into the Script
field (same location as the Call field) under the Call Information tab
of the job master record.

 

Other IBM i Agent automation tools, such as the Message Management
facility, operate autonomously. That is, they are configured to detect
and respond to events or circumstances that arise within the IBM i
system. When profiled (pre-configured) events are detected, the IBM i
LSAM server jobs typically notify the OpCon server so that OpCon can
provide and appropriate response. In some cases, as the IBM i Agent
generates OpCon Event commands, this can cause new jobs and schedules to
be built and executed. For this type of purpose, the event response jobs
are predefined within the OpCon master files, but they are not built (in
the daily schedule) or executed unless a signal is received from the IBM
i LSAM.

 

Most of this **IBM i LSAM** online help is devoted to instructions for
configuring the Agent-specific automation tools. When choosing a
strategy for configuring these tools, remember that although the IBM i
Agent tools are able to conduct many activities autonomously, it is
usually the best strategy to engage the central OpCon server in any
event response. By this means, the OpCon server is able to maintain a
more complete history of the IBM i system activity, and it often
provides more powerful and comprehensive response mechanisms than are
available within the IBM i environment itself.

### Guide to Job Failure Diagnosis

The procedure for diagnosing the cause of failure varies depending on
whether a job failed to be started or it failed during execution after
it started.

 

Failing to start is a type of problem that usually occurs only during
the early days of using the OpCon product and the IBM i Agent, when the
user is not yet familiar with all the aspects of job automation. Common
causes of this type of failure include missing authorities that must be
granted within the IBM i system. Jobs that fail to start will not have
an IBM i job log report, so other means must be employed to research the
problem. The procedures and tools in this section will help the user to
quickly identify and correct the cause of the failure.

 

When a job has started, but it then fails during execution, the IBM i
Agent will normally report details about the failure to OpCon, and the
OpCon job icon (in any of the various OpCon daily schedule views)
typically shows IBM i message IDs that identify the type of failure.
Often there is a message ID generated by the IBM i LSAM, followed by
another message ID that the LSAM was able to retrieve from IBM i
information about the job failure. This section provides instructions
for convenient ways to obtain more information about the cause of the
job failure. In many cases it is possible to obtain accurate information
directly from the OpCon Enterprise Manager user interface.

#### OpCon Tools Explaining Job Failures

These are the OpCon tools that provide a convenient starting point for
diagnosing job failures. Using these tools, the user may quickly
identify which type of failure has occurred (failed to start, or failed
during execution). In the case of failure during execution, these tools
often provide all the information that is necessary to accurately
identify the cause of the failure.

 

OpCon Job Completion Codes

 

From any view of an OpCon schedule, jobs that have failed are presented
with a unique color code. The default would be red, but users may define
their own color codes.

 

Jobs that failed in the IBM i system will show one or two IBM i message
IDs. The first message ID will have the format of SMA0000, where the
zeros will be some unique number that may help identify the general
category of the failure. Most of these message IDs are defined in a
table of common failure codes included in Machine Messages of this
online help. However, if the table and/or user experience does not make
the meaning of the message ID clear, more information may be available
from the IBM i message secondary (or Help) text. To view the secondary
message text, execute this IBM i command:

DSPMSGD SMA0000 SMADTA/SMAMSGF

 

(where the 0000 is replaced by an actual message ID number).

 

The second message ID that is frequently appended to the OpCon job
completion code is an IBM i system message that the IBM i Agent has been
able to retrieve from information about the job failure. Its format
would typically be CPF0000, where the zeros are replaced by some digits
and/or characters (A-E). Since these message may vary widely, detailed
information about the messages can be obtained first by viewing the
primary message text that is stored in the OpCon Job Detailed
Information (refer to next topic), and then, if necessary, by viewing
the secondary message text using the IBM i DSPMSGD command (as above,
except that the message file is usually QSYS/QCPFMSG).

 

Before connecting to an IBM i console to view message details, problems
may be solved by using the following additional tools that are available
from the OpCon EM user interface.

##### OpCon Job Detailed Information

The IBM i Agent always tries to obtain and send up to the OpCon server
the primary text that explains each message code appearing in the short
job completion message code. To find this information, use a right mouse
click on the OpCon daily job icon to launch the daily job context menu.
Select \"Job Information\" from the top of the context menu, using a
left mouse click. A new Job Information window will appear.

 

In the Job Information window, left mouse click on the tab on the far
right side, near the middle of that side, labeled \"Configuration.\"
This causes the lower half of the display to change, showing another
range of information tabs. The default display shows the \"Operations
Related Information\" tab. Under this tab there is a column labeled
\"Description,\" and in that column the lower entry is called \"Detailed
Job Messages.\" If the Value to the right shows a number greater than
zero, there are message details that can be viewed. In that case, left
mouse click on the plus (+) sign to reveal a list of messages.

 

The text that shows (when available) is the IBM i primary message text.
The IBM i LSAM may have retrieved this message text from the IBM i
message file, and therefore it will often not contain replacement values
for any variables included in the message text. But the description of
the message ID is usually very helpful.

 

For jobs that did start, but failed during execution, more information
about the failure messages is usually available from the IBM i job log
report, which can be accessed directly from the EM user interface using
the following procedure.

##### OpCon View Job Output Tool

OpCon supports direct access to the job log of IBM i jobs, from the EM
user interface. To see a job log report, use a right mouse click on the
OpCon daily job icon to launch the daily job context menu. Select \"View
Job Output\" from the context menu, using a left mouse click. A new
window will appear, but it will not show any information for one or more
seconds because it is waiting for the IBM i Agent to fetch control
information about the job log report.

 

The IBM i Agent supports access to the job log of active jobs, as well
as to the job log report (spool file) for completed jobs\...if the job
was configured to produce a job log report.

 

After the job output list window displays a line of control information,
it will become apparent if there is job log information available for a
job. When it appears that there is job log information, use a double
click on the left mouse button to request a view of the job log report.
This will cause a second new window to open, and again there will be a
brief pause while OpCon waits for the IBM i Agent to fetch the actual
job log information.

 

When the job is in a job queue or still active, the job log report will
be incomplete, although it will reflect all job activity up to the point
where the Agent requested the report. Information from an active job
would be very useful if OpCon shows that the job is stuck, for example,
displaying the characters \"MSGW\", which means the job is stuck in a
Message Wait status. This usually means that an error has occurred, and
that the job has sent a message to the IBM i system operator message
queue or to a user message queue, requiring a reply before the job can
continue or end in a failed status.

 

The level of detail that appears in job logs depends on the log level
controls that were defined for the job, usually in the IBM i job
description. It is possible to use the OpCon job master record for IBM i
jobs to change the settings that control the job logging level. These
job definition fields are under the second tab (from the left) in the
IBM i specific job master information.

 

The notepad-style view of the IBM i job log can be scanned for key
characters. Usually the job completion codes, or intermediate job status
code, would be used as the search argument. If the IBM i message ID is
found in the job log, the log report would typically provide more
detailed information about the message itself. It is also important to
examine messages that appear in the job log report just before (above)
the final status message ID, because IBM i often logs additional
information about errors by sending multiple messages to the log.

#### IBM i LSAM Tools to Diagnose Job Failures

This discussion explains the steps that may be taken to locate IBM i
message information that will explain errors occurring in IBM i jobs.
Sometimes these tools can provide additional information that helps to
explain the failure of a job that was executing, but normally the OpCon
tools above lead to a correct diagnosis of the cause for active jobs
failing. Therefore, this series of diagnostic steps is most appropriate
for discovering the reason that OpCon was not able to start a job.

 

Unless experience leads the user more directly to a source of
information, the following steps should be followed in the sequence
presented, in order to identify the reason why a job could not be
started.

 

When a job could not be started, the OpCon diagnostic tools above can be
consulted, but they will usually not provide enough information to
explain the exact cause of failure to start. Also, there will not be any
IBM i job log report for a job that was not started.

##### IBM i LSAM Logging Options

In order to use the following procedures, it is necessary to have
activated the IBM i LSAM logging features. As of this version of the
online help, new installations of the LSAM software will have the normal
logging features turned on by default. However, prior installations had
different default settings, and any LSAM client may have chosen to turn
off LSAM logging.

 

Instructions for using the LSAM logging controls are found in Log File
and Database Management of this online help.

 

When starting LSAM logging, be sure to avoid activating any of the
\"trace logging\". Trace logging generates a large volume of log file
entries, and it is used only by SMA Support technical staff to diagnose
certain very rare problems.

 

The normal LSAM server job logging functions can be started (or stopped)
while the LSAM server jobs are active. If the logging was not active
while an error occurred, it may be necessary to turn on the logging and
then repeat the job start action that generated the error in order to
trap the error information in the LSAM log files. However, the LSAM
server IBM i job logs are not controlled by the LSAM's own debug/audit
logging feature.

##### The IBM i LSAM Submitted Job Log

The IBM i Agent always logs information about each job start request
that it receives from OpCon into a file named LSALOGF30. The LSAM menu
system provides a log viewer that makes it easy to find and open this
file for viewing. (In a pending LSAM enhancement, the viewer for this
file will also offer improved log record interpretation, but the current
log file contents are always text that is well formatted and easy to
read.)

 

Upon entering the LSAM menu system, select sub-menu 6: LSAM Management.
Choose option 5: View LSAM Logs. From the list of log viewers, select
option 4: Display LSAM submit job log. This does not refer to the IBM i
job log report, but to the log file where the LSAM stores images of the
SBMJOB commands that it assembles, along with other information messages
about the job status.

 

The current log viewer program is the IBM i command DSPPFM (display
physical file member). The list display of log records is supported by
navigational function keys that can move the display to the bottom (most
recent entries) of the list, and also to change the window of the record
view, so that moving the display to the right will show a continuation
of a long log entry. There are also control fields at the top of the
display to help control the position of the view, and to search the file
content for key words.

 

For a recent error, it is usually helpful to use F18=Bottom, which jumps
to the most recent entries in the log file. Sometimes it is necessary to
page up in order to find information about the job name being
researched.

 

It can be important to examine the SBMJOB command string that the LSAM
job scheduler has recorded in this log file. Often, jobs will fail to
start because of errors in the SBMJOB parameter values. While these
command parameter values are derived directly from the OpCon job master
record, a combination of IBM i rules might produce an unexpected result
in the format of the SBMJOB command.

 

In addition, if there is any error during the actual process of
submitting a job, the LSAM will retrieve the failure message and add an
error entry to the log file just under the SBMJOB command image.
Unfortunately, the final failure message that IBM i reports to the LSAM
server job is often only a conclusion, and it does not provide enough
detail to understand the true cause of the error. However, in this case,
the next step will reveal that actual cause of failure.

##### The LSAM Job Scheduler's Job Log

Detailed messages that may be generated when the IBM i LSAM tries to
submit a job for OpCon will be recorded in the active job log of the
LSAM server job named TXMMNG. In some cases, clients may have changed
the LSAM server job description (SMADTA/SMALSAJ00) in order to reduce
job log entries for these server jobs, but the default setting for the
job log level would normally allow error messages to appear in the
server job's job log.

 

To view the active job log of the LSAM job scheduler server job, enter
the LSAM menu system and choose sub-menu 6: LSAM Management. Select menu
option 3: Check LSAM status. This option will display the IBM i list of
jobs that are active in the LSAM subsystem (default name SMASBS). Look
for the job named TXMMNG and type option 5 next to that job, then press
Enter to see the IBM i Work with Job menu for that job.

 

From the Work with Job menu, select option 10 to view the active job
log. When the job log list display appears, press F10=Detailed messages
to reveal all the message detail in the job log. Then press F18=Bottom
to jump down to the most recent entries in the job log. It may be
necessary to use the Page Up function key in order to find information
about the job being researched, especially if the LSAM is very active.

 

When an OpCon job for IBM i has failed to start, the details about what
caused the failure usually appear in one or more messages within the
active job log of the IBM i LSAM server job TXMMNG. For example, during
early days of using the OpCon product, it is common that some user
profile does not have authority to use certain IBM i objects required
for the job to run. Another common error is that the library list of the
job is incorrect, so that the program to be called will not be found.
These are the kinds of detail that will be revealed in the TXMMNG job
log, and once the error is identified it is very easy to fix the problem
and restart the failed job from the OpCon EM user interface.

##### The IBM i LSAM Job Scheduling Communications Log

Despite the effectiveness of the steps above in identifying errors,
there are rare cases when the true cause of the error is not a problem
with user configuration of an OpCon job master, but instead some problem
might be occurring in the communication between the OpCon SAM (schedule
activity monitor) and the IBM i LSAM.

 

For example, in non-U.S. client sites, some clients have discovered that
the local language character sets chosen for these two machines are not
being properly translated between the ASCII character set assigned to
the OpCon Windows server, and/or to the EBCDIC character set assigned to
the IBM i server. Character set translation is controlled by options set
in the IBM i LSAM Parameters Configuration, which is option 7 on the
main LSAM menu. This type of error can only be diagnosed by viewing the
hexadecimal content of records exchanged between the two servers, and
that is information that is provided by the LSAM Job Scheduling
Communications Log. (Note: It is not necessary to use the high-volume
\"trace logging\" function to obtain this information from the
Communications log.)

 

To view the Job Scheduling Communications log, enter the LSAM menu
system and select option 6: LSAM Management. Choose option 5: View LSAM
logs. From the list of log viewers, select viewer 1: Display Job Sched
communications trace log.

 

This log file viewer presents a list display that is supported by
function keys and data entry fields that can be used to position the
viewer window, and/or to search for records that apply to the job name
being researched. For example, using F24=More keys reveals the function
keys used to move to the top or bottom of the display, and to change the
viewer window to the right or left of long records. Function keys F10
and F11can be used to change the record view mode to hexadecimal format,
which may be necessary when researching problems with character set
translation. The search field at the top right of the display can be
used to type in the job name, for example, and the F16=Search is used to
find log entries that match the search value.

 

Option 5=Display will branch to a detailed display of each log entry
selected. The detailed log information display is usually supported by
extensive formatting and label or code translations. This makes it much
easier to understand the contents of a log entry, rather than trying to
interpret the log data from the raw list display.

##### Contact SMA Support

When the OpCon and IBM i LSAM procedures above do not reveal the cause
of job errors, clients are encouraged to contact the Support team at SMA
for assistance. SMA can connect clients with experts in OpCon software
and in the IBM i operating system in order to help with the diagnosis.

## Operation Tips and Techniques

This document section provides advice about ways to use OpCon and the
IBM i Agent toolkit to automate IBM i operations. Details about how to
use the IBM i toolkit components referenced in this section may be found
in other topics of this document.

### Monitoring for IBM i Jobs in MSGW Status

This document section offers suggestions about ways that clients of [SMA Technologies]{.GeneralCompanyName} can engage the efficient System i
Navigator Monitors for the purpose of detecting any jobs in the IBM i
operating system that are stuck in MSGW (or other) status. It describes
how to configure a Monitor to generate a message that can be intercepted
by the IBM i LSAM Message Management facility, from which many forms of
notification and response can be generated, including OpCon Event
commands.

 

Information included in this section about IBM tools and software is
provided as convenience, and use of this information is at the risk of
the user. [SMA Technologies]{.GeneralCompanyName} endeavors to offer useful information, but it makes no warranty of any kind, explicit or
implied, regarding resources from other providers. However, SMA is
interested in further collaboration with its clients towards the end of
improving the capabilities of OpCon and its IBM i Agent (LSAM).

#### General Implementation Outline

The strategy suggested by this document is to configure and start an IBM
i Monitor, using the System i Navigator. If a Monitor is defined to
watch for a job status of \"MSGW\", any job detected with this status
can trigger generation of a readily identifiable message that can be
sent to QSYSOPR or any other message queue. Subsequently, an IBM i LSAM
Message Management Parameter record can be configured to recognize this
unique message, and attached Capture Rules and Response Rules can
capture and communicate specific information about the job.

 

The general purposes anticipated by this suggested strategy include:

1.  The client operations staff and/or administrators can be
    aggressively notified when any jobs are stuck in the MSGW status.
2.  As each MSGW event is detected, the client may wish to implement new
    Message Management rules that can answer and/or respond to the
    specific messages that are discovered during follow-up research that
    is initiated by each Monitor event.
3.  As a result, there should be fewer jobs that are actually stuck,
    since the IBM i LSAM and OpCon can answer inquiry messages and
    possibly also initiate self-healing procedures to recover from the
    anticipated error condition.

The activities required to implement this strategy include:

1.  Define one or more new System i Navigator Monitors.
2.  Add a specifically formatted message generation event to the
    Thresholds defined within the Monitor.
3.  Add an IBM i LSAM Message Management Parameter that corresponds to
    each new message defined in the Monitor(s).
4.  Define Capture Rules linked to the Message Management Parameters
    that can capture identifying information from the triggered Monitor
    message.
5.  Define Response Rules linked to each Capture Rule that will:
    a.  Store the message identifying information into LSAM Dynamic
        Variables.
    b.  Generate any form of Notification Event, typically via OpCon
        using the OpCon External Event commands supported by the LSAM's
        CPYTOMSGIN command.

#### Configuring System i Navigator Monitors

Here is the set of general instructions provided by IBM for adding a new
monitor. The instructions are adapted to this specific case, of watching
for jobs that get stuck in the MSGW status.

 

Creating a new monitor is a process that begins at the New Monitor
window. In System i Navigator:

-   Expand Management Central.
-   Expand Monitors.
-   Right-click the type of monitor you want to create (for example,
    Job).
-   Click New Monitor.

Adding an IBM i Monitor

![Adding an IBM i Monitor](../../../Resources/Images/IBM-i/6_5.png "Adding an IBM i Monitor"){.flat}

After you have given your new monitor a name, the next step is to
specify what you want to monitor. Since you are creating a job monitor,
you will select which jobs you want to monitor. Be careful to monitor
the smallest number of jobs that will give you the information you need.
Monitoring a large number of jobs may have a performance impact on your
system.

 

You can specify jobs by their job name, job user, job type and
subsystem. When specifying job name, job user and subsystem, you can use
an asterisk (\*) as a wildcard to represent one or more characters.

 

When multiple job selection criteria are specified, all jobs matching
any of the criteria are monitored.

##### Selecting the Metrics

For each type of monitor, Management Central offers several
measurements, known as metrics, to help you pinpoint different aspects
of system activity. A metric is a measurement of a particular
characteristic of a system resource or the performance of a program or a
system.

Assigning Monitor Metrics

![Assigning Monitor Metrics](../../../Resources/Images/IBM-i/6_6.png "Assigning Monitor Metrics"){.flat}

In the example above, the top half of the display shows that "Job
Status" was selected from the list on the left, then clicking the
Add\--\> button moved it to the "Metrics to monitor" box on the right.

 

Notice that the "General" tab is selected, under the "Job Status" title
in the middle of the display. In this lower half of the display,
"Waiting for message" is the type of Job Status that was selected from
the list on the left and then clicking on the lower Add\--\> button
moved it into the "Selected statuses" box.

##### Specifying the Threshold Values

Setting a threshold for a metric that is being collected by a monitor
allows you to be notified and, optionally, to specify actions to be
taken when a certain value (called the *trigger value*) is reached. You
can also specify actions to be taken when a second value (called the
*reset value*) is reached.

 

Threshold values are not specified for this example. Instead, use the
Threshold run command, as follows.

 

##### Specifying Threshold Run Commands

A *threshold* is a setting for a metric that is being collected by a
monitor. *Threshold commands* run automatically on your endpoint system
when threshold events occur. Threshold commands are different from any
threshold actions you may have set. Threshold actions happen on your PC
or central system, while threshold commands run on your endpoint
systems.

Entering Monitor Threshold Trigger Command

![Entering Monitor Threshold Trigger Command](../../../Resources/Images/IBM-i/Entering-Monitor-Threshold-Trigger-Command.png "Entering Monitor Threshold Trigger Command"){.flat}

In the specific example above, now the "Status Threshold" tab has been
clicked, and then the box "Trigger when job is in any selected status"
was checked.

 

+----------------------------------+----------------------------------+
| ![White pencil icon on green     | **EXAMPLE:** [The example        | | circular                         | command text that is suggested   |
| background](../../../Reso        | by this document looks like      |
| urces/Images/example-icon(48x48) | this:]{.statement2}              |
| .png "Example icon") |                                  |
|                                  | SNDMSG MSG(\'SMA5802 message     |
|                                  | generated by iSeries Navigator   |
|                                  | Monitor for job in MSGW status:  |
|                                  | &JOBNUMBER/&JOBUSER/&JOBNAME\')  |
|                                  | TOUSR(\*SYSOPR)                  |
+----------------------------------+----------------------------------+

 

You can specify any message text you wish, but keep in mind the
following guidelines:

a.  The Navigator Monitor will not be using a Message ID for this
    message that is sent to the QSYSOPR message queue, therefore, a
    special identifier string of "SMA5802" appears in the first position
    in order to make it possible for the LSAM Message Management system
    to accurately identify this message using the Primary message text
    comparison rules.
b.  There is a table of supported variable fields, such as &JOBNAME,
    listed below in this document section. For this example, probably
    only the job identifier variables will be useful, although the
    Subsystem name could be added. Assembling these variables at the
    very end of the Primary message text will make it easy to define the
    LSAM Message Data Capture Rule that can pick out the job ID
    information (which will be 28 characters long, at the most) so that
    it can later be stored by a linked Response Rule into an LSAM
    Dynamic Variable.

##### Specifying the Collection Interval

When you are setting thresholds for the metrics you have selected to
monitor, you should consider how often you want the data to be
collected. The lowest value of 30 seconds would provide the most
aggressive possible response to any job stuck in MSGW status.

Specifying Monitor Collection Interval

![Specifying Monitor Collection Interval](../../../Resources/Images/IBM-i/6_13.png "Specifying Monitor Collection Interval"){.flat}

##### Specifying Event Logging and Actions

When you have specified the threshold values for your monitor, you can
click the Action tab to select event logging and the PC actions to be
taken when a threshold is triggered or reset.

 

This aspect of Monitors is not required for this example. You can
research this topic using IBM documentation and decide if it will be
useful for you.

##### Applying Thresholds and Actions for a Monitor

When you have specified your threshold values and chosen to log events,
you can select whether to always apply these thresholds and actions, or
to apply them only on the days and times you choose.

 

Click the "OK" button to complete the registration of a new monitor.
When you are ready for the monitor to start working, use a right mouse
click on the monitor line and then a left mouse click on the "Start"
option. (Refer to an example of the Monitor management window in the
following section.)

Managing the Monitor Status

![Managing the Monitor Status](../../../Resources/Images/IBM-i/6_14.png "Managing the Monitor Status"){.flat}

#### IBM i LSAM Configuration

All of the instructions for adding LSAM Message Management Parameters,
Capture Rules and Response Rules are provided in the **IBM i LSAM**
online help.

 

Here is an example of how the QSYSOPR message queue might look after a
job is stuck and the Navigator Monitor has triggered the event message:

IBM i Warning Message Example for Job in MSGW Status

![IBM i Warning Message Example for Job in MSGW Status](../../../Resources/Images/IBM-i/6_15.png "IBM i Warning Message Example for Job in MSGW Status"){.flat}

Position the cursor over the message that shows \"SMA5802\" in the text,
then press the Help key (F1, or ALT+F1) and then pressing F9 to see
that:

-   The message with "SMA5802" in the text does not have a Message ID.
-   The job that generated this message is an IBM i server job named
    QZRCSRVS, and not the original job that is stuck in MSGW status.

Here is an example of the Message Management Parameter that will be able
to detect the Monitor message defined above:

Message Management for Job MSGW Trigger Message

![Message Management for Job MSGW Trigger Message](../../../Resources/Images/IBM-i/6_16.png "Message Management for Job MSGW Trigger Message"){.flat}

In the example above, the IBM i server job name of QZRCSRVS could be
used in the Job Name field, however, the Compare Text should be a unique
string.

+----------------------+-------+-----------------------------+
| Replacement variable | Notes | Data Substituted            |
+======================+:=====:+=============================+
| &DATE                |       | The Date the monitor        |
|                      |       | triggered or reset as       |
|                      |       | mmddyyyy                    |
+----------------------+-------+-----------------------------+
| &EVENTFUL            |       | Collection interval: How    |
|                      |       | often the monitor collected |
|                      |       | data (in seconds)           |
+----------------------+-------+-----------------------------+
| &MON                 |       | The monitor name            |
+----------------------+-------+-----------------------------+
| &TIME                |       | The time the monitor        |
|                      |       | triggered or reset as       |
|                      |       | hhmmss                      |
+----------------------+-------+-----------------------------+
| &ENDPOINT            |       | The endpoint system name    |
+----------------------+-------+-----------------------------+
| &EVENTTYPE           | 4     | Event type: The type of     |
|                      |       | trigger or reset that is    |
|                      |       | happening defined as        |
|                      |       | follows:                    |
|                      |       |                             |
|                      |       | -   Triggered Event = 1     |
|                      |       | -   Auto Reset Event = 2    |
|                      |       | -   Manual Reset Event = 3  |
+----------------------+-------+-----------------------------+
| &JOBNAME             |       | The job name of the job     |
|                      |       | causing the trigger/reset   |
+----------------------+-------+-----------------------------+
| &JOBNUMBER           |       | The job number of the job   |
|                      |       | causing the trigger/reset   |
+----------------------+-------+-----------------------------+
| &JOBSTATUS           | 7     | The job status causing a    |
|                      |       | trigger/reset               |
+----------------------+-------+-----------------------------+
| &JOBTYPE             |       | The job type of the job     |
|                      |       | causing the trigger/reset   |
+----------------------+-------+-----------------------------+
| &JOBUSER             |       | The job user of the job     |
|                      |       | causing the trigger/reset   |
+----------------------+-------+-----------------------------+
| &METRICTYPE          |       | The category of the metric. |
|                      |       | For a Job monitor the       |
|                      |       | categories are defined as   |
|                      |       | follows:                    |
|                      |       |                             |
|                      |       | -   Status Metric = 10010   |
|                      |       | -   Message Metric = 10020  |
|                      |       | -   Numeric Metric = 10030  |
+----------------------+-------+-----------------------------+
| &METRIC              |       | Metric that has             |
|                      |       | triggered/reset defined as  |
|                      |       | follows:                    |
|                      |       |                             |
|                      |       | -   Job CPU Utilization =   |
|                      |       |     1010                    |
|                      |       | -   Summary Comm I/O = 2040 |
|                      |       | -   Job Logical I/O = 1020  |
|                      |       | -   Summary Transaction     |
|                      |       |     Rate= 2050              |
|                      |       | -   Job Disk I/O= 1030      |
|                      |       | -   Summary Transaction     |
|                      |       |     Time = 2060             |
|                      |       | -   Job Comm I/O = 1040     |
|                      |       | -   Summary Thread Count =  |
|                      |       |     2070                    |
|                      |       | -   Job Transaction Rate=   |
|                      |       |     1050                    |
|                      |       | -   Summary Page Faults=    |
|                      |       |     2080                    |
|                      |       | -   Job Transaction Time=   |
|                      |       |     1060                    |
|                      |       | -   Job Status = 3010       |
|                      |       | -   Job Thread Count = 1070 |
|                      |       | -   Job Log Messages = 3020 |
|                      |       | -   Job Page Faults = 1080  |
|                      |       | -   Summary Job Count =     |
|                      |       |     4010                    |
|                      |       | -   Summary CPU Utilization |
|                      |       |     = 2010                  |
|                      |       | -   Summary Logical I/O =   |
|                      |       |     2020                    |
|                      |       | -   Summary Disk I/O= 2030  |
+----------------------+-------+-----------------------------+
| &NUMCURRENT          | 5     | Current trigger or numeric  |
|                      |       | reset value                 |
+----------------------+-------+-----------------------------+
| &NUMRESET            |       | Threshold value to cause    |
|                      |       | auto-reset of numeric       |
|                      |       | metric                      |
+----------------------+-------+-----------------------------+
| &NUMTRIGGER          | 5 6   | Threshold value to cause    |
|                      |       | trigger of a numeric metric |
+----------------------+-------+-----------------------------+
| &OWNER               |       | Monitor owner               |
+----------------------+-------+-----------------------------+
| &RDUR                |       | Reset duration in intervals |
+----------------------+-------+-----------------------------+
| &RESETTYPE           | 3     | Reset type and defined as   |
|                      |       | follows:                    |
|                      |       |                             |
|                      |       | -   Manual reset = 1        |
|                      |       | -   Automatic reset = 2     |
+----------------------+-------+-----------------------------+
| &SBS                 |       | Subsystem of the job        |
|                      |       | causing the trigger/reset   |
+----------------------+-------+-----------------------------+
| &SERVER              |       | Server type of the job      |
|                      |       | causing the trigger/reset   |
+----------------------+-------+-----------------------------+
| &TDUR                | 5     | Trigger duration in         |
|                      |       | intervals as set in the     |
|                      |       | threshold                   |
+----------------------+-------+-----------------------------+
| &THRESHOLD           |       | Threshold number causing    |
|                      |       | the trigger                 |
+----------------------+-------+-----------------------------+
| &MSGID               | 2     | Message ID causing the      |
|                      |       | trigger/reset               |
+----------------------+-------+-----------------------------+
| &MSGSEV              | 2     | Message severity causing    |
|                      |       | the trigger/reset           |
+----------------------+-------+-----------------------------+
| &MSGTYPE             | 2     | Message type causing the    |
|                      |       | trigger/reset               |
+----------------------+-------+-----------------------------+

: List of Replacement Variables

##### Notes for List of Replacement Variables

1.  Refer to on-line help for additional information. To see Online help
    for a job monitor:
    a.  Left-click the (?) question mark icon on the monitors threshold
        tab window.
    b.  Drag the question mark to the 'OS/400 command' text prompt.
2.  If a monitor is triggered and the user performs a manual reset
    ("Reset with Commands" or "Reset Only"), there is no substitution
    value for the parameter &NUMRESET, &RDUR. It will only have a value
    if the reset is automated.
3.  &MSGID, &MSGSEV, or &MSGTYPE you need to be monitoring the \'Job Log
    Message\' metric - otherwise there is no substitution value for
    these. Additionally, these are only valid in the trigger and reset
    commands of Job Log Messages thresholds.
4.  &RESETTYPE only has a valid substitution value on an OS/400 reset
    command. Constant values are used to determine whether the reset
    type is manual or automated.
5.  &EVENTTYPE is valid for all substitution and has constant values
    that are used to determine the type of monitor event that occurred
    (automated trigger, automated reset, or manual reset). In an OS/400
    trigger command, the value is always the trigger constant; in a
    reset command, it can either be the automated reset or manual reset
    constant.
6.  &TDUR, &NUMTRIGGER, and &NUMCURRENT only have valid substitution
    when a trigger occurs, in the OS/400 trigger command.
7.  &NUMTRIGGER, &NUMCURRENT, and &NUMRESET only have valid substitution
    when a "numeric" metric is being monitored, in the trigger and reset
    commands of numeric metric thresholds.
8.  &JOBSTATUS only has valid substitution when the Job Status metric is
    monitored, in the trigger and reset commands of Job Status
    thresholds.
9.  Job Count metric not valid with: &JOBNAME, &JOBUSER, &JOBNUMBER,
    &JOBTYPE, &SBS, &SERVER, &MSGID, &MSGSEV, &MSGTYPE, AND &JOBSTATUS.
10. Job Log Message metric not valid with: &RDUR, &NUMRESET, &TDUR,
    &NUMTRIGGER, &NUMCURRENT, and &JOBSTATUS
11. Job Status metric not valid with: &NUMRESET, &NUMTRIGGER,
    &NUMCURRENT, &MSGID, &MSGSEV, AND &MSGTYPE
12. The \'Job Numeric Values\' metrics of CPU Percent Utilization,
    Logical I/O Rate, Disk I/O Rate, Communications I/O Rate,
    Transaction Rate, Transaction Time, Thread Count, and Page Fault
    Rate are not valid with: &MSGID, &MSGSEV, &MSGTYPE AND &JOBSTATUS
13. The \'Summary Numeric Values\' metrics of CPU Percent Utilization,
    Logical I/O Rate, Disk I/O Rate, Communications I/O Rate,
    Transaction Rate, Transaction Time, Thread Count, and Page Fault
    Rate are not valid with: &JOBNAME, &JOBUSER, &JOBNUMBER, &JOBTYPE,
    &SBS, &SERVER &MSGID, &MSGSEV, &MSGTYPE AND &JOBSTATUS.
:::

 


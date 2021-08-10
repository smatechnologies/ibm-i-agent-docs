---
lang: en-us
title: Restricted Mode and Multi-Step Jobs
viewport: width=device-width, initial-scale=1.0
---

# Restricted Mode and Multi-Step Jobs

## Restricted Mode and Multi-Step Job Menu

Restricted Mode Menu

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------
   [SYSTEMNAME]{style="color: #008000;"}          RESTRICTED MODE AND MULTI-STEP JOB MENU            [00/00/00]{style="color: #008000;"}    USERNAME                                                               09:15:16
   
   Select one of the following:
   
        1.[ Maintain Restricted mode scripts]{style="color: #008000;"}         2.[ Setup Restricted mode environment]{style="color: #008000;"}
        3.[ Restricted mode history]{style="color: #008000;"}    
        5.[ Maintain Multi-step job scripts]{style="color: #008000;"}         6.[ View Multi-step job log]{style="color: #008000;"}
        7.[ Maintain dynamic variables]{style="color: #008000;"}    
   
  Selection or command
   ===\> \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
  \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
   F3=Exit   F4=Prompt   F9=Retrieve   F12=Cancel
   F13=Information Assistant   F16=System main menu
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------

###### Menu Pathways

Main Menu \> Restricted mode and Multi-step job menu (\#5)

###### Fields

Select or command

###### Options

The options displayed on this menu are explained in the following
sections of this document. Type an option number in the Selection or
command line and press \<**Enter**\> to begin using any of the options.

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
    \<**F3**\> or \<**F12**\>. This function is not commonly used, and
    can be restricted for certain user profiles.

## Restricted Mode Operations

### Setup for Restricted Mode

[Setup Steps to Prepare for Restricted Mode]{.ul} 
1.  Enable the SMASAV user profile using the following command:
    **CHGUSRPRF USRPRF(SMASAV) STATUS(\*ENABLED)**.

2.  In the command line, enter **SMASGPL/STRSMA**. For information on
    STRSMA command parameters, refer to [The STRSMA     Command](Components-and-Operation.md#The).

3.  Enter **5** to choose the **Restricted mode menu** in the SMA Main
    Menu.

4.  Enter **1** to choose **Maintain scripts** in the Restricted Mode
    Menu.

5.  To add a new script, press \<**F6**\> = Add.

6.  Type the New script name (no spaces in name!) in the pop-up window,
    press \<**Enter**\>.

7.  The screen displays the Restricted mode options display, where
    script steps may be added and changed.

8.  Press \<**F6**\> to add new script options (an option is the same as
    a script step) on the Restricted mode options screen.

9.  To change existing option lines, under the **Op** column:
    a.  \<**Tab**\> to the desired option.
    b.  Enter **2** on the line next to the selection.

10. Verify and/or change the available parameters on the options detail
    screen. For information on the Restricted Mode parameters, refer to
    [Restricted Mode Screens and Windows](#Restrict3).

11. Press \<**Enter**\> to commit the changes to the options details.

12. Returning to the list of options, if necessary, type **6** next to
    all the options to be performed and press \<**Enter**\> to set them
    to RDY (ready) status.
    a.  Alternately, enter 3=Hold next to any options that should not be
        performed to set them to HLD status. (Holding options is useful
        for temporary changes to a script, making it easy to restore
        them to RDY \[ready\] status later.) 
13. Return to the Restricted Mode menu using \<**F12**\> (Cancel) or
    \<**F3**\> (Exit).

14. Enter **2** to choose **Setup environment** in the Restricted Mode
    Menu.

15. Position the cursor into the **Environment** field and press
    \<**F4**\> to view a prompting list.

16. Type **1** to select the environment that was created for use with
    Restricted Mode operations.
    a.  If no environment has been created for use with Restricted Mode,
        press \<**F12**\> to return to the main setup screen, and then
        press \<**F6**\> (Add/maint env) to create and environment and
        build a library list. Refer to [LSAM Environment         Management](LSAM-Environment-Management.md#top){.MCXref
        .xref}. Then repeat steps 15 and 16.

17. Enter the number of seconds that are required by the system to fully
    restore the TCP servers after IBM i first starts all subsystems.
    a.  View the System Operator message queue and examine the times on
        the messages after the last IPL to learn how long this takes on
        the system.

18. Press \<**Enter**\> to update the Restricted Mode Environment
    information.
    a.  The maintenance program displays the message:

19. Press \<**F15**\> (Update SMASAV) to proceed to the user profile and
    restricted mode environment update display.

20. Press \<**Enter**\> to perform an update to the restricted mode user
    profile and data area.

21. Press \<**F12**\> (Cancel) or \<**F3**\> (Exit) to return to the
    menu.

22. Complete the configuration of a Job Definition for a Restricted Mode
    Job in the OpCon/xps Enterprise Manager (EM), as described below.

### Special Instructions for Restricted Mode Scripts

Restricted Mode operations require that certain steps be included in a
Script to enable the automatic restoration of a normal system state and
the automatic recovery of LSAM communications with OpCon/xps. In
addition to the required steps, there is also an optional reserved
Script Action code that may be used for user-defined actions to be
performed should a Script fail during its execution. This section also
explains what the system will do in case a Script should fail to execute
normally.

#### Steps Required in a Restricted Mode Script

There are reserved Action code names that must be used, and a
recommended guideline for including these in Script steps. Using Action
codes to label the required steps leaves them open to a user-supplied
definition of the command to execute. This creates maximum flexibility
for coping with unique user requirements. However, in most cases some
combination of these reserved Action codes must be included in Script
steps in order for normal system operations to be suspended and then
restored.

 

In summary, every Restricted Mode Script is required to include a pair
of reserved Action codes in order to control the automatic process of
stopping system functions and then restarting them. There are two
possible pairs of required Action codes, used as follows:

1.  When the IBM i operating system will not be re-initialized, but may
    return immediately to unrestricted operations:
    a.  Use the ENDSYS (or NOENDSYS) Action code somewhere near the
        beginning of the script sequence, and the STRSYS Action code
        somewhere near the end of the script sequence. (Additional
        script options, that is, steps, may follow the STRSYS Action
        code step.)
2.  When the Restricted Mode script will perform a PWRDWNSYS operation
    in order to IPL IBM i (and then, typically, to automatically restart
    it):
    a.  Use the ENDSYS (or NOENDSYS) Action code somewhere near the
        beginning of the script sequence, and then the PWRDWN Action
        code as the very last step of the script sequence.

Following are details about how each reserved Action code works.

1.  **ENDSYS** is required to put IBM i into its restricted mode.
2.  In place of the **ENDSYS** action code, the alternate value of
    **NOENDSYS** may be used. This code will satisfy the script driver
    program action code edits, but it will not actually put the IBM i
    system into a true restricted state. Instead, the responsibility is
    entirely on the user to specify an appropriate script step command
    for the step that uses the NOENDSYS Action code. This Action code
    value can be useful for test purposes.
3.  Paired with the **ENDSYS** (or **NOENDSYS**) Action code, there must
    be either a **STRSYS** Action code or a **PWRDWN** Action code.
4.  If the **PWRDWN** Action code is used, it must be the last step of a
    Script sequence because it marks the command used to power down the
    IBM i operating system for an IPL.\
    \
    Here is a typical example of the command line text that would be
    assigned to the **PWRDWN** Action code:\
    \
    PWRDWNSYS DELAY(30) RESTART(\*YES)\
    \
    Be sure to refer to the note below about the CONFIRM keyword that is
    supported by the PWRDWNSYS command beginning with the IBM i 6.1
    version of the operating system.\
    \
    The purpose of the **PWRDWN** Action code is to signal the
    Restricted Mode driver program that it should normally complete its
    final tasks just before executing the actual PWRDWNSYS command.
    These final tasks include setting up the LSAM environment so that
    when it is restarted after an IPL completes, the Restricted Mode job
    will be reported to OpCon/xps as completed normally.
5.  []{#aanchor15} **STRSYS** can be used instead of **PWRDWN** to     restore the IBM i normal operations mode. The Action code name
    **STRSYS** can be used to mark the Script step that restores normal
    mode operations. It is typical for IBM i to have a startup program
    stored in the QGPL library. During normal system startup after an
    IPL, the QCTL (or other named) controlling subsystem would execute
    the program that is named in the system value QSTRUPPGM. View this
    program name using the DSPSYSVAL command. It may be desired to
    specify this same program as the command line for the **STRSYS**
    Action code in the Restricted Mode Script. The purpose of the
    **STRSYS** action is to restart all of the IBM i subsystems and
    certain services such as TCP server programs that are required for
    LSAM communications with OpCon. If the Script step does not call the
    IBM i startup program that will also resume the IBM i LSAM server
    jobs, then another Script step must be used to perform the LSAM
    command SMAGPL/STRSMASYS, but only after using the **DLYJOB** Action
    code, as described next.
6.  **DLYJOB** must be specified in a separate step after **STRSYS** to
    allow time for the TCP server to restart.\
    \
    Specify any Action code name for the next step to be performed after
    **STRSYS**. However, before specifying the Action code (below) that
    restarts LSAM communications, allow sufficient time for IBM i to
    restart TCP/IP communications services. The typical syntax for the
    delay job command is:\
    \
    [DLYJOB DLY(180]{style="font-family: 'Courier New';"}\     \
    If sufficient wait time is not provided, then the LSAM
    communications program will not have an active IP address and it
    will fail to start. In this case, manually restart the LSAM
    communications. The amount of time the system requires to start up
    TCP communications can be determined by examining the time stamps on
    messages in the operator message queue for the period of time just
    after an IPL.
7.  Command **SMAGPL/SMASETLIBL** may be used to restore the LSAM
    environment library list.\
    \
    SMASETLIBL is required in order to execute many LSAM software
    commands, except for certain command such as SMAGPL/STRSMASYS (refer
    to next step) that manage the library list themselves.\
    \
    Specify the same name of the LSAM environment that was designated to
    control Restricted Mode operations for this command. The name of the
    controlling LSAM environment was specified during the Restricted
    Mode Setup maintenance procedure. In a default environment where
    there is only one LSAM subsystem, the value of \*DEFAULT may be
    specified with this command. The default LSAM environment name that
    is distributed with the software is SMADEFAULT. Specify any Action
    code name desired, but the command for this action must be in one of
    these formats:\
    \
    [SMASETLIBL ENV(\*DEFAULT)]{style="font-family: 'Courier New';"}\     **- or -**\
    [SMASETLIBL ENV(SMADEFAULT)]{style="font-family: 'Courier New';"}\     **- or -**\
    [SMASETLIBL     ENV(\<my_LSAM_environment\>)]{style="font-family: 'Courier New';"}\
    \
    \<my_LSAM_environment\> is a different LSAM environment name than
    the one being used. Refer to [Installing Multiple     Environments](Installing-Multiple-Environments.md#top){.MCXref
    .xref} and [LSAM Environment     Management](LSAM-Environment-Management.md#top)
    for more information on this option.\
    \
    Do not use the command SMASETLIBL without an ENV parameter because
    the default value for the environment name is \*SELECT, and there
    will not be an operator present to select the environment name
    during automated control of Restricted Mode operations.

Command **SMAGPL/SMASTRSYS** must be used to restart LSAM communication
with OpCon.\
\
If the IBM i system startup program was not called at the **STRSYS**
step, or if the IBM i system startup program does not include this
STRSMASYS command, then the last required step in a Restricted Mode
Script restarts all the LSAM server programs, including restoring
communication with OpCon.\
\
Be sure to specify the name of the LSAM environment that will be
started. The STRSMASYS command executes the SMASETLIBL command to
establish a correct library list for the LSAM environment named. The
value of \*DEFAULT or a specific LSAM environment name may be used for
the environment, but the values of \*CURRENT or \*SELECT may not be used
with this command in the Operator Replay scripts. The format for this
command is:

SMAGPL/STRSMASYS ENV(\*DEFAULT)

 

Optionally include other steps to be performed before the Restricted
Mode Script is ended, after restarting the LSAM server jobs and
communication with OpCon.

 

  -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [For IBM i 6.1 (formerly known as IBM i V6R1) or a newer version of the operating system, the PWRDWNSYS command supports a new function where F16=Confirm must be pressed at the console display device in order to allow the system to power down. This feature must be suppressed in order for the Restricted Mode script to use the PWRDWN Action code, otherwise an operator must be present to respond to the console display. The F16=Confirm function may be suppressed by using the keyword and value CONFIRM(\*NO) with the PWRDWNSYS command, or it may also be suppressed by setting the environment variable QIBM_PWRDWNSYS_CONFIRM to \'\*NO\'.]
  -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

This document includes an excerpt from IBM documentation, following, as
a convenience in order to fully explain the IBM i 6.1 CONFIRM option.

##### Confirm (CONFIRM)

Specifies whether the request should be confirmed before the system is
powered down.

###### \*ENVVAR

The value in environment variable QIBM_PWRDWNSYS_CONFIRM is used to
determine whether the request should be confirmed. If the value is set
to \*INTERACT, \*YES, or \*NO, the action described below for that value
is taken. If the environment variable is not defined or not set to one
of these values, then a confirmation panel is displayed when the
PWRDWNSYS command is issued in an interactive job. System initiated
power downs do not use the environment variable.

###### \*INTERACT

A confirmation panel is displayed when the PWRDWNSYS command is issued
in an interactive job. There is no confirmation when the PWRDWNSYS
command is issued in a non-interactive job.

###### \*YES

A confirmation panel is displayed when the PWRDWNSYS command is issued
in an interactive job. An inquiry message is sent to QSYSOPR when the
PWRDWNSYS command is issued in a non-interactive job.

###### \*NO

There is no confirmation when the PWRDWNSYS command is issued.

#### Optional ON_ERROR Script Action Code

There is a special Action code name ON_ERROR that is reserved as an
optional step that may be added anywhere in the sequence of Script
steps. Each time ON_ERROR is listed in a Script, the Restricted Mode
operations program will register the command that has been assigned to
this Action code as the current operation to be performed in case any
subsequent step in the Script might fail.

 

If the ON_ERROR command is executed after a failed step, it will be
executed after the Restricted Mode operations program has performed most
of the AutoRecovr steps. This takes place after normal system operations
have been restored and the LSAM service programs have been restarted.
Refer to below for an exact definition of how the Restricted Mode
program will recover from a failed Script.

 

One type of command that could be assigned to an ON_ERROR Action is an
OpCon Event. For more information about the available OpCon Event
commands that may be specified, refer to [Events and Utilities Menu](Events-and-Utilities-Menu.md#top) and
[Commands and Utilities](Commands-and-Utilities.md#top){.MCXref
.xref}. As with all Restricted Mode Action commands, the OpCon Event
commands may also be prompted using \<**F4**\> from the Restricted Mode
Options Detail screen (refer to [Restricted Mode Screens and Windows](#Restrict3) for more information).

 

ON_ERROR Action codes are ignored if the entire Restricted Mode Script
executes normally, or if the only steps that have failed are steps that
were flagged (N) to not stop on error.

#### Automatic Recovery from Script Failure

The Script history log shows a special code **AutoRecovr** among the
other logged Action codes. Unlike the other Action codes, this code does
not come from the Script. Instead, this is a special code reserved for
use by the system to log its attempt to automatically restore normal
LSAM communications whenever there has been a failure of a Script step.

 

Control whether the system will attempt to automatically restore system
operations by the value specified for the Stop Execution On Error flag
that is assigned to each Action code in a Script (refer to [Restricted Mode Screens and Windows](#Restrict3) for more
information). A value of N tells the Restricted Mode program to ignore a
failure and continue with the next step in the Script. A value of Y
tells the program to respond to an error by ending the Script process.

 

Whenever the Script process is ended due to an error, the Restricted
Mode program checks the current status of the system. Then it attempts
the following steps so that normal LSAM communications can be restored
and the error reported to OpCon/xps:

1.  Finds and uses the STRSYS step in order to restore the normal state
    of IBM i operations. (This step will be skipped if IBM i is still
    in, or has already restored, its normal state of operations.)
2.  Delays the program for the number of seconds specified in the
    Restricted Mode Setup maintenance program, giving IBM i sufficient
    time to restore the TCP communications services.
3.  Sets the Restricted Mode program\'s library list to the list of the
    controlling LSAM environment using the SMASETLIBL utility command.
    The name of the environment used to control Restricted Mode
    operations is set using the Setup Environment function from the
    Restricted Mode menu. Then the name of that environment is stored in
    the data area QGPL/RSTENVIRON.
4.  Restarts LSAM communications using the STRSMASYS utility command.
5.  Registers a failed job transaction for the Restricted Mode job that
    will be sent via normal LSAM communications.
6.  *(Optional)* Also runs whatever is the latest
    ON_ERROR Script command that might have been included in the Script.
    If there is no ON_ERROR Action code in the Script, then no
    additional commands or actions are performed by Restricted Mode
    operations.
7.  Stores the job logs of the failing Restricted Mode process and of
    the job that signaled Restricted Mode to start (the name of the job
    being tracked in OpCon/xps for Restricted Mode operations control).
    These job logs can be viewed from the LSAM environment\'s command
    entry line using the LSADSPLOG utility command.
8.  Ends the Restricted Mode program and forces the console interactive
    job to end by producing a job log and signing off the SMASAV user
    profile.

### Caution: Restricted Mode Process Failures

#### IBM i Save Operations Messages

Despite all the efforts that SMA has made to support full automation of
Restricted Mode operations and restarting LSAM operations, there remains
a potential that IBM i Save operations might require operator
intervention if an error occurs.

 

IBM has programmed the IBM i Save operations so that an attempt to save
objects to a save file that is not empty will cause a Program Message
with message ID CPA4067 to be issued, rather than a typical error
message as might be sent to the system operator message queue. Program
Messages are unique because they are displayed on a specially formatted
interactive message display screen for interactive jobs and there is no
way to program the IBM i to automatically detect or respond to Program
Messages in this format. This same error might occur if an attempt is
made to save objects to a tape media that has not been properly
formatted (when the Save command does not include a parameter that
specifies to overwrite any existing tape content).

 

It is the responsibility of the system operations or administration
staff to take all necessary measures to prevent this unique circumstance
from occurring in order to depend on OpCon/xps to fully automate
restricted mode operations. SMA suggests the possibility of including an
extra step in a Restricted Mode Script that will intentionally clear an
existing save file before a separate Script Action is used to actually
perform a Save operation to that save file.

### Running a Restricted Mode Process

IBM i now supports executing restricted mode operations from other
sources besides just the DSP01 console device. It\'s possible to use a
different interactive display device, and it\'s also possible to run in
batch mode without any display device. The LSAM setup for Restricted
Mode script processing supports choosing any of these three methods.

 

[Run a Restricted Mode Process in Batch Mode]{.ul} 
1.  Ensure that the LSAM is communicating with SAM and supporting
    services (SAM-SS).
2.  It is NOT necessary to log in to the IBM i console or an alternate
    display device as **SMASAV** in order to use the batch mode.
3.  Add an IBM i job master to an OpCon schedule and choose the IBM i
    job sub-type as Restricted Mode. Specify the name of the Restricted
    Mode Script to use for this job.
4.  When the script completes execution, the procedures used to restore
    normal system operations are the same as when a display device is
    used. The steps performed by the Restricted Mode Script and any
    error information can be viewed using the LSAM sub-menu option to
    display \"Restricted mode history\" (previously called \"History of
    the last use\").

[Run a Restricted Mode Process Using the Console or an Alternate Display Device]{.ul}

1.  Ensure that the LSAM is communicating with SAM and supporting
    services (SAM-SS).
2.  Log in to the IBM i console or an alternate display device as
    **SMASAV**.
3.  Wait for a message on the display device stating, \"Restricted mode
    operation ready to start ...\"
4.  Start the OpCon/xps job through the Enterprise Manager.
5.  Regardless of the steps that will run, the following screen will be
    displayed after the restricted mode operation is started. The status
    log on the right side of the screen will be updated as each
    restricted mode step is started and completed. From this step, the
    Restricted Mode program will complete automatically and normal LSAM
    operations will be restored.

### OpCon Job Details Definition for a Restricted Mode Job

The fields that define an OpCon job that will be executed in IBM i
restricted mode must be set up according to stricter rules than most
jobs. Instructions for defining a restricted mode job can be found in
the [Call Information](https://help.smatechnologies.com/opcon/core/latest/Files/Concepts/IBM-i-Job-Details.md#Call){.MCXref
.xref} section under IBM i Job Details in the **Concepts** online help.

## Restricted Mode Screens and Windows

### Maintain Restricted Mode Scripts

-   **Screen Title**: Restricted Mode Scripts
-   **Screen ID**: SAVRSTD20-3

###### Menu Pathways

Main Menu \> Restricted mode menu (\#5) \> Setup options (\#1)

###### Fields

  Field          Default  Description
  ------------- --------- -----------------------------------------------------------
  Op              None    \<**Tab**\> to a row in the table and enter an option.
  Script Name      n/a    The name of the Script to be changed, copied, or deleted.

  :  

###### Options

-   **1=Select**: Type 1 next to the Script name and press \<Enter\> to
    work with Options (script steps).
-   **3=Copy**: Type 3 next to the Script name to be copied and press
    \<Enter\> to proceed to the new script name window.
-   **4=Delete**: Type 4 next to the Script to be removed from the
    system and press \<Enter\> to proceed to the Confirm Delete screen.
-   **8=Export**: Initiate dialog to export this script and all its
    steps.

###### Functions

-   **F3=Exit**: Quits the list display and returns to the menu.
-   **F6=Add**: Proceeds to the window for adding a new Script name.
-   **F12=Cancel**: Quits the list display and returns to the menu.

#### Windows

##### Confirm Delete

Confirm Delete Scripts

  ----------------------------------------------------------------
                           Delete Script
                                  
     [Script Name          ]{style="text-decoration: underline;"}                                TESTSAVE
                                  
                                  
                                  
                                  
                                  
                                  
                               Bottom
                    Enter=Confirm   F12=Cancel  
  ----------------------------------------------------------------

###### Fields

  Field         Description
  ------------- ---------------------------------------------------------------------------
  Script Name   The name of a collection of Action codes that can be executed as a group.

  :  

###### Functions

**F12=Cancel**: Quits the delete confirmation window without deleting
any records and returns to the list of Scripts.

#### Add New Script

A window is displayed for typing in a new Script name when function
\<**F6**\> (Add) is pressed. This occurs before the program displays the
Restricted mode options detail screen where the new Script Actions will
be defined.

 

The same format of the New Script Name window is displayed for both
function \<**F6**\> (Add) and function \<**F3**\> (Copy). The only
difference will be the title line of the window, where the title line
for \<**F3**\> (Copy) will show the name of the Script that is being
copied.

Add New Script Window

  ----------------------------------------------------------------------------------------------------------------------
  SAVRSTD20W3
    Add new script
    Type name, press Enter.
   
      [New script name:]{style="color: #008000;"} [\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_]{style="color: #ff0000;"}     
    F3=Exit   F12=Cancel
  ----------------------------------------------------------------------------------------------------------------------

Copy Script Window

  ----------------------------------------------------------------------------------------------------------------------
  SAVRSTD20W3
   
    Copy from \*DEFAULT
    Type name, press Enter.
   
      [New script name:]{style="color: #008000;"} [\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_]{style="color: #ff0000;"}     
    F3=Exit   F12=Cancel
  ----------------------------------------------------------------------------------------------------------------------

###### Menu Pathways

-   Main Menu \> Restricted mode menu (\#5) \> Setup options (\#1) \>
    F6=Add
-   Main Menu \> Restricted mode menu (\#5) \> Setup options (\#1) \>
    Copy Script option (\#3)

###### Fields

+-----------------+-----------+----------+---------------------+
| Field           | Default   | Required | Description         |
+=================+:=========:+:========:+=====================+
| New script name | \*DEFAULT | Y        | A user-defined name |
|                 |           |          | for each group of   |
|                 |           |          | Action codes. It is |
|                 |           |          | recommended that    |
|                 |           |          | the most commonly   |
|                 |           |          | used Restricted     |
|                 |           |          | Mode script be      |
|                 |           |          | named \"\*DEFAULT\" |
|                 |           |          | in order to support |
|                 |           |          | the default action  |
|                 |           |          | of the STRSAVRST    |
|                 |           |          | command.            |
|                 |           |          |                     |
|                 |           |          |                     |
|                 |           |          |                     |
|                 |           |          | **Note:** Users of  |
|                 |           |          | a prior release of  |
|                 |           |          | the LSAM who        |
|                 |           |          | already had a       |
|                 |           |          | single Restricted   |
|                 |           |          | Mode script defined |
|                 |           |          | will have that      |
|                 |           |          | script              |
|                 |           |          | automatically       |
|                 |           |          | converted to a      |
|                 |           |          | script name of      |
|                 |           |          | \*DEFAULT. This     |
|                 |           |          | will ensure that    |
|                 |           |          | their system uses   |
|                 |           |          | the STRSAVRST       |
|                 |           |          | command the same    |
|                 |           |          | way it did in the   |
|                 |           |          | prior release (the  |
|                 |           |          | STRSAVRST is        |
|                 |           |          | submitted by        |
|                 |           |          | OpCon/xps           |
|                 |           |          | scheduling without  |
|                 |           |          | any script name     |
|                 |           |          | parameter).         |
+-----------------+-----------+----------+---------------------+

:  

###### Functions

-   **F3=Exit**: Quits the Add New/Copy Script window without updating
    and returns to the menu.
-   **F12=Cancel**: Quits the Add New/Copy Script windows without
    updating and returns to the list of Scripts.

### Select Options (Script Steps)

-   **Screen Title**: Restricted Mode Options
-   **Screen ID**: SAVRSTD20-1

###### Menu Pathways

Main Menu \> Restricted mode menu (\#5) \> Setup options (\#1) \> Select
Script, options (\#1)

###### Fields

+-------------+---------+--------------------------------------------+
| Field       | Default | Description                                |
+=============+:=======:+============================================+
| Script name |         | The name of the Script selected from the   |
|             |         | list display to which all these Action     |
|             |         | codes belong.                              |
+-------------+---------+--------------------------------------------+
| Op          | None    | \<**Tab**\> to a row in the table and      |
|             |         | enter an option.                           |
+-------------+---------+--------------------------------------------+
| Seq         |         | The order in which steps in RDY status     |
|             |         | will be performed. Note that Actions in    |
|             |         | HLD status will be sorted to the end of    |
|             |         | the list, separate from the steps in RDY   |
|             |         | status that are listed in order of their   |
|             |         | sequence number.                           |
|             |         |                                            |
|             |         |                                            |
|             |         |                                            |
|             |         | **Note:** A former restriction on the use  |
|             |         | of sequence numbers has been removed from  |
|             |         | the system and replaced with reserved      |
|             |         | names for certain Action codes.            |
+-------------+---------+--------------------------------------------+
| Action      |         | A user-assigned or a system-reserved name  |
|             |         | for each sequenced step.                   |
|             |         |                                            |
|             |         |                                            |
|             |         |                                            |
|             |         | **Note:** Action codes ENDSYS and STRSYS   |
|             |         | are reserved and required. ENDSYS must be  |
|             |         | the operation that puts the system into    |
|             |         | restricted mode, while STRSYS must be the  |
|             |         | operation that restores normal mode        |
|             |         | operations. Other steps may be placed      |
|             |         | before, between, or after these required   |
|             |         | steps. Also refer to the discussion on     |
|             |         | [Optional ON_ERROR Script Action           | |             |         | Code](#Optional) about the  |
|             |         | special ON_ERROR Action code.\*            |
+-------------+---------+--------------------------------------------+
| Stop        |         | -   Y = the Restricted Mode Script stops   |
|             |         |     execution if there is an error on this |
|             |         |     step, and goes into AutoRecovr mode to |
|             |         |     restore normal system operations and   |
|             |         |     report the error.                      |
|             |         | -   N = Restricted Mode Script does not go |
|             |         |     into AutoRecovr and continues          |
|             |         |     execution whether there is an error or |
|             |         |     not.                                   |
+-------------+---------+--------------------------------------------+
| Status      | RDY     | -   RDY = ready, will be executed during   |
|             |         |     restricted mode.                       |
|             |         | -   HLD = held, will not be executed when  |
|             |         |     restricted mode operations are run.    |
+-------------+---------+--------------------------------------------+
| Description |         | User description of each sequenced step    |
+-------------+---------+--------------------------------------------+

:  

###### Options

-   **2=Change**: Type 2 next to the Action to be changed and press
    \<Enter\> to proceed to the options details screen.

-   **3=Hold**: Change the status of an Action to HLD, so that it will
    not be used during restricted mode operations. This provides for
    retaining Actions for use on alternate days.

-   **4=Delete**: Type 4 next to the Action to be removed from the
    system and press \<Enter\> to proceed to the Confirm Delete screen.

-   **6=Release**: Change the status of a step to RDY (ready), so that
    it will be executed during restricted mode operations.

###### Functions

-   **F3=Exit**: Quits the list display and returns to the menu.
-   **F6=Add**: Proceeds to the options detail screen for adding a new
    Action.
-   **F11=Alt View**: Toggles between Descriptions and Commands
    displayed for each step.
-   **F12=Cancel**: Quits the list display and returns to the menu.

#### Windows

##### Confirm Delete

Confirm Delete Actions

  ---------------------------------------------------------------------------------------------------------------------------------------------
                                                                  Delete Action
                                                                         
     [  Action  ]{style="text-decoration: underline;"}   [           Description                       ]{style="text-decoration: underline;"}                                       [SAVDLO       Alternate save document libraries]{style="color: #ff0000;"}
                                                                         
                                                                         
                                                                         
                                                                         
                                                                     Bottom
                                                           Enter=Confirm   F12=Cancel
  ---------------------------------------------------------------------------------------------------------------------------------------------

###### Fields

  Field         Description
  ------------- --------------------------------------
  Action        User-defined name for the Action.
  Description   Explanation of what the action does.

  :  

###### Functions

**F12=Cancel**: Quits the delete confirmation window without deleting
any records and returns to the list of Actions.

#### Restricted Mode Options Detail

The same format of Options Detail screen is displayed for both option
2=Change and function \<**F6**\> (Add).

-   **Screen Title**: Restricted Mode Options Detail
-   **Screen ID**: SAVRSTD20-2

###### Menu Pathways

-   Main Menu \> Restricted mode menu (\#5) \> Setup options (\#1) \>
    F6=Add
-   Main Menu \> Restricted mode menu (\#5) \> Setup options (\#1) \>
    option 2=Change

###### Fields

+------------------+------------------+----------+------------------+
| Field            | Default          | Required | Description      |
+==================+:================:+:========:+==================+
| Script name      |                  | n/a      | The name of the  |
| Action           |                  |          | Script in which  |
|                  |                  |          | this Action code |
|                  |                  |          | is being added   |
|                  |                  |          | or changed.      |
+------------------+------------------+----------+------------------+
| Action           | None             | Y        | A user-defined   |
|                  |                  |          | or a             |
|                  |                  |          | system-reserved  |
|                  |                  |          | name for each    |
|                  |                  |          | sequenced step   |
|                  |                  |          | that is part of  |
|                  |                  |          | restricted mode  |
|                  |                  |          | operations.      |
|                  |                  |          |                  |
|                  |                  |          |                  |
|                  |                  |          |                  |
|                  |                  |          | **Note:** Action |
|                  |                  |          | codes ENDSYS and |
|                  |                  |          | STRSYS are       |
|                  |                  |          | reserved and     |
|                  |                  |          | required. ENDSYS |
|                  |                  |          | must be the      |
|                  |                  |          | operation that   |
|                  |                  |          | puts the system  |
|                  |                  |          | into restricted  |
|                  |                  |          | mode, while      |
|                  |                  |          | STRSYS must be   |
|                  |                  |          | the operation    |
|                  |                  |          | that restores    |
|                  |                  |          | normal mode      |
|                  |                  |          | operations.      |
|                  |                  |          | Other steps may  |
|                  |                  |          | be placed        |
|                  |                  |          | before, between  |
|                  |                  |          | or after these   |
|                  |                  |          | required steps.  |
|                  |                  |          | Also refer to    |
|                  |                  |          | the discussion   |
|                  |                  |          | [Optional        | |                  |                  |          | ON_ERROR Script  |
|                  |                  |          | Action           |
|                  |                  |          | Code](#O         |
|                  |                  |          | ptional){.MCXref |
|                  |                  |          | .xref} about the |
|                  |                  |          | special ON_ERROR |
|                  |                  |          | Action code.\*   |
+------------------+------------------+----------+------------------+
| Sequence         | Next available   | Y        | -   The order in |
|                  | number           |          |     which the    |
|                  |                  |          |     steps in RDY |
|                  |                  |          |     status will  |
|                  |                  |          |     be           |
|                  |                  |          |     performed.   |
|                  |                  |          |     Note that    |
|                  |                  |          |     Actions in   |
|                  |                  |          |     HLD status   |
|                  |                  |          |     will be      |
|                  |                  |          |     sorted to    |
|                  |                  |          |     the end of   |
|                  |                  |          |     the list,    |
|                  |                  |          |     separate     |
|                  |                  |          |     from the     |
|                  |                  |          |     steps in RDY |
|                  |                  |          |     status which |
|                  |                  |          |     are listed   |
|                  |                  |          |     in order of  |
|                  |                  |          |     their        |
|                  |                  |          |     sequence     |
|                  |                  |          |     number.      |
|                  |                  |          | -   The default  |
|                  |                  |          |     sequence     |
|                  |                  |          |     number       |
|                  |                  |          |     supplied may |
|                  |                  |          |     not be the   |
|                  |                  |          |     next highest |
|                  |                  |          |     number among |
|                  |                  |          |     all          |
|                  |                  |          |     sequences if |
|                  |                  |          |     there are    |
|                  |                  |          |     Actions in   |
|                  |                  |          |     HLD status   |
|                  |                  |          |     at the end   |
|                  |                  |          |     of the list. |
|                  |                  |          |     Instead, the |
|                  |                  |          |     last Action  |
|                  |                  |          |     in HLD       |
|                  |                  |          |     status       |
|                  |                  |          |     becomes the  |
|                  |                  |          |     reference    |
|                  |                  |          |     for the      |
|                  |                  |          |                  |
|                  |                  |          |  system-supplied |
|                  |                  |          |     default      |
|                  |                  |          |     sequence     |
|                  |                  |          |     number. The  |
|                  |                  |          |     person       |
|                  |                  |          |     performing   |
|                  |                  |          |     this         |
|                  |                  |          |     maintenance  |
|                  |                  |          |     is           |
|                  |                  |          |     responsible  |
|                  |                  |          |     for updating |
|                  |                  |          |     the sequence |
|                  |                  |          |     number so    |
|                  |                  |          |     that the     |
|                  |                  |          |     list of      |
|                  |                  |          |     Actions to   |
|                  |                  |          |     be performed |
|                  |                  |          |     will occur   |
|                  |                  |          |     in the       |
|                  |                  |          |     correct      |
|                  |                  |          |     order.       |
|                  |                  |          |                  |
|                  |                  |          | **Note:** A      |
|                  |                  |          | former           |
|                  |                  |          | restriction on   |
|                  |                  |          | the use of       |
|                  |                  |          | sequence numbers |
|                  |                  |          | has been removed |
|                  |                  |          | from the system  |
|                  |                  |          | and replaced     |
|                  |                  |          | with reserved    |
|                  |                  |          | names for        |
|                  |                  |          | certain Action   |
|                  |                  |          | codes.           |
+------------------+------------------+----------+------------------+
| Status           | System defined   |          | When the options |
|                  |                  |          | detail screen is |
|                  |                  |          | presented in     |
|                  |                  |          | Change mode, the |
|                  |                  |          | existing status  |
|                  |                  |          | of an Action     |
|                  |                  |          | will appear in   |
|                  |                  |          | this field. This |
|                  |                  |          | value cannot be  |
|                  |                  |          | changed on this  |
|                  |                  |          | display; it is   |
|                  |                  |          | updated by using |
|                  |                  |          | options 3 and 6  |
|                  |                  |          | from the list of |
|                  |                  |          | Actions display. |
+------------------+------------------+----------+------------------+
| Description      | None             | N        | A user-supplied  |
|                  |                  |          | description of   |
|                  |                  |          | what function    |
|                  |                  |          | the Action will  |
|                  |                  |          | perform.         |
+------------------+------------------+----------+------------------+
| Stop Execution   | None             | Y        | -   Y=Yes        |
| on Error         |                  |          | -   N=No         |
|                  |                  |          | -   This         |
|                  |                  |          |     instruction  |
|                  |                  |          |     flag causes  |
|                  |                  |          |     the          |
|                  |                  |          |     Restricted   |
|                  |                  |          |     Mode         |
|                  |                  |          |     operations   |
|                  |                  |          |     to be        |
|                  |                  |          |     suspended if |
|                  |                  |          |     an Action    |
|                  |                  |          |     that is      |
|                  |                  |          |     flagged as   |
|                  |                  |          |     Y=Yes,       |
|                  |                  |          |     encounters   |
|                  |                  |          |     an error     |
|                  |                  |          |     condition.   |
|                  |                  |          |     In that      |
|                  |                  |          |     case, the    |
|                  |                  |          |     Restricted   |
|                  |                  |          |     Mode         |
|                  |                  |          |     operations   |
|                  |                  |          |     program will |
|                  |                  |          |     go into      |
|                  |                  |          |     AutoRecovr   |
|                  |                  |          |     mode,        |
|                  |                  |          |     restore      |
|                  |                  |          |     normal       |
|                  |                  |          |     system       |
|                  |                  |          |     operations,  |
|                  |                  |          |     and report   |
|                  |                  |          |     the error.   |
+------------------+------------------+----------+------------------+
| Command line     | None             | Y        | Type the IBM i   |
|                  |                  |          | command to be    |
|                  |                  |          | executed. The    |
|                  |                  |          | \<**F4**\>       |
|                  |                  |          | (Prompt) key     |
|                  |                  |          | supports access  |
|                  |                  |          | to IBM i command |
|                  |                  |          | prompting. When  |
|                  |                  |          | \<**Enter**\> is |
|                  |                  |          | pressed from the |
|                  |                  |          | prompt display,  |
|                  |                  |          | the resulting    |
|                  |                  |          | command text     |
|                  |                  |          | will be inserted |
|                  |                  |          | into this field. |
+------------------+------------------+----------+------------------+

:  

 

+----------------------------------+----------------------------------+
| ![White triangle icon on yellow  | **CAUTION:** [\*Special Action   | | circlular                        | code: ON_ERROR]      |
| background](../../../Reso        |                                  |
| urces/Images/caution-icon(48x48) |                                  |
| .png "Caution icon") |                                  |
|                                  | There is a special Action code   |
|                                  | name ON_ERROR that is reserved   |
|                                  | as an optional step that may be  |
|                                  | added anywhere in the sequence   |
|                                  | of Script steps. Each time       |
|                                  | ON_ERROR is specified, the       |
|                                  | Restricted Mode operations       |
|                                  | program registers the command    |
|                                  | that has been assigned to this   |
|                                  | Action code as the current       |
|                                  | operation to be performed in     |
|                                  | case any subsequent step in the  |
|                                  | Script might fail. The ON_ERROR  |
|                                  | command is executed after the    |
|                                  | Restricted Mode operations       |
|                                  | program ha performed most of the |
|                                  | AutoRecovr steps (after normal   |
|                                  | system operations have been      |
|                                  | restored an the LSAM service     |
|                                  | programs have been restarted).   |
|                                  | The usual type of command that   |
|                                  | would be assigned to an ON_ERROR |
|                                  | Action is an OpCon/xps Event.    |
|                                  | Refer to [Events and Utilities   | |                                  | Menu](Events-and               |
|                                  | -Utilities-Menu.md){.MCXref |
|                                  | .xref} and [Commands and         | |                                  | Utilities](Command               |
|                                  | s-and-Utilities.md){.MCXref |
|                                  | .xref} for more information      |
|                                  | about the available OpCon/xps    |
|                                  | Event commands that may be       |
|                                  | specified. As with all           |
|                                  | Restricted Mode Action commands, |
|                                  | the OpCon/xps Event commands may |
|                                  | also be prompted using \<F4\>    |
|                                  | from the Restricted Mode Options |
|                                  | Detail screen (below). ON_ERROR  |
|                                  | Action codes are ignored if the  |
|                                  | entire Restricted Mode Script    |
|                                  | executes normally.               |
|                                  |                                  |
|                                  |                                  |
+----------------------------------+----------------------------------+

###### Functions

-   **F3=Exit**: Quits the options details display without updating and
    returns to the menu.
-   **F4=Prompt**: In the Command line field, go to IBM i command
    prompting. When \<Enter\> is pressed from the command prompt screen,
    the resulting command text will be inserted into this field.
-   **F12=Cancel**: Quits the options details display without updating
    and returns to the list of Actions.

### Setup Restricted Mode Environment

In Setup Environment, define the environment for executing Restricted
Mode operations by specifying an environment library list and an option
for managing any exceptional messages that may arise.

-   **Screen Title**: Restricted Mode Evnironment
-   **Screen ID**: SAVRSTD21

###### Menu Pathways

Main Menu \> Restricted mode menu (\#5) \> Setup environment (\#2)

###### Fields

+--------------------+--------------+----------+--------------------+
| Field              | Default      | Required | Description        |
+====================+:============:+:========:+====================+
| Environment name   | SMADEFAULT   | Y        | Enter the name of  |
|                    |              |          | the LSAM           |
|                    |              |          | environment that   |
|                    |              |          | will control       |
|                    |              |          | Restricted Mode    |
|                    |              |          | operations. For    |
|                    |              |          | most installations |
|                    |              |          | with a single,     |
|                    |              |          | live LSAM          |
|                    |              |          | environment, this  |
|                    |              |          | environment will   |
|                    |              |          | be the default     |
|                    |              |          | name of            |
|                    |              |          | SMADEFAULT.        |
|                    |              |          |                    |
|                    |              |          |                    |
|                    |              |          |                    |
|                    |              |          | **Note:** Only one |
|                    |              |          | LSAM can be used   |
|                    |              |          | at a time to       |
|                    |              |          | control Restricted |
|                    |              |          | Mode operations,   |
|                    |              |          | since these        |
|                    |              |          | operations affect  |
|                    |              |          | the state of the   |
|                    |              |          | entire IBM i       |
|                    |              |          | operation system.  |
+--------------------+--------------+----------+--------------------+
| Restart delay      | 180          | Y        | The number of      |
| seconds            |              |          | seconds required   |
|                    |              |          | by IBM i to fully  |
|                    |              |          | restart the TCP/IP |
|                    |              |          | server programs.   |
|                    |              |          | If this value is   |
|                    |              |          | specified          |
|                    |              |          | incorrectly, the   |
|                    |              |          | Restricted Mode    |
|                    |              |          | operations program |
|                    |              |          | may not be able to |
|                    |              |          | automatically      |
|                    |              |          | restart LSAM       |
|                    |              |          | communications     |
|                    |              |          | whenever there has |
|                    |              |          | been a failure of  |
|                    |              |          | a Restricted Mode  |
|                    |              |          | script.            |
|                    |              |          |                    |
|                    |              |          |                    |
|                    |              |          |                    |
|                    |              |          | **Note:** This     |
|                    |              |          | value may be       |
|                    |              |          | determined by      |
|                    |              |          | examining the time |
|                    |              |          | stamps on messages |
|                    |              |          | in the System      |
|                    |              |          | Operator message   |
|                    |              |          | queue from a point |
|                    |              |          | just after an IPL  |
|                    |              |          | or other system    |
|                    |              |          | restart.           |
+--------------------+--------------+----------+--------------------+
| Console job start  | 030          | Y        | The number of      |
| wait               |              |          | seconds that the   |
|                    |              |          | OpCon-started      |
|                    |              |          | process initiation |
|                    |              |          | job should wait    |
|                    |              |          | for the Console    |
|                    |              |          | job (or submitted  |
|                    |              |          | batch job) to      |
|                    |              |          | become active and  |
|                    |              |          | be able to respond |
|                    |              |          | to the control     |
|                    |              |          | job.               |
+--------------------+--------------+----------+--------------------+
| Console            | \*BATCH      | Y        | -   \*CONS = The   |
| device/\*BATCH     |              |          |     IBM i DSP01    |
|                    |              |          |     device must be |
|                    |              |          |     used by user   |
|                    |              |          |     SMASAV to run  |
|                    |              |          |     script steps.  |
|                    |              |          | -   \*USER = A     |
|                    |              |          |                    |
|                    |              |          |    user-designated |
|                    |              |          |     display device |
|                    |              |          |     may be used by |
|                    |              |          |     user SMASAV to |
|                    |              |          |     run script     |
|                    |              |          |     steps.         |
|                    |              |          |     However, be    |
|                    |              |          |     sure that this |
|                    |              |          |     device will be |
|                    |              |          |     managed by the |
|                    |              |          |     IBM i          |
|                    |              |          |     controlling    |
|                    |              |          |     subsystem, if  |
|                    |              |          |     the script     |
|                    |              |          |     will actually  |
|                    |              |          |     put the system |
|                    |              |          |     into           |
|                    |              |          |     restricted     |
|                    |              |          |     mode (which    |
|                    |              |          |     may not happen |
|                    |              |          |     when testing   |
|                    |              |          |     with the       |
|                    |              |          |     NOENDSYS       |
|                    |              |          |     Action code).  |
|                    |              |          | -   \*BATCH = No   |
|                    |              |          |     display device |
|                    |              |          |     is used. The   |
|                    |              |          |                    |
|                    |              |          |    OpCon-initiated |
|                    |              |          |     control job    |
|                    |              |          |     will submit    |
|                    |              |          |     the batch job  |
|                    |              |          |     that will      |
|                    |              |          |     execute script |
|                    |              |          |     steps.         |
+--------------------+--------------+----------+--------------------+
| Control subsystem  | QBATCHQGPL   | N        | These values are   |
| JOBQ & library     |              |          | required only when |
|                    |              |          | the \*BATCH mode   |
|                    |              |          | will be used. For  |
|                    |              |          | batch mode, this   |
|                    |              |          | tells the          |
|                    |              |          | OpCon-initiated    |
|                    |              |          | control job where  |
|                    |              |          | to submit the      |
|                    |              |          | script execution   |
|                    |              |          | batch job.         |
+--------------------+--------------+----------+--------------------+
| QCONSOLE           | system value | n/a      | This display-only  |
|                    |              |          | field shows which  |
|                    |              |          | device has been    |
|                    |              |          | designated as the  |
|                    |              |          | IBM i operating    |
|                    |              |          | system console     |
|                    |              |          | device. This value |
|                    |              |          | identifies the     |
|                    |              |          | display device     |
|                    |              |          | that must be used  |
|                    |              |          | for \*CONS mode.   |
+--------------------+--------------+----------+--------------------+
| QCTLSBSD           | system value | n/a      | Two fields show    |
|                    |              |          | the name and       |
|                    |              |          | library location   |
|                    |              |          | of the Subsystem   |
|                    |              |          | Description that   |
|                    |              |          | describes which    |
|                    |              |          | IBM i subsystem is |
|                    |              |          | the controlling    |
|                    |              |          | subsystem, used    |
|                    |              |          | exclusively when   |
|                    |              |          | the system is put  |
|                    |              |          | into its           |
|                    |              |          | restricted mode.   |
+--------------------+--------------+----------+--------------------+
| Seq                |              |          | The sequence       |
|                    |              |          | number that is     |
|                    |              |          | automatically      |
|                    |              |          | assigned to each   |
|                    |              |          | library in the     |
|                    |              |          | library list. This |
|                    |              |          | number is only for |
|                    |              |          | clarification of   |
|                    |              |          | the order of the   |
|                    |              |          | library list.      |
+--------------------+--------------+----------+--------------------+

:  

###### Functions

-   **F3=Exit**: Quits the environment details display without updating
    and returns to the menu.
-   **F4=Prompt**: From the Environment field, the prompting function
    presents a new screen that lists all available environments. It is
    possible to view the library list that defines each environment.
    Select the environment and library list that has been created for
    use with Restricted Mode operations. If no environment and library
    list has been set up for Restricted Mode operations, use \<F6\>
    (Add/maint env) to perform environment maintenance now. Then repeat
    the \<F4\> (Prompt) to select the new environment for insertion into
    the Environment field.
-   **F5=Refresh**: Retrieves the latest information from the LSAM
    environment master files and updates the display.
-   **F6=Add/maint env**: This function key supports access to the LSAM
    Environment maintenance functions, where new environment records may
    be created and library lists may be constructed or updated. Refer to
    [LSAM Environment     Management](LSAM-Environment-Management.md#top)
    for more information about managing LSAM environments.
-   **F12=Cancel**: Quits the environment details display without
    updating and returns to the list of Actions.
-   **F15=Update SMASAV**: Access to a function required to prepare the
    user profile SMASAV and a control data area QGPL/RSTENVIRON for use
    with Restricted Mode operations.
-   **PageDown**: Use the Page control keys to view more libraries if
    the complete list is not displayed on the first page.

#### F15=Update SMASAV

The instructions for preparing the LSAM to use Restricted Mode
operations indicate that the following screen represents a step that is
required to configure the LSAM software. The effect of using this screen
to perform the update is that the system will know which LSAM
environment should be used as a reference point to initiate Restricted
Mode operations when the special user SMASAV signs on to the IBM i
system for this purpose. This function will also update the SMASAV user
profile with correct information about where to find the required
Initial Program.

 

It is recommended to always perform this function before using the
Restricted Mode for the first time, or at any time after updating or
changing the LSAM environment or programs. It is also required to
complete this function by pressing \<**Enter**\> when this display shows
that the Restricted Mode controlling environment is either blank or is
not the same as the Current environment. However, it is not necessary to
press \<**Enter**\> when viewing this display from a test environment
and that environment should not be in control of Restricted Mode
operations.

 

As a general rule, the default LSAM environment should be the one that
is set to control Restricted Mode. Note that this environment name will
not be the same as the Restricted Mode environment itself, shown on the
previous display format (above). This is because the environment name is
only a label for the special library list which will be in effect during
Restricted Mode operations. For more information, refer to
[SMALIBMGT](LSAM-Environment-Management.md#SMALIBMG){.MCXref
.xref}. Regarding the discussion about Multiple Environment Management,
refer to [LSAM Environment Management](LSAM-Environment-Management.md#top) and
[Installing Multiple Environments](Installing-Multiple-Environments.md#top){.MCXref
.xref}.

-   **Screen Title**: Restricted Mode Update SMASAV
-   **Screen ID**: SAVRSTD21-2

###### Menu Pathways

Main Menu \> Restricted mode menu (\#5) \> Setup environment (\#2) \>
F15=Update SMASAV

###### Fields

  Field                                     Description
  ----------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Current environment                       The name of the LSAM environment in which this display is being executed. (The value is stored in the ENVIRON data area in the SMADTA library, or the equivalent of this library for the current environment.)
  Restricted Mode controlling environment   The name of the LSAM environment that will be in charge of initiating Restricted Mode operations. (The value is stored in the data area RSTENVIRON in library QGPL.)

  :  

###### Functions

-   **F3=Exit**: Quits the environment details display without updating
    and returns to the menu.
-   **F10=View SMASAV**: View the settings of the SMASAV user profile in
    order to confirm that the initial program and the job description
    are referring to correct library names. If it appears they are
    incorrect, press \<Enter\> to complete the update process.
-   **F12=Cancel**: Quits the environment details display without
    updating and returns to the list of Actions.
-   **Enter**: Press \<Enter\> to initiate the system changes described
    on this screen. To avoid any updates press \<F12\> or \<F3\>
    instead. After pressing \<Enter\>, the display will return to the
    list of libraries for the Restricted Mode environment and a message
    will appear at the bottom line confirming that the updates have been
    successfully completed.

### Restricted Mode History

Shows the Actions and other steps that were performed during the last
Restricted Mode of operations with the associated dates, times, and
messages.

#### Restricted Mode Job History

Shows a list of each Script name and job for which a history has been
recorded.

-   **Screen Title**: Restricted Mode Job History
-   **Screen ID**: SAVRSTD05-1

###### Menu Pathways

Main Menu \> Restricted mode menu (\#5) \> History of last use (\#3)

###### Fields

  Field            Description
  ---------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Search content   Type a value in this field and press \<**Enter**\> to find the first job history (control record) that contains this value. Use \<**F16**\> to continue the search to the next record(s).
  Opt              \<**Tab**\> to a row in the table and enter an option.
  Script           The name of the Script for which a history exists.
  JobNbr           The IBM i job serial number.
  Job User         The IBM i user profile (should always be SMASAV).
  Job Name         The IBM i job name (should always be DSP01).
  Date             The day when this Script was last executed (as of the last step in the script).

  :  

###### Options

-   **1=Select**: Type 1 next to a Script/Job and press \<**Enter**\>
    key to view its history detail.
-   **9=WRKJOB**: Type 9 next to a Script/Job and press \<**Enter**\> to
    view the IBM i WRKJOB menu.

###### Functions

-   **F3=Exit**: Quits the list of Scripts and returns to the menu.
-   **F5=Refresh**: Reloads the list of jobs from the log file.
-   **F12=Cancel**: Quits the list of Scripts and returns to the menu.
-   **F16=Search next**: Continue the content search to the next
    matching record.
-   **F17=Top**: Jump to the first record in the list of job histories.
-   **F18=Bottom**: Jump to the last record in the list of job
    histories.

#### Restricted Mode Activity History

Shows a list of script options and/or program-defined steps that were
performed, throughout the history of the job.

-   **Screen Title**: Restricted Mode Activity History
-   **Screen ID**: SAVRSTD05-2

###### Menu Pathways

Main Menu \> Restricted mode menu (\#5) \> History of the last use (\#3)
\> option (\#1)

###### Options

**5=Display**: Type **5** next to a history line and press \<**Enter**\>
key to view its details.

###### Functions

-   **F3=Exit**: Quits the list of Scripts and returns to the menu.
-   **F9=WRKJOB**: Branch to the IBM i Work with job menu for this job.
-   **F12=Cancel**: Quits the list of Scripts and returns to the menu.
-   **F16=Search next**: Continue the content search to the next
    matching record.
-   **F17=Top**: Jump to the first record in the list of job histories.
-   **F18=Bottom**: Jump to the last record in the list of job
    histories.

###### Fields

  Field                 Description
  --------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Script                The name of the Script that was executed by this job.
  Job ID                The full IBM i job identifier for this job.
  Opt                   Type option 5 next to one or more lines to view the full history detail.
  Entry timestamp       The system date and time when this step was executed.
  Action                The mnemonic name, or the Action Code of the script step (option) that was executed at this time.
  Sts                   Each history entry is marked as to its type. Values: B = begin step, E=end step, F=failure.
  Message               If any exception occurred during execution of this step, an IBM i error message ID will appear here. Otherwise the entry shows \*NONE.
  Description/Command   For steps that executed a command, shows the first several characters of the command. Use option 5 to view the full command text. For other entry types, this field may show the description of an error, or other descriptive comment.

  :  

#### Restricted Mode Activity History Detail

Shows extended detail about the activity selected from the list of steps
in a job\'s history.

-   **Screen Title**: Restricted Mode Activity History Detail
-   **Screen ID**: SAVRSTD05-5

###### Menu Pathways

Main Menu \> Restricted mode menu (\#5) \> History of the last use (\#3)
\> option (\#1) \> option (\#5)

###### Fields

  Field                  Description
  ---------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------
  Script                 The name of the Script that was executed by this job.
  Job ID                 The full IBM i job identifier for this job.
  Log entry date, time   The date and time when the log entry was written.
  Action code            The mnemonic name, or the Action Code of the script step (option) that was executed at this time.
  Log status code        Each history entry is marked as to its type. B = begin step, E=end step, F=failure.
  Log message code       If any exception occurred during execution of this step, an IBM i error message ID will appear here. Otherwise the entry shows \*NONE.
  Log entry text         For steps that executed a command, shows the full command text. For other entry types, this field shows the description of an error, or other comment.

  :  

###### Options

**5=Display**: Type **5** next to a history line and press \<**Enter**\>
key to view its details.

###### Functions

-   **F3=Exit**: Quits the list of Scripts and returns to the menu.
-   **F12=Cancel**: Quits the list of Scripts and returns to the menu.

## Multi-Step Job Scripting

This feature of the IBM i Agent for OpCon provides a command named
STRMLTJOB (Start Multi-step Job) that makes it possible for a single IBM
i batch job on an OpCon schedule to execute multiple IBM i commands
and/or program calls, without requiring that Control Language programs
be constructed and compiled. This feature also supports execution of
Control Language commands from source members, in addition to its
primary function of executing collections of Script Steps that are
defined using the LSAM\'s data entry functions. IBM i source file
members can be used for individual script step commands or to contain
the entire script that will be executed.

 

This feature is important to OpCon users for reasons that include:

-   Not every user site has the IBM licensed program development tools.
-   Individual program calls that are configured as separate jobs on an
    OpCon schedule cannot easily share common resources, including
    especially the unique IBM i temporary job library called QTEMP,
    where critical application values may be stored and shared among
    separate steps within a single job.
-   This feature provides a convenient means for converting multi-step
    procedures from other automation environments.
-   The STRMLTJOB script driver program supports a restart-at-label
    capability which can be applied to the LSAM scripts master file, or
    to Control Language source members that contain the commands the
    STRMLTJOB job will execute. For IBM i CL source members, restart is
    supported at either existing TAGS: or at the actual source member
    sequence number of any line.
-   Jobs controlled by the STRMLTJOB command have their progress
    displayed in the OpCon list of jobs, wherever the current job status
    shows. The script driver sends the latest step LABEL or CL script
    TAG: value as part of the displayed job status information. Job
    label messages are stored as OpCon job detail messages under the Job
    Information tab, and the time stamp logged with each message can be
    used to calculate how much time has passed between each script step
    label (or CL source member TAG).
-   LSAM Dynamic Variable tokens can be used in any script step or any
    Control Language source member. (The tokens can take the place of
    Control Language Declare (DCL) variables, which are not available
    unless the CL source is compiled into a program.)
-   Very long Control Language statements are supported by LSAM script
    steps by using an IBM i source file member to store the long command
    line.
-   Jobs controlled by the STRMLTJOB command have implied convenient
    access to any of the LSAM software commands included with the OpCon
    IBM i Agent product. This means that LSAM commands can be used in a
    multi-step job without extra steps to manage the job\'s library
    list.

### Instructions for Configuring Multi-Step Jobs

The STRMLTJOB command may be used immediately after this feature is
installed into (or with) the IBM i LSAM software. There are no special
LSAM configuration requirements, but there are some critical IBM i
authority considerations.

#### Requirements Before Using the STRMLTJOB Command

##### IBM i Authority Requirements

It is important, as always, to remember that LSAM scripting tools such
as the STRMLTJOB command and the script steps master file are very
powerful, so their IBM i object authority must be carefully managed. The
command, its programs and the master files and log file are all
installed with \*PUBLIC authority revoked. These objects are owned by
the SMANET user profile. SMA recommends using the LSAM object authority
management tool (LSAM sub-menu 9, option 8) to grant individual
authorities to user profiles that do not already have authority to use
objects owned by SMANET.

 

Similar considerations apply to any IBM i source files that will be used
to store Control Language command lines that will be executed by the
STRMLTJOB script driver program.

 

Unlike some other LSAM features, the STRMLTJOB command processor program
does not run under the adopted authority of the SMANET user profile.
LSAM administrators could choose to modify the authority attributes of
the command driver program, STRMLTJOBC, using the LSAM object authority
management tool, so that this command driver program does run with the
adopted authority of the SMANET user profile. However, the LSAM software
is not distributed with this attribute because this feature and its
script steps file are very powerful and they have no built-in authority
constraints.

 

  ------------------------------------------------------------------------------------------------------------------------------ -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White \"X\" icon on red circular background](../../../Resources/Images/warning-icon(48x48).png "Warning icon")   **WARNING:** [It is solely the user\'s responsibility to properly manage the IBM i object authorities for this feature, and anyone using this feature accepts all risks and liability for its use.]
  ------------------------------------------------------------------------------------------------------------------------------ -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

##### Script Application Authority Requirements

Unlike some other LSAM features, the STRMLTJOB script driver program
does not run under the adopted authority of the SMANET user profile.
Therefore, the script driver program does not have the \*ALLOBJ
authority that is typically associated with the SMANET user profile.
Instead, when OpCon submits a job that runs the STRMLTJOB command, it is
the user profile specified in the OpCon batch job for IBM i that
establishes the authority of the script driver program. This is the same
as when an OpCon batch job for IBM i will perform a single program call.

 

The user specified for the OpCon job where the STRMLTJOB command
executes must, as described above, have sufficient authority to use the
LSAM components required by the STRMLTJOB command. These components can
be listed using the LSAM REFFLOW command, and this software analysis
tool should be used to assure that no new features have been added to
the command since this document was published. As a guideline, here are
the object authorities required just to use the original STRMLTJOB
command:

 

SMAGPL/STRMLTJOB (\*CMD): \*USE authority

 

SMAGPL/STRMLTJOBC (\*PGM): \*USE authority

 

SMAPGM/MLTJOBR00 (\*PGM): \*USE authority

 

SMADTA/MLTJOBF00 (\*FILE): Object \*USE authority and READ data
authority

-   Logical files depending on this physical file must also be set
    similarly

SMADTA/MLTJOBF10 (\*FILE): Object \*USE authority and READ data
authority

-   Logical files depending on this physical file must also be set
    similarly

SMADTA/MLTLOGF00 (\*FILE): Object \*USE authority and ADD data authority

 

SMAGPL/SMAMSGF (\*MSGF): \*USE authority

 

Any QCLSRC (or other named) source file: Object \*USE authority and READ
data authority.

 

In addition to the STRMLTJOB command tool set, the job\'s user must have
the usual authorities to the IBM i job description, job queue and output
queue (if required) that are used to start and manage the job\'s
execution.

 

The job\'s user must have authority to use any of the IBM i commands
that are included in script steps and/or source file members that
contain commands to be executed by the STRMLTJOB script driver.

 

Finally, the job\'s user must have authority to use any third-party
software applications whose commands, programs, files and other objects
will be used by the tasks initiated by script steps or by CL source
member commands. This concept is usually assumed for any job that OpCon
starts, but this reminder is necessary because certain other LSAM
automation tools may run under the authority of the SMANET user profile,
which typically has \*ALLOBJ authority. The STRMLTJOB command does not
automatically grant authority to use third-party software. In many cases
a good solution is to use the same user profiles that were already
configured for use with the third-party software application, however,
these user profiles will usually require that special authority is
granted for them to use the STRMLTJOB command objects (listed above).

#### Configuring Scripts for the STRMLTJOB Command

Setting up a multi-step IBM i job for the STRMLTJOB command only
involves the following simple steps:

1.  Navigate to the IBM i LSAM sub-menu 5: Restricted Mode and
    Multi-Step Job menu, and then select option 5: Maintain multi-step
    job scripts.
2.  Define a Script master record in the LSAM database.
3.  Add Script Steps to the LSAM Steps master file.

**- or -**

1.  Add a new source member to an IBM i source file.
2.  Edit the source member to add one or more Control Language commands.

**- then -**

1.  *(Optional)* Add a predefined LDA (IBM i job Local
    Data Area) image that will be used to set the script job\'s LDA
    content as the job starts. The whole 1024 characters of the initial
    LDA image can be configured using a function key from the Multi-Step
    Script maintenance program (refer to [Multi-Step Job Screens and     Windows](#Multi-St2) below).
    a.  LSAM Dynamic Variables of Type-L can also be configured to set
        or change the content of the LDA, after the initial LDA image is
        loaded, in order to adapt the LDA content to special
        requirements for each execution of a script. Use the Script Name
        as the name of the Type-L Dynamic Variable, and assign sequence
        numbers as necessary if more than one LDA update must be stored
        in Dynamic Variables.
2.  Add an IBM i batch job to an OpCon schedule, specifying the command
    SMAGPL/STRMLTJOB in the Call information box and naming the Script
    master record. Detailed information about the STRMLTJOB command
    parameters is offered under [Multi-Step Job Screens and     Windows](#Multi-St2).
3.  After a script is executed, LSAM log entries documenting the results
    may be viewed using a menu option, or if the command option was set,
    script log messages will also be added to the IBM i job log. Log
    entries also report when script step labels are encountered.

#### More Information about Preparing Multi-Step Jobs

There are some additional preparations that affect how the script steps
will execute and how they can be monitored by OpCon and diagnosed in
case of a script failure.

##### IBM i Job Description

The OpCon job master must specify the job description that is required
for any third-party application programs that will be executed by the
script steps, in part to control the library list that will be in effect
for the job.

 

The STRMLTJOB command performs its own built-in management of adding the
LSAM libraries to the end of the job\'s library list, at run time, so
these libraries do not need special consideration in the job
description.

##### JOBTYPE Command Parameter

When using the STRMLTJOB command in test mode, that is, when manually
executing this command outside of the control of OpCon, be sure to
change the JOBTYPE parameter of the STRMLTJOB command to a value of
\"T\" which means \"Test.\" The default value is \"O\" which means that
OpCon is starting the command. This option prevents useless messages
from being sent to the OpCon server.

##### OpCon Job Status

The script driver program that is started by the STRMLTJOB command, when
it is notified by the JOBTYPE parameter that OpCon is in control of the
job, will send signals to OpCon each time it encounters a new LABEL (on
a Script Step) or a new TAG: (in a Control Language source member).

-   LABEL or TAG name will appear in the OpCon job status field along
    with the current job status code.
-   An OpCon job detail message will be added to the messages list each
    time a new LABEL or TAG: is encountered.
    -   Using a right mouse click on the OpCon job, select Job
        Information, then click on the Configuration tab to find the Job
        Detail Messages.
    -   Each Job Detail Message will include a time stamp, indicating
        when processing for the LABEL or TAG value started. The time
        stamps could be used (manually) to compute the amount of time
        required to complete each job interval between the LABELs or
        TAGs.
    -   Putting a LABEL on each Script Step, or a CL TAG: on each source
        member command line, will provide the finest level of detail
        about the progress of the OpCon job.

##### Restart Capability and ON_RESTART Label

Another function of a LABEL or a TAG is to enable the restart capability
of the STRMLTJOB command (using the RSTLABEL parameter).

-   When the RSTLABEL parameter is not left at its default value of
    \*FIRST, the script driver program will scan the script or source
    member for the matching LABEL or TAG. It will skip all steps or
    source lines before the restart point and then start execution from
    the named LABEL or TAG.
    -   If no match is found for the specified restart value, then the
        job will end abnormally with a message that declares this error.
-   When a source member is specified on the Script master record, the
    RSTLABEL value can be a numeric value that matches the source member
    sequence number assigned to any record in the member.
    -   To support this capability, the TAG values for source members
        must not start with a digit; they must start with a non-numeric
        character (an alphabetic letter is preferred over special
        characters).
-   **IMPORTANT**: The user is responsible for understanding which
    LABELs or TAGs can be used effectively as restart points for a
    multi-step job. OpCon does not know anything about the application
    logic. There could be steps in a job requiring that a previous step
    must always be executed just before that step. In this case, the
    correct restart point would not be at the failing step, but at the
    previous step -- so it must have its own LABEL...or the use of
    labels could be managed in a way to indicate only valid restart
    points.
    -   SMA recommends that the OpCon job Documentation should contain
        instructions about what are valid restart points in a script.
-   Restarting a script at any point other than the \*FIRST step
    requires manual maintenance to the OpCon Daily job master record.
    The RSTLABEL parameter value would have to be changed manually.
    -   There is no automatic restart logic in the STRMLTJOB driver
        program, since that program does not have any information about
        which LABEL or TAG values are valid restart points.

##### ON_RESTART Special Label

A reserved name of \"ON_RESTART\" may be put into the LABEL field of one
step master record. When this special label value is used, it is good
practice to place it as the first Step in a Script, before other labels,
however, the Script driver program is able to locate this reserved label
value regardless of its position among the Script Steps.

 

An older form of this label used a hyphen instead of an underscore
character: ON-RESTART. This older format is still supported for Script
Steps (only); however, the new standard is to use the ON_RESTART format.
(This underscore format is the preferred format for CL source to pass
source edits, although the ON_RESTART label is currently not supported
for CL source members -- yet, SMA may introduce support for ON_RESTART
logic in CL source members in a future release of the software.)

 

The purpose of the ON_RESTART label value is to support job setup logic
that must be performed when a Script is being restarted. This is an
optional convenience tool that is provided, since the restart logic
would normally direct the Script driver program to start immediately at
the named RSTLABEL value. The Script driver program will look for the
Step that has this label whenever a Script is started with the RSTLABEL
parameter set to a value other than \*FIRST.

 

The ON_RESTART label may be used only once in a Script. If there is more
than one Step record that uses this label value, the Step record with
the lowest sequence number will be used, and any other Steps with higher
sequence numbers will be ignored.

 

The ON_RESTART step will not be performed when a Script is started at
the \*FIRST Step.

 

When a restart is being requested, the Script driver will find and
perform the ON_RESTART Step command as its first operation, then it will
locate the RSTLABEL Step and resume Script processing, step-by-step,
from that label.

 

Care must be taken when including an ON_RESTART label in a Script,
especially if the Script would ever be called from another Script, using
a sub-call to the STRMLTJOB command. If the RSTLABEL parameter on that
command specifies a Step label value other than \*FIRST, the Script
driver will perform the ON_RESTART Step of the sub-script before
branching to the requested label. Therefore, any Scripts that will be
used in the sub-script mode, as if they were subroutines for the main
Script, should probably not include an ON_RESTART Step label.

 

An ON_RESTART Step can take advantage of any of the Step record
capabilities. If restart logic requires complex logic, or if multiple
commands must be executed, then a separate utility Script could be
designed that would be called from the single ON_RESTART Step of the
primary script using the STRMLTJOB command as the command to execute
from the ON_RESTART Step record. (Refer to the discussion of Script
Branching capabilities.) If the ON_RESTART Step (and/or any sub-script
it calls) should fail, the Fail option flag for this record will decide
if the Script should fail or should ignore the error and continue. It is
not possible to register an ON_ERROR Step in the Script driver program
before the ON_RESTART Step is executed, therefore, if an ON_ERROR
process is desired, it should be included as part of the proposed
utility sub-script that will actually perform the restart setup steps.

##### Job Status Logging

The STRMLTJOB script driver program always writes status and error
information to the Multi-step Job Log file (MLTLOGF00), which can be
viewed from the LSAM sub-menu option 6.

 

The STRMLTJOB command parameter JOBLOG( ) is used to enable (Y) or
disable (N) the function of writing status and error messages to the IBM
i job log. When set to \"Y\" = Yes, this option makes script job details
visible in the OpCon Job Output Retrieval function (a view of the IBM i
job log report).

##### LSAM Dynamic Variables

The script driver program supports translating Dynamic Variable tokens
to their run-time values, regardless of the step command source. This
means that Dynamic Variable tokens can be used in the script step
command field (as well as in the qualifier fields of Compare Reference
and Compare Data), and they can be used in any source file member
records -- both in a single source member that contains the entire,
multiple script steps, as well as in a source member that contains a
long command for a single script step master record.

##### Step Qualifiers

Individual script steps may optionally include a comparison rule that is
used to decide whether a step should be executed or skipped.

A Compare Reference field is the first part of a qualifying rule. This
field may contain a character string and/or a Dynamic Variable token.

A Compare Data field is the second part of a qualifying rule. It is
compared to the reference field to decide if a step will be executed or
skipped. A character string and/or a Dynamic Variable token may be used
in this field.

The Comparison Rule uses a Boolean operator or the English letters that
represent Boolean operations to govern how the Data is compared to the
Reference.

+----------------------------------+----------------------------------+
| ![White pencil icon on green     | **EXAMPLE:** [In this formula: A | | circular                         | \> B (if A is greater than       |
| background](../../../Reso        | B)]{.statement2}                 |
| urces/Images/example-icon(48x48) |                                  |
| .png "Example icon") |                                  |
|                                  |                                  |
|                                  | \...the letter A represents the  |
|                                  | Compare Reference, and           |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | \...the letter B represents the  |
|                                  | Compare Data.                    |
+----------------------------------+----------------------------------+

-   The terms \"Reference\" and \"Data\" could be confusing, but the
    program works using a comparison model that matches the appearance
    of the script step maintenance screen, where the Reference field
    appears before the Boolean rule, and the Data field appears after
    the Boolean rule. This model matches the appearance and function of
    the Response Rules feature that supports many LSAM functions.

If both the Reference and the Data fields are (or tokens translate to)
both numeric, then the script driver program will used numeric
comparison logic, utilizing giant numeric fields that hold up to 63
digits, where up to 5 of these digits can be decimal places.

This method means that numeric values do not have to exactly match in
length or number of characters, as is the case when non-numeric values
are compared.

When using an IBM i source file member for the script steps, there is no
support for qualifying logic. The script driver program does not
currently support interpretation of the IF COND() Control Language
programming command.

##### Script Branching

The script driver program provides various methods to redirect the
logical flow of activity within a single multi-step job. One script can
request to run another script or it can transfer control to the other
script, and the script driver can be directed to any LABEL or TAG within
the same script or within another script.

###### Subroutines

One script can request execution of another script, and then control
will be returned to the next step within the original script. To perform
this type of branching, specify either the STRMLTJOB command or the
SMASUBR pseudo-command as the command to execute from a scrip step (or
from a source member command line). Using this technique, there is no
limit the level of nested scripts.

-   The STRMLTJOB command will always reset the job\'s LDA (IBM i Local
    Data Area) content if there is an LDA image registered with the
    SCRIPT name specified in the STRMLTJOB command. It also finds and
    applies any Type-L Dynamic Variable changes to the LDA after that
    initial image is loaded. To prevent changes to the original LDA
    assigned to a script job, always use the SMASUBR pseudo-command
    instead for implementing subroutine logic.

-   The SMASUBR pseudo-command works like the STRMLTJOB command when
    used within the currently executing script. That is, it causes
    another script to execute, and then control is returned to the
    primary script steps. But the SMASUBR command does NOT affect the
    content of the job\'s LDA. The SMASUBR pseudo-command is preferred
    for implementing subroutine logic, unless it is specifically desired
    to change the job\'s LDA, in which case the STRMLTJOB command can be
    used, as described above.

###### Branching within a Script

The Script logical flow can jump ahead to a named LABEL or TAG, or it
can loop back to a previous LABEL or TAG.

-   When the script driver program detects that a script has looped back
    to a previous LABEL or TAG more than once, a warning message is
    added to the script log file (and, optionally, to the job log). It
    is possible to create a script that could loop infinitely -- that
    is, until the IBM i job log gets too full and causes the program to
    pause on an error message.
-   SMAGOTO: This pseudo-command is used in the command line of a script
    step to tell the script driver program that it should branch to the
    specified script step LABEL. A value of \"\*CURRENT\" is used for
    the SCRIPT parameter of the SMAGOTO command to limit the LABEL
    search to anywhere in the current script.
-   CL GOTO: In a Control Language source member, the IBM i GOTO command
    is used to specify a TAG: as the branching destination. The script
    driver program recognizes the IBM i GOTO command and it performs the
    branching logic in a manner similar to a compiled CL program.

###### Branching to Another Script

The SMAGOTO pseudo-command supports a SCRIPT name parameter. When this
parameter is not left at its default value of \*CURRENT, the script
driver program will start executing the named script, and it will
abandon the current script.

-   The SMAGOTO pseudo-command can turn control over to another script
    that uses a source member for its CL commands, however, there is no
    command that can be used in a source member to turn control over to
    another script.
    -   SMA may decide in the future to also support the LSAM
        pseudo-command SMAGOTO from CL source members, but it is not
        supported at this time.
-   CL source members CAN also use the STRMLTJOB command to start
    execution of another script, but when that script completes, the
    script driver will return to the original source member, looking for
    the next source line to execute.

##### Script Step Fail-Option Flag

A flag field on the Step master record tells the script driver program
how to react if the step\'s command execution fails.

 

A value of \"F\" indicates that the script job should be forced to fail,
so that it will also show as a failed job on the OpCon schedule. An
error code of MLT0101 indicates this type of forced failure. When a
script job fails, if the JOBLOG parameter was set to \"Y\", then
detailed information messages from the script driver program can be
viewed in the job log report using the OpCon Job Output Retrieval
function.

 

A value of \"I\" indicates that the script driver should ignore the
error and continue processing the next script step. The ON_ERROR
registered command (if any) is still executed when a step command error
is ignored, since this makes it possible to trigger some external
action, even if the script is allowed to continue.

##### Step Active/Inactive Flag

A flag field on the step master record can be used to temporarily
disable any step record. When this flag is set to a value of \"I\", the
script step record will be ignored by the script driver program. The
flag must be left blank or set to a value of \"A\" to mark the step
master record as active.

 

An inactive step master record will not be used for any purpose, except
for its LABEL value. The LABEL on an inactive step record can still be
used to support branching and script restart logic. To disable the LABEL
of an inactive step record, update the step record with a blank value in
the LABEL field.

##### ON_ERROR Special Label

A reserved name of \"ON_ERROR\" may be put into the LABEL field of a
step master record. When the script driver encounters this LABEL value,
it stores the command, any qualifying rules, and the Fail-option flag
for this command into a program register. As indicated above, whenever a
step command fails and the failure is not ignored, the script driver
will then execute whatever is the current ON_ERROR registered command.

 

An older form of this label used a hyphen instead of an underscore
character: ON-ERROR. This older format is still supported for Script
Steps (only); however, the new standard is to use the ON_ERROR format.
This underscore format will also be recognized when it appears as a TAG:
in a CL source member.

 

The ON_ERROR reserved LABEL value can be used many times. Each time a
step contains this LABEL value, the script driver ON_ERROR register
values are changed. This makes it possible to change the response of the
script driver to any command error, depending on the phase or progress
of the job.

 

When the last registered ON_ERROR command value should be disabled, the
special value of \"\*NONE\" can be placed in the Command field of a new
Step record that has the ON_ERROR step label. This technique prevents a
customized recovery procedure from being executed for a different step.
However, it may be better practice to replace that custom recovery
procedure with a generic error processing command, so that there is
always some kind of ON_ERROR catch-all routine standing by in case of
any error during script step processing.

 

It is actually possible to use the ON_ERROR reserved LABEL value in the
SMAGOTO pseudo-command, in which case the script would jump ahead to the
next ON_ERROR LABEL found in the script (or, if none are found looking
ahead, the script driver will start over from the beginning of the
script and find the first occurrence of an ON_ERROR LABEL). However,
this would not be good practice because the ON_ERROR value can be used
many times, and there is no control over future changes to the number
and location of steps that use this reserved LABEL value.

 

If the ON_ERROR registered qualifying rule is not met, then the ON_ERROR
registered command will not be executed. The failure to qualify is
marked by a message in the script activity log (and, optionally, the job
log).

 

If the ON_ERROR registered command fails during its execution, the
ON_ERROR registered Fail Option flag will be used to decide if the
script job should fail, or whether the script driver should ignore the
ON_ERROR command failure and continue any other processing that remains.

 

The ON_ERROR registered command could request a complex set of
instructions should be executed if the command is a STRMLTJOB command
that requests execution of another script. (This is the sub-routine
technique described above, where the script driver program control will
return to the original script after the secondary script has completed
execution.) Results of a sub-routine script can be returned to the
primary script using an LSAM Dynamic Variable, which could then be used
by the primary script to govern its subsequent behavior. For some error
conditions, the SMAGOTO pseudo-command could be used instead, in order
to redirect the script driver to continue processing with a completely
different script.

 

Another useful technique for the ON_ERROR registered command might be to
specify a \*CURRENT script LABEL in the SMAGOTO pseudo-command, which
would redirect the script logic to a segment of the script where
multiple steps could be dedicated to managing error conditions. The
other steps in the script can be configured to flow past the reserved
LABEL location in the script by executing a SMAGOTO command that
branches to a LABEL farther ahead in the script.

 

Note that the Step Active/Inactive Flag (described above) would cause
the script driver program to ignore a step record that contains the
reserved ON_ERROR LABEL value. In this case, the ignored ON_ERROR
command would never be registered by the script driver program.

##### Labeled Steps with No Command

It is possible to create a Step record that has no command to execute.
This allows Step records to be created that exist only for the purpose
of establishing a LABEL location in the Script. This technique would be
useful if a new ON_ERROR command should be registered whenever any
Script causes branching directly to a new LABEL location. Thus, before
processing resumes at the new location, a new ON_ERROR command could be
registered that would be the most appropriate for the new segment of
Script logic.

 

Of course, if there is no command on a Step record, then the qualifier
fields have no use, and there is no effect of the Fail Option or
Active/Inactive flags. For more information about the management of
LABELs on an Inactive record, refer to [Step Active/Inactive
Flag](#Step). However, the Description field would be
useful for describing why the Step record exists with a LABEL and no
command.

##### Constraints when Using Source Members

IBM i source file members can be used either as an entire script of
commands to be performed, instead of using the LSAM Script Step master
records, or they can be used to contain a single, long command instead
of the built-in command line of a Script Step record.

 

When using source file members with the STRMLTJOB Scripts or Steps,
there are some limitations. The source records can contain only Control
Language (CL) commands, comments, and TAGS:. Most forms of CL commands
that are used for managing the logic of CL programs are not supported,
except that the Script driver program will recognize the GOTO command,
and it will attempt to relocate the Script driver program to the source
line that contains the TAG value specified in the CMDLBL parameter or
the GOTO command.

 

Following are some specific capabilities and limitations when using
source file members for Script steps:

-   CL commands can be continued into multiple source member records,
    using the IBM i convention of ending a line with either a plus sign
    (+) or a hyphen (-).
-   The script driver program always truncates trailing spaces of source
    member lines, but it does not trim off leading space characters.
    Therefore, authors of CL source members can use the leading spaces
    of a source record, or leave no spaces, depending on how the
    multi-record command should be reconstructed into the full command
    string.
-   When the line ends in a plus sign, the script driver program will
    insert one space character in place of the plus sign, then it will
    append the contents of the next source record to the command line
    that is being assembled.
-   When the line ends in a hyphen, the script driver program will
    append the next source record at the exact location where the hyphen
    was located.
-   Comments in CL source records begin with /\* and end with \*/.
    Comments may span more than one source record, although the
    incomplete comment record must end with a plus sign (+) or a hyphen
    (-). The script driver will ignore comments and will continue to
    search the source member records until the end of a comment is
    found. Any non-blank characters that occur before or after a comment
    in a source record will be considered as part of a CL command,
    except that TAGS: will always be handled as TAGS: (as long as they
    occur outside of the comment control characters).
-   CL program logic commands, such as PGM, IF, ELSE, ENDDO, MONMSG and
    ENDPGM commands, are not recognized by the script driver program. If
    they exist in the source member records, they will create a failed
    command execution error and the script job will fail.
-   CL programs that are being converted to scripts that require
    conditions be tested should be manually converted to LSAM Multi-step
    Script Step records, where the qualifier fields of the Step record
    can be used to test conditions and control the execution and flow of
    the script steps.
-   The CL programming variable field management is not supported by the
    LSAM script driver. The DCL (Declare) statement cannot be used, and
    no CL variables (which begin with &) can be used.
-   DCL statements can be replaced in script steps or in CL source
    records by initial step records that execute the LSAM SETDYNVAR
    command. This command can be used to create and define character
    strings up to 128 characters long, or numeric values that include up
    to 63 digits (any of which can be to the right of the decimal
    point).
-   CL program variables can be replaced by LSAM Dynamic Variable tokens
    (such as {DVTOKENNAME}). Dynamic Variables are supported anywhere in
    CL source records, and they are also supported in Script Steps, in
    the command field as well as the Compare Reference field and the
    Compare Data field.
-   Remember that since there is no support for IF COND( ) statements in
    the CL source records, there is no method by which Dynamic Variable
    tokens can be tested or compared within CL source members. To
    perform Dynamic Variable token value testing, use the qualifier
    rules of script step records.

## Multi-Step Job Screens and Windows

The Restricted Mode and Multi-Step Job Menu is documented above.

### Maintain Multi-Step Job Scripts

-   **Screen Title**: Multi-Step Job Scripts
-   **Screen ID**: MLTJOBR10-1

###### Menu Pathways

Main Menu \> Restricted Mode and Multi-Step Job menu (\#5) \> Option
(\#5)

###### Options

-   **1=Script steps**: Use this option to work with the Step master
    records that define a Script.
-   **2=Change, 3=Copy** : Use these options to maintain or create just
    the Script master records. Option 3 works like function key F6=Add.
    (Use option 1 to work with the list of Steps, in order to change or
    copy the Step master records.)
-   **4=Delete**: Type this option and press \<**Enter**\> to add one or
    more records to a list of pending delete requests. After the Enter
    key is pressed, a confirmation list will appear requesting
    confirmation of all delete requests before Script master records are
    actually removed. Note that the Delete action used on a Script
    master record will also delete all the Step master records
    associated with a Script.
-   **5=Display**: Branches to a display of all the fields defining one
    Script master record.
-   **8=Export**: Initiate dialog to export this script, its steps, and
    all associated data.
-   **9=Flow chart**: Branches to an analytic display of the script
    flow, including any sub-scripts that are called by the primary
    script. The flow chart view offers additional options for studying a
    script, including a Fold option that will display an entire command
    line within the list. The flow chart can be also be printed.

###### Functions

-   **F3=Exit**: Returns to the sub-menu.
-   **F5=Refresh**: Reloads the list from the current values in the
    master file.
-   **F6=Add**: Branches to the Script master new record input screen.
-   **F12=Cancel**: Returns to the sub-menu.
-   **F16=Search next**: Starts or repeats a search looking for match to
    the value entered in the Search field. Each whole master record is
    searched, not just the values appearing on the list display.

###### Fields

-   **Search content**: Type a value in this field and press
    \<**Enter**\> or \<**F16**\> to search all the master records for
    the first record that contains the value. The entire master record
    is searched, not just the fields appearing on the list display.
    After a new search is started, use the \<**F16**\> function key to
    continue the search to the next record.
-   **Opt**: Type one of the options listed near the top of the display
    next to one or more of the listed lines, then press \<**Enter**\> to
    start executing each option, one by one.

#### Multi-Step Job Script Master Record Display

-   **Screen Title**: Multi-step Job Script
-   **Screen ID**: MLTJOBR10-3

The screen is used to illustrate the Display, Change, Copy and Add
functions.

###### Menu Pathways

-   Main Menu \> Restricted Mode and Multi-Step Job menu (\#5) \>
    Multi-step Job Scripts \> F6= Add
-   Main Menu \> Restricted Mode and Multi-Step Job menu (\#5) \>
    Multi-step Job Scripts \> Option 2 = Change
-   Main Menu \> Restricted Mode and Multi-Step Job menu (\#5) \>
    Multi-step Job Scripts \> Option 3 = Copy
-   Main Menu \> Restricted Mode and Multi-Step Job menu (\#5) \>
    Multi-step Job Scripts \> Option 5 = Display

###### Functions

-   **F3=Exit**: Returns to the LSAM sub-menu. Any changes typed on the
    screen are not updated on the master record.
-   **F5=Refresh**: Appears only for Change, Copy or Add. Restores the
    field values to their original settings as they first appeared when
    this display format was accessed.
-   **F12=Cancel**: Returns to the Script Steps master records list
    without updating the current master record.
-   **F15=View/Maintain LDA**: Branch to the LDA displays. For Add, Copy
    or Change, the program branches to the Maintain screen, but while in
    Display mode it branches to Display LDA.

###### Fields

-   **Script name**: The name of the Script. This is the value that will
    be used by the STRMLTJOB command or the SMAGOTO pseudo-command to
    reference any Script. An existing Script Name may be changed, using
    option 2=Change.
-   **Script Type**: The Script Type indicates whether the script steps
    are contained in associated STEPS master records, or in a SCRMBR
    where the Source file, library and member fields point to an IBM i
    source file member that contains the CL commands that will be
    executed instead of using Script Step master records.
-   **Description**: This text helps to identify the purpose of a Script
    on the Scripts master record list.
-   **Source file, library and member**: Use these fields when the
    Script record type field is set to SRCMBR, to identify the IBM i DB2
    library, file and source member where the Script Steps may be found.
    When the type is SCRMBR, the list of Script Steps will show the
    actual records found in this source file member. The screen prompts
    recommend using the LSAM\'s source file DBFCMDSRC to contain script
    source CL members, since this file is well controlled and supported
    by the LSAM, but any IBM i source file can be used instead.
-   **Last maintenance user, timestamp**: Shows the IBM i user profile
    that last used the LSAM maintenance program to change the master
    record, and the timestamp when this maintenance was performed.
-   **Internal primary key**: An SQL auto-assigned record number field.
    This data may be used by technical support personnel. This Primary
    key of this Script master record is used by the associated Step
    master records to logically associate them with the Script master.
    This allows the Script name to be changed without affecting the
    relationship with its Step records.

#### Delete Multi-Step Job Scripts

-   **Screen Title**: Multi-step Job Scripts
-   **Screen ID**: MLTJOBR10-4

###### Menu Pathways

Main Menu \> Restricted Mode and Multi-Step Job menu (\#5) \> Option
4=Delete

###### Functions

-   **F3=Exit**: Returns to the sub-menu.
-   **F12=Cancel**: Returns to the list of Scripts. All previous
    requests to delete Scripts are discarded.
-   **F14=Confirm**: Confirming the delete action causes the Script
    master record(s) and all associated Step records to be erased from
    the master files. Erased records cannot be recovered (except by
    restoring master files from a backup copy).

#### Script Steps Flow Chart (option 9)

Script Steps Flow Chart

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------
  [MLTR11R1                ]{style="color: #008000;"}Multi-Step Job Script Flow Chart              [00/00/00]{style="color: #008000;"}   [USERNAME                    Starting Script:]{style="color: #008000;"} [TEST1]{style="color: #ff00ff;"}                    [00:00:00]{style="color: #008000;"}
  [                                                     Search content:]{style="color: #008000;"} [          ]{style="color: #ffcc00;text-decoration: underline;"}   Script/Label  BR/STEP Command
  TEST1                 Export testing
  \|..              0010   DLYJOB DLY(1)
  \|..              0020   SMASUBR SCRIPT(TEST3) RSTLABEL(LBL3A) JOBTYPE(T) /\* Co
  \|..           SMASUBR    Script: TEST3  Label: LBL3A
  \|..                         WARNING: Branch Label not found
  \|..RESTART030    0030   SMADTA/DBFCMDSRC(MJSTEP1) = MJLBL01:   SNDMSG MSG(\'Tes
  \|..              0040   SMAGOTO SCRIPT(TEST2) STEP(RESTART020)
  \|..           SMAGOTO    Script: TEST2  Label: RESTART020
  \|..           \-\--\>          (See analysis of GOTO target above/below)
  END
   
  TEST2                 Second test as sub-script from TEST1
  \|..RESTART020    0020   DLYJOB DLY(1)
  \|..              0030   SMAGOTO SCRIPT(TEST1) STEP(RESTART030)
  \|..           SMAGOTO    Script: TEST1  Label: RESTART030
  \|..           \-\--\>          (See analysis of GOTO target above/below)
  END
  Bottom
  F3=Exit F5=Refresh F9=Print F10=Fold/Unfold F11=View F12=Cancel F16=Search Nxt
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------

###### Menu Pathways

Main Menu \> Restricted Mode and Multi-Step Job menu (\#5) \> Option
9=Flow chart

###### Functions

-   **F3=Exit**: Returns to the sub-menu.
-   **F5=Refresh**: Reloads the data and repeats this display.
-   **F9=Print**: Creates a spool file within the current job that can
    be printed. The report shows the entire flow chart, even if multiple
    display pages are required. The report reflects the current viewing
    mode, of Folded (show entire command line) or Unfolded, as well as
    the current V11 View option.
-   **F10=Fold/Unfold**: Fold uses addition lines to display the entire
    content of the right side of the list, such as the complete Command
    line, a long Description or the entire Compare Rule. Unfold returns
    the list to one line per step (except that additional information
    lines about branching are always displayed).
-   **F11=View**: Alters the right side of the display, rotating
    through: Command, Description and Compare Rule.
-   **F12=Cancel**: Returns to the list of Scripts.
-   **F16=Search Nxt**: After a Search content value is typed and Enter
    is pressed, F16 is used to search for the next list record that
    contains matching content. Use F16 to continue a search through to
    the end of the list.

#### F15=Display/Maintain LDA

Both the Display and the Maintain functions for the LDA (IBM i job Local
Data Area) are described in [F15 = Change LDA](Job-Tracking-and-Queuing.md#F152).

 

That function and this Multi-Step Job Scripting feature both share the
same LSAM file (JOBLDAF00) to store LDA images. The key to each LDA
image record is either the Tracked Job Name or the Multi-Step Script
name, therefore, do not use the same name in both features - be sure
that Multi-Step Script names are unique.

### Work with Script Steps and Source Members

#### Work with Multi-Step Job Script Steps

Also refer to the alternate list format for Scripts of type SRCMBR
described on the screen.

-   **Screen Title**: Multi-step Job Script Steps
-   **Screen ID**: MLTJOBR10-2

###### Menu Pathways

Main Menu \> Restricted Mode and Multi-Step Job menu (\#5) \> Multi-step
Job Scripts \> Option 1 = Script Steps

###### Options

-   **2=Change, 3=Copy**: Use these options to maintain or create
    individual step records. Option 3 works like function key F6=Add.
-   **4=Delete**: Type this option and press \<**Enter**\> to add one or
    more records to a list of pending delete requests. After the Enter
    key is pressed, a confirmation list will appear requesting
    confirmation of all delete requests before Step master records are
    actually removed.
-   **5=Display**: Branches to a display of all the fields defining one
    Step master record.
-   **6=DspSrc**: This option works only with Step records that refer to
    an external source library/file(member) instead of using the Command
    field on the step record itself. The contents of the external source
    member will be displayed, using one of the IBM i source file member
    display tools that are available on a user\'s system. Use function
    key \<**F11**\> to vary the View of this list until the Command line
    and/or Library/File(Member) value is shown for each Step, in order
    to determine which Step lines can use option 6.

###### Functions

-   **F3=Exit**: Returns to the sub-menu.

-   **F5=Refresh**: The display program updates all the information
    about every listed record by re-reading the entire Steps master
    file.

-   **F6=Add**: Press this function key to start adding a new Step
    master record to the current Script.

-   **F7=ReSeq**: Press this function key to re-assign sequence numbers
    to the Step master records in even intervals. The default increment
    for a short list of steps is to count by tens. This function key is
    useful after many records have been inserted between two existing
    Step records, in case there are no more available intermediate
    sequence numbers.

-   **F9=Print**: Press this function key to generate a complete list of
    all the lines that could appear on this list display, including
    lines that require PageDown (or PageUp) to view on the display. The
    printed report will reflect the current View selected by function
    key F11. (HINT: Use option 9=Flow chart, from the list of Script
    names, to view and/or print a list of script steps that can show all
    of the command text for each step, if F10=Fold was first used on the
    script names list.)

-   **F11=View**: This function key changes the content of the right
    side of the list display to show different parts of each Step
    record. The current View is indicated by the \"View\" field that is
    on the right side of the column headers. Views include:

    1.  Command Text or Source LIBRARY/FILE(MEMBER)
    2.  Step Description
    3.  Qualifier Comparison Rule (summarized/truncated, in case values
        are too long)

-   **F12=Cancel**: Returns to the sub-menu.

-   **F16=Search (next)**: When a value was typed in the Search Content
    key, after the Enter key is used to find the first match, this
    function key F16 will continue the search to find the next matching
    record.

###### Fields

-   **Script Name**: The name of the Script whose Steps appear in the
    list.
-   **Type**: The Script type code of STEPS or SRCMBR. When the Script
    type is SRCMBR, the list shows the (partial) contents of each record
    found in the referenced source file member.
-   **Description** The description from the Script master record.
-   **Search content**: Type a value in this field and press
    \<**Enter**\> or \<**F16**\> to search all the master records for
    the first record that contains the value. The entire master record
    is searched, not just the fields appearing on the list display.
    After a new search is started, use the **\<F16\>** function key to
    continue the search to the next record.
-   **Opt**: Type one of the options listed near the top of the display
    next to one or more of the listed lines, then press \<**Enter**\> to
    start executing each option, one by one.
-   **Seq \#**: The sequence number assigned to each Script. Function
    key F7 can be used, when necessary, to automatically re-sequence all
    of the Steps in the current Script.
-   **S (Status)**: The status of a Step master record can be \"I\" =
    Inactive (will not be considered during Script execution, except for
    a LABEL if it is not blank). Otherwise, if the status is blank or
    \"A\", the Script Step is active.
-   **F (Fail/Ignore)**: The list uses this column to show the Step
    record\'s \"Error Fail/Ignore\" field value. This flag tells the
    script driver what to do when the step command fails: either force
    the script job to Fail, or Ignore the error and allow the script to
    continue.
-   **Label**: The LABEL that is optionally assigned to a Script Step.
    Labels are used for Script restart logic, for branching controls,
    and for reporting Script job progress to OpCon.
-   **CNT**: This is a \"Continuation\" code field, reserved for future
    use when Script Step qualifier rules may be combined into a complex
    qualification formula. (This field is not currently supported.)
-   **Step Description/Command text/Qualifier/**: Depending on the
    current View selected by function key F11, this field will display
    the Step Description, the first part of the Command field text, the
    LIBRARY/FILE(MEMBER) of a Step that does not use its own Command
    text, or a shortened summary of the Qualifier rule.
-   **View**: This Header-only field identifies the current list view
    that was selected using the F11 function key. (Refer to F11, above,
    for more information.)

#### Display Multi-Step Job Script Source Member Records

Also refer to the alternate list format for Scripts of type STEPS,
described above.

-   **Screen Title**: Multi-step Job Script Steps
-   **Screen ID**: MLTJOBR10-2

###### Menu Pathways

Main Menu \> Restricted Mode and Multi-Step Job menu (\#5) \> Multi-step
Job Scripts \> Option 1 = Script Steps

###### Options

**5=Display**: Branches to a display of all the fields defining one Step
master record, where the complete source line content is displayed.

###### Functions

-   **F3=Exit**: Returns to the sub-menu.
-   **F5=Refresh**: The display program updates all the information
    about every listed record by re-reading the entire Steps master
    file.
-   **F12=Cancel**: Returns to the sub-menu.
-   **F16=Search (next)**: When a value was typed in the Search Content
    key, after the Enter key is used to find the first match, this
    function key F16 will continue the search to find the next matching
    record.

###### Fields

-   **Script Name**: The name of the Script for which Steps appear in
    the list.
-   **Type**: The Script type code of STEPS or SRCMBR. When the Script
    type is SRCMBR, the list shows the (partial) contents of each record
    found in the referenced source file member.
-   **Description**: The description from the Script master record.
-   **Search content**: Type a value in this field and press
    \<**Enter**\> or \<**F16**\> to search all the master records for
    the first record that contains the value. The entire master record
    is searched, not just the fields appearing on the list display.
    After a new search is started, use the \<**F16**\> function key to
    continue the search to the next record.
-   **Opt**: Type one of the options listed near the top of the display
    next to one or more of the listed lines, then press \<**Enter**\> to
    start executing each option, one by one.
-   **Seq \#**: The sequence number assigned to each record in the
    source file member. Decimal places are not marked in this display,
    but the last two digits occur to the right of the decimal point.
-   **Label**: The display program searches each source member record
    for any TAG:, and if one is found, it is displayed in this column.
    This display logic can be used to confirm that TAGS: will also be
    found during actual script execution. If there is an unusual
    appearance of a tag, or if a tag is not found by this list display,
    then the source member record must be edited until the TAG: will be
    found by this LSAM tool.
-   **Source member command**: The first part of the source member
    record is show in this list display. Use option 5=Display to view
    the entire source member line, which may occupy up to 80 or 100
    bytes, depending on the record size of the source file. (The Command
    line field on the Step Details display is used for display purposes
    only, to show the content of source member records.)

#### Multi-Step Job Script Step Maintenance and Display

-   **Screen Title**: Display Multi-step Job Script Step Detail
-   **Screen ID**: MLTJOBR10-5

The screen is used to illustrate the Display, Change, Copy and Add
functions. For SRCMBR records, only option 5=Display is available.

###### Menu Pathways

-   Main Menu \> Restricted Mode and Multi-Step Job menu (\#5) \>
    Multi-step Job Scripts \> Option 1 = Script steps \> F6= Add
-   Main Menu \> Restricted Mode and Multi-Step Job menu (\#5) \>
    Multi-step Job Scripts \> Option 1 = Script steps \>Option 2 =
    Change
-   Main Menu \> Restricted Mode and Multi-Step Job menu (\#5) \>
    Multi-step Job Scripts \> Option 1 = Script steps \> Option 3 = Copy
-   Main Menu \> Restricted Mode and Multi-Step Job menu (\#5) \>
    Multi-step Job Scripts \> Option 1 = Script steps \>Option 5 =
    Display

###### Functions

-   **F3=Exit**: Returns to the sub-menu.

-   **F4=Prompt**: From the Compare Rule field, F4 requests a list
    window from which a valid Compare operator value may be selected.
    From the Command field, this function key calls the IBM i command
    prompter so that a properly formatted command can be returned. The
    IBM i command name should be typed before pressing F4 for best
    results.

-   **F5=Refresh**: In Add, Change or Copy mode, this function key
    restores the display to its original values upon first display.

-   **F7=DspSrc**: This function key works only for Step records that
    refer to an external source library/file(member) instead of using
    the Command field on the step record itself. The contents of the
    external source member will be displayed, using one of the IBM i
    source file member display tools that are available on a user\'s
    system.

-   **F8=DynVar**: Requests a list of available Dynamic Variable token
    names, when used from the fields Compare Reference, Compare Data or
    Command.

-   **F9=Evt Cmds**: From the Command field, this function key requests
    a list of valid OpCon external event commands. SMA recommends
    selecting the CPYTOMSGIN general command, since that selection will
    be followed by another window that offers a useful list of external
    event command templates that may be selected to help properly format
    the OpCon Event command.

-   **F10=\$VAR**: From the fields Compare Reference, Compare Data, and
    Command, this function key presents a pop-up list showing the
    supported \$-Variable tokens that can be selected for insertion into
    the field. Refer to the list of supported \$VAR values, below.

-   **F12=Cancel**: Returns to the list display without updating the
    master file.

-   **F13=Full CMD**: This function key causes a program branch to a
    separate display that is dedicated to managing the entire Command
    line, supporting up to the maximum of 1024 characters. (For commands
    requiring a longer character string, use an external Source File,
    Library and Member.) In Change and Copy modes, if the Command string
    is already longer than the partial field shown on the primary Step
    record display, then the primary display field is protected and
    function key F13 must be used to maintain the longer, full Command
    string.

###### Fields

-   **Script Name**: The name of the Script for which Step appears on
    this display.
-   **Script Key \#**: This field is for used by technical support
    personnel. It shows the internal primary key that links the Step
    record to its Script master record. (This technique allows the
    Script name to be changed.)
-   **Step sequence number**: The sequence number assigned to each step
    record. For source member records, this is the sequence number
    assigned to the record in the source file member. Decimal places are
    not marked in this display, but the last two digits occur to the
    right of the decimal point.
-   **Label**: For Step records, the LABEL value that is optionally
    applied to this step. Special values supported in the LABEL field
    (explained above) include:
    -   ON_ERROR: Registers a command (with optional qualifier) that may
        be executed when any script fails. This special label value may
        be used multiple times, at any location in the Script, whenever
        the error response command should be changed.
    -   ON_RESTART: This value marks an optional Step record that is
        only executed if a Script is restarted by the STRMLTJOB command
        using a value other than \"\*FIRST\" in the RSTLABEL parameter,
        before the Script resumes processing. This special label value
        can be used only once in a Script.
-   **Error Fail/Ignore**: Use a value of \"F\" = Fail to tell the
    script driver program that if the command in this step fails, the
    whole script job should stop and be marked failed. Otherwise, a
    value of blank or \"I\" (Ignore) tells the script driver to ignore
    errors and continue processing the next script step. If there is an
    ON_ERROR command registered, it will be executed even when the
    failed step is marked \"I\" for Ignore. To avoid this behavior,
    insert another ON_ERROR step that will change the currently
    registered ON_ERROR command to perform a command that has no
    important effect. The value of this field on a specially labeled
    ON_ERROR Step record will be used to decide if the Script should
    fail when the ON_ERROR command fails, as it is being performed when
    a Step record that was marked Ignore had a command failure. (Step
    records that were marked F=Fail when their command has failed will
    already cause the Script job to fail, whether or not the ON_ERROR
    registered command was successful.)
-   **Status**: A value of \"I\" means inactive, and the Script Step
    will be bypassed by the script driver program. However, LABELs on
    Inactive records will still be useful. To disable a LABEL on an
    Inactive record, remove the LABEL and update that field to blanks. A
    value of blank or \"A\" means the Step record is active.
-   **Description**: The description of the purpose of this Step record.
    (There is no description when a source member record is being
    displayed.)
-   **Continue**: This field is not implemented in the original version
    of this LSAM feature. Similar to LSAM Response Rules, this field is
    intended to support composing a complex set of qualifier
    relationships into a single rule. Without this field, complex
    comparisons can only be performed by combining qualifier rules with
    SMAGOTO commands and LABELS that will bypass commands until two or
    more qualifiers are satisfied.
-   **Compare reference**: This is the left-hand factor of a Boolean
    comparison that determines whether a Step command will execute or be
    bypassed.
-   **Comparison rule**: The Boolean symbol or an English abbreviation
    for the operator that determines how the Compare Reference (to the
    left of the operator) is compared to the Compare Data (to the right
    of the operator).
-   **Compare data**: This is the right-hand factor of a Boolean
    comparison that determines whether a Step command will execute or be
    bypassed.
-   **Command**: For a Step command, this is the entire command that
    will be executed if the Step is active and qualified.
-   **Soure file, Libr, Member**: Instead of using the Command field, a
    Step record can refer to an IBM i DB2 source file member where a
    longer command line may be stored using multiple source member
    records. When a source file member is referred to by a Step,
    function key F7=DspSrc may be used to call an IBM i command that
    will display the complete contents of the referenced source file
    member.
-   **Last maintenance user, timestamp**: Shows the IBM i user profile
    that last used the LSAM maintenance program to change the master
    record, and the timestamp when this maintenance was performed.
-   **Internal primary key**: An SQL auto-assigned record number field.
    This data may be used by technical support personnel.

##### F10=\$VAR Pop-up Window Values

Display formats MLTJOBR10-5 and MLTJOBR10-5A support function key F10
for selecting \$Variable tokens that can be inserted into supported
fields. These tokens do not require any special characters around them.
Instead, they should be left inserted with the US dollar sign (\$) at
the beginning, all capital letters and spaces just where they are shown.

 

The Multi-Step Job Script driver program will recognize exactly spelled
tokens and then replace them with the values shown in the following
table; however, the values for OpCon properties, such as \$SCHEDULE
values, can only be replaced if the Script job was started by OpCon.
They are not valid when Scripts are executed independently of OpCon, for
example, if a Script is executed by a Message Management Parameters
command or a Response Rule linked to Message Management.

 

  Variable           Description
  ------------------ -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  \$ERRMSGID         The 7-character message ID reported by IBM i when any Script Step fails. This value can also be referenced from the currently active ON_ERROR management command.
  \$ERRMSGTXT        The primary message text of the 7-character message ID reported by IBM i when any Script Step fails. This value can also be referenced from the currently active ON_ERROR management command.
  \$FREQUENCY NAME   The name of the OpCon Frequency assigned to the OpCon job that started the Script job.
  \$IBM JOB ID       The full IBM i job ID for the job in which the Script is executing, in the format of 123456/USER/NAME.
  \$IBM JOB NAME     The IBM i Job Name of the job in which the Script is executing.
  \$IBM JOB NBR      The IBM i Job Number of the job in which the Script is executing.
  \$IBM JOB USER     The IBM i User Profile that is part of the Job ID in which the Script is executing.
  \$JOBID            The OpCon job identified, a 10-digit number, of the OpCon job that started the Script job.
  \$JOBID CMP        The OpCon job name and job identifier, joined into a single string with blanks compressed out, for the OpCon job that started the Script job.
  \$JOBID LONG       The OpCon job name, followed by the job identifier, with all blanks retained in the string, for the OpCon job that started the Script job.
  \$JOB NAME         The short format of the OpCon job name, for the job that started the Script job.
  \$JOB LONG NAME    The long format of the complete OpCon job name, for the job that started the Script job.
  \$MACHINE NAME     The OpCon name for the Agent (LSAM) machine in which the Script job is executing.
  \$SCHEDULE DATE    The date of the OpCon schedule under which the current job was started, in the (\*ISO0) format of CCYYMMDD.
  \$SCHEDULE NAME    The name of the OpCon schedule under which the current job was started.

#### Multi-Step Job Script Step Full Command Maintenance and Display

-   **Screen Title**: Multi-Step Job Step Command
-   **Screen ID**: MLTJOBR10-5A

###### Menu Pathways

Main Menu \> Restricted Mode and Multi-Step Job menu (\#5) \> Multi-step
Job Scripts \> Option 1 = Script steps \> Add/Change/Copy/Display \>
F13=Full CMD

###### Functions

-   **F3=Exit**: Returns to the sub-menu, any pending updates are lost.
-   **F4=Prompt**: This function key calls the IBM i command prompter so
    that a properly formatted command can be returned. The IBM i command
    name should be typed before pressing F4 for best results.
-   **F5=Refresh**: In Add, Change or Copy mode, this function key
    restores the display to its original values upon first display.
-   **F8=DynVar**: Requests a list of available Dynamic Variable token
    names.
-   **F9=Evt Cmds**: From the Command field, this function key requests
    a list of valid OpCon external event commands. SMA recommends
    selecting the CPYTOMSGIN general command, since that selection will
    be followed by another window that offers a useful list of external
    event command templates that may be selected to help properly format
    the OpCon Event command.
-    **F10=\$VAR**: This function key presents a pop-up list showing the
    supported \$-Variable tokens that can be selected for insertion into
    the Command field. Refer to the list of supported \$VAR values,
    above.
-   **F12=Cancel**: Returns to the primary Step record display without
    updating the Command field.
-   **Enter=update/return**: Press Enter to return to the primary Step
    master record display. In Add, Change or Copy modes, any changes
    made to the Command text will be stored to the master record when
    the Enter key is pressed.

###### Fields

-   **Script Name**: The name of the Script whose Step appears on this
    display.
-   **Step sequence number**: The sequence number assigned to each step
    record. For source member records, this is the sequence number
    assigned to the record in the source file member. Decimal places are
    not marked in this display, but the last two digits occur to the
    right of the decimal point.

#### Delete Multi-Step Job Script Steps

-   **Screen Title**: Multi-step Job Script Steps
-   **Screen ID**: MLTJOBR10-6

###### Menu Pathways

Main Menu \> Restricted Mode and Multi-Step Job menu (\#5) \> Option
1=Script steps \> Option 4=Delete

###### Functions

-   **F3=Exit**: Returns to the sub-menu.
-   **F12=Cancel**: Returns to the list of Script Steps. All previous
    requests to delete Steps are discarded.
-   **F14=Confirm**: Confirming the delete action causes the Step
    records to be erased from the master file. Erased records cannot be
    recovered (except by restoring master files from a backup copy).

### Multi-Step Job Script Command STRMLTJOB

The STRMLTJOB command, located in the SMAGPL library, is used to execute
multi-step job scripts. It can be executed from OpCon using a simple IBM
i batch job, and it can also be executed in test mode (not connected to
OpCon) from an IBM i command line or from a submitted batch job by
setting the JOBTYPE parameter to \"T\" for test mode.

STRMLTJOB Command Prompt with Keywords

  ----------------------------------------------------------------------------------------------------
                                    Start Multi-step Job (STRMLTJOB)
                                                    
                                       Type choices, press Enter.
                                                    
   Script name  . . . . . . . . . . SCRIPT         [          ]{style="text-decoration: underline;"}    Restart label  . . . . . . . . . RSTLABEL       [          ]{style="text-decoration: underline;"}
        Job type: T=test, O=OpCon  . . . JOBTYPE        [O]{style="text-decoration: underline;"}         Write to job log: Y/N  . . . . . JOBLOG         [Y]{style="text-decoration: underline;"}
   Environment name . . . . . . . . ENV            [\*DEFAULT  ]{style="text-decoration: underline;"}    LSAM General Purpose Library . . GPL            [\*DEFAULT  ]{style="text-decoration: underline;"}
                                                    
                                                    
                                                 Bottom
             F3=Exit   F4=Prompt   F5=Refresh   F12=Cancel   F13=How to use this display   
                                             F24=More keys
  ----------------------------------------------------------------------------------------------------

Additional important information about the use and impact of the command
parameters may be found in the \"More Information\...\" section above,
in this part of the topic about Multi-Step Jobs.

###### Command Parameters

-   **SCRIPT: Script name**: The name of the script whose steps will be
    executed.
-   **RSTLABL: Restart label**: The name of a label assigned to the
    script step where the job execution should start.
    -   When an IBM i Control Language source member is used to define
        the script steps, then a CL TAG: label can be specified in this
        parameter (but do not include the colon character).
    -   When this parameter is blank, the script will start with the
        lowest numbered step. Numeric values can be used in this
        parameter to specify a step by its sequence number, and numeric
        values can also be used to control the restart point with a
        Control Language source member. More information about restart
        logic is provided above in the \"More Information\...\" section
        of Multi-Step Job scripting.
    -   Be aware that a script may contain a specially labeled
        ON_RESTART step which will always be executed before the script
        execution then branches to the step indicated in this parameter.
-   **JOBTYPE: Job type: T=test, O=OpCon**: The default value of \"O\"
    indicates to the command driver program that it was started by OpCon
    and that it should communication step label progress messages and
    the overall job results back to OpCon.
    -   When the command is started directly from an IBM i command line,
        or from an IBM i batch job not started by OpCon, set this
        parameter to a value of \"T\" to indicate test mode, which
        really means that the command driver will not attempt to
        communicate job results to OpCon.
    -   In OpCon mode, the script driver program sends important job
        status messages to OpCon that cause the last Step Label (or CL
        TAG:) name to be displayed as part of the OpCon job status
        description. This aids in visually monitoring the progress of a
        multi-step job. A step label message is also added to the OpCon
        Job Detail Messages list, so that a history of the step
        execution and its time can be viewed from the OpCon Job
        Information function, under the Configuration tab.
-   **JOBLOG: Write to job log: Y/N**: The script driver program always
    writes script execution messages to the LSAM Multi-Step Job log
    file. The entries in this file may be viewed using the LSAM sub-menu
    5, option 6. Set this parameter to \"Y\" = yes to tell the script
    driver program to also write the log entries as messages added to
    the IBM i job log report.
    -   It is often easiest to diagnose script failures when the job log
        contains the script execution entries before and after other IBM
        i system messages. However, IBM i job attributes, job
        description settings and system values also govern which
        messages are retained in the job log report.
    -   Use a verbose IBM i job logging setting such as LOG(4 00
        \*SECLVL) to be sure that all script messages will remain part
        of the job log report.
    -   The script driver includes in the log entries and messages a
        marker as any new Step Label is encountered.
-   **ENV: Environment name**: This command parameter supports
    special-purpose internal operations. Normally the value of this
    parameter should be left set to \*DEFAULT, indicating that the LSAM
    environment supporting the script execution is defined by LSAM
    command actions that depend on the PRDLIB attribute of the STRMLTJOB
    command.
-   **GPL: LSAM General Purpose Library**: This command parameter
    supports special-purpose internal operations. Normally the value of
    this parameter should be left set to \*DEFAULT, indicating that the
    SMAGPL library where the LSAM environment is defined will be managed
    by the PRDLIB attribute of the STRMLTJOB command.
    -   Many LSAM utility commands located in the SMAGPL library, like
        STRMLTJOB, have their PRDLIB command attribute set to match the
        name of the SMAGPL library where the command is located. The
        PRDLIB value then controls a temporary change to the job\'s
        library list, if that is necessary, so that all objects and
        files required for script execution will be available to the
        job. This command parameter supports special-purpose internal
        operations. Normally the value of this parameter should be left
        set to \*DEFAULT, indicating that the LSAM environment
        supporting the script execution is defined by the script job\'s
        library list.
:::

 


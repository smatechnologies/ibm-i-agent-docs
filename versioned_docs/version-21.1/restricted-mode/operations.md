---
sidebar_label: 'Restricted Mode Operations'
---
# Restricted Mode Operations

## Setup for Restricted Mode

### Setup Steps to Prepare for Restricted Mode

1. Enable the SMASAV user profile using the following command:
    ```
    CHGUSRPRF USRPRF(SMASAV) STATUS(*ENABLED)
    ```
    :::tip 
    The default password for user profile SMASAV is SMASAV. The site should consider changing this password.
    :::

2. In the command line, enter **SMASGPL/STRSMA**. For information on STRSMA command parameters, refer to the [STRSMA Command](../operations/lsam.md#the-strsma-command).
3. Enter **5** to choose the **Restricted mode menu** in the SMA Main Menu.
4. Enter **1** to choose **Maintain scripts** in the Restricted Mode Menu.
5. To add a new script, press <**F6**> = Add.
6. Type the New script name (no spaces in name!) in the pop-up window, press <**Enter**>.
7. The screen displays the Restricted mode options display, where script steps may be added and changed.
8. Press <**F6**> to add new script options (an option is the same as a script step) on the Restricted mode options screen.
9. To change existing option lines, under the **Op** column:

    a.  <**Tab**> to the desired option.

    b.  Enter **2** on the line next to the selection.
10. Verify and/or change the available parameters on the options detail screen. For information on the Restricted Mode parameters, refer to [Restricted Mode Screens and Windows](../restricted-mode/screens.md#windows).
11. Press <**Enter**> to commit the changes to the options details.
12. Returning to the list of options, if necessary, type **6** next to  all the options to be performed and press <**Enter**> to set them  to RDY (ready) status.

    a.  Alternately, enter 3=Hold next to any options that should not be
        performed to set them to HLD status. (Holding options is useful
        for temporary changes to a script, making it easy to restore
        them to RDY **ready* status later.)
13. Return to the Restricted Mode menu using <**F12**> (Cancel) or <**F3**> (Exit).
14. Enter **2** to choose **Setup environment** in the Restricted Mode Menu.
15. Position the cursor into the **Environment** field and press <**F4**> to view a prompting list.
16. Type **1** to select the environment that was created for use with  Restricted Mode operations.

    a.  If no environment has been created for use with Restricted Mode, press <**F12**> to return to the main setup screen, and then press <**F6**> (Add/maint env) to create and environment and build a library list. Refer to [LSAM Environment Management](../environment/index.md). Then repeat steps 15 and 16.
17. Enter the number of seconds that are required by the system to fully restore the TCP servers after IBM i first starts all subsystems.

    a.  View the System Operator message queue and examine the times on the messages after the last IPL to learn how long this takes on the system.
18. Press <**Enter**> to update the Restricted Mode Environment information.

    a.  The maintenance program displays the message: Job description SMASAVJ00 in library <**SMADTA**> changed.  The value for SMADTA may be different, depending on the LSAM environment where this maintenanceis performed.
19. Press <**F15**> (Update SMASAV) to proceed to the user profile and restricted mode environment update display.

20. Press <**Enter**> to perform an update to the restricted mode user profile and data area. The display will return to the environment library list and should display the following message text on the bottom line of the display: Updates to SMASAV user profile and RSTENVIRON data area completed normally
21. Press <**F12**> (Cancel) or <**F3**> (Exit) to return to the menu.
22. Complete the configuration of a Job Definition for a Restricted Mode Job in the OpCon User Interface (EM, SM), as described below.

## Special Instructions for Restricted Mode Scripts

Restricted Mode operations require that certain steps be included in a Script to enable the automatic restoration of a normal system state and the automatic recovery of LSAM communications with OpCon. In addition to the required steps, there is also an optional reserved Script Action code that may be used for user-defined actions to be
performed should a Script fail during its execution. This section also explains what the system will do in case a Script should fail to execute normally.

### Steps Required in a Restricted Mode Script

There are reserved Action code names that must be used, and a recommended guideline for including these in Script steps. Using Action codes to label the required steps leaves them open to a user-supplied definition of the command to execute. This creates maximum flexibility for coping with unique user requirements. However, in most cases some combination of these reserved Action codes must be included in Script steps in order for normal system operations to be suspended and then restored.

In summary, every Restricted Mode Script is required to include a pair of reserved Action codes in order to control the automatic process of stopping system functions and then restarting them. There are two possible pairs of required Action codes, used as follows: 

1. When the IBM i operating system will not be re-initialized, but may return immediately to unrestricted operations:

    a.  Use the ENDSYS (or NOENDSYS) Action code somewhere near the beginning of the script sequence, and the STRSYS Action code somewhere near the end of the script sequence. (Additional script options, that is, steps, may follow the STRSYS Action code step.)

2. When the Restricted Mode script will perform a PWRDWNSYS operation in order to IPL IBM i (and then, typically, to automatically restart it):

    a.  Use the ENDSYS (or NOENDSYS) Action code somewhere near the beginning of the script sequence, and then the PWRDWN Action code as the very last step of the script sequence.

### How Reserved Action Codes Work

1. **ENDSYS** is required to put IBM i into its restricted mode.

    The Action code name ENDSYS must be used for the Script step that puts the IBM i operating system into restricted mode. It is possible to specify custom commands to accomplish this procedure, but onetypical form of IBM i command to accomplish this is:

    ```
    ENDSBS SBS(*ALL) DELAY(120)
    ```
    :::tip
    When OpCon starts the Restricted Mode job, a signal program is used to tell the waiting console program where SMASAV is signed on so it can start processing the named Restricted Mode Script. This signal program performs the process of ending all the LSAM service programs, including suspending communications with OpCon. However, the console program that runs the Restricted Mode Script (named by the OpCon job) does not automatically put the IBM i system into its restricted mode. The Script is allowed to perform as many additional steps as desired before specifying that the system should be put into restricted mode. It is the Action code ENDSYS applied to one of the Script steps that marks where the restricted mode begins.
    :::
2. In place of the **ENDSYS** action code, the alternate value of **NOENDSYS** may be used. This code will satisfy the script driver program action code edits, but it will not actually put the IBM i system into a true restricted state. Instead, the responsibility is entirely on the user to specify an appropriate script step command for the step that uses the NOENDSYS Action code. This Action code value can be useful for test purposes.
3. Paired with the **ENDSYS** (or **NOENDSYS**) Action code, there must be either a **STRSYS** Action code or a **PWRDWN** Action code.
4. If the **PWRDWN** Action code is used, it must be the last step of a Script sequence because it marks the command used to power down the IBM i operating system for an IPL.
    
    Here is a typical example of the command line text that would be assigned to the **PWRDWN** Action code:
    ```
    PWRDWNSYS DELAY(30) RESTART(*YES)
    ```
    Be sure to refer to the note below about the CONFIRM keyword that is supported by the PWRDWNSYS command beginning with the IBM i 6.1 version of the operating system.
    
    The purpose of the **PWRDWN** Action code is to signal the Restricted Mode driver program that it should normally complete its final tasks just before executing the actual PWRDWNSYS command. These final tasks include setting up the LSAM environment so that when it is restarted after an IPL completes, the Restricted Mode job will be reported to OpCon as completed normally.
    :::tip
    In order to fully automate the recovery of the LSAM servers after a system IPL, the LSAM command that restarts the LSAM servers must be included in the system startup program. Use the IBM i command DSPSYSVAL to find the name of the system startup program in the system value QSTRUPPGM. This program, or a user replacement for it, must include the LSAM command SMAGPL/STRSMASYS ENV(environment_name), where the default value for the environment name can be (*DEFAULT). The ENV parameter of the STRSMASYS command must specify the name of the LSAM environment where the Restricted Mode job was executed, if this was not the default LSAM environment.
    :::

5. **STRSYS** can be used instead of **PWRDWN** to restore the IBM i normal operations mode. The Action code name    **STRSYS** can be used to mark the Script step that restores normal mode operations. It is typical for IBM i to have a startup program stored in the QGPL library. During normal system startup after an IPL, the QCTL (or other named) controlling subsystem would execute the program that is named in the system value QSTRUPPGM. View this program name using the DSPSYSVAL command. It may be desired to  specify this same program as the command line for the **STRSYS** Action code in the Restricted Mode Script. The purpose of the **STRSYS** action is to restart all of the IBM i subsystems and certain services such as TCP server programs that are required for LSAM communications with OpCon. If the Script step does not call the IBM i startup program that will also resume the IBM i LSAM server jobs, then another Script step must be used to perform the LSAM command SMAGPL/STRSMASYS, but only after using the **DLYJOB** Action code, as described next.

6. **DLYJOB** must be specified in a separate step after **STRSYS** to allow time for the TCP server to restart.
    
    Specify any Action code name for the next step to be performed after **STRSYS**. However, before specifying the Action code (below) that restarts LSAM communications, allow sufficient time for IBM i to restart TCP/IP communications services. The typical syntax for the delay job command is:
    ```
    DLYJOB DLY(180]
    ```

    If sufficient wait time is not provided, then the LSAM communications program will not have an active IP address and it will fail to start. In this case, manually restart the LSAM communications. The amount of time the system requires to start up TCP communications can be determined by examining the time stamps on messages in the operator message queue for the period of time just after an IPL.

7. Command **SMAGPL/SMASETLIBL** may be used to restore the LSAM environment library list.
    
    SMASETLIBL is required in order to execute many LSAM software commands, except for certain command such as SMAGPL/STRSMASYS (refer to next step) that manage the library list themselves.
    
    Specify the same name of the LSAM environment that was designated to control Restricted Mode operations for this command. The name of the controlling LSAM environment was specified during the Restricted Mode Setup maintenance procedure. In a default environment where there is only one LSAM subsystem, the value of *DEFAULT may be specified with this command. The default LSAM environment name that is distributed with the software is SMADEFAULT. Specify any Action code name desired, but the command for this action must be in one of these formats:
    ```
    SMASETLIBL ENV(*DEFAULT)
    ```
    or
    ```
    SMASETLIBL ENV(SMADEFAULT)
    ```
    or
    ```
    SMASETLIBL ENV(<my_LSAM_environment>)
    ```
    
    <my_LSAM_environment\> is a different LSAM environment name than the one being used. Refer to [Installing Multiple Environments](../reference/multiple-environments.md)
     and [LSAM Environment Management](../environment/index.md) for more information on this option.
    
    Do not use the command SMASETLIBL without an ENV parameter because the default value for the environment name is *SELECT, and there will not be an operator present to select the environment name during automated control of Restricted Mode operations.

Command **SMAGPL/SMASTRSYS** must be used to restart LSAM communication with OpCon.

If the IBM i system startup program was not called at the **STRSYS** step, or if the IBM i system startup program does not include this STRSMASYS command, then the last required step in a Restricted Mode Script restarts all the LSAM server programs, including restoring communication with OpCon.

Be sure to specify the name of the LSAM environment that will be started. The STRSMASYS command executes the SMASETLIBL command to establish a correct library list for the LSAM environment named. The value of *DEFAULT or a specific LSAM environment name may be used for the environment, but the values of *CURRENT or *SELECT may not be used with this command in the Operator Replay scripts. The format for this command is:
```
SMAGPL/STRSMASYS ENV(*DEFAULT)
```
Optionally include other steps to be performed before the Restricted Mode Script is ended, after restarting the LSAM server jobs and communication with OpCon.

:::tip
For IBM i 6.1 (formerly known as IBM i V6R1) or a newer version of the operating system, the PWRDWNSYS command supports a new function where F16=Confirm must be pressed at the console display device in order to allow the system to power down. This feature must be suppressed in order for the Restricted Mode script to use the PWRDWN Action code, otherwise an operator must be present to respond to the console display. The F16=Confirm function may be suppressed by using the keyword and value CONFIRM(*NO) with the PWRDWNSYS command, or it may also be suppressed by setting the environment variable QIBM_PWRDWNSYS_CONFIRM to '*NO'.
:::

## IBM documentation about the PWRDWNSYS CONFIRM option

For convenience, this documentation copied from IBM explains the keyword CONFIRM( ) that was not part of the Power Down System (PWRDWNSYS) before IBM i6.1.

#### Confirm (CONFIRM)

Specifies whether the power-down request should be confirmed before the system is powered down.

#### *ENVVAR
The value in environment variable QIBM_PWRDWNSYS_CONFIRM is used to determine whether the request should be confirmed. If the value is set to *INTERACT, *YES, or *NO, the action described below for that value is taken. If the environment variable is not defined or not set to one of these values, then a confirmation panel is displayed when the PWRDWNSYS command is issued in an interactive job. System initiated power downs do not use the environment variable.

#### *INTERACT

A confirmation panel is displayed when the PWRDWNSYS command is issued in an interactive job. There is no confirmation when the PWRDWNSYS command is issued in a non-interactive job.

#### *YES

A confirmation panel is displayed when the PWRDWNSYS command is issued in an interactive job. An inquiry message is sent to QSYSOPR when the PWRDWNSYS command is issued in a non-interactive job.

#### *NO

There is no confirmation when the PWRDWNSYS command is issued.

## Optional ON_ERROR Script Action Code

There is a special Action code name ON_ERROR that is reserved as an optional step that may be added anywhere in the sequence of Script steps. Each time ON_ERROR is listed in a Script, the Restricted Mode operations program will register the command that has been assigned to this Action code as the current operation to be performed in case any subsequent step in the Script might fail. 

If the ON_ERROR command is executed after a failed step, it will be executed after the Restricted Mode operations program has performed most of the AutoRecovr steps. This takes place after normal system operations have been restored and the LSAM service programs have been restarted. Refer to below for an exact definition of how the Restricted Mode program will recover from a failed Script.

One type of command that could be assigned to an ON_ERROR Action is an OpCon Event. For more information about the available OpCon Event commands that may be specified, refer to [Events and Utilities Menu](../events-utilities/menu.md) and [Commands and Utilities](../commands-utilities/commands.md) . As with all Restricted Mode Action commands, the OpCon Event commands may also be prompted using <**F4**> from the Restricted Mode Options Detail screen (refer to [Restricted Mode Screens and Windows](../restricted-mode/screens.md#windows) for more information). 

ON_ERROR Action codes are ignored if the entire Restricted Mode Script executes normally, or if the only steps that have failed are steps that were flagged (N) to not stop on error.

### Automatic Recovery from Script Failure

The Script history log shows a special code **AutoRecovr** among the other logged Action codes. Unlike the other Action codes, this code does not come from the Script. Instead, this is a special code reserved for use by the system to log its attempt to automatically restore normal LSAM communications whenever there has been a failure of a Script step.

Control whether the system will attempt to automatically restore system operations by the value specified for the Stop Execution On Error flag that is assigned to each Action code in a Script (refer to [Restricted Mode Screens and Windows](../restricted-mode/screens.md#windows) for more information). A value of N tells the Restricted Mode program to ignore a failure and continue with the next step in the Script. A value of Y tells the program to respond to an error by ending the Script process.

Whenever the Script process is ended due to an error, the Restricted Mode program checks the current status of the system. Then it attempts the following steps so that normal LSAM communications can be restored and the error reported to OpCon:

1. Finds and uses the STRSYS step in order to restore the normal state of IBM i operations. (This step will be skipped if IBM i is still in, or has already restored, its normal state of operations.)
2. Delays the program for the number of seconds specified in the Restricted Mode Setup maintenance program, giving IBM i sufficient time to restore the TCP communications services.
3. Sets the Restricted Mode program's library list to the list of the controlling LSAM environment using the SMASETLIBL utility command. The name of the environment used to control Restricted Mode operations is set using the Setup Environment function from the Restricted Mode menu. Then the name of that environment is stored in the data area QGPL/RSTENVIRON.
4. Restarts LSAM communications using the STRSMASYS utility command.
5. Registers a failed job transaction for the Restricted Mode job that will be sent via normal LSAM communications.
6. *(Optional)* Also runs whatever is the latest ON_ERROR Script command that might have been included in the Script. If there is no ON_ERROR Action code in the Script, then no additional commands or actions are performed by Restricted Mode operations.
7. Stores the job logs of the failing Restricted Mode process and of the job that signaled Restricted Mode to start (the name of the job being tracked in OpCon for Restricted Mode operations control). These job logs can be viewed from the LSAM environment's command entry line using the LSADSPLOG utility command.
8. Ends the Restricted Mode program and forces the console interactive job to end by producing a job log and signing off the SMASAV user profile.

## Caution: Restricted Mode Process Failures

### IBM i Save Operations Messages

Despite all the efforts that SMA has made to support full automation of Restricted Mode operations and restarting LSAM operations, there remains a potential that IBM i Save operations might require operator intervention if an error occurs.

IBM has programmed the IBM i Save operations so that an attempt to save objects to a save file that is not empty will cause a Program Message with message ID CPA4067 to be issued, rather than a typical error message as might be sent to the system operator message queue. Program Messages are unique because they are displayed on a specially formatted interactive message display screen for interactive jobs and there is no way to program the IBM i to automatically detect or respond to Program Messages in this format. This same error might occur if an attempt is made to save objects to a tape media that has not been properly formatted (when the Save command does not include a parameter that specifies to overwrite any existing tape content).

It is the responsibility of the system operations or administration staff to take all necessary measures to prevent this unique circumstance from occurring in order to depend on OpCon to fully automate restricted mode operations. SMA suggests the possibility of including an extra step in a Restricted Mode Script that will intentionally clear an existing save file before a separate Script Action is used to actually perform a Save operation to that save file.

## Running a Restricted Mode Process

IBM i now supports executing restricted mode operations from other sources besides just the DSP01 console device. It's possible to use a different interactive display device, and it's also possible to run in batch mode without any display device. The LSAM setup for Restricted Mode script processing supports choosing any of these three methods.

### Run a Restricted Mode Process in Batch Mode

1. Ensure that the LSAM is communicating with SAM and supporting services (SAM-SS).
2. It is NOT necessary to log in to the IBM i console or an alternate display device as **SMASAV** in order to use the batch mode.
3. Add an IBM i job master to an OpCon schedule and choose the IBM i  job sub-type as Restricted Mode. Specify the name of the Restricted Mode Script to use for this job.
4. When the script completes execution, the procedures used to restore normal system operations are the same as when a display device is used. The steps performed by the Restricted Mode Script and any error information can be viewed using the LSAM sub-menu option to display "Restricted mode history" (previously called "History of the last use").

### Run a Restricted Mode Process Using the Console or an Alternate Display Device

1. Ensure that the LSAM is communicating with SAM and supporting services (SAM-SS).
2. Log in to the IBM i console or an alternate display device as **SMASAV**.
    ```
    SYSTEMNAME                RESTRICTED MODE OPERATION              00/00/00
    SMASAV                                                           00:00:00

             ||========================================================|| 
             ||                                                        ||
             ||                 W A I T I N G  F O R                   ||
             ||                                                        ||
             ||        O P E R A T I O N  S T A R T  S I G N A L       ||
             ||                                                        ||
             ||                F R O M  O p C o n / X p s              ||
             ||                                                        ||
             ||                                                        ||
             ||     D O N'T  S W I T C H  O F F  T H I S  S C R E E N  ||
             ||                                                        ||
             ||========================================================||
    
    Restricted mode operation ready to start ....
    ```
    :::tip
    The restricted mode user SMASAV may log on to the IBM i console (device DSP01), or the Restricted Mode Setup menu function can be used to designate an alternate interactive console device (or batch mode). But when the setup designates *CONS as the device, then operations cannot be performed from any other workstation device. If another workstation is logged onto by user SMASAV, the following message will be displayed: "This program must be started on the console"
    :::
3. Wait for a message on the display device stating, "Restricted mode operation ready to start ..."
4. Start the OpCon job through the OpCon User Interface.
    :::tip
    Steps 4 and 5 (above) state the order in which the two actions must occur. However, there are many strategies that may be adopted when using the Restricted Mode utility. For example, the SMASAV user may sign on to the console before leaving the office at 5 PM one day. Meanwhile, the OpCon Schedule set up for that day might have the Restricted Mode job definition scheduled to start at 11:30 PM the same day. This means that the site does not need to have a night shift computer operator just to perform restricted mode operations during off hours. Instead, the Restricted Mode Script and OpCon can be configured so that if the Restricted Mode operation should fail, either the operator or a supervisor can be notified immediately of the event. Otherwise, when there is no failure the LSAM and OpCon will automatically resume normal operations as soon as the Restricted Mode script has been completed.
    :::
5. Regardless of the steps that will run, the following screen will be displayed after the restricted mode operation is started. The status log on the right side of the screen will be updated as each restricted mode step is started and completed. From this step, the Restricted Mode program will complete automatically and normal LSAM operations will be restored.
    ```
    SYSTEMNAME                  Restricted mode operation monitor          00/00/00
    SMASAV                                                                 00:00:00
    .............................. ................................................
    :                            : :  Application Date Time Sts Msg               :
    :    R E S T R I C T E D     : :  AutoRecovr 2006-06-16 10.45.05 B            :
    :                            : :  TESTSAVE 2006-06-16 10.45.04 E CPF3794      :
    :   M O D E   S C R I P T    : :  TESTSAVE 2006-06-16 10.44.53 B *NONE        :
    :                            : :  ENDSYS 2006-06-16 10.44.52 E *NONE          :
    :         TESTSAVE           : :  ENDSYS 2006-06-16 10.43.46 B *NONE          :
    :                            : :  ON_ERROR 2006-06-16 10.43.45 E *NONE        :
    :       R U N N I N G        : :  ON_ERROR 2006-06-16 10.43.44 B *NONE        :
    :                            : :                                              : 
    :         D O  N O T         : :                                              :
    :                            : :                                              :
    :   S W I T C H  O F F       : :                                              :
    :                            : :                                              :
    :         T H I S            : :                                              :
    :                            : :                                              :
    :       S C R E E N          : :                                              :
    :                            : :                                              :
    :                            : :                                       Bottom :
    :............................: :..............................................:
    Copyright (C) SMA Technologies 1995, 2005, 2006 ARR
    ```
:::info Example 
**System AutoRecovr upon failure**: The illustration above shows a Restricted Mode Script named TESTSAVE. The Script started its operation by registering an ON_ERROR method and then proceeded immediately to put the system into restricted mode (the step using the ENDSYS reserved action code). During the action code that was called TESTSAVE, an error occurred. In response to the error the LSAM's Restricted Mode program began automatic recovery of the system state. The AutoRecovr step restarted LSAM operations so that a report of this failure could be communicated back to OpCon for a responsive action. More detail about Script action codes and how the Restricted Mode program works can be found in the IBM i LSAM documentation section on Restricted Mode Screens and Windows, below.
:::

## OpCon Job Details Definition for a Restricted Mode Job

The fields that define an OpCon job that will be executed in IBM i restricted mode must be set up according to stricter rules than most jobs. Instructions for defining a restricted mode job can be found in the [Call Information](https://help.smatechnologies.com/opcon/core/latest/Files/Concepts/IBM-i-Job-Details.md#Call) section under IBM i Job Details in the **Concepts** documentation.


**EDITOR's NOTE:** *Resolve the link to the OpCon Concepts documenation, just above.*
---
sidebar_label: 'Menu'
---

# SMA File Transfer Menu

SMA File Transfer Menu

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------

[SYSTEMNAME                   ]{style="color: #008000;"}SMA FILE TRANSFER MENU                     [00/00/00]{style="color: #008000;"}   USERNAME                                                                16:23:53

   Select one of the following:

       1. [Start SMAFT Server (STRSMAFT)]{style="color: #008000;"}        2. [End SMAFT Server (ENDSMAFT)]{style="color: #008000;"}
       3. [Work with SMAFT jobs (WRKSFTJOB)]{style="color: #008000;"}        4. [Manage SMAFT Logging]{style="color: #008000;"}
       5. [View LSAM Logs]{style="color: #008000;"}        6. [View SMAFT Logs]{style="color: #008000;"}
       7. [SMAFT Parameters]{style="color: #008000;"}

  Selection or command
   ===\> \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
  \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
   F3=Exit   F4=Prompt   F9=Retrieve   F12=Cancel
   F13=Information Assistant   F16=System main menu
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------

##### Menu Pathways

Main Menu \> SMA File Transfer menu (\#8)

##### Options

- 1=Start SMAFT Server (STRSMAFT)
- 2=End SMAFT Server (ENDSMAFT)
- 3=Work with SMAFT jobs (WRKSFTJOB)
- 4=Manage SMAFT Logging
- 5=View LSAM Logs
- 6=View SMAFT Logs
- 7=SMAFT Parameters
- The start and stop options 1 and 2 are explained on the previous
    page; other options appear below.

##### Functions

- **F3=Exit**: Returns to the master menu.
- **F4=Prompt**: Prompts for keywords for any command entered in the
    Select or command line.
- **F9=Retrieve**: Retrieves the previous command that was entered on
    the Select or the command line. If it is pressed multiple times, the
    system goes further and further back to previous commands.
- **F12=Cancel**: Returns to the master menu.
- **F13=Information Assistant**: Branches to the IBM i general help
    screen.
- **F16=System main menu**: This is always shown on any
    system-generated menu screen. It branches to the general command
    entry menu for IBM i. Return to the previous menu by pressing
    \<**F3**\> or \<**F12**\>. This function is not commonly used and
    can be restricted for certain user profiles.

## Start SMAFT Server (STRSMAFT)

The Start SMAFT Server option starts the IBM i LSAM\'s SMA File Transfer
listener job named SMAFTS in the LSAM subsystem (default name SMASBS).
Use the LSAM management function \"work with SMAFT jobs\" or \"Check
LSAM subsystem status\" to verify that the server job has been started.
Refer to [SMAFT Parameters -- Critical Configuration Settings](#SMAFT) for a setting that causes the SMAFT
server to be started automatically with the other LSAM server jobs.

## End SMAFT Server (ENDSMAFT)

The End SMAFT Server option stops only the IBM i LSAM\'s SMA File
Transfer listener job (SMAFTS) that is running in the LSAM subsystem.
Use the LSAM management function \"Work with SMAFT jobs\" or \"Check
LSAM subsystem status\" to verify that job SMAFTS is no longer active in
the subsystem. The SMAFTS server job will also be stopped automatically
whenever the End LSAM function terminates all the LSAM server jobs.

## Work with SMAFT Jobs (WRKSFTJOB)

The Work with SMAFT jobs function is currently the same as the Check
LSAM Subsystem Status option found on the LSAM Management menu. Both
execute the IBM i command WRKACTJOB (i.e., Work with Active Jobs). The
command displays the jobs active in the LSAM subsystem defined in the
LSAM configuration parameters. From the WRKACTJOB display, press the
Help key to view a complete description of all the data displayed.

:::danger
Unless directed by SMA Support, please do not execute any of the options on the following screen.
:::

Work with Active Jobs Screen

  ----------------------------------------------------------------------------------------------------------------------------------------------------------

Work with Active Jobs                  [SYSTEMNAME]{style="color: #008000;"}                                                               00/00/00  03:45:13
  CPU %:      .0     Elapsed time:   00:00:00     Active jobs:   143

  Type options, press Enter.
    2=Change   3=Hold   4=End   5=Work with   6=Release   7=Display message
    8=Work with spooled files   13=Disconnect \...

  Opt  Subsystem/Job  User        Type  CPU %  Function        Status
  \_\_   SMASBS         QSYS        SBS      .0                   DEQW
  \_\_     LSAMNG       SMANET      BCH      .0  PGM-DLTLOGR00    DEQW
  \_\_     MSGMNG       SMANET      BCH      .0  PGM-LSARCMR00    DEQA
  \_\_     SKTCMN       SMANET      BCH      .0  PGM-CMNSKTR00    TIMW
  \_\_     TXMMNG       SMANET      BCH      .0  PGM-LSASCHR00    DEQW
  \_\_     LSAJOR       SMANET      BCH      .0  PGM-LSAJORR00    DEQW
  \_\_     JORCMN       SMANET      BCH      .0  PGM-JORCMNR00    DEQW
  \_\_     SMAFTS       SMANET      BCH      .0  PGM-SMAFTSR00    DEQW

  Bottom
  Parameters or command
  ===\> \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
  F3=Exit   F5=Refresh       F7=Find      F10=Restart statistics
  F11=Display elapsed data   F12=Cancel   F23=More options   F24=More keys
  ----------------------------------------------------------------------------------------------------------------------------------------------------------

##### Menu Pathways

Main Menu \> SMA File Transfer menu (\#8) \> Work with SMAFT jobs (\#3)

## Manage SMAFT Logging

The IBM i LSAM supports active control over SMAFT logging capabilities.
Logging is a local function useful to system administrators, programmers
and support technicians. For a complete description of how to use the
logging features in general, refer to [Log File and Database Management](Log-File-and-Database-Management.md#top){.MCXref
.xref}. The SMAFT logging control function is described below, under SMA
File Transfer Screens and Windows.

### View LSAM Logs

This menu option provides direct access to the list of available LSAM
log viewers. This is the same function that is available from the LSAM
Management menu option \# 5. It is reproduced here for the convenience
of technical support personnel who may be diagnosing SMA File Transfer
jobs. For more information about how to use the log views, refer to
[Viewing the LSAM Log Files](Log-File-and-Database-Management.md#Viewing){.MCXref
.xref}.

### View SMAFT Logs

This menu option provides direct access to the list of available SMA
File Transfer log viewers. For general information about how to use the
log views, refer to [Viewing the SMAFT Log Files](#Viewing){.MCXref
.xref}. Specific information about the SMA File Transfer log views is
available below, under SMA File Transfer Screens and Windows.

## SMAFT Parameters

The SMAFT Parameters function is used to set options that govern how the
IBM i LSAM supports SMA File Transfer jobs. This option is discussed in
detail below, under SMA File Transfer Screens and Windows.

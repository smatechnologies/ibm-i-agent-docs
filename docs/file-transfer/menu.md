---
sidebar_label: 'SMA File Transfer Menu'
---

# SMA File Transfer Menu

## SMA File Transfer Menu

```
 SYSTEMNAME                  SMA FILE TRANSFER MENU                    00/00/00 
 USERNAME                                                              00:00:00 
                                                                                
  Select one of the following:                                                  
                                                                                
                                                                                
      1. Start SMAFT Server (STRSMAFT)                                          
      2. End SMAFT Server (ENDSMAFT)                                            
      3. Work with SMAFT jobs (WRKSFTJOB)                                       
      4. Manage SMAFT logging                                                   
      5. View LSAM logs                                                         
      6. View SMAFT logs                                                        
      7. SMAFT Parameters                                                       
      8. Work with SMAFT Network Address Translation                            
                                                                                
                                                                                
 Selection or command                                    Copyright (C) SMA 2007 
 ===>                                                                           
                                                                                
 F3=Exit   F4=Prompt   F9=Retrieve   F12=Cancel                                 
 F13=Information Assistant  F16=System main menu                                
 ```

##### Menu Pathways

Main Menu > SMA File Transfer menu (#8)

##### Options

- 1=Start SMAFT Server (STRSMAFT)
- 2=End SMAFT Server (ENDSMAFT)
- 3=Work with SMAFT jobs (WRKSFTJOB)
- 4=Manage SMAFT Logging
- 5=View LSAM Logs
- 6=View SMAFT Logs
- 7=SMAFT Parameters

The start and stop options 1 and 2 are explained on the previous page; other options appear below.

##### Functions

- **F3=Exit**: Returns to the master menu.
- **F4=Prompt**: Prompts for keywords for any command entered in the Select or command line.
- **F9=Retrieve**: Retrieves the previous command that was entered on the Select or the command line. If it is pressed multiple times, the system goes further and further back to previous commands.
- **F12=Cancel**: Returns to the master menu.
- **F13=Information Assistant**: Branches to the IBM i general help screen.
- **F16=System main menu**: This is always shown on any system-generated menu screen. It branches to the general command entry menu for IBM i. Return to the previous menu by pressing <**F3**> or <**F12**>. This function is not commonly used and can be restricted for certain user profiles.

## Start SMAFT Server (STRSMAFT)

The Start SMAFT Server option starts the IBM i LSAM's SMA File Transfer listener job named SMAFTS in the LSAM subsystem (default name SMASBS). Use the LSAM management function "work with SMAFT jobs" or "Check LSAM subsystem status" to verify that the server job has been started. Refer to [SMAFT Parameters -- Critical Configuration Settings](../file-transfer/operations.md) for a setting that causes the SMAFT server to be started automatically with the other LSAM server jobs.

## End SMAFT Server (ENDSMAFT)

The End SMAFT Server option stops only the IBM i LSAM's SMA File Transfer listener job (SMAFTS) that is running in the LSAM subsystem. Use the LSAM management function "Work with SMAFT jobs" or "Check LSAM subsystem status" to verify that job SMAFTS is no longer active in the subsystem. The SMAFTS server job will also be stopped automatically whenever the End LSAM function terminates all the LSAM server jobs.

## Work with SMAFT Jobs (WRKSFTJOB)

The Work with SMAFT jobs function is currently the same as the Check LSAM Subsystem Status option found on the LSAM Management menu. Both execute the IBM i command WRKACTJOB (i.e., Work with Active Jobs). The command displays the jobs active in the LSAM subsystem defined in the LSAM configuration parameters. From the WRKACTJOB display, press the Help key to view a complete description of all the data displayed.

:::caution
Unless directed by SMA Support, please do not execute any of the options on the following screen, except for the following:
- 5=Work with (to view the job log of an active job)
- 8=Work with spooled files (although active SMAFT jobs are not expected to produce reports, other than a possible formatted program dump report in case of a fatal program error).
:::

### Work with Active Jobs Screen
```
                             Work with Active Jobs                   SYSTEMNAME
                                                         00/00/00  00:00:50 CDT
 CPU %:     0.0     Elapsed time:   00:00:00     Active jobs:   143            
                                                                               
 Type options, press Enter.                                                    
   2=Change   3=Hold   4=End   5=Work with   6=Release   7=Display message     
   8=Work with spooled files   13=Disconnect ...                               
                     Current                                                   
 Opt  Subsystem/Job  User        Type  CPU %  Function        Status           
      SMASBSC        QSYS        SBS      .0                   DEQW            
        JORCMN       SMANET      BCH      .0  PGM-JORCMNR00    SELW            
        LSAJOR       SMANET      BCH      .0  PGM-LSAJORR00    DEQA            
        LSAMNG       SMANET      BCH      .0  PGM-DLTLOGR00    DEQA            
        MSGMNG       SMANET      BCH      .0  PGM-LSARCMR00    DEQA            
        SKTCMN       SMANET      BCH      .0  PGM-CMNSKTR00    SELW            
        TXMMNG       SMANET      BCH      .0  PGM-LSASCHR00    DEQW            
        SMAFTS       SMANET      BCH      .0  PGM-SMAFTSR00    DEQW  
                                                                               
                                                                               
                                                                         Bottom
 Parameters or command                                                         
 ===>                                                                          
 F3=Exit   F5=Refresh       F7=Find      F10=Restart statistics                
 F11=Display elapsed data   F12=Cancel   F23=More options   F24=More keys      
```
 
##### Menu Pathways

Main Menu > SMA File Transfer menu (#8) > Work with SMAFT jobs (#3)

## Manage SMAFT Logging

The IBM i LSAM supports active control over SMAFT logging capabilities. Logging is a local function useful to system administrators, programmers and support technicians. For a complete description of how to use the  logging features in general, refer to [Log File and Database Management](../logs-database/overview.md). The SMAFT logging control function is described below, under SMA File Transfer Screens and Windows.

### View LSAM Logs

This menu option provides direct access to the list of available LSAM log viewers. This is the same function that is available from the LSAM Management menu option # 5. It is reproduced here for the convenience of technical support personnel who may be diagnosing SMA File Transfer jobs. For more information about how to use the log views, refer to [Viewing the LSAM Log Files](../logs-database/management.md#viewing-the-lsam-log-files).

### View SMAFT Logs

This menu option provides direct access to the list of available SMA File Transfer log viewers. For general information about how to use the log views, refer to [Viewing the SMAFT Log Files](../file-transfer/screens.md#viewing-the-smaft-log-files)
. Specific information about the SMA File Transfer log views is available below, under SMA File Transfer Screens and Windows.

## SMAFT Parameters

The SMAFT Parameters function is used to set options that govern how the IBM i LSAM supports SMA File Transfer jobs. This option is discussed in detail below, under SMA File Transfer Screens and Windows.
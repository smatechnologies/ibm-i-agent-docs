---
sidebar_label: 'Operation Tips and Techniques'
---

# Operation Tips and Techniques

This document section provides advice about ways to use OpCon and the IBM i Agent toolkit to automate IBM i operations. Details about how to use the IBM i toolkit components referenced in this section may be found in other topics of this document.

## Monitoring for IBM i Jobs in MSGW Status

IBM discontinued its Navigator Monitor support for Job Status monitoring as it began distribution of its all-new IBM Navigator for i.  The former solution proposed by SMA for interconnecting that type of Job Status monitor with the OpCon Agent for IBM i is no longer supported by IBM.

SMA has replaced the IBM solution with the Agent's own "Job Status Monitor" server job.  The LSAM server job name is JOBSTS.  This service is optional and it will only be started automatically if the LSAM Administrator sets the LSAM control that requests this service.

This document section offers suggestions about ways that clients of SMA Technologies can engage the IBM i LSAM Job Status Monitors for the purpose of detecting any jobs in selected IBM i subsystems that are stuck in MSGW status. It describes how to configure a Job Status Monitor to generate a message that can be intercepted by the IBM i LSAM Message Management facility, from which many forms of notification and response can be generated, including OpCon Event commands. 

### JOBSTS Server Implementation Outline

The strategy recommended by this document is to configure and start the IBM i LSAM Job Status Monitor server. If a job is found in one of the pre-registered IBM i subsystemw with a status of "MSGW", a readily identifiable message will be sent to QSYSOPR. Subsequently, an IBM i LSAM Message Management Parameter record can be configured to recognize this unique message, and attached Capture Rules and Response Rules can capture and communicate specific information about the job.  The Response Rules can be used to initiate OpCon services such as notifications and triggers to launch automated OpCon Schedules that might perform error recovery mesures, for example.

The general purposes anticipated by this strategy include:
1. The client operations staff and/or administrators can be aggressively notified when any jobs are stuck in the MSGW status.
2. As each MSGW event is detected, the client may wish to implement new Message Management rules that can answer and/or respond to the specific messages that are discovered during follow-up research that is initiated by each Monitor event.
3. As a result, there should be fewer jobs that are actually stuck, since the IBM i LSAM and OpCon can answer inquiry messages and possibly also initiate self-healing procedures to recover from the anticipated error condition.

The activities required to implement this strategy include:
1. Configure the Job Status Monitor.
    - See the following descriptions of the LSAM menu options and the screens used to maintain the JOBSTS server features.
    - Using option 7 in the Job Status Monitor sub-menu, it is necessary to change the auto-start option to a value of 'Y' to enable automating starting and stopping of this LSAM server job at the same time as other LSAM server jobs are being managed.
    - Choose an estimated Activity poll interval, depending on how aggressive the monitor operations should be.  
      - This can be adjusted later, after experience shows whether the monitor should be more active (for faster response) or less active, if the goal is to reduce the workload of the operating system.
      - HINT: The default value of 15 seconds may be somewhat slow.  Modern Power Processors are able to handle a lot more work per second than legacy systems.
2. Add at least one IBM i subsystem to the Job Status Subsystem Management. 
    - A maximum of 25 subsystems can be monitored by the Job Status Monitor.
3. Optional: Register any jobs that will be excluded by adding the jobs to the Job Status Job Exclusion Management. 
    - This feature prevents false notifications about jobs that are expected to issue messages requiring a reply.  
      - For example, a backup job might request a message reply after some backup media has been manually mounted.
    - Jobs that are already being managed by OpCon automation do not need to be detected by the LSAM Job Status Monitor.
4. Register LSAM Message Management Parameters that will detect the expected notifications from the Job Status Monitor. 
5. Define Capture Rules linked to the Message Management Parameters that can capture identifying information from the triggered Job Status Monitor message.
6. Define Response Rules linked to each Capture Rule that will:
    - Store the message identifying information into LSAM Dynamic Variables, if necessary.
    - Generate any form of Notification Event, typically via OpCon using the OpCon External Event commands that are supported by prompts from within Response Rule maintenance and, optionally, from LSAM Multi-Step Job Script Steps.

### JOBSTS Server Standard Alert Message

The IBM i System Job Status Monitor generates a very specific message that is sent to the QSYSOPR operator message queue.  The definition of the message characteristics are necessary to build a correctly defined LSAM Message Management Parameter record.  They also govern how Data Capture and Response Rules can be effectively configured.

- The message ID is 'SMA5802', as defined in the LSAM's SMAMSGF message file.
- The text of this message starts with the characters 'SMA5802'.
  - The reason for quoting the message ID within the message primary text is to keep this LSAM JOBSTS server feature compatible with the strategy previously recommended by SMA for integrating the OpCon Agent with IBM's Navigator Monitors.  In that circumstance it was not feasible to rely on a message ID, so the strategy had suggested registering a non-ID text message string that would be recognized by the characters 'SMA5802' in the first seven positions of the primary message text.  Sites that had previously used the IBM Navigator Monitor integration strategy should be able to retain much of their previous response strategy for jobs found in a MSGW status.
- The IBM i Job ID for the job that was discovered in MSGW status is merged into the primary message text of message ID SMA5802.
  - Using LSAM Message Data Capture Definitions, the Job ID can be found by specifying these Capture Definition parameters:
    - Primary/Secondary text: P
    - Message data from position: 70
    - Length of data string: 28
  - NOTE: Since the primary message text is a fixed-length string, the start of the IBM i Job ID is predictable.  It is not necessary to use the Scan label to locate where the Job ID information may be found.
  - The Job ID (a substitutable parameter in the primary message text) can hold up to 28 characters.  This is the maximum length of an IBM i Job ID, comprised of the following components.  Keep in mind that the Job Name and User Name may vary in length, but the Job Number will always occupy 6 positions, following the second slash character.  Since blanks are not allowed in the Job or User name fields, the total actual length of the Job ID field will vary depending on the sum of the lengths of these two fields, plus 8.
    - Job number (always 6 characters)
    - forward slash (1 character)
    - USERNAME (1 to 10 characters)
    - forward slash (1 character)
    - JOBNAME (1 to 10 characters)

### Job Status Monitor Menu

#### Job Status Monitor Menu
```
SYSTEMNAME                 JOB STATUS MONITOR MENU                     00/00/00
USERNAME                                                               01:01:01 

 Select one of the following:                   
                                                
                                                
     1. Job Status Subsystem Management         
     2. Job Status Job Exclusion Management     
     3. Job Status Monitor Activity Log         
                                                
     7. System Job Status Monitor Configuration 
                                                

   Selection or command                                     (C) SMA 1995,2012
   ===> ________________________________________________________________________
  ______________________________________________________________________________
   F3=Exit   F4=Prompt   F9=Retrieve   F12=Cancel
   F13=Information Assistant   F16=System main menu

```

##### Menu Pathways

Main Menu > LSAM management menu (#6) > Job Status Monitor menu (#9)

##### Field

Selection or command

##### Options

- 1=Job Status Subsystem Management
- 2=Job Status Job Exclusion Management
- 3=Job Status Monitor Activity Log
- 7=System Job Status Monitor Configuration

The options displayed on this menu are explained in the following Screens sections of this document. Type an option number in the Selection or command line and press <**Enter**> to begin using any of the options. 

##### Functions

- **F3=Exit**: Returns to the master menu.
- **F4=Prompt**: Prompts for keywords for any command entered in the Select or command line.
- **F9=Retrieve**: Retrieves the previous command that was entered on the Select or the command line. If it is pressed multiple times, the system goes further and further back to previous commands.
- **F12=Cancel**: Returns to the master menu.
- **F13=Information Assistant**: Displays the IBM i general help screen.
- **F16=System main menu**: This is always shown on any system-generated menu screen. It branches to the general command entry menu for IBM i. Return to the previous menu by pressing
    <**F3**> or <**F12**>. This function is not commonly used and can be restricted for certain user profiles.

### Job Status Subsystem Selection

#### JOBSBSR00-1 - Job Status Subsystem Management 

##### Menu Pathways

Main Menu > LSAM management menu (#6) > Job Status Monitor menu (#9) > Job Status Subsystem Management (#1)

##### Fields

- **Subsystem Names 1**:
  - The subsystem name value has to be a valid subsystem configured in the IBM i partition.
  - At least one subsystem name must be registered, otherwise the LSAM JOBSTS server job will end with error code SMA5803.
- **Subsystem Names 2 - 25**:
  - The subsystem name value has to be a valid subsystem configured in the IBM i partition, or can be left blank.

##### Functions

- **F3=Exit**: Do not update the data, return to the LSAM menu.
- **F12=Cancel**: Do not update the data, return to the LSAM menu.

### Job Status Job Exclusion

#### JOBJXCR00-1 - Job Status Job Exclusion Management

##### Menu Pathways

Main Menu > LSAM management menu (#6) > Job Status Monitor menu (#9) > Job Status Job Exclusion Management (#2)

##### Fields

Output-only fields identify each job name record being excluded from the Job Status Monitor process.

Column
- **Job name** - The name of the IBM i job to be excluded from the monitor.
- **Description** - Shows the existing description of the job name.  Add a description or modify the existing description.

##### Options

- **2=Change**: To change the job name or descripition of an job exclusion, type 2 in the Opt field next to the Name of the job. Press <**Enter**> to proceed to the Job Status Job Exclusion (CHANGE) screen.
- **3=Copy**: To copy a job name and it descripition, type 3 in the Opt field next to the Name of the job. Press **Enter** to proceed to the Copy Job Status Job Exclusion screen. 
- **4=Delete**: To delete a job name, type 4 in the Opt field next to the Name of the job. Press **Enter** to proceed to the Delete Status Job Exclusion  confirmation window. 
- **5=Display**: To view the job name record, type 5 in the Opt field next to the name of the job and press **Enter** to proceed to the Display Status Job Exclusion screen.

##### Functions

- **F3=Exit**: Return to the LSAM menu.
- **F5=Refresh**: Reload the list display with the latest data from the master file.
- **F6=Add**: Branch to the screen for creating a new Job Status Job Exclusion record.
- **F12=Cancel**: Return to the LSAM menu.
- **F16=Search**: Starts a new search, or continues searching after the last found record.
- **F17=Top**: Reposition the list display to show the first record in the list.
- **F18=Bottom**: Reposition the list display to show the last record in the list.

#### JOBJXCR10-3 - Add Job Status Job Exclusion

##### Menu Pathways

Main Menu > LSAM management menu (#6) > Job Status Monitor menu (#9) > Job Status Job Exclusion Management (#2) > F6=Add

##### Functions

- **F3=Exit**: Return to the LSAM menu.
- **F12=Cancel**: Quits the Add Job Exclusion screen without adding new data to the system.

##### Fields

- **Job name** - The name of the IBM i job to be excluded from the monitor.
- **Description** - Add a description description of the job name.

#### JOBJXCR10-3 - Change Job Exclusion

##### Menu Pathways

Main Menu > LSAM management menu (#6) > Job Status Monitor menu (#9) > Job Status Job Exclusion Management (#2) > Option 2

##### Functions

- **F3=Exit**: Return to the LSAM menu.
- **F12=Cancel**: Quits the Add Job Exclusion screen without changing data to the system.

##### Fields

Refer to the Fields table for Add Job Exclusion. 

#### JOBJXCR10-3 - Copy Job Exclusion

##### Menu Pathways

Main Menu > LSAM management menu (#6) > Job Status Monitor menu (#9) > Job Status Job Exclusion Management (#2) > Option 3

##### Functions

- **F3=Exit**: Return to the LSAM menu.
- **F12=Cancel**: Quits the Add Job Exclusion screen without copy data to the system.

##### Fields

Refer to the Fields table for Add Job Exclusion. 

#### JOBJXCR10-4 - Delete Job Exclusion

##### Menu Pathways

Main Menu > LSAM management menu (#6) > Job Status Monitor menu (#9) > Job Status Job Exclusion Management (#2) > Option 4

##### Functions

- **F3=Exit**: Return to the LSAM menu.
- **F12=Cancel**: Quits the Add Job Exclusion screen without copy data to the system.
- **F14=Confirm delete**: Confirm deletion of records from the LSAM database.

##### Fields

Output-only fields identify each job name record being deleted from the Job Status Monitor process.

### Job Status Monitor Activity Log

##### JOBMONR10-1 - Display Job Monitor Log

##### Menu Pathways

Main Menu > LSAM management menu (#6) > Job Status Monitor menu (#9) > Job Status Monitor Activity Log (#3)

##### Fields

Output-only fields identify each job monitor record that was logged by the Job Status Monitor server.

- **Job Start Time**: The start timestamp of the IBM i job.
- **iJobName**: The IBM Job Name value (up to 10 characters, max).
- **iJobUser**: The IBM job's User Name, according to how the job was originally submitted.
- **JobNbr**: The 6-digit IBM i job number.
- **Subsystem**: The IBM Subsystem the job was submitted to.

##### Options

- **5=Display**: Type 5 in the **Opt** field next to the Job start time(s) to be viewed and press **Enter** to proceed to a detailed view of each record. The detail display shows a list of the last five messages from the job log detailing the jobs MSGW information.
- **9=WRKJOB**: Calls the IBM i Work with Job function for the job number that appears in the list. This function can help find output information about the job in MSGW. 

##### Functions

- **F3=Exit**: Return to the LSAM menu.
- **F11=Sort Order**: Press F11 to rotate among three different sort orders of the list.  The fields that govern the sort order have their column heading color changed to pink.
- **F12=Cancel**: Quits the list display and returns to the LSAM menu.
- **F16=Search Next**: Starts a new search, or continues searching after the last found record.
- **F17=Top**: Reposition the list display to show the first record in the list.
- **F18=Bottom**: Reposition the list display to show the last record in the list.

#### JOBMONR10-2 - List Job Status Monitor Job Log Entries 

##### Menu Pathways

Main Menu > LSAM management menu (#6) > Job Status Monitor menu (#9) > Job Status Monitor Activity Log (#3) > Option 5

##### Fields

Output-only fields identify the last 5 job log messages for the message in "MSGW".

- **Job log timestamp**: The job log timestamp of the IBM i job.
- **Job log message**: The IBM Job Log message value (up to 47 characters, max).

##### Options

**5=Display**: Type **5** next to a job log line and press **Enter** key to view the job log messages.

##### Functions

- **F3=Exit**: Quits the list of Scripts and returns to the menu.
- **F12=Cancel**: Quits the list of Scripts and returns to the menu.
- **F16=Search next**: Continue the content search to the next matching record.

#### JOBMONR10-5 - Display Job Status Monitor Job Log Entry Detail

##### Menu Pathways

Main Menu > LSAM management menu (#6) > Job Status Monitor menu (#9) > Job Status Monitor Activity Log (#3) > Display Job Status Monitor Job Log Entries > Option 5

##### Fields

Output-only fields identify the job log message record being selected for review.

- **Log time**: The job log timestamp of the IBM i job.
- **Record key**: The record key of the record in the LSAM database.
- **Log entry Msd ID, Text**: The IBM Job Log message value (up to 1024 characters, max).

##### Functions

- **F3=Exit**: Quits the list of Scripts and returns to the menu.
- **F12=Cancel**: Quits the Detail display and returns to the List display.  Unprocessed List options remain set.

### System Job Status Monitor Configuration 

#### JOBSTSR30-1 - System Job Status Monitor Configuration

##### Menu Pathways

Main Menu > LSAM management menu (#6) > Job Status Monitor menu (#9) > System Job Status Monitor Configuration (#7)

##### Fields

- **Activity poll interval** :
  - This value controls how aggressively the Job Status Monitor server will check for jobs in "MSGW" status.
  - A smaller number of seconds will improve the LSAM's ability to quickly detect jobs IBM i jobs in "MSGW" status, whereas a larger number of seconds will allow more system resources for other important jobs.
- **Auto-start Job Status Monitor** :
  - **Y** = yes, tells the LSAM subsystem startup procedure to automatically start the Job Status Monitor at the same time as the LSAM server programs are started. When this value is set to Y, stopping the LSAM also stops Job Status Monitor.
  :::note
  If no IBM i subsystems have been registered for monitoring, the server job will end after sending the message ID SMA5803 to the QSYSOPR message queue and to the Job Status Monitor Activity log.
  :::
  - **N** = no, means that Job Status Monitor will only be started when a manual start command or menu function are used. Set this flag to N (the default) when Job Status Monitor will never be used.
- **Ignore interval** :
  - For any given IBM i job that has a status in "MSGW", the server will not send repeated messages to QSYSOPR until it has bypassed as many detections for this one job as are specified by the ignore interval.
  - IBM i jobs and the last 5 job log messages will continue to be logged into the Job Status Monitor Activity Log.  This would prove if the "MSGW" status was issued for a different reason during the ignored cycles.

##### Functions

- **F3=Exit**: Do not update the data, return to the LSAM menu.
- **F12=Cancel**: Do not update the data, return to the LSAM menu.


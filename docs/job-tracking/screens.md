---
sidebar_label: 'Job Tracking and Queuing Screens and Windows'
---
# Job Tracking and Queuing Screens and Windows

## Job Track Menu
```
SYSTEMNAME                     JOB TRACK MENU                       00/00/00
USERNAME                                                            22:55:39

   Select one of the following:

       1. Job track parameters                 
       2. Job track logs (WRKTRKJOB)
       3. Start job track (STRJOBTRK)           
       4. End job track (ENDJOBTRK)
       5. Check job track status (JOBTRKSTS)    
       6. Maintain dynamic variables
       7. Job tracking configuration              
       8. Start job capture (STRCAPJOB)
       9. End job capture (ENDCAPJOB)         
      10. Display captured jobs (DSPCAPJOB)
      11. Work with captured jobs (WRKCAPJOB)

   Selection or command
   ===>_______________________________________________________________________
  ____________________________________________________________________________
   F3=Exit   F4=Prompt   F9=Retrieve   F12=Cancel
   F13=Information Assistant   F16=System main menu

```
#### Menu Pathways

Main Menu > Job track menu (#1)

#### Fields

Select or command: Type the number of the option to be executed, and
press Enter to continue.

#### Options

- 1 = Job track parameters
- 2 = Job track logs (WRKTRKJOB)
- 3 = Start job track (STRJOBTRK)
- 4 = End job track (ENDJOBTRK)
- 5 = Check job track status (JOBTRKSTS)
- 6 = Maintain dynamic variables
- 7 = Job tracking configuration
- 8 = Start job capture (STRCAPJOB)
- 9 = End job capture (ENDCAPJOB)
- 10 = Display captured jobs (DSPCAPJOB)
- 11 = Work with captured jobs (WRKCAPJOB)

The options displayed on this menu are explained in the following sections of this document. Type an option number in the Selection or command line and press <**Enter**> to begin using any of the options. 

#### Functions

- **F3=Exit**: Returns to the master menu.
- **F4=Prompt**: Prompts for keywords for any command entered in the Select or command line.
- **F9=Retrieve**: Retrieves the previous command that was entered on the Select or the command line. If it is pressed multiple times, the system goes further and further back to previous commands. 
- **F12=Cancel**: Returns to the master menu.
- **F13=Information Assistant**: Branches to the IBM i general help screen.
- **F16=System main menu**: This is always shown on any system-generated menu screen.It branches to the general command entry menu for IBM i. Return to the previous menu by pressing <**F3**> or <**F12**>. This function is not commonly used and can be restricted for certain user profiles.

## Job Track Parameters

Use function key <**F11**> to alternate between two useful views of the list of Job Track Parameters.

When option 4=Delete is used, the list of records selected for deletion will appear in whichever format was in effect when the option code was entered. Accordingly, pressing <**F11**> to alter the view will erase the program's record of any previous option codes that were entered, including any records selected for deletion (that were not yet confirmed for deletion). Thus, function key <**F11**> has the same effect as function key <**F5**> = Refresh, in addition to changing the displayed
list format.

### TRKPARR1 - Job Tracking Parameters (2 Views)

#### Menu Pathways

Main Menu > Job track menu (#1) > Job track parameters (#1)

#### Fields

- **Search content**: Type any content that is part of a Job Track Parameter record and press <**Enter**>. Can be used to search for jobs, schedules, or any other field  value.
- **Opt**:  <**Tab**> to a row in the table, type an option number and press <**Enter**> to perform that function for the selected line.
- **Job Name**: The name portion of an IBM i job. The IBM i full job names (per instance of a job) include the name, the submitting user name, and a unique job number. The name portion is common to as many instances of the same job definition as may be executed. The IBM i permits more than one instance of the same job name to be executed concurrently.
- **TYP**: Tracking types:
  -   **T** = Tracking: OpCon support, no parameter overrides or dependencies
  -   **Q** = Queuing: OpCon support, with parameter overrides, dependencies
  -   **P** = Passive: OpCon status display only; no interrupt of SBMJOB process                 
  -   **A** = Auto-Tracking: used only for Allow or Prevent auto-tracking at LSAM 

- **AUT**:  Automatic Tracking control:
  -   **A** = Allow auto-tracking
  -   **P** = Prevent auto-tracking
  -   **blank** = does not specifically allow or prevent auto-tracking 
  
**Fields used to filter/select IBM i jobs for Tracking or Queuing**
- **Job User**: The IBM i User Profile name that owns/executes the job.
- **Jobd Name**: Job Description - a system object that defines how a job is to be processed.
- **Jobq Name**: Job queue - a system object that stores job requests while they are waiting to be executed, or as long as they are in hold status.  

**Fields used to select an OpCon Schedule for Tracking or Queuing** 
- **Sched Name**: OpCon Schedule Name (may be 128 characters, as seen in the record detail, but only the first few characters appear in this list).
- **Sched Date**: The Date of the OpCon Schedule.
- **Frequency**: The Frequency assigned to this job on the OpCon Schedule. 
- **Job Name**: The name portion of the IBM i job which is also the job name on the OpCon schedule.


#### Options

- **2=Change**: To proceed to the Job Tracking Parameters window, type
    2 next to the job tracking definition and press <**Enter**>.
- **3=Copy**: To copy the job tracking definition, type 3 next to the
    job tracking definition and press <**Enter**>.
- **4=Delete**: To copy the job tracking definition(s), type 4 next to
    the job tracking definition(s) and press <**Enter**> to proceed to
    the Job Tracking Parameters Confirm Delete of Records screen.
- **5=Display**: To display the full details of a list entry, type 5
    next to the job tracking definition(s) and press <**Enter**>.

#### Functions

- **F3=Exit**: Quits the list of job tracking names and returns to the
    menu.
- **F5=Refresh**: Re-reads the database and rebuilds the list display.
- **F6=Add**: Proceeds to the Job Tracking Parameters window.
- **F11=Sort Sched/Sort JobNam**: Press to alter between Views 1 and 2
    of the job tracking parameters list.
- **F12=Cancel**: Quits the list of job tacking names and returns to
    the menu.
- **F17=Top**: Press this function key to jump to the first entry in
    the list.
- **F18=Bottom**: Press this function key to jump to the last entry in
    the list.
- **F24=More keys**: Press this function key to see the other valid
    function keys available from the display. All supported functions
    keys remain active, regardless of the function key legend currently
    on display.

## Maintain/Display Job Tracking Parameters

The description for the Add, Copy, Change and Display screens are the same for all, using a similar display except that the Display format does not allow data input. The screen example appears on the next page.

#### Menu Pathways

- Main Menu > Job track menu (#1) > Job track parameters (#1) >     F6=Add
- Main Menu > Job track menu (#1) > Job track parameters (#1) >     option 2=Change
- Main Menu > Job track menu (#1) > Job track parameters (#1) >     option 3=Copy
- Main Menu > Job track menu (#1) > Job track parameters (#1) >     option 5=Display

### TRKPARR1 - Maintain Job Tracking Parameters

#### Fields
| Parameter          | Default               | Description           |
| ---------          | -------------         | -----------------     |
| Job Name           | IBM i Name Rules (Refer to [IBM i NameRules](../configuration/configuration.md#IBM2))  | The name portion of an IBM i job. The IBM i full job names (per instance of a job) include the name, the submitting user name, and a unique job number. The name portion is common to as many instances of the same job  definition as may be executed. The IBM i permits more than one instance of the same job name to be executed concurrently.         |
| Job user ID        | \*ALL                 | The IBM i User Profile that owns/executes the job.                 |
| Jobd Name          | \*ALL                 | Job Description - a system object that defines how a job is to be processed. When a specific name is used in this field it qualifies an IBM i job for selection for tracking or queuing.  |
| Jobd Library       | \*ALL                 | The library within DB2 where the job description is located. When a specific name is used in this field it qualifies an IBM i job for selection for tracking or queuing. |
| Jobq Name          | \*ALL                 | Job queue - a system object that stores job requests while they are waiting to be executed, or as long as they are in hold status. When a specific name is used in this field it qualifies an IBM i job for selection for tracking or queuing.  
| Jobq Library       | \*ALL                 | The library within DB2 where the job queue is located. When a specific name is used in this fied it qualifies an IBM i job for selection for tracking or queuing.|
| Schedule Name      | AdHoc                 | The OpCon schedule that the job is part of. It must match a schedule in the OpCo database.             |
| Schedule Date      | CURRENT               | Required, used to select from among multiple instances of an OpCon schedule, such as when a yesterday schedule remains incomplete after today's schedule is already active. Various values may be used in this field: |
|                    | **Note:** If this field is left blank, OpCon assumes CURRENT.       | Actual schedule date, for example, 2011-02-07 which is a date in ISO format. Any date format accepted by OpCon may be used, but ISO is  recommended.        |
| | | Any OpCon date special value, such as CURRENT, LATEST, EARLIEST. Other values may be used, although most would not apply when a tracked job is being added to a schedule. To insert special values that are longer than this field allows, use a Dynamic Variable.|
| | | Dynamic Variable: Use F8 to obtain a list of available Dynamic Variables. The Dynamic Variable must appear in token form (use the F8 selection method to view the value format for this environment), e.g., {DYNVAR}. Dynamic variables may be a good way to assure that the actual OpCon Schedule Build Date is always used, which is important if it is past midnight of the day when the schedule was built at the time when a tracked or queued job will be added. |
| Frequency          | Blank                 | The OpCon frequency designation. May be left blank. If blank, OpCon would assume the LATEST active schedule if there is more than one schedule that matches the Schedule Name and Schedule Date.        |
| Track Type         | Q                     | **T** = Tracking:  OpCon support, no parameter overrides or dependencies  |
| | | **Q** = Queuing: OpCon support, with parameter overrides, dependencies      |
| | | **P** = Passive: OpCon status display only; no interrupt of SBMJOB process  |
| | | **A** = Auto-Tracking: used only for Allow or Prevent auto-tracking at LSAM |
| Aut-track sub-jobs | Blank                 | Automatic Tracking Control:              |
| | | **A** = Allow  auto-tracking     |
| | | **P** = Prevent auto-tracking    |
| | | **blank** = does not specifically allow or prevent auto-tracking     |

## Delete Job Tracking Parameters

:::tip
Format of Confirm Delete list will vary to match current <**F11**> sort sequence of List display.
:::

### TRKPARR1 - Job Tracking Parameters

#### Menu Pathways

Main Menu > Job track menu (#1) > Job track parameters (#1) > option 4=Delete

#### Fields

Refer to field descriptions for Job Tracking Parameters list display,
above.

#### Functions

- **F3=Exit**: Quits the list of job tracking names and returns to the
    menu.
- **F12=Cancel**: Quits the list of job tacking names and returns to
    the menu.
- **F14=Confirm**: Press this function key to confirm that all the
    records appearing in the list should be deleted. If any are
    incorrect, press **F12=Cancel** instead and change which records are
    marked for deletion with option 4.

## Job Track Logs (WRKTRKJOB)

### LSALOGR1 - Job Track Logs

#### Menu Pathways

- Main Menu > Job track menu (#1) > Job track logs (#2)
- **From Command Entry, enter the command WRKTRKJOB.** This command
    may be entered from any command entry line, as long as the library
    QGPL is in the interactive job's library list. It is not necessary
    to set the library list to an LSAM environment, or to enter the LSAM
    menu system, because this command is able to detect which LSAM
    environment has control over job tracking. (When there are multiple
    LSAM environments, only one environment at a time can control job
    tracking.)

#### Fields

| Parameter           | Default              | Description          |
| ----------          | -------              | -----------          |
| Search content      |                      | To quickly search for a particular job, enter the first characters of the job name, or any other tracked job log content value, and press <**Enter**>. Any value that appears on the log detail display may be searched for, even though not all values appear in the list display.        |
| Opt                 | None                 | <**Tab**> to a row in the table and enter an option. |
| Job Name            | IBM i Name Rules (Refer to [IBM i Rules](../configuration/configuration.md#IBM2)   | The name portion of an IBM i job. The IBM i full job names (per instance of a job) include the name, the submitting user name, and a unique job number.|
| | | The name portion is common to as many instances of the same job definition as may be executed. |
| | | The IBM i permits more than one instance of the same job name to be executed concurrently. |
| | | Sort name: When F11 is used to change the sort order of the display to Job Name (the default), the list shows all entries for a job together regardless of date. The entries within one job will be sorted in descending order according to the date (last entry first). The column heading for Job Name will be pink when the list is sorted by name.|
| Number              |                      | The IBM i job number. The job number helps keep entries from the same job together on the list display when the list is sorted by name, regardless of the time of the entry.   |
| Date                |                      | The date when the job executed, or will execute.    |
| | | [*Sort date*]: When F11 is used to change the sort order of the display to Date, the list shows all entries in descending date order (last entry first), regardless of job name. The column heading for Date will be pink with the list is sorted by date.         |
| Time                |                      | The time when the job executed, or will execute.        |
| Svty (Severity)     | 00 -- 99             | The completion code reported by the job, (i.e., the severity of the completion message).            |
| Sts (Status)        |                      | An SMA-defined status code that indicates the state of the pending or completed job. Refer to the table below, under option 5=Display, for a list of all possible status code values.  |
| Msg ID (Message ID) | \*NONE               | An IBM i message identifier (comprised of 3 letters followed by 4 digits).    |
| | | Definitions for message IDs may normally be found in message files stored in the DB2/400 database. SMA* messages may be found in message file SMAMSGF.    |
| | | Using option 5=Display details will usually reveal some text that explains the error message ID.              |

#### Options

- **4=Cancel job**: Set job tracking to cancelled status and prevent job from being released. Option 4 causes the program to branch to the same job detail display as option 5, but showing a red function key instruction at line 22, requiring that F23=CNLJOB be pressed to confirm the cancel job action.
- **5=Display detail**: Shows job definition details and any error or status message information.
- **6=Release job**: Manually release job from LSAM tracking (using IBM i SBMJOB) either before OpCon releases the job or when OpCon has rejected the job tracking request (message ID SMA0014).

#### Functions

- **F3=Exit**: Quits the tracked jobs list and returns to the menu.
- **F5=Refresh**: Retrieves the latest tracked job information and updates the display.
- **F11=Sort date/Sort name**: Changes the sorted order of the list display. The column heading of the current sort order is displayed in pink color, and the function key name changes each time <**F11**> is pressed.
- **F12=Cancel**: Quits the tracked jobs list and returns to the menu.
- **F16=Search next**: When a value is entered in the Search content field, or a value shows in pink below this field from the last search request, pressing <**F16**> finds the next (or first) occurrence of the value specified. F16 is useful for finding each desired log entry when there is more than one log entry that satisfies the search request. When a value is first typed into the Search content field, <**F16**> works the same as the <**Enter**> key for starting a new search. However, only <**F16**> may be used to continue a search past the first entry  that satisfies the search criteria.
- **F17=Top**: Causes the display to jump to the top of the list. This is the equivalent of the first record in the file, but the sort order controls which records are listed first.
- **F18=Bottom**: Causes the display to jump to the last entry in the list. This is the equivalent of the last record in the log file, but the sort order controls which records are listed last. This function key is very helpful when the file is big.
- **F24=More keys**: Toggles the function key legend between the two different lists of function keys that are available for this display.

## Option 5 = Display (Job Track Log Detail)

### LSALOGR2 - Job Track Log Detail

#### Menu Pathways

Main Menu > Job track menu (#1) > Job track logs (#2) > 5=Display detail

#### Fields

Log keys ...
- **Log date**: The date on which this log entry was made.
- **Log time**: The time at which this log entry was made.
- **Log status**: The status of this job tracking record when the log entry was made (may be different from the job current status, shown below). Status code is followed by text representing the meaning of the code.
- **Message ID**: An IBM i Message ID that may have been reported during the processing of a job. This could be a reason for the status value of E = error (ID SMA0014). It could also represent that the job has been released and job ID information is available (ID CPC1221).
- **Message text**: Text of the error message ID. Sometimes text can be present in a log entry without a Message ID. In this case, the reported Message ID will be "(text)".

IBM i Parameters ...
- **Job name**: The name portion of an IBM i job. The IBM i Parameters full job names (per instance of a job) include the name, the submitting user name, and a unique job 
number.
  - The name portion is common to as many instances of the same job definition as may be executed.
  - The IBM i permits more than one instance of the same job name to be executed concurrently.
- **Job user**: The User Profile portion of the IBM i job identifier.
- **Job number**: The unique identifying number portion of the IBM i job identifier.
- **Job Queue**: A system object that stores job requests while they are waiting to be executed, as long as they are in hold status, or until system resources permit the job to be released for execution. 
  - Jobs that match the tracking requirements for queuing, and are recognized by OpCon for tracking, are held in the job queue until SAM scheduling requirements and dependencies permit the job to execute.
  - Jobs that are not defined for queuing are not held in a job queue by the LSAM or OpCon, and would only remain in the job queue until system resources permit the job to be released for execution.
  - In most cases, tracked jobs that are not defined for queuing are allowed to execute immediately, and tracking is just a parallel operation.
- **JOBQ Library**: The library within DB2/400 where the job queue is located.
- **For job name**: The ID of the submitting job, or an override value specifying which job can refer to this job using the WRKSBMJOB command.
- **For job number**: The ID of the submitting job, or an override value specifying which job can refer to this job using the WRKSBMJOB command.
- **For job user**: The ID of the submitting job, or an override value specifying which job can refer to this job using the WRKSBMJOB command.
- **Job description**: A system object that defines how a job is to be processed.
- **JOBD Library**: The library within DB2/400 where the job description is located.
- **Library List**: The list of DB2/400 libraries that are searched for any type of object that is required by a job.
    - The system portion of the library list controls which operating system services will be available to the job.
    - The user portion of the library list controls where files, data areas, and user program objects (programs, display files, etc.) can be found.

IBM i Parameters (continued) ...
- **Call command**: The IBM i control language that names an IBM i or user-defined Command to be executed. The name of the command is also usually accompanied by command-specific syntax to provide additional parameter values that define what the command doe, and/or what objects the command operates on. If the command text appears to be cut off at the end of the second line, use F13=More CMD to see a much larger display area showing all (or more of) the command text.

SAM Parameters ...
- **Schedule Name**: The OpCon name assigned to the controlling Schedule.
- **Sched date**: The OpCon Schedule Date, which may be an OpCon special date keyword or a date, typically in ISO format (CCYY-MM-DD).
- **Frequency**: The OpCon frequency code assigned to control when a job executes.
- **Track Type**:
  - T = Track
  - Q = Queue
- **Status**: The last reported job status (from the LSAM job tracking master file). May not be the same as the Log status, above. Refer to the table, below, of possible job status values. The status code is followed by text that represents the meaning of the code. 
- **SAM job name**: The name assigned by OpCon to this job as it appears on a SAM Schedule. For tracked/queued jobs, this name is usually the same as the IBM i job name.
- **SAM job number**: A unique number assigned by OpCon to track each job it monitors.


### Job Tracking Status Codes

|  Code  | Text | Meaning | Permitted actions |
|  ----  | ---- | ------- | ----------------- |
|   E    | ERROR_TE1 | OpCon has rejected job tracking request and has notified the LSAM with a (TE1) transaction. |      Release job, Cancel job |
|   F    | TX1-FAILED | Indicates the LSAM was unable to process the OpCon job start request. Refer to the LSAM diagnostic tools for jobs that fail to start, described in Components and Operation. | |
|  I     |   SAM_QUEUED_TI1 | OpCon has received a job queuing request, and has responded with SAM job information. (Does not apply to type Tracked.)  |Release job, Cancel job |
|  K     |  USER_CANCELLED | Option 4=Cancel job was used to permanently prevent this tracked job from being released. (Cancelled jobs cannot be recovered. The requested task must be submitted as a new job.) | None |
|  M     |  MANUAL_RLS     | Option 6=Release job was used to manually submit the job to IBM i for processing. Manually released jobs may not be able to take advantage of any OpCon job master options, such as job-specific message management or spool file management, if a job was released while it was in status "I". Jobs that were at status "E" would not receive any support from OpCon because they were not recognized by OpCon. |  None |
|  P     | PASSIVE_TRACK   | Indicates this job was processed using the True Passive tracking method. |  |
|  R     | LSAM_RLS_TX1    | The LSAM has released the job to IBM i upon receiving a start job transaction (TX1) from OpCon. | None |
|  T     | LSAM_TRACKING   | The LSAM has recognized the job and stored it for tracking, but a response has not yet been received from OpCon. | Release job, Cancel job |
|  X     |   SAM_RLS_TX1   | OpCon has sent a start job transaction (TX1) but the LSAM has not actually released the job to IBM i. This is normally a transient job status, so the log entry just records the time when this action happened. | None |

#### Functions

- **F3=Exit**: Quits the job details display and returns to the menu.
- **F12=Cancel**: Quits the job details display and returns to the list of tracked jobs.
- **F13=More CMD**: Proceeds to a display of some Job Track Log Detail with an extended area reserved to show all (or much more of) the Call command text.
- **F14=More LIBL**: Press \<F14\>, when it is available, to view an extended display of the Library List.
- **F15=View LDA**: Press \<F15\>, when it is available, to view the content of the job's captured local data area (LDA).
- **F21=WRKJOB**: Press \<F21\>, when it is available, to go to the IBM i Work with Job menu display. After exiting the Work with Job  menu or any of its functions, the system will return to this log detail display.
- **F22=RLSJOB**: Press \<F22\>, when it is available, to request the manual release of a queued job from the LSAM Job Tracking master file. After the HOLD window response is given, this program will use the LSAM Job Tracking master file data to construct an IBM i SBMJOB command, and then execute the command. As a result, the actual IBM i job will either be on hold in an IBM i job queue (as specified by the job details), or if not held, the job will immediately begin execution in the specified IBM i subsystem. **F23=CNLJOB**: Press \<F23\> to confirm and complete the action of option 4=Cancel job. When F23 is pressed, the LSAM job tracking     master record status is set to K=killed, preventing any future release of this job, either by OpCon or manually. (A canceled job cannot be recovered. Its task must be submitted as a new job.)
- **PageDown=More details**: Press \<PageDown\> to see additional internal and IBM i data that define the tracked job.

## Option 5 - Page Down = More Details

### LSALOGR7 - Job Track Log Detail - More Detail

#### Menu Pathways

Main Menu > Job track menu (#1) > Job track logs (#2) > 5=Display details > PageDown

#### Fields

| Field Type    | Field            | Description                     |
| -----------   | ------           | -------------- |
| Internal data | LDA file key     | The LSAM internal value that identifies the record in the JOBLDAF00 file where the LDA content is stored.  |
|               | CMD src member   | The name of the source member in the file DBFCMDSRC where the CMD call line is stored.        |
|               | Job sbm date     | The date when the job information was intercepted. This date field is used to determine when the Job Tracking or Queuing control record, and related information in other files, will be purged from the LSAM database.                  |
|               | SMADTA lib name  | SMADTA lib name The name of the LSAM environment library that functions as the SMADTA library, in which the JOBLDAF00 and DBFCMDSRC related files may be found.                       |
|               | Trk time stamp   | The full time stamp of the moment when the job information was intercepted for storage in the LSAM database files.        |
|               | SBMTYP (AutoTrk) | An LSAM control field value that specifies whether automatic job tracking was used for this job.                   |
| IBM i Parameters | OpCon user ID    | The name or IBM i parameter keyword that controls which User ID will be applied to the submitted job. When specified by the OpCon job master record, that value will be placed in this field once the information is received from OpCon.                      |
|               | Job priority     | The priority of the job in the job queue.                      |
|               | Log Lv/Sv/Txt    | The job's logging control values: Level, Severity and message text.                   |
|               | INQMSGRPY        | The Inquiry Message Reply parameter value.                |
|               | CCSID            | The coded character set ID parameter value.                |
|               | Language ID      | The LANGID parameter value.     |
|               | Country ID       | The CNTRYID parameter value.    |
|               | User switches    | The setting that will be applied to the eight user-defined switch indicators, U1 - U8.                        |
|               | Log output       | The LOGOUTPUT parameter value.  |
|               | Print device     | The PRTDEV parameter value.     |
|               | Output queue     | Output queue - a system object that stores printer spool files (reports for printing) while they are waiting to be printed, or as long as they are in hold status.                         |
|               | OUTQ Library     | The library within DB2 UDB where the output queue is located.                        |
|               | OUTQ Priority    | The priority of spool files in their output queues, for all spool files produced by this job.                            |
|               | Job DATE parm    | The DATE parameter value. This value may be overridden by OpCon, for example, so that it contains the OpCon Schedule date value.            |
|               | Sys Date Fmt     | The system value, Date Format, captured at the time the job was intercepted, which applies to the value in the DATE parameter. |
|               | Current library  | The CURLIB parameter value, specifying the library name that occupies this high position below the system library list and above the user library list in the overall library list for the job.       |
|               | Sort sequence    | The SRTSEQ parameter value.     |
|               | Alw multi-thread | The ALWMLTTHD parameter value.  |
|               | Init ASP group   | The INLASPGRP parameter value.  |
|               | Spool file actn  | The SPLFACN (spool file action) parameter value.                |
|               | Print text       | The PRTTXT parameter value, specifying the line of characters that will appear on all generated spool file reports to label them.          |
|               | Routing data     | The RTGDTA parameter, matched to a routing entry in the subsystem where the job will execute in order to determine the values and resources available as the job starts execution.                      |

#### Functions

- **F3=Exit**: Quits the job details display and returns to the menu.
- **F12=Cancel**: Quits the job details display and returns to the list of tracked jobs.
- **F13=View CMD**: Proceeds to a display of some Job Track Log Detail with an extended area reserved to show all (or much more of) the Call command text.
- **F14=View LIBL**: Press \<F14\>, when it is available, to view an extended display of the Library List.
- **F15=View LDA**: Press \<F15\>, when it is available, to view the content of the job's captured local data area (LDA).
- **F21=WRKJOB**: Press \<F21\>, when it is available, to go to the IBM i Work with Job menu display. After exiting the Work with Job menu or any of its functions, the system will return to this log detail display.
- **F22=RLSJOB**: Press \<F22\>, when it is available, to request the manual release of a queued job from the LSAM Job Tracking master file. After the HOLD window response is given, this program will use the LSAM Job Tracking master file data to construct an IBM i SBMJOB command, and then execute the command. As a result, the actual IBM i job will either be on hold in an IBM i job queue (as specified by the job details), or if not held, the job will immediately begin execution in the specified IBM i subsystem.
- **F23=CNLJOB**: Press \<F23\> to confirm and complete the action of option 4=Cancel job. When F23 is pressed, the LSAM job tracking master record status is set to K=killed, preventing any future release of this job, either by OpCon or manually. (A cancelled job cannot be recovered. Its task must be submitted as a new job.)
- **PageUp=Prev detail**: Press \<PageUp\> to return to the previous panel of Job Track Log Detail information.

## Option 6 = Release Job (F22)

### HOLD Option Window

When option 6=Release job is entered from the Job Track Log list, or \<F22\> is pressed from the Job Track Detail display to manually release a job, the HOLD option window is displayed:

#### Release Job - HOLD Option Window
```
RLSJOB Attributes

    HOLD (Y/N)?...: N

F12=Cancel
```

#### Fields

**HOLD (Y/N)?**: Type a 'Y' = yes and press \<Enter\> to cause the job to be submitted in a released state under IBM i, so that it will run immediately. When 'N' = no is typed and \<Enter\> is pressed, the job will be submitted, but it will be held by IBM i in the specified job queue, and the job must be manually released from the  IBM i job queue.  Choose the option to HOLD the job in order to modify any parameter of the job's definition under IBM i before it is released to run.

#### Functions

**F12=Cancel**: Quits the HOLD option window, cancels the job release action, and returns to the display where the release job action was initiated.

## Job Track Log Detail -- View CMD

Pressing <**F13**> from the Job Track Log Detail display provides a greatly extended viewing area for longer Call commands that could not fit in the two lines of the detail summary display.

### LSALOGR3 - Job Track Log Detail - View CMD

#### Fields

- The fields appearing on this display are the same as explained above for the summary display of Job Track Log Detail.
- Call command: If the call command is very long, the PageDown function key appears on the first page of this extended display at the same time as a plus sign (+) appears at the lower right corner. If PageDown has been used, this same screen shows a continuation of the Call command text, the PageUp function key appears in the command key legend, and a minus sign (-) appears at the beginning of the continued command text field.

#### Functions

- **F3=Exit**: Quits the display of the Job Track Log and returns to the menu.
- **F12=Cancel**: Quits the display of the extended Call command text and returns to the Job Track Log Detail summary display.
- **PageUp**: Appears after PageDown has been used, to move back to previous text in the Call command string.
- **PageDown**: Appears when there is more Call command text than can be shown on a single display panel.

## Job Track Log Detail -- View LIBL

Pressing <**F14**> from the Job Track Log Detail display provides a greatly extended viewing area for longer library lists that could not fit in the primary detail summary display.

### LSALOGR3 - Job Track Log Detail - View LIBL

#### Fields

- The fields appearing on this display are the same as explained above for the summary display of Job Track Log Detail.
- **Initial LIBL**: If the job's initial library list is very long, the PageDown function key appears on the first page of this extended display at the same time as a plus sign (+) appears at the lower right corner. If PageDown has been used, this same screen shows a continuation of the library list, the PageUp function key appears in the command key legend, and a minus sign (-) appears at the beginning of the continued library list text field.

#### Functions

- **F3=Exit**: Quits the display of the Job Track Log and returns to the menu.
- **F12=Cancel**: Quits the display of the extended initial LIBL and returns to the Job Track Log Detail summary display.
- **PageUp**: Appears after PageDown has been used, to move back to previous entries in the library list.
- **PageDown**: Appears when there are more library list entries than can be shown on a single display panel.

## Job Track Log Detail -- View LDA

Pressing <**F15**> from the Job Track Log Detail display provides access to a display of the captured job's local data area (LDA) content. This screen is a list of the 15 lines (1024 character) of the LDA content, but the screen may show a "no records" message if the LDA was either not captured or is completely blank. Function key \<F10\> may be used to toggle the display between a character-only mode that shows the whole LDA on one screen (but non-display characters in the LDA will appear as blanks), and a hex mode that shows the hexadecimal equivalents for each LDA byte position in over/under mode.

### LSALOGR3 - Job Track Log Detail - LDA Content (2 Views)

#### Fields

- Ruler/Character number:    A ruler appears across the top of the list display to help identify the ordinal position of each character in the LDA. The numbers on the left of the display name the first character position of content appearing on each line.
- Displayable character:     Displayable character content of the LDA content is shown in normal green, next to each character number that appears on the left side.
- Hexadecimal equivalents:   Hexadecimal equivalents of each character in the LDA content appear in over/under mode at each character position. This representative view of the hexadecimal characters helps to identify content such as packed numeric data, or other binary data or control characters that cannot be represented on a 5250 (green screen) workstation display as single, displayable characters.

#### Functions

- **F3=Exit**: Quits the display of the Job Track Log and returns to the menu.
- **F12=Cancel**: Quits the display of the LDA content view and returns to the Job Track Log Detail summary display.
- **PageUp**: (not shown) May be used if PageDown was previously used to show more lines while in Hex display mode.
- **Page Down**: (Not shown) May be used if "More\..." appears at the bottom of the display while in Hex display mode.

## Start Job Track (STRJOBTRK)

The Start Job Track option tells the LSAM to monitor Tracked and Queued Jobs. Job tracking must also be started to use the Capture Job function. Starting job tracking causes the LSAM to register its exit program with IBM i. The exit program is run whenever anyone uses the SBMJOB (submit job) command from the IBM i system library QSYS.

:::warning
When using multiple LSAM environments, it is only possible to start job tracking from one environment at a time.

The reason for this restriction is that job tracking is a system-wide function that is managed by manipulating the exit points for the system command to submit jobs (SBMJOB). The exit program for LSAM job tracking can only be registered for one LSAM environment at a time. Job Tracking must be stopped in one environment before starting it from another environment. As with all tasksinvolving multiple environments, this requires careful coordination with the SAM-SS of OpCon.
:::

#### Menu Pathways

- Main Menu > Job track menu (#1) > Start job track (#3)
- From Command Entry, set the current library list for the LSAM environment (SMASETLIBL), or use the command entry line from within the LSAM menu system, then enter the command STRJOBTRK.

### Start Job Tracking Messages

There is no display associated with the function to start job tracking. However, when the start operation has completed normally, the following message is displayed on the bottom of the LSAM menu screen:

**Job tracking started - exit program entries added**

If there is any failure to start job tracking, the following message appears instead:

**Job tracking not started**

When this error occurs, contact SMA Support for assistance. Additional information about what error has occurred may be available from your interactive job log. The job log can be viewed using the following procedure.

### View Interactive Job Log

1. Enter the command **WRKJOB** in the command entry line.
2. Select option 10=Display job log.
3. Press <**F10**> (Display detailed messages).
4. Press <**F18**> (Bottom).
5. Press <**PageUp**> to scroll back to the messages that might report any errors that have occurred.

## End Job Track (ENDJOBTRK)

The End Job Track option tells the LSAM to discontinue monitoring Tracked and Queued Jobs. Stopping job tracking also disables the Capture Job function. When job tracking is stopped, the LSAM removes its entries from the IBM i exit program registry.

#### Menu Pathways

- Main Menu > Job track menu (#1) > End job track (#4)
- From Command Entry, set the current library list for the LSAM environment (SMASETLIBL), or use the command entry line from within the LSAM menu system. Then enter the command ENDJOBTRK.

### End Job Tracking Messages

There is no display associated with the function to start job tracking. However, when the start operation has completed normally, the following message is displayed on the bottom of the LSAM menu screen: 

**Job tracking ended - exit program entries removed**

If there is any failure to start job tracking, the following message
appears instead:

**Job tracking not ended**

When this error occurs, contact SMA Support for assistance. Additional information about what error has occurred may be available from the interactive job log. View the job log using the following procedure.

[View Interactive Job Log]

1. Enter the command **WRKJOB** in the command entry line.
2. Select option 10=Display job log.
3. Press <**F10**> (Display detailed messages).
4. Press <**F18**> (Bottom).
5. Press <**PageUp**> to scroll back to the messages that might report any errors that have occurred.

## Check Job Track Status (JOBTRKSTS)

The pop-up Job Tack Status window displays the job track status. Options include STARTED and STOPPED.

#### Check Job Track Status Window
```

  Job track status :  STOPPED

                          Press Enter to continue

```

#### Menu Pathways

- Main Menu > Job track menu (#1) > Check Job Track Status (#5)
- From Command Entry, set the current library list for the LSAM environment (SMASETLIBL), or use the command entry line from within the LSAM menu system, then enter the command JOBTRKSTS.

## Job Tracking with Multiple LSAM Environments

Only one LSAM environment within an instance of the IBM i operating system is allowed to control Job Tracking. This constraint is imposed by the IBM i exit program technique used to enable LSAM Job Tracking. 

The LSAM programs help to recognize whenever there is a conflict of job tracking control with another LSAM environment. When the job track status is checked, it is apparent that job tracking is being managed by a different environment if there is an error message at the bottom of the status window. The following figure illustrates this warning.

#### Check Job Tack Status Window - With Error
```

  Job track status :   STOPPED

  WARNING: Job Tracking appears active in another environment
                          Press Enter to continue

```

## Job Tracking Configuration

### TRKJOBD301 - Job Tracking Configuration

#### Menu Pathway

Main Menu > Job track menu (#1) > Job tracking configuration (#7)

#### Fields

:::warning
The required procedure for changing the exit program number is to first stop job tracking, then change the number, then restart job tracking. The new number will not take effect until the next time that job tracking is started, and the old number (if not the default value) cannot be found for stopping job tracking if the number has been changed while job tracking is still active.
:::


| Field           | Values          | Default    | Description     |
| ----            | ------          | -------    | -----------     |
| Environment     |                 |            | The name of the current LSAM environment in which the menu system is running (could be different from the specified Job Track control environment name).|
| Version         |                 |            | The version of LSAM software in this environment, from the LSAVERSION data area in library SMADTA (or its equivalent). |
| Control environment        |                 |            | The name of the LSAM environment that is currently, or was last specified as the environment in control of job tracking (could be different from the current Environment).   |
| Job tracking status   | STARTED/STOPPED     |          | The status of LSAM job tracking, determined by checking for the exit program entries in the IBM i registry.|
| QSYS/SBMJOB cmd exit nbr. | 1 -- 2147483647 | 2147483647 | The exit point number assigned by the LSAM to the job tracking exit program in the IBM i registry. |
| Tracked Job parameter separator character - HEX  | 00-FF           | 6A         | A pair of characters representing the hexadecimal value of the EBCDIC keyboard character that marks the division of this LSAM's Job Tracking ID information fields that are sent to OpCon. The same values and separator are returned to the LSAM when OpCon sends job control transactions after a $JOB event command initiates cooperative job tracking. The default value of a vertical bar, or "pipe" character is strongly recommended (e.g., \|). |
| | | |**Note**: Attention to this character is usually on required in non-U.S. environments. Please contact  SMA Support for assistance if Job Tracking is not working  correctly.      |
| Auto-start job tracking | Y=Yes,N=No      | Y          | This option tells the LSAM server start and stop programs whether to also start or stop Job Tracking at the same time as all other LSAM server jobs are managed. |
| Allow *RQS msg for SBMJOB | 0=No,1=Yes   | 0          | This option controls the behavior of the Job Tracking command processor exit program when processing the SBMJOB command. The default behavior of the LSAM will be to directly call QCMD when submitting jobs that do not qualify for job tracking. When the option is set to '1' = Yes, the LSAM will provide improved support for the IBM i Command Entry screen function keys F9=Retrieve and F4=Prompt, while Job Tracking is started. However, this new option should be turned off (set to '0'=No) in environments where request message processing cannot be used to perform the SBMJOB command. This condition would typically only be discovered by experimentation. |
| Expand JOBD/JOBQ obj refs | 0=No, 1=Yes           | 1          | Many times the SBMJOB command parameters use cross-references to other IBM i objects in order to identify which job description and/or job queue should be used for a job. In most cases, these cross-references should be resolved by the Job Tracking programs as the tracking process starts, especially because the job start process is typically suspended from its original job, and then resumed from an LSAM server job      |
| Allow automatic tracking | 0=None, 1=Positive, 2=Negative| 0          | This control field governs how Automatic Job Tracking will decide which jobs in the IBM i partition will be selected for automatic tracking. The impact of this control field is described above in this topic, under "How Job Tracking Works -> Automatic Job Tracking." |
| Expand JOBD/JOBQ obj refs | 0=No, 1=Yes          | 0          | This option tells the Job Tracking exit program whether to replace \*LIBL in the Job Description Library name and the Job Queue Library name of the intercepted SBMJOB command. It also controls replacing a value of \*JOBD in the Job Queue Name parameter of the SBMJOB command. Replacing these indirect object references may provide more exact control over which jobs are qualified for Job Tracking, and over selection of the OpCon Schedule and Schedule Date that is matched when there is more than one instance of the same IBM i Job Name that could be tracked, such as when a Test environment is present in the same IBM i partition as a Production environment. |
| | | | When this option is set to 0=No, the indirect object reference values of \*LIBL and \*JOBD could only be matched by the LSAM Job Tracking Parameter field special value of *ALL. |
| | | | The SBMJOB parameter values that are managed by the LSAM Job Tracking exit program are the values present in the original SBMJOB command, not the finally resolved job definition parameters that are replaced by IBM i only when the job is actually processed for placement on a job queue - which happens after the LSAM Job Tracking exit program.|


#### Functions

- **F3=Exit**: Quit the display without update and return to the menu.
- **F5=Refresh**: Restore the current control file values to the screen, overlaying any typed input.
- **F7=STRJOBTRK**: Start job tracking, the same as menu option 3.
- **F8=ENDJOBTRK**: End job tracking, the same as menu option 4.
- **F12=Cancel**: Quits the display without update and return to the previous screen.

## Start Job Capture (STRCAPJOB)

The screen includes detailed instructions about how to use this function. More information about using the Capture Job feature can be found above under Operating Job Tracking and How LSAM job tracking works.

### STRCAPJOB1 - Start Capture Job

#### Menu Pathway

Main Menu > Job track menu (#1) > Start job capture (STRCAPJOB) (#8)

#### Fields

| Field               | Values     | Default | Description         |
| -----               | ------     | ------- | -----------         |
| Environment         |            |         | The name of the current LSAM environment in which the menu system is running (could be different from the specified Job Track control environment name).  |
| Version             |            |         | The version of LSAM software in this environment, from the LSAVERSION data area in library SMADTA (or its equivalent).  |
| Control environment |            |         | The name of the LSAM environment that is currently, or was last specified as the environment in control of job tracking (could be different from the current Environment). |
| Job tracking status | STARTED/STOPPED   |         | The status of LSAM job tracking, determined by checking for the exit program entries in the IBM i registry.   |
| Add job or workstation | IBM i name |         | Type the name of an IBM i workstation (device or emulation session/job name) or the name of any IBM i job that will be executing the SBMJOB command that needs to be captured.           |
| Active job capture list | IBM i name |         | A list of up to 21 names of workstations or jobs that can be concurrently active for capturing jobs. This list is only effective while LSAM Job Tracking is STARTED.         |

#### Functions

- **F3=Exit**: Quit the display without update and return to the menu.
- **F5=Refresh**: Restore the current control file values to the screen, overlaying any typed input.
- **F7=STRJOBTRK**: Start job tracking, the same as menu option 3.
- **F8=ENDJOBTRK**: End job tracking, the same as menu option 4.
- **F12=Cancel**: Quits the display without update and return to the previous screen.

## End Job Capture (ENDCAPJOB)

The screen includes detailed instructions about how to use this function. More information about using the Capture Job feature can be found above under Operating Job Tracking and How LSAM job tracking works.

### STRCAPJOB1 - End Capture Job

#### Menu Pathway

Main Menu > Job track menu (#1) > End job capture (ENDCAPJOB) (#9)

#### Fields


| Field               | Values     | Default | Description         |
| ------              | ------     | ------- | -----------         |
| Environment         |            |         | The name of the current LSAM environment in which the menu system is running (could be different from the specified Job Track control environment name). |
| Version             |            |         | The version of LSAM software in this environment, from the LSAVERSION data area in library SMADTA (or its equivalent).   |
| Control environment |            |         | The name of the LSAM environment that is currently, or was last specified as the environment in control of job tracking (could be different from the current Environment). |
| Job tracking status | STARTED\STOPPED    |         | The status of LSAM job tracking, determined by checking for the exit program entries in the IBM i registry.         |
| End job or workstation | IBM i name |         | Type the name of an IBM i workstation or job that appears in the Active job capture list in order to remove that device or job from the list. LSAM job tracking does not have to be stopped in order to complete this maintenance. Ending job capture for a workstation or job takes effect immediately. |
| Active job capture list | IBM i name |         | A list of up to 21 names of workstations or jobs that can be concurrently active for capturing jobs. This list is only effective while LSAM Job Tracking is STARTED.      |

#### Functions

- **F3=Exit**: Quit the display without update and return to the menu.
- **F5=Refresh**: Restore the current control file values to the screen, overlaying any typed input.
- **F7=STRJOBTRK**: Start job tracking, the same as menu option 3.
- **F8=ENDJOBTRK**: End job tracking, the same as menu option 4.
- **F12=Cancel**: Quits the display without update and return to the previous screen.

## Display Captured Jobs (DSPCAPJOB)

The Display function allows a view of captured job information without allowing changes to the jobs. This function may be appropriate for a wider group of user profiles than the WRKCAPJOB command/function that does allow changes.

### DSPCAPR1 - Display Captured Jobs

#### Menu Pathways

Main Menu > Job track menu (#1) > Display captured jobs (DSPCAPJOB) (#10)

#### Options

**5=Detail**: View the details of a captured job.

#### Fields

-  **Opt**:              Input field where an available option may be typed to act upon a record in the list.
-  **Search content**:   Type in a value that can be found anywhere in the record represented by each line on the list. The entire record will be searched, not just the fields displayed in the list. Use option 5=Display to see the matching detail that satisfied the search when the cursor appears in the Opt field next to a line on the display. The <**Enter**> key or <**F16**> may be used to start a search, and <**F16**> is used to continue the search from the last record found.
-  **Capture ID**:       The key identifier of each record. For records of type L, this name must be the Captured Job ID or the Job Name of a tracked or queued job. For records of type V, this may be any meaningful name that will be used to create a token ID. Job names are limited to 10 characters, but a Captured Job ID or token ID can use up to the 12 characters allowed for this field.
-  **Job name**:         The name the job will use (by default) when it is submitted, same as the job name that was specified when the job was originally captured. (This value may be overridden by various means, including by the job name specified in the OpCon schedule that executes the captured job.)
-  **CMD line...**:      The first several characters of the job's command line are displayed to help identify each job. (The full command line content is available in the detailed displays for each record.)

#### Functions

- **F3=Exit**: Quits the display and returns to the menu.
- **F5=Refresh**: Reload the list display with data from the master file.
- **F12=Cancel**: Quits the display and returns to the previous screen.
- **F16=Search next**: Press to start a new search based on the value entered in the Search input field, or to continue a search from the last record found.
- **F17=Top**: Causes the list to display from the first record. The list is sorted in order of the Capture ID.
- **F18=Bottom**: Causes the list to display the last record in the file.

## Option 5 = Display Captured Job Detail

### DSPCAPR2 - Capture Job Detail

#### Menu Pathways

Main Menu > Job track menu (#1) > Display captured jobs (DSPCAPJOB) (#10) > Option 5 = Display

#### Fields

Most of the job definition parameters are taken verbatim from the IBM i SBMJOB command. Detailed explanations of these fields may be found in IBM documentation and in the Help text for the SBMJOB command. The following table explains fields that are unique to the LSAM software and it provides additional notes about some fields.

:::tip
Captured jobs always convert a SBMJOB parameter value of \*CURRENT to whatever value was in effect at the time the job was captured. This allows the values that would have been in effect for the job to be preserved until the job is actually executed by OpCon.
:::

**Internal Data**
- **Capture ID**:      The key identifier of the record, specified when the job was captured. A Captured Job ID can use up to the 12 characters. Two additional characters more than a job name are allowed so that duplicate copies of the same job name can be stored with different job parameters.
- **Cap date**:        The system date when this job was captured.

**IBM i Parameters**
-  **Cap time**:        The system time when this job was captured.
-  **CMD SrcMbr**:      The name assigned by LSAM internal routines to the source member in the LSAM command source physical file DBFCMDSRC where the command line text is stored.
-  **FMT**:             The system date format in effect when the job was captured. This is the format of the Job DATE field.
-  **CapJob fields**:   The IBM i job ID of the workstation or batch job that performed the capture action.
-  **INLLIBL +**:       The first several characters of the initial library list are shown. If there is more data in the list than can be shown on this display, the plus sign (+) appears at the end of the line and function key F14=More LIBL appears at the bottom of the display.
-  **CMD line +**:      The first several characters of the command line are shown. If there is more data in the command line than can be shown on this display, the plus sign (+) appears at the end of the line and function key F13=More CMD appears at the bottom of the display.

#### Functions

- **F3=Exit**: (Not displayed, but available.) Quits the display and returns to the menu.
- **F12=Cancel**: Quits the display and returns to the previous screen.
- **F13=More CMD**: Appears if there is more command line text than will fit on this display. Press <**F13**> to go to a dedicated screen where the entire command line text may be viewed, using PageDown as necessary.
- **F14=More LIBL**: Appears if there are more entries in the initial library list than can be shown on this display. Press <**F14**> to go to a dedicated screen where the entire initial library list may be viewed.
- **F15=View LDA**: All captured jobs have the 1024-character local data area captured and preserved, even if the LDA is not loaded or used for the job. For jobs that need the LDA, the captured LDA contents may be viewed using this function key. An examination of the LDA contents may be important if Dynamic Variables (type L) will be used to update the LDA contents when the captured job is executed by OpCon.

## F13 = More CMD (View CMD)

### DSPCAPR3 - Capture Job Detail - View CMD

#### Menu Pathways

Main Menu > Job track menu (#1) > Display captured jobs (DSPCAPJOB) (#10) > Option 5 = Display > F13=More CMD

#### Fields

-  **Capture ID**:   The key identifier of the record, specified when the job was captured. A Captured Job ID can use up to the 12 characters. Two additional characters more than a job name are allowed so that duplicate copies of the same job name can be stored with different job parameters.
-  **Job name**:     The IBM i name assigned to the job when it was originally submitted.
-  **1 -- 20000**:   The range of the command line characters (out of a possible total 20,000 characters) that appear on this screen at once.
-  **\- / +**:       The minus sign (-) and the plus sign (+) will appear at the beginning or end of the command line text to indicate that there is more data in either direction. When the minus sign appears, the PageUp function key is active; when the plus sign (+) appears, the PageDown key is active.
 
#### Functions

- **F3=Exit**: Quits the display and returns to the menu.
- **F12=Cancel**: Quits the display and returns to the previous screen.
- **PageUp**: View lower numbered character positions of the command line text.
- **PageDown**: View higher numbered character positions of the command line text.

## F14 = More LIBL (View LIBL)

### DSPCAPR4 - Capture Job Detail - View LIBL

#### Menu Pathways
 
Main Menu > Job track menu (#1) > Display captured jobs (DSPCAPJOB) (#10) > Option 5 = Display > F13=More CMD

#### Fields

-  **Capture ID**:   The key identifier of the record, specified when the job was captured. A Captured Job ID can use up to the 12 characters. Two additional characters more than a job name are allowed so that duplicate copies of the same job name can be stored with different job parameters.
-  **Job name**:     The IBM i name assigned to the job when it was originally submitted.
-  **\- / +**:       The minus sign (-) and the plus sign (+) will appear at the beginning or end of the library list to indicate that there is more data in either direction. When the minus sign appears, the PageUp function key is active; when the plus sign (+) appears, the PageDown key is active.

#### Functions

- **F3=Exit**: Quits the display and returns to the menu.
- **F12=Cancel**: Quits the display and returns to the previous screen.
- **PageUp**: View library names towards the beginning of the library list.
- **PageDown**: View library names towards the end of the library list.

## F15 = View LDA

Pressing <**F15**> from the Display Captured Job Detail display provides access to a display of the captured job's local data area (LDA) content. This screen is a list of the 15 lines (1024 characters) of the LDA content, but the screen may show completely blank content. Function key \<F10\> may be used to toggle the display between a
character-only mode that shows the whole LDA on one screen (but non-display characters in the LDA will appear as blanks), and a hex mode that shows the hexadecimal equivalents for each LDA byte position in over/under mode.

### DSPCAPR6 - Capture Job Detail - LDA Content (2 Views)

#### Fields

-  **Ruler/Character number**:    A ruler appears across the top of the list display to help identify the ordinal position of each character in the LDA. The numbers on the left of the display name the first character position of content appearing on each line.
-  **Displayable character**:     Displayable character content of the LDA content is shown in normal green, next to each character number that appears on the left side.
-  **Hexadecimal equivalents**:   The hexadecimal equivalents of each character in the LDA content appear in over/under mode at each character position. This representative view of the hexadecimal characters helps to identify content such as packed numeric data, or other binary data or control characters that cannot be represented on a 5250 (green screen) workstation display as single, displayable characters.
  
#### Functions

- **F3=Exit**: Quits the display and returns to the menu.
- **F12=Cancel**: Quits the display and returns to the previous screen.
- **F10=Hex/Char**: Toggles the display between the two modes, character and hexadecimal.
- **PageUp**: (not shown) May be used if PageDown was previously used to show more lines while in Hex display mode.
- **PageDown**: (not shown) May be used if "More..." appears at the bottom of the display while in Hex display mode.

## Work with Captured Jobs (WRKCAPJOB)

The "Work with" function allows data of captured job information to be accessed for update. This function, driven by the WRKCAPJOB command, should probably be restricted to a limited number of user profiles. It may not be appropriate for as wide group of user profiles as the display-only DSPCAPJOB command/function that does not allow changes.

### WRKCAPR1 - Work with Captured Jobs

#### Menu Pathways

Main Menu > Job track menu (#1) > Work with captured jobs (WRKCAPJOB) (#11)

#### Options

- **2=Change**: Update the job parameters; also provides access to special update functions for the initial library list, the command line and the LDA content.
- **3=Copy**: Select a record as the source data for creating a new captured job definition without having to run the Capture Job process again.
- **4=Delete**: Select one or more records to be deleted, along with all of their associated job definition data (stored in multiple LSAM master files). A subsequent prompt screen will present a list of all records selected for deletion before the delete action is confirmed and completed.
- **5=Detail**: View the details of a captured job (without being concerned about updating them).

#### Fields

-  **Opt**:              Input field where an available option may be typed to act upon a record in the list.
-  **Search content**:   Type in a value that can be found anywhere in the record represented by each line on the list. The entire record will be searched, not just the fields displayed in the list. Use option 5=Display to see the matching detail that satisfied the search when the cursor appears in the Opt field next to a line on the display. The <**Enter**> key or <**F16**> may be used to start a search, and <**F16**> is used to continue the search from the last record found.
-  **Capture ID**:       The key identifier of each record. For records of type L, this name must be the Captured Job ID or the Job Name of a tracked or queued job. For records of type V, this may be any meaningful name that will be used to create a token ID. Job names are limited to 10 characters, but a Captured Job ID or token ID can use up to the 12 characters allowed for this field.
-  **Job name**:         The name the job will use (by default) when it is submitted, same as the job name that was specified when the job was originally captured. (This value may be overridden by various means, including by the job name specified in the OpCon schedule that executes the captured job.)
-  **CMD line...**:      The first several characters of the job's command line are displayed to help identify each job. (The full command line content is available in the detailed displays for each record.)  

#### Functions

- **F3=Exit**: Quits the display and returns to the menu.
- **F5=Refresh**: Reload the list display with data from the master file.
- **F12=Cancel**: Quits the display and returns to the previous screen.
- **F16=Search next**: Press to start a new search based on the value entered in the Search input field, or to continue a search from the last record found.
- **F17=Top**: Causes the list to display from the first record. The list is sorted in order of the Capture ID.
- **F18=Bottom**: Causes the list to display the last record in the file.

## Option 2 = Change (Maintain) Captured Job

### WRKCAPR8 - Maintain Job Detail

#### Menu Pathways

Main Menu > Job track menu (#1) > Work with captured jobs (WRKCAPJOB) (#11) > Option 2 = Change

#### Fields

Most of the job definition parameters are taken verbatim from the IBM i SBMJOB command. Detailed explanations of these fields may be found in IBM documentation and in the Help text for the SBMJOB command. The following table explains fields that are unique to the LSAM software and it provides additional notes about some fields.

:::tip
Captured jobs always convert a SBMJOB parameter value of \*CURRENT to whatever value was in effect at the time the job was captured. This allows the values that would have been in effect for the job to be preserved until the job is actually executed by OpCon.
:::

**Internal Data**

- **Capture ID**: The key identifier of the record, specified when the job was captured. A Captured Job ID can use up to the 12 characters. Two additional characters more than a job name are allowed so that duplicate copies of the same job name can be stored with different job parameters.          
- **Cap date**:   The system date when this job was captured.      
- **Cap time**:   The system time when this job was captured.      
- **CMD SrcMbr**: The name assigned by LSAM internal routines to the source member in the LSAM command source physical file DBFCMDSRC where the command line text is stored. 

**IBM i Parameters** 
- **FMT**:         The system date format in effect when the job was captured. This is the format of the Job DATE field.
- **CapJob fields**: The IBM i job ID of the workstation or batch job that performed the capture action.
- **INLLIBL +**: The first several characters of the initial library list are shown. If there is more data in the list than can be shown on this display, the plus sign (+) appears at the end of the line.
:::tip
 The Initial library list cannot be maintained from this display-only field. Use F14=Edit LIBL to perform any changes. 
:::
- **CMD line +**: The first several characters of the command line are shown. If there is more data in the command line than can be shown on this display, the plus sign (+) appears at the end of the line.
:::tip
The command line text cannot be maintained from this display-only field. Use F13=Change CMD to perform any changes.
:::  

#### Functions

- **F3=Exit**: (Not displayed, but available.) Quits the display and returns to the menu.
- **F12=Cancel**: Quits the display and returns to the previous screen.
- **F13=Change CMD**: Press <**F13**> to start a Source Edit Utility (SEU) session that can be used to update the source file member where the full command line is stored.
- **F14=Edit LIBL**: Press <**F14**> to go to a dedicated screen where the entire initial library list may be conveniently edited and updated.
- **F15=Change LDA**: All captured jobs have the 1024-character local data area captured and preserved, even if the LDA is not loaded or used for the job. For jobs that need the LDA, the captured LDA contents may be viewed and updated using this function key.
- **F21=CHKJOB**: Press <**F21**> to request an edit from IBM i of the job's parameters. Any error messages returned by IBM i will display at the bottom of the screen. Data entry made on this screen is NOT edited when <**Enter**> is pressed to update the record. <**F21**> must be used before the <**Enter**> key is pressed in order to help assure that a captured job definition will be updated with valid data.

### F13 = Change CMD

#### Menu Pathways

- Main Menu > Job track menu (#1) > Work with captured jobs (WRKCAPJOB) (#11) > Option 2 = Change > F13=Change CMD
- Pressing <**F13**> starts a Source Edit Utility (SEU) session that can be used to update the source file member where the full command line is stored.

:::tip
The SEU edit screen is not documented in this documentation. Refer to IBM documentation for information about how to perform source member editing with SEU. The LSAM permits any other form of IBM i source physical file member editing to be used, including WebSphere from a PC workstation. The field value for CMD SrcMbr names the member in file SMADTA/DBFCMDSRC that can be edited in order to update the captured job's command line. (The SMADTA library may have a different name if an alternate LSAM environment is being used.)
:::

## F14 = Edit LIBL

In the Edit LIBL display, after new values have been typed and the <**Enter**> key has been pressed once, the sorted and updated library list is presented a second time for confirmation before an update is completed. The <**Enter**> key must be pressed a second time with no changes made to the screen in order for the data update to be completed. (This works like the IBM i EDTLIBL command in this respect.)

### WRKCAPR5 - Capture Job Detail - Edit LIBL

#### Menu Pathways

Main Menu > Job track menu (#1) > Work with captured jobs (WRKCAPJOB) (#11) > Option 2 = Change > F14=Edit LIBL

#### Fields

-  **Capture ID**:        The key identifier of the record, specified when the job was captured. A Captured Job ID can use up to the 12 characters. Two additional characters more than a job name are allowed so duplicate copies of the same job name can be stored with different job parameters.
-  **Sequence number**:   10 -- 2500, similar to the IBM i EDTLIBL display. Different values can be typed into this field to cause the order of libraries in the list to change. The sequence number field is renumbered by tens every time the <**Enter**> key is pressed, after the library names have been sorted into the requested order.
-  **Library**:           The name of any library that should be in the job's initial library list. For the Capture Job application (unlike the IBM i EDTLIBL command), a single value of \*JOBD, or any other value permitted by the INLLIBL parameter of the SBMJOB command, may be used instead of actual library names.

#### Functions

- **F3=Exit**: Quits the display and returns to the menu.
- **F12=Cancel**: Quits the display and returns to the previous screen.
- **PageUp**: View library names towards the beginning of the library list.
- **PageDown**: View library names towards the end of the library list.

## F15 = Change LDA

Pressing <**F15**> from the Change Captured Job Detail display provides access to a display of the captured job's local data area (LDA) content. This screen is a list of the 15 lines (1024 characters) of the LDA content. Function key \<F10\> may be used to toggle the display between a character-only mode that shows the whole LDA on one screen (but non-display characters in the LDA will appear as blanks), and a hex mode that shows the hexadecimal equivalents for each LDA byte position in over/under mode.

#### Change LDA Content (Hex)
```
WRLCAPR7                 Capture Job Detail -- Change LDA            DD/DD/DD
USERNAME                    Capture ID: OOOOOOOOOOOO                 TT:TT:TT
      1...5...10....5...20....5...30....5...40....5...50....5...60....5...70
   1  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
      OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
      OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
  71  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
      OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
      OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
 141  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
      OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
      OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
 211  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
      OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
      OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
 281  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
      OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
      OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
 351  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
      OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
      OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
                                                                         More...
F3=Exit  F5=Refresh  F10=Char Updt  F11=Hex/Char View  F12=Cancel  F19=Rollback
```

#### Change LDA Content (Char)
```
DSPCAPR6               Capture Job Detail -- LDA Content             DD/DD/DD
USERNAME                   Capture ID: OOOOOOOOOOOO                  TT:TT:TT
      1...5...10....5...20....5...30....5...40....5...50....5...60....5...70
   1  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
  71  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
 141  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
 211  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
 281  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO             
 351  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
 421  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
 491  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
 561  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
 631  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
 701  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
 771  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
 841  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
 911  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
 981  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
                                                                         Bottom
F3=Exit   F10=Hex/Char   F12=Cancel
```

#### Menu Pathways

Main Menu > Job track menu (#1) > Work with captured jobs (WRKCAPJOB) (#11) > Option 2 = Change > F15=Change LDA

#### Fields

- **Ruler/Character number**:    A ruler appears across the top of the list display to help identify the ordinal position of each character in the LDA. The numbers on the left of the display name the first character position of content appearing on each line.
- **Displayable character**:     Displayable character content of the LDA content is shown in normal green, next to each character number that appears on the left side.
- **Hexadecimal equivalents**:   Hexadecimal equivalents of each character in the LDA content appear in over/under mode at each character position. This representative view of the hexadecimal characters helps to identify content such as packed numeric data, or other binary data or control characters that cannot be represented on a 5250 (green screen) workstation display as single, displayable characters.

#### Functions

- **F3=Exit**: Quits the display and returns to the menu.
- **F12=Cancel**: Quits the display and returns to the previous screen.
- **F10=Hex/Char Updt**: Toggles the display between the two modes, character and hexadecimal. F10 changes the mode in which data entry is allowed. When F10 is pressed, any updates entered in the first mode are preserved before the entry mode is switched. Use F11 to temporarily change the view between hex and character without leaving the current data entry mode.
- **F11=Hex/Char View**: Toggles the display between hex and character viewing modes, but does not change the data entry mode or cause any typed changes to be preserved.
- **F19=Rollback**: This function key will cause a window to display that lists all the prior versions of this LDA content. A prior version may be selected for viewing and/or accepted as an update to the LDA in order to put it back to a prior, or the original version. (Refer to example, below.)
- **PageUp**: (not shown) May be used if PageDown was previously used to show more lines while in Hex display mode.
- **PageDown**: (not shown) May be used if "More..." appears at the bottom of the display while in Hex display mode.

## F19 = Rollback

Pressing <**F19**> from the Change LDA display presents a window that lists all the prior versions of this LDA that were previously saved to disk. A prior version may be selected to view it in the Change LDA display, and if it is acceptable, pressing <**Enter**> will cause the LDA content to be updated to that content version. (This new update will also be preserved in the update history of the LDA.)

#### Select Previous LDA Image
```
           Select previous LDA image

  Type sequence number of image to select.  

  Press Enter to update screen.

    SEQ #  RECORD TIME STAMP                               
      0    2000-10-13-14.17.27.672000
      1    2000-10-13-09.02.56.534000

                                           Bottom  
  Sequence number:     0
  F12=Cancel
```

#### Menu Pathways

Main Menu > Job track menu (#1) > Work with captured jobs (WRKCAPJOB) (#11) > Option 2 = Change > F15=Change LDA > F19=Rollback

#### Fields

-  **SEQ #**:              A program-generated number used for selecting the desired previous LDA image.
-  **RECORD TIME STAMP**:   The date and time the LDA image was last updated.
-  **Sequence number**:     Use this field to type the SEQ # of the LDA image to be selected for return to the calling display.

#### Functions

**F12=Cancel**: Quits the display and returns to the previous screen.

## Option 3 = Copy Captured Job

### WRKCAPR8 - Copy Job Detail

#### Menu Pathways

Main Menu > Job track menu (#1) > Work with captured jobs (WRKCAPJOB) (#11) > Option 3 = Copy

#### Fields

Most of the job definition parameters are taken verbatim from the IBM i SBMJOB command. Detailed explanations of these fields may be found in IBM documentation and in the Help text for the SBMJOB command. The following table explains fields that are unique to the LSAM software and it provides additional notes about some fields.

**Internal Data**
- **Capture ID (from)**:  The key identifier of the record, specified when the job was captured. A Captured Job ID can use up to the 12 characters. Two additional characters more than a job name are allowed so that duplicate copies of the same job name can be stored with different job parameters.
- **To: Capture ID**:  A new capture ID must be provided. The program suggests a new ID based on the source ID. When the trailing characters of the source ID are blank, the program inserts zeros to fill the field and increments a counter in the last character position(s) that will make the new ID unique. The proposed ID may be changed, but the new record being created by the Copy function must have a unique ID. 
- **Cap date**: The system date when this job was captured.
- **Cap time**: The system time when this job was captured.

**IBM i Parameters**  
- **CMD SrcMbr**: The name assigned by LSAM internal routines to the source member in the LSAM command source physical file DBFCMDSRC where the command line text is stored. A new member will be created for the copied command line.
- **FMT**: The system date format in effect when the job was captured. This is the format of the Job DATE field. 
- **CapJob fields**: The IBM i job ID of the workstation or batch job that performed the capture action.       
- **INLLIBL +**: The first several characters of the initial library list are shown. If there is more data in the list than can be shown on this display, the plus sign (+) appears at the end of the line.                                           |
:::tip
The Initial library list cannot be maintained from this display-only field. Use F14=Edit LIBL to perform any changes. 
:::
- **CMD line +**: The first several characters of the command line are shown. If there is more data in the command line than can be shown on this display, the plus sign (+) appears at the end of the line.
:::tip
The command line text cannot be maintained from this display-only field. Use F13=Change CMD to perform any changes.
:::

#### Functions

- **F3=Exit**: (Not displayed, but available.) Quits the display and returns to the menu.
- **F12=Cancel**: Quits the display and returns to the previous screen.
- **F13=Change CMD**: (F13 is not supported from the Copy screen.)
- **F14=Edit LIBL**: Press <**F14**> to go to a dedicated screen where the entire initial library list may be conveniently edited and updated.
- **F15=Change LDA**: All captured jobs have the 1024-character local data area captured and preserved, even if the LDA is not loaded or used for the job. For jobs that need the LDA, the captured LDA contents may be viewed and updated using this function key.
- **F21=CHKJOB**: Press <**F21**> to request an edit from IBM i of the job's parameters. Any error messages returned by IBM i will display at the bottom of the screen. Data entry made on this screen is NOT edited when <**Enter**> is pressed to update the record.<**F21**> must be used before the <**Enter**> key is pressed in order to help assure that a captured job definition will be updated with valid data.

## Option 4 = Delete Captured Job

The job parameter fields are displayed in turquoise instead of yellow in this Work With menu function to indicate that the fields are protected from input. They display in yellow on the Change Job Details screen.

### WRKCAPR2 - Delete Capture Job

#### Menu Pathways

Main Menu > Job track menu (#1) > Work with captured jobs (WRKCAPJOB) (#11) > Option 4 = Delete

#### Fields

Most of the job definition parameters are taken verbatim from the IBM i SBMJOB command. Detailed explanations of these fields may be found in IBM documentation and in the Help text for the SBMJOB command. The following table explains fields that are unique to the LSAM software and it provides additional notes about some fields. Data fields on this screen appear in turquoise to indicate that they cannot be changed.

**Internal Data**
-  **Capture ID**:      The key identifier of the record, specified when the job was captured. A Captured Job ID can use up to the 12 characters. Two additional characters more than a job name are allowed so that duplicate copies of the same job name can be stored with different job parameters.
-  **Cap date**:        The system date when this job was captured.
-  **Cap time**:        The system time when this job was captured.
-  **CMD SrcMbr**:      The name assigned by LSAM internal routines to the source member in the LSAM command source physical file DBFCMDSRC where the command line text is stored. (The command line source member will be removed as the delete action is completed.)

**IBM i Parameters**
-  **FMT**:             The system date format in effect when the job was captured. This is the format of the Job DATE field.
-  **CapJob fields**:   The IBM i job ID of the workstation or batch job that performed the capture action.
-  **INLLIBL +**:       The first several characters of the initial library list are shown. If there is more data in the list than can be shown on this display, the plus sign (+) appears at the end of the line.
-  **CMD line +**:      The first several characters of the command line are shown. If there is more data in the command line than can be shown on this display, the plus sign (+) appears at the end of the line.
 
#### Functions

- **F3=Exit**: (Not displayed, but available.) Quits the display and returns to the menu.
- **F12=Cancel**: Quits the display and returns to the previous screen. The record will not be deleted.
- **F23=DLTJOB**: Confirm the delete request for this individual captured job definition and all data pertaining to it in other LSAM master files. Pressing F23 from this screen begins the actual delete action.

## Option 5 = Display Captured Job Detail

The job parameter fields are displayed in turquoise instead of yellow in this Work With menu function to indicate that the fields are protected from input. They display in yellow on the Change Job Details screen.

### WRKCAPR2 - Capture Job Detail

#### Menu Pathways

Main Menu > Job track menu (#1) > Work with captured jobs (WRKCAPJOB) (#11) > Option 5 = Display

#### Fields

Most of the job definition parameters are taken verbatim from the IBM i SBMJOB command. Detailed explanations of these fields may be found in IBM documentation and in the Help text for the SBMJOB command. The following table explains fields that are unique to the LSAM software and it provides additional notes about some fields.

:::tip
Captured jobs always convert a SBMJOB parameter value of *CURRENT to whatever value was in effect at the time the job was captured. This allows the values that would have been in effect for the job to be preserved until the job is actually executed by OpCon.
:::

**Internal Data**
-  **Capture ID**:      The key identifier of the record, specified when the job was captured. A Captured Job ID can use up to the 12 characters. Two additional characters more than a job name are allowed so that duplicate copies of the same job name can be stored with different job parameters.
-  **Cap date**:        The system date when this job was captured.
-  **Cap time**:        The system time when this job was captured.
-  **CMD SrcMbr**:      The name assigned by LSAM internal routines to the source member in the LSAM command source physical file DBFCMDSRC where the command line text is stored.

**IBM i Parameters**
-  **FMT**:             The system date format in effect when the job was captured. This is the format of the Job DATE field.
-  **CapJob fields**:   The IBM i job ID of the workstation or batch job that performed the capture action.
-  **INLLIBL +**:       The first several characters of the initial library list are shown. If there is more data in the list than can be shown on this display, the plus sign (+) appears at the end of the line and function key F14=More LIBL appears at the bottom of the display.
-  **CMD line +**:      The first several characters of the command line are shown. If there is more data in the command line than can be shown on this display, the plus sign (+) appears at the end of the line and function key F13=More CMD appears at the bottom of the display.
  
#### Functions

- **F3=Exit**: (Not displayed, but available.) Quits the display and returns to the menu.
- **F12=Cancel**: Quits the display and returns to the previous screen.
- **F13=More CMD**: Appears if there is more command line text than will fit on this display. Press <**F13**> to go to a dedicated screen where the entire command line text may be viewed, using PageDown as necessary. (Refer to the F13=More CMD screen for the DSPCAPJOB function, above, for details.)
- **F14=More LIBL**: Appears if there are more entries in the initial library list than can be shown on this display. Press <**F14**> to go to a dedicated screen where the entire initial library list may be viewed. (Refer to the F14=More LIBL screen for the DSPCAPJOB function, above, for details.)
- **F15=View LDA**: All captured jobs have the 1024-character local data area captured and preserved, even if the LDA is not loaded or used for the job. For jobs that need the LDA, the captured LDA contents may be viewed using this function key. An examination of the LDA contents may be important if Dynamic Variables (type L) will be used to update the LDA contents when the captured job is executed by OpCon. (Refer to the F15=View LDA screen for the DSPCAPJOB function, above, for details.)
- **F22=CHGJOB**: Branch to the screen f4ormat where job details may be changed. (The job parameter fields change from turquoise to yellow in this menu function when the fields are input capable.)
- **F23=DLTJOB**: Request to delete this individual captured job definition and all data pertaining to it in other LSAM master files.

---
sidebar_label: 'Operation of IBM i Automation'
---

# Operation of IBM i Automation

This document section provides a high level survey of concepts and of the steps required for OpCon to manage work in the IBM i operating system. It summarizes how to prepare jobs to run in the IBM i system and it also provides a guide for diagnosing job failures.

The OpCon server application controls work using schedules that are guided by calendars and other date and time parameters, as well as by job and resource dependencies. It also includes many capabilities for responding to events that are generated within the operating systems that it controls. However, this section of documentation is focused on the job start process as it applies to IBM i. The OpCon **Concepts** documentation provides in-depth information about all of the other OpCon capabilities that surround the task of starting jobs.

## The OpCon Job Start Process

Beyond the basic functions of an OpCon Schedule and all the control mechanisms in OpCon that govern when a job may be started, this document focuses on the elements that are unique to the IBM i operating system. It provides a check list of activities that must be completed in order to successfully execute IBM i jobs.

### Overview of Managing IBM i Jobs

The OpCon **Concepts** documentation provides illustrations and instructions for creating the job master records that can start jobs in the IBM i system. This summary of steps does not repeat OpCon documentation about how to build and execute schedules of jobs. Here are the critical steps that are required in order for an IBM i job to run:

1. The IBM i LSAM environment (defined by an IBM i library list, within a given IBM i partition) must be registered in an OpCon machine master record, using a machine name that matches the name entered in the IBM i LSAM Parameters (LSAM main menu, option 7). Only one copy of the Agent is required to automate an IBM i partition, however, it is allowed to have more than one copy of the Agent installed (in case there is only one IBM i partition and a test LSAM environment is desired).
2. The IBM i LSAM server jobs must be active when it is time for OpCon to connect and monitor jobs. This can be accomplished by using the LSAM sub-menu 6, option 1, and it can also be accomplished by any means that supports executing IBM i commands, using the LSAM command STRSMASYS (refer to [Commands and Utilities](../commands-utilities/commands.md)).
3. It is necessary to register all the IBM i user profiles who will be assigned to IBM i job master records. Follow the OpCon Concepts instructions for completing this task. These user profiles require permission to run jobs in the IBM i machine (they are granted authority to use the OpCon machine master record).
    - If the IBM i LSAM server job user profile SMANET does not retain its default *ALLOBJ authority, then it would also be necessary to grant SMANET the authority to *USE each of these same user profiles that will run IBM i jobs.
4. Create a job master record in an OpCon schedule. In addition to the standard OpCon schedule and job definition requirements, the following job parameters that are unique to IBM i jobs require special attention:
    - Select the job type of IBM i. The lower portion of the job master record will change to match IBM i job requirements.
    - Select the IBM i machine name where the job will execute.
    - When typing the Job Name, consider how the IBM i Agent uses the OpCon job name as it creates an IBM i job name. Older versions of the Agent required that the OpCon job name begin with an alphabetic character. However, since Agent version 04.00.03, PTF level 403299, the Agent will now accept any format from the OpCon job name, including starting the name with numeric digits (as some users like to add an expected start time at the start of a job name to control the sort order of the OpCon List display, such as: '12:34 Noon # 2 posting job'). The Agent removes any leading characters from the job name until an alphabetic character is found, it removes spaces and other invalid job name characters, it translates all alphabetic characters to upper case and then it truncates the name length to the maximum allowed by IBM i of ten characters. As a result, the example OpCon job name would become this IBM i job name: NOON2POSTI. SMA suggests a possible standard for IBM i job names that would include a full ten characters of the expected IBM i job name at the start of the OpCon job name, and then the remaining OpCon job name characters can include any form of description. For example: '12:34 GLNOONPOST Noon # 2 posting job' would result in the IBM i job name of: GLNOONPOST.
    - Use the IBM i drop-down list to select the IBM i Job Type value. For example, Batch Job is selected when the job will perform a simple program call.
    - Select a job user from the drop-down list of users authorized to this IBM i machine.
    - Specify the Job Description Name and Library.
    - Many of the other fields that can be used to refine the IBM i job definition will start with a default value of *JOBD. This means they will tell the IBM i LSAM to use whatever value is specified in the named Job Description. Therefore, the easiest way to prepare for automating IBM i jobs is to be familiar with, or to create, IBM i job descriptions that are appropriate for each application. Execution of IBM i LSAM utility commands can use the LSAM job description SMADTA/SMALSAJ00, but the job queue (previously labeled "batch queue" on the OpCon job master record) could be changed if the batch job should not run in the same subsystem as the IBM i LSAM server jobs.
    - Under the Job Information tab of the job master record, complete the Call Information box requirements. This box format will vary depending on the IBM i Job Type selected. For the simple Batch Job, type into the Call field either a library-qualified command or the CALL command and a program name that will be called. Include command or program parameters as necessary. The Configuration topic of this documentation provides information about additional, specialized command line parameters that are supported only by OpCon and the IBM i LSAM, in order to enable advanced automation features for a job.
    - Consider using the Variables tab to send data values from OpCon to the Agent, if they are needed by the command or program executed by this job. The name of an IBM i LSAM Dynamic Variable is typed into the Variable Name field, and in the Value field it is possible to type an absolute value or to insert an OpCon Property [[token]]. The key combination of CTRL + T opens a window that shows registered and system-defined OpCon Properties  which can be selected and inserted as the Value. Click the "Add" button on the right to add entries to the list of Variables. The Variables stored in this table are updated by the Agent before the job is actually submitted, which means that an LSAM Dynamic Variable {token} could be included in the Call command line, as well as making the Dynamic Variable value available anywhere else within the IBM i partition. Refer to the OpCon Concepts about Job Details of IBM i jobs for additional information about the special $\@KEYWORD variables that can be used to enhance the performance of File Arrival jobs. These $\@VARIABLES can be entered as the Variable name and the Value column is then used to set the command keyword value. $\@KEYWORD variables are supported for both the File Arrival Job Type, as well as for the LSAM's CHKFILE and CHKIFSFIL commands that can be used for a similar purpose from the Batch Job Job Type.
    - Save the OpCon job master record.
    - Assign an OpCon Frequency to the job. For test jobs, consider assigning a unique, new frequency to the job that uses the On Request option, and then select the current date as the On Request date. This is one way to enable a manual build of the test job without affecting any other job or schedule.
    - This completes basic job master definition.
5. Jobs that will be repeated on a regular schedule are typically built in advance by the OpCon job builder function, as daily schedules are created. For test purposes when the IBM i LSAM is first set up, it is possible to manually request an immediate build of a job, so that the job can be executed on demand.
6. After a job completes or fails, the IBM i LSAM will report a job status back to the OpCon server, and the status may be observed in a display of jobs within an OpCon schedule. In cases of failure, there is a difference between jobs that failed to start, versus jobs that failed during execution. The procedure for diagnosing job failures is discussed below, in a following section.
7. After a test job completes or fails, it is possible to restart the job from the OpCon display of the job status, using a right mouse click and selecting the Restart option from the context menu that appears. When necessary, to correct the cause of a failure, it is possible to make corrections to "daily" jobs that are on the active schedule and/or to the permanent job master record.

## Configuring the IBM i LSAM Automation Features

The IBM i Agent for OpCon includes many automation tools that are unique to the IBM i operating system. Some of these tools can be executed directly within IBM i batch jobs by OpCon, while other of the tools require pre-configuration using the LSAM menu system.

Tools that require pre-configuration include, for example, Operator Replay scripts. In this case, after script steps have been defined, the OpCon job master record is configured especially for the "Operator Replay" IBM i job type, and the script name is entered into the Script field (same location as the Call field) under the Call Information tab of the job master record.

Other IBM i Agent automation tools, such as the Message Management facility, operate autonomously. That is, they are configured to detect and respond to events or circumstances that arise within the IBM i system. When profiled (pre-configured) events are detected, the IBM i LSAM server jobs typically notify the OpCon server so that OpCon can provide and appropriate response. In some cases, as the IBM i Agent generates OpCon Event commands, this can cause new jobs and schedules to be built and executed. For this type of purpose, the event response jobs are predefined within the OpCon master files, but they are not built (in the daily schedule) or executed unless a signal is received from the IBM i LSAM.

Most of this **IBM i LSAM** documentation is devoted to instructions for configuring the Agent-specific automation tools. When choosing a strategy for configuring these tools, remember that although the IBM i Agent tools are able to conduct many activities autonomously, it is usually the best strategy to engage the central OpCon server in any event response. By this means, the OpCon server is able to maintain a more complete history of the IBM i system activity, and it often provides more powerful and comprehensive response mechanisms than are available within the IBM i environment itself.

## Guide to Job Failure Diagnosis

The procedure for diagnosing the cause of failure varies depending on whether a job failed to be started or it failed during execution after it started.

Failing to start is a type of problem that usually occurs only during the early days of using the OpCon product and the IBM i Agent, when the user is not yet familiar with all the aspects of job automation. Common causes of this type of failure include missing authorities that must be granted within the IBM i system. Jobs that fail to start will not have an IBM i job log report, so other means must be employed to research the problem. The procedures and tools in this section will help the user to quickly identify and correct the cause of the failure.

When a job has started, but it then fails during execution, the IBM i Agent will normally report details about the failure to OpCon, and the OpCon job icon (in any of the various OpCon daily schedule views) typically shows IBM i message IDs that identify the type of failure. Often there is a message ID generated by the IBM i LSAM, followed by another message ID that the LSAM was able to retrieve from IBM i information about the job failure. This section provides instructions for convenient ways to obtain more information about the cause of the job failure. In many cases it is possible to obtain accurate information directly from the OpCon User Interface user interface.

### OpCon Tools Explaining Job Failures

These are the OpCon tools that provide a convenient starting point for diagnosing job failures. Using these tools, the user may quickly identify which type of failure has occurred (failed to start, or failed during execution). In the case of failure during execution, these tools often provide all the information that is necessary to accurately identify the cause of the failure.

OpCon Job Completion Codes

From any view of an OpCon schedule, jobs that have failed are presented with a unique color code. The default would be red, but users may define their own color codes.

Jobs that failed in the IBM i system will show one or two IBM i message IDs. The first message ID will have the format of SMA0000, where the zeros will be some unique number that may help identify the general category of the failure. Most of these message IDs are defined in a table of common failure codes included in Machine Messages of this documentation. However, if the table and/or user experience does not make the meaning of the message ID clear, more information may be available from the IBM i message secondary (or Help) text. To view the secondary message text, execute this IBM i command:

```
DSPMSGD SMA0000 SMADTA/SMAMSGF
```
(where the 0000 is replaced by an actual message ID number).

The second message ID that is frequently appended to the OpCon job completion code is an IBM i system message that the IBM i Agent has been able to retrieve from information about the job failure. Its format would typically be CPF0000, where the zeros are replaced by some digits and/or characters (A-E). Since these message may vary widely, detailed information about the messages can be obtained first by viewing the primary message text that is stored in the OpCon Job Detailed Information (refer to next topic), and then, if necessary, by viewing the secondary message text using the IBM i DSPMSGD command (as above, except that the message file is usually QSYS/QCPFMSG).

Before connecting to an IBM i console to view message details, problems may be solved by using the following additional tools that are available from the OpCon User Interface user interface.

### OpCon Job Detailed Information

The IBM i Agent always tries to obtain and send up to the OpCon server the primary text that explains each message code appearing in the short job completion message code. To find this information, use a right mouse click on the OpCon daily job icon to launch the daily job context menu. Select "Job Information" from the top of the context menu, using a left mouse click. A new Job Information window will appear.

In the Job Information window, left mouse click on the tab on the far right side, near the middle of that side, labeled "Configuration." This causes the lower half of the display to change, showing another range of information tabs. The default display shows the "Operations Related Information" tab. Under this tab there is a column labeled "Description," and in that column the lower entry is called "Detailed Job Messages." If the Value to the right shows a number greater than zero, there are message details that can be viewed. In that case, left mouse click on the plus (+) sign to reveal a list of messages.

The text that shows (when available) is the IBM i primary message text. The IBM i LSAM may have retrieved this message text from the IBM i message file, and therefore it will often not contain replacement values for any variables included in the message text. But the description of the message ID is usually very helpful.

For jobs that did start, but failed during execution, more information about the failure messages is usually available from the IBM i job log report, which can be accessed directly from theUser Interfaceuser interface using the following procedure.

### OpCon View Job Output Tool

OpCon supports direct access to the job log of IBM i jobs, from theUser Interfaceuser interface. To see a job log report, use a right mouse click on the OpCon daily job icon to launch the daily job context menu. Select "View Job Output" from the context menu, using a left mouse click. A new window will appear, but it will not show any information for one or more seconds because it is waiting for the IBM i Agent to fetch control information about the job log report.

The IBM i Agent supports access to the job log of active jobs, as well as to the job log report (spool file) for completed jobs...if the job was configured to produce a job log report.

After the job output list window displays a line of control information, it will become apparent if there is job log information available for a job. When it appears that there is job log information, use a double click on the left mouse button to request a view of the job log report. This will cause a second new window to open, and again there will be a brief pause while OpCon waits for the IBM i Agent to fetch the actual job log information.

When the job is in a job queue or still active, the job log report will be incomplete, although it will reflect all job activity up to the point where the Agent requested the report. Information from an active job would be very useful if OpCon shows that the job is stuck, for example, displaying the characters "MSGW", which means the job is stuck in a Message Wait status. This usually means that an error has occurred, and that the job has sent a message to the IBM i system operator message queue or to a user message queue, requiring a reply before the job can continue or end in a failed status.

The level of detail that appears in job logs depends on the log level controls that were defined for the job, usually in the IBM i job description. It is possible to use the OpCon job master record for IBM i jobs to change the settings that control the job logging level. These job definition fields are under the second tab (from the left) in the IBM i specific job master information.

The notepad-style view of the IBM i job log can be scanned for key characters. Usually the job completion codes, or intermediate job status code, would be used as the search argument. If the IBM i message ID is found in the job log, the log report would typically provide more detailed information about the message itself. It is also important to examine messages that appear in the job log report just before (above) the final status message ID, because IBM i often logs additional information about errors by sending multiple messages to the log.

### IBM i LSAM Tools to Diagnose Job Failures

This discussion explains the steps that may be taken to locate IBM i message information that will explain errors occurring in IBM i jobs. Sometimes these tools can provide additional information that helps to explain the failure of a job that was executing, but normally the OpCon tools above lead to a correct diagnosis of the cause for active jobs failing. Therefore, this series of diagnostic steps is most appropriate for discovering the reason that OpCon was not able to start a job.

Unless experience leads the user more directly to a source of information, the following steps should be followed in the sequence presented, in order to identify the reason why a job could not be started.

When a job could not be started, the OpCon diagnostic tools above can be consulted, but they will usually not provide enough information to explain the exact cause of failure to start. Also, there will not be any IBM i job log report for a job that was not started.

### IBM i LSAM Logging Options

In order to use the following procedures, it is necessary to have activated the IBM i LSAM logging features. As of this version of the documentation, new installations of the LSAM software will have the normal logging features turned on by default. However, prior installations had different default settings, and any LSAM client may have chosen to turn off LSAM logging.

Instructions for using the LSAM logging controls are found in Log File and Database Management of this documentation.

When starting LSAM logging, be sure to avoid activating any of the "trace logging". Trace logging generates a large volume of log file entries, and it is used only by SMA Support technical staff to diagnose certain very rare problems.

The normal LSAM server job logging functions can be started (or stopped) while the LSAM server jobs are active. If the logging was not active while an error occurred, it may be necessary to turn on the logging and then repeat the job start action that generated the error in order to trap the error information in the LSAM log files. However, the LSAM server IBM i job logs are not controlled by the LSAM's own debug/audit logging feature.

### The Submitted Job Universal Log

The IBM i Agent always logs information about each job start request that it receives from OpCon into a file named LSALOGF30. The LSAM menu system provides a log viewer that makes it easy to find and open this file for viewing. 

Over time, this LSAM log file has become a general-purpose log file.  It retains its ability to associate log entries with each job that OpCon submits to the Agent. The various IBM i Agent automation toolkit features each have their own activity logs, but some of the Agent's features, such as the Dynamic Variables, are supported across most of the Agent features, so these types of log entries are now gathered within the LSALOGF30 file.

The LSAM Submit Job Log viewer program is now an Agent-standard list display.  This type of display supports sorting of log entries and subsetting the list in various ways to make it easier to discover the log information that is needed to diagnose errors for a specific IBM i job or for a specific Agent automation tool.

The many different Type codes assigned to the log entries can be used to subset the list display so that it shows, for example, only log entries resulting from LSAM Dynamic Variable {TOKEN} replacement values or errors that occurred during an attempt to replace a token.  The subsetting tool also makes it possible to isolate the list view to only log entries associated with just one IBM i job at a time.  Since log entries are displayed in time sequence, it is easy to understand the order of events that might define the cause of an error condition.

If there is any error during the actual process of submitting a job, the LSAM will retrieve the failure message and add an error entry to this log file just under the SBMJOB command image. Unfortunately, the final failure message that IBM i reports to the LSAM server job is often only a conclusion, and it does not provide enough detail to understand the true cause of the error. However, in this case, the next step: [The LSAM Job Scheduler's Job Log](#the-lsam-job-schedulers-job-log) will reveal that actual cause of failure.

#### LSALOGR1 - Display LSAM Submitted Job Log Entries

##### Menu Pathways

Main Menu > LSAM Management (#6) > Display LSAMsubmit job log (CALL LSALOGR31) (#4)

##### Options

- **5=Display**: View the details of a log entry

##### Fields
- **Search content**: Type in a value that can be found anywhere in the record represented by each line on the list. The entire record will be searched, not just the fields displayed in the list. Use option 5=Display to see the matching detail that satisfied the search when the cursor appears in the Opt field next to a line on the display. The <**Enter**> key or <**F16**> may be used to start a search, and <**F16**> is used to continue the search from the last record found.
- **Opt**:  Type a supported option next to one or more log entries, then presse <**Enter**> to view each selected record's details, one after another.
- **Log Date**: The date (month/day/year) when the log entry was recorded in the database.
- **Log Time**: The time (hours:minutes:seconds) when the log entry was recorded in the database.
- **Typ**: The log entry Type code (from a set of values that are unique to this log file).

:::info
The next LSAM version 21.1 introduces an advanced version of this log file and the details displays include interpretations of the log entry Type codes.  See the description of the Select/Omit by Type window (LSALOGW1) below for examples of the entry Type codes.
:::
- **Log entry text**: The first several characters of each log entry appear in the list display.  To see the entire text of each log entry, press <**F10=Fold/Unfold**> to change the list display so that entire log text is visible, or use option 5=Display to view a single log entry and its entire text in the Entry Details display.

#### Functions

- **F3=Exit**: Quits the list display and returns to the menu.
- **F5=Refresh**: Reload the list display with data from the master file.
- **F10=Fold/Unfold**: Changes the list display to/from showing multiple lines as necessary for each log entry to reveal the entire text of the entry.
- **F12=Cancel**: Quits the list display and returns to the menu.
- **F15=Sel/Omit**: Presents a window used to filter log entries to only specified Types.
- **F16=Search next**: Press to start a new search based on the value entered in the Search input field, or to continue a search from the last record found.
- **F17=Top**: Causes the list to display from the first record.
- **F18=Bottom**: Causes the list to display the last record in the file.
- **F21=DSPPFM(@RRN)**: Branch to a display of the IBM i DSPPFM (display physical file member) which shows the unformatted data in the log file.
- **F24=MoreKeys**: Rotates the list in the function key legend.

#### LSALOGW1 - Select/Omit by TYP

Choose to either select or omit up to six Type codes and refresh the list.  To cancel this subsetting function, use F15 to return to this window and change the Select/Omit code field to blank, then press <**Enter**>.

:::info
The next LSAM version 21.1 introduces an advanced version of this log file and this window will show a summary of all unique codes currently stored in the file.  Until the upgrade from 18.1 to 21.1, it is necessary to study the list display to discover which Type codes are useful for Select/Omit.
:::

##### Menu Pathways

Main Menu > LSAM Management (#6) > Display LSAMsubmit job log (CALL LSALOGR31) (#4) > option 5

##### Fields
- **Select/Omit function code**: Type "S" or "O" or blank into the one-character field at the top of the window to control the list subset mode.
- **TYP**: Enter one to six log entry Type codes to choose or omit log entries that have these Type codes.

#### Functions
- **F12=Cancel**: Returns to the list display without changing the subset rule.
- **Enter**: Press <**Enter**> to implement a new subset rule, or to cancel subsetting when the function code has been set to blank.

#### LSALOGR5 - Display LSAM Submitted Job Log Entry

##### Menu Pathways

Main Menu > LSAM Management (#6) > Display LSAMsubmit job log (CALL LSALOGR31) (#4) > option 5

##### Fields
- **File position**:  Shows the relative record number of the log entry in the physical file. This could be useful for positioning the display when using F21=DSPPFM from the list display.
- **Log Date, Time**: The date (month/day/year) and time (hours:minutes:seconds) when the log entry was recorded in the database.
- **Log entry type**: The log entry Type code (from a set of values that are unique to this log file).
    :::info
    The next LSAM version 21.1 introduces an advanced version of this log file and the details displays include interpretations of the log entry Type codes.  See the description of the Select/Omit by Type window (LSALOGW1) below for examples of the entry Type codes.
    :::
- **Log entry text**: The entire text of the log entry.

#### Functions

- **F3=Exit**: Quits the list display and returns to the menu.
- **F12=Cancel**: Returns to the list display.
- **F21=DSPPFM(@RRN)**: Branch to a display of the IBM i DSPPFM (display physical file member) which shows the unformatted data in the log file.

### The LSAM Job Scheduler's Job Log

Detailed messages that may be generated when the IBM i LSAM tries to submit a job for OpCon will be recorded in the active job log of the LSAM server job named TXMMNG. In some cases, clients may have changed the LSAM server job description (SMADTA/SMALSAJ00) in order to reduce job log entries for these server jobs, but the default setting for the job log level would normally allow error messages to appear in the server job's job log.

To view the active job log of the LSAM job scheduler server job, enter the LSAM menu system and choose sub-menu 6: LSAM Management. Select menu option 3: Check LSAM status. This option will display the IBM i list of jobs that are active in the LSAM subsystem (default name SMASBS). Look for the job named TXMMNG and type option 5 next to that job, then press Enter to see the IBM i Work with Job menu for that job.

From the Work with Job menu, select option 10 to view the active job log. When the job log list display appears, press F10=Detailed messages to reveal all the message detail in the job log. Then press F18=Bottom to jump down to the most recent entries in the job log. It may be necessary to use the Page Up function key in order to find information about the job being researched, especially if the LSAM is very active.

When an OpCon job for IBM i has failed to start, the details about what caused the failure usually appear in one or more messages within the active job log of the IBM i LSAM server job TXMMNG. For example, during early days of using the OpCon product, it is common that some user profile does not have authority to use certain IBM i objects required for the job to run. Another common error is that the library list of the job is incorrect, so that the program to be called will not be found. These are the kinds of detail that will be revealed in the TXMMNG job log, and once the error is identified it is very easy to fix the problem and restart the failed job from the OpCon User Interface user interface.

### The IBM i LSAM Job Scheduling Communications Log

Despite the effectiveness of the steps above in identifying errors, there are rare cases when the true cause of the error is not a problem with user configuration of an OpCon job master, but instead some problem might be occurring in the communication between the OpCon SAM (schedule activity monitor) and the IBM i LSAM.

For example, in non-U.S. client sites, some clients have discovered that the local language character sets chosen for these two machines are not being properly translated between the ASCII character set assigned to the OpCon Windows server, and/or to the EBCDIC character set assigned to the IBM i server. Character set translation is controlled by options set in the IBM i LSAM Parameters Configuration, which is option 7 on the main LSAM menu. This type of error can only be diagnosed by viewing the hexadecimal content of records exchanged between the two servers, and that is information that is provided by the LSAM Job Scheduling Communications Log. (Note: It is not necessary to use the high-volume "trace logging" function to obtain this information from the Communications log.)

To view the Job Scheduling Communications log, enter the LSAM menu system and select option 6: LSAM Management. Choose option 5: View LSAM logs. From the list of log viewers, select viewer 1: Display Job Sched communications trace log.

This log file viewer presents a list display that is supported by function keys and data entry fields that can be used to position the viewer window, and/or to search for records that apply to the job name being researched. For example, using F24=More keys reveals the function keys used to move to the top or bottom of the display, and to change the viewer window to the right or left of long records. Function keys F10 and F11 can be used to change the record view mode to hexadecimal format, which may be necessary when researching problems with character set translation. The search field at the top right of the display can be used to type in the job name, for example, and the F16=Search is used to find log entries that match the search value.

Option 5=Display will branch to a detailed display of each log entry selected. The detailed log information display is usually supported by extensive formatting and label or code translations. This makes it much easier to understand the contents of a log entry, rather than trying to interpret the log data from the raw list display.

### Contact SMA Support

When the OpCon and IBM i LSAM procedures above do not reveal the cause of job errors, clients are encouraged to contact the Support team at SMA for assistance. SMA can connect clients with experts in OpCon software and in the IBM i operating system in order to help with the diagnosis.
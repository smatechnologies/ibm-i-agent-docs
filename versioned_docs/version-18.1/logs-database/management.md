---
sidebar_label: 'Manage LSAM Logging'
---

# Manage LSAM Logging

The IBM i LSAM supports active control over its logging capabilities. In general, logging is a local function that is not part of LSAM communications with OpCon, but instead it is a tool that is useful to system administrators, programmers, and support technicians... as well as for providing proof of automation to auditors. The IBM i LSAM has the ability to log transaction management events at virtually every point in the input/output flow of its communications process. Each of these logging capabilities can be controlled separately. Use the logging control functions to:

- Request that the system start logging a function immediately.
- Request that the system start logging a function at the next new start of the function.
- Choose to log the internal transactions that the IBM i LSAM generates, and/or all the input and output activity of the IBM i LSAM sockets communications program.
- Engage a secondary level of highly detailed trace logging, on a limited basis, to debug complex problems. (CAUTION: Do not use "trace logging" unless requested by SMA Support, to avoid excess disk utilization and possible impacts on system performance.)

The setting of log controls by the start and end commands is "sticky." This means that after logging is set on it remains on even after the IBM i LSAM functions have been stopped and restarted. The same is true for ending logging. Once logging has been ended for a function, it does not start again until the start command is used, even if the programs doing the logging are stopped and restarted.

## Manage LSAM Server Logging

Managing LSAM logging starts with a Server Logging status display from which function keys are used to implement the Start or End requests that are typed into the Option fields. The function key <**F2**> is used to toggle between the LSAM server job logging functions and a separate display format where other LSAM utility logging options are gathered into a single management display.

### MNGLOGR1 - Manage LSAM Server Logging

#### Menu Pathways

Main Menu > LSAM management menu (#6) > option 4

#### Fields

- **Opt**: Type an option next to any/all of the lines, then press Enter to register the request under the Pending column, or press <**F7**> and/or <**F8**> to implement the actions immediately.  
  - VALUES: 1 = Start, 4 = End.
- **LSAM server/function**: The name of the LSAM server job or other LSAM feature that supports Debug/Audit logging.
- **CTL STS**: Control Status: This column shows the current settings that are stored in the LSAM Parameters control file.
  - VALUES: Yes, No.
  - This status does not reflect whether the LSAM server jobs are  active or stopped. It is possible that the control file settings do not match the current live job logging status, if new control values were stored using <**F14**> from this display. In that case, stopping and restarting the LSAM server jobs would be necessary to assure that the current Control Status reflects the actual status of logging in the active LSAM server jobs. This Control Status does indicate how the LSAM server jobs will handle logging the next time they are started.
- **Pending**: When the Enter key is pressed after one or more options are typed next to the list lines, the Option value that was typed is reflected in the Pending column.
  - VALUES: Start, End.
  - Pressing Enter does not cause any change to the LSAM Parameters control file or to any active LSAM server jobs. The Pending column is a good way to edit the planned logging changes before they are implemented, either by pressing <**F7**> or <**F8**> to cause an immediate change to the active LSAM server jobs (and to store  the new values in the LSAM Parameters control file), or by pressing F14 to only store the values in the LSAM Parameter  control for later reference the next time that the LSAM server jobs are restarted.

#### Options

- **1=Start**: Mark a logging function for starting.
- **4=End**: Mark a logging function for ending.

#### Function

- **F2=Manage Utility logging**: Branch to display format R6 to manage logging of other LSAM features and utilities.
- **F3=Exit**: Returns to the LSAM menu system.
- **F5=Refresh**: Re-reads the LSAM controls to display the current status and resets all Options and Pending fields.
- **F7=STRSMALOG**: Executes the pending Start requests by storing the values in the LSAM control file and then signaling the LSAM server jobs to start logging immediately. (Can also be used to execute all values of 1=Start in the Options field, without pressing Enter first. If LSAM server jobs are inactive, new settings will take effect with the jobs are restarted.)
- **F8=ENDSMALOG**: Executes the pending End requests by storing the values in the LSAM control file and then signaling the LSAM server jobs to stop logging immediately. (Can also be used to execute all values of 4=End in the Options field, without pressing Enter first. If LSAM server jobs are inactive, new settings will take effect with the jobs are restarted.)
- **F9=View server logs**: Branch to the LSAM list of log viewer programs.
- **F12=Cancel**: Returns to the LSAM menu system.
- **F14=Save pending**: Stores all Start and End requests that appear in the Pending column into the LSAM control file, but does not change the current logging action of any active LSAM server jobs. (New settings will take effect the next time that the LSAM server jobs are restarted.)
- **F15=Extract files**: Branches to the display format that imitates  a prompted SMASUP command, where an extract of log and/or master files may be requested.

## Manage LSAM Utility Logging

Pressing <**F2**> from the initial LSAM logging management display causes the maintenance program to switch to a different display where the debug/audit logging for LSAM utility features can be managed. These LSAM utility logging options are also each managed when selecting option 7 (in most cases) from the sub-menu where each LSAM feature is managed. The effect of maintenance is the same from those locations as from this summary display.
 
### MNGLOGR6 - Manage LSAM Utility Logging

#### Menu Pathways

Main Menu > LSAM management menu (#6) > Option 4 >F2=Manage Utility Logging

#### Options

This summary screen shows the options for each control field to the right, in the blue prompting text. There is also a column of pink values under the "Dft" heading that shows the setting that SMA recommends for normal operations.

#### Fields

- **Value input field**: Type one of the control values that is shown in blue to the right of each input field, then press Enter to store that new value in the LSAM Parameters control file.
- **DFT (default)**: The default value is displayed as the typical standard setting that SMA recommends. This helps to avoid setting on a "trace logging" function by accident.

#### Functions

- **F2=Manage Server logging**: Branch back to display format R1 to manage logging of the LSAM server jobs.
- **F3=Exit**: Returns to the LSAM menu system.
- **F5=Refresh**: Re-reads the LSAM controls to display the current status and resets all Options and Pending fields.
- **F12=Cancel**: Returns to the LSAM menu system.
- **F15=Extract files**: Branches to the display format that imitates a prompted SMASUP command, where an extract of log and/or master files may be requested.

## Viewing the LSAM Log Files

Many of the LSAM log viewer programs may be accessed from a sub-menu that can be accessed from the Manage LSAM Logging function using function key <**F9**> or from the LSAM Menu (#6, option 5.

### MNGLOGR2 - View LSAM Logs

#### Menu Pathways

- Main Menu > LSAM management menu (#6) > Manage LSAM logging (#4) >F9
- From command entry, using the LSAM environment library list, enter any one of the commands that appears on the View logs sub-menu.

#### Fields

Type a number (1 -- 14) into the Selection entry field and press <**Enter**> to execute the selected viewer.


| Field           | Default (Valid Values)       | Description                     |
| -------         | ------------                 | ------------------              |
| Selection entry | none (1 - 14) | Type the number of the view function to use into this field. Press <**Enter**> to start the viewer.               |

#### Options

Most of the individual log viewers are not documented in this documentation. These viewers are tools meant for use by support and technical personnel. The technical construction and operation of the LSAM software must be understood in order for these log views to be useful. When the system is well understood, the log viewer instructions are obvious, and in most cases they offer well-labeled formatting of each type of transaction that may appear in the detail display of a given log entry.

For more information about the log files displayed by each viewer utility, refer to the [Viewing the LSAM Log Files](../logs-database/management.md#viewing-the-lsam-log-files)  display. There is a helpful flow chart that shows the location of many log files in the overall LSAM transaction management process. Refer to [Strategic Location of Log Files](../logs-database/locations.md#strategic-location-of-log-files).

#### Functions

- **F3=Exit**: Abandons the Manage LSAM logging function and returns to the menu.
- **F12=Cancel**: Returns to the Manage LSAM Logging status display.
- **F15=Extract log files**: Used to deliver log file content to SMA Support. Refer to explanation, below.

## Display Spool File Management Control File (LSAJORCTL)

The spool file management control file stores information about spool files that have been copied. It is possible to use function keys from the detail display of certain control file records to examine the job that controls the copy of the spool file and also to view the copied spool file itself.

### JORCTLR1 - Spool File Management Control

The list is created by two functions of the LSAM servers. The LSAM job scheduling server records a record for each spool file management entry received from OpCon. Immediately afterward, the LSAM spool file management server may update these records when a spool file must be copied to a new user or output queue. The spool file management server will also add new records to the list whenever a record of type *ALL requires that a spool file be copied. The new record will show the name
of each spool file that is copied and then also show the job and spool file number of the copy that was created.

An example of the spool file control record detail, corresponding to the line above where option 5 has been entered, is illustrated in the screen below. Notice that the selected line is one of a group of spool files corresponding to the original IBM i job name 126957/USER01/JOBQA01. There is also a column of data labeled LR(# which is the log record number. This number helps to identify multiple actions that were performed on the same spool file, in this case a file named QPRTLIBL. There are three entries for file QPRTLIBL associated with this job. Each control record explains whether the original spool file was updated in place or whether it was copied to a new user or new output queue.

In this example, the third record (LR(# 003) was actually created in response to one of the *ALL control records (this is not obvious in the list, but the details of all the records would make this apparent). The detail display (option 5) can be used to analyze the actions taken for each spool file entry. This detailed information can be compared to the original configuration of the OpCon job in order to evaluate how the LSAM responded to the OpCon spool file management instructions.

The display of entry details is also helpful for finding any spool file copies. Copied spool files do not belong to the original job that produced them. Rather, IBM i assigns copied spool files to a special system job called QPRTJOB. There is a separate instance (separate IBM i job number) of the QPRTJOB job for each IBM i user profile that has ever had a spool file copy made. The QPRTJOB job number persists, even though it is not an actual active job; the job name, user and number are used
over and over each time a new copy is made of an existing spool file.

### JORCTLR2 - Spool File Management Log Detail

The screen shows the detail of a spool file management control record, with added run-time information, converting this record into an activity log record. When the two Target fields near the bottom of the display show any data, this is an indication that the spool file has been copied to a new user or a new output queue. The Target job ID shows the target user name, not the name of the original Job user (displayed near the top of this screen). There is also a Target spool file number that may be
used to find the actual copy of the spool file within the target job. This task is made easier by the function keys explained below.

#### Functions

- **F8=Work orig job**: Shows an IBM i WRKJOB menu for the job that created the original spool file. On the WRKJOB menu, option 4 can be used to list and view all the spool files that were created by the original job, including the spool file represented by the log record on this detail display.
- **F9=Work QPRTJOB**: Shows an IBM i WRKJOB menu for the Target job ID listed on the detail display.
- **F10=View new SPLF**: Identical to using option 4 from the WRKJOB menu of the Target job ID, this function key provides convenient direct access to the contents of the copied spool file. Viewing spool files with the IBM IBM i spool file viewer does not show all the formatting that would appear on an actually printed report. Most  notably, blank lines are omitted from the interactive viewer.
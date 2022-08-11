---
sidebar_label: 'Events and Utilities Menu'
---

# Events and Utilities Menu

:::tip
Before OpCon event commands can be sent, a user id and password must be defined. Please refer to the section below describing the External Event Password.
:::

## Events and Utilities Menu

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------

```
  SYSTEMNAME                  EVENTS AND UTILITIES MENU                   00/00/00
  USERNAME                                                                17:08:19

   Select one of the following:

     1. Event Management
     2. External Event Password
     3. Work with SCANSPLF Applications
     4. Work with SPLF Scan Rules
     5. Work with Captured Data Response Rules
     6. Maintain dynamic variables
     7. LSAM Utility configuration
     8. Display captured data log
     9. Display data capture debug log
    10. Data Export/Import Utilities menu
    11. Client eMail Management menu

  Selection or command
   ===>________________________________________________________________________
   _____________________________________________________________________________
   F3=Exit   F4=Prompt   F9=Retrieve   F12=Cancel
   F13=Information Assistant   F16=System main menu
```

### Menu Pathways

Main Menu > Events and Utilities (#3)

### Fields

Select or command

### Options

- 1=Event Management
- 2=External Event Password
- 3=Work with SCANSPLF Applications
- 4=Work with SPLF Scan Rules
- 5=Work with Captured Data Response Rules
- 6=Maintain dynamic variables (this is documented in [Dynamic Variables](../dynamic-variables/overview.md))
- 7=LSAM Utility configuration (this is documented next in this section)
- 8=Display captured data log
- 9=Display data capture debug log
- 10=Data Export/Import Utilities menu (this is documented in [Copy Files from Test to Production](../reference/copying-files.md))
- 11=Client eMail Management menu

Most of the options displayed on this menu are explained in the following sections of this document. Type an option number in the Selection or command line and press <**Enter**> to begin using any of the options.

### Functions

- **F3=Exit**: Returns to the master menu.
- **F4=Prompt**: Prompts for keywords for any command entered in the Select or command line.
- **F9=Retrieve**: Retrieves the previous command that was entered on the Select or the command line. If it is pressed multiple times, the system goes further and further back to previous commands.
- **F12=Cancel**: Returns to the master menu.
- **F13=Information Assistant**: Branches to the IBM i general help screen.
- **F16=System main menu**: This is always shown on any system-generated menu screen. It branches to the general command entry menu for IBM i. Return to the previous menu by pressing <**F3**> or <**F12**>. This function is not commonly used and can be restricted for certain user profiles.

## LSAM Utility Configuration

Use the following procedure to choose options for the behavior of certain LSAM utilities.

### Update the LSAM Utility options control parameters

1. In the command line, enter **SMAGPL/STRSMA or LSAMENU**. For more information on STRSMA and LSAMENU command parameters, refer to the [STRSMA Command](../operations/lsam.md#the-strsma-command) and [The LSAMENU Command](../operations/lsam.md#the-lsamenu-command).
2. Enter **3** to choose the **Events and Utilities menu** in the SMA Main Menu.
3. Enter **7** to choose **LSAM Utility configuration** in the Events and Utilities Menu.
4. Type desired configuration option(s) in the LSAM Utilities Configuration screen.
5. Press <**Enter**> to update the LSAM Parameters control record(s).

#### LSAM Utilities Configuration Screens

- **Screen Title**: LSAM Utilities Configuration
- **Screen ID**: LSAUTLD301

##### Menu Pathways

Main Menu \> Events and Utilities (#3) \> LSAM Utilities configuration (#7)

##### Fields


| Field                      | Default  | Description                |
| -----                      | -------  | -----------                |
| Capture data audit logging | N        | Y=yes, N=no. This flag controls the detailed logging feature that can be viewed using LSAM menus 2, 3 or 4: option 9. The log will contain entries about any data capture action and also about captured data response rules. This logging capability is the only way to record exactly what happens when Captured Data Response Rules are executed, so it can be used as a means of auditing the response commands that are executed.          |
|                            |          | SMA recommends setting this field to Y=yes, especially when new data capture and captured data response rules are being used for the first time. Data capture is always performed by the SCANSPLF utility, and it may also be performed by Message Management or during Operator Replay script execution. |
| Use aggressive FTP job failure?  | Y        | Y = Yes: Report an FTP job failed if the FTP log file does not contain a message # 226 indicating that the job completed normally. |
|                            |          | N = No: Some systems or FTP job connections might not produce a 226 message, even though the file transfer completed normally. For these systems, set this control field to N = No to allow the Agent to report a successful job completion unless the FTP job log file contains a recognized failure message.       |
| Scan Rule maint fmt 1- or 2-page | 2        | Control how the function that maintains Scan Rules will display all the  available fields:          |
|                            |          | 1 = The original display format tried to include all the Scan Rule fields on one display page. This makes it easy to see the whole Rule at once, but the screen was too busy and was hard to read.      |
|                            |          | 2 = The new display format shows the most critical and commonly used Scan Rule fields on page 1, and then displays the remaining, optional fields on page 2 (after pressing the Enter key).            |
| Job log msgs @ post-job SCANSPLF | 0 (zero) | The SCANSPLF command supports a JOBLOGMSG parameter that tells the command to send progress and error messages to the IBM i Job Log for the job where the command is executing.                 |
|                            |          | This control file value forces the JOBLOGMSG to the desired logging option when the SCANSPLF command  has been appended to the OpCon Job Master: Call (command or program) line. This special purpose use for the SCANSPLF command (as described in "Extended Discussion of Parameters" under Chapter 3: IBM I LSAM Configuration) would usually not need to add a large number of IBM i Job Log messages to the single IBM i LSAM Server Job that processes all of these special-request executions of SCANSPLF.               |
|                            |          | Sending the SCANSPLF progress and error messages to the IBM i Job Log can be useful for debugging unexpected behavior of the SCANSPLF command. |
|                            |          | VALUES: Y or 1 = Yes, do send LSAM log messages also to the IBM i Job Log of the LSAM Server job. N or 0 (zero) = No, do not copy the LSAM log messages  to the IBM i Job Log.      |
| Dynamic variable start character   | C0       | The IBM i internal EBCDIC character, in hexadecimal format, that marks the start of a Dynamic Variable token.|
|                            |          | The first field is the data entry field where a new value can be typed. However, please note the CAUTION text near the top of this display!|
|                            |          | To the right of the data entry fields are (1) the current value stored in the master file, and (2) the IBM i 5250 screen character that can be typed and will display when the current value is being used.|
| Dynamic variable end character      | D0       | The IBM i internal EBCDIC character, in hexadecimal format, that marks the end of a Dynamic Variable token.   |
|                                     |          | Also refer to also notes for the Start Character, above. |
| | | |
| **OpCon File Arrival $@Variables** | |The File Arrival parm ID characters are used to replace the default $@ characters.  Refer to the description below this table for more information about these two fields. |
| | | |
| File Arrival parm ID character 1      | 5B  | Hexadecimal value X'5B' represents the US dollar sign ($). Type a pair of characters that are the hexadecimal value of a different special character to be used by the local IBM i site. |
| File Arrival parm ID character 2      | 7C | Hexadecimal value X'7C' represents an "at sign" (@). Type a pair of characters that are the hexadecimal value of a different special character to be used by the local IBM i site. |
|                            |          | **NOTE**: Some non-English sites have discovered that their IBM i workstation keyboards can use a US dollar sign (X’5B’) also for this character 2 value, so that a KEYWORD variable name example would be: $$RECHKFREQ |
| DynVar external start      | 4A       | The EBCDIC character, in hexadecimal format, that will result when an external ASCII machine, such as a Windows PC, has typed the Dynamic Variable token start character (e.g., { ), but then that value is translated from ASCII to EBCDIC as the transaction data arrives at the IBM i LSAM data communications program. This value will be replaced by the IBM i internal EBCDIC Dynamic Variable start character that is identified in the previous pair of control values. |
|                            |          | **Note**: The external start/end characters usually only need attention in non-U.S. environments. Please contact SMA Technologies Support for assistance in case Dynamic Variable tokens used in OpCon job master records for IBM i jobs are not working correctly.  |
| DynVar external end character       | 5A       | The EBCDIC character, in hexadecimal format, that marks a the end of a Dynamic Variable token | 
|                                     |          | Also refer to notes for the External Start Character, above. |  

**OpCon File Arrival $@Variables**

The IBM i File Arrival job sub-type, set in an OpCon Job Master record, can support more LSAM command options than appear in the Job Master record maintenance panel. These are job options that are not the same as, for example, the Windows (MSLSAM) version of File Arrival jobs.

For the command parameters of either the CHKFILE or the CHKIFSFIL commands, used by the IBM i LSAM to process File Arrival jobs, these additional command KEYWORDS can be set by adding entries to the OpCon Job Master: Variables tab.

For each command keyword, add the following two special characters in front of the keyword name, telling the LSAM Job Scheduler to add these KEYWORDS to the CHKFILE or CHKIFSFIL command line that the LSAM builds for a File Arrival job.

For example, the keywords CRTREFDATE, JOBENDTIME and RECHKFREQ are often useful, and they would be set by adding the following special variable names to the OpCon Job Master: Variables table:

 - ``` $@CRTREFDATE, $@JOBENDTIME, $@RECHKFREQ ```

However, the special characters $ and @ are not always well supported by IBM i partitions that do not use the CCSID(37) = English EBCDIC character set. For non-English IBM i partitions, use the following two control values to specify which two characters should be used to signal the LSAM that these are command line KEYWORDS and not regular LSAM Dynamic Variable settings.



##### Functions

**F12=Cancel**: Quits the maintenance function and returns to the Events and Utilities menu.
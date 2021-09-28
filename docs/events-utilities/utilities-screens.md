# Utilities Screens and Windows

## LSAM Utilities Configuration

-   **Screen Title**: LSAM Utilities Configuration
-   **Screen ID**: LSAUTLD301

##### Menu Pathways

Main Menu \> Events and Utilities (\#3) \> LSAM Utilities configuration
(\#7)

##### Fields

+----------------------------+----------+----------------------------+
| Field                      | Default  | Description                |
+============================+:========:+============================+
| Capture data audit logging | N        | -   Y=yes, N=no. This flag |
|                            |          |     controls the detailed  |
|                            |          |     logging feature that   |
|                            |          |     can be viewed using    |
|                            |          |     LSAM menus 2, 3 or 4:  |
|                            |          |     option 9. The log will |
|                            |          |     contain entries about  |
|                            |          |     any data capture       |
|                            |          |     action and also about  |
|                            |          |     captured data response |
|                            |          |     rules. This logging    |
|                            |          |     capability is the only |
|                            |          |     way to record exactly  |
|                            |          |     what happens when      |
|                            |          |     Captured Data Response |
|                            |          |     Rules are executed, so |
|                            |          |     it can be used as a    |
|                            |          |     means of auditing the  |
|                            |          |     response commands that |
|                            |          |     are executed.          |
|                            |          | -   SMA recommends setting |
|                            |          |     this field to Y=yes,   |
|                            |          |     especially when new    |
|                            |          |     data capture and       |
|                            |          |     captured data response |
|                            |          |     rules are being used   |
|                            |          |     for the first time.    |
|                            |          |     Data capture is always |
|                            |          |     performed by the       |
|                            |          |     SCANSPLF utility, and  |
|                            |          |     it may also be         |
|                            |          |     performed by Message   |
|                            |          |     Management or during   |
|                            |          |     Operator Replay script |
|                            |          |     execution.             |
+----------------------------+----------+----------------------------+
| Use aggressive FTP job     | Y        | -   Y = Yes: Report an FTP |
| failure?                   |          |     job failed if the FTP  |
|                            |          |     log file does not      |
|                            |          |     contain a message \#   |
|                            |          |     226 indicating that    |
|                            |          |     the job completed      |
|                            |          |     normally.              |
|                            |          | -   N = No: Some systems   |
|                            |          |     or FTP job connections |
|                            |          |     might not produce a    |
|                            |          |     226 message, even      |
|                            |          |     though the file        |
|                            |          |     transfer completed     |
|                            |          |     normally. For these    |
|                            |          |     systems, set this      |
|                            |          |     control field to N =   |
|                            |          |     No to allow the Agent  |
|                            |          |     to report a successful |
|                            |          |     job completion unless  |
|                            |          |     the FTP job log file   |
|                            |          |     contains a recognized  |
|                            |          |     failure message.       |
+----------------------------+----------+----------------------------+
| Scan Rule maint fmt 1- or  | 2        | Control how the function   |
| 2-page                     |          | that maintains Scan Rules  |
|                            |          | will display all the       |
|                            |          | available fields:          |
|                            |          |                            |
|                            |          |                            |
|                            |          |                            |
|                            |          | 1 = The original display   |
|                            |          | format tried to include    |
|                            |          | all the Scan Rule fields   |
|                            |          | on one display page. This  |
|                            |          | makes it easy to see the   |
|                            |          | whole Rule at once, but    |
|                            |          | the screen was too busy    |
|                            |          | and was hard to read.      |
|                            |          |                            |
|                            |          |                            |
|                            |          |                            |
|                            |          | 2 = The new display format |
|                            |          | shows the most critical    |
|                            |          | and commonly used Scan     |
|                            |          | Rule fields on page 1, and |
|                            |          | then displays the          |
|                            |          | remaining, optional fields |
|                            |          | on page 2 (after pressing  |
|                            |          | the Enter key).            |
+----------------------------+----------+----------------------------+
| Job log msgs @ post-job    | 0 (zero) | The SCANSPLF command       |
| SCANSPLF                   |          | supports a JOBLOGMSG       |
|                            |          | parameter that tells the   |
|                            |          | command to send progress   |
|                            |          | and error messages to the  |
|                            |          | IBM i Job Log for the job  |
|                            |          | where the command is       |
|                            |          | executing.                 |
|                            |          |                            |
|                            |          |                            |
|                            |          |                            |
|                            |          | This control file value    |
|                            |          | forces the JOBLOGMSG to    |
|                            |          | the desired logging option |
|                            |          | when the SCANSPLF command  |
|                            |          | has been appended to the   |
|                            |          | OpCon Job Master: Call     |
|                            |          | (command or program) line. |
|                            |          | This special purpose use   |
|                            |          | for the SCANSPLF command   |
|                            |          | (as described in           |
|                            |          | \"Extended Discussion of   |
|                            |          | Parameters\" under Chapter |
|                            |          | 3: IBM I LSAM              |
|                            |          | Configuration) would       |
|                            |          | usually not need to add a  |
|                            |          | large number of IBM i Job  |
|                            |          | Log messages to the single |
|                            |          | IBM i LSAM Server Job that |
|                            |          | processes all of these     |
|                            |          | special-request executions |
|                            |          | of SCANSPLF.               |
|                            |          |                            |
|                            |          |                            |
|                            |          |                            |
|                            |          | Sending the SCANSPLF       |
|                            |          | progress and error         |
|                            |          | messages to the IBM i Job  |
|                            |          | Log can be useful for      |
|                            |          | debugging unexpected       |
|                            |          | behavior of the SCANSPLF   |
|                            |          | command.                   |
|                            |          |                            |
|                            |          |                            |
|                            |          |                            |
|                            |          | VALUES:                    |
|                            |          |                            |
|                            |          | Y or 1 = Yes, do send LSAM |
|                            |          | log messages also to the   |
|                            |          | IBM i Job Log of the LSAM  |
|                            |          | Server job.                |
|                            |          |                            |
|                            |          | N or 0 (zero) = No, do not |
|                            |          | copy the LSAM log messages |
|                            |          | to the IBM i Job Log.      |
+----------------------------+----------+----------------------------+
| [Dynamic variable start    | C0       | -   The IBM i internal     | | character]{.TableText}     |          |     EBCDIC character, in   |
|                            |          |     hexadecimal format,    |
|                            |          |     that marks the start   |
|                            |          |     of a Dynamic Variable  |
|                            |          |     token.                 |
|                            |          | -   The first field is the |
|                            |          |     data entry field where |
|                            |          |     a new value can be     |
|                            |          |     typed. However, please |
|                            |          |     note the CAUTION text  |
|                            |          |     near the top of this   |
|                            |          |     display!               |
|                            |          | -   To the right of the    |
|                            |          |     data entry fields      |
|                            |          |     are (1) the current    |
|                            |          |     value stored in the    |
|                            |          |     master file, and (2)   |
|                            |          |     the IBM i 5250 screen  |
|                            |          |     character that can be  |
|                            |          |     typed and will display |
|                            |          |     when the current value |
|                            |          |     is being used.         |
+----------------------------+----------+----------------------------+
| [Dynamic variable end      | D0       | -   The IBM i internal     | | character]{.TableText}     |          |     EBCDIC character, in   |
|                            |          |     hexadecimal format,    |
|                            |          |     that marks the end of  |
|                            |          |     a Dynamic Variable     |
|                            |          |     token.                 |
|                            |          | -   Also refer to also     |
|                            |          |     notes for the Start    |
|                            |          |     Character, above.      |
+----------------------------+----------+----------------------------+
|                            |          | **OpCon File Arrival       |
|                            |          | \$\@Variables (replace     |
|                            |          | \$@)**                     |
|                            |          |                            |
|                            |          |                            |
|                            |          |                            |
|                            |          | The IBM i File Arrival job |
|                            |          | sub-type, set in an OpCon  |
|                            |          | Job Master record, can     |
|                            |          | support more LSAM command  |
|                            |          | options than appear in the |
|                            |          | Job Master record          |
|                            |          | maintenance panel. These   |
|                            |          | are job options that are   |
|                            |          | not the same as, for       |
|                            |          | example, the Windows       |
|                            |          | (MSLSAM) version of File   |
|                            |          | Arrival jobs.              |
|                            |          |                            |
|                            |          |                            |
|                            |          |                            |
|                            |          | For the command parameters |
|                            |          | of either the CHKFILE or   |
|                            |          | the CHKIFSFIL commands,    |
|                            |          | used by the IBM i LSAM to  |
|                            |          | process File Arrival jobs, |
|                            |          | these additional command   |
|                            |          | KEYWORDS can be set by     |
|                            |          | adding entries to the      |
|                            |          | OpCon Job Master:          |
|                            |          | Variables tab.             |
|                            |          |                            |
|                            |          |                            |
|                            |          |                            |
|                            |          | For each command keyword,  |
|                            |          | add the following two      |
|                            |          | special characters in      |
|                            |          | front of the keyword name, |
|                            |          | telling the LSAM Job       |
|                            |          | Scheduler to add these     |
|                            |          | KEYWORDS to the CHKFILE or |
|                            |          | CHKIFSFIL command line     |
|                            |          | that the LSAM builds for a |
|                            |          | File Arrival job.          |
|                            |          |                            |
|                            |          |                            |
|                            |          |                            |
|                            |          | For example, the keywords  |
|                            |          | CRTREFDATE, JOBENDTIME and |
|                            |          | RECHKFREQ are often        |
|                            |          | useful, and they would be  |
|                            |          | set by adding the          |
|                            |          | following special variable |
|                            |          | names to the OpCon Job     |
|                            |          | Master: Variables table:   |
|                            |          |                            |
|                            |          |                            |
|                            |          |                            |
|                            |          | \$\@CRTREFDATE,            |
|                            |          | \$\@JOBENDTIME,            |
|                            |          | \$\@RECHKFREQ              |
|                            |          |                            |
|                            |          |                            |
|                            |          |                            |
|                            |          | However, the special       |
|                            |          | characters \$ and @ are    |
|                            |          | not always well supported  |
|                            |          | by IBM i partitions that   |
|                            |          | do not use the CCSID(37) = |
|                            |          | English EBCDIC character   |
|                            |          | set. For non-English IBM i |
|                            |          | partitions, use the        |
|                            |          | following two control      |
|                            |          | values to specify which    |
|                            |          | two characters should be   |
|                            |          | used to signal the LSAM    |
|                            |          | that these are command     |
|                            |          | line KEYWORDS and not      |
|                            |          | regular LSAM Dynamic       |
|                            |          | Variable settings.         |
+----------------------------+----------+----------------------------+
| File Arrival parm ID       | X\'5B\'  | Hexadecimal value X\'5B\'  |
| character 1                |          | represents the US dollar   |
|                            |          | sign (\$). Type a pair of  |
|                            |          | characters that are the    |
|                            |          | hexadecimal value of a     |
|                            |          | different special          |
|                            |          | character to be used by    |
|                            |          | the local IBM i site.      |
+----------------------------+----------+----------------------------+
| File Arrival parm ID       | X\'7C\'  | Hexadecimal value X\'7C\'  |
| character 2                |          | represents an \"at sign\"  |
|                            |          | (@). Type a pair of        |
|                            |          | characters that are the    |
|                            |          | hexadecimal value of a     |
|                            |          | different special          |
|                            |          | character to be used by    |
|                            |          | the local IBM i site.      |
|                            |          |                            |
|                            |          |                            |
|                            |          |                            |
|                            |          | NOTE: Some non-English     |
|                            |          | sites have discovered that |
|                            |          | their IBM i workstation    |
|                            |          | keyboards can use a US     |
|                            |          | dollar sign (X'5B') also   |
|                            |          | for this character 2       |
|                            |          | value, so that a KEYWORD   |
|                            |          | variable name example      |
|                            |          | would be:                  |
|                            |          |                            |
|                            |          | \$\$RECHKFREQ              |
+----------------------------+----------+----------------------------+
| [DynVar external start     | 4A       | The EBCDIC character, in   | | character]{.TableText}     |          | hexadecimal format, that   |
|                            |          | will result when an        |
|                            |          | external ASCII machine,    |
|                            |          | such as a Windows PC, has  |
|                            |          | typed the Dynamic Variable |
|                            |          | token start character      |
|                            |          | (e.g., { ), but then that  |
|                            |          | value is translated from   |
|                            |          | ASCII to EBCDIC as the     |
|                            |          | transaction data arrives   |
|                            |          | at the IBM i LSAM data     |
|                            |          | communications program.    |
|                            |          | This value will be         |
|                            |          | replaced by the IBM i      |
|                            |          | internal EBCDIC Dynamic    |
|                            |          | Variable start character   |
|                            |          | that is identified in the  |
|                            |          | previous pair of control   |
|                            |          | values.                    |
|                            |          |                            |
|                            |          |                            |
|                            |          |                            |
|                            |          | **Note**: The external     |
|                            |          | start/end characters       |
|                            |          | usually only need          |
|                            |          | attention in non-U.S.      |
|                            |          | environments. Please       |
|                            |          | contact SMA Support for    |
|                            |          | assistance in case Dynamic |
|                            |          | Variable tokens used in    |
|                            |          | OpCon job master records   |
|                            |          | for IBM i jobs are not     |
|                            |          | working correctly.         |
+----------------------------+----------+----------------------------+
| [DynVar external end       | 5A       | -   The EBCDIC character,  | | character]{.TableText}     |          |     in hexadecimal format, |
|                            |          |     that marks a the end   |
|                            |          |     of a Dynamic Variable  |
|                            |          |     token.                 |
|                            |          | -   Also refer to notes    |
|                            |          |     for the External Start |
|                            |          |     Character, above.      |
+----------------------------+----------+----------------------------+

:  

##### Functions

**F12=Cancel**: Quits the maintenance function and returns to the Events
and Utilities menu.

## Work with SCANSPLF Applications

:::note
In previous versions of the IBM i LSAM, there was a separate Application master file that had to be maintained. Now, the Application ID has become just the primary key field that helps gather Scan Rule records into groups. There is still a Work with SCANSPLF Applications function on the LSAM menu \# 3, but it is now only a convenience tool used to find applications and to copy or delete whole Application sets of Scan Rules at once.
:::

-   **Screen Title**: Work with SCANSPLF Applications
-   **Screen ID**: LSAUTLD301

##### Menu Pathways

Main Menu \> Events and Utilities (\#3) \> Work with SCANSPLF
Applications (\#3)

##### Fields

  Field            Description
  ---------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Search content   To quickly search for a particular job, enter the first characters of the job name, or any other tracked job log content value, and press \<**Enter**\>. Any value that appears on the log detail display may be searched for, even though not all values appear in the list display.
  Opt              Enter one of the options listed at the top of the display and press \<**Enter**\> to execute that option for the selected line in the list.

  :  

##### Options

-   **1=Select**: Select an Application ID and then branch into the Work
    with Scan Rules function, which will be limited to only the Scan
    Rules that belong to the selected Application.
-   **3=Copy**: Select an Application and copy all of its Scan Rules to
    a new Application ID. A pop-up window will appear offering an option
    to also copy any associated Response Rules.
-   **4=Delete**: Select one or more Application IDs from the list for
    deletion. All records selected for deletion are presented in a
    confirmation list after \<**Enter**\> is pressed, and no records are
    deleted until the confirmation display is acknowledged. Remember
    that this Delete function actually deletes all the Scan Rules that
    were assigned to the selected Application ID(s). A pop-up window
    will appear offering an option to also delete all associated
    Response Rules.
-   **7=Capt chart**: Type option 7 next to any Application line to view
    a chart of related Capture and Response Rules and Dynamic Variables.
-   **8=Export**: Select one or more Applications that will be copied to
    a save file collection for exporting to a different LSAM
    environment. The Export option includes all related records such as
    Capture Rules and Response Rules, as well as any Dynamic Variable
    definitions.

##### Functions

-   **F3=Exit**: Quits the list display and returns to the menu.
-   **F5=Refresh**: Retrieves the latest list information and updates
    the display.
-   **F12=Cancel**: Quits the list display and returns to the menu.
-   **F16=Search next**: When a value is entered in the Search content
    field, or a value shows in pink below this field from the last
    search request, pressing \<**F16**\> finds the next (or first)
    occurrence of the value specified. F16 is useful for finding each
    desired log entry when there is more than one log entry that
    satisfies the search request. When a value is first typed into the
    Search content field, \<**F16**\> works the same as the
    \<**Enter**\> key for starting a new search. However, only
    \<**F16**\> may be used to continue a search past the first entry
    that satisfies the search criteria.
-   **F17=Top**: Causes the display to jump to the top of the list. This
    is the equivalent of the first record in the file, but the sort
    order controls which records are listed first.
-   **F18=Bottom**: Causes the display to jump to the last entry in the
    list. This is the equivalent of the last record in the log file, but
    the sort order controls which records are listed last. This function
    key is very helpful when the file is big.

### Copy SCANSPLF Application

Option 3=Copy supports copying all of the Scan Rules from one
Application ID to a new Application ID. After the bulk copy is
completed, use option 1=Select from the list of Applications to Work
with Scan Rules for the new Application ID.

-   **Screen Title**: Copy SCANSPLF Application
-   **Screen ID**: LSAJ50R2

##### Menu Pathways

Main Menu \> Events and Utilities (\#3) \> Work with SCANSPLF
Applications (\#3) \> Option 3=Copy

##### Fields

  Field              Description
  ------------------ ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  From Application   The From Application field only appears when option 3=Copy has been used.
  (to) Application   If option 3=Copy was used, the \"to Application\" input field is shown, otherwise, a simple \"Application\" field appears on the next line. Enter the new Application ID that will be used. The Application ID may remain the same, as long as any one of the other three fields will be changed to create a new record. The Application ID field is used for coordinating with Captured Data Response Rules.

  :  

##### Functions

-   **F3=Exit**: Quits the maintenance function without update and
    returns to the list display.
-   **F5=Refresh**: Restores the original field values that were
    presented when the maintenance display format first appeared,
    replacing any data that may have been typed.
-   **F12=Cancel**: Quits the maintenance function without update and
    returns to the menu.

#### Copy/Delete SCANSPLF Application (options 3 and 4)

Whenever the options 3=Copy or 4=Delete are being processed, the program
will present a window that offers an opportunity to also copy or delete
any Response Rules associated with the Scan Rules that belong to the
Application.

 

This same format of window is presented when individual Scan Rules are
copied or deleted (described below).

Manage Response Rules Window (Copy)

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                                                         Manage Response Rules
                                                                                    
    [Copy response rules also?]{style="color: #008000;"}   [1]{style="color: #ffcc00;text-decoration: underline;"}  [0=No, 1=Yes          ]{style="color: #008000;"}                                                                           (Recommended: 1=Yes)
                                                                                    
                                                                       Enter=Select   F12=Cancel
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------

Manage Response Rules Window (Delete)

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                                                         Manage Response Rules
                                                                                    
    [Delete response rules also?]{style="color: #008000;"}   [1]{style="color: #ffcc00;text-decoration: underline;"}  [0=No, 1=Yes        ]{style="color: #008000;"}                                                                           (Recommended: 1=Yes)
                                                                                    
                                                                       Enter=Select   F12=Cancel
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------

##### Fields

+------------+--------------------------------------------------------+
| Field      | Description                                            |
+============+========================================================+
| Copy?      | -   0=No, 1=Yes                                        |
|            | -   When either option 3=Copy or option 4=Delete is    |
| **- or -** |     selected, the program offers the option to perform |
|            |     either a copy or a delete of all Response Rules    |
| Delete?    |     that are related to each Scan Rule that is         |
|            |     associated with an Application.                    |
|            | -   For option 0=No, the copy or delete action is      |
|            |     completed, but any associated Response Rules are   |
|            |     ignored.                                           |
|            | -   When this window is presented from the maintenance |
|            |     of individual Scan Rules, it applies only to the   |
|            |     Scan Rule(s) being copied and not to the whole     |
|            |     Application.                                       |
+------------+--------------------------------------------------------+

:  

##### Functions

**F12=Cancel**: Quits the option window and returns to the list control
display. (The copy or delete option remains incomplete and must be
restarted, if desired.)

### Display Capture Rules/Response Rules Chart (option 7)

The Capture and Response Rules chart displays are explained in detail
under Operator Replay, within the Screens and Windows section, under the
title \"Operator Replay Capture Chart (opt 7).\"

### Export Message Management Parameters (option 8)

Detailed instructions about the data Export and Import functions is
provided in Copy Files from Test to Production.

## Work with SPLF Scan Rules

-   **Screen Title**: Work with Spool File Scan Rules
-   **Screen ID**: LSAJ40R1

For each Application there are one or more Scan Rules that tell the
SCANSPLF utility how to search the report spool file(s). Some or all of
the Scan Rules may be required to match the input PARAMETERS values
supplied by the SCANSPLF command, and there must be a Scan Rule for each
possible input parameter. There may also be additional Scan Rules that
are not associated with the input PARAMETERS. After defining these Scan
Rules it will be possible to associate one or more Captured Data
Response Rules, as described below, in order to perform operations on
the data that is found by these Scan Rules or to respond with some
command as each Scan Rule is satisfied.

 

Refer to the How To discussion earlier in this topic for more
information about ways to apply Spool File Scan Rules to specific tasks.

##### Menu Pathways

Main Menu \> Events and Utilities menu (\#3) \> Work with SPLF Scan
Rules (\#4).

##### Fields

  Field            Description
  ---------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Search content   Type a value in this field and press \<**Enter**\> or \<**F16**\> to initiate a search for a record that has matching data anywhere in the record, including data that might not appear on the list display (but the matching data would appear in the display of the detail of the record). When \<**F16**\> is pressed a second time, the search continues from after the last matching record, using the same Search content data. Press \<**Enter**\> a second time (with no options typed), or press \<**F5=Refresh**\> to start a new search.
  Opt              Type option from list displayed near the top of this screen. Refer to options definitions, below.
  Application      The Application ID is used to group one or more Scan Rules into a single task that can produce a pass or fail outcome of a job. The Application ID, along with the Sequence number, is critical for identifying data in the Captured Data Log file (which can also hold data from Operator Replay screen capture).
  SEQ              The sequence of the Scan Rule, within an Application. This number determines the order in which data Scan Rules are processed. The order of the Scan Rules is critical for rules that are defined to match the input PARAMETERS of the SCANSPLF command. Rules that are not assigned to an input PARAMETER of the SCANSPLF command can be in any order or interspersed among the other rules. However, the order of the Scan Rules may also be governed by the desired outcome of any associated Captured Data Rules, because those responses are also processed within the order of the Sequence number of Scan Rules. The Sequence number will be unique within an Application ID, regardless of how many SPLF Names and/or Job Names are included within an Application.
  SPLF Name        The actual name of the IBM i report spool file.
  Job Name         The name of the IBM i job that produces the report spool file.
  SPLNBR           The spool file number within the Job Name.
  Description      Text that helps to identify the purpose of each Scan Rule.

  :  

##### Functions

-   **F3=Exit**: Return to the LSAM menu.
-   **F5=Refresh**: Reload the list display with the latest data from
    the master file.
-   **F6=Add**: Branch to the screen for creating a new Scan Rule
    record.
-   **F11=Sort SPLF/JOB, Sort APP/SEQ\#, Sort APP/SPLF**: Pressing F11
    rotates among these three different sorting options for the list
    display. In each sort mode, the primary sort field heading is
    colored pink and underlined, and secondary sort fields are also
    underlined.
-   **F12=Cancel**: Return to the LSAM menu.
-   **F16=Search next**: When a search argument has been entered in the
    Search content field, pressing F16 can either start a new search (if
    the content value was changed) or it can continue a search to look
    for the next list entry that matches the search argument, starting
    with the first record after the last match found.
-   **F17=Top**: Reposition the list display to show the first record in
    the list.
-   **F18=Bottom**: Reposition the list display to show the last record
    in the list.
-   **F24=More keys**: Use this function key to change the function key
    legend displayed at the bottom of the screen. All function keys
    remain active, even if they do not appear in the currently displayed
    function key legend.

##### Options

-   **2=Change**: To change a record, type 2 in the Opt field next to
    the record(s). Press \<**Enter**\> to proceed to the Change detail
    screen.
-   **3=Copy**: To copy a record, type 3 in the Opt field next to the
    record. Press \<**Enter**\> to proceed to the Copy detail screen.
    During the copy process, a pop-up window will offer an option to
    also copy any Response Rules that are associated with the Scan Rule
    being copied.
-   **4=Delete**: To delete one or more records, type 4 next to each
    record. Press \<**Enter**\> to proceed to the Delete confirmation
    window. During the delete process, a pop-up window will offer an
    option to also delete any Response Rules that are associated with
    the Scan Rule being deleted.
-   **5=Display**: To display record details, type 5 next to each
    record. Press \<**Enter**\> to proceed to the display details
    screen. Typing option 5 next to many or all records at once before
    pressing \<**Enter**\> is a convenient way to review all the
    definition details at once. Press \<**Enter**\> to advance as each
    detail screen is presented.

### Add/Change/Copy SPLF Scan Rule

-   **Screen Title**: Copy SPLF Scan Rule
-   **Screen ID**: OPRR50R2

Refer to the How To discussion earlier in this topic for more
information about the meaning and purpose of the fields on this display.
Refer to details about the rules and effect of each field in the fields
table, below.

##### Menu Pathways

Main Menu \> Events and Utilities menu (\#3) \> Work with SPLF Scan
Rules (\#4) \> F6=Add *- or -* option 2=Change *- or -* option 3=Copy.

##### Fields

Refer to the How To section of this topic for examples of how the
following field rules can be used.

:::note
The order of the fields listed in the table below will vary, depending on the setting of the "Scan Rule maint fmt 1- or 2-page" option in the "LSAM Utilities Configuration" screen (documented in previous pages of this section).
:::

+----------------------------------+----------------------------------+
| Field                            | Description                      |
+==================================+==================================+
| From fields:                     | When this screen appears in Copy |
|                                  | mode, the key fields of the      |
| -   Application                  | source record being copied are   |
| -   Sequence                     | shown in this heading area. A    |
| -   SPLF Name                    | new value must be assigned to    |
| -   Job Name                     | the Sequence of the Scan Rule    |
| -   SPLNBR                       | record being created in Copy     |
|                                  | mode, using the Rule Sequence    |
|                                  | input field, below. (The other   |
|                                  | key fields may remain the same   |
|                                  | in the new, copied record, since |
|                                  | more than one scan rule is       |
|                                  | allowed per SPLF Name + Job Name |
|                                  | + SPLNBR.)                       |
+----------------------------------+----------------------------------+
| Application                      | This field is used to group one  |
|                                  | or more Scan Rules into a single |
|                                  | task that can be configured to   |
|                                  | end normally or abnormally,      |
|                                  | depending on the setting of the  |
|                                  | Required Rule field in any of    |
|                                  | its rules. The field permits     |
|                                  | spaces and special characters.   |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | **Revision Note**: In previous   |
|                                  | LSAM versions, this field was    |
|                                  | stored in a separate master      |
|                                  | file, however, now it is simply  |
|                                  | the primary key field assigned   |
|                                  | to each Scan Rule.               |
+----------------------------------+----------------------------------+
| Rule sequence                    | The order in which the scan rule |
|                                  | will be processed, relative to   |
|                                  | other scan rules under the same  |
|                                  | Application. The value must be   |
|                                  | unique within the Application    |
|                                  | ID, even for a different SPLF    |
|                                  | Name, Job Name or SPLNBR.        |
+----------------------------------+----------------------------------+
| Rule description                 | Text that identifies the purpose |
|                                  | of the scan rule, helpful on the |
|                                  | Work with SPLF Scan Rules list   |
|                                  | display.                         |
+----------------------------------+----------------------------------+
| SPLF name                        | The name of the spool file to be |
|                                  | scanned.                         |
+----------------------------------+----------------------------------+
| Job name                         | The IBM i 10-character job name. |
|                                  | The special value of \*CMD may   |
|                                  | be used to indicate that the     |
|                                  | actual job name will be provided |
|                                  | at execution time by the         |
|                                  | SCANSPLF command.                |
+----------------------------------+----------------------------------+
| SPLF number                      | \*ANY, or optionally, a specific |
|                                  | spool file number within the Job |
|                                  | name, used when more than one    |
|                                  | spool file of the same name is   |
|                                  | produced by a single job.        |
+----------------------------------+----------------------------------+
| From/To page                     | -   The scan may optionally be   |
|                                  |     limited to one or more       |
|                                  |     specific pages of a report.  |
|                                  |     The special value \*STR      |
|                                  |     means \"from the start,\"    |
|                                  |     and the special value \*END  |
|                                  |     means \"to the end.\"        |
|                                  | -   The special value \*END may  |
|                                  |     be used in the From-page     |
|                                  |     field to cause the SCANSPLF  |
|                                  |     command to work backwards    |
|                                  |     from the last line of the    |
|                                  |     report to the first line.    |
|                                  |     Working from the end of the  |
|                                  |     report combines well with    |
|                                  |     the Incidence count, for     |
|                                  |     example, if it is important  |
|                                  |     to find the second-to-last   |
|                                  |     TOTALS label on a financial  |
|                                  |     report.                      |
|                                  | -   When \*END is used for the   |
|                                  |     From-page, it is possible to |
|                                  |     specify a Positive number    |
|                                  |     for the To-page. A Positive  |
|                                  |     number indicates the limit   |
|                                  |     of pages to scan, starting   |
|                                  |     backwards from the end of    |
|                                  |     the report. For example,     |
|                                  |     (-1) means scan only the     |
|                                  |     last page, (-2) means scan   |
|                                  |     only the last two pages, and |
|                                  |     so forth. A Positive number  |
|                                  |     in this character field is   |
|                                  |     indicated by type a dash (-) |
|                                  |     either before or after a     |
|                                  |     number: -1 or 1-             |
+----------------------------------+----------------------------------+
| From/To line (record)            | The scan may optionally be       |
|                                  | limited to specific lines on     |
|                                  | each page of the report. The     |
|                                  | line counter is reset at the top |
|                                  | of each page. This feature might |
|                                  | be useful, for example, when a   |
|                                  | label or value should only be    |
|                                  | found in the heading line of a   |
|                                  | report page (keeping in mind     |
|                                  | that the first heading line      |
|                                  | might actually be printed on     |
|                                  | line 2 of the page, in which     |
|                                  | case it would be necessary to    |
|                                  | specify 2 as the From and the To |
|                                  | lines).                          |
+----------------------------------+----------------------------------+
| From/To position (column)        | -   The scan may optionally be   |
|                                  |     limited to specific          |
|                                  |     positions on each scanned    |
|                                  |     line of the report. For      |
|                                  |     example, in IBM i job log    |
|                                  |     reports, the severity code   |
|                                  |     of logged messages always    |
|                                  |     appears in positions 36-37.  |
|                                  | -   This pair of control fields  |
|                                  |     has a different effect       |
|                                  |     depending on other fields on |
|                                  |     the scan rule:               |
|                                  |     -   If a scan label is       |
|                                  |         specified, the scan      |
|                                  |         label must be found      |
|                                  |         within the From/To       |
|                                  |         positions on the report  |
|                                  |         line. When the scan      |
|                                  |         label is specified, the  |
|                                  |         From/To positions have   |
|                                  |         no effect on the scan    |
|                                  |         value itself - the scan  |
|                                  |         value may be found       |
|                                  |         anywhere within the      |
|                                  |         report line where the    |
|                                  |         scan label was located.  |
|                                  |     -   If a scan label is not   |
|                                  |         specified, then the scan |
|                                  |         value can only be found  |
|                                  |         starting with the first  |
|                                  |         non-blank character      |
|                                  |         after the From-position, |
|                                  |         and it cannot extend     |
|                                  |         past the To-position.    |
|                                  |     -   When the special value   |
|                                  |         of \*CAPT is specified   |
|                                  |         for the scan value and   |
|                                  |         the scan label is not    |
|                                  |         specified and a scan     |
|                                  |         value length greater     |
|                                  |         than zero is entered,    |
|                                  |         then the To-position     |
|                                  |         will be ignored. Only    |
|                                  |         the From-position will   |
|                                  |         be used to find the scan |
|                                  |         value to be captured,    |
|                                  |         and the captured data    |
|                                  |         will be limited to the   |
|                                  |         specified scan value     |
|                                  |         length.                  |
+----------------------------------+----------------------------------+
| Start scan label                 | Optionally, specify a            |
|                                  | predictable string of characters |
|                                  | that can be found by the scan    |
|                                  | program in order to locate the   |
|                                  | scan value within a report line. |
+----------------------------------+----------------------------------+
| Position after label             | When the scan label is           |
|                                  | specified, indicate where the    |
|                                  | scan program should look for the |
|                                  | scan value. There are four       |
|                                  | possible value types for this    |
|                                  | field that each cause a          |
|                                  | different result:                |
|                                  |                                  |
|                                  | -   0 (zero) = start with the    |
|                                  |     first non-blank character    |
|                                  |     AFTER the end of the scan    |
|                                  |     label.                       |
|                                  | -   Positive number = start at   |
|                                  |     the specified column number  |
|                                  |     AFTER the end of the scan    |
|                                  |     label. If the scan label     |
|                                  |     ends at column 27 and the    |
|                                  |     position-after value is 6,   |
|                                  |     then the scan value to be    |
|                                  |     compared will begin at       |
|                                  |     column 33.                   |
|                                  | -   (-1) = start with column 1   |
|                                  |     on the report and use the    |
|                                  |     first non-blank character    |
|                                  |     that appears BEFORE the scan |
|                                  |     label. This value is not     |
|                                  |     valid if the scan label      |
|                                  |     begins at column 1. The      |
|                                  |     search for a scan value will |
|                                  |     stop with the last character |
|                                  |     before the start of the scan |
|                                  |     label, but the scan value    |
|                                  |     can overlap the scan label.  |
|                                  |     If no non-blank characters   |
|                                  |     are found before the scan    |
|                                  |     label starts, then the scan  |
|                                  |     program assumes there is no  |
|                                  |     scan value at the location   |
|                                  |     of the scan label and this   |
|                                  |     scan value will be marked as |
|                                  |     not found (not matched).     |
|                                  | -   Positive number = start at   |
|                                  |     the specified number of      |
|                                  |     columns BEFORE the start of  |
|                                  |     the scan label. Remember     |
|                                  |     that (-1) has a special      |
|                                  |     meaning, so it cannot be     |
|                                  |     used in this context. If the |
|                                  |     scan label starts at column  |
|                                  |     27 and the position-after    |
|                                  |     value is (-15), then the     |
|                                  |     scan value to be compared    |
|                                  |     will begin at column 12.     |
+----------------------------------+----------------------------------+
| (scan) Value, \*PARM, \*CAPT,    | This field is used to specify or |
| DVar                             | describe the scan value. The     |
|                                  | scan value will be the captured  |
|                                  | data value stored in the         |
|                                  | Captured Data Log file and       |
| **Note:** Special values \*PARM  | referenced by any captured data  |
| and \*CAPT must be all capital   | response rules. When applicable, |
| letters.                         | this scan value will be compared |
|                                  | to the value found in the report |
|                                  | at the specified location in     |
|                                  | order to determine if the scan   |
|                                  | rule has been matched or not     |
|                                  | matched. The scan values that    |
|                                  | may be specified include:        |
|                                  |                                  |
|                                  | -   A specific value = Any       |
|                                  |     character string may be      |
|                                  |     specified as the value that  |
|                                  |     should be compared to the    |
|                                  |     scan value found at the      |
|                                  |     specified location in the    |
|                                  |     report. For example, this    |
|                                  |     type of rule can be used to  |
|                                  |     find a flag in a financial   |
|                                  |     report that may say \"OUT OF |
|                                  |     BALANCE\" in order to cause  |
|                                  |     the SCANSPLF command to      |
|                                  |     fail, so that the OpCon/xps  |
|                                  |     job that executed the        |
|                                  |     SCANSPLF command will show   |
|                                  |     up on the OpCon/xps Schedule |
|                                  |     as a failed job, triggering  |
|                                  |     an operator response.        |
|                                  |     Leading blank characters may |
|                                  |     be left in the scan value    |
|                                  |     field if they must be        |
|                                  |     included in the scan rule    |
|                                  |     match. Use the scan value    |
|                                  |     length to also include       |
|                                  |     trailing blank characters.   |
+----------------------------------+----------------------------------+
| (scan) Value, \*PARM, \*CAPT,    | -   \*PARM = Use the value       |
| DVar (continued\...)             |     specified in one of the      |
|                                  |     input PARAMETERS values of   |
|                                  |     the SCANSPLF command. When   |
|                                  |     the SCANSPLF command         |
| **Note:** Special values \*PARM  |     supplies input values (that  |
| and \*CAPT must be all capital   |     is, the \*RULES option for   |
| letters.                         |     PARAMETERS was not used),    |
|                                  |     there must be the same       |
|                                  |     number of scan rules that    |
|                                  |     use this \*PARM special      |
|                                  |     value as there are input     |
|                                  |     parameter values separated   |
|                                  |     by colons (:) in the         |
|                                  |     PARAMETERS keyword of the    |
|                                  |     SCANSPLF command.            |
|                                  | -   \*CAPT = This special value  |
|                                  |     indicates that the scan rule |
|                                  |     will not generate a match or |
|                                  |     no-match (pass/fail) result. |
|                                  |     Instead, this type of scan   |
|                                  |     rule will be used only for   |
|                                  |     the purpose of capturing a   |
|                                  |     value at the specified       |
|                                  |     location in the report and   |
|                                  |     then storing that value in   |
|                                  |     the Captured Data Log file.  |
|                                  |     Captured data values can be  |
|                                  |     used to trigger any number   |
|                                  |     of Captured Data Response    |
|                                  |     rules, and the Response rule |
|                                  |     records may specify that the |
|                                  |     captured data should also be |
|                                  |     stored as an LSAM Dynamic    |
|                                  |     Variable or as an LSAM       |
|                                  |     Operator Replay token        |
|                                  |     variable value.              |
|                                  | -   DVar = An LSAM Dynamic       |
|                                  |     Variable may be specified in |
|                                  |     the scan value field. If the |
|                                  |     Dynamic Variable has already |
|                                  |     been defined in the LSAM     |
|                                  |     table (remembering that      |
|                                  |     Dynamic Variables may be     |
|                                  |     defined at run-time, in      |
|                                  |     which case they must be      |
|                                  |     anticipated before they      |
|                                  |     appear in the LSAM table),   |
|                                  |     then function key F4=DynVar  |
|                                  |     may be used to select from a |
|                                  |     list of available Dynamic    |
|                                  |     Variables. The Dynamic       |
|                                  |     Variable name is recognized  |
|                                  |     by the scan program because  |
|                                  |     it is enclosed within the    |
|                                  |     pair of characters           |
|                                  |     registered for this purpose  |
|                                  |     in the LSAM Utility          |
|                                  |     Configuration function (LSAM |
|                                  |     menu 3, option 7). The       |
|                                  |     default Dynamic Variable     |
|                                  |     enclosure characters are a   |
|                                  |     pair of curly brackets:      |
|                                  |     {var_name}. It is possible   |
|                                  |     to combine a Dynamic         |
|                                  |     Variable with other text     |
|                                  |     that is entered directly     |
|                                  |     into the scan value field,   |
|                                  |     for example: \'Leading       |
|                                  |     characters {var_nam}         |
|                                  |     trailing text\'. When the    |
|                                  |     scan rule is executed, the   |
|                                  |     scan program will replace    |
|                                  |     the Dynamic Variable with    |
|                                  |     the value found in the LSAM  |
|                                  |     table at the moment of       |
|                                  |     execution. A Dynamic         |
|                                  |     Variable value may have just |
|                                  |     been set by a preceding scan |
|                                  |     rule\'s Captured Data        |
|                                  |     Response rule.               |
+----------------------------------+----------------------------------+
| Scan value length                | When the scan value length is    |
|                                  | left at zero, the scan program   |
|                                  | assumes that the length of the   |
|                                  | scan value is equal to the last  |
|                                  | non-blank character in the scan  |
|                                  | value string (that is, the scan  |
|                                  | value is assumed to be trimmed   |
|                                  | of trailing blanks, and then the |
|                                  | scan value is measured). The     |
|                                  | scan value length has a          |
|                                  | different effect depending on    |
|                                  | the setting of other scan rule   |
|                                  | fields:                          |
|                                  |                                  |
|                                  | -   Leave set to be left at zero |
|                                  |     when using the \*PARM scan   |
|                                  |     value. The length of the     |
|                                  |     input PARAMETER value        |
|                                  |     supplied in the SCANSPLF     |
|                                  |     command will determine the   |
|                                  |     length of the character      |
|                                  |     string extracted from the    |
|                                  |     report.                      |
|                                  | -   When a specific value is     |
|                                  |     entered into the scan value  |
|                                  |     field, the scan value length |
|                                  |     can be set to a value longer |
|                                  |     than the number of trailing  |
|                                  |     non-blank characters in the  |
|                                  |     value in order to tell the   |
|                                  |     scan program that trailing   |
|                                  |     blanks should be considered  |
|                                  |     in the match (pass/fail)     |
|                                  |     rule. For example, if a scan |
|                                  |     value is entered with two    |
|                                  |     leading blank characters,    |
|                                  |     as: \'VALUE\', then the      |
|                                  |     default trimmed length of    |
|                                  |     this scan value used by the  |
|                                  |     scan program would be 7 (2   |
|                                  |     leading blanks and 5         |
|                                  |     non-blank characters). If    |
|                                  |     the scan value length is set |
|                                  |     to 9, then the scan value    |
|                                  |     found in the report must     |
|                                  |     also have 2 blank characters |
|                                  |     after the non-blank          |
|                                  |     characters.                  |
|                                  | -   For the special scan value   |
|                                  |     of \*CAPT, use the scan      |
|                                  |     value length combined with   |
|                                  |     the From-position to specify |
|                                  |     the data that should be      |
|                                  |     captured from the report.    |
|                                  |     For \*CAPT, if the scan      |
|                                  |     value length is zeros, then  |
|                                  |     the To-position must also be |
|                                  |     specified with the           |
|                                  |     From-position in order to    |
|                                  |     determine how much data to   |
|                                  |     capture.                     |
|                                  | -   Dynamic Variables are        |
|                                  |     handled the same as typed    |
|                                  |     scan values. The scan        |
|                                  |     program first replaces a     |
|                                  |     Dynamic Variable token with  |
|                                  |     the variable\'s value at run |
|                                  |     time, then it subjects the   |
|                                  |     scan value to the scan value |
|                                  |     length, as described above   |
|                                  |     for specific values. Leave   |
|                                  |     the scan value length at     |
|                                  |     zero to allow the scan       |
|                                  |     program to adapt to the      |
|                                  |     actual length of the Dynamic |
|                                  |     Variable\'s value at run     |
|                                  |     time. If a scan value length |
|                                  |     is specified, then the       |
|                                  |     possible values of the       |
|                                  |     Dynamic Variable must be     |
|                                  |     well understood in advance   |
|                                  |     in order to predict the      |
|                                  |     results of the SCANSPLF      |
|                                  |     match rules.                 |
+----------------------------------+----------------------------------+
| Bypass parm value                | This field is used only when the |
|                                  | SCANSPLF command will provide    |
|                                  | input values in its PARAMETERS   |
|                                  | keyword. If the specified bypass |
|                                  | value is found in the input      |
|                                  | PARAMETERS position              |
|                                  | corresponding to this scan rule  |
|                                  | sequence number, then the input  |
|                                  | parameter will be considered     |
|                                  | matched by default and the       |
|                                  | report will not actually be      |
|                                  | scanned in order to set this     |
|                                  | scan rule to a status of         |
|                                  | matched.                         |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | **Example**: For a given         |
|                                  | application, such as a financial |
|                                  | report balancing task, the       |
|                                  | SCANSPLF command might be        |
|                                  | assembled by an automatic        |
|                                  | routine executing on the         |
|                                  | OpCon/xps server. In this        |
|                                  | example, assume that there are   |
|                                  | four input parameter values:     |
|                                  | debit item count, debit total    |
|                                  | amount, credit item count,       |
|                                  | credit total amount. If any of   |
|                                  | these values is not found in the |
|                                  | source data used by the SCANSPLF |
|                                  | command assembly routine, then   |
|                                  | that routine is allowed to       |
|                                  | insert a place-holder value that |
|                                  | indicates, \"this value is not   |
|                                  | supplied today - ignore this     |
|                                  | parameter position.\" An example |
|                                  | of such a value might be         |
|                                  | \*empty\*. In this case, the     |
|                                  | Bypass parm value should be set  |
|                                  | to this same value, \*empty\*.   |
|                                  | To make the bypass value work,   |
|                                  | the administrator configuring    |
|                                  | the LSAM SPLF Scan Rules must    |
|                                  | coordinate this special value    |
|                                  | with the programmer responsible  |
|                                  | for building the automated       |
|                                  | routines that will assemble the  |
|                                  | SCANSPLF command string for the  |
|                                  | OpCon/xps job.                   |
+----------------------------------+----------------------------------+
| Bypass value length              | Optionally, specify the length   |
|                                  | of the characters string used    |
|                                  | for the Bypass parm value. If    |
|                                  | this length is left at zeros,    |
|                                  | the scan program will assume     |
|                                  | that the Bypass parm value       |
|                                  | length ends with the last        |
|                                  | non-blank character. Leaving     |
|                                  | this value as zeros is the usual |
|                                  | practice.                        |
+----------------------------------+----------------------------------+
| Compress numeric                 | This flag field tells the LSAM   |
|                                  | data comparison rule engine how  |
|                                  | to handle the comparison data    |
|                                  | and the captured data. If        |
|                                  | numeric data was edited using a  |
|                                  | currency sign and decimal point, |
|                                  | it may be preferable to match    |
|                                  | the whole character string       |
|                                  | exactly, without compression.    |
|                                  | But if the absolute numeric      |
|                                  | value is important and the       |
|                                  | numeric field editing cannot be  |
|                                  | predicted, then it may work      |
|                                  | better to compress out all       |
|                                  | non-numeric characters and       |
|                                  | compare only the numeric digits. |
|                                  | Compressed monomeric do not keep |
|                                  | track of how many digits fall to |
|                                  | the right of the decimal point,  |
|                                  | so it is important that the      |
|                                  | number of decimal places be the  |
|                                  | same in both the reference value |
|                                  | (which may be an input PARAMETER |
|                                  | from the SCANSPLF command) and   |
|                                  | the scan value found in the      |
|                                  | report when the option for       |
|                                  | compressing numeric data will be |
|                                  | used.                            |
+----------------------------------+----------------------------------+
| Required rule                    | -   This field is used to        |
|                                  |     indicate that a scan rule is |
|                                  |     required, and it will affect |
|                                  |     the pass/fail outcome of the |
|                                  |     scan task:                   |
|                                  | -   Y = yes, the rule must be    |
|                                  |     matched as part of the       |
|                                  |     overall outcome of the       |
|                                  |     SCANSPLF job.                |
|                                  | -   N = no, this rule may be     |
|                                  |     ignored; whether it matches  |
|                                  |     or not, it does not affect   |
|                                  |     the overall outcome of the   |
|                                  |     SCANSPLF job.                |
|                                  | -   This field MUST be set to Y  |
|                                  |     when the scan value is       |
|                                  |     \*PARM.                      |
|                                  | -   This rule at the individual  |
|                                  |     scan rule level must be      |
|                                  |     coordinated with the         |
|                                  |     SCANSPLF command setting in  |
|                                  |     its FAILOPT (fail option)    |
|                                  |     keyword. The scan program    |
|                                  |     itself keeps track of all    |
|                                  |     rules that have their        |
|                                  |     \"Required rule\" field set  |
|                                  |     to Y=yes. At the end of the  |
|                                  |     scan job, if all required    |
|                                  |     rules were matched, then the |
|                                  |     SCANSPLF command would end   |
|                                  |     normally. If any of the      |
|                                  |     required rules were not      |
|                                  |     matched, then the SCANSPLF   |
|                                  |     command would end            |
|                                  |     abnormally. The SCANSPLF     |
|                                  |     command FAILOPT can be used  |
|                                  |     to reverse the logic of this |
|                                  |     outcome (or to ignore the    |
|                                  |     pass/fail outcome of rule    |
|                                  |     matching). If the FAILOPT is |
|                                  |     set to (2) = fail on match,  |
|                                  |     then the SCANSPLF command    |
|                                  |     will signal a failure only   |
|                                  |     when all required rules are  |
|                                  |     matched. For FAILOPT(2), if  |
|                                  |     any required scan rule is    |
|                                  |     not matched, the SCANSPLF    |
|                                  |     command will appear to end   |
|                                  |     normally.                    |
|                                  | -   The FAILOPT(2) technique may |
|                                  |     be most useful for           |
|                                  |     single-rule Applications.    |
|                                  |     For example, if the          |
|                                  |     Application is searching for |
|                                  |     a failure message in a job   |
|                                  |     log report, finding a match  |
|                                  |     for any one failure message  |
|                                  |     should generate an abnormal  |
|                                  |     end of the SCANSPLF command. |
|                                  |     If two different failure     |
|                                  |     message rules were           |
|                                  |     specified, it is unlikely    |
|                                  |     that both failure messages   |
|                                  |     would be found, therefore,   |
|                                  |     the SCANSPLF using           |
|                                  |     FAILOPT(2) would typically   |
|                                  |     end normally because not all |
|                                  |     rules were matched.          |
+----------------------------------+----------------------------------+

:  

##### Functions

-   **F3=Exit**: Return to the LSAM menu.
-   **F5=Refresh**: Reload the maintenance display with the original
    default values for Add, Copy or Change, discarding any new typed
    input.
-   **F8=DynVar**: When the cursor is positioned in the Scan Value
    field, use this function key to view a window of registered Dynamic
    Variable values and select a value to be inserted into the Scan
    Value field.
-   **F12=Cancel**: Return to the Work with SPLF Scan Rules list
    display.
-   **PageDown/PageUp**: When the LSAM Utilities Configuration option is
    set to use the 2-page format for this maintenance display, the
    PageDown and PageUp keys can be used to move between the two pages.
    NOTE: If Enter is pressed while page 1 is on display, the master
    record will be added or updated, without displaying the optional
    fields on page 2. Use PageDown to view the page 2 fields, if
    desired, before pressing the Enter key.

## Work with Capture Response Rules

-   **Screen Title**: Work with Capture Response Rules
-   **Screen ID**: OPRR50R1

The same data capture response functions support both Screen data
capture for Operator Replay and report data capture for the SCANSPLF
utility command. Some of the following description includes information
that is useful in distinguishing between the two different types of data
capture. Each actual data capture definition and the captured data
record are labeled by their Type field, where \"C\" = screen capture and
\"S\" = spool file capture. The list column headings will change
depending on the subset rule that is currently in effect.

 

Refer to the How To discussion earlier in this topic for more
information about ways to use data capture and captured data response
rules.

##### Menu Pathways

Main Menu \> Events and Utilities menu (\#3) \> Work with Captured Data
Response Rules (\#5).

##### Fields

+------------------+--------------------------------------------------+
| Field            | Description                                      |
+==================+==================================================+
| Subset to Type   | When this Work With list has been called         |
|                  | directly from the menu, the LSAM menu passes a   |
|                  | parameter to signal the program whether the call |
|                  | came from the Operator Replay menu (Type =       |
|                  | Screen), or from the Events and Utilities Menu   |
|                  | (Type = SCANSPLF). Function key F15 can be used  |
|                  | to force a change to the Subtype, or to remove   |
|                  | subsetting and show all Response rules of both   |
|                  | types.                                           |
+------------------+--------------------------------------------------+
| Search content   | Type a value in this field and press             |
|                  | \<**Enter**\> or \<**F16**\> to initiate a       |
|                  | search for a record that has matching data       |
|                  | anywhere in the record, including data that      |
|                  | might not appear on the list display (but the    |
|                  | matching data would appear in the display of the |
|                  | detail of the record). When \<**F16**\> is       |
|                  | pressed a second time, the search continues from |
|                  | after the last matching record, using the same   |
|                  | Search content data. Press \<**Enter**\> a       |
|                  | second time or press \<**F5=Refresh**\> to start |
|                  | a new search.                                    |
+------------------+--------------------------------------------------+
| Opt              | Type option from list displayed near the top of  |
|                  | this screen. Refer to options definitions,       |
|                  | below.                                           |
+------------------+--------------------------------------------------+
| Capture ID (APP) | A label that groups together all of the data     |
|                  | capture rules that apply to a single SCANSPLF    |
|                  | Scan Rule (or to an Operator Replay script       |
|                  | Sequence number). In the SCANSPLF command, the   |
|                  | Capture ID is known as the Application.          |
+------------------+--------------------------------------------------+
| SEQ              | The sequence of the source Application Scan Rule |
|                  | (or Operator Replay data capture rule). This     |
|                  | number determines the order in which spool file  |
|                  | scan rules (or Operator Replay data capture      |
|                  | rules) are executed. The effect of this sequence |
|                  | number is that it imposes a higher level of      |
|                  | control over the sequence of response rules, and |
|                  | the Response Sequence number (below) operates    |
|                  | within this higher level.                        |
+------------------+--------------------------------------------------+
| T                | Type: C = Operator Replay screen data capture, S |
|                  | = SCANSPLF Scan Rule data capture.               |
+------------------+--------------------------------------------------+
| RS\#             | Response Sequence Number: The order in which     |
|                  | each response rule will be executed (that is,    |
|                  | within the higher order data capture SEQuence    |
|                  | order).                                          |
+------------------+--------------------------------------------------+
| SplFName         | Spool File Name: When the Response Rule Type is  |
|                  | S, this column shows the Spool File Name         |
|                  | assigned to the SCANSPLF Scan Rule to which this |
|                  | response is attached.                            |
+------------------+--------------------------------------------------+
| SplF \#          | -   Spool File Number: When the Response Rule    |
|                  |     Type is S, this column shows the Spool File  |
|                  |     Number assigned to the SCANSPLF Scan Rule to |
|                  |     which this response is attached.             |
|                  | -   The Spool File Number is actually an         |
|                  |     attribute of a spool file after it is        |
|                  |     produced by the Job Name (next field in      |
|                  |     table), but this column becomes the Operator |
|                  |     Replay Script Step Number when the Type      |
|                  |     is C.                                        |
+------------------+--------------------------------------------------+
| SplFJobName      | -   Spool file Job Name: When the Response Rule  |
|                  |     Type is S, this column shows the Job Name    |
|                  |     value assigned to the SCANSPLF Scan Rule.    |
|                  | -   (This column is not used for Operator Replay |
|                  |     Script Steps, Type C.)                       |
+------------------+--------------------------------------------------+
| Command          | The command text (first few characters shown)    |
|                  | that will be executed in response to captured    |
|                  | data, if the comparison data rule qualifies.     |
|                  | (Use option 5=Display to view the comparison     |
|                  | data rule.)                                      |
+------------------+--------------------------------------------------+

:  

##### Functions

-   **F3=Exit**: Return to the LSAM menu.
-   **F5=Refresh**: Reload the list display with the latest data from
    the master file.
-   **F6=Add**: Branch to the screen for creating a new Capture Response
    Rule record.
-   **F12=Cancel**: Return to the LSAM menu.
-   **F15=Subset**: When this program was called directly from the LSAM
    menu, this function key appears, permitting a change to the type of
    Response rule appearing in the list. The Subset window offers a
    choice of Type C = screen capture response rules, or S = SCANSPLF
    data capture response rules.
-   **F16=Search next**: When a search argument has been entered in the
    Search content field, pressing F16 can either start a new search (if
    the content value was changed) or it can continue a search to look
    for the next list entry that matches the search argument, starting
    with the first record after the last match found.
-   **F17=Top**: Reposition the list display to show the first record in
    the list.
-   **F18=Bottom**: Reposition the list display to show the last record
    in the list.
-   **F24=More keys**: Change the function key line to show additional
    supported keys.

##### Options

-   **2=Change**: To change a record, type 2 in the Opt field next to
    the record(s). Press \<**Enter**\> to proceed to the Change detail
    screen.
-   **3=Copy**: To copy a record, type 3 in the Opt field next to the
    record. Press \<**Enter**\> to proceed to the Copy detail screen.
-   **4=Delete**: To delete one or more records, type 4 next to each
    record. Press \<**Enter**\> to proceed to the Delete confirmation
    window.
-   **5=Display**: To display record details, type 5 next to each
    record. Press \<**Enter**\> to proceed to the display details
    screen. Typing option 5 next to many or all records at once before
    pressing \<**Enter**\> is a convenient way to review all the
    definition details at once. Press \<**Enter**\> to advance as each
    detail screen is presented.

### Add/Change/Copy Capture Response Rules

-   **Screen Title**: Copy Capture Response Rule
-   **Screen ID**: OPRR50R2

Refer to the How To discussion earlier in this topic for more
information about the meaning and purpose of the fields on this display,
especially how the Continuation field works.

##### Menu Pathways

Main Menu \> Events and Utilities menu (\#3) \> Work with Captured Data
Response Rules (\#5) \> F6=Add **- or -** option 2=Change **- or -**
option 3=Copy.

##### Fields

+----------------------------------+----------------------------------+
| Field                            | Description                      |
+==================================+==================================+
| From fields (Resp Seq)           | When this screen appears in Copy |
|                                  | mode, the key fields of the      |
|                                  | source record being copied are   |
|                                  | shown in this heading area. When |
|                                  | this program is called from the  |
|                                  | Operator Replay Sequence         |
|                                  | maintenance, only the Response   |
|                                  | Sequence appears in the From     |
|                                  | field list. A new value must be  |
|                                  | assigned to the new Response     |
|                                  | Rule record being created in     |
|                                  | Copy mode, using the Response    |
|                                  | Sequence input field (below).    |
+----------------------------------+----------------------------------+
| Capture Identifier               | A label that groups together all |
|                                  | of the data capture rules that   |
|                                  | apply to a single Operator       |
|                                  | Replay script Sequence number.   |
|                                  | For Copy and Change operations,  |
|                                  | this key field is protected from |
|                                  | update. This field and the       |
|                                  | Capture Seq field (next)         |
|                                  | identify the rule to which this  |
|                                  | response record will react.      |
+----------------------------------+----------------------------------+
| Seq                              | The sequence of the data capture |
|                                  | rule to which this response will |
|                                  | react. For Copy and Change       |
|                                  | operations, this key field is    |
|                                  | protected from update. This      |
|                                  | number determines the order in   |
|                                  | which data capture rules are     |
|                                  | executed.                        |
+----------------------------------+----------------------------------+
| Type                             | Type: C = screen capture, S =    |
|                                  | SCANSPLF data capture. This must |
|                                  | be the type of the data capture  |
|                                  | definition. For Copy and Change  |
|                                  | operations, this field is        |
|                                  | protected from update.           |
+----------------------------------+----------------------------------+
| Response sequence                | Response Sequence Number: The    |
|                                  | order in which each response     |
|                                  | rule will be executed. When      |
|                                  | changing an existing rule\'s     |
|                                  | sequence number, pay close       |
|                                  | attention to the Continuation    |
|                                  | field value, because the order   |
|                                  | of records is critical when the  |
|                                  | Continuation field is used to    |
|                                  | group multiple response          |
|                                  | qualifications (using Compare    |
|                                  | data) and commands.              |
+----------------------------------+----------------------------------+
| Continuation                     | -   Continuation field values    |
|                                  |     are: blanks, CMD, AND, OR.   |
|                                  | -   A value that supports        |
|                                  |     multiple groups of commands  |
|                                  |     and/or rules that may be     |
|                                  |     qualified for execution in   |
|                                  |     response to a single record  |
|                                  |     of captured data. In         |
|                                  |     summary, the values work     |
|                                  |     like this:                   |
|                                  | -   blank = Starts a new group   |
|                                  |     of comparison rules and      |
|                                  |     commands, separate and       |
|                                  |     unrelated from other rules   |
|                                  |     groups.                      |
|                                  | -   OR = an exclusive OR,        |
|                                  |     meaning that the next        |
|                                  |     comparison rule or group of  |
|                                  |     rules may qualify a response |
|                                  |     command group if the         |
|                                  |     previous rule group did not  |
|                                  |     qualify.                     |
|                                  | -   AND = connects more than one |
|                                  |     qualification rule into a    |
|                                  |     single group.                |
|                                  | -   CMD = an additional rules    |
|                                  |     record is providing an       |
|                                  |     additional response command  |
|                                  |     to execute, associated with  |
|                                  |     the qualification rules of   |
|                                  |     the comparison record or     |
|                                  |     group of records immediately |
|                                  |     preceding this record. This  |
|                                  |     continuation record will be  |
|                                  |     ignored for comparison       |
|                                  |     rules, it exists only to     |
|                                  |     support multiple commands    |
|                                  |     that are part of a single    |
|                                  |     response group.              |
|                                  | -   (For more information on     |
|                                  |     this field and examples,     |
|                                  |     refer to the How To          |
|                                  |     discussion above.)           |
+----------------------------------+----------------------------------+
| Compress numeric                 | This flag field tells the LSAM   |
|                                  | data comparison rule engine how  |
|                                  | to handle the comparison data    |
|                                  | and the captured data. If        |
|                                  | numeric data was edited using a  |
|                                  | currency sign and decimal point, |
|                                  | it may be preferable to match    |
|                                  | the whole character string       |
|                                  | exactly, without compression.    |
|                                  | But if the absolute numeric      |
|                                  | value is important and the       |
|                                  | numeric field editing cannot be  |
|                                  | predicted, then it may work      |
|                                  | better to compress out all       |
|                                  | non-numeric characters and       |
|                                  | compare only the numeric digits. |
|                                  | Compressed numeric values do not |
|                                  | keep track of how many digits    |
|                                  | fall to the right of the decimal |
|                                  | point, so it is important that   |
|                                  | the number of decimal places be  |
|                                  | the same in both the captured    |
|                                  | data and the comparison data     |
|                                  | when the option for compressing  |
|                                  | numeric data will be used.       |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | **Note:** The setting of this    |
|                                  | flag also controls how captured  |
|                                  | data will be stored into a       |
|                                  | Dynamic Variable, if one is      |
|                                  | named in the field below.        |
+----------------------------------+----------------------------------+
| Store CAPT to-\> DynVar          | -   Typing a name into this      |
|                                  |     field causes the captured    |
| (Dynamic variable)               |     data response rule module to |
|                                  |     create or update an LSAM     |
|                                  |     Dynamic Variable in the LSAM |
|                                  |     table using the value of the |
|                                  |     captured data. This field is |
|                                  |     limited to only type-V       |
|                                  |     (general use) Dynamic        |
|                                  |     Variables. The LSAM command  |
|                                  |     SETDYNVAR is executed by the |
|                                  |     response rules module to     |
|                                  |     support this field.          |
|                                  | -   This variable value is set   |
|                                  |     before the response command  |
|                                  |     is processed, meaning that   |
|                                  |     the response command can use |
|                                  |     the same dynamic variable    |
|                                  |     name in order to have access |
|                                  |     to the currently captured    |
|                                  |     value.                       |
|                                  |                                  |
|                                  | **Note**: The format of the      |
|                                  | captured data that is stored in  |
|                                  | the Dynamic Variable is affected |
|                                  | by the Compress numeric option,  |
|                                  | above.                           |
|                                  |                                  |
|                                  | -   (To create or update a       |
|                                  |     type-L Dynamic Variable,     |
|                                  |     insert a SETDYNVAR command   |
|                                  |     into the response command    |
|                                  |     line. This could be done on  |
|                                  |     a separate response rule     |
|                                  |     record that is associated    |
|                                  |     with the same SPLF Scan Rule |
|                                  |     or Operator Replay screen    |
|                                  |     capture rule.)               |
+----------------------------------+----------------------------------+
| Store CAPT to-\> Oper Rply Var   | -   Typing a name into this      |
| (Operator Replay Variable)       |     field causes the captured    |
|                                  |     data response rule module to |
|                                  |     create or update an LSAM     |
|                                  |     Operator Replay token        |
|                                  |     variable in the LSAM table.  |
|                                  | -   When Captured Data Response  |
|                                  |     Rules are associated with an |
|                                  |     Operator Replay script\'s    |
|                                  |     Screen Capture Rule, the     |
|                                  |     setting of the Operator      |
|                                  |     Replay token variable value  |
|                                  |     is completed before the      |
|                                  |     script step responds to the  |
|                                  |     current screen on display.   |
|                                  |     This means that the content  |
|                                  |     of the screen can be used to |
|                                  |     set the variable and the     |
|                                  |     same variable name can then  |
|                                  |     be used in the command line  |
|                                  |     of the script step\'s        |
|                                  |     response to the screen       |
|                                  |     format.                      |
+----------------------------------+----------------------------------+
| Response cmd (part 1);           | -   The first 214 characters of  |
|                                  |     the response command string  |
| F13=Full CMD                     |     may be entered in this       |
|                                  |     field. If the command is     |
|                                  |     longer than 214 characters,  |
|                                  |     press \<**F13=Full CMD**\>   |
|                                  |     to branch to a screen where  |
|                                  |     a much longer command string |
|                                  |     may be entered. Function key |
|                                  |     \<**F4=Prompt**\> may be     |
|                                  |     used to get IBM i help with  |
|                                  |     command prompting. Unlike    |
|                                  |     the Compare data lines, the  |
|                                  |     entire command string will   |
|                                  |     appear in the F13=Full CMD   |
|                                  |     screen. Be careful if a      |
|                                  |     partial command shows in     |
|                                  |     this field in Change mode;   |
|                                  |     in this case it is           |
|                                  |     recommended that F13=Full    |
|                                  |     CMD be used to be sure that  |
|                                  |     the final command syntax is  |
|                                  |     correct after any changes.   |
|                                  | -   Dynamic Variables may be     |
|                                  |     used in place of all or part |
|                                  |     of the command line syntax.  |
|                                  |     (For more information about  |
|                                  |     Dynamic Variables, refer to  |
|                                  |     Job Tracking and Queuing.)   |
|                                  | -   Also refer to the discussion |
|                                  |     below about how LSAM Event   |
|                                  |     commands can be used in this |
|                                  |     field, and how OpCon/xps     |
|                                  |     property (variable) tokens   |
|                                  |     can also be supported when   |
|                                  |     an Event command is used.    |
|                                  |     (Any other IBM i command may |
|                                  |     also be used in this field,  |
|                                  |     but only Event commands are  |
|                                  |     supported for replacing      |
|                                  |     OpCon/xps property tokens.   |
+----------------------------------+----------------------------------+
| Comp reference value             | -   The compare reference value  |
|                                  |     is a field containing a      |
|                                  |     character string or a        |
|                                  |     reference to a value store   |
|                                  |     in another file, for use in  |
|                                  |     qualifying this Rule for     |
|                                  |     execution. If the referenced |
|                                  |     value does not match the     |
|                                  |     Compare data according to    |
|                                  |     the Compare rule, then the   |
|                                  |     Capture Response Rule        |
|                                  |     Response command will not be |
|                                  |     executed.                    |
|                                  | -   \*CAPT = Use the captured    |
|                                  |     data as the reference data   |
|                                  |     (this is the original        |
|                                  |     default for comparing data,  |
|                                  |     in prior versions).          |
|                                  | -   DynVar = The LSAM Dynamic    |
|                                  |     Variable named in this field |
|                                  |     will be compared to the      |
|                                  |     Compare data. (Do not type   |
|                                  |     \'DynVar\' but instead type  |
|                                  |     the name of a Dynamic        |
|                                  |     Variable. Use function key   |
|                                  |     F8 to select from a list of  |
|                                  |     existing dynamic variables.) |
|                                  | -   char = a specific string     |
|                                  |     typed in this field will be  |
|                                  |     compared to the Compare      |
|                                  |     data.                        |
+----------------------------------+----------------------------------+
| Comp reference length            | Specifies the length of data to  |
|                                  | be used from the Comp reference  |
|                                  | value, starting at position 1 of |
|                                  | the reference value. If this     |
|                                  | field is zero, then the trimmed  |
|                                  | length of the reference value    |
|                                  | will be used. (Trimming means    |
|                                  | that any trailing blanks will    |
|                                  | not be considered, only data     |
|                                  | from position 1 through the last |
|                                  | non-blank character will         |
|                                  | determine the length of the Comp |
|                                  | reference value.)                |
+----------------------------------+----------------------------------+
| Compare rule                     | -   Specifies the type of        |
|                                  |     compare to use between the   |
|                                  |     Comp reference value (which  |
|                                  |     will be factor 1) and the    |
|                                  |     Compare data (which will be  |
|                                  |     factor 2). For example, if   |
|                                  |     GT is specified, then the    |
|                                  |     Comp reference value must be |
|                                  |     greater than the Compare     |
|                                  |     data in order for this       |
|                                  |     Capture Response Rule to be  |
|                                  |     executed.                    |
|                                  | -   EQ = equal, NE = not equal,  |
|                                  |     GT = greater than, LT = less |
|                                  |     than, GE = greater than or   |
|                                  |     equal, LE = less than or     |
|                                  |     equal, \*\* = contains (as   |
|                                  |     in, the Comp reference value |
|                                  |     contains the Compare data    |
|                                  |     anywhere within the Comp     |
|                                  |     reference value string).     |
+----------------------------------+----------------------------------+
| Capture length                   | This is a protected field that   |
|                                  | shows the length specified for   |
|                                  | the captured data. The value     |
|                                  | will appear in Copy and Change   |
|                                  | mode. In Add (Create) mode, a    |
|                                  | value will be supplied if the    |
|                                  | F4=Prompt key is used to select  |
|                                  | a valid Capture ID and Sequence. |
|                                  | Use this field as a reference    |
|                                  | when defining the Compare data.  |
+----------------------------------+----------------------------------+
| Compare data lines 1-5;          | -   The compare data is used to  |
|                                  |     match with the original      |
| PagDown=6-24                     |     capture data according to    |
|                                  |     the compare rule. The        |
|                                  |     compare data may be typed    |
|                                  |     directly into this field.    |
|                                  |     Use PageDown to show and     |
|                                  |     update lines 6-24; lines 1-5 |
|                                  |     only appear on the main      |
|                                  |     maintenance screen. Up to    |
|                                  |     1920 characters may be       |
|                                  |     specified.                   |
|                                  | -   If it should be desired to   |
|                                  |     compare an entire 24 X 80    |
|                                  |     screen, that is, all 1920    |
|                                  |     characters, it would be      |
|                                  |     possible to copy and paste   |
|                                  |     the reference screen image   |
|                                  |     (lines 1-5 separately from   |
|                                  |     lines 6-24) into this field. |
|                                  |     However, keep in mind that   |
|                                  |     only the displayable         |
|                                  |     characters are compared.     |
|                                  |     That is, field attributes    |
|                                  |     such as color (and any EBCID |
|                                  |     character value less than    |
|                                  |     X\'40\') will not be         |
|                                  |     considered; a space          |
|                                  |     character is used in place   |
|                                  |     of non-display values.       |
|                                  | -   Special values may be typed  |
|                                  |     into this field, instead of  |
|                                  |     actual compare data:         |
|                                  | -   \*ANY = No comparison will   |
|                                  |     be performed. A command or   |
|                                  |     group of commands associated |
|                                  |     with compare data value of   |
|                                  |     \*ANY will always be         |
|                                  |     executed.                    |
|                                  | -   \*PARM = Reserved for the    |
|                                  |     SCANSPLF command. This means |
|                                  |     that the compare data to be  |
|                                  |     used is the same as the      |
|                                  |     parameter value supplied     |
|                                  |     with the SCANSPLF command,   |
|                                  |     except that the Compare      |
|                                  |     rules supplied with this     |
|                                  |     response record will apply.  |
|                                  |     If this value is used with   |
|                                  |     an Operator Replay screen    |
|                                  |     data capture, it has the     |
|                                  |     same effect as \*ANY.        |
|                                  | -   DynVar = This prompting      |
|                                  |     value indicates that one or  |
|                                  |     more Dynamic Variable tokens |
|                                  |     may be typed into the        |
|                                  |     Compare data lines. DO NOT   |
|                                  |     TYPE \"DynVar\" into the     |
|                                  |     Compare data. Instead, type  |
|                                  |     the Dynamic Variable token   |
|                                  |     syntax, which by default     |
|                                  |     looks like this:             |
|                                  | -   One or more dynamic          |
|                                  |     variables may be typed along |
|                                  |     with other actual compare    |
|                                  |     data. When the response rule |
|                                  |     is qualified for execution,  |
|                                  |     the dynamic variable value   |
|                                  |     will be retrieved just       |
|                                  |     before the comparison        |
|                                  |     operation is performed. Keep |
|                                  |     in mind that the result of   |
|                                  |     replacing a dynamic variable |
|                                  |     may be longer or shorter     |
|                                  |     than the dynamic variable    |
|                                  |     token. It is important to    |
|                                  |     anticipate the exact length  |
|                                  |     and content of the compare   |
|                                  |     data line(s) as they will    |
|                                  |     look after dynamic variable  |
|                                  |     tokens are replaced. (For    |
|                                  |     more information about       |
|                                  |     Dynamic Variables, refer to  |
|                                  |     [Job Tracking and            | |                                  |     Queuing](Job-Tracking%     |
|                                  | 20and-Queuing.md#top){.MCXref |
|                                  |     .xref}.)                     |
+----------------------------------+----------------------------------+

:  

##### Functions

-   **F3=Exit**: Return to the LSAM menu.
-   **F4=Prompt**: When the cursor is positioned in the Capture
    identifier or Capture sequence fields, a window appears for
    selecting from a list of available capture identifiers. The contents
    of the list depends on whether this display is being used for
    Operator Replay screen data capture, or for SCANSPLF report data
    capture.
-   **F5=Refresh**: Reload the maintenance display with the original
    default values for Add, Copy or Change, discarding any new typed
    input.
-   **F8=DynVar**: Open a window to select an available Dynamic
    Variable, for use in the Response Command or the Compare Data
    fields.
-   **F9=Event cmds**: Open a window to select from a list of available
    LSAM Event commands, to be inserted into the Response Command field
    after the Event command fields are filled in. (Refer to discussion
    below about using OpCon property (variable) tokens with Event
    commands.)
-   **F12=Cancel**: Return to the Work with Capture Response Rules list
    display.
-   **F13=Full CMD**: Branch to a sub-display that uses the whole screen
    to show the entire available space for entering long command text
    strings. Any data entered on the short (part 1) command entry line
    will be carried forward for display on the full command entry
    screen. After returning from the full entry screen, the first 214
    characters of the longer command will appear in the short (part 1)
    Response cmd field.
-   **F24=More keys**: Change function key line to show additional
    supported keys.

#### LSAM Event Commands and OpCon/xps Property Tokens

The response command line supports execution of LSAM Event commands,
just like any other IBM i command. But Event commands have additional
support. The function key \<**F9**\> can be used to select from a list
of available Event commands and then to have their keyword fields
automatically prompted. When an Event command is placed into the
response command line, and only for Event commands, the LSAM programs
will support embedded OpCon/xps property (variable) tokens.

 

The feature of including OpCon/xps property tokens in an LSAM Event
command is described in complete detail in the topic about Message
Management. Look for references to the Event command line of the Message
Management Parameter screen. In that topic there is a complete table of
the specific OpCon/xps property (variable) token values that can be
supported directly by the LSAM itself, if a certain syntax is used. In
general, any OpCon/xps property token could be used because the LSAM
passes along the Event command string with the OpCon/xps property tokens
in tact, signaling the OpCon/xps server programs to translate the tokens
into the values that are stored in the OpCon/xps database.

## Display Captured Data Log

The function for displaying the captured data log is important as an
auditing tool. This inquiry provides evidence of the data that was
actually captured from either a display screen during an Operator Replay
script execution, or from a report line during the use of the SCANSPLF
command.

-   **Screen Title**: Display Captured Data Log
-   **Screen ID**: OPRL40R1

The same data capture response functions support both Screen data
capture for Operator Replay and report data capture for the SCANSPLF
utility command. Some of the following description includes information
that is useful in distinguishing between the two different types of data
capture. Each actual data capture definition and the captured data
record are labeled by their Type field, where \"C\" = screen capture,
\"S\" = spool file capture and \'M\' = Message data.

 

Refer to the How To discussions above in this topic for more information
about ways to use data capture and captured data response rules.

##### Menu Pathways

Main Menu \> Operator replay menu (\#4) \> Display Captured Data log
(\#8).

##### Fields

  Field             Description
  ----------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Subset to Type:   When this list display has been called directly from the menu, the LSAM menu passes a parameter to signal the program whether the call came from the Operator Replay menu (Type = Screen), or from the Events and Utilities Menu (Type = SCANSPLF). Function key F15 can be used to force a change to the Subtype, or to remove subsetting and show all Response rules of both types.
  Search content    Type a value in this field and press \<**Enter**\> or \<**F16**\> to initiate a search for a record that has matching data anywhere in the record, including data that might not appear on the list display (but the matching data would appear in the display of the detail of the record). When \<**F16**\> is pressed a second time, the search continues from after the last matching record, using the same Search content data. Press \<**Enter**\> a second time (with no options typed), or press \<**F5=Refresh**\> to start a new search.
  Opt               Type option from list displayed near the top of this screen. Refer to options definitions, below.
  Capture ID        A label that groups together all of the data capture rules that apply to a single Operator Replay script Sequence number. (This field is more important when data capture is used with the SCANSPLF command, and only serves Operator Replay screen capture as a useful means of labeling captured data when it appears in the captured data debug log file list, or when prompting for a Capture ID from Response Rules.)
  Seq               The sequence of the data capture rule. This number determines the order in which data capture rules are executed. The effect of this sequence number is more noticeable when there are captured data response rules associated with each data capture definition, in that it imposes a high level of control over the sequence of response rules that might apply to a given screen format (or to a SCANSPLF spool file).
  MM-DD-HH.MM       A portion of the time stamp of the log entry, showing the month, day, hours and minutes.
  T                 Type: C = screen capture, S = SCANSPLF data capture.
  Script/SPLF       The name of the Operator Replay Script, or the name of the spool file that was processed by the SCANSPLF command. The value shown here is defined by the value in the T (Type) field.
  Number            For an Operator Replay Script, the Sequence number of the step when the screen data was captured. For a spool file, the spool file number within the job where the spool file was found.
  JobNbr            The IBM i Job Number of the job that executed the Operator Replay script or the SCANSPLF command. This number helps to distinguish among list entries that belong to the same, or to different jobs.

  :  

##### Functions

-   **F3=Exit**: Return to the LSAM menu.
-   **F5=Refresh**: Reload the list display with the latest data from
    the master file.
-   **F12=Cancel**: Return to the LSAM menu.
-   **F15=Subset**: Supports a change to the type of captured data
    entries appearing in the list. The Subset window offers a choice of
    Type C = screen capture response rules, or S = SCANSPLF data capture
    response rules.
-   **F16=Search next**: When a search argument has been entered in the
    Search content field, pressing F16 can either start a new search (if
    the content value was changed) or it can continue a search to look
    for the next list entry that matches the search argument, starting
    with the first record after the last match found.
-   **F17=Top**: Reposition the list display to show the first record in
    the list.
-   **F18=Bottom**: Reposition the list display to show the last record
    in the list.
-   **F24=More keys**: Change the function key line to show additional
    supported keys.

##### Options

-   **5=Display**: To display record details, type 5 next to each
    record. Press \<**Enter**\> to proceed to the display details
    screen. Typing option 5 next to many or all records at once before
    pressing \<**Enter**\> is a convenient way to review all the
    definition details at once. Press \<**Enter**\> to advance as each
    detail screen is presented.
-   **9=WRKJOB**: Calls the IBM i Work with Job function for the job
    number that appears in the list. This function can help find output
    produced by a captured data response rule, or it can help find the
    spool file that was scanned by the SCANSPLF command.

### Display Captured Data Log Detail

-   **Screen Title**: Display Captured Data Log Detail
-   **Screen ID**: OPRL40R5

##### Menu Pathways

Main Menu \> Events and Utilities menu (\#3) \> Display Captured Data
log (\#8) \> option 5=Display.

##### Fields

+------------------------+--------------------------------------------+
| Field                  | Description                                |
+========================+============================================+
| Log record RRN         | This is the relative record number from    |
|                        | physical file OPRLOGF40                    |
+------------------------+--------------------------------------------+
| Type                   | C = Operator Replay screen data capture    |
|                        |                                            |
|                        | S = SCANSPLF report spool file scanning    |
|                        |                                            |
|                        | M = Message data capture                   |
+------------------------+--------------------------------------------+
| Capture ID:            | The identifier assigned to a group of data |
|                        | capture rules. For Operator Replay screen  |
|                        | data capture, this label is in addition to |
|                        | the Script Name and Sequence number. For   |
|                        | the SCANSPLF command, this is the          |
|                        | Application ID.                            |
+------------------------+--------------------------------------------+
| (Capture) Seq:         | The sequence number assigned to the data   |
|                        | capture definition, representing the order |
|                        | of capture within the Capture ID.          |
+------------------------+--------------------------------------------+
| Page                   | This field is not used by Operator Replay  |
|                        | screen data capture. For the SCANSPLF      |
|                        | command, this documents the page of the    |
|                        | report where the captured data was found.  |
+------------------------+--------------------------------------------+
| Rpt Line               | For the SCANSPLF command, this is the      |
|                        | report line, within a page, where data was |
|                        | found and captured.                        |
+------------------------+--------------------------------------------+
| Col(-umn)              | The column within the Row where the data   |
|                        | capture started.                           |
+------------------------+--------------------------------------------+
| Length                 | The length of data that was captured,      |
|                        | starting at the Row and Col specified. For |
|                        | Operator Replay screen data, up to 1920    |
|                        | characters of displayable data may be      |
|                        | captured by a single capture rule. (For    |
|                        | display formats larger than 24 X 80, more  |
|                        | than one screen capture rule would be      |
|                        | required to capture more than 1920         |
|                        | characters of data. For the SCANSPLF       |
|                        | command, the capture length is normally    |
|                        | limited to 132 characters, or one print    |
|                        | line of data.)                             |
+------------------------+--------------------------------------------+
| Capture Job ID         | The IBM i full job name that made the      |
|                        | Captured Data log entry. This is the job   |
|                        | that will be shown if the function key     |
|                        | F9=WRKJOB is pressed.                      |
+------------------------+--------------------------------------------+
| Date                   | The log file entry date, in CCYYMMDD       |
|                        | format. Used to purge the log file, based  |
|                        | on the LSAM log file retention days (refer |
|                        | to LSAM Parameters).                       |
+------------------------+--------------------------------------------+
| Time stamp             | The IBM i system time when the log entry   |
|                        | was written.                               |
+------------------------+--------------------------------------------+
| SPLF Name              | The spool file name scanned by the         |
|                        | SCANSPLF command.                          |
+------------------------+--------------------------------------------+
| SPLF number            | The Spool File Number of the spool file    |
|                        | named within the job that qualified for    |
|                        | the SCANSPLF command.                      |
+------------------------+--------------------------------------------+
| SPLF SrcJob            | The name of the job specified for the      |
|                        | SCANSPLF command. When the SCANSPLF        |
|                        | command was executed by the LSAM for the   |
|                        | special purpose of evaluating an           |
|                        | OpCon-requested job completion status,     |
|                        | this field will show a value of            |
|                        | \'\*JORS.\'                                |
+------------------------+--------------------------------------------+
| Numeric                | Y = yes, N = No: Indicates whether numeric |
|                        | data compression was specified for the     |
|                        | captured data.                             |
+------------------------+--------------------------------------------+
| Rows 1-12:             | The row and columns of the capture data    |
|                        | are labeled. Press PageDown or PageUp to   |
| Rows 13-24:            | toggle between the display of rows 1-12    |
|                        | and 13-24. Either eye vision, or           |
| 2..5\...10\....5\...20 | manipulation of the cursor may be used to  |
|                        | help identify the exact column for each    |
|                        | character of captured data, based on the   |
|                        | numbered ruler line just above the first   |
|                        | line of captured data. The ruler starts    |
|                        | with number 2 and ends with number 78 (due |
|                        | to 5250 workstation display constraints),  |
|                        | however, the actual captured data occupies |
|                        | columns 1 to 80 on the lines below the     |
|                        | ruler. Thus, workstations that display the |
|                        | column location of the cursor should match |
|                        | the character location in the ruler line.  |
+------------------------+--------------------------------------------+

:  

##### Functions

-   **PageDown/Up**: Use the PageDown and PageUp function keys to toggle
    the display of captured data between lines 1-12 and 13-24.
-   **F3=Exit**: Return to the LSAM menu.
-   **F9=WRKJOB**: Branch to the IBM i Work with job menu, to display
    detailed information about the IBM i Job ID named in the display
    panel.
-   **F12=Cancel**: Return to the list of log entries.

## Display Data Capture Debug Log

The function is not documented in detail because it is meant for use by
trained analysts or programmers already familiar with the operation of
the Capture Data and Capture Response Rules programs. The log entries
that may be observed in this display may seem apparent to users familiar
with data capture and response.

 

LSAM menu 3. Events and Utilities Menu, contains option 7. LSAM Utility
configuration, where a flag may be set to turn on debug logging for all
of the LSAM data capture and captured data response actions. This debug
logging supports both Operator Replay screen data capture as well as the
SCANSPLF command. The debug log entries would prove exactly when the
system captured data, when it processed Dynamic Variables and which
response rules were executed.

 

The debugging feature could be turned off for better performance in
systems that do not require extensive audit logging or debugging of any
problems. On the other hand, debug logging should be turned on when
extensive system audit support is required, because the debug log
provides detailed evidence of all automated operations.

 

If technical support is needed for apparent problems with either
capturing data or executing response rules, turn on the debug function
in LSAM menu 3. After attempting execution of the Operator Replay
script, or the SCANSPLF command that is causing trouble, use the SMASUP
log file extract command to retrieve the debug log information and send
the resulting save file from library SMALOG to SMA Support for
assistance. (Refer to [Operation of Extracting LSAM Log and Master Files](Log-File-and-Database-Management.md#Operatio) for more information about how to use the SMASUP command.)

 

Following is a table of Entry_Code values that may be observed in the
list of debug log entries. These entry labels help to identify the
action that was performed and/or the result of data capture and captured
data response rules. Some of the codes reflect a failure in which case
the log entry will appear red in color.

+-----------------+---------------------------------------------------+
| Entry_Code      | Description                                       |
+=================+===================================================+
|                 | **SCANSPLF command log entries**                  |
+-----------------+---------------------------------------------------+
| SCANSPLFST      | The SCANSPLF command has started its function.    |
+-----------------+---------------------------------------------------+
| SCAN_PARMS      | The PARAMETERS keyword value string sent to the   |
|                 | program by the SCANSPLF command.                  |
+-----------------+---------------------------------------------------+
| PARM_COUNT      | A log entry indicating the number of scan values  |
|                 | found in the input parameter after parsing the    |
|                 | PARAMETERS keyword value of the SCANSPLF command. |
|                 | This entry may show that no input scan values     |
|                 | were submitted, but that the program will         |
|                 | continue to use any registered scan values found  |
|                 | in the SPLF Scan Rules table.                     |
+-----------------+---------------------------------------------------+
| PARSE_PARM      | A log entry showing how the results after         |
|                 | scanning the PARAMETERS keyword value of input    |
|                 | scan values. The details entry shows the contents |
|                 | of the array where the input scan values are      |
|                 | divided into even-spaced locations.               |
+-----------------+---------------------------------------------------+
| SCANSPLFOC      | A separate \"occurrence\" or group of Scan Rules  |
|                 | is set up for each unique SPLF + Job Name + SPLF  |
|                 | Number found among the rules under a single       |
|                 | Application code. This log entry documents each   |
|                 | unique set of Scan Rule keys that is found in the |
|                 | rules file for a job.                             |
+-----------------+---------------------------------------------------+
| NoRulR          | SCANSPLF command has found no required rules      |
|                 | among the Scan Rules for this Application         |
|                 | (possibly also limited to a specific Spool File   |
|                 | and/or Job Name, SPLNBR).                         |
+-----------------+---------------------------------------------------+
| SCANSPLF_J      | A log entry showing information about the actual  |
|                 | job selected while searching for the target spool |
|                 | file.                                             |
+-----------------+---------------------------------------------------+
| SCANSPLF_F      | A log entry showing information about the actual  |
|                 | spool file (report) found for scanning.           |
+-----------------+---------------------------------------------------+
| SCAN_MATCH      | A log entry showing one of the require scan       |
|                 | values that was matched in the scanned report.    |
+-----------------+---------------------------------------------------+
| SCAN_NOMCH      | A log entry showing one of the required scan      |
|                 | values that was not matched in the scanned        |
|                 | report.                                           |
+-----------------+---------------------------------------------------+
| SCAN_BYPAS      | A scan value bypass rule registered in the SPLF   |
|                 | Scan Rules table was found and recognized. This   |
|                 | scan value will be marked as matched, even though |
|                 | bypassed.                                         |
+-----------------+---------------------------------------------------+
| SCANSPLF_E      | A fatal error was encountered and the SCANSPLF    |
|                 | command has not completed its function. Refer to  |
|                 | the log entry detail for a status code and more   |
|                 | information about the reason for the failure.     |
+-----------------+---------------------------------------------------+
| SCAN_PASS       | A successful match of all required scan values;   |
|                 | the SCANSPLF command ends normally.               |
+-----------------+---------------------------------------------------+
| SCAN_FAIL       | Not all required scan values were matched; the    |
|                 | SCANSPLF ends abnormally and, if started by       |
|                 | OpCon/xps, a list of mismatched values is sent to |
|                 | the OpCon/xps job information.                    |
+-----------------+---------------------------------------------------+
| SCANSPLFEN      | Marks the normal end of the SCANSPLF command. A   |
|                 | final completion status code may be found in the  |
|                 | details of this log entry.                        |
+-----------------+---------------------------------------------------+
| SCAN_ABEND      | -   The SCANSPLF command processor has reported a |
|                 |     failure.                                      |
|                 | -   If this failure was unexpected, the abnormal  |
|                 |     termination code is found in the log entry    |
|                 |     details.                                      |
|                 | -   This entry may also reflect the program\'s    |
|                 |     intentional forced abnormal termination due   |
|                 |     to the combination of the FAILOPT command     |
|                 |     parameter and the set of required Scan Rules  |
|                 |     that were executed.                           |
+-----------------+---------------------------------------------------+
| SCAN_LOG        | A program debug entry providing non-critical,     |
|                 | general information about conditions detected by  |
|                 | the SCANSPLFR program. Refer to the entry details |
|                 | for more information.                             |
+-----------------+---------------------------------------------------+
| SCAN_MATCH      | A log entry registering a matched scan value.     |
+-----------------+---------------------------------------------------+
| SCAN_LBLNO      | An indicated scan label was found, but the        |
|                 | associated value after the label did not match    |
|                 | the supplied scan reference value.                |
+-----------------+---------------------------------------------------+
| FAIL_1, FAIL_2, | -   Logs a record of the fact that the final      |
|                 |     result of a SCANSPLF execution was controlled |
| FAIL_4, FAIL_5  |     by the FAILOPT parameter set to a value of    |
|                 |     1 - 5, indicating that required rules were    |
|                 |     either matched or not matched and that this   |
|                 |     condition was interpreted as requiring a      |
|                 |     forced task failure.                          |
|                 | -   These same log entry values are also used by  |
|                 |     the SCANOUTQ command, reflecting the          |
|                 |     evaluation of all executed SCANSPLF commands. |
+-----------------+---------------------------------------------------+
| PASS_1, PASS_2, | -   Logs a record of the fact that the final      |
|                 |     result of a SCANSPLF execution was controlled |
| PASS_3,         |     by the FAILOPT parameter set to a value of    |
|                 |     1 - 5, indicating that required rules were    |
| PASS_4, PASS_5  |     matched, not matched or ignored, and that     |
|                 |     this condition was interpreted as requiring   |
|                 |     the task to end normally.                     |
|                 | -   These same log entry values are also used by  |
|                 |     the SCANOUTQ command, reflecting the          |
|                 |     evaluation of all executed SCANSPLF commands. |
+-----------------+---------------------------------------------------+
| SCANOUTQST      | The SCANOUTQ command has started a new task,      |
|                 | using the command parameters reported in this log |
|                 | entry.                                            |
+-----------------+---------------------------------------------------+
| SCANOUTQPA      | A log entry listing the contents of the command   |
|                 | PARAMETERS keyword. This value set is simply      |
|                 | passed along to each execution of the SCANSPLF    |
|                 | command.                                          |
+-----------------+---------------------------------------------------+
| SCANOUTQ_E      | The command has detected an illogical condition   |
|                 | or program error that prevents the task from      |
|                 | being completed. Refer to the log entry for an    |
|                 | explanation.                                      |
+-----------------+---------------------------------------------------+
| SCANOUTQ_S      | A log entry recording the syntax of each SCANSPLF |
|                 | command to be executed.                           |
+-----------------+---------------------------------------------------+
| SCANOUTQ_F      | This entry records the final failed (abnormal)    |
|                 | completion status of a SCANSPLF command.          |
+-----------------+---------------------------------------------------+
| SCANOUTQ_P      | This entry records the final passed (normal)      |
|                 | completion status of a SCANSPLF command.          |
+-----------------+---------------------------------------------------+
| SCANOUTQ_L      | A general log entry made by the SCANOUTQ command, |
|                 | including information such as the replacement of  |
|                 | a Dynamic Variable.                               |
+-----------------+---------------------------------------------------+
| SCANOUTQEN      | This entry marks the normal end of the SCANOUTQ   |
|                 | command. The log entry may also provide a         |
|                 | completion status code.                           |
+-----------------+---------------------------------------------------+
| SCANOUTQAB      | -   This entry marks the final abnormal           |
|                 |     completion of the SCANOUTQ command.           |
|                 | -   The command may have forced the abnormal end  |
|                 |     according to the FAILOUTQ parameter flag      |
|                 |     setting, based on the results of all SCANSPLF |
|                 |     commands executed.                            |
|                 | -   Refer to previous entries for indication of a |
|                 |     program failure, meaning that the command     |
|                 |     could not complete its entire task.           |
+-----------------+---------------------------------------------------+
|                 | **Operator Replay script entries for data capture |
|                 | operations**                                      |
+-----------------+---------------------------------------------------+
| CAPTDATA        | A log entry recording the data captured from a    |
|                 | screen image.                                     |
+-----------------+---------------------------------------------------+
| CAPTERR         | A log entry reporting a program error code        |
|                 | encountered while attempting to capture screen    |
|                 | data. Refer to the log entry details for the      |
|                 | exact error message that was trapped.             |
+-----------------+---------------------------------------------------+
|                 | **Message Data entries for data capture           |
|                 | operations**                                      |
+-----------------+---------------------------------------------------+
| M_MSG_BUF       | The log entry shows the message data buffer used  |
|                 | for data capture. The buffer may contain only the |
|                 | primary message text, only the secondary (Help)   |
|                 | message text, or both text types concatenated     |
|                 | with one space character between them.            |
+-----------------+---------------------------------------------------+
| M_CAPTURE       | The log entry shows the portion of data that was  |
|                 | captured from the message text buffer. This data  |
|                 | would be referred to, for example, when the       |
|                 | special value of \*CAPT is used in a Captured     |
|                 | Data Response Rule.                               |
+-----------------+---------------------------------------------------+
| M_CAPTRSPE      | An error occurred during the attempt to process   |
|                 | Captured Data Response Rules after some Message   |
|                 | Data was captured.                                |
+-----------------+---------------------------------------------------+
| M_DYNV_ERR      | A Dynamic Variable token could not be replaced    |
|                 | during the processing of Message Data capture.    |
+-----------------+---------------------------------------------------+
| M_DYNV_PRE      | During Message Data capture, the string that      |
|                 | contains a Dynamic Variable token before the      |
|                 | token is replaced. This is the string that        |
|                 | contains an optional Scan Label that will be used |
|                 | to identify the message data desired for capture. |
+-----------------+---------------------------------------------------+
| M_DYNV_RPL      | During Message Data capture, the string value     |
|                 | after a Dynamic Variable token was replaced.      |
+-----------------+---------------------------------------------------+
|                 | **Common entries for Captured Data Response Rule  |
|                 | processing**                                      |
+-----------------+---------------------------------------------------+
| RESPCMD0        | Documents the original response command string    |
|                 | from the rules record, before processing any      |
|                 | embedded variables.                               |
+-----------------+---------------------------------------------------+
| RESPCMD1        | Documents the response command string after any   |
|                 | Dynamic Variables were replaced.                  |
+-----------------+---------------------------------------------------+
| RESPDATA        | The log entry details show the profile of the     |
|                 | Captured Data Response Rule that was processed    |
|                 | successfully. The details also include the final  |
|                 | form of the response command, including           |
|                 | resolution of any variable values.                |
+-----------------+---------------------------------------------------+
| RESPERR         | The captured data response rule processor module  |
|                 | is reporting an error encountered during          |
|                 | processing. The response rule was probably not    |
|                 | completed. Refer to the log entry for details     |
|                 | about the error. The details also include a       |
|                 | profile of the Captured Data Response Rule that   |
|                 | was being processed.                              |
+-----------------+---------------------------------------------------+
| ADDRPYTOK       | Log of the command that sets an Operator Replay   |
|                 | Token variable value, based on that field in the  |
|                 | Response Rule record.                             |
+-----------------+---------------------------------------------------+
| OVARERR         | Documents an error that occurred when the         |
|                 | ADDRPYTOK command was executed.                   |
+-----------------+---------------------------------------------------+
| SETDYNVAR       | Log of the command that sets a Dynamic Variable   |
|                 | value, based on that field in the Response Rule   |
|                 | record.                                           |
+-----------------+---------------------------------------------------+
| DVARERR         | Documents an error that occurred when the         |
|                 | SETDYNVAR command was executed.                   |
+-----------------+---------------------------------------------------+

: Entry_Code Value Appearing in Captured Data Debug Log Viewer

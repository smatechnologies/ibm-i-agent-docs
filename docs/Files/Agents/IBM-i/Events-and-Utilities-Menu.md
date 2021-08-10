---
lang: en-us
title: Events and Utilities Menu
viewport: width=device-width, initial-scale=1.0
---

# []{#aanchor19} Events and Utilities Menu 
  -------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [Before OpCon event commands can be sent, a user id and password must be defined. Please refer to the section below describing the External Event Password.]
  -------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Event and Utilities Menu

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------
  [SYSTEMNAME]{style="color: #008000;"}                  EVENTS AND UTILITIES MENU                   [00/00/00]{style="color: #008000;"}   [USERNAME                                                                17:08:19]{style="color: #008000;"}
   
   Select one of the following:
   
   
       1.[ Event Management]{style="color: #008000;"}        2.[ External Event Password]{style="color: #008000;"}
       3.[ Work with SCANSPLF Applications]{style="color: #008000;"}        4.[ Work with SPLF Scan Rules]{style="color: #008000;"}
       5.[ Work with Captured Data Response Rules]{style="color: #008000;"}        6.[ Maintain dynamic variables]{style="color: #008000;"}
       7.[ LSAM Utility configuration]{style="color: #008000;"}        8.[ Display captured data log]{style="color: #008000;"}
       9.[ Display data capture debug log]{style="color: #008000;"}       10.[ Data Export/Import Utilities menu]{style="color: #008000;"}
      11.[ Client eMail Management menu]{style="color: #008000;"}    
  Selection or command
   ===\> \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
  \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
   F3=Exit   F4=Prompt   F9=Retrieve   F12=Cancel
   F13=Information Assistant   F16=System main menu
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------

###### Menu Pathways

Main Menu \> Events and Utilities (\#3)

###### Fields

Select or command

###### Options

-   1=Event Management
-   2=External Event Password
-   3=Work with SCANSPLF Applications
-   4=Work with SPLF Scan Rules
-   5=Work with Captured Data Response Rules
-   6=Maintain dynamic variables
-   7=LSAM Utility configuration
-   8=Display captured data log
-   9=Display data capture debug log
-   10=Data Export/Import Utilities menu (this is documented in [Copy     Files from Test to
    Production](Copy-Files-from-Test-to-Production.md#top){.MCXref
    .xref})
-   11=Client eMail Management menu
-   The options displayed on this menu are explained in the following
    sections of this document. Type an option number in the Selection or
    command line and press \<**Enter**\> to begin using any of the
    options.

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
    \<**F3**\> or \<**F12**\>. This function is not commonly used and
    can be restricted for certain user profiles.

## Events Operations

### Setting Up an Event User ID and Password

  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [The wrapping of the syntax in this document does not indicate the location of a carriage return; the ↵ indicates the location of a carriage return.]
  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

An LSAM screen now provides the user with the ability to easily send
external events to the SAM-SS for processing. In order to allow the LSAM
to send valid events to the SAM-SS, a valid user ID and password must be
defined to the LSAM.

 

[Define a Valid User ID and Password]{.ul} 
1.  In the command line, enter **SMAGPL/STRSMA**. For more information
    on STRSMA command parameters, refer to [The STRSMA     Command](Components-and-Operation.md#The).
2.  Enter **3** to choose the **Event management** menu in the SMA Main
    Menu.
3.  Enter **2** to choose the **External Event Password** option in the
    Event Menu.
4.  Enter a [valid OpCon/xps user]{.ul} for **User Name** in the next     menu.
5.  \<**Tab**\> to **Password** field and enter *a* [valid external     event password]{.ul} associated with the User Name above.
6.  \<**Tab**\> to second **Password** field and enter a [valid external     event password]{.ul} associated with the User Name above. This step
    confirms the password.

## Utilities Operations

### LSAM Utility Configuration

Use the following procedure to choose options for the behavior of
certain LSAM utilities.

 

[Update the LSAM Utility options control parameters]{.ul} 
1.  In the command line, enter **SMAGPL/STRSMA or LSAMENU**. For more
    information on STRSMA and LSAMENU command parameters, refer to [The     STRSMA Command](Components-and-Operation.md#The)
    and [The LSAMENU     Command](Components-and-Operation.md#The2).
2.  Enter **3** to choose the **Events and Utilities menu** in the SMA
    Main Menu.
3.  Enter **7** to choose **LSAM Utility configuration** in the Events
    and Utilities Menu.
4.  Type desired configuration option(s) in the LSAM Utilities
    Configuration screen.
5.  Press \<**Enter**\> to update the LSAM Parameters control record(s).

### SCANSPLF, SCANOUTQ and Captured Data Response Rules

The SCANSPLF utility is used to find and scan the content of reports,
stored in spool files in an IBM i output queue. Parameter definitions
(SPLF Scan Rules) must be predefined for the SCANSPLF utility command.
Optionally, Captured Data Response Rules may also be defined for each
element of data captured by the SCANSPLF utility. Sets of Scan Rules and
Captured Data Response Rules are grouped together by a label called an
Application. The SCANSPLF utility works with only one Application rule
set at a time and it determines a final positive or Positive result from
the scan task based on the one or more rules that comprise the
Application.

 

The SCANOUTQ utility supports alternate methods to identify one or more
spool files that should be scanned, working among the contents of a
specific output queue. To support SCANOUTQ, a SPLF Scan Rules
Application may include more than one spool file name. For each spool
file that qualifies according to the parameters of the SCANOUTQ command,
this utility will execute the SCANSPLF command and use the rules from
the specified Application that apply only to that spool file. As the
SCANOUTQ command completes, it reports a job pass or fail based on the
summary results of one or more SCANSPLF executions.

 

The LSAM capability to log captured data and execute Captured Data
Response Rules is also supported in the Operator Replay feature and by
Message Management. Some different methods for defining screen data
capture are described in the topic about Operator Replay, while
capturing message text elements is defined in the topic about Message
Management. This topic refers to how the common Response Rules are
engaged when using the SCANSPLF utility.

#### Configuring SCANSPLF (and SCANOUTQ) Rules

To use the SCANSPLF utility it is necessary to choose an Application ID
(APP) and to create one or more SPLF (spool file) scanning rules that
are assigned to this APP. A SPLF Scan Rule must be defined for each
discrete value that will be specified in the SCANSPLF command keyword
PARAMETERS string, although the SCANSPLF command also allows a special
PARAMETERS keyword value of \*RULES that waives the requirement for Scan
Rules to match the command PARAMETERS keyword values.

 

  -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [Previous versions of the LSAM required a separate Application ID master record. Now, the Application ID has become the primary key field of each Scan Rule master record. There is still a menu option to work with a list of unique Application IDs, but this is only a convenience tool for discovering sets of Scan Rules.]
  -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

[Adding a SCANSPLF Scan Rule from the LSAM Menu System]{.ul} 
1.  In the command line, enter **SMAGPL/STRSMA** or **LSAMENU**. For
    more information on command parameters, refer to [The STRSMA     Command](Components-and-Operation.md#The) and
    [The LSAMENU Command](Components-and-Operation.md#The2){.MCXref
    .xref}.
2.  Enter **3** to choose the **Events and Utilities menu** in the SMA
    Main Menu.
3.  Enter **4** to choose **Work with SPLF Scan Rules** in the Events
    and Utilities Menu.
4.  Press \<**F6**\> to Add a new spool file scanning rule.
5.  The **Create SPLF Scan Rule** screen appears.
6.  On the Create SPLF Scan Rule screen, type an Application ID, the
    spool file name, the job name, the spool file number and a sequence
    number (which must be unique within the Application). These are the
    key fields that identify each Scan Rule. Note that the spool file
    number and the job name have special (\*) values that can be used
    instead of specific values. Refer to [Add/Change/Copy SPLF Scan     Rule](#Add/Chan) for more information about how these
    field values may be used.
7.  Type the spool file scanning rules. Refer to [Add/Change/Copy SPLF     Scan Rule](#Add/Chan) for more information about how
    each field may be used.
8.  Press \<**Enter**\> to record the new SPLF Scan Rule record.

#### Adding Captured Data Response Rules

After a SPLF Scan Rule has been created, use the LSAM Menu 3, function
5: Work with Captured Data Response Rules, to add or modify captured
data response rule records.

 

[Adding a Data Capture Rule from the LSAM Menu System]{.ul} 
1.  In the command line, enter **STRSMA** or **LSAMENU**. For more
    information on command parameters, refer to [The STRSMA     Command](Components-and-Operation.md#The) and
    [The LSAMENU Command](Components-and-Operation.md#The2){.MCXref
    .xref}.
2.  Enter **3** to choose the **Events and Utilities menu** in the SMA
    Main Menu.
3.  Enter **5** to choose **Work with Captured Data Response Rules** in
    the Events and Utilities Menu.
4.  Press \<**F6**\> to Add a new Capture Response Rule record in the
    Work with Capture Response Rules screen.
5.  The **Create Capture Response Rule** screen appears.
6.  On the Create Capture Response Rule screen, type the Capture
    Identifier and Capture Sequence number, using an existing SCANSPLF
    Application ID and the number of one of the SPLF Scan Rules.
    Function key \<**F4**\> may be used to select a valid Application ID
    and Sequence number from a list window, as long as the Type field
    value has first been set to a value of \"S\" (= SCANSPLF data).
7.  Type a value of \'S\' (= SCANSPLF capture data) for the Type field.
    The setting of this field controls what data will appear in the
    prompt window when \<**F4**\> is pressed from either the Capture
    Identifier or the Capture Sequence number field.
8.  Assign a unique Response Sequence number to each response rule. The
    order of the sequence number determines which response rule will be
    executed first.
9.  Type a value for the Compare rule (refer to more information under
    [Add/Change/Copy Capture Response Rules](#Add/Chan2){.MCXref
    .xref}). A simple value set that allows a response rule to always
    execute is \"EQ\" (equal) to the compare data special value of
    \*ANY.
10. Type a Continuation field value if more than one comparison rule
    must apply. Otherwise, leave this field blank to specify one, simple
    response rule. (Refer to more information in [Add/Change/Copy     Capture Response Rules](#Add/Chan2).)
11. *(Optional)* Specify the names of a Dynamic Variable
    and/or an Operator Replay Token variable that will be used to store
    the captured data value.
12. Type a value for the Compress numeric field. Specify Y = yes if the
    captured and compare data values are numeric, otherwise specify N =
    no. This flag must correspond to the similar flag found on the
    associated SPLF Scan Rule master record.
13. Type the Response cmd (command) to execute if the compare data rule
    is matched. Use function key \<**F13**\> if the command string is
    longer than will fit in the (part 1) input field.
14. Type a value for the Compare data lines 1-5. Use function key
    \<**F8**\> if the compare data is longer than will fit into lines 1
    to 5, but do type the first 5 lines into this field before pressing
    \<**F8**\>. The special values of \*ANY, \*PARM, or \"DynVar\" may
    be used. (Refer to [Add/Change/Copy Capture Response     Rules](#Add/Chan2).)
15. The value for the Capture length field is supplied once a Capture
    Identifier and Capture Sequence number have been specified. This
    field will be loaded with a value if the F4=Prompt function key was
    used to select an existing Data Capture rule.
16. Press \<**Enter**\> to record the new Capture Response Rule record.
17. The system returns to an updated list of existing Capture Response
    Rule records.

## How LSAM Menu-based Utilities Work

There are many different kinds of utility programs and commands offered
with the IBM i LSAM software. Many of these are described in the topic
about Commands and Utilities. This section is devoted to the utilities
that are accessible from the LSAM sub-menu 3: Events and Utilities Menu.
The focus is on the SCANSPLF and SCANOUTQ utilities and related features
that can be used with them, including dynamic variables, data capture
and captured data response rules.

### The SCANSPLF Utility

The SCANSPLF(Scan spool file) is an LSAM utility command that can find
and read spool (report) files from an IBM i output queue. As the command
executes, it stores found scan values into the LSAM\'s data capture log
file. Captured data can optionally be associated with Captured Data
Response Rules. As the command completes, it evaluates whether all the
required scan values were found and it reports about any scan values
that were not matched. A parameter of the SCANSPLF command controls how
the command reports its ending status. It can finish with a forced
abnormal termination or a normal termination, based on the result of the
scan values evaluation and on the option selected for the command\'s
FAILOPT parameter.

 

The SCANSPLF command may be used as an interactive command from IBM i
command entry (if the interactive job includes the LSAM environment
library list) or as the Call command line text in an IBM i job on an
OpCon/xps schedule. A command parameter \"OPCONXPS\" must be set to
Y=yes or N=no, depending on the environment in which the command is
executed. It is important that this parameter be set to Y=yes to enable
cooperation with OpCon/xps, but the command will fail unless this option
is set to N=no when the command is executed outside of the control of an
OpCon/xps job.

 

This command submits a list of scan values in a parameter string
included as a keyword value with the command syntax, and the list of
scan values must match the predefined SPLF Scan Rules registered in the
LSAM database. There must be a number of SPLF Scan Rules with a Scan
Value set to \*PARM and with the required option set to Y=yes, that
equals the number of input values listed in the PARAMETERS keyword of
the SCANSPLF command. This set of Scan Rules must all be registered
using the same Application value as specified for the APP keyword of the
SCANSPLF command.

 

As the command completes, when it has been submitted from an OpCon/xps
schedule, it reports back details about the scan values matched or
mismatched. In addition, a completion message is sent to the OpCon/xps
SAM describing a successful, complete match of all SPLF Scan Rules or
any reason why the command has ended abnormally. This information is
available from the OpCon/xps view of the job using a right mouse click
context menu and selecting Job Configuration. From the Job Configuration
window that appears, the list of values for Operations Related
Information shows all of the messages that have been sent by SCANSPLF to
the SAM.

 

The FAILOPT parameter of the SCANSPLF command controls when the command
forces an abnormal termination. This option can be set to the default
behavior of ending abnormally when any required Scan Rule is not
matched, or it can be set to the reverse logic of forcing an abnormal
termination when all Scan Rules are matched (such as when the scan is
for an error code found in a job log report). Optionally, the command
can also be set to end normally regardless of the outcome of Scan Rules
matching.

 

When the SCANSPLF command driver program determines that the command
should end abnormally, the driver program ends with escape message code
RNX9001 (the standard message from an RPG program \*PSSR subroutine that
has ended at the \*CANCL exit point). This message is reported with the
job termination message code CEE9901. The job detail messages shown
under the OpCon/xps Job Information context menu tabs Configuration -\>
Operations Related Information -\> Job Detail Messages, will indicate
when this error message condition is expected, or if an unexpected
program error occurred.

 

One typical example of how the SCANSPLF utility can be used is with
financial transaction batch balancing procedures. Control totals may be
inserted as the SCANSPLF PARAMETERS scan values string and those values
can be matched to totals appearing on a batch posting report. This
application of the command enables automation of procedures that might
otherwise require human intervention. The optional logging feature
supports this process with entries that can be audited to prove that the
process worked correctly.

#### Processing Multiple Spool Files With SCANSPLF

The SCANSPLF command was originally constructed for the purpose of
locating a single spool file belonging to one job and scanning that
report for the content specified in the Scan Rules. However, with
careful manipulation of the command parameters it is possible to define
a single scan task that can span multiple spool files across multiple
jobs.

 

The capabilities and limitations of the SCANSPLF command for handling
multiple spool files are different from the SCANOUTQ command, described
below. Sometimes, the SCANOUTQ command might be more appropriate for
certain tasks.

 

One of the limitations of the SCANSPLF command is that it must be told
the job name(s) to use for identifying the spool file(s) to scan. The
name of the job can be supplied by either the Scan Rules or by the
JOBNBR parameter of the SCANSPLF command (where the JOBNBR parameter
actually supports more than just the IBM i job number - refer to the
table of fields for the prompted SCANSPLF command, below). If a Scan
Rule specifies \*CMD for the job name, and the SCANSPLF command provides
no value for the JOBNBR parameter, then the Scan Rule will be skipped
and a warning message will be added to the Captured Data Log file. If
all rules for the Application are skipped, then the SCANSPLF command
will fail for the reason that no valid job name could be determined.

 

Scan Rules always require a Spool File (SPLF) name. It is possible to
register more than one SPLF name within a single Application. This
capability was included primarily to support the SCANOUTQ command, but
it can also be used directly by the SCANSPLF command. No examples of
this capability are illustrated in this document, but possible
applications can be discovered by experimentation.

 

More importantly, it must be understood that if the SPLF parameter of
the SCANSPLF command is not left at the default value of \*APP (meaning
that the Scan Rules under the named APPlication will provide one or more
spool file names to scan), then the SCANSPLF command is, in effect,
limiting the current scan task to a subset of Scan Rules that match the
SPLF name provided by the command. The designed intention of allowing
SCANSPLF to use a subset of an Application\'s Scan Rules was to support
the way the SCANOUTQ command will execute the SCANSPLF command
separately for each spool file name that is registered to the
Application. In some cases, it may be useful to create a job that will
use only the Scan Rules for one spool file, even though the Application
had more SPLF names registered. Thus, the outcome of the SCANSPLF task
will be limited by only the rules for the one SPLF name, instead of
being subject to the rules for all the registered spool files.

 

When experimenting with the powerful flexibility of the SCANSPLF command
parameters, it will be helpful to carefully examine the content of the
Display Data Capture Debug Log file (LSAM sub-menu 3, function 9). This
log is only loaded with data when the LSAM Utility Configuration
function (sub-menu 3, function 7) has set the \"Capture data debug
logging\" flag to a value of Y=yes. Therefore, it would be important
that this flag be set to Y=yes until new SCANSPLF applications have been
proven reliable. After that, the debug log flag could be turned off in
order to improve system performance and reduce disk space utilization.
But please remember that this debug log file may also be useful for
auditing purposes. Some highly audited data centers may require that the
debug logging flag be left active at all times. In this case, the SMARGZ
command and/or the LSAM default file management parameters must be
configured to periodically backup and purge the log file so that it does
not consume large amounts of disk space. There are many log entries made
for each SCANSPLF task, especially when multiple spool files are being
scanned.

##### SCANSPLF Parameters and Rules Limitations

The SCANSPLF command supports up to 16 scan values in the PARAMETERS
keyword string, and each parameter value can be up to 64 characters
long. But the SPLF Scan Rules will support up to 32 rules overall, per
spool file + job name combination. A single Application code will
support up to 32 spool file + job name combinations, up to a limit of
999 rules per Application.

#### Using SCANSPLF to Determine OpCon Job Completion Status

It is possible to control the final job completion status that the IBM i
LSAM will report to OpCon SAM by adding the SCANSPLF command to the Call
command line of the OpCon job master record.

 

When the SCANSPLF command is included in the job Call command line after
a special character, the IBM i LSAM will withhold a report to OpCon/xps
about the job completion status until after it completes the evaluation
of the job log. This post-job log evaluation is only performed when the
original Call command of the job has completed normally; it will not be
performed for jobs that ended abnormally. For jobs that did complete
normally, the final completion status of the job that is reported to the
OpCon schedule will depend on the Scan Rules defined for this job name
and the spool file QPJOBLOG, under the Application ID specified with the
SCANSPLF command. Many Scan Rule options are available to control
whether a job will be reported as completed normally or failed.

 

When the SCANSPLF command is used along with additional SBMJOB job
parameters, the SCANSPLF command and its own parameters must follow any
job definition parameters. That is, the SCANSPLF command string must be
the last string of non-blank characters in the Call information field,
following the Job parameters separator character, as in the following
example:

 

+----------------------------------+----------------------------------+
| ![White pencil icon on green     | **EXAMPLE:**                     | | circular                         |                                  |
| background](../../../Reso        | WRKJOB JOB(\*) OUTPUT(\*PRINT)   |
| urces/Images/example-icon(48x48) | OPTION(\*ALL)\|CCSID(297)        |
| .png "Example icon") | SCANSPLF APP(ChkJobLog1)         |
+----------------------------------+----------------------------------+

 

Remember that the APP() keyword of the SCANSPLF command is
case-sensitive.

 

For important additional information about the special character that is
used to separate job parameters and the SCANSPLF command from the
primary Call information line values, please review IBM i LSAM
Configuration - \> Extended Discussion on Parameters -\> Job Parameters
Separator-HEX.

#### SCANSPLF Command Syntax

The SCANSPLF command entered in an IBM i command line, either from IBM i
or from the Call information in an IBM i job on an OpCon/xps schedule,
requires the syntax illustrated in the following example:

 

+----------------------------------+----------------------------------+
| ![White pencil icon on green     | **EXAMPLE:**                     | | circular                         |                                  |
| background](../../../Reso        | SCANSPLF APP(\'App ID: lower     |
| urces/Images/example-icon(48x48) | case and spl chars\')            |
| .png "Example icon") | DATE(20010101)                   |
|                                  |                                  |
|                                  | OPCONJOB(Y)                      |
|                                  | PARAMETERS(\'\*                  |
|                                  | empty\*:12345:\*empty\*:67890\') |
|                                  |                                  |
|                                  | JOBNBR(123456/username/jobname)  |
|                                  | FAILOPT(1) SPLF(\*APP)           |
|                                  |                                  |
|                                  | SPLNBR(\*APP) USRDTA(\*ALL)      |
|                                  | CMDMODE(\*CMD) USRDFNDTA(\*ALL)  |
|                                  |                                  |
|                                  | JOBLOGMSG(Y)                     |
+----------------------------------+----------------------------------+

 

The individual keywords are explained in a table following the screen
illustration below of this command prompted using function key
\<**F4**\> from IBM i command entry. Notice, above, that the APP and
PARAMETERS keyword values are enclosed in single quotes. These are
required in order to communicate space characters, numeric digits and
special characters as part of a single character string to the command
processor program.

 

There must be the same number of scan values, separated by colons, in
the PARAMETERS keyword as there are SPLF Scan Rules using a Scan Value
of \*PARM in the LSAM rules table. Also, each of the \*PARM Scan Rules
must be set as required (that is, the Required Rule field must be set to
Y = yes). However, the SCANSPLF command is allowed to also process
additional scan rules that specify a different Scan Value, such as a
directly-entered value or a Dynamic Variable (refer to the chapter about
[Dynamic Variables](Dynamic-Variables.md)). There is
also an option to create scan rules that simply capture report data,
using the value \*CAPT in the Scan Value field. The PARAMETERS keyword
supports a maximum of 16 parameter values, but each spool file name +
job name combination, within an Application, can include up to 32 Scan
Rules (implying that any required rules over 16 cannot be associated
with the command PARAMETERS).

 

Regardless of the type of Scan Value (registered in the Scan Rules), the
SCANSPLF command completion status (normal or failed) depends on all
required SPLF Scan Rules being matched. However, it is possible to also
specify Scan Rules that are not required, so that they do not affect the
outcome of the command but, perhaps, only enable the execution of a
Captured Data Response Rule. After the list of required scan rules has
been summarized and evaluated to determine if all matched or if any did
not match, the actual completion status of the SCANSPLF command is
determined by the FAILOPT parameter, as described in the command
parameters table, below.

 

The CMDMODE parameter keyword is provided for LSAM internal use only.
This keyword must be left at the default value of \*CMD whenever the
SCANSPLF command is used in a stand-alone mode, that is, from the IBM i
command entry screen or from within any batch job. There is an alternate
value supplied for this parameter by the LSAM job completion message
server job to support the option of appending the SCANSPLF command to
the OpCon/xps Call command line, so that the final job completion status
reported to the OpCon/xps SAM will be determined by the results of the
scan command.

Prompted SCANSPLF Command - Page 1 of 2

  ---------------------------------------------------------------------------------------------------------------------------
                                                  Scan Spool File (SCANSPLF)
                                                                
                                                   Type choices, press Enter.
                                                                
     Application (Capture ID) . . . . APP            [                              ]{style="text-decoration: underline;"}                 Date, as CCYYMMDD  . . . . . . . DATE           [        ]{style="text-decoration: underline;"}
                    OpCon/xps job? Y=yes, N=no . . . OPCONJOB       [Y]{style="text-decoration: underline;"}     \*RULES, or parms (P1:P2:\...Pn)   PARAMETERS     [\*RULES                        ]{style="text-decoration: underline;"}
                                                                                                       
                                                                                                       
                                                                                                       
                                                                                                       
                                                                                                       
                                                                                                       
                                                            \...    
     Job number (123456), optional  . JOBNBR         [                              ]{style="text-decoration: underline;"}                                                                 
                    Command fail behavior option . . FAILOPT        [1]{style="text-decoration: underline;"}               Spool file name or \*APP  . . . . SPLF           [\*APP      ]{style="text-decoration: underline;"}
                                                           More\...
                          F3=Exit   F4=Prompt   F5=Refresh   F12=Cancel   F13=How to use this display
                                                         F24=More keys
  ---------------------------------------------------------------------------------------------------------------------------

 

Prompted SCANSPLF Command - Page 2 of 2

  --------------------------------------------------------------------------------------------------------------------------
                                                  Scan Spool File (SCANSPLF)
                                                               
                                                  Type choices, press Enter.
                                                               
   Spool file number,if Rule \*ANY   SPLNBR         [\*APP      ]{style="text-decoration: underline;"}                                    User data  . . . . . . . . . . . USRDTA         [\*ALL      ]{style="text-decoration: underline;"}
             Command mode (always \*CMD) . . . CMDMODE        [\*CMD      ]{style="text-decoration: underline;"}     User-Defined Data (\*generic\*)  . USRDFNDATA     [\*ALL                       ]{style="text-decoration: underline;"}
      [                                                                           ]{style="text-decoration: underline;"}       [                                                                           ]{style="text-decoration: underline;"}
          [                                                                  ]{style="text-decoration: underline;"}                    Msg to job lob? Y/1=yes, N/0=no   JOBLOGMSG     [Y]{style="text-decoration: underline;"}
                                                                           INT_ONLY\_
                                                               
                                                            Bottom
                         F3=Exit   F4=Prompt   F5=Refresh   F12=Cancel   F13=How to use this display
                                                        F24=More keys
  --------------------------------------------------------------------------------------------------------------------------

###### Fields

+------------+---------+--------+-----------------------------------+
| Keyword    | Size    | Type   | Description                       |
+============+:=======:+:======:+===================================+
| APP        | 30      | \*CHAR | Value must be enclosed in single  |
|            |         |        | quotes. Type up to 30 characters. |
|            |         |        | Upper and lower case letters,     |
|            |         |        | numeric digits and special        |
|            |         |        | characters are allowed. Spaces    |
|            |         |        | are allowed but not recommended;  |
|            |         |        | use underline characters instead  |
|            |         |        | of spaces. This value must match  |
|            |         |        | an Application ID that has been   |
|            |         |        | registered using the LSAM Menu 3, |
|            |         |        | function 3.                       |
+------------+---------+--------+-----------------------------------+
| DATE       | 8.0     | \*DEC  | -   Optionally, specify a date in |
|            |         |        |     CCYYMMDD format, to identify  |
|            |         |        |     the processing date of the    |
|            |         |        |     target spool file. This value |
|            |         |        |     limits the list of jobs that  |
|            |         |        |     the SCANSPLF command will     |
|            |         |        |     search for the spool file. It |
|            |         |        |     is also used to specify the   |
|            |         |        |     Capture Date in the captured  |
|            |         |        |     data log file (OPRLOGF40)     |
|            |         |        |     where found values are        |
|            |         |        |     stored. If this value is left |
|            |         |        |     at zeros or not specified,    |
|            |         |        |     the current IBM i system date |
|            |         |        |     is assumed.                   |
|            |         |        | -   The command processor also    |
|            |         |        |     supports using the name of an |
|            |         |        |     LSAM Dynamic Variable in this |
|            |         |        |     field.                        |
+------------+---------+--------+-----------------------------------+
| OPCONXPS   | 1       | \*CHAR | -   [Y=yes]{.ul} (default), N=no. | |            |         |        |     Set this parameter to Y when  |
|            |         |        |     the SCANSPLF command will be  |
|            |         |        |     used in an OpCon/xps          |
|            |         |        |     scheduled job. Set this       |
|            |         |        |     parameter to N when the       |
|            |         |        |     command will be used from IBM |
|            |         |        |     i command entry or called by  |
|            |         |        |     a job originating outside of  |
|            |         |        |     OpCon/xps.                    |
|            |         |        | -   This parameter tells the      |
|            |         |        |     SCANSPLF command whether to   |
|            |         |        |     send completion messages to   |
|            |         |        |     OpCon/xps. These messages     |
|            |         |        |     cannot be used outside of the |
|            |         |        |     LSAM-to-OpCon/xps interface.  |
+------------+---------+--------+-----------------------------------+
| PARAMETERS | 1024    | \*CHAR | -   The entire value string must  |
|            |         |        |     be enclosed in a pair of      |
|            |         |        |     single quotes. Each scan      |
|            |         |        |     value is separated by the     |
|            |         |        |     colon (:) character. The      |
|            |         |        |     number of value strings       |
|            |         |        |     provided with this keyword    |
|            |         |        |     must equal the number of SPLF |
|            |         |        |     Scan Rules registered using   |
|            |         |        |     the LSAM menu 3, function 4,  |
|            |         |        |     that have \*PARM specified    |
|            |         |        |     for their Scan Value. There   |
|            |         |        |     can be up to 16 parameters in |
|            |         |        |     this string.                  |
|            |         |        | -   It is possible to include a   |
|            |         |        |     colon character as part of a  |
|            |         |        |     scan value if the scan value  |
|            |         |        |     is enclosed in single quotes. |
|            |         |        |     (To include single quotes     |
|            |         |        |     within the entire PARAMETERS  |
|            |         |        |     value string type two single  |
|            |         |        |     quotes together.)             |
|            |         |        | -   It is also possible to        |
|            |         |        |     include a single quote within |
|            |         |        |     a scan value by enclosing the |
|            |         |        |     scan value within single      |
|            |         |        |     quotes and by doubling        |
|            |         |        |     (again) the enclosed single   |
|            |         |        |     quote. However, this means    |
|            |         |        |     that the single quotes would  |
|            |         |        |     have to be twice doubled,     |
|            |         |        |     since they would be nested at |
|            |         |        |     a third level, so this would  |
|            |         |        |     be difficult to specify       |
|            |         |        |     correctly. Experimentation    |
|            |         |        |     may be required to achieve    |
|            |         |        |     the desired result.           |
|            |         |        | -   Special values that may be    |
|            |         |        |     used to indicate a scan value |
|            |         |        |     should be bypassed during a   |
|            |         |        |     given execution of the        |
|            |         |        |     command may be registered in  |
|            |         |        |     the LSAM SPLF Scan rules. In  |
|            |         |        |     the command syntax shown      |
|            |         |        |     above, the value              |
|            |         |        |     \'\*empty\*\' is used as an   |
|            |         |        |     example of a possible scan    |
|            |         |        |     value bypass value.           |
|            |         |        | -   The command processor also    |
|            |         |        |     supports using the name of an |
|            |         |        |     LSAM Dynamic Variable in this |
|            |         |        |     field.                        |
|            |         |        | -   Refer to Utility Screens and  |
|            |         |        |     Windows, later in this topic, |
|            |         |        |     for more information about    |
|            |         |        |     SPLF Scan Rules.              |
+------------+---------+--------+-----------------------------------+
| JOBNBR     | 28 (30) | \*CHAR | -   To direct the SCANSPLF to     |
|            |         |        |     find a specific job, type the |
|            |         |        |     IBM i job number (6 digits)   |
|            |         |        |     for this keyword value. If    |
|            |         |        |     this optional parameter value |
|            |         |        |     is not specified, the         |
|            |         |        |     SCANSPLF command will search  |
|            |         |        |     for the latest (most recent)  |
|            |         |        |     incidence of the Job Name     |
|            |         |        |     specified in the LSAM         |
|            |         |        |     SCANSPLF Application master   |
|            |         |        |     record.                       |
|            |         |        | -   It is also possible to        |
|            |         |        |     specify any or all of the     |
|            |         |        |     three parts of an IBM i job   |
|            |         |        |     ID by including one or two    |
|            |         |        |     forward slash characters. To  |
|            |         |        |     do this, the value must be    |
|            |         |        |     enclosed within single quotes |
|            |         |        |     in order to get the IBM i     |
|            |         |        |     command processor to accept   |
|            |         |        |     the slashes as part of the    |
|            |         |        |     job ID character string.      |
|            |         |        | -   To specify a whole IBM i job  |
|            |         |        |     ID, it is only necessary to   |
|            |         |        |     provide the 6-digit job       |
|            |         |        |     number because this number    |
|            |         |        |     implies the user name and the |
|            |         |        |     job name.                     |
|            |         |        | -   When specifying a user and/or |
|            |         |        |     job name without using a      |
|            |         |        |     specific job number, type one |
|            |         |        |     or two slashes using one of   |
|            |         |        |     the following models:         |
|            |         |        |     -   User only = \'/username\' |
|            |         |        |     -   Job name only =           |
|            |         |        |         \'//jobname\'             |
|            |         |        |     -   User and job name =       |
|            |         |        |         \'/username/jobname\'     |
|            |         |        |     -   The command processor     |
|            |         |        |         also supports using the   |
|            |         |        |         name of an LSAM Dynamic   |
|            |         |        |         Variable in this field.   |
+------------+---------+--------+-----------------------------------+
| FAILOPT    | 1       | \*CHAR | Controls the final completion     |
|            |         |        | status of the SCANSPLF command,   |
|            |         |        | affecting also the final status   |
|            |         |        | of a submitted job (such as jobs  |
|            |         |        | submitted by OpCon/xps) when the  |
|            |         |        | SCANSPLF command is the only step |
|            |         |        | in the job. Possible values       |
|            |         |        | include:                          |
|            |         |        |                                   |
|            |         |        | -   1 = force abnormal end when   |
|            |         |        |     ANY required scan rule was    |
|            |         |        |     NOT matched (ANY FAIL)        |
|            |         |        | -   2 = force abnormal end when   |
|            |         |        |     ANY required scan rules DO    |
|            |         |        |     match (ANY PASS)              |
|            |         |        | -   3 = force normal end          |
|            |         |        |     regardless of scan rule match |
|            |         |        |     outcome                       |
|            |         |        | -   4 = force abnormal            |
|            |         |        |     termination when ALL required |
|            |         |        |     scan rules are NOT matched    |
|            |         |        |     (ALL FAIL)                    |
|            |         |        | -   5 = force abnormal            |
|            |         |        |     termination when ALL required |
|            |         |        |     scan rules DO match (ALL      |
|            |         |        |     PASS)                         |
+------------+---------+--------+-----------------------------------+
| SPLF       | 10      | \*CHAR | Spool file name to scan:          |
|            |         |        |                                   |
|            |         |        | -   The \*APP special value       |
|            |         |        |     indicates that one or more    |
|            |         |        |     spool files registered to the |
|            |         |        |     APPlication in the Scan Rules |
|            |         |        |     will be the spool file names  |
|            |         |        |     to find and scan.             |
|            |         |        | -   To limit the scan task to     |
|            |         |        |     only one spool file name,     |
|            |         |        |     such as when more than one    |
|            |         |        |     SPLF was registered to the    |
|            |         |        |     same APP, type the full name  |
|            |         |        |     of the spool file in this     |
|            |         |        |     field.                        |
|            |         |        | -   The command processor also    |
|            |         |        |     supports using the name of an |
|            |         |        |     LSAM Dynamic Variable in this |
|            |         |        |     field.                        |
+------------+---------+--------+-----------------------------------+
| SPLNBR     | 10      | \*CHAR | Spool file number to scan:        |
|            |         |        |                                   |
|            |         |        | -   The \*APP special value       |
|            |         |        |     indicates that the            |
|            |         |        |     APPlication Scan Rules will   |
|            |         |        |     the limits on which spool     |
|            |         |        |     file number (of a job) to     |
|            |         |        |     find and scan.                |
|            |         |        | -   If the Scan Rules specify     |
|            |         |        |     \*ANY for the spool file      |
|            |         |        |     number, this parameter can be |
|            |         |        |     used to limit the current     |
|            |         |        |     task to any of the following  |
|            |         |        |     values that IBM i spool file  |
|            |         |        |     commands will support:        |
|            |         |        | -   1 - 999999, \*ONLY, \*LAST,   |
|            |         |        |     \*ANY                         |
|            |         |        | -   The command processor also    |
|            |         |        |     supports using the name of an |
|            |         |        |     LSAM Dynamic Variable in this |
|            |         |        |     field.                        |
+------------+---------+--------+-----------------------------------+
| USRDTA     | 10      | \*CHAR | -   This field can be used to     |
|            |         |        |     limit the spool file selected |
|            |         |        |     for scanning by its user data |
|            |         |        |     value.                        |
|            |         |        | -   The special value of \*ALL    |
|            |         |        |     means to accept a spool file  |
|            |         |        |     without checking the user     |
|            |         |        |     data value assigned to it.    |
|            |         |        | -   The command processor also    |
|            |         |        |     supports using the name of an |
|            |         |        |     LSAM Dynamic Variable in this |
|            |         |        |     field.                        |
+------------+---------+--------+-----------------------------------+
| CMDMODE    | 10      | \*CHAR | -   This parameter is intended    |
|            |         |        |     for LSAM internal user only.  |
|            |         |        | -   \*CMD = The SCANSPLF command  |
|            |         |        |     is being used alone, such as  |
|            |         |        |     execution from IBM i          |
|            |         |        |     interactive command entry or  |
|            |         |        |     as a step in a batch job.     |
|            |         |        | -   \*JORS = The SCANSPLF command |
|            |         |        |     was specified as an extension |
|            |         |        |     to the OpCon/xps job master   |
|            |         |        |     Call command line for the IBM |
|            |         |        |     i job. The job\'s job log     |
|            |         |        |     spool file will be scanned to |
|            |         |        |     determine the final           |
|            |         |        |     completion status of the job  |
|            |         |        |     that is reported to OpCon/xps |
|            |         |        |     SAM.                          |
+------------+---------+--------+-----------------------------------+
| USRDFNDTA  | 256     | \*CHAR | Use single quotes to enclose a    |
|            |         |        | string of data that should match  |
|            |         |        | the User Defined Data attributed  |
|            |         |        | of spool files that qualify for   |
|            |         |        | the command to process.           |
|            |         |        |                                   |
|            |         |        |                                   |
|            |         |        |                                   |
|            |         |        | \'\*GENERIC\*\'                   |
|            |         |        |                                   |
|            |         |        |                                   |
|            |         |        |                                   |
|            |         |        | Generic, or partial, values may   |
|            |         |        | be used. Type an asterisk at the  |
|            |         |        | beginning to indicate that any    |
|            |         |        | number of characters (or no       |
|            |         |        | characters) may precede the       |
|            |         |        | matching string. Type an asterisk |
|            |         |        | at the end to indicate that any   |
|            |         |        | number of characters (or no       |
|            |         |        | characters) may follow the        |
|            |         |        | matching string. Either or both   |
|            |         |        | of the asterisks may be used.     |
|            |         |        |                                   |
|            |         |        |                                   |
|            |         |        |                                   |
|            |         |        | If no asterisks are typed, then   |
|            |         |        | the character string in this      |
|            |         |        | parameter must match exactly and  |
|            |         |        | completely the User Defined Data  |
|            |         |        | attribute of a spool file.        |
|            |         |        |                                   |
|            |         |        |                                   |
|            |         |        |                                   |
|            |         |        | NOTE: The single character wild   |
|            |         |        | card value of a question mark     |
|            |         |        | \'?\' is NOT supported by this    |
|            |         |        | command.                          |
+------------+---------+--------+-----------------------------------+
| JOBLOGMSG  | 1       | \*CHAR | Y = Yes: Add a message to the     |
|            |         |        | SCANSPLF job\'s IBM i Job Log,    |
|            |         |        | whenever a progress or error log  |
|            |         |        | entry is being added to the       |
|            |         |        | LSAM\'s Captured Data Debug Log   |
|            |         |        | file.                             |
|            |         |        |                                   |
|            |         |        |                                   |
|            |         |        |                                   |
|            |         |        | Blank or \'N\' = No: Do NOT add   |
|            |         |        | messages to the IBM i Job Log.    |
|            |         |        | Progress and error messages will  |
|            |         |        | only be written to the LSAM log   |
|            |         |        | file.                             |
+------------+---------+--------+-----------------------------------+
| INT_ONLY\_ | 0       | (NULL) | Ignore this displayed parameter   |
|            |         |        | keyword. This command keyword is  |
|            |         |        | used only by the SCANSPLF command |
|            |         |        | processor program to receive IBM  |
|            |         |        | i internal address values that    |
|            |         |        | are sent from the SCANOUTQ        |
|            |         |        | command (and other LSAM programs) |
|            |         |        | to improve the efficiency of the  |
|            |         |        | command.                          |
+------------+---------+--------+-----------------------------------+

:  

### The SCANOUTQ Utility

The purpose of the SCANOUTQ command is to search among spool files found
in a single IBM i output queue and then to execute the SCANSPLF command
for each spool file that qualifies, according to the SCANOUTQ command
parameters and the Scan Rules of the named Application.

 

SCANOUTQ is not limited in the number of spool files it qualifies for
scanning, except by the selection rules of the SCANOUTQ command and by
the number of different spool file + job name combinations that have
been registered under the Application. The documented limits of the
SCANSPLF command above do not apply in terms of how many different spool
files and job names may be included in the same Application, because
when the SCANOUTQ command calls the SCANSPLF command, it has already
selected just one spool file and one job. Thus, out of all the Scan
Rules registered to the Application, only the Scan Rules that match the
selected spool file name will be loaded into the SCANSPLF command
processor.

 

The PARAMETERS keyword of the SCANOUTQ command is supported so that its
value can be passed along to each execution of the SCANSPLF command.
That is, if a PARAMETERS string value is provided instead of using the
default value of \*RULES, then that set of PARAMETERS must be matched by
each execution of the SCANSPLF according to the rules of the SCANSPLF
command, documented above.

 

It may be important to note that there are four parameters of the
SCANOUTQ command that can be used to temporarily store the IBM i job ID
and the spool file number of each spool file selected for processing.
The parameters support entry of the name of an LSAM dynamic variable
([without]{.ul} the special characters that make a dynamic variable into a replaceable token). The SCANOUTQ command stores values into one or
more of these dynamic variables so that they are available to any
captured data response rules that are linked to the Scan Rules for a
spool file. This makes it possible to perform extended processing of
spool files found in an output queue, such as creating an application to
re-route or delete spool files that meet certain selection criteria.
Refer to the example application for the SCANOUTQ command, below, to
learn how these dynamic variable parameters can be used.

 

Since the SCANOUTQ command is a driver to select spool files to be
scanned by the SCANSPLF command, then the functions of this SCANOUTQ
command can be understood by studying the syntax and the parameter
fields table that follows.

 

  -------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [It is not possible to use the SCANOUTQ command in an OpCon IBM i job master record as an extension to the Call command line, as with SCANSPLF. However, the SCANOUTQ command can be executed by a separate IBM i batch job in an OpCon schedule.]
  -------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

#### SCANOUTQ Command Syntax

The SCANOUTQ command entered in an IBM i command line, either from IBM i
or from the Call information in an IBM i job on an OpCon/xps schedule,
requires the syntax illustrated in the following example:

 

+----------------------------------+----------------------------------+
| ![White pencil icon on green     | **EXAMPLE:**                     | | circular                         |                                  |
| background](../../../Reso        | SCANOUTQ OUTQ(MYLIB/MYOUTQ)      |
| urces/Images/example-icon(48x48) |                                  |
| .png "Example icon") | APP(\'App ID: lower case and spl |
|                                  | chars\')                         |
|                                  |                                  |
|                                  | DATE(20130301) DATECOMP(EQ)      |
|                                  |                                  |
|                                  | OPCONJOB(N) FAILOUTQ(3)          |
|                                  | FAILSPLF(3)                      |
|                                  |                                  |
|                                  | PARAMETERS(\'\*RULES\') JOBNAME( |
|                                  | ) USER(\*ALL)                    |
|                                  |                                  |
|                                  | SPLF(MYREPORT) USRDTA(\*ALL)     |
|                                  | FORMTYPE(\*ALL)                  |
|                                  |                                  |
|                                  | DVSPLNBR(THISSPLNBR)             |
|                                  | DVJOBNBR(THISJOBNBR)             |
|                                  |                                  |
|                                  | DVJOBUSR(THISJOBUSR)             |
|                                  | DVJOBNAM(THISJOBNAM)             |
|                                  | NOSPLFOPT(1) USRDFNDTA(\*ALL)    |
+----------------------------------+----------------------------------+

 

The individual keywords are explained in a table following the screen
illustration below of this command prompted using function key
\<**F4**\> from IBM i command entry. Notice, above, that the APP and
PARAMETERS keyword values are enclosed in single quotes. These are
required in order to communicate space characters, numeric digits and
special characters as part of a single character string to the command
processor program.

 

The SCANOUTQ parameter values that are the same as those supported by
the SCANSPLF command are explained in more detail above, under the
discussion and the table of fields for the SCANSPLF command.

###### Fields

+------------+---------+--------+-----------------------------------+
| Keyword    | Size    | Type   | Description                       |
+============+:=======:+:======:+===================================+
| OUTQ       | 10 + 10 | \*CHAR | The output queue name, followed   |
|            |         |        | by the library location of the    |
|            |         |        | output queue. If the special      |
|            |         |        | value \*LIBL is used for the      |
|            |         |        | location of the output queue,     |
|            |         |        | then the queue must be found in   |
|            |         |        | the library list of the job where |
|            |         |        | the SCANOUTQ command is           |
|            |         |        | executing.                        |
+------------+---------+--------+-----------------------------------+
| APP        | 30      | \*CHAR | Value must be enclosed in single  |
|            |         |        | quotes. Type up to 30 characters. |
|            |         |        | Upper and lower case letters,     |
|            |         |        | numeric digits and special        |
|            |         |        | characters are allowed. Spaces    |
|            |         |        | are allowed but not recommended;  |
|            |         |        | use underline characters instead  |
|            |         |        | of spaces. This value must match  |
|            |         |        | an Application ID that has been   |
|            |         |        | registered using the LSAM Menu 3, |
|            |         |        | function 3.                       |
+------------+---------+--------+-----------------------------------+
| DATE       | 8.0     | \*DEC  | -   Optionally, specify a date in |
|            |         |        |     CCYYMMDD format, to identify  |
|            |         |        |     the processing date of the    |
|            |         |        |     target spool file. This value |
|            |         |        |     limits the list of jobs that  |
|            |         |        |     the SCANOUTQ command will     |
|            |         |        |     search for the spool file.    |
|            |         |        | -   The command processor also    |
|            |         |        |     supports using the name of an |
|            |         |        |     LSAM Dynamic Variable in this |
|            |         |        |     field.                        |
+------------+---------+--------+-----------------------------------+
| DATECOMP   | 2       | \*CHAR | -   Include spool files with this |
|            |         |        |     relationship to the DATE      |
|            |         |        |     value specified:              |
|            |         |        |     -   LT = less than            |
|            |         |        |     -   LE = less than or equal   |
|            |         |        |         to                        |
|            |         |        |     -   [EQ]{.ul} = equal (the    | |            |         |        |         default value)            |
|            |         |        |     -   GE = greater than or      |
|            |         |        |         equal to                  |
|            |         |        |     -   GT = greater than         |
|            |         |        | -   For purposes of date          |
|            |         |        |     comparison, the time values   |
|            |         |        |     of 00:00:00 and 23:59:59 are  |
|            |         |        |     used for the first and last   |
|            |         |        |     times of the day.             |
+------------+---------+--------+-----------------------------------+
| OPCONJOB   | 1       | \*CHAR | -   [Y=yes]{.ul} (default), N=no. | |            |         |        |     Set this parameter to Y when  |
|            |         |        |     the SCANOUTQ command will be  |
|            |         |        |     used in an OpCon/xps          |
|            |         |        |     scheduled job. Set this       |
|            |         |        |     parameter to N when the       |
|            |         |        |     command will be used from IBM |
|            |         |        |     i command entry or called by  |
|            |         |        |     a job originating outside of  |
|            |         |        |     OpCon/xps.                    |
|            |         |        | -   This parameter tells the      |
|            |         |        |     SCANOUTQ command whether to   |
|            |         |        |     send completion messages to   |
|            |         |        |     OpCon/xps. These messages     |
|            |         |        |     cannot be used outside of the |
|            |         |        |     LSAM-to-OpCon/xps interface.  |
+------------+---------+--------+-----------------------------------+
| FAILOUTQ   | 1       | \*CHAR | Controls the final completion     |
|            |         |        | status of the SCANOUTQ command,   |
|            |         |        | based on a summary of all the     |
|            |         |        | SCANSPLF command completion       |
|            |         |        | statuses. Possible values         |
|            |         |        | include:                          |
|            |         |        |                                   |
|            |         |        | -   1 = force abnormal end when   |
|            |         |        |     any spool file scan command   |
|            |         |        |     ended abnormally (ANY FAIL)   |
|            |         |        | -   2 = force abnormal end when   |
|            |         |        |     any spool file scan ends      |
|            |         |        |     normally (ANY PASS)           |
|            |         |        | -   3 = force normal end          |
|            |         |        |     regardless of scan task       |
|            |         |        |     outcome                       |
|            |         |        | -   4 = force abnormal end if all |
|            |         |        |     spool file scans end          |
|            |         |        |     abnormally (ALL FAIL)         |
|            |         |        | -   5 = force abnormal end if all |
|            |         |        |     spool file scans ended        |
|            |         |        |     normally (ALL PASS)           |
+------------+---------+--------+-----------------------------------+
| FAILSPLF   | 1       | \*CHAR | Controls the final completion     |
|            |         |        | status of each SCANSPLF command.  |
|            |         |        | All SCANSPLF scan rules must work |
|            |         |        | the same way for this option to   |
|            |         |        | be effective, because there is no |
|            |         |        | other source for the SCANSPLF     |
|            |         |        | FAILOPT parameter. Possible       |
|            |         |        | values include:                   |
|            |         |        |                                   |
|            |         |        | -   1 = force abnormal end when   |
|            |         |        |     ANY required scan rule was    |
|            |         |        |     NOT matched (ANY FAIL)        |
|            |         |        | -   2 = force abnormal end when   |
|            |         |        |     ANY required scan rules DO    |
|            |         |        |     match (ANY PASS)              |
|            |         |        | -   3 = force normal end          |
|            |         |        |     regardless of scan rule match |
|            |         |        |     outcome                       |
|            |         |        | -   4 = force abnormal end if ALL |
|            |         |        |     scan rules do NOT match (ALL  |
|            |         |        |     FAIL)                         |
|            |         |        | -   5 = force abnormal end if ALL |
|            |         |        |     scan rules DO match (ALL      |
|            |         |        |     PASS)                         |
+------------+---------+--------+-----------------------------------+
| PARAMETERS | 1024    | \*CHAR | -   The entire value string must  |
|            |         |        |     be enclosed in a pair of      |
|            |         |        |     single quotes, unless the     |
|            |         |        |     special value of \*RULES      |
|            |         |        |     (which is the default) is     |
|            |         |        |     used.                         |
|            |         |        | -   The command processor also    |
|            |         |        |     supports using the name of an |
|            |         |        |     LSAM Dynamic Variable in this |
|            |         |        |     field.                        |
|            |         |        | -   This value string is sent to  |
|            |         |        |     each execution of the         |
|            |         |        |     SCANSPLF command. Refer to    |
|            |         |        |     the Fields table, above, for  |
|            |         |        |     the SCANSPLF command for more |
|            |         |        |     information about this        |
|            |         |        |     keyword.                      |
|            |         |        | -   Also refer to the             |
|            |         |        |     [Add/Change/Copy SPLF Scan    | |            |         |        |     Rule](#Add/Chan){.MCXref      |
|            |         |        |     .xref} for more information   |
|            |         |        |     about SPLF Scan Rules.        |
+------------+---------+--------+-----------------------------------+
| JOBNAME    | 10      | \*CHAR | -   This field may optionally be  |
|            |         |        |     used to limit the spool files |
|            |         |        |     selected from an output queue |
|            |         |        |     to only the files belonging   |
|            |         |        |     to a job of this name.        |
|            |         |        | -   This field may be left blank. |
|            |         |        | -   The job name can be an exact  |
|            |         |        |     IBM i job name, or a partial  |
|            |         |        |     (also called generic) job     |
|            |         |        |     name may be specified by      |
|            |         |        |     entering the first one or     |
|            |         |        |     more characters of the job    |
|            |         |        |     name followed by an asterisk: |
|            |         |        |     -   JOBNA\* (all job names    |
|            |         |        |         beginning with JOBNA      |
|            |         |        |         would match)              |
|            |         |        | -   The command processor also    |
|            |         |        |     supports using the name of an |
|            |         |        |     LSAM Dynamic Variable in this |
|            |         |        |     field.                        |
+------------+---------+--------+-----------------------------------+
| USER       | 10      | \*CHAR | -   The job user name may be used |
|            |         |        |     to limit the spool files      |
|            |         |        |     selected form an output       |
|            |         |        |     queue.                        |
|            |         |        | -   This field should not be left |
|            |         |        |     blank. The default value is   |
|            |         |        |     \*ALL.                        |
|            |         |        | -   The command processor also    |
|            |         |        |     supports using the name of an |
|            |         |        |     LSAM Dynamic Variable in this |
|            |         |        |     field.                        |
+------------+---------+--------+-----------------------------------+
| SPLF       | 10      | \*CHAR | Spool file name to scan:          |
|            |         |        |                                   |
|            |         |        | -   The \*APP special value       |
|            |         |        |     indicates that one or more    |
|            |         |        |     spool files registered to the |
|            |         |        |     APPlication in the Scan Rules |
|            |         |        |     will be the spool file names  |
|            |         |        |     to find and scan.             |
|            |         |        | -   To limit the scan task to     |
|            |         |        |     only one spool file name,     |
|            |         |        |     such as when more than one    |
|            |         |        |     SPLF was registered to the    |
|            |         |        |     same APP, type the full name  |
|            |         |        |     of the spool file in this     |
|            |         |        |     field.                        |
|            |         |        | -   The command processor also    |
|            |         |        |     supports using the name of an |
|            |         |        |     LSAM Dynamic Variable in this |
|            |         |        |     field.                        |
+------------+---------+--------+-----------------------------------+
| USRDTA     | 10      | \*CHAR | -   This field can be used to     |
|            |         |        |     limit the spool file selected |
|            |         |        |     for scanning by its user data |
|            |         |        |     value.                        |
|            |         |        | -   The default value of \*ALL    |
|            |         |        |     means to accept a spool file  |
|            |         |        |     without checking the user     |
|            |         |        |     data value assigned to it.    |
|            |         |        | -   The command processor also    |
|            |         |        |     supports using the name of an |
|            |         |        |     LSAM Dynamic Variable in this |
|            |         |        |     field.                        |
+------------+---------+--------+-----------------------------------+
| FORMTYPE   | 10      | \*CHAR | -   This field may optionally be  |
|            |         |        |     used to limit the spool files |
|            |         |        |     selected from an output queue |
|            |         |        |     to only the spool files       |
|            |         |        |     assigned a particular form    |
|            |         |        |     type value.                   |
|            |         |        | -   The default value of \*ALL    |
|            |         |        |     means to accept any spool     |
|            |         |        |     file without considering the  |
|            |         |        |     form type.                    |
|            |         |        | -   The command processor also    |
|            |         |        |     supports using the name of an |
|            |         |        |     LSAM Dynamic Variable in this |
|            |         |        |     field.                        |
+------------+---------+--------+-----------------------------------+
| DVSPLNBR   | 12      | \*CHAR | The IBM i LSAM Dynamic Variable   |
|            |         |        | that will store the IBM i spool   |
|            |         |        | file number with a job. May range |
|            |         |        | from 1 to 999999. If there is     |
|            |         |        | more than one spool file with the |
|            |         |        | same name produced by one job,    |
|            |         |        | this number is critical for       |
|            |         |        | identifying the specific spool    |
|            |         |        | file to be processed.             |
+------------+---------+--------+-----------------------------------+
| DVJOBNBR   | 12      | \*CHAR | The IBM i LSAM Dynamic Variable   |
|            |         |        | that will store the IBM i unique  |
|            |         |        | job identifying number. Although  |
|            |         |        | this number always shows as six   |
|            |         |        | digits, it is handled as a        |
|            |         |        | character string.                 |
+------------+---------+--------+-----------------------------------+
| DVJOBUSR   | 12      | \*CHAR | The IBM i LSAM Dynamic Variable   |
|            |         |        | that will store the name of the   |
|            |         |        | IBM i User Profile for the job    |
|            |         |        | that produced the spool file.     |
+------------+---------+--------+-----------------------------------+
| DVJOBNAME  | 12      | \*CHAR | The IBM i LSAM Dynamic Variable   |
|            |         |        | that will store the name of the   |
|            |         |        | IBM i job that produced the spool |
|            |         |        | file.                             |
+------------+---------+--------+-----------------------------------+
| NOSPLFOPT  | 1       | \*DEC  | -   If the outcome of the         |
|            |         |        |     FAILOUTQ parameter does not   |
|            |         |        |     force the SCANOUTQ job to     |
|            |         |        |     fail, then this option        |
|            |         |        |     governs whether the job will  |
|            |         |        |     be forced to fail if no spool |
|            |         |        |     files are found that match    |
|            |         |        |     the Scan Rules requested by   |
|            |         |        |     this command.                 |
|            |         |        | -   1 = Fail if no SPLF found     |
|            |         |        |     (the original default         |
|            |         |        |     behavior).                    |
|            |         |        | -   0 = Do not fail if no SPLF    |
|            |         |        |     found (useful for system      |
|            |         |        |     clean up jobs).               |
|            |         |        | -   Refer to the next topic       |
|            |         |        |     \"SCANOUTQ Job Result         |
|            |         |        |     Evaluation\" for more         |
|            |         |        |     information about the effect  |
|            |         |        |     of this parameter.            |
+------------+---------+--------+-----------------------------------+
| USRDFNDTA  | 256     | \*CHAR | Use single quotes to enclose a    |
|            |         |        | string of data that should match  |
|            |         |        | the User Defined Data attributed  |
|            |         |        | of spool files that qualify for   |
|            |         |        | the command to process.           |
|            |         |        |                                   |
|            |         |        |                                   |
|            |         |        |                                   |
|            |         |        | \'\*GENERIC\*\'                   |
|            |         |        |                                   |
|            |         |        |                                   |
|            |         |        |                                   |
|            |         |        | Generic, or partial, values may   |
|            |         |        | be used. Type an asterisk at the  |
|            |         |        | beginning to indicate that any    |
|            |         |        | number of characters (or no       |
|            |         |        | characters) may precede the       |
|            |         |        | matching string. Type an asterisk |
|            |         |        | at the end to indicate that any   |
|            |         |        | number of characters (or no       |
|            |         |        | characters) may follow the        |
|            |         |        | matching string. Either or both   |
|            |         |        | of the asterisks may be used.     |
|            |         |        |                                   |
|            |         |        |                                   |
|            |         |        |                                   |
|            |         |        | If no asterisks are typed, then   |
|            |         |        | the character string in this      |
|            |         |        | parameter must match exactly and  |
|            |         |        | completely the User Defined Data  |
|            |         |        | attribute of a spool file.        |
|            |         |        |                                   |
|            |         |        |                                   |
|            |         |        |                                   |
|            |         |        | NOTE: The single character wild   |
|            |         |        | card value of a question mark     |
|            |         |        | \'?\' is NOT supported by this    |
|            |         |        | command.                          |
+------------+---------+--------+-----------------------------------+

:  

#### SCANOUTQ Job Result Evaluation

The SCANOUTQ command driver program is designed to force an abnormal
termination or to allow a normal termination, depending on the setting
of the two FAIL-option keywords, on the NOSPLFOPT keyword, and on the
actual results of the spool file scans that are performed.

 

The SCANOUTQ command itself will generate its own failure conditions if
there is an illogical setting of the command parameters, if system
limits are exceeded by an excessively large spool file selection set, or
if no spool files qualify for scanning. Otherwise, the intended function
of the SCANOUTQ command is to evaluate the results of one or more
SCANSPLF commands in order to determine if the command should end
normally or abnormally.

 

When the SCANOUTQ command driver program determines that the command
should end abnormally, the driver program ends with escape message code
RNX9001 (the standard message from an RPG program \*PSSR subroutine that
has ended at the \*CANCL exit point). This message is reported with the
job termination message code CEE9901. The job detail messages shown
under the OpCon Job Information context menu tabs Configuration -\>
Operations Related Information -\> Job Detail Messages, will indicate
when this error message condition is expected, or if an unexpected
program error occurred.

 

The FAILSPLF parameter of the SCANOUTQ command is passed along to become
the value of the FAILOPT parameter for each execution of the SCANSPLF
command. Since there is only this one way to set the SCANSPLF parameter
FAILOPT this means that all the spool file scans belonging to one
SCANOUTQ Application must be configured to work the same way. It is not
possible at this time for one execution of SCANOUTQ to combine different
FAILTOPT values within a single job. (Hint: When different FAILOPT
values are required, configure two different OpCon jobs that run
separate SCANOUTQ Applications and then test the results of both jobs to
create subsequent dependencies in OpCon schedules.)

 

The FAILOUTQ parameter of the SCANOUTQ command specifies how the
SCANOUTQ job should respond based on the combination of results from one
or more SCANSPLF commands. It is important to understand that the
individual SCANSPLF command failures will not cause a SCANOUTQ job to
fail, as they would when the SCANSPLF command is executed directly by a
job. Instead, the SCANOUTQ command driver program collects the results
from all the spool file scan tasks and then evaluates those results
according to the FAILOUTQ option value. The possible values for the
FAILOUTQ keyword are defined above in the Fields table for the command.

 

The NOSPLFOPT is used only when the FAILOUTQ option will not force the
job to fail. If no spool files match the Scan Rules executed by a job,
NOSPLFOPT(1) allows the job to fail (the former default behavior of this
command). NOSPLFOPT(0) prevents a job failure when no spool files are
found, and this option is useful for system clean up jobs, when it is
expected that there may be no matching spool files.

#### Flow Chart of SCANOUTQ Automation Strategy

The dynamic variable values that SCANOUTQ can store make it possible for
the Response Rules engine to effectively manage each selected spool
file. The following flow chart illustrates the flow of the SCANOUTQ
process and the method used to make spool file definition values
available to captured data response rules.

SCANOUTQ Flow Chart

![SCANOUTQ Flow Chart](../../../Resources/Images/IBM-i/SCANOUTQ-Flow-Chart.png "SCANOUTQ Flow Chart"){.flat}

#### SCANOUTQ Application Example

This example of using the SCANOUTQ command relies on the flow chart
above and explains how each element of the flow chart is used. There are
examples that would not need the Captured Data Response Rules, such as
the report balancing example that is explained in the **IBM i LSAM**
online help. But in most cases, the Response Rules define the actions
that will be performed as each Scan Rule captures some data from a
report.

##### Purpose

The goal of this example application is to find each spool file that
matches a certain profile, and then copy that spool file to an IBM i DB2
database file. This example does not illustrate what happens to the
database file after the SCANOUTQ command completes its processing.
Assuming that an OpCon schedule has requested the execution of this
SCANOUTQ command, dependent jobs might subsequently be executed to copy
the report data to an external system for additional processing.

 

In this example, the Scan Rules are utilized only as a link between the
action of SCANOUTQ discovering a qualified spool file, and the desired
action of the Response Rules to copy the spool file to an IBM i DB2
database file. The Scan Rules will still perform their designed action
of capturing some data from the report, but the logged report data is
not important in this application, so it would only serve as historical
evidence in the log of the spool file that was being processed.

 

The example starts with some one-time configuration steps to create
components that can be reused as many different spool files are
processed, or as the process is repeated at some frequency such as
daily.

##### Preliminary Configuration

1.  An empty DB2 database physical file is created with the appropriate
    record length that will match the output from the IBM i command
    CPYSPLF. IBM i reports typically have either 80-byte or 132-byte
    report lines, although custom statements and letters might employ a
    unique report line length. The record length of the physical file in
    this example assumes that report line print control characters will
    NOT be generated by the CPYSPLF command.
2.  LSAM Dynamic Variables will be registered in advance, even though
    the SETDYNVAR command in the Response Rules (below) could create
    them on-the-fly. This makes it easier to prompt for the Dynamic
    Variable names during the configuration of the Response Rules. The
    LSAM menu function for maintaining Dynamic Variables, for example,
    option 6 on the LSAM sub-menu 3: Events and Utilities, could be used
    to perform this maintenance. But the SETDYNVAR command is shown here
    for illustration purposes. The parameters defining the Dynamic
    Variables are the same in either method.

##### LSAM Scan and Response Rule Configuration for the Example

1.  Create one or more Scan Rules: LSAM sub-menu 3, option 4.\
    \
    The SCANOUTQ command has only its command parameters to define how
    it will search for and select spool files to be processed by the
    SCANSPLF command. The SCANSPLF command parameters are assembled by
    the SCANOUTQ command processor, but some of the SCANSPLF command
    parameters may be allowed to depend on Scan Rules. Therefore, the
    LSAM master file configuration must start with creating new Scan
    Rules.\
    \
    The LSAM Scan Rules maintenance display is illustrated in the SPLF
    Scan Rule Example figure. The effect of this Scan Rule, itself, is
    only to capture the first line on the first page, up to 80
    characters. This captured data is not useful for this example, but
    some Scan Rule must be specified to provide a link between the
    SCANOUTQ command and the Response Rule(s) defined below. The
    practice of storing some identifying information about the report
    being processed may prove useful in the future, in case this
    automation is being audited, for example, for diagnostic purposes.
2.  Create Captured Data Response Rule(s): LSAM sub-menu 3, option 5.\
    \
    When creating a Captured Data Response Rule, it is of course
    critical that the Application ID (labeled as the \"Capture
    identifier\" field) and the Capture sequence number match the Scan
    Rule exactly. To ensure this match, use the function key F4=Prompt
    and select the desired Scan Rule from the prompt window.\
    \
    In this example, the Comp reference value, Compare rule and Compare
    data lines are set to the values that mean \"always execute this
    rule.\" (The default values that imply this meaning are \"\*CAPT EQ
    \*ANY\".)\
    \
    The illustration below shows that the IBM i command CPYSPLF will be
    executed. An easy way to format this command is to type the command
    name into the Response cmd field and then press F4=Prompt to get
    help from the IBM i command prompting program. However, do not
    attempt to include the Dynamic Variable token characters until after
    the command prompting returns the correctly formatted command syntax
    into this field.

##### Example SCANOUTQ Command Parameters

The command syntax illustrated above is changed slightly to conform to
this application example. Although the JOBNAME parameter is being shown
with no value, it would be left out of the command if it is not required
when this command is being entered as the command to execute in an OpCon
job. The JOBNAME parameter could be used as a filter to distinguish
between two common spool file names (such as QSYSPRT) when only spool
files from one job should be selected for processing.

 

Note also that the library location of the command is specified here.
This is not strictly necessary for the IBM i LSAM to process the OpCon
job request in this case, since the LSAM job scheduler does include the
SMAPGM library in its library list, but any commands from third-party
software applications must be qualified by the library location of the
command, otherwise the IBM i command editor that is processing the
SBMJOB command prepared by the LSAM job scheduler will not be able to
locate the command in order to qualify its syntax.

SMAPGM/SCANOUTQ OUTQ(MYLIB/MYOUTQ)

APP(\'Get BLDPTFP01 Job ID\')

DATE(20130301) DATECOMP(EQ)

OPCONJOB(N) FAILOUTQ(3) FAILSPLF(3)

PARAMETERS(\'\*RULES\') JOBNAME( ) USER(\*ALL)

SPLF(BLDPTFP01) USRDTA(\*ALL) FORMTYPE(\*ALL)

DVSPLNBR(EXSPLNBR) DVJOBNBR(EXJOBNBR)

DVJOBUSR(EXJOBUSR) DVJOBNAM(EXJOBNAM)

 

The Dynamic Variables that were configured in a previous step of this
example are named in the appropriate new SCANOUTQ parameters. Note that
the special token character is not included here because the purpose of
the Dynamic Variable name is not to have a value put in its place, but
to name the Dynamic Variable that should be used by the SCANOUTQ command
processor program as it is storing identifying information about each
spool file selected for processing.

### Captured Data Response Rules

Captured Data Response Rules provide a way to cause any number of IBM i
commands or programs to be executed during the processing of the
SCANSPLF command, an Operator Replay script or a Message Management
Parameter. The actual Capture Rules are unique to each of these source
applications, since the source material is different. But they all put
their captured data into the same LSAM Captured Data Log (the
multi-purpose log file OPRLOGF40), and this marks their common link to
the Response Rules engine.

 

The support for Dynamic Variables built into each of the data source
features means that Captured Data Response Rules could be used to change
the Dynamic Variable values as the process runs, allowing the process to
change itself depending on data values that are captured and recognized.
Captured Data Response Rules also provide an exit program capability,
making it possible to tightly coordinate LSAM functions with third-party
software.

#### How Captured Data Responses are Triggered

The LSAM Captured Data Log file stores individual data values up to 1920
characters in length. This file is used to store data captured by the
Operator Replay screen data capture function, scan values found by the
SCANSPLF command, and message text values captured by Message
Management. The data capture log file serves as an audit mechanism to
prove the outcome of each of those capture functions. The data capture
records also function as a connection point to optional Captured Data
Response Rules. (Refer to [The Data Capture Logging Functions](#The2) for more information.)

 

Whenever the system writes a new record to the Captured Data Log file,
it also checks for response rules that match the data capture
identifying key fields. The identifying key fields include the
Application ID associated with each data capture operation and the
sequence number of the data capture rule. Captured data is further
identified by key values that are unique to each capturing application.
A Type flag marks captured data as resulting from the SCANSPLF command,
from an Operator Replay screen or from Message Data.

 

The Captured Data Response Rules appear the same for any data capture
source. Only the key values assigned to the rule are different,
depending on the data capture source. Details about how to define the
Capture Rules are provided in the separate topic for each of the
following features.

##### SCANSPLF Scan Rules

The data capture rules for the SCANSPLF command are actually the SPLF
Scan Rules. Whenever the SCANSPLF command processor finds a match to one
of the SPLF Scan Rules, it writes a new data capture record to the log
file and records the found scan value. During the process of defining
Captured Data Response Rules, the prompt function key \<**F4**\> is an
important tool for identifying the correct key field values that must be
used to identify and link each Response to one of the SPLF Scan Rules.
That prompting function automatically associates the registered
Application ID with each of the SPLF Scan Rules and shows a list of the
scan rules in rule sequence number order.

##### Operator Replay Capture Rules

The data capture rules for Operator Replay are separate from the Script
Step records, but they are always linked by permanent key values to an
individual Script Step. Any of these hard-linked capture rules and
response rules can be optionally copied whenever a Script Step, or an
entire Script, is copied to a new Step sequence number, or to a new
Script name.

##### Message Management Capture Rules

The data capture rules for Message Management are not linked to only one
Message Management Parameter, but are shared because it is so common for
a single Capture Application to be reused among many different message
management rules. Instead, each Message Management Parameter record
stores the Capture Application ID as part of the Parameter record.

#### How Captured Data Response Rules Work

The method for adding new Captured Data Response Rules is outlined
above. Details about the Captured Data Response Rules maintenance screen
and fields are illustrated below under Utilities Screens and Windows.
This discussion explains how certain Response Rule parameters interact
to provide a flexible and powerful response matrix.

 

Three aspects of Captured Data Response Rules deserve a detailed
explanation. There is a set of rules and comparison values that can be
used to qualify whether a given response command (or group of commands)
will be executed as captured data is stored. There is also a
Continuation field in the response rule record that may be used to
create different sets of qualification rules and also different groups
of commands controlled by each set of qualification rules. The response
command and the comparison data fields are allowed to use LSAM Dynamic
Variables, and a variable value may be set immediately before the
command executes by the field labeled for this purposed on the Response
Rules record.

##### Response Rule Qualification Rules

At the simplest level, each response command can be controlled by a
single qualification rule. In this case, a single Captured Data Response
Rule record can be used to define the entire response. But it is
possible to use multiple rule records to build a complex set of
qualification rules. Similarly, multiple records can be used to build a
group of multiple response commands. Multiple qualification rules may
overlap multiple response commands, and vice versa. Consider the
following examples.

 

The first table shows that 3 comparison rules are used to qualify 5
different response commands. In this case, all three comparison rules
must be satisfied before any commands are executed. If all the
qualifications are met, then all 6 commands will be executed.

  Response qualification         Response commands
  ------------------------------ ---------------------
  Comparison rule A1             Response command R1
  Comparison rule A2             Response command R2
  Comparison rule A3             Response command R3
  (command group continuation)   Response command R4
  (command group continuation)   Response command R5

  : Captured Data Response Rules Model - More Commands

In the second table there are 4 comparison rules but only 1 response
command. This works the same as the first example, except that all 4
qualifications must be met before the single response command is allowed
to execute.

  Response qualification   Response commands
  ------------------------ ---------------------
  Comparison rule B1       Response command S1
  Comparison rule B2       (no command text)
  Comparison rule C1       (no command text)
  Comparison rule C2       (no command text)

  : Captured Data Response Model - More Qualifications

##### Response Rule Continuation Field

It is also possible to create multiple, separate groups of
qualifications + commands that are each handled separately from each
other, all as part of a single response to only one element of captured
data.

 

Here are the values of the Continuation field of the Captured Data
Response Rules:

-   **AND** = This record includes a comparison rule that must also be
    true, in addition to the rule in the previous record.
-   **OR** = This record begins a new set of comparison rules that
    provide an alternate means of qualifying the associated group of
    response commands.
-   **CMD** = This record includes an additional command that is part of
    a command group but it does not include any comparison rules; the
    command group is qualified by previous comparison rules that are
    part of this set.
-   **blanks** = This record begins a completely new set of comparison
    rules and response commands. There is no connection to this set and
    any previous set, except that both sets are associated with the same
    original captured data log record.

The following examples show how the Continuation field of the Captured
Data Response Rules can be used to merge the two tables above into a
single, complex response.

  Seq    Continuation      Response qualification     Response commands
  ----- -------------- ------------------------------ ---------------------
  010                        Comparison rule A1       Response command R1
  020        AND             Comparison rule A2       Response command R2
  030        AND             Comparison rule A3       Response command R3
  040        CMD        (command group continuation)  Response command R4
  050        CMD        (command group continuation)  Response command R5
  060        CMD        (command group continuation)  Response command R6
  070                        Comparison rule B1       Response command S1
  080        AND             Comparison rule B2       (no command text)
  090        AND             Comparison rule B3       (no command text)
  100         OR             Comparison rule C1       (no command text)
  110        AND             Comparison rule C2       (no command text)
  120        AND             Comparison rule C3       (no command text)

  : Captured Data Response Rules - Continuation Fields

 

The table above shows two different qualification + command groups that
are associated with one captured data element. The two groups are
separated by the blank Continuation field at row 070; row 070 is the
first record of the second group. Each of these groups works
independently of each other. The only important relationship between the
two groups is that the first group will be processed before the second
group, so it is important to ensure that commands R1 through R6 do not
depend on what command S1 will do, and conversely, to remember that
command S1 may be affected by the outcome of commands R1 through R6.
However, the comparison rules may enforce that only one of the two
command sets will be executed.

 

The first group shows that there are three comparison rules that must
all be satisfied due to the AND rule. If all three rules are satisfied,
then all six commands, R1 through R6, will be executed. If any rule A1
through A3 is not satisfied, then none of the six commands will be
executed.

 

The second group shows a complex set of comparison rules used to qualify
just a single command. In this group, the comparison rules B1 through B3
must all be satisfied, or the comparison rules C1 through C3 must all be
satisfied, in order for command S1 to be executed.

 

The OR is exclusive. This means it is not possible to include the OR
continuation rule as part of an AND-group. The only way to accomplish
this is to repeat some of the AND-rules in a second set of comparisons
that begin with the OR continuation rule.

##### Qualifying Captured Data Response Rules with Comparison Data

The discussion above refers to Comparison rules. This term refers to the
fields in a Captured Data Response Rule that define a comparison
reference value, comparison data and the compare rule. Use these fields
to determine whether a Captured Data Response Rule, or group of rules,
is allowed to execute.

 

Some Response Rules may not need qualification, including CMD
continuation records that are only used to register additional response
commands. To disable the comparison data fields, set the Compare Data
lines to the special value of \"\*ANY. Otherwise, consider the following
options when defining Response Rule qualification.

 

The basic logic of qualifying a Response Rule is based on using the Comp
Reference Value as factor 1 and the Compare Data Lines (content) as
factor 2. The final value of each of these fields is matched according
to one of the Boolean Compare Rule options. For example, if the Compare
Rule is set to GT (greater than), then the factor 1 value must be
greater than the factor 2 value in order for the Response Rule functions
to be executed:

 

*If Compare Reference is Greater Than Compare Data, then execute
Command.*

 

*If (Compare Reference) \> (Compare Data), then execute Command.*

 

By combining various Response Rules and specifying comparison values
using Dynamic Variables (or other of the allowed options), it becomes
possible to create a complex set of response rules that can be adapted
to many different circumstances. For example, a Dynamic Variable could
be established as the holder of a threshold value, and another Dynamic
Variable could be established as a counter that is compared to the
threshold. One or more Response Data rules could be used to increase the
counter variable when certain circumstances occur, and another Response
Data rule could be used to compare the counter to the threshold in order
to trigger an emergency response only when the specified threshold is
exceeded.

 

Consider the following options for defining each of the comparison data
fields.

 

The Comp Reference Value was presumed, in earlier versions of this LSAM,
to always be the Captured Data element itself. Now, however, the element
of data that was stored in the Captured Data Log File is represented by
the special value of \*CAPT that can be typed into the Comp Reference
Value field. Another newer option for this field is to specify a Dynamic
Variable token (including the Dynamic Variable special characters). Use
the function key \<**F8**\> to select from a list of existing Dynamic
Variables, or to let the maintenance program demonstrate the correct
syntax for inserting a Dynamic Variable token into this field. A third
option for this field is to type a specific character string. A specific
character string might be useful, for example, as a hard-coded threshold
value that is assigned to one Captured Data Response Rule.

 

The Comp Reference Value may be further defined by the Comp Reference
Length field. When this field is left set to zero, the LSAM routine will
assume the length of the comparison reference value depending on how
that field was set. If the special value \*CAPT is used, then the length
of the reference value will be obtained from the Captured Data Log file
record. Otherwise, the length of the reference value will be assumed to
start at position 1 and continue through the last non-blank character in
the string. This computation of the length applies to either a typed
character string or to the value obtained by replacing a Dynamic
Variable token.

 

The Compare Data Lines field supports four different options for
specifying values that will be compared to the Comp Reference Value:

-   **\*ANY** = A special value that disables the compare data
    qualification, allowing the Response Rule to always be executed.
-   **\*PARM** = A special value used only with the SCANSPLF command,
    referring to the current (one of many?) input Parameter value that
    was supplied for searching a spool file.
-   **DynVar** = Use F8 to select a Dynamic Variable from a list, or
    manually type in a Dynamic Variable name, including the special
    characters required to denote a Dynamic Variable. (Hint: Use F8 and
    select any value to let the program demonstrate the correct syntax
    for a Dynamic Variable, then change the actual variable name to the
    desired value within the special characters.)
-   **char** = Type in any character string. This option is typically
    used to test if captured data is equal to the string that is typed
    here, in order to decide if the Response Rule should be executed.
    This value could also be used as a threshold reference point, when
    the Comp Reference Value was set to a Dynamic Variable that contains
    a counter field, although this is the reverse of the logic that
    might be expected, so the Boolean Compare Rule must be chosen
    carefully.

The Compare Data Line field can support up to 1920 characters of data.
This length matches the total amount of data that could appear on an IBM
i green screen workstation display format (when the screen dimensions
are 24 lines of 80 characters), which is the maximum size of data that
can be stored in a single Captured Data Log file record. Lines 1 - 5
appear on the first screen of the Response Rule maintenance function,
and PageDown can be used to move to lines 6-24 (of 80 characters each).
All of the data entered in these lines is assumed to be a single,
contiguous string. Blanks appearing at the end of individual lines are
assumed to be part of the data except for the last line. However, the
length specified or calculated for the Comparison Reference Value may
determine that additional space characters will be appended to the end
of the Compare Data Line data string, if that is necessary to make the
two string sizes match.

##### Setting LSAM Variables with Response Rules

The Captured Data Response Rules record supports entry of an LSAM
Dynamic Variable name and also of an LSAM Operator Replay token variable
name. Dynamic Variables are described in detail below and also in the
topic about Job Tracking. Operator Replay token variables are explained
in detail in the topic about Operator Replay. This discussion here is
focused only on the function of the fields used by a Captured Data
Response Rule to store captured data into LSAM variables.

 

  -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [Operator Replay token variables are an old form of variable that is no longer used, since the more powerful Dynamic Variable tokens can now be used in every place the old tokens were used. Always choose Dynamic Variables!]
  -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

When the response rule is actually executed, which happens whenever
captured data (explained above) is being stored in the Captured Data Log
file, the data that is captured is available to the Response Rule
execution module. If the response rule has named either type of variable
(Dynamic Variable or Operator Replay token variable), the associated
variable loading command (SETDYNVAR or ADDRPYTOK) is executed to set the
variable value in the appropriate LSAM table using the current captured
data value. Each of these commands will create the variable master
record if it does not already exist.

 

  -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [If the Captured Data Response Rule has the flag set that specifies to compress numeric data, then the value stored in an LSAM Dynamic Variable will also be the compressed numeric data. This means that any punctuation such as used for monetary amounts will be eliminated in the variable, though it exists in the originally captured data. Also refer to the sub-section below about scrubbing single quotes or commas from text strings.]
  -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

This function of the Captured Data Response Rules is similar to using
either of the LSAM commands SETCAPVAR or SETCAPTOK.

 

But these SET\* commands are executed outside of the job where data
capturing is actually performed, so the commands are less able to be
specific about the actual captured data value that can be retrieved for
storage as a variable value. These commands are limited to the \*FIRST
or \*LAST time stamp on whatever date is specified in the command
parameters. Refer to more about the two SET commands in the next
section.

 

The SET commands are executed at a different time, relative to the
Captured Data Response Rules, so there is another advantage to using the
built-in variable setting feature of the Captured Data Rules:

 

[The Response Rule execution module always processes storage of the captured data to a variable first, before testing the qualification
rules or executing the response command.]{.ul}

 

When the rule qualifies for execution, the response command is analyzed
to see if any Dynamic Variable tokens must be replaced with the current
variable value. This makes it possible to execute a response command
that will include the data that was just captured.

 

By default, the Captured Data Response Rule field that names a Dynamic
Variable will always create or update a variable of type V, which is a
general use variable. (This restriction arises because of the complex
definition required for the other variable type.) The other type of
Dynamic Variable, explained in detail below, is type L, used to update
the IBM i local data area image for captured or tracked/queued jobs.
Since the Captured Data Response Rule \"Store -\>\" field cannot be used
for a type L variable, the way to create or update that type of variable
is to use the SETDYNVAR command in the response command line of the
Response Rule record. Remember that the same captured data value
currently processed by the response rule could be made available,
indirectly, to the SETDYNVAR command by including a different Dynamic
Variable token in the VALUE parameter of the SETDYNVAR command. The
different Dynamic Variable might be the one that is named in the Dynamic
Variable field of the current Captured Data Response Rule record.

 

If a Captured Data Response Rule response command includes more than one
Dynamic Variable, it might be necessary to configure additional Captured
Data Response Rules that will execute prior to this response rule, in
order to assure that the required variable values have been set
appropriately.

 

Although this section of the document is focused on the SCANSPLF
utility, the Captured Data Response Rules are also able to store data
captured by Operator Replay from a green screen workstation display, or
by Message Management from the primary and/or secondary message text.
These other two functions are discussed in more detail in the topics
about those features.

##### Setting LSAM Variables from Captured Data Outside of Response Rules

The Captured Data Response Rules record supports entry of LSAM variable
names so that the captured data value can be stored into either an LSAM
Dynamic Variable or an LSAM Operator Replay token variable. This feature
is discussed just above.

Similarly, there are two independent LSAM commands that can complete the
same procedure, although with less flexibility:

-   SETCAPVAR = set an LSAM Dynamic Variable to the value of the
    identified Captured Data element.
-   SETCAPTOK = set an LSAM Operator Replay token variable to the value
    of the identified Captured Data element.

These two commands could be used anywhere that IBM i command execution
is possible, as long as the executing job has reference to the LSAM
environment library list. But these commands do not provide infinite
control over the exact captured data value instance that will be
retrieved, due to the fact that multiple captured data elements could
exist for the same Capture ID and Capture Sequence key values, with only
their date/time stamps (time of capture) being different. Therefore, as
the example command syntax below illustrates, it is only possible to
find the \*FIRST or \*LAST instance of a given element of captured data
for a given date. The only way to guarantee that specific captured data
will always be used to set either type of variable value is to use the
Captured Data Response Rule fields where variable names may be entered.
Only while the Captured Data Response Rule execution module is managing
the actual data that has been captured, can the system be sure that a
specific element of captured data will be stored as the variable value.

 

However, in case it might be useful, these two commands can be used
outside of the Captured Data Response Rule execution process. A prompted
IBM i command screen is illustrated for each of these commands. The
effect of each command is similar to using the LSAM commands SETDYNVAR
and ADDRPYTOK, so the command fields that define the variables are not
explained here. This discussion is limited to explaining how the
Captured data identifying fields work.

SETCAPVAR = Set Captured Dynamic Variable

  ----------------------------------------------------------------------------------------------------------------------------
                                           Set Captured Dynamic Variable (SETCAPVAR)
                                                                
                                                   Type choices, press Enter.
                                                                
   Capture Identifier . . . . . . . CAPID         [                                  ]{style="text-decoration: underline;"}                     Capture sequence number  . . . . CAPSE         [0    ]{style="text-decoration: underline;"}
                Capture date . . . . . . . . . . DATE          [\*CURRENT]{style="text-decoration: underline;"}                 First/Last time, or \*ANY date  . TIME          [\*LAST  ]{style="text-decoration: underline;"}
              Name of new/existing variable  . VARNAM        [            ]{style="text-decoration: underline;"}                      Variable type  . . . . . . . . . VARTYP        [V]{style="text-decoration: underline;"}
                  Sequence for same LDA variable   VARSEQ        [0    ]{style="text-decoration: underline;"}                   Start position in LDA  . . . . . LDASTR        [0     ]{style="text-decoration: underline;"}
                  Length of LDA change . . . . . . LDALEN        [0     ]{style="text-decoration: underline;"}   ----------------------------------------------------------------------------------------------------------------------------

SETCAPTOK = Set Operator Replay Token to Captured Data

  ----------------------------------------------------------------------------------------------------------------------------
                                           Set Opr Rpy Token to Capt Data (SETCAPTOK)
                                                                
                                                   Type choices, press Enter.
                                                                
   Capture Identifier . . . . . . . CAPID         [                                  ]{style="text-decoration: underline;"}                     Capture sequence number  . . . . CAPSEQ        [0    ]{style="text-decoration: underline;"}
                Capture date . . . . . . . . . . DATE          [\*CURRENT]{style="text-decoration: underline;"}                 First/Last time, or \*ANY date  . TIME          [\*LAST  ]{style="text-decoration: underline;"}
              Name of new/existing variable  . TOKNAM        [            ]{style="text-decoration: underline;"}    ----------------------------------------------------------------------------------------------------------------------------

###### Fields

+---------+------+--------+-----------------------------------------+
| Keyword | Size | Type   | Description                             |
+=========+:====:+:======:+=========================================+
| CAPID   | 30   | \*CHAR | Value must be enclosed in single        |
|         |      |        | quotes. Type up to 30 characters. Upper |
|         |      |        | and lower case letters, numeric digits  |
|         |      |        | and special characters are allowed.     |
|         |      |        | Spaces are allowed but not recommended; |
|         |      |        | use underline characters instead of     |
|         |      |        | spaces. This value must match an        |
|         |      |        | Application ID that has been registered |
|         |      |        | using the LSAM Menu 3, function 3.      |
+---------+------+--------+-----------------------------------------+
| CAPSEQ  | 3.0  | \*DEC  | The sequence number of the SPLF Scan    |
|         |      |        | Rule or the Operator Replay screen      |
|         |      |        | capture rule: Refer to the sequence     |
|         |      |        | number assigned to the captured data in |
|         |      |        | the LSAM view of the Captured Data Log  |
|         |      |        | (LSAM menu 3, option 8) to obtain or    |
|         |      |        | verify this number.                     |
+---------+------+--------+-----------------------------------------+
| DATE    | 8    | \*CHAR | -   \*CURRENT = (default) use the       |
|         |      |        |     current system date.                |
|         |      |        | -   \*ANY = use any available date,     |
|         |      |        |     based on the setting of the TIME    |
|         |      |        |     parameter, that is, the \*FIRST or  |
|         |      |        |     \*LAST date available.              |
|         |      |        | -   Optionally, specify a date in       |
|         |      |        |     CCYYMMDD format, to limit the       |
|         |      |        |     instance of the captured data to    |
|         |      |        |     either the first or last that is    |
|         |      |        |     available for this date.            |
+---------+------+--------+-----------------------------------------+
| TIME    | 6    | \*CHAR | -   \*LAST = (default) find the last    |
|         |      |        |     instance of this captured data on   |
|         |      |        |     the specified date.                 |
|         |      |        | -   \*FIRST = find the first instance   |
|         |      |        |     of this captured data on the        |
|         |      |        |     specified date.                     |
+---------+------+--------+-----------------------------------------+

:  

### Special \$-Variables

The Response Rule Command field and the Message Management Parameter
Event Command field support a list of reserved special variables that
begin with the US dollar sign (\$). These variables are replaced by IBM
i or OpCon job characteristics, and for Message Management the \$MSG
variable is replaced by the actual Primary message text.

  Variable           Description
  ------------------ --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  \$FREQUENCY NAME   The name of the OpCon/xps frequency table that was assigned to the job that issued the message.
  \$IBM JOB ID       The IBM i current job ID, in this format: 123456/JOBUSER/JOBNAME.
  \$IBM JOB NAME     The IBM i current Job Name.
  \$IBM JOB NBR      The IBM i current Job Number (always 6 digits, but handled as characters).
  \$IBM JOB USER     The IBM i current Job User Name (IBM i User Profile that started the job).
  \$JOBID            The OpCon job identifier, a 10-digit number.
  \$JOBID CMP        The OpCon job name and job identifier, joined into a single string with blanks compressed out.
  \$JOBID LONG       The OpCon job name followed by the job identifier, with all blanks retained in the string.
  \$JOB NAME         The OpCon job name.
  \$JOB LONG NAME    The long format of the complete OpCon job name.
  \$MACHINE NAME     The OpCon name for the LSAM job scheduler, normally the same as the LSAM Name specified in the LSAM Parameters (but the value supplied by OpCon with the job start request is used here).
  \$MSG              **Note**: \$MSG is not supported in the Response Rule command line, although it appears in the list for F10=\$VAR when a Response Rule is attached to a Message Data Capture Application. It is only supported in the Event Command line of a Message Management Parameter. Use Primary text capture or SETDYNVAR command to share \$MSG with Response Rules. Refer to Message Management.
  \$MSGID            **Note:** \$MSGID is not supported in the Response Rule command line, although it appears in the list for F10=\$VAR when a Response Rule is attached to a Message Data Capture Application. It is only supported in the Event Command line of a Message Management Parameter. Use the SETDYNVAR command to share \$MSGID with Response Rules. Refer to Message Management.
  \$SCHEDULE DATE    The date of the OpCon schedule under which the current job was started, in the (\*ISO0) format of CCYYMMDD.
  \$SCHEDULE NAME    The name of the OpCon schedule under which the current job was started.

  : Command Line \$-Variables

 

Within the LSAM, the variable token does not require any special
brackets or other characters. It is only necessary to start with the \$
sign, use all capital letters, and include one space between the name
parts, as shown in the table above. Refer to the follow Rules section
for information about the values that will actually be provided to
replace each of the \$-Variable tokens.

###### Rules For Special \$-variables

When using the \$-variables, the following constraints apply, depending
on the LSAM feature that is executing:

1.  The \$MSG variable is only available to the Message Management
    Parameters master record itself, within the Event Command line. This
    variable is not supported for Response Rules.
2.  The job that is referenced for providing OpCon and IBM job
    identifier values varies per LSAM feature, according to the
    following list.
    a.  [Message Management]{.ul}\         \
        IBM Job ID = the job that issued the message. The OpCon
        information will not be available if that job was not started
        by, or Tracked by OpCon.\
        \
        The IBM i Job ID that is stored with the Capture Log record for
        captured message data is the ID of the job that issued the
        message instead of the LSAM Message Management server job (as in
        older versions of this Agent software).
    b.  [Operator Replay]{.ul}\         \
        IBM Job ID = the script driver job, which is the job that shows
        in the OpCon Schedule.\
        \
        Unfortunately, the actual virtual workstation job itself cannot
        be referenced by the special \$-variables. To obtain the IBM i
        job identifiers for the virtual workstation job it is
        (currently) necessary to execute extra steps that will display
        the job ID on the screen, and then use Capture Data rules and
        Response Rules to store those values into dynamic variables.
    c.  [SCANSPLF (Scan Spool Files)]{.ul}\         \
        IBM Job ID = the job ID will vary depending on the type of task
        using this command. Sometimes it will be the ID of the Spool
        File job, other times it will be the job that is performing the
        SCANSPLF command. Depending on the Job ID that is selected,
        there may not be OpCon job or schedule information associated
        with that job.

### Managing Single Quotes and Commas in Captured Data

#### Problem Definition

##### Single Quotes

Single quotes included in captured data, such as message text, green
screen workstation displays or reports, can prevent storage of captured
data into dynamic variables. The single quote interferes with delimiting
character strings in IBM i command parameter values.

##### Commas

If a comma is included in the value of a dynamic variable it can
interfere with the syntax of OpCon Event commands whenever that dynamic
variable is included as one of the command parameter values. At this
time, commas are reserved characters in OpCon Event commands that are
used to separate the command parameters.

#### Preventing Special Character Errors

##### Captured Data Response Rules

The Compress Numeric field in the Response Rules master record supports
additional values (listed in the chart below) that can be specified for
character data. This set of field values controls the process of storing
captured data into a dynamic variable.

 

The most important purpose of this control is to prevent single quote
characters from interrupting the string of characters that is inserted
into the VALUE(\'value\') parameter of the SETDYNVAR command, since that
is the method used to store captured data into a dynamic variable.
Single quotes may either be replaced by space characters or they can be
escaped by doubling the single quote so that just one character will
actually be stored as part of the dynamic variable value.

 

Commas can also be replaced by spaces, optionally, although this is not
critical at the time a value is being stored, so it may be preferred to
use the character string edit codes that are assigned to the dynamic
variable master record.

##### Dynamic Variables

The COMMA parameter of the SETDYNVAR command, and the corresponding
\"Group Separator\" field in the dynamic variable master record, support
the same control values as shown in the chart below for non-numeric,
that is, character string values. These edit codes control how the value
returned for a dynamic variable token will be reformatted in order to
prevent potential problems with the way each dynamic variable may be
employed.

##### Special \$-Variables

Extended information about \$-Variables is provided above, in the
previous segment of this topic.

 

The \$MSG variable (supported only for Message Management) can be edited
for single quotes and/or commas by setting Configuration options on the
LSAM sub-menu 3: Utilities, option 7, in order to prevent errors when
\$MSG is used as a parameter of an OpCon Event command.

##### Table of Character String Edit Values

These character string edit control values may be used in the Response
Rule field: Compress Numeric, or in the Dynamic Variable COMMA control
field (which also controls the Grouping Separator value if a dynamic
variable is numeric). Note that character string edit rules do not apply
when a dynamic variable has been marked as a numeric value only.

The values shown in this table refer to EBCDIC values. Most Latin
character sets use the same hexadecimal values for the comma and the
single quote. If a client site\'s IBM i partition uses a CCSID character
set with different hex values, please contact SMA Support for
assistance.

-   C = replace any comma (,) X\'6B\' with a space (X\'40\')
-   Q = replace any single quote (\') X\'7D\' with a space (X\'40\')
-   D = replace both a comma and a single quote with a space
-   E = escape a single quote by inserting an extra single quote
-   F = replace comma with space AND escape a single quote by doubling

The concept of \"escaping\" the single quote is supported by IBM command
editors. When a character string is enclosed with a pair of single
quotes, such as the VALUE( ) parameter of the SETDYNVAR command, any
single quote that is included within the string would interrupt the
string unless there are two single quote characters. If there are two
single quotes, IBM command processing will replace them with just one
single quote as the character string is being processed, and the
characters that follow the doubled single quote will still be part of
the character string.

### Case Examples of SCANSPLF Applications

This discussion extends the How-To down to real applications of the SPLF
Scan Rules fields and the Captured Data Response Rules fields. The field
descriptions for the Scan Rules and the Capture Data Rules maintenance,
listed below in the Screens and Windows section, combine to form
different modes of operation for the SCANSPLF command. Various
applications of the SCANSPLF command are explained in the context of the
following example implementation cases.

#### Using the SCANSPLF PARAMETERS Keyword

The original application of the SCANSPLF command was as a tool for
automating the balancing functions of a financial institution. OpCon and
the IBM i LSAM can be used to fully automate the process of posting
transaction batches that originate from systems and networks outside of
IBM i. After the transaction batches are posted, the control totals from
the outside source are compared to the totals produced by the IBM i
batch posting programs. Without OpCon, this balancing process requires
some hours of operator time and the process is frequently subject to
human error. The SCANSPLF command reduces the process to just seconds
and improves accuracy to 100%.

 

For the application of financial report balancing, the control totals
from an outside source are assembled into a character string inside the
PARAMETERS keyword of the SCANSPLF command. A typical balancing function
includes four numeric totals: debit item count, debit total amount,
credit item count, credit total amount. The control totals input
parameter string looks like the example below, taking into account the
following exception.

 

In many cases, the editing of numeric fields with commas, a currency
sign and a decimal point is inconsistent between the outside source and
the IBM i batch posting report. This is why the Scan Rules support an
option to compress numeric values. The result of numeric compression is
that only digits appear in the PARAMETERS character string. The number
of decimal positions must be assumed for each individual parameter,
typically no decimal positions for an item count and two decimal
positions for an amount total (in US dollars).

 

Example control totals:

-   Debit item count = 385
-   Debit total amount = \$13,719.22 ([the space between the \$ and the     1 is intentional]{.ul})
-   Credit item count = 296
-   Credit total amount = \$13,719.22

Here is the command string generated by a MS Windows application program
executing on the OpCon/xps server. The application program was
responsible for obtaining the control totals that had been stored into
OpCon/xps properties by an previous job in the OpCon/xps schedule:

SCANSPLF APP(\'ACH-A\') PARAMETERS(\'385:1371922:296:1371922\')
FAILOPT(1)

 

Notice how the numeric data has been compressed into only the digits.
The entire PARAMETERS string must be enclosed in a pair of single
quotes. The FAILOPT (fail option) has been set to (1), indicating that
the SCANSPLF command should end abnormally if any of the input
parameters are not found to match, or end normally if all the input
parameters do match.

 

Before examining the LSAM SPLF Scan Rules required to support this form
of the SCANSPLF command, consider that sometimes the item count might
not be available from the source. In that case, a convention must be
established for signaling that on any given day, one input parameter
might not be available and so it should not be used to complete the
balancing function. The MS Windows programmer comes to agreement with
the IBM i LSAM Administrator that a special value of \*empty\* will be
used as a place-holder whenever any of the four expected input parameter
values is not available. If no credit item count is available, the
command string looks like this:

SCANSPLF APP(\'ACH-A\') PARAMETERS(\'385:1371922:\*empty\*:1371922\')
FAILOPT(1)

 

To process this SCANSPLF that will be executed in an IBM i job submitted
from an OpCon/xps schedule, the LSAM master files must be configured as
follows.

 

First, an Application ID must be defined. The Application ID can be up
to 30 characters long. In the example of the financial institution,
there were several batch posting jobs to be completed. Each job had its
own Application ID, and the long text allowed the name of the
application to be easily recognized by all personnel. In the example
above, the application ID is short: ACH-A. In the LSAM Scan Rules
maintenance function (LSAM menu 3, option 4), the Application ID is
registered along with the name of the IBM i job that runs to post the
transaction batch and the name of the batch balancing report spool file
produced by this job, as one or more Scan Rules are created, grouped
together by these key fields. For this example, the job name will be
POSTACHA and the spool file name will be QSYSPRT.

 

After the application ID is registered, it is then possible to create
the four SPLF Scan Rules required to match each of the SCANSPLF input
PARAMETERS. This discussion cannot anticipate how the report totals will
be recognized, so an assumption will be made that the last page of the
QSYSPRT report will look like this:

Example Financial Report Final Page

  -----------------------------------------------------------------------
       DEBIT COUNT:     385
       DEBIT TOTAL:  \$     13,719.22
       CREDIT COUNT:    296
       CREDIT TOTAL: \$     13,718.46     \* OUT OF BALANCE \*         
  -----------------------------------------------------------------------

Assuming that there may be General Ledger account sub-totals throughout
the report, it is important that the Scan Rules be defined so that
scanning for the totals fields labels starts from the end of the report.
It is possible that the correct totals could be found by counting the
number of incidences of each totals label starting from the beginning of
the report. But if it is not possible to guarantee how many different
sub-totals will appear in the report, then the only reliable option is
to start scanning from the end of the report.

 

According to this definition of the report, these are the required
values for each of the four SPLF Scan Rules in the LSAM database:

 

Application: ACH-A

 

Rule sequence: 10, 20, 30, 40 (one for each rule; the sequence numbers
could be 1, 2, 3, 4, up to 999). Rule sequence numbers must be unique
within an Application, even if different SPLF names are included within
one Application.

 

SPLF name: QSYSPRT

 

Job name: POSTACHA

 

SPLF number: \*ANY (this could be a specific number, if job POSTACHA
creates more than one report called QSYSPRT)

 

From/To page: \*END \*END (notice that the From-page is not \*STR or 1,
but \*END, to cause the scan job to start reading from the end of the
report for each rule)

 

Start scan label: DEBIT COUNT (for the first rule, and for the other 3,
use the labels shown above)

 

Scan label length: (leave at zero, but each label could be measured, so
the sizes would be 11, 11, 12, 12)

 

Position after label: (leave set to zeros so that the first non-blank
character starts the value scan)

 

(Scan) Value: \*PARM (the special value \*PARM is required for this
application, telling the scan job to use the input PARAMETERS values
supplied by the SCANSPLF command)

 

Scan value length: (leave the zeros for the item counts, but use a
length of 16 for each of the total amounts in order to get past the \$
sign and include all the numbers of the amount)

 

Bypass parm value: \*empty\*

 

Bypass value length: 7 (optional)

 

Compress numeric: Y (This must be set to Y for the totals amounts fields
in order to ignore the spaces and \$ sign, which are inconsistent with
the original format of the total amounts supplied by the transaction
source. The item counts could ignore numeric compression, but to assure
a valid numeric comparison, it is a good idea to use the compress option
for all four parameters in this case.)

 

Required rule: Y (A value of Y= yes is required whenever the Scan value
is \*PARM because this tells the scan program to consider each of the
rules in the final pass/fail decision at the end of the program.)

 

When the SCANSPLF command is executed in this example it is expected to
end abnormally. This is caused by the obvious out of balance condition
appearing in the sample report page. The total credit amount in the
report does not match the total amount submitted by the SCANSPLF
command. The FAILOPT(1) parameter of the SCANSPLF command tells the scan
program to force an abnormal end to the execution of the SCANSPLF
command when any parameter is not matched. This causes the OpCon/xps
schedule to show a failed balancing job.

 

When the OpCon/xps job definition includes response events upon
detection of a failed job, an operator or supervisor can be immediately
signaled by any number of means, including an eMail message or a text
message that gets routed to their cell phones (by outside facilities).

 

The IBM i LSAM SCANSPLF command includes a feature of reporting its scan
rule match results to the OpCon/xps Job Configuration window. Job Detail
Messages list the exact values that were mismatched. The OpCon/xps
operator can use a right mouse click on the OpCon/xps job line to access
(as in Enterprise Manager): Job Information -\> Configuration tab -\>
Operations Related Information -\> (+) Job Detail Messages, and
instantly the problem of the credit total amount being out of balance
will become visible. This makes it possible for the financial
institution\'s staff to learn nearly instantly about the out of balance
condition and to jump directly to the cause of the problem without
having to find and study the actual balancing report to look for report
totals.

#### Using the SCANSPLF Fail Option 2

The previous example explained how the SCANSPLF command can be used to
cause a failed job to appear in an OpCon/xps schedule whenever the
supplied PARAMETERS values are not all matched in an IBM i spooled
report file. It is also possible to make a failed job show in an
OpCon/xps schedule when there is a match for a Scan Rule, but end
normally when there is no match.

 

An example of this application is found at a site where there is a long
IBM i Control Language program that executes multiple sub-program calls.
No matter what happens to the sub-programs, the long CL program always
ends normally. Due to the inaccessibility of the third-party software
program source code, the site cannot easily use OpCon/xps and the IBM i
LSAM to monitor each sub-program of the big job. But the OpCon/xps
schedule must not be allowed to continue until it can be verified that
no steps in the big job have actually failed.

 

In this example situation, one solution is to use the SCANSPLF command
to scan the job log report that is produced by the job running the big
CL program. In the job log report, there will be an error message with a
severity code of 40 any time one of the sub-programs has failed. Without
the SCANSPLF tool, the IBM i system operator had to find the job log
report and manually read through all the pages of the report, looking
for any severity code of 40. Not only did this take a long time but it
was obviously subject to oversight on the part of the operator. Using
the SCANSPLF command provided nearly instant results and also improved
the accuracy of the search to 100%. As a result, on most days when there
was no problem, the OpCon/xps schedule was allowed to continue with
almost no delay.

 

To implement the SCANSPLF command for this application, the OpCon/xps
Call command line within the IBM i job was modified to include the IBM i
special separator character after the main Call command syntax, and then
the SCANSPLF command with its parameters was added to the Call command
line.

 

As documented in IBM i LSAM Configuration, under the Extended Discussion
section, inserting the user-defined special character (typically a
vertical pipe character: \| ) after the primary command signals the IBM
i LSAM job scheduler that additional job parameters may follow, and that
the LSAM should look for a SCANSPLF command at the end of the line. When
the SCANSPLF command is found, the LSAM sets up special controls so that
whenever it detects that the original IBM i job has completed normally,
it will not report the job completion status to OpCon/xps SAM until
after the SCANSPLF command has been used to survey the job log report
that was produced by the job. Then, the results of the SCANSPLF command
will be used to report the final job completion status to OpCon/xps SAM.
(The scan of the job log will not be conducted if the actual IBM i job
failed.)

 

In this case, there is no input data that must be provided by the
SCANSPLF command for comparison to the report content, although the
SCANSPLF PARAMETERS keyword could have been used as one optional way to
define this task. Instead of an input parameter string, the PARAMETERS
keyword was specified with its special value of \*RULES, meaning that
the Scan Rules in the LSAM database are all that is needed to define the
scan task.

 

One of the key ingredients for this solution is to set the FAILOPT
parameter of the SCANSPLF command to (2), so that the command will
report a failure if the Scan Rule (finding an error message) is matched,
but it will report normal termination if the Scan Rule is not matched.
So the command syntax for the SCANSPLF job looks like this:

SCANSPLF APP(\'ERR2\') PARAMETERS(\'\*RULES\') FAILOPT(2)

 

Note that the \*RULES special value for PARAMETERS must still be
enclosed in a pair of single quotes, and of course the FAILOPT is set to
a value of (2).

 

This application is defined in the IBM i LSAM database with the name
\"ERR2\" and for this example the job name will be BIGCLJOB. In all
cases, the report spool file that contains the job log information will
be called QPJOBLOG. So these are the three key parameter values required
to define the SCANSPLF Scan Rules using the LSAM menu 3, option 4.

 

Here is an example of a segment of a fake job log report showing how it
appears just after a heading line, where the target severity code will
be found:

Example pf QPJOBLOG Report Spool File

  -----------------------------------------------------------------------------------------
   \*\...+\....1\....+\....2\....+\....3\....+\....4\....+\....5\....+\....6\....+\....7 
    5722SS1 V5R4M0 000000                           Job Log
     Job name . . . . . . . . . . :   BIGCLJOB        User  . . . . . . :
     Job description  . . . . . . :   QBATCH          Library . . . . . :
   MSGID      TYPE                    SEV  DATE      TIME             FRO
                                          members added, 0 members replac
                                          damaged.
   CPF1234    Escape                  40   00/00/00  14:49:20.238792  QDB
                                        Message . . . . :   Program faile
                                        Cause . . . . . :   Program SUBPG
                                          reporting error code RNX1999, s
                                          and retry.
   CPI3203    Information             00   00/00/00  14:49:20.238872  QDB
  -----------------------------------------------------------------------------------------

Only one SPLF Scan Rule is required for this application. A rule must be
defined that will discover the message severity code of 40 on any line
of the job log report. The IBM i QPJOBLOG report always lists message
severity codes in columns 36 - 37 of the report, and since there is very
little other data (only heading data) that will appear in these columns
of the report, it is easy to define the scan rule. The following SPFL
Scan Rule field values include some extras that will be added in this
case in order to make the results of the SCANSPLF job more useful to the
operators whenever a sub-program error is found. The extra data is
explained below, along with an example of how to use Captured Data
Response rules.

 

Application: ERR2

 

Rule sequence: 10

 

SPLF name: QPJOBLOG

 

Job name: BIGCLJOB

 

SPLF number: \*ANY (there is only one job log report per job)

 

From/To page: \*STR \*END (the whole report will be searched from top to
bottom)

 

From/To position: 36 37 (the report QPJOBLOG is known to always put the
message severity code into columns 36-37 on a report line, and the
string of \'40\' will never appear on any other line of a QPJOBLOG
report in these positions)

 

Start scan label: 40 (the Scan Label is used to find the first incidence
of a severity code 40; the scan value field will be used for a different
purpose in this example)

 

Scan label length: 2 (could be left as zero, or specify 2)

 

Position after label: -1 (Use this value to find the actual error
message that will appear in column 1 of the report line, BEFORE the scan
label. A specific Positive column count could also be used in this case,
but it\'s just easier to enter -1 and not have to count the columns.)

 

(Scan) Value: \*CAPT (the special value \*CAPT is being illustrated in
this example, even though it is not required for the simple purpose of
reacting to the discovery of a severity code 40)

 

Scan value length: 7 (this example shows how 7 characters will be
captured from the beginning of the report line where severity code 40 is
found, so that the actual error message ID can be used by a Captured
Data Response rule)

 

Compress numeric: N (It is important that the default value of N = no be
used in this example.)

 

Required rule: Y (A value of Y= yes is required in this case in order to
trigger the SCANSPLF logic that will report a pass or fail based on a
required match or no-match to this Scan Rule.)

 

There is more than one way this scan could have been effectively
defined, producing the same pass/fail result. For example, instead of
using the scan label, the scan value could have been specified, but this
option was ignored in order to allow for the Captured Data Response rule
option that is defined below. Similarly, if the capture option were not
desired, the \*PARM scan value could have been used and the string of
\'40\' could have been specified in the SCANSPLF PARAMETERS keyword.

 

Another aspect of this example to consider is how the From/To position
(col) values are used. If a scan label is not specified, then the
From/To position values are used to control which columns of the report
line are searched for the scan value. But when a scan label is
specified, then the From/To position fields are dedicated to isolating
the scan label only. The scan value is not constrained by the From/To
position fields when a scan label is used because the field \"Position
after label\" and the Scan value length are used instead to locate the
scan (or capture) value itself.

 

The captured data definitions provided above have nothing to do with the
original intention of this example task. If the only goal is to cause a
job on an OpCon/xps schedule to fail whenever a severity code of 40 is
found in a job log report, then it would be sufficient to use any of the
three methods described above to scan for this string. The fact that the
\"Require rule\" flag is set to Y = yes triggers the SCANSPLF overall
result, and that result is interpreted according to the setting of the
FAILOPT parameter in the SCANSPLF command.

 

This task example without the captured data element illustrates how it
is possible to safely allow the remaining OpCon/xps schedule to continue
whenever no severity codes of 40 are found in the BIGCLJOB job log. When
no error is found, the OpCon/xps schedule completes quickly without
having to wait for an operator to manually examine the job log report.
However, when a severity of 40 is found, then maybe an operator\'s
intervention will be required to evaluate the point of failure and
decide how to recover.

 

Even if an error is intercepted, the SCANSPLF Scan Rules, the Captured
Data Response Rules and some utilities associated with this command can
be used to simply the operator\'s analysis and speed up the process of
discovering the point of failure. Often, a self-repairing procedure can
be created in OpCon/xps. In response to the error condition it is
possible to initiate a new schedule and add jobs to it so that the error
condition, if recognized, can be corrected and then normal processing
can be automatically resumed.

##### Finding Scan Values in a Report

For the SCANSPLF command, all matched Scan Rules have their scan values
stored in the LSAM\'s Captured Data Log file. The contents of this file
may be viewed using the LSAM menu 3, option 8. This file also contains
data that may be captured from Operator Replay scripts, whenever a
screen data capture rule is defined. But by default, when the log viewer
program is started from the LSAM menu 3, the list is limited by a subset
rule to only data captured by the SCANSPLF command. (Use F15=Subset to
change the subset rule in effect for the list display.)

 

Each Scan value in the Captured Data Log file is labeled with the report
page, line and column where the data was found. This means that in the
example application above for scanning the QPJOBLOG report, the location
of the failing sub-program could be found very quickly if the operator
would use the Captured Data Log file viewer to find this SCANSPLF
Application (labeled as the Capture ID on the list display), and then
find the record(s) associated with the correct date and time.

 

The primary purpose of the example QPJOBLOG application described above
was to report a failed job on an OpCon/xps schedule if any severity code
of 40 is found. The single Scan Rule described above finds only the
first instance of a severity 40 code. But it could be equally important
to find ALL of the severity 40 codes that appear in the job log report.
To make sure all errors are found and reported, more than one Scan Rule
could be specified for this Application. Only the first Scan Rule needs
to be marked as required (Required rule = Y). To find more similar
codes, an estimated number of additional Scan Rules could be created
based on the greatest number of severity 40 codes that might ever be
expected. Each of the additional Scan Rules would be marked as not
required. Each of the additional Scan Rules would use the Start Scan
Label to find the string \'40\' in From/To positions 36-37, but each
succeeding Scan Rule would have a higher Incidence count. The additional
Scan Rules would be numbered 2 and higher. If only 2 severity codes were
found, then the remaining Scan Rules would be ignored and they would not
affect the outcome of the SCANSPLF job.

 

Using the LSAM menu function to view the Captured Data Log file, each
severity 40 code that was found could be quickly located by the report
page and line. This would make the process of analyzing all the points
of failure more efficient. As well, each found severity 40 code could
trigger another Captured Data Response Rule in order to initiate
automated reporting and recovery procedures.

 

Additional assistance could be provided to the application operator for
every severity 40 code was found if each of the Scan Rules would specify
the same \*CAPT option in the Scan value field. Using the Position after
label value of (-1) and a Scan value length of 7, the CPF message ID for
each severity 40 error would become the actual captured data that
appears in the Captured Data Log file. This ability to capture and
report data associated with a severity 40 error code could be extended
even farther, as described next.

##### Using Captured Data Response Rules

In the Scan Rule defined above for the example BIGCLJOB the special
value of \*CAPT was specified in the Scan Value field. As mentioned just
above, every matched Scan Value is logged into the LSAM\'s Captured Data
Log file. Instead of just logging the severity 40 error code, the Scan
Rule was constructed so that the severity 40 code was found as a Scan
label, leaving the Scan Value field free for capturing any helpful data
related to the severity 40 code. In the example above, it is proposed
that it might be helpful to capture and share the CPF message ID that
describes each severity 40 error code. (Additional Scan Rules, set as
not required, could be created for the purpose of capturing other data
elements from the same report line.)

 

In addition to the Captured Data Log file viewer, the LSAM offers more
tools that can be used to respond to any matched Scan Rule, based on the
Captured Data Log record. On LSAM menu 3, option 5 supports entry of one
or more Captured Data Response Rules (described in the Screens and
Windows section below) that can be linked to each Scan Rule.

 

A Response Rule will not be executed unless the Scan Rule qualifies as
matched. In the example application described here, Response Rules could
be used to communicate the captured CPF message ID for each severity 40
error code that is found to OpCon where the CPF message ID can be stored
as a Job Detail Message associated with the OpCon job.

 

This section explains how to make that happen. It describes how to
combine these LSAM features:

-   Captured Data Response Rule
-   Storing captured data in an LSAM Dynamic Variable
-   Using the LSAM\'s SAMJOBMSG command to communicate with OpCon, using
    the value in the Dynamic Variable

The reason for sending Job Detail Messages to OpCon is that it is very
easy for an OpCon operator to find the Job Detail Messages. This is
done, for example, by using a right mouse click on the job, such as it
may appear in a list of jobs for an OpCon schedule. The right mouse
context menu that appears in Enterprise Manager offers access to Job
Information. When that is selected, a window opens with tabs that can be
navigated as follows: Configuration tab -\> Operations Related
Information -\> (+) Job Detail Messages. Job Detail Messages that can be
sent by the IBM i LSAM will appear here. It would probably be very
helpful to an operator to get an immediate list of any/all CPF message
IDs that are associated with the severity 40 error codes found by the
SCANSPLF job. The operator would be automatically signaled that the
SCANSPLF job has failed, and then the CPF message IDs - or any other
information captured and sent by the LSAM - would be just a mouse click
away.

 

To deliver Job Detail Messages to OpCon, there is an LSAM command called
SMAJOBMSG. This command is only valid for use within a job that was
started by OpCon, such as the job executing the SCANSPLF command. The
SMAJOBMSG command can be used to send the CPF message IDs to the OpCon
Job Detail Messages. A Captured Data Response Rule that executes when a
severity 40 error code is found can name the SMAJOBMSG command in its
response command line. The Captured Data Response Rule command line
supports LSAM Dynamic Variables, so if the CPF message ID was stored as
a Dynamic Variable, it could be inserted into the SMAJOBMSG text
parameter. Fortunately, the Captured Data Response Rule also has the
option of naming a Dynamic Variable in which to store the captured data,
and the module that executes the Captured Data Response Rule always
performs the storage of captured data to variables before it attempts to
execute the response command. Following is more detail about how to set
up this link between the LSAM and OpCon.

 

The link between the scanning process and OpCon is defined in the
Captured Data Response Rule master record. Here is a list of the fields
in that file showing the settings required to complete the example task.
The field values listed here are based on the example SPLF Scan Rule
described above.

 

Capture identifier: ERR2

 

Capture sequence: 10 (if there are additional scan rules, use the
correct sequence number for each in separate Response Rules)

 

Response sequence: 10 (multiple Response Rules can be assigned to the
same capture identifier and sequence; this number governs the order in
which response rules are executed)

 

Compare rule: EQ (this example does not qualify the response rule, so it
is set up as \"equal \*ANY compare data\")

 

Continuation: (blank) (not used in this example)

 

Compress numeric: N (= no; no comparison is being done, so this field
does not apply)

 

Dynamic variable: CPFERR1 (this will be the name of the Dynamic Variable
into which the response rule program will store the CPF message ID)

 

Operator Repay variable: (blanks) (not used in this example)

 

Response command:

SMAJOBMSG TEXT(\'Found error ID is: {CPFERR1} \') MSGSEQ(0)

 

\--\> Notice that the Dynamic Variable name is inserted into the TEXT
parameter surrounded by the pair of curly brackets { }, which are the
default separators for Dynamic Variables. (The separator characters
could be changed from the LSAM\'s Job Tracking menu \# 1, using the Job
Tracking Configuration function \# 7.) The MSGSEQ must be unique within
any one job, so if other Captured Data Rules also use the SAMJOBMSG
command, make sure each rule gets a unique number for the MSGSEQ,
preferably in order of their execution. (HINT: Always leave the MSGSEQ
parameter set to zero, its defaut value, so that OpCon can automatically
assign a unique number to each separate Job Detail message and avoid
overlaying any previous message that was sent.)

 

Compare data: \*ANY (this rule is not qualified by any comparison to the
captured value)

##### FAILOPT(2) Example Summary

The Captured Data Response Rule defined above will only execute if the
example SPLF Scan Rule in the defined previous paragraphs finds a match.
For the overall example of the BIGCLJOB defined in this section, here is
a summary of the actions that take place, in order of execution:

-   In this example, the matching process is based on finding the scan
    label, which is any severity 40 error code in a job log report. The
    scan label in the scan rule record is used instead of the PARAMETERS
    keyword of the SCANSPLF command.
-   If the scan program finds no code 40 in the job log report the whole
    process ends and the FAILOPT parameter of the SCANSPLF command
    causes the job to end normally. The remaining jobs that depended on
    the BIGCLJOB are immediately allowed to execute.
-   When the scan program finds a code 40, the scan rule then finds and
    stores the CPF message ID on that line of the report.
-   Next, the scan program calls the response rule module, and that
    module finds the Captured Data Response Rule defined above.
-   The response rule stores the captured data into an LSAM Dynamic
    Variable.
-   The response rule replaces the Dynamic Variable token in the
    response command with the latest value for that variable, which in
    this case is the CPF message ID.
-   The response rule program executes the revised response command,
    causing a Job Detail Message to be sent through the LSAM
    communications channel to the OpCon SAM, and the message is logged
    to the current job.
-   Since there is only one scan rule and one response rule, after they
    are processed the SCANSPLF command program is finished. According to
    the FAILOPT parameter of the SCANSPLF command, finding a match on
    the scan rule means that the job should be forced to end abnormally.
-   The OpCon operator sees that the LSAM has signaled a failure for the
    OpCon job. The operator views the Job Configuration information
    about that job and finds the Job Detail Message sent by the LSAM.
-   Perhaps the OpCon operator contacts the IBM i operator and reports
    that it will be necessary to examine the BIGCLJOB job log to analyze
    why there was a failure.
-   The IBM i operator uses the LSAM menu system\'s viewer of the
    Captured Data Log to locate the captured data for the last execution
    of the BIGCLJOB job and finds the exact page and line of the job log
    where the error was reported.
-   The IBM i operator is able to use an IBM i tool to open and view the
    BIGCLJOB job log report and position the viewer to the correct page
    and line, from which point the preceding messages are studied to
    learn the cause of the failure.
-   Optionally, the OpCon operator could have used the View Output
    function, available on the right mouse click context menu associated
    with the BIGCLJOB, to request a view of the job log. This view of
    the job log is not as easy to position as when an IBM i spool file
    viewer is used, but it is possible to scan for the CPF message ID
    and quickly locate the correct place in the job log where the error
    may be studied.

The last few summary steps above assume that the error condition is
unique and requires human operator intervention. However, in cases where
error conditions might be somewhat common, it could make sense to
construct IBM i LSAM and OpCon/xps configurations that would insert a
self-healing and recovery procedure into the daily processing so that
after the error has been documented, normal processing would be resumed
automatically.

### The Data Capture Logging Functions

There are two different log files in the LSAM database that store
information about captured data. The first log file (OPRLOGF40) is where
the actual captured data elements are stored. The second log file
(CAPLOGF10) is a debug log file that stores detailed information about
both the process of capturing data and the process of executing response
rules.

 

These files are logically joined together by four key fields. The first
two key fields are common to all types of data: The Application ID and
the capture rule Sequence number. Both files are used by the SCANSPLF
command and by the Operator Replay script execution driver program.
There is a data type field in each file that labels the data as type C =
Operator Replay screen capture and S = SCANSPLF matched scan values.

 

The values of the secondary key fields, that is, the third and fourth
key fields, depend on which type of data is stored. For type C, the
secondary key fields are the Operator Replay script Name and the script
step Sequence number. For type S, the secondary key fields are the Spool
File Name and the Spool File Number (an attribute of the spool file
relative to other spool files produced by the same job).

#### The Log of Captured Data

File OPRLOGF40 is where captured data is stored by either the SCANSPLF
command or by an Operator Replay script that uses screen capture rules.
This file is categorized as an LSAM daily log file. As such, it is
purged of older records according to the record date under the control
of the LSAM Parameter: Days (to) keep LSAM logs.

 

An Operator Replay script screen data capture rule always stores data in
the data capture log file. But the SCANSPLF command can only store data
in this log file when it finds a match to a SPLF Scan Rule. The reason
that the SCANSPLF command does not store captured data for mismatched
rules is that there is no guarantee that the desired scan rule data
would ever be found in the report, and it is not possible to compute the
actual page, line and row where the scan data was located.

 

  -------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **TECHNICAL NOTE:** [The execution of optional Captured Data Response Rules could have been implemented as the result of a trigger added to the Data Capture log file. Instead, the search and execution of Response Rules has been implemented in a single, centralized program module that is shared (compiled by copy) by all programs that write to this log file. This choice was made due to its relative efficiency, its ease of maintenance and to keep database maintenance simpler.]
  -------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

The data capture log file may be viewed from either LSAM menu 3: Events
and Utilities, or from LSAM menu 4: Operator Replay, using function 8 on
either menu. Each menu call to the inquiry function sets a parameter
that causes the initial list display to be filtered by data type, so
that only SCANSPLF records appear from menu 3 and only Operator Replay
records appear from menu 4. However, function key \<**F15**\> may be
used from either starting point to change the subset rule in effect for
the display.

#### Debug Logging of Captured Data Response Rules

The LSAM programs that process data capture and also Captured Data
Response Rules are all enabled to optionally write log entries to a
Captured Data debug log file, CAPLOGF10. This form of debug logging is
controlled by an LSAM Utilities configuration option, accessed as
function 7 on LSAM menu 3.

 

When captured data debug logging is turned on, multiple entries are
written to this debug log file in order to provide a trace of all
activity related to data capture. Both the capture actions and any
associated response rule actions are logged in the same file. Mnemonic
labels of each entry help to portray a profile of what happens with each
data capture. The high level outline of this profile is visible in the
initial list display of this file, using the LSAM menu functions. A list
of the mnemonic record labels is presented under the Utilities Screens
and Windows section, below.

 

The captured data debug log file may be viewed from either LSAM menu 3:
Events and Utilities, or from LSAM menu 4: Operator Replay, using
function 9 on either menu. Each menu call to the inquiry function sets a
parameter that causes the initial list display to be filtered by data
type, so that only SCANSPLF records appear from menu 3 and only Operator
Replay records appear from menu 4. However, function key \<**F15**\> may
be used from either starting point to change the subset rule in effect
for the display.

#### Recommended Strategy for Use of Captured Data Log Files

The default setting of the LSAM log files for captured data is to purge
the data capture log file according to LSAM Parameters without regard to
a database backup schedule. The debug feature for captured data
operations may be set off (depending on when the LSAM was originally
installed).

 

At some sites it may be preferred to leave the captured data debug
function turned off except during the early stages when new rules are
being implemented and require diagnosis to stabilize their operation.
After the diagnostic stage is over, the debug feature can be turned off
in the LSAM Utilities configuration (LSAM menu 3, function 7) and the
debug log file will be purged by the LSAM daily maintenance server job
(at the hour specified by the user in the LSAM Parameters, Main menu
option 7).

 

However, some sites that use data capture and captured data response
rules may be subject to strict auditing of their automation procedures.
For example, a financial institution that chooses to use these LSAM
tools to automate balancing functions might be required to provide proof
of the reliability of their balancing operations. In this case it would
be very important to leave the captured data debug function turned on at
all times, and equally important to adopt a careful plan for making and
preserving backup copies of these captured data log files, before they
are purged or cleared. This way, the LSAM log file viewer functions
could be used at any time to present the proof required by an audit.

 

The LSAM includes the command SMARGZ that can be used on a schedule
coordinated with the LSAM Parameter settings, so that the LSAM database
library (default name SMADTA) is backed up to a save file periodically
and before the LSAM would purge the daily log files or clear the debug
log files. In fact, the SMARGZ command calls the command SMASUP in
\"LIB\" mode, making a backup of the entire LSAM database library first
before it then clears all the LSAM debug log files and reorganizes
master files. When the SMARGZ command is used this way, a collection of
save files is accumulated in the library called SMALOG (which is shared
by all LSAM environments, if more than one is installed). The site can
create a procedure to run periodically from an OpCon schedule that will
backup the contents of the SMALOG library before the SMARGZ procedure is
launched in a dependent job. This will create an archival history of the
captured data log files that could be retrieved on demand, by date, in
order to satisfy audit requirements.

 

More information about the SMARGZ and SMASUP commands is provided in
[Log File and Database Management](Log-File-and-Database-Management.md#top){.MCXref
.xref} and [Commands and Utilities](Commands-and-Utilities.md#top).

 

  -------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **TECHNICAL NOTE:** [In order to use the LSAM menu functions to view historical log data, it would be necessary to restore the backed up log files from a save file produced by the SMASUP command to a temporary staging library. The LSAM menu functions can be used to view the log file contents if the staging library is added above SMADTA in the job\'s library list.]
  -------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### Strategy for Audits of Data Capture and Response

Sites that are subject to audits of automated procedures may need to
understand exactly how the LSAM software manages the content of the two
types of log files that support Data Capture and Captured Data Response
Rules. (This is explained in LSAM Logs and Database Management.) For
example, the captured data debug log file may be useful as a proof to
show an auditor. In such a case, certain LSAM configuration options and
procedures need to be carefully controlled in order to preserve an
accurate record of captured data and any response commands that are
executed.

 

There are two different log files associated specifically with captured
data. First is the Data Capture Log file (OPRLOGF40) which is of the
type classified as an LSAM daily operational log. In other words, this
file is always used and its use is not controlled by an LSAM option. The
other file (CAPLOGF10) is a general purpose debug log file that is not
used unless a debug option is turned on. There is a different purge
control for these two file types, although the LSAM does create backup
save files in library SMALOG for both log file types.

 

The Data Capture Log file holds the actual captured data, along with
profile information that identifies how and when the data was captured.
The SCANSPLF command stores recognized scan values in this file,
although it is not able to store a record of scan values that were not
discovered in a target spool (report) file. The Operator Replay script
driver program also stores data in this file whenever there are screen
data capture rules registered against the sequence steps of a replay
script. The Data Capture log file records are used as the reference
point for selection and execution of Captured Data Response Rules. The
common module, shared by both LSAM functions, that writes Data Capture
Log file entries is the module that checks for any Captured Data
Response Rules at the same time.

 

Both of these LSAM functions check the LSAM data capture debug control
flag stored in the LSAM Parameters control file. This control flag is
set by using the LSAM Utilities configuration function: LSAM menu 3,
function 7. The one flag controls debug logging for both features. When
the debug flag is set to Y=yes, each LSAM feature writes multiple
records to the debug log file to provide detailed information about the
data capture process and especially about the handling of any Captured
Data Response Rules. The debug log file is the only place where a record
may be found of actions performed by the Captured Data Response Rules.

 

For the purpose of supporting automation audits, this discussion assumes
that both log files should be used and that a complete and accurate
history of content must be preserved in archival backup tapes. Both the
LSAM Events and Utilities sub-menu and the Operator Replay sub-menu
provide two log file viewers at functions 8 and 9 that can be used to
view the captured data daily log file and the debug log file,
respectively. These viewer programs normally display the current content
of each log file, but they can also be used to provide a formatted view
of log file copies that are restored from archive, either by use of file
overrides or by manipulation of the interactive job\'s library list.

 

Here is a high-level summary of the steps SMA would recommend to
establish a reliable audit trail for LSAM automation. This strategy
actually applies to all of the LSAM features, not just to the data
capture procedures. These steps are discussed in more detail following
the outline:

1.  Start debug logging, e.g., for data capture using LSAM menu 3,
    function 7.
2.  Set LSAM Parameters \"Days to keep daily logs\" and \"Days to keep
    debug logs\" to a number of days at least as long as the frequency
    of the SMARGZ job defined in the following steps.
3.  Set LSAM Parameters for the \"Days to keep daily BkUp\" and for
    \"Days to keep debug BkUp\" which specifies how long to keep the
    backup save files that hold data which was purged from the active
    log files.
4.  Create a user-defined procedure for backing up library SMALOG to
    tape. This user-defined step is critical if it is important to
    preserve an archive of all automation activity that was recorded in
    LSAM log files, because the SMARGZ procedure, below, deletes older
    save files based on the \"Days to keep\...BkUp\" control values.
5.  Create an OpCon schedule for LSAM database maintenance with jobs
    that will not start until other LSAM activity is completed.
6.  The first job of the LSAM database maintenance schedule completes
    the user-defined procedure to backup library SMALOG to tape.
7.  The next job in the schedule executes the SMARGZ command. (Note: Use
    the LSAM\'s own server job description, SMALSAJ00 in SMADTA (or
    equivalent library) to execute the SMARGZ command in any subsystem
    so that the job will be using an LSAM environment library list.)
8.  Set subsequent IBM i jobs to not start until the SMARGZ job has
    completed normally.

The second and third steps in configuring the LSAM to preserve the
captured data log files is to set the purge controls that affect each
type of file. The Data Capture Log file is purged of records according
to the date of each record. This purge function happens at the
Maintenance Hour specified in the LSAM Parameters (LSAM main menu,
function 7). Records are retained according to the number of days to
keep LSAM logs, as specified on the LSAM Parameters. This number of days
field affects all of the LSAM daily operational log files, and/or the
debug/audit logs, in general. The LSAM daily database maintenance
procedures always create backup save files in the library SMALOG, using
type \"O\" save files (first letter of the save file name is an \"O\",
followed by a date/time stamp) for the daily Operational log save file,
and using type \"D\" save files for the Debug/audit log save file.

 

It will be important to coordinate the LSAM library SMALOG backup
schedule with the two number of days to keep log file backup save files
in library SMALOG, in order to assure that no records are lost when the
SMARGZ procedure automatically deletes old save files from SMALOG.

 

The SMARGZ command starts by executing the SMASUP command in its \"LIB\"
mode, that is, it creates a save file backup of the entire LSAM database
library SMADTA. The SMARGZ command next reorganizes all of the LSAM
database files that are not set to \"re-use deleted records,\" during
which time the LSAM server jobs are suspended. Finally, SMARGZ deletes
old save files from the SMALOG library according to the number of days
to keep save files, set in the LSAM Parameters (LSAM main menu, function
7). But, the SMARGZ command does not provide any means to automatically
backup the SMALOG library before old save files are deleted, which is
why it is critical to configure a user-defined archiving strategy for
the SMALOG library.

 

The LSAM Parameters (LSAM main menu, function 7) provide some
rudimentary schedule control fields that could be used to control when
the LSAM\'s internal database maintenance server program would cause the
SMARGZ program to be executed. These fields are illustrated and
explained in the Configuration topic. This simple strategy may be
sufficient for sites that are not subject to automation audits, but it
is not recommended for sites that will be audited because it does not
provide any coordination with a user-defined procedure for backing up
the SMALOG library to tape. In place of the LSAM controls, SMA
recommends that an OpCon schedule be created with an IBM i job that will
execute the SMARGZ command.

 

Utilizing an OpCon schedule for execution of the SMARGZ command offers
two important advantages. First, the SMARGZ job can be made dependent
upon successful completion of the user-defined backup procedure that
saves library SMALOG to tape. Second, it is much easier to assure that
no IBM i LSAM jobs are running during the brief period when the LSAM
services are suspended by the SMARGZ command. This second point is
especially important because it can help prevent any Operator Replay or
SCANSPLF jobs from running during the LSAM database maintenance
procedures, helping to assure that there will be no gaps in the captured
data debug log file history of any job.

#### Restoring and Viewing Archived Log Data

The discussion of strategy for audits is completed by this brief review
of techniques that can be used to restore log files from archive for
viewing during an audit. This is the same procedure used by SMA when the
SMASUP save files are sent to Support to analyze a problem. Each save
file produced by the SMASUP command is named according to the date and
time the file was created, using this pattern: xCYYMMDDhhmm, where \"x\"
is a fixed letter (L for LIB and LOG saves completed by SMASUP, O for
daily operational log file saves and D for debug/audit log file saves),
while the other letters refer to century, year, month, day hours and
minutes. Thus, it is easy to identify a save file that probably contains
log (and master) file data for a particular date. The audit review
process would start with restoring the desired save file from the
archival tape to a target, temporary library.

 

Next, the contents of the restored save file can themselves be restored
to the same temporary library (except for full library saves completed
by the SMASUP command in LIB mode - as when SMARGZ executes SMASUP)
using the RSTOBJ command. (Full library saves must be restored to a
separate, temporary library using the RSTLIB command.) After the files
are restored, start the LSAM menu system (command STRSMA, or LSAMENU).
To use the LSAM log file viewer programs for examining the restored log
files, add the temporary library to the top of the library list (using
the IBM i command ADDLIBLE). While the library list is altered, the LSAM
menu-driven log file viewers will show the contents of the restored log
files instead of the current versions of those files. After the
investigation is complete, remember to remove the temporary library from
the interactive job\'s library list, or just exit out of the LSAM menu
system.

 

  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **TECHNICAL NOTE:** [Some of the restored log and master files may require that a logical view be duplicated from the live SMADTA library to the temporary library, in order to support the LSAM log viewer programs. Please contact SMA Support for advice if this becomes necessary.]
  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Events Screens and Windows

### External Events Password

Events Password Window

  -----------------------------------------
  Type choices, press Enter.
   
  User Name \....:  \_\_\_\_\_\_\_\_\_\_ 
   
  Password  \....:
   
  Password  \....:
   
  (User and Pwd: 10 long max) 
  F12 = Cancel
  -----------------------------------------

###### Menu Pathways

Main Menu \> Events and Utilities (\#3) \> External Event Password (\#2)

###### Fields

  Field                Default  Description
  ------------------- --------- ----------------------------------------------------------------------------------------
  User Name             None    A valid OpCon/xps user name
  Password              None    The password that corresponds to the user name, as registered in the OpCon/xps system.
  Password (repeat)     None    This value must match exactly the value entered in the first password field.

  :  

###### Functions

**F12=Cancel**: Quits the user/password window and returns to the Event
Management menu.

### Event Management

-   **Screen Title**: Event Management (3 Pages)
-   **Screen ID**: LSAEVTR02

###### Menu Pathways

Main Menu \> Events and Utilities (\#3) \> External Management (\#1)

###### Fields

**Selection**: Enter an Option number or the Command name to select an
event.

 

  -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [The option numbers are not assigned to Command names on a permanent basis. SMA may update the available list of Event Commands, which makes the Option number subject to change. This number is a sequential number that is assigned to each line at the time the information is assembled for display. When planning to use Operator Replay to select a command from this list, always specify the Command name instead of the Option number, otherwise it is necessary to go back and update the Operator Replay Scripts whenever the Event Command list is updated by SMA.]
  -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Event Management Options

+-----------------+-----------------+------------+-----------------+
| Events          |                 |            |                 |
| Management      |                 |            |                 |
| Options         |                 |            |                 |
+=================+=================+============+=================+
| Command Type    | Name            | Command    | Description     |
+-----------------+-----------------+------------+-----------------+
| Schedule        | Schedule Cancel | SCHCNL     | -   To cancel a |
|                 |                 |            |     schedule,   |
|                 |                 |            |     enter an    |
|                 |                 |            |     existing    |
|                 |                 |            |     OpCon/xps   |
|                 |                 |            |     Schedule\'s |
|                 |                 |            |     name and    |
|                 |                 |            |     date.       |
|                 |                 |            | -   The default |
|                 |                 |            |     Schedule    |
|                 |                 |            |     date is     |
|                 |                 |            |     CURRENT.    |
+-----------------+-----------------+------------+-----------------+
|                 | Schedule Hold   | SCHHLD     | -   To place a  |
|                 |                 |            |     schedule On |
|                 |                 |            |     Hold, enter |
|                 |                 |            |     an existing |
|                 |                 |            |     OpCon/xps   |
|                 |                 |            |     Schedule\'s |
|                 |                 |            |     name and    |
|                 |                 |            |     date.       |
|                 |                 |            | -   The default |
|                 |                 |            |     Schedule    |
|                 |                 |            |     date is     |
|                 |                 |            |     CURRENT.    |
+-----------------+-----------------+------------+-----------------+
|                 | Schedule        | SCHRLS     | -   To release  |
|                 | Release         |            |     a schedule, |
|                 |                 |            |     enter an    |
|                 |                 |            |     existing    |
|                 |                 |            |     OpCon/xps   |
|                 |                 |            |     Schedule\'s |
|                 |                 |            |     name and    |
|                 |                 |            |     date.       |
|                 |                 |            | -   The default |
|                 |                 |            |     Schedule    |
|                 |                 |            |     date is     |
|                 |                 |            |     CURRENT.    |
+-----------------+-----------------+------------+-----------------+
|                 | Schedule Start  | SCHSTR     | -   To start a  |
|                 |                 |            |     schedule,   |
|                 |                 |            |     enter an    |
|                 |                 |            |     existing    |
|                 |                 |            |     OpCon/xps   |
|                 |                 |            |     Schedule\'s |
|                 |                 |            |     name and    |
|                 |                 |            |     date.       |
|                 |                 |            | -   The default |
|                 |                 |            |     Schedule    |
|                 |                 |            |     date is     |
|                 |                 |            |     CURRENT.    |
+-----------------+-----------------+------------+-----------------+
| Thre            | Threshold Set   | THRSET     | To set a        |
| shold-Resources |                 |            | threshold,      |
|                 |                 |            | enter a valid   |
|                 |                 |            | threshold name  |
|                 |                 |            | and value.      |
|                 |                 |            | Refer to        |
|                 |                 |            | [               | |                 |                 |            | Thresholds](htt |
|                 |                 |            | ps://help.smate |
|                 |                 |            | chnologies.com/ |
|                 |                 |            | opcon/core/late |
|                 |                 |            | st/Files/Concep |
|                 |                 |            | ts/Thresholds.h |
|                 |                 |            | tm#top){.MCXref |
|                 |                 |            | .xref} in the   |
|                 |                 |            | **Concepts**    |
|                 |                 |            | online help.    |
+-----------------+-----------------+------------+-----------------+
|                 | Resource Set    | RESSET     | To set a        |
|                 |                 |            | resource, enter |
|                 |                 |            | a valid         |
|                 |                 |            | resource name   |
|                 |                 |            | and value.      |
|                 |                 |            | Refer to        |
|                 |                 |            | [Resources](ht  |
|                 |                 |            | tps://help.smat |
|                 |                 |            | echnologies.com |
|                 |                 |            | /opcon/core/lat |
|                 |                 |            | est/Files/Conce |
|                 |                 |            | pts/Resources.h |
|                 |                 |            | tm#top){.MCXref |
|                 |                 |            | .xref} in the   |
|                 |                 |            | **Concepts**    |
|                 |                 |            | online help.    |
+-----------------+-----------------+------------+-----------------+
| Token           | Token Add       | TOKADD     | To add a token, |
|                 |                 |            | enter a valid   |
|                 |                 |            | token name and  |
|                 |                 |            | value. Refer to |
|                 |                 |            | [Properties]    | |                 |                 |            | (https://help.s |
|                 |                 |            | matechnologies. |
|                 |                 |            | com/opcon/core/ |
|                 |                 |            | latest/Files/Co |
|                 |                 |            | ncepts/Properti |
|                 |                 |            | es.md){.MCXref |
|                 |                 |            | .xref} in the   |
|                 |                 |            | **Concepts**    |
|                 |                 |            | online help.    |
+-----------------+-----------------+------------+-----------------+
|                 | Token Delete    | TOKDEL     | To delete a     |
|                 |                 |            | token, enter a  |
|                 |                 |            | valid token     |
|                 |                 |            | name. Refer to  |
|                 |                 |            | [Properties]    | |                 |                 |            | (https://help.s |
|                 |                 |            | matechnologies. |
|                 |                 |            | com/opcon/core/ |
|                 |                 |            | latest/Files/Co |
|                 |                 |            | ncepts/Properti |
|                 |                 |            | es.md){.MCXref |
|                 |                 |            | .xref} in the   |
|                 |                 |            | **Concepts**    |
|                 |                 |            | online help.    |
+-----------------+-----------------+------------+-----------------+
|                 | Token Set       | TOKSET     | To set a token, |
|                 |                 |            | enter a valid   |
|                 |                 |            | token name and  |
|                 |                 |            | value. Refer to |
|                 |                 |            | [Properties]    | |                 |                 |            | (https://help.s |
|                 |                 |            | matechnologies. |
|                 |                 |            | com/opcon/core/ |
|                 |                 |            | latest/Files/Co |
|                 |                 |            | ncepts/Properti |
|                 |                 |            | es.md){.MCXref |
|                 |                 |            | .xref} in the   |
|                 |                 |            | **Concepts**    |
|                 |                 |            | online help.    |
+-----------------+-----------------+------------+-----------------+
| Log             | Console Display | CONDSP     | To send a       |
|                 |                 |            | message to the  |
|                 |                 |            | SAM log file,   |
|                 |                 |            | enter a text    |
|                 |                 |            | message. Refer  |
|                 |                 |            | to [External    | |                 |                 |            | Events](https:  |
|                 |                 |            | //help.smatechn |
|                 |                 |            | ologies.com/opc |
|                 |                 |            | on/core/latest/ |
|                 |                 |            | Files/OpCon-E |
|                 |                 |            | vents/Defining% |
|                 |                 |            | 20Events.md#Ex |
|                 |                 |            | ternal){.MCXref |
|                 |                 |            | .xref} in the   |
|                 |                 |            | **OpCon         |
|                 |                 |            | Events** online |
|                 |                 |            | help.           |
+-----------------+-----------------+------------+-----------------+
| Notification    | Event Log       | EVTLOG     | **No longer     |
|                 |                 |            | supported.**    |
|                 |                 |            | Existing uses   |
|                 |                 |            | of this command |
|                 |                 |            | are now         |
|                 |                 |            | supported by    |
|                 |                 |            | NTYLOG, using a |
|                 |                 |            | severity of I = |
|                 |                 |            | info. The       |
|                 |                 |            | default         |
|                 |                 |            | Notification ID |
|                 |                 |            | will be         |
|                 |                 |            | SMA0202.        |
+-----------------+-----------------+------------+-----------------+
|                 | Notify Action   | NTYACT     | **No longer     |
|                 |                 |            | supported.**    |
|                 |                 |            | Existing uses   |
|                 |                 |            | of this command |
|                 |                 |            | are routed to   |
|                 |                 |            | processing of   |
|                 |                 |            | the NTYLOG      |
|                 |                 |            | command.        |
+-----------------+-----------------+------------+-----------------+
|                 | Notify Log      | NTYLOG     | To send a       |
|                 |                 |            | notification,   |
|                 |                 |            | enter Severity  |
|                 |                 |            | (I, W or E),    |
|                 |                 |            | Notification ID |
|                 |                 |            | (up to 7        |
|                 |                 |            | characters),    |
|                 |                 |            | and text        |
|                 |                 |            | message. Refer  |
|                 |                 |            | to              |
|                 |                 |            | [Notification   | |                 |                 |            | Events](ht      |
|                 |                 |            | tps://help.smat |
|                 |                 |            | echnologies.com |
|                 |                 |            | /opcon/core/lat |
|                 |                 |            | est/Files/OpCon |
|                 |                 |            | -Events/Event |
|                 |                 |            | -Types.md#No |
|                 |                 |            | tifica){.MCXref |
|                 |                 |            | .xref} in the   |
|                 |                 |            | **OpCon         |
|                 |                 |            | Events** online |
|                 |                 |            | help.           |
+-----------------+-----------------+------------+-----------------+
| Job             | Job Bad         | JOBBAD     | -   To mark a   |
|                 |                 |            |     job bad,    |
|                 |                 |            |     enter an    |
|                 |                 |            |     existing    |
|                 |                 |            |     OpCon/xps   |
|                 |                 |            |     schedule    |
|                 |                 |            |     name, job   |
|                 |                 |            |     name, and   |
|                 |                 |            |     schedule    |
|                 |                 |            |     date.       |
|                 |                 |            | -   The default |
|                 |                 |            |     Schedule    |
|                 |                 |            |     date is     |
|                 |                 |            |     CURRENT.    |
+-----------------+-----------------+------------+-----------------+
|                 | Job Cancel      | JOBCNL     | -   To cancel a |
|                 |                 |            |     job, enter  |
|                 |                 |            |     an existing |
|                 |                 |            |     OpCon/xps   |
|                 |                 |            |     schedule    |
|                 |                 |            |     name, job   |
|                 |                 |            |     name, and   |
|                 |                 |            |     schedule    |
|                 |                 |            |     date.       |
|                 |                 |            | -   The default |
|                 |                 |            |     Schedule    |
|                 |                 |            |     date is     |
|                 |                 |            |     CURRENT.    |
+-----------------+-----------------+------------+-----------------+
|                 | Job Delete      | JOBDEL     | -   To delete a |
|                 |                 |            |     job from    |
|                 |                 |            |     the Daily   |
|                 |                 |            |     Schedule,   |
|                 |                 |            |     enter an    |
|                 |                 |            |     existing    |
|                 |                 |            |     OpCon/xps   |
|                 |                 |            |     schedule    |
|                 |                 |            |     name, job   |
|                 |                 |            |     name, and   |
|                 |                 |            |     schedule    |
|                 |                 |            |     date.       |
|                 |                 |            | -   The default |
|                 |                 |            |     Schedule    |
|                 |                 |            |     date is     |
|                 |                 |            |     CURRENT.    |
+-----------------+-----------------+------------+-----------------+
|                 | Job Hold        | JOBHLD     | -   To put a    |
|                 |                 |            |     job on      |
|                 |                 |            |     hold, enter |
|                 |                 |            |     an existing |
|                 |                 |            |     OpCon/xps   |
|                 |                 |            |     schedule    |
|                 |                 |            |     name, job   |
|                 |                 |            |     name, and   |
|                 |                 |            |     schedule    |
|                 |                 |            |     date.       |
|                 |                 |            | -   The default |
|                 |                 |            |     Schedule    |
|                 |                 |            |     date is     |
|                 |                 |            |     CURRENT.    |
+-----------------+-----------------+------------+-----------------+
|                 | Job Release     | JOBRLS     | -   To release  |
|                 |                 |            |     a job,      |
|                 |                 |            |     enter an    |
|                 |                 |            |     existing    |
|                 |                 |            |     OpCon/xps   |
|                 |                 |            |     schedule    |
|                 |                 |            |     name, job   |
|                 |                 |            |     name, and   |
|                 |                 |            |     schedule    |
|                 |                 |            |     date.       |
|                 |                 |            | -   The default |
|                 |                 |            |     Schedule    |
|                 |                 |            |     date is     |
|                 |                 |            |     CURRENT.    |
+-----------------+-----------------+------------+-----------------+
|                 | Job Hold        | JOBHLD     | -   To put a    |
|                 |                 |            |     job on      |
|                 |                 |            |     hold, enter |
|                 |                 |            |     an existing |
|                 |                 |            |     OpCon/xps   |
|                 |                 |            |     schedule    |
|                 |                 |            |     name, job   |
|                 |                 |            |     name, and   |
|                 |                 |            |     schedule    |
|                 |                 |            |     date.       |
|                 |                 |            | -   The default |
|                 |                 |            |     Schedule    |
|                 |                 |            |     date is     |
|                 |                 |            |     CURRENT.    |
+-----------------+-----------------+------------+-----------------+
| Job             | Job Reschedule  | JOBRSC     | To reschedule a |
|                 |                 |            | job in the      |
|                 |                 |            | Daily Schedule, |
|                 |                 |            | enter:          |
|                 |                 |            |                 |
|                 |                 |            | -   Enter an    |
|                 |                 |            |     existing    |
|                 |                 |            |     OpCon/xps   |
|                 |                 |            |     schedule    |
|                 |                 |            |     name.       |
|                 |                 |            | -   Enter an    |
|                 |                 |            |     existing    |
|                 |                 |            |     OpCon/xps   |
|                 |                 |            |     job name.   |
|                 |                 |            | -   Enter a new |
|                 |                 |            |     start time  |
|                 |                 |            |     offset      |
|                 |                 |            |     code:       |
|                 |                 |            |     -   T: The  |
|                 |                 |            |         new     |
|                 |                 |            |         start   |
|                 |                 |            |         time    |
|                 |                 |            |         will be |
|                 |                 |            |                 |
|                 |                 |            |      calculated |
|                 |                 |            |         based   |
|                 |                 |            |         on the  |
|                 |                 |            |         time    |
|                 |                 |            |         the job |
|                 |                 |            |                 |
|                 |                 |            |     terminated. |
|                 |                 |            |     -   S: The  |
|                 |                 |            |         new     |
|                 |                 |            |         start   |
|                 |                 |            |         time    |
|                 |                 |            |         will be |
|                 |                 |            |                 |
|                 |                 |            |      calculated |
|                 |                 |            |         based   |
|                 |                 |            |         on the  |
|                 |                 |            |         time    |
|                 |                 |            |         the job |
|                 |                 |            |                 |
|                 |                 |            |        started. |
|                 |                 |            |     -   N: The  |
|                 |                 |            |         new     |
|                 |                 |            |         start   |
|                 |                 |            |         time    |
|                 |                 |            |         will be |
|                 |                 |            |                 |
|                 |                 |            |      calculated |
|                 |                 |            |         based   |
|                 |                 |            |         on the  |
|                 |                 |            |         current |
|                 |                 |            |         time    |
|                 |                 |            |         the     |
|                 |                 |            |         event   |
|                 |                 |            |         is      |
|                 |                 |            |                 |
|                 |                 |            |      processed. |
|                 |                 |            |         If the  |
|                 |                 |            |         job had |
|                 |                 |            |         not run |
|                 |                 |            |         and the |
|                 |                 |            |                 |
|                 |                 |            |      reschedule |
|                 |                 |            |         event   |
|                 |                 |            |         is      |
|                 |                 |            |         used,   |
|                 |                 |            |         the     |
|                 |                 |            |         T/S/N   |
|                 |                 |            |         is      |
|                 |                 |            |                 |
|                 |                 |            |     disregarded |
|                 |                 |            |         and the |
|                 |                 |            |         offset  |
|                 |                 |            |         will be |
|                 |                 |            |         the     |
|                 |                 |            |         current |
|                 |                 |            |         time on |
|                 |                 |            |         the SAM |
|                 |                 |            |         machine |
|                 |                 |            |         plus    |
|                 |                 |            |         the     |
|                 |                 |            |         number  |
|                 |                 |            |         of      |
|                 |                 |            |         minutes |
|                 |                 |            |                 |
|                 |                 |            |       specified |
|                 |                 |            |         in the  |
|                 |                 |            |         event   |
|                 |                 |            |                 |
|                 |                 |            |        (similar |
|                 |                 |            |         to the  |
|                 |                 |            |         use of  |
|                 |                 |            |         the N   |
|                 |                 |            |         value). |
|                 |                 |            | -   Enter the   |
|                 |                 |            |     number of   |
|                 |                 |            |     minutes to  |
|                 |                 |            |     reschedule  |
|                 |                 |            |     the job.    |
|                 |                 |            | -   Enter the   |
|                 |                 |            |     schedule    |
|                 |                 |            |     date.       |
|                 |                 |            | -   The default |
|                 |                 |            |     Schedule    |
|                 |                 |            |     date is     |
|                 |                 |            |     CURRENT.    |
+-----------------+-----------------+------------+-----------------+
|                 | Job Restart     | JOBRST     | -   To restart  |
|                 |                 |            |     a job,      |
|                 |                 |            |     enter an    |
|                 |                 |            |     OpCon/xps   |
|                 |                 |            |     schedule    |
|                 |                 |            |     name, job   |
|                 |                 |            |     name, and   |
|                 |                 |            |     schedule    |
|                 |                 |            |     date.       |
|                 |                 |            | -   The default |
|                 |                 |            |     Schedule    |
|                 |                 |            |     date is     |
|                 |                 |            |     CURRENT.    |
+-----------------+-----------------+------------+-----------------+
|                 | Job Skip        | JOBSKP     | -   To skip a   |
|                 |                 |            |     job, enter  |
|                 |                 |            |     an existing |
|                 |                 |            |     OpCon/xps   |
|                 |                 |            |     schedule    |
|                 |                 |            |     name, job   |
|                 |                 |            |     name, and   |
|                 |                 |            |     schedule    |
|                 |                 |            |     date.       |
|                 |                 |            | -   The default |
|                 |                 |            |     Schedule    |
|                 |                 |            |     date is     |
|                 |                 |            |     CURRENT.    |
+-----------------+-----------------+------------+-----------------+
|                 | Job Start       | JOBSTR     | -   To start a  |
|                 |                 |            |     job, enter  |
|                 |                 |            |     an existing |
|                 |                 |            |     OpCon/xps   |
|                 |                 |            |     schedule    |
|                 |                 |            |     name, job   |
|                 |                 |            |     name, and   |
|                 |                 |            |     schedule    |
|                 |                 |            |     date.       |
|                 |                 |            | -   The default |
|                 |                 |            |     Schedule    |
|                 |                 |            |     date is     |
|                 |                 |            |     CURRENT.    |
+-----------------+-----------------+------------+-----------------+
|                 | Job Add         | ADD        | -   To add a    |
|                 |                 |            |     job to the  |
|                 |                 |            |     Daily       |
|                 |                 |            |     Schedule,   |
|                 |                 |            |     enter an    |
|                 |                 |            |     existing    |
|                 |                 |            |     OpCon/xps   |
|                 |                 |            |     schedule    |
|                 |                 |            |     name, job   |
|                 |                 |            |     name, and   |
|                 |                 |            |     schedule    |
|                 |                 |            |     date, and   |
|                 |                 |            |     frequency.  |
|                 |                 |            | -   The default |
|                 |                 |            |     Schedule    |
|                 |                 |            |     date is     |
|                 |                 |            |     CURRENT.    |
+-----------------+-----------------+------------+-----------------+
| Machine         | Machine Status  | MACSTS     | -   To change a |
|                 |                 |            |     machine\'s  |
|                 |                 |            |     status,     |
|                 |                 |            |     enter an    |
|                 |                 |            |     existing    |
|                 |                 |            |     OpCon/xps   |
|                 |                 |            |     machine     |
|                 |                 |            |     name and    |
|                 |                 |            |     its new     |
|                 |                 |            |     state.      |
|                 |                 |            | -   Valid       |
|                 |                 |            |     values for  |
|                 |                 |            |     the Machine |
|                 |                 |            |     State are U |
|                 |                 |            |     (Up) and D  |
|                 |                 |            |     (Down).     |
+-----------------+-----------------+------------+-----------------+
| Generic Command | Copy to message | CPYTOMSGIN | -               |
|                 | In              |            |    Communicates |
|                 |                 |            |     any of the  |
|                 |                 |            |     OpCon/xps   |
|                 |                 |            |     Event       |
|                 |                 |            |     commands    |
|                 |                 |            |     from the    |
|                 |                 |            |     LSAM to     |
|                 |                 |            |     SAM.        |
|                 |                 |            |     Available   |
|                 |                 |            |     command     |
|                 |                 |            |     templates   |
|                 |                 |            |     will be     |
|                 |                 |            |     shown in a  |
|                 |                 |            |     prompting   |
|                 |                 |            |     window when |
|                 |                 |            |     this        |
|                 |                 |            |     command is  |
|                 |                 |            |     selected    |
|                 |                 |            |     from the    |
|                 |                 |            |     LSAM Event  |
|                 |                 |            |     Management  |
|                 |                 |            |     list of     |
|                 |                 |            |     Event       |
|                 |                 |            |     commands.   |
|                 |                 |            | -   CPYTOMSGIN  |
|                 |                 |            |     supports    |
|                 |                 |            |     Dynamic     |
|                 |                 |            |     Variable    |
|                 |                 |            |     tokens      |
|                 |                 |            |     anywhere    |
|                 |                 |            |     within the  |
|                 |                 |            |     CPYMSGIN    |
|                 |                 |            |     command     |
|                 |                 |            |     parameter.  |
+-----------------+-----------------+------------+-----------------+
|                 | LSAM Command    | SMACMD     | Processing of   |
|                 |                 |            | this old form   |
|                 |                 |            | of generic      |
|                 |                 |            | Event command   |
|                 |                 |            | entry is now    |
|                 |                 |            | routed to       |
|                 |                 |            | CPYTOMSGIN.     |
+-----------------+-----------------+------------+-----------------+

###### Functions

-   **F3=Exit**: Quits the Events list and returns to the menu.
-   **F12=Cancel**: Quits the Events list and returns to the menu.
-   **F17=Subset**: Requests the Subset window to either establish or
    remove a subset rule that limits the commands on display according
    to their Command Type.

#### Windows

##### Subset by Command Type

Pressing \<**F17**\> from the list of Event commands branches to a
window display where a subset rule may be selected to limit the commands
on the main list display.

Events Subset Window

  -----------------------------------------------------
                 Subset by Command Type
        Type a number, or blank to clear subset.
       Press Enter to apply change or F12=Cancel.
                             
            1 [Generic]{style="color: #ff00ff;"}               2 [Job]{style="color: #ff00ff;"}
              3 [Log]{style="color: #ff00ff;"}             4 [Machine]{style="color: #ff00ff;"}
         5 [Notification]{style="color: #ff00ff;"}            6 [Schedule]{style="color: #ff00ff;"}
      7 [Threshold-Resources]{style="color: #ff00ff;"}              8 [Token]{style="color: #ff00ff;"}
                         Bottom
                 Select type number: \_\_
                        F12=Cancel
  -----------------------------------------------------

###### Fields

  Field                 Default  Description
  -------------------- --------- --------------------------------------------------------------------------------------------------------------------------------------------------------------
  Select type number     None    Type one of the numbers appearing in the list of command types to set the subset value, or clear this input field and press \<Enter\> to remove subset rule.

  :  

###### Functions

-   **F12=Cancel**: Quits the subset window and returns to the Event
    Management list.
-   When sub-setting is in effect, the appearance of the Event
    Management screen changes slightly. The figure below shows a
    subsetted list of just the events for Command Type Job, and the
    \<**F17**\> function key legend has changed to show its new
    capability.
-   While in the subset mode, \<**F17**\> can be used to change the
    Command Type being used for the subset. In order to clear the subset
    mode and return the Even Management list to a full display, just
    clear the Type Number value from the input field in the subset
    window and press \<**Enter**\>. This updates the subset window and
    returns to the main list display.

 

-   **Screen Title**: Event Management
-   **Screen ID**: LSAEVTR02

##### CPYTOMSGIN Command Prompting Window

The general-purpose Event command CPYTOMSGIN is supported by an
additional prompting window (when selected from within the context of
the Event Management LSAM menu function) that lists all available
OpCon/xps Event commands.

CPYTOMSGIN Event Selection Window

  ---------------------------------------------------------
                      CPYTOMSGIN Events
           Position to desired Event, press Enter.
          Press F12 to return without a selection.
                               
                   OpCon/xps Event Command
   [\$CONSOLE:DISPLAY]{style="background-color: #00ff00;"}                       \$JOB:ADD        
                        \$JOB:ADDHLD
                          \$JOB:BAD
                        \$JOB:CANCEL
                        \$JOB:DELETE
                         \$JOB:GOOD
                         \$JOB:HOLD
                         \$JOB:KILL
                        \$JOB:RELEASE
                          More\...
                         F12=Cancel
  ---------------------------------------------------------

When the cursor is positioned over one the available commands, the
OpCon/xps Event Command syntax model will be inserted into the Message
parameter on a prompt screen for the CPYTOMSGIN command, as illustrated
below.

Event Command Syntax Model

  ----------------------------------------------------------------------------------------------------------------------------------------------------------
                                                                  Copy to MSGIN (CPYTOMSGIN)
                                                                               
                                                                  Type choices, press Enter.
                                                                               
   [ Message . . . . . . . . . . . . \>]{style="color: #008000;"} [\'\$JOB:CANCEL,\<schedule date\>,\<schedule name\>]{style="text-decoration: underline;"}                                       ,\<job name\>\'                                                                   
                                                                                                                      
                                                                                                                      
                                                                                                                      
                                                                                                                      
         [                                                                     ]{style="text-decoration: underline;"} [\...]{style="color: #0000ff;"}                                                                                
                                                                               
                                                                            Bottom
                                         F3=Exit   F4=Prompt   F5=Refresh   F12=Cancel   F13=How to use this display
                                                                        F24=More keys
  ----------------------------------------------------------------------------------------------------------------------------------------------------------

In the syntax model illustrated above, the \< \> characters are used
only to mark the description of each field. When the actual data is
typed in place of the field description, the \< \> characters must be
removed, just as the field description must also be removed. However,
the commas are a critical part of the command syntax. If a field value
is allowed to be left out of any particular command, the comma that
marked that field location must still be retained. In this case, two
consecutive commas would indicate to OpCon/xps that the null value
should be applied to that field.

 

Press \<**Enter**\> after the command has been fully formatted to cause
the final command format to be submitted to the LSAM for sending to
OpCon/xps.

 

Dynamic Variable tokens can be included anywhere within the CPYMSGIN
keyword parameter:

 

  --------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------
  ![White pencil icon on green circular background](../../../Resources/Images/example-icon(48x48).png "Example icon")   **EXAMPLE:** CPYTOMSGIN CPYMSGIN(\'\$JOB:CANCEL,,MySchedule,{JOBNAMEVAR}\')
  --------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------

## Utilities Screens and Windows

### LSAM Utilities Configuration

-   **Screen Title**: LSAM Utilities Configuration
-   **Screen ID**: LSAUTLD301

###### Menu Pathways

Main Menu \> Events and Utilities (\#3) \> LSAM Utilities configuration
(\#7)

###### Fields

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

###### Functions

**F12=Cancel**: Quits the maintenance function and returns to the Events
and Utilities menu.

### Work with SCANSPLF Applications

  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [In previous versions of the IBM i LSAM, there was a separate Application master file that had to be maintained. Now, the Application ID has become just the primary key field that helps gather Scan Rule records into groups. There is still a Work with SCANSPLF Applications function on the LSAM menu \# 3, but it is now only a convenience tool used to find applications and to copy or delete whole Application sets of Scan Rules at once.]
  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   **Screen Title**: Work with SCANSPLF Applications
-   **Screen ID**: LSAUTLD301

###### Menu Pathways

Main Menu \> Events and Utilities (\#3) \> Work with SCANSPLF
Applications (\#3)

###### Fields

  Field            Description
  ---------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Search content   To quickly search for a particular job, enter the first characters of the job name, or any other tracked job log content value, and press \<**Enter**\>. Any value that appears on the log detail display may be searched for, even though not all values appear in the list display.
  Opt              Enter one of the options listed at the top of the display and press \<**Enter**\> to execute that option for the selected line in the list.

  :  

###### Options

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

###### Functions

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

#### Copy SCANSPLF Application

Option 3=Copy supports copying all of the Scan Rules from one
Application ID to a new Application ID. After the bulk copy is
completed, use option 1=Select from the list of Applications to Work
with Scan Rules for the new Application ID.

-   **Screen Title**: Copy SCANSPLF Application
-   **Screen ID**: LSAJ50R2

###### Menu Pathways

Main Menu \> Events and Utilities (\#3) \> Work with SCANSPLF
Applications (\#3) \> Option 3=Copy

###### Fields

  Field              Description
  ------------------ ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  From Application   The From Application field only appears when option 3=Copy has been used.
  (to) Application   If option 3=Copy was used, the \"to Application\" input field is shown, otherwise, a simple \"Application\" field appears on the next line. Enter the new Application ID that will be used. The Application ID may remain the same, as long as any one of the other three fields will be changed to create a new record. The Application ID field is used for coordinating with Captured Data Response Rules.

  :  

###### Functions

-   **F3=Exit**: Quits the maintenance function without update and
    returns to the list display.
-   **F5=Refresh**: Restores the original field values that were
    presented when the maintenance display format first appeared,
    replacing any data that may have been typed.
-   **F12=Cancel**: Quits the maintenance function without update and
    returns to the menu.

##### Copy/Delete SCANSPLF Application (options 3 and 4)

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

###### Fields

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

###### Functions

**F12=Cancel**: Quits the option window and returns to the list control
display. (The copy or delete option remains incomplete and must be
restarted, if desired.)

#### Display Capture Rules/Response Rules Chart (option 7)

The Capture and Response Rules chart displays are explained in detail
under Operator Replay, within the Screens and Windows section, under the
title \"Operator Replay Capture Chart (opt 7).\"

#### Export Message Management Parameters (option 8)

Detailed instructions about the data Export and Import functions is
provided in Copy Files from Test to Production.

### Work with SPLF Scan Rules

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

###### Menu Pathways

Main Menu \> Events and Utilities menu (\#3) \> Work with SPLF Scan
Rules (\#4).

###### Fields

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

###### Functions

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

###### Options

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

#### Add/Change/Copy SPLF Scan Rule

-   **Screen Title**: Copy SPLF Scan Rule
-   **Screen ID**: OPRR50R2

Refer to the How To discussion earlier in this topic for more
information about the meaning and purpose of the fields on this display.
Refer to details about the rules and effect of each field in the fields
table, below.

###### Menu Pathways

Main Menu \> Events and Utilities menu (\#3) \> Work with SPLF Scan
Rules (\#4) \> F6=Add *- or -* option 2=Change *- or -* option 3=Copy.

###### Fields

Refer to the How To section of this topic for examples of how the
following field rules can be used.

  -------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** The order of the fields listed in the table below will vary, depending on the setting of the \"Scan Rule maint fmt 1- or 2-page\" option in the \"LSAM Utilities Configuration\" screen (documented in previous pages of this section).
  -------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

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

###### Functions

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

### Work with Capture Response Rules

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

###### Menu Pathways

Main Menu \> Events and Utilities menu (\#3) \> Work with Captured Data
Response Rules (\#5).

###### Fields

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

###### Functions

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

###### Options

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

#### Add/Change/Copy Capture Response Rules

-   **Screen Title**: Copy Capture Response Rule
-   **Screen ID**: OPRR50R2

Refer to the How To discussion earlier in this topic for more
information about the meaning and purpose of the fields on this display,
especially how the Continuation field works.

###### Menu Pathways

Main Menu \> Events and Utilities menu (\#3) \> Work with Captured Data
Response Rules (\#5) \> F6=Add **- or -** option 2=Change **- or -**
option 3=Copy.

###### Fields

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

###### Functions

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

##### LSAM Event Commands and OpCon/xps Property Tokens

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

### Display Captured Data Log

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

###### Menu Pathways

Main Menu \> Operator replay menu (\#4) \> Display Captured Data log
(\#8).

###### Fields

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

###### Functions

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

###### Options

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

#### Display Captured Data Log Detail

-   **Screen Title**: Display Captured Data Log Detail
-   **Screen ID**: OPRL40R5

###### Menu Pathways

Main Menu \> Events and Utilities menu (\#3) \> Display Captured Data
log (\#8) \> option 5=Display.

###### Fields

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

###### Functions

-   **PageDown/Up**: Use the PageDown and PageUp function keys to toggle
    the display of captured data between lines 1-12 and 13-24.
-   **F3=Exit**: Return to the LSAM menu.
-   **F9=WRKJOB**: Branch to the IBM i Work with job menu, to display
    detailed information about the IBM i Job ID named in the display
    panel.
-   **F12=Cancel**: Return to the list of log entries.

### Display Data Capture Debug Log

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
assistance. (Refer to [Operation of Extracting LSAM Log and Master Files](Log-File-and-Database-Management.md#Operatio){.MCXref
.xref} for more information about how to use the SMASUP command.)

 

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

## Client eMail Management

This LSAM feature makes it possible to generate email requests that will
be processed by the OpCon server, using content that is managed by the
LSAM automation tools. This feature supports cleaner and more elaborate
email content than is possible with the simpler OpCon email event
command or an OpCon notification definition. This method requires quite
a bit of configuration in advance, but once it is set up, it is not hard
to reuse for various email events.

 

  ------------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White triangle icon on yellow circlular background](../../../Resources/Images/caution-icon(48x48).png "Caution icon")   **CAUTION:** [Beginning with OpCon 15.0 and higher, SMA has changed its support for OpCon auxiliary utilities that are used by this LSAM feature. Any user of this feature who is upgrading from a prior release of OpCon is requested to contact SMA Support for special instructions about retaining or installing new copies of the OpCon utility programs that can be used until a future release of OpCon updates the support for the LSAM feature.]
  ------------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

The master file, CLTEMLF00, contains up to 10 characters used as an
acronym to represent clients or other entities who should receive email
notifications as the LSAM completes certain processes. This master file
may store multiple records per client acronym in order to gather one or
more lists of email addresses. Multiple records are managed by a
sequence number, and they can be grouped together by a Use Code, for
example, when a single record cannot hold all of the email addresses
that should be used for one mail event.

 

The LSAM command GENEMLREQ (Generate eMail Request) is used to combine
information from the Client eMail control record and the Client
(Acronym) eMail master file, together with run-time parameters,
completely defining the content and processing of an eMail request. This
command can be used alone, or in the command line of various LSAM
features, most usefully in the command line of a Captured Data Response
Request where LSAM Dynamic Variables can be inserted into any of the
GENEMLREQ command parameters.

 

The GENEMLREQ command is designed to work with a proscribed OpCon
Schedule that must contain at least four tasks, as described below. It
is also necessary to use Schedule Instance properties with these jobs,
as documented below.

1.  The first task may be a batch job that executes the GENEMLREQ
    command, but more typically it might be an Operator Replay script
    execution that triggers a Captured Data Response Rule where the
    GENEMLREQ command is defined.
2.  A file transfer job moves the email request parameters file to the
    OpCon server.
3.  Another file transfer job moves the separate email message content
    file from the IBM i disk space to the OpCon (or other Windows)
    server disk space.
4.  The fourth task (or a later task in a dependent schedule) must be a
    call to the MS Windows utility from SMA called SMASendMail.

The output from the GENEMLREQ command is designed specifically for use
with the SMASendMail utility. Currently, the SMASendMail utility is a
manually installed utility that can be downloaded from SMA\'s Support
Portal, under the content library called Automation Toolkit. However,
this process is expected to change soon, so please contact SMA Support
to request this utility.

 

It is important to understand the components and the flow of the Client
eMail generation service. This application requires a carefully
coordinated combination of LSAM master files, OpCon schedule jobs with
Schedule Instance properties and an SMA utility program (SMASendMail).
The flow chart following is offered to illustrate all the components of
this application.

Client eMail Flow Chart

![Client eMail Flow Chart](../../../Resources/Images/IBM-i/Client-eMail-Flow-Chart.png "Client eMail Flow Chart")

### How to Prepare for eMail Tasks

Certain resources must be installed and technical data must be gathered
in order to use the Client eMail generation request command, GENEMLREQ.
This outline assumes an understanding of how the OpCon server was
installed and how to use OpCon features, as well as assuming an
understanding of how to use e-mail servers. Refer to the flow chart on
the previous page for orientation to where each of the following
elements is used.

1.  Identify the e-mail server that will be used, obtaining the URL, and
    learn what e-mail services are supported. Identify the TCP/IP port
    number(s) available and learn which types of e-mail security (TLS,
    SSL or none) are supported at each port number.
    a.  Be sure to identify the user name and password that is required
        in order to request Send Mail service from the e-mail server.
2.  Obtain and install the SMA utility called SMASendMail. This utility
    is comprised of a program and some example files. Please contact SMA
    Support for special instructions to obtain and install this utility.
    Then, take note of the OpCon server directory where this utility is
    installed, so that the installation path can be registered in the
    LSAM eMail Management control data.
3.  If not already done, update the IBM i LSAM (agent) version 04.00.03
    software in the IBM i partition using the LSAM\'s PTF tools. Verify
    that PTFs 403067 - 403069 have been installed.
4.  Manually create a directory structure (using command \'mkdir\')
    within the IBM i IFS (Integrated File System) disk space, where the
    message text temporary files will be constructed. The recommended
    IFS path would be one of these two alternatives, depending on the
    site standards for IFS organization: \'/SMA/ClientMail/\' or
    \'/home/SMA/ClientMail/\'.

### How to Configure an eMail Task

It may seem challenging at first to correctly configure all the data
elements required to successfully generate an e-mail request. Please
contact SMA Support if assistance is desired the first time working
through this process. Once a working model has been established, then it
will be easy to repeat this model for many different applications.

1.  Create an OpCon Schedule that will include the following jobs. These
    jobs can be made serially dependent, although the two file transfer
    jobs could be run in any order or in parallel. View the flow chart,
    above, for orientation to the construction and use of this Schedule.
    The user is responsible for determining details about how and when
    the GENEMLREQ command will be executed, and how the Schedule will be
    built and executed.
    a.  **Add Schedule Instance Properties**: View the examples provided
        in the Screens and Windows section of this document, in
        particular under the Client eMail Management Configuration
        screen, for descriptions and recommendations about the names of
        the four Schedule Instance Properties that will be required to
        complete this Schedule. Use OpCon Schedule maintenance to add
        these four Properties to a single \"instance\" line within the
        Schedule definition. That is, all four properties are registered
        in a single instance, separated by a semi-colon. The initial
        value of each property can be a symbolic value, one that will
        obviously show that a Property has not yet been updated by the
        GENEMLREQ command in case of failure.
    b.  **Job 1**: Create an IBM i job that will execute the GENEMLREQ
        command. This job will require reference to the IBM i LSAM
        library list. The job could be a simple batch job that specifies
        the GENEMLREQ command in the Call command line of the OpCon job
        master. However, in many cases it might be more convenient to
        cause the GENEMLREQ command to execute as a Captured Data
        Response Rule command, triggered by steps of an Operator Replay
        script where the Client data can be collected into LSAM Dynamic
        Variables that will become the GENEMLREQ parameter keyword
        values.
    c.  **Job 2**: A file transfer job is required to transfer the mail
        task temporary file from the DB2 library location to the MS
        Windows machine where the SMASendMail.exe program will be
        executed. The SMA File Transfer function is appropriate for this
        task. The source file is a DB2 EBCDIC Text file, and the target
        (destination) file is an ASCII Text file. Use two of the
        Schedule Instance Properties to identify the path + file name of
        the source and target files when defining this transfer job.
    d.  **Job 3**: A file transfer job is required to transfer the
        message text stream file from the IBM i IFS disk space to the MS
        Windows machine where the SMASendMail.exe program will be
        executed. The source file is an ASCII Text stream file, and the
        target (destination) file is also an ASCII Text file. Use the
        other two Schedule Instance Properties to identify the path +
        file name of the source and target files when defining this file
        transfer job.
    e.  **Job 4**: A MS Windows job is required to execute the
        SMASendMail.exe program. Refer to the installation directory
        paths noted above under the Preparation steps for the path
        values required to configure this job. Refer to the example
        files provided with the SMASendMail utility (included in the ZIP
        file along with the .exe program) for examples of how the
        program parameters may be configured. This SMASendMail program
        was designed so that all the required parameters may be included
        in the temporary parameters text file that will be constructed
        by the GENEMLREQ command, in which case it may only be necessary
        to include the parameter keyword (refer to the program examples
        for the correct syntax of this parameter keyword) and the
        temporary file name. Use one of the Schedule Instance Properties
        for the path + file name value that will be assigned to the
        parameter keyword.
    f.  **Jobs 5 and 6**: After a prototype test Schedule has been
        established, the production versions of this schedule should
        include two MS Windows jobs that will only be executed if Job 4
        completes successfully. These jobs must delete the temporary
        files in the MS Windows disk space. Use the Schedule Instance
        Properties to specify each of the path + file names that must be
        deleted when the job is done.
2.  Before using the other IBM i LSAM Client eMail menu functions, start
    by executing option 7 on the Client eMail Management sub-menu. This
    will establish the default parameter values that will determine how
    the GENEMLREQ command must be specified, and it may also influence
    how the Client eMail Data (also called the Client Acronym master
    file) is maintained. The Client eMail configuration parameters are
    the ones that are considered likely to be consistent whenever the
    GENEMLREQ command is used, although it is always possible to
    override these values using the keywords of the GENEMLREQ command
    for exceptional circumstances. Careful setting of these central
    configuration values makes it easier to specify the GENEMLREQ
    command parameters.
3.  Create one or more Client eMail Data master records. Refer to the
    Screens and Windows section of this document for detailed
    information about this function.
4.  *(Optional)* Create one or more Message Text Source
    Members, using the LSAM sub-menu option for this function. Remember
    that this special type of source member supports translation of LSAM
    Dynamic Variable values. This means that the name of a Dynamic
    Variable can be inserted anywhere into the message text by typing
    the token enclosure characters around the Dynamic Variable name.
    (The Dynamic Variable Token Start/End characters are specified in
    the LSAM Job Tracking menu, option 7. The default value used to
    create tokens is a pair of curly brackets, such as in this example
    where the registered Dynamic Variable name is DYNVAR1: {DYNVAR1}
5.  The final step in preparing for execution of the GENEMLREQ command
    is to determine the proper settings for each of the command\'s many
    parameter keywords. These are fully documented in the next section
    of this document. It is helpful to pay close attention to the
    following possible sources for many of these parameters, where the
    table of parameter values below identifies which sources are
    appropriate for each keyword, and what keyword value tells the
    command to use each source:
    -   Client eMail configuration values (sub-menu option 7)

    -   Client eMail Data master record values (sub-menu option 1)

    -   GENEMLREQ command parameters that specify their own values

    -   \*EXTERNAL = a special parameter keyword value that refers to
        the OpCon command line where the SMASendMail.exe program is
        executed. When this special value is used, it will be required
        to include that parameter on the program command line. Refer to
        the examples of the SMASendMail command line provided in the
        files that were delivered with the program in order to determine
        how each command line parameter must be specified for the MS
        Windows job.
6.  Following execution of the GENEMLREQ command (Job 1 in the suggested
    OpCon Schedule outlined above), diagnostic information about any
    failures will be found using the LSAM sub-menu options 4 and 5. Note
    that additional information about problems with LSAM Dynamic
    Variable replacement can also be found the LSAM submitted job log
    file, LSALOGF30, viewed using LSAM sub-menu 6, option 5, log
    viewer 4.

### Client eMail Utility Commands

#### GENEMLREQ Command (Generate eMail Request)

The command GENEMLREQ (Generate eMail Request) combines input from the
Client eMail feature control file, from the Client Acronym master file
and from the command parameters themselves to identify all the elements
required to produce a nicely formatted e-mail message that may include
any data that was captured and formatted by other IBM i LSAM functions.
There are many parameters for this command, but most of them can be set
to rely on (1) \*DEFAULT values from the control file or (2) \*ACRONYM
values from the Client Acronym master file. In addition, it is
anticipated that the remaining parameter values would mostly be
represented by LSAM Dynamic Variable tokens. However, the command
processor itself does not translate Dynamic Variable token values
inserted into the command parameters, except for the MESSAGE() parameter
when it may be used (even though some of the other command parameters
require that a name of a Dynamic Variable - NOT in token format - must
be specified). Therefore, it may be most convenient to execute this
command from a Captured Data Response Rule, where the Response Command
line does support translation of Dynamic Variable tokens wherever they
may appear in the command line.

##### Command Syntax

In the following example of the GENEMLREQ command, the command default
value is shown for every parameter (when a default is available). The
default value may be assumed when it is not explicitly specified. Many
of the command parameters support long strings, up to 128 characters,
which prevents the IBM i command prompter from showing the command value
prompts.

 

GENEMLREQ SUBJECT(\'Subject text string\')

 

ACRONYM(\*CMD) SEQ(0) USECODE(\*NONE) MSGMBR(\*ACRONYM)

 

MSGTXTFILE(\*DEFAULT) MESSAGE(\*ACRONYM) MSGDYNVAR(EMLMSGVAR)

 

EMLMSGPROI(\*DEFAULT) EMLMSGPROP(\*DEFAULT)

 

PARMFILE(\*DEFAULT) RMDYNVAR(EMLPRMVAR)

EMLPRMPROI(\*DEFAULT) EMLPRMPROP(\*DEFAULT) FILEPATH(\*DEFAULT)
EMLUSER(\*EXTERNAL) EMLPWDPATH(\*EXTERNAL) EMLSVRURL(\*DEFAULT)
EMLSVRPORT(587) EMLSECURE(\*DFT) FROMADDR(\*DEFAULT) TOADDR(\*DEFAULT)
CCADDR(\*NONE) BCCADDR(\*NONE) OPCONJOB(\'1\')

 

The command syntax illustrated above is not a working example of this
command, since some of the default values are in conflict with each
other (for example, \*CMD versus \*ACRONYM). The possible sources of
each parameter value are defined in the following table of command
parameters.

##### Table of GENEMLREQ Command Parameters

**SUBJECT**: User-specified e-mail subject line.

 

The subject line text for an e-mail must be specified when the command
is executed. (Hint: A Dynamic Variable value could be used in this
parameter if the command is being executed by a Captured Data Response
Rule.)

 

**ACRONYM**: \*CMD **- or -** Client Acronym value (up to 10
characters).

 

When a client Acronym value is specified in this parameter, other
command parameters may obtain their value from the Client Acronym master
file.

 

\*CMD = This special value means that a Client Acronym master record
will not be used, in which case the TOADDR e-mail address field must be
specified instead of relying on the master file for the address. Also,
the MESSAGE parameter must include some text for the message content.

 

**SEQ**: Client Acronym master record sequence number.

 

This parameter is ignored if the ACRONYM parameter is set to \*CMD.

 

If the USECODE parameter is \*NONE or blank, specify the only Client
Acronym record that will be used to obtain the TOADDR e-mail address
and, optionally, the message text source member name. Zeros is a value
sequence number.

 

If the USECODE parameter is not \*NONE and not blank, specify the first
sequence number of the records in a Use group where the e-mail address
retrieval should start. Zeroes means to start with the first record of a
Use group, regardless of the actual sequence number assigned to that
record.

 

**USECODE**: A registered Use Code from the Client Acronym master file
**- or -** Blanks.

 

The Use Code is an optional means of grouping together Client Acronym
master records to collect e-mail addresses. At this time there is no
master table of Use Codes; they are only registered by typing them on
one or more Client Acronym master records. Also refer to the SEQ
parameter.

 

**MSGMBR**: \*ACRONYM **- or -** \*CMD **- or -** Source member name
Specifies where the message content text will be retrieved.

 

\*ACRONYM = Get the message text source member name from the Client
Acronym master record.

 

\*CMD = Use the text from the MESSAGE parameter of this command as the
message content.

 

Member name = the name of a source member in the LSAM source-physical
MSGTXTSRC.

 

  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [This command supports translation of Dynamic Variable tokens that are included in the source member. Refer to the section on Message Text Source Member maintenance, below.]
  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

**MSGTXTFILE**: \*DEFAULT **- or -** 10-character root name of temporary
file.

 

The name of the temporary file that will contain the formatted message
content text.

 

\*DEFAULT = a name will be automatically constructed starting with the
capital letter \"M\" followed by DDHHMMSSm, where:

-   DD = 2-digit day of month

-   HH = 2-digit hour of the day

-   MM = 2-digit minutes of the hour

-   SS = 2-digit seconds after the min.

-   m = 1-digit tenth of a second

Any name, up to 10 characters, may be specified, but allowing the
command to generate a name prevents overlaying another file in case two
jobs are executing at or near the same time. If a file name is used more
than once by two different jobs, the content of the file will be
overlaid by the latter job.

 

  -------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [The actual name of the temporary file created in the IBM i IFS disk space, and after transferring the file to a MS Windows computer, will include a suffix of \'.txt\'. Only the 10-character root name of the file is specified in this field, as if the file were being created in the DB2 database. (The file is composed using an ASCII stream file in the IFS in order to provide the best support for line and paragraph formatting of the message content.)]
  -------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

The file will be located in the IFS path specified in the IBM i Client
eMail configuration. (This location has no override in the command
parameters.)

 

**MESSAGE**: \*ACRONYM **- or -** Message content text.

 

This parameter is ignored unless one of the following parameters is
specified:

-   ACRONYM(\*CMD)
-   MSGMBR(\*CMD)

When no message text source member is used, a character string up to 128
characters, enclosed in single quotes, should be specified in this
parameter to be used as the message content.

 

  -------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [This is the only parameter of this command that supports translation of a Dynamic Variable token, no matter where the command is executed. It is possible to compose message content up to 1024 character by listing multiple Dynamic Variable tokens in this field, even though the parameter value only supports 128 characters as the command is submitted.]
  -------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

**MSGDYNVAR**: User-specified Dynamic Variable name **- or -** the
default of \'EMLMSGVAR\'.

 

A value must be provided for this parameter. This is the name of the
LSAM Dynamic Variable where the 10-character root name of the message
text temporary file will be stored for later reference. If the default
file name is used this could allow content to be overlaid in case two
e-mail jobs are running at the same time.

 

**EMLMSGPROI**: \*DEFAULT **- or -** OpCon Property receiving IBM i
message text file name.

 

This is the name of an OpCon Schedule Instance Property that is used to
receive the full path and file name where the message content text will
be retrieved during a file transfer operation. The location referenced
will be in the /root file system of the IBM i IFS disk space.

 

\*DEFAULT = Use the name designated in the IBM i Client eMail
configuration.

 

**EMLMSGPROP**: \*DEFAULT **- or -** OpCon Property receiving MS Windows
message text file name.

 

This is the name of an OpCon Schedule Instance Property that is used to
receive the full path and file name where the message content text will
be placed after a file transfer operation. The location referenced will
be an MS Windows directory and file name.

 

\*DEFAULT = Use the name designated in the IBM i Client eMail
configuration.

 

**PARMFILE**: \*DEFAULT **- or -** 10-character root name of temporary
file.

 

The name of the temporary file that will contain the task definition
values for the SMASendMail utility.

 

\*DEFAULT = a name will be automatically constructed starting with the
capital letter \"P\" followed by DDHHMMSSm, where:

-   DD = 2-digit day of month
-   HH = 2-digit hour of the day
-   MM = 2-digit minutes of the hour
-   SS = 2-digit seconds after the min.
-   m = 1-digit tenth of a second

Any name, up to 10 characters, may be specified, but allowing the
command to generate a name prevents overlaying another file in case two
jobs are executing at or near the same time. If a file name is used more
than once by two different jobs, the content of the file will be
overlaid by the latter job.

 

The file will be located in the DB2 library specified in the IBM i
Client eMail configuration. (This location has no override in the
command parameters.)

 

**PRMDYNVAR**: User-specified Dynamic Variable name **- or -** the
default of EMLPRMVAR.

 

A value must be provided for this parameter. This is the name of the
LSAM Dynamic Variable where the 10-character name of the SMASendMail
parameters will be stored for later reference. If the default file name
is used this could allow content to be overlaid in case two e-mail jobs
are running at the same time.

 

**EMLPRMPROI**: \*DEFAULT **- or -** OpCon Property receiving IBM i mail
task parameters file name.

 

This is the name of an OpCon Schedule Instance Property that is used to
receive the library and file name where the mail task parameters will be
retrieved during a file transfer operation. The location referenced will
be in the IBM i DB2 database.

\*DEFAULT = Use the name designated in the IBM i Client eMail
configuration.

 

**EMLPRMPROP**: \*DEFAULT **- or -** OpCon Property receiving MS Windows
mail task parameters file name.

 

This is the name of an OpCon Schedule Instance Property that is used to
receive the full path and file name where the mail task parameters will
be placed after a file transfer operation. The location referenced will
be an MS Windows directory and file name.

 

\*DEFAULT = Use the name designated in the IBM i Client eMail
configuration.

 

**FILEPATH**: \*DEFAULT **- or -** Temporary file location path for MS
Windows.

 

This is the \\path\\ (including the trailing slash) where the two
temporary files will be located in an MS Windows system after the file
transfer operations.

 

\*DEFAULT = Use the value designated in the IBM i Client eMail
configuration.

 

**EMLUSER**: \*EXTERNAL **- or -** eMail server user name.

 

The name of the user profile that has permission to log into the eMail
server.

 

\*EXTERNAL = Do not include this value in the mail task parameters file,
it will be specified on the command line where the SMASendMail.exe
program is executed.

 

**EMLPWDPATH**: \*EXTERNAL **- or -** MS Windows \\path\\file where the
encrypted mail server user\'s password was stored.

 

The full MS Windows directory path and actual file name where the mail
server user\'s password was stored. The password must be stored using
the utility SMAEncryptPassword.exe (located in the directory
\\OpConxps\\Email Monitor\\, as documented in [Encrypting Passwords](https://help.smatechnologies.com/opcon/core/latest/Files/UI/Enterprise-Manager/Encrypting-Passwords.md#top){.MCXref
.xref} in the **Enterprise Manager** online help).

 

\*EXTERNAL = Do not include this value in the mail task parameters file,
it will be specified on the command line where the SMASendMail.exe
program is executed.

 

**EMLSRVURL**: \*DEFAULT **- or -** URL where the e-mail server is
contacted.

 

The URL string, such as \"smtp.gmail.com\", where the e-mail server is
contacted by the program SMASendMail.

\*DEFAULT = use the value specified in the IBM i Client eMail
configuration.

 

**EMLSVRPORT**: 0 (= default) **- or -** up to 5 digits designating the
service requested at the e-mail server URL.

 

Specify the TCP/IP port number of the mail server requested from the
mail server. This port number typically varies according to the type of
security requested (refer to security parameter, next).

 

0 (default) = use the value specified in the IBM i Client eMail
configuration.

 

**EMLSECURE**:

-   \*DFT
-   \*NONE
-   \*TLS
-   \*SSL

Specify the type of security used to protect the e-mail message content
during transmission.

 

\*DFT = use the value specified in the IBM i Client eMail configuration.

 

\*NONE = do not include the security setting in the mail task parameters
file.

 

**FROMADDR**: \*DEFAULT **- or -** e-mail address for the FROM: field.

 

Specify the e-mail address of the e-mail sender, as appears in the
message FROM: field.

 

\*DEFAULT = use the value specified in the IBM i Client eMail
configuration.

 

**TOADDR**: \*DEFAULT **- or -** e-mail address or addresses where the
message will be sent.

 

Specify the e-mail address where the message should be sent.

 

A specific value is required when the ACRONYM parameter is set to \*CMD.

 

\*DEFAULT = use the e-mail addresses from one or more Client Acronym
master records.

 

**CCADDR**: \*NONE **- or -** e-mail address or addresses to receive a
copy of the message.

 

If a carbon copy of the message is desired, specify one or more e-mail
addresses that should receive a copy.

 

When the command is used from a Captured Data Response Rule command
line, this value might typically be specified as a Dynamic Variable, so
that the cc. address can be conveniently changed from a single location
(the Variable value), affecting multiple instances of the command
execution.

 

\*NONE = do not include a cc. address in the mail task parameters.

 

**BCCADDR**: \*NONE **- or -** e-mail address or addresses to receive a
blind copy of the message.

 

If a blind carbon copy of the message is desired, specify one or more
e-mail addresses that should receive a copy.

 

When the command is used from a Captured Data Response Rule command
line, this value might typically be specified as a Dynamic Variable, so
that the cc. address can be conveniently changed from a single location
(the Variable value), affecting multiple instances of the command
execution.

 

\*NONE = do not include a cc. address in the mail task parameters.

 

**OPCONJOB**:

-   \'1\' = yes, the default.
-   \'0\' = no.

This flag controls the extended actions of the GENEMLREQ command.

 

\'1\' = the command is executed as part of a job started by OpCon, and
the command process should include generation of the \$PROPERTY:SET
event commands that will push the four Schedule Instance Property values
up to OpCon. (The job must have been started by OpCon in order to obtain
the values required for the event commands.)

 

\'0\' = the command will not execute the \$PROPERTY:SET event commands.
The command will still generate the two temporary files and all log
entries, but any use of the temporary files must be controlled by an
external or manual process.

#### GETCLTEML Command (Get Client eMail Address)

The command GETCLTEML (Get Client eMail Address) is a special purpose
command just for the purpose of retrieving the e-mail address field from
one Client Acronym master record and storing it into an LSAM Dynamic
Variable. This function would be useful for the purpose of assembling an
OpCon event command such as \$NOTIFY:EMAIL from a Captured Data Response
Rule, where the Dynamic Variable token can be included as the event
command parameter where any of the e-mail address values is specified
(to, cc. or bcc.).

 

  -------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [The GENEMLREQ command is often preferred over the \$NOTIFY:EMAIL event command because event commands do not allow commas (as may be desired in the message text) and because the mail messages generated by the event command will also include some internal technical data at the start of the message.]
  -------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

##### Command Syntax

In the following example of the GETCLTEML command some sample values are
illustrated. The command parameters do not support default values except
for the MSGSEQ parameter which would default to zeros.

 

GETCLTEML ACRONYM(ACRVALUE) VARNAM(DYNVARNAME) MSGSEQ(010)

 

USECODE(USECODEVAL)

 

Zeros can be a valid value for a Client Acronym master record sequence
number, but if the USECODE is not blanks, then zeros means to use of the
first Client Acronym master record that matches the USECODE value,
regardless of the sequence number assigned to that master record. It is
recommended to provide a specific value for the MSGSEQ if the USECODE
applies only to records that have non-zero sequence numbers.

 

Note that this command, unlike the GENEMLREQ command, will only access
one Client Acronym master record. This is because the e-mail address
field of a single record is 128 characters long and this is the same as
the maximum value length that can be assigned to an LSAM Dynamic
Variable.

##### Table of GETCLTEML Command Parameters

**ACRONYM**: 1 to 10 characters

 

The key value that identifies an eMail Client.

 

**VARNAME**: LSAM Dynamic Variable name

 

The name (but not in token format) of the LSAM Dynamic Variable where
the e-mail address field will be copied from the identified Client
Acronym master record.

 

**MSGSEQ**: 0 to 999

 

A sequence number that uniquely identifies each record belonging to a
single Acronym value. Zeros is a valid value for a sequence number.

 

When the USECODE is not blank, then zeros in this sequence number field
has the special meaning of \"find the lowest sequence number of a record
that matches the Use Code.\"

 

**USECODE**: 1 to 10 characters

 

This field may be left blank, in which case the command will use only
the Acronym and the Sequence Number to identify the master record that
will be used to fetch the e-mail address.

### Client eMail Screens and Windows

A sub-menu of functions that support the Client eMail Management is
accessed using option 11 from either the sub-menu 3 (Events and
Utilities Menu) or 4 (Operator Replay Menu).

#### Client eMail Management Menu

Client eMail Management Menu

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------
  [SYSTEMNAME              ]{style="color: #008000;"}  CLIENT EMAIL MANAGEMENT MENU                  [00/00/00]{style="color: #008000;"}   USERNAME                                                                00:00:00
   
   Select one of the following:
   
       1.[ Work with Client eMail Data (WRKCLTEML)]{style="color: #008000;"}        2.[ Work with Message Text Source Members]{style="color: #008000;"}
       3.[ Generate eMail Request (GENEMLREQ)]{style="color: #008000;"}        4.[ Display eMail Activity Logs]{style="color: #008000;"}
       5.[ Display Error Log (DSPPFM EMLLOGF10)]{style="color: #008000;"}        6.[ Maintain Dynamic Variables]{style="color: #008000;"}
       7.[ Client eMail Configuration]{style="color: #008000;"}    
  Selection or command
   ===\> \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
  \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
   F3=Exit   F4=Prompt   F9=Retrieve   F12=Cancel
   F13=Information Assistant   F16=System main menu
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------

###### Menu Pathways

-   Main Menu \> Events and Utilities Menu (\#3) \> option 11
-   Main Menu \> Operator Replay Menu (\#4) \> option 11

###### Field

**Selection or command**: (may be restricted for some users)

###### Options

-   The options displayed on this menu are explained in the following
    sections of this document. Type an option number in the Selection or
    command line and press \<Enter\> to begin using any of the options.
-   **Option 3**(GENEMLREQ) is for testing, and documentation of this
    command appears above.
-   **Option 6** is documented in the existing **IBM i LSAM** online
    help, especially in the topic about Job Tracking.

###### Functions

-   **F3=Exit**: Returns to the master menu
-   **F4=Prompt**: Prompts for keywords for any command entered in the
    Select or command line.
-   **F9=Retrieve**: Retrieves the previous command that was entered on
    the Select or the command line. If it is pressed multiple times, you
    go further and further back to previous commands.
-   **F12=Cancel**: Returns to the previous menu.
-   **F13=Information Assistant**: Takes you to the IBM i general help
    screen.
-   **F16=System main menu**: This is always shown on any
    system-generated menu screen. It takes you to the general command
    entry menu for the operating system. Return to the previous menu by
    pressing \<F3\> or \<F12\>. This function is not commonly used and
    can be restricted for certain user profiles.

#### Work with Client eMail Data

-   **Screen Title**: Work with Client eMail
-   **Screen ID**: CLTEMLR1

###### Menu Pathways

-   \"Main Menu \> Events and Utilities Menu (\#3) \> Client eMail Menu
    (\# 11) \> option 1
-   \"Main Menu \> Operator Replay Menu (\#4) \> Client eMail Menu
    (\# 11) \> option 1

###### Fields

-   **Search content**: Type 1 - 10 characters in this field and press
    \<Enter\> to search the entire contents of every record for a match.
    Data not on the list display is also searched.
    -   If a record with a matching string is found, the list will be
        positioned to that record and the cursor will be positioned to
        the Opt field next to that record. Type 5 and press \<Enter\> to
        view the details of a record and see the matching data.
    -   Press F16=Search Next to continue a search on to the next
        matching record.
    -   Opt Type one of the option numbers listed near the top of the
        display into an Opt field and press \<Enter\> to perform that
        function on the selected record.
-   **Acronym**: The 1-10 character key representing an eMail Client
-   **Seq**: The sequence number used to identify separate e-mail
    address records within a single Acronym.
-   **F11 = Change View**: Use this function key to replace the data
    shown to the right of the Sequence number field.

[View 1]{.ul} 
-   **eMail Address (partial)**: A partial, or full 128-character string
    of one or more email addresses, where a semi-colon is used to
    separate the addresses.
    -   Press F10= Fold/Drop to expand or contract the full field
        content.
    -   Option 5=Display can also be used to show the full e-mail
        address list per record.

[View 2]{.ul} 
-   **Use Code**: A code used to create sub-groups of records within a
    single Acronym, such as when there are different e-mail addresses
    used for different types of communication.
-   **Use Description**: An optional field that describes the Use Code.
    There is no separate table of Use Codes, so the Description field is
    repeated on each master record, but it only needs to be specified
    once, and only exists for the convenience of system users, as
    documentation. (The Use Codes are not a normalized in the database
    at this time.)

[View 3]{.ul} 
-   **MsgSrcMbr**: The name of the source physical file member in file
    MSGTXTSRC that contains the message content. For records that may be
    grouped by a Use Code, only the first record in the group (the
    lowest sequence number) needs to contain this member name. (The Use
    Codes are not a normalized in the database at this time.)
-   **Client Name**: An optional description of the Acronym. Since there
    can be multiple records per Acronym, the client name is repeated on
    each record, but this name field is only for internal documentation
    purposes. (The Client Acronym is not normalized in the database at
    this time.)

###### Options

-   **2=Change**: Type this option and press \<Enter\> to branch to a
    single-record display where the master record content can be
    updated. The key fields of Acronym and Sequence Number cannot be
    changed, so use option 3=Copy then option 4=Delete to accomplish a
    change in the key fields.
-   **3=Copy**: Type this option and press \<Enter\> to branch to a
    single-record display where the master record content can be copied
    to a new Acronym and/or a new Sequence number.
-   **4=Delete**: Type this option and press \<Enter\> to add this
    record to a list of master records to be deleted. After all options
    that were typed before the Enter key was pressed are processed, then
    the screen will show a Delete confirmation list display (refer to
    below).
-   **5=Display**: Type this option and press \<Enter\> to branch to a
    single-record display where all the fields that define a single
    master record are displayed in their entirety.

###### Functions

-   **F3=Exit**: Do not update the data, return to the LSAM menu.
-   **F5=Refresh**: Clear any remaining options that were typed and
    rebuild the list display from a new read through the database.
-   **F10=Fold/Drop**: When the e-mail address is displayed on the list,
    this function key can be used to show the entire 128-character list
    of e-mail addresses for each record. Press F10 again to restore the
    display to one line per record. F10 changes the list display to 3
    lines per record for other F11 views, but there is no extended data
    on the other views.
-   **F11=Chg View**: This function key changes which fields appear in
    the list display. Refer to the Fields table above for a list of
    fields appearing in each view.
-   **F12=Cancel**: Do not update the data, return to the LSAM menu.
-   **F16=Search Next**: When data was typed into the Search content
    field and pressing Enter resulted in a match, press \<F16\> to
    continue the search on to the next matching record. F16 can also be
    pressed to start a new search when a new value has been typed into
    the Search Content field.
-   **F17=Top, F18=Bottom**: These function keys are used to reposition
    the list display to the beginning or the end of the master file.
-   **F24=More keys**: This function key changes the function key legend
    that is displayed at the bottom of the screen. However, all function
    keys remain active, regardless of which keys show in the function
    key legend.

#### Display/Change/Copy Client eMail Data

-   **Screen Title**: Display Client Record
-   **Screen ID**: CLTEMLR5

###### Menu Pathways

-   Main Menu \> Events and Utilities Menu (\#3) \> Client eMail Menu
    (\# 11) \> option 1 \> 2,3,5
-   Main Menu \> Operator Replay Menu (\#4) \> Client eMail Menu (\# 11)
    \> option 1 \> 2,3,5

###### Fields

-   **Acronym**: The 1-10 character key representing an eMail Client
-   **Record sequence**: The sequence number used to identify separate
    e-mail address records within a single Acronym.
-   **Record use code**: A code used to create sub-groups of records
    within a single Acronym, such as when there are different e-mail
    addresses used for different types of communication.
-   **Record use description**: An optional field that describes the Use
    Code. There is no separate table of Use Codes, so the Description
    field is repeated on each master record, but it only needs to be
    specified once, and only exists for the convenience of system users,
    as documentation. (The Use Codes are not a normalized in the
    database at this time.)
-   **Client Name**: An optional description of the Acronym. Since there
    can be multiple records per Acronym, the client name is repeated on
    each record, but this name field is only for internal documentation
    purposes. (The Client Acronym is not normalized in the database at
    this time.)
-   **Default msg txt SrcMbr**: The name of the source physical file
    member in file MSGTXTSRC that contains the message content. For
    records that may be grouped by a Use Code, only the first record in
    the group (the lowest sequence number) needs to contain this member
    name. (The Use Codes are not a normalized in the database at this
    time.)
-   **eMail Address**: A 128-character string of one or more email
    addresses, where a semi-colon is used to separate the addresses.
    -   The Use Code can group together multiple records in order to
        extend the list of e-mail addresses that would be used at one
        time for a message.

###### Options

-   **2=Change**: The key fields of Acronym and Sequence Number cannot
    be changed, so use option 3=Copy then option 4=Delete to accomplish
    a change in the key fields.
-   **3=Copy**: This format of the display allows changes to the Acronym
    and Sequence number, and new values must be typed for one or both of
    the fields, but the new values cannot already exist in the master
    file.
-   **5=Display**: This format of the display does not support any
    changes to the data.

###### Functions

-   **F3=Exit**: Do not update the data, return to the LSAM menu.
-   **F5=Refresh**: Restore the display to its original condition,
    removing any changes that were typed but not yet committed with the
    Enter key.
-   **F10=WRKMBRPDM**: This function key is displayed only in Change or
    Copy mode, and not in Display mode. When F10 is pressed, the program
    exits to the IBM i list display of members in the source physical
    file called MSGTXTSRC, permitting addition of new text members
    and/or changes to existing text members. This function may also be
    used just to identify the name of an existing source member that
    would then be typed into the Default msg txt SrcMbr field. For
    details about F10=WRKMBRPDM, refer to the display for menu option 2.
-   **F12=Cancel**: Do not update the data, return to the list display.

#### Work with Message Text Source Members

IBM i WRKMBRPDM List Display

  ------------------------------------------------------------------------------------------------------------------------------------------------------------
                            Work with Members Using PDM             [SYSSERNO]{style="color: #008000;"}    
  File  . . . . . .   [EMLTXTSRC ]{style="text-decoration: underline;"}     Library . . . .     [SMADTA    ]{style="text-decoration: underline;"}           Position to  . . . . . \_\_\_\_\_\_\_\_\_\_
   
  Type options, press Enter.
   2=Edit         3=Copy  4=Delete 5=Display       6=Print     7=Rename
   8=Display description  9=Save  13=Change text  14=Compile  15=Create module\...
   
  Opt  Member      Type        Text
  \_\_   MSGTEST1    TXT         Test email sent to Client 1\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
  \_\_   TSTMSGTXT1  TXT         Test message content with Dyn Var\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
   
   
   
   
   
   
  Bottom
  Parameters or command
  ===\> \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
  F3=Exit          F4=Prompt             F5=Refresh            F6=Create
  F9=Retrieve      F10=Command entry     F23=More options      F24=More keys
                              (C) COPYRIGHT IBM CORP. 1981, 2005.
  ------------------------------------------------------------------------------------------------------------------------------------------------------------

###### Menu Pathways

-   Main Menu \> Events and Utilities Menu (\#3) \> Client eMail Menu
    (\# 11) \> option 2
-   Main Menu \> Operator Replay Menu (\#4) \> Client eMail Menu (\# 11)
    \> option 2

###### Function Notes

The function of the WRKMBRPDM display is found in IBM i documentation
and not repeated here. Refer to the following example of a member edit
display for additional notes about how to format message text source
members.

#### Edit Message Text Source Members

When F6=Create is pressed from the WRKMBRPDM display, a prompt appears
requesting the member name and description of the new source member.
After that data is typed, the following display appears for both Create
and option 2=Change in order to update the lines of a message source
member.

IBM i WRKMBRPDM Member Edit Display

  -------------------------------------------------------------------------------------------------------------------------------------------
  [Columns . . . :    1  71            ]{style="color: #008000;"}Edit[                      SMADTA/EMLTXTSRC]{style="color: #008000;"}    SEU==\> \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_           TSTMSGTXT1
   FMT \*\*  \...+\... 1 \...+\... 2 \...+\... 3 \...+\... 4 \...+\... 5 \...+\... 6 \...+\... 7
          \*\*\*\*\*\*\*\*\*\*\*\*\*\*\* Beginning of data \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*
  0001.00 Verify that the Dyn Var name DVAR is translated here: {DVAR}
  0002.00
  0003.00
  0004.00 Two blank lines above result in one blank line in the final formatted
  0005.00 e-mail message. A single blank line results in a new paragraph but no
  0006.00 space will appear between the paragraphs.
  0007.00
  0008.00
  0009.00 Sincerely,
  0010.00
  0011.00 SMA Support
          \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\* End of data \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*
   
   
   
   
   
   
   
   F3=Exit   F4=Prompt   F5=Refresh   F9=Retrieve   F10=Cursor   F11=Toggle
   F16=Repeat find       F17=Repeat change          F24=More keys
                             (C) COPYRIGHT IBM CORP. 1981, 2005.
  -------------------------------------------------------------------------------------------------------------------------------------------

###### Function Notes

The GENEMLREQ command processor program reformats the content of message
text source members in a way that makes it easy for mail browsers to
display message text in a format that is appealing and easy to read.
Therefore, no special care is required when composing message text using
the WRKMBRPDM (SEU) editor from IBM.

 

The only rule that applies while typing is to never type partial words
on a line. If a word will not fit on one line, start that word on the
next source member line. The final formatting will take care of the
spacing between words, although, only one space will be inserted between
the last word of one line and the first word of the next line.

 

Keep in mind the following two features of the message text formatting
logic in order to achieve the desired final format of the message:

1.  GENEMLREQ will replace LSAM Dynamic Variable tokens.
2.  Leave a source member line blank to insert a Carriage Return + Line
    Feed.\
    One \"New Line\" function will be inserted into the message text for
    each blank source line, marking the end of a paragraph. Leave two
    (or more) lines blank in order to force a blank line between
    paragraphs in the final message format. When it is desired to have
    no blank space, but to only start a new line, such as in the
    signature lines at the end of a memo, leave only one source line
    blank.

Following is an example of how the message illustrated above would
appear in a typical e-mail message browser, given that the Dynamic
Variable was replaced by an numeric value of 1234567 that had Dynamic
Variable numeric formatting rules applied.

Email Message Example

  -----------------------------------------------------------------------
  Verify that the Dyn Var name DVAR is translated here: \$12,345.00
   
  Two blank lines above result in one blank line in the final formatted
  e-mail message. A single blank line results in a new paragraph but no
  space will appear between the paragraphs.
   
  Sincerely,
  SMA Support
  -----------------------------------------------------------------------

#### Display Mail Activity Logs

This function also provides convenient access to the Display of Error
Log information, using a formatted display instead of the simple IBM i
command DSPPFM that is used for menu option 5. However, this method of
access to the error log information limits the error log records to only
those that pertain to the selected GENEMLREQ job, therefore, some error
log entries that might be available for failed GENEMLREQ jobs would not
appear except when using menu option 5.

-   **Screen Title**: Display Client eMail Activity Log
-   **Screen ID**: EMLLOGR1

###### Menu Pathways

-   \"Main Menu \> Events and Utilities Menu (\#3) \> Client eMail Menu
    (\# 11) \> option 4
-   \"Main Menu \> Operator Replay Menu (\#4) \> Client eMail Menu
    (\# 11) \> option 4

###### Fields

-   **Search content**: Type 1 - 10 characters in this field and press
    \<Enter\> to search the entire contents of every record for a match.
    Data not on the list display is also searched. If a record with a
    matching string is found, the list will be positioned to that record
    and the cursor will be positioned to the Opt field next to that
    record. Type 5 and press \<Enter\> to view the details of a record
    and see the matching data.
    -   Press F16=Search Next to continue a search on to the next
        matching record.
-   **Opt**: Type one of the option numbers listed near the top of the
    display into an Opt field and press \<Enter\> to perform that
    function on the selected record.
-   **DD-HH.MM.SS**: A truncated form of the record logging date and
    time, showing the day of the month and the hours, minutes and
    seconds of the entry. A primary record key (shown on the details
    display) assures that records will appear in DESCENDING date+time
    sequence, where the most recent record appears at the top of the
    display.
-   **TP**: The record entry type. Values are:
    -   E = an error log, where the TP value and the Status code on the
        far right will show in red to highlight a failed job.
    -   U = the updated GENEMLREQ job parameters, after the mail task
        definition sources have all been reconciled. More than one U
        record will appear when multiple Client Acronym records were
        used to obtain an extended To-Address list.
    -   Q = the original job request parameters, logging the actual
        values that were supplied via the GENEMLREQ command parameters,
        before defaults and cross-reference codes are replaced from
        other sources.
-   **Acronym**: The 1-10 character key representing an eMail Client
-   **Seq**: The sequence number used to identify separate e-mail
    address records within a single Acronym.
-   **Use Code**: A code used to create sub-groups of records within a
    single Acronym, such as when there are different e-mail addresses
    used for different types of communication.
-   **Ref Key \#**: The actual internal primary key number of the first
    record in a mail task log group, used to show the association of a
    group of log records to a single job. This value is important when
    more than one job, perhaps with the same name, might be executing at
    the same time, because the log records could be interspersed.
-   **Job Name**: The IBM i job name of the job where the GENEMLREQ was
    executed. The full IBM i job identifier (number/user/name) is shown
    in the option 5=Display details format.
-   **Status**: A value displays when any error code or other
    exceptional (perhaps non-fatal) status code is reported as the
    completion code by the GENEMLREQ command processor program. If the
    TP (type of log record) is value \"E\", then the TP code and the
    status code are displayed in red. Use option 5=Display to see more
    information about the reason for a failed job. (Also refer to the
    discussion elsewhere in this section about tools that can be used to
    diagnose the cause of job failures.)

###### Options

-   **1=Error log**: Type this option and press \<Enter\> to branch
    directly to a subset list of the Error Log entries (if any) that
    pertain only to the selected job.
-   **2=WRKJOB**: Type this option and press \<Enter\> to branch to an
    IBM i Work with Job menu, in order to examine information such as
    the job log for the job where the GENEMLREQ command was executed.
-   **5=Detail**: Type this option and press \<Enter\> to branch to a
    series of formatted pages that display all the job definition
    details, and any failure reason text, for this execution of the
    GENEMLREQ job. The values displayed vary, depending on the record
    type (refer to the list of record types in the Fields table, above).
-   **6=View Parms**: Type this option and press \<Enter\> to branch to
    an IBM i display (DSPPFM) of the content of the DB2 database
    temporary file where the mail task parameters were written for use
    with the SMASendMail program.
-   **7=View message**: Type this option and press \<Enter\> to branch
    to an IBM i display (DSPF) of the ASCII stream file where the
    formatted message text was assembled, prior to transmitting the
    stream file to the MS Windows system where it would be used by the
    SMASendMail command.

###### Functions

-   **F3=Exit**: Return to the LSAM menu.
-   **F5=Refresh**: Clear any remaining options that were typed and
    rebuild the list display from a new read through the database.
-   **F12=Cancel**: Return to the LSAM menu.
-   **F16=Search Next**: When data was typed into the Search content
    field and pressing Enter resulted in a match, press \<F16\> to
    continue the search on to the next matching record. F16 can also be
    pressed to start a new search when a new value has been typed into
    the Search Content field.
-   **F17=Top, F18=Bottom**: These function keys are used to reposition
    the list display to the beginning or the end of the master file.

#### Display eMail Activity Detail

-   **Screen Title**: Display eMail Activity Detail
-   **Screen ID**: EMLLOGR5A

###### Menu Pathways

-   \"Main Menu \> Events and Utilities Menu (\#3) \> Client eMail Menu
    (\# 11) \> option 4 \> 5
-   \"Main Menu \> Operator Replay Menu (\#4) \> Client eMail Menu
    (\# 11) \> option 4 \> 5

###### Fields

[Common header fields]{.ul} 
 

(Also apply to formats B, C and D)

-   **Log time stamp**: A date and time stamp when this log record was
    written
-   **Rec ID**: The type of log entry - refer to the Fields table for
    the Activity Log list display, above.
-   **OpCon Job**: \'1\' = Yes, \'0\' = No (refer to the GENEMLREQ
    parameters explanation).
-   **Prim key**: A numeric primary key assigned to this Activity Log
    record.
-   **Xref Prim key**: The primary key assigned to the first Activity
    Log record for this e-mail. All entries for the same e-mail task
    will cross-reference the first primary key in order to show the
    association of log entries, even when multiple jobs may write
    interspersed entries. This cross-reference also separates multiple
    executions of the GENEMLREQ command from the same IBM i job.
-   **IBM i Job ID**: Number/User/JobName where the GENEMLREQ command
    was executed.
-   **Job Status**: A message code or a mnemonic character string
    representing the type of failure. Consult SMA Support for assistance
    with interpreting mnemonic codes, but the failure text on the right
    usually explains the code.
-   **Error Text**: An explanation provided by the program of why the
    GENEMLREQ command failed.
-   **eMail Subject Line**: The value provided by the SUBJECT keyword of
    the GENEMLREQ command.
-   Fields that are unique to this format
-   **Acronym**: The 1-10 character key representing an eMail Client
-   **Seq**: The sequence number used to identify separate e-mail
    address records within a single Acronym.
-   **Use Code**: A code used to create sub-groups of records within a
    single Acronym, such as when there are different e-mail addresses
    used for different types of communication.
-   **Msg Txt Src**: The name of the source physical file member in file
    MSGTXTSRC that contains the message content. For records that may be
    grouped by a Use Code, only the first record in the group (the
    lowest sequence number) needs to contain this member name. (The Use
    Codes are not a normalized in the database at this time.)
-   **Msg Txt File**: The 10-character root name of the .txt file where
    the formatted message text was stored in the IBM i IFS disk space.
    Use function key F23 to view the contents of this file.
-   **Msg Txt DVar**: The name of the LSAM Dynamic Variable where the
    10-character root name of the message text temporary file is stored
    for reference.
-   **Command Message value**: The value specified in the MESSAGE
    keyword of the GENEMLREQ command. (Refer to the command definition,
    above, for more information.)
-   **Msg Text DB2 OpCon Prop**: The full name of the OpCon Schedule
    Instance property where the path and name of the message text
    temporary file is stored by a \$PROPERTY:SET event command that the
    GENEMLREQ program executes. This SI.Property is required by the file
    transfer jobs in order to know the path and name of the source file
    to be transferred.
-   **Msg Text OpCon Proprty**: The full name of the OpCon Schedule
    Instance property where the path and name of the message text
    temporary file is stored by a \$PROPERTY:SET event command that the
    GENEMLREQ program executes. This SI.Property is required by the file
    transfer jobs in order to know the path and name of the target file
    in the MS Windows system that will receive the message text to be
    transferred.

###### Functions

(These also apply to formats B, C and D)

-   **F3=Exit**: Do not update the data, return to the LSAM menu.
-   **F12=Cancel**: Do not update the data, return to the list display.
-   **F20=ErrLog**: This function key will cause the display to branch
    to a different LSAM list display that will select only the error log
    records pertaining to the job identified on the current Details
    display.
-   **F21=WRKJOB**: This function key triggers a branch to an IBM i Work
    with Job menu, in order to examine information such as the job log
    for the job where the GENEMLREQ command was executed.
-   **F22=Parms**: This function key triggers a branch to an IBM i
    display (DSPPFM) of the content of the DB2 database temporary file
    where the mail task parameters were written for use with the
    SMASendMail program.
-   **F23=MsgTxt**: This function key triggers a branch to an IBM i
    display (DSPF) of the ASCII stream file where the formatted message
    text was assembled, prior to transmitting the stream file to the MS
    Windows system where it would be used by the SMASendMail command.
-   **PageUp/Down**: The Page Up and Page Down keys are prompted,
    depending on which of the four screen formats is on display. Use
    these function keys to move among the four parts of a log entry.

 

-   **Screen Title**: Display eMail Activity Detail
-   **Screen ID**: EMLLOGR5B

###### Fields

Fields that are unique to this format

-   **Parm Temp File**: The 10-character name of the DB2 file where the
    SMASendMail task parameters were stored in the IBM DB2 database. Use
    function key F22 to view the contents of this file.
-   **Parm Temp File DVar**: The name of the LSAM Dynamic Variable where
    the 10-character name of the mail task parameters temporary file is
    stored for reference.
-   **Parameters File Path**: The \\path\\ value in the MS Windows
    system (usually the OpCon server machine) where both the mail task
    parameters file and the message text temporary file are stored after
    the file transfer operation.
    -   The \\Binn\\ sub-directory under the OpCon installation
        directory is the typical place for this type of temporary file
        storage.
-   **Parm DB2 OpCon Proprty**: The full name of the OpCon Schedule
    Instance property where the path and name of the mail task
    parameters temporary file is stored by a \$PROPERTY:SET event
    command that the GENEMLREQ program executes. This SI.Property is
    required by the file transfer jobs in order to know the path and
    name of the source file to be transferred.
-   **Parm File OpCon Proprt**: The full name of the OpCon Schedule
    Instance property where the path and name of the mail task
    parameters temporary file is stored by a \$PROPERTY:SET event
    command that the GENEMLREQ program executes. This SI.Property is
    required by the file transfer jobs in order to know the path and
    name of the target file in the MS Windows system that will receive
    the message text to be transferred.
-   **Screen Title**: Display eMail Activity Detail
-   **Screen ID**: EMLLOGR5C

###### Fields

Fields that are unique to this format

-   **From Address**: The e-mail address from which the message is sent
-   **To Address**: The e-mail address to which the message is sent
-   **CC Address**: An option carbon copy address to which a copy of the
    message is sent
-   **BCC**: An optional blind carbon copy address to which a copy of
    the message is sent, but other recipients do not see this address

 

-   **Screen Title**: Display eMail Activity Detail
-   **Screen ID**: EMLLOGR5D

###### Fields

Fields that are unique to this format

-   **eMail Svr Port**: The TCP/IP port number of the service at the
    e-mail server that will receive the request to send the message
-   **eMail Svr /Secure**: The security option selected for protecting
    the privacy of the message
-   **eMail Server URL**: The WWW URL identifying the e-mail server
-   **eMail Server User ID**: The name of the user that was authorized
    to request message send services from the e-mail server. This may be
    in the form of an e-mail address, or any other form as required by
    the named e-mail server.
-   **Password Path/File**: The full path and file name that was used by
    the SMAEncryptPassword program to store an encrypted version of the
    password require for the e-mail server user.

#### Display Error Log (by Job, from Activity Log)

This function provides convenient access to the Display of Error Log
information, using a formatted display instead of the simple IBM i
command DSPPFM that is used for menu option 5. However, this method of
access to the error log information limits the error log records to only
those that pertain to the selected GENEMLREQ job, therefore, some error
log entries that might be available for failed GENEMLREQ jobs would not
appear except when using menu option 5.

-   **Screen Title**: Display Client eMail Error Log
-   **Screen ID**: EMLLOGR2

###### Menu Pathways

-   Main Menu \> Events and Utilities Menu (\#3) \> Client eMail Menu
    (\# 11) \> option 4 \> option 1
-   Main Menu \> Events and Utilities Menu (\#3) \> Client eMail Menu
    (\# 11) \> option 4 \> option 5 \> F20=ErrLog
-   Main Menu \> Operator Replay Menu (\#4) \> Client eMail Menu (\# 11)
    \> option 4 \> option 1
-   Main Menu \> Operator Replay Menu (\#4) \> Client eMail Menu (\# 11)
    \> option 4 \> option 5 \> F20=ErrLog

###### Fields

-   **Prim key**: A numeric primary key assigned to this Error Log
    record.
-   **Xref Prim key**: The primary key assigned to the first Activity
    Log record for this e-mail. All entries for the same e-mail task
    will cross-reference the first primary key (of the Activity Log, not
    of the Error Log) in order to show the association of log entries,
    even when multiple jobs may write interspersed entries. This
    cross-reference also separates multiple executions of the GENEMLREQ
    command from the same IBM i job.
-   **DD-HH.MM.SS**: A truncated form of the record logging date and
    time, showing the day of the month and the hours, minutes and
    seconds of the entry. A primary record key (shown on the details
    display) assures that records will appear in ASCENDING date+time
    sequence, where the most recent record appears at the bottom of the
    list.
-   **TP**: The record entry type. Values are:
    -   ER = an error description.
    -   CE = an error occurred when executing a CL command, also refer
        to the next entry type.
    -   CT = a log of the command that was executing when the CE entry
        was made.
    -   FE = an error during a file operation, refer to the content for
        the name of the file.
    -   VB = a line of message text showing a Dynamic Variable token
        before replacement.
    -   VA = the same line of message text showing the result after a
        Dynamic Variable token was replaced.
    -   VE = the error that occurred while trying to replace a Dynamic
        Variable token (also refer to the LSAM generic error log, file
        LSALOGF30, viewed from sub-menu 6, option 5, log view 4, for the
        name of the Dynamic Variable being processed when an error
        occurred).
-   **Log Entry**: Text describing the log event. Use option 5=Display
    to see the complete 1024 characters of the log entry.

#### Display Error Log Details

Option 5=Display from the list of Error Log entries shows the complete
entry text of up to 1024 characters, along with all other record
identifying fields.

-   **Screen Title**: Display eMail Error Log Detail
-   **Screen ID**: EMLLOGR6

###### Menu Pathways

-   Main Menu \> Events and Utilities Menu (\#3) \> Client eMail Menu
    (\# 11) \> option 4 \> option 1 \> 5
-   Main Menu \> Events and Utilities Menu (\#3) \> Client eMail Menu
    (\# 11) \> option 4 \> option 5 \> F20=ErrLog \> 5
-   Main Menu \> Operator Replay Menu (\#4) \> Client eMail Menu (\# 11)
    \> option 4 \> option 1 \> 5
-   Main Menu \> Operator Replay Menu (\#4) \> Client eMail Menu (\# 11)
    \> option 4 \> option 5 \> F20=ErrLog \> 5

###### Fields

-   **Actv key**: A numeric primary key assigned to the GENEMLREQ
    Activity Log entry from which this error log entry was displayed.
    Error log entries are actually associated with all the Activity Log
    entries that belong to the same Xref Prim key group (refer to next
    field).
-   **Xref Prim key**: The primary key assigned to the first Activity
    Log record for this e-mail. This is the cross-reference value from
    the Activity Log entry that was on display when access to the Error
    Log was requested.
-   **IBM Job ID**: The number/user/jobname of the IBM i job where the
    GENEMLREQ command was executed.
-   **Acronym**: The 1-10 character key representing an eMail Client.
-   **Seq**: The sequence number used to identify separate e-mail
    address records within a single Acronym.
-   **Use Code**: A code used to create sub-groups of records within a
    single Acronym, such as when there are different e-mail addresses
    used for different types of communication.
-   **ELog key**: A numeric primary key assigned to this Error Log
    record.
-   **Xref Prim key**: The primary key assigned to the first Activity
    Log record for this e-mail. All entries for the same e-mail task
    will cross-reference the first primary key (of the Activity Log, not
    of the Error Log) in order to show the association of log entries,
    even when multiple jobs may write interspersed entries. This
    cross-reference also separates multiple executions of the GENEMLREQ
    command from the same IBM i job.
-   **Log time**: The date and time when this Error Log entry was
    generated.
-   **Record Type**: The record type values are:
    -   ER = an error description.
    -   CE = an error occurred when executing a CL command, also refer
        to the next entry type.
    -   CT = a log of the command that was executing when the CE entry
        was made.
    -   FE = an error during a file operation, refer to the content for
        the name of the file.
    -   VB = a line of message text showing a Dynamic Variable token
        before replacement.
    -   VA = the same line of message text showing the result after a
        Dynamic Variable token was replaced.
    -   VE = the error that occurred while trying to replace a Dynamic
        Variable token (also refer to the LSAM generic error log, file
        LSALOGF30, viewed from sub-menu 6, option 5, log view 4, for the
        name of the Dynamic Variable being processed when an error
        occurred).
-   **Log Entry**: Text describing the log event.

#### Display Error Log (DSPPFM EMLLOGF10)

This function supports unrestricted access to the full content of the
GENEMLREQ error log. This menu option uses an IBM i command DSPPFM
instead of the formatted presentation of log entries limited to one mail
task (as supported by menu option 4). Despite the lack of formatting,
the log entries are easy to read, and this method of access may
sometimes be necessary in order to diagnose the reason that the
GENEMLREQ command failed to execute (and therefore might not have
created an Activity Log entry).

 

The sample display below shows the file content positioned to column 94,
where the Record Type code appears, followed by the beginning of the
plain text log entry.

 

The illustration below includes an example of a real error message, but
the color was changed from green to red in this document in order to
call attention to the entries. The actual DSPPFM display format always
uses the same color for all records in the file.

Display Client eMail Activity Log

  -----------------------------------------------------------------------------------------------
                                   Display Physical File Member
               File . . . . . . :   EMLLOGF10           Library  . . . . :   SMADTA
                  Member . . . . . :   EMLLOGF10           Record . . . . . :   1
                 Control  . . . . .   W94                 Column . . . . . :   94
                                        Find . . . . . . .
   .+\....0\....+\....1\....+\....2\....+\....3\....+\....4\....+\....5\....+\....6\....+\....7.
                  VB&Verify that the Dyn Var name DVAR is translated here: {DVAR}
           VAVerify that the Dyn Var name DVAR is translated here: 128 characters of te
            ERßSMA0179: Client eMail missing OpCon property name for Message Text file
            ERµGENEMLREQR failure, see previous error log entries. Last error: SMA0179,
                  VB&Verify that the Dyn Var name DVAR is translated here: {DVAR}
           VAVerify that the Dyn Var name DVAR is translated here: 128 characters of te
                  VB&Verify that the Dyn Var name DVAR is translated here: {DVAR}
           VAVerify that the Dyn Var name DVAR is translated here: 128 characters of te
                  VB&Verify that the Dyn Var name DVAR is translated here: {DVAR}
           VAVerify that the Dyn Var name DVAR is translated here: 128 characters of te
                  VB&Verify that the Dyn Var name DVAR is translated here: {DVAR}
           VAVerify that the Dyn Var name DVAR is translated here: 128 characters of te
                  VB&Verify that the Dyn Var name DVAR is translated here: {DVAR}
           VAVerify that the Dyn Var name DVAR is translated here: 128 characters of te
                  VB&Verify that the Dyn Var name DVAR is translated here: {DVAR}
                                             More\...
                    F3=Exit   F12=Cancel   F19=Left   F20=Right   F24=More keys
  -----------------------------------------------------------------------------------------------

###### Menu Pathways

-   Main Menu \> Events and Utilities Menu (\#3) \> Client eMail Menu
    (\# 11) \> option 4
-   Main Menu \> Operator Replay Menu (\#4) \> Client eMail Menu (\# 11)
    \> option 4

###### Fields

-   Refer to the description of the formatted Error Log display, above,
    for an interpretation of the raw log file entries. The log entry
    text begins at display column 98.
-   The format and use of the DSPPFM command output is documented by
    IBM. Use the function keys F19/F20 or the control field at the top
    of the display to change the position of the display window.
:::

 


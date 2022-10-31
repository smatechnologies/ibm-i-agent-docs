---
sidebar_label: 'Version 21.1 New Features'
---

# Version 21.1 New Features
## What's New with LSAM Version 21.1
This topic summarizes enhancements to the OpCon Agent for IBM i. The summaries explain design changes that affect more than one of the Agent's automation toolkit features.

Some of these enhancements were introduced as part of the new Agent version, so they do not appear in the Version 21.1 Fixes list that shows all LSAM PTFs. On the other hand, some of the enhancements listed here will also appear in the Fixes list as part of the serial list that is sorted by the LSAM PTF Number.

### Enhancements to Dynamic Variables
The following list of enhancements is discussed in detail within the Dynamic Variables chapter at [Recent Enhancements to Dynamic Variables](/dynamic-variables/overview.md#recent-enhancements-to-dynamic-variables).

- New multi-instance Dynamic Variables support parallel processing.
- Dynamic Variable value field extended from 128 bytes to 1024 bytes.
- Character string trimming is separated from the Local Data Area Start/Length controls.
    - Improved support for retaining or trimming both leading and trailing spaces.
- A new Value Type field (C=Character, N=Numeric) improves support for numeric values and supports more efficient green screen maintenance display management.

### Normalization of the Captured Data Application database
For too long it has been difficult to link Agent automation master records with Capture Data Rules.  The original prototype for the Capture Data feature used the 30-character description of the Capture Data Rule as the actual key (APP ID) valued used to store and fetch the rules master records.  This design prevented the option of changing the rule description without having to create a whole new structure of Capture Data Rules and associated Response Rules.

A new numeric APPKEY field has been introduced as the primary key for each Capture Data Rule (optionally combined with a Sequence Number when multiple rules must work together for the application).  Now the description text of a Capture Application can be changed any time.  (Old descriptive text will be stored in Agent log files with historical records, but the APPKEY value will remain constant.)

This change in architecture enables the following improvements in specific Agent automation tools.  Associated with these changes is the ability of all Captured Data Application IDs and Rules to exist independently from the Agent's automation tools that use data capture.  Accordingly, the LSAM Data Export and Import tools now have a new category for Captured Data Applications.  This does not change the fact that Captured Data Applications are separately categorized and dedicated to just one of these three Agent automation tools:
- Operator Replay robotic process automation
- Message Management server that handles messages from QSYSOPR and any other message queue
- The SCANSPLF report data capture and comparison tool

#### Operator Replay Step key values are removed from Captured Data Rules master records
Another normalization of the Agent’s database removes a hard link between the Operator Replay Script Step master records and any linked Capture Data Rules.  The associations between Step records and Capture Data Rules appear to work the same, but now the APPKEY value of the Capture Data Application is stored in the Operator Replay Step record, pointing to the Capture Data Application.  

>> **This change makes it possible to re-use green screen Capture Data applications among any number of different Scripts and/or Steps.**

This change also makes Operator Replay association with Capture Data Applications work like the Agent’s Message Management Parameters records.

### New Description Text Added to Captured Data and Response Rules
New description text fields have been added to the Capture Data Rules master record and to each Response Rules record.  Previously, it was often difficult to understand the meaning or intention of Captured Data Rules, and the intended effect of Response Rules.  

The description text will be blank in most cases after upgrading to this 21.1 release of the Agent software, but as time permits, it should be helpful to add description text to the existing data, and of course to start including description text for any new rules master records.

### Agent Submitted Job Log Content Extensions
The Agent’s sub-menu 6, option 5, log viewer 4, launches a new program that displays the “Submitted Job Log.”  The previous purpose of this log has been greatly extended so that this log file (LSALOGF30) now serves the purpose of a multi-function log for the Agent.  There are Agent log files that are dedicated to each of the Agent’s automation tools, but some features of the Agent such as Dynamic Variable token replacement span across multiple Agent features, so a single log file must be used to collect the activity and error log entries.  The enhanced log viewer program supports multiple ways to subset the data in this general-purpose log file, making it easy to isolate log entries for a specific IBM i job, or to isolate log entries by the record type so that, for example, only Dynamic Variable log entries appear in the list display.

### Standardization of Agent Display Function Keys
Please be careful during early use of the Agent version 21.1 green screen displays because several function key assignments have been changed in order to standardize the function key assignments so that they are the same on every display. 

Not all of these function key assignments are completely unique, as some function keys are standardized differently depending on the type of display.  For example, key F11 is used in many list displays to alter the sort order of the list, but within the chained actions used to connect Agent features with Captured Data Rules, F11 is the standard for branching to Response Rules.  But standardization is enforced within the scope of like green screen functions.

The most pervasive changes are these:
- **F8=DynVar**: All file maintenance features that support insertion of Dynamic Variable {TOKENS} now use F8 to display the prompting window that lists registered Dynamic Variable  names.
- **F4=Prompt**: In some master file maintenance displays that support entry of IBM i commands, the function key that can be used to prompt a command is now always F4.  There are some displays that also use F4 to prompt for other types of values in other data entry fields, but on displays where IBM i commands may be prompted, the prompting functions for other fields have been reassigned to different function keys.  In all cases, the location of the cursor may affect the program's response to pressing the F4 function key.
- **F23=$VAR**: Previously, F10 was used by many Agent file maintenance functions to display a prompting window that lists the available $-System variables that the Agent supports on a per-function basis.  However, F10 is most commonly used to support changes in list display formats, so now F23 has been assigned to all programs that may prompt for the $-System variable strings, such as "$IBM JOB NAME".  

>> In past versions of this Agent documentation, these reserved variable name strings were referred to as $-Special variables.  But since they are, in many cases, identical to the OpCon System-defined variables, this Agent's documentation now uses the same term of "System" to indicate that these are pre-defined, reserved character strings supported by the computer system and not subject to user redefinition.

### Interactive Master File Maintenance Programs Divided into Multiple Display Formats
SMA continues to divide some of the complex Agent Master File Maintenance displays into multiple, separate display formats.  This relieves congestion of an over-populated single display, while also avoiding the display of control fields that a given master record is not using, so that time and key strokes are not wasted and demands on the host computer is reduced.

#### Dynamic Variable numeric editing fields moved to a second page
Moving the long list of numeric value editing fields to a second display format made room for enhancements to the basic master record definition, such as fields that identify multi-instance variables.  A new character/numeric value type field shows on page 1 whether there will be a page 2 for numeric value definition and editing.  The previous separate display formats for certain value calculation Function Codes remain as separate displays that will appear as may be required after either page 1 or page 2.

#### Message Management Parameter field groups moved to second and third page
Two groups of control values that are optionally available to extend the capabilities of a Message Management Parameter record are (1) rule effective data and time fields, and (2) message threshold controls.  Instead of always forcing a user to page through these fields that are less often used, now the user will be asked to set two flag fields on page 1 that specify if either of these features is needed. When  neither is requested, the master record inquiry function will not display formats 2 and 3.

The first master record display page now supports the option to connect to a Capture Data Application.  The two fields used for defining this connection have been moved from page 3 to page 1, since they are very frequently used.  This change helped to free and isolate the seldom used threshold definition fields.

## Agent Enhancements by Project ID

This list shows the enhancements that were added to the OpCon Agent for IBM i as LSAM version 21.1 was released, available only after upgrading to version 21.1, plus enhancements that have been added to this Agent version since it was originally released.

| Project | Description |
| :------- | :----------- |
| IBMI-516 |"Multi-Instance Dynamic Variables." Dynamic Variables now support multiple instances to enable parallel processing.  Multi-instance Dynamic Variables resemble OpCon multi-instance properties, but Dynamic Variable values are stored within the Agent's database.  Agent maintains a temporary history of variable instances, automatically purged according to the Agent's standard operational log purge criteria.  Enhancement includes an extensive array of diagnostic displays to help understand how the instance variables are being managed.|
| IBMI-610 |Dynamic Variable maximum value size extended from 128 to 1024. The DSPDYNVAR variable value testing utility now supports a preferred full-screen display to show the longer value, although the original line-24 error message subfile display method is still supported \- even though it will only show a short part of a long variable value.|
| IBMI-616, IBMI-643 |Agent's "Submit Job Log" becomes a General Purpose log.  Log viewer utility expanded with improved list and subset feature, plus self-documenting display of each log entry. Many Agent programs enhanced to supply more detail about programs and jobs associated with each log entry, supporting improved subsetting of the log list, for example, to isolate all messages originating from a single job.|
| IBMI-623 |Job Tracking LSAM job ID expanded from 6-alpha to 9-numeric.|
| IBMI-625 |Added support for XML syntax of External Event commands. (CSV syntax support is still supported.)|
| IBMI-634 |New Operator Replay program routines and procedures make it possible to capture the virtual workstation's IBM i Job ID.  New $-System variables using $VWS category added to support access to the virtual workstation IBM i Job ID.  This can be important for certain use cases of Multi-Instance Dynamice Variables when the variable value should be isolated to the virtual workstation job and not to the Operator Replay Script driver program.|
| IBMI-637 |Change Operator Replay link to Capture Data rules so that Capture Data rules can be re-used with other Scripts and/or Steps.  The Operator Replay Script and Step IDs are removed from the screen capture rules master file, and instead the Capture Data Rule master record key is stored in the Operator Replay Script Step master record.|
| IBMI-641 |Add a Description text field to all Capture and Response Rules.  (SCANSPLF Scan Rules, acting as report data capture rules, already had a Description.)|
| IBMI-714R |The LSAM Job Scheduler communications program has expanded its internal transaction buffer size from 1280 to 3840 bytes to accommodate the potentially very long size of a $NOTIFY:EMAIL OpCon External Event command, now that the XML format of this command is required by the Agent's Client eMail feature.|
| IBMI-735 |The Agent's data export feature, initiated by option 8 in LSAM master file list displays, now includes option 8=Export for the new Capture Application ID master file.  This new master file makes it possible to change the description of a Capture Application ID without requiring any changes to the other Agent master files that now use the "APPKEY" key field to link to Capture Applications, instead of forcing the user to copy/paste a 30-character description into other master files to establishe this link.|
| IBMI-743 |The OpCon Long Job Name is now stored and displayed by the Agent's Job Master Log viewer (LSAM menu 6, option 5, log viewer 5), along with the previously supported Job Short Name.  The Job Long Name could be required whenever it is necessary to provide this parameter as part of a fully-qualified multi-instance Dynamice Variable.|
| IBMI-750 |New $-System variables added with category $SPLF to provide access to the IBM i Job ID of the job that produced the spool file.|
| IBMI-768 |The Client eMail feature (command GENEMLREQ) has been dramatically simplified and a dependency on an usupported, old OpCon eMail server access utility removed, as this feature can now use the XML-formatted version of the $NOTIFY:EMAIL OpCon External Event command.  Client's existing data is converted as this enhancement is installed.  Please review the updated documentation about the Client eMail feature for advice and certain Warnings about limited changes imposed by the upgrade.
| IBMI-778 |The IBM i Agent supports various sets of Agent-defined variable names, similar to the OpCon $System variables.  Previously, these variables were referred to as "$-Special" variables, but this name is now replaced by the term "$-System variables" since many of the variables produce the same value result as do the OpCon $System variables.|
 | | |
|**IBMI-780** |This project used LSAM PTF sequence # 043 as a marker to separate fixes and enhancements that were included with the first public distribution in the LSAM install file LI211043A.  The LSAM cumulative PTF save files (LSCTLDTA and LSCUMPTF) start with PTF sequence number 044.  PTFs with previous numbers are included in the install/upgrade save file.|




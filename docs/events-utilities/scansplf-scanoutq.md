---
sidebar_label: 'SCANSPLF and SCANOUTQ'
---
# SCANSPLF and SCANOUTQ Utilities

The SCANSPLF utility command represents an important automation tool included with the OpCon Agent for IBM i.  Although it is used in the mode of a utility command, the nature of this utility closely parallels the operations of the Operator Replay workstation automation and the Agent's Message Management server program.  All three automation tools perform data capturing, and the capture rules may be connected to one or more Captured Data Response Rules.  

Detailed information about the concepts of Data Capture and attached Response Rules can be found in the centralized documentation under the Events and Utilities Menu, at [Captured Data Response Rules](../events-utilities/captured-data-response-rules.md).

The SCANSPLF command is supported by one or more Scan Rules.  One or more Scan Rules are collected within Application IDs, in the same way that Capture Data rules can be collected in Application IDs that belong to either Operator Replay screen data or to Message Management message interception Parameters.  For this utility, a Scan Rule not only defines the report content that should be scanned, but it also defines data that should be captured from the report.  Therefore, in contrast with Operator Replay and Message Management, the Scan Rules ARE the Capture Data rules for SCANSPLF.  This means that Scan Rules can optionally be supported by attached Captured Data Response Rules.

The SCANOUTQ command is a utility that can be used to collect and manage one or more SCANSPLF applications.  The SCANOUTQ command has parameters and functions that are focused on scanning the content of IBM i output queues, in order to discover spool files that will then be processed by a SCANSPLF application.

## SCANSPLF management by SCANOUTQ

The SCANSPLF utility is used to find and scan the content of reports, stored in spool files in an IBM i output queue. Parameter definitions (SPLF Scan Rules) must be predefined for the SCANSPLF utility command. Optionally, Captured Data Response Rules may also be defined for each element of data captured by the SCANSPLF utility. Sets of Scan Rules and Captured Data Response Rules are grouped together by a label called an Application. The SCANSPLF utility works with only one Application rule set at a time and it determines a final positive or Positive result from the scan task based on the one or more rules that comprise the Application.

The SCANOUTQ utility supports alternate methods to identify one or more spool files that should be scanned, working among the contents of a specific output queue. To support SCANOUTQ, a SPLF Scan Rules Application may include more than one spool file name. For each spool file that qualifies according to the parameters of the SCANOUTQ command, this utility will execute the SCANSPLF command and use the rules from the specified Application that apply only to that spool file. As the SCANOUTQ command completes, it reports a job pass or fail based on the summary results of one or more SCANSPLF executions. 

The LSAM capability to log captured data and execute Captured Data Response Rules is also supported in the Operator Replay feature and by Message Management. Some different methods for defining screen data capture are described in the topic about Operator Replay, while capturing message text elements is defined in the topic about Message Management. This topic refers to how the common Response Rules are engaged when using the SCANSPLF utility.

## Configuring SCANSPLF (and SCANOUTQ) Rules

To use the SCANSPLF utility it is necessary to first create an Application ID (APP) and then to create one or more SPLF (spool file) scanning rules that are assigned to this APP. A SPLF Scan Rule must be defined for each discrete value that will be specified in the SCANSPLF command keyword PARAMETERS string, although the SCANSPLF command also allows a special PARAMETERS keyword value of \*RULES that waives the requirement for Scan Rules to match the command PARAMETERS keyword values.

:::tip
Previous versions of the LSAM used the Application ID text as the primary key field of each Scan Rule master record. Now an "App Key #" is a numeric value assigned to each Application ID, and the App Key number is used as the primary key for each Scan Rule.  This change makes it possible to revise the Application ID descriptive text at any time without affecting the related Scan Rules.  All master file displays will show the current text of the Application ID, although history log files may contain old versions of the Application ID text.  The App Key # value is displayed in all related data views to help the user track any activity associated with each Application ID.
:::

### Building a new SCANSPLF Application and Scan Rules from the LSAM menu

1. In the command line, enter **SMAGPL/STRSMA** or **LSAMENU**. For more information on command parameters, refer to the [STRSMA Command](../operations/lsam.md#the-strsma-command) and the [LSAMENU Command](../operations/lsam.md#the-lsamenu-command).
2. Enter **3** to choose the **Events and Utilities menu** in the SMA Main Menu.
3. Enter **3** to choose **Work with SCANSPLF Applications** in the Events and Utilities menu.  A list display will be presented titled "Wor with Capture Applications."
4. Press **F6** to Add a new Capture Application ID.  For the SCANSPLF utility, the Scan Rules ARE the report capture rules.  One or more report data capture rules may be collected within a single Application ID.
5. Type the new Application ID text, then press <**Enter**> and allow the system to assign a new App Key number to this application.
6. Press **F3** to return to the menu. Or, type **6** next to a new or existing Application ID and press **Enter** to procede to the list of Scan Rules.  When using option 6=Work with rules, skip to step 8.
7. Enter **4** to choose **Work with SPLF Scan Rules** in the Events and Utilities Menu.
8. Press **F6** to Add a new spool file scanning rule.
9. The **Create SPLF Scan Rule** screen appears.
10. When Adding or Copying SPLF Scan Rules, use **F10** to branch to the **Select Capture Application** screen, if the Appplication ID field is not already correct. Type option **1** to select the desired Application ID, then press **Enter** to return the new Application ID into the SPLF Scan Rule.
11. On the Create SPLF Scan Rule screen, type or accept the Rule sequence number (which must be unique within the Application ID) and a description for this record, the spool file name, the job name, and the spool file number (or one of the special values that choose a spool file number). These (except for the sequence number description) are the key fields that identify each Scan Rule. Type in any of the optional scanning control values to match the report.  Refer to [Add/Change/Copy SPLF Scan Rule](#addchangecopy-splf-scan-rule) for more information about how these field values may be used.
12. Press <**Enter**> to record the new SPLF Scan Rule record.

## SCANSPLF Application Screens and Windows

### Work with SCANSPLF Applications

Rules for capturing message data elements are assembled into logical groups identified by an Application ID (similar to screen data captures by Operator Replay scripts and Message Maagement data captures). One or more report data capture (= SPLF Scan) rules may be associated with each Application ID, where multiple rules are identified by a sequence number. The Application ID is linked to a Spool File Scan Rule record by the APP KEY numeric value. The APP KEY is entered into the record by using the F10=Capture function key from the Scan Rule Create, Copy or Change screens. An Application ID may be shared by more than one set of SPLF Scan rules, especially when the Application ID is intended for use with the companion SCANOUTQ command.

### LSAJ50R1 - Select Capture Application

The title of this display shows to **Work with Capture Applications** when it is accessed directly from an LSAM Menu.  The sub-title of "Application type:" shows the Agent automation tool that has its own data capture definitions, such as "**SCANSPLF**".

Details about working with Application IDs are provided at [Work with Data Capture Application IDs](/events-utilities/captured-data-response-rules.md#work-with-data-capture-application-ids).  

After optionally creating or maintaining an appropriate Application ID, use the Application ID list display option 6 to Work with Capture Definitions for the currently selected Agent automation tool, as described next for the SCANSPLF report scanning feature.

Type **1** next to the desired Application ID and press **Entery** to return the APP KEY and Application ID to the Work with Spool File Scan Rules display.

### Work with SPLF Scan Rules

The SCANSPLF utility differs from Operator Replay Script and Message Management Parameter management in that there is no separate "capture rule" for the SCANSPLF command.  Rather, the Scan Rules ARE the capture data rules, and the Scan Rules support additional parameters that are focused on navigation of report lines.  But then Scan Rules can be connected to Response Rules, similar to the other two Agent automation tools that can capture data.

- **Screen Title**: Work with Spool File Scan Rules
- **Screen ID**: LSAJ40R1

For each Application there are one or more Scan Rules that tell the SCANSPLF utility how to search the report spool file(s). Some or all of the Scan Rules may be required to match the input PARAMETERS values supplied by the SCANSPLF command, and there must be a Scan Rule for each possible input parameter. There may also be additional Scan Rules that are not associated with the input PARAMETERS. After defining these Scan Rules it will be possible to associate one or more Captured Data Response Rules, as described below, in order to perform operations on the data that is found by these Scan Rules or to respond with some command as each Scan Rule is satisfied.

Refer to the How To discussion earlier in this topic for more information about ways to apply Spool File Scan Rules to specific tasks.

#### Menu Pathways

Main Menu \> Events and Utilities menu (#3) \> Work with SPLF Scan Rules (#4).
Main Menu \> Events and Utilities menu (#3) \> Work with SCANSPLF Applications \> option 6=Work with rules \> Work with SPLF Scan Rules.

#### Fields

- **Search content**: Type a value in this field and press <**Enter**> or <**F16**> to initiate a search for a record that has matching data anywhere in the record, including data that might not appear on the list display (but the matching data would appear in the display of the detail of the record). When <**F16**> is pressed a second time, the search continues from after the last matching record, using the same Search content data. Press <**Enter**> a second time (with no options typed), or press <**F5=Refresh**> to start a new search.
- **Opt**: Type option from list displayed near the top of this screen. Refer to options definitions, below.
- **Application**: The Application ID is used to group one or more Scan Rules into a single task that can produce a pass or fail outcome of a job. The Application ID, along with the Sequence number, is critical for identifying data in the Captured Data Log file (which can also hold data from Operator Replay screen capture).
- **SEQ**: The sequence of the Scan Rule, within an Application. This number determines the order in which data Scan Rules are processed. The order of the Scan Rules is critical for rules that are defined to match the input PARAMETERS of the SCANSPLF command. Rules that are not assigned to an input PARAMETER of the SCANSPLF command can be in any order or interspersed among the other rules. However, the order of the Scan Rules may also be governed by the desired outcome of any associated Captured Data Rules, because those responses are also processed within the order of the Sequence number of Scan Rules. The Sequence number will be unique within an Application ID, regardless of how many SPLF Names and/or Job Names are included within an Application.
- **SPLF Name**: The actual name of the IBM i report spool file.
- **Job Name**: The name of the IBM i job that produces the report spool file.
- **SPLNBR**: The spool file number within the Job Name.
- **Description**: Text that helps to identify the purpose of each Scan Rule.

#### Functions

- **F3=Exit**: Return to the LSAM menu.
- **F5=Refresh**: Reload the list display with the latest data from the master file.
- **F6=Add**: Branch to the screen for creating a new Scan Rule record.
- **F11=Sort SPLF/JOB, Sort APP/SEQ\#, Sort APP/SPLF**: Pressing F11 rotates among these three different sorting options for the list display. In each sort mode, the primary sort field heading is colored pink and underlined, and secondary sort fields are also underlined.
- **F12=Cancel**: Return to the LSAM menu.
- **F16=Search next**: When a search argument has been entered in the Search content field, pressing F16 can either start a new search (if the content value was changed) or it can continue a search to look for the next list entry that matches the search argument, starting with the first record after the last match found.
- **F17=Top**: Reposition the list display to show the first record in the list.
- **F18=Bottom**: Reposition the list display to show the last record in the list.
- **F24=More keys**: Use this function key to change the function key legend displayed at the bottom of the screen. All function keys remain active, even if they do not appear in the currently displayed function key legend.

#### Options

- **2=Change**: To change a record, type 2 in the Opt field next to the record(s). Press **Enter** to proceed to the Change detail screen.
- **3=Copy**: To copy a record, type 3 in the Opt field next to the record. Press **Enter** to proceed to the Copy detail screen. During the copy process, a pop-up window will offer an option to also copy any Response Rules that are associated with the Scan Rule being copied.
- **4=Delete**: To delete one or more records, type 4 next to each record. Press **Enter** to proceed to the Delete confirmation window. During the delete process, a pop-up window will offer an option to also delete any Response Rules that are associated with the Scan Rule being deleted.
- **5=Display**: To display record details, type 5 next to each record. Press **Enter** to proceed to the display details screen. Typing option 5 next to many or all records at once before pressing **Enter** is a convenient way to review all the definition details at once. Press **Enter** to advance as each detail screen is presented.

### Add/Change/Copy/Display SPLF Scan Rule

- **Screen Title**: Add/Change/Copy/Display SPLF Scan Rule
- **Screen ID**: OPRR50R2

Refer to the How To discussion earlier in this topic for more information about the meaning and purpose of the fields on this display. Refer to details about the rules and effect of each field in the fields table, below.

#### Menu Pathways

Main Menu \> Events and Utilities menu (#3) \> Work with SPLF Scan Rules (#4) \> F6=Add *- or -* option 2=Change *- or -* option 3=Copy.

#### Fields

Refer to the following subjects that describe [Using the SCANSPLF Utility](./scansplf-scanoutq.md#using-the-scansplf-utility) for examples of how the following field rules can be used.  Additional information is available at [Case Examples of SCANSPLF Applications](./scansplf-scanoutq#case-examples-of-scansplf-applications)

:::tip
The order of the fields listed in the table below will vary, depending on the setting of the "Scan Rule maint fmt 1- or 2-page" option in the "LSAM Utilities Configuration" screen (documented in previous pages of this section).
:::

- **From fields**: 
  - Application 
  - Sequence 
  - SPLF Name 
  - Job Name 
  - SPLNBR 

    When this screen appears in Copy mode, the key fields of the source record being copied are shown in this heading area. A new value must be assigned to the Sequence of the Scan Rule record being created in Copy mode, using the Rule Sequence input field, below. (The other key fields may remain the same in the new, copied record, since more than one scan rule is allowed per SPLF Name + Job Name + SPLNBR.)

- **Application Key / ID**: The Application Key field is used to group one or more Scan Rules into a single task that can be configured to end normally or abnormally, depending on the setting of the Required Rule field in any of its rules. The field permits spaces and special characters.  The Application ID text is display-only, as copied from the Application ID master file (described above).
- **Rule sequence**: The order in which the scan rule will be processed, relative to other scan rules under the same Application. The value must be unique within the Application ID, even for a different SPLF Name, Job Name or SPLNBR. 
- **Rule description**: Text that identifies the purpose of the scan rule, helpful on the Work with SPLF Scan Rules list display.
- **SPLF name**: The name of the spool file to be scanned. 
- **Job name**: The IBM i 10-character job name. The special value of \*CMD may be used to indicate that the actual job name will be provided at execution time by the SCANSPLF command.
- **SPLF number**: \*ANY, or optionally, a specific spool file number within the Job name, used when more than one spool file of the same name is produced by a single job.
- **From/To page**:
  - The scan may optionally be limited to one or more specific pages of a report.  The special value *STR means "from the start," and the special value \*END means "to the end."
  - The special value \*END may be used in the From-page field to cause the SCANSPLF command to work backwards from the last line of the report to the first line.  Working from the end of the report combines well with the Incidence count, for example, if it is important to find the second-to-last TOTALS label on a financial report.
  - When \*END is used for the From-page, it is possible to specify a Positive number for the To-page. A Positive number indicates the limit of pages to scan, starting backwards from the end of the report. For example, (**-1**) means scan only the last page, (**-2**) means scan only the last two pages, and so forth. A Positive number in this character field is indicated by type a dash (**-**) either before or after a number: **-1** or **1-**.
- **From/To line (record)**: The scan may optionally be limited to specific lines on each page of the report. The line counter is reset at the top of each page. This feature might be useful, for example, when a label or value should only be found in the heading line of a report page (keeping in mind that the first heading line 
might actually be printed on line 2 of the page, in which case it would be necessary to specify 2 as the From and the To lines).
- **From/To position (column)**:
  - The scan may optionally be limited to specific positions on each scanned line of the report. For example, in IBM i job log reports, the severity code of logged messages always appears in positions 36-37.
  - This pair of control fields has a different effect depending on other fields on the scan rule:
    - If a scan label is specified, the scan label must be found within the From/To positions on the report line. When the scan label is specified, the From/To positions have no effect on the scan value itself - the scan value may be found anywhere within the report line where the scan label was located.
    - If a scan label is not specified, then the scan value can only be found starting with the first non-blank character after the From-position, and it cannot extend past the To-position.
    - When the special value of *CAPT is specified for the scan value and the scan label is not specified and a scan value length greater than zero is entered, then the To-position will be ignored. Only the From-position will be used to find the scan value to be captured, and the captured data will be limited to the specified scan value length.
- **Start scan label**: Optionally, specify a predictable string of characters that can be found by the scan program in order to locate the scan value within a report line.
- **Position after label**: When the scan label is specified, indicate where the scan program should look for the scan value. There are four possible value types for this field that each cause a different result:
  - **0 (zero)** = start with the first non-blank character AFTER the end of the scan label.
  - **Positive number** = start at the specified column number AFTER the end of the scan label. If the scan label ends at column 27 and the position-after value is 6, then the scan value to be compared will begin at column 33. 
  - **(-1)** = start with column 1 on the report and use the first non-blank character that appears BEFORE the scan label. This value is not valid if the scan label begins at column 1. The search for a scan value will stop with the last character before the start of the scan label, but the scan value can overlap the scan label. If no non-blank characters are found before the scan label starts, then the scan program assumes there is no scan value at the location of the scan label and this scan value will be marked as not found (not matched).
  - **Negative number** = start at the specified number of columns BEFORE the start of the scan label. Remember that (-1) has a special meaning, so it cannot be used in this context. If the scan label starts at column 27 and the position-after value is (-15), then the scan value to be compared will begin at column 12.
- **(scan) Value, \*PARM, \*CAPT, DVar**: This field is used to specify or describe the scan value. The scan value will be the captured data value stored in the Captured Data Log file and referenced by any captured data response rules. When applicable, this scan value will be compared to the value found in the report at the specified location in order to determine if the scan rule has been matched or not matched. The scan values that may be specified include:
  - **A specific value** = Any character string may be specified as the value that should be compared to the scan value found at the specified location in the report. For example, this type of rule can be used to find a flag in a financial report that may say "OUT OF BALANCE" in order to cause the SCANSPLF command to fail, so that the OpCon job that executed the SCANSPLF command will show up on the OpCon Schedule as a failed job, triggering an operator response. Leading blank characters may be left in the scan value field if they must be included in the scan rule match. Use the scan value length to also include trailing blank characters.
    :::tip
    Special values \*PARM and \*CAPT must be all capital letters.
    :::
  - **\*PARM** = Use the value specified in one of the input PARAMETERS values of the SCANSPLF command. When the SCANSPLF command supplies input values (that is, the *RULES option for PARAMETERS was not used), there must be the same number of scan rules that use this *PARM special value as there are input parameter values separated by colons (:) in the PARAMETERS keyword of the SCANSPLF command.
  - **\*CAPT** = This special value indicates that the scan rule will not generate a match or nomatch (pass/fail) result. Instead, this type of scan rule will be used only for the purpose of capturing a value at the specified location in the report and then storing that value in the Captured Data Log file. Captured data values can be used to trigger any number of Captured Data Response rules, and the Response rule records may specify that the captured data should also be stored as an LSAM Dynamic Variable or as an LSAM Operator Replay token variable value.
  - **DVar** = An LSAM Dynamic Variable may be specified in the scan value field. If the Dynamic Variable has already been defined in the LSAM table (remembering that Dynamic Variables may be defined at run-time, in which case they must be anticipated before they appear in the LSAM table), then function key F4=DynVar may be used to select from a list of available Dynamic Variables. The Dynamic Variable name is recognized by the scan program because it is enclosed within the pair of characters registered for this purpose in the LSAM Utility Configuration function (LSAM menu 3, option 7). The default Dynamic Variable enclosure characters are a pair of curly brackets: {var_name}. It is possible to combine a Dynamic Variable with other text that is entered directly into the scan value field, for example: 'Leading characters {var_nam} trailing text'. When the scan rule is executed, the scan program will replace the Dynamic Variable with the value found in the LSAM table at the moment of execution. A Dynamic Variable value may have just been set by a preceding scan rule's Captured Data Response rule.
- **Scan value length**: When the scan value length is left at zero, the scan program assumes that the length of the scan value is equal to the last non-blank character in the scan value string (that is, the scan value is assumed to be trimmed of trailing blanks, and then the scan value is measured). The scan value length has a different effect depending on the setting of other scan rule fields:
  - Leave set to be left at zero when using the *PARM scan value. The length of the input PARAMETER value supplied in the SCANSPLF command will determine the length of the character string extracted from the report.
  - When a specific value is entered into the scan value field, the scan value length can be set to a value longer than the number of trailing non-blank characters in the value in order to tell the scan program that trailing blanks should be considered in the match (pass/fail) rule. For example, if a scan value is entered with two leading blank characters, as: 'VALUE', then the default trimmed length of this scan value used by the scan program would be 7 (2 leading blanks and 5 non-blank characters). If the scan value length is set to 9, then the scan value found in the report must also have 2 blank characters after the non-blank characters.
  - For the special scan value of *CAPT, use the scan value length combined with the From-position to specify the data that should be captured from the report. For *CAPT, if the scan value length is zeros, the the To-position must also be specified with the From-position in order to determine how much data to capture.
  - Dynamic Variables are handled the same as typed scan values. The scan program first replaces a Dynamic Variable token with the variable's value at run time, then it subjects the scan value to the scan value length, as described above for specific values. Leave the scan value length at zero to allow the scan program to adapt to the actual length of the Dynamic Variable's value at run time. If a scan value length is specified, then the possible values of the Dynamic Variable must be well understood in advance in order to predict the results of the SCANSPLF match rules.
- **Bypass parm value**: This field is used only when the SCANSPLF command will provide input values in its PARAMETERS keyword. If the specified bypass value is found in the input PARAMETERS position corresponding to this scan rule sequence number, then the input parameter will be considered matched by default and the report will not actually be scanned in order to set this scan rule to a status of matched.
:::info Example
For a given application, such as a financial report balancing task, the SCANSPLF command might be assembled by an automatic routine executing on the OpCon server. In this example, assume that there are four input parameter values: debit item count, debit total amount, credit item count, credit total amount. If any of these values is not found in the source data used by the SCANSPLF command assembly routine, then that routine is allowed to insert a place-holder value that indicates, "thisvalue is not supplied today - ignore this parameter position." An example of such a value might be *empty*. In this case, the Bypass parm value should be set to this same value, *empty*. To make the bypass value work, the administrator configuring the LSAM SPLF Scan Rules must coordinate this special value with the programmer responsible for building the automated routines that will assemble the SCANSPLF command string for the OpCon job. 
:::
- **Bypass value length**: Optionally, specify the length of the characters string used for the Bypass parm value. If this length is left at zeros, the scan program will assume that the Bypass parm value length ends with the last non-blank character. Leaving this value as zeros is the usual practice.
- **Compress numeric**: This flag field tells the LSAM data comparison rule engine how to handle the comparison data and the captured data. If numeric data was edited using a currency sign and decimal point, it may be preferable to match the whole character string exactly, without compression. But if the absolute numeric value is important and the numeric field editing cannot be predicted, then it may work better to compress out all non-numeric characters and compare only the numeric digits.  Compressed monomeric do not keep track of how many digits fall to the right of the decimal point, so it is important that the number of decimal places be the same in both the reference value (which may be an input PARAMETER from the SCANSPLF command) and the scan value found in the report when the option for compressing numeric data will be used. 
- **Required rule**: This field is used to indicate that a scan rule is required, and it will affect the pass/fail outcome of the scan task:
  - **Y** = yes, the rule must be matched as part of the overall outcome of the SCANSPLF job.
  - **N** = no, this rule may be ignored; whether it matches or not, it does not affect the overall outcome of the SCANSPLF job.                
  - This field MUST be set to **Y** when the scan value is \*PARM.
  - This rule at the individual scan rule level must be coordinated with the SCANSPLF command setting in its FAILOPT (fail option) keyword. The scan program itself keeps track of all rules that have their "Required rule" field set to Y=yes. At the end of the scan job, if all required rules were matched, then the SCANSPLF command would end normally. If any of the required rules were not matched, then the SCANSPLF command would end abnormally. The SCANSPLF command FAILOPT can be used to reverse the logic of this outcome (or to ignore the pass/fail outcome of rule matching). If the FAILOPT is set to (2) = fail on match, then the SCANSPLF command  will signal a failure only when all required rules are matched. For FAILOPT(2), if any required scan rule is not matched, the SCANSPLF command will appear to end     normally.
  - The FAILOPT(2) technique may be most useful for single-rule Applications. For example, if the Application is searching for a failure message in a job log report, finding a match for any one failure message should generate an abnormal end of the SCANSPLF command. If two different failure message rules were specified, it is unlikely that both failure messages would be found, therefore, the SCANSPLF using FAILOPT(2) would typically end normally because not all rules were  matched.

#### Functions

- **F3=Exit**: Return to the LSAM menu.
- **F5=Refresh**: Reload the maintenance display with the original default values for Add, Copy or Change, discarding any new typed input.
- **F8=DynVar**: When the cursor is positioned in the Scan Value field, use this function key to view a window of registered Dynamic Variable values and select a value to be inserted into the Scan Value field.
- **F12=Cancel**: Return to the Work with SPLF Scan Rules list display.
- **PageDown/PageUp**: When the LSAM Utilities Configuration option is set to use the 2-page format for this maintenance display, the PageDown and PageUp keys can be used to move between the two pages. NOTE: If Enter is pressed while page 1 is on display, the master record will be added or updated, without displaying the optional fields on page 2. Use PageDown to view the page 2 fields, if desired, before pressing the Enter key.

### Copy/Delete SPLF Scan Rule Windows (options 3 and 4)

Whenever the options 3=Copy or 4=Delete are being processed, the program will present a window that offers an opportunity to also copy or delete any Response Rules associated with the Scan Rules that belong to the Application.

This same format of window is presented when individual Scan Rules are copied or deleted (described below).

#### Manage Response Rules Window (Copy)
```
          Manage Response Rules

Copy response rules also?   1  0=No, 1=Yes          
 (Recommended: 1=Yes)

Enter=Select   F12=Cancel
```
#### Manage Response Rules Window (Delete)
```
            Manage Response Rules

Delete response rules also?   1  0=No, 1=Yes
 (Recommended: 1=Yes)

Enter=Select   F12=Cancel
```
#### Fields

- **Copy?** - or - **Delete?**:
  - **0**=No, **1**=Yes                                      
  - When these windows are presented from the maintenance of individual Scan Rules, they apply only to the Scan Rule(s) being copied (or deleted) and not to the whole Application ID. 
  - When either option 3=Copy or option 4=Delete is selected for a SCANSPLF Application ID, the program offers the option to perform either a copy or a delete of all Response Rules that are related to each Scan Rule that is associated with that Application ID.
  - For option 0=No, the copy or delete action is completed, but any associated Response Rules are ignored.


#### Functions

**F12=Cancel**: Quits the option window and returns to the list control display. (The copy or delete option remains incomplete and must be  restarted, if desired.)

### Work with Capture Response Rules

See the centralized [Capture Data and Response Rules](./captured-data-response-rules.md) topic in this document for details about creating and attaching Response Rules to SCANSPLF Scan Rules.

Remember that for the SCANSPLF utility, the Scan Rules are the Captured Data Rules.  This feature is different from Operator Replay and Message Management which require separate Captured Data Rules be optionally attached to the primary master records of those features.

### Display Capture Rules/Response Rules Chart (option 7)

The Capture and Response Rules chart displays are explained in detail under Operator Replay, within the Screens and Windows section, under the title [Operator Replay Capture Chart (opt 7)](/operator-replay/screens.md#oprr10r7---capture-screen-data-chart-5-views).

## Using the SCANSPLF Utility

The SCANSPLF(Scan spool file) is an LSAM utility command that can find and read spool (report) files from an IBM i output queue. As the command executes, it stores found scan values into the LSAM's data capture log file. Captured data can optionally be associated with Captured Data Response Rules. As the command completes, it evaluates whether all the required scan values were found and it reports about any scan values that were not matched. A parameter of the SCANSPLF command controls how
the command reports its ending status. It can finish with a forced abnormal termination or a normal termination, based on the result of the scan values evaluation and on the option selected for the command's FAILOPT parameter.

The SCANSPLF command may be used as an interactive command from IBM i command entry (if the interactive job includes the LSAM environment library list) or as the Call command line text in an IBM i job on an OpCon schedule. A command parameter "OPCONXPS" must be set to Y=yes or N=no, depending on the environment in which the command is executed. It is important that this parameter be set to Y=yes to enable cooperation with OpCon, but the command will fail unless this option
is set to N=no when the command is executed outside of the control of an OpCon job. 

This command submits a list of scan values in a parameter string included as a keyword value with the command syntax, and the list of scan values must match the predefined SPLF Scan Rules registered in the LSAM database. There must be a number of SPLF Scan Rules with a Scan Value set to \*PARM and with the required option set to Y=yes, that equals the number of input values listed in the PARAMETERS keyword of the SCANSPLF command. This set of Scan Rules must all be registered using the same Application value as specified for the APP keyword of the SCANSPLF command.

As the command completes, when it has been submitted from an OpCon schedule, it reports back details about the scan values matched or mismatched. In addition, a completion message is sent to the OpCon SAM describing a successful, complete match of all SPLF Scan Rules or any reason why the command has ended abnormally. This information is available from the OpCon view of the job using a right mouse click context menu and selecting Job Configuration. From the Job Configuration 
window that appears, the list of values for Operations Related Information shows all of the messages that have been sent by SCANSPLF to the SAM.

The FAILOPT parameter of the SCANSPLF command controls when the command forces an abnormal termination. This option can be set to the default behavior of ending abnormally when any required Scan Rule is not matched, or it can be set to the reverse logic of forcing an abnormal termination when all Scan Rules are matched (such as when the scan is for an error code found in a job log report). Optionally, the command can also be set to end normally regardless of the outcome of Scan Rules
matching.

When the SCANSPLF command driver program determines that the command should end abnormally, the driver program ends with escape message code RNX9001 (the standard message from an RPG program \*PSSR subroutine that has ended at the \*CANCL exit point). This message is reported with the job termination message code CEE9901. The job detail messages shown under the OpCon Job Information context menu tabs Configuration -\> Operations Related Information -\> Job Detail Messages, will indicate
when this error message condition is expected, or if an unexpected program error occurred.

One typical example of how the SCANSPLF utility can be used is with financial transaction batch balancing procedures. Control totals may be inserted as the SCANSPLF PARAMETERS scan values string and those values can be matched to totals appearing on a batch posting report. This application of the command enables automation of procedures that might otherwise require human intervention. The optional logging feature supports this process with entries that can be audited to prove that the
process worked correctly.

### Processing Multiple Spool Files With SCANSPLF

The SCANSPLF command was originally constructed for the purpose of locating a single spool file belonging to one job and scanning that report for the content specified in the Scan Rules. However, with careful manipulation of the command parameters it is possible to define a single scan task that can span multiple spool files across multiple jobs.

The capabilities and limitations of the SCANSPLF command for handling multiple spool files are different from the SCANOUTQ command, described below. Sometimes, the SCANOUTQ command might be more appropriate for certain tasks.

One of the limitations of the SCANSPLF command is that it must be told the job name(s) to use for identifying the spool file(s) to scan. The name of the job can be supplied by either the Scan Rules or by the JOBNBR parameter of the SCANSPLF command (where the JOBNBR parameter actually supports more than just the IBM i job number - refer to the table of fields for the prompted SCANSPLF command, below). If a Scan Rule specifies \*CMD for the job name, and the SCANSPLF command provides no value for the JOBNBR parameter, then the Scan Rule will be skipped and a warning message will be added to the Captured Data Log file. If all rules for the Application are skipped, then the SCANSPLF command will fail for the reason that no valid job name could be determined.

Scan Rules always require a Spool File (SPLF) name. It is possible to register more than one SPLF name within a single Application. This capability was included primarily to support the SCANOUTQ command, but it can also be used directly by the SCANSPLF command. No examples of this capability are illustrated in this document, but possible applications can be discovered by experimentation.

More importantly, it must be understood that if the SPLF parameter of the SCANSPLF command is not left at the default value of \*APP (meaning that the Scan Rules under the named APPlication will provide one or more spool file names to scan), then the SCANSPLF command is, in effect, limiting the current scan task to a subset of Scan Rules that match the SPLF name provided by the command. The designed intention of allowing SCANSPLF to use a subset of an Application's Scan Rules was to support
the way the SCANOUTQ command will execute the SCANSPLF command separately for each spool file name that is registered to the Application. In some cases, it may be useful to create a job that will use only the Scan Rules for one spool file, even though the Application had more SPLF names registered. Thus, the outcome of the SCANSPLF task will be limited by only the rules for the one SPLF name, instead of being subject to the rules for all the registered spool files.

When experimenting with the powerful flexibility of the SCANSPLF command parameters, it will be helpful to carefully examine the content of the  Display Data Capture Debug Log file (LSAM sub-menu 3, function 9). This log is only loaded with data when the LSAM Utility Configuration function (sub-menu 3, function 7) has set the "Capture data debug  logging" flag to a value of Y=yes. Therefore, it would be important  that this flag be set to Y=yes until new SCANSPLF applications have been
proven reliable. After that, the debug log flag could be turned off in order to improve system performance and reduce disk space utilization. But please remember that this debug log file may also be useful for auditing purposes. Some highly audited data centers may require that the  debug logging flag be left active at all times. In this case, the SMARGZ command and/or the LSAM default file management parameters must be configured to periodically backup and purge the log file so that it does 
not consume large amounts of disk space. There are many log entries made for each SCANSPLF task, especially when multiple spool files are being
scanned.

#### SCANSPLF Parameters and Rules Limitations

The SCANSPLF command supports up to 16 scan values in the PARAMETERS keyword string, and each parameter value can be up to 64 characters long. But the SPLF Scan Rules will support up to 32 rules overall, per spool file + job name combination. A single Application code will support up to 32 spool file + job name combinations, up to a limit of 999 rules per Application.

### Using SCANSPLF to Determine OpCon Job Completion Status

It is possible to control the final job completion status that the IBM i LSAM will report to OpCon SAM by adding the SCANSPLF command to the Call command line of the OpCon job master record.

When the SCANSPLF command is included in the job Call command line after a special character, the IBM i LSAM will withhold a report to OpCon about the job  completion status until after it completes the evaluation of the job log. This post-job log evaluation is only performed when the original Call command of the job has completed normally; it will not be performed for jobs that ended abnormally. For jobs that did complete normally, the final completion status of the job that is reported to the OpCon schedule will depend on the Scan Rules defined for this job name and the spool file QPJOBLOG, under the Application ID specified with the SCANSPLF command. Many Scan Rule options are available to control whether a job will be reported as completed normally or failed.

When the SCANSPLF command is used along with additional SBMJOB job parameters, the SCANSPLF command and its own parameters must follow any job definition parameters. That is, the SCANSPLF command string must be the last string of non-blank characters in the Call information field, following the Job parameters separator character, as in the following example:

:::info Example
```
WRKJOB JOB(*) OUTPUT(*PRINT) 
OPTION(*ALL)|CCSID(297)  
SCANSPLF APP(ChkJobLog1)  
```
:::

Remember that the APP() keyword of the SCANSPLF command is case-sensitive.

For important additional information about the special character that is used to separate job parameters and the SCANSPLF command from the primary Call information line values, please review IBM i LSAM Configuration - \> Extended Discussion on Parameters -\> Job Parameters Separator-HEX.

### SCANSPLF Command Syntax

The SCANSPLF command entered in an IBM i command line, either from IBM i or from the Call information in an IBM i job on an OpCon schedule, requires the syntax illustrated in the following example:
:::note  EXAMPLE
```
SCANSPLF APP('App ID: lower case and spl chars') DATE(20010101)
OPCONJOB(Y) PARAMETERS('*empty*:12345:*empty*:67890')
JOBNBR(123456/username/jobname) FAILOPT(1) SPLF(*APP)
SPLNBR(*APP) USRDTA(*ALL) CMDMODE(*CMD) USRDFNDTA(*ALL)
JOBLOGMSG(Y)
```
:::

The individual keywords are explained in a table following the screen illustration below of this command prompted using function key <**F4**\> from IBM i command entry. Notice, above, that the APP and PARAMETERS keyword values are enclosed in single quotes. These are required in order to communicate space characters, numeric digits and special characters as part of a single character string to the command processor program.

There must be the same number of scan values, separated by colons, in the PARAMETERS keyword as there are SPLF Scan Rules using a Scan Value of \*PARM in the LSAM rules table. Also, each of the \*PARM Scan Rules must be set as required (that is, the Required Rule field must be set to Y = yes). However, the SCANSPLF command is allowed to also process additional scan rules that specify a different Scan Value, such as a directly-entered value or a Dynamic Variable (refer to the chapter about
[Dynamic Variables](../dynamic-variables/overview.md)). There is also an option to create scan rules that simply capture report data, using the value \*CAPT in the Scan Value field. The PARAMETERS keyword supports a maximum of 16 parameter values, but each spool file name + job name combination, within an Application, can include up to 32 Scan Rules (implying that any required rules over 16 cannot be associated with the command PARAMETERS).

Regardless of the type of Scan Value (registered in the Scan Rules), the SCANSPLF command completion status (normal or failed) depends on all required SPLF Scan Rules being matched. However, it is possible to also specify Scan Rules that are not required, so that they do not affect the outcome of the command but, perhaps, only enable the execution of a Captured Data Response Rule. After the list of required scan rules has been summarized and evaluated to determine if all matched or if any did not match, the actual completion status of the SCANSPLF command is determined by the FAILOPT parameter, as described in the command parameters table, below.

The CMDMODE parameter keyword is provided for LSAM internal use only. This keyword must be left at the default value of \*CMD whenever the SCANSPLF command is used in a stand-alone mode, that is, from the IBM i command entry screen or from within any batch job. There is an alternate value supplied for this parameter by the LSAM job completion message server job to support the option of appending the SCANSPLF command to the OpCon Call command line, so that the final job completion status
reported to the OpCon SAM will be determined by the results of the scan command.

#### Prompted SCANSPLF Command - Page 1 of 2
```

                         Scan Spool File (SCANSPLF)
                                                                
Type choices, press Enter.
                                                                
Application (Capture ID) . . . . APP            *APPKEY_______________________
APPKEY instead of APP text . . . APPKEY         0__________
Date, as CCYYMMDD  . . . . . . . DATE           __________
OpCon/xps job? Y=yes, N=no . . . OPCONJOB       Y
*RULES, or parms (P1:P2:...Pn)   PARAMETERS     *RULES________________________
______________________________________________________________________________ 
______________________________________________________________________________ 
______________________________________________________________________________ 
______________________________________________________________________________ 
______________________________________________________________________________
______________________________________________________________________________
  ...    
 Job number (123456), optional  . JOBNBR         _____________________________
 Command fail behavior option . . FAILOPT        1               
                                                                       More...
F3=Exit   F4=Prompt   F5=Refresh   F12=Cancel   F13=How to use this display
F24=More keys

```

#### Prompted SCANSPLF Command - Page 2 of 2.

```

                         Scan Spool File (SCANSPLF)
                                                               
Type choices, press Enter.

Spool file name or *APP  . . . . SPLF            *APP______
Spool file number,if Rule *ANY   SPLNBR          *APP______
User data  . . . . . . . . . . . USRDTA          *ALL______
Command mode (always *CMD) . . . CMDMODE         *CMD______
User-Defined Data (*generic*)  . USRDFNDATA      *ALL________________________
______________________________________________________________________________
______________________________________________________________________________
________________________________________________________________
Msg to job log? Y/1=yes,N/0=no   JOBLOGMSG       Y
Scan condition (OpCon job log)   SCANCOND        O 
                                 INT_ONLY_

                                                                        Bottom
F3=Exit   F4=Prompt   F5=Refresh   F12=Cancel   F13=How to use this display
F24=More keys
```
#### Fields

| Keyword    | Size    | Type   | Description                       |
| -------    | ----    | ----   | -----------                       |
| APP        | 30      | \*CHAR  | This field is carried over from previous versions of this command, and it no longer serves as a reliable identifying key to a collection of Spool File Scan Rules, though it may still be used.  The recommended and most reliable way to identify a SCANSPLF Application is to use the permanently assigned Application Key number (APPKEY).  Therefore, it is recommended to leave this field set to its default value of *APPKEY (or do not specify the APP() keyword), and to convert existing automation applications of the SCANSPLF tool to use the new APPKEY instead of the Appplication ID (which is now only descriptive text that could be changed at any time.)  But, when this value is used, it will take priority over the APPKEY value (in order to grandfather-in SCANSPLF command implementations from past versions of the LSAM), and it must be enclosed in single quotes. Type up to 30 characters. Upper and lower case letters, numeric digits and special characters are allowed - the value is case-sensitive. This value, when used, must match an Application ID that has been registered using the LSAM Menu 3, function 3. |
| APPKEY     | 9.0    | \*DEC   | The permanent identifying key of any Data Capture Application (which is a collection of Data Capture Rules). SMA strongly recommends always specifying the APPKEY value instead of using the Application ID (APP) text string to identify the Application for this command.  The APPKEY can be found in the list display of "Work with SCANSPLF Applications" at LSAM menu 3, option 3. |
| DATE       | 8.0     | \*DEC   | Optionally, specify a date in CCYYMMDD format, to identify the processing date of the target spool file. This value limits the list of jobs that the SCANSPLF command will search for the spool file. It is also used to specify the Capture Date in the captured data log file (OPRLOGF40) where found values are stored. If this value is left at zeros or not specified, the current IBM i system date is assumed. |
|            |         |        | The command processor also supports using the name of an LSAM Dynamic Variable in this  field.                        |
| OPCONJOB   | 1       | \*CHAR  | Y=yes (default), N=no. Set this parameter to Y when the SCANSPLF command will be used in an OpCon scheduled job. Set this parameter to N when the command will be used from IBM i command entry or called by a job originating outside of OpCon.                    |
|            |         |        | This parameter tells the SCANSPLF command whether to send completion messages to OpCon. These messages cannot be used outside of the LSAM-to-OpCon interface.  |
| PARAMETERS | 1024    | *CHAR  | The entire value string must be enclosed in a pair of single quotes. Each scan value is separated by the colon (:) character. The  number of value strings provided with this keyword must equal the number of SPLF Scan Rules registered using the LSAM menu 3, function 4, that have *PARM specified     for their Scan Value. There can be up to 16 parameters in this string. |
|            |          |       | It is possible to include a colon character as part of a scan value if the scan value is enclosed in single quotes. (To include single quotes within the entire PARAMETERS value string type two single quotes together.)  |
|            |           |      | It is also possible to include a single quote within a scan value by enclosing the scan value within single quotes and by doubling (again) the enclosed single quote. However, this means that the single quotes would have to be twice doubled, since they would be nested at a third level, so this would be difficult to specify correctly. Experimentation may be required to achieve the desired result. |
|            |           |      | Special values that may be used to indicate a scan value should be bypassed during a given execution of the command may be registered in the LSAM SPLF Scan rules. In the command syntax shown above, the value '*empty*' is used as an  example of a possible scan value bypass value.   |
|            |           |      | The command processor also supports using the name of an LSAM Dynamic Variable in this field. |
|            |           |      | Refer to Utility Screens and  Windows, later in this topic, for more information about SPLF Scan Rules.         |
| JOBNBR     | 28 (30) | \*CHAR | To direct the SCANSPLF to  find a specific job, type the IBM i job number (6 digits) for this keyword value. If this optional parameter value is not specified, the SCANSPLF command will search for the latest (most recent) incidence of the Job Name specified in the LSAM SCANSPLF Application master record.                       |
|            |           |      | It is also possible to specify any or all of the three parts of an IBM i job  ID by including one or two forward slash characters. To do this, the value must be enclosed within single quotes in order to get the IBM i command processor to accect the slashes as part of the job ID character string.|
|            |           |      | To specify a whole IBM i job ID, it is only necessary to provide the 6-digit job number because this number implies the user name and the job name.                     |
|            |           |      | When specifying a user and/or job name without using a specific job number, type one or two slashes using one of the following models:         |
|            |           |      |    -   User only = '/username' |
|            |           |      |    -   Job name only = '//jobname'             |
|            |           |      |    -   User and job name =  '/username/jobname'     |
|            |           |      | The command processor also supports using the name of an LSAM Dynamic Variable in this field.   |
| FAILOPT    | 1       | *CHAR | Controls the final completion status of the SCANSPLF command, affecting also the final status of a submitted job (such as jobs submitted by OpCon) when the SCANSPLF command is the only step in the job. Possible values include:                          |
|            |           |      | -   1 = force abnormal end when ANY required scan rule was NOT matched (ANY FAIL)        |
|            |           |      | -   2 = force abnormal end when ANY required scan rules DO match (ANY PASS)              |
|            |           |      | -   3 = force normal end regardless of scan rule match outcome                       |
|            |           |      | -   4 = force abnormal termination when ALL required scan rules are NOT matched (ALL FAIL) |
|            |           |      | -   5 = force abnormal termination when ALL required scan rules DO match (ALL PASS)                         |
| SPLF       | 10        | *CHAR | Spool file name to scan:   |
|            |           |      | The *APP special value indicates that one or more spool files registered to the APPlication in the Scan Rules will be the spool file names to find and scan. |
|            |           |      | To limit the scan task to only one spool file name, such as when more than one SPLF was registered to the same APP, type the full name of the spool file in this field.                        |
|            |           |      | The command processor also supports using the name of an LSAM Dynamic Variable in this field.                        |
| SPLNBR     | 10      | *CHAR | Spool file number to scan:     |
|            |           |      | The *APP special value indicates that the APPlication Scan Rules will the limits on which spool file number (of a job) to find and scan. |
|            |           |      | If the Scan Rules specify *ANY for the spool file number, this parameter can be used to limit the current task to any of the following values that IBM i spool file commands will support:        |
|            |           |      | 1 - 999999, *ONLY, *LAST, *ANY                         |
|            |           |      | The command processor also supports using the name of an LSAM Dynamic Variable in this field.                        |
| USRDTA     | 10      | *CHAR | This field can be used to limit the spool file selected for scanning by its user data value.                        |
|            |           |      | The special value of *ALL means to accept a spool file without checking the user data value assigned to it.    |
|            |           |      | The command processor also supports using the name of an LSAM Dynamic Variable in this field.                        |
| CMDMODE    | 10      | *CHAR | This parameter is intended for LSAM internal user only. 
|            |           |      |***CMD** = The SCANSPLF command is being used alone, such as execution from IBM i interactive command entry or as a step in a batch job.|
|            |           |      | ***JORS** = The SCANSPLF command was specified as an extension to the OpCon job master Call command line for the IBM i job. The job's job log spool file will be scanned to determine the final completion status of the job that is reported to OpCon SAM.                          |
| USRDFNDTA  | 256     | *CHAR | Use single quotes to enclose a string of data that should match the User Defined Data attributed of spool files that qualify for the command to process.|
|            |          |  | '*GENERIC*'                   |
|            |          |  | Generic, or partial, values may be used. Type an asterisk at the beginning to indicate that any number of characters (or no characters) may precede the matching string. Type an asterisk at the end to indicate that any number of characters (or no characters) may follow the matching string. Either or both of the asterisks may be used.  |
|            |          |  | If no asterisks are typed, then the character string in this parameter must match exactly and completely the User Defined Data attribute of a spool file.        |
|            |          |  | NOTE: The single character wild card value of a question mark '?' is NOT supported by this command.                          |
| JOBLOGMSG  | 1       | *CHAR | **Y** = Yes: Add a message to the SCANSPLF job's IBM i Job Log, whenever a progress or error log entry is being added to the LSAM's Captured Data Debug Log file.                             |
|            |         |   | **Blank or 'N'** = No: Do NOT add messages to the IBM i Job Log. Progress and error messages will only be written to the LSAM log file.  |
| SCANCOND  | 1       | *CHAR |Used only by the LSAM Job Scheduler to control when a SCANSPLF command that was appended to the OpCon job's IBM i CALL command line should execute the SCANSPLF command (if present) to override the Pass/Fail job status report.|
|            |         |   | **O** = Only run the SCANSPLF command (if present) when the IBM i job Finished OK.  |
|            |         |   | **F** = Only run the SCANSPLF command (if present) when the IBM i job Failed.  |
|            |         |   | **B** = Always run the SCANSPLF command (if present) regardless of the actual IBM i job completion status.  |
| INT_ONLY_  | 0       | (NULL) | Ignore this displayed parameter keyword. This command keyword is used only by the SCANSPLF command processor program to receive IBM i internal address values that are sent from the SCANOUTQ command (and other LSAM programs) to improve the efficiency of the command.                          |

## Case Examples of SCANSPLF Applications

This discussion extends the How-To down to real applications of the SPLF Scan Rules fields and the Captured Data Response Rules fields. The field descriptions for the Scan Rules and the Capture Data Rules maintenance, listed below in the Screens and Windows section, combine to form different modes of operation for the SCANSPLF command. Various applications of the SCANSPLF command are explained in the context of the following example implementation cases.

### Using the SCANSPLF PARAMETERS Keyword

The original application of the SCANSPLF command was as a tool for automating the balancing functions of a financial institution. OpCon and the IBM i LSAM can be used to fully automate the process of posting transaction batches that originate from systems and networks outside of IBM i. After the transaction batches are posted, the control totals from the outside source are compared to the totals produced by the IBM i batch posting programs. Without OpCon, this balancing process requires some hours of operator time and the process is frequently subject to human error. The SCANSPLF command reduces the process to just seconds and improves accuracy to 100%.

For the application of financial report balancing, the control totals from an outside source are assembled into a character string inside the PARAMETERS keyword of the SCANSPLF command. A typical balancing function includes four numeric totals: debit item count, debit total amount, credit item count, credit total amount. The control totals input parameter string looks like the example below, taking into account the following exception.

In many cases, the editing of numeric fields with commas, a currency sign and a decimal point is inconsistent between the outside source and the IBM i batch posting report. This is why the Scan Rules support an option to compress numeric values. The result of numeric compression is that only digits appear in the PARAMETERS character string. The number of decimal positions must be assumed for each individual parameter, typically no decimal positions for an item count and two decimal
positions for an amount total (in US dollars).

Example control totals:

- Debit item count = 385
- Debit total amount = $ 13,719.22 (<u>the space between the $ and the 1 is intentional</u>)
- Credit item count = 296
- Credit total amount = $ 13,719.22

Here is the command string configured to manage the control totals from a batch of transactions received in an MS Windows server or workstation. A step in an OpCon Schedule is responsible for extracting the control totals and storing them into OpCon properties.
```
SCANSPLF APP('ACH-A') PARAMETERS('385:1371922:296:1371922') FAILOPT(1)

- or -

SCANSPLF APPKEY(12) PARAMETERS('385:1371922:296:1371922') FAILOPT(1)
```
Notice how the numeric data has been compressed into only the digits. The entire PARAMETERS string must be enclosed in a pair of single quotes. The FAILOPT (fail option) has been set to (1), indicating that the SCANSPLF command should end abnormally if any of the input parameters are not found to match, or end normally if all the input parameters do match.

When the example SCANSPLF command, above, is registered in an OpCon Job master record, the four control totals values will be represented by OpCon property tokens.  Here is a representation of how the actual OpCon Job command line might look when the OpCon Properties are inserted:
```
SCANSPLF APPKEY(12) PARAMETERS('[[DRCNT]]:[[DRAMT]]:[[CRCNT]]:[[CRAMT]]') FAILOPT(1)
```

Before examining the LSAM SPLF Scan Rules required to support this form of the SCANSPLF command, consider that sometimes the item count might not be available from the source, a transaction batch file that contains the control totals. In that case, a convention must be established for signaling that on any given day, one input parameter might not be available and so it should not be used to complete the balancing function. The MS Windows administrator who manages the task of extrating the control totals from the batch file comes to agreement with the IBM i LSAM Administrator that a special value of **\*empty\*** will be used as a place-holder whenever any of the four expected input parameter values is not available. If no credit item count is available, the command string looks like this (after the OpCon Property tokens are replaced, just before the command is submitted by OpCon for processing by the IBM i Agent):
```
SCANSPLF APP('ACH-A') PARAMETERS('385:1371922:*empty*:1371922') FAILOPT(1)

- or -

SCANSPLF APPKEY(12) PARAMETERS('385:1371922:*empty*:1371922') FAILOPT(1)
```

To process this SCANSPLF that will be executed in an IBM i job submitted from an OpCon schedule, the LSAM master files must be configured as follows.

First, an Application ID must be defined. The APPKEY value of the new Application ID is generated by the IBM i Agent maintenance program that is used to register the new Application ID. In the example above, the APPKEY value of 12 is the key linked to a short application ID of: ACH-A. In the LSAM Scan Rules maintenance function (LSAM menu 3, option 4), the name of the IBM i job that runs to post the transaction batch and the name of the batch balancing report spool file produced by this job are the key fields that can group together the four Scan Rules (that are part of this example balancing job). For this example, the job name will be POSTACHA and the spool file name will be QSYSPRT.

After the application ID is registered, it is then possible to create the four SPLF Scan Rules required to match each of the SCANSPLF input PARAMETERS. This discussion cannot anticipate how the report totals will be recognized, so an assumption will be made that the last page of the QSYSPRT report will look like this:

##### Example Financial Report Final Page
```
DEBIT COUNT:     385
DEBIT TOTAL:  $     13,719.22
CREDIT COUNT:    296
CREDIT TOTAL: $     13,718.46     * OUT OF BALANCE *
```
Assuming that there may be General Ledger account sub-totals throughout the report, it is important that the Scan Rules be defined so that scanning for the totals fields labels starts from the end of the report. It is possible that the correct totals could be found by counting the number of incidences of each totals label starting from the beginning of the report. But if it is not possible to guarantee how many different sub-totals will appear in the report, then the only reliable option is to start scanning from the end of the report.

According to this definition of the report, these are the required values for each of the four SPLF Scan Rules in the LSAM database:

- **Application**: ACH-A, is assigned the permanent APPKEY numeric value of 000000012 (or simply 12).

- **Rule sequence**: 10, 20, 30, 40 (one for each rule; the sequence numbers could be 1, 2, 3, 4, up to 999). Rule sequence numbers must be unique within an Application, even if different SPLF names are included within one Application.

- **SPLF name**: QSYSPRT

- **Job name**: POSTACHA

- **SPLF number**: \*ANY (this could be a specific number, if job POSTACHA creates more than one report called QSYSPRT)

- **From/To page**: \*END \*END (notice that the From-page is not \*STR or 1, but \*END, to cause the scan job to start reading from the end of the report for each rule)

- **Start scan label**: DEBIT COUNT (for the first rule, and for the other 3, use the labels shown above)

- **Scan label length**: (leave at zero, but each label could be measured, so the sizes would be 11, 11, 12, 12)

- **Position after label**: (leave set to zeros so that the first non-blank character starts the value scan)

- **(Scan) Value**: \*PARM (the special value \*PARM is required for this application, telling the scan job to use the input PARAMETERS values supplied by the SCANSPLF command)

- **Scan value length**: (leave the zeros for the item counts, but use a length of 16 for each of the total amounts in order to get past the $ sign and include all the numbers of the amount)

- **Bypass parm value**: \*empty\*

- **Bypass value length**: 7 (optional)

- **Compress numeric**: Y (This must be set to Y for the totals amounts fields in order to ignore the spaces and $ sign, which are inconsistent with the original format of the total amounts supplied by the transaction source. The item counts could ignore numeric compression, but to assure a valid numeric comparison, it is a good idea to use the compress option for all four parameters in this case.)

- **Required rule**: Y (A value of Y= yes is required whenever the Scan value is \*PARM because this tells the scan program to consider each of the rules in the final pass/fail decision at the end of the program.)

When the SCANSPLF command is executed in this example it is expected to end abnormally. This is caused by the obvious out of balance condition appearing in the sample report page. The total credit amount in the report does not match the total amount submitted by the SCANSPLF command. The FAILOPT(1) parameter of the SCANSPLF command tells the scan program to force an abnormal end to the execution of the SCANSPLF command when any parameter is not matched. This causes the OpCon schedule to show a failed balancing job.

When the OpCon job definition includes response events upon detection of a failed job, an operator or supervisor can be immediately signaled by any number of means, including an eMail message or a text message that gets routed to their cell phones (by outside facilities).

The IBM i LSAM SCANSPLF command includes a feature of reporting its scan rule match results to the OpCon Job Configuration window. Job Detail Messages list the exact values that were mismatched. The OpCon operator can use a right mouse click on the OpCon job line to access (as in OpCon User Interface): Job Information -\> Configuration tab -\> Operations Related Information -\> (+) Job Detail Messages, and instantly the problem of the credit total amount being out of balance will become visible. This makes it possible for the financial institution's staff to learn nearly instantly about the out of balance condition and to jump directly to the cause of the problem without having to find and study the actual balancing report to look for report totals.

### Using the SCANSPLF Fail Option 2

The previous example explained how the SCANSPLF command can be used to cause a failed job to appear in an OpCon schedule whenever the  supplied PARAMETERS values are not all matched in an IBM i spooled report file. It is also possible to make a failed job show in an OpCon schedule when there is a match for a Scan Rule, but end normally when there is no match.

An example of this application is found at a site where there is a long IBM i Control Language program that executes multiple sub-program calls. No matter what happens to the sub-programs, the long CL program always ends normally. Due to the inaccessibility of the third-party software program source code, the site cannot easily use OpCon and the IBM i LSAM to monitor each sub-program of the big job. But the OpCon schedule must not be allowed to continue until it can be verified that
no steps in the big job have actually failed.

In this example situation, one solution is to use the SCANSPLF command to scan the job log report that is produced by the job running the big CL program. In the job log report, there will be an error message with a severity code of 40 any time one of the sub-programs has failed. Without the SCANSPLF tool, the IBM i system operator had to find the job log report and manually read through all the pages of the report, looking for any severity code of 40. Not only did this take a long time but it was obviously subject to oversight on the part of the operator. Using the SCANSPLF command provided nearly instant results and also improved the accuracy of the search to 100%. As a result, on most days when there was no problem, the OpCon schedule was allowed to continue with almost no delay.

To implement the SCANSPLF command for this application, the OpCon Call command line within the IBM i job was modified to include the IBM i special separator character (a pipe character: \| ) after the main Call command syntax, and then the SCANSPLF command with its parameters was added to the Call command line.

As documented in IBM i LSAM Configuration, under the Extended Discussion section, inserting the user-defined special character (typically a vertical pipe character: \| ) after the primary command signals the IBM i LSAM job scheduler that additional job parameters may follow, and that the LSAM should look for a SCANSPLF command at the end of the line. When the SCANSPLF command is found, the LSAM sets up special controls so that whenever it detects that the original IBM i job has completed normally,
it will not report the job completion status to OpCon SAM until after the SCANSPLF command has been used to survey the job log report that was produced by the job. Then, the results of the SCANSPLF command will be used to report the final job completion status to OpCon SAM. (The scan of the job log will not be conducted if the actual IBM i job failed.)

In this case, there is no input data that must be provided by the SCANSPLF command for comparison to the report content, although the SCANSPLF PARAMETERS keyword could have been used as one optional way to define this task. Instead of an input parameter string, the PARAMETERS keyword was specified with its special value of \*RULES, meaning that the Scan Rules in the LSAM database are all that is needed to define the scan task.

One of the key ingredients for this solution is to set the FAILOPT parameter of the SCANSPLF command to (2), so that the command will report a failure if the Scan Rule (finding an error message) is matched, but it will report normal termination if the Scan Rule is not matched. So the command syntax for the SCANSPLF job looks like this:
```
SCANSPLF APPKEY(13) PARAMETERS('*RULES') FAILOPT(2)
```
Note that the \*RULES special value for PARAMETERS must still be enclosed in a pair of single quotes, and of course the FAILOPT is set to a value of (2).

This application is defined in the IBM i LSAM database with any name, assigned to the APPKEY numeric value of 12, and for this example the job name will be BIGCLJOB. In all cases, the report spool file that contains the job log information will be called QPJOBLOG. So these are the three key parameter values required to define the SCANSPLF Scan Rules using the LSAM menu 3, option 4.

Here is an example of a segment of a fake job log report showing how it appears just after a heading line, where the target severity code will be found:

##### Example of QPJOBLOG Report Spool File
```
*...+....1....+....2....+....3....+....4....+....5....+....6....+....7.
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
```
Only one SPLF Scan Rule is required for this application. A rule must be defined that will discover the message severity code of 40 on any line of the job log report. The IBM i QPJOBLOG report always lists message severity codes in columns 36 - 37 of the report, and since there is very little other data (only heading data) that will appear in these columns of the report, it is easy to define the scan rule. The following SPFL Scan Rule field values include some extras that will be added in this
case in order to make the results of the SCANSPLF job more useful to the operators whenever a sub-program error is found. The extra data is explained below, along with an example of how to use Captured Data Response rules.

- **APPKEY**: 000000013

- **Rule sequence**: 10

- **SPLF name**: QPJOBLOG

- **Job name**: BIGCLJOB

- **SPLF number**: \*ANY (there is only one job log report per job)

- **From/To page**: \*STR \*END (the whole report will be searched from top to bottom)

- **From/To position**: 36 37 (the report QPJOBLOG is known to always put the message severity code into columns 36-37 on a report line, and the string of '40' will never appear on any other line of a QPJOBLOG report in these positions)

- **Start scan label**: 40 (the Scan Label is used to find the first incidence of a severity code 40; the scan value field will be used for a different purpose in this example)

- **Scan label length**: 2 (could be left as zero, or specify 2)

- **Position after label**: -1 (Use this value to find the actual error message that will appear in column 1 of the report line, BEFORE the scan label. A specific Positive column count could also be used in this case, but it's just easier to enter -1 and not have to count the columns.)

- **(Scan) Value**: \*CAPT (the special value \*CAPT is being illustrated in this example, even though it is not required for the simple purpose of reacting to the discovery of a severity code 40)

- **Scan value length**: 7 (this example shows how 7 characters will be captured from the beginning of the report line where severity code 40 is found, so that the actual error message ID can be used by a Captured Data Response rule)

- **Compress numeric**: N (It is important that the default value of N = no be used in this example.)

- **Required rule**: Y (A value of Y= yes is required in this case in order to trigger the SCANSPLF logic that will report a pass or fail based on a required match or no-match to this Scan Rule.)

There is more than one way this scan could have been effectively defined, producing the same pass/fail result. For example, instead of using the scan label, the scan value could have been specified, but this option was ignored in order to allow for the Captured Data Response rule option that is defined below. Similarly, if the capture option were not desired, the \*PARM scan value could have been used and the string of '40' could have been specified in the SCANSPLF PARAMETERS keyword.

Another aspect of this example to consider is how the From/To position (col) values are used. If a scan label is not specified, then the From/To position values are used to control which columns of the report line are searched for the scan value. But when a scan label is specified, then the From/To position fields are dedicated to isolating the scan label only. The scan value is not constrained by the From/To position fields when a scan label is used because the field "Position after label" and the Scan value length are used instead to locate the scan (or capture) value itself.

The captured data definitions provided above have nothing to do with the original intention of this example task. If the only goal is to cause a job on an OpCon schedule to fail whenever a severity code of 40 is found in a job log report, then it would be sufficient to use any of the three methods described above to scan for this string. The fact that the "Require rule" flag is set to Y = yes triggers the SCANSPLF overall result, and that result is interpreted according to the setting of the FAILOPT parameter in the SCANSPLF command.

This task example without the captured data element illustrates how it is possible to safely allow the remaining OpCon schedule to continue whenever no severity codes of 40 are found in the BIGCLJOB job log. When no error is found, the OpCon schedule completes quickly without having to wait for an operator to manually examine the job log report. However, when a severity of 40 is found, then maybe an operator's intervention will be required to evaluate the point of failure and
decide how to recover.

Even if an error is intercepted, the SCANSPLF Scan Rules, the Captured Data Response Rules and some utilities associated with this command can be used to simply the operator's analysis and speed up the process of discovering the point of failure. Often, a self-repairing procedure can be created in OpCon. In response to the error condition it is possible to initiate a new schedule and add jobs to it so that the error condition, if recognized, can be corrected and then normal processing
can be automatically resumed.

#### Finding Scan Values in a Report

For the SCANSPLF command, all matched Scan Rules have their scan values stored in the LSAM's Captured Data Log file. The contents of this file may be viewed using the LSAM menu 3, option 8. This file also contains data that may be captured from other Agent automation tools. But by default, when the log viewer program is started from the LSAM menu 3, the list is limited by a subset rule to only data captured by the SCANSPLF command. (Use F15=Subset to change the subset rule in effect for the list display.)

Each Scan value in the Captured Data Log file is labeled with the report page, line and column where the data was found. This means that in the example application above for scanning the QPJOBLOG report, the location of the failing sub-program could be found very quickly if the operator would use the Captured Data Log file viewer to find this SCANSPLF Application (labeled as the Capture ID on the list display), and then find the record(s) associated with the correct date and time.

The primary purpose of the example QPJOBLOG application described above was to report a failed job on an OpCon schedule if any severity code of 40 is found. The single Scan Rule described above finds only the first instance of a severity 40 code. But it could be equally important to find ALL of the severity 40 codes that appear in the job log report. To make sure all errors are found and reported, more than one Scan Rule could be specified for this Application. Only the first Scan Rule needs to be marked as required (Required rule = Y). To find more similar codes, an estimated number of additional Scan Rules could be created based on the greatest number of severity 40 codes that might ever be expected. Each of the additional Scan Rules would be marked as not required. Each of the additional Scan Rules would use the Start Scan Label to find the string '40' in From/To positions 36-37, but each succeeding Scan Rule would have a higher Incidence count. The additional
Scan Rules would be numbered with an Incidence count of 2 and higher. If only 2 severity codes were found, then the remaining Scan Rules would be ignored and they would not affect the outcome of the SCANSPLF job.

Using the LSAM menu function to view the Captured Data Log file, each severity 40 code that was found could be quickly located by the report page and line. This would make the process of analyzing all the points of failure more efficient. As well, each found severity 40 code could trigger another Captured Data Response Rule in order to initiate automated reporting and recovery procedures.

Additional assistance could be provided to the application operator for every severity 40 code was found if each of the Scan Rules would specify the same \*CAPT option in the Scan value field. Using the Position after label value of (-1) and a Scan value length of 7, the CPF message ID for each severity 40 error would become the actual captured data that appears in the Captured Data Log file. This ability to capture and report data associated with a severity 40 error code could be extended even farther, as described next.

#### Using Captured Data Response Rules

In the Scan Rule defined above for the example BIGCLJOB the special value of \*CAPT was specified in the Scan Value field. As mentioned just above, every matched Scan Value is logged into the LSAM's Captured Data Log file. Instead of just logging the severity 40 error code, the Scan Rule was constructed so that the severity 40 code was found as a Scan label, leaving the Scan Value field free for capturing any helpful data related to the severity 40 code. In the example above, it is proposed that it might be helpful to capture and share the CPF message ID that describes each severity 40 error code. (Additional Scan Rules, set as "not required," could be created for the purpose of capturing other data elements from the same report line.)

In addition to the Captured Data Log file viewer, the LSAM offers more tools that can be used to respond to any matched Scan Rule, based on the Captured Data Log record. On LSAM menu 3, option 5 supports entry of one or more Captured Data Response Rules (described in the Screens and Windows section below) that can be linked to each Scan Rule.

A Response Rule will not be executed unless the Scan Rule qualifies as matched. In the example application described here, Response Rules could be used to communicate the captured CPF message ID for each severity 40 error code that is found to OpCon where the CPF message ID can be stored as a Job Detail Message associated with the OpCon job.

This section explains how to make that happen. It describes how to combine these LSAM features:

- Captured Data Response Rule
- Storing captured data in an LSAM Dynamic Variable
- Using the LSAM's SAMJOBMSG command to communicate with OpCon, using the value in the Dynamic Variable

The reason for sending Job Detail Messages to OpCon is that it is very easy for an OpCon operator to find the Job Detail Messages. This is done, for example, by using a right mouse click on the job, such as it may appear in a list of jobs for an OpCon schedule. The right mouse context menu that appears in OpCon User Interface offers access to Job Information. When that is selected, a window opens with tabs that can be navigated as follows: Configuration tab -\> Operations Related Information -\> (+) Job Detail Messages. Job Detail Messages that can be sent by the IBM i LSAM will appear here. It would probably be very helpful to an operator to get an immediate list of any/all CPF message IDs that are associated with the severity 40 error codes found by the SCANSPLF job. The operator would be automatically signaled that the SCANSPLF job has failed, and then the CPF message IDs - or any other information captured and sent by the LSAM - would be just a mouse click
away. 

To deliver Job Detail Messages to OpCon, there is an LSAM command called SMAJOBMSG. This command is only valid for use within a job that was started by OpCon, such as the job executing the SCANSPLF command. The SMAJOBMSG command can be used to send the CPF message IDs to the OpCon Job Detail Messages. A Captured Data Response Rule that executes when a severity 40 error code is found can name the SMAJOBMSG command in its response command line. The Captured Data Response Rule command line supports LSAM Dynamic Variables, so if the CPF message ID was stored as a Dynamic Variable, it could be inserted into the SMAJOBMSG text parameter. Fortunately, the Captured Data Response Rule also has the option of naming a Dynamic Variable in which to store the captured data, and the module that executes the Captured Data Response Rule always performs the storage of captured data to variables before it attempts to execute the response command. Following is more detail about how to set
up this link between the LSAM and OpCon. 

The link between the scanning process and OpCon is defined in the Captured Data Response Rule master record. Here is a list of the fields in that file showing the settings required to complete the example task. The field values listed here are based on the example SPLF Scan Rule described above.

- **Application Key / ID**: 000000013  ERR2

- **Capture sequence**: 10 (if there are additional scan rules, use the correct sequence number for each in separate Response Rules)

- **Response sequence**: 10 (multiple Response Rules can be assigned to the same APPKEY and Capture Sequence; this Response Sequence number governs the order in which response rules are executed)

- **Compare rule**: EQ (this example does not qualify the response rule, so it is set up as "equal to \*ANY compare data")

- **Continuation**: (blank) (not used in this example)

- **Compress numeric**: N (= no; no comparison is being done, so this field does not apply)

- **Dynamic variable**: CPFERR1 (this will be the name of the Dynamic Variable into which the response rule program will store the CPF message ID)

- **Operator Replay variable**: (blanks) (not used in this example)

- **Response command**:
  ```
  SMAJOBMSG TEXT('Found error ID is: {CPFERR1} ') MSGSEQ(0)
  ```
  - Notice that the Dynamic Variable name is inserted into the TEXT parameter surrounded by the pair of curly brackets { }, which are the default separators for Dynamic Variables. The MSGSEQ must be unique within any one job, so if other Captured Data Rules also use the SAMJOBMSG command, each rule must get a unique number for the MSGSEQ, preferably in order of their execution. 
  
  :::tip 
  Leaving the MSGSEQ parameter set to zero, its defaut value, tells OpCon to automatically assign a unique number to each separate Job Detail message, avoiding overlaying any previous message that was sent.
  :::

- **Compare data**: \*ANY (this rule is not qualified by any comparison to thecaptured value)

#### FAILOPT(2) Example Summary

The Captured Data Response Rule defined above will only execute if the example SPLF Scan Rule in the defined previous paragraphs finds a match. For the overall example of the BIGCLJOB defined in this section, here is a summary of the actions that take place, in order of execution:

- In this example, the matching process is based on finding the scan label, which is any severity 40 error code in a job log report. The scan label in the scan rule record is used instead of the PARAMETERS keyword of the SCANSPLF command.
- If the scan program finds no code 40 in the job log report the whole process ends and the FAILOPT parameter of the SCANSPLF command causes the job to end normally. The remaining jobs that depended on the BIGCLJOB are immediately allowed to execute.
- When the scan program finds a code 40, the scan rule then finds and stores the CPF message ID on that line of the report.
- Next, the scan program calls the response rule module, and that module finds the Captured Data Response Rule defined above.
- The response rule stores the captured data into an LSAM Dynamic Variable.
- The response rule replaces the Dynamic Variable token in the response command with the latest value for that variable, which in this case is the CPF message ID.
- The response rule program executes the revised response command, causing a Job Detail Message to be sent through the LSAM communications channel to the OpCon SAM, and the message is logged to the current job.
- Since there is only one scan rule and one response rule, after they are processed the SCANSPLF command program is finished. According to the FAILOPT parameter of the SCANSPLF command, finding a match on the scan rule means that the job should be forced to end abnormally.
- The OpCon operator sees that the LSAM has signaled a failure for the OpCon job. The operator views the Job Configuration information     about that job and finds the Job Detail Message sent by the LSAM.
- Perhaps the OpCon operator contacts the IBM i operator and reports that it will be necessary to examine the BIGCLJOB job log to analyze why there was a failure.
- The IBM i operator uses the LSAM menu system's viewer of the Captured Data Log to locate the captured data for the last execution of the BIGCLJOB job and finds the exact page and line of the job log where the error was reported.
- The IBM i operator is able to use an IBM i tool to open and view the BIGCLJOB job log report and position the viewer to the correct page and line, from which point the preceding messages are studied to learn the cause of the failure.
- Optionally, the OpCon operator could have used the View Output function, available on the right mouse click context menu associated with the BIGCLJOB, to request a view of the job log. This view of the job log is not as easy to position as when an IBM i spool file viewer is used, but it is possible to scan for the CPF message ID and quickly locate the correct place in the job log where the error may be studied.

The last few summary steps above assume that the error condition is unique and requires human operator intervention. However, in cases where error conditions might be somewhat common, it could make sense to construct IBM i LSAM and OpCon configurations that would insert a self-healing and recovery procedure into the daily processing so that after the error has been documented, normal processing would be resumed automatically.

## The SCANOUTQ Utility

The purpose of the SCANOUTQ command is to search among spool files found in a single IBM i output queue and then to execute the SCANSPLF command for each spool file that qualifies, according to the SCANOUTQ command parameters and the Scan Rules of the named Application.

SCANOUTQ is not limited in the number of spool files it qualifies for scanning, except by the selection rules of the SCANOUTQ command and by the number of different spool file + job name combinations that have been registered under the Application. The documented limits of the SCANSPLF command above do not apply in terms of how many different spool files and job names may be included in the same Application, because when the SCANOUTQ command calls the SCANSPLF command, it has already selected just one spool file and one job. Thus, out of all the Scan Rules registered to the Application, only the Scan Rules that match the selected spool file name will be loaded into the SCANSPLF command processor.

The PARAMETERS keyword of the SCANOUTQ command is supported so that its value can be passed along to each execution of the SCANSPLF command. That is, if a PARAMETERS string value is provided instead of using the default value of *RULES, then that set of PARAMETERS must be matched by each execution of the SCANSPLF according to the rules of the SCANSPLF command, documented above.

It may be important to note that there are four parameters of the SCANOUTQ command that can be used to temporarily store the IBM i job ID and the spool file number of each spool file selected for processing. These parameters support entry of the name of an LSAM Dynamic Variable (**without** the special characters that make a Dynamic Variable into a replaceable token). The SCANOUTQ command stores values into one or more of these Dynamic Variables so that they are available to any captured data response rules that are linked to the Scan Rules for a spool file. This makes it possible to perform extended processing of spool files found in an output queue, such as creating an application to re-route or delete spool files that meet certain selection criteria. Refer to the example application for the SCANOUTQ command, below, to
learn how these Dynamic Variable parameters can be used. 

Since the SCANOUTQ command is a driver to select spool files to be scanned by the SCANSPLF command, then the functions of this SCANOUTQ command can be understood by studying the syntax and the parameter fields table that follows.

:::tip
It is not possible to use the SCANOUTQ command in an OpCon IBM i job master record as an extension to the Call command line, as with SCANSPLF. However, the SCANOUTQ command can be executed by a separate IBM i batch job in an OpCon schedule.
:::

### SCANOUTQ Command Syntax

The SCANOUTQ command entered in an IBM i command line, either from IBM i or from the Call information in an IBM i job on an OpCon schedule, requires the syntax illustrated in the following example:
:::info Example
```
SCANOUTQ OUTQ(MYLIB/MYOUTQ)
   APP(*APPKEY)
   APPKEY(14)
   DATE(20130301) DATECOMP(EQ)
   OPCONJOB(N) FAILOUTQ(3) FAILSPLF(3)
   PARAMETERS('*RULES') JOBNAME( ) USER(*ALL)
   SPLF(MYREPORT) USRDTA(*ALL) FORMTYPE(*ALL)
   DVSPLNBR(THISSPLNBR) DVJOBNBR(THISJOBNBR)
   DVJOBUSR(THISJOBUSR) DVJOBNAM(THISJOBNAM) NOSPLFOPT(1)
   USRDFNDTA(*ALL)
```
:::

The individual keywords are explained in a table following the screen illustration below of this command prompted using function key <**F4**> from IBM i command entry. Notice, above, that the APP and PARAMETERS keyword values are enclosed in single quotes. These are required in order to communicate space characters, numeric digits and
special characters as part of a single character string to the command processor program.

The SCANOUTQ parameter values that are the same as those supported by the SCANSPLF command are explained in more detail above, under the discussion and the table of fields for the SCANSPLF command.

##### Fields


| Keyword    | Size    | Type   | Description                       |
| -------    | ----    | ----   | -----------                       |
| OUTQ       | 10 + 10 | *CHAR | The output queue name, followed by the library location of the output queue. If the special value *LIBL is used for the location of the output queue, then the queue must be found in the library list of the job where the SCANOUTQ command is executing.                        |
| APP        | 30      | \*CHAR  | This field is carried over from previous versions of this command, and it no longer serves as a reliable identifying key to a collection of Spool File Scan Rules, though it may still be used.  The recommended and most reliable way to identify a SCANSPLF Application is to use the permanently assigned Application Key number (APPKEY).  Therefore, it is recommended to leave this field set to its default value of *APPKEY (or do not specify the APP() keyword), and to convert existing automation applications of the SCANSPLF tool to use the new APPKEY instead of the Appplication ID (which is now only descriptive text that could be changed at any time.)  But, when this value is used, it will take priority over the APPKEY value (in order to grandfather-in SCANSPLF command implementations from past versions of the LSAM), and it must be enclosed in single quotes. Type up to 30 characters. Upper and lower case letters, numeric digits and special characters are allowed - the value is case-sensitive. This value, when used, must match an Application ID that has been registered using the LSAM Menu 3, function 3. |
| APPKEY     | 9.0    | \*DEC   | The permanent identifying key of any Data Capture Application (which is a collection of Data Capture Rules). SMA strongly recommends always specifying the APPKEY value instead of using the Application ID (APP) text string to identify the Application for this command.  The APPKEY can be found in the list display of "Work with SCANSPLF Applications" at LSAM menu 3, option 3. |
| DATE       | 8.0     | *DEC  | Optionally, specify a date in CCYYMMDD format, to identify the processing date of the target spool file. This value limits the list of jobs that the SCANOUTQ command will search for the spool file.    |
|            |         |       | The command processor also supports using the name of an LSAM Dynamic Variable in this field.                        |
| DATECOMP   | 2       | *CHAR | Include spool files with this relationship to the DATE value specified:              |
|            |         |       | **LT** = less than                   |
|            |         |       | **LE** = less than or equal to       |
|            |         |       | **EQ** = equal (the default value) |
|            |         |       | **GE** = greater than or equal to    |
|            |         |       | **GT** = greater than                |
|            |         |       | For purposes of date comparison, the time values of 00:00:00 and 23:59:59 are used for the first and last times of the day.|
| OPCONJOB   | 1       | *CHAR | **Y**=yes (default), **N**=no. Set this parameter to Y when the SCANOUTQ command will be used in an OpCon scheduled job. Set this     parameter to N when the command will be used from IBM i command entry or called by a job originating outside of OpCon.                    |
|            |         |       | This parameter tells the SCANOUTQ command whether to send completion messages to OpCon. These messages cannot be used outside of the LSAM-to-OpCon interface.  |
| FAILOUTQ   | 1       | *CHAR | Controls the final completion status of the SCANOUTQ command, based on a summary of all the SCANSPLF command completion statuses. Possible values include:                          |
|            |         |       | **1** = force abnormal end when any spool file scan command ended abnormally (ANY FAIL)   |
|            |         |       | **2** = force abnormal end when any spool file scan ends normally (ANY PASS)              |
|            |         |       | **3** = force normal end regardless of scan task outcome                                  |
|            |         |       | **4** = force abnormal end if all spool file scans end abnormally (ALL FAIL)              |
|            |         |       | **5** = force abnormal end if all spool file scans ended normally (ALL PASS)              |
| FAILSPLF   | 1       | *CHAR | Controls the final completion status of each SCANSPLF command. All SCANSPLF scan rules must work the same way for this option to be effective, because there is no other source for the SCANSPLF FAILOPT parameter. Possible values include:                   |
|            |         |       | **1** = force abnormal end when ANY required scan rule was NOT matched (ANY FAIL)|
|            |         |       | **2** = force abnormal end when ANY required scan rules DO match (ANY PASS)               |
|            |         |       | **3** = force normal end regardless of scan rule match outcome                            |
|            |         |       | **4** = force abnormal end if ALL scan rules do NOT match (ALL FAIL)                      |
|            |         |       | **5** = force abnormal end if ALL  scan rules DO match (ALL PASS)                         |
| PARAMETERS | 1024    | *CHAR | The entire value string must be enclosed in a pair of single quotes, unless the special value of *RULES (which is the default) is  used.  |
|            |         |       | The command processor also supports using the name of an LSAM Dynamic Variable in this field.                        |
|            |         |       | This value string is sent to each execution of the SCANSPLF command. Refer to the Fields table, above, for the SCANSPLF command for more information about this keyword.                      |
|            |         |       | Also refer to the [Add/Change/Copy SPLF Scan Rule](#addchangecopy-splf-scan-rule) for more information about SPLF Scan Rules.        | 
| JOBNAME    | 10      | *CHAR | This field may optionally be used to limit the spool file selected from an output queue to only the files belonging to a job of this name.        |
|            |         |       | This field may be left blank. |
|            |         |       | The job name can be an exact IBM i job name, or a partial (also called generic) job name may be specified by entering the first one or more characters of the job name followed by an asterisk: -  JOBNA\* (all job names beginning with JOBNA would match)           |
|            |         |       | The command processor also supports using the name of an LSAM Dynamic Variable in this field.   |
| USER       | 10      | *CHAR | The job user name may be used to limit the spool files selected form an output queue.           |
|            |         |       | This field should not be left blank. The default value is *ALL.                                 |
|            |         |       | The command processor also supports using the name of an LSAM Dynamic Variable in this field.   |
| SPLF       | 10      | *CHAR | Spool file name to scan:    |
|            |         |       | The \*APP special value indicates that one or more spool files registered to the APPlication in the Scan Rules will be the spool file names to find and scan.             |
|            |         |       | To limit the scan task to only one spool file name, such as when more than one SPLF was registered to the same APP, type the full name of the spool file in this field.                        |
|            |         |       | The command processor also supports using the name of an LSAM Dynamic Variable in this field.               |
| USRDTA     | 10      | *CHAR | This field can be used to limit the spool file selected for scanning by its user data     value.            |
|            |         |       | The default value of *ALL means to accept a spool file without checking the user data value assigned to it. |
|            |         |       | The command processor also supports using the name of an LSAM Dynamic Variable in this field.               |
| FORMTYPE   | 10      | *CHAR | This field may optionally be used to limit the spool files selected from an output queue to only the spool files assigned a particular form type value.       |
|            |         |       | The default value of *ALL means to accept any spool file without considering the form type.                  |
|            |         |       | The command processor also supports using the name of an LSAM Dynamic Variable in this field.                |
| DVSPLNBR   | 12      | *CHAR | The IBM i LSAM Dynamic Variable that will store the IBM i spool file number with a job. May range from 1 to 999999. If there is more than one spool file with the same name produced by one job, this number is critical for identifying the specific spool file to be processed.      |
| DVJOBNBR   | 12      | *CHAR | The IBM i LSAM Dynamic Variable that will store the IBM i unique job identifying number. Although this number always shows as six digits, it is handled as a character string. |
| DVJOBUSR   | 12      | *CHAR | The IBM i LSAM Dynamic Variable that will store the name of the IBM i User Profile for the job that produced the spool file.     |
| DVJOBNAME  | 12      | *CHAR | The IBM i LSAM Dynamic Variable that will store the name of the IBM i job that produced the spool file.                             |
| NOSPLFOPT  | 1       | *DEC  | If the outcome of the FAILOUTQ parameter does not force the SCANOUTQ job to fail, then this option governs whether the job will be forced to fail if no spool files are found that match the Scan Rules requested by this command.                 |
|            |         |       | **1** = Fail if no SPLF found (the original default behavior).                 |
|            |         |       | **0** = Do not fail if no SPLF found (useful for system clean up jobs).        |
|            |         |       | Refer to the next topic "SCANOUTQ Job Result Evaluation" for more information about the effect of this parameter.            |
| USRDFNDTA  | 256     | *CHAR | Use single quotes to enclose a string of data that should match the User Defined Data attributed of spool files that qualify for the command to process.           |
|            |         |       | '\*GENERIC\*'                   |
|            |         |       | Generic, or partial, values may be used. Type an asterisk at the beginning to indicate that any number of characters (or no characters) may precede the matching string. Type an asterisk at the end to indicate that any number of characters (or no characters) may follow the matching string. Either or both of the asterisks may be used.     |
|            |         |       | If no asterisks are typed, then the character string in this parameter must match exactly and completely the User Defined Data attribute of a spool file.        |
|            |         |       | **NOTE**: The single character wild card value of a question mark '?' is NOT supported by this command.                          |


### SCANOUTQ Job Result Evaluation

The SCANOUTQ command driver program is designed to force an abnormal termination or to allow a normal termination, depending on the setting of the two FAIL-option keywords, on the NOSPLFOPT keyword, and on the actual results of the spool file scans that are performed.

The SCANOUTQ command itself will generate its own failure conditions if there is an illogical setting of the command parameters, if system limits are exceeded by an excessively large spool file selection set, or if no spool files qualify for scanning. Otherwise, the intended function of the SCANOUTQ command is to evaluate the results of one or more SCANSPLF commands in order to determine if the command should end normally or abnormally.

When the SCANOUTQ command driver program determines that the command should end abnormally, the driver program ends with escape message code RNX9001 (the standard message from an RPG program \*PSSR subroutine that has ended at the \*CANCL exit point). This message is reported with the job termination message code CEE9901. The job detail messages shown under the OpCon Job Information context menu tabs Configuration -> Operations Related Information -> Job Detail Messages, will indicate when this error message condition is expected, or if an unexpected program error occurred.

The FAILSPLF parameter of the SCANOUTQ command is passed along to become the value of the FAILOPT parameter for each execution of the SCANSPLF command. Since there is only this one way to set the SCANSPLF parameter FAILOPT this means that all the spool file scans belonging to one SCANOUTQ Application must be configured to work the same way. It is not possible at this time for one execution of SCANOUTQ to combine different FAILTOPT values within a single job. (Hint: When different FAILOPT values are required, configure two different OpCon jobs that run separate SCANOUTQ Applications and then test the results of both jobs to create subsequent dependencies in OpCon schedules.)

The FAILOUTQ parameter of the SCANOUTQ command specifies how the SCANOUTQ job should respond based on the combination of results from one or more SCANSPLF commands. It is important to understand that the individual SCANSPLF command failures will not cause a SCANOUTQ job to fail, as they would when the SCANSPLF command is executed directly by a job. Instead, the SCANOUTQ command driver program collects the results from all the spool file scan tasks and then evaluates those results according to the FAILOUTQ option value. The possible values for the FAILOUTQ keyword are defined above in the Fields table for the command.

The NOSPLFOPT is used only when the FAILOUTQ option will not force the job to fail. If no spool files match the Scan Rules executed by a job, NOSPLFOPT(1) allows the job to fail (the former default behavior of this command). NOSPLFOPT(0) prevents a job failure when no spool files are found, and this option is useful for system clean up jobs, when it is expected that there may be no matching spool files.

### Flow Chart of SCANOUTQ Automation Strategy

The dynamic variable values that SCANOUTQ can store make it possible for the Response Rules engine to effectively manage each selected spool file. The following flow chart illustrates the flow of the SCANOUTQ process and the method used to make spool file definition values available to captured data response rules.

#### SCANOUTQ Flow Chart

![SCANOUTQ Flow Chart](../Resources/Images/IBM-i/SCANOUTQ-Flow-Chart.png "SCANOUTQ Flow Chart")

### SCANOUTQ Application Example

This example of using the SCANOUTQ command relies on the flow chart above and explains how each element of the flow chart is used. There are examples that would not need the Captured Data Response Rules, such as the report balancing example that is explained in the **IBM i LSAM** documentation. But in most cases, the Response Rules define the actions that will be performed as each Scan Rule captures some data from a report.

#### Purpose

The goal of this example application is to find each spool file that matches a certain profile, and then copy that spool file to an IBM i DB2 database file. This example does not illustrate what happens to the database file after the SCANOUTQ command completes its processing. Assuming that an OpCon schedule has requested the execution of this SCANOUTQ command, dependent jobs might subsequently be executed to copy the report data to an external system for additional processing.

In this example, the Scan Rules are utilized only as a link between the action of SCANOUTQ discovering a qualified spool file, and the desired action of the Response Rules to copy the spool file to an IBM i DB2 database file. The Scan Rules will still perform their designed action of capturing some data from the report, but the logged report data is not important in this application, so it would only serve as historical evidence in the log of the spool file that was being processed.

The example starts with some one-time configuration steps to create components that can be reused as many different spool files are processed, or as the process is repeated at some frequency such as daily.

#### Preliminary Configuration

1. An empty DB2 database physical file is created with the appropriate record length that will match the output from the IBM i command CPYSPLF. IBM i reports typically have either 80-byte or 132-byte report lines, although custom statements and letters might employ a unique report line length. The record length of the physical file in this example assumes that report line print control characters will NOT be generated by the CPYSPLF command.
  ```
  CRTPF FILE(QGPL/REPORT80) RCDLEN(80) SIZE(*NOMAX)
  ```
2. LSAM Dynamic Variables will be registered in advance, even though the SETDYNVAR command in the Response Rules (below) could create them on-the-fly. This makes it easier to prompt for the Dynamic Variable names during the configuration of the Response Rules. The LSAM menu function for maintaining Dynamic Variables, for example, option 6 on the LSAM sub-menu 3: Events and Utilities, could be used to perform this maintenance. But the SETDYNVAR command is shown here for illustration purposes. The parameters defining the Dynamic Variables are the same in either method.
  ```
  SETDYNVAR VARNAM(EXSPLNBR) VARTYP(V) DESC('Spool file Number from
  SCANOUTQ')

  SETDYNVAR VARNAM(EXJOBNBR) VARTYP(V) DESC('Spool file Job Number from
  SCANOUTQ')

  SETDYNVAR VARNAM(EXJOBUSR) VARTYP(V) DESC('Spool file Job User from
  SCANOUTQ')

  SETDYNVAR VARNAM(EXJOBNAM) VARTYP(V) DESC('Spool file Job Name from
  SCANOUTQ')
  ```
  :::tip
  The example commands above show one way to register Dynamic Variable master records.  Within the jobs of the OpCon Schedule that is used to execute this SCANOUTQ Application Example, notice below that multi-instance qualifers have been appended to these Dynamic Variable names.
  
  The use of unqualified Dynamic Variables implies that the spool file processing could handle only one spool file at a time, otherwise another job could overlay the Dynamic Variable values. Starting with LSAM version 21.1, this Agent supports multi-instance Dynamic Variables which make it possible to support multi-threaded processing of the same job definition, that is, it would be possible to have OpCon execute multiple copies of the same job or schedule (e.g., using the Schedule multi-instance qualifier?) at the same time. For more details see [Multi-Instance Dynamic Variables](/dynamic-variables/multi-instance.md#overview).
  :::

#### LSAM Scan and Response Rule Configuration for the Example

1. Create one or more Scan Rules: LSAM sub-menu 3, option 4.

    The SCANOUTQ command has only its command parameters to define how it will search for and select spool files to be processed by the SCANSPLF command. The SCANSPLF command parameters are assembled by the SCANOUTQ command processor, but some of the SCANSPLF command parameters may be allowed to depend on Scan Rules. Therefore, the LSAM master file configuration must start with creating new Scan Rules.
    
    The LSAM Scan Rules maintenance display is illustrated in the SPLF Scan Rule Example figure. The effect of this Scan Rule, itself, is only to capture the first line on the first page, up to 80 characters. This captured data is not useful for this example, but some Scan Rule must be specified to provide a link between the SCANOUTQ command and the Response Rule(s) defined below. The practice of storing some identifying information about the report being processed may prove useful in the future, in case this automation is being audited, for example, for diagnostic purposes.

    :::tip
    The Required Rule flag is set to 'N' = no. This flag is not being used in this application. This example employs the options that both the SCANOUTQ command and the SCANSPLF command should always end normally. These ending options are useful only when the report content is being compared to some reference value, and the SCANOUTQ job must report a positive or negative scan outcome to OpCon as a job completion status.
    :::

    ```
    LSAJ40R5                   Display SPLF Scan Rule                   00/00/00 
    USERNAME
    
    Application Key / ID  : 000000014       Get BLDPTFP01 Job ID
    Rule sequence/descrip.: 10              Description of Response Rule 
    SPLF name . . . . . . : BLDPTFP01       Job name: *CMD name, *CMD
    SPLF number . . . . . : *ANY            number, *ONLY, *LAST, *ANY
    From/To page  . . . . : 1       1       *STR, *END, number, -n=before *END
    From/To line (record) : 1           1   0=n/a
    From/To position (col): 1      80       0=n/a
    Start scan label . . : _____________________________________________________
    ____________________________________________________________________________
    Scan label length . . : 0 0=StrLen      Incidence cnt: 0
    Position after label  : 0               0=any after, -1=any before, -n=before
    Value,*PARM,*CAPT,DVar: *CAPT
    ____________________________________________________________________________
    Scan value length . . : 0               0=value string length
    Bypass parm value . . : _____________________________________________________
    ____________________________________________________________________________
    Bypass value length . : 0               0=value string length
    Compress numerics . . : N               Y/N Required rule: N Y/N
    Last changed user/time: USERNAME        2013-02-26-16.42.17.736000
    F3=Exit F5=Refresh F12=Cancel
    ```
    The Application ID indicates that this example will be searching for a spool file named BPDPTFP01. The actual spool file name in this example is being registered in the Scan Rule. Remember when using the SCANOUTQ command that there can be multiple spool file names detected by that command and qualified for processing. But there must be at least one Scan Rule found in the Scan Rules file for each spool file discovered, otherwise the spool file that SCANOUTQ discovered will be ignored.

2. Create Captured Data Response Rule(s): LSAM sub-menu 3, option 5.
    
    In this example, the Comp reference value, Compare rule and Compare data lines are set to the values that mean "always execute this rule." (The default values that imply this meaning are "\*CAPT EQ *ANY".)
    
    The illustration below shows that the IBM i command CPYSPLF will be executed. An easy way to format this command is to type the command name into the Response cmd field and then press F4=Prompt to get help from the IBM i command prompting program. However, do not attempt to include the Dynamic Variable token characters until after the command prompting returns the correctly formatted command syntax into this field.

    ```
    OPRR51R2                Create Capture Response Rule                  00/00/00
    USERNAME          Capt Type: S  C=Screen, S=SPLF, M=Message           00:00:00

    Application Key / ID  : 000000014     Get BLDPTFP01 Job ID
    Capture sequence/Desc : 010           Desc text for Capt Seq # 10
    Response sequence . . : 010           Desc text for Resp Rule 10
    Continue (AND/OR/CMD) : ___           
    Store CAPT to-> DynVar: __________________________________________________  +  
     ...to-> Oper Rply Var:               CompNum/CharEdit: N  Num:Y,N / Edit:CQDEF
    Response cmd (part 1) : CPYSPLF FILE(BLDPTFP01) TOFILE(QGPL/REPORT80)__________
    JOB({EXJOBNBR}/{EXJOBUSR}/{EXJOBNAM}) SPLNBR({EXSPLNBR}) MBROPT(*REPLACE)______
    ____________________________________________________________________________
    Comp reference value  : *CAPT_____________________________________________  +
    Cmp length-keep spaces: ___0 0=trim   Comp ref values: *CAPT, DynVar, char   
    Compare rule  . . . . : EQ   **,EQ,NE,GT,LT,GE,LE,=,<>,>,<,>=,<=             
    Compare data lines 1-3: *ANY, *PARM, DynVar, char       Capture length: 0000
    ...5...10....5...20....5...30....5...40....5...50....5...60....5...70....5...8
    *ANY___________________________________________________________________________
    _______________________________________________________________________________
    __________________________________________________________________________  +

    ```  

    In the Response cmd (command) field, the Dynamic Variables that were specified above are being used with the Dynamic Variable token characters. To get those Dynamic Variables formatted correctly, the easiest way is to position the cursor in the correct parameter location and then press F8=DyynVar. Select the desired Dynamic Variable name from the prompt list and then the program will format the name with the token characters and insert it into the command field. During the actual execution of the Response Command, the Response Rule Engine (illustrated in the flow chart above) will replace the Dynamic Variable tokens with their current value. The current values will have been set by the SCANOUTQ command as it selects each spool file for processing by the SCANSPLF command.
     
    The example screen above also names the IBM i DB2 physical file that was created during the preliminary configuration steps.

#### Example SCANOUTQ Command Parameters

The command syntax illustrated above is changed slightly to conform to this application example. Although the JOBNAME parameter is being shown with no value, it would be left out of the command if it is not required when this command is being entered as the command to execute in an OpCon job. The JOBNAME parameter could be used as a filter to distinguish between two common spool file names (such as QSYSPRT) when only spool files from one job should be selected for processing.

Note also that the library location of the command is specified here. This is not strictly necessary for the IBM i LSAM to process the OpCon job request in this case, since the LSAM job scheduler does include the SMAPGM library in its library list, but any commands from third-party software applications must be qualified by the library location of the command, otherwise the IBM i command editor that is processing the SBMJOB command prepared by the LSAM job scheduler will not be able to
locate the command in order to qualify its syntax. 
```
SMAPGM/SCANOUTQ OUTQ(MYLIB/MYOUTQ)
APPKEY(14) DATE(20130301) DATECOMP(EQ)
OPCONJOB(N) FAILOUTQ(3) FAILSPLF(3)
PARAMETERS('*RULES') JOBNAME( ) USER(*ALL)
SPLF(BLDPTFP01) USRDTA(*ALL) FORMTYPE(*ALL)
DVSPLNBR(SI.EXSPLNBR) DVJOBNBR(SI.EXJOBNBR)
DVJOBUSR(SI.EXJOBUSR) DVJOBNAM(SI.EXJOBNAM)
```
The Dynamic Variables that were configured in a previous step of this example are named in the appropriate new SCANOUTQ parameters. Note that the special token characterd do not surround the Dynamic Variable names because the purpose of the Dynamic Variables name is not to have values put in their place, but to name the Dynamic Variables that should be used by the SCANOUTQ command processor program as it is storing identifying information about each spool file selected for processing.






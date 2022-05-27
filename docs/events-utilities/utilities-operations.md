---
sidebar_label: 'Utilities Operations'
---
# Utilities Operations

## LSAM Utility Configuration

Use the following procedure to choose options for the behavior of certain LSAM utilities.

### Update the LSAM Utility options control parameters

1. In the command line, enter **SMAGPL/STRSMA or LSAMENU**. For more information on STRSMA and LSAMENU command parameters, refer to the [STRSMA Command](../operations/lsam.md#the-strsma-command) and [The LSAMENU Command](../operations/lsam.md#the-lsamenu-command).
2. Enter **3** to choose the **Events and Utilities menu** in the SMA Main Menu.
3. Enter **7** to choose **LSAM Utility configuration** in the Events and Utilities Menu.
4. Type desired configuration option(s) in the LSAM Utilities Configuration screen.
5. Press <**Enter**> to update the LSAM Parameters control record(s).

## SCANSPLF, SCANOUTQ and Captured Data Response Rules

The SCANSPLF utility is used to find and scan the content of reports, stored in spool files in an IBM i output queue. Parameter definitions (SPLF Scan Rules) must be predefined for the SCANSPLF utility command. Optionally, Captured Data Response Rules may also be defined for each element of data captured by the SCANSPLF utility. Sets of Scan Rules and Captured Data Response Rules are grouped together by a label called an Application. The SCANSPLF utility works with only one Application rule
set at a time and it determines a final positive or Positive result from the scan task based on the one or more rules that comprise the Application.

The SCANOUTQ utility supports alternate methods to identify one or more spool files that should be scanned, working among the contents of a specific output queue. To support SCANOUTQ, a SPLF Scan Rules Application may include more than one spool file name. For each spool file that qualifies according to the parameters of the SCANOUTQ command, this utility will execute the SCANSPLF command and use the rules from the specified Application that apply only to that spool file. As the
SCANOUTQ command completes, it reports a job pass or fail based on the summary results of one or more SCANSPLF executions. 

The LSAM capability to log captured data and execute Captured Data Response Rules is also supported in the Operator Replay feature and by Message Management. Some different methods for defining screen data capture are described in the topic about Operator Replay, while capturing message text elements is defined in the topic about Message Management. This topic refers to how the common Response Rules are engaged when using the SCANSPLF utility.

### Configuring SCANSPLF (and SCANOUTQ) Rules

To use the SCANSPLF utility it is necessary to choose an Application ID (APP) and to create one or more SPLF (spool file) scanning rules that are assigned to this APP. A SPLF Scan Rule must be defined for each discrete value that will be specified in the SCANSPLF command keyword PARAMETERS string, although the SCANSPLF command also allows a special PARAMETERS keyword value of \*RULES that waives the requirement for Scan Rules to match the command PARAMETERS keyword values.

:::note
Previous versions of the LSAM required a separate Application ID master record. Now, the Application ID has become the primary key field of each Scan Rule master record. There is still a menu option to work with a list of unique Application IDs, but this is only a convenience tool for discovering sets of Scan Rules.
:::

#### Adding a SCANSPLF Scan Rule from the LSAM Menu System

1. In the command line, enter **SMAGPL/STRSMA** or **LSAMENU**. For more information on command parameters, refer to the [STRSMA Command](../operations/lsam.md#the-strsma-command) and the [LSAMENU Command](../operations/lsam.md#the-lsamenu-command).
2. Enter **3** to choose the **Events and Utilities menu** in the SMA Main Menu.
3. Enter **4** to choose **Work with SPLF Scan Rules** in the Events and Utilities Menu.
4. Press <**F6**> to Add a new spool file scanning rule.
5. The **Create SPLF Scan Rule** screen appears.
6. On the Create SPLF Scan Rule screen, type an Application ID, the spool file name, the job name, the spool file number and a sequence number (which must be unique within the Application). These are the key fields that identify each Scan Rule. Note that the spool file number and the job name have special (\*) values that can be used instead of specific values. Refer to [Add/Change/Copy SPLF Scan Rule](../events-utilities/utilities-screens.md#addchangecopy-splf-scan-rule) for more information about how these field values may be used.
7. Type the spool file scanning rules. Refer to [Add/Change/Copy SPLF Scan Rule](../events-utilities/utilities-screens.md#addchangecopy-splf-scan-rule) for more information about how  each field may be used.
8. Press <**Enter**> to record the new SPLF Scan Rule record.

### Adding Captured Data Response Rules

After a SPLF Scan Rule has been created, use the LSAM Menu 3, function 5: Work with Captured Data Response Rules, to add or modify captured data response rule records.

#### Adding a Data Capture Rule from the LSAM Menu System

1. In the command line, enter **STRSMA** or **LSAMENU**. For more information on command parameters, refer to the [STRSMA Command](../operations/lsam.md#the-strsma-command) and the [LSAMENU Command](../operations/lsam.md#the-lsamenu-command).
2. Enter **3** to choose the **Events and Utilities menu** in the SMA Main Menu.
3. Enter **5** to choose **Work with Captured Data Response Rules** in the Events and Utilities Menu.
4. Press <**F6**> to Add a new Capture Response Rule record in the Work with Capture Response Rules screen.
5. The **Create Capture Response Rule** screen appears.
6. On the Create Capture Response Rule screen, type the Capture Identifier and Capture Sequence number, using an existing SCANSPLF Application ID and the number of one of the SPLF Scan Rules. Function key <**F4**> may be used to select a valid Application ID and Sequence number from a list window, as long as the Type field value has first been set to a value of "S" (= SCANSPLF data).
7. Type a value of 'S' (= SCANSPLF capture data) for the Type field. The setting of this field controls what data will appear in the prompt window when <**F4**> is pressed from either the Capture Identifier or the Capture Sequence number field.
:::note
The Type field must be set to "S" to specify SCANSPLF data capture. The value of "C" is reserved for use with the Operator Replay screen data capture function.
:::
8. Assign a unique Response Sequence number to each response rule. The order of the sequence number determines which response rule will be executed first.
9. Type a value for the Compare rule (refer to more information under [Add/Change/Copy Capture Response Rules](../events-utilities/utilities-screens.md#addchangecopy-capture-response-rules)). A simple value set that allows a response rule to always execute is "EQ" (equal) to the compare data special value of *ANY.
10. Type a Continuation field value if more than one comparison rule must apply. Otherwise, leave this field blank to specify one, simple response rule. (Refer to more information in [Add/Change/Copy Capture Response Rules](#Add/Chan2).)
11. *(Optional)* Specify the names of a Dynamic Variable  and/or an Operator Replay Token variable that will be used to store the captured data value.
12. Type a value for the Compress numeric field. Specify Y = yes if the captured and compare data values are numeric, otherwise specify N = no. This flag must correspond to the similar flag found on the associated SPLF Scan Rule master record.
13. Type the Response cmd (command) to execute if the compare data rule is matched. Use function key <**F13**> if the command string is longer than will fit in the (part 1) input field.
14. Type a value for the Compare data lines 1-5. Use function key <**F8**> if the compare data is longer than will fit into lines 1 to 5, but do type the first 5 lines into this field before pressing <**F8**>. The special values of \*ANY, \*PARM, or "DynVar" may be used. (Refer to [Add/Change/Copy Capture Response Rules](../events-utilities/utilities-screens.md#addchangecopy-capture-response-rules).)
15. The value for the Capture length field is supplied once a Capture Identifier and Capture Sequence number have been specified. This field will be loaded with a value if the F4=Prompt function key was used to select an existing Data Capture rule.
16. Press <**Enter**> to record the new Capture Response Rule record.
17. The system returns to an updated list of existing Capture Response Rule records.

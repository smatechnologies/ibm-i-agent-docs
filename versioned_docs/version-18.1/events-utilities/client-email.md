---
sidebar_label: 'Client eMail Management'
---
# Client eMail Management

## Client eMail Feature Replacement

The IBM i LSAM continues to support an auxiliary automation feature that facilitates composition of email messages to be sent to clients of OpCon user sites. As of Agent version 18.1.112, this feature has been greatly simplified, but generally without losing its capabilities.  Changes might be required in command lines that execute the GENEMLREQ command because several command parameters were removed.

:::note
See notes below about possible exceptions that might require review. These include:
  - Attention to the "From" email address
  - Elimination of some GENEMLREQ command parameters
    - Parameters that are no longer needed might need to be deleted from existing automation
  - Some new limits on the size of the email message body
:::

The original version of this feature was complicated due to the constraints of the original OpCon External Events command syntax, which relied on commas to separate the parameters of an Event command. This prevented the $NOTIFY:EMAIL event command from including financial currency amounts that used a comma as a grouping separate, such as $123,456.78. It was necessary to send email message text content to the OpCon server (which provides a centralize link to email services) by a separate and complex path of events.

With the introduction of the XML formatting syntax for External Event Commands (documented in a separate section of this document), it now becomes possible to use the $NOTIFY:EMAIL Event command by engaging the Agent’s IBM-styled command “XNTYEMAIL” (Notify by Email using XML).

Users of the original Client eMail feature should carefully consider the discussion of [Instructions for Users of Original Client eMail](#instructions-for-users-of-original-client-email).

**Agent version 21.1:** Not included in this Agent version 18.1 documentation are additional improvements and extensions that will become available after upgrading to the Agent version 21.1.

### Retained with the Simplified Client Email Feature

- The Client Master file and system of Client Acronyms (as keys) are retained, and no changes are required.
- The email message body may still be defined by source members stored in the EMLTXTSRC source file. However, the text of the message body is now constrained to less than 3,840 characters by the program field buffers within the Agent’s program that communicates with the OpCon server.
  - Please report to SMA Support if there is a need for a longer email message. But remember that this email feature was intended to generate simple and short notification messages, rather than complete letters to the site's clients. Otherwise, the existing client email message text source members will be supported without any changes required.

### Changes to the Former Client eMail Feature

- Uses the XML format of the OpCon $NOTIFY:EMAIL External Event command instead of a separate communications path between the IBM i Agent and the OpCon server.
- A large number of feature control fields, matching similar GENEMLREQ command parameters, are eliminated.
  - This change implies that some Agent automation rules or scripts would need updating to eliminate command parameters that are no longer supported. See the list of deleted command parameters, below.
- This Agent email feature can no longer provide its own FROM email address for each email, since the OpCon $NOTIFY:EMAIL External Event command does not support this as one of its command parameters.
  - The TO, CC and BCC addresses are still supported as before.
  - To manage the FROM address, use the global setting for the OpCon server where the site's "FROM email address" may be registered. This means that all messages sent by the IBM i Agent's Client eMail feature will be labelled with the same, universal site source email address. This change might imply some change in procedures for the site, in case a site client might reply to the generated email.
  - SMA also suggests that any custom REPLY TO email address could be embedded within the message body as a work-around for this limitation.
- The IBM i Agent communications programs that connect with the OpCon server have their internal transaction buffers enlarged to accommodate up to 3,840 bytes (expanded from 1,280) to support an ample length for the aggregated parameters of the $NOTIFY:EMAIL command.
  - The email message body could contain up to 3,000+ characters, however, the total size of the event command must be considered, allowing for the message title and the message addresses, plus any optional characters for the path to one or two attachments.

### Instructions for Users of Original Client eMail

Users who have started using the Client eMail feature at or after LSAM version 18.1.112 (LSAM version 18.1, PTF level 112) can skip this section of documentation.  It is provided as a guide only for users of the original Client eMail feature. New users should continue with the [Client eMail Process Overview](#client-email-process-overview).

Revising the introduction to Client eMail Management in the IBM i LSAM Administration Guide (18.1.055), this eMail management tool now does depend on the OpCon External Event command $NOTIFY:EMAIL. This Agent’s adoption of the XML format for OpCon External Event commands makes it much easier and simpler to continue producing nicely formatted email messages. For example, the XML format supports properly edited financial amounts, with no restrictions on the use of the comma as a grouping separator.

The CAUTION in the previous user instructions no longer applies. After version 18.1.112 cumulative LSAM PTFs for the OpCon Agent for IBM i are installed, there is no need to maintain the old, retired stand-alone OpCon utility “SMASendMail.exe”.

Another important change that must be made is to any OpCon Schedules that were previously required to manage the IBM i Agent’s Client eMail requests. Consider the following new procedure for using the Agent’s existing (revised, simplified) GENEMLREQ command.

1. No OpCon Schedule is required.
2. No file transfer jobs are required to send email request parameters or the email message content file.
3. There is no need for a job to execute the retired “SMASendMail” utility.
4. All that is required to get an email message sent is to execute the Agent’s GENEMLREQ.  This command engages the IBM i Agent XNTYEMAIL External Event email command. The external event command will be automatically configured by the GENEMLREQ command processor program (GENEMLREQR).

The XNTYEMAIL command may now be used by the IBM i Agent directly.  This new command should be convenient for generating email notification within the OpCon-controlled environment, especially when the message content should include the comma character, as for edited financial amounts like $123,456.00. It is only necessary to use the GENEMLREQ command whenever the site will benefit from the Agent’s automation of addressing and message content that is provided by the revised Client eMail feature, driven by its Client Acronym key system.

**Deleted Client eMail Flow Chart**

The former flow chart is no longer useful. The only parts of the chart that are still used are at the top, left, which identifies database input to the GENEMLREQ command: Control data, Client Acronym master file, and the optional Message Content source file. The revised GENEMLREQ command does conduct processing of this data in order to format the XNTYEMAIL External Event command, but it no longer generates any auxiliary files,  There are now no temporary files stored in either the IBM i file systems or the OpCon application server directories.

The processing of the XNTYEMAIL External Event command is now handled entirely by the OpCon application server’s normal management of incoming External Event commands.

**Changes to Preparare for eMail Tasks**

All of the previously published steps are replaced.

The only preparation task now required, if it has not already been done, is to register an External Event command user for the IBM i Agent, and then assign a password (old method) or a security token (new method) that must be captured (copied) as it is generated within the OpCon user interface and then pasted into the IBM i Agent’s “External Event Token” function which is option 2 in the LSAM sub-menu 3.

:::warning 
If a new OpCon security token for the OpCon External Event user is not captured (such as by a Windows copy function) just as it has been generated by the OpCon user interface, then a new token must be generated so that the token value can be captured for prompt pasting into the LSAM External Event Token registration.
:::

**Deleted GENEMLREQ Command Parameters**

The following command parameters were deleted from, or added to the GENEMLREQ command.

:::warning
If any of the deleted command parameters were used as the GENEMLREQ command was registered in the Agent’s automation tools (including Response Rules and/or the Multi-Step Job script steps), they must be removed from the registered commands to avoid a failure of the command.  Contact SMA Support if assistance is desired for locating all instances of the GENEMLREQ command.  It is possible to use SQL queries against certain Agent master files to quickly discover a list of all instances, such as in files OPRRPYF50 (Captured Data Response Rules) and MLTJOBF10 (Multi-Step Job Step master records).
:::

##### GENEMLREQ parameters deleted
- MSGTXTFILE
- MSGDYNVAR
- EMLMSGPROI
- EMLMSGPROP
- PARMFILE
- RMDYNVAR
- EMLPRMPROI
- EMLPRMPROP
- FILEPATH
- EMLUSER
- EMLPWDPATH
- EMLSVRURL
- EMLSVRPORT
- EMLSECURE
- FROMADDR

##### GENEMLREQ parameters added
- ATTACHMNT1
- ATTACHMNT2

**Changed Support for a FROM eMail Address**

The original Client eMail feature provided support for specifying a FROM email address from multiple sources.  However, since the new GENEMLREQ command now relies on the XML formatted External Event command XNTYEMAIL, this event command does not support specifying an email FROM address. 

Now, the email FROM address can be allowed, by default, to use the universal FROM address registered in the OpCon application server. 

Another alternative is to add text to the email message body that instructs the recipient what email address to use if it is necessary to reply to the email message.

### New Support for eMail Attachments

Following are new, optional command parameters that have been added to the GENEMLREQ command, based on optional parameters that the OpCon server supports for the $NOTIFY:EMAIL External Event command.

- ATTACHMNT1 – The path name within the OpCon application server where a document or other file type is located, which object should be included as an attachment to the final email that will be sent.
This parameter supports inclusion of Agent Dynamic Variable {TOKENS}. The tokens will be replaced by the GENEMLREQ command before their value is included in the Agent’s XNTYEMAIL External Event command.

- ATTACHMNT2 – The path name within the OpCon application server where a document or other file type is located, which object should be included as a second attachment to the final email that will be sent.
This parameter supports inclusion of Agent Dynamic Variable {TOKENS}. The tokens will be replaced by the GENEMLREQ command before their value is included in the Agent’s XNTYEMAIL External Event command.

## Client eMail Process Overview

This LSAM feature makes it possible to generate email requests that will be processed by the OpCon server, using content that is managed by the LSAM automation tools. This feature supports automatic preparation of elaborate and rich email content.  The original purpose of this feature was to enable OpCon client sites to trigger one or more email messages that are useful and appropriate for customers of the OpCon user site.  

:::info Example
For example, banks that process ACH transaction file batches to and from the Federal Reserve system can notify other financial institutions they serve about the status of batches belonging to each of their customers.  The messages can automatically include well edited transaction item counts and amounts, in addition to documenting the processing dates and times, as well as including any one-time special notices to the customers.
:::

The Client master file, CLTEMLF00, contains up to 10 characters used as an acronym to represent clients or other entities who should receive email notifications as the LSAM completes certain processes. This master file may store multiple records per client acronym in order to gather one or more lists of email addresses. Multiple records are managed by a sequence number, and they can be grouped together by a Use Code, for example, when a single record cannot hold all of the email addresses that should be used for one mail event.

The LSAM command GENEMLREQ (Generate eMail Request) is used to combine information from the Client eMail control record and the Client (Acronym) eMail master file, together with run-time parameters, completely defining the content and processing of an eMail request. This command can be used alone, or in the command line of various LSAM features, most usefully in the command line of a Captured Data Response Request where LSAM Dynamic Variables can be inserted into any of the GENEMLREQ command parameters.  The Agent's multi-step job scripting tool provides equally excellent support for preparing and executing GENEMLREQ commands.

:::note
As of LSAM version 18.1.112 (and newer versions), the following procedures are a much simpler replacement for the more complex original version of this feature.
:::

All steps in the original Client eMail instructions that referred to an OpCon Schedule are deleted. No OpCon Schedule is required, although often the GENEMLREQ command could be executed or triggered by some IBM i job that is part of an OpCon Schedule.

1. First time users, and clients who have upgraded from the original Client eMail feature, must review the IBM i LSAM configuration for the Client eMail service. This function is found via LSAM sub-menu 3, sub-sub-menu 11, option 7.
2. Maintain Client eMail Data master records.
3. An email message body text could be just a short message that is contained within the GENEMLREQ command itself. However, using an IBM i source physical file member to store the message body text adds support for text formatting options and for including Dynamic Variable tokens (that are replaced at run time with the current token value).
:::note
It is required to pre-define Agent Dynamic Variables that are referenced by tokens embedded within IBM i source file members containing message text.
:::
4. Carefully evaluate the parameters of the GENEMLREQ command, wherever that command has been included with the IBM i Agent’s automation tools, such as Response Rules and the Multi-Step Job step records.
:::note
Users of the original Client eMail feature should review existing executions of the GENEMLREQ command, since support for many of the original command parameters was removed.
:::
5. The Agent’s log files provide (improved) sources of diagnostic information.  Views of these log files are accessed from the LSAM menu system, as described later in this documentation.

## How to Configure an eMail Task

1. Create one or more Client eMail Data master records. Refer to the Screens and Windows section. below within this section, for detailed information about this function.
2. *(Optional)* Create one or more Message Text Source Members, using the LSAM sub-menu option for this function. Remember that this special type of source member supports translation of LSAM Dynamic Variable values. This means that the name of a Dynamic Variable can be inserted anywhere into the message text by typing the token enclosure characters around the Dynamic Variable name. (*The Dynamic Variable Token Start/End characters are specified in the LSAM Job Tracking menu, option 7.*) The default value used to create tokens is a pair of curly brackets, such as in this example where the registered Dynamic Variable name is DYNVAR1: **{DYNVAR1}**

:::tip
Any LSAM Dynamic Variables that will be used within a message source text member must be manually registered in the LSAM Dynamic Variables table efore they can be used by the GENEMLREQ command during run-time e-mail message formatting. Numeric variable formatting rules of any type are permitted for Dynamic Variables used in the context of an e-mail message.
:::

3. The final step in preparing for execution of the GENEMLREQ command is to determine the proper settings for each of the command's parameter keywords. These are fully documented in the next section of this document. It is helpful to pay close attention to the following possible sources for some of these parameters, where the table of parameter values below identifies which sources are appropriate for each keyword, and what keyword value tells the command to use each source:
    - Client eMail configuration values (sub-menu option 7)
    - Client eMail Data master record values (sub-menu option 1)
    - GENEMLREQ command parameters that specify their own values
  
4. Following execution of the GENEMLREQ command, diagnostic information about any failures will be found using the LSAM Client eMail sub-menu options 4 and 5. Additional information about problems with LSAM Dynamic Variable replacement can also be found the LSAM submitted job log file, LSALOGF30, viewed using LSAM sub-menu 6, option 5, log viewer 4.

## Client eMail Utility Commands

### GENEMLREQ Command (Generate eMail Request)

The command GENEMLREQ (Generate eMail Request) combines input from the Client eMail feature control file, from the Client Acronym master file and from the command parameters themselves to identify all the elements required to produce a nicely formatted e-mail message that may include any data that was captured and formatted by other IBM i LSAM functions. 

Command parameters that do not directly support Dynamic Variable tokens could still be supported by Dynamic Variable tokens if the command is executee from a Captured Data Response Rule or a Multi-Step Job Step, where the command line does support translation of Dynamic Variable tokens just before executing the command.

#### Command Syntax

In the following example of the GENEMLREQ command, the command default value is shown for every parameter (when a default is available). The default value may be assumed when it is not explicitly specified. Many of the command parameters support long strings, up to 128 characters, which prevents the IBM i command prompter from showing the command value prompts.
:::note COMMAND SYNTAX
  ```
  GENEMLREQ SUBJECT('Subject text string') ACRONYM(*CMD) SEQ(0) USECODE(*NONE) 
  MSGMBR(*ACRONYM) MESSAGE(*ACRONYM) TOADDR(*DEFAULT) CCADDR(*NONE) BCCADDR(*NONE) 
  ATTACHMNT1('\\server1\file1') ATTACHMNT2('\\server1\file2') OPCONJOB('1')
  ```
:::

The possible sources of each parameter value are defined in the following table of command parameters.

#### Table of GENEMLREQ Command Parameters

**SUBJECT**: User-specified e-mail subject line.

The subject line text for an e-mail must be specified when the command is executed. (Hint: A Dynamic Variable value could be used in this parameter if the command is being executed by a Captured Data Response Rule.)

**ACRONYM**: \*CMD **- or -** Client Acronym value (up to 10 characters).

When a client Acronym value is specified in this parameter, other command parameters may obtain their value from the Client Acronym master file.

\*CMD = This special value means that a Client Acronym master record will not be used, in which case the TOADDR e-mail address field must be specified instead of relying on the master file for the address. Also, the MESSAGE parameter must include some text for the message content. 

**SEQ**: Client Acronym master record sequence number.

This parameter is ignored if the ACRONYM parameter is set to \*CMD.

If the USECODE parameter is \*NONE or blank, specify the only Client Acronym record that will be used to obtain the TOADDR e-mail address and, optionally, the message text source member name. Zeros is a value sequence number.

If the USECODE parameter is not \*NONE and not blank, specify the first sequence number of the records in a Use group where the e-mail address retrieval should start. Zeroes means to start with the first record of a Use group, regardless of the actual sequence number assigned to that record.

**USECODE**: A registered Use Code from the Client Acronym master file **- or -** Blanks.

The Use Code is an optional means of grouping together Client Acronym master records to collect e-mail addresses. At this time there is no master table of Use Codes; they are only registered by typing them on one or more Client Acronym master records. Also refer to the SEQ parameter.

**MSGMBR**: \*ACRONYM **- or -** \*CMD **- or -** Source member name Specifies where the message content text will be retrieved.

\*ACRONYM = Get the message text source member name from the Client Acronym master record.

\*CMD = Use the text from the MESSAGE parameter of this command as the message content.
 
 Member name = the name of a source member in the LSAM source-physicalMSGTXTSRC.

:::tip
This command supports translation of Dynamic Variable tokens that are included in the source member. Refer to the section on Message Text Source Member maintenance, below.
:::

**MESSAGE**: \*ACRONYM **- or -** Message content text.

This parameter is ignored unless one of the following parameters is
specified:

- ACRONYM(\*CMD)
- MSGMBR(\*CMD)

When no message text source member is used, a character string up to 128
characters, enclosed in single quotes, should be specified in this
parameter to be used as the message content.

:::tip
This is the only parameter of this command that supports translation of a Dynamic Variable token, no matter where the command is executed. It is possible to compose message content up to 1024 character by listing multiple Dynamic Variable tokens in this field, even though the parameter value only supports 128 characters as the command is submitted.
:::

**TOADDR**: \*DEFAULT **- or -** e-mail address or addresses where the message will be sent.

Specify the e-mail address where the message should be sent.

A specific value is required when the ACRONYM parameter is set to \*CMD.

\*DEFAULT = use the e-mail addresses from one or more Client Acronym master records.

**CCADDR**: \*NONE **- or -** e-mail address or addresses to receive a copy of the message.

If a carbon copy of the message is desired, specify one or more e-mail addresses that should receive a copy.

When the command is used from a Captured Data Response Rule command line, this value might typically be specified as a Dynamic Variable, so that the cc. address can be conveniently changed from a single location (the Variable value), affecting multiple instances of the command execution.

\*NONE = do not include a cc. address in the mail task parameters.

**BCCADDR**: \*NONE **- or -** e-mail address or addresses to receive a blind copy of the message.

If a blind carbon copy of the message is desired, specify one or more e-mail addresses that should receive a copy.

When the command is used from a Captured Data Response Rule command line, this value might typically be specified as a Dynamic Variable, so that the cc. address can be conveniently changed from a single location (the Variable value), affecting multiple instances of the command execution.

\*NONE = do not include a cc. address in the mail task parameters.

**ATTACHMNT1, ATTACHMNT2**:

- UNC path to attachment file:  '\\\\server1\file1'
- {DYNVAR}

The path name within the OpCon application server where a document or other file type is located, which object should be included as an attachment to the final email that will be sent.

This parameter supports inclusion of Agent Dynamic Variable {TOKENS}.  The tokens will be replaced by the GENEMLREQ command before their value is included in the Agent’s XNTYEMAIL External Event command.  Tokens can be a convenient way to store all or part of a UNC path name, and they can be used as a convenient single-source to record changes that would then be automatically referenced by multiple different Client eMail configurations.

**OPCONJOB**:

- '1' = yes, the default.
- '0' = no.

This flag controls the extended actions of the GENEMLREQ command.

'1' = the command is executed as part of a job started by OpCon, and the command process should include generation of the $PROPERTY:SET event commands that will push the four Schedule Instance Property values up to OpCon. (The job must have been started by OpCon in order to obtain the values required for the event commands.)

'0' = the command will not execute the $PROPERTY:SET event commands. The command will still generate the two temporary files and all log entries, but any use of the temporary files must be controlled by an external or manual process.

### GETCLTEML Command (Get Client eMail Address)

The command GETCLTEML (Get Client eMail Address) is a special purpose command that can retrieve the e-mail address field from one Client Acronym master record and store it into an LSAM Dynamic Variable. This function would be useful for the purpose of assembling an OpCon event command such as XMLNTYEMAIL from a Captured Data Response Rule or a Multi-Step Job Script Step, where the Dynamic Variable token can be included as the event command parameter where any of the e-mail address values is specified (to, cc. or bcc.).

#### Command Syntax

In the following example of the GETCLTEML command some sample values are illustrated. The command parameters do not support default values except for the MSGSEQ parameter which would default to zeros. 
:::note COMMAND SYNTAX
```
GETCLTEML ACRONYM(ACRVALUE) VARNAM(DYNVARNAME) MSGSEQ(010) USECODE(USECODEVAL)
```
:::

Zeros can be a valid value for a Client Acronym master record sequence number, but if the USECODE is not blanks, then zeros means to use of the first Client Acronym master record that matches the USECODE value, regardless of the sequence number assigned to that master record. It is recommended to provide a specific value for the MSGSEQ if the USECODE applies only to records that have non-zero sequence numbers. 

Note that this command, unlike the GENEMLREQ command, will only access one Client Acronym master record per execution.

#### GETCLTEML Command Parameters

**ACRONYM**: 1 to 10 characters

The key value that identifies an eMail Client.

**VARNAME**: LSAM Dynamic Variable name

The name (but not in token format) of the LSAM Dynamic Variable where the e-mail address field will be copied from the identified Client Acronym master record.

**MSGSEQ**: 0 to 999

A sequence number that uniquely identifies each record belonging to a single Acronym value. Zeros is a valid value for a sequence number.

When the USECODE is not blank, then zeros in this sequence number field has the special meaning of "find the lowest sequence number of a record that matches the Use Code."

**USECODE**: 1 to 10 characters

This field may be left blank, in which case the command will use only the Acronym and the Sequence Number to identify the master record that will be used to fetch the e-mail address.

## Client eMail Screens and Windows

A sub-menu of functions that support the Client eMail Management is accessed using option 11 from either the sub-menu 3 (Events and Utilities Menu) or 4 (Operator Replay Menu).

### Client eMail Management Menu


```
SYSTEMNAME                CLIENT EMAIL MANAGEMENT MENU                  00/00/00   
USERNAME                                                                00:00:00

 Select one of the following:

     1. Work with Client eMail Data (WRKCLTEML)        
     2. Work with Message Text Source Members
     3. Generate eMail Request (GENEMLREQ)        
     4. Display eMail Activity Logs
     5. Display Error Log (DSPPFM EMLLOGF10)        
     6. Maintain Dynamic Variables
     7. Client eMail Configuration

Selection or command
 ===> __________________________________________________________________________
_______________________________________________________________________________
F3=Exit   F4=Prompt   F9=Retrieve   F12=Cancel
F13=Information Assistant   F16=System main menu
```
##### Menu Pathways

- Main Menu > Events and Utilities Menu (#3) > option 11
- Main Menu > Operator Replay Menu (#4) > option 11

##### Field

**Selection or command**: (may be restricted for some users)

##### Options

- The options displayed on this menu are explained in the following sections of this document. Type an option number in the Selection or command line and press <**Enter**> to begin using any of the options.
- **Option 3** (GENEMLREQ) is for testing, and documentation of this command appears above.
- **Option 6** is documented in the existing **IBM i LSAM** documentation, especially in the topic about Job Tracking.

##### Functions

- **F3=Exit**: Returns to the master menu
- **F4=Prompt**: Prompts for keywords for any command entered in the  Select or command line.
- **F9=Retrieve**: Retrieves the previous command that was entered on the Select or the command line. If it is pressed multiple times, you
    go further and further back to previous commands.
- **F12=Cancel**: Returns to the previous menu.
- **F13=Information Assistant**: Takes you to the IBM i general help screen.
- **F16=System main menu**: This is always shown on any system-generated menu screen. It takes you to the general command entry menu for the operating system. Return to the previous menu by pressing <**F3**> or  <**F12**>. This function is not commonly used and can be restricted for certain user profiles.

### Work with Client eMail Data

- **Screen Title**: Work with Client eMail
- **Screen ID**: CLTEMLR1

##### Menu Pathways

- "Main Menu > Events and Utilities Menu (#3) > Client eMail Menu (# 11) > option 1
- "Main Menu > Operator Replay Menu (#4) > Client eMail Menu (# 11) > option 1

##### Fields

- **Search content**: Type 1 - 10 characters in this field and press <**Enter**> to search the entire contents of every record for a match. Data not on the list display is also searched.
  - If a record with a matching string is found, the list will be positioned to that record and the cursor will be positioned to the Opt field next to that record. Type 5 and press <**Enter**> to view the details of a record and see the matching data.
  - Press F16=Search Next to continue a search on to the next matching record.
  - Opt Type one of the option numbers listed near the top of the display into an Opt field and press <**Enter**> to perform that function on the selected record.
- **Acronym**: The 1-10 character key representing an eMail Client
- **Seq**: The sequence number used to identify separate e-mail address records within a single Acronym.
- **F11 = Change View**: Use this function key to replace the data shown to the right of the Sequence number field.

**View 1**

- **eMail Address (partial)**: A partial, or full 128-character string of one or more email addresses, where a semi-colon is used to separate the addresses.
  - Press F10= Fold/Drop to expand or contract the full field content.
  - Option 5=Display can also be used to show the full e-mail address list per record.

**View 2**

- **Use Code**: A code used to create sub-groups of records within a single Acronym, such as when there are different e-mail addresses used for different types of communication.
- **Use Description**: An optional field that describes the Use Code. There is no separate table of Use Codes, so the Description field is repeated on each master record, but it only needs to be specified once, and only exists for the convenience of system users, as documentation. (The Use Codes are not normalized in the database at this time.)

**View 3**

- **MsgSrcMbr**: The name of the source physical file member in file MSGTXTSRC that contains the message content. For records that may be grouped by a Use Code, only the first record in the group (the lowest sequence number) needs to contain this member name. (The Use Codes are not normalized in the database at this time.)
- **Client Name**: An optional description of the Acronym. Since there can be multiple records per Acronym, the client name is repeated on each record, but this name field is only for internal documentation purposes. (The Client Acronym is not normalized in the database at this time.)

##### Options

- **2=Change**: Type this option and press <**Enter**> to branch to a single-record display where the master record content can be updated. The key fields of Acronym and Sequence Number cannot be changed, so use option 3=Copy then option 4=Delete to accomplish a change in the key fields.
- **3=Copy**: Type this option and press <**Enter**> to branch to a single-record display where the master record content can be copied to a new Acronym and/or a new Sequence number.
- **4=Delete**: Type this option and press <**Enter**> to add this record to a list of master records to be deleted. After all options that were typed before the Enter key was pressed are processed, then the screen will show a Delete confirmation list display (refer to below).
- **5=Display**: Type this option and press <**Enter**> to branch to a single-record display where all the fields that define a single master record are displayed in their entirety.

##### Functions

- **F3=Exit**: Do not update the data, return to the LSAM menu.
- **F5=Refresh**: Clear any remaining options that were typed and rebuild the list display from a new read through the database.
- **F10=Fold/Drop**: When the e-mail address is displayed on the list, this function key can be used to show the entire 128-character list of e-mail addresses for each record. Press F10 again to restore the display to one line per record. F10 changes the list display to 3 lines per record for other F11 views, but there is no extended data on the other views.
- **F11=Chg View**: This function key changes which fields appear in the list display. Refer to the Fields table above for a list of fields appearing in each view.
- **F12=Cancel**: Do not update the data, return to the LSAM menu.
- **F16=Search Next**: When data was typed into the Search content field and pressing Enter resulted in a match, press <**F16**> to continue the search on to the next matching record. F16 can also be pressed to start a new search when a new value has been typed into the Search Content field.
- **F17=Top, F18=Bottom**: These function keys are used to reposition the list display to the beginning or the end of the master file.
- **F24=More keys**: This function key changes the function key legend that is displayed at the bottom of the screen. However, all function keys remain active, regardless of which keys show in the function key legend.

### Display/Change/Copy Client eMail Data

- **Screen Title**: Display Client Record
- **Screen ID**: CLTEMLR5

##### Menu Pathways

- Main Menu > Events and Utilities Menu (#3) > Client eMail Menu (# 11) > option 1 > 2,3,5
- Main Menu > Operator Replay Menu (#4) > Client eMail Menu (# 11) > option 1 > 2,3,5

##### Fields

- **Acronym**: The 1-10 character key representing an eMail Client
- **Record sequence**: The sequence number used to identify separate e-mail address records within a single Acronym.
- **Record use code**: A code used to create sub-groups of records within a single Acronym, such as when there are different e-mail addresses used for different types of communication.
- **Record use description**: An optional field that describes the Use Code. There is no separate table of Use Codes, so the Description field is repeated on each master record, but it only needs to be specified once, and only exists for the convenience of system users, as documentation. (The Use Codes are not a normalized in the database at this time.)
- **Client Name**: An optional description of the Acronym. Since there can be multiple records per Acronym, the client name is repeated on each record, but this name field is only for internal documentation purposes. (The Client Acronym is not normalized in the database at this time.)
- **Default msg txt SrcMbr**: The name of the source physical file member in file MSGTXTSRC that contains the message content. For records that may be grouped by a Use Code, only the first record in the group (the lowest sequence number) needs to contain this member name. (The Use Codes are not a normalized in the database at this
 time.)
- **eMail Address**: A 128-character string of one or more email addresses, where a semi-colon is used to separate the addresses.
  - The Use Code can group together multiple records in order to extend the list of e-mail addresses that would be used at one time for a message.

##### Functions

- **F3=Exit**: Do not update the data, return to the LSAM menu.
- **F5=Refresh**: Restore the display to its original condition, removing any changes that were typed but not yet committed with the Enter key.
- **F10=WRKMBRPDM**: This function key is displayed only in Add, Change or Copy mode, and not in Display mode. When F10 is pressed, the program exits to the IBM i list display of members in the source physical file called MSGTXTSRC, permitting addition of new text members and/or changes to existing text members. This function may also be used just to identify the name of an existing source member that would then be typed into the Default msg txt SrcMbr field. For details about F10=WRKMBRPDM, refer to the display for menu option 2.

### Work with Message Text Source Members

##### IBM i WRKMBRPDM List Display
```
                      Work with Members Using PDM             SYSSERNO
File  . . . . . .   EMLTXTSRC      
  Library . . . .     SMADTA               Position to  . . . . . __________

Type options, press Enter.
 2=Edit         3=Copy  4=Delete 5=Display       6=Print     7=Rename
 8=Display description  9=Save  13=Change text  14=Compile  15=Create module...

 Opt  Member      Type        Text
__   MSGTEST1    TXT         Test email sent to Client 1______________________
__   TSTMSGTXT1  TXT         Test message content with Dyn Var________________


                                                                          Bottom
Parameters or command
===> __________________________________________________________________________
F3=Exit          F4=Prompt             F5=Refresh            F6=Create
F9=Retrieve      F10=Command entry     F23=More options      F24=More keys
                             (C) COPYRIGHT IBM CORP. 1981, 2005.
```

##### Menu Pathways

- Main Menu > Events and Utilities Menu (#3) > Client eMail Menu  (# 11) > option 2
- Main Menu > Operator Replay Menu (#4) > Client eMail Menu (# 11) > option 2

##### Function Notes

The function of the WRKMBRPDM display is found in IBM i documentation and not repeated here. Refer to the following example of a member edit display for additional notes about how to format message text source members.

### Edit Message Text Source Members

When F6=Create is pressed from the WRKMBRPDM display, a prompt appears requesting the member name and description of the new source member. After that data is typed, the following display appears for both Create and option 2=Change in order to update the lines of a message source member.

##### IBM i WRKMBRPDM Member Edit Display
```
 Columns . . . :    1  71            Edit                      SMADTA/EMLTXTSRC    
 SEU==> __________________________________________________           TSTMSGTXT1
 FMT **  ...+... 1 ...+... 2 ...+... 3 ...+... 4 ...+... 5 ...+... 6 ...+... 7
          *************** Beginning of data *************************************
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
          ****************** End of data ****************************************

F3=Exit   F4=Prompt   F5=Refresh   F9=Retrieve   F10=Cursor   F11=Toggle
F16=Repeat find       F17=Repeat change          F24=More keys
                          (C) COPYRIGHT IBM CORP. 1981, 2005.
```

##### Function Notes

The GENEMLREQ command processor program reformats the content of message text source members in a way that makes it easy for mail browsers to display message text in a format that is appealing and easy to read. Therefore, no special care is required when composing message text using the WRKMBRPDM (SEU) editor from IBM.

The only rule that applies while typing is to never type partial words on a line. If a word will not fit on one line, start that word on the next source member line. The final formatting will take care of the spacing between words, although, only one space will be inserted between the last word of one line and the first word of the next line.

Keep in mind the following two features of the message text formatting logic in order to achieve the desired final format of the message:

1. GENEMLREQ will replace LSAM Dynamic Variable tokens.
2. Leave a source member line blank to insert a Carriage Return + Line  Feed.\ One "New Line" function will be inserted into the message text for each blank source line, marking the end of a paragraph. Leave two (or more) lines blank in order to force a blank line between paragraphs in the final message format. When it is desired to have no blank space, but to only start a new line, such as in the signature lines at the end of a memo, leave only one source line blank.

Following is an example of how the message illustrated above would appear in a typical e-mail message browser, given that the Dynamic Variable was replaced by an numeric value of 1234567 that had Dynamic Variable numeric formatting rules applied.

:::note Email Message Example
```
Verify that the Dyn Var name DVAR is translated here: $12,345.00

Two blank lines above result in one blank line in the final formatted
e-mail message. A single blank line results in a new paragraph but no
space will appear between the paragraphs.

Sincerely,
SMA Support
```
:::

### Display Mail Activity Logs

This function also provides convenient access to the Display of Error Log information, using a formatted display instead of the simple IBM i command DSPPFM that is used for menu option 5. However, this method of access to the error log information limits the error log records to only those that pertain to the selected GENEMLREQ job, therefore, some error log entries that might be available for failed GENEMLREQ jobs would not appear except when using menu option 5.

- **Screen Title**: Display Client eMail Activity Log
- **Screen ID**: EMLLOGR1

##### Menu Pathways

- "Main Menu > Events and Utilities Menu (#3) > Client eMail Menu (# 11) > option 4
- "Main Menu > Operator Replay Menu (#4) > Client eMail Menu (# 11) > option 4

##### Fields

- **Search content**: Type 1 - 10 characters in this field and press <**Enter**> to search the entire contents of every record for a match. Data not on the list display is also searched. If a record with a matching string is found, the list will be positioned to that record and the cursor will be positioned to the Opt field next to that record. Type 5 and press <**Enter**> to view the details of a record and see the matching data.
  - Press F16=Search Next to continue a search on to the next matching record.
- **Opt**: Type one of the option numbers listed near the top of the display into an Opt field and press <**Enter**> to perform that function on the selected record.
- **DD-HH.MM.SS**: A truncated form of the record logging date and time, showing the day of the month and the hours, minutes and seconds of the entry. A primary record key (shown on the details display) assures that records will appear in DESCENDING date+time sequence, where the most recent record appears at the top of the display.
- **TP**: The record entry type. Values are:
  - E = an error log, where the TP value and the Status code on the far right will show in red to highlight a failed job.
  - U = the updated GENEMLREQ job parameters, after the mail task definition sources have all been reconciled. More than one U record will appear when multiple Client Acronym records were used to obtain an extended To-Address list.
  - Q = the original job request parameters, logging the actual values that were supplied via the GENEMLREQ command parameters, before defaults and cross-reference codes are replaced from other sources.
- **Acronym**: The 1-10 character key representing an eMail Client
- **Seq**: The sequence number used to identify separate e-mail address records within a single Acronym.
- **Use Code**: A code used to create sub-groups of records within a single Acronym, such as when there are different e-mail addresses used for different types of communication.
- **Ref Key \#**: The actual internal primary key number of the first record in a mail task log group, used to show the association of a group of log records to a single job. This value is important when more than one job, perhaps with the same name, might be executing at the same time, because the log records could be interspersed.
- **Job Name**: The IBM i job name of the job where the GENEMLREQ was executed. The full IBM i job identifier (number/user/name) is shown in the option 5=Display details format.
- **Status**: A value displays when any error code or other exceptional (perhaps non-fatal) status code is reported as the completion code by the GENEMLREQ command processor program. If the TP (type of log record) is value "E", then the TP code and the status code are displayed in red. Use option 5=Display to see more information about the reason for a failed job. (Also refer to the discussion elsewhere in this section about tools that can be used to diagnose the cause of job failures.)

##### Options

- **1=Error log**: Type this option and press <**Enter**> to branch directly to a subset list of the Error Log entries (if any) that pertain only to the selected job.
- **2=WRKJOB**: Type this option and press <**Enter**> to branch to an IBM i Work with Job menu, in order to examine information such as the job log for the job where the GENEMLREQ command was executed.
- **5=Detail**: Type this option and press <**Enter**> to branch to a series of formatted pages that display all the job definition details, and any failure reason text, for this execution of the GENEMLREQ job. The values displayed vary, depending on the record type (refer to the list of record types in the Fields table, above).
- **6=View Parms**: This option is no longer supported.
- **7=View message**: This option is no longer supported.

##### Functions

- **F3=Exit**: Return to the LSAM menu.
- **F5=Refresh**: Clear any remaining options that were typed and rebuild the list display from a new read through the database.
- **F12=Cancel**: Return to the LSAM menu.
- **F16=Search Next**: When data was typed into the Search content field and pressing Enter resulted in a match, press <**F16**> to  continue the search on to the next matching record. F16 can also be pressed to start a new search when a new value has been typed into the Search Content field.
- **F17=Top, F18=Bottom**: These function keys are used to reposition the list display to the beginning or the end of the master file.

### Display eMail Activity Detail
##### Display eMail Activity - Page 1 of 2

- **Screen Title**: Display eMail Activity Detail, Page 1 of 2
- **Screen ID**: EMLLOGR5A

##### Menu Pathways

- "Main Menu > Events and Utilities Menu (#3) > Client eMail Menu (# 11) > option 4 > 5
- "Main Menu > Operator Replay Menu (#4) > Client eMail Menu (# 11) > option 4 > 5

##### Fields

[Common header fields]
(Apply to formats A and B)

- **Log time stamp**: A date and time stamp when this log record was written
- **Rec ID**: The type of log entry - refer to the Fields table for the Activity Log list display, above.
- **OpCon Job**: '1' = Yes, '0' = No (refer to the GENEMLREQ parameters explanation).
- **Prim key**: A numeric primary key assigned to this Activity Log record.
- **Xref Prim key**: The primary key assigned to the first Activity Log record for this e-mail. All entries for the same e-mail task will cross-reference the first primary key in order to show the association of log entries, even when multiple jobs may write interspersed entries. This cross-reference also separates multiple  executions of the GENEMLREQ command from the same IBM i job.
- **IBM i Job ID**: Number/User/JobName where the GENEMLREQ command was executed.
- **Job Status**: A message code or a mnemonic character string representing the type of failure. Consult SMA Support for assistance with interpreting mnemonic codes, but the failure text on the right usually explains the code.
- **Error Text**: An explanation provided by the program of why the GENEMLREQ command failed.
- **eMail Subject Line**: The value provided by the SUBJECT keyword of the GENEMLREQ command.

[Fields that are unique to this format A]

- **Acronym**: The 1-10 character key representing an eMail Client
- **Seq**: The sequence number used to identify separate e-mail address records within a single Acronym.
- **Use Code**: A code used to create sub-groups of records within a single Acronym, such as when there are different e-mail addresses used for different types of communication.
- **Msg Txt Src**: The name of the source physical file member in file MSGTXTSRC that contains the message content. For records that may be grouped by a Use Code, only the first record in the group (the lowest sequence number) needs to contain this member name. (The Use Codes are not a normalized in the database at this time.)
- **Msg Txt Src**: The 10-character name of the IBM i source file member that stores the message text. ((KEEP THIS)) -->
- **Command Message value**: The value specified in the MESSAGE keyword of the GENEMLREQ command. (Refer to the command definition, above, for more information.)

##### Functions

(These also apply to format B)

- **F3=Exit**: Do not update the data, return to the LSAM menu.
- **F12=Cancel**: Do not update the data, return to the list display.
- **F20=ErrLog**: This function key will cause the display to branch to a different LSAM list display that will select only the error log records pertaining to the job identified on the current Details display.
- **F21=WRKJOB**: This function key triggers a branch to an IBM i Work with Job menu, in order to examine information such as the job log for the job where the GENEMLREQ command was executed.
- **PageUp/Down**: The Page Up and Page Down keys are prompted, depending on which of the four screen formats is on display. Use these function keys to move among the four parts of a log entry.

##### Display eMail Activity - Page 2 of 2
- **Screen Title**: Display eMail Activity Detail, Page 2 of 2
- **Screen ID**: EMLLOGR5B

##### Fields

Fields that are unique to this format

- **To Address**: The e-mail address to which the message is sent
- **CC Address**: An option carbon copy address to which a copy of the message is sent
- **BCC**: An optional blind carbon copy address to which a copy of the message is sent, but other recipients do not see this address

### Display Error Log

**Screen Title**: Display Client eMail Error Log

**Screen ID**: EMLLOGR2

##### Menu Pathways

- Main Menu > Events and Utilities Menu (#3) > Client eMail Menu (# 11) > option 4 > option 1
- Main Menu > Events and Utilities Menu (#3) > Client eMail Menu (# 11) > option 4 > option 5 > F20=ErrLog
- Main Menu > Operator Replay Menu (#4) > Client eMail Menu (# 11) > option 4 > option 1
- Main Menu > Operator Replay Menu (#4) > Client eMail Menu (# 11) > option 4 > option 5 > F20=ErrLog

##### Fields

- **Prim key**: A numeric primary key assigned to this Error Log record.
- **Xref Prim key**: The primary key assigned to the first Activity Log record for this e-mail. All entries for the same e-mail task will cross-reference the first primary key (of the Activity Log, not of the Error Log) in order to show the association of log entries, even when multiple jobs may write interspersed entries. This cross-reference also separates multiple executions of the GENEMLREQ command from the same IBM i job.
- **IBM Job ID**: The number/user/jobname of the IBM i job where the GENEMLREQ command was executed.
- **Acronym**: The 1-10 character key representing an eMail Client.
- **Seq**: The sequence number used to identify separate e-mail address records within a single Acronym.
- **Use Code**: A code used to create sub-groups of records within a single Acronym, such as when there are different e-mail addresses used for different types of communication.
- **DD-HH.MM.SS**: A truncated form of the record logging date and time, showing the day of the month and the hours, minutes and seconds of the entry. A primary record key (shown on the details display) assures that records will appear in ASCENDING date+time sequence, where the most recent record appears at the bottom of the list.
- **TP**: The record entry type. Values are:
  - ER = an error description.
  - CE = an error occurred when executing a CL command, also refer to the next entry type.
  - CT = a log of the command that was executing when the CE entry was made.
  - FE = an error during a file operation, refer to the content for the name of the file.
  - VB = a line of message text showing a Dynamic Variable token before replacement.
  - VA = the same line of message text showing the result after a Dynamic Variable token was replaced.
  - VE = the error that occurred while trying to replace a Dynamic Variable token (also refer to the LSAM generic error log, file LSALOGF30, viewed from sub-menu 6, option 5, log view 4, for the name of the Dynamic Variable being processed when an error occurred).
- **Log Entry**: Text describing the log event. Use option 5=Display to see the complete 1024 characters of the log entry.

### Display Error Log Details

Option 5=Display from the list of Error Log entries shows the complete entry text of up to 1024 characters, along with all other record identifying fields.

- **Screen Title**: Display eMail Error Log Detail
- **Screen ID**: EMLLOGR6

##### Menu Pathways

- Main Menu > Events and Utilities Menu (#3) > Client eMail Menu (# 11) > option 4 > option 1 > 5
- Main Menu > Events and Utilities Menu (#3) > Client eMail Menu (# 11) > option 4 > option 5 > F20=ErrLog > 5
- Main Menu > Operator Replay Menu (#4) > Client eMail Menu (# 11) > option 4 > option 1 > 5
- Main Menu > Operator Replay Menu (#4) > Client eMail Menu (# 11) > option 4 > option 5 > F20=ErrLog > 5

##### Fields

- **Actv key**: A numeric primary key assigned to the GENEMLREQ Activity Log entry from which this error log entry was displayed. Error log entries are actually associated with all the Activity Log entries that belong to the same Xref Prim key group (refer to next field).
- **Xref Prim key**: The primary key assigned to the first Activity Log record for this e-mail. This is the cross-reference value from the Activity Log entry that was on display when access to the Error Log was requested.
- **IBM Job ID**: The number/user/jobname of the IBM i job where the GENEMLREQ command was executed.
- **Acronym**: The 1-10 character key representing an eMail Client.
- **Seq**: The sequence number used to identify separate e-mail address records within a single Acronym.
- **Use Code**: A code used to create sub-groups of records within a single Acronym, such as when there are different e-mail addresses used for different types of communication.
- **ELog key**: A numeric primary key assigned to this Error Log record.
- **Xref Prim key**: The primary key assigned to the first Activity Log record for this e-mail. All entries for the same e-mail task will cross-reference the first primary key (of the Activity Log, not of the Error Log) in order to show the association of log entries, even when multiple jobs may write interspersed entries. This
    cross-reference also separates multiple executions of the GENEMLREQ command from the same IBM i job.
- **Log time**: The date and time when this Error Log entry was generated.
- **Record Type**: The record type values are:
  - ER = an error description.
  - CE = an error occurred when executing a CL command, also refer to the next entry type.
  - CT = a log of the command that was executing when the CE entry was made.
  - FE = an error during a file operation, refer to the content for the name of the file.
  - VB = a line of message text showing a Dynamic Variable token before replacement.
  - VA = the same line of message text showing the result after a Dynamic Variable token was replaced.
  - VE = the error that occurred while trying to replace a Dynamic Variable token (also refer to the LSAM generic error log, file LSALOGF30, viewed from sub-menu 6, option 5, log view 4, for the name of the Dynamic Variable being processed when an error occurred).
- **Log Entry**: Text describing the log event.

### Display Error Log (DSPPFM EMLLOGF10)

This function supports unrestricted access to the full content of the GENEMLREQ error log. This menu option uses an IBM i command DSPPFM instead of the formatted presentation of log entries limited to one mail task (as supported by menu option 4). Despite the lack of formatting, the log entries are easy to read, and this method of access may sometimes be necessary in order to diagnose the reason that the GENEMLREQ command failed to execute (and therefore might not have created an Activity Log entry).

The sample display below shows the file content positioned to column 94, where the Record Type code appears, followed by the beginning of the plain text log entry.

The illustration below includes an example of a real error messages.  The IBM i command that displays the unformatted record data has been positioned to column 94, which is where the record type code appears.  This view is convenient for surveying the file content, identifying the type of each message while also displaying as much message text as possible.

##### Display Client eMail Activity Log
```
                         Display Physical File Member
File . . . . . . :   EMLLOGF10           Library  . . . . :   SMADTA
Member . . . . . :   EMLLOGF10           Record . . . . . :   1
Control  . . . . .   W94                 Column . . . . . :   94
Find . . . . . . .

.+....0....+....1....+....2....+....3....+....4....+....5....+....6....+....7
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
                                                                       More...
F3=Exit   F12=Cancel   F19=Left   F20=Right   F24=More keys
```

##### Menu Pathways

- Main Menu > Events and Utilities Menu (#3) > Client eMail Menu (# 11) > option 4
- Main Menu > Operator Replay Menu (#4) > Client eMail Menu (# 11) > option 4

##### Fields

- Refer to the description of the formatted Error Log display, above, for an interpretation of the raw log file entries. The log entry text begins at display column 98.
- The format and use of the DSPPFM command output is documented by IBM. Use the function keys F19/F20 or the control field at the top of the display to change the position of the display window.

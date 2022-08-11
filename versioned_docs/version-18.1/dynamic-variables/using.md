---
sidebar_label: 'Using Dynamic Variables with Agent Automation Tools'
---

# Using Dynamic Variables with Agent Automation Tools

Dynamic Variables are a powerful and flexible type of variable value stored in an LSAM table file that may be used with many LSAM features, including the definition of submitted jobs. A Dynamic Variable can be either a type L used for updating the LDA (local data area) associated with an IBM i job, or it can be a type V that is a general purpose variable represented by a token. The token is the name of the Dynamic Variable enclosed within a pair of curly brackets {} (or another reserved value, as specified in the LSAM Utilities configuration at LSAM sub-menu 3, option 7). For example, a Dynamic Variable named "SCANVAL" would be represented by the token {SCANVAL}.

Dynamic Variables are discussed in detail in this topic. There is also an explanation of how variable values can be set by the Captured Data Response Rules in one of the sub-sections above about the response rules. Important information about defining Dynamic Variables is offered below, within the topic of Maintaining Dynamic Variables.

The following sections explain how the type-V Dynamic Variables can be used with the SCANSPLF utility and with Captured Data Response Rules. Inserting Dynamic Variables where they are supported adds flexibility to SPLF Scan Rules and Captured Data Response Rules. It becomes possible for these rules to automatically adapt to circumstances that arise during execution time. For example, the Response Rules may choose different commands to execute based on the content of captured data, resetting a Dynamic Variable to one value or another, before another Response Rule is executed that would use the Dynamic Variable value as part (or all) of its response command.

## Dynamic Variables with SCANSPLF and SCANOUTQ

The SPLF (spool file) Scan Rules that support the SCANSPLF and SCANOUTQ commands permit entry of Dynamic Variable tokens in the Scan Value field. This option is supported by the special value of *RULES in the PARAMETERS keyword of both commands. Dynamic Variables are also supported by several of the command parameters (although not in the PARAMETERS keyword; refer to the Fields tables for both commands, above, for a list of supported parameters). This would allow the scan value and other command parameters to be changed dynamically as prior steps in a process are executed.

When adding or changing a SPLF Scan Rule record, function key <**F8**> may be pressed while the cursor is in the Scan Value field to view a list of Dynamic Variables. One of the available Dynamic Variables can be selected from the prompt window and it will be inserted at the exact position of the cursor. This technique is also  helpful to discover the correct syntax for naming a Dynamic Variable token. Since the Utility Configuration function (LSAM menu 3, option 7) supports changing the separator characters used for Dynamic Variables (NOT recommended!), it could be important to make sure that the correct characters are being used for the token. In case the Dynamic Variable has not yet been stored into the LSAM table, the anticipated variable name can still be used as long as the correct pair of separator characters surrounds the variable name.

Dynamic Variable tokens can be used in some of the parameter fields of the SCANSPLF and SCANOUTQ commands (for fields that support Dynamic Variables -- the IBM i command prompting includes "DVar" in the list of values for most of these parameters). It is necessary that the full {TOKEN} fits into the space allowed for each parameter keyword. Two positions must be reserved for the Dynamic Variable token special characters (except for the four SCANOUTQ parameters where a dynamic variable is named to store spool file ID values), so a parameter field that supports a value length of 10 would limit the size of the token name to only 8 characters (plus 2 for the special characters that make the name a token). This limitation must be kept in mind whenever Dynamic Variable names are being defined.

## Dynamic Variables with Captured Data Response Rules

Captured Data Response Rules allow Dynamic Variables to be specified either for the Response Command field or for the Compare data lines. In either field a Dynamic Variable can be all or just part of the value of the field.

When adding or changing a Captured Data Response  Rule record, function key <**F8**> may be pressed while the cursor is in one of the two supported fields to view a list of Dynamic Variables. One of the available Dynamic Variables can be selected from the prompt window and it will be inserted at the exact position of the cursor.

It is important to understand that the response rule module stores the captured data value into the named variable before the response command is evaluated or executed. This makes it possible to rely on the captured value as part of the decision to determine whether a rule should be executed. This also implies that the variable named in the response rule record could be used in the response command in order to include the value of the data captured by the associated automation tool.

:::tip
Older versions of the IBM i LSAM (before October of 2012) used to evaluate the Compare and Reference data values before deciding if captured data should be stored into an optionally named Dynamic Variable. However, this logic was changed using the Agent's software patching tools due to the overwhelming user response that the captured data should be available from a Dynamic Variable {TOKEN} to be used effectively for a majority of response rule use cases. This change also improved the forensic evidence in the Agent's log files that proves the outcome of an automated decision.
:::

## Dynamic Variables with Message Management

More information about the possible use of Dynamic Variable {TOKENS} with Message Management Parameter master records is documented within the Message Management chapter of this Agent User Help. Token replacement is supported, for example, in the Event command line and also as the value used to Reply to a message.

Message Management also uniquely utilizes a Dynamic Variable to store the number of instances that a Parameter record has been selected for use as part of the optional Threshold processing. 

As for the SCANSPLF utility described above, Message Management Parameters can be optionally linked to a Message Capture Definition, and by that means, to any number of Captured Data Response Rules, also explained above.

## Dynamic Variables with Operator Replay

More information about the possible use of Dynamic Variable {TOKENS} with Operator Replay Script Step master records is documented within the Operator Replay chapter of this Agent User Help. Token replacement is supported, for example, in the String to Send, the Function Key and the branching logic Script Name and/or Step Label.

As for the SCANSPLF utility described above, Operator Replay Script Steps can be optionally linked to a Screen Capture Definition, and by that means, to any number of Captured Data Response Rules, also explained above.

## Dynamic Variables with OpCon Job Start Requests

In addition to the obvious Variables tab of an OpCon Job Master record, where Agent Dynamic Variable names are used as destinations for storing values provided by the OpCon application server, Dynamic Variable {TOKENS} can be inserted into some of the job master definition fields. The prerun command field and the main Call command field are the most common places where the variable tokens can be inserted. Some of the other job master record fields can also be specified by using Dynamic Variable tokens.

Whenever the IBM i Agent's Job Scheduling server spots a Dynamic Variable {TOKEN} anywhere within the incoming job start request, it will perform the following actions before using the job request data to assemble an IBM I SBMJOB request:

- Variable tab table entries are loaded with values provided by the OpCon application server
- If a SETDYNVAR command appears in the prerun command line, it will be immediately executed
- All Dynamic Variable {TOKENS} will be replaced by their values calculated at that moment

When Dynamic Variable tokens will be inserted into the OpCon Job Master, it becomes important to assess whether any international language considerations might affect the translation of the { } curly brackets that mark each {TOKEN}. This should usually not be a problem. However, the IBM i Agent makes it possible to designate alternate characters that should be used to enclose a Dynamic Variable {TOKEN}. This is done using the Agent sub-menu 3, option 7. Before making this change, SMA encourages users to contact SMA Support for a consulting session, so that SMA technical experts can help assure that the decision to change and the new token characters chosen can be used successfully. The Agent's specification of the default character translation tables (or CCSID values) for EBCDIC and ASCII characters can figure into the final choice of characters, depending on where Dynamic Variable tokens will be used in the job start requests.

## Dynamic Variables with OpCon External Event Commands

OpCon External Event commands, explained in the [Event Management](../events-utilities/external-events.md) section and in the separate **Concepts** documentation, can be executed by Captured Data Response Rules (and by LSAM Message Management Parameter records). The LSAM Utilities menu option 1, as well as a set of IBM i-format commands (that are installed with the LSAM software), can also be used to directly request that OpCon execute one of its External Event Commands.

Among the set of the OpCon External Event Commands that are supplied with the LSAM software, only the CPYTOMSGIN general-purpose command is able to support and translate Dynamic Variable tokens. (The other, older Event Commands, such as JOBADD, listed on the LSAM menu function display, are supported by a different command processor program that does not recognize Dynamic Variable tokens.) This is one reason why the CPYTOMSGIN command is the preferred method for configuring the LSAM automation tools to execute OpCon External Event Commands. 

A Dynamic Variable token can occur anywhere within the CPYTOMSGIN command, that is, anywhere within the long, single command parameter keyword CPYMSGIN( ). Examples of using Dynamic Variables with the CPYTOMSGIN command are provided below, in the Screens and Windows section of this topic.
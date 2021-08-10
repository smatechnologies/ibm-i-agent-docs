---
lang: en-us
title: Dynamic Variables
viewport: width=device-width, initial-scale=1.0
---

# []{#aanchor13} Dynamic Variables 
Important information about the definition and application of Dynamic
Variables is also presented in the description of the SETDYNVAR command,
in this section, and in Screens and Windows, below.

 

The LSAM database includes a variable field definition table file with
two variable types that can be used for many purposes. Dynamic variables
of type L are used to update the stored LDA content for tracked, queued
or captured jobs. Dynamic variables of type V are used to update the job
parameters of any job submitted to the LSAM by OpCon. The type V
variables are also supported by various fields of Spool File Scan Rules
and of Captured Data Response Rules, as well as by other LSAM functions
(documented within other topics of this online help). Each of these
variable field definitions has a token name to identify them, but the
token name of type L variables must match either the job name of tracked
and queued jobs or the captured job ID of captured jobs.

 

Dynamic variable values are always applied to a job at the last moment
before the LSAM submits the job for execution. When the LSAM debug
logging function is turned on, the submitted job log file (option 4 in
the LSAM\'s log file viewer menu) will report on actions performed by
dynamic variables. It is possible to see in that log file the updated
LDA content and also the before- and after-versions of the SBMJOB
command string.

 

Similarly, dynamic variables used with Captured Data Response Rules are
interpreted at the time when data is captured, for example, as the
SCANSPLF command is executing or as Operator Replay screen data or
Message Management data is being captured. As each data element is being
stored to the Captured Data log file, the system checks for Captured
Data Response Rules to process. Dynamic variables may be part of the
comparison rule that allows a Captured Data Response to be executed, and
they can also comprise all or part of the command that is executed.

 

Regardless of the purpose of the dynamic variable, the value inserted to
replace the LSAM\'s dynamic variable can be either a fixed value that is
stored in the dynamic variables master file record or it can be a value
produced by a user-defined program that has been registered in the
dynamic variable\'s master record. When the fixed value approach is
used, that fixed value may actually be updated at any time by the
LSAM\'s SETDYNVAR or SETCAPVAR commands. These commands present some
interesting possibilities.

 

It is possible, for example, to use a separately scheduled OpCon job or
the pre-run command line of an OpCon job for IBM i to execute the
SETDYNVAR command just before another job is executed that will depend
on that dynamic variable. It is also possible to include OpCon property
tokens in the VALUE parameter of the SETDYNVAR command so that a value
calculated by OpCon can be passed along to the LSAM, and the final
result is that a job executing under IBM i can have its behavior
controlled by virtually any OpCon property.

 

Separate from the value controls that apply to all dynamic variables,
the dynamic variable type field determines how the value is applied to
attributes of a job.

 

Dynamic variables of type L are used specifically for updating the
stored LDA contents associated with a tracked, queued or captured job.
This type of variable must use the Tracked (or Queued) Job Name or the
Captured Job ID as the Variable Name in the dynamic variable master
file. There are dynamic variable parameters used only for this type of
variable that specify the location and length of the LDA content that
should be updated. The other dynamic variable type V cannot be used to
update LDA contents, and the start position and length fields cannot be
used with type V variables.

 

Dynamic variables of type V can be used, among other purposes, to update
any part of the total command string that the LSAM uses to submit jobs.
This means that, depending on how and where a job is being defined (that
is, by using OpCon job master records or by using the Capture Job
function and maintenance), it is possible all command parameters may be
optionally included, or just the values of single command parameter may
be updated. It is also possible to modify the content of the submitted
job\'s command line using type V dynamic variables.

 

To use type V dynamic variables, the Variable Name value is enclosed
within a pair of designated control characters to form a token. This
token is inserted anywhere in the submitted job\'s command line. At the
point where the LSAM has assembled the total SBMJOB command, it performs
a scan for any dynamic variable tokens and then replaces those tokens
with the value produced by the dynamic variable. (The processing of
dynamic variables used with Capture Data Response Rules is described in
[Operator Replay Scripts](Operator-Replay-Scripts.md#top){.MCXref
.xref}, in [Message Management](Message-Management.md#top){.MCXref
.xref}, and elsewhere in this Events and Utilities menu in relation to
the SCANSPLF command.)

 

The special characters used to make tokens out of type V dynamic
variables are specified in the LSAM\'s Job Tracking configuration
function, from the LSAM menu system. In most cases, it should not be
necessary to modify these characters. A single pair of curly brackets {}
have been chosen as the default control characters for dynamic variable
tokens because this convention permits the dynamic variable token to
pass transparently through the different property (variable, token)
replacement logic used by OpCon. The LSAM Events and Utilities menu
option 7: LSAM Utility configuration provides a means to change these
characters in order to accommodate translation table conflicts that
might arise in some countries where rules that work well for English or
other Western language translation tables may not apply.

## Dynamic Variable General Rules and Suggestions

Examples of where dynamic variables may be used are offered throughout
this online help in each topic. There is more information about dynamic
variables in the Screens and Windows section of this topic. Here are
some general rules and suggestions to keep in mind when planning to use
Dynamic Variables:

-   Dynamic Variables and the tokens derived from them are different
    from the Variables/Tokens used in Operator Replay scripts. These two
    different LSAM variable types are used for different purposes as of
    this version of the LSAM, and they cannot be interchanged. However,
    it is possible to transfer values from Dynamic Variables to Operator
    Replay Tokens.
-   The dynamic variable type of L is used exclusively to update the
    local data area (LDA) contents associated with tracked, queued or
    captured jobs. Dynamic variables of type L replace data in the LDA
    based on the starting position and length fields specified in the
    dynamic variable master record. These two numeric fields apply only
    to type L variables and then cannot be used for type V variables.
    For dynamic variables of type L, the Variable Name must be either
    the Captured Job ID of a captured job, or the IBM i Job Name of a
    tracked or queued job.
-   The dynamic variable type of V cannot be used to update LDA content.
    Instead, this variable type is used to define tokens that can be
    inserted into the job definition parameters or the call command
    string of a captured job. Type V dynamic variables may have any
    meaningful name. One purpose for dynamic variable tokens is to
    insert them into the capture job definitions using the WRKCAPJOB
    function. However, there also exist many other uses for dynamic
    variable tokens.
-   It is possible for dynamic variable tokens to appear, for example,
    in the Call command string of any batch job submitted by OpCon. This
    is made possible by the rules of LSAM dynamic variables that are
    different from the rules for OpCon variables/tokens made from OpCon
    properties. OpCon job processing recognizes a pair of dual straight
    or curly brackets: \[\[name\]\] or {{name}} as an OpCon variable,     but it ignores the single pair of curly brackets: {VARNAME} that is
    used to build an LSAM dynamic variable token.
-   All dynamic variable value substitution processing for submitted
    jobs is performed by a sub-procedure of the LSAM job scheduler
    server program. Value substitution takes place as a last step just
    before the SBMJOB command string is actually executed to start the
    job. The only variation to this method is that dynamic variables
    will also be honored by the LSAM procedures that support an operator
    manually releasing a job that was held for tracking or queuing.
-   There are four ways to specify the value used for a dynamic
    variable:
    -   A fixed value may be specified in the VALUE field of the dynamic
        variable master record.
    -   A user-defined program may be specified in the dynamic variable
        master record. In this case, if the user-defined program is not
        found at run time, a specified fixed value will be used as the
        default in place of the program-supplied value. User-defined
        programs must accept and return at least one character string
        parameter of any length from 1 to 128 characters. (The name of
        the Dynamic Variable is also provided as parameter 2, and in
        parameter 1 the current value of the Dynamic Variable is sent to
        the user-defined program.) If the user-defined program returns
        all blanks in the value parameter, the blanks will be accepted
        as the value and the effect of this is that the dynamic variable
        token will be removed from its location in the command string
        and the command string will be compressed to remove the
        left-over spaces.
    -   The LSAM command SETDYNVAR may be used to add a new dynamic
        variable or to change any of the existing parameters that define
        a dynamic variable. Typically, this command could be used to set
        the fixed value of the dynamic variable just before the variable
        is used (The SETDYNVAR command parameters are defined under the
        next major heading of this topic, below).
    -   Captured Data Response Rules support naming a Dynamic Variable
        that will be used to store the value of the currently captured
        data, from either Operator Replay screen capture or the SCANSPLF
        command Scan Rules. These rules also make reference to Dynamic
        Variable tokens in their Response Command field and their
        comparison data fields.
-   An excellent use of the LSAM command SETDYNVAR would be to execute
    this command in a separate job of an OpCon schedule, just before
    executing the job that depends on a dynamic variable. Similarly, the
    SETDYNVAR command can be specified as the pre-run command for an
    OpCon job sent to IBM i.
-   An interesting application of the SETDYNVAR command used in OpCon
    job definitions would be to insert an OpCon property token into the
    command string where the SETDYNVAR VALUE parameter is specified.
    This would allow any property value computed by OpCon to be
    transmitted to the LSAM, where it could then become part of a job\'s
    LDA content, used as a SBMJOB command parameter value or used to
    modify the Call command string of the job. Here are examples of how
    the command could be set up to utilize OpCon properties:

## Using Dynamic Variables with Agent Automation Tools

Dynamic Variables are a powerful and flexible type of variable value
stored in an LSAM table file that may be used with many LSAM features,
including the definition of submitted jobs. A Dynamic Variable can be
either a type L used for updating the LDA (local data area) associated
with an IBM i job, or it can be a type V that is a general purpose
variable represented by a token. The token is the name of the Dynamic
Variable enclosed within a pair of curly brackets {} (or another
reserved value, as specified in the LSAM Utilities configuration at LSAM
sub-menu 3, option 7). For example, a Dynamic Variable named \"SCANVAL\"
would be represented by the token {SCANVAL}.

 

Dynamic Variables are discussed in detail in this topic. There is also
an explanation of how variable values can be set by the Captured Data
Response Rules in one of the sub-sections above about the response
rules. Important information about defining Dynamic Variables is offered
below, within the topic of Maintaining Dynamic Variables.

 

The following sections explain how the type-V Dynamic Variables can be
used with the SCANSPLF utility and with Captured Data Response Rules.
Inserting Dynamic Variables where they are supported adds flexibility to
SPLF Scan Rules and Captured Data Response Rules. It becomes possible
for these rules to automatically adapt to circumstances that arise
during execution time. For example, the Response Rules may choose
different commands to execute based on the content of captured data,
resetting a Dynamic Variable to one value or another, before another
Response Rule is executed that would use the Dynamic Variable value as
part (or all) of its response command.

### Dynamic Variables with SCANSPLF and SCANOUTQ

The SPLF (spool file) Scan Rules that support the SCANSPLF and SCANOUTQ
commands permit entry of Dynamic Variable tokens in the Scan Value
field. This option is supported by the special value of \*RULES in the
PARAMETERS keyword of both commands. Dynamic Variables are also
supported by several of the command parameters (although not in the
PARAMETERS keyword; refer to the Fields tables for both commands, above,
for a list of supported parameters). This would allow the scan value and
other command parameters to be changed dynamically as prior steps in a
process are executed.

 

When adding or changing a SPLF Scan Rule record, function key \<**F8**\>
may be pressed while the cursor is in the Scan Value field to view a
list of Dynamic Variables. One of the available Dynamic Variables can be
selected from the prompt window and it will be inserted at the exact
position of the cursor. This technique is also helpful to discover the
correct syntax for naming a Dynamic Variable token. Since the Utility
Configuration function (LSAM menu 3, option 7) supports changing the
separator characters used for Dynamic Variables (NOT recommended!), it
could be important to make sure that the correct characters are being
used for the token. In case the Dynamic Variable has not yet been stored
into the LSAM table, the anticipated variable name can still be used as
long as the correct pair of separator characters surrounds the variable
name.

 

Dynamic Variable tokens can be used in some of the parameter fields of
the SCANSPLF and SCANOUTQ commands (for fields that support Dynamic
Variables -- the IBM i command prompting includes \"DVar\" in the list
of values for most of these parameters). It is necessary that the full
{TOKEN} fits into the space allowed for each parameter keyword. Two
positions must be reserved for the Dynamic Variable token special
characters (except for the four SCANOUTQ parameters where a dynamic
variable is named to store spool file ID values), so a parameter field
that supports a value length of 10 would limit the size of the token
name to only 8 characters (plus 2 for the special characters that make
the name a token). This limitation must be kept in mind whenever Dynamic
Variable names are being defined.

### Dynamic Variables with Captured Data Response Rules

Captured Data Response Rules allow Dynamic Variables to be specified
either for the Response Command field or for the Compare data lines. In
either field a Dynamic Variable can be all or just part of the value of
the field.

 

When adding or changing a Captured Data Response Rule record, function
key \<**F8**\> may be pressed while the cursor is in one of the two
supported fields to view a list of Dynamic Variables. One of the
available Dynamic Variables can be selected from the prompt window and
it will be inserted at the exact position of the cursor.

 

It is important to understand that the response rule module stores the
captured data value into the named variable before the response command
is evaluated or executed. This makes it possible to rely on the captured
value as part of the decision to determine whether a rule should be
executed. This also implies that the variable named in the response rule
record could be used in the response command in order to include the
value of the data captured by the associated automation tool.

 

  -------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [Older versions of the IBM i LSAM (before October of 2012) used to evaluate the Compare and Reference data values before deciding if captured data should be stored into an optionally named Dynamic Variable. However, this logic was changed using the Agent\'s software patching tools due to the overwhelming user response that the captured data should be available from a Dynamic Variable {TOKEN} to be used effectively for a majority of response rule use cases. This change also improved the forensic evidence in the Agent\'s log files that proves the outcome of an automated decision.]
  -------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### Dynamic Variables with Message Management

More information about the possible use of Dynamic Variable {TOKENS}
with Message Management Parameter master records is documented within
the Message Management chapter of this Agent User Help. Token
replacement is supported, for example, in the Event command line and
also as the value used to Reply to a message.

 

Message Management also uniquely utilizes a Dynamic Variable to store
the number of instances that a Parameter record has been selected for
use as part of the optional Threshold processing.

 

As for the SCANSPLF utility described above, Message Management
Parameters can be optionally linked to a Message Capture Definition, and
by that means, to any number of Captured Data Response Rules, also
explained above.

### Dynamic Variables with Operator Replay

More information about the possible use of Dynamic Variable {TOKENS}
with Operator Replay Script Step master records is documented within the
Operator Replay chapter of this Agent User Help. Token replacement is
supported, for example, in the String to Send, the Function Key and the
branching logic Script Name and/or Step Label.

 

As for the SCANSPLF utility described above, Operator Replay Script
Steps can be optionally linked to a Screen Capture Definition, and by
that means, to any number of Captured Data Response Rules, also
explained above.

### Dynamic Variables with OpCon Job Start Requests

In addition to the obvious Variables tab of an OpCon Job Master record,
where Agent Dynamic Variable names are used as destinations for storing
values provided by the OpCon application server, Dynamic Variable
{TOKENS} can be inserted into some of the job master definition fields.
The prerun command field and the main Call command field are the most
common places where the variable tokens can be inserted. Some of the
other job master record fields can also be specified by using Dynamic
Variable tokens.

 

Whenever the IBM i Agent\'s Job Scheduling server spots a Dynamic
Variable {TOKEN} anywhere within the incoming job start request, it will
perform the following actions before using the job request data to
assemble an IBM I SBMJOB request:

-   Variable tab table entries are loaded with values provided by the
    OpCon application server
-   If a SETDYNVAR command appears in the prerun command line, it will
    be immediately executed
-   All Dynamic Variable {TOKENS} will be replaced by their values
    calculated at that moment

When Dynamic Variable tokens will be inserted into the OpCon Job Master,
it becomes important to assess whether any international language
considerations might affect the translation of the { } curly brackets
that mark each {TOKEN}. This should usually not be a problem. However,
the IBM i Agent makes it possible to designate alternate characters that
should be used to enclose a Dynamic Variable {TOKEN}. This is done using
the Agent sub-menu 3, option 7. Before making this change, SMA
encourages users to contact SMA Support for a consulting session, so
that SMA technical experts can help assure that the decision to change
and the new token characters chosen can be used successfully. The
Agent\'s specification of the default character translation tables (or
CCSID values) for EBCDIC and ASCII characters can figure into the final
choice of characters, depending on where Dynamic Variable tokens will be
used in the job start requests.

### Dynamic Variables with OpCon External Event Commands

OpCon External Event commands, explained in the [Events Screens and Windows](Events-and-Utilities-Menu.md#Events2)
section and in the separate **Concepts** online help, can be executed by
Captured Data Response Rules (and by LSAM Message Management Parameter
records). The LSAM Utilities menu option 1, as well as a set of IBM
i-format commands (that are installed with the LSAM software), can also
be used to directly request that OpCon execute one of its External Event
Commands.

 

Among the set of the OpCon External Event Commands that are supplied
with the LSAM software, only the CPYTOMSGIN general-purpose command is
able to support and translate Dynamic Variable tokens. (The other, older
Event Commands, such as JOBADD, listed on the LSAM menu function
display, are supported by a different command processor program that
does not recognize Dynamic Variable tokens.) This is one reason why the
CPYTOMSGIN command is the preferred method for configuring the LSAM
automation tools to execute OpCon External Event Commands.

 

A Dynamic Variable token can occur anywhere within the CPYTOMSGIN
command, that is, anywhere within the long, single command parameter
keyword CPYMSGIN( ). Examples of using Dynamic Variables with the
CPYTOMSGIN command are provided below, in the Screens and Windows
section of this topic.

## Numeric versus Character Dynamic Variables

By default, when a new Dynamic Variable is added to the master table of
the IBM i Agent\'s DB2 database, its name and {TOKEN} are considered to
represent a simple character string of up to 128 characters in length.
Also by default, the value that replaces a token is considered to occupy
only the length from position 1 through the last non-blank character
produced for the token value.

 

These default assumptions make it very easy to add and use Dynamic
Variables as part of any automation configuration. For many cases, no
special configuration effort is required to define a variable.

 

However, Dynamic Variables can be adapted to a broad array of
applications by manually defining the Dynamic Variable master record
master record in advance of its use. This can be best completed by using
the Agent\'s green screen menu system and using the Work with Dynamic
Variable function that appears on almost every Agent sub-menu.

 

The Dynamic Variable definition attributes (master record fields) can
change the way a variable value will be processed. For example,
designated numeric variables can be manipulated by, and used in
mathematical computations and comparisons. The distinction between a
character string variable and a numeric variable is important to observe
because it can affect both how variable values are computed and then how
the final resulting value string is edited or formatted, as it replaces
a token. More detail about these interactions is provided under the
following detailed information about variable functions and
applications.

### Defining Numeric Dynamic Variables

To define a Dynamic Variable as numeric, set the NUMSIZ keyword of the
SETDYNVAR command to a value greater than zero (which stores this
formatting attribute in the Dynamic Variable master record). This
Numeric Size attribute can also be set using the LSAM menu maintenance
program to add or change a Dynamic Variable master record. The presence
of a numeric size tells the LSAM to handle the current variable value as
a number. This means that the LSAM will store both positive and negative
values. The LSAM uses special rules when returning a numeric value to
replace a Dynamic Variable Token.

 

A numeric variable supports using the SETDYNVAR command VALUE( ) keyword
content to increase or decrease an existing value, instead of just
replacing the value. To indicate a change in value, start the VALUE
content with a plus (+) or a minus (-) sign. Additional implications and
applications of using numeric variables and controlling numeric
formatting are provided in the Dynamic Variable application examples,
below.

### Using Numeric Compression with Dynamic Variables

The SETDYNVAR command supports a parameter labeled CMPNUM (\"compress
numeric\") that tells the SETDYNVAR command program to store only
numeric digits, or integers (0 - 9) that are contained in the VALUE
parameter. This CMPNUM parameter is used only during the process of
storing the VALUE that is provided as the SETDYNVAR command is executed.
The setting of the CMPNUM parameter in this command is not a setting
that is stored with the Dynamic Variable definition, although the actual
value stored shows the effect of numeric compression.

 

It is the CMPNUM parameter of the SETDYNVAR command that is utilized by
the LSAM\'s Captured Data Response Rules, that is, whenever a Dynamic
Variable name was specified for the \"Store to \--\>\" field on a
Response Rule master record. As the Response Rule is executing the
process to store a captured value to the indicated Dynamic Variable, the
LSAM routine checks for the Compress Numeric parameter on the Response
Rule and then it sets the CMPNUM parameter of the SETDYNVAR to match.

 

The most important purpose of the Compress Numeric function is to store
valid numeric values in a Dynamic Variable master record that is marked
as a numeric variable (by specifying a non-zero Numeric Size). The
Dynamic Variable value update routines will not accept non-numeric data
as a valid value for updating this type of variable, except for the
special +/- and Date or Time math operation codes used to increase or
decrease a Dynamic Variable value.

 

When using numeric variables, keep in mind that although numeric
compression prevents anything except numeric digits to be stored in the
value field, this does not cause a Dynamic Variable to be defined as
numeric. Compressed digits are only stored as a simple character string,
just like any other Value content, unless the Dynamic Variable is
separately defined as numeric.

 

Another principle to remember is that numeric variables store their
digital values as a contiguous string of only the digits 0 -- 9. The
value field does not store any formatting characters and it also does
not store a separate character that represents the position of an
optional decimal point. (Decimal positions are represented by a separate
sub-field on the variable master record that is used primarily for
formatting the way a numeric value is presented when it replaces a
token.)

#### Numeric Compression to Protect External Event Command Syntax

Another important purpose for supporting compression of numeric data is
to eliminate the commas that are typically found in monetary amount
values, such as when a financial report total has been captured from a
report by the SCANSPLF command. OpCon Event commands using the pre-XML
syntax do not allow the comma character to appear within any of the
parameter values for the Event commands, since the comma is reserved to
separate Event command parameters, so any commas in a monetary amount
field must be eliminated before that value could be included in some
message Event command that is sent to OpCon SAM for distribution.

 

Consider the example where the initial value of the Dynamic Variable is
being set to a US\$ monetary amount, as: \$123,456.78. Numeric
compression is used so that only the integers 12345678 are stored as the
value of the Dynamic Variable. Thus, when the Dynamic Variable token is
replaced during construction of an email notification about a monetary
amount, there will be no commas in the number that would disable the
OpCon Event command syntax.

 

Related to the compression of numeric data, consider that it would be
difficult for the email reader to interpret what is the actual monetary
value that appears in the email text. In this case, the Dynamic Variable
master record parameters could be defined to re-edit the numeric value
upon retrieval and insert only the \$-sign and the decimal point, so
that the final string returned to replace the Dynamic Variable token
would look like this: \$123456.78

 

In some countries, it would also make sense to insert a period (or other
character allowed by OpCon Event commands) where the comma was
previously located, so that the monetary amount would appear like this:
\$123.456.78

## Application of Dynamic Variable Definition Fields

The purpose of this discussion is to explain how to control the value
that will be delivered by the LSAM Dynamic Variable Value Fetch routine
whenever a Dynamic Variable {TOKEN} is being replaced within an LSAM
function.

### Testing Dynamic Variable Formatting with DSPDNYVAR

It is possible to create test Dynamic Variables and to experiment with
the settings of the variable definition fields using the LSAM command
DSPDYNVAR (described in Commands and Utilities). This command returns
the value of the named Dynamic Variable as a completion message, so the
command is best used from an IBM i interactive workstation session (such
as provided by green screen workstation emulation programs on personal
computers, for example). To set or change a variable definition, use
either the maintenance screens, illustrated in the preceding section of
this topic, or the SETDYNVAR command, illustrated in the Utility
Commands section of this Dynamic Variables chapter, below.

 

The user is encouraged to experiment with setting different variable
definitions until the DSPDYNVAR command returns a value in the format
that is desired for the particular LSAM function where a {DVTOKEN} will
be used. This experimentation is especially important when the variable
will be defined as numeric. Remember that variables of type V must be
used for this type of experiment, but that the variable values will work
the same for type L variables that are used to change the LDA (local
data area) contents of IBM i jobs.

### Trimming Character Values of Dynamic Variables

In older versions of the Agent software, the only way to cut out part of
the value string from a Dynamic Variable would have been to store that
value into an IBM i data area on disk, and then use a variable with a
Function Code of \*DTAARA to retrieve that value. Data Area Dynamic
Variables originally supported specifying a start position and length of
the character string to retrieve from a data area in the DB2 database.

Currently, the former \"LDA Start/Length\" fields label has been
extended to \"Char trim/LDA Str,Len\", implying that a non-numeric
Dynamic Variable can have its value trimmed by a start position and
Length in order to produce the actual value that will replace the
variable\'s {TOKEN} at run time.

 

Character string trimming can only be used for Type-V Dynamic Variables,
since the other Type-L Dynamic Variables already use the Start and
Length fields to control which part of an IBM i Local Data Area should
be updated by the Dynamic Variable\'s value.

If the Char Trim Start value is 3 and its Length is 5, then a Dynamic
Variable VALUE of \'ABCDEFGHIJK\' will be reported at run time as
\'CDEFG\'.

 

This capability becomes more obviously useful when nesting Dynamic
Variable tokens.

#### Controlling Space Character Trimming

Sometimes it is important to keep either leading or trailing space
characters when a Dynamic Variable {TOKEN} is replaced by its value, as
a character string. Type-V Dynamic Variables can manage the Character
Trim Start and Length fields to control whether leading or trailing
space characters are retained or trimmed from the actual value stored in
the Dynamic Variable master record (or returned by a Function Code that
the Dynamic Variable executes) at run time.

 

Use F1=Help from the Change Dynamic Variable maintenance display for a
reminder about the following rules that explain how the Start and Length
fields of Character Trimming can be used for this purpose.

 

The following list of options explains how managing zero or non-zero
values in the Start and Length parameters controls whether leading or
trailing spaces will be included when the variable value replaces its
{TOKEN}. All Start and Length computations are limited by the maximum
size of a Dynamic Variable value character string, which is 128.

-   Start=0, Length=0

The entire Dynamic Variable value will be returned, however, all leading
and trailing spaces will be truncated.

-   Start\>0, Length=0

Any leading spaces, beginning at the Start location, will be included in
the returned value, but trailing spaces will be truncated because there
is no specific length indicated.

 

Use a Start location of 1 to include any characters, including spaces,
starting with the very first position of the 128-character maximum value
length. The last non-blank character will be the end of the value string
used to replace the {TOKEN}.

-   Start=0, Length\>0

Any leading spaces will be trimmed, and the first non-blank character
will be considered the beginning of the character string that will
occupy the full Length of data inserted in place of the {TOKEN}.

 

Use a Length greater than zero to include any trailing spaces, up to the
full Length of the returned value.

 

  -------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [If the default Start plus Length will exceed the limit of position 128 of the value string, then the {TOKEN} replacement will fail and the Agent general-purpose log file (LSALOGF30), plus any optional tool-specific log, will report the reason for the token replacement failure.]
  -------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Start\>0, Length\>0

Specifying both a Start position and a Length will cause any space
characters within that segment of the variable\'s current (or
calculated) value to be included when the {TOKEN} is replaced. This
applies to both leading spaces and trailing spaces.

 

  -------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [If the Start position and Length will exceed the limit of position 128 of the value string, then the {TOKEN} replacement will fail and the Agent general-purpose log file (LSALOGF30), plus any optional tool-specific log, will report the reason for the token replacement failure.]
  -------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### When to Use Character versus Numeric Variables

The basic function of a Dynamic Variable is to deliver a character
string that will replace a Dynamic Variable {TOKEN}. These tokens may
appear as the values for keywords defining a job that the LSAM is
submitting to IBM i on behalf of OpCon, they may be used as field values
within the configuration of certain LSAM features, such as Message
Management and Operator Replay scripting, and they may also be used as
comparison values for the SCANSPLF report scanning utility and the
multi-purpose Captured Data Response Rules.

 

In any case where a token is replaced by a character string, it is
important that the character string is formatted to match the purpose of
that function. Sometimes the character string may represent a value that
includes letters, numbers and maybe also special characters. However,
sometimes the character string must appear to be a numeric value with
specific formatting rules, such as the appearance of a decimal point.
The value used by the LSAM to replace a token is still always a
character string, technically speaking, but when that string is
formatted correctly, it can be interpreted as a numeric value by the
target function.

 

When the LSAM delivers a Dynamic Variable value that is simply a
character string, but not identified as a numeric value, then the length
of the character string is assumed to start with position 1 of the
character string and to end with the last non-blank character. In other
words, it is not possible to specify that trailing blanks should be
considered part of a token\'s value. However, the nature of typical IBM
i programming makes this unimportant because wherever trailing spaces
are important, the overall size of the field where a token value is
placed is being managed by some rule or characteristic of the target
function. Therefore, the LSAM does not specify the length of the token
value, but simply offers a field that is 128 bytes long, within which
the token value is left-adjusted, and the space within this field that
is not filled by specific characters is assumed to be filled with space
characters (hexadecimal: X\'40\').

 

If an LSAM function requires a numeric value to replace a Dynamic
Variable token, then the Dynamic Variable must be carefully defined so
that the character string it delivers will appear to be a number,
possibly including special formatting characters such as a decimal
point, a currency symbol and/or a positive or negative value sign (such
as DR and CR, for accounting purposes, or + and -). The Dynamic Variable
field that indicates the variable is numeric is the field called Numeric
Field Size. If this field is set to zeros (the default), then the
variable is assumed to be a simple character string and all of the
numeric formatting fields are ignored.

 

When a Dynamic Variable has been defined with a numeric field size the
number of decimal places (implied) may also be indicated. A total
numeric field size may not exceed 63 significant digits. The number of
decimal places must be included within the total numeric field size and
it may not exceed the specified field size. When a Dynamic Variable is
numeric, the LSAM stores only the digits of the current numeric value,
including enough trailing digits (even if they are zeros) to represent
the full number of decimal places, and a leading minus sign (-) if the
numeric value was forced to negative. All of the other formatting that
may be used to represent numeric values of different types is applied at
the time when the numeric value is delivered by the LSAM Dynamic
Variable read routine, including insertion of the specified decimal
point character.

 

When the SETDYNVAR command is used to change the value of a numeric
Dynamic Variable, a minus (-) or plus (+) sign may optionally be
included in the VALUE parameter of the command to indicate that a
numeric value should be increased or decreased by the number included in
the VALUE parameter. If no sign is provided, then the SETDYNVAR command
will replace the current numeric value with the new numeric value
provided in the VALUE parameter. Because of this rule, it is not
possible to replace an existing numeric value with a negative value in a
single operation. However, the same result can be accomplished by first
replacing the numeric value with a zero (0) and then using a second
SETDYNVAR command with a leading minus sign (-) in the VALUE parameter.

#### Controlling the Format of Numeric Values

This section explains the fields of a Dynamic Variable that control how
a numeric value will be presented by the LSAM Dynamic Variable read
routine. There is an extreme number of possible variations for numeric
formatting, so the user is encouraged to experiment with a test Dynamic
Variable, using the DSPDYNVAR command to view the results. This
discussion presents some basic rules that will help to anticipate the
result of numeric formatting.

#### Using the LSAM Numeric Edit Fields

The master record that defines each Dynamic Variable supports the
following different aspects of numeric field editing, whenever a
variable has a Numeric Size that is greater than zero:

-   Suppressing leading zeros
-   Specifying the character that represents the decimal point
-   Specifying the character used as a grouping separator
-   Specifying the character and position of a symbol used to indicate a
    negative value
-   Specifying the character and position of a symbol used to indicate a
    positive value
-   Specifying a character and position of a symbol used as a currency
    sign

The choice of using none or any of these numeric editing fields depends
on the application where a Dynamic Variable token will be replaced. To
understand their effect, consider first the default behavior of the LSAM
when only a numeric size of 7 has been specified (with zero decimal
positions). The LSAM, by default, will produce a character string that
represents the entire numeric field size:

-   Value = 1234567
-   Size = 9
-   Output = 001234567

If the definition is changed to imply 2 decimal places, and the default
value of a period (.) is assumed for the decimal place, then the output
will appear as:

-   Output = 0012345.67

To remove the leading zeros, change the value of Suppress Leading Zeros
to a \'1\':

-   Output = 12345.67

The value above would appear if there were no Grouping Separator code,
or if the Grouping Separator code were set to \'B\' (a special value
used to mean \"none\"). To insert grouping separators of the whole
numbers, set the Grouping Separator to a value such as the default value
of a comma (,). Using a comma as the grouping separator would change the
output to appear as:

-   Output = 12,345.67

If the variable value is forced to a negative value, using the same
accumulated rules as above, here is the internal and external
representation of the value when the negative sign controls are left at
their default values:

-   Internal data = -1234567
-   Output = -12,345.67

Notice that in the previous output, when the value was positive, there
was no sign present because the default controls indicate to use no sign
for a positive value. However, a positive value could be represented
according to a report\'s standard accounting format using the following
example rules:

-   Positive value symbol = CR
-   Positive symbol location = A (after)
-   Positive symbol relative position = 2
-   Output = 12,345.67 CR

In the example above, the relative position of 2 causes one space to be
inserted between the last digit of the number and the beginning of the
positive symbol. A relative position value of 1 would result in no
spaces between the numbers and the symbol.

 

When adding a currency sign to this last example, there is a choice of
how to position the currency sign. The currency sign will always be
located before the number when LSAM rules are used. To put a currency
sign after a number, choose an IBM RPG user-defined Edit Code and use
the CRTEDTD command to build an edit definition that will place the
currency sign after the number.

 

The default choice for using a currency sign is to Float the sign to the
left of the most significant digit. The number of spaces between the
most significant digit and the symbol may be specified.

-   Currency symbol = \$
-   Currency symbol location = F
-   Currency symbol relative position = 2
-   Output = \$12,345.67 CR

The currency symbol position of 2 imposes 1 space between the symbol and
the most significant digit. Use a value of 1 if no space is desired.

 

On some financial reports the currency symbol is located in a fixed
position relative to the decimal point of financial amounts, and the
decimal point is also always located at a fixed position on the report.
For example, if allowance must be made for a number in the millions (7
whole integers) plus one space, then the currency symbol\'s fixed
position should be set to 9 (7 digits + 1 space + the character position
which is always considered position 1). In the following example, the
asterisk (\*) character is used in the output illustration only to show
the count of spaces between the currency symbol and the first digit;
assume that the colon represents space characters:

-   Currency symbol location = . (period)
-   Currency symbol relative position = 12
-   Output = \$\*\*\*\*\*12,345.67 CR
-   (actual appearance = \$12,345.67 CR)

Notice that there are 5 asterisks representing 5 space characters. This
result happens because there are already six positions to the left of
the decimal point that are occupied by numeric digits and the Grouping
Separator character.

##### When to Use Numeric Editing Fields

In summary, choose the numeric formatting rules that will be required by
the LSAM function where the Dynamic Variable token is being replaced.

 

For example, a data element might have been captured by an LSAM tool
such as Operator Replay scripting, the SCANSPLF command or the Message
Management message text capture. If the captured numeric value was
controlled by setting the Compress Numeric flag on in the LSAM\'s data
capture rule, then the numeric string would be stored internally in the
LSAM Captured Data Log file as a series of numeric digits without any
other characters. All signs, including decimal points, commas, negative
value symbols or currency symbols, would have been removed, but any
leading zeros would have been retained. In this case, to match an LSAM
Dynamic Variable with the Captured Data element, it would be important
to let the LSAM return its simplest default format for a numeric field,
such as: 001234567.

 

However, if the numeric value of a Dynamic Variable will be used in a
message sent to a human reader, then it will probably be important to
apply the numeric field editing rules so that they produce a number in
the format expected by the reader. Remember, though, that if a Dynamic
Variable token is used in an OpCon External Event command, commas are
not allowed in the numeric editing because they would interfere with the
Event Command parameter syntax.

 

One other important use of Dynamic Variables is to store a counter that
is being incremented in different steps. The counter may be compared to
a threshold value, such as used with LSAM Message Management. In this
case, it is not important whether there are leading zeros or no leading
zeros because it is the actual numeric values that will be used in the
threshold check routines. For thresholds there are no decimal places
allowed, so it is important that zero decimal places are specified for
the counter variable. Finally, the negative sign could be important, in
case a counter is ever being decreased and could go lower than zero. In
that case, it might be important that the default negative sign be
presented by the LSAM Dynamic Variable read routine when retrieving the
counter value, because a negative (-2) must never be considered equal to
a positive threshold value of 2.

##### Support for Special Numeric Editing: User-defined Variable Values

The master record that defines Dynamic Variables supports a flexible set
of numeric edit codes, but there may be special formatting desired, such
as engaging IBM\'s user-defined edit codes (values 5 - 9). In this case
it would be necessary to specify a user-defined program to return the
correctly formatted value.

#### Controlling the Content of Character String Variables

This section explains the special edit codes that can be used to escape
or eliminate problem characters that may be stored in the value of a
Dynamic Variable. These codes do not work as specified here when the
Dynamic Variable is marked as a numeric data type, using the Numeric
Field Size and Decimal Places fields.

 

As described above under the topic of Captured Data Response Rules, it
is possible to capture single quotes and commas as part of a character
string. However, these two characters can cause problems with other LSAM
functions, as follows:

-   **Single Quotes**: Single quotes included in captured data, such as
    message text, green screen workstation displays or reports, can
    prevent storage of captured data into Dynamic Variables. The single
    quote interferes with delimiting character strings in IBM i command
    parameter values. This problem may also occur in other functions
    that may replace a Dynamic Variable token with its character string
    value.

```{=html}
<!-- -->
```
-   **Commas**: If a comma is included in the value of a dynamic
    variable it can interfere with the syntax of OpCon Event commands
    whenever that dynamic variable is included as one of the command
    parameter values. At this time, commas are reserved characters in
    OpCon Event commands that are used to separate the command
    parameters.

##### Preventing Special Character Errors

Single quotes and commas can be escaped or replaced by specifying one of
the following reserved values in the COMMA parameter of the SETDYNVAR
command, or in the \"Group separator; chr ed\" field of Dynamic Variable
master record maintenance (which is the same field that is updated by
the COMMA command parameter).

 

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

## User-defined Programs for Replacing Dynamic Variable Values

When a program is specified for a Dynamic Variable, the LSAM will call
that program at run time during the process of replacing the Dynamic
Variable token with its actual value (or when preparing the string to
use for updating a job\'s LDA (local data area)). Consider the various
rules that affect how user-defined programs will be used, as described
in the Fields table above under VALUE and also USRPGM.

 

Following is the RPG program logic used by the LSAM to call a
user-defined value calculator program for Dynamic Variables. Specify
input (\*ENTRY) parameters in the user-defined program to match:

 

Eval UsrLibPgm = %trim(VUSRLIB)

\+ \'/\' + %trim(VUSRPGM)

Call UsrLibPgm

Parm VTOKVAL UsrValue *(128 characters)*

Parm WkVarNam UsrVarNam *(12 characters)*

 

A model CL program that conforms to these requirements is provided in an
example box below, under the topic of fetching DB2 database values.

 

The technical definition for developing a compatible user-defined
program is simple: The program must be able to accept at least one
non-constant parameter that is 128 characters in length, but best
practice indicates that both parameters should be defined. The program
interface may be described either as an ILE prototype procedure call or
as an OPM external program call with parameters.

 

The first parameter is for the value of the Dynamic Variable. The LSAM
will pass the existing value of the Dynamic Variable in this first
parameter. The called program may choose to ignore the initial value, or
it may be designed to manipulate the input value that was provided.
Regardless of the input value, the LSAM will process whatever value is
contained within this same parameter after the user-defined program
ends. Remember, the rules described for the VALUE field in the table
above that apply if blanks are returned by the called program.

 

The second parameter (which should be specified as a constant input
parameter) is 12 characters in length. This parameter will contain the
name of the Dynamic Variable, useful in case a single program might
serve multiple different Dynamic Variables of a similar content type.

 

Remember that when user-defined programs are called by the Dynamic
Variable value calculation routines, the user-defined program could
receive a raw numeric value as a string of integers, including any
leading negative sign. The user-defined program may or may not need to
read the LSAM master record that defines the Dynamic Variable to
determine the number of implied decimal places included in a numeric
string. However, to avoid dependencies on the LSAM file structure (which
could change), it might be best to include control over the number of
decimals places within the user-defined formatting program.

 

Consider also the two topics below about managing numeric values, when
it is necessary to store and retrieve numeric values to/from Dynamic
Variables.

## Dynamic Variable Function Codes

### What is a \"Function Code\" for LSAM Dynamic Variables?

The \"Value calc pgm\" field of an LSAM Dynamic Variable master record
is also used by the LSAM to support special values that govern how the
value for a Dynamic Variable will be prepared when it will replace a
Dynamic Variable {TOKEN}. The Value Calc Pgm field label shows its
alternative purpose by this label: \"/Fn Code.\" This means \"Function
Code,\" and it refers to the unique functions of Dynamic Variable value
replacement whenever a special value beginning with an asterisk (\*) is
entered into this field.

 

  -------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [At this time, when a Function Code is used in the Value Calc Pgm field, the Value Calc program library field is ignored. The library name field may be used for additional modifiers of a Function Code in future versions of the LSAM software.]
  -------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

The special function codes that can be entered into the Value Calc Pgm
field include:

#### Function Codes that use a second definition display:

-   **\*DTAARA**: The dynamic variable {TOKEN} will be replaced by the
    contents of a DB2 data area that is defined in page 2 of dynamic
    variable maintenance. The original value stored in the Value field
    of the dynamic variable master record is returned whenever the
    specified data area cannot be found at run time. Preset the dynamic
    variable Value field so that fetch errors can be detected at run
    time.
-   **\*DB2** : The dynamic variable {TOKEN} will be replaced by the
    contents of a DB2 table column value that is defined in page 2 of
    dynamic variable maintenance, using SQL search criteria. The
    original value stored in the Value field of the dynamic variable
    master record is returned whenever the specified SQL query fails to
    fetch the specified DB2 value. Preset the dynamic variable Value
    field so that fetch errors can be detected at run time.
-   **\*DATE**: The stored Value string will be formatted as a date
    value, using page 2 of Dynamic Variable maintenance. The value will
    also support date math (adding or subtracting years, months or
    days).

#### Function Codes that do not use a second definition display:

-   **PGM (+ LIB) name**: This original use of the Value Calculator
    Program/Library fields is discussed in a separate section.
-   **\*TIME**: The stored Value string will be managed as a time value
    (with or without time string edit characters), supporting optional
    time math (adding or substracting hours, minutes or seconds).
-   **\*SYSVAL**: The dynamic variable name must match a valid IBM i
    system value, and the current system value will be used to replace
    the dynamic variable {TOKEN} at run time. The name of the system
    value to be retrieved must be entered into the Function Code Field
    2, to the right of the Function Code value. (This is the field that
    is alternately used for the Library name of a user-defined Value
    Calculator Program.) The value returned by this special function is
    a program API value, not always formatted in the same way as
    displayed by the IBM i command DSPSYSVAL. Experimentation is
    required to adapt the API return value to an appropriate use. Use
    the LSAM command DSPDYNVAR to test how any system value will be
    presented when the {TOKEN} is replaced.
-   **\*HEX**: This Function Code replaces a temporary LSAM utility
    command called SETHEXDV, for the purpose of storing and retrieving
    low-level hexadecimal characters. These are characters that are
    mostly those used for formatting text such as an email text message
    that needs to separate the content into paragraphs. The \*HEX
    Function Code controls how the Agent Dynamic Variable token
    replacement module manages the stored value characters. It also
    controls how the DSPDYNVAR value test command behaves, and how the
    Work with Dynamic Variables option 2=Change or option 5=Display will
    show the stored value.

### \*DATE Function Code with Reformatting

Dynamic Variables that store date values can be transformed into many
different edited or unedited formats using the \*DATE option supported
by the Dynamic Variable master record field called [Value Calculator Program Name]{.ul}.

 

  -------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **IMPORTANT:** [\*DATE reformatting can only be performed if a Dynamic Variable is defined in advance using green screen maintenance.]
  -------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------

#### User Instructions

Type \*DATE into the Value Calculator Program Name field. After Enter is
pressed, a second maintenance screen appears, offering a pre-defined
selection of FROM and TO date formats. Type a 1 next to the format that
describes the date value that was originally captured and stored into
the Value of the Dynamic Variable. Optionally, type a 2 next to the
format that the LSAM should return when it replaces the {TOKEN} of the
Dynamic Variable.

 

There is also a (0) zero option column. Type a zero next to either or
both of the 1=FROM and/or 2=TO selections, if either field does not
include punctuation characters. For example, if the captured date
represents May 4, 2017, the typical USA format of this date would be
either 05/04/17 or 05/04/2017. But if the date was captured as 050417 or
05042017, then it is necessary to type the 0 next to the 1=FROM format,
so that the LSAM knows there are no slash characters.

 

Similarly, if the replacement value provided for the token should NOT
include punctuation characters, then type a 0 in the FMT0 column next to
the 2=TO format.

 

A very common use for this feature is to translate a common date format,
such as 05/04/2017 into an \*ISO-0 format: 201790504. This is the format
that is required if date values are going to be compared as GT, LT, GE
or LE. When using EQ or NE, it is possible to used punctuated date
character strings, but those cannot be used for Greater- or Less-Than
Boolean comparisons.

#### Date Format Usage Notes and Hints

-   If the captured date was in punctuated ISO format (for example,
    2017-05-04), then it is not necessary (nor possible) to use \*DATE
    reformatting. Instead, just specify the \"compress numeric\" option
    when storing the date value, either in the SETDYNVAR command or when
    configuring a Response Rule.
-   The \*DATE reformatting cannot be specified for a numeric Dynamic
    Variable unless the 1=FROM format is also marked for FMT-0. This is
    prevented by the Dynamic Variable value update program, because a
    numeric Dynamic Variable will not allow a punctuated date character
    string to be stored as its Value. To use both the punctuated date
    and the all-numeric date, create two different Dynamic Variable
    master records. Store or capture the punctuated format of the date
    into a character-format Dynamic Variable. Then, store the punctuated
    date value into the \*DATE numeric-format Dynamic Variable using one
    of two methods:
    -   Use the SETDYNVAR command where the Value parameter will contain
        a Dynamic Variable {TOKEN} that names the character Dynamic
        Variable and be sure to specify CMPNUM(Y) in the SETDYNVAR
        command parameters.

    ```{=html}
    <!-- -->
    ```
    -   If the original, punctuated date is captured data, use a Capture
        Data Response Rule to store the captured value into the numeric
        Dynamic Variable by specifying a value of \"Y\" in the Response
        Rule \"CompNum\" field.
-   It is possible to specify only the 1=FROM value to indicate what is
    the format of the current date in the variable\'s VALUE field, and
    not use the 2=TO reformatting option. Using this configuration is a
    way to isolate the dynamic variable so that date math can
    (optionally) still be used on the VALUE as it was originally stored,
    and no other changes will be made at run time. For example, if the
    date of November 13, 2017, was originally stored in the \*USA format
    of 11/13/17, date math can be performed on this value to change it
    to the same date in the previous month: 10/13/17, and then the
    changed value will be used to replace the variable {TOKEN} at run
    time, still in the mm/dd/yy format.
-   Date formatting characters can be removed from a date value without
    being forced to change the order and size of the date elements.
    Instead of relying on the FMT0 option of the Dynamic Variable date
    conversion, use the \"compress numeric\" function of the SETDYNVAR
    command parameter, called CMPNUM. It is also possible to specify
    \"compress numeric\" in Captured Data Response Rules, which governs
    how a captured data element will be stored into a Dynamic Variable.
-   Remember that the date math function depends on an accurate
    specification of the 1=FROM (current) date format for the VALUE
    stored in the Dynamic Variable table. If a date value was stored
    without formatting characters, then the 1=FROM date format must also
    be followed by a '0\' typed under the \'FMT\' column on page 2 of
    the Dynamic Variable Maintenance screen.
-   Since Dynamic Variable date formatting rules can only be specified
    using the LSAM green screen maintenance program, it is necessary to
    define \*DATE Dynamic Variables using manual maintenance (or an LSAM
    data Export/Import action) before the variable can be used in
    automation rules.
    -   The automatic creation of missing Dynamic Variable master
        records by the SETDYNVAR command does not support specification
        of formatting details for \*DATE or any other special function
        codes. It only supports general formatting of numeric Dynamic
        Variables.
    -   The automatic creation of missing Dynamic Variable master
        records by the Captured Data Response Rules supports no
        specification of any formatting -- it only adds a character-type
        Dynamic Variable and its Value.
-   It is common practice to store a single numeric or date value into
    more than one Dynamic Variable to support multiple formats for the
    same captured date value. One format might be used to include the
    date in an email notification message, while an unformatted date in
    \*ISO0 format is often the best format to use for comparing date
    values (in Captured Data Response Rules, or in Step qualification
    rules within either Operator Replay Scripts or Multi-Step Job
    Scripts). Refer to the \"Use Case for Nested Dynamic Variable
    Tokens\" (below) for additional perspective on the application of
    multiple date Dynamic Variables.

### \*TIME Function Code

A function code of \*TIME does not change how the recorded time Value
for a Dynamic Variable will be offered as the Dynamic Variable {TOKEN}
is replaced. However, using this Function Code makes it possible to
perform Time Math, increasing or decreasing the time value by using the
special Value operation codes described below.

When a Dynamic Variable is designated as a \*TIME variable, the LSAM
programs recognize and preserve the value separators provided by the
user in the Value field of the Dynamic Variable master record. The only
supported \*TIME separators are:

-   (.) = a period
-   (,) = a comma
-   (:) = a colon
-   unformatted = 6 digits only

The LSAM always assumes that the time value is comprised of six digits:
HHMMSS (unformatted), or for example: HH.MM.SS. Thus, a \*TIME value
must be a formatted time value that uses separator characters and
occupies exactly 8 bytes of the VALUE field, or else it must be an
unformatted time value that occupies only 6 bytes of the VALUE field and
all 6 bytes must be numeric digits (a leading zero is required for hour
values less than 10).

### \*DATE and \*TIME math

Dynamic Variables support a simple plus (+) or minus (-) value
adjustments that can be used whenever the Numeric field size is set. But
simple math is usually not useful for managing calendar date values. For
\*DATE type Dynamic Variables there are additional Value operation codes
that can be used to perform DATE and TIME math operations, to advance or
retard either a date or a time value. The Dynamic Variable must have a
Function Code of either \*DATE or \*TIME for this type of math value
setting to work.

 

For both \*DATE and \*TIME variables, the largest number that can be
used to change any segment of the value is 4 digits. Values from 1 to
9999 can be valid, but the actual value used should take into
consideration the dramatic effect on the date or time that will happen
if an extremely large number is used.

 

For \*DATE variables, the Date math operators are these:

+Y9999  or  -Y9999

+M9999      -M9999

+D9999      -D9999

 

\...where Y=years, M=months and D=days.

 

For \*TIME variables, the Time math operators are these:

+H9999  or  -H9999

+M9999      -M9999

+S9999      -S9999

 

\...where H=hours, M=minutes and S=seconds.

 

If a Date or Time value needs to be adjusted by a combination of its
segments, such as 4 hours and 20 minutes, the adjustment can be made by
either pre-calculating the total number of minutes, or by executing the
SETDYNVAR command twice - once for each value to be changed.

SETDYNVAR   \...    VALUE(\'+M20\')

 

Notice that the VALUE string must be enclosed in single quotes.

 

It is possible to use a Dynamic Variable {TOKEN} for any or all parts of
a Data or Time math setting, for example:

 

SETDYNVAR \... VALUE(\'+M{NBROFMONTHS}\'

### \*SYSVAL Function Code

A function code of \*SYSVAL indicates that the Dynamic Variable name is
the actual name of an IBM i System Value that should be retrieved and
presented in place of the {TOKEN}.

 

Examples of System Value names include QDATE (the current system date),
which is often used to feed another Dynamic Variable with a Function
Code of \*DATE, so that the IBM i partition\'s system date can be
reformatted.

 

Refer to the topic about nested Dynamic Variable tokens, below, for an
example of using a System Value {TOKEN} as the Value of another Dynamic
Variable.

 

  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [In previous patch levels of the IBM i LSAM software, it is required that the Dynamic Variable name itself must match a valid system value name. However, that rule prevented the ability to apply varying formats to the same system value. Any existing Dynamic Variables that conformed to the original rule will still be supported, until the next time that Dynamic Variable Maintenance is used to change or copy these older variables, at which time the data entry edits will enforce the new rule. Dynamic Variable names may still match IBM i system value names, but now the value retrieval routines will ignore the name of the Dynamic Variable whenever the Function Code Field 2 is not blank for a \*SYSVAL Function Code.]
  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

  -------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **IMPORTANT:** [The system values returned to the Dynamic Variable token replacement module, using an IBM i API, often differ in format from the values that appear on an interactive workstation when using the DSPSYSVAL command. Use the LSAM DSPDYNVAR command (or option 6 in the list of Dynamic Variables) to test a \*SYSVAL Dynamic Variable before using it in production. Dynamic Variable reformatting, and/or nesting of the \*SYSVAL {TOKEN} can be used to trim and/or reformat the system values for use in LSAM automation functions.]
  -------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### \*HEX Function Code

This Function Code replaces a temporary LSAM utility command called
SETHEXDV, for the purpose of storing and retrieving low-level
hexadecimal characters. The documentation section below that describes
the SETHEXDV command also explains how Dynamic Variables that were
created with this command can be converted to conform to the upgraded
\*HEX Function Code format.

 

The \*HEX Function Code controls how the Agent Dynamic Variable token
replacement module manages the stored value characters. It also controls
how the DSPDYNVAR value test command behaves, and how the Work with
Dynamic Variables option 2=Change or option 5=Display will show the
stored value.

 

\*HEX Dynamic Variables are used to insert non-display control
characters into OpCon automation tools such as the External Event
command for sending email. The Agent utility command CPYTOMSGIN may
include a {TOKEN} that is replaced by the true hexadecimal value stored
in the referenced Dynamic Variable with Function Code \*HEX.

 

For example, a Carriage Return character could be used to improve the
appearance of email messages by adding blank lines between paragraphs of
the email message text.

 

\*HEX Dynamic Variables are restricted to accept only new values
specified in the format X\'hh\', where \'h\' is a valid character used
to represent a nibble (half byte) of a character in the computer data
format of the hexadecimal numbering system.

 

Characters representing hex values are limited to \'0 - 9\' and/or \'A -
F\'. For example, the Carriage Return control character is represented
in this EBCDIC data format: X\'0D\'.

### \*DTAARA Function Code

Before the official designation of multiple Function Codes for Dynamic
Variables, there was a prototype method for fetching data from a DB2
data area that was based on users modify a model program provided by
SMA. With the new Function Code method it is much easier to define DB2
value fetch rules by using the second page of Dynamic Variable
Maintenance to define the name, location and character string trimming
rules that will fetch and format the Value returned for a \*DTAARA
{TOKEN}.

#### Trimming Data Area Values

When \*DTAARA is specified for the Dynamic Variable Function Code, the
second display format will be format R7, with fields that can be used to
name the data area and its library location. The only other values that
can be defined for data areas are the trim control numbers. A starting
location and a length value can be typed. If both fields are left at
zero, the value returned for the Dynamic Variable token will be the
first 128 characters of the data area.

 

  -------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **HINT:** To fetch more than 128 characters from a big data area, use additional Dynamic Variables with the \*DTAARA function code, then enter a Trim Start number that is higher than 128 for the additional Dynamic Variables. To utilize the longer total string of data, enter two or more {TOKENS} in any LSAM automation tool fields that can support more than 128 characters.
  -------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

If either of the Trim control fields is set to a non-zero value, the
other field could be left set to zero with the following results:

-   Start = 1, Length = 0: The whole data area, up to 128 bytes.
-   Start = 0, Length = \>0: The trim will start with byte 1, then
    include only as many characters as the Length specifies.

### \*DB2 Function Code

Before the official designation of multiple Function Codes for Dynamic
Variables, there was a prototype DB2 method for fetching data from a DB2
database table that was based on users modify a model program provided
by SMA. With the new Function Code method it is much easier to define
DB2 value fetch rules by using the second page of Dynamic Variable
Maintenance to define the SQL query components that will fetch the Value
returned for a \*DB2 {TOKEN}.

 

  -------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** The old DB2 program-based method is still supported for any existing configurations, and the user instructions for the old method have been retained below, following the new method instructions.
  -------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

Following are instructions for configuring the \*DB2 SQL query
definitions, including options for each field in page 2 of Dynamic
Variable Maintenance and some important rules and hints that make this
feature more flexible. There are also some important constraints.

#### \*DB2 (New Method) User Instructions and Hints

##### Logging of SQL Statements and Errors

When experimenting with the \*DB2 function code, view the contents of
the LSAM general purpose log file LSALOGF30 to find images of SQL
statements and any error messages that explain why an SQL statement did
not work. The LSAM sub-menu 6, option 5, log viewer 4 can be used to
view this log. Log entries marked \"DQ:\" will show the SQL statement
that was constructed, and entries marked \"DE:\" show any error messages
that will usually explain what was wrong with the SQL statement.

##### Management of Dynamic Variable Auxiliary Data

The \*DB2 and \*DTAARA function codes use a second page of Dynamic
Variable Maintenance to define the data fetch rules. These optional
extensions of the Dynamic Variable master record are stored in an
auxiliary record master file.

 

Whenever a Dynamic Variable master record is deleted, any associated
auxiliary record will be retained in the database. This function makes
it possible to easily recover a complex SQL statement, because the link
to the DB2 access definition will be restored whenever the same Dynamic
Variable name (and matching Sequence number, for type-L) is added back
to the master file using the Add or Copy functions.

##### Use of Dynamic Variable {TOKENS} in the \*DB2 Access Definitions

All the long character fields in the Dynamic Variable auxiliary table of
\*DB2 Access Definitions can support translation of Dynamic Variable
tokens. This works because the IBM i LSAM Dynamic Variable token
replacement module is capable of handling nested tokens (where the value
for one token could be another token).

 

This capability might make the DB2 Access Definitions more flexible, not
only by allowing for replaceable tokens within the WHERE\... SQL
clause(s), but also by allowing the field/col, library and file/table
fields to be made variable.

 

Whenever Dynamic Variable tokens are used within a \*DB2 Access
Definition record, it is critical that the programs or rule set (such as
the LSAM Captured Data Response Rules) must have set values for those
Dynamic Variables BEFORE the current Dynamic Variable (that has this
\*DB2 Access Definition) is used in a command or rule.

 

While maintaining \*DB2 Access Definitions, fields that support Dynamic
Variable tokens will cause a list of registered Dynamic Variable names
to appear in a pop-up window when the function key F8=DynVar is pressed
while the cursor is located with the field. If F8 does not produce a
selection window while the cursor is in a field (such as the Trim
rules), then that field does not support translation of a Dynamic
Variable {TOKEN}.

##### Adding a DB2 Table (File) Access Definition

When the Function Code \*DB2 is specified, the second display format for
Dynamic Variable Maintenance will be format R6, with fields that can be
used to identify the table data and also the SQL WHERE clause that will
select the appropriate row from the table.

 

The combination of data entry fields used must result in a valid SQL
statement. Some constraints of this rule are explained under each field
description below. Be sure to notice instructions below for the
alternate \*WHERE data entry method that can be used to format complex
SQL query.

 

Any SQL statement constructed must result in only a single value being
fetched from the database table. The cause of this constraint is that
the value will be placed into the single, 128-character Value field used
to replace a Dynamic Variable {TOKEN}. This means, for example, that it
is not possible to specify more than one column from a table, unless a
complex SQL statement will concatenate the multiple values into a single
string that is the data set returned from the SQL statement.

 

  -------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **HINT:** To fetch multiple columns as a single value, the SQL keyword CONCAT must be used in the SELECT field/col field to join more than one column (and/or character string) from the table(s) being queried. The CONCAT operator formats the final result of the query into a single string.
  -------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

Traditional DB2 database libraries, files and field names were limited
to 10 characters. However, this display format allows for more data in
case SQL naming rules are being used. The longer fields also allow for
some SQL modifiers to be used with the column (field) name.

###### \*DB2 Display Field Descriptions

Refer to additional information about Work with Dynamic Variables in the
Screens and Windows section towards the end of this Dynamic Variables
chapter.

 

SELECT field/col:

This field on the screen can be used to name the column (field) of data
from the table. SQL modifiers such as UPPER( ) can be used around the
field name.

 

Since the SQL query result will be placed into a 128-character host
program field, any selection of numeric, date or time values must be
modified by the SQL CHAR( ) keyword, so that the non-character data can
be placed into a character field. The LSAM maintenance program puts the
prompt of \"CHAR(numeric/date/time)\" into the field/col field when
display format R6 is offered in its Create (Add) mode, as a reminder of
this constraint.

 

\*WHERE special value:

The SELECT field/col field supports a special value of \"\*WHERE\" that
tells the LSAM Dynamic Variable value calculators to ignore all the
field/col, library and file/table values. This special value indicates
that the \*DB2 SQL query will be entirely contained within the large
WHERE\... field in the lower half of the display. This means that the
WHERE\... field content must typically start with the SELECT keyword
that begins an SQL query.

 

FROM library:

Except for \*WHERE rules, type the name of the IBM i library where the
file/table is located. This field can be left blank, but that tells the
SQL query engine to find the file/table in the library list of the
current job. Keep in mind that frequently, the current job will be an
LSAM server job, so that job\'s library list will be limited to the LSAM
environment library list (plus the SYS library list values). So the best
practice is to always specify a library name or a Dynamic Variable token
in this field.

 

FROM file/table:

Except for \*WHERE rules, type the name of the IBM i table or file that
will be queried for a value. This field supports use of a Dynamic
Variable token instead of an actual file name, as long as that token
will be replaced by a valid file name at run time.

 

WHERE\...:

This is the field for typing in SQL clauses. If the special value of
\*WHERE is typed into the SELECT field/col field, then the entire SQL
query statement must be typed into this field. Otherwise, the more
common use might be to specify the field/col, library and file/table
values, and in that case this WHERE\... field would start with the SQL
keyword \"WHERE\" in order to specify the selection rules that will
isolate the specific row in a table that should produce the desired
field/column value.

 

It is possible to include many different combinations of SQL clauses,
either before or after the expected WHERE keyword. The only limits are
these:

-   The combination of pre-defined fields from the top of the display
    with the WHERE field content, must result in a valid SQL statement
    (after any Dynamic Variable tokens are replaced).
-   The auxiliary master record can only hold up to 880 characters to
    define the WHERE clause (or a whole SQL statement). The maximum size
    of the SQL statement supported within the LSAM query program is 2048
    bytes, which may help to support a longer statement after any
    Dynamic Variables are replaced.

The Trim Start and Length values work as described above, under the Data
Area topic, except that for \*DB2 definitions, the rules apply to the
final, possibly CONCATenated Value string that is fetched from the data
base.

##### \*DB2 Hints and Suggestions

###### *Test DB2 Access Definitions Using the DSPDYNVAR Command*

When listing Dynamic Variables from the LSAM menu options, the display
option 6=DSPDYNVAR works the same as using the LSAM command DSPDYNVAR
from an IBM i command line. The value that would result from replacing a
token based on a given Dynamic Variable will be displayed in the message
line at the bottom of the workstation display.

 

Whenever the desired value for a \*DB2 Access Definition does not
produce the desired value, or it produces an error code, more
information about the SQL statement that was produced and any error
messages can be easily displayed from the LSAM log file LSALOGF30, as
described above. Log entries marked \"DQ:\" will show the SQL statement
that was constructed, and entries marked \"DE:\" show any error messages
that will usually explain what was wrong with the SQL statement.

###### *Preset Dynamic Variable Values When Using \*DB2 Access Definitions*

The Value field for a Dynamic Variable will not be updated whenever a
user-defined value calculator program or any Function Code such as \*DB2
is used.

 

Instead, whenever a Dynamic Variable {TOKEN} is replaced, the actual
results of the \*DB2 access will be provided as the replacement value,
if the query was successful. When the query is not successful, the
existing value that was previously stored in the Dynamic Variable master
record will be provided instead.

 

This suggests that the best practice is to store an initializing value
into the Dynamic Variable master record before the {TOKEN} of that
variable will be replaced by some subsequent use of the token. A value
such as \"Not Found\" or \"SQL error\" could be stored in the record, so
that when there is a failure of the SQL query, the value used to replace
the {TOKEN} will be the predefined error message which is easily
recognized. The DSPDYNVAR test command can be used to demonstrate this
result. For example, LSAM Captured Data Response Rules could test for
the predetermined initialization value, and then they will recognize
when the Dynamic Variable token was not correctly replaced. This could
prevent an unfortunate operation during subsequent automated steps.

#### How Numeric Compression Is Managed for \*DB2

The concept of \"numeric compression\" in the IBM i LSAM means that a
value string will be cleared of all characters except for numeric
digits, and then the digits will be compressed to remove blank space, so
that the final result is a numeric string that can be used, for example,
to update the value of a Dynamic Variable that has been marked as
numeric (by having a non-zero numeric field size set in the Dynamic
Variable master record).

 

For Dynamic Variables that are marked as numeric, the LSAM module that
manages the SQL queries of \*DB2 Access Definitions will always perform
the numeric compression subroutine before returning a value in place of
that Variable\'s token. This protects the LSAM programs from failure to
operate as expected when Dynamic Variables, and possibly Captured Data
Response Rules are performing mathematical operations.

 

This characteristic of the \*DB2 Access Definitions processor resembles
the effect of specifying CMPNUM(Y) in the SETDYNVAR command, or using
the similar Compress Numeric function when a Captured Data Response Rule
is storing captured data into a numeric Dynamic Variable.

### Old Method for Fetching Values from the DB2 or Data Areas

The following documentation is retained for the benefit of users who had
already employed the old method. However, SMA strongly recommends using
the newer Dynamic Variable \*DB2 Function Code method, as documented
just before this section.

 

SMA had provided a utility program that makes it possible to fetch field
values from any file and library in the DB2 database and return them as
the value for a Dynamic Variable token. This utility program called
DYNVARSQLR requires an interface program, such as the model CL program
provided by SMA called DYNVARSQLC.

 

The model CL program is documented in an example box, below. Licensed
users of the IBM i Agent software are permitted to copy and adapt this
model program as necessary. The model program illustrates the program
parameters required to use this program as the \"User value calculator
program\" specified in a Dynamic Variable master record. (This strategy
of engaging the user-defined program method was an interim solution for
fetching DB2 values, until SMA implemented the newer \*DB2 Function Code
as part of the Dynamic Variable master file record.)

 

The model CL program contains two different examples for fetching data
from the DB2 database. The first example shows how to configure the
parameters required by the database file reading utility program,
DYNVARSQLR. This model is used to get one field value from any file in
any DB2 library, using an SQL \"WHERE\" clause to specify the record
selection criteria. The second example shows how to use the CL program
itself for the simpler operation of fetching data from a DB2 data area.
Both examples also illustrate how to extract a sub-string (a limited
portion) of the data that is retrieved from a file or a data area.

 

When adapting the model CL program for each Dynamic Variable, it is only
necessary to include the basic program parameters and only as much logic
as may be needed for any given Dynamic Variable. For example, when
fetching a data area value, it is not necessary for the CL program to
include any of the database file logic, or to set up the parameters
required for an SQL fetch of a database file field.

 

Users are also welcome to develop their own programs, of any style or
type, to fetch or compute values for Dynamic Variables. The model CL
program and the compiled SQL file fetch program are provided for the
convenience of the Agent software administrators.

 

The source code of the model CL program includes helpful documentation
that should make it easier to understand how the program works.

 

Whenever the model CL program and/or the called utility database fetch
program encounter an error, the value parameter for the Dynamic Variable
will not be changed; it will be returned in the same format as was
provided when the user-defined program was called by the Dynamic
Variable token replacement module. This suggests that, in some cases, it
might be helpful to preset certain Dynamic Variables to a predetermined
value that, if returned, would indicate there was a problem with
fetching the desired value. This technique would be helpful when Dynamic
Variables are being used with Captured Data Response Rules, if a
separate Rule or Rules are allocated to exception processing that is
engaged whenever the dynamic variable token has been returned with the
initial value.

#### Using Numeric Compression with Database Values

Note that both examples in the model CL program also illustrate how to,
optionally, engage \"numeric compression\" whenever a numeric value is
retrieved from a database file or a data area. Numeric compression
removes all characters except the digits. The Dynamic Variable
formatting rules for numeric data can then be applied to the fetched
value, so that the final data replacing a Dynamic Variable token will
have a predictable format. (Refer to more about numeric compression,
below.)

 

Remember to define the Dynamic Variable as a numeric variable whenever
the numeric formatting rules will be applied.

 

However, numeric compression can be used with values that will be
handled as a character string, even though the data may actually be
comprised of only numeric digits. If any other special formatting of a
numeric value is required, one option is to call another user-defined
program that will reformat a numeric value into the desired final
format, and then that edited value will be returned to the Dynamic
Variable (to replace the dynamic variable token) in the (max)
128-character value parameter field.

#### Using the DYNVARSQLR Utility Program to Fetch Database File Fields

The goal of the SQL file fetch utility program DYNVARSQLR is to simplify
the process of creating a user-defined program that can fetch almost any
field value from any file in any DB2 library. (Special field types, such
as BLOB fields, are probably not compatible with Dynamic Variables.)

 

Regardless of the data field size, the maximum length of data that can
be stored (and returned) by a Dynamic Variable is 128 characters. When
the value being retrieved from a database file field could be longer
than 128 characters, the first 128 characters will be used by default
unless the Start and Length parameters sent to program DYNVARSQLR are
used to define the portion of the field value that should be returned.

 

The 256-byte SQL \"WHERE\" clause parameter is intended to deliver the
file record selection logic to the utility program. However, this field
may also contain any other SQL clauses that are allowed to be used with
a standard SELECT operation (as illustrated below). Other clauses may be
combined with the WHERE clause as long as they do not conflict with SQL
SELECT statement rules.

 

In the following example of the SQL statement syntax, the WHERE clause
is not automatically included, but must be typed by the author of the
actual CL program that will prepare the WHERE clause.

 

+----------------------------------+----------------------------------+
| ![White pencil icon on green     | **EXAMPLE:** [SQL statement      | | circular                         | format processed by DYNVARSQLR   |
| background](../../../Reso        | program:]{.statement2}           |
| urces/Images/example-icon(48x48) |                                  |
| .png "Example icon") | SELECT CHAR(field) FROM          |
|                                  | library/file                     |
|                                  |                                  |
|                                  | WHERE \... *+ other optional SQL |
|                                  | clauses\...*                     |
+----------------------------------+----------------------------------+

 

The utility program is capable of handling a multi-value data set, if
that is the result of the SELECT statement and the WHERE clause.
However, in any case, the utility program will return only one value.
This means that if the WHERE clause (whether amplified by other clauses
or not) defines a set of data, only the first value in the set will be
returned. This logic could be used to good advantage. For example, if
the WHERE clause cannot determine what is the lowest or highest value in
the current data set, then an ORDER BY clause will assure that either
the lowest or the highest value will be returned. (The current style of
the utility program does not allow for specialty SQL keywords such as
MAX( ) on the field name. In part, this fixed format of the SELECT
statement helps prevent hacking with UPDATE statements.)

 

If the utility program fails, it will log messages in the LSALOGF30 LSAM
log file (viewed from LSAM sub-menu 6, option 5, log viewer 4) and to
the QSYSOPR message queue. It will also return an error code in the
ERROR parameter. When an error occurs, the utility program will leave
the Value field untouched; that is, the Value parameter will be returned
without any change to its initial value.

 

The utility program is capable of handling a multi-value data set, if
that is the result of the SELECT statement and the WHERE clause.
However, in any case, the utility program will return only one value.
This means that if the WHERE clause (whether amplified by other clauses
or not) defines a set of data, only the first value in the set will be
returned. This logic could be used to good advantage. For example, if
the WHERE clause cannot determine what is the lowest or highest value in
the current data set, then an ORDER BY clause will assure that either
the lowest or the highest value will be returned. (The current style of
the utility program does not allow for specialty SQL keywords such as
MAX( ) on the field name. In part, this fixed format of the SELECT
statement helps prevent hacking with UPDATE statements.)

 

If the utility program fails, it will log messages in the LSALOGF30 LSAM
log file (viewed from LSAM sub-menu 6, option 5, log viewer 4) and to
the QSYSOPR message queue. It will also return an error code in the
ERROR parameter. When an error occurs, the utility program will leave
the Value field untouched; that is, the Value parameter will be returned
without any change to its initial value.

 

+----------------------------------+----------------------------------+
| ![White pencil icon on green     | **EXAMPLE:** [DYNVARSQLC model   | | circular                         | CL program source code (shown in |
| background](../../../Reso        | multiple pages):]{.statement2}   |
| urces/Images/example-icon(48x48) |                                  |
| .png "Example icon") |                                  |
|                                  |                                  |
|                                  | /\*\                             |
|                                  | *\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\ |
|                                  | *\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\ |
|                                  | *\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\ |
|                                  | *\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*/ |
|                                  |                                  |
|                                  | /\*                              |
|                                  |                                  |
|                                  |                              \*/ |
|                                  |                                  |
|                                  | /\*  OBJECT:                     |
|                                  | DYNVARSQLC                       |
|                                  |                              \*/ |
|                                  |                                  |
|                                  | /\*  AUTHOR:                     |
|                                  | GL                               |
|                                  |                              \*/ |
|                                  |                                  |
|                                  | /\*  DATE..:                     |
|                                  | 07/28/2019                       |
|                                  |                              \*/ |
|                                  |                                  |
|                                  | /\*  DESC..: Model CL program    |
|                                  | for user-defined Dynamic         |
|                                  | Variables  \*/                   |
|                                  |                                  |
|                                  | /\*                              |
|                                  |                                  |
|                                  |                              \*/ |
|                                  |                                  |
|                                  | /\*\                             |
|                                  | *\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\ |
|                                  | *\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\ |
|                                  | *\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\ |
|                                  | *\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*/ |
|                                  |                                  |
|                                  | /\*  CHANGE                      |
|                                  | LOG:                             |
|                                  |                              \*/ |
|                                  |                                  |
|                                  | /\*  BY           CHG_ID         |
|                                  | DATE       D                     |
|                                  | ESCRIPTION                   \*/ |
|                                  |                                  |
|                                  | /\* \-\-\-\-\-\-\-\-\--          |
|                                  | \-\-\-\-\-\-\--                  |
|                                  | \-\-\-\-\-\-\-\-\--              |
|                                  | \-\-\-\-\-\-\-\-\-\-\-\-\-\      |
|                                  | -\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-- |
|                                  | \*/                              |
|                                  |                                  |
|                                  | /\*  GL     US004149 07/29/2019  |
|                                  | ORIGINAL                         |
|                                  | PROGRAM                  \*/     |
|                                  |                                  |
|                                  | /\*                              |
|                                  |                                  |
|                                  |                              \*/ |
|                                  |                                  |
|                                  | /\*\                             |
|                                  | *\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\ |
|                                  | *\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\ |
|                                  | *\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\ |
|                                  | *\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*/ |
|                                  |                                  |
|                                  | /\*                              |
|                                  |                                  |
|                                  |                              \*/ |
|                                  |                                  |
|                                  | /\*  COPYRIGHT (C)               |
|                                  | 2019  SMA.  All rights           |
|                                  | reserved.               \*/      |
|                                  |                                  |
|                                  | /\*                              |
|                                  |                                  |
|                                  |                              \*/ |
|                                  |                                  |
|                                  | /\*  SMA grants a limited right  |
|                                  | to licensed users                |
|                                  | of              \*/              |
|                                  |                                  |
|                                  | /\*  this software to copy and   |
|                                  | adapt this model program only    |
|                                  | for  \*/                         |
|                                  |                                  |
|                                  | /\*  the purpose of implementing |
|                                  | automation by OpCon and its      |
|                                  | Agent\*/                         |
|                                  |                                  |
|                                  | /\*                              |
|                                  | software.                        |
|                                  |                              \*/ |
|                                  |                                  |
|                                  | /\*                              |
|                                  |                                  |
|                                  |                              \*/ |
|                                  |                                  |
|                                  | /\*\                             |
|                                  | *\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\ |
|                                  | *\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\ |
|                                  | *\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\ |
|                                  | *\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*/ |
|                                  |                                  |
|                                  | /\*  INSTRUCTIONS for            |
|                                  | use:                             |
|                                  |                              \*/ |
|                                  |                                  |
|                                  | /\*                              |
|                                  |                                  |
|                                  |                              \*/ |
|                                  |                                  |
|                                  | /\*    Copy this model program   |
|                                  | to a new source member           |
|                                  | name.       \*/                  |
|                                  |                                  |
|                                  | /\*                              |
|                                  |                                  |
|                                  |                              \*/ |
|                                  |                                  |
|                                  | /\*    LIBRARY/FILE :            |
|                                  | FIELD\...                        |
|                                  |                              \*/ |
|                                  |                                  |
|                                  | /\*    Change the hard-coded     |
|                                  | comparison of the Dynamic        |
|                                  | Variable   \*/                   |
|                                  |                                  |
|                                  | /\*    name and also the         |
|                                  | library, file and field          |
|                                  | values.          \*/             |
|                                  |                                  |
|                                  | /\*                              |
|                                  |                                  |
|                                  |                              \*/ |
|                                  |                                  |
|                                  | /\*                              |
|                                  |  LIBRARY/DATA_AREA\...           |
|                                  |                              \*/ |
|                                  |                                  |
|                                  | /\*    Change the hard-coded     |
|                                  | comparison of the Dynamic        |
|                                  | Variable   \*/                   |
|                                  |                                  |
|                                  | /\*    name and also the         |
|                                  | RTVDTAARA command                |
|                                  | parameters.            \*/       |
|                                  |                                  |
|                                  | /\*                              |
|                                  |                                  |
|                                  |                              \*/ |
|                                  |                                  |
|                                  | /\*    Adapt the error           |
|                                  | management code as               |
|                                  | desired.                \*/      |
|                                  |                                  |
|                                  | /\*                              |
|                                  |                                  |
|                                  |                              \*/ |
|                                  |                                  |
|                                  | /\*    Delete parts of the model |
|                                  | program that will not be         |
|                                  | used.   \*/                      |
|                                  |                                  |
|                                  | /\*                              |
|                                  |                                  |
|                                  |                              \*/ |
|                                  |                                  |
|                                  | /\*    Compile the new version   |
|                                  | of the program to a user         |
|                                  | library.  \*/                    |
|                                  |                                  |
|                                  | /\*                              |
|                                  |                                  |
|                                  |                              \*/ |
|                                  |                                  |
|                                  | /\*    Set the Dynamic Variable  |
|                                  | user-defined value               |
|                                  | calculator     \*/               |
|                                  |                                  |
|                                  | /\*    program and library in    |
|                                  | the Dynamic Variable master      |
|                                  | record, \*/                      |
|                                  |                                  |
|                                  | /\*    and/or specify the        |
|                                  | USRPGM(library/program)          |
|                                  | parameter in the\*/              |
|                                  |                                  |
|                                  | /\*    SETDYNVAR                 |
|                                  | command.                         |
|                                  |                              \*/ |
|                                  |                                  |
|                                  | /\*                              |
|                                  |                                  |
|                                  |                              \*/ |
|                                  |                                  |
|                                  | /\*    In case of error, view    |
|                                  | error(s) logged to file          |
|                                  | LSALOGF30,  \*/                  |
|                                  |                                  |
|                                  | /\*    which can be viewed from  |
|                                  | LSAM sub-menu 6, option 5,       |
|                                  | log    \*/                       |
|                                  |                                  |
|                                  | /\*    viewer 4: Submitted job   |
|                                  | log. Look for entries of type    |
|                                  | DE: .\*/                         |
|                                  |                                  |
|                                  | /\*                              |
|                                  |                                  |
|                                  |                              \*/ |
|                                  |                                  |
|                                  | /\*\                             |
|                                  | *\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\ |
|                                  | *\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\ |
|                                  | *\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\ |
|                                  | *\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*/ |
|                                  |                                  |
|                                  | /\*  Program DYNVARSQLR          |
|                                  | parameters:                      |
|                                  |                              \*/ |
|                                  |                                  |
|                                  | /\*                              |
|                                  |                                  |
|                                  |                              \*/ |
|                                  |                                  |
|                                  | /\*   &DVVALUEX (129) = The      |
|                                  | 128-character value followed by  |
|                                  | \'X\'.  \*/                      |
|                                  |                                  |
|                                  | /\*   &DVNAME (12) = The Dynamic |
|                                  | Variable name asking for a       |
|                                  | value.\*/                        |
|                                  |                                  |
|                                  | /\*   (LIBRARY) (10) = The       |
|                                  | library where a DB2 file is      |
|                                  | located.   \*/                   |
|                                  |                                  |
|                                  | /\*   (FILE) (10) = The name of  |
|                                  | the file to query with           |
|                                  | SQL.       \*/                   |
|                                  |                                  |
|                                  | /\*                       Also   |
|                                  | supports special value           |
|                                  | \'\*COMPRESS\' \*/               |
|                                  |                                  |
|                                  | /\*                       that   |
|                                  | is used for numeric compression  |
|                                  | of \*/                           |
|                                  |                                  |
|                                  | /\*                       a      |
|                                  | value retrieved from a data      |
|                                  | area.     \*/                    |
|                                  |                                  |
|                                  | /\*   (FIELD) (10) = The name of |
|                                  | the field to retrieve with       |
|                                  | SQL.  \*/                        |
|                                  |                                  |
|                                  | /\*   &DVWHEREX (257) = An SQL   |
|                                  | WHERE clause followed by \'X\'.  |
|                                  | The  \*/                         |
|                                  |                                  |
|                                  | /\*                     WHERE    |
|                                  | keyword must be included to      |
|                                  | specify \*/                      |
|                                  |                                  |
|                                  | /\*                     record   |
|                                  | selection rules.                 |
|                                  | Other/additional  \*/            |
|                                  |                                  |
|                                  | /\*                     SQL      |
|                                  | syntax is allowed if it may      |
|                                  | follow the\*/                    |
|                                  |                                  |
|                                  | /\*                     primary  |
|                                  | SELECT phrase but only the       |
|                                  | first  \*/                       |
|                                  |                                  |
|                                  | /\*                     value    |
|                                  | will be returned in any          |
|                                  | case.       \*/                  |
|                                  |                                  |
|                                  | /\*                              |
|                                  |                                  |
|                                  |                              \*/ |
|                                  |                                  |
|                                  | /\                               |
|                                  | *                            The |
|                                  | primary SQL phrase               |
|                                  | is:         \*/                  |
|                                  |                                  |
|                                  | /\*                       SELECT |
|                                  | CHAR(field) FROM                 |
|                                  | library/file    \*/              |
|                                  |                                  |
|                                  | /\*   &QQCMPNUM  (1) =           |
|                                  | Instruction to compress numeric  |
|                                  | values.    \*/                   |
|                                  |                                  |
|                                  | /\*                              |
|                                  |                    VALUES: \'Y\' |
|                                  | = Yes, compress to digits        |
|                                  | only.\*/                         |
|                                  |                                  |
|                                  | /\*                    blank /   |
|                                  | \'N\' = No, perform no           |
|                                  | compression.  \*/                |
|                                  |                                  |
|                                  | /\*                              |
|                                  |                     CAUTION:  If |
|                                  | the field value is all           |
|                                  | char,  \*/                       |
|                                  |                                  |
|                                  | /\                               |
|                                  | *                    compressing |
|                                  | to include only digits           |
|                                  | will    \*/                      |
|                                  |                                  |
|                                  | /\*                    cause a   |
|                                  | blank value to be                |
|                                  | returned.        \*/             |
|                                  |                                  |
|                                  | /\*   &QQERROR   (7) = Blanks    |
|                                  | are returned if there was no     |
|                                  | error. \*/                       |
|                                  |                                  |
|                                  | /\*                    If not    |
|                                  | blank, a meaningful error        |
|                                  | message   \*/                    |
|                                  |                                  |
|                                  | /\*                    should be |
|                                  | sent to QSYSOPR or other         |
|                                  | user.   \*/                      |
|                                  |                                  |
|                                  | /\*                    The       |
|                                  | programmer may also add other    |
|                                  | logic    \*/                     |
|                                  |                                  |
|                                  | /\*                    in this   |
|                                  | program if there is an error,    |
|                                  | but  \*/                         |
|                                  |                                  |
|                                  | /\*                    it might  |
|                                  | be better to use the LSAM        |
|                                  | Message \*/                      |
|                                  |                                  |
|                                  | /                                |
|                                  | \*                    Management |
|                                  | facility to detect the           |
|                                  | error    \*/                     |
|                                  |                                  |
|                                  | /\*                    message   |
|                                  | so that IBM i or OpCon Events    |
|                                  | can  \*/                         |
|                                  |                                  |
|                                  | /\*                    easily be |
|                                  | generated. In this model         |
|                                  | program,\*/                      |
|                                  |                                  |
|                                  | /\*                    the       |
|                                  | message ID to trap is CPF9898    |
|                                  | and the  \*/                     |
|                                  |                                  |
|                                  | /\*                    Primary   |
|                                  | message text begins              |
|                                  | with:          \*/               |
|                                  |                                  |
|                                  | /\*                              |
|                                  |                            DYNVA |
|                                  | RSQLC                        \*/ |
|                                  |                                  |
|                                  | /\*                              |
|                                  |                                  |
|                                  |                              \*/ |
|                                  |                                  |
|                                  | /\*\                             |
|                                  | *\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\ |
|                                  | *\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\ |
|                                  | *\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\ |
|                                  | *\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*/ |
|                                  |                                  |
|                                  | PGM     PARM(&DVVALUE &DVNAME)   |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |           DCL      VAR(&DVVALUE) |
|                                  | TYPE(\*CHAR) LEN(128)            |
|                                  |                                  |
|                                  |           DCL      VAR(&DVNAME)  |
|                                  | TYPE(\*CHAR) LEN(12)             |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |          DCL      VAR(&DVVALUEX) |
|                                  | TYPE(\*CHAR) LEN(129)            |
|                                  |                                  |
|                                  |           DCL      VAR(&DVWHERE) |
|                                  | TYPE(\*CHAR) LEN(256)            |
|                                  |                                  |
|                                  |                                  |
|                                  |          DCL      VAR(&DVWHEREX) |
|                                  | TYPE(\*CHAR) LEN(257)            |
|                                  |                                  |
|                                  |                                  |
|                                  |          DCL      VAR(&QQCMPNUM) |
|                                  | TYPE(\*CHAR) LEN(1) VALUE(\'N\') |
|                                  |                                  |
|                                  |           DCL      VAR(&QQERROR) |
|                                  | TYPE(\*CHAR) LEN(7)              |
|                                  |                                  |
|                                  |           DCL      VAR(&SVVALUE) |
|                                  | TYPE(\*CHAR) LEN(128)            |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |           DCL      VAR(&MSGID)   |
|                                  | TYPE(\*CHAR) LEN(7)              |
|                                  |                                  |
|                                  |           DCL      VAR(&MSGF)    |
|                                  | TYPE(\*CHAR) LEN(10)             |
|                                  |                                  |
|                                  |           DCL      VAR(&MSGFLIB) |
|                                  | TYPE(\*CHAR) LEN(10)             |
|                                  |                                  |
|                                  |           DCL      VAR(&MSGDTA)  |
|                                  | TYPE(\*CHAR) LEN(256)            |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | /                                |
|                                  | \*\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- |
|                                  | \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- |
|                                  | \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- |
|                                  | \-\-\-\-\-\-\-\-\-\-\-\-\-\--\*/ |
|                                  |                                  |
|                                  | /\* Original value is returned   |
|                                  | in case of error. Programmer     |
|                                  | may  \*/                         |
|                                  |                                  |
|                                  | /\*  decide to return some other |
|                                  | value, depending on where        |
|                                  | the   \*/                        |
|                                  |                                  |
|                                  | /\*  Dynamic Variable token is   |
|                                  | being                            |
|                                  | used.                       \*/  |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |         CHGVAR     VAR(&SVVALUE) |
|                                  | VALUE(&DVVALUE)                  |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | /\*+                             |
|                                  | ++++++++++++++++++++++++++++++++ |
|                                  | +++++++++++++++++++++++++++++\*/ |
|                                  |                                  |
|                                  |              SELECT              |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | /                                |
|                                  | \*\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- |
|                                  | \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- |
|                                  | \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- |
|                                  | \-\-\-\-\-\-\-\-\-\-\-\-\-\--\*/ |
|                                  |                                  |
|                                  | /\* Example of file-field        |
|                                  | retrieval with WHERE clause for  |
|                                  | keys   \*/                       |
|                                  |                                  |
|                                  | /                                |
|                                  | \*\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- |
|                                  | \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- |
|                                  | \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- |
|                                  | \-\-\-\-\-\-\-\-\-\-\-\-\-\--\*/ |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |          WHEN     COND(&DVNAME   |
|                                  | \*EQ \'LSAMAXJOB\') THEN(DO)     |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |          CHGVAR   VAR(&DVVALUEX) |
|                                  | VALUE(&DVVALUE \*CAT \'X\')      |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |           CHGVAR   VAR(&DVWHERE) |
|                                  | VALUE(\'WHERE LSAPAR1 = +        |
|                                  |                                  |
|                                  |                                  |
|                                  |             \'\'LSAMAXJOB\'\'\') |
|                                  |                                  |
|                                  |                                  |
|                                  |          CHGVAR   VAR(&DVWHEREX) |
|                                  | VALUE(&DVWHERE \*CAT \'X\')      |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | /\* If returned value should     |
|                                  | compress numbers to only         |
|                                  | digits,    \*/                   |
|                                  |                                  |
|                                  | /\*  change the &QQCMPNUM        |
|                                  | variable to a value of \'Y\' (=  |
|                                  | Yes).    \*/                     |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |          CHGVAR   VAR(&QQCMPNUM) |
|                                  | VALUE(\'Y\')                     |
|                                  |                                  |
|                                  | /\* If LIBRRARY will rely on     |
|                                  | \*LIBL, pass blanks to RPG       |
|                                  | program\...\*/                   |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |            CALL DYNVARSQLR       |
|                                  | PARM(&DVVALUEX &DVNAME \' \' +   |
|                                  |                                  |
|                                  |             \'LSAPARF00\'        |
|                                  | \'LSAPAR2\' &DVWHEREX &QQCMPNUM  |
|                                  | &QQERROR)                        |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |          IF        COND(&QQERROR |
|                                  | \*NE \'       \') THEN(DO)       |
|                                  |                                  |
|                                  |                                  |
|                                  |           CHGVAR    VAR(&MSGDTA) |
|                                  | VALUE(\'DYNVARSQLC received +    |
|                                  |                                  |
|                                  |                                  |
|                                  |                            error |
|                                  | code \' \*CAT &QQERROR \*CAT +   |
|                                  |                                  |
|                                  |                             \'   |
|                                  | from DB retriever program        |
|                                  | DYNVARSLQR\'                     |
|                                  |                                  |
|                                  |                                  |
|                                  |        SNDPGMMSG  MSGID(CPF9898) |
|                                  | MSGF(QSYS/QCPFMSG) +             |
|                                  |                                  |
|                                  |                                  |
|                                  |                  MSGDTA(&MSGDTA) |
|                                  | TOUSR(\*SYSOPR) +                |
|                                  |                                  |
|                                  |                                  |
|                                  |                  MSGTYPE(\*INFO) |
|                                  |                                  |
|                                  |                                  |
|                                  |          CHGVAR    VAR(&DVVALUE) |
|                                  | VALUE(&SVVALUE)                  |
|                                  |                                  |
|                                  |                                  |
|                                  |         GOTO      CMDLBL(ENDPGM) |
|                                  |                                  |
|                                  |               ENDDO              |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | /\* To return only part of a     |
|                                  | field value, use the %SST        |
|                                  | function, \*/                    |
|                                  |                                  |
|                                  | /\* for                          |
|                                  | example:  VALUE(%SST(&DVVALUEX   |
|                                  | 10 45)) returns 45        \*/    |
|                                  |                                  |
|                                  | /\* characters starting at       |
|                                  | position 10 of the &DVVALUEX     |
|                                  | variable.\*/                     |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |         CHGVAR     VAR(&DVVALUE) |
|                                  | VALUE(&DVVALUEX)                 |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |             ENDDO                |
|                                  |                                  |
|                                  | /                                |
|                                  | \*\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- |
|                                  | \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- |
|                                  | \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- |
|                                  | \-\-\-\-\-\-\-\-\-\-\-\-\-\--\*/ |
|                                  |                                  |
|                                  | /\* Example of data area value   |
|                                  | retrieval: Date last LSAM        |
|                                  | purge   \*/                      |
|                                  |                                  |
|                                  | /                                |
|                                  | \*\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- |
|                                  | \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- |
|                                  | \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- |
|                                  | \-\-\-\-\-\-\-\-\-\-\-\-\-\--\*/ |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |          WHEN       COND(&DVNAME |
|                                  | \*EQ \'LSAMNG\') THEN(DO)        |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | /\* The RTVDTAARA command        |
|                                  | optionally supports a start      |
|                                  | position   \*/                   |
|                                  |                                  |
|                                  | /\*  and length of the data to   |
|                                  | retrieve from a data             |
|                                  | area.        \*/                 |
|                                  |                                  |
|                                  |                                  |
|                                  |         RTVDTAARA  DTAARA(LSAMNG |
|                                  | \*ALL) RTNVAR(&DVVALUE)          |
|                                  |                                  |
|                                  |                                  |
|                                  |        MONMSG     MSGID(CPF0000) |
|                                  | EXEC(DO)                         |
|                                  |                                  |
|                                  |                                  |
|                                  |       RCVMSG     MSGTYPE(\*EXCP) |
|                                  | RMV(\*YES) +                     |
|                                  |                                  |
|                                  |                                  |
|                                  |                  MSGDTA(&MSGDTA) |
|                                  | MSGID(&MSGID) +                  |
|                                  |                                  |
|                                  |                                  |
|                                  |                      MSGF(&MSGF) |
|                                  | MSGFLIB(&MSGFLIB)                |
|                                  |                                  |
|                                  |                                  |
|                                  |         SNDPGMMSG  MSGID(&MSGID) |
|                                  | MSGF(&MSGFLIB/&MSGF) +           |
|                                  |                                  |
|                                  |                                  |
|                                  |                  MSGDTA(&MSGDTA) |
|                                  | TOUSR(\*SYSOPR) +                |
|                                  |                                  |
|                                  |                                  |
|                                  |                  MSGTYPE(\*INFO) |
|                                  |                                  |
|                                  |                                  |
|                                  |           CHGVAR    VAR(&MSGDTA) |
|                                  | VALUE(\'DYNVARSQLC received      |
|                                  |                                  |
|                                  |                                  |
|                                  |                            error |
|                                  | code \' \*CAT &MSGID \*CAT +     |
|                                  |                                  |
|                                  |                             \'   |
|                                  | from RTVDTAARA command\'         |
|                                  |                                  |
|                                  |                                  |
|                                  |        SNDPGMMSG  MSGID(CPF9898) |
|                                  | MSGF(QSYS/QCPFMSG) +             |
|                                  |                                  |
|                                  |                                  |
|                                  |                  MSGDTA(&MSGDTA) |
|                                  | TOUSR(\*SYSOPR) +                |
|                                  |                                  |
|                                  |                                  |
|                                  |                  MSGTYPE(\*INFO) |
|                                  |                                  |
|                                  |                                  |
|                                  |         CHGVAR     VAR(&DVVALUE) |
|                                  | VALUE(&SVVALUE)                  |
|                                  |                                  |
|                                  |                                  |
|                                  |    GOTO       CMDLBL(BYPASSDTAR) |
|                                  |                                  |
|                                  |               ENDDO              |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | /\* If returned value should     |
|                                  | compress numbers to only         |
|                                  | digits,    \*/                   |
|                                  |                                  |
|                                  | /\* load the value into          |
|                                  | &DVVALUEX, set the &QQFILE       |
|                                  | variable to   \*/                |
|                                  |                                  |
|                                  | /\* the special value of         |
|                                  | \'\*COMPRESS\', then call        |
|                                  | DYNVARSQLR. After\*/             |
|                                  |                                  |
|                                  | /\* the program returns, if      |
|                                  | &QQERROR is blank, reload the    |
|                                  | value  \*/                       |
|                                  |                                  |
|                                  | /\* back to                      |
|                                  | &DVVALUE.                        |
|                                  |                              \*/ |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |          CHGVAR   VAR(&DVVALUEX) |
|                                  | VALUE(&DVVALUE \*CAT \'X\')      |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | /\* If LIBRRARY will rely on     |
|                                  | \*LIBL, pass blanks to RPG       |
|                                  | program\...\*/                   |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |               CALL DYNVARSQLR    |
|                                  | PARM(&DVVALUEX &DVNAME \' \' +   |
|                                  |                                  |
|                                  |                \'\*COMPRESS\' \' |
|                                  | \' &DVWHEREX &QQCMPNUM &QQERROR) |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |         IF         COND(&QQERROR |
|                                  | \*NE \'       \') THEN(DO)       |
|                                  |                                  |
|                                  |                                  |
|                                  |           CHGVAR    VAR(&MSGDTA) |
|                                  | VALUE(\'DYNVARSQLC received +    |
|                                  |                                  |
|                                  |                          error   |
|                                  | code \' \*CAT &QQERROR \*CAT +   |
|                                  |                                  |
|                                  |                          \' from |
|                                  | DB retriever program             |
|                                  | DYNVARSLQR\'                     |
|                                  |                                  |
|                                  |                                  |
|                                  |        SNDPGMMSG  MSGID(CPF9898) |
|                                  | MSGF(QSYS/QCPFMSG) +             |
|                                  |                                  |
|                                  |                                  |
|                                  |                  MSGDTA(&MSGDTA) |
|                                  | TOUSR(\*SYSOPR) +                |
|                                  |                                  |
|                                  |                                  |
|                                  |                  MSGTYPE(\*INFO) |
|                                  |                                  |
|                                  |                                  |
|                                  |         CHGVAR     VAR(&DVVALUE) |
|                                  | VALUE(&SVVALUE)                  |
|                                  |                                  |
|                                  |                                  |
|                                  |        GOTO       CMDLBL(ENDPGM) |
|                                  |                                  |
|                                  | ENDDO                            |
|                                  |                                  |
|                                  | \...+\                           |
|                                  | ...1\...+\...2\...+\...3\...+\.. |
|                                  | .4\...+\...5\...+\...6\...+\...7 |
|                                  |                                  |
|                                  |                                  |
|                                  |         CHGVAR     VAR(&DVVALUE) |
|                                  | VALUE(&DVVALUEX)                 |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | BYPASSDTAR:                      |
|                                  |                                  |
|                                  |                ENDDO             |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | /\*+                             |
|                                  | ++++++++++++++++++++++++++++++++ |
|                                  | +++++++++++++++++++++++++++++\*/ |
|                                  |                                  |
|                                  |              ENDSELECT           |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | ENDPGM:                          |
|                                  |                                  |
|                                  |              ENDPGM              |
|                                  |                                  |
|                                  | \*\*                             |
|                                  | \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\* |
|                                  | End of data                      |
|                                  | \*\*\*                           |
|                                  | \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\* |
|                                  | \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\* |
+----------------------------------+----------------------------------+

## Nested Dynamic Variable Tokens

Dynamic Variables can have their value defined by a Dynamic Variable
{TOKEN} stored in the Value field. Dynamic Variable VALUE {TOKENS} can
be nested to virtually any level. The LSAM value replacement module will
simply continue to call itself over and over until an actual value is
discovered that does not include another {TOKEN}. The only limit on the
levels of nesting is whatever limit IBM i imposes on recursive calling
of \*NEW Activation Groups (which is a programming concept).

 

A Dynamic Variable master record cannot be configured with a nested
{TOKEN} using the SETDYNVAR command because any Dynamic Variable token
appearing in the VALUE( ) parameter will be replaced by the SETDYNVAR
command processing program, so that only the value of that token will be
placed into the Variable master record and not the {TOKEN} itself.
Instead, use the Dynamic Variable maintenance function available from
multiple sub-menus of the LSAM green screen menu system.

 

  -------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** One or more Dynamic Variable {TOKENS} are now allowed in the VALUE field of numeric variables. Previously, there was strict enforcement allowing only actual numeric digits to be entered when creating, changing or copying Dynamic Variable master records. Now {TOKENS} are allowed, and actual digits can be interspersed with one or more tokens, but non-numeric values are still not allowed outside of the token special characters.
  -------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### Use Case for Nested Dynamic Variable Tokens

The goal of this example is to retrieve the current system date and then
return just the Year and Month part of this date (as YYYYMM) for a date
that is 3 months in the past (which might be used to compute a retention
period for old IBM i objects). This Use Case relies on documentation
about the Dynamic Variable Function Codes (FN) as documented elsewhere
in this section.

 

First, a Dynamic Variable of type \*SYSVAL will have the name of QDATE
so that its token will return the IBM i partition\'s current system
date.

 

  -------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** The IBM i system value of QDATETIME might be more useful for the application described in this Use Case. However, the system value of QDATE is used to illustrate some additional capabilities of Dynamic Variables and also the warning that the IBM i command DSPSYSVAL often returns value strings that are formatted differently than when the Agent\'s Dynamic Variable token replacement module is using IBM APIs to retrieve system values.
  -------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

Refer to the following discussion about how the IBM i system date must
be managed, to understand the following settings for Dynamic Variable
QDATE, as used in this example use case:

CHAR TRIM START = 2, LENGTH = 6

FN CODE = \*SYSVAL

 

Next, a different Dynamic Variable will be defined with the following
settings, maybe with a name of PURGEDATE:

CHAR TRIM START = 1, LENGTH = 6

FN CODE = \*DATE

VALUE = {QDATE}

 

On display page 2 of Dynamic Variable Maintenance for this \*DATE
Variable type, the date FROM-format must be defined to match the format
of the System Date that the IBM i partition will provide for the system
value of QDATE. This date format will be different than what is shown
when using the interactive command DSPSYSVAL to show the value for
QDATE, because IBM adds the default date formatting characters to the
interactive display, but it does not add the formatting characters when
the LSAM program uses an IBM i API to request a system value.

 

To learn what your unique system settings will produce for the \*SYSVAL
of QDATE, use option 6=DSPDYNVAR to test the outcome of using the
Dynamic Variable called QDATE.

 

A common format for the system date in a US IBM i partition would be
CYYMMDD, but for this example the QDATE variable trims the date to
YYMMDD. This means that the PURGEDATE page 2 date formatting must be set
with the FROM-format option 1 assigned to the \*YMD format Code,
including specifying a 0 (zero) in the FMT0 column for the From Field.

 

To match this example use case, the TO-Format must be set by assigning
option 2 to the \*ISO format Code, and also specifying a 0 (zero) in the
FMT0 column.

 

Using these page 2 definitions for the \*DATE Dynamic Variable called
PURGEDATE, if the system value returned is 171108 (November 8, 2017)
then final result for the PURGEDATE Dynamic Variable will be 201711.

 

The LSAM\'s DSPDYNVAR command (same as option 6=DSPDYNVAR from the list
of Dynamic Variables) is an important tool to prove that nested tokens
are producing expected results.

## Utility Commands for Manipulating Dynamic Variables

### SETDYNVAR: Set LSAM Dynamic Variable

The purpose and function of Dynamic Variables are presented in detail in
the previous section, above. The IBM i LSAM utility command SETDYNVAR
performs most of the same functions as the Maintain Dynamic Variables
function 6 on LSAM menu 3 - Events and Utilities (documented in the
Screens and Windows section of this topic, below). But the SETDYNVAR
command performs additional functions beyond what the master file
maintenance program can do. The command is also useful during live
operations when used as:

-   A prerun command in an IBM i job master record on an OpCon schedule.
-   An action command in a Captured Data Response Rule (SCANSPLF,
    Operator Replay, Message data capture).
-   A Message Management event command.
-   Any command entry line where the LSAM library list is in effect.

#### Using SETDYNVAR as an OpCon Job Prerun Command

The IBM i LSAM employs special procedures in its Job Scheduler server
program when it detects that a SETDYNVAR command was submitted as a
prerun command for an IBM i job. The LSAM Job Schedule server task will
process the SETDYNVAR command immediately, in order to make it possible
to use the results of this command within the syntax of the main job
call command.

 

However, a more convenient and extendable way to preset Dynamic Variable
values just before an OpCon-submitted job starts is to use the Variables
tab of the OpCon job master record. Up to 99 Agent variable values can
be set, relying on the same pre-execution logic of the Agent\'s Job
Scheduler as when the prerun command line might specify the SETDYNVAR
command.

#### SETDYNVAR Command Syntax and General Capabilities

This command may be used to add a new Dynamic Variable to the LSAM table
and to set its value, or it may be used to change the value of an
existing Dynamic Variable. Making reference to the Dynamic Variable
master file fields described below in the Maintain Dynamic Variables
section of this topic, this description of the SETDYNVAR command
parameters provides information about additional considerations when
using the command.

 

  -------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** The VALUE keyword of the SETDYNVAR command cannot be used to set a dynamic variable value to blanks (all spaces). Instead of relying on spaces, such as when testing dynamic variable values, choose an initial value (perhaps \'INIT\') and set the dynamic variable to this value before any other configured procedures might store a new result value.
  -------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

Consider the following examples of using the SETDYNVAR command wherever
IBM i commands are supported by the LSAM:

 

+----------------------------------+----------------------------------+
| ![White pencil icon on green     | **EXAMPLE:**                     | | circular                         |                                  |
| background](../../../Reso        | SETDYNVAR command with CMPNUM    |
| urces/Images/example-icon(48x48) |                                  |
| .png "Example icon") | SETDYNVAR VARNAM(VARNAME1)       |
|                                  | VALUE(\'\$123,456.78\')          |
|                                  | VARTYP(V)                        |
|                                  |                                  |
|                                  | USRPGM(PGMLIB/USRDFNPGM)         |
|                                  | CMPNUM(Y) DESC(\'my              |
|                                  | description\')                   |
+----------------------------------+----------------------------------+

 

The example above shows a command that will add a new Dynamic Variable
named \"VARNAME1\" to the LSAM table, if there is not already a variable
with this name. The type of variable is \'V\' meaning a general-use
variable. A user-defined program named (example provided is
\"USRDFNPGM\") in the IBM i DB2 library PGMLIB will be called before the
LSAM will replace the variable\'s {TOKEN} with an actual value.

 

As this example command is executed, an initial value is set. The
example shows a value string enclosed in quotes that represents a
monetary amount string of \$US with six whole numbers (dollars) and two
decimal places (cents). This string value might have been provided by an
OpCon Property or by a different LSAM Dynamic Variable, depending on
where this example command was actually being executed. But the value
that will be stored as the initial value of the variable is only the
eight digits, like this: 12345678 because the CMPNUM (compress numeric)
parameter is set to \'Y\' = Yes.

 

Refer to additional information above about how to create and use
user-defined programs to calculate Dynamic Variable token values at run
time. User-defined programs receive the Dynamic Variable name and the
current variable value as input parameters.

 

+----------------------------------+----------------------------------+
| ![White pencil icon on green     | **EXAMPLE:**                     | | circular                         |                                  |
| background](../../../Reso        | SETDYNVAR command increases a    |
| urces/Images/example-icon(48x48) | numeric value.                   |
| .png "Example icon") |                                  |
|                                  | Step 1: A numeric Dynamic        |
|                                  | Variable is added to the LSAM    |
|                                  | table:                           |
|                                  |                                  |
|                                  | SETDYNVAR VARNAM(VARNAME2)       |
|                                  | VALUE(0) VARTYP(V) NUMSIZ(7)     |
|                                  | NUMDEC(0) POSSYM(B)              |
|                                  | DESC(\'Threshold counter\')      |
|                                  |                                  |
|                                  | Step 2: A later procedures       |
|                                  | decides to increase the value by |
|                                  | 1.                               |
|                                  |                                  |
|                                  | SETDYNVAR VARNAM(VARNAME2)       |
|                                  | VALUE(\'+1\')                    |
+----------------------------------+----------------------------------+

 

The example 2 above illustrates the procedure for creating and using a
Dynamic Variable as a numeric field that can later have its value change
up or down by using a plus (+) or minus (-) sign in the first position
of the VALUE keyword of the SETDYNVAR command. This is the technique
that is used by LSAM programs to manage threshold counters for LSAM
Message Management Parameters. Threshold counters stored in Dynamic
Variables that are defined as numeric could also be used by the Compare
Data fields of any Captured Data Response Rule (used by Operator Replay
screen data capture, SCANSPLF report data capture and Message data
capture) to control when a Response Command should be executed.

 

In the example above, Step 1 shows a command that will add a new Dynamic
Variable named \"VARNAME2\" to the LSAM table, if there is not already a
variable with this name. (If the variable did exist, it could have its
attributes changed by this command.) The type of variable is \'V\'
meaning a general-use variable. The keyword NUMSIZ is set to 7, and that
is what tells the LSAM that this variable should be handled as a numeric
variable instead of just being a plain character string. Numeric
variables may be increased or decreased in value as explained above, and
the LSAM uses special rules when returning a value to replace the
Dynamic Variable Token when the variable is defined as numeric. The
NUMDEC keyword indicates that there are no decimal places, and this is
the correct indication for creating a numeric value that will be used as
a counter because counter or threshold fields should only contain whole
numbers (integers) without any decimal places. The default for the
POSSYM (positive symbol) keyword is \'B\' = none, but that is shown here
to illustrate that no positive sign should be returned by the LSAM when
a numeric variable is being used as a threshold counter.

 

  -------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** Use the LSAM command DSPDYNVAR to display the value string that will be returned by the LSAM to replace a Dynamic Variable token. This tool is helpful for experimenting with different Dynamic Variable definitions to discover which definition will return the value string that is required for a given application.
  -------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

Example 2 continues with a second step that illustrates the syntax of
the SETDYNVAR command that can be used whenever it is desired to
increase the value of a threshold counter (or any other numeric Dynamic
Variable). To decrease the value, use a minus sign (-) as the first
character of the VALUE keyword. Remember, though, that values cannot be
increased or decreased unless a Dynamic Variable has been defined as
numeric, using the NUMSIZ keyword. If a VALUE keyword includes a plus or
minus sign when the variable is not numeric, this will actually replace
the variable\'s current value to include the sign character and any
other characters, exactly as typed in the VALUE keyword.

#### F4 = Prompted SETDYNVAR Command

When preparing a SETDYNVAR command line, it is useful to start at IBM i
command entry and use the prompting function key \<**F4**\> to see all
the command parameters. Most of the IBM i LSAM functions that support a
response command also support prompting, although the function key may
be different, depending on the LSAM feature being updated. Following are
examples of the prompted command, with and without the command keywords.
An explanation of the command parameter keywords appears in a table
below the prompt screen figures.

 

[Prompted SETDYNVAR Command - 1 of 2]{style="font-family: Arial; font-size: 8pt; font-weight: bold;"}

  --------------------------------------------------------------------------------------------------------------------------------------------------
                                                         Set/Add Dynamic Variable (SETDYNVAR)
                                                                           
                                                              Type choices, press Enter.
                                                                           
                         Name of new/existing variable  .   [            ]{style="text-decoration: underline;"}  Variable name            Value string, +n, -n . . . . . .   [                                                    ]{style="text-decoration: underline;"}  
   [                                                                                        ]{style="color: #008000;text-decoration: underline;"}                                                                                  
                  Variable type  . . . . . . . . .   [V]{style="text-decoration: underline;"}             L=LDA change, V=general use                    Sequence for same LDA variable     [0    ]{style="text-decoration: underline;"}         Sequence number: 0 - 999
           Char trim/LDA: start position  .   [0     ]{style="text-decoration: underline;"}        LDA start position: 0-1024, Trim: 1-128               Char trim/LDA change: length . .   [0     ]{style="text-decoration: underline;"}        LDA change length: 0-1024, Trim: 1-128
               Value calc. pgm./function code .   [          ]{style="text-decoration: underline;"}    Name, \*DB2, \*DTAARA, \*DATE\...                        Library  . . . . . . . . . . .     [\*LIBL     ]{style="text-decoration: underline;"}  Name,\*LIBL,\*CURLIB
                                    Unload command program at end  .   [\*YES]{style="text-decoration: underline;"}                         Compress numeric value . . . . .   [N]{style="text-decoration: underline;"}             Y = yes, N = no
                      Numeric field size . . . . . . .   [    ]{style="text-decoration: underline;"}          Zero = non-numeric                       Decimal places, if numeric . . .   [    ]{style="text-decoration: underline;"}          Zero = whole number
                Decimal point symbol . . . . . .   [\'.\']{style="text-decoration: underline;"}           (.), other, B=change to none                Group separator; Comma/Quote ed    [\',\']{style="text-decoration: underline;"}           (,),alt,B=change to none;CQDEF
                                                                       More\...
  --------------------------------------------------------------------------------------------------------------------------------------------------

Prompted SETDYNVAR Command - 2 of 2

  --------------------------------------------------------------------------------------------------------------------------
                                             Set/Add Dynamic Variable (SETDYNVAR)
                                                               
                                                  Type choices, press Enter.
                                                               
         Suppress numeric leading zeros     [ ]{style="text-decoration: underline;"}             0 = no (DFT), 1 = yes        Negative value symbol  . . . . .   [  ]{style="text-decoration: underline;"}            B=none, -, CR, DR, other
         Negative symbol before/after . .   [ ]{style="text-decoration: underline;"}             B = before, A = after       Negative symbol position . . . .   [   ]{style="text-decoration: underline;"}           Position: 1-9, 0=no change
       Positive value symbol  . . . . .   [  ]{style="text-decoration: underline;"}            B=none, +, DR, CR, other          Positive symbol before/after . .   [ ]{style="text-decoration: underline;"}             B = before, A = after
      Positive symbol position . . . .   [   ]{style="text-decoration: underline;"}           Position: 1-9, 0=no change       Currency symbol, if numeric  . .   [ ]{style="text-decoration: underline;"}             \$, other, B=change to none
      Currency symbol position (L) . .   [    ]{style="text-decoration: underline;"}          Position: 1-99, 0=no change       Currency symbol relative loc . .   [ ]{style="text-decoration: underline;"}             F=float, (.)=fixed from dec
    Variable description . . . . . .   [                                           ]{style="text-decoration: underline;"}                                                                     
                                                               
                                                               
                                                               
                                                            Bottom
  --------------------------------------------------------------------------------------------------------------------------

Prompted SETDYNVAR Command - With Keywords - 1 of 2

  -----------------------------------------------------------------------------------------------------------------------------------------
                                                    Set/Add Dynamic Variable (SETDYNVAR)
                                                                       
                                                          Type choices, press Enter.
                                                                       
                     Name of new/existing variable  . VARNAM         [            ]{style="text-decoration: underline;"}            Value string, +n, -n . . . . . . VALUE          [                              ]{style="text-decoration: underline;"}  
   [                                                                               ]{style="color: #008000;text-decoration: underline;"}                                    [                     ]{style="color: #008000;text-decoration: underline;"}
                           Variable type  . . . . . . . . . VARTYP         [V]{style="text-decoration: underline;"}                          Sequence for same LDA variable   VARSEQ         [0    ]{style="text-decoration: underline;"}
                        Char trim/LDA: start position  . LDASTR         [0     ]{style="text-decoration: underline;"}                         Char trim/LDA change: length . . LDALEN         [0     ]{style="text-decoration: underline;"}
                      Value calc. pgm./function code . USRPGM         [          ]{style="text-decoration: underline;"}                        Library  . . . . . . . . . . .                  [\*LIBL     ]{style="text-decoration: underline;"}
                         Unload command program at end  . UNLOAD         [\*YES]{style="text-decoration: underline;"}                            Compress numeric value . . . . . CMPNUM         [N]{style="text-decoration: underline;"}
                         Numeric field size . . . . . . . NUMSIZ         [    ]{style="text-decoration: underline;"}                          Decimal places, if numeric . . . NUMDEC         [    ]{style="text-decoration: underline;"}
                         Decimal point symbol . . . . . . DECSYM         [\'.\']{style="text-decoration: underline;"}                          Group separator; Comma/Quote ed  COMMA          [\',\']{style="text-decoration: underline;"}
                                                                  More\...
  -----------------------------------------------------------------------------------------------------------------------------------------

Prompted SETDYNVAR Command - With Keywords - 2 of 2

  ---------------------------------------------------------------------------------------------------------------------------------------
                                                   Set/Add Dynamic Variable (SETDYNVAR)
                                                                      
                                                         Type choices, press Enter.
                                                                      
                          Suppress numeric leading zeros   ZEROSUP        [ ]{style="text-decoration: underline;"}                          Decimal point symbol . . . . . . NUMSYM         [ ]{style="text-decoration: underline;"}  
                         Negative value symbol  . . . . . NEGSYM         [  ]{style="text-decoration: underline;"}                           Negative symbol before/after . . NEGBA          [ ]{style="text-decoration: underline;"}
                         Negative symbol position . . . . NEGPOS         [  ]{style="text-decoration: underline;"}                           Positive value symbol  . . . . . POSSYM         [ ]{style="text-decoration: underline;"}
                         Positive symbol before/after . . POSBA          [  ]{style="text-decoration: underline;"}                         Positive symbol position . . . . POSPOS         [    ]{style="text-decoration: underline;"}
                          Currency symbol, if numeric  . . CURSYM         [ ]{style="text-decoration: underline;"}                          Currency symbol position (L) . . CUSPOS         [   ]{style="text-decoration: underline;"}
                          Currency symbol relative loc . . CURLOC         [ ]{style="text-decoration: underline;"}     Variable description . . . . . . DESC           [                              ]{style="color: #008000;text-decoration: underline;"}
                                 [                   ]{style="color: #008000;text-decoration: underline;"}                                                                                                               
                                                                      
                                                                  Bottom
  ---------------------------------------------------------------------------------------------------------------------------------------

#### Command Parameter Keywords

+----------------+----------------+----------------+----------------+
| Keyword        | Values         | Default        | Description    |
+================+:==============:+:==============:+================+
| VARNAM         | Any characters |                | The key        |
|                |                |                | identifier of  |
| Variable name  |                |                | each variable. |
|                |                |                | For records of |
|                |                |                | type L, this   |
|                |                |                | name must be   |
|                |                |                | the Captured   |
|                |                |                | Job ID or the  |
|                |                |                | Job Name of a  |
|                |                |                | tracked or     |
|                |                |                | queued job.    |
|                |                |                | For records of |
|                |                |                | type V, this   |
|                |                |                | may be any     |
|                |                |                | meaningful     |
|                |                |                | name that will |
|                |                |                | be used to     |
|                |                |                | create a token |
|                |                |                | ID. Job names  |
|                |                |                | are limited to |
|                |                |                | 10 characters, |
|                |                |                | but a Captured |
|                |                |                | Job ID or      |
|                |                |                | token ID can   |
|                |                |                | use up to the  |
|                |                |                | 12 characters  |
|                |                |                | allowed for    |
|                |                |                | this field.    |
+----------------+----------------+----------------+----------------+
| VALUE          | Any keyboard   | Blanks         | -   To specify |
|                | character; or  |                |     a fixed    |
| Current value  | signed digits  |                |     value for  |
| or numeric     | for numeric    |                |     a dynamic  |
| change amount  | value changes. |                |     variable,  |
|                |                |                |     when a     |
|                |                |                |     value      |
|                |                |                |     calculate  |
|                | **Note**:      |                |     program is |
|                | Blanks or      |                |     not being  |
|                | spaces are not |                |     used, type |
|                | supported by   |                |     in the     |
|                | this           |                |     value. If  |
|                | parameter. If  |                |     the        |
|                | the value is   |                |     required   |
|                | blank, the     |                |     value      |
|                | master record  |                |     cannot be  |
|                | value will not |                |     typed on a |
|                | be changed.    |                |                |
|                |                |                |    workstation |
|                |                |                |     keyboard,  |
|                |                |                |     then a     |
|                |                |                |     value      |
|                |                |                |     calculate  |
|                |                |                |     program    |
|                |                |                |     must be    |
|                |                |                |     used to    |
|                |                |                |     supply the |
|                |                |                |     value at   |
|                |                |                |     run time.  |
|                |                |                |     If a value |
|                |                |                |     calculate  |
|                |                |                |     program is |
|                |                |                |     specified, |
|                |                |                |     but the    |
|                |                |                |     program    |
|                |                |                |     cannot be  |
|                |                |                |     found at   |
|                |                |                |     run time,  |
|                |                |                |     then any   |
|                |                |                |     value      |
|                |                |                |     specified  |
|                |                |                |     in this    |
|                |                |                |     field will |
|                |                |                |     be used as |
|                |                |                |     the        |
|                |                |                |     default.   |
|                |                |                |     For type V |
|                |                |                |     tokens, a  |
|                |                |                |     blank      |
|                |                |                |     value will |
|                |                |                |     cause the  |
|                |                |                |     token to   |
|                |                |                |     be removed |
|                |                |                |     from the   |
|                |                |                |     string     |
|                |                |                |     where it   |
|                |                |                |     was found  |
|                |                |                |     and the    |
|                |                |                |     string     |
|                |                |                |     will be    |
|                |                |                |     compressed |
|                |                |                |     to remove  |
|                |                |                |     as many    |
|                |                |                |     spaces as  |
|                |                |                |     were       |
|                |                |                |     occupied   |
|                |                |                |     by the     |
|                |                |                |     token. For |
|                |                |                |     type L     |
|                |                |                |     variables, |
|                |                |                |     a final    |
|                |                |                |     result of  |
|                |                |                |     blanks for |
|                |                |                |     the        |
|                |                |                |     variable   |
|                |                |                |     will cause |
|                |                |                |     the LDA to |
|                |                |                |     be updated |
|                |                |                |     with space |
|                |                |                |     characters |
|                |                |                |     in the     |
|                |                |                |     specified  |
|                |                |                |     lo         |
|                |                |                | cation/length. |
|                |                |                | -   For        |
|                |                |                |     Dynamic    |
|                |                |                |     Variables  |
|                |                |                |     defined as |
|                |                |                |     numeric,   |
|                |                |                |     the VALUE  |
|                |                |                |     keyword    |
|                |                |                |     will       |
|                |                |                |     accept a   |
|                |                |                |     number     |
|                |                |                |     that is    |
|                |                |                |     preceded   |
|                |                |                |     by a plus  |
|                |                |                |     (+) or     |
|                |                |                |     minus (-)  |
|                |                |                |     sign as a  |
|                |                |                |     request to |
|                |                |                |     increase   |
|                |                |                |     or         |
|                |                |                |     decrease   |
|                |                |                |     an         |
|                |                |                |     existing   |
|                |                |                |     value by   |
|                |                |                |     the amount |
|                |                |                |     in the     |
|                |                |                |     VALUE      |
|                |                |                |     parameter. |
+----------------+----------------+----------------+----------------+
| VARTYP         | L, V           | V              | The record     |
|                |                |                | type is L for  |
| Variable type  |                |                | a dynamic      |
|                |                |                | variable that  |
|                |                |                | will be used   |
|                |                |                | to update the  |
|                |                |                | LDA content of |
|                |                |                | a job. Type V  |
|                |                |                | records are    |
|                |                |                | dynamic        |
|                |                |                | variable       |
|                |                |                | tokens that    |
|                |                |                | can be         |
|                |                |                | inserted into  |
|                |                |                | job parameters |
|                |                |                | or the job\'s  |
|                |                |                | call command   |
|                |                |                | line.          |
+----------------+----------------+----------------+----------------+
| VARSEQ         | 000 -- 999     | 000            | This record    |
|                |                |                | sequence       |
| Sequence       |                |                | number should  |
| number         |                |                | be zeros for   |
|                |                |                | records of     |
|                |                |                | type V because |
|                |                |                | it has no      |
|                |                |                | meaning for    |
|                |                |                | this record    |
|                |                |                | type. For      |
|                |                |                | records of     |
|                |                |                | type L, this   |
|                |                |                | sequence       |
|                |                |                | number is used |
|                |                |                | to created     |
|                |                |                | unique records |
|                |                |                | keys when      |
|                |                |                | there is more  |
|                |                |                | than one       |
|                |                |                | dynamic        |
|                |                |                | variable       |
|                |                |                | assigned to    |
|                |                |                | the same       |
|                |                |                | Variable Name  |
|                |                |                | (there may be  |
|                |                |                | multiple       |
|                |                |                | updates        |
|                |                |                | specified for  |
|                |                |                | the LDA        |
|                |                |                | content of a   |
|                |                |                | single job).   |
+----------------+----------------+----------------+----------------+
| LDASTR         | Char trim: 1 - | 0000           | Required for   |
|                | 128            |                | record type L  |
| Char trim/LDA: |                |                | (LDA),         |
| start position | LDA: 0 -- 1024 |                | optional value |
|                |                |                | string trim    |
|                |                |                | for type V.    |
|                |                |                |                |
|                |                |                | -   **LDA**:   |
|                |                |                |     This       |
|                |                |                |     number     |
|                |                |                |     specifies  |
|                |                |                |     the        |
|                |                |                |     cardinal   |
|                |                |                |     position   |
|                |                |                |     (1-1024)   |
|                |                |                |     where      |
|                |                |                |                |
|                |                |                |   substitution |
|                |                |                |     of the     |
|                |                |                |     dynamic    |
|                |                |                |                |
|                |                |                |    variable\'s |
|                |                |                |     value will |
|                |                |                |     begin in   |
|                |                |                |     the image  |
|                |                |                |     of the     |
|                |                |                |     local data |
|                |                |                |     area (LDA) |
|                |                |                |     content    |
|                |                |                |     for a job. |
|                |                |                | -              |
|                |                |                |    **Type-V**: |
|                |                |                |     This       |
|                |                |                |     number     |
|                |                |                |     specifies  |
|                |                |                |     which      |
|                |                |                |     position   |
|                |                |                |     of the     |
|                |                |                |     value      |
|                |                |                |     string     |
|                |                |                |     should be  |
|                |                |                |     the first  |
|                |                |                |     position   |
|                |                |                |     of the     |
|                |                |                |     value      |
|                |                |                |     returned   |
|                |                |                |     to replace |
|                |                |                |     a {TOKEN}. |
+----------------+----------------+----------------+----------------+
| LDALEN         | Char trim: 1 - | 0000           | Required for   |
|                | 128            |                | record type L  |
| Char trim/LDA  |                |                | (LDA),         |
| change: length | LDA: 0 -- 1024 |                | optional value |
|                |                |                | string trim    |
|                |                |                | for type V.    |
|                |                |                |                |
|                |                |                | -   **LDA**:   |
|                |                |                |     This       |
|                |                |                |     number     |
|                |                |                |     specifies  |
|                |                |                |     how many   |
|                |                |                |     characters |
|                |                |                |     in the LDA |
|                |                |                |     content    |
|                |                |                |     image will |
|                |                |                |     be updated |
|                |                |                |     by the     |
|                |                |                |     value of   |
|                |                |                |     the        |
|                |                |                |     dynamic    |
|                |                |                |     variable.  |
|                |                |                |     If the     |
|                |                |                |     supplied   |
|                |                |                |     variable   |
|                |                |                |     value is   |
|                |                |                |     longer     |
|                |                |                |     than this  |
|                |                |                |     length,    |
|                |                |                |     the value  |
|                |                |                |     will be    |
|                |                |                |     truncated  |
|                |                |                |     to this    |
|                |                |                |     length. If |
|                |                |                |     the value  |
|                |                |                |     is shorter |
|                |                |                |     than this  |
|                |                |                |     length,    |
|                |                |                |     the        |
|                |                |                |     remaining  |
|                |                |                |     length     |
|                |                |                |     will be    |
|                |                |                |     padded     |
|                |                |                |     with space |
|                |                |                |     characters |
|                |                |                |     (blanks).  |
|                |                |                | -              |
|                |                |                |    **Type-V**: |
|                |                |                |     This       |
|                |                |                |     number     |
|                |                |                |     specifies  |
|                |                |                |     how many   |
|                |                |                |     total      |
|                |                |                |     characters |
|                |                |                |     will be    |
|                |                |                |     returned   |
|                |                |                |     from the   |
|                |                |                |     currently  |
|                |                |                |     stored or  |
|                |                |                |     calculated |
|                |                |                |     value      |
|                |                |                |     string,    |
|                |                |                |     beginning  |
|                |                |                |     with and   |
|                |                |                |     including  |
|                |                |                |     the Char   |
|                |                |                |     Trim Start |
|                |                |                |     position.  |
|                |                |                |     If the     |
|                |                |                |     value      |
|                |                |                |     string is  |
|                |                |                |     shorter    |
|                |                |                |     than this  |
|                |                |                |     length,    |
|                |                |                |     only the   |
|                |                |                |     non-blank  |
|                |                |                |     characters |
|                |                |                |     returned   |
|                |                |                |     by the     |
|                |                |                |     Agent will |
|                |                |                |     be used to |
|                |                |                |     replace    |
|                |                |                |     the        |
|                |                |                |     {TOKEN}.   |
|                |                |                |     This       |
|                |                |                |     length     |
|                |                |                |     number     |
|                |                |                |     cannot be  |
|                |                |                |     used to    |
|                |                |                |     force      |
|                |                |                |     blanks     |
|                |                |                |     (spaces)   |
|                |                |                |     as part of |
|                |                |                |     the        |
|                |                |                |                |
|                |                |                |    replacement |
|                |                |                |     value.     |
+----------------+----------------+----------------+----------------+
| USRPGM         | A valid IBM i  | Blanks         | The name of an |
|                | name           |                | optional IBM i |
| Value          |                |                | program        |
| calculator     |                |                | supplied by    |
| program        |                |                | the user that  |
|                |                |                | will calculate |
|                |                |                | the dynamic    |
|                |                |                | variable\'s    |
|                |                |                | value at the   |
|                |                |                | moment just    |
|                |                |                | before the     |
|                |                |                | actual         |
|                |                |                | substitution   |
|                |                |                | will take      |
|                |                |                | place. The     |
|                |                |                | LSAM supports  |
|                |                |                | any length     |
|                |                |                | character      |
|                |                |                | string up to   |
|                |                |                | 128 characters |
|                |                |                | in length. The |
|                |                |                | content of     |
|                |                |                | this character |
|                |                |                | string is not  |
|                |                |                | limited, since |
|                |                |                | a local data   |
|                |                |                | area may       |
|                |                |                | contain any    |
|                |                |                | hexadecimal    |
|                |                |                | value in any   |
|                |                |                | position.      |
|                |                |                |                |
|                |                |                |                |
|                |                |                |                |
|                |                |                | **Note:** The  |
|                |                |                | LSAM passes    |
|                |                |                | the current    |
|                |                |                | value of the   |
|                |                |                | variable to    |
|                |                |                | the program,   |
|                |                |                | but uses       |
|                |                |                | whatever value |
|                |                |                | is returned by |
|                |                |                | the program to |
|                |                |                | replace a      |
|                |                |                | variable token |
|                |                |                | at run time.   |
|                |                |                | There is also  |
|                |                |                | a second       |
|                |                |                | parameter of   |
|                |                |                | 12 characters  |
|                |                |                | passed to the  |
|                |                |                | program that   |
|                |                |                | contains the   |
|                |                |                | Variable Name. |
+----------------+----------------+----------------+----------------+
| UNLOAD         | LSAM internal  | DO NOT USE     | This field is  |
|                | use only       |                | used by LSAM   |
| Unload (end)   |                |                | programs when  |
| program after  |                |                | they execute a |
| this command   |                |                | direct call to |
|                |                |                | the command    |
|                |                |                | driver program |
|                |                |                | for the        |
|                |                |                | SETDYNVAR      |
|                |                |                | command. DO    |
|                |                |                | NOT USE OR     |
|                |                |                | CHANGE THIS    |
|                |                |                | KEYWORD VALUE. |
+----------------+----------------+----------------+----------------+
| CMPNUM         | Y, N           | N              | -   N = no,    |
|                |                |                |     use VALUE  |
| Compress       |                |                |     character  |
| numeric value  |                |                |     string     |
|                |                |                |     as-is.     |
|                |                |                | -   Y = yes,   |
|                |                |                |     compress   |
|                |                |                |     and save   |
|                |                |                |     only       |
|                |                |                |     numeric    |
|                |                |                |     digits.    |
|                |                |                | -   This       |
|                |                |                |     keyword    |
|                |                |                |     tells the  |
|                |                |                |     command    |
|                |                |                |     processor  |
|                |                |                |     program of |
|                |                |                |     the        |
|                |                |                |     SETDYNVAR  |
|                |                |                |     command to |
|                |                |                |     modify the |
|                |                |                |     character  |
|                |                |                |     string     |
|                |                |                |     presented  |
|                |                |                |     in the     |
|                |                |                |     VALUE      |
|                |                |                |     keyword,   |
|                |                |                |     removing   |
|                |                |                |     all        |
|                |                |                |     characters |
|                |                |                |     except for |
|                |                |                |     numeric    |
|                |                |                |     digits.    |
|                |                |                |                |
|                |                |                | **Note**: This |
|                |                |                | flag field is  |
|                |                |                | not stored in  |
|                |                |                | the Dynamic    |
|                |                |                | Variable       |
|                |                |                | definition, it |
|                |                |                | is only used   |
|                |                |                | during the     |
|                |                |                | execution of   |
|                |                |                | the SETDYNVAR  |
|                |                |                | command.       |
|                |                |                | Although only  |
|                |                |                | numeric digits |
|                |                |                | will be stored |
|                |                |                | as the         |
|                |                |                | variable\'s    |
|                |                |                | current value, |
|                |                |                | the variable   |
|                |                |                | will not be    |
|                |                |                | defined as a   |
|                |                |                | numeric value  |
|                |                |                | unless the     |
|                |                |                | NUMSIZ keyword |
|                |                |                | is also        |
|                |                |                | specified with |
|                |                |                | a value        |
|                |                |                | greater than   |
|                |                |                | zero.          |
+----------------+----------------+----------------+----------------+
| NUMSIZ         | 0 - 63         | 0              | A value        |
|                |                |                | greater than   |
| Numeric field  |                |                | zero in this   |
| size           |                |                | field          |
|                |                |                | designates     |
|                |                |                | that the       |
|                |                |                | dynamic        |
|                |                |                | variable will  |
|                |                |                | always be      |
|                |                |                | handled as a   |
|                |                |                | numeric field, |
|                |                |                | capable of     |
|                |                |                | numeric        |
|                |                |                | operations and |
|                |                |                | also           |
|                |                |                | optionally     |
|                |                |                | subject to     |
|                |                |                | numeric edit   |
|                |                |                | codes to       |
|                |                |                | prepare the    |
|                |                |                | value for      |
|                |                |                | output when it |
|                |                |                | is requested.  |
+----------------+----------------+----------------+----------------+
| NUMDEC         | 0 - 63         | 0              | A non-zero     |
|                |                |                | value in this  |
| Decimal        |                |                | field          |
| positions of   |                |                | specifies the  |
| numeric        |                |                | number of      |
| variable       |                |                | digits         |
|                |                |                | (included in   |
|                |                |                | the total size |
|                |                |                | value, above)  |
|                |                |                | that are       |
|                |                |                | handled as     |
|                |                |                | right of the   |
|                |                |                | decimal point, |
|                |                |                | that is, part  |
|                |                |                | of the numeric |
|                |                |                | value that is  |
|                |                |                | less than 1,   |
|                |                |                | such as        |
|                |                |                | tenths,        |
|                |                |                | hundredths,    |
|                |                |                | etc. This      |
|                |                |                | field only     |
|                |                |                | applies if the |
|                |                |                | size field is  |
|                |                |                | also not zero. |
|                |                |                | The number of  |
|                |                |                | decimals       |
|                |                |                | cannot exceed  |
|                |                |                | the total      |
|                |                |                | numeric field  |
|                |                |                | size.          |
+----------------+----------------+----------------+----------------+
| DECSYM         | any            | . (period)     | When a numeric |
|                |                |                | value is       |
| Decimal point  |                |                | defined with 1 |
| symbol         |                |                | or more        |
|                |                |                | decimal        |
|                |                |                | places, this   |
|                |                |                | symbol will be |
|                |                |                | inserted into  |
|                |                |                | the string of  |
|                |                |                | numbers from   |
|                |                |                | the current    |
|                |                |                | value of the   |
|                |                |                | dynamic        |
|                |                |                | variable. In   |
|                |                |                | some countries |
|                |                |                | a comma (,)    |
|                |                |                | might be       |
|                |                |                | expected to    |
|                |                |                | indicate the   |
|                |                |                | start of       |
|                |                |                | decimal        |
|                |                |                | positions.     |
+----------------+----------------+----------------+----------------+
| COMMA          | any            | , (comma)      | -   FOR        |
|                |                |                |     NUMERIC    |
| Grouping       |                |                |     VARIABLES: |
| separator;     |                |                |     -   The    |
|                |                |                |         symbol |
| Character edit |                |                |         used   |
|                |                |                |         to     |
|                |                |                |                |
|                |                |                |       separate |
|                |                |                |         whole  |
|                |                |                |                |
|                |                |                |        numbers |
|                |                |                |         into   |
|                |                |                |         groups |
|                |                |                |         of 3   |
|                |                |                |         digits |
|                |                |                |         each.  |
|                |                |                |         A      |
|                |                |                |         value  |
|                |                |                |         of     |
|                |                |                |         \'B\'  |
|                |                |                |         means  |
|                |                |                |         there  |
|                |                |                |         will   |
|                |                |                |         be no  |
|                |                |                |                |
|                |                |                |       grouping |
|                |                |                |         of the |
|                |                |                |         whole  |
|                |                |                |         number |
|                |                |                |                |
|                |                |                |        digits. |
|                |                |                | -   FOR        |
|                |                |                |     CHARACTER  |
|                |                |                |     VARIABLES: |
|                |                |                |     -   The    |
|                |                |                |                |
|                |                |                |      following |
|                |                |                |         values |
|                |                |                |         can be |
|                |                |                |         used   |
|                |                |                |         to     |
|                |                |                |         escape |
|                |                |                |         or     |
|                |                |                |                |
|                |                |                |        replace |
|                |                |                |         single |
|                |                |                |         quotes |
|                |                |                |         or     |
|                |                |                |         commas |
|                |                |                |                |
|                |                |                |      contained |
|                |                |                |         in the |
|                |                |                |                |
|                |                |                |       variable |
|                |                |                |         value: |
|                |                |                |     -   C =    |
|                |                |                |                |
|                |                |                |        replace |
|                |                |                |         any    |
|                |                |                |         comma  |
|                |                |                |         (,)    |
|                |                |                |                |
|                |                |                |        X\'6B\' |
|                |                |                |         with a |
|                |                |                |         space  |
|                |                |                |                |
|                |                |                |      (X\'40\') |
|                |                |                |     -   Q =    |
|                |                |                |                |
|                |                |                |        replace |
|                |                |                |         any    |
|                |                |                |         single |
|                |                |                |         quote  |
|                |                |                |         (\')   |
|                |                |                |                |
|                |                |                |        X\'7D\' |
|                |                |                |         with a |
|                |                |                |         space  |
|                |                |                |                |
|                |                |                |      (X\'40\') |
|                |                |                |     -   D =    |
|                |                |                |                |
|                |                |                |        replace |
|                |                |                |         both a |
|                |                |                |         comma  |
|                |                |                |         and a  |
|                |                |                |         single |
|                |                |                |         quote  |
|                |                |                |         with a |
|                |                |                |         space  |
|                |                |                |     -   E =    |
|                |                |                |         escape |
|                |                |                |         a      |
|                |                |                |         single |
|                |                |                |         quote  |
|                |                |                |         by     |
|                |                |                |                |
|                |                |                |      inserting |
|                |                |                |         an     |
|                |                |                |         extra  |
|                |                |                |         single |
|                |                |                |         quote  |
|                |                |                |     -   F =    |
|                |                |                |                |
|                |                |                |        replace |
|                |                |                |         comma  |
|                |                |                |         with   |
|                |                |                |         space  |
|                |                |                |         AND    |
|                |                |                |         escape |
|                |                |                |         a      |
|                |                |                |         single |
|                |                |                |         quote  |
|                |                |                |         by     |
|                |                |                |                |
|                |                |                |       doubling |
+----------------+----------------+----------------+----------------+
| ZEROSUP        | 0, 1           | 0              | -   0 = no     |
|                |                |                |     (default   |
| Suppress       |                |                |     value)     |
| leading zeros  |                |                | -   1 = yes    |
|                |                |                | -   When this  |
|                |                |                |     field is   |
|                |                |                |     set to     |
|                |                |                |     zero or is |
|                |                |                |     left       |
|                |                |                |     blank, all |
|                |                |                |     the size   |
|                |                |                |     positions  |
|                |                |                |     of the     |
|                |                |                |     full       |
|                |                |                |     numeric    |
|                |                |                |     size will  |
|                |                |                |     be filled  |
|                |                |                |     with zeros |
|                |                |                |     at         |
|                |                |                |     positions  |
|                |                |                |     higher     |
|                |                |                |     than the   |
|                |                |                |     greatest   |
|                |                |                |                |
|                |                |                |    significant |
|                |                |                |     digit,     |
|                |                |                |     such as:   |
|                |                |                |     00345.67.  |
|                |                |                | -   When the   |
|                |                |                |     value is   |
|                |                |                |     1, this    |
|                |                |                |     same       |
|                |                |                |     example    |
|                |                |                |     value      |
|                |                |                |     would be   |
|                |                |                |     returned   |
|                |                |                |                |
|                |                |                |  left-adjusted |
|                |                |                |     and        |
|                |                |                |     without    |
|                |                |                |     leading    |
|                |                |                |     zeros, as: |
|                |                |                |     345.67.    |
+----------------+----------------+----------------+----------------+
| NEGSYM         | any            | B (= none)     | If this field  |
|                |                |                | is not blank   |
| Negative value |                |                | or set to the  |
| symbol         |                |                | special value  |
|                |                |                | of \'B\', then |
|                |                |                | the characters |
|                |                |                | typed into     |
|                |                |                | this field     |
|                |                |                | will be        |
|                |                |                | inserted into  |
|                |                |                | the value that |
|                |                |                | is returned    |
|                |                |                | whenever the   |
|                |                |                | dynamic        |
|                |                |                | variable value |
|                |                |                | is requested,  |
|                |                |                | and the        |
|                |                |                | numeric value  |
|                |                |                | is negative.   |
|                |                |                | The location   |
|                |                |                | of these       |
|                |                |                | characters is  |
|                |                |                | controlled by  |
|                |                |                | the next two   |
|                |                |                | fields.        |
+----------------+----------------+----------------+----------------+
| NEGBA          | B = before,    | B              | When           |
|                |                |                | characters are |
| Negative       | A = after      |                | specified for  |
| symbol         |                |                | the negative   |
| position       |                |                | value symbol,  |
| (location)     |                |                | this field     |
|                |                |                | indicates      |
|                |                |                | whether the    |
|                |                |                | negative       |
|                |                |                | symbol should  |
|                |                |                | appear before  |
|                |                |                | or after the   |
|                |                |                | string of      |
|                |                |                | numbers.       |
+----------------+----------------+----------------+----------------+
| NEGPOS         | 1 - 9          | 1              | When           |
|                |                |                | characters are |
| Negative       |                |                | specified for  |
| symbol         |                |                | the negative   |
| position       |                |                | value symbol,  |
| (relative      |                |                | this field     |
| distance)      |                |                | indicates how  |
|                |                |                | far the        |
|                |                |                | negative       |
|                |                |                | symbol should  |
|                |                |                | be from the    |
|                |                |                | first (before) |
|                |                |                | or last        |
|                |                |                | (after) digit  |
|                |                |                | in the number. |
|                |                |                | A value of 1   |
|                |                |                | means that the |
|                |                |                | symbol will    |
|                |                |                | appear         |
|                |                |                | immediately    |
|                |                |                | next to the    |
|                |                |                | number.        |
+----------------+----------------+----------------+----------------+
| POSSYM         | any            | B (= none)     | If this field  |
|                |                |                | is not blank   |
| Positive value |                |                | or set to the  |
| symbol         |                |                | special value  |
|                |                |                | of \'B\', then |
|                |                |                | the characters |
|                |                |                | typed into     |
|                |                |                | this field     |
|                |                |                | will be        |
|                |                |                | inserted into  |
|                |                |                | the value that |
|                |                |                | is returned    |
|                |                |                | whenever the   |
|                |                |                | dynamic        |
|                |                |                | variable value |
|                |                |                | is requested,  |
|                |                |                | and the        |
|                |                |                | numeric value  |
|                |                |                | is positive.   |
|                |                |                | The location   |
|                |                |                | of these       |
|                |                |                | characters is  |
|                |                |                | controlled by  |
|                |                |                | the next two   |
|                |                |                | fields.        |
+----------------+----------------+----------------+----------------+
| POSBA          | B = before,    | B              | When           |
|                |                |                | characters are |
| Positive       | A = after      |                | specified for  |
| symbol         |                |                | the positive   |
| position       |                |                | value symbol,  |
| (location)     |                |                | this field     |
|                |                |                | indicates      |
|                |                |                | whether the    |
|                |                |                | positive       |
|                |                |                | symbol should  |
|                |                |                | appear before  |
|                |                |                | or after the   |
|                |                |                | string of      |
|                |                |                | numbers.       |
+----------------+----------------+----------------+----------------+
| POSPOS         | 1 - 9          | 1              | When           |
|                |                |                | characters are |
| Positive       |                |                | specified for  |
| symbol         |                |                | the positive   |
| position       |                |                | value symbol,  |
| (relative      |                |                | this field     |
| distance)      |                |                | indicates how  |
|                |                |                | far the        |
|                |                |                | positive       |
|                |                |                | symbol should  |
|                |                |                | be from the    |
|                |                |                | first (before) |
|                |                |                | or last        |
|                |                |                | (after) digit  |
|                |                |                | in the number. |
|                |                |                | A value of 1   |
|                |                |                | means that the |
|                |                |                | symbol will    |
|                |                |                | appear         |
|                |                |                | immediately    |
|                |                |                | next to the    |
|                |                |                | number.        |
+----------------+----------------+----------------+----------------+
| CURSYM         | any            | \$             | For numeric    |
|                |                |                | variables, a   |
| Currency       |                |                | non-blank      |
| symbol         |                |                | value in this  |
|                |                |                | field will be  |
|                |                |                | inserted       |
|                |                |                | before the     |
|                |                |                | edited number  |
|                |                |                | in a position  |
|                |                |                | specified by   |
|                |                |                | the next two   |
|                |                |                | fields. This   |
|                |                |                | currency       |
|                |                |                | symbol would   |
|                |                |                | appear before  |
|                |                |                | any negative   |
|                |                |                | or positive    |
|                |                |                | symbol, if     |
|                |                |                | that other     |
|                |                |                | symbol were    |
|                |                |                | specified to   |
|                |                |                | appear before  |
|                |                |                | the number     |
|                |                |                | itself.        |
+----------------+----------------+----------------+----------------+
| CURPOS         | F, (.)         | F              | -   When a     |
|                |                |                |     currency   |
| Currency       |                |                |     symbol is  |
| symbol         |                |                |     specified  |
| position       |                |                |     for a      |
| (reference     |                |                |     numeric    |
| point)         |                |                |     variable,  |
|                |                |                |     this field |
|                |                |                |     indicates  |
|                |                |                |     how the    |
|                |                |                |     relative   |
|                |                |                |     distance   |
|                |                |                |     (in the    |
|                |                |                |     next       |
|                |                |                |     field)     |
|                |                |                |     will be    |
|                |                |                |     computed:  |
|                |                |                | -   **F =      |
|                |                |                |     float**:   |
|                |                |                |     The        |
|                |                |                |     currency   |
|                |                |                |     symbol     |
|                |                |                |     will be    |
|                |                |                |     positioned |
|                |                |                |     relative   |
|                |                |                |     to the     |
|                |                |                |     highest    |
|                |                |                |                |
|                |                |                |    significant |
|                |                |                |     digit (or  |
|                |                |                |     relative   |
|                |                |                |     to the     |
|                |                |                |     highest    |
|                |                |                |     zero-fill  |
|                |                |                |     character, |
|                |                |                |     if leading |
|                |                |                |     zeros are  |
|                |                |                |     not        |
|                |                |                |                |
|                |                |                |   suppressed). |
|                |                |                | -   **(.) =    |
|                |                |                |     fixed**: A |
|                |                |                |     period     |
|                |                |                |     character  |
|                |                |                |     indicates  |
|                |                |                |     that the   |
|                |                |                |     currency   |
|                |                |                |     symbol     |
|                |                |                |     should     |
|                |                |                |     appear a   |
|                |                |                |     fixed      |
|                |                |                |     number of  |
|                |                |                |     positions  |
|                |                |                |     to the     |
|                |                |                |     left of    |
|                |                |                |     the        |
|                |                |                |     decimal    |
|                |                |                |     point. If  |
|                |                |                |     the number |
|                |                |                |     of digits  |
|                |                |                |     returned   |
|                |                |                |     for a      |
|                |                |                |     value is   |
|                |                |                |     greater    |
|                |                |                |     than this  |
|                |                |                |     distance,  |
|                |                |                |     the        |
|                |                |                |     currency   |
|                |                |                |     symbol     |
|                |                |                |     will       |
|                |                |                |     appear     |
|                |                |                |                |
|                |                |                |    immediately |
|                |                |                |     next to    |
|                |                |                |     the        |
|                |                |                |     left-most  |
|                |                |                |     digit of   |
|                |                |                |     the        |
|                |                |                |     number.    |
|                |                |                |     The fixed  |
|                |                |                |     position   |
|                |                |                |     is useful  |
|                |                |                |     when       |
|                |                |                |     comparing  |
|                |                |                |     a dynamic  |
|                |                |                |     variable   |
|                |                |                |     numeric    |
|                |                |                |     value to a |
|                |                |                |     string     |
|                |                |                |     that was   |
|                |                |                |     extracted  |
|                |                |                |     from a     |
|                |                |                |     printed    |
|                |                |                |     report     |
|                |                |                |     where the  |
|                |                |                |     currency   |
|                |                |                |     symbol     |
|                |                |                |     always     |
|                |                |                |     appears in |
|                |                |                |     a fixed    |
|                |                |                |     column of  |
|                |                |                |     the report |
|                |                |                |     line.      |
+----------------+----------------+----------------+----------------+
| CURLOC         | 1 - 99         | 1              | Combined with  |
|                |                |                | the reference  |
| Currency       |                |                | point          |
| symbol         |                |                | specified      |
| position       |                |                | above, this    |
| (relative      |                |                | value          |
| distance)      |                |                | determines the |
|                |                |                | number of      |
|                |                |                | positions to   |
|                |                |                | the left of    |
|                |                |                | the number     |
|                |                |                | string where   |
|                |                |                | the currency   |
|                |                |                | symbol will    |
|                |                |                | appear. A      |
|                |                |                | value of 1     |
|                |                |                | means that the |
|                |                |                | currency       |
|                |                |                | symbol will    |
|                |                |                | appear         |
|                |                |                | immediately to |
|                |                |                | the left of    |
|                |                |                | the left-most  |
|                |                |                | digit (or      |
|                |                |                | other          |
|                |                |                | character, if  |
|                |                |                | a              |
|                |                |                | pos            |
|                |                |                | itive/negative |
|                |                |                | sign is used)  |
|                |                |                | in the numeric |
|                |                |                | string.        |
+----------------+----------------+----------------+----------------+
| DESC           | Any printable  | IBM i job ID   | Any useful     |
|                | character text | is inserted if | descriptive    |
| Description    |                | this keyword   | text. If the   |
|                |                | is not         | dynamic        |
|                |                | specified.     | variable was   |
|                |                |                | created by the |
|                |                |                | SETDYNVAR      |
|                |                |                | command, this  |
|                |                |                | field will     |
|                |                |                | contain the    |
|                |                |                | IBM i job ID   |
|                |                |                | (num           |
|                |                |                | ber/user/name) |
|                |                |                | of the job     |
|                |                |                | that executed  |
|                |                |                | the SETDYNVAR  |
|                |                |                | command when   |
|                |                |                | the DESC       |
|                |                |                | keyword is not |
|                |                |                | specified.     |
|                |                |                | When SETDYNVAR |
|                |                |                | is used to     |
|                |                |                | update a       |
|                |                |                | value, any     |
|                |                |                | existing       |
|                |                |                | descriptive    |
|                |                |                | text will not  |
|                |                |                | be overlaid by |
|                |                |                | the IBM i job  |
|                |                |                | ID.            |
+----------------+----------------+----------------+----------------+

### SETHEXDV: Set Dynamic Variable HEX value

This command has been replaced by the Dynamic Variable \*HEX Function
Code.

 

Do not continue to use this command. Instead, the following instructions
explain how to upgrade any existing Dynamic Variables that were
previously created by SETHEXDV into the upgraded format of the \*HEX
Function Code.

 

To convert a hexadecimal Dynamic Variable that was added using SETHEXDV,
use the Work with Dynamic Variables option from any LSAM sub-menu. Find
each hex variable by using the unique name that was assigned to it, such
as \"CR\" for Carriage Return, where the actual stored value was
X\'0D\'. Type option 2=Change next to each variable, one at a time, and
on the maintenance display type \"\*HEX\" into the Function Code field.

 

  -------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** It will be necessary to retype the hexadecimal value, using the notation style of X\'0D\' (using Carriage Return as an example). If the Value Calculator Program Library fields shows a value of \*LIBL, clear out that unnecessary value.
  -------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

Press Enter to update the Dynamic Variable record. Repeat this process
for each variable that had been created using the old SETHEXDV command.

### WAITDYNVAR: Wait for Dynamic Variable Value

This command is useful for implementing coordination of rules, for
example, between Operator Replay Scripts and the LSAM\'s Message
Management feature. The function of this command is to wait up to a
maximum length of time, watching for a named Dynamic Variable to be set
to one of the Values specified in the command parameters. The command
reports its success or failure by setting the reserved Dynamic Variable
named \"WAITDYNVAR\" to a value of either \'PASS\' or \'FAIL\'. The
command returns \'PASS\' immediately upon discovering one of the values,
otherwise it returns \'FAIL\' after the timed watch cycles expire. The
command will also return \'FAIL\' if some other error occurs, such as
the referenced Dynamic Variable not being found, in which case the
command also generates a non-fatal completion message to report the
error condition.

 

In summary, the results of the WAITDYNVAR should first be tested by
comparing the dynamic variable named \"WAITDYNVAR\" for a value of
\'FAIL\'. If the reserved-named dynamic variable returns a value of
\'FAIL\', then the value of the specific application-specific dynamic
variable cannot be used. However, if the value is \'PASS\', that may be
sufficient to control any logic that depends on the results of the
WAITDYNVAR command. But if two values were specified in the command,
then the application-specific dynamic variable can be tested to see
which of the two values was returned. The two-value capability of the
WAITDYNVAR command is often used to control branching of logic, for
example, among two different control groups of Captured Data Response
Rules, or for the branching logic of an Operator Replay script.

#### Command Syntax

In the following example of the WAITDYNVAR command, the optional
parameter for keyword VALUE2 can be left blank, if only one value is to
be tested. The timing parameters demonstrate a maximum wait time of 60
minutes, that is, a DELAY time of 10 seconds multiplied by 360 loops
(repeated checking of the named Dynamic Variable).

 

+----------------------------------+----------------------------------+
| ![White pencil icon on green     | **EXAMPLE:**                     | | circular                         |                                  |
| background](../../../Reso        | WAITDYNVAR VARNAM(dyn_var_name)  |
| urces/Images/example-icon(48x48) | VALUE1(value_string)             |
| .png "Example icon") |                                  |
|                                  | VALUE2(value_string) DELAY(10)   |
|                                  | NBRLOOPS(360)                    |
+----------------------------------+----------------------------------+

 

**KEYWORD DESCRIPTIONS**:

-   **VARNAM:** Dynamic Variable name (refer to Constraint below)\*
    -   The nameof an existing Dynamic Variable. If the Variable does
        not exist in the Dynamic Variable table file when the command
        executes it will return a \'FAIL\' result code.
-   **VALUE1:** Required value string or number, up to 128 characters.
    -   At least this first Value string must be specified. The value
        returned from the Dynamic Variable must match exactly. (Hint:
        Use the DSPDYNVAR command to see the length and format of a
        Dynamic Variable.) If a number is specified it must be enclosed
        within a pair of single quotes, such as: \'1234\'
-   **VALUE2:** Optional additional value string or number, up to 128
    characters
    -   An optional second value string. Leave this parameter blank if a
        second value is not required.
-   **DELAY**: 1 to 999
    -   Used in the IBM i command DLYJOB, the number of seconds to wait
        between checks of the value of the Dynamic Variable.
-   **NBRLOOPS**: 1 to 99999
    -   The number of times to check the value of the Dynamic Variable,
        before each wait period, before the command will report \'FAIL\'
        if the specified values are not found.

      -------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------
      ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** \*Constraint - the Variable used in the VARNAM parameter must be a type-V Dynamic Variable. Type-L variables (for LDA manipulation) cannot be used.
      -------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------

#### WAITDYNVAR Example Applications

This command could be used in any software running under IBM i, as long
as the LSAM library list is in effect. Any program using this command
must be able to retrieve and test the value of the IBM i LSAM reserved
Dynamic Variable named WAITDYNVAR (the same as the command name) in
order to determine if this command has returned a value of \'PASS\'
(either Value string was found) or \'FAIL\' (neither Value string was
found within the specified time limits).

##### Methods Available for Retrieving Dynamic Variables

###### Specify a Dynamic Variable Token with Fields of a Response Rule

Perhaps the most obvious use of the WAITDYNVAR command is to execute it
within a group of Captured Data Response Rules. In this case, the values
of dynamic variables can be tested by specifying Dynamic Variable Tokens
with fields such as Compare Reference or Compare Data.

 

This is the method illustrated in a WAITDYNVA R application example,
below.

###### A User Program Executes the LSAM GETDYNVAR Command

A program can call the LSAM program GETDYNVAR, using the following
syntax, where the value of the Dynamic Variable will be returned in the
third parameter, or a non-blank error code may be returned in the first
parameter. Consider the following example from a Control Language
program:

 

+----------------------------------+----------------------------------+
| ![White pencil icon on green     | **EXAMPLE:**                     | | circular                         |                                  |
| background](../../../Reso        | DCL VAR(&RETURN) TYPE(\*CHAR)    |
| urces/Images/example-icon(48x48) | LEN(7)                           |
| .png "Example icon") |                                  |
|                                  | DCL VAR(&DYNVAR) TYPE(\*CHAR)    |
|                                  | LEN(12)                          |
|                                  |                                  |
|                                  | DCL VAR(&DYNVAL) TYPE(\*CHAR)    |
|                                  | LEN(129)                         |
|                                  |                                  |
|                                  | DCL VAR(&TMESTP) TYPE(\*CHAR)    |
|                                  | LEN(26)                          |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | DCL VAR(&CMPVAL) TYPE(\*CHAR)    |
|                                  | LEN(129)                         |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | CALL PGM(GETDYNVARR)             |
|                                  | PARM(&RETURN &DYNVAR &DYNVAL     |
|                                  | &TMESTP)                         |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | IF COND(&RETURN \*EQ \' \')      |
|                                  | THEN(DO)                         |
|                                  |                                  |
|                                  | CHGVAR VAR(&CMPVAL)              |
|                                  | VALUE(%SST(&DYNVAL 1 128))       |
|                                  |                                  |
|                                  | CHGVAR VAR(%SST(&CMPVAL 129 1))  |
|                                  | VALUE(\'X\')                     |
|                                  |                                  |
|                                  | ENDDO                            |
+----------------------------------+----------------------------------+

 

Notice in the example above that the &DYNVAL parameter is 129 characters
long, although the maximum size of a Dynamic Variable is limited to 128
characters. Byte position 129 of this third program parameter is
reserved for a non-blank character (such as \'X\') in order to protect
against the limitations of long character parameter passing to/from a
Control Language program.

###### A User or Program Executes the LSAM Command DSPDYNVAR

This command may not be useful in many scripted applications, except it
could be used by an Operator Replay script and then the results could
become captured data for processing by response rules.

 

The LSAM command DSPDYNVAR can be used to return a completion message
that includes the Dynamic Variable name, followed by a labeled value
string and then the time stamp when the value was last updated, such as
illustrated here:

ACHCLTMAIL VALUE = YES Last updated: 2012-06-08-14.38.49.574000

###### Database Queries or an SQL Statement

These can be used to fetch the field VTOKVAL from file SMADTA/LSAVARF00
where the field VTOKNAM is equal to the Dynamic Variable name. However,
this method does not take advantage of the Dynamic Variable\'s ability
to format numeric values.

##### An Example Application

The ability to test the contents of a Dynamic Variable can be used to
implement decision logic, where the two different values determine the
program\'s logical progress forward. A good example is using this
command to cause an Operator Replay script to wait for the results of a
job that may be submitted during the Script execution, where the Script
must know the results of the submitted job in order to choose which job
steps to execute at the end of the Script.

 

Consider the case where an Operator Replay script executes a green
screen menu option that causes a new job to be submitted. In this case,
the submitted job is not configured for monitoring by OpCon (that is,
Job Tracking is not being used). Instead, the human operator would
previously wait for a minute or two until the completion message of the
submitted job was reported to the user\'s message queue, as either a
successful job or a failed job.

 

To fully automate this process, the name of the submitted job must be
known. In this example, we will assume that the Script user name is
USER1. One way to automate this whole process would be to use the
following tools and steps.

1.  Register (create) an Operator Replay Token/Variable that will be
    used as a variable Branch-To Label value. The example token name
    used here will be BTOLBL1. The initial value should be the name of
    the script label where the script should branch if the submitted job
    fails: Assume for this example that it will be \'SBMJOBFAIL\'.
    (Hint: Set initial values of variables using Captured Data Response
    Rules that execute at or near the first steps of an Operator Replay
    script, in order to avoid any possible timing issues later in the
    script execution.)
    a.  Set the Operator Replay Token BTOLBL1 value to \'SBMJOBFAIL\'
    b.  Set the LSAM Dynamic Variable JOBSTS1 value to \'JOBFAIL\'.

2.  Register an LSAM Dynamic Variable that will be used to store the
    pass/fail result of the submitted job. The example Dynamic Variable
    used here will be JOBSTS1. The initial value of this variable should
    be the negative result value: Assume for this example it will be
    \'JOBFAIL\'.

3.  Add two IBM i LSAM Message Management Parameters (rules). These
    rules will both monitor the user message queue for the user that
    will submit the new job. In this example, that would be message
    queue USER1 located in library QUSRSYS. Also specify the submitted
    job name. There will be one Message Management Parameter record for
    each possible job completion message, and each Message Management
    Parameter will set the value of the Dynamic Variable named JOBSTS1
    to either \'JOBPASS\' or \'JOBFAIL\'. Consider the following
    representation of these two Parameter configurations:
    a.  For message ID CPF1240, respond with the command:
    b.  For message ID CPF1241, respond with the command:

4.  Add a step to the Operator Replay script before the new job will be
    submitted where a command can be executed from an IBM i command
    entry line. Use the following command to turn off \*BREAK delivery
    of messages to this user, not only simplifying the Operator Replay
    script but also making sure that Message Management will handle
    these messages:

5.  Allow the Operator Replay script step to execute that will cause the
    new job to be submitted. Let\'s assume this will be at step \# 140.

6.  The next step (assume step \# 150) of the Operator Replay script is
    assumed to handle the view of the menu screen from which the job
    start option was selected. Regardless of what command text or
    function key would be executed at this point, any associated Screen
    Data Capture Rules will be executed first. This step \# 150 will
    also perform the conditional script branching logic defined below,
    using an Operator Replay Token in the Branch-to Label field.

7.  Associated with the post-submit job step \# 150, create a Screen
    Capture Rule. It is not important what is captured from the screen,
    so just capture all 1920 bytes starting at row 1, column 1. This
    Screen Capture Rule is actually being used as a link to a series of
    Captured Data Response Rules that are all associated with the same
    Capture Rule, and therefore with the same Operator Replay Script
    Step. The sequence of these Captured Data Response Rules is
    important.

8.  The first Captured Data Response Rule to create is the one that must
    wait for the job completion message. This wait function will be
    performed by the WAITDYNVAR command. For this example, the command
    should be specified similar to the following:

9.  The next Captured Data Response Rule must test whether the
    WAITDYNVAR command itself may have failed, or more likely, if it is
    reporting a timeout, meaning that the submitted job must be stuck
    and no job completion message was ever detected.
    a.  This Rule compares the reserved dynamic variable named
        WAITDYNVAR to a value of \'FAIL\'. If that value is matched, the
        response command sets the Operator Replay token/variable to the
        value that will force the Script to end abnormally:

10. The next two Captured Data Response Rules will set the Operator
    Replay token/variable value, depending on the result returned by the
    WAITDYNVAR command via the Dynamic Variable named WAITDYNVAR.
    a.  Note that each of these rules must include a second, separate
        Rule record that will perform a test of the dynamic variable
        named WAITDYNVAR to be sure it equals \'PASS\'. Use the
        continuation field value of \'AND\' to link this test to each of
        the following Rules records.
    b.  The first Rule compares the {JOBSTS1} token value to \'JOBPASS\'
        and if so, it executes the command that sets the Operator Replay
        Branch-to Label token value to the Script Step label where logic
        continues if the submitted job completed normally:
    c.  The second Rule compares the {JOBSTS1} token value to
        \'JOBFAIL\' and if so, it executes the command that sets the
        Operator Replay Branch-to Label token value to the Script Step
        label where logic continues if the submitted job failed.

11. Good \"programming practice\" suggests that one extra pair of
    Captured Data Response Rules is recommended to produce a controlled
    outcome in case the Dynamic Variable {JOBSTS1} does not contain
    either of the expected values. Use the Captured Data Response Rule
    Continue field value of \'AND\' to combine these two rules in order
    to perform the following tests:

    IF {JOBSTS1} NE \'JOBPASS\'

    AND {JOBSTS1} NE \'JOBFAIL\'

     

    If these two conditions are met, then one of the two Rules records
    must contain the following Response command in order to force the
    Operator Replay Script to branch to the job failure steps.

    ADDRPYTOK TOKNAM(SBMJOBFAIL/BTOLBL1)

     

    Note that this Response Rule pair could also specify a third
    Branch-to Label, if the Script is designed to do something special
    in this case of unexpected failure, or, another Rules record using
    CMD in the continuation field could be used to specify a message
    generation command that would notify operations about this
    unexpected error condition.

12. Remember to add at least two steps to the Operator Replay Script
    that will include the two Branch-to Label values of SBMJOBFAIL and
    SBMJOBPASS. It might also be preferred to put either of these labels
    into separate Scripts, for example, if job failure logic is a
    reusable Script that can be shared by other primary Scripts.

At the SBMJOBFAIL labeled step, one technique that is helpful is to
force the Operator Replay Script to fail, so that the job shows up as a
failed job on the OpCon schedule. A good way to do this is to define a
TOP or BOTTOM condition on the SBMJOBFAIL step where the value string
specified will never be found on the screen (for example, specify a
control string value of \"This will never match\"), and set the option
for handling the forced mismatch to \'F\' = force script to fail.

### LOGDYNVAR: Log and Analyze Dynamic Variable Values

The LOGDYNVAR command and the table of values that it maintains (also
called LOGDYNVAR in library SMADTA) were originally created to store a
series of captured data values that would each be stored into the same
Dynamic Variable. If this command is used to record a copy of the Value
each time the Dynamic Variable is updated, then the series of values
could later be queried to produce statistical results such as an
average, for example, of system CPU or Disk utilization.

 

  -------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** Any text string value can be stored into the LOGDYNVAR file, so it can be used in the following methods.
  -------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------

 

The LOGDYNVAR table adds value to the data store by automatically
assigning a time stamp to each entry. This makes it possible to limit
value surveys within any specified range of times. The table also
supports a 12-character Key field (originally designed to match the
longest possible Dynamic Variable name), a 20-character user-defined
Code column (field) and a 32-character Description column. All three of
these fields could contribute to isolation of data when SQL query
techniques are used.

 

One goal of gathering a series of Values from one Dynamic Variable is to
make it possible for another Dynamic Variable of type \*DB2 to use SQL
SELECT statements to query that series of values. The new Dynamic
Variable would, at run time, produce a single result that might be, for
example, either a MAX value or an AVG (average) value, deduced from the
series of values within a given range of dates/times. Values exceeding
user-defined thresholds could trigger OpCon Events, including
notification actions and possibly also automated remedial jobs executed
by an OpCon Schedule.

#### LOGDYNVAR User Instructions

Values captured from messages, reports and workstation displays can be
easily stored into Dynamic Variables using the \"Store to -\>\" field of
an LSAM Response Rule that can be associated with any Capture Rule. If
the Response Rule also executes the new LOGDYNVAR command, then a series
of values for the same Dynamic Variable name can be stored with a time
stamp (and optional additional CODE and DESC values) by specifying the
Dynamic Variable as a token for the DVVALUE parameter of the LOGDYNVAR
command (as illustrated below).

 

Here is the layout of the LOGDYNVAR table:

 

  Field          Type      Length  **Description**
  ----------- ----------- -------- -----------------------------------------------
  DVRECDATE    TIMESTAMP     26    Automatically assigned
  DVPRIMARY     NUMERIC      9     Automatically assigned
  DVNAME       CHARACTER     12    Dynamic Variable name or other name
  DVVALUE      CHARACTER    128    Current (or any) captured value
  DVCODE       CHARACTER     20    User-defined category, for SQL Select
  DVDESC       CHARACTER     32    User-defined description, opt also for Select

 

Here is the syntax of the LOGDYNVAR command:

SMAPGM/LOGDYNVAR DVNAME(DVORKEYNAME1) +

VALUE(\'Any value string contained within a pair of single quotes.\') +

CODE(\'MY-CODEA-CPU-UTIL\') +

DESC(\'CPU utilization from DSPSYSSTS\')

 

  -------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** Any value can be used for the DVNAME key value, but if it contains special characters or spaces, or it begins with a non-alpha character, then it must be contained within a pair of single quotes in the LOGDYNVAR DVNAME( ) keyword.
  -------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

After one or more values has been stored in association with the same
key value (which could be the Dynamic Variable name), then another
Dynamic Variable can be used to query the series of values by using the
User Program special value of \*DB2. This allows a predefined SQL SELECT
statement to be executed whenever the new Dynamic Variable token will be
replaced. Following is an example of the SQL syntax that can be used to
produce a single average value for the new Dynamic Variable:

 

+----------------------------------+----------------------------------+
| ![White pencil icon on green     | **EXAMPLE:** SQL used to select  | | circular                         | and summarize LOGDYNVAR data     |
| background](../../../Reso        |                                  |
| urces/Images/example-icon(48x48) | SELECT \'CPU avg: \' CONCAT      |
| .png "Example icon") | AVG(DEC(DVVALUE,4,1))            |
|                                  |                                  |
|                                  | FROM SMADTA/LOGDYNVAR            |
|                                  |                                  |
|                                  | WHERE DVNAME LIKE \'CPU%\'       |
|                                  |                                  |
|                                  | AND DVRECDATE \>=                |
|                                  | \'2017-07-10-00.00.00.000\'      |
|                                  |                                  |
|                                  | AND DVRECDATE \<=                |
|                                  | \'2017-07-12-23.59.59.000\'      |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | EXAMPLE RESULT:                  |
|                                  |                                  |
|                                  | CPU avg: 15.2                    |
+----------------------------------+----------------------------------+

 

**EXAMPLE NOTES**:

1.  The SQL statement above can be typed entirely into the WHERE field
    of a \*DB2 extension to a Dynamic Variable master record, if the
    \"field/col\" field is set to a value of \"\*WHERE\".
2.  The example above assumes that the CPU utilization was captured from
    the DSPSYSSTS display on a screen format, and that its maximum value
    could be 999.9. The captured character string is converted to a
    Decimal value using the SQL DEC keyword and its associated numeric
    size parameters (4 digits, of which 1 is to the right of the decimal
    point).
3.  The LOGDYNVAR command and table support two other user-defined
    fields (table columns):
4.  The LSAM does not support any automatic purging of the LOGDYNVAR
    table. This is entirely up to the user. The table could be purged by
    using an SQL statement that deletes all records with timestamps
    older than a user-specified value.

## Maintain Dynamic Variables

Explanations of how Dynamic Variables may be used are offered above.
There are also references to using Dynamic Variables within the
description of many of the LSAM functions documented in other topics.

 

The fields available in the menu function are mostly the same as the
fields available for use in the SETDYNVAR command (documented above, in
this topic).

-   **Screen Title**: Work with Dynamic Variables
-   **Screen ID**: LSAVARR1

###### Menu Pathways

Main Menu \> Job track menu (\#1) \> Maintain dynamic variables (\#6)

###### Options

-   **2=Change**: Select a record for update. Press \<**Enter**\> to
    continue to the individual record maintenance screen.

-   **3=Copy**: Select a record to copy into a new dynamic variable.
    Press \<Enter\> to continue to the Copy record screen where all the
    record fields, including the key values, may be updated, starting
    with the values from the original record.

-   **4=Delete**: Select a dynamic variable to be added to a pending
    list of records to be deleted. When \<Enter\> is pressed, all
    records select with option 4 will appear on a confirmation list
    before records are actually deleted.

-   **5=Display**: View the details of a dynamic variable.

-   **6-DSPDYNVAR(V)**: Option 6 executes the LSAM testing command
    called DSPDYNVAR (display dynamic variable value). This option only
    works on Dynamic Variables of type V; it cannot be used on variables
    of type L. The current value of the Dynamic Variable appears in a
    completion message at the bottom of the screen, along with the date
    of last update. The value is formatted according to the current
    rules, making this a useful way to prove that numeric formatting is
    producing the desired result.

###### Fields

  Field            Description
  ---------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Search content   Type in a value that can be found anywhere in the record represented by each line on the list. The entire record will be searched, not just the fields displayed in the list. Use option 5=Display to see the matching detail that satisfied the search when the cursor appears in the Opt field next to a line on the display. The \<**Enter**\> key or \<**F16**\> may be used to start a search, and \<**F16**\> is used to continue the search from the last record found.
  Variable Name    The key identifier of each record. For records of type L, this name must be the Captured Job ID or the Job Name of a tracked or queued job. For records of type V, this may be any meaningful name that will be used to create a token ID. Job names are limited to 10 characters, but a Captured Job ID or token ID can use up to the 12 characters allowed for this field.
  Seq              This record sequence number may be zeros for records of type V because it has no meaning for this record type. For records of type L, this sequence number is used to create unique records keys when there is more than one dynamic variable assigned to the same Variable Name (there may be multiple updates specified for the LDA content of a single job).
  Typ              The record type is L for a dynamic variable that will be used to update the LDA content of a job. Type V records are dynamic variable tokens that can be inserted into job parameters or the job\'s call command line.
  Description      Any text used to describe the dynamic variable. This text is useful mostly for this list of variables, so that each can be easily identified. When the command SETDYNVAR is used to add a new dynamic variable, the Description will be the IBM i job ID (number/user/name) of the job that executed the SETDYNVAR command.

###### Functions

-   **F3=Exit**: Quits the display of the Job Track Log and returns to
    the menu.
-   **F5=Refresh**: Reload the list display with data from the master
    file.
-   **F6=Add**: Branches to the display where a new dynamic variable
    master record is defined.
-   **F8=DynVar**: Brings up a list of available Dynamic Variable names
    that can be selected and inserted into the VALUE field. These will
    be inserted using the {TOKEN} format.
-   **F12=Cancel**: Quits the display of the LDA Content view and
    returns to the Job Track Log Detail summary display.
-   **F16=Search next**: Press to start a new search based on the value
    entered in the Search input field, or to continue a search from the
    last record found.
-   **F17=Top**: Causes the list to display from the first record. The
    list is sorted in order of the Variable Name and Sequence within
    name.
-   **F18=Bottom**: Causes the list to display the last record in the
    file.

#### F6 = Add (Create) Dynamic Variable

-   **Screen Title**: Create Dynamic Variable
-   **Screen ID**: LSAVARR5

###### Menu Pathways

Main Menu \> Job track menu (\#1) \> Maintain dynamic variables (\#6) \>
F6=Add

Main Menu \> Events and Utilities menu (\#3) \> Maintain dynamic
variables (\#6) \> F6=Add

###### Fields

The variable name cannot be changed when the screen format is shown in
Change mode, but the sequence number may be changed. The original
sequence number shows at the top of the Change screen, and a new value
may be specified in the Sequence number input field on the first line of
record details.

+----------------+----------------+----------------+----------------+
| Field          | Values         | Default        | Description    |
+================+:==============:+:==============:+================+
| Variable name  | Any characters |                | The key        |
|                |                |                | identifier of  |
|                |                |                | each record.   |
|                |                |                | For records of |
|                |                |                | type L, this   |
|                |                |                | name must be   |
|                |                |                | the Captured   |
|                |                |                | Job ID or the  |
|                |                |                | Job Name of a  |
|                |                |                | tracked or     |
|                |                |                | queued job.    |
|                |                |                | For records of |
|                |                |                | type V, this   |
|                |                |                | may be any     |
|                |                |                | meaningful     |
|                |                |                | name that will |
|                |                |                | be used to     |
|                |                |                | create a token |
|                |                |                | ID. Job names  |
|                |                |                | are limited to |
|                |                |                | 10 characters, |
|                |                |                | but a Captured |
|                |                |                | Job ID or      |
|                |                |                | token ID can   |
|                |                |                | use up to the  |
|                |                |                | 12 characters  |
|                |                |                | allowed for    |
|                |                |                | this field.    |
+----------------+----------------+----------------+----------------+
| Sequence       | 000 -- 999     | 000            | This record    |
| number         |                |                | sequence       |
|                |                |                | number should  |
|                |                |                | be zeros for   |
|                |                |                | records of     |
|                |                |                | type V because |
|                |                |                | it has no      |
|                |                |                | meaning for    |
|                |                |                | this record    |
|                |                |                | type. For      |
|                |                |                | records of     |
|                |                |                | type L, this   |
|                |                |                | sequence       |
|                |                |                | number is used |
|                |                |                | to created     |
|                |                |                | unique records |
|                |                |                | keys when      |
|                |                |                | there is more  |
|                |                |                | than one       |
|                |                |                | dynamic        |
|                |                |                | variable       |
|                |                |                | assigned to    |
|                |                |                | the same       |
|                |                |                | Variable Name  |
|                |                |                | (there may be  |
|                |                |                | multiple       |
|                |                |                | updates        |
|                |                |                | specified for  |
|                |                |                | the LDA        |
|                |                |                | content of a   |
|                |                |                | single job).   |
+----------------+----------------+----------------+----------------+
| Variable type  | L, V           | V              | The record     |
|                |                |                | type is L for  |
|                |                |                | a dynamic      |
|                |                |                | variable that  |
|                |                |                | will be used   |
|                |                |                | to update the  |
|                |                |                | LDA content of |
|                |                |                | a job. Type V  |
|                |                |                | records are    |
|                |                |                | dynamic        |
|                |                |                | variable       |
|                |                |                | tokens that    |
|                |                |                | can be         |
|                |                |                | inserted into  |
|                |                |                | job parameters |
|                |                |                | or the job\'s  |
|                |                |                | call command   |
|                |                |                | line.          |
+----------------+----------------+----------------+----------------+
| LDA pos start  | 0 -- 1024      | 0000           | Required for   |
| (start         |                |                | record type L, |
| position in    |                |                | not valid for  |
| LDA)           |                |                | type V. This   |
|                |                |                | number         |
|                |                |                | specifies the  |
|                |                |                | cardinal       |
|                |                |                | position       |
|                |                |                | (1-1024) where |
|                |                |                | substitution   |
|                |                |                | of the dynamic |
|                |                |                | variable\'s    |
|                |                |                | value will     |
|                |                |                | begin in the   |
|                |                |                | image of the   |
|                |                |                | local data     |
|                |                |                | area (LDA)     |
|                |                |                | content for a  |
|                |                |                | job.           |
+----------------+----------------+----------------+----------------+
| LDA pos length | 0 -- 1024      | 0000           | Required for   |
|                |                |                | record type L, |
| (Length of LDA |                |                | not valid for  |
| update)        |                |                | type V. This   |
|                |                |                | number         |
|                |                |                | specifies how  |
|                |                |                | many           |
|                |                |                | characters in  |
|                |                |                | the LDA        |
|                |                |                | content image  |
|                |                |                | will be        |
|                |                |                | updated by the |
|                |                |                | value of the   |
|                |                |                | dynamic        |
|                |                |                | variable. If   |
|                |                |                | the supplied   |
|                |                |                | variable value |
|                |                |                | is longer than |
|                |                |                | this length,   |
|                |                |                | the value will |
|                |                |                | be truncated   |
|                |                |                | to this        |
|                |                |                | length. If the |
|                |                |                | value is       |
|                |                |                | shorter than   |
|                |                |                | this length,   |
|                |                |                | the remaining  |
|                |                |                | length will be |
|                |                |                | padded with    |
|                |                |                | space          |
|                |                |                | characters     |
|                |                |                | (blanks).      |
+----------------+----------------+----------------+----------------+
| Value calc     | A valid IBM i  | Blanks         | The name of an |
| program        | name           |                | optional IBM i |
|                |                |                | program        |
|                |                |                | supplied by    |
|                |                |                | the user that  |
|                |                |                | will calculate |
|                |                |                | the dynamic    |
|                |                |                | variable\'s    |
|                |                |                | value at the   |
|                |                |                | moment just    |
|                |                |                | before the     |
|                |                |                | actual         |
|                |                |                | substitution   |
|                |                |                | will take      |
|                |                |                | place. The     |
|                |                |                | LSAM supports  |
|                |                |                | any length     |
|                |                |                | character      |
|                |                |                | string up to   |
|                |                |                | 128 characters |
|                |                |                | in length. The |
|                |                |                | content of     |
|                |                |                | this character |
|                |                |                | string is not  |
|                |                |                | limited, since |
|                |                |                | a local data   |
|                |                |                | area may       |
|                |                |                | contain any    |
|                |                |                | hexadecimal    |
|                |                |                | value in any   |
|                |                |                | position.      |
|                |                |                |                |
|                |                |                |                |
|                |                |                |                |
|                |                |                | **Note**: The  |
|                |                |                | LSAM passes    |
|                |                |                | the current    |
|                |                |                | value of the   |
|                |                |                | variable to    |
|                |                |                | the program,   |
|                |                |                | but uses       |
|                |                |                | whatever value |
|                |                |                | is returned by |
|                |                |                | the program to |
|                |                |                | replace a      |
|                |                |                | variable token |
|                |                |                | at run time.   |
|                |                |                | There is also  |
|                |                |                | a second       |
|                |                |                | parameter of   |
|                |                |                | 12 characters  |
|                |                |                | passed to the  |
|                |                |                | program that   |
|                |                |                | contains the   |
|                |                |                | Variable Name. |
+----------------+----------------+----------------+----------------+
| Value calc Lib | A valid IBM i  | Blanks         | The DB2/400    |
|                | library name   |                | (DB2 UDB)      |
|                |                |                | library name   |
|                |                |                | where the      |
|                |                |                | user-defined   |
|                |                |                | value          |
|                |                |                | calculate      |
|                |                |                | program is     |
|                |                |                | found.         |
+----------------+----------------+----------------+----------------+
| Description    | Any printable  | IBM i job ID,  | Any useful     |
|                | character text | when the       | descriptive    |
|                |                |                | text. If the   |
|                |                | SETDYNVAR      | dynamic        |
|                |                | command was    | variable was   |
|                |                | used and the   | created by the |
|                |                | DESC keyword   | SETDYNVAR      |
|                |                | is not         | command, this  |
|                |                | specified.     | field will     |
|                |                |                | contain the    |
|                |                |                | IBM i job ID   |
|                |                |                | (num           |
|                |                |                | ber/user/name) |
|                |                |                | of the job     |
|                |                |                | that executed  |
|                |                |                | the SETDYNVAR  |
|                |                |                | command if the |
|                |                |                | DESC keywords  |
|                |                |                | is not         |
|                |                |                | specified.     |
|                |                |                | When SETDYNVAR |
|                |                |                | is used to     |
|                |                |                | update a       |
|                |                |                | value, any     |
|                |                |                | existing       |
|                |                |                | descriptive    |
|                |                |                | text will not  |
|                |                |                | be overlaid by |
|                |                |                | the IBM i job  |
|                |                |                | ID.            |
+----------------+----------------+----------------+----------------+
| C              | Any keyboard   | Blanks         | To specify a   |
| urrent/default | character      |                | fixed value    |
| value          |                |                | for a dynamic  |
|                |                |                | variable, when |
|                |                |                | a value        |
|                |                |                | calculate      |
|                |                |                | program is not |
|                |                |                | being used,    |
|                |                |                | type in the    |
|                |                |                | value. If the  |
|                |                |                | required value |
|                |                |                | cannot be      |
|                |                |                | typed on a     |
|                |                |                | workstation    |
|                |                |                | keyboard, then |
|                |                |                | a value        |
|                |                |                | calculate      |
|                |                |                | program must   |
|                |                |                | be used to     |
|                |                |                | supply the     |
|                |                |                | value at run   |
|                |                |                | time. If a     |
|                |                |                | value          |
|                |                |                | calculate      |
|                |                |                | program is     |
|                |                |                | specified, but |
|                |                |                | the program    |
|                |                |                | cannot be      |
|                |                |                | found at run   |
|                |                |                | time, then any |
|                |                |                | value          |
|                |                |                | specified in   |
|                |                |                | this field     |
|                |                |                | will be used   |
|                |                |                | as the         |
|                |                |                | default.       |
|                |                |                | However, if a  |
|                |                |                | value          |
|                |                |                | calculate      |
|                |                |                | program is     |
|                |                |                | found, and the |
|                |                |                | program        |
|                |                |                | returns        |
|                |                |                | blanks, then   |
|                |                |                | blanks will be |
|                |                |                | used for the   |
|                |                |                | variable       |
|                |                |                | value. For     |
|                |                |                | type V tokens, |
|                |                |                | a blank value  |
|                |                |                | will cause the |
|                |                |                | token to be    |
|                |                |                | removed from   |
|                |                |                | the string     |
|                |                |                | where it was   |
|                |                |                | found and the  |
|                |                |                | string will be |
|                |                |                | compressed to  |
|                |                |                | remove as many |
|                |                |                | spaces as were |
|                |                |                | occupied by    |
|                |                |                | the token. For |
|                |                |                | type L         |
|                |                |                | variables, a   |
|                |                |                | final result   |
|                |                |                | of blanks for  |
|                |                |                | the variable   |
|                |                |                | will cause the |
|                |                |                | LDA to be      |
|                |                |                | updated with   |
|                |                |                | space          |
|                |                |                | characters in  |
|                |                |                | the specified  |
|                |                |                | lo             |
|                |                |                | cation/length. |
+----------------+----------------+----------------+----------------+
| Numeric field  | 0 - 63         | 0              | A non-zero     |
| size           |                |                | value in this  |
|                |                |                | field          |
|                |                |                | designates     |
|                |                |                | that the       |
|                |                |                | dynamic        |
|                |                |                | variable will  |
|                |                |                | always be      |
|                |                |                | handled as a   |
|                |                |                | numeric field, |
|                |                |                | capable of     |
|                |                |                | numeric        |
|                |                |                | operations and |
|                |                |                | also           |
|                |                |                | optionally     |
|                |                |                | subject to     |
|                |                |                | numeric edit   |
|                |                |                | codes to       |
|                |                |                | prepare the    |
|                |                |                | value for      |
|                |                |                | output when it |
|                |                |                | is requested.  |
+----------------+----------------+----------------+----------------+
| Numeric field  | 0 - 63         | 0              | A non-zero     |
| dec            |                |                | value in this  |
|                |                |                | field          |
|                |                |                | specifies the  |
|                |                |                | number of      |
|                |                |                | digits         |
|                |                |                | (included in   |
|                |                |                | the total size |
|                |                |                | value, above)  |
|                |                |                | that are       |
|                |                |                | handled as     |
|                |                |                | right of the   |
|                |                |                | decimal point, |
|                |                |                | that is, part  |
|                |                |                | of the numeric |
|                |                |                | value that is  |
|                |                |                | less than 1,   |
|                |                |                | such as        |
|                |                |                | tenths,        |
|                |                |                | hundredths,    |
|                |                |                | etc. This      |
|                |                |                | field only     |
|                |                |                | applies if the |
|                |                |                | size field is  |
|                |                |                | also not zero. |
|                |                |                | The number of  |
|                |                |                | decimals       |
|                |                |                | cannot exceed  |
|                |                |                | the total      |
|                |                |                | numeric field  |
|                |                |                | size.          |
+----------------+----------------+----------------+----------------+
| Decimal point  | any            | . (period)     | When a numeric |
| symbol         |                |                | value is       |
|                |                |                | defined with 1 |
|                |                |                | or more        |
|                |                |                | decimal        |
|                |                |                | places, this   |
|                |                |                | symbol will be |
|                |                |                | inserted into  |
|                |                |                | the string of  |
|                |                |                | numbers from   |
|                |                |                | the current    |
|                |                |                | value of the   |
|                |                |                | dynamic        |
|                |                |                | variable. In   |
|                |                |                | some countries |
|                |                |                | a comma (,)    |
|                |                |                | might be       |
|                |                |                | expected to    |
|                |                |                | indicate the   |
|                |                |                | start of       |
|                |                |                | decimal        |
|                |                |                | positions.     |
+----------------+----------------+----------------+----------------+
| Grouping       | any            | , (comma)      | FOR NUMERIC    |
|                |                |                | VARIABLES:     |
| separator;     |                |                |                |
| Character edit |                |                | -   The symbol |
|                |                |                |     used to    |
|                |                |                |     separate   |
|                |                |                |     whole      |
|                |                |                |     numbers    |
|                |                |                |     into       |
|                |                |                |     groups of  |
|                |                |                |     3 digits   |
|                |                |                |     each. A    |
|                |                |                |     value of   |
|                |                |                |     \'B\'      |
|                |                |                |     means      |
|                |                |                |     there will |
|                |                |                |     be no      |
|                |                |                |     grouping   |
|                |                |                |     of the     |
|                |                |                |     whole      |
|                |                |                |     number     |
|                |                |                |     digits.    |
|                |                |                |                |
|                |                |                | FOR CHARACTER  |
|                |                |                | VARIABLES:     |
|                |                |                |                |
|                |                |                | The following  |
|                |                |                | values can be  |
|                |                |                | used to escape |
|                |                |                | or replace     |
|                |                |                | single quotes  |
|                |                |                | or commas      |
|                |                |                | contained in   |
|                |                |                | the variable   |
|                |                |                | value:         |
|                |                |                |                |
|                |                |                | -   C =        |
|                |                |                |     replace    |
|                |                |                |     any comma  |
|                |                |                |     (,)        |
|                |                |                |     X\'6B\'    |
|                |                |                |     with a     |
|                |                |                |     space      |
|                |                |                |     (X\'40\')  |
|                |                |                | -   Q =        |
|                |                |                |     replace    |
|                |                |                |     any single |
|                |                |                |     quote (\') |
|                |                |                |     X\'7D\'    |
|                |                |                |     with a     |
|                |                |                |     space      |
|                |                |                |     (X\'40\')  |
|                |                |                | -   D =        |
|                |                |                |     replace    |
|                |                |                |     both a     |
|                |                |                |     comma and  |
|                |                |                |     a single   |
|                |                |                |     quote with |
|                |                |                |     a space    |
|                |                |                | -   E = escape |
|                |                |                |     a single   |
|                |                |                |     quote by   |
|                |                |                |     inserting  |
|                |                |                |     an extra   |
|                |                |                |     single     |
|                |                |                |     quote      |
|                |                |                | -   F =        |
|                |                |                |     replace    |
|                |                |                |     comma with |
|                |                |                |     space AND  |
|                |                |                |     escape a   |
|                |                |                |     single     |
|                |                |                |     quote by   |
|                |                |                |     doubling   |
+----------------+----------------+----------------+----------------+
| Suppress       | 0, 1           | 0              | -   0=no       |
| leading zeros  |                |                |     (default   |
|                |                |                |     value)     |
|                |                |                | -   1=yes      |
|                |                |                | -   When this  |
|                |                |                |     field is   |
|                |                |                |     set to     |
|                |                |                |     zero or is |
|                |                |                |     left       |
|                |                |                |     blank, all |
|                |                |                |     the size   |
|                |                |                |     positions  |
|                |                |                |     of the     |
|                |                |                |     full       |
|                |                |                |     numeric    |
|                |                |                |     size will  |
|                |                |                |     be filled  |
|                |                |                |     with zeros |
|                |                |                |     at         |
|                |                |                |     positions  |
|                |                |                |     higher     |
|                |                |                |     than the   |
|                |                |                |     greatest   |
|                |                |                |                |
|                |                |                |    significant |
|                |                |                |     digit,     |
|                |                |                |     such as:   |
|                |                |                |     00345.67   |
|                |                |                | -   When the   |
|                |                |                |     value is   |
|                |                |                |     1, this    |
|                |                |                |     same       |
|                |                |                |     example    |
|                |                |                |     value      |
|                |                |                |     would be   |
|                |                |                |     returned   |
|                |                |                |                |
|                |                |                |  left-adjusted |
|                |                |                |     and        |
|                |                |                |     without    |
|                |                |                |     leading    |
|                |                |                |     zeros, as: |
|                |                |                |     345.67     |
+----------------+----------------+----------------+----------------+
| Negative value | any            | B (= none)     | If this field  |
| symbol         |                |                | is not blank   |
|                |                |                | or set to the  |
|                |                |                | special value  |
|                |                |                | of \'B\', then |
|                |                |                | the characters |
|                |                |                | typed into     |
|                |                |                | this field     |
|                |                |                | will be        |
|                |                |                | inserted into  |
|                |                |                | the value that |
|                |                |                | is returned    |
|                |                |                | whenever the   |
|                |                |                | dynamic        |
|                |                |                | variable value |
|                |                |                | is requested,  |
|                |                |                | and the        |
|                |                |                | numeric value  |
|                |                |                | is negative.   |
|                |                |                | The location   |
|                |                |                | of these       |
|                |                |                | characters is  |
|                |                |                | controlled by  |
|                |                |                | the next two   |
|                |                |                | fields.        |
+----------------+----------------+----------------+----------------+
| Negative       | B = before,    | B              | When           |
| symbol         |                |                | characters are |
| position       | A = after      |                | specified for  |
| (location)     |                |                | the negative   |
|                |                |                | value symbol,  |
|                |                |                | this field     |
|                |                |                | indicates      |
|                |                |                | whether the    |
|                |                |                | negative       |
|                |                |                | symbol should  |
|                |                |                | appear before  |
|                |                |                | or after the   |
|                |                |                | string of      |
|                |                |                | numbers.       |
+----------------+----------------+----------------+----------------+
| Negative       | 1 - 9          | 1              | When           |
| symbol         |                |                | characters are |
| position       |                |                | specified for  |
| (relative      |                |                | the negative   |
| distance)      |                |                | value symbol,  |
|                |                |                | this field     |
|                |                |                | indicates how  |
|                |                |                | far the        |
|                |                |                | negative       |
|                |                |                | symbol should  |
|                |                |                | be from the    |
|                |                |                | first (before) |
|                |                |                | or last        |
|                |                |                | (after) digit  |
|                |                |                | in the number. |
|                |                |                | A value of 1   |
|                |                |                | means that the |
|                |                |                | symbol will    |
|                |                |                | appear         |
|                |                |                | immediately    |
|                |                |                | next to the    |
|                |                |                | number.        |
+----------------+----------------+----------------+----------------+
| Positive value | any            | B (= none)     | If this field  |
| symbol         |                |                | is not blank   |
|                |                |                | or set to the  |
|                |                |                | special value  |
|                |                |                | of \'B\', then |
|                |                |                | the characters |
|                |                |                | typed into     |
|                |                |                | this field     |
|                |                |                | will be        |
|                |                |                | inserted into  |
|                |                |                | the value that |
|                |                |                | is returned    |
|                |                |                | whenever the   |
|                |                |                | dynamic        |
|                |                |                | variable value |
|                |                |                | is requested,  |
|                |                |                | and the        |
|                |                |                | numeric value  |
|                |                |                | is positive.   |
|                |                |                | The location   |
|                |                |                | of these       |
|                |                |                | characters is  |
|                |                |                | controlled by  |
|                |                |                | the next two   |
|                |                |                | fields.        |
+----------------+----------------+----------------+----------------+
| Positive       | B = before,    | B              | When           |
| symbol         |                |                | characters are |
| position       | A = after      |                | specified for  |
| (location)     |                |                | the positive   |
|                |                |                | value symbol,  |
|                |                |                | this field     |
|                |                |                | indicates      |
|                |                |                | whether the    |
|                |                |                | positive       |
|                |                |                | symbol should  |
|                |                |                | appear before  |
|                |                |                | or after the   |
|                |                |                | string of      |
|                |                |                | numbers.       |
+----------------+----------------+----------------+----------------+
| Positive       | 1 - 9          | 1              | When           |
| symbol         |                |                | characters are |
| position       |                |                | specified for  |
| (relative      |                |                | the positive   |
| distance)      |                |                | value symbol,  |
|                |                |                | this field     |
|                |                |                | indicates how  |
|                |                |                | far the        |
|                |                |                | positive       |
|                |                |                | symbol should  |
|                |                |                | be from the    |
|                |                |                | first (before) |
|                |                |                | or last        |
|                |                |                | (after) digit  |
|                |                |                | in the number. |
|                |                |                | A value of 1   |
|                |                |                | means that the |
|                |                |                | symbol will    |
|                |                |                | appear         |
|                |                |                | immediately    |
|                |                |                | next to the    |
|                |                |                | number.        |
+----------------+----------------+----------------+----------------+
| Currency       | any            | \$             | For numeric    |
| symbol         |                |                | variables, a   |
|                |                |                | non-blank      |
|                |                |                | value in this  |
|                |                |                | field will be  |
|                |                |                | inserted       |
|                |                |                | before the     |
|                |                |                | edited number  |
|                |                |                | in a position  |
|                |                |                | specified by   |
|                |                |                | the next two   |
|                |                |                | fields. This   |
|                |                |                | currency       |
|                |                |                | symbol would   |
|                |                |                | appear before  |
|                |                |                | any negative   |
|                |                |                | or positive    |
|                |                |                | symbol, if     |
|                |                |                | that other     |
|                |                |                | symbol were    |
|                |                |                | specified to   |
|                |                |                | appear before  |
|                |                |                | the number     |
|                |                |                | itself.        |
+----------------+----------------+----------------+----------------+
| Currency       | F, (.)         | F              | When a         |
| symbol         |                |                | currency       |
| position       |                |                | symbol is      |
| (reference     |                |                | specified for  |
| point)         |                |                | a numeric      |
|                |                |                | variable, this |
|                |                |                | field          |
|                |                |                | indicates how  |
|                |                |                | the relative   |
|                |                |                | distance (in   |
|                |                |                | the next       |
|                |                |                | field) will be |
|                |                |                | computed:      |
|                |                |                |                |
|                |                |                | -   F = float: |
|                |                |                |     The        |
|                |                |                |     currency   |
|                |                |                |     symbol     |
|                |                |                |     will be    |
|                |                |                |     positioned |
|                |                |                |     relative   |
|                |                |                |     to the     |
|                |                |                |     highest    |
|                |                |                |                |
|                |                |                |    significant |
|                |                |                |     digit (or  |
|                |                |                |     relative   |
|                |                |                |     to the     |
|                |                |                |     highest    |
|                |                |                |     zero-fill  |
|                |                |                |     character, |
|                |                |                |     if leading |
|                |                |                |     zeros are  |
|                |                |                |     not        |
|                |                |                |                |
|                |                |                |   suppressed). |
|                |                |                | -   (.) =      |
|                |                |                |     fixed: A   |
|                |                |                |     period     |
|                |                |                |     character  |
|                |                |                |     indicates  |
|                |                |                |     that the   |
|                |                |                |     currency   |
|                |                |                |     symbol     |
|                |                |                |     should     |
|                |                |                |     appear a   |
|                |                |                |     fixed      |
|                |                |                |     number of  |
|                |                |                |     positions  |
|                |                |                |     to the     |
|                |                |                |     left of    |
|                |                |                |     the        |
|                |                |                |     decimal    |
|                |                |                |     point. If  |
|                |                |                |     the number |
|                |                |                |     of digits  |
|                |                |                |     returned   |
|                |                |                |     for a      |
|                |                |                |     value is   |
|                |                |                |     greater    |
|                |                |                |     than this  |
|                |                |                |     distance,  |
|                |                |                |     the        |
|                |                |                |     currency   |
|                |                |                |     symbol     |
|                |                |                |     will       |
|                |                |                |     appear     |
|                |                |                |                |
|                |                |                |    immediately |
|                |                |                |     next to    |
|                |                |                |     the        |
|                |                |                |     left-most  |
|                |                |                |     digit of   |
|                |                |                |     the        |
|                |                |                |     number.    |
|                |                |                |     The fixed  |
|                |                |                |     position   |
|                |                |                |     is useful  |
|                |                |                |     when       |
|                |                |                |     comparing  |
|                |                |                |     a dynamic  |
|                |                |                |     variable   |
|                |                |                |     numeric    |
|                |                |                |     value to a |
|                |                |                |     string     |
|                |                |                |     that was   |
|                |                |                |     extracted  |
|                |                |                |     from a     |
|                |                |                |     printed    |
|                |                |                |     report     |
|                |                |                |     where the  |
|                |                |                |     currency   |
|                |                |                |     symbol     |
|                |                |                |     always     |
|                |                |                |     appears in |
|                |                |                |     a fixed    |
|                |                |                |     column of  |
|                |                |                |     the report |
|                |                |                |     line.      |
+----------------+----------------+----------------+----------------+
| Currency       | 1 - 99         | 1              | Combined with  |
| symbol         |                |                | the reference  |
| position       |                |                | point          |
| (relative      |                |                | specified      |
| distance)      |                |                | above, this    |
|                |                |                | value          |
|                |                |                | determines the |
|                |                |                | number of      |
|                |                |                | positions to   |
|                |                |                | the left of    |
|                |                |                | the number     |
|                |                |                | string where   |
|                |                |                | the currency   |
|                |                |                | symbol will    |
|                |                |                | appear. A      |
|                |                |                | value of 1     |
|                |                |                | means that the |
|                |                |                | currency       |
|                |                |                | symbol will    |
|                |                |                | appear         |
|                |                |                | immediately to |
|                |                |                | the left of    |
|                |                |                | the left-most  |
|                |                |                | digit (or      |
|                |                |                | other          |
|                |                |                | character, if  |
|                |                |                | a              |
|                |                |                | pos            |
|                |                |                | itive/negative |
|                |                |                | sign is used)  |
|                |                |                | in the numeric |
|                |                |                | string.        |
+----------------+----------------+----------------+----------------+
| Time of last   | IBM i time     | Program        | Either the     |
| update         | stamp          | defined        | time when the  |
|                |                |                | a              |
|                |                |                | dd/change/copy |
|                |                |                | function was   |
|                |                |                | completed for  |
|                |                |                | this record,   |
|                |                |                | or the last    |
|                |                |                | time the       |
|                |                |                | record was     |
|                |                |                | updated by the |
|                |                |                | SETDYNVAR      |
|                |                |                | command.       |
+----------------+----------------+----------------+----------------+

###### Functions

-   **F3=Exit**: Quits the display and returns to the menu.
-   **F4=Prompt**: F4 causes a window of possible values for the
    Variable Name to be displayed. The list of values is derived from
    the master file of LDA Content, and each unique LDA Key value is
    included in the window list. The LDA Key values are the Captured Job
    IDs. This list is offered as a convenience to make it easy to match
    type L dynamic variables to any existing captured job\'s LDA
    content.
-   **F5=Refresh**: Reload the with data from the master file.
-   **F12=Cancel**: Quits the display without update (unless an update
    was already completed by a prior \<**Enter**\> key) and returns to
    the previous screen.

#### F4=Prompt (Select LDA image key)

Select LDA Image Key

  -------------------------------------------------------------------------------------------------
                                        Select LDA image key
                                 Type line number of LDA image key.
                                    Press Enter to select value.
     [LINE\#]{style="text-decoration: underline;"}  [LDA KEY]{style="text-decoration: underline;"}                                                1  CAPTEST06
                                               2  QUETEST01
                                               3  TESTCAP05
                                                   
                                                   
                                                   
                                                   
                                               Bottom
                     Line number:     [    0]{style="text-decoration: underline;"}                                               F12=Cancel
  -------------------------------------------------------------------------------------------------

###### Menu Pathways

Main Menu \> Job track menu (\#1) \> Maintain dynamic variables (\#6) \>
F6=Add \> F4=Prompt

###### Fields

  Field                  Values          Description
  ------------- ------------------------ ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Line\#                1 - 9999         An artificially generated line number that is entered into the line number input field at the bottom of the window in order to specify which LDA Key value should be returned to the calling screen.
  LDA KEY                                A list of all the unique Captured Job ID values found in the LDA Content master file that has been loaded by one or more job captured processes. This is the key value that must match between a type L dynamic variable and the LDA content master record in order for type L dynamic variables to be useful.
  Line number    1 - maximum list value  Type the Line\# of the desired LDA KEY value to be returned to the calling screen.

###### Functions

-   **F12=Cancel**: Quits the display without selecting a value and
    returns to the previous screen.

#### Option 2 = Change Dynamic Variable

-   **Screen Title**: Create Dynamic Variable
-   **Screen ID**: LSAVARR5

###### Menu Pathways

-   Main Menu \> Job track menu (\#1) \> Maintain dynamic variables
    (\#6) \> 2=Change
-   Main Menu \> Events and Utilities menu (\#3) \> Maintain dynamic
    variables (\#6) \> 2=Change

###### Fields

-   Refer to field description table for option F6=Add, above.
-   The variable name cannot be changed, but the sequence number may be
    changed. The original sequence number shows at the top of the Change
    screen, and a new value may be specified in the Sequence number
    input field on the first line of record details. (Note: Sequence
    numbers are only useful for variables of type L, where there may be
    more than one variable assigned to the same job name that is stored
    in the Variable Name field.)

###### Functions

-   **F3=Exit**: Quits the display and returns to the menu.
-   **F5=Refresh**: Reload the with data from the master file.
-   **F12=Cancel**: Quits the display without update (unless an update
    was already completed by a prior \<**Enter**\> key) and returns to
    the previous screen.

#### Option 3 = Copy Dynamic Variable

-   **Screen Title**: Copy Dynamic Variable
-   **Screen ID**: LSAVARR5

###### Menu Pathways

-   Main Menu \> Job track menu (\#1) \> Maintain dynamic variables
    (\#6) \> 3=Copy
-   Main Menu \> Events and Utilities menu (\#3) \> Maintain dynamic
    variables (\#6) \> 3=Copy

###### Fields

-   Refer to field description table for option F6=Add, above.
-   When copying a record, the source record Variable Name and Sequence
    Number are displayed under the screen heading. New values must be
    specified for both fields in the \"To:\" input fields under the
    headings, except that type L dynamic variables may use the same
    Variable Name as long as a new sequence number is assigned.

###### Functions

-   **F3=Exit**: Quits the display and returns to the menu.
-   **F4=Prompt**: F4 causes a window of possible values for the
    Variable Name to be displayed. The list of values is derived from
    the master file of LDA Content, and each unique LDA Key value is
    included in the window list. The LDA Key values are the Captured Job
    IDs. This list is offered as a convenience to make it easy to match
    type L dynamic variables to any existing captured job\'s LDA
    content. (Refer to example of prompt window above, under F6=Add.)
-   **F5=Refresh**: Reload the with data from the master file.
-   **F12=Cancel**: Quits the display without update (unless an update
    was already completed by a prior \<**Enter**\> key) and returns to
    the previous screen.

#### Option 5 = Display Dynamic Variable Detail

-   **Screen Title**: Display Dynamic Variable
-   **Screen ID**: LSAVARR5

###### Menu Pathways

-   Main Menu \> Job track menu (\#1) \> Maintain dynamic variables
    (\#6) \> 5=Display
-   Main Menu \> Events and Utilities menu (\#3) \> Maintain dynamic
    variables (\#6) \> 5=Display

###### Fields

-   Refer to field description table for option F6=Add, above.

###### Functions

-   **F3=Exit**: Quits the display and returns to the menu.
-   **F5=Refresh**: Reload the with data from the master file.
-   **F12=Cancel**: Quits the display without update (unless an update
    was already completed by a prior \<Enter\> key) and returns to the
    previous screen.
:::

 


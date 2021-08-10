---
lang: en-us
title: Message Management
viewport: width=device-width, initial-scale=1.0
---

# Message Management

[]{#aanchor11} The Message Management feature, when enabled, allows the IBM i LSAM to respond to messages issued by jobs. The predefined IBM i
LSAM responses can deliver answers to messages requiring a response as
well as send events to SAM when a message appears. This same Message
Management server function of the LSAM supports the job-specific message
responses that may be defined for building IBM i job master records in
the Enterprise Manager.

 

  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [The LSAM Message Management function must be started in order for the job-specific message management defined in the OpCon/xps job master to take effect.]
  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Message Management Menu

Message Management Menu

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------
  [SYSTEMNAME                  ]{style="color: #008000;"}MESSAGE MANAGEMENT MENU[                     00/00/00]{style="color: #008000;"}   USERNAME                                                                16:23:53
   
   Select one of the following:
   
   
       1.[ Message management parameters]{style="color: #008000;"}        2.[ Message management logs]{style="color: #008000;"}
       3.[ Start Message management (STRMSGMNG)]{style="color: #008000;"}        4.[ End Message management (ENDMSGMNG)]{style="color: #008000;"}
       5.[ Check Message management status (TRPMSGSTS)]{style="color: #008000;"}        6.[ View job completion message table (DSPPFM LSAMSGF00)]{style="color: #008000;"}
       7.[ Message Management Performance Parameters]{style="color: #008000;"}        8.[ Display Captured Message Data log]{style="color: #008000;"}
       9.[ Display Data Capture Debug log (response rules log)]{style="color: #008000;"}       10.[ Work with Message Data Capture Definitions]{style="color: #008000;"}
      11.[ Work with Captured Data Response Rules ]{style="color: #008000;"}    
  Selection or command
   ===\> \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
  \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
   F3=Exit   F4=Prompt   F9=Retrieve   F12=Cancel
   F13=Information Assistant   F16=System main menu
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------

###### Menu Pathways

Main Menu \> Message management menu (\#2)

###### Options

The options displayed on this menu are explained in the following
sections of this document. Type an option number in the Selection or
command line and press \<**Enter**\> to begin using any of the options.

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

## Message Management Operations

### Start Message Management (STRMSGMNG)

The Start Message Management option tells the LSAM to monitor for
messages. Message management can be started automatically whenever the
LSAM servers are started. The automatic start option is documented below
under the topic F22=Job Parms. The following procedure describes how to
manually start message management when the automatic option is not being
used.

 

  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [Please review the discussion below about Starting Message Management for important information about the warm or cold start mode.]
  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------

 

[Turn On Message Management -- Using the LSAM Menu]{.ul} 
1.  In the command line, enter **SMAGPL/STRSMA**. For more information
    on STRSMA command parameters, refer to [The STRSMA     Command](Components-and-Operation.md#The).
2.  Enter **2** to choose the **Message management** menu in the SMA
    Main Menu.
3.  Enter **3** to choose the **Start Message** management (STRMSGMNG)
    option in the Message management menu.
4.  Respond to the operator prompt about the start mode. Refer to
    [Starting Message Management: Cold vs. Warm](#Starting){.MCXref
    .xref} and [Maintain Message Management     Parameters](#Maintain) for more information.
5.  The result of starting message management is that job TRPMSG is
    submitted to the LSAM subsystem configured in the LSAM Parameters.
    Confirm that message management is active by using the Check
    function, as follows.
6.  Enter **5** to choose the **Check Message management status
    (TRPMSGSTS)** option. A status window will appear confirming the
    server job status.

[Turn On Message Management -- Using the LSAM Command]{.ul} 
1.  In the command line, enter **SMAGPL/STRSMA**. For more information
    on STRSMA command parameters, refer to [The STRSMA     Command](Components-and-Operation.md#The) **-
    or -**
2.  From outside of the LSAM menu system, use the command SMASETLIBL to
    set the job\'s library list to the LSAM environment library list.
    For more information on the SMASETLIBL command refer to
    [SMASETLIBL](LSAM-Environment-Management.md#SMASETLI){.MCXref
    .xref}.
3.  From a command entry line (or the CMD parameter of a SBMJOB
    command), type the LSAM command **STRMSGMNG**. F4=Prompt may be used
    to view the optional start mode parameter. Refer to [Starting     Message Management: Cold vs. Warm](#Starting) and
    [Maintain Message Management Parameters](#Maintain)
    for more information about the start mode.
4.  The result of starting message management is that job TRPMSG is
    submitted to the LSAM subsystem configured in the LSAM Parameters.
    Confirm that message management is active by using the Check
    function, as follows.
5.  Enter the command **TRPMSGSTS** to view a window that reports the
    server status.
6.  When submitting a job (SBMJOB) to run command STRMSGMNG, the LSAM
    library list must be in effect for the job to use the STRMSGMNG
    command. Either specify a job description such as SMALSAJ00 that
    uses this library list, or specify **INLLIBL(\*CURRENT)** to pass
    the current job\'s library list to the submitted job.
7.  The TRPMSGSTS command will not report that the server is active
    until the submitted job completes normally.

### End Message Management (ENDMSGMNG)

The End Message Management option tells the LSAM discontinue monitoring
for messages.

 

[Turn Off Message Management]{.ul} 
1.  In the command line, enter **SMAGPL/STRSMA**. For more information
    on STRSMA command parameters, refer to [The STRSMA     Command](Components-and-Operation.md#The).
2.  Enter **2** to choose the **Message management menu** in the SMA
    Main Menu.
3.  Enter **4** to choose the **End Message management (ENDMSGMNG)**
    option in the Message management menu.
4.  The result of ending message management is that job TRPMSG is ended
    from the LSAM subsystem configured in the LSAM Parameters. Confirm
    that message management is no longer active by using the Check
    function, as follows.
5.  Enter **5** to choose the **Check Message management status
    (TRPMSGSTS)** option. A status window will appear confirming the
    server job status.

### Starting Message Management: Cold vs. Warm

The LSAM Message Management server offers a user-controlled option that
determines the mode in which the server will start. This section
describes the two start modes and it explains how the start mode may be
managed using different methods to start the LSAM server job TRPMSG.

 

The default and normal mode of operation for the LSAM Message Management
server is to use the warm start mode. But it is important to understand
and carefully control how the server is started, especially if the
server must be restarted after an unexpected interruption. Using an
incorrect start mode will either cause important messages to be missed
or it could cause duplicate Events to be initiated. Sometimes the
decision about which start mode to select can be assisted by the DSPMSGQ
tool, described below under Message Management Technical Support Tools.

 

The start mode option (COLDSTART) provided by the LSAM software is a
switch that tells the Message Management server programs whether they
should perform a cold start (option 1) or not (option 0). When the
servers will not perform a cold start, this is referred to as a warm
start. [A warm start is the normal and default mode of starting the LSAM Message Management server.]{.ul}

 

A cold start of the Message Management server is when the server
programs start from the beginning of each message queue they will check.
A warm start is when the server programs attempt to resume processing of
each message queue from after the last message that was read.

 

If a warm start is requested but the Message Management server cannot
find the last message processed, it will skip to the end of the message
queue and process only new messages that arrive. The decision about
which start mode is most appropriate may depend on how recently the
Message Management server was last active.

 

A good general rule to follow is this: If the LSAM Message Management
server was formerly active and it was stopped for only a very short
time, then a warm start (option 0) would be preferred because it would
prevent duplicate processing of messages. However, if the server has
been stopped for a long time, then a cold start (option 1) could be used
because the message key control file data is too old to be useful.
Remember, though, that a cold start would process all the messages in
each message queue. Some queues could contain messages that are too old
to be useful.

 

There are some tools that can be used by technical support personnel to
customize a one-time recovery/restart of the server. If a technical
support person is not available in an emergency situation, perhaps the
best decision would be to use a warm start. The Positive side effect of
this decision would be that some messages might be skipped. However,
this is probably better than processing the same message twice. But that
decision would also depend on the types of message response rules
typically used at a given site. Sometimes it is so critical that every
message be detected, that it would be better to account for duplicate
processing of one or more messages following a cold start of the server.

 

To understand the optional tools and methods that can be used by
technical support personnel to create variations in the way the Message
Management server will start, read How the LSAM Message Management
Works.

## How the LSAM Message Management Works

The IBM i LSAM Message Management server performs the task of surveying
message queues, looking for messages that conform to registered message
response rules. Message response rules are created either by adding
Message Parameters using the IBM i LSAM Menu function, or by adding
message response parameters to an IBM i job in the OpCon/xps EM job
master record. Each message response rule can specify either or both
types of response: answer a message that requires a reply, and/or
generate an OpCon/xps Event.

 

During the process of scanning message queues, the LSAM server job
TRPMSG maintains a control file (TRPMSGF10) where it stores the message
key of the last message read from each message queue. As the server
program repeats its cycle of checking each message queue, it uses the
stored last message key to make sure that it does not process the same
message twice. As long as this server job is active, the cycle of
checking message queues works well and the stored message keys are
normally reliable.

 

  -------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [The message keys that are stored by the LSAM Message Management server could become unreliable if messages are manually deleted from a monitored message queue before the server programs have processed that message and at least one more message that is newer than the message being manually deleted. Avoid manually deleting new messages from a monitored message queue.]
  -------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

If the LSAM Message Management server job is stopped for any length of
time, it is not always possible to predict the state of any message
queue when the server job is later restarted. A message queue may be
cleared, and then new messages may be added to the message queue. In
this case, the last message key that was stored by the server is no
longer valid. A similar circumstance could arise if the last message key
that was stored by the server is for a message that has been manually
removed from the message queue. When the server is unable to locate the
last stored message key, it will normally reposition itself to the end
of the message queue and start processing with the next new messages
that arrive.

 

The behavior of the LSAM Message Management server is normally
predictable once it has established a starting point in each message
queue that it will monitor. But the LSAM operator or administrator is
able to modify the behavior of the server during the startup process in
order to control whether existing messages in any or every message queue
will be processed or skipped as the server first starts monitoring.

### Message Management Start Controls and Rules

The start mode of the LSAM Message Management server is controlled by
either an LSAM control file setting or by a start mode parameter that is
supplied by an operator as the start request is submitted to the LSAM.

 

The LSAM control file value is set by using the Message Management
Parameters, Maintain performance parameters (F22). This value is used by
the server start program when Message Management has been configured to
start automatically along with the other LSAM servers, or when an
operator specifies a value of \"C\" (use control file) with the Start
Message Management command (that is also used from the LSAM menu
function for starting Message Management). Refer to [Message Management Screens and Windows](#Message8) for more information
about using the parameters maintenance function.

 

Message Management is started manually either by selecting menu option
3. Start Message Management, from the LSAM Menu 2. Message Management,
or by executing or submitting the LSAM command STRMSGMNG. Actually, the
menu option uses the same STRMSGMNG command. When this command is used
in an IBM i interactive job, a pop-up window appears offering the option
to start either in warm mode (option 0) or cold mode (option 1). Whether
used interactively or submitted to a batch job, the STRMSGMNG command
supports an optional parameter: COLDSTART. The COLDSTART parameter
supports the following values:

-   C = use the control file value (set by Message Management
    performance parameters).
-   0 = perform a warm start.
-   1 = perform a cold start.

If the COLDSTART parameter is not specified, its default value is \"C\".
The pop-up window that appears when the command is executed in an
interactive job is the way the LSAM software requests a value for the
COLDSTART parameter.

#### Message Management Startup Rules

The LSAM Message Management server start routine responds to the
COLDSTART parameter and to conditions in the LSAM database and the
monitored message queues according to the following logic.

1.  When a cold start was requested, the LSAM message management control
    file (TRPMSGF10) is cleared and the COLDSTART parameter is passed
    along to the message queue scanning program.
    a.  The message queue scanning program always starts at the
        beginning of each message queue when a cold start was requested.
2.  If a warm start was requested but there is no LSAM control file
    record for a message queue, such as the first time that a message
    queue is processed, then that message queue will be scanned starting
    after the last message that was present in the queue at the time the
    first scan was initiated.
    a.  A technical support person can force the server to start
        processing at the end of a message queue by removing the control
        record for that message queue and then requesting a warm start.
3.  If a warm start was requested but the LSAM control file record for a
    message queue contains a message key that is not found in the
    message queue, the server assumes that the message queue contents
    can no longer be predicted. In this case, it automatically resets
    the last message key processed to the last message found in the
    message queue, and then it will process only new messages that
    arrive in the message queue.
    a.  A technical support person can use the undocumented LSAM tools
        to force the LSAM Message Management control file record to
        contain a valid key for any message that is currently found in
        the message queue. Refer to the next section about Undocumented
        Tools for hints to technical support personnel.

### Message Management Parameters --- Qualification Fields

Many different Parameters records could be created to respond to a
single message intercepted by the LSAM Message Management server. This
section explains the different groups of fields in the Parameters master
record that are used to qualify whether each record\'s response will be
executed.

#### Message and Job Profile Fields

Before other forms of message qualification are applied, the LSAM first
validates each message it finds by using the following message profile
fields. After the message passes the profile tests, then messages can be
further filtered using Compare Text, Message Management --- Date and
Time fields and Threshold values.

##### Message Queue and Library

These two fields govern which message queues will be examined by the
LSAM Message Management server job. If the name of a message queue and
its library location do not exist in at least one Message Management
Parameters record, then any messages delivered to that message queue
will never be processed by the LSAM.

 

This rule also applies to job-level message management that is defined
within an IBM i job master record in the OpCon server\'s database. To
accommodate the job-level message management rules stored in the OpCon
database, there is a special LSAM Message Management record type of
\'Q\' (specified in the Answer Type field) that can be registered in the
LSAM database. Type-Q records allow the LSAM to server job-level message
management without requiring that specific message management rules be
entered in the LSAM\'s own database.

 

The messages defined within only the LSAM database do not require a
Type-Q record because the existence of an LSAM Message Management
Parameters record implies that the LSAM will look for messages in the
Message Queue and Library named in that record.

##### Message ID (or Range) and File

The LSAM will check every message delivered to any registered message
queue. However, only those messages with IDs that were specified in IBM
i system or job-level message management will actually be processed by
the LSAM server job.

 

When choosing message IDs to be processed, the LSAM verifies that the
Message ID originated from a specific Message File, or that the
Parameters record specifies \*ALL for the Message File name. It is not
recommended by IBM, but it is possible that the same message ID could be
defined in more than one different message file (where message
descriptions that include actual message text content and format and
also the definition of instance-specific data fields are stored).

 

The LSAM will handle a message that matches one of three Message ID
formats, in the following order, starting with the most specific ID
format first:

-   A specific message ID, such as CPF1234.
-   A range of message IDs, such as CPF1200, where the two zeros at the
    end imply (just as in IBM i Control Language programming) that a
    message will match if it has an ID in the range of CPF1201 through
    CPF1299.
-   A generic response message ID with the special value of \*ALL. SMA
    does not recommend using this value for Message ID, but there may be
    cases where a special message queue was created for a very limited
    purpose, and in this case the client wants all messages in that
    queue to be processed using the same LSAM Message Management
    Parameters record or records.

All LSAM Message Management Parameters that match a message ID will be
processed. This means that if all three of the message ID categories
listed above happen to match a single message, then all rules in every
category will be processed, starting with the most specific category
Parameters record(s) first. When the LSAM processes more than one
Parameters record for Inquiry messages, only the first qualifying
response will actually be returned to IBM i as the answer to the
Inquiry. Any subsequent Inquiry responses will be ignored. However, the
Response CMD field commands will still be executed, as will any
associated Message Data Capture Rules and their Captured Data Response
Rules (refer to more on these rules below).

##### Job Name and Job User Name

Message Management Parameters records may be filtered for processing by
the name of the job and the name of the job user that originated the
message. The LSAM will handle a message that matches one of three name
formats (for the Job Name and/or the User Name) in the following order,
starting with the most specific format first:

-   A specific Job Name and/or a specific User Name.
-   A generic Job Name and/or User Name. For example, if the Parameter
    record specifies a job name of JOB\*, then jobs named JOB001 and
    JOBABCD will both match. The same example applies to a job\'s user
    name.
-   A generic name with the special value of \*ALL. In this case any Job
    Name or any User Name will match the special value of \*ALL. This is
    another way of indicating that the Job Name and/or the User Name are
    not important.

All LSAM Message Management Parameters that match a message ID will be
processed. This means that if all three of the Job and/or User Name
categories listed above happen to match a single message, then all rules
in every category will be processed, starting with the most specific
category Parameters record(s) first. As always, though, only one answer
value will be provided to an Inquiry message, regardless of the
existence of more possible answers.

#### Compare Text

Messages that are qualified after processing the profile filters above
are next checked for an optional qualification by message text content.
If a value is provided for the Compare Text field, then a message will
not be processed by the LSAM unless the Compare Text character string is
found (or not found) somewhere in the message text.

 

The Compare Text will be compared to only the primary message text, to
only the secondary (Help) message text, or to both message text strings.
When both are specified, the LSAM prepares a message text content buffer
by trimming trailing blanks off of the primary text, adding a single
space character, and then appending the secondary text to the same text
buffer. The format of the message text buffer may matter, depending on
the content of he Compare Text field and also on the Position and Length
fields.

 

The Start Position field indicates where in the message text buffer the
Compare Text must be found. The rules for the Start Position vary
depending on the setting of the Comparison Type field. When the
Comparison Type field is EQ or =, the start position may be left at
zeros. If the start position is zeros, the LSAM will search the entire
message text buffer starting at the first buffer character position
(which is designated position 1, not position 0). However, when any
other value is specified for the Comparison Type, then the Start
Position must be specified.

 

The length of data that will be used in the Compare Text search may be
specified in the Length field. When this field is left set to zeros, the
length of the Compare Text is assumed to end with the last non-blank
character. Therefore, if trailing blanks in the Compare Text field must
be considered, the Length field must be set to a non-zero value. (The
length of data field cannot be used to reference all blanks in the
Compare Text field, since blanks in that field means not to perform text
comparisons. If it is necessary to compare to blanks, use a Dynamic
Variable in the Compare Text field.)

 

One or more LSAM Dynamic Variables may be specified in the Compare Text
field. In this case, each Dynamic Variable is first replaced with a
character string produced by the LSAM Dynamic Variable read routine.
Then, the resulting text string is subjected to the same rules about
length as if the string were typed directly in the Compare Text field.
Using more than one Dynamic Variable makes it possible to specify up to
the full length of 999 characters as the Compare Text value. (Each
Dynamic Variable can produce a value up to 128 characters in length.)

### Message Management Parameters --- Date and Time Constraints

Following qualification by the message profile fields above, an
individual message may be further qualified for processing, or
bypassing, according to the date and time the message was issued.

 

Another way to express this rule is that many Message Management
Parameters records may be created for the same Message ID (and matching
other profile fields), but they can be configured in a way that controls
the response to the message according to various date and time values.
For example, a different message response might be required during
off-hours at the data processing center, or a different response might
be required if the message occurs during the last day of the month.

 

More details about the date and time fields are presented below, under
Message Management Screens and Windows. When specifying dates and times,
consider the following possible categories of qualification, and
remember that these may be used in combination.

-   Start and End dates: One or both may be used.
-   Start and End times: One or both may be used.
-   Linking times to dates: The date values and time values are used
    separately, unless the Link flag is set to 1=Link. Used separately,
    the dates and times can include or exclude time ranges. When the
    time fields are linked to the date fields, then these combined
    fields can only mark the start time stamp and or the end time stamp
    within which the message must have been generated, in order to
    select a message for processing. The Start values or the End values
    can be used by themselves to mark just the effective start time
    stamp or the effective end time stamp. (Also refer to the table of
    field values under Screens and Windows for more information about
    using dates and times.)
-   Effective DOW (day of week): Specifies which days of the week by the
    number of the day, where the first day of the week may be set in the
    Message Management Performance Parameters function (LSAM sub-menu 2,
    option 7).
-   Effective DOM (day of month): Specifies starting and ending days of
    each month, where both values may be the same to indicate a single
    day of the month, and the special value of 32 is used to indicate
    End Of Month regardless of the number of days in any given month. It
    is also possible to specify just the start day or just the end day,
    to mark only the beginning or the end of an effective period within
    any given month.

### Message Management Parameters --- Thresholds

There is an optional threshold that may be assigned to a Message
Management Parameters record. The purpose of a threshold is to control
when a Message Management Parameters record will be executed. This
qualification happens only after the Parameters record has first matched
the job and message profile fields, such as Job Name or Job User, and
also after the Parameters record has passed any Compare Text or any date
and time constraint.

 

A threshold is used to count the number of times a message has been
received within a duration period. If the threshold limit is met within
this time period, the Message Management Parameters record will be
processed. This controls not only the Parameters record actions but also
any attached Message Data Capture and, subsequently, any associated
Captured Data Response Rules. The current threshold counter is reset
each time the limit is met, so a certain number of additional
occurrences must be counted before the threshold limit allows a second
execution of the same Parameters record.

 

A threshold is comprised of five different fields that are stored in two
different places. The data elements that define a message management
threshold include:

-   Threshold limit = the number of the incidence of a given, matching
    message ID, at which time the matching Parameters record will be
    processed. Processing occurs when the Threshold count (below) equals
    this number.
-   Threshold count = the name of a numeric LSAM Dynamic Variable that
    is used to hold the current count of the number of times a
    Parameters record was matched by a message ID. This count is
    compared to the threshold limit. When the count equals the limit,
    the Parameters record is processed and the Threshold count is reset
    to zeros. The count of message activity is increased each time a
    message passes all of the filtering tests, above.
-   Duration = the days, hours and minutes of inactivity before a
    threshold counter will be reset. This field is optional, that is, a
    threshold does not have to be subjected to any duration; this means
    that the Threshold count would always be valid, no matter how long
    ago the first incidence of a message was counted.
-   Threshold date control = a flag that determines if the date of last
    update, compared to the Duration, will be taken from the Parameters
    record itself or from the Dynamic Variable where the count is being
    stored.
-   Threshold date(s) = both dates that can be used for calculating the
    Duration expiration are shown. The Dynamic Variable last updated
    date is represented by a letter code of V, and the Parameters record
    date of last message interception is represented by the letter code
    of M. One of these dates is compared to the current date when a
    message has been intercepted to determine if the previous threshold
    count has expired and must be started over at 1.

Dynamic Variables are used to hold the Threshold count (that is compared
to the Threshold limit) because this enables a greater flexibility in
the way threshold counts can be increased, or reset. Sometimes a simple
count of a single message ID is not sufficient to control the desired
response action. Instead, it might be important to manage the activity
counter using a more sophisticated set of rules that can be implemented
as Captured Data Response Rules.

 

Similarly, the option of choosing the last activity date from either the
Parameters record itself or from the Dynamic Variable record makes it
possible to either include or exclude activity outside of Message
Management that might change the Dynamic Variable value.

 

The command SETMSGTHR (set message threshold) can be used, for example,
as a Captured Data Response Rule command, to force a threshold count to
a different number or to reset it to zeros. Similarly, the command
ADDMSGTHR (increase message threshold count) can be used to increase the
threshold count stored in a Dynamic Variable that is associated with the
Message Management Parameters record identified in the command\'s
parameters.

### Message Management Parameters --- Link to Capture Application

The last fields of the Message Management Parameter master record
maintenance are used to connect an optional Message Data Capture
Application to the Parameter record. Message Data Capture Applications
are defined separately, and they can be re-used for multiple different
Parameter records. (This is different from how Capture Data works for
the Operator Replay green screen capture, or the SCANSPLF utility where
the Scan Rules are the capture rules.)

 

Use the following maintenance fields on the maintenance display to
connect a Capture Application to the Parameters master record, and to
define when the Capture Application will execute.

#### Capture Application ID

It is possible to type a known Message Capture Application ID into this
field; however, the text must match exactly (at this time), so it is
critical that the text be a perfect match to the Application ID text
string. This is made easy by using the F10 function key to branch to the
Work with Message Data Capture Definitions list display.

 

From the Capture Definitions list display, type option 1 next to the
Definition that should be linked to the Parameters record, then press
Enter to complete the link and return to the Parameters maintenance
display.

 

The Work with Capture function can be used to build a new Capture
Definition immediately, so that it can then be selected for a link to
the Parameters record; however, when using this technique, be careful to
commit the Parameters record maintenance with the Enter key after
selecting the link.

 

Usually, it is safer to first complete the Parameters maintenance, then
define the Message Data Capture Definition from the LSAM menu option,
and finally re-enter the Parameters Maintenance with option 2=Change.
After that, pressing Enter twice navigates back to the Parameters
maintenance page where function key F10 can be used to access the
Capture Definition list, so that option 1=Select can be used to complete
the link and assure that the Application ID of the Capture Definition is
correctly named in the Parameters record.

#### Before/After Evt, Reply

Type either a \'B\' or an \'A\' into this field to control when the
Message Data Capture Application will execute. Before this field
existed, the default was to always execute a Capture Application after
the Parameters record Reply and/or Event Command were executed.
Therefore, when this field is blank, the default is the same as entering
an \'A\' in this field.

 

It is sometimes very important that the Capture Data Application be
performed Before the Parameters Reply and/or Event command. Using this
method makes it possible to compute a Dynamic Variable value that can be
used as the Reply value and/or as a part of the Event Command.

 

When the Before/After option did not exist, it was often necessary to
create two Parameters records, where the first Parameter record did
nothing but link to the Capture Application, so that the Response Rules
could be executed. Then, a second Parameters record would be able to
utilize the Dynamic Variable tokens. But with the Before/After field,
the strategy is much easier to recognize and configure.

 

Sometimes it is not important that the Capture Application execute After
the Parameters record has already done its job, such as when the Capture
Application is linking to Response Rules that are simply notifying OpCon
about the message action that was already taken.

 

If an older set of Message Management Parameters is being updated with a
specific setting of \'B\' for the Before/After option, be sure to
carefully evaluate the linked Application and its Response Rules. Also
look for any secondary Parameters records that have all the same six
primary message filter keys, but a unique sequence number. Sometimes,
the additional rules with higher sequence numbers may no longer be
needed.

### Message Management Technical Support Tools

There are LSAM utility commands and programs included with the software
product that are intended for use only by informed technical support
personnel. These tools are listed in this online help, but they are not
fully documented because they are not intended for use by anyone who has
not received specific training about how to use the tools correctly. The
following tools may be used by experienced persons to diagnose and/or
control the operation of Message Management if problems arise.

#### Display Message Queue Command

One such tool is the LSAM utility command DSPMSGQ. Information about
this tool is provided here as a hint to technical support personnel.

 

  ------------------------------------------------------------------------------------------------------------------------------ -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White \"X\" icon on red circular background](../../../Resources/Images/warning-icon(48x48).png "Warning icon")   **WARNING:** [Do not attempt to use the DSPMSGQ utility without instructions from SMA Support. This tool can cause unwanted events to occur, either in the LSAM or in OpCon/xps.]
  ------------------------------------------------------------------------------------------------------------------------------ -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

The DSPMSGQ utility command requires that the LSAM library list be in
effect. This tool can be used from the command entry line of the LSAM
menu system, or it can be used from any IBM i command entry line as long
as the current library list of the job is the LSAM library list. The
LSAM library list can be set from outside of the LSAM menu system using
the SMASETLIBL utility command. Refer to [Commands and Utilities](Commands-and-Utilities.md#top) for more
information about LSAM utility commands such as SMASETLIBL.

 

DSPMSGQ displays a list of the current contents of the message queue
named in the command parameters. (Use F4=Prompt to see the command
parameters.) This is a non-destructive list of the message queue
contents. That is, the messages remain in the queue, undisturbed. The
list displays a hexadecimal and a numeric form of the message key value
for each message in the requested queue. It lists the messages in the
order in which they occur in the message queue from the top, down.

 

The message queue contents list display offers an option to display the
details of one or more messages in the list. The details display helps
identify messages by showing more information about the full message
text.

 

There is a function key available on both the list and the message
detail display that can be used to show the contents of the LSAM Message
Management control file for the one message queue that is being
examined.

 

In case the LSAM Message Management control file must be updated to
control the start point of message scanning in a message queue, there is
an option on the list display that can be used to select the message
that will become the last message processed key. When this option is
typed next to a message line and the \<**Enter**\> key is pressed, the
utility will update the Message Management control file record for the
current message queue being examined with the message key and the
message date and time values from the selected message. After this
update, the LSAM Message Management server will begin processing with
the next message in the queue after the message that was selected.

 

There is a function key on the message detail display screen that can
also be used to perform the same update to the Message Management
control file.

 

The safest way to use the control file update function is to first stop
Message Management. This assures that the correct message will be the
next message processed when the server resumes activity. This also
prevents a possible record lock conflict between the utility command\'s
update function and the updates performed by the Message Management
server programs.

 

SMA strongly recommends contacting SMA Support for assistance if it
appears necessary to use the DSPMSGQ utility command to reset LSAM
Message Management processing.

#### Trace Message Management

Another tool for technical support is the ability to record detailed
trace information about all LSAM Message Management operations. Using
this diagnostic tool will create a large number of entries in the LSAM
log file that is normally reserved for SBMJOB messages and for Job
Completion Message activity tracing (file LSALOGF30). Information about
this tool is provided here as a hint to technical support personnel, as
one means of analyzing problems with Message Management.

 

To start detailed activity logging for Message Management, use the
Message Management Performance Parameters (LSAM menu 2, function 7) to
change the flag called \"Trace message management log.\" The value of
the flag must be set to \'1\' (the character one). Next, stop and
restart Message Management in order for the server job to discover and
respond to the order to start detailed tracing.

 

After the error condition has been trapped by this diagnostic tracing
feature, stop Message Management again and change the Trace message
management log flag back to a value of \'0\' (zero) or blank.

 

The trace log entries in file LSALOGF30 may be recognized by log type
values of MM:, ML:, MO:, MK:, MN:, MU: and DQ:. The meaning of these
entries is defined in the source code for the LSAM Message Management
server program (TRPMSGR01). (Source code for SMA software is not
available publicly.) The content of this log file may be conveniently
viewed using the LSAM Management Menu (6), option 5: View LSAM logs,
viewer function 4: Display LSAM submit job log (DSPPFM LSALOGF30).

 

The log entries that are labeled with the log type of DQ: show
information about messages that were intercepted by Message Management,
but that were disqualified for processing because of some of the
filtering rules. It is possible to view the raw data of the DQ: entries
to see advice about the reason that the message was disqualified. This
may help the LSAM Administrator debug some of the complex rules that can
be used to filter messages.

 

For assistance with analysis of the Message Management diagnostic trace
log entries, use the SMASUP command to extract the LSAM LOG files to a
save file and send the save file to SMA Support (refer to [Log File and Database
Management](Log-File-and-Database-Management.md#top){.MCXref
.xref} for instructions about using the SMASUP command and delivering
the save file to SMA Support).

### Using Message Management for Job Completion Messages

The LSAM runs two different server programs and jobs that each perform
message management tasks. Besides the general message management server
job (TRPMSG) described in this topic, there is also the job completion
message server job (MSGMNG). The functions of these two server jobs are
divided according to the rule that all messages arriving in the LSAM\'s
reserved job completion message queue, SMADTA/SMAMSGQ, will be handled
by the job completion message server. Any other message queues may
optionally be monitored by the general message management server.

 

There is an optional control flag in the LSAM Parameters, under the Job
Scheduling Performance Parameters segment on display page two. The flag
is labeled \"Use job cmpl msg mgmt?\" This flag controls how the LSAM
job completion message server program will behave. If the flag is set to
Y=yes, the job completion message server program will check the LSAM\'s
general message management rules for any messages found in
SMADTA/SMAMSGQ that are not actually job completion messages. In this
case, the logic of the LSAM\'s job completion message server program
allows a slight delay before deleting messages from this reserved
message queue in order to allow for various message handling options. If
the control flag is set to N=no, the LSAM job completion message server
program will ignore all but job completion messages and it will remove
each message it finds in SMAMSGQ as the message is received by the
server program, except for messages requiring a reply - which it will
leave unanswered.

 

Following is a summary of how to configure the IBM i LSAM so that
inquiry messages arriving in the LSAM\'s job completion message queue
can be processed using LSAM message management rules. More explanation
about the technical details of this process follows the outline.

 

[How to Use Message Management for the LSAM Job Completion Message Queue]{.ul}

1.  In the command line, enter **SMAGPL/STRSMA** or **LSAMENU**. For
    more information on STRSMA and LSAMENU command parameters, refer to
    [The STRSMA Command](Components-and-Operation.md#The){.MCXref
    .xref}.
2.  Enter **7** to choose the **LSAM Parameters** in the LSAM Main Menu.
3.  Press **PageDown** to go to the second page of LSAM Parameters.
4.  Tab or move the cursor to the field labeled \"Use job cmpl msg
    mgmt?\" and type a value of \"**Y**\".
5.  Press **Enter** to complete the LSAM Parameters maintenance.
6.  Enter **2** to choose the Message management menu.
7.  Enter **1** to choose the **Message management parameters** option
    in the Message management menu.
8.  Press **F6** to add a new message management parameters record.
9.  Type the value \"**SMAMSGQ**\" for the Message Queue field.
10. Type the value \"**SMADTA**\" for the Message Queue Library field,
    or type another name for the LSAM database library if using an
    alternate LSAM environment.
11. Type in values for the other message management parameter fields
    that will match the message ID and job values that are expected to
    deliver an inquiry message to the SMAMSGQ message file.
12. Press **Enter** to record the new message management parameters
    master record.
13. At the Message Management Parameters list display, type option **9**
    and press \<**Enter**\> to activate the new Parameter record.
    (Option 2=Change can also be used to update the record status to
    \"A\"=active.)
14. Press **F12** to return to the LSAM Main Menu.
15. In the LSAM Main Menu, in order to cause the new LSAM Parameter to
    take effect, enter **6** to choose the **LSAM Management menu**.
16. Type **2** and press **Enter** to temporarily stop the LSAM server
    jobs. (This step is not necessary if the LSAMParameters were
    previously set to allow message management for job completion
    messages, prior to the last time the LSAM server jobs were started.)
17. Type **1** and press **Enter** to restart the LSAM server jobs.
18. If LSAM Message Management was not set to start automatically,
    remember to manually restart LSAM Message Management.

#### Message Management for the Job Completion Message Queue

The decision about how to set the job completion message management flag
in the LSAM Parameters may depend on the behavior of third-party
software that the IBM i LSAM is controlling. In most cases, the LSAM
would not expect to find messages in its reserved job completion message
queue that are not actually job completion messages. If that is so, then
the job completion message server program may be more efficient if the
job completion message management flag is set to N=no. It is also
possible that in some environments, the behavior of the LSAM job
completion message management server program might prove inappropriate
when the message management flag is set to Y=yes. There are no specific
rules known that would help to determine if inappropriate behavior might
occur. Instead, the LSAM administrator might suspect that the flag
setting of Y=yes is causing a problem if the LSAM and OpCon/xps do not
seem to properly handle job completion messages.

 

Consider this next example when deciding whether or not to use this LSAM
processing option.

 

+----------------------------------+----------------------------------+
| ![White pencil icon on green     | **EXAMPLE:** An old programming  | | circular                         | technique, not recommended for   |
| background](../../../Reso        | use in IBM i programs, used the  |
| urces/Images/example-icon(48x48) | MSGQ parameter of the SBMJOB     |
| .png "Example icon") | command to identify the name of  |
|                                  | the user profile that submitted  |
|                                  | a job. This value was retrieved  |
|                                  | by a program (using the SBMMSGQ  |
|                                  | parameter of the RTVJOBA         |
|                                  | command) and used to send        |
|                                  | inquiry messages about system    |
|                                  | operations, requiring a reply    |
|                                  | from a user before the program   |
|                                  | could continue operations. IBM i |
|                                  | permits that the MSGQ parameter  |
|                                  | of the SBMJOB command can be     |
|                                  | changed to any value where job   |
|                                  | completion messages should be    |
|                                  | routed, therefore, this          |
|                                  | parameter cannot be relied upon  |
|                                  | to identify the name of the user |
|                                  | profile submitting a job.        |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | The IBM i LSAM sets this SBMJOB  |
|                                  | parameter to                     |
|                                  | MSGQ(SMADTA/SMAMSGQ), where      |
|                                  | SMADTA could be a different name |
|                                  | of the database library in an    |
|                                  | alternate LSAM environment.      |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | In this example, when the LSAM   |
|                                  | submits the job where the        |
|                                  | program issues an inquiry        |
|                                  | message to the job completion    |
|                                  | message queue (before the job is |
|                                  | completed), the default behavior |
|                                  | of the LSAM was to receive the   |
|                                  | message and delete it from the   |
|                                  | message queue without            |
|                                  | considering that a response      |
|                                  | might be required to the         |
|                                  | inquiry. As a result, a \*NULL   |
|                                  | response was sent to the program |
|                                  | that issued the message. If the  |
|                                  | program command issuing the      |
|                                  | message was coded with           |
|                                  | restrictions on the values of a  |
|                                  | reply to the message, the IBM i  |
|                                  | system message processing        |
|                                  | routines rejected the reply and  |
|                                  | re-sent the message to the       |
|                                  | LSAM\'s job completion message   |
|                                  | queue. A tight system logic loop |
|                                  | was generated, flooding either   |
|                                  | the LSAM job completion message  |
|                                  | queue or the OpCon/xps SAM log   |
|                                  | files, and creating a severe     |
|                                  | performance impact on the IBM i  |
|                                  | partition.                       |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | To prevent the system message    |
|                                  | processing loop, the LSAM        |
|                                  | Parameters option for using      |
|                                  | message management with job      |
|                                  | completion messages must be set  |
|                                  | to Y=yes. It is also necessary   |
|                                  | to add a message response rule   |
|                                  | to the LSAM\'s Message           |
|                                  | Management Parameters master     |
|                                  | file that will match the inquiry |
|                                  | message and cause an appropriate |
|                                  | response to be provided.         |
+----------------------------------+----------------------------------+

 

Whenever the LSAM job completion message server is configured to provide
a response to an inquiry message, if the response is not hard-coded in
the LSAM Message Management Parameters master file, the LSAM job
completion message server program will spawn a separate task to handle
the process of obtaining and delivering a response to the inquiry
message. This protects the job completion message server program from
delays, in case the message response rule might involve waiting for a
human response.

 

To analyze LSAM performance anomalies such as the example above cites,
the LSAM utility command DSPMSGQ, described above, might be useful for
examining the messages that arrive in the LSAM\'s reserved SMAMSGQ
message queue. There is also an LSAM debug logging feature that, when
turned on, generates verbose messages in the LSAM log file LSALOGF30.
The LSAM log viewer menu option 4 supports viewing the contents of this
log file. These two tools may help in the decision about when and how to
use LSAM message management rules to more aptly support job message
conditions that may arise in some IBM i partitions.

##### LSAM Parameters Option: Use job cmpl msg mgmt?

When changing the LSAM Parameters option for using message management
rules, the LSAM server jobs must be stopped (ENDSMASYS, or use LSAM Menu
6, option 2), and then restarted (STRSMASYS, or LSAM Menu 6, option 1),
in order for the changed LSAM Parameter flag to take effect.

 

When the LSAM Parameters option to use message management for the job
completion message queue is set to Y=yes, the following rules apply:

-   Actual job completion messages are not subject to management
    according to the LSAM\'s message management parameters. A list of
    reserved message IDs protects the actual job completion messages so
    that they are always handled by the special LSAM routines that
    report job completion to OpCon. There are options in OpCon that may
    be used to respond to job completion status values resulting from
    the LSAM\'s handling of job completion messages.
    -   Use LSAM menu 2. Message Management, option 6. View job
        completion message table (DSPPFM LSAMSGF00), to see the list of
        message IDs from the QCPFMSG message file that the LSAM reserves
        as job completion messages.
-   Only messages that are [not]{.ul} found in the LSAM\'s table of job     completion messages may be subjected to LSAM message management
    rules. This table is not designed for user maintenance, but LSAM
    users may consult with SMA Support for advice if it is suspected
    that the LSAM table of job completion messages should be revised.
-   The LSAM\'s reserved message queue where job completion messages are
    routed by IBM i, called SMAMSGQ in the LSAM database library
    (SMADTA, or other representative name), will not be handled by the
    LSAM\'s general message management server program. This rule is
    hard-coded into the LSAM server programs. Rules added to the LSAM
    Message Management Parameters that specify the message queue SMAMSGQ
    will only be used by the LSAM\'s job completion message server
    program -- and only if the LSAM Parameter is set to allow this type
    of processing.

### Specifying User-Defined Responses to Messages

There are two additional methods for providing responses to inquiry
messages, in addition to the response values that may be entered
directly into the LSAM message management parameters master record. One
method is to cause the inquiry message to be re-routed to a different
message queue and the other method is to have the LSAM message
management server call a user-defined program that will provide the
message reply value.

 

Either of the two alternate message reply methods may be used for both
LSAM general message management or for the special application of
message management rules to the LSAM\'s job completion message server
program.

 

  -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [The two alternate methods of computing a reply for inquiry messages are not available at this time for job-level message management, specified for IBM i job master records in the OpCon schedule. However, it is possible to create an LSAM Message Management Parameter record that applies only to a specific job name, achieving the same effect.]
  -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

#### LSAM Processing of Re-routed Inquiry Messages

The IBM i LSAM Message Management Parameter master record supports an
option to re-route inquiry messages to a different message queue in
order to obtain a reply value that the message management server program
will send to the original inquiry message.

 

This feature is useful in case an IBM i job sends an inquiry message to
the job completion message queue. Since the job completion message queue
is forced to SMADTA/SMAMSGQ by the LSAM job scheduler, any inquiry
messages sent to this queue would not be presented to interactive users
such as the system operator. But if the LSAM Parameter control flag
specifies Y=yes for \"Use job cmpl msg mgmt?\" (Use job completion
message management?), then inquiry messages arriving in the job
completion message queue can be re-routed to any other message queue in
the system.

 

Typically, inquiry messages that are expected to arrive in the job
completion message queue would be sent to the IBM i system operator
(QSYSOPR) message queue, or they could be routed to the message queue of
an LSAM Administrator. Messages would be re-routed to another message
queue whenever it is not possible to use the other parameters of LSAM
message management to determine a correct reply automatically.

 

When either the LSAM job completion message server program or the
general LSAM message management server program detects an inquiry
message that is qualified for re-routing to another message queue, the
main server program actually spawns a separate job (of type BCI = batch
immediate) and passes all the message control information to this
spawned job. The process of spawning another job allows the main server
program to move quickly on to other message processing, rather than be
delayed while waiting for a response generated by an actual person.

 

The spawned message handler program takes full control over the inquiry
message processing. It re-sends the message to the specified alternate
message queue and then it waits indefinitely for a response. Once a
response is returned, the spawned message handler program delivers that
response to the original inquiry message. After all message processing
is completed, the spawned message handler program removes the \"old\"
messages from the message queues it handled.

 

The LSAM debug logging option for \"Transaction manager logging\"
controls whether the spawned message manager program will produce
verbose trace log entries in the LSAM submit job log (log viewer option
4, file LSALOGF30). This debug logging feature is a useful way to trace
exactly how inquiry messages are being handled, and perhaps to debug the
configuration of the LSAM message management parameters.

#### User-Defined Message Reply Programs

The IBM i LSAM Message Management Parameter master record supports an
option to call a user-defined program that will produce an appropriate
reply value for an inquiry message. This option may be useful for any
type of LSAM message management, including both the general message
management facility and the special feature that enables message
management for the LSAM\'s job completion message server.

 

When either the LSAM job completion message server program or the
general LSAM message management server program detects an inquiry
message that requires calling a user-defined program to obtain the reply
value, the main server program actually spawns a separate job (of type
BCI = batch immediate) and passes all the message control information to
this spawned job. The process of spawning another job allows the main
server program to move quickly on to other message processing, rather
than be delayed while waiting for a response generated by an unknown
process. (The unknown process could involve an interaction with a system
user and this could create a long delay.)

 

The spawned message handler program takes full control over the inquiry
message processing. It calls the user-defined program and then it waits
indefinitely for that sub-program to return a response in the call
parameters. Once a response is returned, the spawned message handler
program delivers that response to the original inquiry message. After
all message processing is completed, the spawned message handler program
removes the \"old\" messages from the message queues it handled.

 

The LSAM debug logging option for \"Transaction manager logging\"
controls whether the spawned message manager program will produce
verbose trace log entries in the LSAM submit job log (log viewer option
4, file LSALOGF30). This debug logging feature is a useful way to trace
exactly how inquiry messages are being handled, and perhaps to debug the
configuration of LSAM message management.

 

The rules for creating a user-defined message response program only
dictate the call parameter list that must be used. Any form of
processing is permitted, as long as the program eventually returns a
valid reply to the inquiry message via the specified call parameter. The
IBM ILE RPG prototype for a user-defined inquiry message handler program
is shown below. Either ILE prototype parameters may be used, or
traditional OPM PARM fields may be used in a program \*ENTRY parameter
list.

 

The actual RPG program specifications required to build a user-defined
messenger handler program are illustrated in the following diagram.

User-defined Inquiry Message Handler Program \*ENTRY Parameters

![User-defined Inquiry Message Handler Program \*ENTRY Parameters](../../../Resources/Images/IBM-i/User-defined-Inquiry-Message-Handler-Program-ENTRY-Parameters.png "User-defined Inquiry Message Handler Program *ENTRY Parameters"){.flat}

For more information about the detailed fields that define an inquiry
message, refer to the IBM documentation about the IBM i API called
QMHLSTM.

### Message Management Event Commands

#### Using IBM Commands for Event Response

Previous versions of the IBM i LSAM Message Management Parameters master
file only supported OpCon/xps Event command strings, limited to the
actual OpCon/xps Event command syntax such as \$JOB:RELEASE (meaning to
release a job that is held on an OpCon/xps schedule).

 

Now the LSAM\'s global Message Manager server job is able to support any
IBM-format command as well as the OpCon/xps Event command strings. There
are two function keys on the Message Management Parameters Add or Change
screens that can be used to help correctly format IBM commands:

-   **F4=Prompt Evt**: When the cursor is positioned in the Event
    command field, \<**F4**\> causes a window of available events to
    appear from which a value may be selected and returned to this
    field.
-   **F8=Prompt CMD**: When the cursor is positioned in the Event
    command field, \<**F8**\> causes the job to branch into IBM i
    command prompting. If an IBM i command name was typed before \<F8\>
    was pressed, then that specific command will be prompt. Otherwise, a
    general command search window will appear to help find the desired
    command. (Note that this IBM command prompting will not allow a
    command to be executed.)

The LSAM Message Management server program never stops to process Event
commands. This permits the main server job to quickly find and respond
to messages in many different message queues. Instead, it sends
OpCon/xps Event \$-command strings directly to the LSAM\'s
communications data queue so that the Event command can be immediately
sent to OpCon/xps for processing.

 

When an IBM command is requested, the LSAM Message Manager program
spawns a separate task that is dedicated to processing the Event
command. Every time the Message Manager main server program spawns a new
Event command task this will start another job named TRPMSGCMD that will
run in the LSAM\'s own subsystem under IBM i. Commands may be very short
and quick to process, but it is possible that a user-defined command
could start a long process. Running in a separate task means that
long-running commands will not prevent the main Message Manager from
performing its tasks. One implication of this behavior is that if too
many spawned tasks performing heavy work loads are started at once, this
could impact the responsiveness of all the LSAM server jobs and even of
the whole system. It may be necessary to adjust the performance
parameters of the LSAM\'s subsystem, such as allocating more or
dedicated system memory to the subsystem, if it is anticipated that
Message Management might sometimes generate a heavy work load.

##### Using IBM Commands from Third-Party Applications

Any IBM command could be used for an Event command, including
user-defined commands or commands from third-party application software
that is installed in the IBM i system. The only requirement for
non-system commands is that the LSAM Message Management server job must
be able to find the command. Therefore, if the command does not exist in
either the system library list or the LSAM environment library list, the
command should be qualified by its library location name, such as:

 

  --------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------
  ![White pencil icon on green circular background](../../../Resources/Images/example-icon(48x48).png "Example icon")   **EXAMPLE:** APPLIB/APPCMD KEYWORD1(value1) KEYWORD2(value2)
  --------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------

 

In this example, the command APPCMD is located in the IBM i library
APPLIB. Thus, the LSAM Message Manager would be telling the IBM i system
where to find the command.

 

However, when using non-system commands or commands not installed in the
LSAM environment library list, it is also important to assure how the
command execution program has been configured. Many times commands are
created with the command execution program location specified as
\'\*LIBL\' meaning that the program must be found in the job\'s library
list. Once again, the task spawned by the LSAM Message Manager would not
typically have third-party application libraries in its library list
(unless the LSAM environment library list has been modified to always
include third-party software libraries -- for this purpose). Therefore,
even a library-qualified command may fail to execute, unless the command
uses the Product library attribute of the command to specify the library
where the third-party application software may be found.

#### LSAM Dynamic Variables in Event Commands

The LSAM Message Management server program supports replacement of LSAM
Dynamic Variables that may be included in the Event response command
field. To insert Dynamic Variable tokens into the Event command field it
is helpful to use the Dynamic Variable prompting function key:

-   **F6=DynVar**: This command key, when pressed while the cursor is
    positioned in the Event command field, causes a window listing
    available Dynamic Variables to appear. PageDown as necessary, then
    position the cursor over the desired variable name and press
    \<**Enter**\> to select that variable so that it will be inserted as
    a token into the Event command field. The token will be inserted at
    the position where the cursor was when \<**F6**\> was pressed.

The LSAM Message Manager processes Dynamic Variable token replacement
before any other action when it is preparing to execute an Event
response command. Therefore, the value that is used to replace the token
could contain any form of valid IBM command or OpCon/xps \$-command
string. It is also permitted to use Dynamic Variables in place of one or
more parameters of a command that is typed into the Event command field.
More than one Dynamic Variable can be included in a single Event
command, as long as the final result after token replacement is a valid
format for the allowed command types.

 

Use caution when determining how to set the value of a Dynamic Variable
that will be replaced by the LSAM Message Manager. It might seem
possible to use additional Message Management Event commands or the
Message Manager capability to call user-defined programs in order to set
a Dynamic Variable value. However, due to the way the Message Manager
spawns separate tasks for both of these capabilities, it may not always
be possible to assure that the spawned tasks will be executed in the
order expected. In other words, a task that should have set the Dynamic
Variable value may not be completed before another task that wanted to
use the new value was ready to receive it. For critical circumstances,
it may be advisable to execute a user-defined program that would exert
predictable control over a required sequence of message response events.

### OpCon IBM i Job Master Message Event Command Options

The OpCon/xps job master record format for IBM i jobs supports a tab
where one or more messages may be registered that could occur during the
job execution. Job-level message management takes priority over the
LSAM\'s own global Message Management server, but both types of message
management are handled by the same LSAM server job. Therefore, the same
capabilities as are available to the LSAM\'s own global Message
Management server are also available to the job-level message management
definitions.

 

However, the OpCon/xps job master record maintenance routine (as of the
date of this publication) is not currently programmed to directly handle
the registration of IBM commands or LSAM Dynamic Variables. Instead,
special syntax and rules for the OpCon/xps Event command
\$CONSOLE:DISPLAY have been defined. These special rules only work for
the IBM i LSAM and they are not supported by any other LSAM.

#### Using IBM Commands for Event Response

OpCon/xps job master maintenance only supports the prompting and
updating of OpCon/xps \$-commands as Event commands that may be executed
in response to messages generated by IBM i jobs. However, a work-around
has been developed for this restriction in data entry rules, so that it
is possible to register an IBM-format command that will be executed by
the IBM i LSAM, instead of sending an Event command back to OpCon/xps.

 

To register an IBM-format command in the OpCon/xps job master record,
select the OpCon/xps Event command named \$CONSOLE:DISPLAY. Then, when
replacing the \<**message**\> parameter for this command, insert the
reserved character string: \'QCMD:\' followed by any IBM-format command
that is desired. Following is an example of how the final Event command
would look:

 

  --------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------
  ![White pencil icon on green circular background](../../../Resources/Images/example-icon(48x48).png "Example icon")   **EXAMPLE:** \$CONSOLE:DISPLAY,QCMD:WRKJOB OUTPUT(\*PRINT)
  --------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------

 

In the example above, the location where the DISPLAY message text would
be inserted now contains the required special character string QCMD: and
that is followed by the IBM WRKJOB (work with job) command, as an
example.

 

Be sure to take note of the rules and restrictions explained above,
under: LSAM Parameters Event Command Options -\> Using IBM commands for
Event response -\> Using IBM Commands from Third-Party Applications. The
same considerations apply for commands registered in OpCon/xps jobs
because the message management event commands are processed by the same
LSAM Message Management server job.

#### LSAM Dynamic Variables in OpCon Event commands

The LSAM Message Management server program supports replacement of LSAM
Dynamic Variables. Therefore, any or all of the IBM-format command that
is registered in the OpCon/xps job master record for message management
could be an LSAM Dynamic Variable token. Consider the following example:

 

  --------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------
  ![White pencil icon on green circular background](../../../Resources/Images/example-icon(48x48).png "Example icon")   **EXAMPLE:** \$CONSOLE:DISPLAY,QCMD:{DYNVAR1}
  --------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------

 

In the example above, after the required special character sequence
QCMD: there appears only the LSAM Dynamic Variable name (surrounded by
the required special characters that are registered in the LSAM
environment to denote a Dynamic Variable token; some environments may
use different characters to mark the start and end of a Dynamic Variable
token). The LSAM Message Manager retrieves the character string that
appears after the QCMD: sequence, then it checks for and replaces the
Dynamic Variable token with its current value. In this example, the
token must be replaced by a complete IBM-format command string in order
for the event response to occur.

### Message Data Capture and Captured Data Response Rules

This section explains how to configure Message Data Capture, with
optional Captured Data Response Rules. It also explains how message data
capture and response rules work.

 

There is a universal Captured Data Response Rule capability provided
with the IBM i LSAM. This adaptable tool enables a flexible,
programmable and virtually unlimited response capability that can be
associated with the various LSAM tools that perform data capture.
Operator Replay scripts can capture data displayed on IBM i green screen
workstations. The SCANSPLF tool can capture data printed on reports
coming from programs that ran under IBM i. Similarly, the Message
Management facility can capture data from the primary and/or secondary
(Help) text of messages.

 

Message Data Capture can be used to enable tight integration between
OpCon and third-party application software running under IBM i. Messages
can be generated by any IBM i software and the IBM i LSAM Message
Management Parameters can be configured to respond to those messages.
When message data is captured, the captured data elements can be tested
in order to control a variety of optional responses to any given
message. The responses supported include any form of IBM i command or
program call and also OpCon Event Commands.

 

[How to Configure Message Data Capture]{.ul} 
1.  In the command line, enter **SMAGPL/STRSMA** or **LSAMENU**. For
    more information on STRSMA and LSAMENU command parameters, refer to
    [The STRSMA Command](Components-and-Operation.md#The){.MCXref
    .xref}.
2.  Enter **2** to choose the **Message management menu** in the LSAM
    Main Menu.
3.  Enter **10** to choose **Work with Message Data Capture
    Definitions** in the Message management menu.
4.  Viewing the Work with Message Data Capture Definitions list, take
    note of existing Application Identifiers (if any) so that a unique
    name may be chosen for the new Application.
5.  From Work with Message Data Capture Definitions, press function key
    **F6** to branch to the Create Message Data Capture Definition
    screen.
6.  Type a new value in the Application Identifier field. Use words that
    represent the type of data to be captured or the purpose of this
    capture rule.
7.  More than one record may be added for the same Application
    Identifier rule, such as when multiple data elements should be
    captured from the same message text, so type a unique Capture
    Sequence value, or just use the default value of 10 if there is only
    one record for this Application.
8.  Complete the other message capture definition fields. (Refer to the
    section below about Message Management Screens and Windows for more
    information about these fields.)
9.  Before pressing **Enter** to complete writing the new Capture
    Definition record to the LSAM database file, consider using function
    key **F11=Response rules** to link one or more response rules
    (commands to execute and other functions) to this Capture
    Definition. (Creating Response Rules is outlined next.)
    a.  If **F11** was used to branch to Captured Data Response rules,
        remember to complete the process of entering the Capture
        Definition after returning to this screen by pressing **Enter**.
10. After completing the entry of one or more Message Data Capture
    Definitions, press **F3** to exit this function.
    a.  If this function was entered using **F10** from Message
        Management Parameters, this will return the screen to that
        maintenance function, so skip the next two steps of this
        process.
11. Enter **1** to choose the **Message management parameters** option.
12. Type option **2** to select the appropriate Message Management
    Parameters record that will use the Message Data Capture definition.
13. Use the **TAB** key to move the cursor into the field named
    **Captured Application ID**. Type in the same name of the
    Application Identifier as was just added above.
14. After typing or selecting the Capture Application ID, press
    **Enter** to update the Message Management Parameters record.

After a Message Data Capture Definition has been created and registered
to a Message Management Parameter record, it is possible to also
register Captured Data Response Rules that are executed whenever the
Message Data Capture function is being executed (during processing of a
real message by the LSAM Message Management server job).

 

Remember that Captured Data Response Rules can also be created for
Operator Replay Scripts and for the SCANSPLF command - spool file scan
rules. However, Captured Data Response Rules cannot be shared among
these three LSAM features that use them. They are specially categorized
to match each LSAM function that is performing data capture. This is why
there is a separate entry for Work with Capture Response Rules found on
each of the LSAM function sub-menus. This is also why the convenience
function key **F11=Response rules** has been added to the maintenance
function where each type of data capture is defined, making it easy to
avoid confusion about where the Captured Data Response Rule will be
used.

 

[Adding a Data Capture Rule from the LSAM Menu System]{.ul} 
1.  In the command line, enter **STRSMA** or **LSAMENU**. For more
    information on command parameters, refer to [The STRSMA     Command](Components-and-Operation.md#The) and
    [The LSAMENU Command](Components-and-Operation.md#The2){.MCXref
    .xref}.
2.  Enter **2** to choose the **Message management menu** in the LSAM
    Main Menu.
3.  Enter **11** to choose **Work with Captured Data Response Rules** in
    the Message management menu.
4.  In the Work with Capture Response Rules screen, first, notice that
    the screen title indicates the rules are Subset to Type: MESSAGE.
5.  Press \<**F6**\> to Add a new Capture Response Rule record.
6.  The **Create Capture Response Rule** screen appears.
7.  On the Create Capture Response Rule screen, type the Capture
    Identifier and Capture Sequence number, using an existing Message
    Data Capture Application ID and the appropriate sequence number.
    a.  Since there is no prompting key available to find the Message
        Data Capture Application ID and Sequence number, it may be more
        convenient to enter this Captured Data Response Rule maintenance
        using function key **F11** from the Work with Message Data
        Capture Definitions function. This method of access causes the
        Capture Identifier and Capture Sequence fields to be filled
        automatically.
8.  Type a value of \'M\' (= Message Capture) for the Type field.
9.  Assign a unique Response Sequence number to each response rule. The
    order of the sequence number determines which response rule will be
    executed first.
10. Type a Continuation field value if more than one comparison rule
    must apply. Otherwise, leave this field blank to specify one, simple
    response rule. Refer to more information under [Message Management     Screens and Windows](#Message8).
11. Type a value for the Compress numeric field. Specify Y = yes if the
    captured and compare data values are numeric, otherwise specify N =
    no. This flag must correspond to the similar flag found on the
    associated Message Data Capture Rule.
12. *(Optional)* Specify the names of a Dynamic Variable
    and/or an Operator Replay Token variable that will be used to store
    the captured data value.
13. Type the Response Cmd (command) to execute if the compare data rule
    is matched. Use function key \<**F13=Full CMD**\> if the command
    string is longer than will fit in the (part 1) input field.
14. Type values for the Compare rules that decide when this response
    rule should be executed (refer to more information under [Message     Management Screens and Windows](#Message8)).
    a.  A simple value set that allows a response rule to always execute
        is created by setting the Compare Rule to \"EQ\" (equal) and
        specifying the Compare Data Lines special value of \*ANY.
    b.  In the Compare data lines 1-5 field, use function key \<**F8**\>
        if the data is longer than will fit into lines 1 to 5, but first
        type the first 5 lines into this field before pressing
        \<**F8**\>. The special values of \*ANY, \*PARM, or \"DynVar\"
        may be used. (Refer to more information under [Message         Management Screens and Windows](#Message8).)
15. The value for the Capture length field (a display-only field near
    the bottom, right) is supplied automatically once a Capture
    Identifier and Capture Sequence number have been specified.
16. Press \<**Enter**\> to record the new Capture Response Rule record.
17. The system returns to an updated list of existing Capture Response
    Rule records.
18. If the Captured Data Response Rule maintenance was entered by using
    a function key from a Work with Message Data Capture Definitions
    record screen, remember to also press **Enter** to complete any
    pending update of the Message Data Capture Rule.

#### How Message Data Capture and Response Work

As previously explained, the Captured Data Response Rules work the same
for Message Data as they do for Operator Replay captured screen data and
for SCANSPLF captured report data. However, some additional notes are
provided in this section to illustrate some strategies that are unique
to Message Management. One point of focus is on the management of
message response by LSAM message management thresholds.

 

The general rule for message data capture is that the data capture rule
will only be executed when an associated Message Management Parameters
rule qualifies for processing a specific message. However, the message
capture rule itself may be prevented from executing if a Scan Label is
used to help identify the location of the data element to be captured.
In this case, if the Scan Label is not found at all, or if the Scan
Label is not found as many times as indicated in the Incidence count
(\#), then the Capture Rule will be skipped.

 

Skipping a Message Data Capture Rule means that none of its associated
Captured Data Response Rules will be executed. This could become
important in case a critical Dynamic Variable is being loaded by the
Captured Data Response Rules record.

 

Whenever a Message Data Capture Rule is executed the LSAM will check for
any Captured Data Response Rules to be executed. Each Response Rule may
be qualified by a potentially complex Compare Data rule definition. It
is possible for one Message Data Capture Rule to have many different
Response Rules associated with it, but that only certain of those
Response Rules would actually be executed. An example of how to use this
capability is provided below in the Examples section.

##### Message Data Capture Applications

The Application ID used for capturing message data is handled
differently than Operator Replay or SCANSPLF. A single Application ID
could be created for each separate Message Management Parameters record
that might need to use captured data. However, since it is possible to
have many different Management Parameters qualified to handle a single
message by Job Name, Job User and date and time parameters, it might
sometimes be convenient for all those different Message Management
Parameters to share the same Application ID for capturing message data,
since the Message ID will always be the same.

 

Therefore, the Message Management Parameters master record has a field
that points to an Application ID, but the Message Data Capture Rules
that belong to that Application ID do not point back to a Message
Management Parameters record.

 

A single Application ID may have more than one message data capture
rule. In that case, each rule is assigned a unique sequence number. This
allows for the possibility of capturing more than one data element from
a single message. All of the records belonging to the same Application
ID will be executed whenever their associated Message Management
Parameters record qualifies for handling a specific message. The
sequence number also controls the order in which message data capture
rules are executed, although the sequence of events is not critical
unless any associated Captured Data Response Rules must be executed in a
certain specific order.

##### Examples of Using Message Data Capture and Response

Among many possible uses for captured message data, one simple use might
be to capture the name of an IBM i system device, so that the specific
device name can be passed to OpCon for the purpose of notifying a
supervisor about an unexpected critical device error. For this purpose,
the message text can be scanned for the device name, using the message
data capture rules. Then a Captured Data Response Rule is associated
with the capture rule and used to (1) store the device name in an LSAM
Dynamic Variable, and then (2) use the Dynamic Variable value in an
OpCon Event command that is sent from the LSAM to OpCon in order to
notify the supervisor.

 

Another important use for Captured Message Data and the Captured Data
Response Rules is to create complex threshold management. For example,
consider a bank that supports ATM devices on a network connected to an
IBM i partition. Perhaps an ATM device is able to send a warning message
about an unexpected device status, but the device has its own built-in
recovery procedure. In this case, there is no need to notify a
supervisor the first time the ATM device status message is received.
However, if the error continues to occur multiple times within a certain
time limit, then it could become very important to use OpCon to
automatically signal a supervisor (or to signal some other automated
process) so that the device can be physically examined in order to
eliminate the cause of the device failure.

 

In this second example, the simple threshold counter associated with the
message ID would not be useful because there are many ATM devices that
could issue the same error. Instead, it would be necessary to set up a
virtual array of threshold counters, one for each ATM device. Multiple
LSAM Dynamic Variables using numeric format could be established as the
event counters, one for each ATM device. If the Dynamic Variable name is
made equal to the actual ATM device name that appears in error messages,
then Message Data Capture could be used to (1) store the name of the
current ATM device in a working Dynamic Variable, and then (2) trigger a
Captured Data Response Rule using the working Dynamic Variable value as
the name of the appropriate counter Dynamic Variable that needs to be
increased.

 

After the step that increases the ATM device error counter, a second
Captured Data Response Rule could use the same working Dynamic Variable
value to fetch the count of the current ATM device errors and compare it
to a threshold value. This comparison would be implemented by the
Compare Data rules of the second Captured Data Response Rules record.
The threshold limit could either be hard-coded into one of the two
Compare Data fields, or it could be stored in a third Dynamic Variable
(making it easily possible to \"tune\" the error response to an
appropriate threshold level). Whenever the threshold limit is met, a
response command could be executed by the second Captured Data Response
Rule.

 

Taking this second example another step, it might be possible for two
ATM devices to report an error at nearly the same time. In this case, it
would not work to have just one working Dynamic Variable where the ATM
device name is stored, because the LSAM Message Management server does
not perform all of the message responses in strict serial order.
Instead, Captured Data Response Rules may be spawned into separate,
parallel tasks. Thus, a second spawned task might possibly overlap
processing of a first spawned task.

 

To prevent the conflict of trying to share just one Dynamic Variable to
hold the current ATM device name that was captured from the error
message text, it might be necessary to rely on the captured message data
element that is stored in a Captured Data Log file. It is possible to
create a series of parallel Captured Data Response Rules where the
actual Captured Data element is compared to a hard-coded ATM device name
in each one of the series of Response Rules. In this way, only the
Response Rule that matches the current ATM device name will be executed,
and that response rule would also include the actual name of the Dynamic
Variable where the activity counter for that one device is being stored.

#### Analyzing Complex Message Data Response Rules

According to the complex example described above, it is easy to see that
there could be a very complex series of Message Management Parameter
records, linked to many Message Data Capture Rules, which in turn could
be linked to many Captured Data Response Rules. It would be very hard to
discover all of these relationships without some diagnostic inquiry
tools.

 

The LSAM Message Management Menu includes a number of functions that
help identify these kinds of complex relationships.

##### Message Management Parameters Record Key Number

The first useful tool is a data element: Each Message Management
Parameters record is identified by a unique numeric key. This numeric
key can be observed when viewing option 5=Display details of a
Parameters record, but it may also be viewed directly from the list of
all Message Management Parameters records by pressing function key
**F1=Alt view**. The alternate view of the Message Management Parameters
records shows a column on the right side labeled **MmRecKey\#** (which
means Message Management Record Key Number). It is sometimes helpful to
take note of this record key when analyzing message responses.

 

For example, menu function 2, Message management logs, shows activity
records that always include the MmRecKey\# value (sometimes with a
different, though obvious label). If a processing error is found among
the log records, it will be important to note the MmRecKey\# value in
order to find the exact Message Management Parameters record from the
separate list of the Parameters records (using menu function 1). (Note:
This number is not the same as the SQ\#, the sequence number assigned
when more than one Parameters record references all the same message
profile fields (ID, Job Name, etc.).)

##### Flow Chart of Message Responses

On the list of Message Management Parameters, menu function 1, there is
an option **7=Capt chart**. This option may be typed next to a
Parameters record, and when **Enter** is pressed, the display will
change to a list showing multiple record types that create a flow chart
of linked Message Data Capture Rules and also any associated Captured
Data Response Rules. This flow chart list display is described below
under Message Management Screens and Windows.

 

The flow chart list uses colors and indented lines to make the flow more
obvious. Yellow values define the Message Management Parameters record,
blue values define Message Data Capture Rules, and pink values are used
for the Captured Data Response Rules.

 

The list display supports a function key **F11=Next view** that changes
the details displayed for the Captured Data Response Rules records
appearing in the list. There are four variations, and the current list
format number is displayed in the column headings line as a special
headings data field called **View**. Changing the view of the Response
Rules makes it easy to view different Compare Data rules and also to
view the Response Commands.

 

The flow chart list display supports an option **5=Display** that can be
used to branch directly to the details view of each record type. This
unique cross-program connection point makes it easy to examine all the
details of a complex, related series of records from three different
master files.

 

The Search Content field at the top of the flow chart list display is
very flexible because it can be used to find any content in any of the
three record types on display. For example, a search could be conducted
to find a record where a certain Dynamic Variable name has been used. If
the search is successful, the display cursor will appear in the Opt
(option) field next to the line that matches. The matching data may not
appear in the list display, but option **5=Display** may be used to view
the details of the selected record to verify the search match.

## Message Management Screens and Windows

### Message Management Performance Parameters

This function is used to set global options that control the actions of
LSAM Message Management.

-   **Screen Title**: Message Management Performance Parameters
-   **Screen ID**: TRPMSGD40-R1

###### Menu Pathways

Main Menu \> Message management menu (\#2) \> Message management
performance parameters (\#7)

###### Fields

+----------------------+----------------------+----------------------+
| Parameter            | Default (VALUES)     | Description          |
+======================+:====================:+======================+
| Activity poll        | 15 (seconds)         | -   This value helps |
| interval             |                      |     to balance how   |
|                      |                      |     aggressively     |
|                      |                      |     Message          |
|                      |                      |     Management will  |
|                      |                      |     be checking for  |
|                      |                      |     messages that    |
|                      |                      |     OpCon/xps job    |
|                      |                      |     details have     |
|                      |                      |     specified should |
|                      |                      |     be managed,      |
|                      |                      |     versus the       |
|                      |                      |     impact of this   |
|                      |                      |     facility on      |
|                      |                      |     overall system   |
|                      |                      |     performance.     |
|                      |                      | -   A smaller number |
|                      |                      |     of seconds will  |
|                      |                      |     improve the      |
|                      |                      |     LSAM\'s ability  |
|                      |                      |     to manage        |
|                      |                      |     messages from    |
|                      |                      |     individual jobs  |
|                      |                      |     or message       |
|                      |                      |     queues, whereas  |
|                      |                      |     a larger number  |
|                      |                      |     of seconds will  |
|                      |                      |     allow more       |
|                      |                      |     system resources |
|                      |                      |     for other        |
|                      |                      |     important jobs   |
|                      |                      |     such as LSAM Job |
|                      |                      |     Scheduling       |
|                      |                      |     activity.        |
+----------------------+----------------------+----------------------+
| Auto-start message   | N(Y or N)            | -   Y = yes, tells   |
| management           |                      |     the LSAM         |
|                      |                      |     subsystem        |
|                      |                      |     startup          |
|                      |                      |     procedure to     |
|                      |                      |     automatically    |
|                      |                      |     start message    |
|                      |                      |     management at    |
|                      |                      |     the same time as |
|                      |                      |     the LSAM server  |
|                      |                      |     programs are     |
|                      |                      |     started. When    |
|                      |                      |     this value is    |
|                      |                      |     set to Y,        |
|                      |                      |     stopping the     |
|                      |                      |     LSAM also stops  |
|                      |                      |     message          |
|                      |                      |     management.      |
|                      |                      | -   N = no, means    |
|                      |                      |     that message     |
|                      |                      |     management will  |
|                      |                      |     only be started  |
|                      |                      |     when the manual  |
|                      |                      |     start command or |
|                      |                      |     menu function    |
|                      |                      |     (described       |
|                      |                      |     above) are used. |
|                      |                      |     Set this flag to |
|                      |                      |     N (the default)  |
|                      |                      |     when message     |
|                      |                      |     management will  |
|                      |                      |     never be used.   |
+----------------------+----------------------+----------------------+
| Server start mode    | 0 = warm start       | -   0 = keep the     |
|                      | (default)1 = cold    |     content of the   |
|                      | start                |     Message          |
|                      |                      |     Management       |
|                      |                      |     message key      |
|                      |                      |     control file.    |
|                      |                      |     This allows the  |
|                      |                      |     server to        |
|                      |                      |     perform a warm   |
|                      |                      |     start,           |
|                      |                      |     attempting to    |
|                      |                      |     resume message   |
|                      |                      |     queue reading    |
|                      |                      |     from after the   |
|                      |                      |     last message     |
|                      |                      |     that was         |
|                      |                      |     previously       |
|                      |                      |     processed.       |
|                      |                      | -   1 = clear the    |
|                      |                      |     content of the   |
|                      |                      |     Message          |
|                      |                      |     Management       |
|                      |                      |     message key      |
|                      |                      |     control file.    |
|                      |                      |     This tells the   |
|                      |                      |     server to first  |
|                      |                      |     clear the        |
|                      |                      |     control file     |
|                      |                      |     before starting  |
|                      |                      |     the server       |
|                      |                      |     processing, and  |
|                      |                      |     it instructs the |
|                      |                      |     server to start  |
|                      |                      |     at the beginning |
|                      |                      |     of each message  |
|                      |                      |     queue.           |
|                      |                      |                      |
|                      |                      | Refer to additional  |
|                      |                      | discussion below     |
|                      |                      | about Starting       |
|                      |                      | Message Management.  |
+----------------------+----------------------+----------------------+
| Trace message        | 0(0 1)               | -   0 = no trace, 1  |
| management log       |                      |     = debug logging  |
|                      |                      | -   This option flag |
|                      |                      |     can turn on a    |
|                      |                      |     highly detailed  |
| (Replaces former     |                      |     form of activity |
| external TRPMSGDBUG  |                      |     trace logging    |
| data area.)          |                      |     that is separate |
|                      |                      |     from the         |
|                      |                      |     standard Message |
|                      |                      |     Management       |
|                      |                      |     outcome logging  |
|                      |                      |     file. This is a  |
|                      |                      |     support          |
|                      |                      |     diagnostic tool  |
|                      |                      |     that can         |
|                      |                      |     generate a large |
|                      |                      |     amount of data   |
|                      |                      |     in the LSAM      |
|                      |                      |     general purpose  |
|                      |                      |     log file         |
|                      |                      |     LSALOGF30. Debug |
|                      |                      |     logging should   |
|                      |                      |     only be used     |
|                      |                      |     when requested   |
|                      |                      |     by SMA Support   |
|                      |                      |     to diagnose      |
|                      |                      |     problems with    |
|                      |                      |     the LSAM Message |
|                      |                      |     Management       |
|                      |                      |     server job.      |
|                      |                      | -   To view the      |
|                      |                      |     results of debug |
|                      |                      |     logging, either  |
|                      |                      |     use the IBM i    |
|                      |                      |     command DSPPFM   |
|                      |                      |     to view the      |
|                      |                      |     content of file  |
|                      |                      |     LSALOGF30, or    |
|                      |                      |     select LSAM log  |
|                      |                      |     viewer \# 4      |
|                      |                      |     (from LSAM menu  |
|                      |                      |     6, option 5).    |
|                      |                      |     This is the same |
|                      |                      |     log file where   |
|                      |                      |     LSAM SBMJOB      |
|                      |                      |     commands are     |
|                      |                      |     logged. The log  |
|                      |                      |     entries are text |
|                      |                      |     entries, but the |
|                      |                      |     flags and codes  |
|                      |                      |     at the beginning |
|                      |                      |     of each entry    |
|                      |                      |     can only be      |
|                      |                      |     interpreted by   |
|                      |                      |     analysts who     |
|                      |                      |     have access to   |
|                      |                      |     the LSAM program |
|                      |                      |     source code.     |
+----------------------+----------------------+----------------------+
| First day of week    | \*SUN(IBM i day of   | This field is used   |
| (1)                  | week values)         | to specify which     |
|                      |                      | calendar day will be |
|                      |                      | considered the first |
|                      |                      | day of the week by   |
|                      |                      | the LSAM Message     |
|                      |                      | Management           |
|                      |                      | Parameters,          |
|                      |                      | Effective DOW (day   |
|                      |                      | of week) filter      |
|                      |                      | field. (Refer to the |
|                      |                      | table of field       |
|                      |                      | values, below, for   |
|                      |                      | Message Management   |
|                      |                      | Parameters.)         |
+----------------------+----------------------+----------------------+
| Msg Mgmt Parms init  | 1 (0, 1)             | Controls the         |
| list opt             |                      | appearance of the    |
|                      |                      | Message Management   |
|                      |                      | Parameters list      |
|                      |                      | display when it is   |
|                      |                      | first presented.     |
|                      |                      | This option is       |
|                      |                      | important at sites   |
|                      |                      | where the message    |
|                      |                      | text is more         |
|                      |                      | important than the   |
|                      |                      | message ID for       |
|                      |                      | recognizing messages |
|                      |                      | to process.          |
|                      |                      |                      |
|                      |                      | -   0 = Show the     |
|                      |                      |     Message Queue    |
|                      |                      |     Library          |
|                      |                      | -   1 = Show the     |
|                      |                      |     Compare Text     |
|                      |                      |     (instead of the  |
|                      |                      |     MSGQ LIB)        |
+----------------------+----------------------+----------------------+
| Event cmds in-line   | 0                    | 0 = in-line, protect |
| or submit?           |                      | event sequence:      |
|                      |                      |                      |
|                      |                      |                      |
|                      |                      |                      |
|                      |                      | Option 0 enables     |
|                      |                      | better cooperation   |
|                      |                      | among multiple       |
|                      |                      | Message Management   |
|                      |                      | Parameters that are  |
|                      |                      | qualified to respond |
|                      |                      | to a single message. |
|                      |                      |                      |
|                      |                      |                      |
|                      |                      |                      |
|                      |                      | The original Agent   |
|                      |                      | Message Management   |
|                      |                      | server logic was the |
|                      |                      | same as option 1 for |
|                      |                      | this field. But      |
|                      |                      | sometimes the delay  |
|                      |                      | caused by submitting |
|                      |                      | message responses to |
|                      |                      | a separate job would |
|                      |                      | prevent subsequent   |
|                      |                      | Message Management   |
|                      |                      | Parameters (with a   |
|                      |                      | higher sequence      |
|                      |                      | number) from being   |
|                      |                      | able to benefit from |
|                      |                      | the results of a     |
|                      |                      | Parameters record    |
|                      |                      | with a lower         |
|                      |                      | sequence number. So  |
|                      |                      | the new default is   |
|                      |                      | option 0: Process    |
|                      |                      | each Message         |
|                      |                      | Management Parameter |
|                      |                      | right from the       |
|                      |                      | Message Management   |
|                      |                      | server job so that   |
|                      |                      | the order of events  |
|                      |                      | is strictly          |
|                      |                      | preserved.           |
|                      |                      |                      |
|                      |                      |                      |
|                      |                      |                      |
|                      |                      | 1 = submit, handle   |
|                      |                      | other messages       |
|                      |                      | faster:              |
|                      |                      |                      |
|                      |                      |                      |
|                      |                      |                      |
|                      |                      | Option 1 was the     |
|                      |                      | original mode of     |
|                      |                      | processing for the   |
|                      |                      | Message Management   |
|                      |                      | Server. This option  |
|                      |                      | improves the         |
|                      |                      | response time of the |
|                      |                      | Server for handling  |
|                      |                      | multiple messages.   |
|                      |                      |                      |
|                      |                      |                      |
|                      |                      |                      |
|                      |                      | However, when each   |
|                      |                      | message response is  |
|                      |                      | submitted to its     |
|                      |                      | own, separate job,   |
|                      |                      | it is likely that    |
|                      |                      | this would prevent   |
|                      |                      | the actions of       |
|                      |                      | Parameter Sequence   |
|                      |                      | 10 from being made   |
|                      |                      | available to         |
|                      |                      | Parameter Sequence   |
|                      |                      | 20 that wants to     |
|                      |                      | process the same     |
|                      |                      | message - and needs  |
|                      |                      | to know the result   |
|                      |                      | of the Sequence 10   |
|                      |                      | response action.     |
|                      |                      |                      |
|                      |                      |                      |
|                      |                      |                      |
|                      |                      | The choice between   |
|                      |                      | these two options    |
|                      |                      | might depend on      |
|                      |                      | whether a site uses  |
|                      |                      | complex message      |
|                      |                      | responses, or        |
|                      |                      | virtually always     |
|                      |                      | uses only one        |
|                      |                      | Message Management   |
|                      |                      | Parameter per        |
|                      |                      | message.             |
+----------------------+----------------------+----------------------+
| \$MSG handle single  | E(blank, B, E)       | An optional edit     |
| quotes               |                      | that should be       |
|                      |                      | performed whenever   |
|                      |                      | the \$MSG special    |
|                      |                      | variable is used in  |
|                      |                      | the Message          |
|                      |                      | Management Command   |
|                      |                      | line:                |
|                      |                      |                      |
|                      |                      | -   blank = no       |
|                      |                      |     changes          |
|                      |                      | -   B = replace a    |
|                      |                      |     single quote     |
|                      |                      |     with a space     |
|                      |                      |     character        |
|                      |                      | -   E = escape the   |
|                      |                      |     single quote by  |
|                      |                      |     doubling it      |
|                      |                      |     (\'\')           |
+----------------------+----------------------+----------------------+
| \$MSG handle comma   | B(blank, B)          | An optional edit     |
|                      |                      | that should be       |
|                      |                      | performed whenever   |
|                      |                      | the \$MSG special    |
|                      |                      | variable is used in  |
|                      |                      | the Message          |
|                      |                      | Management Command   |
|                      |                      | line:                |
|                      |                      |                      |
|                      |                      | -   blank = no       |
|                      |                      |     changes          |
|                      |                      | -   B = replace a    |
|                      |                      |     comma with a     |
|                      |                      |     space character  |
+----------------------+----------------------+----------------------+

:  

###### Functions

-   **F3=Exit**: Quits the maintenance display and returns to the menu
    without completing any changes.
-   **F12=Cancel**: Quits the maintenance display and returns to the
    menu without completing any changes.

### Message Management Parameters

Message Management Parameters - View 1 of 2

  ------------------------------------------------------------------------------------------------------------------------------------------------
  [TRPMSGR03-S1]{style="color: #008000;"}                Message Management Parameters                    [00/00/00]{style="color: #008000;"}   [USERNAME]{style="color: #008000;"}                                                                     [17:04:07]{style="color: #008000;"}
  ( [Status:]{style="color: #008000;"} [Inactive/Active]{style="color: #ff00ff;"} )   [Type options, press Enter.]{style="color: #0000ff;"}                          [Search content: \_\_\_\_\_\_\_\_\_\_]{style="color: #008000;"}
  [  2=Change  3=Copy  4=Delete  5=Display]{style="color: #0000ff;"}   [  7=Capt chart  8=Export  9=Chg Sts]{style="color: #0000ff;"}
   Opt  Msg Queue   MsgQ Lib    Msg ID   Job Name    Job User    SQ\#   Sts
    \_   QSYSOPR     QSYS        CPA0701  \*ALL        \*ALL         10    A
    \_   QSYSOPR     QSYS        CPA0701  \*ALL        \*ALL         20    A
  [  \_   QSYSOPR     QSYS        CPF0927  \*ALL        USER\*        10]{style="color: #008000;"}    [I]{style="color: #ff0000;"}   [  \_   QSYSOPR     QSYS        CPF1010  \*ALL        \*ALL         10]{style="color: #008000;"}    [I]{style="color: #ff0000;"}
    \_   USERQNAME   QUSRSYS     \*\*\*\*\*\*\*  \*\*\*\*\*\*\*\*\*\*  \*\*\*\*\*\*\*\*\*\*
   
  *\-- or: F11=Alt view \--*
   
   Opt  Msg Queue   MsgQ Lib    Msg ID   Job Name    Job User    MmRecKey\#  Sts
    \_   QSYSOPR     QSYS        CPA0701  \*ALL        \*ALL              1     A
   
   
  Bottom
   F6=Add   F10=CompText   F11=Alt view   F16=Search next   F17=Subset   F24=More keys
  *\-- or \--*
   F3=Exit   F7=Add Queue   F5=Refresh   F15=Act/Inact   F24=More keys
  ------------------------------------------------------------------------------------------------------------------------------------------------

 

Message Management Parameters - View 2 of 2

  ------------------------------------------------------------------------------------------------------------------------------------------------------
  [TRPMSGR1A]{style="color: #008000;"}           Message Management Parameters - Compare Text           [00/00/00 ]{style="color: #008000;"}   [USERNAME]{style="color: #008000;"}                                                                   [17:04:07 ]{style="color: #008000;"}
  ( [Status:]{style="color: #008000;"} [Inactive/Active]{style="color: #ff00ff;"} )   [Type options, press Enter.]{style="color: #0000ff;"}                               [Search content: \_\_\_\_\_\_\_\_\_\_ ]{style="color: #008000;"}
  [  2=Change  3=Copy  4=Delete  5=Display]{style="color: #0000ff;"}   [  7=Capt chart  8=Export  9=Chg Sts]{style="color: #0000ff;"}
   Opt  Msg Queue  Msg ID   Job Name    Job User    SEQ Compare Text            S
    \_   QSYSOPR    LNR0706  \*ALL        \*ALL         10 Processing date is      A
    \_   QSYSOPR    LNR0706  \*ALL        \*ALL         20 Is data valid?          A
  [  \_   QSYSOPR    CPF0927  \*ALL        USER\*        10    ]{style="color: #008000;"}                     [I]{style="color: #ff0000;"}   [  \_   QSYSOPR    CPF9897  \*ALL        \*ALL         10 My user message text]{style="color: #008000;"}    [I]{style="color: #ff0000;"}
    \_   USERQNAME  \*\*\*\*\*\*\*  \*\*\*\*\*\*\*\*\*\*  \*\*\*\*\*\*\*\*\*\*
   
   
   
  Bottom
   F6=Add   F10=MSGQ+LIB view   F16=Search next   F17=Subset   F24=More keys
  *\-- or \--*
   F3=Exit   F7=Add Queue   F5=Refresh   F15=Act/Inact   F24=More keys
  ------------------------------------------------------------------------------------------------------------------------------------------------------

The example lists above show both views of the list of Message
Management Parameters. F10 is used to alternate between Views 1 and 2,
and a Performance Parameter (sub-menu option 7) sets which view is the
initial default view when the list is first presented. View 2 showing
the Compare Text is more useful in environments where the Message ID may
not be helpful, and message management depends more heavily on the
Compare Text to distinguish among various Parameter records that might
otherwise appear to have the same filter rules.

 

The sub-title will change to indicate when the F17=Subset function is in
effect. As the sub-title indicates, the list may be filtered to show
only one entry for each message queue that the LSAM will monitor.
Pressing F17 a second time will remove the filter and show all the
Parameter records in the file.

 

The illustration above also shows a type-Q standard entry that has
asterisks (\*) in place of a Message ID and other fields. Records with
these values are LSAM system control records. They do not identify any
specific message that should be monitored. Rather, they provide a means
of signaling the LSAM about message queues that need to be checked in
case any messages may arrive that should be handled by the job-level
message responses supplied with OpCon-initiated jobs.

 

LSAM Message Management will always check the message queues specified
in the LSAM Message Management Parameters master file. However, if a
message queue is not named in this master file, the LSAM will not look
for messages there. Therefore, whenever a job-level message management
parameter has been added to a job master record defined in the OpCon
Enterprise Manager, the LSAM administrator must make sure that any or
every message queue where this message might be sent has been added to
the list of message queues that will be monitored by the LSAM Message
Management server. To check the list of all message queues being
monitored, press F17=Subset on the LSAM display. It is easy to add a
message queue to that list, as explained below under the Add Queue
window documentation.

###### Menu Pathways

Main Menu \> Message management menu (\#2) \> Message management
parameters (\#1)

###### Fields

  Field                           Description
  ------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Status                          The \"Status\" sub-title appears when F15 is used to subset the display to only Inactive, or only Active records. There is no sub-title when all records are on display.
  Search content                  To quickly search for a particular message management definition, enter the known characters of any portion of the entry detail and press \<**Enter**\>. Any value that appears on the detail display may be searched for, even though not all values appear in the list display.
  Opt                             \<**Tab**\> to a row in the table and enter an option.
  Msg Queue                       The message queue to be examined for messages.
  MsgQ Lib (F10 Alt view 1)       The library in the DB2/400 database where the message queue is located.
  Msg ID                          The identifier of the message to be trapped.\*\*\*\*\*\*\*\*\*\* = no message is specified in this entry; this entry only names a message queue to monitor.
  Job Name                        The IBM i job name that issued the message. A value of \*ALL allows the message manager to respond to a particular message ID regardless of the job name. Partial job names (JOB\*) are also supported. Specifying a particular job\'s name prevents the message manager from responding when other named jobs may issue the same message ID.
  Job User                        The IBM i user name from the job that issued the message. A value of \*ALL allows the message manager to respond to a particular message ID regardless of the user name. Partial user names (USER\*) are also supported. Specifying a particular user\'s name prevents the message manager from responding when other users of the same job name may issue the same message ID.
  Compare Text (F10 Alt view 2)   When F10 is pressed, or the Message Management Performance Parameters indicate View 2 should be the initial view, the headings change and the list shows the Compare Text field instead of the Message Queue Library. This view may be more useful when many message IDs are the same, or there are no message IDs and the Compare Text is critical to recognize different rules.
  SQ\# (F11 Alt view 1)           A sequence number is assigned to every Parameters record, but it is only important when two records share the same values for all the other profile fields appearing on this list display, in which case the sequence number supports unique association with log records and also controls the order in which Parameters records are processed.
  MmRecKey\# (F11 Alt view 2)     Press F11=Alt view to replace the SQ\# field with this Message Management Record Key Number. The MmRecKey\# field is important for matching Message Management Log entries with the Parameters record that caused the log activity. It can also be used with the command SETMSGTHR (set message threshold) as an easy way to identify the correct Parameters record.
  Sts                             When new records are first added to the file, they are assigned an inactive status. After any related Capture Data Rules are completed, and any Captured Data Response Rules are also ready, then the Parameters master record status should be changed to A=active to allow the LSAM Message Management server job to use the new record. To change the status, either enter option 9=Chg sts from this list display, or while using option 2=Change, manually type an A or an I in the status field of the master record.

  :  

###### Options

-   **2=Change**: To change a Msg ID, type 2 next to the Msg ID line and
    press \<**Enter**\> to proceed to the Update Message Management
    Parameters screen.
-   **3=Copy**: To copy a Msg ID to a similar record (perhaps using a
    different sequence number and other response rules), type a 3 next
    to the Msg ID line and press \<**Enter**\> to proceed to the Copy
    Message Management Parameters screen.
-   **4=Delete**: To delete a Msg ID, type 4 next to the Msg ID line(s)
    and press \<**Enter**\> to proceed to the Confirm Delete of Records
    screen for message trapping.
-   **5=Display**: To view a Msg ID, type 5 next to the Msg ID line and
    press \<**Enter**\> to proceed to the Display Message Management
    Parameters screen.
-   **7=Capt chart**: To view a flow chart of associated Message Data
    Capture Rules and Captured Data Response Rules, type a 7 next to the
    MSD ID line and press \<**Enter**\> to proceed to the Capture
    Message Data Chart list display. A detailed explanation of the
    displays for the Capture Chart may be found in Operator Replay
    Scripts, within the Screens and Windows section, under the title
    \"Operator Replay Capture Chart (opt 7).\"
-   **8=Export**: Select one or more Message Management Parameters that
    will be copied to a save file collection for exporting to a
    different LSAM environment. The Export option includes all related
    records such as Capture Rules and Response Rules, as well as any
    Dynamic Variable definitions. Detailed instructions for Export and
    Import of data are found in Copy Files from Test to Production.
-   **9=Chg Sts**: Type option 9 next to any master record line and
    press \<**Enter**\> to change the record status from A to I, or from
    I to A, where A = active and I = inactive.

###### Functions

-   **F3=Exit**: Quits the list of trapped messages and returns to the
    menu.
-   **F5=Refresh**: Reads the message management file again and reloads
    the list display.
-   **F6=Add**: Proceeds to the Add Message Trapping Parameters window.
-   **F7=Add Queue**: Proceeds to the Add Message Trapping Parameters
    window, but in the special mode that supports easy entry of a
    message queue name that has no message IDs.
-   **F10=CompText, F10=MSGQ+LIB view**: Changes the list to show either
    the Parameter record Compare Text or the Message Queue Library
    field. The Message Management Performance Parameters control file
    maintenance function (sub-menu option 7) changes which view is the
    initial list view when the program is first entered. (Function key
    F10 does not change the initial default for the list view.)
-   **F11=Alt view**: Changes the list display between showing SQ\# +
    Sts, and the alternate view showing MmRecKey\# + Sts. (This function
    key is not available from the F10 view 2 list format.)
-   **F12=Cancel**: Quits the list of trapped messages and returns to
    the menu.
-   **F15=Act/Inact**: This function key presents a window that enables
    toggling the list among three modes: only Inactive records, only
    Active records or all records. A list of Inactive records is an
    important way to make sure that every completed Parameters record
    has been set active before depending on it. It is a common error to
    forget to activate new Parameters records, since they are Inactive
    by default when the are first added. (Parameters are kept inactive
    until any associated Capture Applications, with optional Response
    Rules, have been completed. This allows a complex message rule set
    to be fully defined before it is made active.)
-   **F16=Search next**: When a value is entered in the Search content
    field, or a value shows in pink below this field from the last
    search request, pressing \<**F16**\> finds the next (or first)
    occurrence of the value specified. F16 is useful for finding each
    desired list entry when there is more than one list entry that
    satisfies the search request. When a value is first typed into the
    Search content field, \<**F16**\> works the same as the
    \<**Enter**\> key for starting a new search. However, only
    \<**F16**\> may be used to continue a search past the first entry
    that satisfies the search criteria.
-   **F17=Subset**: Toggles the list display between a list of all
    message management parameters and a filtered list showing only one
    line for each unique message queue (and message queue library) that
    will be monitored by the LSAM message management server.
-   **F24=More keys**: Shows other function keys that may be used.

#### Maintain Message Management Parameters

The Add, Change, Copy and Display screens are similar. The following
examples give a description of their contents.

###### Menu Pathways

-   Main Menu \> Message management menu (\#2) \> Message management
    parameters (\#1) \> F6=Add
-   Main Menu \> Message management menu (\#2) \> Message management
    parameters (\#1) \> 2=Change
-   Main Menu \> Message management menu (\#2) \> Message management
    parameters (\#1) \> 3=Copy
-   Main Menu \> Message management menu (\#2) \> Message management
    parameters (\#1) \> 5=Display

##### F6 = Add

-   **Screen Title**: Message Management Parameters
-   **Screen ID**:
    -   TRPMSGR2A (Format A)
    -   TRPMSGR2B (Format B)
    -   TRPMSGR2C (Format C)

Formats B and C appear on the following page. Use the \<**Enter**\> key
to advance to the next page, or use function key \<**F12**\> to go back
to the previous page. Pressing \<**Enter**\> on the last page completes
updates for Add, Change and Copy, or continues to the next option
processing for Display. Pressing \<**F12**\> at the first page returns
to the list display (retaining the last option that was being
processed).

##### Option 2 = Change, 3=Copy

The same screens as for F6=Add, TRPMSGR2A - C, appear for options
2=Change and 3=Copy, except the Rec key \# does not show for F6=Add or
for option 3=Copy because no record has yet been written to the database
file.

##### Option 5 = Display

The screens for option 5 = Display are labeled TRPMSGR5A - C, but they
appear the same as the screens for F6=Add. The exception is that there
are no prompting function keys such as F4=Prompt appearing in the R5
formats.

###### Fields

+----------------------------------+----------------------------------+
| Field                            | Description                      |
+==================================+==================================+
| Message Queue                    | The message queue to be examined |
|                                  | for messages.                    |
+----------------------------------+----------------------------------+
| Message Queue Library            | The library in the DB2 UDB       |
|                                  | (DB2/400) database where the     |
|                                  | message queue is located.        |
+----------------------------------+----------------------------------+
| Status                           | A = active, I = inactive.        |
|                                  | Records marked with a status of  |
|                                  | I = inactive will not be         |
|                                  | processed by Message Management. |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | The LSAM utility command         |
|                                  | SMAMMPSTS can be used to change  |
|                                  | the Status of a Parameters       |
|                                  | record to either Active or       |
|                                  | Inactive, as part of an          |
|                                  | automation strategy. Refer to    |
|                                  | the discussion of this parameter |
|                                  | in the Commands and Utilities    |
|                                  | section of this Agent            |
|                                  | documentation.                   |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | **Note:**                        |
|                                  |                                  |
|                                  | -   New records are initially    |
|                                  |     set to a status of I =       |
|                                  |     inactive to allow time for   |
|                                  |     configuration of message     |
|                                  |     data capture and captured    |
|                                  |     data response rules, if any  |
|                                  |     are desired. It may also be  |
|                                  |     necessary to create multiple |
|                                  |     different responses to a     |
|                                  |     single message. After all    |
|                                  |     file maintenance is          |
|                                  |     complete, set the status of  |
|                                  |     all new Parameters records   |
|                                  |     to A = active, using option  |
|                                  |     2=Change.                    |
|                                  | -   Refer to [Commands and       | |                                  |     Utilities](Command           |
|                                  | s-and-Utilities.md){.MCXref |
|                                  |     .xref} for a description of  |
|                                  |     the Agent utility command    |
|                                  |     SMAMMPSTS. This command may  |
|                                  |     be used to automate changing |
|                                  |     a Parameter record status    |
|                                  |     between Active and Inactive. |
+----------------------------------+----------------------------------+
| Message ID                       | The identifier of the message to |
|                                  | be trapped.                      |
+----------------------------------+----------------------------------+
| Message File                     | The message file that holds the  |
|                                  | definition of the Message ID.    |
+----------------------------------+----------------------------------+
| Rec key \#                       | The record key number is a       |
|                                  | unique number assigned to each   |
|                                  | Message Management Parameters    |
|                                  | record. This is not the same as  |
|                                  | the Sequence Number (which is    |
|                                  | used to keep otherwise matched   |
|                                  | key fields unique). The record   |
|                                  | key number is useful for         |
|                                  | associating Message Management   |
|                                  | Log entries with the Parameters  |
|                                  | record that generated the log    |
|                                  | activity. It may also be used    |
|                                  | with the SETMSGTHR (set message  |
|                                  | threshold) command as an easy    |
|                                  | way to identify the exact        |
|                                  | Parameters record that should    |
|                                  | have its threshold counter set   |
|                                  | to a new value (or reset to      |
|                                  | zero).                           |
+----------------------------------+----------------------------------+
| Job Name                         | The name of the IBM i job that   |
|                                  | must have issued the message     |
|                                  | before the LSAM will respond to  |
|                                  | the message. A partial job name  |
|                                  | may be used, such as JOB\*,      |
|                                  | where any job name that begins   |
|                                  | with the letters before the      |
|                                  | asterisk (\*) will be accepted.  |
|                                  | The other special value of \*ALL |
|                                  | means that the job name will not |
|                                  | be checked to qualify a message  |
|                                  | for processing.                  |
+----------------------------------+----------------------------------+
| Job User                         | The name of the IBM i user       |
|                                  | profile from the job that issued |
|                                  | the message, which must match    |
|                                  | before the LSAM will respond to  |
|                                  | the message. A partial user name |
|                                  | may be used, such as USER\*,     |
|                                  | where any user name that begins  |
|                                  | with the letters before the      |
|                                  | asterisk (\*) will be accepted.  |
|                                  | The other special value of \*ALL |
|                                  | means that the user name will    |
|                                  | not be checked to qualify a      |
|                                  | message for processing.          |
+----------------------------------+----------------------------------+
| Sequence                         | This field is the lowest order   |
|                                  | (7th) record key value that      |
|                                  | combines with the other key      |
|                                  | fields to assure that each       |
|                                  | Parameters record can be         |
|                                  | uniquely identified. The         |
|                                  | sequence number also controls    |
|                                  | the order of execution when more |
|                                  | than one Parameters record uses  |
|                                  | the same other 6 key fields. The |
|                                  | other key field values are:      |
|                                  | Message Queue, MSGQ Library,     |
|                                  | Message ID, Message File, Job    |
|                                  | Name and User Name.              |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | **Note:** This field must not be |
|                                  | confused with the Rec Key \#,    |
|                                  | which is a number that is unique |
|                                  | within the entire Parameters     |
|                                  | master file. The Rec Key \# is   |
|                                  | an easy way to uniquely identify |
|                                  | a Parameters record, such as in  |
|                                  | the SETMSGTHR (set message       |
|                                  | threshold) command, instead of   |
|                                  | having to type all seven of the  |
|                                  | character key fields.            |
+----------------------------------+----------------------------------+
| Compare Text (variable in        | -   Use this field to specify a  |
| message)                         |     text string that will be     |
|                                  |     compared to the trapped      |
|                                  |     message primary text (or     |
|                                  |     secondary text, or both      |
|                                  |     texts in a combined buffer)  |
|                                  |     in order to qualify the      |
|                                  |     message for handling by the  |
|                                  |     LSAM Message Management      |
|                                  |     server. Using Dynamic        |
|                                  |     Variables, up to 999         |
|                                  |     characters can be specified  |
|                                  |     as the Compare Text, or up   |
|                                  |     to 30 characters can be      |
|                                  |     typed directly into this     |
|                                  |     field. Typed text can also   |
|                                  |     be combined with Dynamic     |
|                                  |     Variables.                   |
|                                  | -   Normally this field is set   |
|                                  |     to blanks, meaning that no   |
|                                  |     checking of message content  |
|                                  |     is performed. Dynamic        |
|                                  |     Variable tokens can be used  |
|                                  |     in this field, so that the   |
|                                  |     tokens will be replaced at   |
|                                  |     run time with a value to     |
|                                  |     search for in the message    |
|                                  |     text.                        |
|                                  | -   To use trailing blanks as    |
|                                  |     part of the Compare Text,    |
|                                  |     specify a non-zero value in  |
|                                  |     the Length field. (To use    |
|                                  |     all blanks as the Compare    |
|                                  |     Text, specify a Dynamic      |
|                                  |     Variable that will produce a |
|                                  |     blank result, and then the   |
|                                  |     length field, described      |
|                                  |     below, can be used to        |
|                                  |     designate how many blanks    |
|                                  |     form the Compare Text        |
|                                  |     field.)                      |
|                                  |                                  |
|                                  | **Note:** In earlier LSAM        |
|                                  | versions, a special value of     |
|                                  | \*NOVAR was used to mean that no |
|                                  | checking of message content is   |
|                                  | performed. This old value is     |
|                                  | still supported, but the new     |
|                                  | standard is to leave the field   |
|                                  | blank.                           |
+----------------------------------+----------------------------------+
| Message text to scan             | -   P = primary, S = secondary   |
|                                  |     (Help), B = both.            |
|                                  | -   This flag indicates which of |
|                                  |     the message text fields      |
|                                  |     should be searched for the   |
|                                  |     Compare Text. If B = both is |
|                                  |     indicated, the LSAM message  |
|                                  |     management program creates a |
|                                  |     message text buffer by       |
|                                  |     removing trailing blanks     |
|                                  |     from the primary text,       |
|                                  |     adding one space character,  |
|                                  |     then appending the secondary |
|                                  |     text. This formatting of     |
|                                  |     both text fields into one    |
|                                  |     buffer could be important    |
|                                  |     depending on the content and |
|                                  |     Length of the Compare Text   |
|                                  |     character string.            |
|                                  | -   To perform research on the   |
|                                  |     actual content and format of |
|                                  |     the message text buffer,     |
|                                  |     view the Message Management  |
|                                  |     log entries. For messages    |
|                                  |     that are not being           |
|                                  |     processed, the message text  |
|                                  |     buffer can be logged and     |
|                                  |     examined by temporarily      |
|                                  |     turning on the Message       |
|                                  |     Management debug trace log   |
|                                  |     option, using function 7     |
|                                  |     from the Message Management  |
|                                  |     menu.                        |
+----------------------------------+----------------------------------+
| Comparison type                  | -   The Comparison Type field    |
|                                  |     indicates the type of        |
|                                  |     Boolean comparison to be     |
|                                  |     performed between the        |
|                                  |     Compare Text and the message |
|                                  |     text buffer, where the       |
|                                  |     Compare Text is the first    |
|                                  |     factor and the Message Text  |
|                                  |     is the second factor.        |
|                                  | -   EQ = equal, NE = not equal,  |
|                                  |     GT = greater than, GE =      |
|                                  |     greater than or equal to, LT |
|                                  |     = less than, LE = less than  |
|                                  |     or equal to. (The boolean    |
|                                  |     comparison symbols may also  |
|                                  |     be used in this field: =,    |
|                                  |     \<\>, \>, \>=, \<, \<= .)    |
|                                  |     Blanks are assumed to mean   |
|                                  |     EQ.                          |
|                                  | -   The Start position is        |
|                                  |     required when using a        |
|                                  |     Boolean comparison rule      |
|                                  |     other than EQ or = (equal).  |
|                                  |     However, if the Comparison   |
|                                  |     Type is EQ or =, then the    |
|                                  |     Start position may be left   |
|                                  |     at zeros and this tells the  |
|                                  |     LSAM message management      |
|                                  |     program to search for the    |
|                                  |     Compare Text anywhere in the |
|                                  |     message text buffer.         |
+----------------------------------+----------------------------------+
| Start Position in buffer         | -   Compare Text may be further  |
|                                  |     qualified according to its   |
|                                  |     ordinal position within the  |
|                                  |     message text buffer.         |
|                                  |     (Ordinal means that the      |
|                                  |     first character in the       |
|                                  |     message text is position 1.) |
|                                  | -   When a non-zero start        |
|                                  |     position is specified, the   |
|                                  |     Length field (or the assumed |
|                                  |     length) is combined with     |
|                                  |     this start position to       |
|                                  |     isolate a character string   |
|                                  |     from the message text        |
|                                  |     buffer. After the message    |
|                                  |     text string is isolated, the |
|                                  |     Boolean rule of the          |
|                                  |     Comparison Type field is     |
|                                  |     used to compare or contrast  |
|                                  |     it with the Compare Text.    |
|                                  | -   Leaving this field zeros     |
|                                  |     tells the LSAM Message       |
|                                  |     Management server that the   |
|                                  |     Compare text may occur       |
|                                  |     anywhere within the primary  |
|                                  |     message text. The Boolean    |
|                                  |     Comp type field must be set  |
|                                  |     to EQ or = when the Start    |
|                                  |     Position field is left at    |
|                                  |     zeros.                       |
|                                  | -   If the Compare Text rules,   |
|                                  |     including Start Position, do |
|                                  |     not produce a positive       |
|                                  |     result, then the Parameters  |
|                                  |     record will be skipped for   |
|                                  |     processing.                  |
+----------------------------------+----------------------------------+
| Length of Compare Text           | -   This field specifies the     |
|                                  |     length of the character      |
|                                  |     strings that are used to     |
|                                  |     evaluate the Compare Text    |
|                                  |     versus the message text      |
|                                  |     buffer.                      |
|                                  | -   When this field is left at   |
|                                  |     zeros, the length is assumed |
|                                  |     to be through the last       |
|                                  |     non-blank character of the   |
|                                  |     Compare Text field.          |
|                                  | -   This same rule applies to    |
|                                  |     the value that replaces one  |
|                                  |     or more Dynamic Variable     |
|                                  |     token(s). This Length value  |
|                                  |     (or the assumed length) will |
|                                  |     determine the size of the    |
|                                  |     character string extracted   |
|                                  |     from the message text        |
|                                  |     buffer, starting from the    |
|                                  |     Start Position.              |
+----------------------------------+----------------------------------+
| Answer Type (R, E, B, N)         | -   R = Reply to message         |
|                                  | -   E = Event: IBM i command, or |
|                                  |     OpCon Event sent to SAM      |
|                                  | -   B = Both R and E             |
|                                  | -   N = None: This record used   |
|                                  |     only for Capture Data and    |
|                                  |     Response Rules, if other     |
|                                  |     Parameter record qualifiers  |
|                                  |     are met.                     |
+----------------------------------+----------------------------------+
| Message Reply                    | -   When messages require a      |
|                                  |     reply, the valid values for  |
|                                  |     the reply are often          |
|                                  |     specified within the text of |
|                                  |     the message. IBM program     |
|                                  |     errors typically require one |
|                                  |     of the following example     |
|                                  |     values:                      |
|                                  |     1.  I = ignore and continue  |
|                                  |     2.  C = cancel the job       |
|                                  |     3.  D = produce a formatted  |
|                                  |         program dump and cancel  |
|                                  |         the job                  |
|                                  |     4.  R = Retry: DO NOT USE    |
|                                  |         THIS OPTION! It does not |
|                                  |         work with modern IBM i   |
|                                  |         programs, except for     |
|                                  |         Control Language         |
|                                  |         programs - but only if   |
|                                  |         the source code is       |
|                                  |         available and the effect |
|                                  |         of the retry response is |
|                                  |         well understood. Any     |
|                                  |         other use will likely    |
|                                  |         corrupt application      |
|                                  |         data.                    |
|                                  | -   User-defined programs may    |
|                                  |     issue messages requiring a   |
|                                  |     custom response, such as the |
|                                  |     name of a tape drive that    |
|                                  |     should be used for a backup  |
|                                  |     operation.                   |
|                                  | -   One way to plan for          |
|                                  |     automatic responses to       |
|                                  |     messages is to set the value |
|                                  |     of a Dynamic Variable. The   |
|                                  |     value may be changed as part |
|                                  |     of automated processing      |
|                                  |     prior to the event that      |
|                                  |     generates the message.       |
|                                  |     Insert a Dynamic Variable    |
|                                  |     token into this field in     |
|                                  |     order to have the token      |
|                                  |     replaced with its value at   |
|                                  |     run time. Function key       |
|                                  |     \<**F6=DynVar**\> may be     |
|                                  |     used to select from a list   |
|                                  |     of Dynamic Variables, and/or |
|                                  |     to see the correct format    |
|                                  |     for a Dynamic Variable       |
|                                  |     token.                       |
|                                  | -   Special values may be        |
|                                  |     entered into this field to   |
|                                  |     support user-defined         |
|                                  |     response management. When    |
|                                  |     either of these values are   |
|                                  |     specified, the object name   |
|                                  |     and object library field     |
|                                  |     values are required (refer   |
|                                  |     to the next fields in this   |
|                                  |     table).                      |
|                                  |     -   \*MSGQ = re-route the    |
|                                  |         message to a different   |
|                                  |         message queue and        |
|                                  |         retrieve the             |
|                                  |         user-supplied response   |
|                                  |         from that copy of the    |
|                                  |         message in order to      |
|                                  |         answer the currently     |
|                                  |         pending inquiry message. |
|                                  |     -   \*PGM = call a           |
|                                  |         user-defined program to  |
|                                  |         provide a message        |
|                                  |         response string that     |
|                                  |         will be used to answer   |
|                                  |         the currently pending    |
|                                  |         inquiry message.         |
+----------------------------------+----------------------------------+
| Obj+Lib if \*MSGQ or \*PGM       | -   When the Message Reply field |
|                                  |     is set to one of these       |
|                                  |     special values, type into    |
|                                  |     the first field the name of  |
|                                  |     an alternate message queue,  |
|                                  |     or the name of a             |
|                                  |     user-defined program that    |
|                                  |     may be used to retrieve or   |
|                                  |     calculate the message reply  |
|                                  |     string.                      |
|                                  | -   Type into the second field   |
|                                  |     the library location of      |
|                                  |     either type of object.       |
|                                  | -   Refer to the discussion of   |
|                                  |     How Message Management Works |
|                                  |     for more information about   |
|                                  |     these two fields.            |
+----------------------------------+----------------------------------+
| Event Command (F13=More)         | -   This field contains the      |
|                                  |     first several characters of  |
|                                  |     the optional command to be   |
|                                  |     executed when the message is |
|                                  |     detected. The command can be |
|                                  |     an OpCon event command name  |
|                                  |     and its parameters, or it    |
|                                  |     can be any IBM i command and |
|                                  |     parameters. Use the function |
|                                  |     keys \<**F4**\>, \<**F6**\>, |
|                                  |     \<**F8**\>, and \<**F10**\>  |
|                                  |     as desired for assistance in |
|                                  |     formatting the commands and  |
|                                  |     Dynamic Variable or \$VAR    |
|                                  |     tokens that may be entered   |
|                                  |     in this field.               |
|                                  | -   To enter more command        |
|                                  |     characters, press function   |
|                                  |     key F13 or PageDown.         |
|                                  |     Function keys **F4** or      |
|                                  |     **F8** can also be used to   |
|                                  |     prompt a command. After the  |
|                                  |     command string is returned   |
|                                  |     to this display, if the      |
|                                  |     command string is longer     |
|                                  |     than 210 characters, this    |
|                                  |     field will be protected and  |
|                                  |     displayed in cyan blue. In   |
|                                  |     that case, it will become    |
|                                  |     possible to press the        |
|                                  |     **PageDown** function key to |
|                                  |     branch to a full screen      |
|                                  |     display where long commands  |
|                                  |     may be modified and          |
|                                  |     extended.                    |
|                                  |                                  |
|                                  | **Note:** Also refer to the      |
|                                  | discussion below about           |
|                                  | predefined OpCon Event Command   |
|                                  | variables that are supported by  |
|                                  | the LSAM in this field.          |
+----------------------------------+----------------------------------+
| Effective start date             | This is an ISO-standard date     |
|                                  | field. The default value for     |
|                                  | this field which means \"not     |
|                                  | used\" is 0001-01-01, where the  |
|                                  | digits are CCYY-MM-DD (century,  |
|                                  | year, month, day). When the date |
|                                  | is set to an actual value, a     |
|                                  | message will not be processed    |
|                                  | unless the message issue date    |
|                                  | occurs on or after this date.    |
+----------------------------------+----------------------------------+
| Effective end date               | This is an ISO-standard date     |
|                                  | field. The default value for     |
|                                  | this field which means \"not     |
|                                  | used\" is 0001-01-01, where the  |
|                                  | digits are CCYY-MM-DD (century,  |
|                                  | year, month, day). When the date |
|                                  | is set to an actual value, a     |
|                                  | message will not be processed if |
|                                  | the message issue date occurs    |
|                                  | after this date.                 |
+----------------------------------+----------------------------------+
| Effective start time             | -   The format of this time      |
|                                  |     field is HH:MM:SS (hours,    |
|                                  |     minutes, seconds), and the   |
|                                  |     default value that means     |
|                                  |     \"not used\" includes the    |
|                                  |     colons, as \"00:00:00\". To  |
|                                  |     indicate midnight, use the   |
|                                  |     value of 24:00:00.           |
|                                  |                                  |
|                                  | **Note:** The function of this   |
|                                  | field varies depending on the    |
|                                  | setting of the Link option       |
|                                  | (listed below), as follows:      |
|                                  |                                  |
|                                  | -   When the time field is NOT   |
|                                  |     linked to the date field.    |
|                                  | -   When the time is set to a    |
|                                  |     valid value (00:00:01 -      |
|                                  |     24:00:00), a message will    |
|                                  |     not be processed unless its  |
|                                  |     issue time is equal to, or   |
|                                  |     greater than this time on a  |
|                                  |     given day. However, if the   |
|                                  |     start time is greater than   |
|                                  |     the end time (and the end    |
|                                  |     time is not zeros), this     |
|                                  |     indicates that the time      |
|                                  |     frame crosses the midnight   |
|                                  |     boundary into the next day,  |
|                                  |     so the comparison logic is   |
|                                  |     opposite, and the message    |
|                                  |     time must be less than or    |
|                                  |     equal to this start time.    |
|                                  | -   When the start time field IS |
|                                  |     linked to the start date     |
|                                  |     field.                       |
|                                  | -   The time becomes an          |
|                                  |     extension of the start date  |
|                                  |     field, creating a complete   |
|                                  |     time stamp that marks the    |
|                                  |     beginning of the effective   |
|                                  |     period. Messages must have   |
|                                  |     been issued at or after this |
|                                  |     start time in order to       |
|                                  |     qualify for processing by    |
|                                  |     this Parameter.              |
+----------------------------------+----------------------------------+
| Effective end time               | -   The format of this time      |
|                                  |     field is HH:MM:SS (hours,    |
|                                  |     minutes, seconds), and the   |
|                                  |     default value that means     |
|                                  |     \"not used\" includes the    |
|                                  |     colons, as \"00:00:00\". To  |
|                                  |     indicate midnight, use the   |
|                                  |     value of 24:00:00.           |
|                                  |                                  |
|                                  | **Note:** The function of this   |
|                                  | field varies depending on the    |
|                                  | setting of the Link option       |
|                                  | (listed below), as follows:      |
|                                  |                                  |
|                                  | -   When the time field is NOT   |
|                                  |     linked to the date field.    |
|                                  | -   When the time is set to a    |
|                                  |     valid value (00:00:01 -      |
|                                  |     24:00:00), a message will    |
|                                  |     not be processed unless its  |
|                                  |     issue time is less than, or  |
|                                  |     equal to this time on a      |
|                                  |     given day. However, if the   |
|                                  |     start time is greater than   |
|                                  |     the end time (and the end    |
|                                  |     time is not zeros), this     |
|                                  |     indicates that the time      |
|                                  |     frame crosses the midnight   |
|                                  |     boundary into the next day,  |
|                                  |     so the comparison logic is   |
|                                  |     opposite, and the message    |
|                                  |     time must be greater than or |
|                                  |     equal to this start time.    |
|                                  | -   When the end time field IS   |
|                                  |     linked to the end date       |
|                                  |     field.                       |
|                                  | -   The time becomes an          |
|                                  |     extension of the end date    |
|                                  |     field, creating a complete   |
|                                  |     time stamp that marks the    |
|                                  |     end of the effective period. |
|                                  |     Messages must have been      |
|                                  |     issued before or at this end |
|                                  |     time in order to qualify for |
|                                  |     processing by this           |
|                                  |     Parameter.                   |
+----------------------------------+----------------------------------+
| Link times to each date          | -   This option field specifies  |
|                                  |     how the Start and End Time   |
|                                  |     values should be used. The   |
|                                  |     times may be linked to their |
|                                  |     corresponding Date values,   |
|                                  |     or the time fields may be    |
|                                  |     processed independently of   |
|                                  |     the date fields, as          |
|                                  |     described in the two time    |
|                                  |     field entries, above.        |
|                                  | -   0 = use time values          |
|                                  |     separately from the date     |
|                                  |     values                       |
|                                  | -   1= link the time values to   |
|                                  |     the date values              |
+----------------------------------+----------------------------------+
| Effective DOW(day of week)       | -   The days of the week are     |
|                                  |     indicated by the digits 1 -  |
|                                  |     7. The calendar day          |
|                                  |     corresponding to day 1 is    |
|                                  |     set in the Message           |
|                                  |     Management Performance       |
|                                  |     Parameters function (LSAM    |
|                                  |     menu 2, option 7). For       |
|                                  |     example, typical US domestic |
|                                  |     calendars may indicate that  |
|                                  |     Sunday (\*SUN) is the first  |
|                                  |     day of the week,             |
|                                  |     corresponding to day 1.      |
|                                  | -   Any or all of the digits 1 - |
|                                  |     7 may be entered in this     |
|                                  |     field. For example, if the   |
|                                  |     field value is set to 147,   |
|                                  |     this means that the message  |
|                                  |     must have been issued on the |
|                                  |     first, fourth or seventh day |
|                                  |     of the week in order to be   |
|                                  |     processed by this Parameters |
|                                  |     record. If day 1 is \*SUN,   |
|                                  |     then day 4 is \*WED and day  |
|                                  |     7 is \*SAT. (The mnemonic    |
|                                  |     values used for days of the  |
|                                  |     week match the settings used |
|                                  |     by the IBM i operating       |
|                                  |     system.)                     |
+----------------------------------+----------------------------------+
| Start Effective DOM(day of       | -   This field indicates which   |
| month)                           |     day of the month begins the  |
|                                  |     window of time within the    |
|                                  |     month that a message may be  |
|                                  |     processed by this Parameters |
|                                  |     rule. If the End Effective   |
|                                  |     DOM is zeros, then a message |
|                                  |     will be processed until the  |
|                                  |     end of the month. The        |
|                                  |     special value of 32 is used  |
|                                  |     to indicate the last day of  |
|                                  |     any month, regardless of the |
|                                  |     number of days in that       |
|                                  |     month.                       |
|                                  | -   If the End DOM is less than  |
|                                  |     the Start DOM, this          |
|                                  |     indicates that the effective |
|                                  |     processing time crosses the  |
|                                  |     boundary between months, so  |
|                                  |     the comparison logic is      |
|                                  |     opposite and the message     |
|                                  |     issue date must be less than |
|                                  |     or equal to this day of the  |
|                                  |     month.                       |
+----------------------------------+----------------------------------+
| End Effective DOM(day of month)  | -   This field indicates which   |
|                                  |     day of the month ends the    |
|                                  |     window of time within the    |
|                                  |     month that a message may be  |
|                                  |     processed by this Parameters |
|                                  |     rule. If the Start Effective |
|                                  |     DOM is zeros, then a message |
|                                  |     will be processed from the   |
|                                  |     first day of the month until |
|                                  |     (through) this day. The      |
|                                  |     special value of 32 is used  |
|                                  |     to indicate the last day of  |
|                                  |     any month, regardless of the |
|                                  |     number of days in that       |
|                                  |     month.                       |
|                                  | -   If the End DOM is less than  |
|                                  |     the Start DOM, this          |
|                                  |     indicates that the effective |
|                                  |     processing time crosses the  |
|                                  |     boundary between months, so  |
|                                  |     the comparison logic is      |
|                                  |     opposite and the message     |
|                                  |     issue date must be greater   |
|                                  |     than or equal to this day of |
|                                  |     the month.                   |
+----------------------------------+----------------------------------+
| Threshold DynVar, Count          | -   The first field holds the    |
|                                  |     name of an LSAM Dynamic      |
|                                  |     Variable where the activity  |
|                                  |     count for this Parameters    |
|                                  |     record is maintained. When   |
|                                  |     this display format is       |
|                                  |     presented for an existing    |
|                                  |     Parameters record, the       |
|                                  |     current count found in the   |
|                                  |     Dynamic Variable is shown in |
|                                  |     the cyan blue field to the   |
|                                  |     right of the Dynamic         |
|                                  |     Variable name.               |
|                                  | -   When this field is blank,    |
|                                  |     there will be no threshold   |
|                                  |     controls. But when a         |
|                                  |     threshold is specified, the  |
|                                  |     count of message activity    |
|                                  |     for a Parameters record is   |
|                                  |     always stored in a Dynamic   |
|                                  |     Variable that has been       |
|                                  |     defined as numeric, with 7   |
|                                  |     digits and no decimal        |
|                                  |     places.                      |
|                                  |                                  |
|                                  | **Note:** The message threshold  |
|                                  | count can be changed manually by |
|                                  | the utility commands SETMSGTHR   |
|                                  | (reset count) and ADDMSGTHR (add |
|                                  | to count).                       |
+----------------------------------+----------------------------------+
| Threshold limit                  | -   When greater than zeros,     |
|                                  |     this field is used as the    |
|                                  |     reference point for          |
|                                  |     comparison with a counter    |
|                                  |     (stored in an LSAM Dynamic   |
|                                  |     Variable). The Threshold     |
|                                  |     count must be equal to or    |
|                                  |     greater than this limit in   |
|                                  |     order to allow the           |
|                                  |     Parameters record to process |
|                                  |     the message.                 |
|                                  | -   Whenever the threshold limit |
|                                  |     is reached (or exceeded, if  |
|                                  |     the count was increased from |
|                                  |     outside of the Message       |
|                                  |     Management server job), the  |
|                                  |     threshold count will be      |
|                                  |     reset to zero following the  |
|                                  |     execution of the             |
|                                  |     Parameter\'s message         |
|                                  |     responses. This means that a |
|                                  |     repeat of the same message   |
|                                  |     will be skipped in the       |
|                                  |     future until the threshold   |
|                                  |     limit is reached a second    |
|                                  |     time.                        |
|                                  | -   If no limit is specified     |
|                                  |     (that is, the limit value is |
|                                  |     zero), any threshold count   |
|                                  |     will be ignored.             |
+----------------------------------+----------------------------------+
| Threshold duration               | -   The amount of time,          |
|                                  |     expressed as DDDHHMM (days,  |
|                                  |     hours and minutes), allowed  |
|                                  |     before a threshold counter   |
|                                  |     expires. The issue date of a |
|                                  |     message is compared to the   |
|                                  |     last activity date, and if a |
|                                  |     new message ID matching this |
|                                  |     Parameter record is          |
|                                  |     processed after the duration |
|                                  |     period has expired, then the |
|                                  |     new message will reset the   |
|                                  |     threshold count to 1         |
|                                  |     (representing the current    |
|                                  |     message in process).         |
|                                  | -   This field is optional. If   |
|                                  |     no values are entered for    |
|                                  |     the duration, then the       |
|                                  |     Threshold count will         |
|                                  |     continue indefinitely until  |
|                                  |     the limit is reached.        |
+----------------------------------+----------------------------------+
| Threshold date control           | M = use the Parameters record    |
|                                  | date of last message activity.   |
|                                  |                                  |
|                                  | V = use the LSAM Dynamic         |
|                                  | Variable date of last update     |
|                                  | activity.                        |
|                                  |                                  |
|                                  | This option controls which date  |
|                                  | is compared to the message issue |
|                                  | date to determine if the         |
|                                  | Duration period for the counter  |
|                                  | has expired. Using the Message   |
|                                  | Management Parameters date of    |
|                                  | the last time this message was   |
|                                  | processed allows for the Dynamic |
|                                  | Variable counter value to be     |
|                                  | changed from outside of Message  |
|                                  | Management without affecting the |
|                                  | date. However, if changes to the |
|                                  | Dynamic Variable counter should  |
|                                  | be considered as valid activity  |
|                                  | within the duration period, then |
|                                  | use the value V. Both current    |
|                                  | date values appear on the Change |
|                                  | and Display formats, regardless  |
|                                  | of the setting of this control   |
|                                  | value.                           |
+----------------------------------+----------------------------------+
| Capture Application ID           | The key value that links this    |
|                                  | Parameters record to one or a    |
|                                  | group of Message Data Capture    |
|                                  | Definitions. Function key F10    |
|                                  | can be used to show a list of    |
|                                  | existing Capture Rules, from     |
|                                  | which one may be selected with   |
|                                  | option 1 and returned to this    |
|                                  | field. During the branch to the  |
|                                  | Capture Rules function, a new    |
|                                  | Capture ID may be defined and    |
|                                  | then selected for use with this  |
|                                  | Parameters record. The Capture   |
|                                  | ID does not have to exist to     |
|                                  | enter its value in this field,   |
|                                  | but if an exact match does not   |
|                                  | exist at run time, then no       |
|                                  | message data will be captured.   |
|                                  | Using the F10 prompting function |
|                                  | helps to avoid the potential of  |
|                                  | keystroke errors when typing a   |
|                                  | long ID name. Space characters   |
|                                  | are allowed within the Capture   |
|                                  | ID string.                       |
+----------------------------------+----------------------------------+
| Before/After Evt, Reply          | This option controls whether the |
|                                  | Capture Application and any      |
|                                  | associated Response Rules will   |
|                                  | be executed before the Event     |
|                                  | Command and Reply action of this |
|                                  | Parameters record will be        |
|                                  | completed. Older versions of the |
|                                  | Agent did not provide this       |
|                                  | option, so the default behavior  |
|                                  | was that Capture Applications    |
|                                  | would always execute After the   |
|                                  | Parameters actions were          |
|                                  | completed. This would sometimes  |
|                                  | require that two Parameters      |
|                                  | records be created in order to   |
|                                  | set and utilize Dynamic Variable |
|                                  | values required by either the    |
|                                  | Event Command or by the Reply    |
|                                  | field. Now, however, the Before  |
|                                  | option allows the Dynamic        |
|                                  | Variable values to be computed   |
|                                  | and set first, so that only one  |
|                                  | Parameters record is usually     |
|                                  | required to manage a message.    |
+----------------------------------+----------------------------------+

:  

###### Functions

-   **F3=Exit**: Quits the window and returns to the list of trapped
    messages without completing any updates.

-   **F4=Prompt Evt**: When the cursor is positioned in the Event
    command field, \<**F4**\> causes a window of OpCon Event commands to
    appear from which a value may be selected and returned to this
    field.

-   **F5=Refresh**: This function key will restore the current display
    format (TRPMSGR2A, 2B or 2C) to its original state that was first
    presented when the Add, Change or Copy function was started. Using
    F5=Refresh is isolated to the current display, for example, using F5
    on display format 2B does not affect format 2A. However, it is
    possible to use F12 to go back to format 2A and then press F5 to
    restore format 2A to its original state.

-   **F6=DynVar**: This function key, when pressed while the cursor is
    positioned in a supported field, causes a window listing available
    Dynamic Variables to appear. PageDown as necessary, then position
    the cursor over the desired variable name and press \<**Enter**\> to
    select that variable so that it will be inserted as a token into the
    supported field. The token will be inserted at the position where
    the cursor was when \<**F6**\> was pressed. Supported fields
    include: Compare Text, Threshold Counter and Event Command.

-   **F8=Prompt CMD**: When the cursor is positioned in the Event
    command field, \<**F8**\> causes the job to branch into IBM i
    command prompting. If an IBM i command name was typed before
    \<**F8**\> was pressed, then that specific command will be prompt.
    Otherwise, a general command search window will appear to help find
    the desired command. (Note that this IBM command prompting will not
    allow a command to be executed.)

-   **F10=Capture**: This function key causes a branch to Work with
    Message Data Capture Definitions. From the list of existing Capture
    Definitions, option 1=Select may be used to return a Capture ID into
    the field on the Message Management Parameters record. Using F10 is
    recommended for this field because of the increased possibility of
    keystroke errors when long ID names may be used. It is possible to
    add new Capture Definitions while branching with this function key,
    and then to select the new ID for use.

-   **F10=\$VAR (TRPMSGR2A, TRPMSGR6)**: When the cursor is positioned
    within a field that supports the Agent\'s special \$VARIABLES, F10
    causes a window of supported \$VARs to pop up. Position the cursor
    over the desired \$VAR name and press Enter to insert that variable
    into the location where the cursor was located on the screen format
    A display.

      -------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
      ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [F10=\$VAR is also supported in the same way after using PageDown or F13=More to work with a longer Event command in screen format TRPMSGR6.]
      -------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   **F10=Capt AppID (TRPMSGR2C)**: This function key causes a branch to
    Work with Message Data Capture Definitions. From the list of
    existing Capture Definitions, option 1=Select may be used to return
    a Capture ID into the field on the Message Management Parameters
    record. Using F10 is recommended for this field because of the
    increased possibility of keystroke errors when long ID names may be
    used. It is possible to add new Capture Definitions while branching
    with this function key, and then to select the new ID for use.

-   **F12=Prev page, Cancel**: From display formats TRPMSGR2B and 2C,
    this function key returns the display to the previous display format
    (2A or 2B). Use the Enter key and F12 to move among the three
    display formats. However, F12 pressed from display format 2A will
    cause an exit from the maintenance function (without updating any
    data) and the display returns to the \"Work with\" list display.
    F3=Exit can be used to cancel all updates and return to the list
    display from any of the display formats.

      -------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------
      ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [Using the Enter key from display format 2C will commit all changes from all three display formats to the database.]
      -------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------

-   **F20=Reset Thr**: Similar to the SETMSGTHR command, this function
    key can be used to force the threshold count (stored in an LSAM
    Dynamic Variable) to be reset to zeros. Resetting the threshold
    count to zeros makes the dates of last activity have no meaning; the
    dates are only used when the threshold count is 1 or greater.

##### \$Variables Supported in Event Commands

Event commands that are processed by Message Management may include many
of the same token variables as are supported by OpCon/xps. However,
there is a difference in the syntax. OpCon requires that variables begin
with a dollar sign (\$) and that the whole variable name be enclosed in
double square brackets, for example, \[\[\$JOB NAME\]\]. The IBM i green screen workstation does not support the square brackets, so they are not
required when inserting variables into the Event command, for example,
\$JOB NAME. The following table lists the variables that the LSAM
Message Management facility can detect and replace when responding to a
message.

  Variable           Description
  ------------------ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  \$FREQUENCY NAME   The name of the OpCon/xps frequency table that was assigned to the job that issued the message.
  \$IBM JOB ID       The IBM i current job ID, in this format: 123456/JOBUSER/JOBNAME.
  \$IBM JOB NAME     The IBM i current Job Name.
  \$IBM JOB NBR      The IBM i current Job Number (always 6 digits, but handled as characters).
  \$IBM JOB USER     The IBM i current job User Name (IBM i User Profile that started the job).
  \$JOBID            The OpCon/xps job identifier, a 10-digit number.
  \$JOBID CMP        The OpCon/xps job name and job identifier, joined into a single string with blanks compressed out.
  \$JOBID LONG       The OpCon/xps job name followed by the job identifier, with all blanks retained in the string.
  \$JOB NAME         The OpCon/xps job name.
  \$JOB LONG NAME    The long format of the complete OpCon job name.
  \$MACHINE NAME     The OpCon/xps name for the LSAM job scheduler, normally the same as the LSAM Name specified in the LSAM Parameters (but the value supplied by OpCon/xps with job start requests is used here).
  \$MSG              The actual primary text from the message that was trapped. (Refer to note below about editing the content of the captured message text.)
  \$MSGID            The IBM i message ID currently being processed, in a format like CPF1234.
  \$MSGQ             The name of the message queue where the current message was found.
  \$MSGQ LIB         The library location of the message queue.
  \$SCHEDULE DATE    The date of the OpCon schedule under which the job that issued the message was started, in the (\*ISO0) format of CCYYMMDD.
  \$SCHEDULE NAME    The name of the OpCon/xps schedule under which the job that issued a message was started.

  : \$Variables Supported in Event Commands

 

  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [The content of the \$MSG variable may be edited to eliminate or escape any single quote or comma characters. This prevents possible errors when the value of \$MSG is used in LSAM and IBM i commands. Use the Message Management Performance Parameters (described above) to control the edit of the \$MSG content. Additional discussion of the edit codes for single quotes and commas may be found in Events and Utilities Menu, under the subject of Captured Data Response Rules.]
  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

To use OpCon token variables, other than the variables listed above,
include them in the Event Command text by surrounding them with braces
(curly brackets) {{ }}. OpCon/xps will recognize the braces (curly
brackets) in the same way as it recognizes square brackets \[\[ \]\]. This rule was established to support operating systems such as IBM i
where the native EBCDIC character set does not support typing of square
brackets. Do not use any brackets when using one of the variable names
in the table above, because the LSAM Message Manager will replace the
variable with its value and leave the brackets in the text. This could
cause a problem with the OpCon/xps token substitution logic.

 

However, to have OpCon replace any of the other token variables that it
can manage use the braces (curly brackets) to surround the token name.

 

+----------------------------------+----------------------------------+
| ![White pencil icon on green     | **EXAMPLE:** [Syntax for         | | circular                         | OpCon/xps Token variables in an  |
| background](../../../Reso        | LSAM Message Management Event    |
| urces/Images/example-icon(48x48) | command.]{.statement2}           |
| .png "Example icon") |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | {{\$SCHEDULE DATE}}              |
+----------------------------------+----------------------------------+

 

More information on Event parameters may be found in [Events and Utilities Menu](Events-and-Utilities-Menu.md#top).
Important information about translation table support that might affect
OpCon token variable name syntax may be found in [Commands and Utilities](Commands-and-Utilities.md#top). For
additional information, refer to
[Properties](https://help.smatechnologies.com/opcon/core/latest/Files/Concepts/Properties.md){.MCXref
.xref} in the **Concepts** online help and/or [Defining Events](https://help.smatechnologies.com/opcon/core/latest/Files/OpCon-Events/Defining-Events.md#Defining){.MCXref
.xref} in the **OpCon Events** online help.

#### Windows

##### Event Selection Pop-up Window

Event Selection Window

  ------------------------------------------------------------------
                           Event Selection
               Position to desired Event, press Enter.
               Press F12 to return without a selection.
                                   
                        Event      Description
   [CONDSP    ]{style="background-color: #00ff00;"} Console display                   CPYTOMSGIN Send any Event command
                          JOBADD     Job Add
                          JOBBAD     Job bad
                        JOBCNL     Job Cancel
                        JOBDEL     Job Delete
                         JOBGOG     Job Good
                         JOBHLD     Job Hold
                        JOBRLS     Job release
                      JOBRSC     Job Reschedule
                               More\...
                              F12=Cancel
  ------------------------------------------------------------------

###### Fields

  Field         Description
  ------------- -----------------------------------------------------------------------
  Event         The OpCon/xps Event to be generated.
  Description   A description of the action that is performed by the OpCon/xps event.

  :  

###### Functions

**F12=Cancel**: Quits the prompt window and returns to the Trapped
Messages Parameters window without completing any updates.

##### Event Command Prompting Window

After an Event is selected from the event list window, the program uses
the IBM i command prompting to show the parameters that are appropriate
for each Event. When \<**Enter**\> is pressed from the command prompting
window, the Event command string is inserted into the Event command
field with all the correct formatting and punctuation.

 

The general-purpose Event command CPYTOMSGIN is supported by an
additional prompting window (when selected from within the context of
prompting for Message management parameters) that lists all available
OpCon Event commands. When one of these OpCon Event Commands is
selected, a template of the OpCon Event command is inserted into the
Event command field of the Message management parameter record as an aid
to the correct formatting of the command. This secondary window is
further described below. SMA recommends using the CPYTOMSGIN command
instead of the individual IBM i commands provided by the LSAM to emulate
certain OpCon Event commands. The CPYTOMSGIN command is able to
automatically accommodate changes in OpCon Event command syntax, such as
field sizes, and future additions to the OpCon Event command sent.

 

For all other Event commands from the original prompting window, the
following discussion explains how specific LSAM commands can assist with
the correct formatting of the command syntax. The command CONDSP is
shown as an example.

Event Command Prompting Window

  -------------------------------------------------------------------------------------------------------------------------------------
                                                  LSAM EVENTS: Console display (CONDSP)
                                                                     
                                                        Type choices, press Enter.
                                                                     
    Message  . . . . . . . . . . . .  ['Enclose message text in single quotes'                 ]{style="text-decoration: underline;"}                                                                                          
                                                                     
                                                                 Bottom
                              F3=Exit   F4=Prompt   F5=Refresh   F12=Cancel   F13=How to use this display   
                                                              F24=More keys
  -------------------------------------------------------------------------------------------------------------------------------------

The number and type of fields that are displayed vary depending on the
Event command. More information on Event parameters may be found in the
topic on Event Management. There is also a table, above, of variables
that may be embedded within an Event command. Additional Information can
also be found in
[Introduction](https://help.smatechnologies.com/opcon/core/latest/Files/OpCon-Events/Introduction.md#top){.MCXref
.xref} in the **OpCon Events** online help.

###### Functions

-   **F3=Exit**: Abandons all changes and returns to the menu.

-   **F4=Prompt**: Shows all valid values for a parameter field.

-   **F5=Refresh**: Resets all the command parameters to their default
    values.

-   **F12=Cancel**: Abandons all changes and returns to the Manage LSAM
    Logging status display.

-   **F13=How to use this display**: The IBM default information that
    applies to all command prompting displays.

-   **F24=More keys**: Shows other function keys that may be used.

-   **Enter=Next page, Update**: Use the Enter key to advance from
    screen format A to B, and then from format B to C. When format C is
    completed, pressing Enter commits the screen updates to the database
    master record. Using function key F12 to return to a previous screen
    format does NOT update the database, so if F3=Exit is pressed before
    using the Enter key from format C, no additions or changes are
    committed to the database.

-   **PgDn=PageDown (TRPMSGR2A)**: The PageDown (or Scroll Up) function
    key works the same as F13=More CMD. Both keys may be used while the
    cursor is positioned anywhere within display format TRPMSGR2A in
    order to switch to screen format TRPMSGR6 where the Event command is
    supported by a much larger data entry field. Upon completing screen
    format TRPMSGR6, press Enter to update the command and return to
    screen format TRPMSGR2A.

###### More Keys

-   **F9=All parameters**: This function key has no effect on this
    display.
-   **F11=Keywords**: Toggles the display between the parameter key
    words and the prompting text that describes each parameter.
-   **F14=Command string**: Shows the command and its parameters in the
    form that would be used if the command were typed manually. This
    command appears with a question mark in front of it because it was
    forced into prompt mode by a program call.
-   **F15=Error messages**: Shows any error messages that a command
    validation program has produced, but this command has no command
    validation program.
-   **F16=Command complete**: Has the same effect as pressing
    \<**Enter**\> to initiate the command action. Verify that the
    parameter values are set correctly before using this command key or
    \<**Enter**\>.

##### Event Command Field Size Constraints

Refer to the examples of Event Command prompting above and below to
understand how the LSAM software commands help to define the limits of
fields that apply to each OpCon Event. At one time, OpCon had a
constraint that no single field of an Event command could exceed 80
characters. Most of the LSAM commands used to format an Event command
show fields that would permit more characters to be entered because
within OpCon those fields have mostly been defined as longer than 80
characters.

 

In the compressed example above, the CONDSP command prompt is used to
enter message data that will become part of the OpCon/xps Event
\$CONSOLE:DISPLAY. This command prompting screen limits the message data
to only 80 characters. (Since OpCon now allows much longer messages to
be sent via OpCon Event command processing, command prompting will be
revised accordingly.) When used for an LSAM Message Management Event
command, the fields of OpCon Events support Event Command Variable field
substitution, as documented above in this topic.

SCGBLD Command Prompt

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                                                  LSAM EVENTS: Schedule Build (SCHBLD)
                                                                                     
                                                                        Type choices, press Enter.
                                                                                     
                      Schedule Name  . . . . . . . . .   \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ 
   \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ 
                                                                            \_\_\_\_\_\_\_\_
                                            Schedule Date  . . . . . . . . .   [CURRENT]{style="text-decoration: underline;"}                                       Overwrite existing schedule? . .   [N]{style="text-decoration: underline;"}             Y or N
                     Log file (\\path\\) name . . . . .   \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ 
                                                \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
                                                                                     
                                                                                     
                                                                                     
                                                                                 Bottom
                                               F3=Exit   F4=Prompt   F5=Refresh   F12=Cancel   F13=How to use this display
                                                                              F24=More keys
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------

The Schedule Build command prompt example above shows that the Schedule
Name field allows up to 128 characters and the Log file path name is
limited to 80 characters at this time. OpCon allows for Schedule names
to be up to 128 characters long, and path names could easily extend to
beyond 80 characters. To accommodate longer OpCon Event command field
sizes (as OpCon is able to handle them), use the CPYTOMSGIN general
Event command with the IBM i LSAM.

##### CPYTOMSGIN Command Prompting Window

The general-purpose Event command CPYTOMSGIN is supported by an
additional prompting window (when selected from within the context of
prompting for Message management parameters) that lists all available
OpCon Event commands.

CPYTOMSGIN Event Selection Window

  -----------------------------------------------------------
                       CPYTOMSGIN Events
            Position to desired Event, press Enter.
           Press F12 to return without a selection.
                                
                    OpCon/xps Event Command
   [\$CONSOLE:DISPLAY]{style="  background-color: #00ff00;"}                        \$JOB:ADD        
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
  -----------------------------------------------------------

When the cursor is positioned over one the available commands, the OpCon
Event Command syntax model will be inserted into the Message parameter
on a prompt screen for the CPYTOMSGIN command, as illustrated below.

Event Command Syntax Model

  ------------------------------------------------------------------------------------------------------------------------------------------------------------
                                                                   Copy to MSGIN (CPYTOMSGIN)
                                                                                
                                                                   Type choices, press Enter.
                                                                                
   [ Message  . . . . . . . . . . . . \>]{style="color: #008000;"} [\'\$JOB:CANCEL,\<schedule date\>,\<schedule name\>]{style="text-decoration: underline;"}                                        ,\<job name\>\'                                                                    
                                                                                                                        
                                                                                                                        
                                                                                                                        
                                                                                                                        
          [                                                                    ]{style="text-decoration: underline;"} [\...]{style="color: #0000ff;"}                                                                                 
                                                                                
                                                                             Bottom
                                           F3=Exit   F4=Prompt   F5=Refresh   F12=Cancel   F13=How to use this display
                                                                          F24=More keys
  ------------------------------------------------------------------------------------------------------------------------------------------------------------

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
the final command format for CPYTOMSGIN to be inserted into the Message
management parameters, Event command field. (The command syntax may
still be modified, once it has been inserted into the Event command
field.)

#### Delete

###### Menu Pathways

Main Menu \> Message management menu (\#2) \> Message management
parameters (\#1) \> 4=Delete

-   **Screen Title**: Message Management Parameters
-   **Screen ID**: TRPMSGR4

###### Fields

  Field       Description
  ----------- ------------------------------------------------------------------------------------------------------------------------
  MsgQueue    The message queue to be examined for messages.
  MsgQ Lib    The library in the DB2/400 database where the message queue is located.
  Msg ID      The message file that holds the definition of the message ID.
  Msg File    The message file where the Msg ID is defined.
  Job Name    A specific IBM i job name, a partial job name such as JOB\*, or \*ALL
  User Name   A specific IBM i job user name, a partial user name such as USER\*, or \*ALL
  SQ\#        A sequence number assuring uniqueness and regulating order of processing when all other key fields above are the same.

  :  

###### Functions

-   **F3=Exit**: Quits the delete confirmation screen without deleting
    records and returns to the menu.
-   **F12=Cancel**: Quits the delete confirmation window without
    deleting records and returns to the Trapped Messages Parameters
    list.
-   **F14=Confirm**: Press the \<**F14**\> key to complete the delete
    action.

#### F7 = Add Queue

###### Menu Pathways

Main Menu \> Message management menu (\#2) \> Message management
parameters (\#1) \> F7

Add Message Management Parameters

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  [TRPMSGR03-R1]{style="color: #008000;"}             Message management parameters                 [00/00/00]{style="color: #008000;"}   [USERNAME]{style="color: #008000;"}                  [Add new record]{style="color: #ff00ff;"} [Type --]{style="color: #008000;"} [Queue]{style="color: #ff00ff;"}                  [09:46:38]{style="color: #008000;"}
   
  [Message Queue, Library  :]{style="color: #008000;"} [USERQNAME ]{style="color: #ffcc00;text-decoration: underline;"}   [QUSRSYS   ]{style="color: #ffcc00;text-decoration: underline;"}   [Message ID, Message File:]{style="color: #008000;"} [\*\*\*\*\*\*\*]{style="color: #00ffff;text-decoration: underline;"}      [\*\*\*\*\*\*\*\*\*\*]{style="color: #00ffff;text-decoration: underline;"}
  [Job Name, User Name . . :]{style="color: #008000;"} [\*\*\*\*\*\*\*\*\*\*]{style="color: #00ffff;text-decoration: underline;"}   [\*\*\*\*\*\*\*\*\*\*]{style="color: #00ffff;text-decoration: underline;"}          [Sequence \#]{style="color: #008000;"} [000]{style="color: #00ffff;text-decoration: underline;"}    
   
  [Answer Type . . . . . . :]{style="color: #008000;"} [Q]{style="color: #00ffff;text-decoration: underline;"}            [R=Reply,E=Event,B=Both,Q=Monitor Queue]{style="color: #0000ff;"}    
   
   
   
  F3=Exit   F5=Refresh   F12=Cancel
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

When F7=Add Queue has been pressed, the Add new record screen appears
with variations that are shown in the example above. This form of LSAM
Message Management Parameter is used to signal the LSAM message
management server that it should monitor the named message queue.
However, this type of record does not specify which message or which job
should be checked; instead, that information would be provided by
job-level message management parameters that are optionally supplied
with jobs initiated by OpCon.

 

The Monitor Queue type of record shows the following characteristics
that are different from LSAM generic message management parameter
records:

-   The Message ID, Message File, Job Name and Job User fields are
    filled by the system with asterisks, and the Sequence number is
    zeros.
-   The Answer Type is forced to \"Q\" to indicate that this record will
    cause no event or message response by itself.
-   Other fields that further define LSAM generic message management are
    not displayed because they are not used with Answer Type Q.

  -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [It is possible for the F6=Add function and the option 2=Change function to be used to create or change an LSAM message management parameter record into a Monitor Queue type of record by typing a letter \"Q\" into the Answer Type field. In other words, it is not necessary to use F7=Add Queue to create this special type of record. However, once an LSAM Message Management Parameter record has been changed into this special type, it cannot be changed back to another Answer Type. It can only be deleted.]
  -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

  ------------------------------------------------------------------------------------------------------------------------------ --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White \"X\" icon on red circular background](../../../Resources/Images/warning-icon(48x48).png "Warning icon")   **WARNING:** [It is possible to use option 4=Delete to remove all records that name a message queue, leaving the LSAM message management server program with no reference to that message queue. If all the LSAM global message management records for a specific message queue are removed, use the F7=Add Queue function to replace them with at least one record for the message queue in order to enable job-level message management to look for messages in that queue. It is recommended that the F17=Subset function be used to verify the filtered list of all message queues that the LSAM may monitor.]
  ------------------------------------------------------------------------------------------------------------------------------ --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### Work with Message Data Capture Definitions

Rules for capturing message data elements are assembled into logical
groups identified by an Application ID (similar to screen data captures
by Operator Replay scripts and report data captures by the SCANSPLF
utility). One or more message data capture rules may be associated with
each Application ID, where multiple rules are identified by a sequence
number. The Application ID may be entered into the field of that name on
the Message Management Parameters master record, as explained above in
that screen documentation. A single Application ID may be shared by more
than one Message Management Parameters record.

 

  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [It may be easier to use the F10=Capture function key from the Message management parameters Create, Copy or Change screens when selecting an Application ID because this helps avoid keystroke errors when long IDs are used. As noted in Menu Pathways here, this same Work With function may be used via that F10 function key.]
  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   **Screen Title**: Work with Message Data Capture Definitions
-   **Screen ID**: TRPM30R1

###### Menu Pathways

-   Main Menu \> Message management menu (\#2) \> Work with Message Data
    Capture Definitions (\# 10)
-   Main Menu \> Message management menu (\#2) \> Message management
    parameters (\#1) \> F10

###### Fields

+----------------+----------------------------------------------------+
| Field          | Description                                        |
+================+====================================================+
| Search Content | -   Type a value in this field and press           |
|                |     \<**Enter**\> or \<**F16**\> to find a record  |
|                |     in the list that contains the characters       |
|                |     typed. The content may exist anywhere within   |
|                |     the master record, so the list may not show    |
|                |     the value when a record is identified. Type    |
|                |     5=Display to view the record details and       |
|                |     verify the matched content.                    |
|                | -   A search may be continued beyond the first     |
|                |     record, using the same search value that now   |
|                |     appears in pink below this field, by pressing  |
|                |     \<**F16**\> to continue the search to the next |
|                |     matching record.                               |
+----------------+----------------------------------------------------+
| Application ID | The character string that labels the message data  |
|                | capture definition.                                |
+----------------+----------------------------------------------------+
| Seq            | A sequence number that is used to support multiple |
|                | capture definitions within the same Application    |
|                | ID.                                                |
+----------------+----------------------------------------------------+
| P/S            | This flag field indicates which message text field |
|                | is used by the capture definition. Values include: |
|                | P = primary text, S = secondary (Help) text, or B  |
|                | = both. When both are used, they are assembled     |
|                | into a single message text buffer for the purpose  |
|                | of applying the From/To capture positions.         |
+----------------+----------------------------------------------------+
| From/To        | These two fields show the starting and ending      |
|                | locations of the message text buffer that will be  |
|                | captured by this definition.                       |
+----------------+----------------------------------------------------+
| Length         | This field shows the length of data that will be   |
|                | captured from the message text buffer, starting at |
|                | the From position.                                 |
+----------------+----------------------------------------------------+

:  

###### Functions

-   **F3=Exit**: Quits the list and returns to the menu.
-   **F5=Refresh**: Reads the message capture definitions file again and
    reloads the list display.
-   **F6=Add**: Proceeds to the Create Message Data Capture Definition
    screen.
-   **F12=Cancel**: Quits the list and returns to the menu.
-   **F16=Search next:** When a value is entered in the Search content
    field, or a value shows in pink below this field from the last
    search request, pressing \<**F16**\> finds the next (or first)
    occurrence of the value specified. F16 is useful for finding each
    desired list entry when there is more than one list entry that
    satisfies the search request. When a value is first typed into the
    Search content field, \<**F16**\> works the same as the
    \<**Enter**\> key for starting a new search. However, only
    \<**F16**\> may be used to continue a search past the first entry
    that satisfies the search criteria.
-   **F17=Top**: Repositions the list display to the first record.
-   **F18=Bottom**: Repositions the list display to the last record.

###### Options

-   **1=Select**: This option is only displayed when this screen is
    displayed after using F10=Capture from the Message Management
    Parameters maintenance. Type 1 next to the desired Application ID to
    return that ID to the field on the source display.
-   **2=Change**: To change an Application ID, type 2 next to the ID
    line and press \<**Enter**\> to proceed to the Change record screen.
-   **3=Copy**: To copy one Application ID record\'s definition to a new
    Application ID, type 3 next to the ID line and press \<**Enter**\>
    to proceed to the Copy record screen. During the copy process, the
    program will display a pop-up window offering an option to also copy
    all related Response Rules.
-   **4=Delete**: To delete an Application ID, type 4 next to the Msg ID
    line(s) and press \<**Enter**\> to proceed to the Confirm Delete of
    Records screen. During the delete process, the program will display
    a pop-up window offering an option to also delete all related
    Response Rules.
-   **5=Display**: To view details of an Application ID, type 5 next to
    the ID line and press \<**Enter**\> to proceed to the Display
    Details screen.
-   **6=Response**: To view any associated Captured Data Response Rules,
    type 6 next to the ID line and press \<**Enter**\> to proceed to a
    list display of Response Rules.
-   **7=Capt chart**: Type option 7 next to any Capture Definition to
    view a chart of related Response Rules and Dynamic Variables.

#### Add/Change/Copy Message Data Capture Definition

-   **Screen Title**: Copy Message Data Capture Definition
-   **Screen ID**: TRPM30R2

Refer to the How To discussion earlier in this topic for more
information about the meaning and purpose of the fields on this display,
as well as recommendations and examples for using Message Data Capture.
Refer to details about the rules and effect of each field in the fields
table, below.

###### Menu Pathways

Main Menu \> Message Management menu (\#2) \> Work with Message Data
Capture Definitions (\# 10) \> F6=Add *- or -* option 2=Change **- or
-** option 3=Copy.

###### Fields

+------------------------+--------------------------------------------+
| Field                  | Description                                |
+========================+============================================+
| From fields:           | When this screen appears in Copy mode, the |
|                        | key fields of the source record being      |
| -   Application ID     | copied are shown in this heading area. A   |
| -   Capt Seq           | new value must be assigned to the Sequence |
|                        | of the Capture Definition record being     |
|                        | created in Copy mode, using the Capture    |
|                        | Sequence input field, below. (The          |
|                        | Application ID field may remain the same   |
|                        | in the new, copied record, since more than |
|                        | one scan rule is allowed per Application   |
|                        | ID.)                                       |
+------------------------+--------------------------------------------+
| Application Identifier | This field is used to group one or more    |
|                        | Capture Definitions into a single task     |
|                        | that will be executed whenever an          |
|                        | associated Message Management Parameters   |
|                        | record is selected for processing a        |
|                        | message.                                   |
+------------------------+--------------------------------------------+
| Capture sequence       | The order in which the Capture Definition  |
|                        | will be processed, relative to other       |
|                        | records under the same Application. The    |
|                        | value must be unique within the            |
|                        | Application ID.                            |
+------------------------+--------------------------------------------+
| Primary/Secondary text | Data may be captured from a text buffer    |
|                        | created from any of these sources:         |
|                        |                                            |
|                        | -   P = primary message text only          |
|                        | -   S = secondary message (Help) text only |
|                        | -   B = both: primary and secondary text   |
|                        |     are assembled into a single buffer,    |
|                        |     with one space character between the   |
|                        |     last non-blank character of the        |
|                        |     primary text and the start of the      |
|                        |     secondary text                         |
+------------------------+--------------------------------------------+
| Message data from pos. | The start position in the message text     |
|                        | buffer where data capture will begin. (The |
|                        | first position is 1, not 0.)               |
|                        |                                            |
|                        |                                            |
|                        |                                            |
|                        | **Note:** If the Scan Label is used, then  |
|                        | this From-position marks the location      |
|                        | where the search will start for the Scan   |
|                        | Label.                                     |
+------------------------+--------------------------------------------+
| Message data to pos.   | The end position of the data capture; may  |
|                        | be used instead of Length.                 |
|                        |                                            |
|                        |                                            |
|                        |                                            |
|                        | **Note:** If the Scan Label is used, then  |
|                        | this To-position marks the position within |
|                        | the text buffer where the search for the   |
|                        | Scan Label will end.                       |
+------------------------+--------------------------------------------+
| Length of data string  | The length of data, starting with the      |
|                        | From-position, that will be captured from  |
|                        | the text buffer.                           |
|                        |                                            |
|                        |                                            |
|                        |                                            |
|                        | **Note:** This field is required when the  |
|                        | Scan Label is used, in order to determine  |
|                        | how much data to capture, starting with    |
|                        | the \"Data position from LBL.\"            |
+------------------------+--------------------------------------------+
| Scan label string      | -   A character string that will be used   |
|                        |     as a Label to identify where data      |
|                        |     capture should start. If this label is |
|                        |     found, then the data capture will      |
|                        |     begin from the \"Data position from    |
|                        |     LBL\" and continue until the specified |
|                        |     \"Length\" is reached.                 |
|                        | -   If the Scan Label is not found, no     |
|                        |     data will be captured.                 |
|                        | -   An LSAM Dynamic Variable token may be  |
|                        |     used in this field (refer to **F6**).  |
+------------------------+--------------------------------------------+
| Scan label length      | Specifies the length of the character      |
|                        | string entered in the \"Scanlabel string\" |
|                        | field. If this value is left at zero, the  |
|                        | length of the label is assumed to be the   |
|                        | last non-blank character in the Scan label |
|                        | string field. Specify a non-zero value in  |
|                        | this field in order to include any         |
|                        | trailing blanks as part of the Scan label  |
|                        | string.                                    |
+------------------------+--------------------------------------------+
| Scan label incidence   | This is the number of times that the Scan  |
|                        | Label String must be found before starting |
|                        | the data capture. If the Scan Label is not |
|                        | found this number of times, no data        |
|                        | capture will be performed. The \"Data      |
|                        | position from LBL\" is computed from this  |
|                        | incidence of the Scan Label. If this field |
|                        | is left at zeros, a value of 1 is assumed. |
+------------------------+--------------------------------------------+
| Data position from LBL | -   This field specifies the position of   |
|                        |     the data to be captured, relative to   |
|                        |     the start of the Scan Label String.    |
|                        | -   +n (a positive number) = start the     |
|                        |     data capture at this position relative |
|                        |     to the start of the Scan Label, where  |
|                        |     1 is the first byte of the Scan Label  |
|                        |     itself. In other words, it is possible |
|                        |     to include the Scan Label as part or   |
|                        |     all of the captured data.              |
|                        | -   -n (a negative number) = start the     |
|                        |     data capture this number of characters |
|                        |     before the Scan Label, where (-1) is   |
|                        |     the character position immediately     |
|                        |     preceding the Scan Label. The data     |
|                        |     capture may overlap the Scan Label     |
|                        |     itself.                                |
|                        | -   0 = Capture data beginning with the    |
|                        |     \"Message data from pos.\" specified   |
|                        |     above. Using this value, it is         |
|                        |     possible to let the Scan Label be used |
|                        |     only as means of qualifying whether or |
|                        |     not any data should be captured from   |
|                        |     the message text buffer. If the scan   |
|                        |     label is not found, then no data will  |
|                        |     be captured.                           |
+------------------------+--------------------------------------------+
| Compress numeric data  | -   0 = not numeric                        |
|                        | -   1 = yes, compress numeric data         |
|                        | -   This flag indicates whether the        |
|                        |     captured data should be a simple       |
|                        |     character string, exactly as it        |
|                        |     appears in the message text buffer, or |
|                        |     whether the data should be scrubbed to |
|                        |     remove all except the digits. This     |
|                        |     flag is useful when a numeric value    |
|                        |     may be found in the message data, but  |
|                        |     the number included some formatting    |
|                        |     characters as it appeared in the       |
|                        |     message text. Setting this flag to 1   |
|                        |     allows the real numeric value to be    |
|                        |     saved and later used in numeric        |
|                        |     computations.                          |
|                        |                                            |
|                        | **Note:** When numeric data is compressed, |
|                        | the number is saved as a whole number.     |
|                        | There is no record of any decimal          |
|                        | positions, so those are only implied. To   |
|                        | preserve the number of decimal positions   |
|                        | in captured data, use a Captured Data      |
|                        | Response Rule to store the captured        |
|                        | numeric data into an LSAM Dynamic          |
|                        | Variable, having created the Dynamic       |
|                        | Variable as a numeric field with a number  |
|                        | of decimal places specified. (Refer to the |
|                        | SETDYNVAR command or the \"Maintain        |
|                        | dynamic variables\" function from LSAM     |
|                        | menus (on many LSAM menus) in Events and   |
|                        | Utilities.)                                |
+------------------------+--------------------------------------------+

:  

###### Functions

-   **F3=Exit**: Return to the LSAM menu.
-   **F5=Refresh**: Reload the maintenance display with the original
    default values for Add, Copy or Change, discarding any new typed
    input.
-   **F6=DynVar**: When the cursor is positioned in the Scan Label
    String field, use this function key to view a window of registered
    Dynamic Variable values and select a value to be inserted into the
    field.
-   **F11=Response rules**: Use this function key to branch directly to
    the Work with Capture Response Rules list display. This function key
    helps by carrying forward the Application ID and Sequence Number
    that are required to label any related Response Rules. After
    returning from that function, remember to press the \<**Enter**\>
    key to complete any pending updates of the Message Data Capture
    Definition record.
-   **F12=Cancel**: Return to the Work with Message Data Capture
    Definition list.

##### Copy/Delete Message Data Capture Rule (options 3 and 4)

Whenever the options 3=Copy or 4=Delete are being processed, the program
will present a window that offers an opportunity to also copy or delete
any Response Rules associated with the Capture Rule that is being
maintained.

Manage Response Rules Window (Copy)

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------
                                                                        Manage Response Rules
                                                                                   
   [ Copy response rules also?]{style="color: #008000;"}   [1]{style="color: #ffcc00;text-decoration: underline;"}  [0=No, 1=Yes        ]{style="color: #008000;"}                                                                          (Recommended: 1=Yes)
                                                                                   
                                                                      Enter=Select   F12=Cancel
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------

Manage Response Rules Window (Delete)

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------
                                                                        Manage Response Rules
                                                                                   
   [ Delete response rules also?]{style="color: #008000;"}   [1]{style="color: #ffcc00;text-decoration: underline;"}  [0=No, 1=Yes      ]{style="color: #008000;"}                                                                          (Recommended: 1=Yes)
                                                                                   
                                                                      Enter=Select   F12=Cancel
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------

###### Fields

+----------+----------------------------------------------------------+
| Field    | Description                                              |
+==========+==========================================================+
| Copy     | -   0=No, 1=Yes                                          |
|          | -   When either option 3=Copy or option 4=Delete is      |
| *- or -* |     selected, the program offers the option to perform   |
|          |     either a copy or a delete of all Response Rules that |
| Delete?  |     are related to each Capture Rule.                    |
|          | -   For option 0=No, the copy or delete action is        |
|          |     completed, but any associated Response rules are     |
|          |     ignored.                                             |
+----------+----------------------------------------------------------+

:  

###### Functions

**F12=Cancel**: Quits the option window and returns to the list control
display. (The copy or delete option remains incomplete and must be
restarted, if desired.)

#### Display Capture Rules/Response Rules Chart (option 7)

The Capture and Response Rules chart displays are explained in detail
under Operator Replay Scripts, within the Screens and Windows section,
under the title \"Operator Replay Capture Chart (opt 7).\"

Use this option to collect all related Capture Applications and Response
Rules, plus show referenced Dynamic Variables, in a single list display.
From this list, option 5=Display may be used to view the details of any
record associated with a Message Management Parameters record. This
option also shows when more than one Parameters record has the same
selection criteria, but uses a unique Sequence Number.

### Work with Capture Response Rules

The Work with Capture Response Rules function is identical to the
description provided in Events and Utilities, except that these Response
Rules are related only to Message Data Capture Definitions instead of to
SCANSPLF data capture. Please refer to Events and Utilities Menu to see
the screens and windows used to create Capture Response Rules.

###### Menu Pathways

-   Main Menu \> Message Management menu (\#2) \> Work with Capture Data
    Response Rules (\# 11)
-   Main Menu \> Message Management menu (\#2) \> Work with Message Data
    Capture Definitions (\# 10) \> F11=Response rules.

Capture Response Rules for message data must be assigned an existing
Application ID and Sequence Number from the list that can be viewed in
the Work with Message Data Capture Definition, documented above in this
topic. It is possible to use function 11 from the Message Management
Menu to directly update Response Rules. However, it may be more
convenient to use the function key \<**F11**\> from within the Work with
Message Data Capture Definitions function, available from the Create,
Change or Copy screen formats. Using function key \<**F11**\> limits the
list display of Captured Data Response rules to only those rules related
to the current Message Data Capture Definition application ID and
sequence number.

### Message Management Operations Screens

#### Start Message Management -- Start Mode Window

Start Message Management - Start Mode Prompt

  -----------------------------------------------------------------------------------------------------------------------------------------------------
                                                                Start Message Management
                                                                             
   [Server start mode (warm/cold):]{style="color: #008000;"} [0]{style="color: #ffcc00;"}    [0 = warm start, 1 = cold start]{style="color: #008000;"}                                                                              
                                                                             
                                                    Press Enter to continue, or F3 or F12 to cancel.
  -----------------------------------------------------------------------------------------------------------------------------------------------------

###### Menu Pathways

Main Menu \> Message management menu (\#2) \> Start message management
(\#3)

###### Fields

+----------------------+----------------------+----------------------+
| Field                | Values               | Description          |
+======================+:====================:+======================+
| Server start mode    | 0 = warm start       | -   0 = keep the     |
| (warm/cold)          |                      |     content of the   |
|                      | 1 = cold start       |     Message          |
|                      |                      |     Management       |
|                      | The default value is |     message key      |
|                      | retrieved from the   |     control file.    |
|                      | Message Management   |     This allows the  |
|                      | performance          |     server to        |
|                      | parameters.          |     perform a warm   |
|                      |                      |     start,           |
|                      |                      |     attempting to    |
|                      |                      |     resume message   |
|                      |                      |     queue reading    |
|                      |                      |     from after the   |
|                      |                      |     last message     |
|                      |                      |     that was         |
|                      |                      |     previously       |
|                      |                      |     processed.       |
|                      |                      | -   1 = clear the    |
|                      |                      |     content of the   |
|                      |                      |     Message          |
|                      |                      |     Management       |
|                      |                      |     message key      |
|                      |                      |     control file.    |
|                      |                      |     This tells the   |
|                      |                      |     server to first  |
|                      |                      |     clear the        |
|                      |                      |     control file     |
|                      |                      |     before starting  |
|                      |                      |     the server       |
|                      |                      |     processing, and  |
|                      |                      |     it instructs the |
|                      |                      |     server to start  |
|                      |                      |     at the beginning |
|                      |                      |     of each message  |
|                      |                      |     queue.           |
|                      |                      | -   Refer to         |
|                      |                      |     additional       |
|                      |                      |     discussion above |
|                      |                      |     about Starting   |
|                      |                      |     Message          |
|                      |                      |     Management.      |
+----------------------+----------------------+----------------------+

:  

#### Check Message Management Status - Window

Check Message Management Status Window

  ----------------------------------------------------------------------------------------------------------------------------
   
  [Message management status:]{style="color: #008000;"} [STOPPED                                  ]{style="color: #ff0000;"}    
  *\-- or \--*                   [STARTED]{style="color: #008000;"}    
  Press Enter to continue
  ----------------------------------------------------------------------------------------------------------------------------

###### Menu Pathways

Main Menu \> Message management menu (\#2) \> Check message management
status (\#5)

#### View Job Completion Message Table

This function displays the contents of a table file distributed by SMA
that is not normally updated by LSAM users. The message IDs displayed in
this table are recognized by the LSAM job completion message management
server (job MSGMNG) as representing the completion status of jobs. Since
these unique messages server only this special purpose, the message IDs
in this table are not allowed for management by the LSAM Message
Management facility. This means that when the LSAM Parameters (LSAM main
menu, option 7) are set to use Message Management rules for messages
arriving in the LSAM\'s dedicated job completion message file, SMAMSGF,
the message IDs in this table cannot be specified for general message
management. The responses to these messages must be managed from OpCon,
according to the job status that each message may generate.

Job Completion Messages Control Table View

  --------------------------------------------------------------------------------------------------------
                                        Display Physical File Member
              File . . . . . . :   LSAMSGF00           Library  . . . . :   SMADTA            
                      Member . . . . . :   LSAMSGF00           Record . . . . . :   1
   Control  . . . . .   [          ]{style="text-decoration: underline;"}          Column . . . . . :   1    Find . . . . . . .   [                                         ]{style="text-decoration: underline;"}
                                           \*\...+\....1\....+..
                                               CPC1217JOBNOK
                                               CPC1218JOBNOK
                                               CPC1219JOBNOK
                                               CPC1220JOBNOK
                                               CPC1224JOBNOK
                                               CPC1225JOBNOK
                                               CPC1226JOBNOK
                                               CPC1232JOBNOK
                                               CPC1234JOBNOK
                                               CPC1235JOBNOK
                                               CPF1240JOBNOK
                                                CPF1241JOBOK
                                                CPI2404MSGW
                                                 \*\*\*\*\*\* END OF DATA \*\*\*\*\*\*
                                                      
                                                      
                                                   Bottom
                        F3=Exit   F12=Cancel   F19=Left   F20=Right   F24=More keys
  --------------------------------------------------------------------------------------------------------

In the table illustration above, notice that many message IDs, such as
CPC1217, are followed by the characters JOBNOK. This symbol means \"job
not OK\" and it indicates a message ID that signals an IBM i job
failure. In contrast, the message ID CPF1241 shows JOBOK and indicates a
normally complete IBM i job.

 

The message ID CPI2404 is a special case: If a job is in Message Waiting
status (MSGW), this will be detected by the LSAM transaction manager
server job, where a sub-procedure calls an IBM i API (application
program interface) to fetch the actual status of a job, which would be
MSGW in this case. But this message ID appears in this table to indicate
that it also is a reserved message ID that is not eligible for LSAM
Message Management handling.

## Message Management Logs

### Message Management Activity Log

#### Log Choice Menu

When the Message Management Logs function is selected from the menu, an
initial screen offers a choice between two different types of log file.
The activity log appears in the following examples, but the OpCon/xps
job-level message management log uses the same list and detail display
formats.

 

The OpCon/xps job-level message management log shows the information
that was sent by SAM-SS and saved by the LSAM when the job start request
was received. This information is used to format job-specific responses
that also appear in the activity log (as entry type OpConJob) if the
message is actually encountered.

-   **Screen Title**: Message Management Logs
-   **Screen ID**: LSALOGR10-0

###### Menu Pathways

Main Menu \> Message management menu (\#2) \> Message management logs
(\#2)

###### Fields

  Field              Default  Description
  ----------------- --------- ----------------------------------------------------------------------------------
  Selection entry             Type a number from the list of options and press \<**Enter**\> to view that log.

  :  

###### Functions

-   **F3=Exit**: Quits the managed messages list and returns to the
    menu.
-   **F12=Cancel**: Quits the tracked jobs list and returns to the menu.

###### Options

-   1 = Display message management activity log (LSALOGF10)
-   2 = Display OpCon/xps job-level message management log (TRPMSGF20)

#### Message Management Activity Log List

-   **Screen Title**: Message Management Activity Log
-   **Screen ID**: LSALOGR10-1

###### Menu Pathways

-   Main Menu \> Message management menu (\#2) \> Message management
    logs (\#2) \> 1 (or 2)
-   The list and the details display the same for either of the Message
    Management log options, with the exception of the Reply Type column
    on the list that will show the actual Reply... when the OpCon/xps
    job-level message management log is listed.

###### Fields

+------------------+------------------------+------------------------+
| Field            | Default                | Description            |
+==================+:======================:+========================+
| Search content   |                        | To quickly search for  |
|                  |                        | a particular log       |
|                  |                        | entry, enter up to 10  |
|                  |                        | characters of any log  |
|                  |                        | content value and      |
|                  |                        | press \<**Enter**\>.   |
|                  |                        | Any value that appears |
|                  |                        | on the log detail      |
|                  |                        | display may be         |
|                  |                        | searched for, even     |
|                  |                        | though not all values  |
|                  |                        | appear in the list     |
|                  |                        | display.               |
+------------------+------------------------+------------------------+
| Opt              | None                   | \<**Tab**\> to a row   |
|                  |                        | in the table and enter |
|                  |                        | an option.             |
+------------------+------------------------+------------------------+
| IBM i Job Name   | IBM i Name Rules       | The name portion of an |
|                  | (Refer to [IBM i Name  | IBM i job. The IBM i   | |                  | Rules](Configura       | full job names (per    |
|                  | tion.md#IBM2){.MCXref | instance of a job)     |
|                  | .xref})                | include the name, the  |
|                  |                        | submitting user name,  |
|                  |                        | and a unique job       |
|                  |                        | number. The name       |
|                  |                        | portion is common to   |
|                  |                        | as many instances of   |
|                  |                        | the same job           |
|                  |                        | definition as may be   |
|                  |                        | executed. The IBM i    |
|                  |                        | permits more than one  |
|                  |                        | instance of the same   |
|                  |                        | job name to be         |
|                  |                        | executed concurrently. |
+------------------+------------------------+------------------------+
| IBM i Job Number |                        | The IBM i job number.  |
|                  |                        | The job number         |
|                  |                        | identifies unique jobs |
|                  |                        | using the same name on |
|                  |                        | the list display.      |
+------------------+------------------------+------------------------+
| SAM Job Name     |                        | The name portion of    |
|                  |                        | the full job           |
|                  |                        | identifier assigned by |
|                  |                        | OpCon/xps. (Alternates |
|                  |                        | with IBM i Job name)   |
+------------------+------------------------+------------------------+
| SAM Job Number   |                        | The numeric ID portion |
|                  |                        | of the full job        |
|                  |                        | identifier assigned by |
|                  |                        | OpCon/xps. (Alternates |
|                  |                        | with IBM i)            |
+------------------+------------------------+------------------------+
| Date/Time        |                        | The time stamp when    |
|                  |                        | the message was logged |
+------------------+------------------------+------------------------+
| Msg ID           |                        | An IBM i message       |
|                  |                        | identifier (comprised  |
|                  |                        | of 3 letters followed  |
|                  |                        | by 4 digits).          |
|                  |                        | Definitions for        |
|                  |                        | message IDs may        |
|                  |                        | normally be found in   |
|                  |                        | message files stored   |
|                  |                        | in the DB2/400         |
|                  |                        | database.              |
+------------------+------------------------+------------------------+
| Resp             |                        | Response Type:         |
|                  |                        |                        |
|                  |                        | -   R = Reply to       |
|                  |                        |     message            |
|                  |                        | -   E = Event, sent to |
|                  |                        |     OpCon/xps          |
|                  |                        | -   B = Both a reply   |
|                  |                        |     and an event       |
+------------------+------------------------+------------------------+
| Reply Type       | Appears only for the   | The type of log entry: |
|                  | Activity Log.          |                        |
|                  |                        | -   LSAMtrap = a       |
|                  |                        |     message trap       |
|                  |                        |     defined by the     |
|                  |                        |     LSAM\'s on message |
|                  |                        |     management table.  |
|                  |                        | -   OpConJob = a       |
|                  |                        |     job-specific       |
|                  |                        |     message trap       |
|                  |                        |     defined for the    |
|                  |                        |     one job under the  |
|                  |                        |     OpCon/xps EM job   |
|                  |                        |     master record.     |
|                  |                        | -   Error = shown in   |
|                  |                        |     Red, the Message   |
|                  |                        |     Management         |
|                  |                        |     facility attempts  |
|                  |                        |     to log errors in   |
|                  |                        |     Reply or Event     |
|                  |                        |     execution. Use     |
|                  |                        |     option 5=display   |
|                  |                        |     to see details     |
|                  |                        |     about the error    |
|                  |                        |     entry.             |
|                  |                        | -   InfoText = show in |
|                  |                        |     Blue, the Message  |
|                  |                        |     Management         |
|                  |                        |     facility adds log  |
|                  |                        |     entries for        |
|                  |                        |     actions that may   |
|                  |                        |     be subject to      |
|                  |                        |     audit, such as the |
|                  |                        |     replacement of any |
|                  |                        |     Dynamic Variable   |
|                  |                        |     that was included  |
|                  |                        |     in a message Event |
|                  |                        |     command.           |
+------------------+------------------------+------------------------+
| Reply...         | Appears only for the   | Shows either the       |
|                  | OpCon/xps job-level    | 6-character reply      |
|                  | management log         | value, or the first    |
|                  |                        | portion of the Event   |
|                  |                        | command string,        |
|                  |                        | depending on the       |
|                  |                        | response type (Rsp).   |
+------------------+------------------------+------------------------+

:  

###### Functions

-   **F3=Exit**: Quits the managed messages list and returns to the
    menu.
-   **F5=Refresh**: Retrieves the latest managed message log information
    and updates the display.
-   **F9=SAM job/IBM i job**: Changes the headings and the content of
    the job name and job number columns. This feature can be useful when
    searching for a job. When the current sort order is Sort name, that
    sort will apply to whichever type of job name is currently displayed
    on the list.
-   **F11=Sort date/Sort name**: Changes the sorted order of the list
    display. The column heading of the current sort order is displayed
    in pink color and the function key name changes each time
    \<**F11**\> is pressed.
-   **F12=Cancel**: Quits the tracked jobs list and returns to the menu.
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
    is the equivalent of the first record in the file. The sort order
    controls which records are listed first.
-   **F18=Bottom**: Causes the display to jump to the last entry in the
    list. This is the equivalent of the last record in the log file. The
    sort order controls which records are listed last. This function key
    is very helpful when the file is big.
-   **F24=More keys**: Toggles the function key legend between the two
    different lists of function keys that are available for this
    display.

###### Options

5 = Display detail

##### Message Management Activity Log Detail

This detail display appears the same for the OpCon job-level management
log, although the content of the fields will vary.

-   **Screen Title**: Message Management Activity Log Detail
-   **Screen ID**: LSALOGR10-2

###### Fields

+----------------------------+----------------------------------------+
| Field                      | Description                            |
+============================+========================================+
| Log timestamp              | The time stamp when the message was    |
|                            | logged, that is, when the LSAM         |
|                            | responded to the message.              |
+----------------------------+----------------------------------------+
| Log key                    | An internal record ID number assigned  |
|                            | by the IBM i DB2 database manager.     |
+----------------------------+----------------------------------------+
| IBM i job ID               | The full name of the IBM i job that    |
|                            | issued the message.                    |
+----------------------------+----------------------------------------+
| SAM job number             | The numeric ID portion of the job      |
|                            | identifier assigned by OpCon/xps.      |
+----------------------------+----------------------------------------+
| SAM job name               | The name portion of the job identifier |
|                            | assigned by OpCon/xps.                 |
+----------------------------+----------------------------------------+
| Msg Mgmt Rec key \#        | The internal record ID of the original |
|                            | Message Management Parameter record    |
|                            | that was being processed when this log |
|                            | entry was generated. This number can   |
|                            | be found in the list of the Message    |
|                            | Management Parameter records in order  |
|                            | to perform research into the master    |
|                            | records that defined processing of the |
|                            | message.                               |
+----------------------------+----------------------------------------+
| Message ID                 | An IBM i message identifier (comprised |
|                            | of 3 letters followed by 4 digits).    |
|                            | Definitions for message IDs may        |
|                            | normally be found in message files     |
|                            | stored in the dB2/400 database.        |
+----------------------------+----------------------------------------+
| Message File               | The IBM i object that stores message   |
|                            | definitions and text. A message ID may |
|                            | be qualified by the message file from  |
|                            | which its definition was taken.        |
+----------------------------+----------------------------------------+
| Message Severity           | A message must report this severity or |
|                            | higher in order for the LSAM to decide |
|                            | to respond to the message. A value of  |
|                            | zeros means that message severity is   |
|                            | not considered.                        |
+----------------------------+----------------------------------------+
| Message queue              | A system object that stores messages   |
|                            | (text included) that have been         |
|                            | delivered by various jobs. The message |
|                            | queue where this job\'s message ID was |
|                            | found.                                 |
+----------------------------+----------------------------------------+
| Message queue library      | The DB2/400 library where the message  |
|                            | queue was located.                     |
+----------------------------+----------------------------------------+
| Key group Sequence \#      | A user-supplied sequence number that   |
|                            | separates Message Management Parameter |
|                            | records that all use the same filter   |
|                            | key field values. Multiple records in  |
|                            | a single group will define a more      |
|                            | complex response to a message than may |
|                            | be possible with a single Parameters   |
|                            | record. For example, Sequence 10 might |
|                            | be linked to Capture Data Response     |
|                            | Rules that prepare one or more Dynamic |
|                            | Variables, which can then be used in a |
|                            | Sequence 20 Parameter record to define |
|                            | the Reply to a message or the Event    |
|                            | that will be executed.                 |
+----------------------------+----------------------------------------+
| Compare Text               | A text string that was compared to the |
|                            | selected portion of the message text.  |
|                            | This text is used to qualify which     |
|                            | messages will be handed by the message |
|                            | manager, using the comparison method   |
|                            | shown in the Type field.               |
+----------------------------+----------------------------------------+
| Compare Type               | The Boolean operator used to match the |
|                            | Compare Text with the selected portion |
|                            | of the message text. EQ (equal) can    |
|                            | match any portion of the selected      |
|                            | message text, unless the Start         |
|                            | Position is not zero.                  |
+----------------------------+----------------------------------------+
| Compare Position           | The compare text value specified above |
|                            | must appear at the specific location   |
|                            | within the primary message text in     |
|                            | order for the LSAM to decide to        |
|                            | respond to the message. A value of     |
|                            | zeros for an EQ comparison means that  |
|                            | the variable string may appear         |
|                            | anywhere in the message text.          |
+----------------------------+----------------------------------------+
| Compare Len                | The length of the strings from the     |
|                            | Compare Text and the message text that |
|                            | will be compared. When this value is   |
|                            | zero, the last non-blank character in  |
|                            | the Compare Text determines the length |
|                            | of the comparison. When the length is  |
|                            | longer than the Compare Text, the      |
|                            | Compare Text will be padded with       |
|                            | trailing blanks that must also match   |
|                            | the selected portion of the message    |
|                            | text.                                  |
+----------------------------+----------------------------------------+
| Pri/Sec/Both Text          | Specifies which portion of the message |
|                            | text will be evaluated:                |
|                            |                                        |
|                            | -   Pri = primary message text (the    |
|                            |     part that first appears in a       |
|                            |     message queue list).               |
|                            | -   Sec = secondary message text, also |
|                            |     referred to as the help text for a |
|                            |     message.                           |
|                            | -   Both = the primary text is         |
|                            |     followed by one blank, and then    |
|                            |     the secondary text is appended to  |
|                            |     it in a message text buffer used   |
|                            |     by the LSAM Message Management     |
|                            |     server program for comparison to   |
|                            |     the Compare Text. (The actual      |
|                            |     message text buffer is recorded in |
|                            |     the next field of this log record  |
|                            |     display.)                          |
+----------------------------+----------------------------------------+
| Message text buffer        | -   The actual message text that was   |
|                            |     evaluated by the Compare rules.    |
|                            |     This buffer is an important record |
|                            |     of exactly how the message text    |
|                            |     appears within the Message         |
|                            |     Management program when the        |
|                            |     primary and secondary text are     |
|                            |     appended together by the Both      |
|                            |     option (according to the           |
|                            |     Pri/Sec/Both Text field).          |
|                            | -   If the plus sign (+) shows, the    |
|                            |     text buffer content is longer than |
|                            |     will fit on this display. In that  |
|                            |     case, use the \<**F8**\> function  |
|                            |     key to see more message text.      |
+----------------------------+----------------------------------------+
| Capture ID                 | Shows the Capture Application ID, if   |
|                            | this Parameter record was linked to a  |
|                            | shared Capture Data application (and,  |
|                            | via that link, also to any Response    |
|                            | Rules).                                |
+----------------------------+----------------------------------------+
| Answer type                | -   R = Reply to message               |
|                            | -   E = Event, sent to OpCon/xps       |
|                            | -   N = None                           |
|                            | -   (There will be no log entry for    |
|                            |     Both)                              |
+----------------------------+----------------------------------------+
| End?                       | -   The End Job option: Specified only |
|                            |     by job-level message responses     |
|                            |     defined in the OpCon EM job        |
|                            |     master, this option can force a    |
|                            |     job to end even if the response to |
|                            |     the error message would normally   |
|                            |     allow the job to continue. (This   |
|                            |     option is not supported by the     |
|                            |     LSAM general message management    |
|                            |     table.)                            |
|                            | -   Y = yes, end the job when this     |
|                            |     message qualifies for a response.  |
|                            | -   N = no, allow the job to continue  |
|                            |     (unless the message was an error   |
|                            |     that prevents the job from         |
|                            |     completing).                       |
+----------------------------+----------------------------------------+
| Message reply              | The value supplied by the LSAM message |
|                            | manager to answer a message requiring  |
|                            | a reply, if the Answer Type was R or   |
|                            | B.                                     |
+----------------------------+----------------------------------------+
| Threshold Limit            | The number of times this message must  |
|                            | be processed, within the duration      |
|                            | time, before this Parameter record is  |
|                            | qualified for action.                  |
+----------------------------+----------------------------------------+
| Threshold Duration         | The time in Days, Hours and Minutes    |
|                            | since the most recent incidence count  |
|                            | change, during which the count of      |
|                            | activity is still valid. If a new      |
|                            | incident is encountered after a longer |
|                            | time than this duration, the count of  |
|                            | activity is started over at 1.         |
+----------------------------+----------------------------------------+
| Threshold DynVar           | The name of the numeric LSAM Dynamic   |
|                            | Variable that holds the count of       |
|                            | activity for this Message Management   |
|                            | Parameter record. The count in this    |
|                            | variable will be reset to 1 if the     |
|                            | duration is exceeded, or when it       |
|                            | matches the Limit value.               |
+----------------------------+----------------------------------------+
| Threshold                  | The current count value that is being  |
|                            | stored in the Dynamic Variable.        |
| DynVar Count               |                                        |
+----------------------------+----------------------------------------+
| Threshold duration Control | -   M = use the Message Management     |
|                            |     timestamp compared to the current  |
|                            |     processing time to determine if    |
|                            |     the Threshold count is stale.      |
|                            | -   V = use the Dynamic Variable       |
|                            |     timestamp of last update compared  |
|                            |     to the current processing time to  |
|                            |     determine if the Threshold count   |
|                            |     is stale.                          |
+----------------------------+----------------------------------------+
| M: (timestamp)             | The Message Management server          |
|                            | timestamp as of the last previous      |
|                            | incidence of this message. This value  |
|                            | is used to determine whether the count |
|                            | is stale, according to the Duration,   |
|                            | when the Threshold Control value is    |
|                            | set to \"M\".                          |
+----------------------------+----------------------------------------+
| V: (timestamp)             | The Dynamic Variable module\'s         |
|                            | timestamp as of the last previous      |
|                            | activity that changed the Variable     |
|                            | being used to hold this message\'s     |
|                            | incidence count. This value is used to |
|                            | determine whether the count is stale,  |
|                            | according to the Duration, when the    |
|                            | Threshold Control value is set to      |
|                            | \"V\".                                 |
+----------------------------+----------------------------------------+
| Event command text,        | -   Event command text = The actual    |
|                            |     text of the IBM i command or OpCon |
| other log entry            |     Event that was generated by the    |
|                            |     LSAM Message Manager, if the       |
|                            |     Answer Type was E or B.            |
|                            | -   Error information = label shown in |
|                            |     red, when the text field is a      |
|                            |     record of an error message that    |
|                            |     was intercepted by the LSAM        |
|                            |     Message Manager.                   |
|                            | -   Log entry text = label shown in    |
|                            |     blue, when the text field contains |
|                            |     any general log entry, such as a   |
|                            |     record of how a Dynamic Variable   |
|                            |     token was replaced and what real   |
|                            |     value was used.                    |
|                            | -   If the plus sign (+) shows, the    |
|                            |     command is longer than will fit on |
|                            |     this display. In that case, use    |
|                            |     the \<**PageDown**\> key to see    |
|                            |     the full command line.             |
+----------------------------+----------------------------------------+

:  

###### Functions

-   **F3=Exit**: Quits the message management log details display and
    returns to the menu.
-   **F8=More msg**: When a plus sign(+) shows there is more text in the
    message buffer, this key causes a branch to a different display
    where the whole message text buffer may be viewed.
-   **F10=Captured Data**: If a Capture Application ID was associated
    with the original Message Management Parameter record, then this
    function key branches to the Captured Data Log list viewer program.
    From there it is also possible to link to the Response Rules debug
    log file list view, related to this same message.
-   **F12=Cancel**: Quits the message management log details display and
    returns to the list of managed messages.
-   **PageDown**: If a plus sign(+) shows at the end of the Event CMD
    line, use this key to branch to a view of the entire command string.

### Display Captured Message Data Log

-   **Screen Title**: Display Captured Data Log
-   **Screen ID**: OPRL40R1

###### Menu Pathways

-   Main Menu \> Message management menu (\#2) \> Display Captured
    Message Data Log (\# 8)
-   The list and the details display the same here as documented for
    this function in Events and Utilities. The only difference between
    SCANSPLF captured data and Message captured data (here) is found on
    the Details viewed when using option **5=Display**. This difference
    is documented next.

#### Display Captured Data Log Detail

This detail display appears identical to the same display documented in
Events and Utilities, except that some fields in the top rows of the
display have different labels because they apply to Message Data. The
screen example below is followed by a partial Fields table that
identifies the unique labels. Other information about this details
display may be found in Events and Utilities Menu.

###### Menu Pathways

Main Menu \> Message management menu (\#2) \> Display Captured Message
Data Log (\# 8) \> 5=Display

Display Captured Data Log Detail

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  [ OPRL40R5]{style="color: #008000;"}               Display Captured Data Log Detail              [00/00/00]{style="color: #008000;"}   [ USERNAME           Log record RRN:]{style="color: #008000;"}       [5]{style="color: #ff00ff;"}   [Type:]{style="color: #008000;"} [M]{style="color: #ff00ff;"}                 [00:00:00]{style="color: #008000;"}
                                                             [MmRecKey:]{style="color: #008000;"} [      1]{style="color: #ffcc00;text-decoration: underline;"}   [ Capture ID:]{style="color: #008000;"} [MSGCAP01                      ]{style="color: #ffcc00;text-decoration: underline;"}  [Seq:]{style="color: #008000;"} [010]{style="color: #ffcc00;text-decoration: underline;"}     [Msg Queue:]{style="color: #008000;"} [QUSER     ]{style="color: #ffcc00;text-decoration: underline;"}
  [ Start:]{style="color: #008000;"} [    1]{style="color: #ffcc00;text-decoration: underline;"}  [TrpMsg \#:]{style="color: #008000;"} [ 10]{style="color: #ffcc00;text-decoration: underline;"}[            Length:]{style="color: #008000;"} [0012]{style="color: #ffcc00;text-decoration: underline;"}     [Message ID:]{style="color: #008000;"} [CPA2401]{style="color: #ffcc00;text-decoration: underline;"}   [ Capture Job ID:]{style="color: #008000;"} [123456/USERNAME/DEVICE      ]{style="color: #ffcc00;text-decoration: underline;"}              [MSGQ Lib:]{style="color: #008000;"} [QUSRSYS   ]{style="color: #ffcc00;text-decoration: underline;"}
  [ Date:]{style="color: #008000;"} [20100224]{style="color: #ffcc00;text-decoration: underline;"}  [Time stamp:]{style="color: #008000;"} [2010-02-24-15.23.57.816000]{style="color: #00ffff;text-decoration: underline;"}        [MSGF:]{style="color: #008000;"} [\*ALL      ]{style="color: #ffcc00;text-decoration: underline;"}   [ Rows 1-12:]{style="color: #ff00ff;"}          [                                       Numeric:]{style="color: #008000;"} [N]{style="color: #ffcc00;text-decoration: underline;"}
   2..5\...10\....5\...20\....5\...30\....5\...40\....5\...50\....5\...60\....5\...70\....5\...8
  Message data                                                                    
                                                                                  
                                                                                  
                                                                                  
                                                                                  
                                                                                  
                                                                                  
                                                                                  
                                                                                  
                                                                                  
                                                                                  
                                                                                  
   
   PAGEDOWN/UP   F3=Exit   F5=Refresh   F9=WRKJOB   F12=Cancel
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

###### Fields

+----------------+----------------------------------------------------+
| Field          | Description                                        |
+================+====================================================+
| Log record RRN | This is the relative record number from physical   |
|                | file OPRLOGF40.                                    |
+----------------+----------------------------------------------------+
| Type           | -   C = Operator Replay screen data capture.       |
|                | -   S = SCANSPLF report spool file scanning.       |
|                | -   M = Message data capture.                      |
+----------------+----------------------------------------------------+
| MmRecKey       | This is the unique identifier number for the       |
|                | Message Management Parameters record that was      |
|                | linked to the capture Application ID. This number  |
|                | makes it easier to identify the Parameters record, |
|                | rather than having to gather the 7 data fields     |
|                | that comprise the logical key of the record.       |
+----------------+----------------------------------------------------+
| Capture ID:    | The identifier assigned to a group of data capture |
|                | rules. For Captured Message Data, this is the      |
|                | Application ID.                                    |
+----------------+----------------------------------------------------+
| (Capture) Seq: | The sequence number assigned to the data capture   |
|                | definition, representing the order of capture      |
|                | within the Capture ID.                             |
+----------------+----------------------------------------------------+
| Start          | This documents the starting position in the        |
|                | message text buffer where the captured data was    |
|                | found.                                             |
+----------------+----------------------------------------------------+
| TrpMsg\#       | \"Trapped Message number\" = this is the sequence  |
|                | number assigned to the Message Management          |
|                | Parameters record which pointed to the capture     |
|                | Application ID. This number combines with the      |
|                | Message ID, Job Name and other fields to complete  |
|                | a logical key identifying the Parameters record.   |
+----------------+----------------------------------------------------+
| Length         | The length of data that was captured, starting at  |
|                | the Row and Col specified. For Operator Replay     |
|                | screen data, up to 1920 characters of displayable  |
|                | data may be captured by a single capture rule.     |
|                | (For display formats larger than 24 X 80, more     |
|                | than one screen capture rule would be required to  |
|                | capture more than 1920 characters of data. For the |
|                | SCANSPLF command, the capture length is normally   |
|                | limited to 132 characters, or one print line of    |
|                | data.)                                             |
+----------------+----------------------------------------------------+
| Msg Queue      | The message queue where the trapped message was    |
|                | found by the LSAM Message Management server job.   |
+----------------+----------------------------------------------------+
| Message ID     | This is the IBM i ID of the message that was       |
|                | trapped by the Message Management Parameters       |
|                | record linked to the Application ID that performed |
|                | this message data capture.                         |
+----------------+----------------------------------------------------+
| MSGQ Lib       | The library location of the Message Queue named    |
|                | above.                                             |
+----------------+----------------------------------------------------+
| MSGF           | The name of the IBM i Message File that contains   |
|                | the definition of the Message ID that was trapped. |
+----------------+----------------------------------------------------+
|                | **Note:** The remaining fields on this display are |
|                | the same as documented for the SCANSPLF utility in |
|                | [Events and Utilities                              | |                | Menu                                               |
|                | ](Events-and-Utilities-Menu.md#top){.MCXref |
|                | .xref}.                                            |
+----------------+----------------------------------------------------+

:  

### Display Data Capture Debug Log (Response Rules Log)

The Display Data Capture Debug Log function is identical to the
description provided in Events and Utilities, except that these log
entries are related only to Message Data Capture Definitions instead of
to SCANSPLF data capture. Please refer to Events and Utilities Menu to
see the screen documentation for the Data Capture Debug log and an
explanation of the log entries. The Data Capture Debug Log display is
also documented in Operator Replay Scripts, but again, those log entries
would be only for captured screen data.

###### Menu Pathways

Main Menu \> Message Management menu (\#2) \> Display Capture Debug Log
(\# 9)
:::

 


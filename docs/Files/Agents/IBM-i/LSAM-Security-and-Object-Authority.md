---
lang: en-us
title: LSAM Security and Object Authority
viewport: width=device-width, initial-scale=1.0
---

# LSAM Security and Object Authority

[]{#aanchor21} The information contained in this topic is important for administrators of the IBM i LSAM software product and its server
functions as an agent to OpCon/xps.

 

Some of the information in this topic is critical for IBM i LSAM user
sites that have implemented very high security restrictions in IBM i. In
particular, the contents of this topic must be understood if the site
intends to restrict the LSAM server user profile, SMANET, so that it
does not operate with its default \*ALLOBJ (all object) authority.

 

This topic also highlights some of the IBM i LSAM features that could
potentially be made vulnerable to security breaches. It explains the
vulnerabilities and discusses possible strategies for protecting IBM i
when these features are used.

 

Access to maintenance of LSAM object authority, should that be required,
is available from the LSAM menu 9. PTF and Security Menu. This menu is
explained in [LSAM Software Maintenance (PTFs)](LSAM-Software-Maintenance-(PTFs).md#top),
but the function to Work with object authority is explained in this
topic.

## LSAM Security Strategy

As a result of the default installation procedure, the IBM i LSAM server
user profile SMANET is created with \*ALLOBJ authority. This authority
makes it possible for the LSAM servers to accomplish any of their
assigned tasks without requiring that the IBM i environment security or
object authority be changed in any way. This broad authority makes it
easy for SMA staff to accomplish full demonstrations of the product, and
then quickly uninstall the demo product, with very little effort and no
impact on the client\'s environment. It also makes it easier for new
clients to explore the LSAM capabilities until they can be well
understood. After the initial installation and testing is accomplished,
a client site may wish to undertake the complex task of limiting the
authority of the SMANET user profile.

 

The IBM i LSAM software and its supporting database are installed with
the \*PUBLIC user restricted (generally, excluded). Other than the
SMANET server user profile, only the Restricted Mode user profile SMASAV
and the system operator user profile QSYSOPR have been granted certain
specific authorities to the LSAM programs and database. This severe
restriction of the LSAM software was implemented in order to accommodate
SMA clients who have very strict security environments.

 

The restriction of access to the LSAM operations does not necessarily
impede the function of the LSAM. Once the LSAM server jobs have been
started, the LSAM\'s user profile SMANET is still able to process job
start requests from OpCon/xps. Details about the authorities required to
run jobs for OpCon/xps are provided in this topic and in the IBM i LSAM
Installation instructions, under Install the LSAM, steps 23 -- 26. These
steps provide important information that must be read and understood.
Please contact SMA Support with any questions about the installation
steps.

 

  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [Technical support personnel might need to know that certain LSAM programs were created to run with the program owner\'s authority, rather than the program user\'s authority. This permits the LSAM server programs to complete some required internal maintenance as jobs are executed, without allowing unauthorized users access to the LSAM database files.]
  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

The LSAM programs and database files are secured using IBM i object
authority at the object level. The LSAM software libraries (SMAGPL,
SMADTA, SMAPGM and SMAPTF) are distributed with the \*PUBLIC user
granted \*USE authority (which includes \*EXECUTE authority). However,
almost all of the individual program and file objects are set to
\*EXCLUDE the \*PUBLIC user.

 

It is theoretically possible to implement different user profiles that
would be authorized to, or restricted from LSAM operations and
configurations functions. The detailed analysis of the LSAM software
required to implement this strategy can be performed using the tables of
object authorities described later in this topic. An IBM i security
officer could grant or revoke authority to each LSAM function in order
to develop different Group or individual user profiles that would be
restricted from some LSAM functions but authorized to others.

### The LSAM Server User Profile: SMANET

The IBM i LSAM default installation creates a user profile named SMANET
that is used to execute the LSAM server jobs. The default installation
assigns \*ALLOBJ authority to user SMANET because this makes it easy to
install and demonstrate the LSAM software. This strategy of assigning
broad authority to user SMANET also makes it easy to install and use the
LSAM as part of an OpCon/xps network inside of a contained and secure
computing environment that is already protected from intrusion or attack
by means outside of IBM i. The default installation values would be
appropriate in an environment where it is sufficient to protect the
system by careful management of user profile passwords.

 

If the IBM i LSAM installation site does not require exceptionally high
security, a great deal of administrative work can be saved and the
correct operation of the LSAM server programs can best be assured by
accepting the default installation values and allowing the LSAM server
user profile SMANET to use \*ALLOBJ authority. The following discussion
may help to understand why this could be considered a safe strategy for
many sites.

 

User profile SMANET does not have a password, so it is not possible for
an IBM i user to log on as SMANET. No other user is allowed to use the
SMANET user profile, except that the system operator (QSYSOPR) is
provided with indirect authority sufficient to start and stop the LSAM
server jobs. In many environments, this restriction makes it safe for
SMANET to operate with \*ALLOBJ authority, as long as the OpCon/xps
security administrator does not configure SMANET as a user profile with
an ability to submit jobs from an OpCon/xps schedule. User SMANET
requires extensive authority in order to enable the LSAM to perform any
function of the IBM i operating system and also operate any third-party
software that would typically be executed by an OpCon/xps schedule.

 

Additional information about user profile SMANET is provided in the
following sections of this topic. This information may prove helpful if
it is necessary to apply high security restrictions to the LSAM software
and its user profiles.

## LSAM Work Management Authority

This discussion assumes the reader is familiar with the other
information provided in the **IBM i LSAM** online help and with the
principles of IBM i Work Management. The description of work management
authority in this section includes a combination of principles of both
the IBM i LSAM and the IBM i operating system itself. Some of the other
sections of this topic may also prove helpful in understanding this
discussion of LSAM work management.

 

An introduction to the authority assigned to SMANET is provided in the
previous section of this topic. This section is focused on the work flow
path that is followed as a job request defined in the OpCon/xps job
master file is submitted for execution under IBM i. The minimal
authorities required in order for the LSAM server programs to
successfully manage jobs as user SMANET are listed below.

 

If a high security environment requires that user SMANET not be allowed
to have \*ALLOBJ authority, the IBM i LSAM Installation Instructions
warn that the site administrator must develop an authority matrix that
will enable user SMANET to accomplish its assigned tasks. The following
list of authorities required by SMANET and the LSAM Submit Job flow
chart below may help to identify and manage the authorities required to
successfully submit jobs.

### Authorities Required by SMANET

Here is a summary of the minimal authorities required for the user
profile SMANET to manage jobs and complete other LSAM server functions.
This list of authorities includes information adapted from IBM\'s IBM i
documentation about the SBMJOB command.

-   \*CHANGE authority to the LSAM environment libraries (default names
    are: SMAGPL, SMADTA, SMAPTF and SMAPGM) and to their contents. The
    LSAM software is installed with user SMANET as the owner of the LSAM
    libraries and all the contents of those libraries. Therefore,
    \*CHANGE authority is assumed.
-   \*USE authority to IBM i libraries QSYS (the IBM i system library,
    where \*PUBLIC normally has \*USE authority by definition) and QGPL.
-   \*USE authority to most of the IBM i commands. (Confidential
    documentation about the IBM i commands used by LSAM software is
    available to SMA technical support staff.)
-   \*USE authority to libraries of third-party software, and their
    contents, that may include objects used for submitting jobs.
-   \*USE authority to every user profile that will be named in a
    submitted job.
-   \*USE authority to the commands specified in the Prerun and Call
    data entry boxes of the Call Information tab of each IBM i job
    master record in the OpCon/xps Enterprise Manager.
-   \*USE authority to every job description that will be named in a
    submitted job.
-   \*USE authority to every job queue where submitted jobs will be
    placed.
-   \*USE authority to every subsystem description that will run
    submitted jobs.
-   \*USE and \*ADD authority to the message queue specified on the
    Message queue (MSGQ) parameter of the submitted job (which, for the
    IBM i LSAM, will be the SMAMSGQ located in the SMADTA (or
    equivalent) library), and \*EXECUTE authority to the library that
    contains the message queue (which, for the IBM i LSAM, will be the
    SMADTA library or its equivalent in an alternate LSAM environment).
-   \*JOBCTL special authority.
    -   The IBM i LSAM job scheduler server program puts jobs on hold
        briefly as it performs certain administration tasks, and then it
        uses the RLSJOB command. It may also need to perform the CHGJOB
        and CHGACCCDE commands before releasing a submitted job.
-   \*SPLCTL special authority (or an equivalent authority to the
    QPJOBLOG spool file and output queue where job logs will be stored).
    -   Spool control special authority, or the equivalent specific
        authorities, is required for the LSAM server programs to manage
        the job log spool files resulting from jobs it submits. This is
        required to support the OpCon/xps View Job Output (JORS)
        function.
    -   Spool control special authority, or the equivalent specific
        authorities, is required when any job is accompanied by spool
        file management options that are available on the OpCon/xps
        Enterprise Manager definition of IBM i job master records.
    -   Refer to IBM documentation about IBM i for more information on
        the specific authorities that may be used in place of the
        \*SPLCTL special authority, if this special authority must be
        restricted.

### IBM i LSAM Server Submit Jobs

The following flow chart shows how job definition information is
communicated to the LSAM server programs. This figure is explained on
the following pages.

LSAM Submit Job Flow

![LSAM Submit Job Flow](../../../Resources/Images/IBM-i/LSAM-Submit-Job-Flow.png "LSAM Submit Job Flow")

### Diagnosis of LSAM Job Submission

If user SMANET does not have \*ALLOBJ authority, it is likely that
problems could arise in the process used by the LSAM software to submit
jobs, until the client site administrator has successfully tested and
debugged the object authority matrix used to manage SMANET authorities.

 

Here is a list of the resources that can be used to identify errors that
might occur in the LSAM job submission process. This list is based on
the flow chart LSAM Submit Job Flow.

-   The LSAM server jobs should be set to perform verbose job logging.
    This can be accomplished by changing the LOG parameter of the job
    description SMADTA/SMALSAJ00. Set the LOG parameter to the values (4
    00 \*SECLVL). Active server jobs can each be changed while they are
    active, or the LSAM server subsystem can be ended from the LSAM menu
    system, and then restarted after the LSAM server job description has
    been changed.
    -   The LOG parameter values can be reset for quieter logging after
        it is clear that the OpCon/xps schedules are all performing
        normally. Reducing server job logging helps improve performance
        and also reduces consumption of disk space.
-   The job log of the LSAM server job TXMMNG will normally show details
    about errors that occur as it executes the IBM i SBMJOB command.
    This job can be quickly found by executing option 3: Check LSAM
    Subsystem Status, from the LSAM menu 6: LSAM Management Menu. The
    following display will appear. This example shows option 5 typed
    next to job TXMMNG. From the IBM i Work with Job menu, use option 10
    to view the job log. It may be necessary to press function key F10
    to show all job log details, and function key F16 moves the log view
    quickly to the most recent entries at the bottom of the job log.

Work with Active Jobs Screen

  ----------------------------------------------------------------------------------------------------------------------------------------------------------
                                Work with Active Jobs                    [SYSTEMNAME]{style="color: #008000;"}                                                                00/00/00  03:45:13
  CPU %:      .0     Elapsed time:   00:00:00     Active jobs:   143
   
  Type options, press Enter.
    2=Change   3=Hold   4=End   5=Work with   6=Release   7=Display message
    8=Work with spooled files   13=Disconnect \...
   
  Opt  Subsystem/Job  User        Type  CPU %  Function        Status
  \_\_   SMASBS         QSYS        SBS      .0                   DEQW
  \_\_     JORCMN       SMANET      BCH      .7  PGM-JORCMNR00    SELW
  \_\_     LSAJOR       SMANET      BCH      .4  PGM-LSAJORR00    DEQA
  \_\_     LSAMNG       SMANET      BCH      .5  PGM-DLTLOGR00    DEQA
  \_\_     MSGMNG       SMANET      BCH      .4  PGM-LSARCMR00    DEQA
  \_\_     SKTCMN       SMANET      BCH      .8  PGM-CMNSKTR00    DEQA
  [5 ]{style="text-decoration: underline;"}     TXMMNG       SMANET      BCH      .5  PGM-LSASCHR00    DEQW    
  Bottom
  Parameters or command
  ===\> \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
  F3=Exit   F5=Refresh       F7=Find      F10=Restart statistics
  F11=Display elapsed data   F12=Cancel   F23=More options   F24=More keys
  ----------------------------------------------------------------------------------------------------------------------------------------------------------

-   The LSAM TXMMNG job also logs each SBMJOB command and any errors to
    the LSAM log file LSALOGF30. This log file can be quickly viewed
    using the LSAM Management Menu 6, option 5: View LSAM logs. From the
    View LSAM Logs menu, select option 4: Display LSAM submit job log
    (DSPPFM LSALOGF30).
-   Sometimes there is helpful information in the IBM i operator message
    queue (usually QSYSOPR). This message queue must be examined shortly
    after any problem occurs, so that critical information is not lost
    from this active message queue. When a critical LSAM error message
    is found, it is very helpful to SMA Support if the following
    information is captured and reported:
    -   Position the cursor over the message and press the Help key (the
        key sequence ALT + F1 = Help when using the standard keyboard
        map of the display emulator of iSeries Access). Print or copy
        and paste the full message help screen, including subsequent
        pages of the secondary help text.
    -   Press function key F9=Display message details to view a screen
        that often lists the name of the program that issued the
        message, and it may also identify the line of the program where
        the message event occurred.
    -   If an operator must respond to an error message, and there are
        no other instructions applying to the error, an answer of \"D\"
        = dump may produce a helpful formatted program dump report among
        the printed output of the job that issued the message. Attempt
        to locate and save the dump report. The first page of the dump
        report often contains helpful diagnostic information about
        program errors.

  -------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [The LSAM software is distributed with program observation turned off, so most LSAM programs will not produce a complete program dump showing program variables. An SMA Support technician may need to offer the client a specially compiled version of a failing program if an error arises that is difficult to diagnose, so that a full formatted program dump may be obtained the next time the error occurs.]
  -------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## LSAM User Profiles

### IBM i LSAM Operator Authority

The IBM i LSAM Installation instructions and this **IBM i LSAM** online
help state that the standard IBM i system operator user profile,
QSYSOPR, should be able to operate the LSAM software, performing the
functions of starting and stopping the LSAM server jobs. An IBM i LSAM
user site may or may not wish to authorize the system operator to
perform other functions supported by the LSAM menu system. Most of the
LSAM menu functions are for configuration tasks or diagnostic purposes,
and these might be restricted to users who have been authorized,
according to the procedures described in this topic.

 

  -------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **TECHNICAL NOTE:** [The QSYSOPR user profile is specifically enabled to start or stop the LSAM server subsystem and jobs as of LSAM version 03.31.03, with PTF \# 16318 applied. Prior versions of the LSAM may require manual security maintenance procedures to enable QSYSOPR to perform these functions.]
  -------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

The strategy for an IBM i LSAM operator prevents the operator from
performing LSAM configuration or master file maintenance tasks. These
tasks must be performed by a user with LSAM administration authorities,
as described in a following section of this topic.

### How to Enable an LSAM Operator User Profile

The IBM i LSAM installation instructions and many places in this **IBM i
LSAM** online help describe how to operate the LSAM software using the
IBM i security officer profile (QSECOFR), or, using a user profile that
has \*ALLOBJ special authority.

 

The default installation of the IBM i LSAM software enables the IBM i
default system operator (QSYSOPR) to start or stop the LSAM server
programs, to view the status of the LSAM servers and to work with
tracked jobs. QSYSOPR is not granted any other authority to use LSAM
functions.

 

To enable another user-defined user profile (for example, SMAOPER) to
operate the LSAM software, that user profile must be granted the
authorities shown in the LSAM Object Authority table (LSAM menu 9,
option 8) that apply to QSYSOPR, also identified in the discussion of
the LSAM Operator Authorities, below. The IBM i command GRTOBJAUT can be
used to grant these authorities, but the LSAM Work with object authority
function includes a convenient option 1=apply that can be used on one or
more objects at a time to implement groups of object authority rules
associated with each object selected from the list.

 

Similarly, to disable QSYSOPR and prevent this system operator profile
from managing the LSAM environment, the same authorities shown for
QSYSOPR in the LSAM object authority table must be revoked, using the
RVKOBJAUT command. Again, after the LSAM Work with object authority
function has been used to configure the desired object authorities,
those authorities can be applied using the convenient option 1=apply
from the list of Special Object Authorities.

### IBM i LSAM Administrator Requirements

The default installation of the IBM i LSAM requires that there exist an
LSAM Administrator user profile that has \*ALLOBJ authority. QSECOFR may
be used for this purpose. Since the LSAM Operator is a user profile with
restricted privileges, the following rules apply:

-   When the LSAM software is installed, it is required that the
    installation be performed by QSECOFR. A user profile with equivalent
    authority may be used, but during the installation process, a check
    is made of the required user profiles, so \*SECADM authority is
    required in addition to \*ALLOBJ authority.
-   The LSAM Parameters must first be configured by an LSAM
    Administrator before the LSAM Operator will be allowed to start the
    LSAM server programs.
-   Only an LSAM Administrator user profile may perform LSAM
    configuration functions.
-   Only QSECOFR or an LSAM Administrator with \*ALLOBJ authority is
    allowed to maintain the User Management validation lists
    (function 1) on the LSAM Operator Replay menu (LSAM menu 4).
-   Only QSECOFR or an LSAM Administrator with \*ALLOBJ authority is
    allowed to maintain the External Event Password (function 2) on the
    LSAM Events menu (LSAM menu 3).

It is possible to create a limited LSAM Administrator user profile, or
other categories of LSAM user profiles, that would not have \*ALLOBJ
authority. These categories of LSAM users might be useful for enabling
certain LSAM users to perform some kinds of LSAM master file maintenance
without having to make them super users with \*ALLOBJ authority.

 

Strategies for creating limited LSAM Administrator user profiles are
discussed in the following sections of this document.

#### LSAM Administrator Use of \*ALLOBJ Authority

\*ALLOBJ authority is the easy way to enable the LSAM Administrator to
complete various pre-programmed tasks such as:

-   Registering an Exit Program to IBM i (used by Job Tracking).
-   Making it easier for the LSAM Administrator to update any of the
    LSAM control files in the SMADTA database library.
-   Allowing the LSAM Administrator to perform the User Management
    function on the LSAM Operator Replay menu and the External Events
    Password function on the LSAM Events menu.

It is possible to create an LSAM Administrator user profile that does
not have \*ALLOBJ authority, as long as that user profile has \*USE
authority to all the LSAM Menu functions and sub-programs in the LSAM
program objects libraries (default names SMAGPL and SMAPGM), and
\*CHANGE authority to all the files in the LSAM database library
(default name SMADTA) plus certain files stored in SMAGPL. For example,
the LSAM User Management function requires that the LSAM Administrator
be granted \*CHANGE authority to the LSAM validation list object as well
as specific authority to \*USE the LSAM User Management function
programs.

 

The LSAM objects that must be authorized for each LSAM Menu function are
identified in the table of object authorities described later in this
topic.

 

The LSAM Administrator also requires access to some other normally
restricted IBM i commands and objects, such as managing IBM i exit
program entries. If this user profile does not have \*ALLOBJ authority,
then it is possible for some LSAM configuration procedures to fail, at
which time it will be necessary to debug the failure and to assign the
special authority required for the LSAM Administrator.

 

SMA has made an effort in this topic to provide general guidance about
the security and authorities required to operate the LSAM software.
However, not every detail of the LSAM software analysis is documented in
this topic, for reasons of system security and protection of proprietary
design information. LSAM user sites that need to implement high security
restrictions are advised to contact SMA Support for additional technical
information that may be available to the security officers of licensed
SMA software user sites.

#### \*SECADM Authority is No Longer Needed

Previous documentation about the LSAM Administrator authorities
specified that \*SECADM (security administration) authority was required
for an LSAM Administrator to use some of the LSAM menu functions. This
authority should no longer be required. For example, the validation list
method of managing security for certain LSAM functions is controlled by
IBM i object authority, so special security administration authority is
not required to manage this feature. However, following a default
installation of the LSAM software, this feature is restricted for use
only by QSECOFR or an LSAM Administrator with \*ALLOBJ authority.

 

The only requirement for security administration authority would be when
the IBM i security officer might create user profiles, such as an
alternate SMAOPER user profile that is suggested as an option in this
topic. The configuration of the Restricted Mode special user profile
SMASAV is administered by specially compiled programs that can only be
executed by authorized LSAM Administrators, so this function also does
not require \*SECADM authority.

### Diagnosing LSAM User Profile Problems

If error messages arise when any restricted LSAM user profile tries to
use LSAM functions, it is very helpful to SMA Support if the following
information is provided whenever an error message is encountered:

1.  Position the cursor over the error message and press the HELP key,
    or key sequence (typically ALT + F1, in the IBM iSeries Access
    workstation emulation program) in order to display the secondary
    message help text. Capture this text and report it.
2.  While the secondary help text for a message is showing on the
    screen, look for the function key F9=Display message details. Press
    F9 when it is available and capture the information about the
    program that has reported the message.
3.  If possible, created a job log report from the interactive job where
    the error occurred, or find the job log report from a batch job, and
    convert it to an ASCII text file that can be attached to the problem
    report submitted to SMA Support. Job log reports for interactive
    jobs can be obtained as the interactive session is ended using this
    command and parameters:

Be sure to note the ID of the job (number/user/job_name) before signing
off so that the job log report can easily be found after the job ends.

## LSAM Object Authority Matrix

The IBM i LSAM Installation instructions advise that an object authority
matrix must be configured if the LSAM Administrator will not be QSECOFR
or another super user profile with \*ALLOBJ authority. This section
describes the resources available and the procedures that can be used to
implement the object authority matrix.

### LSAM Object Authority Table

The basis for a revised object authority matrix is provided by SMA in a
pair of LSAM Object Authority tables. These tables are distributed and
installed with the original LSAM software product object authority
matrix data already loaded. That is, the object authority table files
include data that describe the actual object authority assigned to each
table and file in the LSAM software product, wherever the default
authorities do not apply.

 

The default authority rules for LSAM object authority are these:

-   All libraries and objects are owned by user SMANET, except where the
    object authority table designates QSECOFR as the owner of certain
    programs.
-   \*PUBLIC is granted \*USE authority to the LSAM libraries, but is
    excluded from any authority to most of the objects they contain. In
    other words, all authority for \*PUBLIC is revoked for all objects,
    and only the authorities specified in the object authority table are
    granted.
-   The LSAM Restricted Mode user profile, SMASAV, is granted certain
    authorities that are defined in the object authority table.
-   The IBM i system operator, QSYSOPR, is registered in the default
    LSAM object authority tables with authority to use only some very
    basic LSAM features that are normally required for daily (or
    periodic) LSAM operation. The name of this user profile could be
    replaced in the object authority table, for example, with a
    user-defined operator name such as SMAOPER.
-   The object authority table contains definitions of all special
    authorities that will be granted to any file, program or other
    object. If a special authority is not registered in the LSAM object
    authority tables, that authority may be lost (revoked) whenever the
    LSAM authority management utilities are used or when LSAM software
    updates are applied.

The LSAM function that may be used to modify the object authority tables
is explained in more detail in the Screens and Windows section of this
topic below.

### LSAM Operator Authorities

The IBM i LSAM default installation delivers the LSAM software with
sufficient authority for the default IBM i system operator, QSYSOPR, to
perform the following minimal LSAM operations:

-   Enter the LSAM menu system (but use only the authorized functions)
-   Start or stop the LSAM subsystem and server jobs, including the SMA
    File Transfer server
-   Check the status of the LSAM server subsystem and jobs
-   Work with Tracked Jobs (refer to the topic about Job Tracking for
    more information about the WRKTRKJOB command)

To enable QSYSOPR to perform these minimal operator functions, the LSAM
software objects listed in the LSAM object authority table have \*USE
authority granted specifically to the user profile QSYSOPR. It is
possible to disable QSYSOPR from performing these LSAM operator
functions by changing the LSAM object authority table to remove or
replace the authority granted to User ID 1, or other User ID field that
names QSYSOPR. Whether QSYSOPR is removed or replaced, the LSAM Set
Object Authority functions (or command) is then used to apply the new
object authorities. This procedure is explained in more detail in a
following section of this topic.

 

To view the specific object authorities required for the minimal list
outlined above, use the LSAM menu 9, function 8: Work with object
authority. From the list display, function key \<**F15**\> may be used
to access the subset window. Specify subset option 6, then type QSYSOPR
in the window user name field. Once \<**Enter**\> is pressed to apply
the subset rule, the list of object authorities will be limited to only
the objects that have authority granted to QSYSOPR. The actual fields
that enable the authority for QSYSOPR are typically not visible in the
list display. Use option 5=Display to examine each object detail in
order to see the authority granted to QSYSOPR.

 

  ------------------------------------------------------------------------------------------------------------------------------ ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White \"X\" icon on red circular background](../../../Resources/Images/warning-icon(48x48).png "Warning icon")   **WARNING:** [Only the site security officer should be allowed to use the LSAM function of Work with object authority. The information displayed by this function should be kept confidential. The action options and function keys supported by this function provide direct access to IBM i commands such as GRTOBJAUT.]
  ------------------------------------------------------------------------------------------------------------------------------ ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### LSAM Special Authorities

IBM i LSAM user sites with high security requirements may need to be
aware of some special authorities that have been programmed into the
LSAM software. This proprietary information is made available to the
site security officer in the LSAM object authority table, where it may
be viewed using the LSAM menu function Work with object authority.

 

Use the Subset function (F15) from the Work with object authority list
to discover the lists of programs that are owned by QSECOFR, and/or
programs that run under the authority of \*OWNER (rather than \*USER).
Wherever possible, programs that adopt the \*OWNER authority are owned
by the LSAM user SMANET rather than by QSECOFR. However, the programs
owned and operated under authority of QSECOFR were created so that
critical functions could be performed by either the LSAM features or by
an LSAM Administrator without requiring that the IBM i user be granted
certain general authorities that could be deemed risky. So the feature
of using this form of adopted authority should actually help to assure
system security.

 

Although it is possible for the site security officer to use the LSAM
object authority tools to change these parameters and disable the
adopted authority techniques, SMA does not recommend making these
changes. SMA cannot assure that the LSAM software will operate as
designed without these authorities. If it appears necessary to consider
this type of change to the special object authorities, please contact
SMA Support first and request a consultation so that the implications of
any such changes can be discussed.

 

SMA, while it cannot warrant or guarantee fitness for a particular
purpose, does state that it has made an effort to assure that programs
designed to use adopted authority are (1) specifically limited in
purpose and (2) designed to prevent their use as a means of gaining
access to unauthorized authority or other functions. Some additional,
SMA proprietary information about the purposes of each program adopting
special authority can be made available to the site security officer of
licensed SMA software users upon request.

### LSAM Menu Function Authorities

The table below lists the primary command or program that is called by
each of the IBM i LSAM Menu functions. This information provides a
useful starting point for the purpose of granting or restricting
authority to the various LSAM functions. This information is required
for the purpose of defining the object authority matrix that is
mentioned in this topic and in the IBM i LSAM Installation instructions.
The object authority matrix is based on two tables of object authority
information supplied as part of the LSAM software database. User-defined
extensions to these tables of authorities can be granted or revoked by
using the LSAM menu 9, option 8. Work with object authorities.

 

In addition to the table of LSAM Menu functions below, the security
officer who will modify the object authority matrix will need to use the
Object Reference Flow Chart utility (command REFFLOW) that has been
provided with the IBM i LSAM software. This utility is explained in a
section that follows the menu functions table.

LSAM Menu Functions

+----------------------+----------------------+----------------------+
| LSAM Menu Functions  |                      |                      |
+======================+======================+======================+
| Menu/ Function       | Description          | Program or Command   |
+----------------------+----------------------+----------------------+
| LSAM Main Menu       | LSAM menus have      | LSAMNUE0 (menu)      |
|                      | \*USE authority      |                      |
|                      | granted to \*PUBLIC. |                      |
|                      | Menu system security |                      |
|                      | is enforced at the   |                      |
|                      | object level         |                      |
|                      | (command or program) |                      |
|                      | of each menu         |                      |
|                      | function.            |                      |
|                      |                      |                      |
|                      |                      |                      |
|                      |                      |                      |
|                      | The STRSMA command   |                      |
|                      | installed in library |                      |
|                      | QGPL and its command |                      |
|                      | processor program    |                      |
|                      | are restricted from  |                      |
|                      | public use, so that  |                      |
|                      | authority can be     |                      |
|                      | granted on a         |                      |
|                      | per-user basis to    |                      |
|                      | control who has      |                      |
|                      | access to the LSAM   |                      |
|                      | Menu system.         |                      |
|                      |                      |                      |
|                      |                      |                      |
|                      |                      |                      |
|                      | **Note**: The IBM i  |                      |
|                      | menu command GO may  |                      |
|                      | not be used outside  |                      |
|                      | of the LSAM Menu     |                      |
|                      | system because the   |                      |
|                      | LSAM Menu start      |                      |
|                      | command (STRSMA) is  |                      |
|                      | required to          |                      |
|                      | initialize the LSAM  |                      |
|                      | environment for the  |                      |
|                      | interactive job.     |                      |
+----------------------+----------------------+----------------------+
| 1\.                  | Job track menu       | LSAMNUE1 (menu)      |
+----------------------+----------------------+----------------------+
| 2\.                  | Message management   | LSAMNUE2 (menu)      |
|                      | menu                 |                      |
+----------------------+----------------------+----------------------+
| 3\.                  | Events menu          | LSAMNUE3 (menu)      |
+----------------------+----------------------+----------------------+
| 4\.                  | Operator replay menu | LSAMNUE4 (menu)      |
+----------------------+----------------------+----------------------+
| 5\.                  | Restricted mode menu | LSAMNUE5 (menu)      |
+----------------------+----------------------+----------------------+
| 6\.                  | LSAM management menu | LSAMNUE6 (menu)      |
+----------------------+----------------------+----------------------+
| 7\.                  | LSAM Parameters      | CALL LSAPARR00       |
+----------------------+----------------------+----------------------+
| 8\.                  | SMA File Transfer    | LSAMNUE8 (menu)      |
|                      | menu                 |                      |
+----------------------+----------------------+----------------------+
| 9\.                  | PTF and Security     | LSAMNUE9 (menu)      |
|                      | menu                 |                      |
+----------------------+----------------------+----------------------+
| Job Track Menu       |                      | LSAMNUE1 (menu)      |
+----------------------+----------------------+----------------------+
| 1\.                  | Job track parameters | CALL TRKPARR00       |
+----------------------+----------------------+----------------------+
| 2\.                  | Job track logs       | CALL LSALOGR00       |
|                      | (WRKTRKJOB)          |                      |
+----------------------+----------------------+----------------------+
| 3\.                  | Start job track      | STRJOBTRK            |
|                      | (STRJOBTRK)          |                      |
+----------------------+----------------------+----------------------+
| 4\.                  | End job track        | ENDJOBTRK            |
|                      | (ENDJOBTRK)          |                      |
+----------------------+----------------------+----------------------+
| 5\.                  | Check job track      | JOBTRKSTS            |
|                      | status (JOBTRKSTS)   |                      |
+----------------------+----------------------+----------------------+
| 6\.                  | Maintain dynamic     | CALL LSAVARR00       |
|                      | variables            |                      |
+----------------------+----------------------+----------------------+
| 7\.                  | Job tracking         | CALL TRKJOBR30       |
|                      | configuration        |                      |
+----------------------+----------------------+----------------------+
| 8\.                  | Start job capture    | STRCAPJOB            |
|                      | (STRCAPJOB)          |                      |
+----------------------+----------------------+----------------------+
| 9\.                  | End job capture      | ENDCAPJOB            |
|                      | (ENDCAPJOB)          |                      |
+----------------------+----------------------+----------------------+
| 10\.                 | Display captured     | DSPCAPJOB            |
|                      | jobs (DSPCAPJOB)     |                      |
+----------------------+----------------------+----------------------+
| 11\.                 | Work with captured   | WRKCAPJOB            |
|                      | jobs (WRKCAPJOB)     |                      |
+----------------------+----------------------+----------------------+
| Message Management   |                      | LSAMNUE2 (menu)      |
| Menu                 |                      |                      |
+----------------------+----------------------+----------------------+
| 1\.                  | Message management   | CALL TRPMSGR03       |
|                      | parameters           |                      |
+----------------------+----------------------+----------------------+
| 2\.                  | Message management   | CALL LSALOGR10       |
|                      | logs                 |                      |
+----------------------+----------------------+----------------------+
| 3\.                  | Start Message        | STRMSGMNG            |
|                      | management           |                      |
|                      | (STRMSGMNG)          |                      |
+----------------------+----------------------+----------------------+
| 4\.                  | End Message          | ENDMSGMNG            |
|                      | management           |                      |
|                      | (ENDMSGMNG)          |                      |
+----------------------+----------------------+----------------------+
| 5\.                  | Check Message        | TRPMSGSTS            |
|                      | management status    |                      |
|                      | (TRPMSGSTS)          |                      |
+----------------------+----------------------+----------------------+
| 6\.                  | View job completion  | DSPPFM (IBM i)       |
|                      | message table        |                      |
|                      | (DSPPFM LSAMSGF00)   |                      |
+----------------------+----------------------+----------------------+
| 7\.                  | Message Management   | CALL TRPMSGR40       |
|                      | Performance          |                      |
|                      | Parameters           |                      |
+----------------------+----------------------+----------------------+
| 8\.                  | Display Captured     | CALL OPRLOGR40       |
|                      | Message Data log     | PARM(\'M\')          |
+----------------------+----------------------+----------------------+
| 9\.                  | Display Data Capture | CALL CAPLOGR10       |
|                      | Debug log (response  | PARM(\'M\')          |
|                      | rules log)           |                      |
+----------------------+----------------------+----------------------+
| 10\.                 | Work with Message    | CALL TRPMSGR30       |
|                      | Data Capture         |                      |
|                      | Definitions          |                      |
+----------------------+----------------------+----------------------+
| 11\.                 | Work with Captured   | CALL OPRRPYR50       |
|                      | Data Response Rules  | PARM(\'M\')          |
+----------------------+----------------------+----------------------+
| 12\.                 | Maintain Dynamic     | CALL LSAVARR00       |
|                      | Variables            |                      |
+----------------------+----------------------+----------------------+
| Events and Utilities |                      | LSAMNUE3 (menu)      |
| Menu                 |                      |                      |
+----------------------+----------------------+----------------------+
| 1\.                  | Event Management     | CALL LSAEVTR02       |
+----------------------+----------------------+----------------------+
| 2\.                  | External Event       | CALL LSACONR00       |
|                      | Password             |                      |
+----------------------+----------------------+----------------------+
| 3\.                  | Work with SCANSPLF   | CALL LSAJORR50       |
|                      | Applications         |                      |
+----------------------+----------------------+----------------------+
| 4\.                  | Work with SPLF Scan  | CALL LSAJORR40       |
|                      | Rules                |                      |
+----------------------+----------------------+----------------------+
| 5\.                  | Work with Captured   | CALL OPRRPYR50       |
|                      | Data Response Rules  |                      |
+----------------------+----------------------+----------------------+
| 6\.                  | Maintain dynamic     | CALL LSAVARR00       |
|                      | variables            |                      |
+----------------------+----------------------+----------------------+
| 7\.                  | LSAM Utility         | CALL LSAUTLR30       |
|                      | configuration        |                      |
+----------------------+----------------------+----------------------+
| 8\.                  | Display Captured     | CALL OPRLOGR40       |
|                      | Data log             |                      |
+----------------------+----------------------+----------------------+
| 9\.                  | Display data capture | CALL CAPLOGR10       |
|                      | debug log            |                      |
+----------------------+----------------------+----------------------+
| 10\.                 | Data Export/Import   | GO LSAMNUEA          |
|                      | Utilities menu       |                      |
+----------------------+----------------------+----------------------+
| 11\.                 | Client eMail         | GO LSAMNUEB          |
|                      | Management menu      |                      |
+----------------------+----------------------+----------------------+
| Data Export/Import   |                      | LSAMNUEA (menu)      |
| Utilities Menu       |                      |                      |
+----------------------+----------------------+----------------------+
| 1\.                  | Work with Export     | CALL EXIEXPR00       |
|                      | batches              |                      |
+----------------------+----------------------+----------------------+
| 2\.                  | Export a data set    | LSAEXPDTA            |
|                      | (LSAEXPDTA)          |                      |
+----------------------+----------------------+----------------------+
| 3\.                  | Display Export       | CALL EXILOGR00       |
|                      | Activity/Error Log   | PARM(\'E\')          |
+----------------------+----------------------+----------------------+
| 4\.                  | Work with Import     | CALL EXIIMPR00       |
|                      | batches              |                      |
+----------------------+----------------------+----------------------+
| 5\.                  | Import new data set  | LSAIMPDTA            |
|                      | (LSAIMPDTA)          |                      |
+----------------------+----------------------+----------------------+
| 6\.                  | Display Import       | CALL EXILOGR00       |
|                      | Activity/Error Log   | PARM(\'I\')          |
+----------------------+----------------------+----------------------+
| 7\.                  | Export/Import        | CALL EXICFGR30       |
|                      | options              |                      |
|                      | configuration        |                      |
+----------------------+----------------------+----------------------+
| Client eMail         |                      | LSAMNUEB (menu)      |
| Management Menu      |                      |                      |
+----------------------+----------------------+----------------------+
| 1\.                  | Work with Client     | WRKCLTEML            |
|                      | eMail Data           |                      |
|                      | (WRKCLTEML)          |                      |
+----------------------+----------------------+----------------------+
| 2\.                  | Work with Message    | WRKMBRPDM            |
|                      | Text Source Members  | FI                   |
|                      |                      | LE(\*LIBL/EMLTXTSRC) |
+----------------------+----------------------+----------------------+
| 3\.                  | Generate eMail       | ?GENEMLREQ           |
|                      | Request (GENEMLREQ)  | ??OPCONJOB(\'0\')    |
+----------------------+----------------------+----------------------+
| 4\.                  | Display eMail        | CALL EMLLOGR00       |
|                      | Activity Logs        |                      |
+----------------------+----------------------+----------------------+
| 5\.                  | Display Error Log    | DSPPFM EMLLOGF10     |
|                      | (DSPPFM EMLLOGF10)   |                      |
+----------------------+----------------------+----------------------+
| 6\.                  | Maintain Dynamic     | CALL LSAVARR00       |
|                      | Variables            |                      |
+----------------------+----------------------+----------------------+
| 7\.                  | Client eMail         | CALL CLTEMLR30       |
|                      | Configuration        |                      |
+----------------------+----------------------+----------------------+
| There is no menu 7.  |                      |                      |
| Main menu function 7 |                      |                      |
| is a call to the     |                      |                      |
| LSAM Parameters      |                      |                      |
| function:CALL        |                      |                      |
| LSAPARR00            |                      |                      |
+----------------------+----------------------+----------------------+
| Operator Replay Menu |                      | LSAMNUE4 (menu)      |
+----------------------+----------------------+----------------------+
| 1\.                  | User management      | CALL LSAUSRR00       |
+----------------------+----------------------+----------------------+
| 2\.                  | Operator Replay      | CALL OPRRPYR10       |
|                      | scripts              |                      |
+----------------------+----------------------+----------------------+
| 3\.                  | Operator Replay logs | CALL OPRLOGR00       |
+----------------------+----------------------+----------------------+
| 4\.                  | Operator             | CALL OPRVARR00       |
|                      | Token/Variable       |                      |
|                      | management           |                      |
+----------------------+----------------------+----------------------+
| 5\.                  | Work with Screen     | CALL OPRRPYR40       |
|                      | Capture definitions  |                      |
+----------------------+----------------------+----------------------+
| 6\.                  | Work with Captured   | CALL OPRRPYR50       |
|                      | Data Response Rules  |                      |
+----------------------+----------------------+----------------------+
| 7\.                  | Operator Replay      | CALL OPRRPYR30       |
|                      | configuration        |                      |
+----------------------+----------------------+----------------------+
| 8\.                  | Display Captured     | CALL OPRLOGR40       |
|                      | Data log             |                      |
+----------------------+----------------------+----------------------+
| 9\.                  | Display data capture | CALL CAPLOGR10       |
|                      | debug log            |                      |
+----------------------+----------------------+----------------------+
| 10\.                 | Maintain Dynamic     | CALL LSAVARR00       |
|                      | Variables            |                      |
+----------------------+----------------------+----------------------+
| 11\.                 | Client eMail         | GO LSAMNUEB          |
|                      | Management menu      |                      |
+----------------------+----------------------+----------------------+
| Restricted Mode and  |                      | LSAMNUE5 (menu)      |
| Multi-step Job Menu  |                      |                      |
+----------------------+----------------------+----------------------+
| 1\.                  | Maintain scripts     | CALL SAVRSTR20       |
+----------------------+----------------------+----------------------+
| 2\.                  | Setup environment    | CALL SAVRSTR21       |
+----------------------+----------------------+----------------------+
| 3\.                  | History of the last  | CALL SAVRSTR05       |
|                      | use                  |                      |
+----------------------+----------------------+----------------------+
|                      |                      |                      |
+----------------------+----------------------+----------------------+
| 5\.                  | Maintain Multi-step  | CALL MLTJOBR10       |
|                      | job scripts          |                      |
+----------------------+----------------------+----------------------+
| 6\.                  | View Multi-step job  | DSPPFM MLTLOGF00     |
|                      | log                  |                      |
+----------------------+----------------------+----------------------+
| 7\.                  | Maintain dynamic     | CALL LSAVARR00       |
|                      | variables            |                      |
+----------------------+----------------------+----------------------+
| LSAM Management Menu |                      | LSAMNUE6 (menu)      |
+----------------------+----------------------+----------------------+
| 1\.                  | Start LSAM           | STRSMASYS            |
|                      | (STRSMASYS)          |                      |
+----------------------+----------------------+----------------------+
| 2\.                  | End LSAM (ENDSMASYS) | ENDSMASYS            |
+----------------------+----------------------+----------------------+
| 3\.                  | Check LSAM subsystem | CALL CHKLSAC00       |
|                      | status               |                      |
+----------------------+----------------------+----------------------+
| 4\.                  | Manage LSAM logging  | CALL SMAMNGLOGR      |
|                      |                      | PARM(\'MANAGE\')     |
+----------------------+----------------------+----------------------+
| 5\.                  | View LSAM logs       | CALL SMAMNGLOGR      |
|                      |                      | PARM(\'VIEW\')       |
+----------------------+----------------------+----------------------+
| 6\.                  | Work with LSAM       | WRKSMASVR            |
|                      | Servers (WRKSMASVR)  |                      |
+----------------------+----------------------+----------------------+
| 7\.                  | LSAM Parameters      | CALL LSAPARR00       |
|                      | configuration        |                      |
+----------------------+----------------------+----------------------+
| 8\.                  | Alternate Job Notify | GO LSAMENUEC         |
|                      | menu                 |                      |
+----------------------+----------------------+----------------------+
| Alternate Job Notify |                      | LSAMNUEC (menu)      |
| Menu                 |                      |                      |
+----------------------+----------------------+----------------------+
| 1\.                  | Work with job notify | CALL JOBNFYR10       |
|                      | subsystems           |                      |
+----------------------+----------------------+----------------------+
| 2\.                  | View job notify      | CALL JOBNFYR20       |
|                      | message log          |                      |
+----------------------+----------------------+----------------------+
| 3\.                  | Start job notify     | STRSMASVR            |
|                      | server               | SERVER(JOBNFY)       |
+----------------------+----------------------+----------------------+
| 4\.                  | End job notify       | CALL JOBNFYC02       |
|                      | server               |                      |
+----------------------+----------------------+----------------------+
| 5\.                  | Check LSAM subsystem | CALL CHKLSAC00       |
|                      | status               |                      |
+----------------------+----------------------+----------------------+
|                      |                      |                      |
+----------------------+----------------------+----------------------+
| 7\.                  | Job notify           | CLAL JOBNFYR30       |
|                      | configuration        |                      |
+----------------------+----------------------+----------------------+
|                      |                      |                      |
+----------------------+----------------------+----------------------+
| SMA File Transfer    |                      | LSAMNUE8 (menu)      |
| Menu                 |                      |                      |
+----------------------+----------------------+----------------------+
| 1\.                  | Start SMAFT Server   | STRSMAFT             |
|                      | (STRSMAFT)           |                      |
+----------------------+----------------------+----------------------+
| 2\.                  | End SMAFT Server     | ENDSMAFT             |
|                      | (ENDSMAFT)           |                      |
+----------------------+----------------------+----------------------+
| 3\.                  | Work with SMAFT jobs | WRKSFTJOB            |
|                      | (WRKSFTJOB)          |                      |
+----------------------+----------------------+----------------------+
| 4\.                  | Manage SMAFT logging | CALL SFTMNGLOGR      |
|                      |                      | PARM(\'MANAGE\')     |
+----------------------+----------------------+----------------------+
| 5\.                  | View LSAM logs       | CALL SMAMNGLOGR      |
|                      |                      | PARM(\'VIEW\')       |
+----------------------+----------------------+----------------------+
| 6\.                  | View SMAFT logs      | CALL SFTMNGLOGR      |
|                      |                      | PARM(\'VIEW\')       |
+----------------------+----------------------+----------------------+
| 7\.                  | SMAFT Parameters     | CALL SFTPARR00       |
+----------------------+----------------------+----------------------+
| 8\.                  | Work with SMAFT      | CALL SFTNATR00       |
|                      | Network Address      |                      |
|                      | Translation          |                      |
+----------------------+----------------------+----------------------+
| PTF and Security     |                      | LSAMNUE9 (menu)      |
| Menu                 |                      |                      |
+----------------------+----------------------+----------------------+
| 1\.                  | Work with LSAM PTFs  | WRKPTFCTL            |
+----------------------+----------------------+----------------------+
| 2\.                  | Master PTF request,  | SMAPTFINS            |
|                      | load and apply       |                      |
|                      | (SMAPTFINS)          |                      |
+----------------------+----------------------+----------------------+
| 3\.                  | Request PTF          | SMAPTFREQ            |
|                      | information or save  |                      |
|                      | files (SMAPTFREQ)    |                      |
+----------------------+----------------------+----------------------+
| 4\.                  | Load PTF information | SMAPTFLOD            |
|                      | or save files        |                      |
|                      | (SMAPTFLOD)          |                      |
+----------------------+----------------------+----------------------+
| 5\.                  | Apply cumulative PTF | SMAPTFCUM            |
|                      | (SMAPTFCUM)          |                      |
+----------------------+----------------------+----------------------+
| 6\.                  | Apply single PTF     | SMAPTFAPY            |
|                      | (SMAPTFAPY)          |                      |
+----------------------+----------------------+----------------------+
| 7\.                  | PTF options          | CALL LSAPTFR30       |
|                      | configuration        |                      |
+----------------------+----------------------+----------------------+
| 8\.                  | Work with object     | WRKSPLAUT            |
|                      | authority            |                      |
+----------------------+----------------------+----------------------+

### LSAM Object Reference Flow Chart

An object authority matrix must be defined in order to enable LSAM user
profiles with restricted authorities or to add functions to the list of
the LSAM-authorized operator. The task of creating this user-defined
object authority matrix depends on granting or revoking authority to (1)
the primary program or command listed in the table of LSAM Menu
Functions and (2) all the sub-programs and files (and sometimes other
objects) referenced by each of these.

 

Instead of publishing a hard list of LSAM software object references,
SMA provides a database file that contains the analysis data of almost
every object referenced by the LSAM software. The IBM i security officer
can use either of the following commands to view a formatted list of
objects referenced by LSAM menu functions.

#### REFFLOW -- Program Reference Flow Chart

The command REFFLOW displays a list of the programs, files and some
other objects referenced by the named LSAM menu, command or program.
This list may also be transferred to a printable report using the
F9=Print function key from the interactive list display.

 

The REFFLOW command requires that the interactive job library list be
set to the library list of an existing LSAM environment. This means the
REFFLOW command can be used from the command entry line of the LSAM Menu
system (if the user is not restricted from command line usage). From
outside of the LSAM menu system, this command can only be used if the
interactive job\'s library list was previously set equal to an LSAM
environment. The interactive job library list can be set (outside of the
LSAM menu system) by using the LSAM command in library QGPL: SMASETLIBL
(refer to [Commands and Utilities](Commands-and-Utilities.md#top) for more
information about this command).

##### REFFLOW command syntax

REFFLOW OBJ(object_name) LEVELS(n) SAVE(x) WRKLIB(lib_name)

-   **OBJ**: The name of an LSAM menu, command or program.
-   **LEVELS**: The number of nesting levels to show in the reference
    flow chart, 1 -- 9, default is 5. Too few levels can omit important
    references, but too many levels may create a list that is too long
    if there are recursive program calls.
-   **SAVE**: Save analysis work file: Y = yes, N = no (discard
    temporary work file), E = use existing work file that was previously
    saved, to be found in the library named by the WRKLIB parameter. The
    default value is N. Each work file is named according to the OBJ
    name. Saving work files and using them as existing work files makes
    the command run much faster and it saves system disk space by
    avoiding creation of deleted objects (that are not removed from disk
    until the next IPL).
-   **WRKLIB**: Name of the library where the analysis work file will be
    saved. The default value is QTEMP. If the library is QTEMP, the work
    file will be discarded when the interactive job ends, although work
    files in QTEMP may be re-used as long as the same interactive
    session exists. The LSAM database library SMADTA may be used for
    this purpose, although increasing the size of the content of SMADTA
    will add extra size and time when the SMASUP command is used to
    extract a save file of the entire SMADTA LSAM database library. It
    is possible to use any other library name to which the user is
    authorized. This library name must be specified if the SAVE
    parameter is set to either Y=Yes or E=Existing.

##### REFFLOW command examples

REFFLOW OBJ(LSAPARR00)

This example shows that it is only necessary to name the LSAM menu,
command or program in order to use this command. The default values for
each other command parameter will be used.

 

REFFLOW OBJ(LSAPARR00) LEVELS(9) SAVE(E) WRKLIB(SMADTA)

 

This example requests that a full analysis up to the maximum of 9 levels
be performed for the LSAM Parameters maintenance program that is called
from the LSAM Main menu (refer to the table of LSAM Menu Functions,
above). The SAVE parameter says that the analysis was previous run and
the analysis data can be used again for this execution of the command.
The existing analysis for this program had previously been saved to
library SMADTA.

##### REFFLOW command usage

It is possible to perform an analysis of an entire LSAM menu from a
single use of the REFFLOW command. However, a shorter list may be
obtained by specifying one of the programs or commands that is called by
the LSAM menu system, as listed in the LSAM Menu Functions table, above.

 

Each sub-program referenced by an LSAM menu command or called program
must be authorized for \*USE by the user profile that will be authorized
to use the menu function. Most of the database files that are reference
by an LSAM menu function must be authorized for \*CHANGE (which includes
the data authorities of Add, Update and Delete) by the user being
authorized to use the function. Some files are only required for input
to the referenced programs; this is shown in the REFFLOW list under the
Format/Use/Description column. In this case, the authorized user only
needs \*USE authority to that file, and \*CHANGE authority should not be
provided if the file content is to be protected from update by the
authorized user.

 

The values shown under the USE column of the REFFLOW display or report
include:

-   I = input (requires only \*USE authority, READ data authority)
-   O = output (requires ADD data authority)
-   U = update (requires UPDATE data authority)

The object references list produced by the REFFLOW command intentionally
eliminates references to the many common IBM i system calls that are
typically included in every compiled user program. The reference list
may not include a reference to various IBM i functions that may be
embedded within a program call to an IBM i API. Another example of a
notably absent reference is that the LSAM validation list does not
appear in the analysis of the LSAM function for User Management. These
kinds of expected exceptions in the LSAM object reference analysis will
become evident when the newly authorized user attempts to use a new
function for the first time. It might be necessary for a system support
technician to analyze the user\'s job log in order to determine which
authorities are still required to fully enable an LSAM function for a
new or restricted user profile.

 

The list display produced by the REFFLOW command also supports execution
of the DSPOBJWU command for any object that is found in the displayed
flow chart list.

 

A printed version of the REFFLOW list may be obtained using the function
key F9=Print.

#### DSPOBJWU -- Display Object Where Used

It is possible to discover where a given program, database file or other
LSAM software object is used in the LSAM software system with the LSAM
utility command DSPOBJWU.

 

The DSPOBJWU command requires that the interactive job library list be
set to the library list of an existing LSAM environment. This means the
DSPOBJWU command can be used from the command entry line of the LSAM
Menu system (if the user is not restricted from command line usage).
From outside of the LSAM menu system, this command can only be used if
the interactive job\'s library list was previously set equal to an LSAM
environment. The interactive job library list can be set (outside of the
LSAM menu system) by using the LSAM command in library QGPL: SMASETLIBL
(refer to [Commands and Utilities](Commands-and-Utilities.md#top) for more
information about this command).

##### DSPOBJWU command syntax

DSPOBJWU OBJ(object_name) TYPE(object_type)

-   OBJ = the name of the LSAM object to be studied. The named object
    must be one of the valid types. LSAM objects that are not one of
    these types will not be found in the supplied LSAM object reference
    master file.
-   TYPE = must be one of the valid values:
    -   \*DTAARA = data area
    -   \*FILE = database file (physical or logical view). This is the
        default value for the TYPE parameter.
    -   \*PGM = program
    -   \*SRVPGM = service program
    -   \*MENU = one of the LSAM menus (refer to the table of LSAM Menu
        Functions, above)
    -   \*CMD = command

##### DSPOBJWU command examples

DSPOBJWU OBJ(LSAPARF00) TYPE(\*FILE)

 

This example will produce a list of all programs and service programs
that use the LSAM Parameters control physical file, LSAPARF00.

 

DSPOBJWU OBJ(SFTMNGLOGR) TYPE(\*PGM)

 

This example will produce a list of all programs, service programs,
commands and menus that call the program SFTMNGLOGR.

##### DSPOBJWU command usage

This command might be useful when it is necessary to revoke authority to
a particular database file, such as an LSAM control file. This command
lists every other LSAM program, command or menu that is found to make
reference to the named object within the LSAM object reference master
file that was provided with the LSAM software.

 

The DSPOBJWU command may be executed for most objects that show in the
REFFLOW displayed list by typing option 6=DSPOBJWU next to the listed
object.

 

The list display produced by the DSPOBJWU command also supports
execution of the REFFLOW command for any menu, program or service
program that is found in the displayed reference list.

 

A printed version of the DSPOBJWU list may be obtained using the
function key F9=Print.

## Potentially Vulnerable LSAM Features

SMA has made an effort to protect the default installation of the IBM i
LSAM software from unauthorized users by careful attention to the
authority of all objects included with the software. Wherever special
authorities are absolutely required by the LSAM server programs or by
certain maintenance functions found on the LSAM menus, the LSAM programs
may have been compiled to include the required authority using a means
that does not allow unauthorized users to somehow adopt that special
authority for any other purpose.

 

As explained in this topic, the LSAM server user profile SMANET is
intended to be a user profile without a password. It should not be
possible for a user to sign on or run jobs as the SMANET user. It is not
necessary for any user to have authority to the SMANET user profile in
order to successfully manage the operation of the LSAM servers. The
SMANET user profile must not be added to the list of authorized users in
the OpCon/xps Enterprise Manager, so that no jobs can be submitted that
would run with the authority of SMANET.

 

This strategy presents a secure means to automate IBM i operations
without making the system vulnerable to security breaches or
unauthorized use.

 

However, the security of the LSAM software depends also on the careful
administration of user profile security in the OpCon/xps Enterprise
Manager. Care must be taken that OpCon/xps does not permit unauthorized
users to submit jobs to the IBM i operating system. In general, the
object authority of IBM i objects such as programs and files is
protected and honored by the IBM i LSAM server programs. However, the
LSAM servers cannot protect the system if OpCon/xps authorizes a user
profile that has extensive authority, such as \*ALLOBJ or \*SECADM
authority, to run jobs.

 

It is just as important to carefully protect the role of the OpCon/xps
administrator as it is to protect access to the security officer
authority of IBM i. No one without security officer authority must be
permitted to submit jobs via OpCon/xps of a type that could then be used
to open security breaches within the IBM i operating system, breaches
that could later be accessed directly from IBM i without using
OpCon/xps.

 

There are two optional features provided with the IBM i LSAM software
that also require careful attention in order to protect the IBM i
system. Both Operator Replay and Restricted Mode are based on script
files. Without proper care, it could be possible for someone to enter a
script that would perform an operation intended to open a security
breach in the system.

### Operator Replay

The Operator Replay feature of the IBM i LSAM is based on the use of
action scripts that are recorded in LSAM database files in its IBM i UDB
DB2 database. Scripts could contain virtually any command or program
call supported by IBM i. This feature can be protected against security
breaches by the following practices:

-   Always restrict who may have access to the Operator Replay script
    maintenance function.
-   Always restrict who may have access to the Operator Replay script
    master file.
-   Do not allow anyone except the IBM i security officer to perform the
    User Management function of the Operator Replay menu.
-   Carefully control the user profiles entered into the User Management
    function of the Operator Replay menu. Keep in mind that this user
    registration is also used for functions such as the IBM i LSAM
    support for IBM i FTP jobs. This may mean that the Operator Replay
    script functions should not be configured with a user profile that
    has been registered for the purpose of using FTP, because the
    authority required for FTP may be too extensive for use with a
    Replay script.
-   Carefully control which user profiles are allowed to execute
    Operator Repay scripts from OpCon/xps jobs.

In general, the IBM i LSAM Operator Replay function scripts are still
controlled by IBM i object authority and user security. This is possible
because the LSAM server that executes operator replay scripts actually
only logs the user onto a virtual terminal. Once that step is completed,
the script commands are submitted to the virtual terminal as if the
replay user profile were typing them on a workstation keyboard. IBM i
will reject any violation of user security or object authority rules,
and this will cause the operator replay session to end abnormally.

### Restricted Mode

The IBM i LSAM support for Restricted Mode operations is based on the
use of action scripts that are recorded in LSAM database files in its
IBM i UDB DB2 database. Scripts could contain virtually any command or
program call supported by IBM i, similar to the Operator Replay scripts.
This feature can be protected against security breaches by the following
practices:

-   Always restrict who may have access to the Restricted Mode script
    maintenance function.
-   Always restrict who may have access to the Restricted Mode script
    master file.
-   Do not allow anyone except the IBM i security officer or an
    authorized LSAM Administrator to perform the Setup Environment
    function of the Operator Replay menu. The LSAM Administrator will be
    able to perform this function as long as the LSAM Administrator is a
    super user with \*ALLOBJ authority. This is generally acceptable,
    but it may be worthy of review in very high security environments.

In general, the IBM i LSAM Restricted Mode function scripts are still
controlled by IBM i object authority and user security. This is possible
because the LSAM server programs that execute operator replay scripts do
not assume any authority that is not already granted to the special
restricted mode user SMASAV. IBM i will reject any violation of user
security or object authority rules, and this will cause the restricted
mode session to end abnormally. However, by definition, the SMASAV user
profile has some powerful authority in order to be used to perform
restricted mode operations, so emphasis is placed on careful control of
the LSAM Restricted Mode scripts maintenance and master file.

 

The Restricted Mode operation is also protected by the way the IBM i
console job functions when the special user profile SMASAV has signed
on. The console does not permit the SMASAV user to exit from control of
the LSAM restricted mode driver program. It is not possible for anyone
to gain access to general command entry from the SMASAV session on the
IBM i console device.

### Multi-Step Job Script

The Multi-Step Job Script feature of the IBM i LSAM is based on the use
of action scripts that are recorded in LSAM database files in its IBM i
DB2 database. Scripts could contain virtually any command or program
call supported by IBM i. This feature can be protected against security
breaches by the following practices:

-   Always restrict who may have access to the Multi-Step Job Script
    maintenance function.
-   Always restrict who may have access to the Multi-Step Job Scripts -
    Steps master file.
-   Carefully control which user profiles are allowed to execute
    Multi-Step Job Scripts from OpCon jobs.

The IBM i LSAM Multi-Step Job Scripts are still controlled by IBM i
object authority and user security. However, this useful utility will
typically require some user profile configuration and changes to the
LSAM Object Authority (LSAM sub-menu 9, option 8), because the Job User
defined in the OpCon job master record must have authority to use the
LSAM command STRMLTJOB and the command driver program STRMLTJOBC.

 

The script job user must also have authority to any commands and
software applications (including their files) that will be utilized by a
script. Therefore, if the job user profile does not already have
authority to use objects owned by the LSAM server user profile SMANET,
then the LSAM object authority function must be used to grant \*USE
authority to the script job user profile for both the command and its
driver program. In addition, the driver program STRMLTJOBC should be
changed to run under the \*OWNER authority (where the owner can
typically be left set to SMANET), so that the job user will not need
separate authority for any of the files and sub-programs utilized by the
LSAM Multi-Step Job Script feature. For additional questions and advice,
please contact SMA Support.

## Object Authority Screens and Windows

The LSAM menu 9: PTF and Security menu, is documented in [LSAM Software Maintenance (PTFs)](LSAM-Software-Maintenance-(PTFs).md){.MCXref
.xref}. This section documents menu 9, option 8: Work with object
authority.

### Work with Object Authority

-   **Screen Title**: Work with LSAM DB2 Special Object Authorities
-   **Screen ID**: LSAAUTR1

The Work with object authority function lists objects that require
authority beyond the basic, restricted LSAM object authority profile.
The list also includes objects that are located in the LSAM utility
library, SMAGPL, even if they do not require special authority. Objects
marked in the GPL column are always located in the SMAGPL library if the
GPL option is 2, but they may be located in the IBM i QGPL library (or
another utility library - not commonly used) if the option is 1.

###### Menu Pathways

Main Menu \> PTF and Security menu (\#9) \> Work with object authority
(\#8)

###### Fields

  Field            Description
  ---------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Subset           Shows the current subset rule in effect. Use function key \<**F15**\> to change the subset rule that controls the list content on display.
  Search content   Type in a value that will be used to search the entire content of every record on the display (limited only by the current subset rule). Even data that does not appear in the list display is searched. Use option 5=Display to see all the details for a record discovered by the search. Function key \<**F16**\> can be used to continue a search after the first record is found.
  Opt              Type one of the options listed at the top of the display to act on an individual record in the list. More than one option may be typed at once before the \<**Enter**\> key is pressed to initiate the option actions.
  Object           The name of the object. Use function key \<**F11**\> to change the list between sorting on Object name or sorting on Object type (as the primary sort key for the list).
  Type             The abbreviation for the IBM i operating system object type.
  Attribute        The abbreviation for the IBM i operating system object sub-type, such as the type of source code used to compile a program (for example, RPGLE = ILE RPG program).
  GPL              An indicator that marks an object for location outside of the LSAM environment libraries, SMADTA or SMAPGM. An object marked with a 1 or a 2 is installed, by default, in the LSAM utility library SMAGPL, but objects of type 1 may optionally be relocated to the IBM i library QGPL.
  CMD              An indicator (\'1\') that enables an object to be linked to additional, specialized object authority commands. An object must have this indicator set to \'1\' before external object authority commands may be entered to extend the definition of the object\'s authority.
  Owner            The name of the user profile that is the owner of the object. Most LSAM objects are owned by the LSAM server user profile, SMANET, but some objects may be owned by QSECOFR in order that the USRPRF field can be set to \*OWNER, enabling a program to execute with security officer authority.
  USRPRF           The User Profile attribute assigned to objects of type \*PGM (program). When this field is set to the value of \*OWNER, a program will execute using the object owner\'s authority, rather than the calling user\'s authority. This technique is required in order for the LSAM to perform certain system control functions without requiring that the authorized user have extended authority.
  Public Aut       The authority assigned to the \*PUBLIC user profile category.

  :  

###### Options

-   **1=Apply**: Selects an object to which all the assigned authorities
    will be applied when the \<**Enter**\> key is pressed.
-   **2=Change**: Change the object authority rules for an object.
-   **3=Copy**: Select an object whose authority profile will be copied
    to a new object that is being added to the list.
-   **4=Delete**: Remove an object (and any associated external
    commands) from the LSAM master file.
-   **5=Display**: Display all the details of the object authority
    profile (except not the external commands - refer to option 7).
-   **7=Commands**: Allowed only for objects that have the CMD flag set
    to \'1\', this option branches to the Work with external object
    authority commands function, where additional commands may be
    registered to customize the authority of a given object.
-   **8/9=Copy cmds fr/to**: These two options are used as a pair to
    select one object as 8=from and another object as 9=to, in order to
    copy all the external commands from one object to another. These
    options may only be used when both objects have the CMD option flag
    set to \'1\'. Be sure to use option 2=Change to set on the CMD
    option for the To-object before attempting to copy commands to it
    from another object that already has a set of external commands.

###### Functions

-   **F3=Exit**: Quits the list display and returns to the menu. Any
    options already completed will still apply.
-   **F5=Refresh**: Reload the display from the database file, clearing
    any pending options that were previously entered but not executed.
    This function key also resets any search rule that is in effect, but
    it does not reset the current subset rule.
-   **F6=Add**: Branch to a blank screen where a new object may be
    registered.
-   **F9=Print**: Print a report that shows all the objects currently
    selected by the subset rule that is in effect. A print options
    window will appear, permitting a selection to include any external
    commands on the printed report, or to print only the primary object
    authority profile. The printed report shows more data from each
    object authority record than appears on the displayed list,
    providing a convenient record and audit report of the current LSAM
    special object authority base line.
-   **F11=Sort Type**: Use this function key to toggle between sorting
    the list by object name, or by object type. The heading line on the
    list uses a pink color to show which sort option is currently in
    effect.
-   **F12=Cancel**: Quit the list display return to the menu without
    executing any remaining options that may have been entered. Options
    previously executed will still apply.
-   **F15=Subset**: Change the current list subset rule, or clear
    subsetting to show all records. The current subset rule that is in
    effect is shown in the Subset field at the top, left of the list
    display. Refer to window description, below.
-   **F16=Search next**: This function key or the \<**Enter**\> key may
    be used to start a search when a value has been entered in the
    Search content field, but only \<**F16**\> may be used to continue
    the search on to the next matching record after the first match has
    been found.
-   **F17=Top**: Move the list display to the first record in the list.
-   **F18=Bottom**: Move the list display to the last record in the
    list.
-   **F21=Backup/Restore menu**: Branch to a utility menu that supports
    manage of backing up and restoring the object authority master
    files, for use when users will make changes to the defaults.

#### F15=Subset Object List Window

-   **Screen Title**: Subset Object List
-   **Screen ID**: LSAAUTW1

Use the function F15=Subset to limit the records appearing in the list
of LSAM Object Authorities.

###### Menu Pathways

Main Menu \> PTF and Security menu (\#9) \> Work with object authority
(\#8) \> F15=Subset

###### Fields

+-----------------+---------------------+----------------------------+
| Field           | Default             | Description                |
+=================+:===================:+============================+
| Select subset   | current subset rule | Type a number from the     |
|                 |                     | list of options in the     |
|                 |                     | window to select the       |
|                 |                     | subset rule. Option 7      |
|                 |                     | (show all) is used to      |
|                 |                     | clear subset rules and     |
|                 |                     | show a list of the entire  |
|                 |                     | LSAM object authority      |
|                 |                     | master file.               |
+-----------------+---------------------+----------------------------+
| 2\. SMAGPL Loc: | blank               | When subset option 1 has   |
|                 |                     | been selected, optionally  |
|                 |                     | type a 1 or a 2 in this    |
|                 |                     | field to subset the        |
|                 |                     | objects to one specific    |
|                 |                     | location. Blank in this    |
|                 |                     | field shows all objects    |
|                 |                     | that are located in any    |
|                 |                     | LSAM utility library.      |
|                 |                     | Values are:                |
|                 |                     |                            |
|                 |                     | -   1 = Object located in  |
|                 |                     |     the SMAGPL (or QGPL)   |
|                 |                     |     library, including     |
|                 |                     |     LSAM environment       |
|                 |                     |     management utilities.  |
|                 |                     | -   2 = Object located in  |
|                 |                     |     the \"SMAUTL\"         |
|                 |                     |     (SMAGPL) library, such |
|                 |                     |     as PTF utilities.      |
+-----------------+---------------------+----------------------------+
| 6\. User:       | blank               | Type a user profile name   |
|                 |                     | that has been assigned to  |
|                 |                     | any of the three available |
|                 |                     | User ID n fields. This     |
|                 |                     | field also accepts a value |
|                 |                     | of \*PUBLIC in order to    |
|                 |                     | subset the list based on   |
|                 |                     | Pubic Aut not equal        |
|                 |                     | \*EXCLUDE.                 |
|                 |                     |                            |
|                 |                     |                            |
|                 |                     |                            |
|                 |                     | **Note**: The User ID 1    |
|                 |                     | field is used by the LSAM  |
|                 |                     | to define the set of       |
|                 |                     | authorities for the system |
|                 |                     | operator, QSYSOPR. Type    |
|                 |                     | QSYSOPR in this field to   |
|                 |                     | see which objects have     |
|                 |                     | this assignment.           |
+-----------------+---------------------+----------------------------+

:  

###### Functions

**F12=Cancel**: Quits the subset window and return to the list display
without changing the subset rule.

### Add/Change/Copy Object Authority Details

-   **Screen Title**: Maintain LSAM DB2 Object Authority Details: COPY
-   **Screen ID**: LSAAUTR3

The Maintain Object Authority Details screen is show in Add, Change or
Copy mode. Add and Copy mode will add a new record to the file, but in
Copy mode, care must be taken to change the key fields (Object name,
object type and object attribute) to avoid attempting to add a duplicate
record. In change mode, the key fields may not be changed.

###### Menu Pathways

Main Menu \> PTF and Security menu (\#9) \> Work with object authority
(\#8) \> F6=Add **- or -** option 2=Change **- or -** option 3=Copy.

###### Fields

+----------------------+----------------------+----------------------+
| Field                | Default              | Description          |
+======================+:====================:+======================+
| Maintenance function | Based on option or   | ADD, COPY, or        |
|                      | function key         | CHANGE. The screen   |
|                      |                      | format title         |
|                      |                      | reflects the mode of |
|                      |                      | this screen, based   |
|                      |                      | on the option        |
|                      |                      | (2=Change, 3=Copy)   |
|                      |                      | or function key      |
|                      |                      | (F6=Add) executed    |
|                      |                      | from the list        |
|                      |                      | display. In Add      |
|                      |                      | mode, the screen     |
|                      |                      | fields are blank or  |
|                      |                      | zeros, except for    |
|                      |                      | initialized default  |
|                      |                      | values.              |
+----------------------+----------------------+----------------------+
| @ library            | SMADTA               | The name of the LSAM |
|                      |                      | database library     |
|                      |                      | where the object     |
|                      |                      | authority management |
|                      |                      | files are stored.    |
+----------------------+----------------------+----------------------+
| Object name          | n/a                  | The name of the IBM  |
|                      |                      | i object, such as a  |
|                      |                      | program or file.     |
+----------------------+----------------------+----------------------+
| Object type          | n/a                  | The IBM i object     |
|                      |                      | type mnemonic, for   |
|                      |                      | example, \*PGM =     |
|                      |                      | program, \*FILE =    |
|                      |                      | file (could be a     |
|                      |                      | database file or     |
|                      |                      | other file           |
|                      |                      | sub-type), \*CMD =   |
|                      |                      | command.             |
+----------------------+----------------------+----------------------+
| Object attribute     | n/a                  | The IBM i object     |
|                      |                      | sub-type mnemonic,   |
|                      |                      | for example, under   |
|                      |                      | the object type of   |
|                      |                      | \*FILE, there can    |
|                      |                      | be: PF = physical    |
|                      |                      | file, LF = logical   |
|                      |                      | file (data view),    |
|                      |                      | DSPF = display file, |
|                      |                      | PRTF = printer file, |
|                      |                      | etc.                 |
+----------------------+----------------------+----------------------+
| Located in GPL       | None (1 -- 999)      | -   This flag is     |
|                      |                      |     controlled by    |
|                      |                      |     SMA and may not  |
|                      |                      |     be set by        |
|                      |                      |     software users.  |
|                      |                      |     It defines the   |
|                      |                      |     set of objects   |
|                      |                      |     that are         |
|                      |                      |     installed in the |
|                      |                      |     central, common  |
|                      |                      |     LSAM utilities   |
|                      |                      |     library (default |
|                      |                      |     name SMAGPL).    |
|                      |                      |     LSAM objects     |
|                      |                      |     that are located |
|                      |                      |     in SMAGPL are    |
|                      |                      |     registered in    |
|                      |                      |     the LSAM Object  |
|                      |                      |     Authority        |
|                      |                      |     management       |
|                      |                      |     master file,     |
|                      |                      |     even if their    |
|                      |                      |     authority        |
|                      |                      |     profile is       |
|                      |                      |     simply the LSAM  |
|                      |                      |     defaults.        |
|                      |                      | -   The GPL flag     |
|                      |                      |     specifies object |
|                      |                      |     locations, as    |
|                      |                      |     follows:         |
|                      |                      |     -   0 = no:      |
|                      |                      |         located in   |
|                      |                      |         either the   |
|                      |                      |         LSAM         |
|                      |                      |         database     |
|                      |                      |         library      |
|                      |                      |         (SMADTA) or  |
|                      |                      |         the LSAM     |
|                      |                      |         program      |
|                      |                      |         objects      |
|                      |                      |         library      |
|                      |                      |         (SMAPGM),    |
|                      |                      |         depending on |
|                      |                      |         the object   |
|                      |                      |         type and     |
|                      |                      |         attribute.   |
|                      |                      |     -   1 = GPL:     |
|                      |                      |         located in   |
|                      |                      |         the SMAGPL   |
|                      |                      |         library, but |
|                      |                      |         this object  |
|                      |                      |         qualifies    |
|                      |                      |         for          |
|                      |                      |                      |
|                      |                      |        user-selected |
|                      |                      |         optional     |
|                      |                      |         relocation   |
|                      |                      |         to the IBM i |
|                      |                      |         library QGPL |
|                      |                      |         (or other    |
|                      |                      |         library, as  |
|                      |                      |         identified   |
|                      |                      |         by the data  |
|                      |                      |         area         |
|                      |                      |                      |
|                      |                      |      SMADTA/SMAGPL). |
|                      |                      |     -   2 = UTL:     |
|                      |                      |         always       |
|                      |                      |         located in   |
|                      |                      |         the SMAGPL   |
|                      |                      |         library (or  |
|                      |                      |         other        |
|                      |                      |         library      |
|                      |                      |         name, as     |
|                      |                      |         identified   |
|                      |                      |         by the data  |
|                      |                      |         area         |
|                      |                      |                      |
|                      |                      |      SMADTA/SMAUTL), |
|                      |                      |         and not      |
|                      |                      |         qualified    |
|                      |                      |         for          |
|                      |                      |         relocation   |
|                      |                      |         to the IBM i |
|                      |                      |         library      |
|                      |                      |         QGPL.        |
+----------------------+----------------------+----------------------+
| Use ext command      | 0 = No               | This flag field must |
|                      |                      | be manually set to   |
|                      |                      | \'1\' = Yes to allow |
|                      |                      | entry of external    |
|                      |                      | authority commands   |
|                      |                      | as an extension to   |
|                      |                      | the basic definition |
|                      |                      | of LSAM object       |
|                      |                      | authority.           |
+----------------------+----------------------+----------------------+
| Object owner         | SMANET               | Most LSAM objects    |
|                      |                      | are owned by the     |
|                      |                      | LSAM server user     |
|                      |                      | profile, SMANET.     |
|                      |                      | Certain program      |
|                      |                      | objects are          |
|                      |                      | designated as owned  |
|                      |                      | by QSECOFR so that   |
|                      |                      | the owner\'s         |
|                      |                      | authority can be     |
|                      |                      | used to complete     |
|                      |                      | restricted system    |
|                      |                      | operations tasks     |
|                      |                      | without requiring    |
|                      |                      | that any user        |
|                      |                      | profile (that has a  |
|                      |                      | password) needs to   |
|                      |                      | be authorized to     |
|                      |                      | secured system       |
|                      |                      | commands.            |
+----------------------+----------------------+----------------------+
| Run-time USRPRF      | \*USER               | Most LSAM programs   |
|                      |                      | require that the     |
|                      |                      | user, such as a      |
|                      |                      | system operator or   |
|                      |                      | LSAM administrator,  |
|                      |                      | be authorized to use |
|                      |                      | the program and any  |
|                      |                      | objects such as      |
|                      |                      | files that the       |
|                      |                      | program will use.    |
|                      |                      | Some LSAM programs   |
|                      |                      | are compiled to      |
|                      |                      | adopt the program    |
|                      |                      | \*OWNER authority so |
|                      |                      | that otherwise       |
|                      |                      | restricted commands  |
|                      |                      | and functions may be |
|                      |                      | used in a predefined |
|                      |                      | way without having   |
|                      |                      | to grant general use |
|                      |                      | authority to an      |
|                      |                      | operator or          |
|                      |                      | administrator. The   |
|                      |                      | object owner         |
|                      |                      | authority can be     |
|                      |                      | either SMANET or     |
|                      |                      | QSECOFR.             |
+----------------------+----------------------+----------------------+
| PUBLIC authority     | \*EXCLUDE            | Most LSAM programs   |
|                      |                      | are installed with   |
|                      |                      | the \*PUBLIC user    |
|                      |                      | authority revoked.   |
|                      |                      | Some very basic LSAM |
|                      |                      | operations control   |
|                      |                      | programs are         |
|                      |                      | authorized for the   |
|                      |                      | public to \*USE. To  |
|                      |                      | see a list of        |
|                      |                      | objects authorized   |
|                      |                      | for public use, use  |
|                      |                      | the function         |
|                      |                      | F15=Subset and enter |
|                      |                      | \*PUBLIC in the User |
|                      |                      | subset option: 6.    |
|                      |                      | User: [\*PUBLIC      | |                      |                      | \_]{.ul} .           |
+----------------------+----------------------+----------------------+
| SMANET Authority     | \*ALL                | All LSAM objects are |
|                      |                      | owned by user        |
|                      |                      | SMANET. This field   |
|                      |                      | defines one of the   |
|                      |                      | default LSAM object  |
|                      |                      | authority            |
|                      |                      | parameters. A        |
|                      |                      | different value in   |
|                      |                      | this field would     |
|                      |                      | normally only appear |
|                      |                      | for user-defined     |
|                      |                      | objects added to the |
|                      |                      | LSAM object          |
|                      |                      | authority master     |
|                      |                      | file.                |
+----------------------+----------------------+----------------------+
| SMASAV authority     | blank                | The SMASAV user      |
|                      |                      | profile is provided  |
|                      |                      | specifically for use |
|                      |                      | with LSAM Restricted |
|                      |                      | Mode operations. The |
|                      |                      | LSAM objects that    |
|                      |                      | must be used by      |
|                      |                      | SMASAV are granted   |
|                      |                      | the authority        |
|                      |                      | entered in this      |
|                      |                      | field. Use the       |
|                      |                      | function F15=Subset, |
|                      |                      | option 4. SMASAVE    |
|                      |                      | user, to see a list  |
|                      |                      | of objects with this |
|                      |                      | authority.           |
+----------------------+----------------------+----------------------+
| User ID n (user      | blank                | -   Up to 3          |
| profile name)        |                      |     user-defined     |
|                      |                      |     user profile     |
|                      |                      |     names may be     |
|                      |                      |     added to the     |
|                      |                      |     basic LSAM       |
|                      |                      |     object authority |
|                      |                      |     profile master   |
|                      |                      |     record. This     |
|                      |                      |     field and its    |
|                      |                      |     associated type  |
|                      |                      |     of authority     |
|                      |                      |     help to reduce   |
|                      |                      |     the requirement  |
|                      |                      |     for many         |
|                      |                      |     external         |
|                      |                      |     commands in      |
|                      |                      |     order to define, |
|                      |                      |     for example, a   |
|                      |                      |     user-defined     |
|                      |                      |     LSAM Operator    |
|                      |                      |     and an LSAM      |
|                      |                      |     Administrator    |
|                      |                      |     (refer to        |
|                      |                      |     discussions      |
|                      |                      |     earlier in this  |
|                      |                      |     topic for a      |
|                      |                      |     definition of    |
|                      |                      |     these potential  |
|                      |                      |     user profiles).  |
|                      |                      | -   User ID 1 is     |
|                      |                      |     typically used   |
|                      |                      |     by the LSAM to   |
|                      |                      |     define the       |
|                      |                      |     authorities for  |
|                      |                      |     QSYSOPR. Use the |
|                      |                      |     function         |
|                      |                      |     F15=Subset and   |
|                      |                      |     type QSYSOPR     |
|                      |                      |     into option 6.   |
|                      |                      |     User:, to see    |
|                      |                      |     the list of      |
|                      |                      |     objects that     |
|                      |                      |     QSYSOPR is       |
|                      |                      |     authorized to    |
|                      |                      |     use.             |
|                      |                      | -   User ID 2 and 3: |
|                      |                      |     Available for    |
|                      |                      |     any user-defined |
|                      |                      |     user profile     |
|                      |                      |     name. A group    |
|                      |                      |     profile name     |
|                      |                      |     could be entered |
|                      |                      |     in one of these  |
|                      |                      |     fields. To       |
|                      |                      |     define more than |
|                      |                      |     these two user   |
|                      |                      |     profile          |
|                      |                      |     authority sets,  |
|                      |                      |     use external     |
|                      |                      |     commands.        |
+----------------------+----------------------+----------------------+
| User ID n/Auth       | blank                | One general          |
|                      |                      | authority, typically |
|                      |                      | \*USE, that is       |
|                      |                      | assigned to the user |
|                      |                      | profile named in     |
|                      |                      | User ID fields 1 -   |
|                      |                      | 3. Refer to          |
|                      |                      | discussion above     |
|                      |                      | about the User ID n  |
|                      |                      | field. External      |
|                      |                      | commands can be used |
|                      |                      | to further refine    |
|                      |                      | the authority        |
|                      |                      | assigned to this, or |
|                      |                      | any other user       |
|                      |                      | profile.             |
|                      |                      |                      |
|                      |                      |                      |
|                      |                      |                      |
|                      |                      | Managing authority   |
|                      |                      | by Authorization     |
|                      |                      | List instead of User |
|                      |                      | Name:                |
|                      |                      |                      |
|                      |                      |                      |
|                      |                      |                      |
|                      |                      | This second field,   |
|                      |                      | the / AUTH value,    |
|                      |                      | can be set to the    |
|                      |                      | special value of     |
|                      |                      | \*AUTH. When \*AUTH  |
|                      |                      | is entered as the    |
|                      |                      | authority value,     |
|                      |                      | this tells the Agent |
|                      |                      | that the User ID     |
|                      |                      | field contains the   |
|                      |                      | name of an           |
|                      |                      | Authorization List,  |
|                      |                      | rather than a single |
|                      |                      | user. When this      |
|                      |                      | Agent authority      |
|                      |                      | profile is applied   |
|                      |                      | to the object, the   |
|                      |                      | IBM i system assigns |
|                      |                      | that object to an    |
|                      |                      | existing             |
|                      |                      | Authorization List,  |
|                      |                      | where the system     |
|                      |                      | administrator has    |
|                      |                      | already configured a |
|                      |                      | profile of objects   |
|                      |                      | and their authority  |
|                      |                      | that will be         |
|                      |                      | allowed.             |
|                      |                      |                      |
|                      |                      |                      |
|                      |                      |                      |
|                      |                      | NOTES:               |
|                      |                      |                      |
|                      |                      | 1.  The other        |
|                      |                      |     multi-object     |
|                      |                      |     authority        |
|                      |                      |     management       |
|                      |                      |     strategy of      |
|                      |                      |     using a Group    |
|                      |                      |     User Profile can |
|                      |                      |     be supported by  |
|                      |                      |     simply typing in |
|                      |                      |     the name of the  |
|                      |                      |     Group User       |
|                      |                      |     Profile into one |
|                      |                      |     of the three     |
|                      |                      |     User ID fields.  |
|                      |                      |     In this case,    |
|                      |                      |     the AUTH field   |
|                      |                      |     would be used    |
|                      |                      |     for its normal   |
|                      |                      |     purpose of       |
|                      |                      |     naming the       |
|                      |                      |     specific         |
|                      |                      |     authority to be  |
|                      |                      |     granted.         |
|                      |                      | 2.  Remember that    |
|                      |                      |     since it may not |
|                      |                      |     be possible to   |
|                      |                      |     configure every  |
|                      |                      |     type of complex  |
|                      |                      |     authority matrix |
|                      |                      |     using only this  |
|                      |                      |     single object    |
|                      |                      |     authority        |
|                      |                      |     record, the      |
|                      |                      |     Agent supports   |
|                      |                      |     virtually any    |
|                      |                      |     kind of object   |
|                      |                      |     authority        |
|                      |                      |     strategy that    |
|                      |                      |     may be desired   |
|                      |                      |     by allowing any  |
|                      |                      |     number of IBM i  |
|                      |                      |     Commands to be   |
|                      |                      |     attached to the  |
|                      |                      |     object authority |
|                      |                      |     master record.   |
|                      |                      |     This is          |
|                      |                      |     explained        |
|                      |                      |     further within   |
|                      |                      |     this chapter of  |
|                      |                      |     documentation.   |
+----------------------+----------------------+----------------------+
| Date last maint      | system time stamp    | The date and time    |
|                      |                      | that the object      |
|                      |                      | authority record was |
|                      |                      | last updated.        |
+----------------------+----------------------+----------------------+

:  

###### Functions

-   **F3=Exit**: Quits the maintenance function without update and
    returns to the menu.
-   **F5=Refresh**: Restores the field content to the last updated
    values of the master record. This function key will not roll back a
    record to values before the last completed update, but it can clear
    data that was entered before the \<**Enter**\> key was pressed.
-   **F12=Cancel**: Quits the maintenance function without update and
    returns to the list display.

### Option 7=Work with Object Authority Commands

-   **Screen Title**: Work with LSAM DB2 Object Authority Commands
-   **Screen ID**: LSAAUTCR1

The option to work with object authority (external) commands is only
available for objects that have the EXT flag field set to a value of
\'1\'. This screen is used to add, change, copy or delete any number of
commands that will be executed every time an LSAM utility is request to
set the authority of the named object. A separate LSAM database file
keyed by the object name, type and attribute is used to store all the
external commands for an object. When F6=Add or options 2=Change or
3=Copy are used, the detail screen for command entry supports the
function key F4=Prompt that engages the IBM i command prompting routines
so that command keywords and parameter values can be easily formatted.
The IBM i help text for commands is also available during this prompting
mode.

###### Menu Pathways

Main Menu \> PTF and Security menu (\#9) \> Work with object authority
(\#8) \> option 7=commands

###### Fields

  Field            Description
  ---------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  @ library        The name of the LSAM database library where the object authority management files are stored.
  Search content   Type in a value that will be used to search the entire content of every record on the display (limited only by the current subset rule). Even data that does not appear in the list display is searched. Use option 5=Display to see all the details for a record discovered by the search. Function key \<**F16**\> can be used to continue a search after the first record is found.
  Object name      The name of the object selected from the list of object authorities by option 7.
  Type             The IBM i mnemonic for the type of the object name.
  Attribute        The IBM i mnemonic for the sub-type of the object name and type.
  Opt              Type one of the options listed at the top of the display to act on an individual record in the list. More than one option may be typed at once before the \<**Enter**\> key is pressed to initiate the option actions.
  Command text     The first several characters of the external command. Use option 5=Display to view the entire command.

  :  

###### Options

-   **2=Change**: Change the command, starting with the existing command
    on file.
-   **3=Copy**: Copy the selected command to a new external command
    record linked to the same object name. This makes it easy to build
    another, similar command by only changing one or more parameters of
    the copied command. To copy commands from one object name to
    another, use options 8 and 9 on the list of LSAM special object
    authorities (described above).
-   **4=Delete**: Remove the external command from the LSAM master file.
-   **5=Display**: Display entire command syntax.

###### Functions

-   **F3=Exit**: Quits the list display and returns to the menu. Any
    options already completed will still apply.
-   **F5=Refresh**: Reload the display from the database file, clearing
    any pending options that were previously entered but not executed.
    This function key also resets any search rule that is in effect, but
    it does not reset the current subset rule.
-   **F6=Add**: Branch to a blank screen where a new command may be
    registered.
-   **F12=Cancel**: Quit the external command list display return to the
    special object authorities list display without executing any
    remaining options that may have been entered. Options previously
    executed will still apply.
-   **F16=Search next**: This function key or the \<**Enter**\> key may
    be used to start a search when a value has been entered in the
    Search content field, but only \<**F16**\> may be used to continue
    the search on to the next matching record after the first match has
    been found.
-   **F17=Top**: Move the list display to the first record in the list.
-   **F18=Bottom**: Move the list display to the last record in the
    list.

#### Add/Change/Copy Object Authority Commands

-   **Screen Title**: Maintain LSAM DB2 Object Authority Command: CHANGE
-   **Screen ID**: LSAAUTCR3

The detail screen for command entry supports the function key F4=Prompt
that engages the IBM i command prompting routines so that command
keywords and parameter values can be easily formatted. The IBM i help
text for commands is also available during this prompting mode.

###### Menu Pathways

Main Menu \> PTF and Security menu (\#9) \> Work with object authority
(\#8) \> option 7=commands \> option 2=Change **- or -** option 3=Copy
*- or -* F6=Add

###### Fields

  Field         Description
  ------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------
  Mode          Add, Change or Copy, based on the option or function key executed from the list of external commands.
  @ library     The name of the LSAM database library where the object authority management files are stored.
  Object name   The name of the object selected from the list of object authorities by option 7.
  Type          The IBM i mnemonic for the type of the object name.
  Attribute     The IBM i mnemonic for the sub-type of the object name and type.
  Key           For technical support use only, the record sequence key value, within the file object name-type-attribute, of the external commands database file record.
  Command       The entire external command is shown on this screen. The final command format cannot be longer than what will fit in this one, large data entry field.
  Maint         The system time stamp when this command record was last updated.

  :  

###### Functions

-   **F3=Exit**: Quits the detail display and returns to the menu. Any
    updates already completed will still apply.
-   **F4=Prompt**: Branches to the IBM i command prompting mode. The
    prompt screen is entirely controlled by IBM i command processing and
    is not documented here. When \<**Enter**\> is pressed from the
    prompting screen, the completed command parameter fields will be
    returned to the command detail screen in the proper command format.
    The command record is not updated until \<**Enter**\> is pressed
    from the detail screen after prompting has been completed.
-   **F5=Refresh**: Reload the display from the database file, clearing
    any pending changes that were previously typed but not committed.
-   **F12=Cancel**: Quit the external command detail display and return
    to the list display without completing any add or update of the
    command. Updates previously executed will still apply.

### F21=Backup/Restore Menu

Object Authority Backup/Restore Menu

  ---------------------------------------------------------------------------------------------------------------------------------------
   [LSAAUTRB]{style="color: #008000;"}           Backup/Restore Object Authority Files     [00/00/00 00:00:00]{style="color: #008000;"}                                 [@ library:]{style="color: #008000;"} [SMADTA]{style="color: #ff00ff;"}
   
  Select one of the following options and press Enter to continue.
   
       1. [Display SMA defaults (BASE)]{style="color: #008000;"}    
       2. [Restore SMA defaults ]{style="color: #008000;"}            Replace live master file content with original default definitions
           of object authority. Current file content will be backed up to
           files named \'AyMMddhhmm\' and \'ByMMddhhmm\' where \'yMMddhhmm\' is a
           time stamp of year, month, day, hours and minutes.
   
       3. [Backup current definitions]{style="color: #008000;"}            Copy the contents of the current live LSAM object authority master
           files to the user backup files LSAAUTF00U and LSAAUTF10U.
   
       4. [Restore last backup]{style="color: #008000;"}            Replace the content of the current live LSAM object authority
           master files from the user backup files LSAAUTF00U and LSAAUTF10U.
   
   [Selection:]{style="color: #008000;"} [\_\_]{style="color: #ffcc00;"}    F3=Exit  F12=Cancel
  ---------------------------------------------------------------------------------------------------------------------------------------

This sub-menu provides convenient support for clients who need to add
site-specific object authorities, or to change the SMA defaults for the
IBM i LSAM. SMA does not recommend changing the default object
authorities of LSAM software, but it recognizes that high security sites
may have important reasons to do so. The menu options in the example
above offer an explanation of the available procedures. Please contact
SMA Support for more information, if required.

###### Menu Pathways

Main Menu \> PTF and Security menu (\#9) \> Work with object authority
(\#8) \> F21=Backup/Restore menu

###### Fields

  Field       Description
  ----------- --------------------------------------------------------------------------------
  Selection   Type one of the four options and press \<**Enter**\> to execute that function.

  :  

###### Functions

-   **F3=Exit**: Quits the sub-menu display and returns to the previous
    menu. Any functions already completed will still apply.
-   **F12=Cancel**: Quit the sub-menu display and return to the Work
    with \...Object Authorities list display.
:::

 


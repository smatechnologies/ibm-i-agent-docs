---
lang: en-us
title: Commands and Utilities
viewport: width=device-width, initial-scale=1.0
---

# Commands and Utilities

## LSAM Commands, APIs

[]{#aanchor25} The IBM i LSAM supports many of its functions and actions with IBM i commands that may be used interactively or included in user
programs. These commands become an application program interface (API)
to OpCon/xps and to the LSAM itself, enabling very tight integration
between clients\' applications and the OpCon/xps strategy for
synchronizing all enterprise operations. In most cases, the commands can
be run either interactively or in batch mode.

 

  ------------------------------------------------------------------------------------------------------------------------------ --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White \"X\" icon on red circular background](../../../Resources/Images/warning-icon(48x48).png "Warning icon")   **WARNING:** [Many of the LSAM Commands may require that the IBM i job\'s library list be set to reference either the default or any one of multiple LSAM environments. Sometimes the requirements of a command can be set by careful configuration of the library attributes associated with a user-written command. In cases where more complex programming is implemented, consider using the SMASETLIBL command that is documented below. Note that this command has a parameter that can cause it to run in silent mode, so that no unexpected messages are generated within the user-written program.]
  ------------------------------------------------------------------------------------------------------------------------------ --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

Most of the IBM i LSAM commands are listed in the table below. Many of
these commands are fully explained and illustrated in the referenced
sections of this document. Certain stand-alone utility commands that
require a careful explanation are documented below the following table.

 

The term API means application program interface. This term refers to
points in a software application where an interface has been prepared
that allows external applications to perform or control the execution of
the home applications functions. Many of the LSAM software functions
have been represented by IBM i commands. These commands could be
programmed into other software applications so that those other
applications can be more tightly integrated with LSAM and OpCon
operations. An excellent example of how that might be accomplished is
explained below the Commands table, in the section about the CPYTOMSGIN
command.

IBM i LSAM Commands

+----------------+----------------+----------------+----------------+
| IBM i LSAM     |                |                |                |
| Commands       |                |                |                |
+================+================+================+================+
| Command Type   | Command        | Name           | Description    |
+----------------+----------------+----------------+----------------+
| LSAM           | LFEEDBACK      | Send LSAM      | Sends          |
| communication  |                | Feedback       | character      |
| to OpCon       |                | character      | string to      |
|                |                | string to      | OpCon as LSAM  |
|                | *(Enhanced for | OpCon          | Feedback       |
|                | use outside of |                | trigger.       |
| *Refer to      | OpCon jobs)*   |                |                |
| topic below.*  |                |                |                |
|                |                |                |                |
|                |                |                |                |
|                |                |                |                |
| Most commands  |                |                |                |
| work only from |                |                |                |
| within a job   |                |                |                |
| started or     |                |                |                |
| tracked by     |                |                |                |
| OpCon.         |                |                |                |
+----------------+----------------+----------------+----------------+
|                | SMAJOBMSG      | Send job       | Sends          |
|                |                | detail message | character      |
|                |                | to OpCon       | string to      |
|                |                |                | OpCon adding   |
|                |                |                | to Detailed    |
|                |                |                | Job Messages   |
|                |                |                | in EM.         |
+----------------+----------------+----------------+----------------+
|                | SMASTATUS      | Send job       | Sends job      |
|                |                | status to      | status for     |
|                |                | OpCon          | display in EM  |
|                |                |                | UI views.      |
+----------------+----------------+----------------+----------------+
|                | SMAFAILJOB     | SMA signal     | This command   |
|                |                | OpCon to Fail  | may be used,   |
|                |                | Job            | for example,   |
|                |                |                | in a           |
|                |                |                | Multi-Step Job |
|                |                |                | Script, to     |
|                |                |                | force an IBM i |
|                |                |                | job to fail.   |
|                |                |                | If OpCon       |
|                |                |                | started the    |
|                |                |                | job, the Agent |
|                |                |                | will then send |
|                |                |                | a \"Failed\"   |
|                |                |                | signal to      |
|                |                |                | OpCon as the   |
|                |                |                | final job      |
|                |                |                | status, and    |
|                |                |                | possibly the   |
|                |                |                | message ID of  |
|                |                |                | SMA0992.       |
+----------------+----------------+----------------+----------------+
| Events         | CPYTOMSGIN     | Copy Event to  | Passes Event   |
|                |                | SAM-SS message | instructions   |
|                |                | input          | to the LSAM    |
|                |                |                | communications |
|                |                |                | program for    |
|                |                |                | forwarding to  |
|                |                |                | SAM-SS.        |
+----------------+----------------+----------------+----------------+
|                | Direct Event   | Refer to the   | Each OpCon/xps |
|                | Commands       | table of Event | Event has been |
|                |                | commands under | implemented by |
|                | ...for         | the topic of   | the IBM i LSAM |
|                | example...     | Event          | as an IBM i    |
|                |                | Management.    | command using  |
|                | JOBRLS,        | Refer to       | the same name  |
|                |                | [Event         | as the Event.  | |                | NTYLOG,        | Manage         | The command    |
|                |                | ment](Events%2 | processor      |
|                | TOKSET         | 0and-Utiliti | program passes |
|                |                | es-Menu.md# | the Event      |
|                |                | Event){.MCXref | instruction to |
|                |                | .xref}.        | the LSAM       |
|                |                |                | communications |
|                |                |                | program for    |
|                |                |                | forwarding to  |
|                |                |                | SAM-SS.        |
+----------------+----------------+----------------+----------------+
| Debug mode,    | STRSMALOG      | Start IBM i    | Refer to [Turn | | logging, log   |                | LSAM Logging   | On Debug       |
| viewers        |                |                | Logging](Log%2 |
|                |                |                | 0File-and- |
|                |                |                | Database-Man |
|                |                |                | agement.md#Tu |
|                |                |                | rn_On_Debug_Lo |
|                |                |                | gging){.MCXref |
|                |                |                | .xref} for     |
|                |                |                | more           |
|                |                |                | information.   |
+----------------+----------------+----------------+----------------+
|                | ENDSMALOG      | End IBM i LSAM | Refer to [Turn | |                |                | Logging        | Off Debug      |
|                |                |                | L              |
|                |                |                | ogging](Log- |
|                |                |                | File-and-D |
|                |                |                | atabase-Mana |
|                |                |                | gement.md#Tur |
|                |                |                | n_Off_Debug_Lo |
|                |                |                | gging){.MCXref |
|                |                |                | .xref} for     |
|                |                |                | more           |
|                |                |                | information.   |
+----------------+----------------+----------------+----------------+
|                | DSPJOBSTS      | Display LSAM   | A formatted    |
|                |                | job status     | viewer for     |
|                |                | master file    | examining the  |
|                |                |                | current status |
|                |                |                | of every job   |
|                |                |                | that has been  |
|                |                |                | managed by the |
|                |                |                | LSAM.          |
|                |                |                | (Replaces      |
|                |                |                | former user    |
|                |                |                | index object.) |
+----------------+----------------+----------------+----------------+
|                | DSPIDXTRC      | Display the    | A data viewer  |
|                |                | user index     | that displays  |
|                |                | utilization    | and interprets |
|                |                | trace log file | trace log      |
|                |                |                | entries for    |
|                |                |                | every action   |
|                |                |                | used to        |
|                |                |                | maintain the   |
|                |                |                | LSAM job       |
|                |                |                | status user    |
|                |                |                | indexes. The   |
|                |                |                | user indexes   |
|                |                |                | (viewed by     |
|                |                |                | SMADSPUSI) are |
|                |                |                | transitory,    |
|                |                |                | but this trace |
|                |                |                | log file, when |
|                |                |                | turned on,     |
|                |                |                | retains a      |
|                |                |                | permanent      |
|                |                |                | history of how |
|                |                |                | the user       |
|                |                |                | indexes were   |
|                |                |                | being used.    |
+----------------+----------------+----------------+----------------+
|                | JORCMNLOG      | Display JORS   | A data viewer  |
|                |                | communications | that lists the |
|                |                | trace log      | entries in the |
|                |                |                | JORS           |
|                |                |                | communications |
|                |                |                | trace log file |
|                |                |                | (JORLOGF00)    |
|                |                |                | and provides   |
|                |                |                | various tools  |
|                |                |                | for            |
|                |                |                | interpreting   |
|                |                |                | the log file   |
|                |                |                | contents. A    |
|                |                |                | detailed       |
|                |                |                | display is     |
|                |                |                | supported to   |
|                |                |                | format each    |
|                |                |                | log entry      |
|                |                |                | according to   |
|                |                |                | its LSAM       |
|                |                |                | transaction    |
|                |                |                | codes.         |
+----------------+----------------+----------------+----------------+
|                | JORTXNLOG      | Display JORS   | A data viewer  |
|                |                | communications | that displays  |
|                |                | transaction    | and interprets |
|                |                | log            | the JORS       |
|                |                |                | communications |
|                |                |                | program        |
|                |                |                | transaction    |
|                |                |                | log file. This |
|                |                |                | file is used   |
|                |                |                | to track       |
|                |                |                | transactions   |
|                |                |                | until they are |
|                |                |                | acknowledged   |
|                |                |                | and turned     |
|                |                |                | over to LSAM   |
|                |                |                | transaction    |
|                |                |                | processing.    |
|                |                |                | The log file   |
|                |                |                | is always in   |
|                |                |                | use by the     |
|                |                |                | LSAM. The      |
|                |                |                | viewer also    |
|                |                |                | supports       |
|                |                |                | inspection of  |
|                |                |                | the Yesterday  |
|                |                |                | version of     |
|                |                |                | this log file. |
+----------------+----------------+----------------+----------------+
|                | LSACMNLOG      | Display Job    | A data viewer  |
|                |                | Scheduler      | that lists the |
|                |                | communications | entries in the |
|                |                | trace log      | Job Scheduler  |
|                |                |                | communications |
|                |                |                | trace log      |
|                |                |                | file,          |
|                |                |                | CMNLOGF00, and |
|                |                |                | provides       |
|                |                |                | various tools  |
|                |                |                | for            |
|                |                |                | interpreting   |
|                |                |                | the log file   |
|                |                |                | contents. A    |
|                |                |                | detailed       |
|                |                |                | display is     |
|                |                |                | supported to   |
|                |                |                | format each    |
|                |                |                | log entry      |
|                |                |                | according to   |
|                |                |                | its LSAM       |
|                |                |                | transaction    |
|                |                |                | codes.         |
+----------------+----------------+----------------+----------------+
|                | LSADSPLOG      | Display LSAM   | A data viewer  |
|                |                | job log        | that lists all |
|                |                | tracking       | the members in |
|                |                |                | the LSAM job   |
|                |                |                | log storage    |
|                |                |                | file,          |
|                |                |                | LSAJORF00.     |
|                |                |                | File LSAJORF10 |
|                |                |                | contains the   |
|                |                |                | index entries  |
|                |                |                | that are       |
|                |                |                | actually shown |
|                |                |                | on the list.   |
|                |                |                | The utility    |
|                |                |                | supports an    |
|                |                |                | option to      |
|                |                |                | display the    |
|                |                |                | contents of    |
|                |                |                | each job log.  |
+----------------+----------------+----------------+----------------+
|                | LSAINPLOG      | Display Job    | A data viewer  |
|                |                | Scheduler      | that displays  |
|                |                | input          | and interprets |
|                |                | transaction    | all the        |
|                |                | log            | formatted      |
|                |                |                | transactions   |
|                |                |                | passed from    |
|                |                |                | the Job        |
|                |                |                | Scheduler      |
|                |                |                | communications |
|                |                |                | program to the |
|                |                |                | LSAM           |
|                |                |                | transaction    |
|                |                |                | manager.       |
+----------------+----------------+----------------+----------------+
|                | LSAJORCTL      | Display spool  | A data viewer  |
|                |                | file           | that displays  |
|                |                | management     | the spool file |
|                |                | control file   | control values |
|                |                |                | sent from      |
|                |                |                | OpCon/xps.     |
+----------------+----------------+----------------+----------------+
|                | LSAJORLOG      | Display job    | A data viewer  |
|                |                | output         | that displays  |
|                |                | retrieval      | a trace of the |
|                |                | activity log   | actions taken  |
|                |                |                | by the LSAM    |
|                |                |                | spool file     |
|                |                |                | server         |
|                |                |                | program. When  |
|                |                |                | turned on this |
|                |                |                | log file can   |
|                |                |                | be helpful to  |
|                |                |                | prove how the  |
|                |                |                | LSAM managed   |
|                |                |                | job logs and   |
|                |                |                | job reports    |
|                |                |                | (spool files), |
|                |                |                | according to   |
|                |                |                | the OpCon/xps  |
|                |                |                | Enterprise     |
|                |                |                | Manager job    |
|                |                |                | master records |
|                |                |                | for IBM i      |
|                |                |                | jobs.          |
+----------------+----------------+----------------+----------------+
|                | LSATXNLOG      | Display Job    | A data viewer  |
|                |                | Scheduler      | that displays  |
|                |                | communications | and interprets |
|                |                | transaction    | the Job        |
|                |                | log            | Scheduler      |
|                |                |                | communications |
|                |                |                | program        |
|                |                |                | transaction    |
|                |                |                | log file. This |
|                |                |                | file is used   |
|                |                |                | to track       |
|                |                |                | transactions   |
|                |                |                | until they are |
|                |                |                | acknowledged   |
|                |                |                | and turned     |
|                |                |                | over to LSAM   |
|                |                |                | transaction    |
|                |                |                | processing.    |
|                |                |                | The log file   |
|                |                |                | is always in   |
|                |                |                | use by the     |
|                |                |                | LSAM. The      |
|                |                |                | viewer also    |
|                |                |                | supports       |
|                |                |                | inspection of  |
|                |                |                | the Yesterday  |
|                |                |                | version of     |
|                |                |                | this log file. |
+----------------+----------------+----------------+----------------+
|                | SMADSPUSP      | Display SMA    | A support      |
|                |                | User Space     | utility        |
|                |                |                | command to     |
|                |                |                | view the       |
|                |                |                | content of the |
|                |                |                | LSACONU01 user |
|                |                |                | space where    |
|                |                |                | the User Name  |
|                |                |                | and Password   |
|                |                |                | for OpCon/xps  |
|                |                |                | external event |
|                |                |                | commands is    |
|                |                |                | stored. This   |
|                |                |                | encrypted      |
|                |                |                | content may be |
|                |                |                | viewed only    |
|                |                |                | with security  |
|                |                |                | officer        |
|                |                |                | authority.     |
+----------------+----------------+----------------+----------------+
|                | SMASUP         | Extract debug  | This command   |
|                |                | log files to   | performs the   |
|                |                | IBM i save     | same function  |
|                |                | file for       | as F15=Extract |
|                |                | delivery to    | log files.     |
|                |                | SMA Support.   | Refer to       |
|                |                |                | [Viewing the   | |                |                |                | LSAM Log       |
|                |                |                | Files](Log%2   |
|                |                |                | 0File-and- |
|                |                |                | Database-Man |
|                |                |                | agement.md#Vi |
|                |                |                | ewing){.MCXref |
|                |                |                | .xref}. Also   |
|                |                |                | refer to       |
|                |                |                | SMARGZ, below. |
+----------------+----------------+----------------+----------------+
|                | DSPSUPDTA      | Display Agent  | This command   |
|                |                | Support Data   | displays the   |
|                |                |                | profile of the |
|                |                |                | Agent that is  |
|                |                |                | shared with    |
|                |                |                | the OpCon      |
|                |                |                | server and     |
|                |                |                | included in    |
|                |                |                | SMASUP log     |
|                |                |                | file extracts. |
|                |                |                | The SMASUP     |
|                |                |                | command must   |
|                |                |                | be run once    |
|                |                |                | before the     |
|                |                |                | data is        |
|                |                |                | available to   |
|                |                |                | display, and   |
|                |                |                | SMASUP is used |
|                |                |                | to refresh the |
|                |                |                | data to        |
|                |                |                | current        |
|                |                |                | levels.        |
+----------------+----------------+----------------+----------------+
| LSAM           | LSAMENU        | Enter LSAM     | Direct entry   |
| Operations     |                | menu system    | to the IBM i   |
|                |                |                | LSAM menus,    |
|                |                |                | bypassing the  |
|                |                |                | splash display |
|                |                |                | and hidden     |
|                |                |                | environment    |
|                |                |                | configuration  |
|                |                |                | steps.         |
+----------------+----------------+----------------+----------------+
|                | STRSMA         | \"Start SMA\"  | Logs on to the |
|                |                | = Enter LSAM   | IBM i LSAM     |
|                |                | menu system    | menus.         |
|                |                |                | Required for   |
|                |                |                | first entry to |
|                |                |                | menus.         |
+----------------+----------------+----------------+----------------+
|                | LSAMENU        | Enter LSAM     | Direct entry   |
|                |                | menu system    | to the IBM i   |
|                |                |                | LSAM menus,    |
|                |                |                | bypassing the  |
|                |                |                | splash display |
|                |                |                | and hidden     |
|                |                |                | environment    |
|                |                |                | configuration  |
|                |                |                | steps.         |
+----------------+----------------+----------------+----------------+
|                | STRCAPJOB      | Start Capture  | Registers a    |
|                |                | Job mode       | workstation or |
|                |                |                | a batch job    |
|                |                |                | name so that   |
|                |                |                | any SBMJOB     |
|                |                |                | command is     |
|                |                |                | intercepted,   |
|                |                |                | not run, but   |
|                |                |                | all job        |
|                |                |                | details are    |
|                |                |                | captured and   |
|                |                |                | stored in the  |
|                |                |                | LSAM database. |
|                |                |                | The Job        |
|                |                |                | Tracking       |
|                |                |                | facility must  |
|                |                |                | be started for |
|                |                |                | this to work.  |
|                |                |                | The LSAM menu  |
|                |                |                | function that  |
|                |                |                | supports this  |
|                |                |                | command        |
|                |                |                | provides a     |
|                |                |                | view of        |
|                |                |                | currently      |
|                |                |                | registered job |
|                |                |                | names.         |
+----------------+----------------+----------------+----------------+
|                | ENDCAPJOB      | End Capture    | Un-registers a |
|                |                | Job mode       | workstation or |
|                |                |                | a batch job so |
|                |                |                | that the       |
|                |                |                | SBMJOB is no   |
|                |                |                | longer         |
|                |                |                | intercepted to |
|                |                |                | capture jobs.  |
+----------------+----------------+----------------+----------------+
|                | STRSMA         | \"Start SMA\"  | Logs on to the |
|                |                | = Enter LSAM   | IBM i LSAM     |
|                |                | menu system    | menus.         |
+----------------+----------------+----------------+----------------+
|                | WRKCAPJOB      | Work with      | Requires the   |
|                |                | Captured jobs  | LSAM library   |
|                |                |                | list. Shows a  |
|                |                |                | list of all    |
|                |                |                | captured job   |
|                |                |                | IDs and        |
|                |                |                | supports       |
|                |                |                | changes to job |
|                |                |                | definitions.   |
+----------------+----------------+----------------+----------------+
|                | WRKSMASVR      | Work with SMA  | This command   |
|                |                | (LSAM) Server  | may be used    |
|                |                | Jobs           | from outside   |
|                |                |                | of the LSAM    |
|                |                |                | menu system.   |
|                |                |                | It displays a  |
|                |                |                | list of LSAM   |
|                |                |                | server jobs    |
|                |                |                | and supports   |
|                |                |                | starting and   |
|                |                |                | stopping       |
|                |                |                | individual     |
|                |                |                | jobs from the  |
|                |                |                | display. The   |
|                |                |                | job \"Groups\" |
|                |                |                | in the list    |
|                |                |                | display match  |
|                |                |                | the PTF server |
|                |                |                | job categories |
|                |                |                | for            |
|                |                |                | stopp          |
|                |                |                | ing/restarting |
|                |                |                | jobs.          |
+----------------+----------------+----------------+----------------+
|                | WRKTRKJOB      | Work with      | This command   |
|                |                | tracked jobs   | may be used    |
|                |                |                | from outside   |
|                |                |                | of the LSAM    |
|                |                |                | menu system.   |
|                |                |                | It             |
|                |                |                | automatically  |
|                |                |                | detects the    |
|                |                |                | LSAM           |
|                |                |                | environment    |
|                |                |                | that is in     |
|                |                |                | control of Job |
|                |                |                | Tracking. The  |
|                |                |                | display        |
|                |                |                | produced by    |
|                |                |                | this command   |
|                |                |                | is the same as |
|                |                |                | from LSAM Menu |
|                |                |                | 1, function 2. |
|                |                |                | Refer to [Job  | |                |                |                | Tracking and   |
|                |                |                | Queuing](Job%2 |
|                |                |                | 0Tracking-an |
|                |                |                | d-Queuing.ht |
|                |                |                | m#top){.MCXref |
|                |                |                | .xref}.        |
+----------------+----------------+----------------+----------------+
| Multiple       | LSAINIT        | Initialize     | -   This       |
| Environment    |                | LSAM           |     command is |
| Management     |                | environment.   |     used to    |
|                |                |                |     configure  |
|                |                |                |     the IBM i  |
|                |                |                |     objects,   |
|                |                | (Replaces      |     like the   |
|                |                | LSASETENV      |     LSAM       |
|                |                | command used   |     subsystem  |
|                |                | in LSAM        |                |
|                |                | versions       |   description, |
|                |                | 3.xx.)         |     that must  |
|                |                |                |     be changed |
|                |                |                |     as an      |
|                |                |                |     alternate  |
|                |                |                |     LSAM       |
|                |                |                |                |
|                |                |                |    environment |
|                |                |                |     is made    |
|                |                |                |     ready for  |
|                |                |                |                |
|                |                |                |    operations. |
|                |                |                | -   It can     |
|                |                |                |     also be    |
|                |                |                |     used to    |
|                |                |                |     repair the |
|                |                |                |                |
|                |                |                |  configuration |
|                |                |                |     of an      |
|                |                |                |     upgraded   |
|                |                |                |     LSAM       |
|                |                |                |                |
|                |                |                |   environment, |
|                |                |                |     in case    |
|                |                |                |     version    |
|                |                |                |     upgrade    |
|                |                |                |     programs   |
|                |                |                |     should     |
|                |                |                |     create a   |
|                |                |                |     problem    |
|                |                |                |     with the   |
|                |                |                |     LSAM       |
|                |                |                |     subsystem  |
|                |                |                |                |
|                |                |                |   description. |
|                |                |                | -   Also refer |
|                |                |                |     to the     |
|                |                |                |     topic of   |
|                |                |                |     Managing   |
|                |                |                |     Multiple   |
|                |                |                |                |
|                |                |                |   Environments |
|                |                |                |     in         |
|                |                |                |                |
|                |                |                |    [Installing | |                |                |                |     Multiple   |
|                |                |                |                |
|                |                |                |    Environment |
|                |                |                | s](Installing% |
|                |                |                | 20Multiple-E |
|                |                |                | nvironments.ht |
|                |                |                | m#top){.MCXref |
|                |                |                |     .x         |
|                |                |                | ref}Installing |
|                |                |                |     Multiple   |
|                |                |                |                |
|                |                |                |  Environments. |
+----------------+----------------+----------------+----------------+
|                | SMASETUP       | Install the    | Refer to the   |
|                |                | LSAM software  | IBM i LSAM     |
|                |                | and create an  | installation   |
|                |                | environment.   | instructions.  |
|                |                |                | Also refer to  |
|                |                |                | the topic of   |
|                |                |                | Managing       |
|                |                |                | Multiple       |
|                |                |                | Environments   |
|                |                |                | in [Installing | |                |                |                | Multiple       |
|                |                |                | Environment    |
|                |                |                | s](Installing% |
|                |                |                | 20Multiple-E |
|                |                |                | nvironments.ht |
|                |                |                | m#top){.MCXref |
|                |                |                | .xref} and     |
|                |                |                | [LSAM          | |                |                |                | Environment    |
|                |                |                | Mana           |
|                |                |                | gement](LSAM%2 |
|                |                |                | 0Environment%2 |
|                |                |                | 0Management.ht |
|                |                |                | m#top){.MCXref |
|                |                |                | .xref}. This   |
|                |                |                | command is not |
|                |                |                | available and  |
|                |                |                | is not used    |
|                |                |                | outside of an  |
|                |                |                | installation   |
|                |                |                | from media.    |
+----------------+----------------+----------------+----------------+
|                | []{#SMASETL    | Set SMA        | Replaces the   | |                | IBL}SMASETLIBL | Library List   | interactive    |
|                |                |                | job\'s library |
|                |                |                | list.          |
+----------------+----------------+----------------+----------------+
|                | SMAADDLIBL     | Add LSAM       | Adds the       |
|                |                | library list   | library names  |
|                |                | to existing    | from the       |
|                |                | job library    | specified LSAM |
|                |                | list.          | environment to |
|                |                |                | the library    |
|                |                |                | list of the    |
|                |                |                | current job.   |
|                |                |                | The position   |
|                |                |                | of the new     |
|                |                |                | libraries in   |
|                |                |                | the list may   |
|                |                |                | be controlled  |
|                |                |                | by the         |
|                |                |                | command\'s     |
|                |                |                | POSITION       |
|                |                |                | keyword.       |
+----------------+----------------+----------------+----------------+
|                | SMARMVLIBL     | Remove LSAM    | Removes the    |
|                |                | library list   | library names  |
|                |                | from existing  | of the         |
|                |                | job library    | specified LSAM |
|                |                | list.          | environment    |
|                |                |                | from the       |
|                |                |                | current job\'s |
|                |                |                | library list.  |
+----------------+----------------+----------------+----------------+
|                | SMALIBMGT      | SMA Library    | Establishes    |
|                |                | Management     | new            |
|                |                |                | environments   |
|                |                |                | and creates    |
|                |                |                | library lists  |
|                |                |                | that are used  |
|                |                |                | by each        |
|                |                |                | environment.   |
+----------------+----------------+----------------+----------------+
|                | SMALIBINQ      | SMA Library    | -   Queries    |
|                |                | Inquiry        |     LSAM       |
|                |                |                |                |
|                |                |                |   environments |
|                |                |                |     and their  |
|                |                |                |     library    |
|                |                |                |     lists, but |
|                |                |                |     does not   |
|                |                |                |     permit any |
|                |                |                |     changes.   |
|                |                |                | -   This       |
|                |                |                |     command    |
|                |                |                |     also       |
|                |                |                |     represents |
|                |                |                |     the        |
|                |                |                |                |
|                |                |                |    environment |
|                |                |                |     selection  |
|                |                |                |     function   |
|                |                |                |     that can   |
|                |                |                |     be used as |
|                |                |                |     a first    |
|                |                |                |     step for   |
|                |                |                |     either the |
|                |                |                |     STRSMA or  |
|                |                |                |     SMASETLIBL |
|                |                |                |     command.   |
+----------------+----------------+----------------+----------------+
| OpCon Schedule | CHKDTAARA      | Check Data     | May be used by |
| Support        |                | Area           | OpCon/xps as a |
|                |                |                | pre-run check  |
|                |                |                | that a data    |
|                |                |                | area must      |
|                |                |                | exist before a |
|                |                |                | job is         |
|                |                |                | started.       |
+----------------+----------------+----------------+----------------+
|                | CHKIFSFIL      | Check for the  | A simple form  |
|                |                | file in the    | of this        |
|                |                | IFS (non-DB2)  | command could  |
|                |                | file systems   | be used as a   |
|                |                |                | pre-run job    |
|                |                |                | for an IBM i   |
|                |                |                | job master     |
|                |                |                | record in      |
|                |                |                | OpCon.         |
|                |                |                | However, the   |
|                |                |                | preferred use  |
|                |                |                | is in the Call |
|                |                |                | command line,  |
|                |                |                | utilizing      |
|                |                |                | additional     |
|                |                |                | command        |
|                |                |                | parameters to  |
|                |                |                | define a File  |
|                |                |                | Arrival or     |
|                |                |                | File Watcher   |
|                |                |                | job. This      |
|                |                |                | command now    |
|                |                |                | supports the   |
|                |                |                | Enterprise     |
|                |                |                | Manager \"File |
|                |                |                | Arrival\" job  |
|                |                |                | sub-type for   |
|                |                |                | IBM i jobs,    |
|                |                |                | when the file  |
|                |                |                | name begins    |
|                |                |                | with a forward |
|                |                |                | slash \'/\'    |
|                |                |                | denoting an    |
|                |                |                | IFS disk       |
|                |                |                | location       |
|                |                |                | outside of     |
|                |                |                | DB2.           |
+----------------+----------------+----------------+----------------+
|                | CHKFILE        | Check for file | A simple form  |
|                |                | in the DB2     | of this        |
|                |                | database       | command could  |
|                |                |                | be used as a   |
|                |                |                | pre-run job    |
|                |                |                | for an IBM i   |
|                |                |                | job master     |
|                |                |                | record in      |
|                |                |                | OpCon.         |
|                |                |                | However, the   |
|                |                |                | preferred use  |
|                |                |                | is in the Call |
|                |                |                | command line,  |
|                |                |                | utilizing      |
|                |                |                | additional     |
|                |                |                | command        |
|                |                |                | parameters to  |
|                |                |                | define a File  |
|                |                |                | Arrival or     |
|                |                |                | File Watcher   |
|                |                |                | job. This      |
|                |                |                | command now    |
|                |                |                | supports the   |
|                |                |                | Enterprise     |
|                |                |                | Manager \"File |
|                |                |                | Arrival\" job  |
|                |                |                | sub-type for   |
|                |                |                | IBM i jobs,    |
|                |                |                | when the file  |
|                |                |                | name begins    |
|                |                |                | with a DB2     |
|                |                |                | Library name   |
|                |                |                | (which must    |
|                |                |                | begin with an  |
|                |                |                | alpha          |
|                |                |                | character, and |
|                |                |                | the forward    |
|                |                |                | slash \'/\' is |
|                |                |                | not used,      |
|                |                |                | denoting a     |
|                |                |                | disk location  |
|                |                |                | inside of      |
|                |                |                | DB2).          |
|                |                |                |                |
|                |                |                |                |
|                |                |                |                |
|                |                |                | **Note**: The  |
|                |                |                | IBM i command  |
|                |                |                | CHKOBJ may     |
|                |                |                | also be used,  |
|                |                |                | especially for |
|                |                |                | object types   |
|                |                |                | other than     |
|                |                |                | files.         |
+----------------+----------------+----------------+----------------+
|                | SBMDBFCMD      | Submit command | May be used by |
|                |                | from database  | OpCon/xps as   |
|                |                | file           | the Call       |
|                |                |                | command in     |
|                |                |                | order to tell  |
|                |                |                | the IBM i LSAM |
|                |                |                | that the       |
|                |                |                | actual, very   |
|                |                |                | long call      |
|                |                |                | command string |
|                |                |                | may be         |
|                |                |                | obtained from  |
|                |                |                | a database     |
|                |                |                | file in the    |
|                |                |                | DB2/400        |
|                |                |                | database.      |
+----------------+----------------+----------------+----------------+
|                | RUNCAPJOB      | Run Captured   | Submit the job |
|                |                | Job            | defined by the |
|                |                |                | named Captured |
|                |                |                | Job ID. Refer  |
|                |                |                | to the topic   |
|                |                |                | on Job         |
|                |                |                | Tracking and   |
|                |                |                | Queuing for    |
|                |                |                | more           |
|                |                |                | information    |
|                |                |                | about captured |
|                |                |                | jobs.          |
+----------------+----------------+----------------+----------------+
|                | STROPRRPY      | Start Operator | The command to |
|                |                | Replay         | use with an    |
|                |                |                | OpCon/xps job  |
|                |                |                | description,   |
|                |                |                | specifying the |
|                |                |                | Operator       |
|                |                |                | Replay Script  |
|                |                |                | by name as the |
|                |                |                | parameter for  |
|                |                |                | this command.  |
+----------------+----------------+----------------+----------------+
| LSAM Utility   | CHKIBMLSAM     | Check IBM i    | This command   |
|                |                | LSAM server    | is designed to |
|                |                | job status     | be used        |
|                |                |                | primarily from |
|                | EN             |                | an OpCon/xps   |
|                | V(environment) |                | job to report  |
|                |                |                | the current    |
|                |                |                | status of the  |
|                |                |                | LSAM server    |
|                | STATUS(\*ACTI  |                | jobs. It will  |
|                | VE/\*INACTIVE) |                | force a        |
|                |                |                | program        |
|                |                |                | failure when   |
|                |                |                | the server     |
|                |                |                | jobs do not    |
|                |                |                | match the      |
|                |                |                | STATUS keyword |
|                |                |                | value.         |
+----------------+----------------+----------------+----------------+
|                | CMDEXE,        | SMA wrapper to | These commands |
|                | CMDEXE2        | manage IBM i   | are used to    |
|                |                | command errors | execute IBM i  |
|                |                |                | native         |
|                |                |                | commands       |
|                |                |                | inside a       |
|                |                |                | \"wrapper\" CL |
|                |                |                | program that   |
|                |                |                | intercepts any |
|                |                |                | command        |
|                |                |                | failure        |
|                |                |                | message and    |
|                |                |                | makes it       |
|                |                |                | possible for   |
|                |                |                | the Agent      |
|                |                |                | and/or OpCon   |
|                |                |                | to control the |
|                |                |                | OpCon job      |
|                |                |                | status and to  |
|                |                |                | respond        |
|                |                |                | appropriately  |
|                |                |                | to different   |
|                |                |                | error          |
|                |                |                | messages.      |
+----------------+----------------+----------------+----------------+
|                | DSPDTAQ        | Display Data   | A data queue   |
|                |                | Queue          | viewer not     |
|                |                |                | supplied by    |
|                |                |                | IBM with IBM   |
|                |                |                | i. Used by     |
|                |                |                | support        |
|                |                |                | technicians to |
|                |                |                | verify LSAM    |
|                |                |                | system         |
|                |                |                | conditions.    |
+----------------+----------------+----------------+----------------+
|                | DSPDYNVAR      | Display        | Returns a      |
|                |                | Dynamic        | completion     |
|                |                | Variable       | message that   |
|                |                |                | shows the      |
|                |                |                | current value  |
|                |                |                | of the Dynamic |
|                |                |                | Variable, or   |
|                |                |                | reports an     |
|                |                |                | error if not   |
|                |                |                | found.         |
+----------------+----------------+----------------+----------------+
|                | LOGDYNVAR      | Log Dynamic    | Use this       |
|                |                | Variable       | command to     |
|                |                | History        | store Dynamic  |
|                |                |                | Variable       |
|                |                |                | values, and/or |
|                |                |                | other          |
|                |                |                | user-defined   |
|                |                |                | values, into a |
|                |                |                | history log    |
|                |                |                | where values   |
|                |                |                | are marked     |
|                |                |                | with a time    |
|                |                |                | stamp and      |
|                |                |                | identified by  |
|                |                |                | multiple       |
|                |                |                | category codes |
|                |                |                | and a          |
|                |                |                | description.   |
|                |                |                | Later, queries |
|                |                |                | can be used to |
|                |                |                | study trends   |
|                |                |                | of the values  |
|                |                |                | over time.     |
+----------------+----------------+----------------+----------------+
|                | DSPOBJWU       | Display object | This command   |
|                |                | where used     | requires that  |
|                |                |                | the LSAM       |
|                |                |                | environment    |
|                |                |                | library list   |
|                |                |                | be in effect.  |
|                |                |                | It can be      |
|                |                |                | executed from  |
|                |                |                | within the     |
|                |                |                | LSAM menu      |
|                |                |                | system, or     |
|                |                |                | from command   |
|                |                |                | entry after    |
|                |                |                | the command    |
|                |                |                | SMASETLIBL has |
|                |                |                | been used to   |
|                |                |                | set the        |
|                |                |                | interactive    |
|                |                |                | job\'s library |
|                |                |                | list. Refer to |
|                |                |                | [LSAM Security | |                |                |                | and Object     |
|                |                |                | Authority](LSA |
|                |                |                | M-Security%2 |
|                |                |                | 0and-Object% |
|                |                |                | 20Authority.ht |
|                |                |                | m#top){.MCXref |
|                |                |                | .xref} for     |
|                |                |                | instructions   |
|                |                |                | how to use     |
|                |                |                | this command.  |
+----------------+----------------+----------------+----------------+
|                | LSAMCMD        | Execute LSAM   | Refer to the   |
|                |                | software       | discussion     |
|                |                | commands from  | below          |
|                |                | outside the    | explaining how |
|                |                | LSAM           | to use this    |
|                |                | environment    | command.       |
+----------------+----------------+----------------+----------------+
|                | REFFLOW        | Program        | This command   |
|                |                | reference flow | requires that  |
|                |                | chart          | the LSAM       |
|                |                |                | environment    |
|                |                |                | library list   |
|                |                |                | be in effect.  |
|                |                |                | It can be      |
|                |                |                | executed from  |
|                |                |                | within the     |
|                |                |                | LSAM menu      |
|                |                |                | system, or     |
|                |                |                | from command   |
|                |                |                | entry after    |
|                |                |                | the command    |
|                |                |                | SMASETLIBL has |
|                |                |                | been used to   |
|                |                |                | set the        |
|                |                |                | interactive    |
|                |                |                | job\'s library |
|                |                |                | list. Refer to |
|                |                |                | [LSAM Security | |                |                |                | and Object     |
|                |                |                | Authority](LSA |
|                |                |                | M-Security%2 |
|                |                |                | 0and-Object% |
|                |                |                | 20Authority.ht |
|                |                |                | m#top){.MCXref |
|                |                |                | .xref} for     |
|                |                |                | instructions   |
|                |                |                | how to use     |
|                |                |                | this command.  |
+----------------+----------------+----------------+----------------+
|                | SETHEXDV       | Set            | This command   |
|                |                | hexadecimal    | makes it       |
|                |                | value in a     | possible to    |
|                |                | Dynamic        | store a        |
|                |                | Variable       | non-display    |
|                |                |                | value into a   |
|                |                |                | Dynamic        |
|                |                |                | Variable, so   |
|                |                |                | that special   |
|                |                |                | values such as |
|                |                |                | Carriage       |
|                |                |                | Return and     |
|                |                |                | Line Feed      |
|                |                |                | formatting     |
|                |                |                | characters can |
|                |                |                | be represented |
|                |                |                | by a {token}   |
|                |                |                | within text    |
|                |                |                | parameters of  |
|                |                |                | OpCon External |
|                |                |                | Event          |
|                |                |                | commands, such |
|                |                |                | as             |
|                |                |                | \              |
|                |                |                | $NOTIFY:EMAIL. |
+----------------+----------------+----------------+----------------+
|                | SMAMMPSTS      | SMA Update     | -   This       |
|                |                | Message        |     command    |
|                |                | Management     |     may be     |
|                |                | Parameter      |     used, for  |
|                |                | Record Status  |     example in |
|                |                |                |     a Captured |
|                |                |                |     Data       |
|                |                |                |     Response   |
|                |                |                |     Rule, to   |
|                |                |                |     change the |
|                |                |                |     Status of  |
|                |                |                |     a          |
|                |                |                |     Parameter  |
|                |                |                |     master     |
|                |                |                |     record,    |
|                |                |                |     either to  |
|                |                |                |     Active or  |
|                |                |                |     to         |
|                |                |                |     Inactive.  |
|                |                |                | -   This       |
|                |                |                |     technique  |
|                |                |                |     is often   |
|                |                |                |     used when  |
|                |                |                |     a Message  |
|                |                |                |     Management |
|                |                |                |     Parameter  |
|                |                |                |     cannot     |
|                |                |                |                |
|                |                |                |    distinguish |
|                |                |                |     between a  |
|                |                |                |     first and  |
|                |                |                |     second     |
|                |                |                |     instance   |
|                |                |                |     of a       |
|                |                |                |     message    |
|                |                |                |     that       |
|                |                |                |     appears    |
|                |                |                |     twice, so  |
|                |                |                |     that the   |
|                |                |                |     first      |
|                |                |                |     instance   |
|                |                |                |     of the     |
|                |                |                |     message is |
|                |                |                |     handled by |
|                |                |                |     the        |
|                |                |                |     Parameter  |
|                |                |                |     record,    |
|                |                |                |     but then   |
|                |                |                |     the        |
|                |                |                |     Parameter  |
|                |                |                |     record is  |
|                |                |                |     set        |
|                |                |                |     inactive   |
|                |                |                |     before     |
|                |                |                |     Message    |
|                |                |                |     Management |
|                |                |                |     attempts   |
|                |                |                |     to process |
|                |                |                |     the second |
|                |                |                |     instance   |
|                |                |                |     of an      |
|                |                |                |     apparently |
|                |                |                |     identical  |
|                |                |                |     message.   |
|                |                |                | -   Use of     |
|                |                |                |     this       |
|                |                |                |     utility    |
|                |                |                |     command    |
|                |                |                |     requires   |
|                |                |                |     an         |
|                |                |                |                |
|                |                |                |  understanding |
|                |                |                |     of the     |
|                |                |                |     software   |
|                |                |                |                |
|                |                |                |    application |
|                |                |                |     that       |
|                |                |                |     issues the |
|                |                |                |     messages.  |
|                |                |                | -   Remember   |
|                |                |                |     to include |
|                |                |                |     Response   |
|                |                |                |     Rule logic |
|                |                |                |     (or other  |
|                |                |                |                |
|                |                |                |    OpCon/Agent |
|                |                |                |     automation |
|                |                |                |     logic)     |
|                |                |                |     that will  |
|                |                |                |     reset the  |
|                |                |                |     Parameter  |
|                |                |                |     record     |
|                |                |                |     back to an |
|                |                |                |     Active     |
|                |                |                |     state,     |
|                |                |                |     after it   |
|                |                |                |     is safe to |
|                |                |                |     do so.     |
+----------------+----------------+----------------+----------------+
|                | STAT           | Show file      | A convenience  |
|                |                | status         | utility that   |
|                |                |                | shows many     |
|                |                |                | attributes,    |
|                |                |                | including the  |
|                |                |                | character set  |
|                |                |                | (CCSID) of     |
|                |                |                | files in       |
|                |                |                | either the UDB |
|                |                |                | DB2 database   |
|                |                |                | or the IFS     |
|                |                |                | (integrated    |
|                |                |                | file system).  |
|                |                |                | The syntax of  |
|                |                |                | the file path  |
|                |                |                | specified      |
|                |                |                | indicates      |
|                |                |                | which data     |
|                |                |                | storage type   |
|                |                |                | will be        |
|                |                |                | searched.      |
|                |                |                | LIBRARY/FILE   |
|                |                |                | is the format  |
|                |                |                | for UDB DB2    |
|                |                |                | files.         |
+----------------+----------------+----------------+----------------+
|                | UNINSTQGPL     | Uninstall SMA  | Used to remove |
|                |                | utilities from | all IBM i LSAM |
|                |                | QGPL           | program and    |
|                |                |                | file objects   |
|                |                |                | from the QGPL  |
|                |                |                | library if the |
|                |                |                | LSAM software  |
|                |                |                | will be        |
|                |                |                | uninstalled.   |
|                |                |                | Utilities in   |
|                |                |                | QGPL are used  |
|                |                |                | for LSAM       |
|                |                |                | environment    |
|                |                |                | management.    |
+----------------+----------------+----------------+----------------+
|                | WAITDYNVAR     | Wait for       | Used by        |
|                |                | Dynamic        | Captured Data  |
|                |                | Variable       | Response Rules |
|                |                | values (1 or   | to pause or    |
|                |                | 2)             | synchronize    |
|                |                |                | commands with  |
|                |                |                | Message        |
|                |                |                | Management, or |
|                |                | (Refer to      | other          |
|                |                | instructions   | processes.     |
|                |                | and example    |                |
|                |                | application in |                |
|                |                | the [Dynamic   |                | |                |                | V              |                |
|                |                | ariables](Dyna |                |
|                |                | mic-Variable |                |
|                |                | s.md){.MCXref |                |
|                |                | .xref} section |                |
|                |                | of this Agent  |                |
|                |                | User Help.)    |                |
+----------------+----------------+----------------+----------------+
| LSAM Menu      | EDTSMAPRM      | Edit LSAM      | Same as Main   |
| Function APIs  |                | Control        | Menu function  |
|                |                | Parameters     | \# 7.          |
|                |                |                |                |
|                |                |                |                |
| (Application   |                |                |                |
| Program        |                |                |                |
| Interfaces)    |                |                |                |
+----------------+----------------+----------------+----------------+
|                | ENDJOBTRK      | End Job        | Same as Job    |
|                |                | Tracking       | Tracking Menu  |
|                |                |                | function \# 4. |
+----------------+----------------+----------------+----------------+
|                | ENDLOGCMD      | End LSAM       | Executed in    |
|                |                | server         | prompted mode  |
|                |                | logging, end   | from the LSAM  |
|                |                | debug mode     | Management     |
|                |                |                | Menu, function |
|                |                |                | \# 4,          |
|                |                |                | \<**F8**\>     |
|                |                |                | (ENDSMALOG).   |
+----------------+----------------+----------------+----------------+
|                | ENDMSGMNG      | End Message    | Same as        |
|                |                | Management     | Message        |
|                |                | (end message   | Management     |
|                |                | trapping)      | Menu function  |
|                |                |                | \# 4.          |
+----------------+----------------+----------------+----------------+
|                | ENDSMALOG      | End LSAM       | Executed by    |
|                |                | logging, debug | the LSAM       |
|                |                | mode           | Management     |
|                |                |                | Menu, function |
|                |                |                | \# 4,          |
|                |                |                | \<**F8**\>     |
|                |                |                | (ENDSMALOG).   |
+----------------+----------------+----------------+----------------+
|                | ENDSMASYS      | End LSAM       | Same as LSAM   |
|                |                | server         | Management     |
|                |                | programs       | Menu function  |
|                |                |                | \# 2, but      |
|                |                |                | supports an    |
|                |                |                | optional       |
|                |                |                | KEEPSBS        |
|                |                |                | parameter used |
|                |                |                | by the SMARGZ  |
|                |                |                | command.       |
+----------------+----------------+----------------+----------------+
|                | JOBTRKSTS      | Show Job       | Shows the Job  |
|                |                | Tracking       | Tracking       |
|                |                | Status         | status window, |
|                |                |                | as in Job      |
|                |                |                | Tracking Menu  |
|                |                |                | function \# 5. |
+----------------+----------------+----------------+----------------+
|                | SBMJOB,        | LSAM copies of | Used for Job   |
|                |                | the IBM i      | Tracking, in   |
|                | SBMJOB2,       | SBMJOB         | conjunction    |
|                |                | command, with  | with the Exit  |
|                | SMASBMJOB      | alternate      | Program        |
|                |                | uses.          | numbers shown  |
|                |                |                | in the LSAM    |
|                |                |                | Environment    |
|                |                |                | Management     |
|                |                | **Warning**:   | function       |
|                |                | Do not use     | \<**F9**\>     |
|                |                | these          | (Exit Pgm\#).  |
|                |                | commands. It   | These          |
|                |                | is difficult   | specially      |
|                |                | to control     | prepared       |
|                |                | what happens   | versions of    |
|                |                | to submitted   | the SBMJOB     |
|                |                | jobs when Job  | command create |
|                |                | Tracking is    | special system |
|                |                | turned on.     | entries that   |
|                |                |                | help control   |
|                |                |                | job tracking.  |
+----------------+----------------+----------------+----------------+
|                | STRJOBTRK      | Start Job      | Same as Job    |
|                |                | Tracking       | Tracking Menu  |
|                |                |                | function \# 3. |
+----------------+----------------+----------------+----------------+
|                | STRLOGCMD      | Start LSAM     | Executed in    |
|                |                | server         | prompted mode  |
|                |                | logging, start | from the LSAM  |
|                |                | debug mode     | Management     |
|                |                |                | Menu, function |
|                |                |                | \# 4,          |
|                |                |                | \<**F7**\>     |
|                |                |                | (STRSMALOG).   |
+----------------+----------------+----------------+----------------+
|                | STRMSGMNG      | Start Message  | Same as        |
|                |                | Management     | Message        |
|                |                | (start message | Management     |
|                |                | trapping)      | Menu function  |
|                |                |                | \# 3.          |
+----------------+----------------+----------------+----------------+
|                | STRSMALOG      | Start LSAM     | Executed by    |
|                |                | logging, debug | the LSAM       |
|                |                | mode           | Management     |
|                |                |                | Menu, function |
|                |                |                | \# 4,          |
|                |                |                | \<**F7**\>     |
|                |                |                | (STRSMALOG).   |
+----------------+----------------+----------------+----------------+
|                | STRSMAMNU      | **NO LONGER    | This command   |
|                |                | USED.**        | was used to    |
|                |                |                | start entry    |
|                |                |                | into the LSAM  |
|                |                |                | master menu.   |
|                |                | This command   | It has been    |
|                |                | shows an       | replaced by    |
|                |                | informational  | command        |
|                |                | display, only. | STRSMA.        |
+----------------+----------------+----------------+----------------+
|                | TRPMSGSTS      | Show Message   | Shows the      |
|                |                | Manager job    | status of the  |
|                |                | status         | Message        |
|                |                |                | Manager        |
|                |                |                | function in a  |
|                |                |                | window, as in  |
|                |                |                | Message        |
|                |                |                | Management     |
|                |                |                | Menu function  |
|                |                |                | \# 5.          |
+----------------+----------------+----------------+----------------+
| Restricted     | STRSAVRST      | Start          | Used by OpCon  |
| Mode           |                | Save/Restore   | to run a       |
| Operational    | Parameter(s):  | (Start         | program that   |
| Control        |                | Restricted     | signals the    |
|                | SCRIPT(\<      | Mode           | operator       |
|                | script_name\>) | Operation)     | console        |
|                |                |                | Restricted     |
|                |                |                | Mode program   |
|                |                |                | to begin       |
|                |                |                | processing the |
|                |                |                | Script named   |
|                |                |                | in a parameter |
|                |                |                | of this        |
|                |                |                | command.       |
+----------------+----------------+----------------+----------------+
|                | ENDSAVRST      | End            | Available for  |
|                |                | Save/Restore   | use with       |
|                |                | (End           | OpCon, might   |
|                |                | Restricted     | be submitted   |
|                |                | Mode Process)  | as a command   |
|                |                |                | to IBM i in    |
|                |                |                | case           |
|                |                |                | exceptional    |
|                |                |                | conditions     |
|                |                |                | require that   |
|                |                |                | the operator   |
|                |                |                | console end    |
|                |                |                | its mode of    |
|                |                |                | waiting for    |
|                |                |                | the STRSAVRST  |
|                |                |                | command to     |
|                |                |                | arrive.        |
+----------------+----------------+----------------+----------------+
| Multi-Step Job | STRMLTJOB      | Start          | Used in an     |
| scripting      |                | Multi-Step Job | OpCon IBM i    |
|                |                | Script         | batch job, or  |
|                |                |                | can be         |
|                |                |                | executed from  |
|                |                |                | any IBM i      |
|                |                |                | command line   |
|                |                |                | or program.    |
|                |                |                | Refer to       |
|                |                |                | [Restricted    | |                |                |                | Mode and       |
|                |                |                | Multi-Step     |
|                |                |                | Jobs](Rest     |
|                |                |                | ricted-Mode% |
|                |                |                | 20and-Multi- |
|                |                |                | Step-Jobs.ht |
|                |                |                | m#top){.MCXref |
|                |                |                | .xref}.        |
+----------------+----------------+----------------+----------------+
| Translation    | LSATBLTEST     | LSAM           | From within    |
| Table Testing  |                | Translation    | the LSAM       |
|                |                | Table Testing  | environment,   |
|                |                | utility        | starts a       |
|                |                |                | utility        |
|                |                |                | display that   |
|                |                |                | may be used to |
|                |                |                | test the       |
|                |                |                | results of     |
|                |                |                | using any      |
|                |                |                | translation    |
|                |                |                | table. Refer   |
|                |                |                | to the section |
|                |                |                | on [LSAM       | |                |                |                | Utilities](#   |
|                |                |                | LSAM2){.MCXref |
|                |                |                | .xref} for     |
|                |                |                | more           |
|                |                |                | information    |
|                |                |                | about          |
|                |                |                | translation    |
|                |                |                | tables.        |
+----------------+----------------+----------------+----------------+
|                | TESTLSATBL     | Test LSAM      | An LSAM        |
|                |                | Translation    | software       |
|                |                | Table          | command that   |
|                |                | (OpCon/xps job | routes test    |
|                |                | command)       | ASCII data     |
|                |                |                | from an        |
|                |                |                | OpCon/xps job  |
|                |                |                | directly to    |
|                |                |                | the LSATBLTEST |
|                |                |                | utility        |
|                |                |                | display. Refer |
|                |                |                | to the section |
|                |                |                | on [LSAM       | |                |                |                | Utilities](#   |
|                |                |                | LSAM2){.MCXref |
|                |                |                | .xref} for     |
|                |                |                | more           |
|                |                |                | information    |
|                |                |                | about          |
|                |                |                | translation    |
|                |                |                | tables.        |
+----------------+----------------+----------------+----------------+
| Manage LSAM    | ADDMSGTHR      | Add to count   | Add the        |
| Va             |                | of message     | specified      |
| riables/Tokens |                | threshold      | number to an   |
|                |                |                | existing       |
|                |                |                | Message        |
|                |                |                | Management     |
|                |                |                | threshold      |
|                |                |                | count.         |
+----------------+----------------+----------------+----------------+
|                | ADDRPYTOK      | Add/set        | Adds or sets   |
|                |                | Operator       | one or more of |
|                |                | Replay         | the LSAM       |
|                |                | variable.      | Operator       |
|                |                |                | Replay         |
|                |                |                | variables.     |
+----------------+----------------+----------------+----------------+
|                | SETCAPTOK      | Set Operator   | Use the        |
|                |                | Replay         | identified     |
|                |                | variable from  | captured data  |
|                |                | Captured Data  | value to set   |
|                |                |                | or create the  |
|                |                |                | new value of   |
|                |                |                | an Operator    |
|                |                |                | Replay         |
|                |                |                | variable.      |
+----------------+----------------+----------------+----------------+
|                | SETCAPVAR      | Set Dynamic    | Use the        |
|                |                | Variable from  | identified     |
|                |                | Captured Data  | captured data  |
|                |                |                | value to set   |
|                |                |                | or create the  |
|                |                |                | new value of a |
|                |                |                | Dynamic        |
|                |                |                | Variable.      |
+----------------+----------------+----------------+----------------+
|                | SETDYNVAR      | Add/Set        | Adds or        |
|                |                | Dynamic        | changes a      |
|                |                | Variable       | Dynamic        |
|                |                |                | Variable       |
|                |                |                | definition.    |
|                |                |                | (Refer to the  |
|                |                |                | description    |
|                |                |                | below.)        |
+----------------+----------------+----------------+----------------+
|                | SETMSGTHR      | Set (reset)    | Changes the    |
|                |                | Message        | value of a     |
|                |                | Management     | Dynamic        |
|                |                | Threshold      | Variable used  |
|                |                |                | as a Message   |
|                |                |                | threshold      |
|                |                |                | counter.       |
+----------------+----------------+----------------+----------------+
| LSAM database  | SMARGZ         | Reorganize     | Utilizes       |
| management     |                | LSAM database  | SMASUP command |
|                |                |                | and additional |
|                |                |                | instructions   |
|                |                |                | to backup and  |
|                |                |                | completely     |
|                |                |                | manage the     |
|                |                |                | size of the    |
|                |                |                | LSAM database  |
|                |                |                | library. Refer |
|                |                |                | to the         |
|                |                |                | discussion     |
|                |                |                | below; also    |
|                |                |                | refer to       |
|                |                |                | SMASUP command |
|                |                |                | in this topic  |
|                |                |                | and the topics |
|                |                |                | on (a) Debug   |
|                |                |                | Mode and (b)   |
|                |                |                | Events and     |
|                |                |                | Utilities      |
|                |                |                | Menu.          |
+----------------+----------------+----------------+----------------+
| Manage LSAM    | SMAPTFINS      | Master PTF     | Starts an      |
| PTFs (software |                | installation   | all-in-one     |
| patches)       |                |                | procedure to   |
|                |                |                | obtain the     |
|                |                |                | latest PTF     |
|                |                |                | information,   |
| (Refer to [PTF |                |                | load it to the | | and Security   |                |                | LSAM           |
| Menu](         |                |                | environment    |
| LSAM-Softwar |                |                | and then apply |
| e-Maintenanc |                |                | the cumulative |
| e-(PTFs).md |                |                | collection of  |
| #PTF3){.MCXref |                |                | any PTFs not   |
| .xref} for     |                |                | already        |
| additional     |                |                | installed.     |
| information.)  |                |                |                |
+----------------+----------------+----------------+----------------+
|                | SMAPTFREQ      | Request PTF    | Contact an SMA |
|                |                | information    | source point   |
|                |                |                | to obtain the  |
|                |                |                | latest LSAM    |
|                |                |                | PTF            |
|                |                |                | information.   |
+----------------+----------------+----------------+----------------+
|                | SMAPTFLOD      | Load PTF       | Reads the PTF  |
|                |                | information to | control        |
|                |                | LSAM control   | information    |
|                |                | files          | obtained by    |
|                |                |                | SMAPTFREQ and  |
|                |                |                | loads the      |
|                |                |                | information    |
|                |                |                | into the LSAM  |
|                |                |                | control files. |
+----------------+----------------+----------------+----------------+
|                | SMAPTFAPY      | Apply a single | After PTF      |
|                |                | PTF            | control        |
|                |                |                | information is |
|                |                |                | loaded, an     |
|                |                |                | individual PTF |
|                |                |                | may be         |
|                |                |                | selected for   |
|                |                |                | application by |
|                |                |                | this command.  |
+----------------+----------------+----------------+----------------+
|                | SMAPTFCUM      | Apply          | After PTF      |
|                |                | cumulative     | control        |
|                |                | PTFs           | information is |
|                |                |                | loaded, this   |
|                |                |                | procedure will |
|                |                |                | apply all      |
|                |                |                | missing PTFs   |
|                |                |                | to the LSAM    |
|                |                |                | environment.   |
+----------------+----------------+----------------+----------------+
|                | SMAPTFRBK      | Rollback a PTF | Unapplies a    |
|                |                |                | PTF and        |
|                |                |                | restores the   |
|                |                |                | previous level |
|                |                |                | of software.   |
+----------------+----------------+----------------+----------------+
|                | SMAPTFRAP      | Re-apply a PTF | Used when a    |
|                |                |                | PTF was        |
|                |                |                | previously     |
|                |                |                | rolled back,   |
|                |                |                | to re-apply    |
|                |                |                | the PTF. This  |
|                |                |                | approach       |
|                |                |                | avoids         |
|                |                |                | replacing the  |
|                |                |                | original       |
|                |                |                | backup of      |
|                |                |                | back-level     |
|                |                |                | software.      |
+----------------+----------------+----------------+----------------+

## LSAM Utilities

Some of the IBM i LSAM Commands identified in this topic represent
utility functions that support the LSAM Administrator. Some of these
utility functions, not documented in other topics of this online help,
are explained in detail in the following sections of the document. User
instructions and examples are included.

### Events: OpCon Event Notification

#### SMAFAILJOB

This Agent utility command can be used in any context to cause the
current job to end with an \*ESCAPE message using message ID SMA0992.
For jobs started by OpCon, the Agent will report a Failed status.

##### Using SMAFAILJOB

Here is the command syntax:

SMAFAILJOB JOBNAM(JOBNAME) SMAGPL(\*DEFAULT)

##### Command Parameters

This command is typically used without specifying its parameters.

-   **JOBNAM** = Specify the IBM i job name to be used in the message
    text of the SMA0992 message ID. If this parameter is not specified,
    then the actual job name of the current job will be reported as the
    failing job.
-   **SMAGPL** = This command parameter is used (by this command, not by
    other commands) only to locate the SMAMSGF message file, so that the
    SMA0992 message ID can be retrieved to format the escape message.
    When the SMAFAILJOB is used within the Agent (LSAM) environment,
    that is, when the job\'s library list includes the LSAM libraries,
    then it is not necessary to specify this parameter. However, this
    parameter makes it possible to use the command from outside of the
    LSAM environment, as long as the command name is qualified, as in
    this example:

The SMAFAILJOB command is especially useful for the Agent\'s Multi-Step
Script jobs, and it can be used in the Captured Data Response Rules for
these Agent automation features: Message Management, Operator Replay,
and the SCANSPLF command. In SCANSPLF applications, the SMAFAILJOB can
have the effect of overriding the Scan Rules and SCANSPLF command normal
controls over when a job should fail (based on the number of matched or
unmatched scan rules).

##### Example of SMAFAILJOB in a Multi-Step Job Script

The following example shows two steps that are part of a Multi-Step Job
Script, illustrating how the SMAFAILJOB command can force the Script job
to end in case the next command step should fail.

 

+----------------------------------+----------------------------------+
| ![White pencil icon on green     | **EXAMPLE:** Forcing a           | | circular                         | Multi-Step Script Job to fail if |
| background](../../../Reso        | a critical Step fails:           |
| urces/Images/example-icon(48x48) |                                  |
| .png "Example icon") |                                  |
|                                  |                                  |
|                                  |   STEP\#   LABEL      COMMAND    |
|                                  |                                  |
|                                  |  -------- ---------- ----------- |
|                                  | -------------------------------- |
|                                  |   0040     ON_ERROR   SMAFAILJOB |
|                                  |   0050                CALL MYPR  |
|                                  | OGRAM PARM('If this step fails') |
+----------------------------------+----------------------------------+

 

Actually, a simpler way to force the Script to fail would be to mark
Step \# 50 with the flag that indicates \"force script failure if this
step fails.\"

 

Despite the simplicity of the example above, in many cases, the ON_ERROR
Step would prove useful because it might also included a step
qualification rule where, for example, the special variable \$ERRMSGID
could be compared to a known possible message ID value that is
recognized by the Script author as a fatal error. Similarly, the
ON_ERROR step could use the SMAGOTO command to turn job control over to
a separate error handling Script, where mutiple different conditions
could be tested, and only certain conditions would then actually execute
the SMAFAILJOB command.

#### CPYTOMSGIN

This External Event Interface command allows a user program to directly
pass OpCon/xps events to the SAM and supporting services (SAM-SS).

##### Using CPYTOMSGIN

Copy to message input: This is an IBM i LSAM imitation of the similar
function available on the OpCon server. CPYTOMSGIN may be used to
generate any OpCon Event command, especially those that are not
supported by individual LSAM commands.

 

The CPYTOMSGIN utility forwards external events to SAM and supporting
services (SAM-SS). This utility can be executed within an IBM i batch
job that is scheduled by OpCon, or it can be executed from virtually
anywhere within the IBM i environment, wherever IBM i command execution
is supported. The CPYTOMSGIN command is supported by a driver program
that automatically allocates the IBM i LSAM libraries and other
resources needed to complete its task. When it is executed from outside
of the LSAM library list, qualify the command with its library location,
as in the example below.

 

Another important capability of the CPYTOMSGIN command is that it will
support translation of IBM i LSAM Dynamic Variable tokens that may be
included anywhere within the CPYMSGIN parameter, that is, within the
actual Event command line.

 

The syntax for Event commands that are not represented by individual IBM
i LSAM commands may be viewed when the CPYTOMSGIN command is selected
from the LSAM\'s menu-driven Event Management function (LSAM menu 3,
option 1). The automatic prompting of Event command syntax that occurs
when CPYTOMSGIN is selected and a sub-menu of available commands appears
results in a final command prompting screen that will contain the model
syntax for each OpCon/xps Event command. This model syntax could be
copied from the prompt screen and then pasted into the MESSAGE parameter
of the CPYTOMSGIN command whenever it is being coded in a user-defined
program.

##### Example Program Using CPYTOMSGIN

+----------------------------------+----------------------------------+
| ![White pencil icon on green     | **EXAMPLE:** [A sample Control   | | circular                         | Language program                 |
| background](../../../Reso        | follows:]{.Exampletxt}           |
| urces/Images/example-icon(48x48) |                                  |
| .png "Example icon") |                                  |
|                                  |                                  |
|                                  | 00010 PGM                        |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | *00020 SMAGPL/CPYTOMSGIN         |
|                                  | CPYMSGIN*(\$NOTIFY:LOG,\<Sev     |
|                                  | erity\>,\<EventID\>,\<Message\>) |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | 00030 ENDPGM                     |
+----------------------------------+----------------------------------+

 

In the example above, the \< \> characters are used only to mark the
locations where field names are identified. Both the field name and the
\< \> characters must be replaced by the required parameter value. If
the specified Event command allows that a field is optional and the
value will be left out of the command, the commas that delimit the field
position must still be retained. Two consecutive commas with no value
between them tells OpCon/xps that the null value should be assigned to
the field in that position.

#### Application Example: Sending IBM i values to OpCon Properties

IBM i values can be sent to OpCon Properties using the \$PROPERTY:SET
Event command from anywhere that the IBM i LSAM supports OpCon Events.
OpCon Property tokens can then be used to reference these IBM i values
as part of OpCon automation, wherever Property tokens are supported.

 

The CPYTOMSGIN command provides excellent flexibility for the purpose of
sending any value retrieved from the IBM i system to be stored in an
OpCon Property. When the CPYTOMSGIN command is used, the command driver
program will scan the entire external event command string looking for
any IBM i LSAM Dynamic Variable tokens that might be replaced. It is
very common to put an LSAM Dynamic Variable token into the value
parameter of the OpCon \$PROPERTY:SET command, so that any value
retrieved by, or stored in a Dynamic Variable can be sent up to the
OpCon server and stored into an OpCon Property.

 

Remember that OpCon Property names could be global properties, or they
could be instance-qualified properties, possibly qualified to a specific
schedule name or an OpCon job name within a schedule. It\'s possible to
use Dynamic Variables to represent the OpCon schedule or job names. As
well, within the LSAM Message Management Parameters, or their attached
Response Rules, it is also possible to use one of the available
\$-property values identified in the first table under Message
Management Screens and Windows, within the Message Management topic of
the **IBM i LSAM** online help.

 

Here is an example of pushing the value from an IBM i LSAM Dynamic
Variable up to an OpCon global property:

 

+----------------------------------+----------------------------------+
| ![White pencil icon on green     | **EXAMPLE:** [Sending an IBM i   | | circular                         | value to an OpCon                |
| background](../../../Reso        | Property]{.Exampletxt}           |
| urces/Images/example-icon(48x48) |                                  |
| .png "Example icon") |                                  |
|                                  |                                  |
|                                  | CPYTOMSGIN                       |
|                                  | CPYMSGIN(\'\$PROPERTY:SET,m      |
|                                  | y_opcon_property,{DISKPERCNT}\') |
+----------------------------------+----------------------------------+

 

The example above assumes that the Dynamic Variable DISKPERCNT would
previously have been loaded with the current IBM i disk utilization
percentage, as would be possible from an Operator Replay script using a
screen data Capture Application, linked to a Response Rule that stored
the captured data into the Dynamic Variable.

 

Dynamic Variables are called \"dynamic\" because they can do more than
just store static values. It\'s possible to assign a user-defined
program to a Dynamic Variable master record that can perform any kind of
calculation at run-time and return the value that will be used to
replace the Dynamic Variable token.

 

The LSAM software includes both a pre-compiled SQL utility program and a
model Control Language program that can be adapted as one of these
Dynamic Variable user-defined programs, so that any Field value from an
IBM i DB2 database file can be fetched as the Dynamic Variable at run
time. The field value can also be trimmed down to use any part of the
field value as the replacement for the Dynamic Variable token. The same
model CL program also illustrates how to fetch a partial or complete
value from an IBM i DB2 data area.

#### Setting Up an Event User ID and Password

In order to allow the LSAM to send valid events to the SAM-SS, a valid
User ID and password must be defined to the LSAM.

 

[Define a Valid Event User ID and Password]{.ul} 
1.  In the command line, enter **SMAGPL/STRSMA**. For more information
    on STRSMA command parameters, refer to [The STRSMA     Command](Components-and-Operation.md#The).
2.  Enter **3** to choose the **Event management** menu in the SMA Main
    Menu.
3.  Enter **2** to choose the **External Event Pass Word** option in the
    Event Management Menu.
4.  On the External Event Pass Word screen, **\<Tab\>** to the following
    fields and enter the following data:
    a.  **User Name**: type a [valid OpCon/xps user name.]{.ul}     b.  **Password**: type a [valid external event password]{.ul} for
        the User Name above.
    c.  **Password**: type a [valid external event password]{.ul} again         to verify the password.

#### Direct Event Commands

An alternative to using the CPYTOMSGIN command is to use each Event
command directly. The command processor program for an Event command
performs the same function as CPYTOMSGIN, by delivering the command and
its parameters to the LSAM communications programs.

 

Direct Event commands may be simpler than CPYTOMSGIN for a programmer to
use because each Event command can be prompted pressing \<**F4**\>
during program edit operations. When the command prompting is completed
by pressing \<**Enter**\>, the correct syntax for the command and its
parameters is returned to the program source line. A complete list and
explanation of the available event commands may be found in [\$Variables Supported in Event Commands](Message-Management.md#Event){.MCXref
.xref}. More information about Events may be found in the OpCon
documentation.

 

However, SMA generally recommends using the CPYTOMSGIN command because
it is universally compatible in case there are any changes to OpCon
Event command syntax. As well, there is special support for prompting
OpCon Event command syntax when CPYTOMSGIN is used from the LSAM
sub-menu function dedicated to Event Commands, from with LSAM Message
Management Parameters or in any form of Captured Data Response Rule (in
the response command line). In addition, the IBM i LSAM supports
translation of LSAM Dynamic Variable tokens from anywhere within the
actual Event command line, whereas the Direct Event Commands do not
offer this support.

### LSAM Operations

There are two commands that can be used to enter the IBM i LSAM green
screen workstation menu system: STRSMA and LSAMENU. The STRSMA may be
used from any IBM i command line, regardless of the current library
list, as long as the command is qualified by its library location, for
example, SMAGPL/STRSMA (replace SMAGPL with a different name, if the
default LSAM utility library is not the installation default name).
STRSMA supports specification of an LSAM environment name in one of its
parameters, and the command will set the job\'s library list
appropriately.

 

In cases where the LSAM environment library list will already be set, it
is typically more convenient to use the LSAMENU command. This alternate
command bypasses the LSAM menu system splash display, saving time and
keystrokes. It\'s also possible to specify an LSAM sub-menu number with
the LSAMENU command, so this command might be useful in configuring
links between another menu system and the LSAM menu system. The LSAMENU
command can be useful in Operator Replay scripts. The LSAMENU command
does support specification of an LSAM environment name in its ENV
parameter, but the default value of the ENV parameter is \*CURRENT - a
value that can only be used if the job is already set to use the LSAM
environment library list.

#### STRSMA Command

The command STRSMA logs a user into the IBM i LSAM menu system. It was
designed for use with IBM i interactive workstation jobs. To enter the
LSAM environment in a batch job use the SMASETLIBL command, described
next in this topic. After exiting the LSAM menu system in an interactive
job, the STRSMA command restores the interactive job\'s original library
list as its last step before returning control to the IBM i command
entry line.

 

The command STRSMA is stored in the LSAM utilities library, default name
SMAGPL. Depending on the LSAM installation options selected, this
command could instead be located in the QGPL library. The IBM i general
purpose library QGPL was previously always used by the LSAM for
utilities that enabled the support of multiple LSAM environments.
However, since LSAM version 04.00.00, the default installation option is
to keep all common LSAM utilities in the SMAGPL library. This means that
access to the LSAM menu system from IBM i command entry would require
either (1) qualifying the command with its library name (SMAGPL/STRSMA),
or (2) adding the SMAGPL library to the default user library list of
user profiles who are permitted access to the LSAM menu system or its
utility commands.

 

The LSAM utility commands such as STRSMA that are critical for
management of multiple LSAM environments have all been designed to
automatically manage the library list of the job where they are
executed. This means that when the STRSMA command is used, it will
respond to the ENV parameter where the LSAM environment is named by
first setting the job\'s library list. After the LSAM environment has
been established, the STRSMA command will complete its other functions,
primarily logging the user into the LSAM\'s green screen workstation
menu system.

##### IBM i LSAM Interactive Menu

The STRSMA command supports the interactive specification of an IBM i
LSAM environment. To begin the LSAM environment specification or
selection process, from IBM i command entry, type the command
**SMAGPL/STRSMA** and press \<**F4**\> (Prompt) to see the possible
parameter values:

IBM i LSAM Interactive Menu

  -------------------------------------------------------------------------------------------------------------------------
                                             Start SMA for Environment (STRSMA)
                                                               
                                                 Type choices, press Enter.
                                                               
   Environment name . . . . . . . .   [\*SELECT]{style="text-decoration: underline;"}       \*SELECT, \*DEFAULT or name                Show animated splash display . .   [\*YES]{style="text-decoration: underline;"}          \*YES, \*NO
                                                               
  -------------------------------------------------------------------------------------------------------------------------

+---------------------------+-----------+---------------------------+
|   STRSMA Command          |           |                           |
| Parameters                |           |                           |
+===========================+:=========:+===========================+
| Parameter                 | Default   | Description and Values    |
+---------------------------+-----------+---------------------------+
| ENV                       | \*DEFAULT | -   **\*DEFAULT**:        |
|                           |           |     Indicates that the    |
| (Environment name)        |           |     command should use    |
|                           |           |     the default           |
|                           |           |     environment in the    |
|                           |           |     configuration control |
|                           |           |     tables (refer to the  |
|                           |           |     discussion under the  |
|                           |           |     command               |
|                           |           |     [SMALIBMGT](LSA       |
|                           |           | M-Environment-Managem |
|                           |           | ent.md#SMALIBMG){.MCXref |
|                           |           |     .xref}).              |
|                           |           | -   As distributed by     |
|                           |           |     SMA, the default      |
|                           |           |     environment flag has  |
|                           |           |     been assigned to the  |
|                           |           |     environment called    |
|                           |           |     SMADEFAULT.           |
|                           |           | -   **\*SELECT**:         |
|                           |           |     Indicates the system  |
|                           |           |     should present a list |
|                           |           |     of available          |
|                           |           |     environment names for |
|                           |           |     the user to select    |
|                           |           |     from.                 |
|                           |           | -   The details of the    |
|                           |           |     selection function    |
|                           |           |     are explained below,  |
|                           |           |     under command         |
|                           |           |     SMALIBINQ.            |
|                           |           | -   The value of \*SELECT |
|                           |           |     has been set as the   |
|                           |           |     backup default value  |
|                           |           |     for the command       |
|                           |           |     processor             |
|                           |           |     subprograms, in case  |
|                           |           |     a user should specify |
|                           |           |     an incorrect value    |
|                           |           |     for the environment   |
|                           |           |     parameter.            |
|                           |           | -   **\<NAME\>**: If an   |
|                           |           |     environment name is   |
|                           |           |     already known, a user |
|                           |           |     can sign on to the    |
|                           |           |     LSAM menus for that   |
|                           |           |     environment by        |
|                           |           |     directly typing (or   |
|                           |           |     programming) a        |
|                           |           |     command string that   |
|                           |           |     is made up of the     |
|                           |           |     command name and the  |
|                           |           |     environment name.     |
|                           |           | -   **Example**: To log   |
|                           |           |     on to the original    |
|                           |           |     IBM i LSAM            |
|                           |           |     environment, type:    |
|                           |           |     STRSMA SMADEFAULT.    |
|                           |           | -   Or, just type STRSMA  |
|                           |           |     as long as the        |
|                           |           |     SMA-distributed       |
|                           |           |     default environment   |
|                           |           |     remains set to        |
|                           |           |     SMADEFAULT.           |
+---------------------------+-----------+---------------------------+
| ANIMATE                   | \*YES     | -   **\*YES**: Adds an    |
|                           |           |     entertaining          |
| (Show animated splash     |           |     animation of          |
| display)                  |           |     character graphics.   |
|                           |           |     This animation is     |
|                           |           |     useful for            |
|                           |           |     demonstrations and    |
|                           |           |     for illustrating that |
|                           |           |     the LSAM application  |
|                           |           |     is not just legacy    |
|                           |           |     code, but a           |
|                           |           |     state-of-the-art      |
|                           |           |     software suite that   |
|                           |           |     utilizes many         |
|                           |           |     creative IBM i        |
|                           |           |     techniques.           |
|                           |           |                           |
|                           |           | **Note**: The animation   |
|                           |           | of character graphics     |
|                           |           | adds two seconds to the   |
|                           |           | process of signing in to  |
|                           |           | an LSAM environment.      |
|                           |           |                           |
|                           |           | -   It may be desirable   |
|                           |           |     to specify **\*NO**   |
|                           |           |     for this parameter    |
|                           |           |     value when using the  |
|                           |           |     STRSMA command as     |
|                           |           |     part of an Operator   |
|                           |           |     Replay script. This   |
|                           |           |     would avoid the       |
|                           |           |     two-second delay and  |
|                           |           |     allow the script to   |
|                           |           |     execute more          |
|                           |           |     efficiently. An       |
|                           |           |     alternative command   |
|                           |           |     for use with an       |
|                           |           |     Operator Replay       |
|                           |           |     script would be the   |
|                           |           |     command LSAMENU.      |
+---------------------------+-----------+---------------------------+

: STRSMA Command Parameters

 

+----------------------------------+----------------------------------+
| ![White pencil icon on green     | **EXAMPLE:** [To specify the     | | circular                         | environment value when entering  |
| background](../../../Reso        | the LSAM menu system and to      |
| urces/Images/example-icon(48x48) | suppress the animation of the    |
| .png "Example icon") | splash display, the syntax would |
|                                  | be:]{.statement2}                |
|                                  |                                  |
|                                  | STRSMA ENV(\<environment_name\>) |
|                                  | ANIMATE(\*NO)                    |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | [The command can also be used    | |                                  | without the parameter keywords,  |
|                                  | but the environment must first   |
|                                  | be specified without its keyword |
|                                  | in order to specify the ANIMATE  |
|                                  | parameter without its            |
|                                  | keyword:]{.statement2}           |
|                                  |                                  |
|                                  | STRSMA \<environment_name\> \*NO |
+----------------------------------+----------------------------------+

##### Using SMASETLIBL in Batch Jobs

The command STRSMA was intended for entering the LSAM menu system and
environment from an IBM i interactive workstation job; it serves no
useful purpose in a batch job. The method for entering the LSAM
environment from a batch job is to use the SMASETLIBL command:

SMAGPL/SMASETLIBL ENV(SMADEFAULT) COMPMSG(\*SILENT)

Prompted SMASETLIBL Command

  -------------------------------------------------------------------------------------------------------------------------
                                            Set Library List for SMA (SMASETLIBL)
                                                               
                                                 Type choices, press Enter.
                                                               
   Environment name . . . . . . . .   [\*SELECT   ]{style="text-decoration: underline;"}    \*SELECT, \*DEFAULT or name            Display completion message?  . .   [\*VERBOSE  ]{style="text-decoration: underline;"}    \*SILENT, \*VERBOSE
                                                               
  -------------------------------------------------------------------------------------------------------------------------

  ------------------------------------------------------------------------------------------------------------------------------ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White \"X\" icon on red circular background](../../../Resources/Images/warning-icon(48x48).png "Warning icon")   **WARNING:** [\*SELECT may not be used in a batch job. The default operation of the STRSMA and SMASETLIBL commands substitutes a value of \*SELECT for the environment parameter if a valid value is not supplied. If this happens in a batch job, it would cause the batch job to end abnormally when the subprograms attempt to display the environment selection screen.]
  ------------------------------------------------------------------------------------------------------------------------------ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

The SMASETLIBL command simply replaces any job\'s library list with the
library list specified in the LSAM control files (stored in library
QGPL) for the named LSAM environment. When the SMASETLIBL command
completes it leaves the job library list set to the LSAM environment.
The COMPMSG parameter may be useful if it is desired to prevent logging
of the command\'s normal completion message that would log the new
library list in the form of the CHGLIBL command syntax.

##### STRSMA Splash Display

The STRSMA command by default, or when its parameter ANIMATE is
specified as (\*YES), causes an entertaining animation of character
graphics to be displayed. This animation is useful for demonstrations
and for illustrating that the LSAM application is not just legacy code,
but a state-of-the-art software suite that utilizes many creative IBM i
techniques. This delay in entering the LSAM menu system can be avoided
by specifying ANIMATE(\*NO), or by using the LSAMENU command as long as
STRSMA is used for the first entry into the LSAM menu system.

 

With our without the initial animation, the STRSMA command always starts
with a full screen splash display that identifies the LSAM environment
and also the version of the LSAM environment that is being entered. The
decision about whether to use the STRSMA or the LSAMENU command to enter
the menu system may depend on whether it is important at the time for
the user to know which LSAM environment is being entered. This decision
is also considered in the discussion below about configuring users to
log into the LSAM menu system automatically when they logon to IBM i.

 

An example of the STRSMA splash display follows.

LSAM Welcome Screen

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  [SYSTEMNAME]{style="color: #008000;"}     W E L C O M E  T O  T H E  I B M  i  A G E N T     [MM/DD/YY]{style="color: #008000;"}   [USERNAME]{style="color: #008000;"}                  [Environment:]{style="color: #008000;"} [SMADEFAULT]{style="color: #ff00ff;"}                 [HH:MM:SS]{style="color: #008000;"}
   
  Press Enter to continue to the main menu.
   
   
                   OOO           CCC
                  O   O         C   C                    [x 0   x]{style="color: #ff0000;"}                  O     O       C                          [x  x]{style="color: #ff0000;"}
                 O     O pppp  C       ooo  n nn           [x]{style="color: #ff0000;"}                  O     O p   p C      o   o n   n        [x  x]{style="color: #ff0000;"}
                 O     O p   p C      o   o n   n       [xx  xx]{style="color: #ff0000;"}                   O   O  p   p  C   C o   o n   n      [xx   xx]{style="color: #ff0000;"}
                   OOO   pppp    CCC   ooo  n   n     [xx    xx]{style="color: #ff0000;"}                          p                           [x      x]{style="color: #ff0000;"}
                         p
                              [by]{style="color: #008000;"} [SMA]{style="color: #0000ff;"}    
   
   
  [Load source:]{style="color: #008000;"}  [LI040004  PTF403170]{style="color: #00ffff;"}                        [Version:]{style="color: #008000;"} [04.00.03]{style="color: #00ffff;"}                                                            [PTF LVL:]{style="color: #008000;"} [PTF403170]{style="color: #00ffff;"}
  F3=Exit   F12=Cancel
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

#### LSAMENU Command

The LSAMENU command provides fast and direct entry into the LSAM menu
system. It bypasses the LSAM software splash display. On systems with
multiple LSAM environments where it would be desirable to know which
LSAM is being entered the STRSMA command might be preferable. The
LSAMENU command may be useful for providing a link from a different menu
system into the LSAM menu system, especially because it supports an
optional parameter to branch directly to one of the LSAM sub-menus. It
is also useful for Operator Replay scripts, as long as the Environment
name parameter is specified and not left to the default value of
ENV(\*CURRENT).

##### Using LSAMENU to enter the IBM i LSAM Interactive Menu

The LSAMENU command supports specification of an IBM i LSAM environment.
To begin the LSAM environment specification or selection process, from
IBM i command entry, type the command LSAMENU and press \<**F4**\>
(Prompt) to see the possible parameter values that are supported by this
command:

Prompted LSAMENU Command

  -------------------------------------------------------------------------------------------------------------------------------
                                              Start LSAM Menu (opt number) (LSAMENU)
                                                                  
                                                    Type choices, press Enter.
                                                                  
   Environment name . . . . . . . .   [\*CURRENT  ]{style="text-decoration: underline;"}    \*CURRENT,\*DEFAULT,\*SELECT,name             Optional sub-menu number . . . .   [0    ]{style="text-decoration: underline;"}         Optional sub-menu number
                                                                  
  -------------------------------------------------------------------------------------------------------------------------------

+---------------------------+-----------+---------------------------+
| LSAMENU Command           |           |                           |
| Parameters                |           |                           |
+===========================+:=========:+===========================+
| Parameter                 | Default   | Description and Values    |
+---------------------------+-----------+---------------------------+
| ENV                       | \*CURRENT | -   **\*CURRENT**: This   |
|                           |           |     value can only be     |
| (Environment name)        |           |     used if the           |
|                           |           |     interactive job\'s    |
|                           |           |     current library list  |
|                           |           |     includes all the      |
|                           |           |     libraries required to |
|                           |           |     define an LSAM        |
|                           |           |     environment. If an    |
|                           |           |     LSAM environment is   |
|                           |           |     not discovered in the |
|                           |           |     job\'s current        |
|                           |           |     library list, the     |
|                           |           |     LSAMENU command       |
|                           |           |     routes to the         |
|                           |           |     \*SELECT logic.       |
|                           |           | -   **\*DEFAULT**:        |
|                           |           |     Indicates that the    |
|                           |           |     command should use    |
|                           |           |     the default           |
|                           |           |     environment in the    |
|                           |           |     configuration control |
|                           |           |     tables (refer to the  |
|                           |           |     discussion under the  |
|                           |           |     command               |
|                           |           |     [SMALIBMGT](LSA       |
|                           |           | M-Environment-Managem |
|                           |           | ent.md#SMALIBMG){.MCXref |
|                           |           |     .xref}).              |
|                           |           | -   As distributed by     |
|                           |           |     SMA, the default      |
|                           |           |     environment flag has  |
|                           |           |     been assigned to the  |
|                           |           |     environment called    |
|                           |           |     SMADEFAULT.           |
|                           |           | -   **\*SELECT**:         |
|                           |           |     Indicates the system  |
|                           |           |     should present a list |
|                           |           |     of available          |
|                           |           |     environment names for |
|                           |           |     the user to select    |
|                           |           |     from.                 |
|                           |           | -   The details of the    |
|                           |           |     selection function    |
|                           |           |     are explained under   |
|                           |           |     command SMALIBINQ.    |
|                           |           | -   The value of \*SELECT |
|                           |           |     has been set as the   |
|                           |           |     backup default value  |
|                           |           |     for the command       |
|                           |           |     processor subprogram, |
|                           |           |     in case a user should |
|                           |           |     specify an incorrect  |
|                           |           |     value for the         |
|                           |           |     environment           |
|                           |           |     parameter.            |
|                           |           | -   **\<NAME\>**: If an   |
|                           |           |     environment name is   |
|                           |           |     already known, a user |
|                           |           |     can sign on to the    |
|                           |           |     LSAM menus for that   |
|                           |           |     environment by        |
|                           |           |     directly typing (or   |
|                           |           |     programming) a        |
|                           |           |     command string that   |
|                           |           |     is made up of the     |
|                           |           |     command name and the  |
|                           |           |     environment name.     |
+---------------------------+-----------+---------------------------+
| MENUNBR                   | 0         | -   **0**: Show the LSAM  |
|                           |           |     Main menu upon first  |
| (Optional LSAM sub-menu   |           |     entry into the LSAM   |
| number)                   |           |     menu system. This is  |
|                           |           |     the default value.    |
|                           |           | -   **1-6,8**: Currently, |
|                           |           |     the LSAM main menu    |
|                           |           |     supports sub-menus    |
|                           |           |     only as menu options  |
|                           |           |     1-6 and 8. Function 7 |
|                           |           |     is a direct call to   |
|                           |           |     the LSAM Parameters   |
|                           |           |     maintenance program   |
|                           |           |     and it is not allowed |
|                           |           |     as a parameter of the |
|                           |           |     LSAMENU command.      |
+---------------------------+-----------+---------------------------+

: System and User Configuration Requirements for the LSAM Menu

 

+----------------------------------+----------------------------------+
| ![White pencil icon on green     | **EXAMPLE:** [To specify the     | | circular                         | environment value and to enter   |
| background](../../../Reso        | directly to the LSAM Operations  |
| urces/Images/example-icon(48x48) | sub-menu without using command   |
| .png "Example icon") | keywords the syntax would        |
|                                  | be:]{.Exampletxt}                |
|                                  |                                  |
|                                  | [LSAMENU \<environment_name\>    | |                                  | 6]{.Exampletxt}                  |
+----------------------------------+----------------------------------+

#### System and User Configuration Requirements for the LSAM Menu

In some environments it might be helpful to configure certain user
profiles so that the IBM i LSAM master menu would be the first display
shown after the user signs on to the system. The command processor
programs of either the STRSMA command or the LSAMENU command can be used
for the INLMNU parameter of the CHGUSRPRF (or CRTUSRPRF) command.

 

The decision about which program to use may depend on whether it is
important for the user to known which LSAM environment and version is
being entered. Use the STRSMA command processor program to cause a
splash display to appear first, or the LSAMENU command processor program
to go directly to the LSAM menu system without a splash display.

 

The actual STRSMA or LSAMENU command, or either command\'s processor
program, could also be used to link directly into the LSAM menu system
from another menu system.

 

Command processor program and syntax for STRSMA:

CALL SMAGPL/STRSMAC PARM(\<environment_name\> \*NO)

 

The first parameter value can also be one of the STRSMA command special
values for the ENV keyword: \*DEFAULT or \*SELECT. Use a value of \*YES
instead of \*NO for the second parameter value if it is desired to show
the animated characters for two seconds before the splash display
appears.

 

Command processor program and syntax for LSAMENU:

CALL SMAGPL/LSAMENUC PARM(\<environment_name\> 0)

 

The values for the first parameter are the values for the ENV keyword of
the LSAMENU command, but it is not recommended to use the \*CURRENT
value because the LSAM library list will not likely be set when this
program is used as the initial program of a user profile or if it is
called from another menu processor.

### SBMDBFCMD -- Submit Database File Command

A symbolic command SBMDBFCMD can be used in an OpCon/xps job master
record to support extra long command lines in a SBMJOB command, up to
the maximum of 20,000 characters supported by IBM i.

 

To run IBM i jobs that require command lines longer than the 2,000
characters currently supported by OpCon/xps, store the command line text
in an IBM i source file member (with a record length of 112). The
OpCon/xps EM for IBM i job master records can then be configured under
the Call information tab to Call the command SBMDBFCMD. This
pseudo-command name is followed by a quoted string that names the
library, file and source member where the actual command text was stored
(refer to examples below). When the job is scheduled to run, the IBM i
LSAM job scheduler will replace the SBMDBFCMD with the text it finds in
the source member as it submits the job.

 

When LSAM debug logging has been turned on, both the original SBMDBFCMD
text and the subsequent, replaced CMD parameter of the SBMJOB command
will appear in the log file LSALOGF30. Existing LSAM messages that
appear in the OpCon/xps job schedule status display are used to report
any task failures, but additional extensions to some messages are
provided to help diagnose specific errors that might occur when using
the SBMDBFCMD command.

#### Configure OpCon/xps Job Master in the EM

As shown in the following example, the new SBMDBFCMD is typed into the
CALL field under the Call information tab of an IBM i job master record
of the OpCon/xps EM.

IBM i Job Master Details - SBMDBFCMD Example

![IBM i Job Master Details - SBMDBFCMD Example](../../../Resources/Images/IBM-i/IBM-i-Job-Master-Details---SBMDBFCMD-Example.png "IBM i Job Master Details - SBMDBFCMD Example"){.flat}

#### SBMDBFCMD syntax

There are various forms of the SBMDBFCMD that are acceptable. The basic
requirements are that the command name appears first in the Call field
and that it be followed by a string enclosed in single quotes that names
the library/file (source_member) where the command line text will be
found. This command is not case sensitive -- it will be translated to
all upper case by the IBM i LSAM job scheduler, according to IBM i
standards.

 

There is actually a SBMDBFCMD that has been added to the IBM i LSAM
software, but it serves only as a token for controlling user authority
to this feature and as a model of how the command syntax should appear
in the OpCon/xps EM Call field.

 

Following are some variations on the command syntax that are all
acceptable:

SBMDBFCMD FILE(\'MYLIB/MYFILE(MYMEMBER)\')

sbmdbfcmd file(\'mylib/myfile(mymember)\')

SBMDBFCMD (\'MYLIB/MYFILE(MYMEMBER)\')

sbmdbfcmd \'mylib/myfile(mymember)\'

 

It is possible to experiment with this command and its syntax from a
command entry line within the LSAM menu system. A documentary version of
an actual IBM i command exists for this purpose. Type in the command
with a string and press \<**Enter**\>, or type just the command and
press \<**F4**\> to enter the quoted string into a prompted FILE
parameter field and then press \<**Enter**\>. An example of using the
documentary command is offered below.

 

  -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [The string that names the library/file (source_member) MUST be enclosed in single quotes. The SBMDBFCMD substitution processing will fail if the quotes are missing. Double quotes are not supported.]
  -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

#### The IBM i SBMDBFCMD Command

An actual IBM i command called SBMDBFCMD is included in the IBM i LSAM
software. This command itself is not used by the IBM i LSAM job
scheduler to perform the actual substitution of the command line text in
the SBMJOB command prepared by the job scheduler. Its primary purpose is
to control authorization of users to this new function.

 

However, the command itself is useful for the purpose of experimenting
with the syntax of the SBMDBFCMD Call string, as noted above. Users
authorized to the command can use it from the command line within the
LSAM menu system. Type the same command syntax as documented above and
then press \<**Enter**\> to help assure that the library/file (member)
string is correctly formatted. It is also possible to prompt the command
using \<**F4**\>, type in the quoted library/file (member) string, and
then press \<**F3**\> to exit the prompt (or, press \<**Enter**\> to
view the display and then quit the display). After using this command
from command entry, the resulting command string that can be retrieved
from command entry could be copied from the green screen workstation and
pasted into the OpCon/xps EM job master Call field.

 

When \<**Enter**\> is pressed after typing or prompting the SBMDBFCMD
and its FILE string parameter, the following display is presented. This
display panel is a simple form of documentation for the function.

SBMDBFCMD Pseudo-Command Display

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------
   [SBMDBFCMD]{style="color: #008000;"}                 Submit command from DB file                   [00/00/00]{style="color: #008000;"}    USERNAME                                                                10:11:34
   
   For display only, press Enter to exit.
   
   [File string:]{style="color: #008000;"} [mylib/myfile(mymember)                                            ]{style="color: #ffcc00;text-decoration: underline;"}   \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
  \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
  \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
   
   The SBMDBFCMD command does not perform any action itself. It exists for the
  purpose of controlling authority to the SMA IBM i LSAM function it represents.
  Refer to the IBM i LSAM Administration guide for instructions about how to use
  this command to cause OpCon/xps job scheduling to retrieve the actual command
  line from an IBM i source file member.
   
   F3=Exit   F12=Cancel
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------

Notice in the example above that the File string does not show the
single quotes from this display panel. However, if the string is entered
without using the single quotes, the command will fail to execute.

#### SBMDBFCMD Command Security

The actual IBM i command called SBMDBFCMD was created primarily as a way
to control who has access to this new feature. Without careful security
controls, the ability to run commands from an IBM i source file could
create security loopholes.

 

There are at least two methods by which security should be controlled in
order to prevent any security loopholes when using the SBMDBFCMD
convention in OpCon/xps jobs for IBM i:

-   Secure the command object itself to prevent unauthorized users from
    access to this feature.
-   Secure the IBM i source files where command line entries will be
    stored.

Both of these strategies depend on IBM i object authority. The first and
most important line of defense is the authority to use the actual IBM i
command object, SBMDBFCMD, which is stored in the LSAM\'s program object
libraries. (The default names of those libraries. When subsequent LSAM
release upgrades are installed, this command will be relocated to the
base programs library, default name SMAPGM. Other library names may be
used when multiple LSAM environments have been created.)

 

The IBM i LSAM job scheduler will perform an explicit inquiry to assure
that the user named in the OpCon/xps job master has \*EXECUTE authority
(a subset of \*USE general authority, for program objects) to the
command object. Even though the command object is not used during the
preparation of the substitute command line, this authority check by the
LSAM will prevent an unauthorized user from gaining access to this
feature. Thus, unauthorized users cannot set up an OpCon/xps job to
execute any command line they wish from any source file member they
choose. Only IBM i user profiles that have been authorized to \*EXECUTE
the command SBMDBFCMD will be allowed to run command lines that were
stored in IBM i source files.

 

Coupled with the command object authority, carefully secure the IBM i
source file where the command text for OpCon/xps jobs will be stored.
Only authorized users should be allowed to view and/or update the
special source files created for this purpose. Do not use source files
that are generally available to the public; otherwise the source members
are exposed to potential changes that could be made by unauthorized
users. In other words, if unauthorized users are allowed to update the
source file, they could change the command line text of a scheduled job
so that it runs some unauthorized process. The unauthorized process
could be a malicious program.

#### SBMDBFCMD Command Source File

SMA recommends creating a unique and well-secured IBM i source physical
file to store command line text. The source file must use a source file
record length of 112, which will yield a source data field size of 100
bytes, in order to be compatible with the IBM i job scheduler process
that reads source members to substitute the command line text.

 

To create an appropriate source file use the following IBM i command:

CRTSRCPF FILE(MYLIB/MYFILE) RCDLEN(112) AUT(\*EXCLUDE)

 

The AUT parameter in the example above is not a required value. However,
SMA recommends revoking public authority to any source file that will be
used to store command line text in order to help secure the system.

 

The command line source file for SBMDBFCMD can be located in any
library. However, the library chosen may become part of a strategy for
restricting access to this command line source file. Please review the
discussion on command authority above.

 

Any meaningful source member name may be used. The source file member
may be created and edited using any of the tools that IBM i will
support, including Websphere development studio or the simple SEU source
file editor from a green screen workstation. It is also possible to
write a conversion program that would export long command lines from
some software application and insert them automatically into command
line source file members.

 

The potential for automating conversions makes the SBMDBFCMD command
line strategy attractive for any job command lines that are very long.
Even though OpCon/xps will support up to 2,000 characters in the Call
field of the job master, it might be helpful to use the SBMDBFCMD
convention for command lines whenever long command lines are required
instead of having to type hundreds of characters into the OpCon/xps
command line field.

### Dynamic Variable Management

#### SETHEXDV: Set hex value in a Dynamic Variable

The purpose of the SETHEXDV command is to make it possible to store
low-level hexadecimal character values as the Value of a Dynamic
Variable, so that a {DynVar} token can be used to insert these special
values into any field that already supports translating Dynamic Variable
tokens, such as the Response Rule Command field, or the CPYMSGIN Event
command string of the CPYTOMSGIN command.

 

One of the most useful purposes for hexadecimal values is to format the
message body of a text message generated by the OpCon \$NOTIFY:EMAIL
Event command. Except for the start of the first line of message text, a
Dynamic Variable token could be used to insert a CR (carriage return)
and LF (line feed) character pair, wherever the user wants the message
body to continue at a new line. This makes it possible to produce nicely
formatted information lists, as well as separate paragraphs within the
message body of an eMail message.

 

To prepare the CR+LF value, use the SETHEXDV command to store the value
string represented by this notation: X\'0D25\' as two characters that
will be the value used to replace a token such as {CRLF}. Users who
understand EBCDIC hexadecimal characters and their uses can create many
other types of formatting sequences; however, it will be necessary to
test whether these will pass through the OpCon Event command processor
program in the OpCon server, after the EBCDIC hex values have been
translated to the ASCII character set that OpCon uses.

 

  -------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **HINT:** Use the command SMAGPL/CPYTOMSGIN to test any Event command, since that LSAM command supports translating Dynamic Variable tokens. The LSAM sub-menu 3, option 1, supports a sub-prompt of most OpCon Event commands within the CPYMSGIN keyword field of the CPYTOMSGIN command, so it\'s easy to correctly format the OpCon Event command string. Insert a {DynVar} token anywhere within the Event command text string, although the hex values are only useful in the Subject Line or the Message Body parameters of the \$NOTIFY:EMAIL Event command.
  -------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

##### Using The SETHEXDV Command

The IBM i LSAM command SETHEXDV requires that the job\'s library list
include the LSAM environment library names. So it\'s easiest to use this
command from the IBM i command entry line in the LSAM menu system.

 

Here is an example of how to use this command to store the CR + LF
characters:

     SETHEXDV VARNAM(CRLF) VALUE(0D25)

              DESC(\'Carriage Return + Line Feed characters\')

 

One of the limitations of storing low-level hex characters as a Value
for a Dynamic Variable is that the DSPDYNVAR value test command does not
produce readable results. This means that testing these types of values
would have to be performed by sending them to OpCon as part of an Event
command where it makes sense to use them. You can view the results both
in the SMA.log file of the OpCon database, as well as in an email
message that is sent to a test email account.

 

For further assistance with the SETHEXDV command, please contact SMA
Support.

#### LOGDYNVAR: Set hex value in a Dynamic Variable

The LSAM utility command named LOGDYNVAR is located in the SMAPGM
library. This command and the table of values that it maintains (a file
named LOGDYNVAR in library SMADTA) was created to store a series of
captured data values that would each be stored into the same Dynamic
Variable, at different times. If this command is used to record a copy
of the Value each time the Dynamic Variable is updated, then the series
of values could later be queried to produce statistical results such as
an average, for example, of system CPU or Disk utilization.

 

The LOGDYNVAR table adds value to the data store by automatically
assigning a time stamp to each entry. This makes it possible to limit
value surveys within any specified range of times. The table also
supports a 12-character Key field (originally designed to match the
longest possible Dynamic Variable name), a 20-character user-defined
CODE column (field) and a 32-character Description column. All three of
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

##### Using the LOGDYNVAR Command and Table

Values captured from messages, reports, and workstation displays can be
easily stored into Dynamic Variables using the \"Store to -\>\" field of
an LSAM Response Rule that can be associated with any Capture Rule. If
the Response Rule also executes the new LOGDYNVAR command, then a series
of values for the same Dynamic Variable name can be stored with a
timestamp and the name of the Dynamic Variable (plus the optional
assignment of text values to the CODE and DESC fields) by specifying the
Dynamic Variable as a token for the DVVALUE parameter of the LOGDYNVAR
command (as illustrated below).

 

Here is the layout of the LOGDYNVAR table:

 

  Field          Type      Length  Description
  ----------- ----------- -------- ------------------------------------------
  DVRECDATE    TIMESTAMP     26    Automatically assigned
  DVPRIMARY     NUMERIC      9     Automatically assigned
  DVNAME       CHARACTER     12    Dynamic Variable name or other name
  DVVALUE      CHARACTER    128    Current (or any) captured value
  DVCODE       CHARACTER     20    User-defined category, for SQL Select
  DVDESC       CHARACTER     32    User-defined description, opt for Select

 

Here is the syntax of the LOGDYNVAR command:

SMAPGM/LOGDYNVAR DVNAME(DVORKEYNAME1)  +

     VALUE(\'Any value string contained within a pair of single -

       quotes.\')  +

     CODE(\'MY-CODEA-CPU-UTIL\')  +

     DESC(\'CPU utilization from DSPSYSSTS\')

 

  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [Any value can be used for the DVNAME key value, but if it contains special characters or spaces, or it begins with a non-alpha character, then it must be contained within a pair of single quotes.]
  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

After one or more values has been stored in association with the same
key value (which could be the Dynamic Variable name), then another
Dynamic Variable can be used to query the series of values by using the
User Program special value of \*DB2. This allows a predefined SQL SELECT
statement to be executed whenever the new Dynamic Variable token will be
replaced.

 

Following is an example of the SQL syntax that can be used to produce a
single average value for the new Dynamic Variable. The data and SQL
clauses used in this example are explained in the notes that follow the
example.

 

+----------------------------------+----------------------------------+
| ![White pencil icon on green     | **EXAMPLE:**                     | | circular                         |                                  |
| background](../../../Reso        |                                  |
| urces/Images/example-icon(48x48) |                                  |
| .png "Example icon") | SELECT \'CPU avg: \' CONCAT      |
|                                  | AVG(DEC(DVVALUE,4,1))            |
|                                  |                                  |
|                                  |  FROM SMADTA/LOGDYNVAR           |
|                                  |                                  |
|                                  |  WHERE DVNAME LIKE \'CPU%\'      |
|                                  |                                  |
|                                  |   AND DVRECDATE \>=              |
|                                  | \'2017-07-10-00.00.00.000\'      |
|                                  |                                  |
|                                  |   AND DVRECDATE \<=              |
|                                  | \'2017-07-12-23.59.59.000\'      |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | EXAMPLE RESULT:                  |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | CPU avg: 15.2                    |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | **Example Notes:**               |
|                                  |                                  |
|                                  | 1.  The SQL statement above can  |
|                                  |     be typed entirely into the   |
|                                  |     WHERE field of a \*DB2       |
|                                  |     extension to a Dynamic       |
|                                  |     Variable master record, if   |
|                                  |     the \"field/col\" field is   |
|                                  |     set to a value of            |
|                                  |     \"\*WHERE\".                 |
|                                  | 2.  The example above assumes    |
|                                  |     that the CPU utilization was |
|                                  |     captured from the DSPSYSSTS  |
|                                  |     display on a screen format,  |
|                                  |     and that its maximum value   |
|                                  |     could be 999.9. The captured |
|                                  |     character string is          |
|                                  |     converted to a Decimal value |
|                                  |     using the SQL DEC keyword    |
|                                  |     and its associated numeric   |
|                                  |     size parameters (4 digits,   |
|                                  |     of which 1 is to the right   |
|                                  |     of the decimal point).       |
|                                  | 3.  The LOGDYNVAR command and    |
|                                  |     table support two other      |
|                                  |     user-defined fields (table   |
|                                  |     columns):                    |
|                                  | 4.  The LSAM does not support    |
|                                  |     any automatic purging of the |
|                                  |     LOGDYNVAR table. This is     |
|                                  |     entirely up to the user. The |
|                                  |     table could be purged by     |
|                                  |     using an SQL statement that  |
|                                  |     deletes all records with     |
|                                  |     timestamps older than a      |
|                                  |     user-specified value.        |
+----------------------------------+----------------------------------+

### Translation Table Testing

The IBM i LSAM software includes two commands that may help to diagnose
problems with translation tables. The LSAM Parameters configuration
screens and the SMAFT (SMA File Transfer) Parameters screens allow
specification of user-defined translation tables, as well as alternate
CCSIDs (character code set IDs). These parameters are explained in the
Configuration topic, under the topics of Communications Parameters and
the extended Discussion on Translation Tables, and in the SMA File
Transfer topic. The LSAM translation table testing commands provide a
simplified method of access to technical data that can help to confirm
that a translation table or CCSID should work correctly with the LSAM.

 

  ------------------------------------------------------------------------------------------------------------------------------ ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White \"X\" icon on red circular background](../../../Resources/Images/warning-icon(48x48).png "Warning icon")   **WARNING:** [Great caution must be exercised when changing the translation tables used by the LSAM. These tables must always support the existing OpCon transaction protocol rules; therefore, the reserved characters utilized by the OpCon transaction protocol must be understood. Industry standard XML protocol characters are among those that must be protected.]
  ------------------------------------------------------------------------------------------------------------------------------ ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

IBM supports the creation of user-defined translation tables under IBM
i. IBM supplies documentation that explains how to perform the following
steps that might be useful in the process of developing new translation
tables that would more aptly serve a unique environment:

-   Work with tables (WRKTBL) to view their contents
-   Retrieve the definition of an existing translation table into a
    source file member (RTVTBLSRC)
-   Create or update a translation table source file member to modify
    how the translation works
-   Create a user-defined translation table in a DB2 UDB (DB2/400)
    library (CRTTBL)

Once a user-defined translation table has been created, before it is
specified in the IBM i LSAM Parameters it should be thoroughly tested
using the LSAM translation table testing utilities. A strategy for using
these utilities follows.

#### Translation Table Versus CCSID

When using the LSAM translation table testing tools it is important to
understand the different uses that the LSAM makes of translation tables,
as compared to CCSID codes. Their uses depend on two different groups of
LSAM functions. One LSAM function group includes the LSAM server jobs
that handle Job Scheduling on behalf of OpCon SAM, along with the JORS
(job output retrieval service) function. The other LSAM function group
manages SMA File Transfer functions, including the LSAM Server task and
the LSAM Agent jobs.

 

Initially, by default, the LSAM uses translation tables as specified in
the LSAM control parameters when translating the OpCon transaction
protocol from the IBM i native EBCDIC character set (as used by the LSAM
jobs) to and from the Microsoft Windows native ASCII character set (as
used by the OpCon SMANetCom routines and SAM-SS). All of the information
related to starting jobs, reporting job status, sending job result
messages to SAM and also the processing of OpCon Event commands, are all
controlled by the two translation tables specified in the LSAM
Parameters control function (LSAM main menu, option 7). The OpCon
initial request to start an SMA File Transfer (SMAFT) jobs also falls
into this category of work that is managed by the LSAM\'s Job Scheduling
server, although the details about the file transfer are managed in a
different data communications link once the SMA File Transfer job has
been started.

 

In a similar fashion, the LSAM SMAFT Server task uses translation tables
to exchange file transfer control information with other LSAMs, after
OpCon SAM gets a file transfer job started at one of the participating
LSAMs. But the translation of the SMAFT control transactions is managed
according to an (optionally) different set of translation tables
specified in the LSAM\'s SMAFT Parameters control function \*LSAM
sub-menu 8, option 7).

 

In most cases, the translation between EBCDIC and ASCII for SMAFT
control transactions would be the same as when LSAMs are communicating
about job scheduling with SAM in the OpCon central server. But the IBM i
LSAM makes allowance for the possibility that certain LSAMs might
require a slight variation in translation tables, since the control of a
file transfer is managed directly between the IBM i LSAM and another
LSAM.

 

Separately from the control transactions, the actual file data that is
being transferred by the SMA File Transfer protocol is handled in the
IBM i LSAM by CCSID codes specified in the SMAFT Parameters (LSAM
sub-menu 8, option 7). These are used only for translating the
transferred file content. CCSID character translation is used only when
the file transfer is not binary, that is, when the transfer was defined
as a text transfer (in which case the character sets on either side of
the transfer could be ASCII and/or EBCDIC).

 

The character translation function for SMAFT file content can optionally
be managed on a per-job basis, depending on the LSAMs that are connected
for the transfer and on the capabilities of each LSAM\'s native
database. For example, the IBM i LSAM and the IBM z/OS LSAM are capable
of detecting the native CCSID of the source data and then sending that
information to each other so that the original file content may be
accurately preserved. Also, the IBM i LSAM will always use the existing
CCSID of a target database or stream file with its own machine, if that
file exists prior to the start of writing new data that arrives via an
SMA File Transfer.

 

But in cases where the SMA File Transfer job does not deliver
instructions to the IBM i LSAM SMAFT programs, and no existing file
definition information can be found to determine the correct CCSID for
the data, the LSAM will use the default CCSID specified in the LSAM\'s
SMAFT control parameters.

 

The LSAM translation testing tools support both translation tables and
CCSID character sets. In cooperation with the OpCon SAM Message log and
a special form of OpCon job command for an IBM i job, it is possible to
isolate and test character translation in either direction, using any
available translation table pair, or any available pair of CCSID codes.

#### LSATBLTEST Utility Command

The command LSATBLTEST should be used from within the IBM i LSAM menu
system or from a command entry screen where the LSAM environment library
list has been set, typically by using the SMASETLIBL command.

 

When the command is executed, it always checks for the required utility
data queue, LSATBLT00, in the SMADTA (or equivalent) library. If the
data queue does not exist, it will be created. It is important that this
command be used first, before the special OpCon job command TESTLSATBL,
in order to complete this function of creating the data queue because it
is used for communications between the LSAM server programs and this
utility command.

 

The command next causes a test display to appear on the screen. The test
display includes some instructions, and it supports function keys that
may be used to execute different forms of translation table testing.

 

  ------------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White triangle icon on yellow circlular background](../../../Resources/Images/caution-icon(48x48).png "Caution icon")   **CAUTION:** [SMA recommends that a separate, test LSAM environment be utilized for the purpose of fully testing a new translation table before that table is specified in the live LSAM environment.]
  ------------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

While performing translation tests, remember that all translation in
either direction (sending or receiving) is controlled by this test
program and not by the usual LSAM translation routines. (The LSAM server
jobs are coded to recognize when the TESTLSATBL command has been
requested by OpCon.) Therefore, be sure to choose appropriate
translation settings before using the \<**Enter**\> key or any function
key.

##### LSATBLTEST Utility Display

When the LSATBLTEST command is entered, the following utility display
appears.

LSATBLTEST Utility Command Display (F11-EBCDIC Mode)

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
   [LSATBLR1]{style="color: #008000;"}                Test LSAM Translation Tables                  [00/00/00]{style="color: #008000;"}    [USERNAME              Translation Mode:]{style="color: #008000;"} [EBCDIC -\> ASCII ]{style="color: #ff00ff;"}              [00:00:00]{style="color: #008000;"}
   
  Type any options and EBCDIC text, press Enter for local or F14=Send to OpCon.
  To test ASCII with OpCon job, run command TESTLSATBL and up to 70 characters
   [of TEXT, then press F17. CMD:]{style="color: #0000ff;"}  [TESTLSATBL TEXT(\'any ASCII character\')]{style="color: #008000;"}   Use F20 to retranslate same data with new options. F2=clear data only.
           NOTE: Send uses these translation options, not LSAM routines.
  Use Table or CCSID . : [T]{style="color: #ffcc00;text-decoration: underline;"}  [T=table, C=CCSID]{style="color: #0000ff;"}       SMAFT ASCII CCSID : [00819]{style="color: #00ffff;text-decoration: underline;"}   EBCDIC-to-ASCII table: [QASCII    ]{style="color: #ffcc00;text-decoration: underline;"}                SMAFT EBCDIC CCSID: [00037]{style="color: #00ffff;text-decoration: underline;"}
    Library  . . . . . :   [QSYS      ]{style="color: #ffcc00;text-decoration: underline;"}              Job default CCSID\*: [00037]{style="color: #00ffff;text-decoration: underline;"}   ASCII-to-EBCDIC table: [QEBCDIC   ]{style="color: #ffcc00;text-decoration: underline;"}                Alt ASCII CCSID . : [00000]{style="color: #ffcc00;text-decoration: underline;"}
    Library  . . . . . :   [QSYS      ]{style="color: #ffcc00;text-decoration: underline;"}              Alt EBCDIC CCSID  : [00000]{style="color: #ffcc00;text-decoration: underline;"}     [\* NOTE: Job default CCSID used for EBCDIC char. Use F10=Hex for other CCSID.]{style="color: #0000ff;"}
  [F2=CLR]{style="color: #0000ff;"}   1\...5\...10\....5\...20\....5\...30\....5\...40\....5\...50\....5\...60\....5\...70   [EBCDIC:]{style="color: #008000;"}  [                                                                      ]{style="color: #ffcc00;text-decoration: underline;"}
  (Hex1:)  [0000000000000000000000000000000000000000000000000000000000000000000000]{style="text-decoration: underline;"}   (Hex2:)  [0000000000000000000000000000000000000000000000000000000000000000000000]{style="text-decoration: underline;"}
   
    ASCII  0000000000000000000000000000000000000000000000000000000000000000000000
           0000000000000000000000000000000000000000000000000000000000000000000000
   
  F5=Refresh  F10=Hex  F11=Mode  F14=Send msg  F17=Receive msg  F20=Retranslate
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

Function key F10 enables the Hex1/Hex2 fields for input, instead of the
EBCDIC character input field.

LSATBLTEST Utility Command Display (F11-ASCII Mode)

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
   [LSATBLR1                ]{style="color: #008000;"}Test LSAM Translation Tables                 [00/00/00]{style="color: #008000;"}    [USERNAME             Translation Mode:]{style="color: #008000;"} [ASCII -\> EBCDIC               ]{style="color: #ff00ff;"}[00:00:00]{style="color: #008000;"}
   
  Type any options and ASCII hex, then press Enter for local translation.
  To test ASCII with OpCon job, run command TESTLSATBL and up to 70 characters
   [of TEXT, then press F17. CMD:]{style="color: #0000ff;"}  [TESTLSATBL TEXT(\'any ASCII character\')]{style="color: #008000;"}   Use F20 to retranslate same data with new options. F2=clear data only.
   
  [Use Table or CCSID . :]{style="color: #008000;"} [T]{style="color: #ffcc00;text-decoration: underline;"}  [T=table, C=CCSID]{style="color: #0000ff;"}       [SMAFT ASCII CCSID :]{style="color: #008000;"} [00819]{style="color: #00ffff;text-decoration: underline;"}   [EBCDIC-to-ASCII table:]{style="color: #008000;"} [QASCII    ]{style="color: #ffcc00;text-decoration: underline;"}                [SMAFT EBCDIC CCSID:]{style="color: #008000;"} [00037]{style="color: #00ffff;text-decoration: underline;"}
    [Library  . . . . . :]{style="color: #008000;"}   [QSYS      ]{style="color: #ffcc00;text-decoration: underline;"}              [Job default CCSID :]{style="color: #008000;"} [00037]{style="color: #00ffff;text-decoration: underline;"}   [ASCII-to-EBCDIC table:]{style="color: #008000;"} [QEBCDIC   ]{style="color: #ffcc00;text-decoration: underline;"}                [Alt ASCII CCSID . :]{style="color: #008000;"} [00000]{style="color: #ffcc00;text-decoration: underline;"}
    [Library  . . . . . :]{style="color: #008000;"}   [QSYS      ]{style="color: #ffcc00;text-decoration: underline;"}              [Alt EBCDIC CCSID  :]{style="color: #008000;"} [00000]{style="color: #ffcc00;text-decoration: underline;"}    
  [F2=CLR]{style="color: #0000ff;"}  1\...5\...10\....5\...20\....5\...30\....5\...40\....5\...50\....5\...60\....5\...70   [EBCDIC:]{style="color: #008000;"} [                                                                      ]{style="text-decoration: underline;"}
    Hex1: 0000000000000000000000000000000000000000000000000000000000000000000000
    Hex2: 0000000000000000000000000000000000000000000000000000000000000000000000
   
   [ASCII:]{style="color: #008000;"} [0000000000000000000000000000000000000000000000000000000000000000000000]{style="color: #ffcc00;text-decoration: underline;"}     [Hex2:]{style="color: #008000;"} [0000000000000000000000000000000000000000000000000000000000000000000000]{style="color: #ffcc00;text-decoration: underline;"}
   
   F5=Refresh          F11=Mode                F17=Receive msg   F20=Retranslate
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

There is no support for F10=Hex or F14=Send msg in the ASCII mode, since
this mode is for local testing only, and it is always driven by entering
the hexadecimal equivalent of ASCII characters into the ASCII and
ASCII-Hex2 fields.

###### Menu Pathways

Main Menu \> Selection or command line \> type LSATBLTEST and press
\<Enter\>

###### Fields

+----------------------+----------------------+----------------------+
| Field                | Default              | Description          |
+======================+:====================:+======================+
| Use Table or CCSID   | T                    | -   T = use          |
|                      |                      |     translation      |
|                      |                      |     tables, as       |
|                      |                      |     specified on     |
|                      |                      |     left of screen.  |
|                      |                      | -   C = use CCSID    |
|                      |                      |     codes, as        |
|                      |                      |     specified on     |
|                      |                      |     right of screen. |
|                      |                      | -   Set this field   |
|                      |                      |     and choose the   |
|                      |                      |     appropriate      |
|                      |                      |     tables or codes  |
|                      |                      |     before           |
|                      |                      |     performing any   |
|                      |                      |     operations, to   |
|                      |                      |     determine how    |
|                      |                      |     translation is   |
|                      |                      |     done in either   |
|                      |                      |     direction        |
|                      |                      |     (sending or      |
|                      |                      |     receiving        |
|                      |                      |     messages).       |
+----------------------+----------------------+----------------------+
| EBCDIC to ASCII      | The LSAM Parameters  | -   Initially, the   |
| table                | value, or QASCII     |     utility displays |
|                      |                      |     the LSAM         |
|                      |                      |     Parameters       |
|                      |                      |     control file     |
|                      |                      |     value for this   |
|                      |                      |     translation      |
|                      |                      |     table. If no     |
|                      |                      |     value is present |
|                      |                      |     in the control   |
|                      |                      |     file, the IBM i  |
|                      |                      |     system default   |
|                      |                      |     translation      |
|                      |                      |     table used to    |
|                      |                      |     translate EBCDIC |
|                      |                      |     characters to    |
|                      |                      |     the extended     |
|                      |                      |     ASCII character  |
|                      |                      |     set is           |
|                      |                      |     displayed. This  |
|                      |                      |     initial value is |
|                      |                      |     the one          |
|                      |                      |     currently used   |
|                      |                      |     by the IBM i     |
|                      |                      |     LSAM             |
|                      |                      |     communications   |
|                      |                      |     server programs. |
|                      |                      | -   This value can   |
|                      |                      |     be changed to a  |
|                      |                      |     user-selected    |
|                      |                      |     translation      |
|                      |                      |     table for        |
|                      |                      |     testing when the |
|                      |                      |     Use code is set  |
|                      |                      |     to T = Table.    |
|                      |                      |     This table is    |
|                      |                      |     used when a text |
|                      |                      |     string is typed  |
|                      |                      |     into the EBCDIC  |
|                      |                      |     input field for  |
|                      |                      |     use with the     |
|                      |                      |     \<**Enter**\>    |
|                      |                      |     key or with      |
|                      |                      |     \<**F14**\>.     |
+----------------------+----------------------+----------------------+
| Library              | The LSAM Parameters  | The UDB DB2          |
|                      | value, or QSYS       | (DB2/400) library    |
|                      |                      | where the            |
|                      |                      | translation table is |
|                      |                      | stored.              |
+----------------------+----------------------+----------------------+
| ASCII to EBCDIC      | The LSAM Parameters  | -   Initially, the   |
| table                | value, or QEBCDIC    |     utility displays |
|                      |                      |     the LSAM         |
|                      |                      |     Parameters       |
|                      |                      |     control file     |
|                      |                      |     value for this   |
|                      |                      |     translation      |
|                      |                      |     table. If no     |
|                      |                      |     value is present |
|                      |                      |     in the control   |
|                      |                      |     file, the IBM i  |
|                      |                      |     system default   |
|                      |                      |     translation      |
|                      |                      |     table used to    |
|                      |                      |     translate the    |
|                      |                      |     extended ASCII   |
|                      |                      |     character set to |
|                      |                      |     EBCDIC           |
|                      |                      |     characters is    |
|                      |                      |     displayed. This  |
|                      |                      |     value is the one |
|                      |                      |     currently used   |
|                      |                      |     by the IBM i     |
|                      |                      |     LSAM             |
|                      |                      |     communications   |
|                      |                      |     server programs. |
|                      |                      | -   This value can   |
|                      |                      |     be changed to a  |
|                      |                      |     user-selected    |
|                      |                      |     translation      |
|                      |                      |     table for        |
|                      |                      |     testing when the |
|                      |                      |     Use code is set  |
|                      |                      |     to T = Table.    |
|                      |                      |     This table is    |
|                      |                      |     used when a text |
|                      |                      |     string is typed  |
|                      |                      |     into the ASCII   |
|                      |                      |     Hex input field, |
|                      |                      |     or is received   |
|                      |                      |     from an OpCon    |
|                      |                      |     test job with    |
|                      |                      |     \<**F17**\>.     |
+----------------------+----------------------+----------------------+
| Library              | The LSAM Parameters  | The UDB DB2          |
|                      | value, or QSYS       | (DB2/400) library    |
|                      |                      | where the            |
|                      |                      | translation table is |
|                      |                      | stored.              |
+----------------------+----------------------+----------------------+
| SMAFT ASCII CCSID    | LSAM Parameters      | The default          |
|                      |                      | character code set   |
|                      |                      | assigned in the LSAM |
|                      |                      | SMA File Transfer    |
|                      |                      | (SMAFT) Parameters   |
|                      |                      | is displayed. This   |
|                      |                      | code is assumed to   |
|                      |                      | represent the        |
|                      |                      | character set for    |
|                      |                      | the ASCII data being |
|                      |                      | tested, if the Alt   |
|                      |                      | ASCII CCSID is left  |
|                      |                      | at zeros.            |
+----------------------+----------------------+----------------------+
| SMAFT EBCDIC CCSID   | LSAM Parameters      | The default          |
|                      |                      | character code set   |
|                      |                      | assigned in the LSAM |
|                      |                      | SMAFT Parameters is  |
|                      |                      | displayed. This code |
|                      |                      | is displayed for     |
|                      |                      | reference. If the    |
|                      |                      | user-specified ALT   |
|                      |                      | EBCDIC CCSID field   |
|                      |                      | is left at zeros,    |
|                      |                      | the program assumes  |
|                      |                      | the Job default      |
|                      |                      | CCSID represents     |
|                      |                      | EBCDIC data.         |
+----------------------+----------------------+----------------------+
| Job default CCSID    | IBM i job current    | The default          |
|                      | value                | character code set   |
|                      |                      | of the IBM i job is  |
|                      |                      | assumed to be        |
|                      |                      | assigned to EBCDIC   |
|                      |                      | data when the        |
|                      |                      | user-defined Receive |
|                      |                      | or To-CCSID are left |
|                      |                      | at zeros.            |
|                      |                      |                      |
|                      |                      |                      |
|                      |                      |                      |
|                      |                      | **Note**: The job    |
|                      |                      | default CCSID is     |
|                      |                      | always the default   |
|                      |                      | that is used to      |
|                      |                      | represent an EBCDIC  |
|                      |                      | text string that is  |
|                      |                      | manually typed into  |
|                      |                      | this display\'s      |
|                      |                      | input field, such as |
|                      |                      | before testing a     |
|                      |                      | local translation or |
|                      |                      | when creating a text |
|                      |                      | message to send to   |
|                      |                      | the OpCon SAM log    |
|                      |                      | using \<**F14**\>.   |
+----------------------+----------------------+----------------------+
| Alt ASCII CCSID      | zeros = not used     | Set the translation  |
|                      |                      | type to C=CCSID,     |
|                      |                      | then type a 5-digit  |
|                      |                      | CCSID code (using    |
|                      |                      | leading zeros as     |
|                      |                      | necessary) that will |
|                      |                      | represent the ASCII  |
|                      |                      | message data         |
|                      |                      | received and         |
|                      |                      | processed when       |
|                      |                      | pressing \<**F17**\> |
|                      |                      | or \<**F20**\> (if   |
|                      |                      | F20 used after F17   |
|                      |                      | to reprocess an      |
|                      |                      | incoming ASCII       |
|                      |                      | message). This tells |
|                      |                      | the local program    |
|                      |                      | how to handle the    |
|                      |                      | received message     |
|                      |                      | text BEFORE the      |
|                      |                      | program translates   |
|                      |                      | it.                  |
+----------------------+----------------------+----------------------+
| Alt EBCDIC CCSID     | zeros = not used     | Set the translation  |
|                      |                      | type to C=CCSID,     |
|                      |                      | then type a 5-digit  |
|                      |                      | CCSID code (using    |
|                      |                      | leading zeros as     |
|                      |                      | necessary) that will |
|                      |                      | represent the result |
|                      |                      | of a translation.    |
|                      |                      | For incoming         |
|                      |                      | messages received    |
|                      |                      | with the F17         |
|                      |                      | function key, this   |
|                      |                      | CCSID will represent |
|                      |                      | the EBCDIC text that |
|                      |                      | will be displayed as |
|                      |                      | the result of        |
|                      |                      | translation. For     |
|                      |                      | outgoing messages    |
|                      |                      | sent using the F14   |
|                      |                      | function key, this   |
|                      |                      | value tells the      |
|                      |                      | program what EBCDIC  |
|                      |                      | character set to     |
|                      |                      | assume when          |
|                      |                      | translating the      |
|                      |                      | message. A           |
|                      |                      | translated message   |
|                      |                      | sent to the OpCon    |
|                      |                      | SAM Log is sent      |
|                      |                      | transparently, that  |
|                      |                      | is, the LSAM allows  |
|                      |                      | the test translation |
|                      |                      | to pass through to   |
|                      |                      | OpCon SMANetCom      |
|                      |                      | without any changes, |
|                      |                      | so the result can be |
|                      |                      | tested by viewing it |
|                      |                      | with the OpCon SAM   |
|                      |                      | Log viewer.          |
+----------------------+----------------------+----------------------+
| EBCDIC character     | n/a                  | For the              |
| entry/display line   |                      | \<**Enter**\> key    |
|                      |                      | and function key     |
|                      |                      | \<**F14**\> this is  |
|                      |                      | an input field where |
|                      |                      | 5250 workstation     |
|                      |                      | characters may be    |
|                      |                      | typed to create a    |
|                      |                      | test character       |
|                      |                      | string. For function |
|                      |                      | key \<**F17**\> this |
|                      |                      | is used as an output |
|                      |                      | field to show the    |
|                      |                      | EBCDIC character     |
|                      |                      | translation of the   |
|                      |                      | message received     |
|                      |                      | from the special     |
|                      |                      | command TESTLSATBL   |
|                      |                      | used by an OpCon     |
|                      |                      | job.                 |
+----------------------+----------------------+----------------------+
| EBCDIC hex character | X\'00\'              | -   Under the        |
| lines                |                      |     input/output     |
|                      |                      |     character line,  |
|                      |                      |     a string of      |
|                      |                      |     hexadecimal      |
|                      |                      |     character        |
|                      |                      |     equivalents is   |
|                      |                      |     displayed after  |
|                      |                      |     a character      |
|                      |                      |     translation has  |
|                      |                      |     been performed.  |
|                      |                      |     The hexadecimal  |
|                      |                      |     characters are   |
|                      |                      |     displayed in     |
|                      |                      |     over/under       |
|                      |                      |     format, that is, |
|                      |                      |     for each         |
|                      |                      |     character on the |
|                      |                      |     EBCDIC           |
|                      |                      |     entry/display    |
|                      |                      |     line, there are  |
|                      |                      |     two characters   |
|                      |                      |     displayed below  |
|                      |                      |     it that form the |
|                      |                      |     pair of          |
|                      |                      |     hexadecimal      |
|                      |                      |     character        |
|                      |                      |     equivalents for  |
|                      |                      |     the displayed    |
|                      |                      |     character. The   |
|                      |                      |     hexadecimal      |
|                      |                      |     characters range |
|                      |                      |     from 0-9 and     |
|                      |                      |     A-F. Each        |
|                      |                      |     over/under pair  |
|                      |                      |     of characters    |
|                      |                      |     represents one   |
|                      |                      |     8-bit byte of    |
|                      |                      |     digital data.    |
|                      |                      |     These are the    |
|                      |                      |     same pairs of    |
|                      |                      |     hexadecimal      |
|                      |                      |     characters that  |
|                      |                      |     are displayed by |
|                      |                      |     the IBM i WRKTBL |
|                      |                      |     view table       |
|                      |                      |     function, and    |
|                      |                      |     they are the     |
|                      |                      |     same as the data |
|                      |                      |     that is used to  |
|                      |                      |     create a source  |
|                      |                      |     file member from |
|                      |                      |     which a          |
|                      |                      |     translation      |
|                      |                      |     table can be     |
|                      |                      |     created.         |
|                      |                      | -   Use \<**F10**\>  |
|                      |                      |     = Hex to change  |
|                      |                      |     the program to   |
|                      |                      |     accept hex       |
|                      |                      |     characters typed |
|                      |                      |     for EBCDIC       |
|                      |                      |     instead of the   |
|                      |                      |     keyboard         |
|                      |                      |     characters line. |
|                      |                      |     In this mode,    |
|                      |                      |     the keyboard     |
|                      |                      |     characters line  |
|                      |                      |     will show what   |
|                      |                      |     the local        |
|                      |                      |     workstation      |
|                      |                      |     (usually an      |
|                      |                      |     emulator         |
|                      |                      |     program)         |
|                      |                      |     interprets as a  |
|                      |                      |     display          |
|                      |                      |     character for    |
|                      |                      |     each hex value   |
|                      |                      |     that is typed.   |
|                      |                      |     Non-display      |
|                      |                      |     characters are   |
|                      |                      |     prevented from   |
|                      |                      |     reaching the     |
|                      |                      |     display, in      |
|                      |                      |     order to avoid   |
|                      |                      |     causing a        |
|                      |                      |     failure of the   |
|                      |                      |     test command.    |
+----------------------+----------------------+----------------------+
| ASCII hex character  | X\'00\'              | -   Printable or     |
| lines                |                      |                      |
|                      |                      | displayable/keyboard |
|                      |                      |     characters from  |
|                      |                      |     the ASCII        |
|                      |                      |     character set    |
|                      |                      |     cannot be        |
|                      |                      |     displayed, as    |
|                      |                      |     is, on a 5250    |
|                      |                      |     workstation      |
|                      |                      |     screen. Instead, |
|                      |                      |     only the         |
|                      |                      |     hexadecimal      |
|                      |                      |     equivalent of    |
|                      |                      |     the ASCII        |
|                      |                      |     characters is    |
|                      |                      |     displayed.       |
|                      |                      | -   Refer to EBCDIC  |
|                      |                      |     hex character    |
|                      |                      |     lines, above,    |
|                      |                      |     for more         |
|                      |                      |     information      |
|                      |                      |     about the        |
|                      |                      |     hexadecimal      |
|                      |                      |     character        |
|                      |                      |     display.         |
|                      |                      | -   When \<**F11**\> |
|                      |                      |     puts the test    |
|                      |                      |     program into     |
|                      |                      |     ASCII-\>EBCDIC   |
|                      |                      |     local test mode, |
|                      |                      |     these ASCII hex  |
|                      |                      |     lines can be     |
|                      |                      |     used to enter    |
|                      |                      |     the equivalent   |
|                      |                      |     of ASCII         |
|                      |                      |     characters that  |
|                      |                      |     should be        |
|                      |                      |     translated to    |
|                      |                      |     the EBCDIC lines |
|                      |                      |     above when the   |
|                      |                      |     \<**Enter**\>    |
|                      |                      |     key is pressed.  |
+----------------------+----------------------+----------------------+

:  

###### Functions

-   **Enter**: After a value has been typed in the EBCDIC character
    entry field, pressing the \<**Enter**\> key causes the utility
    program to perform a local translation of the data using the
    translation table named in the EBCDIC-to-ASCII fields. In
    ASCII-\>EBCDIC mode, pressing \<**Enter**\> causes the ASCII hex
    values to be translated to the EBCDIC display and hex lines. The
    \<**Enter**\> key does not cause any data to be sent or received
    externally to this program.
-   **F3=Exit**: Not displayed in the function key legend, this key
    quits the list display and returns to the command line where the
    LSATBLTEST command was entered.
-   **F5=Refresh**: Clears the screen and the utility program work
    fields and resets the display to its original status. Note that the
    default values displayed for the translation tables are taken
    directly from the LSAM Parameters control files, if values exist
    there. Otherwise, the default values are the IBM i system table
    values, as shown in the table of fields, above.
-   **F10=Hex**: In EBCDIC-\>ASCII mode, this key toggles the input
    capability between the EBCDIC displayed characters line and the
    hexadecimal characters lines 1 and 2. (In ASCII-\>EBCDIC mode, only
    hex input is supported, so the F10 key is not displayed and does not
    function.)
-   **F11=Mode**: Toggles between using the EBCDIC or ASCII lines for
    typing in test data.
-   **F12=Cancel**: Not displayed in the function key legend, this key
    quits the list display and returns to the command line where the
    LSATBLTEST command was entered.
-   **F14=Send msg**: After a value has been typed in the EBCDIC
    character or hex entry fields, pressing function key \<F14\> causes
    the utility program to create a \$CONSOLE:DISPLAY event and send it
    to the OpCon SAM Log through the active LSAM server communications
    programs. Use the OpCon SAM Log display function to see this
    message. It will not be changed by the interface, but will be
    displayed using the results of the local command EBCDIC to ASCII
    translation.
-   **F17=Receive msg**: This function key is used to check for new
    input into the LSATBLT00 data queue. Data is placed into this data
    queue by the special TESTLSATBL command when it has been run by an
    OpCon job. F17=Receive message allows test messages to be sent and
    analyzed outside of the regular flow of LSAM operations. This
    feature can help determine what characters should be typed into an
    OpCon job master record in order for the EBCDIC result to be
    understood by the LSAM server programs and by IBM i. Used with Use
    option C=CCSID, it demonstrates SMAFT file data translation.
-   **F20=Re-translate**: After any other function has been performed on
    this utility display, function key \<**F20**\> makes it possible to
    type in a new translation table name or a new CCSID code and
    discover a new result using the same data from the most recent
    translation test. The translation table or CCSID codes that will be
    used by the F20=re-translate function depends on the most recent
    operation performed. If the \<**Enter**\> key or function key
    \<**F14**\> was last executed, the EBCDIC-to-ASCII table is used. If
    function key \<**F17**\> was last executed, the ASCII-to-EBCDIC
    table is used. Refer to the Fields table above for an explanation of
    how the CCSID codes may be used when the Use option is C.

#### TESTLSATBL Utility Command

The command TESTLSATBL has been created only for one special purpose.
This command may be used from within an OpCon job master record, in the
Call command line of a Batch job type, to send a message directly from
OpCon/xps to the LSATBLTEST utility display documented above. This
command will not function as expected when used outside of the
OpCon/xps-to-LSAM job scheduler work flow because the LSAM server
programs have been specially coded to respond in a unique way to this
command name. The command by itself merely logs a normal completion
message into the job log of any job where the command runs, and the
OpCon normal completion status does not reflect whether the test message
was actually received by the LSATBLTESTdisplay tool, documented above.

##### Command Syntax

TESTLSATBL TEXT(\'any ASCII text or special character\')

 

The name of the command should be followed by the parameter keyword
value TEXT. Although IBM i command parameter rules would allow just the
parameter value inside of the parentheses without typing the TEXT
keyword, the TEXT keyword is required by the LSAM server jobs in order
to recognize the test character string that will receive special
handling.

 

The TEXT parameter must be enclosed by a pair of parentheses ( ) and
also by a pair of single quote marks \' \' inside of the parentheses.
The LSAM server programs check for the reserved text string of TEXT(\'
to mark the beginning of the test character string, and they test for a
single quote followed by a right parenthesis \') to mark the end of the
test character string. Therefore, it is not allowed to include a single
quote followed immediately by a right parenthesis inside of the test
character string. However, each of these characters may be included
within the test character string as long as they are not immediately
next to each other in this order.

 

Due to the special communications routing path built into the LSAM
server programs, it should be possible to send virtually any ASCII
character value that can be typed on an MS Windows Server workstation.
The purpose of this command is to enable testing of special characters
that may be unique to various international character sets and keyboards
used in different countries.

 

One of the typical problems encountered in OpCon environments is that
there may be language-specific characters allowed as names of programs
or other object types under a version IBM i that has been configured for
national language support. In some cases it is difficult to determine
which characters must be typed in an OpCon job master record in order to
cause them to be correctly translated by the LSAM into the characters
expected by IBM i. In some cases where the default IBM i system
translation table is not working well, it might be necessary to
configure the LSAM to utilize a user-defined alternate translation table
or to identify a pair of CCSID codes that produce the desired result
from translation. In this case, the LSATBLTEST utility should be used to
carefully prove the results of the proposed new configuration.

##### TESTLSATBL Job Results Under IBM i

The special TESTLSATBL command provided with LSAM software is used to
trigger a reserved, direct routing of test data from an OpCon job to the
LSATBLTEST utility data queue, LSATBLT00 in SMADTA (or the equivalent
library). The LSAM sockets communications server program for job
scheduling tests for this command and performs special data routing
functions that preserve test data for handling only by the LSAM
LSATBLTEST command.

 

The TESTLSATBL command is NOT managed by the IBM i LSAM job scheduler
the same as a regular IBM i job command. When the job command is logged
to the LSAM communications debug trace file for the usual translated
EBCDIC image of every transaction, it appears with the ASCII data
removed from the TEXT parameter and only one blank (space) character is
left as the parameter data.

 

The LSAM sockets communications program generates an immediate and
direct normal job completion message that it routes back to OpCon. This
means that the test job in the OpCon schedule should always show a
normal completion, and that normal completion status does not reflect
whether the test message was received and processed by the LSAM\'s local
translation test display tool, documented above.

 

  ------------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White triangle icon on yellow circlular background](../../../Resources/Images/caution-icon(48x48).png "Caution icon")   **CAUTION:** [SMA recommends that a separate, test LSAM environment be utilized for the purpose of fully testing a new translation table or a pair of CCSID codes before that configuration is specified in the live LSAM environment, even if the translation testing tool represents acceptable results.]
  ------------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

#### Strategy for Translation Table Testing

SMA has provided the two LSAM software commands (documented above) that
engage special utilities for the purpose of diagnosing problems with
translation tables and/or pairs of CCSID codes. These tools can also be
used to test a proposed user-defined translation table in a test LSAM
environment before that translation table is used in a live production
environment. This section offers some details about how the LSAM
[translation table]{.ul} testing utilities will behave, specific to the task of developing user-defined translation tables.

##### Creating User-defined Translation Tables

IBM supports the creation of user-defined translation tables under IBM
i. IBM supplies documentation that explains how to perform the following
steps that might be useful in the process of developing new translation
tables that would more aptly serve a unique environment:

-   Work with tables (WRKTBL) to view their contents
-   Retrieve the definition of an existing translation table into a
    source file member (RTVTBLSRC)
-   Create or update a translation table source file member to modify
    how the translation works
-   Create a user-defined translation table in a DB2 UDB (DB2/400)
    library (CRTTBL)

As an example of this process, assume that we wish to translate braces
(curly brackets) typed on a 5250-type workstation (usually emulated by a
PC program) into square brackets before the data is sent to OpCon/xps.
Of course, if we make this choice in the LSAM translation tables, we
will lose the ability to send braces (curly brackets) directly. But for
the purpose of this example, we will assume that this is an acceptable
choice.

 

To create a new table that translates EBCDIC characters into ASCII
characters, we start with the IBM i system-supplied translation table
called QASCII from library QSYS. Using the WRKTBL command to view this
table in a list, option 5=Display may then be entered to view the
contents of the table. The following example shows the view of the
table, paged down to the position where the braces (curly brackets)
character occurs in the EBCDIC character set (X\'D0\').

##### QSYS/QASCII Table View

QSYS/QASCII Display Conversion Table

  ----------------------------------------------------------------------------------------------------------------------------------------------------
                                                                Display Conversion Table
                             Table:   [QASCII]{style="color: #008000;"}         Library:   [QSYS]{style="color: #008000;"}                                             Hex    Hex                 Hex    Hex                 Hex    Hex
                                          Input  Output              Input  Output              Input  Output
                                            B4      DC                 C3      43                 D2      4B
                                            B5      DD                 C4      44                 D3      4C
                                            B6      DE                 C5      45                 D4      4D
                                            B7      DF                 C6      46                 D5      4E
                                            B8      E0                 C7      47                 D6      4F
                                            B9      E1                 C8      48                 D7      50
                                            BA      E2                 C9      49                 D8      51
                                            BB      E3                 CA      E8                 D9      52
                                            BC      E4                 CB      E9                 DA      EE
                                            BD      E5                 CC      EA                 DB      EF
                                            BE      E6                 CD      EB                 DC      F0
                                            BF      E7                 CE      EC                 DD      F1
                                            C0      7B                 CF      ED                 DE      F2
    [C1      41]{style="color: #008000;"}                 [D0      7D]{style="color: #ff0000;"}                 [DF      F3]{style="color: #008000;"}                                             C2      42                 D1      4A                 E0      5C
                                                                                                            More\...
                                           [F3=Exit   F12=Cancel   F17=Position to]{style="color: #0000ff;"}   ----------------------------------------------------------------------------------------------------------------------------------------------------

Notice that the X\'D0\' translation has been highlighted in red, near
the bottom of the middle column. The original IBM-supplied translation
table (according to US CCSID 37 standards) translates to ASCII X\'7D\'.
For our example, we wish to have X\'D0\' translate into ASCII X\'5D\'.

 

We use the IBM i command RTVTBLSRC (retrieve table to source file
member) to extract the data from the existing IBM QASCII table. In the
following example, we have instructed the command to put the source
member into a library we created called SMAUTILITY, and we had also
created in advance a source file called QTBLSRC (duplicated from the
model IBM provides in the QGPL library). Notice where the target
translation character of X\'7D\' occurs, highlighted in red at display
columns 33-34 in source member line 0000.07.

QSYS/QASCII Table Source Member

  -----------------------------------------------------------------------------------------------------------------------------------------------------------
   Columns . . . :    1  71           Browse                    [SMAUTILITY/QTBLSRC]{style="color: #008000;"}    SEU==\>                                                                  [QASCII]{style="color: #008000;"}
   FMT \*\*  \...+\... 1 \...+\... 2 \...+\... 3 \...+\... 4 \...+\... 5 \...+\... 6 \...+\... 7
          \*\*\*\*\*\*\*\*\*\*\*\*\*\*\* Beginning of data \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*
  0000.01 000102039C09867F978D8E0B0C0D0E0F101112139D8508871819928F1C1D1E1F
  0000.02 80818283840A171B88898A8B8C050607909116939495960498999A9B14159E1A
  0000.03 20A0A1A2A3A4A5A6A7A85B2E3C282B2126A9AAABACADAEAFB0B15D242A293B5E
  0000.04 2D2FB2B3B4B5B6B7B8B97C2C255F3E3FBABBBCBDBEBFC0C1C2603A2340273D22
  0000.05 C3616263646566676869C4C5C6C7C8C9CA6A6B6C6D6E6F707172CBCCCDCECFD0
  0000.06 D17E737475767778797AD2D3D4D5D6D7D8D9DADBDCDDDEDFE0E1E2E3E4E5E6E7
  [0000.07 7B414243444546474849E8E9EAEBECED]{style="color: #008000;"}[7D]{style="color: #ff0000;"}[4A4B4C4D4E4F505152EEEFF0F1F2F3]{style="color: #008000;"}   0000.08 5C9F535455565758595AF4F5F6F7F8F930313233343536373839FAFBFCFDFEFF
          \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\* End of data \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*
  -----------------------------------------------------------------------------------------------------------------------------------------------------------

Before we modify this source member, we copy it to a new source member
name, TSTASCII. The new source member TSTASCII is then modified at
columns 33-34 of line 7. The following example shows that the prior
value of \'7D\' has been replaced by the new value \'5D\'.

Modified TSTASCII Table Source Member

  -----------------------------------------------------------------------------------------------------------------------------------------------------------
   Columns . . . :    1  71           Browse                   [SMAUTILITY/QTBLSRC]{style="color: #008000;"}    SEU==\>                                                                [TSTASCII]{style="color: #008000;"}
   FMT \*\*  \...+\... 1 \...+\... 2 \...+\... 3 \...+\... 4 \...+\... 5 \...+\... 6 \...+\... 7
          \*\*\*\*\*\*\*\*\*\*\*\*\*\*\* Beginning of data \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*
  0001.00 000102039C09867F978D8E0B0C0D0E0F101112139D8508871819928F1C1D1E1F
  0002.00 80818283840A171B88898A8B8C050607909116939495960498999A9B14159E1A
  0003.00 20A0A1A2A3A4A5A6A7A85B2E3C282B2126A9AAABACADAEAFB0B15D242A293B5E
  0004.00 2D2FB2B3B4B5B6B7B8B97C2C255F3E3FBABBBCBDBEBFC0C1C2603A2340273D22
  0005.00 C3616263646566676869C4C5C6C7C8C9CA6A6B6C6D6E6F707172CBCCCDCECFD0
  0006.00 D17E737475767778797AD2D3D4D5D6D5D8D9DADBDCDDDEDFE0E1E2E3E4E5E6E7
  [0007.00 7B414243444546474849E8E9EAEBECED]{style="color: #008000;"}[5D]{style="color: #ff0000;"}[4A4B4C4D4E4F505152EEEFF0F1F2F3]{style="color: #008000;"}   0008.00 5C9F535455565758595AF4F5F6F7F8F930313233343536373839FAFBFCFDFEFF
          \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\* End of data \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*
  -----------------------------------------------------------------------------------------------------------------------------------------------------------

Finally, this modified source member is used in the IBM i command CRTTBL
to produce a new translation table object. The following example shows
that the table TSTASCII was created in a test version of the SMADTA
library, where it can be tested outside of the live production version
of the LSAM.

 

The new table is viewed by using the IBM i command WRKTBL and entering
option 5=Display next to the table name. The following example shows
that the PageDown key has been pressed to reveal the portion of the
table where we made a change. Now the table shows that an EBCDIC X\'D0\'
will be translated into an ASCII X\'5D\'.

 

We will use this example of a translation table modification in the
following illustration of how the IBM i LSAM translation table testing
utilities can be used to prove translation results both before and after
the table modification was implemented.

TSTSMADATA/TSTASCII Translation Table View

  ----------------------------------------------------------------------------------------------------------------------------------------------------
                                                                Display Conversion Table
                           Table:   [TSTASCII]{style="color: #008000;"}       Library:   [TSTSMADTA]{style="color: #008000;"}                                                                             
                                            Hex    Hex                 Hex    Hex                 Hex    Hex
                                          Input  Output              Input  Output              Input  Output
                                            B4      DC                 C3      43                 D2      4B
                                            B5      DD                 C4      44                 D3      4C
                                            B6      DE                 C5      45                 D4      4D
                                            B7      DF                 C6      46                 D5      4E
                                            B8      E0                 C7      47                 D6      4F
                                            B9      E1                 C8      48                 D7      50
                                            BA      E2                 C9      49                 D8      51
                                            BB      E3                 CA      E8                 D9      52
                                            BC      E4                 CB      E9                 DA      EE
                                            BD      E5                 CC      EA                 DB      EF
                                            BE      E6                 CD      EB                 DC      F0
                                            BF      E7                 CE      EC                 DD      F1
                                            C0      7B                 CF      ED                 DE      F2
    [C1      41]{style="color: #008000;"}                 [D0      5D]{style="color: #ff0000;"}                 [DF      F3]{style="color: #008000;"}                                             C2      42                 D1      4A                 E0      5C
                                                                                                            More\...
                                                         F3=Exit   F12=Cancel   F17=Position to
  ----------------------------------------------------------------------------------------------------------------------------------------------------

##### Proving Translation Table Modifications with LSATBLTEST

Continuing with the example of a translation table explained above, we
start by testing the existing configuration of the IBM i LSAM. As the
LSATBLTEST example below shows, the default translation table
QSYS/QASCII has translated EBCDIC right braces (curly brackets) from
X\'D0\' into ASCII X\'7D\'. (The red highlights of the hexadecimal
characters in the following example do not appear on the real display,
they are for this document only.)

LSATBLTEST Displays Default Translation Results

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  [LSATBLR1]{style="color: #008000;"}                 Test LSAM Translation Tables                 [00/00/00]{style="color: #008000;"}   [USERNAME              Translation Mode:]{style="color: #008000;"} [EBCDIC -\> ASCII]{style="color: #ff00ff;"}               [00:00:00]{style="color: #008000;"}
   
  Type any options and EBCDIC text, press Enter for local or F14=Send to OpCon.
  To test ASCII with OpCon job, run command TESTLSATBL and up to 70 characters
   [of TEXT, then press F17. CMD:]{style="color: #0000ff;"}  [TESTLSATBL TEXT(\'any ASCII character\')]{style="color: #008000;"}   Use F20 to retranslate same data with new options. F2=clear data only.
           NOTE: Send uses these translation options, not LSAM routines.
  [Use Table or CCSID . :]{style="color: #008000;"} [T]{style="color: #ffcc00;text-decoration: underline;"}  [T=table, C=CCSID]{style="color: #0000ff;"}       [SMAFT ASCII CCSID :]{style="color: #008000;"} [00819]{style="color: #00ffff;text-decoration: underline;"}   [EBCDIC-to-ASCII table:]{style="color: #008000;"} [QASCII    ]{style="color: #ffcc00;text-decoration: underline;"}                [SMAFT EBCDIC CCSID:]{style="color: #008000;"} [00037]{style="color: #00ffff;text-decoration: underline;"}
    [Library  . . . . . :]{style="color: #008000;"}   [QSYS      ]{style="color: #ffcc00;text-decoration: underline;"}              [Job default CCSID\*:]{style="color: #008000;"} [00037]{style="color: #00ffff;text-decoration: underline;"}   [ASCII-to-EBCDIC table:]{style="color: #008000;"} [QEBCDIC   ]{style="color: #ffcc00;text-decoration: underline;"}                [Alt ASCII CCSID . :]{style="color: #008000;"} [00000]{style="color: #ffcc00;text-decoration: underline;"}
    [Library  . . . . . :]{style="color: #008000;"}   [QSYS      ]{style="color: #ffcc00;text-decoration: underline;"}              [Alt EBCDIC CCSID  :]{style="color: #008000;"} [00000]{style="color: #ffcc00;text-decoration: underline;"}     \* NOTE: Job default CCSID used for EBCDIC char. Use F10=Hex for other CCSID.
  [F2=CLR  ]{style="color: #0000ff;"}1\...5\...10\....5\...20\....5\...30\....5\...40\....5\...50\....5\...60\....5\...70   [EBCDIC:]{style="color: #008000;"} [Sending a message at date: {{\$DATE}}]{style="color: #ffcc00;text-decoration: underline;"}
  [        E89889848498AA88848A488A874CC5CCEC]{style="color: #008000;"}[DD]{style="color: #ff0000;"}   [        2554957010452217501304135A000B4135]{style="color: #008000;"}[00]{style="color: #ff0000;"}
   
  [ASCII:  5666666262667766626726676327724454]{style="color: #008000;"}[77]{style="color: #ff0000;"}   [        35E49E7010D53317501404145A0BB44145]{style="color: #008000;"}[DD]{style="color: #ff0000;"}
   
  F5=Refresh  F10=Hex  F11=Mode  F14=Send msg  F17=Receive msg  F20=Retranslate
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

This display has been obtained by typing in the EBCDIC test message
shown, and then pressing F14=Send msg. The same result would appear on
this display if the \<**Enter**\> key had been pressed. However, using
F14=Send msg allows us to go to the OpCon log displays to verify how
this data was received.

Default Translation Table Test Message Arrives at OpCon

![Default Translation Table Test Message Arrives at OpCon](../../../Resources/Images/IBM-i/Default-Translation-Table-Test-Message-Arrives-at-OpCon.png "Default Translation Table Test Message Arrives at OpCon")

In the example above, the test message appears in the SMANetCom Trace
Log display in its raw form. The message was translated to ASCII by the
LSAM test message generator program (LSATBLTEST), but the \$DATE token
has not yet been analyzed and replaced. We can see from this example
that the braces (curly brackets) have been carried in tact, as would be
expected. Next, consider the following SAM Log results:

Default Translation Table Test Message Token Translation by OpCon

![Default Translation Table Test Message Token Translation by OpCon](../../../Resources/Images/IBM-i/Default-Translation-Table-Test-Message-Token-Translation-by-OpCon.png "Default Translation Table Test Message Token Translation by OpCon")

Before we experiment with changes to the translation table, take note of
a special behavior that has been programmed into OpCon handling of Token
field replacement. Due to translation table problems between MS Windows
Server environments and environments like IBM\'s i OS and IBM\'s
mainframes, SMA has allowed that braces (curly brackets) {{ }} can be
used to designated Token fields in the same way as the OpCon standard
square brackets \[\[ \]\] are used. As expected, the {{\$DATE}} token in the example above was translated into the current MS Windows Server
system date just as \[\[\$DATE\]\] would be. 
 

To prove the results of the modified TSTASCII translation table, we can
go back to the LSATBLTEST utility program display and type in some new
values, then press \<**Enter**\> to test the translation table
completely within the utility itself. We start with the default
QSYS/QASCII translation table and test how a simple OpCon Token string
is translated.

LSAM Translation Table Test of Default QASCII Table

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  [LSATBLR1]{style="color: #008000;"}                 Test LSAM Translation Tables                 [00/00/00]{style="color: #008000;"}   [USERNAME              Translation Mode:]{style="color: #008000;"} [EBCDIC -\> ASCII]{style="color: #ff00ff;"}               [00:00:00]{style="color: #008000;"}
   
  Type any options and EBCDIC text, press Enter for local or F14=Send to OpCon.
  To test ASCII with OpCon job, run command TESTLSATBL and up to 70 characters
   [of TEXT, then press F17. CMD:]{style="color: #0000ff;"}  [TESTLSATBL TEXT(\'any ASCII character\')]{style="color: #008000;"}   Use F20 to retranslate same data with new options. F2=clear data only.
           NOTE: Send uses these translation options, not LSAM routines.
  [Use Table or CCSID . :]{style="color: #008000;"} [T]{style="color: #ffcc00;text-decoration: underline;"}  [T=table, C=CCSID]{style="color: #0000ff;"}       [SMAFT ASCII CCSID :]{style="color: #008000;"} [00819]{style="color: #00ffff;text-decoration: underline;"}   [EBCDIC-to-ASCII table:]{style="color: #008000;"} [QASCII    ]{style="color: #ffcc00;text-decoration: underline;"}                [SMAFT EBCDIC CCSID:]{style="color: #008000;"} [00037]{style="color: #00ffff;text-decoration: underline;"}
    [Library  . . . . . :]{style="color: #008000;"}   [QSYS      ]{style="color: #ffcc00;text-decoration: underline;"}              [Job default CCSID\*:]{style="color: #008000;"} [00037]{style="color: #00ffff;text-decoration: underline;"}   [ASCII-to-EBCDIC table:]{style="color: #008000;"} [QEBCDIC   ]{style="color: #ffcc00;text-decoration: underline;"}                [Alt ASCII CCSID . :]{style="color: #008000;"} [00000]{style="color: #ffcc00;text-decoration: underline;"}
    [Library  . . . . . :]{style="color: #008000;"}   [QSYS      ]{style="color: #ffcc00;text-decoration: underline;"}              [Alt EBCDIC CCSID  :]{style="color: #008000;"} [00000]{style="color: #ffcc00;text-decoration: underline;"}     \* NOTE: Job default CCSID used for EBCDIC char. Use F10=Hex for other CCSID.
  [F2=CLR  ]{style="color: #0000ff;"}1\...5\...10\....5\...20\....5\...30\....5\...40\....5\...50\....5\...60\....5\...70   [EBCDIC:]{style="color: #008000;"} [{{\$DATE}}]{style="color: #ffcc00;text-decoration: underline;"}
  [        CC5CCEC]{style="color: #008000;"}[DD]{style="color: #ff0000;"}   [        00B4135]{style="color: #008000;"}[00]{style="color: #ff0000;"}
   
  [ASCII:  7724454]{style="color: #008000;"}[77]{style="color: #ff0000;"}   [        BB44145]{style="color: #008000;"}[DD]{style="color: #ff0000;"}
   
  F5=Refresh  F10=Hex  F11=Mode  F14=Send msg  F17=Receive msg  F20=Retranslate
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Notice in the example above that the hexadecimal equivalents of the
right braces (curly brackets) }} have been highlighted in red. The red
does not appear normally on the utility display. It has been included in
this document to help identify the characters that are the subject of
this discussion.

 

To continue the test, we change the name of the EBCDIC-to-ASCII
translation table and the library where our test table is located. Then
we can press the \<**F20**\> function key to retest translation of the
same test character string without having to type the data a second
time. As the results show in the illustration below, the braces (curly
brackets) have now been translated into ASCII X\'5D\'.

LSAM Translation Table Test of Modified TSTQASCII Table

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  [LSATBLR1]{style="color: #008000;"}                 Test LSAM Translation Tables                 [00/00/00]{style="color: #008000;"}   [USERNAME              Translation Mode:]{style="color: #008000;"} [EBCDIC -\> ASCII]{style="color: #ff00ff;"}               [00:00:00]{style="color: #008000;"}
   
  Type any options and EBCDIC text, press Enter for local or F14=Send to OpCon.
  To test ASCII with OpCon job, run command TESTLSATBL and up to 70 characters
   [of TEXT, then press F17. CMD:]{style="color: #0000ff;"}  [TESTLSATBL TEXT(\'any ASCII character\')]{style="color: #008000;"}   Use F20 to retranslate same data with new options. F2=clear data only.
           NOTE: Send uses these translation options, not LSAM routines.
  [Use Table or CCSID . :]{style="color: #008000;"} [T]{style="color: #ffcc00;text-decoration: underline;"}  [T=table, C=CCSID]{style="color: #0000ff;"}       [SMAFT ASCII CCSID :]{style="color: #008000;"} [00819]{style="color: #00ffff;text-decoration: underline;"}   [EBCDIC-to-ASCII table:]{style="color: #008000;"} [TSTQASCII ]{style="color: #ffcc00;text-decoration: underline;"}                [SMAFT EBCDIC CCSID:]{style="color: #008000;"} [00037]{style="color: #00ffff;text-decoration: underline;"}
    [Library  . . . . . :]{style="color: #008000;"}   [TSTSMADTA ]{style="color: #ffcc00;text-decoration: underline;"}              [Job default CCSID\*:]{style="color: #008000;"} [00037]{style="color: #00ffff;text-decoration: underline;"}   [ASCII-to-EBCDIC table:]{style="color: #008000;"} [QEBCDIC   ]{style="color: #ffcc00;text-decoration: underline;"}                [Alt ASCII CCSID . :]{style="color: #008000;"} [00000]{style="color: #ffcc00;text-decoration: underline;"}
    [Library  . . . . . :]{style="color: #008000;"}   [QSYS      ]{style="color: #ffcc00;text-decoration: underline;"}              [Alt EBCDIC CCSID  :]{style="color: #008000;"} [00000]{style="color: #ffcc00;text-decoration: underline;"}     \* NOTE: Job default CCSID used for EBCDIC char. Use F10=Hex for other CCSID.
  [F2=CLR  ]{style="color: #0000ff;"}1\...5\...10\....5\...20\....5\...30\....5\...40\....5\...50\....5\...60\....5\...70   [EBCDIC:]{style="color: #008000;"} [{{\$DATE}}]{style="color: #ffcc00;text-decoration: underline;"}
  [        CC5CCEC]{style="color: #008000;"}[DD]{style="color: #ff0000;"}   [        00B4135]{style="color: #008000;"}[00]{style="color: #ff0000;"}
   
  [ASCII:  7724454]{style="color: #008000;"}[55]{style="color: #ff0000;"}   [        BB44145]{style="color: #008000;"}[DD]{style="color: #ff0000;"}
   
  F5=Refresh  F10=Hex  F11=Mode  F14=Send msg  F17=Receive msg  F20=Retranslate
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

For the purpose of this illustration, we have changed only the
translation of the right brace (curly bracket) character. We might
expect that we would also want to modify the translation of the left
brace (curly bracket) character as well, in order to produce a resulting
Token field string that would be valid for OpCon to interpret. In many
environments, as explained above, it may not be necessary to change the
translation of braces (curly brackets) to square brackets. However, when
national language support has been configured under IBM i, and depending
on the type of keyboard used with a 5250 workstation emulation program,
it might be necessary to develop some similar modification to a
translation table in order to make it simple for system users to
configure OpCon Event commands from inside the LSAM configuration
screens, such as when maintaining LSAM Message Management Parameters.

##### Proving Translation Table Modifications with TESTLSATBL

It is equally important to prove that translation table changes work
when data is sent from OpCon to the IBM i LSAM servers.

###### Local Testing of ASCII-\>EBCDIC

For a quick test that does not require configuring an OpCon job, use the
\<**F11**\> function key to put the LSATBLTEST program into
ASCII-\>EBCDIC mode. Then type hex characters that represent the ASCII
source data for translation and press \<**Enter**\> to test different
tables and CCSID code sets.

###### Utilizing OpCon for Testing of ASCII-\>EBCDIC

The special LSAM command TESTLSATBL used in an OpCon batch job for IBM i
is a good way to test ASCII characters that are typed within the
Microsoft Windows environment of the SMA Enterprise Manager.

LSAM Command TESTLSATBL Used in OpCon Job Master

![LSAM Command TESTLSATBL Used in OpCon Job Master](../../../Resources/Images/IBM-i/LSAM-Command-TESTLSATBL-Used-in-OpCon-Job-Master.png "LSAM Command TESTLSATBL Used in OpCon Job Master"){.flat}

 

Although a different translation table is used for translations from
ASCII to EBCDIC, national language support under IBM i, for example, may
introduce difficulties in typing character strings for OpCon job master
records that will be correctly interpreted by IBM i. The special IBM i
LSAM command TESTLSATBL can be used with an OpCon job to set up a test
of any characters so that they will show up on the LSATBLTEST utility
display. The TESTLSATBL command syntax is explained above. The previous
example shows how this command might be set up in an OpCon job called
TstLsaTbl1. In this example it appears that the tester wants to make
sure that both the at-sign @ and the braces (curly brackets) { } are
being received as expected once the data has been transmitted to the IBM
i LSAM.

 

An important step in evaluating character translation is to verify that
keyboard characters typed at a workstation keyboard and shown on the
workstation display are actually the characters that have been
transmitted by OpCon. This can be confirmed by examining the OpCon
SMANetCom Trace log just after the test job has been executed.

OpCon Sends IBM i Job Command in Field Code 05022

![OpCon Sends IBM i Job Command in Field Code 05022](../../../Resources/Images/IBM-i/13_3.png "OpCon Sends IBM i Job Command in Field Code 05022"){.flat}

 

A careful examination of the SMANetCom Trace Log requires that the log
viewer window be positioned far to the right. The line where a TX1
request job transaction appears will contain a long string of data. For
this test, we wish to confirm that the string typed into the job Call
command line has been transmitted to the IBM i LSAM in the same form as
it was typed. This can be confirmed by looking for field code 05022.
Notice in the example above that a field code is contained within the
XML tag characters \< and \>. In this case, the field code itself is
displayed in the value I=\"05022\". The data that follows the greater
than sign \> is the actual Call command string. The end of this string
is marked by the XML end field tag \</F\>. We see in the example above
that OpCon has transmitted exactly what was typed in the job master
record.

 

As explained previously, the LSAM job scheduling communications server
program recognizes the special command TESTLSATBL, and it responds to
that command by routing the enclosed TEXT string directly to a special
LSAM data queue used only by the LSAM utility command LSATBLTEST. As
soon as we have confirmed that the job request data has been sent by
OpCon, we can immediately begin using the LSATBLTEST command from with
the target LSAM environment in order to retrieve and examine the test
character string.

 

It is important to remember that the LSAM communications server has sent
exactly the ASCII character string that was received from OpCon/xps. The
special translation table testing protocol implemented by the LSAM
prevents the LSAM server programs from touching the test character
string. It is sent in tact so that we can experiment with different
translation tables while using the LSAM\'s LSATBLTEST utility display.

IBM i LSAM LSATBLTEST Command Shows Results from TESTLSATBL Job

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  [LSATBLR1]{style="color: #008000;"}                 Test LSAM Translation Tables                 [00/00/00]{style="color: #008000;"}   [USERNAME              Translation Mode:]{style="color: #008000;"} [EBCDIC -\> ASCII]{style="color: #ff00ff;"}               [00:00:00]{style="color: #008000;"}
   
  Type any options and EBCDIC text, press Enter for local or F14=Send to OpCon.
  To test ASCII with OpCon job, run command TESTLSATBL and up to 70 characters
   [of TEXT, then press F17. CMD:]{style="color: #0000ff;"}  [TESTLSATBL TEXT(\'any ASCII character\')]{style="color: #008000;"}   Use F20 to retranslate same data with new options. F2=clear data only.
           NOTE: Send uses these translation options, not LSAM routines.
  [Use Table or CCSID . :]{style="color: #008000;"} [T]{style="color: #ffcc00;text-decoration: underline;"}  [T=table, C=CCSID]{style="color: #0000ff;"}       [SMAFT ASCII CCSID :]{style="color: #008000;"} [00819]{style="color: #00ffff;text-decoration: underline;"}   [EBCDIC-to-ASCII table:]{style="color: #008000;"} [QASCII    ]{style="color: #ffcc00;text-decoration: underline;"}                [SMAFT EBCDIC CCSID:]{style="color: #008000;"} [00037]{style="color: #00ffff;text-decoration: underline;"}
    [Library  . . . . . :]{style="color: #008000;"}   [QSYS      ]{style="color: #ffcc00;text-decoration: underline;"}              [Job default CCSID\*:]{style="color: #008000;"} [00037]{style="color: #00ffff;text-decoration: underline;"}   [ASCII-to-EBCDIC table:]{style="color: #008000;"} [QEBCDIC   ]{style="color: #ffcc00;text-decoration: underline;"}                [Alt ASCII CCSID . :]{style="color: #008000;"} [00000]{style="color: #ffcc00;text-decoration: underline;"}
    [Library  . . . . . :]{style="color: #008000;"}   [QSYS      ]{style="color: #ffcc00;text-decoration: underline;"}              [Alt EBCDIC CCSID  :]{style="color: #008000;"} [00000]{style="color: #ffcc00;text-decoration: underline;"}     \* NOTE: Job default CCSID used for EBCDIC char. Use F10=Hex for other CCSID.
  [F2=CLR  ]{style="color: #0000ff;"}1\...5\...10\....5\...20\....5\...30\....5\...40\....5\...50\....5\...60\....5\...70   [EBCDIC:]{style="color: #008000;"} [ASCII text with at-sign @ and curly brackets {}]{style="color: #ffcc00;text-decoration: underline;"}
  [        CECCC4A8AA4A8A848A6A88947489848A99A4898898AA4CD]{style="color: #008000;"}   [        123990357306938013029750C0154034938029132532000]{style="color: #008000;"}
   
  [ASCII:  45444276772767626727666242666267767267666677277]{style="color: #008000;"}   [        133990458407948014D397E0001E40352C902213B5430BD]{style="color: #008000;"}
   
  F5=Refresh  F10=Hex  F11=Mode  F14=Send msg  F17=Receive msg  F20=Retranslate
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

The example above shows how the LSATBLTEST utility display will appear
after pressing F17=Receive message to retrieve the test characters sent
by the OpCon job running the TESTLSATBL command. This illustration shows
the source ASCII hexadecimal characters near the bottom of the display.
It is important to remember that these are the original ASCII characters
received by the LSAM directly from OpCon, untouched by the LSAM. The IBM
i 5250 workstation emulation program cannot conveniently show the
printable (displayable) ASCII characters themselves, so the hexadecimal
equivalent is shown on this display. The original ASCII characters that
are represented here can be viewed in either of the two OpCon locations
identified above.

 

Once the IBM i LSAM utility program LSATBLTEST has retrieved a test
message sent by OpCon, that message is removed by the utility from its
dedicated data queue, LSATBLT00 in SMADTA. This test data will remain in
the LSATBLTEST program so that we can experiment with it until it is
flushed by pressing F5=Refresh, or until another function key or the
\<**Enter**\> key is pressed.

 

The example above shows how the default translation tables used by the
IBM i LSAM interpreted the incoming message. To experiment with another
ASCII-to-EBCDIC translation table, be sure the Use code is set to T,
then just type in a different table name and library name, as necessary,
and press F20=Re-translate. The utility program will continue to show
the source ASCII hexadecimal characters at the bottom, but the new
EBCDIC translation will be updated according to the translation table
specified.

##### Translation Table Technical Considerations

The IBM i LSAM translation tables are not the only source of data
translation in the testing processes that have been explained in this
document. There are at least two other locations in the flow of the data
that must be considered before making final decisions about translation
tables.

 

When EBCDIC data is typed into the LSATBLTEST data input field, the
values that are displayed on the workstation screen depend on the type
of keyboard being used. They also depend on the code page being used by
the 5250 workstation emulator program when a personal computer is being
used to emulate the workstation function, as is usually the case. The
emulator program translates the keyboard scan codes into a set of EBCDIC
characters that it sends to the IBM i workstation controller function.
It is possible to configure 5250 workstation emulation programs to
perform this translation differently.

 

Whenever LSAM communications are being diagnosed, it is very important
to consider the source of the EBCDIC data. When LSAM server programs or
even other software running under IBM i have generated data that must be
sent to OpCon, the actual hexadecimal characters used by those programs
may differ from characters that are produced by a 5250 workstation
emulation program. To confirm whether there are any such differences, a
technical analyst must use the IBM i LSAM debugging tools. The debugging
log file feature must be turned on before test data is processed by the
LSAM server programs. Then the LSAM log file viewers may be used to
examine both the character data and its hexadecimal equivalent that has
been trapped in the LSAM log files. Instructions for using the LSAM
debugging tools are offered in another section of the **IBM i LSAM**
online help.

 

A similar consideration may apply when it comes to viewing data on the
OpCon configuration workstation where the OpCon job has been defined. It
is not usually likely, but it is possible that the data appearing on a
workstation display could vary from information actually processed by
OpCon. One means of ruling out this variation is explained above in the
illustration of the SMANetCom Trace Log display of the OpCon job Call
command field code 05022.

### SMARGZ: Manage the LSAM Database

The strategy for using the SMARGZ command to backup and maintain the
LSAM database library SMADTA is now discussed in full under LSAM Logs
and Database Management.

### CMDEXE, CMDEXE2: IBM i Native Command Wrapper

These commands are used to execute IBM i native commands inside a
\"wrapper\" CL program that intercepts any command failure message and
makes it possible for the Agent and/or OpCon to control the OpCon job
status and to respond appropriately to different error messages.

 

These utility commands are especially helpful for some IBM i commands,
such as CPYF or RSTOBJ and RSTLIB, that can issue failure messages when
the command did not actually fail, but IBM felt they should notify the
user of some important irregularity. Using one of the Agent\'s wrapper
commands can prevent an unnecessary failure of an OpCon job while still
making it possible to generate an OpCon Event command that might notify
an operator of the irregularity.

#### Set the Command and Program Object Authority!

Both the CMDEXE command and its program CMDEXEC, and the CMDEXE2 command
with its program CMDEXE2C, are distributed with \*PUBLIC authority
revoked. The objects are owned by user SMANET, as usual for LSAM
software. This object authority profile is designed to help prevent
abuse or hacks into the system. If either of these commands will be
executed by a user profile that does not have authority to use objects
owned by the SMANET user profile, then it will be necessary to grant
authority to that user profile for the command and its command execution
program.

 

Be sure that the batch user in the OpCon job has authority to \*USE both
the command and the program. For all LSAM objects, use the LSAM object
authority management function, found in LSAM sub-menu 9, option 8. Add
authority records for both objects (a \*CMD and a \*PGM), and be sure to
use option 1 to apply the new authorities after they are registered.

 

Another strategy to consider when modifying the program authority is to
use adopted authority so that the job user can perform functions without
having to be directly authorized to those functions. The Agent\'s object
authority management function can also be used to define and apply
adopted authority.

#### Using CMDEXE

The CMDEXE command is a very simple wrapper that depends on the Agent\'s
Message Management facility to intercept job failure messages while they
are still pending, and then decide to either ignore the message (so that
the job ends normally) or to reply with \'C\' or \'D\' to the error
message (so that the job fails).

 

The Agent\'s Message Management Parameters can be linked to Message Data
Capture Rules, and by that means, to Response Rules, where detailed
decisions can be made about each job and appropriate Events generated in
response to those conditions.

 

Here is the command syntax:

CMDEXE CMD(\'IBMCMD KEWORD1(\'\'value 1\'\') KEYWORD2(1234)\')

##### Command Parameters: There is Only the One \"CMD\" Parameter

Notice that the CMD() keyword of the CMDEXE command must enclose the
native IBM i command inside a pair of single quotes. This means that any
of the native command parameters requiring single quotes must double the
single quotes, as shown above for the KEYWORD1() command parameter. By
comparison, the KEYWORD2() command parameter is apparently a numeric
value that does not require any single quotes.

##### Command Usage Notes

The typical use for this command is when an OpCon job for IBM i batch
execution is executing just one simple IBM i command. If the command
reports an error, it causes the job submitted by the LSAM to fail, and
there is no means by which OpCon or the LSAM can intervene to evaluate
the error and then ignore it (allowing the job to complete normally), or
respond by telling the job to fail.

 

Whenever there is a command error, it is always reported in QSYSOPR
using message ID CPA0702. This message ID was designed by IBM to report
the actual exception message ID that was sent by the command to the
error management boundary of the job. This means that the primary text
of the CPA0702 will contain the real message ID that represents the
error that has occurred.

 

This makes it possible for the IBM i batch job in OpCon to define
job-level message management rules, or the LSAM\'s more powerful global
Message Management Parameters can be defined to respond to various error
conditions for specific job + user names. The message management rule
should filter message ID CPA0702 and then also test the primary message
text for whatever error code is expected in case of anticipated
failures.

#### Using CMDEXE2

The CMDEXE2 command works differently from the CMDEXE command, because
it does not allow messages to be sent to an external message queue while
the command waits for a response. Instead, it uses its own parameter
options to decide how to respond to any expected native command error,
without depending on the Agent\'s Message Management service.

 

When the command is executed in a job started by OpCon, it will return
LSAM Feedback to report any error message issued by the native IBM i
command. This makes it possible to configure a response to the error
message ID using the OpCon job\'s Events tab, even if the command was
configured to force the job to end normally. When configuring Events for
LSAM Feedback, choose the user-defined LSAM Feedback type and in the
comparison text type %CPF1234% (where \'CPF1234\' represents the actual
error code that is issued by the native command and sent as the
feedback).

 

Used in local mode, such as from a step of a Multi-Step Job Script, this
command can implement a more elaborate response to potential error
messages without requiring a complex set of additional steps within the
Script. And yet, the Script can rely on the FAILCODEDV parameter to
force any error message ID into a Dynamic Variable that ON_ERROR Script
steps can test, in order to develop varying error management strategies.

 

Here is the command syntax:

CMDEXE2 CMD(\'IBMCMD KEWORD1(\'\'value 1\'\') KEYWORD2(1234)\')
FAILCODEDV(FAILDYNVAR) FAILONERR(Y) IGNOREMSG(CPF1234) OPCONJOB(Y)

##### Command Parameters

-   **CMD** = Type or paste the entire native IBM i command inside a
    pair of single quotes.
-   **FAILCODEDV** = Optionally, specify the name of an Agent Dynamic
    Variable that will receive the 7-character IBM i message ID in case
    there is any failure of the native command. The {TOKEN} for this
    Dynamic Variable can be used in Multi-Step Job Scripts or Response
    Rules to test for various error message ID values and then generate
    an appropriate response.
-   **FAILONERR** = Control the success or failure of the CMDEXE2
    command. Values:
    -   **\'Y\' or \'1\'** = Yes, allow the CMDEXE2 command to fail if
        the native command fails.
    -   **\'N\' or \'0\'** = No, force the CMDEXE2 command to end
        normally, despite any failure of the native command.
-   **IGNOREMSG** = Enter the message ID of a possible error message
    that should be ignored. This parameter can be used with the
    FAILONERR(Y) option, so that the CMDEXE2 command will fail if there
    is any other error except for the message ID specified in this
    parameter.
-   **OPCONJOB** = Control the attempt to communicate command results to
    OpCon. Prevent attempts to communicate with OpCon when the CMDEXE2
    command is being used in a local mode, such as within a Multi-Step
    Job Script.

### LSAMCMD: Execute LSAM Commands From Outside

This command is used to execute other LSAM utility commands or to call
LSAM programs when it is desired to execute LSAM commands from
third-party software applications or from remote command entry sources.

 

This command supplies the special routines that first add the LSAM
environment library list to the job. For most LSAM utility commands it
is necessary that the command have access to the LSAM libraries in order
to find sub-programs and files that are required by the command.

 

Most commonly used LSAM control commands in the SMAGPL library already
manage the LSAM library list, based on the Product Library assigned to
each of those commands. This new command is useful for other LSAM
commands typically found in the SMAPGM library, such as SETDYNVAR
(set/add LSAM Dynamic Variable, explained above).

 

Here is an example of the syntax required to use this command:

 

  --------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------
  ![White pencil icon on green circular background](../../../Resources/Images/example-icon(48x48).png "Example icon")   **EXAMPLE:** SMAGPL/LSAMCMD ENV(SMADEFAULT) CMD(\'command syntax\')
  --------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------

 

+----------------------------------+----------------------------------+
| ![White pencil/paper icon on     | **NOTE:** [This command leaves   | | gray circular                    | the LSAM libraries added to the  |
| background](../../.              | job, unlike the LSAM management  |
| ./Resources/Images/note-icon(48x | commands in SMAGPL, such as      |
| 48).png "Note icon") | ENDSMASYS. To remove the         |
|                                  | libraries from the job library   |
|                                  | list, use the LSAM command       |
|                                  | SMARMVLIBL                       |
|                                  | ENV(SMADEFAULT).]    |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | (Remember to replace the name of |
|                                  | the LSAM environment in the      |
|                                  | ENV() parameter of this and the  |
|                                  | LSAMCMD example, above, when     |
|                                  | using these commands with an     |
|                                  | alternate LSAM environment, such |
|                                  | as a test LSAM.)                 |
+----------------------------------+----------------------------------+

### LSAM Commands to Communicate with OpCon

There are IBM i commands installed with the SMA Agent for IBM i that can
be used to send critical job information to OpCon. Some of the purposes
for this kind of communication include:

-   Update the IBM i job status that is displayed on OpCon views of
    scheduled jobs, to show job step progress or an error status.
-   Add Detailed Job Messages to the history of any single IBM i job
    started or tracked by OpCon, typically to provide an explanation of
    unusual job behavior.
-   Trigger LSAM Feedback events that may have been configured on a
    per-job basis in OpCon.

This section of the topic provides a detailed explanation and
instructions for using the LSAM Commands that communicate with OpCon,
listed at the start of the Commands Table, above.

 

  -------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [Most commands that communicate with OpCon must originate from within an IBM i job that was started by OpCon, or is being tracked by OpCon. The LFEEDBACK command is enhanced with a JOB() parameter that supports naming a job that is monitored by OpCon.]
  -------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

#### LFEEDBACK - Send LSAM Feedback

LSAM Feedback is a feature of OpCon jobs that defines Event commands to
be triggered when certain text string values are received. OpCon uses
Field Codes that are reserved in its database for each different type of
Agent or Connector that is allowed to use LSAM Feedback triggers. The
Agent that is executing a job can generate a job status report at any
time and append one or more LSAM Feedback Field Codes to that job status
message.

 

The IBM i LSAM can execute the LFEEDBACK command from Response Rules
linked to SCANSPLF Scan Rules, to Operator Replay Script steps or to
Message Management Parameters. This command can also be executed from
any other access to an IBM i command processor, as long as the job fits
one of the following profiles. It is important to properly manage the
JOB() parameter according to the job\'s environment.

-   The job was started by OpCon or is tracked by OpCon: can use JOB(\*)
    for the current job, or use JOB(123456/USERID/JOBNAME) to reference
    other jobs.

-   The job was not started by OpCon, but the job uses the LSAM
    environment library list: must provide a specific Job ID as
    JOB(123456/USERID/JOBNAME).

-   The job was not started by OpCon, and the job does not use the LSAM
    environment library list: use the LSAM command-hosting command
    SMAGPL/LSAMCMD and put the LFEEDBACK command into the hosting
    command\'s CMD() parameter, and must provide a specific JOB ID,
    using the following representative syntax:

When a job using this command was started or tracked by OpCon, then the
command\'s JOB( ) parameter can be left set to its default value of (\*)
which indicates \"use the current job.\" The command can also be used
from outside of a job started or tracked by OpCon as long as the JOB( )
parameter names a job that OpCon did start, or is tracking. Execution of
this command from jobs outside of OpCon control will allow the LFEEDBACK
command to execute, but OpCon will discard the LSAM feedback text string
because it will not recognize the job. For unrecognized jobs, there will
be no Event triggered by OpCon.

 

Message Management Parameters can also use this command from the main
Event command line if the command\'s JOB( ) parameter names an OpCon
job. The JOB() parameter can identify the job that issued the message by
inserting the Message Management \$-Special variable for the Job ID,
like this: JOB(\$IBM JOB ID). Similarly, Operator Replay Steps could
execute the LFEEDBACK command from within the virtual workstation
session, even though that secondary job is not the script driver job
that OpCon directly started, but only if the JOB( ) parameter identifies
a job that OpCon started.

 

The LFEEDBACK command could also be executed directly as the main
command of an OpCon job. But the purpose of this type of job would be
specifically to trigger an Event rule assigned to LSAM Feedback Trigger
in the OpCon job master record. This kind of job would most likely be
used only for test purposes.

 

The syntax of the LFEEDBACK command is illustrated below, followed by an
explanation of its keyword parameters:

SMAPGM/LFEEDBACK TEXT(\'My feedback text\') MSGSEQ(0) STSMSGID(SMA0035)
JOB(123456/USERID/JOBNAME)

##### Command Parameters

-   **TEXT** = Must be enclosed by a pair of single quotes (unless only
    one word with no spaces is used that starts with an alphabetic
    character), and any enclosed single quotes must be escaped by
    doubling the single quote character. This text must include the key
    word or words that were used to configure the LSAM Feedback Trigger
    in the OpCon job master record, otherwise no Event will be
    triggered.
-   **MSGSEQ** = This parameter should always be left set to a value of
    zero. Its purpose is only for internal use by SMA programs, as it
    controls how the OpCon database will store LSAM Feedback Field
    Codes.
-   **STSMSGID** = A message code that is used to determine the type of
    job status message that will be sent to OpCon. Use the table of LSAM
    job status message codes, listed in Machine Messages, to select a
    valid message ID. The example of SMA0035 indicates that the IBM i
    job is still normally active, and that would be the typical job
    status returned to OpCon as the LFEEDBACK message is being
    generated, usually by the job whose status is being reported.
    However, LSAM Feedback can be sent as part of the protocol
    indicating a job failure.
-   **JOB** = The default value for this parameter is an asterisk (\*)
    which indicates that the feedback refers to the current job that is
    executing the LFEEDBACK command. As described above, this keyword
    can be used to name an OpCon-monitored job when the LFEEDBACK
    command is being used from outside of an OpCon job. A typical
    example of this is when the LSAM Message Management server wants to
    send LSAM Feedback about the job that issued the message it is
    currently processing. The LSAM Message Management server would use
    the special \$-Variable named \$IBM JOB ID within this JOB( )
    keyword to tell the Message Management server it must replace that
    variable with the message\'s IBM i Job ID.

##### Other Command Constraints

In order for this command to work from a user-defined program, the job
must include the LSAM environment library list. Those library names
could be added to a user-defined job using the LSAM command
SMAGPL/SMAADDLIBL (and later removed using command SMAGPL/SMARMVLIBL).
Another way to get the LSAM libraries added for the command is to
enclose the LFEEDBACK command inside the LSAM command-hosting command
SMAGPL/LSAMCMD, as illustrated above. The LSAM library list would
already be included by default in the LSAM Message Management server and
in any job that executes an Operator Replay script, and the LSAM library
list is also a prerequisite for running the SCANSPLF and SCANOUTQ
commands.

 

In the example command syntax above, the MSGSEQ parameter should be left
assigned to its default value of zero, so it is not necessary to include
this parameter. (This parameter has limited purpose in special
applications.) The STSMSGID parameter causes a new job status to appear
on the OpCon job status display; the value of SMA0035 means that a job
is still running in normal status. Users can specify other job status
message IDs if that is appropriate; please review the contents of the
SMAMSGF message file in library SMADTA and/or the list of job status
messages in Machine Messages of the **IBM i LSAM** online help to
determine which job status IDs would be appropriate.

##### OpCon Field Codes Supported by the IBM i LSAM

The LSAM Feedback capability within OpCon is assigned to each supported
LSAM using specific OpCon database Field Codes. These field codes are
used to generate the LSAM Feedback Trigger prompting within the
maintenance program for OpCon job masters. There are two field codes
assigned (as of this publication date) to the IBM i LSAM:

-   **5801** = IBM i job stuck in MSGW status (fixed purpose)
-   **5802** = User-defined LSAM Feedback text (variable purpose)

For client sites using a version of OpCon that has not been updated to
at least the maintenance release of early 2015 (OpCon version 15.1 or
newer), the new LSAM Feedback option for user-defined text will not
appear. It will be necessary to update the SMALOOKUP table in the OpCon
database using some predefined SQL statements. These SQL statements are
available to licensed users of the IBM i LSAM from the LSAM PTF
resources at SMA\'s FTP server location. The SQL statements and
installation instructions are also contained with the LSAM\'s PTF
post-install instructions, under PTFs 403177 and 403184. Please contact
SMA Support if any assistance with this update is required.

 

The separate purpose and implementation of these two forms of LSAM
Feedback are described next.

 

[SMA5801 Notification of Job MSGW Status and LSAM Feedback]{.ul} 
 

The field code 5801 is fully described in the Configuration topic of
this online help, under the topic with the title above, located under
the heading of \"Extended Discussion of Parameters.\"

 

In summary, when the LSAM Parameters (main menu, option 7) have
designated a valid message queue for the SMA5801 option, then the LSAM
will send predefined LSAM Feedback information whenever it detects that
a job started or tracked by OpCon is stuck in the MSGW (message waiting
for response) status. The OpCon job master record shows a special entry
in the LSAM Feedback options just for this 5801 MSGW trigger: \"Active
job in MSGW status\". The user can register any form of Event command to
be triggered when this category of feedback is received. The Event
triggered may vary, depending on the nature of the job.

 

[5802 User-defined LSAM Feedback]{.ul} 
 

When the LFEEDBACK command is used, it sends any text string that the
user defines to OpCon for processing according to LSAM Feedback Triggers
that were added to the OpCon job master record. For the command to work,
the type of LSAM Feedback selected in OpCon must be: \"User-defined text
from LFEEDBACK command\". In addition, the compare text assigned to each
Event definition must match all or a designated part of the TEXT value
specified for the LFEEDBACK command. For more information about LSAM
Feedback, please refer to the **Concepts** online help (scan for LSAM
Feedback).

#### SMAJOBMSG - Send Detailed Job Messages to OpCon

The Agent can send Detailed Job Messages to OpCon that will be attached
to the Job Information of the designated job. Within Enterprise Manager,
these Detailed Job Messages can be viewed by following this navigation
path: start by using either (1) a double-left mouse click on the job
name, or (2) a right mouse click on the job name and then a left mouse
click in the context menu on the title \"Job Information.\" Next, click
on the following tabs and titles: (Job Information\... -\> Configuration
-\> Operations Related\... -\> Detailed Job Messages).

 

When the number of messages is greater than zero, click on the green
plus sign circle to reveal a list of the Detailed Job Messages.

 

When this SMAJOBMSG command is used, for example, by Captured Data
Response Rules, important information about circumstances detected
within the IBM i job can be registered in the OpCon database. This makes
it very easy for an OpCon operator to discover the cause of a job
failure, or of any other unusual job status that may be observed in the
Enterprise Manager view of jobs. (Refer to the SMASTATUS command, below,
for more information about posting exceptional job status information.)

 

Here is an example of the command syntax, followed by a list explaining
the command keywords:

SMAJOBMSG TEXT(\'Transaction batch total: {AMTDYNVAR} \') MSGSEQ(0)
STSMSGID(SMA0035) JOB(\*) FLDCOD(61)

 

From Message Management, the trapped message could be forwarded to OpCon
Detailed Job Messages using the following command syntax model, where
the primary message text is automatically made available via the special
variable \$MSG:

SMAJOBMSG TEXT(\'Found error \$MSGID : \$MSG\') MSGSEQ(0)
STSMSGID(SMA0035) JOB(\$IBM JOB ID) FLDCOD(61)

 

Depending on another context, where the SMAJOBMSG command can be used,
such as Multi-Step Job Scripts, the special variables \$ERRMSGID and
\$ERRMSGTXT for a Step error could be sent to OpCon Detailed Job
Messages from an ON_ERROR command using the following command syntax
model:

SMAJOBMSG TEXT(\'Found error \$ERRMSGID : \$ERRMSGTXT\') MSGSEQ(0)
STSMSGID(SMA0035) JOB(\*) FLDCOD(61)

##### Command Parameters

-   **TEXT** = Must be enclosed by a pair of single quotes (unless only
    one word with no spaces is used that starts with an alphabetic
    character), and any enclosed single quotes must be escaped by
    doubling the single quote character. This text can include any
    helpful information about a job. It is typical that a Dynamic
    Variable token would be used by a Captured Data Response Rule, often
    to send the captured data to OpCon so it can be displayed in the
    history of Detailed Job Messages. (The Dynamic Variable token is
    replaced by the actual variable data value as the SMAJOBMSG command
    is submitted for processing by the LSAM Response Rules engine.)

-   **MSGSEQ** = This parameter should always be left set to a value of
    zero. Its purpose is only for internal use by SMA programs, as it
    controls how the OpCon database will store LSAM Feedback Field
    Codes. The zero value allows OpCon to record multiple Job Detail
    messages without overlaying any previous message.

-   **STSMSGID** = A message code that is used to determine the type of
    job status message that will be sent to OpCon. Use the table of LSAM
    job status message codes, listed in Machine Messages, to select a
    valid message ID. The example of SMA0035 indicates that the IBM i
    job is still normally active, and that would be the typical job
    status returned to OpCon as general job profile information is being
    reported. However, a different job status message ID would be
    appropriate when the Detailed Job Message is explaining the reason
    for a job failure.

-   **JOB** = Within any IBM i job that was started by OpCon, the
    default value of JOB(\*) refers to the current IBM i Job ID. The
    Agent uses this Job ID to find and send the OpCon Job identifiers to
    the OpCon server as the key for the Detailed Job Messages.
    Otherwise, Agent automation features such as Message Management can
    use this command parameter to identify the IBM i job that issued a
    message that is currently being handled. For Message Management, the
    value required in this keyword is easily represented by the special
    variable: JOB(\$IBM JOB ID). For other automation tools that can
    know a job was started by OpCon, the format of the Job ID is the
    same string as used by native IBM i commands:
    JOB(123456/USER/JOBNAME).

-   **FLDCOD** = Unless otherwise instructed, OpCon users should not
    change the default value of 61 for this parameter. The OpCon field
    code 61 is used by the OpCon database and programs to identify
    Detailed Job Messages. The command prompt shows another field code
    64 that is used internally by Agent File Arrival programs to send a
    path and file name to the OpCon system property called \$ARRIVED
    FILE NAME. OpCon users should not attempt to use field code 64 or
    any other field code (unless this Agent documentation contains
    specific instructions about using a different code) because this can
    cause OpCon database corruption and the cost of a recovery would be
    the user\'s responsibility. This FLDCOD parameter is documented for
    the benefit of SMA Developers as they continue to produce automation
    enhancements.

##### SMAJOBMSG JOB Parameter Syntax and Application

In the command syntax examples above, notice that the default value for
the JOB(\*) parameter is an asterisk, which represents that the current
job\'s IBM i Job ID should be used. This imitates the behavior of older
versions of the SMAJOBMSG command as it worked before the JOB keyword
was added.

 

Any of the IBM i LSAM automation tools that can be executed within batch
jobs started by OpCon can rely on the default value of the JOB(\*)
parameter to represent the current IBM i Job ID. Whenever the asterisk
is used within the JOB() parameter, it will be replaced with the actual
IBM i Job ID, resulting in a command syntax that resembles the following
simplified example:

SMAJOBMSG TEXT(\'Detail msg\') STSMSGID(SMA0035)
JOB(123456/USER/JOBNAME)

 

This format for the JOB() parameter can be used anywhere that the IBM i
Job ID is known. As always, if the command must be executed outside of
the LSAM environment, without the LSAM library list in effect, it is
necessary to embed this command within the LSAM command-hosting command,
like this:

SMAGPL/LSAMCMD CMD(\'SMAJOBMSG \...

 

However, in some cases, such as within the LSAM Message Management
server, the IBM i Job ID information would not be the same as the
current job that is executing the SMAJOBMSG command. This is because the
LSAM Message Management server job is not under the direct control of
the OpCon server. The IBM i Job ID of the LSAM Message Management server
job is not related to the actual IBM i Job IDs that generated the
messages themselves.

 

To make the IBM i Job ID associated with each individual message
available, the IBM i LSAM defines some of its \$-Special variables,
representing the ability of the LSAM Message Management server to find
and use the correct IBM i Job ID. The predefined LSAM variable named
\$IBM JOB ID could be inserted into the JOB keyword value, and this
particular predefined variable is already formatted as required by the
JOB keyword. So, within a Message Management Event command field, or
from a Captured Data Response Rule linked to a Message Management
Parameter record, the command syntax would look like this:

SMAJOBMSG TEXT(\'Detail msg\') STSMSGID(SMA0035) JOB(\$IBM JOB ID)

 

Notice that the spaces within the predefined variable name are required
and anticipated - it must be spelled exactly like this. There are also
other LSAM \$-Special variable names that can be used to represent each
part of an IBM i Job ID. Additional information about \$-Special
variables can be found within the LSAM documentation under the following
headings:

-   Message Management
-   Commands and Utilities
-   Events and Utilities Menu

#### SMASTATUS - Send Job Status Message to OpCon

OpCon and the IBM i LSAM employ a job scheduling protocol which includes
a standard format for job status messages. This command causes the LSAM
to generate current job status information and send it to OpCon. The
purpose of this command is to override the job status value that is
displayed on most views of jobs in the Enterprise Manager user
interface. The MESSAGE parameter of this command supplies the text to be
displayed on various EM views.

 

Since this command does not (currently) support an ability to designate
an IBM i Job ID, it can only be used from within a job that was started
by, or is tracked by OpCon. An example of where this command might be
useful is among the Steps of an LSAM Multi-Step Job Script, if OpCon
started the job that is executing the script.

 

Here is an example of the command syntax, followed by a table explaining
the command keywords:

SMASTATUS MESSAGE(\'Step=JOBSTEP01\')

##### Command Parameters

**MESSAGE** = Must be enclosed by a pair of single quotes (unless only
one word with no spaces is used that starts with an alphabetic
character), and any enclosed single quotes must be escaped by doubling
the single quote character. This text can include any helpful
information about the current job status.

### File Arrival Jobs using CHKFILE and CHKIFSFIL

Previously, the IBM i LSAM utility commands CHKFILE and CHKIFSFIL could
only be used for a simple, one-time, instant check for the existence of
a file. One or two additional parameters were supported to provide
feedback about user authority or locked objects. These commands could
not easily be used to watch for a file arrival. The current version of
IBM i Agent software supports a long list of optional command parameters
for these commands, enabling a File Arrival job type along with
additional file qualifiers.

 

Since OpCon introduced the Windows (MSLSAM) job sub-type of a File
Arrival job, a new standard was established for integrating file
watching directly into OpCon schedules. This replaced many of the
functions of the older, separate File Watcher service of the OpCon
Windows Resource Monitor -- although there were certain services
provided by the File Watcher that are still being replaced as the
Windows job sub-type model evolves.

 

Now the OpCon (version 17.1 and newer) IBM i job master record supports
a separate job sub-type called \"File Arrival\" which makes it easier to
configure file watching for IBM i, instead of using the IBM i \"Batch
Job\" sub-type and typing in all the CHK\* command parameters. The new
Enterprise Manager (EM) panel that appears for File Arrival jobs makes
it easy to configure this type of job with many different options. The
EM panel is actually supported by the IBM i Agent using its native
CHKFILE and CHKIFSFIL commands. In addition, the Variables Tab of the
IBM i job master record supports any of the command parameter keywords,
so that the entire range of Agent command capabilities are available to
OpCon EM users.

 

Both of the commands also support an off-line execution mode for use
either as a pre-test of file watching concepts, or as a production
command that might be useful in some of the IBM i LSAM automation tools,
such as Multi-Step Job scripts or as part of a collection of Captured
Data Response Rules (which support Operator Replay, Message Management
and the SCANSPLF utility). The command parameter OPCONJOB(N) is used to
disable OpCon communication functions, such as reporting a job
completion status, when the commands are used in their stand-alone mode.

 

SMA clients who were previously using either of these commands in IBM i
Batch Jobs can continue to execute those jobs without having to change
any OpCon job parameter. Similarly, SMA clients who have not yet updated
the OpCon server to version 17.1 or newer can still gain all the
advantages of these enhanced commands by using them as the Call command
for an OpCon IBM i job sub-type of Batch Job. All of the new command
parameters include initial default values that cause the command driver
programs to behave as they did before the EM panel support enhancements
were added. However, any existing job definitions might be worth
reviewing, to see if new command capabilities would improve the
effectiveness of the old job strategies.

#### Tips and Techniques for the CHKFILE and CHKIFSFIL Commands

-   New Optional Command Keywords

A long list of optional command keywords, documented below, support many
new features so that this Agent can perform a File Arrival job type and
also support an ongoing File Watcher strategy.

-   Support for the OpCon File Arrival Job Sub-type

Starting with OpCon version 17.1, the IBM i job master record offers a
new job sub-type called \"File Arrival.\" (The sub-type of jobs for the
IBM i Agent is supported by a \"Job type\" field within the lower EM
panel that contains job master data specific to this Agent.) The File
Arrival job sub-type supports a data entry panel that makes it easier to
define File Arrival job parameters. This technique replaces the former
strategy of using the IBM i \"Batch Job\" sub-type and entering raw
command line text with many optional command keywords. But, behind the
scenes, the Agent is still using the same CHKFILE and CHKIFSFIL commands
as are documented here. The following information helps to decide on
appropriate settings for the File Arrival job definition.

-   Extended List of Command Completion Codes

The Agent File Arrival commands support an extended range of completion
codes. These completion codes can be sent to a local Agent\'s Dynamic
Variable, so that they can be tested when the CHKFILE or CHKIFSFIL
commands are used from within the Agent\'s local automation tools, such
as the Multi-Step Job Scripting tool.

 

When an OpCon Schedule submits a File Arrival job, the completion code
can be sent to an OpCon Property. But just as useful, the completion
code is also sent to three other destinations:

1.  It is included in the Exit Description, that is, the displayed job
    status text.
2.  It is sent within a text string as LSAM Feedback (hint: match %CKF0%
    or a specific code such as %CKF0006%).
3.  Detailed Job messages provide the completion code and its
    description.

The Exit Description and the LSAM Feedback can be used to define Events
triggered by the OpCon job.

-   New Options to Control the Final Job Status

A combination of the Agent\'s File Arrival command parameters with a
drop-down list of Failure Conditions in the OpCon EM job definition
panel allows the user to decide whether the Agent will report a final
job status of Finished OK or Failed, depending on a variety of different
circumstances. These options allow the File Arrival job to adapt to the
requirements of a software application or of the user\'s surrounding
OpCon Schedule dependencies.

 

The higher level decision about Finished OK versus Failed can be further
refined by using the OpCon job\'s Events tab to respond to any of the
completion codes expected from the IBM i Agent.

-   New \$@ Agent Variable Names Support Command Keywords

As the OpCon general standards for File Arrival jobs evolve, the full
capabilities that are unique to the IBM i Agent File Arrival commands
can be engaged by setting any command keyword value from the Variables
Tab of an OpCon job. This makes it possible to engage any of this
Agent\'s capabilities that are not already supported by the OpCon EM job
definition panel.

 

  -------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [The two variable prefix characters \"\$@\" are used consistently in this documentation to refer to the user-defined prefix characters that are defined in the LSAM Events and Utilities menu (sub-menu 3) using option 7: LSAM Utility Configuration. IBM i partitions using US EBCDIC (CCSID 37) should normally continue using the default values of \"\$@\". Partitions using other national language character sets may need to change the prefix characters because of the way they are translated between the local version of IBM i EBCDIC and the ASCII character set used by the OpCon server. See the chapter about [Utilities Screens and Windows](Events-and-Utilities-Menu.md#Utilitie2) for more information about changing the prefix characters.]
  -------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

The IBM i Agent now supports a system-reserved naming convention for
variables that can be added to the OpCon job Variables tab, where any
command keyword can be prefixed with the characters \'\$@\' to designate
that the Variable Name is referring to a command keyword. For example,
this Agent\'s command keyword \"JOBENDTIME\" can have a value set by
adding a variable named \$\@JOBENDTIME to the OpCon job\'s Variables
tab. The value provided for this type of variable name must exactly
match the format and type of value that is supported by either
command\'s JOBENDTIME() keyword.

 

The \$@ command keyword convention is supported by this Agent for any
IBM i job. However, it should only be used for circumstances documented
in this IBM i Agent user help, otherwise unpredictable results could
occur. As a general rule, this type of command keyword will be inserted
only within the IBM i job\'s CMD() line, which is a parameter of the IBM
i SBMJOB command. Thus, the \$@ variable names cannot be used (at this
time) to extend the parameters of the SBMJOB command itself.

 

The \$@ command keyword variables can be used with IBM i Batch Jobs that
are executing the CHK\* commands. These Variable tab entries may support
greater flexibility in the format of value data entry, as compared to
using the raw CHKFILE or CHKIFSFIL command keywords in an IBM i Batch
Job. For example, values for time relative to midnight can be expressed
in clock time format such as 14:30, or in decimal format such as 14.5
(where both values mean 14 hours and 30 minutes after midnight/start of
day).

#### Change to the CHKIFSFIL search work library: no longer uses QTEMP

As of PTF \# 181047, the sub-programs that search the IFS stream file
directories no longer use the QTEMP library to report their search
results and errors. Instead, they use a temporary work library named
\'CKF\' plus the IBM i Job Number where the CKFIFSFIL command executes.

 

The temporary work library will be retained in case the CHKIFSFIL
command reports a failure, unless a command parameter says to ignore
failures. When the command completes normally or ignores errors, then
the work library will be deleted at the end of the command processing.

 

To perform debugging operations when the command completes normally, set
the new command parameter KEEPWRKLIB(Y) to the value of \'Y\' = yes.

#### Change to the management of the CHK-command job library list:

When the commands CHKFILE and CHKIFSFIL are used in an IBM i Batch Job,
not when started by the OpCon File Arrival job type, these commands can
be requested for execution from outside of the LSAM environment. To
successfully launch these commands that do require the LSAM library
list, qualify the commands with their library location (SMAPGM/CHK...)
and then observe the following rules.

 

There are two existing command parameters at the end of both the
CHKIFSFIL and CHKFILE command that can be used to temporarily establish
a correct LSAM library list for the command execution job:

 

ENV = the LSAM environment name (defaults to the current LSAM).

GPL = the name of the SMAGPL library in this LSAM environment.

 

When these two parameters are set to existing values, and not left set
to their default values of \'\*DEFAULT\', the CHK\* commands can be
executed from anywhere within the IBM i partition without

requiring that the job\'s initial (or current) library list be set to
the LSAM environment library list.

 

When the ENV and GPL values are set to represent an existing LSAM
environment, the CHK\* command driver programs will add the LSAM
environment libraries temporarily to the job\'s library list, so that
the command can interact as required with tables in the LSAM database.

 

Prior to LSAM PTF \# 181047, the File Arrival jobs or the stand-alone
CHKIFSFIL and CHKFILE commands required that the LSAM library list be
established before the commands would execute. Now the configuration of
an OpCon job is much easier to manage, and these two commands can be
easily executed from anywhere within the IBM i partition.

#### Using JOBENDTIME and RECHKFREQ Parameters to Control Job Behavior

The old, original CHKFILE and CHKIFSFIL commands performed simple,
one-time checks for a file. They were designed to be used in the Pre-Run
command line of an OpCon job master.

 

With the implementation of the File Arrival job sub-type for IBM i jobs,
it is now possible to control the behavior of the File Arrival job so
that it executes either a one-time check or it performs a continues file
arrival watching function. When defining the continuous file watching
function, it is important to carefully control the two IBM i parameters
that enable this capability.

-   **RECHKFREQ** (Re-check frequency): This parameter creates two
    effects. When it is not zero, it implies that the check for a
    matching file will be repeated, and this frequency value specifies
    (in seconds) how long the file check program will pause before
    repeating the check for file existence. When this value is left at
    zero (by default, or intentionally specifying zero), this tells the
    file check commands that the job should perform only a one-time
    check.
-   **JOBENDTIME** (Job End Time): The Job End Time works together with
    the Re-check Frequency. The primary use case for the Job End Time
    parameter is when it is expected that a file might have been created
    earlier in the day (or on a previous day), but it will not be moved
    into the watched directory (or DB2 library) until after some
    previous depended-on job has completed. Currently, the OpCon Windows
    File Arrival job depends only on the file Create End Time to govern
    when the File Arrival job should stop. But if the target file is
    believed to have a Create Time in the past, and the job only wants
    to find a file that was created on or before that time, then there
    is no good way to keep the File Arrival job running until the
    expected file finally arrives. Using the Job End Time parameter
    separates the control of the absolute time when the File Arrival job
    should give up waiting and end, and it allows the File Create End
    Time to perform only its intended function of qualify whether a
    matching file name was created during the desired window of time.
    When the Job End Time is zero (the default for this parameter), then
    the Create End Time WILL govern the absolute job end time. But when
    a Job End Time is specified, then the file check commands will use
    this value as the end time boundary for the Re-check Frequency.
      ------------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      ![White triangle icon on yellow circlular background](../../../Resources/Images/caution-icon(48x48).png "Caution icon")   **CAUTION:** [If both the Job End Time and the Create End Time are zeros/blanks, but the Re-check Frequency is not zero, then the File Arrival job will run endlessly until a matching file is found. This can only happen if the user intentionally creates this parameter configuration -- the default parameter values for the job will not create this endless loop. Interestingly, allowing for an endless loop makes it possible to create a real all-day file watcher. For this type of job, users can choose to have an OpCon control schedule force the job to end and then start a new one, based on their own schedule, or the endless file watcher could just keep running day after day until and unless there is a system stop or system failure. In that case, it would be necessary to have a secondary OpCon service monitor restarting itself all the time to assure that the endless file watcher job is always active.]
      ------------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

#### Using the Agent Commands in File Arrival Jobs

The recommended method for configuring File Arrival jobs in OpCon
Schedules is to select the IBM i job sub-type of \"File Arrival\" and
then fill in the unique job definition panel. The Variables tab of the
IBM i job can also be used to set additional command parameters using
the \$@ Agent variable naming convention to represent any given command
parameter keyword. The File Arrival job sub-type will cause the Agent to
format and submit the CHKFILE or CHKIFSFIL command, with any optional
\$\@VARIABLE parameters, as the File Arrival job.

 

Before the OpCon File Arrival job definition panel was supported for IBM
i jobs, the job sub-type of Batch Job was used and the CHKFILE or
CHKIFSFIL command with parameters was typed (or pasted) into the Call
command box. That format of File Arrival Job may still be used -- it
fully supports all the same features as the new File Arrival job
definition panel. All new command parameter keywords that have been
added to the two commands support default values that are transparent to
older formats of the command lines, so existing Batch job definitions
using the native command lines will still execute correctly.

 

Otherwise, the command line formats of the CHKFILE and CHKIFSFIL
commands are documented here for two purposes. First, these commands can
be used in local mode (not submitted by OpCon), such as from a Step of a
Multi-Step Job Script, or from a Captured Data Response Rule, as long as
the command parameter OPCONJOB is set to a value of (N), (T), or (A),
where both of those values refer to Test mode (offline from OpCon).
Second, a clear understanding of the native command parameters may be
required to complete more complex File Arrival job definitions,
especially when using the \$@ variable names for setting command
parameter keyword values from an OpCon job\'s Variables tab.

##### Formatting the File Arrival Command Line

A good way to prepare a correctly formatted File Arrival command line is
to use an IBM i green screen command entry line and prompt either
command using function key F4. After completing the required command
parameters, press F3 to cancel the command, then, use F9 to retrieve the
cancelled command so that the complete command line can be copied and
pasted.

 

When logged on to a green screen workstation, it is very helpful to use
the full screen command entry mode. This is the best way to capture
longer command lines so they can be pasted into an OpCon job\'s Call
command box.

 

To enter the full screen mode for IBM i commands, type the following
command and then press Enter:

CALL QCMD

 

To successfully access the File Arrival commands it is necessary to
refer to at least the Agent library SMAPGM, where the commands are
stored. To execute either command, the full Agent library list is
required. However, when simply prompting the command to format the
parameter keywords, it is only necessary to use the SMAPGM library. The
following options will support prompting the commands:

-   Type SMAPGM/CHKFILE or SMAPGM/CHKIFSFIL and press F4.
-   Enter the Agent (LSAM) menu system and use the menu command line to
    type only the command name, then press F4. It works better to first
    CALL QCMD before attempting to prompt, format, cancel and retrieve
    the command line.
-   From any IBM i command line, the Agent commands SMAGPL/SMASETLIBL or
    SMAGPL/SMAADDLIBL can be used to replace or amplify the job\'s
    library list with the complete set of Agent libraries. Then it is
    only necessary to type the command name before pressing F4=Prompt.

The values specified for the many different command parameters will
depend on which of the functions listed below are required. It is
possible for one job to perform many different file checking functions,
although multiple functions requested at once will interact with each
other (in ways described below).

##### Configuring an OpCon IBM i Batch Job for File Arrival

Although the original Batch Job method for defining File Arrival jobs is
no longer the recommended method, it still works, and this is the only
method for defining IBM i File Arrival jobs with versions of OpCon prior
to 17.1. File Arrival jobs that are already formatted this way will
continue to work, and can be enhanced with most of the newer features.

 

Here is an example of a semi-complex file watching command entered into
an IBM i batch job master record in OpCon:

Example OpCon IBM i batch job

![Example OpCon IBM i Batch Job](../../../Resources/Images/IBM-i/Example-OpCon-IBM-i-Batch-Job.png "Example OpCon IBM i Batch Job")

 

The various parameter values illustrated in the image, above, are all
explained in tables below in this document. The command line could be
much simpler, since the only value that must be specified is the
PATHNAME parameter (for this CHKIFSFIL command), or the FILE parameter
for the CHKFILE command.

 

All new File Arrival jobs in OpCon (version 17.1 and newer) should be
configured using the newer \"File Arrival\" job sub-type for IBM i jobs.

#### Purpose of CHKFILE versus CHKIFSFIL

The CHKFILE command is designed for use only with the DB2 database that
comes embedded with the IBM i operating system. It is designed to work
with Libraries that contain different types of objects. Only the object
type of \*FILE is supported by this command. The file attribute would
typically be either PF-DTA or PF-SRC, although LF (logical views) and
some other \*FILE objects can also be checked.

 

The CHKIFSFIL command can be used with any file system supported by the
IBM i operating system. Perhaps the most common use of this command
would be to watch for files arriving in the \'/\' (root) file system,
which, like the basic Windows disk system, can contain nested
directories and it is not case sensitive.

 

  ------------------------------------------------------------------------------------------------------------------------------ -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White \"X\" icon on red circular background](../../../Resources/Images/warning-icon(48x48).png "Warning icon")   **WARNING:** [Although the \'/\' (root) file system is not case sensitive, the CHKIFSFIL command may use some UNIX-style APIs which are case sensitive. Therefore, the PATHNAME parameter must be managed as case sensitive.]
  ------------------------------------------------------------------------------------------------------------------------------ -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

The CHKIFSFIL command can be used with other of the Integrated File
Systems (IFS), including, for example, the /QOpenSys file system that
resembles UNIX disk systems and is case sensitive. The old /QDLS
document storage file system can also be checked with CHKIFSFIL,
although this poorly performing file system is no longer recommended for
use.

 

CHKIFSFIL can also be used with the DB2 database file system, since it
also exists within the operating system\'s generalized IFS file system,
but the format for addressing DB2 tables from the IFS file system
perspective must be configured like this:

\'/QSYS.LIB/MYLIBRARY.LIB/MYFILE.FILE\'

**-or-**

\'/QSYS.LIB/MYLIBRARY.LIB/MYFILE.FILE/MYDATA.MBR\'

 

In most cases, it is probably better to use the CHKFILE command for DB2
tables, especially since the CHKIFSFIL command will re-route any DB2
file definitions to the CHKFILE command.

##### Replacing Windows File Shares with Direct Access to IBM i

Before there was an enhanced File Arrival job method for the IBM i
Agent, many OpCon users would try to use the OpCon Windows Resource
Monitor in File Watcher mode. This required a complex configuration of
IBM i disk file shares within the Windows system where the Resource
Monitor was executing, as well as difficult management of user
authorities.

 

Now, the enhanced IBM i File Arrival job sub-type replaces the
dependency on IBM i file shares with direct access to any IBM i file
system. This is a welcome move towards eliminating the extra work
required for system and network administrators to configure IBM i file
shares. Another benefit of eliminating the use of file shares is a
reduced work load within the IBM i system, which improves system
performance overall.

#### Using CHKFILE for DB2 Tables

The File Name field of an IBM i File Arrival job sub-type in the OpCon
EM is checked by the Agent to determine whether the file exists in the
DB2 database, or whether it is located outside of DB2 in another IFS
file system, such as the root \'/\' file system. It is the leading
forward slash character \'/\' that designates an IFS file outside of
DB2. Without the leading slash, the Agent attempts to hand the File Name
string in the DB2 format of LIBRARY/FILENAME or
LIBRARY/FILENAME(MEMBER). When a DB2 format will be processed, the Agent
uses the EM job definition panel fields to compose the Agent\'s CHKFILE
command for execution in an IBM i batch job.

 

The CHKFILE command can also be used in stand-alone mode, either inside
of OpCon using the IBM I job sub-type of Batch Job, or outside of direct
control by OpCon, from some of the Agent\'s local automation tools such
as a Multi-Step Job Script, or as a command in a Captured Data Response
Rule. To use this command off line from OpCon, it is necessary to
specify the command parameter OPCONJOB() with a value of N=no, or T or
A, where either value indicates \"test mode\" for the command. In fact,
\"No\" or the test mode turns off any attempt to send job information
and completion codes to OpCon. The optional parameters for sending
values to OpCon Properties are also not supported in the local test
mode; but in this case, there are Dynamic Variable names that can be
specified for similar purposes.

 

The CHKFILE command complete command syntax is shown here with the
default values for all parameters (where applicable):

CHKFILE

FILE(libname/filename)

LOCK(\*NO)

MEMBER(\*FIRST)

FILNAMPROP(\*NONE)

NUMRECPROP(\*NONE)

FAILCDPROP(\*NONE)

FILNAMDV(\*NONE)

NUMRECDV(\*NONE)

FAILCODEDV(\*NONE)

FAILIFZERO(\*NO)

CRTSTRTIME(0)

CRTENDTIME(0)

CRTREFDATE(\*DEFAULT)

JOBENDTIME(0)

JOBREFDATE(\*DEFAULT)

RECHKFREQ(0)

STABLEDUR(0)

AUTUSER(\*JOB)

AUT(\*NONE)

OPCONJOB(O)

FAILONERR(Y)

ENV(\*DEFAULT)

GPL(\*DEFAULT)

 

The command parameter summary shown next defines each parameter and
lists possible values. However, the effect of using these parameters
together can vary the outcome of the command, as discussed below.

##### CHKFILE Command Parameter Summary

+-------------------+-----------------------+-----------------------+
| Parameter Keyword | Values                | Description           |
+===================+=======================+=======================+
| FILE              | IBM i object names.   | DB2: library name /   |
|                   | File name can be      | file (table) name.    |
|                   | generic.              |                       |
|                   |                       | The file name can be  |
|                   |                       | generic, e.g., FIL\*. |
|                   |                       | For DB2 tables, only  |
|                   |                       | a trailing asterisk   |
|                   |                       | (\*) is supported for |
|                   |                       | generic names. A      |
|                   |                       | partial name is       |
|                   |                       | defined by one or     |
|                   |                       | more leading          |
|                   |                       | characters            |
|                   |                       | (conforming to the    |
|                   |                       | rules for IBM i       |
|                   |                       | object names).        |
+-------------------+-----------------------+-----------------------+
| LOCK              | -   \*NO              | \*YES causes command  |
|                   |                       | to report failure if  |
|                   | -   \*YES             | a lock exists on the  |
|                   |                       | file object that      |
|                   |                       | might prevent a       |
|                   |                       | subsequent operation  |
|                   |                       | from being performed. |
+-------------------+-----------------------+-----------------------+
| MEMBER            | -   \*FIRST           | Optionally, specify a |
|                   |                       | specific data member  |
|                   | -   IBM i object name | name for PF-SRC       |
|                   |                       | files, or for         |
|                   |                       | multi-member PF-DTA   |
|                   |                       | files. (SQL tables do |
|                   |                       | not support multiple  |
|                   |                       | data members.)        |
+-------------------+-----------------------+-----------------------+
| FILNAMPROP        | -   \*NONE            | File Name Property:   |
|                   |                       | Optionally, specify   |
|                   | -   OpCon Property    | an OpCon Property     |
|                   |     name              | name (without         |
|                   |                       | brackets) that will   |
|                   | -   {dvtoken}         | store the name of the |
|                   |                       | actual file that was  |
|                   |                       | found and used for    |
|                   |                       | the command. This     |
|                   |                       | feedback is important |
|                   |                       | when a GENERIC\* name |
|                   |                       | is submitted. An LSAM |
|                   |                       | Dynamic Variable      |
|                   |                       | token (with curly     |
|                   |                       | braces) can be used   |
|                   |                       | to provide the actual |
|                   |                       | name of the OpCon     |
|                   |                       | Property at run time. |
+-------------------+-----------------------+-----------------------+
| NUMRECPROP        | -   \*NONE            | Number of Records     |
|                   |                       | Property: Optionally, |
|                   | -   OpCon Property    | specify an OpCon      |
|                   |     name              | Property name         |
|                   |                       | (without brackets)    |
|                   | -   {dvtoken}         | that will store the   |
|                   |                       | digits representing   |
|                   |                       | the number of records |
|                   |                       | for the actual file   |
|                   |                       | that was found and    |
|                   |                       | used for the command. |
|                   |                       | An LSAM Dynamic       |
|                   |                       | Variable token (with  |
|                   |                       | curly braces) can be  |
|                   |                       | used to provide the   |
|                   |                       | actual name of the    |
|                   |                       | OpCon Property at run |
|                   |                       | time.                 |
+-------------------+-----------------------+-----------------------+
| FAILCDPROP        | -   \*NONE            | Failure Code (command |
|                   |                       | completion code)      |
|                   | -   OpCon Property    | Property: Optionally, |
|                   |     name              | specify an OpCon      |
|                   |                       | Property name         |
|                   | -   {dvtoken}         | (without brackets)    |
|                   |                       | that will store the   |
|                   |                       | command completion    |
|                   |                       | code. An LSAM Dynamic |
|                   |                       | Variable token (with  |
|                   |                       | curly braces) can be  |
|                   |                       | used to provide the   |
|                   |                       | actual name of the    |
|                   |                       | OpCon Property at run |
|                   |                       | time.                 |
+-------------------+-----------------------+-----------------------+
| FILNAMDV          | -   \*NONE            | File Name Dynamic     |
|                   |                       | Variable: Optionally, |
|                   | -   LSAM Dynamic      | specify an LSAM       |
|                   |     Variable name     | Dynamic Variable name |
|                   |                       | (without curly        |
|                   |                       | braces) that will     |
|                   |                       | store the name of the |
|                   |                       | actual file that was  |
|                   |                       | found and used for    |
|                   |                       | the command.          |
+-------------------+-----------------------+-----------------------+
| NUMRECDV          | -   \*NONE            | Number of Records     |
|                   |                       | Dynamic Variable:     |
|                   | -   LSAM Dynamic      | Optionally, specify   |
|                   |     Variable name     | an LSAM Dynamic       |
|                   |                       | Variable name         |
|                   |                       | (without curly        |
|                   |                       | braces) that will     |
|                   |                       | store digits for the  |
|                   |                       | number of active      |
|                   |                       | records in the actual |
|                   |                       | file that was found   |
|                   |                       | and used for the      |
|                   |                       | command.              |
+-------------------+-----------------------+-----------------------+
| FAILCODEDV        | -   \*NONE            | Failure Code (command |
|                   | -   LSAM Dynamic      | completion code)      |
|                   |     Variable name     | Dynamic Variable:     |
|                   |                       | Optionally, specify   |
|                   |                       | an LSAM Dynamic       |
|                   |                       | Variable name         |
|                   |                       | (without curly        |
|                   |                       | braces) that will     |
|                   |                       | store the command     |
|                   |                       | completion code. This |
|                   |                       | value can be useful,  |
|                   |                       | for example, when     |
|                   |                       | developing LSAM       |
|                   |                       | Multi-Step Job        |
|                   |                       | scripts, to condition |
|                   |                       | actions that might be |
|                   |                       | performed depending   |
|                   |                       | on the completion     |
|                   |                       | code value.           |
+-------------------+-----------------------+-----------------------+
| FAILIFZERO        | -   \*NO              | Fail If Zero (report  |
|                   |                       | job status as         |
|                   | -   \*YES             | failed):              |
|                   |                       |                       |
|                   |                       | -   \*NO = allow the  |
|                   |                       |     command to        |
|                   |                       |     complete normally |
|                   |                       |     when a file is    |
|                   |                       |     found with zero   |
|                   |                       |     records.          |
|                   |                       |                       |
|                   |                       | -   \*YES = request   |
|                   |                       |     the command       |
|                   |                       |     report a failure  |
|                   |                       |     when the file is  |
|                   |                       |     found with zero   |
|                   |                       |     records.          |
|                   |                       |                       |
|                   |                       | (Refer also the notes |
|                   |                       | about parameter       |
|                   |                       | interactions.)        |
+-------------------+-----------------------+-----------------------+
| CRTSTRTIME        | -   0 (zero)          | The File Create Time  |
|                   |                       | must occur after this |
|                   | -   +/- 99999.99      | Start Time value      |
|                   |     hours, where .99  | (converted to a time  |
|                   |     refers to         | stamp relative to     |
|                   |     hundredths of an  | midnight of the       |
|                   |     hour: 0.25 = 15   | Reference Date).      |
|                   |     minutes.          |                       |
|                   |                       | -   Zero means to     |
|                   |                       |     ignore this       |
|                   |                       |     parameter.        |
|                   |                       |                       |
|                   |                       | -   A negative value  |
|                   |                       |     indicates the     |
|                   |                       |     number of hours   |
|                   |                       |     before midnight.  |
|                   |                       |                       |
|                   |                       | -   A positive value  |
|                   |                       |     indicates the     |
|                   |                       |     number of hours   |
|                   |                       |     after midnight.   |
|                   |                       |                       |
|                   |                       | -   Batch Jobs can    |
|                   |                       |     use the OpCon     |
|                   |                       |     job\'s Variables  |
|                   |                       |     Tab to load       |
|                   |                       |     \$\@CRTSTRTIME    |
|                   |                       |     with a format of  |
|                   |                       |     hhhhh:mm (+/-     |
|                   |                       |     hours and         |
|                   |                       |     minutes.          |
+-------------------+-----------------------+-----------------------+
| CRTENDTIME        | -   0 (zero)          | The File Create Time  |
|                   |                       | must occur before     |
|                   | -   +/- 99999.99      | this End Time value   |
|                   |     hours, where .99  | (converted to a time  |
|                   |     refers to         | stamp relative to     |
|                   |     hundredths of an  | midnight of the       |
|                   |     hour: 0.25 = 15   | Reference Date).      |
|                   |     minutes.          |                       |
|                   |                       | -   Zero means to     |
|                   |                       |     ignore this       |
|                   |                       |     parameter.        |
|                   |                       |                       |
|                   |                       | -   A negative value  |
|                   |                       |     indicates the     |
|                   |                       |     number of hours   |
|                   |                       |     before midnight.  |
|                   |                       |                       |
|                   |                       | -   A positive value  |
|                   |                       |     indicates the     |
|                   |                       |     number of hours   |
|                   |                       |     after midnight.   |
|                   |                       |                       |
|                   |                       | -   Batch Jobs can    |
|                   |                       |     use the OpCon     |
|                   |                       |     job\'s Variables  |
|                   |                       |     Tab to load       |
|                   |                       |     \$\@CRTENDTIME    |
|                   |                       |     with a format of  |
|                   |                       |     hhhhh:mm (+/-     |
|                   |                       |     hours and         |
|                   |                       |     minutes.          |
+-------------------+-----------------------+-----------------------+
| CRTREFDATE        | -   \*DEFAULT         | File Create Time      |
|                   |                       | Reference Date for    |
|                   | -   \*SCHED           | midnight: Designates  |
|                   |                       | what date is used for |
|                   | -   \*JOB             | midnight. Midnight is |
|                   |                       | considered to be at   |
|                   | -   CCYYMMDD          | the start of the      |
|                   |                       | specified date.       |
|                   | -   {dvtoken}         |                       |
|                   |                       | -   For OpCon jobs,   |
|                   |                       |     \*DEFAULT refers  |
|                   |                       |     to the Schedule   |
|                   |                       |     Date of the job.  |
|                   |                       |                       |
|                   |                       | -   Outside of OpCon  |
|                   |                       |     (job type is T or |
|                   |                       |     A), \*DEFAULT     |
|                   |                       |     refers to the     |
|                   |                       |     current IBM i     |
|                   |                       |     system date.      |
|                   |                       |                       |
|                   |                       | -   \*SCHED = use the |
|                   |                       |     Schedule Date     |
|                   |                       |     (only valid for   |
|                   |                       |     OpCon jobs).      |
|                   |                       |                       |
|                   |                       | -   \*JOB = use the   |
|                   |                       |     IBM i Job Date.   |
|                   |                       |                       |
|                   |                       | -   CCYYMMDD = an     |
|                   |                       |     actual date may   |
|                   |                       |     be specified,     |
|                   |                       |     e.g., 20160601 =  |
|                   |                       |     June 1, 2016.     |
|                   |                       |                       |
|                   |                       | -   An LSAM Dynamic   |
|                   |                       |     Variable (with    |
|                   |                       |     curly braces) can |
|                   |                       |     be translated at  |
|                   |                       |     run time to       |
|                   |                       |     provide an actual |
|                   |                       |     date in the       |
|                   |                       |     CCYYMMDD format.  |
|                   |                       |                       |
|                   |                       | For EM File Arrival   |
|                   |                       | jobs, use the job     |
|                   |                       | master Variables tab  |
|                   |                       | to put the desired    |
|                   |                       | Value into the        |
|                   |                       | variable              |
|                   |                       | \$\@CRTREFDATE.       |
+-------------------+-----------------------+-----------------------+
| JOBENDTIME        | -   0 (zero)          | The Job End Time,     |
|                   |                       | when specified,       |
|                   | -   +/- 99999.99      | replaces using the    |
|                   |     hours, where .99  | File Create End Time  |
|                   |     refers to         | as the default last   |
|                   |     hundredths of an  | time that a file      |
|                   |     hour: 0.25 = 15   | check can occur. (The |
|                   |     minutes.          | +/- value is          |
|                   |                       | converted to a time   |
|                   |                       | stamp relative to     |
|                   |                       | midnight of the Job   |
|                   |                       | Reference Date).      |
|                   |                       |                       |
|                   |                       | -   Zero means to     |
|                   |                       |     ignore this       |
|                   |                       |     parameter.        |
|                   |                       | -   A negative value  |
|                   |                       |     indicates the     |
|                   |                       |     number of hours   |
|                   |                       |     before midnight.  |
|                   |                       | -   A positive value  |
|                   |                       |     indicates the     |
|                   |                       |     number of hours   |
|                   |                       |     after midnight.   |
|                   |                       |                       |
|                   |                       | EM File Arrival or    |
|                   |                       | Batch Jobs can use    |
|                   |                       | the OpCon job\'s      |
|                   |                       | Variables Tab to load |
|                   |                       | \$\@JOBENDTIME with a |
|                   |                       | format of hhhhh:mm    |
|                   |                       | (+/- hours and        |
|                   |                       | minutes or using a    |
|                   |                       | decimal format such   |
|                   |                       | as +14.5 = 14 hours   |
|                   |                       | and 30 minutes after  |
|                   |                       | Midnight).            |
+-------------------+-----------------------+-----------------------+
| JOBREFDATE        | -   \*DEFAULT         | Job End Time          |
|                   | -   \*SCHED           | Reference Date for    |
|                   | -   \*JOB             | midnight: Designates  |
|                   | -   CCYYMMDD          | what date is used for |
|                   | -   {dvtoken}         | midnight. Midnight is |
|                   |                       | considered to be at   |
|                   |                       | the start of the      |
|                   |                       | specified date.       |
|                   |                       |                       |
|                   |                       | -   For OpCon jobs,   |
|                   |                       |     \*DEFAULT refers  |
|                   |                       |     to the Schedule   |
|                   |                       |     Date of the job.  |
|                   |                       |                       |
|                   |                       | -   Outside of OpCon  |
|                   |                       |     (job type is T or |
|                   |                       |     A), \*DEFAULT     |
|                   |                       |     refers to the     |
|                   |                       |     current IBM i     |
|                   |                       |     system date.      |
|                   |                       |                       |
|                   |                       | -   \*SCHED = use the |
|                   |                       |     Schedule Date     |
|                   |                       |     (only valid for   |
|                   |                       |     OpCon jobs).      |
|                   |                       |                       |
|                   |                       | -   \*JOB = use the   |
|                   |                       |     IBM i Job Date.   |
|                   |                       |                       |
|                   |                       | -   CCYYMMDD = an     |
|                   |                       |     actual date may   |
|                   |                       |     be specified,     |
|                   |                       |     e.g., 20160601 =  |
|                   |                       |     June 1, 2016.     |
|                   |                       |                       |
|                   |                       | An LSAM Dynamic       |
|                   |                       | Variable (with curly  |
|                   |                       | braces) can be        |
|                   |                       | translated at run     |
|                   |                       | time to provide an    |
|                   |                       | actual date in the    |
|                   |                       | CCYYMMDD format.      |
|                   |                       |                       |
|                   |                       |                       |
|                   |                       |                       |
|                   |                       | For EM File Arrival   |
|                   |                       | jobs, use the job     |
|                   |                       | master Variables tab  |
|                   |                       | to put the desired    |
|                   |                       | Value into the        |
|                   |                       | variable              |
|                   |                       | \$\@JOBREFDATE.       |
+-------------------+-----------------------+-----------------------+
| RECHKFREQ         | -   0 (zero)          | Frequency to re-check |
|                   |                       | for file existence:   |
|                   | -   999 seconds       |                       |
|                   |                       | -   Zero means to     |
|                   |                       |     check once for a  |
|                   |                       |     matching file     |
|                   |                       |     name (optionally  |
|                   |                       |     qualifying it by  |
|                   |                       |     the Start/End     |
|                   |                       |     Create time).     |
|                   |                       |                       |
|                   |                       | -   Greater than zero |
|                   |                       |     indicates the     |
|                   |                       |     number of seconds |
|                   |                       |     to wait between   |
|                   |                       |     repeated checks   |
|                   |                       |     for file          |
|                   |                       |     existence. Check  |
|                   |                       |     looping will not  |
|                   |                       |     start until at or |
|                   |                       |     after the Start   |
|                   |                       |     time, and it will |
|                   |                       |     end once the End  |
|                   |                       |     time has been     |
|                   |                       |     reached.          |
|                   |                       |                       |
|                   |                       | The Job End time is   |
|                   |                       | either specified by   |
|                   |                       | its own parameter, or |
|                   |                       | it will default to    |
|                   |                       | the File Create End   |
|                   |                       | Time. If both are     |
|                   |                       | zero, then a job with |
|                   |                       | a non-zero RECHKFREQ  |
|                   |                       | will continue running |
|                   |                       | for 24 hours from the |
|                   |                       | IBM i system job      |
|                   |                       | start time.           |
+-------------------+-----------------------+-----------------------+
| STABLEDUR         | -   0 (zero)          | File size stable for  |
|                   |                       | this duration in      |
|                   | -   999 seconds       | seconds: Specify the  |
|                   |                       | number of seconds     |
|                   |                       | that the file size    |
|                   |                       | (number of records)   |
|                   |                       | must remain the same. |
|                   |                       | The command will      |
|                   |                       | repeat the check of   |
|                   |                       | the number of records |
|                   |                       | after waiting for     |
|                   |                       | this number of        |
|                   |                       | seconds, until a      |
|                   |                       | second check produces |
|                   |                       | the same number of    |
|                   |                       | records as the        |
|                   |                       | previous check. If    |
|                   |                       | the number of records |
|                   |                       | remains zero, then    |
|                   |                       | the FAILIFZERO        |
|                   |                       | parameter controls    |
|                   |                       | the final command     |
|                   |                       | status.               |
+-------------------+-----------------------+-----------------------+
| AUTUSER           | -   \*JOB             | Specify the User      |
|                   |                       | whose authority to    |
|                   | -   User Profile name | the file will be      |
|                   |                       | verified (using the   |
|                   | -   {dvtoken}         | AUT authority         |
|                   |                       | values).              |
|                   |                       |                       |
|                   |                       | -   If this parameter |
|                   |                       |     is blank or the   |
|                   |                       |     default value of  |
|                   |                       |     \*JOB, then the   |
|                   |                       |     user profile      |
|                   |                       |     assigned to the   |
|                   |                       |     job that is       |
|                   |                       |     executing the     |
|                   |                       |     command will be   |
|                   |                       |     used, IF AUT      |
|                   |                       |     values are        |
|                   |                       |     specified.        |
|                   |                       |                       |
|                   |                       | -   If AUT values are |
|                   |                       |     not specified,    |
|                   |                       |     then this         |
|                   |                       |     parameter is      |
|                   |                       |     ignored. But if   |
|                   |                       |     AUT values are    |
|                   |                       |     specified, then   |
|                   |                       |     this User name    |
|                   |                       |     will be           |
|                   |                       |     referenced.       |
|                   |                       |                       |
|                   |                       | -   An LSAM Dynamic   |
|                   |                       |     Variable token    |
|                   |                       |     can be used to    |
|                   |                       |     provide the User  |
|                   |                       |     Name.             |
|                   |                       |                       |
|                   |                       | For OpCon EM File     |
|                   |                       | Arrival jobs, the     |
|                   |                       | User name specified   |
|                   |                       | in the job master     |
|                   |                       | record is applied to  |
|                   |                       | this parameter. The   |
|                   |                       | File Arrival job      |
|                   |                       | itself always runs    |
|                   |                       | under the authority   |
|                   |                       | of the SMANET Agent   |
|                   |                       | user profile.         |
|                   |                       |                       |
|                   |                       |                       |
|                   |                       |                       |
|                   |                       | For Batch Jobs,       |
|                   |                       | specifiy the job user |
|                   |                       | name that has         |
|                   |                       | authority to use the  |
|                   |                       | LSAM CHK\* command    |
|                   |                       | utility, and then put |
|                   |                       | the name of the user  |
|                   |                       | whose authority must  |
|                   |                       | be checked into the   |
|                   |                       | AUTUSER command       |
|                   |                       | parameter.            |
+-------------------+-----------------------+-----------------------+
| AUT               | -   \*NONE            | List one or more      |
|                   |                       | authority values that |
|                   | -   \*CHANGE          | will be used to       |
|                   |                       | verify if the AUTUSER |
|                   | -   \*ALL             | has this/these        |
|                   |                       | authorities to use    |
|                   | -   \*USE             | the file.             |
|                   |                       |                       |
|                   | -   \*EXCLUDE         |                       |
|                   |                       |                       |
|                   | -   \*AUTL            | For more information  |
|                   |                       | about these authority |
|                   | -   \*OBJALTER        | values and their      |
|                   |                       | use/meaning, please   |
|                   | -   \*OBJEXIST        | consult IBM i         |
|                   |                       | documentation for the |
|                   | -   \*OBJMGT          | GRTOBJAUT command.    |
|                   |                       |                       |
|                   | -   \*OBJOPR          |                       |
|                   |                       |                       |
|                   | -   \*OBJREF          | If AUT shows a value  |
|                   |                       | of \*NONE, then the   |
|                   | -   \*ADD             | AUTUSER will be       |
|                   |                       | ignored and no        |
|                   | -   \*DLT             | authority check will  |
|                   |                       | be performed.         |
|                   | -   \*READ            |                       |
|                   |                       |                       |
|                   | -   \*UPD             |                       |
|                   |                       | If any of the         |
|                   | -   \*EXECUTE         | specified authority   |
|                   |                       | rights are not        |
|                   |                       | assigned to the       |
|                   |                       | AUTUSER, the command  |
|                   |                       | will fail with error  |
|                   |                       | code CKF0007.         |
|                   |                       |                       |
|                   |                       |                       |
|                   |                       |                       |
|                   |                       | **Note**: For EM File |
|                   |                       | Arrival jobs, the     |
|                   |                       | list of authorities   |
|                   |                       | can be specified for  |
|                   |                       | DB2 tables using the  |
|                   |                       | Value column of the   |
|                   |                       | job\'s Variables      |
|                   |                       | table, specifying a   |
|                   |                       | variable name of      |
|                   |                       | \$\@AUT. Otherwise,   |
|                   |                       | the authority for DB2 |
|                   |                       | tables will be set to |
|                   |                       | approximate the READ, |
|                   |                       | WRITE and EXEC stream |
|                   |                       | file authority        |
|                   |                       | options supported by  |
|                   |                       | the EM job.           |
+-------------------+-----------------------+-----------------------+
| OPCONJOB          | -   O                 | -   O or Y (Yes) =    |
|                   |                       |     OpCon started the |
|                   | -   Y                 |     job and the OpCon |
|                   |                       |     server can        |
|                   | -   N                 |     receive Property  |
|                   |                       |     value settings.   |
|                   | -   T                 |                       |
|                   |                       | -   T or N (No) =     |
|                   | -   A                 |     Test or local IBM |
|                   |                       |     i job: No attempt |
|                   |                       |     is made to send   |
|                   |                       |     values to an      |
|                   |                       |     OpCon server. Use |
|                   |                       |     this mode when    |
|                   |                       |     the CHKFILE       |
|                   |                       |     command is        |
|                   |                       |     executed from an  |
|                   |                       |     LSAM Multi-Step   |
|                   |                       |     Job script or     |
|                   |                       |     from LSAM         |
|                   |                       |     Response Rules.   |
|                   |                       |                       |
|                   |                       | -   A = a French      |
|                   |                       |     indication for    |
|                   |                       |     test mode, same   |
|                   |                       |     as \'T\'.         |
+-------------------+-----------------------+-----------------------+
| FAILONERR         | -   Y                 | Report Job Status as  |
|                   |                       | failed when file      |
|                   | -   1                 | check fails:          |
|                   |                       |                       |
|                   | -   N                 | -   Y = Yes or 1: The |
|                   |                       |     command will      |
|                   | -   0                 |     report a failed   |
|                   |                       |     job status if a   |
|                   | -   T                 |     file is not       |
|                   |                       |     found, or the     |
|                   |                       |     file Create Time  |
|                   |                       |     does not fall     |
|                   |                       |     within the        |
|                   |                       |     Start/End times.  |
|                   |                       |                       |
|                   |                       | -   N = No or zero    |
|                   |                       |     (0): The command  |
|                   |                       |     will always       |
|                   |                       |     report a normal   |
|                   |                       |     job completion    |
|                   |                       |     status even when  |
|                   |                       |     no matching file  |
|                   |                       |     is found. When    |
|                   |                       |     using N, the      |
|                   |                       |     final command     |
|                   |                       |     status should be  |
|                   |                       |     stored in an LSAM |
|                   |                       |     Dynamic Variable  |
|                   |                       |     and/or an OpCon   |
|                   |                       |     Property so that  |
|                   |                       |     it can be tested. |
|                   |                       |                       |
|                   |                       | -   T = file not      |
|                   |                       |     found by End      |
|                   |                       |     Time, but ignore  |
|                   |                       |     and end normally. |
|                   |                       |                       |
|                   |                       | -   If the file check |
|                   |                       |     command is        |
|                   |                       |     reporting an      |
|                   |                       |     internal program  |
|                   |                       |     failure, then     |
|                   |                       |     this override     |
|                   |                       |     flag is ignored   |
|                   |                       |     and the command   |
|                   |                       |     will always       |
|                   |                       |     report the        |
|                   |                       |     failure.          |
|                   |                       |                       |
|                   |                       | The OpCon EM File     |
|                   |                       | Arrival job supports  |
|                   |                       | different Fail        |
|                   |                       | Condition options,    |
|                   |                       | including this one.   |
|                   |                       | This FAILONERR option |
|                   |                       | can be combined (in   |
|                   |                       | some cases) with the  |
|                   |                       | FAILIFZERO option in  |
|                   |                       | an EM File Arrival    |
|                   |                       | job by adding the     |
|                   |                       | \$\@FAILIFZERO        |
|                   |                       | variable name to the  |
|                   |                       | job\'s Variables tab  |
|                   |                       | and specifying that   |
|                   |                       | parameter\'s Value.   |
|                   |                       |                       |
|                   |                       |                       |
|                   |                       |                       |
|                   |                       | (Refer also the       |
|                   |                       | discussion about      |
|                   |                       | using LSAM Feedback.) |
+-------------------+-----------------------+-----------------------+
| ENV               | \*DEFAULT             | Used when the CHKFILE |
|                   |                       | command is executed   |
|                   | Actual LSAM           | by itself (not by the |
|                   | environment name      | OpCon File Arrival    |
|                   |                       | job), to set the LSAM |
|                   |                       | library list          |
|                   |                       | according to the LSAM |
|                   |                       | Environment name.     |
+-------------------+-----------------------+-----------------------+
| GPL               | \*DEFAULT             | Used when the CHKFILE |
|                   |                       | command is executed   |
|                   | Actual SMAGPL library | by itself (not by the |
|                   | name                  | OpCon File Arrival    |
|                   |                       | job), to identify the |
|                   |                       | SMAGPL library where  |
|                   |                       | the LSAM Environment  |
|                   |                       | library list can be   |
|                   |                       | found.                |
+-------------------+-----------------------+-----------------------+

: CHKFILE command parameter values

#### Using CHKIFSFIL for IFS Stream Files

The File Name field of an IBM i File Arrival job sub-type in the OpCon
EM is checked by the Agent to determine whether the file exists in the
DB2 database, or whether it is located outside of DB2 in another IFS
file system, such as the root \'/\' file system. It is the leading
forward slash character \'/\' that designates an IFS file outside of
DB2. When a non-DB2 IFS format will be processed, the Agent uses the EM
job definition panel fields to compose the Agent\'s CHKIFSFIL command
for execution in an IBM i batch job.

 

The CHKIFSFIL command can also be used in stand-alone mode, outside of
direct control by OpCon, from some of the Agent\'s local automation
tools such as a Multi-Step Job Script, or as a command in a Captured
Data Response Rule. To use this command off line from OpCon, it is
necessary to specify a value of (N), (T), or (A) for the command
parameter OPCONJOB(), where (N) = not an OpCon job and either value (T)
or (A) indicates \"test mode\" for the command. In fact, the test mode
turns off any attempt to send job information and completion codes to
OpCon. The optional parameters for sending values to OpCon Properties
are also not supported in the local test mode; but in this case, there
are Dynamic Variable names that can be specified for similar purposes.

 

The CHKIFSFIL command complete command syntax is shown here with the
default values for all parameters (where applicable):

CHKIFSFIL

PATHNAME(\'/dir/subdir/file.ext\')

READ(\*NO)

WRITE(\*NO)

EXEC(\*NO)

AUTUSER(\*JOB)

FILNAMPROP(\*NONE)

FILSIZPROP(\*NONE)

FAILCDPROP(\*NONE)

FILNAMDV(\*NONE)

FILSIZDV(\*NONE)

FAILCODEDV(\*NONE)

FAILIFZERO(\*NO)

CRTSTRTIME(0)

CRTENDTIME(0)

CRTREFDATE(\*DEFAULT)

JOBENDTIME(0)

JOBREFDATE(\*DEFAULT)

RECHKFREQ(0)

STABLEDUR(0)

OPCONJOB(O)

FAILONERR(Y)

ENV(\*DEFAULT)

GPL(\*DEFAULT)

KEEPWRKLIB(n)

 

The command parameter summary shown next defines each parameter and
lists possible values. However, the effect of using these parameters
together can vary the outcome of the command, as discussed below.

##### CHKIFSFIL Command Parameter Summary

+---------------------+----------------------+----------------------+
| Parameter Keyword   | Values               | Description          |
+=====================+======================+======================+
| PATHNAME            | Fully qualified IFS  | The file name and/or |
|                     | path including the   | extension can use    |
|                     | file name. File name | generic search       |
|                     | can be generic.      | characters,          |
|                     |                      | including a question |
|                     |                      | mark (?) for single  |
|                     |                      | character masking    |
|                     |                      | and an asterisk (\*) |
|                     |                      | for a variable       |
|                     |                      | number of            |
|                     |                      | characters. An       |
|                     |                      | example of a generic |
|                     |                      | file name mask might |
|                     |                      | be: L?C\*.\*         |
|                     |                      |                      |
|                     |                      |                      |
|                     |                      |                      |
|                     |                      | This mask indicates  |
|                     |                      | any one character    |
|                     |                      | between the L and C, |
|                     |                      | then any number of   |
|                     |                      | characters before    |
|                     |                      | the period, and any  |
|                     |                      | number of characters |
|                     |                      | in the file          |
|                     |                      | extension.           |
|                     |                      |                      |
|                     |                      |                      |
|                     |                      |                      |
|                     |                      | To experiment with   |
|                     |                      | generic file name    |
|                     |                      | masks, use the       |
|                     |                      | STRQSH command and   |
|                     |                      | then the DIRLIST     |
|                     |                      | command. The         |
|                     |                      | CHKIFSFIL utility    |
|                     |                      | relies on the        |
|                     |                      | DIRLIST command      |
|                     |                      | executed by QSHELL   |
|                     |                      | for all file checks. |
+---------------------+----------------------+----------------------+
| READ(\*NO)          | -   \*NO             | Check for file       |
|                     |                      | au                   |
| WRITE(\*NO)         | -   \*YES            | thority/permissions: |
|                     |                      |                      |
| EXEC(\*NO)          |                      |                      |
|                     |                      |                      |
|                     |                      | Specify \*YES for    |
|                     |                      | any of these         |
|                     |                      | parameters to cause  |
|                     |                      | the command to check |
|                     |                      | for this type of     |
|                     |                      | authority to the     |
|                     |                      | file, as assigned to |
|                     |                      | the AUTUSER.         |
|                     |                      |                      |
|                     |                      |                      |
|                     |                      |                      |
|                     |                      | If the user is a     |
|                     |                      | member of a Group    |
|                     |                      | profile that has the |
|                     |                      | requested            |
|                     |                      | authorities, then    |
|                     |                      | the command reports  |
|                     |                      | success.             |
|                     |                      |                      |
|                     |                      |                      |
|                     |                      |                      |
|                     |                      | If the \*PUBLIC has  |
|                     |                      | the requested        |
|                     |                      | authorities, the     |
|                     |                      | command will report  |
|                     |                      | success.             |
+---------------------+----------------------+----------------------+
| AUTUSER             | -   \*JOB            | Specify the User     |
|                     |                      | whose authority to   |
|                     | -   User Profile     | the file will be     |
|                     |     name             | verified (using the  |
|                     |                      | AUT authority        |
|                     | -   {dvtoken}        | values).             |
|                     |                      |                      |
|                     |                      | -   If this          |
|                     |                      |     parameter is     |
|                     |                      |     blank or the     |
|                     |                      |     default value of |
|                     |                      |     \*JOB, then the  |
|                     |                      |     user profile     |
|                     |                      |     assigned to the  |
|                     |                      |     job that is      |
|                     |                      |     executing the    |
|                     |                      |     command will be  |
|                     |                      |     used.            |
|                     |                      |                      |
|                     |                      | -   If all the       |
|                     |                      |     authority values |
|                     |                      |     of READ, WRITE   |
|                     |                      |     and EXEC are set |
|                     |                      |     to (\*NO), then  |
|                     |                      |     this AUTUSER     |
|                     |                      |     will be ignored  |
|                     |                      |     and no authority |
|                     |                      |     checking will be |
|                     |                      |     executed.        |
|                     |                      |                      |
|                     |                      | -   An LSAM Dynamic  |
|                     |                      |     Variable token   |
|                     |                      |     can be used to   |
|                     |                      |     provide the User |
|                     |                      |     Name.            |
|                     |                      |                      |
|                     |                      | For OpCon EM File    |
|                     |                      | Arrival jobs, the    |
|                     |                      | User name specified  |
|                     |                      | in the job master    |
|                     |                      | record is applied to |
|                     |                      | this parameter. The  |
|                     |                      | File Arrival job     |
|                     |                      | itself always runs   |
|                     |                      | under the authority  |
|                     |                      | of the SMANET Agent  |
|                     |                      | user profile.        |
|                     |                      |                      |
|                     |                      |                      |
|                     |                      |                      |
|                     |                      | For Batch Jobs,      |
|                     |                      | specifiy the job     |
|                     |                      | user name that has   |
|                     |                      | authority to use the |
|                     |                      | LSAM CHK\* command   |
|                     |                      | utility, and then    |
|                     |                      | put the name of the  |
|                     |                      | user whose authority |
|                     |                      | must be checked into |
|                     |                      | the AUTUSER command  |
|                     |                      | parameter.           |
+---------------------+----------------------+----------------------+
| FILNAMPROP          | -   \*NONE           | File Name Property:  |
|                     |                      | Optionally, specify  |
|                     | -   OpCon Property   | an OpCon Property    |
|                     |     name             | name (without        |
|                     |                      | brackets) that will  |
|                     | -   {dvtoken}        | store the name of    |
|                     |                      | the actual file that |
|                     |                      | was found and used   |
|                     |                      | for the command.     |
|                     |                      | This feedback is     |
|                     |                      | important when a     |
|                     |                      | GENERIC\* name is    |
|                     |                      | submitted. An LSAM   |
|                     |                      | Dynamic Variable     |
|                     |                      | token (with curly    |
|                     |                      | braces) can be used  |
|                     |                      | to provide the       |
|                     |                      | actual name of the   |
|                     |                      | OpCon Property at    |
|                     |                      | run time.            |
+---------------------+----------------------+----------------------+
| FILSIZPROP          | -   \*NONE           | File Size Property:  |
|                     |                      | Optionally, specify  |
|                     | -   OpCon Property   | an OpCon Property    |
|                     |     name             | name (without        |
|                     |                      | brackets) that will  |
|                     | -   {dvtoken}        | store the digits     |
|                     |                      | representing the     |
|                     |                      | number of bytes for  |
|                     |                      | the size of the      |
|                     |                      | actual file that was |
|                     |                      | found and used for   |
|                     |                      | the command. An LSAM |
|                     |                      | Dynamic Variable     |
|                     |                      | token (with curly    |
|                     |                      | braces) can be used  |
|                     |                      | to provide the       |
|                     |                      | actual name of the   |
|                     |                      | OpCon Property at    |
|                     |                      | run time.            |
+---------------------+----------------------+----------------------+
| FAILCDPROP          | -   \*NONE           | Failure Code         |
|                     |                      | (command completion  |
|                     | -   OpCon Property   | code) Property:      |
|                     |     name             | Optionally, specify  |
|                     |                      | an OpCon Property    |
|                     | -   {dvtoken}        | name (without        |
|                     |                      | brackets) that will  |
|                     |                      | store the command    |
|                     |                      | completion code. An  |
|                     |                      | LSAM Dynamic         |
|                     |                      | Variable token (with |
|                     |                      | curly braces) can be |
|                     |                      | used to provide the  |
|                     |                      | actual name of the   |
|                     |                      | OpCon Property at    |
|                     |                      | run time.            |
+---------------------+----------------------+----------------------+
| FILNAMDV            | -   \*NONE           | File Name Dynamic    |
|                     |                      | Variable:            |
|                     | -   LSAM Dynamic     | Optionally, specify  |
|                     |     Variable name    | an LSAM Dynamic      |
|                     |                      | Variable name        |
|                     |                      | (without curly       |
|                     |                      | braces) that will    |
|                     |                      | store the name of    |
|                     |                      | the actual file that |
|                     |                      | was found and used   |
|                     |                      | for the command.     |
+---------------------+----------------------+----------------------+
| FILSIZCDV           | -   \*NONE           | File Size Dynamic    |
|                     |                      | Variable:            |
|                     | -   LSAM Dynamic     | Optionally, specify  |
|                     |     Variable name    | an LSAM Dynamic      |
|                     |                      | Variable name        |
|                     |                      | (without curly       |
|                     |                      | braces) that will    |
|                     |                      | store the digits     |
|                     |                      | representing the     |
|                     |                      | number of bytes for  |
|                     |                      | the size of the      |
|                     |                      | actual file that was |
|                     |                      | found and used for   |
|                     |                      | the command.         |
+---------------------+----------------------+----------------------+
| FAILCODEDV          | -   \*NONE           | Failure Code         |
|                     |                      | (command completion  |
|                     | -   LSAM Dynamic     | code) Dynamic        |
|                     |     Variable name    | Variable:            |
|                     |                      | Optionally, specify  |
|                     |                      | an LSAM Dynamic      |
|                     |                      | Variable name        |
|                     |                      | (without curly       |
|                     |                      | braces) that will    |
|                     |                      | store the command    |
|                     |                      | completion code.     |
|                     |                      | This value can be    |
|                     |                      | useful, for example, |
|                     |                      | when developing LSAM |
|                     |                      | Multi-Step Job       |
|                     |                      | scripts, to          |
|                     |                      | condition actions    |
|                     |                      | that might be        |
|                     |                      | performed depending  |
|                     |                      | on the completion    |
|                     |                      | code value.          |
+---------------------+----------------------+----------------------+
| FAILIFZERO          | -   \*NO             | Fail If Zero (report |
|                     |                      | job status as        |
|                     | -   \*YES            | failed):             |
|                     |                      |                      |
|                     |                      | -   \*NO = allow the |
|                     |                      |     command to       |
|                     |                      |     complete         |
|                     |                      |     normally when a  |
|                     |                      |     file is found    |
|                     |                      |     with zero bytes  |
|                     |                      |     of data.         |
|                     |                      |                      |
|                     |                      | -   \*YES = request  |
|                     |                      |     the command      |
|                     |                      |     report a failure |
|                     |                      |     when the file is |
|                     |                      |     found with zero  |
|                     |                      |     bytes of data.   |
|                     |                      |                      |
|                     |                      | (Refer also the      |
|                     |                      | notes about          |
|                     |                      | parameter            |
|                     |                      | interactions)        |
+---------------------+----------------------+----------------------+
| CRTSTRTIME          | -   0 (zero)         | The File Create Time |
|                     |                      | must occur after     |
|                     | -   +/- 99999.99     | this Start Time      |
|                     |     hours, where .99 | value (converted to  |
|                     |     refers to        | a time stamp         |
|                     |     hundredths of an | relative to midnight |
|                     |     hour: 0.25 = 15  | of the Reference     |
|                     |     minutes.         | Date).               |
|                     |                      |                      |
|                     |                      | -   Zero means to    |
|                     |                      |     ignore this      |
|                     |                      |     parameter.       |
|                     |                      |                      |
|                     |                      | -   A negative value |
|                     |                      |     indicates the    |
|                     |                      |     number of hours  |
|                     |                      |     before midnight. |
|                     |                      |                      |
|                     |                      | -   A positive value |
|                     |                      |     indicates the    |
|                     |                      |     number of hours  |
|                     |                      |     after midnight.  |
|                     |                      |                      |
|                     |                      | -   Batch Jobs can   |
|                     |                      |     use the OpCon    |
|                     |                      |     job\'s Variables |
|                     |                      |     Tab to load      |
|                     |                      |     \$\@CRTSTRTIME   |
|                     |                      |     with a format of |
|                     |                      |     hhhhh:mm (+/-    |
|                     |                      |     hours and        |
|                     |                      |     minutes.         |
+---------------------+----------------------+----------------------+
| CRTENDTIME          | -   0 (zero)         | The File Create Time |
|                     |                      | must occur before    |
|                     | -   +/- 99999.99     | this End Time value  |
|                     |     hours, where .99 | (converted to a time |
|                     |     refers to        | stamp relative to    |
|                     |     hundredths of an | midnight of the      |
|                     |     hour: 0.25 = 15  | Reference Date).     |
|                     |     minutes.         |                      |
|                     |                      | -   Zero means to    |
|                     |                      |     ignore this      |
|                     |                      |     parameter.       |
|                     |                      |                      |
|                     |                      | -   A negative value |
|                     |                      |     indicates the    |
|                     |                      |     number of hours  |
|                     |                      |     before midnight. |
|                     |                      |                      |
|                     |                      | -   A positive value |
|                     |                      |     indicates the    |
|                     |                      |     number of hours  |
|                     |                      |     after midnight.  |
|                     |                      |                      |
|                     |                      | -   Batch Jobs can   |
|                     |                      |     use the OpCon    |
|                     |                      |     job\'s Variables |
|                     |                      |     Tab to load      |
|                     |                      |     \$\@CRTENDTIME   |
|                     |                      |     with a format of |
|                     |                      |     hhhhh:mm (+/-    |
|                     |                      |     hours and        |
|                     |                      |     minutes.         |
+---------------------+----------------------+----------------------+
| CRTREFDATE          | -   \*DEFAULT        | File Create Time     |
|                     |                      | Reference Date for   |
|                     | -   \*SCHED          | midnight: Designates |
|                     |                      | what date is used    |
|                     | -   \*JOB            | for midnight.        |
|                     |                      | Midnight is          |
|                     | -   CCYYMMDD         | considered to be at  |
|                     |                      | the start of the     |
|                     | -   {dvtoken}        | specified date.      |
|                     |                      |                      |
|                     |                      | -   For OpCon jobs,  |
|                     |                      |     \*DEFAULT refers |
|                     |                      |     to the Schedule  |
|                     |                      |     Date of the job. |
|                     |                      |                      |
|                     |                      | -   Outside of OpCon |
|                     |                      |     (job type is T   |
|                     |                      |     or A), \*DEFAULT |
|                     |                      |     refers to the    |
|                     |                      |     current IBM i    |
|                     |                      |     system date.     |
|                     |                      |                      |
|                     |                      | -   \*SCHED = use    |
|                     |                      |     the Schedule     |
|                     |                      |     Date (only valid |
|                     |                      |     for OpCon jobs). |
|                     |                      |                      |
|                     |                      | -   \*JOB = use the  |
|                     |                      |     IBM i Job Date.  |
|                     |                      |                      |
|                     |                      | -   CCYYMMDD = an    |
|                     |                      |     actual date may  |
|                     |                      |     be specified,    |
|                     |                      |     e.g., 20160601 = |
|                     |                      |     June 1, 2016.    |
|                     |                      |                      |
|                     |                      | -   An LSAM Dynamic  |
|                     |                      |     Variable (with   |
|                     |                      |     curly braces)    |
|                     |                      |     can be           |
|                     |                      |     translated at    |
|                     |                      |     run time to      |
|                     |                      |     provide an       |
|                     |                      |     actual date in   |
|                     |                      |     the CCYYMMDD     |
|                     |                      |     format.          |
|                     |                      |                      |
|                     |                      | -   For EM File      |
|                     |                      |     Arrival jobs,    |
|                     |                      |     use the job      |
|                     |                      |     master Variables |
|                     |                      |     tab to put the   |
|                     |                      |     desired Value    |
|                     |                      |     into the         |
|                     |                      |     variable         |
|                     |                      |     \$\@CRTREFDATE.  |
+---------------------+----------------------+----------------------+
| JOBENDTIME          | -   0 (zero)         | The Job End Time,    |
|                     |                      | when specified,      |
|                     | -   +/- 99999.99     | replaces using the   |
|                     |     hours, where .99 | File Create End Time |
|                     |     refers to        | as the default last  |
|                     |     hundredths of an | time that a file     |
|                     |     hour: 0.25 = 15  | check can occur.     |
|                     |     minutes.         | (The +/- value is    |
|                     |                      | converted to a time  |
|                     |                      | stamp relative to    |
|                     |                      | midnight of the Job  |
|                     |                      | Reference Date).     |
|                     |                      |                      |
|                     |                      | -   Zero means to    |
|                     |                      |     ignore this      |
|                     |                      |     parameter.       |
|                     |                      |                      |
|                     |                      | -   A negative value |
|                     |                      |     indicates the    |
|                     |                      |     number of hours  |
|                     |                      |     before midnight. |
|                     |                      |                      |
|                     |                      | A positive value     |
|                     |                      | indicates the number |
|                     |                      | of hours after       |
|                     |                      | midnight.            |
|                     |                      |                      |
|                     |                      |                      |
|                     |                      |                      |
|                     |                      | EM File Arrival or   |
|                     |                      | Batch Jobs can use   |
|                     |                      | the OpCon job\'s     |
|                     |                      | Variables Tab to     |
|                     |                      | load \$\@JOBENDTIME  |
|                     |                      | with a format of     |
|                     |                      | hhhhh:mm (+/- hours  |
|                     |                      | and minutes or using |
|                     |                      | a decimal format     |
|                     |                      | such as +14.5 = 14   |
|                     |                      | hours and 30 minutes |
|                     |                      | after Midnight).     |
+---------------------+----------------------+----------------------+
| JOBREFDATE          | -   \*DEFAULT        | Job End Time         |
|                     |                      | Reference Date for   |
|                     | -   \*SCHED          | midnight: Designates |
|                     |                      | what date is used    |
|                     | -   \*JOB            | for midnight.        |
|                     |                      | Midnight is          |
|                     | -   CCYYMMDD         | considered to be at  |
|                     |                      | the start of the     |
|                     | -   {dvtoken}        | specified date.      |
|                     |                      |                      |
|                     |                      | -   For OpCon jobs,  |
|                     |                      |     \*DEFAULT refers |
|                     |                      |     to the Schedule  |
|                     |                      |     Date of the job. |
|                     |                      |                      |
|                     |                      | -   Outside of OpCon |
|                     |                      |     (job type is T   |
|                     |                      |     or A), \*DEFAULT |
|                     |                      |     refers to the    |
|                     |                      |     current IBM i    |
|                     |                      |     system date.     |
|                     |                      |                      |
|                     |                      | -   \*SCHED = use    |
|                     |                      |     the Schedule     |
|                     |                      |     Date (only valid |
|                     |                      |     for OpCon jobs). |
|                     |                      |                      |
|                     |                      | -   \*JOB = use the  |
|                     |                      |     IBM i Job Date.  |
|                     |                      |                      |
|                     |                      | -   CCYYMMDD = an    |
|                     |                      |     actual date may  |
|                     |                      |     be specified,    |
|                     |                      |     e.g., 20160601 = |
|                     |                      |     June 1, 2016.    |
|                     |                      |                      |
|                     |                      | An LSAM Dynamic      |
|                     |                      | Variable (with curly |
|                     |                      | braces) can be       |
|                     |                      | translated at run    |
|                     |                      | time to provide an   |
|                     |                      | actual date in the   |
|                     |                      | CCYYMMDD format.     |
|                     |                      |                      |
|                     |                      |                      |
|                     |                      |                      |
|                     |                      | For EM File Arrival  |
|                     |                      | jobs, use the job    |
|                     |                      | master Variables tab |
|                     |                      | to put the desired   |
|                     |                      | Value into the       |
|                     |                      | variable             |
|                     |                      | \$\@JOBREFDATE.      |
+---------------------+----------------------+----------------------+
| RECHKFREQ           | -   0 (zero)         | Frequency to         |
|                     |                      | re-check for file    |
|                     | -   999 seconds      | existence:           |
|                     |                      |                      |
|                     |                      | -   Zero means to    |
|                     |                      |     check once for a |
|                     |                      |     matching file    |
|                     |                      |     name (optionally |
|                     |                      |     qualifying it by |
|                     |                      |     the Start/End    |
|                     |                      |     Create time).    |
|                     |                      |                      |
|                     |                      | -   Greater than     |
|                     |                      |     zero indicates   |
|                     |                      |     the number of    |
|                     |                      |     seconds to wait  |
|                     |                      |     between repeated |
|                     |                      |     checks for file  |
|                     |                      |     existence. Check |
|                     |                      |     looping will not |
|                     |                      |     start until at   |
|                     |                      |     or after the     |
|                     |                      |     Start time, and  |
|                     |                      |     it will end once |
|                     |                      |     the End time has |
|                     |                      |     been reached.    |
|                     |                      |                      |
|                     |                      | -   The Job End time |
|                     |                      |     is either        |
|                     |                      |     specified by its |
|                     |                      |     own parameter,   |
|                     |                      |     or it will       |
|                     |                      |     default to the   |
|                     |                      |     File Create End  |
|                     |                      |     Time. If both    |
|                     |                      |     are zero, then a |
|                     |                      |     job with a       |
|                     |                      |     non-zero         |
|                     |                      |     RECHKFREQ will   |
|                     |                      |     continue running |
|                     |                      |     for 24 hours     |
|                     |                      |     from the IBM i   |
|                     |                      |     system job start |
|                     |                      |     time.            |
+---------------------+----------------------+----------------------+
| STABLEDUR           | -   0 (zero)         | File size stable for |
|                     |                      | this duration in     |
|                     | -   999 seconds      | seconds: Specify the |
|                     |                      | number of seconds    |
|                     |                      | that the file size   |
|                     |                      | (number of records)  |
|                     |                      | must remain the      |
|                     |                      | same. The command    |
|                     |                      | will repeat the      |
|                     |                      | check of the number  |
|                     |                      | of records after     |
|                     |                      | waiting for this     |
|                     |                      | number of seconds,   |
|                     |                      | until a second check |
|                     |                      | produces the same    |
|                     |                      | number of records as |
|                     |                      | the previous check.  |
|                     |                      |                      |
|                     |                      |                      |
|                     |                      |                      |
|                     |                      | If the number of     |
|                     |                      | records remains      |
|                     |                      | zero, then the       |
|                     |                      | FAILIFZERO parameter |
|                     |                      | controls the final   |
|                     |                      | command status.      |
+---------------------+----------------------+----------------------+
| OPCONJOB            | -   O                | -   O or Y (Yes) =   |
|                     |                      |     OpCon started    |
|                     | -   Y                |     the job and the  |
|                     |                      |     OpCon server can |
|                     | -   N                |     receive Property |
|                     |                      |     value settings.  |
|                     | -   T                |                      |
|                     |                      | -   T or N (No) =    |
|                     | -   A                |     Test or local    |
|                     |                      |     IBM i job: No    |
|                     |                      |     attempt is made  |
|                     |                      |     to send values   |
|                     |                      |     to an OpCon      |
|                     |                      |     server. Use this |
|                     |                      |     mode when the    |
|                     |                      |     CHKFILE command  |
|                     |                      |     is executed from |
|                     |                      |     an LSAM          |
|                     |                      |     Multi-Step Job   |
|                     |                      |     script or from   |
|                     |                      |     LSAM Response    |
|                     |                      |     Rules.           |
|                     |                      |                      |
|                     |                      | -   A = a French     |
|                     |                      |     indication for   |
|                     |                      |     test mode, same  |
|                     |                      |     as \'T\'.        |
+---------------------+----------------------+----------------------+
| FAILONERR           | -   Y                | Report Job Status as |
|                     |                      | failed when file     |
|                     | -   N                | check fails:         |
|                     |                      |                      |
|                     | -   T                | -   Y = Yes, the     |
|                     |                      |     command will     |
|                     |                      |     report a failed  |
|                     |                      |     job status if a  |
|                     |                      |     file is not      |
|                     |                      |     found, or the    |
|                     |                      |     file Create Time |
|                     |                      |     does not fall    |
|                     |                      |     within the       |
|                     |                      |     Start/End times. |
|                     |                      |                      |
|                     |                      | -   N = No, the      |
|                     |                      |     command will     |
|                     |                      |     always report a  |
|                     |                      |     normal job       |
|                     |                      |     completion       |
|                     |                      |     status even when |
|                     |                      |     no matching file |
|                     |                      |     is found. When   |
|                     |                      |     using N, the     |
|                     |                      |     final command    |
|                     |                      |     status should be |
|                     |                      |     stored in an     |
|                     |                      |     LSAM Dynamic     |
|                     |                      |     Variable and/or  |
|                     |                      |     an OpCon         |
|                     |                      |     Property so that |
|                     |                      |     it can be        |
|                     |                      |     tested.          |
|                     |                      |                      |
|                     |                      | -   T = File not     |
|                     |                      |     found by end     |
|                     |                      |     time, but ignore |
|                     |                      |     and end          |
|                     |                      |     normally.        |
|                     |                      |                      |
|                     |                      | -   If the file      |
|                     |                      |     check command is |
|                     |                      |     reporting an     |
|                     |                      |     internal program |
|                     |                      |     failure, then    |
|                     |                      |     this override    |
|                     |                      |     flag is ignored  |
|                     |                      |     and the command  |
|                     |                      |     will always      |
|                     |                      |     report the       |
|                     |                      |     failure.         |
|                     |                      |                      |
|                     |                      | (Refer also the      |
|                     |                      | discussion about     |
|                     |                      | using LSAM           |
|                     |                      | Feedback.)           |
+---------------------+----------------------+----------------------+
| ENV                 | \*DEFAULT            | Used when the        |
|                     |                      | CHKFILE command is   |
|                     | Actual LSAM          | executed by itself   |
|                     | environment name     | (not by the OpCon    |
|                     |                      | File Arrival job),   |
|                     |                      | to set the LSAM      |
|                     |                      | library list         |
|                     |                      | according to the     |
|                     |                      | LSAM Environment     |
|                     |                      | name.                |
+---------------------+----------------------+----------------------+
| GPL                 | \*DEFAULT            | Used when the        |
|                     |                      | CHKFILE command is   |
|                     | Actual               | executed by itself   |
|                     | SMAGPL library name  | (not by the OpCon    |
|                     |                      | File Arrival job),   |
|                     |                      | to identify the      |
|                     |                      | SMAGPL library where |
|                     |                      | the LSAM Environment |
|                     |                      | library list can be  |
|                     |                      | found.               |
+---------------------+----------------------+----------------------+
| KEEPWRKLIB          | N or 0 = No          | This command uses a  |
|                     |                      | permanent DB2 work   |
| (Keep work library) | Y or 1 = Yes         | library instead of   |
|                     |                      | QTEMP to store the   |
|                     |                      | IFS directory search |
|                     |                      | results. The         |
|                     |                      | temporary work       |
|                     |                      | library is deleted   |
|                     |                      | at the end of the    |
|                     |                      | command execution,   |
|                     |                      | unless the command   |
|                     |                      | fails (and failures  |
|                     |                      | are not ignored) or  |
|                     |                      | unless this          |
|                     |                      | parameter tells the  |
|                     |                      | command to Keep the  |
|                     |                      | Work Library.        |
+---------------------+----------------------+----------------------+

: CHKIFSFIL Command Parameter Values

#### Interaction of Command Parameters

The CHKFILE and CHKIFSFIL commands share several of the same parameters,
so the performance of both commands are very similar. Differences
between the two commands are noted where applicable.

 

There are many possible combinations of parameters that may be used or
ignored, so some combinations might produce unique results that are not
anticipated by this document.

##### Order of Command Parameter Response

Both commands process their parameters in the following order.

1.  The commands initialize any specified OpCon Properties or LSAM
    Dynamic Variables to initial values that represent no result:

    a.  File Name is set to \*NONE.

    b.  File size or number of records is set to 0 (zero).

    c.  Failure Code (command completion code) is set to CKF0000 (the
        message ID which implies that no completion code has been
        received).

          -------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------
          ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [Code CKF0010 is the normal completion code for a valid file found.]
          -------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------

2.  Check if a file name exists in the specified library or directory
    path that matches the specified exact or generic file name.

3.  Verify the selected file was created within the Start and End times
    (if either is not zero).

    a.  For generic file name searches, if one matching file name does
        not have a qualifying File Create time, then the list of
        matching names will be searched in alphabetic order until
        another file with a matching names does have a qualifying File
        Create time.

4.  When the re-check frequency is not zero, the command will repeat its
    checks for file existence and create start/end times until a match
    is found, or until the Job End time is passed.

    a.  When the re-check frequency is left at zero, then the File
        Arrival job performs a one-time File Check (which was the
        original mode of these IBM i CHK\* commands, so it is still
        supported by leaving the re-check frequency set to its default
        value of zero).

    b.  The Job End Time is either specified in its own parameter, or if
        that value is zero, then the File Create End Time is used also
        for the Job End Time. If both time values are zero, then the Job
        End Time will be assumed to be 24 hours from the IBM i system
        job start time.

5.  As soon as a qualified file is identified, the file name value is
    stored in any requested OpCon Property or LSAM Dynamic Variable.

    a.  The initial size or number of records is also set in the
        Property or Dynamic Variable. The size/number of records will be
        updated if the stable duration is being checked and a new file
        size or record count is found.

6.  After a qualified file is found, the optional checks for file locks
    or file authority/permissions are performed on that file.

7.  The final command status is stored in any requested OpCon Property
    or LSAM Dynamic Variable.

8.  Just before the command ends, it generates data value communication
    for OpCon jobs:

    a.  The \$ARRIVED FILE NAME system property is set (using the OpCon
        Field Code 64), as the very first step of closing out the job.
        Sending this value before any other data transmissions, such as
        the OpCon Properties named here, usually allows enough time for
        OpCon to store and process the \$ARRIVED FILE NAME into its
        parts (as supported by OpCon version 17.1 and newer), so that
        these OpCon system properties could be utilized in the Events
        processed at the end of the same OpCon job, if desired.

    b.  The IBM i LSAM utility command LFEEDBACK is executed as
        necessary, sending a text message that includes the final
        command status code to OpCon, and possibly also a zero data
        message that includes code CKF0005. All LSAM Feedback from these
        commands is type 5802 = user-defined LSAM Feedback from the
        LFEEDBACK command. Response to LSAM Feedback is defined under
        the Events tab of an OpCon job.

          -------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------
          ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **HINT:** [Use an LSAM Feedback match value for specific codes like this: %CKF0006% for example.]
          -------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------

    c.  One or more Detailed Job Messages are posted to the OpCon Job
        Information (accessed under the \"Configuration\" tab after Job
        Information is selected from the OpCon Job context (right mouse
        click) menu, or by simply using a left mouse double click on the
        job icon).

##### Rules for Command Parameter Interaction

In addition to the order of parameter processing, above, the following
rules govern how the file check commands perform, based on whether the
File Create Start and/or End Times are specified (not zero), and/or a
Job End Time is specified.

 

When a job ends abnormally or fails, an appropriate message ID is
reported as the command completion status to suggest the cause of the
failure. Whether an OpCon Job shows as failed for not finding a
qualified file will depend on the FAILONERR override parameter, and/or
on the FAILIFZERO parameter.

 

Depending on the FAILONERR parameter setting, the OpCon job can be
marked as completed normally even when there is an error, but the job
completion status (termination code) will show the actual message ID
reported by the command. The description of unique job failure codes may
appear among the OpCon Detailed Job Messages (at: Job Information -\>
Configuration -\> Detailed Job Messages). The job\'s response to the
actual completion code can be managed by the Events tab of the OpCon
job, using either the Exit Description or the LSAM Feedback.

 

Similarly, when the commands are executed outside of OpCon control, the
command execution program will either appear to fail (by using the RPG
program technique that forces a program failure condition) or it will
appear to end normally (if FAILONERR = No), even if the command final
status code indicates no file was found or a found file did not qualify.

 

The FAILONERR parameter supports one unique value that changes its
effect on the job. A value of \"T\" means that when no file is found by
the End Job Time, the job should still end normally (that is, the user
does not care if no file is found on any given day). However, any other
error would cause the job to end abnormally, since the FAILONERR
parameter value is not overriding all errors in this case. When using
the value FAILONERR(T) it becomes important to test the job completion
code, in order to determine if a normally ending job actually found a
file or whether completion code CKF0009 was sent (where CKF0009 is the
special error code that indicates no file was found as the End Job Time
expired).

 

The FAILIFZERO parameter typically has the opposite effect of the
FAILONERR parameter. That is, when a qualified file is found, the user
can decide if the File Arrival job should report a failure when the file
contains zero records or zero bytes.

 

Following are some additional details about how the File Arrival
processing may behave.

1.  When the job starts, the watcher program looks for a file that
    matches the file name, or a generic file name. If a file is found
    that has a Create time stamp that falls within the Start/End times,
    then the job ends normally (unless FAILIFZERO forces it to end
    abnormally).

2.  When a generic name pattern was provided, the watcher program
    searches through the list of matching names. For each matching name,
    it checks if the file Create time stamp falls within the Start/End
    times. The first matching name that was created within the Start/End
    times causes the job to end normally (and that file name is provided
    in the optional OpCon Property and/or LSAM Dynamic Variable, as well
    as being reported to the \$ARRIVED FILE NAME for OpCon jobs).

3.  When no matching file name was created within the Start/End times, a
    File Arrival job with a non-zero RECHKFREQ value will enter a
    monitor routine that will continue to check for a new file that is
    created within the Start/End time.

    a.  The \"Re-check frequency\" can be left set to zero. A zero value
        will mean that a matching file name must be found on the first
        check, and any matching file name must have a Create time stamp
        that falls within the Start/End times (assuming they are not
        zeros). If no file is found with a matching name, or no matching
        name has a valid Create time stamp, then the job will end as
        failed (unless the FAILONERR parameter forces a normal job end),
        and it will not continue to check for the file until the End
        time is reached. This zero re-check frequency option allows for
        a simple, one-time file check that still uses the Start/End
        times, but only for a one-time check with an immediate result.

4.  If the job started before the specified Start time, it will not
    start watching for a new file until the current time is equal to, or
    greater than the Start time. Instead, the job will be placed into a
    time-delay status that expires as the Start time is reached within
    the processing IBM i operating system.

5.  When the watcher job discovers that the current time is equal to, or
    greater than the Job End time, it stops watching for any files, and
    if no file was found, the job ends as failed. In this case, the
    failure code will be the special code of CKF0009, rather than the
    other codes of CKF0002 (file not found) or CKF0006 (no file matches
    Create Start/End times).

6.  There is a special case when the file Start and End times are both
    in the past. If the re-check frequency is left set to zero, then
    only one check will be performed for the file. But if the re-check
    frequency is greater than zero, the File Arrival job will continue
    to wait for a file to arrive at the specified directory or library
    location until the Job End Time is reached (see above for rules
    about how a Job End Time is ALWAYS defined, even if it defaults to
    24 hours after the IBM i system job start time).

     

    The use case for this type of job would be that a file was actually
    created in a different location, but it was not moved to the watched
    location until some depending-on prior job has completed its task.
    Then the expectation is that the file will eventually be moved into
    the watched location and immediately found by the waiting File
    Arrival job.

     

    This use case justifies the distinction between the File Create End
    Time and the (optionally) separate, specific Job End Time. Creating
    a File Arrival job with this capability could be especially useful
    during recovery processing after a Disaster Recovery restarts
    processing after a much-delayed system time. For this type of
    special case, also consider how the CRTREFDATE and JOBREFDATE
    parameters will be set to control which date will be used as the
    Midnight reference date.

##### Start and End Time Calculation versus Midnight

The File Create Start and End times define a window of time within which
the designate file must have been created, or have arrived in the target
directory.

 

The Start and End times may be left at zero, in which case they are
ignored. In this case, the file must exist at the moment when the CHK\*
command is executed, otherwise either command will return a CKF0002 code
= file not found.

 

When the Start or End times are used, the value that must be provided
for these parameters is a decimal number that refers to the hours either
before or after midnight.

 

\"Midnight\" refers to the very start of the day designated by the
midnight date. Therefore, if today\'s date is derived as Midnight, then
a value of (15) or (+15) will refer to 3:00 PM today. A value of (-15)
will refer to 9:00 AM yesterday. Similarly, a value of 14.5 will refer
to 2:30 today (that is, 14 hours and 30 minutes after Midnight).

 

  -------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **HINT:** [For OpCon jobs, whether for the EM File Arrival job or a simple IBM i Batch Job, the Variables tab can optionally support a format of +/- hhhhh:mm, where +14:30 would mean 14 hours and 30 minutes after Midnight. It is also possible to specify decimal values (as above) in the Variables tab Values column, but this is not necessary since the times can be specified with decimal values in the Batch Job command line, or by using the easily managed user interface of the newer EM File Arrival job. For OpCon jobs when the EM File Arrival job is being used, the only way to specify the CRTREFDATE is to use the Variables tab and specify one of the valid date values in the Value column for the variable named \$\@CRTREFDATE.]
  -------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

The CRTREFDATE parameter can be used to control which date is used as
the Midnight date. Please refer to the command parameters Values tables
above for the various ways that midnight can be designated, or what it
means when this parameter is not specified and will use its \*DEFAULT
value. Specific values that are supported include \*SCHED (= the
Schedule Date for an OpCon job) and \*JOB (= the IBM i Job Date), in
addition to either an actual date specified in the format \'CCYYMMDD\'
(including the single quotes). It is also possible to put an LSAM
Dynamic Variable token into this command parameter (surrounded by single
quotes).

 

  -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **HINT:** [[For OpCon jobs when the EM File Arrival job is being used, the only way to specify the CRTREFDATE is to use the Variables tab and specify one of the valid date values in the Value column for the variable named \$\@CRTREFDATE.]]
  -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

The concept of using decimal numbers to designate hours is required to
keep these IBM i commands compatible with the previously established
OpCon Windows \"File Arrival\" Job Action type, because this is how
OpCon sends the time values to an Agent (LSAM) for processing: as
positive or negative values where up to 5 whole numbers can be used to
specify the number of hours, and the minutes are optionally specified by
up to 2 decimal places (representing 10ths or 100ths of an hour).

 

Accordingly, a value of 1.25 refers to one hour and fifteen minutes.
Mathematically, the decimal portion of the number is multiplied against
a total of 60 minutes and then rounded (not truncated) to the nearest
minute.

 

Other rules about how the Start and End times control the file checking
commands are describe in the previous two sections of this document.

 

The JOBENDTIME and JOBREFDATE are processed in exactly the same manner
as the File Create Start/End Times. But for EM File Arrival jobs, these
two parameters can only be specified by providing Values under the
Variables tab for the two parameter names \$\@JOBENDTIME and
\$\@JOBREFDATE.

 

  -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **IMPORTANT:** [Within the IBM i system, if a file was created during Standard Time, but then the File Arrival job executes during Daylight Saving Time, the green screen display of the Creation Date/Time will differ by one hour from the Create time supplied by the API services utilized by the File Arrival job. (The same holds true for the opposite case, that the file was created during Daylight Saving Time but the File Arrival job executes during Standard Time.) In other words, the API services compensate for the time differences, but the user view from the green screen commands can confuse the user about what would be the correct time to specify for a File Create Start/End Time value.]
  -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

##### Using the FAILIFZERO Parameter and CKF0005 LSAM Feedback

Both the CHKIFSFIL and CHKIFSFIL commands support a parameter
FAILIFZERO, which works the same for stream files in the IFS file
systems, as does for the CHKFILE command. CHKIFSFIL reports zero bytes
of data content in stream files (outside of the DB2 database), while
CHKFILE reports zero records in DB2 tables (files).

 

The FAILIFZERO parameter is set just before the command job ends, if the
byte or record count is zero. A value of (\*YES) for this keyword tells
the program to force a failed status, which results in an OpCon job
being set to failed and showing a final status code of CKF0005. A value
of (\*NO) allows the command job to end normally (as long as no other
circumstances are forcing a failure), even if the byte or record count
is zeros.

 

Both commands will always report the message ID \'CKF0005\' whenever
zero bytes or zero records are detected (as the command ends). This
reference code will be sent to both the OpCon Detailed Job Messages and
also as LSAM Feedback.

 

Since the CKF0005 code is sent as LSAM Feedback in all cases when zero
bytes or records are found, both commands can adapt to any automation
objective with regard to zero data. Even if it is desired that this type
of File Arrival job for IBM i should end normally, OpCon can still be
configured with an automatic response to zero data by adding an Event
for the LSAM Feedback.

 

LSAM Feedback response is defined under the Events tab of an OpCon job.
Click the +Add button and then select the \"LSAM Feedback\" radio
button. In the Trigger Details panel, click the arrow to drop down the
list of available LSAM Feedback types. Click on \"User defined text from
LFEEDBACK command\". In the String to Match box, type: %CKF0005% then
click Next. Complete the Event command selection and configuration, then
click Finish to store the new Event rule with the job master record.

 

LSAM Feedback for the CKF0005 code can be configured even if the
FAILIFZERO command parameter is set to (\*YES). However, the strategy
for which Events to trigger upon job failure must be compared to the
Event that might be selected for the LSAM Feedback. In a simple case, it
is probably not necessary to configure LSAM Feedback for CKF0005 when
the job is using FAILIFZERO(\*YES), because the failed job status of
CKF0005 can also be tested as an Event, among other possible causes of
failure (including code CKF0002 = file not found, or not found within
Start/End times).

#### Command Feedback Methods

The CHKFILE and CHKIFSFIL commands share most of the IBM i message IDs
and job feedback functions.

##### Job Completion Codes

The command completion status is reflected by one of the following IBM i
message IDs. Certain message IDs have a common special purpose:

-   CKF0000 = The commands initialize any OpCon Property or LSAM Dynamic
    Variable with this value, which indicates no result has yet been
    reported.
-   **CKF0010 = The command reports normal completion: a matching file
    name was found with a qualifying create time and there are no lock
    or authority conflicts.**
-   CKF0099 = Unexpected, this type of error will always cause the
    command to be reported as failed, regardless of the FAILONERR
    override setting. When a command reports this completion code, it
    may be necessary to contact SMA Support for assistance to prevent
    this type of command failure in the future.

  Message ID    Message Text
  ------------- ---------------------------------------------------------------------------
  CKF0000       CHKFILE/CHKIFSFIL has initialized the command completion code = no result
  CKF0001       CHKFILE/CHKIFSFIL file name not found
  CKF0002       CHKFILE/CHKIFSFIL library or path not found
  CKF0003       CHKFILE detected file lock
  CKF0004       CHKFILE data file member not found
  CKF0005       CHKFILE/CHKIFSFIL found zero records or zero bytes
  CKF0006       CHKFILE/CHKIFSFIL file create time outside of parameters
  CKF0007       CHKFILE/CHKLFSLST user not authorized to library, path or file
  CKF0008       CHKFILE list object API reports object is damaged
  CKF0009       CHKFILE/CHKIFSFIL file not found by Create End Time (re: FAILONERR=T)
  **CKF0010**   **CHKFILE/CHKIFSFIL ended normally**
  CKF0099       CHKFILE/CHKIFSFIL failed due to database or program

  : CHKFILE/CHKIFSFIL command completion codes

 

The command completion codes are reported in four ways:

-   They will be stored in an OpCon Property and/or an LSAM Dynamic
    Variable, if these are specified in the command parameters.

-   The OpCon Job Completion code shows the command completion code and
    the name of the command that reported it, such as: CKF0010:CHKFILE
    or CKF0006:CHKIFSFIL.

-   The commands send Detailed Job Messages to OpCon, where they can be
    viewed under the \"Configuration\" tab that appears after using the
    right mouse click context menu to choose Job Information. (Job
    Information can also be accessed by using a left mouse double click
    on the job icon.)

-   LSAM Feedback: See the following discussion for ways to configure
    OpCon Job Events in response to varying LSAM Feedback content.

In newer versions of OpCon (such as 16.x and newer), the job completion
code can be tested and an Event command generated in response, using the
OpCon job master Event types of Exit Description or Job Completion
Complex Expression.

##### IBM i Job Log Messages

Whether using a local IBM i automation tool, or an OpCon job, the IBM i
job log from the job where these commands are executed, will typically
contain the job completion codes listed above. In addition, more
information about job failures will be provided by IBM i messages and by
the following LSAM File Arrival message IDs that deliver informational
text:

  Message ID   Message Text
  ------------ -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  CKF0996      CHKFILE/CHKIFSFIL both use this message ID to add commonly reported diagnostic information to the job log.
  CKF0997      CHKIFSFIL uses this message ID to document the type of forced program error used to make the job end abnormally (as when a file is not found). It reports which RPG Halt Indicator was used: H1 = command parameters require the job to fail; H2 = the program was aborted due to an unexpected error condition. Halt indicator H2 may require assistance from SMA Support.
  CKF0998      CHKFILE uses this message ID to document the type of forced program error used to make the job end abnormally (as when a file is not found). It reports which RPG Halt Indicator was used: H1 = command parameters require the job to fail; H2 = the program was aborted due to an unexpected error condition. Halt indicator H2 may require assistance from SMA Support.

  : CHKFILE/CHKIFSFIL informational messages

 

Remember to use the \"View Output\" function for OpCon jobs as a
convenient way to quickly access the IBM i job log report for
discovering these additional information messages.

##### LSAM Feedback

The CHKFILE and CHKIFSFIL commands always send LSAM Feedback to OpCon,
when the job was started by OpCon. (LSAM Feedback cannot be processed
outside of the OpCon server, so it is not generated when the OPCONJOB
flag is set to \'N\' = No.)

 

The LSAM Feedback generated by these commands will always be type 5802 =
\"User-defined feedback from the LFEEDBACK command.\" (This is one of
the LSAM Feedback types that appears on the drop-down list for IBM i
jobs.) This makes it possible to define one or more Events to be
triggered, based on the varying content of the LSAM feedback message. A
different event could be trigger for each possible match to a completion
code if the LSAM Feedback search rule is set to look for %CKF0006% (or
any of the other message IDs listed above).

 

For more information, see also the discussion above under Interaction of
Command Parameters: Using the FAILIFZERO command parameter and CKF0005
LSAM Feedback.

##### LSAM Log File

The LSAM file check commands log exceptional events into the IBM i LSAM
general purpose log file named LSALOGF30. This log file can be viewed
using the LSAM sub-menu 6, option 5, log viewer 4. This menu option
(currently) uses the IBM i command DSPPFM to display the log entries.
Entries of type DV: or CF: are logged by the check file commands.

-   **DV**: entries report when any LSAM Dynamic Variable tokens were
    found and then replaced.
-   **CF**: entries report unexpected program failures, such as when an
    IBM i API (application program interface) routine has returned an
    unexpected result. These CF: entries help to explain why a check
    file command has reported a failure completion code of CKF0099.

#### IBM i LSAM Dynamic Variable Support

##### Dynamic Variables Receiving Feedback from the Commands

As identified in the command parameters tables, above, some values
detected or determined by the check file commands can be stored into
Dynamic Variables. When these parameter values are specified, the
dynamic variable names must not be enclosed within the curly braces { }
that are used to designate a dynamic variable token. Just name the
dynamic variable that should receive the value.

 

Dynamic variable names specified in these store-to parameters do not
have to be defined in advance, since the LSAM command SETDYNVAR that the
commands use can create new dynamic variable table records at run time.

 

When storing a file size or a file record count, it is possible to let
the dynamic variable be created at run time. However, if the numeric
value stored for these counts should be processed later as a numeric
dynamic variable, then the dynamic variable table records must be
created in advance in order to specify the numeric field size and any
value edits that should be performed later when a dynamic variable token
will be replaced by the stored numeric value.

##### Using Dynamic Variable Tokens to Supply Command Parameter Values

Dynamic Variable {tokens} can be used to supply the value for some of
the command parameter keywords. These tokens are equally effective
whether they are used in the Call command line of an IBM i Batch Job in
OpCon, or in a stand-alone version of either command that may be used
separately from OpCon, such as in an LSAM Multi-Step Job script or in
the LSAM Response Rule command lines.

#### OpCon Property Support

##### OpCon Properties Receiving Feedback from the Commands

Similar to the Property setting fields of a Windows File Arrival job
sub-type (being added to the most recent OpCon versions which may not
yet be released, depending on the date when this document is being
read), the IBM i file watcher commands can send critical information
about files back to the OpCon server for use in other jobs, either
confined to the same OpCon schedule (using schedule instance properties)
or possibly in other OpCon schedules (as when Global Properties are
specified).

 

Since the LSAM utility commands send property values to OpCon using
OpCon External Event commands, then it is not possible to send job
instance or schedule instance property values up to the OpCon server
using simple syntax such as JI.PROPERTY. Instead, the property must be a
fully-qualified property name, using this format:

SI.\<PropertyName\>.\<ScheduleDate\>.\<ScheduleName\>

 

In the example above, the \< \> brackets and their contents must all be
replaced by actual values. However, since values may not be known until
run time, some of these values can be replaced by OpCon keywords, such
as using CURRENT or LATEST for the Schedule Date.

 

It may also be possible to place an IBM i LSAM dynamic variable {token}
into any one of the parameter positions. To make this work, use the
Variables tab of the OpCon IBM i job master record to push the current
Schedule Name or Schedule Date into the desired LSAM dynamic variable.
This will be managed just before the job starts, so the values will
become instantly available to the actual job as it executes.

##### Using OpCon Property Tokens to Supply Command Parameter Values

The EM File Arrival job master definition panel supports specifying an
OpCon Property token in specially designated boxes for some of the
command operations. Property names can easily be selected by using
CTRL+T while the cursor is in one of the Property Name boxes. Remember
to also set the check box when these Property names will be specified.

 

But when the LSAM commands are used in an OpCon Job Master record for a
simple IBM i Batch Job, these tokens can only be used in the Call
command line. If the Property Names are defined in advance in the OpCon
Global Properties table, then using CTRL+T makes it easy to insert
properly formatted tokens into the command parameter keyword locations.

 

Here are examples of an OpCon Property token being used to supply the
actual file name that will be checked:

CHKIFSFIL  PATHNAME(\'/dir/subdir/\[\[CurrentFileName\]\]\') OPCONJOB(O) 
CHKFILE    FILE(QGPL/\[\[SI.SchedFileName\]\]) OPCONJOB(O) 
 

In the examples above, the property names shown are not predefined OpCon
system properties, but only supposed user-defined property names that
would have to be defined in the OpCon Properties master file, and then
loaded with a valid value by some prior job.
:::

 


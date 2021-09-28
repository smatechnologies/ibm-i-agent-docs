---
sidebar_label: 'Commands and APIs'
---

# LSAM Commands, APIs

The IBM i LSAM supports many of its functions and actions with IBM i commands that may be used interactively or included in user
programs. These commands become an application program interface (API)
to OpCon/xps and to the LSAM itself, enabling very tight integration
between clients' applications and the OpCon/xps strategy for
synchronizing all enterprise operations. In most cases, the commands can
be run either interactively or in batch mode.

:::warning
Many of the LSAM Commands may require that the IBM i job's library list be set to reference either the default or any one of multiple LSAM environments. Sometimes the requirements of a command can be set by careful configuration of the library attributes associated with a user-written command. In cases where more complex programming is implemented, consider using the SMASETLIBL command that is documented below. Note that this command has a parameter that can cause it to run in silent mode, so that no unexpected messages are generated within the user-written program.
:::

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
|*Refer to      | OpCon jobs)*|                |                |
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
|                |                |                | job's library |
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
|                |                |                | command's     |
|                |                |                | POSITION       |
|                |                |                | keyword.       |
+----------------+----------------+----------------+----------------+
|                | SMARMVLIBL     | Remove LSAM    | Removes the    |
|                |                | library list   | library names  |
|                |                | from existing  | of the         |
|                |                | job library    | specified LSAM |
|                |                | list.          | environment    |
|                |                |                | from the       |
|                |                |                | current job's |
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
|                |                |                | slash '/'    |
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
|                |                |                | slash '/' is |
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
|                |                |                | job's library |
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
|                |                |                | job's library |
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
|                |                |                | <**F8**\>     |
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
|                |                |                | <**F8**\>     |
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
|                |                | Do not use     | <**F9**\>     |
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
|                |                |                | <**F7**\>     |
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
|                |                |                | <**F7**\>     |
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
|                | SCRIPT(<      | Mode           | operator       |
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

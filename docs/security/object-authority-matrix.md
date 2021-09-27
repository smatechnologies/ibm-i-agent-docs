---
sidebar_label: 'Object Authority Matrix'
---

# LSAM Object Authority Matrix

The IBM i LSAM Installation instructions advise that an object authority
matrix must be configured if the LSAM Administrator will not be QSECOFR
or another super user profile with \*ALLOBJ authority. This section
describes the resources available and the procedures that can be used to
implement the object authority matrix.

## LSAM Object Authority Table

The basis for a revised object authority matrix is provided by SMA in a
pair of LSAM Object Authority tables. These tables are distributed and
installed with the original LSAM software product object authority
matrix data already loaded. That is, the object authority table files
include data that describe the actual object authority assigned to each
table and file in the LSAM software product, wherever the default
authorities do not apply.

The default authority rules for LSAM object authority are these:

- All libraries and objects are owned by user SMANET, except where the
    object authority table designates QSECOFR as the owner of certain
    programs.
- \*PUBLIC is granted \*USE authority to the LSAM libraries, but is
    excluded from any authority to most of the objects they contain. In
    other words, all authority for \*PUBLIC is revoked for all objects,
    and only the authorities specified in the object authority table are
    granted.
- The LSAM Restricted Mode user profile, SMASAV, is granted certain
    authorities that are defined in the object authority table.
- The IBM i system operator, QSYSOPR, is registered in the default
    LSAM object authority tables with authority to use only some very
    basic LSAM features that are normally required for daily (or
    periodic) LSAM operation. The name of this user profile could be
    replaced in the object authority table, for example, with a
    user-defined operator name such as SMAOPER.
- The object authority table contains definitions of all special
    authorities that will be granted to any file, program or other
    object. If a special authority is not registered in the LSAM object
    authority tables, that authority may be lost (revoked) whenever the
    LSAM authority management utilities are used or when LSAM software
    updates are applied.

The LSAM function that may be used to modify the object authority tables
is explained in more detail in the Screens and Windows section of this
topic below.

## LSAM Operator Authorities

The IBM i LSAM default installation delivers the LSAM software with
sufficient authority for the default IBM i system operator, QSYSOPR, to
perform the following minimal LSAM operations:

- Enter the LSAM menu system (but use only the authorized functions)
- Start or stop the LSAM subsystem and server jobs, including the SMA
    File Transfer server
- Check the status of the LSAM server subsystem and jobs
- Work with Tracked Jobs (refer to the topic about Job Tracking for
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

:::warning
Only the site security officer should be allowed to use the LSAM function of Work with object authority. The information displayed by this function should be kept confidential. The action options and function keys supported by this function provide direct access to IBM i commands such as GRTOBJAUT.
:::

## LSAM Special Authorities

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

## LSAM Menu Function Authorities

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

## LSAM Object Reference Flow Chart

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

### REFFLOW -- Program Reference Flow Chart

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

#### REFFLOW command syntax

REFFLOW OBJ(object_name) LEVELS(n) SAVE(x) WRKLIB(lib_name)

- **OBJ**: The name of an LSAM menu, command or program.
- **LEVELS**: The number of nesting levels to show in the reference
    flow chart, 1 -- 9, default is 5. Too few levels can omit important
    references, but too many levels may create a list that is too long
    if there are recursive program calls.
- **SAVE**: Save analysis work file: Y = yes, N = no (discard
    temporary work file), E = use existing work file that was previously
    saved, to be found in the library named by the WRKLIB parameter. The
    default value is N. Each work file is named according to the OBJ
    name. Saving work files and using them as existing work files makes
    the command run much faster and it saves system disk space by
    avoiding creation of deleted objects (that are not removed from disk
    until the next IPL).
- **WRKLIB**: Name of the library where the analysis work file will be
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

#### REFFLOW command examples

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

#### REFFLOW command usage

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

- I = input (requires only \*USE authority, READ data authority)
- O = output (requires ADD data authority)
- U = update (requires UPDATE data authority)

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

### DSPOBJWU -- Display Object Where Used

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

#### DSPOBJWU command syntax

DSPOBJWU OBJ(object_name) TYPE(object_type)

- OBJ = the name of the LSAM object to be studied. The named object
    must be one of the valid types. LSAM objects that are not one of
    these types will not be found in the supplied LSAM object reference
    master file.
- TYPE = must be one of the valid values:
  - \*DTAARA = data area
  - \*FILE = database file (physical or logical view). This is the
        default value for the TYPE parameter.
  - \*PGM = program
  - \*SRVPGM = service program
  - \*MENU = one of the LSAM menus (refer to the table of LSAM Menu
        Functions, above)
  - \*CMD = command

#### DSPOBJWU command examples

DSPOBJWU OBJ(LSAPARF00) TYPE(\*FILE)

This example will produce a list of all programs and service programs
that use the LSAM Parameters control physical file, LSAPARF00.

DSPOBJWU OBJ(SFTMNGLOGR) TYPE(\*PGM)

This example will produce a list of all programs, service programs,
commands and menus that call the program SFTMNGLOGR.

#### DSPOBJWU command usage

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

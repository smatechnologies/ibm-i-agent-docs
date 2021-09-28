# LSAM Operations

There are two commands that can be used to enter the IBM i LSAM green
screen workstation menu system: STRSMA and LSAMENU. The STRSMA may be
used from any IBM i command line, regardless of the current library
list, as long as the command is qualified by its library location, for
example, SMAGPL/STRSMA (replace SMAGPL with a different name, if the
default LSAM utility library is not the installation default name).
STRSMA supports specification of an LSAM environment name in one of its
parameters, and the command will set the job's library list
appropriately.

In cases where the LSAM environment library list will already be set, it
is typically more convenient to use the LSAMENU command. This alternate
command bypasses the LSAM menu system splash display, saving time and
keystrokes. It's also possible to specify an LSAM sub-menu number with
the LSAMENU command, so this command might be useful in configuring
links between another menu system and the LSAM menu system. The LSAMENU
command can be useful in Operator Replay scripts. The LSAMENU command
does support specification of an LSAM environment name in its ENV
parameter, but the default value of the ENV parameter is \*CURRENT - a
value that can only be used if the job is already set to use the LSAM
environment library list.

## STRSMA Command

The command STRSMA logs a user into the IBM i LSAM menu system. It was
designed for use with IBM i interactive workstation jobs. To enter the
LSAM environment in a batch job use the SMASETLIBL command, described
next in this topic. After exiting the LSAM menu system in an interactive
job, the STRSMA command restores the interactive job's original library
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
first setting the job's library list. After the LSAM environment has
been established, the STRSMA command will complete its other functions,
primarily logging the user into the LSAM's green screen workstation
menu system.

### IBM i LSAM Interactive Menu

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
|                           |           | ent.md#SMALIBMG) |
|                           |           |     ).              |
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

### Using SMASETLIBL in Batch Jobs

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

:::warning
\*SELECT may not be used in a batch job. The default operation of the STRSMA and SMASETLIBL commands substitutes a value of \*SELECT for the environment parameter if a valid value is not supplied. If this happens in a batch job, it would cause the batch job to end abnormally when the subprograms attempt to display the environment selection screen.
:::

The SMASETLIBL command simply replaces any job's library list with the
library list specified in the LSAM control files (stored in library
QGPL) for the named LSAM environment. When the SMASETLIBL command
completes it leaves the job library list set to the LSAM environment.
The COMPMSG parameter may be useful if it is desired to prevent logging
of the command's normal completion message that would log the new
library list in the form of the CHGLIBL command syntax.

### STRSMA Splash Display

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

## LSAMENU Command

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

### Using LSAMENU to enter the IBM i LSAM Interactive Menu

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
|                           |           |     interactive job's    |
|                           |           |     current library list  |
|                           |           |     includes all the      |
|                           |           |     libraries required to |
|                           |           |     define an LSAM        |
|                           |           |     environment. If an    |
|                           |           |     LSAM environment is   |
|                           |           |     not discovered in the |
|                           |           |     job's current        |
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
|                           |           | ent.md#SMALIBMG) |
|                           |           |     ).              |
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

## System and User Configuration Requirements for the LSAM Menu

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

The actual STRSMA or LSAMENU command, or either command's processor
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

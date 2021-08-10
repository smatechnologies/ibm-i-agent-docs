---
lang: en-us
title: Operator Replay Scripts
viewport: width=device-width, initial-scale=1.0
---

# Operator Replay Scripts

Operator Replay automates an emulation of human interaction with the
computer. Simply define Replay scripts using the interactive screen
setup. When OpCon/xps executes a Replay script, a special Operator
Replay session starts as the LSAM command STROPRRPY is executed.
Operator Replay uses the script to mimic, keystroke for keystroke, the
human interaction defined in the script. The Operator Replay log
function displays the system output and the Replay script response in
order to debug and refine scripts, or to review actions that took place
during live operations. There is support for branching logic within a
script or to another script. It is also possible to capture screen data
and define responses to the captured data. These additional features,
combined with script variables, make it possible for the script to be
dynamically modified depending on the screen content.

 

The User Management feature associated with Operator Replay scripting
optionally supports tight system security by complying with the system
security officer\'s decision to (1) limit which virtual device
descriptions can be used for Operator Replay workstation automation and
(2) restrict access of workstation device descriptions to a specific
user. This higher security option eliminates dependency on IBM i
automatic virtual device creation by providing a Telnet exit program
that manages virtual display device assignment.

## Operator Replay Menu

Operator Replay Menu

  --------------------------------------------------------------------------------------------------------------------------------------------------------------
   [SYSTEMNAME]{style="color: #008000;"}                   OPERATOR REPLAY MENU                   [  00/00/00]{style="color: #008000;"}    USERNAME                                                              03:49:19
   
    Select one of the following:
   
        1. [User management]{style="color: #008000;"}         2. [Operator Replay scripts]{style="color: #008000;"}
        3. [Operator Replay logs]{style="color: #008000;"}         4. [Operator Token/Variable management]{style="color: #008000;"}
        5. [Work with Screen Capture definitions]{style="color: #008000;"}         6. [Work with Captured Data Response Rules]{style="color: #008000;"}
        7. [Operator Replay configuration ]{style="color: #008000;"}         8. [Display Captured Data log]{style="color: #008000;"}
        9. [Display data capture debug log]{style="color: #008000;"}    
   
   Selection or command
   ===\>\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
  \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
   F3=Exit   F4=Prompt   F9=Retrieve   F12=Cancel
   F13=Information Assistant   F16=System main menu
  --------------------------------------------------------------------------------------------------------------------------------------------------------------

###### Menu Pathways

Main Menu \> Operator replay menu (\#4)

###### Field

Selection or command

###### Options

-   1=Operator Replay user
-   2=Operator Replay scripts
-   3=Operator Replay logs
-   4=Operator Token/Variable management
-   5=Work with Screen Capture definitions
-   6=Work with Captured Data Response Rules
-   7=Operator Replay configuration
-   8=Display Captured Data log
-   9=Display data capture debug log

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
-   **F13=Information Assistant**: Displays the IBM i general help
    screen.
-   **F16=System main menu**: This is always shown on any
    system-generated menu screen. It branches to the general command
    entry menu for IBM i. Return to the previous menu by pressing
    \<**F3**\> or \<**F12**\>. This function is not commonly used and
    can be restricted for certain user profiles.

## OR Script Operations

### Configuring Operator Replay

The first step required before Replay scripts can be used is to execute
the Operator Replay configuration at least one time. Using this function
sets values that are required by the Operator Replay programs. For most
of the configuration parameters, the default values are appropriate. For
example, port 23 is the port commonly used for telnet communications
(used to create an interactive workstation session), and the IP address
would normally be a \*LOOPBACK interface address, such as 127.0.0.1. The
logging parameters should be reviewed and set appropriately. The logging
parameters should be reviewed and set appropriately.

 

The recommended initial settings for the logging parameters are:

-   Script job logging: Y (yes)
-   Script job debug logging: N (no)
-   (Debug logging for captured data and response rules is controlled
    from the LSAM Utilities configuration, function 7 on Menu 3: Events
    and Utilities menu.)

  ------------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White triangle icon on yellow circlular background](../../../Resources/Images/caution-icon(48x48).png "Caution icon")   **CAUTION:** [Do NOT change the settings for the Token/variable separator or the Cursor control separators without first learning all about them. These settings must correspond to the content of the Operator Replay Scripts. Please contact SMA Support for assistance with these fields.]
  ------------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

The Operator Replay Configuration stores potentially complex rules that
support various levels of system security. At the top of the first page
of Configuration maintenance, there is a section that is used to define
how virtual display devices will be selected. Three of four modes of
device selection require the use of the LSAM\'s Telnet Exit Program.
There are also parameters that allow the Script driver program to adapt
to the local site\'s configuration of the IBM i Telnet Server, including
controls over the port that is used and an option to support
TLS security applied to the connection between the Script driver program
(acting as a Telnet Client) and the virtual display device, through the
Telnet Server (which acts as a TLS Server).

 

For more information and instructions about optionally engaging
TLS Security, refer to the topic Engaging Telnet TLS Security near the
end of the Operator Replay Scripts section.

 

There are function keys that are accessed from this display that connect
to Agent tools for defining optional extensions to the basic
configuration of the Device Name, IP Address and the Telnet exit
program, referred to in the first page of the Configuration display.
Refer to the topic [Managing Virtual Devices](#Managing)
at the end of the Operator Replay Scripts section for a detailed
explanation and instructions about how to use these extended security
features.

### Engaging Telnet TLS Security

The Operator Replay Script driver program uses TCP/IP sockets to
communicate directly with the IBM i Telnet Server program as it requests
a virtual display device. IBM i supports two different port numbers for
accessing the Telnet server, using by default the port numbers of 23 for
unsecured, and 992 for secured.

 

There are four steps required to engage TLS security between the
Operator Replay Script driver program and the virtual display device.
The following document sub-sections explain how to perform each of these
steps:

-   Use the IBM i DCM (Digital Certificate Manager, a web-based
    application accessed via the IBM Navigator for i), to assign a TLS
    Client certificate to the IBM i LSAM Operator Replay application.

-   Change the port number in the LSAM\'s Operator Replay Configuration
    to match the site\'s Secure Telnet Port number.

-   Change the LSAM Operator Replay Configuration option for using TLS
    Security to \"Y\" = Yes.

-   After changing the TLS Security option to Yes, the Configuration
    program will display an extra configuration page dedicated to TLS
    Security. Update the TLS Security options, making sure that the
    Certificate Application name exactly matches the Application name
    registered in the IBM i DCM.

### Configuring the IBM i Digital Certificate Manager (DCM)

Information and instructions from IBM about \"Securing Telnet with SSL\"
can be found at the IBM i Knowledge Center, for example, at this i7.2
documentation URL:

 

<https://www.ibm.com/support/knowledgecenter/ssw_ibm_i_72/rzaiw/rzaiwconfiguresslparent.md>

 

SMA Technologies does not normally provide training about the IBM i
operating system or its feature configuration, and SMA Technologies does
not provide support for the IBM i operating system. It is entirely the
responsibility of the user to correctly configure the operating system
requirements mentioned in this documentation. The correct operation of
OpCon Agent for IBM i -- Operator Replay feature depends on a correct
configuration of the operating system, and this OpCon Agent\'s logging
features for Operator Replay are able to demonstrate and prove that it
is performing correctly. The Agent\'s logs may or may not provide
helpful hints, as error codes reported by the operating system are
captured in those logs. However, due to the necessary secretive nature
of TLS Security, not every incorrect IBM i configuration problem will be
detected by this OpCon Agent\'s programs.

 

  -------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** The IBM i DCM handles Client and Server digital certificates, themselves, in the same way. The way in which a Client/Server certificate will be used is determined when a certificate is assigned to an application. The DCM presents separate lists for Server and Client applications.
  -------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

#### Digital Certificate Assignments

[IBM i Telnet Server]{.ul} 
 

To enable TLS Security when communicating with the IBM i Telnet Server,
it is necessary to assign a Server certificate to the application in the
\*SYSTEM certificate store that IBM pre-defines for its Telnet Server,
typically named \"IBM i TCP/IP Telnet Server\" (this being the
Description of the Application, as it appears in the IBM i DCM list of
Server Applications).

 

[IBM i LSAM Telnet Client]{.ul} 
 

A TLS Client application must be registered in the DCM. It is critical
that this application name matches exactly with the TLS Application name
registered in the IBM i LSAM Operator Replay Configuration function.

 

The default Application ID (critical, must match Agent) suggested by SMA
Technologies is:

[SMA_IBM_I\_OPERATOR_REPLAY]{.ul} 
 

There is also an application description value which is non-critical and
not registered in the Operator Replay Configuraiton, but

this is what appears in the DCM list of applications to be viewed or
updated. The default application description suggested by

SMA Technologies is :

\"SMA IBM i Operator Replay Telnet TLS Client\"

 

\...although, users may select their own Application ID and Description.

 

Use the IBM i DCM to assign a TLS Client certificate to this
application.

#### Operator Replay Configuration for Telnet TLS Security

Using the IBM i LSAM menu system, sub-menu 4, option 7, update these two
fields that appear in the top section \"TCP/IP and Device
configuration\":

-   [Telnet port number . . . : [00992]{.ul}    *(Port 23 = unsecure,     port 992 = secure)*]{style="font-family: Consolas;"}

-   [TLS security?: [Y]{.ul} * Y=yes,     N=no*]{style="font-family: Consolas;"}

+----------------------------------+----------------------------------+
| ![White pencil/paper icon on     | **NOTE:** Remember to change the | | gray circular                    | Telnet port number each time the |
| background](../../.              | TLS security option is changed   |
| ./Resources/Images/note-icon(48x | between Y and N. Failure to make |
| 48).png "Note icon") | these changes together will      |
|                                  | cause the Operator Replay Script |
|                                  | driver program to fail.          |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | Some client sites may have       |
|                                  | changed their IBM i port         |
|                                  | assignments for the Telnet Ports |
|                                  | to different numbers, as an      |
|                                  | additional way to hide and       |
|                                  | secure unauthorized access to    |
|                                  | the IBM i partition.             |
+----------------------------------+----------------------------------+

 

Whenever the \"TLS Security?\" value is set to \"Y\", an additional
display format (presented as page 2 of 3 under the current Agent
software level), will appear to support registration of these TLS
Security options:

 

-   [TLS handshake timeout..: [30]{.ul}       *seconds*]{style="font-family: Consolas;"}
-   [TLS DCM Application ID.:     [SMA_IBM_I\_OPERATOR_REPLAY]{.ul}]{style="font-family: Consolas;"}

 

After making the Operator Replay Configuration changes on the first and
second display pages, remember to press Enter twice -- once to go to
page 3, and then a final time to commit the changes to the LSAM
Parameters table on disk. The Operator Replay Configuration function
returns to the first page after an update is complete, and the
successful update action is reported in a message on the bottom line of
the workstation display. The function key logo shows a change to the
meaning of function keys F3 and F12, indicating they can be used to
"Exit" the function (without losing the updates). This change replaces
the initial display of the function key legend that shows F3/F12=Cancel,
indicating that no changes were yet committed to disk.

#### Operator Replay Configuration Control of Logging

A comprehensive view of the interaction between the IBM i Host
Workstation Manager, and the LSAM\'s Operator Replay Script driver
program, is accessed from the LSAM sub-menu 4, option 3. Type a 5 next
to the Script execution instance desired, and then from the log entry
profile display, press F10 to branch to the carefully colored
workstation dialog displayed. More information about this log viewer can
be found under the topic [OR Script Operations -\> Viewing Operator Replay Logs](#Viewing) elsewhere in this chapter.

 

Using the IBM i LSAM menu system, sub-menu 4, option 7, the Script
driver program logging options support one new value for logging.

 

-   [Script job logging . . . :     [Y]{.ul}]{style="font-family: Consolas;"}           [      Y=yes,
    N=no, D=Yes + debug
    TLS]{style="font-family: Consolas; font-style: italic;"}

     

[When the normal script logging option is set to the value of \"D\", the workstation interaction log viewer will include a verbose report that
documents the TLS Security handshake in the first few pages of the log
display. Option \"D\" implies option \"Y\", meaning that the normal,
cleaner log of the screen output and Script driver input will also be
included in the log images.
]{style="font-style: normal; font-family: 'Century Gothic';"}

### Defining a User (Multi-purpose)

Preparing to run Replay scripts begins with registering user profiles to
tell the LSAM they are valid for running Replay script jobs. Any valid
IBM i user profile may be used as long the user has been granted
privileges to perform every step that is included in the step records of
the scripts.

 

  ------------------------------------------------------------------------------------------------------------------------------ -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White \"X\" icon on red circular background](../../../Resources/Images/warning-icon(48x48).png "Warning icon")   **WARNING:** [It is very important to carefully secure access to the maintenance and use of Operator Replay scripts. Depending on the user profiles registered, this form of OpCon/xps job could create security risks for the system.]
  ------------------------------------------------------------------------------------------------------------------------------ -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

  -------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [The User management function supports other features available with the LSAM software, besides Operator Replay. For example, FTP jobs defined in OpCon/xps for execution in IBM i require that the FTP user be registered using this maintenance function.]
  -------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

Next, make sure that the SMANET user profile has been granted privileges
to use every user profile that will be used with Operator Replay. Follow
the steps below to set up a user profile for use with Operator Replay.

 

[Set Up an Operator Replay User]{.ul} 
1.  Create the required user profile under IBM i using processes defined
    by the site.
2.  Grant \*USE privileges to the SMANET user for the IBM i user profile
    created.
3.  In the command line, enter **SMAGPL/STRSMA**. For more information
    on **STRSMA** command parameters, refer to [The STRSMA     Command](Components-and-Operation.md#The).
4.  Enter **4** to choose the **Operator Replay menu** in the SMA Main
    Menu.
5.  Enter **1** to choose **User management** in the Operator Replay
    Menu.
6.  Press \<**F6**\> on the User management menu.
7.  On the Add User screen, \<**Tab**\> to the following fields and type
    data for each:
    a.  In the **User Name** field, type the User Profile to use when
        running Operator Replay scripts (up to 10 characters - a longer
        name could be entered, but Operator Replay is restricted to 10).
    b.  In the **Password** field, type the user profile\'s password (up
        to 10 characters, unless the IBM i password option has been set
        to allow longer passwords to be used).
    c.  In the **Password (to verify)** field, retype the user
        profile\'s password to verify the password.
    d.  In the **Description** field, type a text description for the
        user (up to 40 characters).
    e.  In the **Device Name** field, optionally assign this user to a
        specific virtual display device.
    f.  In the **IP Address** field, if a Device Name was specified,
        also enter here the IP Address that will be associated with this
        device. (The LSAM\'s Telnet exit program uses the IP Address to
        force selection of the device. SMA recommends using a \*LOOPBACK
        type of Interface for this IP Address, which avoids having to
        create a line description.)
8.  Press \<**Enter**\> to complete the process of adding a new user.

### Creating an Operator Replay Script

There are two ways to create new scripts: Either create a new script
from scratch, or copy an existing script and then modify the steps in
the new copy.

 

[Create an Operator Replay Script]{.ul} 
1.  In the command line, enter **SMAGPL/STRSMA**. For more information
    on STRSMA command parameters, refer to [The STRSMA     Command](Components-and-Operation.md#The).

2.  Enter **4** to choose the **Operator Replay menu** in the SMA Main
    Menu.

3.  Enter **2** to choose the **Operator Replay scripts** in the
    Operator Replay Menu.

4.  In the **Operator replay script menu**, press \<**F6**\> to add a
    new script.

5.  On the Operator replay script screen, \<**Tab**\> to the following
    fields and enter the following data:
    a.  In the **Name** field, type the script name (up to 10
        characters).
    b.  In the **User** field, type the user profile created to use when
        running Operator Replay scripts (up to 10 characters).
    c.  In the **Description** field, type a text description for the
        script (up to 40).

6.  Press \<**Enter**\> to complete the process of registering a new
    script.

7.  The **Operator Replay Script Step** screen appears.

8.  Press \<**F6**\> to create a new step on the Operator Replay Script
    Step screen.

9.  On the Operator Replay Step detail screen, \<**Tab**\> to the
    following fields and enter the following data:
    a.  In the **Step description** field, type a text description for
        the script (up to 40 characters).
    b.  Under the String and function to send heading, in the **String
        to send** field, type a string to send. Press \<**F4**\> for a
        list of cursor control characters that can be added to the
        string, or \<**F6**\> for a list of Operator Replay variable
        tokens that can be inserted into the string, or \<**F8**\> to
        get help selecting and formatting an IBM i command.
    c.  Under the String and function to send heading, in the **Function
        to send** field, type a function to send or press \<**F4**\>.
        When \<**F4**\> is pressed, move the cursor to the preferred
        item and press \<**Enter**\>. A commonly used function to send
        is the **ENTER** function.
    d.  Under the Script branching logic, optionally, specify a **Branch
        Type**, if this step may cause a branch in script logic.
        Branching only takes place if the (following) Control Strings
        qualify this step for execution. If a Branch Type is specified,
        also type the **Branch-to script** and **Branch-to label** field
        values. When \<**F6**\> is pressed from either of these fields,
        an available Operator Replay Token name may be selected in place
        of an actual script or label name. From the F6 window, move the
        cursor to the preferred token name and press \<**Enter**\>. The
        selected value will be placed into the field where the cursor is
        located. (Refer to the discussion below about Script Branching
        Rules for more information.)
    e.  Under the Control Strings heading, if any control strings will
        be used to quality the step, choose one of the values for **If
        no match**: S=Skip the step when either control string rule is
        not satisfied, or F=Fail the whole job.
    f.  *(Optional)* Both of the control strings may use
        numeric value rules instead of character string comparison
        rules. To specify that the comparison should be done by
        compressing out only the numeric values from the control string
        location(s), type Y=yes in the **Comp numeric** field.
    g.  The **Top** string is one of two optional control strings. To
        activate a control string, type one of the allowed **Rule**
        values (EQ, NE, GT, LT, GE, LE). If the **Value** of the
        reference string will not be blanks, type in the expected string
        value. Function key \<**F6**\> may also be used to select an
        Operator Replay Token if a variable reference value should be
        used. The **Row** and **Column** fields show the coordinates of
        the control string.
    h.  A string **Length** may optionally be specified (useful if the
        comparison value must be a certain number of space characters).
        If the Length is not specified, the system ignores trailing
        space characters in the Value field and only compares the number
        of positions up to the last non-blank character. If an Operator
        Replay Token variable will be used as the Value and its value
        length may vary, it may be useful to leave the Length field
        blank, but if the Length field is specified, any Value
        characters beyond the specified length will be ignored.
    i.  The **Bottom** string is simply another control string rule that
        must also be satisfied if specified. It works like the Top
        string. If both rules are specified, both must be satisfied for
        any function of this step to be executed.
    j.  Press \<**Enter**\> to save the step data.

10. The system returns to the **Operator Replay Script Step** screen.
    a.  Repeat Steps 9 a) to f) to add additional steps to a script.

[Copy an Operator Replay Script]{.ul} 
 

Copying an entire script is another way to Create new scripts:

1.  In the command line, enter **SMAGPL/STRSMA**. For more information
    on STRSMA command parameters, refer to [The STRSMA     Command](Components-and-Operation.md#The).
2.  Enter **4** to choose the **Operator Replay** menu in the SMA Main
    Menu.
3.  Enter **2** to choose the **Operator Replay scripts** in the
    Operator Replay Menu.
4.  Type **3** next to the existing script that is copied, in the
    Operator replay script menu.
5.  Press \<**Enter**\> to continue.
6.  The **Copy Script** window appears.
7.  Type a New Script Name and update the User and Comment fields as
    necessary in the Copy Script window.
8.  Press \<**Enter**\> to record the new script.
9.  The system returns to the Operator Replay Script list. Use the
    procedures for Changing an Operator Replay Script, below, to
    customize the steps of the new script that was just copied.

### Changing an Operator Replay Script

#### Ways to Modify a Script

-   Change a script by adding or modifying a step.
-   Change a step by modifying the Sequence field number.
-   Copy a step.
-   Delete a step.

[Adding a Step]{.ul} 
1.  In the command line, enter **SMAGPL/STRSMA**. For more information
    on STRSMA command parameters, refer to [The STRSMA     Command](Components-and-Operation.md#The).
2.  Enter **4** to choose the **Operator Replay menu** in the SMA Main
    Menu.
3.  Enter **2** to choose the **Operator Replay scripts** in the
    Operator Replay Menu.
4.  Type **1** next to the script that is modified in the Operator
    replay script menu.
5.  Press \<**Enter**\>.
6.  The **Operator Replay Step** screen appears.
7.  Press \<**F6**\> (Add) to create a new step on the Operator replay
    script step screen.
8.  Press \<**Enter**\> to record the new step data.

[Modify a Step]{.ul} 
1.  In the command line, enter **SMAGPL/STRSMA**. For more information
    on STRSMA command parameters, refer to [The STRSMA     Command](Components-and-Operation.md#The).

2.  Enter **4** to choose the **Operator Replay menu** in the SMA Main
    Menu.

3.  Enter **2** to choose the **Operator Replay scripts** in the
    Operator Replay Menu.

4.  Type **2** next to the script that is modified in the Operator
    Replay Script menu.

5.  Press \<**Enter**\>.

6.  The **Operator Replay Step** screen appears.

7.  Type **2** next to the step record that is modified on the Operator
    replay script step screen.

8.  Press \<**Enter**\> to continue.

9.  Press \<**Enter\>** to record any changes.

[Copy a Step]{.ul} 
1.  In the command line, enter **SMAGPL/STRSMA**. For more information
    on STRSMA command parameters, refer to [The STRSMA     Command](Components-and-Operation.md#The).

2.  Enter **4** to choose the **Operator Replay menu** in the SMA Main
    Menu.

3.  Enter **2** to choose the **Operator Replay scripts** in the
    Operator Replay Menu.

4.  Type **2** next to the script that is modified in the Operator
    Replay Script menu.

5.  Press \<**Enter**\>.

6.  The **Operator Replay Step** screen appears.

7.  Type **3** next to the step record that is modified on the Operator
    replay script step screen.

8.  Press \<**Enter**\> to continue.

9.  Press \<**Enter**\> to record the new step data.

[Delete a Step]{.ul} 
1.  In the command line, enter **SMAGPL/STRSMA**. For more information
    on STRSMA command parameters, refer to [The STRSMA     Command](Components-and-Operation.md#The).

2.  Enter **4** to choose the **Operator Replay menu** in the SMA Main
    Menu.

3.  Enter **2** to choose the **Operator Replay scripts** in the
    Operator Replay Menu.

4.  Type **2** next to the script that is modified in the Operator
    Replay Script menu.

5.  Press \<**Enter**\>.

6.  The **Operator Replay Step** screen appears.

7.  Type **4** next to the step record(s) that is copied on the Operator
    replay script step screen.

8.  Press \<**Enter**\> to continue.

9.  The **Delete Step** confirmation window appears, listing all the
    step records that were selected for deletion.

10. Press \<**Enter**\> to delete the step records in the Delete Step
    confirmation window.

### Deleting an Operator Replay Script

The following procedure deletes a script including all step records in
the script.

 

[Delete an Entire Script]{.ul} 
1.  In the command line, enter **STRSMA**. For more information on
    STRSMA command parameters, refer to [The STRSMA     Command](Components-and-Operation.md#The).

2.  Enter **4** to choose the **Operator Replay menu** in the SMA Main
    Menu.

3.  Enter **2** to choose the **Operator Replay scripts** in the
    Operator Replay Menu.

4.  Type **4** next to the script(s) that is modified in the Operator
    Replay Script menu.

5.  Press \<**Enter**\>.

6.  The **Delete Script** confirmation window appears, listing all the
    scripts that were selected for deletion.

7.  Press \<**Enter**\> to delete the scripts and all their associated
    step records in the Delete Script confirmation window.

### Setting up an Operator Replay Script in the Enterprise Manager

An Operator Replay script is normally executed by adding an IBM i (IBM
i) job to an OpCon/xps schedule. At a minimum, the following items must
be defined:

-   Job Type: IBM i
-   Job Name
-   Primary Machine
-   Job Information:
    -   Job (sub-) Type: Operator Replay Job.
    -   User ID: This parameter is ignored by the LSAM Operator Replay
        function. Operator Replay control jobs run under the LSAM\'s own
        user (SMANET) authority. The actual Operator Replay Script will
        be executed under the authority of the user profile that is
        registered in the LSAM\'s User Management function.
-   []{#aanchor8} For Call Information \~ Script name: The site\'s     Operator Replay script name that was defined using the IBM i LSAM
    menu functions (described above).

In addition, the LSAM will automatically enforce the following values
that are essential for correct operation of Operator Replay. These
values may be left set as the default values in the job master:

-   For Library \~ Init Lib List: The LSAM will force this to \*JOBD at
    run time.
-   For Job Description \~ Name: The LSAM will force this to SMALSAJ00
    at run time.
-   For Job Description \~ Library: The LSAM will force this to the
    location of SMALSAJ00.

For information on defining an IBM i Job, refer to [IBM i Job Details](https://help.smatechnologies.com/opcon/core/latest/Files/Concepts/IBM-i-Job-Details.md#top){.MCXref
.xref} in the **Concepts** online help.

### Data Capture and Response Rules

Optionally, rules may be defined externally to the Operator Replay
script that specify data to be captured from screen formats received by
the Operator Replay script execution driver program. For each element of
captured data there may be one or more Captured Data Response Rules
defined.

 

+----------------------------------+----------------------------------+
| ![White pencil icon on green     | **EXAMPLE:** [Data Capture and   | | circular                         | Response Rules can be used to    |
| background](../../../Reso        | dynamically vary the way an      |
| urces/Images/example-icon(48x48) | Operator Replay script responds  |
| .png "Example icon") | to screen formats! An            |
|                                  | explanation                      |
|                                  | follows\...]{.statement2}        |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | An important example of how      |
|                                  | these features may be used is    |
|                                  | when an Operator Replay script   |
|                                  | step String to send includes a   |
|                                  | token for a variable. A captured |
|                                  | data response rule can be        |
|                                  | created that will update the     |
|                                  | value of the variable before it  |
|                                  | is used. This makes it possible  |
|                                  | to dynamically vary the response |
|                                  | of the Operator Replay script to |
|                                  | each screen that is presented,   |
|                                  | based on the content of the      |
|                                  | screen format at execution time. |
+----------------------------------+----------------------------------+

 

  -------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [More detail about how Captured Data Response Rules function may be found in Events and Utilities, related to the SCANSPLF command.]
  -------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------

#### Ways to Add Data Capture Rules

-   After an Operator Replay script and its steps have been defined, use
    the LSAM Menu 4 function 5: Work with Screen Capture Definitions, to
    add or modify captured data rules.
-   Press F10=Capt Defn while adding, copying or changing a script Step
    record to branch to screens that will automatically be linked to
    that Step record.

[Adding a Data Capture Rule from the LSAM Menu System]{.ul} 
1.  In the command line, enter **SMAGPL/STRSMA**. For more information
    on STRSMA command parameters, refer to [The STRSMA     Command](Components-and-Operation.md#The).

2.  Enter **4** to choose the **Operator Replay menu** in the SMA Main
    Menu.

3.  Enter **5** to choose **Work with Screen Capture definitions** in
    the Operator Replay Menu.

4.  Press \<**F6**\> to Add a new Screen Capture definition record in
    the Work with Screen Capture definitions screen.

5.  The **Create Screen Capture Definition** screen appears.

6.  Type the Name and Sequence number of an existing step in an existing
    Operator Replay script on the Create Screen Capture Definition
    screen.

7.  Type an Application Identifier value. This value must be the same
    for each group of capture rules that correspond to a single Operator
    Replay script. For Operator Replay, this field serves the important
    function of grouping together in the log files the captured data
    from a single script execution.

8.  Assign a unique Capture sequence number to each separate data
    capture rule. The order of the sequence number determines which
    capture rule will be executed first, and therefore the order in
    which (optional) captured data response rules (if any) may be
    executed.

9.  Type the Screen row start position number. Rows in a standard 24 X
    80 character display screen may be 1 to 24.

10. Type the Screen column start position number. Columns in a standard
    24 X 80 character display screen may be 1 - 80.

11. Type the Length of data string value. The size of the captured data
    may be as large as 1920 characters. (Even if a 27 X 132 display
    format is being used, only 1920 characters, at most, may be captured
    by a single data capture rule.)

12. *(Optional)* F11=Response rules may be pressed to
    define response rules that will correspond to this data capture rule
    (as described below). All of the data capture definition fields must
    be completed before pressing F11 during the process of adding a new
    data capture rule, in order to provide the correct key values to the
    captured data response rule records.

13. Press \<**Enter**\> to record the new Data Capture definition
    record.

14. The system returns to the list of existing Data Capture records.

[Adding a Data Capture Rule from Within Operator Replay Script Step Maintenance]{.ul}

1.  Press \<**F10=Capt Defn**\> to branch to the Work with Screen
    Capture Definitions function in the Operator replay script step
    screen.

2.  The **Work with Screen Capture Definition** screen appears, listing
    any existing records that apply only to the current Operator Replay
    script name and Step Sequence number. The Script name and the
    Sequence number show in the screen heading lines.

3.  Press \<**F6**\> to add a new Data Capture definition record.

4.  The **Create Screen Capture Definition** screen appears, showing the
    Operator Replay script name and step Sequence number in the heading
    lines.

5.  Type the Name and Step Sequence number values from the existing
    Operator Replay script are filled in and protected on the Create
    Screen Capture Definition screen.

6.  Type an Application Identifier value. This value (critical for the
    SCANSPLF command) is not critical for Operator Replay screen capture
    rules, but the value should be the same for each group of capture
    rules that correspond to a single Operator Replay script. For
    Operator Replay, this field serves as a documentary description of
    the group of capture sequence numbers.

7.  Assign a unique Capture sequence number to each separate data
    capture rule. The order of the sequence number determines which
    capture rule will be executed first, and therefore the order in
    which (optional) captured data response rules (if any) may be
    executed.

8.  Type the Screen row start position number. Rows in a standard 24 X
    80 character display screen may be 1 to 24.

9.  Type the Screen column start position number. Columns in a standard
    24 X 80 character display screen may be 1 - 80.

10. Type the Length of data string value. The size of the captured data
    may be as large as 1920 characters. (Even if a 27 X 132 display
    format is being used, only 1920 characters, at most, may be captured
    by a single data capture rule.)

11. *(Optional)* F11=Response rules may be pressed to
    define response rules that will correspond to this data capture rule
    (as described below). All of the data capture definition fields must
    be completed before pressing F11 during the process of adding a new
    data capture rule, in order to provide the correct key values to the
    captured data response rule records.

12. Press \<**Enter**\> to record the new Data Capture definition
    record.

13. The system returns to the list of existing Data Capture records,
    pertaining only to the current Operator Replay script and Step
    sequence number.

14. Press \<**F6**\> to add additional Data Capture definitions for the
    same Operator Replay script step Sequence number, and repeat
    steps 5) through 13).

15. Press either \<**F3**\> or \<**F12**\> to exit the Work with Screen
    Capture Definition list display and return to the Operator Replay
    Step maintenance screen.

16. **IMPORTANT!** Be sure to complete the Operator Replay Script Step
    record maintenance function (Add, Copy or Change) by pressing
    \<**Enter**\> after returning from Data Capture Definition
    maintenance, in order to record the changes to the Script Step
    record.

#### Ways to Add Captured Data Response Rules

-   After a Data Capture definition has been completed, use the LSAM
    Menu 4, function 6: Work with Captured Data Response Rules, to add
    or modify captured data response rule records.
-   Press F11=Response Rules while adding, copying or changing a Data
    Capture definition record to branch to screens that will
    automatically be linked to that Data Capture definition record.

[Adding a Data Capture Rule from the LSAM Menu System]{.ul} 
1.  In the command line, enter **STRSMA**. For more information on
    STRSMA command parameters, refer to [The STRSMA     Command](Components-and-Operation.md#The).
2.  Enter **4** to choose the **Operator Replay menu** in the SMA Main
    Menu.
3.  Enter **6** to choose **Work with Captured Data Response Rules** in
    the Operator Replay Menu.
4.  Press \<**F6**\> to Add a new Capture Response Rule record in the
    Work with Capture Response Rules screen.
5.  The **Create Capture Response Rule** screen appears.
6.  On the Create Capture Response Rule screen, type the Capture
    Identifier and Capture Sequence number, using an existing Operator
    Replay Script name for the Capture Identifier and the Sequence
    number of an existing step in the script as the Capture Sequence
    number. Function key \<**F4**\> may be used to select a valid Script
    Name and Step Sequence number from a list window, as long as the
    Type field value has first been set to a value of \"C\" (= Capture
    Screen data).
7.  Type a value of \'C\' (= Capture screen data) for the Type field.
    The setting of this field controls what data will appear in the
    prompt window when \<**F4**\> is pressed from either the Capture
    Identifier or the Capture Sequence number field.
8.  Assign a unique Response Sequence number to each response rule. The
    order of the sequence number determines which response rule will be
    executed first.
9.  Type a value for the Compare rule. Refer to more information under
    [OR Script Screens and Windows](#OR2). A simple value
    set that allows a response rule to always execute is \"EQ\" (equal)
    to the compare data special value of \*ANY.
10. Type a Continuation field value if more than one comparison rule
    must apply. Otherwise, leave this field blank to specify one, simple
    response rule. Refer to more information under [OR Script Screens     and Windows](#OR2).
11. *(Optional)* Specify the names of a Dynamic Variable
    and/or an Operator Replay Token variable that will be used to store
    the captured data value.
12. Type a value for the Compress numeric field. Specify Y = yes if the
    captured and compare data values are numeric, otherwise specify N =
    no.
13. Type the Response cmd (command) to execute if the compare data rule
    is matched. Use function key \<**F13**\> if the command string is
    longer than will fit in the (part 1) input field.
14. Type a value for the Compare data lines 1-5. Use function key
    \<**F8**\> if the compare data is longer than will fit into lines 1
    to 5, but do type the first 5 lines into this field before pressing
    \<**F8**\>. The special values of \*ANY, \*PARM, or \"DynVar\" may
    be used. Refer to more information under [OR Script Screens and     Windows](#OR2).
15. The value for the Capture length field is supplied once a Capture
    Identifier and Capture Sequence number have been specified. This
    field will be loaded with a value if the F4=Prompt function key was
    used to select an existing Data Capture rule.
16. Press \<**Enter**\> to record the new Capture Response Rule record.
17. The system returns to an updated list of existing Capture Response
    Rule records.

[Adding a Data Capture Rule from within Operator Replay Script Step Maintenance]{.ul}

1.  Press \<**F10=Capt Defn**\> to branch to the Work with Screen
    Capture Definitions function in the Operator replay script step
    screen.

2.  Complete the Screen Capture Definitions data entry, as described
    above.

3.  Press \<**F11=Response rules**\> to branch to the Work with Captured
    Data Response Rules function.

4.  The **Work with Capture Response Rules** screen appears, listing any
    existing records that apply only to the current Operator Replay
    script name and Step Sequence number. The Script name and the Step
    Sequence number show in the screen heading lines.

5.  Press \<**F6**\> to add a new Capture Response Rule record.

6.  On the Create Capture Response Rule screen, the **Create Capture
    Response Rule** screen appears, showing the Operator Replay script
    name and Step Sequence number in the heading lines. The Capture
    Identifier, Capture Sequence number and Type field are loaded with
    the correct values referring to the Data Capture definition, and
    these fields are protected from input or change. The Name and
    Sequence number values from the existing Operator Replay script are
    filled in and protected.

7.  Assign a unique Response Sequence number to each response rule. The
    order of the sequence number determines which response rule will be
    executed first.

8.  Type a value for the Compare rule. Refer to more information under
    [OR Script Screens and Windows](#OR2). A simple value
    set that allows a response rule to always execute is \"EQ\" (equal)
    to the compare data special value of \*ANY.

9.  Type a Continuation field value if more than one comparison rule
    must apply. Otherwise, leave this field blank to specify one, simple
    response rule. Refer to more information under [OR Script Screens     and Windows](#OR2).

10. *(Optional)* Specify the names of a Dynamic Variable
    and/or an Operator Replay Token variable that will be used to store
    the captured data value.

11. Type a value for the Compress numeric field. Specify Y = yes if the
    captured and compare data values are numeric, otherwise specify N =
    no.

12. Type the Response cmd (command) to execute if the compare data rule
    is matched. Use function key \<**F13**\> if the command string is
    longer than will fit in the (part 1) input field.

13. Type a value for the Compare data lines 1-5. Use function key
    \<**F8**\> if the compare data is longer than will fit into lines 1
    to 5, but do type the first 5 lines into this field before pressing
    \<**F8**\>. The special values of \*ANY, \*PARM, or \"DynVar\" may
    be used. Refer to more information under [OR Script Screens and     Windows](#OR2).

14. The value for the Capture length field is supplied once a Capture
    Identifier and Capture Sequence number have been specified. This
    field will be loaded with a value if the F4=Prompt function key was
    used to select an existing Data Capture rule.

15. Press \<**Enter**\> to record the new Capture Response Rule record.

16. The system returns to an updated list of existing Capture Response
    Rule records that apply to the selected data capture definition.

17. Press \<**F6**\> to add more Capture Response Rule records,
    repeating steps 6) through 15) for each new record.

18. Press \<**F3**\> or \<**F12**\> to leave the Work with Capture
    Response Rules list screen and return to the detail screen of the
    selected Screen Capture definition record.

19. Press \<**Enter**\> to complete the add or update of the Screen
    Capture Definition record.

20. The system returns to an updated list of Screen Capture Definitions
    for the current Operator Replay Step.

21. Resume the process of adding any additional Screen Capture
    Definitions, as defined above.

22. Remember to press \<**Enter**\> after returning to the Operator
    Replay Step detail record in order to complete the creation or
    update of that detail record.

### Script Branching Rules

Optionally, rules may be defined at the Step level within Scripts that
cause the LSAM Script execution program to process steps in an order
other than a simple sequential process through a single script. It is
possible to qualify steps so that they are optional and can be skipped.
It is also possible to define a work flow that will branch to a step in
another script, or to a different step within the same script. Using
terms familiar to RPG programmers, it is possible to go to (GOTO) a
completely different step and tell the script execution program to
continue forward from there, or it is possible to exit to a subroutine
(EXSR) and then return to the point of exit after the target script
steps have completed.

 

It is not required to be a programmer in order to utilize the branching
logic available in Operator Replay scripts, but it is helpful to be
familiar with the basic concepts of a procedural programming language.
Non-programmers might wish to consult with an experienced programmer in
order to take full advantage of the powerful options that Operator
Replay script branching logic can support. The Operator Replay script
flow chart tool helps by displaying a picture of the script and steps
that will be executed when branching logic has been specified.

 

This section of documentation introduces the rules that apply to script
branching logic. It presents a simple set of steps that would be
followed when defining branching logic. It also offers an explanation of
how the branching tools work, including cautions about risks that may be
introduced by using branching tools. More details about each of the step
fields used to define branching logic can be found in the Screens and
Windows section of this topic.

#### How To Build and Test Script Branching Logic

Use the steps outlined above for adding (creating), changing or copying
a Script Step record. As a script step is being defined, there are
various tools that can be used to define the flow of scripts and their
steps. The individual tools that control script branching logic are
described in the following section.

 

The basic steps for implementing branching logic are these:

1.  Develop an overall plan of the Operator Replay script logic
    required, typically by manually executing operator functions on an
    interactive workstation session and taking note of any point in the
    work flow where a choice of responses must be made. Follow through
    the operator actions for each possible option, identifying screen
    characteristics and listing the steps for each branch of the work
    flow. Decide which of the branching tools (described below) seem
    best adapted to the circumstances. There are some examples below
    that might help with this decision.
2.  Build one or more scripts, assigning labels to any step that might
    be used as a branch-to point. Note the Script Name and Label
    whenever a label is assigned.
3.  Insert Dynamic Variable Tokens as necessary into any of the step
    fields that accept these variables. Take note of the variable names
    assigned.
4.  Add branching instructions to any script step that will refer to the
    registered step labels.
5.  If a Token name was specified in any field, decide how the token
    value must be set.
    a.  The Token value could be set by a String to send command in a
        previous script step.
    b.  The Token value might have been set by a job that ran
        previously, or it can be set manually.
    c.  The Token value can be determined at the time this step is being
        executed by adding Screen Capture Definitions for this screen
        format and assigned a Captured Data Response rule that will
        execute the SETDYNVAR command (explicitly, or implicitly using
        the Store To-\> field) to set the Token value. (Refer to a
        description of Captured Data Response Rules above.)
6.  Go back, as necessary, and apply labels to any additional steps that
    will be used as branch-to points, taking note of each Script Name
    and Label.
7.  Audit the resulting logic using option 9=flow chart from the
    Operator Replay Script list display.
8.  Make sure the Operator Replay configuration parameters are set for
    \"Script job logging\" = Y (yes) in the test environment. (It is
    also a good idea to log scripts in the live environment, especially
    just after they are first installed for live operation.)
9.  Test the combined scripts in a safe, test environment.
    a.  One method for testing is to use the STROPRRPY command directly
        from a 5250 green screen workstation session command line. To
        use this method, start a new interactive job for each test to
        keep test sessions separated in the Operator Replay debug log
        member file. For interactive testing, the STROPRRPY command
        parameter JOBTYPE must be set to a value of \"A\".
    b.  It may also be useful, or even required, to use a test OpCon
        schedule to perform the script test. This might be necessary if
        any value from the OpCon environment will be communicated to the
        IBM i LSAM in order that the value will be available for Dynamic
        Variable tokens.
10. Use the Operator Replay menu function 3, Operator Replay logs, to
    examine the log detail of the test script job. Use the Search
    function in the view of the log content (F10=Log detail) to scan for
    each Label value and for each Token name that was specified in the
    test script(s). Make sure that the branching resulted in the correct
    work flow and that appropriate values were supplied for all Tokens.
11. Repeat the Script test job for each possible branching option, to
    make sure that expected results are obtained.

#### Script Branching Tools

When following the steps described above in the how-to outline, consider
the following tools that are available for defining and controlling
Operator Replay script branching.

-   A script step can be made optional by specifying a **Top** and/or
    **Bottom Control string** and setting the no-match option to S=Skip.
    If a step is skipped, the script execution program assumes that the
    next step in the script will process the current screen format that
    has been received. A pair of sequential script steps that both test
    the same control string could be set to opposite rules (one equal
    and one not equal), creating two different responses to the same
    screen format. Similarly, an unlimited set of sequential script
    steps could be defined that would each perform a different response,
    depending on the control string comparison results. However, when
    multiple steps are created to respond to a single screen format, it
    is critical that only one step will be allowed to send the final
    function key (or \<**Enter**\> key) that completes the response to
    the screen, because once a function is sent, the screen format is no
    longer active in the IBM i workstation buffer.

-   **Control strings** are used to determine whether a script step
    should be executed. Up to two control strings may be specified for
    each step record. Each control string has its own row, column and
    length value. If the length value is zeros, the script execution
    program assumes that the control value length is equal to the
    control characters specified, but not including any trailing spaces
    (blanks). If more than two control strings are needed to accommodate
    all possible test conditions, it is possible to enter more than one
    step record that will apply to the same screen format being
    processed as long as only one step record will actually perform the
    final function to send operation. Each step record may specify
    different rules for its pair of Top and Bottom control strings. For
    example, the **Compress Numeric** option may be set to Y=yes to
    cause the two values compared to be stripped of all non-numeric
    characters so that only the resulting absolute numeric values are
    used (decimal places are not indicated by a decimal point, so both
    values must used the same number of decimal places). Each Top or
    Bottom Control String has its own comparison rule. Any of the six
    boolean operators may be used:
    -   **EQ** = equal (=)

    -   **NE** = not equal (\<\>)

    -   **GT** = greater than (\>)

    -   **LT** = less than (\<)

    -   **GE** = greater than or equal to (\>=)

    -   **LE** = less than or equal to (\<=)

-   It is possible to create script steps that perform any one function
    available on a step, without actually sending a data string or a
    function key to the IBM i workstation processor. In fact, it is
    allowed to create a script step that does nothing, although the
    script analyzer flow chart tool will display a warning message if
    such a step is found. The LSAM script execution program continues to
    process step records and execute only the individual instructions
    found on each step; it will not respond to the current workstation
    screen format until either a string to send or a function key to
    send is found in a step. Once a function key to send is found,
    processing for the current screen format is completed and any
    subsequent steps in the script will be assumed to apply to the next
    screen format received.

-   An optional **label** value may be applied to any script step. Label
    values are ignored unless they are referred to by a branching
    instruction in another step. Label values are required if a
    branching instruction is supposed to either (1) go to a different
    step in the same script, or (2) go to another script but start at a
    step that is not the first step in the target script.

-   Any script step may specify a branching instruction in the **Branch
    Type** field. A branching instruction will only be executed if the
    optional Top and Bottom Control Strings pass their comparison rules.
    If a branching instruction specifies a different script, that script
    must belong to the same user profile originally specified for the
    current job, otherwise the script will fail. There are two possible
    branch types: GOTO and EXSR.

    -   **GOTO**: Tells the LSAM script execution program to relocate
        its execution control point to a different step, perhaps in a
        different script. GOTO can cause a completely different script
        to take over the job, or it can cause the script execution to
        jump either ahead or back within the same script. The script
        execution program will not automatically return to the point
        where a GOTO branch is executed; the program stays within the
        same level of execution (refer to EXSR for a definition of the
        execution level).

    -   **EXSR**: Tells the LSAM script execution program to mark the
        current step as a return point, increase the nesting level
        counter to the next highest level and then begin executing
        script steps at the specified script and step label. Whenever
        the target script of an EXSR instruction reaches its last step,
        the script execution program will return to the exit point,
        decrease the nestling level counter by one and resume execution
        of the original script at the next step after the EXSR
        operation. It is possible to have the target of an EXSR branch
        also execute its own EXSR instruction. When this happens, it is
        called nesting of script levels. The LSAM script execution
        program allows up to nine (9) nesting levels. If a series of
        connected scripts attempt to nest EXSR instructions to deeper
        than nine levels the script execution job will fail. The script
        analysis flow chart tool can be used before script execution to
        help prevent this error, but if Dynamic Variable Tokens are used
        for the Branch-To Script or the Branch-To-Label, the flow chart
        tool will not be able to discover the true number of nesting
        levels.

-   **Branch-To Script**: Either type of branch instruction may
    optionally use the Branch-To Script field to tell the LSAM script
    execution program to start using a different script. If this field
    is left blank, the program assumes that the target of the branch
    instruction will be found within the script that is currently being
    executed.

-   **Branch-To Label**: Either type of branch instruction may
    optionally use the Branch-To Label field to specify the step in the
    target script where execution will continue. If no label is
    specified, the program assumes that the first step in the named
    script should be the next step to execute. It is good practice to
    always specify a Branch-To Label value. Using labels on script steps
    helps to assure that the intended script logic will not change in
    case changes are made to any script that is a target of a branching
    operation.

#### Risks in Script Branching Logic

Script branching logic is very powerful, but it can also create a risk
of unexpected results. The script flow chart option 9 on the Operator
Replay Scripts list display should always be used to carefully audit the
resulting step flow whenever branching instructions are used. The flow
chart display (which may also be printed as a report using F9=Print)
will show as many error messages as the program can detect. However, if
Dynamic Variable Tokens are used for the Branch-to script or the
Branch-to label, the flow chart display routine will not be able to
anticipate the value of the Token at execution time, so it cannot
predict where the script execution will flow.

 

  ------------------------------------------------------------------------------------------------------------------------------ -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White \"X\" icon on red circular background](../../../Resources/Images/warning-icon(48x48).png "Warning icon")   **WARNING:** [It is critical that scripts combined with branching logic be tested in a safe test environment before being implemented in a live environment. The results of branching logic cannot always be predicted by the flow chart tool.]
  ------------------------------------------------------------------------------------------------------------------------------ -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

Here is a list of some of the features of Operator Replay Script Steps
that can create risky procedures:

-   Using a Dynamic Variable (or older Operator Replay) **Token** for a
    variable value in either the Branch-to script or the Branch-to label
    can create a powerful script that can adapt to varying conditions on
    a given screen display format, but great care must be taken to
    control the Token value, since [Tokens can be changed by commands     executed elsewhere]{.ul} in the script or by Captured Data Response
    Rules.

-   Not specifying a **Branch-to label** tells the script execution
    program to assume that the first step in the Branch-to script should
    be selected. [This may create a risk of unpredictable results if     anyone later changes the first step in the target script.]{.ul} For
    this reason a label value should be assigned to any step that will
    be the target of a branching instruction. Assigning a label helps to
    alert other staff members that a script step is the target of script
    branching.

-   Using the GOTO branch type to route the script to a step with a
    lower sequence number in the same script can [create a logic     loop]{.ul} that would, in theory, cause the script execution to
    never end. To prevent this problem, there is an Operator Replay
    Control option for specifying the maximum number of recursive loops
    allowed: the **Script loop detect limit**. If this number of
    recursive loops (repeated execution of the same script steps) is
    exceeded, the script execution program will abort script processing
    and cause the script job to fail. Recursive script execution applies
    also to branches into other scripts. It is allowed to branch to the
    same step (or an earlier step) in the same script multiple times,
    because sometimes a script will have been written so that it can be
    re-used as a utility subroutine by various other scripts. In this
    case, the number of recursive script calls allowed should be set
    high enough to make the subroutine script useful, but a reasonable
    limit should be applied in order to avoid a run-away job. The script
    flow chart tool identifies every script loop it can detect in order
    to prevent excessively long flow charts. But the flow chart tool
    cannot detect when using a variable Token might create a loop during
    live execution. In this case, the live execution will still be
    protected by the Script loop detect limit control field, protecting
    the system from a run-away job.

-   It is possible to register multiple script steps to handle a single
    screen display format. This rule makes it possible to specify more
    than two control string comparison rules for a single display
    format. There are many other uses for this rule, such as creating
    multiple branching instructions that are each qualified by different
    control strings, or to link to different sets of Screen Capture
    Definitions (and Response Rules). It is also possible to register
    different Strings to send or Functions to send that can be selected
    based on Control string qualification. But the risk of this
    technique is that if there is ever a case where none of the steps
    qualifies to handled a given screen format, then the [script     execution could become un-synchronized with the flow of screen
    display formats]{.ul}, resulting in unpredictable responses to
    screens and possibly damaging the integrity of the application
    database.

#### Receive Timer Override with Branching

The Receive timer override field on a Script Step applies to the screen
format that each Step is assigned to manage. To make this timer override
effective before the screen format is actually received (that is, while
the Script execution program is waiting for the next display format to
arrive), the Script execution program must read ahead from the last Step
record that was just processed. The read-ahead of the next Step is
required in order to obtain the override timer wait value that should
apply to the next pending screen format.

 

When branching logic is used, this creates an impact on the Receive
timer override. The Script execution program does not attempt to read
ahead to a Branch-to Script or Step in order to obtain the optional
Receive timer override value. (The reason for this is that there is no
guarantee that the branch instruction is completely defined until the
next screen format has been received and processed to determine the
response.) If Step 3 of Script A has a branch operation to Step 2 of
Script B, the Script execution program actually uses the Receive timer
override value from Step 4 of Script A, even though the program will be
waiting for the screen format that will be processed by another Script.

 

To overcome this problem when using branching logic, it may sometimes be
necessary to add an extra Step record after a Step that includes a
branching operation. In the example above, a Step 4 record can be added
to Script A only for the purpose of registering a Receive timer override
value. It is not necessary that this Step 4 record perform any other
action. The Step 4 record will be read in advance, but it will never be
processed, or, if it is processed because branching is variable and
causes the next step to be processed, then this no-action Step record
will simply pass through the Script execution program with no other
effect, and in this case a Step 5 record would be required to actually
respond to the pending screen format.

#### Using Dynamic Variables Instead of Operator Replay Tokens

There are two different tables of Token-named variables in the IBM i
LSAM database: the older Operator Replay token/variables and the newer
LSAM Dynamic Variables.

-   The Operator Replay Token/Variable Management (LSAM menu 4,
    option 4) maintains the variables that were originally developed
    just for Operator Replay Script Steps. The Operator Replay
    configuration function (LSAM menu 4, option 7) shows the reserved
    character that is used to identify an Operator Replay Token. The
    configuration function could be used to change that reserved
    character, although it should not be changed unless this is
    critically important, such as when there is a conflict with a
    non-English language database.
-   The newer LSAM Dynamic Variables are maintained by a menu-driven
    program that is accessible from many of the LSAM menus, or by the
    SETDYNVAR command. The reserved characters that identify Dynamic
    Variable Tokens are displayed, and can be changed in the Job
    Tracking Configuration function (LSAM menu 1, option 7). It is
    strongly recommended that these reserved characters not be changed
    because they are coordinated with the function of variable
    substitution used by OpCon in its job and schedule management.

SMA recommends using only Dynamic Variables in the Operator Replay
Script Steps. Dynamic Variables are fully supported in many ways by both
the LSAM Agent software and by OpCon, whereas the older Operator Replay
variable/token feature is limited, it will not be further enhanced, and
it is retained only for compatibility with existing client
installations.

Dynamic Variable tokens are supported by many of the fields that define
a Script Step. These fields are noted in the Screens and Windows
section, below.

#### Flow Chart of Script Branching Logic

The Operator Replay Script list function (LSAM menu 4, option 2) offers
a list Option value of 9=Flow chart that can be used to display or print
an analysis of Scripts and Steps. This section of the document explains
the contents of the flow chart display and it helps to illustrate the
effect of using the branching logic fields in the Script Steps.

 

Option 9 may be used even on single Scripts, but it is most useful when
any branching logic (GOTO or EXSR) operations have been added to Script
Steps. The flow chart program shows a graphic representation of the
logic flow that results from branching across Scripts and at the same
time it edits the branching instructions and flow for many types of
errors and warnings that could cause the linked Scripts to fail.

 

The flow chart program has the following limitations:

-   It does not try to replace Operator Replay or Dynamic Variable
    tokens with real values in the Branch-to Script or Branch-to Label
    fields because it is not possible to determine what those values
    will be at execution time. Instead, any branching instructions that
    use tokens will be shown in the flow chart with a warning message on
    the next line and the flow chart will continue documentation from
    the next Step in the Script as if no branching had occurred.
-   It does not reflect how Script logic could change depending on Top
    and Bottom Control strings, such as when more than one Step record
    is registered to respond to a single display format. Instead, if a
    Function to send is not present, the program will register that
    condition in order to call attention to the need for (1) a manual
    analysis of the flow logic and (2) the need to examine this point in
    the flow in the Operator Replay log display as the Script is being
    tested.
-   It does not repeat the flow analysis of the same section of a Script
    more than once. The flow chart program uses logic very similar to
    the live Script Execution program to detect when the flow will loop
    back to the same Step, or a lower Step sequence number, in a Script
    that was previously analyzed at that point. When it detects a loop,
    it prints a warning message, and then the program goes on to the
    next step in the Script as if a branch had not occurred, in order to
    complete its evaluation of all Script Steps.

The following limited example of an Operator Replay Script branching
flow chart illustrates the format and content of the display delivered
by the Operator Replay Script list display, option 9=Flow chart. (Note:
The following example shows more than 24 lines on the display in order
to illustrate more examples of flow. The report resulting from function
key F9=Print would show all the lines and also up to 132 characters in
width - revealing the extra characters that are cut off from script step
0035.)

 

Notice in the following example that whenever the GOTO branching
instruction is encountered, the flow chart analysis program will display
the full analysis of the Goto-Script in a separate analysis section
below. This reporting method helps to eliminate redundant reporting in
case the same Script name is used more than once in a complete job
analysis.

Operator Replay Script Flow Chart

  ------------------------------------------------------------------------------------------------------------------------------------------
  [ OPRR11R1]{style="color: #008000;"}                Operator Replay Script Flow Chart                [00/00/00]{style="color: #008000;"}    USERNAME                    Starting Script: TESTONE                     03:51:48
                                                         Search content: \_\_\_\_\_\_\_\_\_\_ 
   Script/Label  BR/SEQ\# TIMER Description/Command
   TESTONE                     Demo
   \|..              0020          Function key only: {FK}
   \|..              0035          LSAMENU ENV(GAL033120) MENUNBR(0)\~FE\`  \<F-Key:{F 
   \|..              0040    60    DSPLIBL \*PRINT\~FE\`  \<F-Key:ENTER\>
   \|..            EXSR            Script: {SCRTWO}    Label: {LBL2-1}
   \|..                            WARNING: Cannot analyze branch Token
   \|..            EXSR            Script: SCRIPT7890  Label:
   +SCRIPT7890                  Description - this script nested at level 2
   \|\|..TARGETLBL0   0010          COMMEND SYNTAX 10
   \|\|..             0020          COMMAND SYNTAX 20
   \|\|..             GOTO          Script: SCRIPTABCD Label: TARGETLBL1
   \|\|..             \-\--\>          (See analysis of GOTO Script/Label below)
   \|-             RETURN
   TESTONE                     Demo
   \|..              0050          SIGNOFF\~FE\`  \<F-Key:ENTER\>
   END
   
   SCRIPTABCD                  Description dddddddddddddddddddddddddddddddd
   \|..              0010          (sample bypassed step)
   \|..TARGETLBL1    0020          COMMAND SYNTAX 20
   \|..              0030   120    Wait timer override only
   \|..              0040          WARNING: Step with no action
   \|..TARGETLBL2    0050          Label location only
   \|..              0060          LAST STEP COMMAND
   END
   
  Bottom
   F3=Exit   F5=Refresh   F9=Print   F12=Cancel   F16=Search next
  ------------------------------------------------------------------------------------------------------------------------------------------

###### Fields

+---------------------+-----------------------------------------------+
| Field               | Description                                   |
+=====================+===============================================+
| Search content      | Type any text value in this field and press   |
|                     | \<**Enter**\> or \<**F16**\> to start a new   |
|                     | search. The entire content of a flow chart    |
|                     | line is searched, including the text that may |
|                     | not fit on the 80-column interactive display  |
|                     | but which would show on the 132-column        |
|                     | printed report.                               |
+---------------------+-----------------------------------------------+
| Script/Label        | Either a Script name or an (optional) Step    |
|                     | Label value is shown in this column. Lines    |
|                     | are indented depending on the nesting levels  |
|                     | (up to 9) that may occur when an EXSR         |
|                     | branching instruction is in effect. This      |
|                     | column also shows vertical bars equal to the  |
|                     | number of the nesting level for each Step in  |
|                     | the current Script. Other signs that can      |
|                     | appear in this column include:                |
|                     |                                               |
|                     | -   .. Two dots are used to show that the     |
|                     |     line is information about a Step within a |
|                     |     Script.                                   |
|                     | -   \+ A plus sign is used whenever there is  |
|                     |     a change in the current Script name from  |
|                     |     a GOTO or EXSR branch.                    |
|                     | -   \- A minus sign (or dash) is used         |
|                     |     wherever the nesting level decreases by   |
|                     |     one because the end of a Script implies a |
|                     |     RETURN from an EXSR branch. This sign     |
|                     |     also indicates a return to a previous     |
|                     |     Script name.                              |
+---------------------+-----------------------------------------------+
| BR/SEQ\#            | -   Branching operation: EXSR or GOTO         |
|                     | -   SEQuence \#: Shows the sequence number    |
|                     |     assigned to each Step.                    |
|                     | -   \*\*\*\*: Four asterisks appear in place  |
|                     |     of a sequence number to indicate certain  |
|                     |     errors. Refer to the text under the       |
|                     |     Description column for the error          |
|                     |     information.                              |
|                     | -   ++++: Four plus signs are used for errors |
|                     |     like an invalid change in User Name when  |
|                     |     a branching instruction leads to a Script |
|                     |     that has a different User name than the   |
|                     |     original Script. Changing of Script User  |
|                     |     names is not allowed.                     |
+---------------------+-----------------------------------------------+
| TIMER               | The optional Receive wait timer override      |
|                     | value appears when assigned.                  |
+---------------------+-----------------------------------------------+
| Description/Command | -   Scripts: The description of the Script is |
|                     |     displayed.                                |
|                     | -   Steps: The command syntax executed by a   |
|                     |     Step is displayed (not the Comments)      |
|                     | -   Branching: An extra line is shown when a  |
|                     |     Step includes a branching instruction.    |
|                     |     This column displays the target Script    |
|                     |     and Script label.                         |
|                     | -   other: Warning or Error message text may  |
|                     |     appear in this column.                    |
+---------------------+-----------------------------------------------+

:  

##### Flow Chart Diagnostic Errors

The flow chart program cannot discover every error or illogical
condition that can occur during live execution of a Script, but it is
useful for reporting obvious errors and for highlighting Script
conditions that could be possible points of failure. The error and
warning messages that can appear in the flow chart are listed in the
following table.

  Message Text                                                 Description
  ------------------------------------------------------------ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Branch rule only                                             A Script Step has no String to send or Function key to send, only branching instructions.
  Function key only                                            A Script Step has no String to send, but does have a Function key to send.
  Label location only                                          A Script Step has no String to send, no Function key to send and no branching operation, only a Label assigned to it so that it serves only as a target for branching instructions from other Steps.
  Wait timer override only                                     A Script Step has no other field value assigned except for the Receive wait timer override value.
  Label location and timer override only                       A Script Step has no other field values assigned except for the Label field and a Receive wait timer override value.
  WARNING: Step with no action                                 A Script Step has no String to send, no Function key to send, no branching operation, no Label assigned and no Receive wait timer override value. This Script Step has no function, it may need maintenance.
  WARNING: Nesting more than 9 levels                          When one Script uses the EXSR branching operation to run another Script this is called nesting. Nesting means that the Script execution program must remember where to return after the target Script reaches its end. The Script execution program can store up to nine levels of nesting information, so nesting EXSR operations deeper than nine levels is not allowed.
  WARNING: Cannot analyze branch token                         The flow chart program does not know what the value of an variable token will be at execution time, so it does not attempt to evaluate the flow of a Script Step that uses tokens in either the Branch-to Script field or the Branch-to Label field. Instead it simply lists the Step along with this non-critical warning message, and then it continues to analyze the next Step in the Script.
  WARNING: Branch Script/Label not found                       This error is displayed when a branch operation specifies a Script name and/or a Label name that cannot be found in any of the Script master files. This error must be fixed before a Script can actually be executed.
  WARNING: Branch loop detected, skipping repeat               The flow chart program uses the same logic as the Script execution program to detect whenever a branch operation will cause the same Step to be executed in a Script more than once. The flow chart program will not list the same Step twice, in order to limit the size of the analysis display or report. It is allowed to loop to the same Script Step more than once, but the Script execution program uses the Operator Replay control file value for the Script loop detect limit to determine if Script execution is in a run-away loop that must be stopped to protect the system.
  WARNING: Branch-to Script User does not match, fatal error   When branching operations are used, the target Script must be registered for the same User profile as was specified for the original Script. Actually, the flow chart uses the Script master record to determine the original User name, but at run time, the Script execution program allows the USER parameter of the STROPRRPY command to override the User name. In this case, if one Script tries to branch to another Script whose registered User name does not match, the Script execution job will be forced to fail as a security measure. Therefore, in practice, when branching is being used, the registered User name of the original Script should match the intended job user name in order for the flow chart program edits to be useful.

  : Flow Chart Diagnostic Messages

##### Analysis of Example Flow Chart

The example of a Script flow chart above does not include every possible
circumstance or error message. If the actual flow chart on display is
not clear, please contact SMA Support and ask questions. This flow
charting tool is considered a very important proof step when using
Operator Replay branching logic, and SMA wants to help assure that the
system and its database are well protected.

 

Each of the following points of information about the flow chart example
above help to illustrate one or more features of Operator Replay
scripting. Some of the information appearing in the flow chart example
is similar to the data illustrated in the Operator Replay Log example
below, where more information about those features may be found.

 

A separate example of the printed flow chart, obtained by pressing
F9=Print from the flow chart display, is not provided in this document
because the output is identical, with the exception that the printed
report provides up to 132 characters per line.

-   The first Script name appearing in line one of the flow chart is the
    same as the Starting Script name shown in the header lines of the
    flow chart.

-   The first Step in the flow chart illustration appears with sequence
    number 0020. Although the system default for a first Step in a
    Script would be 0010, there is no guarantee that the first sequence
    number of a Script will always be this number, due to changes that
    can be made. This is one reason why it is important to use the Label
    field whenever a step will be the target of a branching instruction.
    Do not assume that the first step in a Script will always remain
    what it was when the branching was first defined. Using Labels helps
    to assure that Script branching will always be predictable.

-   The first EXSR operation shows that Operator Replay Tokens were
    entered for the Branch-to Script and the Branch-to Label. In this
    case, the flow chart program cannot determine what the token values
    will be at execution time, so it simply logs a warning on the next
    line and then it continues to analyze the remaining Steps in the
    current Script, as if no branching had occurred. Obviously, this
    flow chart is not likely to be a 100% match to the logic that will
    be executed at run time.

-   Another EXSR operation appears immediately after the previous Step.
    When this occurs, it suggests that a Top or Bottom Control String
    might have been used to qualify which of the two EXSR operations
    should be executed, depending on the content of the screen display
    format at run time. However, it is possible that both EXSR
    operations would be executed, and the flow chart was simply unable
    to evaluate what would happen with the first operation.

-   The second EXSR operation shows that a Branch-to Script name was
    provided, but the Branch-to Label is blank. This is not recommended.
    Scripts are more reliable if Labels are always used for branching.
    However, the system supports this condition, and the assumption is
    that the first Step of the target Script will be executed by
    default. The example shows that the target Script SCRIPT7890 begins
    with a Step of sequence number 0010. Notice that the flow chart
    shows a label value at this Step sequence number 0010. This means
    that someone used good practice in assigning the label value. The
    flow chart program helps to discover that the second EXSR operation
    step should be updated to use the available Label value.

-   As the second EXSR operation is evaluated, the flow chart program
    adds a vertical line to the Script/Label column to show that the
    Script logic is currently nested at the second level. This implies
    that eventually the Script will RETURN to the first, original
    nesting level.

-   At Step sequence number 0020 of SCRIPT7890, a GOTO operation is
    found. The flow chart program shows the target Script and Label
    values. The example illustrates that the Label TARGETLBL1 is found
    at Step sequence number 0020 of the new Script. Although it is not
    reliable to assume anything about a Step sequence number, if
    SCRIPTIABCD is assumed to start with Step sequence number 0010, then
    the example illustrates that branching can cause a Branch-to Script
    to start execution somewhere in the middle of the series of
    available Script Steps.

-   The analysis of the new Script name, SCRIPTABCD, is performed later
    in the analysis report. If the original script qualified the step
    with the GOTO instruction, the branch might not have been executed.
    Therefore, the report continues with the analysis of the original
    script, showing the remaining steps.

-   SCRIPTABCD includes examples of two warning messages. First is a
    Script Step number 0040 with no actions of any kind. This means it
    has no String to send, no Function to send, no Branching
    instructions and no Label assigned to it. In other words, this Step
    has no function at all, except as a place holder, perhaps. The
    warning message suggests that maybe something has been overlooked at
    this step. However, script steps are not required to perform any
    action; it is allowed to have a script step that does nothing.
    Script steps like this may be used to store a receive timer
    override, or they may serve as a connecting point that links to
    Captured Data Rules and Response Rules. Compare this to Step number
    0050, which also has no actions to perform, but this Step does serve
    as a potential target for a branching operation of another Script.

-   Finally, after Step sequence number 0060 of SCRIPTABCD is executed,
    the flow chart analysis program discovers that this is the last Step
    in that Script. When the last Step is reached, the program checks to
    see if the Script execution has been nested to a level higher than
    one. In this case, the implied RETURN operation shows that the
    execution was at nested level two, so the program returns to the
    first nesting level and resumes execution of Script TESTONE at the
    next step after the one that performed the EXSR operation (sequence
    number 0040, near the top of the list). In this example the only
    step remaining is Step sequence number 0050, which will execute a
    SIGNOFF command, ending Script execution. Note that if a SIGNOFF
    command is encountered while Script execution is nested at levels
    above one, the Script job will still end at that point and any steps
    remaining in the Scripts at lower nesting levels will be ignored.

#### F11 = Show/Hide COND (Conditional Control Strings)

It is possible to enhance the flow chart display by optionally including
(or excluding) any operational Control String logic. Two report lines
are added for each of the Top and Bottom Control strings, that is, if
either string has a non-blank compare value or a non-zero compare length
(which are the two conditions that make a Control string active). An
example follows showing how the flow chart changes when F11 is pressed.
Press \<**F11**\> again to remove the extra lines.

Script Flow Chart Display After F11=Show COND

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  [OPRR11R1]{style="color: #008000;"}               Operator Replay Script Flow Chart               [00/00/00]{style="color: #008000;"}   [USERNAME]{style="color: #008000;"}                   [Starting Script:]{style="color: #008000;"} [ACHUPTEST]{style="color: #ff00ff;"}                  [14:07:57]{style="color: #008000;"}
                                               [Search content:]{style="color: #008000;"} \_\_\_\_\_\_\_\_\_           Script/Label  BR/SEQ\# TIMER Description/Command
  ACHUPTEST                   Test step 80 of ACHUPLOAD
  \|..              0010          Function key only: ENTER
  \|..                   COND: S=skip (if not), CMPNUM( )
  \|..                          TOP = R: 1 C:31 L:    EQ
  \|..                          Sign-on Information
  \|..              0020          Function key only: ENTER
  \|..                   COND: S=skip (if not), CMPNUM( )
  \|..                          TOP = R: 1 C:28 L:    EQ
  \|..                          Display Program Messages
  \|..              0030          Branch rule only
  \|..                   COND: S=skip (if not), CMPNUM( )
  \|..                          TOP = R: 1 C: 2 L:    EQ
  \|..                          not a match
  \|..           GOTO             Script:             Label: ENDJOB
  \|..           \-\--\>                (See analysis of GOTO Script/Label below)  
  \|..              0080          Function key only: HOME
  \|..           GOTO             Script: ACHUPTEST   Label: {WAITDYNV}
  More\...
  F3=Exit   F5=Refresh   F9=Print   F11=Show COND   F12=Cancel   F16=Search next
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### Viewing Operator Replay Logs

The Operator Replay log files capture all the interactive input and
output that occurs during script execution. Logging of Operator Replay
scripts is optional and controlled by the Operator Replay configuration
option called \'\'Script job logging\". This option can be set to \"N\"
(no) after scripts have been verified in order to improve the
performance of the scripts and reduce performance impact on the system.
When a new script is being used the first few times, or if a problem
arises with script execution, SMA recommends that script logging be set
to \"Y\" (yes). Script log file history retention is restricted to the
number of days specified in the general LSAM Parameters.

 

Each Operator Replay script step is displayed showing the screen images
received and the functions executed on the IBM i computer. There is one
Operator Replay log entry for every unique job that has executed an
Operator Replay script. Each log entry provides access to a unique data
member in the script log file. There is typically one script job per log
file data member, but it is possible for multiple script jobs to appear
in the same log file data member. This occurs when the Operator Replay
command specifies the JOBTYPE of \"A\" for interactive green screen
testing of Operator Replay scripts. In this case, multiple script jobs
are recorded back to back in a single log file data member unless the
tester logs off and starts a new IBM i workstation interactive job
before each new script test.

 

The view of log file entries for each screen format received is useful
for debugging scripts. The portion of the log entry that represents a
screen format is marked with row numbers to the left and column numbers
above and below the log content display. Function keys may be used to
window left and right so that the entire screen format can be viewed and
carefully analyzed. The row and column numbers presented in the log file
view are accurate for defining the Top and Bottom Control Strings of a
Script Step and also for Screen Capture Definitions and Response Rules.

 

[View Operator Replay Log Files]{.ul} 
1.  In the command line, enter **STRSMA**. For more information on
    STRSMA command parameters, refer to [The STRSMA     Command](Components-and-Operation.md#The).
2.  Enter **4** to choose the **Operator Replay menu** in the SMA Main
    Menu.
3.  Enter **3** to choose the **Operator Replay logs** option in the
    Operator Replay Menu.
4.  \<**Tab**\> to the desired log file.
5.  Enter **5** next to the selected replay log file under the Opt
    column.
6.  Press \<**F10**\> to view the log detail.
7.  Within the Operator Replay log display, the available function keys
    are uniquely displayed near the upper left-hand corner.
8.  Use function key \<**F24=More keys**\> to see all available function
    keys.
9.  The Search field at the upper right-hand corner of the display helps
    to find details of script execution. Press \<**Enter**\> or
    \<**F16=Search**\> after typing a new value in the Search field. If
    a previous search argument is shown in pink to the right of the
    Search input field, then function key \<**F16=Search**\> may be used
    to find the next occurrence of the same value in the log data
    member.

#### Operator Replay Log Example

The Operator Replay Display Log example below shows an artificially
extended example that includes the last few lines of output from one
display panel, followed by a String To Send entry, and then another
entire screen output sequence followed by a Function To Send entry. The
Operator Replay Sent data is black in this example, but the actual
display shows these entries in white or highlighted (for non-color
displays). Other colors are used to separate the various types of log
entries made as the Operator Replay script execution program documents
all of its actions, as follows:

-   Green = reserved for IBM i workstation management output to the
    display screen, that is, the content of the screen format currently
    on display.

-   Yellow = a log marker line after the last line (24) of display
    format content, including the timestamp of when the screen format
    was received.

-   White = String to send, and Function to send.

-   Blue = Script navigation entries (Script name, sequence number and
    optional label value), logging of Operator Replay Token/Variable
    replacement actions.

-   Pink = Script branching, such as GOTO, EXSR and RETURN (from EXSR).

-   Red = Script error messages.

Most log data will appear to show the same screen format multiple times,
usually twice per format. This happens because the Operator Replay
script execution program performs the String to send action separately
from the Function to send action. The screen format content is logged
when it is first received, before any actions are performed. After the
IBM i workstation management receives a String to send, it typically
echoes back the screen format so that the keyboard data will appear on
the screen. More than one String to send operation could be performed
before a Function to send operation is completed. Sending a function key
(which can be the \<**Enter**\> key) completes the Operator Replay
response to an individual screen format, although the Operator Replay
script execution program may still perform branching operations from the
same Script Step record after the function key is sent.

Operator Replay Display Log

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  [OPRRPYR10]{style="color: #008000;"}                 Operator replay display log                  [00/00/00]{style="color: #008000;"}   [USERNAME           Environment:]{style="color: #008000;"} [SMADEFAULT]{style="color: #ff00ff;"}  [Version:]{style="color: #008000;"} [03.31.20]{style="color: #ff00ff;"}          [16:33:48]{style="color: #008000;"}
  [Script Name: ]{style="color: #008000;"}TESTSCRIPT  [Date: ]{style="color: #008000;"}00/00/0000  [Time: ]{style="color: #008000;"}12:31:42  [Log mbr: ]{style="color: #008000;"}O123456   [F12=Cancel  F19=Left  F20=Right  F24=More keys   ]{style="color: #0000ff;"}Search: [          ]{style="color: #ffcc00;text-decoration: underline;"} [LastValue]{style="color: #ff00ff;"} 
      1\...5\...10\....5\...20\....5\...30\....5\...40\....5\...50\....5\...60\....5\...70..74
   21
   22[  F3=Exit   F4=Prompt   F9=Retrieve   F12=Cancel   F13=Information Assistant]{style="color: #008000;"}    23[  F23=Set initial menu]{style="color: #008000;"}
   24[                                          (C) COPYRIGHT IBM CORP. 1980, 2003]{style="color: #008000;"}    12:31:45 ====================================================================
   12:31:45 Scr:TESTSCRIPT Seq:35 Lbl: Lvl:1
   Top: Rule(EQ) R(1) C(72) L(8) Num(Y) String(\|SERNO\|)
   Found: BufPos(72) Len(8) String(S1234567)
   12:31:51 Replacing token SERNO with value S1234567
   12:31:51 New control string: S1234567
   12:31:51 Found number: 1234567
   12:31:51 CaptID: \'MACHINE SERIAL NUMBER\' Seq:010    (Cursor+F13=View log) ![F13: Put Cursor Arrow](../../../Resources/Images/IBM-i/Arrow.png "F13: Put Cursor Arrow")
   12:31:52 STRING TO SEND  \--\> SMAGPL/STRSMA ENV(SMADEFAULT) ANIMATE(\*NO)
   01  [MAIN                           OS/400 Main Menu]{style="color: #008000;"}    02[                                                               System:   S12]{style="color: #008000;"}
   03    [Select one of the following:]{style="color: #008000;"}    04
   05[       1. User tasks]{style="color: #008000;"}    06[       2. Office tasks]{style="color: #008000;"}
   07[       3. General system tasks]{style="color: #008000;"}    08[       4. Files, libraries, and folders]{style="color: #008000;"}
   09[       5. Programming]{style="color: #008000;"}    10[       6. Communications]{style="color: #008000;"}
   11[       7. Define or change the system]{style="color: #008000;"}    12[       8. Problem handling]{style="color: #008000;"}
   13[       9. Display a menu]{style="color: #008000;"}    14[      10. Information Assistant options]{style="color: #008000;"}
   15 [     11. iSeries Access tasks]{style="color: #008000;"}    16
   17[      90. Sign off]{style="color: #008000;"}    18
   19[  Selection or command]{style="color: #008000;"}    20[  ===\> SMAGPL/STRSMA ENV(SMADEFAULT) ANIMATE(\*NO)]{style="color: #008000;"}
   21
   22[  F3=Exit   F4=Prompt   F9=Retrieve   F12=Cancel   F13=Information Assistant]{style="color: #008000;"}    23[  F23=Set initial menu]{style="color: #008000;"}
   24[                                          (C) COPYRIGHT IBM CORP. 1980, 2003]{style="color: #008000;"}   [12:32:15 ====================================================================]{style="color: #ffcc00;"}
   12:32:17 Original Function Key:  {FK}
   12:32:17 FUNCTION TO SEND\--\> ENTER
   12:32:18 EXSR Scr:\|SCRTWO\| Lbl:\|LBL2-1\| Lvl:1
   12:32:19 Replacing token SCRTWO with value TESTTWO
   12:32:19 Replacing token LBL2-1 with value LABEL2-1
   12:32:19 Scr:TESTTWO Seq:20 Lbl:LABEL2-1 Lvl:2
   12:32:20 STRING TO SEND  \--\> SIGNOFF\~FE\'
   01  [S1234567           i 5 / O S   L S A M   M A I N   M E N U              0/]{style="color: #008000;"}   More\...
       1\...5\...10\....5\...20\....5\...30\....5\...40\....5\...50\....5\...60\....5\...70..74
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

If the String to send is longer than 48 characters, the log display will
show as many String to send entries as necessary to show the entire sent
string of data, in 48-character segments.

 

The log display shows only 74 characters of the screen format content at
a time in order to allow room for the row numbers to be inserted to the
left. Use function keys \<**F20=Right**\> and \<**F19=Left**\> to shift
the display window in order to observe all of the display content. The
column number header and footer will also shift with the display
content. (Note that the other entry types appearing on the display that
are not screen content do not shift left and right; they always remain
fully visible.) The log data member content begins after the column
heading line and it ends before the **More\.../Bottom** subfile
indicator on line 22.

##### Analysis of Example Log Content

The example log data member display above is artificially long in order
to illustrate many different types of possible log entries. The
interactive screen dialog shown above is not real, though it resembles
realistic possibilities.

 

The heading of the Operator replay display log screen includes
information about the script that was executing. The header information
continues until the top ruler line that shows column numbers. Included
in the header line is the name of the data member (example value is
O123456) which is stored in file OPRLOGF10. The Operator Replay Log
control record stores the name of this member, and the data member
contents are then made available for display and analysis using the
function key tools on this log display.

 

The yellow line labeled with timestamp 12:31:45 marks the end of the
last previous screen format received by the Operator Replay execution
program, at this point in the view of the log data. Following the yellow
end-of-format marker line is a blue line indicating the ID of the first
Script Step that will be used to respond to the current display format.
The example shows that the original Script name of TESTSCRIPT is still
the source of Steps to execute, the Step sequence number is 0035, there
is no label assigned to this step, and there is no Script branching in
effect at this point because the nesting level is still at 1 of the
original script name.

 

The next few log entries in blue illustrate what happens when a Top
Control String has been specified. The Top string is identified as
starting in Row 1, Column 72, for a length of 8. The comparison rule is
\"EQ\' (must be equal) and this Step is using Numeric string comparison
rules (instead of character strings). The log shows what is found in the
screen format at the specified location. In this example, an Operator
Replay Token has been used in place of the actual comparison string
value so the log entries show the Token replacement results, including
what happens when a Numeric comparison rule is applied. Notice that
although both the control string value and the found value include a
letter, the letter is not part of the final comparison because only a
compressed numeric string will be used for the Numeric comparison rule.
The \"Found number:\" entry in the log reveals the actual numeric value
that was used for the successful comparison.

 

After the Step is qualified by the Top Control String, the script driver
program checks for any linked Capture Data rules, plus any associated
Response Rules. This action resembles a human operator using their eyes
to examine the display content and then deciding what would be the
appropriate next action to take. Response Rules typically set Dynamic
Variable values, whose {TOKENS} are replaced in supported Step master
record fields before the script driver attempts to utilize the remaining
definition of each step.

 

If there is a \"CaptID:\" entry appearing in the log, it is possible to
put the screen cursor on this type of line and then press \<**F13**\> to
branch to a view of the Captured Data (and Response Rules) Log entries
in a different Agent log file. This permits the viewer to verify what
actions were taken by the Capture and Response module before the Step
actions were allowed to proceed.

 

After the step qualification and any Capture Data and Response Rules are
completed, the Operator Replay script execution program delivers the
String to send to the IBM i workstation manager. The log shows that the
24 lines of the same screen format are echoed back to the screen buffer
(maintained in the execution program), but with the String to send
characters inserted at the \"OS/400 Main Menu\" command line.

 

According to this example, the same Script Step, sequence number 0035,
specified a Function (key) to send, but it used a Dynamic Variable token
in the Function to send field. The log shows that the Operator Replay
execution program translated the token **{FK}** into an actual function
key mnemonic value of **ENTER**. Then the script execution program sent
the function key to the IBM i workstation manager.

 

But in this example, the Function to send was not the final instruction
from Script Step 0035. While sending a function key tells the IBM i
workstation manager that interaction with the last screen format is
completed, the Operator Replay script execution program does not yet
read for the next screen format that the workstation manager will
display. Instead, there is a Script Branching instruction to execute,
shown in pink.

 

The Script branching instruction was EXSR (execute subroutine), meaning
that the Operator Replay script execution program was told to find
another Script and start at the specified Step label, complete execution
of that Script until its end, and then return to the next Step sequence
in the original Script (TESTSCRIPT) at the Step after sequence number
0035.

 

The log shows that the EXSR branching operation used an Operator Replay
Token for both the Branch-to Script and the Branch-to Label. The log
shows the values found for each Token. After the Token variable
replacement, the next log entry shows that the Operator Replay script
execution program was able to find label LABEL2-1 within script TESTTWO,
and that the named label value was found at Script Step 20 (probably not
the first sequence number) in the target script. Now the Operator Replay
script execution program is ready to execute that Step 20 in Script
TESTTWO.

 

Even though the intention of an EXSR branching operation was that the
Operator Replay script execution program should eventually return to the
original Script name that started the job, the log shows that the
Branch-to target Step had a String to send of the SIGNOFF command. This
means that once this command is executed, the Operator Replay job will
end. Perhaps the Top Control String processed previously was an
intentional control value test of an optional Step, making it possible
to abort the Script but with a normal end of job status because a
SIGNOFF command will be requested.

 

One final important point illustrated in the String to send near the end
of this log display is the sequence of characters that follow the
SIGNOFF command. There is a tilde (\~) character, followed by the
letters FE followed by a backward accent (\') character. The two special
characters surrounding the FE are the Operator Replay cursor control
sequence identifiers, as recommended elsewhere in this topic. Inside of
these two special characters, the letters FE represent keyboard key
\"field exit\". In effect, this keyboard key typically causes the IBM i
workstation manager to make sure that the input field is completely
clear of other characters, following the SIGNOFF command. Using field
exit after a String to send is a good practice, especially when using
conditional Step execution or Script logic branching, because sometimes
the screen format may contain other data already typed into the current
input field, especially if an error is reported by IBM i after the
failure of a command to execute.

 

The Operator Replay cursor movement control characters are specified in
the Operator Replay configuration function (LSAM menu 4, option 7). The
previous default standard for the IBM i LSAM was to use a pair of curly
brackets { } as the cursor movement control characters. However, since
the LSAM introduced Dynamic Variables, the curly brackets have now been
reserved for that special purpose. Therefore, if a Dynamic Variable will
ever be used in an Operator Replay String to send (as explained above),
the cursor movement control characters must be different, otherwise the
Operator Replay script execution program will mistake the Dynamic
Variable Token as a cursor movement command. This is why SMA has now
implemented the tilde and the backward accent as a default
recommendation for the Operator Replay cursor movement control
characters. The Operator Replay configuration function, discussed below,
provides more explanation, including a description of an optional
utility function that can be used to automatically convert cursor
movement control characters in existing Operator Replay Scripts if it
ever becomes necessary to change the control characters (such as when
existing SMA clients upgrade the IBM i LSAM from a prior release and
wish to convert to the new standard for the cursor movement control
characters).

###### A Note About the STRSMA Command

The example above is an illustration of the command parameters for the
STRSMA command. The example shows:

-   That the ANIMATE parameter has been set to (\*NO) to avoid the
    two-second delay that occurs during the splash screen animation.
    (NOTE: Newer versions of the STRSMA splash screen no longer display
    animation. The ANIMATE( ) keyword of this command is now ignored.)

-   It does not show the requirement that the next sequential step in
    the script must be a simple ENTER function in order to bypass the
    LSAM sign on splash display and continue to the LSAM Master Menu.

-   The SEND process: after a data entry sequence has been sent, the
    system performs a screen update to echo back the command text. This
    occurs before the LSAM Operator Replay function transmits the
    Function key that causes the system to act upon the previous String
    To Send.

More recent versions of the IBM i LSAM include another command called
LSAMENU that can be used to directly access a given sub-menu within the
IBM i LSAM menu system, bypassing the login splash display. This command
can only be used if the current job\'s library list includes the LSAM
libraries, or if the command is qualified with its library location,
such as: SMAGPL/LSAMENU. When the LSAM library list is not in effect, it
is required to specify the LSAM environment parameter for the LSAMENU
command, for example: SMAGPL/LSAMENU ENV(SMADEFAULT).

## User Management (Multi-Purpose)

User Management is the LSAM function that defines user profiles that are
valid for use with Operator Replay scripts. (This maintenance also
supports other LSAM operations, such as executing FTP jobs.) Any valid
IBM i user profile may be used as long the user is granted all
privileges needed to perform every step that is included in a script.
Also make sure that the SMANET user profile is granted \*USE privilege
for every user profile that is registered for Operator Replay, if user
SMANET does not retain \*ALLOBJ authority.

### User Management for Operator Replay

For Operator Replay jobs, the user profile (user ID) that will be used
is assigned by an LSAM maintenance function. This is required in order
to be able to effectively store, retrieve, protect and enforce the
appropriate password for each user profile. Within the OpCon/xps EM, the
job master definition field for User ID is ignored by the LSAM for
Operator Replay jobs (this EM field will not be displayed in future
versions of the EM for Operator Replay jobs).

 

Unlike various other job types defined by the OpCon/xps EM, Operator
Replay jobs use a different strategy to manage job user authority. Once
an Operator Replay job has been started by the LSAM server programs
under control of the LSAM\'s own, privileged user profile, SMANET, the
Operator Replay script execution control program has been compiled to
run with security officer authority. This permits the LSAM to retrieve
and store job control data required for Operator Replay jobs. The user
profile that was specified for the Script is not actually used until the
point in processing where the Operator Replay control program is ready
to emulate the Script user logging on to a virtual workstation. This
approach allows the LSAM to have all the authority it needs to complete
its assigned task while still restricting the authority of the actual
Script job user according to normal IBM i rules. The compiled control
program authority allows Operator Replay to complete its functions even
when the LSAM server user SMANET may be required to operate with
restricted authority.

 

The authority of the Operator Replay Script User also applies to the
virtual workstation that must be used for an Operator Replay job. The
user profile assigned within the LSAM to the Script must have authority
to use whichever virtual workstation will be assigned to the job that
the LSAM\'s Operator Replay control job will start. Refer to additional
discussion of this topic under the section about [Managing Virtual Devices](#Managing), where the optional Telnet exit
program is described. The Telnet exit program is used for managing
restrictions on which user can use a device, and for eliminating
dependency on IBM i automatic creation of virtual display devices.

-   **Screen Title**: User Management
-   **Screen ID**: LSAUSRR00

###### Menu Pathways

Main Menu \> Operator replay menu (\#4) \> Operator Replay user (\#1)

###### Fields

  Field                   Description
  ----------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Position to User Name   To quickly search for a particular user, enter the first characters of the user name, and then press \<**Enter**\>.
  Opt                     \<**Tab**\> to a row in the table and type an option next to one or more user names, and press \<**Enter**\> to perform each option entered.
  User Name               The User Name specified does not have to exist when it is entered in the maintenance functions of this section, but it must be created as a valid IBM i user ID before it can be used by the LSAM.
  Description             A description that helps explain the identity and purpose of this user.

  :  

###### Options

-   **2=Change**: Type 2 in the **Opt** field next to the User Name(s)
    to be changed and press \<**Enter**\> to proceed to the Change User
    window.

-   **4=Delete**: Type 4 in the **Opt** field next to the User Name(s)
    to be deleted and press \<**Enter**\> to proceed to the Delete User
    confirmation window.

-   **5=Display**: Type 5 in the **Opt** field next to the User Name(s)
    to be viewed and press \<**Enter**\> to proceed to a detailed view
    of each record. The detail record display shows the entire user name
    when the name length exceeds 30 characters.

###### Functions

**F6=Add**: Press \<**F6**\> to proceed to the Add User screen.

#### Add User Screen

-   **Screen Title**: Add User
-   **Screen ID**: LSAUSRR00-1

###### Menu Pathways

Main Menu \> Operator replay menu (\#4) \> Operator Replay user (\#1) \>
F6=Add

###### Options

None

###### Functions

**F12=Cancel**: Quits the Add User window without adding new data to the
system.

###### Fields

\<**Tab**\> to move from one field to the next. Observe the rules in the
Add User Fields table (below) as new data is typed.

+-----------------+------------------+----------+------------------+
| Add User Fields |                  |          |                  |
+=================+:================:+:========:+==================+
| Parameter       | Default Value    | Required | Description      |
+-----------------+------------------+----------+------------------+
| User Name       | IBM i Name Rules | Y        | -   The User     |
|                 | (Refer to [IBM i |          |     Name         | |                 | Name             |          |     specified    |
|                 | Rules]           |          |     does not     |
|                 | (Configuration.h |          |     have to      |
|                 | tm#IBM2){.MCXref |          |     exist when   |
|                 | .xref})          |          |     it is        |
|                 |                  |          |     entered in   |
|                 |                  |          |     the          |
|                 |                  |          |     maintenance  |
|                 |                  |          |     functions of |
|                 |                  |          |     this         |
|                 |                  |          |     section, but |
|                 |                  |          |     it must be   |
|                 |                  |          |     created as a |
|                 |                  |          |     valid IBM i  |
|                 |                  |          |     user ID      |
|                 |                  |          |     before it    |
|                 |                  |          |     can be used  |
|                 |                  |          |     by the LSAM. |
|                 |                  |          | -   Long user    |
|                 |                  |          |     names may be |
|                 |                  |          |     entered for  |
|                 |                  |          |     other        |
|                 |                  |          |                  |
|                 |                  |          |    applications, |
|                 |                  |          |     such as an   |
|                 |                  |          |     FTP transfer |
|                 |                  |          |     job, but the |
|                 |                  |          |     LSAM         |
|                 |                  |          |     Operator     |
|                 |                  |          |     Replay       |
|                 |                  |          |     function is  |
|                 |                  |          |     currently    |
|                 |                  |          |     limited to   |
|                 |                  |          |     User Names   |
|                 |                  |          |     of only 10   |
|                 |                  |          |     characters   |
|                 |                  |          |     in length.   |
+-----------------+------------------+----------+------------------+
| Password        | IBM i Name Rules | Y        | IBM i may be     |
|                 | (Refer to [IBM i |          | restricted to 10 | |                 | Name             |          | characters as a  |
|                 | Rules]           |          | user password.   |
|                 | (Configuration.h |          | The first        |
|                 | tm#IBM2){.MCXref |          | character must   |
|                 | .xref})          |          | be alphabetic,   |
|                 |                  |          | and the          |
|                 |                  |          | remaining        |
|                 |                  |          | characters must  |
|                 |                  |          | be alphanumeric. |
|                 |                  |          |                  |
|                 |                  |          |                  |
|                 |                  |          |                  |
|                 |                  |          | **Note:** The    |
|                 |                  |          | LSAM only        |
|                 |                  |          | supports         |
|                 |                  |          | passwords up to  |
|                 |                  |          | 128 characters.  |
|                 |                  |          | However, the     |
|                 |                  |          | password length  |
|                 |                  |          | must be limited  |
|                 |                  |          | to what will be  |
|                 |                  |          | accepted by      |
|                 |                  |          | either the       |
|                 |                  |          | current version  |
|                 |                  |          | of IBM i, or by  |
|                 |                  |          | the target       |
|                 |                  |          | system (as when  |
|                 |                  |          | the User applies |
|                 |                  |          | to an FTP        |
|                 |                  |          | transfer job).   |
+-----------------+------------------+----------+------------------+
| Password        | None             | Y        | Must be exactly  |
|                 |                  |          | the same as the  |
| (to verify)     |                  |          | original         |
|                 |                  |          | password entry   |
|                 |                  |          | above.           |
+-----------------+------------------+----------+------------------+
| Description     | None             | N        | A description    |
|                 |                  |          | that helps       |
|                 |                  |          | explain the      |
|                 |                  |          | identity and     |
|                 |                  |          | purpose of this  |
|                 |                  |          | user.            |
|                 |                  |          |                  |
|                 |                  |          | SMA recommends   |
|                 |                  |          | providing this   |
|                 |                  |          | information.     |
+-----------------+------------------+----------+------------------+
| Device Name     | None             | N        | When the user    |
|                 |                  |          | will be          |
|                 |                  |          | restricted by    |
|                 |                  |          | IBM i object     |
|                 |                  |          | authority to     |
|                 |                  |          | just one virtual |
|                 |                  |          | display device,  |
|                 |                  |          | type the Device  |
|                 |                  |          | Name in this     |
|                 |                  |          | field. Leaving   |
|                 |                  |          | this field blank |
|                 |                  |          | tells the        |
|                 |                  |          | Operator Replay  |
|                 |                  |          | script driver    |
|                 |                  |          | (and the         |
|                 |                  |          | optional Telnet  |
|                 |                  |          | exit program)    |
|                 |                  |          | that this user   |
|                 |                  |          | will rely on     |
|                 |                  |          | either (1)       |
|                 |                  |          | automatic        |
|                 |                  |          | virtual device   |
|                 |                  |          | creation, or (2) |
|                 |                  |          | at least that    |
|                 |                  |          | one virtual      |
|                 |                  |          | display device   |
|                 |                  |          | is available for |
|                 |                  |          | allocation to    |
|                 |                  |          | this user\'s     |
|                 |                  |          | job.             |
|                 |                  |          |                  |
|                 |                  |          |                  |
|                 |                  |          |                  |
|                 |                  |          | Please refer to  |
|                 |                  |          | [Managing        | |                 |                  |          | Virtual          |
|                 |                  |          | Devices](#M      |
|                 |                  |          | anaging){.MCXref |
|                 |                  |          | .xref} near the  |
|                 |                  |          | end of the       |
|                 |                  |          | Operator Replay  |
|                 |                  |          | Scripts section  |
|                 |                  |          | for more         |
|                 |                  |          | information      |
|                 |                  |          | about when to    |
|                 |                  |          | use this Device  |
|                 |                  |          | Name field.      |
+-----------------+------------------+----------+------------------+
| IP Address      | None             | N        | When a Device    |
|                 |                  |          | Name is          |
|                 |                  |          | specified, this  |
|                 |                  |          | field is also    |
|                 |                  |          | required. The IP |
|                 |                  |          | Address tells    |
|                 |                  |          | the LSAM Telnet  |
|                 |                  |          | exit program     |
|                 |                  |          | which device     |
|                 |                  |          | name to specify  |
|                 |                  |          | as the Script    |
|                 |                  |          | driver job is    |
|                 |                  |          | connecting to    |
|                 |                  |          | the Telnet       |
|                 |                  |          | server.          |
|                 |                  |          |                  |
|                 |                  |          |                  |
|                 |                  |          |                  |
|                 |                  |          | SMA recommends   |
|                 |                  |          | configuring IP   |
|                 |                  |          | addresses with   |
|                 |                  |          | the Interface    |
|                 |                  |          | type of          |
|                 |                  |          | \*LOOPBACK,      |
|                 |                  |          | since this type  |
|                 |                  |          | of Interface     |
|                 |                  |          | does not require |
|                 |                  |          | a line           |
|                 |                  |          | description      |
|                 |                  |          | object. However, |
|                 |                  |          | any valid IP     |
|                 |                  |          | address value    |
|                 |                  |          | that is          |
|                 |                  |          | configured in    |
|                 |                  |          | the partition    |
|                 |                  |          | can be used, as  |
|                 |                  |          | long as it is    |
|                 |                  |          | understood that  |
|                 |                  |          | there is a       |
|                 |                  |          | one-to-one       |
|                 |                  |          | relationship     |
|                 |                  |          | between the IP   |
|                 |                  |          | Address and a    |
|                 |                  |          | Device Name.     |
|                 |                  |          | Specifying an    |
|                 |                  |          | external IP      |
|                 |                  |          | address or even  |
|                 |                  |          | an inter-system  |
|                 |                  |          | virtual LAN IP   |
|                 |                  |          | Address would    |
|                 |                  |          | restrict         |
|                 |                  |          | Operator Replay  |
|                 |                  |          | jobs to serial   |
|                 |                  |          | (one at a time)  |
|                 |                  |          | execution, since |
|                 |                  |          | the virtual      |
|                 |                  |          | device can only  |
|                 |                  |          | be used for one  |
|                 |                  |          | job at a time.   |
|                 |                  |          |                  |
|                 |                  |          |                  |
|                 |                  |          |                  |
|                 |                  |          | Please refer to  |
|                 |                  |          | [Managing        | |                 |                  |          | Virtual          |
|                 |                  |          | Devices](#M      |
|                 |                  |          | anaging){.MCXref |
|                 |                  |          | .xref} near the  |
|                 |                  |          | end of the       |
|                 |                  |          | Operator Replay  |
|                 |                  |          | Scripts section  |
|                 |                  |          | for more         |
|                 |                  |          | information      |
|                 |                  |          | about when to    |
|                 |                  |          | use this IP      |
|                 |                  |          | Address field.   |
+-----------------+------------------+----------+------------------+

:  

#### Change User Screen

-   **Screen Title**: Change User
-   **Screen ID**: LSAUSRR00-1

###### Menu Pathways

Main Menu \> Operator replay menu (\#4) \> Operator Replay user (\#1) \>
Option 2

###### Options

None

###### Functions

-   **F3=Exit**: Quits the Add User screen without adding new data to
    the system. Returns to LSAM menu.
-   **F12=Cancel**: Quits the Add User screen without adding new data to
    the system. Returns to user list.

###### Fields

Refer to the Fields table for Add User. Change User does not allow
changing the User Name. To change a user, first delete the original
record then add a new record.

#### Delete User Screen

-   **Screen Title**: Delete User
-   **Screen ID**: LSAUSRR00-2

###### Menu Pathways

Main Menu \> Operator replay menu (\#4) \> Operator Replay user (\#1) \>
option 4

###### Fields

Output-only fields identify each user record that is deleted from the
LSAM database.

  Column        Description
  ------------- --------------------------------------------------------------------
  User Name     First 30 characters of User Name to be deleted from LSAM register.
  Description   Description within LSAM of user profile.

  :  

###### Options

None

###### Functions

-   **F3=Exit**: Quits the Delete User screen without deleting any
    records. Returns to LSAM menu.
-   **F12=Cancel**: Quits the Delete User screen without deleting any
    records. Returns to list of users.

#### Display User Screen

-   **Screen Title**: Display User
-   **Screen ID**: LSAUSRR00-2

###### Menu Pathways

Main Menu \> Operator replay menu (\#4) \> Operator Replay user (\#1) \>
option 5

###### Functions

-   **F3=Exit**: Quits the Display User screen and returns to LSAM menu.
-   **F12=Cancel**: Quits the Display User screen and returns to list of
    users.

###### Fields

Up to the full 128 characters are displayed for the User Name.

### User Management for Other LSAM Applications

The LSAM User Management function is shared by the LSAM to support FTP
jobs submitted by OpCon/xps. FTP jobs are IBM i jobs with a job sub-type
of FTP. The OpCon/xps EM supports a special job configuration tab with
unique fields that help define how the IBM i native ftp (file transfer
protocol) feature may be used in a batch job.

 

There are two user profiles associated with these IBM i FTP jobs. First
is the IBM i job user profile. This user profile is specified in the
OpCon/xps EM under the Job Information tab, in the User ID field. This
user profile is only used to execute the batch job under IBM i that will
drive the FTP transfer process. The job user profile is the same for FTP
jobs as for any IBM i batch job.

 

The other user profile require for the FTP job sub-type is specified
under the Call Information tab of the FTP job, under the sub-tab called
Transfer Information. The field name is FTP User. The FTP User may be
any length up to 128 characters. This user name must be registered in
the LSAM database, using the user Management function, so that the LSAM
job scheduler server can find the encrypted FTP user password that has
been stored in an LSAM validation list.

 

  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [The OpCon/xps EM job master field for the FTP user supports selection of a user name from the existing list of registered OpCon/xps users. However, the FTP user field also allows keying in of unregistered names. The registration of a user profile for OpCon/xps is unrelated to the requirement that the FTP user must be registered in the LSAM database.]
  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

When registering a user name in the LSAM User Management function, the
user profile does not have to exist under IBM i. Any user name and
password that may be valid on the FTP target machine may be registered.
For example, if a file is being transferred to or from a Microsoft
Windows computer, the Windows user profile and password must be
registered so that the LSAM-managed FTP job can successfully log on to
Windows before the file transfer starts.

#### Length of User IDs and Passwords

The LSAM User Management function permits entry of User Names and
Passwords that are up to 128 characters long. However, the LSAM Operator
Replay feature that relies on this User Management function can only use
10 characters for a User Name.

 

The IBM i operating system may be configured to restrict passwords to
only 10 characters, or it may allow a longer password value. The LSAM
Operator Replay function is able to adapt to any permissible length, up
to 128 characters. However, if the IBM i operating system restricts the
password length, then the password registered for an Operator Replay
script user must also conform to this restriction.

 

Some operating systems support longer user IDs and passwords. The IBM i
LSAM is able to supply up to 128 characters for either or both the User
Name and the Password, as when an FTP job is logging into a remote
system that is not IBM i, in order to start the file transfer process.

## OR Script Screens and Windows

### Operator Replay Configuration

-   **Screen Title**: Operator Replay Configuration
-   **Screen ID**: OPRRPYD301

###### Menu Pathways

Main Menu \> Operator replay menu (\#4) \> Operator Replay configuration
(\#5)

###### Fields

+----------------------------------+----------------------------------+
| Field                            | Description                      |
+==================================+==================================+
| **TCP/IP and Device              |                                  |
| Configuration**                  |                                  |
+----------------------------------+----------------------------------+
| Telnet device modes              | The list of optional Telnet      |
|                                  | device modes is introduced by    |
|                                  | the F1=Help text, and it is      |
|                                  | fully explained in the [Managing | |                                  | Virtual                          |
|                                  | Devices](#Managing){.MCXref      |
|                                  | .xref} section near the end of   |
|                                  | the Operator Replay Scripts      |
|                                  | chapter.                         |
+----------------------------------+----------------------------------+
| NOTE: MODEs 2-4                  | Use F1=Help to view an           |
|                                  | introduction to the Telnet Exit  |
|                                  | Program use and configuration.   |
|                                  | See [Managing Virtual            | |                                  | Devices](#Managing){.MCXref      |
|                                  | .xref} near the end of the       |
|                                  | Operator Replay Scripts chapter  |
|                                  | for complete instructions.       |
+----------------------------------+----------------------------------+
| IP Address                       | This address is used to start an |
|                                  | emulated interactive user        |
|                                  | session, using IP Telnet         |
|                                  | protocol. The default value for  |
|                                  | this field is the typical        |
|                                  | \*LOOPBACK interface address of  |
|                                  | 127.0.0.1. Use F4=Prompt to see  |
|                                  | a list of valid values that IBM  |
|                                  | i supplies from existing         |
|                                  | configured IP lines. SMA         |
|                                  | recommends using loopback        |
|                                  | interfaces instead of physical   |
|                                  | line descriptions for Operator   |
|                                  | Replay Script jobs to ease the   |
|                                  | configuration and improve system |
|                                  | efficiency.                      |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | An IP Address is always required |
|                                  | by the Operator Replay Script    |
|                                  | driver program. However, the IP  |
|                                  | Address might be provided from   |
|                                  | either User Management, from the |
|                                  | OpCon job start request (as an   |
|                                  | extension to the Script name) or |
|                                  | from the STROPRRPY command when  |
|                                  | it is used for testing. When an  |
|                                  | alternate source for the IP      |
|                                  | Address has been configured,     |
|                                  | this field value in the          |
|                                  | Configuration screen is usually  |
|                                  | ignored, unless it may be used   |
|                                  | by reference to a \*DEFAULT      |
|                                  | value in the IPADDR( ) parameter |
|                                  | of the STROPRPRY command.        |
+----------------------------------+----------------------------------+
| Telnet port                      | The default telnet port of 23    |
|                                  | should be specified, unless IBM  |
|                                  | i has been configured to support |
|                                  | Telnet services at a different   |
|                                  | port. This is the port where the |
|                                  | emulated interactive user        |
|                                  | session will be started by the   |
|                                  | Operator Replay control program. |
+----------------------------------+----------------------------------+
| Telnet device name               | Enter a virtual display device   |
|                                  | name or one of the functional    |
|                                  | values:                          |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | Mode 1: Leave this field blank.  |
|                                  | The system will select or create |
|                                  | an available virtual display     |
|                                  | device.                          |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | Mode 2: This mode requires an    |
|                                  | actual virtual display device    |
|                                  | name.                            |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | Mode 3: Type \"\*USER\" into the |
|                                  | device name field.               |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | Mode 4: Type \"\*CMD\" into the  |
|                                  | device name field.               |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | **NOTE**: To allow command line  |
|                                  | parameter overrides when in User |
|                                  | mode, type both values into this |
|                                  | field: \"\*USER \*CMD\"          |
+----------------------------------+----------------------------------+
| Telnet device exit program       | This is a protected display      |
| number                           | field, showing the default exit  |
|                                  | program number that will be used |
|                                  | by the Agent when adding or      |
|                                  | removing the exit program entry  |
|                                  | in the IBM i registry.           |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | In case of the unlikely event    |
|                                  | that this unique number is       |
|                                  | already in use by some other     |
|                                  | software application, use        |
|                                  | function key F13 to unlock this  |
|                                  | field and type in a different,   |
|                                  | valid exit program number.       |
|                                  | (Valid values are mostly below   |
|                                  | the default value, since this    |
|                                  | was intentionally set to very    |
|                                  | near the upper limit.)           |
+----------------------------------+----------------------------------+
| **General Configuration          |                                  |
| Options**                        |                                  |
+----------------------------------+----------------------------------+
| Script job logging               | Controls whether the interactive |
|                                  | user emulation session will be   |
|                                  | recorded in the LSAM\'s Operator |
|                                  | Replay log file. Use this        |
|                                  | feature whenever a new script is |
|                                  | added, or to diagnose suspected  |
|                                  | problems with a script. There    |
|                                  | will always be a log index entry |
|                                  | made for every script that is    |
|                                  | executed, but only:              |
|                                  |                                  |
|                                  | -   Y = yes, record each Script  |
|                                  |     execution in its own log     |
|                                  |     file data member,            |
|                                  |     corresponding to the log     |
|                                  |     index entry.                 |
+----------------------------------+----------------------------------+
| Script job debug logging         | For use by technical support     |
|                                  | personnel only. This option      |
|                                  | causes additional log entries to |
|                                  | be added to a special trace      |
|                                  | file, OPRLOGF20. Refer to more   |
|                                  | information about this function  |
|                                  | under the F17 and F18 function   |
|                                  | key descriptions.                |
+----------------------------------+----------------------------------+
| Telnet exit pgm trace log        | For use by technical support     |
|                                  | personnel only. This option      |
|                                  | causes additional log entries to |
|                                  | be added to a special trace      |
|                                  | file, OPRLOGF20. Refer to more   |
|                                  | information about this function  |
|                                  | under the F19 and F20 function   |
|                                  | key descriptions.                |
+----------------------------------+----------------------------------+
| Post-send delay                  | The number of microseconds to    |
|                                  | wait after sending a reply to a  |
|                                  | screen format, before attempting |
|                                  | to read the system response to   |
|                                  | the sent data. A tuning option   |
|                                  | for the script execution         |
|                                  | program, this value should only  |
|                                  | be changed by trained technical  |
|                                  | support personnel.               |
+----------------------------------+----------------------------------+
| Inter-read delay                 | The number of microseconds to    |
|                                  | wait in between reading segments |
|                                  | of the screen buffer that the    |
|                                  | system is writing. A tuning      |
|                                  | option for the script execution  |
|                                  | program, this value should only  |
|                                  | be changed by trained technical  |
|                                  | support personnel. SMA           |
|                                  | recommends using 0.1 seconds for |
|                                  | this field (instead of a whole 1 |
|                                  | second, previously offered as    |
|                                  | the default value).              |
+----------------------------------+----------------------------------+
| Receiving data timeout           | The number of microseconds to    |
|                                  | wait before deciding that the    |
|                                  | system is no longer replying to  |
|                                  | the script execution. A tuning   |
|                                  | option for the script execution  |
|                                  | program, this value should only  |
|                                  | be changed by trained technical  |
|                                  | support personnel.               |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | **Note:** This value can be      |
|                                  | overridden at the script step    |
|                                  | level.                           |
+----------------------------------+----------------------------------+
| Script loop detect limit         | Number of repeats by Script      |
|                                  | Branching Logic to same or lower |
|                                  | Step sequence number allowed     |
|                                  | within same Script name before   |
|                                  | script execution is aborted with |
|                                  | an error message reporting too   |
|                                  | many loops.                      |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | The Script Step master records   |
|                                  | support an override value to     |
|                                  | this limit, in case a script     |
|                                  | must intentionally loop back to  |
|                                  | the same step more times than    |
|                                  | this global loop limit would     |
|                                  | allow.                           |
+----------------------------------+----------------------------------+
| Separator data columns           | Each of the three separator hex  |
|                                  | character values shows a         |
|                                  | maintainable value field in      |
|                                  | yellow. To the right is the      |
|                                  | current value in the control     |
|                                  | file, shown in turquoise. The    |
|                                  | displayable character equivalent |
|                                  | of each hex character sequence   |
|                                  | is displayed as a single pink    |
|                                  | character. Use the LSAM command  |
|                                  | LSATBLTEST to test results for   |
|                                  | hex character sequences,         |
|                                  | especially when US English       |
|                                  | (CCSID 37) is NOT the IBM i      |
|                                  | default character set.           |
+----------------------------------+----------------------------------+
| **Hexadecimal control            |                                  |
| characters**                     |                                  |
+----------------------------------+----------------------------------+
| Token/variable separator         | -   The special character that   |
|                                  |     is inserted by the script    |
|                                  |     maintenance program to       |
|                                  |     designate a character string |
|                                  |     that is actually a token or  |
|                                  |     variable field that will     |
|                                  |     have its value substituted   |
|                                  |     from the user-defined list   |
|                                  |     of tokens.                   |
|                                  | -   If this value is changed, it |
|                                  |     could affect all the         |
|                                  |     existing scripts. A warning  |
|                                  |     and utility function screen  |
|                                  |     will follow.                 |
|                                  | -   This value should only be    |
|                                  |     changed by trained technical |
|                                  |     support personnel, and then  |
|                                  |     only if required to work     |
|                                  |     around a conflict in the     |
|                                  |     character sequences being    |
|                                  |     managed by the script        |
|                                  |     execution program.           |
+----------------------------------+----------------------------------+
| Cursor control separator 1       | -   The special character that   |
|                                  |     is inserted by the script    |
|                                  |     maintenance program to       |
|                                  |     designate the start of a     |
|                                  |     character string that will   |
|                                  |     be used to move the cursor   |
|                                  |     on the emulated green screen |
|                                  |     image during script          |
|                                  |     execution.                   |
|                                  | -   If this value is changed, it |
|                                  |     could affect all the         |
|                                  |     existing scripts. A warning  |
|                                  |     and utility function screen  |
|                                  |     will follow.                 |
|                                  | -   This value should only be    |
|                                  |     changed by trained technical |
|                                  |     support personnel, and then  |
|                                  |     only if required to work     |
|                                  |     around a conflict in the     |
|                                  |     character sequences being    |
|                                  |     managed by the script        |
|                                  |     execution program.           |
|                                  | -   This value is a pair of      |
|                                  |     displayable characters used  |
|                                  |     to represent the hexadecimal |
|                                  |     value of the actual single   |
|                                  |     character used as the        |
|                                  |     separator.                   |
+----------------------------------+----------------------------------+
| Cursor control separator 2       | -   The special character that   |
|                                  |     is inserted by the script    |
|                                  |     maintenance program to       |
|                                  |     designate the end of a       |
|                                  |     character string that will   |
|                                  |     be used to move the cursor   |
|                                  |     on the emulated green screen |
|                                  |     image during script          |
|                                  |     execution.                   |
|                                  | -   If this value is changed, it |
|                                  |     could affect all the         |
|                                  |     existing scripts. A warning  |
|                                  |     and utility function screen  |
|                                  |     will follow.                 |
|                                  | -   This value should only be    |
|                                  |     changed by trained technical |
|                                  |     support personnel, and then  |
|                                  |     only if required to work     |
|                                  |     around a conflict in the     |
|                                  |     character sequences being    |
|                                  |     managed by the script        |
|                                  |     execution program.           |
|                                  | -   This value is a pair of      |
|                                  |     displayable characters used  |
|                                  |     to represent the hexadecimal |
|                                  |     value of the actual single   |
|                                  |     character used as the        |
|                                  |     separator.                   |
+----------------------------------+----------------------------------+
| **Displayed Data Translation**   |                                  |
+----------------------------------+----------------------------------+
| Displayed data translation       | Refer to the discussion below    |
|                                  | about the purpose for these      |
|                                  | table names. Note the option to  |
|                                  | use CCSID character set numbers  |
|                                  | instead of translations; this    |
|                                  | option may produce better        |
|                                  | results in countries outside of  |
|                                  | the United States of America.    |
|                                  | SMA Support can help with the    |
|                                  | analysis of any translation      |
|                                  | problems.                        |
+----------------------------------+----------------------------------+
| **\"Attempt to Recover           |                                  |
| Interactive Job\" Display --     |                                  |
| Local Language**                 |                                  |
+----------------------------------+----------------------------------+
| Instructions:                    | If an Operator Replay Script job |
|                                  | ended abnormally, depending on   |
|                                  | the system value QDEVRCYACN, the |
|                                  | next attempt to access the same  |
|                                  | display device might be          |
|                                  | intercepted by a job recovery    |
|                                  | message. The Operator Replay     |
|                                  | script driver will attempt to    |
|                                  | recognize and bypass this        |
|                                  | message if the display matches   |
|                                  | these configuration values. This |
|                                  | will prevent another script job  |
|                                  | failure and it will also reduce  |
|                                  | the requirement for manual       |
|                                  | operator intervention to restore |
|                                  | the status of the display        |
|                                  | device.                          |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | It might be necessary to view    |
|                                  | the Operator Replay log display  |
|                                  | and examine the detailed log of  |
|                                  | screen output to determine the   |
|                                  | exact values required in these   |
|                                  | Configuration fields. But after  |
|                                  | the first incident, if the Row,  |
|                                  | Column and Text are configured   |
|                                  | correctly, then the script       |
|                                  | driver program will be able to   |
|                                  | successfully bypass future       |
|                                  | incidents of this type.          |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | The default title text shown in  |
|                                  | the display is intended to match |
|                                  | the screen title that appears in |
|                                  | a default US EBCDIC partition.   |
|                                  | Update this text to match what   |
|                                  | is found in the Operator Replay  |
|                                  | log details display.             |
+----------------------------------+----------------------------------+
| Row of title                     | 1 (the row location of the       |
|                                  | screen title in a default US     |
|                                  | EBCDIC partition)                |
+----------------------------------+----------------------------------+
| Column of title                  | 24 (the column where text begins |
|                                  | in a default US EBCDIC           |
|                                  | partition)                       |
+----------------------------------+----------------------------------+
| Local title text                 | Attempt to recover interactive   |
|                                  | job                              |
+----------------------------------+----------------------------------+

:  

###### Functions

-   **F3=Exit**: Do not update the data, return to the LSAM menu.
-   **F4=Prompt IP Addr**: Shows a list of IP addresses configured under
    IBM i, from which a valid value may be selected to insert into the
    IP Address field.
-   **F12=Cancel**: Do not update the data, return to the LSAM menu.
-   **F17=View debug log**: For technical support only, view the
    contents of the Operator Replay debug log file (available if Script
    job debug logging was set to Y=yes during any script execution).
    This screen is not documented in this online help.
-   **F20=Clear debug log**: For technical support only, use this
    function to clear the Operator Replay debug log file (OPRLOGF20)
    after a previous test and before the next test, in order to help
    isolate test data.

  -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [The LSAM automatic log file clear routines do not clear the Operator Replay debug log file. This is the responsibility of the technical support personnel who may have set the debug log flag to Y. The Operator Replay debug logging function must be set back to N=no after diagnostic work has been completed, in order to avoid the consumption of large amounts of the client\'s disk space. The debug log file should be cleared using F20 from this display after a copy of the file has been extracted. Refer to [Delivering the LSAM File Extract to SMA Technical Support](Log-File-and-Database-Management.md#Deliveri).]
  -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

#### Displayed Data Translation

The Operator Replay configuration function supports specification of the
translation tables (or CCSID character sets) used for managing
displayable text. The screen formatting characters sent by the IBM i
host to a Telnet workstation are processed in their native ASCII
character format. However, the character text that would normally appear
on the workstation display must first be translated to EBCDIC before the
Operator Replay Script driver program can interpret what is on the
display. This EBCDIC character interpretation is critical for enabling
the various scripting tools that must test the content of the display.

 

These tables should not be changed from their default values unless
international language support requires it. Please contact SMA Support
for assistance if it is believed that these table names might need to be
changed. An SMA technical analyst should evaluate a special \"trace
log\" of an Operator Replay session in order to help determine whether a
change to the displayable text translation tables will be required.

 

To specify a numeric CCSID character set in the Table field, type the
special value of \"\*CCSID\" into the Library field. If one table uses a
CCSID number, then both tables must use a CCSID number. It is not
allowed to mix a translation table name with a CCSID character set
number.

 

When specifying CCSID character set numbers, specify the character set
that pertains to the set name that is on the right side of the -\> arrow
character. For example, in the United States, a value of 37 (US EBCDIC)
would be specified next to -\>EBCDIC, and a value of 819 (US ASCII)
would be specified next to -\>ASCII.

 

The CCSID pair of 37 \<-\> 819 typically produces the same result on a
US EBCDIC machine as using the default translation table names of
QEBCDIC and QASCII. But in other countries it is more difficult to
identify useful translation tables, and in those sites better results
can be obtained by identifying the CCSID character sets that are used by
the IBM i operating system for DB2 EBCDIC data and IFS ASCII stream
files.

#### Hex Character Conversion

This screen appears whenever any of the three \"separator\" hex values
are changed. The instructions at the top of the display explain the
warning and the available function key options. SMA recommends
consulting SMA Support before attempting to change any of the separator
values, to make sure that all of the implications of this very technical
change are clearly understood.

 

However, LSAM installations that were upgraded to version 04.00.03 from
prior versions are advised to use this function to change the Cursor
control separator characters to X\'A1\' and X\'79\' in order to avoid
potential conflicts with LSAM Dynamic Variable tokens. These hexadecimal
values are the new defaults for the LSAM as of version 04.00.03 and
newer.

-   **Screen Title**: Hex Character Conversion
-   **Screen ID**: OPRRPYRD302

###### Fields

  Field     Description
  --------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  New/Old   The New values will be inserted into the Script Steps if conversion is confirmed, replacing the Old values (when they are different). For more information, refer to the field descriptions for [Operator Replay Configuration](#Operator3).

  :  

###### Functions

-   **F3=Exit**: Quits the maintenance function and returns to the menu
    without changing any control field values.
-   **F12=Cancel**: Quits the warning/utility display and returns to the
    control file maintenance main screen without committing any changes.
-   **F14=Confirm conversion**: This function key first commits all
    control file changes to the LSAM control file, then it starts a
    process to check every Step of every Operator Replay Script for hex
    character sequences to convert. (Note: The Script Steps store these
    same representative hex character sequences in the same alphanumeric
    format as they are shown on the screen. Actual conversion of the
    representative characters into a single value, as it appears in pink
    on this display, does not occur until during Script execution.)
-   **F16=Bypass conversion**: This function key allows all control file
    changes to be committed but it does not perform the automatic scan
    and replace function for the Script Steps. This option is not
    recommended in most cases because the actual Script Step content
    must always match the control file values in order for Script
    execution to be successful.

+----------------------------------+----------------------------------+
| ![White triangle icon on yellow  | **CAUTION:** [Do NOT change the  | | circlular                        | settings for the Token/variable  |
| background](../../../Reso        | separator or the Cursor control  |
| urces/Images/caution-icon(48x48) | separators without first         |
| .png "Caution icon") | learning all about them. Please  |
|                                  | consult with SMA Support before  |
|                                  | attempting this change to be     |
|                                  | sure that Scripts will continue  |
|                                  | to execute as                    |
|                                  | expected.]           |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | **However:**[ LSAM installations | |                                  | upgraded to version 04.00.03     |
|                                  | from prior versions are advised  |
|                                  | to change the Cursor control     |
|                                  | separator characters to the new  |
|                                  | LSAM default values of X\'A1\'   |
|                                  | and X\'79\'. Please contact SMA  |
|                                  | Support for more                 |
|                                  | information].        |
+----------------------------------+----------------------------------+

### Operator Replay Script List

-   **Screen Title**: Operator Replay Scripts
-   **Screen ID**: OPRRPYR10-1

###### Menu Pathways

Main Menu \> Operator replay menu (\#4) \> Operator Replay scripts (\#2)

###### Fields

  Field                     Description
  ------------------------- -------------------------------------------------------------------------------------------------------------------------------
  Position to Script Name   This is used to quickly search for a particular script. Type the first characters of the script name and press \<**Enter**\>.
  Opt                       \<**Tab**\> to a row in the table and enter an option. The options are listed below.
  Name                      Shows the name of the scripts. Select the name of the script to change, copy, or delete.
  User                      Shows the creator of each individual script.
  Description               Shows the existing description of the script. Add a description or modify the existing description.

  :  

###### Options

-   **1=Script step**: To work with script steps, type 1 in the Opt
    field next to the Name of the script. Press \<**Enter**\> to proceed
    to the Operator Replay Script Step screen
-   **2=Change**: To change the user or title of an existing script,
    type 2 in the Opt field next to the Name of the script. Press
    \<**Enter**\> to proceed to the Operator Replay Script (CHANGE)
    screen.
-   **3=Copy**: To copy a script and its steps, type 3 in the Opt field
    next to the Name of the script. Press \<**Enter**\> to proceed to
    the Copy Script screen. A pop-up window will offer the option to
    also copy any associated Capture Data Rules and Response Rules
    associated with each script step *(example below)*.
-   **4=Delete**: To delete a script, type 4 in the Opt field next to
    the Name of the script. Press \<**Enter**\> to proceed to the Delete
    Script confirmation window. A pop-up window will offer the option to
    also delete any associated Capture Data Rules and Response Rules
    associated with each script step *(example below)*.
-   **5=Display**: To view the script master record, type 5 in the Opt
    field next to the name of the script and press \<**Enter**\> to
    proceed to the Display Script screen.
-   **7=Capt chart**: To view a list that reveals all the Capture Data
    and Response Rules connected to each step of a script, type 7 in the
    Opt field next to the name of the script and press \<**Enter**\>.
-   **8=Export**: Type 8 in the Opt field next to the name of the script
    and press \<**Enter**\> to start the data export process for a
    script. This process is used, for example, to transfer a complete
    script and all associated rules and variables from a Test LSAM
    environment to a Production LSAM environment.
-   **9=Flow chart**: To view and optionally print a flow chart of
    script steps, including any other scripts that are linked by
    branching operations, type 9 in the Opt field next to the name of
    the script and press \<**Enter**\> to proceed to the script flow
    chart display. The flow chart display is described above, in the
    How-To section of this document. The flow chart display screen
    supports a function key **F9=Print** that will generate a printable
    report (spool file) of the flow chart on display, but the report
    includes up to 132 characters of information per line, while the
    display is limited to less than 80 characters per line.

###### Functions

-   **F6=Add**: Proceeds to the Add Script screen.
-   **F16=Search next**: When the list of scripts is long, the Search
    content field may be used to find a script in the list, either by
    matching the name or by matching any characters in the description,
    or even matching on the user name. Function key \<**F16**\> can be
    used to continue an existing search (represented by a pink search
    value below the Search content input field) to additional script
    records that may also match the search content value.

#### Windows and Sub-Screens

##### Add (Copy) Script Screen

This screen appears the same for both the Add and Copy functions. The
mode is indicated by the pink subtitle on line 2 of the screen. The Copy
function also copies all Steps associated with the from-script.

Add (Copy) Operator Replay Script Screen

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  [OPRRPYR10-3]{style="color: #008000;"}               Operator Replay Script                 [00/00/00]{style="color: #008000;"}   [USERNAME]{style="color: #008000;"}                           [ADD]{style="color: #ff00ff;"}                           [04:43:59]{style="color: #008000;"}
   
  [ Name  . . . . :]{style="color: #008000;"}  [\_\_\_\_\_\_\_\_\_\_]{style="color: #ffcc00;"}    [User  . . . . :]{style="color: #008000;"}  [\_\_\_\_\_\_\_\_\_\_]{style="color: #ffcc00;"}
  [ Description . :]{style="color: #008000;"}  [\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_]{style="color: #ffcc00;"}                
   
   
  F3=Exit   F4=Prompt   F9=Flow chart   F12=Cancel
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------

##### Change Script Screen

This screen is similar to the Add/Copy screen, but with an informational
field added and the Name field cannot be changed.

-   **Screen Title**: Operator Replay Script
-   **Screen ID**: OPRRPYR10-3

###### Fields

+---------------+---------------+----------+------------------------+
| Field         | Default Value | Required | Description            |
+===============+:=============:+:========:+========================+
| Name          | None          | Y        | -   This name is used  |
|               |               |          |     as a parameter in  |
|               |               |          |     the STROPRRPY      |
|               |               |          |     command when       |
|               |               |          |     registering a      |
|               |               |          |     script as a        |
|               |               |          |     scheduled job in   |
|               |               |          |     OpCon/xps.         |
|               |               |          | -   Any Alphabetic     |
|               |               |          |     characters may be  |
|               |               |          |     used to identify a |
|               |               |          |     script.            |
|               |               |          | -   This field cannot  |
|               |               |          |     be updated in      |
|               |               |          |     Change mode.       |
+---------------+---------------+----------+------------------------+
| User          | None          | Y        | The name of an IBM i   |
|               |               |          | user profile that is   |
|               |               |          | registered in the      |
|               |               |          | Operator Replay user   |
|               |               |          | table.                 |
|               |               |          |                        |
|               |               |          | Press \<**F4**\>       |
|               |               |          | (Prompt) from this     |
|               |               |          | field to view and      |
|               |               |          | select from a list of  |
|               |               |          | names.                 |
+---------------+---------------+----------+------------------------+
| Description   | None          | N        | Enter text describing  |
|               |               |          | what this script does. |
+---------------+---------------+----------+------------------------+
| Int record ID | output only   |          | In Change mode, this   |
|               |               |          | field is displayed for |
|               |               |          | technical support      |
|               |               |          | purposes only. The     |
|               |               |          | hidden, internal       |
|               |               |          | record number has no   |
|               |               |          | meaning at the level   |
|               |               |          | of Script maintenance  |
|               |               |          | or flow analysis.      |
+---------------+---------------+----------+------------------------+

:  

###### Functions

-   **F3=Exit**: Quits the OR Script\'s maintenance function and returns
    to the menu without completing the maintenance function (add,
    change, copy).
-   **F4=Prompt**: Prompts for User Names when the cursor is in the User
    field.
-   **F9=Flow chart**: Produces a display of the logic flow of this
    script and any scripts that it may branch to. This function key
    produces no results during Add mode because no script record exists
    to analyze. (Refer to option 9=Flow chart on the list of Scripts
    display, above, for more information.)
-   **F12=Cancel**: Quits the Script maintenance function and returns to
    the list of scripts without adding or updating a record.

##### Delete Script Window

Delete Script Window

  -----------------------------------------------------
                     Delete Script                   
   
   Name          Description
   ACCOUNTING    Test Operator Replay
   CHGMAXJOBS    Change the Max Jobs to 175          
   
   
   
    Bottom
  Enter=Confirm   F12=Cancel
  -----------------------------------------------------

###### Fields

  Field         Description
  ------------- -------------------------------------------------
  Name          The name of the script(s) that is deleted.
  Description   A description of the script(s) that is deleted.

  :  

###### Functions

**F12=Cancel**: Quits the Delete Script confirmation window and returns
to the list of scripts without deleting any records.

##### Copy/Delete Script Window (Options 3 and 4)

Manage Capture Rules Window (Copy)

  --------------------------------------------------------------------------------------------------------------------------------------------------------- -- --
              Manage Capture Rules                                                                                                                             
                                                                                                                                                               
  [ Copy capture rules also?]{style="color: #008000;"}   [1]{style="color: #ffcc00;text-decoration: underline;"}  [0=No, 1=Yes ]{style="color: #008000;"}           (Recommended: 1=Yes)                                                                                                                                       
                                                                                                                                                               
  Enter=Select   F12=Cancel                                                                                                                                    
  --------------------------------------------------------------------------------------------------------------------------------------------------------- -- --

 

Manage Capture Rules Window (Delete)

  ----------------------------------------------------------------------------------------------------------------------------------------------------------- -- --
               Manage Capture Rules                                                                                                                              
                                                                                                                                                                 
  [ Delete capture rules also?]{style="color: #008000;"}   [1]{style="color: #ffcc00;text-decoration: underline;"}  [0=No, 1=Yes ]{style="color: #008000;"}           (Recommended: 1=Yes)                                                                                                                                         
                                                                                                                                                                 
  Enter=Select   F12=Cancel                                                                                                                                      
  ----------------------------------------------------------------------------------------------------------------------------------------------------------- -- --

###### Fields

+------------+--------------------------------------------------------+
| Field      | Description                                            |
+============+========================================================+
| Copy?      | -   0=No, 1=Yes                                        |
|            | -   When either option 3=Copy or option 4=Delete is    |
| **- or -** |     selected, the program offers the option to perform |
|            |     either a copy or a delete of all Capture Data and  |
| Delete?    |     Response Rules that are related to each step in    |
|            |     the script.                                        |
|            | -   For option 0=No, the copy or delete action is      |
|            |     completed, but any associated Capture Data and     |
|            |     Response rules are ignored.                        |
|            | -   When this window is presented from the Step list,  |
|            |     it applies only to the step(s) being copied and    |
|            |     not to the whole script.                           |
+------------+--------------------------------------------------------+

:  

###### Functions

**F12=Cancel**: Quits the option window and returns to the list control
display. (The copy or delete option remains incomplete and must be
restarted, if desired.)

### Operator Replay Capture Chart (opt 7)

Option 7 from the list of Scripts will present the following read-only
list that documents all Capture Data Rules, Response Rules and variables
(Dynamic Variables or the older Operator Replay token variables). Use
function key \<**F11**\> to rotate the list details among 5 different
views. The explanation of each data field in this list may be found in
the Screens and Windows documentation for each record type. Use option
5=Display from this list to view the entire detail of any record, for
additional help understanding what appears in this summary list.

-   **Screen Title**: Capture Screen Data Chart (5 Views)
-   **Screen ID:** OPRR10R7

In View 4, for each Step there is a profile of the Top Control String.
(View 5 shows the Bottom Control String.) The control string rules use
these labels:

-   **CtlOpt** = control option: F=Fail if \"not\", S=Skip if \"not\"
-   **TR** = top row
-   **TC** = top column
-   **TL** = top length
-   **not** = shows the Boolean comparison rule, such as EQ (equal) or
    NE (not equal). \"not\" means that if the comparison is not true,
    then the CtlOpt action will be taken
-   **Str** = the reference character string that is compared to the
    screen content (may be blanks if the Length value is supplied)

A list of the symbolic field labels used for each Step record is
documented under View 4. In this view 5 the letter \"B\" refers to the
Bottom Control String, instead of the \"T\" which is the Top Control
String that shows in view 4.

###### Menu Pathways

Main Menu \> Operator replay menu (\#4) \> Operator Replay scripts (\#2)
\> Option 7 (Capt chart)

###### Fields

  Field            Description
  ---------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Script           Under the screen title is the name of the Operator Replay Script that is being analyzed by this list display.
  Search content   Type a value to be used as a search argument. Press \<**Enter**\> or \<**F16**\> to start a new search. All fields in a step record will be searched, not only the data displayed on the list. Use option 5=Display to discover the matching field that may not appear in the list.
  Opt              \<**Tab**\> to the line of a step record and type an option number. Press \<**Enter**\> to perform the option function.
  Step             The Script Step number is shown for lines colored yellow (left-most indent).
  Capt ID          The Capture ID is shown for lines in blue (indented 1 space under a Step).
  RspSeq\#         The Response Rule sequence number is shown for lines in pink (indented 2 spaces under a step).
  Var-Tok          The Dynamic Variable name (or an Operator Replay Token name) is shown for lines in cyan (indented 3 spaces under a step).
  View             Press function key \<**F11**\> to rotate the list display among 5 different views. Each view shows a summary of a different part of each record type. Rotate the views to quickly analyze what is configured for each record type.

  :  

###### Option

**5=Display**: Type 5 next to any record type and press \<**Enter**\> to
quickly access a read-only view of the complete record detail.

###### Functions

-   **F3=Exit**: Quits the Script maintenance function and returns to
    the menu. Note that changes already made to script records are
    retained.
-   **F5=Refresh**: Reloads the list from the database file.
-   **F9=Print**: Creates report OPRRPYP10 that transfers the entire
    Capture Chart analysis list to a printable report spool file. The
    report will show only the current View. Use F11 to change the view
    in order to print other details about each record on display the
    next time that F9=Print is pressed.
-   **F11=Next view**: Rotates the list view among 5 different summaries
    of details about each record type. The current view in effect is
    displayed in the View field, to the right of the column headings.
-   **F12=Cancel**: Returns to the list of Scripts.
-   **F16=Search**: When a value is entered into the Search content
    field, pressing \<**Enter**\> or \<**F16**\> starts a new search for
    step records that contain the search content string anywhere in the
    step master record (the search includes all step record fields,
    including comments, string to send, branch operations, control
    strings, etc.). After a search is started, when there is a previous
    search content value shown in pink under the search input field,
    \<**F16**\> is used to continue the search on to the next step
    record that matches the search content value.

### Operator Replay Script Step List

-   **Screen Title**: Operator Replay Script Steps
-   **Screen ID**: OPRRPYR10-2

###### Menu Pathways

Main Menu \> Operator replay menu (\#4) \> Operator Replay scripts (\#2)
\> Option 1 (Script steps)

###### Fields

  Field                             Description
  --------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Search content                    Type a value to be used as a search argument. Press \<**Enter**\> or \<**F16**\> to start a new search. All fields in a step record will be searched, not only the data displayed on the list. Use option 5=Display to discover the matching field that may not appear in the list.
  Opt                               \<**Tab**\> to the line of a step record and type an option number. Press \<**Enter**\> to perform the option function.
  Seq                               Sequence number controls the order in which steps are performed as part of a script.
  Label                             An optional label assigned to a step that becomes the target of a branching operation.
  Comments/String to send + F-Key   A description of what each step in a script accomplishes. When \<**F11**\> is pressed, the list shows the String to send data and the Function key.

  :  

###### Options

-   **2=Change**: To change the Step record, type 2 in the Opt field
    next to the Step record(s). Press \<**Enter**\> to proceed to the
    Change Step detail screen.

-   **3=Copy**: To copy the Step record, type 3 in the Opt field next to
    the Step record. Press \<**Enter**\> to proceed to the Copy Step
    detail screen. A pop-up window will offer the option to also copy
    any associated Capture Data Rules and Response Rules associated with
    each script step. (Refer to the Manage Capture Rules pop-up window
    above, following the Scripts List display.)

-   **4=Delete**: To delete the Step record, type 4 next to each Step
    record. Press \<**Enter**\> to proceed to the Delete Step
    confirmation window. A pop-up window will offer the option to also
    delete any associated Capture Data Rules and Response Rules
    associated with each script step. (Refer to the Manage Capture Rules
    pop-up window above, following the Scripts List display.)

-   **5=Display**: To display the Step record, type 5 next to each Step
    record. Press \<**Enter**\> to proceed to the Display Step Details
    screen. Typing option 5 next to many or all step records at once
    before pressing Enter is a convenient way to review all the steps in
    a script. Press \<**Enter**\> to advance as each detail screen is
    presented.

-   **6=DSPLBLWU**: Display Label Where Used. If a step is assigned a
    Label, this script analysis tool will produce a list of all scripts
    that have a branching operation assigned to this label value.

-   **7=Capt chart**: Type 7 next to a Step and press \<**Enter**\> to
    see a list of all Capture Data Rules, Response Rules, and variable
    tokens used by the step. The list of the Capture Chart appears the
    same for the whole Script, except this option will show data for
    only one Step.

###### Functions

-   **F3=Exit**: Quits the Script maintenance function and returns to
    the menu. Note that changes already made to step records are
    retained.
-   **F5=Refresh**: Reloads the list of steps from the database file.
-   **F6=Add**: Proceeds to the Add Step Detail screen.
-   **F9=Flow**: Shows the analysis flow chart for the whole script, the
    same as using option 9 from the list of script master records.
-   **F11=View 2/1**: Toggles the list display between showing step
    Comments or showing the String to send and function key, for each
    step.
-   **F12=Cncl**: (Cancel) Returns to the list of Scripts. Changes
    already made to step records are retained.
-   **F16=Search**: When a value is entered into the Search content
    field, pressing \<**Enter**\> or \<**F16**\> starts a new search for
    step records that contain the search content string anywhere in the
    step master record (the search includes all step record fields,
    including comments, string to send, branch operations, control
    strings, etc.). After a search is started, when there is a previous
    search content value shown in pink under the search input field,
    \<**F16**\> is used to continue the search on to the next step
    record that matches the search content value.

#### Windows

##### Delete Step Window

Delete Step Window

  -------------------------------------------------------
                        Delete Step
                              
        Seq       Comment                               
         10       Bypass logon messages 1               
                              
                              
                              
                          Bottom
                Enter=Confirm   F12=Cancel
  -------------------------------------------------------

###### Fields

  Field      Description
  ---------- -------------------------------------------------------
  Seq        The sequence number of the step record to be deleted.
  Comments   A description the step record

  :  

###### Functions

**F12=Cancel**: Returns to the list of step records without completing
the delete action.

### Operator Replay Step Detail Screen

-   **Screen Title**: Change Operator Replay Step Detail
-   **Screen ID**: OPRRPYR10-4

  -------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [The screen][ denotes the functions Add, Change, Copy or Display in the title line. The field values are all the same, except the internal \"Rec ID\" does not appear in the Add or Copy modes.]
  -------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

###### Menu Pathways

-   Main Menu \> Operator replay menu (\#4) \> Operator Replay scripts
    (\#2) \> Option 1 (Script steps) \> Operator Replay Step List \>
    Option 2 (Change)

-   Main Menu \> Operator replay menu (\#4) \> Operator Replay scripts
    (\#2) \> Option 1 (Script steps) \> Operator Replay Step List \>
    Option 3 (Copy)

-   Main Menu \> Operator replay menu (\#4) \> Operator Replay scripts
    (\#2) \> Option 1 (Script steps) \> Operator Replay Step List \> F6
    (Add)

-   Main Menu \> Operator replay menu (\#4) \> Operator Replay scripts
    (\#2) \> Option 1 (Script steps) \> Operator Replay Step List \>
    Option 5 (Display)

###### Fields

(Look for **DynVar** notation in Default Value to find fields that
support Dynamic Variables)

+----------------+----------------+---------------+----------------+
| Field          | Default Value  | Required      | Description    |
+================+:==============:+:=============:+================+
| Step           | None           | N             | Type a Text    |
| description    |                |               | Description    |
|                |                | (recommended) | for the script |
|                |                |               | (up to 40      |
|                |                |               | characters)    |
+----------------+----------------+---------------+----------------+
| Rec ID         | System         |               | Not shown for  |
|                | assigned       |               | Add or Copy    |
|                |                |               | mode, this     |
|                |                |               | internal       |
|                |                |               | number is for  |
|                |                |               | technical      |
|                |                |               | support use    |
|                |                |               | only.          |
+----------------+----------------+---------------+----------------+
| Step sequence  | Auto-assigned, | Y             | -   The next   |
| number         | but may be     |               |     available  |
|                | changed        |               |     sequence   |
|                |                |               |     number is  |
|                |                |               |                |
|                |                |               |  auto-assigned |
|                |                |               |     when the   |
|                |                |               |     Add or     |
|                |                |               |     Copy       |
|                |                |               |     function   |
|                |                |               |     is being   |
|                |                |               |     used. This |
|                |                |               |     number can |
|                |                |               |     be changed |
|                |                |               |     to         |
|                |                |               |     reposition |
|                |                |               |     a step to  |
|                |                |               |     a          |
|                |                |               |     different  |
|                |                |               |     relative   |
|                |                |               |     position   |
|                |                |               |     among all  |
|                |                |               |     the        |
|                |                |               |     sequence   |
|                |                |               |     steps.     |
|                |                |               | -   Use        |
|                |                |               |     F7=ReSeq   |
|                |                |               |                |
|                |                |               |  (re-sequence) |
|                |                |               |     from the   |
|                |                |               |     list of    |
|                |                |               |     steps to   |
|                |                |               |     renumber   |
|                |                |               |     all steps  |
|                |                |               |     in         |
|                |                |               |     increments |
|                |                |               |     of 10, if  |
|                |                |               |     there are  |
|                |                |               |     no more    |
|                |                |               |     numbers    |
|                |                |               |     available  |
|                |                |               |     for        |
|                |                |               |     inserting  |
|                |                |               |     steps      |
|                |                |               |     between    |
|                |                |               |     existing   |
|                |                |               |     steps.     |
+----------------+----------------+---------------+----------------+
| Step label     | None           | N             | Optional value |
|                |                |               | used as the    |
|                |                |               | target of a    |
|                |                |               | branching      |
|                |                |               | operation from |
|                |                |               | another step   |
|                |                |               | and/or script. |
+----------------+----------------+---------------+----------------+
| Receive timer  | Zero           | N             | A response     |
| override (in   |                |               | wait timeout   |
| seconds)       |                |               | value that     |
|                |                |               | overrides the  |
|                |                |               | global wait    |
|                |                |               | timeout value  |
|                |                |               | set for all    |
|                |                |               | Operator       |
|                |                |               | Replay         |
|                |                |               | Scripts,       |
|                |                |               | optionally     |
|                |                |               | allowing this  |
|                |                |               | step of the    |
|                |                |               | Script to take |
|                |                |               | as long as the |
|                |                |               | specified      |
|                |                |               | number of      |
|                |                |               | seconds before |
|                |                |               | the session    |
|                |                |               | control        |
|                |                |               | program logs a |
|                |                |               | timeout        |
|                |                |               | failure of the |
|                |                |               | Script. (Refer |
|                |                |               | to discussion  |
|                |                |               | above about    |
|                |                |               | using this     |
|                |                |               | override field |
|                |                |               | with branching |
|                |                |               | logic.)        |
+----------------+----------------+---------------+----------------+
| Loopback OVR   | Zero           | N             | This field     |
|                |                |               | allows a       |
|                |                |               | script to loop |
|                |                |               | back to this   |
|                |                |               | same step more |
|                |                |               | times than are |
|                |                |               | allowed by the |
|                |                |               | Operator       |
|                |                |               | Replay         |
|                |                |               | Configuration  |
|                |                |               | global setting |
|                |                |               | for the Script |
|                |                |               | Loop Detect    |
|                |                |               | Limit.         |
|                |                |               |                |
|                |                |               |                |
|                |                |               |                |
|                |                |               | A value of     |
|                |                |               | blank or zero  |
|                |                |               | means that     |
|                |                |               | there is no    |
|                |                |               | override to    |
|                |                |               | the global     |
|                |                |               | loop limit.    |
|                |                |               |                |
|                |                |               |                |
|                |                |               |                |
|                |                |               | A value of all |
|                |                |               | 9s (99999)     |
|                |                |               | will mean      |
|                |                |               | \*NOMAX, that  |
|                |                |               | is, there is   |
|                |                |               | no limit.      |
|                |                |               |                |
|                |                |               |                |
|                |                |               |                |
|                |                |               | **CAUTION**:   |
|                |                |               | Using the      |
|                |                |               | \*NOMAX value  |
|                |                |               | of all 9\'s    |
|                |                |               | might allow a  |
|                |                |               | script driver  |
|                |                |               | program to run |
|                |                |               | endlessly,     |
|                |                |               | possibly       |
|                |                |               | consuming      |
|                |                |               | system         |
|                |                |               | resources      |
|                |                |               | until the      |
|                |                |               | system reaches |
|                |                |               | a critical     |
|                |                |               | resources      |
|                |                |               | limit          |
|                |                |               | (depending on  |
|                |                |               | the script     |
|                |                |               | actions that   |
|                |                |               | are repeated). |
+----------------+----------------+---------------+----------------+
| String to send | None           | N             | -   In this    |
|                |                |               |     field,     |
|                |                |               |     type all   |
|                |                |               |     the        |
|                | supports       |               |     characters |
|                | **DynVar**     |               |     and spaces |
|                |                |               |     that an    |
|                |                |               |     operator   |
|                |                |               |     would      |
|                |                |               |     type. Stop |
|                |                |               |     right      |
|                |                |               |     before the |
|                |                |               |     next press |
|                |                |               |     of a       |
|                |                |               |     Function   |
|                |                |               |     key or     |
|                |                |               |                |
|                |                |               | \<**Enter**\>. |
|                |                |               | -   Dynamic    |
|                |                |               |     Variable   |
|                |                |               |     tokens may |
|                |                |               |     be used in |
|                |                |               |     this field |
|                |                |               |     (use F9 to |
|                |                |               |     select     |
|                |                |               |     from list  |
|                |                |               |     and format |
|                |                |               |     tokens),   |
|                |                |               |     but care   |
|                |                |               |     must be    |
|                |                |               |     taken that |
|                |                |               |     after all  |
|                |                |               |     Tokens are |
|                |                |               |     replaced,  |
|                |                |               |     the String |
|                |                |               |     to send    |
|                |                |               |     will not   |
|                |                |               |     exceed 250 |
|                |                |               |     characters |
|                |                |               |     in total   |
|                |                |               |     length.    |
|                |                |               | -   If it is   |
|                |                |               |     necessary  |
|                |                |               |     to type    |
|                |                |               |     more than  |
|                |                |               |     250        |
|                |                |               |     characters |
|                |                |               |     into a     |
|                |                |               |     single     |
|                |                |               |     display    |
|                |                |               |     format,    |
|                |                |               |     extra      |
|                |                |               |     steps may  |
|                |                |               |     be added   |
|                |                |               |     to type    |
|                |                |               |     the        |
|                |                |               |     additional |
|                |                |               |     data. (Do  |
|                |                |               |     not use    |
|                |                |               |     the        |
|                |                |               |     Function   |
|                |                |               |     to send    |
|                |                |               |     until the  |
|                |                |               |     last step  |
|                |                |               |     record.)   |
|                |                |               | -   Press      |
|                |                |               |     \<**F4**\> |
|                |                |               |     to use a   |
|                |                |               |     prompt     |
|                |                |               |     window to  |
|                |                |               |     select any |
|                |                |               |     required   |
|                |                |               |     cursor     |
|                |                |               |     movement   |
|                |                |               |     keys. When |
|                |                |               |     a cursor   |
|                |                |               |     movement   |
|                |                |               |     key is     |
|                |                |               |     selected   |
|                |                |               |     from the   |
|                |                |               |     pop-up     |
|                |                |               |     window,    |
|                |                |               |     the        |
|                |                |               |     correct    |
|                |                |               |     control    |
|                |                |               |     sequence   |
|                |                |               |     of         |
|                |                |               |     characters |
|                |                |               |     will be    |
|                |                |               |     inserted   |
|                |                |               |     into the   |
|                |                |               |     String to  |
|                |                |               |     send field |
|                |                |               |     (at the    |
|                |                |               |     current    |
|                |                |               |     cursor     |
|                |                |               |     location). |
|                |                |               | -   This field |
|                |                |               |     may be     |
|                |                |               |     left       |
|                |                |               |     blank,     |
|                |                |               |     such as    |
|                |                |               |     when the   |
|                |                |               |     step       |
|                |                |               |     record     |
|                |                |               |     only       |
|                |                |               |     executes a |
|                |                |               |     function   |
|                |                |               |     key        |
|                |                |               |     (*refer to |
|                |                |               |     next       |
|                |                |               |     field*).   |
+----------------+----------------+---------------+----------------+
| Function to    | None           | N             | -   A Function |
| send           |                |               |     to send is |
|                |                |               |     required   |
| (function key  |                |               |     to execute |
| mnemonic)      | supports       |               |     the String |
|                | **DynVar**     |               |     to send.   |
|                |                |               |     However, a |
|                |                |               |     given Step |
|                |                |               |     record     |
|                |                |               |     does not   |
|                |                |               |     have to    |
|                |                |               |     include    |
|                |                |               |     this field |
|                |                |               |     value,     |
|                |                |               |     depending  |
|                |                |               |     on the     |
|                |                |               |     purpose of |
|                |                |               |     the step   |
|                |                |               |     record.    |
|                |                |               | -   An Dynamic |
|                |                |               |     Variable   |
|                |                |               |     token      |
|                |                |               |     (with a    |
|                |                |               |     short name |
|                |                |               |     length)    |
|                |                |               |     may be     |
|                |                |               |     used in    |
|                |                |               |     this       |
|                |                |               |     field,     |
|                |                |               |     similar to |
|                |                |               |     the way a  |
|                |                |               |     token may  |
|                |                |               |     be         |
|                |                |               |     inserted   |
|                |                |               |     into the   |
|                |                |               |     String To  |
|                |                |               |     Send       |
|                |                |               |     field.     |
|                |                |               | -   However,   |
|                |                |               |     before     |
|                |                |               |     this Step  |
|                |                |               |     is         |
|                |                |               |     executed,  |
|                |                |               |     the Token  |
|                |                |               |     must be    |
|                |                |               |     set to one |
|                |                |               |     of the     |
|                |                |               |     valid      |
|                |                |               |     mnemonic   |
|                |                |               |     values for |
|                |                |               |     a function |
|                |                |               |     key, as    |
|                |                |               |     appear on  |
|                |                |               |     the prompt |
|                |                |               |     Window     |
|                |                |               |     when       |
|                |                |               |     F4=Prompt  |
|                |                |               |     is pressed |
|                |                |               |     from this  |
|                |                |               |     field.     |
|                |                |               | -   A Step     |
|                |                |               |     record may |
|                |                |               |     have only  |
|                |                |               |     a function |
|                |                |               |     key (and   |
|                |                |               |     no String  |
|                |                |               |     To Send).  |
|                |                |               |     There are  |
|                |                |               |     also uses  |
|                |                |               |     for Step   |
|                |                |               |     records    |
|                |                |               |     that have  |
|                |                |               |     no         |
|                |                |               |     Function   |
|                |                |               |     to send.   |
|                |                |               |                |
|                |                |               | **Example:**   |
|                |                |               | No String to   |
|                |                |               | send is        |
|                |                |               | require when   |
|                |                |               | pressing       |
|                |                |               | \<**Enter**\>  |
|                |                |               | is required to |
|                |                |               | bypass a       |
|                |                |               | display that   |
|                |                |               | does not       |
|                |                |               | require any    |
|                |                |               | data input.    |
+----------------+----------------+---------------+----------------+
| Top/Bottom     |                |               | Either or both |
| Control        |                |               | of the control |
| strings        |                |               | string rules   |
|                |                |               | may be         |
|                |                |               | specified.     |
|                |                |               | Both control   |
|                |                |               | rules, when    |
|                |                |               | specified,     |
|                |                |               | must be met in |
|                |                |               | order to       |
|                |                |               | perform any    |
|                |                |               | operation on a |
|                |                |               | Step record.   |
|                |                |               | String to      |
|                |                |               | send, Function |
|                |                |               | to send and    |
|                |                |               | branching      |
|                |                |               | operations are |
|                |                |               | controlled by  |
|                |                |               | these control  |
|                |                |               | string rules.  |
+----------------+----------------+---------------+----------------+
| If no match:   | F              | Y             | -   F = fail   |
|                |                |               |     the Script |
| Skip/Fail      |                |               |     job if a   |
|                |                |               |     rule is    |
|                |                |               |     not        |
|                |                |               |     matched.   |
|                |                |               | -   S = skip   |
|                |                |               |     this Step  |
|                |                |               |     only if a  |
|                |                |               |     rule is    |
|                |                |               |     not        |
|                |                |               |     matched.   |
|                |                |               |     When the   |
|                |                |               |     Skip       |
|                |                |               |     option is  |
|                |                |               |     specified  |
|                |                |               |     there must |
|                |                |               |     be another |
|                |                |               |     Step       |
|                |                |               |     record     |
|                |                |               |     following  |
|                |                |               |     this one   |
|                |                |               |     that will  |
|                |                |               |     process    |
|                |                |               |     the        |
|                |                |               |     current    |
|                |                |               |     display    |
|                |                |               |     format in  |
|                |                |               |     the Script |
|                |                |               |     execution  |
|                |                |               |     program\'s |
|                |                |               |     buffer,    |
|                |                |               |     otherwise  |
|                |                |               |     the Script |
|                |                |               |     Steps will |
|                |                |               |     be out of  |
|                |                |               |     s          |
|                |                |               | ynchronization |
|                |                |               |     with the   |
|                |                |               |     sequence   |
|                |                |               |     of display |
|                |                |               |     formats.   |
|                |                |               |     The Skip   |
|                |                |               |     option     |
|                |                |               |     does not   |
|                |                |               |     include    |
|                |                |               |     any means  |
|                |                |               |     of         |
|                |                |               |     responding |
|                |                |               |     to a       |
|                |                |               |     display    |
|                |                |               |     format by  |
|                |                |               |     itself.    |
+----------------+----------------+---------------+----------------+
| Comp numeric   | N              | N             | Compress       |
|                |                |               | numeric =      |
|                |                |               | forces         |
|                |                |               | processing of  |
|                |                |               | both the Top   |
|                |                |               | and Bottom     |
|                |                |               | control        |
|                |                |               | strings to use |
|                |                |               | numeric        |
|                |                |               | comparison     |
|                |                |               | rules. Both    |
|                |                |               | the control    |
|                |                |               | value and the  |
|                |                |               | found string   |
|                |                |               | at the         |
|                |                |               | specified      |
|                |                |               | location are   |
|                |                |               | first          |
|                |                |               | processed to   |
|                |                |               | remove all but |
|                |                |               | the digits 0 - |
|                |                |               | 9, then each   |
|                |                |               | string of      |
|                |                |               | digits is      |
|                |                |               | right-adjusted |
|                |                |               | and zero       |
|                |                |               | filled into a  |
|                |                |               | numeric work   |
|                |                |               | field before   |
|                |                |               | the comparison |
|                |                |               | is performed.  |
|                |                |               | All compared   |
|                |                |               | values may     |
|                |                |               | include other  |
|                |                |               | characters,    |
|                |                |               | but they will  |
|                |                |               | be ignored and |
|                |                |               | the rule will  |
|                |                |               | pass as long   |
|                |                |               | as the         |
|                |                |               | compressed     |
|                |                |               | numeric digits |
|                |                |               | pass the Rule. |
|                |                |               | If Comp        |
|                |                |               | numeric is     |
|                |                |               | specified,     |
|                |                |               | then character |
|                |                |               | string         |
|                |                |               | comparisons    |
|                |                |               | cannot be      |
|                |                |               | used; include  |
|                |                |               | another Step   |
|                |                |               | record if a    |
|                |                |               | character      |
|                |                |               | string         |
|                |                |               | comparison     |
|                |                |               | must be        |
|                |                |               | provided as an |
|                |                |               | option.        |
+----------------+----------------+---------------+----------------+
| Rule           | EQ             | N             | -   If the     |
|                |                |               |     Rule field |
|                |                |               |     for either |
|                |                |               |     the Top or |
|                |                |               |     Bottom     |
|                |                |               |     control    |
|                |                |               |     string is  |
|                |                |               |     blank,     |
|                |                |               |     that       |
|                |                |               |     control    |
|                |                |               |     string has |
|                |                |               |     no effect. |
|                |                |               | -   Possible   |
|                |                |               |     Rule       |
|                |                |               |     values     |
|                |                |               |     are:       |
|                |                |               |     -   EQ =   |
|                |                |               |         Equal  |
|                |                |               |     -   NE =   |
|                |                |               |         Not    |
|                |                |               |         Equal  |
|                |                |               |     -   GT =   |
|                |                |               |                |
|                |                |               |        Greater |
|                |                |               |         Than   |
|                |                |               |     -   LT =   |
|                |                |               |         Less   |
|                |                |               |         Than   |
|                |                |               |     -   GE =   |
|                |                |               |                |
|                |                |               |        Greater |
|                |                |               |         or     |
|                |                |               |         Equal  |
|                |                |               |     -   LE =   |
|                |                |               |         Less   |
|                |                |               |         or     |
|                |                |               |         Equal  |
+----------------+----------------+---------------+----------------+
| Val: (value)   | blank          | N             | -   Type a     |
|                |                |               |     character  |
|                |                |               |     string     |
|                |                |               |     that will  |
|                | supports       |               |     be         |
|                | **DynVar**     |               |     compared   |
|                |                |               |     to the     |
|                |                |               |     location   |
|                |                |               |     specified  |
|                |                |               |     on the     |
|                |                |               |     current    |
|                |                |               |     display    |
|                |                |               |     format.    |
|                |                |               | -   This field |
|                |                |               |     can be     |
|                |                |               |     left blank |
|                |                |               |     so that    |
|                |                |               |     blanks     |
|                |                |               |     will be    |
|                |                |               |     used for   |
|                |                |               |     the        |
|                |                |               |     comparison |
|                |                |               |     if the     |
|                |                |               |     Length is  |
|                |                |               |     specified. |
|                |                |               |     The Length |
|                |                |               |     field      |
|                |                |               |     determines |
|                |                |               |     how many   |
|                |                |               |     blank      |
|                |                |               |     characters |
|                |                |               |     will be    |
|                |                |               |     compared.  |
|                |                |               | -   This field |
|                |                |               |     supports a |
|                |                |               |     Dynamic    |
|                |                |               |     Variable   |
|                |                |               |     token.     |
+----------------+----------------+---------------+----------------+
| R: (row)       |                | N             | Type a value   |
|                |                |               | from 1 to 24   |
|                |                |               | to designate   |
|                |                |               | the vertical   |
|                |                |               | row of the     |
|                |                |               | display that   |
|                |                |               | should be      |
|                |                |               | searched for   |
|                |                |               | the Control    |
|                |                |               | string.        |
|                |                |               |                |
|                |                |               |                |
|                |                |               |                |
|                |                |               | **Note:**      |
|                |                |               | There may be   |
|                |                |               | row numbers    |
|                |                |               | higher than 24 |
|                |                |               | when alternate |
|                |                |               | display        |
|                |                |               | formats are    |
|                |                |               | being used,    |
|                |                |               | however,       |
|                |                |               | screen formats |
|                |                |               | other that     |
|                |                |               | \*DS3 (24 rows |
|                |                |               | by 80 columns) |
|                |                |               | are not        |
|                |                |               | supported at   |
|                |                |               | this time.     |
|                |                |               | Contact SMA    |
|                |                |               | Support if     |
|                |                |               | support for 27 |
|                |                |               | X 132 formats  |
|                |                |               | is required.   |
+----------------+----------------+---------------+----------------+
| C: (column)    |                | N             | Type a value   |
|                |                |               | from 1 to 80   |
|                |                |               | to designate   |
|                |                |               | the horizontal |
|                |                |               | column         |
|                |                |               | position where |
|                |                |               | the Top string |
|                |                |               | must begin.    |
|                |                |               |                |
|                |                |               |                |
|                |                |               |                |
|                |                |               | **Note:**      |
|                |                |               | Refer to the   |
|                |                |               | note on R:     |
|                |                |               | (row) about    |
|                |                |               | value limits.  |
+----------------+----------------+---------------+----------------+
| L: (length)    |                | N             | -   Type a     |
|                |                |               |     length up  |
|                |                |               |     to 30      |
|                |                |               |     characters |
|                |                |               |     that       |
|                |                |               |     indicates  |
|                |                |               |     how long a |
|                |                |               |     control    |
|                |                |               |     string     |
|                |                |               |     value      |
|                |                |               |     should be  |
|                |                |               |     used.      |
|                |                |               | -   When the   |
|                |                |               |     control    |
|                |                |               |     string is  |
|                |                |               |     not blank, |
|                |                |               |     this value |
|                |                |               |     is         |
|                |                |               |     optional   |
|                |                |               |     and the    |
|                |                |               |     system     |
|                |                |               |     assumes    |
|                |                |               |     the length |
|                |                |               |     is equal   |
|                |                |               |     to the     |
|                |                |               |     last       |
|                |                |               |     non-blank  |
|                |                |               |     character. |
|                |                |               | -   However,   |
|                |                |               |     if         |
|                |                |               |     trailing   |
|                |                |               |     blanks     |
|                |                |               |     must be    |
|                |                |               |     included,  |
|                |                |               |     or if the  |
|                |                |               |     whole      |
|                |                |               |     control    |
|                |                |               |     string     |
|                |                |               |     must be a  |
|                |                |               |     certain    |
|                |                |               |     number of  |
|                |                |               |     blanks,    |
|                |                |               |     then the   |
|                |                |               |     length     |
|                |                |               |     specifies  |
|                |                |               |     exactly    |
|                |                |               |     how long   |
|                |                |               |     the        |
|                |                |               |     control    |
|                |                |               |     string is  |
|                |                |               |     and how    |
|                |                |               |     many       |
|                |                |               |     characters |
|                |                |               |     in the     |
|                |                |               |     display    |
|                |                |               |     format     |
|                |                |               |     location   |
|                |                |               |     specified  |
|                |                |               |     must       |
|                |                |               |     match.     |
+----------------+----------------+---------------+----------------+

:  

###### Functions

-   **F3=Exit**: (Not shown, but supported.) Quits maintenance function
    without completing any data changes and return to the menu.

-   **F4=Prompt**: View the list of values for certain fields and allow
    one value from the list to be selected and inserted into the
    prompted field.
    1.  String to send: \<**F4**\> shows a list of cursor control
        commands that may be inserted.
    2.  Function to send: \<**F4**\> shows a list of valid function keys
        that may be specified.
    3.  Rule: \<**F4**\> shows a list of valid Rules.

-   **F6=Variable**: Shows the list of the Token/Variable data fields
    that are registered for use with Operator Replay (refer to
    [Tokens/Variables Management](#Tokens/V)). When
    variables are inserted into supported fields, the Operator Replay
    function substitutes the currently registered value in place of the
    token at the time the script is executed.

-   **F7=DSPLBLWU**: Display Label Where Used. If a Step label value has
    been assigned to this step, a script analysis utility will search
    for all Scripts that reference this label value in a branch
    operation and then show a list of the Scripts that use this label
    value.

-   **F8=Cmd prompt**: When the cursor is positioned in the String to
    send field, press \<**F8**\> to branch into IBM i command prompting.
    The selected command and any parameter values prepared during this
    branch will be returned to the string to send field (unless the
    prompting is exited using \<**F3**\> or \<**F12**\>.) Hint: It helps
    to type in a command name first before pressing \<**F8**\>, since
    the access to command entry using this function key is intentionally
    restricted.

-   **F9=DynVar**: Shows a list of Dynamic Variables, when the cursor is
    in a supported field (refer to table of fields, above). When a
    Dynamic Variable is selected from the pop-up window, a formatted
    token is inserted at the current cursor location. The Dynamic
    Variable token will be replaced with its value at run time. Captured
    Data Response Rules (linked to the same step, or to prior steps) can
    be used to set Dynamic Variable values just before they are used.

-   **F10=Capt Defn**: After the Step Sequence (number) field has been
    specified, it is possible to press \<**F10**\> to branch into the
    Work with Screen Capture Definitions screen. (Refer to [OR Script     Operations](#OR) for an outline of how to use this
    function key. Also refer to the [OR Script Screens and     Windows](#OR2) below for more information about
    Screen Capture definitions.) Remember to press \<**Enter**\> after
    returning from this branch in order to complete the creation or
    change of the Operator Replay Step detail record.

-   **F12=Cancel**: (Not shown, but supported.) Quits the maintenance
    function without completing any data changes and returns to the list
    of step records.

#### Discussion of Receive Timer Override

Thescreen above shows the Receive timer override field, just under the
Sequence number field. This field will display blank when zero. A zero
or blank value means that there is no override, and the control file
default Receiving Data Timeout value applies to this step.

 

The Receive timer override value is specified in seconds (not
microseconds, as in the Operator Replay Configuration screen) because it
is assumed that an override value will be a generally larger value and
not require timing as small as microseconds. For example, specifying a
value of 360 in this field means that the LSAM Operator Replay Script
driver program will wait up to 6 minutes for this step to execute,
rather than timing out after only the 30 seconds specified in the
control record.

 

A value specified for the step Receive timer override value will have no
effect on any other step of a Script. The system allows a step with a
timer override to complete more promptly, and the script will continue
processing as soon as the step is complete (that is, after the
Inter-read delay value and/or the Post send delay value specified in the
Operator Replay control record). There is no penalty for specifying a
longer Receive timer override value.

 

If a branch operation is being used in a Script there are special rules
for making sure that the expected timer override value will apply. Refer
to the discussion about this timer override field above, in the section
about how to use Script branching.

#### Windows

##### Function to Send

Function to Send

  ----------------------------------------------------------------
   Fctn Selection 
     [ACK  ]{style="color: #008000; background-color: #00ff00;"}      [ATT]{style="color: #008000;"}[N]{style="color: #008000;"}
     ENTER
     F1
     F10
     F11
     F12
     F13
     F14
     F15
     F16
     F17
     F18
     F19
     F2
     F20
         More\...
   F12=Cancel
  ----------------------------------------------------------------

 

  -------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [The special function key value ACK does not generate any data sent to the Host system. It is used to clear the script driver program\'s screen image buffer, typically after a \*STATUS message was received from the host. (Status messages do not require any response by a human operator, but the driver program may need to clear them in order to manage step timeouts.)]
  -------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

###### Functions

-   **Cursor up/down**: Moves the cursor down or back up to select the
    function that is inserted into the Function to send field.
-   **Pageup/Pagedown**: When the window shows \"More...\" at the
    bottom, right-hand corner, use the Paging keys to show other valid
    values from the entire list.
-   **Enter**: Returns the currently highlighted function and inserts it
    into the Function to send field.
-   **F12=Cancel**: Quits the window and returns to the step details
    screen without selecting a function.

##### Cursor Control Selection

Cursor Control Selection Window

  -----------------------------------------------------------------------
    Cur Ctl Sel 
   
  [Backspace      ]{style="color: #008000; background-color: #00ff00;"}   [Cursor Dow]{style="color: #008000;"}[n]{style="color: #008000;"}
  Cursor Left
  Cursor Right
  Cursor Up
  Field Advance
  Field Backspace        
  Field Exit
  New Line
     
     
     
     
     
         Bottom
  F12=Cancel
  -----------------------------------------------------------------------

###### Functions

-   **Cursor up/down**: Moves the cursor down or back up to select the
    cursor control operation that is inserted into the String to send
    field.

-   **Page Up/Page Down**: When the window shows \"More...\" at the
    bottom, right-hand corner, use the Paging keys to show other valid
    values from the entire list.

-   **Enter**: Return the currently highlighted cursor control operation
    and inserts it into the String to send field.

-   **F12=Cancel**: Quits the window and returns to the step details
    screen without selecting a cursor control operation.

##### Variable/Token Select

Refer to Token/Variables Management below. Operator Replay Token
variables are supported in the following Step record fields: String to
send, Function to send, Branch-to Script, Branch-to Label and the
Control string Val(ue) fields. SMA recommends using Dynamic Variables
instead of this older type.

Variable/Token Selection Window

  ---------------------------------------------------------------------
                              Var Selection
     [DATE1  ]{style="background-color: #00ff00;"}    Application date                   MAXJOBS    Max Concurrent Jobs Token  
                                     
                                     
                                     
                                     
                                     
                                     
                                 Bottom
                               F12=Cancel
  ---------------------------------------------------------------------

###### Functions

-   **Cursor up/down**: Moves the cursor down or back up to select the
    variable that should be inserted into the supported Step field.
-   **Page Up/Page Down**: When the window shows \"More...\" at the
    bottom, right-hand corner, use the Paging keys to show other valid
    values from the entire list.
-   **Enter**: Returns the currently highlighted variable as a token and
    inserts it into the supported field where the cursor was last
    positioned.
-   **F12=Cancel**: Quits the window and returns to the step details
    screen without selecting a variable.

##### Select Dynamic Variable

SMA recommends using these Dynamic Variables instead of the older
Operator Replay Token variables in Operator Replay Script Steps. The
fields that support Dynamic Variables are marked in the table of screen
format fields, above. When the DynVar function key is pressed, the
following window overlays the display. Position the cursor to the
desired variable name, then press \<**Enter**\> to insert the variable
name surrounded by the token special characters into the field at the
current cursor location.

Dynamic Variable Selection Window

  --------------------------------------------------------------------------------------------------------
                                             Select Dynamic Var
                                                      
                                              Dynamic Var.   Seq
      [ANYMSGTXT ]{style="color: #008000; background-color: #00ff00;"}      [00]{style="color: #008000;"}                                               MAXJOBS         00
                                              TESTSTSVAR      00
                                                      
                                                   Bottom
                                                      
                                         Enter=Select   F12=Cancel 
  --------------------------------------------------------------------------------------------------------

###### Functions

-   **Cursor up/down**: Moves the cursor down or back up to select the
    variable that should be inserted into the supported Step field.
-   **Page Up/Page Down**: When the window shows \"More...\" at the
    bottom, right-hand corner, use the Paging keys to show other valid
    values from the entire list.
-   **Enter**: Returns the currently highlighted variable as a token and
    inserts it into the supported field where the cursor was last
    positioned.
-   **F12=Cancel**: Quits the window.

### Operator Replay Log Selection

Operator Replay Log Selection Screen

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- --
  [OPRLOGR00-1]{style="color: #008000;"}             Operator Replay Log Selection             [   00/00/00]{style="color: #008000;"}                                                                                                                                                                                                                                                                                       QSECOFR                                                              00:00:00                                                                                                                                                                                                                                                                                                                                          
                                                                                                                                                                                                                                                                                                                                                                                                                         
  Position to Script Name\...   \_\_\_\_\_\_\_\_\_                                                                                                                                                                                                                                                                                                                                                                       
  Type options, press Enter.                                                                                                                                                                                                                                                                                                                                                                                             
     5=Display   8=RpyUsrJob   9=WRKJOB                                                                                                                                                                                                                                                                                                                                                                                  
  \- IBM i Replay Control Job -                                                                                                                                                                                                                                                                                                                                                                                          
  [Opt]{style="text-decoration: underline;"} [Script    ]{style="color: #ff00ff;text-decoration: underline;"}  [Rpy User  ]{style="text-decoration: underline;"}  [   Date   ]{style="text-decoration: underline;"} [  Time  ]{style="text-decoration: underline;"}  [Name      ]{style="text-decoration: underline;"} [User      ]{style="text-decoration: underline;"} [Number]{style="text-decoration: underline;"}       \_  TSTOPRPY02  TSTOPR      03/12/0000 10:06:06  TSTJOBNM   QSECOFR    109972                                                                                                                                                                                                                                                                                                                                         
   \_  [TSTOPRPY02  TSTOPR      03/09/0000 16:35:05  TSTJOBNM   USER01     109787]{style="color: #ff0000;"}                                                                                                                                                                                                                                                                                                                  \_  TSTOPRPY02  TSTOPR      03/09/0000 16:34:12  TSTJOBNM   USER01     109787                                                                                                                                                                                                                                                                                                                                         
   \_  TSTOPRPY02  TSTOPR      03/09/0000 15:45:43  TSTJOBNM   USER01     109776                                                                                                                                                                                                                                                                                                                                         
                                                                                                                                                                                                                                                                                                                                                                                                                         
                                                                                                                                                                                                                                                                                                                                                                                                                         
                                                                                                                                                                                                                                                                                                                                                                                                                         
  More\...                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                         
  F3=Exit   F5=Refresh   F11=Sort date   F12=Cancel                                                                                                                                                                                                                                                                                                                                                                      
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- --

 

The example above illustrates that the list of log index entries uses
red to highlight any jobs that completed with a non-zero completion
code. The color blue indicates that the Script job is still active;
green indicates a normally completed job; white indicates that the job
is no longer found in the system (rare).

 

Use option 5=Display to view more information about any job, including
the error code and text that describes the job completion status. From
the detail display of each Operator Replay job, function key \<**F10**\>
may be used to view the Operator Replay Script Log entries, as
illustrated above and below. F10 is also supported for incomplete/active
jobs.

###### Menu Pathways

Main Menu \> Operator replay menu (\#4) \> Operator Replay logs (\#3)

###### Fields

  Field        Description
  ------------ -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Opt          \<**Tab** to the line of a step record and type an option number. Press \<**Enter**\> to perform the option function. Type 5 to view the log information for the execution of the script.
  Script       The name of the Script that was executed at each date and time.
  Rpy User     The name of the IBM i User ID that was specified to run the script.
  Date         The date when this Script was executed.
  Time         The time when this Script was executed.
  Job Name     The name of the IBM i job that controlled the script execution.
  Job User     The name of the IBM i user that controlled the script execution.
  Job Number   The number of the IBM i job that controlled the script execution (NOT the number of the script\'s emulated job).

  :  

###### Options

-   **5=Display**: To view the log entry details and access the log
    entry content, type 5 next to the selected script name and
    date/time. Press \<**Enter**\> to proceed to the log content viewer.
-   **8=RpyUsrJob**: (View Replay User Jobs) To view all the jobs that
    have been run by the specified replay script user, type 8 next to
    the selected script name and date/time. Press \<**Enter**\> to
    proceed to a list of jobs that were run with this user name. This
    option is useful for locating the printed output of the actual
    emulated interactive job that was executed by the script. Since it
    is not easily possible to identify the actual emulated job number
    while a script is running, the log entry does not contain this
    information. The user name used for the job is known, so a list of
    all jobs associated with this user provides a limited list of jobs
    that may be reviewed.
-   **9=WRKJOB**: (Work with Job) To view any information remaining in
    the system about the job that controlled execution of the replay
    script, type 9 next to the selected script name and date/time. Press
    \<**Enter**\> to proceed to the IBM i Work with Job menu. Just in
    case any problems require research, this option can be used to find
    a job log from the job that controlled script execution. This is NOT
    the actual script emulation job. It is the job that launched the
    operator emulation script.

###### Functions

-   **F3=Exit**: Quits the list of log files and return to the menu.
-   **F5=Refresh**: Shows an updated list of script log files, in case
    more have been added since the list was first displayed.
-   **F11=Sort date/Sort script**: Changes the order in which log
    entries are shown on the display. The column heading of the current
    sort order is shown in pink. When F11 is selected, the F11 function
    key legend text changes as well as the prompt text in front of the
    Position to... input field. This function key makes it easier to
    locate script log index entries, depending on whether the script
    name or the date/time of execution is known.
-   **F12=Cancel**: Quits the list of log files and returns to the menu.

### Operator Replay Display Log Detail

Example Operator Replay Display Log Entry

  -------------------------------------------------------------------------------------------------------------------------------------
  [OPRLOGR00-2]{style="color: #008000;"}               Operator Replay Log Entry                  [00/00/00]{style="color: #008000;"}   USERNAME                                                             00:00:00
   
  Press F10=Log detail to see captured dialog.
   
  Script name\...\...\...\...\....: TSTOPRPY02
  Replay job user name\...\....: TSTOPR
  [Replay job return code\.....: 0]{style="color: #008000;"}  [Normal end of job]{style="color: #ff00ff;"}   OPRLOGF10 data member name.: O234567890
  Job date\...\...\...\...\...\....: 03/12/0000
  Job time\...\...\...\...\...\....: 10:06:06
  IBM i control job name\.....: JOBNAME
  IBM i control job user\.....: QSECOFR
  IBM i control job number\...: 109972
   
   
   
  F3=Exit   F8=RpyUsrJob   F9=WRKJOB   F10=Log detail   F12=Cancel            
  -------------------------------------------------------------------------------------------------------------------------------------

###### Menu Pathways

Main Menu \> Operator replay menu (\#4) \> Operator Replay logs (\#3) \>
option (\#5)

###### Fields

  Field                        Description
  ---------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Script name                  The name of the Script that was executed at each date and time.
  Replay job user name         The name of the IBM i User ID that was specified to run the script.
  Replay job return code       The code returned by the script control job. The interpretation of the code appears to the right of the code in pink text.
  OPRLOGF10 data member name   For technical support use, this is the name of the data member that was added to the script log file OPRLOGF10, in which the actual script logging data was stored. The member name is comprised of an initial letter \"O\" followed by digits 2 through 10 of the SAM job name (if OpCon/xps executed the job in normal mode \"O\") or all 6 digits of the IBM i controlling job (if the job was executed in the debug mode \"A\").
  Job date                     The date when this Script was executed.
  Job time                     The time when this Script was executed.
  IBM i control job name       The name of the IBM i job that controlled the script execution.
  IBM i control job user       The name of the IBM i user that controlled the script execution.
  IBM i control job number     The number of the IBM i job that controlled the script execution (NOT the number of the script\'s emulated job).

  :  

###### Functions

-   **F3=Exit**: Quits the list of log files and returns to the menu.
-   **F8=RpyUsrJob**: (view Replay User Jobs) To view all the jobs that
    have been run by the specified replay script user, type 8 next to
    the selected script name and date/time. Press \<**Enter**\> to
    proceed to a list of jobs that were run with this user name. This
    option is useful for locating the printed output of the actual
    emulated interactive job that was executed by the script. Since it
    is not easily possible to identify the actual emulated job number
    while a script is running, the log entry does not contain this
    information. The user name used for the job is known, so a list of
    all jobs associated with this user provides a limited list of jobs
    that may be reviewed.
-   **F9=WRKJOB**: (Work with Job) To view any information remaining in
    the system about the job that controlled execution of the replay
    script, type 9 next to the selected script name and date/time. Press
    \<**Enter**\> to proceed to the IBM i Work with Job menu. This
    option can be used to find a job log from the job that controlled
    script execution, in case any problems require research. This is NOT
    the actual script emulation job, but the job that launched the
    operator emulation script.
-   **F10=Log detail**: View the actual log content to see the recorded
    system output and the automated script input.
-   **F12=Cancel**: Quits the list of log files and return to the menu.

#### Replay Log Detail (F10)

The Operator Replay Display Log function is explained in detail above
under OR Script Operation \> [Viewing Operator Replay Logs](#Viewing).

### Tokens/Variables Management

+----------------------------------+----------------------------------+
| ![White pencil/paper icon on     | **NOTE:** [SMA recommends using  | | gray circular                    | Dynamic Variables instead of the |
| background](../../.              | older, simple Operator Replay    |
| ./Resources/Images/note-icon(48x | token/variables. Documentation   |
| 48).png "Note icon") | of this older variable type is   |
|                                  | retained to support existing     |
|                                  | users. Dynamic Variables are     |
|                                  | explained in detail in Events    |
|                                  | and Utilities menu.] |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | The terms Token and Variable may |
|                                  | be used interchangeably, but the |
|                                  | actual meaning assigned to these |
|                                  | terms is: A Variable is an entry |
|                                  | in the LSAM table of Operator    |
|                                  | Replay Variables, and it         |
|                                  | includes its name, a description |
|                                  | and its current value setting. A |
|                                  | Token represents the Variable in |
|                                  | the one of the Operator Replay   |
|                                  | Step detail record fields. The   |
|                                  | format of a Token is             |
|                                  | \|variable_name\|, where the     |
|                                  | vertical bars (pipes) are the    |
|                                  | special character used to        |
|                                  | separate the Token from other    |
|                                  | text in the string to send       |
|                                  | field. The special character     |
|                                  | assigned to denote Operator      |
|                                  | Replay Tokens is specified in    |
|                                  | the Operator Replay              |
|                                  | configuration function, LSAM     |
|                                  | menu 4, option 7.                |
+----------------------------------+----------------------------------+

#### Tokens/Variables Management Operations

An Operator Replay variable can be added, or have its value reset, using
the IBM i LSAM command ADDRPYTOK (Add Replay Token). Operator Replay
variables can also be added and set by a special field that appears in
the Captured Data Response Rules record. These methods may be helpful to
capture values that exist only while a job is active. But Operator
Replay variables may also be configured in advance, so they are readily
available during maintenance of Script Steps, using the following
procedure.

 

[Add a Token/Variable]{.ul} 
1.  In the command line, enter **STRSMA**. For more information on
    STRSMA command parameters, refer to [The STRSMA     Command](Components-and-Operation.md#The).
2.  Enter **4** to choose the **Operator Replay menu** in the SMA Main
    Menu.
3.  Enter **4** to choose **Operator Token/Variable Management** in the
    Operator Replay Menu.
4.  Press \<**F6**\>.
5.  Enter the Token Name, Token Value, and a Description.

#### Tokens/Variables Management Screen

-   **Screen Title**: Operator Tokens/Variables Management
-   **Screen ID**: OPRVARR00-1

###### Menu Pathways

Main Menu \> Operator replay menu (\#4) \> Operator Token/Variable
management (\#4)

###### Fields

  Parameter                Description
  ------------------------ -----------------------------------------------------------------------------------------------------------------------
  Position to Token Name   To quickly search for a particular token or variable, enter the first characters of the name and press \<**Enter**\>.
  Opt                      Type a valid option value and press \<**Enter**\> to execute the function for one or more entries in the list.
  Token Name               The identifier of the token or variable.
  Token Description        A description of the token or variable.

  :  

###### Options

-   **2=Change**: To change the token/variable, type 2 next to a
    token/variable. Press \<**Enter**\> to proceed to the Change
    Tokens/Variables window.
-   **4=Delete**: To delete the token/variable, type 4 next to the
    token/variable. Press \<**Enter**\> to proceed to the Delete
    Tokens/Variables confirmation window.
-   **5=Display**: Used to view the details of a single record, although
    all details may also be viewed by toggling function key F11.

###### Functions

-   **F3=Exit**: Quits the list function and return to the menu.
-   **F6=Add**: Proceeds to the Add Tokens/Variables window.
-   **F11=View value/View description**: Change the third column in the
    list between showing either the token description or the token
    value. This function key may be used instead of option 5=Display.
-   **F12=Cancel**: Quits the list function and return to the menu.

##### Add (Change) Token Window

-   **Screen Title**: Add Tokens/Variables
-   **Screen ID**: OPRVARR00-2

The Add and Change Token windows appear the same, except for the title.

###### Fields

  Field         Required
  ------------- ----------
  Token Name    Y
  Token Value   Y
  Description   N

  :  

###### Functions

**F12=Cancel**: Quits the Add or Change window and returns to the list
of variables without adding or changing any data.

##### Delete Token Window

Delete Token Window

  ------------------------------------------------------------------------------------------------------------------------------------------
                                                           Delete Tokens/Variables
                                                                       
     [Token Name]{style="text-decoration: underline;"}   [        Token Description                ]{style="text-decoration: underline;"}                                                             \$TEST        Valeur de Test
                                                     MAXJOBS      Max Concurrent Jobs Token
                                                                       
                                                                   More\...
                                                          Enter=Confirm   F12=Cancel
  ------------------------------------------------------------------------------------------------------------------------------------------

###### Fields

  Field               Description
  ------------------- -------------------------------------------------
  Token Name          The name of the deleted token or variable.
  Token Description   A description of the deleted token or variable.

  :  

###### Functions

**F12=Cancel**: Quits the Delete confirmation window and returns to the
list of variables without deleting any records.

#### ADDRPYTOK Command for Setting Operator Replay Variables

The LSAM utility command ADDRPYTOK can be used from IBM i command entry
or from within a job submitted by OpCon/xps to complete the same Create
or Change maintenance of the Operator Replay Tokens as the LSAM screens
above. This command is able to add new variables to the LSAM table when
the do not already exist, or to update the value of an existing token.

 

Also refer to the discussion below, under Captured Data Response Rules,
about how the response rules can also be used to create or set the value
of Operator Replay Token Variables.

### Work with Screen Capture Definitions

-   **Screen Title**: Work with Screen Capture Definitions
-   **Screen ID**: OPRR40R1

The same data capture functions support both Screen data capture for
Operator Replay and report data capture for the SCANSPLF utility
command. Some of the following description includes information that is
useful in distinguishing between the two different types of data
capture. Each actual data capture definition and the captured data
record are labeled by their Type field, where \"C\" = screen capture and
\"S\" = spool file capture.

 

Refer to the topic on Events and Utilities menu, for more information
about ways to use data capture and captured data response rules.

###### Menu Pathways

-   Main Menu \> Operator replay menu (\#4) \> Operator Replay Scripts
    (\#2) \> Script step list (Opt 1) \> F6=Add **- or -** option
    2=Change **- or -** option 3=Copy \> F10=Capt Defn.
-   Main Menu \> Operator replay menu (\#4) \> Work with Screen Capture
    Definitions (\#5)

###### Fields

  Field            Description
  ---------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Script:          When this Work With list has been called using function key F10 from the Operator Replay Step record screen, the name of the Operator Replay script is fixed and it appears in the heading of this list display.
  (Script) Seq:    When this Work With list has been called using function key F10 from the Operator Replay Step record screen, the sequence number of the Operator Replay Step is fixed and it appears in the heading of this list display.
  Search content   Type a value in this field and press \<**Enter**\> or \<**F16**\> to initiate a search for a record that has matching data anywhere in the record, including data that might not appear on the list display (but the matching data would appear in the display of the detail of the record). When \<**F16**\> is pressed a second time, the search continues from after the last matching record, using the same Search content data. Press \<**Enter**\> a second time (with no options typed), or press \<**F5=Refresh**\> to start a new search.
  Opt              Type option from list displayed near the top of this screen. Refer to options definitions, below.
  Rpy Script       Replay Script name: Each screen capture definition is associated with a specific Operator Replay script name.
  /Seq             Replay Script Step Sequence number: Each screen capture definition is associated with a specific Operator Replay script step Sequence number. The screen capture operation is performed after the screen format is received, but before the string to send or the function key is executed.
  Application ID   A label that groups together all of the data capture rules that apply to a single Operator Replay script step Sequence number. (This field is more important when data capture is used with the SCANSPLF command, and only serves Operator Replay screen capture as a useful means of labeling captured data when it appears in the captured data debug log file list, or when prompting for a Capture ID from Response Rules.)
  Seq              The sequence of the data capture rule. This number determines the order in which data capture rules are executed. The effect of this sequence number is more noticeable when there are captured data response rules associated with each data capture definition, in that it imposes a high level of control over the sequence of response rules that might apply to a given screen format (or to a SCANSPLF spool file).
  Row              For screen data capture, this is the row where the data capture operation starts. (For the SCANSPLF command, this is the report line, within a page, where data is found and captured.)
  Col              The column within the Row (above) where the data capture starts.
  Len              The length of data that should be captured, starting at the Row and Col specified. For Operator Replay screen data, up to 1920 characters of displayable data may be captured by a single capture rule. (For display formats larger than 24 X 80, more than one screen capture rule would be required to capture more than 1920 characters of data. For the SCANSPLF command, the capture length is normally limited to 132 characters, or one print line of data.)

  :  

###### Functions

-   **F3=Exit**: Return to the LSAM menu or to the Operator Replay Step
    maintenance screen.
-   **F5=Refresh**: Reload the list display with the latest data from
    the master file.
-   **F6=Add**: Branch to the screen for creating a new Screen Capture
    Definition record.
-   **F12=Cancel**: Return to the LSAM menu, or to the Operator Replay
    Step maintenance screen.
-   **F16=Search next**: Starts a new search, or continues searching
    after the last found record.
-   **F17=Top**: Reposition the list display to show the first record in
    the list.
-   **F18=Bottom**: Reposition the list display to show the last record
    in the list.

###### Options

-   **2=Change**: To change a record, type 2 in the Opt field next to
    the record(s). Press \<**Enter**\> to proceed to the Change detail
    screen.

-   **3=Copy**: To copy a record, type 3 in the Opt field next to the
    record. Press \<**Enter**\> to proceed to the Copy detail screen.

-   **4=Delete**: To delete one or more records, type 4 next to each
    record. Press \<**Enter**\> to proceed to the Delete confirmation
    window.

-   **5=Display**: To display record details, type 5 next to each
    record. Press \<**Enter**\> to proceed to the display details
    screen. Typing option 5 next to many or all records at once before
    pressing \<**Enter**\> is a convenient way to review all the
    definition details at once. Press \<**Enter**\> to advance as each
    detail screen is presented.

-   **6=Response**: To display a list of all captured data response
    rules that pertain to each data capture definition, type 6 next to
    each record. Press \<**Enter**\> to branch to the Work with Capture
    Response Rule list display. After exiting the Response list for each
    Capture Rule, another list will display for each Capture Rule record
    selected with option 6.

#### Add/Change/Copy Screen Capture Definitions

-   **Screen Title**: Copy Screen Capture Definition
-   **Screen ID**: OPRR40R2

###### Menu Pathways

-   Main Menu \> Operator replay menu (\#4) \> Operator Replay Scripts
    (\#2) \> Script Steps (Opt 1) \> F6=Add **- or -** option 2=Change
    *- or -* option 3=Copy \> F10=Capt Defn \> F6=Add *- or -* option
    2=Change *- or -* option 3=Copy.
-   Main Menu \> Operator replay menu (\#4) \> Work with Screen Capture
    definitions (\#5) \> F6=Add *- or -* option 2=Change *- or -* option
    3=Copy \> F10=Capt Defn \> F6=Add *- or -* option 2=Change *- or -*
    option 3=Copy.

###### Fields

  Field                                Description
  ------------------------------------ ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Application ID:                      When Copying from one definition to another, the labels of the source record appear near the top of the screen as heading information. This field does not appear for Add or Change.
  Capt Seq:                            When Copying from one definition to another, the labels of the source record appear near the top of the screen as heading information. This field does not appear for Add or Change.
  Script name                          Operator Replay Script name: Each screen capture definition is associated with a specific Operator Replay script name. When this screen is accessed using F10 from the Operator Script Step, the value for this field is supplied and protected. When this screen is accessed directly from the LSAM menu, a valid Script Name must be manually entered.
  Script Sequence                      Replay Script Step Sequence number: Each screen capture definition is associated with a specific Operator Replay script step Sequence number. When this screen is accessed using F10 from the Operator Step, the value for this field is supplied and protected. When this screen is accessed directly from the LSAM menu, a valid Script Sequence number must be manually entered.
  Application ID                       A label that groups together all of the data capture rules that apply to a single Operator Replay script step Sequence number. (This field is more important when data capture is used with the SCANSPLF command, and only serves Operator Replay screen capture as a useful means of labeling captured data when it appears in the captured data debug log file list, or when prompting for a Capture ID from Response Rules.)
  Capture sequence                     The sequence of the data capture rule. This number determines the order in which data capture rules are executed. The effect of this sequence number is more noticeable when there are captured data response rules associated with each data capture definition, in that it imposes a high level of control over the sequence of response rules that might apply to a given screen format (or to a SCANSPLF spool file).
  Screen row start pos(-ition)         For screen data capture, this is the row where the data capture operation starts. (For the SCANSPLF command, this is the report line, within a page, where data is found and captured.)
  Screen col(-umn) start pos(-ition)   The column within the Row (above) where the data capture starts.
  Length of data string                The length of data that should be captured, starting at the Row and Col specified. For Operator Replay screen data, up to 1920 characters of displayable data may be captured by a single capture rule. (For display formats larger than 24 X 80, more than one screen capture rule would be required to capture more than 1920 characters of data. For the SCANSPLF command, the capture length is normally limited to 132 characters, or one print line of data.)

  :  

###### Functions

-   **F3=Exit**: Do not update the data, return to the list display.
-   **F5=Refresh**: Reload the list display with the latest data from
    the master file.
-   **F11=Response rules**: Branch to the screens for maintaining
    Captured Data Response Rules that will be associated with this Data
    Capture definition. This function should not be used until key
    information has been entered to define the Screen Capture
    definition. Remember to press \<**Enter**\> to complete entry or
    update of the Screen Capture definition after returning from the F11
    branch.
-   **F12=Cancel**: Return to the LSAM menu.

### Work with Capture Response Rules

-   **Screen Title**: Work with Capture Response Rules
-   **Screen ID**: OPRR40R1

The same data capture response functions support both Screen data
capture for Operator Replay and report data capture for the SCANSPLF
utility command. Some of the following description includes information
that is useful in distinguishing between the two different types of data
capture. Each actual data capture definition and the captured data
record are labeled by their Type field, where \"C\" = screen capture and
\"S\" = spool file capture.

 

Refer to the topic on Events and Utilities menu, for more information
about ways to use data capture and captured data response rules,
especially about the Continuation (A/O) field.

###### Menu Pathways

-   Main Menu \> Operator replay menu (\#4) \> Operator Replay Scripts
    (\#2) \> Script steps (Opt 1) \> F6=Add *- or -* option 2=Change *-
    or -* option 3=Copy \> F10=Capt Defn \> F6=Add *- or -* option
    2=Change *- or -* option 3=Copy \> F11=Response rules.
-   Main Menu \> Operator replay menu (\#4) \> Work with Captured Data
    Response Rules (\#6).

###### Fields

  Field              Description
  ------------------ -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Script:            When this Work With list has been called using function key F10 from the Operator Replay Step record screen, the name of the Operator Replay script is fixed and it appears in the heading of this list display. (Function key F15=Subset is not shown and the subset type cannot be changed.)
  (Script) Seq:      When this Work With list has been called using function key F10 from the Operator Replay Step record screen, the number of the Operator Replay Step Sequence is fixed and it appears in the heading of this list display. (Function key F15=Subset is not shown and the subset type cannot be changed.)
  Subset to Type:    When this Work With list has been called directly from the menu, the LSAM menu passes a parameter to signal the program whether the call came from the Operator Replay menu (Type = Screen), or from the Events and Utilities Menu (Type = SCANSPLF). Function key F15 can be used to force a change to the Subtype, or to remove subsetting and show all Response rules of both types.
  Search content     Type a value in this field and press \<**Enter**\> or \<**F16**\> to initiate a search for a record that has matching data anywhere in the record, including data that might not appear on the list display (but the matching data would appear in the display of the detail of the record). When \<**F16**\> is pressed a second time, the search continues from after the last matching record, using the same Search content data. Press \<**Enter**\> a second time (with no options typed), or press \<**F5=Refresh**\> to start a new search.
  Opt                Type option from list displayed near the top of this screen. Refer to options definitions, below.
  Capture ID (APP)   A label that groups together all of the data capture rules that apply to a single Operator Replay script step Sequence number. (This field serves Operator Replay screen capture as the means of labeling captured data when it appears in the captured data debug log file list, or when prompting for a Capture ID from Response Rules.)
  Seq                The sequence of the data capture rule. This number determines the order in which data capture rules are executed. The effect of this sequence number is noticeable when there are captured data response rules associated with each data capture definition, in that it imposes a high level of control over the sequence of response rules that might apply to a given screen format (or to a SCANSPLF spool file).
  T                  Type: C = screen capture, S = SCANSPLF data capture.
  RS\#               Rule Sequence Number: The order in which each response rule will be executed.
  Script             When the Type field is C, this shows the ID of the Operator Replay script with which the response rules are associated. (This column becomes the Spool file name for records of Type S.)
  Step \#            When the Type field is C, this shows the Script Step sequence number associated with each response rule. (This column becomes the Spool file number for records of Type S.)
  (Job Name)         When the Type field is S, this column will appear to show the Job Name for the Scan Rule associated with each response rule. (This column is not used for Operator Replay screen data capture and response.)
  Command            The command text (first few characters shown) that will be executed in response to captured data, if the comparison data rule qualifies.

  :  

###### Functions

-   **F3=Exit**: Return to the LSAM menu, or to the Screen Capture
    definition maintenance display.
-   **F5=Refresh**: Reload the list display with the latest data from
    the master file.
-   **F6=Add**: Branch to the screen for creating a new Capture Response
    Rule record.
-   **F12=Cancel**: Return to the LSAM menu, or to the Screen Capture
    definition maintenance display.
-   **F15=Subse**t: When this program was called directly from the LSAM
    menu, this function key appears, permitting a change to the type of
    Response rule appearing in the list. The Subset window offers a
    choice of Type C = screen capture response rules, or S = SCANSPLF
    data capture response rules.
-   **F16=Search next**: When a search argument has been entered in the
    Search content field, pressing F16 can either start a new search (if
    the content value was changed) or it can continue a search to look
    for the next list entry that matches the search argument, starting
    with the first record after the last match found.
-   **F17=Top**: Reposition the list display to show the first record in
    the list.
-   **F18=Bottom**: Reposition the list display to show the last record
    in the list.
-   **F24=More keys**: Change the function key line to show additional
    supported keys.

###### Options

-   **2=Change**: To change a record, type 2 in the Opt field next to
    the record(s). Press \<**Enter**\> to proceed to the Change detail
    screen.
-   **3=Copy**: To copy a record, type 3 in the Opt field next to the
    record. Press \<**Enter**\> to proceed to the Copy detail screen.
-   **4=Delete**: To delete one or more records, type 4 next to each
    record. Press \<**Enter**\> to proceed to the Delete confirmation
    window.
-   **5=Display**: To display record details, type 5 next to each
    record. Press \<**Enter**\> to proceed to the display details
    screen. Typing option 5 next to many or all records at once before
    pressing \<**Enter**\> is a convenient way to review all the
    definition details at once. Press \<**Enter**\> to advance as each
    detail screen is presented.

#### Add/Change/Copy Capture Response Rules

-   **Screen Title**: Copy Capture Response Rule
-   **Screen ID**: OPRR51R2

Refer to the topic on Events and Utilities menu, for more information
about the meaning and purpose of the fields on this display, especially
how the Continuation field works. Also refer to comments below about the
variable fields.

###### Menu Pathways

-   Main Menu \> Operator replay menu (\#4) \> Operator Replay Scripts
    (\#2) \> Script steps (Opt 1) \> F6=Add *- or -* option 2=Change *-
    or -* option 3=Copy \> F10=Capt Defn \> F6=Add *- or -* option
    2=Change *- or -* option 3=Copy \> F11=Response rules \> F6=Add *-
    or -* option 2=Change *- or -* option 3=Copy.
-   Main Menu \> Operator replay menu (\#4) \> Work with Captured Data
    Response Rules (\#6) \> F6=Add *- or -* option 2=Change *- or -*
    option 3=Copy.

###### Fields

+---------------------------+-----------------------------------------+
| Field                     | Description                             |
+===========================+=========================================+
| Script:                   | When this maintenance screen has been   |
|                           | called using function key F10 from the  |
|                           | Operator Replay Step record screen, the |
|                           | name of the Operator Replay script is   |
|                           | fixed and it appears in the heading of  |
|                           | this list display.                      |
+---------------------------+-----------------------------------------+
| (Script) Seq:             | When this maintenance screen has been   |
|                           | called using function key F10 from the  |
|                           | Operator Replay Step record screen, the |
|                           | number of the Operator Replay Step      |
|                           | Sequence is fixed and it appears in the |
|                           | heading of this list display.           |
+---------------------------+-----------------------------------------+
| From fields (Resp Seq)    | When this screen appears in Copy mode,  |
|                           | the key fields of the source record     |
|                           | being copied are shown in this heading  |
|                           | area. When this program is called from  |
|                           | the Operator Replay Step maintenance,   |
|                           | only the Response Sequence appears in   |
|                           | the From field list. A new value must   |
|                           | be assigned to the new Response Rule    |
|                           | record being created in Copy mode,      |
|                           | using the Response Sequence input field |
|                           | (below).                                |
+---------------------------+-----------------------------------------+
| Capture Identifier        | A label that groups together all of the |
|                           | data capture rules that apply to a      |
|                           | single Operator Replay script step      |
|                           | Sequence number. For Copy and Change    |
|                           | operations, this key field is protected |
|                           | from update. This field and the Capture |
|                           | Seq field (next) identify the rule to   |
|                           | which this response record will react.  |
+---------------------------+-----------------------------------------+
| Capture sequence          | The sequence of the data capture rule   |
|                           | to which this response will react. For  |
|                           | Copy and Change operations, this key    |
|                           | field is protected from update. This    |
|                           | number determines the order in which    |
|                           | data capture rules are executed.        |
+---------------------------+-----------------------------------------+
| Capture Type              | The type of the data capture: C =       |
|                           | screen capture, S = SCANSPLF data       |
|                           | capture, M = Message data capture.      |
|                           |                                         |
|                           | Type C is required for Screen Captures  |
|                           | from Operator Replay scripts. For Copy  |
|                           | and Change operations, this field is    |
|                           | protected from update.                  |
+---------------------------+-----------------------------------------+
| Response sequence         | Response Sequence Number: The order in  |
|                           | which each response rule will be        |
|                           | executed. When changing an existing     |
|                           | rule\'s sequence number, pay close      |
|                           | attention to the Continuation field     |
|                           | value, because the order of records is  |
|                           | critical when the Continuation field is |
|                           | used to group multiple response         |
|                           | qualifications (using Compare data) and |
|                           | commands.                               |
+---------------------------+-----------------------------------------+
| Continuation              | -   Continuation field values are:      |
|                           |     blanks, CMD, AND, OR.               |
|                           | -   A value that supports multiple      |
|                           |     groups of commands and/or rules     |
|                           |     that may be qualified for execution |
|                           |     in response to a single record of   |
|                           |     captured data. In summary, the      |
|                           |     values work like this:              |
|                           | -   blank = Starts a new group of       |
|                           |     comparison rules and commands,      |
|                           |     separate and unrelated from other   |
|                           |     rules groups.                       |
|                           | -   OR = an exclusive OR, meaning that  |
|                           |     the next comparison rule or group   |
|                           |     of rules may qualify a response     |
|                           |     command group if the previous rule  |
|                           |     group did not qualify.              |
|                           | -   AND = connects more than one        |
|                           |     qualification rule into a single    |
|                           |     group.                              |
|                           | -   CMD = an additional rules record is |
|                           |     providing an additional response    |
|                           |     command to execute, associated with |
|                           |     the qualification rules of the      |
|                           |     comparison record or group of       |
|                           |     records immediately preceding this  |
|                           |     record. This continuation record    |
|                           |     will be ignored for comparison      |
|                           |     rules, it exists only to support    |
|                           |     multiple commands that are part of  |
|                           |     a single response group.            |
|                           | -   For more information on this field  |
|                           |     and examples, refer to [Events and  | |                           |     Utilities                           |
|                           |     Menu](Event                         |
|                           | s-and-Utilities-Menu.md){.MCXref |
|                           |     .xref}.                             |
+---------------------------+-----------------------------------------+
| Compress numeric          | This flag field tells the LSAM data     |
|                           | comparison rule engine how to handle    |
|                           | the comparison data and the captured    |
|                           | data. If numeric data was edited using  |
|                           | a currency sign and decimal point, it   |
|                           | may be preferable to match the whole    |
|                           | character string exactly, without       |
|                           | compression. But if the absolute        |
|                           | numeric value is important and the      |
|                           | numeric field editing cannot be         |
|                           | predicted, then it may work better to   |
|                           | compress out all non-numeric characters |
|                           | and compare only the numeric digits.    |
|                           | Compressed numeric values do not keep   |
|                           | track of how many digits fall to the    |
|                           | right of the decimal point, so it is    |
|                           | important that the number of decimal    |
|                           | places be the same in both the captured |
|                           | data and the comparison data when the   |
|                           | option for compressing numeric data     |
|                           | will be used.                           |
|                           |                                         |
|                           |                                         |
|                           |                                         |
|                           | **Note:** This flag also affects how    |
|                           | data will be stored for a Dynamic       |
|                           | Variable token name, if specified.      |
+---------------------------+-----------------------------------------+
| Store to-\> DynVar        | Type a name into this field to cause    |
|                           | the current captured data value to be   |
| (Dynamic Variable)        | stored in an LSAM Dynamic Variable of   |
|                           | this name. This function can only store |
|                           | dynamic variables of type-V (general    |
|                           | use). To create or update dynamic       |
|                           | variables of type-L (for updating an    |
|                           | IBM i job local data area image for     |
|                           | LSAM captured or tracked/queued jobs,   |
|                           | use the SETDYNVAR command in the        |
|                           | Response command field and include a    |
|                           | different Dynamic Variable name (that   |
|                           | may be entered into this field) as the  |
|                           | value for the type-L variable.          |
+---------------------------+-----------------------------------------+
| Store to-\> Oper Rply Var | Type a name into this field to cause    |
|                           | the current captured data value to be   |
| (Operator Replay          | stored in an LSAM Operator Replay Token |
|                           | variable of this name. The captured     |
| token/variable)           | data response function linked to        |
|                           | Operator Replay script execution        |
|                           | completes the task of storing the       |
|                           | captured data into this variable field  |
|                           | before the script step is executed.     |
|                           | Therefore, it is possible to use this   |
|                           | variable in fields that define the      |
|                           | script step execution, responding to    |
|                           | the screen that is on display as the    |
|                           | data was captured.                      |
+---------------------------+-----------------------------------------+
| Response cmd (part 1);    | -   The first 214 characters of the     |
|                           |     response command string may be      |
| F13=Full CMD              |     entered in this field. If the       |
|                           |     command is longer than 214          |
|                           |     characters, press \<**F13=Full      |
|                           |     CMD**\> to branch to a screen where |
|                           |     a much longer command string may be |
|                           |     entered. Function key               |
|                           |     \<**F4=Prompt**\> may be used to    |
|                           |     get IBM i help with command         |
|                           |     prompting. Unlike the Compare data  |
|                           |     lines, the entire command string    |
|                           |     will appear in the F13=Full CMD     |
|                           |     screen. Be careful if a partial     |
|                           |     command shows in this field in      |
|                           |     Change mode; in this case it is     |
|                           |     recommended that F13=Full CMD be    |
|                           |     used to be sure that the final      |
|                           |     command syntax is correct after any |
|                           |     changes.                            |
|                           | -   Dynamic Variables may be used in    |
|                           |     place of all or part of the command |
|                           |     line syntax. For more information   |
|                           |     about Dynamic Variables, refer to   |
|                           |     [Dynamic                            | |                           |     Vari                                |
|                           | ables](Dynamic-Variables.md){.MCXref |
|                           |     .xref}.                             |
+---------------------------+-----------------------------------------+
| Comp reference value      | -   The compare reference value is a    |
|                           |     field containing a character string |
|                           |     or a reference to a value store in  |
|                           |     another file, for use in qualifying |
|                           |     this Rule for execution. If the     |
|                           |     referenced value does not match the |
|                           |     Compare data according to the       |
|                           |     Compare rule, then the Capture      |
|                           |     Response Rule Response command will |
|                           |     not be executed.                    |
|                           | -   \*CAPT = Use the captured data as   |
|                           |     the reference data (this is the     |
|                           |     original default for comparing      |
|                           |     data, in prior versions).           |
|                           | -   DynVar = The LSAM Dynamic Variable  |
|                           |     named in this field will be         |
|                           |     compared to the Compare data. (Do   |
|                           |     not type \'DynVar\' but instead     |
|                           |     type the name of a Dynamic          |
|                           |     Variable. Use function key F8 to    |
|                           |     select from a list of existing      |
|                           |     dynamic variables.)                 |
|                           | -   char = a specific string typed in   |
|                           |     this field will be compared to the  |
|                           |     Compare data.                       |
+---------------------------+-----------------------------------------+
| Comp reference length     | Specifies the length of data to be used |
|                           | from the Comp reference value, starting |
|                           | at position 1 of the reference value.   |
|                           | If this field is zero, then the trimmed |
|                           | length of the reference value will be   |
|                           | used. (Trimming means that any trailing |
|                           | blanks will not be considered, only     |
|                           | data from position 1 through the last   |
|                           | non-blank character will determine the  |
|                           | length of the Comp reference value.)    |
+---------------------------+-----------------------------------------+
| Compare rule              | -   Specifies the type of compare to    |
|                           |     use between the Comp reference      |
|                           |     value (which will be factor 1) and  |
|                           |     the Compare data (which will be     |
|                           |     factor 2). For example, if GT is    |
|                           |     specified, then the Comp reference  |
|                           |     value must be greater than the      |
|                           |     Compare data in order for this      |
|                           |     Capture Response Rule to be         |
|                           |     executed.                           |
|                           | -   EQ = equal, NE = not equal, GT =    |
|                           |     greater than, LT = less than, GE =  |
|                           |     greater than or equal, LE = less    |
|                           |     than or equal.                      |
+---------------------------+-----------------------------------------+
| Capture length            | This is a protected field that shows    |
|                           | the length specified for the captured   |
|                           | data. The value will appear in Copy and |
|                           | Change mode. In Add (Create) mode, a    |
|                           | value will be supplied if the F4=Prompt |
|                           | key is used to select a valid Capture   |
|                           | ID and Sequence. Use this field as a    |
|                           | reference when defining the Compare     |
|                           | data.                                   |
+---------------------------+-----------------------------------------+
| Compare data lines 1-5;   | -   The compare data is used to match   |
|                           |     with the original capture data      |
| PagDown=6-24              |     according to the compare rule. The  |
|                           |     compare data may be typed directly  |
|                           |     into this field. Use PageDown to    |
|                           |     show and update lines 6-24; lines   |
|                           |     1-5 only appear on the main         |
|                           |     maintenance screen. Up to 1920      |
|                           |     characters may be specified.        |
|                           | -   If it should be desired to compare  |
|                           |     an entire 24 X 80 screen, that is,  |
|                           |     all 1920 characters, it would be    |
|                           |     possible to copy and paste the      |
|                           |     reference screen image (lines 1-5   |
|                           |     separately from lines 6-24) into    |
|                           |     this field. However, keep in mind   |
|                           |     that only the displayable           |
|                           |     characters are compared. That is,   |
|                           |     field attributes such as color (and |
|                           |     any EBCID character value less than |
|                           |     X\'40\' ) will not be considered; a |
|                           |     space character is used in place of |
|                           |     non-display values.                 |
|                           | -   Special values may be typed into    |
|                           |     this field, instead of actual       |
|                           |     compare data:                       |
|                           | -   \*ANY = No comparison will be       |
|                           |     performed. A command or group of    |
|                           |     commands associated with compare    |
|                           |     data value of \*ANY will always be  |
|                           |     executed.                           |
|                           | -   \*PARM = Reserved for the SCANSPLF  |
|                           |     command. This means that the        |
|                           |     compare data to be used is the same |
|                           |     as the parameter value supplied     |
|                           |     with the SCANSPLF command, except   |
|                           |     that the Compare rules supplied     |
|                           |     with this response record will      |
|                           |     apply. If this value is used with   |
|                           |     an Operator Replay screen data      |
|                           |     capture, it has the same effect as  |
|                           |     \*ANY.                              |
|                           | -   DynVar = This prompting value       |
|                           |     indicates that one or more Dynamic  |
|                           |     Variable tokens may be typed into   |
|                           |     the Compare data lines. DO NOT TYPE |
|                           |     \"DynVar\" into the Compare data.   |
|                           |     Instead, type the Dynamic Variable  |
|                           |     token syntax, which by default      |
|                           |     looks like this:                    |
|                           | -   One or more dynamic variables may   |
|                           |     be typed along with other actual    |
|                           |     compare data. When the response     |
|                           |     rule is qualified for execution,    |
|                           |     the dynamic variable value will be  |
|                           |     retrieved just before the           |
|                           |     comparison operation is performed.  |
|                           |     Keep in mind that the result of     |
|                           |     replacing a dynamic variable may be |
|                           |     longer or shorter than the dynamic  |
|                           |     variable token. It is important to  |
|                           |     anticipate the exact length and     |
|                           |     content of the compare data line(s) |
|                           |     as they will look after dynamic     |
|                           |     variable tokens are replaced. For   |
|                           |     more information about Dynamic      |
|                           |     Variables, refer to [Dynamic        | |                           |     Vari                                |
|                           | ables](Dynamic-Variables.md){.MCXref |
|                           |     .xref}.                             |
+---------------------------+-----------------------------------------+

:  

###### Functions

-   **F3=Exit**: Return to the LSAM menu, or to the Screen Capture
    definition maintenance display.
-   **F4=Prompt**: When the cursor is positioned in the Capture
    identifier or Capture sequence fields, a window appears for
    selecting from a list of available capture identifiers. The contents
    of the list depends on whether this display is being used for
    Operator Replay screen data capture, or for SCANSPLF report data
    capture.
-   **F5=Refresh**: Reload the maintenance display with the original
    default values for Add, Copy or Change, discarding any new typed
    input.
-   **F8=DynVar**: Open a window to select an available Dynamic
    Variable, for use with the Response Command, the Comp Reference
    Value or the Compare Data fields.
-   **F9=Event cmds**: Presents a window from which OpCon event commands
    may be selected. After a command is selected, that command is
    prompted so that the final command format with parameter values may
    be automatically entered in the Response cmd field. The CPYTOMSGIN
    command also triggers a sub-menu window from which the appropriate
    OpCon command format syntax can be selected, and the syntax model
    can be updated after it is inserted into the Response cmd field.
-   **F10=\$Var**: When used in supported data entry fields, brings up a
    list of \$-Special variables that are supported by the Operator
    Replay -- Screen data capture function.
-   **F12=Cancel**: Return to the LSAM menu, or to the Screen Capture
    definition maintenance display.
-   **F13=Full CMD**: Branch to a sub-display that uses the whole screen
    to show the entire available space for entering long command text
    strings. Any data entered on the short (part 1) command entry line
    will be carried forward for display on the full command entry
    screen. After returning from the full entry screen, the first 214
    characters of the longer command will appear in the short (part 1)
    Response cmd field.
-   **F24=More keys**: Change function key line to show additional
    supported keys.

##### Using Dynamic Variables to Set an Operator Replay Token Variable

There may be times when the value of an LSAM Dynamic Variable should be
used in fields of an Operator Replay Script step definition, where only
Operator Replay token variables are supported. In that case, the
Captured Data Response rules for Operator Replay screen capture
definitions can be used to transfer the value of a Dynamic Variable to
the Operator Replay token variable. The response command of the captured
data response rule is one of the places where IBM i commands can be
executed by the LSAM and have the LSAM interpret the value of a Dynamic
Variable token.

 

The example screen format above for the Capture Response Rule shows an
example of how the ADDRPYTOK command could be constructed with an
embedded Dynamic Variable. This screen example also shows that the
dynamic variable named DYNVAR1 would be updated by this same response
rule. So the net effect of the example above is the same as if the
Operator Replay token variable name (ORTOKEN) were entered in the
capture response rule\'s Operator Replay variable name field. But the
command syntax illustrated is what is important to this discussion. This
command syntax would be useful if a different Dynamic Variable were
actually being used in the command, such as a Dynamic Variable that
might have been updated by a different job that executed before the
Operator Replay script job.

### F10=\$VAR Pop-up Window Values

Display format OPRR50R2 supports function key F10 for selecting
\$Variable tokens that can be inserted into various supported fields of
the Captured Data Response Rules. These tokens do not require any
special characters around them. Instead, they should be left inserted
with the US dollar sign (\$) at the beginning, all capital letters and
spaces just where they are shown.

 

The Operator Replay Script driver program will recognize exactly spelled
tokens and then replace them with the values shown in the following
table; however, the values for OpCon properties, such as \$SCHEDULE
values, can only be replaced if the Script job was started by OpCon.
They are not valid when Scripts are executed independently of OpCon, for
example, if a Script is being executed in a test mode directly from a
job started by the IBM i SBMJOB command, or if the STROPRRY command is
executed from a user\'s interactive job command line.

 

  ------------------ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  \$FREQUENCY NAME   The name of the OpCon Frequency assigned to the OpCon job that started the Script driver job (twhich is executing the Script (not the Job ID of the interactive workstation job),.
  \$IBM JOB ID       The full IBM i job ID for the job which is executing the Script (not the Job ID of the interactive workstation job), in the format of 123456/USER/NAME.
  \$IBM JOB NAME     The IBM i Job Name of the job which is executing the Script (not the Job ID of the interactive workstation job).
  \$IBM JOB NBR      The IBM i Job Number of the job which is executing the Script (not the Job ID of the interactive workstation job).
  \$IBM JOB USER     The IBM i User Profile that is part of the Job ID which is executing the Script (not the Job ID of the interactive workstation job).
  \$JOBID            The OpCon job identified, a 10-digit number, of the OpCon job that started the Script job.
  \$JOBID CMP        The OpCon job name and job identifier, joined into a single string with blanks compressed out, for the OpCon job that started the Script job.
  \$JOBID LONG       The OpCon job name, followed by the job identifier, with all blanks retained in the string, for the OpCon job that started the Script job.
  \$JOB NAME         The short format of the OpCon job name, for the job that started the Script job.
  \$JOB LONG NAME    The long format of the complete OpCon job name, for the job that started the Script job.
  \$MACHINE NAME     The OpCon name for the Agent (LSAM) machine in which the Script job is executing.
  \$SCHEDULE DATE    The date of the OpCon schedule under which the current job was started, in the (\*ISO0) format of CCYYMMDD.
  \$SCHEDULE NAME    The name of the OpCon schedule under which the current job was started.
  \$SCRIPT ID        The name of the Operator Replay Script. This combines with the \$STEP SEQ\# to uniquely identify a Step record in the Agent\'s database table.
  \$SCRIPT USER      The name of the IBM i User Profile that was used to log into the green screen workstation session. Since this User name can be assigned from various sources, this variable is helpful for documenting this detail about the Script execution, and for finding jobs that were initiated by this User name.
  \$STEP SEQ\#       The unique number assigned to a Step master record from the Operator Replay Script. This combines with the \$SCRIPT ID to uniquely identify a Step record in the Agent\'s database table.
  ------------------ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  : [F10=\$Var: \$-Special variables supported for Operator Replay   Response Rules]{style="font-family: 'Century Gothic';"}

 

### Display Captured Data Log

The function for displaying the captured data log is important as an
auditing tool. This inquiry provides evidence of the data that was
actually captured from either a display screen during an Operator Replay
script execution, or from a report line during the use of the SCANSPLF
command.

-   **Screen Title**: Display Captured Data Log
-   **Screen ID**: OPRL40R1

The same data capture response functions support both Screen data
capture for Operator Replay and report data capture for the SCANSPLF
utility command. Some of the following description includes information
that is useful in distinguishing between the two different types of data
capture. Each actual data capture definition and the captured data
record are labeled by their Type field, where \"C\" = screen capture and
\"S\" = spool file capture.

 

Refer to the topic on Events and Utilities menu, for more information
about ways to use data capture and captured data response rules.

###### Menu Pathways

Main Menu \> Operator replay menu (\#4) \> Display Captured Data log
(\#8).

###### Fields

  Field             Description
  ----------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Subset to Type:   When this list display has been called directly from the menu, the LSAM menu passes a parameter to signal the program whether the call came from the Operator Replay menu (Type = Screen), or from the Events and Utilities Menu (Type = SCANSPLF). Function key F15 can be used to force a change to the Subtype, or to remove subsetting and show all Response rules of both types.
  Search content    Type a value in this field and press \<**Enter**\> or \<**F16**\> to initiate a search for a record that has matching data anywhere in the record, including data that might not appear on the list display (but the matching data would appear in the display of the detail of the record). When \<**F16**\> is pressed a second time, the search continues from after the last matching record, using the same Search content data. Press \<**Enter**\> a second time (with no options typed), or press \<**F5=Refresh**\> to start a new search.
  Opt               Type option from list displayed near the top of this screen. Refer to options definitions, below.
  Capture ID        A label that groups together all of the data capture rules that apply to a single Operator Replay script step Sequence number. (This field is more important when data capture is used with the SCANSPLF command, and only serves Operator Replay screen capture as a useful means of labeling captured data when it appears in the captured data debug log file list, or when prompting for a Capture ID from Response Rules.)
  Seq               The sequence of the data capture rule. This number determines the order in which data capture rules are executed. The effect of this sequence number is more noticeable when there are captured data response rules associated with each data capture definition, in that it imposes a high level of control over the sequence of response rules that might apply to a given screen format (or to a SCANSPLF spool file).
  MM-DD-HH.MM       A portion of the time stamp of the log entry, showing the month, day, hours and minutes.
  T                 Type: C = screen capture, S = SCANSPLF data capture.
  Script/SPLF       The name of the Operator Replay Script, or the name of the spool file that was processed by the SCANSPLF command. The value shown here is defined by the value in the T (Type) field.
  Number            For an Operator Replay Script, the Sequence number of the Step when the screen data was captured. For a spool file, the spool file number within the job where the spool file was found.
  JobNbr            The IBM i Job Number of the job that executed the Operator Replay script or the SCANSPLF command. This number helps to distinguish among list entries that belong to the same, or to different jobs.

  :  

###### Functions

-   **F3=Exit**: Return to the LSAM menu.
-   **F5=Refresh**: Reload the list display with the latest data from
    the master file.
-   **F12=Cancel**: Return to the LSAM menu.
-   **F15=Subset**: Supports a change to the type of captured data
    entries appearing in the list. The Subset window offers a choice of
    Type C = screen capture response rules, or S = SCANSPLF data capture
    response rules.
-   **F16=Search next**: When a search argument has been entered in the
    Search content field, pressing F16 can either start a new search (if
    the content value was changed) or it can continue a search to look
    for the next list entry that matches the search argument, starting
    with the first record after the last match found.
-   **F17=Top**: Reposition the list display to show the first record in
    the list.
-   **F18=Bottom**: Reposition the list display to show the last record
    in the list.
-   **F24=More keys**: Change the function key line to show additional
    supported keys.

###### Options

-   **5=Display**: To display record details, type 5 next to each
    record. Press \<**Enter**\> to proceed to the display details
    screen. Typing option 5 next to many or all records at once before
    pressing \<**Enter**\> is a convenient way to review all the
    definition details at once. Press \<**Enter**\> to advance as each
    detail screen is presented.
-   **9=WRKJOB**: Calls the IBM i Work with Job function for the job
    number that appears in the list. This function can help find output
    produced by a captured data response rule, or it can help find the
    spool file that was scanned by the SCANSPLF command.

#### Display Captured Data Log Detail

-   **Screen Title**: Display Captured Data Log Detail
-   **Screen ID**: OPRL40R5

###### Menu Pathways

Main Menu \> Operator replay menu (\#4) \> Display Captured Data log
(\#8) \> option 5=Display.

###### Fields

+------------------------+--------------------------------------------+
| Field                  | Description                                |
+========================+============================================+
| Log record RRN         | The relative record number of this record  |
|                        | in physical file OPRLOGF40                 |
+------------------------+--------------------------------------------+
| Type                   | -   C = Operator Replay screen data        |
|                        |     capture                                |
|                        | -   S = SCANSPLF report spool file         |
|                        |     scanning                               |
|                        | -   M = Message data capture               |
+------------------------+--------------------------------------------+
| Capture ID:            | The identifier assigned to a group of data |
|                        | capture rules. For Operator Replay screen  |
|                        | data capture, this label is in addition to |
|                        | the Script Name and Sequence number.       |
+------------------------+--------------------------------------------+
| (Capture) Seq:         | The sequence number assigned to the data   |
|                        | capture definition, representing the order |
|                        | of capture within the Capture ID.          |
+------------------------+--------------------------------------------+
| Scrn Row               | For screen data capture, this is the row   |
|                        | where the data capture operation started.  |
+------------------------+--------------------------------------------+
| Col(-umn)              | The column within the Row (above) where    |
|                        | the data capture started.                  |
+------------------------+--------------------------------------------+
| Length                 | The length of data that was captured,      |
|                        | starting at the Row and Col specified. For |
|                        | Operator Replay screen data, up to 1920    |
|                        | characters of displayable data may be      |
|                        | captured by a single capture rule. (For    |
|                        | display formats larger than 24 X 80, more  |
|                        | than one screen capture rule would be      |
|                        | required to capture more than 1920         |
|                        | characters of data.)                       |
+------------------------+--------------------------------------------+
| Capture Job ID         | The IBM i full job name that made the      |
|                        | Captured Data log entry. This is the job   |
|                        | that will be shown if the function key     |
|                        | F9=WRKJOB is pressed.                      |
+------------------------+--------------------------------------------+
| Date                   | The log file entry date, in CCYYMMDD       |
|                        | format. Used to purge the log file, based  |
|                        | on the LSAM log file retention days (refer |
|                        | to LSAM Parameters).                       |
+------------------------+--------------------------------------------+
| Time stamp             | The IBM i system time when the log entry   |
|                        | was written.                               |
+------------------------+--------------------------------------------+
| Script Name            | The Operator Replay Script name that       |
|                        | triggered this data capture.               |
+------------------------+--------------------------------------------+
| Step number            | The Sequence number of the Operator Replay |
|                        | script step being executed when the data   |
|                        | was captured.                              |
+------------------------+--------------------------------------------+
| Numeric                | Y = yes, N = No: Indicates whether numeric |
|                        | data compression was specified for the     |
|                        | captured data.                             |
+------------------------+--------------------------------------------+
| Rows 1-12:             | The row and columns of the capture data    |
|                        | are labeled. Press PageDown or PageUp to   |
| Rows 13-24:            | toggle between the display of rows 1-12    |
|                        | and 13-24. Either eye vision, or           |
| 2..5\...10\....5\...20 | manipulation of the cursor may be used to  |
|                        | help identify the exact column for each    |
|                        | character of captured data, based on the   |
|                        | numbered ruler line just above the first   |
|                        | line of captured data. The ruler starts    |
|                        | with number 2 and ends with number 78 (due |
|                        | to 5250 workstation display constraints),  |
|                        | however, the actual captured data occupies |
|                        | columns 1 to 80 on the lines below the     |
|                        | ruler. Thus, workstations that display the |
|                        | column location of the cursor should match |
|                        | the character location in the ruler line.  |
+------------------------+--------------------------------------------+

:  

###### Functions

-   **PageDown/Up**: Use the PageDown and PageUp function keys to toggle
    the display of captured data between lines 1-12 and 13-24.
-   **F3=Exit**: Return to the LSAM menu.
-   **F9=WRKJOB**: Branch to the IBM i Work with job menu, to display
    detailed information about the IBM i Job ID named in the display
    panel.
-   **F12=Cancel**: Return to the list of log entries.

### Display Data Capture Debug Log

The function is not documented in detail because it is meant for use by
trained analysts or programmers already familiar with the operation of
the Capture Data and Capture Response Rules programs. The log entries
that may be observed in this display may seem apparent to users familiar
with data capture and response.

 

LSAM menu 3. Events and Utilities Menu, contains option 7. LSAM Utility
configuration, where a flag may be set to turn on debug logging for all
of the LSAM data capture and captured data response actions. This debug
logging supports both Operator Replay screen data capture as well as the
SCANSPLF command. The debug log entries would prove exactly when the
system captured data, when it processed Dynamic Variables and which
response rules were executed.

 

The debugging feature could be turned off for better performance in
systems that do not require extensive audit logging or debugging of any
problems. On the other hand, debug logging should be turned on when
extensive system audit support is required, because the debug log
provides detailed evidence of all automated operations.

 

If technical support is needed for apparent problems with either
capturing data or executing response rules, turn on the debug function
in LSAM menu 3, function 7. After attempting execution of the Operator
Replay script, or the SCANSPLF command that is causing trouble, use the
SMASUP log file extract command to retrieve the debug log information
and send the resulting save file from library SMALOG to SMA Support for
assistance. For more information about how to use the SMASUP command,
refer to [Extracting Log and Master Files](Log-File-and-Database-Management.md#Extracti){.MCXref
.xref}.

 

Following is a table of Entry_Code values that may be observed in the
list of debug log entries. These entry labels help to identify the
action that was performed and/or the result of data capture and captured
data response rules. Some of the codes reflect a failure in which case
the log entry will appear red in color.

  Entry_Code                                                       Description
  ---------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **SCANSPLF command log entries**                                 
  SCANSPLFST                                                       The SCANSPLF command has started its function.
  SCAN_PARMS                                                       The PARAMETERS keyword value string sent to the program by the SCANSPLF command.
  SCANSPLF_E                                                       A fatal error was encountered and the SCANSPLF command has not completed its function. Refer to the log entry detail for a status code and more information about the reason for the failure.
  SCAN_PASS                                                        A successful match of all required scan values; the SCANSPLF command ends normally.
  SCAN_FAIL                                                        Not all required scan values were matched; the SCANSPLF ends abnormally and, if started by OpCon/xps, a list of mismatched values is sent to the OpCon/xps job information.
  SCAN_NOMCH                                                       A log entry showing one of the required scan values that was not matched in the report.
  SCANSPLFEN                                                       Marks the end of the SCANSPLF command. A final completion status code may be found in the details of this log entry.
  SCAN_ABEND                                                       The SCANSPLF command processor failed before completing all scans. The abnormal termination code is found in the log entry details.
  PARM_COUNT                                                       A log entry indicating the number of scan values found in the input parameter after parsing the PARAMETERS keyword value of the SCANSPLF command. This entry may show that no input scan values were submitted, but that the program will continue to use any registered scan values found in the SPLF Scan Rules table.
  PARSE_PARM                                                       A log entry showing how the results after scanning the PARAMETERS keyword value of input scan values. The details entry shows the contents of the array where the input scan values are divided into even-spaced locations.
  SCAN_BYPAS                                                       A scan value bypass rule registered in the SPLF Scan Rules table was found and recognized. This scan value will be marked as matched, even though bypassed.
  SCANSPLF_J                                                       A log entry showing information about the actual job selected while searching for the target spool file.
  SCANSPLF_F                                                       A log entry showing information about the actual spool file (report) found for scanning.
  SCAN_LOG                                                         A program debug entry providing non-critical, general information about conditions detected by the SCANSPLFR program. Refer to the entry details for more information.
  SCAN_MATCH                                                       A log entry registering a matched scan value.
  SCAN_LBLNO                                                       An indicated scan label was found, but the associated value after the label did not match the supplied scan reference value.
  **Operator Replay script entries for data capture operations**   
  CAPTDATA                                                         A log entry recording the data captured from a screen image.
  CAPTERR                                                          A log entry reporting a program error code encountered while attempting to capture screen data. Refer to the log entry details for the exact error message that was trapped.
  **Message Data entries for data capture operations**             
  M_MSG_BUF                                                        The log entry shows the message data buffer used for data capture. The buffer may contain only the primary message text, only the secondary (Help) message text, or both text types concatenated with one space character between them.
  M_CAPTURE                                                        The log entry shows the portion of data that was captured from the message text buffer. This data would be referred to, for example, when the special value of \*CAPT is used in a Captured Data Response Rule.
  M_CAPTRSPE                                                       An error occurred during the attempt to process Captured Data Response Rules after some Message Data was captured.
  M_DYNV_ERR                                                       A Dynamic Variable token could not be replaced during the processing of Message Data capture.
  M_DYNV_PRE                                                       During Message Data capture, the string that contains a Dynamic Variable token before the token is replaced. This is the string that contains an optional Scan Label that will be used to identify the message data desired for capture.
  M_DYNV_RPL                                                       During Message Data capture, the string value after a Dynamic Variable token was replaced.
  **Common entries for Captured Data Response Rule processing**    
  RESPCMD0                                                         Documents the original response command string from the rules record, before processing any embedded variables.
  RESPCMD1                                                         Documents the response command string after any Dynamic Variables were replaced.
  RESPDATA                                                         The log entry details show the profile of the Captured Data Response Rule that was processed successfully. The details also include the final form of the response command, including resolution of any variable values.
  RESPERR                                                          The captured data response rule processor module is reporting an error encountered during processing. The response rule was probably not completed. Refer to the log entry for details about the error. The details also include a profile of the Captured Data Response Rule that was being processed.
  ADDRPYTOK                                                        Log of the command that sets an Operator Replay Token variable value, based on that field in the Response Rule record.
  OVARERR                                                          Documents an error that occurred when the ADDRPYTOK command was executed.
  SETDYNVAR                                                        Log of the command that sets a Dynamic Variable value, based on that field in the Response Rule record.
  DVARERR                                                          Documents an error that occurred when the SETDYNVAR command was executed.

  : Entry_Code Values Appearing in Captured Data Debug Log Viewer

## Additional Information for OR Scripts

### Cursor Control Strings

+-----------------+---------------------------------------------------+
| String          | Description                                       |
+=================+===================================================+
| Backspace       | Moves the cursor one column to the left, erasing  |
|                 | a character (destructive backspace).              |
|                 |                                                   |
|                 |                                                   |
|                 |                                                   |
|                 | **Note:** Backspace must be contained within the  |
|                 | confines of a single input-capable field.         |
|                 | Attempting to use Backspace to move left from the |
|                 | first column of an input-capable field generates  |
|                 | an error (use Cursor Left to accomplish a move to |
|                 | the left outside of a field definition).          |
+-----------------+---------------------------------------------------+
| Cursor Down     | Moves the cursor down one row. When the cursor    |
|                 | starts from the lowest row of the screen size,    |
|                 | the cursor wraps to the same column position in   |
|                 | row 1.                                            |
+-----------------+---------------------------------------------------+
| Cursor Left     | Moves the cursor one column to the left (without  |
|                 | erasing a character like backspace would do).     |
|                 | When the cursor starts from column 1, it wraps to |
|                 | the last column of the previous row. From row 1,  |
|                 | column 1, the cursor wraps to the last column of  |
|                 | the lowest row.                                   |
+-----------------+---------------------------------------------------+
| Cursor Right    | Moves the cursor one column to the right. From    |
|                 | the highest column number on a row, the cursor    |
|                 | wraps to the first column of the next row. From   |
|                 | the last column of the last row, the cursor wraps |
|                 | to row 1, column 1.                               |
+-----------------+---------------------------------------------------+
| Cursor Up       | Moves the cursor up one row. When the cursor      |
|                 | starts from row 1, it wraps to the same column    |
|                 | position in the lowest row defined for the        |
|                 | screen.                                           |
+-----------------+---------------------------------------------------+
| Field Advance   | Causes the cursor to move to the first column of  |
|                 | the next input-capable field defined for a        |
|                 | screen.                                           |
+-----------------+---------------------------------------------------+
| Field Backspace | Causes the cursor to move to the first column of  |
|                 | the previous input-capable field defined for a    |
|                 | screen.                                           |
+-----------------+---------------------------------------------------+
| Field Exit      | Causes the cursor to move to the first column of  |
|                 | the next input-capable field defined for a        |
|                 | screen, while also clearing any data from the     |
|                 | cursor start position to the end of the           |
|                 | input-capable field that is being exited.         |
+-----------------+---------------------------------------------------+
| New Line        | Positions the cursor to the first column of the   |
|                 | first input-capable field on a row below the      |
|                 | starting location of the cursor. When the cursor  |
|                 | starts from the lowest row that has an            |
|                 | input-capable field, the cursor wraps to the      |
|                 | first column of the first input-capable field     |
|                 | from the top of the screen.                       |
+-----------------+---------------------------------------------------+

: Cursor Control Strings

### Functions to Send

+----------------------------------+----------------------------------+
| Functions                        | Description                      |
+==================================+==================================+
| ATTN                             | Sends an interrogative Attention |
|                                  | signal to the display manager    |
|                                  | program in IBM i, causing        |
|                                  | whatever response has been       |
|                                  | defined for the Attention key.   |
|                                  | The Attention key usually        |
|                                  | suspends the screen dialog that  |
|                                  | was in progress. It interrupts   |
|                                  | screen dialog by presenting      |
|                                  | another screen\'s format that    |
|                                  | would not have been part of the  |
|                                  | defined dialog. Attention keys   |
|                                  | have a default action provided   |
|                                  | by IBM i (typically presenting a |
|                                  | menu of options), but they may   |
|                                  | be changed using system control  |
|                                  | values and job attributes. They  |
|                                  | may also be overridden within a  |
|                                  | specific job by using the        |
|                                  | SETATNPGM command within that    |
|                                  | job.                             |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | **Note:** SETATNPGM only takes   |
|                                  | effect for programs at, or lower |
|                                  | in the invocation stack than the |
|                                  | level where the command is       |
|                                  | issued. If the program returns   |
|                                  | to a higher level in the         |
|                                  | invocation stack, the system or  |
|                                  | job default setting for the      |
|                                  | attention key takes effect and   |
|                                  | the setting performed by the     |
|                                  | SETATNPGM command is abandoned.  |
+----------------------------------+----------------------------------+
| ENTER                            | The default keyboard action that |
|                                  | causes the input buffer contents |
|                                  | to be returned to the IBM i      |
|                                  | program, usually without         |
|                                  | requesting any other special     |
|                                  | function.                        |
+----------------------------------+----------------------------------+
| **Note:** The action caused by   |                                  |
| the following function keys      |                                  |
| (F1-F24) may vary, depending on  |                                  |
| how the IBM i display format was |                                  |
| defined: User-created display    |                                  |
| formats can specify whether each |                                  |
| function key returns the input   |                                  |
| buffer contents along with the   |                                  |
| function key command, or just    |                                  |
| return the function key command  |                                  |
| without returning any data that  |                                  |
| might have been entered by the   |                                  |
| display user (or display user    |                                  |
| intercept program). Some typical |                                  |
| assignments that are made into   |                                  |
| function keys, such as by IBM i  |                                  |
| command entry/prompt screens,    |                                  |
| are listed in Function Keys.     |                                  |
+----------------------------------+----------------------------------+
| F1                               | Command/function key F1 (aid     |
|                                  | byte hexadecimal value \'31\')   |
+----------------------------------+----------------------------------+
| F2                               | Command/function key F2 (aid     |
|                                  | byte hexadecimal value \'3C\')   |
+----------------------------------+----------------------------------+
| F3                               | Command/function key F3 (aid     |
|                                  | byte hexadecimal value \'31\')   |
+----------------------------------+----------------------------------+
| F4                               | Command/function key F4 (aid     |
|                                  | byte hexadecimal value \'32\')   |
+----------------------------------+----------------------------------+
| F5                               | Command/function key F5 (aid     |
|                                  | byte hexadecimal value \'33\')   |
+----------------------------------+----------------------------------+
| F6                               | Command/function key F6 (aid     |
|                                  | byte hexadecimal value \'34\')   |
+----------------------------------+----------------------------------+
| F7                               | Command/function key F7 (aid     |
|                                  | byte hexadecimal value \'35\')   |
+----------------------------------+----------------------------------+
| F8                               | Command/function key F8 (aid     |
|                                  | byte hexadecimal value \'36\')   |
+----------------------------------+----------------------------------+
| F9                               | Command/function key F9 (aid     |
|                                  | byte hexadecimal value \'37\')   |
+----------------------------------+----------------------------------+
| F10                              | Command/function key F10 (aid    |
|                                  | byte hexadecimal value \'38\')   |
+----------------------------------+----------------------------------+
| F11                              | Command/function key F11 (aid    |
|                                  | byte hexadecimal value \'39\')   |
+----------------------------------+----------------------------------+
| F12                              | Command/function key F12 (aid    |
|                                  | byte hexadecimal value \'3A\')   |
+----------------------------------+----------------------------------+
| F13                              | Command/function key F13 (aid    |
|                                  | byte hexadecimal value \'3B\')   |
+----------------------------------+----------------------------------+
| F14                              | Command/function key F14 (aid    |
|                                  | byte hexadecimal value \'3C\')   |
+----------------------------------+----------------------------------+
| F15                              | Command/function key F15 (aid    |
|                                  | byte hexadecimal value \'B1\')   |
+----------------------------------+----------------------------------+
| F16                              | Command/function key F16 (aid    |
|                                  | byte hexadecimal value \'B2\')   |
+----------------------------------+----------------------------------+
| F17                              | Command/function key F17 (aid    |
|                                  | byte hexadecimal value \'B3\')   |
+----------------------------------+----------------------------------+
| F18                              | Command/function key F18 (aid    |
|                                  | byte hexadecimal value \'B6\')   |
+----------------------------------+----------------------------------+
| F19                              | Command/function key F19 (aid    |
|                                  | byte hexadecimal value \'B7\')   |
+----------------------------------+----------------------------------+
| F20                              | Command/function key F20 (aid    |
|                                  | byte hexadecimal value \'B8\')   |
+----------------------------------+----------------------------------+
| F21                              | Command/function key F21 (aid    |
|                                  | byte hexadecimal value \'B9\')   |
+----------------------------------+----------------------------------+
| F22                              | Command/function key F22 (aid    |
|                                  | byte hexadecimal value \'BA\')   |
+----------------------------------+----------------------------------+
| F23                              | Command/function key F23 (aid    |
|                                  | byte hexadecimal value \'BB\')   |
+----------------------------------+----------------------------------+
| F24                              | Command/function key F24 (aid    |
|                                  | byte hexadecimal value \'BC\')   |
+----------------------------------+----------------------------------+
| HOME                             | The Home function key may be     |
|                                  | user-assigned to a specific      |
|                                  | location on the screen, or it    |
|                                  | may return the cursor to the     |
|                                  | first column of the first        |
|                                  | input-capable field on the       |
|                                  | screen.                          |
+----------------------------------+----------------------------------+
| PAGEDN                           | Page Down (formerly known as     |
|                                  | Scroll Up) requests that the     |
|                                  | screen host program (or the      |
|                                  | system function that manages a   |
|                                  | display subfile) present the     |
|                                  | next available page of           |
|                                  | information available for a list |
|                                  | that is on the screen (aid byte  |
|                                  | hexadecimal value \'F5\').       |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | **Note:** If Page Down is        |
|                                  | returned when the end of a list  |
|                                  | is already on the display, there |
|                                  | may be a non-fatal error message |
|                                  | returned.                        |
+----------------------------------+----------------------------------+
| PAGEUP                           | Page Up (formerly known as       |
|                                  | Scroll Down) requests that the   |
|                                  | screen host program (or the      |
|                                  | system function that manages a   |
|                                  | display subfile) present the     |
|                                  | previous available page of       |
|                                  | information available for a list |
|                                  | that is on the screen (aid byte  |
|                                  | hexadecimal value \'F4\').       |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | **Note:** If Page Up is returned |
|                                  | when the beginning of a list is  |
|                                  | already on the display, there    |
|                                  | may be a non-fatal error message |
|                                  | returned.                        |
+----------------------------------+----------------------------------+
| RESET                            | This special function instructs  |
|                                  | the IBM i display manager to     |
|                                  | reset from an error condition    |
|                                  | that has previously set the      |
|                                  | input-inhibited indicator along  |
|                                  | with the screen error indicator  |
|                                  | (a low-level 5250 device status  |
|                                  | instruction). This function key  |
|                                  | has no effect and does not       |
|                                  | generate an error if the screen  |
|                                  | is not in a reset able           |
|                                  | condition. It should only be     |
|                                  | issued when the appropriate      |
|                                  | circumstances have been          |
|                                  | detected. Reset has no effect if |
|                                  | the input-inhibited indicator    |
|                                  | has been set during the wait     |
|                                  | period after \<**Enter**\> or    |
|                                  | another function key has been    |
|                                  | used to return control of the    |
|                                  | screen to the IBM i display      |
|                                  | manager (and/or the program that |
|                                  | presented the screen).           |
+----------------------------------+----------------------------------+

: Functions to Send

### Operator Replay Script Exit Codes

One of the codes in the following table will be displayed as part of the
completion information of an Operator Replay job in the OpCon/xps
Schedule view of the job status.

  Return Code   Description
  ------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
  SMA0100       Job completion successful
  SMA0101       Unable to find Telnet host
  SMA0102       Cannot open socket error
  SMA0103       Unable to connect to socket
  SMA0104       Failed to set socket attribute
  SMA0105       Error reset required (e.g., sent value is in error)
  SMA0106       Timeout (waiting for response from system)
  SMA0107       Comparison string error
  SMA0108       Invalid script name
  SMA0109       Script has no step records
  SMA010A       Operator Replay failed: Technical failure at startup, see driver job loG
  SMA010B       Operator Replay failed: STROPRRPY command incorrect DEVICE or IPADDR. Both must either specify a user-selected value, or both must be left set to \'\*DEFAULT\'.
  SMA010C       Operator Replay failed: OpCon job master not found
  SMA010D       Operator Replay failed: Script user not provided to driver program
  SMA010E       Operator Replay failed: Dynamic variable replacement error, see script log.
  SMA010F       Operator Replay failed: SMAFAILJOB command in response rules, or general failure - see program dump report and driver job log.

  : Operator Replay Script Exit Codes

## Managing Virtual Devices

The management of virtual display devices operates independently from
the optional application of TLS Security to the connection between the
Script Driver program and the IBM i Telnet Server. Any supported mode of
virtual device selection will work with or without TLS Security engaged.

 

  -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** Three modes of virtual device management require the IBM i Telnet exit program. SMA technologies recognizes that its clients may already have a Telnet Exit program registered in their IBM i partition(s). Use the IBM i command WRKREGINF to examine the exit point named QIBM-QTG-DEVINIT. If there is already an exist program registered, please contact SMA Support for assistance. SMA Technologies recommends that we collaborate with the producer of the other Telnet Exit program to determine how the features required by the OpCon Agent for IBM i can be merged with other Telnet security routines that the client is already using. For example, the IBM i LSAM Telnet Exit Program logic can be implemented as a sub-program, sub-procedure, module or service program, delivering a specific device name to the third-party Telnet exit program.
  -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

The IBM i LSAM Operator Replay function uses the IBM i Telnet server
facility to access a virtual workstation and emulate the functions of an
interactive user. Default system values and features of IBM i can make
it easy to automatically configure and use virtual workstations. This
type of device is used for IBM i workstation pass-through functions
(between two systems) and it is also used to support the IBM i Access
Client Solutions display feature (enabling a personal computer to
emulate an IBM i workstation).

 

By default, the IBM i Telnet server listens at the well-known TCP/IP
port number 23. Typically, the IBM i system value QUAUTOCFG is set on,
supporting automatic creation of virtual devices as necessary, up to the
maximum number of devices set in the QAUTOVRT system value. SMA\'s IBM i
LSAM is installed with default values that match this configuration of
IBM i.

 

The IBM i LSAM menu options for configuring Operator Replay features
refer to their support for automatic creation of virtual devices as the
\"Mode 1\" method of managing virtual devices. Mode 1, in general, is
the passive mode that supports relying on IBM i to select and assign a
virtual display device. This is the initial default configuration for
Operator Replay management of virtual display devices.

 

However, IBM i system administrators may often wish to strengthen the
security of their system. For example, the Telnet server can be changed
to listen at a different port number. Another strategy for improving
security is to restrict the ability of system users to acquire
automatically created virtual devices. The LSAM Operator Replay facility
can adapt to these changes in IBM i configuration, using the methods
described in this section.

 

The IBM i LSAM menu options for configuring Operator Replay features
support four methods for managing virtual devices when automatic
creation has been disabled. These methods are referred to as \"Modes\"
that are explained below. All of these different modes depend on
manually creating virtual display devices, or letting the system
automatically create a limited number of virtual devices and then
disabling virtual device creation. There are other strategies that are
compatible with one of the four LSAM virtual device management modes.

### Overview of Virtual Display Device and Telnet Server Management

The Agent supports multiple strategies for managing the virtual display
device that will be used for any given Script execution. The strategy
chosen from the four available options will affect, somewhat, the
behavior of the entire IBM i partition with regard to the Telnet server
and the management and use of virtual display devices. Even so, it may
be possible to choose different virtual display device options for
separate LSAM environments that reside within the same partition, such
as when one copy of the LSAM software is used for testing, while the
SMADEFAULT environment is used for OpCon control over the live
production work.

 

Preparing the partition for any of the four virtual display device
options may involve any of the following steps. Each of these steps is
explained in more detail in the following topics. The following topics
are not presented in the exact order of this list because there are
different perspectives on how the partition might be configured, and
each requires a different discussion. But once the topical discussions
have been considered, the list presented here can serve as a check list
to be sure that all the elements required for a working configuration
have been considered.

1.  Use Operator Replay Configuration (LSAM sub-menu 4, option 7) to
    specify the IP address, Telnet server options and the virtual device
    control option.
    a.  The Telnet Server port might be changed in some partitions,
        often as a simple additional measure to secure the partition
        against hacking.
2.  Configure one or more virtual display device descriptions, by name.
    a.  Virtual display devices can be configured manually or
        automatically, as explained below.
    b.  Device description object authority is an important system
        security measure that should be considered, including the advice
        offered below.
3.  Configure one or more \*LOOPBACK IP address Interfaces (no line
    description is needed when using loopback IP addresses).
4.  Optionally, use the F23 function from the Operator Replay
    Configuration to cause a single device description and LOOPBACK
    interface to be created. Also optionally, this same display can be
    used to activate or deactivate the device and the interface.
5.  Use the LSAM User Management function (LSAM sub-menu 4, option 1) to
    assign a virtual display device and a \*LOOPBACK IP address to one
    or more User Profiles.
6.  From the Operator Replay Configuration main display pages (1 or 2),
    use function key F22 to configure and then register the Agent\'s
    Telnet Exit program.

  ------------------------------------------------------------------------------------------------------------------------------ -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White \"X\" icon on red circular background](../../../Resources/Images/warning-icon(48x48).png "Warning icon")   **WARNING:** Expect a short interruption and disconnect of all Telnet-based devices (printers and most display devices, except for the designated partition console display) while the system Telnet Server is stopped and restarted. This suspension of Telnet services is required to activate any change (Add or Remove) to the registered Telnet Exit Program. Although the Agent\'s exit program activation function is designed to automatically restore Telnet services after the activation has completed, SMA recommends using the partition\'s console device to perform this action, since the console device will NOT be suspended when the Telnet server is suspended.
  ------------------------------------------------------------------------------------------------------------------------------ -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

When performing the configuration steps above, consider how the
following list of Operator Replay job control parameters may apply.
Various job control profiles are supported, making Operator Replay
script jobs more adaptable to varying system security requirements.

#### Summary of Operator Replay Job Control Parameters

These are the options to be considered when defining Operator Replay
script execution jobs. These parameters are grouped into the following
separate topics:

-   Control of virtual device selection
    -   Device name
    -   IP Address
    -   Job user name, as it applies to virtual device selection

-   Managing the Job user name

    -   The rules for managing the script job user name have been
        enhanced starting with the LSAM version 18.1, in order to better
        comply with OpCon batch job user rules. However, previously
        configured script jobs should still execute as before.

-   Managing the name of the Script that will execute

##### Virtual Display Device Name:

There are four methods that can be used to control the virtual display
device that will be selected as the Operator Replay script driver
program (submitted by OpCon as an IBM i bach job) initiates the separate
interactive job where the script steps will be performed.

-   MODE 1 (\*DFT) Rely on IBM i automatic or user creation of virtual
    devices.
    -   This was the original and only way that virtual display devices
        were supported by earlier versions of the IBM i Agent, based on
        the settings of the system values QAUTOCFG and QAUTOVRT, and/or
        on user configuration of virtual display devices. This mode is
        still supported by default, but more secured options are
        available.
-   MODE 2 (\*CTL) Specify a single IP address and device name in
    Operator Replay Configuration.
-   MODE 3 (\*USER) LSAM User Management assigns the Device Name and an
    associated IP address.
-   MODE 4 (\*CMD) Device Name and IP address are specified at run-time
    in the Script name box of the OpCon job master record.
    -   Manual execution of test jobs can use the additional command
        parameters DEVICE( ) and IPADDR( ) of the expanded STROPRRPY
        command, when \*CMD Mode 4 is allowed.

Modes 2, 3 and 4 require that the Agent\'s Telnet Exit Program be added
to the system exit point registry, and this type of exit program also
requires that the system\'s Telnet Server be stopped and restarted.
Stopping the Telnet Server will cause virtual devices to be temporarily
disconnected from the system. But using the Agent\'s function to
register and activate the exit program will automatically restart the
Telnet Server, and then it is only necessary to manually reconnect or
reactivate virtual devices such as displays and (virtual) printers.

 

The Modes 3 and/or 4 can be used separately, or they can be mixed by
typing both values into the Telnet Device Name field of the Operator
Replay Configuration screen.

##### IP Address Specification:

The IP Address used to connect the script driver program to a virtual
display device is controlled in parallel with the four Modes of virtual
display device selection.

##### Job User Name for Device Selection:

For device Mode 3 (\*USER) the User Name will determine the Device Name
and the IP address. Mode 3 requires that there will be a 1-1-1
relationship among User Name, Device Name and IP Address, and each value
can be used only once within the User Management function.

##### Interactive Job User Name:

All user profiles for Operator Replay jobs must be registered in the
Agent\'s User Management.

 

The original method of assigning the User to the Script Master record
within the Agent\'s Operator Relay Script master record maintenance will
remain the first priority for selecting the interactive job user. That
is, if the Script Master record specifies a Job User name instead of the
newer \"\*JOB\" option, then this will override the specification of the
Job User in the OpCon job master record.

 

The job user name can be the user selected in the OpCon job master
record if \"\*JOB\" is assigned to the Script Master record. This method
requires that the user name be registered in OpCon as a Batch User with
permission to use the IBM i machine in which the script job will
execute. This is the same rule as applies to general IBM i Batch Jobs.

 

The user name can also be specified in the OpCon job master record by
adding the USRNAME( ) parameter to the Script name box, following the
Script name and at least one space character. This method overrides the
other options for specifying the Job User Name, as it always did in
earlier versions of the Agent software.

 

The restriction that multiple scripts in a single job must have the same
User Name is removed. This makes it possible to build utility
sub-scripts in the Agent\'s script master file that can be called by any
Job User Name. If there is a User Name assigned to a sub-script, it will
be ignored by the newer versions of the Agent software. However, SMA
recommends that these sub-scripts should be assigned a User Name of
\"\*JOB\" as the preferred standard.

##### Script Name:

The Script Name is specified either by itself in an OpCon job master
record, or it is specified as the first parameter of the STROPRRPY
command by test jobs that are started manually, outside of the control
of the OpCon application server.

 

When Operator Replay jobs are started by OpCon, the Script Name can be
an OpCon Property token, or it can be an IBM i Agent Dynamic Variable
token.

### Managing the Telnet Server and Its Port Number

The IBM i LSAM Operator Replay feature requires the support of the IBM i
Telnet server. It is required to follow IBM instructions for configuring
and starting both the IBM i TCP/IP services, in general, and the Telnet
server specifically.

 

If the IBM i Telnet server has been assigned to a different port number,
instead of the well-known port number 23, the LSAM Operator Replay
Configuration function must be used to change the port number registered
for Operator Replay.

 

It is not necessary to stop and restart the IBM i LSAM server facility
for this change to take effect. Each time the LSAM starts a new Operator
Replay control job, the new job will check the LSAM Parameters control
file to find the correct Telnet port number.

 

However, depending on the Operator Replay Virtual Device Control Mode
chosen (from four options listed below), it might be necessary to
briefly stop and restart the Telnet Server. This would be required only
if the Agent\'s Telnet Exit Program is being activated or deactivated,
as explained below.

### Using Operator Replay Without Automatic Virtual Devices

The IBM i LSAM Operator Replay facility requires the use of a virtual
display device to emulate an interactive user\'s job. However, IBM i
system administrators may have chosen to disable automatic creation of
virtual devices as a measure to improve system security.

 

If the IBM i support for automatic creation of virtual devices has been
disabled, it is required that at least one virtual device be created
manually for use by Operator Replay, according to IBM instructions.
There are various strategies that may be used to support virtual devices
without having them automatically created. This document describes two
strategies for enabling Operator Replay scripting while still complying
with strict security measures.

 

The following steps and options are considered. Additional information
about IBM i commands and virtual device management can be found using
the web-based IBM Knowledge Center.

-   Preventing automatic creation of virtual devices
-   Manually creating virtual control units and display devices
-   Implementing the four LSAM Modes of virtual device management

There are additional ways that virtual devices can be utilized by
Operator Replay that are not discussed in detail here. One suggestion
might be to leave the LSAM Operator Replay configured for its default
Mode 1, which anticipates automatic virtual device creation, but then
disabling IBM i automatic device creation. This could be implemented by
manually creating enough virtual devices to accommodate the anticipated
workload of concurrently executing Operator Replay scripts, but
restricting authority to use the virtual devices to only the Operator
Replay User Name(s) required for Script execution.

#### Preventing Automatic Creation of Virtual Devices

To prevent virtual terminals from being created automatically, set the
QAUTOCFG system value to 0 as follows:

CHGSYSVAL SYSVAL(QAUTOCFG) VALUE(0)

 

Automatic creation of virtual devices can also be prevented by setting
the QAUTOVRT system value to 0 as follows:

CHGSYSVAL SYSVAL(QAUTOVRT) VALUE(0)

 

Disabling these automatic creation options does not prevent manual
creation of virtual devices. It also does not cause the system to
automatically delete any existing virtual device descriptions.

 

  -------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [Changing these system values affects other IBM i products and programs requiring automatic configuration. This includes TELNET, 5250 display station pass-through, and any other programs using the virtual terminal APIs.]
  -------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

#### Manually Creating Virtual Controllers and Devices

Virtual controllers and devices (terminals) can be created manually to
control the number of sign-on attempts possible by not allowing
automatic configuration of virtual terminals (which allows additional
sign-on attempts to occur).

 

  --------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil icon on green circular background](../../../Resources/Images/example-icon(48x48).png "Example icon")   **HINT:** [An easy way to create virtual controller and device descriptions is to let the system do it. Enable automatic device configuration by setting or leaving set the system values QAUTOCFG to a value of 1 and QAUTOVRT to any value greater than 0. Then use a function such as an Operator Replay job or an IBM i Access Client Solutions display emulator to cause the system to create at least one virtual controller and device. (In this case, the first device created would be named QPADEV0001.) After the controller and device are created, disable automatic creation as described above, and then proceed to the next steps below that describe how to manage virtual device authority. Note that the system may already have been configured and used for automatic virtual device creation, in which case there will already be a controller and one or more virtual devices created in the system. In this case, it is possible to delete one or more of the virtual devices (after setting them to a varied off state), to limit the number of concurrent virtual device sessions that the system will support. It is also possible to manage the IBM i object authority of the device description objects to allow only authorized user profiles to acquire any given virtual device.]{.statement2}
  --------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

To manually create virtual devices for Operator Replay do the following:

1.  Use the Create Controller Description (Virtual Work Station)
    (CRTCTLVWS) command to create a controller description for a virtual
    terminal.
2.  Use the Create Device Description (Display) (CRTDEVDSP) command to
    create a virtual terminal as follows:

The ONLINE(\*YES) parameter in each of the commands above tells the IBM
i licensed program toautomatically vary on the controller and terminal
that is created whenever the operating system is started.

 

Create or retain at least as many virtual device descriptions as the
number of concurrent Operator Replay jobs expected to execute at any one
time. If there are not sufficient virtual devices available for multiple
concurrent Operator Replay jobs, the subsequent Operator Replay jobs
will fail with LSAM Operator Replay error code SMA0106 (indicating a
timeout while waiting for the system to respond to a request to
connect).

#### Managing Virtual Device Authority

After creating the descriptions, authorize the server program to use
them. This is done by granting authority to the user profile named QTCP.
Use the Grant Object Authority (GRTOBJAUT) command to authorize the user
profile used by the server program to the descriptions. This can be done
using the following commands:

GRTOBJAUT OBJ(QPACTL01) OBJTYPE(\*CTLD)

AUT(\*CHANGE) USER(QTCP)

 

GRTOBJAUT OBJ(LSAOPRRPY) OBJTYPE(\*DEVD)

AUT(\*CHANGE) USER(QTCP)

**- or -**

GRTOBJAUT OBJ(QPADEV0001) OBJTYPE(\*DEVD)

AUT(\*CHANGE) USER(QTCP)

 

It is also possible to restrict access to the system by revoking public
authority and replacing it with authority granted only to specific
users. In this case, authority must be granted to each user profile that
has been registered as the User for an Operator Replay Script.

 

It may not be necessary to revoke public authority to the virtual
controller, since user access can easily be controlled at the device
level. It will be easier to return later to automatic creation of
virtual devices if public authority is not revoked.

 

When revoking public authority and granting private authorities, be sure
to have identified every virtual device that should be retained in the
system. It would be necessary to discover and manage automatically
created devices if the system was previously configured to allow
automatic virtual device creation. Virtual devices that were
automatically created can be listed using the following command:

WRKOBJ OBJ(QSYS/QPADEV\*) OBJTYPE(\*DEVD)

 

For each virtual device identified, the following two commands will
revoke public authority and grant the private authority required for an
Operator Replay Script user (represented by the value \"RPYUSER\" in
these examples):

RVKOBJAUT OBJ(QSYS/LASOPRRPY) OBJTYPE(\*DEVD) USER(\*PUBLIC) AUT(\*ALL)

[GRTOBJAUT OBJ(QPADEV0001) OBJTYPE(\*DEVD) AUT(\*CHANGE) USER(RPYUSER)]{style="font-family: 'Courier New'; font-size: 11.5pt;"}

 

The GRTOBJAUT command must be repeated for each user registered as an
Operator Replay Script user.

#### Preparing Virtual Devices for Use

After a normal IPL, the virtual controller and device(s) would be
automatically varied on, ready for use, if the ONLINE parameter was set
or left at the default value of (\*ON) in the create commands above.
However, after manually creating these devices, it would be necessary to
manually vary them on to use them immediately. This can be done from the
displays offered by the WRKCFGSTS command (refer to IBM documentation),
or by using the following manually entered commands:

VRYCFG CFGOBJ(QPACTL01) CFGTYPE(\*CTL) STATUS(\*ON)

VRYCFG CFGOBJ(LSAOPRRPY) CFGTYPE(\*DEV) STATUS(\*ON)

### Configuring Operator Replay Device, Interface and Telnet Exit

Consider the following Agent display formats and instructions, which
include excerpts from the F1=Help text available for these displays, to
understand the ways the Agent control file maintenance functions and
tools can be used to configure the different supported modes of virtual
display device control.

#### Operator Replay Configuration Menu Function

Operator Replay Configuration is access from the LSAM sub-menu 4, option
7. The following display format example illustrates where the choice is
made among the four available virtual display device management modes.

 

[Figure: ]{style="font-family: 'Courier New'; font-size: 9pt; font-weight: bold;"}[LSAM
sub-menu 4, menu option
1]{style="font-family: 'Courier New'; font-size: 9pt;"}

+----------------------------------------------------------------------+
| [ OPRRPYD301]{sty                                                    | | le="font-weight: normal; color: #000000;"}[                 Operator |
| Replay                                                               |
| Configurat                                                           |
| ion          ]{style="color: #000000;font-weight: normal;"}[00/00/00 | |  00:00:00]{style="font-weight: normal; color: #000000;"}             |
+----------------------------------------------------------------------+
| [ USERNAME]{style=                                                   | | "color: #000000;font-weight: normal;"}            [[LSAM:]{style="co |
| lor: #000000; font-weight: normal;"}]{style="color: #008000;"}[ ]{st | | yle="font-weight: normal;"}[SMADEFAULT]{style="font-weight: normal;  |
| color: #000000;"}[  ]{style="font-weight: normal;"}[Vers:]{style="fo | | nt-weight: normal; color: #000000;"}[ ]{style="font-weight: normal;" |
| }[18.1.013]{style="font-weight: normal; color: #000000;"}[    Telnet | | exit env:                                                            |
| SMADEFAULT]{style="color: #000000;font-weight: normal;"}             |
+----------------------------------------------------------------------+
|                                                                      |
+----------------------------------------------------------------------+
| [TCP/IP and Device configuration]{.ul}                               | |                                                                      |
| Telnet device: MODE 1 = \*DFT (QAUTOCFG)  MODE 2 = \*CTL (IP Addr +  |
| DevNam)                                                              |
|                                                                      |
| MODE 3 = \*USER            MODE 4 = \*CMD                            |
|                                                                      |
| [NOTE: MODEs 2-4 require Telnet Exit Pgm and stop/restart Telnet     | | server. See F1.]{style="font-weight: normal; color: #ff0000;"}       |
|                                                                      |
| [ IP Address (See F1, F23) :                                         | |  [127.0.0.2                                                          |
|                                ]{.ul} ]{style="color: #000000;font-w |
| eight: normal;"}[(F4)]{style="color: #0070C0; font-weight: normal;"} | +----------------------------------------------------------------------+
| [ Telnet port number  . . . :                                        | | ]{style="color: #000000;font-weight: normal;"}[[00                   |
| 023]{.ul}]{style="color: #000000;font-weight: normal;"}       [usual | | default value = 23]{style="color: #0070C0;font-weight: normal;"}     |
+----------------------------------------------------------------------+
| [ Telnet device name  . . . :                                        | | ]{style="color: #000000;font-weight: normal;"}[[MY                   |
| VRTDEV01]{.ul}]{style="color: #000000;font-weight: normal;"}  [NAME, | | \*USER\_\*CMD, blank=QPADEV00nn.                                     |
| (F1)]{style="color: #0070C0;font-weight: normal;"}                   |
+----------------------------------------------------------------------+
| [ Telnet device exit pgm nbr: [2147483443]{.ul}  [required for MODE  | | 2,3,4    (F13=Unlock)]{st                                            |
| yle="color: #0070C0;"}]{style="color: #000000;font-weight: normal;"} |
+----------------------------------------------------------------------+
|                                                                      |
+----------------------------------------------------------------------+
|                                                                      |
+----------------------------------------------------------------------+
|                                                                      |
+----------------------------------------------------------------------+
|  [**F1=Telnet instructions**  F5=Refresh  F3/F12=Cancel  F24=More    | | keys  PageDown]{style="font-weight: normal;color: #000000;"}         |
+----------------------------------------------------------------------+
|   ***- or -***                                                       |
+----------------------------------------------------------------------+
|  [**F22=SMATELSVR manage exit pgm   F23=CFG DEV & IP**   F24=More    | | keys  PageDown]{style="font-weight: normal;color: #000000;"}         |
+----------------------------------------------------------------------+
|                                                                      |
+----------------------------------------------------------------------+

 

Press F22 to manage the Telnet Exit Program status, if needed for Modes
2, 3 or 4. See the Operator Replay-User Management function for IP
Address instructions.

 

SMA recommends using the \*LOOPBACK Interface Definition to assign IP
addresses within the IBM i partition for use with Operator Replay
automation of green screen interaction. Loopback addresses do not
require creating a line description, but only to add and activate an
Interface using the CFGTCP command or the System i Navigator. The OpCon
IBM i Agent - Operator Replay - User Management provides the F23
function key to access a convenient prompting screen where the IP
Address Interface can be created by this Agent\'s programs.

#### Choosing and Configuring Operator Replay Virtual Device Modes

The LSAM\'s Operator Replay feature can be configured to cooperate with
the virtual display device strategy that has been implemented by the
procedures described above. There are four modes of virtual device
management supported by Operator Replay. But keep in mind that there are
more than four possible device management strategies. For assistance
with deciding how to use these modes, please contact SMA Support.

 

Among the four modes of virtual display device management, all but Mode
1 require the use of the Telnet Exit Program that is provided with the
OpCon IBM i LSAM software. Additional Operator Replay configuration
steps are required to activate the Telnet Exit Program, as described
below.

 

These are the Modes of Operator Replay virtual display device
management. The configuration requirements for each mode are discussed
below. This is a summary of what each mode implies.

-   Mode 1 (\*DFT): Operator Replay assumes that the IBM i system will
    automatically allocate virtual display devices, either because
    automatic virtual device creation is enabled (per system values
    QAUTOCFG and QAUTOVRT) or because a sufficient number of virtual
    display devices was created manually in advance. This mode relies
    entirely on the IBM i system to select and allocate virtual devices.
    It does not use the Agent\'s Telnet Exit program.
-   Mode 2 (\*CTL): Useful when there will be low-volume activity for
    Operator Replay scripts, a single Device Name and IP Address can be
    registered using the Operator Replay Configuration menu option. This
    Mode can support security restrictions if the named device
    description has its object authority limited to only Operator Replay
    script users. But it limits Operator Replay script execution to
    serial mode, since the single display device can only be used for
    one script job at a time.
-   Mode 3 (\*USER): This mode supports multiple virtual devices that
    are each restricted to a specific User Profile and IP Address. The
    LSAM User Management master file is used to register these
    relationships and to provide the Telnet connection parameters at run
    time. This profile of assigning one device to each user reflects a
    parallel management of the IBM i object authority for each device
    description. By this means, Operator Replay is configured to
    cooperate with the site-specific strategy for virtual device
    security. See additional detail about how to configure this Mode in
    the instructions below.
-   Mode 4 (\*CMD): This mode resembles Mode 3, but by utilizing command
    line parameters to specify the Device Name and IP Address it is
    possible to eliminate the restricted association of devices to user
    names. This mode enables more flexibility for executing parallel
    Operator Replay scripts that all require the same user profile, by
    allowing the same user name to start jobs on multiple different
    virtual display devices. It would be possible to enable parallel
    processing of scripts using Mode 1, but the \*CMD mode might better
    support unique site restrictions on which virtual display devices
    can be used for Operator Replay operations, yet without the 1-1-1
    constraints on User-Device-IPAddress imposed by \*USER Mode 3.

Configuring the IBM i LSAM for any of these modes requires using two
LSAM menu options to maintain (a) the User Management master file and
(b) the Operator Replay Configuration options. The LSAM User Management
function (LSAM sub-menu 4, option 1) is used for User Profile and secure
Password registration. The User Management master file is also utilized
by other LSAM features. But for Operator Replay virtual device
management Mode 3, this master file supports additional data fields that
turn it into a table of User, Device Name and IP Address associations.

 

When performing the following LSAM configuration tasks, both User
Management and Operator Replay Configuration support using **F1=Help**
to display a summary reminder of the rules and requirements for
implementing the three Modes of virtual device management.

##### Configuration for Mode 1 (\*DFT)

Choose Mode 1 when depending on the IBM i system to choose and assign
virtual display devices to the script driver program, as it requests
access to the system\'s Telnet service.

 

Telnet Exit Program:

-   The Telnet Exit program should be disabled for this mode since it
    does not provide any support for Mode 1, and the Operator Replay
    request to use a virtual workstation would present a blank
    workstation name to the exit program, which has the same result as
    if there was no exit program.

User Management:

-   Do not specify any Device Name or LOOPBACK IP Address for the script
    users.

Operator Replay Configuration:

-   IP Address = enter the address that will be used to request a
    virtual display device. SMA recommends using a LOOPBACK IP address,
    since it does not require a line description.
-   Telnet port number = match the system value setting.

##### Configuration for Mode 2 (\*CTL)

Choose Mode 2 to improve virtual device security, but only in systems
where Operator Replay scripting will be seldom used, and scripts do not
have to execute concurrently. The single virtual display device forces
scripts to be executed serially, since the display device cannot be
share by multiple script driver jobs. This Mode enables system security
by replacing automatic virtual device dependency with a single device
name. The device can be further secured by revoking public authority to
use the device and granting \*CHANGE authority to only those user
profiles that will be designated for Operator Replay Script jobs.

 

Telnet Exit Program:

-   The Telnet Exit program must be configured and activated to use
    Mode 2.

User Management:

-   Do not specify any Device Name or LOOPBACK IP Address for the script
    users.

Operator Replay Configuration:

-   IP Address = enter the address that will be used to request a
    virtual display device. SMA recommends using a LOOPBACK IP address,
    since it does not require a line description.

-   Telnet port number = match the system value setting.

-   Telnet device name = enter the name of a pre-configured virtual
    display device. (See instructions above about how to create and
    authorize a virtual display device.)

Function key F23 from Operator Replay Configuration can be used as a
convenient way to define and execute the IBM i commands for creating and
enabling the virtual display device and the LOOPBACK IP Address
Interface.

##### Configuration for Mode 3 (\*USER)

Choose Mode 3 to enable virtual device security in environments that
require multiple different user profiles each assigned to their own
secured virtual workstation (such as a service bureau that is operating
multiple copies of software applications with different databases inside
of a single IBM i partition).

 

Operator Replay Mode 3 is designed to cooperate with a system-wide
security method that restricts each display device description to be
used by only one user profile. This is not necessary for the Operator
Replay Mode 3 configuration to work, but that was the original purpose
of supporting Mode 3.

 

When device descriptions should be restricted to just one user, it is
the site administrator\'s responsibility to set the IBM i object
authority values for each virtual display device description. This LSAM
software, while it can help with creating virtual display device
description objects, does not actually set the object authority. One way
to manage the device object authority is to use the IBM i command WRKOBJ
for each device description stored in the QSYS library, and then select
option 2 to change the authority. After the authority is set, this LSAM
Operator Replay Configuration Mode 3 strategy is used to guide the
Operator Replay script driver to cooperate with the device object
authorities.

 

Telnet Exit Program:

-   The Telnet Exit program must be configured and activated to use
    Mode 3.

User Management:

-   Device Name = specify the name of a pre-configured virtual display
    device that will be secured for use only by this User Profile.
-   LOOPBACK IP Address = specify a unique IP Address for each different
    User + Device combination. The IP Address + Device Name + User Name
    are tightly associated in a 1-to-1-to-1 relationship and each value
    cannot be also assigned to any others.

Operator Replay Configuration:

-   IP Address = this field value is ignored when Mode 3 is in effect.
-   Telnet port number = match the system value setting.
-   Telnet device name = must be set to \'\*USER\' to tell the Operator
    Replay functions and the Telnet Exit program to use the LSAM User
    Management master file to obtain and assign a virtual display device
    name and its associated IP address.

Function key F23 from User Management can be used as a convenient way to
define and execute the IBM i commands for creating and enabling the
virtual display devices and the LOOPBACK IP Address Interfaces.

 

For convenient access to the native IBM i commands required to configure
the operating system support for the IP address and device name, use
these function keys from the Add, Change or Display User screen:

-   F19=WRKCFGSTS \*DEV (to manage virtual display devices)
-   F20=WRKTCPSTS \*IFC (to manage TCP/IP Interface LOOPBACK
    definitions)

It is possible to enter both \*USER and \*CMD in the Telnet Device Name
field if it is desired to allow a Command Line option to override the
User Management configuration as an exception. But a successful
connection to a virtual workstation will only be achieved if all the
rules are met for either the \*USER or \*CMD mode.

##### Configuration for Mode 4 (\*CMD)

Choose Mode 4 to enable virtual device selection by the optional
parameters of the STROPRRPY command. This is the same command that is
used internally by the IBM i Agent to execute an OpCon job for IBM i
that specifies the job sub-type of Operator Replay.

 

The \*CMD Mode 4 of operation allows that the DEVICE( ) and/or IPADDR( )
keywords from the Agent\'s STROPRRPY command can be added after the name
of the Script that will be executed. To use these keywords in the OpCon
job, be sure that the Agent\'s Operator Replay Configuration has
specified \*CMD in the Configuration Telnet Device Name field (either by
itself, or optionally along with the \*USER mode). If the Agent does not
allow the \*CMD mode, then any parameters added after the OpCon job\'s
Script name will be ignored.

 

One strategy that could be enabled by the \*CMD Mode 4 would be to
insert OpCon Property tokens inside either the DEVICE( ) or the IPADDR(
) command parameters. This strategy assumes that the selection of a
device or an IP address would be made by some flexible logic elsewhere
with the network that the OpCon server controls, prior to the start of
the Operator Replay job. The OpCon SAM server will replace those
Property tokens before it sends the job start request to the Agent.

 

When both the \*CMD and \*USER mode are allowed by the Agent\'s Operator
Replay Configuration settings, then the \*USER parameters will be
retrieved first. After that, either or both (or none) of the DEVICE( )
and/or IPADDR( ) command keywords could be added after the OpCon job\'s
Script name in order to override the \*USER configuration at run time
for just the one job.

 

Telnet Exit Program:

-   The Telnet Exit program must be configured and activated to use
    Mode 4.

User Management:

-   User Management configuration is ignored when only \*CMD Mode 4 is
    allowed by the Agent.
-   However, if the Agent allows both \*CMD and \*USER modes, then
    review the requirements for Mode 3, described above.

Operator Replay Configuration:

-   IP Address = this field value is ignored when Mode 4 is in effect.
    -   The IP address should be specified by the IPADDR( ) added after
        the Script name in the OpCon job master record.
-   Telnet port number = match the system value setting.
-   Telnet device name = must be set to \'\*CMD\' to tell the Operator
    Replay functions and the Telnet Exit program to store the OpCon
    command line DEVICE and IPADDR options into a special temporary
    master record stored in the Agent\'s User Management master file.

When configuring an Operator Replay job in an OpCon job master record,
first type the Script name into the command line box that is labeled
\"Script\" and then type the special separate character that is set in
the LSAM global Configuration options (LSAM Main menu, option 7). The
default value for the separator character is a pipe (or vertical bar).
After the separator, type each command keyword and include a value, as
illustrated in the following example.

 

+----------------------------------+----------------------------------+
| ![White pencil icon on green     | **EXAMPLE:**                     | | circular                         |                                  |
| background](../../../Reso        |                                  |
| urces/Images/example-icon(48x48) |                                  |
| .png "Example icon") | Set the OpCon IBM i job sub-type |
|                                  | to \"Operator Replay.\"          |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | The command line entry box label |
|                                  | changes to \"Script.\"           |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | Inside the Script box, type the  |
|                                  | Script name, followed by at      |
|                                  | least one space character, and   |
|                                  | then either or both of the       |
|                                  | STROPRRPY command parameters as  |
|                                  | shown in this example:           |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |  MYSCRIPT DEVICE(DSP02)          |
|                                  | IPADDR(\'127.0.0.2\')            |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | **NOTE**: When the Agent\'s      |
|                                  | Operator Replay Configuration    |
|                                  | mode is 4, allowing only the     |
|                                  | \*CMD option, then BOTH of the   |
|                                  | parameters are required. If      |
|                                  | either parameter is missing, the |
|                                  | script job will likely fail. The |
|                                  | only time that a single          |
|                                  | parameter is allowed here is     |
|                                  | when both \*USER and \*CMD modes |
|                                  | are allowed. In that case, the   |
|                                  | \*USER data will be selected     |
|                                  | unless there is one of the       |
|                                  | parameters shown above included  |
|                                  | in the Script box, which means   |
|                                  | that the Script box value is     |
|                                  | overriding the \*USER            |
|                                  | configuration.                   |
|                                  |                                  |
|                                  |                                  |
+----------------------------------+----------------------------------+

 

The command line DEVICE and IPADDR parameters provided by the OpCon job
start request (from the Script box parameters) are stored as temporary
additions to the Agent\'s User Management master file using a record
type of \'T\' (Temporary). Once these records have been used for the
specific one-time job by the Telnet Exit Program they are immediately
changed to type \'H\' (History) records.

 

The Operator Replay Logs function supports an alternate view using
function key F10 to show the Device and IP Address that were assigned
each Replay record. It is the type \'H\' records in the User Management
master file that provide this Log view support data. Type \'H\' records
are deleted by the LSAM\'s daily log file purge server job (LSAMNG)
according to the LSAM Parameters daily log file retention period. The
collection of Type \'H\' and type \'T\' (if any are active) records can
also be viewed for each user by using function key F13=Use History from
the User Management list display (LSAM sub-menu 4, menu option 1).

 

  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [ It is possible to enter both \*USER and \*CMD in the Telnet Device Name field of Operator Replay Configuration if it is desired to allow a Command Line option to override the User Management configuration as an exception. But a successful connection to a virtual workstation will only be achieved if all the rules are met for either the \*USER or \*CMD mode, and both a Device Name and IP Address are resolved at run time.]
  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

#### Configuring User Management for Device Selection (Mode 3)

For the Operator Replay Virtual Display management \*USER Mode (3) it is
necessary to assign a virtual display device by name AND an IP address
(use an IP address that is appropriate for a LOOPBACK type of
Interface). All three elements: User, Device and IP Address, must be
assigned together and used only once. None of these elements can be
reused in any other combination, according to the constraints of Virtual
Device Selection Mode 3. (See Mode 1 or 4 to eliminate this constraint.)

-   **Screen Title**: Change User
-   **Screen ID**: LSAUSRR2

###### Menu Pathways

Main Menu \> Operator replay menu (\#4) \> Operator Replay user (\#1) \>
option 2=Change

 

[Figure: ]{style="font-family: 'Courier New'; font-size: 9pt; font-weight: bold;"}[LSAM
sub-menu 4, menu option 1, list option
2=Change]{style="font-family: 'Courier New'; font-size: 9pt;"}

+----------------------------------------------------------------------+
| [ LSAUSRR]{style="fo                                                 | | nt-weight: normal; color: #000000;"}[                         Change |
| User                                                                 |
|        ]{style="font-weight: normal;color: #000000;"}[      00/00/00 | | ]{style="font-weight: normal; color: #000000;"}                      |
+----------------------------------------------------------------------+
| [ USERNAME]{style="fon                                               | | t-weight: normal; color: #000000;"}                                  |
|               [              00:00:00]{style="font-weight: normal;"} | +----------------------------------------------------------------------+
|                                                                      |
+----------------------------------------------------------------------+
|                                                                      |
|                                                                      |
| [User Name . . . . . :]{style="font-weight: normal;color: #000000;"} | |  [SCRIPTUSER                                       ]{.ul}            |
|                                                                      |
| [\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\                         | | _\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\ |
| _\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_]{style="font-weight: normal;"} |
|                                                                      |
| Password  . . . . . :                                                |
|                                                                      |
|                                                                      |
|                                                                      |
| Password (to verify):                                                |
|                                                                      |
|                                                                      |
|                                                                      |
| Description . . . . :  [Operator Replay User assigned to             | | Device]{.ul}                                                         |
|                                                                      |
|                                                                      |
|                                                                      |
| [ WARNING: User name and password Fields are case-sensitive. Limits  | | are:]{style="font-weight: normal; color: #000000;"}                  |
|                                                                      |
| [     LSAM FEATURE       USER NAME SIZE, CASE       PASSWORD SIZE,   | | CASE]{style="font-weight: normal;color: #000000;"}                   |
|                                                                      |
| [     Operator Replay:   10; CAPS (rmt 128 mix?)    10/128 (SYSAL),  | | Mixed]{style="font-weight: normal;color: #000000;"}                  |
|                                                                      |
| [     UI FTP User\....:   UI size, Mixed             128/remote      | | limit, Mixed]{style="font-weight: normal;color: #000000;"}           |
|                                                                      |
|      [LSAM PTF                                                       | | ftp\...:   128/remote limit, Mixed    1                              |
| 28/remote limit, Mixed]{style="font-weight: normal;color: #000000;"} |
|                                                                      |
|                                                                      |
|                                                                      |
| [ Operator Replay Device per IP Address   See                        | | F1=Instructions.]{style="font-weight: normal;color: #000000;"}       |
|                                                                      |
|    [Device name]{style="font-weight: normal;color: #000000;"} . . .  | | . :                                                                  |
| [**[MYVRTDEV01]{.ul}**]{style="boldface: normal;color: #000000;"}    | |                                                                      |
|    [IP Address]{style="font-weight: normal;color: #000000;"}  . . .  | | . :                                                                  |
| [**[127.0.0.2                                                        | |                  ]{.ul}**]{style="boldface: normal;color: #000000;"} |
|                                                                      |
|                          [F4=IP Address List (\*LOOPBACK example:    | | 127.0.0.2)]{style="font-weight: normal;color: #000000;"}             |
|                                                                      |
|                                                                      |
+----------------------------------------------------------------------+
|  [F19=WRKCFGSTS \*DEV  F20=WRKTCPSTS \*IFC  F23/F12=CFG TCP &        | | VRTDEV F24=More keys ]{style="font-weight: normal;color: #000000;"}  |
+----------------------------------------------------------------------+
|   *- or -*                                                           |
+----------------------------------------------------------------------+
|  [**F1=Dev/IpAddr instructions   **F3=Exit  F5=Refresh  F12=Cancel   | |  F24=More keys]{style="font-weight: normal;color: #000000;"}         |
+----------------------------------------------------------------------+

 

The F1=Dev/IpAddr instructions below (adapted from this screen format\'s
Help text) describe how the Telnet exit program uses this configuration.

 

This display format is used only to register a device name and an IP
address. This display function does not create either a virtual device
description or an IP address interface. Those can be created manually or
with the assistance of the Agent\'s configuration prompts, accessed from
the Operator Replay Configuration function, as described below. These
objects do not have to exist when they are registered in the User
Management function, but they must exist before this type of User
profile can be used for an Operator Replay job.

###### Fields

  Field          Description
  -------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  *All fields*   This display format is described in detail in the Screens and Windows section under the general topic of Operator Replay. This table is focused on the Device Name and IP Address fields.
  Device Name    Used only for Operator Replay Device Selection Mode 3, the Device Name must match exactly a virtual display device that is configured in advance before it can be used by an Operator Replay Script job. See the discussion below about using the Operator Replay Configuration function key F23 for easy prompting of appropriate values for the virtual display device.
  IP Address     Used only for Operator Replay Device Selection Mode 3, the IP Address must match exactly an IBM i TCP/IP Interface address that is configured in advance before it can be used by an Operator Replay Script job. See the discussion below about using the Operator Replay Configuration function key F23 for easy prompting of appropriate values for configuring a \*LOOPBACK IP Address Interface. (Other types of Interfaces may also be used, but SMA recommends a Loopback address because it does not require a line description, so it is easier to configure and requires less system overhead to operate.)

 

More detailed information about using the Device Name and IP Address for
Operator Replay is presented in the following topics.

##### Virtual Device & IP Address Configuration - Help

Use the Operator Replay menu function 7 to configure the Telnet exit
program. Press F23 to configure the LOOPBACK TCP/IP Interface and the
virtual device.

##### User Management - IP Device and IP Address

This OpCon Agent provides a Telnet Exit Program that is required to
implement user-defined virtual device selection for Operator Replay. The
Operator Replay Configuration F1=Help screen defines exit program
parameters and explains the four different modes of operations that are
used to select the virtual devices. The IP Address is sent to the Telnet
Exit Program in a connection request, and the exit program uses that as
a key to find the Device name in one of two LSAM tables.

 

The Device and IP Address fields in the LSAM User master record support
MODE 3 of virtual device management for the Operator Replay feature.
This mode relies on a 1-1-1 correspondence among the User Name, the
Device Name and the IP Address to select the correct device for each
Operator Replay Script user. In contrast with MODE 4 where the Device
and IP Address are specified at run time, MODE 3 supports the higher
security method of restricting virtual display devices to just one user.
However, Mode 4 puts temporary records into the User Master file so that
the run-time configuration values for the job user can be found by the
Telnet Exit program.

 

For Modes 3 and 4, the Operator Replay Script driver uses the Script
User as its key to find the correct IP Address that it should send to
the Telnet server when requesting a virtual display device. Then the
Telnet Exit program can use the IP Address it receives to find a
matching record in the User Management master file, and that record
supplies the Device Name that the Telnet Exit program returns to the
Telnet Server just before an actual connection request is completed.

##### IP LOOPBACK Address assignment

SMA recommends using the \*LOOPBACK Interface Definition to assign IP
addresses within the IBM i partition for use with Operator Replay
automation of green screen interaction. LOOPBACK addresses do not
require creating a line description, but only to add and activate an
Interface using the CFGTCP command or the System i Navigator.

 

This User Management feature provides the F23 function key to access a
convenient prompting screen where the IP Address Interface can be
created and activated by the OpCon Agent\'s programs. At the same time,
the designated virtual device can be created and activated.

#### F13 = User Management Temporary Use History

Function key F13 from the User Management list display shows a view of
temporary User Management records that have a record type of T or H.
(Permanent User records of type of \'O\' are not shown in this list.
Records of type \'T\' do not last long, since they are quickly changed
to type \'H\' as soon as they are used.)

 

Whenever an Operator Replay Script job is prepared for execution, and
the device selection Mode is 4 (\*CMD), there is no way for the Operator
Replay script driver programs to directly notify the Telnet Exit Program
about the Device and IP Address that have been selected for the job.
However, the Telnet Exit program is able to access the User Management
master file, as it does for \*USER Mode 3, so temporary records of type
\'T\' (Temporary) are added to this file to record the command line
parameter values that specify the DEVICE and/or IPADDR values. When the
Telnet Exit program uses a temporary record, it immediately sets the
record type to \'H\' (History).

 

Using F13 from the main User Management list display presents a new
display of the temporary history records that are not yet purged from
the User Management master file. This data is useful for research,
especially during diagnosis of connection problems. Use option 5 to view
details of any record.

-   **Screen Title**: Telnet On-Demand Device History
-   **Screen ID:** LSAUSRR11

###### Menu Pathways

Main Menu \> Operator replay menu (\#4) \> User Management (\#1) \>
F13=Use History

 

[Figure: ]{style="font-family: 'Courier New'; font-size: 9pt; font-weight: bold;"}[LSAM
sub-menu 4, menu option 1, F13=Use
History]{style="font-family: 'Courier New'; font-size: 9pt;"}

+----------------------------------------------------------------------+
| [ LSAUSRR]                                                           | | {style="font-weight: normal; color: #000000;"}[               Telnet |
| On-Demand Device                                                     |
| History                                                              |
|              ]{style="font-weight: normal;color: #000000;"}[00/00/00 | | ]{style="font-weight: normal; color: #000000;"}                      |
+----------------------------------------------------------------------+
| [ USERNAME]{style="font-weight: normal                               | | ;color: #000000;"}                                               [   |
|               00:00:00]{style="font-weight: normal;color: #000000;"} |
+----------------------------------------------------------------------+
| Search content:                                                      |
+----------------------------------------------------------------------+
|  Type options, press Enter.                                          |
|                                                                      |
|    5=Display                                                         |
|                                                                      |
| Op T IP address       Device       User Name    Job ID requesting    |
| device    DD-HH.MM                                                   |
|                                                                      |
|  \_ T                                                                |
| \*DEFAULT                                                            |
|       DSPH         OPCON        050674/QSECOFR/TESTOPR01    24-12.13 |
|                                                                      |
|  \_ H                                                                |
| 127.0.0.2                                                            |
|       DSPH         OPCON        050807/USRNAM/TESTOPR14     26-18.10 |
|                                                                      |
|  \_ H                                                                |
| 127.0.0.2                                                            |
|       DSPH         OPCON        050813/USRNAM/TESTOPR15     26-18.40 |
|                                                                      |
|  \_ H                                                                |
| 127.0.0.2                                                            |
|     DSPH         OPCON        050816/USRNAM/TESTOPR16     26-18.51   |
|                                                                      |
|  \_ H                                                                |
| 127.0.0.2                                                            |
|       DSPH         OPCON        050819/USRNAM/TESTOPR17     26-19.00 |
|                                                                      |
|  \_ H                                                                |
| 127.0.0.2                                                            |
|       DSPH         OPCON        050821/USRNAM/TESTOPR17     26-19.03 |
|                                                                      |
|  \_ H                                                                |
| 127.0.0.2                                                            |
|       DSPI         OPCON        050698/USRNAM/TESTOPR02     24-15.13 |
|                                                                      |
|  \_ H                                                                |
| 127.0.0.2                                                            |
|       DSPI         OPCON        050675/USRNAM/DSPA          24-15.23 |
|                                                                      |
|  \_ H                                                                |
| 127.0.0.2                                                            |
|       DSPI         OPCON        050701/USRNAM/TESTOPR03     24-15.28 |
|                                                                      |
|                                                                      |
|                                                                      |
| Bottom                                                               |
+----------------------------------------------------------------------+
|  [F3=Exit   F5=Refresh    F11-Sort order    F12=Cancel               | | F16=Search next ]{style="font-weight: normal;color: #000000;"}       |
+----------------------------------------------------------------------+

###### Fields

  Field           Description
  --------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Opt             \<**Tab**\> to a row in the table and type an option next to one or more lines, and press \<**Enter**\> to perform each option entered.
  IP Address      The IP Address used by each Operator Replay job (or attempt to start a job)
  Device (Name)   The virtual display device that was selected according to the Operator Replay device selection mode that was in effect when the job was initiated.
  User Name       The IBM i user profile name assigned to the interactive job that was intended to use the virtual display device. This is usually not the same name as the Operator Replay script driver job name (Job ID requesting device), since the driver jobs started by OpCon run under control of the Agent\'s restricted, powerful SMANET user profile.
  Job ID          Job ID Requesting Device: This is the complete IBM i Job ID of the Operator Replay script driver job, even if the job was not successful in obtaining a virtual display device or in starting or completing the interactive job that was supposed to be driven by the Script.
  DD-HH.MM        The day, hours and minutes when the Operator Replay job initiation was attempted. Use option 5=Display to view the complete time stamp.

###### Options

-   **5=Display:** Type 5 in the **Opt** field next to view more
    complete information about the temporary User Management record.
    (There is not much more to see than appears in the list display.)

###### Functions

-   **F11=Sort order:** Press \<**F11**\> to change which list column
    will govern the sorted order of the list entries. Any of the list
    columns can be selected to order the list (in ascending order).

#### Operator Replay Device and IP Address Configuration (F23)

From the Operator Replay Configuration main display, F23 presents the
following display which may optionally be used to let the Agent program
configure a single virtual display device and to add the Interface for
the loopback IP address. The user may choose to manually execute the IBM
i native commands: CRTDEVDSP and CFGTCP (selecting option 1 from the IBM
i CFGTCP menu) to perform these same actions. However, this Agent
function shows a prompted IBM i command for each action, with
recommended default values already filled in, so it is usually much
easier and faster to create one or more device descriptions and IP
address interfaces using this Agent aid.

 

If a device is entered in the main Operator Replay Configuration
display, it will be shown at the top of the display. However, both the
device and the IP address can be changed in the lower half of the
display. This allows the user to configure many different device and IP
address combinations, such as may be required when the Telnet device
mode is \*USER. This display format can be reused more than once for
each device and/or IP address interface that is needed.

 

When function key F14 is pressed, the display will change to show each
requested IBM i command in an IBM command prompt mode. Any of the
command parameters can then be changed by the user before they are
executed when the Enter key is pressed. It is also possible to exit the
prompted commands with F3 or F12.

-   **Screen Title**: Virtual Device and IP LOOPBACK Address
    Configuration
-   **Screen ID:** OPRRPYD307

###### Menu Pathways

Main Menu \> Operator replay menu (\#4) \> User Management (\#1) \> F23

 

[Figure: ]{style="font-family: 'Courier New'; font-size: 9pt; font-weight: bold;"}[LSAM
sub-menu 4, menu option 7, F23=CFG DEV &
IP]{style="font-family: 'Courier New'; font-size: 9pt;"}

+----------------------------------------------------------------------+
| [ OPRRPYD                                                            | | 307]{style="font-weight: normal; color: #000000;"}[          Virtual |
| Device & IP LOOPBACK Address                                         |
| Configuration         ]{style="font-weight: normal;color: #          |
| 000000;"}[00/00/00   ]{style="font-weight: normal; color: #000000;"} | +----------------------------------------------------------------------+
| [ USERNAME]{style="font-weight: normal;color:                        | | #000000;"}                                               [           |
|               00:00:00]{style="font-weight: normal;color: #000000;"} |
+----------------------------------------------------------------------+
| [ VRT DEV: **MYVRTDEV01** IP Addr:                                   | | **127.0.0.2**]{style="font-weight: normal;color: #000000;"}          |
|                                                                      |
|                                                                      |
|                                                                      |
|  Refer to the OpCon User Help for more detailed instructions. Device |
| selection                                                            |
|                                                                      |
|   requires Telnet exit program. From main display see F1=Help then   |
| use F22.                                                             |
|                                                                      |
|                                                                      |
|                                                                      |
|  SMA recommends using LOOPBACK IP addresses to connect to virtual    |
| display                                                              |
|                                                                      |
|   devices used by Operator Replay green screen automation. LOOPBACK  |
| does not                                                             |
|                                                                      |
|   require creating an IBM i line description. This screen supports   |
| MODE 2                                                               |
|                                                                      |
|   where every script user shares the same virtual device and IP      |
| address.                                                             |
|                                                                      |
|                                                                      |
|                                                                      |
|  Type values below and press F14 to create the Device and Interface, |
| or use the                                                           |
|                                                                      |
|   commands CRTDEVDSP and CFGTCP (Option 1) to create a custom        |
| configuration.                                                       |
|                                                                      |
| [   Create options . . . . CRTDEVDSP? **0**   ADDTCPIFC? **0**       | | 0=No, 1=Yes]{style="font-weight: normal;color: #000000;"}            |
|                                                                      |
| [   Virtual                                                          | | dev/controller **[USERDEV001]{.ul}**                                 |
|   **[QVIRCD001]{.ul}**]{style="font-weight: normal;color: #000000;"} | |                                                                      |
|    [Internet address . . .                                           | | **[127.0.0.2                                                         |
|               ]{.ul}**]{style="font-weight: normal;color: #000000;"} |
|                                                                      |
|    [Line description . . . \*LOOPBACK    LOOPBACK IP Address example | | 127.0.0.2]{style="font-weight: normal;color: #000000;"}              |
|                                                                      |
|    [Subnet mask]{style="font-weight: normal;color: #000000;"}  . . . | | . . [255.0.0.0]{style="font-weight: normal;color: #000000;"}         |
|                                                                      |
|    [Alias name (or \*NONE)                                           | | **[LOCALHOST2              ]{.ul}**                                  |
|              ]{style="font-weight: normal;color: #000000;"}[Example: | | LOCALHOST2]{style="font-weight: normal;color: #000000;"}             |
|                                                                      |
|    [Text (description) . . **[For SMA Telnet Exit                    | | program                                                              |
|               ]{.ul}**]{style="font-weight: normal;color: #000000;"} |
+----------------------------------------------------------------------+
| [ ]{style="font-weight: normal;color: #000000;"}                     | |                                                                      |
|  [F3=Exit   Enter/F12=Return                                         | | **F14=                                                               |
| CRTDEVDSP/ADDTCPIFC** ]{style="font-weight: normal;color: #000000;"} |
+----------------------------------------------------------------------+

 

This display format can be used multiple times, to configure and
activate one, or a whole list of virtual devices and/or their associated
interfaces (of type \*LOOPBACK).

 

For each action that is configured and then launched from this display
(using F14), the native IBM i command will appear in command prompt
format. This provides convenient access to IBM i Help Text, and it also
permits sites with special requirements to change any parameter. Command
parameters that are protected in this launch display format will be
unprotected in the IBM i command format, in case the usually recommended
values are not appropriate.

 

But sites with no special requirements can simply press Enter to
complete the command action, after which the display will return to this
format, allowing the user to either quit the display or begin another
configuration action.

###### Fields

+--------------------+------------------------------------------------+
| Field              | Description                                    |
+====================+================================================+
| VRT DEV            | This field near the top of the display shows   |
|                    | the current setting from the Operator Replay   |
|                    | Configuration main page. This is only          |
|                    | reference information and it does not directly |
|                    | affect the user actions in the bottom part of  |
|                    | the display.                                   |
+--------------------+------------------------------------------------+
| IP Addr            | This field near the top of the display shows   |
|                    | the current setting from the Operator Replay   |
|                    | Configuration main page. This is only          |
|                    | reference information and it does not directly |
|                    | affect the user actions in the bottom part of  |
|                    | the display.                                   |
+--------------------+------------------------------------------------+
| Create options     | For each use cycle of this display, type a     |
|                    | \'0\' or \'1\' into the two command name flag  |
|                    | fields to select which commands will be        |
|                    | prompted when F14 is pressed.                  |
|                    |                                                |
|                    |                                                |
|                    |                                                |
|                    | VALUES:       \'0\' = No, do not prompt this   |
|                    | command.                                       |
|                    |                                                |
|                    |                      \'1\' = Yes, do prompt    |
|                    | this command.                                  |
|                    |                                                |
|                    |                                                |
|                    |                                                |
|                    | CRTDEVDSP = Create a display device, using     |
|                    | parameters that define a virtual device.       |
|                    |                                                |
|                    |                                                |
|                    |                                                |
|                    | ADDTCPIFC = Add an IP address interface for    |
|                    | the IP address. This command performs the same |
|                    | action as using an Add option from the IBM i   |
|                    | CFGTCP command, menu option 1.                 |
+--------------------+------------------------------------------------+
| Virtual device     | Type the actual name of the virtual display    |
|                    | device to be created.                          |
+--------------------+------------------------------------------------+
| Virtual controller | Accept the prompted virtual display device     |
|                    | controller name, or type in a different        |
|                    | controller name. There are two virtual display |
|                    | device controllers that are used by default in |
|                    | the IBM i operating system, but user-defined   |
|                    | virtual device controllers may also be used.   |
|                    | Notice also that the trailing digits in a      |
|                    | controller name are used to serially number    |
|                    | similar controllers, when many display devices |
|                    | must be divided among multiple controllers.    |
|                    |                                                |
|                    |                                                |
|                    |                                                |
|                    | Examples of virtual device controller names:   |
|                    |                                                |
|                    |                                                |
|                    |                                                |
|                    | QVIRCD0001 = an example of a virtual display   |
|                    | device controller created by IBM i in response |
|                    | to a request from a remote Access Client       |
|                    | Solutions program to create and activate a new |
|                    | virtual display device.                        |
|                    |                                                |
|                    |                                                |
|                    |                                                |
|                    | QPACTL01 = an example of a virtual display     |
|                    | device controller used by default for          |
|                    | automatically created virtual display devices, |
|                    | where the device names are typically like      |
|                    | this: QPADEV0001.                              |
+--------------------+------------------------------------------------+
| Internet address   | The IP Address that will be registered in a    |
|                    | TCP/IP Interface. The initial display default  |
|                    | will show the value (if any) from the Operator |
|                    | Replay Configuration screen, or else a default |
|                    | \*LOOPBACK address will be suggested.          |
|                    |                                                |
|                    |                                                |
|                    |                                                |
|                    | The default values that this screen format     |
|                    | supplies for the ADDTCPFC command are what SMA |
|                    | recommends for Operator Replay IP addresses.   |
|                    | There are common standards for IP addresses    |
|                    | that should be used for \*LOOPBACK interface   |
|                    | types. SMA recommends using a loopback         |
|                    | interface because it does not require a line   |
|                    | description, so the configuration is easier to |
|                    | manage and it involves less overhead in the    |
|                    | system than using a locally defined external   |
|                    | (or virtual LAN) IP address in a loopback      |
|                    | mode.                                          |
+--------------------+------------------------------------------------+
| Line description   | The Internet Address field (above) explains    |
|                    | why \*LOOPBACK is recommended instead of using |
|                    | a physical line description. However, when the |
|                    | ADDTCPIFC command is prompted by the F14       |
|                    | function key, the user may replace this        |
|                    | prompted value with any actual value that      |
|                    | meets any unique site requirements.            |
|                    |                                                |
|                    |                                                |
|                    |                                                |
|                    | If physical line descriptions are used, they   |
|                    | must be manually created by the user, since    |
|                    | this prompting screen does not support         |
|                    | creation of line descriptions.                 |
+--------------------+------------------------------------------------+
| Subnet mask        | This display prompts the ADDTCPIFC command     |
|                    | with a subnet mask that is appropriate for a   |
|                    | \*LOOPBACK type of interface. This value can   |
|                    | be replaced after the ADDTCPIFC command is     |
|                    | prompted using the F14 function key, if that   |
|                    | is necessary to meet any unique site           |
|                    | requirements.                                  |
+--------------------+------------------------------------------------+
| Alias name         | The alias name used to represent a TCP         |
|                    | Interface can be set to \*NONE, or a unique    |
|                    | name can be typed by the user to represent     |
|                    | each different Interface that will be added to |
|                    | the partition. Use of interface alias names is |
|                    | optional, depending on the overall network     |
|                    | practices and/or requirements of the site. The |
|                    | Operator Replay device selection routines do   |
|                    | not rely on the alias name.                    |
+--------------------+------------------------------------------------+
| Text (description) | This description text is inserted into the     |
|                    | description of the display device and the TCP  |
|                    | interface, when the commands are prompted      |
|                    | using the F14 function key. The description    |
|                    | text can also be updated from the command      |
|                    | prompt displays, especially if the device and  |
|                    | the interface should have different text.      |
+--------------------+------------------------------------------------+

###### Functions

-   **F14=CRTDEVDSP/ADDTCPIFC:** Press \<**F14**\> to proceed to the
    prompt of the IBM i command(s) that were selected using the command
    option \'1\'.

#### Activating the Telnet Exit Program

This would likely be the last step in implementing virtual device
selection for Modes 2, 3 and 4. The Telnet Exit program cannot be
effective unless all the other requirements of Operator Replay device
selection have been met, as described above.

 

The OpCon Agent for IBM i provides a Telnet Exit Program that is
required to implement virtual device selection for Modes 2, 3 and 4. The
script driver program accepts the User Name that will log on to the
virtual display device, and it uses that name to find the IP Address
configured in this User table. When the script driver sends a request
for a virtual device to the Telnet server, the LSAM\'s Telnet Exit
program uses the IP Address specified by the script driver to look up
the correct device name from the User master file. The Telnet Exit
Program does not know yet which user will attempt to log on, but it is
able to tell the system which device name to assign as the virtual
display.

 

As the Operator Replay script driver programs prepare for logging the
designated script user on to the virtual display device, the script
driver programs store the IP address, display device and user name used
for each Replay job into the Operator Replay activity log file.

 

Mode 1 (\*DFT - QAUTOCFG) is the only device selection mode that cannot
anticipate the device name, since that mode relies on IBM i automatic
selection of any available virtual display device. Mode 3, supported by
the User Management registration, confirms in advance which display
device will be used. The device name makes it easier to identify the
virtual display device job when using branch inquiry to WRKJOB from the
Operator Replay Log displays.

 

Implementing the Agent\'s Telnet Exit Program requires two steps. First,
the exit program must be registered, just as with any other IBM i exit
program. This registration step could be performed manually using the
IBM i command WRKREGINF, or ADDEXITPGM. However, SMA recommends only
using the IBM i command to view the registration status of exit point
QIBM-QTG-DEVINIT because the Agent software relies on a very specific
configuration of the information included in the Description field of
the exit registration to interface with the Agent database in the
correct LSAM environment.

##### Operator Replay Configuration: F22=SMATELSVR Manage Telnet Exit Program

From the Operator Replay Configuration main display pages (1 or 2), use
function key F22 to configure and then register the Agent\'s Telnet Exit
program.

-   **Screen Title**: Manage SMA Telnet Exit Program
-   **Screen ID:** SMATELR1

###### Menu Pathways

Main Menu \> Operator replay menu (\#4) \> Operator Replay Configuration
(\#7) \> F22

 

+----------------------------------------------------------------------+
| [ SMAT                                                               | | ELR1]{style="font-weight: normal; color: #000000;"}[          Manage |
| SMA Telnet Exit Program in Batch                                     |
| Job             ]{style="font-weight: normal;color:                  |
| #000000;"}[00/00/00]{style="font-weight: normal; color: #000000;"}   | +----------------------------------------------------------------------+
| [ USERNAME                                                           | | ]{style="font-weight: normal;color: #000000;"}        [END/STRTCPSVR |
| required to activate ADD or                                          |
| RMVEXITPGM]{style="font-weight: normal;color: #0000                  |
| 00;"}      [00:00:00]{style="font-weight: normal;color: #000000;"}   | +----------------------------------------------------------------------+
| [ ]{style="font-weight: normal;color: #000000;"}                     | |                                                                      |
|  Specify the following batch job parameters, then press Enter to     |
| submit the job.                                                      |
|                                                                      |
| [ The SBMJOB command will be prompted for changes to the job start   | | date and time.]{style="font-weight: normal;color: #000000;"}         |
|                                                                      |
|                                                                      |
|                                                                      |
|  A submitted job is used to manage stopping and restarting the       |
| TELNET server,                                                       |
|                                                                      |
|    if ACTIVATE is set to 1. Stopping the Telnet server will          |
| disconnect                                                           |
|                                                                      |
|    display and printer devices, except for the system CONSOLE        |
| device.                                                              |
|                                                                      |
|    The batch job will automatically restart the Telnet server after  |
| a short                                                              |
|                                                                      |
|    delay. Use IBM i command WRKREGINF to view exit point             |
| QIBM-QTG-DEVINIT.                                                    |
|                                                                      |
|                                                                      |
|                                                                      |
| [ SMATELSVB command                                                  | | parameters]{style="font-weight: normal;color: #000000;"}             |
|                                                                      |
|    [\*ADD/\*REMOVE Exit pgm entry? . .                               | | **[\*NONE                                                            |
|   ]{.ul}**]{style="font-weight: normal;color: #000000;"}    [\*NONE, | | \*ADD, \*REMOVE]{style="font-weight: normal;color: #000000;"}        |
|                                                                      |
|    [END & STRTCPSVR (\*TELNET)? . . .                                | | **[0]{.ul}*                                                          |
| *]{style="font-weight: normal;color: #000000;"}           [ACTIVATE: | | 0=No, 1=Yes]{style="font-weight: normal;color: #000000;"}            |
|                                                                      |
|    [Delay between END/STRTCPSVR  .                                   | | . **[ 10]{.                                                          |
| ul}**]{style="font-weight: normal;color: #000000;"}         [DLYJOB: | | 0 - 999 seconds]{style="font-weight: normal;color: #000000;"}        |
|                                                                      |
|                                                                      |
|                                                                      |
|  SBMJOB command parameters                                           |
|                                                                      |
| [   Job name . . . . . . . . . . . .                                 | | **SMATELNET **]{style="font-weight: normal;color: #000000;"}         |
|                                                                      |
|    [Job description, library . . . .                                 | | **SMALSA                                                             |
| J00 **  **SMADTA    **]{style="font-weight: normal;color: #000000;"} |
|                                                                      |
|    [Job queue (\*JOBD), library . . .                                | | **QBATCH                                                             |
|     **  **QGPL      **]{style="font-weight: normal;color: #000000;"} |
+----------------------------------------------------------------------+
| [ ]{style="font-weight: normal;color: #000000;"}                     | |                                                                      |
| [ F3=Exit   F12=Cancel                                               | | ]{style="font-weight: normal;color: #000000;"}                       |
+----------------------------------------------------------------------+

 

When using this display, to prevent accidental system interruption, the
\*ADD/\*REMOVE action control field is displayed with a default value of
\*NONE, which means that no action will be initiated in case the Enter
key is pressed too quickly. This same display may be used to add and
activate the Telnet exit program, or to remove and deactivate it.

 

Please carefully consider the detailed instructions for using this
display, following the table of display fields.

###### Fields

+--------------------------------+------------------------------------+
| Field                          | Description                        |
+================================+====================================+
| \*ADD/\*REMOVE Exit pgm entry? | The display shows a default value  |
|                                | of \*NONE to help prevent an       |
|                                | accidental initiation of an        |
|                                | unexpected action.                 |
|                                |                                    |
|                                |                                    |
|                                |                                    |
|                                | \*ADD (REPLACE) = Add or update    |
|                                | the exit program entry             |
|                                |                                    |
|                                | \*REMOVE = remove the exit program |
|                                | entry                              |
|                                |                                    |
|                                |                                    |
|                                |                                    |
|                                | Remember that after changing the   |
|                                | IBM i exit program registry, this  |
|                                | change will not take effect until  |
|                                | the Telnet server is ended and     |
|                                | restarted. Use the next field to   |
|                                | control the activation with the    |
|                                | job submitted from this display,   |
|                                | or to suppress the activation      |
|                                | action because it will be handled  |
|                                | separately (either by a manual     |
|                                | end/restart or by a pair of OpCon  |
|                                | IBM i batch jobs).                 |
+--------------------------------+------------------------------------+
| END & STRTCPSVR (\*TELNET)?    | This control field determines if   |
|                                | the submitted job will only        |
|                                | add/remove an exit program entry,  |
|                                | or if it will also activate the    |
|                                | change to the exit program entry   |
|                                | by ending and restarting the       |
|                                | Telnet server.                     |
|                                |                                    |
|                                |                                    |
|                                |                                    |
|                                | \'0\' = No, do not end/restart the |
|                                | Telnet server.                     |
|                                |                                    |
|                                |                                    |
|                                |                                    |
|                                | \'1\' = Yes, do end/restart the    |
|                                | Telnet server immediately after    |
|                                | updating the exit program          |
|                                | registry.                          |
+--------------------------------+------------------------------------+
| Delay between END/STRTCPSVR    | If the END & STR option is \'1\' = |
|                                | Yes, then this value determines    |
|                                | how many seconds the submitted     |
|                                | batch job should wait between      |
|                                | ending the Telnet server and then  |
|                                | starting it again. The amount of   |
|                                | time required depends on the speed |
|                                | of the processor and also how busy |
|                                | the machine may be. A value of 10  |
|                                | seconds is suggested, but if the   |
|                                | submitted job\'s log shows that    |
|                                | the restart action failed, use a   |
|                                | longer time when retrying this     |
|                                | action.                            |
|                                |                                    |
|                                |                                    |
|                                |                                    |
|                                | If there has been a failure to     |
|                                | restart the Telnet server, it is   |
|                                | possible to use either the IBM i   |
|                                | partition\'s console or create and |
|                                | execute an immediate OpCon batch   |
|                                | job for IBM i, executing this      |
|                                | command:                           |
|                                |                                    |
|                                |                                    |
|                                |                                    |
|                                | STRTCPSVR SERVER(\*TELNET)         |
+--------------------------------+------------------------------------+
| Job name                       | Any valid IBM i job name may be    |
|                                | typed into this field, or the      |
|                                | default job name may be left.      |
|                                |                                    |
|                                |                                    |
|                                |                                    |
|                                | **NOTE**: The Job User name is not |
|                                | prompted by this display, but it   |
|                                | can be overridden with an          |
|                                | appropriate value when the SBMJOB  |
|                                | command prompt appears. If the Job |
|                                | User name is not specified, then   |
|                                | the default for the SBMJOB command |
|                                | is to use the current interactive  |
|                                | job user. The requirement for the  |
|                                | submitted job is that the Job User |
|                                | must have authority to execute the |
|                                | LSAM\'s SMATESVB command (and the  |
|                                | command driver program), and it    |
|                                | must also have authority to use    |
|                                | these IBM i commands: ADDEXITPGM,  |
|                                | RMVEXITPGM, STRTCPSVR, ENDTCPSVR.  |
+--------------------------------+------------------------------------+
| Job description                | The actions of the submitted job   |
|                                | require the IBM i LSAM environment |
|                                | library list. The LSAM Server Job  |
|                                | Description SMALSAJ00 is           |
|                                | appropriate, but a user-defined    |
|                                | job description may also be used,  |
|                                | as long as it includes the LSAM    |
|                                | environment libraries in its       |
|                                | initial library list for the       |
|                                | submitted job.                     |
|                                |                                    |
|                                |                                    |
|                                |                                    |
|                                | A user-defined job description     |
|                                | could be used to specify the Job   |
|                                | User name. See the explanation     |
|                                | above in the Job Name field about  |
|                                | requirements for the submitted Job |
|                                | User Name.                         |
+--------------------------------+------------------------------------+
| Job description library        | The DB2 library location of the    |
|                                | job description. The default job   |
|                                | description of SMALSAJ00 resides   |
|                                | in the library SMADTA (or its      |
|                                | equivalent, if an alternate LSAM   |
|                                | environment is managing the Telnet |
|                                | exit program).                     |
+--------------------------------+------------------------------------+
| Job queue                      | Values permitted in this field:    |
|                                |                                    |
|                                |                                    |
|                                |                                    |
|                                | \*JOBD = use the job queue         |
|                                | specified by the Job Description.  |
|                                | The default LSAM job description   |
|                                | points to the job queue SMALSAQ00  |
|                                | in library SMADTA (or its          |
|                                | equivalent library name), which is |
|                                | connected to the LSAM server jobs  |
|                                | subsystem (SMASBS, or an           |
|                                | equivalent name).                  |
|                                |                                    |
|                                |                                    |
|                                |                                    |
|                                | QBATCH = the suggested default job |
|                                | queue, which is often an           |
|                                | appropriate queue (and subsystem)  |
|                                | for executing system management    |
|                                | batch jobs. The QBATCH job queue   |
|                                | typically resides in the QGPL      |
|                                | library.                           |
|                                |                                    |
|                                |                                    |
|                                |                                    |
|                                | Any user-selected job queue name   |
|                                | can be used, as long as it is      |
|                                | connected to an active subsystem   |
|                                | where the system management        |
|                                | commands are allowed to execute.   |
+--------------------------------+------------------------------------+
| Job queue library              | The DB2 library where the named    |
|                                | Job Queue resides. See the         |
|                                | definition of the Job queue name,  |
|                                | above, for more information about  |
|                                | the correct library name.          |
+--------------------------------+------------------------------------+

###### Functions

**Enter**: Press \<**Enter**\> to submit the IBM i job that will either
add or remove the exit program entry, and then optionally end and
restart the Telnet server.

 

  ------------------------------------------------------------------------------------------------------------------------------ -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White \"X\" icon on red circular background](../../../Resources/Images/warning-icon(48x48).png "Warning icon")   **WARNING:** Expect a short interruption and disconnect of all Telnet-based devices (printers and most display devices, except for the designated partition console display) while the system Telnet Server is stopped and restarted. This suspension of Telnet services is required to activate any change (Add or Remove) to the registered Telnet Exit Program. Although the Agent\'s exit program activation function is designed to automatically restore Telnet services after the activation has completed, SMA recommends using the partition\'s console device to perform this action, since the console device will NOT be suspended when the Telnet server is suspended.
  ------------------------------------------------------------------------------------------------------------------------------ -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

###### SMATELR1 Display Use Instructions

There are two distinct actions required to enable the Telnet exit
program. First it must be registered in the IBM i exit program registry
(viewed by using the IBM i command WRKREFINF), and then the Telnet
Server itself must be stopped and restarted so that the active instance
of the server knows that it must give control to the exit program for
each connect request it processes.

 

(The Telnet server does not always check for an exit program -- it only
performs this check at startup time. This makes Telnet server processing
much more efficient when there is no exit program, especially in
environments with high Telnet device activity levels.)

 

The action of adding an exit program to the registry could be performed
by using the IBM i command ADDEXITPGM, however, the Agent software
depends on a very exact configuration of the exit program entry\'s
description text. This means that the only reliable way to add the exit
program entry is to use this F22 Agent function.

 

On the other hand, stopping and restarting the Telnet server program
could be accomplished in two different ways:

1.  OpCon batch jobs for IBM i could execute the IBM i commands
    ENDTCPSVR SERVER(\*TELNET) and STRTCPSVR SERVER(\*TELNET). SMA
    recommends using this method when a client site has a very strict
    window of time during which the IBM i partition can tolerate an
    interruption of the Telnet server.

2.  On the screen format, set the END & START - ACTIVATE option to \'1\'
    = Yes. Choose an appropriate delay time between the End and
    (Re-)Start actions, and then as the prompt of the IBM i SBMJOB
    command appears, optionally specify a Job Start Date and Time (or,
    allow the job to submit immediately because \"right now\" is a good
    time to suspend the Telnet server).

When setting the END & START -- ACTIVATE option, remember that the term
\"activate\" means to make effective the latest change that is just
about to be made to the IBM i exit point registry. Whether the exit
point was added (\*ADD) or removed (\*REMOVE), that change to the
registry is not effective until the Telnet server is stopped and
restarted. So the term \"activate\" is referring to the Telnet server
end/restart action in either case, and it is not confined to just adding
a new exit program entry.

### Operator Replay Behavior with Virtual Devices

#### How Virtual Devices May Cause Operator Replay Script Failures

The IBM i LSAM Operator Replay facility requires the use of a virtual
device to emulate an interactive user\'s job. One or more virtual
devices and their controller(s) must be in a varied on state and the
devices must have authority granted to both the Telnet server user
profile QTCP and to each of the Operator Replay Script user profiles.
The following list is a partial list of conditions that might cause an
Operator Replay job to fail:

-   Automatic virtual device creation is turned off and there are no
    virtual controllers or virtual devices created.

-   The virtual controller and/or all virtual devices are in a varied
    off state.

-   All the available virtual devices are already assigned to active
    jobs.

-   An unauthorized user attempted to use a virtual device(s) and the
    system has set all virtual devices to a varied off state.

-   An Operator Replay Script user attempted to use a virtual device but
    was not authorized to the device, in which case the system has set
    the user profile status to \*DISABLED.

Each condition above requires knowledge and use of IBM IBM i commands
and procedures to remedy the error condition before an attempt to
restart an Operator Replay job will succeed.

 

If any of the above error conditions occur, one or more of the following
symptoms might be observed:

-   A message will be sent to the IBM i operator message queue (QSYSOPR)
-   The Operator Replay job status in the OpCon/xps Schedule will show
    \"Failed -- SMA0106\"
-   The IBM i LSAM Operator Replay Log Entry, under function 3: Operator
    Replay Logs, will show a job completion code of 6
-   There will usually be no data in the LSAM\'s Operator Replay log
    detail

When an Operator Replay control job has failed to log the Script User on
to a virtual workstation, the Script never actually starts execution.
This means that the IBM i LSAM Operator Replay Log Entry may show the
error completion code of 6 (representing error message ID SMA0106), but
in some cases there will be no content visible in the list display for
the log detail (accessed by pressing \<**F10**\> from the Operator
Replay Log Entry display, within the Operator Replay Logs function).
Operator Replay Log detail entries are only made once the Script starts
execution.

 

However, technical support personnel may gain additional diagnostic
information about a failing Operator Replay job if the Operator Replay
Configuration parameter for Script job debug logging had previously been
set to \"Y\" (= yes). In this case, function key \<**F17**\> from the
Operator Replay Configuration display may be used to view the debug log
file content. This log file can only be understood with knowledge of the
source code of SMA\'s IBM i LSAM Operator Replay execution program.

#### How Operator Replay Selects Virtual Devices Per Mode

In Mode 1 the script driver program simply initiates a connection
request to the system\'s Telnet port number using the IP address
registered in the Operator Replay Configuration data. Then it assumes
that the IBM i operating system will select or create a virtual display
device and assign that device as if it were the end point for the
connection to the Telnet server.

 

In Mode 2 the script driver program starts the same way as Mode 1 by
initiating a connection request to the system\'s Telnet port number
using the IP address registered in the Operator Replay Configuration
data. But Mode 2 requires that the SMA LSAM Telnet Exit Program be
activated, so that the device name designated in the Operator Replay
Configuration data can be forced as the virtual device that the Telnet
server will communicate with.

 

Mode 3 is more complex because it was designed for high volume and/or
multi-application environments, also supporting the highest possible
system security. The operation of Mode 3 is based on a 1-to-1-to-1
relationship among three data elements: IP Address + User Name + IP
Address. Each of the values for these three data elements must be used
in only one relationship. In other words, a single IP address cannot be
reused with a different device name or a different user.

 

There are two reasons for the constraints of Mode 3. Both are caused by
limitations of the information that is available during different phases
of the startup process for an interactive job that is supporting a
Telnet server connection.

 

To start with, when any connect request is sent to the Telnet server, it
is not possible for the Telnet server to know the User Profile name of
the requester. The point at which it is possible to force a device name
into the Telnet connection process happens before a Signon display can
be presented to collect the User name and validate a password. The only
information available to the Telnet Server that can identify the
requester is the IP address within its host system where the connect
request has been routed. This implies that the Operator Replay script
driver program must select a unique IP address for each different device
name when it initiates contact with the Telnet server.
:::

 


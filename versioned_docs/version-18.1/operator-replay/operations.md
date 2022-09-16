---
sidebar_label: 'OR Script Operations'
---

# OR Script Operations

## Configuring Operator Replay

The first step required before Replay scripts can be used is to execute the Operator Replay configuration at least one time. Using this function sets values that are required by the Operator Replay programs. For most of the configuration parameters, the default values are appropriate. For example, port 23 is the port commonly used for telnet communications (used to create an interactive workstation session), and the IP address would normally be a \*LOOPBACK interface address, such as 127.0.0.1. However, many sites might choose to increase system security by carefully choosing one of three other Operator Replay virtual device management methods.

The logging parameters should be reviewed and set appropriately.  The recommended initial settings for the Operator Replay script logging parameters are:

- Script job logging: Y (yes) = Highly recommended, especially during first use of new scripts.

- Script job trace logging: N (no) = Do NOT use this option unless instructed by a technical support person.  Trace logging produces a very large quantity of log entries in a short time, and left unattended it could affect system disk utilization.

- Debug logging for captured data and response rules is controlled from the LSAM Utilities configuration, function 7 on Menu 3: Events and Utilities menu.

:::caution
Do NOT change the settings for the Token/variable separator or the Cursor control separators without first learning all about them. These settings must correspond to the content of the Operator Replay Scripts. Please contact SMA Support for assistance with these fields.
:::

The Operator Replay Configuration stores potentially complex rules that support various levels of system security. At the top of the first page of Configuration maintenance, there is a section that is used to define how virtual display devices will be selected. Three of four modes of device selection require the use of the LSAM's Telnet Exit Program. There are also parameters that allow the Script driver program to adapt to the local site's configuration of the IBM i Telnet Server,  including controls over the port that is used and an option to support TLS security applied to the connection between the Script driver program (acting as a Telnet Client) and the virtual display device, through the Telnet Server (which acts as a TLS Server).

For more information and instructions about optionally engaging TLS Security, refer to the topic Engaging Telnet TLS Security just below.

There are function keys accessed from the first page of the Configuration display that connect to Agent tools for defining optional extensions to the basic configuration of the Device Name, IP Address and the Telnet exit program. Refer to the topic [Managing Virtual Devices](./virtual-devices.md) at the end of the Operator Replay Scripts section for a detailed explanation and instructions about how to use these extended security features.

## Engaging Telnet TLS Security

The Operator Replay Script driver program uses TCP/IP sockets to communicate directly with the IBM i Telnet Server program as it requests a virtual display device. IBM i supports two different port numbers for accessing the Telnet server, using by default the port numbers of 23 for unsecured, and 992 for secured.  Administrators can change the port number to match actual port numbers that were reassigned within their system.
 
There are four steps required to engage TLS security between the Operator Replay Script driver program and the virtual display device. The following document sub-sections explain how to perform each of these steps:

- Use the IBM i DCM (Digital Certificate Manager, a web-based application accessed via the IBM Navigator for i), to assign a TLS Client certificate to the IBM i LSAM Operator Replay application.

- Change the port number in the LSAM's Operator Replay Configuration to match the site's Secure Telnet Port number.

- Change the LSAM Operator Replay Configuration option for using TLS Security to "Y" = Yes.

- After changing the TLS Security option to Yes, the Configuration program will display an extra configuration page dedicated to TLS Security. Update the TLS Security options, making sure that the Certificate Application name exactly matches the Application name registered in the IBM i DCM.

## Configuring the IBM i Digital Certificate Manager (DCM)

Information and instructions from IBM about "Securing Telnet with SSL" can be found at the IBM i Knowledge Center, for example, at this i7.2 documentation URL:

<https://www.ibm.com/docs/en/i/7.2?topic=server-securing-telnet-ssl>

:::tip
The web link above may change, as IBM continually revises their published documentation.  In this case, navigate to IBM i Documentation and then search for the topic "Securing Telnet with SSL".  The title may sometime be changed to refer to "TLS" instead of the deprecated SSL methods.
:::

SMA Technologies does not normally provide training about the IBM i operating system or its feature configuration, and SMA Technologies does not provide support for the IBM i operating system. It is entirely the responsibility of the user to correctly configure the operating system requirements mentioned in this documentation. The correct operation of OpCon Agent for IBM i -- Operator Replay feature depends on a correct configuration of the operating system, and this OpCon Agent's logging features for Operator Replay are able to demonstrate and prove that it is performing correctly. The Agent's logs may or may not provide helpful hints, as error codes reported by the operating system are captured in those logs. However, due to the necessary secretive nature of TLS Security, not every incorrect IBM i configuration problem will be detected by this OpCon Agent's programs.

:::tip
The IBM i DCM handles Client and Server digital certificates, themselves, in the same way. The way in which a Client/Server certificate will be used is determined when a certificate is assigned to an application. The DCM presents separate lists for Server and Client applications.
:::

### Digital Certificate Assignments

#### IBM i Telnet Server

To enable TLS Security when communicating with the IBM i Telnet Server, it is necessary to assign a Server certificate to the application in the \*SYSTEM certificate store that IBM pre-defines for its Telnet Server, typically named "IBM i TCP/IP Telnet Server" (this being the Description of the Application, as it appears in the IBM i DCM list of Server Applications).

#### IBM i LSAM Telnet Client

A TLS Client application must be registered in the DCM. It is critical that this application name matches exactly with the TLS Application name registered in the IBM i LSAM Operator Replay Configuration function. The default Application ID suggested by SMA Technologies is: 
```
SMA_IBM_I_OPERATOR_REPLAY
```

There is also an application description value which is non-critical and not registered in the Operator Replay Configuration, but this is what appears in the DCM list of applications to be viewed or updated. The default application description suggested by SMA Technologies is: "**SMA IBM i Operator Replay Telnet TLS Client**".

However, users may select their own Application ID and Description.

Use the IBM i DCM to assign a TLS Client certificate to this application.

### Operator Replay Configuration for Telnet TLS Security

Using the IBM i LSAM menu system, sub-menu 4, option 7, update these two fields that appear in the top section "TCP/IP and Device configuration":

- Telnet port number . . . : <u>00992</u>    *(Port 23 = unsecure, port 992 = secure)*
- TLS security?: <u>Y</u> * Y=yes, N=no*

:::tip
Remember to change the Telnet port number each time the TLS security option is changed between Y and N. Failure to make these changes together will cause the Operator Replay Script driver program to fail. 

Some client sites may have changed their IBM i port assignments for the Telnet ports to different numbers, as an additional strategy for hiding and securing unauthorized access to the IBM i partition.
:::

Whenever the "TLS Security?" value is set to "Y", an additional display format (presented as page 2 of 3 under the current Agent software level), will appear to support registration of these TLS Security options:

- TLS handshake timeout..: <u>**30**</u>       *seconds*
- TLS DCM Application ID.: **SMA_IBM_I_OPERATOR_REPLAY**

After making the Operator Replay Configuration changes on the first and second display pages, remember to press Enter twice -- once to go to page 3, and then a final time to commit the changes to the LSAM Parameters table on disk. The Operator Replay Configuration function returns to the first page after an update is complete, and the successful update action is reported in a message on the bottom line of the workstation display. The function key logo shows a change to the meaning of function keys F3 and F12, indicating they can be used to "Exit" the function (without losing the updates). This change replaces the initial display of the function key legend that shows F3/F12=Cancel, indicating that no changes were yet committed to disk.

### Operator Replay Configuration Control of Logging

A comprehensive view of the interaction between the IBM i Host Workstation Manager, and the LSAM's Operator Replay Script driver program, is accessed from the LSAM sub-menu 4, option 3. Type a 5 next to the Script execution instance desired, and then from the log entry profile display, press F10 to branch to the carefully colored workstation dialog displayed. More information about this log viewer can be found under the topic [OR Script Operations -\> Viewing Operator Replay Logs](#Viewing) elsewhere in this chapter.

Using the IBM i LSAM menu system, sub-menu 4, option 7, the Script driver program logging options support one new value for logging.

- Script job logging . . . :     <u>**Y**</u>        Y=yes, N=no, D=Yes + debug TLS

When the normal script logging option is set to the value of "D", the workstation interaction log viewer will include a verbose report that documents the TLS Security handshake in the first few pages of the log display. Option "D" implies option "Y", meaning that the normal, cleaner log of the screen output and Script driver input will also be included in the log images along with the additional debug log entries.

## Defining a User (Multi-purpose)

Preparing to run Replay scripts begins with registering user profiles to tell the LSAM they are valid for running Replay script jobs. Any valid IBM i user profile may be used as long the user has been granted privileges to perform every step that is included in the step records of the scripts.

:::warning
It is very important to carefully secure access to the maintenance and use of Operator Replay scripts. Depending on the user profiles registered, this form of OpCon job could create security risks for the system.
:::

:::tip
The User management function supports other features available with the LSAM software, besides Operator Replay. For example, FTP jobs defined in OpCon for execution in IBM i require that the FTP user be registered using this maintenance function.
:::

Next, make sure that the SMANET user profile has been granted privileges to use every user profile that will be used with Operator Replay. Follow the steps below to set up a user profile for use with Operator Replay.

### Set Up an Operator Replay User

1. Create the required user profile under IBM i using processes defined by the site.
2. Grant *USE privileges to the SMANET user for the IBM i user profile created.
3. In the command line, enter **SMAGPL/STRSMA**. For more information on **STRSMA** command parameters, refer to the [STRSMA Command](../operations/lsam.md#the-strsma-command).
4. Enter **4** to choose the **Operator Replay menu** in the SMA Main Menu.
5. Enter **1** to choose **User management** in the Operator Replay Menu.
6. Press <**F6**> on the User management menu.
7. On the Add User screen, <**Tab**> to the following fields and type data for each:
    - a. In the **User Name** field, type the User Profile to use when running Operator Replay scripts (up to 10 characters - a longer name could be entered, but Operator Replay is restricted to 10).
    - b. In the **Password** field, type the user profile's password (up to 10 characters, unless the IBM i password option has been set to allow longer passwords to be used).
    - c. In the **Password (to verify)** field, retype the user profile's password to verify the password.
    - d. In the **Description** field, type a text description for the user (up to 40 characters).
    - e. In the **Device Name** field, optionally assign this user to a specific virtual display device.
    - f. In the **IP Address** field, if a Device Name was specified, also enter here the IP Address that will be associated with this device. (The LSAM's Telnet exit program uses the IP Address to force selection of the device. SMA recommends using a \*LOOPBACK type of Interface for this IP Address, which avoids having to create a line description.)
8. Press <**Enter**> to complete the process of adding a new user.

## Creating an Operator Replay Script

There are two ways to create new scripts: Either create a new script from scratch, or copy an existing script and then modify the steps in the new copy.

### Create an Operator Replay Script

1. In the command line, enter **SMAGPL/STRSMA**. For more information on STRSMA command parameters, refer to the [STRSMA Command](../operations/lsam.md#the-strsma-command).

2. Enter **4** to choose the **Operator Replay menu** in the SMA Main Menu.

3. Enter **2** to choose the **Operator Replay scripts** in the Operator Replay Menu.

4. In the **Operator replay script menu**, press <**F6**> to add a new script.

5. On the Operator replay script screen, <**Tab**> to the following fields and enter the following data:

    - a. In the **Name** field, type the script name (up to 10 characters).

    - b. In the **User** field, type the user profile created to use when running Operator Replay scripts (up to 10 characters).  This field can be set to a value of "**\*JOB**" to allow the OpConjob master or the STROPRRPY command to specify a registered User name at run time.

    - c. In the **Description** field, type a text description for the script (up to 40).

6. Press <**Enter**> to complete the process of registering a new script.

7. From te Operator Replay list of Scripts, type "**1**" next to the new Script Name and press **Enter** to display the list of Steps.

8. Press <**F6**> to create a new step on the Operator Replay Script Step screen.

9. On the Operator Replay Step detail screen, <**Tab**> to the following fields and enter the following data:

    - a. In the **Step description** field, type a text description for the script (up to 40 characters).

    - b. Under the String and function to send heading, in the **String to send** field, type a string to send. Press <**F4**> for a list of cursor control characters that can be added to the string, or <**F6**> for a list of Operator Replay variable tokens that can be inserted into the string, or <**F8**> to get help selecting and formatting an IBM i command.
    :::info example
    Entering the string SMAGPL/STRSMA takes the Replay job to the LSAM Main Menu.
    :::

    :::caution
    When using the STRSMA command in an Operator Replay script, it is important to specify the correct value for the ENV (environment) parameter. It is also advisable to specify (*NO) for the ANIMATE parameter to avoid an unexpected delay in processing of the next screen that follows the STRSMA command. When using the STRSMA command in Operator Replay, it must be followed by a second step record that requires a second press of <**Enter**> in order to bypass the LSAM sign on splash display. The command LSAMENU is a simpler way to enter the LSAM menus, but it must be qualified by its library location and it must specify the environment: 
    ```
    SMAGPL/LSAMENU ENV(SMADEFAULT)
    ```
    :::

    - c. Under the String and function to send heading, in the **Function to send** field, type a function name, or press <**F4**>. When <**F4**> is pressed, move the cursor to the preferred item and press <**Enter**>. A commonly used function to send is the **ENTER** function.

    - d. Under the Script branching logic, optionally, specify a **Branch Type**, if this step may cause a branch in script logic. Branching only takes place if the (following) Control Strings qualify this step for execution. If a Branch Type is specified, also type the **Branch-to script** and **Branch-to label** field values. When <**F6**> is pressed from either of these fields, an available Operator Replay Token name may be selected in place of an actual script or label name. From the F6 window, move the cursor to the preferred token name and press <**Enter**>. The selected value will be placed into the field where the cursor is located. (Refer to the discussion below about Script Branching Rules for more information.)
    :::tip
    Control strings are optional. They are used to verify characters in certain parts of the screen. If verification fails, the script may optionally fail, or the step may be skipped.
    :::

    - e. Under the Control Strings heading, if any control strings will be used to quality the step, choose one of the values for **If no match**: S=Skip the step when either control string rule is not satisfied, or F=Fail the whole job.

    - f. *(Optional)* Both of the control strings may use numeric value rules instead of character string comparison rules. To specify that the comparison should be done by compressing out only the numeric values from the control string location(s), type Y=yes in the **Comp numeric** field.

    - g. The **Top** string is one of two optional control strings. To activate a control string, type one of the allowed **Rule** values (EQ, NE, GT, LT, GE, LE). If the **Value** of the reference string will not be blanks, type in the expected string value. Function key <**F6**> may also be used to select an Operator Replay Token if a variable reference value should be used. The **Row** and **Column** fields show the coordinates of the control string.

    - h. A string **Length** may optionally be specified (useful if the comparison value must be a certain number of space characters). If the Length is not specified, the system ignores trailing space characters in the Value field and only compares the number of positions up to the last non-blank character. If an Operator Replay Token variable will be used as the Value and its value length may vary, it may be useful to leave the Length field blank, but if the Length field is specified, any Value characters beyond the specified length will be ignored.

    - i. The **Bottom** string is simply another control string rule that must also be satisfied if specified. It works like the Top string. If both rules are specified, both must be satisfied for any function of this step to be executed.

    - j. Press <**Enter**> to save the step data.

10. The system returns to the **Operator Replay Script Step** list display.

    - Repeat the instructions in step 9 to add additional Steps to a Script.

### Copy an Operator Replay Script

Copying an entire script is another way to Create new scripts:

1. In the command line, enter **SMAGPL/STRSMA**. For more information on STRSMA command parameters, refer to the [STRSMA Command](../operations/lsam.md#the-strsma-command).
2. Enter **4** to choose the **Operator Replay** menu in the SMA Main Menu.
3. Enter **2** to choose the **Operator Replay scripts** in the Operator Replay Menu.
4. Type **3** next to the existing script that is copied, in the Operator replay script menu.
5. Press <**Enter**> to continue.
6. The **Copy Script** window appears.
7. Type a New Script Name and update the User and Comment fields as necessary in the Copy Script window.
8. Press <**Enter**> to record the new script.
9. If a Script is using Captured Data rules, a window is presented offering an option to copy, or not copy, the Captured Data and Response Rules links from the source Script.  
    - In most cases, these links to other master records should be copied because they typically affect the logic of Script Step processing, such as controlling Branching logic.
10. The system returns to the Operator Replay Script list. Use the procedures for Changing an Operator Replay Script, below, to customize the steps of the new script that was just copied.

## Changing an Operator Replay Script

### Ways to Modify a Script

- Change a script by adding or modifying a step.
- Change a step by modifying the Sequence field number.
- Copy a step.
- Delete a step.

#### Adding a Step

1. In the command line, enter **SMAGPL/STRSMA**. For more information on STRSMA command parameters, refer to the [STRSMA Command](../operations/lsam#the-strsma-command).
2. Enter **4** to choose the **Operator Replay menu** in the SMA Main Menu.
3. Enter **2** to choose the **Operator Replay scripts** in the Operator Replay Menu.
4. Type **1** next to the script that is modified in the Operator replay script menu.
5. Press <**Enter**>.
6. The **Operator Replay Step** screen appears.
7. Press <**F6**> (Add) to create a new step on the Operator replay script step screen.
:::tip
The screen for adding step data is the same as for Creating a new script, above. The next available sequence number for the script is automatically assigned, but the proposed sequence number can be modified in order to relocate the copied step into the correct position within the script.
:::
8. Press <**Enter**> to record the new step data.

#### Modify a Step

1. In the command line, enter **SMAGPL/STRSMA**. For more information on STRSMA command parameters, refer to the [STRSMA Command](../operations/lsam#the-strsma-command).
2. Enter **4** to choose the **Operator Replay menu** in the SMA Main Menu.
3. Enter **2** to choose the **Operator Replay scripts** in the Operator Replay Menu.
4. Type **2** next to the script that is modified in the Operator Replay Script menu.
5. Press <**Enter**>.
6. The **Operator Replay Step** screen appears.
7. Type **2** next to the step record that is modified on the Operator replay script step screen.
8. Press <**Enter**> to continue.
:::tip
The screen for modifying step data is the same as the screen for creating a new script. The sequence number can be changed to relocate any step to another location within a script. If the sequence number is changed, any associated Capture Data records will also be changed automatically.
:::
9. Press <**Enter>** to record any changes.

#### Copy a Step

1. In the command line, enter **SMAGPL/STRSMA**. For more information on STRSMA command parameters, refer to the [STRSMA Command](../operations/lsam.md#the-strsma-command).
2. Enter **4** to choose the **Operator Replay menu** in the SMA Main Menu.
3. Enter **2** to choose the **Operator Replay scripts** in the Operator Replay Menu.
4. Type **2** next to the script that is modified in the Operator Replay Script menu.
5. Press <**Enter**>.
6. The **Operator Replay Step** screen appears.
7. Type **3** next to the step record that is modified on the Operator replay script step screen.
8. Press <**Enter**> to continue.
:::tip
The screen for copying step data is the same as the screen for creating a new script. The next available sequence number for the script is automatically assigned, but the proposed sequence number can be changed in order to relocate the copied step into the correct position within the script. Capture Data records from the source script step will NOT be copied to the new Step record. 
:::
9. Press <**Enter**> to record the new step data.
10. If a Script Step is using Captured Data rules, a window is presented offering an option to copy, or not copy, the Captured Data and Response Rules links from the source Step.  
    - In most cases, these links to other master records should be copied because they typically affect the logic of Script Step processing, such as controlling Branching logic.

#### Delete a Step

1. In the command line, enter **SMAGPL/STRSMA**. For more information on STRSMA command parameters, refer to the [STRSMA Command](../operations/lsam.md#the-strsma-command).
2. Enter **4** to choose the **Operator Replay menu** in the SMA Main Menu.
3. Enter **2** to choose the **Operator Replay scripts** in the Operator Replay Menu.
4. Type **2** next to the script that is modified in the Operator Replay Script menu.
5. Press <**Enter**>.
6. The **Operator Replay Step** screen appears.
7. Type **4** next to the step record(s) that is copied on the Operator replay script step screen.
8. Press <**Enter**> to continue.
9. The **Delete Step** confirmation window appears, listing all the step records that were selected for deletion.
10. Press <**Enter**> to delete the step records in the Delete Step confirmation window.

## Deleting an Operator Replay Script

The following procedure deletes a script including all step records in the script.

#### Delete an Entire Script

1. In the command line, enter **STRSMA**. For more information on STRSMA command parameters, refer to the [STRSMA Command](../operations/lsam.md#the-strsma-command).
2. Enter **4** to choose the **Operator Replay menu** in the SMA Main Menu.
3. Enter **2** to choose the **Operator Replay scripts** in the Operator Replay Menu.
4. Type **4** next to the script(s) that is modified in the Operator Replay Script menu.
5. Press <**Enter**>.
6. The **Delete Script** confirmation window appears, listing all the scripts that were selected for deletion.
7. Press <**Enter**> to delete the scripts and all their associated step records in the Delete Script confirmation window.

## Setting up an Operator Replay Script in the OpCon User Interface

An Operator Replay script is normally executed by adding an IBM i (IBMi) job to an OpCon schedule. At a minimum, the following items mustbe defined:

- Job Type: IBM i
- Job Name
- Primary Machine
- Job Information:
  - Job (sub-) Type: Operator Replay Job.
  - User ID: This parameter is optional, since the Agent will always use its SMANET server profile as the IBM i Job User for the submitted Script driver job.
    - Here are the rules the Agent uses to select the User ID for signing on to the virtual workstation:      
      1.  If the Script name box (a renamed version of the Call information box) includes the optional USERNAME parameter (defined below), then this will override the selection of the signon User ID.
      2.  If Script master specifies User, that is second priority.
      3.  When neither of the first two choices were specified, then the Agent's Script driver job will use this OpCon job master "User ID".
- Script name box: The site's Operator Replay script name that was defined using the IBM i LSAM menu functions (described above).
  - Optionally, after the Script Name, it is possible to enter a space character followed by the keyword "**USERNAME**" to specify the User Name that will be used to signon to the virtual workstaion:
    ```
    SCRIPTNAME USERNAME(override_user_name)
    ```

    When using the USERNAME( ) override parameter, it becomes possible to insert an OpCon [[property_name]] for the User Name value.  This technique could be useful in a service bureau supporting multiple different clients or databases from a single Agent with an IBM i partition.

:::tip
Remember that regardless of the source used for the Script User Name, this User Name must always be registered in the Agent's User Management function in order that the securely stored password, and other optional parameters that may define workstation device selection, can be accessed by the Script driver job.
:::

Completing the OpCon job master definition, the LSAM will automatically enforce the following values that are essential for correct operation of Operator Replay. These values may be left set as the default values in the job master:

- For Library ~ Init Lib List: The LSAM will force this to \*JOBD at run time.
- For Job Description ~ Name: The LSAM will force this to SMALSAJ00 at run time.
- For Job Description ~ Library: The LSAM will force this to the location of SMALSAJ00 in the machine's designated LSAM library list.

For information on defining an IBM i Job, refer to [IBM i Job Details](https://help.smatechnologies.com/opcon/core/latest/Files/Concepts/IBM-i-Job-Details.md#top)  in the **Concepts** documentation.

## Data Capture and Response Rules

Optionally, rules may be defined externally to the Operator Replay script that specify data to be captured from screen formats received by the Operator Replay script execution driver program. For each element of captured data there may be one or more Captured Data Response Rules defined.

:::info example
Data Capture and Response Rules can be used to dynamically vary the way an Operator Replay script responds to screen formats! An explanation follows...

An important example of how these features may be used is when an Operator Replay script step String to Send includes a token for a variable. A captured data response rule can be created that will update the value of the variable before it is used. This makes it possible to dynamically vary the response of the Operator Replay script to each screen that is presented, based on the content of the screen format at execution time.
:::

More detail about how Captured Data Response Rules function may be found in [Events and Utilities: Captured Data Response Rules](../events-utilities/captured-data-response-rules).

### Ways to Add Data Capture Rules

- After an Operator Replay script and its steps have been defined, use the LSAM Menu 4 function 5: Work with Screen Capture Definitions, to add or modify captured data rules.
- Press F10=Capt Defn while adding, copying or changing a script Step record to branch to screens that will automatically be linked to that Step record.

:::tip
Introduced with the newer Agent version 21.1, the Captured Data Rules are linked to Script Step master records using the primary key of the Capture Rules master file.  This change removed storage of the Capture Rules data fields from within the Script Step master records, and it removed the Script Name and Step Number of an Operator Replay Step from the Capture Data Rules master file.  As a result of this change, Screen Data Capture Applications and their Rules can be re-used with any number of different Step master records, regardless of the Script Name or Step number.  To use this improvement it is necessary to perform an Agent upgrade from version 18.1 to the 21.1 (or newer) version of the Agent software.
:::

#### Adding a Data Capture Rule from the LSAM Menu System

1. In the command line, enter **SMAGPL/STRSMA**. For more information on STRSMA command parameters, refer to the [STRSMA Command](../operations/lsam.md#the-strsma-command).
2. Enter **4** to choose the **Operator Replay menu** in the SMA Main Menu.
3. Enter **5** to choose **Work with Screen Capture definitions** in the Operator Replay Menu.
4. Press <**F6**> to Add a new Screen Capture definition record in the Work with Screen Capture definitions screen.
5. The **Create Screen Capture Definition** screen appears.
6. Type the Name and Sequence number of an existing step in an existing Operator Replay script on the Create Screen Capture Definition screen.
:::tip
The Script Name and Step Sequence Number must match an existing Operator Replay script. Therefore, it may be easier to use the <**F10**> function key, as described below, from within the Step master maintenance screen to let the system automatically assign the correct values for these two fields.  
(This constraint will be removed after upgrading the Agent to version 21.1, or newer.)
:::
7. Type an Application Identifier value. This value must be the same for each group of capture rules that correspond to a single Operator Replay script. For Operator Replay, this field serves the important function of grouping together in the log files the captured data from a single script execution.
:::tip
The constraints on Application Identifiers and Rules will be eased after upgrading the Agent to version 21.1, or newer.
:::

The remaining steps for building Capture Data Rules and their associated Response Rules are described in the shared, unified topic [Events and Utilities: Captured Data Response Rules](../events-utilities/captured-data-response-rules).

#### Adding a Data Capture Rule from Within Operator Replay Script Step Maintenance

1. Press <**F10=Capt Defn**> to branch to the **Work with Screen Capture Definitions** function from the Operator replay script step screen.
2. The **Work with Screen Capture Definition** screen appears, listing any existing records that apply only to the current Operator Replay script name and Step Sequence number. The Script name and the Sequence number show in the screen heading lines.
3. Press <**F6**> to add a new Data Capture definition record.
4. The **Create Screen Capture Definition** screen appears, showing the Operator Replay script name and step Sequence number in the heading lines.

Please take note of the Tips above describing the new and easier ways to link Captured Data and Responose Rules that will be supported after upgrading the Agent to version 21.1 (or newer).

The remaining steps for building Capture Data Rules and their associated Response Rules are described in the shared, unified topic [Events and Utilities: Captured Data Response Rules](../events-utilities/captured-data-response-rules).

:::caution
When working with the function key <**F10**> to add Data Capture Rules and Response Rules, it is easy to forget to press <**Enter**> after completing additions or updates at any of these lower levels of stacked programs.  Remember to record new data with the Enter key before exiting each maintenance function to return to a higher level in the program stack.
:::

### Ways to Add Captured Data <u>Response Rules</u>

- After a Data Capture definition has been completed, use the LSAM Menu 4, function 6: Work with Captured Data Response Rules, to add or modify captured data response rule records. 
- Press F11=Response Rules while adding, copying or changing a Data Capture definition record to branch to screens that will automatically be linked to that Data Capture definition record.

The remaining steps for building Capture Data Rules and their associated Response Rules are described in the shared, unified topic [Events and Utilities: Captured Data Response Rules](../events-utilities/captured-data-response-rules).

## Script Branching Rules

Optionally, rules may be defined at the Step level within Scripts that cause the LSAM Script execution program to process steps in an order other than a simple sequential process through a single script. It is possible to qualify steps so that they are optional and can be skipped. It is also possible to define a work flow that will branch to a step in another script, or to a different step within the same script. Using terms familiar to RPG programmers, it is possible to go to (GOTO) a
completely different step and tell the script execution program to continue forward from there, or it is possible to exit to a subroutine (EXSR) and then return to the point of exit after the target script steps have completed.

It is not required to be a programmer in order to utilize the branching logic available in Operator Replay scripts, but it is helpful to be familiar with the basic concepts of a procedural programming language. Non-programmers might wish to consult with an experienced programmer in order to take full advantage of the powerful options that Operator Replay script branching logic can support. The Operator Replay script flow chart tool helps by displaying a picture of the script and steps that will be executed when branching logic has been specified.

This section of documentation introduces the rules that apply to script branching logic. It presents a simple set of steps that would be followed when defining branching logic. It also offers an explanation of how the branching tools work, including cautions about risks that may be introduced by using branching tools. More details about each of the step fields used to define branching logic can be found in the Screens and Windows section of this topic.

### How To Build and Test Script Branching Logic

Use the steps outlined above for adding (creating), changing or copying a Script Step record. As a script step is being defined, there are various tools that can be used to define the flow of scripts and their steps. The individual tools that control script branching logic are described in the following section.

The basic steps for implementing branching logic are these:

1. Develop an overall plan of the Operator Replay script logic required, typically by manually executing operator functions on an interactive workstation session and taking note of any point in the work flow where a choice of responses must be made. Follow through the operator actions for each possible option, identifying screen characteristics and listing the steps for each branch of the work flow. Decide which of the branching tools (described below) seem best adapted to the circumstances. There are some examples below that might help with this decision.
2. Build one or more scripts, assigning labels to any step that might be used as a branch-to point. Note the Script Name and Label whenever a label is assigned.
3. Insert Dynamic Variable Tokens as necessary into any of the step fields that accept these variables. Take note of the variable names assigned.
4. Add branching instructions to any script step that will refer to the registered step labels.
5. If a Token name was specified in any field, decide how the tokenvalue must be set.

    - The Token value could be set by a String to send command in a previous script step.

    - The Token value might have been set by a job that ran previously, or it can be set manually.

    - The Token value can be determined at the time this step is being executed by adding Screen Capture Definitions for this screen format and assigned a Captured Data Response rule that will execute the SETDYNVAR command (explicitly, or implicitly using the Store To-> field) to set the Token value. (Refer to a description of Captured Data Response Rules above.)

6. Go back, as necessary, and apply labels to any additional steps that will be used as branch-to points, taking note of each Script Name and Label.
7. Audit the resulting logic using option 9=flow chart from the Operator Replay Script list display.
8. Make sure the Operator Replay configuration parameters are set for "Script job logging" = Y (yes) in the test environment. (It is also a good idea to log scripts in the live environment, especially just after they are first installed for live operation.)
9. Test the combined scripts in a safe, test environment.

    - One method for testing is to use the STROPRRPY command directly from a 5250 green screen workstation session command line. To use this method, start a new interactive job for each test to keep test sessions separated in the Operator Replay debug log member file. For interactive testing, the STROPRRPY command parameter JOBTYPE must be set to a value of "**A**" or "**T**".
    ```
    STROPRRPY JOBNAME(script_name) JOBTYPE(T)
    ```
    - It may also be useful, or even required, to use a test OpCon schedule to perform the script test. This might be necessary if any value from the OpCon environment will be communicated to the IBM i LSAM in order that the value will be available for Dynamic Variable tokens.

10. Use the Operator Replay menu function 3, Operator Replay logs, to examine the log detail of the test script job. Use the Search function in the view of the log content (F10=Log detail) to scan for each Label value and for each Token name that was specified in the test script(s). Make sure that the branching resulted in the correct work flow and that appropriate values were supplied for all Tokens.
11. Repeat the Script test job for each possible branching option, to make sure that expected results are obtained.

### Script Branching Tools

When following the steps described above in the how-to outline, consider the following tools that are available for defining and controlling Operator Replay script branching.

- It is possible to create script steps that perform any one function available on a step, without actually sending a data string or a function key to the IBM i workstation processor. In fact, it is allowed to create a script step that does nothing, although the script analyzer flow chart tool will display a warning message if such a step is found. The LSAM script execution program continues to process step records and execute only the individual instructions found on each step; it will not respond to the current workstation screen format until either a string to send or a function key to send is found in a step. Once a function key to send is found, processing for the current screen format is completed and any subsequent steps in the script will be assumed to apply to the next screen format received.

#### Using Control Strings to Manage Script Flow

- A script step can be made optional by specifying a **Top** and/or **Bottom Control string** and setting the no-match option to S=Skip. If a step is skipped, the script execution program assumes that the next step in the script will process the current screen format that has been received. A pair of sequential script steps that both test the same control string could be set to opposite rules (one equal  and one not equal), creating two different responses to the same screen format. Similarly, an unlimited set of sequential script steps could be defined that would each perform a different response, depending on the control string comparison results. However, when multiple steps are created to respond to a single screen format, it is critical that only one step will be allowed to send the final function key (or <**Enter**> key) that completes the response to the screen, because once a function is sent, the screen format is no longer active in the IBM i workstation buffer.

- **Control strings** are used to determine whether a script step should be executed. Up to two control strings may be specified for each step record. Each control string has its own row, column and length value. If the length value is zeros, the script execution program assumes that the control value length is equal to the control characters specified, but not including any trailing spaces (blanks). If more than two control strings are needed to accommodate all possible test conditions, it is possible to enter more than one step record that will apply to the same screen format being processed as long as only one step record will actually perform the final function to send operation. Each step record may specify different rules for its pair of Top and Bottom control strings. For example, the **Compress Numeric** option may be set to Y=yes to cause the two values compared to be stripped of all non-numeric characters so that only the resulting absolute numeric values are used (decimal places are not indicated by a decimal point, so both values must used the same number of decimal places). Each Top or Bottom Control String has its own comparison rule. Any of the six boolean operators may be used:
  - **EQ** = equal (=)

  - **NE** = not equal (<\>)

  - **GT** = greater than (>)

  - **LT** = less than (<)

  - **GE** = greater than or equal to (>=)

  - **LE** = less than or equal to (<=)

#### Using Labels and Branch-To Logic to Manage Script Flow

- An optional **label** value may be applied to any script step. Label values are ignored unless they are referred to by a branching instruction in another step. Label values are required if a branching instruction is supposed to either (1) go to a different step in the same script, or (2) go to another script but start at a step that is not the first step in the target script.

- Any script step may specify a branching instruction in the **Branch Type** field. A branching instruction will only be executed if the optional Top and Bottom Control Strings pass their comparison rules. If a branching instruction specifies a different script, that script must belong to the same user profile originally specified for the current job, otherwise the script will fail. There are two possible branch types: GOTO and EXSR.

  - **GOTO**: Tells the LSAM script execution program to relocate its execution control point to a different step, perhaps in a different script. GOTO can cause a completely different script to take over the job, or it can cause the script execution to jump either ahead or back within the same script. The script execution program will not automatically return to the point where a GOTO branch is executed; the program stays within the same level of execution (refer to EXSR for a definition of the execution level).

  - **EXSR**: Tells the LSAM script execution program to mark the current step as a return point, increase the nesting level counter to the next highest level and then begin executing script steps at the specified script and step label. Whenever the target script of an EXSR instruction reaches its last step, the script execution program will return to the exit point, decrease the nestling level counter by one and resume execution of the original script at the next step after the EXSR operation. It is possible to have the target of an EXSR branch also execute its own EXSR instruction. When this happens, it is called nesting of script levels. The LSAM script execution program allows up to nine (9) nesting levels. If a series of connected scripts attempt to nest EXSR instructions to deeper than nine levels the script execution job will fail. The script analysis flow chart tool can be used before script execution to help prevent this error, but if Dynamic Variable Tokens are used for the Branch-To Script or the Branch-To-Label, the flow chart tool will not be able to discover the true number of nesting levels.

- **Branch-To Script**: Either type of branch instruction may optionally use the Branch-To Script field to tell the LSAM script execution program to start using a different script. If this field is left blank, the program assumes that the target of the branch instruction will be found within the script that is currently being executed. This field supports using a Dynamic Variable {TOKEN}, so that Capture Data and Response Rules can modify the Script flow depending on the screen content.

- **Branch-To Label**: Either type of branch instruction may optionally use the Branch-To Label field to specify the step in the target script where execution will continue. If no label is specified, the program assumes that the first step in the named script should be the next step to execute. It is good practice to always specify a Branch-To Label value. Using labels on script steps helps to assure that the intended script logic will not change in case changes are made to any script that is a target of a branching operation. This field supports using a Dynamic Variable {TOKEN}, so that Capture Data and Response Rules can modify the Script flow depending on the screen content.

### Risks in Script Branching Logic

Script branching logic is very powerful, but it can also create a risk of unexpected results. The script flow chart option 9 on the Operator Replay Scripts list display should always be used to carefully audit the resulting step flow whenever branching instructions are used. The flow chart display (which may also be printed as a report using F9=Print) will show as many error messages as the program can detect. However, if Dynamic Variable Tokens are used for the Branch-to script or  the Branch-to label, the flow chart display routine will not be able to anticipate the value of the Token at execution time, so it cannot predict where the script execution will flow.

:::warning
It is critical that scripts combined with branching logic be tested in a safe test environment before being implemented in a live environment. The results of branching logic cannot always be predicted by the flow chart tool whenever Dynamic Variable {TOKENS} are used to build adaptive Script flow logic.
:::

Here is a list of some of the features of Operator Replay Script Steps that can create risky procedures:

- Using a Dynamic Variable (or older Operator Replay) **Token** for a variable value in either the Branch-to script or the Branch-to label can create a powerful script that can adapt to varying conditions on a given screen display format, but great care must be taken to control the Token value, since <u>Tokens can be changed by commands executed elsewhere</u> in the script or by Captured Data Response Rules.

- Not specifying a **Branch-to label** tells the script execution program to assume that the first step in the Branch-to script should be selected. <u>This may create a risk of unpredictable results if anyone later changes the first step in the target script.</u> For this reason a label value should be assigned to any step that will be the target of a branching instruction. Assigning a label helps to alert other staff members that a script step is the target of script branching.

- Using the GOTO branch type to route the script to a step with a lower sequence number in the same script can <u>create a logic loop</u> that would, in theory, cause the script execution to never end. To prevent this problem, there is an Operator Replay Control option for specifying the maximum number of recursive loops allowed: the **Script loop detect limit**. If this number of recursive loops (repeated execution of the same script steps) is exceeded, the script execution program will abort script processing and cause the script job to fail. Recursive script execution applies also to branches into other scripts. It is allowed to branch to the same step (or an earlier step) in the same script multiple times, because sometimes a script will have been written so that it can be re-used as a utility subroutine by various other scripts. In this case, the number of recursive script calls allowed should be set high enough to make the subroutine script useful, but a reasonable limit should be applied in order to avoid a run-away job. The script flow chart tool identifies every script loop it can detect in order to prevent excessively long flow charts. But the flow chart tool cannot detect when using a variable Token might create a loop during live execution. In this case, the live execution will still be protected by the Script loop detect limit control field, protecting the system from a run-away job.

- It is possible to register multiple script steps to handle a single screen display format. This rule makes it possible to specify more than two control string comparison rules for a single display format. There are many other uses for this rule, such as creating multiple branching instructions that are each qualified by different control strings, or to link to different sets of Screen Capture Definitions (and Response Rules). It is also possible to register different Strings to send or Functions to send that can be selected based on Control string qualification. But the risk of this technique is that if there is ever a case where none of the steps qualifies to handled a given screen format, then the <u>script execution could become un-synchronized with the flow of screen display formats</u>, resulting in unpredictable responses to screens and possibly damaging the integrity of the application database.

### Receive Timer Override with Branching

The Receive timer override field on a Script Step applies to the screen format that each Step is assigned to manage. To make this timer override effective before the screen format is actually received (that is, while the Script execution program is waiting for the next display format to arrive), the Script execution program must read ahead from the last Step record that was just processed. The read-ahead of the next Step is required in order to obtain the override timer wait value that should apply to the next pending screen format.

When branching logic is used, this creates an impact on the Receive timer override. The Script execution program does not attempt to read ahead to a Branch-to Script or Step in order to obtain the optional Receive timer override value. (The reason for this is that there is no guarantee that the branch instruction is completely defined until the next screen format has been received and processed to determine the response.) If Step 3 of Script A has a branch operation to Step 2 of Script B, the Script execution program actually uses the Receive timer override value from Step 4 of Script A, even though the program will be waiting for the screen format that will be processed by another Script.

To overcome this problem when using branching logic, it may sometimes be necessary to add an extra Step record after a Step that includes a branching operation. In the example above, a Step 4 record can be added to Script A only for the purpose of registering a Receive timer override value. It is not necessary that this Step 4 record perform any other action. The Step 4 record will be read in advance, but it will never be processed, or, if it is processed because branching is variable and causes the next step to be processed, then this no-action Step record will simply pass through the Script execution program with no other effect, and in this case a Step 5 record would be required to actually respond to the pending screen format.

### Using Dynamic Variables Instead of Operator Replay Tokens

There are two different tables of Token-named variables in the IBM i LSAM database: the older Operator Replay token/variables and the newer LSAM Dynamic Variables.

- The Operator Replay Token/Variable Management (LSAM menu 4, option 4) maintains the variables that were originally developed just for Operator Replay Script Steps. The Operator Replay configuration function (LSAM menu 4, option 7) shows the reserved character that is used to identify an Operator Replay Token. The configuration function could be used to change that reserved character, although it should not be changed unless this is critically important, such as when there is a conflict with a non-English language database.

- The newer LSAM Dynamic Variables are maintained by a menu-driven program that is accessible from many of the LSAM menus, or by the SETDYNVAR command. The reserved characters that identify Dynamic Variable Tokens are displayed, and can be changed in the Job Tracking Configuration function (LSAM menu 1, option 7). It is strongly recommended that these reserved characters not be changed because they are coordinated with the function of variable substitution used by OpCon in its job and schedule management.

SMA recommends using only Dynamic Variables in the Operator Replay Script Steps. Dynamic Variables are fully supported in many ways by both the LSAM Agent software and by OpCon, whereas the older Operator Replay variable/token feature is limited, it will not be further enhanced, and it is retained only for compatibility with long-standing client installations that originally only had the old variable type.

Dynamic Variable tokens are supported by many of the fields that define a Script Step. These fields are noted in the [OR Screens and Windows](./screens.md) section, below.

### Flow Chart of Script Branching Logic

The Operator Replay Script list function (LSAM menu 4, option 2) offers a list Option value of 9=Flow chart that can be used to display or print an analysis of Scripts and Steps. This section of the document explains the contents of the flow chart display and it helps to illustrate the effect of using the branching logic fields in the Script Steps.

Option 9 may be used even on single Scripts, but it is most useful when any branching logic (GOTO or EXSR) operations have been added to Script Steps. The flow chart program shows a graphic representation of the logic flow that results from branching across Scripts and at the same time it edits the branching instructions and flow for many types of errors and warnings that could cause the linked Scripts to fail.

The flow chart program has the following limitations:

- It does not try to replace Operator Replay or Dynamic Variable tokens with real values in the Branch-to Script or Branch-to Label fields because it is not possible to determine what those values will be at execution time. Instead, any branching instructions that use tokens will be shown in the flow chart with a warning message on the next line and the flow chart will continue documentation from the next Step in the Script as if no branching had occurred.
- It does not reflect how Script logic could change depending on Top and Bottom Control strings, such as when more than one Step record is registered to respond to a single display format. Instead, if a Function to send is not present, the program will register that condition in order to call attention to the need for (1) a manual analysis of the flow logic and (2) the need to examine this point in the flow in the Operator Replay log display as the Script is being tested.
- It does not repeat the flow analysis of the same section of a Script more than once. The flow chart program uses logic very similar to the live Script Execution program to detect when the flow will loop back to the same Step, or a lower Step sequence number, in a Script that was previously analyzed at that point. When it detects a loop, it prints a warning message, and then the program goes on to the next step in the Script as if a branch had not occurred, in order to complete its evaluation of all Script Steps.

The following limited example of an Operator Replay Script branching flow chart illustrates the format and content of the display delivered by the Operator Replay Script list display, option 9=Flow chart. (Note: The following example shows more than 24 lines on the display in order to illustrate more examples of flow. The report resulting from function key F9=Print would show all the lines and also up to 132 characters in width - revealing the extra characters that are cut off from script step 0035.)

Notice in the following example that whenever the GOTO branching instruction is encountered, the flow chart analysis program will display the full analysis of the Goto-Script in a separate analysis section below. This reporting method helps to eliminate redundant reporting in case the same Script name is used more than once in a complete job analysis.

Operator Replay Script Flow Chart

```
OPRR11R1                Operator Replay Script Flow Chart                00/00/00
USERNAME                    Starting Script: TESTONE                     03:51:48
                                                         Search content: ________
   Script/Label  BR/SEQ\# TIMER Description/Command
   TESTONE                     Demo
   |..              0020          Function key only: {FK}
   |..              0035          LSAMENU ENV(GAL033120) MENUNBR(0)~FE\`  \<F-Key:{F
   |..              0040    60    DSPLIBL \*PRINT~FE\`  \<F-Key:ENTER\>
   |..            EXSR            Script: {SCRTWO}    Label: {LBL2-1}
   |..                            WARNING: Cannot analyze branch Token
   |..            EXSR            Script: SCRIPT7890  Label:
   +SCRIPT7890                  Description - this script nested at level 2
   ||..TARGETLBL0    0010          COMMEND SYNTAX 10
   ||..              0020          COMMAND SYNTAX 20
   ||..              GOTO          Script: SCRIPTABCD Label: TARGETLBL1
   ||..              --->          (See analysis of GOTO Script/Label below)
   |-             RETURN
   TESTONE                     Demo
   |..              0050          SIGNOFF~FE\`  \<F-Key:ENTER\>
   END

   SCRIPTABCD                  Description dddddddddddddddddddddddddddddddd
   |..              0010          (sample bypassed step)
   |..TARGETLBL1    0020          COMMAND SYNTAX 20
   |..              0030   120    Wait timer override only
   |..              0040          WARNING: Step with no action
   |..TARGETLBL2    0050          Label location only
   |..              0060          LAST STEP COMMAND
   END

                                                                           Bottom
   F3=Exit   F5=Refresh   F9=Print   F12=Cancel   F16=Search next
```

##### Fields

- Search content: Type any text value in this field and press <**Enter**> or <**F16**> to start a new search. The entire content of a flow chart line is searched, including the text that may not fit on the 80-column interactive display
 but which would show on the 132-column printed report. 
- Script/Label:  Either a Script name or an (optional) Step Label value is shown in this column. Lines are indented depending on the nesting levels (up to 9) that may occur when an EXSR branching instruction is in effect. This column also shows vertical bars equal to the number of the nesting level for each Step in the current Script. Other signs that can appear in this column include: 
  -   (..) Two dots are used to show that the line is information about a Step within a Script. 
  -   (+) A plus sign is used whenever there is a change in the current Script name from a GOTO or EXSR branch. 
  -   (-) A minus sign (or dash) is used wherever the nesting level decreases by one because the end of a Script implies a RETURN from an EXSR branch. This sign also indicates a return to a previous Script name.
- BR/SEQ#:  
  -   Branching operation: EXSR or GOTO 
  -   SEQuence #: Shows the sequence number assigned to each Step. 
  -   (****): Four asterisks appear in place of a sequence number to indicate certain errors. Refer to the text under the Description column for the error information.
  -   (++++): Four plus signs are used for errors like an invalid change in User Name when a branching instruction leads to a Script that has a different User name than the original Script. Changing of Script User names is not  allowed.
- TIMER: The optional Receive wait timer override value appears when assigned. 
- Description/Command: 
  -   Scripts: The description of the Script is displayed. 
  -   Steps: The command syntax executed by a Step is displayed (not the Comments) 
  -   Branching: An extra line is shown when a Step includes a branching instruction. This column displays the target Script and Script label. 
  -   other: Warning or Error message text may appear in this column.

#### Flow Chart Diagnostic Errors

The flow chart program cannot discover every error or illogical condition that can occur during live execution of a Script, but it is useful for reporting obvious errors and for highlighting Script conditions that could be possible points of failure. The error and warning messages that can appear in the flow chart are listed in the following table.

#### Flow Chart Diagnostic Messages
  
-  **Branch rule only**: A Script Step has no String to send or Function key to send, only branching instructions.
-  **Function key only**: A Script Step has no String to send, but does have a Function key to send.
-  **Label location only**: A Script Step has no String to send, no Function key to send and no branching operation, only a Label assigned to it so that it serves only as a target for branching instructions from other Steps.
-  **Wait timer override only**: A Script Step has no other field value assigned except for the Receive wait timer override value.
-  **Label location and timer override only**: A Script Step has no other field values assigned except for the Label field and a Receive wait timer override value.
-  **WARNING: Step with no action**: A Script Step has no String to send, no Function key to send, no branching operation, no Label assigned and no Receive wait timer override value. This Script Step has no function, it may need maintenance.
-  **WARNING: Nesting more than 9 levels**: When one Script uses the EXSR branching operation to run another Script this is called nesting. Nesting means that the Script execution program must remember where to return after the target Script reaches its end. The Script execution program can store up to nine levels of nesting information, so nesting EXSR operations deeper than nine levels is not allowed.
-  **WARNING: Cannot analyze branch token**: The flow chart program does not know what the value of an variable token will be at execution time, so it does not attempt to evaluate the flow of a Script Step that uses tokens in either the Branch-to Script field or the Branch-to Label field. Instead it simply lists the Step along with this non-critical warning message, and then it continues to analyze the next Step in the Script.
-  **WARNING: Branch Script/Label not found**: This error is displayed when a branch operation specifies a Script name and/or a Label name that cannot be found in any of the Script master files. This error must be fixed before a Script can actually be executed.
-  **WARNING: Branch loop detected, skipping repeat**: The flow chart program uses the same logic as the Script execution program to detect whenever a branch operation will cause the same Step to be executed in a Script more than once. The flow chart program will not list the same Step twice, in order to limit the size of the analysis display or report. It is allowed to loop to the same Script Step more than once, but the Script execution program uses the Operator Replay control file value for the Script loop detect limit to determine if Script execution is in a run-away loop that must be stopped to protect the system.
-  **WARNING: Branch-to Script User does not match, fatal error**: When branching operations are used, the target Script must be registered for the same User profile as was specified for the original Script. Actually, the flow chart uses the Script master record to determine the original User name, but at run time, the Script execution program allows the USER parameter of the STROPRRPY command to override the User name. In this case, if one Script tries to branch to another Script whose registered User name does not match, the Script execution job will be forced to fail as a security measure. Therefore, in practice, when branching is being used, the registered User name of the original Script should match the intended job user name in order for the flow chart program edits to be useful.

#### Analysis of Example Flow Chart

The example of a Script flow chart above does not include every possible circumstance or error message. If the actual flow chart on display is not clear, please contact SMA Support and ask questions. This flow charting tool is considered a very important proof step when using Operator Replay branching logic, and SMA wants to help assure that the system and its database are well protected.

Each of the following points of information about the flow chart example above help to illustrate one or more features of Operator Replay scripting. Some of the information appearing in the flow chart example is similar to the data illustrated in the Operator Replay Log example below, where more information about those features may be found.
 
A separate example of the printed flow chart, obtained by pressing F9=Print from the flow chart display, is not provided in this document because the output is identical, with the exception that the printed report provides up to 132 characters per line.

- The first Script name appearing in line one of the flow chart is the same as the Starting Script name shown in the header lines of the flow chart.

- The first Step in the flow chart illustration appears with sequence number 0020. Although the system default for a first Step in a Script would be 0010, there is no guarantee that the first sequence number of a Script will always be this number, due to changes that can be made. This is one reason why it is important to use the Label field whenever a step will be the target of a branching instruction. Do not assume that the first step in a Script will always remain what it was when the branching was first defined. Using Labels helps to assure that Script branching will always be predictable.

- The first EXSR operation shows that Operator Replay Tokens were entered for the Branch-to Script and the Branch-to Label. In this case, the flow chart program cannot determine what the token values will be at execution time, so it simply logs a warning on the next line and then it continues to analyze the remaining Steps in the current Script, as if no branching had occurred. Obviously, this flow chart is not likely to be a 100% match to the logic that will be executed at run time.

- Another EXSR operation appears immediately after the previous Step. When this occurs, it suggests that a Top or Bottom Control String might have been used to qualify which of the two EXSR operations should be executed, depending on the content of the screen display format at run time. However, it is possible that both EXSR operations would be executed, and the flow chart was simply unable to evaluate what would happen with the first operation.

- The second EXSR operation shows that a Branch-to Script name was provided, but the Branch-to Label is blank. This is not recommended. Scripts are more reliable if Labels are always used for branching. However, the system supports this condition, and the assumption is   that the first Step of the target Script will be executed by default. The example shows that the target Script SCRIPT7890 begins with a Step of sequence number 0010. Notice that the flow chart shows a label value at this Step sequence number 0010. This means that someone used good practice in assigning the label value. The flow chart program helps to discover that the second EXSR operation step should be updated to use the available Label value.

- As the second EXSR operation is evaluated, the flow chart program adds a vertical line to the Script/Label column to show that the Script logic is currently nested at the second level. This implies that eventually the Script will RETURN to the first, original nesting level.

- At Step sequence number 0020 of SCRIPT7890, a GOTO operation is found. The flow chart program shows the target Script and Label values. The example illustrates that the Label TARGETLBL1 is found at Step sequence number 0020 of the new Script. Although it is not reliable to assume anything about a Step sequence number, if SCRIPTIABCD is assumed to start with Step sequence number 0010, then the example illustrates that branching can cause a Branch-to Script to start execution somewhere in the middle of the series of available Script Steps.

- The analysis of the new Script name, SCRIPTABCD, is performed later in the analysis report. If the original script qualified the step with the GOTO instruction, the branch might not have been executed. Therefore, the report continues with the analysis of the original script, showing the remaining steps.

- SCRIPTABCD includes examples of two warning messages. First is a Script Step number 0040 with no actions of any kind. This means it has no String to send, no Function to send, no Branching instructions and no Label assigned to it. In other words, this Step has no function at all, except as a place holder, perhaps. The warning message suggests that maybe something has been overlooked at this step. However, script steps are not required to perform any action; it is allowed to have a script step that does nothing. Script steps like this may be used to store a receive timer override, or they may serve as a connecting point that links to Captured Data Rules and Response Rules. Compare this to Step number 0050, which also has no actions to perform, but this Step does serve as a potential target for a branching operation of another Script.

- Finally, after Step sequence number 0060 of SCRIPTABCD is executed, the flow chart analysis program discovers that this is the last Step in that Script. When the last Step is reached, the program checks to see if the Script execution has been nested to a level higher than one. In this case, the implied RETURN operation shows that the execution was at nested level two, so the program returns to the first nesting level and resumes execution of Script TESTONE at the next step after the one that performed the EXSR operation (sequence number 0040, near the top of the list). In this example the only step remaining is Step sequence number 0050, which will execute a SIGNOFF command, ending Script execution. Note that if a SIGNOFF command is encountered while Script execution is nested at levels above one, the Script job will still end at that point and any steps remaining in the Scripts at lower nesting levels will be ignored.
    
### F11 = Show/Hide COND (Conditional Control Strings)

It is possible to enhance the flow chart display by optionally including (or excluding) any operational Control String logic. Two report lines are added for each of the Top and Bottom Control strings, that is, if either string has a non-blank compare value or a non-zero compare length (which are the two conditions that make a Control string active). An example follows showing how the flow chart changes when F11 is pressed. Press <**F11**> again to remove the extra lines.

Script Flow Chart Display After **F11=Show COND**:
```
OPRR11R1               Operator Replay Script Flow Chart               00/00/00   
USERNAME                   Starting Script: ACHUPTEST                  14:07:57
                                               Search content: ________           
  Script/Label  BR/SEQ\# TIMER Description/Command
  ACHUPTEST                   Test step 80 of ACHUPLOAD
  |..              0010          Function key only: ENTER
  |..                   COND: S=skip (if not), CMPNUM( )
  |..                          TOP = R: 1 C:31 L:    EQ
  |..                          Sign-on Information
  |..              0020          Function key only: ENTER
  |..                   COND: S=skip (if not), CMPNUM( )
  |..                          TOP = R: 1 C:28 L:    EQ
  |..                          Display Program Messages
  |..              0030          Branch rule only
  |..                   COND: S=skip (if not), CMPNUM( )
  |..                          TOP = R: 1 C: 2 L:    EQ
  |..                          not a match
  |..           GOTO             Script:             Label: ENDJOB
  |..           --->                (See analysis of GOTO Script/Label below)  
  |..              0080          Function key only: HOME
  |..           GOTO             Script: ACHUPTEST   Label: {WAITDYNV}
                                                                           More...
  F3=Exit   F5=Refresh   F9=Print   F11=Show COND   F12=Cancel   F16=Search next
```
## Viewing Operator Replay Logs

The Operator Replay log files capture all the interactive input and output that occurs during script execution. Logging of Operator Replay scripts is optional and controlled by the Operator Replay configuration option called "Script job logging". This option can be set to "N" (no) after scripts have been verified in order to improve the performance of the scripts and reduce performance impact on the system. When a new script is being used the first few times, or if a problem arises with script execution, SMA recommends that script logging be set to "Y" (yes). Script log file history retention is restricted to the number of days specified in the general LSAM Parameters.

Each Operator Replay script step is displayed showing the screen images received and the functions executed on the IBM i computer. There is one Operator Replay log entry for every unique job that has executed an Operator Replay script. Each log entry provides access to a unique data member in the script log file. There is typically one script job per log file data member, but it is possible for multiple script jobs to appear in the same log file data member. This occurs when the Operator Replay command specifies the JOBTYPE of "A" or "T" for interactive green screen testing of Operator Replay scripts. In this case, multiple script jobs are recorded back to back in a single log file data member unless the tester logs off and starts a new IBM i workstation interactive job before each new script test.

The view of log file entries for each screen format received is useful for debugging scripts. The portion of the log entry that represents a screen format is marked with row numbers to the left and column numbers above and below the log content display. Function keys may be used to window left and right so that the entire screen format can be viewed and carefully analyzed. The row and column numbers presented in the log file view are accurate for defining the Top and Bottom Control Strings of a Script Step and also for Screen Capture Definitions and Response Rules.

#### View Operator Replay Log Files

1. In the command line, enter **STRSMA**. For more information on STRSMA command parameters, refer to the [STRSMA Command](../operations/lsam.md#the-strsma-command).
2. Enter **4** to choose the **Operator Replay menu** in the SMA Main Menu.
3. Enter **3** to choose the **Operator Replay logs** option in the Operator Replay Menu.
4. <**Tab**> to the desired log file.
5. Enter **5** next to the selected replay log file under the Opt column.
6. Press <**F10**> to view the log detail.
7. Within the Operator Replay log display, the available function keys are uniquely displayed near the upper left-hand corner.
8. Use function key <**F24=More keys**> to see all available function keys.
9. The Search field at the upper right-hand corner of the display helps to find details of script execution. Press <**Enter**> or <**F16=Search**> after typing a new value in the Search field. If a previous search argument is shown in pink to the right of the Search input field, then function key <**F16=Search**> may be used to find the next occurrence of the same value in the log data member.

### Operator Replay Log Example

The Operator Replay Display Log example below shows an artificially extended example that includes the last few lines of output from one display panel, followed by a String To Send entry, and then another entire screen output sequence followed by a Function To Send entry. The Operator Replay Sent data is black in this example, but the actual display shows these entries in white or highlighted (for non-color displays). Other colors are used to separate the various types of log entries made as the Operator Replay script execution program documents all of its actions, as follows:

- Green = reserved for IBM i workstation management output to the display screen, that is, the content of the screen format currently on display.

- Yellow = a log marker line after the last line (24) of display format content, including the timestamp of when the screen format was received.

- White = String to send, and Function to send.

- Blue = Script navigation entries (Script name, sequence number and optional label value), logging of Operator Replay Token/Variable replacement actions.

- Pink = Script branching, such as GOTO, EXSR and RETURN (from EXSR).

- Cyan (turquois) = If there is a "**CaptID:**" entry appearing in the log, it is possible to put the screen cursor on this type of line and then press <**F13**> to branch to a view of the Captured Data (and Response Rules) Log entries in a different Agent log file.

- Red = Script error messages.

Most log data will appear to show the same screen format multiple times, usually twice per format. This happens because the Operator Replay script execution program performs the String to send action separately from the Function to send action. The screen format content is logged when it is first received, before any actions are performed. After the IBM i workstation management receives a String to send, it typically echoes back the screen format so that the keyboard data will appear on the screen. More than one String to send operation could be performed before a Function to send operation is completed. Sending a function key (which can be the <**Enter**> key) completes the Operator Replay response to an individual screen format, although the Operator Replay script execution program may still perform branching operations from the same Script Step record after the function key is sent.

#### Operator Replay Display Log
```
OPRRPYR10                 Operator replay display log                  00/00/00
USERNAME           Environment: SMADEFAULT  Version: 03.31.20          16:33:48
  Script Name: TESTSCRIPT  Date: 00/00/0000  Time: 12:31:42  Log mbr: O123456   
  F12=Cancel  F19=Left  F20=Right  F24=More keys   Search: _________  LastValue
      1...5...10....5...20....5...30....5...40....5...50....5...60....5...70..74
   21
   22  F3=Exit   F4=Prompt   F9=Retrieve   F12=Cancel   F13=Information Assistant
   23  F23=Set initial menu
   24                                          (C) COPYRIGHT IBM CORP. 1980, 2003    
   12:31:45 ====================================================================
   12:31:45 Scr:TESTSCRIPT Seq:35 Lbl: Lvl:1
   Top: Rule(EQ) R(1) C(72) L(8) Num(Y) String(|SERNO|)
   Found: BufPos(72) Len(8) String(S1234567)
   12:31:51 Replacing token SERNO with value S1234567
   12:31:51 New control string: S1234567
   12:31:51 Found number: 1234567
   12:31:51 CaptID: 'MACHINE SERIAL NUMBER' Seq:010    (Cursor+F13=View log)
   12:31:52 STRING TO SEND  --> SMAGPL/STRSMA ENV(SMADEFAULT) ANIMATE(*NO)
   01  MAIN                           OS/400 Main Menu]    
   02                                                               System:   S12
   03    Select one of the following:    
   04
   05       1. User tasks    
   06       2. Office tasks
   07       3. General system tasks    
   08       4. Files, libraries, and folders
   09       5. Programming    
   10       6. Communications
   11       7. Define or change the system    
   12       8. Problem handling]
   13       9. Display a menu    
   14      10. Information Assistant options
   15      11. iSeries Access tasks    
   16
   17      90. Sign off
   18
   19  Selection or command    
   20  ===\> SMAGPL/STRSMA ENV(SMADEFAULT) ANIMATE(*NO)
   21
   22  F3=Exit   F4=Prompt   F9=Retrieve   F12=Cancel   F13=Information Assistant    
   23  F23=Set initial menu
   24                                          (C) COPYRIGHT IBM CORP. 1980, 2003   
   12:32:15 ====================================================================
   12:32:17 Original Function Key:  {FK}
   12:32:17 FUNCTION TO SEND--> ENTER
   12:32:18 EXSR Scr:|SCRTWO| Lbl:|LBL2-1| Lvl:1
   12:32:19 Replacing token SCRTWO with value TESTTWO
   12:32:19 Replacing token LBL2-1 with value LABEL2-1
   12:32:19 Scr:TESTTWO Seq:20 Lbl:LABEL2-1 Lvl:2
   12:32:20 STRING TO SEND  --> SIGNOFF~FE'
   01  S1234567           i 5 / O S   L S A M   M A I N   M E N U              0/   More...
       1...5...10....5...20....5...30....5...40....5...50....5...60....5...70..74
```

If the String to send is longer than 48 characters, the log display will show as many String to send entries as necessary to show the entire sent string of data, in 48-character segments.
 
The log display shows only 74 characters of the screen format content at a time in order to allow room for the row numbers to be inserted to the left. Use function keys <**F20=Right**> and <**F19=Left**> to shift the display window in order to observe all of the display content. The column number header and footer will also shift with the display content. (Note that the other entry types appearing on the display that are not screen content do not shift left and right; they always remain fully visible.) The log data member content begins after the column heading line and it ends before the **More...Bottom** subfile indicator on line 22.

#### Analysis of Example Log Content

The example log data member display above is artificially long in order to illustrate many different types of possible log entries. The interactive screen dialog shown above is not real, though it resembles realistic possibilities.

The heading of the Operator replay display log screen includes information about the script that was executing. The header information continues until the top ruler line that shows column numbers. Included in the header line is the name of the data member (example value is O123456) which is stored in file OPRLOGF10. The Operator Replay Log control record stores the name of this member, and the data member contents are then made available for display and analysis using the function key tools on this log display. 

The yellow line labeled with timestamp 12:31:45 marks the end of the last previous screen format received by the Operator Replay execution program, at this point in the view of the log data. Following the yellow end-of-format marker line is a blue line indicating the ID of the first Script Step that will be used to respond to the current display format. The example shows that the original Script name of TESTSCRIPT is still the source of Steps to execute, the Step sequence number is 0035, there is no label assigned to this step, and there is no Script branching in effect at this point because the nesting level is still at 1 of the original script name.

The next few log entries in blue illustrate what happens when a Top Control String has been specified. The Top string is identified as starting in Row 1, Column 72, for a length of 8. The comparison rule is "EQ' (must be equal) and this Step is using Numeric string comparison rules (instead of character strings). The log shows what is found in the screen format at the specified location. In this example, an Operator Replay Token has been used in place of the actual comparison string value so the log entries show the Token replacement results, including what happens when a Numeric comparison rule is applied. Notice that although both the control string value and the found value include a letter, the letter is not part of the final comparison because only a compressed numeric string will be used for the Numeric comparison rule. The "Found number:" entry in the log reveals the actual numeric value that was used for the successful comparison.

After the Step is qualified by the Top Control String, the script driver program checks for any linked Capture Data rules, plus any associated Response Rules. This action resembles a human operator using their eyes to examine the display content and then deciding what would be the appropriate next action to take. Response Rules typically set Dynamic Variable values, whose {TOKENS} are replaced in supported Step master record fields before the script driver attempts to utilize the remaining definition of each step.

If there is a "CaptID:" entry appearing in the log, it is possible to put the screen cursor on this type of line and then press <**F13**> to branch to a view of the Captured Data (and Response Rules) Log entries in a different Agent log file. This permits the viewer to verify what actions were taken by the Capture and Response module before the Step actions were allowed to proceed.

After the step qualification and any Capture Data and Response Rules are completed, the Operator Replay script execution program delivers the String to send to the IBM i workstation manager. The log shows that the 24 lines of the same screen format are echoed back to the screen buffer (maintained in the execution program), but with the String to send characters inserted at the "OS/400 Main Menu" command line.

According to this example, the same Script Step, sequence number 0035, specified a Function (key) to send, but it used a Dynamic Variable token in the Function to send field. The log shows that the Operator Replay execution program translated  the token **{FK}** into an actual function key mnemonic value of **ENTER**. Then the script execution program sent the function key to the IBM i workstation manager.

But in this example, the Function to send was not the final instruction from Script Step 0035. While sending a function key tells the IBM i workstation manager that interaction with the last screen format is completed, the Operator Replay script execution program does not yet read for the next screen format that the workstation manager will display. Instead, there is a Script Branching instruction to execute, shown in pink.

The Script branching instruction was EXSR (execute subroutine), meaning that the Operator Replay script execution program was told to find another Script and start at the specified Step label, complete execution of that Script until its end, and then return to the next Step sequence in the original Script (TESTSCRIPT) at the Step after sequence number 0035.

The log shows that the EXSR branching operation used an Operator Replay Token for both the Branch-to Script and the Branch-to Label. The log shows the values found for each Token. After the Token variable replacement, the next log entry shows that the Operator Replay script execution program was able to find label LABEL2-1 within script TESTTWO, and that the named label value was found at Script Step 20 (probably not the first sequence number) in the target script. Now the Operator Replay script execution program is ready to execute that Step 20 in Script TESTTWO.

Even though the intention of an EXSR branching operation was that the Operator Replay script execution program should eventually return to the original Script name that started the job, the log shows that the Branch-to target Step had a String to send of the SIGNOFF command. This means that once this command is executed, the Operator Replay job will end. Perhaps the Top Control String processed previously was an intentional control value test of an optional Step, making it possible to abort the Script but with a normal end of job status because a SIGNOFF command will be requested.

One final important point illustrated in the String to send near the end of this log display is the sequence of characters that follow the SIGNOFF command. There is a tilde (~) character, followed by the letters FE followed by a backward accent (`) character. The two special characters surrounding the FE are the Operator Replay cursor control sequence identifiers, as recommended elsewhere in this topic. Inside of these two special characters, the letters FE represent keyboard key "field exit". In effect, this keyboard key typically causes the IBM i workstation manager to make sure that the input field is completely clear of other characters, following the SIGNOFF command. Using field exit after a String to send is a good practice, especially when using conditional Step execution or Script logic branching, because sometimes the screen format may contain other data already typed into the current input field, especially if an error is reported by IBM i after the failure of a command to execute.

The Operator Replay cursor movement control characters are specified in the Operator Replay configuration function (LSAM menu 4, option 7). The previous default standard for the IBM i LSAM was to use a pair of curly brackets { } as the cursor  movement control characters. However, since the LSAM introduced Dynamic Variables, the curly brackets have now been reserved for that special purpose. Therefore, if a Dynamic Variable will ever be used in an Operator Replay String to send (as  explained above), the cursor movement control characters must be different, otherwise the Operator Replay script execution program will mistake the Dynamic Variable Token as a cursor movement command. This is why SMA has now implemented the tilde and the backward accent as a default recommendation for the Operator Replay cursor movement control characters. The Operator Replay configuration function, discussed below, provides more explanation, including a description of an optional utility function that can be used to automatically convert cursor movement control characters in existing Operator Replay Scripts if it ever becomes necessary to change the control characters (such as when existing SMA clients upgrade the IBM i LSAM from a prior release and wish to convert to the new standard for the cursor movement control characters).

##### A Note About the STRSMA Command

The example above is an illustration of the command parameters for the STRSMA command. The example shows:

- The ANIMATE parameter has been set to (*NO), which in the past was important for avoiding a two-second delay that occured during the splash screen animation. 

:::note
Newer versions of the STRSMA splash screen no longer display animation, unless F5=Animate is pressed. The ANIMATE( ) keyword of this command is now ignored.
:::

- It does not show the requirement that the next sequential step in the script must be a simple ENTER function in order to bypass the LSAM sign on splash display and continue to the LSAM Master Menu.

- The SEND process: after a data entry sequence has been sent, the system performs a screen update to echo back the command text. This occurs before the LSAM Operator Replay function transmits the Function key that causes the system to act upon the previous String To Send.

Currently supported versions of the IBM i LSAM include another command called LSAMENU that can be used to directly access a given sub-menu within the IBM i LSAM menu system, bypassing the login splash display. This command can only be used by itself if the current job's library list includes the LSAM libraries. Otherwise, the command must be qualified with its library location, such as: SMAGPL/LSAMENU. When the LSAM library list is not in effect, it is required to specify the LSAM environment parameter for the LSAMENU command, for example: 
```
SMAGPL/LSAMENU ENV(SMADEFAULT)
```
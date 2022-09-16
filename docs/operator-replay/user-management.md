---
sidebar_label: 'User Management (Multi-Purpose)'
---
# User Management (Multi-Purpose)

User Management is the LSAM function that defines user profiles that are valid for use with Operator Replay scripts. (This maintenance also supports other LSAM operations, such as executing FTP jobs.) Any valid IBM i user profile may be used as long the user is granted all privileges needed to perform every step that is included in a script. Also make sure that the SMANET user profile is granted \*USE privilege for every user profile that is registered for Operator Replay, if user SMANET does not retain \*ALLOBJ authority.

## User Management for Operator Replay

For Operator Replay jobs, the user profile (user ID) that will be used is assigned by an LSAM maintenance function. This is required in order to be able to effectively store, protect, retrieve and enforce the appropriate password for each user profile. Within the OpCon user interface, the job master definition field for User ID is not used as the IBM i Script driver job User ID.  Instead, the Agent always assigns its powerful SMANET server user profile to the Script driver Job ID.  However, the OpCon job master User ID can be used for the Script User Name, as a last resort, if no User Name was registered with the Agent Script master record and the optional USERNAME( ) keyword does not follow the Script Name value that is entered in the OpCon job master Call command box.

For more information about managing the assignment of the User Name value for a Scipt job, refer to [Setting up an Operator Replay Script in the OpCon User Interface](./operations.md#setting-up-an-operator-replay-script-in-the-opcon-user-interface).

Unlike various other job types defined by the OpCon user interface, Operator Replay jobs use a different strategy to manage job user authority. Once an Operator Replay job has been started by the LSAM server programs under control of the LSAM's own, privileged user profile, SMANET, the Operator Replay script execution control program has been compiled to run with security officer authority. This permits the LSAM to retrieve and store job control data required for Operator Replay jobs. The user profile that was specified for the Script is not actually used until the point in processing where the Operator Replay control program is ready to emulate the Script user logging on to a virtual workstation. This approach allows the LSAM to have all the authority it needs to complete its assigned task while still restricting the authority of the  actual Script job user according to normal IBM i rules. The compiled control program authority allows Operator Replay to complete its functions even when the LSAM server user SMANET may be required to operate with restricted authority.

The authority of the Operator Replay Script User also applies to the virtual workstation that must be used for an Operator Replay job. The user profile assigned within the LSAM to the Script must have authority to use whichever virtual workstation will be assigned to the job that the LSAM's Operator Replay control job will start.  Refer to additional discussion of this topic under the section about [Managing Virtual Devices](./virtual-devices.md), where the optional Telnet exit program is described. The Telnet exit program is used for managing restrictions on which user can use a device, and for eliminating dependency on IBM i automatic creation of virtual display devices.

### LSAUSRR00 - User Management

#### Menu Pathways

Main Menu > Operator replay menu (#4) > Operator Replay user (#1)

#### Fields
- Position to User Name:   To quickly search for a particular user, enter the first characters of the user name, and then press <**Enter**>.
- Opt: <**Tab**> to a row in the table and type an option next to one or more user names, and press <**Enter**> to perform each option entered.
- User Name: The User Name specified does not have to exist when it is entered in the maintenance functions of this section, but it must be created as a valid IBM i user ID before it can be used by the LSAM.
- Description: A description that helps explain the identity and purpose of this user.

#### Options

- **2=Change**: Type 2 in the **Opt** field next to the User Name(s) to be changed and press <**Enter**> to proceed to the Change User window.
- **4=Delete**: Type 4 in the **Opt** field next to the User Name(s) to be deleted and press <**Enter**> to proceed to the Delete User confirmation window.
- **5=Display**: Type 5 in the **Opt** field next to the User Name(s) to be viewed and press <**Enter**> to proceed to a detailed view of each record. The detail record display shows the entire user name when the name length exceeds 30 characters.

#### Functions

- **F6=Add**: Press <**F6**> to proceed to the Add User screen.

## Add User Screen

### LSAUSRR00-1 - Add User

#### Menu Pathways

Main Menu > Operator replay menu (#4) > Operator Replay user (#1) > F6=Add

#### Options

None

#### Functions

- **F12=Cancel**: Quits the Add User window without adding new data to the system.

#### Fields

<**Tab**> to move from one field to the next. Observe the rules in the
Add User Fields table (below) as new data is typed.

### Add User Fields

| Parameter       | Default Value    | Required | Description      |
| -------         | ---------------  | -------- | -------          |
| User Name       | IBM i Name Rules (Refer to [IBM i Rules](../configuration/configuration.md#ibm_i_name_rules))| Y        |The User Name specified does not have to exist when it isentered in the maintenance functions of this section, but it must be created as a valid IBM i user ID before it can be used by the LSA.|
| | | |Long user names may be entered for other applications, such as an FTP transfer job, but the LSAM Operator Reply function is currently limited to User Names of only 10 characters in length. |
| Password        | IBM i Name Rules (Refer to [IBM i Rules](../configuration/configuration.md#ibm_i_name_rules)) | Y        | IBM i may be restricted to 10 Name characters as a user password. The first character must be alphabetic, and the remaining characters must be alphanumeric. |
| | | |**Note:** The LSAM supports passwords up to 128 characters. However, the password length must be limited to what will be accepted by either the current version of IBM i, or by the target system (as when a User is registered for an FTP transfer job).   |
| Password (to verify) | None             | Y        | Must be exactly the same as the original password entry above.           |
| Description     | None             | N        | A description that helps explain the identity and purpose of this user. SMA recommends providing this information.|
| Device Name     | None             | N        | When the user will be restricted by IBM i object authority to just one virtual display device, type the Device Name in this field. Leaving this field blank tells the Operator Replay script driver (and the optional Telnet exit program) That this user will rely on either (1) automatic virtual device creation, or (2) at least that one virtual display device is available for allocation to this user's job.|
| | | | Please refer to [Managing Virtual Devices](../operator-replay/virtual-devices.md) near the end of the Operator Replay Scripts section for more information about when to use this Device Name field.      |
| IP Address    | None             | N        | When a Device Name is specified, ths field is also required. The IP Address tells the LSAM Telnet exit program which device name to specify as the Script driver job is connecting to the Telnet server.          |
| | | | SMA recommends configuring IP addresses with the Interface type of *LOOPBACK, since this type of Interface does not require a line description object. However, any valid IP address value that is configured in the partition can be used, as long as it is understood that there is a one-to-one relationship between the IP Address and a Device Name.  Specifying an external IP address or even an inter-system virtual LAN IP Address would restrict Operator Replay jobs to serial (one at a time) execution, since the virtual device can only be used for one job at a time. |
| | | | Please refer to [Managing Virtual Devices](../operator-replay/virtual-devices.md) near the end of the Operator Replay Scripts section for more information about when to use this IP Address field.   |

## Change User Screen

### LSAUSRR00-1 - Change User

#### Menu Pathways

Main Menu > Operator replay menu (#4) > Operator Replay user (#1) > Option 2

#### Options

None

#### Functions

- **F3=Exit**: Quits the Add User screen without adding new data to the system. Returns to LSAM menu.
- **F12=Cancel**: Quits the Add User screen without adding new data to the system. Returns to user list.

#### Fields

Refer to the Fields table for Add User. Change User does not allow changing the User Name. To change a user, first delete the original record then add a new record.

## Delete User Screen

### LSAUSRR00-2 - Delete User

##### Menu Pathways

Main Menu > Operator replay menu (#4) > Operator Replay user (#1) > option 4

#### Fields

Output-only fields identify each user record that is deleted from the LSAM database.

Column
- User Name:     First 30 characters of User Name to be deleted from LSAM register.
- Description:   Description within LSAM of user profile.

#### Options

None

#### Functions

- **F3=Exit**: Quits the Delete User screen without deleting any records. Returns to LSAM menu.
- **F12=Cancel**: Quits the Delete User screen without deleting any records. Returns to list of users.

## Display User Screen

### LSAUSRR00-2 - Display User

#### Menu Pathways

Main Menu > Operator replay menu (#4) > Operator Replay user (#1) > Option 5

#### Functions

- **F3=Exit**: Quits the Display User screen and returns to LSAM menu.
- **F12=Cancel**: Quits the Display User screen and returns to list of users.

#### Fields

Up to the full 128 characters are displayed for the User Name.

## User Management for Other LSAM Applications

The LSAM User Management function is shared by the LSAM to support FTP jobs submitted by OpCon. FTP jobs are IBM i jobs with a job sub-type of FTP. The OpCon User Interface supports a special job configuration tab with unique fields that help define how the IBM i native ftp (file transfer protocol) feature may be used in a batch job.

There are two user profiles associated with these IBM i FTP jobs. First is the IBM i job user profile. This user profile is specified in the OpCon User Interface under the Job Information tab, in the User ID field. This user profile is only used to execute the batch job under IBM i that will drive the FTP transfer process. The job user profile is the same for FTP jobs as for any IBM i batch job.

The other user profile require for the FTP job sub-type is specified under the Call Information tab of the FTP job, under the sub-tab named Transfer Information. The field name is FTP User. The FTP User may be any length up to 128 characters. This user name must be registered in the LSAM database, using the user Management function, so that the LSAM job scheduler server can find the encrypted FTP user password that has been stored in an LSAM validation list.

:::tip
The OpCon User Interface job master field for the FTP user supports selection of a user name from the existing list of registered OpCon users. However, the FTP user field also allows keying in of unregistered names. The registration of a user profile for OpCon is unrelated to the requirement that the FTP user must be registered in the LSAM database.
:::

When registering a user name in the LSAM User Management function, the user profile does not have to exist under IBM i. Any user name and password that may be valid on the FTP target machine may be registered. For example, if a file is being transferred to or from a Microsoft Windows computer, the Windows user profile and password must be registered so that the LSAM-managed FTP job can successfully log on to Windows before the file transfer starts.

### Length of User IDs and Passwords

The LSAM User Management function permits entry of User Names and Passwords that are up to 128 characters long. However, the LSAM Operator Replay feature that relies on this User Management function can only use 10 characters for a User Name.

The IBM i operating system may be configured to restrict passwords to only 10 characters, or it may allow a longer password value. The LSAM Operator Replay function is able to adapt to any permissible length, up to 128 characters. However, if the IBM i operating system restricts the password length, then the password registered for an Operator Replay script user must also conform to this restriction.

Some operating systems support longer user IDs and passwords. The IBM i LSAM is able to supply up to 128 characters for either or both the User Name and the Password, as when an FTP job is logging into a remote system that is not IBM i, in order to start the file transfer process.

:::tip
Please study the advice about supported User Name and Password lengths, per application, that is displayed on the Create/Change maintenance display for the Agent's User Management function.
:::
---
sidebar_label: 'Managing Virtual Devices'
---

# Managing Virtual Devices

## Introduction to Operator Replay Virtual Devices

The IBM i LSAM Operator Replay function uses the IBM i Telnet server facility to access a virtual workstation and emulate the functions of an interactive user. Default system values and features of IBM i can make it easy to automatically configure and use virtual workstations. This type of device is used for IBM i workstation pass-through functions (between two systems) and it is also used to support the IBM i Access Client Solutions display feature (enabling a personal computer to emulate an IBM i workstation).

By default, the IBM i Telnet server listens at the well-known TCP/IP port number 23. Typically, the IBM i system value QUAUTOCFG is set on, supporting automatic creation of virtual devices as necessary, up to the maximum number of devices set in the QAUTOVRT system value. SMA's IBM i LSAM is installed with default values that match this configuration of IBM i.

The management of virtual display devices operates independently from the optional application of TLS Security to the connection between the Script Driver program and the IBM i Telnet Server. Any supported mode of virtual device selection will work with or without TLS Security engaged.

The IBM i LSAM menu options for configuring Operator Replay features refer to their support for automatic creation of virtual devices as the "Mode 1" method of managing virtual devices. Mode 1, in general, is the passive mode that supports relying on IBM i to select and assign a virtual display device. This is the initial default configuration for Operator Replay management of virtual display devices.

However, IBM i system administrators may often wish to strengthen the security of their system. For example, the Telnet server can be changed to listen at a different port number. Another strategy for improving security is to restrict the ability of system users to acquire automatically created virtual devices. The LSAM Operator Replay facility can adapt to these changes in IBM i configuration, using the methods described in this section.

The IBM i LSAM menu options for configuring Operator Replay features support four methods for managing virtual devices when automatic creation has been disabled. These methods are referred to as "Modes" that are explained below. All of these different modes depend on manually creating virtual display devices, or letting the system automatically create a limited number of virtual devices and then disabling virtual device creation. There are other strategies that are compatible with one of the four LSAM virtual device management modes.

:::tip
Three modes of virtual device management require the IBM i Telnet exit program. SMA technologies recognizes that its clients may already have a Telnet Exit program registered in their IBM i partition(s). Use the IBM i command WRKREGINF to examine the exit point named QIBM-QTG-DEVINIT. If there is already an exist program registered, please contact SMA Support for assistance. SMA Technologies recommends that we collaborate with the producer of the other Telnet Exit program to determine how the features required by the OpCon Agent for IBM i can be merged with other Telnet security routines that the client is already using. For example, the IBM i LSAM Telnet Exit Program logic can be implemented as a sub-program, sub-procedure, module or service program, delivering a specific device name to the third-party Telnet exit program.
:::

## Overview of Virtual Display Device and Telnet Server Management

The Agent supports multiple strategies for managing the virtual display device that will be used for any given Script execution. The strategy chosen from the four available options will affect, somewhat, the behavior of the entire IBM i partition with regard to the Telnet server and the management and use of virtual display devices. Even so, it may be possible to choose different virtual display device options for separate LSAM environments that reside within the same partition, such as when one copy of the LSAM software is used for testing, while the SMADEFAULT environment is used for OpCon control over the live production work.

Preparing the partition for any of the four virtual display device options may involve any of the following steps. Each of these steps is explained in more detail in the following topics. The following topics are not presented in the exact order of this list because there are different perspectives on how the partition might be configured, and each requires a different discussion. But once the topical discussions have been considered, the list presented here can serve as a check list to be sure that all the elements required for a working configuration have been considered.

1. Use Operator Replay Configuration (LSAM sub-menu 4, option 7) to specify the IP address, Telnet server options and the virtual device control option.

    a.  The Telnet Server port might be changed in some partitions, often as a simple additional measure to secure the partition against hacking.

2. Configure one or more virtual display device descriptions, by name.

    a.  Virtual display devices can be configured manually or automatically, as explained below.

    b.  Device description object authority is an important system security measure that should be considered, including the advice offered below.

3. Configure one or more *LOOPBACK IP address Interfaces (no linedescription is needed when using loopback IP addresses).

4. Optionally, use the F23 function from the Operator Replay Configuration to cause a single device description and LOOPBACK interface to be created. Also optionally, this same display can be used to activate or deactivate the device and the interface.

5. Use the LSAM User Management function (LSAM sub-menu 4, option 1) to assign a virtual display device and a *LOOPBACK IP address to one or more User Profiles.

6. From the Operator Replay Configuration main display pages (1 or 2), use function key F22 to configure and then register the Agent's Telnet Exit program.

:::warning
Expect a short interruption and disconnect of all Telnet-based devices (printers and most display devices, except for the designated partition console display) while the system Telnet Server is stopped and restarted. This suspension of Telnet services is required to activate any change (Add or Remove) to the registered Telnet Exit Program. Although the Agent's exit program activation function is designed to automatically restore Telnet services after the activation has completed, SMA recommends using the partition's console device to perform this action, since the console device will NOT be suspended when the Telnet server is suspended.
:::

When performing the configuration steps above, consider how the following list of Operator Replay job control parameters may apply. Various job control profiles are supported, making Operator Replay script jobs more adaptable to varying system security requirements.

## Operator Replay Job Control Parameters

These are the options to be considered when defining Operator Replay script execution jobs. These parameters are grouped into the following separate topics:

- Control of virtual device selection
  - Device name
  - IP Address
  - Job user name, as it applies to virtual device selection

- Managing the Job user name

  - The rules for managing the script job user name have been enhanced starting with the LSAM version 18.1, in order to better comply with OpCon batch job user rules. However, previously configured script jobs should still execute as before.

- Managing the name of the Script that will execute

### Virtual Display Device Name

There are four methods that can be used to control the virtual display device that will be selected as the Operator Replay script driver program (submitted by OpCon as an IBM i bach job) initiates the separate interactive job where the script steps will be performed.

- MODE 1 (\*DFT) Rely on IBM i automatic or user creation of virtual devices.
  - This was the original and only way that virtual display devices were supported by earlier versions of the IBM i Agent, based on the settings of the system values QAUTOCFG and QAUTOVRT, and/or on user configuration of virtual display devices. This mode is still supported by default, but more secure options are available.
- MODE 2 (\*CTL) Specify a single IP address and device name in Operator Replay Configuration.
- MODE 3 (\*USER) LSAM User Management assigns the Device Name and an associated IP address.
- MODE 4 (\*CMD) Device Name and IP address are specified at run-time in the Script name box of the OpCon job master record.
  - Manual execution of test jobs can use the additional command parameters DEVICE( ) and IPADDR( ) of the expanded STROPRRPY command, when *CMD Mode 4 is allowed.

Modes 2, 3 and 4 require that the Agent's Telnet Exit Program be added to the system exit point registry. Modifying the registration of the exit program requires that the system's Telnet Server be briefly stopped and restarted. Stopping the Telnet Server will cause virtual devices to be temporarily disconnected from the system. But using the Agent's function to register and activate the exit program will automatically restart the Telnet Server, and then it is only necessary to manually reconnect or reactivate virtual devices such as displays and (virtual) printers.

The Modes 3 and/or 4 can be used separately, or they can be mixed by typing both values (\*USER \*CMD) into the Telnet Device Name field of the Operator Replay Configuration screen.

### IP Address Specification

The IP Address used to connect the script driver program to a virtual display device is controlled in parallel with the four Modes of virtual display device selection.  IP addresses can be registered in the Operator Replay Configuration data or in the User Management menu function, depending on which Mode of operation is selected.

### Job User Name for Device Selection

For device Mode 3 (*USER) the User Name will determine the Device Name and the IP address. Mode 3 requires that there will be a 1-1-1 relationship among User Name, Device Name and IP Address, and each value can be used only once within the User Management function.

### Interactive Job User Name

All user profiles for Operator Replay jobs must be registered in the Agent's User Management.

The actual interactive job user name chosen by Operator Replay when logging into a virtual workstation is determined according to the following decision table:                                
  1.  A USERNAME( ) parameter included in the OpCon job master Script name field overrides any other source of a User Name.
  2.  If Script master record in the Agent's database specifies User, that is second priority.  But this value can be set to "\*JOB" which points to the OpCon job master record's batch job User ID.
  3.  If neither of the previous sources are provided, the Agent will assign the OpCon batch Job User ID.

Every method of specifying the interactive job's User Name requires that the user name be registered in the Agent's User Management menu function (LSAM sub-menu 4, option 1) because this is where the required IBM i Password value is recorded.  (Passwords are stored in an encypted IBM i Validation List.)

The user name can also be specified in the OpCon job master record by adding the USRNAME( ) parameter to the Script name box, following the Script name and at least one space character. This method overrides the other options for specifying the Job User Name.

When the OpCon batch job User ID will be used as the Script's User Name, that User Name must be registered in OpCon as a Batch User with permission to use the IBM i machine in which the Script job will execute. This is the same rule as applies to general IBM i Batch Jobs.

A former restriction that multiple Scripts in a single job must have the same User Name is removed. This makes it possible to build utility sub-scripts in the Agent's script master file that can be called by any Operator Replay job's User Name. If there is a User Name assigned to a sub-script, it will be ignored by the newer versions of the Agent software. However, SMA recommends that these sub-scripts should be assigned a User Name of "*JOB" as the preferred standard.

### Script Name

The Script Name is specified either by itself in an OpCon job master record, or it is specified as the first parameter of the STROPRRPY command by test jobs that are started manually, outside of the control of the OpCon application server.

When Operator Replay jobs are started by OpCon, the Script Name can be an OpCon Property token, or it can be an IBM i Agent Dynamic Variable token.

The Script name box also supports the following optional parameters which can be added in any order, with a space character folliwng the Script name and also placed before each addition parameter:
 - USERNAME( ): Optionally overrides other Agent methods for designating the IBM i User ID used to log into an interactive virtual workstation.
 - DEVICE( ): Optionally overrides other methods for specifying the virtual workstation device.  This optional parameter cannot be used with the Mode 1 method for designating virtual devices, since it requires use of the Agent's Telnet Exit Program.
 - IPADDR( ): Optionally override other supported methods for associating an IP Address with a User Name that is registered in the Agent's User Management function. This optional parameter cannot be used with the Mode 1 method for designating virtual devices, since it requires use of the Agent's Telnet Exit Program.

## Managing the Telnet Server and Its Port Number

The IBM i LSAM Operator Replay feature requires the support of the IBM i Telnet server. It is required to follow IBM instructions for configuring and starting both the IBM i TCP/IP services, in general, and the Telnet server specifically.

If the IBM i Telnet server has been assigned to a different port number, instead of the well-known port number 23, the LSAM Operator Replay Configuration function must be used to change the port number registered for Operator Replay.

It is not necessary to stop and restart the IBM i LSAM server facility for this change to take effect. Each time the LSAM starts a new Operator Replay control job, the new job will check the LSAM Parameters control file to find the correct Telnet port number.

However, depending on the Operator Replay Virtual Device Control Mode chosen (from four options listed in this documentation section), it might be necessary to briefly stop and restart the Telnet Server. This would be required only if the Agent's Telnet Exit Program is being activated or deactivated.

## Using Operator Replay Without Automatic Virtual Devices

The IBM i LSAM Operator Replay facility requires the use of a virtual display device to emulate an interactive user's job. However, IBM i system administrators may have chosen to disable automatic creation of virtual devices as a measure to improve system security.

If the IBM i support for automatic creation of virtual devices has been disabled, it is required that at least one virtual device be created manually for use by Operator Replay, according to IBM instructions. There are various strategies that may be used to support virtual devices without having them automatically created. This document describes strategies for enabling Operator Replay scripting while still complying with strict security measures.

The following steps and options are considered. Additional information about IBM i commands and virtual device management can be found using the web-based IBM i documentation at [IBM Documentation](https://www.ibm.com/docs/en/i/7.2). Change the number of the IBM i version referenced by this link, using the heading controls at the web page, to match the site's current operating system level.

- Preventing automatic creation of virtual devices 
- Manually creating virtual control units and display devices 
- Implementing the four LSAM Modes of virtual device management for Operator Replay

There are additional ways that virtual devices can be utilized by Operator Replay that are not discussed in detail here. One suggestion might be to leave the LSAM Operator Replay configured for its default Mode 1, which anticipates automatic virtual device creation, but then disabling IBM i automatic device creation. This could be implemented by manually creating enough virtual devices to accommodate the anticipated workload of concurrently executing Operator Replay scripts, but restricting authority to use the virtual devices to only the Operator Replay User Name(s) required for Script execution.

### Preventing Automatic Creation of Virtual Devices

To prevent virtual terminals from being created automatically, set the QAUTOCFG system value to 0 as follows:
```
CHGSYSVAL SYSVAL(QAUTOCFG) VALUE(0)
```
Automatic creation of virtual devices can also be prevented by setting the QAUTOVRT system value to 0 as follows:
```
CHGSYSVAL SYSVAL(QAUTOVRT) VALUE(0)
```
Disabling these automatic creation options does not prevent manual creation of virtual devices. It also does not cause the system to automatically delete any existing virtual device descriptions.

:::tip
Changing these system values can affect other IBM i products and programs that may sometimes require automatic configuration. This includes TELNET, 5250 display station pass-through, and any other programs using the virtual terminal APIs.
:::

### Manually Creating Virtual Controllers and Devices

Virtual controllers and devices (display) can be created manually to control the number of sign-on attempts possible by not allowing automatic configuration of virtual terminals (which allows additional sign-on attempts to occur).

:::tip
An easy way to create virtual controller and device descriptions is to let the system do it. Enable automatic device configuration by setting or leaving set the system values QAUTOCFG to a value of 1 and QAUTOVRT to any value greater than 0. Then use a function such as an Operator Replay job or an IBM i Access Client Solutions display emulator to cause the system to create at least one virtual controller and device. (In this case, the first device created would be named QPADEV0001.) After the controller and device are created, disable automatic creation as described above, and then proceed to the next steps below that describe how to manage virtual device authority. Note that the system may already have been configured and used for automatic virtual device creation, in which case there will already be a controller and one or more virtual devices created in the system. In this case, it is possible to delete one or more of the virtual devices (after setting them to a varied off state), to limit the number of concurrent virtual device sessions that the system will support. It is also possible to manage the IBM i object authority of the device description objects to allow only authorized user profiles to acquire any given virtual device.
:::

To manually create virtual devices for Operator Replay do the following:

1. Use the Create Controller Description (Virtual Work Station) "CRTCTLVWS" command to create a controller description for a virtual terminal.
```
CRTCTLVWS CTLD(QPACTL01) ONLINE(*YES)
TEXT('Virtual Controller for virtual terminals')
```
:::tip
The IBM i naming convention QPACTLnn must be used for naming virtual controllers, where nn is a decimal number starting at 01.
:::
2. Use the Create Device Description (Display) "CRTDEVDSP" command to create a virtual terminal as follows:

```
CRTDEVDSP DEVD(LSAOPRRPY) DEVCLS(*VRT) TYPE(V100) MODEL(*ASCII) 
EMLDEV(*TYPE) ONLINE(*YES) CTL(QPACTL01)
TEXT('SMA LSAM virtual device for Operator Replay')
```
:::tip
IBM recommends using the IBM i naming convention, QPADEVxxxx, for naming virtual device descriptions, where xxxx are alphanumeric characters from 0000 to ZZZZ. In the example above the device parameter conforming to this rule would be: DEVD(QPADEV0001)

This approach makes it easier to manage virtual devices, and it also enables the system to be easily switched back and forth between allowing or disabling virtual devices. However, as shown in the example above, a user-defined name may be used for one or more virtual devices.
:::

The ONLINE(*YES) parameter in each of the commands above tells the IBM i licensed program toautomatically vary on the controller and terminal that is created whenever the operating system is started.

Create or retain at least as many virtual device descriptions as the number of concurrent Operator Replay jobs expected to execute at any one time. If there are not sufficient virtual devices available for multiple concurrent Operator Replay jobs, the subsequent Operator Replay jobs will fail with LSAM Operator Replay error code SMA0106 (indicating a timeout while waiting for the system to respond to a request to connect).

### Managing Virtual Device Authority

After creating the descriptions, authorize the server program to use them. This is done by granting authority to the user profile named QTCP. Use the Grant Object Authority (GRTOBJAUT) command to authorize the user profile used by the server program to the descriptions. This can be done using the following commands:
```
GRTOBJAUT OBJ(QPACTL01) OBJTYPE(*CTLD)
AUT(*CHANGE) USER(QTCP)
```
```
GRTOBJAUT OBJ(LSAOPRRPY) OBJTYPE(*DEVD)
AUT(*CHANGE) USER(QTCP)
```
**- or -**
```
GRTOBJAUT OBJ(QPADEV0001) OBJTYPE(*DEVD)
AUT(*CHANGE) USER(QTCP)
```

It is also possible to restrict access to the system by revoking public authority and replacing it with authority granted only to specific users. In this case, authority must be granted to each user profile that has been registered as the User for an Operator Replay Script.

It may not be necessary to revoke public authority to the virtual controller, since user access can easily be controlled at the device level. It will be easier to return later to automatic creation of virtual devices if public authority is not revoked.

When revoking public authority and granting private authorities, be sure to have identified every virtual device that should be retained in the system. It would be necessary to discover and manage automatically created devices if the system was previously configured to allow automatic virtual device creation. Virtual devices that were automatically created can be listed using the following command:
```
WRKOBJ OBJ(QSYS/QPADEV*) OBJTYPE(*DEVD)
```
For each virtual device identified, the following two commands will revoke public authority and grant the private authority required for an Operator Replay Script user (represented by the value "RPYUSER" in these examples):
```
RVKOBJAUT OBJ(QSYS/LASOPRRPY) OBJTYPE(*DEVD) USER(*PUBLIC) AUT(*ALL)
```
```
GRTOBJAUT OBJ(QPADEV0001) OBJTYPE(*DEVD) AUT(*CHANGE) USER(RPYUSER)
```
The GRTOBJAUT command must be repeated for each user registered as an Operator Replay Script user.

### Preparing Virtual Devices for Use

After a normal IPL, the virtual controller and device(s) would be automatically varied on, ready for use, if the ONLINE parameter was set or left at the default value of (*ON) in the create commands above. However, after manually creating these devices, it would be necessary to manually vary them on to use them immediately. This can be done from the displays offered by the WRKCFGSTS command (refer to IBM documentation), or by using the following manually entered commands:
```
VRYCFG CFGOBJ(QPACTL01) CFGTYPE(*CTL) STATUS(*ON)
```
```
VRYCFG CFGOBJ(LSAOPRRPY) CFGTYPE(*DEV) STATUS(*ON)
```
## Configuring Operator Replay Device, Interface and Telnet Exit

Consider the following Agent display formats and instructions, which include excerpts from the F1=Help text available for these displays, to understand the ways the Agent control file maintenance functions and tools can be used to configure the different supported modes of virtual display device control.

### Operator Replay Configuration Menu Function

Operator Replay Configuration is access from the LSAM sub-menu 4, option 7. The following display format example illustrates where the choice is made among the four available virtual display device management modes.

#### Figure: LSAM sub-menu 4, menu option 7
```
OPRRPYD301               Operator Replay Configuration      00/00/00  00:00:00
USERNAME      LSAM: SMADEFAULT  Vers: 18.1.112    Telnet exit env: SMADEFAULT

TCP/IP and Device configuration
Telnet device: MODE 1 = *DFT (QAUTOCFG)  MODE 2 = *CTL (IP Addr + DevNam)
               MODE 3 = *USER            MODE 4 = *CMD                            |
NOTE: MODEs 2-4 require Telnet Exit Pgm and stop/restart Telnet server. See F1.
 IP Address (See F1, F23) :  127.0.0.2____________________________________ (F4)
 Telnet port number  . . . : 00023       TLS security?: N  Y=yes, N=no
 Telnet device name  . . . : MYVRTDEV01  NAME, *USER+/*CMD,blank=QAUTOCFG. (F1)
 Telnet device exit pgm nbr: 2147483443  required for MODE 2,3,4    (F13=Unlock)

 . . .

 F1=Telnet instructions  F5=Refresh  F3/F12=Cancel  F24=More keys  PageDown
      - or -                                                      
 F22=SMATELSVR manage exit pgm   F23=CFG DEV & IP   F24=More keys  PageDown
```

Press F22 to manage the Telnet Exit Program status, if needed for Modes 2, 3 or 4. 

In addition to this document, see the Operator Replay-User Management function (LSAM sub-menu 4, option 1) for IP Address instructions displayed when pressing "F1=Dev/IpAddr instructions".  From that display there is also prompted help for creating device descriptions and IP addresses when pressing "F23=CFG DEV & IP".

SMA recommends using the *LOOPBACK Interface Definition to assign IP addresses within the IBM i partition for use with Operator Replay automation of green screen interaction. Loopback addresses do not require creating a line description, but only to add and activate an Interface using the CFGTCP command or the System i Navigator. The OpCon IBM i Agent - Operator Replay - User Management provides the F23 function key to access a convenient prompting screen where the IP Address Interface can be created by this Agent's programs.

### Choosing and Configuring Operator Replay Virtual Device Modes

The LSAM's Operator Replay feature can be configured to cooperate with the virtual display device strategy that has been implemented by the procedures described above. There are four modes of virtual device management supported by Operator Replay. But keep in mind that there are more than four possible device management strategies. For assistance with deciding how to use these modes, please contact SMA Support.

Among the four modes of virtual display device management, all but Mode 1 require the use of the Telnet Exit Program that is provided with the OpCon IBM i LSAM software. Additional Operator Replay configuration steps are required to activate the Telnet Exit Program, as described below.

These are the Modes of Operator Replay virtual display device management. The configuration requirements for each mode are discussed below. This is a summary of what each mode implies.

- Mode 1 (\*DFT): Operator Replay assumes that the IBM i system will automatically allocate virtual display devices, either because automatic virtual device creation is enabled (per system values QAUTOCFG and QAUTOVRT) or because a sufficient number of virtual display devices was created manually in advance. This mode relies entirely on the IBM i system to select and allocate virtual devices. It does not use the Agent's Telnet Exit program.

- Mode 2 (\*CTL): Useful when there will be low-volume activity for Operator Replay scripts, a single Device Name and IP Address can be registered using the Operator Replay Configuration menu option. This Mode can support security restrictions if the named device description has its object authority limited to only Operator Replay script users. But it limits Operator Replay script execution to serial mode, since the single display device can only be used for one script job at a time.

- Mode 3 (\*USER): This mode supports multiple virtual devices that are each restricted to a specific User Profile and IP Address. The LSAM User Management master file is used to register these relationships and to provide the Telnet connection parameters at run time. This profile of assigning one device to each user reflects a parallel management of the IBM i object authority for each device description. By this means, Operator Replay is configured to cooperate with the site-specific strategy for virtual device security. See additional detail about how to configure this Mode in the instructions below.

- Mode 4 (\*CMD): This mode resembles Mode 3, but by utilizing command line parameters to specify the Device Name and IP Address it is possible to eliminate the restricted association of devices to user names. This mode enables more flexibility for executing parallel Operator Replay scripts that all require the same user profile, by allowing the same user name to start jobs on multiple different virtual display devices. It would be possible to enable parallel processing of scripts using Mode 1, but the *CMD mode might better support unique site restrictions on which virtual display devices can be used for Operator Replay operations, yet without the 1-1-1 constraints on User-Device-IPAddress imposed by *USER Mode 3.

Configuring the IBM i LSAM for any of these modes requires using two LSAM menu options to maintain:
 - the User Management master file and 
 - the Operator Replay Configuration options. 
 
The LSAM User Management function (LSAM sub-menu 4, option 1) is used for User Profile and secure Password registration. The User Management master file is also utilized by other LSAM features. But for Operator Replay virtual device management Mode 3, this master file supports additional data fields that extend its function to include a table of User, Device Name and IP Address associations. 

When performing the following LSAM configuration tasks, both User Management and Operator Replay Configuration support using **F1=Help** to display a summary reminder of the rules and requirements for implementing the three non-default Modes of virtual device management.

### Configuration for Mode 1 (*DFT)

Choose Mode 1 when depending on the IBM i system to choose and assign virtual display devices to the script driver program, as it requests access to the system's Telnet service.

Telnet Exit Program:

- The Telnet Exit program should be disabled for this mode since it does not provide any support for Mode 1, and the Operator Replay request to use a virtual workstation would present a blank workstation name to the exit program, which has the same result as if there was no exit program.

User Management:

- Do not specify any Device Name or LOOPBACK IP Address for the script users.

Operator Replay Configuration:

- IP Address = enter the address that will be used to request a virtual display device. SMA recommends using a LOOPBACK IP address, since it does not require a line description.
- Telnet port number = match the system value setting.

### Configuration for Mode 2 (*CTL)

Choose Mode 2 to improve virtual device security, but only in systems where Operator Replay scripting will be seldom used, and scripts do not have to execute concurrently. The single virtual display device forces scripts to be executed serially, since the display device cannot be share by multiple script driver jobs. This Mode enables system security by replacing automatic virtual device dependency with a single device name. The device can be further secured by revoking public authority to use the device and granting \*CHANGE authority to only those user profiles that will be designated for Operator Replay Script jobs.

Telnet Exit Program:

- The Telnet Exit program must be configured and activated to use Mode 2.

User Management:

- Do not specify any Device Name or LOOPBACK IP Address for the script users.

Operator Replay Configuration:

- IP Address = enter the address that will be used to request a virtual display device. SMA recommends using a LOOPBACK IP address, since it does not require a line description.

- Telnet port number = match the system value setting.

- Telnet device name = enter the name of a pre-configured virtual display device. (See instructions above about how to create and authorize a virtual display device.)

Function key F23 from Operator Replay Configuration can be used as a convenient way to define and execute the IBM i commands for creating and enabling the virtual display device and the LOOPBACK IP Address Interface.

### Configuration for Mode 3 (*USER)

Choose Mode 3 to enable virtual device security in environments that require multiple different user profiles each assigned to their own secured virtual workstation (such as a service bureau that is operating multiple copies of software applications with different databases inside of a single IBM i partition).

Operator Replay Mode 3 is designed to cooperate with a system-wide security method that restricts each display device description to be used by only one user profile. This is not necessary for the Operator Replay Mode 3 configuration to work, but that was the original purpose of supporting Mode 3.

When device descriptions should be restricted to just one user, it is the site administrator's responsibility to set the IBM i object authority values for each virtual display device description. This LSAM software, while it can help with creating virtual display device description objects, does not actually set the object authority. One way to manage the device object authority is to use the IBM i command WRKOBJ for each device description stored in the QSYS library, and then select option 2 to change the authority. After the authority is set, this LSAM Operator Replay Configuration Mode 3 strategy is used to guide the Operator Replay script driver to  cooperate with the device object authorities.

Telnet Exit Program:

- The Telnet Exit program must be configured and activated to use Mode 3.

User Management:

- Device Name = specify the name of a pre-configured virtual display device that will be secured for use only by this User Profile.
- LOOPBACK IP Address = specify a unique IP Address for each different User + Device combination. The IP Address + Device Name + User Name are tightly associated in a 1-to-1-to-1 relationship and each value cannot be also assigned to any others.

Operator Replay Configuration:

- IP Address = this field value is ignored when Mode 3 is in effect.
- Telnet port number = match the system value setting.
- Telnet device name = must be set to '\*USER' to tell the Operator Replay functions and the Telnet Exit program to use the LSAM User Management master file to obtain and assign a virtual display device name and its associated IP address.

Function key F23 from User Management can be used as a convenient way to define and execute the IBM i commands for creating and enabling the virtual display devices and the LOOPBACK IP Address Interfaces. 

For convenient access to the native IBM i commands required to configure the operating system support for the IP address and device name, use these function keys from the Add, Change or Display User screen:

- F19=WRKCFGSTS \*DEV (to manage virtual display devices)
- F20=WRKTCPSTS \*IFC (to manage TCP/IP Interface LOOPBACK definitions)

It is possible to enter both \*USER and \*CMD in the Telnet Device Name field if it is desired to allow a Command Line option to override the User Management configuration as an exception. But a successful connection to a virtual workstation will only be achieved if all the rules are met for either the \*USER or \*CMD mode.

### Configuration for Mode 4 (*CMD)

Choose Mode 4 to enable virtual device selection by the optional parameters of the STROPRRPY command. This is the same command that is used internally by the IBM i Agent to execute an OpCon job for IBM i that specifies the job sub-type of Operator Replay.

The \*CMD Mode 4 of operation allows that the DEVICE( ) and/or IPADDR( ) keywords from the Agent's STROPRRPY command can be added after the name of the Script that will be executed. To use these keywords in the OpCon job, be sure that the Agent's Operator Replay Configuration has specified \*CMD in the Configuration Telnet Device Name field (either by itself, or optionally along with the \*USER mode). If the Agent does not allow the *CMD mode, then any parameters added after the OpCon job's
Script name will be ignored.

One strategy that could be enabled by the \*CMD Mode 4 would be to insert OpCon Property tokens inside either the DEVICE( ) or the IPADDR( ) command parameters. This strategy assumes that the selection of a device or an IP address would be made by some flexible logic elsewhere with the network that the OpCon server controls, prior to the start of the Operator Replay job. The OpCon SAM server will replace those Property tokens before it sends the job start request to the Agent.

When both the \*CMD and \*USER mode are allowed by the Agent's Operator Replay Configuration settings, then the \*USER parameters will be retrieved first. After that, either or both (or none) of the DEVICE( ) and/or IPADDR( ) command keywords could be added after the OpCon job's Script name in order to override the \*USER configuration at run time for just the one job.

Telnet Exit Program:

- The Telnet Exit program must be configured and activated to use Mode 4.

User Management:

- User Management configuration is ignored when only \*CMD Mode 4 is allowed by the Agent.
- However, if the Agent allows both \*CMD and \*USER modes, then review the requirements for Mode 3, described above.

Operator Replay Configuration:

- IP Address = this field value is ignored when Mode 4 is in effect.
  - The IP address should be specified by the IPADDR( ) added after the Script name in the OpCon job master record.
- Telnet port number = match the system value setting.
- Telnet device name = must be set to '\*CMD' to tell the Operator Replay functions and the Telnet Exit program to store the OpCon command line DEVICE and IPADDR options into a special temporary master record stored in the Agent's User Management master file.

When configuring an Operator Replay job in an OpCon job master record, first type the Script name into the command line box that is labeled "Script" and then type the special separate character that is set in the LSAM global Configuration options (LSAM Main menu, option 7). The default value for the separator character is a pipe (or vertical bar). After the separator, type each command keyword and include a value, as illustrated in the following example.

:::info Example
Set the OpCon IBM i job sub-type to "Operator Replay."

The command line entry box label changes to "Script."

Inside the Script box, type the Script name, followed by at least one space character, and then
either or both of the STROPRRPY command parameters as shown in this example:
```
MYSCRIPT DEVICE(DSP02) IPADDR('127.0.0.2')
```

**NOTE**: When the Agent's Operator Replay Configuration mode is 4, allowing only the \*CMD
option, then BOTH of the parameters are required. If either parameter is missing, the script job will
likely fail. The only time that a single parameter is allowed here is when both \*USER and \*CMD
modes are allowed. In that case, the \*USER data will be selected unless there is one of the parameters
shown above included in the Script box, which means that the Script box value is overriding
the \*USER configuration.

:::

The command line DEVICE and IPADDR parameters provided by the OpCon job start request (from the Script box parameters) are stored as temporary additions to the Agent's User Management master file using a record type of 'T' (Temporary). Once these records have been used for the specific one-time job by the Telnet Exit Program they are immediately changed to type 'H' (History) records.

The Operator Replay Logs function supports an alternate view using function key F10 to show the Device and IP Address that were assigned each Replay record. It is the type 'H' records in the User Management master file that provide this Log view support data. Type 'H' records are deleted by the LSAM's daily log file purge server job (LSAMNG) according to the LSAM Parameters daily log file retention period. The collection of Type 'H' and type 'T' (if any are active) records can also be viewed for each user by using function key F13=Use History from the User Management list display (LSAM sub-menu 4, menu option 1).

:::tip
It is possible to enter both \*USER and \*CMD in the Telnet Device Name field of Operator Replay Configuration if it is desired to allow a Command Line option to override the User Management configuration as an exception. But a successful connection to a virtual workstation will only be achieved if all the rules are met for either the \*USER or \*CMD mode, and both a Device Name and IP Address are resolved at run time.
:::

## Configuring User Management for Device Selection (Mode 3)

For the Operator Replay Virtual Display management \*USER Mode (3) it is necessary to assign a virtual display device by name AND an IP address (use an IP address that is appropriate for a LOOPBACK type of Interface). All three elements: User, Device and IP Address, must be assigned together and used only once. None of these elements can be reused in any other combination, according to the constraints of Virtual Device Selection Mode 3. (See Mode 1 or 4 to eliminate this constraint.)

### LSAUSRR2 - Change User


#### Menu Pathways

Main Menu > Operator replay menu (#4) > Operator Replay user (#1) > option 2=Change

#### Figure: LSAM sub-menu 4, menu option 1, list option 2=Change
```
LSAUSRR                       Change User                     00/00/00
USERNAME                                                      00:00:00


       User Name . . . . . : SCRIPTUSER________________________________
___________________________________________________________________
       Password  . . . . . :

       Password (to verify):

       Description . . . . : Operator Replay User assigned to Device
       
WARNING: User name and password Fields are case-sensitive. Limits are:
    LSAM FEATURE       USER NAME SIZE, CASE       PASSWORD SIZE, CASE
    Operator Replay:   10; CAPS (rmt 128 mix?)    10/128 (SYSAL), Mixed
    UI FTP User....:   UI size, Mixed             128/remote limit, Mixed
    LSAM PTF ftp...:   128/remote limit, Mixed    128/remote limit, Mixed

Operator Replay Device per IP Address   See F1=Instructions.

    Device name . . . . : MYVRTDEV01
    IP Address  . . . . : 127.0.0.2
                          F4=IP Address List (*LOOPBACK example: 127.0.0.2)

F19=WRKCFGSTS *DEV  F20=WRKTCPSTS *IFC  F23/F12=CFG TCP & VRTDEV F24=More keys 
   - or -                                                           
F1=Dev/IpAddr instructions  F3=Exit  F5=Refresh  F12=Cancel   F24=More keys
```

The F1=Dev/IpAddr instructions below (adapted from this screen format's Help text) describe how the Telnet exit program uses this configuration.

This display format is used only to register a device name and an IP address. This display function does not create either a virtual device description or an IP address interface. Those can be created manually or with the assistance of the Agent's configuration prompts, accessed from the Operator Replay Configuration function, as described below. These objects do not have to exist when they are registered in the User Management function, but they must exist before this type of User profile can be used for an Operator Replay job.

#### Fields
| Fields | Description |
| ------ | ----------- |
| *All fields* |   This display format is described in detail in the Screens and Windows section under the general topic of Operator Replay. This table is focused on the Device Name and IP Address fields.
| Device Name |    Used only for Operator Replay Device Selection Mode 3, the Device Name must match exactly a virtual display device that is configured in advance before it can be used by an Operator Replay Script job. See the discussion below about using the Operator Replay Configuration function key F23 for easy prompting of appropriate values for the virtual display device.
| IP Address |     Used only for Operator Replay Device Selection Mode 3, the IP Address must match exactly an IBM i TCP/IP Interface address that is configured in advance before it can be used by an Operator Replay Script job. See the discussion below about using the Operator Replay Configuration function key F23 for easy prompting of appropriate values for configuring a \*LOOPBACK IP Address Interface. (Other types of Interfaces may also be used, but SMA recommends a Loopback address because it does not require a line description, so it is easier to configure and requires less system overhead to operate.)

More detailed information about using the Device Name and IP Address for Operator Replay is presented in the following topics.

## Virtual Device & IP Address Configuration - Help

Use the Operator Replay menu function 7 to configure the Telnet exit program. Press F23 to configure the LOOPBACK TCP/IP Interface and the virtual device.

### User Management - IP Device and IP Address

This OpCon Agent provides a Telnet Exit Program that is required to implement user-defined virtual device selection for Operator Replay. The Operator Replay Configuration F1=Help screen defines exit program parameters and explains the four different modes of operations that are used to select the virtual devices. The IP Address is sent to the Telnet Exit Program in a connection request, and the exit program uses that as a key to find the Device name in one of two LSAM tables.

The Device and IP Address fields in the LSAM User master record support MODE 3 of virtual device management for the Operator Replay feature. This mode relies on a 1-1-1 correspondence among the User Name, the Device Name and the IP Address to select the correct device for each Operator Replay Script user. In contrast with MODE 4 where the Device and IP Address are specified at run time, MODE 3 supports the higher security method of restricting virtual display devices to just one user. However, Mode 4 puts temporary records into the User Master file so that the run-time configuration values for the job user can be found by the Telnet Exit program.

For Modes 3 and 4, the Operator Replay Script driver uses the Script User as its key to find the correct IP Address that it should send to the Telnet server when requesting a virtual display device. Then the Telnet Exit program can use the IP Address it receives to find a matching record in the User Management master file, and that record supplies the Device Name that the Telnet Exit program returns to the Telnet Server just before an actual connection request is completed.

### IP LOOPBACK Address assignment

SMA recommends using the \*LOOPBACK Interface Definition to assign IP addresses within the IBM i partition for use with Operator Replay automation of green screen interaction. LOOPBACK addresses do not require creating a line description, but only to add and activate an Interface using the CFGTCP command or the System i  Navigator.

This User Management feature provides the F23 function key to access a convenient prompting screen where the IP Address Interface can be created and activated by the OpCon Agent's programs. At the same time, the designated virtual device can be created and activated.

## F13 = User Management Temporary Use History

Function key F13 from the User Management list display shows a view of temporary User Management records that have a record type of T or H. (Permanent User records of type of 'O' are not shown in this list. Records of type 'T' do not last long, since they are quickly changed to type 'H' as soon as they are used.)

Whenever an Operator Replay Script job is prepared for execution, and the device selection Mode is 4 (\*CMD), there is no way for the Operator Replay script driver programs to directly notify the Telnet Exit Program about the Device and IP Address that have been selected for the job. However, the Telnet Exit program is able to access the User Management master file, as it does for \*USER Mode 3, so temporary records of type 'T' (Temporary) are added to this file to record the command line
parameter values that specify the DEVICE and/or IPADDR values. When the Telnet Exit program uses a temporary record, it immediately sets the record type to 'H' (History).

Using F13 from the main User Management list display presents a new display of the temporary history records that are not yet purged from the User Management master file. This data is useful for research, especially during diagnosis of connection problems. Use option 5 to view details of any record.

### LSAUSRR11 - Telnet On-Demand Device History

#### Menu Pathways

Main Menu > Operator replay menu (#4) > User Management (#1) > F13=Use History

#### LSAM sub-menu 4, menu option 1, F13=Use History
```
 LSAUSRR                 Telnet On-Demand Device History      00/00/00
 USERNAME                                                     00:00:00

                            Search content:
 Type options, press Enter.
   5=Display

Op T IP address       Device       User Name    Job ID requesting device    DD-HH.MM
 _ T *DEFAULT         DSPH         OPCON        050674/QSECOFR/TESTOPR01    24-12.13 
 _ H 127.0.0.2        DSPH         OPCON        050807/USRNAM/TESTOPR14     26-18.10
 _ H 127.0.0.2        DSPH         OPCON        050813/USRNAM/TESTOPR15     26-18.40
 _ H 127.0.0.2        DSPH         OPCON        050816/USRNAM/TESTOPR16     26-18.51
 _ H 127.0.0.2        DSPH         OPCON        050819/USRNAM/TESTOPR17     26-19.00
 _ H 127.0.0.2        DSPH         OPCON        050821/USRNAM/TESTOPR17     26-19.03
 _ H 127.0.0.2        DSPI         OPCON        050698/USRNAM/TESTOPR02     24-15.13
 _ H 127.0.0.2        DSPI         OPCON        050675/USRNAM/DSPA          24-15.23
 _ H 127.0.0.2        DSPI         OPCON        050701/USRNAM/TESTOPR03     24-15.28 



                                                                               Bottom

F3=Exit   F5=Refresh    F11-Sort order    F12=Cancel    F16=Search next 
```

#### Fields

- Opt: <**Tab**> to a row in the table and type an option next to one or more lines, and press <**Enter**> to perform each option entered.
- IP Address: The IP Address used by each Operator Replay job (or attempt to start a job)
- Device (Name): The virtual display device that was selected according to the Operator Replay device selection mode that was in effect when the job was initiated.
- User Name: The IBM i user profile name assigned to the interactive job that was intended to use the virtual display device. This is usually not the same name as the Operator Replay script driver job name (Job ID requesting device), since the driver jobs started by OpCon run under control of the Agent's restricted, powerful SMANET user profile.
- Job ID: Job ID Requesting Device: This is the complete IBM i Job ID of the Operator Replay script driver job, even if the job was not successful in obtaining a virtual display device or in starting or completing the interactive job that was supposed to be driven by the Script.
- DD-HH.MM: The day, hours and minutes when the Operator Replay job initiation was attempted. Use option 5=Display to view the complete time stamp.

#### Options

- **5=Display:** Type 5 in the **Opt** field next to view more complete information about the temporary User Management record. (There is not much more to see than appears in the list display.)

#### Functions

- **F11=Sort order:** Press <**F11**> to change which list column will govern the sorted order of the list entries. Any of the list columns can be selected to order the list (in ascending order).

## Operator Replay Device and IP Address Configuration (F23)

From the Operator Replay Configuration main display, F23 presents the following display which may optionally be used to let the Agent program configure a single virtual display device and to add the Interface for the loopback IP address. The user may choose to manually execute the IBM i native commands: CRTDEVDSP and CFGTCP (selecting option 1 from the IBM i CFGTCP menu) to perform these same actions. However, this Agent function shows a prompted IBM i command for each action, with
recommended default values already filled in, so it is usually much easier and faster to create one or more device descriptions and IP address interfaces using this Agent aid.

If a device is entered in the main Operator Replay Configuration display, it will be shown at the top of the display. However, both the device and the IP address can be changed in the lower half of the display. This allows the user to configure many different device and IP address combinations, such as may be required when the Telnet device mode is *USER. This display format can be reused more than once for each device and/or IP address interface that is needed.

When function key F14 is pressed, the display will change to show each requested IBM i command in an IBM command prompt mode. Any of the command parameters can then be changed by the user before they are executed when the Enter key is pressed. It is also possible to exit the prompted commands with F3 or F12.

### OPRRPYD307 - Virtual Device and IP LOOPBACK Address Configuration

#### Menu Pathways

Main Menu > Operator replay menu (#4) > User Management (#1) > F23

#### Figure: LSAM sub-menu 4, menu option 7, F23=CFG DEV & IP
```
OPRRPYD              Virtual Device & IP LOOPBACK Address     00/00/00
USERNAME                                                      00:00:00

VRT DEV: MYVRTDEV01 IP Addr: 127.0.0.2

Refer to the OpCon User Help for more detailed instructions. Device selection 
 requires Telnet exit program. From main display see F1=Help then use F22.

SMA recommends using LOOPBACK IP addresses to connect to virtual display devices 
 used by Operator Replay green screen automation. LOOPBACK does not 
 require creating an IBM i line description. This screen supports MODE 2
 where every script user shares the same virtual device and IP address.

Type values below and press F14 to create the Device and Interface, or use the
 commands CRTDEVDSP and CFGTCP (Option 1) to create a custom configuration.
  Create options . . . . CRTDEVDSP? 0   ADDTCPIFC? 0      0=No, 1=Yes
  Virtual dev/controller USERDEV001     QVIRCD001
  Internet address . . . 127.0.0.2
  Line description . . . *LOOPBACK    LOOPBACK IP Address example 127.0.0.2 
  Subnet mask  . . . . . 255.0.0.0
  Alias name (or *NONE)  LOCALHOST2                                Example: LOCALHOST2
  Text (description) . . For SMA Telnet Exit program


F3=Exit   Enter/F12=Return   F14=CRTDEVDSP/ADDTCPIFC
```

This display format can be used multiple times, to configure and activate one, or a whole list of virtual devices and/or their associated interfaces (of type \*LOOPBACK).

For each action that is configured and then launched from this display (using F14), the native IBM i command will appear in command prompt format. This provides convenient access to IBM i Help Text, and it also permits sites with special requirements to change any parameter. Command parameters that are protected in this launch display format will be unprotected in the IBM i command format, in case the usually recommended values are not appropriate.

But sites with no special requirements can simply press Enter to complete the command action, after which the display will return to this format, allowing the user to either quit the display or begin another configuration action.

#### Fields

- **VRT DEV**: This field near the top of the display shows the current setting from the Operator Replay Configuration main page. This is only reference information and it does not directly affect the user actions in the bottom part of the display.
- **IP Addr**: This field near the top of the display shows the current setting from the Operator Replay Configuration main page. This is only reference information and it does not directly affect the user actions in the bottom part of the display.
- **Create options**: For each use cycle of this display, type a '0' or '1' into the two command name flag fields to select which commands will be prompted when F14 is pressed.

  VALUES:
  
    '**0**' = No, do not prompt this command. 

    '**1**' = Yes, do prompt this command.

    CRTDEVDSP = Create a display device, using parameters that define a virtual device.

    ADDTCPIFC = Add an IP address interface for the IP address. This command performs the same action as using an Add option from the IBM i CFGTCP command, menu option 1.

- **Virtual device**: Type the actual name of the virtual display device to be created. 
- **Virtual controller**: Accept the prompted virtual display device controller name, or type in a different controller name. There are two virtual display device controllers that are used by default in the IBM i operating system, but user-defined virtual device controllers may also be used. Notice also that the trailing digits in a controller name are used to serially number similar controllers, when many display devices must be divided among multiple controllers.

  Examples of virtual device controller names: 
  
    QVIRCD0001 = an example of a virtual display device controller created by IBM i in response to a request from a remote Access Client Solutions program to create and activate a new virtual display device. 

    QPACTL01 = an example of a virtual display device controller used by default for automatically created virtual display devices, where the device names are typically like this: QPADEV0001.

- **Internet address**:  The IP Address that will be registered in a TCP/IP Interface. The initial display default  will show the value (if any) from the Operator Replay Configuration screen, or else a default \*LOOPBACK address will be suggested.

  The default values that this screen format supplies for the ADDTCPFC command are what SMA recommends for Operator Replay IP addresses. There are common standards for IP addresses that should be used for *LOOPBACK interface types. SMA recommends using a loopback interface because it does not require a line description, so the configuration is easier to manage and it involves less overhead in the system than using a locally defined external  (or virtual LAN) IP address in a loopback mode.


- **Line description**: The Internet Address field (above) explains why \*LOOPBACK is recommended instead of using a physical line description. However, when the ADDTCPIFC command is prompted by the F14 function key, the user may replace this prompted value with any actual value that meets any unique site requirements. 

  If physical line descriptions are used, they must be manually created by the user, since this prompting screen does not support creation of line descriptions.

- **Subnet mask**: This display prompts the ADDTCPIFC command with a subnet mask that is appropriate for a \*LOOPBACK type of interface. This value can be replaced after the ADDTCPIFC command is prompted using the F14 function key, if that is necessary to meet any unique site requirements.
- **Alias name**: The alias name used to represent a TCP Interface can be set to *NONE, or a unique name can be typed by the user to represent each different Interface that will be added to the partition. Use of interface alias names is optional, depending on the overall network practices and/or requirements of the site. The Operator Replay device selection routines do not rely on the alias name.
- **Text (description)**: This description text is inserted into the description of the display device and the TCP interface, when the commands are prompted using the F14 function key. The description text can also be updated from the command prompt displays, especially if the device and the interface should have different text.

#### Functions

- **F14=CRTDEVDSP/ADDTCPIFC:** Press <**F14**> to proceed to the prompt of the IBM i command(s) that were selected using the command option '1'.

## Activating the Telnet Exit Program

This would likely be the last step in implementing virtual device selection for Modes 2, 3 and 4. The Telnet Exit program cannot be effective unless all the other requirements of Operator Replay device selection have been met, as described above.

The OpCon Agent for IBM i provides a Telnet Exit Program that is required to implement virtual device selection for Modes 2, 3 and 4. The script driver program accepts the User Name that will log on to the virtual display device, and it uses that name to find the IP Address configured in this User table. When the script driver sends a request for a virtual device to the Telnet server, the LSAM's Telnet Exit program uses the IP Address specified by the script driver to look up the correct device name from the User master file. The Telnet Exit Program does not know yet which user will attempt to log on, but it is able to tell the system which device name to assign as the virtual display.

As the Operator Replay script driver programs prepare for logging the designated script user on to the virtual display device, the script driver programs store the IP address, display device and user name used for each Replay job into the Operator Replay activity log file. 

Mode 1 (\*DFT - QAUTOCFG) is the only device selection mode that cannot anticipate the device name, since that mode relies on IBM i automatic selection of any available virtual display device. Mode 3, supported by the User Management registration, confirms in advance which display device will be used. The device name makes  it easier to identify the virtual display device job when using branch inquiry to WRKJOB from the Operator Replay Log displays.

Implementing the Agent's Telnet Exit Program requires two steps. First, the exit program must be registered, just as with any other IBM i exit program. This registration step could be performed manually using the IBM i command WRKREGINF, or ADDEXITPGM. However, SMA recommends only using the IBM i command to view the registration status of exit point QIBM-QTG-DEVINIT because the Agent software relies on a very specific configuration of the information included in the Description field of the exit registration to interface with the Agent database in the correct LSAM environment.

## Operator Replay Configuration: F22=SMATELSVR Manage Telnet Exit Program

From the Operator Replay Configuration main display pages (1 or 2), use function key F22 to configure and then register the Agent's Telnet Exit program.

SMATELR1 - Manage SMA Telnet Exit Program

#### Menu Pathways

Main Menu > Operator replay menu (#4) > Operator Replay Configuration (#7) > F22

```
SMATELR1          Manage SMA Telnet Exit Program in Batch Job             00/00/00
USERNAME        END/STRTCPSVR required to activate ADD or RMVEXITPGM      00:00:00

Specify the following batch job parameters, then press Enter to submit the job.
The SBMJOB command will be prompted for changes to the job start date and time.

A submitted job is used to manage stopping and restarting the TELNET server,
  if ACTIVATE is set to 1. Stopping the Telnet server will disconnect
  display and printer devices, except for the system CONSOLE device.
  The batch job will automatically restart the Telnet server after a short
  delay. Use IBM i command WRKREGINF to view exit point QIBM-QTG-DEVINIT.

SMATELSVB command parameters
  *ADD/*REMOVE Exit pgm entry? . . *NONE      *NONE, *ADD, *REMOVE
  END & STRTCPSVR (*TELNET)? . . . 0          ACTIVATE: 0=No, 1=Yes
  Delay between END/STRTCPSVR  . .  10        DLYJOB: 0 - 999 seconds

SBMJOB command parameters
  Job name . . . . . . . . . . . . SMATELNET
  Job description, library . . . . SMALSAJ00  SMADTA   
  Job queue (*JOBD), library . . . QBATCH     QGPL


F3=Exit   F12=Cancel
```

When using this display, to prevent accidental system interruption, the \*ADD/\*REMOVE action control field is displayed with a default value of \*NONE, which means that no action will be initiated in case the Enter key is pressed too quickly. This same display may be used to add and activate the Telnet exit program, or to remove and deactivate it.

Please carefully consider the detailed instructions for using this display, following the table of display fields.

#### Fields

- **\*ADD/\*REMOVE Exit pgm entry?**: 

  The display shows a default value of *NONE to help prevent an accidental initiation of an unexpected action. 

  \*ADD (REPLACE) = Add or update the exit program entry

  \*REMOVE = remove the exit program entry
 
   Remember that after changing the IBM i exit program registry, this change will not take effect until the Telnet server is ended and restarted. Use the next field to  control the activation with the job submitted from this display, or to suppress the activation action because it will be handled separately (either by a manual end/restart or by a pair of OpCon IBM i batch jobs).

- **END & STRTCPSVR (*TELNET)**?: 

  This control field determines if the submitted job will only add/remove an exit program entry, or if it will also activate the change to the exit program entry by ending and restarting the Telnet server.

  '**0**' = No, do not end/restart the Telnet server.

  '**1**' = Yes, do end/restart the Telnet server immediately after updating the exit program registry.

- **Delay between END/STRTCPSVR**:

  If the END & STR option is '1' = Yes, then this value determines how many seconds the submitted batch job should wait between ending the Telnet server and then starting it again. The amount of time required depends on the speed of the processor and also how busy the machine may be. A value of 10 seconds is suggested, but if the submitted job's log shows that the restart action failed, use a longer time when retrying this action.
 
  If there has been a failure to restart the Telnet server, it is possible to use either the IBM i partition's console or create and execute an immediate OpCon batch job for IBM i, executing this command:
  ```
  STRTCPSVR SERVER(*TELNET)
  ```

- **Job name**:
 
  Any valid IBM i job name may be typed into this field, or the default job name may be left. 
 
  :::tip
  The Job User name is not prompted by this display, but it can be overridden with an appropriate value when the SBMJOB command prompt appears. If the Job User name is not specified, then the default for the SBMJOB command is to use the current interactive job user. The requirement for the submitted job is that the Job User must have authority to execute the LSAM's SMATESVB command (and the command driver program), and it must also have authority to use these IBM i commands: ADDEXITPGM, RMVEXITPGM, STRTCPSVR, ENDTCPSVR.
  :::

- **Job description**:

  The actions of the submitted job require the IBM i LSAM environment library list. The LSAM Server Job Description SMALSAJ00 is appropriate, but a user-defined job description may also be used, as long as it includes the LSAM environment libraries in its initial library list for the submitted job.
 
  A user-defined job description could be used to specify the Job User name. See the explanation above in the Job Name field about requirements for the submitted Job User Name.

- **Job description library**:

  The DB2 library location of the job description. The default job description of SMALSAJ00 resides in the library SMADTA (or its equivalent, if an alternate LSAM environment is managing the Telnet exit program).

- **Job queue**:

  Values permitted in this field: 
   
  \*JOBD = use the job queue specified by the Job Description. The default LSAM job description points to the job queue SMALSAQ00 in library SMADTA (or its equivalent library name), which is connected to the LSAM server jobs subsystem (SMASBS, or an equivalent name).

  QBATCH = the suggested default job queue, which is often an appropriate queue (and subsystem) for executing system management batch jobs. The QBATCH job queue typically resides in the QGPL library.                           

  Any user-selected job queue name can be used, as long as it is connected to an active subsystem where the system management commands are allowed to execute.

- **Job queue library**:

  The DB2 library where the named Job Queue resides. See the definition of the Job queue name, above, for more information about the correct library name. 

#### Functions

**Enter**: Press <**Enter**> to submit the IBM i job that will either add or remove the exit program entry, and then optionally end and restart the Telnet server.

:::warning
Expect a short interruption and disconnect of all Telnet-based devices (printers and most display devices, except for the designated partition console display) while the system Telnet Server is stopped and restarted. This suspension of Telnet services is required to activate any change (Add or Remove) to the registered Telnet Exit Program. Although the Agent's exit program activation function is designed to automatically restore Telnet services after the activation has completed, SMA recommends using the partition's console device to perform this action, since the console device will NOT be suspended when the Telnet server is suspended.
:::

### SMATELR1 Display Use Instructions

There are two distinct actions required to enable the Telnet exit program. First it must be registered in the IBM i exit program registry (viewed by using the IBM i command WRKREFINF), and then the Telnet Server itself must be stopped and restarted so that the active instance of the server knows that it must give control to the exit program for each connect request it processes.

(The Telnet server does not always check for an exit program -- it only performs this check at startup time. This makes Telnet server processing much more efficient when there is no exit program, especially in environments with high Telnet device activity levels.)

The action of adding an exit program to the registry could be performed by using the IBM i command ADDEXITPGM, however, the Agent software depends on a very exact configuration of the exit program entry's description text. This means that the only reliable way to add the exit program entry is to use this F22 Agent function.

On the other hand, stopping and restarting the Telnet server program could be accomplished in two different ways:

1. OpCon batch jobs for IBM i could execute the IBM i commands ENDTCPSVR SERVER(\*TELNET) and STRTCPSVR SERVER(\*TELNET). SMA recommends using this method when a client site has a very strict window of time during which the IBM i partition can tolerate an interruption of the Telnet server.

2. On the screen format, set the END & START - ACTIVATE option to '1'= Yes. Choose an appropriate delay time between the End and (Re-)Start actions, and then as the prompt of the IBM i SBMJOB command appears, optionally specify a Job Start Date and Time (or, allow the job to submit immediately because "right now" is a good time to suspend the Telnet server).

When setting the END & START -- ACTIVATE option, remember that the term "activate" means to make effective the latest change that is just about to be made to the IBM i exit point registry. Whether the exit point was added (*ADD) or removed (*REMOVE), that change to the registry is not effective until the Telnet server is stopped and restarted. So the term "activate" is referring to the Telnet server end/restart action in either case, and it is not confined to just adding a new exit program entry.

## Operator Replay Behavior with Virtual Devices

### How Virtual Devices May Cause Operator Replay Script Failures

The IBM i LSAM Operator Replay facility requires the use of a virtual device to emulate an interactive user's job. One or more virtual devices and their controller(s) must be in a varied on state and the devices must have authority granted to both the Telnet server user profile QTCP and to each of the Operator Replay Script user profiles. The following list is a partial list of conditions that might cause an Operator Replay job to fail:

- Automatic virtual device creation is turned off and there are no virtual controllers or virtual devices created.

- The virtual controller and/or all virtual devices are in a varied off state.

- All the available virtual devices are already assigned to active jobs.

- An unauthorized user attempted to use a virtual device(s) and the system has set all virtual devices to a varied off state.

- An Operator Replay Script user attempted to use a virtual device but was not authorized to the device, in which case the system has set the user profile status to *DISABLED.

Each condition above requires knowledge and use of IBM IBM i commands and procedures to remedy the error condition before an attempt to restart an Operator Replay job will succeed.

If any of the above error conditions occur, one or more of the following symptoms might be observed:

- A message will be sent to the IBM i operator message queue (QSYSOPR)
  :::info example
  Subsystem QINTER disabled user profile RPYUSER on device LSAOPRRPY.
  Subsystem QINTER varied off work station LSAOPRRPY for user RPYUSER.
  :::
- The Operator Replay job status in the OpCon Schedule will show "Failed -- SMA0106"
- The IBM i LSAM Operator Replay Log Entry, under function 3: Operator Replay Logs, will show a job completion code of 6
- There will usually be no data in the LSAM's Operator Replay log detail

When an Operator Replay control job has failed to log the Script User on to a virtual workstation, the Script never actually starts execution. This means that the IBM i LSAM Operator Replay Log Entry may show the error completion code of 6 (representing error message ID SMA0106), but in some cases there will be no content visible in the list display for the log detail (accessed by pressing <**F10**> from the Operator Replay Log Entry display, within the Operator Replay Logs function). Operator Replay Log detail entries are only made once the Script starts execution.

However, technical support personnel may gain additional diagnostic information about a failing Operator Replay job if the Operator Replay Configuration parameter for Script job debug logging had previously been set to "Y" (= yes). In this case, function key <**F17**> from the Operator Replay Configuration display may be used to view the debug log file content. This log file can only be understood with knowledge of the source code of SMA's IBM i LSAM Operator Replay execution program.

### How Operator Replay Selects Virtual Devices Per Mode

In Mode 1 the script driver program simply initiates a connection request to the system's Telnet port number using the IP address registered in the Operator Replay Configuration data. Then it assumes that the IBM i operating system will select or create a virtual display device and assign that device as if it were the end point for the connection to the Telnet server.

In Mode 2 the script driver program starts the same way as Mode 1 by initiating a connection request to the system's Telnet port number using the IP address registered in the Operator Replay Configuration data. But Mode 2 requires that the SMA LSAM Telnet Exit Program be activated, so that the device name designated in the Operator Replay Configuration data can be forced as the virtual device that the Telnet server will communicate with.

Mode 3 is more complex because it was designed for high volume and/or multi-application environments, also supporting the highest possible system security. The operation of Mode 3 is based on a 1-to-1-to-1 relationship among three data elements: IP Address + User Name + IP Address. Each of the values for these three data elements must be used in only one relationship. In other words, a single IP address cannot be reused with a different device name or a different user.

There are two reasons for the constraints of Mode 3. Both are caused by limitations of the information that is available during different phases of the startup process for an interactive job that is supporting a Telnet server connection.

To start with, when any connect request is sent to the Telnet server, it is not possible for the Telnet server to know the User Profile name of the requester. The point at which it is possible to force a device name into the Telnet connection process happens before a Signon display can be presented to collect the User name and validate a password. The only information available to the Telnet Server that can identify the requester is the IP address within its host system where the connect
request has been routed. This implies that the Operator Replay script driver program must select a unique IP address for each different device name when it initiates contact with the Telnet server.

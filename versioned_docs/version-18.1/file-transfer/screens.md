---
sidebar_label: 'SMA File Transfer Screens and Windows'
---

# SMA File Transfer Screens and Windows

## SMAFT Parameters

- **Screen Title**: SMAFT Configuration Parameters
- **Screen ID**:
  - SFTPARR00-1
  - SFTPARR00-2
  - SFTPARR00-3

The screens show typical default values that would be appropriate for most installations. The notable exceptions are the IP address, and perhaps the port numbers. There may be a need to change the CCSID and translation tables, depending on the country and the text language used on the OpCon server.

#### Menu Pathways

Main Menu > SMA File Transfer menu (#8) > SMAFT Parameters (#4)

#### Fields

| Field                | Default              | Description          |
| -----                | -------              | -----------          |
| SMAFT Server Ext IP Address | None -- use F4 to see a list of available values | This is the IP address where the  SMA File Transfer Server port may be found by other OpCon LSAMs whose SMAFT Agents will contact this Server to request a file. |
| SMAFT Server Int IP Address | *EXT | Most IBM i partitions will directly support an Interface to the External (or Public) IP Address that is used by OpCon to tell other Agents where they can connect to this Agent for SMA File Transfer jobs. When this is the case, just leave the Internal IP Address field set to *EXT. The External IP Address is available for the Bind IP? 
| | | Option. However, when port-forwarding is being used by Client IBM i (virtual) partitions, as they are supported by a (physical) Host partition, then it is necessary to specify an IP Address that can be directly accessed "internally" by the virtual, client partition, in order to support the Bind IP? option. |
| Bind to specific IP? | N                    | The original behavior of the LSAM communications programs was to request any available IP Interface where they can bind their designated Ports and then use that connection point to accept a socket connection request from the OpCon server. 
| | | It is often preferred, and possibly more secure, to bind the Port to a specific IP address. This ability is required if an Internal IP address (such as a Virtual LAN address) will be used to support the OpCon server's connection to the designated External IP. |
| SMAFT Server Port    | 3301                 | The port that should be used by the SMAFT Server job, to listen for file transfer requests incoming from SMAFT Agents on other systems. Note that the IBM i LSAM does not share its JORS port with SMAFT, as may be the case with other OpCon LSAMs.               |
| Agent port range start | 31000                | The first port number that should be used by this IBM i LSAM when it starts an SMAFT Agent job. The Agent's port number is used to form a socket connection with a remote SMAFT Server. There can be as many different Agent port numbers used on this system as are allowed by the Max Concurrent FT Jobs parameter, below. Be sure that the Agent port range start number plus the Max FT Jobs count will not cause a port to be used that is already assigned to another service that exists in the network with this copy of IBM i. |
| Use IPv6 protocol?   | N (= no)             | **N=no, Y=yes.** It is possible for the IBM i LSAM communications programs to use IPv6 protocol. However, do not set this flag to Y=yes without contacting SMA support to review your environment and also coordinate with OpCon SMANetCom abilities.  
| Auto-start Server?   | Y (= yes)            | The IBM i LSAM general server startup procedures should also automatically start the SMAFT Server communications program. |
| Max Concurrent FT Jobs | None (1 -- 999)   | This parameter has two effects: |
| | | The total number of concurrent SMA File Transfer jobs running in this LSAM environment (that is, usually in the whole IBM i system) may not exceed this number. This prevents the system from being overloaded with heavy file transfer activity. |
|                      |                      | In combination with the Agent port range start number, this number determines the highest possible port number that could be assigned to SMAFT Agent jobs (that is, if all SMAFT activity was comprised of only Agent jobs and no Server sub-tasks). |
| Status frequency (secs) | 15              | How often the SMA File Transfer Server should send a status message (023) reporting the number of bytes transferred. This information is used to update progress showing on the OpCon Schedule display, but status messages sent too frequently could slow down the progress of the file transfer.            |
| Max bandwidth (bps)  | 9,999,999 (no limit) | This is a general control that limits the average data throughput rate of each SMA File Transfer job so that it will not exceed this pace in bits per second. This is not a precise control, but it helps to prevent overloading communications lines and it can also reduce the impact on system performance of SMA File Transfer jobs.            |
| Log level (if on)    | CTL                  | Values:              |
|                      |                      | **CTL** = Log only the transfer job control transactions and the first 5 records of the transfer payload.         |
|                      |                      | **ALL** = Log the entire file transfer job, including all records of the file transfer payload.         |
| Max TCP/IP block size | Do not change unless instructed by SMA Support. | The size of the largest message that the IBM i LSAM SMAFT communications programs can handle at once. 32000 is the largest allowed packet size, based on hard-coded program limits.      |
|                      |                      | However, this packet size can be set to a smaller value if a system performance analyst determines that the overall system performance or the communications line performance would be improved by smaller packets.             |

### SMAFT Translation Options

| Field                  | Default         | Description            |
| ---- | ---- | ---- |
| Default EBCDIC CCSID   | 00037           | The character set to use for adding data to files in the UDB DB2 native database (DB2/400) when the file did not already exist and there is no other source (such as information from the source file provided by the Server) of information about what character set to use. This value is used only for SMAFT data packet translation and not for SMA File Transfer protocol signals.               |
| Default ASCII CCSID    | 00819           | The character set to use for adding data to files in the IFS (integrated file system) when the file did not already exist and there is no other source of information about what character set to use.  |
| | | This CCSID is also used to interpret the data packet contents when the file is text (not binary) and the Common Character set specified by the SMAFT Server is ASCII, but no other information was provided, such as pre-pended file transfer labeling which might include a CCSID code in an optional \<Other\> XML tag, if that Server is capable of identifying CCSID codes for the source data it has sent.   |
| ASCII -> EBCDIC table, and library  | QEBCDIC in QSYS | The translation table that the IBM i SMA File Transfer programs should use for exchanging SMAFT protocol signals with Agents and Servers on other systems. This table is used to translate protocol signals incoming to IBM i, since the protocol will always be ASCII but IBM i uses EBCDIC as its native character set. This table can be a user-defined table or another table provided with IBM i. The choice of table to use may depend on the default ASCII character set of the OpCon Server that is part of this   network.               |
| EBCDIC -> ASCII table and library | QASCII in QSYS  | The translation table that the IBM i SMA File Transfer programs should use for exchanging SMAFT protocol signals with Agents and Servers on other systems. This table is used to translate protocol signals that IBM i sends to other systems, since the protocol must always be ASCII but IBM i uses EBCDIC as its native character set. This table can be a user-defined table or  another table provided with IBM i. The choice of table to use may depend on the default ASCII character set of the OpCon Server   that is part of this network.               |


### SMA File Transfer SSL/TLS Security Options

The setting of the TLS Security options can match the same parameters as described for the Agent's Job Scheduler and JORS communications settings, as described in the Configuration section of this Agent's User Help. The Extended Discussion of Parameters under that topic includes additional details and instructions about implementing TLS Security for any of this Agent's communication services.

One notable difference for SMA File Transfer is that this Agent uses two additional Digital Certificate Applications in the IBM i Digital Certificate Manager Store which are separate from the LSAM Job Scheduler Application names. This means that all three Applications must be assigned a digital certificate, but they may all use the same digital certificate, depending on the preferences and requirements of the local site's security policies.

Remember when configuring the TLS Security options for SMA File Transfer that these affect the TCP/IP socket connection with another OpCon Agent. These are not connections between this Agent and the OpCon Server. 

The SMA File Transfer (SMAFT) protocol defines a SMAFT Server that is listening for connection requests, and a separate SMAFT Agent program that is started whenever OpCon tells this Agent that it must connect with another OpCon Agent (LSAM) to perform a file transfer. The SMAFT Server takes the TLS Security Server role, while the SMAFT Agent takes the TLS Client role. Accordingly, the following table of parameters shows a "Server App" and a "Client App" that must be assigned to the correct IBM Digital Certificate Manager Store's Application(s).

| Field | Default | Valid Values | Required (Y/N) | Description |
| ----  | ------- | ------------ | -------------- | ----------- |
| Use TLS Security? | N  |Y = yes N = no | Y | This field determines if the LSAM will engage a digital certificate and complete a TLS Security handshake with the OpCon server. |
| | | | | When this option is set to Y = Yes, the TLS Security handshake must complete successfully, or the connection with the OpCon server will be refused. |
| | | | | Use the SMAFT Log Viewers communications logs to see entries that report about TLS Security, whether it completed successfully, or whether some error is reported. |
| TLS handshake timeout | 30 | 1 -- 999 | Y | The number of seconds that the communications programs should wait for the next response, once a TLS Security handshake has been initiated, before they give up waiting and reject the connection attempt. |
| | | | | This value must be long enough for a normal connection to complete successfully. But if the time is too long, that could create an opportunity for hacking the security handshake. |
| TLS DCM Server App Application Description | (see default text on screen) | Any text | N | This field supports a description of the Digital Certificate Manager application, for information purposes only. |
| | | | | The "Server App" is for the SMAFT Server, acting as the TLS Server. |
| TLS DCM Server App Application ID | (see default text on screen) | Must match the IBM i DCM App ID | Y | This Digital Certificate Manager Application ID must match the Application ID that was registered in the local IBM i Certificate Store for this Agent's certificate. The Agent uses this key value to request the digital certificate data that it needs to complete a TLS Security handshake with the SMAFT transfer job remote system. |
| TLS DCM Client App Application Description | (see default text on screen) | Any text | N | This field supports a description of the Digital Certificate Manager application, for nformation purposes only. |
| | | | | The "Client App" is for the SMAFT Agent, acting as the TLS Client. |
| TLS DCM Client App Application ID | (see default text on screen) | Must match the IBM i DCM App ID | Y | This Digital Certificate Manager Application ID must match the Application ID that was registered in the local IBM i Certificate Store for this Agent's certificate. The Agent uses this key value to request the digital certificate data that it needs to complete a TLS Security handshake with the SMAFT transfer job remote system. |

### SMAFT Agent Communications Performance Parameters

| Field  |                    Default | Description |
| ----- | ----- |-----|
|  Process Idle Timeout       | 300 |   These performance parameters are discussed in detail under the section on LSAM Parameters. The use of each parameter is the same, except that these parameters apply to the SMAFT Agent jobs.|
|  Input wait timeout         |  1  |   "|
|  Control DTAQ wait          |  1  |   "|
|  Control DTAQ frequency     | 20  |   "|
|  Closed socket linger       | 10  |   "|
|  ACK pending timeout        | 60  |   "|
|  Port Idle Timeout          | 300 |   The remaining performance parameters in this table are discussed in detail under the section on LSAM Parameters. The use of each parameter is the same, except that these parameters apply to the SMAFT Server jobs.|
|  Input wait timeout        |   1  |   "|
|  Control DTAQ wait         |   1  |   "|
|  Control DTAQ frequency    |  20  |   "|
|  Closed socket linger      |  10  |   "|
|  ACK pending timeout       |  60  |   "|

#### Functions

- **F3=Exit**: Quits the list of trapped messages and returns to the menu.
- **F4=IP Addresses**: Produces a window where all the IP addresses configured on the system are listed, so that one can be chosen to fill in the SMAFT IP Address field.
- **F9=View LIBL**: This is a convenience feature. This function key produces a display of the library list that applies to the current LSAM environment.
- **F12=Cancel**: Quits the SMAFT Parameters function without update and returns to the menu.
- **PageDown/PageUp**: Used to move between the two pages of the SMAFT Parameters. Updates on page one are not completed until the <**Enter**> key is pressed on page two.

## SMAFT Agent Network Address Translation Table

Use this maintenance function to add or change SMAFT Agent NAT table entries that will enable a connection between virtualized IBM i partitions, when the public IP address for the SMAFT Server is not supported from the SMAFT Agent partition for this type of communication connection. Additional details about the use of this function are offered above, under SMA File Transfer Operations.

### SFTNATR2A - SMAFT Agent NAT Table Details

#### Menu Pathways

Main Menu > SMA File Transfer menu (#8) > Work with SMAFT Network Address Translation (#8)

#### Fields

-  **Original IP address**:   The IP address assigned to the SMAFT Server machine in the OpCon database, or the IP address from the DNS for the Full Qualified Domain Name assigned to that machine in the OpCon database.
-  **Original port number**:   The IP address assigned to the SMAFT Server machine in the OpCon database, under the Advanced Options -- File Transfer Settings.
-  **New IP address**:         The IP address that the SMAFT Agent sockets program will use to actually contact the SMAFT Server, typically a local VPN address.
-  **New port number**:       The IP address used by the SMAFT Server listener job, as configured within the LSAM SMAFT Parameters. Often, this could be the same port number as was originally configured for this SMAFT Server machine.

#### Options

- **2=Change**: Branches to a display format where an existing NAT table entry can be updated and the changes stored to the database table.
- **3=Copy**: Branches to the display format where a new NAT table entry can be defined and stored to the database table, starting with the values from an existing table record. When using the Copy function, the Original IP Address value must either be unique in the table, or it must be associated in this new record with a unique Original Port Number. The Original IP Address and Original Port Number, combined, cannot be the same as another record in the table.
- **4=Delete**: Select one or more records to be removed from the table, then press Enter to proceed to the Delete confirmation list display that will finally perform the actual delete action.
- **5=Display**: Branches to a display format where an existing NAT table entry will be displayed with complete data. This display will often show the same information as the Work With list display, unless one of the IP addresses is too long for the list display.

#### Functions

- **F3=Exit**: Quits the list of NAT table entries and returns to the menu.
- **F5=Refresh**: Reloads the list of NAT table entries directly from the database table.
- **F6=Add**: Branches to a display format where a new NAT table entry can be defined and stored to the database table.
- **F12=Cancel**: Quits the Work With function, abandoning any typed line options, and returns to the menu.

## Manage SMAFT Logging

### SFTLOGR1 - Manage SMAFT Logging

The Manage SMAFT Logging screen, by itself, is an inquiry-only screen that shows the current status of the IBM i SMA File Transfer communications logging features. The functions keys <**F7**> and <**F8**> are used to actually control the logging functions. SMA File Transfer logging can also be controlled from the general LSAM Logging management screen, found in option # 4 of the LSAM Management Menu (menu # 6 from the LSAM Main Menu).

#### Menu Pathways

Main Menu > SMA File Transfer menu (#8) > Manage SMAFT Logging (#5)

#### Fields

-  **LSAM Subsystem Name**: The name assigned to this LSAM environment on the LSAM Parameters screen, shown here for convenience.
-  **SMAFT Agent logging status**: Shows if the SMAFT Agent programs will be logging their communications activity, and at what level.
-  **SMAFT Server logging status**: Shows if the SMAFT Server Listener program and the sub-programs it spawns for each file transfer job will be logging their communications activity, and at what level.

#### Functions

- **F3=Exit**: Returns to the menu.
- **F5=Refresh**: Re-displays the most current log control settings.
- **F7=STRSSFTLOG**: Refer to a full description of the STRSFTLOG command below.
- **F8=ENDSFTALOG**: Refer to a full description of the ENDSFTLOG command in [ENDSFTLOG -- End SMAFT Logging](#endsftlog-end-smaft-logging).
- **F9=View logs**: Refer to a full description of the View SMAFT logs function in [View SMAFT Logs](../file-transfer/menu.md#View_SMAFT_Logs).
- **F12=Cancel**: Return to the menu.

## STRSFTLOG -- Start SMAFT logging

Using <**F7**> (STRSFTLOG) from the Manage SMAFT Logging screen, or typing the STRSFTLOG command, presents the prompted set of parameters for the command STRSFTLOG. The command parameter scan be changed from the default values, making it possible to choose only the logging features that are needed for a particular situation.

### Start LSAM Logging
```
                        Start Logging Mode (SFTSTRLOG)                         
                                                                               
Type choices, press Enter.                                                     
                                                                               
When to start logging  . . . . .   *IMMED        *CNTRLD, *IMMED               
Log SMAFT Agent comm?  . . . . .   *YES          *YES, *NO                     
Clear SMAFT Agent comm log?  . .   *YES          *YES, *NO                     
Detail SMAFT Agent comm log? . .   *NO           *YES, *NO                     
Log SMAFT Server comm? . . . . .   *YES          *YES, *NO                     
Clear SMAFT Server comm log? . .   *YES          *YES, *NO                     
Detail SMAFT Server comm log?  .   *NO           *YES, *NO                     
                                                                               
                                                                               
                                                                        Bottom 
F3=Exit   F4=Prompt   F5=Refresh   F12=Cancel   F13=How to use this display    
F24=More keys                                                                  
```

#### Menu Pathways

- Main Menu > SMA File Transfer menu (#8) > Manage SMAFT logging (#5) >F7
- From command entry, using the LSAM environment library list, enter STRSFTLOG

#### Fields

This screen is an IBM i command prompting screen. It behaves according to the operating system rules for prompted commands (similar, but not the same as screens that are presented by LSAM programs). The function controlled by each command parameter (screen field) is shown in the table below.

:::tip
It is only possible to choose the CLEAR (*YES) option for a log file if that logging feature is already stopped. If it is not stopped, the CLEAR function will fail and logging may not start up correctly. If the file is not being cleared, it does not matter if logging is already started.
:::


| Field                           | Default (Valid Values)  | Description             |
| -----                           | ------                  |    -------                      |
| OPTION (When to start logging)  | *IMMED (*CNTRLD)      | **\*IMMED** (immediate) causes a control message to be sent to either of the programs that perform logging functions, triggering them to make the necessary  change. |
|                         |                | **Note:** The *IMMED value also causes the configuration control file to be updated, so that the requested change always acts as a permanent change to the IBM i LSAM settings. |
|                         |                | **\*CNTRLD** tells the command processor program to store the change of the logging parameters in the IBM i LSAM configuration control file (LSAPARF00). The change does not take effect until the next time that  either program is   restarted. 
| FTSCMN (Log SMAFT Server communications?) | \*YES (\*NO) | **\*YES** tells the system to have the SMAFT Server communications programs (SMAFTSR00 and SMAFTSR01) log all of their input and output activity to the log file SFTLOGF10 as it runs in an IBM i job called SMAFTS.  |
|                         |                | **\*NO** tells the command processor not to perform any changes to the logging of the SMAFT S Setting this value to \*NO does not cause any active logging to stop, or turn off the log parameter in the IBM i configuration control file.    |
| CLRFTSCMN (Clear SMAFT Server comm log?) | \*YES (\*NO) | Have the system automatically clear the SMAFT Server communications log file (SFTLOGF10) so there is only one set of log entries that are for the current logging session.                |
|                         |                | **\*YES** clears the file when **Enter** is pressed, before the new log entries are made. (This logging function must be stopped for the Clear to be successful.)        |
|                         |                | **\*NO** keeps the entries that are already in the log file and adds to them.           |
|                         |                | **Note**: The system can clear the file using the STRSMALOG command or by using the SMASUP command. Optionally, an administrator, programmer or support technician with proper authority can clear the log file manually from command entry any time the file is not in active use.             |
| FTSDUMP (Detail SMAFT Server comm log?) | \*NO (*YES) | **\*YES**, the SMAFT Server communications program writes multiple log entries for every transaction that it receives from the port where it is listening. On an active system, a great many records might be logged very quickly. This has the potential of consuming a very large amount of disk space. The detailed logging feature should be used only for a very limited time to debug critical program problems. The detailed logging function is typically used in a test environment by programmers.     |
|                         |                | **\*NO** prevents turning on the detail logging function when logging starts.     |
|                         |                | **Note:** The detail logging function can only be turned off by completely stopping the log feature. Refer to [Turn Off Debug Logging](../logs-database/procedures#turn-off-debug-logging). There is no control that may be used to stop the detail logging function without also stopping all logging for the sockets communications program. If detail logging is turned on and it should end while continuing to perform standard debug logging, then all logging must be temporarily ended for the communications program and then restarted with the FTSDUMP parameter set to *NO.   |
| FTACMN (Log SMAFT Agent communications?)   | \*YES (\*NO) | **\*YES** tells the system to have the SMAFT Agent communications programs (SMAFTAR01) log all of its input and output activity to the log file SFTLOGF00.          |
|                         |                | **Note:** The SMAFT Agent program runs as the primary program in a job named by OpCon when SAM submits a file transfer job start request to the IBM i LSAM. When the job ends, the SMAFT Agent communications program ends. This log flag will control the logging of each submitted job.      |
|                         |                | **\*NO** tells the command processor not to perform any changes to the logging of the SMAFT Agent communications program.         |
|                         |                | **Note:** Setting this value to \*NO does not cause any active logging to stop, or turn off the log parameter in the IBM i configuration control file.                   |
| CLRFTACMN (Clear SMAFT Agent comm log?) | \*YES (\*NO) | Have the system automatically clear the SMAFT Agent communications log file (SFTLOGF00) so there is only one set of log entries that are for the current logging session.                |
|                         |                | **\*YES** clears the file when **Enter** is pressed, before the new log entries are made. (This logging function must be stopped for the Clear to be successful.)         |
|                         |                | **\*NO** keeps the entries that are already in the log file and adds to them.   |
|                         |                | **Note:** The system can clear the file using the STRSMALOG command, or using the SMASUP command. Optionally, an administrator, programmer or support technician with proper authority can clear the log file manually from command entry any time the file is not in active use.             |
| FTADUMP (Detail SMAFT Agent comm log?) | \*NO (\*YES) | **\*YES**, the SMAFT Agent  communications program writes multiple log entries for every transaction that it receives from the port where it is listening. On an active system, a great many records might be logged very quickly. This has the potential of consuming a very large amount of disk space. The detailed logging feature should be used only for a very limited time to debug critical program problems. The detailed logging function is typically used in a test environment by programmers.        |
|                         |                | **\*NO** prevents turning on the detail logging function when logging starts.  |
|                         |                | **Note:** The detail logging function can only be turned off by completely stopping the log feature. Refer to [Turn Off Debug Logging](../logs-database/procedures#turn-off-debug-logging). There is no control that may be used to stop the detail logging function without also stopping all logging for the sockets communications program. If detail logging is turned on and it should end while continuing to perform standard debug logging, then all logging must be temporarily ended for the communications program and then restarted with the FTADUMP parameter set to \*NO. |

#### Options

None

#### Functions

- **F3=Exit**: Abandons all changes and return to the menu.
- **F4=Prompt**: Shows all valid values for a parameter field.
- **F5=Refresh**: Resets all the command parameters to their default values.
- **F12=Cancel**: Abandons all changes and returns to the Manage LSAM Logging status display.
- **F13=How to use this display**: The IBM default information that applies to all command prompting displays.
- **F24=More keys**: Shows other function keys that may be used.

#### More Keys

- **F9=All parameters**: This function key has no effect on this display.
- **F11=Keywords**: Toggles the display between the parameter key words and the prompting text that describes each parameter.
- **F14=Command string**: Shows the command and its parameters in the form that would be used if the command were typed manually. This command appears with a question mark in front of it because it was forced into prompt mode by a program call.
- **F15=Error messages**: Shows any error messages that a command validation program has produced, but this command has no command validation program.
- **F16=Command complete**: Has the same effect as pressing <**Enter**> to initiate the command action. Verify that the parameter values are set correctly before using this command key or <**Enter**>.

## ENDSFTLOG End SMAFT Logging

The ENDSFTLOG command presents a prompted set of parameters for the ENDLOGCMD command. The command parameters can be changed from the default values, enabling a choice of the logging functions to stop and how to stop them. Logging can be stopped immediately, or it can wait until the next time the IBM i LSAM facility is stopped.

### End SMAFT Logging
```
                          End SMAFT Logging (SFTENDLOG)                        
                                                                               
 Type choices, press Enter.                                                    
                                                                               
 When to end logging  . . . . . .   *IMMED        *CNTRLD, *IMMED              
 Stop SMAFT Agent comm log? . . .   *YES          *YES, *NO                    
 Stop SMAFT Server comm log?  . .   *YES          *YES, *NO                    
                                                                               
                                                                         Bottom
 F3=Exit   F4=Prompt   F5=Refresh   F12=Cancel   F13=How to use this display   
 F24=More keys                                                                 
```

#### Menu Pathways

- Main Menu > SMA File Transfer menu (#8) > Manage SMAFT logging (#5) >F8
- From command entry, using the LSAM environment library list, enter ENDSFTLOG

#### Fields

This screen is an IBM i command prompting screen. It behaves according to the operating system rules for prompted commands (similar, but not the same as screens that are presented by LSAM programs). The function controlled by each command parameter (screen field) is shown in the table below.


| Field                   | Default (Valid Values) | Description             |
| ----- | ----- | ------|
| OPTION (When to end logging)  | *IMMED (*CNTRLD) | **\*IMMED** (immediate) causes a control message to be sent to either of the programs that perform logging functions, triggering them to make the necessary change.             |
|                         |                | **\*CNTRLD** tells the command processor program to store the change of the logging parameters in the IBM i LSAM  configuration control file (LSAPARF00). The change does not take effect until the next time that  either program is restarted.   |
|                         |                | **Note:** \*IMMED also causes the configuration control file to be updated, so that the requested change always acts as a permanent change to the IBM i LSAM settings.   |
| FTSCMN (Stop SMAFT Server comm log?) | *YES (*NO) | **\*YES** tells the system to have the SMSAFT Server communications programs (SMAFTSR00 and SMAFTSR01) quit logging their input and output activity.           |
|                         |                | **\*NO** tells the command processor program not to perform any changes to the logging of the SMAFT Server communications programs.          |
| FTACMN (Stop SMAFT agent comm log?) | \*YES (\*NO) | **\*YES** tells the system to have the SMSAFT Agent communications program (SMAFTAR01) quit logging its input and output activity.        |
|                         |                | **\*NO** tells the command processor program not to perform any changes to the logging of the SMAFT Agent communications  program.            |

#### Functions

- **F3=Exit**: Abandons all changes and returns to the menu.
- **F4=Prompt**: Shows all valid values for a parameter field.
- **F5=Refresh**: Resets all the command parameters to their default values.
- **F12=Cancel**: Abandons all changes and returns to the Manage LSAM Logging status display.
- **F13=How to use this display**: The IBM default information that applies to all command prompting displays.
- **F24=More keys**: Shows other function keys that may be used.

#### More Keys

- **F9=All parameters**: This function key has no effect on this display
- **F11=Keywords**: Toggles the display between the parameter key words and the prompting text that describes each parameter.
- **F14=Command string**: Shows the command and its parameters in the form that would be used if the command were typed manually. This command appears with a question mark in front of it because it was forced into prompt mode by a program call.
- **F15=Error messages**: Shows any error messages that a command validation program has produced. This command has no command validation program.
- **F16=Command complete**: Has the same effect as pressing <**Enter**> to initiate the command action. Verify that the parameter values are set correctly before using this command key or <**Enter**>.

## Viewing the SMAFT Log Files

The available SMAFT log viewer functions may be accessed from a sub-menu that can be accessed from the Manage SMAFT Logging function using function key <**F9**> or from the SMA File Transfer menu #8, option 6.

### SFTLOGR2 - View LSAM Logs

#### Menu Pathways

- Main Menu > SMA File Transfer menu (#8) > Manage SMAFT logging (#5) >F9
- From command entry, using the LSAM environment library list, enter any one of the commands that appears on the View logs sub-menu

##### Fields

Type a number (1 -- 4) into the Selection entry field and press <**Enter**> to execute the selected viewer.


| Field           | Default (Valid Values) | Description                     |
|------           | ---------------------- | -----------                     |
| Selection entry | none (1 -- 14) | Type the number of the view function to use into this field. Press <**Enter**> to start the viewer.              |

#### Options

The individual log viewers are not documented in this documentation. These viewers are tools meant for use by support and technical personnel. The technical construction and operation of the LSAM software must be understood in order for these log views to be useful. The current set of SMA File Transfer viewing functions is simply a group of convenience commands that engage the IBM i command DSPPFM. The viewers do not format the raw data from the log files at this time.

#### Functions

- **F3=Exit**: Abandons the Manage SMAFT logging function and returns
    to the menu.
- **F12=Cancel**: Returns to the Manage SMAFT Logging display.
---
sidebar_label: 'Extracting Log and Master Files'
---

# Extracting Log and Master Files

Whenever SMA Support may request that a client extract LSAM log or master file content for problem analysis, a client may use either the SMASUP command (from an IBM i command entry line, if that is permitted at a given site) or the function key F15=Extract files, wherever that function key is supported.

For technical support personnel: after the SMASUP command (or F15=Extract files) function has been executed at least once, the LSAM utility command DSPSUPDTA can be used to display the Agent profile information. This block of information is sent to the OpCon server each time an Agent allows a new connection with the OpCon server, and it is also included with the log files extracted by the SMASUP command. The SMASUP command must be run at least once in order to generate the data viewed by the DSPSUPDTA command. The SMASUP command must also be executed to update the DSPSUPDTA data with the latest information, such as the current LSAM PTF level.

## SMASUP Command Prompting

Changes have been made to the SMASUP command used in the past, now eliminating the need for two of the original SMASUP command parameters. But the command actually still supports those command keywords in order to avoid causing problems for previously configured IBM i jobs, or other programs at client sites, that may already be referring to these command parameters. The parameters CLRLOG() and RESTART() are no longer used because they are replaced by new automatic Debug/Audit log file purging (as described in previous sections, referenced above).

As an IBM i command, the SMASUP command can be executed from anywhere that IBM i commands are supported. However, unlike some LSAM environment management commands that include library list management, this command does not manage a job's library list, therefore the LSAM environment libraries must be included in the library list of any job that will execute this command. The command syntax show below includes the library location of the command, although this may not be required in most circumstances where this command would be executed.

:::info example
```
SMAPGM/SMASUP LOGLIB(SEL) CLRLOG() RESTART() SEL_OPTS__() JOBTRK(0) 
MSGMGT(0) UTIL(0) OPRRPY(0) RSTMOD(0) JOBSCH(0) JORS(0) SPLF(0) 
SMAFT(0) FTPJOB(0) EXPIMP(0)]
```
:::

In the example above, three command parameter keywords are shown with no value included. The two parameters CLRLOG() and RESTART() are no longer supported, and they exist only to support any uses of this command from previous versions of the LSAM software. The SEL_OPTS__() keyword has no function; it is a hidden parameter that exists only to control the format of the prompting text (as illustrated in an example below), so that the conditional extract option keywords can be labeled with a heading.

All of the SEL option keywords that follow the LOGLIB(SEL) keyword have no effect when the LOGLIB() keyword is set to either value (LOG) or (LIB). But when the value LOGLIB(SEL) is specified, at least one of the following LSAM feature option fields should be set to a value of (1), otherwise no file extract will be performed.

The keywords for each parameter shown in the following two figures are listed above in the SMASUP command syntax.

#### Prompted SMASUP Command (Default)
```
       Extract LSAM Logs and Files (SMASUP)
          
            Type choices, press Enter.
          
           Submit SMASUP job? . . . . . . .   N             N=no, Y=yes
          Save selected, logs or library     LOG           SEL, LOG, LIB
         Clear (not used) . . . . . . . .                 (No longer used)
         Restart (not used) . . . . . . .                 (No longer used)
            SEL log file options:     
          
          
      Bottom
     

F3=Exit   F4=Prompt   F5=Refresh   F12=Cancel   F13=How to use this display  
   F24=More keys
```
To view and manage the SEL (selection) parameters, type the letters "SEL" in the field "Save selected, logs or library" and then press <**Enter**>. When this LOGLIB() parameter has been changed from LOG or LIB to SEL, pressing Enter will not cause the command to execute but will only redisplay the command prompt with additional keywords.

#### Prompted SMASUP Command (SEL Fields)
```
     Extract LSAM Logs and Files (SMASUP)
        
          Type choices, press Enter.
        
         Submit SMASUP job? . . . . . . .   N             N=no, Y=yes
        Save selected, logs or library     SEL           SEL, LOG, LIB
       Clear (not used) . . . . . . . .                 (No longer used)
       Restart (not used) . . . . . . .                 (No longer used)
          SEL log file options:      
Save Job Track/Capture logs? . .   0             0=no, 1=Logs, 2=+Mstr, 3=Mstr 
Save Message Management logs?  .   0             0=no, 1=Logs, 2=+Mstr, 3=Mstr
Save Utility/SCANSPLF logs?  . .   0             0=no, 1=Logs, 2=+Mstr, 3=Mstr
Save Operator Replay logs? . . .   0             0=no, 1=Logs, 2=+Mstr, 3=Mstr
Save Restricted Mode logs? . . .   0             0=no, 1=Logs, 2=+Mstr, 3=Mstr
Save Job Schedule logs?  . . . .   0             0=no, 1=Logs, 2=+Mstr, 3=Mstr
Save JORS server logs? . . . . .   0             0=no, 1=Logs, 2=+Mstr, 3=Mstr
Save SPLF server logs? . . . . .   0             0=no, 1=Logs, 2=+Mstr, 3=Mstr
Save SMA File Transfer logs? . .   0             0=no, 1=Logs, 2=+Mstr, 3=Mstr
Save simple FTP job logs?  . . .   0             0=no, 1=Logs, 2=+Mstr, 3=Mstr
Save GENEMLREQ logs? . . . . . .   0             0=no, 1=Logs, 2=+Mstr, 3=Mstr
   More\...
        
(after pressing PageDown to see More\...)

Save Export/Import logs? . . . .   0             0=no, 1=Logs, 2=+Mstr, 3=Mstr
       Bottom

  F3=Exit   F4=Prompt   F5=Refresh   F12=Cancel   F13=How to use this display
 F24=More keys
```

## F15 = Extract Log Files (SMASUP Command)

### MNGLOGR3 or MNGLOGR4 - Extract LSAM Logs and Files

#### Menu Pathways

- Main Menu > LSAM management menu (#6) > option 4 > F15
- Main Menu > LSAM management menu (#6) > option 4 > F2 > F15
- Main Menu > LSAM management menu (#6) > option 5 > F15

#### Options

The IBM i command DSPSAVF can be used to see the content of the extract save file that will be created in the SMALOG library. This display will show exactly which files are saved for each combination of extract options and LSAM features, according to the following options selected for each LSAM feature:

- **0=No files saved**: Any LSAM feature showing option 0 will have  none of its log or master files saved. It is common to leave all the fields set to 0 except for just one LSAM feature, in order to maintain a small size of the IBM i save file that will be produced. 
- **1=Save log files only**: A pre-programmed list of log files that pertain to each LSAM feature will be saved in the extract save file. 
- **2=Save log files & master files**: A pre-programmed list of log and master files that pertain to each LSAM feature will be saved in the extract save file.
- **3=Save master files only**: A pre-programmed list of log and master files that pertain to each LSAM feature will be saved in the extract save file.

#### Functions

- **F3=Exit**: Returns to the LSAM menu system.
- **F5=Refresh**: The display program updates all the information about every control record. This refresh option is important when trying to verify the results of the option 8 Test Notify job. 
- **F12=Cancel**: Returns to the previous LSAM display from which the F15 was executed, without performing any file extract.
- **Enter**: After the desired field options are typed, press Enter to  submit or start the file extract operation. As documented elsewhere in the **IBM i LSAM** documentation, a completion message will be displayed both in the QSYSOPR message queue and the user's (or workstation's) message queue, reporting the exact name of the save  file that was created in library SMALOG. Use this save file name when transferring the save file from the IBM i DB2 database to an external computer (such as a personal computer), from which the save file can then be easily sent to the SMA ftp server location that pertains to each client.

#### Fields

 The fields on the Extract LSAM Logs and Files display format are self-explanatory.

## Operation of Extracting LSAM Log and Master Files

The use of the Extract LSAM Logs function is explained on the interactive prompt screen and in the sections above that describe the SMASUP command and the display format for F15 = Extract files. After selecting the appropriate processing options, press <**Enter**> to complete the extract process. If the extract process was executed from an interactive job (submit option set to N = no), a completion message will appear at the bottom of the prompt display.

Note the format of the extract save file name appearing in the completion message. The extract save file is named LyMMddhhmm (one digit of the year, plus month, day, hours and minutes). This format should make it easy to track these save files in case they are needed for problem studies or as a backup of the entire SMADTA library. Extract save files are placed in the SMALOG library, even if an alternate LSAM environment is being used. (The SMALOG library is created by the extract utility program the first time it runs, if it does not already exist.)

The same completion message will also be sent to the IBM i Operator Message Queue (usually QSYSOPR). If the job is submitted, this message will be delivered to both the Operator Message queue and to the message queue for the submitting user ID.

Record the name of the save file displayed in the completion message because it will be needed during the FTP (or other file transfer) process of copying the save file and sending it to SMA Support.

:::tip
It is usually necessary to turn on the LSAM logging functions, using the documented Manage LSAM Logging function, before a useful log file extract can be performed. Trace logging is not performed during normal LSAM operations because it could impact system performance. SMA technical support can provide detailed instructions about which type of logging to enable and which LSAM functions to execute before a log file extract is completed.
:::

## Delivering the LSAM File Extract to SMA Technical Support

The LSAM file extract process produces an IBM i save file in library SMALOG. This save file can be transferred using FTP from the System i (or IBM Power server) disk to, for example, a Windows PC. It can then be attached to an eMail  message if it is not too large, or it can be transferred to an SMA FTP site. SMA Support can provide detailed instructions to assist with the process of transferring the save file.

The extract save files have been improved to be smaller than in previous LSAM releases by using IBM i software data compression, and by an improved selective process that limits the number of files saved. The extract process produces IBM i save files that are marked for the same IBM i version under which the files are created. SMA Support can accommodate all currently supported versions of IBM i.

One typical method of using FTP to transfer the save file from IBM i to a PC Windows workstation is illustrated in the following example instructions.

### FTP the Logs Save File

1. From a Microsoft Windows system, use FTP to transfer the logs save file to a personal computer hard disk directory from the IBM i library SMALOG. The save file is transferred to the MS Windows machine by a binary FTP transfer from IBM i acting as the FTP server, using the following steps.
:::tip
The ftp command format used in the following example assumes that the IBM i FTP Server attributes have been set to use the name formatting for the IBM i DB2 library system, that is, SITE NAMEFMT 0. To change the FTP Server attributes from the UNIX path name format (SITE NAMEFMT 1), use this command:```CHGFTPA NAMEFMT(*LIB) LISTFMT(*DFT)```It is possible to prompt the CHGFTPA command using function key F4 to view the current settings of the FTP Server. If changes are not needed to those settings, exit the command prompt using function key F3=Exit.
:::
2. Use menu path: **Start > Run**.
3. Type **cmd**.
4. Click **OK**.
5. If desired, change the drive reference to a convenient location on the personal computer hard disk by entering the drive letter followed by a colon (:).
:::tip
C:\other_directory>cd C:\
:::
6. As desired, change the directory to a location where it will be easy to find the transferred file, for example, the root directory of drive C(:)
:::tip
C:\other_directory>cd C:\
:::
7. At the prompt, enter **ftp** \<LSAM Machine Name or TCP/IP address>.
8. Log in as **QSECOFR** with the appropriate \<QSECOFR password\> or it may be possible to log in and retrieve the logs save file with the user profile name that created the logs save file, such as an LSAM Administrator user profile.
9. Enter **bin** to select a binary transfer type.
10. Enter **GET SMALOG/L601101648** (using the actual log file name reported in the SMASUP command completion message) to retrieve the logs save file, using the actual log file name from the extract process completion message.
11. Enter **quit** to exit the FTP utility.
12. Enter **exit** to close the command entry window.

:::info example
```
The following shows a typical FTP procedure in a DOS command window.
C:\>ftp <LSAM Machine Name or TCP/IP address>
Connected to <LSAM Machine Name or TCP/IP Address>.
220-QTCP at <IBM i_name>
220 Connection will close if idle more than 5 minutes.
User (<IP_address>:(none)): QSECOFR
331 Enter Password.
Password: <QSECOFR password>
230 User QSECOFR logged in.
ftp> bin
200 Representation type is binary IMAGE.
ftp> GET SMALOG/L601101648
200 PORT subcommand successful.
150 Retrieving member L601101648 in file L6101101648 in library
SMALOG.
250 File transfer completed successfully.
ftp: ______ bytes received in __.__ seconds __.__ Kbytes/sec
ftp> quit
221 QUIT subcommand received
C:\>exit
```
:::
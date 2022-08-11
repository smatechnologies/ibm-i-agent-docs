---
sidebar_label: 'LSAM Programs and Files'
---

# IBM i LSAM Programs and Files

## Listing LSAM Files and Programs

The programs and files used by the IBM i LSAM are contained within three product libraries, except for a short list of objects that are stored in the LSAM utility library, SMAGPL. There is also an option to store some of the contents of SMAGPL in the IBM i QGPL library. In addition to the product libraries there are two utility libraries called SMALOG and SMABAK. SMALOG is used to store the save files created by the SMASUP command, and indirectly by the SMARGZ database reorganization utility. SMABAK is a library that is created as necessary and utilized by the SMA File Transfer programs to perform data file backups as requested by SMA File Transfer jobs.

In order to obtain a list of the files or programs that are part of the LSAM software product, use any of the IBM i commands to list the objects in each of the product libraries listed in the IBM i LSAM default library names table. When there are multiple LSAM environments installed, use the command SMALIBINQ to discover the actual names of the libraries that represent each of the default product library names in the following table.

##### IBM i LSAM Default Library Names
| Library Name  | Description |
| :----------:  | ----------- |
| SMAGPL        | The LSAM utilities library, used primarily to support multiple IBM i LSAM environments within a single IBM i partition.|
| SMADTA        | This is the name of the database library. It stores physical and logical files, data areas, data queues, and other IBM i objects that need to be defined differently for each LSAM environment installed within the same IBM i partition. It is not necessary to have multiple copies of the LSAM environment, but when a test and a live environment exist in the same partition, they are each governed by the content of their own copy of SMADTA.|
| SMAPTF        | <ul><li>This is the name of the program patches support library. This library is primarily used only to store backup save files containing objects that were replaced by program temporary fixes (PTFs) supplied by SMA in between LSAM product releases. The patches fix program problems that need to be repaired.</li><li>If there is a need to insert user-specific modifications into the LSAM software (not recommended), all custom programs should be located in this library rather than the SMAPGM library. Otherwise, the SMAPTF library contains only the PTF backup save files, used to support PTF rollback (unapply) features.</li></ul> **Notes**: SMA Technologies does not recommend storing custom programming within the LSAM environment. Prior to LSAM version 04.00.00, SMAPTF contained replacement copies of programs that were originally installed in the SMAPGM library. Now the PTF application process actually replaces the programs in SMAPGM, and it keeps a backup save file for each PTF. The backup save file is stored in library SMAPTF.|
| SMAPGM        | This is the name of the LSAM program objects library. This library contains commands, programs, display and printer file definitions, and other objects that are unlikely to change when multiple LSAM environments are being used. No custom modifications or program patches should be installed in this library. SMA product upgrade procedures will not protect custom modifications when the LSAM software is upgraded to a new release level.|
| SMABAK        | Not required in LSAM operations library lists, this library is created as necessary and utilized by the SMA File Transfer Agent programs to perform data file backups as requested by SMA File Transfer job requests.|
| SMALOG        | Not required in LSAM operations library lists. This library is used by all LSAM environments to store debug log file extract save files, and also complete SMADTA library save files, produced by the SMASUP command. The SMARGZ command calls SMASUP, so it also utilizes this library.|

To obtain a list of all objects that are relocated to the IBM i QGPL library, if that option is selected, use the LSAM function Work with object authority (LSAM menu 9, option 8). Use the function key F15=Subset to limit the list to "SMAGPL copy". When the subsetted list is displayed, the column "GPL" will show either a 1 or a 2 for each object listed. All objects marked 2 will always remain in the SMAGPL library. Objects marked with a 1 will be moved to the QGPL library, if that option is selected during the LSAM installation (or upgrade) process.

More information about using the Work with objects function can be found in [LSAM Security and Object Authority](../security/strategy.md).

## IBM i LSAM Job-ending Message Table File

The LSAM server program that checks message queue SMAMSGQ (in the SMADTA library) for job-ending messages uses a table file called LSAMSGF00 to determine which message IDs mean that a job has ended normally or abnormally. This file is not meant to be updated by LSAM software users because any changes to this file could disrupt LSAM operations and prevent the LSAM from properly managing jobs for OpCon.

However, SMA technical personnel could add records to this file to accommodate the unique needs of third-party software, in cases where non-IBM messages would be issued by that software to report the job completion status. To modify this file, please contact SMA technical support.

:::tip
Job completion messages are routed to the LSAM's own message queue, SMAMSGQ (located in the SMADTA library, or its equivalent in another LSAM environment) by the LSAM automatically setting the MSGQ parameter on the SBMJOB command. There are various IBM messages that may be sent only to the system operator message queue (typically QSYS/QSYSOPR) when, for example, an operator performs an ENDJOB command. In such cases, since the job itself did not report the completion status, the MSGQ parameter of the SBMJOB command cannot be honored. Certain third-party software may create similar complex situations that could require a custom solution from SMA to accommodate those jobs. Please contact SMA technical support for further information.

Please also refer to the LSAM Parameters option to use Job Completion Message Management, described in IBM i LSAM Configuration. This option supports user-defined responses when third-party software may sometimes cause other types of messages requiring response to be sent to the job completion message queue.
:::

SMA technical support personnel will utilize the following table file column values to add job completion messages.

- **LMMSGID**: The message ID that the LSAM should recognize, e.g., CPF1241.
- **LMRSPTYP**: The response type, one of the following values:
  - **JOBOK**: Indicates that this messages is reporting successful completion of the job.
  - **JOBNOK**: Indicates that this message is reporting the failure of a job.
  - **MSGW**: Indicates that the message is reporting that the job is stuck waiting for an operator response to a message. Do not use this value without consulting with the SMA IBM i LSAM Technical Product Manager, because any other messages using this response type code may require additional programming.

## Generic Programs for Testing IBM i LSAM

Three generic programs are distributed with library SMAPGM for use in testing OpCon software and job configuration parameters.

| Program    | Purpose |
| -------    | ------- |
| GCRTDTAARA | Generic test program: Create &DTAARA at &LIB|
| GCRTFIL    | Generic test program: Create &FILE at &LIB|
| GP         | Generic program: Delay job for &Parm secs. (4.0)|

:::tip
Please verify the authority of the test job user to execute the test programs. Most of the IBM i LSAM software is distributed with \*PUBLIC authority set to \*REVOKE. The LSAM default user profile set in the LSAM Parameters (LSAM main menu, function 7) which is QSYSOPR may not have been granted authority to use these programs. If not, QSECOFR can grant \*USE authority to these programs for QSYSOPR (or another test user configured in OpCon), either using the GRTOBJAUT command or using option 2 from the WRKOBJ command.
:::

Following is the IBM i command syntax for calling each of these three generic programs, and also a fourth recommendation for another type of test job.

IBM i naming rules always apply. These are listed in this **IBM i LSAM** documentation, but a brief summary is provided here.

- Maximum name size is 10 characters.
- Assume all capital letters, because the operating system will change to that anyway under DB2/400.
- Must begin with an alpha character: some special characters are allowed, but don't use them - use A - Z, except do NOT use Q because it is reserved for IBM objects as a de facto standard.
- The name may contain digits and special characters, but in general, the best rule is to restrict names to A - Z and the ten digits and to not use special characters.

### GCRTDTAARA: Create Data Area

#### Syntax

```shell
CALL SMAPGM/GCRTDTAARA PARM('data_area_name' 'library_name')
```

#### Purposes and Uses

Use this program to create a data area, in order to test the IBM i LSAM utility CHKDTAARA (as documented in the **IBM i LSAM** documentation). Thus, it is possible to create an OpCon job with a pre-run check for a data area, and use this generic program to actually create that data area either before or after the job that has the pre-run check. Note that an attempt to create the same data area twice in the same library will cause this program to return a failure code. Some suggested libraries that could be used are QUSRTEMP, QUSRSYS or QGPL. To remove this data area use the following command:

```shell
DLTDTAARA DTAARA(library_name/data_area_name)
```

### GCRTFIL: Create File

#### Syntax

```shell
CALL SMAPGM/GCRTFIL PARM('file_name' 'library_name')
```

#### Purposes and Uses

This command will create an empty physical file in the DB2/400 database with a fixed record length of 80 bytes. Use this program to create a file, in order to test the IBM i LSAM utility CHKFIL (as documented in the **IBM i LSAM** documentation). Thus, it is possible to create an OpCon job with a pre-run check for a file, and use this generic program to actually create that file either before or after the job that has the pre-run check. Note that an attempt to create the same file twice in the same library will cause this program to return a failure code. Some suggested libraries that could be used are QUSRTEMP, QUSRSYS or QGPL. This file can be removed with the following command:

```shell
DLTF FILE(library_name/file_name)
```

### GP: Generic Program (Delay Job)

#### Syntax

```shell
CALL SMAPGM/GP PARM('0010')
```

The syntax of this command shows that the number of seconds is expressed as a character string of length 4. Enclose this string with single quotes and specify all four digits in order to obtain the expected result.

#### Purposes and Uses

This program simply executes a Delay Job (DLYJOB) command. Thus, the job starts and it will stay active for as many seconds as are specified. CAUTION: 9999 seconds is a very long time! Use a reasonable value so that the job does not stay active forever. (There is no output from this job, unless job master parameters are specified that will force a job log to be created.)

### DSPLIBL: Display Job Library List

A useful IBM i command that makes a good test job.

#### Syntax

```shell
DSPLIBL *PRINT
```

#### Purposes and Uses

This command creates a report file that lists the job's library list that was in effect when the job was executed. This command makes an excellent tool for debugging the IBM i job master definitions, since the library list of a job is so important. It helps to verify that the Job Description and the Initial Library List parameter (and the Current Library parameter) are working as expected to define a job. The report can be viewed by using the IBM i command entry and typing the following command:

```shell
WRKJOB job_name
```

There may be more than one job with the same name, in which case select the most recent job, based on the highest job number listed. Then use option 4 from the Work with Job menu, and finally use option 5=Display to view the contents of the spool file (the report).

## LSAM Program Custom Modifications

SMA does not recommend that any modifications be made to its software. The task of controlling IBM i operations requires careful coordination between the LSAM and OpCon. Also, whenever SMA may issue an upgrade to the IBM i LSAM software, the presence of a custom modification would require special analysis and possibly additional procedures that would not be documented in the standard installation instructions.

:::danger warning
Be advised that if an SMA client attempts to modify or add to the IBM i LSAM software, any support issues that arise from such changes could be subject to time and materials billing from SMA, depending on the terms of the contract with SMA.
:::

When choosing to take advantage of the IBM i LSAM software commands that function as an API (application program interface) to the LSAM operations and to OpCon controls, SMA recommends that custom programming be stored in a library or directory that is outside of the LSAM environment library list. Be aware that new versions of the LSAM software could potentially change the API commands, so SMA recommends re-verifying any use of the LSAM API commands as an LSAM software upgrade is evaluated and tested before using the upgrade in a live production environment.

SMA recognizes that utilizing the LSAM commands from non-SMA software might best be implemented by adding certain programs or commands to the existing LSAM library list. If this strategy is required, then all custom modifications must be located in the SMAPTF library (or its equivalent). Do not add any objects to the SMAPGM base programs library (or its equivalent).

If any custom modifications are added to the SMAPTF library, be aware that this library is subject to being cleared and replaced when LSAM software upgrade procedures are executed. Therefore, always backup this library before performing any LSAM software upgrades, and then re-apply any required custom modifications to the SMAPTF library (or its equivalent) after an upgrade has been completed.

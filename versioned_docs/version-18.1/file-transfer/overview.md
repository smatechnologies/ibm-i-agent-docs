---
sidebar_label: 'SMA File Transfer'
---

# SMA File Transfer

The IBM i Agent software includes programs and tools that support SMA's proprietary file transfer protocol. OpCon supports a unique job type just for file transfer jobs between systems, and the SMA file transfer protocol enables transfer of data between similar or dissimilar computer systems. This protocol and the jobs that support it are often referred to with the acronym SMAFT (SMA File Transfer).

The IBM i Agent SMAFT programs enable the LSAM to act as an SMAFT Agent that requests files be transferred to or from other systems, and as an SMAFT Server that responds to file transfer requests from other system Agents. The IBM i Agent SMAFT tools are used to configure permanent options that govern the performance and function of the IBM i SMAFT programs. There are also tools that can be used to monitor SMAFT jobs and to diagnose problems that might arise as files are being transferred.

In addition to this topic, refer to the following references in the **Concepts** documentation for more information about OpCon SMAFT jobs:

- [File Transfer Jobs](https://help.smatechnologies.com/opcon/core/job-types/file-transfer)
- [IBM i File Transfer Options Support](https://help.smatechnologies.com/opcon/core/job-types/file-transfer#ibm-i-file-transfer-options-support)

This topic explains the aspects of SMAFT jobs that are unique to the IBM i LSAM. It also provides instructions about how to use the IBM i LSAM software tools to configure and diagnose SMAFT jobs.

## The SMA File Transfer Process

In order to successfully complete the configuration of both IBM i work management and the IBM i LSAM parameters for SMA File Transfer jobs, it is important to understand the roles and purpose of the tasks that participate in completing an OpCon SMAFT job. There are some characteristics that apply generally to every SMAFT job, regardless of the systems involved, and other characteristics that are unique to the IBM i LSAM -- often differing from the way SMAFT is supported by LSAMs running under other operating systems.

### SMA File Transfer Job Flow

Here are the steps that define the lifetime of one SMAFT job:

1. A unique SMAFT job type is assigned to a job master record on an OpCon schedule.

    - The job master names the source machine and the target machine as well as the name and location, for each machine, of the file being transferred.

    - There are also some SMAFT functional options defined on the job master.

    - The run-time attributes of an SMAFT job are not defined on the OpCon job master, as with jobs of type IBM i. A method for controlling the IBM i task run attributes is defined below.

    - Other OpCon jobs on the same Schedule may be used to execute pre-transfer tasks or post-transfer tasks that affect the files, the data and/or the attributes of file transfer jobs.

2. When the OpCon Schedule determines it is time to run the SMA File Transfer job, the job start request is sent to one of the LSAMs participating in the transfer, either at the source or the target. 

3. The LSAM receiving the file transfer job start request from OpCon becomes the SMAFT Agent.

    - The job of an SMAFT Agent is to contact a remote SMAFT Server, to manage negotiation of the file transfer attributes and to report the job completion status to OpCon.

    - The SMAFT job definition controls whether the Agent will pull a file from a Server or push a file to the Server.

4. The SMAFT Server must have a process listening for file transfer requests at a specific TCP/IP port.

    - The SMAFT Agent job is given the IP address of the Server machine as a job start parameter.

    - The port number where the SMAFT Server is listening at the remote machine is also provided to the SMAFT Agent with the job start request.

    - Once the SMAFT Agent makes contact with the designated SMAFT Server the actual file transfer process becomes active.

5. An SMA File Transfer task begins with the SMAFT Agent exchanging information with the Server.

    - The SMA proprietary file transfer protocol defines exactly how the Agent and the Server exchange job parameters.

    - A decision is made about the capabilities of the two machines.

    - If either machine cannot support the required parameters of the file transfer job, as defined in the OpCon job master, the protocol information exchange ends and the OpCon job is marked failed.

    - As part of the file transfer preparation process, the target machine is able to complete any file management tasks, such as backups, creating new target files or setting up an existing file to have more data appended to it.

6. Whenever the SMAFT job encounters a critical error, the file transfer process is stopped and error messages are sent back to the OpCon SAM as the job is marked failed.

    - If the remote SMAFT Server has reported the error, the report is made to the SMAFT Agent.
 
    - The SMAFT Agent job is the actual job that corresponds to the OpCon Schedule job master, so the SMAFT Agent always has the responsibility of reporting the file transfer job status, error messages or successful completion messages to the OpCon SAM.

7. Once the SMAFT Agent and Server have agreed on the file transfer parameters, the participant that is has the Source role starts sending data packets to its partner that is the Target (or Destination).

    - Both the SMAFT Agent and the SMAFT Server are involved in any necessary character set translation. This aspect of a file transfer is controlled in part by parameters on the OpCon job master record for the file transfer.

    - Optional encryption and compression, when available, are handled by cooperation between the SMAFT Agent and the SMAFT Server.

8. After the Source machine sends the last data packet, an end-of-transfer message with a final count of bytes transferred completes the process. Then the Agent and the Server assure that the target file has been written to its intended destination before a final job status report is sent to OpCon.

9. The SMAFT Agent sends a successful job completion message to the OpCon SAM after all data and the end-of-transfer message have been received.

    - The method of cooperation between an SMAFT Agent task and the LSAM's job scheduling functions may vary among the LSAMs running under different operating systems.

    - The IBM i LSAM job scheduler is able to retrieve a list of information and/or error messages that the SMAFT Agent job has stored in a special SMAFT file, but the LSAM uses its normal IBM i job completion handler routines for the SMAFT Agent job, the same as for any other OpCon job.

10. An ideal method of signaling other programs when a transferred file is ready to process would be to create another job on the OpCon Schedule that only executes when the actual file transfer job completes successfully. Another OpCon tool that could be used would be to set a threshold value when the file transfer job completes successfully. These methods may be more efficient and flexible than simply checking for the presence of a file on the target system.

### Method for Controlling the IBM i Task Attributes

The IBM i LSAM starts a SMA File Transfer (SMAFT) Agent job when it receives a job start request from OpCon 1. Most job start requests sent to IBM i are for IBM i batch jobs where the OpCon job master record supports specifying IBM i job definition parameters (that correspond to the parameters of the IBM i SBMJOB - submit job - command). However, SMAFT jobs involve multiple operating systems, so OpCon does not support control of the IBM i Agent job parameters. Instead, the IBM i LSAM job scheduling server program always uses the IBM i job description called SMAFTAJ00 (located in library SMADTA) to start the SMAFT Agent job. Therefore, most SMAFT Agent job parameters can be controlled by making changes to this job description. The initial library list used by this job description must always include the library list that defines the LSAM environment, but any other job parameter can be changed, including changing the job queue (and therefore, the IBM i subsystem) where the job will be submitted. The IBM i LSAM Server job parameters are controlled by the job description SMADTA/SMAFTSJ00. (Refer to [IBM i SMAFT Flow Chart](#ibm-i-sma-file-transfer-flow-chart).)

### SMA File Transfer Job Completion Messages

The IBM i SMA File Transfer conforms to the general OpCon rule that one or more completion or error messages will be sent to the OpCon SAM, where they will be logged as Detailed Job Messages under the Job Configuration menu available for each job on a Schedule (accessed, e.g., from the right mouse context menu).

The IBM i SMAFT programs may sometimes send important error messages to the IBM i operator's message queue (usually QSYSOPR), and they may also record information about errors in the SMAFT log files, when debug logging is turned on. But in all  cases, an effort is made to communicate all SMAFT error conditions to OpCon using XML field codes that allow this information to be logged as one or more Detailed Job Messages.

The IBM i SMAFT Agent also sends a final count of bytes received for each file to OpCon so that it can be logged as a Detailed Job Message.

### SMA File Transfer Object Authority for IBM i

The IBM i SMA File Transfer function operates according to a basic set of rules for managing the object authority of transferred files it receives via SMAFT Agent jobs to write to the disk space managed by IBM i. Files may be written to either the DB2 native database, or to the IFS (integrated file system, referring to flat file systems outside of the DB2 database such as the root(/) file system).

The general rules that apply are:

- When an existing file is being replaced or having data added to it, the file will retain the object authority it had previously. Obviously, the user specified for the SMA File Transfer job must have authority to use that file object.
- When a file will be added to the system, that is, as it is created by the SMA File Transfer job, the file will assume the authorities of the library (DB2) or directory (IFS) in which it is created. Again, the SMA File Transfer job user must have authority to add objects to the file or directory.

When other forms of object authority must be managed, use additional OpCon jobs on the same schedule as the file transfer job that will execute either before or after the file transfer job itself.

### SMA File Transfer Data Character Sets for IBM i

This discussion of the character sets of data files ignores binary data streams, because by definition the SMA File Transfer process is not supposed to interpret binary data. It simply passes the data between the two systems.

OpCon File Transfer job master records support a general specification of the type of data found in the source file. When the type of data is text, that is character data and not a binary stream, the job master also supports an indication of the general category of data that is found in the source file: ASCII or EBCDIC. It is allowed to specify a different general character set for the target file, in which case the SMA File Transfer jobs will perform data translation.

In the special case of where the SMA File Transfer job has specified Default Text as the general character set of the data, each operating system will make different assumptions about what is the default character set (either ASCII or EBCDIC) for that operating system. The IBM i SMAFT servers will make two different assumptions for Default Text, depending on the location of the file. Data found or stored in the UDB DB2 (DB2/400) native database will be assumed to be EBCDIC data,
unless there is information to the contrary (refer to next paragraphs). In contrast, data found or stored in the IFS will be assumed to be ASCII data.

In almost all cases, data files managed by IBM i are labeled with a CCSID code that indicates the exact character set assigned to the data in each file. The rules are actually complex, because single files (or tables) can possibly contain fields (or columns) that have unique CCSID codes assigned to them. The IBM i implementation of SMA File Transfer does not try to address field- or column-specific CCSID codes. Files that contain mixed CCSID codes must be handled as binary objects in SMA 
File Transfer jobs; otherwise the data could become corrupted by the IBM i CCSID translation functions.

Due to the wide variety of international character sets supported by IBM's IBM i operating system, the IBM i SMA File Transfer communications programs always attempt to discover and honor the CCSID that pertains to each SMAFT source or target  file. For example, if a non-IBM remote SMAFT Server sends a text file with ASCII characters, the IBM i Agent job will attempt to translate from the (default) ASCII CCSID code specified in the IBM i SMAFT Parameters to the actual CCSID code of the target file. SMA File Transfer users can, therefore, take specific control over file transfer process by using tools such as OpCon jobs that run before the SMAFT job to do things like create new files and assign them a specific CCSID code.

### Common Character Set and the IBM i SMAFT Default Character Sets

The SMA File Transfer protocol includes specification of a Common Character set that can be used when two computer systems normally use different character sets. In virtually all cases, if two systems have different character sets, ASCII will be specified as the common character set. In most cases where character sets of data are different, the difference will be between EBCDIC and ASCII.

However, the IBM i SMAFT implementation anticipates that foreign language environments may actually be using a unique CCSID for the ASCII character sets on their personal computers and/or UNIX operating environments. Therefore, the IBM i SMAFT Parameters supports specification of a default CCSID for each of the ASCII and EBCDIC character sets. This enables the IBM i SMAFT programs to produce predictable results when translating character sets according to the method described above.

:::tip
Do not confuse the translation tables specified in the SMAFT Parameters with the CCSID codes. The translation tables are used only for the SMAFT communications protocol between the SMAFT Agent and Server running on different systems, where the common language is ASCII but the IBM i programs must translate the ASCII protocol text into EBCDIC for the communications programs to interpret them. The CCSID codes are used as a default value for the transferred data packets sent and received by SMA File Transfer. The IBM i SMAFT programs use CCSID translation routines (APIs) to accomplish data packet translation, rather than referring to translation tables.
:::

SMA realizes that it could be difficult to accurately define the character set conditions of any given environment. Please contact SMA Support for technical assistance with setting SMA File Transfer parameters and job master definitions.

### IBM i SMAFT Flow Chart

This flow chart illustrates the primary components of an SMA File Transfer job, as if the transfer were between two copies of IBM i. It may be helpful to refer to this diagram when adjusting the IBM i work management objects and tuning the performance of IBM i SMA File Transfer servers and sub-programs.

The flow chart represents a PULL file transfer, where OpCon starts a SMAFT Agent job that contacts a remote Server and requests that the remote Server send the file to the Agent. OpCon also supports a PUSH model, where the Agent job performs the tasks illustrated within the Source Machine, and in that case the remote machine performs the tasks illustrated for the target machine; in other words, the IBM i SMAFT Agent job contacts the remote Server and notifies it that a file will be sent to it. However, for a PUSH transfer, the Agent is still responsible for reporting the job status to OpCon.

### IBM i SMA File Transfer Flow Chart

![IBM i SMA File Transfer Flow Chart](../Resources/Images/IBM-i/IBM-i-SMA-File-Transfer-Flow-Chart-2.png "IBM i SMA File Transfer Flow Chart")
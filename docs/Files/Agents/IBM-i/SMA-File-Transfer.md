---
lang: en-us
title: SMA File Transfer
viewport: width=device-width, initial-scale=1.0
---

# SMA File Transfer

The IBM i Agent software includes programs and tools that support SMA\'s
proprietary file transfer protocol. OpCon supports a unique job type
just for file transfer jobs between systems, and the SMA file transfer
protocol enables transfer of data between similar or dissimilar computer
systems. This protocol and the jobs that support it are often referred
to with the acronym SMAFT (SMA File Transfer).

 

The IBM i Agent SMAFT programs enable the LSAM to act as an SMAFT Agent
that requests files be transferred to or from other systems, and as an
SMAFT Server that responds to file transfer requests from other system
Agents. The IBM i Agent SMAFT tools are used to configure permanent
options that govern the performance and function of the IBM i SMAFT
programs. There are also tools that can be used to monitor SMAFT jobs
and to diagnose problems that might arise as files are being
transferred.

 

In addition to this topic, refer to the following references in the
**Concepts** online help for more information about OpCon SMAFT jobs:

-   [File Transfer     Jobs](https://help.smatechnologies.com/opcon/core/latest/Files/Concepts/File-Transfer-Jobs.md#top){.MCXref
    .xref}
-   [File Transfer Job     Details](https://help.smatechnologies.com/opcon/core/latest/Files/Concepts/File-Transfer-Job-Details.md#top){.MCXref
    .xref}

[]{#aanchor3} This topic explains the aspects of SMAFT jobs that are unique to the IBM i LSAM. It also provides instructions about how to use
the IBM i LSAM software tools to configure and diagnose SMAFT jobs.

## The SMA File Transfer Process

In order to successfully complete the configuration of both IBM i work
management and the IBM i LSAM parameters for SMA File Transfer jobs, it
is important to understand the roles and purpose of the tasks that
participate in completing an OpCon/xps SMAFT job. There are some
characteristics that apply generally to every SMAFT job, regardless of
the systems involved, and other characteristics that are unique to the
IBM i LSAM -- often differing from the way SMAFT is supported by LSAMs
running under other operating systems.

### SMA File Transfer Job Flow

Here are the steps that define the lifetime of one SMAFT job:

1.  A unique SMAFT job type is assigned to a job master record on an
    OpCon/xps schedule.
    a.  The job master names the source machine and the target machine
        as well as the name and location, for each machine, of the file
        being transferred.
    b.  There are also some SMAFT functional options defined on the job
        master.
    c.  The run-time attributes of an SMAFT job are not defined on the
        OpCon/xps job master, as with jobs of type IBM i. A method for
        controlling the IBM i task run attributes is defined below.
    d.  Other OpCon/xps jobs on the same Schedule may be used to execute
        pre-transfer tasks or post-transfer tasks that affect the files,
        the data and/or the attributes of file transfer jobs.
2.  When the OpCon/xps Schedule determines it is time to run the SMA
    File Transfer job, the job start request is sent to one of the LSAMs
    participating in the transfer, either at the source or the target.
3.  The LSAM receiving the file transfer job start request from OpCon
    becomes the SMAFT Agent.
    a.  The job of an SMAFT Agent is to contact a remote SMAFT Server,
        to manage negotiation of the file transfer attributes and to
        report the job completion status to OpCon.
    b.  The SMAFT job definition controls whether the Agent will pull a
        file from a Server or push a file to the Server.
4.  The SMAFT Server must have a process listening for file transfer
    requests at a specific TCP/IP port.
    a.  The SMAFT Agent job is given the IP address of the Server
        machine as a job start parameter.
    b.  The port number where the SMAFT Server is listening at the
        remote machine is also provided to the SMAFT Agent with the job
        start request.
    c.  Once the SMAFT Agent makes contact with the designated SMAFT
        Server the actual file transfer process becomes active.
5.  An SMA File Transfer task begins with the SMAFT Agent exchanging
    information with the Server.
    a.  The SMA proprietary file transfer protocol defines exactly how
        the Agent and the Server exchange job parameters.
    b.  A decision is made about the capabilities of the two machines.
    c.  If either machine cannot support the required parameters of the
        file transfer job, as defined in the OpCon job master, the
        protocol information exchange ends and the OpCon job is marked
        failed.
    d.  As part of the file transfer preparation process, the target
        machine is able to complete any file management tasks, such as
        backups, creating new target files or setting up an existing
        file to have more data appended to it.
6.  Whenever the SMAFT job encounters a critical error, the file
    transfer process is stopped and error messages are sent back to the
    OpCon SAM as the job is marked failed.
    a.  If the remote SMAFT Server has reported the error, the report is
        made to the SMAFT Agent.
    b.  The SMAFT Agent job is the actual job that corresponds to the
        OpCon Schedule job master, so the SMAFT Agent always has the
        responsibility of reporting the file transfer job status, error
        messages or successful completion messages to the OpCon SAM.
7.  Once the SMAFT Agent and Server have agreed on the file transfer
    parameters, the participant that is has the Source role starts
    sending data packets to its partner that is the Target (or
    Destination).
    a.  Both the SMAFT Agent and the SMAFT Server are involved in any
        necessary character set translation. This aspect of a file
        transfer is controlled in part by parameters on the OpCon job
        master record for the file transfer.
    b.  Optional encryption and compression, when available, are handled
        by cooperation between the SMAFT Agent and the SMAFT Server.
8.  After the Source machine sends the last data packet, an
    end-of-transfer message with a final count of bytes transferred
    completes the process. Then the Agent and the Server assure that the
    target file has been written to its intended destination before a
    final job status report is sent to OpCon.
9.  The SMAFT Agent sends a successful job completion message to the
    OpCon SAM after all data and the end-of-transfer message have been
    received.
    a.  The method of cooperation between an SMAFT Agent task and the
        LSAM\'s job scheduling functions may vary among the LSAMs
        running under different operating systems.
    b.  The IBM i LSAM job scheduler is able to retrieve a list of
        information and/or error messages that the SMAFT Agent job has
        stored in a special SMAFT file, but the LSAM uses its normal IBM
        i job completion handler routines for the SMAFT Agent job, the
        same as for any other OpCon job.
10. An ideal method of signaling other programs when a transferred file
    is ready to process would be to create another job on the OpCon
    Schedule that only executes when the actual file transfer job
    completes successfully. Another OpCon tool that could be used would
    be to set a threshold value when the file transfer job completes
    successfully. These methods may be more efficient and flexible than
    simply checking for the presence of a file on the target system.

### Method for Controlling the IBM i Task Attributes

The IBM i LSAM starts a SMA File Transfer (SMAFT) Agent job when it
receives a job start request from OpCon 1. Most job start requests sent
to IBM i are for IBM i batch jobs where the OpCon job master record
supports specifying IBM i job definition parameters (that correspond to
the parameters of the IBM i SBMJOB - submit job - command). However,
SMAFT jobs involve multiple operating systems, so OpCon does not support
control of the IBM i Agent job parameters. Instead, the IBM i LSAM job
scheduling server program always uses the IBM i job description called
SMAFTAJ00 (located in library SMADTA) to start the SMAFT Agent job.
Therefore, most SMAFT Agent job parameters can be controlled by making
changes to this job description. The initial library list used by this
job description must always include the library list that defines the
LSAM environment, but any other job parameter can be changed, including
changing the job queue (and therefore, the IBM i subsystem) where the
job will be submitted. The IBM i LSAM Server job parameters are
controlled by the job description SMADTA/SMAFTSJ00. (Refer to [IBM i SMAFT Flow Chart](#IBM).)

### SMA File Transfer Job Completion Messages

The IBM i SMA File Transfer conforms to the general OpCon/xps rule that
one or more completion or error messages will be sent to the OpCon/xps
SAM, where they will be logged as Detailed Job Messages under the Job
Configuration menu available for each job on a Schedule (accessed, e.g.,
from the right mouse context menu).

 

The IBM i SMAFT programs may sometimes send important error messages to
the IBM i operator\'s message queue (usually QSYSOPR), and they may also
record information about errors in the SMAFT log files, when debug
logging is turned on. But in all cases, an effort is made to communicate
all SMAFT error conditions to OpCon/xps using XML field codes that allow
this information to be logged as one or more Detailed Job Messages.

 

The IBM i SMAFT Agent also sends a final count of bytes received for
each file to OpCon/xps so that it can be logged as a Detailed Job
Message.

### SMA File Transfer Object Authority for IBM i

The IBM i SMA File Transfer function operates according to a basic set
of rules for managing the object authority of transferred files it
receives via SMAFT Agent jobs to write to the disk space managed by IBM
i. Files may be written to either the UDB DB2 (DB2/400) native database,
or to the IFS (integrated file system).

 

The general rules that apply are:

-   When an existing file is being replaced or having data added to it,
    the file will retain the object authority it had previously.
    Obviously, the user specified for the SMA File Transfer job must
    have authority to use that file object.
-   When a file will be added to the system, that is, as it is created
    by the SMA File Transfer job, the file will assume the authorities
    of the library (DB2) or directory (IFS) in which it is created.
    Again, the SMA File Transfer job user must have authority to add
    objects to the file or directory.

When other forms of object authority must be managed, use additional
OpCon/xps jobs on the same schedule as the file transfer job that will
execute either before or after the file transfer job itself.

### SMA File Transfer Data Character Sets for IBM i

This discussion of the character sets of data files ignores binary data
streams, because by definition the SMA File Transfer process is not
supposed to interpret binary data. It simply passes the data between the
two systems.

 

OpCon/xps File Transfer job master records support a general
specification of the type of data found in the source file. When the
type of data is text, that is character data and not a binary stream,
the job master also supports an indication of the general category of
data that is found in the source file: ASCII or EBCDIC. It is allowed to
specify a different general character set for the target file, in which
case the SMA File Transfer jobs will perform data translation.

 

In the special case of where the SMA File Transfer job has specified
Default Text as the general character set of the data, each operating
system will make different assumptions about what is the default
character set (either ASCII or EBCDIC) for that operating system. The
IBM i SMAFT servers will make two different assumptions for Default
Text, depending on the location of the file. Data found or stored in the
UDB DB2 (DB2/400) native database will be assumed to be EBCDIC data,
unless there is information to the contrary (refer to next paragraphs).
In contrast, data found or stored in the IFS will be assumed to be ASCII
data.

 

In almost all cases, data files managed by IBM i are labeled with a
CCSID code that indicates the exact character set assigned to the data
in each file. The rules are actually complex, because single files (or
tables) can possibly contain fields (or columns) that have unique CCSID
codes assigned to them. The IBM i implementation of SMA File Transfer
does not try to address field- or column-specific CCSID codes. Files
that contain mixed CCSID codes must be handled as binary objects in SMA
File Transfer jobs; otherwise the data could become corrupted by the IBM
i CCSID translation functions.

 

Due to the wide variety of international character sets supported by
IBM\'s IBM i operating system, the IBM i SMA File Transfer
communications programs always attempt to discover and honor the CCSID
that pertains to each SMAFT source or target file. For example, if a
non-IBM remote SMAFT Server sends a text file with ASCII characters, the
IBM i Agent job will attempt to translate from the (default) ASCII CCSID
code specified in the IBM i SMAFT Parameters to the actual CCSID code of
the target file. SMA File Transfer users can, therefore, take specific
control over file transfer process by using tools such as OpCon/xps jobs
that run before the SMAFT job to do things like create new files and
assign them a specific CCSID code.

#### Common Character Set and the IBM i SMAFT Default Character Sets

The SMA File Transfer protocol includes specification of a Common
Character set that can be used when two computer systems normally use
different character sets. In virtually all cases, if two systems have
different character sets, ASCII will be specified as the common
character set. In most cases where character sets of data are different,
the difference will be between EBCDIC and ASCII.

 

However, the IBM i SMAFT implementation anticipates that foreign
language environments may actually be using a unique CCSID for the ASCII
character sets on their personal computers and/or UNIX operating
environments. Therefore, the IBM i SMAFT Parameters supports
specification of a default CCSID for each of the ASCII and EBCDIC
character sets. This enables the IBM i SMAFT programs to produce
predictable results when translating character sets according to the
method described above.

 

  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [Do not confuse the translation tables specified in the SMAFT Parameters with the CCSID codes. The translation tables are used only for the SMAFT communications protocol between the SMAFT Agent and Server running on different systems, where the common language is ASCII but the IBM i programs must translate the ASCII protocol text into EBCDIC for the communications programs to interpret them. The CCSID codes are used as a default value for the transferred data packets sent and received by SMA File Transfer. The IBM i SMAFT programs use CCSID translation routines (APIs) to accomplish data packet translation, rather than referring to translation tables.]
  -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

SMA realizes that it could be difficult to accurately define the
character set conditions of any given environment. Please contact SMA
Support for technical assistance with setting SMA File Transfer
parameters and job master definitions.

### IBM i SMAFT Flow Chart

This flow chart illustrates the primary components of an SMA File
Transfer job, as if the transfer were between two copies of IBM i. It
may be helpful to refer to this diagram when adjusting the IBM i work
management objects and tuning the performance of IBM i SMA File Transfer
servers and sub-programs.

 

The flow chart represents a PULL file transfer, where OpCon starts a
SMAFT Agent job that contacts a remote Server and requests that the
remote Server send the file to the Agent. OpCon also supports a PUSH
model, where the Agent job performs the tasks illustrated within the
Source Machine, and in that case the remote machine performs the tasks
illustrated for the target machine; in other words, the IBM i SMAFT
Agent job contacts the remote Server and notifies it that a file will be
sent to it. However, for a PUSH transfer, the Agent is still responsible
for reporting the job status to OpCon.

IBM i SMA File Transfer Flow Chart

![IBM i SMA File Transfer Flow Chart](../../../Resources/Images/IBM-i/IBM-i-SMA-File-Transfer-Flow-Chart-2.png "IBM i SMA File Transfer Flow Chart")

## SMA File Transfer Operations

### SMAFT Parameters -- Critical Configuration Settings

The SMA File Transfer parameters for the IBM i LSAM are discussed in
detail below, under the SMA File Transfer Screens and Windows. Before
the IBM i LSAM SMAFT Server is started or SMAFT Agent jobs may be
submitted to the IBM i LSAM, it is required to set the following
parameters:

-   The SMAFT Server IP Address must be specified in the IBM i SMAFT
    Parameters. Currently, this same address is used for both LSAM job
    scheduling transactions and for SMA File Transfer communications
    with the IBM i LSAM, so this IP address must be the same as the IP
    address specified for the LSAM Parameters.
-   Confirm and/or update the SMAFT Server Port setting in the IBM i
    SMAFT Parameters.
-   Confirm and/or update the SMAFT Agent port range start value in the
    IBM i SMAFT Parameters.

In addition to the IBM i SMAFT Parameter settings, the following
parameters must be set in the OpCon machine table record, advanced
settings, under the File Transfer Settings tab, for this IBM i system:

-   TCP/IP Address: The LSAM will send the value from the IBM i LSAM
    SMAFT Parameters automatically whenever the LSAM first connects to
    the OpCon server.
-   File Transfer Settings: File Transfer Role = set this to \"Both\"
    because the IBM i LSAM supports both the PUSH and PULL file transfer
    methods (that is, the file transfer job can be started on the Source
    machine or the Target machine, as specified in the OpCon job master
    record for each job).
-   File Transfer Settings: File Transfer Port Number = this must match
    the SMAFT Server Port setting in the IBM i SMAFT Parameters, so that
    this number may be sent to the SMAFT Agent on other LSAMs,
    instructing them how to contact the IBM i SMAFT Server.

### SMAFT Network Address Translation Table

A Network Address Translation (NAT) table is available for the SMA File
Transfer Agent. This table supports translating the OpCon Machine IP
Address for a remote SMAFT Server to a different IP address and/or port,
such as a local virtual IP address. Please contact SMA Support for
assistance with using this feature. It should only be required if you
have configured virtual IBM i partitions that are hosted by a Host IBM i
partition, depending on the method used by the Host partition to serve
IP address connection to the hosted partitions.

#### Example Use Case

One proven case where a NAT table was required involved the IBM i host
partition that was hosting one or more client partitions. These
partitions were configured to use the IBM i network address translation
(NAT) method for communications traffic routing. The public IP addresses
of the client partitions were being contacted at the host partition, and
then the host partition used its IBM i NAT to find and use the local
virtual IP address for forwarding data communication traffic.

 

The OpCon Agent for IBM i, rather than be configured to use IBM i APIs
to query the IBM i NAT, instead has been configured to use its own NAT
table. This strategy was considered to be less sensitive to any changes
in the IBM i operating system, and it may also be more likely compatible
with other (currently untested) methods of forwarding network traffic
from a host partition to a client partition.

 

In this example use case, the host partition received a SMAFT job start
request from OpCon. The job start request instructed the host partition
to use the public IP address for one of its hosted (client) partitions.
However, the host could not use the public IP address for its SMAFT
sockets communication method because that address is actually contacted,
initially, at the host itself. In order to effectively establish a
direct connection between the host and its client partition, the SMAFT
NAT table provided the local virtual IP address (and port) that should
be used by the OpCon LSAM SMAFT Agent communication program to open a
socket connection with the client partition.

#### Work with SMAFT Agent NAT Table

The maintenance function to add NAT table records is found in LSAM
sub-menu 8 as menu option 8.

 

Use this maintenance function to add or change SMAFT Agent NAT table
entries that will enable a connection between virtualized IBM i
partitions, when the public IP address for the SMAFT Server is not
supported from the SMAFT Agent partition for this type of communication
connection.

 

Each SMAFT Agent NAT table entry is comprised of the following fields,
where all data values are required:

-   Original IP address
-   Original port number
-   New IP address
-   New port number

Refer to the SMA File Transfer Screens and Windows section, below, for
details about using the SMAFT Agent NAT Table maintenance function.

### Start SMA File Transfer Server (STRSMAFT)

The Start SMAFT Server option tells the LSAM to listen for SMAFT file
transfer requests from other LSAMs. The SMAFT Server job started
automatically whenever the LSAM servers are started. The automatic start
option is documented below under the topic SMAFT Parameters. The
following procedure describes how to manually start the SMAFT Server
when the automatic option is not being used.

 

[Start SMAFT Server]{.ul} 
1.  In the command line, enter **SMAGPL/STRSMA**. For more information,
    refer to [The STRSMA     Command](Components-and-Operation.md#The).
2.  Enter **8** to choose the **SMAFT File Transfer** menu in the SMA
    Main Menu.
3.  Enter **1** to choose the Start SMAFT Server (STRSMAFT) option in
    the SMA File Transfer menu.
4.  The result of starting the SMAFT Server is that job SMAFTS is
    submitted to the LSAM subsystem configured in the LSAM Parameters.
    Confirm that the SMAFT Server is active by using the Check LSAM
    subsystem status, as follows.
5.  Enter **8** to choose the **SMAFT File Transfer menu** (if not
    already there) in the SMA Main Menu.
6.  Enter **3** to Work with SMAFT jobs in the SMA File Transfer menu.
7.  Confirm that job SMAFTS is running among the active jobs in the
    subsystem.

### End SMAFT Server (ENDSMAFT)

The End SMAFT Server option tells the LSAM to discontinue listening for
SMA File Transfer requests.

 

[End SMAFT Server]{.ul} 
1.  In the command line, enter **SMAGPL/STRSMA**. For more information,
    refer to [The STRSMA     Command](Components-and-Operation.md#The).
2.  Enter **8** to choose the **SMA File Transfer** menu in the SMA Main
    Menu.
3.  Enter **2** to choose the **End SMAFT Server** (ENDSMAFT) option in
    the SMA File Transfer menu.
4.  The result of ending the SMAFT Server is that job SMAFTS is ended
    from the LSAM subsystem configured in the LSAM Parameters. Confirm
    that the SMAFT Server is no longer active by using the Check LSAM
    subsystem status, as follows.
5.  Enter **8** to choose the **SMA File Transfer menu** (if not already
    there) in the SMA Main Menu.
6.  Enter **3** to Work with SMAFT jobs in the SMA File Transfer menu.
7.  Confirm that job SMAFTS is NOT present among the active jobs in the
    subsystem.

### Specifying IBM i Files in OpCon/xps EM Job Master

The OpCon/xps EM uses a unique job type for SMA File Transfer jobs that
is not specific to any one operating system. The operating system at
either the Source or Destination end of a file transfer is implied by
the Machine name that is selected as the Source or the Destination.

 

When the selected Machine is running IBM i and the file or table being
transferred is stored in the DB2 UDB native database (not the IFS), the
Source File or the Destination File is specified in the following
manner:

 

**LIBRARY/FILE(MEMBER)**

 

\...where (MEMBER) is optional. The concept of a file data member is
unique to IBM i. Most DB2 UDB database files, and all SQL tables have
only one (implied) data member, so it is usually not necessary to
specify the member name. The exception is when data is read from, or
written to a source physical file, such as program source files that
store multiple members for each program\'s source code.

 

Consider the following application notes when SMA File Transfer is used
with files controlled by IBM i:

-   It may sometimes be convenient to use SMA File Transfer to extract a
    program source member from the DB2 database file that is stored in
    EBCDIC and specify that SMAFT should translate that source member to
    an ASCII character set as the source member is transferred to a MS
    Windows stream file. This procedure would make it convenient to open
    and read the source member using a Windows file editor.
-   The IBM i special file (object) type of Save File appears to be a
    database file with binary content. Save files are actually comprised
    of records that are 512 bytes in length, as the data is stored under
    DB2 UDB. The SMA IBM i LSAM SMAFT programs recognize this important,
    special file type and they know how to extract or restore save files
    that have been removed and later sent back to the database. This
    means it is possible, using the SMAFT Binary file transfer Data
    Type, to send a save file to any other type of system, and then to
    restore that save file to any other IBM i database. In order to
    assure that the save file contents will be preserved, the
    Destination save file must exist (defining it as a save file using
    the CRTSAVF command), and the SMAFT option to overwrite an existing
    file should be specified.

#### Identifying Attributes of Files Sent to IBM i

Some operating systems make it impossible for the SMA File Transfer
programs to determine the exact definition of how data is stored in a
file. For example, stream files sent from MS Windows or from a UNIX or
Linux system to IBM i may actually include fixed-length records, but
only the user of the file knows about this attribute because a basic
stream file from these operating systems does not store this type of
attribute with the file object (as is the case with DB2 database files
within the IBM i operating system).

 

In these cases, it may be desirable to tell the IBM i SMAFT program(s)
about the record length by adding a special extension to the Destination
File Name field in the OpCon SMA File Transfer job master record.

##### ,REC=00000

Only certain LSAMs support this special convention; the IBM i LSAM is
one of these.

 

Following the Destination File Name, add a comma immediately after the
last non-blank character of the file name, then type the special keyword
string REC= and also 1 to 5 digits that represent the fixed length of
the record in the file.

 

+----------------------------------+----------------------------------+
| ![White pencil icon on green     | **EXAMPLE:** [A MS Windows       | | circular                         | stream file is known to contain  |
| background](../../../Reso        | fixed-length records that are    |
| urces/Images/example-icon(48x48) | each 80 bytes long. The file     |
| .png "Example icon") | must be transferred to an IBM i  |
|                                  | DB2 database file. The           |
|                                  | Destination File Name field in   |
|                                  | the OpCon File Transfer job      |
|                                  | master record is entered using   |
|                                  | the IBM i DB2 file name format   |
|                                  | and extended by the special REC= |
|                                  | keyword as                       |
|                                  | follows:]{.Exampletxt}           |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | **. TARGETLIB/FILENAME,REC=80**  |
+----------------------------------+----------------------------------+

 

It is not necessary to use the REC= keyword if the target file already
exists in the IBM i DB2 database because the IBM i LSAM SMAFT programs
are able to extract the record length value from the existing DB2 file.
However, when a new file must be created, then the IBM i LSAM SMAFT
programs can rely on the REC= keyword to set the value of the file
record length as the new file is being created.

## SMA File Transfer Menu

SMA File Transfer Menu

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------
  [SYSTEMNAME                   ]{style="color: #008000;"}SMA FILE TRANSFER MENU                     [00/00/00]{style="color: #008000;"}   USERNAME                                                                16:23:53
   
   Select one of the following:
   
   
       1. [Start SMAFT Server (STRSMAFT)]{style="color: #008000;"}        2. [End SMAFT Server (ENDSMAFT)]{style="color: #008000;"}
       3. [Work with SMAFT jobs (WRKSFTJOB)]{style="color: #008000;"}        4. [Manage SMAFT Logging]{style="color: #008000;"}
       5. [View LSAM Logs]{style="color: #008000;"}        6. [View SMAFT Logs]{style="color: #008000;"}
       7. [SMAFT Parameters]{style="color: #008000;"}    
   
  Selection or command
   ===\> \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
  \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
   F3=Exit   F4=Prompt   F9=Retrieve   F12=Cancel
   F13=Information Assistant   F16=System main menu
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------

###### Menu Pathways

Main Menu \> SMA File Transfer menu (\#8)

###### Options

-   1=Start SMAFT Server (STRSMAFT)
-   2=End SMAFT Server (ENDSMAFT)
-   3=Work with SMAFT jobs (WRKSFTJOB)
-   4=Manage SMAFT Logging
-   5=View LSAM Logs
-   6=View SMAFT Logs
-   7=SMAFT Parameters
-   The start and stop options 1 and 2 are explained on the previous
    page; other options appear below.

###### Functions

-   **F3=Exit**: Returns to the master menu.
-   **F4=Prompt**: Prompts for keywords for any command entered in the
    Select or command line.
-   **F9=Retrieve**: Retrieves the previous command that was entered on
    the Select or the command line. If it is pressed multiple times, the
    system goes further and further back to previous commands.
-   **F12=Cancel**: Returns to the master menu.
-   **F13=Information Assistant**: Branches to the IBM i general help
    screen.
-   **F16=System main menu**: This is always shown on any
    system-generated menu screen. It branches to the general command
    entry menu for IBM i. Return to the previous menu by pressing
    \<**F3**\> or \<**F12**\>. This function is not commonly used and
    can be restricted for certain user profiles.

### Start SMAFT Server (STRSMAFT)

The Start SMAFT Server option starts the IBM i LSAM\'s SMA File Transfer
listener job named SMAFTS in the LSAM subsystem (default name SMASBS).
Use the LSAM management function \"work with SMAFT jobs\" or \"Check
LSAM subsystem status\" to verify that the server job has been started.
Refer to [SMAFT Parameters -- Critical Configuration Settings](#SMAFT) for a setting that causes the SMAFT
server to be started automatically with the other LSAM server jobs.

### End SMAFT Server (ENDSMAFT)

The End SMAFT Server option stops only the IBM i LSAM\'s SMA File
Transfer listener job (SMAFTS) that is running in the LSAM subsystem.
Use the LSAM management function \"Work with SMAFT jobs\" or \"Check
LSAM subsystem status\" to verify that job SMAFTS is no longer active in
the subsystem. The SMAFTS server job will also be stopped automatically
whenever the End LSAM function terminates all the LSAM server jobs.

### Work with SMAFT Jobs (WRKSFTJOB)

The Work with SMAFT jobs function is currently the same as the Check
LSAM Subsystem Status option found on the LSAM Management menu. Both
execute the IBM i command WRKACTJOB (i.e., Work with Active Jobs). The
command displays the jobs active in the LSAM subsystem defined in the
LSAM configuration parameters. From the WRKACTJOB display, press the
Help key to view a complete description of all the data displayed.

 

  ------------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------
  ![White triangle icon on yellow circlular background](../../../Resources/Images/caution-icon(48x48).png "Caution icon")   **CAUTION:** [Unless directed by SMA Support, please do not execute any of the options on the following screen.]
  ------------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------

Work with Active Jobs Screen

  ----------------------------------------------------------------------------------------------------------------------------------------------------------
                               Work with Active Jobs                  [SYSTEMNAME]{style="color: #008000;"}                                                               00/00/00  03:45:13
  CPU %:      .0     Elapsed time:   00:00:00     Active jobs:   143
   
  Type options, press Enter.
    2=Change   3=Hold   4=End   5=Work with   6=Release   7=Display message
    8=Work with spooled files   13=Disconnect \...
   
  Opt  Subsystem/Job  User        Type  CPU %  Function        Status
  \_\_   SMASBS         QSYS        SBS      .0                   DEQW
  \_\_     LSAMNG       SMANET      BCH      .0  PGM-DLTLOGR00    DEQW
  \_\_     MSGMNG       SMANET      BCH      .0  PGM-LSARCMR00    DEQA
  \_\_     SKTCMN       SMANET      BCH      .0  PGM-CMNSKTR00    TIMW
  \_\_     TXMMNG       SMANET      BCH      .0  PGM-LSASCHR00    DEQW
  \_\_     LSAJOR       SMANET      BCH      .0  PGM-LSAJORR00    DEQW
  \_\_     JORCMN       SMANET      BCH      .0  PGM-JORCMNR00    DEQW
  \_\_     SMAFTS       SMANET      BCH      .0  PGM-SMAFTSR00    DEQW
   
  Bottom
  Parameters or command
  ===\> \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
  F3=Exit   F5=Refresh       F7=Find      F10=Restart statistics
  F11=Display elapsed data   F12=Cancel   F23=More options   F24=More keys
  ----------------------------------------------------------------------------------------------------------------------------------------------------------

###### Menu Pathways

Main Menu \> SMA File Transfer menu (\#8) \> Work with SMAFT jobs (\#3)

### Manage SMAFT Logging

The IBM i LSAM supports active control over SMAFT logging capabilities.
Logging is a local function useful to system administrators, programmers
and support technicians. For a complete description of how to use the
logging features in general, refer to [Log File and Database Management](Log-File-and-Database-Management.md#top){.MCXref
.xref}. The SMAFT logging control function is described below, under SMA
File Transfer Screens and Windows.

#### View LSAM Logs

This menu option provides direct access to the list of available LSAM
log viewers. This is the same function that is available from the LSAM
Management menu option \# 5. It is reproduced here for the convenience
of technical support personnel who may be diagnosing SMA File Transfer
jobs. For more information about how to use the log views, refer to
[Viewing the LSAM Log Files](Log-File-and-Database-Management.md#Viewing){.MCXref
.xref}.

#### View SMAFT Logs

This menu option provides direct access to the list of available SMA
File Transfer log viewers. For general information about how to use the
log views, refer to [Viewing the SMAFT Log Files](#Viewing){.MCXref
.xref}. Specific information about the SMA File Transfer log views is
available below, under SMA File Transfer Screens and Windows.

### SMAFT Parameters

The SMAFT Parameters function is used to set options that govern how the
IBM i LSAM supports SMA File Transfer jobs. This option is discussed in
detail below, under SMA File Transfer Screens and Windows.

## SMA File Transfer Screens and Windows

### SMAFT Parameters

-   **Screen Title**: SMAFT Configuration Parameters
-   **Screen ID**:
    -   SFTPARR00-1
    -   SFTPARR00-2
    -   SFTPARR00-3

The screens show typical default values that would be appropriate for
most installations. The notable exceptions are the IP address, and
perhaps the port numbers. There may be a need to change the CCSID and
translation tables, depending on the country and the text language used
on the OpCon/xps server.

###### Menu Pathways

Main Menu \> SMA File Transfer menu (\#8) \> SMAFT Parameters (\#4)

###### Fields

+----------------------+----------------------+----------------------+
| Field                | Default              | Description          |
+======================+:====================:+======================+
| SMAFT Server Ext IP  | None -- use F4 to    | This is the IP       |
| Address              | see a list of        | address where the    |
|                      | available values     | SMA File Transfer    |
|                      |                      | Server port may be   |
|                      |                      | found by other       |
|                      |                      | OpCon/xps LSAMs      |
|                      |                      | whose SMAFT Agents   |
|                      |                      | will contact this    |
|                      |                      | Server to request a  |
|                      |                      | file.                |
+----------------------+----------------------+----------------------+
| SMAFT Server Int IP  | \*EXT                | Most IBM i           |
| Address              |                      | partitions will      |
|                      |                      | directly support an  |
|                      |                      | Interface to the     |
|                      |                      | External (or Public) |
|                      |                      | IP Address that is   |
|                      |                      | used by OpCon to     |
|                      |                      | tell other Agents    |
|                      |                      | where they can       |
|                      |                      | connect to this      |
|                      |                      | Agent for SMA File   |
|                      |                      | Transfer jobs. When  |
|                      |                      | this is the case,    |
|                      |                      | just leave the       |
|                      |                      | Internal IP Address  |
|                      |                      | field set to \*EXT.  |
|                      |                      | The External IP      |
|                      |                      | Address is available |
|                      |                      | for the Bind IP?     |
|                      |                      | Option.              |
|                      |                      |                      |
|                      |                      |                      |
|                      |                      |                      |
|                      |                      | However, when        |
|                      |                      | port-forwarding is   |
|                      |                      | being used by Client |
|                      |                      | IBM i (virtual)      |
|                      |                      | partitions, as they  |
|                      |                      | are supported by a   |
|                      |                      | (physical) Host      |
|                      |                      | partition, then it   |
|                      |                      | is necessary to      |
|                      |                      | specify an IP        |
|                      |                      | Address that can be  |
|                      |                      | directly accessed    |
|                      |                      | \"internally\" by    |
|                      |                      | the virtual, client  |
|                      |                      | partition, in order  |
|                      |                      | to support the Bind  |
|                      |                      | IP? option.          |
+----------------------+----------------------+----------------------+
| Bind to specific IP? | N                    | The original         |
|                      |                      | behavior of the LSAM |
|                      |                      | communications       |
|                      |                      | programs was to      |
|                      |                      | request any          |
|                      |                      | available IP         |
|                      |                      | Interface where they |
|                      |                      | can bind their       |
|                      |                      | designated Ports and |
|                      |                      | then use that        |
|                      |                      | connection point to  |
|                      |                      | accept a socket      |
|                      |                      | connection request   |
|                      |                      | from the OpCon       |
|                      |                      | server.              |
|                      |                      |                      |
|                      |                      |                      |
|                      |                      |                      |
|                      |                      | It is often          |
|                      |                      | preferred, and       |
|                      |                      | possibly more        |
|                      |                      | secure, to bind the  |
|                      |                      | Port to a specific   |
|                      |                      | IP address. This     |
|                      |                      | ability is required  |
|                      |                      | if an Internal IP    |
|                      |                      | address (such as a   |
|                      |                      | Virtual LAN address) |
|                      |                      | will be used to      |
|                      |                      | support the OpCon    |
|                      |                      | server\'s connection |
|                      |                      | to the designated    |
|                      |                      | External IP.         |
+----------------------+----------------------+----------------------+
| SMAFT Server Port    | 3301                 | The port that should |
|                      |                      | be used by the SMAFT |
|                      |                      | Server job, to       |
|                      |                      | listen for file      |
|                      |                      | transfer requests    |
|                      |                      | incoming from SMAFT  |
|                      |                      | Agents on other      |
|                      |                      | systems. Note that   |
|                      |                      | the IBM i LSAM does  |
|                      |                      | not share its JORS   |
|                      |                      | port with SMAFT, as  |
|                      |                      | may be the case with |
|                      |                      | other OpCon/xps      |
|                      |                      | LSAMs.               |
+----------------------+----------------------+----------------------+
| Agent port range     | 31000                | The first port       |
| start                |                      | number that should   |
|                      |                      | be used by this IBM  |
|                      |                      | i LSAM when it       |
|                      |                      | starts an SMAFT      |
|                      |                      | Agent job. The       |
|                      |                      | Agent\'s port number |
|                      |                      | is used to form a    |
|                      |                      | socket connection    |
|                      |                      | with a remote SMAFT  |
|                      |                      | Server. There can be |
|                      |                      | as many different    |
|                      |                      | Agent port numbers   |
|                      |                      | used on this system  |
|                      |                      | as are allowed by    |
|                      |                      | the Max Concurrent   |
|                      |                      | FT Jobs parameter,   |
|                      |                      | below. Be sure that  |
|                      |                      | the Agent port range |
|                      |                      | start number plus    |
|                      |                      | the Max FT Jobs      |
|                      |                      | count will not cause |
|                      |                      | a port to be used    |
|                      |                      | that is already      |
|                      |                      | assigned to another  |
|                      |                      | service that exists  |
|                      |                      | in the network with  |
|                      |                      | this copy of IBM i.  |
+----------------------+----------------------+----------------------+
| Use IPv6 protocol?   | N (= no)             | N=no, Y=yes. It is   |
|                      |                      | possible for the IBM |
|                      |                      | i LSAM               |
|                      |                      | communications       |
|                      |                      | programs to use IPv6 |
|                      |                      | protocol. However,   |
|                      |                      | do not set this flag |
|                      |                      | to Y=yes without     |
|                      |                      | contacting SMA       |
|                      |                      | support to review    |
|                      |                      | your environment and |
|                      |                      | also coordinate with |
|                      |                      | OpCon/xps SMANetCom  |
|                      |                      | abilities.           |
+----------------------+----------------------+----------------------+
| Auto-start Server?   | Y (= yes)            | The IBM i LSAM       |
|                      |                      | general server       |
|                      |                      | startup procedures   |
|                      |                      | should also          |
|                      |                      | automatically start  |
|                      |                      | the SMAFT Server     |
|                      |                      | communications       |
|                      |                      | program.             |
+----------------------+----------------------+----------------------+
| Max Concurrent FT    | None (1 -- 999)      | This parameter has   |
| Jobs                 |                      | two effects:         |
|                      |                      |                      |
|                      |                      | -   The total number |
|                      |                      |     of concurrent    |
|                      |                      |     SMA File         |
|                      |                      |     Transfer jobs    |
|                      |                      |     running in this  |
|                      |                      |     LSAM environment |
|                      |                      |     (that is,        |
|                      |                      |     usually in the   |
|                      |                      |     whole IBM i      |
|                      |                      |     system) may not  |
|                      |                      |     exceed this      |
|                      |                      |     number. This     |
|                      |                      |     prevents the     |
|                      |                      |     system from      |
|                      |                      |     being overloaded |
|                      |                      |     with heavy file  |
|                      |                      |     transfer         |
|                      |                      |     activity.        |
|                      |                      | -   In combination   |
|                      |                      |     with the Agent   |
|                      |                      |     port range start |
|                      |                      |     number, this     |
|                      |                      |     number           |
|                      |                      |     determines the   |
|                      |                      |     highest possible |
|                      |                      |     port number that |
|                      |                      |     could be         |
|                      |                      |     assigned to      |
|                      |                      |     SMAFT Agent jobs |
|                      |                      |     (that is, if all |
|                      |                      |     SMAFT activity   |
|                      |                      |     was comprised of |
|                      |                      |     only Agent jobs  |
|                      |                      |     and no Server    |
|                      |                      |     sub-tasks).      |
+----------------------+----------------------+----------------------+
| Status frequency     | 15                   | How often the SMA    |
| (secs)               |                      | File Transfer Server |
|                      |                      | should send a status |
|                      |                      | message (023)        |
|                      |                      | reporting the number |
|                      |                      | of bytes             |
|                      |                      | transferred. This    |
|                      |                      | information is used  |
|                      |                      | to update progress   |
|                      |                      | showing on the       |
|                      |                      | OpCon/xps Schedule   |
|                      |                      | display, but status  |
|                      |                      | messages sent too    |
|                      |                      | frequently could     |
|                      |                      | slow down the        |
|                      |                      | progress of the file |
|                      |                      | transfer.            |
+----------------------+----------------------+----------------------+
| Max bandwidth (bps)  | 9,999,999 (no limit) | This is a general    |
|                      |                      | control that limits  |
|                      |                      | the average data     |
|                      |                      | throughput rate of   |
|                      |                      | each SMA File        |
|                      |                      | Transfer job so that |
|                      |                      | it will not exceed   |
|                      |                      | this pace in bits    |
|                      |                      | per second. This is  |
|                      |                      | not a precise        |
|                      |                      | control, but it      |
|                      |                      | helps to prevent     |
|                      |                      | overloading          |
|                      |                      | communications lines |
|                      |                      | and it can also      |
|                      |                      | reduce the impact on |
|                      |                      | system performance   |
|                      |                      | of SMA File Transfer |
|                      |                      | jobs.                |
+----------------------+----------------------+----------------------+
| Log level (if on)    | CTL                  | Values:              |
|                      |                      |                      |
|                      |                      | -   CTL = Log only   |
|                      |                      |     the transfer job |
|                      |                      |     control          |
|                      |                      |     transactions and |
|                      |                      |     the first 5      |
|                      |                      |     records of the   |
|                      |                      |     transfer         |
|                      |                      |     payload.         |
|                      |                      | -   ALL = Log the    |
|                      |                      |     entire file      |
|                      |                      |     transfer job,    |
|                      |                      |     including all    |
|                      |                      |     records of the   |
|                      |                      |     file transfer    |
|                      |                      |     payload.         |
+----------------------+----------------------+----------------------+
| Max TCP/IP block     | Do not change unless | The size of the      |
| size                 | instructed by SMA    | largest message that |
|                      | Support.             | the IBM i LSAM SMAFT |
|                      |                      | communications       |
|                      |                      | programs can handle  |
|                      |                      | at once. 32000 is    |
|                      |                      | the largest allowed  |
|                      |                      | packet size, based   |
|                      |                      | on hard-coded        |
|                      |                      | program limits.      |
|                      |                      |                      |
|                      |                      |                      |
|                      |                      |                      |
|                      |                      | However, this packet |
|                      |                      | size can be set to a |
|                      |                      | smaller value if a   |
|                      |                      | system performance   |
|                      |                      | analyst determines   |
|                      |                      | that the overall     |
|                      |                      | system performance   |
|                      |                      | or the               |
|                      |                      | communications line  |
|                      |                      | performance would be |
|                      |                      | improved by smaller  |
|                      |                      | packets.             |
+----------------------+----------------------+----------------------+

:  

 

+------------------------+-----------------+------------------------+
| Field                  | Default         | Description            |
+========================+:===============:+========================+
| Default EBCDIC CCSID   | 00037           | The character set to   |
|                        |                 | use for adding data to |
|                        |                 | files in the UDB DB2   |
|                        |                 | native database        |
|                        |                 | (DB2/400) when the     |
|                        |                 | file did not already   |
|                        |                 | exist and there is no  |
|                        |                 | other source (such as  |
|                        |                 | information from the   |
|                        |                 | source file provided   |
|                        |                 | by the Server) of      |
|                        |                 | information about what |
|                        |                 | character set to use.  |
|                        |                 | This value is used     |
|                        |                 | only for SMAFT data    |
|                        |                 | packet translation and |
|                        |                 | not for SMA File       |
|                        |                 | Transfer protocol      |
|                        |                 | signals.               |
+------------------------+-----------------+------------------------+
| Default ASCII CCSID    | 00819           | -   The character set  |
|                        |                 |     to use for adding  |
|                        |                 |     data to files in   |
|                        |                 |     the IFS            |
|                        |                 |     (integrated file   |
|                        |                 |     system) when the   |
|                        |                 |     file did not       |
|                        |                 |     already exist and  |
|                        |                 |     there is no other  |
|                        |                 |     source of          |
|                        |                 |     information about  |
|                        |                 |     what character set |
|                        |                 |     to use.            |
|                        |                 | -   This CCSID is also |
|                        |                 |     used to interpret  |
|                        |                 |     the data packet    |
|                        |                 |     contents when the  |
|                        |                 |     file is text (not  |
|                        |                 |     binary) and the    |
|                        |                 |     Common Character   |
|                        |                 |     set specified by   |
|                        |                 |     the SMAFT Server   |
|                        |                 |     is ASCII, but no   |
|                        |                 |     other information  |
|                        |                 |     was provided, such |
|                        |                 |     as pre-pended file |
|                        |                 |     transfer labeling  |
|                        |                 |     which might        |
|                        |                 |     include a CCSID    |
|                        |                 |     code in an         |
|                        |                 |     optional \<Other\> |
|                        |                 |     XML tag, if that   |
|                        |                 |     Server is capable  |
|                        |                 |     of identifying     |
|                        |                 |     CCSID codes for    |
|                        |                 |     the source data it |
|                        |                 |     has sent.          |
+------------------------+-----------------+------------------------+
| ASCII -\> EBCDIC       | QEBCDIC in QSYS | The translation table  |
| table, and library     |                 | that the IBM i SMA     |
|                        |                 | File Transfer programs |
|                        |                 | should use for         |
|                        |                 | exchanging SMAFT       |
|                        |                 | protocol signals with  |
|                        |                 | Agents and Servers on  |
|                        |                 | other systems. This    |
|                        |                 | table is used to       |
|                        |                 | translate protocol     |
|                        |                 | signals incoming to    |
|                        |                 | IBM i, since the       |
|                        |                 | protocol will always   |
|                        |                 | be ASCII but IBM i     |
|                        |                 | uses EBCDIC as its     |
|                        |                 | native character set.  |
|                        |                 | This table can be a    |
|                        |                 | user-defined table or  |
|                        |                 | another table provided |
|                        |                 | with IBM i. The choice |
|                        |                 | of table to use may    |
|                        |                 | depend on the default  |
|                        |                 | ASCII character set of |
|                        |                 | the OpCon/xps Server   |
|                        |                 | that is part of this   |
|                        |                 | network.               |
+------------------------+-----------------+------------------------+
| EBCDIC -\> ASCII table | QASCII in QSYS  | The translation table  |
| and library            |                 | that the IBM i SMA     |
|                        |                 | File Transfer programs |
|                        |                 | should use for         |
|                        |                 | exchanging SMAFT       |
|                        |                 | protocol signals with  |
|                        |                 | Agents and Servers on  |
|                        |                 | other systems. This    |
|                        |                 | table is used to       |
|                        |                 | translate protocol     |
|                        |                 | signals that IBM i     |
|                        |                 | sends to other         |
|                        |                 | systems, since the     |
|                        |                 | protocol must always   |
|                        |                 | be ASCII but IBM i     |
|                        |                 | uses EBCDIC as its     |
|                        |                 | native character set.  |
|                        |                 | This table can be a    |
|                        |                 | user-defined table or  |
|                        |                 | another table provided |
|                        |                 | with IBM i. The choice |
|                        |                 | of table to use may    |
|                        |                 | depend on the default  |
|                        |                 | ASCII character set of |
|                        |                 | the OpCon/xps Server   |
|                        |                 | that is part of this   |
|                        |                 | network.               |
+------------------------+-----------------+------------------------+

: SMAFT Translation Options

 

[SMA File Transfer SSL/TLS Security Options]{style="font-family: Arial; font-size: 9pt; font-weight: bold;"}

The setting of the TLS Security options can match the same parameters as
described for the Agent\'s Job Scheduler and JORS communications
settings, as described in the Configuration section of this Agent\'s
User Help. The Extended Discussion of Parameters under that topic
includes additional details and instructions about implementing TLS
Security for any of this Agent\'s communication services.

 

One notable difference for SMA File Transfer is that this Agent uses two
additional Digital Certificate Applications in the IBM i Digital
Certificate Manager Store which are separate from the LSAM Job Scheduler
Application names. This means that all three Applications must be
assigned a digital certificate, but they may all use the same digital
certificate, depending on the preferences and requirements of the local
site\'s security policies.

 

Remember when configuring the TLS Security options for SMA File Transfer
that these affect the TCP/IP socket connection with another OpCon Agent.
These are not connections between this Agent and the OpCon Server.

 

The SMA File Transfer (SMAFT) protocol defines a SMAFT Server that is
listening for connection requests, and a separate SMAFT Agent program
that is started whenever OpCon tells this Agent that it must connect
with another OpCon Agent (LSAM) to perform a file transfer. The SMAFT
Server takes the TLS Security Server role, while the SMAFT Agent takes
the TLS Client role. Accordingly, the following table of parameters
shows a \"Server App\" and a \"Client App\" that must be assigned to the
correct IBM Digital Certificate Manager Store\'s Application(s).

Field
:::
:::

Default

Valid Values

Required (Y/N)

Description

Use TLS Security?

N

Y = yes

N = no

Y

This field determines if the LSAM will engage a digital certificate and
complete a TLS Security handshake with the OpCon server.

 

When this option is set to Y = Yes, the TLS Security handshake must
complete successfully, or the connection with the OpCon server will be
refused.

 

Use the SMAFT Log Viewers communications logs to see entries that report
about TLS Security, whether it completed successfully, or whether some
error is reported.

TLS handshake timeout

30

1 -- 999

Y

The number of seconds that the communications programs should wait for
the next response, once a TLS Security handshake has been initiated,
before they give up waiting and reject the connection attempt.

 

This value must be long enough for a normal connection to complete
successfully. But if the time is too long, that could create an
opportunity for hacking the security handshake.

TLS DCM Server App Application Description

(see default text on screen)

Any text

N

This field supports a description of the Digital Certificate Manager
application, for information purposes only.

 

The \"Server App\" is for the SMAFT Server, acting as the TLS Server.

TLS DCM Server App Application ID

(see default text on screen)

Must match the IBM i DCM App ID

Y

This Digital Certificate Manager Application ID must match the
Application ID that was registered in the local IBM i Certificate Store
for this Agent\'s certificate. The Agent uses this key value to request
the digital certificate data that it needs to complete a TLS Security
handshake with the SMAFT transfer job remote system.

TLS DCM Client App Application Description

(see default text on screen)

Any text

N

This field supports a description of the Digital Certificate Manager
application, for information purposes only.

 

The \"Client App\" is for the SMAFT Agent, acting as the TLS Client.

TLS DCM Client App Application ID

(see default text on screen)

Must match the IBM i DCM App ID

Y

This Digital Certificate Manager Application ID must match the
Application ID that was registered in the local IBM i Certificate Store
for this Agent\'s certificate. The Agent uses this key value to request
the digital certificate data that it needs to complete a TLS Security
handshake with the SMAFT transfer job remote system.

 

  Field                     Default  Description
  ------------------------ --------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Process Idle Timeout        300    These performance parameters are discussed in detail under the section on LSAM Parameters. The use of each parameter is the same, except that these parameters apply to the SMAFT Agent jobs.
  Input wait timeout           1     \"
  Control DTAQ wait            1     \"
  Control DTAQ frequency      20     \"
  Closed socket linger        10     \"
  ACK pending timeout         60     \"

  : SMAFT Agent Communications Performance Parameters

 

  Field                     Default  Description
  ------------------------ --------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Port Idle Timeout           300    The remaining performance parameters in this table are discussed in detail under the section on LSAM Parameters. The use of each parameter is the same, except that these parameters apply to the SMAFT Server jobs.
  Input wait timeout           1     \"
  Control DTAQ wait            1     \"
  Control DTAQ frequency      20     \"
  Closed socket linger        10     \"
  ACK pending timeout         60     \"

  : SMAFT Server Communications Performance Parameters

###### Functions

-   **F3=Exit**: Quits the list of trapped messages and returns to the
    menu.
-   **F4=IP Addresses**: Produces a window where all the IP addresses
    configured on the system are listed, so that one can be chosen to
    fill in the SMAFT IP Address field.
-   **F9=View LIBL**: This is a convenience feature. This function key
    produces a display of the library list that applies to the current
    LSAM environment.
-   **F12=Cancel**: Quits the SMAFT Parameters function without update
    and returns to the menu.
-   **PageDown/PageUp**: Used to move between the two pages of the SMAFT
    Parameters. Updates on page one are not completed until the
    \<**Enter**\> key is pressed on page two.

### SMAFT Agent Network Address Translation Table

Use this maintenance function to add or change SMAFT Agent NAT table
entries that will enable a connection between virtualized IBM i
partitions, when the public IP address for the SMAFT Server is not
supported from the SMAFT Agent partition for this type of communication
connection. Additional details about the use of this function are
offered above, under SMA File Transfer Operations.

-   **Screen Title**: SMAFT Agent NAT Table Details
-   **Screen ID**: SFTNATR2A

###### Menu Pathways

Main Menu \> SMA File Transfer menu (\#8) \> Work with SMAFT Network
Address Translation (\#8)

###### Fields

  Field                  Description
  ---------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Original IP address    The IP address assigned to the SMAFT Server machine in the OpCon database, or the IP address from the DNS for the Full Qualified Domain Name assigned to that machine in the OpCon database.
  Original port number   The IP address assigned to the SMAFT Server machine in the OpCon database, under the Advanced Options -- File Transfer Settings.
  New IP address         The IP address that the SMAFT Agent sockets program will use to actually contact the SMAFT Server, typically a local VPN address.
  New port number        The IP address used by the SMAFT Server listener job, as configured within the LSAM SMAFT Parameters. Often, this could be the same port number as was originally configured for this SMAFT Server machine.

###### Options

-   **2=Change**: Branches to a display format where an existing NAT
    table entry can be updated and the changes stored to the database
    table.
-   **3=Copy**: Branches to the display format where a new NAT table
    entry can be defined and stored to the database table, starting with
    the values from an existing table record. When using the Copy
    function, the Original IP Address value must either be unique in the
    table, or it must be associated in this new record with a unique
    Original Port Number. The Original IP Address and Original Port
    Number, combined, cannot be the same as another record in the table.
-   **4=Delete**: Select one or more records to be removed from the
    table, then press Enter to proceed to the Delete confirmation list
    display that will finally perform the actual delete action.
-   **5=Display**: Branches to a display format where an existing NAT
    table entry will be displayed with complete data. This display will
    often show the same information as the Work With list display,
    unless one of the IP addresses is too long for the list display.

###### Functions

-   **F3=Exit**: Quits the list of NAT table entries and returns to the
    menu.
-   **F5=Refresh**: Reloads the list of NAT table entries directly from
    the database table.
-   **F6=Add**: Branches to a display format where a new NAT table entry
    can be defined and stored to the database table.
-   **F12=Cancel**: Quits the Work With function, abandoning any typed
    line options, and returns to the menu.

### Manage SMAFT Logging

-   **Screen Title**: Manage SMAFT Logging
-   **Screen ID**: SFTLOGR1

The Manage SMAFT Logging screen, by itself, is an inquiry-only screen
that shows the current status of the IBM i SMA File Transfer
communications logging features. The functions keys \<**F7**\> and
\<**F8**\> are used to actually control the logging functions. SMA File
Transfer logging can also be controlled from the general LSAM Logging
management screen, found in option \# 4 of the LSAM Management Menu
(menu \# 6 from the LSAM Main Menu).

###### Menu Pathways

Main Menu \> SMA File Transfer menu (\#8) \> Manage SMAFT Logging (\#5)

###### Fields

  Field                         Description
  ----------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  LSAM Subsystem Name           The name assigned to this LSAM environment on the LSAM Parameters screen, shown here for convenience.
  SMAFT Agent logging status    Shows if the SMAFT Agent programs will be logging their communications activity, and at what level.
  SMAFT Server logging status   Shows if the SMAFT Server Listener program and the sub-programs it spawns for each file transfer job will be logging their communications activity, and at what level.

  :  

###### Functions

-   **F3=Exit**: Returns to the menu.
-   **F5=Refresh**: Re-displays the most current log control settings.
-   **F7=STRSSFTLOG**: Refer to a full description of the STRSFTLOG
    command below.
-   **F8=ENDSFTALOG**: Refer to a full description of the ENDSFTLOG
    command in [ENDSFTLOG -- End SMAFT Logging](#ENDSFTLO){.MCXref
    .xref}.
-   **F9=View logs**: Refer to a full description of the View SMAFT logs
    function in [View SMAFT Logs](#View2).
-   **F12=Cancel**: Return to the menu.

### STRSFTLOG -- Start SMAFT logging

Using \<**F7**\> (STRSFTLOG) from the Manage SMAFT Logging screen, or
typing the STRSFTLOG command, presents the prompted set of parameters
for the command STRSFTLOG. The command parameter scan be changed from
the default values, making it possible to choose only the logging
features that are needed for a particular situation.

Start LSAM Logging

  ------------------------------------------------------------------------------------------------------------
                                         Start Logging Mode (STRLOGCMD)
                                                        
                                           Type choices, press Enter.
                                                        
   When to start logging  . . . . .   [\*IMMED]{style="text-decoration: underline;"}        \*CNTRLD, \*IMMED       Log SMAFT Server comm? . . . . .   [\*YES]{style="text-decoration: underline;"}          \*YES, \*NO
      Clear SMAFT Server comm log? . .   [\*YES]{style="text-decoration: underline;"}          \*YES, \*NO      Detail SMAFT Server comm log?  .   [\*NO ]{style="text-decoration: underline;"}           \*YES, \*NO
      Log SMAFT Agent comm?  . . . . .   [\*YES]{style="text-decoration: underline;"}          \*YES, \*NO       Clear SMAFT Agent comm log?  . .   [\*YES]{style="text-decoration: underline;"}          \*YES, \*NO
     Detail SMAFT Agent comm log? . .   [\*NO ]{style="text-decoration: underline;"}           \*YES, \*NO                                                      Bottom
                  F3=Exit   F4=Prompt   F5=Refresh   F12=Cancel   F13=How to use this display
                                                 F24=More keys
  ------------------------------------------------------------------------------------------------------------

###### Menu Pathways

-   Main Menu \> SMA File Transfer menu (\#8) \> Manage SMAFT logging
    (\#5) \>F7
-   From command entry, using the LSAM environment library list, enter
    STRSFTLOG

###### Fields

This screen is an IBM i command prompting screen. It behaves according
to the operating system rules for prompted commands (similar, but not
the same as screens that are presented by LSAM programs). The function
controlled by each command parameter (screen field) is shown in the
table below.

 

  -------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ![White pencil/paper icon on gray circular background](../../../Resources/Images/note-icon(48x48).png "Note icon")   **NOTE:** [It is only possible to choose the CLEAR (\*YES) option for a log file if that logging feature is already stopped. If it is not stopped, the CLEAR function will fail and logging may not start up correctly. If the file is not being cleared, it does not matter if logging is already started.]
  -------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

+-------------------------+----------------+-------------------------+
| Field                   | Default        | Description             |
|                         |                |                         |
|                         | (Valid Values) |                         |
+=========================+:==============:+=========================+
| OPTION                  | \*IMMED        | -   **\*IMMED**         |
|                         |                |     (immediate) causes  |
| (When to start logging) | (\*CNTRLD)     |     a control message   |
|                         |                |     to be sent to       |
|                         |                |     either of the       |
|                         |                |     programs that       |
|                         |                |     perform logging     |
|                         |                |     functions,          |
|                         |                |     triggering them to  |
|                         |                |     make the necessary  |
|                         |                |     change.             |
|                         |                |                         |
|                         |                | **Note:** The \*IMMED   |
|                         |                | value also causes the   |
|                         |                | configuration control   |
|                         |                | file to be updated, so  |
|                         |                | that the requested      |
|                         |                | change always acts as a |
|                         |                | permanent change to the |
|                         |                | IBM i LSAM settings.    |
|                         |                |                         |
|                         |                | -   **\*CNTRLD** tells  |
|                         |                |     the command         |
|                         |                |     processor program   |
|                         |                |     to store the change |
|                         |                |     of the logging      |
|                         |                |     parameters in the   |
|                         |                |     IBM i LSAM          |
|                         |                |     configuration       |
|                         |                |     control file        |
|                         |                |     (LSAPARF00). The    |
|                         |                |     change does not     |
|                         |                |     take effect until   |
|                         |                |     the next time that  |
|                         |                |     either program is   |
|                         |                |     restarted.          |
+-------------------------+----------------+-------------------------+
| FTSCMN                  | \*YES          | -   **\*YES** tells the |
|                         |                |     system to have the  |
| (Log SMAFT              | (\*NO)         |     SMAFT Server        |
|                         |                |     communications      |
| Server                  |                |     programs (SMAFTSR00 |
|                         |                |     and SMAFTSR01) log  |
| communications?)        |                |     all of their input  |
|                         |                |     and output activity |
|                         |                |     to the log file     |
|                         |                |     SFTLOGF10 as it     |
|                         |                |     runs in an IBM i    |
|                         |                |     job called SMAFTS.  |
|                         |                | -   **\*NO** tells the  |
|                         |                |     command processor   |
|                         |                |     not to perform any  |
|                         |                |     changes to the      |
|                         |                |     logging of the      |
|                         |                |     SMAFT S Setting     |
|                         |                |     this value to \*NO  |
|                         |                |     does not cause any  |
|                         |                |     active logging to   |
|                         |                |     stop, or turn off   |
|                         |                |     the log parameter   |
|                         |                |     in the IBM i        |
|                         |                |     configuration       |
|                         |                |     control file.       |
+-------------------------+----------------+-------------------------+
| CLRFTSCMN               | \*YES          | Have the system         |
|                         |                | automatically clear the |
| (Clear SMAFT Server     | (\*NO)         | SMAFT Server            |
| comm log?)              |                | communications log file |
|                         |                | (SFTLOGF10) so there is |
|                         |                | only one set of log     |
|                         |                | entries that are for    |
|                         |                | the current logging     |
|                         |                | session.                |
|                         |                |                         |
|                         |                | -   **\*YES** clears    |
|                         |                |     the file when       |
|                         |                |     **Enter** is        |
|                         |                |     pressed, before the |
|                         |                |     new log entries are |
|                         |                |     made. (This logging |
|                         |                |     function must be    |
|                         |                |     stopped for the     |
|                         |                |     Clear to be         |
|                         |                |     successful.)        |
|                         |                | -   **\*NO** keeps the  |
|                         |                |     entries that are    |
|                         |                |     already in the log  |
|                         |                |     file and adds to    |
|                         |                |     them.               |
|                         |                |                         |
|                         |                | **Note**: The system    |
|                         |                | can clear the file      |
|                         |                | using the STRSMALOG     |
|                         |                | command or by using the |
|                         |                | SMASUP command.         |
|                         |                | Optionally, an          |
|                         |                | administrator,          |
|                         |                | programmer or support   |
|                         |                | technician with proper  |
|                         |                | authority can clear the |
|                         |                | log file manually from  |
|                         |                | command entry any time  |
|                         |                | the file is not in      |
|                         |                | active use.             |
+-------------------------+----------------+-------------------------+
| FTSDUMP                 | \*NO           | -   **\*YES**, the      |
|                         |                |     SMAFT Server        |
| (Detail SMAFT Server    | (\*YES)        |     communications      |
| comm log?)              |                |     program writes      |
|                         |                |     multiple log        |
|                         |                |     entries for every   |
|                         |                |     transaction that it |
|                         |                |     receives from the   |
|                         |                |     port where it is    |
|                         |                |     listening. On an    |
|                         |                |     active system, a    |
|                         |                |     great many records  |
|                         |                |     might be logged     |
|                         |                |     very quickly. This  |
|                         |                |     has the potential   |
|                         |                |     of consuming a very |
|                         |                |     large amount of     |
|                         |                |     disk space. The     |
|                         |                |     detailed logging    |
|                         |                |     feature should be   |
|                         |                |     used only for a     |
|                         |                |     very limited time   |
|                         |                |     to debug critical   |
|                         |                |     program problems.   |
|                         |                |     The detailed        |
|                         |                |     logging function is |
|                         |                |     typically used in a |
|                         |                |     test environment by |
|                         |                |     programmers.        |
|                         |                | -   **\*NO** prevents   |
|                         |                |     turning on the      |
|                         |                |     detail logging      |
|                         |                |     function when       |
|                         |                |     logging starts.     |
|                         |                |                         |
|                         |                | **Note:** The detail    |
|                         |                | logging function can    |
|                         |                | only be turned off by   |
|                         |                | completely stopping the |
|                         |                | log feature. Refer to   |
|                         |                | [Turn Off Debug         | |                         |                | Logging](Log-F        |
|                         |                | ile-and-Database- |
|                         |                | Management.md#Turn_Off |
|                         |                | _Debug_Logging){.MCXref |
|                         |                | .xref}. There is no     |
|                         |                | control that may be     |
|                         |                | used to stop the detail |
|                         |                | logging function        |
|                         |                | without also stopping   |
|                         |                | all logging for the     |
|                         |                | sockets communications  |
|                         |                | program. If detail      |
|                         |                | logging is turned on    |
|                         |                | and it should end while |
|                         |                | continuing to perform   |
|                         |                | standard debug logging, |
|                         |                | then all logging must   |
|                         |                | be temporarily ended    |
|                         |                | for the communications  |
|                         |                | program and then        |
|                         |                | restarted with the      |
|                         |                | FTSDUMP parameter set   |
|                         |                | to \*NO.                |
+-------------------------+----------------+-------------------------+
| FTACMN                  | \*YES          | -   **\*YES** tells the |
|                         |                |     system to have the  |
| (Log SMAFT              | (\*NO)         |     SMAFT Agent         |
|                         |                |     communications      |
| Agent communications?)  |                |     programs            |
|                         |                |     (SMAFTAR01) log all |
|                         |                |     of its input and    |
|                         |                |     output activity to  |
|                         |                |     the log file        |
|                         |                |     SFTLOGF00.          |
|                         |                |                         |
|                         |                | **Note:** The SMAFT     |
|                         |                | Agent program runs as   |
|                         |                | the primary program in  |
|                         |                | a job named by          |
|                         |                | OpCon/xps when SAM      |
|                         |                | submits a file transfer |
|                         |                | job start request to    |
|                         |                | the IBM i LSAM. When    |
|                         |                | the job ends, the SMAFT |
|                         |                | Agent communications    |
|                         |                | program ends. This log  |
|                         |                | flag will control the   |
|                         |                | logging of each         |
|                         |                | submitted job.          |
|                         |                |                         |
|                         |                | -   **\*NO** tells the  |
|                         |                |     command processor   |
|                         |                |     not to perform any  |
|                         |                |     changes to the      |
|                         |                |     logging of the      |
|                         |                |     SMAFT Agent         |
|                         |                |     communications      |
|                         |                |     program.            |
|                         |                |                         |
|                         |                | **Note:** Setting this  |
|                         |                | value to \*NO does not  |
|                         |                | cause any active        |
|                         |                | logging to stop, or     |
|                         |                | turn off the log        |
|                         |                | parameter in the IBM i  |
|                         |                | configuration control   |
|                         |                | file.                   |
+-------------------------+----------------+-------------------------+
| CLRFTACMN               | \*YES          | Have the system         |
|                         |                | automatically clear the |
| (Clear SMAFT Agent comm | (\*NO)         | SMAFT Agent             |
| log?)                   |                | communications log file |
|                         |                | (SFTLOGF00) so there is |
|                         |                | only one set of log     |
|                         |                | entries that are for    |
|                         |                | the current logging     |
|                         |                | session.                |
|                         |                |                         |
|                         |                | -   **\*YES** clears    |
|                         |                |     the file when       |
|                         |                |     **Enter** is        |
|                         |                |     pressed, before the |
|                         |                |     new log entries are |
|                         |                |     made. (This logging |
|                         |                |     function must be    |
|                         |                |     stopped for the     |
|                         |                |     Clear to be         |
|                         |                |     successful.)        |
|                         |                | -   **\*NO** keeps the  |
|                         |                |     entries that are    |
|                         |                |     already in the log  |
|                         |                |     file and adds to    |
|                         |                |     them.               |
|                         |                |                         |
|                         |                | **Note:** The system    |
|                         |                | can clear the file      |
|                         |                | using the STRSMALOG     |
|                         |                | command, or using the   |
|                         |                | SMASUP command.         |
|                         |                | Optionally, an          |
|                         |                | administrator,          |
|                         |                | programmer or support   |
|                         |                | technician with proper  |
|                         |                | authority can clear the |
|                         |                | log file manually from  |
|                         |                | command entry any time  |
|                         |                | the file is not in      |
|                         |                | active use.             |
+-------------------------+----------------+-------------------------+
| FTADUMP                 | \*NO           | -   **\*YES**, the      |
|                         |                |     SMAFT Agent         |
| (Detail SMAFT Agent     | (\*YES)        |     communications      |
| comm log?)              |                |     program writes      |
|                         |                |     multiple log        |
|                         |                |     entries for every   |
|                         |                |     transaction that it |
|                         |                |     receives from the   |
|                         |                |     port where it is    |
|                         |                |     listening. On an    |
|                         |                |     active system, a    |
|                         |                |     great many records  |
|                         |                |     might be logged     |
|                         |                |     very quickly. This  |
|                         |                |     has the potential   |
|                         |                |     of consuming a very |
|                         |                |     large amount of     |
|                         |                |     disk space. The     |
|                         |                |     detailed logging    |
|                         |                |     feature should be   |
|                         |                |     used only for a     |
|                         |                |     very limited time   |
|                         |                |     to debug critical   |
|                         |                |     program problems.   |
|                         |                |     The detailed        |
|                         |                |     logging function is |
|                         |                |     typically used in a |
|                         |                |     test environment by |
|                         |                |     programmers.        |
|                         |                | -   **\*NO** prevents   |
|                         |                |     turning on the      |
|                         |                |     detail logging      |
|                         |                |     function when       |
|                         |                |     logging starts.     |
|                         |                |                         |
|                         |                | **Note:** The detail    |
|                         |                | logging function can    |
|                         |                | only be turned off by   |
|                         |                | completely stopping the |
|                         |                | log feature. Refer to   |
|                         |                | [Turn Off Debug         | |                         |                | Logging](Log-F        |
|                         |                | ile-and-Database- |
|                         |                | Management.md#Turn_Off |
|                         |                | _Debug_Logging){.MCXref |
|                         |                | .xref}. There is no     |
|                         |                | control that may be     |
|                         |                | used to stop the detail |
|                         |                | logging function        |
|                         |                | without also stopping   |
|                         |                | all logging for the     |
|                         |                | sockets communications  |
|                         |                | program. If detail      |
|                         |                | logging is turned on    |
|                         |                | and it should end while |
|                         |                | continuing to perform   |
|                         |                | standard debug logging, |
|                         |                | then all logging must   |
|                         |                | be temporarily ended    |
|                         |                | for the communications  |
|                         |                | program and then        |
|                         |                | restarted with the      |
|                         |                | FTADUMP parameter set   |
|                         |                | to \*NO.                |
+-------------------------+----------------+-------------------------+

: STRSFTLOG Command Prompting

###### Options

None

###### Functions

-   **F3=Exit**: Abandons all changes and return to the menu.
-   **F4=Prompt**: Shows all valid values for a parameter field.
-   **F5=Refresh**: Resets all the command parameters to their default
    values.
-   **F12=Cancel**: Abandons all changes and returns to the Manage LSAM
    Logging status display.
-   **F13=How to use this display**: The IBM default information that
    applies to all command prompting displays.
-   **F24=More keys**: Shows other function keys that may be used.

###### More Keys

-   **F9=All parameters**: This function key has no effect on this
    display.
-   **F11=Keywords**: Toggles the display between the parameter key
    words and the prompting text that describes each parameter.
-   **F14=Command string**: Shows the command and its parameters in the
    form that would be used if the command were typed manually. This
    command appears with a question mark in front of it because it was
    forced into prompt mode by a program call.
-   **F15=Error messages**: Shows any error messages that a command
    validation program has produced, but this command has no command
    validation program.
-   **F16=Command complete**: Has the same effect as pressing
    \<**Enter**\> to initiate the command action. Verify that the
    parameter values are set correctly before using this command key or
    \<**Enter**\>.

### ENDSFTLOG -- End SMAFT Logging

The ENDSFTLOG command presents a prompted set of parameters for the
ENDLOGCMD command. The command parameters can be changed from the
default values, enabling a choice of the logging functions to stop and
how to stop them. Logging can be stopped immediately, or it can wait
until the next time the IBM i LSAM facility is stopped.

End SMAFT Logging

  ------------------------------------------------------------------------------------------------------------
                                          End Logging Mode (ENDLOGCMD)
                                                        
                                           Type choices, press Enter.
                                                        
   When to end logging  . . . . . .   [\*IMMED]{style="text-decoration: underline;"}        \*CNTRLD, \*IMMED       Stop SMAFT Server comm log?  . .   [\*YES]{style="text-decoration: underline;"}          \*YES, \*NO
      Stop SMAFT Agent comm log? . . .   [\*YES]{style="text-decoration: underline;"}          \*YES, \*NO                                                         
                                                     Bottom
                  F3=Exit   F4=Prompt   F5=Refresh   F12=Cancel   F13=How to use this display
                                                 F24=More keys
  ------------------------------------------------------------------------------------------------------------

###### Menu Pathways

-   Main Menu \> SMA File Transfer menu (\#8) \> Manage SMAFT logging
    (\#5) \>F8
-   From command entry, using the LSAM environment library list, enter
    ENDSFTLOG

###### Fields

This screen is an IBM i command prompting screen. It behaves according
to the operating system rules for prompted commands (similar, but not
the same as screens that are presented by LSAM programs). The function
controlled by each command parameter (screen field) is shown in the
table below.

+-------------------------+----------------+-------------------------+
| Field                   | Default        | Description             |
|                         |                |                         |
|                         | (Valid Values) |                         |
+=========================+:==============:+=========================+
| OPTION                  | \*IMMED        | -   **\*IMMED**         |
|                         |                |     (immediate) causes  |
| (When to end logging)   | (\*CNTRLD)     |     a control message   |
|                         |                |     to be sent to       |
|                         |                |     either of the       |
|                         |                |     programs that       |
|                         |                |     perform logging     |
|                         |                |     functions,          |
|                         |                |     triggering them to  |
|                         |                |     make the necessary  |
|                         |                |     change.             |
|                         |                | -   **\*CNTRLD** tells  |
|                         |                |     the command         |
|                         |                |     processor program   |
|                         |                |     to store the change |
|                         |                |     of the logging      |
|                         |                |     parameters in the   |
|                         |                |     IBM i LSAM          |
|                         |                |     configuration       |
|                         |                |     control file        |
|                         |                |     (LSAPARF00). The    |
|                         |                |     change does not     |
|                         |                |     take effect until   |
|                         |                |     the next time that  |
|                         |                |     either program is   |
|                         |                |     restarted.          |
|                         |                |                         |
|                         |                | **Note:** \*IMMED also  |
|                         |                | causes the              |
|                         |                | configuration control   |
|                         |                | file to be updated, so  |
|                         |                | that the requested      |
|                         |                | change always acts as a |
|                         |                | permanent change to the |
|                         |                | IBM i LSAM settings.    |
+-------------------------+----------------+-------------------------+
| FTSCMN                  | \*YES          | -   **\*YES** tells the |
|                         |                |     system to have the  |
| (Stop SMAFT Server comm | (\*NO)         |     SMSAFT Server       |
| log?)                   |                |     communications      |
|                         |                |     programs (SMAFTSR00 |
|                         |                |     and SMAFTSR01) quit |
|                         |                |     logging their input |
|                         |                |     and output          |
|                         |                |     activity.           |
|                         |                | -   **\*NO** tells the  |
|                         |                |     command processor   |
|                         |                |     program not to      |
|                         |                |     perform any changes |
|                         |                |     to the logging of   |
|                         |                |     the SMAFT Server    |
|                         |                |     communications      |
|                         |                |     programs.           |
+-------------------------+----------------+-------------------------+
| FTACMN                  | \*YES          | -   **\*YES** tells the |
|                         |                |     system to have the  |
| (Stop SMAFT agent comm  | (\*NO)         |     SMSAFT Agent        |
| log?)                   |                |     communications      |
|                         |                |     program (SMAFTAR01) |
|                         |                |     quit logging its    |
|                         |                |     input and output    |
|                         |                |     activity.           |
|                         |                | -   **\*NO** tells the  |
|                         |                |     command processor   |
|                         |                |     program not to      |
|                         |                |     perform any changes |
|                         |                |     to the logging of   |
|                         |                |     the SMAFT Agent     |
|                         |                |     communications      |
|                         |                |     program.            |
+-------------------------+----------------+-------------------------+

:  

###### Functions

-   **F3=Exit**: Abandons all changes and returns to the menu.
-   **F4=Prompt**: Shows all valid values for a parameter field.
-   **F5=Refresh**: Resets all the command parameters to their default
    values.
-   **F12=Cancel**: Abandons all changes and returns to the Manage LSAM
    Logging status display.
-   **F13=How to use this display**: The IBM default information that
    applies to all command prompting displays.
-   **F24=More keys**: Shows other function keys that may be used.

###### More Keys

-   **F9=All parameters**: This function key has no effect on this
    display
-   **F11=Keywords**: Toggles the display between the parameter key
    words and the prompting text that describes each parameter.
-   **F14=Command string**: Shows the command and its parameters in the
    form that would be used if the command were typed manually. This
    command appears with a question mark in front of it because it was
    forced into prompt mode by a program call.
-   **F15=Error messages**: Shows any error messages that a command
    validation program has produced. This command has no command
    validation program.
-   **F16=Command complete**: Has the same effect as pressing
    \<**Enter**\> to initiate the command action. Verify that the
    parameter values are set correctly before using this command key or
    \<**Enter**\>.

### Viewing the SMAFT Log Files

The available SMAFT log viewer functions may be accessed from a sub-menu
that can be accessed from the Manage SMAFT Logging function using
function key \<**F9**\> or from the SMA File Transfer menu \#8, option
6.

-   **Screen Title**: View LSAM Logs
-   **Screen ID**: SFTLOGR2

###### Menu Pathways

-   Main Menu \> SMA File Transfer menu (\#8) \> Manage SMAFT logging
    (\#5) \>F9
-   From command entry, using the LSAM environment library list, enter
    any one of the commands that appears on the View logs sub-menu

###### Fields

Type a number (1 -- 4) into the Selection entry field and press
\<**Enter**\> to execute the selected viewer.

+-----------------+----------------+---------------------------------+
| Field           | Default        | Description                     |
|                 |                |                                 |
|                 | (Valid Values) |                                 |
+=================+:==============:+=================================+
| Selection entry | none (1 -- 14) | Type the number of the view     |
|                 |                | function to use into this       |
|                 |                | field. Press \<**Enter**\> to   |
|                 |                | start the viewer.               |
+-----------------+----------------+---------------------------------+

:  

###### Options

The individual log viewers are not documented in this online help. These
viewers are tools meant for use by support and technical personnel. The
technical construction and operation of the LSAM software must be
understood in order for these log views to be useful. The current set of
SMA File Transfer viewing functions is simply a group of convenience
commands that engage the IBM i command DSPPFM. The viewers do not format
the raw data from the log files at this time.

###### Functions

-   **F3=Exit**: Abandons the Manage SMAFT logging function and returns
    to the menu.
-   **F12=Cancel**: Returns to the Manage SMAFT Logging display.

 

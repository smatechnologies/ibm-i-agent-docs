---
sidebar_label: 'SMA File Transfer Operations'
---

# SMA File Transfer Operations

## SMAFT Parameters - Critical Configuration Settings

The SMA File Transfer parameters for the IBM i LSAM are discussed in detail below, under the SMA File Transfer Screens and Windows. Before the IBM i LSAM SMAFT Server is started or SMAFT Agent jobs may be submitted to the IBM i LSAM, it is required to set the following parameters:

- The SMAFT Server IP Address must be specified in the IBM i SMAFT Parameters. Currently, this same address is used for both LSAM job scheduling transactions and for SMA File Transfer communications with the IBM i LSAM, so this IP address must be the same as the IP address specified for the LSAM Parameters.
- Confirm and/or update the SMAFT Server Port setting in the IBM i SMAFT Parameters.
- Confirm and/or update the SMAFT Agent port range start value in the IBM i SMAFT Parameters.

In addition to the IBM i SMAFT Parameter settings, the following parameters must be set in the OpCon machine table record, advanced settings, under the File Transfer Settings tab, for this IBM i system:

- TCP/IP Address: The LSAM will send the value from the IBM i LSAM SMAFT Parameters automatically whenever the LSAM first connects to the OpCon server.
- File Transfer Settings: File Transfer Role = set this to "Both" because the IBM i LSAM supports both the PUSH and PULL file transfer methods (that is, the file transfer job can be started on the Source machine or the Target machine, as specified in the OpCon job master record for each job).
- File Transfer Settings: File Transfer Port Number = this must match the SMAFT Server Port setting in the IBM i SMAFT Parameters, so that this number may be sent to the SMAFT Agent on other LSAMs, instructing them how to contact the IBM i SMAFT Server.

## SMAFT Network Address Translation Table

A Network Address Translation (NAT) table is available for the SMA File Transfer Agent. This table supports translating the OpCon Machine IP Address for a remote SMAFT Server to a different IP address and/or port, such as a local virtual IP address. Please contact SMA Support for assistance with using this feature. It should only be required if you have configured virtual IBM i partitions that are hosted by a Host IBM i partition, depending on the method used by the Host partition to serve IP address connection to the hosted partitions.

### Example Use Case

One proven case where a NAT table was required involved the IBM i host partition that was hosting one or more client partitions. These partitions were configured to use the IBM i network address translation (NAT) method for communications traffic routing. The public IP addresses of the client partitions were being contacted at the host partition, and then the host partition used its IBM i NAT to find and use the local virtual IP address for forwarding data communication traffic.

The OpCon Agent for IBM i, rather than be configured to use IBM i APIs to query the IBM i NAT, instead has been configured to use its own NAT table. This strategy was considered to be less sensitive to any changes in the IBM i operating system, and it may also be more likely compatible with other (currently untested) methods of forwarding network traffic from a host partition to a client partition.

In this example use case, the host partition received a SMAFT job start request from OpCon. The job start request instructed the host partition to use the public IP address for one of its hosted (client) partitions. However, the host could not use the public IP address for its SMAFT sockets communication method because that address is actually contacted, initially, at the host itself. In order to effectively establish a direct connection between the host and its client partition, the SMAFT NAT table provided the local virtual IP address (and port) that should be used by the OpCon LSAM SMAFT Agent communication program to open a socket connection with the client partition.

### Work with SMAFT Agent NAT Table

The maintenance function to add NAT table records is found in LSAM sub-menu 8 as menu option 8.

Use this maintenance function to add or change SMAFT Agent NAT table entries that will enable a connection between virtualized IBM i partitions, when the public IP address for the SMAFT Server is not supported from the SMAFT Agent partition for this type of communication connection.

Each SMAFT Agent NAT table entry is comprised of the following fields, where all data values are required:

- Original IP address
- Original port number
- New IP address
- New port number

Refer to the SMA File Transfer Screens and Windows section, below, for details about using the SMAFT Agent NAT Table maintenance function.

## Start SMA File Transfer Server (STRSMAFT)

The Start SMAFT Server option tells the LSAM to listen for SMAFT file transfer requests from other LSAMs. The SMAFT Server job started automatically whenever the LSAM servers are started. The automatic start option is documented below under the topic SMAFT Parameters. The following procedure describes how to manually start the SMAFT Server when the automatic option is not being used.

### Start SMAFT Server

1. In the command line, enter **SMAGPL/STRSMA**. For more information, refer to the [STRSMA Command](../operations/lsam#the-strsma-command).
2. Enter **8** to choose the **SMAFT File Transfer** menu in the SMA Main Menu. 
3. Enter **1** to choose the Start SMAFT Server (STRSMAFT) option in the SMA File Transfer menu.
4. The result of starting the SMAFT Server is that job SMAFTS is submitted to the LSAM subsystem configured in the LSAM Parameters. Confirm that the SMAFT Server is active by using the Check LSAM subsystem status, as follows.
5. Enter **8** to choose the **SMAFT File Transfer menu** (if not already there) in the SMA Main Menu.
6. Enter **3** to Work with SMAFT jobs in the SMA File Transfer menu.
7. Confirm that job SMAFTS is running among the active jobs in the subsystem.

## End SMAFT Server (ENDSMAFT)

The End SMAFT Server option tells the LSAM to discontinue listening for SMA File Transfer requests.

### End SMAFT Server

1. In the command line, enter **SMAGPL/STRSMA**. For more information, refer to the [STRSMA Command](../operations/lsam#the-strsma-command).
2. Enter **8** to choose the **SMA File Transfer** menu in the SMA Main Menu.
3. Enter **2** to choose the **End SMAFT Server** (ENDSMAFT) option in the SMA File Transfer menu.
4. The result of ending the SMAFT Server is that job SMAFTS is ended from the LSAM subsystem configured in the LSAM Parameters. Confirm that the SMAFT Server is no longer active by using the Check LSAM subsystem status, as follows.
5. Enter **8** to choose the **SMA File Transfer menu** (if not already there) in the SMA Main Menu.
6. Enter **3** to Work with SMAFT jobs in the SMA File Transfer menu.
7. Confirm that job SMAFTS is NOT present among the active jobs in the subsystem.

## Specifying IBM i Files in OpCon User Interface Job Master

The OpCon User Interface uses a unique job type for SMA File Transfer jobs that is not specific to any one operating system. The operating system at either the Source or Destination end of a file transfer is implied by the Machine name that is selected as the Source or the Destination. 

When the selected Machine is running IBM i and the file or table being transferred is stored in the DB2 UDB native database (not the IFS), the Source File or the Destination File is specified in the following manner:

**LIBRARY/FILE(MEMBER)**

...where (MEMBER) is optional. The concept of a file data member is unique to IBM i. Most DB2 UDB database files, and all SQL tables have only one (implied) data member, so it is usually not necessary to specify the member name. The exception is when data is read from, or written to a source physical file, such as program source files that store multiple members for each program's source code.

Consider the following application notes when SMA File Transfer is used with files controlled by IBM i:

- It may sometimes be convenient to use SMA File Transfer to extract a program source member from the DB2 database file that is stored in EBCDIC and specify that SMAFT should translate that source member to an ASCII character set as the source member is transferred to a MS Windows stream file. This procedure would make it convenient to open and read the source member using a Windows file editor.
- The IBM i special file (object) type of Save File appears to be a database file with binary content. Save files are actually comprised of records that are 512 bytes in length, as the data is stored under DB2 UDB. The SMA IBM i LSAM SMAFT programs recognize this important, special file type and they know how to extract or restore save files that have been removed and later sent back to the database. This means it is possible, using the SMAFT Binary file transfer Data Type, to send a save file to any other type of system, and then to restore that save file to any other IBM i database. In order to assure that the save file contents will be preserved, the Destination save file must exist (defining it as a save file using the CRTSAVF command), and the SMAFT option to overwrite an existing file should be specified.

### Identifying Attributes of Files Sent to IBM i

Some operating systems make it impossible for the SMA File Transfer programs to determine the exact definition of how data is stored in a file. For example, stream files sent from MS Windows or from a UNIX or Linux system to IBM i may actually include fixed-length records, but only the user of the file knows about this attribute because a basic stream file from these operating systems does not store this type of attribute with the file object (as is the case with DB2 database files
within the IBM i operating system).

In these cases, it may be desirable to tell the IBM i SMAFT program(s) about the record length by adding a special extension to the Destination File Name field in the OpCon SMA File Transfer job master record.
````
 ,REC=00000
````

Only certain LSAMs support this special convention; the IBM i LSAM is one of these.

Following the Destination File Name, add a comma immediately after the last non-blank character of the file name, then type the special keyword string REC= and also 1 to 5 digits that represent the fixed length of the record in the file.

:::info Example
A MS Windows stream file is known to contain fixed-length records that are each 80 bytes long. The file must be transferred to an IBM i DB2 database file. The Destination File Name field in the OpCon File Transfer job master record is entered using the IBM i DB2 file name format and extended by the special REC= keyword as follows:

**TARGETLIB/FILENAME,REC=80**

:::

It is not necessary to use the REC= keyword if the target file already exists in the IBM i DB2 database because the IBM i LSAM SMAFT programs are able to extract the record length value from the existing DB2 file. However, when a new file must be created, then the IBM i LSAM SMAFT programs can rely on the REC= keyword to set the value of the file record length as the new file is being created.

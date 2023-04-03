---
sidebar_label: 'IBM i LSAM Messages'
---

# IBM i LSAM Messages

The table below presents LSAM status messages forwarded to the SAM. The message descriptions are displayed in Operations in the OpCon User Interface following the job status.

| Status         | Return Code | Meaning 
| :---:          | :---:       | ---     
| 0              | SMA0030     | Job not found
| 1              | SMA0001     | Job Description in run request is invalid
| 1              | SMA0002     | Job Queue in run request is invalid
| 1 | SMA0003    | Job Output Queue in run request is invalid|
| 1 | SMA0004(a) | User ID in run request is invalid|
| 1 | SMA0004(b) | SBMDBFCMD failed, unable to complete user authority check|
| 1 | SMA0004(c) | SBMDBFCMD failed, user not authorized to command|
| 1 | SMA0005    | Current Library in run request is invalid|
| 1 | SMA0006    | Job name is invalid. It should be alpha-numeric|
| 1 | SMA0007    | Job subsystem name cannot be determined|
| 1 | SMA0008    | Job Queue is held, job cannot run until queue is released|
| 1 | SMA0020    | Pre-run image in run request is invalid|
| 1 | SMA0021    | Run image in run request is blank|
| 1 | SMA0022    | Run image in run request is invalid (failed IBM i CMDCHK)|
| 1 | SMA0023    | Run job submission failed|
| 1 | SMA0024    | Job initial library list is invalid|
| 1 | SMA0025    | Unrecognized job type in OpCon job start request (TX1)|
| 1 | SMA0027    | FTP job user profile or password invalid|
| 1 | SMA0028    | FTP job sub-command source member file error|
| 1 | SMA0029    | FTP job invalid action type|
| 1 | SMA0042    | FTP job remote system name not supplied|
| 1 | SMA0044    | Tracked or Queued Job start request did not include Private Data with Job ID|
| 1 | SMA0045    | LSAM cannot find Job Tracking record for Tracked/Queued Job start request|
| 1 | SMA0052    | Tracked/Queued Job already released or cancelled by IBM i Operator|
| 1 | SMA0062    | OpCon transaction XML field code is invalid|
| 1 | SMA0067    | SMAFT job request received with no source IP address|
| 1 | SMA0073    | Job auxiliary data in XML fields is invalid, job request rejected|
| 1 | SMA0108    | Operator Replay failed: Invalid script name, not on file|
| 2 | SMA0010    | Maximum number of jobs in system exceeded|
| 3 | ACTIVE     | Pre-run job is active, response to Type 2 message|
| 3 | ACTIVE HELD| Pre-run job is active but held, response to Type 2 message|
| 3 | SMA0033    | Pre-run job is active|
| 3 | SMA0040    | Pre-run job is active - $JOB:KILL command failed|
| 4 | SMA0034    | Pre-run job error|
| 4 | SMA0096    | Pre-run job already ended – job not found for Kill request|
| 4 | SMA0098    | Pre-run ended by user request ($JOB:KILL)|
| 5 | MSGW-      | Active job in Message Waiting status, message text follows|
| 5 | ACTIVE     | Run job is active, response to Type 2 message|
| 5 | ACTIVE HELD| Run job is active but held, response to Type 2 message|
| 5 | SMA0031    | Job waiting to run|
| 5 | SMA0035    | Run job is active|
| 5 | SMA0041    | Run job is active - $JOB:KILL command failed|
| 5 | SMA0246    | IBM i job completed normally, now running post-procedure SCANSPLF|
| 6 | SMA0036    | Run job is complete|
| 6 | SMA0100    | Operator Replay job completed OK|
| 7 | SMA0037    | Run job is error|
| 7 | SMA0064    | SMAFT Server get-file (IFS files) program SMAFTSR10 failed|
| 7 | SMA0065    | SMAFT Server get-file (IBM i save files) program SMAFTSR20 failed|
| 7 | SMA0066    | SMAFT Server get-file (DB2 files) program SMAFTSR30 failed|
| 7 | SMA0074    | SMAFT Agent unable to find transfer job index master record|
| 7 | SMA0075    | SMAFT Agent job did not find any transfer task definition fields|
| 7 | SMA0076    | SMAFT Agent job found invalid XML field code in job parameters file|
| 7 | SMA0077    | SMAFT Agent job detected a failure of the XML parser module|
| 7 | SMA0078    | SMA File Transfer job failed – refer to OpCon job properties for details|
| 7 | SMA0079    | SMA File Transfer encryption or compression option not supported|
| 7 | SMA0080    | SMA File Transfer Destination file exists and option is do not overwrite|
| 7 | SMA0081    | SMAFT Agent put-file (IFS files) program SMAFTAR10 failed|
| 7 | SMA0082    | SMAFT Agent put-file (IBM i save files) program SMAFTAR20 failed|
| 7 | SMA0083    | SMAFT Agent put-file (DB2 files) program SMAFTAR30 failed|
| 7 | SMA0084    | SMAFT: IFS file type is invalid, only type STFM (stream file) is supported|
| 7 | SMA0085    | SMAFT value supplied for "If File Exists" parameter is not recognized|
| 7 | SMA0086    | SMAFT Agent cancels transfer request because file exists and option is do not overwrite|
| 7 | SMA0087    | SMAFT Agent failed during attempt to backup target file|
| 7 | SMA0088    | SMAFT Agent detected invalid character in record separator following hex escape sequence|
| 7 | SMA0089    | SMAFT Agent detected invalid character in record separator following octal escape sequence|
| 7 | SMA0090    | SMAFT Agent detected invalid character in record separator following an escape character|
| 7 | SMA0091    | SMAFT Agent detected invalid hexadecimal number value in record separator|
| 7 | SMA0092    | SMAFT Agent detected invalid octal number value in record separator|
| 7 | SMA0093    | SMAFT Agent detected invalid character number in record separator|
| 7 | SMA0094    | SMAFT Agent unable to clear target file that is subject to overwrite|
| 7 | SMA0095    | SMAFT Agent failed during creation of target file that did not exist|
| 7 | SMA0097    | Job run command has already ended – job not found for Kill request|
| 7 | SMA0099    | Run job ended by user request ($JOB:KILL)|
| 7 | SMA0101    | Operator Replay failed: Telnet host not recognized (getHostByName)|
| 7 | SMA0102    | Operator Replay failed: Cannot open socket to use with telnet (sock)|
| 7 | SMA0103    | Operator Replay failed: Cannot connect to telnet service (connect)|
| 7 | SMA0104    | Operator Replay failed: Failed to set socket attributes for telnet session (fcntl)|
| 7 | SMA0105    | Operator Replay failed: Bell character received = typed (Send) value error|
| 7 | SMA0106    | Operator Replay failed: Replay script timeout|
| 7 | SMA0107    | Operator Replay failed: Error in script control definitions|
| 7 | SMA0109    | Operator Replay failed: Script has no sequence records|
| 7 | SMA0135    | SMAFT Agent failed to grant authority to new backup file in SMABAK library|
| 7 | SMA0136    | SMAFT Agent detected non-numeric record length in pre-pended data before first received data record|
| 7 | SMA0137    | SMAFT Agent detected non-numeric record length embedded between variable records in received data|
| 7 | SMA0138    | SMAFT Agent unable to delete old backup copy of save file in SMABAK library|
| 7 | SMA0140    | SMAFT Agent detected data record length not equal file record length|
| 7 | SMA0141    | SMAFT Agent timer expired waiting for transaction accomplishment|
| 7 | SMA0142    | SMAFT Agent reports general error – refer to job log|
| 7 | SMA0143    | SMAFT Agent communications idle time exceeded – lost connection?|
| 7 | SMA0144    | SMAFT Server timer expired waiting for transaction accomplishment|
| 7 | SMA0145    | SMAFT Server reports general error – refer to job log|
| 7 | SMA0146    | SMAFT Server communications idle time exceeded – lost connection?|
| 7 | SMA0224    | Captured job ID not found in Call string|
| 7 | SMA0225    | Specified dynamic variable name not found in LSAM master file|
| 7 | SMA0226    | Requested dynamic variable operation is not V or L, or LDA key is blank|
| 7 | SMA0227    | Dynamic variable type in LSAM master file is not V when operation V requested|
| 7 | SMA0228    | Dynamic variable separator characters not found in LSAM control file|
| 7 | SMA0229    | User-defined program for dynamic variable value failed|
| 7 | SMA0247    | SCANSPLF command requested but not found for post-process job evaluation (typically an LSAM internal programming error) - requires SMA Support to resolve|
| 7 | SMA0249    | IBM i job completed normally, but post-processing SCANSPLF reports error|
| 8 | SMA0018    | (LSAM internal job status: Pre-run job completed normally)|
| 9 | SMA0038    | Job completed with no error|
| 9 | SMA0039    | Job completed with status not equal 0 |
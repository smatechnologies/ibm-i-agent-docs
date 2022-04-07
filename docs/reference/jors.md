# JORS and Spool File Server

This topic provides technical details about the way the IBM i LSAM serves the OpCon/xps Job Output Retrieval System (JORS) and how it manages job output, that is, spool files (reports). These details could be needed by technical support personnel for the purpose of tuning the LSAM JORS server program performance.

## Job Output Retrieval Requests

The IBM i LSAM includes a separate communications server program (JORCMNR00) running under the LSAM server job called JORCMN. This server exists to respond to requests from OpCon/xps whenever a user has requested to view job output. It handles TCP/IP communications at the JORS port named in the LSAM Parameters.

As JORS requests are received, the primary communications program spawns a separate communications task for each request, to be handled by program JORCMNR01 in a temporary server job called JORCMNSUB. There is a separate copy of the spawned task for the initial request from OpCon/xps to list available job output that becomes presented to the user as a selection list window. Another separately spawned task actually retrieves the job log report records (line by line) for display once the OpCon/xps user has selected the job log report and requested to view it. Both of these operations are handled by program JORCMNR01.

Both the primary communications program and the spawned data retrieval program perform TCP/IP sockets communications with the SMANetCom service of OpCon/xps. Internally, these communications programs alternate between checking a control data queue for operator instructions and waiting for communications input from the remote TCP/IP connection. Currently, the activity level of these communications programs is very low. There is very little data to be exchanged over the communications link, except for the brief period where the spawned program is pumping the actual job log report data out to SMANetCom. The default communications program performance tuning values should be adequate for this limited task.

However, if an analysis of system performance suggests that these JORS server communications programs should be adjusted for (1) reduced impact on IBM i system performance or (2) improved response time to the viewer of JORS output, then the JORS communication performance parameters may be adjusted. These parameters are described in IBM i LSAM Configuration, [Communication Performance Parameters](../configuration/configuration.md).

## LSAM Spool File Server

The IBM i LSAM includes a server job that is dedicated to managing the spool file (report) output of all jobs that were submitted by the LSAM in response to OpCon/xps job start requests. As a job completion message is detected by the LSAM server task assigned to monitor job messages, this other server task presents a request to the LSAM's spool file server job: LSAJOR (program LSAJORR00).

The LSAM spool file server has two distinct functions. First, it always attempts to find and store a copy of every job's job log report. It stores an index record and stores a copy of the job log report in a database file. The index and the job log copies are then available for retrieval by the JORS server, described above. The job log report copies remain in the LSAM database for the number of days set in the LSAM Parameters, as "Days to keep spool files."

The other function performed by the LSAM spool file server is to process all the spool file management requests that were submitted from the OpCon/xps job master record along with the job start request. The server completes tasks such as setting the number of copies and the HOLD and SAVE attributes. It also performs spool file copy routing to output queues and users (that is, to the default output queues assigned to those users).

The spool file server program performance is controlled mostly by the IBM i job attributes. These are set by the values stored in the default LSAM server job description: SMADTA/SMALSAJ00. However, there are two internal performance parameters that can make this server job more or less aggressive. The default values for these parameters should be appropriate for most installations. However, if system performance analysis suggests that the LSAJOR job should be changed to (1) reduce impact on overall system performance or (2) make the spool file server more responsive to spool file management requests, then the internal performance parameters may be adjusted by technical support personnel.

The internal performance parameters are stored in a data area called LSAJOR in the SMADTA (or equivalent) library. This control data area is also used as a locking mechanism to prevent duplicate submission of the LSAJOR server job; therefore, the job must be stopped before the control data area can be updated with new values.

                               Display Data Area
                                        
                      Data area . . . . . . . :   LSAJOR
                       Library . . . . . . . :     SMADTA
                      Type  . . . . . . . . . :   \*CHAR
                        Length  . . . . . . . . :   10
         Text  . . . . . . . . . :   LSAJOR job control & timing parms
                                        
                                          Value
         Offset      *...+....1....+....2....+....3....+....4....+....5
                 0      '0000500015'   

The contents of the LSAJOR control data area are defined in the following table.

|Position|Field|Description|
|--- |--- |--- |
|1 – 5|Number of retries on data queue|The number of times a wait for input in the programs data input data queue should time out before the program checks the operational control data queue for any new instructions.|
|6 – 10|Seconds to wait for data queue|The number of seconds the program should wait for new data to arrive in the data input data queue before the wait times out.|

These two performance parameters are responsible for controlling the frequency at which the server program will stop to check for operator instructions. Operator instructions include commands to start or stop debug logging, and also a request to shut down the program in an orderly fashion. Most of the time, the server program will be waiting for new spool file control commands to arrive at the separate data input data queue. It will wait for the specified number of seconds and then the program regains control. As control is regained from the input data queue wait, the program next decides whether it should attempt a retry on the data input data queue (up to the specified number of retries) or whether it is time to perform a near-instant check for any operator instructions.

One symptom of the setting of these internal performance parameters that may be obvious is that sometimes when the Stop LSAM servers operation has been requested, the IBM i operator will receive a message that the job LSAJOR has ended abnormally. This can occur when the internal performance parameters for the LSAJOR job have been set to a total time that is longer than the LSAM's default wait time for server jobs to end before it forces the LSAM server subsystem to end. This abnormal server job end message may be ignored, unless it is received at a time when the operator has not requested an LSAM subsystem shutdown.

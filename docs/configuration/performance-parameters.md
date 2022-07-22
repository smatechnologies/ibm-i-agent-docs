# Performance Parameters

## Job Scheduling Performance Parameters

The following table of job scheduling performance parameters describes some flags that can be used to bypass LSAM errors that would normally reject an OpCon job start request. SMA recommends that these errors should not be bypassed. There are many strategies that could be used instead of bypassing errors. Please contact SMA Support for advice before setting these bypass flags to Y=yes.

:::caution
Setting the LSAM error bypass flags to Y=yes causes the LSAM server programs to incorrectly report the actual job status. It also creates an opportunity for the LSAM to report that a job has failed when it has actually completed normally. In order to prevent incorrect job failure messages the LSAM server program performance must be carefully tuned. Please review the discussion below about the Job message idle timer parameter and also Tuning LSAM performance.
:::

### Table of Job Scheduling Performance Parameters
| Field        | Default | Valid Values | Required (Y/N) | Description  |
| -----        | ------- | ------------ | -------------- | -----------  |
| Bypass errors (warn only) | N/A     |(Informational Output Only) | N/A          | This group of flags supports user-defined options for the behavior of the LSAM when it attempts to control scheduled jobs. Refer to [Discussion of Bypass Flags](#Discussi2).    |
| SMA0008 = JOBQ HELD | Y       | Y or N       | Y            | - **Y = yes**: Bypass error SMA0008 when the requested job queue is in held status. Allow the OpCon job request and place the job into the held job queue. A warning is issued to OpCon for display on the SAM console. |
|              |         |              |              | - **N = no**: Do not allow a job to be submitted when the requested job queue is in held status. Reject the job start request with error code SMA0008. |
| SMA0007 = JOBQ no SBS   | N       | Y or N, 1-9  | Y            | - **Y = yes**: Bypass error SMA0007 when the requested job queue is not attached to a subsystem. Allow the OpCon job request and place the job into the unattached job queue. A warning is issued to OpCon for display on the SAM console. |
|                         |         |              |              | - **N = no**: Do not allow a job to be submitted when a job queue is not attached to a subsystem. Reject the job start request with error code SMA0007. |
|                         |         |              |              | - **1 – 9**: Retry the check of the job queue status this number of times. If the status never returns normal, then the job scheduler will behave as if this bypass flag were set to 'N' and return an error code SMA0007 to the OpCon SAM. |
| SMA0007 retry delay | 0       | 000-999      |              | If the SMA0007 bypass flag value is set to a number (of retries), the LSAM job scheduler server program will delay this number of seconds before attempting each retry of checking the job queue status. |
| SMA0014 = TE1 run job | N       | Y or N       | Y            | - **Y = yes**: Bypass error SM0014 when OpCon has rejected a request (using a TE1 transaction) to track an ad hoc job. Issue warning message SMA0014 to the IBM i operator message queue and release the job so it can run without being tracked. |
|              |         |              |              | - **N = no**: Do not release a job that is supposed to be tracked by OpCon when OpCon has issued a TE1 transaction rejecting the request to track the ad hoc job. Issue warning message SMA0014 to the IBM i operator message queue. |
| SMA5801 = MSGQ+LIB | blank   | IBM i object names | N            | - Enter the name of a message queue and library location of the message queue, where the LSAM job scheduler server program will send message ID SMA5801 whenever a job is found stuck in MSGW (message waiting) status. |
|              |         |              |              | - Also refer to the extended discussion of this parameter, below in this topic. |
| Job message idle timer | 5       | 1, or greater number of seconds | Y            | - This is the amount of time, in seconds, that the LSAM job completion message monitor server (job TXMMNG, program LSARCMR00) will pause to check for operator control signals before starting a new cycle of checking for job completion messages in the SMAMSGQ message queue. |
|              |         |              |              | - If this value is set too high, then the LSAM can issue a SMA0097 error message reporting that a job has failed when it has actually completed normally. |
|              |         |              |              | - Casual LSAM users should try a value of 5 seconds in order to prevent this server from impacting system performance. But very active LSAM users may need to lower the value to 2 or even 1 in order to prevent false reports of job failures. Refer to [Discussion of Bypass Flags](#Discussi2) for more information. |
| Job message pause frequency | 1000    | 1 - 99999    | Y            | The number of job completion messages that can be processed at once before the program is forced to pause and check its control data queue. This value prevents the system from becoming locked up by a runaway job cycle that generates  many (or endless) messages all at once. |
| Bypass command validate | Y       | Y = yes, do bypass command syntax validation N = no, do not bypass and do validate command syntax  | Y            | Normally set to Y = yes, do bypass. Bypassing is the recommended value for best performance of the LSAM job scheduler server. If not bypassed, command line syntax validation can fail, incorrectly, due to an inability to accommodate unique job initial library lists, and in some environments also due to restrictions in object authority. The preferred method is to let invalid commands fail and use the OpCon "view output" feature to inspect the job log of failed jobs. |
| Use job cmpl msg mgmt? | N       | Y=yes, N=no | Y            | - Job completion messages for all jobs controlled by the IBM i LSAM are sent to the SMAMSGQ message queue in the SMADTA library. |
|              |         |              |              | - It is possible, though not recommended, that a program could cause other types of messages to  be sent to a job's completion message queue. When this happens, the default behavior of the LSAM job completion message server is to ignore messages that are not actual job completion messages. But if those messages are important, then this flag can be set to Y = yes to tell the LSAM job completion message server that it should consult the LSAM Message Management Parameters master file for any rules that might apply to these other types of messages. |
| Job parms separator-HEX    | 6A      | X'01' - X'FE' | Y            | - This pair of characters is the EBCDIC hexadecimal character representation of the actual character that can optionally be used to add more job definition parameters to the Call command line field of an OpCon job master record for IBM i jobs. This character must be the result of translating the ASCII character used in OpCon job master maintenance, translated to EBCDIC according to the translation table specified above in the LSAM Parameters. |
|              |         |              |              | - After typing this character in the Call command line, additional job definition parameters (as supported by the IBM i SBMJOB command) may be added to the job. In addition, it is also allowed to type in a SCANSPLF command and its parameters that will be used to evaluate the job log report after a job finishes normally, in order to produce a final determination of the job completion status that will be reported to the OpCon schedule. |
|              |         |              |              | - When the SCANSPLF command is used along with additional job parameters, the SCANSPLF command and its own parameters must follow any job definition parameters. That is, the SCANSPLF command string must be the last string of non-blank characters in the Call command field, following the Job parms separator character. ||

## Communication Performance Parameters

There are two sets of communications performance parameters. The first set is for the job scheduling server and the second set is for the JORS (job output retrieval) server. The parameter definitions are similar for each set. For more information about the LSAM JORS server job, refer to [JORS and Spool File Server](../reference/jors.md).

### General Communication Performance Parameters
| Field        | Default | Valid Values | Required (Y/N) | Description  |
| -----        | ------- | ------------ | -------------- | -----------  |
| Keep Socket Open (Y/N) | Y       | Y or N       | Y            | - This field determines if the communication socket remains open after transactions. |
|              |         |              |              | - Keeping the socket open improves communication speed; however, closing the socket after each transaction may solve a data loss problem in LSAM connections. |
|              |         |              |              | - Refer to [Discussion of Keep Socket Open Parameter](#Discussi) about synchronizing this value with theOpCon machine table. |
| Port Idle Timeout | 300     | Should be at least 60 | Y            | - This field determines the number of seconds to wait for communication from OpCon before timing out. |
|              |         |              |              | - The value should be larger than the sum of the Control DTAQ Wait value and the Input Wait Timeout value. |
| Control DTAQ Wait | 1       | Suggested range is 1 to 10    | Y            | - This field determines the number of seconds to wait for instructions from an i5 operator. |
|              |         |              |              | - Waiting on a data queue lessens the rapid attempts by a program to read from an idle socket conversation. |
|              |         |              |              | - This value is ignored as long as there is activity in the socket conversation. When the socket is active, the check for new control instructions is instant and the program returns to receive the next input from the socket. |
| Control DTAQ Frequency | 20      | Suggested range is 5 to 20 | Y            | - This field determines the number of consecutive communication transactions to process while the sockets communications program is active (i.e., no Input Wait Timeout has occurred) before pausing to check for new commands from the control data queue. |
|              |         |              |              | - This setting allows the emergency interruption of active communications without disturbing LSAM transactions. |
| Input Wait Timeout | 1       | Suggested range is 1 to 30 | Y            | - This field determines the number of seconds the communications program awaits input from the socket before checking the control data queue. |
|              |         |              |              | - This wait time does not affect active sockets (i.e., the program does not wait to receive  incoming data). |
| Closed Socket Linger | 1       | Suggested range is 1 to 120 | Y            | - This field determines the number of seconds the system waits before purging a closed socket. |
|              |         |              |              | - The LSAM is allowed to immediately reuse a closed socket; consequently, this setting does not affect new connection requests from OpCon. |
|              |         |              |              | - The linger time should be short to prevent an error where OpCon is unable to connect to the LSAM due to "socket is already in use." A short linger time should prevent lingering socket conversations from adding up to the maximum number of permissible conversations on a single socket. |
| ACK pending timeout | 60      | Recommended value is 30 – 60 | Y            | - This field determines the number of seconds that the LSAM communications program will wait for OpCon to respond to the last transaction sent. |
|              |         |              |              | - An unacknowledged transaction prevents any further communication between the LSAM and OpCon, so this value should be kept short. |
| Number of sub-processes | 3       | 1 - 999      | Y            | Controls the number of simultaneous Job Output Retrieval requests that the LSAM can handle. If there are already 3 active, a 4th request would be rejected. However, LSAM response to most JORS requests is usually very quick. |
| Transmit block size | 1280    | 1280         | Y            | Do not change this value without consulting with SMA Technologies Support. However, this control value exists in case there is a need to tune performance for clients with exceptional network circumstances. |
| -sub; -main  | N/A     | Only change if instructed by SMA Technologies Support.  | N/A          | The JORS communications server is comprised of the main listener program that routes all incoming requests and sub-programs that are spawned to process each data retrieval request. There are separate  tuning parameters that affect each of these processes. | 
| Accept OpCon server IP#: 2:, 3:, 4: | *ALL   | *ALL or IP Address | Y            | There are four data entry lines that can be used to register IP addresses of OpCon servers that are allowed to connect to this LSAM. Any attempt to connect by another OpCon server will be rejected and it will be reported to the active OpCon server's SMA Log. |
|              |         |              |                     | Either set the first line IP# to the special value of *ALL, or enter one or more allowed IP addresses to restrict the connection. |
|              |         |              |                     | **Note**: Only one OpCon server can connect to the LSAM at once. Secondary connection attempts will be rejected, reported to the active OpCon server SAM Log and to the local IBM i partition's QSYSOPR message queue. The original active OpCon server connection will remain active. |

### TLS Security Options

For more information, refer to [Extended Discussion of Parameters](../configuration/configuration.md#extended-discussion-of-parameters) that provides instructions for implementing TLS Secured communication connections with this Agent. Those instructions must be understood to choose correct values for the fields in this table.

Remember that changes to the TLS Security options will only take effect after the LSAM Server jobs have been stopped and restarted.

These TLS Security Options apply to both Job Scheduling and to the JORS Service.

#### Table of TLS Security Options
| Field       | Default Values | Valid       | Required (Y/N) | Description |
| -----       | -------------- | -----       | -------------- | ----------- |
| Use TLS Security? | N           | Y=yes N=no  | Y           | - This field determines if the LSAM will engage a digital certificate and complete a TLS Security handshake with the OpCon server. |
|             |                |             |                | - When this option is set to Y = Yes, the TLS Security handshake must complete  successfully, or the connection with the OpCon server will be refused.  |
|             |                |             |                | - Use the LSAM Log Viewers, log view 1, to see entries that report about TLS Security, whether it completed successfully, or whether some error is reported.  |
|             |                |             |                | - Please carefully consider the information under [Extended Discussion of Parameters](../configuration/configuration.md#extended-discussion-of-parameters) that explains how to configure and use TLS Security. Understand that there are IBM Digital Certificate Manager options for directly updating some of the follow fields, although SMA Technologies recommends using this LSAM Parameters interface to change those settings, so that the LSAM control file and display will remain synchronized with the Digital Certificate Manager's database.  |
| TLS handshake timeout | 30          | 1 -- 999    | Y           | - The number of seconds that the Agent communications programs should wait for the next response, once a TLS Security handshake has been initiated, before they give up waiting and reject the connection attempt. |
|                       |             |             |             | - This value must be long enough for a normal connection from the OpCon server to  complete successfully. But if the time is too long, that could create an opportunity for hacking the security handshake.  |
| TLS DCM Application Description   | (see default text on screen) | Any text    | N           | This field supports a description of the Digital  Certificate Manager application, for information purposes only. |
|  TLS DCM Application ID | (see default text on screen) | Must match the IBM i DCM App ID | Y           | This Digital Certificate Manager Application ID must match the Application ID that was registered in the local IBM i Certificate Store for this Agent's certificate. The Agent uses this key value to request the digital certificate data that it needs to complete a TLS Security handshake with the OpCon application server. |

### JORS Additional Performance Parameters

By default, the OpCon Agent for IBM i only supported delivering an IBM i job log report in response to the OpCon user interface request   
to "view job output."  Recently, this Agent's JORS service will also automatically include two other system-generated reports, if they are  
present:  QPPGMDMP and QPDSPJOB.  If there are multiple instances of these reports or of a QPJOBLOG report, all instances will appear in the
report selection list presented by the OpCon user interface.           
                                                                       
Not recommended for security reasons, but available to users is the option to allow any and all reports produced by a job to be viewd via the "view job output" feature (JORS):
>                                                                       
> **Secure JORS list SPLFs : _** 1=Yes (default), 0 = No
>
:::warning
SMA recommends leaving this option set to its default of 1=Yes, because this prevents offering non-system reports for viewing. Neither the OpCon server nor the IBM i Agent is capable of suppressing data in reports that must be kept private.  The only security measure available is the careful management of permissions granted to the users of OpCon user interfaces.  (This is similar to IBM i user profile security that can be used to prevent users from viewing reports in spool files.)
:::
                                                                       
```
  USE OPTION 0=No AT YOUR OWN RISK!
```

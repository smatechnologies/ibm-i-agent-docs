---
sidebar_label: 'Message Management Operations'
---

# Message Management Operations

## Start Message Management (STRMSGMNG)

The Start Message Management option tells the LSAM to monitor for messages. Message management can be started automatically whenever the LSAM servers are started. The automatic start option is documented below under the topic F22=Job Parms. The following procedure describes how to manually start message management when the automatic option is not being used.

:::tip
Please review the discussion below about Starting Message Management for important information about the warm or cold start mode.
:::

### Turn On Message Management -- Using the LSAM Menu

1. In the command line, enter **SMAGPL/STRSMA**. For more information on STRSMA command parameters, refer to the [STRSMA Command](../operations/lsam.md#the-strsma-command). 
2. Enter **2** to choose the **Message management** menu in the SMA Main Menu.
3. Enter **3** to choose the **Start Message** management (STRMSGMNG) option in the Message management menu.
4. Respond to the operator prompt about the start mode. Refer to [Starting Message Management: Cold vs. Warm](../message-management/operations.md#starting-message-management-cold-vs-warm) and [Maintain Message Management Parameters](../message-management/screens.md#message-management-parameters) for more information.
5. The result of starting message management is that job TRPMSG is submitted to the LSAM subsystem configured in the LSAM Parameters. Confirm that message management is active by using the Check function, as follows.
6. Enter **5** to choose the **Check Message management status (TRPMSGSTS)** option. A status window will appear confirming the server job status.

### Turn On Message Management -- Using the LSAM Command

1. In the command line, enter **SMAGPL/STRSMA**. For more information on STRSMA command parameters, refer to the [STRSMA Command](../operations/lsam.md#the-strsma-command) **- or -**
2. From outside of the LSAM menu system, use the command SMASETLIBL to set the job's library list to the LSAM environment library list. For more information on the SMASETLIBL command refer to [SMASETLIBL](../environment/commands.md#smasetlibl).
3. From a command entry line (or the CMD parameter of a SBMJOB command), type the LSAM command **STRMSGMNG**. F4=Prompt may be used to view the optional start mode parameter. Refer to [Starting Message Management: Cold vs. Warm](../message-management/operations.md#starting-message-management-cold-vs-warm) and [Maintain Message Management Parameters](../message-management/screens.md#message-management-parameters) for more information about the start mode.
4. The result of starting message management is that job TRPMSG is submitted to the LSAM subsystem configured in the LSAM Parameters. Confirm that message management is active by using the Check function, as follows.
5. Enter the command **TRPMSGSTS** to view a window that reports the server status.
6. When submitting a job (SBMJOB) to run command STRMSGMNG, or attempting to use the STRMSGMNG command from another job in the IBM i partition, the LSAM library list must be in effect for the job to use the STRMSGMNG command. Either specify a job description such as SMALSAJ00 that uses this library list, or specify **INLLIBL(\*CURRENT)** to pass the current job's library list to the submitted job.
    - The STRMSGMNG command can also be executed by the LSAM's wrapper command **LSAMCMD** which temporarily adds the LSAM library list to the current job, based on the name provided in the ENV( ) parameter value.
7. The TRPMSGSTS command will not report that the server is active until the submitted job completes normally.

## End Message Management (ENDMSGMNG)

The End Message Management option tells the LSAM discontinue monitoring for messages.

### Turn Off Message Management

1. In the command line, enter **SMAGPL/STRSMA**. For more information on STRSMA command parameters, refer to the [STRSMA Command](../operations/lsam.md#the-strsma-command).
2. Enter **2** to choose the **Message management menu** in the SMA Main Menu.
3. Enter **4** to choose the **End Message management (ENDMSGMNG)** option in the Message management menu.
4. The result of ending message management is that job TRPMSG is ended from the LSAM subsystem configured in the LSAM Parameters. Confirm that message management is no longer active by using the Check function, as follows.
5. Enter **5** to choose the **Check Message management status (TRPMSGSTS)** option. A status window will appear confirming the server job status.

To turn off Message Management manually, or programmatically, use the same procedure as above for [Turn On Message Management -- Using the LSAM Command](#turn-on-message-management----using-the-lsam-menu), but use the command **ENDMSGMNG**.

## Starting Message Management Cold vs Warm

The LSAM Message Management server offers a user-controlled option that determines the mode in which the server will start. This section describes the two start modes and it explains how the start mode may be managed using different methods to start the LSAM server job TRPMSG.

The default and normal mode of operation for the LSAM Message Management server is to use the warm start mode. But it is important to understand and carefully control how the server is started, especially if the server must be restarted after an unexpected interruption. Using an incorrect start mode will either cause important messages to be missed or it could cause duplicate Events to be initiated. Sometimes the decision about which start mode to select can be assisted by the DSPMSGQ
tool, described below under Message Management Technical Support Tools.

The start mode option (COLDSTART) provided by the LSAM software is a switch that tells the Message Management server programs whether they should perform a cold start (option 1) or not (option 0). When the servers will not perform a cold start, this is referred to as a warm start. **A warm start is the normal and default mode of starting the LSAM Message Management server.**

A cold start of the Message Management server is when the server programs start from the beginning of each message queue they will check. A warm start is when the server programs attempt to resume processing of each message queue from after the last message that was read.

If a warm start is requested but the Message Management server cannot find the last message processed, it will skip to the end of the message queue and process only new messages that arrive. The decision about which start mode is most appropriate may depend on how recently the Message Management server was last active.

A good general rule to follow is this: If the LSAM Message Management server was formerly active and it was stopped for only a very short time, then a warm start (option 0) would be preferred because it would prevent duplicate processing of messages. However, if the server has been stopped for a long time, then a cold start (option 1) could be used because the message key control file data is too old to be useful. Remember, though, that a cold start would process all the messages in each message queue. Some queues could contain messages that are too old to be useful.

There are some tools that can be used by technical support personnel to customize a one-time recovery/restart of the server. If a technical support person is not available in an emergency situation, perhaps the best decision would be to use a warm start. The Positive side effect of this decision would be that some messages might be skipped. However, this is probably better than processing the same message twice. But that decision would also depend on the types of message response rules typically used at a given site. Sometimes it is so critical that every message be detected, that it would be better to account for duplicate processing of one or more messages following a cold start of the server.

To understand the optional tools and methods that can be used by technical support personnel to create variations in the way the Message Management server will start, read [How the LSAM Message Management Works](./details.md).
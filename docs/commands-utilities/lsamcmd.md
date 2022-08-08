---
sidebar_label: 'LSAMCMD: Execute LSAM Commands From Outside'
---
# LSAMCMD: Execute LSAM Commands From Outside

This command is used to execute other LSAM utility commands or to call LSAM programs when it is desired to execute LSAM commands from third-party software applications or from remote command entry sources.

This command supplies the special routines that first add the LSAM environment library list to the job. For most LSAM utility commands it is necessary that the command have access to the LSAM libraries in order to find sub-programs and files that are required by the command.

Most commonly used LSAM control commands in the SMAGPL library already manage the LSAM library list, based on the Product Library assigned to each of those commands. This new command is useful for other LSAM commands typically found in the SMAPGM library, such as SETDYNVAR (set/add LSAM Dynamic Variable, explained above).

Here is an example of the syntax required to use this command:
:::info example
```
SMAGPL/LSAMCMD ENV(SMADEFAULT) CMD('command syntax')
```
:::

:::tip
This command leaves the LSAM libraries added to the job, unlike the LSAM management commands in SMAGPL, such as ENDSMASYS. To remove the libraries from the job library list, use the LSAM command SMARMVLIBL ENV(SMADEFAULT).

(Remember to replace the name of the LSAM environment in the ENV() parameter of this and the LSAMCMD example, above, when using these commands with an alternate LSAM environment, such as a test LSAM.)
:::
